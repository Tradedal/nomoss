import {
  CreateOpenIDConnectProviderRequest,
  GetOpenIDConnectProviderRequest,
  GetOpenIDConnectProviderResponse,
  iamOperations,
  UpdateOpenIDConnectProviderThumbprintRequest,
} from "@nomoss/aws/iam";
import { Schema, SchemaTransformation, String as Str } from "effect";
import {
  AWSOIDCProviderOutputsSchema,
  AWSOIDCProviderResourceSchema,
} from "nomoss/providers/aws/iam/oidcprovider";
import {
  type AwsResourceLifecycleMapping,
  AwsResourceLifecycleRegistration,
} from "../../resourceLifecycleRegistration.js";
import { resourceRequest, resourceResponse } from "../../resourceOperation.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const identity = Schema.Struct({ Arn: AwsArn }).pipe(
  Schema.encodeKeys({ Arn: "OpenIDConnectProviderArn" }),
);

const { ClientIDList, ...createFields } =
  CreateOpenIDConnectProviderRequest.schema.fields;

const {
  ClientIDList: observedClients,
  Url: _url,
  ...observationFields
} = GetOpenIDConnectProviderResponse.schema.fields;

const issuerUrl = Schema.String.pipe(
  Schema.decodeTo(
    Schema.String,
    SchemaTransformation.transform({
      decode: (url) => `https://${url}`,
      encode: Str.replace("https://", ""),
    }),
  ),
);

/**
 * The oidcProviderLifecycleMapping definition restores the HTTPS scheme to
 * the issuer URL because IAM omits it from the read response. The stack
 * can then compare the URL with the one in the declaration.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetOpenIDConnectProvider)
 * @see ../../../../../refs/effect/packages/effect/src/Schema.ts (encodeKeys)
 */
const oidcProviderLifecycleMapping = {
  schema: AWSOIDCProviderResourceSchema,
  outputsSchema: AWSOIDCProviderOutputsSchema,
  create: resourceResponse(
    resourceRequest(
      iamOperations.CreateOpenIDConnectProvider,
      Schema.Struct({ ...createFields, ClientIdList: ClientIDList }).pipe(
        Schema.encodeKeys({ ClientIdList: "ClientIDList" }),
      ),
    ),
    identity,
  ),
  read: resourceResponse(
    resourceRequest(iamOperations.GetOpenIDConnectProvider, identity),
    Schema.Struct({
      ...observationFields,
      Url: Schema.optionalKey(issuerUrl),
      ClientIdList: observedClients,
    }).pipe(Schema.encodeKeys({ ClientIdList: "ClientIDList" })),
  ),
  update: resourceRequest(
    iamOperations.UpdateOpenIDConnectProviderThumbprint,
    Schema.Struct({
      Arn: GetOpenIDConnectProviderRequest.schema.fields
        .OpenIDConnectProviderArn,
      ThumbprintList:
        UpdateOpenIDConnectProviderThumbprintRequest.schema.fields
          .ThumbprintList,
    }).pipe(Schema.encodeKeys({ Arn: "OpenIDConnectProviderArn" })),
  ),
  remove: resourceRequest(iamOperations.DeleteOpenIDConnectProvider, identity),
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeOIDCProviderManagement constructor registers the lifecycle for an
 * IAM OpenID Connect provider. The stack can update its thumbprints and
 * later delete it by the ARN IAM returned at create time.
 */
export const makeOIDCProviderManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  oidcProviderLifecycleMapping,
);

import { AwsArn } from "@nomoss/aws/model";
