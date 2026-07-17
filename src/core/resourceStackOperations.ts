import { Console, Context, Data, Effect, Option } from "effect";

import { ResourceStackDefinition } from "./resourceStackDefinition.js";
import { ResourceStackLifecycle } from "./resourceStackLifecycle.js";
import { StackWorkflowRenderer } from "./stackWorkflowRenderer.js";

export class ResourceStackOperationFailed extends Data.TaggedError(
  "ResourceStackOperationFailed",
)<{
  readonly stackName: string;
  readonly operation: "plan" | "apply" | "destroy";
  readonly cause: unknown;
}> {}

/**
 * Resource stack operations run an application-provided stack declaration
 * through Nomoss graph preparation, planning, mutation, state persistence,
 * and operator rendering. Consumers use this service for plan, apply, and
 * destroy entrypoints instead of assembling lifecycle and renderer calls.
 */
export class ResourceStackOperations extends Context.Service<ResourceStackOperations>()(
  "nomoss/core/resourceStackOperations",
  {
    make: Effect.gen(function* () {
      const definition = yield* ResourceStackDefinition;
      const lifecycle = yield* ResourceStackLifecycle;
      const renderer = yield* StackWorkflowRenderer;

      const prepare = Effect.fn("ResourceStackOperations.prepare")(
        function* () {
          yield* definition.declare();

          return yield* lifecycle.prepare(definition.stackName);
        },
      );
      const plan = Effect.fn("ResourceStackOperations.plan")(function* () {
        const prepared = yield* prepare();

        return yield* lifecycle.plan(prepared).pipe(
          Effect.mapError(
            (cause) =>
              new ResourceStackOperationFailed({
                stackName: definition.stackName,
                operation: "plan",
                cause,
              }),
          ),
        );
      });
      const apply = Effect.fn("ResourceStackOperations.apply")(function* () {
        const prepared = yield* prepare();

        return yield* lifecycle.apply(prepared).pipe(
          Effect.mapError(
            (cause) =>
              new ResourceStackOperationFailed({
                stackName: definition.stackName,
                operation: "apply",
                cause,
              }),
          ),
        );
      });
      const destroy = Effect.fn("ResourceStackOperations.destroy")(
        function* () {
          const prepared = yield* prepare();

          return yield* lifecycle.destroy(prepared).pipe(
            Effect.mapError(
              (cause) =>
                new ResourceStackOperationFailed({
                  stackName: definition.stackName,
                  operation: "destroy",
                  cause,
                }),
            ),
          );
        },
      );

      return {
        prepare,
        plan,
        apply,
        destroy,
        renderPlan: Effect.fn("ResourceStackOperations.renderPlan")(
          function* () {
            const stackPlan = yield* plan();

            yield* renderer.renderPlan({
              stackName: definition.stackName,
              plan: stackPlan,
            });
          },
        ),
        renderApply: Effect.fn("ResourceStackOperations.renderApply")(
          function* () {
            const result = yield* apply();

            yield* renderer.renderApplyResult(result);
            yield* Option.match(
              Option.liftPredicate(result, (value) => value.applied),
              {
                onNone: () => Effect.void,
                onSome: () =>
                  Console.log(`applied stack ${definition.stackName}`),
              },
            );
          },
        ),
        renderDestroy: Effect.fn("ResourceStackOperations.renderDestroy")(
          function* () {
            const result = yield* destroy();

            yield* renderer.renderDestroyResult(result);
            yield* Option.match(
              Option.liftPredicate(result, (value) => value.destroyed),
              {
                onNone: () => Effect.void,
                onSome: () =>
                  Console.log(`destroyed stack ${definition.stackName}`),
              },
            );
          },
        ),
      };
    }),
  },
) {}
