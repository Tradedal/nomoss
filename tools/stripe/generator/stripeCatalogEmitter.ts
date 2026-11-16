import { Array as Arr, Context, Effect, Layer, Record, Tuple } from "effect";
import {
  type Project,
  type SourceFile,
  VariableDeclarationKind,
} from "ts-morph";
import type { OperationMetadata } from "../../codegen/catalogSchemas.js";
import { OperationCatalogs } from "../../codegen/operationCatalogs.js";
import { ResourceCatalogs } from "../../codegen/resourceCatalogs.js";
import type {
  OpenApiResourceCatalog,
  OpenApiResourcePreparation,
  ResourceCatalog,
  ResourceOutputCatalog,
} from "../../codegen/resourceSchemas.js";
import { jsonExpression } from "../../codegen/typeScriptJson.js";
import { print } from "../../codegen/typeScriptNodes.js";
import type { StripeOpenApiInvocation } from "../model.js";

/**
 * The StripeCatalogEmitter service preserves discovered metadata independently
 * of executable resource bindings. Applications can inspect unresolved resources
 * through the resource catalog and locate selected invocations through the
 * operation catalog. Each catalog has one module and retains its source order.
 */
export class StripeCatalogEmitter extends Context.Service<StripeCatalogEmitter>()(
  "nomoss/tools/stripe/generator/stripeCatalogEmitter",
  {
    make: Effect.gen(function* () {
      const catalogs = yield* OperationCatalogs;
      const resourceCatalogs = yield* ResourceCatalogs;

      /**
       * The emitOperationCatalogModule service method publishes metadata for the
       * selected invocations in the supplied order. Every entry must identify
       * a selected invocation or the method fails with NoSuchElementError.
       * The returned catalog.ts module belongs to the supplied project.
       */
      const emitOperationCatalogModule = Effect.fn(
        "StripeCatalogEmitter.emitOperationCatalogModule",
      )(function* (
        project: Project,
        metadata: ReadonlyArray<OperationMetadata>,
        operations: ReadonlyArray<StripeOpenApiInvocation>,
      ) {
        const module = project.createSourceFile("catalog.ts");

        /**
         * The stripeOperationCatalog export must refer to operations available
         * in the generated clients. An unmatched entry would advertise an API
         * that the application cannot invoke through those clients.
         */
        const invocations = Record.fromEntries(
          Arr.map(operations, (operation) =>
            Tuple.make(operation.name, operation),
          ),
        );

        const metadataEntries = yield* Effect.forEach(metadata, (entry) =>
          Record.get(invocations, entry.operationId).pipe(
            Effect.fromOption,
            Effect.map(() => {
              const selected: OperationMetadata = entry;
              return selected;
            }),
          ),
        );

        yield* catalogs.emitOperationCatalog(
          module,
          "stripeOperationCatalog",
          metadataEntries,
        );

        const generated: SourceFile = module;
        return generated;
      });

      /**
       * The emitResourceCatalogModule service method publishes every discovered
       * OpenAPI resource followed by local resources, including resources with
       * no executable bindings. Full resource type names distinguish services
       * that share a short name. The returned resourceCatalog.ts module also
       * exposes the supplied issues that prevent resource execution.
       */
      const emitResourceCatalogModule = Effect.fn(
        "StripeCatalogEmitter.emitResourceCatalogModule",
      )(function* (
        project: Project,
        resourceCatalog: OpenApiResourceCatalog,
        resources: ReadonlyArray<ResourceOutputCatalog>,
        unresolved: OpenApiResourcePreparation["unresolved"],
      ) {
        const module = project.createSourceFile("resourceCatalog.ts");

        /**
         * The stripeResourceCatalog export uses full resource type names as
         * keys. Discovery issues do not remove these entries because callers
         * need their metadata to explain why a resource cannot execute.
         */
        const catalogResources: ReadonlyArray<ResourceCatalog[string]> = [
          ...Record.values(resourceCatalog),
          ...Arr.filter(
            resources,
            (resource) => resource.source.format !== "OpenApi",
          ),
        ];
        const metadata: ResourceCatalog = Record.fromEntries(
          Arr.map(catalogResources, (resource) =>
            Tuple.make(resource.typeName, resource),
          ),
        );

        yield* resourceCatalogs.emitCatalog(
          module,
          "stripeResourceCatalog",
          metadata,
        );

        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: "stripeUnresolvedResources",
              initializer: print(jsonExpression(unresolved)),
            },
          ],
        });

        const generated: SourceFile = module;
        return generated;
      });

      return { emitOperationCatalogModule, emitResourceCatalogModule };
    }),
  },
) {}

export const stripeCatalogEmitterLayer = Layer.effect(
  StripeCatalogEmitter,
  StripeCatalogEmitter.make,
);
