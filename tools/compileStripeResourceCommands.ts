import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Layer,
  Record,
  Schema,
} from "effect";
import { Project } from "ts-morph";
import { stripeResourceCatalog } from "../src/providers/stripe/client/generated/resourceCatalog.js";
import { OperationCatalogs } from "./codegen/operationCatalogs.js";
import { OpenApiResourceCatalog } from "./codegen/resourceSchemas.js";
import { stripeGenerationServicesLayer } from "./stripe/generator/generatorLayer.js";
import { StripeModuleEmitter } from "./stripe/generator/stripeModuleEmitter.js";
import { StripeOperationBindings } from "./stripe/generator/stripeOperationBindings.js";
import { StripeResourceBindingsEmitter } from "./stripe/generator/stripeResourceBindingsEmitter.js";
import { StripeSourceLoader } from "./stripe/generator/stripeSourceLoader.js";
import { StripeOpenApiSource } from "./stripe/model.js";
import { typeScriptModulePublisherLayer } from "./typeScriptModulePublisher.js";

Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const loader = yield* StripeSourceLoader;
  const catalogs = yield* OperationCatalogs;
  const bindings = yield* StripeOperationBindings;
  const emitter = yield* StripeResourceBindingsEmitter;
  const modules = yield* StripeModuleEmitter;
  const source = yield* fs
    .readFileString("tools/stripe/openapi-source.json")
    .pipe(
      Effect.flatMap(
        Schema.decodeEffect(Schema.fromJsonString(StripeOpenApiSource)),
      ),
    );
  const document = yield* loader.loadOpenApiDocument(
    "refs/stripe-openapi",
    source,
  );
  const resources = yield* Schema.decodeUnknownEffect(OpenApiResourceCatalog)(
    Record.filter(
      stripeResourceCatalog,
      (resource) => resource.source.format === "OpenApi",
    ),
  );
  const catalog = yield* catalogs.buildOperationCatalog(
    {
      provider: "Stripe",
      service: "Stripe",
      name: source.specification,
      format: "OpenApi",
    },
    document,
  );
  const operations = yield* bindings.bindClientOperations(
    catalog,
    source,
    resources,
  );
  const project = new Project({ useInMemoryFileSystem: true });
  const module = yield* emitter.emitResourceCommandLayer(
    project,
    Arr.filter(
      Record.values(resources),
      (resource) => resource.operations !== undefined,
    ),
    operations,
  );
  yield* modules.resolveImports([module], {});
  const outputPath = ".nomoss/stripe-command-feedback/resourceCommands.ts";
  yield* fs.makeDirectory(".nomoss/stripe-command-feedback", {
    recursive: true,
  });
  yield* fs.writeFileString(outputPath, module.getFullText());

  return outputPath;
}).pipe(
  Effect.tap((outputPath) =>
    Effect.logInfo("Stripe resource commands ready", { outputPath }),
  ),
  Effect.provide(
    stripeGenerationServicesLayer.pipe(
      Layer.provideMerge(typeScriptModulePublisherLayer),
      Layer.provideMerge([NodeServices.layer, NodeCrypto.layerDigest]),
    ),
  ),
  NodeRuntime.runMain,
);
