import {
  Array as Arr,
  Console,
  Context,
  Effect,
  Layer,
  Match,
  Option,
} from "effect";
import {
  keyString,
  type PlanAction,
  ResourceModel,
  type ResourceNode,
  type ResourcePlan,
  resourceModelLayer,
} from "../resource/model.js";
import type {
  ResourceApplyResult,
  ResourceDestroyResult,
  ResourceReconcileResult,
} from "./resourceStackLifecycle.js";

/**
 * StackWorkflowRenderer presents lifecycle plans and results to operators.
 * Resource labels and available provider identifiers come from lifecycle nodes
 * so displayed actions refer to the same resources execution manages.
 */
export class StackWorkflowRenderer extends Context.Service<StackWorkflowRenderer>()(
  "nomoss/core/stack/stackWorkflowRenderer",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;

      const renderResourceIdentifier = (node: ResourceNode) => {
        const identifier: string = Option.fromUndefinedOr(
          node.cloudControlIdentifier,
        ).pipe(
          Option.map((value) => `id=${value}`),
          Option.getOrElse(() => ""),
        );

        return identifier;
      };

      /**
       * renderPlan displays the selected resource actions in the lifecycle
       * plan's group order. An empty action set is reported as no changes for
       * the named stack.
       */
      const renderPlan = Effect.fn("StackWorkflowRenderer.renderPlan")(
        function* (input: {
          readonly stackName: string;
          readonly plan: ResourcePlan;
        }) {
          const actions = Arr.flatMap(
            [input.plan.delete, input.plan.createOrUpdate, input.plan.destroy],
            Arr.flatten,
          );

          yield* Console.log(`Stack "${input.stackName}"`);
          yield* Console.log("Resources");

          yield* Effect.forEach(
            actions,
            (action) => {
              const line: string = Match.value(action).pipe(
                Match.tagsExhaustive({
                  Create: ({ node }) =>
                    `\u001b[32m[+] ${model.resourceLabel(node)}\u001b[0m`,
                  Update: ({ node }) =>
                    `\u001b[33m[~] ${model.resourceLabel(node)}\u001b[0m`,
                  Delete: ({ node }) =>
                    `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
                  Destroy: ({ node }) =>
                    `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
                }),
              );

              return Console.log(line);
            },
            { discard: true },
          );

          yield* Console.log(`no changes for stack ${input.stackName}`).pipe(
            Effect.when(Effect.succeed(actions.length === 0)),
          );
        },
      );

      /**
       * renderActionStart labels each planned operation before execution.
       * These static start lines identify intended actions; they are not live
       * observations of provider acceptance or resource progress.
       */
      const renderActionStart = Effect.fn(
        "StackWorkflowRenderer.renderActionStart",
      )(function* (input: {
        readonly actions: ReadonlyArray<ReadonlyArray<PlanAction>>;
      }) {
        yield* Effect.forEach(
          Arr.flatten(input.actions),
          (action) => {
            const status: string = Match.value(action).pipe(
              Match.tagsExhaustive({
                Create: () => "creating",
                Update: () => "updating",
                Delete: () => "deleting",
                Destroy: () => "destroying",
              }),
            );

            const node = action.node;

            return Console.log(`[.] ${model.resourceLabel(node)} ${status}`);
          },
          { discard: true },
        );
      });

      /**
       * renderApplyResult reports every applied action, including deletion when
       * the final resource collection no longer contains that node. The planned
       * node retains its identifier for the deletion summary.
       */
      const renderApplyResult = Effect.fn(
        "StackWorkflowRenderer.renderApplyResult",
      )(function* (result: ResourceApplyResult) {
        const resourcesByKey = new Map(
          Arr.map(result.resources, (node) => [keyString(node.key), node]),
        );

        const actions = Arr.flatten(
          Arr.appendAll(result.plan.delete, result.plan.createOrUpdate),
        );

        yield* Console.log(`Stack "${result.stackName}"`);
        yield* Console.log("Resources");

        yield* Effect.forEach(
          actions,
          (action) => {
            const identifier = Option.fromUndefinedOr(
              resourcesByKey.get(keyString(action.node.key)),
            ).pipe(
              Option.getOrElse(() => action.node),
              renderResourceIdentifier,
            );

            const line: string = Match.value(action).pipe(
              Match.tag(
                "Create",
                ({ node }) =>
                  `\u001b[32m[+] ${model.resourceLabel(node)} created ${identifier}\u001b[0m`,
              ),
              Match.tag(
                "Update",
                ({ node }) =>
                  `\u001b[33m[~] ${model.resourceLabel(node)} updated ${identifier}\u001b[0m`,
              ),
              Match.tag(
                "Delete",
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)} deleted ${identifier}\u001b[0m`,
              ),
              Match.orElse(
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
              ),
            );

            return Console.log(line);
          },
          { discard: true },
        );

        yield* Console.log(`no changes for stack ${result.stackName}`).pipe(
          Effect.when(Effect.succeed(actions.length === 0)),
        );
      });

      /**
       * renderDestroyResult identifies resources removed by the teardown plan
       * using the provider nodes retained in its result. An empty teardown
       * reports no changes for the stack.
       */
      const renderDestroyResult = Effect.fn(
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
          (action) => {
            const identifier = Option.fromUndefinedOr(
              resourcesByKey.get(keyString(action.node.key)),
            ).pipe(
              Option.map(renderResourceIdentifier),
              Option.getOrElse(() => ""),
            );

            const line: string = Match.value(action).pipe(
              Match.tag(
                "Destroy",
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)} destroyed ${identifier}\u001b[0m`,
              ),
              Match.orElse(
                ({ node }) =>
                  `\u001b[31m[-] ${model.resourceLabel(node)}\u001b[0m`,
              ),
            );

            return Console.log(line);
          },
          { discard: true },
        );

        yield* Console.log(`no changes for stack ${result.stackName}`).pipe(
          Effect.when(Effect.succeed(actions.length === 0)),
        );
      });

      /**
       * renderReconcileResult reports resources found by their providers and
       * resources confirmed missing. Available provider identifiers accompany
       * the observed resources for subsequent operator diagnosis.
       */
      const renderReconcileResult = Effect.fn(
        "StackWorkflowRenderer.renderReconcileResult",
      )(function* (result: ResourceReconcileResult) {
        yield* Console.log(`Stack "${result.stackName}"`);
        yield* Console.log("Resources");

        yield* Effect.forEach(
          result.resources,
          (node) =>
            Console.log(
              `\u001b[36m[=] ${model.resourceLabel(node)} reconciled ${renderResourceIdentifier(node)}\u001b[0m`,
            ),
          { discard: true },
        );

        yield* Effect.forEach(
          result.missing,
          (node) =>
            Console.log(
              `\u001b[33m[?] ${model.resourceLabel(node)} not found\u001b[0m`,
            ),
          { discard: true },
        );
      });

      return {
        renderPlan,
        renderActionStart,
        renderApplyResult,
        renderDestroyResult,
        renderReconcileResult,
      };
    }),
  },
) {}

export const stackWorkflowRendererLayer = Layer.effect(
  StackWorkflowRenderer,
  StackWorkflowRenderer.make,
).pipe(Layer.provideMerge(resourceModelLayer));
