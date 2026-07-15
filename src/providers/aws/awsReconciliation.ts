import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Graph,
  Match,
  Option,
} from "effect";

import {
  PlanDecision,
  type ResourceObservation,
} from "../../core/lifecycle.js";
import { keyString, type ResourceKey } from "../../core/model.js";
import type { ResourceDependencyGraph } from "../../core/planner.js";
import { AwsResourceLifecycle } from "./awsResourceLifecycle.js";

export class ResourceObservationMissing extends Data.TaggedError(
  "ResourceObservationMissing",
)<{
  readonly key: ResourceKey;
}> {}

/**
 * Reconciliation keeps graph order while delegating provider-specific diff
 * decisions to resource policies for apply and rendering workflows.
 */
export class AwsReconciliation extends Context.Service<AwsReconciliation>()(
  "nomoss/providers/aws/awsReconciliation",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* AwsResourceLifecycle;

      return {
        decideFromObservations: Effect.fn(
          "AwsReconciliation.decideFromObservations",
        )(function* (
          graph: ResourceDependencyGraph,
          observations: ReadonlyArray<ResourceObservation>,
        ) {
          const observationsByKey = new Map(
            Arr.map(
              observations,
              (observation): readonly [string, ResourceObservation] => [
                keyString(observation.node.key),
                observation,
              ],
            ),
          );
          const decisionEntries = yield* Effect.forEach(
            Graph.values(Graph.topo(graph)),
            Effect.fn("AwsReconciliation.decideNode")(function* (node) {
              const observation = yield* Option.fromUndefinedOr(
                observationsByKey.get(keyString(node.key)),
              ).pipe(
                Option.match({
                  onNone: () =>
                    Effect.fail(
                      new ResourceObservationMissing({ key: node.key }),
                    ),
                  onSome: Effect.succeed,
                }),
              );
              const decision = yield* Match.value(observation).pipe(
                Match.tagsExhaustive({
                  Unreadable: () => Effect.succeed(PlanDecision.NoOp({ node })),
                  Present: () => lifecycle.diff(node, observation),
                  Missing: () => lifecycle.diff(node, observation),
                  Drifted: () => lifecycle.diff(node, observation),
                }),
              );

              return decision;
            }),
          );
          const decisions = new Map(
            Arr.map(
              decisionEntries,
              (entry): readonly [string, PlanDecision] => [
                keyString(entry.node.key),
                entry,
              ],
            ),
          );

          return decisions;
        }),
      };
    }),
  },
) {}
