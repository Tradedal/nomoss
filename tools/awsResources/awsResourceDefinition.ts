import { Effect, Schema } from "effect";
import {
  ResourceDefinition,
  type ResourceOutputCatalog,
} from "../codegen/resourceSchemas.js";

/**
 * Registry classifications determine which properties applications may set
 * and which identity values must survive reads. Replacement strategies must
 * use one of the Registry's defined orders so native generation can preserve
 * the required order in resource planning metadata.
 */
export const RegistryResourceSchema = Schema.Struct({
  ...ResourceDefinition.fields,
  typeName: Schema.String.check(Schema.isPattern(/^AWS::[^:]+::[^:]+$/)),
  replacementStrategy: Schema.optionalKey(
    Schema.Literals(["create_then_delete", "delete_then_create"]),
  ),
});

/**
 * CloudFormationRelationshipsSchema identifies inputs that can refer to
 * another resource's outputs. Generated declarations accept those references
 * so their actual use can establish dependencies in the resource graph.
 */
export const CloudFormationRelationshipsSchema = Schema.Record(
  Schema.String,
  Schema.Struct({
    relationships: Schema.Record(
      Schema.String,
      Schema.Array(
        Schema.Struct({
          cloudformationType: Schema.NonEmptyString,
          propertyPath: Schema.NonEmptyString,
        }),
      ),
    ).pipe(Schema.withDecodingDefaultKey(Effect.succeed({}))),
  }),
);

export interface CloudFormationResourceDefinition {
  readonly registry: typeof RegistryResourceSchema.Type;
  readonly cloudFormationRelationships: typeof CloudFormationRelationshipsSchema.Type;
  readonly outputCatalog: ResourceOutputCatalog;
}

export const LoadResourceDefinitionInputSchema = Schema.Struct({
  registrySchemaPath: Schema.NonEmptyString,
  relationshipsPath: Schema.NonEmptyString,
});

export const PublishResourceModuleInputSchema = Schema.Struct({
  outputPath: Schema.NonEmptyString,
  source: Schema.NonEmptyString,
});
