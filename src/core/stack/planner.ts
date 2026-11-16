import {
  Array as Arr,
  Context,
  Effect,
  Equal,
  Graph,
  HashMap,
  HashSet,
  JsonPatch,
  JsonPointer,
  Layer,
  Match,
  Number as Num,
  Option,
  Order,
  Predicate,
  String as Str,
} from "effect";

import {
  type DependencyEdge,
  PlanAction,
  type ResourceKey,
  ResourceModel,
  type ResourceNode,
  type ResourcePlan,
  resourceGeneration,
  resourceInstanceKey,
  resourceModelLayer,
} from "../resource/model.js";
import type { ResourceState } from "../state/resourceState.js";

export type ResourceDependencyGraph = Graph.DirectedGraph<
  ResourceNode,
  DependencyEdge
>;

/**
 * The ResourcePlannerService type requires returned batches to preserve the
 * dependency order used for review and execution. Callers supply applied
 * resources for comparison and saved lifecycle records when recovery must
 * omit completed provider operations.
 */
export type ResourcePlannerService = {
  /**
   * The createOrUpdateBatches service method accepts saved lifecycle records
   * when a run must resume completed provider work. Its batches place sources
   * before dependents and expose the remaining operations for replacements.
   */
  readonly createOrUpdateBatches: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
    states?: ReadonlyArray<ResourceState>,
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
   * The planFromGraph service method accepts the applied resources and their
   * lifecycle records from one snapshot so recovery decisions use consistent
   * evidence. Apply and teardown remain separate action groups for review.
   */
  readonly planFromGraph: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
    destroyRoots?: ReadonlyArray<ResourceKey>,
    states?: ReadonlyArray<ResourceState>,
  ) => ResourcePlan;
};

/**
 * SelectedAction retains the graph location used to assign a planned action
 * to a dependency batch. The public plan exposes the action so the renderer
 * and executor do not need to repeat that graph lookup.
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
 * requested removal. This selection allows teardown to remove those
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
          (node) => HashSet.has(selected, node.key.logicalId) === false,
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
              HashSet.add(selected, node.key.logicalId),
            ),
        },
      ),
  });

/**
 * selectDestroyActions returns teardown actions for the selected resource
 * keys in graph order. Their graph indexes remain attached so removal batches
 * can account for dependencies before they reverse execution order.
 */
const selectDestroyActions = (
  desired: ResourceDependencyGraph,
  destroyKeys: HashSet.HashSet<string>,
): ReadonlyArray<SelectedAction> =>
  Arr.flatMap(
    Arr.fromIterable(Graph.topo(desired)),
    ([index, node]): ReadonlyArray<SelectedAction> =>
      Match.value(HashSet.has(destroyKeys, node.key.logicalId)).pipe(
        Match.when(true, () => [
          {
            action: PlanAction.Destroy({ node }),
            index,
            key: node.key.logicalId,
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
            Num.max(
              highest,
              Option.getOrElse(
                Option.flatMap(
                  Graph.getNode(desired, dependencyIndex),
                  (dependencyNode) =>
                    HashMap.get(depths, dependencyNode.key.logicalId),
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
 * The ResourcePlanner service assumes applied resources and saved lifecycle
 * records describe one stack snapshot. Its plans retain the selected
 * replacement order and resource dependencies needed for reviewed execution.
 */
export class ResourcePlanner extends Context.Service<
  ResourcePlanner,
  ResourcePlannerService
>()("nomoss/core/stack/planner/ResourcePlanner", {
  make: Effect.gen(function* () {
    const resourceModel = yield* ResourceModel;

    /**
     * The currentResourcesByKey helper requires one last-applied instance per
     * logical resource. Matching by declaration identity lets a changed request
     * retain ownership of its existing provider object during planning.
     */
    const currentResourcesByKey = (current: ReadonlyArray<ResourceNode>) =>
      HashMap.fromIterable(
        Arr.map(current, (node) => [node.key.logicalId, node] as const),
      );

    /**
     * The requiresReplacement helper assumes the planner has selected the
     * resource for a change or dependency refresh. A rule without property
     * paths requests replacement for either selection. Selected paths include
     * changes to a containing object or a nested value. A false result keeps
     * the candidate on the ordinary update path.
     */
    const requiresReplacement = (node: ResourceNode, current: ResourceNode) =>
      Option.exists(Option.fromUndefinedOr(node.schema.replacement), (rule) =>
        Option.match(Option.fromUndefinedOr(rule.properties), {
          onNone: () => true,
          onSome: (properties) =>
            Arr.some(JsonPatch.get(current.props, node.props), (change) =>
              Arr.some(properties, (path) => {
                const pointer = Arr.match(path, {
                  onEmpty: () => "",
                  onNonEmpty: (segments) =>
                    `/${Arr.join(Arr.map(segments, JsonPointer.escapeToken), "/")}`,
                });

                return Predicate.some([
                  Equal.equals(pointer),
                  (value: string) => Str.startsWith(`${pointer}/`)(value),
                  (value: string) => Str.startsWith(`${value}/`)(pointer),
                ])(change.path);
              }),
            ),
        }),
      );

    /**
     * The replacementAction helper reuses an unfinished instance's generation
     * and saved operation order when constructing a recovery plan. Only
     * operations without completed results remain in the returned plan, so a
     * retry can proceed without repeating provider work.
     */
    const replacementAction = (
      node: ResourceNode,
      current: ResourceNode,
      states: ReadonlyArray<ResourceState>,
      pending: Option.Option<ResourceState>,
    ) => {
      const generation = Option.match(pending, {
        onNone: () => resourceGeneration(current) + 1,
        onSome: (state) => resourceGeneration(state.node),
      });
      const target: ResourceNode = { ...node, generation };
      const rule = Option.match(pending, {
        onNone: () => node.schema.replacement,
        onSome: (state) => state.node.schema.replacement,
      });
      const create = PlanAction.Create({ node: target });
      const remove = PlanAction.Destroy({ node: current });
      const ordered = Match.value(rule?.order).pipe(
        Match.when("createBeforeDestroy", () => [create, remove]),
        Match.orElse(() => [remove, create]),
      );
      const operations = Arr.filter(
        ordered,
        Predicate.not((operation: typeof create | typeof remove) =>
          Arr.some(
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
                  Match.tag("Destroy", () => state._tag === "Deleted"),
                  Match.exhaustive,
                ),
            ),
          ),
        ),
      );

      return PlanAction.Replace({ node: target, current, operations });
    };
    /**
     * The selectCreateOrUpdateActions helper keeps a dependent resource in the
     * plan when an earlier action may change its request values. Execution must
     * resolve those values after the source finishes and can retain the applied
     * instance when its request is unchanged. Explicit prerequisites affect
     * ordering without requesting that dependent refresh.
     */
    const selectCreateOrUpdateActions = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
      states: ReadonlyArray<ResourceState>,
    ): ReadonlyArray<SelectedAction> => {
      const currentByKey = currentResourcesByKey(current);
      const ordered = Arr.fromIterable(Graph.topo(desired));
      const selected = Arr.reduce(
        ordered,
        HashMap.empty<Graph.NodeIndex, SelectedAction>(),
        (selected, [index, node]) => {
          const sourceChanged = Arr.some(
            Graph.incomingEdges(desired, index),
            (edge) =>
              Graph.getEdge(desired, edge).pipe(
                Option.exists((edge) =>
                  Predicate.and(
                    Predicate.Struct({
                      kind: Predicate.or(
                        Equal.equals("property"),
                        Equal.equals("relationship"),
                      ),
                    }),
                    () => HashMap.has(selected, edge.source),
                  )(edge.data),
                ),
              ),
          );
          return Option.match(HashMap.get(currentByKey, node.key.logicalId), {
            onNone: () =>
              HashMap.set(selected, index, {
                action: PlanAction.Create({ node }),
                index,
                key: node.key.logicalId,
              }),
            onSome: (currentNode) =>
              Option.match(
                Option.liftPredicate(
                  currentNode,
                  Predicate.or(
                    Predicate.not((candidate: ResourceNode) =>
                      resourceModel.propsEqual(candidate, node),
                    ),
                    () => sourceChanged,
                  ),
                ),
                {
                  onNone: () => selected,
                  onSome: (candidate) => {
                    const instance = Option.match(
                      Option.fromUndefinedOr(candidate.generation),
                      {
                        onNone: () => ({}),
                        onSome: (generation) => ({ generation }),
                      },
                    );
                    const desired: ResourceNode = { ...node, ...instance };
                    const pending = Arr.findFirst(
                      states,
                      Predicate.and(
                        (state: ResourceState) =>
                          state.node.key.logicalId === node.key.logicalId,
                        (state) =>
                          resourceGeneration(state.node) >
                          resourceGeneration(candidate),
                      ),
                    );
                    const action = Match.value(
                      Predicate.or(
                        () => Option.isSome(pending),
                        (desired: ResourceNode) =>
                          requiresReplacement(desired, candidate),
                      )(node),
                    ).pipe(
                      Match.when(true, () =>
                        replacementAction(node, candidate, states, pending),
                      ),
                      Match.orElse(() =>
                        PlanAction.Update({
                          current: candidate,
                          node: desired,
                        }),
                      ),
                    );

                    return HashMap.set(selected, index, {
                      action,
                      index,
                      key: node.key.logicalId,
                    });
                  },
                },
              ),
          });
        },
      );
      const actions: ReadonlyArray<SelectedAction> = Arr.flatMap(
        ordered,
        ([index]) => HashMap.get(selected, index).pipe(Option.toArray),
      );
      return actions;
    };

    /**
     * The createOrUpdateBatches service method keeps resources that consume
     * changed source outputs scheduled after those sources. Execution can
     * resolve their requests at that point and preserve an existing instance
     * when the resolved values are unchanged. Saved lifecycle records remove
     * completed operations from replacement plans.
     */
    const createOrUpdateBatches = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
      states: ReadonlyArray<ResourceState> = [],
    ) => {
      const batches: ResourcePlan["createOrUpdate"] = batchesFor(
        desired,
        selectCreateOrUpdateActions(desired, current, states),
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
        Arr.map(
          Arr.fromIterable(Graph.topo(graph)),
          ([, node]) => node.key.logicalId,
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
              (node) => HashSet.has(desiredKeys, node.key.logicalId) === false,
            ),
            (node) => [PlanAction.Delete({ node })],
          ),
      );

      return batches;
    };

    /**
     * resourceIndexes associates stable resource keys with locations in this
     * graph. Requested teardown roots can then identify graph nodes. An index
     * from another snapshot does not identify the same resource.
     */
    const resourceIndexes = (graph: ResourceDependencyGraph) =>
      HashMap.fromIterable(
        Arr.map(
          Arr.fromIterable(Graph.nodes(graph)),
          ([index, node]) => [node.key.logicalId, index] as const,
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
          Option.match(HashMap.get(indexByKey, root.logicalId), {
            onNone: () => selected,
            onSome: (index) =>
              collectDestroyDependents(desired, [index], selected),
          }),
        ),
      );

    /**
     * destroyBatches returns teardown actions for the selected roots and their
     * dependents in reverse dependency order. Resources that still use a source
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
     * The planFromGraph service method requires current resources and saved
     * lifecycle records to describe the same stack snapshot. Its separate
     * apply and teardown groups let callers review only the work their command
     * will execute, including the remaining operations of a replacement.
     */
    const planFromGraph = (
      desired: ResourceDependencyGraph,
      current: ReadonlyArray<ResourceNode>,
      destroyRoots: ReadonlyArray<ResourceKey> = [],
      states: ReadonlyArray<ResourceState> = [],
    ) => {
      const plan: ResourcePlan = {
        createOrUpdate: createOrUpdateBatches(desired, current, states),
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
