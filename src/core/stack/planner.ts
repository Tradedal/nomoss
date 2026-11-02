import {
  Array as Arr,
  Context,
  Effect,
  Graph,
  HashMap,
  HashSet,
  Layer,
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
  resourceModelLayer,
} from "../resource/model.js";

export type ResourceDependencyGraph = Graph.DirectedGraph<
  ResourceNode,
  DependencyEdge
>;

/**
 * ResourcePlannerService defines action selection from declared and saved
 * resources. Dependency batches are part of the returned plan so presentation
 * and execution agree on which actions can proceed in order.
 */
export type ResourcePlannerService = {
  /**
   * createOrUpdateBatches selects missing resources and changed properties. The
   * batches place source resources before resources that use their outputs.
   */
  readonly createOrUpdateBatches: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  /**
   * deleteBatches selects saved resources absent from the declaration graph
   * so apply can ask their providers to delete them.
   */
  readonly deleteBatches: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  /**
   * destroyBatches selects requested resources and their dependents.
   * The batches remove dependents before their source resources.
   */
  readonly destroyBatches: (
    desired: ResourceDependencyGraph,
    destroyRoots: ReadonlyArray<ResourceKey>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  /**
   * planFromGraph returns the resource actions selected from the graph and
   * saved state. Rendering and execution receive the same plan.
   */
  readonly planFromGraph: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
    destroyRoots?: ReadonlyArray<ResourceKey>,
  ) => ResourcePlan;
};

/**
 * SelectedAction retains the graph location used to assign a planned action
 * to a dependency batch. The public plan exposes the action without requiring
 * rendering or execution to repeat that graph lookup.
 */
type SelectedAction = {
  readonly action: PlanAction;
  readonly index: Graph.NodeIndex;
  readonly key: string;
};

/**
 * batchDepthOrder determines whether dependency batches execute from sources
 * to dependents for apply or from dependents to sources for teardown.
 */
const batchDepthOrder = (direction: "forward" | "reverse") =>
  Match.value(direction).pipe(
    Match.when("forward", () => Order.Number),
    Match.orElse(() => Order.flip(Order.Number)),
  );

/**
 * collectDestroyDependents includes resources that would still depend on a
 * requested removal. Selecting them together allows teardown to remove those
 * dependents before their source resources.
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
          Graph.getNode(desired, index),
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

/**
 * selectDestroyActions returns teardown actions for the selected resource
 * keys in graph order. Their graph indexes remain attached so removal batches
 * can account for dependencies before reversing execution order.
 */
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
 * depthByKey returns dependency depths for actions supplied in topological
 * order. Dependencies without a selected action contribute no pending work,
 * so an action with no selected prerequisites starts at depth zero.
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
                  Graph.getNode(desired, dependencyIndex),
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
 * batchesFor groups selected actions by dependency depth. Forward ordering
 * places prerequisites before dependents; reverse ordering allows teardown
 * to remove resources before the resources they still depend on.
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
 * ResourcePlanner selects lifecycle actions and dependency batches for the
 * shared plan consumed by presentation and provider execution.
 */
export class ResourcePlanner extends Context.Service<
  ResourcePlanner,
  ResourcePlannerService
>()("nomoss/core/stack/planner/ResourcePlanner", {
  make: Effect.gen(function* () {
    const resourceModel = yield* ResourceModel;

    /**
     * currentResourcesByKey returns last-applied nodes indexed by stable
     * resource key. The keys match saved nodes with desired declarations
     * independently of property changes, preserving the previous provider
     * state used to select creation or update.
     */
    const currentResourcesByKey = (current: ReadonlyArray<ResourceNode>) =>
      HashMap.fromIterable(
        Arr.map(current, (node) => [keyString(node.key), node] as const),
      );
    /**
     * selectCreateOrUpdateActions selects creation for declarations absent from
     * saved state and update for managed resources with different properties.
     * Unchanged resources are excluded. Updates retain their previous node,
     * and selected actions preserve graph order for dependency batching.
     */
    const selectCreateOrUpdateActions = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
    ): ReadonlyArray<SelectedAction> =>
      currentResourcesByKey(current).pipe((currentByKey) =>
        Arr.flatMap(
          Arr.fromIterable(Graph.topo(desired)),
          ([index, node]): ReadonlyArray<SelectedAction> =>
            Option.match(HashMap.get(currentByKey, keyString(node.key)), {
              onNone: () => [
                {
                  action: PlanAction.Create({ node }),
                  index,
                  key: keyString(node.key),
                },
              ],
              onSome: (currentNode) =>
                Option.match(
                  Option.liftPredicate(
                    currentNode,
                    (candidate) =>
                      resourceModel.propsEqual(candidate, node) === false,
                  ),
                  {
                    onNone: () => [],
                    onSome: (candidate) => [
                      {
                        action: PlanAction.Update({
                          current: candidate,
                          node,
                        }),
                        index,
                        key: keyString(node.key),
                      },
                    ],
                  },
                ),
            }),
        ),
      );

    /**
     * createOrUpdateBatches returns creation and update actions ordered so a
     * resource's changed prerequisites complete before its own operation.
     * Resources requiring no mutation contribute no action to the batches.
     */
    const createOrUpdateBatches = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
    ) => {
      const batches: ResourcePlan["createOrUpdate"] = batchesFor(
        desired,
        selectCreateOrUpdateActions(desired, current),
        "forward",
      );

      return batches;
    };

    /**
     * desiredResourceKeys identifies the resources retained by the declaration.
     * Saved keys absent from this set are candidates for deletion during apply.
     */
    const desiredResourceKeys = (graph: ResourceDependencyGraph) =>
      HashSet.fromIterable(
        Arr.map(Arr.fromIterable(Graph.topo(graph)), ([, node]) =>
          keyString(node.key),
        ),
      );

    /**
     * deleteBatches selects saved resources no longer declared by the stack.
     * Each deletion occupies its own batch in saved-resource order because
     * these nodes are absent from the desired graph used for other ordering.
     */
    const deleteBatches = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
    ) => {
      const batches: ResourcePlan["delete"] = desiredResourceKeys(desired).pipe(
        (desiredKeys) =>
          Arr.map(
            Arr.filter(
              current,
              (node) => HashSet.has(desiredKeys, keyString(node.key)) === false,
            ),
            (node) => [PlanAction.Delete({ node })],
          ),
      );

      return batches;
    };

    /**
     * resourceIndexes associates stable resource keys with locations in this
     * graph. Requested teardown roots can then identify graph nodes without
     * treating an index from another snapshot as the same resource.
     */
    const resourceIndexes = (graph: ResourceDependencyGraph) =>
      HashMap.fromIterable(
        Arr.map(
          Arr.fromIterable(Graph.nodes(graph)),
          ([index, node]) => [keyString(node.key), index] as const,
        ),
      );
    /**
     * destroyKeysFor returns requested teardown roots and their reachable
     * dependents. Roots absent from the graph select nothing; shared dependents
     * appear only once even when several roots reach them.
     */
    const destroyKeysFor = (
      desired: ResourceDependencyGraph,
      destroyRoots: ReadonlyArray<ResourceKey>,
    ) =>
      resourceIndexes(desired).pipe((indexByKey) =>
        Arr.reduce(destroyRoots, HashSet.empty<string>(), (selected, root) =>
          Option.match(HashMap.get(indexByKey, keyString(root)), {
            onNone: () => selected,
            onSome: (index) =>
              collectDestroyDependents(desired, [index], selected),
          }),
        ),
      );

    /**
     * destroyBatches returns teardown actions for the selected roots and their
     * dependents in reverse dependency order. Resources still using a source
     * are removed before that source can be destroyed.
     */
    const destroyBatches = (
      desired: ResourceDependencyGraph,
      destroyRoots: ReadonlyArray<ResourceKey>,
    ) => {
      const batches: ResourcePlan["destroy"] = destroyKeysFor(
        desired,
        destroyRoots,
      ).pipe((destroyKeys) =>
        batchesFor(
          desired,
          selectDestroyActions(desired, destroyKeys),
          "reverse",
        ),
      );

      return batches;
    };

    /**
     * planFromGraph combines desired changes, deletions, and explicitly
     * requested teardown into one plan. The plan retains separate action
     * groups so apply and destroy can execute their assigned operations.
     */
    const planFromGraph = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
      destroyRoots: ReadonlyArray<ResourceKey> = [],
    ) => {
      const plan: ResourcePlan = {
        createOrUpdate: createOrUpdateBatches(desired, current),
        delete: deleteBatches(desired, current),
        destroy: destroyBatches(desired, destroyRoots),
      };

      return plan;
    };

    return {
      createOrUpdateBatches,
      deleteBatches,
      destroyBatches,
      planFromGraph,
    };
  }),
}) {}

export const resourcePlannerLayer = Layer.effect(
  ResourcePlanner,
  ResourcePlanner.make,
).pipe(Layer.provideMerge(resourceModelLayer));
