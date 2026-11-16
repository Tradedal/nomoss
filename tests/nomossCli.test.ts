import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Array as Arr, ConfigProvider, Effect, Layer, Option } from "effect";
import { Command } from "effect/cli";
import { TestConsole } from "effect/testing";
import { queueStackCommand } from "../examples/queue/runtime.js";
import { nomossCliCommand } from "../src/cli.js";
import { ResourceStackDefinition } from "../src/core/stack/resourceStackDefinition.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import {
  AwsClientConfig,
  AwsRegion,
  awsClientConfigLayer,
} from "../src/providers/aws/client/awsClientConfig.js";
import { AwsCloudControlFixture } from "./support/awsCloudControlFixture.js";
import { nomossCliApplicationTestLayer } from "./support/nomossCliFixture.js";

layer(
  Layer.merge(
    NodeServices.layer,
    ConfigProvider.layer(
      ConfigProvider.fromUnknown({
        NOMOSS_STATE_SECRET_STORE: "invalid-test-store",
      }),
    ),
  ),
  { buildPerTest: true },
)("Nomoss CLI help", (it) => {
  it.effect(
    "Application help remains available when provider configuration is invalid",
    () => Command.runWith(queueStackCommand, { version: "test" })(["--help"]),
  );
});

layer(nomossCliApplicationTestLayer, { buildPerTest: true })(
  "Nomoss CLI applications",
  (it) => {
    it.effect(
      "The plan command displays the application's resources without contacting AWS",
      () =>
        Effect.gen(function* () {
          yield* Command.runWith(nomossCliCommand, { version: "test" })([
            "diff",
          ]);

          const output = Arr.join(
            Arr.map(yield* TestConsole.logLines, String),
            "\n",
          );
          const fixture = yield* AwsCloudControlFixture;

          assert.include(output, 'Stack "selected-stack"');
          assert.include(output, "SelectedQueue");
          assert.deepStrictEqual(yield* fixture.getRequests(), []);
        }),
    );

    it.effect(
      "The apply command saves the resources shown in the application plan",
      () =>
        Effect.gen(function* () {
          const aws = yield* AwsCloudControlFixture;
          const states = yield* ResourceStateStore;
          const { stackName } = yield* ResourceStackDefinition;

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "cli-create" } }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: "queue-1",
              },
            }),
            Response.json({
              ResourceDescription: {
                Properties:
                  '{"QueueName":"selected-application","QueueUrl":"queue-1"}',
              },
            }),
          ]);

          yield* Command.runWith(nomossCliCommand, { version: "test" })([
            "create",
          ]);

          const saved = yield* states.loadResources(stackName);
          const output = Arr.join(
            Arr.map(yield* TestConsole.logLines, String),
            "\n",
          );

          assert.include(output, `Stack "${stackName}"`);
          assert.include(output, "SelectedQueue creating");
          assert.strictEqual(saved[0].key.logicalId, "SelectedQueue");
          assert.strictEqual(saved[0].cloudControlIdentifier, "queue-1");
        }),
    );
  },
);

layer(
  awsClientConfigLayer.pipe(
    Layer.provide(Layer.succeed(AwsRegion, Option.some("eu-west-1"))),
  ),
  { buildPerTest: true },
)("Nomoss CLI AWS configuration", (it) => {
  it.effect("Application commands use the configured AWS region", () =>
    Effect.gen(function* () {
      const config = yield* AwsClientConfig;

      const resolved = yield* config.resolveConfiguration();

      assert.strictEqual(resolved.Region, "eu-west-1");
    }),
  );
});
