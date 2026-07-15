import {
  Array as Arr,
  Context,
  Effect,
  Graph,
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

export type ResourcePlannerService = {
  readonly createOrUpdateBatches: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  readonly deleteBatches: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  readonly destroyBatches: (
    desired: ResourceDependencyGraph,
    destroyRoots: ReadonlyArray<ResourceKey>,
  ) => ReadonlyArray<ReadonlyArray<PlanAction>>;
  readonly planFromGraph: (
    desired: ResourceDependencyGraph,
    current: ReadonlyArray<ResourceNode>,
    destroyRoots?: ReadonlyArray<ResourceKey>,
  ) => ResourcePlan;
};

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
 * Apply and CLI workflows use planner batches to preserve dependency order
 * while independent resources remain parallelizable inside each batch.
 */
export class ResourcePlanner extends Context.Service<
  ResourcePlanner,
  ResourcePlannerService
>()("nomoss/core/planner/ResourcePlanner", {
  make: Effect.gen(function* () {
    const resourceModel = yield* ResourceModel;

    return {
      createOrUpdateBatches: (desired, current) => {
        const currentByKey = new Map(
          Arr.map(current, (node) => [keyString(node.key), node]),
        );
        const selectedActions: ReadonlyArray<SelectedAction> = Arr.flatMap(
          Arr.fromIterable(Graph.topo(desired)),
          ([index, node]): ReadonlyArray<SelectedAction> =>
            Option.fromUndefinedOr(currentByKey.get(keyString(node.key))).pipe(
              Option.match({
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
            ),
        );
        const depthByKey = Arr.reduce(
          selectedActions,
          new Map<string, number>(),
          (depths, entry) => {
            const dependencyDepth =
              Arr.reduce(
                Graph.neighborsDirected(desired, entry.index, "incoming"),
                -1,
                (highest, dependencyIndex) =>
                  Math.max(
                    highest,
                    Option.fromUndefinedOr(
                      desired.nodes.get(dependencyIndex),
                    ).pipe(
                      Option.flatMap((dependencyNode) =>
                        Option.fromUndefinedOr(
                          depths.get(keyString(dependencyNode.key)),
                        ),
                      ),
                      Option.getOrElse(() => -1),
                    ),
                  ),
              ) + 1;
            const depthEntries: ReadonlyArray<readonly [string, number]> =
              Arr.append(Arr.fromIterable(depths), [
                entry.key,
                dependencyDepth,
              ]);
            const nextDepthByKey = new Map(depthEntries);

            return nextDepthByKey;
          },
        );
        const actionByDepth = Arr.reduce(
          selectedActions,
          new Map<number, ReadonlyArray<PlanAction>>(),
          (grouped, entry) =>
            Option.fromUndefinedOr(depthByKey.get(entry.key)).pipe(
              Option.map((depth) => {
                const actions = Arr.appendAll(
                  Option.getOrElse(
                    Option.fromUndefinedOr(grouped.get(depth)),
                    (): ReadonlyArray<PlanAction> => [],
                  ),
                  [entry.action],
                );
                const actionEntries: ReadonlyArray<
                  readonly [number, ReadonlyArray<PlanAction>]
                > = Arr.append(Arr.fromIterable(grouped), [depth, actions]);
                const nextActionByDepth = new Map(actionEntries);

                return nextActionByDepth;
              }),
              Option.getOrElse(() => grouped),
            ),
        );
        const batches: ReadonlyArray<ReadonlyArray<PlanAction>> = Arr.map(
          Arr.sort(
            Arr.map(Arr.fromIterable(actionByDepth), ([depth]) => depth),
            batchDepthOrder("forward"),
          ),
          (depth) =>
            Option.fromUndefinedOr(actionByDepth.get(depth)).pipe(
              Option.getOrElse(() => []),
            ),
        );

        return batches;
      },

      deleteBatches: (desired, current) => {
        const desiredByKey = new Set(
          Arr.map(Arr.fromIterable(Graph.topo(desired)), ([, node]) =>
            keyString(node.key),
          ),
        );
        const batches: ReadonlyArray<ReadonlyArray<PlanAction>> = Arr.map(
          Arr.filter(
            current,
            (node) => desiredByKey.has(keyString(node.key)) === false,
          ),
          (node) => [PlanAction.Delete({ node })],
        );

        return batches;
      },

      destroyBatches: (desired, destroyRoots) => {
        const indexByKey = new Map(
          Arr.map(Arr.fromIterable(Graph.nodes(desired)), ([index, node]) => [
            keyString(node.key),
            index,
          ]),
        );
        const selectedKeys = Arr.reduce(
          destroyRoots,
          new Set<string>(),
          (accumulated, root) => {
            const pending: ReadonlyArray<Graph.NodeIndex> =
              Option.fromUndefinedOr(indexByKey.get(keyString(root))).pipe(
                Option.match({
                  onNone: () => [],
                  onSome: (index) => [index],
                }),
              );
            const selected = new Set(accumulated);

            const collectDependents = (
              remaining: ReadonlyArray<Graph.NodeIndex>,
              collected: Set<string>,
            ): Set<string> =>
              Arr.head(remaining).pipe(
                Option.match({
                  onNone: () => collected,
                  onSome: (index) =>
                    Option.match(
                      Option.filter(
                        Option.map(
                          Option.fromUndefinedOr(desired.nodes.get(index)),
                          (node) => ({
                            index,
                            key: keyString(node.key),
                          }),
                        ),
                        ({ key }) => collected.has(key) === false,
                      ),
                      {
                        onNone: () =>
                          collectDependents(Arr.drop(remaining, 1), collected),
                        onSome: (selectedKey) =>
                          collectDependents(
                            Arr.appendAll(
                              Arr.drop(remaining, 1),
                              Graph.neighborsDirected(
                                desired,
                                selectedKey.index,
                                "outgoing",
                              ),
                            ),
                            new Set(
                              Arr.append(
                                Arr.fromIterable(collected),
                                selectedKey.key,
                              ),
                            ),
                          ),
                      },
                    ),
                }),
              );

            return collectDependents(pending, selected);
          },
        );
        const selectedActions: ReadonlyArray<SelectedAction> = Arr.flatMap(
          Arr.fromIterable(Graph.topo(desired)),
          ([index, node]) =>
            Option.some(node).pipe(
              Option.filter((candidate) =>
                selectedKeys.has(keyString(candidate.key)),
              ),
              Option.match({
                onNone: () => [],
                onSome: (candidate) => [
                  {
                    action: PlanAction.Destroy({ node: candidate }),
                    index,
                    key: keyString(candidate.key),
                  },
                ],
              }),
            ),
        );
        const depthByKey = Arr.reduce(
          selectedActions,
          new Map<string, number>(),
          (depths, entry) => {
            const dependencyDepth =
              Arr.reduce(
                Graph.neighborsDirected(desired, entry.index, "incoming"),
                -1,
                (highest, dependencyIndex) =>
                  Math.max(
                    highest,
                    Option.fromUndefinedOr(
                      desired.nodes.get(dependencyIndex),
                    ).pipe(
                      Option.flatMap((dependencyNode) =>
                        Option.fromUndefinedOr(
                          depths.get(keyString(dependencyNode.key)),
                        ),
                      ),
                      Option.getOrElse(() => -1),
                    ),
                  ),
              ) + 1;
            const depthEntries: ReadonlyArray<readonly [string, number]> =
              Arr.append(Arr.fromIterable(depths), [
                entry.key,
                dependencyDepth,
              ]);
            const nextDepthByKey = new Map(depthEntries);

            return nextDepthByKey;
          },
        );
        const actionByDepth = Arr.reduce(
          selectedActions,
          new Map<number, ReadonlyArray<PlanAction>>(),
          (grouped, entry) =>
            Option.fromUndefinedOr(depthByKey.get(entry.key)).pipe(
              Option.map((depth) => {
                const actions = Arr.appendAll(
                  Option.getOrElse(
                    Option.fromUndefinedOr(grouped.get(depth)),
                    (): ReadonlyArray<PlanAction> => [],
                  ),
                  [entry.action],
                );
                const actionEntries: ReadonlyArray<
                  readonly [number, ReadonlyArray<PlanAction>]
                > = Arr.append(Arr.fromIterable(grouped), [depth, actions]);
                const nextActionByDepth = new Map(actionEntries);

                return nextActionByDepth;
              }),
              Option.getOrElse(() => grouped),
            ),
        );
        const batches: ReadonlyArray<ReadonlyArray<PlanAction>> = Arr.map(
          Arr.sort(
            Arr.map(Arr.fromIterable(actionByDepth), ([depth]) => depth),
            batchDepthOrder("reverse"),
          ),
          (depth) =>
            Option.fromUndefinedOr(actionByDepth.get(depth)).pipe(
              Option.getOrElse(() => []),
            ),
        );

        return batches;
      },

      planFromGraph: (desired, current, destroyRoots = []) => {
        const currentByKey = new Map(
          Arr.map(current, (node) => [keyString(node.key), node]),
        );
        const selectedCreateOrUpdate: ReadonlyArray<SelectedAction> =
          Arr.flatMap(
            Arr.fromIterable(Graph.topo(desired)),
            ([index, node]): ReadonlyArray<SelectedAction> =>
              Option.fromUndefinedOr(
                currentByKey.get(keyString(node.key)),
              ).pipe(
                Option.match({
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
              ),
          );
        const createOrUpdateDepthByKey = Arr.reduce(
          selectedCreateOrUpdate,
          new Map<string, number>(),
          (depths, entry) => {
            const dependencyDepth =
              Arr.reduce(
                Graph.neighborsDirected(desired, entry.index, "incoming"),
                -1,
                (highest, dependencyIndex) =>
                  Math.max(
                    highest,
                    Option.fromUndefinedOr(
                      desired.nodes.get(dependencyIndex),
                    ).pipe(
                      Option.flatMap((dependencyNode) =>
                        Option.fromUndefinedOr(
                          depths.get(keyString(dependencyNode.key)),
                        ),
                      ),
                      Option.getOrElse(() => -1),
                    ),
                  ),
              ) + 1;
            const depthEntries: ReadonlyArray<readonly [string, number]> =
              Arr.append(Arr.fromIterable(depths), [
                entry.key,
                dependencyDepth,
              ]);
            const nextDepthByKey = new Map(depthEntries);

            return nextDepthByKey;
          },
        );
        const createOrUpdateByDepth = Arr.reduce(
          selectedCreateOrUpdate,
          new Map<number, ReadonlyArray<PlanAction>>(),
          (grouped, entry) =>
            Option.fromUndefinedOr(
              createOrUpdateDepthByKey.get(entry.key),
            ).pipe(
              Option.map((depth) => {
                const actions = Arr.appendAll(
                  Option.getOrElse(
                    Option.fromUndefinedOr(grouped.get(depth)),
                    (): ReadonlyArray<PlanAction> => [],
                  ),
                  [entry.action],
                );
                const actionEntries: ReadonlyArray<
                  readonly [number, ReadonlyArray<PlanAction>]
                > = Arr.append(Arr.fromIterable(grouped), [depth, actions]);
                const nextActionByDepth = new Map(actionEntries);

                return nextActionByDepth;
              }),
              Option.getOrElse(() => grouped),
            ),
        );
        const createOrUpdate: ReadonlyArray<ReadonlyArray<PlanAction>> =
          Arr.map(
            Arr.sort(
              Arr.map(
                Arr.fromIterable(createOrUpdateByDepth),
                ([depth]) => depth,
              ),
              batchDepthOrder("forward"),
            ),
            (depth) =>
              Option.fromUndefinedOr(createOrUpdateByDepth.get(depth)).pipe(
                Option.getOrElse(() => []),
              ),
          );
        const desiredByKey = new Set(
          Arr.map(Arr.fromIterable(Graph.topo(desired)), ([, node]) =>
            keyString(node.key),
          ),
        );
        const deleteBatches: ReadonlyArray<ReadonlyArray<PlanAction>> = Arr.map(
          Arr.filter(
            current,
            (node) => desiredByKey.has(keyString(node.key)) === false,
          ),
          (node) => [PlanAction.Delete({ node })],
        );
        const indexByKey = new Map(
          Arr.map(Arr.fromIterable(Graph.nodes(desired)), ([index, node]) => [
            keyString(node.key),
            index,
          ]),
        );
        const destroyKeys = Arr.reduce(
          destroyRoots,
          new Set<string>(),
          (accumulated, root) => {
            const pending: ReadonlyArray<Graph.NodeIndex> =
              Option.fromUndefinedOr(indexByKey.get(keyString(root))).pipe(
                Option.match({
                  onNone: () => [],
                  onSome: (index) => [index],
                }),
              );
            const selected = new Set(accumulated);

            const collectDependents = (
              remaining: ReadonlyArray<Graph.NodeIndex>,
              collected: Set<string>,
            ): Set<string> =>
              Arr.head(remaining).pipe(
                Option.match({
                  onNone: () => collected,
                  onSome: (index) =>
                    Option.match(
                      Option.filter(
                        Option.map(
                          Option.fromUndefinedOr(desired.nodes.get(index)),
                          (node) => ({
                            index,
                            key: keyString(node.key),
                          }),
                        ),
                        ({ key }) => collected.has(key) === false,
                      ),
                      {
                        onNone: () =>
                          collectDependents(Arr.drop(remaining, 1), collected),
                        onSome: (selectedKey) =>
                          collectDependents(
                            Arr.appendAll(
                              Arr.drop(remaining, 1),
                              Graph.neighborsDirected(
                                desired,
                                selectedKey.index,
                                "outgoing",
                              ),
                            ),
                            new Set(
                              Arr.append(
                                Arr.fromIterable(collected),
                                selectedKey.key,
                              ),
                            ),
                          ),
                      },
                    ),
                }),
              );

            return collectDependents(pending, selected);
          },
        );
        const selectedDestroy: ReadonlyArray<SelectedAction> = Arr.flatMap(
          Arr.fromIterable(Graph.topo(desired)),
          ([index, node]) =>
            Option.some(node).pipe(
              Option.filter((candidate) =>
                destroyKeys.has(keyString(candidate.key)),
              ),
              Option.match({
                onNone: () => [],
                onSome: (candidate) => [
                  {
                    action: PlanAction.Destroy({ node: candidate }),
                    index,
                    key: keyString(candidate.key),
                  },
                ],
              }),
            ),
        );
        const destroyDepthByKey = Arr.reduce(
          selectedDestroy,
          new Map<string, number>(),
          (depths, entry) => {
            const dependencyDepth =
              Arr.reduce(
                Graph.neighborsDirected(desired, entry.index, "incoming"),
                -1,
                (highest, dependencyIndex) =>
                  Math.max(
                    highest,
                    Option.fromUndefinedOr(
                      desired.nodes.get(dependencyIndex),
                    ).pipe(
                      Option.flatMap((dependencyNode) =>
                        Option.fromUndefinedOr(
                          depths.get(keyString(dependencyNode.key)),
                        ),
                      ),
                      Option.getOrElse(() => -1),
                    ),
                  ),
              ) + 1;
            const depthEntries: ReadonlyArray<readonly [string, number]> =
              Arr.append(Arr.fromIterable(depths), [
                entry.key,
                dependencyDepth,
              ]);
            const nextDepthByKey = new Map(depthEntries);

            return nextDepthByKey;
          },
        );
        const destroyByDepth = Arr.reduce(
          selectedDestroy,
          new Map<number, ReadonlyArray<PlanAction>>(),
          (grouped, entry) =>
            Option.fromUndefinedOr(destroyDepthByKey.get(entry.key)).pipe(
              Option.map((depth) => {
                const actions = Arr.appendAll(
                  Option.getOrElse(
                    Option.fromUndefinedOr(grouped.get(depth)),
                    (): ReadonlyArray<PlanAction> => [],
                  ),
                  [entry.action],
                );
                const actionEntries: ReadonlyArray<
                  readonly [number, ReadonlyArray<PlanAction>]
                > = Arr.append(Arr.fromIterable(grouped), [depth, actions]);
                const nextActionByDepth = new Map(actionEntries);

                return nextActionByDepth;
              }),
              Option.getOrElse(() => grouped),
            ),
        );
        const destroy: ReadonlyArray<ReadonlyArray<PlanAction>> = Arr.map(
          Arr.sort(
            Arr.map(Arr.fromIterable(destroyByDepth), ([depth]) => depth),
            batchDepthOrder("reverse"),
          ),
          (depth) =>
            Option.fromUndefinedOr(destroyByDepth.get(depth)).pipe(
              Option.getOrElse(() => []),
            ),
        );
        const plan: ResourcePlan = {
          createOrUpdate,
          delete: deleteBatches,
          destroy,
        };

        return plan;
      },
    };
  }),
}) {}
