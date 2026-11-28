import {
  GetGroupRequest,
  Group,
  iamOperations,
  User,
} from "@tradedal/aws-client-iam";
import { Array as Arr, Schema, Struct } from "effect";
import {
  AWSUserToGroupAdditionOutputsSchema,
  AWSUserToGroupAdditionRequestSchema,
  AWSUserToGroupAdditionResourceSchema,
} from "nomoss/providers/aws/iam/usertogroupaddition";
import {
  AssociationPage,
  type AwsResourceAssociationMapping,
  AwsResourceAssociationRegistration,
} from "../../resourceAssociationRegistration.js";
import { resourceRequest, resourceResponse } from "../../resourceOperation.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const group = Schema.Struct({
  Parent: Group.schema.fields.GroupName,
  Marker: GetGroupRequest.schema.fields.Marker,
}).pipe(Schema.encodeKeys({ Parent: "GroupName" }));

const membership = Schema.Struct({
  Parent: Group.schema.fields.GroupName,
  Member: User.schema.fields.UserName,
}).pipe(Schema.encodeKeys({ Parent: "GroupName", Member: "UserName" }));

/**
 * The userToGroupAddition mapping uses GetGroup to verify the group ID on
 * each page. The lifecycle needs every page to tell whether the declared
 * users are already members. A name alone could refer to a replacement group.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetGroup and RemoveUserFromGroup)
 * @see ../../../../../refs/effect/packages/effect/src/Schema.ts (encodeKeys)
 */
const userToGroupAddition = {
  schema: AWSUserToGroupAdditionResourceSchema,
  outputsSchema: AWSUserToGroupAdditionOutputsSchema,
  request: Schema.Struct({
    Parent: AWSUserToGroupAdditionRequestSchema.fields.GroupName,
    Members: AWSUserToGroupAdditionRequestSchema.fields.Users,
  }).pipe(Schema.encodeKeys({ Parent: "GroupName", Members: "Users" })),
  list: resourceResponse(
    resourceRequest(iamOperations.GetGroup, group),
    AssociationPage,
    (page) =>
      Struct.assign(
        {
          ParentId: page.Group.GroupId,
          Members: Arr.map(page.Users, ({ UserName }) => UserName),
        },
        Struct.pick(page, ["Marker", "IsTruncated"]),
      ),
  ),
  operations: {
    add: resourceRequest(iamOperations.AddUserToGroup, membership),
    remove: resourceRequest(iamOperations.RemoveUserFromGroup, membership),
  },
  observationKeys: { parent: "GroupName", members: "Users" },
} satisfies AwsResourceAssociationMapping;

/**
 * The makeUserToGroupAdditionManagement constructor registers a lifecycle
 * for the selected memberships. If you remove that declaration, the stack
 * uses the saved record to remove its users from the original group. Other
 * members and the group itself stay in IAM.
 */
export const makeUserToGroupAdditionManagement =
  AwsResourceAssociationRegistration.make(
    iamLifecycleSettings,
    userToGroupAddition,
  );
