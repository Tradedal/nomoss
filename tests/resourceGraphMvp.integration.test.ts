import { randomUUID } from "node:crypto";
import * as s3 from "@distilled.cloud/aws/s3";
import * as sqs from "@distilled.cloud/aws/sqs";
import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, describe, it } from "@effect/vitest";
import {
  Config,
  ConfigProvider,
  Data,
  Effect,
  Layer,
  Option,
  Schema,
} from "effect";

import {
  physicalNameStoreLayer as corePhysicalNameStoreLayer,
  resourceStateStoreLayer as coreResourceStateStoreLayer,
  resourceGraphStoreLayer,
  resourcePlannerLayer,
} from "../src/core/runtimeLayer.js";
import { NomossTracingLive } from "../src/core/tracing.js";
import {
  AwsProviderRuntime,
  awsResourcesLayerLive,
} from "../src/providers/aws/awsProviderLayer.js";
import {
  awsStackLifecycleLayerLive,
  stackCatalogLayerLive,
  stackWorkflowRendererLayerLive,
} from "../src/providers/aws/awsRuntimeLayer.js";
import { uploadEventsTarget } from "../src/providers/aws/constants.js";
import type { StackName } from "../src/providers/aws/sampleStack.js";
import {
  applyLiveStack,
  destroyStack,
  stackResourceString,
} from "../src/providers/aws/stackWorkflow.js";

class IntegrationMessageMissing extends Data.TaggedError(
  "IntegrationMessageMissing",
)<{
  readonly key: string;
}> {}

const stackName: StackName = "upload-events";
const integrationConfigLayer = ConfigProvider.layer(ConfigProvider.fromEnv());

const physicalNameStoreLayer = Layer.provide(
  corePhysicalNameStoreLayer,
  NodeFileSystem.layer,
);
const resourceStateStoreLayer = Layer.provide(
  coreResourceStateStoreLayer,
  NodeFileSystem.layer,
);
const awsResourcesLayer = awsResourcesLayerLive.pipe(
  Layer.provideMerge(resourceGraphStoreLayer),
  Layer.provideMerge(physicalNameStoreLayer),
);
const awsProviderRuntimeLayer = Layer.effect(
  AwsProviderRuntime,
  AwsProviderRuntime.make,
);
const appLayer = awsStackLifecycleLayerLive.pipe(
  Layer.provideMerge(awsResourcesLayer),
  Layer.provideMerge(resourceStateStoreLayer),
  Layer.provideMerge(stackCatalogLayerLive),
  Layer.provideMerge(stackWorkflowRendererLayerLive),
  Layer.provideMerge(resourcePlannerLayer),
  Layer.provideMerge(awsProviderRuntimeLayer),
  Layer.provideMerge(NodeServices.layer),
  Layer.provideMerge(integrationConfigLayer),
  Layer.provideMerge(Layer.provide(NomossTracingLive, integrationConfigLayer)),
);

const bodyContaining = (messages: ReadonlyArray<sqs.Message>, key: string) =>
  messages
    .flatMap((message) => Option.toArray(Option.fromUndefinedOr(message.Body)))
    .find((body) => body.includes(key));

describe("ResourceGraph MVP AWS integration", () => {
  it.live(
    "creates stack, uploads a file, receives SQS notification, and destroys stack",
    () =>
      Effect.gen(function* () {
        const profile = yield* Config.string("NOMOSS_AWS_INTEGRATION_PROFILE");
        const providerRuntime = yield* AwsProviderRuntime;

        const awsLayer = providerRuntime.runtimeLayerSsoRegion(
          profile,
          uploadEventsTarget.region,
        );

        yield* applyLiveStack({ profile, stackName });
        yield* Effect.logInfo("created stack");

        const bucket = yield* stackResourceString({
          stackName,
          logicalId: "Uploads",
          section: "outputs",
          field: "Bucket",
        });
        const queueName = yield* stackResourceString({
          stackName,
          logicalId: "UploadEvents",
          section: "props",
          field: "QueueName",
        });
        const queue = yield* sqs
          .getQueueUrl({ QueueName: queueName })
          .pipe(Effect.provide(awsLayer));
        const queueUrl = yield* Schema.decodeUnknownEffect(Schema.String)(
          queue.QueueUrl,
        );

        const stale = yield* sqs
          .receiveMessage({
            QueueUrl: queueUrl,
            WaitTimeSeconds: 1,
            MaxNumberOfMessages: 10,
          })
          .pipe(Effect.provide(awsLayer));
        yield* Effect.forEach(
          stale.Messages ?? [],
          (message) =>
            Option.match(Option.fromUndefinedOr(message.ReceiptHandle), {
              onNone: () => Effect.void,
              onSome: (ReceiptHandle) =>
                sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle }),
            }),
          { discard: true },
        ).pipe(Effect.provide(awsLayer));

        const uuid = yield* Effect.sync(randomUUID);
        const key = `integration-${uuid}.txt`;

        yield* s3
          .putObject({
            Bucket: bucket,
            Key: key,
            Body: "hello from nomoss integration\n",
            ContentType: "text/plain",
          })
          .pipe(Effect.provide(awsLayer));

        const notification = yield* sqs
          .receiveMessage({
            QueueUrl: queueUrl,
            WaitTimeSeconds: 20,
            MaxNumberOfMessages: 10,
            AttributeNames: ["All"],
            MessageAttributeNames: ["All"],
          })
          .pipe(
            Effect.tap(({ Messages = [] }) =>
              Effect.forEach(
                Messages,
                (message) =>
                  Option.match(Option.fromUndefinedOr(message.ReceiptHandle), {
                    onNone: () => Effect.void,
                    onSome: (ReceiptHandle) =>
                      sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle }),
                  }),
                { discard: true },
              ),
            ),
            Effect.provide(awsLayer),
            Effect.map(({ Messages = [] }) => bodyContaining(Messages, key)),
            Effect.flatMap((body) =>
              Option.match(Option.fromUndefinedOr(body), {
                onNone: () =>
                  Effect.fail(new IntegrationMessageMissing({ key })),
                onSome: Effect.succeed,
              }),
            ),
          );

        assert.ok(notification.includes(key));
        yield* Effect.logInfo("received message");

        yield* destroyStack({ profile, stackName });
        yield* Effect.logInfo("destroyed stack");
      }).pipe(Effect.provide(appLayer)),
    60_000,
  );
});
