import { Context, Data, Effect, Match } from "effect";

import type { ResourceCommandResult as ResourceCommandResultValue } from "./lifecycle.js";
import {
  PlanDecision,
  type ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
} from "./lifecycle.js";

/**
 * Provider dispatch preserves provider failures as Effect failures while
 * giving the core lifecycle a stable error type for state recording.
 */
export class ResourceCommandExecutionFailed extends Data.TaggedError(
  "ResourceCommandExecutionFailed",
)<{
  readonly command: ResourceCommand;
  readonly cause: unknown;
}> {}

/**
 * Provider packages satisfy this service with their resource command
 * dispatcher. Core stack execution depends on this contract instead of
 * importing provider implementations.
 */
export class ResourceCommandPolicy extends Context.Service<ResourceCommandPolicy>()(
  "nomoss/core/resourceCommandPolicy",
  {
    make: Effect.succeed({
      execute: Effect.fn("ResourceCommandPolicy.execute")(function* (
        command: ResourceCommand,
      ) {
        yield* Match.value(Boolean(false)).pipe(
          Match.when(true, () =>
            Effect.fail(
              new ResourceCommandExecutionFailed({
                command,
                cause: "provider command policy not configured",
              }),
            ),
          ),
          Match.orElse(() => Effect.void),
        );
        const fallbackResult = Match.value(command).pipe(
          Match.tagsExhaustive({
            Read: ({ node: readNode }) =>
              ResourceCommandResult.Observed({
                observation: {
                  _tag: "Missing",
                  node: readNode,
                },
              }),
            Diff: ({ node: diffNode }) =>
              ResourceCommandResult.Decided({
                decision: PlanDecision.NoOp({ node: diffNode }),
              }),
            Apply: ({ decision }) =>
              ResourceCommandResult.Decided({ decision }),
            Create: ({ node: createdNode }) =>
              ResourceCommandResult.Created({ node: createdNode }),
            Update: ({ node: updatedNode }) =>
              ResourceCommandResult.Updated({ node: updatedNode }),
            Delete: ({ node: deletedNode }) =>
              ResourceCommandResult.Deleted({ node: deletedNode }),
            Destroy: ({ node: destroyedNode }) =>
              ResourceCommandResult.Destroyed({ node: destroyedNode }),
          }),
        );
        const commandResult: ResourceCommandResultValue = fallbackResult;
        const result = yield* Effect.succeed(commandResult).pipe(
          Effect.filterOrFail(
            () => false,
            () => new ResourceCommandUnsupported({ command }),
          ),
        );

        return result;
      }),
    }),
  },
) {}
