import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Graph,
  Layer,
  Option,
  Ref,
  Schema,
  Semaphore,
} from "effect";
import type { ResourceStateStore } from "../state/stateStore.js";
import {
  type DependencyEdge,
  DependencyEdgeSchema,
  type ResourceKey,
  ResourceModel,
  type ResourceNode,
  resourceModelLayer,
} from "./model.js";
import { ResourceOutputBinding } from "./resourceOutputBinding.js";

type ResourceGraphState = {
  readonly outputs: ResourceOutputBinding;
  readonly graph: Graph.DirectedGraph<ResourceNode, DependencyEdge>;
  readonly indexByKey: ReadonlyMap<string, Graph.NodeIndex>;
};

/**
 * ResourceDependency relates a source resource to the resource that must wait
 * for it. Property edges also identify the output and target input required
 * for value substitution during apply.
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
 * ResourceGraphStore retains the application's declared resources and ordering
 * constraints. Its immutable snapshots allow a prepared stack to remain usable
 * after another declaration changes the active graph.
 */
export class ResourceGraphStore extends Context.Service<ResourceGraphStore>()(
  "nomoss/core/resource/resourceGraphStore",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;

      const initialState: ResourceGraphState = {
        outputs: yield* ResourceOutputBinding.make,
        graph: Graph.directed<ResourceNode, DependencyEdge>(),
        indexByKey: new Map(),
      };

      const state = yield* Ref.make<ResourceGraphState>(initialState);
      const mutation = yield* Semaphore.make(1);
      const dependencyEdgesEqual = Schema.toEquivalence(DependencyEdgeSchema);
      const isRelationship = (edge: DependencyEdge) =>
        edge.kind === "relationship";
      /**
       * The reset service method starts an empty declaration graph and preserves
       * snapshots already retained by prepared stacks. Its mutation permit serializes
       * reset with registration and dependency changes.
       */
      const reset = ResourceOutputBinding.make.pipe(
        Effect.map((outputs) => {
          const next: ResourceGraphState = { ...initialState, outputs };
          return next;
        }),
        Effect.flatMap((next) => Ref.set(state, next)),
        mutation.withPermits(1),
      );

      /**
       * The outputBinding Effect supplies the active declaration's ownership
       * link. Reset creates a new link while prepared declarations retain theirs.
       */
      const outputBinding = Ref.get(state).pipe(
        Effect.map((state) => state.outputs),
      );

      /**
       * The bindStack service method captures the graph and connects its
       * outputs to the same state service used for execution. The mutation
       * permit prevents a concurrent reset from changing that association.
       */
      const bindStack = Effect.fn("ResourceGraphStore.bindStack")(function* (
        stackName: string,
        store: (typeof ResourceStateStore)["Service"],
      ) {
        const current = yield* Ref.get(state);
        yield* current.outputs.bind(stackName, store, model);
        const desired: Graph.DirectedGraph<ResourceNode, DependencyEdge> =
          current.graph;
        return desired;
      }, mutation.withPermits(1));

      /**
       * The addResource service method publishes a node and its dependencies
       * together. Missing sources and incompatible entity types leave the
       * graph unchanged, as do duplicate keys or mismatched target keys.
       */
      const addResource = Effect.fn("ResourceGraphStore.addResource")(
        function* (
          node: ResourceNode,
          dependencies: ReadonlyArray<ResourceDependency> = [],
        ) {
          const current = yield* Ref.get(state);
          const stableKey = node.key.logicalId;

          yield* Effect.fail(new DuplicateResource({ key: node.key })).pipe(
            Effect.when(Effect.succeed(current.indexByKey.has(stableKey))),
          );

          const sources = yield* Effect.forEach(dependencies, (dependency) =>
            Effect.gen(function* () {
              yield* Effect.fail(
                new ResourceNotFound({ key: dependency.target }),
              ).pipe(
                Effect.when(
                  Effect.succeed(
                    dependency.target.logicalId !== node.key.logicalId,
                  ),
                ),
              );

              const index = yield* Option.fromUndefinedOr(
                current.indexByKey.get(dependency.source.logicalId),
              ).pipe(
                Effect.fromOption,
                Effect.mapError(
                  () => new ResourceNotFound({ key: dependency.source }),
                ),
              );
              const source = yield* Graph.getNode(current.graph, index).pipe(
                Effect.fromOption,
                Effect.mapError(
                  () => new ResourceNotFound({ key: dependency.source }),
                ),
              );

              yield* Option.match(
                Option.liftPredicate(dependency.edge, isRelationship),
                {
                  onNone: () => Effect.succeed(source),
                  onSome: (edge) =>
                    model.validateResourceReference(edge.reference, source),
                },
              );

              return index;
            }),
          );

          const mutable = Graph.beginMutation(current.graph);
          const index = Graph.addNode(mutable, node);

          Arr.forEach(dependencies, (dependency, position) =>
            Graph.addEdge(mutable, sources[position], index, dependency.edge),
          );
          const next: ResourceGraphState = {
            outputs: current.outputs,
            graph: Graph.endMutation(mutable),
            indexByKey: new Map(current.indexByKey).set(stableKey, index),
          };

          yield* Ref.set(state, next);
        },
        mutation.withPermits(1),
      );

      /**
       * addDependency records an ordering or output dependency between existing
       * resources. Missing endpoints fail, and an identical existing edge is
       * retained once. Mutation creates a new graph so earlier snapshots keep
       * their original dependencies.
       */
      const addDependency = Effect.fn("ResourceGraphStore.addDependency")(
        function* (
          source: ResourceKey,
          target: ResourceKey,
          edge: DependencyEdge,
        ) {
          const current = yield* Ref.get(state);

          const sourceIndex = yield* Effect.fromOption(
            Option.fromUndefinedOr(current.indexByKey.get(source.logicalId)),
          ).pipe(Effect.mapError(() => new ResourceNotFound({ key: source })));

          const targetIndex = yield* Effect.fromOption(
            Option.fromUndefinedOr(current.indexByKey.get(target.logicalId)),
          ).pipe(Effect.mapError(() => new ResourceNotFound({ key: target })));

          const sourceNode = yield* Graph.getNode(
            current.graph,
            sourceIndex,
          ).pipe(
            Effect.fromOption,
            Effect.mapError(() => new ResourceNotFound({ key: source })),
          );

          yield* Option.match(Option.liftPredicate(edge, isRelationship), {
            onNone: () => Effect.succeed(sourceNode),
            onSome: (edge) =>
              model.validateResourceReference(edge.reference, sourceNode),
          });

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
              outputs: latest.outputs,
              graph,
              indexByKey: latest.indexByKey,
            };

            return updated;
          });
        },
        mutation.withPermits(1),
      );

      /**
       * The dependencyEdgesOf service method returns dependencies that target a resource in the
       * supplied snapshot. Output resolution can therefore follow a prepared
       * stack's graph after another declaration changes the active graph.
       * A target absent from the supplied snapshot produces ResourceNotFound.
       */
      const dependencyEdgesOf = Effect.fn(
        "ResourceGraphStore.dependencyEdgesOf",
      )(function* (
        graph: Graph.DirectedGraph<ResourceNode, DependencyEdge>,
        key: ResourceKey,
      ) {
        const targetIndex = yield* Graph.findNode(
          graph,
          (node) => node.key.logicalId === key.logicalId,
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

      /**
       * snapshot returns the immutable graph currently registered for planning.
       * Subsequent mutations publish another graph and leave this value usable
       * by plans or embedded callers that retain it.
       */
      const snapshot = Ref.get(state).pipe(
        Effect.map((current) => {
          const graph: Graph.DirectedGraph<ResourceNode, DependencyEdge> =
            current.graph;

          return graph;
        }),
      );

      /**
       * topologicalLogicalIds returns declaration identities in dependency
       * order for graph inspection. Sources precede their dependents.
       */
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
       * outputValue returns an initial declaration output validated against
       * its registered schema and the caller's schema. Results produced by
       * provider operations are available from applied resource state.
       */
      const outputValue = Effect.fn("ResourceGraphStore.outputValue")(
        function* <S extends Schema.Constraint>(
          key: ResourceKey,
          property: string,
          schema: S,
        ) {
          const current = yield* Ref.get(state);

          const index = yield* Effect.fromOption(
            Option.fromUndefinedOr(current.indexByKey.get(key.logicalId)),
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
        outputBinding,
        bindStack,
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

export const resourceGraphStoreLayer = Layer.effect(
  ResourceGraphStore,
  ResourceGraphStore.make,
).pipe(Layer.provideMerge(resourceModelLayer));
