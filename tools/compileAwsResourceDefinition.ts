import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { AwsResourceDefinitionCompiler } from "./awsResources/awsResourceDefinitionCompiler.js";
import { AwsResourceTypeScript } from "./awsResources/awsResourceTypeScript.js";
import { resourceCatalogServicesLayer } from "./codegen/resourceCatalogLayers.js";
import { TypeScriptModulePublisher } from "./typeScriptModulePublisher.js";

Effect.gen(function* () {
  const compiler = yield* AwsResourceDefinitionCompiler;
  const [, , registrySchemaPath, relationshipsPath, outputPath] = process.argv;
  const definition = yield* compiler.loadResourceDefinition({
    registrySchemaPath,
    relationshipsPath,
  });

  const source = yield* compiler.emitResourceModule(definition);

  yield* compiler.publishResourceModule({ outputPath, source });
}).pipe(
  Effect.provide(
    Layer.effect(
      AwsResourceDefinitionCompiler,
      AwsResourceDefinitionCompiler.make,
    ).pipe(
      Layer.provide(
        Layer.merge(
          Layer.effect(AwsResourceTypeScript, AwsResourceTypeScript.make),
          Layer.effect(
            TypeScriptModulePublisher,
            TypeScriptModulePublisher.make,
          ),
        ),
      ),
      Layer.provide(resourceCatalogServicesLayer),
      Layer.provide(NodeServices.layer),
    ),
  ),
  NodeRuntime.runMain,
);
