import {
  Group,
  InstanceProfile,
  Policy,
  Role,
  ServerCertificateMetadata,
  User,
} from "@tradedal/aws-client-iam";
import { Schema } from "effect";

/** The IamGroupId schema identifies the original IAM group even if AWS reuses its name. */
export const IamGroupId = Group.schema.fields.GroupId.pipe(
  Schema.brand("IamGroupId"),
);

/** The IamRoleId schema separates a role's permanent ID from the name IAM uses to address it. */
export const IamRoleId = Role.schema.fields.RoleId.pipe(
  Schema.brand("IamRoleId"),
);

/** The IamUserId schema identifies an IAM user even if the user name becomes available again. */
export const IamUserId = User.schema.fields.UserId.pipe(
  Schema.brand("IamUserId"),
);

/** The IamInstanceProfileId schema distinguishes the profile's permanent identity from the role it can hold. */
export const IamInstanceProfileId =
  InstanceProfile.schema.fields.InstanceProfileId.pipe(
    Schema.brand("IamInstanceProfileId"),
  );

/** The IamPolicyId schema distinguishes policies that IAM creates at the same ARN at different times. */
export const IamPolicyId = Schema.requiredKey(
  Policy.schema.fields.PolicyId,
).pipe(Schema.brand("IamPolicyId"));

/** The IamServerCertificateId schema distinguishes a saved upload from a later certificate under the same name. */
export const IamServerCertificateId =
  ServerCertificateMetadata.schema.fields.ServerCertificateId.pipe(
    Schema.brand("IamServerCertificateId"),
  );
