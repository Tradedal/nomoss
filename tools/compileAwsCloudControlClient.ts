import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, FileSystem, Layer, Path } from "effect";
import { FetchHttpClient } from "effect/http";
import { AwsCloudControlClientGenerator } from "./awsCloudControl/AwsCloudControlClientGenerator.js";
import { AwsOpenApi } from "./awsCloudControl/openApi.js";
import { AwsOpenApiTypeScript } from "./awsCloudControl/typeScript.js";
import { operationCatalogsLayer } from "./codegen/operationCatalogs.js";
import { schemaCompilationLayer } from "./codegen/schemaCompilation.js";
import { TypeScriptModulePublisher } from "./typeScriptModulePublisher.js";

Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const generator = yield* AwsCloudControlClientGenerator;
  const directory = yield* fs.makeTempDirectoryScoped({
    prefix: "nomoss-cloudcontrol-",
  });
  const classpath = yield* generator.prepareSmithyConverter(
    "tools/awsCloudControl",
  );
  const documents = yield* generator.convertSmithyModel({
    modelPath:
      process.argv[2] ??
      "refs/aws-api-models/models/cloudcontrol/service/2021-09-30/cloudcontrol-2021-09-30.json",
    serviceId: "com.amazonaws.cloudcontrol#CloudApiService",
    documentsDirectory: path.join(directory, "openapi"),
    classpath,
  });

  const source = yield* generator.emitClientModule(documents, "CloudControl");

  yield* generator.publishClientModule({
    outputPath:
      process.argv[3] ??
      "providers/aws/generated/clients/cloudcontrol/index.ts",
    source,
  });
}).pipe(
  Effect.scoped,
  Effect.provide(
    Layer.effect(
      AwsCloudControlClientGenerator,
      AwsCloudControlClientGenerator.make,
    ).pipe(
      Layer.provide(
        Layer.mergeAll(
          Layer.effect(AwsOpenApi, AwsOpenApi.make),
          Layer.effect(AwsOpenApiTypeScript, AwsOpenApiTypeScript.make).pipe(
            Layer.provide(schemaCompilationLayer),
          ),
          Layer.effect(
            TypeScriptModulePublisher,
            TypeScriptModulePublisher.make,
          ),
          operationCatalogsLayer,
        ),
      ),
      Layer.provide(Layer.merge(FetchHttpClient.layer, NodeCrypto.layerDigest)),
      Layer.provideMerge(NodeServices.layer),
    ),
  ),
  NodeRuntime.runMain,
);
