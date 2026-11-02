import {
  Array as Arr,
  Config,
  Context,
  Data,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Schema,
  Stream,
} from "effect";

import { ChildProcess, ChildProcessSpawner } from "effect/process";

import type { ResourceNode } from "../resource/model.js";
import { type ResourceState, ResourceStateSchema } from "./resourceState.js";

/**
 * StateSecretReference identifies a Keychain value in a saved resource record.
 * Lifecycle callers receive the restored value in memory, allowing later
 * provider updates without storing the raw secret in the state document.
 */
export const StateSecretReferenceSchema = Schema.TaggedStruct(
  "NomossStateSecretRef",
  {
    key: Schema.NonEmptyString,
    store: Schema.Literal("macos-keychain"),
  },
);

export type StateSecretReference = Schema.Schema.Type<
  typeof StateSecretReferenceSchema
>;

const ResourceOutputRecordSchema = Schema.Record(Schema.String, Schema.Json);

type StateSecretOutputUpdate = {
  readonly output: Schema.Json;
  readonly outputKey: string;
};

enum MacOSKeychainServiceName {
  NomossState = "com.nomoss.state",
}

/**
 * StateSecretService preserves annotated resource outputs across state writes
 * and reads. Stripe webhook updates depend on the signing secret returned only
 * at creation. The Keychain implementation keeps that value externally and
 * restores it for later use through the reference saved in resource state.
 */
export class StateSecretService extends Context.Service<StateSecretService>()(
  "nomoss/core/state/stateSecretService",
  {
    make: Effect.gen(function* () {
      const childProcessSpawner =
        yield* ChildProcessSpawner.ChildProcessSpawner;

      const persistStateSecrets = Effect.fn(
        "StateSecretService.persistStateSecrets",
      )(function* (
        stack: string,
        resourceStates: ReadonlyArray<ResourceState>,
      ) {
        const persisted: ReadonlyArray<ResourceState> = yield* Effect.forEach(
          resourceStates,
          (resourceState) =>
            persistResourceStateSecrets(stack, resourceState).pipe(
              Effect.provideService(
                ChildProcessSpawner.ChildProcessSpawner,
                childProcessSpawner,
              ),
            ),
        );

        return persisted;
      });

      const restoreStateSecrets = Effect.fn(
        "StateSecretService.restoreStateSecrets",
      )(function* (resourceStates: ReadonlyArray<ResourceState>) {
        const restored: ReadonlyArray<ResourceState> = yield* Effect.forEach(
          resourceStates,
          (resourceState) =>
            restoreResourceStateSecrets(resourceState).pipe(
              Effect.provideService(
                ChildProcessSpawner.ChildProcessSpawner,
                childProcessSpawner,
              ),
            ),
        );

        return restored;
      });

      return { persistStateSecrets, restoreStateSecrets };
    }),
  },
) {}

/**
 * StateSecretServiceError identifies the secret and storage operation that
 * failed. State loading or saving fails with it so a provider update cannot
 * silently proceed after losing a required secret.
 */
export class StateSecretServiceError extends Data.TaggedError(
  "StateSecretServiceError",
)<{
  readonly key: string;
  readonly operation: "persist" | "restore" | "read" | "write";
  readonly cause: unknown;
}> {}

const stateSecretReferenceFor = (
  stack: string,
  node: ResourceNode,
  outputKey: string,
): StateSecretReference =>
  StateSecretReferenceSchema.make({
    _tag: "NomossStateSecretRef",
    key: `${stack}/${node.key.logicalId}/${outputKey}`,
    store: "macos-keychain",
  });

/**
 * executeSecurity runs a Keychain command in the caller's process scope.
 * Process completion and stdout consumption run together so buffered output
 * cannot block completion. Nonzero exit status produces a typed storage error.
 */
const executeSecurity = Effect.fn("StateSecretService.executeSecurity")(
  function* (
    args: ReadonlyArray<string>,
    key: string,
    operation: "read" | "write",
  ) {
    const process = yield* ChildProcess.make("security", args).pipe(
      Effect.mapError(
        (cause) =>
          new StateSecretServiceError({
            key,
            operation,
            cause,
          }),
      ),
    );

    const [exitCode, stdout] = yield* Effect.all(
      [
        process.exitCode.pipe(
          Effect.mapError(
            (cause) =>
              new StateSecretServiceError({
                key,
                operation,
                cause,
              }),
          ),
        ),
        process.stdout.pipe(
          Stream.decodeText(),
          Stream.runFold(
            () => "",
            (output, chunk) => `${output}${chunk}`,
          ),
          Effect.mapError(
            (cause) =>
              new StateSecretServiceError({
                key,
                operation,
                cause,
              }),
          ),
        ),
      ],
      { concurrency: 2 },
    );

    return yield* Effect.succeed(stdout).pipe(
      Effect.filterOrFail(
        () => exitCode === 0,
        () =>
          new StateSecretServiceError({
            key,
            operation,
            cause: { exitCode },
          }),
      ),
    );
  },
);

const writeMacOSKeychainSecret = (
  reference: StateSecretReference,
  value: string,
) =>
  executeSecurity(
    [
      "add-generic-password",
      "-U",
      "-a",
      reference.key,
      "-s",
      MacOSKeychainServiceName.NomossState,
      "-w",
      value,
    ],
    reference.key,
    "write",
  ).pipe(Effect.scoped, Effect.asVoid);

const readMacOSKeychainSecret = Effect.fn(
  "StateSecretService.readMacOSKeychainSecret",
)(function* (reference: StateSecretReference) {
  const secret = yield* executeSecurity(
    [
      "find-generic-password",
      "-a",
      reference.key,
      "-s",
      MacOSKeychainServiceName.NomossState,
      "-w",
    ],
    reference.key,
    "read",
  ).pipe(Effect.scoped);

  return secret.replace(/\n$/, "");
});

/**
 * persistStateSecretOutput replaces an annotated output with its Keychain
 * reference for persistence. Existing references remain intact; a raw string
 * must be stored in Keychain before its reference can replace it in state.
 */
const persistStateSecretOutput = Effect.fn(
  "StateSecretService.persistStateSecretOutput",
)(function* (
  stack: string,
  node: ResourceNode,
  outputKey: string,
  output: Schema.Json,
) {
  const reference = Schema.decodeUnknownOption(StateSecretReferenceSchema)(
    output,
  );

  return yield* Option.match(reference, {
    onNone: () =>
      Effect.gen(function* () {
        const secret = yield* Schema.decodeUnknownEffect(Schema.String)(
          output,
        ).pipe(
          Effect.mapError(
            (cause) =>
              new StateSecretServiceError({
                key: `${node.key.logicalId}/${outputKey}`,
                operation: "persist",
                cause,
              }),
          ),
        );

        const persistedReference = stateSecretReferenceFor(
          stack,
          node,
          outputKey,
        );

        yield* writeMacOSKeychainSecret(persistedReference, secret);

        return Option.some<StateSecretOutputUpdate>({
          output: persistedReference,
          outputKey,
        });
      }),
    onSome: () =>
      Effect.succeedSome<StateSecretOutputUpdate>({ output, outputKey }),
  });
});

/**
 * restoreStateSecretOutput returns an annotated output for provider use.
 * References require successful Keychain reads; raw strings in older state
 * remain usable without a lookup. Invalid values fail hydration.
 */
const restoreStateSecretOutput = Effect.fn(
  "StateSecretService.restoreStateSecretOutput",
)(function* (node: ResourceNode, outputKey: string, output: Schema.Json) {
  const reference = Schema.decodeUnknownOption(StateSecretReferenceSchema)(
    output,
  );

  const restoredOutput = yield* Option.match(reference, {
    onNone: () =>
      Schema.decodeUnknownEffect(Schema.String)(output).pipe(
        Effect.mapError(
          (cause) =>
            new StateSecretServiceError({
              key: `${node.key.logicalId}/${outputKey}`,
              operation: "restore",
              cause,
            }),
        ),
      ),
    onSome: readMacOSKeychainSecret,
  });

  return Option.some<StateSecretOutputUpdate>({
    output: restoredOutput,
    outputKey,
  });
});

/**
 * persistResourceNodeSecrets replaces annotated secret outputs with references
 * in the node prepared for storage. Missing optional outputs remain absent,
 * and unannotated values remain part of the resource document.
 */
const persistResourceNodeSecrets = Effect.fn(
  "StateSecretService.persistResourceNodeSecrets",
)(function* (stack: string, node: ResourceNode) {
  const outputs = yield* Schema.decodeUnknownEffect(ResourceOutputRecordSchema)(
    node.outputs,
  ).pipe(
    Effect.mapError(
      (cause) =>
        new StateSecretServiceError({
          key: node.key.logicalId,
          operation: "persist",
          cause,
        }),
    ),
  );

  const outputUpdates = yield* Effect.forEach(
    node.schema.stateSecretOutputKeys,
    (outputKey) =>
      Option.fromUndefinedOr(outputs[outputKey]).pipe(
        Option.match({
          onNone: () => Effect.succeed(Option.none<StateSecretOutputUpdate>()),
          onSome: (output) =>
            persistStateSecretOutput(stack, node, outputKey, output),
        }),
      ),
  );

  const persistedResourceNode: ResourceNode = {
    ...node,
    outputs: Arr.reduce(
      outputUpdates,
      outputs,
      (currentOutputs, outputUpdate) =>
        Option.match(outputUpdate, {
          onNone: () => currentOutputs,
          onSome: ({ output, outputKey }) =>
            Record.set(currentOutputs, outputKey, output),
        }),
    ),
  };

  return persistedResourceNode;
});

/**
 * restoreResourceNodeSecrets restores a saved node's annotated secret outputs
 * for lifecycle operations. A failed secret read fails hydration so consumers
 * cannot mistake an incomplete output document for usable provider state.
 */
const restoreResourceNodeSecrets = Effect.fn(
  "StateSecretService.restoreResourceNodeSecrets",
)(function* (node: ResourceNode) {
  const outputs = yield* Schema.decodeUnknownEffect(ResourceOutputRecordSchema)(
    node.outputs,
  ).pipe(
    Effect.mapError(
      (cause) =>
        new StateSecretServiceError({
          key: node.key.logicalId,
          operation: "restore",
          cause,
        }),
    ),
  );

  const outputUpdates = yield* Effect.forEach(
    node.schema.stateSecretOutputKeys,
    (outputKey) =>
      Option.fromUndefinedOr(outputs[outputKey]).pipe(
        Option.match({
          onNone: () => Effect.succeed(Option.none<StateSecretOutputUpdate>()),
          onSome: (output) => restoreStateSecretOutput(node, outputKey, output),
        }),
      ),
  );

  const restoredResourceNode: ResourceNode = {
    ...node,
    outputs: Arr.reduce(
      outputUpdates,
      outputs,
      (currentOutputs, outputUpdate) =>
        Option.match(outputUpdate, {
          onNone: () => currentOutputs,
          onSome: ({ output, outputKey }) =>
            Record.set(currentOutputs, outputKey, output),
        }),
    ),
  };

  return restoredResourceNode;
});

/**
 * persistResourceStateSecrets prepares resource values for storage without
 * changing their lifecycle phase.
 * Updating records contain desired and previous nodes, both of which may carry
 * a secret that must survive an interrupted update.
 */
const persistResourceStateSecrets = (
  stack: string,
  resourceState: ResourceState,
) =>
  Match.value(resourceState).pipe(
    Match.when({ _tag: "Updating" }, (updating) =>
      Effect.zipWith(
        persistResourceNodeSecrets(stack, updating.node),
        persistResourceNodeSecrets(stack, updating.previous),
        (node, previous) =>
          ResourceStateSchema.make({
            _tag: "Updating",
            startedAt: updating.startedAt,
            lastFailure: updating.lastFailure,
            node,
            previous,
          }),
      ),
    ),
    Match.when({ _tag: "Creating" }, (creating) =>
      Effect.map(persistResourceNodeSecrets(stack, creating.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Creating",
          startedAt: creating.startedAt,
          lastFailure: creating.lastFailure,
          node,
        }),
      ),
    ),
    Match.when({ _tag: "Created" }, (created) =>
      Effect.map(persistResourceNodeSecrets(stack, created.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Created",
          completedAt: created.completedAt,
          node,
        }),
      ),
    ),
    Match.when({ _tag: "Updated" }, (updated) =>
      Effect.map(persistResourceNodeSecrets(stack, updated.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Updated",
          completedAt: updated.completedAt,
          node,
        }),
      ),
    ),
    Match.when({ _tag: "Deleting" }, (deleting) =>
      Effect.map(persistResourceNodeSecrets(stack, deleting.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Deleting",
          startedAt: deleting.startedAt,
          lastFailure: deleting.lastFailure,
          node,
        }),
      ),
    ),
    Match.exhaustive,
  );

/**
 * restoreResourceStateSecrets restores secrets without changing saved status,
 * timestamps, or failure. Both nodes of an unfinished update must be usable by
 * consumers comparing requested values with the previous provider state.
 */
const restoreResourceStateSecrets = (resourceState: ResourceState) =>
  Match.value(resourceState).pipe(
    Match.when({ _tag: "Updating" }, (updating) =>
      Effect.zipWith(
        restoreResourceNodeSecrets(updating.node),
        restoreResourceNodeSecrets(updating.previous),
        (node, previous) =>
          ResourceStateSchema.make({
            _tag: "Updating",
            startedAt: updating.startedAt,
            lastFailure: updating.lastFailure,
            node,
            previous,
          }),
      ),
    ),
    Match.when({ _tag: "Creating" }, (creating) =>
      Effect.map(restoreResourceNodeSecrets(creating.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Creating",
          startedAt: creating.startedAt,
          lastFailure: creating.lastFailure,
          node,
        }),
      ),
    ),
    Match.when({ _tag: "Created" }, (created) =>
      Effect.map(restoreResourceNodeSecrets(created.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Created",
          completedAt: created.completedAt,
          node,
        }),
      ),
    ),
    Match.when({ _tag: "Updated" }, (updated) =>
      Effect.map(restoreResourceNodeSecrets(updated.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Updated",
          completedAt: updated.completedAt,
          node,
        }),
      ),
    ),
    Match.when({ _tag: "Deleting" }, (deleting) =>
      Effect.map(restoreResourceNodeSecrets(deleting.node), (node) =>
        ResourceStateSchema.make({
          _tag: "Deleting",
          startedAt: deleting.startedAt,
          lastFailure: deleting.lastFailure,
          node,
        }),
      ),
    ),
    Match.exhaustive,
  );

/**
 * StateSecretServiceDefaultLayer retains secret outputs in local resource
 * state. Applications selecting external secret storage use the configured
 * Layer to replace this behavior.
 */
export const StateSecretServiceDefaultLayer = Layer.succeed(
  StateSecretService,
  {
    persistStateSecrets: (_stack, resourceStates) =>
      Effect.succeed(resourceStates),
    restoreStateSecrets: (resourceStates) => Effect.succeed(resourceStates),
  },
);

/**
 * ConfiguredStateSecretServiceLayer selects storage through
 * `NOMOSS_STATE_SECRET_STORE`. macos-keychain keeps annotated values in the
 * login Keychain; the default retains them in resource state.
 */
export const ConfiguredStateSecretServiceLayer = Layer.unwrap(
  Effect.gen(function* () {
    const store = yield* Config.Literals(
      ["none", "macos-keychain"],
      "NOMOSS_STATE_SECRET_STORE",
    ).pipe(Config.withDefault("none"));

    return Match.value(store).pipe(
      Match.when("macos-keychain", () => MacOSKeychainStateSecretServiceLayer),
      Match.when("none", () => StateSecretServiceDefaultLayer),
      Match.exhaustive,
    );
  }),
);

/**
 * MacOSKeychainStateSecretServiceLayer stores annotated values in the login
 * Keychain and their references in resource state. Configuration selects this
 * implementation when `NOMOSS_STATE_SECRET_STORE` is macos-keychain.
 */
export const MacOSKeychainStateSecretServiceLayer = Layer.effect(
  StateSecretService,
  StateSecretService.make,
);
