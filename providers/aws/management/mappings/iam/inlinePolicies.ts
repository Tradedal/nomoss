import {
  GetGroupPolicyResponse,
  GetRolePolicyResponse,
  GetUserPolicyResponse,
  iamOperations,
  PutGroupPolicyRequest,
  PutRolePolicyRequest,
  PutUserPolicyRequest,
} from "@tradedal/aws-client-iam";
import { Schema } from "effect";
import {
  AWSGroupPolicyOutputsSchema,
  AWSGroupPolicyResourceSchema,
} from "nomoss/providers/aws/iam/grouppolicy";
import {
  AWSRolePolicyOutputsSchema,
  AWSRolePolicyResourceSchema,
} from "nomoss/providers/aws/iam/rolepolicy";
import {
  AWSUserPolicyOutputsSchema,
  AWSUserPolicyResourceSchema,
} from "nomoss/providers/aws/iam/userpolicy";
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
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const createResponse = Schema.Struct({});

const putGroupPolicy = resourceRequest(
  iamOperations.PutGroupPolicy,
  PutGroupPolicyRequest.schema.mapFields((fields) => ({
    ...fields,
    PolicyDocument: awsJsonDocumentInput,
  })),
);

const putRolePolicy = resourceRequest(
  iamOperations.PutRolePolicy,
  PutRolePolicyRequest.schema.mapFields((fields) => ({
    ...fields,
    PolicyDocument: awsJsonDocumentInput,
  })),
);

const putUserPolicy = resourceRequest(
  iamOperations.PutUserPolicy,
  PutUserPolicyRequest.schema.mapFields((fields) => ({
    ...fields,
    PolicyDocument: awsJsonDocumentInput,
  })),
);

/**
 * The groupPolicyLifecycleMapping definition identifies an inline policy
 * by the group name and policy name. IAM embeds the document on that group,
 * so the same policy name can refer to a different document on another group.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (PutGroupPolicy)
 */
const groupPolicyLifecycleMapping = {
  schema: AWSGroupPolicyResourceSchema,
  outputsSchema: AWSGroupPolicyOutputsSchema,
  createMode: "requireAbsent",
  create: resourceResponse(putGroupPolicy, createResponse, () => ({})),
  read: resourceResponse(
    iamOperations.GetGroupPolicy,
    GetGroupPolicyResponse.schema.mapFields((fields) => ({
      ...fields,
      PolicyDocument: awsJsonDocument,
    })),
  ),
  update: putGroupPolicy,
  remove: iamOperations.DeleteGroupPolicy,
} satisfies AwsResourceLifecycleMapping;

/**
 * The rolePolicyLifecycleMapping definition applies to an inline permissions
 * policy. IAM stores the role's trust policy separately, so a change to this
 * document changes the role's permissions and leaves its trust policy intact.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetRolePolicy and PutRolePolicy)
 */
const rolePolicyLifecycleMapping = {
  schema: AWSRolePolicyResourceSchema,
  outputsSchema: AWSRolePolicyOutputsSchema,
  createMode: "requireAbsent",
  create: resourceResponse(putRolePolicy, createResponse, () => ({})),
  read: resourceResponse(
    iamOperations.GetRolePolicy,
    GetRolePolicyResponse.schema.mapFields((fields) => ({
      ...fields,
      PolicyDocument: awsJsonDocument,
    })),
  ),
  update: putRolePolicy,
  remove: iamOperations.DeleteRolePolicy,
} satisfies AwsResourceLifecycleMapping;

/**
 * The userPolicyLifecycleMapping definition requires the user name beside
 * the policy name on reads and deletes. Two IAM users can each have an inline
 * policy with the same name.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetUserPolicy and DeleteUserPolicy)
 */
const userPolicyLifecycleMapping = {
  schema: AWSUserPolicyResourceSchema,
  outputsSchema: AWSUserPolicyOutputsSchema,
  createMode: "requireAbsent",
  create: resourceResponse(putUserPolicy, createResponse, () => ({})),
  read: resourceResponse(
    iamOperations.GetUserPolicy,
    GetUserPolicyResponse.schema.mapFields((fields) => ({
      ...fields,
      PolicyDocument: awsJsonDocument,
    })),
  ),
  update: putUserPolicy,
  remove: iamOperations.DeleteUserPolicy,
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeGroupPolicyManagement constructor registers teardown for an inline
 * group policy. If the group is already absent, IAM's NoSuchEntity response
 * also establishes that its inline policy is absent.
 */
export const makeGroupPolicyManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  groupPolicyLifecycleMapping,
);

/**
 * The makeRolePolicyManagement constructor registers a lifecycle that
 * confirms a new policy document through GetRolePolicy. If IAM still returns
 * the previous document after it accepts PutRolePolicy, the stack waits for
 * the read to show the requested permissions.
 */
export const makeRolePolicyManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  rolePolicyLifecycleMapping,
);

/**
 * The makeUserPolicyManagement constructor registers a lifecycle for the
 * document attached to one IAM user. If a declaration changes the user name
 * or the policy name, the stack treats it as a different inline policy.
 */
export const makeUserPolicyManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  userPolicyLifecycleMapping,
);
