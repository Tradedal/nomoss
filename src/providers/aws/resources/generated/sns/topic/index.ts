import type {
  ResourceCommand,
  ResourceCommandPolicy,
  ResourceKey,
} from "@nomoss/core";
import {
  annotateResourceSchema,
  CloudFormationPropertyReferencesAnnotationId,
  ResourceGraphBuilder,
  ResourceOutputRefSchema,
  ResourceSchemaAnnotationSchema,
} from "@nomoss/core";
import { providerCommandPolicyTag } from "@nomoss/providers";
import { Context, Effect, Layer, Schema } from "effect";

const Tag = Schema.Struct({
  Key: Schema.String.annotate({
    description: "The required key portion of the tag.",
  }),
  Value: Schema.String.annotate({
    description: "The optional value portion of the tag.",
  }),
}).annotate({
  description: "The list of tags to be added to the specified topic.",
});

const Subscription = Schema.Struct({
  Endpoint: Schema.String.annotate({
    description:
      "The endpoint that receives notifications from the SNS topic. The endpoint value depends on the protocol that you specify. For more information, see the ``Endpoint`` parameter of the ``Subscribe`` action in the *API Reference*.",
  }),
  Protocol: Schema.String.annotate({
    description:
      "The subscription's protocol. For more information, see the ``Protocol`` parameter of the ``Subscribe`` action in the *API Reference*.",
  }),
}).annotate({
  description:
    "``Subscription`` is an embedded property that describes the subscription endpoints of an SNS topic.\n  For full control over subscription behavior (for example, delivery policy, filtering, raw message delivery, and cross-region subscriptions), use the [AWS::SNS::Subscription](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html) resource.",
});

const LoggingConfig = Schema.Struct({
  Protocol: Schema.Literals([
    "http/s",
    "sqs",
    "lambda",
    "firehose",
    "application",
  ]).annotate({
    description:
      "Indicates one of the supported protocols for the Amazon SNS topic.\n  At least one of the other three ``LoggingConfig`` properties is recommend along with ``Protocol``.",
  }),
  SuccessFeedbackRoleArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The IAM role ARN to be used when logging successful message deliveries in Amazon CloudWatch.",
    }),
  ),
  SuccessFeedbackSampleRate: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The percentage of successful message deliveries to be logged in Amazon CloudWatch. Valid percentage values range from 0 to 100.",
    }),
  ),
  FailureFeedbackRoleArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The IAM role ARN to be used when logging failed message deliveries in Amazon CloudWatch.",
    }),
  ),
}).annotate({
  description:
    "The ``LoggingConfig`` property type specifies the ``Delivery`` status logging configuration for an [AWS::SNS::Topic](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-topic.html).",
});

const TopicPropsSource = Schema.Struct({
  DisplayName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The display name to use for an SNS topic with SMS subscriptions. The display name must be maximum 100 characters long, including hyphens (-), underscores (_), spaces, and tabs.",
    }),
  ),
  KmsMasterKeyId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of an AWS managed customer master key (CMK) for SNS or a custom CMK. For more information, see [Key terms](https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html#sse-key-terms). For more examples, see ``KeyId`` in the *API Reference*.\n This property applies only to [server-side-encryption](https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html).",
      }),
      ResourceOutputRefSchema,
    ]),
  ).annotate({
    [CloudFormationPropertyReferencesAnnotationId]: [
      {
        targetCloudFormationType: "AWS::KMS::Key",
        targetPropertyPath: "/properties/Arn",
      },
      {
        targetCloudFormationType: "AWS::KMS::Key",
        targetPropertyPath: "/properties/KeyId",
      },
      {
        targetCloudFormationType: "AWS::KMS::Alias",
        targetPropertyPath: "/properties/AliasName",
      },
    ],
  }),
  DataProtectionPolicy: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.Json).annotate({
      description:
        "The body of the policy document you want to use for this topic.\n You can only add one policy per topic.\n The policy must be in JSON string format.\n Length Constraints: Maximum length of 30,720.",
    }),
  ),
  Subscription: Schema.optionalKey(
    Schema.Array(Subscription)
      .annotate({
        description:
          "The SNS subscriptions (endpoints) for this topic.\n  If you specify the ``Subscription`` property in the ``AWS::SNS::Topic`` resource and it creates an associated subscription resource, the associated subscription is not deleted when the ``AWS::SNS::Topic`` resource is deleted.",
      })
      .check(Schema.isUnique()),
  ),
  FifoTopic: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Set to true to create a FIFO topic.",
    }),
  ),
  ContentBasedDeduplication: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Enables content-based deduplication for FIFO topics.\n  +  By default, ``ContentBasedDeduplication`` is set to ``false``. If you create a FIFO topic and this attribute is ``false``, you must specify a value for the ``MessageDeduplicationId`` parameter for the [Publish](https://docs.aws.amazon.com/sns/latest/api/API_Publish.html) action. \n  +  When you set ``ContentBasedDeduplication`` to ``true``, SNS uses a SHA-256 hash to generate the ``MessageDeduplicationId`` using the body of the message (but not the attributes of the message).\n (Optional) To override the generated value, you can specify a value for the the ``MessageDeduplicationId`` parameter for the ``Publish`` action.",
    }),
  ),
  ArchivePolicy: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.Json).annotate({
      description:
        "The archive policy determines the number of days SNS retains messages. You can set a retention period from 1 to 365 days.",
    }),
  ),
  FifoThroughputScope: Schema.optionalKey(
    Schema.String.annotate({ description: "" }),
  ),
  Tags: Schema.optionalKey(
    Schema.Array(Tag)
      .annotate({
        description:
          "The list of tags to add to a new topic.\n  To be able to tag a topic on creation, you must have the ``sns:CreateTopic`` and ``sns:TagResource`` permissions.",
      })
      .check(Schema.isUnique()),
  ),
  TopicName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the topic you want to create. Topic names must include only uppercase and lowercase ASCII letters, numbers, underscores, and hyphens, and must be between 1 and 256 characters long. FIFO topic names must end with ``.fifo``.\n If you don't specify a name, CFN generates a unique physical ID and uses that ID for the topic name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html).\n  If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
    }),
  ),
  SignatureVersion: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The signature version corresponds to the hashing algorithm used while creating the signature of the notifications, subscription confirmations, or unsubscribe confirmation messages sent by Amazon SNS. By default, ``SignatureVersion`` is set to ``1``.",
    }),
  ),
  TracingConfig: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Tracing mode of an SNS topic. By default ``TracingConfig`` is set to ``PassThrough``, and the topic passes through the tracing header it receives from an SNS publisher to its subscriptions. If set to ``Active``, SNS will vend X-Ray segment data to topic owner account if the sampled flag in the tracing header is true.",
    }),
  ),
  DeliveryStatusLogging: Schema.optionalKey(
    Schema.Array(LoggingConfig)
      .annotate({
        description:
          "The ``DeliveryStatusLogging`` configuration enables you to log the delivery status of messages sent from your Amazon SNS topic to subscribed endpoints with the following supported delivery protocols:\n  +  HTTP \n  +  Amazon Kinesis Data Firehose\n  +   AWS Lambda\n  +  Platform application endpoint\n  +  Amazon Simple Queue Service\n  \n Once configured, log entries are sent to Amazon CloudWatch Logs.",
      })
      .check(Schema.isUnique()),
  ),
});

const TopicOutputsSource = Schema.Struct({
  TopicArn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
});

export const TopicResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "sns",
  resource: "topic",
  operation: "create",
  stateSecretOutputKeys: [],
});

export const TopicPropsSchema = annotateResourceSchema(
  TopicPropsSource,
  TopicResourceSchema,
);

export const TopicOutputsSchema = TopicOutputsSource;

export type TopicProps = Schema.Schema.Type<typeof TopicPropsSchema>;

export type TopicOutputs = Schema.Schema.Type<typeof TopicOutputsSchema>;

export type TopicLifecycle = {
  readonly resolvePendingOutputs: (input: {
    readonly key: ResourceKey;
    readonly props: TopicProps;
  }) => ReturnType<(typeof TopicOutputsSchema)["makeEffect"]>;
  readonly execute: (
    command: ResourceCommand,
  ) => ReturnType<(typeof ResourceCommandPolicy)["Service"]["execute"]>;
};

export const TopicLifecycleService = Context.Service<
  TopicLifecycle,
  TopicLifecycle
>("nomoss/providers/aws/generated/sns/topic/lifecycle");

export const registerTopic = Effect.fn("Topic.register")(function* (input: {
  readonly key: ResourceKey;
  readonly props: TopicProps;
}) {
  const graphResource = yield* (yield* ResourceGraphBuilder).resource(
    input.key,
  );
  const resourceProps = yield* TopicPropsSchema.makeEffect(input.props);
  const resourceOutputs =
    yield* (yield* TopicLifecycleService).resolvePendingOutputs({
      key: input.key,
      props: resourceProps,
    });
  yield* graphResource.register({
    propsSchema: TopicPropsSchema,
    outputsSchema: TopicOutputsSchema,
    props: resourceProps,
    outputs: resourceOutputs,
  });
  return { key: input.key, props: resourceProps, outputs: resourceOutputs };
});

export const TopicResourceCommandPolicyLayer = Layer.unwrap(
  Effect.map(TopicLifecycleService, (lifecycle) =>
    Layer.succeed(providerCommandPolicyTag(TopicResourceSchema), {
      execute: lifecycle.execute,
    }),
  ),
);
