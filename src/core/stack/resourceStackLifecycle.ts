import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Exit,
  Graph,
  Layer,
  Match,
  Option,
  Schema,
} from "effect";

import {
  PlanDecision,
  ResourceCommand,
  type ResourceCommandResult,
} from "../resource/lifecycle.js";
import {
  keyString,
  PlanAction,
  type PlanAction as PlanActionValue,
  type ResourceNode,
  type ResourcePlan,
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

export class ResourceObservationExpected extends Data.TaggedError(
  "ResourceObservationExpected",
)<{
  readonly node: ResourceNode;
  readonly result: ResourceCommandResult;
}> {}

/**
 * ResourceStackLifecycle exposes planning, reconciliation, apply, and teardown
 * for a prepared stack. A plan retains the graph and saved state that selected
 * its actions, allowing callers to review it before execution. Recorded action
 * outcomes explain completed work and failures to later runs.
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

      const equivalentStates = Schema.toEquivalence(
        Schema.Array(ResourceStateSchema),
      );

      /**
       * applyAction executes a planned action with a saved phase covering input
       * resolution and provider execution. Failures remain available for later
       * diagnosis. Success returns the provider node used by subsequent actions.
       */
      const applyAction = Effect.fn("ResourceStackLifecycle.applyAction")(
        function* (
          graph: ResourceDependencyGraph,
          stackName: string,
          action: PlanActionValue,
        ) {
          yield* Effect.spanAnnotations.pipe(
            Effect.flatMap(Effect.annotateCurrentSpan),
          );

          yield* stateStore.markResourceStarted(stackName, action);

          const resources = yield* stateStore.loadResources(stackName);

          const resolvedAction: PlanAction = yield* Match.value(action).pipe(
            Match.tag("Create", "Update", (pending) =>
              Effect.gen(function* () {
                const dependencies = yield* graphStore.dependencyEdgesOf(
                  graph,
                  pending.node.key,
                );

                const node = yield* outputResolver.resolveNode(
                  pending.node,
                  resources,
                  dependencies,
                );

                const resolved: PlanAction = Match.value(pending).pipe(
                  Match.tag("Create", () => PlanAction.Create({ node })),
                  Match.tag("Update", ({ current }) =>
                    PlanAction.Update({ node, current }),
                  ),
                  Match.exhaustive,
                );

                return resolved;
              }),
            ),
            Match.orElse(() => Effect.succeed(action)),
            Effect.tapErrorTag(
              [
                "ResourceOutputResolutionMissing",
                "ResourceOutputPropertyPathInvalid",
                "ResourceOutputSchemaMissing",
                "SchemaError",
              ],
              (failure) =>
                stateStore.markResourceFailure(stackName, action.node, failure),
            ),
          );

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
              Effect.tapErrorTag(
                "ResourceCommandExecutionFailed",
                ({ cause }) =>
                  stateStore.markResourceFailure(stackName, action.node, cause),
              ),
            );

          const appliedNode: ResourceNode = yield* Match.value(result).pipe(
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
            Effect.tapErrorTag("ResourceActionResultExpected", (failure) =>
              stateStore.markResourceFailure(stackName, action.node, failure),
            ),
          );

          const stateTag: "Created" | "Updated" = Match.value(result).pipe(
            Match.tag("Updated", (): "Updated" => "Updated"),
            Match.orElse((): "Created" => "Created"),
          );

          yield* stateStore.markResourceApplied(
            stackName,
            appliedNode,
            stateTag,
          );

          return appliedNode;
        },
        (effect, _graph, stackName, action) =>
          effect.pipe(
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
       * rollbackCreatedResource destroys a resource created by an apply scope
       * that later failed. Its saved record is removed only after provider
       * destruction succeeds, preserving recovery information on failure.
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
       * planDestroy selects saved resources still declared by the prepared
       * stack for teardown.
       * The result retains the saved provider identities and state used to
       * select removal actions in reverse dependency order.
       */
      const planDestroy = Effect.fn("ResourceStackLifecycle.planDestroy")(
        function* (prepared: ResourcePreparedStack) {
          const state = yield* stateStore.loadSnapshot(prepared.stackName);

          const currentResources = new Map(
            Arr.map(state.resources, (node) => [keyString(node.key), node]),
          );
          const desiredResources = stateStore.resourcesFromGraph(
            prepared.desired,
          );

          const savedDesiredResources = Arr.filter(desiredResources, (node) =>
            currentResources.has(keyString(node.key)),
          );

          const plan: ResourcePlan = {
            createOrUpdate: [],
            delete: [],
            destroy: planner.destroyBatches(
              prepared.desired,
              Arr.map(savedDesiredResources, (node) => node.key),
            ),
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
       * prepare captures the currently declared graph under the supplied stack
       * name. The snapshot remains usable after subsequent declarations and
       * contains no provider observations or executed mutations.
       */
      const prepare = Effect.fn("ResourceStackLifecycle.prepare")(function* (
        stackName: string,
      ) {
        const desired = yield* graphStore.snapshot;

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

        const actions = planner.planFromGraph(desired, state.resources);

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
       * reconcile refreshes declared resources using saved provider identities
       * when available. The result separates present and missing resources;
       * present results replace the saved collection. Reconciliation does not
       * execute repairs.
       */
      const reconcile = Effect.fn("ResourceStackLifecycle.reconcile")(
        function* (prepared: ResourcePreparedStack) {
          const state = yield* stateStore.loadSnapshot(prepared.stackName);

          const saved = new Map(
            Arr.map(state.resources, (node) => [keyString(node.key), node]),
          );
          const desired = Arr.map(
            Arr.fromIterable(Graph.nodes(prepared.desired)),
            ([, node]) => node,
          );

          const observations = yield* Effect.forEach(desired, (declared) => {
            const node: ResourceNode = Option.fromUndefinedOr(
              saved.get(keyString(declared.key)),
            ).pipe(Option.getOrElse(() => declared));

            return policy.execute(ResourceCommand.Read({ node })).pipe(
              Effect.filterOrFail(
                (result) => result._tag === "Observed",
                (result) => new ResourceObservationExpected({ node, result }),
              ),
              Effect.map(({ observation }) => observation),
            );
          });

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
                (action) => applyAction(desired, stackName, action),
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
                      applyAction(desired, stackName, action),
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
                  Match.orElse(() => applyAction(desired, stackName, action)),
                ),
              ),
          ).pipe(Effect.scoped);

          const appliedNodes = Arr.flatten(appliedNodeBatches);
          const currentResources = new Map(
            Arr.map(state.resources, (node) => [keyString(node.key), node]),
          );
          const appliedResources = new Map(
            Arr.map(appliedNodes, (node) => [keyString(node.key), node]),
          );
          const desiredResources = stateStore.resourcesFromGraph(desired);

          const resources = Arr.map(desiredResources, (node) =>
            Option.fromUndefinedOr(
              appliedResources.get(keyString(node.key)),
            ).pipe(
              Option.orElse(() =>
                Option.fromUndefinedOr(
                  currentResources.get(keyString(node.key)),
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
       * destroyPlan executes reviewed teardown using saved provider identities.
       * After state validation, actions run in the plan's removal order and
       * success clears the stack's saved resources. The result retains the
       * former resources so callers can identify what was removed.
       */
      const destroyPlan = Effect.fn("ResourceStackLifecycle.destroyPlan")(
        function* (planned: ResourceDestroyPlan) {
          yield* validatePlan(planned);

          const { stackName, desired, plan, state } = planned;
          const currentResources = new Map(
            Arr.map(state.resources, (node) => [keyString(node.key), node]),
          );

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
                  const currentAction: PlanAction = yield* Match.value(
                    action,
                  ).pipe(
                    Match.tag("Destroy", () =>
                      Option.fromUndefinedOr(
                        currentResources.get(keyString(action.node.key)),
                      ).pipe(
                        Effect.fromOption,
                        Effect.mapError(
                          () => new ResourceCurrentNodeMissing({ action }),
                        ),
                        Effect.map((node) => PlanAction.Destroy({ node })),
                      ),
                    ),
                    Match.orElse(() => Effect.succeed(action)),
                  );

                  yield* applyAction(desired, stackName, currentAction);
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
       * requiring a separate review step can retain the plan and use applyPlan
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
