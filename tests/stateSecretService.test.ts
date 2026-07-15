import { randomUUID } from "node:crypto";

import { ConfigProvider, Effect, FileSystem, Layer, Schema } from "effect";

import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, describe, it } from "@effect/vitest";
import { ChildProcess } from "effect/unstable/process";

import { ResourceNodeSchema } from "../src/core/model.js";
import { ConfiguredStateSecretServiceLayer } from "../src/core/stateSecretService.js";
import {
  EnvironmentStateFileSchema,
  ResourceStateSchema,
  ResourceStateStore,
} from "../src/core/stateStore.js";

const keychainConfigLayer = ConfigProvider.layer(
  ConfigProvider.fromUnknown({
    NOMOSS_STATE_SECRET_STORE: "macos-keychain",
  }),
);
const stateSecretServiceLayer = ConfiguredStateSecretServiceLayer.pipe(
  Layer.provide(Layer.merge(NodeServices.layer, keychainConfigLayer)),
);
const stateStoreLayer = Layer.effect(
  ResourceStateStore,
  ResourceStateStore.make,
).pipe(
  Layer.provideMerge(
    Layer.merge(NodeFileSystem.layer, stateSecretServiceLayer),
  ),
);

describe("StateSecretService", () => {
  it.effect(
    "keeps a Stripe signing secret outside the state file and restores it for lifecycle processing",
    () =>
      Effect.gen(function* () {
        const stateStore = yield* ResourceStateStore;
        const fs = yield* FileSystem.FileSystem;
        const testId = yield* Effect.sync(randomUUID);
        const stack = `state-secret-service-test-${testId}`;
        const key = `${stack}/BillingWebhookEndpoint/WebhookSigningSecret`;
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

        yield* stateStore.saveResources(stack, [webhook]);
        yield* Effect.gen(function* () {
          const persisted = yield* Schema.decodeUnknownEffect(
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
            (yield* fs.readFileString(stateFile)).includes(signingSecret),
            false,
          );
          assert.deepStrictEqual(restoredResource.outputs, {
            WebhookEndpointId: "we_test",
            WebhookSigningSecret: signingSecret,
          });
        }).pipe(
          Effect.ensuring(
            Effect.gen(function* () {
              yield* fs.remove(stateFile);
              const process = yield* ChildProcess.make("security", [
                "delete-generic-password",
                "-a",
                key,
                "-s",
                "com.nomoss.state",
              ]);
              yield* process.exitCode;
            }).pipe(
              Effect.scoped,
              Effect.provide(NodeServices.layer),
              Effect.ignore,
            ),
          ),
        );
      }).pipe(Effect.provide(stateStoreLayer)),
  );
});
