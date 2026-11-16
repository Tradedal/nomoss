import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { stripeResourceCatalog } from "../src/providers/stripe/client/generated/resourceCatalog.js";
import { stripeResourceDeclarationCompilationLayer } from "./stripe/generator/generatorLayer.js";
import { StripeResourceDeclarationCompiler } from "./stripe/generator/stripeResourceDeclarationCompiler.js";
import {
  TypeScriptModulePublisher,
  typeScriptModulePublisherLayer,
} from "./typeScriptModulePublisher.js";

Effect.gen(function* () {
  const compiler = yield* StripeResourceDeclarationCompiler;
  const publisher = yield* TypeScriptModulePublisher;
  const outputDirectory = "src/providers/stripe/client/generated";

  const modules = yield* compiler.prepareModules(
    outputDirectory,
    stripeResourceCatalog,
  );
  const published: ReadonlyArray<string> = yield* publisher.publishModules(
    outputDirectory,
    modules,
  );

  return published;
}).pipe(
  Effect.provide(
    stripeResourceDeclarationCompilationLayer.pipe(
      Layer.provideMerge(typeScriptModulePublisherLayer),
      Layer.provideMerge([NodeServices.layer, NodeCrypto.layerDigest]),
    ),
  ),
  Effect.scoped,
  NodeRuntime.runMain,
);
