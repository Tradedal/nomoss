import { Effect, Layer, Schema } from "effect";

import {
  ResourceStackDefinition,
  resourceStackDeclarationResult,
} from "../../src/core/resourceStackDefinition.js";
import { AwsResources } from "../../src/providers/aws/awsResources.js";

export const UploadEventsStackNameSchema = Schema.Literal("upload-events");

export const uploadEventsStack = {
  name: "upload-events",
  description: "S3 bucket publishing object-created notifications to SQS",
  region: "us-east-1",
} as const;

export const declareUploadEvents = Effect.fn("UploadEventsStack.declare")(
  function* () {
    const aws = yield* AwsResources;

    const bucket = yield* aws.Bucket({
      logicalId: "Uploads",
      forceDestroy: true,
    });

    const queue = yield* aws.Queue({
      logicalId: "UploadEvents",
    });

    const queuePolicy = yield* aws.QueuePolicy({
      logicalId: "UploadEventsPolicy",
      bucketArn: bucket.BucketArn,
      queueUrl: queue.QueueUrl,
      queueArn: queue.QueueArn,
    });

    yield* aws.BucketNotification({
      logicalId: "UploadEventsNotification",
      bucketName: bucket.Bucket,
      queueArn: queue.QueueArn,
      queuePolicy,
    });
  },
);

/**
 * `src/cliRuntimeLayer.ts` provides this layer when it builds the bundled CLI.
 * Preparing `upload-events` runs `declareUploadEvents` and rebuilds the graph
 * whose state is saved under that stack name.
 */
export const uploadEventsStackLayer = Layer.effect(
  ResourceStackDefinition,
  Effect.gen(function* () {
    const aws = yield* AwsResources;

    return {
      stackName: uploadEventsStack.name,
      description: uploadEventsStack.description,
      region: uploadEventsStack.region,
      program: Effect.exit(
        declareUploadEvents().pipe(Effect.provideService(AwsResources, aws)),
      ).pipe(
        Effect.flatMap((result) =>
          resourceStackDeclarationResult(uploadEventsStack.name, result),
        ),
      ),
    };
  }),
);
