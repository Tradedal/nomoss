import {
  Array as Arr,
  Console,
  Context,
  Effect,
  Formatter,
  Match,
  Option,
  Schema,
} from "effect";

import type { PlanDecision, PlanRepairChange } from "../../core/lifecycle.js";
import { ResourceModel, type ResourcePlan } from "../../core/model.js";
import { ResourcePlanner } from "../../core/planner.js";
import { ResourceStateStore } from "../../core/stateStore.js";
import {
  AwsStackLifecycle,
  type DecisionReport,
  type ResourceListing,
} from "./awsStackLifecycle.js";
import type { StackName } from "./sampleStack.js";

export type ResourceOutputFormat =
  | "text"
  | "json"
  | "logfmt"
  | "logger-json"
  | "structured";

export class StackWorkflowRenderer extends Context.Service<StackWorkflowRenderer>()(
  "nomoss/providers/aws/stackWorkflow/StackWorkflowRenderer",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;

      const prefixedValueLines = (prefix: string, value: string) => [
        `${prefix} ${value}`,
      ];
      const optionalValueLines = (prefix: string, value: string | undefined) =>
        Match.value(value).pipe(
          Match.when(undefined, () => [] as Array<string>),
          Match.orElse((defined) => prefixedValueLines(prefix, defined)),
        );
      const changePathLines = (path: ReadonlyArray<string>) =>
        Arr.append(
          Arr.matchRight(path, {
            onEmpty: () => [],
            onNonEmpty: (init) => [`  ${Arr.join(init, ":")}`],
          }),
          `    ${Arr.last(path).pipe(Option.getOrElse(() => "change"))}`,
        );
      const changeLines = (change: PlanRepairChange) =>
        Match.value(change).pipe(
          Match.tagsExhaustive({
            Added: ({ path, after }) =>
              Arr.appendAll(
                changePathLines(path),
                optionalValueLines("      [+]", after),
              ),
            Removed: ({ path, before }) =>
              Arr.appendAll(
                changePathLines(path),
                optionalValueLines("      [-]", before),
              ),
            Updated: ({ path, before, after }) =>
              Arr.appendAll(
                changePathLines(path),
                Arr.appendAll(
                  optionalValueLines("      [-]", before),
                  optionalValueLines("      [+]", after),
                ),
              ),
          }),
        );
      const resourceLine = (
        node: {
          key: { logicalId: string };
          schema: { provider: string; service: string; resource: string };
        },
        suffix: string,
      ) =>
        `[${suffix}]${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId}`;
      const decisionLines = (decision: PlanDecision) =>
        Match.value(decision).pipe(
          Match.tagsExhaustive({
            NoOp: ({ node }) => [resourceLine(node, " ")],
            Create: ({ node }) => [resourceLine(node, "+")],
            Update: ({ node }) => [resourceLine(node, "~")],
            Repair: ({ node, changes }) =>
              Arr.appendAll(
                [resourceLine(node, "~")],
                Arr.flatMap(changes ?? [], changeLines),
              ),
            Delete: ({ node }) => [resourceLine(node, "-")],
            Destroy: ({ node }) => [resourceLine(node, "-")],
          }),
        );
      const textResourceLines = (resource: ResourceListing) => [
        `${resource.type}/${resource.logicalId}`,
        `  props: ${Formatter.format(resource.props)}`,
        `  outputs: ${Formatter.format(resource.outputs)}`,
      ];
      const logResource = (stackName: StackName, resource: ResourceListing) =>
        Effect.logInfo("resource", resource).pipe(
          Effect.annotateLogs({
            stack: stackName,
            logicalId: resource.logicalId,
            type: resource.type,
            provider: resource.provider,
            service: resource.service,
            resource: resource.resource,
          }),
        );

      return {
        renderResources: Effect.fn("StackWorkflowRenderer.renderResources")(
          function* (input: {
            readonly stackName: StackName;
            readonly format: ResourceOutputFormat;
            readonly resources: ReadonlyArray<ResourceListing>;
          }) {
            yield* Match.value(input.format).pipe(
              Match.when("text", () =>
                Console.log(
                  Arr.flatMap(input.resources, textResourceLines).join("\n"),
                ),
              ),
              Match.when("json", () =>
                Console.log(
                  Formatter.formatJson(
                    { stack: input.stackName, resources: input.resources },
                    { space: 2 },
                  ),
                ),
              ),
              Match.orElse(() =>
                Effect.forEach(
                  input.resources,
                  (resource) => logResource(input.stackName, resource),
                  { discard: true },
                ),
              ),
            );
          },
        ),

        renderDecisionReport: Effect.fn(
          "StackWorkflowRenderer.renderDecisionReport",
        )(function* (report: DecisionReport) {
          yield* Console.log(`Stack "${report.stackName}"`);
          yield* Console.log("Resources");
          yield* Effect.forEach(
            Arr.flatMap(report.changed, decisionLines),
            Console.log,
            { discard: true },
          );

          const logNoChanges = Console.log(
            `no changes for stack ${report.stackName}`,
          );
          const shouldLogNoChanges = Effect.succeed(
            report.changed.length === 0,
          );

          yield* Effect.when(logNoChanges, shouldLogNoChanges);
        }),

        renderCreatePlan: Effect.fn("StackWorkflowRenderer.renderCreatePlan")(
          function* (input: {
            readonly stackName: string;
            readonly createOrUpdate: ResourcePlan["createOrUpdate"];
          }) {
            const hasCreateChanges =
              Arr.flatten(input.createOrUpdate).length > 0;

            yield* Effect.forEach(
              input.createOrUpdate,
              (batch, batchIndex) =>
                Effect.forEach(
                  Arr.appendAll(
                    [`batch ${batchIndex}:`],
                    Arr.map(
                      batch,
                      (action) => `  ${model.actionString(action)}`,
                    ),
                  ),
                  Console.log,
                  { discard: true },
                ),
              { discard: true },
            );

            const logNoChanges = Console.log(
              `no changes for stack ${input.stackName}`,
            );
            const shouldLogNoChanges = Effect.succeed(
              hasCreateChanges === false,
            );

            yield* Effect.when(logNoChanges, shouldLogNoChanges);
          },
        ),
      };
    }),
  },
) {}

export const printGraph = Effect.fn("StackWorkflow.printGraph")(function* (
  stackName: StackName,
) {
  const stackLifecycle = yield* AwsStackLifecycle;
  const mermaid = yield* stackLifecycle.mermaid(stackName);

  yield* Console.log(mermaid);
});

/**
 * Returns the desired resource listing for the named stack without contacting AWS. CLI list/show commands and tests use it to inspect graph-derived props and outputs through the same stack lifecycle path as apply.
 */
export const describeStackResources = Effect.fn(
  "StackWorkflow.describeStackResources",
)(function* (stackName: StackName) {
  const stackLifecycle = yield* AwsStackLifecycle;

  return yield* stackLifecycle.describeResources(stackName);
});

const ResourceFields = Schema.Record(Schema.String, Schema.Unknown);

/**
 * Reads one string field from a stack resource listing. Integration tests use it to resolve generated physical names from graph output without duplicating provider naming rules.
 */
export const stackResourceString = Effect.fn(
  "StackWorkflow.stackResourceString",
)(function* (input: {
  readonly stackName: StackName;
  readonly logicalId: string;
  readonly section: "props" | "outputs";
  readonly field: string;
}) {
  const resources = yield* describeStackResources(input.stackName);
  const resource = yield* Option.fromUndefinedOr(
    resources.find((candidate) => candidate.logicalId === input.logicalId),
  ).pipe(
    Option.match({
      onNone: () => Effect.fail(`resource not found: ${input.logicalId}`),
      onSome: Effect.succeed,
    }),
  );
  const fields = yield* Schema.decodeUnknownEffect(ResourceFields)(
    resource[input.section],
  );

  return yield* Schema.decodeUnknownEffect(Schema.String)(fields[input.field]);
});

export const listStackResources = Effect.fn("StackWorkflow.listStackResources")(
  function* (input: {
    readonly stackName: StackName;
    readonly format: ResourceOutputFormat;
  }) {
    const renderer = yield* StackWorkflowRenderer;
    const resources = yield* describeStackResources(input.stackName);

    yield* renderer.renderResources({
      stackName: input.stackName,
      format: input.format,
      resources,
    });
  },
);

export const showStackResource = Effect.fn("StackWorkflow.showStackResource")(
  function* (input: {
    readonly stackName: StackName;
    readonly logicalId: string;
    readonly format: ResourceOutputFormat;
  }) {
    const renderer = yield* StackWorkflowRenderer;
    const resources = yield* describeStackResources(input.stackName);
    const resource = yield* Option.fromUndefinedOr(
      resources.find((candidate) => candidate.logicalId === input.logicalId),
    ).pipe(
      Option.match({
        onNone: () => Effect.fail(`resource not found: ${input.logicalId}`),
        onSome: Effect.succeed,
      }),
    );

    yield* renderer.renderResources({
      stackName: input.stackName,
      format: input.format,
      resources: [resource],
    });
  },
);

export const printPlan = Effect.fn("StackWorkflow.printPlan")(function* (
  stackName: StackName,
) {
  const stackLifecycle = yield* AwsStackLifecycle;
  const planner = yield* ResourcePlanner;
  const stateStore = yield* ResourceStateStore;
  const renderer = yield* StackWorkflowRenderer;
  const prepared = yield* stackLifecycle.prepare(stackName);
  const current = yield* stateStore.loadResources(prepared.stackName);
  const resourcePlan = planner.planFromGraph(prepared.desired, current);

  yield* renderer.renderCreatePlan({
    stackName: prepared.stackName,
    createOrUpdate: resourcePlan.createOrUpdate,
  });
});

export const printLiveDiff = Effect.fn("StackWorkflow.printLiveDiff")(
  function* (input: {
    readonly profile: string;
    readonly stackName: StackName;
  }) {
    const stackLifecycle = yield* AwsStackLifecycle;
    const renderer = yield* StackWorkflowRenderer;
    const report = yield* stackLifecycle.diffLive(input);

    yield* renderer.renderDecisionReport(report);
  },
);

/**
 * Applies live AWS changes for a stack and renders the resulting decision report. Provider execution and state writes run through `AwsStackLifecycle`; this function handles CLI output only.
 */
export const applyLiveStack = Effect.fn("StackWorkflow.applyLiveStack")(
  function* (input: {
    readonly profile: string;
    readonly stackName: StackName;
  }) {
    const stackLifecycle = yield* AwsStackLifecycle;
    const renderer = yield* StackWorkflowRenderer;
    const result = yield* stackLifecycle.applyLive(input);
    const logApplied = Console.log(`applied stack ${input.stackName}`);
    const shouldLogApplied = Effect.succeed(result.applied);

    yield* renderer.renderDecisionReport(result.report);
    yield* Effect.when(logApplied, shouldLogApplied);
  },
);

/**
 * Destroys live AWS resources for a stack and renders the resulting decision report. Provider execution and physical-name cleanup run through `AwsStackLifecycle`.
 */
export const destroyStack = Effect.fn("StackWorkflow.destroyStack")(
  function* (input: {
    readonly profile: string;
    readonly stackName: StackName;
  }) {
    const stackLifecycle = yield* AwsStackLifecycle;
    const renderer = yield* StackWorkflowRenderer;
    const result = yield* stackLifecycle.destroyLive(input);

    yield* renderer.renderDecisionReport(result.report);
  },
);
