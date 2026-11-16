import {
  Array as Arr,
  Console,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  String as Str,
} from "effect";
import {
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
 * The StackWorkflowRenderer service uses the lifecycle plan and applied nodes
 * as the authority for displayed operations and provider identities. Replacement
 * order remains visible during review, and completion summaries identify the
 * applied successor so operators can follow changes to provider ownership.
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
       * The renderPlan service method includes replacement operation order so
       * an operator can review changes that will replace provider identities.
       * It retains the plan's action group order and reports an empty plan as
       * no changes for the named stack.
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
                  Replace: ({ node, operations }) =>
                    `\u001b[33m[+-] ${model.resourceLabel(node)} replace (${Arr.join(
                      Arr.map(operations, (operation) =>
                        Str.toLowerCase(operation._tag),
                      ),
                      " then ",
                    )})\u001b[0m`,
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
       * The renderActionStart service method receives the plan's actions before
       * provider observations are available. Its static status lines identify
       * intended work and remain unchanged throughout provider execution.
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
                Replace: () => "replacing",
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
       * The renderApplyResult service method uses final applied identities for
       * creation, update, and replacement summaries. A removed resource uses
       * the identity retained by its plan because the final resource collection
       * has released ownership of that object.
       */
      const renderApplyResult = Effect.fn(
        "StackWorkflowRenderer.renderApplyResult",
      )(function* (result: ResourceApplyResult) {
        const resourcesByKey = new Map(
          Arr.map(result.resources, (node) => [node.key.logicalId, node]),
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
              resourcesByKey.get(action.node.key.logicalId),
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
                "Replace",
                ({ node }) =>
                  `\u001b[33m[+-] ${model.resourceLabel(node)} replaced ${identifier}\u001b[0m`,
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
       * The renderDestroyResult service method identifies resources removed by the teardown plan
       * through the provider nodes retained in its result. An empty teardown
       * reports no changes for the stack.
       */
      const renderDestroyResult = Effect.fn(
        "StackWorkflowRenderer.renderDestroyResult",
      )(function* (result: ResourceDestroyResult) {
        const resourcesByKey = new Map(
          Arr.map(result.resources, (node) => [node.key.logicalId, node]),
        );

        const actions = Arr.flatten(result.plan.destroy);

        yield* Console.log(`Stack "${result.stackName}"`);
        yield* Console.log("Resources");

        yield* Effect.forEach(
          actions,
          (action) => {
            const identifier = Option.fromUndefinedOr(
              resourcesByKey.get(action.node.key.logicalId),
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
