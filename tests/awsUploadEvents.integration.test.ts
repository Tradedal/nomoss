import { assert, describe, it } from "@effect/vitest";
import {
  Array as Arr,
  Data,
  Effect,
  FileSystem,
  Match,
  Ref,
  Schedule,
  String as Str,
} from "effect";
import { SecureRandom } from "effect/crypto";

import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceStackLifecycle } from "../src/core/stack/resourceStackLifecycle.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import { AwsCloudControlResourceLifecycle } from "../src/providers/aws/awsCloudControlResourceLifecycle.js";
import { AwsRegion } from "../src/providers/aws/client/awsClientConfig.js";
import { registerBucket } from "../src/providers/aws/resources/generated/s3/bucket/index.js";
import { registerQueue } from "../src/providers/aws/resources/generated/sqs/queue/index.js";
import {
  type QueueInlinePolicyProps,
  registerQueueInlinePolicy,
} from "../src/providers/aws/resources/generated/sqs/queueinlinepolicy/index.js";
import {
  AwsIntegrationCli,
  awsUploadEventsIntegrationLayer,
} from "./support/awsIntegrationCli.js";

class IntegrationNotificationMissing extends Data.TaggedError(
  "IntegrationNotificationMissing",
)<{ readonly key: string }> {}

/**
 * notificationPolicy limits S3 delivery permission to this test's bucket and
 * queue. Its caller supplies the ARN obtained during the initial resource
 * creation before it declares the delivery policy.
 */
const notificationPolicy = (queueArn: string, bucketArn: string) => {
  const policy: QueueInlinePolicyProps["PolicyDocument"] = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AllowUploadNotifications",
        Effect: "Allow",
        Principal: { Service: "s3.amazonaws.com" },
        Action: "sqs:SendMessage",
        Resource: queueArn,
        Condition: { ArnEquals: { "aws:SourceArn": bucketArn } },
      },
    ],
  };

  return policy;
};

describe("AWS upload event delivery", () => {
  it.live(
    "An uploaded object reaches the linked SQS queue and the stack is cleaned up",
    () =>
      Effect.gen(function* () {
        const cli = yield* AwsIntegrationCli;
        const graph = yield* ResourceGraphStore;
        const lifecycle = yield* ResourceStackLifecycle;
        const aws = yield* AwsCloudControlResourceLifecycle;
        const stateStore = yield* ResourceStateStore;
        const fs = yield* FileSystem.FileSystem;
        const random = yield* SecureRandom.SecureRandom;

        const region = yield* AwsRegion.pipe(Effect.flatMap(Effect.fromOption));

        yield* cli.run(
          ["sts", "get-caller-identity", "--query", "Account"],
          region,
        );

        const id = yield* random.uuidV4();
        const stackName = `upload-events-integration-${id}`;

        yield* Effect.annotateCurrentSpan({
          "nomoss.stack.name": stackName,
          "aws.region": region,
        });

        const bucketName = `nomoss-upload-events-${id}`;
        const queueName = `nomoss-upload-events-${id}`;
        const objectKey = `integration-${id}.txt`;
        const artifactDirectory = `.cache/nomoss/integration/${id}`;
        const payloadPath = `${artifactDirectory}/object.txt`;

        const uploaded = yield* Ref.make(false);
        const cleanupRequired = yield* Ref.make(true);

        yield* fs.makeDirectory(artifactDirectory, { recursive: true });

        yield* fs.writeFileString(
          payloadPath,
          "Nomoss live S3 to SQS integration\n",
        );

        const queue = yield* registerQueue({
          key: { logicalId: "UploadEvents" },
          props: { QueueName: queueName },
        });

        const bucket = yield* registerBucket({
          key: { logicalId: "Uploads" },
          props: { BucketName: bucketName },
        });

        const initial = yield* lifecycle.prepare(stackName);

        const cleanupStack = yield* Ref.make(initial);

        /**
         * destroy removes the uploaded object before stack teardown because S3
         * cannot delete a nonempty bucket. The latest prepared graph remains
         * available to failure cleanup after each integration apply pass.
         */
        const destroy = Effect.fn("UploadEventsIntegration.destroy")(
          function* () {
            yield* cli
              .run(
                [
                  "s3api",
                  "delete-object",
                  "--bucket",
                  bucketName,
                  "--key",
                  objectKey,
                ],
                region,
              )
              .pipe(Effect.when(Ref.get(uploaded)));

            yield* Ref.set(uploaded, false);

            const prepared = yield* Ref.get(cleanupStack);

            yield* lifecycle.destroy(prepared);

            assert.deepStrictEqual(
              yield* stateStore.loadResourceStates(stackName),
              [],
            );

            yield* Ref.set(cleanupRequired, false);

            yield* Effect.logInfo("Destroyed live integration resources", {
              stackName,
            });
          },
        );

        yield* Effect.acquireRelease(Effect.void, () =>
          destroy().pipe(Effect.when(Ref.get(cleanupRequired)), Effect.orDie),
        );

        yield* lifecycle.apply(initial);

        const queueUrl: string = queue.outputs.QueueUrl;
        const queueArn: string = queue.outputs.Arn;
        const bucketArn: string = bucket.outputs.Arn;

        yield* Effect.logInfo("Created live S3 bucket and SQS queue", {
          stackName,
        });

        yield* graph.reset;

        const policyQueue = yield* registerQueue({
          key: queue.key,
          props: { QueueName: queueName },
        });

        yield* registerBucket({
          key: bucket.key,
          props: { BucketName: bucketName },
        });

        const policy = yield* registerQueueInlinePolicy({
          key: { logicalId: "UploadEventsPolicy" },
          props: {
            Queue: queueUrl,
            PolicyDocument: notificationPolicy(queueArn, bucketArn),
          },
        });

        yield* graph.addDependency(policyQueue.key, policy.key, {
          kind: "prerequisite",
          reason: "The delivery policy requires its SQS queue",
        });

        /**
         * S3 validates destination permissions when notifications are enabled.
         * This separate apply completes queue authorization before the later
         * plan can add the bucket's notification configuration.
         */
        const permitted = yield* lifecycle.prepare(stackName);

        yield* Ref.set(cleanupStack, permitted);

        yield* lifecycle.apply(permitted);

        yield* graph.reset;

        const configuredQueue = yield* registerQueue({
          key: queue.key,
          props: { QueueName: queueName },
        });

        const configuredPolicy = yield* registerQueueInlinePolicy({
          key: policy.key,
          props: {
            Queue: queueUrl,
            PolicyDocument: notificationPolicy(queueArn, bucketArn),
          },
        });

        yield* registerBucket({
          key: bucket.key,
          props: {
            BucketName: bucketName,
            NotificationConfiguration: {
              QueueConfigurations: [
                { Event: "s3:ObjectCreated:*", Queue: queueArn },
              ],
            },
          },
        });

        yield* graph.addDependency(configuredQueue.key, configuredPolicy.key, {
          kind: "prerequisite",
          reason: "The delivery policy requires its SQS queue",
        });

        yield* graph.addDependency(configuredQueue.key, bucket.key, {
          kind: "property",
          property: [
            "NotificationConfiguration",
            "QueueConfigurations",
            "0",
            "Queue",
          ],
          sourceProperty: "Arn",
        });

        yield* graph.addDependency(policy.key, bucket.key, {
          kind: "prerequisite",
          reason: "S3 validates SQS permission before enabling notifications",
        });

        const linked = yield* lifecycle.prepare(stackName);

        yield* Ref.set(cleanupStack, linked);

        yield* lifecycle.apply(linked);

        const observed = yield* lifecycle.reconcile(linked);

        assert.deepStrictEqual(observed.missing, []);

        assert.strictEqual(queue.outputs.QueueUrl, queueUrl);

        yield* cli.run(
          [
            "s3api",
            "put-object",
            "--bucket",
            bucketName,
            "--key",
            objectKey,
            "--body",
            payloadPath,
            "--content-type",
            "text/plain",
          ],
          region,
        );

        yield* Ref.set(uploaded, true);

        const notification: string = yield* cli
          .run(
            [
              "sqs",
              "receive-message",
              "--queue-url",
              queueUrl,
              "--wait-time-seconds",
              "20",
              "--max-number-of-messages",
              "10",
              "--query",
              "Messages[].Body",
            ],
            region,
          )
          .pipe(
            Effect.filterOrFail(
              (body) => Str.includes(objectKey)(body),
              () => new IntegrationNotificationMissing({ key: objectKey }),
            ),
            Effect.retry({
              times: 5,
              while: (failure) =>
                failure._tag === "IntegrationNotificationMissing",
              schedule: Schedule.spaced("1 second"),
            }),
          );

        assert.include(notification, objectKey);

        yield* Effect.logInfo(
          "Received the uploaded object's SQS notification",
          { stackName },
        );

        yield* destroy();

        const removed = yield* Effect.forEach(
          Arr.filter(
            observed.resources,
            (node) => node.key.logicalId !== policy.key.logicalId,
          ),
          (node) => aws.readResource(node),
        );

        assert.sameMembers(
          Arr.map(removed, (result) =>
            Match.value(result.observation).pipe(
              Match.tag("Missing", ({ node }) => node.key.logicalId),
              Match.orElse(() =>
                assert.fail("The integration resource still exists in AWS"),
              ),
            ),
          ),
          ["UploadEvents", "Uploads"],
        );

        yield* fs.remove(`.nomoss/state/${stackName}.json`);

        yield* fs.remove(artifactDirectory, { recursive: true });
      }).pipe(
        Effect.scoped,
        Effect.withSpan("UploadEventsIntegration.run"),
        Effect.provide(awsUploadEventsIntegrationLayer),
      ),
    600_000,
  );
});
