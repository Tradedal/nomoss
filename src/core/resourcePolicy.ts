import { Context, Effect, Match, type Schema } from "effect";

import {
  PlanDecision,
  ResourceCommandResult,
  ResourceObservation,
} from "./lifecycle.js";
import type { ResourceNode } from "./model.js";

/**
 * Resource policies share this protocol adapter so observed provider state,
 * missing resources, unreadable resources, and default diff decisions use the
 * same command-result contract.
 */
export class ResourcePolicy extends Context.Service<ResourcePolicy>()(
  "nomoss/core/resourcePolicy",
  {
    make: Effect.succeed({
      observed: (observation: ResourceObservation) =>
        ResourceCommandResult.Observed({ observation }),

      present: (node: ResourceNode, observedState: Schema.Json) =>
        ResourceCommandResult.Observed({
          observation: ResourceObservation.Present({
            node,
            observed: observedState,
          }),
        }),

      missing: (node: ResourceNode) =>
        ResourceCommandResult.Observed({
          observation: ResourceObservation.Missing({ node }),
        }),

      unreadable: (node: ResourceNode, reason: string) =>
        ResourceCommandResult.Observed({
          observation: ResourceObservation.Unreadable({ node, reason }),
        }),

      unreadableObservation: (node: ResourceNode, reason: string) =>
        ResourceObservation.Unreadable({ node, reason }),

      diffFromObservation: (
        node: ResourceNode,
        observation: ResourceObservation,
      ) =>
        Match.value(observation).pipe(
          Match.tagsExhaustive({
            Present: () =>
              Effect.succeed(
                ResourceCommandResult.Decided({
                  decision: PlanDecision.NoOp({ node }),
                }),
              ),
            Missing: () =>
              Effect.succeed(
                ResourceCommandResult.Decided({
                  decision: PlanDecision.Create({ node }),
                }),
              ),
            Drifted: ({ reason }) =>
              Effect.succeed(
                ResourceCommandResult.Decided({
                  decision: PlanDecision.Repair({ node, reason }),
                }),
              ),
            Unreadable: ({ reason }) =>
              Effect.succeed(
                ResourceCommandResult.Decided({
                  decision: PlanDecision.Repair({ node, reason }),
                }),
              ),
          }),
        ),
    }),
  },
) {}
