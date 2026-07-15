import type * as S3 from "@distilled.cloud/aws/s3";
import * as s3 from "@distilled.cloud/aws/s3";
import { Array as Arr, Context, Data, Effect, Option, Schema } from "effect";

import { annotateResourceSchema } from "../../core/model.js";

export const BucketPropsSchema = annotateResourceSchema(
  Schema.Struct({
    ACL: Schema.optional(s3.BucketCannedACL),
    Bucket: Schema.String,
    CreateBucketConfiguration: Schema.optional(s3.CreateBucketConfiguration),
    GrantFullControl: Schema.optional(Schema.String),
    GrantRead: Schema.optional(Schema.String),
    GrantReadACP: Schema.optional(Schema.String),
    GrantWrite: Schema.optional(Schema.String),
    GrantWriteACP: Schema.optional(Schema.String),
    ObjectLockEnabledForBucket: Schema.optional(Schema.Boolean),
    ObjectOwnership: Schema.optional(s3.ObjectOwnership),
    BucketNamespace: Schema.optional(s3.BucketNamespace),
    ForceDestroy: Schema.optional(Schema.Boolean),
  }),
  {
    provider: "aws",
    service: "s3",
    resource: "bucket",
    operation: "create",
    stateSecretOutputKeys: [],
  },
);

export type BucketProps = Schema.Schema.Type<typeof BucketPropsSchema>;

export const BucketOutputsSchema = Schema.Struct({
  Bucket: Schema.String,
  BucketArn: Schema.String,
  Location: Schema.String,
});

export const BucketObservedStateSchema = annotateResourceSchema(
  Schema.Struct({
    head: s3.HeadBucketOutput,
    tagging: Schema.optional(s3.GetBucketTaggingOutput),
  }),
  {
    provider: "aws",
    service: "s3",
    resource: "bucket",
    operation: "read",
    stateSecretOutputKeys: [],
  },
);

export type BucketState = {
  readonly bucketName: string;
  readonly bucketArn: `arn:aws:s3:::${string}`;
  readonly region: S3.BucketLocationConstraint | "us-east-1";
};

export type BucketOutputs = Schema.Schema.Type<typeof BucketOutputsSchema>;

export type BucketObservedState = Schema.Schema.Type<
  typeof BucketObservedStateSchema
>;

export class BucketCreateFailed extends Data.TaggedError("BucketCreateFailed")<{
  readonly cause: S3.CreateBucketError;
}> {}

export class BucketReadFailed extends Data.TaggedError("BucketReadFailed")<{
  readonly cause: S3.HeadBucketError | S3.GetBucketTaggingError;
}> {}

export class BucketDeleteFailed extends Data.TaggedError("BucketDeleteFailed")<{
  readonly cause: S3.DeleteBucketError;
}> {}

export class BucketEmptyFailed extends Data.TaggedError("BucketEmptyFailed")<{
  readonly cause:
    | S3.DeleteObjectsError
    | S3.ListObjectsV2Error
    | S3.ListObjectVersionsError;
}> {}

export type BucketError =
  | BucketCreateFailed
  | BucketReadFailed
  | BucketDeleteFailed
  | BucketEmptyFailed;

export function bucketOutputsFromState(state: BucketState): BucketOutputs {
  const bucketOutputs: BucketOutputs = {
    Bucket: state.bucketName,
    BucketArn: state.bucketArn,
    Location: `/${state.bucketName}`,
  };

  return bucketOutputs;
}

export function bucketOutputsFromProps(props: BucketProps): BucketOutputs {
  const bucketOutputs: BucketOutputs = {
    Bucket: props.Bucket,
    BucketArn: `arn:aws:s3:::${props.Bucket}`,
    Location: `/${props.Bucket}`,
  };

  return bucketOutputs;
}

export const createBucketRequest = (
  props: BucketProps,
): S3.CreateBucketRequest => ({
  ACL: props.ACL,
  Bucket: props.Bucket,
  CreateBucketConfiguration: props.CreateBucketConfiguration,
  GrantFullControl: props.GrantFullControl,
  GrantRead: props.GrantRead,
  GrantReadACP: props.GrantReadACP,
  GrantWrite: props.GrantWrite,
  GrantWriteACP: props.GrantWriteACP,
  ObjectLockEnabledForBucket: props.ObjectLockEnabledForBucket,
  ObjectOwnership: props.ObjectOwnership,
  BucketNamespace: props.BucketNamespace,
});

/**
 * Bucket policies use this adapter so force-destroy cleanup and AWS error
 * translation stay outside graph-level resource logic.
 */
export class BucketLifecycleService extends Context.Service<BucketLifecycleService>()(
  "nomoss/providers/aws/awsBucket/BucketLifecycleService",
  {
    make: Effect.gen(function* () {
      const createBucket = yield* s3.createBucket;
      const headBucket = yield* s3.headBucket;
      const getBucketTagging = yield* s3.getBucketTagging;
      const deleteBucket = yield* s3.deleteBucket;
      const listObjectsV2 = yield* s3.listObjectsV2;
      const listObjectVersions = yield* s3.listObjectVersions;
      const deleteObjects = yield* s3.deleteObjects;

      const bucketRegionFromProps = (
        props: BucketProps,
      ): S3.BucketLocationConstraint | "us-east-1" =>
        Option.fromUndefinedOr(props.CreateBucketConfiguration).pipe(
          Option.flatMap((configuration) =>
            Option.fromUndefinedOr(configuration.LocationConstraint),
          ),
          Option.getOrElse(() => "us-east-1"),
        );
      const bucketStateFromProps = (props: BucketProps): BucketState => ({
        bucketName: props.Bucket,
        bucketArn: `arn:aws:s3:::${props.Bucket}`,
        region: bucketRegionFromProps(props),
      });
      const bucketForceDestroyEnabled = (props: BucketProps) =>
        props.ForceDestroy === true;
      const objectIdentifiersFromList = (
        objects: ReadonlyArray<{ readonly Key?: string }>,
      ) =>
        Arr.flatMap(objects, (object) =>
          Option.fromUndefinedOr(object.Key).pipe(
            Option.match({
              onNone: () => [] as Array<S3.ObjectIdentifier>,
              onSome: (key) => [{ Key: key }],
            }),
          ),
        );
      const versionIdentifiersFromList = (
        objects: ReadonlyArray<{
          readonly Key?: string;
          readonly VersionId?: string;
        }>,
      ) =>
        Arr.flatMap(objects, (object) =>
          Option.fromUndefinedOr(object.Key).pipe(
            Option.match({
              onNone: () => [] as Array<S3.ObjectIdentifier>,
              onSome: (key) => [
                {
                  Key: key,
                  VersionId: object.VersionId,
                },
              ],
            }),
          ),
        );
      const bucketObservedState = (
        head: S3.HeadBucketOutput,
        tagging: Option.Option<S3.GetBucketTaggingOutput>,
      ): BucketObservedState =>
        BucketObservedStateSchema.make(
          Option.match(tagging, {
            onNone: () => ({ head }),
            onSome: (tagOutput) => ({ head, tagging: tagOutput }),
          }),
        );
      const emptyListObjectsV2Output: S3.ListObjectsV2Output = {
        Contents: [],
      };
      const emptyListObjectVersionsOutput: S3.ListObjectVersionsOutput = {
        Versions: [],
        DeleteMarkers: [],
      };
      return {
        create: Effect.fn("BucketLifecycleService.create")(function* (
          props: BucketProps,
        ) {
          yield* createBucket(createBucketRequest(props)).pipe(
            Effect.mapError((cause) => new BucketCreateFailed({ cause })),
          );

          return bucketStateFromProps(props);
        }),
        read: Effect.fn("BucketLifecycleService.read")(function* (
          props: BucketProps,
        ) {
          const head = yield* headBucket({ Bucket: props.Bucket }).pipe(
            Effect.map(Option.some),
            Effect.catchTags({
              NoSuchBucket: () =>
                Effect.succeed(Option.none<S3.HeadBucketOutput>()),
              NotFound: () =>
                Effect.succeed(Option.none<S3.HeadBucketOutput>()),
            }),
            Effect.mapError((cause) => new BucketReadFailed({ cause })),
          );

          return yield* Option.match(head, {
            onNone: () => Effect.succeed(Option.none<BucketObservedState>()),
            onSome: (headOutput) =>
              getBucketTagging({
                Bucket: props.Bucket,
              }).pipe(
                Effect.map(Option.some),
                Effect.catchTag("NoSuchTagSet", () =>
                  Effect.succeed(Option.none<S3.GetBucketTaggingOutput>()),
                ),
                Effect.mapError((cause) => new BucketReadFailed({ cause })),
                Effect.map((tagging) =>
                  Option.some(bucketObservedState(headOutput, tagging)),
                ),
              ),
          });
        }),
        destroy: Effect.fn("BucketLifecycleService.destroy")(function* (
          props: BucketProps,
        ) {
          const deleteBucketObjects = Effect.fn(
            "BucketLifecycleService.destroy/deleteBucketObjects",
          )(function* (
            bucket: string,
            objects: ReadonlyArray<S3.ObjectIdentifier>,
          ) {
            const deleteEffect = deleteObjects({
              Bucket: bucket,
              Delete: {
                Objects: Arr.fromIterable(objects),
              },
            }).pipe(
              Effect.mapError((cause) => new BucketEmptyFailed({ cause })),
            );
            const shouldDelete = Effect.succeed(objects.length > 0);

            yield* Effect.when(deleteEffect, shouldDelete);

            return objects.length > 0;
          });
          const emptyBucketCurrentObjects = Effect.fn(
            "BucketLifecycleService.destroy/emptyBucketCurrentObjects",
          )(function* (bucket: string) {
            const listed = yield* listObjectsV2({ Bucket: bucket }).pipe(
              Effect.catchTag("NoSuchBucket", () =>
                Effect.succeed(emptyListObjectsV2Output),
              ),
              Effect.mapError((cause) => new BucketEmptyFailed({ cause })),
            );
            const objects = objectIdentifiersFromList(listed.Contents ?? []);

            return yield* deleteBucketObjects(bucket, objects);
          });
          const emptyBucketVersions = Effect.fn(
            "BucketLifecycleService.destroy/emptyBucketVersions",
          )(function* (bucket: string) {
            const listed = yield* listObjectVersions({ Bucket: bucket }).pipe(
              Effect.catchTag("NoSuchBucket", () =>
                Effect.succeed(emptyListObjectVersionsOutput),
              ),
              Effect.mapError((cause) => new BucketEmptyFailed({ cause })),
            );
            const objects = versionIdentifiersFromList(
              Arr.appendAll(listed.Versions ?? [], listed.DeleteMarkers ?? []),
            );

            return yield* deleteBucketObjects(bucket, objects);
          });

          const cleanup = emptyBucketVersions(props.Bucket).pipe(
            Effect.repeat({ while: (deletedObjects) => deletedObjects }),
            Effect.andThen(
              emptyBucketCurrentObjects(props.Bucket).pipe(
                Effect.repeat({ while: (deletedObjects) => deletedObjects }),
              ),
            ),
          );
          const shouldCleanup = Effect.succeed(
            bucketForceDestroyEnabled(props),
          );

          yield* Effect.when(cleanup, shouldCleanup);

          yield* deleteBucket({ Bucket: props.Bucket }).pipe(
            Effect.catchTag("NoSuchBucket", () => Effect.void),
            Effect.mapError((cause) => new BucketDeleteFailed({ cause })),
          );
        }),
      };
    }),
  },
) {}
