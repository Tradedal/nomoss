import { Layer } from "effect";
import { AwsCloudControlClientGenerator } from "../awsCloudControl/AwsCloudControlClientGenerator.js";
import { AwsOpenApi } from "../awsCloudControl/openApi.js";
import { AwsOpenApiTypeScript } from "../awsCloudControl/typeScript.js";
import { resourceCatalogServicesLayer } from "../codegen/resourceCatalogLayers.js";
import { schemaCompilationLayer } from "../codegen/schemaCompilation.js";
import { typeScriptModulePublisherLayer } from "../typeScriptModulePublisher.js";
import { AwsServiceOperationGeneration } from "./operationGeneration.js";
import { awsServiceResourceSourcesLayer } from "./sourcePreparation.js";

const operationConversionLayer = Layer.effect(
  AwsCloudControlClientGenerator,
  AwsCloudControlClientGenerator.make,
).pipe(
  Layer.provide([
    Layer.effect(AwsOpenApi, AwsOpenApi.make),
    Layer.effect(AwsOpenApiTypeScript, AwsOpenApiTypeScript.make).pipe(
      Layer.provide(schemaCompilationLayer),
    ),
    typeScriptModulePublisherLayer,
    resourceCatalogServicesLayer,
  ]),
);

/**
 * Native generation shares source verification, catalogs, schema compilation,
 * and AWS conversion in one graph. The command supplies filesystem, digest,
 * HTTP, and process services so the same operations can run during integration.
 */
export const awsServiceResourceGenerationLayer = Layer.merge(
  awsServiceResourceSourcesLayer.pipe(
    Layer.provide(resourceCatalogServicesLayer),
  ),
  Layer.effect(
    AwsServiceOperationGeneration,
    AwsServiceOperationGeneration.make,
  ).pipe(Layer.provide(operationConversionLayer)),
);
