import * as Credentials from "@distilled.cloud/aws/Credentials";
import * as Region from "@distilled.cloud/aws/Region";
import type * as S3 from "@distilled.cloud/aws/s3";
import * as s3 from "@distilled.cloud/aws/s3";
import type * as SQS from "@distilled.cloud/aws/sqs";
import * as sqs from "@distilled.cloud/aws/sqs";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Layer,
  Match,
  Record,
} from "effect";

import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

const awsGeneratedOperationLayer = Layer.mergeAll(
  Credentials.fromChain(),
  Region.fromEnv(),
  FetchHttpClient.layer,
);

export type AwsTaggingTarget =
  | {
      readonly _tag: "S3Bucket";
      readonly bucket: string;
    }
  | {
      readonly _tag: "SqsQueue";
      readonly queueUrl: string;
    };

export class AwsTaggingFailed extends Data.TaggedError("AwsTaggingFailed")<{
  readonly cause:
    | S3.DeleteBucketTaggingError
    | S3.PutBucketTaggingError
    | SQS.TagQueueError
    | SQS.UntagQueueError;
}> {}

/**
 * Queue and bucket policies use this adapter to reconcile tags without leaking
 * S3 and SQS request differences into graph-level resource logic.
 */
export class AwsTagging extends Context.Service<AwsTagging>()(
  "nomoss/providers/aws/awsTagging",
  {
    make: Effect.gen(function* () {
      const deleteBucketTagging = yield* s3.deleteBucketTagging;
      const putBucketTagging = yield* s3.putBucketTagging;
      const tagQueue = yield* sqs.tagQueue;
      const untagQueue = yield* sqs.untagQueue;

      type SqsTagOperation =
        | {
            readonly _tag: "Add";
            readonly tags: Record<string, string>;
          }
        | {
            readonly _tag: "Remove";
            readonly tagKeys: ReadonlyArray<string>;
          };

      const sqsTagsToAdd = (
        desiredTags: Record<string, string>,
        observedTags: Record<string, string>,
      ) =>
        Record.filter(desiredTags, (value, key) => observedTags[key] !== value);

      const sqsTagKeysToRemove = (
        desiredTags: Record<string, string>,
        observedTags: Record<string, string>,
      ) =>
        Record.keys(
          Record.filter(
            observedTags,
            (_value, key) => desiredTags[key] === undefined,
          ),
        );

      const sqsTagOperations = (
        desiredTags: Record<string, string>,
        observedTags: Record<string, string>,
      ): ReadonlyArray<SqsTagOperation> =>
        Arr.appendAll(
          Match.value(sqsTagsToAdd(desiredTags, observedTags)).pipe(
            Match.when(Record.isEmptyReadonlyRecord, () => []),
            Match.orElse(
              (tags): ReadonlyArray<SqsTagOperation> => [{ _tag: "Add", tags }],
            ),
          ),
          Match.value(sqsTagKeysToRemove(desiredTags, observedTags)).pipe(
            Match.when(Arr.isReadonlyArrayEmpty, () => []),
            Match.orElse(
              (tagKeys): ReadonlyArray<SqsTagOperation> => [
                { _tag: "Remove", tagKeys },
              ],
            ),
          ),
        );

      const deleteBucketTags = (bucket: string) =>
        deleteBucketTagging({ Bucket: bucket }).pipe(
          Effect.provide(awsGeneratedOperationLayer),
          Effect.mapError((cause) => new AwsTaggingFailed({ cause })),
        );
      const putBucketTags = (
        bucket: string,
        desiredTags: ReadonlyArray<{
          readonly Key: string;
          readonly Value: string;
        }>,
      ) =>
        putBucketTagging({
          Bucket: bucket,
          Tagging: { TagSet: Arr.fromIterable(desiredTags) },
        }).pipe(
          Effect.provide(awsGeneratedOperationLayer),
          Effect.mapError((cause) => new AwsTaggingFailed({ cause })),
        );
      const addQueueTags = (queueUrl: string, tags: Record<string, string>) =>
        tagQueue({ QueueUrl: queueUrl, Tags: tags }).pipe(
          Effect.provide(awsGeneratedOperationLayer),
          Effect.mapError((cause) => new AwsTaggingFailed({ cause })),
        );
      const removeQueueTags = (
        queueUrl: string,
        tagKeys: ReadonlyArray<string>,
      ) =>
        untagQueue({
          QueueUrl: queueUrl,
          TagKeys: Arr.fromIterable(tagKeys),
        }).pipe(
          Effect.provide(awsGeneratedOperationLayer),
          Effect.mapError((cause) => new AwsTaggingFailed({ cause })),
        );
      const applySqsTagOperation = (
        queueUrl: string,
        operation: SqsTagOperation,
      ) =>
        Match.value(operation).pipe(
          Match.tagsExhaustive({
            Add: ({ tags }) => addQueueTags(queueUrl, tags),
            Remove: ({ tagKeys }) => removeQueueTags(queueUrl, tagKeys),
          }),
        );
      const reconcileS3BucketTags = (
        bucket: string,
        desiredTags: Record<string, string>,
      ) =>
        Match.value(
          Arr.map(Record.toEntries(desiredTags), ([Key, Value]) => ({
            Key,
            Value,
          })),
        ).pipe(
          Match.when(Arr.isReadonlyArrayEmpty, () => deleteBucketTags(bucket)),
          Match.orElse((desired) => putBucketTags(bucket, desired)),
        );

      return {
        reconcile: Effect.fn("AwsTagging.reconcile")(function* (input: {
          readonly target: AwsTaggingTarget;
          readonly desiredTags: Record<string, string>;
          readonly observedTags: Record<string, string>;
        }) {
          yield* Match.value(input.target).pipe(
            Match.when({ _tag: "S3Bucket" }, ({ bucket }) =>
              reconcileS3BucketTags(bucket, input.desiredTags),
            ),
            Match.when({ _tag: "SqsQueue" }, ({ queueUrl }) =>
              Effect.forEach(
                sqsTagOperations(input.desiredTags, input.observedTags),
                (operation) => applySqsTagOperation(queueUrl, operation),
                { discard: true },
              ),
            ),
            Match.exhaustive,
          );
        }),
      };
    }).pipe(Effect.provide(awsGeneratedOperationLayer)),
  },
) {}
