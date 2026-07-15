import { Context, Effect, Graph } from "effect";

import type { ResourceDependencyGraph } from "../../core/planner.js";
import { ResourcePolicy } from "../../core/resourcePolicy.js";
import { AwsResourceLifecycle } from "./awsResourceLifecycle.js";

/**
 * Refresh turns resource-policy reads into graph observations and records
 * unsupported reads as typed observations for reconciliation.
 */
export class AwsRefresh extends Context.Service<AwsRefresh>()(
  "nomoss/providers/aws/awsRefresh",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* AwsResourceLifecycle;
      const resourcePolicy = yield* ResourcePolicy;

      return {
        refreshGraph: Effect.fn("AwsRefresh.refreshGraph")(function* (
          graph: ResourceDependencyGraph,
        ) {
          const observations = yield* Effect.forEach(
            Graph.values(Graph.topo(graph)),
            (node) =>
              lifecycle.read(node).pipe(
                Effect.catchTags({
                  ResourceCommandUnsupported: () =>
                    Effect.succeed(
                      resourcePolicy.unreadableObservation(
                        node,
                        "read unsupported",
                      ),
                    ),
                  AwsResourceKindUnsupported: () =>
                    Effect.succeed(
                      resourcePolicy.unreadableObservation(
                        node,
                        "resource kind unsupported",
                      ),
                    ),
                }),
              ),
          );

          return observations;
        }),
      };
    }),
  },
) {}
