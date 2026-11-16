import { Context, Data, type Effect } from "effect";
import type { ResourceCommand, ResourceCommandResult } from "./lifecycle.js";

/**
 * The ResourceCommandFailure type allows Effect's native configuration failures
 * to pass through unchanged. Lifecycle records need their tag and message,
 * and ResourceCommandExecutionFailed retains the original cause.
 */
export type ResourceCommandFailure = {
  readonly _tag: string;
  readonly message: string;
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
