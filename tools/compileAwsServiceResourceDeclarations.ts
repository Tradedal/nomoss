import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer, Path, String as Str } from "effect";
import { FetchHttpClient } from "effect/http";
import { NomossTracingLive } from "../src/core/runtime/tracing.js";
import { AwsResourceTypeScript } from "./awsResources/awsResourceTypeScript.js";
import { awsServiceResourceGenerationLayer } from "./awsServiceResources/generationLayer.js";
import {
  AwsServiceResourceDeclarations,
  awsServiceResourceDeclarationsLayer,
} from "./awsServiceResources/resourceDeclarations.js";
import { AwsServiceResourceSources } from "./awsServiceResources/sourcePreparation.js";
import { resourceCatalogServicesLayer } from "./codegen/resourceCatalogLayers.js";
import { resourceDeclarationsLayer } from "./codegen/resourceDeclarations.js";
import {
  TypeScriptModulePublisher,
  typeScriptModulePublisherLayer,
} from "./typeScriptModulePublisher.js";

// Declaration generation and source preparation share the catalog services so
// emitted entities use the same resource identities as the verified definitions.
const declarationsLayer = awsServiceResourceDeclarationsLayer.pipe(
  Layer.provide([
    Layer.effect(AwsResourceTypeScript, AwsResourceTypeScript.make),
    resourceDeclarationsLayer,
  ]),
);
const generationLayer = Layer.mergeAll(
  declarationsLayer,
  awsServiceResourceGenerationLayer,
  typeScriptModulePublisherLayer,
).pipe(
  Layer.provide(resourceCatalogServicesLayer),
  Layer.provideMerge(NodeServices.layer),
  Layer.provide([NodeCrypto.layerDigest, FetchHttpClient.layer]),
);

Effect.gen(function* () {
  const sources = yield* AwsServiceResourceSources;
  const declarations = yield* AwsServiceResourceDeclarations;
  const publisher = yield* TypeScriptModulePublisher;
  const path = yield* Path.Path;

  // Source preparation verifies every selected document before any module is
  // rendered. A rejected source therefore leaves the published files unchanged.
  const prepared = yield* sources
    .prepareDeclarations(
      process.argv[2] ?? "tools/awsServiceResources/sources/resources.json",
    )
    .pipe(Effect.withSpan("codegen.sources.prepareDeclarations"));
  yield* Effect.annotateCurrentSpan({
    "codegen.resource_count": prepared.resources.length,
  });

  const outputDirectory =
    process.argv[3] ?? "providers/aws/generated/resources";

  // The Registry type determines the public module name within its AWS service.
  const resourceModule = (typeName: string) => {
    const [, service, resource] = Str.split(typeName, "::");
    return path.join(Str.toLowerCase(service), Str.toLowerCase(resource));
  };

  // Each declaration needs an import relative to its publication directory so
  // output getters reach the core's shared stack state after files are written.
  const modules = yield* Effect.forEach(prepared.resources, (resource) => {
    const outputPath = path.join(
      outputDirectory,
      `${resourceModule(resource.definition.typeName)}.ts`,
    );
    const moduleDirectory = path.dirname(path.resolve(outputPath));
    const bindingModule = path.relative(
      moduleDirectory,
      path.resolve("src/core/resource/resourceOutputBinding.js"),
    );
    const resourceOperationModule = path.relative(
      moduleDirectory,
      path.resolve("providers/aws/management/resourceOperation.js"),
    );

    return declarations
      .renderResource(resource, bindingModule, resourceOperationModule)
      .pipe(Effect.map((source) => ({ outputPath, source })));
  }).pipe(Effect.withSpan("codegen.typescript.emitDeclarations"));

  yield* publisher.checkModuleTypes(modules);
  yield* publisher.publishModules(outputDirectory, modules);

  yield* Effect.logInfo("Generated native AWS resource declarations", {
    resources: prepared.resources.length,
    diagnostics: prepared.metadata.diagnostics,
    reportDirectory: prepared.metadata.reportDirectory,
  });
}).pipe(
  Effect.withSpan("codegen.aws.declarations"),
  Effect.provide([generationLayer, NomossTracingLive]),
  NodeRuntime.runMain,
);
