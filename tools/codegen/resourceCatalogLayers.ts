import { Layer } from "effect";
import { openApiResourceBindingsLayer } from "./openApiResourceBindings.js";
import { openApiResourceSchemasLayer } from "./openApiResourceSchemas.js";
import { operationCatalogsLayer } from "./operationCatalogs.js";
import { resourceCatalogsLayer } from "./resourceCatalogs.js";
import { schemaCompilationLayer } from "./schemaCompilation.js";

/**
 * The resourceCatalogServicesLayer Layer gives generators access to discovery,
 * binding validation, and output selection through their owning services.
 * Each dependency is supplied once in this graph, and the same schema and
 * operation services remain available to callers that compose generation steps.
 */
export const resourceCatalogServicesLayer = resourceCatalogsLayer.pipe(
  Layer.provideMerge(schemaCompilationLayer),
  Layer.provideMerge(openApiResourceBindingsLayer),
  Layer.provideMerge(openApiResourceSchemasLayer),
  Layer.provideMerge(operationCatalogsLayer),
);
