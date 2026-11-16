import { Layer } from "effect";
import { operationCatalogsLayer } from "../../codegen/operationCatalogs.js";
import { resourceCatalogServicesLayer } from "../../codegen/resourceCatalogLayers.js";
import { schemaCompilationLayer } from "../../codegen/schemaCompilation.js";
import { stripeAnnotationsLayer } from "./stripeAnnotations.js";
import { stripeCatalogEmitterLayer } from "./stripeCatalogEmitter.js";
import { stripeClientEmitterLayer } from "./stripeClientEmitter.js";
import { StripeClientGenerator } from "./stripeClientGenerator.js";
import { stripeModuleEmitterLayer } from "./stripeModuleEmitter.js";
import { stripeModulePublisherLayer } from "./stripeModulePublisher.js";
import { stripeOperationBindingsLayer } from "./stripeOperationBindings.js";
import { stripeResourceBindingsEmitterLayer } from "./stripeResourceBindingsEmitter.js";
import { stripeResourceClientEmitterLayer } from "./stripeResourceClientEmitter.js";
import { StripeResourceDeclarationCompiler } from "./stripeResourceDeclarationCompiler.js";
import { stripeResourceDeclarationsLayer } from "./stripeResourceDeclarations.js";
import { stripeResourceInputsLayer } from "./stripeResourceInputs.js";
import { stripeSchemaCompilerLayer } from "./stripeSchemaCompiler.js";
import { stripeSchemaEmitterLayer } from "./stripeSchemaEmitter.js";
import { stripeSourceLoaderLayer } from "./stripeSourceLoader.js";

const resourceEmissionLayer = stripeResourceBindingsEmitterLayer.pipe(
  Layer.provideMerge(
    Layer.mergeAll(
      stripeResourceDeclarationsLayer,
      stripeResourceClientEmitterLayer,
      stripeAnnotationsLayer,
    ),
  ),
);

/**
 * The stripeModuleEmissionLayer Layer lets callers render modules and leaves
 * files unpublished. The schemas and resource clients share their emitter
 * services. The caller must supply Path, the catalog services, and schema
 * compilation in the same graph.
 */
export const stripeModuleEmissionLayer = stripeModuleEmitterLayer.pipe(
  Layer.provideMerge(
    Layer.mergeAll(
      resourceEmissionLayer,
      stripeResourceInputsLayer.pipe(
        Layer.provideMerge(
          Layer.mergeAll(stripeSchemaEmitterLayer, stripeAnnotationsLayer),
        ),
      ),
      stripeSchemaEmitterLayer,
      stripeClientEmitterLayer,
      stripeCatalogEmitterLayer,
    ),
  ),
);

/**
 * Generator executables share source loading, schema compilation, and emission
 * services. The input-only executable can compile declarations without invoking
 * operation-client generation. Executables supply filesystem and digest services.
 */
export const stripeGenerationServicesLayer = Layer.mergeAll(
  stripeModuleEmissionLayer,
  stripeSourceLoaderLayer,
  stripeOperationBindingsLayer,
  stripeSchemaCompilerLayer,
  stripeModulePublisherLayer,
).pipe(
  Layer.provideMerge(
    Layer.mergeAll(
      operationCatalogsLayer,
      resourceCatalogServicesLayer,
      schemaCompilationLayer,
    ),
  ),
);

/**
 * The stripeClientGeneratorLayer Layer gives source preparation and emission
 * the same catalog and schema compilation services. The executable must
 * provide the filesystem, path, digest, and TypeScriptModulePublisher services
 * in that graph so publication uses the processes and filesystem it configured.
 */
export const stripeClientGeneratorLayer = Layer.effect(
  StripeClientGenerator,
  StripeClientGenerator.make,
).pipe(Layer.provide(stripeGenerationServicesLayer));

/**
 * The stripeResourceDeclarationCompilationLayer Layer gives the declaration
 * compiler the same emitters used by full client generation. The executable
 * supplies filesystem and path services to read published bindings, and a
 * digest service required by the shared generation services.
 */
export const stripeResourceDeclarationCompilationLayer = Layer.effect(
  StripeResourceDeclarationCompiler,
  StripeResourceDeclarationCompiler.make,
).pipe(Layer.provide(stripeGenerationServicesLayer));
