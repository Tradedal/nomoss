import { Array as Arr, Context, Data, Effect, Option } from "effect";

import type { PlanDecision } from "../../core/lifecycle.js";
import {
  keyString,
  type PlanAction,
  type ResourceKey,
} from "../../core/model.js";
import {
  type ResourceDependencyGraph,
  ResourcePlanner,
} from "../../core/planner.js";
import { AwsResourceLifecycle } from "./awsResourceLifecycle.js";

export class ResourceDecisionMissing extends Data.TaggedError(
  "ResourceDecisionMissing",
)<{
  readonly key: ResourceKey;
}> {}

/**
 * AWS apply runs reconciliation decisions in planner order while allowing each
 * independent batch to execute through resource policies concurrently.
 */
export class AwsApply extends Context.Service<AwsApply>()(
  "nomoss/providers/aws/awsApply",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* AwsResourceLifecycle;
      const planner = yield* ResourcePlanner;

      return {
        applyDecisions: Effect.fn("AwsApply.applyDecisions")(function* (
          graph: ResourceDependencyGraph,
          decisions: ReadonlyMap<string, PlanDecision>,
        ) {
          const changed = Arr.filter(
            Arr.fromIterable(decisions.values()),
            (decision) => decision._tag !== "NoOp",
          );
          const destroyOnly = Arr.every(
            changed,
            (decision) => decision._tag === "Destroy",
          );
          function isCreateOrRepairAction(action: PlanAction): boolean {
            const decision = decisions.get(keyString(action.node.key));

            return decision?._tag === "Create" || decision?._tag === "Repair";
          }

          const batches = Option.filter(
            Option.some(changed),
            () => destroyOnly,
          ).pipe(
            Option.match({
              onSome: () =>
                Arr.map(
                  planner.destroyBatches(
                    graph,
                    Arr.map(changed, (decision) => decision.node.key),
                  ),
                  (batch) => Arr.map(batch, (action) => action.node),
                ),
              onNone: () =>
                Arr.filter(
                  Arr.map(planner.createOrUpdateBatches(graph, []), (batch) =>
                    Arr.map(
                      Arr.filter(batch, isCreateOrRepairAction),
                      (action) => action.node,
                    ),
                  ),
                  (batch) => batch.length > 0,
                ),
            }),
          );
          const results = yield* Effect.forEach(batches, (batch) =>
            Effect.forEach(
              batch,
              Effect.fn("AwsApply.applyNode")(function* (node) {
                const key = keyString(node.key);
                const decision = yield* Option.fromUndefinedOr(
                  decisions.get(key),
                ).pipe(
                  Option.match({
                    onNone: () =>
                      Effect.fail(
                        new ResourceDecisionMissing({
                          key: { logicalId: key },
                        }),
                      ),
                    onSome: Effect.succeed,
                  }),
                );
                const result = yield* lifecycle.apply(decision);

                return result;
              }),
              { concurrency: "unbounded" },
            ),
          );

          return Arr.flatMap(Arr.flatten(results), (result) =>
            Option.match(result, {
              onNone: () => [],
              onSome: (defined) => [defined],
            }),
          );
        }),
      };
    }),
  },
) {}
