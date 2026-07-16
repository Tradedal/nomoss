import { Context, Data, Effect, Match, Option } from "effect";

import {
  type PlanDecision,
  ResourceCommand,
  type ResourceCommandResult,
  type ResourceObservation,
} from "../../core/lifecycle.js";
import type { ResourceNode } from "../../core/model.js";
import { AwsResourcePolicy } from "./awsResourcePolicy.js";

export class ResourceObservationResultExpected extends Data.TaggedError(
  "ResourceObservationResultExpected",
)<{
  readonly result: ResourceCommandResult;
}> {}

export class ResourceDecisionResultExpected extends Data.TaggedError(
  "ResourceDecisionResultExpected",
)<{
  readonly result: ResourceCommandResult;
}> {}

export class ResourceApplyResultExpected extends Data.TaggedError(
  "ResourceApplyResultExpected",
)<{
  readonly result: ResourceCommandResult;
}> {}

export type AppliedResourceCommandResult = Extract<
  ResourceCommandResult,
  { readonly _tag: "Created" | "Updated" | "Destroyed" }
>;

/**
 * Refresh, reconciliation, and apply code use this command protocol instead of
 * unpacking provider-specific resource results locally.
 */
export class AwsResourceLifecycle extends Context.Service<AwsResourceLifecycle>()(
  "nomoss/providers/aws/awsResourceLifecycle",
  {
    make: Effect.gen(function* () {
      const policy = yield* AwsResourcePolicy;

      const applyChangedDecision = Effect.fn(
        "AwsResourceLifecycle.applyChangedDecision",
      )(function* (
        nextDecision: Exclude<PlanDecision, { readonly _tag: "NoOp" }>,
      ) {
        const result = yield* policy.execute(
          ResourceCommand.Apply({ decision: nextDecision }),
        );
        const applied = yield* Match.value(result).pipe(
          Match.when({ _tag: "Created" }, (created) =>
            Effect.succeed(created),
          ),
          Match.when({ _tag: "Updated" }, (updated) =>
            Effect.succeed(updated),
          ),
          Match.when({ _tag: "Destroyed" }, (destroyed) =>
            Effect.succeed(destroyed),
          ),
          Match.orElse(() =>
            Effect.fail(new ResourceApplyResultExpected({ result })),
          ),
        );

        return Option.some(applied);
      });

      return {
        read: Effect.fn("AwsResourceLifecycle.read")(function* (
          node: ResourceNode,
        ) {
          const result = yield* policy.execute(ResourceCommand.Read({ node }));
          const observation = yield* Match.value(result).pipe(
            Match.when({ _tag: "Observed" }, ({ observation }) =>
              Effect.succeed(observation),
            ),
            Match.orElse(() =>
              Effect.fail(new ResourceObservationResultExpected({ result })),
            ),
          );

          return observation;
        }),

        diff: Effect.fn("AwsResourceLifecycle.diff")(function* (
          node: ResourceNode,
          observation: ResourceObservation,
        ) {
          const result = yield* policy.execute(
            ResourceCommand.Diff({ node, observation }),
          );
          const decision = yield* Match.value(result).pipe(
            Match.when({ _tag: "Decided" }, ({ decision }) =>
              Effect.succeed(decision),
            ),
            Match.orElse(() =>
              Effect.fail(new ResourceDecisionResultExpected({ result })),
            ),
          );

          return decision;
        }),

        apply: Effect.fn("AwsResourceLifecycle.apply")(function* (
          decision: PlanDecision,
        ) {
          return yield* Match.value(decision).pipe(
            Match.when({ _tag: "NoOp" }, () => Effect.succeed(Option.none())),
            Match.orElse(applyChangedDecision),
          );
        }),
      };
    }),
  },
) {}
