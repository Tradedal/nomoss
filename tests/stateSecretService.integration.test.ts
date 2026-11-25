import { NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Layer,
  Schema,
  String as Str,
} from "effect";
import { SecureRandom } from "effect/crypto";
import { ChildProcess } from "effect/process";

import { ResourceNodeSchema } from "../src/core/resource/model.js";
import {
  EnvironmentStateFileSchema,
  ResourceStateSchema,
} from "../src/core/state/resourceState.js";
import {
  MacOSKeychainStateSecretServiceLayer,
  StateSecretService,
} from "../src/core/state/stateSecretService.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import { stateSecretServiceIntegrationTestLayer } from "./support/stateSecretServiceFixture.js";

describe("StateSecretService", () => {
  it.effect(
    "Saving and loading secrets leaves unrelated AWS resource identities unchanged",
    () =>
      Effect.gen(function* () {
        const secrets = yield* StateSecretService;

        const node = ResourceNodeSchema.make({
          key: { logicalId: "Queue" },
          schema: {
            operation: "create",
            provider: "aws",
            resource: "queue",
            service: "sqs",
            stateSecretOutputKeys: [],
          },
          props: {},
          outputs: {},
          cloudControlIdentifier: "managed-queue",
        });

        const state = ResourceStateSchema.make({
          _tag: "Created",
          node,
          completedAt: "2026-01-01T00:00:00.000Z",
        });

        const persisted = yield* secrets.persistStateSecrets("identity", [
          state,
        ]);
        const restored = yield* secrets.restoreStateSecrets(persisted);

        assert.deepStrictEqual(persisted, [state]);
        assert.deepStrictEqual(restored, [state]);
      }).pipe(
        Effect.provide(
          MacOSKeychainStateSecretServiceLayer.pipe(
            Layer.provide(NodeServices.layer),
          ),
        ),
      ),
  );

  it.effect.skipIf(process.platform !== "darwin")(
    "Stripe signing secrets survive reload without appearing in the state file",
    () =>
      Effect.gen(function* () {
        const stateStore = yield* ResourceStateStore;
        const fs = yield* FileSystem.FileSystem;
        const random = yield* SecureRandom.SecureRandom;

        const testId = yield* random.uuidV4();

        const stack = `state-secret-service-test-${testId}`;
        const key = `${stack}/BillingWebhookEndpoint/WebhookSigningSecret`;
        const replacementKey = `${stack}/BillingWebhookEndpoint/instances/1/WebhookSigningSecret`;
        const stateFile = `./.nomoss/state/${stack}.json`;
        const signingSecret = `whsec_test_${testId}`;

        const webhook = yield* ResourceNodeSchema.makeEffect({
          key: { logicalId: "BillingWebhookEndpoint" },
          schema: {
            operation: "create",
            provider: "stripe",
            resource: "webhook-endpoint",
            service: "billing",
            stateSecretOutputKeys: ["WebhookSigningSecret"],
          },
          props: {},
          outputs: {
            WebhookEndpointId: "we_test",
            WebhookSigningSecret: signingSecret,
          },
        });

        yield* Effect.acquireRelease(Effect.void, () =>
          Effect.andThen(fs.remove(stateFile, { force: true }), () =>
            ChildProcess.make("security", [
              "delete-generic-password",
              "-a",
              key,
              "-s",
              "com.nomoss.state",
            ]).pipe(
              Effect.scoped,
              Effect.andThen((process) => process.exitCode),
            ),
          ).pipe(Effect.ignore),
        );

        yield* Effect.acquireRelease(Effect.void, () =>
          ChildProcess.make("security", [
            "delete-generic-password",
            "-a",
            replacementKey,
            "-s",
            "com.nomoss.state",
          ]).pipe(
            Effect.scoped,
            Effect.andThen((process) => process.exitCode),
            Effect.ignore,
          ),
        );

        yield* stateStore.saveResources(stack, [webhook]);

        const persisted = yield* Schema.decodeEffect(
          EnvironmentStateFileSchema,
        )(yield* fs.readFileString(stateFile));

        const resources = yield* stateStore.loadResources(stack);

        const [persistedResource] = yield* Schema.decodeUnknownEffect(
          Schema.Tuple([ResourceStateSchema]),
        )(persisted.resources);

        const [restoredResource] = yield* Schema.decodeUnknownEffect(
          Schema.Tuple([ResourceNodeSchema]),
        )(resources);

        assert.deepStrictEqual(persistedResource.node.outputs, {
          WebhookEndpointId: "we_test",
          WebhookSigningSecret: {
            _tag: "NomossStateSecretRef",
            key,
            store: "macos-keychain",
          },
        });

        assert.strictEqual(
          Str.includes(signingSecret)(yield* fs.readFileString(stateFile)),
          false,
        );

        assert.deepStrictEqual(restoredResource.outputs, {
          WebhookEndpointId: "we_test",
          WebhookSigningSecret: signingSecret,
        });

        const replacementSecret = `whsec_replacement_${testId}`;
        const replacement = {
          ...webhook,
          generation: 1,
          outputs: {
            WebhookEndpointId: "we_replacement",
            WebhookSigningSecret: replacementSecret,
          },
        };

        yield* stateStore.markResourceApplied(stack, replacement, "Created");

        const owned = stateStore.ownedResources(
          yield* stateStore.loadResourceStates(stack),
        );

        assert.sameDeepMembers(
          Arr.map(owned, (node) => node.outputs),
          [webhook.outputs, replacement.outputs],
        );

        const file = yield* fs.readFileString(stateFile);

        assert.strictEqual(Str.includes(signingSecret)(file), false);
        assert.strictEqual(Str.includes(replacementSecret)(file), false);
      }).pipe(Effect.provide(stateSecretServiceIntegrationTestLayer)),
  );
});
