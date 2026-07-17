import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Graph,
  Option,
  Ref,
  Schema,
} from "effect";

import {
  type DependencyEdge,
  keyString,
  type ResourceKey,
  ResourceModel,
  type ResourceNode,
} from "./model.js";

type ResourceGraphState = {
  readonly graph: Graph.DirectedGraph<ResourceNode, DependencyEdge>;
  readonly indexByKey: ReadonlyMap<string, Graph.NodeIndex>;
};

/**
 * Lifecycle code needs both the upstream resource key and the property mapping
 * recorded on the graph edge. This shape keeps output resolution tied to the
 * declaration graph instead of rediscovering dependencies from JSON props.
 */
export type ResourceDependency = {
  readonly source: ResourceKey;
  readonly target: ResourceKey;
  readonly edge: DependencyEdge;
};

/**
 * Graph readers fail with the logical resource key that was requested so
 * planner, lifecycle, and diagnostics can report missing declarations without
 * manufacturing an empty node.
 */
export class ResourceNotFound extends Data.TaggedError("ResourceNotFound")<{
  readonly key: ResourceKey;
}> {}

/**
 * Resource declarations must produce one node for each stable resource key.
 * Duplicate detection protects graph topology before planning or lifecycle
 * execution sees ambiguous nodes.
 */
export class DuplicateResource extends Data.TaggedError("DuplicateResource")<{
  readonly key: ResourceKey;
}> {}

/**
 * Stack declarations write nodes and property-derived edges here while planner
 * and workflow code read the resulting topology through typed operations.
 */
export class ResourceGraphStore extends Context.Service<ResourceGraphStore>()(
  "nomoss/core/resourceGraphStore",
  {
    make: Effect.gen(function* () {
      const resourceModel = yield* ResourceModel;
      const initialState: ResourceGraphState = {
        graph: Graph.directed<ResourceNode, DependencyEdge>(),
        indexByKey: new Map(),
      };
      const state = yield* Ref.make<ResourceGraphState>(initialState);
      /**
       * Effect's graph API addresses nodes by index, while Nomoss callers use
       * resource keys. The side index is the service invariant that lets every
       * operation resolve a declared resource through the same key path.
       */
      const indexFor = (key: ResourceKey, graphState: ResourceGraphState) =>
        Option.fromUndefinedOr(graphState.indexByKey.get(keyString(key))).pipe(
          Option.match({
            onNone: () => Effect.fail(new ResourceNotFound({ key })),
            onSome: Effect.succeed,
          }),
        );
      const nodeAt = (
        graphState: ResourceGraphState,
        key: ResourceKey,
        index: Graph.NodeIndex,
      ) =>
        Option.fromUndefinedOr(graphState.graph.nodes.get(index)).pipe(
          Option.match({
            onNone: () => Effect.fail(new ResourceNotFound({ key })),
            onSome: Effect.succeed,
          }),
        );
      const nodesFor = Effect.fn("ResourceGraphStore.nodesFor")(function* (
        key: ResourceKey,
        direction: Graph.Direction,
      ) {
        const graphState = yield* Ref.get(state);
        const nodeIndex = yield* indexFor(key, graphState);
        const graphNodes = Arr.getSomes(
          Arr.map(
            Graph.neighborsDirected(graphState.graph, nodeIndex, direction),
            (index) =>
              Option.fromUndefinedOr(graphState.graph.nodes.get(index)),
          ),
        );

        return graphNodes;
      });

      return {
        /**
         * Stack preparation replays a declaration graph into this store. Each
         * preparation starts from an empty graph so status and inspection calls
         * can safely follow apply in the same application runtime.
         */
        reset: Ref.set(state, initialState),

        /**
         * Resource declaration services call this as each resource is declared.
         * The duplicate check keeps the planning graph deterministic before
         * dependency edges, topological planning, or lifecycle state are read.
         */
        addResource: Effect.fn("ResourceGraphStore.addResource")(function* (
          node: ResourceNode,
        ) {
          const graphState = yield* Ref.get(state);
          const stableKey = keyString(node.key);
          yield* Effect.filterOrFail(
            Effect.succeed(stableKey),
            () => !graphState.indexByKey.has(stableKey),
            () => new DuplicateResource({ key: node.key }),
          );

          let nodeIndex: Graph.NodeIndex = -1;
          const nextGraph = Graph.mutate(graphState.graph, (mutable) => {
            nodeIndex = Graph.addNode(mutable, node);
          });
          const indexEntries: ReadonlyArray<
            readonly [string, Graph.NodeIndex]
          > = Arr.append(Arr.fromIterable(graphState.indexByKey), [
            stableKey,
            nodeIndex,
          ]);
          const nextState: ResourceGraphState = {
            graph: nextGraph,
            indexByKey: new Map(indexEntries),
          };

          yield* Ref.set(state, nextState);
        }),

        /**
         * Declaration-time `ResourceOutputRef` handling records the property
         * relationship here. Planner code uses the edge for ordering, and stack
         * lifecycle uses the same edge for output-value resolution immediately
         * before provider execution.
         */
        addDependency: Effect.fn("ResourceGraphStore.addDependency")(function* (
          source: ResourceKey,
          target: ResourceKey,
          edge: DependencyEdge,
        ) {
          const graphState = yield* Ref.get(state);
          const sourceIndex = yield* indexFor(source, graphState);
          const targetIndex = yield* indexFor(target, graphState);
          const nextGraph = Graph.mutate(graphState.graph, (mutable) => {
            Graph.addEdge(mutable, sourceIndex, targetIndex, edge);
          });
          const nextState: ResourceGraphState = {
            graph: nextGraph,
            indexByKey: graphState.indexByKey,
          };

          yield* Ref.set(state, nextState);
        }),

        /**
         * Planners and diagnostics use incoming resource nodes when they need
         * topology without property-path metadata.
         */
        dependenciesOf: (key: ResourceKey) => nodesFor(key, "incoming"),

        /**
         * Destroy planning and graph inspection use outgoing resource nodes to
         * find declarations that depend on a resource.
         */
        dependentsOf: (key: ResourceKey) => nodesFor(key, "outgoing"),

        /**
         * Stack lifecycle asks for dependency edges before create/update
         * provider commands so `ResourceOutputResolver` can replace declared
         * `ResourceOutputRef` props with outputs from the applied upstream
         * resource state. The graph remains the source for which property paths
         * require resolution; the resolver does not rediscover refs by walking
         * arbitrary JSON props.
         */
        dependencyEdgesOf: Effect.fn("ResourceGraphStore.dependencyEdgesOf")(
          function* (key: ResourceKey) {
            const graphState = yield* Ref.get(state);
            const targetIndex = yield* indexFor(key, graphState);
            const dependencyEdgeIndexes =
              graphState.graph.reverseAdjacency.get(targetIndex) ?? [];
            const dependencies: ReadonlyArray<ResourceDependency> =
              Arr.getSomes(
                Arr.map(dependencyEdgeIndexes, (edgeIndex) =>
                  Option.flatMap(
                    Option.fromUndefinedOr(
                      graphState.graph.edges.get(edgeIndex),
                    ),
                    (dependencyEdge) =>
                      Option.map(
                        Option.fromUndefinedOr(
                          graphState.graph.nodes.get(dependencyEdge.source),
                        ),
                        (sourceNode) => ({
                          source: sourceNode.key,
                          target: key,
                          edge: dependencyEdge.data,
                        }),
                      ),
                  ),
                ),
              );

            return dependencies;
          },
        ),
        /**
         * CLI and debugging surfaces render the declared graph with resource
         * labels and property mappings so humans can inspect the plan topology
         * without reading persisted stack state.
         */
        get mermaid() {
          return Ref.get(state).pipe(
            Effect.map((graphState) =>
              Graph.toMermaid(graphState.graph, {
                edgeLabel: (edge) =>
                  `${edge.property} <- ${edge.sourceProperty}`,
                nodeLabel: resourceModel.resourceLabel,
              }),
            ),
          );
        },

        /**
         * Prepare and plan paths read the graph as a stable value after
         * application declarations have run.
         */
        get snapshot() {
          return Ref.get(state).pipe(
            Effect.map((graphState) => graphState.graph),
          );
        },

        /**
         * CLI status surfaces use topological ids when they need declaration
         * order without materializing provider payloads.
         */
        get topologicalLogicalIds() {
          return Ref.get(state).pipe(
            Effect.map((graphState) =>
              Arr.map(
                Arr.fromIterable(Graph.values(Graph.topo(graphState.graph))),
                (node) => node.key.logicalId,
              ),
            ),
          );
        },

        /**
         * Graph-backed diagnostics can inspect a resource output by key while
         * still validating that outputs are JSON object data.
         */
        outputValue: Effect.fn("ResourceGraphStore.outputValue")(function* (
          key: ResourceKey,
          property: string,
        ) {
          const graphState = yield* Ref.get(state);
          const nodeIndex = yield* indexFor(key, graphState);
          const node = yield* nodeAt(graphState, key, nodeIndex);
          const output = yield* Schema.decodeUnknownEffect(
            Schema.Record(Schema.String, Schema.Json),
          )(node.outputs);

          return output[property];
        }),
      };
    }),
  },
) {}
