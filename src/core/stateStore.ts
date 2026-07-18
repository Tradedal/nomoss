import {
  Array as Arr,
  Context,
  DateTime,
  Effect,
  FileSystem,
  Graph,
  HashMap,
  Layer,
  Match,
  Option,
  Ref,
  Schema,
} from "effect";

import {
  type DependencyEdge,
  type PlanAction,
  type ResourceNode,
  ResourceNodeSchema,
} from "./model.js";
import type { ResourceCommandFailure } from "./resourceCommandPolicy.js";
import { StateSecretService } from "./stateSecretService.js";

/**
 * Provider failures are persisted as compact diagnostics on the current
 * lifecycle phase so a retry can show what failed without storing arbitrary
 * provider error objects in state.
 */
export const ResourceFailureSchema = Schema.Struct({
  errorTag: Schema.optional(Schema.NonEmptyString),
  message: Schema.String,
  occurredAt: Schema.NonEmptyString,
});

/**
 * Resource state stores lifecycle progress separately from `ResourceNode`.
 * Planners read terminal nodes, while apply uses in-flight phases for retry
 * and rollback recovery.
 */
export const ResourceStateSchema = Schema.Union([
  Schema.TaggedStruct("Creating", {
    node: ResourceNodeSchema,
    startedAt: Schema.NonEmptyString,
    lastFailure: Schema.optional(ResourceFailureSchema),
  }),
  Schema.TaggedStruct("Created", {
    node: ResourceNodeSchema,
    completedAt: Schema.NonEmptyString,
  }),
  Schema.TaggedStruct("Updating", {
    node: ResourceNodeSchema,
    previous: ResourceNodeSchema,
    startedAt: Schema.NonEmptyString,
    lastFailure: Schema.optional(ResourceFailureSchema),
  }),
  Schema.TaggedStruct("Updated", {
    node: ResourceNodeSchema,
    completedAt: Schema.NonEmptyString,
  }),
  Schema.TaggedStruct("Deleting", {
    node: ResourceNodeSchema,
    startedAt: Schema.NonEmptyString,
    lastFailure: Schema.optional(ResourceFailureSchema),
  }),
]);

export const EnvironmentStateSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  stack: Schema.NonEmptyString,
  resources: Schema.Array(ResourceStateSchema),
});

export type EnvironmentState = Schema.Schema.Type<
  typeof EnvironmentStateSchema
>;
export type ResourceState = EnvironmentState["resources"][number];
export type ResourceFailure = NonNullable<
  Extract<
    ResourceState,
    { readonly _tag: "Creating" | "Updating" | "Deleting" }
  >["lastFailure"]
>;

const completedStateTag = (state: ResourceState): Option.Option<"Updated"> =>
  Match.value(state).pipe(
    Match.when({ _tag: "Updated" }, () => Option.some<"Updated">("Updated")),
    Match.orElse(() => Option.none<"Updated">()),
  );

export const EnvironmentStateFileSchema = Schema.fromJsonString(
  EnvironmentStateSchema,
);

/**
 * A stack apply can stop after one provider command completes while another
 * resource remains in a non-terminal lifecycle phase. `ResourceStackLifecycle`
 * records those durable facts here so the next prepare or retry gives
 * `ResourcePlanner` and provider command policies the last applicable resource
 * node instead of treating the interrupted stack as new. When a provider value
 * such as Stripe's webhook signing secret is needed by a later update but must
 * not remain in JSON, this same record path uses `StateSecretService` to retain
 * only its state-secret reference.
 */
export class ResourceStateStore extends Context.Service<ResourceStateStore>()(
  "nomoss/core/stateStore/ResourceStateStore",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const stateSecrets = yield* StateSecretService;

      const loadResourceStates = Effect.fn(
        "ResourceStateStore.loadResourceStates",
      )(function* (stack: string) {
        const filePath = `./.nomoss/state/${stack}.json`;
        const states = yield* fs.readFileString(filePath).pipe(
          Effect.flatMap(
            Schema.decodeUnknownEffect(EnvironmentStateFileSchema),
          ),
          Effect.map((state) => state.resources),
          Effect.when(fs.exists(filePath)),
          Effect.map(Option.getOrElse(() => [])),
        );

        return yield* stateSecrets.restoreStateSecrets(states);
      });

      const saveResourceStates = Effect.fn(
        "ResourceStateStore.saveResourceStates",
      )(function* (stack: string, resources: ReadonlyArray<ResourceState>) {
        const externalizedResources = yield* stateSecrets.persistStateSecrets(
          stack,
          resources,
        );
        const state = yield* EnvironmentStateSchema.makeEffect({
          schemaVersion: 1,
          stack,
          resources: externalizedResources,
        });

        const encoded = yield* Schema.encodeEffect(EnvironmentStateFileSchema)(
          state,
        );

        yield* fs.makeDirectory("./.nomoss/state", { recursive: true });
        yield* fs.writeFileString(`./.nomoss/state/${stack}.json`, encoded);
      });

      return {
        loadResourceStates,

        loadResources: Effect.fn("ResourceStateStore.loadResources")(function* (
          stack: string,
        ) {
          const states = yield* loadResourceStates(stack);
          const resources = Arr.flatMap(states, (state) =>
            Match.value(state).pipe(
              Match.when({ _tag: "Created" }, ({ node }) => [node]),
              Match.when({ _tag: "Updating" }, ({ previous }) => [previous]),
              Match.when({ _tag: "Updated" }, ({ node }) => [node]),
              Match.when({ _tag: "Deleting" }, ({ node }) => [node]),
              Match.orElse((): ReadonlyArray<ResourceNode> => []),
            ),
          );

          return resources;
        }),

        saveResourceStates,

        saveResources: Effect.fn("ResourceStateStore.saveResources")(function* (
          stack: string,
          resources: ReadonlyArray<ResourceNode>,
        ) {
          const states = yield* loadResourceStates(stack);
          const completedAt = yield* DateTime.now.pipe(
            Effect.map(DateTime.formatIso),
          );
          const resourceStates: ReadonlyArray<ResourceState> = Arr.map(
            resources,
            (node) =>
              Option.match(
                Option.flatMap(
                  Arr.findFirst(
                    states,
                    (state) => state.node.key.logicalId === node.key.logicalId,
                  ),
                  completedStateTag,
                ),
                {
                  onNone: () =>
                    ResourceStateSchema.make({
                      _tag: "Created",
                      node,
                      completedAt,
                    }),
                  onSome: (_tag) =>
                    ResourceStateSchema.make({
                      _tag,
                      node,
                      completedAt,
                    }),
                },
              ),
          );

          yield* saveResourceStates(stack, resourceStates);
        }),

        markResourceStarted: Effect.fn(
          "ResourceStateStore.markResourceStarted",
        )(function* (stack: string, action: PlanAction) {
          const states = yield* loadResourceStates(stack);
          const startedAt = yield* DateTime.now.pipe(
            Effect.map(DateTime.formatIso),
          );
          const resourceState: ResourceState = Match.value(action).pipe(
            Match.when({ _tag: "Create" }, ({ node }) =>
              ResourceStateSchema.make({
                _tag: "Creating",
                node,
                startedAt,
              }),
            ),
            Match.when({ _tag: "Update" }, ({ node, current }) =>
              ResourceStateSchema.make({
                _tag: "Updating",
                node,
                previous: current,
                startedAt,
              }),
            ),
            Match.when({ _tag: "Delete" }, ({ node }) =>
              ResourceStateSchema.make({
                _tag: "Deleting",
                node,
                startedAt,
              }),
            ),
            Match.when({ _tag: "Destroy" }, ({ node }) =>
              ResourceStateSchema.make({
                _tag: "Deleting",
                node,
                startedAt,
              }),
            ),
            Match.exhaustive,
          );
          const resourceStates: ReadonlyArray<ResourceState> = Arr.append(
            Arr.filter(
              states,
              (state) =>
                state.node.key.logicalId !== resourceState.node.key.logicalId,
            ),
            resourceState,
          );

          yield* saveResourceStates(stack, resourceStates);
        }),

        markResourceApplied: Effect.fn(
          "ResourceStateStore.markResourceApplied",
        )(function* (
          stack: string,
          node: ResourceNode,
          stateTag: "Created" | "Updated",
        ) {
          const states = yield* loadResourceStates(stack);
          const completedAt = yield* DateTime.now.pipe(
            Effect.map(DateTime.formatIso),
          );
          const resourceState: ResourceState = Match.value(stateTag).pipe(
            Match.when("Created", (_tag) =>
              ResourceStateSchema.make({
                _tag,
                node,
                completedAt,
              }),
            ),
            Match.when("Updated", (_tag) =>
              ResourceStateSchema.make({
                _tag,
                node,
                completedAt,
              }),
            ),
            Match.exhaustive,
          );
          const resourceStates: ReadonlyArray<ResourceState> = Arr.append(
            Arr.filter(
              states,
              (state) => state.node.key.logicalId !== node.key.logicalId,
            ),
            resourceState,
          );

          yield* saveResourceStates(stack, resourceStates);
        }),

        deleteResourceState: Effect.fn(
          "ResourceStateStore.deleteResourceState",
        )(function* (stack: string, node: ResourceNode) {
          const states = yield* loadResourceStates(stack);
          const resourceStates: ReadonlyArray<ResourceState> = Arr.filter(
            states,
            (state) => state.node.key.logicalId !== node.key.logicalId,
          );

          yield* saveResourceStates(stack, resourceStates);
        }),

        markResourceFailure: Effect.fn(
          "ResourceStateStore.markResourceFailure",
        )(function* (
          stack: string,
          node: ResourceNode,
          cause: ResourceCommandFailure,
        ) {
          const states = yield* loadResourceStates(stack);
          const occurredAt = yield* DateTime.now.pipe(
            Effect.map(DateTime.formatIso),
          );
          const resourceFailure: ResourceFailure = ResourceFailureSchema.make({
            errorTag: cause._tag,
            message: cause.message,
            occurredAt,
          });
          const resourceStates: ReadonlyArray<ResourceState> = Arr.map(
            states,
            (state) =>
              Match.value(state).pipe(
                Match.when(
                  {
                    node: { key: { logicalId: node.key.logicalId } },
                    _tag: "Creating",
                  },
                  (creating) =>
                    ResourceStateSchema.make({
                      _tag: "Creating",
                      node: creating.node,
                      startedAt: creating.startedAt,
                      lastFailure: resourceFailure,
                    }),
                ),
                Match.when(
                  {
                    node: { key: { logicalId: node.key.logicalId } },
                    _tag: "Updating",
                  },
                  (updating) =>
                    ResourceStateSchema.make({
                      _tag: "Updating",
                      node: updating.node,
                      previous: updating.previous,
                      startedAt: updating.startedAt,
                      lastFailure: resourceFailure,
                    }),
                ),
                Match.when(
                  {
                    node: { key: { logicalId: node.key.logicalId } },
                    _tag: "Deleting",
                  },
                  (deleting) =>
                    ResourceStateSchema.make({
                      _tag: "Deleting",
                      node: deleting.node,
                      startedAt: deleting.startedAt,
                      lastFailure: resourceFailure,
                    }),
                ),
                Match.orElse(() => state),
              ),
          );

          yield* saveResourceStates(stack, resourceStates);
        }),

        resourcesFromGraph: (
          graph: Graph.DirectedGraph<ResourceNode, DependencyEdge>,
        ) => Arr.fromIterable(Graph.values(Graph.topo(graph))),
      };
    }),
  },
) {}

/**
 * Resource stack lifecycle tests use the same state-store contract without
 * writing `.nomoss` files into the checkout.
 */
export const ResourceStateStoreTestLayer = Layer.effect(
  ResourceStateStore,
  Effect.gen(function* () {
    const statesByStack = yield* Ref.make(
      HashMap.empty<string, ReadonlyArray<ResourceState>>(),
    );

    const loadResourceStates = Effect.fn(
      "ResourceStateStoreTestLayer.loadResourceStates",
    )(function* (stack: string) {
      const resources = yield* Ref.get(statesByStack);

      return Option.getOrElse(HashMap.get(resources, stack), () => []);
    });

    const saveResourceStates = Effect.fn(
      "ResourceStateStoreTestLayer.saveResourceStates",
    )(function* (stack: string, resources: ReadonlyArray<ResourceState>) {
      yield* Ref.update(statesByStack, (current) =>
        HashMap.set(current, stack, resources),
      );
    });

    return {
      loadResourceStates,

      loadResources: Effect.fn("ResourceStateStoreTestLayer.loadResources")(
        function* (stack: string) {
          const states = yield* loadResourceStates(stack);
          const resources = Arr.flatMap(states, (state) =>
            Match.value(state).pipe(
              Match.when({ _tag: "Created" }, ({ node }) => [node]),
              Match.when({ _tag: "Updating" }, ({ previous }) => [previous]),
              Match.when({ _tag: "Updated" }, ({ node }) => [node]),
              Match.when({ _tag: "Deleting" }, ({ node }) => [node]),
              Match.orElse((): ReadonlyArray<ResourceNode> => []),
            ),
          );

          return resources;
        },
      ),

      saveResourceStates,

      saveResources: Effect.fn("ResourceStateStoreTestLayer.saveResources")(
        function* (stack: string, resources: ReadonlyArray<ResourceNode>) {
          const states = yield* loadResourceStates(stack);
          const completedAt = yield* DateTime.now.pipe(
            Effect.map(DateTime.formatIso),
          );
          const resourceStates: ReadonlyArray<ResourceState> = Arr.map(
            resources,
            (node) =>
              Option.match(
                Option.flatMap(
                  Arr.findFirst(
                    states,
                    (state) => state.node.key.logicalId === node.key.logicalId,
                  ),
                  completedStateTag,
                ),
                {
                  onNone: () =>
                    ResourceStateSchema.make({
                      _tag: "Created",
                      node,
                      completedAt,
                    }),
                  onSome: (_tag) =>
                    ResourceStateSchema.make({
                      _tag,
                      node,
                      completedAt,
                    }),
                },
              ),
          );

          yield* saveResourceStates(stack, resourceStates);
        },
      ),

      markResourceStarted: Effect.fn(
        "ResourceStateStoreTestLayer.markResourceStarted",
      )(function* (stack: string, action: PlanAction) {
        const states = yield* loadResourceStates(stack);
        const startedAt = yield* DateTime.now.pipe(
          Effect.map(DateTime.formatIso),
        );
        const resourceState: ResourceState = Match.value(action).pipe(
          Match.when({ _tag: "Create" }, ({ node }) =>
            ResourceStateSchema.make({
              _tag: "Creating",
              node,
              startedAt,
            }),
          ),
          Match.when({ _tag: "Update" }, ({ node, current }) =>
            ResourceStateSchema.make({
              _tag: "Updating",
              node,
              previous: current,
              startedAt,
            }),
          ),
          Match.when({ _tag: "Delete" }, ({ node }) =>
            ResourceStateSchema.make({
              _tag: "Deleting",
              node,
              startedAt,
            }),
          ),
          Match.when({ _tag: "Destroy" }, ({ node }) =>
            ResourceStateSchema.make({
              _tag: "Deleting",
              node,
              startedAt,
            }),
          ),
          Match.exhaustive,
        );
        const resourceStates: ReadonlyArray<ResourceState> = Arr.append(
          Arr.filter(
            states,
            (state) =>
              state.node.key.logicalId !== resourceState.node.key.logicalId,
          ),
          resourceState,
        );

        yield* saveResourceStates(stack, resourceStates);
      }),

      markResourceApplied: Effect.fn(
        "ResourceStateStoreTestLayer.markResourceApplied",
      )(function* (
        stack: string,
        node: ResourceNode,
        stateTag: "Created" | "Updated",
      ) {
        const states = yield* loadResourceStates(stack);
        const completedAt = yield* DateTime.now.pipe(
          Effect.map(DateTime.formatIso),
        );
        const resourceState: ResourceState = Match.value(stateTag).pipe(
          Match.when("Created", (_tag) =>
            ResourceStateSchema.make({
              _tag,
              node,
              completedAt,
            }),
          ),
          Match.when("Updated", (_tag) =>
            ResourceStateSchema.make({
              _tag,
              node,
              completedAt,
            }),
          ),
          Match.exhaustive,
        );
        const resourceStates: ReadonlyArray<ResourceState> = Arr.append(
          Arr.filter(
            states,
            (state) => state.node.key.logicalId !== node.key.logicalId,
          ),
          resourceState,
        );

        yield* saveResourceStates(stack, resourceStates);
      }),

      deleteResourceState: Effect.fn(
        "ResourceStateStoreTestLayer.deleteResourceState",
      )(function* (stack: string, node: ResourceNode) {
        const states = yield* loadResourceStates(stack);
        const resourceStates: ReadonlyArray<ResourceState> = Arr.filter(
          states,
          (state) => state.node.key.logicalId !== node.key.logicalId,
        );

        yield* saveResourceStates(stack, resourceStates);
      }),

      markResourceFailure: Effect.fn(
        "ResourceStateStoreTestLayer.markResourceFailure",
      )(function* (
        stack: string,
        node: ResourceNode,
        cause: ResourceCommandFailure,
      ) {
        const states = yield* loadResourceStates(stack);
        const occurredAt = yield* DateTime.now.pipe(
          Effect.map(DateTime.formatIso),
        );
        const resourceFailure: ResourceFailure = ResourceFailureSchema.make({
          errorTag: cause._tag,
          message: cause.message,
          occurredAt,
        });
        const resourceStates: ReadonlyArray<ResourceState> = Arr.map(
          states,
          (state) =>
            Match.value(state).pipe(
              Match.when(
                {
                  node: { key: { logicalId: node.key.logicalId } },
                  _tag: "Creating",
                },
                (creating) =>
                  ResourceStateSchema.make({
                    _tag: "Creating",
                    node: creating.node,
                    startedAt: creating.startedAt,
                    lastFailure: resourceFailure,
                  }),
              ),
              Match.when(
                {
                  node: { key: { logicalId: node.key.logicalId } },
                  _tag: "Updating",
                },
                (updating) =>
                  ResourceStateSchema.make({
                    _tag: "Updating",
                    node: updating.node,
                    previous: updating.previous,
                    startedAt: updating.startedAt,
                    lastFailure: resourceFailure,
                  }),
              ),
              Match.when(
                {
                  node: { key: { logicalId: node.key.logicalId } },
                  _tag: "Deleting",
                },
                (deleting) =>
                  ResourceStateSchema.make({
                    _tag: "Deleting",
                    node: deleting.node,
                    startedAt: deleting.startedAt,
                    lastFailure: resourceFailure,
                  }),
              ),
              Match.orElse(() => state),
            ),
        );

        yield* saveResourceStates(stack, resourceStates);
      }),

      resourcesFromGraph: (
        graph: Graph.DirectedGraph<ResourceNode, DependencyEdge>,
      ) => Arr.fromIterable(Graph.values(Graph.topo(graph))),
    };
  }),
);
