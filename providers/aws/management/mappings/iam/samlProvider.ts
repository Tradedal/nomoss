import {
  CreateSAMLProviderRequest,
  GetSAMLProviderResponse,
  iamOperations,
  UpdateSAMLProviderRequest,
} from "@tradedal/aws-client-iam";
import { Schema } from "effect";
import {
  AWSSAMLProviderOutputsSchema,
  AWSSAMLProviderResourceSchema,
} from "nomoss/providers/aws/iam/samlprovider";
import {
  type AwsResourceLifecycleMapping,
  AwsResourceLifecycleRegistration,
} from "../../resourceLifecycleRegistration.js";
import { resourceRequest, resourceResponse } from "../../resourceOperation.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const identity = Schema.Struct({ Arn: AwsArn }).pipe(
  Schema.encodeKeys({ Arn: "SAMLProviderArn" }),
);

const { SAMLMetadataDocument: metadata, ...createFields } =
  CreateSAMLProviderRequest.schema.fields;

const {
  SAMLProviderArn,
  SAMLMetadataDocument: updateMetadata,
  ...updateFields
} = UpdateSAMLProviderRequest.schema.fields;

const {
  SAMLProviderUUID,
  SAMLMetadataDocument: observedMetadata,
  ...readFields
} = GetSAMLProviderResponse.schema.fields;

/**
 * The samlProviderLifecycleMapping definition uses the ARN to read the IAM
 * provider UUID after create. The same read supplies the current metadata
 * and encryption mode, so a successful update request alone cannot confirm
 * the requested values.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (CreateSAMLProvider and GetSAMLProvider)
 * @see ../../../../../refs/effect/packages/effect/src/Schema.ts (encodeKeys)
 */
const samlProviderLifecycleMapping = {
  schema: AWSSAMLProviderResourceSchema,
  outputsSchema: AWSSAMLProviderOutputsSchema,
  generatedName: { property: "Name", maxLength: 128 },
  create: resourceResponse(
    resourceRequest(
      iamOperations.CreateSAMLProvider,
      Schema.Struct({ ...createFields, SamlMetadataDocument: metadata }).pipe(
        Schema.encodeKeys({ SamlMetadataDocument: "SAMLMetadataDocument" }),
      ),
    ),
    identity,
  ),
  read: resourceResponse(
    resourceRequest(iamOperations.GetSAMLProvider, identity),
    Schema.Struct({
      ...readFields,
      SamlProviderUUID: SAMLProviderUUID,
      SamlMetadataDocument: observedMetadata,
    }).pipe(
      Schema.encodeKeys({
        SamlProviderUUID: "SAMLProviderUUID",
        SamlMetadataDocument: "SAMLMetadataDocument",
      }),
    ),
  ),
  update: resourceRequest(
    iamOperations.UpdateSAMLProvider,
    Schema.Struct({
      Arn: SAMLProviderArn,
      ...updateFields,
      SamlMetadataDocument: updateMetadata,
    }).pipe(
      Schema.encodeKeys({
        Arn: "SAMLProviderArn",
        SamlMetadataDocument: "SAMLMetadataDocument",
      }),
    ),
  ),
  remove: resourceRequest(iamOperations.DeleteSAMLProvider, identity),
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeSAMLProviderManagement constructor registers an IAM SAML provider.
 * The stack can apply a new metadata document to the same provider ARN.
 */
export const makeSAMLProviderManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  samlProviderLifecycleMapping,
);

import { AwsArn } from "@tradedal/aws-client-core/model";
