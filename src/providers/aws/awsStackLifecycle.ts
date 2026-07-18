import { Array as Arr, Context, Duration, Effect, Graph, Option } from "effect";

import type { PlanDecision } from "../../core/lifecycle.js";
import type { ResourceNode } from "../../core/model.js";
import { PhysicalNameStore } from "../../core/physicalNameStore.js";
import type { ResourceDependencyGraph } from "../../core/planner.js";
import { ResourceGraphStore } from "../../core/resourceGraphStore.js";
import {
  ResourceStackDefinition,
  ResourceStackDefinitionMismatch,
} from "../../core/resourceStackDefinition.js";
import { ResourceStateStore } from "../../core/stateStore.js";
import { type AppliedResource, AwsApply } from "./awsApply.js";
import { AwsProviderRuntime } from "./awsProviderLayer.js";
import { AwsReconciliation } from "./awsReconciliation.js";
import { AwsRefresh } from "./awsRefresh.js";

export type ResourceListing = {
  readonly logicalId: string;
  readonly type: string;
  readonly provider: string;
  readonly service: string;
  readonly resource: string;
  readonly props: unknown;
  readonly outputs: unknown;
};

export type DecisionReport = {
  readonly stackName: string;
  readonly decisions: ReadonlyMap<string, PlanDecision>;
  readonly changed: ReadonlyArray<PlanDecision>;
};

export type StackApplyResult = {
  readonly report: DecisionReport;
  readonly applied: boolean;
  readonly resources: ReadonlyArray<AppliedResource>;
  readonly durationMillis: number;
};

export type StackDestroyResult = {
  readonly report: DecisionReport;
};

export type PreparedStack = {
  readonly stackName: string;
  readonly region: string;
  readonly desired: ResourceDependencyGraph;
};

/**
 * CLI workflows call this service for stack preparation and live AWS changes,
 * then render the typed reports outside the lifecycle path.
 */
export class AwsStackLifecycle extends Context.Service<AwsStackLifecycle>()(
  "nomoss/providers/aws/awsStackLifecycle",
  {
    make: Effect.gen(function* () {
      const stackDefinition = yield* ResourceStackDefinition;
      const graphStore = yield* ResourceGraphStore;
      const stateStore = yield* ResourceStateStore;
      const physicalNames = yield* PhysicalNameStore;
      const providerRuntime = yield* AwsProviderRuntime;

      const changedDecisions = (decisions: ReadonlyMap<string, PlanDecision>) =>
        Arr.filter(
          Arr.fromIterable(decisions.values()),
          (decision) => decision._tag !== "NoOp",
        );
      const reportFor = (
        stackName: string,
        decisions: ReadonlyMap<string, PlanDecision>,
      ): DecisionReport =>
        ({
          stackName,
          decisions,
          changed: changedDecisions(decisions),
        }) satisfies DecisionReport;
      const resourceListing = (node: ResourceNode): ResourceListing => ({
        logicalId: node.key.logicalId,
        type: `${node.schema.provider}:${node.schema.service}:${node.schema.resource}`,
        provider: node.schema.provider,
        service: node.schema.service,
        resource: node.schema.resource,
        props: node.props,
        outputs: node.outputs,
      });
      const resourceListings = (graph: ResourceDependencyGraph) =>
        Arr.map(
          Arr.fromIterable(Graph.values(Graph.topo(graph))),
          resourceListing,
        );
      const providerDecisionLayer = (profile: string, region: string) =>
        providerRuntime.decisionLayerSsoRegion(profile, region);
      const liveDecisions = Effect.fn("AwsStackLifecycle.liveDecisions")(
        function* (desired: ResourceDependencyGraph) {
          const refresh = yield* AwsRefresh;
          const reconciliation = yield* AwsReconciliation;
          const observations = yield* refresh.refreshGraph(desired);
          const decisions = yield* reconciliation.decideFromObservations(
            desired,
            observations,
          );

          return decisions;
        },
      );
      const applyDecisions = Effect.fn("AwsStackLifecycle.applyDecisions")(
        function* (input: {
          readonly desired: ResourceDependencyGraph;
          readonly decisions: ReadonlyMap<string, PlanDecision>;
          readonly stackName: string;
          readonly desiredResources: ReadonlyArray<ResourceNode>;
        }) {
          const applyService = yield* AwsApply;

          const results = yield* applyService.applyDecisions(
            input.desired,
            input.decisions,
          );
          yield* stateStore.saveResources(
            input.stackName,
            input.desiredResources,
          );

          return results;
        },
      );
      const prepareStack = Effect.fn("AwsStackLifecycle.prepare")(function* (
        stackName: string,
      ) {
        yield* Effect.filterOrFail(
          Effect.succeed(stackName),
          (requested) => requested === stackDefinition.stackName,
          (requested) =>
            new ResourceStackDefinitionMismatch({
              defined: stackDefinition.stackName,
              requested,
            }),
        );

        yield* graphStore.reset;
        yield* stackDefinition.program;
        const desired = yield* graphStore.snapshot;
        const prepared: PreparedStack = {
          stackName: stackDefinition.stackName,
          region: stackDefinition.region,
          desired,
        };

        return prepared;
      });

      return {
        prepare: prepareStack,

        mermaid: Effect.fn("AwsStackLifecycle.mermaid")(function* (
          stackName: string,
        ) {
          yield* prepareStack(stackName);

          return yield* graphStore.mermaid;
        }),

        describeResources: Effect.fn("AwsStackLifecycle.describeResources")(
          function* (stackName: string) {
            const prepared = yield* prepareStack(stackName);

            return resourceListings(prepared.desired);
          },
        ),

        diffLive: Effect.fn("AwsStackLifecycle.diffLive")(function* (input: {
          readonly profile: string;
          readonly stackName: string;
        }) {
          const prepared = yield* prepareStack(input.stackName);
          const decisions = yield* liveDecisions(prepared.desired).pipe(
            Effect.provide(
              providerDecisionLayer(input.profile, prepared.region),
            ),
          );

          return reportFor(prepared.stackName, decisions);
        }),

        applyLive: Effect.fn("AwsStackLifecycle.applyLive")(function* (input: {
          readonly profile: string;
          readonly stackName: string;
        }) {
          const prepared = yield* prepareStack(input.stackName);
          const desiredResources = stateStore.resourcesFromGraph(
            prepared.desired,
          );
          const decisionLayer = providerDecisionLayer(
            input.profile,
            prepared.region,
          );
          const decisions = yield* liveDecisions(prepared.desired).pipe(
            Effect.provide(decisionLayer),
          );
          const report = reportFor(prepared.stackName, decisions);
          const applyChangedReport = Effect.fn(
            "AwsStackLifecycle.applyChangedReport",
          )(function* () {
            const [duration, resources] = yield* applyDecisions({
              desired: prepared.desired,
              decisions,
              stackName: prepared.stackName,
              desiredResources,
            }).pipe(Effect.provide(decisionLayer), Effect.timed);

            return {
              report,
              applied: true,
              resources,
              durationMillis: Duration.toMillis(duration),
            } satisfies StackApplyResult;
          });

          return yield* Option.match(
            Option.liftPredicate(report, (value) => value.changed.length > 0),
            {
              onNone: () =>
                Effect.succeed({
                  report,
                  applied: false,
                  resources: [],
                  durationMillis: 0,
                }),
              onSome: applyChangedReport,
            },
          );
        }),

        destroyLive: Effect.fn("AwsStackLifecycle.destroyLive")(
          function* (input: {
            readonly profile: string;
            readonly stackName: string;
          }) {
            const prepared = yield* prepareStack(input.stackName);
            const graphNodes = Arr.fromIterable(
              Graph.values(Graph.topo(prepared.desired)),
            );
            const decisions = new Map(
              Arr.map(graphNodes, (node) => [
                node.key.logicalId,
                { _tag: "Destroy", node } as PlanDecision,
              ]),
            );
            const report = reportFor(prepared.stackName, decisions);
            const logicalIds = Arr.map(
              graphNodes,
              (node) => node.key.logicalId,
            );

            yield* applyDecisions({
              desired: prepared.desired,
              decisions,
              stackName: prepared.stackName,
              desiredResources: [],
            }).pipe(
              Effect.provide(
                providerRuntime.applyLayerSsoRegion(
                  input.profile,
                  prepared.region,
                ),
              ),
              Effect.andThen(physicalNames.deleteNames(logicalIds)),
            );

            const result: StackDestroyResult = {
              report,
            };

            return result;
          },
        ),
      };
    }),
  },
) {}
