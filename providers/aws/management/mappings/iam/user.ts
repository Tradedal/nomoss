import { CreateUserRequest, iamOperations, User } from "@nomoss/aws/iam";
import { Schema } from "effect";
import {
  AWSUserOutputsSchema,
  AWSUserResourceSchema,
} from "nomoss/providers/aws/iam/user";
import {
  type AwsResourceLifecycleMapping,
  AwsResourceLifecycleRegistration,
} from "../../resourceLifecycleRegistration.js";
import { resourceRequest, resourceResponse } from "../../resourceOperation.js";
import { IamUserId } from "./iamIdentity.js";
import { iamLifecycleSettings } from "./iamLifecycleSettings.js";

const name = { UserName: User.schema.fields.UserName };
const path = Schema.optionalKey(User.schema.fields.Path);

/**
 * The userLifecycleMapping definition requires the original UserId before
 * the stack can mutate a user by name. That check still applies when the
 * declaration supplied the name explicitly.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (User and GetUser)
 * @see ../../../../../refs/effect/packages/effect/src/Schema.ts (encodeKeys)
 */
const userLifecycleMapping = {
  schema: AWSUserResourceSchema,
  outputsSchema: AWSUserOutputsSchema,
  generatedName: { property: "UserName", maxLength: 64 },
  ownership: {
    identity: Schema.Struct({ ...name, UserId: IamUserId }),
    property: "UserId",
  },
  create: resourceResponse(
    resourceRequest(iamOperations.CreateUser, CreateUserRequest.schema),
    User,
    ({ User }) => User,
  ),
  read: resourceResponse(iamOperations.GetUser, User, ({ User }) => User),
  update: resourceRequest(
    iamOperations.UpdateUser,
    Schema.Struct({ ...name, Path: path }).pipe(
      Schema.encodeKeys({ Path: "NewPath" }),
    ),
  ),
  remove: iamOperations.DeleteUser,
} satisfies AwsResourceLifecycleMapping;

/**
 * The makeUserManagement constructor registers the IAM user. An in-place
 * update can change the user's path. The update request uses the saved
 * user name, so use a replacement to change that name.
 */
export const makeUserManagement = AwsResourceLifecycleRegistration.make(
  iamLifecycleSettings,
  userLifecycleMapping,
);
