import { NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import { Effect, Layer, Match, Option, Schedule, Schema } from "effect";
import { SecureRandom } from "effect/crypto";
import { KeyValueStore } from "effect/persistence";
import { awsNativeStackLayerLive } from "nomoss/providers/aws";
import { awsClientLayerLive } from "nomoss/providers/aws/client";
import {
  type GetQueueAttributesResult,
  makeSQSClient,
} from "nomoss/providers/aws/client/sqs";
import { AWSQueue, type AWSQueueProps } from "nomoss/providers/aws/sqs/queue";
import { ResourceModel } from "../src/core/resource/model.js";
import {
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "../src/core/stack/resourceStackOperations.js";
import { StateSecretServiceDefaultLayer } from "../src/core/state/stateSecretService.js";
import {
  ResourceStateStore,
  resourceStateFileStorageLayer,
} from "../src/core/state/stateStore.js";

const liveClientLayer = Layer.merge(
  awsClientLayerLive,
  SecureRandom.layerWebCrypto,
);

/**
 * SQS can take 60 seconds to propagate an attribute change. The helper waits
 * for the requested visibility timeout before the scenario asserts the queue's
 * applied values, and leaves time for request latency within its deadline.
 */
const waitForVisibilityTimeout = Effect.fn(
  "SqsIntegration.waitForVisibilityTimeout",
)(function* (queueUrl: string, seconds: number) {
  const client = yield* makeSQSClient;

  const observed: GetQueueAttributesResult = yield* client
    .getQueueAttributes({
      QueueUrl: queueUrl,
      AttributeNames: ["QueueArn", "VisibilityTimeout"],
    })
    .pipe(
      Effect.repeat({
        while: (response) =>
          response.Attributes?.VisibilityTimeout !== String(seconds),
        schedule: Schedule.spaced("1 second"),
      }),
      Effect.timeout("75 seconds"),
    );

  return observed;
});

/**
 * QueueDoesNotExist confirms provider removal. Other service rejections and
 * transport failures propagate because the scenario still needs evidence
 * that deletion completed.
 */
const waitForQueueRemoval = Effect.fn("SqsIntegration.waitForQueueRemoval")(
  function* (queueUrl: string) {
    const client = yield* makeSQSClient;

    const observed: Option.Option<GetQueueAttributesResult> = yield* client
      .getQueueAttributes({ QueueUrl: queueUrl, AttributeNames: ["QueueArn"] })
      .pipe(
        Effect.asSome,
        Effect.catchTag("AwsServiceError", (failure) =>
          Match.value(failure.code).pipe(
            Match.when("QueueDoesNotExist", () => Effect.succeedNone),
            Match.orElse(() => Effect.fail(failure)),
          ),
        ),
        Effect.repeat({
          while: Option.isSome,
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("75 seconds"),
      );

    return observed;
  },
);

describe("Generated native SQS operations", () => {
  it.live(
    "A generated client creates a queue, changes its visibility timeout, and confirms its removal",
    () =>
      Effect.gen(function* () {
        const client = yield* makeSQSClient;
        const random = yield* SecureRandom.SecureRandom;
        const id = yield* random.uuidV4();
        const queueName = `nomoss-generated-${id}`;

        yield* Effect.logInfo("Validating generated SQS operations", {
          queueName,
        });

        /**
         * The queue name is reserved before creation so cleanup can recover
         * its URL if response decoding fails after SQS creates the object.
         */
        yield* Effect.addFinalizer(() =>
          client.getQueueUrl({ QueueName: queueName }).pipe(
            Effect.flatMap((response) =>
              Option.fromUndefinedOr(response.QueueUrl).pipe(Effect.fromOption),
            ),
            Effect.flatMap((QueueUrl) => client.deleteQueue({ QueueUrl })),
            Effect.catchTag("AwsServiceError", (failure) =>
              Match.value(failure.code).pipe(
                Match.when("QueueDoesNotExist", () => Effect.void),
                Match.orElse(() => Effect.fail(failure)),
              ),
            ),
            Effect.orDie,
          ),
        );

        const created = yield* client.createQueue({
          QueueName: queueName,
          Attributes: { VisibilityTimeout: "30" },
        });
        const queueUrl = yield* Option.fromUndefinedOr(created.QueueUrl).pipe(
          Effect.fromOption,
        );
        const initial = yield* waitForVisibilityTimeout(queueUrl, 30);
        const located = yield* client.getQueueUrl({ QueueName: queueName });

        assert.strictEqual(initial.Attributes?.VisibilityTimeout, "30");
        assert.strictEqual(located.QueueUrl, queueUrl);
        assert.isTrue(initial.Attributes?.QueueArn?.endsWith(`:${queueName}`));

        yield* client.setQueueAttributes({
          QueueUrl: queueUrl,
          Attributes: { VisibilityTimeout: "45" },
        });

        const updated = yield* waitForVisibilityTimeout(queueUrl, 45);

        assert.strictEqual(updated.Attributes?.VisibilityTimeout, "45");
        assert.strictEqual(
          updated.Attributes?.QueueArn,
          initial.Attributes?.QueueArn,
        );

        yield* client.deleteQueue({ QueueUrl: queueUrl });

        const removed = yield* waitForQueueRemoval(queueUrl);

        assert.isTrue(Option.isNone(removed));
      }).pipe(Effect.scoped, Effect.provide(liveClientLayer)),
    180_000,
  );
});

/**
 * The managedQueueStack helper prepares a live application's desired queue
 * and output callback. An absent declaration makes the next apply remove the
 * saved resource through the stack's ordinary deletion plan.
 */
const managedQueueStack = Effect.fn(
  "SqsApplicationIntegration.managedQueueStack",
)(function* (stackName: string, props: AWSQueueProps | undefined) {
  const operations = yield* ResourceStackOperations;
  return yield* operations.Stack(
    stackName,
    Effect.gen(function* () {
      const resources = yield* Effect.forEach(
        Option.toArray(Option.fromUndefinedOr(props)),
        (props) => AWSQueue({ logicalId: "Events", props }),
      );

      return () =>
        resources.map((queue) => ({
          queueUrl: queue.QueueUrl,
          queueArn: queue.Arn,
        }));
    }),
  );
});

describe("Native SQS application lifecycle", () => {
  it.live(
    "A declared queue keeps its URL through observation, setting and tag changes, restores an omitted default, and is removed through declaration changes and explicit teardown",
    () =>
      Effect.gen(function* () {
        const operations = yield* ResourceStackOperations;
        const state = yield* ResourceStateStore;
        const model = yield* ResourceModel;
        const storage = yield* KeyValueStore.KeyValueStore;
        const client = yield* makeSQSClient;
        const random = yield* SecureRandom.SecureRandom;
        const id = yield* random.uuidV4();
        const stackName = `native-sqs-${id}`;
        const queueName = `nomoss-native-${id}`;
        const teardownName = `nomoss-teardown-${id}`;
        const initial = yield* managedQueueStack(stackName, {
          QueueName: queueName,
          VisibilityTimeout: 30,
          Tags: [
            { Key: "stage", Value: "created" },
            { Key: "obsolete", Value: "remove" },
          ],
        });

        // The application scenario reserves both queue names before creation so
        // cleanup can recover an object whose creation response could not be decoded.
        // Stack teardown independently exercises deletion through saved ownership.
        const cleanup = Effect.fn("SqsApplicationIntegration.cleanup")(() =>
          Effect.forEach([queueName, teardownName], (QueueName) =>
            client.getQueueUrl({ QueueName }).pipe(
              Effect.flatMap((response) =>
                Option.fromUndefinedOr(response.QueueUrl).pipe(
                  Effect.fromOption,
                ),
              ),
              Effect.flatMap((QueueUrl) =>
                client
                  .deleteQueue({ QueueUrl })
                  .pipe(Effect.andThen(waitForQueueRemoval(QueueUrl))),
              ),
              Effect.catchTag("AwsServiceError", (failure) =>
                Match.value(failure.code).pipe(
                  Match.when("QueueDoesNotExist", () => Effect.succeedNone),
                  Match.orElse(() => Effect.fail(failure)),
                ),
              ),
            ),
          ).pipe(
            Effect.andThen(storage.remove(`${stackName}.json`)),
            Effect.orDie,
          ),
        );
        yield* Effect.addFinalizer(() =>
          operations
            .destroy(initial)
            .pipe(Effect.ensuring(cleanup()), Effect.orDie),
        );

        const created = yield* operations.apply(initial);
        const identity = created.outputs[0];
        const actual = yield* client.getQueueAttributes({
          QueueUrl: identity.queueUrl,
          AttributeNames: ["QueueArn", "VisibilityTimeout"],
        });
        assert.strictEqual(actual.Attributes?.QueueArn, identity.queueArn);
        assert.strictEqual(actual.Attributes?.VisibilityTimeout, "30");
        const saved = yield* state.loadResources(stackName);
        assert.strictEqual(
          yield* model.decodeOutput(saved[0], "QueueUrl", Schema.String),
          identity.queueUrl,
        );
        assert.strictEqual(
          yield* model.decodeOutput(
            saved[0],
            "VisibilityTimeout",
            Schema.Number,
          ),
          30,
        );

        const observed = yield* operations.reconcile(initial);
        assert.deepStrictEqual(observed.missing, []);
        assert.strictEqual(
          yield* model.decodeOutput(
            observed.resources[0],
            "Arn",
            Schema.String,
          ),
          identity.queueArn,
        );

        const changed = yield* managedQueueStack(stackName, {
          QueueName: queueName,
          VisibilityTimeout: 45,
          Tags: [{ Key: "stage", Value: "updated" }],
        });
        const updated = yield* operations.apply(changed);
        assert.deepStrictEqual(updated.outputs, created.outputs);
        const changedAttributes = yield* client.getQueueAttributes({
          QueueUrl: identity.queueUrl,
          AttributeNames: ["VisibilityTimeout"],
        });
        assert.strictEqual(
          changedAttributes.Attributes?.VisibilityTimeout,
          "45",
        );
        const changedTags = yield* client.listQueueTags({
          QueueUrl: identity.queueUrl,
        });
        assert.deepStrictEqual(changedTags.Tags, { stage: "updated" });
        const changedState = yield* state.loadResources(stackName);
        assert.strictEqual(
          yield* model.decodeOutput(
            changedState[0],
            "VisibilityTimeout",
            Schema.Number,
          ),
          45,
        );

        const defaults = yield* managedQueueStack(stackName, {
          QueueName: queueName,
          Tags: [{ Key: "stage", Value: "updated" }],
        });
        const reset = yield* operations.apply(defaults);
        assert.deepStrictEqual(reset.outputs, created.outputs);
        const resetAttributes = yield* client.getQueueAttributes({
          QueueUrl: identity.queueUrl,
          AttributeNames: ["VisibilityTimeout"],
        });
        assert.strictEqual(resetAttributes.Attributes?.VisibilityTimeout, "30");
        const resetState = yield* state.loadResources(stackName);
        assert.strictEqual(
          yield* model.decodeOutput(
            resetState[0],
            "VisibilityTimeout",
            Schema.Number,
          ),
          30,
        );

        const empty = yield* managedQueueStack(stackName, undefined);
        yield* operations.apply(empty);
        assert.isTrue(
          Option.isNone(yield* waitForQueueRemoval(identity.queueUrl)),
        );
        assert.deepStrictEqual(yield* state.loadResources(stackName), []);

        const teardown = yield* managedQueueStack(stackName, {
          QueueName: teardownName,
          VisibilityTimeout: 30,
        });
        const recreated = yield* operations.apply(teardown);
        yield* operations.destroy(teardown);
        assert.isTrue(
          Option.isNone(
            yield* waitForQueueRemoval(recreated.outputs[0].queueUrl),
          ),
        );
        assert.deepStrictEqual(yield* state.loadResources(stackName), []);
      }).pipe(
        Effect.scoped,
        Effect.provide(
          resourceStackOperationsLayer.pipe(
            Layer.provideMerge(awsNativeStackLayerLive),
            Layer.provide(StateSecretServiceDefaultLayer),
            Layer.provideMerge(resourceStateFileStorageLayer),
            Layer.provideMerge(NodeServices.layer),
            Layer.provideMerge(SecureRandom.layerWebCrypto),
          ),
        ),
      ),
    240_000,
  );
});
