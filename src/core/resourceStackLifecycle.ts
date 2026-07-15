import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Exit,
  Graph,
  Match,
  Option,
} from "effect";

import {
  PlanDecision,
  ResourceCommand,
  type ResourceCommandResult,
} from "./lifecycle.js";
import {
  keyString,
  PlanAction,
  type PlanAction as PlanActionValue,
  type ResourceNode,
  type ResourcePlan,
} from "./model.js";
import type { ResourceDependencyGraph } from "./planner.js";
import { ResourcePlanner } from "./planner.js";
import { ResourceCommandPolicy } from "./resourceCommandPolicy.js";
import { ResourceGraphStore } from "./resourceGraphStore.js";
import { ResourceOutputResolver } from "./resourceOutputResolver.js";
import { ResourceStateStore } from "./stateStore.js";

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
 * Applications use this service to prepare, plan, apply, and destroy any
 * resource graph whose providers satisfy `ResourceCommandPolicy`.
 */
export class ResourceStackLifecycle extends Context.Service<ResourceStackLifecycle>()(
  "nomoss/core/resourceStackLifecycle",
  {
    make: Effect.gen(function* () {
      const graphStore = yield* ResourceGraphStore;
      const stateStore = yield* ResourceStateStore;
      const planner = yield* ResourcePlanner;
      const policy = yield* ResourceCommandPolicy;
      const outputResolver = yield* ResourceOutputResolver;

      const nodeByKey = (nodes: ReadonlyArray<ResourceNode>) =>
        new Map(Arr.map(nodes, (node) => [keyString(node.key), node]));

      /**
       * The planner resolves dependency outputs from current state when desired
       * nodes still contain resource refs. If an output is missing, the node
       * remains unresolved so create planning can still introduce the first
       * producer in the graph.
       */
      const graphWithResolvedNodes = Effect.fn(
        "ResourceStackLifecycle.graphWithResolvedNodes",
      )(function* (
        graph: ResourceDependencyGraph,
        resources: ReadonlyArray<ResourceNode>,
      ) {
        const resolvedNodes = yield* Effect.forEach(
          Arr.fromIterable(Graph.nodes(graph)),
          ([index, node]) =>
            Effect.gen(function* () {
              const dependencies = yield* graphStore.dependencyEdgesOf(
                node.key,
              );
              const resolvedNode = yield* Match.value(
                dependencies.length === 0,
              ).pipe(
                Match.when(true, () => Effect.succeed(node)),
                Match.orElse(() =>
                  outputResolver
                    .resolveNode(node, resources, dependencies)
                    .pipe(
                      Effect.catch((cause) =>
                        Match.value(cause).pipe(
                          Match.when(
                            { _tag: "ResourceOutputResolutionMissing" },
                            () => Effect.succeed(node),
                          ),
                          Match.orElse(() => Effect.fail(cause)),
                        ),
                      ),
                    ),
                ),
              );

              return [index, resolvedNode] as const;
            }),
        );
        const resolvedGraph = Graph.mutate(graph, (mutable) => {
          Arr.reduce(resolvedNodes, mutable, (next, [index, node]) => {
            Graph.updateNode(next, index, () => node);

            return next;
          });
        });

        return resolvedGraph;
      });

      const decisionFromAction = (action: PlanAction) =>
        Match.value(action).pipe(
          Match.tagsExhaustive({
            Create: ({ node }) => PlanDecision.Create({ node }),
            Update: ({ node, current }) =>
              PlanDecision.Update({ node, current }),
            Delete: ({ node }) => PlanDecision.Delete({ node }),
            Destroy: ({ node }) => PlanDecision.Destroy({ node }),
          }),
        );

      const resolveAction = Effect.fn("ResourceStackLifecycle.resolveAction")(
        function* (stackName: string, action: PlanActionValue) {
          const resources = yield* stateStore.loadResources(stackName);

          return yield* Match.value(action).pipe(
            Match.when({ _tag: "Create" }, ({ node }) =>
              Effect.gen(function* () {
                const dependencies = yield* graphStore.dependencyEdgesOf(
                  node.key,
                );
                const next = yield* outputResolver.resolveNode(
                  node,
                  resources,
                  dependencies,
                );

                return PlanAction.Create({ node: next });
              }),
            ),
            Match.when({ _tag: "Update" }, ({ node, current }) =>
              Effect.gen(function* () {
                const dependencies = yield* graphStore.dependencyEdgesOf(
                  node.key,
                );
                const next = yield* outputResolver.resolveNode(
                  node,
                  resources,
                  dependencies,
                );

                return PlanAction.Update({
                  node: next,
                  current,
                });
              }),
            ),
            Match.orElse(() => Effect.succeed(action)),
          );
        },
      );

      const appliedNodeFromActionResult = Effect.fn(
        "ResourceStackLifecycle.appliedNodeFromActionResult",
      )(function* (action: PlanActionValue, result: ResourceCommandResult) {
        return yield* Match.value(result).pipe(
          Match.when({ _tag: "Created" }, ({ node }) => Effect.succeed(node)),
          Match.when({ _tag: "Updated" }, ({ node }) => Effect.succeed(node)),
          Match.when({ _tag: "Deleted" }, ({ node }) => Effect.succeed(node)),
          Match.when({ _tag: "Destroyed" }, ({ node }) => Effect.succeed(node)),
          Match.orElse(() =>
            Effect.fail(new ResourceActionResultExpected({ action, result })),
          ),
        );
      });

      const appliedStateTagFromActionResult = (
        result: ResourceCommandResult,
      ): "Created" | "Updated" =>
        Match.value(result).pipe(
          Match.when({ _tag: "Updated" }, (): "Updated" => "Updated"),
          Match.orElse((): "Created" => "Created"),
      );

      /**
       * Apply records started, applied, and failed phases around provider
       * command execution. Interrupted or failed runs can then retry from
       * persisted stack state instead of losing the resource transition.
       */
      const applyAction = Effect.fn("ResourceStackLifecycle.applyAction")(
        function* (stackName: string, action: PlanActionValue) {
          yield* stateStore.markResourceStarted(stackName, action);
          const node = yield* Effect.gen(function* () {
            const resolvedAction = yield* resolveAction(stackName, action);
            const result = yield* policy.execute(
              ResourceCommand.Apply({
                decision: decisionFromAction(resolvedAction),
              }),
            );
            const appliedNode = yield* appliedNodeFromActionResult(
              resolvedAction,
              result,
            );

            yield* stateStore.markResourceApplied(
              stackName,
              appliedNode,
              appliedStateTagFromActionResult(result),
            );

            return appliedNode;
          }).pipe(
            Effect.catch((cause) =>
              stateStore
                .markResourceFailure(
                  stackName,
                  action.node,
                  Match.value(cause).pipe(
                    Match.when(
                      { _tag: "ResourceCommandExecutionFailed" },
                      (failed) => failed.cause,
                    ),
                    Match.orElse(() => cause),
                  ),
                )
                .pipe(Effect.andThen(Effect.fail(cause))),
            ),
          );

          return node;
        },
      );
      const applyScopedAction = Effect.fn(
        "ResourceStackLifecycle.applyScopedAction",
      )(function* (stackName: string, action: PlanActionValue) {
        return yield* Match.value(action).pipe(
          Match.when({ _tag: "Create" }, () =>
            Effect.acquireRelease(
              applyAction(stackName, action),
              (node, exit) =>
                Effect.when(
                  Effect.gen(function* () {
                    const rollbackAction = PlanAction.Destroy({ node });

                    yield* stateStore.markResourceStarted(
                      stackName,
                      rollbackAction,
                    );
                    yield* policy.execute(
                      ResourceCommand.Apply({
                        decision: PlanDecision.Destroy({ node }),
                      }),
                    );
                    yield* stateStore.deleteResourceState(stackName, node);
                  }).pipe(Effect.ignore),
                  Effect.succeed(Exit.isFailure(exit)),
                ),
            ),
          ),
          Match.orElse(() => applyAction(stackName, action)),
        );
      });

      const destroyAction = Effect.fn("ResourceStackLifecycle.destroyAction")(
        function* (
          stackName: string,
          action: PlanActionValue,
          currentResources: ReadonlyMap<string, ResourceNode>,
        ) {
          const currentAction = yield* Match.value(action).pipe(
            Match.when({ _tag: "Destroy" }, ({ node }) =>
              Option.fromUndefinedOr(
                currentResources.get(keyString(node.key)),
              ).pipe(
                Option.match({
                  onNone: () =>
                    Effect.fail(new ResourceCurrentNodeMissing({ action })),
                  onSome: (currentNode) =>
                    Effect.succeed(PlanAction.Destroy({ node: currentNode })),
                }),
              ),
            ),
            Match.orElse(() => Effect.succeed(action)),
          );

          return yield* applyAction(stackName, currentAction);
        },
      );

      return {
        prepare: Effect.fn("ResourceStackLifecycle.prepare")(function* (
          stackName: string,
        ) {
          const desired = yield* graphStore.snapshot;
          const prepared: ResourcePreparedStack = {
            stackName,
            desired,
          };

          return prepared;
        }),

        plan: Effect.fn("ResourceStackLifecycle.plan")(function* (
          prepared: ResourcePreparedStack,
        ) {
          const current = yield* stateStore.loadResources(prepared.stackName);
          const desired = yield* graphWithResolvedNodes(
            prepared.desired,
            current,
          );
          const plan = planner.planFromGraph(desired, current);

          return plan;
        }),

        apply: Effect.fn("ResourceStackLifecycle.apply")(function* (
          prepared: ResourcePreparedStack,
        ) {
          const current = yield* stateStore.loadResources(prepared.stackName);
          const desired = yield* graphWithResolvedNodes(
            prepared.desired,
            current,
          );
          const plan = planner.planFromGraph(desired, current);

          yield* Effect.forEach(
            plan.delete,
            (batch) =>
              Effect.forEach(
                batch,
                (action) => applyAction(prepared.stackName, action),
                { discard: true },
              ),
            { discard: true },
          );

          const appliedNodeBatches = yield* Effect.scoped(
            Effect.forEach(plan.createOrUpdate, (batch) =>
              Effect.forEach(batch, (action) =>
                applyScopedAction(prepared.stackName, action),
              ),
            ),
          );
          const appliedNodes = Arr.flatten(appliedNodeBatches);
          const currentResources = nodeByKey(current);
          const appliedResources = nodeByKey(appliedNodes);
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

          yield* stateStore.saveResources(prepared.stackName, resources);

          const result: ResourceApplyResult = {
            stackName: prepared.stackName,
            plan,
            applied:
              Arr.flatten(plan.createOrUpdate).length +
                Arr.flatten(plan.delete).length >
              0,
            resources,
          };

          return result;
        }),

        destroy: Effect.fn("ResourceStackLifecycle.destroy")(function* (
          prepared: ResourcePreparedStack,
        ) {
          const current = yield* stateStore.loadResources(prepared.stackName);
          const currentResources = nodeByKey(current);
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

          yield* Effect.forEach(
            plan.destroy,
            (batch) =>
              Effect.forEach(
                batch,
                (action) =>
                  destroyAction(prepared.stackName, action, currentResources),
                { discard: true },
              ),
            { discard: true },
          );
          yield* stateStore.saveResources(prepared.stackName, []);

          const result: ResourceDestroyResult = {
            stackName: prepared.stackName,
            plan,
            destroyed: Arr.flatten(plan.destroy).length > 0,
            resources: current,
          };

          return result;
        }),
      };
    }),
  },
) {}
