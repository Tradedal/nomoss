import { Schema } from "effect";
import { ResourceReferenceSchema } from "../../../../core/resource/model.js";
import { AWSManagedPolicyResourceTypeSchema } from "../generated/native/iam/managedpolicy/index.js";
import { AWSRoleResourceTypeSchema } from "../generated/native/iam/role/index.js";
import { AWSKeyResourceTypeSchema } from "../generated/native/kms/key/index.js";
import { AWSFunctionResourceTypeSchema } from "../generated/native/lambda/function/index.js";
import { AWSBucketResourceTypeSchema } from "../generated/native/s3/bucket/index.js";
import { AWSTopicResourceTypeSchema } from "../generated/native/sns/topic/index.js";
import { AWSQueueResourceTypeSchema } from "../generated/native/sqs/queue/index.js";
import { AWSStateMachineResourceTypeSchema } from "../generated/native/stepfunctions/statemachine/index.js";

// Policy resource references use each Registry definition's read-only ARN
// property. The shared reference codec records the entity dependency and
// resolves its applied value under docs/application/resource-graph.md,
// "Relationships and request values". SNS and managed IAM policies declare
// different ARN property names, so each has its own mapping.
const ResourceArn = ResourceReferenceSchema(
  Schema.Union([
    AWSRoleResourceTypeSchema,
    AWSKeyResourceTypeSchema,
    AWSFunctionResourceTypeSchema,
    AWSBucketResourceTypeSchema,
    AWSQueueResourceTypeSchema,
    AWSStateMachineResourceTypeSchema,
  ]),
  { value: null, outputs: [{ source: ["Arn"], target: [] }] },
);

const TopicArn = ResourceReferenceSchema(AWSTopicResourceTypeSchema, {
  value: null,
  outputs: [{ source: ["TopicArn"], target: [] }],
});

const PolicyArn = ResourceReferenceSchema(AWSManagedPolicyResourceTypeSchema, {
  value: null,
  outputs: [{ source: ["PolicyArn"], target: [] }],
});

/**
 * The PolicyStatement schema validates an identity policy statement before
 * registration. Resource scope accepts ARN strings, wildcard patterns, or
 * declared queues, buckets, topics, keys, functions, state machines, roles,
 * and managed policies. Entity references resolve to their saved ARNs during
 * apply. Actions and conditions remain the application's decisions.
 *
 * @see ../../../../../docs/application/resource-graph.md (Relationships and request values)
 */
export const PolicyStatement = Schema.Struct({
  actions: Schema.NonEmptyArray(Schema.NonEmptyString),
  resources: Schema.NonEmptyArray(
    Schema.Union([Schema.NonEmptyString, ResourceArn, TopicArn, PolicyArn]),
  ),
  effect: Schema.optionalKey(Schema.Literals(["Allow", "Deny"])),
  conditions: Schema.optionalKey(
    Schema.Record(Schema.NonEmptyString, Schema.JsonObject),
  ),
});

export type PolicyStatement = typeof PolicyStatement.Type;
