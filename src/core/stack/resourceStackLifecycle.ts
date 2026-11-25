import {
  Array as Arr,
  Cause,
  Config,
  Context,
  Data,
  Effect,
  Equal,
  Exit,
  Graph,
  HashMap,
  Layer,
  Match,
  Option,
  Predicate,
  Result,
  Schema,
  Struct,
} from "effect";
import { Assets, assetsLayer } from "../asset.js";
import {
  PlanDecision,
  type ResourceActionResult,
  ResourceCommand,
  type ResourceCommandResult,
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
import {
  ResourceCommandPolicy,
  ResourceCommandProgress,
  ResourceCommandStackName,
} from "../resource/resourceCommandPolicy.js";
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
import {
  ResourceStackProgress,
  resourceStackProgressLayer,
} from "./resourceStackProgress.js";

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
  readonly undeclared: ReadonlyArray<ResourceNode>;
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
    return `Resource "${this.logicalId}" has an unfinished operation. Rerun the command that started it before changing the declaration or reconciling the stack.`;
  }
}

export class ResourceObservationExpected extends Data.TaggedError(
  "ResourceObservationExpected",
)<{
  readonly node: ResourceNode;
  readonly result: ResourceCommandResult;
}> {
  override get message() {
    return `Could not confirm the provider state of resource "${this.node.key.logicalId}". Saved state was kept. Check the resource at the provider and run reconcile again.`;
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
      const progress = yield* ResourceStackProgress;
      const assets = yield* Assets;

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

          // The applyAction operation supplies the owning stack so native
          // resource policies can retain physical names across creation retries.
          const result = yield* policy
            .execute(ResourceCommand.Apply({ decision }))
            .pipe(
              Effect.provideService(
                ResourceCommandStackName,
                Option.some(stackName),
              ),
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

          const savedNode: ResourceNode = Option.match(
            Option.fromUndefinedOr(resolvedAction.node.sensitivePropertyPaths),
            {
              onNone: () => appliedNode,
              onSome: (sensitivePropertyPaths) => ({
                ...appliedNode,
                sensitivePropertyPaths,
              }),
            },
          );

          const persistedNode = Option.match(
            Option.fromUndefinedOr(action.node.dependencyLogicalIds),
            {
              onNone: () => savedNode,
              onSome: (dependencyLogicalIds) => ({
                ...savedNode,
                dependencyLogicalIds,
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
              stateStore.markResourceApplied(
                stackName,
                persistedNode,
                "Deleted",
              ),
            ),
            Match.tag("Create", "Update", () =>
              stateStore.markResourceApplied(
                stackName,
                persistedNode,
                stateTag,
              ),
            ),
            Match.exhaustive,
          );

          const operation: ResourceActionResult["operation"] = Option.match(
            unchanged,
            {
              onNone: () => action._tag,
              onSome: () => "NoOp",
            },
          );
          const completed: ResourceActionResult = {
            node: persistedNode,
            operation,
          };

          return completed;
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
       * The applyActions service method returns an execution result for each
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

          const results: ReadonlyArray<ResourceActionResult> =
            yield* Effect.forEach(
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

                yield* stateStore.loadResources(stackName).pipe(
                  Effect.flatMap((resources) =>
                    resolveAction(graph, resources, operation),
                  ),
                  Effect.filterOrFail(
                    (requested) =>
                      requested._tag !== "Create" ||
                      Option.exists(completed, (state) =>
                        model.propsEqual(requested.node, state.node),
                      ),
                    () =>
                      new ResourceOperationInProgress({
                        logicalId: operation.node.key.logicalId,
                      }),
                  ),
                  Effect.when(Effect.succeed(Option.isSome(completed))),
                );

                const result: ResourceActionResult = yield* Option.match(
                  completed,
                  {
                    onNone: () => applyAction(graph, stackName, operation),
                    onSome: (state) =>
                      Effect.succeed({
                        node: state.node,
                        operation: "NoOp" as const,
                      }),
                  },
                );

                return result;
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
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (Effect.onExit and Effect.uninterruptibleMask)
       */
      const executePlannedAction = Effect.fn(
        "ResourceStackLifecycle.executePlannedAction",
      )(
        (
          graph: ResourceDependencyGraph,
          stackName: string,
          action: PlanActionValue,
        ) =>
          Match.value(action).pipe(
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

                const operations = Arr.map(
                  replacement.operations,
                  (operation) =>
                    Match.value(operation).pipe(
                      Match.tag("Create", () =>
                        PlanAction.Create({ node: requested.node }),
                      ),
                      Match.orElse(() => operation),
                    ),
                );

                const results = yield* applyActions(
                  graph,
                  stackName,
                  operations,
                ).pipe(Effect.when(Effect.succeed(needsExecution)));

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

                const operation = Match.value(
                  Option.exists(results, (results) =>
                    Arr.some(results, (result) => result.operation !== "NoOp"),
                  ),
                ).pipe(
                  Match.when(true, () => "Replace" as const),
                  Match.orElse(() => "NoOp" as const),
                );
                const result: ResourceActionResult = {
                  node: applied,
                  operation,
                };

                return result;
              }),
            ),
            Match.orElse((operation) =>
              applyActions(graph, stackName, [operation]).pipe(
                Effect.flatMap((nodes) =>
                  Arr.head(nodes).pipe(Effect.fromOption),
                ),
              ),
            ),
          ),
        (operation, _graph, stackName, action) =>
          Effect.uninterruptibleMask((restore) =>
            progress.start(stackName, action).pipe(
              Effect.flatMap((active) =>
                restore(operation).pipe(
                  Effect.provideService(ResourceCommandProgress, (message) =>
                    progress.note(active, message),
                  ),
                  Effect.onExit((exit) => progress.finish(active, exit)),
                  Effect.map(({ node }) => node),
                ),
              ),
            ),
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
       * The planDestroy service method uses saved ownership and dependencies
       * so a resource removed from the declaration still gets destroyed. A
       * retry plans only instances whose removal has yet to succeed.
       */
      const planDestroy = Effect.fn("ResourceStackLifecycle.planDestroy")(
        function* (prepared: ResourcePreparedStack) {
          const state = yield* stateStore.loadSnapshot(prepared.stackName);

          const owned = stateStore.ownedResources(state.states);

          const destroy = yield* planner.destroyOwnedBatches(
            prepared.stackName,
            owned,
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
            const preparedNode = Struct.assign(node, {
              props: yield* assets.prepare(node.props),
            });

            const dependencies = yield* graphStore.dependencyEdgesOf(
              prepared.desired,
              node.key,
            );

            const resolvedNode = yield* Arr.match(dependencies, {
              onEmpty: () => Effect.succeed(preparedNode),
              onNonEmpty: (dependencies) =>
                outputResolver
                  .resolveNode(preparedNode, state.resources, dependencies)
                  .pipe(
                    Effect.catchTag("ResourceOutputResolutionMissing", () =>
                      Effect.succeed(preparedNode),
                    ),
                  ),
            });

            const dependencyLogicalIds = Arr.dedupe(
              Arr.map(dependencies, ({ source }) => source.logicalId),
            );

            const resolved: readonly [Graph.NodeIndex, ResourceNode] = [
              index,
              { ...resolvedNode, dependencyLogicalIds },
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

        const owned = stateStore.ownedResources(state.states);

        const actions = yield* planner.planFromGraph(
          prepared.stackName,
          desired,
          state.resources,
          owned,
          state.states,
        );

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
       * The reconcile service method refreshes applied resources that have a
       * current declaration. It retains undeclared resources for later
       * removal and leaves unfinished operations available for recovery.
       */
      const reconcile = Effect.fn("ResourceStackLifecycle.reconcile")(
        function* (prepared: ResourcePreparedStack) {
          const state = yield* stateStore.loadSnapshot(prepared.stackName);

          yield* Effect.forEach(
            Arr.filter(
              state.states,
              Predicate.not(
                Predicate.Struct({
                  _tag: Predicate.or(
                    Equal.equals("Created"),
                    Equal.equals("Updated"),
                  ),
                }),
              ),
            ),
            (instance) =>
              Effect.fail(
                new ResourceOperationInProgress({
                  logicalId: instance.node.key.logicalId,
                }),
              ),
          );

          const declared = HashMap.fromIterable(
            Arr.map(
              Arr.fromIterable(Graph.nodes(prepared.desired)),
              ([, node]) => [node.key.logicalId, node.schema] as const,
            ),
          );
          const [managed, undeclared] = Arr.partition(
            state.resources,
            (node) => {
              const { provider, service, resource, operation } = node.schema;

              return HashMap.get(declared, node.key.logicalId).pipe(
                Option.filter(
                  Predicate.Struct({
                    provider: Equal.equals(provider),
                    service: Equal.equals(service),
                    resource: Equal.equals(resource),
                    operation: Equal.equals(operation),
                  }),
                ),
                Option.match({
                  onNone: () => Result.fail(node),
                  onSome: () => Result.succeed(node),
                }),
              );
            },
          );

          const observations = yield* Effect.forEach(managed, (node) =>
            policy.execute(ResourceCommand.Read({ node })).pipe(
              Effect.flatMap(
                Match.type<ResourceCommandResult>().pipe(
                  Match.when(
                    { _tag: "Observed", observation: { _tag: "Present" } },
                    ({ observation }) =>
                      Effect.succeed(Result.succeed(observation.node)),
                  ),
                  Match.when(
                    { _tag: "Observed", observation: { _tag: "Missing" } },
                    ({ observation }) =>
                      Effect.succeed(Result.fail(observation.node)),
                  ),
                  Match.orElse((result) =>
                    Effect.fail(
                      new ResourceObservationExpected({ node, result }),
                    ),
                  ),
                ),
              ),
            ),
          );

          const [resources, missing] = Arr.separate(observations);

          yield* stateStore
            .saveResources(
              prepared.stackName,
              Arr.appendAll(undeclared, resources),
            )
            .pipe(
              Effect.when(Effect.succeed(Arr.isReadonlyArrayNonEmpty(managed))),
            );

          const result: ResourceReconcileResult = {
            stackName: prepared.stackName,
            resources,
            missing,
            undeclared,
          };

          return result;
        },
      );

      const executeApplyAction = Effect.fn(
        "ResourceStackLifecycle.executeApplyAction",
      )(
        (
          graph: ResourceDependencyGraph,
          stackName: string,
          action: PlanActionValue,
        ) =>
          Match.value(action).pipe(
            Match.tag("Create", (create) =>
              Effect.acquireRelease(
                executePlannedAction(graph, stackName, create),
                (node, exit) =>
                  Exit.match(exit, {
                    onFailure: () =>
                      Effect.ignore(rollbackCreatedResource(stackName, node)),
                    onSuccess: () => Effect.void,
                  }),
              ),
            ),
            Match.orElse((existing) =>
              executePlannedAction(graph, stackName, existing),
            ),
          ),
      );

      /**
       * The applyPlan service method executes the reviewed plan if its saved
       * state still matches. Deletions run first. A provider failure stops later
       * dependency batches. Independent actions in the current batch can
       * finish and save their results so rollback can identify new resources.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (Effect.validate and Effect.scoped)
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Config.ts (Config.schema and Config.withDefault)
       */
      const applyPlan = Effect.fn("ResourceStackLifecycle.applyPlan")(
        function* (planned: ResourceApplyPlan) {
          yield* validatePlan(planned);

          const concurrency = yield* Config.schema(
            Schema.Int.check(Schema.isGreaterThanOrEqualTo(1)),
            "NOMOSS_MAX_CONCURRENT_ACTIONS",
          ).pipe(Config.withDefault("unbounded"));

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

          // A failed batch uses Effect.validate to let independent
          // creations register their rollback before the scope closes.
          const appliedNodeBatches = yield* Effect.forEach(
            plan.createOrUpdate,
            (batch) =>
              Effect.validate(
                batch,
                (action) => executeApplyAction(desired, stackName, action),
                { concurrency },
              ).pipe(
                Effect.catch((failures) => {
                  const reasons = Arr.map(failures, Cause.makeFailReason);

                  return Effect.failCause(Cause.fromReasons(reasons));
                }),
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

          const resources = Arr.map(desiredResources, (node) => {
            const applied = Option.fromUndefinedOr(
              appliedResources.get(node.key.logicalId),
            ).pipe(
              Option.orElse(() =>
                Option.fromUndefinedOr(
                  currentResources.get(node.key.logicalId),
                ),
              ),
              Option.getOrElse(() => node),
            );

            return {
              ...applied,
              dependencyLogicalIds: node.dependencyLogicalIds ?? [],
            };
          });

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
       * The destroyPlan service method checks that saved state still matches
       * the reviewed teardown. Each successful removal releases its own
       * record, leaving failed or unstarted operations available for retry.
       */
      const destroyPlan = Effect.fn("ResourceStackLifecycle.destroyPlan")(
        function* (planned: ResourceDestroyPlan) {
          yield* validatePlan(planned);

          const { stackName, desired, plan } = planned;
          const actions = Arr.flatten(plan.destroy);

          yield* Effect.annotateCurrentSpan({
            "nomoss.stack.name": stackName,
            "nomoss.plan.destroy_count": actions.length,
          });

          yield* Effect.forEach(
            actions,
            (action) => executePlannedAction(desired, stackName, action),
            { discard: true },
          );

          const result: ResourceDestroyResult = {
            stackName,
            plan,
            destroyed: actions.length > 0,
            resources: Arr.map(actions, ({ node }) => node),
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
    resourceStackProgressLayer,
    assetsLayer,
  ]),
);
