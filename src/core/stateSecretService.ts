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

import { ChildProcess } from "effect/unstable/process";
import { ChildProcessSpawner } from "effect/unstable/process/ChildProcessSpawner";

import { type ResourceNode, ResourceNodeSchema } from "./model.js";
import { type ResourceState, ResourceStateSchema } from "./stateStore.js";

/**
 * The local resource-state file stores this reference after a provider has
 * emitted a value that later provider updates require but must not retain in
 * JSON. `StateSecretService` resolves it before lifecycle code receives the
 * corresponding `ResourceNode`.
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

type ResourceOutputRecord = Schema.Schema.Type<
  typeof ResourceOutputRecordSchema
>;

type StateSecretOutputUpdate = {
  readonly output: Schema.Json;
  readonly outputKey: string;
};

enum MacOSKeychainServiceName {
  NomossState = "com.nomoss.state",
}

/**
 * `ResourceStateStore` invokes this service while loading and saving each
 * lifecycle record. Stripe webhook endpoint updates need the original signing
 * secret even though Stripe does not return it again, so the selected macOS
 * implementation restores it in memory and persists only its Keychain record.
 */
export class StateSecretService extends Context.Service<StateSecretService>()(
  "nomoss/core/stateSecretService",
  {
    make: Effect.gen(function* () {
      const childProcessSpawner = yield* ChildProcessSpawner;

      return {
        persistStateSecrets: Effect.fn(
          "StateSecretService.persistStateSecrets",
        )(function* (
          stack: string,
          resourceStates: ReadonlyArray<ResourceState>,
        ) {
          const persistedResourceStates: ReadonlyArray<ResourceState> =
            yield* Effect.forEach(resourceStates, (resourceState) =>
              persistResourceStateSecrets(stack, resourceState).pipe(
                Effect.provideService(ChildProcessSpawner, childProcessSpawner),
              ),
            );

          return persistedResourceStates;
        }),
        restoreStateSecrets: Effect.fn(
          "StateSecretService.restoreStateSecrets",
        )(function* (resourceStates: ReadonlyArray<ResourceState>) {
          const hydratedResourceStates: ReadonlyArray<ResourceState> =
            yield* Effect.forEach(resourceStates, (resourceState) =>
              restoreResourceStateSecrets(resourceState).pipe(
                Effect.provideService(ChildProcessSpawner, childProcessSpawner),
              ),
            );

          return hydratedResourceStates;
        }),
      };
    }),
  },
) {}

/**
 * A Keychain read or write failed for a state value that Stripe cannot recover
 * from its endpoint API. Failing state handling preserves the signing secret
 * instead of letting a later endpoint update silently drop it.
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

const resourceNodeWithOutputs = (
  node: ResourceNode,
  outputs: ResourceOutputRecord,
) =>
  ResourceNodeSchema.make({
    key: node.key,
    props: node.props,
    schema: node.schema,
    outputs,
  });

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
      Effect.succeed(
        Option.some<StateSecretOutputUpdate>({ output, outputKey }),
      ),
  });
});

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
  const persistedResourceNode: ResourceNode = yield* Effect.forEach(
    node.schema.stateSecretOutputKeys,
    (outputKey) =>
      Option.fromUndefinedOr(outputs[outputKey]).pipe(
        Option.match({
          onNone: () => Effect.succeed(Option.none<StateSecretOutputUpdate>()),
          onSome: (output) =>
            persistStateSecretOutput(stack, node, outputKey, output),
        }),
      ),
  ).pipe(
    Effect.map((outputUpdates) =>
      resourceNodeWithOutputs(
        node,
        Arr.reduce(outputUpdates, outputs, (currentOutputs, outputUpdate) =>
          Option.match(outputUpdate, {
            onNone: () => currentOutputs,
            onSome: ({ output, outputKey }) =>
              Record.set(currentOutputs, outputKey, output),
          }),
        ),
      ),
    ),
  );

  return persistedResourceNode;
});

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
  const restoredResourceNode: ResourceNode = yield* Effect.forEach(
    node.schema.stateSecretOutputKeys,
    (outputKey) =>
      Option.fromUndefinedOr(outputs[outputKey]).pipe(
        Option.match({
          onNone: () => Effect.succeed(Option.none<StateSecretOutputUpdate>()),
          onSome: (output) => restoreStateSecretOutput(node, outputKey, output),
        }),
      ),
  ).pipe(
    Effect.map((outputUpdates) =>
      resourceNodeWithOutputs(
        node,
        Arr.reduce(outputUpdates, outputs, (currentOutputs, outputUpdate) =>
          Option.match(outputUpdate, {
            onNone: () => currentOutputs,
            onSome: ({ output, outputKey }) =>
              Record.set(currentOutputs, outputKey, output),
          }),
        ),
      ),
    ),
  );

  return restoredResourceNode;
});

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
 * General Nomoss runtime composition has no selected external secret store.
 * This service keeps ordinary state files unchanged until a CLI or provider
 * runtime explicitly chooses the macOS Keychain implementation.
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
 * CLI and provider runtime composition reads `NOMOSS_STATE_SECRET_STORE` so
 * local Stripe lifecycle runs can use Keychain records without changing the
 * regular file-state contract for other executions.
 */
export const ConfiguredStateSecretServiceLayer = Layer.unwrap(
  Effect.gen(function* () {
    const store = yield* Config.literals(
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
 * Local Stripe lifecycle runs receive the Keychain implementation only when
 * `NOMOSS_STATE_SECRET_STORE` selects it. The login Keychain retains the
 * signing secret while the resource-state file retains its stable reference.
 */
export const MacOSKeychainStateSecretServiceLayer = Layer.effect(
  StateSecretService,
  StateSecretService.make,
);
