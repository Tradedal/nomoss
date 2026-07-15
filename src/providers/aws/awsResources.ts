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

type GraphBucketNotificationInput = {
  readonly logicalId: string;
  readonly bucketName: ResourceOutputRef;
  readonly queueArn: ResourceOutputRef;
  readonly queuePolicy: ResourceKey;
};

/**
 * Stack graph programs use these declarations to validate AWS props, create
 * output refs, and let `ResourceGraphBuilder` record dependency edges when
 * declarations consume another resource output.
 */
export class AwsResources extends Context.Service<AwsResources>()(
  "nomoss/providers/aws/awsResources",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphBuilder;
      const physicalNames = yield* PhysicalNameStore;

      return {
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
            yield* resource.after(input.queuePolicy, "queuePolicy", "Policy");
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
 * Stack definitions use these CDK-style constructors while live provider
 * behavior remains in AWS lifecycle policies.
 */
export const Aws = {
  Bucket: (input: GraphBucketInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.Bucket(input);
    }),

  Queue: (input: GraphQueueInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.Queue(input);
    }),

  QueuePolicy: (input: GraphQueuePolicyInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.QueuePolicy(input);
    }),

  BucketNotification: (input: GraphBucketNotificationInput) =>
    Effect.gen(function* () {
      const resources = yield* AwsResources;

      return yield* resources.BucketNotification(input);
    }),
};
