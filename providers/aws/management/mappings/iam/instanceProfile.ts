import { InstanceProfile, iamOperations, Role } from "@nomoss/aws/iam";
import { Array as Arr, Schema } from "effect";
import {
  AWSInstanceProfileOutputsSchema,
  AWSInstanceProfileResourceSchema,
} from "nomoss/providers/aws/iam/instanceprofile";
import { AssociationNames } from "../../resourceAssociations.js";
import {
  type AwsResourceLifecycleMapping,
  AwsResourceLifecycleRegistration,
} from "../../resourceLifecycleRegistration.js";
import { resourceRequest, resourceResponse } from "../../resourceOperation.js";
import { IamInstanceProfileId } from "./iamIdentity.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const identity = Schema.Struct({
  InstanceProfileName: InstanceProfile.schema.fields.InstanceProfileName,
  InstanceProfileId: IamInstanceProfileId,
});

const membership = Schema.Struct({
  Parent: InstanceProfile.schema.fields.InstanceProfileName,
  Member: Role.schema.fields.RoleName,
}).pipe(
  Schema.encodeKeys({ Parent: "InstanceProfileName", Member: "RoleName" }),
);

/**
 * The instanceProfile mapping separates the IAM profile request from the
 * role attachment. IAM accepts one role per profile. When the stack replaces
 * that role, it must remove the role it previously declared before it can
 * attach the new one.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (CreateInstanceProfile and AddRoleToInstanceProfile)
 */
const instanceProfile = {
  schema: AWSInstanceProfileResourceSchema,
  outputsSchema: AWSInstanceProfileOutputsSchema,
  generatedName: { property: "InstanceProfileName", maxLength: 128 },
  ownership: { identity, property: "InstanceProfileId" },
  create: resourceResponse(
    iamOperations.CreateInstanceProfile,
    identity,
    ({ InstanceProfile }) => InstanceProfile,
  ),
  read: resourceResponse(
    iamOperations.GetInstanceProfile,
    InstanceProfile.schema.mapFields((fields) => ({
      ...fields,
      Roles: AssociationNames,
    })),
    ({ InstanceProfile }) => ({
      ...InstanceProfile,
      Roles: Arr.map(InstanceProfile.Roles, ({ RoleName }) => RoleName),
    }),
  ),
  remove: iamOperations.DeleteInstanceProfile,
  associations: {
    property: "Roles",
    parent: "InstanceProfileName",
    capacity: 1,
    order: "releaseSlotFirst",
    add: resourceRequest(iamOperations.AddRoleToInstanceProfile, membership),
    remove: resourceRequest(
      iamOperations.RemoveRoleFromInstanceProfile,
      membership,
    ),
  },
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeInstanceProfileManagement constructor registers a lifecycle for
 * the profile itself. If IAM returns a different profile ID for the saved
 * name, the stack refuses to change the role or delete the replacement.
 */
export const makeInstanceProfileManagement =
  AwsResourceLifecycleRegistration.make(iamLifecycleSettings, instanceProfile);
