import {
  Array as Arr,
  Context,
  Effect,
  Graph,
  HashMap,
  HashSet,
  Match,
  Option,
  Order,
} from "effect";

import {
  type DependencyEdge,
  keyString,
  PlanAction,
  type ResourceKey,
  ResourceModel,
  type ResourceNode,
  type ResourcePlan,
} from "./model.js";

export type ResourceDependencyGraph = Graph.DirectedGraph<
  ResourceNode,
  DependencyEdge
>;

/**
 * Stack lifecycle preparation compares the desired graph with persisted provider
 * state before rendering a plan or executing provider commands. This service
 * turns that comparison into dependency-safe batches for those two consumers.
 */
export type ResourcePlannerService = {
  /**
   * Apply uses these batches when a resource must be created or its declared
   * properties differ from persisted state. Dependencies run before consumers
   * so provider commands can resolve the outputs they require.
   */
  readonly createOrUpdateBatches: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  /**
   * Stack reconciliation uses these actions to remove persisted resources that
   * no longer appear in the desired graph.
   */
  readonly deleteBatches: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  /**
   * Replacement and explicit teardown start from selected roots, then include
   * graph dependents so no surviving resource retains an output reference to a
   * resource being removed.
   */
  readonly destroyBatches: (
    desired: ResourceDependencyGraph,
    destroyRoots: ReadonlyArray<ResourceKey>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  /**
   * Plan rendering and stack execution consume one resource plan so create,
   * delete, and replacement work describe the same desired/current comparison.
   */
  readonly planFromGraph: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
    destroyRoots?: ReadonlyArray<ResourceKey>,
  ) => ResourcePlan;
};

/**
 * Dependency lookup needs the graph node index, while stack rendering and
 * provider execution consume `PlanAction` without graph internals. The planner
 * keeps both facts together until it has assigned the action to a batch.
 */
type SelectedAction = {
  readonly action: PlanAction;
  readonly index: Graph.NodeIndex;
  readonly key: string;
};

const batchDepthOrder = (direction: "forward" | "reverse") =>
  Match.value(direction).pipe(
    Match.when("forward", () => Order.Number),
    Match.orElse(() => Order.flip(Order.Number)),
  );

/**
 * Replacement roots cannot be destroyed alone when graph consumers still
 * depend on their outputs. This traversal selects each root and every outgoing
 * dependent before reverse-depth batching tears them down.
 */
const collectDestroyDependents = (
  desired: ResourceDependencyGraph,
  remaining: ReadonlyArray<Graph.NodeIndex>,
  selected: HashSet.HashSet<string>,
): HashSet.HashSet<string> =>
  Option.match(Arr.head(remaining), {
    onNone: () => selected,
    onSome: (index) =>
      Option.match(
        Option.filter(
          Option.fromUndefinedOr(desired.nodes.get(index)),
          (node) => HashSet.has(selected, keyString(node.key)) === false,
        ),
        {
          onNone: () =>
            collectDestroyDependents(desired, Arr.drop(remaining, 1), selected),
          onSome: (node) =>
            collectDestroyDependents(
              desired,
              Arr.appendAll(
                Arr.drop(remaining, 1),
                Graph.neighborsDirected(desired, index, "outgoing"),
              ),
              HashSet.add(selected, keyString(node.key)),
            ),
        },
      ),
  });

const selectDestroyActions = (
  desired: ResourceDependencyGraph,
  destroyKeys: HashSet.HashSet<string>,
): ReadonlyArray<SelectedAction> =>
  Arr.flatMap(
    Arr.fromIterable(Graph.topo(desired)),
    ([index, node]): ReadonlyArray<SelectedAction> =>
      Match.value(HashSet.has(destroyKeys, keyString(node.key))).pipe(
        Match.when(true, () => [
          {
            action: PlanAction.Destroy({ node }),
            index,
            key: keyString(node.key),
          },
        ]),
        Match.orElse(() => []),
      ),
  );

/**
 * Stack lifecycle sends provider commands only for resources that need create
 * or update work. A prerequisite that already matches persisted provider state
 * therefore has no action or batch depth; treating it as depth `-1` lets its
 * changed dependent enter the first batch instead of waiting for work Nomoss
 * will not run.
 */
const depthByKey = (
  desired: ResourceDependencyGraph,
  selectedActions: ReadonlyArray<SelectedAction>,
): HashMap.HashMap<string, number> =>
  Arr.reduce(
    selectedActions,
    HashMap.empty<string, number>(),
    (depths, entry) =>
      HashMap.set(
        depths,
        entry.key,
        Arr.reduce(
          Graph.neighborsDirected(desired, entry.index, "incoming"),
          -1,
          (highest, dependencyIndex) =>
            Math.max(
              highest,
              Option.getOrElse(
                Option.flatMap(
                  Option.fromUndefinedOr(desired.nodes.get(dependencyIndex)),
                  (dependencyNode) =>
                    HashMap.get(depths, keyString(dependencyNode.key)),
                ),
                () => -1,
              ),
            ),
        ) + 1,
      ),
  );

/**
 * Provider execution can run independent actions together, but an action's
 * incoming graph dependencies must finish first. Depth groups the selected
 * actions into those execution batches for stack lifecycle and AWS apply.
 */
const batchesFor = (
  desired: ResourceDependencyGraph,
  selectedActions: ReadonlyArray<SelectedAction>,
  direction: "forward" | "reverse",
): ReadonlyArray<ReadonlyArray<PlanAction>> => {
  const depths = depthByKey(desired, selectedActions);
  const actionsByDepth = Arr.reduce(
    selectedActions,
    HashMap.empty<number, ReadonlyArray<PlanAction>>(),
    (grouped, entry) =>
      Option.match(HashMap.get(depths, entry.key), {
        onNone: () => grouped,
        onSome: (depth) =>
          HashMap.set(
            grouped,
            depth,
            Arr.append(
              Option.getOrElse(HashMap.get(grouped, depth), () => []),
              entry.action,
            ),
          ),
      }),
  );

  return Arr.map(
    Arr.sort(
      Arr.map(HashMap.toEntries(actionsByDepth), ([depth]) => depth),
      batchDepthOrder(direction),
    ),
    (depth) => Option.getOrElse(HashMap.get(actionsByDepth, depth), () => []),
  );
};

/**
 * The stack lifecycle and AWS apply path share this planner so a rendered plan
 * and the provider commands it drives follow the same dependency ordering.
 */
export class ResourcePlanner extends Context.Service<
  ResourcePlanner,
  ResourcePlannerService
>()("nomoss/core/planner/ResourcePlanner", {
  make: Effect.gen(function* () {
    const resourceModel = yield* ResourceModel;

    /**
     * Persisted nodes establish whether the desired graph needs a create or an
     * update. Unchanged nodes are omitted so the resulting batches describe
     * only provider work that can alter the stack.
     */
    const selectCreateOrUpdateActions = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
    ): ReadonlyArray<SelectedAction> => {
      const currentByKey = HashMap.fromIterable(
        Arr.map(current, (node) => [keyString(node.key), node] as const),
      );

      return Arr.flatMap(
        Arr.fromIterable(Graph.topo(desired)),
        ([index, node]): ReadonlyArray<SelectedAction> =>
          Option.match(HashMap.get(currentByKey, keyString(node.key)), {
            onNone: () =>
              [
                {
                  action: PlanAction.Create({ node }),
                  index,
                  key: keyString(node.key),
                },
              ] satisfies ReadonlyArray<SelectedAction>,
            onSome: (currentNode) =>
              Option.match(
                Option.liftPredicate(
                  currentNode,
                  (candidate) =>
                    resourceModel.propsEqual(candidate, node) === false,
                ),
                {
                  onNone: () => [],
                  onSome: (candidate) =>
                    [
                      {
                        action: PlanAction.Update({
                          current: candidate,
                          node,
                        }),
                        index,
                        key: keyString(node.key),
                      },
                    ] satisfies ReadonlyArray<SelectedAction>,
                },
              ),
          }),
      );
    };

    const createOrUpdateBatches = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
    ) => {
      const selectedActions = selectCreateOrUpdateActions(desired, current);

      return batchesFor(desired, selectedActions, "forward");
    };

    const deleteBatches = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
    ) => {
      const desiredKeys = HashSet.fromIterable(
        Arr.map(Arr.fromIterable(Graph.topo(desired)), ([, node]) =>
          keyString(node.key),
        ),
      );

      return Arr.map(
        Arr.filter(
          current,
          (node) => HashSet.has(desiredKeys, keyString(node.key)) === false,
        ),
        (node) => [PlanAction.Delete({ node })],
      );
    };

    const destroyKeysFor = (
      desired: ResourceDependencyGraph,
      destroyRoots: ReadonlyArray<ResourceKey>,
    ) => {
      const indexByKey = HashMap.fromIterable(
        Arr.map(
          Arr.fromIterable(Graph.nodes(desired)),
          ([index, node]) => [keyString(node.key), index] as const,
        ),
      );

      return Arr.reduce(
        destroyRoots,
        HashSet.empty<string>(),
        (selected, root) =>
          Option.match(HashMap.get(indexByKey, keyString(root)), {
            onNone: () => selected,
            onSome: (index) =>
              collectDestroyDependents(desired, [index], selected),
          }),
      );
    };

    const destroyBatches = (
      desired: ResourceDependencyGraph,
      destroyRoots: ReadonlyArray<ResourceKey>,
    ) => {
      const destroyKeys = destroyKeysFor(desired, destroyRoots);

      return batchesFor(
        desired,
        selectDestroyActions(desired, destroyKeys),
        "reverse",
      );
    };

    return {
      createOrUpdateBatches,
      deleteBatches,
      destroyBatches,
      planFromGraph: (desired, current, destroyRoots = []) => ({
        createOrUpdate: createOrUpdateBatches(desired, current),
        delete: deleteBatches(desired, current),
        destroy: destroyBatches(desired, destroyRoots),
      }),
    };
  }),
}) {}
