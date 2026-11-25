import { Context, Effect, FileSystem, Layer, Option, Ref } from "effect";
import { SecureRandom } from "effect/crypto";
import {
  type ResourcePreparedStack,
  ResourceStackLifecycle,
} from "../../src/core/stack/resourceStackLifecycle.js";
import { stripeIntegrationLayer } from "./stripeIntegrationFixture.js";

/**
 * The StripeApplicationIntegrationFixture service reserves unique names and
 * file paths for one live application workflow. Its scope destroys the latest
 * tracked stack if a test stops before teardown. Local state remains available
 * for recovery if destruction fails.
 */
export class StripeApplicationIntegrationFixture extends Context.Service<StripeApplicationIntegrationFixture>()(
  "nomoss/tests/support/stripeApplicationIntegrationFixture",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* ResourceStackLifecycle;
      const fs = yield* FileSystem.FileSystem;
      const random = yield* SecureRandom.SecureRandom;

      const id = yield* random.uuidV4();
      const stackName = `stripe-app-${id}`;
      const directory = `.nomoss/integration/${id}`;
      const outputPath = `${directory}/billing.json`;

      const cleanupStack = yield* Ref.make(
        Option.none<ResourcePreparedStack>(),
      );

      /**
       * The ResourceStackLifecycle.destroy service method must finish before
       * the fixture removes local state. A failed provider teardown needs that
       * state so the remaining resources can be identified and removed later.
       */
      yield* Effect.addFinalizer(() =>
        Ref.get(cleanupStack).pipe(
          Effect.flatMap(
            Option.match({
              onNone: () => Effect.void,
              onSome: (prepared) => lifecycle.destroy(prepared),
            }),
          ),
          Effect.andThen(
            fs.remove(`.nomoss/state/${stackName}.json`, { force: true }),
          ),
          Effect.andThen(
            fs.remove(directory, { recursive: true, force: true }),
          ),
          Effect.orDie,
        ),
      );

      /**
       * The trackStack service method replaces the stack reserved for failure
       * cleanup. Call it after preparation and before apply so cleanup uses the
       * current declarations even if provider execution fails partway through.
       * The result is the stack now owned by this fixture's scope.
       */
      const trackStack = Effect.fn(
        "StripeApplicationIntegrationFixture.trackStack",
      )(function* (prepared: ResourcePreparedStack) {
        yield* Ref.set(cleanupStack, Option.some(prepared));

        const tracked: ResourcePreparedStack = prepared;

        return tracked;
      });

      /**
       * The releaseCleanup Effect acknowledges a successful explicit teardown.
       * Call it after ResourceStackLifecycle.destroy returns so scope cleanup
       * removes local files and does not repeat provider destruction.
       */
      const releaseCleanup = Ref.set(cleanupStack, Option.none());

      return { stackName, outputPath, trackStack, releaseCleanup };
    }),
  },
) {}

/**
 * The stripeApplicationIntegrationTestLayer Layer shares the live Stripe graph
 * with the fixture and its test. Each provision owns its cleanup scope and
 * application identity, so one workflow cannot destroy another's resources.
 */
export const stripeApplicationIntegrationTestLayer = Layer.effect(
  StripeApplicationIntegrationFixture,
  StripeApplicationIntegrationFixture.make,
).pipe(Layer.provideMerge(stripeIntegrationLayer));
