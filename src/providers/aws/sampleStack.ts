import { Context, Data, Effect, Option, Schema } from "effect";

import { Aws } from "./awsResources.js";
import { uploadEventsTarget } from "./constants.js";

export type StackName = "upload-events";

export const StackNameSchema = Schema.Literal("upload-events");

export class StackNotFound extends Data.TaggedError("StackNotFound")<{
  readonly name: string;
}> { }

export const uploadEventsStack = {
  name: "upload-events",
  description: "S3 bucket publishing object-created notifications to SQS",
  region: uploadEventsTarget.region,
  // The stack is just one explicit Effect program that registers resources.
  graph: Effect.gen(function* () {
    const bucket = yield* Aws.Bucket({
      logicalId: "Uploads",
      forceDestroy: true,
    });

    const queue = yield* Aws.Queue({
      logicalId: "UploadEvents",
    });

    // Resource constructors return output refs, so dependencies stay typed.
    const queuePolicy = yield* Aws.QueuePolicy({
      logicalId: "UploadEventsPolicy",
      bucketArn: bucket.BucketArn,
      queueUrl: queue.QueueUrl,
      queueArn: queue.QueueArn,
    });

    yield* Aws.BucketNotification({
      logicalId: "UploadEventsNotification",
      bucketName: bucket.Bucket,
      queueArn: queue.QueueArn,
      queuePolicy: queuePolicy.key,
    });
  }),
};

const stacks: Record<StackName, typeof uploadEventsStack> = {
  "upload-events": uploadEventsStack,
};

export class StackCatalog extends Context.Service<StackCatalog>()(
  "nomoss/providers/aws/sampleStack/StackCatalog",
  {
    make: Effect.succeed({
      names: [uploadEventsStack.name] as const,
      get: (name: StackName) =>
        Option.fromUndefinedOr(stacks[name]).pipe(
          Option.match({
            onNone: () => Effect.fail(new StackNotFound({ name })),
            onSome: Effect.succeed,
          }),
        ),
    }),
  },
) {
}
