import {
  Array as Arr,
  Cause,
  Context,
  Data,
  Effect,
  Exit,
  Fiber,
  Graph,
  HashMap,
  Layer,
  Match,
  Option,
  Ref,
  Semaphore,
} from "effect";
import { ResourceGraphStore } from "../resource/resourceGraphStore.js";
import { ResourceStateStore } from "../state/stateStore.js";
import { ResourceStackName } from "./resourceStackDefinition.js";
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
)<{
  readonly stackName: string;
  readonly cause: unknown;
}> {}

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
 * The ResourceStackOperationRejected error tells an operator which apply
 * command matches the resources recorded in the reviewed plan.
 */
export class ResourceStackOperationRejected extends Data.TaggedError(
  "ResourceStackOperationRejected",
)<{
  readonly stackName: string;
  readonly operation: "create" | "update";
  readonly message: string;
}> {}

/** The SavedResourceNotFound error directs state lookup callers to saved logical IDs. */
class SavedResourceNotFound extends Data.TaggedError("SavedResourceNotFound")<{
  readonly stackName: string;
  readonly logicalId: string;
}> {
  override get message() {
    return `Stack "${this.stackName}" has no saved resource "${this.logicalId}". Run state list to see saved logical IDs.`;
  }
}

/**
 * The ResourceStackOperations service prepares declarations, reviews changes,
 * and executes plans within the application's scope. A reviewed plan belongs
 * to this service instance and can execute once. A later runtime creates a
 * new plan from saved state.
 */
export class ResourceStackOperations extends Context.Service<ResourceStackOperations>()(
  "nomoss/core/stack/resourceStackOperations",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphStore;
      const stateStore = yield* ResourceStateStore;
      const lifecycle = yield* ResourceStackLifecycle;
      const renderer = yield* StackWorkflowRenderer;

      const owner = yield* Effect.scope;
      const execution = yield* Semaphore.make(1);

      const records = yield* Ref.make<
        Option.Option<
          HashMap.HashMap<ResourcePreparedStack, "Available" | "Used">
        >
      >(Option.some(HashMap.empty()));

      yield* Effect.addFinalizer(() => Ref.set(records, Option.none()));

      const openRecords = (stackName: string) =>
        Ref.get(records).pipe(
          Effect.flatMap(Effect.fromOption),
          Effect.mapError(
            () =>
              new ResourcePlanUnavailable({
                stackName,
                reason: "RuntimeClosed",
              }),
          ),
        );

      const retain = (
        record: ResourcePreparedStack,
        status: "Available" | "Used" = "Available",
      ) =>
        Ref.update(
          records,
          Option.map((open) => HashMap.set(open, record, status)),
        );

      const ownedRecord = (record: ResourcePreparedStack) =>
        openRecords(record.stackName).pipe(
          Effect.flatMap((open) =>
            HashMap.get(open, record).pipe(
              Effect.fromOption,
              Effect.mapError(
                () =>
                  new ResourcePlanUnavailable({
                    stackName: record.stackName,
                    reason: "RuntimeMismatch",
                  }),
              ),
            ),
          ),
        );

      const claimPlan = (plan: ResourceApplyPlan | ResourceDestroyPlan) =>
        ownedRecord(plan).pipe(
          Effect.filterOrFail(
            (status) => status === "Available",
            () =>
              new ResourcePlanUnavailable({
                stackName: plan.stackName,
                reason: "PlanUsed",
              }),
          ),
          Effect.andThen(retain(plan, "Used")),
        );

      /**
       * A reviewed plan can wait behind another operation. Check it again
       * under the permit so only one caller can start executing it. Shutdown
       * stops the work through Effect.forkIn, and caller cancellation stops it
       * through the acquireUseRelease finalizer.
       *
       * See “Fork in Specific Scope” in the Effect v4 guide
       * concurrency/fibers.mdx and acquireUseRelease in Effect.ts.
       */
      const runInApplication = Effect.fnUntraced(function* <A, E, R>(
        record: ResourcePreparedStack,
        operation: Effect.Effect<A, E, R>,
      ) {
        yield* ownedRecord(record);

        return yield* Effect.acquireUseRelease(
          operation.pipe(
            Effect.catchCause((cause) =>
              Effect.failCause(
                Cause.annotate(
                  cause,
                  Context.make(ResourceStackName, record.stackName),
                ),
              ),
            ),
            Effect.scoped,
            execution.withPermit,
            Effect.forkIn(owner),
          ),
          Fiber.join,
          Fiber.interrupt,
        );
      });

      const runOwned = <A, E, R>(
        record: ResourcePreparedStack,
        operation: Effect.Effect<A, E, R>,
      ) =>
        runInApplication(
          record,
          ownedRecord(record).pipe(Effect.andThen(operation)),
        );

      const runPlan = <A, E, R>(
        plan: ResourceApplyPlan | ResourceDestroyPlan,
        operation: Effect.Effect<A, E, R>,
      ) =>
        runInApplication(plan, claimPlan(plan).pipe(Effect.andThen(operation)));

      /**
       * The Stack service method registers the application's resources and
       * returns a stack for planning and execution. The application returns a
       * callback that apply evaluates after it saves provider outputs.
       */
      const Stack = Effect.fn("ResourceStackOperations.Stack")(function* <
        Output,
        Error,
        Requirements,
      >(
        stackName: string,
        declaration: Effect.Effect<() => Output, Error, Requirements>,
      ) {
        yield* openRecords(stackName);

        yield* execution.takeScoped(1);
        yield* openRecords(stackName);

        // A failed declaration must clear partial registrations before another
        // command can acquire the graph. Effect runs scope finalizers in reverse
        // order; see resource-management/scope.mdx in the Effect v4 guide.
        yield* Effect.addFinalizer((exit) =>
          graph.reset.pipe(Effect.when(Effect.succeed(Exit.isFailure(exit)))),
        );

        yield* graph.reset;

        const output = yield* declaration;
        const stack = yield* lifecycle.prepare(stackName);

        const prepared: ResourceApplicationPreparation<Output> = {
          ...stack,
          output,
        };

        yield* retain(prepared);

        return prepared;
      }, Effect.scoped);

      /**
       * The planPrepared service method plans an owned preparation without
       * rerunning its declaration. Later declarations cannot change the
       * resources or callback captured in the returned plan.
       */
      const planPrepared = Effect.fn("ResourceStackOperations.planPrepared")(
        function* <Output>(prepared: ResourceApplicationPreparation<Output>) {
          const stack = yield* lifecycle.plan(prepared);

          const planned: ResourceApplicationPlan<Output> = {
            ...stack,
            output: prepared.output,
          };

          yield* retain(planned);

          return planned;
        },
        (operation, prepared) => runOwned(prepared, operation),
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
        (operation, planned) => runPlan(planned, operation),
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
          const planned: ResourceDestroyPlan =
            yield* lifecycle.planDestroy(prepared);

          yield* retain(planned);

          return planned;
        },
        (operation, prepared) => runOwned(prepared, operation),
      );

      /**
       * The destroyPrepared service method reserves reviewed removals for one
       * execution. Changed saved state invalidates the plan before removal.
       * Failure or interruption requires a fresh plan from saved progress.
       */
      const destroyPrepared = Effect.fn(
        "ResourceStackOperations.destroyPrepared",
      )((planned: ResourceDestroyPlan) =>
        runPlan(planned, lifecycle.destroyPlan(planned)),
      );

      /**
       * The apply service method plans a completed declaration against current
       * saved state and returns its evaluated outputs. Evaluate the application's
       * declaration Effect again when its desired configuration changes.
       */
      const apply = Effect.fn("ResourceStackOperations.apply")(
        <Output>(prepared: ResourceApplicationPreparation<Output>) =>
          planPrepared(prepared).pipe(Effect.flatMap(applyPrepared)),
      );

      /**
       * The reconcile service method refreshes the saved resources of an owned
       * preparation without evaluating application outputs. Its result identifies
       * resources observed at the provider and those confirmed missing.
       */
      const reconcile = Effect.fn("ResourceStackOperations.reconcile")(
        (prepared: ResourcePreparedStack) =>
          runOwned(prepared, lifecycle.reconcile(prepared)),
      );

      /**
       * The destroy service method plans and executes removals from a completed
       * declaration without evaluating its output callback.
       */
      const destroy = Effect.fn("ResourceStackOperations.destroy")(
        (prepared: ResourcePreparedStack) =>
          planDestroyPrepared(prepared).pipe(Effect.flatMap(destroyPrepared)),
      );

      /**
       * The renderPlan service method returns the plan it displays so its
       * caller can pass that reviewed plan to applyPrepared.
       */
      const renderPlan = Effect.fn("ResourceStackOperations.renderPlan")(
        function* <Output>(prepared: ResourceApplicationPreparation<Output>) {
          const planned: ResourceApplicationPlan<Output> =
            yield* planPrepared(prepared);

          yield* renderer.renderPlan(planned);

          return planned;
        },
      );

      /**
       * The renderDiff service method shows the resources compared by the
       * planner, including declarations that require no action.
       */
      const renderDiff = Effect.fn("ResourceStackOperations.renderDiff")(
        <Output>(
          prepared: ResourceApplicationPreparation<Output>,
          detailed = false,
        ) =>
          planPrepared(prepared).pipe(
            Effect.flatMap((plan) => renderer.renderDiff(plan, detailed)),
          ),
      );

      /**
       * The renderDependencies service method shows prerequisites from the
       * graph captured during declaration. It can run before the stack exists.
       */
      const renderDependencies = Effect.fn(
        "ResourceStackOperations.renderDependencies",
      )((prepared: ResourcePreparedStack) =>
        runOwned(
          prepared,
          Effect.forEach(Graph.topo(prepared.desired), ([, node]) =>
            graph.dependencyEdgesOf(prepared.desired, node.key).pipe(
              Effect.map((edges) => ({
                node,
                prerequisites: Arr.dedupe(
                  Arr.map(edges, (edge) => edge.source.logicalId),
                ),
              })),
            ),
          ).pipe(
            Effect.flatMap((resources) =>
              renderer.renderDependencies(prepared.stackName, resources),
            ),
          ),
        ),
      );

      /**
       * The renderSavedResources service method lists resources directly from
       * the configured state store. It can run when the application no longer
       * declares a saved resource.
       */
      const renderSavedResources = Effect.fn(
        "ResourceStackOperations.renderSavedResources",
      )((stackName: string) =>
        stateStore
          .readSavedStates(stackName)
          .pipe(
            Effect.flatMap((states) =>
              renderer.renderSavedResources(stackName, states),
            ),
          ),
      );

      /**
       * The renderSavedResource service method reads the selected resource
       * from the configured state store. Multiple saved generations can exist
       * while a replacement is in progress.
       */
      const renderSavedResource = Effect.fn(
        "ResourceStackOperations.renderSavedResource",
      )((stackName: string, logicalId: string) =>
        stateStore.readSavedStates(stackName).pipe(
          Effect.map(
            Arr.filter((state) => state.node.key.logicalId === logicalId),
          ),
          Effect.filterOrFail(
            Arr.isReadonlyArrayNonEmpty,
            () => new SavedResourceNotFound({ stackName, logicalId }),
          ),
          Effect.flatMap((states) =>
            renderer.renderSavedResource(stackName, logicalId, states),
          ),
        ),
      );

      /**
       * The renderApply service method returns evaluated application outputs
       * and displays deployment totals with the time spent applying the plan.
       *
       * The live renderer counts completed outcomes, so dependency checks whose
       * resolved inputs stayed equal appear as unchanged.
       */
      const renderApply = Effect.fn("ResourceStackOperations.renderApply")(
        function* <Output>(prepared: ResourceApplicationPreparation<Output>) {
          const planned = yield* planPrepared(prepared);

          const result: ResourceApplicationResult<Output> =
            yield* renderer.watchProgress(
              planned.stackName,
              applyPrepared(planned),
            );

          return result;
        },
      );

      /** The renderApplyPlan function displays the reviewed plan and runs it through the live handler before returning application outputs. */
      const renderApplyPlan = Effect.fn(
        "ResourceStackOperations.renderApplyPlan",
      )(function* <Output>(
        planned: ResourceApplicationPlan<Output>,
        detailed = false,
      ) {
        yield* Match.value(detailed).pipe(
          Match.when(true, () => renderer.renderDiff(planned, true)),
          Match.orElse(() => renderer.renderPlan(planned)),
        );

        const result: ResourceApplicationResult<Output> =
          yield* renderer.watchProgress(
            planned.stackName,
            applyPrepared(planned),
          );

        return result;
      });

      /**
       * The renderCreate service method applies a stack that has no applied
       * resources. The plan retains unfinished creation records so a retry can
       * resume them.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (Effect.filterOrFail)
       */
      const renderCreate = Effect.fn("ResourceStackOperations.renderCreate")(
        <Output>(prepared: ResourceApplicationPreparation<Output>) =>
          planPrepared(prepared).pipe(
            Effect.filterOrFail(
              ({ state }) => Arr.isReadonlyArrayEmpty(state.resources),
              ({ stackName }) =>
                new ResourceStackOperationRejected({
                  stackName,
                  operation: "create",
                  message: `Stack "${stackName}" already has applied resources. Run update to apply changes.`,
                }),
            ),
            Effect.flatMap(renderApplyPlan),
          ),
      );

      /**
       * The renderUpdate service method applies changes to a stack with
       * applied resources. Detailed output shows the saved and desired
       * properties from the same plan that execution validates and applies.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (Effect.filterOrFail)
       */
      const renderUpdate = Effect.fn("ResourceStackOperations.renderUpdate")(
        <Output>(
          prepared: ResourceApplicationPreparation<Output>,
          detailed = false,
        ) =>
          planPrepared(prepared).pipe(
            Effect.filterOrFail(
              ({ state }) => Arr.isReadonlyArrayNonEmpty(state.resources),
              ({ stackName }) =>
                new ResourceStackOperationRejected({
                  stackName,
                  operation: "update",
                  message: `Stack "${stackName}" has no applied resources. Run create to deploy it.`,
                }),
            ),
            Effect.flatMap((planned) => renderApplyPlan(planned, detailed)),
          ),
      );

      /**
       * The renderPlanThenApply service method executes exactly the plan it
       * displays. A saved-state change before execution invalidates the plan.
       */
      const renderPlanThenApply = Effect.fn(
        "ResourceStackOperations.renderPlanThenApply",
      )(<Output>(prepared: ResourceApplicationPreparation<Output>) =>
        planPrepared(prepared).pipe(Effect.flatMap(renderApplyPlan)),
      );

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
       * before provider mutation. Its final summary includes elapsed time and
       * the number of resources removed after progress output has finished.
       *
       * The live renderer accumulates completed removals for its summary.
       */
      const renderDestroy = Effect.fn("ResourceStackOperations.renderDestroy")(
        function* (prepared: ResourcePreparedStack) {
          const planned = yield* planDestroyPrepared(prepared);

          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });

          const result: ResourceDestroyResult = yield* renderer.watchProgress(
            planned.stackName,
            destroyPrepared(planned),
          );

          return result;
        },
      );

      return {
        Stack,
        planPrepared,
        applyPrepared,
        planDestroyPrepared,
        destroyPrepared,
        apply,
        reconcile,
        destroy,
        renderPlan,
        renderDiff,
        renderDependencies,
        renderSavedResources,
        renderSavedResource,
        renderApply,
        renderCreate,
        renderUpdate,
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
