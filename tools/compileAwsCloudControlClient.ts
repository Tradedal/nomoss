import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { AwsCloudControlClientGenerator } from "./awsCloudControl/AwsCloudControlClientGenerator.js";
import { AwsOpenApi } from "./awsCloudControl/openApi.js";
import { AwsOpenApiTypeScript } from "./awsCloudControl/typeScript.js";
import { operationCatalogsLayer } from "./codegen/operationCatalogs.js";
import { schemaCompilationLayer } from "./codegen/schemaCompilation.js";
import { TypeScriptModulePublisher } from "./typeScriptModulePublisher.js";

Effect.gen(function* () {
  const generator = yield* AwsCloudControlClientGenerator;
  const classpath = yield* generator.prepareSmithyConverter(
    "tools/awsCloudControl",
  );
  const documents = yield* generator.convertSmithyModel({
    modelPath:
      process.argv[2] ??
      "refs/aws-api-models/models/cloudcontrol/service/2021-09-30/cloudcontrol-2021-09-30.json",
    serviceId: "com.amazonaws.cloudcontrol#CloudApiService",
    documentsDirectory: "src/providers/aws/client/openapi/cloudControl",
    classpath,
  });

  const source = yield* generator.emitClientModule(documents, "CloudControl");

  yield* generator.publishClientModule({
    outputPath:
      process.argv[3] ?? "src/providers/aws/client/generated/cloudControl.ts",
    source,
  });
}).pipe(
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
      Layer.provide(
        Layer.mergeAll(
          NodeServices.layer,
          FetchHttpClient.layer,
          NodeCrypto.layerDigest,
        ),
      ),
    ),
  ),
  NodeRuntime.runMain,
);
