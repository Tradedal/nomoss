import {
  Context,
  type Duration,
  Effect,
  Exit,
  Function as Fn,
  Match,
  Option,
  type Schema,
} from "effect";
import {
  ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "./lifecycle.js";
import { ResourceModel, type ResourceNode } from "./model.js";
import { ResourceCommandCreation } from "./resourceCommandPolicy.js";
import { ResourceStabilization } from "./resourceStabilization.js";

type Confirmation<Outputs, Failure, Services> = (
  outputs: Outputs,
) => boolean | Effect.Effect<boolean, Failure, Services>;

/**
 * The PreparedResourceChange interface lets the lifecycle verify a change
 * without saving write-only values from the provider request.
 */
interface PreparedResourceChange<Outputs, Failure, Services> {
  readonly outputs: Outputs;
  readonly request: Effect.Effect<unknown, Failure, Services>;
}

/** The RemovalPrerequisite interface specifies when an observed resource is safe to delete and which failure to report if it stays in use. */
interface RemovalPrerequisite<Outputs, Failure> {
  readonly accepts: (outputs: Outputs) => boolean;
  readonly repeats: number;
  readonly onBlocked: (outputs: Outputs) => Failure;
}

/**
 * The ResourceLifecycleLookup interface lets each mutation use the same
 * validated provider observation when it checks the outcome of a change.
 *
 * @see ../../../docs/application/resource-operations.md (Create, read, update, and remove a resource)
 */
interface ResourceLifecycleLookup<
  Outputs extends Schema.JsonObject,
  Identity,
  Failure,
  Services,
  OwnershipFailure,
> {
  /** The identity schema selects the saved outputs required by lookup and deletion. */
  readonly identity: Schema.Schema<Identity>;
  /**
   * The lookup operation can use the command's declaration when one stack
   * resource has several provider addresses. An inline IAM policy, for
   * example, has a separate copy on each principal that the node names.
   */
  readonly lookup: (
    identity: Identity,
    node: ResourceNode,
  ) => Effect.Effect<Option.Option<Outputs>, Failure, Services>;
  /** IAM can reuse a name or ARN. A registration can require an immutable ID as well. */
  readonly ownership?: {
    readonly matches: (saved: Identity, observed: Outputs) => boolean;
    readonly onMismatch: (saved: Identity) => OwnershipFailure;
  };
  /**
   * The projectOutputs callback lets a provider use additional attributes
   * to verify a change while saving only the declared outputs.
   */
  readonly projectOutputs?: (outputs: Outputs) => Schema.JsonObject;
}

type LifecycleCommand =
  | Extract<ResourceCommand, { _tag: "Read" | "Create" | "Destroy" }>
  | {
      readonly _tag: "Update";
      readonly node: ResourceNode;
      readonly current: ResourceNode;
      readonly command: ResourceCommand;
    };

/**
 * The ResourceLifecycle service executes a resource's mutations and
 * confirms the resulting identity or absence before reporting success.
 * A registration can opt into the same removal workflow for create rollback.
 *
 * @see ../../../docs/application/resource-operations.md (Resource lifecycle operations)
 * @see ../../../node_modules/effect/src/Context.ts (Service with a parameterized make)
 * @see ../../../node_modules/effect/src/Effect.ts (acquireUseRelease)
 */
export class ResourceLifecycle extends Context.Service<ResourceLifecycle>()(
  "nomoss/core/resource/resourceLifecycle",
  {
    make: Effect.fn("ResourceLifecycle.make")(function* <
      Outputs extends Schema.JsonObject,
      Identity,
      Failure,
      Services,
      OwnershipFailure = never,
    >(
      resource: ResourceLifecycleLookup<
        Outputs,
        Identity,
        Failure,
        Services,
        OwnershipFailure
      >,
      timeout: Duration.Input,
    ) {
      const model = yield* ResourceModel;
      const stabilization = yield* ResourceStabilization;

      const { projectOutputs: persisted = Fn.identity } = resource;

      // The lookup operation compares immutable ownership when a provider can
      // reuse an address. A mismatch leaves the resource under its current owner.
      // See ../../../node_modules/effect/src/Effect.ts (transposeOption).
      const lookup = Effect.fnUntraced(function* (
        identity: Identity,
        node: ResourceNode,
      ) {
        const observed = yield* resource.lookup(identity, node);

        const conflict = Option.fromUndefinedOr(resource.ownership).pipe(
          Option.filter(({ matches }) =>
            Option.exists(observed, (outputs) => !matches(identity, outputs)),
          ),
        );
        yield* conflict.pipe(
          Option.map(({ onMismatch }) => Effect.fail(onMismatch(identity))),
          Effect.transposeOption,
        );

        return observed;
      });

      /**
       * The read operation returns a validated observation of the identified
       * resource. It passes through confirmed absence and fails if the provider
       * returns a primary identifier that differs from the one on the node.
       *
       * @see ./model.ts (ResourceModel.withObservedOutputs)
       */
      const read = Effect.fnUntraced(function* (node: ResourceNode) {
        const identity = yield* model.decodeOutputs(node, resource.identity);

        const observed = yield* lookup(identity, node);

        return yield* observed.pipe(
          Option.map(
            Effect.fnUntraced(function* (outputs) {
              const identified = yield* model.withObservedOutputs(
                node,
                persisted(outputs),
              );
              return { node: identified, outputs };
            }),
          ),
          Effect.transposeOption,
        );
      });

      /**
       * The confirm operation waits for the provider to report the expected
       * state at the recorded identity. A read failure or an expired deadline
       * prevents the mutation from being reported as complete.
       *
       * @see ./resourceStabilization.ts (waitForPresence)
       */
      const confirm = Effect.fnUntraced(function* <E, R>(
        node: ResourceNode,
        accepts: (outputs: Outputs) => Effect.Effect<boolean, E, R>,
      ) {
        const observed = yield* read(node).pipe(
          Effect.flatMap(
            Option.match({
              onNone: () => Effect.succeedNone,
              onSome: (state) =>
                Effect.succeed(state).pipe(Effect.when(accepts(state.outputs))),
            }),
          ),
          stabilization.waitForPresence(timeout),
        );

        return observed;
      });

      /**
       * The reconcile operation applies desired state at its stable
       * identity. It reads the provider first so a retry can skip a
       * mutation that already took effect. The caller confirms the result.
       *
       * @see ../../../node_modules/effect/src/Effect.ts (when)
       */
      const reconcile = Effect.fn("ResourceLifecycle.reconcile")(function* <
        E,
        R,
      >(
        node: ResourceNode,
        { outputs: desired, request }: PreparedResourceChange<Outputs, E, R>,
        matches: (
          desired: Outputs,
          observed: Outputs,
        ) => boolean = Fn.constTrue,
      ) {
        const identified = yield* model.withOutputs(node, persisted(desired));
        const observed = yield* read(identified);

        const alreadyApplied = Option.exists(observed, ({ outputs }) =>
          matches(desired, outputs),
        );

        yield* request.pipe(Effect.when(Effect.succeed(!alreadyApplied)));

        return desired;
      });

      /**
       * The remove operation lets teardown and create rollback share the same
       * prerequisites. If a preparatory read finds the resource gone, removal
       * is complete. If the resource is still present, a successful delete
       * requires a later read to confirm its absence.
       *
       * @see ./resourceStabilization.ts (observeWithinAttempts and waitForAbsence)
       * @see ../../../node_modules/effect/src/Effect.ts (transposeOption)
       */
      const remove = <
        E,
        R,
        CleanupFailure = never,
        CleanupServices = never,
        Blocked = never,
      >(
        request: (
          identity: Identity,
          node: ResourceNode,
        ) => Effect.Effect<unknown, E, R>,
        verification?: {
          readonly prerequisite?: RemovalPrerequisite<Outputs, Blocked>;
          readonly cleanup?: (
            outputs: Outputs,
            node: ResourceNode,
          ) => Effect.Effect<unknown, CleanupFailure, CleanupServices>;
        },
      ) =>
        Effect.fn("ResourceLifecycle.remove")(function* ({
          node,
        }: {
          readonly node: ResourceNode;
        }) {
          const identity = yield* model.decodeOutputs(node, resource.identity);

          const observation = lookup(identity, node);

          const deleteResource = Effect.fnUntraced(function* () {
            yield* request(identity, node);

            yield* observation.pipe(stabilization.waitForAbsence(timeout));
          });

          yield* Option.match(Option.fromUndefinedOr(verification), {
            onNone: deleteResource,
            onSome: ({ prerequisite, cleanup = () => Effect.void }) =>
              Effect.gen(function* () {
                const ready = yield* Option.match(
                  Option.fromUndefinedOr(prerequisite),
                  {
                    onNone: () => observation,
                    onSome: ({ accepts, repeats, onBlocked }) =>
                      Effect.gen(function* () {
                        const satisfied = (state: Option.Option<Outputs>) =>
                          Option.isNone(state) || accepts(state.value);

                        const observed = yield* observation.pipe(
                          stabilization.observeWithinAttempts(
                            satisfied,
                            repeats,
                          ),
                        );

                        yield* observed.pipe(
                          Option.filter((outputs) => !accepts(outputs)),
                          Option.map((outputs) =>
                            Effect.fail(onBlocked(outputs)),
                          ),
                          Effect.transposeOption,
                        );

                        return observed;
                      }),
                  },
                );

                yield* ready.pipe(
                  Option.map((outputs) =>
                    cleanup(outputs, node).pipe(
                      Effect.andThen(deleteResource()),
                    ),
                  ),
                  Effect.transposeOption,
                );
              }),
          });

          const result: ResourceCommandResult = ResourceCommandResult.Destroyed(
            { node },
          );

          return result;
        });

      /**
       * The create operation waits for the provider to report the required
       * configuration before returning outputs. A checkpoint schema
       * must be able to read the saved create result because a retry can
       * confirm that result without creating another instance. Registrations
       * that choose rollback use the create response to remove an instance
       * after failed or interrupted confirmation.
       *
       * @see ../../../docs/application/resource-operations.md (Create a resource)
       * @see ../../../node_modules/effect/src/Effect.ts (acquireUseRelease)
       */
      const create = <
        E,
        R,
        ConfigureFailure = never,
        ConfigureServices = never,
        RollbackFailure = never,
        RollbackServices = never,
      >(
        request: (node: ResourceNode) => Effect.Effect<Outputs, E, R>,
        options: {
          readonly matches?: (created: Outputs, observed: Outputs) => boolean;
          readonly configure?: (
            node: ResourceNode,
            outputs: Outputs,
          ) => Effect.Effect<
            (observed: Outputs) => boolean,
            ConfigureFailure,
            ConfigureServices
          >;
        } & (
          | {
              readonly checkpoint?: never;
              readonly rollback?: (command: {
                readonly node: ResourceNode;
              }) => Effect.Effect<unknown, RollbackFailure, RollbackServices>;
            }
          | {
              readonly checkpoint: Schema.Schema<Outputs>;
              readonly rollback?: never;
            }
        ) = {},
      ) =>
        Effect.fn("ResourceLifecycle.create")(function* ({
          node,
        }: {
          readonly node: ResourceNode;
        }) {
          const {
            matches = Fn.constTrue,
            configure,
            rollback,
            checkpoint,
          } = options;

          const creation = yield* ResourceCommandCreation;

          const finish = Effect.fnUntraced(function* (created: Outputs) {
            const identified = yield* model.withOutputs(
              node,
              persisted(created),
            );

            const observed = yield* confirm(identified, (outputs) =>
              Effect.succeed(matches(created, outputs)),
            );

            const confirmed = yield* Option.match(
              Option.fromUndefinedOr(configure),
              {
                onNone: () => Effect.succeed(observed),
                onSome: (configure) =>
                  configure(identified, observed.outputs).pipe(
                    Effect.flatMap((accepts) =>
                      confirm(identified, (outputs) =>
                        Effect.succeed(accepts(outputs)),
                      ),
                    ),
                  ),
              },
            );

            const result: ResourceCommandResult = ResourceCommandResult.Created(
              {
                node: confirmed.node,
              },
            );

            return result;
          });

          const submit = Effect.fnUntraced(function* () {
            return yield* Match.value({ checkpoint, creation }).pipe(
              Match.when(
                { checkpoint: Match.defined, creation: { _tag: "Some" } },
                ({
                  checkpoint,
                  creation: {
                    value: { submitted, record },
                  },
                }) =>
                  Option.match(submitted, {
                    onSome: (pending) =>
                      model.decodeOutputs(pending, checkpoint),
                    onNone: () =>
                      Effect.uninterruptibleMask((restore) =>
                        restore(request(node)).pipe(
                          Effect.tap((outputs) =>
                            model
                              .withOutputs(node, persisted(outputs))
                              .pipe(Effect.flatMap(record)),
                          ),
                        ),
                      ),
                  }),
              ),
              Match.orElse(() => request(node)),
            );
          });

          return yield* Option.match(Option.fromUndefinedOr(rollback), {
            onNone: () => Effect.flatMap(submit(), finish),
            onSome: (remove) =>
              Effect.acquireUseRelease(submit(), finish, (created, exit) =>
                Effect.suspend(() =>
                  remove({ node: { ...node, outputs: persisted(created) } }),
                ).pipe(
                  Effect.when(Effect.succeed(Exit.isFailure(exit))),
                  Effect.asVoid,
                ),
              ),
          });
        });

      /**
       * The update operation uses the saved resource identity to confirm
       * a change. The provider mutation supplies a condition that a later
       * read must satisfy before the stack can save the updated outputs.
       *
       * @see ../../../docs/application/resource-operations.md (Update a resource)
       */
      const update = <
        E,
        R,
        ConfirmFailure = never,
        ConfirmServices = never,
        VerifyFailure = never,
        VerifyServices = never,
      >(
        request: (
          node: ResourceNode,
          current: ResourceNode,
        ) => Effect.Effect<
          Confirmation<Outputs, ConfirmFailure, ConfirmServices>,
          E,
          R
        >,
        verify?: (
          node: ResourceNode,
          outputs: Outputs,
        ) => Effect.Effect<unknown, VerifyFailure, VerifyServices>,
      ) =>
        Effect.fn("ResourceLifecycle.update")(function* ({
          node,
          current,
        }: Extract<LifecycleCommand, { _tag: "Update" }>) {
          const accepts = yield* request(node, current);

          const identified = yield* model.withOutputs(node, current.outputs);
          const observed = yield* confirm(identified, (outputs) =>
            Match.value(accepts(outputs)).pipe(
              Match.when(Match.boolean, (ready) => Effect.succeed(ready)),
              Match.orElse((effect) => effect),
            ),
          );

          yield* Option.fromUndefinedOr(verify).pipe(
            Option.map((verify) => verify(identified, observed.outputs)),
            Effect.transposeOption,
          );

          const result: ResourceCommandResult = ResourceCommandResult.Updated({
            node: observed.node,
          });

          return result;
        });

      /**
       * The observedUpdate method reads the current provider state before
       * submitting a mutation that depends on it. The mutation supplies the
       * condition that will confirm the resulting change.
       *
       * @see ../../../node_modules/effect/src/Effect.ts (fromOption)
       */
      const observedUpdate = <
        Input,
        E,
        R,
        ApplyFailure,
        ApplyServices,
        ConfirmFailure = never,
        ConfirmServices = never,
      >(
        prepare: (
          node: ResourceNode,
          current: ResourceNode,
        ) => Effect.Effect<Input, E, R>,
        apply: (
          outputs: Outputs,
          input: Input,
        ) => Effect.Effect<
          Confirmation<Outputs, ConfirmFailure, ConfirmServices>,
          ApplyFailure,
          ApplyServices
        >,
      ) =>
        Effect.fnUntraced(function* (
          node: ResourceNode,
          current: ResourceNode,
        ) {
          const desired = yield* prepare(node, current);

          const observed = yield* read(current).pipe(
            Effect.flatMap(Effect.fromOption),
          );

          return yield* apply(observed.outputs, desired);
        });

      /**
       * The observe operation lets reconciliation distinguish a missing resource
       * from a failed read. For a present resource, the registration can return
       * additional details without adding them to the saved outputs.
       *
       * @see ../../../docs/application/resource-operations.md (Read a saved resource)
       */
      const observe = <E = never, R = never>(
        { node }: { readonly node: ResourceNode },
        project: (
          outputs: Outputs,
        ) => Effect.Effect<Schema.JsonObject, E, R> = Effect.succeed,
      ) =>
        Effect.gen(function* () {
          const observed = yield* read(node);

          const present = yield* observed.pipe(
            Option.map(({ node, outputs }) =>
              project(outputs).pipe(
                Effect.map((observed) =>
                  ResourceObservation.Present({ node, observed }),
                ),
              ),
            ),
            Effect.transposeOption,
          );

          const result: ResourceCommandResult = ResourceCommandResult.Observed({
            observation: Option.getOrElse(present, () =>
              ResourceObservation.Missing({ node }),
            ),
          });

          return result;
        }).pipe(Effect.withSpan("ResourceLifecycle.observe"));

      return { observe, create, update, observedUpdate, remove, reconcile };
    }),
  },
) {
  /**
   * The commands function matches the actions supported by a native
   * lifecycle. The matcher infers the return type from the registered actions.
   *
   * @see ../../../docs/development/effect-native-development.md (Let Effect infer channels at the call site)
   * @see ../../../node_modules/effect/src/Match.ts (typeTags)
   */
  static commands = Match.typeTags<LifecycleCommand>();

  /**
   * The execute method runs a direct command or the corresponding step in a
   * reviewed plan. Only a reviewed update supplies the saved node required
   * for confirmation.
   *
   * @see ../../../node_modules/effect/src/Match.ts (tag and when)
   * @see ../../../node_modules/effect/src/Effect.ts (fromOption and flatMap)
   */
  static execute<E, R>(
    run: (
      action: LifecycleCommand,
    ) => Effect.Effect<ResourceCommandResult, E, R>,
  ) {
    const execute = Effect.fn("ResourceLifecycle.execute")(
      (command: ResourceCommand) => {
        const action = Match.value(command).pipe(
          Match.tag("Apply", ({ decision }) => decision),
          Match.orElse((direct) => direct),
        );

        const lifecycleAction = Match.value(action).pipe(
          Match.tag("Read", "Create", "Destroy", (supported) => supported),
          Match.tag("Delete", ({ node }) => ResourceCommand.Destroy({ node })),
          Match.when({ _tag: "Update", current: Match.defined }, (update) => ({
            ...update,
            command,
          })),
          Match.option,
        );

        return Effect.fromOption(
          lifecycleAction,
          () => new ResourceCommandUnsupported({ command }),
        ).pipe(Effect.flatMap(run));
      },
    );

    return { execute };
  }

  /**
   * The unsupported method records the original command when a registration
   * has no operation for it.
   *
   * @see ./lifecycle.ts (ResourceCommandUnsupported)
   */
  static unsupported({ command }: { readonly command: ResourceCommand }) {
    return Effect.fail(new ResourceCommandUnsupported({ command }));
  }
}
