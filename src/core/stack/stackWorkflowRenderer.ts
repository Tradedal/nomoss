import {
  Array as Arr,
  Clock,
  Console,
  Context,
  Duration,
  Effect,
  Fiber,
  Graph,
  HashMap,
  Layer,
  Match,
  Option,
  Record,
  Ref,
  String as Str,
  Stream,
  Terminal,
} from "effect";
import { TerminalCapabilities } from "effect/cli";
import {
  ResourceModel,
  type ResourceNode,
  type ResourcePlan,
  resourceModelLayer,
} from "../resource/model.js";
import type { ResourceState } from "../state/resourceState.js";
import {
  displayProperties,
  displayPropertyDiff,
  sensitiveProperties,
} from "./resourceDisplay.js";
import type {
  ResourceApplyPlan,
  ResourceApplyResult,
  ResourceDestroyResult,
  ResourceReconcileResult,
} from "./resourceStackLifecycle.js";
import {
  type ResourceProgress,
  ResourceStackProgress,
  resourceStackProgressLayer,
} from "./resourceStackProgress.js";

/**
 * The StackWorkflowRenderer service displays reviewed plans and execution
 * progress. The live handler counts completed outcomes, including skipped
 * dependency updates, and prints totals after consuming the final event.
 * Replacement rows use the applied successor's provider identity.
 */
export class StackWorkflowRenderer extends Context.Service<StackWorkflowRenderer>()(
  "nomoss/core/stack/stackWorkflowRenderer",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;
      const progress = yield* ResourceStackProgress;

      const renderResourceIdentifier = (node: ResourceNode) => {
        const identifier: string = Option.fromUndefinedOr(
          node.cloudControlIdentifier,
        ).pipe(
          Option.map((value) => `id=${value}`),
          Option.getOrElse(() => ""),
        );

        return identifier;
      };

      /**
       * The renderPlan service method includes replacement operation order so
       * an operator can review changes that will replace provider identities.
       * Effect's Array.match selects the status message for an empty plan and
       * prints a resource heading only when the plan contains actions.
       */
      const renderPlan = Effect.fn("StackWorkflowRenderer.renderPlan")(
        function* (input: {
          readonly stackName: string;
          readonly plan: ResourcePlan;
        }) {
          const actions = Arr.flatMap(
            [input.plan.delete, input.plan.createOrUpdate, input.plan.destroy],
            Arr.flatten,
          );

          yield* Arr.match(actions, {
            onEmpty: () =>
              Console.log(`No changes planned for stack "${input.stackName}".`),
            onNonEmpty: () =>
              Console.log(`Stack "${input.stackName}"`).pipe(
                Effect.andThen(Console.log("Resources")),
              ),
          });

          yield* Effect.forEach(
            actions,
            (action) => {
              const line: string = Match.value(action).pipe(
                Match.tagsExhaustive({
                  Create: ({ node }) =>
                    `\u001b[32m[+] ${model.resourceLabel(node)}\u001b[0m`,
                  Update: ({ node }) =>
                    `\u001b[33m[~] ${model.resourceLabel(node)}\u001b[0m`,
                  Replace: ({ node, operations }) =>
                    `\u001b[33m[+-] ${model.resourceLabel(node)} replace (${Arr.join(
                      Arr.map(operations, (operation) =>
                        Str.toLowerCase(operation._tag),
                      ),
                      " then ",
                    )})\u001b[0m`,
                  Delete: ({ node }) =>
                    `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
                  Destroy: ({ node }) =>
                    `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
                }),
              );

              return Console.log(line);
            },
            { discard: true },
          );
        },
      );

      /**
       * The renderDiff service method prints one row per logical resource.
       * The planner's actions determine each changed row, including removals
       * that are absent from the declaration. Colors follow the same Effect
       * CLI terminal capabilities as command help.
       */
      const renderDiff = Effect.fn("StackWorkflowRenderer.renderDiff")(
        function* (
          { stackName, desired, plan, state }: ResourceApplyPlan,
          detailed: boolean,
        ) {
          const { canColor } = yield* TerminalCapabilities.TerminalCapabilities;

          const saved = HashMap.fromIterable(
            Arr.map(
              state.resources,
              (node) => [node.key.logicalId, node] as const,
            ),
          );

          const removals = Arr.dedupeWith(
            Arr.flatten(plan.delete),
            (left, right) =>
              left.node.key.logicalId === right.node.key.logicalId,
          );

          const changes = HashMap.fromIterable(
            Arr.map(
              Arr.flatten(plan.createOrUpdate),
              (action) => [action.node.key.logicalId, action] as const,
            ),
          );

          const rows = Arr.appendAll(
            Arr.map(removals, (action) => ({
              node: action.node,
              status: "delete",
              desired: Option.none<ResourceNode>(),
            })),
            Arr.map(Arr.fromIterable(Graph.topo(desired)), ([, node]) => ({
              node,
              desired: Option.some(node),
              status: HashMap.get(changes, node.key.logicalId).pipe(
                Option.map((action) =>
                  Match.value(action).pipe(
                    Match.tag(
                      "Replace",
                      ({ operations }) =>
                        `replace (${Arr.join(
                          Arr.map(operations, (operation) =>
                            Str.toLowerCase(operation._tag),
                          ),
                          " then ",
                        )})`,
                    ),
                    Match.orElse((operation) =>
                      Str.toLowerCase(operation._tag),
                    ),
                  ),
                ),
                Option.getOrElse(() => "unchanged"),
              ),
            })),
          );

          yield* Arr.match(rows, {
            onEmpty: () =>
              Console.log(`Stack "${stackName}" has no resources.`),
            onNonEmpty: () => Console.log(`Stack "${stackName}"`),
          });

          yield* Effect.forEach(
            rows,
            Effect.fnUntraced(function* ({ node, status, desired }) {
              const row = `  ${model.resourceLabel(node)}  ${status}`;
              const line = Match.value(canColor && status === "create").pipe(
                Match.when(true, () => `\u001b[32m${row}\u001b[0m`),
                Match.orElse(() => row),
              );

              yield* Console.log(line);

              const properties = Option.filter(desired, () => detailed).pipe(
                Option.flatMap((desired) =>
                  displayPropertyDiff(
                    HashMap.get(saved, node.key.logicalId),
                    desired,
                    canColor,
                  ),
                ),
              );

              yield* Option.match(properties, {
                onNone: () => Effect.void,
                onSome: (properties) => Console.log(properties),
              });
            }),
            { discard: true },
          );
        },
      );

      /**
       * The renderDependencies service method shows prerequisites beside the
       * resource that waits for them. Each prerequisite uses its logical ID.
       */
      const renderDependencies = Effect.fn(
        "StackWorkflowRenderer.renderDependencies",
      )(function* (
        stackName: string,
        resources: ReadonlyArray<{
          readonly node: ResourceNode;
          readonly prerequisites: ReadonlyArray<string>;
        }>,
      ) {
        yield* Console.log(`Dependencies for stack "${stackName}"`);
        yield* Effect.forEach(
          resources,
          ({ node, prerequisites }) =>
            Arr.match(prerequisites, {
              onEmpty: () => Console.log(`  ${model.resourceLabel(node)}`),
              onNonEmpty: (keys) =>
                Console.log(
                  `  ${model.resourceLabel(node)} depends on ${Arr.join(keys, ", ")}`,
                ),
            }),
          { discard: true },
        );
      });

      /**
       * The renderSavedResources service method lists the saved lifecycle
       * records, including work in progress. It prints only each resource's
       * label and saved status.
       */
      const renderSavedResources = Effect.fn(
        "StackWorkflowRenderer.renderSavedResources",
      )(function* (stackName: string, states: ReadonlyArray<ResourceState>) {
        yield* Arr.match(states, {
          onEmpty: () =>
            Console.log(`Stack "${stackName}" has no saved resources.`),
          onNonEmpty: () => Console.log(`Saved state for stack "${stackName}"`),
        });

        yield* Effect.forEach(
          states,
          (state) =>
            Console.log(
              `  ${model.resourceLabel(state.node)}  ${Str.toLowerCase(state._tag)}`,
            ),
          { discard: true },
        );
      });

      /**
       * The renderSavedResource service method shows values exactly as saved
       * for each recorded generation, with protected fields redacted.
       */
      const renderSavedResource = Effect.fn(
        "StackWorkflowRenderer.renderSavedResource",
      )(function* (
        stackName: string,
        logicalId: string,
        states: ReadonlyArray<ResourceState>,
      ) {
        yield* Arr.match(states, {
          onEmpty: () =>
            Console.log(
              `Stack "${stackName}" has no saved resource "${logicalId}".`,
            ),
          onNonEmpty: () => Console.log(`Saved state for stack "${stackName}"`),
        });

        yield* Effect.forEach(
          states,
          Effect.fnUntraced(function* (state) {
            const { node } = state;
            yield* Console.log(
              `  ${model.resourceLabel(node)}  ${Str.toLowerCase(state._tag)} ${renderResourceIdentifier(node)}`,
            );

            yield* Console.log(
              `    Properties\n${displayProperties(node.props, sensitiveProperties(node), "      ")}`,
            );

            yield* Console.log(
              `    Outputs\n${displayProperties(
                node.outputs,
                Arr.map(node.schema.stateSecretOutputKeys, (key) => [key]),
                "      ",
              )}`,
            );
          }),
          { discard: true },
        );
      });

      /**
       * The watchProgress service method redraws resource rows on an
       * interactive terminal and appends lifecycle records to redirected
       * output while running the supplied operation. It drains the remaining
       * events before printing totals from completed execution outcomes. The
       * elapsed time includes execution and the final progress writes. Planning
       * and the summary's own output occur outside that measurement.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/cli/TerminalCapabilities.ts (canAnimate)
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Stream.ts (Stream.runForEach and Stream.merge)
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (Effect.forkScoped and Effect.addFinalizer)
       * @see ../../../node_modules/effect/src/Stream.ts (tap)
       * @see ../../../node_modules/effect/src/Effect.ts (scoped and timed)
       */
      const watchProgress = Effect.fn("StackWorkflowRenderer.watchProgress")(
        function* <A extends ResourceApplyResult | ResourceDestroyResult, E, R>(
          stackName: string,
          operation: Effect.Effect<A, E, R>,
        ) {
          const completed = yield* Ref.make<
            Readonly<Record<string, ResourceProgress>>
          >({});

          const [duration, result] = yield* Effect.gen(function* () {
            const { canAnimate } =
              yield* TerminalCapabilities.TerminalCapabilities;

            const availableTerminal = yield* Effect.serviceOption(
              Terminal.Terminal,
            );

            const terminal = Option.filter(availableTerminal, () => canAnimate);

            const { updates, close } = yield* progress.subscribe(stackName);

            const recordCompletion = Effect.fnUntraced(function* (
              event: ResourceProgress,
            ) {
              yield* Ref.update(
                completed,
                Record.set(event.node.key.logicalId, event),
              ).pipe(Effect.when(Effect.succeed(event.status === "completed")));
            });

            const recordedUpdates = updates.pipe(Stream.tap(recordCompletion));

            const rows = yield* Ref.make<
              Readonly<Record<string, ResourceProgress>>
            >({});
            const displayed = yield* Ref.make(0);

            const label = (event: ResourceProgress, now: number) => {
              const elapsed = Match.value(event.status).pipe(
                Match.when("running", () => now - event.startedAt),
                Match.orElse(() => event.updatedAt - event.startedAt),
              );

              const seconds = Math.floor(Math.max(0, elapsed) / 1000);

              const message = Option.fromUndefinedOr(event.message).pipe(
                Option.map((message) => `  ${message}`),
                Option.getOrElse(() => ""),
              );

              const resource = model.resourceLabel(event.node);

              return Match.value(event.status).pipe(
                Match.when("completed", () => {
                  const action = Match.value(event.operation).pipe(
                    Match.when("Create", () => "created"),
                    Match.when("Update", () => "updated"),
                    Match.when("Replace", () => "replaced"),
                    Match.when("Delete", () => "deleted"),
                    Match.when("Destroy", () => "destroyed"),
                    Match.when("NoOp", () => "unchanged"),
                    Match.exhaustive,
                  );

                  const identifier = renderResourceIdentifier(event.node);
                  const identity = Option.liftPredicate(
                    identifier,
                    Str.isNonEmpty,
                  ).pipe(
                    Option.map((value) => `  ${value}`),
                    Option.getOrElse(() => ""),
                  );

                  return `  ✓ ${resource}  ${action}  ${seconds}s${identity}`;
                }),
                Match.orElse(
                  (status) =>
                    `  ${resource}  ${event.operation.toLowerCase()} ${status}  ${seconds}s${message}`,
                ),
              );
            };

            const redraw = Effect.fnUntraced(function* (
              output: Terminal.Terminal,
              settled: Option.Option<ResourceProgress>,
            ) {
              const columns = yield* output.columns;
              const height = yield* output.rows;

              const now = yield* Clock.currentTimeMillis;

              const current = yield* Ref.get(rows);
              const previous = yield* Ref.get(displayed);

              const formatLine = (event: ResourceProgress) => {
                const sanitized = label(event, now).replace(/\p{Cc}/gu, " ");

                return Str.takeLeft(sanitized, Math.max(1, columns - 1));
              };

              const active = Arr.map(
                Arr.takeRight(Record.values(current), Math.max(1, height - 1)),
                formatLine,
              );

              const completed = Arr.map(Option.toArray(settled), formatLine);
              const lines = Arr.appendAll(completed, active);

              const rewind = Match.value(previous).pipe(
                Match.when(0, () => ""),
                Match.orElse(
                  (count) =>
                    `\u001b[${Math.min(count, height - 1)}A\r\u001b[0J`,
                ),
              );

              yield* output
                .display(`${rewind}${Arr.join(lines, "\n")}\n`)
                .pipe(
                  Effect.ignore,
                  Effect.when(Effect.succeed(Arr.isArrayNonEmpty(lines))),
                );

              yield* Ref.set(displayed, active.length);
            });

            const appendProgress = recordedUpdates.pipe(
              Stream.runForEach((event) =>
                Console.log(label(event, event.updatedAt)),
              ),
            );

            const renderProgress = (output: Terminal.Terminal) =>
              recordedUpdates.pipe(
                Stream.map(Option.some),
                Stream.merge(
                  Stream.tick("1 second").pipe(
                    Stream.map(() => Option.none<ResourceProgress>()),
                  ),
                  { haltStrategy: "left" },
                ),
                Stream.runForEach(
                  Effect.fnUntraced(function* (update) {
                    yield* Option.match(update, {
                      onNone: () => Effect.void,
                      onSome: (event) =>
                        Ref.update(rows, (current) =>
                          Match.value(event.status).pipe(
                            Match.when("running", () =>
                              Record.set(
                                current,
                                event.node.key.logicalId,
                                event,
                              ),
                            ),
                            Match.orElse(() =>
                              Record.remove(current, event.node.key.logicalId),
                            ),
                          ),
                        ),
                    });

                    const settled = Option.filter(
                      update,
                      (event) => event.status !== "running",
                    );

                    yield* redraw(output, settled);
                  }),
                ),
              );

            const writer = yield* Option.match(terminal, {
              onNone: () => appendProgress,
              onSome: renderProgress,
            }).pipe(Effect.forkScoped);

            yield* Effect.addFinalizer(() =>
              close.pipe(Effect.andThen(() => Fiber.join(writer))),
            );

            return yield* operation;
          }).pipe(Effect.scoped, Effect.timed);

          yield* renderSummary(
            result,
            duration,
            Record.values(yield* Ref.get(completed)),
          );

          return result;
        },
      );

      /**
       * The renderSummary function reports elapsed execution time and
       * totals from completed execution results. A replacement counts as one
       * replaced resource. Resources whose resolved requests stayed equal and
       * retained resources without an action count as unchanged.
       *
       * @see ../../../node_modules/effect/src/Duration.ts (toSeconds)
       */
      const renderSummary = Effect.fn("StackWorkflowRenderer.renderSummary")(
        function* (
          result: ResourceApplyResult | ResourceDestroyResult,
          duration: Duration.Duration,
          completed: ReadonlyArray<ResourceProgress>,
        ) {
          const counts = Arr.groupBy(completed, (event) => event.operation);
          const created = counts.Create?.length ?? 0;
          const updated = counts.Update?.length ?? 0;
          const replaced = counts.Replace?.length ?? 0;
          const deleted =
            (counts.Delete?.length ?? 0) + (counts.Destroy?.length ?? 0);
          const outcome = Match.value(result).pipe(
            Match.when({ applied: Match.defined }, (result) => ({
              verb: "deployed",
              unchanged: result.resources.length - created - updated - replaced,
            })),
            Match.orElse(() => ({ verb: "deleted", unchanged: 0 })),
          );
          const seconds = Duration.toSeconds(duration).toFixed(1);

          yield* Console.log(
            `Stack "${result.stackName}" ${outcome.verb} in ${seconds}s.`,
          );
          yield* Console.log(
            `Resources: ${created} created, ${updated} updated, ${replaced} replaced, ${deleted} deleted, ${outcome.unchanged} unchanged.`,
          );
        },
      );

      /**
       * The renderApplyResult service method uses final applied identities for
       * creation, update, and replacement summaries. A removed resource uses
       * the identity retained by its plan because the final resource collection
       * has released ownership of that object.
       */
      const renderApplyResult = Effect.fn(
        "StackWorkflowRenderer.renderApplyResult",
      )(function* (result: ResourceApplyResult) {
        const resourcesByKey = new Map(
          Arr.map(result.resources, (node) => [node.key.logicalId, node]),
        );

        const actions = Arr.flatten(
          Arr.appendAll(result.plan.delete, result.plan.createOrUpdate),
        );

        yield* Console.log(`Stack "${result.stackName}"`);
        yield* Console.log("Resources");

        yield* Effect.forEach(
          actions,
          (action) => {
            const identifier = Option.fromUndefinedOr(
              resourcesByKey.get(action.node.key.logicalId),
            ).pipe(
              Option.getOrElse(() => action.node),
              renderResourceIdentifier,
            );

            const line: string = Match.value(action).pipe(
              Match.tag(
                "Create",
                ({ node }) =>
                  `\u001b[32m[+] ${model.resourceLabel(node)} created ${identifier}\u001b[0m`,
              ),
              Match.tag(
                "Update",
                ({ node }) =>
                  `\u001b[33m[~] ${model.resourceLabel(node)} updated ${identifier}\u001b[0m`,
              ),
              Match.tag(
                "Replace",
                ({ node }) =>
                  `\u001b[33m[+-] ${model.resourceLabel(node)} replaced ${identifier}\u001b[0m`,
              ),
              Match.tag(
                "Delete",
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)} deleted ${identifier}\u001b[0m`,
              ),
              Match.orElse(
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
              ),
            );

            return Console.log(line);
          },
          { discard: true },
        );

        yield* Console.log(`no changes for stack ${result.stackName}`).pipe(
          Effect.when(Effect.succeed(actions.length === 0)),
        );
      });

      /**
       * The renderDestroyResult service method identifies resources removed by the teardown plan
       * through the provider nodes retained in its result. An empty teardown
       * reports no changes for the stack.
       */
      const renderDestroyResult = Effect.fn(
        "StackWorkflowRenderer.renderDestroyResult",
      )(function* (result: ResourceDestroyResult) {
        const resourcesByKey = new Map(
          Arr.map(result.resources, (node) => [node.key.logicalId, node]),
        );

        const actions = Arr.flatten(result.plan.destroy);

        yield* Console.log(`Stack "${result.stackName}"`);
        yield* Console.log("Resources");

        yield* Effect.forEach(
          actions,
          (action) => {
            const identifier = Option.fromUndefinedOr(
              resourcesByKey.get(action.node.key.logicalId),
            ).pipe(
              Option.map(renderResourceIdentifier),
              Option.getOrElse(() => ""),
            );

            const line: string = Match.value(action).pipe(
              Match.tag(
                "Destroy",
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)} destroyed ${identifier}\u001b[0m`,
              ),
              Match.orElse(
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
              ),
            );

            return Console.log(line);
          },
          { discard: true },
        );

        yield* Console.log(`no changes for stack ${result.stackName}`).pipe(
          Effect.when(Effect.succeed(actions.length === 0)),
        );
      });

      /**
       * The renderReconcileResult service method reports resources found by their providers and
       * resources confirmed missing. Available provider identifiers accompany
       * the observed resources for subsequent operator diagnosis.
       */
      const renderReconcileResult = Effect.fn(
        "StackWorkflowRenderer.renderReconcileResult",
      )(function* (result: ResourceReconcileResult) {
        const empty = Arr.every(
          [result.resources, result.missing, result.undeclared],
          Arr.isReadonlyArrayEmpty,
        );

        yield* Match.value(empty).pipe(
          Match.when(true, () =>
            Console.log(
              `Stack "${result.stackName}" has no saved resources to reconcile. Run create to deploy it.`,
            ),
          ),
          Match.orElse(() =>
            Console.log(`Reconciled stack "${result.stackName}"`),
          ),
        );

        yield* Effect.forEach(
          result.resources,
          (node) =>
            Console.log(
              `\u001b[36m[=] ${model.resourceLabel(node)} reconciled ${renderResourceIdentifier(node)}\u001b[0m`,
            ),
          { discard: true },
        );

        yield* Effect.forEach(
          result.missing,
          (node) =>
            Console.log(
              `\u001b[33m[?] ${model.resourceLabel(node)} not found\u001b[0m`,
            ),
          { discard: true },
        );

        yield* Effect.forEach(
          result.undeclared,
          (node) =>
            Console.log(
              `  ${model.resourceLabel(node)}  kept in state. Run diff to review its removal.`,
            ),
          { discard: true },
        );
      });

      return {
        renderPlan,
        renderDiff,
        renderDependencies,
        renderSavedResources,
        renderSavedResource,
        watchProgress,
        renderApplyResult,
        renderDestroyResult,
        renderReconcileResult,
      };
    }),
  },
) {}

export const stackWorkflowRendererLayer = Layer.effect(
  StackWorkflowRenderer,
  StackWorkflowRenderer.make,
).pipe(
  Layer.provide(resourceStackProgressLayer),
  Layer.provideMerge(resourceModelLayer),
);
