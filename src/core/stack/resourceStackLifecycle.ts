import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Equal,
  Exit,
  Graph,
  Layer,
  Match,
  Option,
  Predicate,
  Schema,
  Struct,
} from "effect";

import {
  PlanDecision,
  ResourceCommand,
  type ResourceCommandResult,
  type ResourceObservation,
} from "../resource/lifecycle.js";
import {
  PlanAction,
  type PlanAction as PlanActionValue,
  ResourceModel,
  type ResourceNode,
  type ResourceOperation,
  type ResourcePlan,
  resourceGeneration,
  resourceInstanceKey,
} from "../resource/model.js";
import { ResourceCommandPolicy } from "../resource/resourceCommandPolicy.js";
import {
  ResourceGraphStore,
  resourceGraphStoreLayer,
} from "../resource/resourceGraphStore.js";
import {
  ResourceOutputResolver,
  resourceOutputResolverLayer,
} from "../resource/resourceOutputResolver.js";
import {
  type ResourceState,
  ResourceStateSchema,
  type ResourceStateSnapshot,
} from "../state/resourceState.js";
import {
  ResourceStateStore,
  resourceStateStoreBaseLayer,
} from "../state/stateStore.js";
import type { ResourceDependencyGraph } from "./planner.js";
import { ResourcePlanner, resourcePlannerLayer } from "./planner.js";

export type ResourcePreparedStack = {
  readonly stackName: string;
  readonly desired: ResourceDependencyGraph;
};

export type ResourceApplyResult = {
  readonly stackName: string;
  readonly plan: ResourcePlan;
  readonly applied: boolean;
  readonly resources: ReadonlyArray<ResourceNode>;
};

export type ResourceDestroyResult = {
  readonly stackName: string;
  readonly plan: ResourcePlan;
  readonly destroyed: boolean;
  readonly resources: ReadonlyArray<ResourceNode>;
};

export interface ResourceStackPlan {
  readonly stackName: string;
  readonly desired: ResourceDependencyGraph;
  readonly state: ResourceStateSnapshot;
  readonly plan: ResourcePlan;
}

export interface ResourceApplyPlan extends ResourceStackPlan {
  readonly _tag: "Apply";
}

export interface ResourceDestroyPlan extends ResourceStackPlan {
  readonly _tag: "Destroy";
}

export class ResourcePlanInvalidated extends Data.TaggedError(
  "ResourcePlanInvalidated",
)<{
  readonly stackName: string;
}> {
  override get message() {
    return `Saved state changed for stack ${this.stackName}; prepare a new plan`;
  }
}

export type ResourceReconcileResult = {
  readonly stackName: string;
  readonly resources: ReadonlyArray<ResourceNode>;
  readonly missing: ReadonlyArray<ResourceNode>;
};

export class ResourceActionResultExpected extends Data.TaggedError(
  "ResourceActionResultExpected",
)<{
  readonly action: PlanActionValue;
  readonly result: ResourceCommandResult;
}> {}

export class ResourceCurrentNodeMissing extends Data.TaggedError(
  "ResourceCurrentNodeMissing",
)<{
  readonly action: PlanActionValue;
}> {}

/**
 * The ResourceOperationInProgress error requires the caller to complete or
 * remove saved instances before changing their requested configuration or
 * reconciling them as a single applied resource.
 */
export class ResourceOperationInProgress extends Data.TaggedError(
  "ResourceOperationInProgress",
)<{
  readonly logicalId: string;
}> {
  override get message() {
    return `Resource ${this.logicalId} has unfinished operations; complete or remove its saved instances before changing or reconciling it`;
  }
}

export class ResourceObservationExpected extends Data.TaggedError(
  "ResourceObservationExpected",
)<{
  readonly node: ResourceNode;
  readonly result: ResourceCommandResult;
}> {}

/**
 * A mapped resource read requires identity established by saved provider state.
 * Reconciliation reports this failure before a declaration's placeholder could
 * reach the provider. Recovery without saved identity needs a discovery policy.
 */
export class ResourceReadIdentityMissing extends Data.TaggedError(
  "ResourceReadIdentityMissing",
)<{
  readonly logicalId: string;
}> {
  override get message() {
    return `Resource ${this.logicalId} has no saved provider identity for reconciliation`;
  }
}

/**
 * The ResourceStackLifecycle service retains the prepared graph and saved state
 * that select each plan's actions so callers can review the plan before
 * execution. Planning, reconciliation, apply, and teardown use the prepared
 * stack. Recorded action outcomes explain completed work and failures to later
 * runs.
 */
export class ResourceStackLifecycle extends Context.Service<ResourceStackLifecycle>()(
  "nomoss/core/stack/resourceStackLifecycle",
  {
    make: Effect.gen(function* () {
      const graphStore = yield* ResourceGraphStore;
      const stateStore = yield* ResourceStateStore;
      const planner = yield* ResourcePlanner;
      const policy = yield* ResourceCommandPolicy;
      const outputResolver = yield* ResourceOutputResolver;
      const model = yield* ResourceModel;

      const equivalentStates = Schema.toEquivalence(
        Schema.Array(ResourceStateSchema),
      );

      /**
       * The resolveAction service method requires applied source values for
       * deferred creation and update inputs. Missing or invalid values stop
       * the mutation, while removal actions retain their saved provider identities.
       */
      const resolveAction = Effect.fn("ResourceStackLifecycle.resolveAction")(
        function* (
          graph: ResourceDependencyGraph,
          resources: ReadonlyArray<ResourceNode>,
          action: ResourceOperation,
        ) {
          const node = yield* Match.value(action).pipe(
            Match.tag("Create", "Update", (pending) =>
              graphStore
                .dependencyEdgesOf(graph, pending.node.key)
                .pipe(
                  Effect.flatMap((dependencies) =>
                    outputResolver.resolveNode(
                      pending.node,
                      resources,
                      dependencies,
                    ),
                  ),
                ),
            ),
            Match.orElse(() => Effect.succeed(action.node)),
          );
          const resolved: ResourceOperation = Match.value(action).pipe(
            Match.tag("Create", () => PlanAction.Create({ node })),
            Match.tag("Update", ({ current }) =>
              PlanAction.Update({ node, current }),
            ),
            Match.tag("Delete", "Destroy", () => action),
            Match.exhaustive,
          );

          return resolved;
        },
      );

      /**
       * The applyAction service method returns after the provider result has
       * been saved for later actions and retries. Provider execution remains
       * interruptible, and result persistence finishes before interruption can
       * be observed. An update with unchanged resolved inputs keeps the current
       * provider node. Input-resolution and provider failures retain their tags
       * in the saved operation record.
       */
      const applyAction = Effect.fn("ResourceStackLifecycle.applyAction")(
        function* (
          graph: ResourceDependencyGraph,
          stackName: string,
          action: ResourceOperation,
        ) {
          yield* Effect.spanAnnotations.pipe(
            Effect.flatMap(Effect.annotateCurrentSpan),
          );

          yield* stateStore.markResourceStarted(stackName, action);

          const resources = yield* stateStore.loadResources(stackName);

          const resolvedAction: ResourceOperation = yield* resolveAction(
            graph,
            resources,
            action,
          ).pipe(
            Effect.tapErrorTag(
              [
                "ResourceOutputResolutionMissing",
                "ResourceOutputPropertyPathInvalid",
                "ResourceOutputSchemaMissing",
                "ResourceEntityTypeMismatch",
                "ResourceReferenceSourceMismatch",
                "ResourceRequestSchemaMissing",
                "SchemaError",
              ],
              (failure) =>
                stateStore.markResourceFailure(stackName, action.node, failure),
            ),
          );

          const unchanged = Match.value(resolvedAction).pipe(
            Match.tag("Update", ({ node, current }) =>
              Option.some(current).pipe(
                Option.filter(() => model.propsEqual(node, current)),
              ),
            ),
            Match.orElse(() => Option.none<ResourceNode>()),
          );
          yield* Effect.annotateCurrentSpan({
            "nomoss.resource.inputs_unchanged": Option.isSome(unchanged),
          });
          const decision: PlanDecision = Match.value(resolvedAction).pipe(
            Match.tag("Create", ({ node }) => PlanDecision.Create({ node })),
            Match.tag("Update", ({ node, current }) =>
              PlanDecision.Update({ node, current }),
            ),
            Match.tag("Delete", ({ node }) => PlanDecision.Delete({ node })),
            Match.tag("Destroy", ({ node }) => PlanDecision.Destroy({ node })),
            Match.exhaustive,
          );

          const result = yield* policy
            .execute(ResourceCommand.Apply({ decision }))
            .pipe(
              Effect.interruptible,
              Effect.tapErrorTag(
                "ResourceCommandExecutionFailed",
                ({ cause }) =>
                  stateStore.markResourceFailure(stackName, action.node, cause),
              ),
              Effect.when(Effect.succeed(Option.isNone(unchanged))),
            );

          const providerNode = yield* result.pipe(
            Option.map((result) =>
              Match.value(result).pipe(
                Match.tag(
                  "Created",
                  "Updated",
                  "Deleted",
                  "Destroyed",
                  ({ node }) => Effect.succeed(node),
                ),
                Match.orElse(() =>
                  Effect.fail(
                    new ResourceActionResultExpected({
                      action: resolvedAction,
                      result,
                    }),
                  ),
                ),
              ),
            ),
            Effect.transposeOption,
            Effect.tapErrorTag("ResourceActionResultExpected", (failure) =>
              stateStore.markResourceFailure(stackName, action.node, failure),
            ),
          );
          const providerResource = yield* providerNode.pipe(
            Option.orElse(() => unchanged),
            Effect.fromOption,
          );
          const appliedNode: ResourceNode = Option.match(
            Option.fromUndefinedOr(action.node.relationships),
            {
              onNone: () => Struct.omit(providerResource, ["relationships"]),
              onSome: (relationships) => ({
                ...providerResource,
                relationships,
              }),
            },
          );
          const stateTag: "Created" | "Updated" = result.pipe(
            Option.map((result) =>
              Match.value(result).pipe(
                Match.tag("Updated", (): "Updated" => "Updated"),
                Match.orElse((): "Created" => "Created"),
              ),
            ),
            Option.getOrElse((): "Updated" => "Updated"),
          );

          yield* Match.value(action).pipe(
            Match.tag("Delete", "Destroy", () =>
              stateStore.markResourceApplied(stackName, appliedNode, "Deleted"),
            ),
            Match.tag("Create", "Update", () =>
              stateStore.markResourceApplied(stackName, appliedNode, stateTag),
            ),
            Match.exhaustive,
          );

          return appliedNode;
        },
        (effect, _graph, stackName, action) =>
          effect.pipe(
            Effect.uninterruptible,
            Effect.annotateSpans({
              "nomoss.stack.name": stackName,
              "nomoss.resource.logical_id": action.node.key.logicalId,
              "nomoss.resource.operation": action._tag,
              "nomoss.resource.provider": action.node.schema.provider,
              "nomoss.resource.service": action.node.schema.service,
              "nomoss.resource.type":
                action.node.schema.cloudControl?.typeName ??
                action.node.schema.resource,
            }),
          ),
      );

      /**
       * The applyActions service method returns a provider node for each
       * supplied operation in the supplied order. Distinct provider instances
       * sharing a logical resource ID must have distinct generations. A saved
       * creation is reusable only when its resolved properties match the saved
       * request. A failure after removal retains both the intended creation and
       * the completed removal for retry. Success commits completed removals so
       * application outputs can advance to the remaining applied instance.
       */
      const applyActions = Effect.fn("ResourceStackLifecycle.applyActions")(
        function* (
          graph: ResourceDependencyGraph,
          stackName: string,
          operations: ReadonlyArray<ResourceOperation>,
        ) {
          const saved = yield* stateStore.loadResourceStates(stackName);

          const creations = Arr.filter(
            operations,
            Predicate.and(
              Predicate.Struct({ _tag: Equal.equals("Create") }),
              Predicate.not((operation: ResourceOperation) =>
                Arr.some(
                  saved,
                  (state) =>
                    resourceInstanceKey(state.node) ===
                    resourceInstanceKey(operation.node),
                ),
              ),
            ),
          );

          yield* Effect.forEach(creations, (create) =>
            stateStore.markResourceStarted(stackName, create),
          );

          const results: ReadonlyArray<ResourceNode> = yield* Effect.forEach(
            operations,
            Effect.fnUntraced(function* (operation) {
              const states = yield* stateStore.loadResourceStates(stackName);
              const completed = Arr.findFirst(
                states,
                Predicate.and(
                  (state: ResourceState) =>
                    resourceInstanceKey(state.node) ===
                    resourceInstanceKey(operation.node),
                  (state) =>
                    Match.value(operation).pipe(
                      Match.tag("Create", () =>
                        Predicate.Struct({
                          _tag: Predicate.or(
                            Equal.equals("Created"),
                            Equal.equals("Updated"),
                          ),
                        })(state),
                      ),
                      Match.tag(
                        "Delete",
                        "Destroy",
                        () => state._tag === "Deleted",
                      ),
                      Match.tag("Update", () => false),
                      Match.exhaustive,
                    ),
                ),
              );

              return yield* Option.match(completed, {
                onNone: () => applyAction(graph, stackName, operation),
                onSome: (state) =>
                  stateStore.loadResources(stackName).pipe(
                    Effect.flatMap((resources) =>
                      resolveAction(graph, resources, operation),
                    ),
                    Effect.filterOrFail(
                      Predicate.or(
                        Predicate.not(
                          Predicate.Struct({ _tag: Equal.equals("Create") }),
                        ),
                        (requested: ResourceOperation) =>
                          model.propsEqual(requested.node, state.node),
                      ),
                      () =>
                        new ResourceOperationInProgress({
                          logicalId: operation.node.key.logicalId,
                        }),
                    ),
                    Effect.map(() => state.node),
                  ),
              });
            }),
          );

          yield* Effect.forEach(
            Arr.dedupe(
              Arr.map(operations, (operation) => operation.node.key.logicalId),
            ),
            (logicalId) =>
              stateStore.completeResourceActions(stackName, { logicalId }),
          );

          return results;
        },
      );

      /**
       * The executePlannedAction service method retains the current instance
       * when refreshed dependency values leave its request unchanged. Once a
       * successor has saved progress, execution completes the reviewed remaining
       * operations and returns that applied instance.
       */
      const executePlannedAction = Effect.fn(
        "ResourceStackLifecycle.executePlannedAction",
      )(function* (
        graph: ResourceDependencyGraph,
        stackName: string,
        action: PlanActionValue,
      ) {
        return yield* Match.value(action).pipe(
          Match.tag("Replace", (replacement) =>
            Effect.gen(function* () {
              const before = yield* stateStore.loadSnapshot(stackName);
              const requested = yield* resolveAction(
                graph,
                before.resources,
                PlanAction.Create({ node: replacement.node }),
              );
              const started = Arr.some(
                before.states,
                (state) =>
                  resourceInstanceKey(state.node) ===
                  resourceInstanceKey(replacement.node),
              );
              const needsExecution = Predicate.or(
                () => started,
                Predicate.not((node: ResourceNode) =>
                  model.propsEqual(node, replacement.current),
                ),
              )(requested.node);
              const operations = Arr.map(replacement.operations, (operation) =>
                Match.value(operation).pipe(
                  Match.tag("Create", () =>
                    PlanAction.Create({ node: requested.node }),
                  ),
                  Match.orElse(() => operation),
                ),
              );

              yield* applyActions(graph, stackName, operations).pipe(
                Effect.when(Effect.succeed(needsExecution)),
              );
              yield* stateStore.completeResourceActions(
                stackName,
                replacement.node.key,
              );

              const expected = Match.value(needsExecution).pipe(
                Match.when(false, () => replacement.current),
                Match.orElse(() => replacement.node),
              );
              const resources = yield* stateStore.loadResources(stackName);
              const applied = yield* Arr.findFirst(
                resources,
                (node) =>
                  resourceInstanceKey(node) === resourceInstanceKey(expected),
              ).pipe(Effect.fromOption);

              return applied;
            }),
          ),
          Match.orElse((operation) =>
            applyActions(graph, stackName, [operation]).pipe(
              Effect.flatMap((nodes) =>
                Arr.head(nodes).pipe(Effect.fromOption),
              ),
            ),
          ),
        );
      });

      /**
       * The removalActions helper uses the captured state snapshot to address
       * every instance still owned by a logical resource. This includes both
       * objects from an unfinished replacement. Only instances with a saved
       * applied identity contribute a removal action.
       */
      const removalActions = (
        node: ResourceNode,
        state: ResourceStateSnapshot,
        command: "Delete" | "Destroy",
      ) =>
        Arr.map(
          Arr.filter(
            stateStore.ownedResources(state.states),
            (owned) => owned.key.logicalId === node.key.logicalId,
          ),
          (owned) =>
            Match.value(command).pipe(
              Match.when("Delete", () => PlanAction.Delete({ node: owned })),
              Match.orElse(() => PlanAction.Destroy({ node: owned })),
            ),
        );

      /**
       * The rollbackCreatedResource service method destroys a resource created
       * by an apply scope that later failed. It removes the saved record only
       * after provider destruction succeeds, so recovery information remains
       * available if destruction fails.
       */
      const rollbackCreatedResource = Effect.fn(
        "ResourceStackLifecycle.rollbackCreatedResource",
      )(function* (stackName: string, node: ResourceNode) {
        const rollbackAction = PlanAction.Destroy({ node });

        yield* stateStore.markResourceStarted(stackName, rollbackAction);

        yield* policy.execute(
          ResourceCommand.Apply({
            decision: PlanDecision.Destroy({ node }),
          }),
        );

        yield* stateStore.deleteResourceState(stackName, node);
      });

      /**
       * The planDestroy service method retains saved provider identities for
       * each owned instance, including unfinished replacements. Its reverse
       * dependency order removes consumers before their sources. A retry plans
       * only instances whose removal has yet to succeed.
       */
      const planDestroy = Effect.fn("ResourceStackLifecycle.planDestroy")(
        function* (prepared: ResourcePreparedStack) {
          const state = yield* stateStore.loadSnapshot(prepared.stackName);

          const currentResources = new Map(
            Arr.map(state.resources, (node) => [node.key.logicalId, node]),
          );
          const desiredResources = stateStore.resourcesFromGraph(
            prepared.desired,
          );

          const savedDesiredResources = Arr.filter(desiredResources, (node) =>
            currentResources.has(node.key.logicalId),
          );

          const destroy: ResourcePlan["destroy"] = Arr.filter(
            Arr.map(
              planner.destroyBatches(
                prepared.desired,
                Arr.map(savedDesiredResources, (node) => node.key),
              ),
              (batch) =>
                Arr.flatMap(batch, (action) =>
                  removalActions(action.node, state, "Destroy"),
                ),
            ),
            Arr.isArrayNonEmpty,
          );

          const plan: ResourcePlan = {
            createOrUpdate: [],
            delete: [],
            destroy,
          };

          const result: ResourceDestroyPlan = {
            _tag: "Destroy",
            stackName: prepared.stackName,
            desired: prepared.desired,
            state,
            plan,
          };

          return result;
        },
      );

      /**
       * validatePlan rejects execution when saved lifecycle records differ from
       * the plan's captured state. A phase-only change also produces
       * ResourcePlanInvalidated before provider mutation.
       */
      const validatePlan = Effect.fn("ResourceStackLifecycle.validatePlan")(
        function* (planned: ResourceStackPlan) {
          const state: ResourceStateSnapshot = yield* stateStore
            .loadSnapshot(planned.stackName)
            .pipe(
              Effect.filterOrFail(
                (current) =>
                  equivalentStates(current.states, planned.state.states),
                () =>
                  new ResourcePlanInvalidated({ stackName: planned.stackName }),
              ),
            );

          return state;
        },
      );

      /**
       * The prepare service method retains the declared graph and associates
       * resource outputs with this stack's restored working state. Subsequent graph resets
       * preserve that ownership. Reusing the same graph for another stack fails
       * before it can redirect existing outputs. Preparation makes no provider
       * observations or mutations.
       */
      const prepare = Effect.fn("ResourceStackLifecycle.prepare")(function* (
        stackName: string,
      ) {
        const desired = yield* graphStore.bindStack(stackName, stateStore);

        const prepared: ResourcePreparedStack = {
          stackName,
          desired,
        };

        return prepared;
      });

      /**
       * plan selects changes for a prepared stack against its saved values.
       * The result captures the graph and state used for comparison, including
       * available outputs, so execution can validate the reviewed plan later.
       */
      const plan = Effect.fn("ResourceStackLifecycle.plan")(function* (
        prepared: ResourcePreparedStack,
      ) {
        const state = yield* stateStore.loadSnapshot(prepared.stackName);

        const resolvedNodes = yield* Effect.forEach(
          Graph.nodes(prepared.desired),
          Effect.fnUntraced(function* ([index, node]) {
            const dependencies = yield* graphStore.dependencyEdgesOf(
              prepared.desired,
              node.key,
            );

            const resolvedNode = yield* Arr.match(dependencies, {
              onEmpty: () => Effect.succeed(node),
              onNonEmpty: (dependencies) =>
                outputResolver
                  .resolveNode(node, state.resources, dependencies)
                  .pipe(
                    Effect.catchTag("ResourceOutputResolutionMissing", () =>
                      Effect.succeed(node),
                    ),
                  ),
            });

            const resolved: readonly [Graph.NodeIndex, ResourceNode] = [
              index,
              resolvedNode,
            ];

            return resolved;
          }),
        );

        const desired: ResourceDependencyGraph = Graph.mutate(
          prepared.desired,
          (mutable) => {
            Arr.forEach(resolvedNodes, ([index, node]) =>
              Graph.updateNode(mutable, index, () => node),
            );
          },
        );

        const declared = stateStore.resourcesFromGraph(desired);

        yield* Effect.forEach(
          Arr.filter(state.states, (instance) =>
            Option.exists(
              Arr.findFirst(
                state.resources,
                (node) => node.key.logicalId === instance.node.key.logicalId,
              ),
              (node) =>
                resourceGeneration(instance.node) > resourceGeneration(node),
            ),
          ),
          (instance) =>
            Effect.succeed(
              Arr.findFirst(
                declared,
                (node) => node.key.logicalId === instance.node.key.logicalId,
              ),
            ).pipe(
              Effect.filterOrFail(
                Option.match({
                  onNone: () => true,
                  onSome: (node: ResourceNode) =>
                    model.propsEqual(instance.node, node),
                }),
                () =>
                  new ResourceOperationInProgress({
                    logicalId: instance.node.key.logicalId,
                  }),
              ),
            ),
        );

        const selected = planner.planFromGraph(
          desired,
          state.resources,
          [],
          state.states,
        );
        const actions: ResourcePlan = {
          ...selected,
          delete: Arr.filter(
            Arr.map(selected.delete, (batch) =>
              Arr.flatMap(batch, (action) =>
                removalActions(action.node, state, "Delete"),
              ),
            ),
            Arr.isArrayNonEmpty,
          ),
        };

        yield* Effect.annotateCurrentSpan({
          "nomoss.stack.name": prepared.stackName,
          "nomoss.plan.apply_count": Arr.flatten(actions.createOrUpdate).length,
          "nomoss.plan.delete_count": Arr.flatten(actions.delete).length,
        });

        const planned: ResourceApplyPlan = {
          _tag: "Apply",
          stackName: prepared.stackName,
          desired,
          state,
          plan: actions,
        };

        return planned;
      });

      /**
       * The reconcile service method refreshes declared resources through saved provider identities
       * when available. The result separates present and missing resources;
       * present results replace the saved collection. Reconciliation does not
       * execute repairs.
       */
      const reconcile = Effect.fn("ResourceStackLifecycle.reconcile")(
        function* (prepared: ResourcePreparedStack) {
          const state = yield* stateStore.loadSnapshot(prepared.stackName);

          yield* Effect.forEach(
            Arr.filter(state.states, (instance) =>
              Arr.some(
                state.states,
                Predicate.and(
                  (other: ResourceState) =>
                    instance.node.key.logicalId === other.node.key.logicalId,
                  (other) =>
                    resourceInstanceKey(instance.node) !==
                    resourceInstanceKey(other.node),
                ),
              ),
            ),
            (instance) =>
              Effect.fail(
                new ResourceOperationInProgress({
                  logicalId: instance.node.key.logicalId,
                }),
              ),
          );

          const saved = new Map(
            Arr.map(state.resources, (node) => [node.key.logicalId, node]),
          );
          const desired = Arr.map(
            Arr.fromIterable(Graph.nodes(prepared.desired)),
            ([, node]) => node,
          );

          const observations = yield* Effect.forEach(desired, (declared) =>
            Effect.gen(function* () {
              const persisted = Option.fromUndefinedOr(
                saved.get(declared.key.logicalId),
              );

              yield* Effect.fail(
                new ResourceReadIdentityMissing({
                  logicalId: declared.key.logicalId,
                }),
              ).pipe(
                Effect.when(
                  Effect.succeed(
                    Predicate.and(Option.isNone, () =>
                      Predicate.isNotUndefined(
                        declared.schema.primaryIdentifier,
                      ),
                    )(persisted),
                  ),
                ),
              );

              const node: ResourceNode = Option.getOrElse(
                persisted,
                () => declared,
              );

              const observation: ResourceObservation = yield* policy
                .execute(ResourceCommand.Read({ node }))
                .pipe(
                  Effect.filterOrFail(
                    (result) => result._tag === "Observed",
                    (result) =>
                      new ResourceObservationExpected({ node, result }),
                  ),
                  Effect.map(({ observation }) => observation),
                );

              return observation;
            }),
          );

          const resources = Arr.flatMap(
            observations,
            (observation): ReadonlyArray<ResourceNode> =>
              Match.value(observation).pipe(
                Match.when({ _tag: "Present" }, ({ node }) => [node]),
                Match.orElse(() => []),
              ),
          );

          const missing = Arr.flatMap(
            observations,
            (observation): ReadonlyArray<ResourceNode> =>
              Match.value(observation).pipe(
                Match.when({ _tag: "Missing" }, ({ node }) => [node]),
                Match.orElse(() => []),
              ),
          );

          yield* stateStore.saveResources(prepared.stackName, resources);

          const result: ResourceReconcileResult = {
            stackName: prepared.stackName,
            resources,
            missing,
          };

          return result;
        },
      );

      /**
       * applyPlan executes the reviewed plan if its saved state still matches.
       * Deletions precede creation and update batches; actions run
       * sequentially in dependency order. A failed apply scope attempts rollback
       * of its new resources, while success saves the final desired collection.
       */
      const applyPlan = Effect.fn("ResourceStackLifecycle.applyPlan")(
        function* (planned: ResourceApplyPlan) {
          yield* validatePlan(planned);

          const { stackName, desired, plan, state } = planned;

          yield* Effect.annotateCurrentSpan({
            "nomoss.stack.name": stackName,
            "nomoss.plan.apply_count": Arr.flatten(plan.createOrUpdate).length,
            "nomoss.plan.delete_count": Arr.flatten(plan.delete).length,
          });

          yield* Effect.forEach(
            plan.delete,
            (batch) =>
              Effect.forEach(
                batch,
                (action) => executePlannedAction(desired, stackName, action),
                { discard: true },
              ),
            { discard: true },
          );

          const appliedNodeBatches = yield* Effect.forEach(
            plan.createOrUpdate,
            (batch) =>
              Effect.forEach(batch, (action) =>
                Match.value(action).pipe(
                  Match.tag("Create", () =>
                    Effect.acquireRelease(
                      executePlannedAction(desired, stackName, action),
                      (node, exit) =>
                        Exit.match(exit, {
                          onFailure: () =>
                            Effect.ignore(
                              rollbackCreatedResource(stackName, node),
                            ),
                          onSuccess: () => Effect.void,
                        }),
                    ),
                  ),
                  Match.orElse(() =>
                    executePlannedAction(desired, stackName, action),
                  ),
                ),
              ),
          ).pipe(Effect.scoped);

          const appliedNodes = Arr.flatten(appliedNodeBatches);
          const currentResources = new Map(
            Arr.map(state.resources, (node) => [node.key.logicalId, node]),
          );
          const appliedResources = new Map(
            Arr.map(appliedNodes, (node) => [node.key.logicalId, node]),
          );
          const desiredResources = stateStore.resourcesFromGraph(desired);

          const resources = Arr.map(desiredResources, (node) =>
            Option.fromUndefinedOr(
              appliedResources.get(node.key.logicalId),
            ).pipe(
              Option.orElse(() =>
                Option.fromUndefinedOr(
                  currentResources.get(node.key.logicalId),
                ),
              ),
              Option.getOrElse(() => node),
            ),
          );

          yield* stateStore.saveResources(stackName, resources);

          const result: ResourceApplyResult = {
            stackName,
            plan,
            applied:
              Arr.flatten(plan.createOrUpdate).length +
                Arr.flatten(plan.delete).length >
              0,
            resources,
          };

          return result;
        },
      );

      /**
       * The destroyPlan service method executes reviewed teardown with saved provider identities.
       * After state validation, actions run in the plan's removal order and
       * success clears the stack's saved resources. The result retains the
       * former resources so callers can identify what was removed.
       */
      const destroyPlan = Effect.fn("ResourceStackLifecycle.destroyPlan")(
        function* (planned: ResourceDestroyPlan) {
          yield* validatePlan(planned);

          const { stackName, desired, plan, state } = planned;
          yield* Effect.annotateCurrentSpan({
            "nomoss.stack.name": stackName,
            "nomoss.plan.destroy_count": Arr.flatten(plan.destroy).length,
          });

          yield* Effect.forEach(
            plan.destroy,
            (batch) =>
              Effect.forEach(
                batch,
                Effect.fnUntraced(function* (action) {
                  yield* executePlannedAction(desired, stackName, action);
                }),
                { discard: true },
              ),
            { discard: true },
          );

          yield* stateStore.saveResources(stackName, []);

          const result: ResourceDestroyResult = {
            stackName,
            plan,
            destroyed: Arr.flatten(plan.destroy).length > 0,
            resources: state.resources,
          };

          return result;
        },
      );

      /**
       * apply plans and executes a prepared stack in one operation. Applications
       * that require a separate review step can retain the plan and use applyPlan
       * to execute that exact set of changes later.
       */
      const apply = Effect.fn("ResourceStackLifecycle.apply")(function* (
        prepared: ResourcePreparedStack,
      ) {
        const planned = yield* plan(prepared);

        const result: ResourceApplyResult = yield* applyPlan(planned);

        return result;
      });

      /**
       * destroy plans and executes teardown for a prepared stack. A separately
       * reviewed teardown can be executed through destroyPlan with its captured
       * graph and saved-state check intact.
       */
      const destroy = Effect.fn("ResourceStackLifecycle.destroy")(function* (
        prepared: ResourcePreparedStack,
      ) {
        const planned = yield* planDestroy(prepared);

        const result: ResourceDestroyResult = yield* destroyPlan(planned);

        return result;
      });

      return {
        applyActions,
        applyAction,
        rollbackCreatedResource,
        prepare,
        plan,
        planDestroy,
        validatePlan,
        reconcile,
        applyPlan,
        destroyPlan,
        apply,
        destroy,
      };
    }),
  },
) {}

export const resourceStackLifecycleLayer = Layer.effect(
  ResourceStackLifecycle,
  ResourceStackLifecycle.make,
).pipe(
  Layer.provideMerge([
    resourceGraphStoreLayer,
    resourceStateStoreBaseLayer,
    resourcePlannerLayer,
    resourceOutputResolverLayer,
  ]),
);
