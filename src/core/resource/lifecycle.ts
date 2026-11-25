import { Data, type Schema } from "effect";

import type { PlanAction, ResourceNode } from "./model.js";

/**
 * The ResourceActionResult record identifies the operation completed for a
 * resource. NoOp records that execution retained the saved provider instance,
 * including when dependency resolution left its request unchanged.
 */
export interface ResourceActionResult {
  readonly node: ResourceNode;
  readonly operation: PlanAction["_tag"] | "NoOp";
}

/**
 * PlanRepairChange describes provider drift in a form that presentation can
 * report directly. Presentation does not need to interpret provider-specific action strings.
 */
export type PlanRepairChange = Data.TaggedEnum<{
  Added: {
    readonly path: ReadonlyArray<string>;
    readonly after: string;
  };
  Removed: {
    readonly path: ReadonlyArray<string>;
    readonly before: string;
  };
  Updated: {
    readonly path: ReadonlyArray<string>;
    readonly before?: string;
    readonly after?: string;
  };
}>;

export const PlanRepairChange = Data.taggedEnum<PlanRepairChange>();

/**
 * ResourceObservation describes the provider's current resource state for
 * reconciliation. Missing, unreadable, and drifted resources remain distinct
 * so planning does not mistake a failed read for confirmed absence.
 */
export type ResourceObservation = Data.TaggedEnum<{
  Present: {
    readonly node: ResourceNode;
    readonly observed: Schema.Json;
  };
  Missing: {
    readonly node: ResourceNode;
  };
  Drifted: {
    readonly node: ResourceNode;
    readonly reason: string;
  };
  Unreadable: {
    readonly node: ResourceNode;
    readonly reason: string;
  };
}>;

export const ResourceObservation = Data.taggedEnum<ResourceObservation>();

/**
 * PlanDecision records the selected resource action for review and execution.
 * Decisions retain resource nodes so an apply request does not have to infer
 * its target from a display label or reconstruct the planning inputs.
 */
export type PlanDecision = Data.TaggedEnum<{
  NoOp: {
    readonly node: ResourceNode;
  };
  Create: {
    readonly node: ResourceNode;
  };
  Update: {
    readonly node: ResourceNode;
    readonly current: ResourceNode;
  };
  Repair: {
    readonly node: ResourceNode;
    readonly reason: string;
    readonly changes?: ReadonlyArray<PlanRepairChange>;
  };
  Delete: {
    readonly node: ResourceNode;
  };
  Destroy: {
    readonly node: ResourceNode;
  };
}>;

export const PlanDecision = Data.taggedEnum<PlanDecision>();

/**
 * ResourceCommand identifies the provider capability requested by lifecycle
 * callers. Apply retains the reviewed decision, while direct commands carry
 * the resource and any observation needed by that operation.
 */
export type ResourceCommand = Data.TaggedEnum<{
  Read: {
    readonly node: ResourceNode;
  };
  Diff: {
    readonly node: ResourceNode;
    readonly observation: ResourceObservation;
  };
  Apply: {
    readonly decision: PlanDecision;
  };
  Create: {
    readonly node: ResourceNode;
  };
  Update: {
    readonly node: ResourceNode;
  };
  Delete: {
    readonly node: ResourceNode;
  };
  Destroy: {
    readonly node: ResourceNode;
  };
}>;

export const ResourceCommand = Data.taggedEnum<ResourceCommand>();

/**
 * The ResourceCommandResult type distinguishes observations and planned actions
 * from completed mutations. Lifecycle callers use completed nodes for saved
 * state and downstream output resolution.
 */
export type ResourceCommandResult = Data.TaggedEnum<{
  Observed: {
    readonly observation: ResourceObservation;
  };
  Decided: {
    readonly decision: PlanDecision;
  };
  Created: {
    readonly node: ResourceNode;
  };
  Updated: {
    readonly node: ResourceNode;
  };
  Deleted: {
    readonly node: ResourceNode;
  };
  Destroyed: {
    readonly node: ResourceNode;
  };
}>;

export const ResourceCommandResult = Data.taggedEnum<ResourceCommandResult>();

export class ResourceCommandUnsupported extends Data.TaggedError(
  "ResourceCommandUnsupported",
)<{
  readonly command: ResourceCommand;
}> {}
