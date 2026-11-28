import { Schema } from "effect";
import { AwsAttributeResourceMapping } from "../../providers/aws/management/resourceConfiguration.js";
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
 * The manifestIdentifierPattern expression checks names the generator uses in
 * TypeScript imports. Names such as `roleCommands` and `apiGatewayV2` can name
 * an export or form part of a client identifier. A hyphen in `role-commands`
 * would make the generated identifier invalid.
 */
const manifestIdentifierPattern = /^[A-Za-z]\w*$/;

const memberName = Schema.String.check(
  Schema.isPattern(manifestIdentifierPattern),
);

/**
 * The operationModulePathPattern expression identifies a service directory
 * and an exported resource definition. A path such as `iam/roleOperations`
 * selects the IAM client and the `roleOperations` export.
 */
const operationModulePathPattern = /^[A-Za-z]\w*\/[A-Za-z]\w*$/;

/**
 * The AwsResourceDeclarationsManifest schema selects one region's definitions
 * and the relationship source reviewed with them. A local relationship
 * override supplies the target definitions for a property when generation
 * needs a choice beyond the upstream metadata.
 */
export const AwsResourceDeclarationsManifest = Schema.Struct({
  region: Schema.NonEmptyString,
  resources: Schema.NonEmptyArray(
    SpecificationFile.pipe(
      Schema.fieldsAssign({
        operations: Schema.optionalKey(
          Schema.String.check(Schema.isPattern(operationModulePathPattern)),
        ),
        stateSecretOutputKeys: Schema.optionalKey(Schema.Array(memberName)),
        corrections: Schema.optionalKey(Schema.Array(SourceCorrection)),
        relationshipValuePrefixes: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.NonEmptyString),
        ),
      }),
    ),
  ),
  relationships: SpecificationFile,
  operationServices: Schema.optionalKey(
    Schema.Record(
      Schema.String.check(Schema.isPattern(manifestIdentifierPattern)),
      Schema.Struct({
        missingErrors: Schema.NonEmptyArray(Schema.NonEmptyString),
      }),
    ),
  ),
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
