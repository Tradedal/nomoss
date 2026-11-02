import {
  Array as Arr,
  Context,
  DateTime,
  Effect,
  Graph,
  Layer,
  Match,
  Option,
  Semaphore,
} from "effect";
import { KeyValueStore } from "effect/persistence";
import type {
  DependencyEdge,
  PlanAction,
  ResourceNode,
} from "../resource/model.js";
import type { ResourceCommandFailure } from "../resource/resourceCommandPolicy.js";
import {
  type EnvironmentState,
  EnvironmentStateSchema,
  type ResourceFailure,
  ResourceFailureSchema,
  type ResourceState,
  ResourceStateSchema,
  type ResourceStateSnapshot,
} from "./resourceState.js";
import { StateSecretService } from "./stateSecretService.js";

/**
 * ResourceStateStore preserves completed resources and unfinished operations
 * in schema-validated KeyValueStore records. Planning and recovery read the
 * same saved phases. Secret handling follows the configured secret service,
 * which can keep references in storage and restore values for provider use.
 */
export class ResourceStateStore extends Context.Service<ResourceStateStore>()(
  "nomoss/core/state/stateStore/ResourceStateStore",
  {
    make: Effect.gen(function* () {
      const keyValueStore = yield* KeyValueStore.KeyValueStore;
      const stateSecrets = yield* StateSecretService;
      const changes = yield* Semaphore.make(1);

      const storage = KeyValueStore.toSchemaStore(
        keyValueStore,
        EnvironmentStateSchema,
      );

      /**
       * loadResourceStates returns the stack's saved lifecycle records with
       * secret values restored.
       * An unsaved stack returns an empty collection, allowing its first plan
       * to treat resources as not yet managed.
       */
      const loadResourceStates = Effect.fn(
        "ResourceStateStore.loadResourceStates",
      )(function* (stack: string) {
        const saved = yield* storage.get(`${stack}.json`);

        const states = Option.match(saved, {
          onNone: () => [],
          onSome: (state) => state.resources,
        });

        const restored: ReadonlyArray<ResourceState> =
          yield* stateSecrets.restoreStateSecrets(states);

        return restored;
      });

      /**
       * loadSnapshot returns lifecycle records and last-applied values from
       * the same state read. An unfinished update contributes its previous node
       * so the desired update is not mistaken for an already applied value.
       */
      const loadSnapshot = Effect.fn("ResourceStateStore.loadSnapshot")(
        function* (stack: string) {
          const states = yield* loadResourceStates(stack);

          const resources: ReadonlyArray<ResourceNode> = Arr.flatMap(
            states,
            (state) =>
              Match.value(state).pipe(
                Match.tag("Created", ({ node }) => [node]),
                Match.tag("Updating", ({ previous }) => [previous]),
                Match.tag("Updated", ({ node }) => [node]),
                Match.tag("Deleting", ({ node }) => [node]),
                Match.orElse(() => []),
              ),
          );

          const snapshot: ResourceStateSnapshot = { states, resources };

          return snapshot;
        },
      );

      /**
       * loadResources returns last-applied nodes from a consistent state read.
       * Unfinished updates expose their previous nodes, while pending creations
       * do not become applied resources merely because their phase was saved.
       */
      const loadResources = Effect.fn("ResourceStateStore.loadResources")(
        function* (stack: string) {
          const snapshot = yield* loadSnapshot(stack);

          const resources: ReadonlyArray<ResourceNode> = snapshot.resources;

          return resources;
        },
      );

      /**
       * saveResourceStates replaces the stack's complete lifecycle record set.
       * Secret handling must succeed before the schema-encoded write, keeping
       * an unpreserved secret from being committed to the new state document.
       */
      const saveResourceStates = Effect.fn(
        "ResourceStateStore.saveResourceStates",
      )(function* (stack: string, resources: ReadonlyArray<ResourceState>) {
        const externalized = yield* stateSecrets.persistStateSecrets(
          stack,
          resources,
        );

        const state: EnvironmentState = {
          schemaVersion: 1,
          stack,
          resources: externalized,
        };

        yield* storage.set(`${stack}.json`, state);
      });

      /**
       * saveResources replaces saved resources with the final collection from
       * reconciliation or a completed workflow. Updated records retain their
       * status; other nodes become Created records with a completion time. A shared
       * permit protects the read and replacement from concurrent lost updates.
       */
      const saveResources = Effect.fn("ResourceStateStore.saveResources")(
        function* (stack: string, resources: ReadonlyArray<ResourceNode>) {
          const states = yield* loadResourceStates(stack);

          const completedAt = yield* DateTime.now.pipe(
            Effect.map(DateTime.formatIso),
          );

          const resourceStates: ReadonlyArray<ResourceState> = Arr.map(
            resources,
            (node) => {
              const previous = Arr.findFirst(
                states,
                (state) => state.node.key.logicalId === node.key.logicalId,
              );

              const state: ResourceState = Match.value(previous).pipe(
                Match.when({ _tag: "Some", value: { _tag: "Updated" } }, () =>
                  ResourceStateSchema.make({
                    _tag: "Updated",
                    node,
                    completedAt,
                  }),
                ),
                Match.orElse(() =>
                  ResourceStateSchema.make({
                    _tag: "Created",
                    node,
                    completedAt,
                  }),
                ),
              );

              return state;
            },
          );

          yield* saveResourceStates(stack, resourceStates);
        },
        changes.withPermits(1),
      );

      /**
       * markResourceStarted saves the intended phase before a provider call
       * can begin remote work. The saved phase remains available after failure;
       * an update retains the last applied node for comparison during a later run.
       */
      const markResourceStarted = Effect.fn(
        "ResourceStateStore.markResourceStarted",
      )(function* (stack: string, action: PlanAction) {
        const states = yield* loadResourceStates(stack);

        const startedAt = yield* DateTime.now.pipe(
          Effect.map(DateTime.formatIso),
        );

        const resourceState: ResourceState = Match.value(action).pipe(
          Match.tag("Create", ({ node }) =>
            ResourceStateSchema.make({ _tag: "Creating", node, startedAt }),
          ),
          Match.tag("Update", ({ node, current }) =>
            ResourceStateSchema.make({
              _tag: "Updating",
              node,
              previous: current,
              startedAt,
            }),
          ),
          Match.tag("Delete", "Destroy", ({ node }) =>
            ResourceStateSchema.make({ _tag: "Deleting", node, startedAt }),
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
      }, changes.withPermits(1));

      /**
       * markResourceApplied saves a completed creation or update with its
       * provider result and completion time. Only this resource's record is
       * replaced, preserving progress recorded for other actions in the stack.
       */
      const markResourceApplied = Effect.fn(
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

        const resourceState: ResourceState = ResourceStateSchema.make({
          _tag: stateTag,
          node,
          completedAt,
        });

        const resourceStates: ReadonlyArray<ResourceState> = Arr.append(
          Arr.filter(
            states,
            (state) => state.node.key.logicalId !== node.key.logicalId,
          ),
          resourceState,
        );

        yield* saveResourceStates(stack, resourceStates);
      }, changes.withPermits(1));

      /**
       * deleteResourceState removes a resource's saved record after successful
       * rollback. Other records remain available for recovery.
       */
      const deleteResourceState = Effect.fn(
        "ResourceStateStore.deleteResourceState",
      )(function* (stack: string, node: ResourceNode) {
        const states = yield* loadResourceStates(stack);

        const resources: ReadonlyArray<ResourceState> = Arr.filter(
          states,
          (state) => state.node.key.logicalId !== node.key.logicalId,
        );

        yield* saveResourceStates(stack, resources);
      }, changes.withPermits(1));

      /**
       * markResourceFailure saves the reported failure and its time against the
       * resource's active operation. Completed or unrelated records are
       * preserved, and an absent active record is not manufactured here.
       */
      const markResourceFailure = Effect.fn(
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

        const failure: ResourceFailure = ResourceFailureSchema.make({
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
                  _tag: "Creating",
                  node: { key: { logicalId: node.key.logicalId } },
                },
                (creating) =>
                  ResourceStateSchema.make({
                    ...creating,
                    lastFailure: failure,
                  }),
              ),
              Match.when(
                {
                  _tag: "Updating",
                  node: { key: { logicalId: node.key.logicalId } },
                },
                (updating) =>
                  ResourceStateSchema.make({
                    ...updating,
                    lastFailure: failure,
                  }),
              ),
              Match.when(
                {
                  _tag: "Deleting",
                  node: { key: { logicalId: node.key.logicalId } },
                },
                (deleting) =>
                  ResourceStateSchema.make({
                    ...deleting,
                    lastFailure: failure,
                  }),
              ),
              Match.orElse(() => state),
            ),
        );

        yield* saveResourceStates(stack, resourceStates);
      }, changes.withPermits(1));

      /**
       * resourcesFromGraph returns nodes in dependency order from the supplied
       * graph snapshot. The collection retains the snapshot's node values for
       * planning and final saved-state selection.
       */
      const resourcesFromGraph = (
        graph: Graph.DirectedGraph<ResourceNode, DependencyEdge>,
      ) => {
        const resources: ReadonlyArray<ResourceNode> = Arr.fromIterable(
          Graph.values(Graph.topo(graph)),
        );

        return resources;
      };

      return {
        loadResourceStates,
        loadSnapshot,
        loadResources,
        saveResourceStates,
        saveResources,
        markResourceStarted,
        markResourceApplied,
        deleteResourceState,
        markResourceFailure,
        resourcesFromGraph,
      };
    }),
  },
) {}

/**
 * Applications supply storage and secret handling to this Layer. Tests use the
 * same state operations with memory storage and controlled external services.
 */
export const resourceStateStoreBaseLayer = Layer.effect(
  ResourceStateStore,
  ResourceStateStore.make,
);

export const resourceStateFileStorageLayer =
  KeyValueStore.layerFileSystem("./.nomoss/state");
