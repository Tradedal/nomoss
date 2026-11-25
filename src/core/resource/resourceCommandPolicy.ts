import { Context, Data, Effect, Option } from "effect";
import type { ResourceCommand, ResourceCommandResult } from "./lifecycle.js";

/**
 * The ResourceCommandStackName reference supplies the stack that owns a provider
 * mutation. Resource policies can derive a stable physical name when the
 * application omits one, so retries after an interrupted creation address the
 * same object. Direct commands can omit this context when they supply a name.
 */
export const ResourceCommandStackName = Context.Reference<
  Option.Option<string>
>("nomoss/core/resource/resourceCommandPolicy/stackName", {
  defaultValue: Option.none,
});

/**
 * The ResourceCommandProgress reference reports a provider status message
 * for the current command. It returns false when no display is subscribed,
 * so a standalone client can send the message to its normal logger.
 *
 * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Context.ts (Context.Reference)
 */
export const ResourceCommandProgress = Context.Reference(
  "nomoss/core/resource/resourceCommandPolicy/progress",
  { defaultValue: () => (_message: string) => Effect.succeed<boolean>(false) },
);

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
