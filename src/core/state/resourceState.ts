import { Schema } from "effect";
import { type ResourceNode, ResourceNodeSchema } from "../resource/model.js";

/**
 * ResourceFailure preserves the reported error and its time in an unfinished
 * lifecycle record. Later runs can identify why the operation did not complete
 * without relying on logs from the original process.
 */
export const ResourceFailureSchema = Schema.Struct({
  errorTag: Schema.optional(Schema.NonEmptyString),
  message: Schema.String,
  occurredAt: Schema.NonEmptyString,
});

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
 * ResourceStateSnapshot contains lifecycle records and applied values from
 * one state read. Updating records expose their previous nodes for planning
 * so desired properties are compared with the last applied configuration.
 */
export interface ResourceStateSnapshot {
  readonly states: ReadonlyArray<ResourceState>;
  readonly resources: ReadonlyArray<ResourceNode>;
}

export const EnvironmentStateFileSchema = Schema.fromJsonString(
  EnvironmentStateSchema,
);
