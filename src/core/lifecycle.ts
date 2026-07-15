import { Data, type Schema } from "effect";

import type { ResourceNode } from "./model.js";

/**
 * Repair decisions describe provider drift as explicit operations so renderers
 * do not infer behavior from ad hoc action strings.
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
