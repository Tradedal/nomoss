import { Layer, Schema } from "effect";
import {
  QueueAttributeMap,
  sqsOperations,
  sqsService,
  TagMap,
} from "../../../client/generated/sqs.js";
import type { AwsAttributeResourceConfiguration } from "../../../management/resourceConfiguration.js";
import { awsResourcePolicyRegistration } from "../../../management/resourcePolicy.js";
import {
  AWSQueueRequestSchema,
  AWSQueueResourceSchema,
} from "./sqs/queue/index.js";

// Generated from verified AWS definitions and reviewed lifecycle mappings. Do not edit.
/**
 * The awsQueueResourceConfiguration configuration lets the policy validate
 * AWS::SQS::Queue declarations against Registry properties and native
 * requests against generated operation codecs. Its saved identity,
 * replacement rules, and attribute types govern runtime execution.
 */
export const awsQueueResourceConfiguration = {
  schema: AWSQueueResourceSchema,
  propsSchema: AWSQueueRequestSchema,
  attributeSchema: QueueAttributeMap,
  tagMapSchema: TagMap,
  tagsSchema: Schema.requiredKey(AWSQueueRequestSchema.fields.Tags),
  service: sqsService,
  mapping: {
    typeName: "AWS::SQS::Queue",
    operations: {
      create: "CreateQueue",
      read: "GetQueueAttributes",
      update: "SetQueueAttributes",
      remove: "DeleteQueue",
      readTags: "ListQueueTags",
      tag: "TagQueue",
      untag: "UntagQueue",
    },
    identity: {
      property: "QueueUrl",
      parameter: "QueueUrl",
    },
    name: {
      property: "QueueName",
      parameter: "QueueName",
      fifoProperty: "FifoQueue",
    },
    tags: {
      property: "Tags",
      createParameter: "tags",
      updateParameter: "Tags",
      removeParameter: "TagKeys",
      response: "Tags",
    },
    attributes: {
      ContentBasedDeduplication: {
        attribute: "ContentBasedDeduplication",
        reset: false,
      },
      DeduplicationScope: {
        attribute: "DeduplicationScope",
      },
      DelaySeconds: {
        attribute: "DelaySeconds",
        reset: 0,
      },
      FifoQueue: {
        attribute: "FifoQueue",
      },
      FifoThroughputLimit: {
        attribute: "FifoThroughputLimit",
      },
      KmsDataKeyReusePeriodSeconds: {
        attribute: "KmsDataKeyReusePeriodSeconds",
        reset: 300,
      },
      KmsMasterKeyId: {
        attribute: "KmsMasterKeyId",
      },
      SqsManagedSseEnabled: {
        attribute: "SqsManagedSseEnabled",
      },
      MaximumMessageSize: {
        attribute: "MaximumMessageSize",
        reset: 1048576,
      },
      MessageRetentionPeriod: {
        attribute: "MessageRetentionPeriod",
        reset: 345600,
      },
      ReceiveMessageWaitTimeSeconds: {
        attribute: "ReceiveMessageWaitTimeSeconds",
        reset: 0,
      },
      RedriveAllowPolicy: {
        attribute: "RedriveAllowPolicy",
        reset: "",
      },
      RedrivePolicy: {
        attribute: "RedrivePolicy",
        reset: "",
      },
      VisibilityTimeout: {
        attribute: "VisibilityTimeout",
        reset: 30,
      },
    },
    outputAttributes: {
      Arn: "QueueArn",
    },
    missingErrors: [
      "QueueDoesNotExist",
      "AWS.SimpleQueueService.NonExistentQueue",
    ],
    readAttributeNames: ["All"],
  },
  encodings: {
    ContentBasedDeduplication: "json",
    DeduplicationScope: "string",
    DelaySeconds: "json",
    FifoQueue: "json",
    FifoThroughputLimit: "string",
    KmsDataKeyReusePeriodSeconds: "json",
    KmsMasterKeyId: "string",
    SqsManagedSseEnabled: "json",
    MaximumMessageSize: "json",
    MessageRetentionPeriod: "json",
    ReceiveMessageWaitTimeSeconds: "json",
    RedriveAllowPolicy: "json",
    RedrivePolicy: "json",
    VisibilityTimeout: "json",
  },
  createOnlyProperties: ["FifoQueue", "QueueName"],
  operations: {
    create: sqsOperations.CreateQueue,
    read: sqsOperations.GetQueueAttributes,
    update: sqsOperations.SetQueueAttributes,
    remove: sqsOperations.DeleteQueue,
    readTags: sqsOperations.ListQueueTags,
    tag: sqsOperations.TagQueue,
    untag: sqsOperations.UntagQueue,
  },
} satisfies AwsAttributeResourceConfiguration;
/**
 * The awsNativeResourceCommandLayer Layer supplies generated resource
 * commands to the application's shared runtime. Declaration and execution
 * share ResourceModel; the provider supplies the AWS client and digest.
 */
export const awsNativeResourceCommandLayer = Layer.mergeAll(
  awsResourcePolicyRegistration(awsQueueResourceConfiguration),
);
