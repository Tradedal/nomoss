import { Schema } from "effect";
import { AwsAttributeResourceMapping } from "../../src/providers/aws/management/resourceConfiguration.js";
import {
  CloudFormationRelationshipsSchema,
  type RegistryResourceSchema,
} from "../awsResources/awsResourceDefinition.js";
import type { AwsResourceMetadata } from "../awsResources/awsResourceMetadata.js";
import { SourceCorrection } from "../codegen/correctionSchemas.js";
import type { ResourceOutputCatalog } from "../codegen/resourceSchemas.js";
import { SpecificationFile } from "../codegen/sourceSchemas.js";

/**
 * The AwsResourceLifecycleHints schema records the API choices that Registry
 * definitions do not describe. The generator combines these choices with
 * imported identity and tagging metadata and the original Registry properties.
 */
export const AwsResourceLifecycleHints = Schema.Struct({
  operations: AwsAttributeResourceMapping.fields.operations,
  nameProperty: Schema.NonEmptyString,
  fifoProperty: Schema.optionalKey(Schema.NonEmptyString),
  createTagsParameter: Schema.NonEmptyString,
  outputAttributes: AwsAttributeResourceMapping.fields.outputAttributes,
  missingErrors: AwsAttributeResourceMapping.fields.missingErrors,
  resets: Schema.Record(Schema.String, Schema.Json),
  attributeMapSchema: Schema.NonEmptyString,
  tagMapSchema: Schema.NonEmptyString,
});

/**
 * The AwsServiceResourceManifest schema pins the Registry and Smithy source
 * files together. Optional corrections apply to the verified Smithy model
 * before OpenAPI conversion.
 */
export const AwsServiceResourceManifest = Schema.Struct({
  smithy: SpecificationFile.pipe(
    Schema.fieldsAssign({
      serviceId: Schema.NonEmptyString,
      operations: Schema.optionalKey(
        Schema.NonEmptyArray(Schema.NonEmptyString),
      ),
      corrections: Schema.optionalKey(Schema.Array(SourceCorrection)),
    }),
  ),
  cloudFormation: SpecificationFile.pipe(
    Schema.fieldsAssign({ region: Schema.NonEmptyString }),
  ),
  relationships: Schema.optionalKey(SpecificationFile),
  lifecycle: Schema.optionalKey(AwsResourceLifecycleHints),
});

export type AwsServiceResourceManifest = typeof AwsServiceResourceManifest.Type;

/**
 * The AwsResourceDeclarationsManifest schema selects one region's definitions
 * and the relationship source reviewed with them. A local relationship
 * override supplies the target definitions for a property when generation
 * needs a choice beyond the upstream metadata.
 */
export const AwsResourceDeclarationsManifest = Schema.Struct({
  region: Schema.NonEmptyString,
  resources: Schema.NonEmptyArray(SpecificationFile),
  relationships: SpecificationFile,
  relationshipOverrides: Schema.optionalKey(CloudFormationRelationshipsSchema),
  services: Schema.optionalKey(Schema.Array(Schema.NonEmptyString)),
});

/**
 * Prepared sources retain the complete Smithy and CloudFormation documents
 * beside the canonical resource definition. Later mapping can inspect handler
 * permissions and operation traits while schema compilation uses the shared
 * resource contract and output catalog.
 */
export interface AwsServiceResourcePreparation {
  readonly source: AwsServiceResourceManifest;
  readonly smithy: Schema.JsonObject;
  readonly cloudFormation: Schema.JsonObject;
  readonly definition: typeof RegistryResourceSchema.Type;
  readonly outputCatalog: ResourceOutputCatalog;
  readonly metadata: typeof AwsResourceMetadata.Type;
}
