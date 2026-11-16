import {
  Array as Arr,
  Console,
  Context,
  Data,
  Effect,
  Exit,
  Fiber,
  HashSet,
  Layer,
  Ref,
  Semaphore,
} from "effect";
import { ResourceGraphStore } from "../resource/resourceGraphStore.js";
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
 * A ResourceApplicationPreparation record retains the declared resources and
 * their output callback for planning. The callback can read values that first
 * become available after successful apply.
 */
export interface ResourceApplicationPreparation<Output>
  extends ResourcePreparedStack {
  readonly output: () => Output;
}

/**
 * A ResourceApplicationPlan record retains the resources and output callback
 * reviewed by its caller. Execute it once through the operations instance that
 * prepared it. Changed saved state invalidates it before provider mutation.
 */
export interface ResourceApplicationPlan<Output> extends ResourceApplyPlan {
  readonly output: () => Output;
}

/**
 * A ResourceApplicationResult record includes evaluated application outputs
 * after successful apply, including when the plan required no changes.
 */
export interface ResourceApplicationResult<Output> extends ResourceApplyResult {
  readonly outputs: Output;
}

/**
 * A ResourceStackOutputFailed error preserves the callback's failure after
 * resource changes have been saved. Reconciliation and a new declaration can
 * recover absent provider values before another apply evaluates the callback.
 */
export class ResourceStackOutputFailed extends Data.TaggedError(
  "ResourceStackOutputFailed",
)<{ readonly stackName: string; readonly cause: unknown }> {}

/**
 * A ResourcePlanUnavailable error rejects plans used after their owning scope
 * closes, passed to another operations instance, or reserved for execution
 * already. Failure or interruption after reservation requires a fresh plan.
 */
export class ResourcePlanUnavailable extends Data.TaggedError(
  "ResourcePlanUnavailable",
)<{
  readonly stackName: string;
  readonly reason: "RuntimeClosed" | "RuntimeMismatch" | "PlanUsed";
}> {}

/**
 * The ResourceStackOperations service keeps reviewed plans valid within the
 * application scope that supplies its dependencies. Declarations and execution
 * use those same services. Closing that scope interrupts active operations and
 * makes retained plans unavailable. Each declaration must acquire
 * beginDeclaration in a native Effect scope and finish preparation before that
 * scope closes.
 */
export class ResourceStackOperations extends Context.Service<ResourceStackOperations>()(
  "nomoss/core/stack/resourceStackOperations",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphStore;
      const lifecycle = yield* ResourceStackLifecycle;
      const renderer = yield* StackWorkflowRenderer;
      const owner = yield* Effect.scope;
      const active = yield* Ref.make(true);
      const execution = yield* Semaphore.make(1);
      const retained = yield* Ref.make(HashSet.empty<ResourcePreparedStack>());
      const claimed = yield* Ref.make(
        HashSet.empty<ResourceApplyPlan | ResourceDestroyPlan>(),
      );

      yield* Effect.addFinalizer(() =>
        Ref.set(active, false).pipe(
          Effect.andThen(Ref.set(retained, HashSet.empty())),
          Effect.andThen(Ref.set(claimed, HashSet.empty())),
        ),
      );

      /**
       * The verifyOwnership service method checks that a preparation or plan
       * belongs to this open application before planning or execution uses it.
       */
      const verifyOwnership = Effect.fn(
        "ResourceStackOperations.verifyOwnership",
      )(function* (record: ResourcePreparedStack) {
        const isActive = yield* Ref.get(active);
        yield* Effect.fail(
          new ResourcePlanUnavailable({
            stackName: record.stackName,
            reason: "RuntimeClosed",
          }),
        ).pipe(Effect.when(Effect.succeed(!isActive)));

        const records = yield* Ref.get(retained);
        yield* Effect.fail(
          new ResourcePlanUnavailable({
            stackName: record.stackName,
            reason: "RuntimeMismatch",
          }),
        ).pipe(Effect.when(Effect.succeed(!HashSet.has(records, record))));

        const checked: undefined = undefined;
        return checked;
      });

      /**
       * The reservePlan service method consumes an owned plan before provider
       * work starts. A concurrent or later attempt to reserve it fails even if its
       * first execution failed or was interrupted.
       */
      const reservePlan = Effect.fn("ResourceStackOperations.reservePlan")(
        function* (plan: ResourceApplyPlan | ResourceDestroyPlan) {
          yield* verifyOwnership(plan);
          const previous = yield* Ref.getAndUpdate(claimed, (records) =>
            HashSet.add(records, plan),
          );
          yield* Effect.fail(
            new ResourcePlanUnavailable({
              stackName: plan.stackName,
              reason: "PlanUsed",
            }),
          ).pipe(Effect.when(Effect.succeed(HashSet.has(previous, plan))));

          const reserved: undefined = undefined;
          return reserved;
        },
      );

      /**
       * The beginDeclaration service method acquires exclusive graph access
       * until the caller's declaration scope closes. Register resources and call
       * prepare in that scope. A failed or interrupted declaration clears its
       * partial graph, and closing the scope stops its scoped provider work.
       */
      const beginDeclaration = Effect.fn(
        "ResourceStackOperations.beginDeclaration",
      )(function* (stackName: string) {
        const isActive = yield* Ref.get(active);
        yield* Effect.fail(
          new ResourcePlanUnavailable({ stackName, reason: "RuntimeClosed" }),
        ).pipe(Effect.when(Effect.succeed(!isActive)));

        yield* execution.takeScoped(1);
        yield* Effect.addFinalizer((exit) =>
          graph.reset.pipe(Effect.when(Effect.succeed(Exit.isFailure(exit)))),
        );
        yield* graph.reset;

        const started: undefined = undefined;
        return started;
      });

      /**
       * The prepare service method captures the resources registered since
       * beginDeclaration and restores their saved values. Call it before the
       * declaration scope closes. The supplied callback remains unevaluated
       * until apply succeeds, and its return type determines application outputs.
       */
      const prepare = Effect.fn("ResourceStackOperations.prepare")(function* <
        Output,
      >(stackName: string, output: () => Output) {
        const stack = yield* lifecycle.prepare(stackName);
        const prepared: ResourceApplicationPreparation<Output> = {
          ...stack,
          output,
        };
        yield* Ref.update(retained, (records) =>
          HashSet.add(records, prepared),
        );
        return prepared;
      });

      /**
       * The planPrepared service method plans an owned preparation without
       * rerunning its declaration. Later declarations cannot change the
       * resources or callback captured in the returned plan.
       */
      const planPrepared = Effect.fn("ResourceStackOperations.planPrepared")(
        function* <Output>(prepared: ResourceApplicationPreparation<Output>) {
          yield* verifyOwnership(prepared);
          const stack = yield* lifecycle.plan(prepared);
          const planned: ResourceApplicationPlan<Output> = {
            ...stack,
            output: prepared.output,
          };
          yield* Ref.update(retained, (records) =>
            HashSet.add(records, planned),
          );
          return planned;
        },
        execution.withPermits(1),
        Effect.scoped,
        (operation) =>
          Effect.acquireUseRelease(
            Effect.forkIn(operation, owner),
            Fiber.join,
            Fiber.interrupt,
          ),
        (operation, prepared) =>
          verifyOwnership(prepared).pipe(Effect.andThen(operation)),
      );

      /**
       * The applyPrepared service method executes a reviewed plan once and
       * evaluates its outputs after successful lifecycle writes. Changed saved
       * state rejects execution before mutation. Output evaluation failure
       * preserves resources already saved. Caller interruption stops provider
       * work, and a retry requires a fresh plan.
       */
      const applyPrepared = Effect.fn("ResourceStackOperations.applyPrepared")(
        function* <Output>(planned: ResourceApplicationPlan<Output>) {
          yield* reservePlan(planned);
          const applied = yield* lifecycle.applyPlan(planned);
          const outputs = yield* Effect.try({
            try: planned.output,
            catch: (cause) =>
              new ResourceStackOutputFailed({
                stackName: planned.stackName,
                cause,
              }),
          });
          const result: ResourceApplicationResult<Output> = {
            ...applied,
            outputs,
          };
          return result;
        },
        execution.withPermits(1),
        Effect.scoped,
        (operation) =>
          Effect.acquireUseRelease(
            Effect.forkIn(operation, owner),
            Fiber.join,
            Fiber.interrupt,
          ),
        (operation, planned) =>
          verifyOwnership(planned).pipe(Effect.andThen(operation)),
      );

      /**
       * The planDestroyPrepared service method captures reviewed removals from
       * an owned preparation. Pass its plan to destroyPrepared through this
       * instance while the application's scope remains open.
       */
      const planDestroyPrepared = Effect.fn(
        "ResourceStackOperations.planDestroyPrepared",
      )(
        function* (prepared: ResourcePreparedStack) {
          yield* verifyOwnership(prepared);
          const planned: ResourceDestroyPlan =
            yield* lifecycle.planDestroy(prepared);
          yield* Ref.update(retained, (records) =>
            HashSet.add(records, planned),
          );
          return planned;
        },
        execution.withPermits(1),
        Effect.scoped,
        (operation) =>
          Effect.acquireUseRelease(
            Effect.forkIn(operation, owner),
            Fiber.join,
            Fiber.interrupt,
          ),
        (operation, prepared) =>
          verifyOwnership(prepared).pipe(Effect.andThen(operation)),
      );

      /**
       * The destroyPrepared service method reserves reviewed removals for one
       * execution. Changed saved state invalidates the plan before removal.
       * Failure or interruption requires a fresh plan from saved progress.
       */
      const destroyPrepared = Effect.fn(
        "ResourceStackOperations.destroyPrepared",
      )(
        function* (planned: ResourceDestroyPlan) {
          yield* reservePlan(planned);
          const result: ResourceDestroyResult =
            yield* lifecycle.destroyPlan(planned);
          return result;
        },
        execution.withPermits(1),
        Effect.scoped,
        (operation) =>
          Effect.acquireUseRelease(
            Effect.forkIn(operation, owner),
            Fiber.join,
            Fiber.interrupt,
          ),
        (operation, planned) =>
          verifyOwnership(planned).pipe(Effect.andThen(operation)),
      );

      /**
       * The apply service method plans a completed declaration against current
       * saved state and returns its evaluated outputs. Evaluate the application's
       * declaration Effect again when its desired configuration changes.
       */
      const apply = Effect.fn("ResourceStackOperations.apply")(function* <
        Output,
      >(prepared: ResourceApplicationPreparation<Output>) {
        const planned = yield* planPrepared(prepared);
        const result: ResourceApplicationResult<Output> =
          yield* applyPrepared(planned);
        return result;
      });

      /**
       * The reconcile service method refreshes the saved resources of an owned
       * preparation without evaluating application outputs. Its result identifies
       * resources observed at the provider and those confirmed missing.
       */
      const reconcile = Effect.fn("ResourceStackOperations.reconcile")(
        function* (prepared: ResourcePreparedStack) {
          yield* verifyOwnership(prepared);
          const result: ResourceReconcileResult =
            yield* lifecycle.reconcile(prepared);
          return result;
        },
        execution.withPermits(1),
        Effect.scoped,
        (operation) =>
          Effect.acquireUseRelease(
            Effect.forkIn(operation, owner),
            Fiber.join,
            Fiber.interrupt,
          ),
        (operation, prepared) =>
          verifyOwnership(prepared).pipe(Effect.andThen(operation)),
      );

      /**
       * The destroy service method plans and executes removals from a completed
       * declaration without evaluating its output callback.
       */
      const destroy = Effect.fn("ResourceStackOperations.destroy")(function* (
        prepared: ResourcePreparedStack,
      ) {
        const planned = yield* planDestroyPrepared(prepared);
        const result: ResourceDestroyResult = yield* destroyPrepared(planned);
        return result;
      });

      /**
       * The renderPlan service method returns the plan it displays so its
       * caller can pass that reviewed plan to applyPrepared.
       */
      const renderPlan = Effect.fn("ResourceStackOperations.renderPlan")(
        function* <Output>(prepared: ResourceApplicationPreparation<Output>) {
          const planned: ResourceApplicationPlan<Output> =
            yield* planPrepared(prepared);
          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });
          return planned;
        },
      );

      /**
       * The renderApply service method returns evaluated application outputs
       * and displays the apply result, including an unchanged plan.
       */
      const renderApply = Effect.fn("ResourceStackOperations.renderApply")(
        function* <Output>(prepared: ResourceApplicationPreparation<Output>) {
          const result: ResourceApplicationResult<Output> =
            yield* apply(prepared);
          yield* renderer.renderApplyResult(result);
          yield* Console.log(`applied stack ${result.stackName}`).pipe(
            Effect.when(Effect.succeed(result.applied)),
          );
          return result;
        },
      );

      /**
       * The renderPlanThenApply service method executes exactly the plan it
       * displays. A saved-state change before execution invalidates the plan.
       */
      const renderPlanThenApply = Effect.fn(
        "ResourceStackOperations.renderPlanThenApply",
      )(function* <Output>(prepared: ResourceApplicationPreparation<Output>) {
        const planned = yield* renderPlan(prepared);
        yield* renderer.renderActionStart({
          actions: Arr.appendAll(
            planned.plan.delete,
            planned.plan.createOrUpdate,
          ),
        });
        const result: ResourceApplicationResult<Output> =
          yield* applyPrepared(planned);
        yield* renderer
          .renderApplyResult(result)
          .pipe(Effect.when(Effect.succeed(result.applied)));
        return result;
      });

      /**
       * The renderReconcile service method returns and displays refreshed
       * provider observations, including resources confirmed missing.
       */
      const renderReconcile = Effect.fn(
        "ResourceStackOperations.renderReconcile",
      )(function* (prepared: ResourcePreparedStack) {
        const result: ResourceReconcileResult = yield* reconcile(prepared);
        yield* renderer.renderReconcileResult(result);
        return result;
      });

      /**
       * The renderDestroy service method executes the removals it displays and
       * returns their result. Changed saved state rejects the reviewed plan
       * before provider mutation.
       */
      const renderDestroy = Effect.fn("ResourceStackOperations.renderDestroy")(
        function* (prepared: ResourcePreparedStack) {
          const planned = yield* planDestroyPrepared(prepared);
          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });
          yield* renderer.renderActionStart({ actions: planned.plan.destroy });
          const result: ResourceDestroyResult = yield* destroyPrepared(planned);
          yield* renderer.renderDestroyResult(result);
          return result;
        },
      );

      return {
        beginDeclaration,
        prepare,
        verifyOwnership,
        reservePlan,
        planPrepared,
        applyPrepared,
        planDestroyPrepared,
        destroyPrepared,
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
