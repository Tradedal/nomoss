import {
  Array as Arr,
  Console,
  Context,
  Effect,
  Layer,
  Semaphore,
} from "effect";
import { ResourceGraphStore } from "../resource/resourceGraphStore.js";
import { ResourceStackDefinition } from "./resourceStackDefinition.js";
import {
  type ResourceApplyPlan,
  type ResourceApplyResult,
  type ResourceDestroyPlan,
  type ResourceDestroyResult,
  type ResourcePreparedStack,
  type ResourceReconcileResult,
  ResourceStackLifecycle,
} from "./resourceStackLifecycle.js";
import { StackWorkflowRenderer } from "./stackWorkflowRenderer.js";

/**
 * ResourceStackOperations exposes the application's declared stack to CLI and
 * embedded callers. Prepared-plan methods separate declaration, review, and
 * execution while retaining the shared lifecycle graph.
 */
export class ResourceStackOperations extends Context.Service<ResourceStackOperations>()(
  "nomoss/core/stack/resourceStackOperations",
  {
    make: Effect.gen(function* () {
      const definition = yield* ResourceStackDefinition;
      const graph = yield* ResourceGraphStore;
      const lifecycle = yield* ResourceStackLifecycle;
      const renderer = yield* StackWorkflowRenderer;
      const declaration = yield* Semaphore.make(1);

      /**
       * prepare returns an isolated snapshot of the application's declaration
       * for planning. Concurrent declarations wait for one another, and a
       * failed or interrupted declaration leaves no partial graph for later use.
       */
      const prepare = Effect.fn("ResourceStackOperations.prepare")(
        function* () {
          yield* graph.reset;

          yield* definition.program.pipe(Effect.onError(() => graph.reset));

          const prepared: ResourcePreparedStack = yield* lifecycle.prepare(
            definition.stackName,
          );

          return prepared;
        },
        declaration.withPermits(1),
      );

      /**
       * planPrepared returns proposed changes for a retained declaration
       * snapshot without running the application's declaration again.
       */
      const planPrepared = Effect.fn("ResourceStackOperations.planPrepared")(
        function* (prepared: ResourcePreparedStack) {
          const planned: ResourceApplyPlan = yield* lifecycle.plan(prepared);

          return planned;
        },
      );

      /**
       * applyPrepared executes the supplied reviewed plan. A change to saved
       * lifecycle records requires another plan before any provider mutation.
       */
      const applyPrepared = Effect.fn("ResourceStackOperations.applyPrepared")(
        function* (planned: ResourceApplyPlan) {
          const result: ResourceApplyResult =
            yield* lifecycle.applyPlan(planned);

          return result;
        },
      );

      /**
       * planDestroyPrepared returns teardown actions and captured state for
       * the supplied declaration, allowing review before provider changes.
       */
      const planDestroyPrepared = Effect.fn(
        "ResourceStackOperations.planDestroyPrepared",
      )(function* (prepared: ResourcePreparedStack) {
        const planned: ResourceDestroyPlan =
          yield* lifecycle.planDestroy(prepared);

        return planned;
      });

      /**
       * destroyPrepared executes the supplied teardown plan after validating
       * its saved state. It does not replace the reviewed graph or action set
       * with a fresh application declaration.
       */
      const destroyPrepared = Effect.fn(
        "ResourceStackOperations.destroyPrepared",
      )(function* (planned: ResourceDestroyPlan) {
        const result: ResourceDestroyResult =
          yield* lifecycle.destroyPlan(planned);

        return result;
      });

      /**
       * plan returns proposed changes from a fresh application declaration.
       * No provider mutations occur, and the result can be retained for a later
       * applyPrepared call.
       */
      const plan = Effect.fn("ResourceStackOperations.plan")(function* () {
        const prepared = yield* prepare();

        const planned: ResourceApplyPlan = yield* planPrepared(prepared);

        return planned;
      });

      /**
       * apply executes changes from a fresh application declaration and returns
       * the lifecycle result without rendering terminal output.
       */
      const apply = Effect.fn("ResourceStackOperations.apply")(function* () {
        const planned = yield* plan();

        const result: ResourceApplyResult = yield* applyPrepared(planned);

        return result;
      });

      /**
       * reconcile refreshes the freshly declared stack's provider observations
       * and saved resources. Present and missing resources remain distinct in
       * the returned result for embedded callers and command presentation.
       */
      const reconcile = Effect.fn("ResourceStackOperations.reconcile")(
        function* () {
          const prepared = yield* prepare();

          const result: ResourceReconcileResult =
            yield* lifecycle.reconcile(prepared);

          return result;
        },
      );

      /**
       * destroy executes teardown selected from a fresh application declaration
       * and the stack's saved state. The returned lifecycle result is available
       * without requiring terminal presentation.
       */
      const destroy = Effect.fn("ResourceStackOperations.destroy")(
        function* () {
          const prepared = yield* prepare();

          const planned = yield* planDestroyPrepared(prepared);

          const result: ResourceDestroyResult = yield* destroyPrepared(planned);

          return result;
        },
      );

      /**
       * renderPlan displays proposed changes from a fresh declaration without
       * applying them, providing the CLI's diff behavior.
       */
      const renderPlan = Effect.fn("ResourceStackOperations.renderPlan")(
        function* () {
          const planned = yield* plan();

          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });
        },
      );

      /**
       * renderApply executes the freshly declared stack and displays its final
       * results. A stack-level completion message appears only when the plan
       * contained applied changes.
       */
      const renderApply = Effect.fn("ResourceStackOperations.renderApply")(
        function* () {
          const result = yield* apply();

          yield* renderer.renderApplyResult(result);

          yield* Console.log(`applied stack ${result.stackName}`).pipe(
            Effect.when(Effect.succeed(result.applied)),
          );
        },
      );

      /**
       * renderPlanThenApply executes the plan shown to the operator. Changed
       * lifecycle records invalidate it before provider mutation, ensuring
       * execution cannot silently use a different plan from the displayed one.
       */
      const renderPlanThenApply = Effect.fn(
        "ResourceStackOperations.renderPlanThenApply",
      )(function* () {
        const planned = yield* plan();

        yield* renderer.renderPlan({
          stackName: planned.stackName,
          plan: planned.plan,
        });

        yield* renderer.renderActionStart({
          actions: Arr.appendAll(
            planned.plan.delete,
            planned.plan.createOrUpdate,
          ),
        });

        const result = yield* applyPrepared(planned);

        yield* renderer
          .renderApplyResult(result)
          .pipe(Effect.when(Effect.succeed(result.applied)));
      });

      /**
       * renderReconcile displays the present and missing resources observed by
       * reconciliation of a fresh application declaration.
       */
      const renderReconcile = Effect.fn(
        "ResourceStackOperations.renderReconcile",
      )(function* () {
        const result = yield* reconcile();

        yield* renderer.renderReconcileResult(result);
      });

      /**
       * renderDestroy displays a teardown plan and executes that same plan.
       * Changed saved state invalidates execution before mutation, and a
       * completed teardown produces the resource removal summary.
       */
      const renderDestroy = Effect.fn("ResourceStackOperations.renderDestroy")(
        function* () {
          const prepared = yield* prepare();

          const planned = yield* planDestroyPrepared(prepared);

          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });

          yield* renderer.renderActionStart({ actions: planned.plan.destroy });

          const result = yield* destroyPrepared(planned);

          yield* renderer
            .renderDestroyResult(result)
            .pipe(Effect.when(Effect.succeed(result.destroyed)));
        },
      );

      return {
        prepare,
        planPrepared,
        applyPrepared,
        planDestroyPrepared,
        destroyPrepared,
        plan,
        apply,
        reconcile,
        destroy,
        renderPlan,
        renderApply,
        renderPlanThenApply,
        renderReconcile,
        renderDestroy,
      };
    }),
  },
) {}

export const resourceStackOperationsLayer = Layer.effect(
  ResourceStackOperations,
  ResourceStackOperations.make,
);
