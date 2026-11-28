import { assert } from "@effect/vitest";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Exit,
  Layer,
  Match,
  Option,
  Schema,
} from "effect";
import { ResourceCommand } from "../../src/core/resource/lifecycle.js";
import { ResourceModel } from "../../src/core/resource/model.js";
import { ResourceCommandPolicy } from "../../src/core/resource/resourceCommandPolicy.js";
import {
  type ResourceApplicationPreparation,
  ResourceStackOperations,
} from "../../src/core/stack/resourceStackOperations.js";
import { ResourceStateStore } from "../../src/core/state/stateStore.js";

class ResourceLifecycleCheckFailed extends Data.TaggedError(
  "ResourceLifecycleCheckFailed",
)<{
  readonly stack: string;
  readonly message: string;
}> {}

/**
 * The ResourceLifecyclePhase interface pairs a stack declaration with the
 * properties a provider read must return after that apply.
 */
export interface ResourceLifecyclePhase {
  readonly prepared: ResourceApplicationPreparation<undefined>;
  readonly expected: Schema.JsonObject;
  readonly rejection?: string;
}

/**
 * The ResourceLifecycleTest service checks the provider after each apply and
 * after teardown. A case can add declarations for an update without a
 * separate stack runner or a new set of state checks.
 *
 * @see ../../node_modules/effect/src/Context.ts (Service)
 */
export class ResourceLifecycleTest extends Context.Service<ResourceLifecycleTest>()(
  "nomoss/tests/support/resourceLifecycleCase/ResourceLifecycleTest",
  {
    make: Effect.gen(function* () {
      const operations = yield* ResourceStackOperations;
      const state = yield* ResourceStateStore;
      const provider = yield* ResourceCommandPolicy;
      const model = yield* ResourceModel;

      /**
       * The readResource operation checks what AWS reports for the resource
       * the stack saved. Apply could otherwise succeed while AWS still shows
       * the previous values.
       */
      const readResource = Effect.fn("ResourceLifecycleTest.readResource")(
        function* (stackName: string, expected: Schema.JsonObject) {
          const records = yield* state.loadResourceStates(stackName);

          const saved = yield* Arr.findFirst(
            records,
            ({ node }) => node.key.logicalId === "Resource",
          ).pipe(
            Effect.fromOption(
              () =>
                new ResourceLifecycleCheckFailed({
                  stack: stackName,
                  message: "Apply did not save the resource under test",
                }),
            ),
          );

          assert.oneOf(
            saved._tag,
            ["Created", "Updated"],
            "The stack must retain a completed resource record",
          );

          const result = yield* provider.execute(
            ResourceCommand.Read({ node: saved.node }),
          );
          const observation = yield* Match.value(result).pipe(
            Match.when(
              { _tag: "Observed", observation: { _tag: "Present" } },
              ({ observation }) => Effect.succeed(observation),
            ),
            Match.orElse(() =>
              Effect.fail(
                new ResourceLifecycleCheckFailed({
                  stack: stackName,
                  message:
                    "The provider did not find the resource identified by saved state",
                }),
              ),
            ),
          );
          const observed = yield* Schema.decodeUnknownEffect(Schema.JsonObject)(
            observation.observed,
          );

          assert.deepInclude(
            observed,
            expected,
            "The provider must report the declared values",
          );

          return saved.node;
        },
      );

      /**
       * The verifyLifecycle service method accepts a fresh stack with a
       * resource named Resource. Each update must keep the original identity.
       * Teardown removes the resource and its prerequisites from that stack.
       *
       * @see ../../refs/effect/packages/effect/src/Effect.ts (onExitIf)
       */
      const verifyLifecycle = Effect.fn(
        "ResourceLifecycleTest.verifyLifecycle",
      )(function* (
        initial: ResourceLifecyclePhase,
        updates: ReadonlyArray<ResourceLifecyclePhase>,
      ) {
        const { stackName } = initial.prepared;

        const plan = yield* operations.planPrepared(initial.prepared);

        assert.isEmpty(
          plan.state.states,
          "Use a stack with no saved resources",
        );

        const empty = yield* operations.Stack(
          stackName,
          Effect.succeed(() => undefined),
        );

        const verify = Effect.fnUntraced(function* () {
          yield* operations.applyPrepared(plan);

          const created = yield* readResource(stackName, initial.expected);

          const saved = yield* Effect.reduce(
            updates,
            () => created,
            Effect.fnUntraced(function* (_, { prepared, expected, rejection }) {
              const planned = yield* operations.planPrepared(prepared);
              const apply = operations.applyPrepared(planned);

              yield* Option.match(Option.fromUndefinedOr(rejection), {
                onNone: () => Effect.asVoid(apply),
                onSome: (message) =>
                  Effect.flip(apply).pipe(
                    Effect.map((failure) =>
                      assert.include(failure.message, message),
                    ),
                  ),
              });

              const updated = yield* readResource(stackName, expected);

              yield* model.withObservedOutputs(created, updated.outputs);

              return updated;
            }),
          );

          yield* operations.destroy(empty);

          const remaining = yield* state.readSavedStates(stackName);
          const removed = yield* provider.execute(
            ResourceCommand.Read({ node: saved }),
          );

          const rejected = Arr.some(updates, ({ rejection }) =>
            Option.isSome(Option.fromUndefinedOr(rejection)),
          );
          const retained = Match.value(rejected).pipe(
            Match.when(true, () => state.ownedResources(remaining)),
            Match.orElse(() => remaining),
          );

          assert.isEmpty(retained, "Teardown must leave no managed resource");

          assert.isTrue(
            Match.value(removed).pipe(
              Match.when(
                { _tag: "Observed", observation: { _tag: "Missing" } },
                () => true,
              ),
              Match.orElse(() => false),
            ),
            "The provider must confirm the saved resource is gone",
          );
        });

        yield* verify().pipe(
          Effect.onExitIf(Exit.isFailure, () =>
            operations.destroy(empty).pipe(Effect.orDie),
          ),
        );
      });

      return { verifyLifecycle };
    }),
  },
) {}

export const resourceLifecycleTestLayer = Layer.effect(
  ResourceLifecycleTest,
  ResourceLifecycleTest.make,
);
