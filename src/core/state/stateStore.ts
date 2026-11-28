import {
  Array as Arr,
  Context,
  DateTime,
  Effect,
  Equal,
  Graph,
  HashMap,
  Layer,
  Match,
  Option,
  Order,
  Predicate,
  Record,
  Ref,
  Semaphore,
} from "effect";
import { KeyValueStore } from "effect/persistence";
import {
  type DependencyEdge,
  type ResourceKey,
  type ResourceNode,
  type ResourceOperation,
  resourceGeneration,
  resourceInstanceKey,
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
 * The ResourceStateStore service requires secret handling and schema-validated
 * storage to succeed before its working records become available to output
 * access. Saved progress belongs to individual provider generations, while
 * application values remain attached to the last applied instance until its
 * successor is committed.
 */
export class ResourceStateStore extends Context.Service<ResourceStateStore>()(
  "nomoss/core/state/stateStore/ResourceStateStore",
  {
    make: Effect.gen(function* () {
      const keyValueStore = yield* KeyValueStore.KeyValueStore;
      const stateSecrets = yield* StateSecretService;
      const changes = yield* Semaphore.make(1);
      const working = yield* Ref.make(
        HashMap.empty<string, ReadonlyArray<ResourceState>>(),
      );

      const storage = KeyValueStore.toSchemaStore(
        keyValueStore,
        EnvironmentStateSchema,
      );

      /**
       * The resourcesFromStates helper keeps application outputs on the oldest
       * recorded instance until the operation commits. A completed removal can
       * still supply the last applied outputs while its successor is pending.
       * Resources with only completed removals are omitted from the result.
       */
      const resourcesFromStates = (states: ReadonlyArray<ResourceState>) =>
        Arr.flatMap(
          Record.values(
            Arr.groupBy(states, (state) => state.node.key.logicalId),
          ),
          (instances) =>
            Arr.match(
              Arr.filter(instances, (state) => state._tag !== "Deleted"),
              {
                onEmpty: () => [],
                onNonEmpty: () => {
                  const first = Arr.sort(
                    instances,
                    Order.mapInput(Order.Number, (state: ResourceState) =>
                      resourceGeneration(state.node),
                    ),
                  )[0];

                  return Match.value(first).pipe(
                    Match.tag(
                      "Created",
                      "Updated",
                      "Deleting",
                      "Deleted",
                      ({ node }) => [node],
                    ),
                    Match.tag("Updating", ({ previous }) => [previous]),
                    Match.orElse(() => []),
                  );
                },
              },
            ),
        );

      /**
       * The ownedResources service method includes instances that teardown can
       * locate from saved state. An accepted creation qualifies once its
       * provider identity is saved, even if confirmation has yet to finish.
       * An unfinished update still uses the last applied identity.
       */
      const ownedResources = (
        states: ReadonlyArray<ResourceState>,
      ): ReadonlyArray<ResourceNode> =>
        Arr.flatMap(states, (state) =>
          Match.value(state).pipe(
            Match.tag("Created", "Updated", "Deleting", ({ node }) => [node]),
            Match.tag("Updating", ({ previous }) => [previous]),
            Match.when({ _tag: "Creating", submitted: true }, ({ node }) => [
              node,
            ]),
            Match.tag("Creating", () => []),
            Match.tag("Deleted", () => []),
            Match.exhaustive,
          ),
        );

      const readStateDocument = Effect.fn(
        "ResourceStateStore.readStateDocument",
      )((stack: string) =>
        storage.get(`${stack}.json`).pipe(
          Effect.map(
            Option.match({
              onNone: (): ReadonlyArray<ResourceState> => [],
              onSome: (state) => state.resources,
            }),
          ),
        ),
      );

      /**
       * The readSavedStates service method reads the saved document after any
       * active write finishes. It leaves secret values and working records
       * untouched.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Semaphore.ts (withPermits)
       */
      const readSavedStates = Effect.fn("ResourceStateStore.readSavedStates")(
        readStateDocument,
        changes.withPermits(1),
      );

      const restoreResourceStates = Effect.fn(
        "ResourceStateStore.restoreResourceStates",
      )(function* (stack: string) {
        const states = yield* readStateDocument(stack);

        const restored: ReadonlyArray<ResourceState> =
          yield* stateSecrets.restoreStateSecrets(states);

        yield* Ref.update(working, HashMap.set(stack, restored));

        return restored;
      });

      /**
       * The loadResourceStates service method restores saved secret values and
       * publishes the snapshot for output reads. The same permit guards writes
       * so a slow restore cannot publish older records after a newer write.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Semaphore.ts (withPermits)
       */
      const loadResourceStates = Effect.fn(
        "ResourceStateStore.loadResourceStates",
      )(restoreResourceStates, changes.withPermits(1));

      /**
       * The currentResource service method uses records restored by a lifecycle
       * load or successful state write, so application output access performs
       * no storage or provider work. Pending updates and composed operations
       * retain the last applied value until their successor is committed.
       */
      const currentResource = (stack: string, key: ResourceKey) => {
        const states = Option.getOrElse(
          HashMap.get(Ref.getUnsafe(working), stack),
          () => [],
        );

        const resource: Option.Option<ResourceNode> = Arr.findFirst(
          resourcesFromStates(states),
          (node) => node.key.logicalId === key.logicalId,
        );

        return resource;
      };

      /**
       * The loadSnapshot service method gives plan validation the complete
       * retry records and the applied values from the same state read. An
       * unfinished operation contributes its last applied instance so the
       * requested configuration remains eligible for execution.
       */
      const loadSnapshot = Effect.fn("ResourceStateStore.loadSnapshot")(
        function* (stack: string) {
          const states = yield* loadResourceStates(stack);

          const resources: ReadonlyArray<ResourceNode> =
            resourcesFromStates(states);

          const snapshot: ResourceStateSnapshot = { states, resources };

          return snapshot;
        },
      );

      /**
       * The loadResources service method gives request resolution the last
       * applied instances, including their restored protected outputs. Pending
       * creation intent becomes available only after creation has completed
       * and any preceding instance has been released by the composed operation.
       */
      const loadResources = Effect.fn("ResourceStateStore.loadResources")(
        function* (stack: string) {
          const snapshot = yield* loadSnapshot(stack);

          const resources: ReadonlyArray<ResourceNode> = snapshot.resources;

          return resources;
        },
      );

      const persistResourceStates = Effect.fn(
        "ResourceStateStore.persistResourceStates",
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
        yield* Ref.update(working, HashMap.set(stack, resources));
      });

      /**
       * The saveResourceStates service method replaces all records for a stack
       * and updates output reads before it releases the state-store permit.
       * Secret storage must succeed before the state document is written.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Semaphore.ts (withPermits)
       */
      const saveResourceStates = Effect.fn(
        "ResourceStateStore.saveResourceStates",
      )(persistResourceStates, changes.withPermits(1));

      /**
       * The saveResources service method requires the final owned collection
       * from a completed stack operation. Omitted nodes release their saved
       * records, so callers must retain every instance still needed for recovery.
       * Existing Updated statuses remain intact. The shared write permit
       * protects the complete state replacement from concurrent lost updates.
       */
      const saveResources = Effect.fn("ResourceStateStore.saveResources")(
        function* (stack: string, resources: ReadonlyArray<ResourceNode>) {
          const states = yield* restoreResourceStates(stack);

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

          yield* persistResourceStates(stack, resourceStates);
        },
        changes.withPermits(1),
      );

      /**
       * The markResourceStarted service method identifies work by resource
       * generation. Starting the same creation again preserves any provider
       * identity already recorded for that generation. A replacement keeps
       * the previous generation available for teardown.
       */
      const markResourceStarted = Effect.fn(
        "ResourceStateStore.markResourceStarted",
      )(function* (stack: string, action: ResourceOperation) {
        const states = yield* restoreResourceStates(stack);

        const startedAt = yield* DateTime.now.pipe(
          Effect.map(DateTime.formatIso),
        );

        const resourceState: ResourceState = Match.value(action).pipe(
          Match.tag("Create", ({ node }) =>
            Arr.findFirst(
              states,
              (state) =>
                state._tag === "Creating" &&
                state.submitted === true &&
                resourceInstanceKey(state.node) === resourceInstanceKey(node),
            ).pipe(
              Option.getOrElse(() =>
                ResourceStateSchema.make({ _tag: "Creating", node, startedAt }),
              ),
            ),
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
              resourceInstanceKey(state.node) !==
              resourceInstanceKey(resourceState.node),
          ),
          resourceState,
        );

        yield* persistResourceStates(stack, resourceStates);
      }, changes.withPermits(1));

      /**
       * The recordResourceCreation service method requires an active creation
       * for the supplied generation. The saved identity is available to
       * teardown, and dependent resources must wait for confirmation before
       * they can use the outputs.
       *
       * @see ../../../node_modules/effect/src/Semaphore.ts (withPermits)
       */
      const recordResourceCreation = Effect.fn(
        "ResourceStateStore.recordResourceCreation",
      )(function* (stack: string, node: ResourceNode) {
        const states = yield* restoreResourceStates(stack);
        const active = yield* Arr.findFirst(
          states,
          (state): state is Extract<ResourceState, { _tag: "Creating" }> =>
            state._tag === "Creating" &&
            resourceInstanceKey(state.node) === resourceInstanceKey(node),
        ).pipe(Effect.fromOption);

        yield* persistResourceStates(
          stack,
          Arr.map(states, (state) =>
            Match.value(state === active).pipe(
              Match.when(true, () =>
                ResourceStateSchema.make({ ...active, node, submitted: true }),
              ),
              Match.orElse(() => state),
            ),
          ),
        );
      }, changes.withPermits(1));

      /**
       * The markResourceApplied service method requires a validated node and
       * its completed operation status. Its saved result belongs to that node's
       * generation, leaving progress for other instances available to retries.
       * Deleted results remain until the containing operation commits.
       */
      const markResourceApplied = Effect.fn(
        "ResourceStateStore.markResourceApplied",
      )(function* (
        stack: string,
        node: ResourceNode,
        stateTag: "Created" | "Updated" | "Deleted",
      ) {
        const states = yield* restoreResourceStates(stack);

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
            (state) =>
              resourceInstanceKey(state.node) !== resourceInstanceKey(node),
          ),
          resourceState,
        );

        yield* persistResourceStates(stack, resourceStates);
      }, changes.withPermits(1));

      /**
       * The deleteResourceState service method requires provider removal to
       * have succeeded before rollback releases the saved instance. Its exact
       * generation identifies the record to release, preserving other instances
       * that the stack still owns.
       */
      const deleteResourceState = Effect.fn(
        "ResourceStateStore.deleteResourceState",
      )(function* (stack: string, node: ResourceNode) {
        const states = yield* restoreResourceStates(stack);

        const resources: ReadonlyArray<ResourceState> = Arr.filter(
          states,
          (state) =>
            resourceInstanceKey(state.node) !== resourceInstanceKey(node),
        );

        yield* persistResourceStates(stack, resources);
      }, changes.withPermits(1));

      /**
       * The completeResourceActions service method requires every operation for
       * the logical resource to have succeeded. It releases saved removal
       * results so application output access advances to the remaining applied
       * instance.
       */
      const completeResourceActions = Effect.fn(
        "ResourceStateStore.completeResourceActions",
      )(function* (stack: string, key: ResourceKey) {
        const states = yield* restoreResourceStates(stack);

        const retained = Arr.filter(
          states,
          Predicate.not(
            Predicate.Struct({
              _tag: Equal.equals("Deleted"),
              node: Predicate.Struct({
                key: Predicate.Struct({
                  logicalId: Equal.equals(key.logicalId),
                }),
              }),
            }),
          ),
        );

        yield* persistResourceStates(stack, retained);
      }, changes.withPermits(1));

      /**
       * The markResourceFailure service method records a failure only against
       * an active operation for the supplied instance. Completed records and
       * other generations keep their existing results, allowing retries to
       * identify the unfinished work.
       */
      const markResourceFailure = Effect.fn(
        "ResourceStateStore.markResourceFailure",
      )(function* (
        stack: string,
        node: ResourceNode,
        cause: ResourceCommandFailure,
      ) {
        const states = yield* restoreResourceStates(stack);

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
                () =>
                  resourceInstanceKey(state.node) !== resourceInstanceKey(node),
                () => state,
              ),
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

        yield* persistResourceStates(stack, resourceStates);
      }, changes.withPermits(1));

      /**
       * The resourcesFromGraph service method preserves the supplied graph
       * snapshot's node values and dependency order. Planning and final state
       * publication can therefore use values from the same captured declaration.
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
        currentResource,
        ownedResources,
        readSavedStates,
        loadResourceStates,
        loadSnapshot,
        loadResources,
        saveResourceStates,
        saveResources,
        markResourceStarted,
        recordResourceCreation,
        markResourceApplied,
        deleteResourceState,
        completeResourceActions,
        markResourceFailure,
        resourcesFromGraph,
      };
    }),
  },
) {}

/**
 * The resourceStateStoreBaseLayer Layer requires the application's storage and
 * secret services so lifecycle mutations and output access share the configured
 * persistence.
 */
export const resourceStateStoreBaseLayer = Layer.effect(
  ResourceStateStore,
  ResourceStateStore.make,
);

export const resourceStateFileStorageLayer =
  KeyValueStore.layerFileSystem("./.nomoss/state");
