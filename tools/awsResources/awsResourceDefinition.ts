import { Effect, Schema } from "effect";
import {
  ResourceDefinition,
  type ResourceOutputCatalog,
} from "../codegen/resourceSchemas.js";

/**
 * RegistryResourceSchema validates the AWS resource definition used to generate
 * declarations. Property classifications retain identity and mutability rules
 * required by later Cloud Control operations.
 */
export const RegistryResourceSchema = Schema.Struct({
  ...ResourceDefinition.fields,
  typeName: Schema.String.check(Schema.isPattern(/^AWS::[^:]+::[^:]+$/)),
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
