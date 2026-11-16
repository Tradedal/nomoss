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
  String as Str,
  Stream,
} from "effect";

import { ChildProcess, ChildProcessSpawner } from "effect/process";

import { type ResourceNode, resourceGeneration } from "../resource/model.js";
import { type ResourceState, ResourceStateSchema } from "./resourceState.js";

/**
 * The StateSecretReference schema lets saved resource records refer to
 * Keychain values without raw secrets in the state document. Lifecycle callers
 * receive the restored value in memory for later provider updates.
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
 * The StateSecretService service requires protected creation-time outputs to
 * remain usable across later resource operations. A configured external store
 * replaces those values with saved references. Restoration must supply the
 * referenced values before provider work can proceed, including when a read
 * omits a webhook's signing secret.
 */
export class StateSecretService extends Context.Service<StateSecretService>()(
  "nomoss/core/state/stateSecretService",
  {
    make: Effect.gen(function* () {
      const childProcessSpawner =
        yield* ChildProcessSpawner.ChildProcessSpawner;

      /**
       * The persistStateSecrets service method completes required secret writes
       * before returning records for state persistence. Those records preserve
       * lifecycle progress and use references for externally stored outputs.
       * A failure requires the caller to retain its previous state document.
       */
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

      /**
       * The restoreStateSecrets service method requires every external secret
       * reference in the supplied records to be readable. Its successful result
       * preserves lifecycle status and supplies values needed for later provider
       * operations.
       */
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
 * failed. A state read or write fails with it so a provider update cannot
 * silently proceed after a required secret is lost.
 */
export class StateSecretServiceError extends Data.TaggedError(
  "StateSecretServiceError",
)<{
  readonly key: string;
  readonly operation: "persist" | "restore" | "read" | "write";
  readonly cause: unknown;
}> {}

/**
 * The stateSecretReferenceFor helper assigns separate Keychain entries to
 * provider generations so unfinished operations retain each instance's secret.
 * Generation zero preserves the entry names used by existing saved resources,
 * including records without a generation.
 */
const stateSecretReferenceFor = (
  stack: string,
  node: ResourceNode,
  outputKey: string,
): StateSecretReference => {
  const key = Match.value(resourceGeneration(node)).pipe(
    Match.when(0, () => `${stack}/${node.key.logicalId}/${outputKey}`),
    Match.orElse(
      (generation) =>
        `${stack}/${node.key.logicalId}/instances/${generation}/${outputKey}`,
    ),
  );

  return StateSecretReferenceSchema.make({
    _tag: "NomossStateSecretRef",
    key,
    store: "macos-keychain",
  });
};

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

  return Str.replace(/\n$/, "")(secret);
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
 * The persistResourceStateSecrets helper preserves the instance generation and
 * lifecycle status while preparing protected outputs for storage. An unfinished
 * update also preserves its previous node so recovery can still use the last
 * applied provider values.
 */
const persistResourceStateSecrets = (
  stack: string,
  resourceState: ResourceState,
) =>
  Match.value(resourceState).pipe(
    Match.tag("Updating", (updating) =>
      Effect.zipWith(
        persistResourceNodeSecrets(stack, updating.node),
        persistResourceNodeSecrets(stack, updating.previous),
        (node, previous) =>
          ResourceStateSchema.make({
            ...updating,
            node,
            previous,
          }),
      ),
    ),
    Match.orElse((state) =>
      Effect.map(persistResourceNodeSecrets(stack, state.node), (node) =>
        ResourceStateSchema.make({ ...state, node }),
      ),
    ),
  );

/**
 * The restoreResourceStateSecrets helper requires every referenced secret to
 * be readable before the saved operation becomes usable. An unfinished update
 * restores both nodes so callers can compare the requested configuration with
 * the last applied provider values.
 */
const restoreResourceStateSecrets = (resourceState: ResourceState) =>
  Match.value(resourceState).pipe(
    Match.tag("Updating", (updating) =>
      Effect.zipWith(
        restoreResourceNodeSecrets(updating.node),
        restoreResourceNodeSecrets(updating.previous),
        (node, previous) =>
          ResourceStateSchema.make({
            ...updating,
            node,
            previous,
          }),
      ),
    ),
    Match.orElse((state) =>
      Effect.map(restoreResourceNodeSecrets(state.node), (node) =>
        ResourceStateSchema.make({ ...state, node }),
      ),
    ),
  );

/**
 * StateSecretServiceDefaultLayer retains secret outputs in local resource
 * state. Applications that select external secret storage use the configured
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
