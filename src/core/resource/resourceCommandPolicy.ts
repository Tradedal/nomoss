import { type Cause, Context, Data, type Effect } from "effect";
import type { ResourceCommand, ResourceCommandResult } from "./lifecycle.js";

export type ResourceCommandFailure = Cause.YieldableError & {
  readonly _tag: string;
};

/**
 * ResourceCommandExecutionFailed reports a provider failure together with the
 * resource command that failed. The provider's typed cause and message remain
 * available for diagnostics and the saved record of the unfinished operation.
 */
export class ResourceCommandExecutionFailed extends Data.TaggedError(
  "ResourceCommandExecutionFailed",
)<{
  readonly command: ResourceCommand;
  readonly cause: ResourceCommandFailure;
}> {
  override get message() {
    return this.cause.message;
  }
}

/**
 * ResourceCommandPolicy executes resource commands through the provider
 * configured by the application. Results distinguish observations, planning
 * decisions, and completed mutations. Provider failures retain their typed
 * cause in ResourceCommandExecutionFailed, and provider registrations must be
 * available in the same application runtime.
 */
export class ResourceCommandPolicy extends Context.Service<
  ResourceCommandPolicy,
  {
    readonly execute: (
      command: ResourceCommand,
    ) => Effect.Effect<ResourceCommandResult, ResourceCommandExecutionFailed>;
  }
>()("nomoss/core/resource/resourceCommandPolicy") {}
