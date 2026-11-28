import {
  CreateRoleRequest,
  iamOperations,
  Role,
  UpdateRoleRequest,
} from "@nomoss/aws/iam";
import { Schema } from "effect";
import {
  AWSRoleOutputsSchema,
  AWSRoleResourceSchema,
} from "nomoss/providers/aws/iam/role";
import {
  type AwsResourceLifecycleMapping,
  AwsResourceLifecycleRegistration,
} from "../../resourceLifecycleRegistration.js";
import {
  awsJsonDocument,
  awsJsonDocumentInput,
  resourceRequest,
  resourceResponse,
} from "../../resourceOperation.js";
import { IamRoleId } from "./iamIdentity.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const identity = Schema.Struct({
  RoleName: Role.schema.fields.RoleName,
  RoleId: IamRoleId,
});

/**
 * The roleLifecycleMapping definition requires the original RoleId because
 * a role name can refer to a different role after deletion. It also exposes
 * the trust policy as a JSON object, so the stack can compare its contents
 * with the policy in the declaration.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (Role and GetRole)
 */
const roleLifecycleMapping = {
  schema: AWSRoleResourceSchema,
  outputsSchema: AWSRoleOutputsSchema,
  generatedName: { property: "RoleName", maxLength: 64 },
  ownership: { identity, property: "RoleId" },
  create: resourceResponse(
    resourceRequest(
      iamOperations.CreateRole,
      Schema.Struct({
        ...CreateRoleRequest.schema.fields,
        AssumeRolePolicyDocument: awsJsonDocumentInput,
      }),
    ),
    identity,
    ({ Role }) => Role,
  ),
  read: resourceResponse(
    iamOperations.GetRole,
    Schema.Struct({
      ...Role.schema.fields,
      AssumeRolePolicyDocument: Schema.optionalKey(awsJsonDocument),
    }),
    ({ Role }) => Role,
  ),
  update: resourceRequest(iamOperations.UpdateRole, UpdateRoleRequest.schema),
  remove: iamOperations.DeleteRole,
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeRoleManagement constructor registers the IAM role itself.
 * Declare its trust policy at create time. This lifecycle uses UpdateRole
 * for in-place changes such as the description.
 */
export const makeRoleManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  roleLifecycleMapping,
);
