import { Group, iamOperations } from "@tradedal/aws-client-iam";
import { Schema } from "effect";
import {
  AWSGroupOutputsSchema,
  AWSGroupResourceSchema,
} from "nomoss/providers/aws/iam/group";
import {
  type AwsResourceLifecycleMapping,
  AwsResourceLifecycleRegistration,
} from "../../resourceLifecycleRegistration.js";
import { resourceRequest, resourceResponse } from "../../resourceOperation.js";
import { IamGroupId } from "./iamIdentity.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const name = { GroupName: Group.schema.fields.GroupName };
const path = Schema.optionalKey(Group.schema.fields.Path);

/**
 * The groupLifecycleMapping definition requires the original GroupId on
 * later commands because IAM can reuse a group name. The stack rejects an
 * update or delete when that name now identifies a different group.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (Group and GetGroup)
 * @see ../../../../../refs/effect/packages/effect/src/Schema.ts (encodeKeys)
 */
const groupLifecycleMapping = {
  schema: AWSGroupResourceSchema,
  outputsSchema: AWSGroupOutputsSchema,
  generatedName: { property: "GroupName", maxLength: 128 },
  ownership: {
    identity: Schema.Struct({
      ...name,
      GroupId: IamGroupId,
    }),
    property: "GroupId",
  },
  create: resourceResponse(
    resourceRequest(
      iamOperations.CreateGroup,
      Schema.Struct({ ...name, Path: path }),
    ),
    Group,
    ({ Group }) => Group,
  ),
  read: resourceResponse(iamOperations.GetGroup, Group, ({ Group }) => Group),
  update: resourceRequest(
    iamOperations.UpdateGroup,
    Schema.Struct({ ...name, Path: path }).pipe(
      Schema.encodeKeys({ Path: "NewPath" }),
    ),
  ),
  remove: iamOperations.DeleteGroup,
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeGroupManagement constructor registers the group itself. An apply
 * can update its path; use a separate membership declaration to choose
 * which users belong to it.
 */
export const makeGroupManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  groupLifecycleMapping,
);
