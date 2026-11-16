import { Context, Effect, FileSystem, Layer, Option, Schema } from "effect";
import {
  CloudFormationRelationshipsSchema,
  RegistryResourceSchema,
} from "../awsResources/awsResourceDefinition.js";
import {
  AwsResourceMetadataImporter,
  awsResourceMetadataImporterLayer,
} from "../awsResources/awsResourceMetadata.js";
import { ResourceCatalogs } from "../codegen/resourceCatalogs.js";
import type { ResourceSource } from "../codegen/resourceSchemas.js";
import {
  SpecificationSources,
  specificationSourcesLayer,
} from "../codegen/specificationSources.js";
import {
  AwsResourceDeclarationsManifest,
  AwsServiceResourceManifest,
  type AwsServiceResourcePreparation,
} from "./model.js";

/**
 * Callers of the AwsServiceResourceSources service receive verified documents
 * together with resource classifications and imported relationships. A checksum
 * or schema failure prevents generation from proceeding with those inputs.
 */
export class AwsServiceResourceSources extends Context.Service<AwsServiceResourceSources>()(
  "nomoss/tools/awsServiceResources/sourcePreparation/AwsServiceResourceSources",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const sources = yield* SpecificationSources;
      const catalogs = yield* ResourceCatalogs;
      const metadataImporter = yield* AwsResourceMetadataImporter;

      /**
       * The prepare service method returns both verified documents and the
       * resource catalog used to compile declaration and output schemas.
       * Manifest paths are relative to the repository root. A checksum or
       * resource-schema failure stops preparation before contract generation.
       */
      const prepare = Effect.fn("AwsServiceResourceSources.prepare")(function* (
        manifestPath: string,
      ) {
        // The manifest selects both the resource and operation definitions.
        // Read each through checksum verification before conversion can use it.
        const source = yield* fs
          .readFileString(manifestPath)
          .pipe(
            Effect.flatMap(
              Schema.decodeEffect(
                Schema.fromJsonString(AwsServiceResourceManifest),
              ),
            ),
          );

        const smithy = yield* sources.readJson(".", source.smithy);
        const cloudFormation = yield* sources.readJson(
          ".",
          source.cloudFormation,
        );

        const definition = yield* Schema.decodeUnknownEffect(
          RegistryResourceSchema,
        )(cloudFormation);

        // Operation-only manifests can omit external relationships. CDK still
        // imports relationships embedded in the selected Registry definition.
        const relationshipsDocument = yield* Option.match(
          Option.fromUndefinedOr(source.relationships),
          {
            onNone: () => Effect.succeed({}),
            onSome: (source) => sources.readJson(".", source),
          },
        );
        const relationships = yield* Schema.decodeUnknownEffect(
          CloudFormationRelationshipsSchema,
        )(relationshipsDocument);

        const metadata = yield* metadataImporter.prepare({
          region: source.cloudFormation.region,
          documents: [cloudFormation],
          relationships,
          reportDirectory: `.cache/nomoss/aws-resource-metadata/${definition.typeName.replaceAll("::", "-")}`,
        });

        // Output identity and required output fields come from the verified
        // Registry definition. CDK's interpreted property types cannot replace
        // those validation rules when preparing native declarations.
        const catalogSource: ResourceSource = {
          provider: "AWS",
          service: source.smithy.serviceId,
          name: source.cloudFormation.specification,
          format: "CloudFormation",
        };

        const outputCatalog = yield* catalogs.buildCatalog(
          catalogSource,
          definition,
        );

        const prepared: AwsServiceResourcePreparation = {
          source,
          smithy,
          cloudFormation,
          definition,
          outputCatalog,
          metadata,
        };

        return prepared;
      });

      /**
       * The prepareDeclarations service method verifies one region's selected
       * definitions and relationship source before generation. The shared
       * metadata result retains connections between the selected resources;
       * each output catalog still comes from its original Registry definition.
       */
      const prepareDeclarations = Effect.fn(
        "AwsServiceResourceSources.prepareDeclarations",
      )(function* (manifestPath: string) {
        // The declaration manifest selects a region and a complete resource
        // set. Verify its documents before importing relationships among them.
        const source = yield* fs
          .readFileString(manifestPath)
          .pipe(
            Effect.flatMap(
              Schema.decodeEffect(
                Schema.fromJsonString(AwsResourceDeclarationsManifest),
              ),
            ),
          );
        const documents = yield* Effect.forEach(source.resources, (resource) =>
          sources.readJson(".", resource),
        );
        const relationshipsDocument = yield* sources.readJson(
          ".",
          source.relationships,
        );
        const relationships = yield* Schema.decodeUnknownEffect(
          CloudFormationRelationshipsSchema,
        )(relationshipsDocument);
        const metadata = yield* metadataImporter.prepare({
          region: source.region,
          documents,
          relationships,
          reportDirectory: `.cache/nomoss/aws-resource-metadata/${source.region}`,
        });
        // Metadata import preserves input order. Associate each catalog with
        // its pinned source and original definition; relationships are shared
        // across the selection so declarations can refer to one another.
        const resources = yield* Effect.forEach(
          metadata.resources,
          (resource, index) =>
            catalogs
              .buildCatalog(
                {
                  provider: "AWS",
                  service: "CloudFormation",
                  name: source.resources[index].specification,
                  format: "CloudFormation",
                },
                resource.definition,
              )
              .pipe(
                Effect.map((outputCatalog) => ({
                  definition: resource.definition,
                  outputCatalog,
                  metadata,
                })),
              ),
        );

        return { source, resources, metadata };
      });

      return { prepare, prepareDeclarations };
    }),
  },
) {}

export const awsServiceResourceSourcesLayer = Layer.effect(
  AwsServiceResourceSources,
  AwsServiceResourceSources.make,
).pipe(
  Layer.provide([specificationSourcesLayer, awsResourceMetadataImporterLayer]),
);
