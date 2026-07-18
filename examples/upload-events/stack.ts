import { Effect, Layer, Schema } from "effect";

import {
  type ResourceStack,
  ResourceStackCatalog,
  resourceStackDeclarationResult,
  resourceStackFrom,
} from "../../src/core/resourceStackCatalog.js";
import { AwsResources } from "../../src/providers/aws/awsResources.js";

export const UploadEventsStackNameSchema = Schema.Literal("upload-events");

export const uploadEventsStack = {
  name: "upload-events",
  description: "S3 bucket publishing object-created notifications to SQS",
  region: "us-east-1",
} satisfies ResourceStack;

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
      queuePolicy: queuePolicy.key,
    });
  },
);

/**
 * The upload-events application captures the AWS declaration service in its
 * catalog layer. Nomoss receives only stack metadata and catalog operations;
 * the provider package never imports this application resource program.
 */
export const uploadEventsStackCatalogLayer = Layer.effect(
  ResourceStackCatalog,
  Effect.gen(function* () {
    const aws = yield* AwsResources;

    return ResourceStackCatalog.of({
      defaultStackName: uploadEventsStack.name,
      names: [uploadEventsStack.name],
      get: Effect.fn("UploadEventsStackCatalog.get")((name: string) =>
        resourceStackFrom([uploadEventsStack], name),
      ),
      declare: Effect.fn("UploadEventsStackCatalog.declare")(function* (
        stack: ResourceStack,
      ) {
        const result = yield* Effect.exit(
          declareUploadEvents().pipe(Effect.provideService(AwsResources, aws)),
        );

        return yield* resourceStackDeclarationResult(stack, result);
      }),
    });
  }),
);
