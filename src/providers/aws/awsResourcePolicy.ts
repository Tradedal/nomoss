import { Context, Data, Effect, Match } from "effect";

import type { ResourceCommand } from "../../core/lifecycle.js";
import type { ResourceNode } from "../../core/model.js";
import { BucketNotificationResourcePolicy } from "./awsBucketNotificationResourcePolicy.js";
import { BucketResourcePolicy } from "./awsBucketResourcePolicy.js";
import { QueuePolicyResourcePolicy } from "./awsQueuePolicyResourcePolicy.js";
import { QueueResourcePolicy } from "./awsQueueResourcePolicy.js";

export class AwsResourceKindUnsupported extends Data.TaggedError(
  "AwsResourceKindUnsupported",
)<{
  readonly node: ResourceNode;
}> {}

/**
 * Resource-kind selection stays explicit here before graph commands reach the
 * assigned AWS policy.
 */
export class AwsResourcePolicy extends Context.Service<AwsResourcePolicy>()(
  "nomoss/providers/aws/awsResourcePolicy",
  {
    make: Effect.gen(function* () {
      const bucket = yield* BucketResourcePolicy;
      const queue = yield* QueueResourcePolicy;
      const queuePolicy = yield* QueuePolicyResourcePolicy;
      const bucketNotification = yield* BucketNotificationResourcePolicy;

      return {
        execute: Effect.fn("AwsResourcePolicy.execute")(function* (
          command: ResourceCommand,
        ) {
          const node = Match.value(command).pipe(
            Match.when({ _tag: "Apply" }, ({ decision }) => decision.node),
            Match.orElse(({ node }) => node),
          );

          return yield* Match.value(node.schema).pipe(
            Match.when(
              {
                provider: "aws",
                service: "s3",
                resource: "bucket",
                operation: "create",
              },
              () => bucket.execute(command),
            ),
            Match.when(
              {
                provider: "aws",
                service: "sqs",
                resource: "queue",
                operation: "create",
              },
              () => queue.execute(command),
            ),
            Match.when(
              {
                provider: "aws",
                service: "sqs",
                resource: "queue-policy",
                operation: "create",
              },
              () => queuePolicy.execute(command),
            ),
            Match.when(
              {
                provider: "aws",
                service: "s3",
                resource: "bucket-notification",
                operation: "create",
              },
              () => bucketNotification.execute(command),
            ),
            Match.orElse(() =>
              Effect.fail(new AwsResourceKindUnsupported({ node })),
            ),
          );
        }),
      };
    }),
  },
) {}
