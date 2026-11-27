import { assert, describe, it } from "@effect/vitest";
import { awsClientLayer } from "@tradedal/aws-client-core";
import {
  type GetQueueAttributesResult,
  makeSQSClient,
} from "@tradedal/aws-client-sqs";
import { Effect, Layer, Match, Option, Schedule } from "effect";
import { SecureRandom } from "effect/crypto";
import { FetchHttpClient } from "effect/http";
import { awsIntegrationConfigLayer } from "./support/awsResourceIntegrationFixture.js";

const liveClientLayer = Layer.merge(
  awsClientLayer.pipe(
    Layer.provide(
      Layer.provideMerge(awsIntegrationConfigLayer, FetchHttpClient.layer),
    ),
  ),
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
