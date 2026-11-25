import { expect, layer } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceModel,
  ResourceTypeSchema,
} from "../../src/core/resource/model.js";
import { ResourceGraphBuilder } from "../../src/core/resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../../src/core/resource/resourceGraphStore.js";
import { ResourceOutputResolver } from "../../src/core/resource/resourceOutputResolver.js";
import {
  StripePriceOutputsSchema,
  StripeProductOutputsSchema,
} from "../../src/providers/stripe/client/generated/resourceOutputs.js";
import { OperationCatalogs } from "../../tools/codegen/operationCatalogs.js";
import { ResourceCatalogs } from "../../tools/codegen/resourceCatalogs.js";
import { StripeAnnotations } from "../../tools/stripe/generator/stripeAnnotations.js";
import { StripeResourceInputs } from "../../tools/stripe/generator/stripeResourceInputs.js";
import {
  resourceCatalogSource,
  resourceInputResolutionTestLayer,
  resourceRelationshipGeneratorDocument,
} from "../support/resourceCatalogFixture.js";

layer(resourceInputResolutionTestLayer, { buildPerTest: true })(
  "Generated resource entity declarations",
  (it) => {
    it.effect(
      "Related declarations receive the source identity while incompatible entities leave no declaration",
      () =>
        Effect.gen(function* () {
          const catalogs = yield* OperationCatalogs;
          const resourceCatalogs = yield* ResourceCatalogs;
          const inputs = yield* StripeResourceInputs;
          const annotations = yield* StripeAnnotations;
          const graph = yield* ResourceGraphBuilder;
          const store = yield* ResourceGraphStore;
          const model = yield* ResourceModel;
          const resolver = yield* ResourceOutputResolver;
          const catalog = yield* catalogs.buildOperationCatalog(
            resourceCatalogSource,
            resourceRelationshipGeneratorDocument,
          );
          const discovered = yield* resourceCatalogs.buildDiscoveredCatalog(
            catalog,
            {
              owner: { name: "Product", outputAliases: { id: "ProductId" } },
              thing: { name: "Price", outputAliases: { id: "PriceId" } },
            },
            "Billing",
          );
          const sourceType = "Example::Billing::Product";
          const dependentType = "Example::Billing::Price";
          const [sourceProps] = yield* inputs.prepareResourceInputSchemas(
            catalog,
            discovered.resources,
            "entities",
            [sourceType],
          );
          const [dependentProps] = yield* inputs.prepareResourceInputSchemas(
            catalog,
            discovered.resources,
            "entities",
            [dependentType],
          );
          const [requestProps] = yield* inputs.prepareResourceInputSchemas(
            catalog,
            discovered.resources,
            "values",
            [dependentType],
          );
          const sourceAnnotation = yield* annotations.prepareResourceAnnotation(
            discovered.resources[sourceType],
          );
          const dependentAnnotation =
            yield* annotations.prepareResourceAnnotation(
              discovered.resources[dependentType],
            );
          const declarationProps = annotateResourceSchema(
            dependentProps,
            dependentAnnotation,
          );
          const requestSchema = requestProps.pipe(Schema.decodeTo(Schema.Json));

          const sourceDeclaration = yield* graph.resource({
            logicalId: "Source",
          });
          const source = yield* sourceDeclaration.register({
            propsSchema: annotateResourceSchema(sourceProps, sourceAnnotation),
            outputsSchema: StripeProductOutputsSchema,
            props: { name: "Source" },
            outputs: { ProductId: "prod_source" },
          });
          const entity = yield* model.entityFromNode(
            source,
            ResourceTypeSchema,
          );
          const dependentDeclaration = yield* graph.resource({
            logicalId: "Dependent",
          });
          const dependent = yield* dependentDeclaration.register({
            propsSchema: declarationProps,
            requestSchema,
            outputsSchema: StripePriceOutputsSchema,
            props: {
              name: "Dependent",
              owner: entity,
              settings: { owner: entity },
              members: [{ owner: entity }],
            },
          });

          const incompatible = yield* model.entityFromNode(
            dependent,
            ResourceTypeSchema,
          );
          const rejectedDeclaration = yield* graph.resource({
            logicalId: "Rejected",
          });
          const rejected = yield* rejectedDeclaration
            .register({
              propsSchema: declarationProps,
              requestSchema,
              outputsSchema: StripePriceOutputsSchema,
              props: { name: "Rejected", owner: incompatible },
            })
            .pipe(Effect.flip);

          expect(rejected._tag).toBe("SchemaError");
          expect(yield* store.topologicalLogicalIds).not.toContain("Rejected");

          const request = yield* resolver.resolveNode(dependent, [source], []);
          expect(request.props).toEqual({
            name: "Dependent",
            owner: "prod_source",
            settings: { owner: "prod_source" },
            members: [{ owner: "prod_source" }],
          });
        }),
    );
  },
);
