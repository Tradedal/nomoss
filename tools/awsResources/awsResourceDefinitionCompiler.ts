import {
  Context,
  Effect,
  FileSystem,
  Path,
  Schema,
  String as Str,
} from "effect";
import { ResourceCatalogs } from "../codegen/resourceCatalogs.js";
import { TypeScriptModulePublisher } from "../typeScriptModulePublisher.js";
import {
  CloudFormationRelationshipsSchema,
  type CloudFormationResourceDefinition,
  LoadResourceDefinitionInputSchema,
  PublishResourceModuleInputSchema,
  RegistryResourceSchema,
} from "./awsResourceDefinition.js";
import { AwsResourceTypeScript } from "./awsResourceTypeScript.js";

/**
 * AwsResourceDefinitionCompiler emits and publishes typed resource
 * declarations from AWS Registry schemas and relationship definitions. The
 * generated inputs retain Registry validation, and output references let stack
 * authors connect resources before provider creation.
 */
export class AwsResourceDefinitionCompiler extends Context.Service<AwsResourceDefinitionCompiler>()(
  "nomoss/tools/awsResources/awsResourceDefinitionCompiler",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const resourceCatalogs = yield* ResourceCatalogs;
      const publisher = yield* TypeScriptModulePublisher;
      const typeScript = yield* AwsResourceTypeScript;

      /**
       * The loadResourceDefinition service method validates Registry data and
       * the relationships that permit output references. Invalid source fails
       * before module emission.
       */
      const loadResourceDefinition = Effect.fn(
        "AwsResourceDefinitionCompiler.loadResourceDefinition",
      )(function* (input: unknown) {
        const request = yield* Schema.decodeUnknownEffect(
          LoadResourceDefinitionInputSchema,
        )(input);
        const registry = yield* fs
          .readFileString(request.registrySchemaPath)
          .pipe(
            Effect.flatMap(
              Schema.decodeEffect(
                Schema.fromJsonString(RegistryResourceSchema),
              ),
            ),
          );

        const cloudFormationRelationships = yield* fs
          .readFileString(request.relationshipsPath)
          .pipe(
            Effect.flatMap(
              Schema.decodeEffect(
                Schema.fromJsonString(CloudFormationRelationshipsSchema),
              ),
            ),
          );

        const outputCatalog = yield* resourceCatalogs.buildCatalog(
          {
            provider: "AWS",
            service: "CloudFormation",
            name: path.basename(request.registrySchemaPath),
            format: "CloudFormation",
          },
          registry,
        );

        const definition: CloudFormationResourceDefinition = {
          registry,
          cloudFormationRelationships,
          outputCatalog,
        };

        return definition;
      });

      /**
       * The emitResourceModule service method returns a resource module for
       * inspection before publication. Its schemas and registration API
       * preserve the model through Effect compilation and structural
       * TypeScript generation. The publication path determines the relative
       * import of core's output binding, so callers can select a resource
       * directory without changing the generated contract.
       */
      const emitResourceModule = Effect.fn(
        "AwsResourceDefinitionCompiler.emitResourceModule",
      )(function* (
        definition: CloudFormationResourceDefinition,
        outputPath: string,
      ) {
        const destination = yield* Schema.decodeEffect(
          PublishResourceModuleInputSchema.fields.outputPath,
        )(outputPath);
        const outputBindingModule = path.relative(
          path.dirname(path.resolve(destination)),
          path.resolve("src/core/resource/resourceOutputBinding.js"),
        );
        const module = typeScript.createModule();
        const code = typeScript.compileSchemas(definition);

        typeScript.emitSchemas(module, definition, code);
        typeScript.emitPropertyReferences(module, definition);
        typeScript.emitResourceContract(
          module,
          definition,
          outputBindingModule,
        );
        typeScript.emitResourceRegistration(module, definition);

        const resourceName = Str.split(definition.registry.typeName, "::")[2];

        yield* resourceCatalogs.emitCatalog(
          module,
          `${resourceName}OutputCatalog`,
          [definition.outputCatalog],
        );

        module.organizeImports();

        const source: string = module.getFullText();

        return source;
      });

      /**
       * The publishResourceModule service method writes the selected module
       * only after the formatter and lint validator accept the proposed source.
       */
      const publishResourceModule = Effect.fn(
        "AwsResourceDefinitionCompiler.publishResourceModule",
      )(function* (input: unknown) {
        const publication = yield* Schema.decodeUnknownEffect(
          PublishResourceModuleInputSchema,
        )(input);
        const publishedPath: string = yield* publisher.publishModule(
          publication.outputPath,
          publication.source,
        );

        return publishedPath;
      });

      return {
        loadResourceDefinition,
        emitResourceModule,
        publishResourceModule,
      };
    }),
  },
) {}
