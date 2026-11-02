import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Graph,
  Option,
  Ref,
  Schema,
  Semaphore,
} from "effect";
import {
  type DependencyEdge,
  DependencyEdgeSchema,
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
 * A dependency identifies the source resource and the resource that uses it.
 * For a property dependency, the edge also tells output resolution which
 * output to read and which input to replace.
 */
export type ResourceDependency = {
  readonly source: ResourceKey;
  readonly target: ResourceKey;
  readonly edge: DependencyEdge;
};

export class ResourceNotFound extends Data.TaggedError("ResourceNotFound")<{
  readonly key: ResourceKey;
}> {}

export class DuplicateResource extends Data.TaggedError("DuplicateResource")<{
  readonly key: ResourceKey;
}> {}

/**
 * Stores the resources and dependencies registered by stack declarations.
 * Planning keeps a snapshot of the graph. Later declarations cannot change
 * the resources or dependencies in that snapshot.
 */
export class ResourceGraphStore extends Context.Service<ResourceGraphStore>()(
  "nomoss/core/resource/resourceGraphStore",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;

      const initialState: ResourceGraphState = {
        graph: Graph.directed<ResourceNode, DependencyEdge>(),
        indexByKey: new Map(),
      };
      const state = yield* Ref.make<ResourceGraphState>(initialState);
      const mutation = yield* Semaphore.make(1);
      const dependencyEdgesEqual = Schema.toEquivalence(DependencyEdgeSchema);
      const reset = Ref.set(state, initialState).pipe(mutation.withPermits(1));

      const addResource = Effect.fn("ResourceGraphStore.addResource")(
        function* (node: ResourceNode) {
          const current = yield* Ref.get(state);
          const stableKey = keyString(node.key);

          yield* Effect.fail(new DuplicateResource({ key: node.key })).pipe(
            Effect.when(Effect.succeed(current.indexByKey.has(stableKey))),
          );

          const mutable = Graph.beginMutation(current.graph);
          const index = Graph.addNode(mutable, node);
          const next: ResourceGraphState = {
            graph: Graph.endMutation(mutable),
            indexByKey: new Map(current.indexByKey).set(stableKey, index),
          };

          yield* Ref.set(state, next);
        },
        mutation.withPermits(1),
      );

      const addDependency = Effect.fn("ResourceGraphStore.addDependency")(
        function* (
          source: ResourceKey,
          target: ResourceKey,
          edge: DependencyEdge,
        ) {
          const current = yield* Ref.get(state);

          const sourceIndex = yield* Effect.fromOption(
            Option.fromUndefinedOr(current.indexByKey.get(keyString(source))),
          ).pipe(Effect.mapError(() => new ResourceNotFound({ key: source })));

          const targetIndex = yield* Effect.fromOption(
            Option.fromUndefinedOr(current.indexByKey.get(keyString(target))),
          ).pipe(Effect.mapError(() => new ResourceNotFound({ key: target })));

          const duplicate = Graph.findEdge(
            current.graph,
            (existing, existingSource, existingTarget) =>
              existingSource === sourceIndex &&
              existingTarget === targetIndex &&
              dependencyEdgesEqual(existing, edge),
          );

          yield* Ref.update(state, (latest) => {
            const graph = Option.match(duplicate, {
              onNone: () =>
                Graph.mutate(latest.graph, (mutable) => {
                  Graph.addEdge(mutable, sourceIndex, targetIndex, edge);
                }),
              onSome: () => latest.graph,
            });
            const updated: ResourceGraphState = {
              graph,
              indexByKey: latest.indexByKey,
            };

            return updated;
          });
        },
        mutation.withPermits(1),
      );

      const dependencyEdgesOf = Effect.fn(
        "ResourceGraphStore.dependencyEdgesOf",
      )(function* (
        graph: Graph.DirectedGraph<ResourceNode, DependencyEdge>,
        key: ResourceKey,
      ) {
        const targetIndex = yield* Graph.findNode(
          graph,
          (node) => keyString(node.key) === keyString(key),
        ).pipe(
          Effect.fromOption,
          Effect.mapError(() => new ResourceNotFound({ key })),
        );
        const dependencies: ReadonlyArray<ResourceDependency> = Arr.getSomes(
          Arr.map(Graph.incomingEdges(graph, targetIndex), (edgeIndex) =>
            Option.flatMap(Graph.getEdge(graph, edgeIndex), (edge) =>
              Option.map(Graph.getNode(graph, edge.source), (node) => ({
                source: node.key,
                target: key,
                edge: edge.data,
              })),
            ),
          ),
        );

        return dependencies;
      });

      const snapshot = Ref.get(state).pipe(
        Effect.map((current) => {
          const graph: Graph.DirectedGraph<ResourceNode, DependencyEdge> =
            current.graph;

          return graph;
        }),
      );

      const topologicalLogicalIds = snapshot.pipe(
        Effect.map((graph) => {
          const logicalIds: ReadonlyArray<string> = Arr.map(
            Arr.fromIterable(Graph.values(Graph.topo(graph))),
            (node) => node.key.logicalId,
          );

          return logicalIds;
        }),
      );

      /**
       * Reads an initial output from the declaration graph. ResourceModel
       * checks the registered output schema and the caller's schema before
       * returning the field. Read provider results from applied resource state.
       */
      const outputValue = Effect.fn("ResourceGraphStore.outputValue")(
        function* <S extends Schema.Constraint>(
          key: ResourceKey,
          property: string,
          schema: S,
        ) {
          const current = yield* Ref.get(state);

          const index = yield* Effect.fromOption(
            Option.fromUndefinedOr(current.indexByKey.get(keyString(key))),
          ).pipe(Effect.mapError(() => new ResourceNotFound({ key })));

          const node = yield* Graph.getNode(current.graph, index).pipe(
            Effect.fromOption,
            Effect.mapError(() => new ResourceNotFound({ key })),
          );

          const value: S["Type"] = yield* model.decodeOutput(
            node,
            property,
            schema,
          );

          return value;
        },
      );

      return {
        reset,
        addResource,
        addDependency,
        dependencyEdgesOf,
        snapshot,
        topologicalLogicalIds,
        outputValue,
      };
    }),
  },
) {}
