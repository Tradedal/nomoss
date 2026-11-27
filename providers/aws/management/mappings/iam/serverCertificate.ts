import {
  iamOperations,
  ServerCertificateMetadata,
  UploadServerCertificateRequest,
} from "@tradedal/aws-client-iam";
import { Schema } from "effect";
import {
  AWSServerCertificateOutputsSchema,
  AWSServerCertificateResourceSchema,
} from "nomoss/providers/aws/iam/servercertificate";
import {
  type AwsResourceLifecycleMapping,
  AwsResourceLifecycleRegistration,
} from "../../resourceLifecycleRegistration.js";
import { resourceRequest, resourceResponse } from "../../resourceOperation.js";
import { IamServerCertificateId } from "./iamIdentity.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const { ServerCertificateName, Path } = ServerCertificateMetadata.schema.fields;

/**
 * The serverCertificateLifecycleMapping definition confirms an upload with
 * the certificate metadata IAM returns. Later commands check the saved
 * certificate ID so a different upload under the same name remains intact.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (UploadServerCertificate and ServerCertificateMetadata)
 * @see ../../../../../refs/effect/packages/effect/src/Schema.ts (encodeKeys)
 */
const serverCertificateLifecycleMapping = {
  schema: AWSServerCertificateResourceSchema,
  outputsSchema: AWSServerCertificateOutputsSchema,
  generatedName: { property: "ServerCertificateName", maxLength: 128 },
  ownership: {
    identity: Schema.Struct({
      ServerCertificateName,
      ServerCertificateId: IamServerCertificateId,
    }),
    property: "ServerCertificateId",
  },
  create: resourceResponse(
    resourceRequest(
      iamOperations.UploadServerCertificate,
      UploadServerCertificateRequest.schema,
    ),
    ServerCertificateMetadata,
    ({ ServerCertificateMetadata }) => ServerCertificateMetadata,
  ),
  read: resourceResponse(
    iamOperations.GetServerCertificate,
    ServerCertificateMetadata,
    ({ ServerCertificate }) => ServerCertificate?.ServerCertificateMetadata,
  ),
  update: resourceRequest(
    iamOperations.UpdateServerCertificate,
    Schema.Struct({
      ServerCertificateName,
      Path: Schema.optionalKey(Path),
    }).pipe(Schema.encodeKeys({ Path: "NewPath" })),
  ),
  remove: iamOperations.DeleteServerCertificate,
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeServerCertificateManagement constructor registers a certificate
 * uploaded to IAM. It can change the certificate's path in place. Supply
 * a replacement resource to upload a different certificate or private key.
 */
export const makeServerCertificateManagement =
  AwsResourceLifecycleRegistration.make(
    iamLifecycleSettings,
    serverCertificateLifecycleMapping,
  );
