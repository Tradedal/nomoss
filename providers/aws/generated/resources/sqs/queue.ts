// Generated from the CloudFormation Registry resource schema. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceEntity,
  ResourceGraphBuilder,
  type ResourceKey,
  ResourceReferenceSchema,
  ResourceSchemaAnnotationSchema,
} from "nomoss/core";
import { ResourceOutputBinding } from "../../../../../src/core/resource/resourceOutputBinding.js";

interface Tag {
  readonly Key: string;
  readonly Value: string;
}

const Tag = Schema.Struct({
  Key: Schema.String.annotate({ description: "" }),
  Value: Schema.String.annotate({ description: "" }),
}).annotate({ description: "", identifier: "Tag" });

export interface AWSQueueProps {
  readonly ContentBasedDeduplication?: boolean;
  readonly DeduplicationScope?: string;
  readonly DelaySeconds?: number;
  readonly FifoQueue?: boolean;
  readonly FifoThroughputLimit?: string;
  readonly KmsDataKeyReusePeriodSeconds?: number;
  readonly KmsMasterKeyId?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "kms";
        readonly resource: "alias";
      }>
    | string;
  readonly SqsManagedSseEnabled?: boolean;
  readonly MaximumMessageSize?: number;
  readonly MessageRetentionPeriod?: number;
  readonly QueueName?: string;
  readonly ReceiveMessageWaitTimeSeconds?: number;
  readonly RedriveAllowPolicy?:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly RedrivePolicy?:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly VisibilityTimeout?: number;
}

export const AWSQueueResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "sqs",
  resource: "queue",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["FifoQueue"], ["QueueName"]],
  },
  primaryIdentifier: ["/properties/QueueUrl"],
});

export const AWSQueuePropsSchema = annotateResourceSchema(
  Schema.Struct({
    ContentBasedDeduplication: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "For first-in-first-out (FIFO) queues, specifies whether to enable content-based deduplication. During the deduplication interval, SQS treats messages that are sent with identical content as duplicates and delivers only one copy of the message. For more information, see the ``ContentBasedDeduplication`` attribute for the ``CreateQueue`` action in the *API Reference*.",
      }),
    ),
    DeduplicationScope: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For high throughput for FIFO queues, specifies whether message deduplication occurs at the message group or queue level. Valid values are ``messageGroup`` and ``queue``.\n To enable high throughput for a FIFO queue, set this attribute to ``messageGroup``*and* set the ``FifoThroughputLimit`` attribute to ``perMessageGroupId``. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
      }),
    ),
    DelaySeconds: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The time in seconds for which the delivery of all messages in the queue is delayed. You can specify an integer value of ``0`` to ``900`` (15 minutes). The default value is ``0``.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    FifoQueue: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "If set to true, creates a FIFO queue. If you don't specify this property, SQS creates a standard queue. For more information, see [Amazon SQS FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html) in the *Developer Guide*.",
      }),
    ),
    FifoThroughputLimit: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For high throughput for FIFO queues, specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are ``perQueue`` and ``perMessageGroupId``.\n To enable high throughput for a FIFO queue, set this attribute to ``perMessageGroupId``*and* set the ``DeduplicationScope`` attribute to ``messageGroup``. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
      }),
    ),
    KmsDataKeyReusePeriodSeconds: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The length of time in seconds for which SQS can reuse a data key to encrypt or decrypt messages before calling KMS again. The value must be an integer between 60 (1 minute) and 86,400 (24 hours). The default is 300 (5 minutes).\n  A shorter time period provides better security, but results in more calls to KMS, which might incur charges after Free Tier. For more information, see [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html#sqs-how-does-the-data-key-reuse-period-work) in the *Developer Guide*.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    KmsMasterKeyId: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("kms"),
              resource: Schema.Literal("alias"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["AliasName"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({
          description:
            "The ID of an AWS Key Management Service (KMS) for SQS, or a custom KMS. To use the AWS managed KMS for SQS, specify a (default) alias ARN, alias name (for example ``alias/aws/sqs``), key ARN, or key ID. For more information, see the following:\n  +  [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html) in the *Developer Guide*\n  +  [CreateQueue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html) in the *API Reference*\n  +  [Request Parameters](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters) in the *Key Management Service API Reference*\n  +   The Key Management Service (KMS) section of the [Security best practices for Key Management Service](https://docs.aws.amazon.com/kms/latest/developerguide/best-practices.html) in the *Key Management Service Developer Guide*",
        }),
      ]),
    ),
    SqsManagedSseEnabled: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Enables server-side queue encryption using SQS owned encryption keys. Only one server-side encryption option is supported per queue (for example, [SSE-KMS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sse-existing-queue.html) or [SSE-SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sqs-sse-queue.html)). When ``SqsManagedSseEnabled`` is not defined, ``SSE-SQS`` encryption is enabled by default.",
      }),
    ),
    MaximumMessageSize: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The limit of how many bytes that a message can contain before SQS rejects it. You can specify an integer from 1,024 bytes (1 KiB) to 1,048,576 bytes (1 MiB). Default: 1,048,576 bytes (1 MiB).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    MessageRetentionPeriod: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The number of seconds that SQS retains a message. You can specify an integer value from ``60`` seconds (1 minute) to ``1,209,600`` seconds (14 days). The default value is ``345,600`` seconds (4 days).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    QueueName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A name for the queue. To create a FIFO queue, the name of your FIFO queue must end with the ``.fifo`` suffix. For more information, see [Amazon SQS FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html) in the *Developer Guide*.\n If you don't specify a name, CFN generates a unique physical ID and uses that ID for the queue name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html) in the *User Guide*. \n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
      }),
    ),
    ReceiveMessageWaitTimeSeconds: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Specifies the duration, in seconds, that the ReceiveMessage action call waits until a message is in the queue in order to include it in the response, rather than returning an empty response if a message isn't yet available. You can specify an integer from 1 to 20. Short polling is used as the default or when you specify 0 for this property. For more information, see [Consuming messages using long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-long-polling) in the *Developer Guide*.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    RedriveAllowPolicy: Schema.optionalKey(
      Schema.Union([
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
        Schema.String,
      ]).annotate({
        description:
          "The string that includes the parameters for the permissions for the dead-letter queue redrive permission and which source queues can specify dead-letter queues as a JSON object. The parameters are as follows:\n  +  ``redrivePermission``: The permission type that defines which source queues can specify the current queue as the dead-letter queue. Valid values are:\n  +  ``allowAll``: (Default) Any source queues in this AWS account in the same Region can specify this queue as the dead-letter queue.\n  +  ``denyAll``: No source queues can specify this queue as the dead-letter queue.\n  +  ``byQueue``: Only queues specified by the ``sourceQueueArns`` parameter can specify this queue as the dead-letter queue.\n  \n  +  ``sourceQueueArns``: The Amazon Resource Names (ARN)s of the source queues that can specify this queue as the dead-letter queue and redrive messages. You can specify this parameter only when the ``redrivePermission`` parameter is set to ``byQueue``. You can specify up to 10 source queue ARNs. To allow more than 10 source queues to specify dead-letter queues, set the ``redrivePermission`` parameter to ``allowAll``.",
      }),
    ),
    RedrivePolicy: Schema.optionalKey(
      Schema.Union([
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
        Schema.String,
      ]).annotate({
        description:
          'The string that includes the parameters for the dead-letter queue functionality of the source queue as a JSON object. The parameters are as follows:\n  +  ``deadLetterTargetArn``: The Amazon Resource Name (ARN) of the dead-letter queue to which SQS moves messages after the value of ``maxReceiveCount`` is exceeded.\n  +  ``maxReceiveCount``: The number of times a message is received by a consumer of the source queue before being moved to the dead-letter queue. When the ``ReceiveCount`` for a message exceeds the ``maxReceiveCount`` for a queue, SQS moves the message to the dead-letter-queue.\n  \n  The dead-letter queue of a FIFO queue must also be a FIFO queue. Similarly, the dead-letter queue of a standard queue must also be a standard queue.\n   *JSON* \n  ``{ "deadLetterTargetArn" : String, "maxReceiveCount" : Integer }`` \n  *YAML* \n  ``deadLetterTargetArn : String`` \n  ``maxReceiveCount : Integer``',
      }),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag).annotate({
        description:
          "The tags that you attach to this queue. For more information, see [Resource tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) in the *User Guide*.",
      }),
    ),
    VisibilityTimeout: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The length of time during which a message will be unavailable after a message is delivered from the queue. This blocks other components from receiving the same message and gives the initial component time to process and delete the message from the queue.\n Values must be from 0 to 43,200 seconds (12 hours). If you don't specify a value, AWS CloudFormation uses the default value of 30 seconds.\n For more information about SQS queue visibility timeouts, see [Visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html) in the *Developer Guide*.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
  }),
  AWSQueueResourceSchema,
);

export interface AWSQueueOutputs {
  readonly QueueUrl?: string;
  readonly Arn?: string;
}

export const AWSQueueOutputsSchema = Schema.Struct({
  QueueUrl: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  Arn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
});

export interface AWSQueueRequest {
  readonly ContentBasedDeduplication?: boolean;
  readonly DeduplicationScope?: string;
  readonly DelaySeconds?: number;
  readonly FifoQueue?: boolean;
  readonly FifoThroughputLimit?: string;
  readonly KmsDataKeyReusePeriodSeconds?: number;
  readonly KmsMasterKeyId?: string;
  readonly SqsManagedSseEnabled?: boolean;
  readonly MaximumMessageSize?: number;
  readonly MessageRetentionPeriod?: number;
  readonly QueueName?: string;
  readonly ReceiveMessageWaitTimeSeconds?: number;
  readonly RedriveAllowPolicy?:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly RedrivePolicy?:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly VisibilityTimeout?: number;
}

export const AWSQueueRequestSchema = Schema.Struct({
  ContentBasedDeduplication: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "For first-in-first-out (FIFO) queues, specifies whether to enable content-based deduplication. During the deduplication interval, SQS treats messages that are sent with identical content as duplicates and delivers only one copy of the message. For more information, see the ``ContentBasedDeduplication`` attribute for the ``CreateQueue`` action in the *API Reference*.",
    }),
  ),
  DeduplicationScope: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For high throughput for FIFO queues, specifies whether message deduplication occurs at the message group or queue level. Valid values are ``messageGroup`` and ``queue``.\n To enable high throughput for a FIFO queue, set this attribute to ``messageGroup``*and* set the ``FifoThroughputLimit`` attribute to ``perMessageGroupId``. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
    }),
  ),
  DelaySeconds: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The time in seconds for which the delivery of all messages in the queue is delayed. You can specify an integer value of ``0`` to ``900`` (15 minutes). The default value is ``0``.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  FifoQueue: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If set to true, creates a FIFO queue. If you don't specify this property, SQS creates a standard queue. For more information, see [Amazon SQS FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html) in the *Developer Guide*.",
    }),
  ),
  FifoThroughputLimit: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For high throughput for FIFO queues, specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are ``perQueue`` and ``perMessageGroupId``.\n To enable high throughput for a FIFO queue, set this attribute to ``perMessageGroupId``*and* set the ``DeduplicationScope`` attribute to ``messageGroup``. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
    }),
  ),
  KmsDataKeyReusePeriodSeconds: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The length of time in seconds for which SQS can reuse a data key to encrypt or decrypt messages before calling KMS again. The value must be an integer between 60 (1 minute) and 86,400 (24 hours). The default is 300 (5 minutes).\n  A shorter time period provides better security, but results in more calls to KMS, which might incur charges after Free Tier. For more information, see [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html#sqs-how-does-the-data-key-reuse-period-work) in the *Developer Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  KmsMasterKeyId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of an AWS Key Management Service (KMS) for SQS, or a custom KMS. To use the AWS managed KMS for SQS, specify a (default) alias ARN, alias name (for example ``alias/aws/sqs``), key ARN, or key ID. For more information, see the following:\n  +  [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html) in the *Developer Guide*\n  +  [CreateQueue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html) in the *API Reference*\n  +  [Request Parameters](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters) in the *Key Management Service API Reference*\n  +   The Key Management Service (KMS) section of the [Security best practices for Key Management Service](https://docs.aws.amazon.com/kms/latest/developerguide/best-practices.html) in the *Key Management Service Developer Guide*",
    }),
  ),
  SqsManagedSseEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Enables server-side queue encryption using SQS owned encryption keys. Only one server-side encryption option is supported per queue (for example, [SSE-KMS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sse-existing-queue.html) or [SSE-SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sqs-sse-queue.html)). When ``SqsManagedSseEnabled`` is not defined, ``SSE-SQS`` encryption is enabled by default.",
    }),
  ),
  MaximumMessageSize: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The limit of how many bytes that a message can contain before SQS rejects it. You can specify an integer from 1,024 bytes (1 KiB) to 1,048,576 bytes (1 MiB). Default: 1,048,576 bytes (1 MiB).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  MessageRetentionPeriod: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of seconds that SQS retains a message. You can specify an integer value from ``60`` seconds (1 minute) to ``1,209,600`` seconds (14 days). The default value is ``345,600`` seconds (4 days).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  QueueName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A name for the queue. To create a FIFO queue, the name of your FIFO queue must end with the ``.fifo`` suffix. For more information, see [Amazon SQS FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html) in the *Developer Guide*.\n If you don't specify a name, CFN generates a unique physical ID and uses that ID for the queue name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html) in the *User Guide*. \n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
    }),
  ),
  ReceiveMessageWaitTimeSeconds: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Specifies the duration, in seconds, that the ReceiveMessage action call waits until a message is in the queue in order to include it in the response, rather than returning an empty response if a message isn't yet available. You can specify an integer from 1 to 20. Short polling is used as the default or when you specify 0 for this property. For more information, see [Consuming messages using long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-long-polling) in the *Developer Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  RedriveAllowPolicy: Schema.optionalKey(
    Schema.Union([
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
      Schema.String,
    ]).annotate({
      description:
        "The string that includes the parameters for the permissions for the dead-letter queue redrive permission and which source queues can specify dead-letter queues as a JSON object. The parameters are as follows:\n  +  ``redrivePermission``: The permission type that defines which source queues can specify the current queue as the dead-letter queue. Valid values are:\n  +  ``allowAll``: (Default) Any source queues in this AWS account in the same Region can specify this queue as the dead-letter queue.\n  +  ``denyAll``: No source queues can specify this queue as the dead-letter queue.\n  +  ``byQueue``: Only queues specified by the ``sourceQueueArns`` parameter can specify this queue as the dead-letter queue.\n  \n  +  ``sourceQueueArns``: The Amazon Resource Names (ARN)s of the source queues that can specify this queue as the dead-letter queue and redrive messages. You can specify this parameter only when the ``redrivePermission`` parameter is set to ``byQueue``. You can specify up to 10 source queue ARNs. To allow more than 10 source queues to specify dead-letter queues, set the ``redrivePermission`` parameter to ``allowAll``.",
    }),
  ),
  RedrivePolicy: Schema.optionalKey(
    Schema.Union([
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
      Schema.String,
    ]).annotate({
      description:
        'The string that includes the parameters for the dead-letter queue functionality of the source queue as a JSON object. The parameters are as follows:\n  +  ``deadLetterTargetArn``: The Amazon Resource Name (ARN) of the dead-letter queue to which SQS moves messages after the value of ``maxReceiveCount`` is exceeded.\n  +  ``maxReceiveCount``: The number of times a message is received by a consumer of the source queue before being moved to the dead-letter queue. When the ``ReceiveCount`` for a message exceeds the ``maxReceiveCount`` for a queue, SQS moves the message to the dead-letter-queue.\n  \n  The dead-letter queue of a FIFO queue must also be a FIFO queue. Similarly, the dead-letter queue of a standard queue must also be a standard queue.\n   *JSON* \n  ``{ "deadLetterTargetArn" : String, "maxReceiveCount" : Integer }`` \n  *YAML* \n  ``deadLetterTargetArn : String`` \n  ``maxReceiveCount : Integer``',
    }),
  ),
  Tags: Schema.optionalKey(
    Schema.Array(Tag).annotate({
      description:
        "The tags that you attach to this queue. For more information, see [Resource tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) in the *User Guide*.",
    }),
  ),
  VisibilityTimeout: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The length of time during which a message will be unavailable after a message is delivered from the queue. This blocks other components from receiving the same message and gives the initial component time to process and delete the message from the queue.\n Values must be from 0 to 43,200 seconds (12 hours). If you don't specify a value, AWS CloudFormation uses the default value of 30 seconds.\n For more information about SQS queue visibility timeouts, see [Visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html) in the *Developer Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
});

/**
 * The AWSQueueRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSQueueRelationshipIssues = [
  {
    propertyPath: ["KmsMasterKeyId"],
    sourceType: "AWS::KMS::Key",
    sourceProperties: [["Arn"], ["KeyId"]],
    message:
      "Choose one of the permitted source properties before using a resource reference",
  },
];

export const AWSQueueResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("sqs"),
  resource: Schema.Literal("queue"),
});

/**
 * The AWSQueueResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSQueueResource<Props = AWSQueueProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "sqs";
  readonly resource: "queue";
}> {
  constructor(
    key: ResourceKey,
    readonly props: Props,
    private readonly binding?: ResourceOutputBinding,
  ) {
    super({
      key,
      resourceType: {
        provider: "aws",
        service: "sqs",
        resource: "queue",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get QueueUrl(): Required<AWSQueueOutputs>["QueueUrl"] {
    const value: Required<AWSQueueOutputs>["QueueUrl"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "QueueUrl",
        Schema.requiredKey(AWSQueueOutputsSchema.fields.QueueUrl),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSQueueOutputs>["Arn"] {
    const value: Required<AWSQueueOutputs>["Arn"] = ResourceOutputBinding.value(
      this.binding,
      this.key,
      "Arn",
      Schema.requiredKey(AWSQueueOutputsSchema.fields.Arn),
    );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSQueueDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSQueueResource<Props> {
  const resource: AWSQueueResource<Props> = new AWSQueueResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSQueue resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSQueue = Effect.fn("AWSQueue")(function* (input: {
  logicalId: string;
  props: AWSQueueProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSQueuePropsSchema)(input.props);

  yield* declaration.registerEntity(AWSQueueResourceTypeSchema, {
    propsSchema: AWSQueuePropsSchema,
    requestSchema: AWSQueueRequestSchema,
    outputsSchema: AWSQueueOutputsSchema,
    props,
  });

  const resource: AWSQueueResource = createAWSQueueDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
