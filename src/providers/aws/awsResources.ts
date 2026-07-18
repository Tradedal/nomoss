import { Context, Effect, Match, Option, Struct } from "effect";

import {
  type ResourceKey,
  type ResourceOutputRef,
  resourceOutputRef,
} from "../../core/model.js";
import { PhysicalNameStore } from "../../core/physicalNameStore.js";
import { ResourceGraphBuilder } from "../../core/resourceGraphBuilder.js";
import {
  BucketOutputsSchema,
  type BucketProps,
  BucketPropsSchema,
  bucketOutputsFromProps,
} from "./awsBucket.js";
import {
  BucketNotificationOutputsSchema,
  BucketNotificationPropsSchema,
} from "./awsBucketNotification.js";
import {
  QueueOutputsSchema,
  type QueueProps,
  QueuePropsSchema,
  queueOutputsFromProps,
} from "./awsQueue.js";
import {
  QueuePolicyOutputsSchema,
  type QueuePolicyProps,
  QueuePolicyPropsSchema,
  s3SendMessageQueuePolicy,
} from "./awsQueuePolicy.js";

type GraphBucketProps = Omit<BucketProps, "Bucket"> & {
  readonly Bucket?: string;
};

type GraphQueueProps = Omit<QueueProps, "QueueName"> & {
  readonly QueueName?: string;
};

type GraphBucketInput = {
  readonly logicalId: string;
  readonly props?: GraphBucketProps;
  readonly forceDestroy?: boolean;
};

type GraphQueueInput = {
  readonly logicalId: string;
  readonly props?: GraphQueueProps;
};

type GraphQueuePolicyInput = {
  readonly logicalId: string;
  readonly bucketArn: ResourceOutputRef;
  readonly queueUrl: ResourceOutputRef;
  readonly queueArn: ResourceOutputRef;
};

type GraphQueuePolicy = {
  readonly key: ResourceKey;
  readonly props: QueuePolicyProps;
};

type GraphBucketNotificationInput = {
  readonly logicalId: string;
  readonly bucketName: ResourceOutputRef;
  readonly queueArn: ResourceOutputRef;
  readonly queuePolicy: GraphQueuePolicy;
};

/**
 * Each method registers one desired AWS resource with `ResourceGraphBuilder`.
 * When an input consumes a `ResourceOutputRef`, the builder records the edge
 * needed to create its source first.
 */
export class AwsResources extends Context.Service<AwsResources>()(
  "nomoss/providers/aws/awsResources",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphBuilder;
      const physicalNames = yield* PhysicalNameStore;

      return {
        /**
         * Declares an S3 bucket in the current stack. Nomoss assigns a stable
         * physical name when `Bucket` is omitted and returns output references
         * for resources that consume the bucket name or ARN.
         */
        Bucket: Effect.fn("AwsResources.Bucket")(function* (
          input: GraphBucketInput,
        ) {
          const key = { logicalId: input.logicalId };
          const resource = yield* graph.resource(key);
          const inputProps = input.props ?? {};
          const bucketName = yield* Option.fromUndefinedOr(
            inputProps.Bucket,
          ).pipe(
            Option.match({
              onNone: () => physicalNames.bucketNameFor(input.logicalId),
              onSome: Effect.succeed,
            }),
          );
          const bucketPropsInput = Match.value(input.forceDestroy).pipe(
            Match.when(undefined, () =>
              Struct.assign(inputProps, {
                Bucket: bucketName,
              }),
            ),
            Match.orElse((forceDestroy) =>
              Struct.assign(inputProps, {
                Bucket: bucketName,
                ForceDestroy: forceDestroy,
              }),
            ),
          );
          const props = yield* BucketPropsSchema.makeEffect(bucketPropsInput);
          const outputs = bucketOutputsFromProps(props);

          yield* resource.register({
            propsSchema: BucketPropsSchema,
            outputsSchema: BucketOutputsSchema,
            props,
            outputs,
          });

          return {
            key,
            props,
            Bucket: resourceOutputRef(key, "Bucket"),
            BucketArn: resourceOutputRef(key, "BucketArn"),
          };
        }),

        /**
         * Declares an SQS queue in the current stack. Nomoss assigns a stable
         * physical name when `QueueName` is omitted and returns output
         * references for resources that consume the queue URL or ARN.
         */
        Queue: Effect.fn("AwsResources.Queue")(function* (
          input: GraphQueueInput,
        ) {
          const key = { logicalId: input.logicalId };
          const resource = yield* graph.resource(key);
          const inputProps = input.props ?? {};
          const queueName = yield* Option.fromUndefinedOr(
            inputProps.QueueName,
          ).pipe(
            Option.match({
              onNone: () => physicalNames.queueNameFor(input.logicalId),
              onSome: Effect.succeed,
            }),
          );
          const props = yield* QueuePropsSchema.makeEffect(
            Struct.assign(inputProps, {
              QueueName: queueName,
            }),
          );
          const outputs = queueOutputsFromProps(props);

          yield* resource.register({
            propsSchema: QueuePropsSchema,
            outputsSchema: QueueOutputsSchema,
            props,
            outputs,
          });

          return {
            key,
            props,
            QueueUrl: resourceOutputRef(key, "QueueUrl"),
            QueueArn: resourceOutputRef(key, "QueueArn"),
          };
        }),

        /**
         * An SQS queue policy controls who may use a queue and which SQS actions
         * they may call. This constructor permits S3 to send one bucket's event
         * messages to the queue.
         */
        QueuePolicy: Effect.fn("AwsResources.QueuePolicy")(function* (
          input: GraphQueuePolicyInput,
        ) {
          const key = { logicalId: input.logicalId };
          const resource = yield* graph.resource(key);
          const bucketArn = yield* resource.stringFrom(
            input.bucketArn,
            "bucketArn",
          );
          const queueUrl = yield* resource.stringFrom(
            input.queueUrl,
            "queueUrl",
          );
          const queueArn = yield* resource.stringFrom(
            input.queueArn,
            "queueArn",
          );
          const policy = yield* s3SendMessageQueuePolicy(bucketArn, queueArn);
          const props = yield* QueuePolicyPropsSchema.makeEffect({
            QueueUrl: queueUrl,
            Attributes: {
              Policy: policy,
            },
          });
          const outputs = {};

          yield* resource.register({
            propsSchema: QueuePolicyPropsSchema,
            outputsSchema: QueuePolicyOutputsSchema,
            props,
            outputs,
          });

          return {
            key,
            props,
          };
        }),

        /**
         * Sets the bucket's notification configuration so object-created events
         * target the declared queue ARN. S3 validates the queue permission when
         * this configuration is applied, so the queue policy is a prerequisite.
         */
        BucketNotification: Effect.fn("AwsResources.BucketNotification")(
          function* (input: GraphBucketNotificationInput) {
            const key = { logicalId: input.logicalId };
            const resource = yield* graph.resource(key);
            const bucketName = yield* resource.stringFrom(
              input.bucketName,
              "bucketName",
            );
            const queueArn = yield* resource.stringFrom(
              input.queueArn,
              "queueArn",
            );
            yield* resource.after(
              input.queuePolicy.key,
              "queuePolicy",
              "Policy",
            );
            const queueConfiguration = {
              Id: input.logicalId,
              QueueArn: queueArn,
              Events: ["s3:ObjectCreated:*"],
            };
            const props = yield* BucketNotificationPropsSchema.makeEffect({
              Bucket: bucketName,
              NotificationConfiguration: {
                QueueConfigurations: [queueConfiguration],
              },
            });
            const outputs = {};

            yield* resource.register({
              propsSchema: BucketNotificationPropsSchema,
              outputsSchema: BucketNotificationOutputsSchema,
              props,
              outputs,
            });

            return {
              key,
              props,
            };
          },
        ),
      };
    }),
  },
) {}

/**
 * These constructors declare resources without first yielding `AwsResources`.
 * The surrounding Effect still supplies that service.
 */
export const Aws = {
  /**
   * Declares an S3 bucket in the current stack. Nomoss assigns a stable
   * physical name when `Bucket` is omitted and returns output references for
   * resources that consume the bucket name or ARN.
   */
  Bucket: (input: GraphBucketInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.Bucket(input);
    }),

  /**
   * Declares an SQS queue in the current stack. Nomoss assigns a stable
   * physical name when `QueueName` is omitted and returns output references
   * for resources that consume the queue URL or ARN.
   */
  Queue: (input: GraphQueueInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.Queue(input);
    }),

  /**
   * An SQS queue policy controls who may use a queue and which SQS actions they
   * may call. This constructor permits S3 to send one bucket's event messages
   * to the queue.
   */
  QueuePolicy: (input: GraphQueuePolicyInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.QueuePolicy(input);
    }),

  /**
   * Sets the bucket's notification configuration so object-created events
   * target the declared queue ARN. S3 validates the queue permission when this
   * configuration is applied, so the queue policy is a prerequisite.
   */
  BucketNotification: (input: GraphBucketNotificationInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.BucketNotification(input);
    }),
};
