import {
  Array as Arr,
  Console,
  Context,
  Effect,
  Record as EffectRecord,
  Formatter,
  Match,
  Option,
  Schema,
} from "effect";

import { keyString, type ResourcePlan } from "./model.js";
import type {
  ResourceApplyResult,
  ResourceDestroyResult,
} from "./resourceStackLifecycle.js";

const ResourceOutputSummarySchema = Schema.Record(Schema.String, Schema.Json);

/** Formats resource outputs while keeping Stripe webhook state secret-free in CLI output. */
const renderResourceOutputSummary = (node: {
  readonly outputs: unknown;
  readonly schema: { readonly provider: string; readonly resource: string };
}) =>
  Schema.decodeUnknownOption(ResourceOutputSummarySchema)(node.outputs).pipe(
    Option.map((outputs) =>
      Arr.map(EffectRecord.toEntries(outputs), ([key, value]) =>
        Match.value({
          key,
          provider: node.schema.provider,
          resource: node.schema.resource,
        }).pipe(
          Match.when(
            {
              key: "WebhookSigningSecret",
              provider: "stripe",
              resource: "webhook-endpoint",
            },
            () => "WebhookSigningSecret=<redacted>",
          ),
          Match.orElse(() => `${key}=${Formatter.format(value)}`),
        ),
      ).join(" "),
    ),
    Option.filter((summary) => summary.length > 0),
    Option.getOrElse(() => ""),
  );

/**
 * Resource applications use this service for operator output after the core
 * planner and lifecycle return structured stack results. The service keeps
 * display formatting in core so provider packages do not define app-facing
 * workflow renderers.
 */
export class StackWorkflowRenderer extends Context.Service<StackWorkflowRenderer>()(
  "nomoss/core/stackWorkflowRenderer",
  {
    make: Effect.succeed({
      renderPlan: Effect.fn("StackWorkflowRenderer.renderPlan")(
        function* (input: {
          readonly stackName: string;
          readonly plan: ResourcePlan;
        }) {
          const actions = Arr.appendAll(
            Arr.flatten(input.plan.createOrUpdate),
            Arr.appendAll(
              Arr.flatten(input.plan.delete),
              Arr.flatten(input.plan.destroy),
            ),
          );

          yield* Console.log(`Stack "${input.stackName}"`);
          yield* Console.log("Resources");
          yield* Effect.forEach(
            actions,
            (action) =>
              Effect.gen(function* () {
                const line = Match.value(action).pipe(
                  Match.tagsExhaustive({
                    Create: ({ node }) =>
                      `\u001b[32m[+] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId}\u001b[0m`,
                    Update: ({ node }) =>
                      `\u001b[33m[~] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId}\u001b[0m`,
                    Delete: ({ node }) =>
                      `\u001b[31m[-] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId}\u001b[0m`,
                    Destroy: ({ node }) =>
                      `\u001b[31m[-] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId}\u001b[0m`,
                  }),
                );

                yield* Console.log(line);
              }),
            {
              discard: true,
            },
          );
          yield* Effect.when(
            Console.log(`no changes for stack ${input.stackName}`),
            Effect.succeed(actions.length === 0),
          );
        },
      ),

      renderApplyResult: Effect.fn("StackWorkflowRenderer.renderApplyResult")(
        function* (result: ResourceApplyResult) {
          const resourcesByKey = new Map(
            Arr.map(result.resources, (node) => [keyString(node.key), node]),
          );
          const actions = Arr.flatten(result.plan.createOrUpdate);

          yield* Console.log(`Stack "${result.stackName}"`);
          yield* Console.log("Resources");
          yield* Effect.forEach(
            actions,
            (action) =>
              Effect.gen(function* () {
                const label = Option.fromUndefinedOr(
                  resourcesByKey.get(keyString(action.node.key)),
                ).pipe(
                  Option.map((node) =>
                    renderResourceOutputSummary(node),
                  ),
                  Option.getOrElse(() => ""),
                );
                const line = Match.value(action).pipe(
                  Match.when(
                    { _tag: "Create" },
                    ({ node }) =>
                      `\u001b[32m[+] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId} created ${label}\u001b[0m`,
                  ),
                  Match.when(
                    { _tag: "Update" },
                    ({ node }) =>
                      `\u001b[33m[~] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId} updated ${label}\u001b[0m`,
                  ),
                  Match.orElse(
                    ({ node }) =>
                      `\u001b[31m[-] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId}\u001b[0m`,
                  ),
                );

                yield* Console.log(line);
              }),
            {
              discard: true,
            },
          );
          yield* Effect.when(
            Console.log(`no changes for stack ${result.stackName}`),
            Effect.succeed(actions.length === 0),
          );
        },
      ),

      renderDestroyResult: Effect.fn(
        "StackWorkflowRenderer.renderDestroyResult",
      )(function* (result: ResourceDestroyResult) {
        const resourcesByKey = new Map(
          Arr.map(result.resources, (node) => [keyString(node.key), node]),
        );
        const actions = Arr.flatten(result.plan.destroy);

        yield* Console.log(`Stack "${result.stackName}"`);
        yield* Console.log("Resources");
        yield* Effect.forEach(
          actions,
          (action) =>
            Effect.gen(function* () {
              const label = Option.fromUndefinedOr(
                resourcesByKey.get(keyString(action.node.key)),
              ).pipe(
                  Option.map((node) =>
                    renderResourceOutputSummary(node),
                ),
                Option.getOrElse(() => ""),
              );
              const line = Match.value(action).pipe(
                Match.when(
                  { _tag: "Destroy" },
                  ({ node }) =>
                    `\u001b[31m[-] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId} destroyed ${label}\u001b[0m`,
                ),
                Match.orElse(
                  ({ node }) =>
                    `\u001b[31m[-] ${node.schema.provider}:${node.schema.service}:${node.schema.resource} ${node.key.logicalId}\u001b[0m`,
                ),
              );

              yield* Console.log(line);
            }),
          {
            discard: true,
          },
        );
        yield* Effect.when(
          Console.log(`no changes for stack ${result.stackName}`),
          Effect.succeed(actions.length === 0),
        );
      }),
    }),
  },
) {}
