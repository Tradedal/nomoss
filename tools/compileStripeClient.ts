import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { NomossTracingLive } from "../src/core/runtime/tracing.js";
import { stripeClientGeneratorLayer } from "./stripe/generator/generatorLayer.js";
import { StripeClientGenerator } from "./stripe/generator/stripeClientGenerator.js";
import { typeScriptModulePublisherLayer } from "./typeScriptModulePublisher.js";

Effect.gen(function* () {
  const generator = yield* StripeClientGenerator;

  yield* generator.generate(
    "refs/stripe-openapi",
    "src/providers/stripe/client/generated",
  );
}).pipe(
  Effect.withSpan("StripeClientGeneration.run"),
  Effect.tapCause(Effect.logError),
  Effect.provide(
    Layer.merge(
      NomossTracingLive,
      stripeClientGeneratorLayer.pipe(
        Layer.provide(typeScriptModulePublisherLayer),
        Layer.provide([NodeServices.layer, NodeCrypto.layerDigest]),
      ),
    ),
  ),
  NodeRuntime.runMain,
);
