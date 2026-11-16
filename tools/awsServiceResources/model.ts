import { Schema } from "effect";
import type { RegistryResourceSchema } from "../awsResources/awsResourceDefinition.js";
import type { AwsResourceMetadata } from "../awsResources/awsResourceMetadata.js";
import type { ResourceOutputCatalog } from "../codegen/resourceSchemas.js";
import { SpecificationFile } from "../codegen/sourceSchemas.js";

/**
 * Native resource generation selects both provider documents explicitly.
 * Their revisions and checksums establish which resource semantics and
 * service operations can be reviewed together.
 */
export const AwsServiceResourceManifest = Schema.Struct({
  smithy: SpecificationFile.pipe(
    Schema.fieldsAssign({ serviceId: Schema.NonEmptyString }),
  ),
  cloudFormation: SpecificationFile.pipe(
    Schema.fieldsAssign({ region: Schema.NonEmptyString }),
  ),
  relationships: Schema.optionalKey(SpecificationFile),
});

export type AwsServiceResourceManifest = typeof AwsServiceResourceManifest.Type;

/**
 * The AwsResourceDeclarationsManifest schema selects one region's definitions
 * and the relationship source reviewed with them. Checksums prevent a later
 * source update from changing generated resource inputs without review.
 */
export const AwsResourceDeclarationsManifest = Schema.Struct({
  region: Schema.NonEmptyString,
  resources: Schema.NonEmptyArray(SpecificationFile),
  relationships: SpecificationFile,
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
