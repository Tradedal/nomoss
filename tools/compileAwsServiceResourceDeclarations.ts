import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer, Path, String as Str } from "effect";
import { AwsResourceTypeScript } from "./awsResources/awsResourceTypeScript.js";
import {
  AwsServiceResourceDeclarations,
  awsServiceResourceDeclarationsLayer,
} from "./awsServiceResources/resourceDeclarations.js";
import {
  AwsServiceResourceSources,
  awsServiceResourceSourcesLayer,
} from "./awsServiceResources/sourcePreparation.js";
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
  awsServiceResourceSourcesLayer,
  typeScriptModulePublisherLayer,
).pipe(
  Layer.provide(resourceCatalogServicesLayer),
  Layer.provideMerge(NodeServices.layer),
  Layer.provide(NodeCrypto.layerDigest),
);

Effect.gen(function* () {
  const sources = yield* AwsServiceResourceSources;
  const declarations = yield* AwsServiceResourceDeclarations;
  const publisher = yield* TypeScriptModulePublisher;
  const path = yield* Path.Path;
  // Source preparation verifies every selected document before any module is
  // rendered. A rejected source therefore leaves the published files unchanged.
  const prepared = yield* sources.prepareDeclarations(
    process.argv[2] ?? "tools/awsServiceResources/sources/resources.json",
  );
  const outputDirectory =
    process.argv[3] ?? "src/providers/aws/resources/generated/native";

  // Each declaration needs an import relative to its publication directory so
  // output getters reach the core's shared stack state after files are written.
  const modules = yield* Effect.forEach(prepared.resources, (resource) => {
    const [, service, name] = Str.split(resource.definition.typeName, "::");
    const outputPath = path.join(
      outputDirectory,
      Str.toLowerCase(service),
      Str.toLowerCase(name),
      "index.ts",
    );
    const bindingModule = path.relative(
      path.dirname(path.resolve(outputPath)),
      path.resolve("src/core/resource/resourceOutputBinding.js"),
    );
    return declarations
      .renderResource(resource, bindingModule)
      .pipe(Effect.map((source) => ({ outputPath, source })));
  });

  // Render every declaration before publication begins. Publication formats and
  // validates each module; a rendering failure cannot publish a partial selection.
  yield* Effect.forEach(modules, (module) =>
    publisher.publishModule(module.outputPath, module.source),
  );

  yield* Effect.logInfo("Generated native AWS resource declarations", {
    resources: prepared.resources.length,
    diagnostics: prepared.metadata.diagnostics,
    reportDirectory: prepared.metadata.reportDirectory,
  });
}).pipe(Effect.provide(generationLayer), NodeRuntime.runMain);
