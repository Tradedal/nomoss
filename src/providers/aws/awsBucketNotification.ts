import type * as S3 from "@distilled.cloud/aws/s3";
import * as s3 from "@distilled.cloud/aws/s3";
import * as sqs from "@distilled.cloud/aws/sqs";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Equal,
  Match,
  Option,
  Schedule,
  Schema,
} from "effect";

import { annotateResourceSchema } from "../../core/model.js";
import { decodePendingQueueArnPlaceholder } from "./awsQueue.js";

export const BucketNotificationPropsSchema = annotateResourceSchema(
  s3.PutBucketNotificationConfigurationRequest,
  {
    provider: "aws",
    service: "s3",
    resource: "bucket-notification",
    operation: "create",
    stateSecretOutputKeys: [],
  },
);

export type BucketNotificationProps = Schema.Schema.Type<
  typeof BucketNotificationPropsSchema
>;

export const BucketNotificationObservedStateSchema = annotateResourceSchema(
  s3.NotificationConfiguration,
  {
    provider: "aws",
    service: "s3",
    resource: "bucket-notification",
    operation: "read",
    stateSecretOutputKeys: [],
  },
);

export type BucketNotificationObservedState = Schema.Schema.Type<
  typeof BucketNotificationObservedStateSchema
>;

export type BucketNotificationState = {
  readonly bucketName: string;
  readonly queueArn: string;
  readonly events: ReadonlyArray<S3.Event>;
};

export const BucketNotificationOutputsSchema =
  s3.PutBucketNotificationConfigurationResponse;

export type BucketNotificationOutputs = Schema.Schema.Type<
  typeof BucketNotificationOutputsSchema
>;

export class BucketNotificationCreateFailed extends Data.TaggedError(
  "BucketNotificationCreateFailed",
)<{
  readonly cause: S3.PutBucketNotificationConfigurationError;
}> {}

export class BucketNotificationReadFailed extends Data.TaggedError(
  "BucketNotificationReadFailed",
)<{
  readonly cause: S3.GetBucketNotificationConfigurationError;
}> {}

export class BucketNotificationQueueConfigurationMissing extends Data.TaggedError(
  "BucketNotificationQueueConfigurationMissing",
)<{
  readonly bucketName: string;
}> {}

export type BucketNotificationError =
  | BucketNotificationCreateFailed
  | BucketNotificationReadFailed
  | BucketNotificationQueueConfigurationMissing;

const emptyNotificationConfiguration =
  BucketNotificationObservedStateSchema.make({});

export const bucketNotificationsEqual = (
  left: S3.QueueConfiguration | undefined,
  right: S3.QueueConfiguration,
) =>
  Option.fromUndefinedOr(left).pipe(
    Option.match({
      onNone: () => false,
      onSome: (existing) =>
        Equal.equals(existing.Id, right.Id) &&
        Equal.equals(existing.QueueArn, right.QueueArn) &&
        Equal.equals(existing.Events, right.Events),
    }),
  );

/**
 * Notification policies use this adapter to resolve queue refs and change only
 * the graph-managed bucket notification entry.
 */
export class BucketNotificationLifecycleService extends Context.Service<BucketNotificationLifecycleService>()(
  "nomoss/providers/aws/awsBucketNotification/BucketNotificationLifecycleService",
  {
    make: Effect.gen(function* () {
      const queueLookupRetryPolicy = Schedule.recurs(20);
      const getBucketNotificationConfiguration =
        yield* s3.getBucketNotificationConfiguration;
      const putBucketNotificationConfiguration =
        yield* s3.putBucketNotificationConfiguration;
      const getQueueAttributes = yield* sqs.getQueueAttributes;
      const getQueueUrl = yield* sqs.getQueueUrl;

      const firstQueueConfiguration = (props: BucketNotificationProps) =>
        Option.fromUndefinedOr(
          props.NotificationConfiguration.QueueConfigurations,
        ).pipe(
          Option.flatMap((queueConfigurations) =>
            Option.fromUndefinedOr(queueConfigurations[0]),
          ),
          Option.match({
            onNone: () =>
              Effect.fail(
                new BucketNotificationQueueConfigurationMissing({
                  bucketName: props.Bucket,
                }),
              ),
            onSome: Effect.succeed,
          }),
        );
      const bucketNotificationState = (
        props: BucketNotificationProps,
        queueConfiguration: S3.QueueConfiguration,
      ): BucketNotificationState => ({
        bucketName: props.Bucket,
        queueArn: queueConfiguration.QueueArn,
        events: queueConfiguration.Events,
      });
      const queueConfigurations = (
        configuration: S3.NotificationConfiguration,
      ) => configuration.QueueConfigurations ?? [];
      const managedQueueConfiguration = (
        configuration: S3.NotificationConfiguration,
        desired: S3.QueueConfiguration,
      ) =>
        queueConfigurations(configuration).find(
          (queueConfiguration) =>
            queueConfiguration.Id === desired.Id ||
            queueConfiguration.QueueArn === desired.QueueArn,
        );
      const mergedNotificationConfiguration = (
        current: S3.NotificationConfiguration,
        desired: S3.QueueConfiguration,
      ): S3.NotificationConfiguration => ({
        TopicConfigurations: current.TopicConfigurations,
        QueueConfigurations: Arr.append(
          Arr.filter(
            queueConfigurations(current),
            (queueConfiguration) =>
              queueConfiguration.Id !== desired.Id &&
              queueConfiguration.QueueArn !== desired.QueueArn,
          ),
          desired,
        ),
        LambdaFunctionConfigurations: current.LambdaFunctionConfigurations,
        EventBridgeConfiguration: current.EventBridgeConfiguration,
      });
      const removedNotificationConfiguration = (
        current: S3.NotificationConfiguration,
        desired: S3.QueueConfiguration,
      ): S3.NotificationConfiguration => ({
        TopicConfigurations: current.TopicConfigurations,
        QueueConfigurations: Arr.filter(
          queueConfigurations(current),
          (queueConfiguration) =>
            queueConfiguration.Id !== desired.Id &&
            queueConfiguration.QueueArn !== desired.QueueArn,
        ),
        LambdaFunctionConfigurations: current.LambdaFunctionConfigurations,
        EventBridgeConfiguration: current.EventBridgeConfiguration,
      });

      const readQueueArn = Effect.fn(
        "BucketNotificationLifecycleService.readQueueArn",
      )(function* (queueArn: string, queueUrl: string) {
        const attributes = yield* getQueueAttributes({
          QueueUrl: queueUrl,
          AttributeNames: ["QueueArn"],
        }).pipe(Effect.retry(queueLookupRetryPolicy));

        return attributes.Attributes?.QueueArn ?? queueArn;
      });
      const resolvePendingQueueArn = Effect.fn(
        "BucketNotificationLifecycleService.resolvePendingQueueArn",
      )(function* (queueArn: string, queueName: string) {
        const queueUrlOutput = yield* getQueueUrl({
          QueueName: queueName,
        }).pipe(Effect.retry(queueLookupRetryPolicy));
        const queueUrlOption = Schema.decodeUnknownOption(Schema.String)(
          queueUrlOutput.QueueUrl,
        );

        return yield* Match.value(queueUrlOption).pipe(
          Match.when({ _tag: "None" }, () => Effect.succeed(queueArn)),
          Match.when({ _tag: "Some" }, ({ value: queueUrl }) =>
            readQueueArn(queueArn, queueUrl),
          ),
          Match.exhaustive,
        );
      });
      const resolveQueueArn = Effect.fn(
        "BucketNotificationLifecycleService.resolveQueueArn",
      )(function* (queueArn: string) {
        const pendingQueueName = decodePendingQueueArnPlaceholder(queueArn);

        return yield* Match.value(pendingQueueName).pipe(
          Match.when({ _tag: "None" }, () => Effect.succeed(queueArn)),
          Match.when({ _tag: "Some" }, ({ value: queueName }) =>
            resolvePendingQueueArn(queueArn, queueName),
          ),
          Match.exhaustive,
        );
      });

      return {
        create: Effect.fn("BucketNotificationLifecycleService.create")(
          function* (props: BucketNotificationProps) {
            const desiredQueueConfiguration =
              yield* firstQueueConfiguration(props);
            const queueArn = yield* resolveQueueArn(
              desiredQueueConfiguration.QueueArn,
            );
            const desired = s3.QueueConfiguration.make({
              Id: desiredQueueConfiguration.Id,
              QueueArn: queueArn,
              Events: desiredQueueConfiguration.Events,
              Filter: desiredQueueConfiguration.Filter,
            });
            const currentOption = yield* getBucketNotificationConfiguration({
              Bucket: props.Bucket,
            }).pipe(
              Effect.map(Option.some),
              Effect.catchTag("NoSuchBucket", () =>
                Effect.succeed(Option.none<S3.NotificationConfiguration>()),
              ),
              Effect.mapError(
                (cause) => new BucketNotificationReadFailed({ cause }),
              ),
            );
            const current = Option.getOrElse(
              currentOption,
              () => emptyNotificationConfiguration,
            );
            const next = mergedNotificationConfiguration(current, desired);

            yield* putBucketNotificationConfiguration({
              Bucket: props.Bucket,
              NotificationConfiguration: next,
            }).pipe(
              Effect.mapError(
                (cause) => new BucketNotificationCreateFailed({ cause }),
              ),
            );

            return bucketNotificationState(props, desired);
          },
        ),

        read: Effect.fn("BucketNotificationLifecycleService.read")(function* (
          props: BucketNotificationProps,
        ) {
          const configuration = yield* getBucketNotificationConfiguration({
            Bucket: props.Bucket,
          }).pipe(
            Effect.map(Option.some),
            Effect.catchTag("NoSuchBucket", () =>
              Effect.succeed(Option.none<S3.NotificationConfiguration>()),
            ),
            Effect.mapError(
              (cause) => new BucketNotificationReadFailed({ cause }),
            ),
          );

          const observed = yield* Effect.fromOption(configuration).pipe(
            Effect.catchNoSuchElement,
          );

          return observed;
        }),

        destroy: Effect.fn("BucketNotificationLifecycleService.destroy")(
          function* (props: BucketNotificationProps) {
            const desired = yield* firstQueueConfiguration(props);
            const currentOption = yield* getBucketNotificationConfiguration({
              Bucket: props.Bucket,
            }).pipe(
              Effect.map(Option.some),
              Effect.catchTag("NoSuchBucket", () =>
                Effect.succeed(Option.none<S3.NotificationConfiguration>()),
              ),
              Effect.mapError(
                (cause) => new BucketNotificationReadFailed({ cause }),
              ),
            );
            const clearNotification = (value: S3.NotificationConfiguration) =>
              putBucketNotificationConfiguration({
                Bucket: props.Bucket,
                NotificationConfiguration: removedNotificationConfiguration(
                  value,
                  desired,
                ),
              }).pipe(
                Effect.mapError(
                  (cause) => new BucketNotificationCreateFailed({ cause }),
                ),
              );
            const destroyEffect = Match.value(currentOption).pipe(
              Match.when(Option.isNone, () => Effect.void),
              Match.when(Option.isSome, ({ value }) =>
                clearNotification(value),
              ),
              Match.exhaustive,
            );

            yield* destroyEffect;
          },
        ),

        resolve: Effect.fn("BucketNotificationLifecycleService.resolve")(
          function* (props: BucketNotificationProps) {
            const desired = yield* firstQueueConfiguration(props);
            const queueArn = yield* resolveQueueArn(desired.QueueArn);

            return s3.QueueConfiguration.make({
              Id: desired.Id,
              QueueArn: queueArn,
              Events: desired.Events,
              Filter: desired.Filter,
            });
          },
        ),

        managedQueueConfiguration,
      };
    }),
  },
) {}
