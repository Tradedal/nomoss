// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";
import { AwsClient } from "../awsClient.js";
import type {
  AwsJsonRpcOperation,
  AwsServiceDefinition,
} from "../awsClientModel.js";
import { awsJsonRpcEmptyOutput } from "../awsHttpOperation.js";

export const ChangeMessageVisibilityBatchRequestEntry = Schema.StructWithRest(
  Schema.Struct({
    Id: Schema.String,
    ReceiptHandle: Schema.String,
    VisibilityTimeout: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ChangeMessageVisibilityBatchRequestEntry" });

export type ChangeMessageVisibilityBatchRequestEntry =
  typeof ChangeMessageVisibilityBatchRequestEntry.Type;

export const ChangeMessageVisibilityBatchResultEntry = Schema.StructWithRest(
  Schema.Struct({ Id: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ChangeMessageVisibilityBatchResultEntry" });

export type ChangeMessageVisibilityBatchResultEntry =
  typeof ChangeMessageVisibilityBatchResultEntry.Type;

export const BatchResultErrorEntry = Schema.StructWithRest(
  Schema.Struct({
    Id: Schema.String,
    SenderFault: Schema.Boolean.annotate({ default: false }),
    Code: Schema.String,
    Message: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "BatchResultErrorEntry" });

export type BatchResultErrorEntry = typeof BatchResultErrorEntry.Type;

export const QueueAttributeMap = Schema.Record(
  Schema.String,
  Schema.String,
).check(
  Schema.isPropertyNames(
    Schema.Literals([
      "All",
      "Policy",
      "VisibilityTimeout",
      "MaximumMessageSize",
      "MessageRetentionPeriod",
      "ApproximateNumberOfMessages",
      "ApproximateNumberOfMessagesNotVisible",
      "CreatedTimestamp",
      "LastModifiedTimestamp",
      "QueueArn",
      "ApproximateNumberOfMessagesDelayed",
      "DelaySeconds",
      "ReceiveMessageWaitTimeSeconds",
      "RedrivePolicy",
      "FifoQueue",
      "ContentBasedDeduplication",
      "KmsMasterKeyId",
      "KmsDataKeyReusePeriodSeconds",
      "DeduplicationScope",
      "FifoThroughputLimit",
      "RedriveAllowPolicy",
      "SqsManagedSseEnabled",
    ]),
  ).annotate({
    expected: "an object with property names matching the schema",
    identifier: "QueueAttributeMap",
  }),
);

export type QueueAttributeMap = typeof QueueAttributeMap.Type;

export const TagMap = Schema.Record(Schema.String, Schema.String).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "TagMap",
  }),
);

export type TagMap = typeof TagMap.Type;

export const DeleteMessageBatchRequestEntry = Schema.StructWithRest(
  Schema.Struct({ Id: Schema.String, ReceiptHandle: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "DeleteMessageBatchRequestEntry" });

export type DeleteMessageBatchRequestEntry =
  typeof DeleteMessageBatchRequestEntry.Type;

export const DeleteMessageBatchResultEntry = Schema.StructWithRest(
  Schema.Struct({ Id: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "DeleteMessageBatchResultEntry" });

export type DeleteMessageBatchResultEntry =
  typeof DeleteMessageBatchResultEntry.Type;

export const QueueAttributeName = Schema.Literals([
  "All",
  "Policy",
  "VisibilityTimeout",
  "MaximumMessageSize",
  "MessageRetentionPeriod",
  "ApproximateNumberOfMessages",
  "ApproximateNumberOfMessagesNotVisible",
  "CreatedTimestamp",
  "LastModifiedTimestamp",
  "QueueArn",
  "ApproximateNumberOfMessagesDelayed",
  "DelaySeconds",
  "ReceiveMessageWaitTimeSeconds",
  "RedrivePolicy",
  "FifoQueue",
  "ContentBasedDeduplication",
  "KmsMasterKeyId",
  "KmsDataKeyReusePeriodSeconds",
  "DeduplicationScope",
  "FifoThroughputLimit",
  "RedriveAllowPolicy",
  "SqsManagedSseEnabled",
]).annotate({ identifier: "QueueAttributeName" });

export type QueueAttributeName = typeof QueueAttributeName.Type;

export const ListMessageMoveTasksResultEntry = Schema.StructWithRest(
  Schema.Struct({
    TaskHandle: Schema.optionalKey(Schema.String),
    Status: Schema.optionalKey(Schema.String),
    SourceArn: Schema.optionalKey(Schema.String),
    DestinationArn: Schema.optionalKey(Schema.String),
    MaxNumberOfMessagesPerSecond: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    ApproximateNumberOfMessagesMoved: Schema.optionalKey(
      Schema.Number.annotate({ default: 0, format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    ApproximateNumberOfMessagesToMove: Schema.optionalKey(
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    FailureReason: Schema.optionalKey(Schema.String),
    StartedTimestamp: Schema.optionalKey(
      Schema.Number.annotate({ default: 0, format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ListMessageMoveTasksResultEntry" });

export type ListMessageMoveTasksResultEntry =
  typeof ListMessageMoveTasksResultEntry.Type;

export const MessageSystemAttributeName = Schema.Literals([
  "All",
  "SenderId",
  "SentTimestamp",
  "ApproximateReceiveCount",
  "ApproximateFirstReceiveTimestamp",
  "SequenceNumber",
  "MessageDeduplicationId",
  "MessageGroupId",
  "AWSTraceHeader",
  "DeadLetterQueueSourceArn",
]).annotate({ identifier: "MessageSystemAttributeName" });

export type MessageSystemAttributeName = typeof MessageSystemAttributeName.Type;

export const MessageSystemAttributeMap = Schema.Record(
  Schema.String,
  Schema.String,
).check(
  Schema.isPropertyNames(
    Schema.Literals([
      "All",
      "SenderId",
      "SentTimestamp",
      "ApproximateReceiveCount",
      "ApproximateFirstReceiveTimestamp",
      "SequenceNumber",
      "MessageDeduplicationId",
      "MessageGroupId",
      "AWSTraceHeader",
      "DeadLetterQueueSourceArn",
    ]),
  ).annotate({
    expected: "an object with property names matching the schema",
    identifier: "MessageSystemAttributeMap",
  }),
);

export type MessageSystemAttributeMap = typeof MessageSystemAttributeMap.Type;

export const MessageAttributeValue = Schema.StructWithRest(
  Schema.Struct({
    StringValue: Schema.optionalKey(Schema.String),
    BinaryValue: Schema.optionalKey(
      Schema.String.annotate({ contentEncoding: "byte" }),
    ),
    StringListValues: Schema.optionalKey(Schema.Array(Schema.String)),
    BinaryListValues: Schema.optionalKey(
      Schema.Array(Schema.String.annotate({ contentEncoding: "byte" })),
    ),
    DataType: Schema.String,
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "MessageAttributeValue" });

export type MessageAttributeValue = typeof MessageAttributeValue.Type;

export const MessageSystemAttributeValue = Schema.StructWithRest(
  Schema.Struct({
    StringValue: Schema.optionalKey(Schema.String),
    BinaryValue: Schema.optionalKey(
      Schema.String.annotate({ contentEncoding: "byte" }),
    ),
    StringListValues: Schema.optionalKey(Schema.Array(Schema.String)),
    BinaryListValues: Schema.optionalKey(
      Schema.Array(Schema.String.annotate({ contentEncoding: "byte" })),
    ),
    DataType: Schema.String,
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "MessageSystemAttributeValue" });

export type MessageSystemAttributeValue =
  typeof MessageSystemAttributeValue.Type;

export const SendMessageBatchResultEntry = Schema.StructWithRest(
  Schema.Struct({
    Id: Schema.String,
    MessageId: Schema.String,
    MD5OfMessageBody: Schema.String,
    MD5OfMessageAttributes: Schema.optionalKey(Schema.String),
    MD5OfMessageSystemAttributes: Schema.optionalKey(Schema.String),
    SequenceNumber: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "SendMessageBatchResultEntry" });

export type SendMessageBatchResultEntry =
  typeof SendMessageBatchResultEntry.Type;

export const MessageBodyAttributeMap = Schema.Record(
  Schema.String,
  MessageAttributeValue,
).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "MessageBodyAttributeMap",
  }),
);

export type MessageBodyAttributeMap = typeof MessageBodyAttributeMap.Type;

export const MessageBodySystemAttributeMap = Schema.Record(
  Schema.String,
  MessageSystemAttributeValue,
).check(
  Schema.isPropertyNames(Schema.Literal("AWSTraceHeader")).annotate({
    expected: "an object with property names matching the schema",
    identifier: "MessageBodySystemAttributeMap",
  }),
);

export type MessageBodySystemAttributeMap =
  typeof MessageBodySystemAttributeMap.Type;

export const Message = Schema.StructWithRest(
  Schema.Struct({
    MessageId: Schema.optionalKey(Schema.String),
    ReceiptHandle: Schema.optionalKey(Schema.String),
    MD5OfBody: Schema.optionalKey(Schema.String),
    Body: Schema.optionalKey(Schema.String),
    Attributes: Schema.optionalKey(MessageSystemAttributeMap),
    MD5OfMessageAttributes: Schema.optionalKey(Schema.String),
    MessageAttributes: Schema.optionalKey(MessageBodyAttributeMap),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Message" });

export type Message = typeof Message.Type;

export const SendMessageBatchRequestEntry = Schema.StructWithRest(
  Schema.Struct({
    Id: Schema.String,
    MessageBody: Schema.String,
    DelaySeconds: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    MessageAttributes: Schema.optionalKey(MessageBodyAttributeMap),
    MessageSystemAttributes: Schema.optionalKey(MessageBodySystemAttributeMap),
    MessageDeduplicationId: Schema.optionalKey(Schema.String),
    MessageGroupId: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "SendMessageBatchRequestEntry" });

export type SendMessageBatchRequestEntry =
  typeof SendMessageBatchRequestEntry.Type;

export const AddPermissionRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    Label: Schema.String,
    AWSAccountIds: Schema.Array(Schema.String),
    Actions: Schema.Array(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AddPermissionRequest = typeof AddPermissionRequest.Type;

export const QueueDoesNotExist = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type QueueDoesNotExist = typeof QueueDoesNotExist.Type;

export const UnsupportedOperation = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UnsupportedOperation = typeof UnsupportedOperation.Type;

export const InvalidSecurity = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidSecurity = typeof InvalidSecurity.Type;

export const OverLimit = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type OverLimit = typeof OverLimit.Type;

export const RequestThrottled = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type RequestThrottled = typeof RequestThrottled.Type;

export const InvalidAddress = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidAddress = typeof InvalidAddress.Type;

export const CancelMessageMoveTaskRequest = Schema.StructWithRest(
  Schema.Struct({ TaskHandle: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CancelMessageMoveTaskRequest =
  typeof CancelMessageMoveTaskRequest.Type;

export const CancelMessageMoveTaskResult = Schema.StructWithRest(
  Schema.Struct({
    ApproximateNumberOfMessagesMoved: Schema.optionalKey(
      Schema.Number.annotate({ default: 0, format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CancelMessageMoveTaskResult =
  typeof CancelMessageMoveTaskResult.Type;

export const ResourceNotFoundException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ResourceNotFoundException = typeof ResourceNotFoundException.Type;

export const ChangeMessageVisibilityRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    ReceiptHandle: Schema.String,
    VisibilityTimeout: Schema.Number.annotate({ format: "int32" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ChangeMessageVisibilityRequest =
  typeof ChangeMessageVisibilityRequest.Type;

export const MessageNotInflight = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
);

export type MessageNotInflight = typeof MessageNotInflight.Type;

export const ReceiptHandleIsInvalid = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ReceiptHandleIsInvalid = typeof ReceiptHandleIsInvalid.Type;

export const ChangeMessageVisibilityBatchRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    Entries: Schema.Array(ChangeMessageVisibilityBatchRequestEntry),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ChangeMessageVisibilityBatchRequest =
  typeof ChangeMessageVisibilityBatchRequest.Type;

export const ChangeMessageVisibilityBatchResult = Schema.StructWithRest(
  Schema.Struct({
    Successful: Schema.Array(ChangeMessageVisibilityBatchResultEntry),
    Failed: Schema.Array(BatchResultErrorEntry),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ChangeMessageVisibilityBatchResult =
  typeof ChangeMessageVisibilityBatchResult.Type;

export const BatchEntryIdsNotDistinct = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type BatchEntryIdsNotDistinct = typeof BatchEntryIdsNotDistinct.Type;

export const EmptyBatchRequest = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type EmptyBatchRequest = typeof EmptyBatchRequest.Type;

export const InvalidBatchEntryId = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidBatchEntryId = typeof InvalidBatchEntryId.Type;

export const TooManyEntriesInBatchRequest = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TooManyEntriesInBatchRequest =
  typeof TooManyEntriesInBatchRequest.Type;

export const CreateQueueRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueName: Schema.String,
    Attributes: Schema.optionalKey(QueueAttributeMap),
    tags: Schema.optionalKey(TagMap),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateQueueRequest = typeof CreateQueueRequest.Type;

export const CreateQueueResult = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateQueueResult = typeof CreateQueueResult.Type;

export const InvalidAttributeName = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidAttributeName = typeof InvalidAttributeName.Type;

export const InvalidAttributeValue = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidAttributeValue = typeof InvalidAttributeValue.Type;

export const QueueDeletedRecently = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type QueueDeletedRecently = typeof QueueDeletedRecently.Type;

export const QueueNameExists = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type QueueNameExists = typeof QueueNameExists.Type;

export const DeleteMessageRequest = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.String, ReceiptHandle: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteMessageRequest = typeof DeleteMessageRequest.Type;

export const InvalidIdFormat = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
);

export type InvalidIdFormat = typeof InvalidIdFormat.Type;

export const DeleteMessageBatchRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    Entries: Schema.Array(DeleteMessageBatchRequestEntry),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteMessageBatchRequest = typeof DeleteMessageBatchRequest.Type;

export const DeleteMessageBatchResult = Schema.StructWithRest(
  Schema.Struct({
    Successful: Schema.Array(DeleteMessageBatchResultEntry),
    Failed: Schema.Array(BatchResultErrorEntry),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteMessageBatchResult = typeof DeleteMessageBatchResult.Type;

export const DeleteQueueRequest = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteQueueRequest = typeof DeleteQueueRequest.Type;

export const GetQueueAttributesRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    AttributeNames: Schema.optionalKey(Schema.Array(QueueAttributeName)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetQueueAttributesRequest = typeof GetQueueAttributesRequest.Type;

export const GetQueueAttributesResult = Schema.StructWithRest(
  Schema.Struct({ Attributes: Schema.optionalKey(QueueAttributeMap) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetQueueAttributesResult = typeof GetQueueAttributesResult.Type;

export const GetQueueUrlRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueName: Schema.String,
    QueueOwnerAWSAccountId: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetQueueUrlRequest = typeof GetQueueUrlRequest.Type;

export const GetQueueUrlResult = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetQueueUrlResult = typeof GetQueueUrlResult.Type;

export const ListDeadLetterSourceQueuesRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    NextToken: Schema.optionalKey(Schema.String),
    MaxResults: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListDeadLetterSourceQueuesRequest =
  typeof ListDeadLetterSourceQueuesRequest.Type;

export const ListDeadLetterSourceQueuesResult = Schema.StructWithRest(
  Schema.Struct({
    queueUrls: Schema.Array(Schema.String),
    NextToken: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListDeadLetterSourceQueuesResult =
  typeof ListDeadLetterSourceQueuesResult.Type;

export const ListMessageMoveTasksRequest = Schema.StructWithRest(
  Schema.Struct({
    SourceArn: Schema.String,
    MaxResults: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListMessageMoveTasksRequest =
  typeof ListMessageMoveTasksRequest.Type;

export const ListMessageMoveTasksResult = Schema.StructWithRest(
  Schema.Struct({
    Results: Schema.optionalKey(Schema.Array(ListMessageMoveTasksResultEntry)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListMessageMoveTasksResult = typeof ListMessageMoveTasksResult.Type;

export const ListQueueTagsRequest = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListQueueTagsRequest = typeof ListQueueTagsRequest.Type;

export const ListQueueTagsResult = Schema.StructWithRest(
  Schema.Struct({ Tags: Schema.optionalKey(TagMap) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListQueueTagsResult = typeof ListQueueTagsResult.Type;

export const ListQueuesRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueNamePrefix: Schema.optionalKey(Schema.String),
    NextToken: Schema.optionalKey(Schema.String),
    MaxResults: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListQueuesRequest = typeof ListQueuesRequest.Type;

export const ListQueuesResult = Schema.StructWithRest(
  Schema.Struct({
    QueueUrls: Schema.optionalKey(Schema.Array(Schema.String)),
    NextToken: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListQueuesResult = typeof ListQueuesResult.Type;

export const PurgeQueueRequest = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PurgeQueueRequest = typeof PurgeQueueRequest.Type;

export const PurgeQueueInProgress = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PurgeQueueInProgress = typeof PurgeQueueInProgress.Type;

export const ReceiveMessageRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    AttributeNames: Schema.optionalKey(Schema.Array(QueueAttributeName)),
    MessageSystemAttributeNames: Schema.optionalKey(
      Schema.Array(MessageSystemAttributeName),
    ),
    MessageAttributeNames: Schema.optionalKey(Schema.Array(Schema.String)),
    MaxNumberOfMessages: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    VisibilityTimeout: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    WaitTimeSeconds: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    ReceiveRequestAttemptId: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ReceiveMessageRequest = typeof ReceiveMessageRequest.Type;

export const ReceiveMessageResult = Schema.StructWithRest(
  Schema.Struct({ Messages: Schema.optionalKey(Schema.Array(Message)) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ReceiveMessageResult = typeof ReceiveMessageResult.Type;

export const KmsAccessDenied = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsAccessDenied = typeof KmsAccessDenied.Type;

export const KmsDisabled = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsDisabled = typeof KmsDisabled.Type;

export const KmsInvalidKeyUsage = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsInvalidKeyUsage = typeof KmsInvalidKeyUsage.Type;

export const KmsInvalidState = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsInvalidState = typeof KmsInvalidState.Type;

export const KmsNotFound = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsNotFound = typeof KmsNotFound.Type;

export const KmsThrottled = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsThrottled = typeof KmsThrottled.Type;

export const KmsOptInRequired = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsOptInRequired = typeof KmsOptInRequired.Type;

export const RemovePermissionRequest = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.String, Label: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type RemovePermissionRequest = typeof RemovePermissionRequest.Type;

export const SendMessageRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    MessageBody: Schema.String,
    DelaySeconds: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
    MessageAttributes: Schema.optionalKey(MessageBodyAttributeMap),
    MessageSystemAttributes: Schema.optionalKey(MessageBodySystemAttributeMap),
    MessageDeduplicationId: Schema.optionalKey(Schema.String),
    MessageGroupId: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type SendMessageRequest = typeof SendMessageRequest.Type;

export const SendMessageResult = Schema.StructWithRest(
  Schema.Struct({
    MD5OfMessageBody: Schema.optionalKey(Schema.String),
    MD5OfMessageAttributes: Schema.optionalKey(Schema.String),
    MD5OfMessageSystemAttributes: Schema.optionalKey(Schema.String),
    MessageId: Schema.optionalKey(Schema.String),
    SequenceNumber: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type SendMessageResult = typeof SendMessageResult.Type;

export const InvalidMessageContents = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidMessageContents = typeof InvalidMessageContents.Type;

export const SendMessageBatchRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    Entries: Schema.Array(SendMessageBatchRequestEntry),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type SendMessageBatchRequest = typeof SendMessageBatchRequest.Type;

export const SendMessageBatchResult = Schema.StructWithRest(
  Schema.Struct({
    Successful: Schema.Array(SendMessageBatchResultEntry),
    Failed: Schema.Array(BatchResultErrorEntry),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type SendMessageBatchResult = typeof SendMessageBatchResult.Type;

export const BatchRequestTooLong = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type BatchRequestTooLong = typeof BatchRequestTooLong.Type;

export const SetQueueAttributesRequest = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.String, Attributes: QueueAttributeMap }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type SetQueueAttributesRequest = typeof SetQueueAttributesRequest.Type;

export const StartMessageMoveTaskRequest = Schema.StructWithRest(
  Schema.Struct({
    SourceArn: Schema.String,
    DestinationArn: Schema.optionalKey(Schema.String),
    MaxNumberOfMessagesPerSecond: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type StartMessageMoveTaskRequest =
  typeof StartMessageMoveTaskRequest.Type;

export const StartMessageMoveTaskResult = Schema.StructWithRest(
  Schema.Struct({ TaskHandle: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type StartMessageMoveTaskResult = typeof StartMessageMoveTaskResult.Type;

export const TagQueueRequest = Schema.StructWithRest(
  Schema.Struct({ QueueUrl: Schema.String, Tags: TagMap }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagQueueRequest = typeof TagQueueRequest.Type;

export const UntagQueueRequest = Schema.StructWithRest(
  Schema.Struct({
    QueueUrl: Schema.String,
    TagKeys: Schema.Array(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagQueueRequest = typeof UntagQueueRequest.Type;

export const sqsErrors = {
  QueueDoesNotExist: {
    name: "QueueDoesNotExist",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.NonExistentQueue",
    schema: QueueDoesNotExist,
  },
  UnsupportedOperation: {
    name: "UnsupportedOperation",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.UnsupportedOperation",
    schema: UnsupportedOperation,
  },
  InvalidSecurity: {
    name: "InvalidSecurity",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "InvalidSecurity",
    schema: InvalidSecurity,
  },
  OverLimit: {
    name: "OverLimit",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "OverLimit",
    schema: OverLimit,
  },
  RequestThrottled: {
    name: "RequestThrottled",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "RequestThrottled",
    schema: RequestThrottled,
  },
  InvalidAddress: {
    name: "InvalidAddress",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    code: "InvalidAddress",
    schema: InvalidAddress,
  },
  ResourceNotFoundException: {
    name: "ResourceNotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    code: "ResourceNotFoundException",
    schema: ResourceNotFoundException,
  },
  MessageNotInflight: {
    name: "MessageNotInflight",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.MessageNotInflight",
    schema: MessageNotInflight,
  },
  ReceiptHandleIsInvalid: {
    name: "ReceiptHandleIsInvalid",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    code: "ReceiptHandleIsInvalid",
    schema: ReceiptHandleIsInvalid,
  },
  BatchEntryIdsNotDistinct: {
    name: "BatchEntryIdsNotDistinct",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.BatchEntryIdsNotDistinct",
    schema: BatchEntryIdsNotDistinct,
  },
  EmptyBatchRequest: {
    name: "EmptyBatchRequest",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.EmptyBatchRequest",
    schema: EmptyBatchRequest,
  },
  InvalidBatchEntryId: {
    name: "InvalidBatchEntryId",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.InvalidBatchEntryId",
    schema: InvalidBatchEntryId,
  },
  TooManyEntriesInBatchRequest: {
    name: "TooManyEntriesInBatchRequest",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.TooManyEntriesInBatchRequest",
    schema: TooManyEntriesInBatchRequest,
  },
  InvalidAttributeName: {
    name: "InvalidAttributeName",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidAttributeName,
  },
  InvalidAttributeValue: {
    name: "InvalidAttributeValue",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidAttributeValue,
  },
  QueueDeletedRecently: {
    name: "QueueDeletedRecently",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.QueueDeletedRecently",
    schema: QueueDeletedRecently,
  },
  QueueNameExists: {
    name: "QueueNameExists",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "QueueAlreadyExists",
    schema: QueueNameExists,
  },
  InvalidIdFormat: {
    name: "InvalidIdFormat",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidIdFormat,
  },
  PurgeQueueInProgress: {
    name: "PurgeQueueInProgress",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "AWS.SimpleQueueService.PurgeQueueInProgress",
    schema: PurgeQueueInProgress,
  },
  KmsAccessDenied: {
    name: "KmsAccessDenied",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "KMS.AccessDeniedException",
    schema: KmsAccessDenied,
  },
  KmsDisabled: {
    name: "KmsDisabled",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "KMS.DisabledException",
    schema: KmsDisabled,
  },
  KmsInvalidKeyUsage: {
    name: "KmsInvalidKeyUsage",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "KMS.InvalidKeyUsageException",
    schema: KmsInvalidKeyUsage,
  },
  KmsInvalidState: {
    name: "KmsInvalidState",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "KMS.InvalidStateException",
    schema: KmsInvalidState,
  },
  KmsNotFound: {
    name: "KmsNotFound",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "KMS.NotFoundException",
    schema: KmsNotFound,
  },
  KmsThrottled: {
    name: "KmsThrottled",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "KMS.ThrottlingException",
    schema: KmsThrottled,
  },
  KmsOptInRequired: {
    name: "KmsOptInRequired",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "KMS.OptInRequired",
    schema: KmsOptInRequired,
  },
  InvalidMessageContents: {
    name: "InvalidMessageContents",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidMessageContents,
  },
  BatchRequestTooLong: {
    name: "BatchRequestTooLong",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AWS.SimpleQueueService.BatchRequestTooLong",
    schema: BatchRequestTooLong,
  },
};

export const addPermissionErrors = [
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.OverLimit,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const cancelMessageMoveTaskErrors = [
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
  sqsErrors.ResourceNotFoundException,
];

export const changeMessageVisibilityErrors = [
  sqsErrors.MessageNotInflight,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
  sqsErrors.ReceiptHandleIsInvalid,
];

export const changeMessageVisibilityBatchErrors = [
  sqsErrors.BatchEntryIdsNotDistinct,
  sqsErrors.EmptyBatchRequest,
  sqsErrors.InvalidBatchEntryId,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.TooManyEntriesInBatchRequest,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const createQueueErrors = [
  sqsErrors.InvalidAttributeName,
  sqsErrors.InvalidAttributeValue,
  sqsErrors.QueueDeletedRecently,
  sqsErrors.QueueNameExists,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const deleteMessageErrors = [
  sqsErrors.InvalidIdFormat,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
  sqsErrors.ReceiptHandleIsInvalid,
];

export const deleteQueueErrors = [
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const getQueueAttributesErrors = [
  sqsErrors.InvalidAttributeName,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const listQueuesErrors = [
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const purgeQueueErrors = [
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.PurgeQueueInProgress,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const receiveMessageErrors = [
  sqsErrors.KmsAccessDenied,
  sqsErrors.KmsDisabled,
  sqsErrors.KmsInvalidKeyUsage,
  sqsErrors.KmsInvalidState,
  sqsErrors.KmsNotFound,
  sqsErrors.KmsThrottled,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.KmsOptInRequired,
  sqsErrors.OverLimit,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const sendMessageErrors = [
  sqsErrors.InvalidMessageContents,
  sqsErrors.KmsAccessDenied,
  sqsErrors.KmsDisabled,
  sqsErrors.KmsInvalidKeyUsage,
  sqsErrors.KmsInvalidState,
  sqsErrors.KmsNotFound,
  sqsErrors.KmsThrottled,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.KmsOptInRequired,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const sendMessageBatchErrors = [
  sqsErrors.BatchEntryIdsNotDistinct,
  sqsErrors.BatchRequestTooLong,
  sqsErrors.EmptyBatchRequest,
  sqsErrors.InvalidBatchEntryId,
  sqsErrors.KmsAccessDenied,
  sqsErrors.KmsDisabled,
  sqsErrors.KmsInvalidKeyUsage,
  sqsErrors.KmsInvalidState,
  sqsErrors.KmsNotFound,
  sqsErrors.KmsThrottled,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.TooManyEntriesInBatchRequest,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.KmsOptInRequired,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const setQueueAttributesErrors = [
  sqsErrors.InvalidAttributeName,
  sqsErrors.InvalidAttributeValue,
  sqsErrors.QueueDoesNotExist,
  sqsErrors.UnsupportedOperation,
  sqsErrors.InvalidSecurity,
  sqsErrors.OverLimit,
  sqsErrors.RequestThrottled,
  sqsErrors.InvalidAddress,
];

export const AddPermissionOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const addPermissionOperation: AwsJsonRpcOperation & {
  readonly input: typeof AddPermissionRequest;
  readonly output: typeof AddPermissionOutput;
} = {
  name: "AddPermission",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.AddPermission",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: AddPermissionRequest,
  output: AddPermissionOutput,
  errors: addPermissionErrors,
};

export const addPermissionEndpoint = HttpApiEndpoint.make("POST")(
  "AddPermission",
  "/",
  {
    payload: AddPermissionRequest,
    success: AddPermissionOutput,
  },
);

export const cancelMessageMoveTaskOperation: AwsJsonRpcOperation & {
  readonly input: typeof CancelMessageMoveTaskRequest;
  readonly output: typeof CancelMessageMoveTaskResult;
} = {
  name: "CancelMessageMoveTask",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.CancelMessageMoveTask",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: CancelMessageMoveTaskRequest,
  output: CancelMessageMoveTaskResult,
  errors: cancelMessageMoveTaskErrors,
};

export const cancelMessageMoveTaskEndpoint = HttpApiEndpoint.make("POST")(
  "CancelMessageMoveTask",
  "/",
  {
    payload: CancelMessageMoveTaskRequest,
    success: CancelMessageMoveTaskResult,
  },
);

export const ChangeMessageVisibilityOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const changeMessageVisibilityOperation: AwsJsonRpcOperation & {
  readonly input: typeof ChangeMessageVisibilityRequest;
  readonly output: typeof ChangeMessageVisibilityOutput;
} = {
  name: "ChangeMessageVisibility",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.ChangeMessageVisibility",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: ChangeMessageVisibilityRequest,
  output: ChangeMessageVisibilityOutput,
  errors: changeMessageVisibilityErrors,
};

export const changeMessageVisibilityEndpoint = HttpApiEndpoint.make("POST")(
  "ChangeMessageVisibility",
  "/",
  {
    payload: ChangeMessageVisibilityRequest,
    success: ChangeMessageVisibilityOutput,
  },
);

export const changeMessageVisibilityBatchOperation: AwsJsonRpcOperation & {
  readonly input: typeof ChangeMessageVisibilityBatchRequest;
  readonly output: typeof ChangeMessageVisibilityBatchResult;
} = {
  name: "ChangeMessageVisibilityBatch",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.ChangeMessageVisibilityBatch",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: ChangeMessageVisibilityBatchRequest,
  output: ChangeMessageVisibilityBatchResult,
  errors: changeMessageVisibilityBatchErrors,
};

export const changeMessageVisibilityBatchEndpoint = HttpApiEndpoint.make(
  "POST",
)("ChangeMessageVisibilityBatch", "/", {
  payload: ChangeMessageVisibilityBatchRequest,
  success: ChangeMessageVisibilityBatchResult,
});

export const createQueueOperation: AwsJsonRpcOperation & {
  readonly input: typeof CreateQueueRequest;
  readonly output: typeof CreateQueueResult;
} = {
  name: "CreateQueue",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.CreateQueue",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: CreateQueueRequest,
  output: CreateQueueResult,
  errors: createQueueErrors,
};

export const createQueueEndpoint = HttpApiEndpoint.make("POST")(
  "CreateQueue",
  "/",
  {
    payload: CreateQueueRequest,
    success: CreateQueueResult,
  },
);

export const DeleteMessageOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const deleteMessageOperation: AwsJsonRpcOperation & {
  readonly input: typeof DeleteMessageRequest;
  readonly output: typeof DeleteMessageOutput;
} = {
  name: "DeleteMessage",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.DeleteMessage",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteMessageRequest,
  output: DeleteMessageOutput,
  errors: deleteMessageErrors,
};

export const deleteMessageEndpoint = HttpApiEndpoint.make("POST")(
  "DeleteMessage",
  "/",
  {
    payload: DeleteMessageRequest,
    success: DeleteMessageOutput,
  },
);

export const deleteMessageBatchOperation: AwsJsonRpcOperation & {
  readonly input: typeof DeleteMessageBatchRequest;
  readonly output: typeof DeleteMessageBatchResult;
} = {
  name: "DeleteMessageBatch",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.DeleteMessageBatch",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteMessageBatchRequest,
  output: DeleteMessageBatchResult,
  errors: changeMessageVisibilityBatchErrors,
};

export const deleteMessageBatchEndpoint = HttpApiEndpoint.make("POST")(
  "DeleteMessageBatch",
  "/",
  {
    payload: DeleteMessageBatchRequest,
    success: DeleteMessageBatchResult,
  },
);

export const DeleteQueueOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const deleteQueueOperation: AwsJsonRpcOperation & {
  readonly input: typeof DeleteQueueRequest;
  readonly output: typeof DeleteQueueOutput;
} = {
  name: "DeleteQueue",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.DeleteQueue",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteQueueRequest,
  output: DeleteQueueOutput,
  errors: deleteQueueErrors,
};

export const deleteQueueEndpoint = HttpApiEndpoint.make("POST")(
  "DeleteQueue",
  "/",
  {
    payload: DeleteQueueRequest,
    success: DeleteQueueOutput,
  },
);

export const getQueueAttributesOperation: AwsJsonRpcOperation & {
  readonly input: typeof GetQueueAttributesRequest;
  readonly output: typeof GetQueueAttributesResult;
} = {
  name: "GetQueueAttributes",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.GetQueueAttributes",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: GetQueueAttributesRequest,
  output: GetQueueAttributesResult,
  errors: getQueueAttributesErrors,
};

export const getQueueAttributesEndpoint = HttpApiEndpoint.make("POST")(
  "GetQueueAttributes",
  "/",
  {
    payload: GetQueueAttributesRequest,
    success: GetQueueAttributesResult,
  },
);

export const getQueueUrlOperation: AwsJsonRpcOperation & {
  readonly input: typeof GetQueueUrlRequest;
  readonly output: typeof GetQueueUrlResult;
} = {
  name: "GetQueueUrl",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.GetQueueUrl",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: GetQueueUrlRequest,
  output: GetQueueUrlResult,
  errors: deleteQueueErrors,
};

export const getQueueUrlEndpoint = HttpApiEndpoint.make("POST")(
  "GetQueueUrl",
  "/",
  {
    payload: GetQueueUrlRequest,
    success: GetQueueUrlResult,
  },
);

export const listDeadLetterSourceQueuesOperation: AwsJsonRpcOperation & {
  readonly input: typeof ListDeadLetterSourceQueuesRequest;
  readonly output: typeof ListDeadLetterSourceQueuesResult;
} = {
  name: "ListDeadLetterSourceQueues",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.ListDeadLetterSourceQueues",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "queueUrls",
    pageSize: "MaxResults",
  },
  waiters: {},
  input: ListDeadLetterSourceQueuesRequest,
  output: ListDeadLetterSourceQueuesResult,
  errors: deleteQueueErrors,
};

export const listDeadLetterSourceQueuesEndpoint = HttpApiEndpoint.make("POST")(
  "ListDeadLetterSourceQueues",
  "/",
  {
    payload: ListDeadLetterSourceQueuesRequest,
    success: ListDeadLetterSourceQueuesResult,
  },
);

export const listMessageMoveTasksOperation: AwsJsonRpcOperation & {
  readonly input: typeof ListMessageMoveTasksRequest;
  readonly output: typeof ListMessageMoveTasksResult;
} = {
  name: "ListMessageMoveTasks",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.ListMessageMoveTasks",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: ListMessageMoveTasksRequest,
  output: ListMessageMoveTasksResult,
  errors: cancelMessageMoveTaskErrors,
};

export const listMessageMoveTasksEndpoint = HttpApiEndpoint.make("POST")(
  "ListMessageMoveTasks",
  "/",
  {
    payload: ListMessageMoveTasksRequest,
    success: ListMessageMoveTasksResult,
  },
);

export const listQueueTagsOperation: AwsJsonRpcOperation & {
  readonly input: typeof ListQueueTagsRequest;
  readonly output: typeof ListQueueTagsResult;
} = {
  name: "ListQueueTags",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.ListQueueTags",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: ListQueueTagsRequest,
  output: ListQueueTagsResult,
  errors: deleteQueueErrors,
};

export const listQueueTagsEndpoint = HttpApiEndpoint.make("POST")(
  "ListQueueTags",
  "/",
  {
    payload: ListQueueTagsRequest,
    success: ListQueueTagsResult,
  },
);

export const listQueuesOperation: AwsJsonRpcOperation & {
  readonly input: typeof ListQueuesRequest;
  readonly output: typeof ListQueuesResult;
} = {
  name: "ListQueues",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.ListQueues",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "QueueUrls",
    pageSize: "MaxResults",
  },
  waiters: {},
  input: ListQueuesRequest,
  output: ListQueuesResult,
  errors: listQueuesErrors,
};

export const listQueuesEndpoint = HttpApiEndpoint.make("POST")(
  "ListQueues",
  "/",
  {
    payload: ListQueuesRequest,
    success: ListQueuesResult,
  },
);

export const PurgeQueueOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const purgeQueueOperation: AwsJsonRpcOperation & {
  readonly input: typeof PurgeQueueRequest;
  readonly output: typeof PurgeQueueOutput;
} = {
  name: "PurgeQueue",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.PurgeQueue",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: PurgeQueueRequest,
  output: PurgeQueueOutput,
  errors: purgeQueueErrors,
};

export const purgeQueueEndpoint = HttpApiEndpoint.make("POST")(
  "PurgeQueue",
  "/",
  {
    payload: PurgeQueueRequest,
    success: PurgeQueueOutput,
  },
);

export const receiveMessageOperation: AwsJsonRpcOperation & {
  readonly input: typeof ReceiveMessageRequest;
  readonly output: typeof ReceiveMessageResult;
} = {
  name: "ReceiveMessage",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.ReceiveMessage",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: ReceiveMessageRequest,
  output: ReceiveMessageResult,
  errors: receiveMessageErrors,
};

export const receiveMessageEndpoint = HttpApiEndpoint.make("POST")(
  "ReceiveMessage",
  "/",
  {
    payload: ReceiveMessageRequest,
    success: ReceiveMessageResult,
  },
);

export const RemovePermissionOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const removePermissionOperation: AwsJsonRpcOperation & {
  readonly input: typeof RemovePermissionRequest;
  readonly output: typeof RemovePermissionOutput;
} = {
  name: "RemovePermission",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.RemovePermission",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: RemovePermissionRequest,
  output: RemovePermissionOutput,
  errors: deleteQueueErrors,
};

export const removePermissionEndpoint = HttpApiEndpoint.make("POST")(
  "RemovePermission",
  "/",
  {
    payload: RemovePermissionRequest,
    success: RemovePermissionOutput,
  },
);

export const sendMessageOperation: AwsJsonRpcOperation & {
  readonly input: typeof SendMessageRequest;
  readonly output: typeof SendMessageResult;
} = {
  name: "SendMessage",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.SendMessage",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: SendMessageRequest,
  output: SendMessageResult,
  errors: sendMessageErrors,
};

export const sendMessageEndpoint = HttpApiEndpoint.make("POST")(
  "SendMessage",
  "/",
  {
    payload: SendMessageRequest,
    success: SendMessageResult,
  },
);

export const sendMessageBatchOperation: AwsJsonRpcOperation & {
  readonly input: typeof SendMessageBatchRequest;
  readonly output: typeof SendMessageBatchResult;
} = {
  name: "SendMessageBatch",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.SendMessageBatch",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: SendMessageBatchRequest,
  output: SendMessageBatchResult,
  errors: sendMessageBatchErrors,
};

export const sendMessageBatchEndpoint = HttpApiEndpoint.make("POST")(
  "SendMessageBatch",
  "/",
  {
    payload: SendMessageBatchRequest,
    success: SendMessageBatchResult,
  },
);

export const SetQueueAttributesOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const setQueueAttributesOperation: AwsJsonRpcOperation & {
  readonly input: typeof SetQueueAttributesRequest;
  readonly output: typeof SetQueueAttributesOutput;
} = {
  name: "SetQueueAttributes",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.SetQueueAttributes",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: SetQueueAttributesRequest,
  output: SetQueueAttributesOutput,
  errors: setQueueAttributesErrors,
};

export const setQueueAttributesEndpoint = HttpApiEndpoint.make("POST")(
  "SetQueueAttributes",
  "/",
  {
    payload: SetQueueAttributesRequest,
    success: SetQueueAttributesOutput,
  },
);

export const startMessageMoveTaskOperation: AwsJsonRpcOperation & {
  readonly input: typeof StartMessageMoveTaskRequest;
  readonly output: typeof StartMessageMoveTaskResult;
} = {
  name: "StartMessageMoveTask",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.StartMessageMoveTask",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: StartMessageMoveTaskRequest,
  output: StartMessageMoveTaskResult,
  errors: cancelMessageMoveTaskErrors,
};

export const startMessageMoveTaskEndpoint = HttpApiEndpoint.make("POST")(
  "StartMessageMoveTask",
  "/",
  {
    payload: StartMessageMoveTaskRequest,
    success: StartMessageMoveTaskResult,
  },
);

export const TagQueueOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const tagQueueOperation: AwsJsonRpcOperation & {
  readonly input: typeof TagQueueRequest;
  readonly output: typeof TagQueueOutput;
} = {
  name: "TagQueue",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.TagQueue",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: TagQueueRequest,
  output: TagQueueOutput,
  errors: deleteQueueErrors,
};

export const tagQueueEndpoint = HttpApiEndpoint.make("POST")("TagQueue", "/", {
  payload: TagQueueRequest,
  success: TagQueueOutput,
});

export const UntagQueueOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const untagQueueOperation: AwsJsonRpcOperation & {
  readonly input: typeof UntagQueueRequest;
  readonly output: typeof UntagQueueOutput;
} = {
  name: "UntagQueue",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AmazonSQS.UntagQueue",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: UntagQueueRequest,
  output: UntagQueueOutput,
  errors: deleteQueueErrors,
};

export const untagQueueEndpoint = HttpApiEndpoint.make("POST")(
  "UntagQueue",
  "/",
  {
    payload: UntagQueueRequest,
    success: UntagQueueOutput,
  },
);

export const sqsOperations = {
  AddPermission: addPermissionOperation,
  CancelMessageMoveTask: cancelMessageMoveTaskOperation,
  ChangeMessageVisibility: changeMessageVisibilityOperation,
  ChangeMessageVisibilityBatch: changeMessageVisibilityBatchOperation,
  CreateQueue: createQueueOperation,
  DeleteMessage: deleteMessageOperation,
  DeleteMessageBatch: deleteMessageBatchOperation,
  DeleteQueue: deleteQueueOperation,
  GetQueueAttributes: getQueueAttributesOperation,
  GetQueueUrl: getQueueUrlOperation,
  ListDeadLetterSourceQueues: listDeadLetterSourceQueuesOperation,
  ListMessageMoveTasks: listMessageMoveTasksOperation,
  ListQueueTags: listQueueTagsOperation,
  ListQueues: listQueuesOperation,
  PurgeQueue: purgeQueueOperation,
  ReceiveMessage: receiveMessageOperation,
  RemovePermission: removePermissionOperation,
  SendMessage: sendMessageOperation,
  SendMessageBatch: sendMessageBatchOperation,
  SetQueueAttributes: setQueueAttributesOperation,
  StartMessageMoveTask: startMessageMoveTaskOperation,
  TagQueue: tagQueueOperation,
  UntagQueue: untagQueueOperation,
};

export const sqsApi = HttpApi.make("SQS").add(
  HttpApiGroup.make("sqs").add(
    addPermissionEndpoint,
    cancelMessageMoveTaskEndpoint,
    changeMessageVisibilityEndpoint,
    changeMessageVisibilityBatchEndpoint,
    createQueueEndpoint,
    deleteMessageEndpoint,
    deleteMessageBatchEndpoint,
    deleteQueueEndpoint,
    getQueueAttributesEndpoint,
    getQueueUrlEndpoint,
    listDeadLetterSourceQueuesEndpoint,
    listMessageMoveTasksEndpoint,
    listQueueTagsEndpoint,
    listQueuesEndpoint,
    purgeQueueEndpoint,
    receiveMessageEndpoint,
    removePermissionEndpoint,
    sendMessageEndpoint,
    sendMessageBatchEndpoint,
    setQueueAttributesEndpoint,
    startMessageMoveTaskEndpoint,
    tagQueueEndpoint,
    untagQueueEndpoint,
  ),
);

export const sqsService: AwsServiceDefinition = {
  service: "com.amazonaws.sqs#AmazonSQS",
  version: "2012-11-05",
  protocol: "awsJson1_0",
  signingName: "sqs",
  endpointRules: {
    version: "1.0",
    parameters: {
      Region: {
        builtIn: "AWS::Region",
        required: false,
        documentation: "The AWS region used to dispatch the request.",
        type: "string",
      },
      UseDualStack: {
        builtIn: "AWS::UseDualStack",
        required: true,
        default: false,
        documentation:
          "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
        type: "boolean",
      },
      UseFIPS: {
        builtIn: "AWS::UseFIPS",
        required: true,
        default: false,
        documentation:
          "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
        type: "boolean",
      },
      Endpoint: {
        builtIn: "SDK::Endpoint",
        required: false,
        documentation: "Override the endpoint used to send this request",
        type: "string",
      },
    },
    rules: [
      {
        conditions: [
          {
            fn: "isSet",
            argv: [
              {
                ref: "Endpoint",
              },
            ],
          },
        ],
        rules: [
          {
            conditions: [
              {
                fn: "booleanEquals",
                argv: [
                  {
                    ref: "UseFIPS",
                  },
                  true,
                ],
              },
            ],
            error:
              "Invalid Configuration: FIPS and custom endpoint are not supported",
            type: "error",
          },
          {
            conditions: [
              {
                fn: "booleanEquals",
                argv: [
                  {
                    ref: "UseDualStack",
                  },
                  true,
                ],
              },
            ],
            error:
              "Invalid Configuration: Dualstack and custom endpoint are not supported",
            type: "error",
          },
          {
            conditions: [],
            endpoint: {
              url: {
                ref: "Endpoint",
              },
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
        type: "tree",
      },
      {
        conditions: [
          {
            fn: "isSet",
            argv: [
              {
                ref: "Region",
              },
            ],
          },
        ],
        rules: [
          {
            conditions: [
              {
                fn: "aws.partition",
                argv: [
                  {
                    ref: "Region",
                  },
                ],
                assign: "PartitionResult",
              },
            ],
            rules: [
              {
                conditions: [
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseFIPS",
                      },
                      true,
                    ],
                  },
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseDualStack",
                      },
                      true,
                    ],
                  },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          true,
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsFIPS",
                            ],
                          },
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          true,
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsDualStack",
                            ],
                          },
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://sqs-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [],
                    error:
                      "FIPS and DualStack are enabled, but this partition does not support one or both",
                    type: "error",
                  },
                ],
                type: "tree",
              },
              {
                conditions: [
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseFIPS",
                      },
                      true,
                    ],
                  },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsFIPS",
                            ],
                          },
                          true,
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [
                          {
                            fn: "stringEquals",
                            argv: [
                              {
                                fn: "getAttr",
                                argv: [
                                  {
                                    ref: "PartitionResult",
                                  },
                                  "name",
                                ],
                              },
                              "aws-us-gov",
                            ],
                          },
                        ],
                        endpoint: {
                          url: "https://sqs.{Region}.amazonaws.com",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://sqs-fips.{Region}.{PartitionResult#dnsSuffix}",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [],
                    error:
                      "FIPS is enabled but this partition does not support FIPS",
                    type: "error",
                  },
                ],
                type: "tree",
              },
              {
                conditions: [
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseDualStack",
                      },
                      true,
                    ],
                  },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          true,
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsDualStack",
                            ],
                          },
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://sqs.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [],
                    error:
                      "DualStack is enabled but this partition does not support DualStack",
                    type: "error",
                  },
                ],
                type: "tree",
              },
              {
                conditions: [],
                endpoint: {
                  url: "https://sqs.{Region}.{PartitionResult#dnsSuffix}",
                  properties: {},
                  headers: {},
                },
                type: "endpoint",
              },
            ],
            type: "tree",
          },
        ],
        type: "tree",
      },
      {
        conditions: [],
        error: "Invalid Configuration: Missing Region",
        type: "error",
      },
    ],
  },
};

/** The makeSQSClient constructor supplies callable SQS operations through the shared AwsClient service. Calls validate inputs and responses with the generated schemas and retain typed request, response, and provider failures. */
export const makeSQSClient = Effect.gen(function* () {
  const aws = yield* AwsClient;
  const bindOperation = aws.bindOperation(sqsService);

  /** The addPermission function invokes AWS AddPermission through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const addPermission = bindOperation(addPermissionOperation);
  /** The cancelMessageMoveTask function invokes AWS CancelMessageMoveTask through the shared client. Its Effect returns the decoded CancelMessageMoveTaskResult result after a successful response; validation and provider failures remain in the error channel. */
  const cancelMessageMoveTask = bindOperation(cancelMessageMoveTaskOperation);
  /** The changeMessageVisibility function invokes AWS ChangeMessageVisibility through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const changeMessageVisibility = bindOperation(
    changeMessageVisibilityOperation,
  );
  /** The changeMessageVisibilityBatch function invokes AWS ChangeMessageVisibilityBatch through the shared client. Its Effect returns the decoded ChangeMessageVisibilityBatchResult result after a successful response; validation and provider failures remain in the error channel. */
  const changeMessageVisibilityBatch = bindOperation(
    changeMessageVisibilityBatchOperation,
  );
  /** The createQueue function invokes AWS CreateQueue through the shared client. Its Effect returns the decoded CreateQueueResult result after a successful response; validation and provider failures remain in the error channel. */
  const createQueue = bindOperation(createQueueOperation);
  /** The deleteMessage function invokes AWS DeleteMessage through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteMessage = bindOperation(deleteMessageOperation);
  /** The deleteMessageBatch function invokes AWS DeleteMessageBatch through the shared client. Its Effect returns the decoded DeleteMessageBatchResult result after a successful response; validation and provider failures remain in the error channel. */
  const deleteMessageBatch = bindOperation(deleteMessageBatchOperation);
  /** The deleteQueue function invokes AWS DeleteQueue through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteQueue = bindOperation(deleteQueueOperation);
  /** The getQueueAttributes function invokes AWS GetQueueAttributes through the shared client. Its Effect returns the decoded GetQueueAttributesResult result after a successful response; validation and provider failures remain in the error channel. */
  const getQueueAttributes = bindOperation(getQueueAttributesOperation);
  /** The getQueueUrl function invokes AWS GetQueueUrl through the shared client. Its Effect returns the decoded GetQueueUrlResult result after a successful response; validation and provider failures remain in the error channel. */
  const getQueueUrl = bindOperation(getQueueUrlOperation);
  /** The listDeadLetterSourceQueues function invokes AWS ListDeadLetterSourceQueues through the shared client. Its Effect returns the decoded ListDeadLetterSourceQueuesResult result after a successful response; validation and provider failures remain in the error channel. */
  const listDeadLetterSourceQueues = bindOperation(
    listDeadLetterSourceQueuesOperation,
  );
  /** The listMessageMoveTasks function invokes AWS ListMessageMoveTasks through the shared client. Its Effect returns the decoded ListMessageMoveTasksResult result after a successful response; validation and provider failures remain in the error channel. */
  const listMessageMoveTasks = bindOperation(listMessageMoveTasksOperation);
  /** The listQueueTags function invokes AWS ListQueueTags through the shared client. Its Effect returns the decoded ListQueueTagsResult result after a successful response; validation and provider failures remain in the error channel. */
  const listQueueTags = bindOperation(listQueueTagsOperation);
  /** The listQueues function invokes AWS ListQueues through the shared client. Its Effect returns the decoded ListQueuesResult result after a successful response; validation and provider failures remain in the error channel. */
  const listQueues = bindOperation(listQueuesOperation);
  /** The purgeQueue function invokes AWS PurgeQueue through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const purgeQueue = bindOperation(purgeQueueOperation);
  /** The receiveMessage function invokes AWS ReceiveMessage through the shared client. Its Effect returns the decoded ReceiveMessageResult result after a successful response; validation and provider failures remain in the error channel. */
  const receiveMessage = bindOperation(receiveMessageOperation);
  /** The removePermission function invokes AWS RemovePermission through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const removePermission = bindOperation(removePermissionOperation);
  /** The sendMessage function invokes AWS SendMessage through the shared client. Its Effect returns the decoded SendMessageResult result after a successful response; validation and provider failures remain in the error channel. */
  const sendMessage = bindOperation(sendMessageOperation);
  /** The sendMessageBatch function invokes AWS SendMessageBatch through the shared client. Its Effect returns the decoded SendMessageBatchResult result after a successful response; validation and provider failures remain in the error channel. */
  const sendMessageBatch = bindOperation(sendMessageBatchOperation);
  /** The setQueueAttributes function invokes AWS SetQueueAttributes through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const setQueueAttributes = bindOperation(setQueueAttributesOperation);
  /** The startMessageMoveTask function invokes AWS StartMessageMoveTask through the shared client. Its Effect returns the decoded StartMessageMoveTaskResult result after a successful response; validation and provider failures remain in the error channel. */
  const startMessageMoveTask = bindOperation(startMessageMoveTaskOperation);
  /** The tagQueue function invokes AWS TagQueue through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const tagQueue = bindOperation(tagQueueOperation);
  /** The untagQueue function invokes AWS UntagQueue through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const untagQueue = bindOperation(untagQueueOperation);

  return {
    addPermission,
    cancelMessageMoveTask,
    changeMessageVisibility,
    changeMessageVisibilityBatch,
    createQueue,
    deleteMessage,
    deleteMessageBatch,
    deleteQueue,
    getQueueAttributes,
    getQueueUrl,
    listDeadLetterSourceQueues,
    listMessageMoveTasks,
    listQueueTags,
    listQueues,
    purgeQueue,
    receiveMessage,
    removePermission,
    sendMessage,
    sendMessageBatch,
    setQueueAttributes,
    startMessageMoveTask,
    tagQueue,
    untagQueue,
  };
});
export const sqsOperationCatalog = [
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "AddPermission.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "AddPermission",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "CancelMessageMoveTask.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "CancelMessageMoveTask",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "ChangeMessageVisibility.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "ChangeMessageVisibility",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "ChangeMessageVisibilityBatch.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "ChangeMessageVisibilityBatch",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "CreateQueue.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "CreateQueue",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "DeleteMessage.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "DeleteMessage",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "DeleteMessageBatch.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "DeleteMessageBatch",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "DeleteQueue.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "DeleteQueue",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "GetQueueAttributes.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "GetQueueAttributes",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "GetQueueUrl.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "GetQueueUrl",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "ListDeadLetterSourceQueues.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "ListDeadLetterSourceQueues",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {
          inputToken: "NextToken",
          outputToken: "NextToken",
          items: "queueUrls",
          pageSize: "MaxResults",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "ListMessageMoveTasks.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "ListMessageMoveTasks",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "ListQueueTags.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "ListQueueTags",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "ListQueues.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "ListQueues",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {
          inputToken: "NextToken",
          outputToken: "NextToken",
          items: "QueueUrls",
          pageSize: "MaxResults",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "PurgeQueue.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "PurgeQueue",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "ReceiveMessage.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "ReceiveMessage",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "RemovePermission.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "RemovePermission",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "SendMessage.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "SendMessage",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "SendMessageBatch.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "SendMessageBatch",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "SetQueueAttributes.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "SetQueueAttributes",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "StartMessageMoveTask.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "StartMessageMoveTask",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "TagQueue.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "TagQueue",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sqs#AmazonSQS",
      name: "UntagQueue.json",
      format: "Smithy",
    },
    version: "2012-11-05",
    operationId: "UntagQueue",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
      "403": ["application/x-amz-json-1.0"],
      "404": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": sqsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
];
