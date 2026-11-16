import { Schema } from "effect";
import { type ResourceNode, ResourceNodeSchema } from "../resource/model.js";

/**
 * The ResourceFailureSchema schema keeps an unfinished operation diagnosable
 * when logs from the original process are unavailable. A later run can report
 * the saved failure before attempting recovery.
 */
export const ResourceFailureSchema = Schema.Struct({
  errorTag: Schema.optional(Schema.NonEmptyString),
  message: Schema.String,
  occurredAt: Schema.NonEmptyString,
});

/**
 * The ResourceStateSchema schema retains a completed removal until its
 * containing operation commits, allowing recovery to skip that provider call.
 * An unfinished update keeps the last applied node available for comparison
 * with the requested configuration.
 */
export const ResourceStateSchema = Schema.Union([
  Schema.TaggedStruct("Creating", {
    node: ResourceNodeSchema,
    startedAt: Schema.NonEmptyString,
    lastFailure: Schema.optional(ResourceFailureSchema),
  }),
  Schema.TaggedStruct("Created", {
    node: ResourceNodeSchema,
    completedAt: Schema.NonEmptyString,
  }),
  Schema.TaggedStruct("Updating", {
    node: ResourceNodeSchema,
    previous: ResourceNodeSchema,
    startedAt: Schema.NonEmptyString,
    lastFailure: Schema.optional(ResourceFailureSchema),
  }),
  Schema.TaggedStruct("Updated", {
    node: ResourceNodeSchema,
    completedAt: Schema.NonEmptyString,
  }),
  Schema.TaggedStruct("Deleting", {
    node: ResourceNodeSchema,
    startedAt: Schema.NonEmptyString,
    lastFailure: Schema.optional(ResourceFailureSchema),
  }),
  Schema.TaggedStruct("Deleted", {
    node: ResourceNodeSchema,
    completedAt: Schema.NonEmptyString,
  }),
]);

export const EnvironmentStateSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  stack: Schema.NonEmptyString,
  resources: Schema.Array(ResourceStateSchema),
});

export type EnvironmentState = typeof EnvironmentStateSchema.Type;
export type ResourceState = typeof ResourceStateSchema.Type;
export type ResourceFailure = typeof ResourceFailureSchema.Type;

/**
 * The ResourceStateSnapshot interface separates retry records from the values
 * available to applications in the same state read. Planning compares desired
 * resources with those applied values so saved creation intent cannot be
 * mistaken for completed infrastructure.
 */
export interface ResourceStateSnapshot {
  readonly states: ReadonlyArray<ResourceState>;
  readonly resources: ReadonlyArray<ResourceNode>;
}

export const EnvironmentStateFileSchema = Schema.fromJsonString(
  EnvironmentStateSchema,
);
