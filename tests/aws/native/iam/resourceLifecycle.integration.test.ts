import { Array as Arr, Effect, Match, Option, Unify } from "effect";
import { SecureRandom } from "effect/crypto";
import { ResourceStackOperations } from "../../../../src/core/stack/resourceStackOperations.js";
import { awsNativeResourceSuite } from "../../../support/awsResourceIntegrationFixture.js";
import { ResourceLifecycleTest } from "../../../support/resourceLifecycleCase.js";
import { iamResourceLifecycleCases } from "./resourceLifecycleCases.js";

awsNativeResourceSuite("Native IAM lifecycle", (it) => {
  it.effect.each(iamResourceLifecycleCases)(
    "$resource: the stack $outcome",
    ({ configure, updates }) =>
      Effect.gen(function* () {
        const random = yield* SecureRandom.SecureRandom;
        const operations = yield* ResourceStackOperations;
        const lifecycle = yield* ResourceLifecycleTest;

        const name = `nomoss-iam-${yield* random.uuidV4()}`;

        const phases = Arr.prepend(
          Option.fromUndefinedOr(updates).pipe(
            Option.map((configure) => configure(name)),
            Option.toArray,
            Arr.flatten,
          ),
          configure(name),
        );

        const [initial, ...revisions] = yield* Effect.forEach(
          phases,
          Effect.fnUntraced(function* (phase) {
            const prepared = yield* operations.Stack(
              name,
              Unify.unify(phase.declaration).pipe(
                Effect.map(() => () => undefined),
              ),
            );

            return Match.value(phase).pipe(
              Match.when(
                { rejection: Match.string },
                ({ rejection, expected }) => ({
                  prepared,
                  expected,
                  rejection,
                }),
              ),
              Match.orElse(({ expected }) => ({ prepared, expected })),
            );
          }),
        );

        yield* lifecycle.verifyLifecycle(initial, revisions);
      }),
    180_000,
  );
});
