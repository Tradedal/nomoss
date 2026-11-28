// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.

import { AwsClient } from "@nomoss/aws";
import type {
  AwsQueryOperation,
  AwsServiceDefinition,
} from "@nomoss/aws/model";
import { Effect, Schema } from "effect";

export const StatusType = Schema.Literals([
  "Active",
  "Inactive",
  "Expired",
]).annotate({ identifier: "statusType" });

export type StatusType = typeof StatusType.Type;

export const Group = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(512).annotate({
          expected: "a string with at most 512 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
        }),
      ),
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    GroupId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
    Arn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    CreateDate: Schema.String.annotate({ format: "date-time" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Group" });

export type Group = typeof Group.Type;

export const Tag = Schema.StructWithRest(
  Schema.Struct({
    Key: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
        }),
      ),
    Value: Schema.String.check(
      Schema.isMinCodePoints(0).annotate({
        expected: "a string with at least 0 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Tag" });

export type Tag = typeof Tag.Type;

export const PermissionsBoundaryAttachmentType = Schema.Literal(
  "PermissionsBoundaryPolicy",
).annotate({ identifier: "PermissionsBoundaryAttachmentType" });

export type PermissionsBoundaryAttachmentType =
  typeof PermissionsBoundaryAttachmentType.Type;

export const RoleLastUsed = Schema.StructWithRest(
  Schema.Struct({
    LastUsedDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    Region: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "RoleLastUsed" });

export type RoleLastUsed = typeof RoleLastUsed.Type;

export const SourceRoleTemplate = Schema.StructWithRest(
  Schema.Struct({
    TemplateArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    TemplateMinorVersion: Schema.Finite,
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "SourceRoleTemplate" });

export type SourceRoleTemplate = typeof SourceRoleTemplate.Type;

export const LoginProfile = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    CreateDate: Schema.String.annotate({ format: "date-time" }),
    PasswordResetRequired: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "LoginProfile" });

export type LoginProfile = typeof LoginProfile.Type;

export const PolicyVersion = Schema.StructWithRest(
  Schema.Struct({
    Document: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(131072).annotate({
            expected: "a string with at most 131072 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    VersionId: Schema.optionalKey(
      Schema.String.check(
        Schema.isPattern(
          new globalThis.RegExp("^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$",
        }),
      ),
    ),
    IsDefaultVersion: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    CreateDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "PolicyVersion" });

export type PolicyVersion = typeof PolicyVersion.Type;

export const AssertionEncryptionModeType = Schema.Literals([
  "Required",
  "Allowed",
]).annotate({ identifier: "assertionEncryptionModeType" });

export type AssertionEncryptionModeType =
  typeof AssertionEncryptionModeType.Type;

export const SAMLPrivateKey = Schema.StructWithRest(
  Schema.Struct({
    KeyId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(22).annotate({
          expected: "a string with at least 22 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[A-Z0-9]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[A-Z0-9]+$",
          }),
        ),
    ),
    Timestamp: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "SAMLPrivateKey" });

export type SAMLPrivateKey = typeof SAMLPrivateKey.Type;

export const ServerCertificateMetadata = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(512).annotate({
          expected: "a string with at most 512 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
        }),
      ),
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    ServerCertificateId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
    Arn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    UploadDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    Expiration: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ServerCertificateMetadata" });

export type ServerCertificateMetadata = typeof ServerCertificateMetadata.Type;

export const DeletionTaskStatusType = Schema.Literals([
  "SUCCEEDED",
  "IN_PROGRESS",
  "FAILED",
  "NOT_STARTED",
]).annotate({ identifier: "DeletionTaskStatusType" });

export type DeletionTaskStatusType = typeof DeletionTaskStatusType.Type;

export const RoleUsageType = Schema.StructWithRest(
  Schema.Struct({
    Region: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(100).annotate({
          expected: "a string with at most 100 code points",
        }),
      ),
    ),
    Resources: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(20).annotate({
            expected: "a string with at least 20 code points",
          }),
        ).check(
          Schema.isMaxCodePoints(2048).annotate({
            expected: "a string with at most 2048 code points",
          }),
        ),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "RoleUsageType" });

export type RoleUsageType = typeof RoleUsageType.Type;

export const AttachedPolicy = Schema.StructWithRest(
  Schema.Struct({
    PolicyName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    PolicyArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "AttachedPolicy" });

export type AttachedPolicy = typeof AttachedPolicy.Type;

export const EntityType = Schema.Literals([
  "User",
  "Role",
  "Group",
  "LocalManagedPolicy",
  "AWSManagedPolicy",
]).annotate({ identifier: "EntityType" });

export type EntityType = typeof EntityType.Type;

export const PolicyUsageType = Schema.Literals([
  "PermissionsPolicy",
  "PermissionsBoundary",
]).annotate({ identifier: "PolicyUsageType" });

export type PolicyUsageType = typeof PolicyUsageType.Type;

export const PolicyGroup = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    GroupId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(16).annotate({
          expected: "a string with at least 16 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\w]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "PolicyGroup" });

export type PolicyGroup = typeof PolicyGroup.Type;

export const PolicyUser = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    UserId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(16).annotate({
          expected: "a string with at least 16 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\w]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "PolicyUser" });

export type PolicyUser = typeof PolicyUser.Type;

export const PolicyRole = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    RoleId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(16).annotate({
          expected: "a string with at least 16 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\w]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "PolicyRole" });

export type PolicyRole = typeof PolicyRole.Type;

export const MFADevice = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
    EnableDate: Schema.String.annotate({ format: "date-time" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "MFADevice" });

export type MFADevice = typeof MFADevice.Type;

export const AssignmentStatusType = Schema.Literals([
  "Assigned",
  "Unassigned",
  "Any",
]).annotate({ identifier: "assignmentStatusType" });

export type AssignmentStatusType = typeof AssignmentStatusType.Type;

export const AccessKey = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    AccessKeyId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
    Status: StatusType,
    SecretAccessKey: Schema.String.annotate({ format: "password" }),
    CreateDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "AccessKey" });

export type AccessKey = typeof AccessKey.Type;

export const AccessKeyMetadata = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    AccessKeyId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(16).annotate({
          expected: "a string with at least 16 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\w]+$",
          }),
        ),
    ),
    Status: Schema.optionalKey(StatusType),
    CreateDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "AccessKeyMetadata" });

export type AccessKeyMetadata = typeof AccessKeyMetadata.Type;

export const Policy = Schema.StructWithRest(
  Schema.Struct({
    PolicyName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    PolicyId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(16).annotate({
          expected: "a string with at least 16 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\w]+$",
          }),
        ),
    ),
    Arn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$",
          }),
        ),
    ),
    DefaultVersionId: Schema.optionalKey(
      Schema.String.check(
        Schema.isPattern(
          new globalThis.RegExp("^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$",
        }),
      ),
    ),
    AttachmentCount: Schema.optionalKey(Schema.Finite),
    PermissionsBoundaryUsageCount: Schema.optionalKey(Schema.Finite),
    IsAttachable: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Description: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
    ),
    CreateDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    UpdateDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Policy" });

export type Policy = typeof Policy.Type;

export const AttachedPermissionsBoundary = Schema.StructWithRest(
  Schema.Struct({
    PermissionsBoundaryType: Schema.optionalKey(
      PermissionsBoundaryAttachmentType,
    ),
    PermissionsBoundaryArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "AttachedPermissionsBoundary" });

export type AttachedPermissionsBoundary =
  typeof AttachedPermissionsBoundary.Type;

export const ServerCertificate = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateMetadata: ServerCertificateMetadata,
    CertificateBody: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(16384).annotate({
          expected: "a string with at most 16384 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
    CertificateChain: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(2097152).annotate({
            expected: "a string with at most 2097152 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ServerCertificate" });

export type ServerCertificate = typeof ServerCertificate.Type;

export const DeletionTaskFailureReasonType = Schema.StructWithRest(
  Schema.Struct({
    Reason: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
    ),
    RoleUsageList: Schema.optionalKey(Schema.Array(RoleUsageType)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "DeletionTaskFailureReasonType" });

export type DeletionTaskFailureReasonType =
  typeof DeletionTaskFailureReasonType.Type;

export const Role = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(512).annotate({
          expected: "a string with at most 512 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
        }),
      ),
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    RoleId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
    Arn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    CreateDate: Schema.String.annotate({ format: "date-time" }),
    AssumeRolePolicyDocument: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(131072).annotate({
            expected: "a string with at most 131072 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    Description: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1000).annotate({
            expected: "a string with at most 1000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
          }),
        ),
    ),
    MaxSessionDuration: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(3600).annotate({
          expected: "a value greater than or equal to 3600",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(43200).annotate({
          expected: "a value less than or equal to 43200",
        }),
      ),
    ),
    PermissionsBoundary: Schema.optionalKey(AttachedPermissionsBoundary),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
    RoleLastUsed: Schema.optionalKey(RoleLastUsed),
    SourceRoleTemplate: Schema.optionalKey(SourceRoleTemplate),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Role" });

export type Role = typeof Role.Type;

export const User = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(512).annotate({
          expected: "a string with at most 512 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
        }),
      ),
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    UserId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
    Arn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    CreateDate: Schema.String.annotate({ format: "date-time" }),
    PasswordLastUsed: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    PermissionsBoundary: Schema.optionalKey(AttachedPermissionsBoundary),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "User" });

export type User = typeof User.Type;

export const InstanceProfile = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(512).annotate({
          expected: "a string with at most 512 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
        }),
      ),
    InstanceProfileName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    InstanceProfileId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
    Arn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    CreateDate: Schema.String.annotate({ format: "date-time" }),
    Roles: Schema.Array(Role),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "InstanceProfile" });

export type InstanceProfile = typeof InstanceProfile.Type;

export const VirtualMFADevice = Schema.StructWithRest(
  Schema.Struct({
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
    Base32StringSeed: Schema.optionalKey(
      Schema.String.annotate({ contentEncoding: "byte" }),
    ),
    QRCodePNG: Schema.optionalKey(
      Schema.String.annotate({ contentEncoding: "byte" }),
    ),
    User: Schema.optionalKey(User),
    EnableDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "VirtualMFADevice" });

export type VirtualMFADevice = typeof VirtualMFADevice.Type;

export const AddClientIDToOpenIDConnectProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    OpenIDConnectProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    ClientID: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AddClientIDToOpenIDConnectProviderRequest =
  typeof AddClientIDToOpenIDConnectProviderRequest.Type;

export const ConcurrentModificationException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ConcurrentModificationException =
  typeof ConcurrentModificationException.Type;

export const InvalidInputException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidInputException = typeof InvalidInputException.Type;

export const LimitExceededException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type LimitExceededException = typeof LimitExceededException.Type;

export const NoSuchEntityException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type NoSuchEntityException = typeof NoSuchEntityException.Type;

export const ServiceFailureException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ServiceFailureException = typeof ServiceFailureException.Type;

export const AddRoleToInstanceProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    InstanceProfileName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AddRoleToInstanceProfileRequest =
  typeof AddRoleToInstanceProfileRequest.Type;

export const EntityAlreadyExistsException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type EntityAlreadyExistsException =
  typeof EntityAlreadyExistsException.Type;

export const UnmodifiableEntityException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UnmodifiableEntityException =
  typeof UnmodifiableEntityException.Type;

export const AddUserToGroupRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AddUserToGroupRequest = typeof AddUserToGroupRequest.Type;

export const AttachGroupPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AttachGroupPolicyRequest = typeof AttachGroupPolicyRequest.Type;

export const PolicyNotAttachableException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PolicyNotAttachableException =
  typeof PolicyNotAttachableException.Type;

export const AttachRolePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AttachRolePolicyRequest = typeof AttachRolePolicyRequest.Type;

export const AttachUserPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AttachUserPolicyRequest = typeof AttachUserPolicyRequest.Type;

export const CreateAccessKeyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateAccessKeyRequest = typeof CreateAccessKeyRequest.Type;

export const CreateAccessKeyResponse = Schema.StructWithRest(
  Schema.Struct({ AccessKey: AccessKey }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateAccessKeyResponse = typeof CreateAccessKeyResponse.Type;

export const CreateGroupRequest = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateGroupRequest = typeof CreateGroupRequest.Type;

export const CreateGroupResponse = Schema.StructWithRest(
  Schema.Struct({ Group: Group }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateGroupResponse = typeof CreateGroupResponse.Type;

export const CreateInstanceProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    InstanceProfileName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateInstanceProfileRequest =
  typeof CreateInstanceProfileRequest.Type;

export const CreateInstanceProfileResponse = Schema.StructWithRest(
  Schema.Struct({ InstanceProfile: InstanceProfile }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateInstanceProfileResponse =
  typeof CreateInstanceProfileResponse.Type;

export const CreateLoginProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    Password: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    PasswordResetRequired: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateLoginProfileRequest = typeof CreateLoginProfileRequest.Type;

export const CreateLoginProfileResponse = Schema.StructWithRest(
  Schema.Struct({ LoginProfile: LoginProfile }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateLoginProfileResponse = typeof CreateLoginProfileResponse.Type;

export const PasswordPolicyViolationException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PasswordPolicyViolationException =
  typeof PasswordPolicyViolationException.Type;

export const CreateOpenIDConnectProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    Url: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
    ClientIDList: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        ).check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        ),
      ),
    ),
    ThumbprintList: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(40).annotate({
            expected: "a string with at least 40 code points",
          }),
        ).check(
          Schema.isMaxCodePoints(40).annotate({
            expected: "a string with at most 40 code points",
          }),
        ),
      ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateOpenIDConnectProviderRequest =
  typeof CreateOpenIDConnectProviderRequest.Type;

export const CreateOpenIDConnectProviderResponse = Schema.StructWithRest(
  Schema.Struct({
    OpenIDConnectProviderArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateOpenIDConnectProviderResponse =
  typeof CreateOpenIDConnectProviderResponse.Type;

export const OpenIdIdpCommunicationErrorException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type OpenIdIdpCommunicationErrorException =
  typeof OpenIdIdpCommunicationErrorException.Type;

export const CreatePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$",
          }),
        ),
    ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
    Description: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreatePolicyRequest = typeof CreatePolicyRequest.Type;

export const CreatePolicyResponse = Schema.StructWithRest(
  Schema.Struct({ Policy: Schema.optionalKey(Policy) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreatePolicyResponse = typeof CreatePolicyResponse.Type;

export const MalformedPolicyDocumentException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type MalformedPolicyDocumentException =
  typeof MalformedPolicyDocumentException.Type;

export const CreatePolicyVersionRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
    SetAsDefault: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreatePolicyVersionRequest = typeof CreatePolicyVersionRequest.Type;

export const CreatePolicyVersionResponse = Schema.StructWithRest(
  Schema.Struct({ PolicyVersion: Schema.optionalKey(PolicyVersion) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreatePolicyVersionResponse =
  typeof CreatePolicyVersionResponse.Type;

export const CreateRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    AssumeRolePolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
    Description: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1000).annotate({
            expected: "a string with at most 1000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
          }),
        ),
    ),
    MaxSessionDuration: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(3600).annotate({
          expected: "a value greater than or equal to 3600",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(43200).annotate({
          expected: "a value less than or equal to 43200",
        }),
      ),
    ),
    PermissionsBoundary: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateRoleRequest = typeof CreateRoleRequest.Type;

export const CreateRoleResponse = Schema.StructWithRest(
  Schema.Struct({ Role: Role }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateRoleResponse = typeof CreateRoleResponse.Type;

export const CreateSAMLProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    SAMLMetadataDocument: Schema.String.check(
      Schema.isMinCodePoints(1000).annotate({
        expected: "a string with at least 1000 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(10000000).annotate({
        expected: "a string with at most 10000000 code points",
      }),
    ),
    Name: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w._-]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w._-]+$",
        }),
      ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
    AssertionEncryptionMode: Schema.optionalKey(AssertionEncryptionModeType),
    AddPrivateKey: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(16384).annotate({
            expected: "a string with at most 16384 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateSAMLProviderRequest = typeof CreateSAMLProviderRequest.Type;

export const CreateSAMLProviderResponse = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateSAMLProviderResponse = typeof CreateSAMLProviderResponse.Type;

export const CreateServiceLinkedRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    AWSServiceName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Description: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1000).annotate({
            expected: "a string with at most 1000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
          }),
        ),
    ),
    CustomSuffix: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateServiceLinkedRoleRequest =
  typeof CreateServiceLinkedRoleRequest.Type;

export const CreateServiceLinkedRoleResponse = Schema.StructWithRest(
  Schema.Struct({ Role: Schema.optionalKey(Role) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateServiceLinkedRoleResponse =
  typeof CreateServiceLinkedRoleResponse.Type;

export const CreateUserRequest = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PermissionsBoundary: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateUserRequest = typeof CreateUserRequest.Type;

export const CreateUserResponse = Schema.StructWithRest(
  Schema.Struct({ User: Schema.optionalKey(User) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateUserResponse = typeof CreateUserResponse.Type;

export const CreateVirtualMFADeviceRequest = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    VirtualMFADeviceName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate({
        expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
      }),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateVirtualMFADeviceRequest =
  typeof CreateVirtualMFADeviceRequest.Type;

export const CreateVirtualMFADeviceResponse = Schema.StructWithRest(
  Schema.Struct({ VirtualMFADevice: VirtualMFADevice }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateVirtualMFADeviceResponse =
  typeof CreateVirtualMFADeviceResponse.Type;

export const DeactivateMFADeviceRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeactivateMFADeviceRequest = typeof DeactivateMFADeviceRequest.Type;

export const EntityTemporarilyUnmodifiableException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type EntityTemporarilyUnmodifiableException =
  typeof EntityTemporarilyUnmodifiableException.Type;

export const DeleteAccessKeyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    AccessKeyId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteAccessKeyRequest = typeof DeleteAccessKeyRequest.Type;

export const DeleteGroupRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteGroupRequest = typeof DeleteGroupRequest.Type;

export const DeleteConflictException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteConflictException = typeof DeleteConflictException.Type;

export const DeleteGroupPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteGroupPolicyRequest = typeof DeleteGroupPolicyRequest.Type;

export const DeleteInstanceProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    InstanceProfileName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteInstanceProfileRequest =
  typeof DeleteInstanceProfileRequest.Type;

export const DeleteLoginProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteLoginProfileRequest = typeof DeleteLoginProfileRequest.Type;

export const DeleteOpenIDConnectProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    OpenIDConnectProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteOpenIDConnectProviderRequest =
  typeof DeleteOpenIDConnectProviderRequest.Type;

export const DeletePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeletePolicyRequest = typeof DeletePolicyRequest.Type;

export const DeletePolicyVersionRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    VersionId: Schema.String.check(
      Schema.isPattern(
        new globalThis.RegExp("^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeletePolicyVersionRequest = typeof DeletePolicyVersionRequest.Type;

export const DeleteRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteRoleRequest = typeof DeleteRoleRequest.Type;

export const DeleteRolePermissionsBoundaryRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteRolePermissionsBoundaryRequest =
  typeof DeleteRolePermissionsBoundaryRequest.Type;

export const DeleteRolePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteRolePolicyRequest = typeof DeleteRolePolicyRequest.Type;

export const DeleteSAMLProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteSAMLProviderRequest = typeof DeleteSAMLProviderRequest.Type;

export const DeleteServerCertificateRequest = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteServerCertificateRequest =
  typeof DeleteServerCertificateRequest.Type;

export const DeleteServiceLinkedRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteServiceLinkedRoleRequest =
  typeof DeleteServiceLinkedRoleRequest.Type;

export const DeleteServiceLinkedRoleResponse = Schema.StructWithRest(
  Schema.Struct({
    DeletionTaskId: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(1000).annotate({
        expected: "a string with at most 1000 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteServiceLinkedRoleResponse =
  typeof DeleteServiceLinkedRoleResponse.Type;

export const DeleteUserRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteUserRequest = typeof DeleteUserRequest.Type;

export const DeleteUserPermissionsBoundaryRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteUserPermissionsBoundaryRequest =
  typeof DeleteUserPermissionsBoundaryRequest.Type;

export const DeleteUserPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteUserPolicyRequest = typeof DeleteUserPolicyRequest.Type;

export const DeleteVirtualMFADeviceRequest = Schema.StructWithRest(
  Schema.Struct({
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteVirtualMFADeviceRequest =
  typeof DeleteVirtualMFADeviceRequest.Type;

export const DetachGroupPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DetachGroupPolicyRequest = typeof DetachGroupPolicyRequest.Type;

export const DetachRolePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DetachRolePolicyRequest = typeof DetachRolePolicyRequest.Type;

export const DetachUserPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DetachUserPolicyRequest = typeof DetachUserPolicyRequest.Type;

export const EnableMFADeviceRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
    AuthenticationCode1: Schema.String.check(
      Schema.isMinCodePoints(6).annotate({
        expected: "a string with at least 6 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(6).annotate({
          expected: "a string with at most 6 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\d]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\d]+$",
        }),
      ),
    AuthenticationCode2: Schema.String.check(
      Schema.isMinCodePoints(6).annotate({
        expected: "a string with at least 6 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(6).annotate({
          expected: "a string with at most 6 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\d]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\d]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type EnableMFADeviceRequest = typeof EnableMFADeviceRequest.Type;

export const InvalidAuthenticationCodeException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidAuthenticationCodeException =
  typeof InvalidAuthenticationCodeException.Type;

export const GetGroupRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetGroupRequest = typeof GetGroupRequest.Type;

export const GetGroupResponse = Schema.StructWithRest(
  Schema.Struct({
    Group: Group,
    Users: Schema.Array(User),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetGroupResponse = typeof GetGroupResponse.Type;

export const GetGroupPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetGroupPolicyRequest = typeof GetGroupPolicyRequest.Type;

export const GetGroupPolicyResponse = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetGroupPolicyResponse = typeof GetGroupPolicyResponse.Type;

export const GetInstanceProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    InstanceProfileName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetInstanceProfileRequest = typeof GetInstanceProfileRequest.Type;

export const GetInstanceProfileResponse = Schema.StructWithRest(
  Schema.Struct({ InstanceProfile: InstanceProfile }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetInstanceProfileResponse = typeof GetInstanceProfileResponse.Type;

export const GetLoginProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetLoginProfileRequest = typeof GetLoginProfileRequest.Type;

export const GetLoginProfileResponse = Schema.StructWithRest(
  Schema.Struct({ LoginProfile: LoginProfile }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetLoginProfileResponse = typeof GetLoginProfileResponse.Type;

export const GetOpenIDConnectProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    OpenIDConnectProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetOpenIDConnectProviderRequest =
  typeof GetOpenIDConnectProviderRequest.Type;

export const GetOpenIDConnectProviderResponse = Schema.StructWithRest(
  Schema.Struct({
    Url: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(255).annotate({
          expected: "a string with at most 255 code points",
        }),
      ),
    ),
    ClientIDList: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        ).check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        ),
      ),
    ),
    ThumbprintList: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(40).annotate({
            expected: "a string with at least 40 code points",
          }),
        ).check(
          Schema.isMaxCodePoints(40).annotate({
            expected: "a string with at most 40 code points",
          }),
        ),
      ),
    ),
    CreateDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetOpenIDConnectProviderResponse =
  typeof GetOpenIDConnectProviderResponse.Type;

export const GetPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetPolicyRequest = typeof GetPolicyRequest.Type;

export const GetPolicyResponse = Schema.StructWithRest(
  Schema.Struct({ Policy: Schema.optionalKey(Policy) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetPolicyResponse = typeof GetPolicyResponse.Type;

export const GetPolicyVersionRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    VersionId: Schema.String.check(
      Schema.isPattern(
        new globalThis.RegExp("^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetPolicyVersionRequest = typeof GetPolicyVersionRequest.Type;

export const GetPolicyVersionResponse = Schema.StructWithRest(
  Schema.Struct({ PolicyVersion: Schema.optionalKey(PolicyVersion) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetPolicyVersionResponse = typeof GetPolicyVersionResponse.Type;

export const GetRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRoleRequest = typeof GetRoleRequest.Type;

export const GetRoleResponse = Schema.StructWithRest(
  Schema.Struct({ Role: Role }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRoleResponse = typeof GetRoleResponse.Type;

export const GetRolePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRolePolicyRequest = typeof GetRolePolicyRequest.Type;

export const GetRolePolicyResponse = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRolePolicyResponse = typeof GetRolePolicyResponse.Type;

export const GetSAMLProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetSAMLProviderRequest = typeof GetSAMLProviderRequest.Type;

export const GetSAMLProviderResponse = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderUUID: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(22).annotate({
          expected: "a string with at least 22 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[A-Z0-9]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[A-Z0-9]+$",
          }),
        ),
    ),
    SAMLMetadataDocument: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(1000).annotate({
          expected: "a string with at least 1000 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(10000000).annotate({
          expected: "a string with at most 10000000 code points",
        }),
      ),
    ),
    CreateDate: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    ValidUntil: Schema.optionalKey(
      Schema.String.annotate({ format: "date-time" }),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
    AssertionEncryptionMode: Schema.optionalKey(AssertionEncryptionModeType),
    PrivateKeyList: Schema.optionalKey(
      Schema.Array(SAMLPrivateKey)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(2).annotate({
            expected: "a value with a length of at most 2",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetSAMLProviderResponse = typeof GetSAMLProviderResponse.Type;

export const GetServerCertificateRequest = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetServerCertificateRequest =
  typeof GetServerCertificateRequest.Type;

export const GetServerCertificateResponse = Schema.StructWithRest(
  Schema.Struct({ ServerCertificate: ServerCertificate }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetServerCertificateResponse =
  typeof GetServerCertificateResponse.Type;

export const GetServiceLinkedRoleDeletionStatusRequest = Schema.StructWithRest(
  Schema.Struct({
    DeletionTaskId: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(1000).annotate({
        expected: "a string with at most 1000 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetServiceLinkedRoleDeletionStatusRequest =
  typeof GetServiceLinkedRoleDeletionStatusRequest.Type;

export const GetServiceLinkedRoleDeletionStatusResponse = Schema.StructWithRest(
  Schema.Struct({
    Status: DeletionTaskStatusType,
    Reason: Schema.optionalKey(DeletionTaskFailureReasonType),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetServiceLinkedRoleDeletionStatusResponse =
  typeof GetServiceLinkedRoleDeletionStatusResponse.Type;

export const GetUserRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetUserRequest = typeof GetUserRequest.Type;

export const GetUserResponse = Schema.StructWithRest(
  Schema.Struct({ User: User }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetUserResponse = typeof GetUserResponse.Type;

export const GetUserPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetUserPolicyRequest = typeof GetUserPolicyRequest.Type;

export const GetUserPolicyResponse = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetUserPolicyResponse = typeof GetUserPolicyResponse.Type;

export const ListAccessKeysRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAccessKeysRequest = typeof ListAccessKeysRequest.Type;

export const ListAccessKeysResponse = Schema.StructWithRest(
  Schema.Struct({
    AccessKeyMetadata: Schema.Array(AccessKeyMetadata),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAccessKeysResponse = typeof ListAccessKeysResponse.Type;

export const ListAttachedGroupPoliciesRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PathPrefix: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$",
          }),
        ),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAttachedGroupPoliciesRequest =
  typeof ListAttachedGroupPoliciesRequest.Type;

export const ListAttachedGroupPoliciesResponse = Schema.StructWithRest(
  Schema.Struct({
    AttachedPolicies: Schema.optionalKey(Schema.Array(AttachedPolicy)),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAttachedGroupPoliciesResponse =
  typeof ListAttachedGroupPoliciesResponse.Type;

export const ListAttachedRolePoliciesRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PathPrefix: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$",
          }),
        ),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAttachedRolePoliciesRequest =
  typeof ListAttachedRolePoliciesRequest.Type;

export const ListAttachedRolePoliciesResponse = Schema.StructWithRest(
  Schema.Struct({
    AttachedPolicies: Schema.optionalKey(Schema.Array(AttachedPolicy)),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAttachedRolePoliciesResponse =
  typeof ListAttachedRolePoliciesResponse.Type;

export const ListAttachedUserPoliciesRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PathPrefix: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^((\\/[A-Za-z0-9\\.,\\+@=_-]+)*)\\/$",
          }),
        ),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAttachedUserPoliciesRequest =
  typeof ListAttachedUserPoliciesRequest.Type;

export const ListAttachedUserPoliciesResponse = Schema.StructWithRest(
  Schema.Struct({
    AttachedPolicies: Schema.optionalKey(Schema.Array(AttachedPolicy)),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListAttachedUserPoliciesResponse =
  typeof ListAttachedUserPoliciesResponse.Type;

export const ListEntitiesForPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    EntityFilter: Schema.optionalKey(EntityType),
    PathPrefix: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    PolicyUsageFilter: Schema.optionalKey(PolicyUsageType),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListEntitiesForPolicyRequest =
  typeof ListEntitiesForPolicyRequest.Type;

export const ListEntitiesForPolicyResponse = Schema.StructWithRest(
  Schema.Struct({
    PolicyGroups: Schema.optionalKey(Schema.Array(PolicyGroup)),
    PolicyUsers: Schema.optionalKey(Schema.Array(PolicyUser)),
    PolicyRoles: Schema.optionalKey(Schema.Array(PolicyRole)),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListEntitiesForPolicyResponse =
  typeof ListEntitiesForPolicyResponse.Type;

export const ListGroupPoliciesRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListGroupPoliciesRequest = typeof ListGroupPoliciesRequest.Type;

export const ListGroupPoliciesResponse = Schema.StructWithRest(
  Schema.Struct({
    PolicyNames: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListGroupPoliciesResponse = typeof ListGroupPoliciesResponse.Type;

export const ListGroupsForUserRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListGroupsForUserRequest = typeof ListGroupsForUserRequest.Type;

export const ListGroupsForUserResponse = Schema.StructWithRest(
  Schema.Struct({
    Groups: Schema.Array(Group),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListGroupsForUserResponse = typeof ListGroupsForUserResponse.Type;

export const ListMFADeviceTagsRequest = Schema.StructWithRest(
  Schema.Struct({
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListMFADeviceTagsRequest = typeof ListMFADeviceTagsRequest.Type;

export const ListMFADeviceTagsResponse = Schema.StructWithRest(
  Schema.Struct({
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListMFADeviceTagsResponse = typeof ListMFADeviceTagsResponse.Type;

export const ListMFADevicesRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListMFADevicesRequest = typeof ListMFADevicesRequest.Type;

export const ListMFADevicesResponse = Schema.StructWithRest(
  Schema.Struct({
    MFADevices: Schema.Array(MFADevice),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListMFADevicesResponse = typeof ListMFADevicesResponse.Type;

export const ListOpenIDConnectProviderTagsRequest = Schema.StructWithRest(
  Schema.Struct({
    OpenIDConnectProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListOpenIDConnectProviderTagsRequest =
  typeof ListOpenIDConnectProviderTagsRequest.Type;

export const ListOpenIDConnectProviderTagsResponse = Schema.StructWithRest(
  Schema.Struct({
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListOpenIDConnectProviderTagsResponse =
  typeof ListOpenIDConnectProviderTagsResponse.Type;

export const ListPolicyVersionsRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListPolicyVersionsRequest = typeof ListPolicyVersionsRequest.Type;

export const ListPolicyVersionsResponse = Schema.StructWithRest(
  Schema.Struct({
    Versions: Schema.optionalKey(Schema.Array(PolicyVersion)),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListPolicyVersionsResponse = typeof ListPolicyVersionsResponse.Type;

export const ListRolePoliciesRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListRolePoliciesRequest = typeof ListRolePoliciesRequest.Type;

export const ListRolePoliciesResponse = Schema.StructWithRest(
  Schema.Struct({
    PolicyNames: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListRolePoliciesResponse = typeof ListRolePoliciesResponse.Type;

export const ListSAMLProviderTagsRequest = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListSAMLProviderTagsRequest =
  typeof ListSAMLProviderTagsRequest.Type;

export const ListSAMLProviderTagsResponse = Schema.StructWithRest(
  Schema.Struct({
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListSAMLProviderTagsResponse =
  typeof ListSAMLProviderTagsResponse.Type;

export const ListServerCertificateTagsRequest = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListServerCertificateTagsRequest =
  typeof ListServerCertificateTagsRequest.Type;

export const ListServerCertificateTagsResponse = Schema.StructWithRest(
  Schema.Struct({
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListServerCertificateTagsResponse =
  typeof ListServerCertificateTagsResponse.Type;

export const ListUserPoliciesRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListUserPoliciesRequest = typeof ListUserPoliciesRequest.Type;

export const ListUserPoliciesResponse = Schema.StructWithRest(
  Schema.Struct({
    PolicyNames: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListUserPoliciesResponse = typeof ListUserPoliciesResponse.Type;

export const ListUserTagsRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListUserTagsRequest = typeof ListUserTagsRequest.Type;

export const ListUserTagsResponse = Schema.StructWithRest(
  Schema.Struct({
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListUserTagsResponse = typeof ListUserTagsResponse.Type;

export const ListVirtualMFADevicesRequest = Schema.StructWithRest(
  Schema.Struct({
    AssignmentStatus: Schema.optionalKey(AssignmentStatusType),
    Marker: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(320).annotate({
            expected: "a string with at most 320 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\u0020-\\u00FF]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    MaxItems: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(1000).annotate({
          expected: "a value less than or equal to 1000",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListVirtualMFADevicesRequest =
  typeof ListVirtualMFADevicesRequest.Type;

export const ListVirtualMFADevicesResponse = Schema.StructWithRest(
  Schema.Struct({
    VirtualMFADevices: Schema.Array(VirtualMFADevice),
    IsTruncated: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    Marker: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListVirtualMFADevicesResponse =
  typeof ListVirtualMFADevicesResponse.Type;

export const PutGroupPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PutGroupPolicyRequest = typeof PutGroupPolicyRequest.Type;

export const PutRolePermissionsBoundaryRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PermissionsBoundary: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PutRolePermissionsBoundaryRequest =
  typeof PutRolePermissionsBoundaryRequest.Type;

export const PutRolePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PutRolePolicyRequest = typeof PutRolePolicyRequest.Type;

export const PutUserPermissionsBoundaryRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PermissionsBoundary: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PutUserPermissionsBoundaryRequest =
  typeof PutUserPermissionsBoundaryRequest.Type;

export const PutUserPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PutUserPolicyRequest = typeof PutUserPolicyRequest.Type;

export const RemoveClientIDFromOpenIDConnectProviderRequest =
  Schema.StructWithRest(
    Schema.Struct({
      OpenIDConnectProviderArn: Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
      ClientID: Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(255).annotate({
          expected: "a string with at most 255 code points",
        }),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  );

export type RemoveClientIDFromOpenIDConnectProviderRequest =
  typeof RemoveClientIDFromOpenIDConnectProviderRequest.Type;

export const RemoveRoleFromInstanceProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    InstanceProfileName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type RemoveRoleFromInstanceProfileRequest =
  typeof RemoveRoleFromInstanceProfileRequest.Type;

export const RemoveUserFromGroupRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type RemoveUserFromGroupRequest = typeof RemoveUserFromGroupRequest.Type;

export const SetDefaultPolicyVersionRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    VersionId: Schema.String.check(
      Schema.isPattern(
        new globalThis.RegExp("^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^v[1-9][0-9]*(\\.[A-Za-z0-9-]*)?$",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type SetDefaultPolicyVersionRequest =
  typeof SetDefaultPolicyVersionRequest.Type;

export const TagMFADeviceRequest = Schema.StructWithRest(
  Schema.Struct({
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagMFADeviceRequest = typeof TagMFADeviceRequest.Type;

export const TagOpenIDConnectProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    OpenIDConnectProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagOpenIDConnectProviderRequest =
  typeof TagOpenIDConnectProviderRequest.Type;

export const TagPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagPolicyRequest = typeof TagPolicyRequest.Type;

export const TagRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagRoleRequest = typeof TagRoleRequest.Type;

export const TagSAMLProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagSAMLProviderRequest = typeof TagSAMLProviderRequest.Type;

export const TagServerCertificateRequest = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagServerCertificateRequest =
  typeof TagServerCertificateRequest.Type;

export const TagUserRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Tags: Schema.Array(Tag)
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TagUserRequest = typeof TagUserRequest.Type;

export const UntagMFADeviceRequest = Schema.StructWithRest(
  Schema.Struct({
    SerialNumber: Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=/:,.@-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=/:,.@-]+$",
        }),
      ),
    TagKeys: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
          }),
        ),
    )
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagMFADeviceRequest = typeof UntagMFADeviceRequest.Type;

export const UntagOpenIDConnectProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    OpenIDConnectProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    TagKeys: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
          }),
        ),
    )
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagOpenIDConnectProviderRequest =
  typeof UntagOpenIDConnectProviderRequest.Type;

export const UntagPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    PolicyArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    TagKeys: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
          }),
        ),
    )
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagPolicyRequest = typeof UntagPolicyRequest.Type;

export const UntagRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    TagKeys: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
          }),
        ),
    )
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagRoleRequest = typeof UntagRoleRequest.Type;

export const UntagSAMLProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    TagKeys: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
          }),
        ),
    )
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagSAMLProviderRequest = typeof UntagSAMLProviderRequest.Type;

export const UntagServerCertificateRequest = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    TagKeys: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
          }),
        ),
    )
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagServerCertificateRequest =
  typeof UntagServerCertificateRequest.Type;

export const UntagUserRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    TagKeys: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]+$",
          }),
        ),
    )
      .check(
        Schema.isMinLength(0).annotate({
          expected: "a value with a length of at least 0",
        }),
      )
      .check(
        Schema.isMaxLength(50).annotate({
          expected: "a value with a length of at most 50",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UntagUserRequest = typeof UntagUserRequest.Type;

export const UpdateAccessKeyRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
    AccessKeyId: Schema.String.check(
      Schema.isMinCodePoints(16).annotate({
        expected: "a string with at least 16 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]+$",
        }),
      ),
    Status: StatusType,
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateAccessKeyRequest = typeof UpdateAccessKeyRequest.Type;

export const UpdateAssumeRolePolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    PolicyDocument: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateAssumeRolePolicyRequest =
  typeof UpdateAssumeRolePolicyRequest.Type;

export const UpdateGroupRequest = Schema.StructWithRest(
  Schema.Struct({
    GroupName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    NewPath: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    NewGroupName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateGroupRequest = typeof UpdateGroupRequest.Type;

export const UpdateLoginProfileRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Password: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    PasswordResetRequired: Schema.optionalKey(Schema.Boolean),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateLoginProfileRequest = typeof UpdateLoginProfileRequest.Type;

export const UpdateOpenIDConnectProviderThumbprintRequest =
  Schema.StructWithRest(
    Schema.Struct({
      OpenIDConnectProviderArn: Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
      ThumbprintList: Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(40).annotate({
            expected: "a string with at least 40 code points",
          }),
        ).check(
          Schema.isMaxCodePoints(40).annotate({
            expected: "a string with at most 40 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  );

export type UpdateOpenIDConnectProviderThumbprintRequest =
  typeof UpdateOpenIDConnectProviderThumbprintRequest.Type;

export const UpdateRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    Description: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1000).annotate({
            expected: "a string with at most 1000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]*$",
          }),
        ),
    ),
    MaxSessionDuration: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(3600).annotate({
          expected: "a value greater than or equal to 3600",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(43200).annotate({
          expected: "a value less than or equal to 43200",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateRoleRequest = typeof UpdateRoleRequest.Type;

export const UpdateRoleResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
);

export type UpdateRoleResponse = typeof UpdateRoleResponse.Type;

export const UpdateSAMLProviderRequest = Schema.StructWithRest(
  Schema.Struct({
    SAMLMetadataDocument: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(1000).annotate({
          expected: "a string with at least 1000 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(10000000).annotate({
          expected: "a string with at most 10000000 code points",
        }),
      ),
    ),
    SAMLProviderArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
    AssertionEncryptionMode: Schema.optionalKey(AssertionEncryptionModeType),
    AddPrivateKey: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(16384).annotate({
            expected: "a string with at most 16384 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    RemovePrivateKey: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(22).annotate({
          expected: "a string with at least 22 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[A-Z0-9]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[A-Z0-9]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateSAMLProviderRequest = typeof UpdateSAMLProviderRequest.Type;

export const UpdateSAMLProviderResponse = Schema.StructWithRest(
  Schema.Struct({
    SAMLProviderArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateSAMLProviderResponse = typeof UpdateSAMLProviderResponse.Type;

export const UpdateServerCertificateRequest = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    NewPath: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    NewServerCertificateName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateServerCertificateRequest =
  typeof UpdateServerCertificateRequest.Type;

export const UpdateUserRequest = Schema.StructWithRest(
  Schema.Struct({
    UserName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    NewPath: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    NewUserName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]+$",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateUserRequest = typeof UpdateUserRequest.Type;

export const UploadServerCertificateRequest = Schema.StructWithRest(
  Schema.Struct({
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(\\u002F)|(\\u002F[\\u0021-\\u007E]+\\u002F)$",
          }),
        ),
    ),
    ServerCertificateName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]+$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]+$" },
        ),
      ),
    CertificateBody: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(16384).annotate({
          expected: "a string with at most 16384 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
    PrivateKey: Schema.String.annotate({ format: "password" })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(16384).annotate({
          expected: "a string with at most 16384 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
        }),
      ),
    CertificateChain: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(2097152).annotate({
            expected: "a string with at most 2097152 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$",
          }),
        ),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UploadServerCertificateRequest =
  typeof UploadServerCertificateRequest.Type;

export const UploadServerCertificateResponse = Schema.StructWithRest(
  Schema.Struct({
    ServerCertificateMetadata: Schema.optionalKey(ServerCertificateMetadata),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(50).annotate({
            expected: "a value with a length of at most 50",
          }),
        ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UploadServerCertificateResponse =
  typeof UploadServerCertificateResponse.Type;

export const KeyPairMismatchException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KeyPairMismatchException = typeof KeyPairMismatchException.Type;

export const MalformedCertificateException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type MalformedCertificateException =
  typeof MalformedCertificateException.Type;

export const iamErrors = {
  ConcurrentModificationException: {
    name: "ConcurrentModificationException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "ConcurrentModification",
    schema: ConcurrentModificationException,
  },
  InvalidInputException: {
    name: "InvalidInputException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "InvalidInput",
    schema: InvalidInputException,
  },
  LimitExceededException: {
    name: "LimitExceededException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "LimitExceeded",
    schema: LimitExceededException,
  },
  NoSuchEntityException: {
    name: "NoSuchEntityException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    code: "NoSuchEntity",
    schema: NoSuchEntityException,
  },
  ServiceFailureException: {
    name: "ServiceFailureException",
    fault: "server",
    httpStatus: 500,
    retryable: null,
    code: "ServiceFailure",
    schema: ServiceFailureException,
  },
  EntityAlreadyExistsException: {
    name: "EntityAlreadyExistsException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "EntityAlreadyExists",
    schema: EntityAlreadyExistsException,
  },
  UnmodifiableEntityException: {
    name: "UnmodifiableEntityException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "UnmodifiableEntity",
    schema: UnmodifiableEntityException,
  },
  PolicyNotAttachableException: {
    name: "PolicyNotAttachableException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "PolicyNotAttachable",
    schema: PolicyNotAttachableException,
  },
  PasswordPolicyViolationException: {
    name: "PasswordPolicyViolationException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "PasswordPolicyViolation",
    schema: PasswordPolicyViolationException,
  },
  OpenIdIdpCommunicationErrorException: {
    name: "OpenIdIdpCommunicationErrorException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "OpenIdIdpCommunicationError",
    schema: OpenIdIdpCommunicationErrorException,
  },
  MalformedPolicyDocumentException: {
    name: "MalformedPolicyDocumentException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "MalformedPolicyDocument",
    schema: MalformedPolicyDocumentException,
  },
  EntityTemporarilyUnmodifiableException: {
    name: "EntityTemporarilyUnmodifiableException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "EntityTemporarilyUnmodifiable",
    schema: EntityTemporarilyUnmodifiableException,
  },
  DeleteConflictException: {
    name: "DeleteConflictException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "DeleteConflict",
    schema: DeleteConflictException,
  },
  InvalidAuthenticationCodeException: {
    name: "InvalidAuthenticationCodeException",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "InvalidAuthenticationCode",
    schema: InvalidAuthenticationCodeException,
  },
  KeyPairMismatchException: {
    name: "KeyPairMismatchException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "KeyPairMismatch",
    schema: KeyPairMismatchException,
  },
  MalformedCertificateException: {
    name: "MalformedCertificateException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "MalformedCertificate",
    schema: MalformedCertificateException,
  },
};

export const addClientIDToOpenIDConnectProviderErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const addRoleToInstanceProfileErrors = [
  iamErrors.EntityAlreadyExistsException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const addUserToGroupErrors = [
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const attachGroupPolicyErrors = [
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.PolicyNotAttachableException,
  iamErrors.ServiceFailureException,
];

export const attachRolePolicyErrors = [
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.PolicyNotAttachableException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const createGroupErrors = [
  iamErrors.EntityAlreadyExistsException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const createInstanceProfileErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.ServiceFailureException,
];

export const createLoginProfileErrors = [
  iamErrors.EntityAlreadyExistsException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.PasswordPolicyViolationException,
  iamErrors.ServiceFailureException,
];

export const createOpenIDConnectProviderErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.OpenIdIdpCommunicationErrorException,
  iamErrors.ServiceFailureException,
];

export const createPolicyErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.MalformedPolicyDocumentException,
  iamErrors.ServiceFailureException,
];

export const createPolicyVersionErrors = [
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.MalformedPolicyDocumentException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const createServiceLinkedRoleErrors = [
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const createUserErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const deactivateMFADeviceErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityTemporarilyUnmodifiableException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const deleteGroupErrors = [
  iamErrors.DeleteConflictException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const deleteLoginProfileErrors = [
  iamErrors.EntityTemporarilyUnmodifiableException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const deleteOpenIDConnectProviderErrors = [
  iamErrors.InvalidInputException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const deletePolicyErrors = [
  iamErrors.DeleteConflictException,
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const deleteRoleErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.DeleteConflictException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const deleteRolePermissionsBoundaryErrors = [
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const deleteRolePolicyErrors = [
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const deleteUserErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.DeleteConflictException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const deleteUserPermissionsBoundaryErrors = [
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const detachRolePolicyErrors = [
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const enableMFADeviceErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.EntityTemporarilyUnmodifiableException,
  iamErrors.InvalidAuthenticationCodeException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const listVirtualMFADevicesErrors = [];

export const putGroupPolicyErrors = [
  iamErrors.LimitExceededException,
  iamErrors.MalformedPolicyDocumentException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const putRolePermissionsBoundaryErrors = [
  iamErrors.InvalidInputException,
  iamErrors.NoSuchEntityException,
  iamErrors.PolicyNotAttachableException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const putRolePolicyErrors = [
  iamErrors.LimitExceededException,
  iamErrors.MalformedPolicyDocumentException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const putUserPermissionsBoundaryErrors = [
  iamErrors.InvalidInputException,
  iamErrors.NoSuchEntityException,
  iamErrors.PolicyNotAttachableException,
  iamErrors.ServiceFailureException,
];

export const removeClientIDFromOpenIDConnectProviderErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.InvalidInputException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const untagRoleErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const updateLoginProfileErrors = [
  iamErrors.EntityTemporarilyUnmodifiableException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.PasswordPolicyViolationException,
  iamErrors.ServiceFailureException,
];

export const updateUserErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.EntityTemporarilyUnmodifiableException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const uploadServerCertificateErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.InvalidInputException,
  iamErrors.KeyPairMismatchException,
  iamErrors.LimitExceededException,
  iamErrors.MalformedCertificateException,
  iamErrors.ServiceFailureException,
];

export const AddClientIDToOpenIDConnectProviderOutput = Schema.Void;

export const addClientIDToOpenIDConnectProviderOperation: AwsQueryOperation & {
  readonly input: typeof AddClientIDToOpenIDConnectProviderRequest;
  readonly output: typeof AddClientIDToOpenIDConnectProviderOutput;
} = {
  name: "AddClientIDToOpenIDConnectProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#AddClientIDToOpenIDConnectProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#AddClientIDToOpenIDConnectProviderRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          ClientID: {
            target: "com.amazonaws.iam#clientIDType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#clientIDType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AddClientIDToOpenIDConnectProviderRequest,
  output: AddClientIDToOpenIDConnectProviderOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const AddRoleToInstanceProfileOutput = Schema.Void;

export const addRoleToInstanceProfileOperation: AwsQueryOperation & {
  readonly input: typeof AddRoleToInstanceProfileRequest;
  readonly output: typeof AddRoleToInstanceProfileOutput;
} = {
  name: "AddRoleToInstanceProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#AddRoleToInstanceProfileRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#AddRoleToInstanceProfileRequest": {
        type: "structure",
        members: {
          InstanceProfileName: {
            target: "com.amazonaws.iam#instanceProfileNameType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#instanceProfileNameType": {
        type: "string",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AddRoleToInstanceProfileRequest,
  output: AddRoleToInstanceProfileOutput,
  errors: addRoleToInstanceProfileErrors,
};

export const AddUserToGroupOutput = Schema.Void;

export const addUserToGroupOperation: AwsQueryOperation & {
  readonly input: typeof AddUserToGroupRequest;
  readonly output: typeof AddUserToGroupOutput;
} = {
  name: "AddUserToGroup",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#AddUserToGroupRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#AddUserToGroupRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AddUserToGroupRequest,
  output: AddUserToGroupOutput,
  errors: addUserToGroupErrors,
};

export const AttachGroupPolicyOutput = Schema.Void;

export const attachGroupPolicyOperation: AwsQueryOperation & {
  readonly input: typeof AttachGroupPolicyRequest;
  readonly output: typeof AttachGroupPolicyOutput;
} = {
  name: "AttachGroupPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#AttachGroupPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#AttachGroupPolicyRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AttachGroupPolicyRequest,
  output: AttachGroupPolicyOutput,
  errors: attachGroupPolicyErrors,
};

export const AttachRolePolicyOutput = Schema.Void;

export const attachRolePolicyOperation: AwsQueryOperation & {
  readonly input: typeof AttachRolePolicyRequest;
  readonly output: typeof AttachRolePolicyOutput;
} = {
  name: "AttachRolePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#AttachRolePolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#AttachRolePolicyRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AttachRolePolicyRequest,
  output: AttachRolePolicyOutput,
  errors: attachRolePolicyErrors,
};

export const AttachUserPolicyOutput = Schema.Void;

export const attachUserPolicyOperation: AwsQueryOperation & {
  readonly input: typeof AttachUserPolicyRequest;
  readonly output: typeof AttachUserPolicyOutput;
} = {
  name: "AttachUserPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#AttachUserPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#AttachUserPolicyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AttachUserPolicyRequest,
  output: AttachUserPolicyOutput,
  errors: attachGroupPolicyErrors,
};

export const createAccessKeyOperation: AwsQueryOperation & {
  readonly input: typeof CreateAccessKeyRequest;
  readonly output: typeof CreateAccessKeyResponse;
} = {
  name: "CreateAccessKey",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateAccessKeyRequest",
    output: "com.amazonaws.iam#CreateAccessKeyResponse",
    shapes: {
      "com.amazonaws.iam#CreateAccessKeyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
        },
      },
      "com.amazonaws.iam#CreateAccessKeyResponse": {
        type: "structure",
        members: {
          AccessKey: {
            target: "com.amazonaws.iam#AccessKey",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#AccessKey": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          AccessKeyId: {
            target: "com.amazonaws.iam#accessKeyIdType",
          },
          Status: {
            target: "com.amazonaws.iam#statusType",
          },
          SecretAccessKey: {
            target: "com.amazonaws.iam#accessKeySecretType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#accessKeyIdType": {
        type: "string",
      },
      "com.amazonaws.iam#statusType": {
        type: "string",
      },
      "com.amazonaws.iam#accessKeySecretType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateAccessKeyRequest,
  output: CreateAccessKeyResponse,
  errors: addUserToGroupErrors,
};

export const createGroupOperation: AwsQueryOperation & {
  readonly input: typeof CreateGroupRequest;
  readonly output: typeof CreateGroupResponse;
} = {
  name: "CreateGroup",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateGroupRequest",
    output: "com.amazonaws.iam#CreateGroupResponse",
    shapes: {
      "com.amazonaws.iam#CreateGroupRequest": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
        },
      },
      "com.amazonaws.iam#CreateGroupResponse": {
        type: "structure",
        members: {
          Group: {
            target: "com.amazonaws.iam#Group",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#Group": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          GroupId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateGroupRequest,
  output: CreateGroupResponse,
  errors: createGroupErrors,
};

export const createInstanceProfileOperation: AwsQueryOperation & {
  readonly input: typeof CreateInstanceProfileRequest;
  readonly output: typeof CreateInstanceProfileResponse;
} = {
  name: "CreateInstanceProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateInstanceProfileRequest",
    output: "com.amazonaws.iam#CreateInstanceProfileResponse",
    shapes: {
      "com.amazonaws.iam#CreateInstanceProfileRequest": {
        type: "structure",
        members: {
          InstanceProfileName: {
            target: "com.amazonaws.iam#instanceProfileNameType",
          },
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#CreateInstanceProfileResponse": {
        type: "structure",
        members: {
          InstanceProfile: {
            target: "com.amazonaws.iam#InstanceProfile",
          },
        },
      },
      "com.amazonaws.iam#instanceProfileNameType": {
        type: "string",
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#InstanceProfile": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          InstanceProfileName: {
            target: "com.amazonaws.iam#instanceProfileNameType",
          },
          InstanceProfileId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Roles: {
            target: "com.amazonaws.iam#roleListType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#roleListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Role",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
      "com.amazonaws.iam#Role": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          RoleId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          AssumeRolePolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          MaxSessionDuration: {
            target: "com.amazonaws.iam#roleMaxSessionDurationType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          RoleLastUsed: {
            target: "com.amazonaws.iam#RoleLastUsed",
          },
          SourceRoleTemplate: {
            target: "com.amazonaws.iam#SourceRoleTemplate",
          },
        },
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#roleDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#roleMaxSessionDurationType": {
        type: "number",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#RoleLastUsed": {
        type: "structure",
        members: {
          LastUsedDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Region: {
            target: "com.amazonaws.iam#stringType",
          },
        },
      },
      "com.amazonaws.iam#SourceRoleTemplate": {
        type: "structure",
        members: {
          TemplateArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TemplateMinorVersion: {
            target: "com.amazonaws.iam#integerType",
          },
        },
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#stringType": {
        type: "string",
      },
      "com.amazonaws.iam#integerType": {
        type: "number",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateInstanceProfileRequest,
  output: CreateInstanceProfileResponse,
  errors: createInstanceProfileErrors,
};

export const createLoginProfileOperation: AwsQueryOperation & {
  readonly input: typeof CreateLoginProfileRequest;
  readonly output: typeof CreateLoginProfileResponse;
} = {
  name: "CreateLoginProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateLoginProfileRequest",
    output: "com.amazonaws.iam#CreateLoginProfileResponse",
    shapes: {
      "com.amazonaws.iam#CreateLoginProfileRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          Password: {
            target: "com.amazonaws.iam#passwordType",
          },
          PasswordResetRequired: {
            target: "com.amazonaws.iam#booleanType",
          },
        },
      },
      "com.amazonaws.iam#CreateLoginProfileResponse": {
        type: "structure",
        members: {
          LoginProfile: {
            target: "com.amazonaws.iam#LoginProfile",
          },
        },
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#passwordType": {
        type: "string",
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#LoginProfile": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          PasswordResetRequired: {
            target: "com.amazonaws.iam#booleanType",
          },
        },
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateLoginProfileRequest,
  output: CreateLoginProfileResponse,
  errors: createLoginProfileErrors,
};

export const createOpenIDConnectProviderOperation: AwsQueryOperation & {
  readonly input: typeof CreateOpenIDConnectProviderRequest;
  readonly output: typeof CreateOpenIDConnectProviderResponse;
} = {
  name: "CreateOpenIDConnectProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateOpenIDConnectProviderRequest",
    output: "com.amazonaws.iam#CreateOpenIDConnectProviderResponse",
    shapes: {
      "com.amazonaws.iam#CreateOpenIDConnectProviderRequest": {
        type: "structure",
        members: {
          Url: {
            target: "com.amazonaws.iam#OpenIDConnectProviderUrlType",
          },
          ClientIDList: {
            target: "com.amazonaws.iam#clientIDListType",
          },
          ThumbprintList: {
            target: "com.amazonaws.iam#thumbprintListType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#CreateOpenIDConnectProviderResponse": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#OpenIDConnectProviderUrlType": {
        type: "string",
      },
      "com.amazonaws.iam#clientIDListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#clientIDType",
        },
      },
      "com.amazonaws.iam#thumbprintListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#thumbprintType",
        },
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#clientIDType": {
        type: "string",
      },
      "com.amazonaws.iam#thumbprintType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateOpenIDConnectProviderRequest,
  output: CreateOpenIDConnectProviderResponse,
  errors: createOpenIDConnectProviderErrors,
};

export const createPolicyOperation: AwsQueryOperation & {
  readonly input: typeof CreatePolicyRequest;
  readonly output: typeof CreatePolicyResponse;
} = {
  name: "CreatePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreatePolicyRequest",
    output: "com.amazonaws.iam#CreatePolicyResponse",
    shapes: {
      "com.amazonaws.iam#CreatePolicyRequest": {
        type: "structure",
        members: {
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          Path: {
            target: "com.amazonaws.iam#policyPathType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          Description: {
            target: "com.amazonaws.iam#policyDescriptionType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#CreatePolicyResponse": {
        type: "structure",
        members: {
          Policy: {
            target: "com.amazonaws.iam#Policy",
          },
        },
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyPathType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Policy": {
        type: "structure",
        members: {
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          Path: {
            target: "com.amazonaws.iam#policyPathType",
          },
          DefaultVersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
          AttachmentCount: {
            target: "com.amazonaws.iam#attachmentCountType",
          },
          PermissionsBoundaryUsageCount: {
            target: "com.amazonaws.iam#attachmentCountType",
          },
          IsAttachable: {
            target: "com.amazonaws.iam#booleanType",
          },
          Description: {
            target: "com.amazonaws.iam#policyDescriptionType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          UpdateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#policyVersionIdType": {
        type: "string",
      },
      "com.amazonaws.iam#attachmentCountType": {
        type: "number",
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreatePolicyRequest,
  output: CreatePolicyResponse,
  errors: createPolicyErrors,
};

export const createPolicyVersionOperation: AwsQueryOperation & {
  readonly input: typeof CreatePolicyVersionRequest;
  readonly output: typeof CreatePolicyVersionResponse;
} = {
  name: "CreatePolicyVersion",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreatePolicyVersionRequest",
    output: "com.amazonaws.iam#CreatePolicyVersionResponse",
    shapes: {
      "com.amazonaws.iam#CreatePolicyVersionRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          SetAsDefault: {
            target: "com.amazonaws.iam#booleanType",
          },
        },
      },
      "com.amazonaws.iam#CreatePolicyVersionResponse": {
        type: "structure",
        members: {
          PolicyVersion: {
            target: "com.amazonaws.iam#PolicyVersion",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#PolicyVersion": {
        type: "structure",
        members: {
          Document: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          VersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
          IsDefaultVersion: {
            target: "com.amazonaws.iam#booleanType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#policyVersionIdType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreatePolicyVersionRequest,
  output: CreatePolicyVersionResponse,
  errors: createPolicyVersionErrors,
};

export const createRoleOperation: AwsQueryOperation & {
  readonly input: typeof CreateRoleRequest;
  readonly output: typeof CreateRoleResponse;
} = {
  name: "CreateRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateRoleRequest",
    output: "com.amazonaws.iam#CreateRoleResponse",
    shapes: {
      "com.amazonaws.iam#CreateRoleRequest": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          AssumeRolePolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          MaxSessionDuration: {
            target: "com.amazonaws.iam#roleMaxSessionDurationType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#arnType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#CreateRoleResponse": {
        type: "structure",
        members: {
          Role: {
            target: "com.amazonaws.iam#Role",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#roleDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#roleMaxSessionDurationType": {
        type: "number",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Role": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          RoleId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          AssumeRolePolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          MaxSessionDuration: {
            target: "com.amazonaws.iam#roleMaxSessionDurationType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          RoleLastUsed: {
            target: "com.amazonaws.iam#RoleLastUsed",
          },
          SourceRoleTemplate: {
            target: "com.amazonaws.iam#SourceRoleTemplate",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#RoleLastUsed": {
        type: "structure",
        members: {
          LastUsedDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Region: {
            target: "com.amazonaws.iam#stringType",
          },
        },
      },
      "com.amazonaws.iam#SourceRoleTemplate": {
        type: "structure",
        members: {
          TemplateArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TemplateMinorVersion: {
            target: "com.amazonaws.iam#integerType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#stringType": {
        type: "string",
      },
      "com.amazonaws.iam#integerType": {
        type: "number",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateRoleRequest,
  output: CreateRoleResponse,
  errors: createPolicyErrors,
};

export const createSAMLProviderOperation: AwsQueryOperation & {
  readonly input: typeof CreateSAMLProviderRequest;
  readonly output: typeof CreateSAMLProviderResponse;
} = {
  name: "CreateSAMLProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateSAMLProviderRequest",
    output: "com.amazonaws.iam#CreateSAMLProviderResponse",
    shapes: {
      "com.amazonaws.iam#CreateSAMLProviderRequest": {
        type: "structure",
        members: {
          SAMLMetadataDocument: {
            target: "com.amazonaws.iam#SAMLMetadataDocumentType",
          },
          Name: {
            target: "com.amazonaws.iam#SAMLProviderNameType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          AssertionEncryptionMode: {
            target: "com.amazonaws.iam#assertionEncryptionModeType",
          },
          AddPrivateKey: {
            target: "com.amazonaws.iam#privateKeyType",
          },
        },
      },
      "com.amazonaws.iam#CreateSAMLProviderResponse": {
        type: "structure",
        members: {
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#SAMLMetadataDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#SAMLProviderNameType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#assertionEncryptionModeType": {
        type: "string",
      },
      "com.amazonaws.iam#privateKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateSAMLProviderRequest,
  output: CreateSAMLProviderResponse,
  errors: createInstanceProfileErrors,
};

export const createServiceLinkedRoleOperation: AwsQueryOperation & {
  readonly input: typeof CreateServiceLinkedRoleRequest;
  readonly output: typeof CreateServiceLinkedRoleResponse;
} = {
  name: "CreateServiceLinkedRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateServiceLinkedRoleRequest",
    output: "com.amazonaws.iam#CreateServiceLinkedRoleResponse",
    shapes: {
      "com.amazonaws.iam#CreateServiceLinkedRoleRequest": {
        type: "structure",
        members: {
          AWSServiceName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          CustomSuffix: {
            target: "com.amazonaws.iam#customSuffixType",
          },
        },
      },
      "com.amazonaws.iam#CreateServiceLinkedRoleResponse": {
        type: "structure",
        members: {
          Role: {
            target: "com.amazonaws.iam#Role",
          },
        },
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#roleDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#customSuffixType": {
        type: "string",
      },
      "com.amazonaws.iam#Role": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          RoleId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          AssumeRolePolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          MaxSessionDuration: {
            target: "com.amazonaws.iam#roleMaxSessionDurationType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          RoleLastUsed: {
            target: "com.amazonaws.iam#RoleLastUsed",
          },
          SourceRoleTemplate: {
            target: "com.amazonaws.iam#SourceRoleTemplate",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#roleMaxSessionDurationType": {
        type: "number",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#RoleLastUsed": {
        type: "structure",
        members: {
          LastUsedDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Region: {
            target: "com.amazonaws.iam#stringType",
          },
        },
      },
      "com.amazonaws.iam#SourceRoleTemplate": {
        type: "structure",
        members: {
          TemplateArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TemplateMinorVersion: {
            target: "com.amazonaws.iam#integerType",
          },
        },
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#stringType": {
        type: "string",
      },
      "com.amazonaws.iam#integerType": {
        type: "number",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateServiceLinkedRoleRequest,
  output: CreateServiceLinkedRoleResponse,
  errors: createServiceLinkedRoleErrors,
};

export const createUserOperation: AwsQueryOperation & {
  readonly input: typeof CreateUserRequest;
  readonly output: typeof CreateUserResponse;
} = {
  name: "CreateUser",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateUserRequest",
    output: "com.amazonaws.iam#CreateUserResponse",
    shapes: {
      "com.amazonaws.iam#CreateUserRequest": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#arnType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#CreateUserResponse": {
        type: "structure",
        members: {
          User: {
            target: "com.amazonaws.iam#User",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#User": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          UserId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          PasswordLastUsed: {
            target: "com.amazonaws.iam#dateType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: createUserErrors,
};

export const createVirtualMFADeviceOperation: AwsQueryOperation & {
  readonly input: typeof CreateVirtualMFADeviceRequest;
  readonly output: typeof CreateVirtualMFADeviceResponse;
} = {
  name: "CreateVirtualMFADevice",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#CreateVirtualMFADeviceRequest",
    output: "com.amazonaws.iam#CreateVirtualMFADeviceResponse",
    shapes: {
      "com.amazonaws.iam#CreateVirtualMFADeviceRequest": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          VirtualMFADeviceName: {
            target: "com.amazonaws.iam#virtualMFADeviceName",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#CreateVirtualMFADeviceResponse": {
        type: "structure",
        members: {
          VirtualMFADevice: {
            target: "com.amazonaws.iam#VirtualMFADevice",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#virtualMFADeviceName": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#VirtualMFADevice": {
        type: "structure",
        members: {
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
          Base32StringSeed: {
            target: "com.amazonaws.iam#BootstrapDatum",
          },
          QRCodePNG: {
            target: "com.amazonaws.iam#BootstrapDatum",
          },
          User: {
            target: "com.amazonaws.iam#User",
          },
          EnableDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.iam#BootstrapDatum": {
        type: "string",
      },
      "com.amazonaws.iam#User": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          UserId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          PasswordLastUsed: {
            target: "com.amazonaws.iam#dateType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateVirtualMFADeviceRequest,
  output: CreateVirtualMFADeviceResponse,
  errors: createInstanceProfileErrors,
};

export const DeactivateMFADeviceOutput = Schema.Void;

export const deactivateMFADeviceOperation: AwsQueryOperation & {
  readonly input: typeof DeactivateMFADeviceRequest;
  readonly output: typeof DeactivateMFADeviceOutput;
} = {
  name: "DeactivateMFADevice",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeactivateMFADeviceRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeactivateMFADeviceRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeactivateMFADeviceRequest,
  output: DeactivateMFADeviceOutput,
  errors: deactivateMFADeviceErrors,
};

export const DeleteAccessKeyOutput = Schema.Void;

export const deleteAccessKeyOperation: AwsQueryOperation & {
  readonly input: typeof DeleteAccessKeyRequest;
  readonly output: typeof DeleteAccessKeyOutput;
} = {
  name: "DeleteAccessKey",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteAccessKeyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteAccessKeyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          AccessKeyId: {
            target: "com.amazonaws.iam#accessKeyIdType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#accessKeyIdType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteAccessKeyRequest,
  output: DeleteAccessKeyOutput,
  errors: addUserToGroupErrors,
};

export const DeleteGroupOutput = Schema.Void;

export const deleteGroupOperation: AwsQueryOperation & {
  readonly input: typeof DeleteGroupRequest;
  readonly output: typeof DeleteGroupOutput;
} = {
  name: "DeleteGroup",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteGroupRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteGroupRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteGroupRequest,
  output: DeleteGroupOutput,
  errors: deleteGroupErrors,
};

export const DeleteGroupPolicyOutput = Schema.Void;

export const deleteGroupPolicyOperation: AwsQueryOperation & {
  readonly input: typeof DeleteGroupPolicyRequest;
  readonly output: typeof DeleteGroupPolicyOutput;
} = {
  name: "DeleteGroupPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteGroupPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteGroupPolicyRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteGroupPolicyRequest,
  output: DeleteGroupPolicyOutput,
  errors: addUserToGroupErrors,
};

export const DeleteInstanceProfileOutput = Schema.Void;

export const deleteInstanceProfileOperation: AwsQueryOperation & {
  readonly input: typeof DeleteInstanceProfileRequest;
  readonly output: typeof DeleteInstanceProfileOutput;
} = {
  name: "DeleteInstanceProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteInstanceProfileRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteInstanceProfileRequest": {
        type: "structure",
        members: {
          InstanceProfileName: {
            target: "com.amazonaws.iam#instanceProfileNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#instanceProfileNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteInstanceProfileRequest,
  output: DeleteInstanceProfileOutput,
  errors: deleteGroupErrors,
};

export const DeleteLoginProfileOutput = Schema.Void;

export const deleteLoginProfileOperation: AwsQueryOperation & {
  readonly input: typeof DeleteLoginProfileRequest;
  readonly output: typeof DeleteLoginProfileOutput;
} = {
  name: "DeleteLoginProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteLoginProfileRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteLoginProfileRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteLoginProfileRequest,
  output: DeleteLoginProfileOutput,
  errors: deleteLoginProfileErrors,
};

export const DeleteOpenIDConnectProviderOutput = Schema.Void;

export const deleteOpenIDConnectProviderOperation: AwsQueryOperation & {
  readonly input: typeof DeleteOpenIDConnectProviderRequest;
  readonly output: typeof DeleteOpenIDConnectProviderOutput;
} = {
  name: "DeleteOpenIDConnectProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteOpenIDConnectProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteOpenIDConnectProviderRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteOpenIDConnectProviderRequest,
  output: DeleteOpenIDConnectProviderOutput,
  errors: deleteOpenIDConnectProviderErrors,
};

export const DeletePolicyOutput = Schema.Void;

export const deletePolicyOperation: AwsQueryOperation & {
  readonly input: typeof DeletePolicyRequest;
  readonly output: typeof DeletePolicyOutput;
} = {
  name: "DeletePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeletePolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeletePolicyRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeletePolicyRequest,
  output: DeletePolicyOutput,
  errors: deletePolicyErrors,
};

export const DeletePolicyVersionOutput = Schema.Void;

export const deletePolicyVersionOperation: AwsQueryOperation & {
  readonly input: typeof DeletePolicyVersionRequest;
  readonly output: typeof DeletePolicyVersionOutput;
} = {
  name: "DeletePolicyVersion",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeletePolicyVersionRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeletePolicyVersionRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          VersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#policyVersionIdType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeletePolicyVersionRequest,
  output: DeletePolicyVersionOutput,
  errors: deletePolicyErrors,
};

export const DeleteRoleOutput = Schema.Void;

export const deleteRoleOperation: AwsQueryOperation & {
  readonly input: typeof DeleteRoleRequest;
  readonly output: typeof DeleteRoleOutput;
} = {
  name: "DeleteRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteRoleRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteRoleRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteRoleRequest,
  output: DeleteRoleOutput,
  errors: deleteRoleErrors,
};

export const DeleteRolePermissionsBoundaryOutput = Schema.Void;

export const deleteRolePermissionsBoundaryOperation: AwsQueryOperation & {
  readonly input: typeof DeleteRolePermissionsBoundaryRequest;
  readonly output: typeof DeleteRolePermissionsBoundaryOutput;
} = {
  name: "DeleteRolePermissionsBoundary",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteRolePermissionsBoundaryRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteRolePermissionsBoundaryRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteRolePermissionsBoundaryRequest,
  output: DeleteRolePermissionsBoundaryOutput,
  errors: deleteRolePermissionsBoundaryErrors,
};

export const DeleteRolePolicyOutput = Schema.Void;

export const deleteRolePolicyOperation: AwsQueryOperation & {
  readonly input: typeof DeleteRolePolicyRequest;
  readonly output: typeof DeleteRolePolicyOutput;
} = {
  name: "DeleteRolePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteRolePolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteRolePolicyRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteRolePolicyRequest,
  output: DeleteRolePolicyOutput,
  errors: deleteRolePolicyErrors,
};

export const DeleteSAMLProviderOutput = Schema.Void;

export const deleteSAMLProviderOperation: AwsQueryOperation & {
  readonly input: typeof DeleteSAMLProviderRequest;
  readonly output: typeof DeleteSAMLProviderOutput;
} = {
  name: "DeleteSAMLProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteSAMLProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteSAMLProviderRequest": {
        type: "structure",
        members: {
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteSAMLProviderRequest,
  output: DeleteSAMLProviderOutput,
  errors: createServiceLinkedRoleErrors,
};

export const DeleteServerCertificateOutput = Schema.Void;

export const deleteServerCertificateOperation: AwsQueryOperation & {
  readonly input: typeof DeleteServerCertificateRequest;
  readonly output: typeof DeleteServerCertificateOutput;
} = {
  name: "DeleteServerCertificate",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteServerCertificateRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteServerCertificateRequest": {
        type: "structure",
        members: {
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#serverCertificateNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteServerCertificateRequest,
  output: DeleteServerCertificateOutput,
  errors: deleteGroupErrors,
};

export const deleteServiceLinkedRoleOperation: AwsQueryOperation & {
  readonly input: typeof DeleteServiceLinkedRoleRequest;
  readonly output: typeof DeleteServiceLinkedRoleResponse;
} = {
  name: "DeleteServiceLinkedRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteServiceLinkedRoleRequest",
    output: "com.amazonaws.iam#DeleteServiceLinkedRoleResponse",
    shapes: {
      "com.amazonaws.iam#DeleteServiceLinkedRoleRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
        },
      },
      "com.amazonaws.iam#DeleteServiceLinkedRoleResponse": {
        type: "structure",
        members: {
          DeletionTaskId: {
            target: "com.amazonaws.iam#DeletionTaskIdType",
          },
        },
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#DeletionTaskIdType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteServiceLinkedRoleRequest,
  output: DeleteServiceLinkedRoleResponse,
  errors: addUserToGroupErrors,
};

export const DeleteUserOutput = Schema.Void;

export const deleteUserOperation: AwsQueryOperation & {
  readonly input: typeof DeleteUserRequest;
  readonly output: typeof DeleteUserOutput;
} = {
  name: "DeleteUser",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteUserRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteUserRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteUserRequest,
  output: DeleteUserOutput,
  errors: deleteUserErrors,
};

export const DeleteUserPermissionsBoundaryOutput = Schema.Void;

export const deleteUserPermissionsBoundaryOperation: AwsQueryOperation & {
  readonly input: typeof DeleteUserPermissionsBoundaryRequest;
  readonly output: typeof DeleteUserPermissionsBoundaryOutput;
} = {
  name: "DeleteUserPermissionsBoundary",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteUserPermissionsBoundaryRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteUserPermissionsBoundaryRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteUserPermissionsBoundaryRequest,
  output: DeleteUserPermissionsBoundaryOutput,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const DeleteUserPolicyOutput = Schema.Void;

export const deleteUserPolicyOperation: AwsQueryOperation & {
  readonly input: typeof DeleteUserPolicyRequest;
  readonly output: typeof DeleteUserPolicyOutput;
} = {
  name: "DeleteUserPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteUserPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteUserPolicyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteUserPolicyRequest,
  output: DeleteUserPolicyOutput,
  errors: addUserToGroupErrors,
};

export const DeleteVirtualMFADeviceOutput = Schema.Void;

export const deleteVirtualMFADeviceOperation: AwsQueryOperation & {
  readonly input: typeof DeleteVirtualMFADeviceRequest;
  readonly output: typeof DeleteVirtualMFADeviceOutput;
} = {
  name: "DeleteVirtualMFADevice",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DeleteVirtualMFADeviceRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DeleteVirtualMFADeviceRequest": {
        type: "structure",
        members: {
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteVirtualMFADeviceRequest,
  output: DeleteVirtualMFADeviceOutput,
  errors: deleteUserErrors,
};

export const DetachGroupPolicyOutput = Schema.Void;

export const detachGroupPolicyOperation: AwsQueryOperation & {
  readonly input: typeof DetachGroupPolicyRequest;
  readonly output: typeof DetachGroupPolicyOutput;
} = {
  name: "DetachGroupPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DetachGroupPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DetachGroupPolicyRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DetachGroupPolicyRequest,
  output: DetachGroupPolicyOutput,
  errors: createServiceLinkedRoleErrors,
};

export const DetachRolePolicyOutput = Schema.Void;

export const detachRolePolicyOperation: AwsQueryOperation & {
  readonly input: typeof DetachRolePolicyRequest;
  readonly output: typeof DetachRolePolicyOutput;
} = {
  name: "DetachRolePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DetachRolePolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DetachRolePolicyRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DetachRolePolicyRequest,
  output: DetachRolePolicyOutput,
  errors: detachRolePolicyErrors,
};

export const DetachUserPolicyOutput = Schema.Void;

export const detachUserPolicyOperation: AwsQueryOperation & {
  readonly input: typeof DetachUserPolicyRequest;
  readonly output: typeof DetachUserPolicyOutput;
} = {
  name: "DetachUserPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#DetachUserPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#DetachUserPolicyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: DetachUserPolicyRequest,
  output: DetachUserPolicyOutput,
  errors: createServiceLinkedRoleErrors,
};

export const EnableMFADeviceOutput = Schema.Void;

export const enableMFADeviceOperation: AwsQueryOperation & {
  readonly input: typeof EnableMFADeviceRequest;
  readonly output: typeof EnableMFADeviceOutput;
} = {
  name: "EnableMFADevice",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#EnableMFADeviceRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#EnableMFADeviceRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
          AuthenticationCode1: {
            target: "com.amazonaws.iam#authenticationCodeType",
          },
          AuthenticationCode2: {
            target: "com.amazonaws.iam#authenticationCodeType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.iam#authenticationCodeType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: EnableMFADeviceRequest,
  output: EnableMFADeviceOutput,
  errors: enableMFADeviceErrors,
};

export const getGroupOperation: AwsQueryOperation & {
  readonly input: typeof GetGroupRequest;
  readonly output: typeof GetGroupResponse;
} = {
  name: "GetGroup",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetGroupRequest",
    output: "com.amazonaws.iam#GetGroupResponse",
    shapes: {
      "com.amazonaws.iam#GetGroupRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#GetGroupResponse": {
        type: "structure",
        members: {
          Group: {
            target: "com.amazonaws.iam#Group",
          },
          Users: {
            target: "com.amazonaws.iam#userListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#Group": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          GroupId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#userListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#User",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#User": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          UserId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          PasswordLastUsed: {
            target: "com.amazonaws.iam#dateType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "MaxItems",
  },
  input: GetGroupRequest,
  output: GetGroupResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getGroupPolicyOperation: AwsQueryOperation & {
  readonly input: typeof GetGroupPolicyRequest;
  readonly output: typeof GetGroupPolicyResponse;
} = {
  name: "GetGroupPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetGroupPolicyRequest",
    output: "com.amazonaws.iam#GetGroupPolicyResponse",
    shapes: {
      "com.amazonaws.iam#GetGroupPolicyRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
        },
      },
      "com.amazonaws.iam#GetGroupPolicyResponse": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
        },
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetGroupPolicyRequest,
  output: GetGroupPolicyResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getInstanceProfileOperation: AwsQueryOperation & {
  readonly input: typeof GetInstanceProfileRequest;
  readonly output: typeof GetInstanceProfileResponse;
} = {
  name: "GetInstanceProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetInstanceProfileRequest",
    output: "com.amazonaws.iam#GetInstanceProfileResponse",
    shapes: {
      "com.amazonaws.iam#GetInstanceProfileRequest": {
        type: "structure",
        members: {
          InstanceProfileName: {
            target: "com.amazonaws.iam#instanceProfileNameType",
          },
        },
      },
      "com.amazonaws.iam#GetInstanceProfileResponse": {
        type: "structure",
        members: {
          InstanceProfile: {
            target: "com.amazonaws.iam#InstanceProfile",
          },
        },
      },
      "com.amazonaws.iam#instanceProfileNameType": {
        type: "string",
      },
      "com.amazonaws.iam#InstanceProfile": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          InstanceProfileName: {
            target: "com.amazonaws.iam#instanceProfileNameType",
          },
          InstanceProfileId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Roles: {
            target: "com.amazonaws.iam#roleListType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#roleListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Role",
        },
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Role": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          RoleId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          AssumeRolePolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          MaxSessionDuration: {
            target: "com.amazonaws.iam#roleMaxSessionDurationType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          RoleLastUsed: {
            target: "com.amazonaws.iam#RoleLastUsed",
          },
          SourceRoleTemplate: {
            target: "com.amazonaws.iam#SourceRoleTemplate",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#roleDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#roleMaxSessionDurationType": {
        type: "number",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#RoleLastUsed": {
        type: "structure",
        members: {
          LastUsedDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Region: {
            target: "com.amazonaws.iam#stringType",
          },
        },
      },
      "com.amazonaws.iam#SourceRoleTemplate": {
        type: "structure",
        members: {
          TemplateArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TemplateMinorVersion: {
            target: "com.amazonaws.iam#integerType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#stringType": {
        type: "string",
      },
      "com.amazonaws.iam#integerType": {
        type: "number",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetInstanceProfileRequest,
  output: GetInstanceProfileResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getLoginProfileOperation: AwsQueryOperation & {
  readonly input: typeof GetLoginProfileRequest;
  readonly output: typeof GetLoginProfileResponse;
} = {
  name: "GetLoginProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetLoginProfileRequest",
    output: "com.amazonaws.iam#GetLoginProfileResponse",
    shapes: {
      "com.amazonaws.iam#GetLoginProfileRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
        },
      },
      "com.amazonaws.iam#GetLoginProfileResponse": {
        type: "structure",
        members: {
          LoginProfile: {
            target: "com.amazonaws.iam#LoginProfile",
          },
        },
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#LoginProfile": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          PasswordResetRequired: {
            target: "com.amazonaws.iam#booleanType",
          },
        },
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetLoginProfileRequest,
  output: GetLoginProfileResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getOpenIDConnectProviderOperation: AwsQueryOperation & {
  readonly input: typeof GetOpenIDConnectProviderRequest;
  readonly output: typeof GetOpenIDConnectProviderResponse;
} = {
  name: "GetOpenIDConnectProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetOpenIDConnectProviderRequest",
    output: "com.amazonaws.iam#GetOpenIDConnectProviderResponse",
    shapes: {
      "com.amazonaws.iam#GetOpenIDConnectProviderRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#GetOpenIDConnectProviderResponse": {
        type: "structure",
        members: {
          Url: {
            target: "com.amazonaws.iam#OpenIDConnectProviderUrlType",
          },
          ClientIDList: {
            target: "com.amazonaws.iam#clientIDListType",
          },
          ThumbprintList: {
            target: "com.amazonaws.iam#thumbprintListType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#OpenIDConnectProviderUrlType": {
        type: "string",
      },
      "com.amazonaws.iam#clientIDListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#clientIDType",
        },
      },
      "com.amazonaws.iam#thumbprintListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#thumbprintType",
        },
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#clientIDType": {
        type: "string",
      },
      "com.amazonaws.iam#thumbprintType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetOpenIDConnectProviderRequest,
  output: GetOpenIDConnectProviderResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const getPolicyOperation: AwsQueryOperation & {
  readonly input: typeof GetPolicyRequest;
  readonly output: typeof GetPolicyResponse;
} = {
  name: "GetPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetPolicyRequest",
    output: "com.amazonaws.iam#GetPolicyResponse",
    shapes: {
      "com.amazonaws.iam#GetPolicyRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#GetPolicyResponse": {
        type: "structure",
        members: {
          Policy: {
            target: "com.amazonaws.iam#Policy",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#Policy": {
        type: "structure",
        members: {
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          Path: {
            target: "com.amazonaws.iam#policyPathType",
          },
          DefaultVersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
          AttachmentCount: {
            target: "com.amazonaws.iam#attachmentCountType",
          },
          PermissionsBoundaryUsageCount: {
            target: "com.amazonaws.iam#attachmentCountType",
          },
          IsAttachable: {
            target: "com.amazonaws.iam#booleanType",
          },
          Description: {
            target: "com.amazonaws.iam#policyDescriptionType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          UpdateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#policyPathType": {
        type: "string",
      },
      "com.amazonaws.iam#policyVersionIdType": {
        type: "string",
      },
      "com.amazonaws.iam#attachmentCountType": {
        type: "number",
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#policyDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const getPolicyVersionOperation: AwsQueryOperation & {
  readonly input: typeof GetPolicyVersionRequest;
  readonly output: typeof GetPolicyVersionResponse;
} = {
  name: "GetPolicyVersion",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetPolicyVersionRequest",
    output: "com.amazonaws.iam#GetPolicyVersionResponse",
    shapes: {
      "com.amazonaws.iam#GetPolicyVersionRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          VersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
        },
      },
      "com.amazonaws.iam#GetPolicyVersionResponse": {
        type: "structure",
        members: {
          PolicyVersion: {
            target: "com.amazonaws.iam#PolicyVersion",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#policyVersionIdType": {
        type: "string",
      },
      "com.amazonaws.iam#PolicyVersion": {
        type: "structure",
        members: {
          Document: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          VersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
          IsDefaultVersion: {
            target: "com.amazonaws.iam#booleanType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetPolicyVersionRequest,
  output: GetPolicyVersionResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const getRoleOperation: AwsQueryOperation & {
  readonly input: typeof GetRoleRequest;
  readonly output: typeof GetRoleResponse;
} = {
  name: "GetRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetRoleRequest",
    output: "com.amazonaws.iam#GetRoleResponse",
    shapes: {
      "com.amazonaws.iam#GetRoleRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
        },
      },
      "com.amazonaws.iam#GetRoleResponse": {
        type: "structure",
        members: {
          Role: {
            target: "com.amazonaws.iam#Role",
          },
        },
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#Role": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          RoleId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          AssumeRolePolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          MaxSessionDuration: {
            target: "com.amazonaws.iam#roleMaxSessionDurationType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          RoleLastUsed: {
            target: "com.amazonaws.iam#RoleLastUsed",
          },
          SourceRoleTemplate: {
            target: "com.amazonaws.iam#SourceRoleTemplate",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#roleDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#roleMaxSessionDurationType": {
        type: "number",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#RoleLastUsed": {
        type: "structure",
        members: {
          LastUsedDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Region: {
            target: "com.amazonaws.iam#stringType",
          },
        },
      },
      "com.amazonaws.iam#SourceRoleTemplate": {
        type: "structure",
        members: {
          TemplateArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TemplateMinorVersion: {
            target: "com.amazonaws.iam#integerType",
          },
        },
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#stringType": {
        type: "string",
      },
      "com.amazonaws.iam#integerType": {
        type: "number",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetRoleRequest,
  output: GetRoleResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getRolePolicyOperation: AwsQueryOperation & {
  readonly input: typeof GetRolePolicyRequest;
  readonly output: typeof GetRolePolicyResponse;
} = {
  name: "GetRolePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetRolePolicyRequest",
    output: "com.amazonaws.iam#GetRolePolicyResponse",
    shapes: {
      "com.amazonaws.iam#GetRolePolicyRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
        },
      },
      "com.amazonaws.iam#GetRolePolicyResponse": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
        },
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetRolePolicyRequest,
  output: GetRolePolicyResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getSAMLProviderOperation: AwsQueryOperation & {
  readonly input: typeof GetSAMLProviderRequest;
  readonly output: typeof GetSAMLProviderResponse;
} = {
  name: "GetSAMLProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetSAMLProviderRequest",
    output: "com.amazonaws.iam#GetSAMLProviderResponse",
    shapes: {
      "com.amazonaws.iam#GetSAMLProviderRequest": {
        type: "structure",
        members: {
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#GetSAMLProviderResponse": {
        type: "structure",
        members: {
          SAMLProviderUUID: {
            target: "com.amazonaws.iam#privateKeyIdType",
          },
          SAMLMetadataDocument: {
            target: "com.amazonaws.iam#SAMLMetadataDocumentType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          ValidUntil: {
            target: "com.amazonaws.iam#dateType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          AssertionEncryptionMode: {
            target: "com.amazonaws.iam#assertionEncryptionModeType",
          },
          PrivateKeyList: {
            target: "com.amazonaws.iam#privateKeyList",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#privateKeyIdType": {
        type: "string",
      },
      "com.amazonaws.iam#SAMLMetadataDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#assertionEncryptionModeType": {
        type: "string",
      },
      "com.amazonaws.iam#privateKeyList": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#SAMLPrivateKey",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#SAMLPrivateKey": {
        type: "structure",
        members: {
          KeyId: {
            target: "com.amazonaws.iam#privateKeyIdType",
          },
          Timestamp: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetSAMLProviderRequest,
  output: GetSAMLProviderResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const getServerCertificateOperation: AwsQueryOperation & {
  readonly input: typeof GetServerCertificateRequest;
  readonly output: typeof GetServerCertificateResponse;
} = {
  name: "GetServerCertificate",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetServerCertificateRequest",
    output: "com.amazonaws.iam#GetServerCertificateResponse",
    shapes: {
      "com.amazonaws.iam#GetServerCertificateRequest": {
        type: "structure",
        members: {
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
        },
      },
      "com.amazonaws.iam#GetServerCertificateResponse": {
        type: "structure",
        members: {
          ServerCertificate: {
            target: "com.amazonaws.iam#ServerCertificate",
          },
        },
      },
      "com.amazonaws.iam#serverCertificateNameType": {
        type: "string",
      },
      "com.amazonaws.iam#ServerCertificate": {
        type: "structure",
        members: {
          ServerCertificateMetadata: {
            target: "com.amazonaws.iam#ServerCertificateMetadata",
          },
          CertificateBody: {
            target: "com.amazonaws.iam#certificateBodyType",
          },
          CertificateChain: {
            target: "com.amazonaws.iam#certificateChainType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#ServerCertificateMetadata": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
          ServerCertificateId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          UploadDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Expiration: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#certificateBodyType": {
        type: "string",
      },
      "com.amazonaws.iam#certificateChainType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetServerCertificateRequest,
  output: GetServerCertificateResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getServiceLinkedRoleDeletionStatusOperation: AwsQueryOperation & {
  readonly input: typeof GetServiceLinkedRoleDeletionStatusRequest;
  readonly output: typeof GetServiceLinkedRoleDeletionStatusResponse;
} = {
  name: "GetServiceLinkedRoleDeletionStatus",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetServiceLinkedRoleDeletionStatusRequest",
    output: "com.amazonaws.iam#GetServiceLinkedRoleDeletionStatusResponse",
    shapes: {
      "com.amazonaws.iam#GetServiceLinkedRoleDeletionStatusRequest": {
        type: "structure",
        members: {
          DeletionTaskId: {
            target: "com.amazonaws.iam#DeletionTaskIdType",
          },
        },
      },
      "com.amazonaws.iam#GetServiceLinkedRoleDeletionStatusResponse": {
        type: "structure",
        members: {
          Status: {
            target: "com.amazonaws.iam#DeletionTaskStatusType",
          },
          Reason: {
            target: "com.amazonaws.iam#DeletionTaskFailureReasonType",
          },
        },
      },
      "com.amazonaws.iam#DeletionTaskIdType": {
        type: "string",
      },
      "com.amazonaws.iam#DeletionTaskStatusType": {
        type: "string",
      },
      "com.amazonaws.iam#DeletionTaskFailureReasonType": {
        type: "structure",
        members: {
          Reason: {
            target: "com.amazonaws.iam#ReasonType",
          },
          RoleUsageList: {
            target: "com.amazonaws.iam#RoleUsageListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#ReasonType": {
        type: "string",
      },
      "com.amazonaws.iam#RoleUsageListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#RoleUsageType",
        },
      },
      "com.amazonaws.iam#RoleUsageType": {
        type: "structure",
        members: {
          Region: {
            target: "com.amazonaws.iam#RegionNameType",
          },
          Resources: {
            target: "com.amazonaws.iam#ArnListType",
          },
        },
      },
      "com.amazonaws.iam#RegionNameType": {
        type: "string",
      },
      "com.amazonaws.iam#ArnListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#arnType",
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetServiceLinkedRoleDeletionStatusRequest,
  output: GetServiceLinkedRoleDeletionStatusResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const getUserOperation: AwsQueryOperation & {
  readonly input: typeof GetUserRequest;
  readonly output: typeof GetUserResponse;
} = {
  name: "GetUser",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetUserRequest",
    output: "com.amazonaws.iam#GetUserResponse",
    shapes: {
      "com.amazonaws.iam#GetUserRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
        },
      },
      "com.amazonaws.iam#GetUserResponse": {
        type: "structure",
        members: {
          User: {
            target: "com.amazonaws.iam#User",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#User": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          UserId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          PasswordLastUsed: {
            target: "com.amazonaws.iam#dateType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetUserRequest,
  output: GetUserResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const getUserPolicyOperation: AwsQueryOperation & {
  readonly input: typeof GetUserPolicyRequest;
  readonly output: typeof GetUserPolicyResponse;
} = {
  name: "GetUserPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#GetUserPolicyRequest",
    output: "com.amazonaws.iam#GetUserPolicyResponse",
    shapes: {
      "com.amazonaws.iam#GetUserPolicyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
        },
      },
      "com.amazonaws.iam#GetUserPolicyResponse": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetUserPolicyRequest,
  output: GetUserPolicyResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listAccessKeysOperation: AwsQueryOperation & {
  readonly input: typeof ListAccessKeysRequest;
  readonly output: typeof ListAccessKeysResponse;
} = {
  name: "ListAccessKeys",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListAccessKeysRequest",
    output: "com.amazonaws.iam#ListAccessKeysResponse",
    shapes: {
      "com.amazonaws.iam#ListAccessKeysRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListAccessKeysResponse": {
        type: "structure",
        members: {
          AccessKeyMetadata: {
            target: "com.amazonaws.iam#accessKeyMetadataListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#accessKeyMetadataListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#AccessKeyMetadata",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#AccessKeyMetadata": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          AccessKeyId: {
            target: "com.amazonaws.iam#accessKeyIdType",
          },
          Status: {
            target: "com.amazonaws.iam#statusType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#accessKeyIdType": {
        type: "string",
      },
      "com.amazonaws.iam#statusType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AccessKeyMetadata",
    pageSize: "MaxItems",
  },
  input: ListAccessKeysRequest,
  output: ListAccessKeysResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listAttachedGroupPoliciesOperation: AwsQueryOperation & {
  readonly input: typeof ListAttachedGroupPoliciesRequest;
  readonly output: typeof ListAttachedGroupPoliciesResponse;
} = {
  name: "ListAttachedGroupPolicies",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListAttachedGroupPoliciesRequest",
    output: "com.amazonaws.iam#ListAttachedGroupPoliciesResponse",
    shapes: {
      "com.amazonaws.iam#ListAttachedGroupPoliciesRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          PathPrefix: {
            target: "com.amazonaws.iam#policyPathType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListAttachedGroupPoliciesResponse": {
        type: "structure",
        members: {
          AttachedPolicies: {
            target: "com.amazonaws.iam#attachedPoliciesListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyPathType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#attachedPoliciesListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#AttachedPolicy",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#AttachedPolicy": {
        type: "structure",
        members: {
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AttachedPolicies",
    pageSize: "MaxItems",
  },
  input: ListAttachedGroupPoliciesRequest,
  output: ListAttachedGroupPoliciesResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listAttachedRolePoliciesOperation: AwsQueryOperation & {
  readonly input: typeof ListAttachedRolePoliciesRequest;
  readonly output: typeof ListAttachedRolePoliciesResponse;
} = {
  name: "ListAttachedRolePolicies",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListAttachedRolePoliciesRequest",
    output: "com.amazonaws.iam#ListAttachedRolePoliciesResponse",
    shapes: {
      "com.amazonaws.iam#ListAttachedRolePoliciesRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PathPrefix: {
            target: "com.amazonaws.iam#policyPathType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListAttachedRolePoliciesResponse": {
        type: "structure",
        members: {
          AttachedPolicies: {
            target: "com.amazonaws.iam#attachedPoliciesListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyPathType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#attachedPoliciesListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#AttachedPolicy",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#AttachedPolicy": {
        type: "structure",
        members: {
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AttachedPolicies",
    pageSize: "MaxItems",
  },
  input: ListAttachedRolePoliciesRequest,
  output: ListAttachedRolePoliciesResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listAttachedUserPoliciesOperation: AwsQueryOperation & {
  readonly input: typeof ListAttachedUserPoliciesRequest;
  readonly output: typeof ListAttachedUserPoliciesResponse;
} = {
  name: "ListAttachedUserPolicies",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListAttachedUserPoliciesRequest",
    output: "com.amazonaws.iam#ListAttachedUserPoliciesResponse",
    shapes: {
      "com.amazonaws.iam#ListAttachedUserPoliciesRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          PathPrefix: {
            target: "com.amazonaws.iam#policyPathType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListAttachedUserPoliciesResponse": {
        type: "structure",
        members: {
          AttachedPolicies: {
            target: "com.amazonaws.iam#attachedPoliciesListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyPathType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#attachedPoliciesListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#AttachedPolicy",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#AttachedPolicy": {
        type: "structure",
        members: {
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AttachedPolicies",
    pageSize: "MaxItems",
  },
  input: ListAttachedUserPoliciesRequest,
  output: ListAttachedUserPoliciesResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listEntitiesForPolicyOperation: AwsQueryOperation & {
  readonly input: typeof ListEntitiesForPolicyRequest;
  readonly output: typeof ListEntitiesForPolicyResponse;
} = {
  name: "ListEntitiesForPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListEntitiesForPolicyRequest",
    output: "com.amazonaws.iam#ListEntitiesForPolicyResponse",
    shapes: {
      "com.amazonaws.iam#ListEntitiesForPolicyRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          EntityFilter: {
            target: "com.amazonaws.iam#EntityType",
          },
          PathPrefix: {
            target: "com.amazonaws.iam#pathType",
          },
          PolicyUsageFilter: {
            target: "com.amazonaws.iam#PolicyUsageType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListEntitiesForPolicyResponse": {
        type: "structure",
        members: {
          PolicyGroups: {
            target: "com.amazonaws.iam#PolicyGroupListType",
          },
          PolicyUsers: {
            target: "com.amazonaws.iam#PolicyUserListType",
          },
          PolicyRoles: {
            target: "com.amazonaws.iam#PolicyRoleListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#EntityType": {
        type: "string",
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#PolicyUsageType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#PolicyGroupListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#PolicyGroup",
        },
      },
      "com.amazonaws.iam#PolicyUserListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#PolicyUser",
        },
      },
      "com.amazonaws.iam#PolicyRoleListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#PolicyRole",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#PolicyGroup": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          GroupId: {
            target: "com.amazonaws.iam#idType",
          },
        },
      },
      "com.amazonaws.iam#PolicyUser": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          UserId: {
            target: "com.amazonaws.iam#idType",
          },
        },
      },
      "com.amazonaws.iam#PolicyRole": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          RoleId: {
            target: "com.amazonaws.iam#idType",
          },
        },
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    pageSize: "MaxItems",
  },
  input: ListEntitiesForPolicyRequest,
  output: ListEntitiesForPolicyResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listGroupPoliciesOperation: AwsQueryOperation & {
  readonly input: typeof ListGroupPoliciesRequest;
  readonly output: typeof ListGroupPoliciesResponse;
} = {
  name: "ListGroupPolicies",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListGroupPoliciesRequest",
    output: "com.amazonaws.iam#ListGroupPoliciesResponse",
    shapes: {
      "com.amazonaws.iam#ListGroupPoliciesRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListGroupPoliciesResponse": {
        type: "structure",
        members: {
          PolicyNames: {
            target: "com.amazonaws.iam#policyNameListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#policyNameListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#policyNameType",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PolicyNames",
    pageSize: "MaxItems",
  },
  input: ListGroupPoliciesRequest,
  output: ListGroupPoliciesResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listGroupsForUserOperation: AwsQueryOperation & {
  readonly input: typeof ListGroupsForUserRequest;
  readonly output: typeof ListGroupsForUserResponse;
} = {
  name: "ListGroupsForUser",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListGroupsForUserRequest",
    output: "com.amazonaws.iam#ListGroupsForUserResponse",
    shapes: {
      "com.amazonaws.iam#ListGroupsForUserRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListGroupsForUserResponse": {
        type: "structure",
        members: {
          Groups: {
            target: "com.amazonaws.iam#groupListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#groupListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Group",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#Group": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          GroupId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Groups",
    pageSize: "MaxItems",
  },
  input: ListGroupsForUserRequest,
  output: ListGroupsForUserResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listMFADeviceTagsOperation: AwsQueryOperation & {
  readonly input: typeof ListMFADeviceTagsRequest;
  readonly output: typeof ListMFADeviceTagsResponse;
} = {
  name: "ListMFADeviceTags",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListMFADeviceTagsRequest",
    output: "com.amazonaws.iam#ListMFADeviceTagsResponse",
    shapes: {
      "com.amazonaws.iam#ListMFADeviceTagsRequest": {
        type: "structure",
        members: {
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListMFADeviceTagsResponse": {
        type: "structure",
        members: {
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  },
  input: ListMFADeviceTagsRequest,
  output: ListMFADeviceTagsResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listMFADevicesOperation: AwsQueryOperation & {
  readonly input: typeof ListMFADevicesRequest;
  readonly output: typeof ListMFADevicesResponse;
} = {
  name: "ListMFADevices",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListMFADevicesRequest",
    output: "com.amazonaws.iam#ListMFADevicesResponse",
    shapes: {
      "com.amazonaws.iam#ListMFADevicesRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListMFADevicesResponse": {
        type: "structure",
        members: {
          MFADevices: {
            target: "com.amazonaws.iam#mfaDeviceListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#mfaDeviceListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#MFADevice",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#MFADevice": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
          EnableDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "MFADevices",
    pageSize: "MaxItems",
  },
  input: ListMFADevicesRequest,
  output: ListMFADevicesResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listOpenIDConnectProviderTagsOperation: AwsQueryOperation & {
  readonly input: typeof ListOpenIDConnectProviderTagsRequest;
  readonly output: typeof ListOpenIDConnectProviderTagsResponse;
} = {
  name: "ListOpenIDConnectProviderTags",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListOpenIDConnectProviderTagsRequest",
    output: "com.amazonaws.iam#ListOpenIDConnectProviderTagsResponse",
    shapes: {
      "com.amazonaws.iam#ListOpenIDConnectProviderTagsRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListOpenIDConnectProviderTagsResponse": {
        type: "structure",
        members: {
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  },
  input: ListOpenIDConnectProviderTagsRequest,
  output: ListOpenIDConnectProviderTagsResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listPolicyVersionsOperation: AwsQueryOperation & {
  readonly input: typeof ListPolicyVersionsRequest;
  readonly output: typeof ListPolicyVersionsResponse;
} = {
  name: "ListPolicyVersions",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListPolicyVersionsRequest",
    output: "com.amazonaws.iam#ListPolicyVersionsResponse",
    shapes: {
      "com.amazonaws.iam#ListPolicyVersionsRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListPolicyVersionsResponse": {
        type: "structure",
        members: {
          Versions: {
            target: "com.amazonaws.iam#policyDocumentVersionListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#policyDocumentVersionListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#PolicyVersion",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#PolicyVersion": {
        type: "structure",
        members: {
          Document: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
          VersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
          IsDefaultVersion: {
            target: "com.amazonaws.iam#booleanType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#policyVersionIdType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Versions",
    pageSize: "MaxItems",
  },
  input: ListPolicyVersionsRequest,
  output: ListPolicyVersionsResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listRolePoliciesOperation: AwsQueryOperation & {
  readonly input: typeof ListRolePoliciesRequest;
  readonly output: typeof ListRolePoliciesResponse;
} = {
  name: "ListRolePolicies",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListRolePoliciesRequest",
    output: "com.amazonaws.iam#ListRolePoliciesResponse",
    shapes: {
      "com.amazonaws.iam#ListRolePoliciesRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListRolePoliciesResponse": {
        type: "structure",
        members: {
          PolicyNames: {
            target: "com.amazonaws.iam#policyNameListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#policyNameListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#policyNameType",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PolicyNames",
    pageSize: "MaxItems",
  },
  input: ListRolePoliciesRequest,
  output: ListRolePoliciesResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listSAMLProviderTagsOperation: AwsQueryOperation & {
  readonly input: typeof ListSAMLProviderTagsRequest;
  readonly output: typeof ListSAMLProviderTagsResponse;
} = {
  name: "ListSAMLProviderTags",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListSAMLProviderTagsRequest",
    output: "com.amazonaws.iam#ListSAMLProviderTagsResponse",
    shapes: {
      "com.amazonaws.iam#ListSAMLProviderTagsRequest": {
        type: "structure",
        members: {
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListSAMLProviderTagsResponse": {
        type: "structure",
        members: {
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  },
  input: ListSAMLProviderTagsRequest,
  output: ListSAMLProviderTagsResponse,
  errors: deleteOpenIDConnectProviderErrors,
};

export const listServerCertificateTagsOperation: AwsQueryOperation & {
  readonly input: typeof ListServerCertificateTagsRequest;
  readonly output: typeof ListServerCertificateTagsResponse;
} = {
  name: "ListServerCertificateTags",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListServerCertificateTagsRequest",
    output: "com.amazonaws.iam#ListServerCertificateTagsResponse",
    shapes: {
      "com.amazonaws.iam#ListServerCertificateTagsRequest": {
        type: "structure",
        members: {
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListServerCertificateTagsResponse": {
        type: "structure",
        members: {
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#serverCertificateNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  },
  input: ListServerCertificateTagsRequest,
  output: ListServerCertificateTagsResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listUserPoliciesOperation: AwsQueryOperation & {
  readonly input: typeof ListUserPoliciesRequest;
  readonly output: typeof ListUserPoliciesResponse;
} = {
  name: "ListUserPolicies",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListUserPoliciesRequest",
    output: "com.amazonaws.iam#ListUserPoliciesResponse",
    shapes: {
      "com.amazonaws.iam#ListUserPoliciesRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListUserPoliciesResponse": {
        type: "structure",
        members: {
          PolicyNames: {
            target: "com.amazonaws.iam#policyNameListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#policyNameListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#policyNameType",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PolicyNames",
    pageSize: "MaxItems",
  },
  input: ListUserPoliciesRequest,
  output: ListUserPoliciesResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listUserTagsOperation: AwsQueryOperation & {
  readonly input: typeof ListUserTagsRequest;
  readonly output: typeof ListUserTagsResponse;
} = {
  name: "ListUserTags",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListUserTagsRequest",
    output: "com.amazonaws.iam#ListUserTagsResponse",
    shapes: {
      "com.amazonaws.iam#ListUserTagsRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListUserTagsResponse": {
        type: "structure",
        members: {
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "MaxItems",
  },
  input: ListUserTagsRequest,
  output: ListUserTagsResponse,
  errors: deleteUserPermissionsBoundaryErrors,
};

export const listVirtualMFADevicesOperation: AwsQueryOperation & {
  readonly input: typeof ListVirtualMFADevicesRequest;
  readonly output: typeof ListVirtualMFADevicesResponse;
} = {
  name: "ListVirtualMFADevices",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#ListVirtualMFADevicesRequest",
    output: "com.amazonaws.iam#ListVirtualMFADevicesResponse",
    shapes: {
      "com.amazonaws.iam#ListVirtualMFADevicesRequest": {
        type: "structure",
        members: {
          AssignmentStatus: {
            target: "com.amazonaws.iam#assignmentStatusType",
          },
          Marker: {
            target: "com.amazonaws.iam#markerType",
          },
          MaxItems: {
            target: "com.amazonaws.iam#maxItemsType",
          },
        },
      },
      "com.amazonaws.iam#ListVirtualMFADevicesResponse": {
        type: "structure",
        members: {
          VirtualMFADevices: {
            target: "com.amazonaws.iam#virtualMFADeviceListType",
          },
          IsTruncated: {
            target: "com.amazonaws.iam#booleanType",
          },
          Marker: {
            target: "com.amazonaws.iam#responseMarkerType",
          },
        },
      },
      "com.amazonaws.iam#assignmentStatusType": {
        type: "string",
      },
      "com.amazonaws.iam#markerType": {
        type: "string",
      },
      "com.amazonaws.iam#maxItemsType": {
        type: "number",
      },
      "com.amazonaws.iam#virtualMFADeviceListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#VirtualMFADevice",
        },
      },
      "com.amazonaws.iam#booleanType": {
        type: "boolean",
      },
      "com.amazonaws.iam#responseMarkerType": {
        type: "string",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#VirtualMFADevice": {
        type: "structure",
        members: {
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
          Base32StringSeed: {
            target: "com.amazonaws.iam#BootstrapDatum",
          },
          QRCodePNG: {
            target: "com.amazonaws.iam#BootstrapDatum",
          },
          User: {
            target: "com.amazonaws.iam#User",
          },
          EnableDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.iam#BootstrapDatum": {
        type: "string",
      },
      "com.amazonaws.iam#User": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          UserId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          CreateDate: {
            target: "com.amazonaws.iam#dateType",
          },
          PasswordLastUsed: {
            target: "com.amazonaws.iam#dateType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#AttachedPermissionsBoundary",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#AttachedPermissionsBoundary": {
        type: "structure",
        members: {
          PermissionsBoundaryType: {
            target: "com.amazonaws.iam#PermissionsBoundaryAttachmentType",
          },
          PermissionsBoundaryArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#PermissionsBoundaryAttachmentType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "VirtualMFADevices",
    pageSize: "MaxItems",
  },
  input: ListVirtualMFADevicesRequest,
  output: ListVirtualMFADevicesResponse,
  errors: listVirtualMFADevicesErrors,
};

export const PutGroupPolicyOutput = Schema.Void;

export const putGroupPolicyOperation: AwsQueryOperation & {
  readonly input: typeof PutGroupPolicyRequest;
  readonly output: typeof PutGroupPolicyOutput;
} = {
  name: "PutGroupPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#PutGroupPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#PutGroupPolicyRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: PutGroupPolicyRequest,
  output: PutGroupPolicyOutput,
  errors: putGroupPolicyErrors,
};

export const PutRolePermissionsBoundaryOutput = Schema.Void;

export const putRolePermissionsBoundaryOperation: AwsQueryOperation & {
  readonly input: typeof PutRolePermissionsBoundaryRequest;
  readonly output: typeof PutRolePermissionsBoundaryOutput;
} = {
  name: "PutRolePermissionsBoundary",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#PutRolePermissionsBoundaryRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#PutRolePermissionsBoundaryRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: PutRolePermissionsBoundaryRequest,
  output: PutRolePermissionsBoundaryOutput,
  errors: putRolePermissionsBoundaryErrors,
};

export const PutRolePolicyOutput = Schema.Void;

export const putRolePolicyOperation: AwsQueryOperation & {
  readonly input: typeof PutRolePolicyRequest;
  readonly output: typeof PutRolePolicyOutput;
} = {
  name: "PutRolePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#PutRolePolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#PutRolePolicyRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: PutRolePolicyRequest,
  output: PutRolePolicyOutput,
  errors: putRolePolicyErrors,
};

export const PutUserPermissionsBoundaryOutput = Schema.Void;

export const putUserPermissionsBoundaryOperation: AwsQueryOperation & {
  readonly input: typeof PutUserPermissionsBoundaryRequest;
  readonly output: typeof PutUserPermissionsBoundaryOutput;
} = {
  name: "PutUserPermissionsBoundary",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#PutUserPermissionsBoundaryRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#PutUserPermissionsBoundaryRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          PermissionsBoundary: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: PutUserPermissionsBoundaryRequest,
  output: PutUserPermissionsBoundaryOutput,
  errors: putUserPermissionsBoundaryErrors,
};

export const PutUserPolicyOutput = Schema.Void;

export const putUserPolicyOperation: AwsQueryOperation & {
  readonly input: typeof PutUserPolicyRequest;
  readonly output: typeof PutUserPolicyOutput;
} = {
  name: "PutUserPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#PutUserPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#PutUserPolicyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          PolicyName: {
            target: "com.amazonaws.iam#policyNameType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: PutUserPolicyRequest,
  output: PutUserPolicyOutput,
  errors: putGroupPolicyErrors,
};

export const RemoveClientIDFromOpenIDConnectProviderOutput = Schema.Void;

export const removeClientIDFromOpenIDConnectProviderOperation: AwsQueryOperation & {
  readonly input: typeof RemoveClientIDFromOpenIDConnectProviderRequest;
  readonly output: typeof RemoveClientIDFromOpenIDConnectProviderOutput;
} = {
  name: "RemoveClientIDFromOpenIDConnectProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#RemoveClientIDFromOpenIDConnectProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#RemoveClientIDFromOpenIDConnectProviderRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          ClientID: {
            target: "com.amazonaws.iam#clientIDType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#clientIDType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: RemoveClientIDFromOpenIDConnectProviderRequest,
  output: RemoveClientIDFromOpenIDConnectProviderOutput,
  errors: removeClientIDFromOpenIDConnectProviderErrors,
};

export const RemoveRoleFromInstanceProfileOutput = Schema.Void;

export const removeRoleFromInstanceProfileOperation: AwsQueryOperation & {
  readonly input: typeof RemoveRoleFromInstanceProfileRequest;
  readonly output: typeof RemoveRoleFromInstanceProfileOutput;
} = {
  name: "RemoveRoleFromInstanceProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#RemoveRoleFromInstanceProfileRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#RemoveRoleFromInstanceProfileRequest": {
        type: "structure",
        members: {
          InstanceProfileName: {
            target: "com.amazonaws.iam#instanceProfileNameType",
          },
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#instanceProfileNameType": {
        type: "string",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: RemoveRoleFromInstanceProfileRequest,
  output: RemoveRoleFromInstanceProfileOutput,
  errors: deleteRolePolicyErrors,
};

export const RemoveUserFromGroupOutput = Schema.Void;

export const removeUserFromGroupOperation: AwsQueryOperation & {
  readonly input: typeof RemoveUserFromGroupRequest;
  readonly output: typeof RemoveUserFromGroupOutput;
} = {
  name: "RemoveUserFromGroup",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#RemoveUserFromGroupRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#RemoveUserFromGroupRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: RemoveUserFromGroupRequest,
  output: RemoveUserFromGroupOutput,
  errors: addUserToGroupErrors,
};

export const SetDefaultPolicyVersionOutput = Schema.Void;

export const setDefaultPolicyVersionOperation: AwsQueryOperation & {
  readonly input: typeof SetDefaultPolicyVersionRequest;
  readonly output: typeof SetDefaultPolicyVersionOutput;
} = {
  name: "SetDefaultPolicyVersion",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#SetDefaultPolicyVersionRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#SetDefaultPolicyVersionRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          VersionId: {
            target: "com.amazonaws.iam#policyVersionIdType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#policyVersionIdType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: SetDefaultPolicyVersionRequest,
  output: SetDefaultPolicyVersionOutput,
  errors: createServiceLinkedRoleErrors,
};

export const TagMFADeviceOutput = Schema.Void;

export const tagMFADeviceOperation: AwsQueryOperation & {
  readonly input: typeof TagMFADeviceRequest;
  readonly output: typeof TagMFADeviceOutput;
} = {
  name: "TagMFADevice",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#TagMFADeviceRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#TagMFADeviceRequest": {
        type: "structure",
        members: {
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: TagMFADeviceRequest,
  output: TagMFADeviceOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const TagOpenIDConnectProviderOutput = Schema.Void;

export const tagOpenIDConnectProviderOperation: AwsQueryOperation & {
  readonly input: typeof TagOpenIDConnectProviderRequest;
  readonly output: typeof TagOpenIDConnectProviderOutput;
} = {
  name: "TagOpenIDConnectProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#TagOpenIDConnectProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#TagOpenIDConnectProviderRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: TagOpenIDConnectProviderRequest,
  output: TagOpenIDConnectProviderOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const TagPolicyOutput = Schema.Void;

export const tagPolicyOperation: AwsQueryOperation & {
  readonly input: typeof TagPolicyRequest;
  readonly output: typeof TagPolicyOutput;
} = {
  name: "TagPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#TagPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#TagPolicyRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: TagPolicyRequest,
  output: TagPolicyOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const TagRoleOutput = Schema.Void;

export const tagRoleOperation: AwsQueryOperation & {
  readonly input: typeof TagRoleRequest;
  readonly output: typeof TagRoleOutput;
} = {
  name: "TagRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#TagRoleRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#TagRoleRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: TagRoleRequest,
  output: TagRoleOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const TagSAMLProviderOutput = Schema.Void;

export const tagSAMLProviderOperation: AwsQueryOperation & {
  readonly input: typeof TagSAMLProviderRequest;
  readonly output: typeof TagSAMLProviderOutput;
} = {
  name: "TagSAMLProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#TagSAMLProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#TagSAMLProviderRequest": {
        type: "structure",
        members: {
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: TagSAMLProviderRequest,
  output: TagSAMLProviderOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const TagServerCertificateOutput = Schema.Void;

export const tagServerCertificateOperation: AwsQueryOperation & {
  readonly input: typeof TagServerCertificateRequest;
  readonly output: typeof TagServerCertificateOutput;
} = {
  name: "TagServerCertificate",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#TagServerCertificateRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#TagServerCertificateRequest": {
        type: "structure",
        members: {
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#serverCertificateNameType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: TagServerCertificateRequest,
  output: TagServerCertificateOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const TagUserOutput = Schema.Void;

export const tagUserOperation: AwsQueryOperation & {
  readonly input: typeof TagUserRequest;
  readonly output: typeof TagUserOutput;
} = {
  name: "TagUser",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#TagUserRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#TagUserRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: TagUserRequest,
  output: TagUserOutput,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const UntagMFADeviceOutput = Schema.Void;

export const untagMFADeviceOperation: AwsQueryOperation & {
  readonly input: typeof UntagMFADeviceRequest;
  readonly output: typeof UntagMFADeviceOutput;
} = {
  name: "UntagMFADevice",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UntagMFADeviceRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UntagMFADeviceRequest": {
        type: "structure",
        members: {
          SerialNumber: {
            target: "com.amazonaws.iam#serialNumberType",
          },
          TagKeys: {
            target: "com.amazonaws.iam#tagKeyListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#tagKeyType",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UntagMFADeviceRequest,
  output: UntagMFADeviceOutput,
  errors: removeClientIDFromOpenIDConnectProviderErrors,
};

export const UntagOpenIDConnectProviderOutput = Schema.Void;

export const untagOpenIDConnectProviderOperation: AwsQueryOperation & {
  readonly input: typeof UntagOpenIDConnectProviderRequest;
  readonly output: typeof UntagOpenIDConnectProviderOutput;
} = {
  name: "UntagOpenIDConnectProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UntagOpenIDConnectProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UntagOpenIDConnectProviderRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TagKeys: {
            target: "com.amazonaws.iam#tagKeyListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#tagKeyType",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UntagOpenIDConnectProviderRequest,
  output: UntagOpenIDConnectProviderOutput,
  errors: removeClientIDFromOpenIDConnectProviderErrors,
};

export const UntagPolicyOutput = Schema.Void;

export const untagPolicyOperation: AwsQueryOperation & {
  readonly input: typeof UntagPolicyRequest;
  readonly output: typeof UntagPolicyOutput;
} = {
  name: "UntagPolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UntagPolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UntagPolicyRequest": {
        type: "structure",
        members: {
          PolicyArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TagKeys: {
            target: "com.amazonaws.iam#tagKeyListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#tagKeyType",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UntagPolicyRequest,
  output: UntagPolicyOutput,
  errors: removeClientIDFromOpenIDConnectProviderErrors,
};

export const UntagRoleOutput = Schema.Void;

export const untagRoleOperation: AwsQueryOperation & {
  readonly input: typeof UntagRoleRequest;
  readonly output: typeof UntagRoleOutput;
} = {
  name: "UntagRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UntagRoleRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UntagRoleRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          TagKeys: {
            target: "com.amazonaws.iam#tagKeyListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#tagKeyType",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UntagRoleRequest,
  output: UntagRoleOutput,
  errors: untagRoleErrors,
};

export const UntagSAMLProviderOutput = Schema.Void;

export const untagSAMLProviderOperation: AwsQueryOperation & {
  readonly input: typeof UntagSAMLProviderRequest;
  readonly output: typeof UntagSAMLProviderOutput;
} = {
  name: "UntagSAMLProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UntagSAMLProviderRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UntagSAMLProviderRequest": {
        type: "structure",
        members: {
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          TagKeys: {
            target: "com.amazonaws.iam#tagKeyListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#tagKeyType",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UntagSAMLProviderRequest,
  output: UntagSAMLProviderOutput,
  errors: removeClientIDFromOpenIDConnectProviderErrors,
};

export const UntagServerCertificateOutput = Schema.Void;

export const untagServerCertificateOperation: AwsQueryOperation & {
  readonly input: typeof UntagServerCertificateRequest;
  readonly output: typeof UntagServerCertificateOutput;
} = {
  name: "UntagServerCertificate",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UntagServerCertificateRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UntagServerCertificateRequest": {
        type: "structure",
        members: {
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
          TagKeys: {
            target: "com.amazonaws.iam#tagKeyListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#serverCertificateNameType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#tagKeyType",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UntagServerCertificateRequest,
  output: UntagServerCertificateOutput,
  errors: removeClientIDFromOpenIDConnectProviderErrors,
};

export const UntagUserOutput = Schema.Void;

export const untagUserOperation: AwsQueryOperation & {
  readonly input: typeof UntagUserRequest;
  readonly output: typeof UntagUserOutput;
} = {
  name: "UntagUser",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UntagUserRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UntagUserRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          TagKeys: {
            target: "com.amazonaws.iam#tagKeyListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#tagKeyType",
        },
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UntagUserRequest,
  output: UntagUserOutput,
  errors: untagRoleErrors,
};

export const UpdateAccessKeyOutput = Schema.Void;

export const updateAccessKeyOperation: AwsQueryOperation & {
  readonly input: typeof UpdateAccessKeyRequest;
  readonly output: typeof UpdateAccessKeyOutput;
} = {
  name: "UpdateAccessKey",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateAccessKeyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UpdateAccessKeyRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          AccessKeyId: {
            target: "com.amazonaws.iam#accessKeyIdType",
          },
          Status: {
            target: "com.amazonaws.iam#statusType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#accessKeyIdType": {
        type: "string",
      },
      "com.amazonaws.iam#statusType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateAccessKeyRequest,
  output: UpdateAccessKeyOutput,
  errors: createServiceLinkedRoleErrors,
};

export const UpdateAssumeRolePolicyOutput = Schema.Void;

export const updateAssumeRolePolicyOperation: AwsQueryOperation & {
  readonly input: typeof UpdateAssumeRolePolicyRequest;
  readonly output: typeof UpdateAssumeRolePolicyOutput;
} = {
  name: "UpdateAssumeRolePolicy",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateAssumeRolePolicyRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UpdateAssumeRolePolicyRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          PolicyDocument: {
            target: "com.amazonaws.iam#policyDocumentType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#policyDocumentType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateAssumeRolePolicyRequest,
  output: UpdateAssumeRolePolicyOutput,
  errors: putRolePolicyErrors,
};

export const UpdateGroupOutput = Schema.Void;

export const updateGroupOperation: AwsQueryOperation & {
  readonly input: typeof UpdateGroupRequest;
  readonly output: typeof UpdateGroupOutput;
} = {
  name: "UpdateGroup",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateGroupRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UpdateGroupRequest": {
        type: "structure",
        members: {
          GroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
          NewPath: {
            target: "com.amazonaws.iam#pathType",
          },
          NewGroupName: {
            target: "com.amazonaws.iam#groupNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#groupNameType": {
        type: "string",
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateGroupRequest,
  output: UpdateGroupOutput,
  errors: createGroupErrors,
};

export const UpdateLoginProfileOutput = Schema.Void;

export const updateLoginProfileOperation: AwsQueryOperation & {
  readonly input: typeof UpdateLoginProfileRequest;
  readonly output: typeof UpdateLoginProfileOutput;
} = {
  name: "UpdateLoginProfile",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateLoginProfileRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UpdateLoginProfileRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#userNameType",
          },
          Password: {
            target: "com.amazonaws.iam#passwordType",
          },
          PasswordResetRequired: {
            target: "com.amazonaws.iam#booleanObjectType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
      "com.amazonaws.iam#passwordType": {
        type: "string",
      },
      "com.amazonaws.iam#booleanObjectType": {
        type: "boolean",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateLoginProfileRequest,
  output: UpdateLoginProfileOutput,
  errors: updateLoginProfileErrors,
};

export const UpdateOpenIDConnectProviderThumbprintOutput = Schema.Void;

export const updateOpenIDConnectProviderThumbprintOperation: AwsQueryOperation & {
  readonly input: typeof UpdateOpenIDConnectProviderThumbprintRequest;
  readonly output: typeof UpdateOpenIDConnectProviderThumbprintOutput;
} = {
  name: "UpdateOpenIDConnectProviderThumbprint",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateOpenIDConnectProviderThumbprintRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UpdateOpenIDConnectProviderThumbprintRequest": {
        type: "structure",
        members: {
          OpenIDConnectProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          ThumbprintList: {
            target: "com.amazonaws.iam#thumbprintListType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#thumbprintListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#thumbprintType",
        },
      },
      "com.amazonaws.iam#thumbprintType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateOpenIDConnectProviderThumbprintRequest,
  output: UpdateOpenIDConnectProviderThumbprintOutput,
  errors: removeClientIDFromOpenIDConnectProviderErrors,
};

export const updateRoleOperation: AwsQueryOperation & {
  readonly input: typeof UpdateRoleRequest;
  readonly output: typeof UpdateRoleResponse;
} = {
  name: "UpdateRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateRoleRequest",
    output: "com.amazonaws.iam#UpdateRoleResponse",
    shapes: {
      "com.amazonaws.iam#UpdateRoleRequest": {
        type: "structure",
        members: {
          RoleName: {
            target: "com.amazonaws.iam#roleNameType",
          },
          Description: {
            target: "com.amazonaws.iam#roleDescriptionType",
          },
          MaxSessionDuration: {
            target: "com.amazonaws.iam#roleMaxSessionDurationType",
          },
        },
      },
      "com.amazonaws.iam#UpdateRoleResponse": {
        type: "structure",
        members: {},
      },
      "com.amazonaws.iam#roleNameType": {
        type: "string",
      },
      "com.amazonaws.iam#roleDescriptionType": {
        type: "string",
      },
      "com.amazonaws.iam#roleMaxSessionDurationType": {
        type: "number",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateRoleRequest,
  output: UpdateRoleResponse,
  errors: deleteRolePermissionsBoundaryErrors,
};

export const updateSAMLProviderOperation: AwsQueryOperation & {
  readonly input: typeof UpdateSAMLProviderRequest;
  readonly output: typeof UpdateSAMLProviderResponse;
} = {
  name: "UpdateSAMLProvider",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateSAMLProviderRequest",
    output: "com.amazonaws.iam#UpdateSAMLProviderResponse",
    shapes: {
      "com.amazonaws.iam#UpdateSAMLProviderRequest": {
        type: "structure",
        members: {
          SAMLMetadataDocument: {
            target: "com.amazonaws.iam#SAMLMetadataDocumentType",
          },
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
          AssertionEncryptionMode: {
            target: "com.amazonaws.iam#assertionEncryptionModeType",
          },
          AddPrivateKey: {
            target: "com.amazonaws.iam#privateKeyType",
          },
          RemovePrivateKey: {
            target: "com.amazonaws.iam#privateKeyIdType",
          },
        },
      },
      "com.amazonaws.iam#UpdateSAMLProviderResponse": {
        type: "structure",
        members: {
          SAMLProviderArn: {
            target: "com.amazonaws.iam#arnType",
          },
        },
      },
      "com.amazonaws.iam#SAMLMetadataDocumentType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#assertionEncryptionModeType": {
        type: "string",
      },
      "com.amazonaws.iam#privateKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#privateKeyIdType": {
        type: "string",
      },
      "smithy.api#Unit": {
        type: "unit",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateSAMLProviderRequest,
  output: UpdateSAMLProviderResponse,
  errors: addClientIDToOpenIDConnectProviderErrors,
};

export const UpdateServerCertificateOutput = Schema.Void;

export const updateServerCertificateOperation: AwsQueryOperation & {
  readonly input: typeof UpdateServerCertificateRequest;
  readonly output: typeof UpdateServerCertificateOutput;
} = {
  name: "UpdateServerCertificate",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateServerCertificateRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UpdateServerCertificateRequest": {
        type: "structure",
        members: {
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
          NewPath: {
            target: "com.amazonaws.iam#pathType",
          },
          NewServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#serverCertificateNameType": {
        type: "string",
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateServerCertificateRequest,
  output: UpdateServerCertificateOutput,
  errors: createGroupErrors,
};

export const UpdateUserOutput = Schema.Void;

export const updateUserOperation: AwsQueryOperation & {
  readonly input: typeof UpdateUserRequest;
  readonly output: typeof UpdateUserOutput;
} = {
  name: "UpdateUser",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UpdateUserRequest",
    output: "smithy.api#Unit",
    shapes: {
      "com.amazonaws.iam#UpdateUserRequest": {
        type: "structure",
        members: {
          UserName: {
            target: "com.amazonaws.iam#existingUserNameType",
          },
          NewPath: {
            target: "com.amazonaws.iam#pathType",
          },
          NewUserName: {
            target: "com.amazonaws.iam#userNameType",
          },
        },
      },
      "smithy.api#Unit": {
        type: "unit",
      },
      "com.amazonaws.iam#existingUserNameType": {
        type: "string",
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#userNameType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateUserRequest,
  output: UpdateUserOutput,
  errors: updateUserErrors,
};

export const uploadServerCertificateOperation: AwsQueryOperation & {
  readonly input: typeof UploadServerCertificateRequest;
  readonly output: typeof UploadServerCertificateResponse;
} = {
  name: "UploadServerCertificate",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.iam#UploadServerCertificateRequest",
    output: "com.amazonaws.iam#UploadServerCertificateResponse",
    shapes: {
      "com.amazonaws.iam#UploadServerCertificateRequest": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
          CertificateBody: {
            target: "com.amazonaws.iam#certificateBodyType",
          },
          PrivateKey: {
            target: "com.amazonaws.iam#privateKeyType",
          },
          CertificateChain: {
            target: "com.amazonaws.iam#certificateChainType",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#UploadServerCertificateResponse": {
        type: "structure",
        members: {
          ServerCertificateMetadata: {
            target: "com.amazonaws.iam#ServerCertificateMetadata",
          },
          Tags: {
            target: "com.amazonaws.iam#tagListType",
          },
        },
      },
      "com.amazonaws.iam#pathType": {
        type: "string",
      },
      "com.amazonaws.iam#serverCertificateNameType": {
        type: "string",
      },
      "com.amazonaws.iam#certificateBodyType": {
        type: "string",
      },
      "com.amazonaws.iam#privateKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#certificateChainType": {
        type: "string",
      },
      "com.amazonaws.iam#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.iam#Tag",
        },
      },
      "com.amazonaws.iam#ServerCertificateMetadata": {
        type: "structure",
        members: {
          Path: {
            target: "com.amazonaws.iam#pathType",
          },
          ServerCertificateName: {
            target: "com.amazonaws.iam#serverCertificateNameType",
          },
          ServerCertificateId: {
            target: "com.amazonaws.iam#idType",
          },
          Arn: {
            target: "com.amazonaws.iam#arnType",
          },
          UploadDate: {
            target: "com.amazonaws.iam#dateType",
          },
          Expiration: {
            target: "com.amazonaws.iam#dateType",
          },
        },
      },
      "com.amazonaws.iam#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.iam#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.iam#tagValueType",
          },
        },
      },
      "com.amazonaws.iam#idType": {
        type: "string",
      },
      "com.amazonaws.iam#arnType": {
        type: "string",
      },
      "com.amazonaws.iam#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.iam#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.iam#tagValueType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: UploadServerCertificateRequest,
  output: UploadServerCertificateResponse,
  errors: uploadServerCertificateErrors,
};

export const iamOperations = {
  AddClientIDToOpenIDConnectProvider:
    addClientIDToOpenIDConnectProviderOperation,
  AddRoleToInstanceProfile: addRoleToInstanceProfileOperation,
  AddUserToGroup: addUserToGroupOperation,
  AttachGroupPolicy: attachGroupPolicyOperation,
  AttachRolePolicy: attachRolePolicyOperation,
  AttachUserPolicy: attachUserPolicyOperation,
  CreateAccessKey: createAccessKeyOperation,
  CreateGroup: createGroupOperation,
  CreateInstanceProfile: createInstanceProfileOperation,
  CreateLoginProfile: createLoginProfileOperation,
  CreateOpenIDConnectProvider: createOpenIDConnectProviderOperation,
  CreatePolicy: createPolicyOperation,
  CreatePolicyVersion: createPolicyVersionOperation,
  CreateRole: createRoleOperation,
  CreateSAMLProvider: createSAMLProviderOperation,
  CreateServiceLinkedRole: createServiceLinkedRoleOperation,
  CreateUser: createUserOperation,
  CreateVirtualMFADevice: createVirtualMFADeviceOperation,
  DeactivateMFADevice: deactivateMFADeviceOperation,
  DeleteAccessKey: deleteAccessKeyOperation,
  DeleteGroup: deleteGroupOperation,
  DeleteGroupPolicy: deleteGroupPolicyOperation,
  DeleteInstanceProfile: deleteInstanceProfileOperation,
  DeleteLoginProfile: deleteLoginProfileOperation,
  DeleteOpenIDConnectProvider: deleteOpenIDConnectProviderOperation,
  DeletePolicy: deletePolicyOperation,
  DeletePolicyVersion: deletePolicyVersionOperation,
  DeleteRole: deleteRoleOperation,
  DeleteRolePermissionsBoundary: deleteRolePermissionsBoundaryOperation,
  DeleteRolePolicy: deleteRolePolicyOperation,
  DeleteSAMLProvider: deleteSAMLProviderOperation,
  DeleteServerCertificate: deleteServerCertificateOperation,
  DeleteServiceLinkedRole: deleteServiceLinkedRoleOperation,
  DeleteUser: deleteUserOperation,
  DeleteUserPermissionsBoundary: deleteUserPermissionsBoundaryOperation,
  DeleteUserPolicy: deleteUserPolicyOperation,
  DeleteVirtualMFADevice: deleteVirtualMFADeviceOperation,
  DetachGroupPolicy: detachGroupPolicyOperation,
  DetachRolePolicy: detachRolePolicyOperation,
  DetachUserPolicy: detachUserPolicyOperation,
  EnableMFADevice: enableMFADeviceOperation,
  GetGroup: getGroupOperation,
  GetGroupPolicy: getGroupPolicyOperation,
  GetInstanceProfile: getInstanceProfileOperation,
  GetLoginProfile: getLoginProfileOperation,
  GetOpenIDConnectProvider: getOpenIDConnectProviderOperation,
  GetPolicy: getPolicyOperation,
  GetPolicyVersion: getPolicyVersionOperation,
  GetRole: getRoleOperation,
  GetRolePolicy: getRolePolicyOperation,
  GetSAMLProvider: getSAMLProviderOperation,
  GetServerCertificate: getServerCertificateOperation,
  GetServiceLinkedRoleDeletionStatus:
    getServiceLinkedRoleDeletionStatusOperation,
  GetUser: getUserOperation,
  GetUserPolicy: getUserPolicyOperation,
  ListAccessKeys: listAccessKeysOperation,
  ListAttachedGroupPolicies: listAttachedGroupPoliciesOperation,
  ListAttachedRolePolicies: listAttachedRolePoliciesOperation,
  ListAttachedUserPolicies: listAttachedUserPoliciesOperation,
  ListEntitiesForPolicy: listEntitiesForPolicyOperation,
  ListGroupPolicies: listGroupPoliciesOperation,
  ListGroupsForUser: listGroupsForUserOperation,
  ListMFADeviceTags: listMFADeviceTagsOperation,
  ListMFADevices: listMFADevicesOperation,
  ListOpenIDConnectProviderTags: listOpenIDConnectProviderTagsOperation,
  ListPolicyVersions: listPolicyVersionsOperation,
  ListRolePolicies: listRolePoliciesOperation,
  ListSAMLProviderTags: listSAMLProviderTagsOperation,
  ListServerCertificateTags: listServerCertificateTagsOperation,
  ListUserPolicies: listUserPoliciesOperation,
  ListUserTags: listUserTagsOperation,
  ListVirtualMFADevices: listVirtualMFADevicesOperation,
  PutGroupPolicy: putGroupPolicyOperation,
  PutRolePermissionsBoundary: putRolePermissionsBoundaryOperation,
  PutRolePolicy: putRolePolicyOperation,
  PutUserPermissionsBoundary: putUserPermissionsBoundaryOperation,
  PutUserPolicy: putUserPolicyOperation,
  RemoveClientIDFromOpenIDConnectProvider:
    removeClientIDFromOpenIDConnectProviderOperation,
  RemoveRoleFromInstanceProfile: removeRoleFromInstanceProfileOperation,
  RemoveUserFromGroup: removeUserFromGroupOperation,
  SetDefaultPolicyVersion: setDefaultPolicyVersionOperation,
  TagMFADevice: tagMFADeviceOperation,
  TagOpenIDConnectProvider: tagOpenIDConnectProviderOperation,
  TagPolicy: tagPolicyOperation,
  TagRole: tagRoleOperation,
  TagSAMLProvider: tagSAMLProviderOperation,
  TagServerCertificate: tagServerCertificateOperation,
  TagUser: tagUserOperation,
  UntagMFADevice: untagMFADeviceOperation,
  UntagOpenIDConnectProvider: untagOpenIDConnectProviderOperation,
  UntagPolicy: untagPolicyOperation,
  UntagRole: untagRoleOperation,
  UntagSAMLProvider: untagSAMLProviderOperation,
  UntagServerCertificate: untagServerCertificateOperation,
  UntagUser: untagUserOperation,
  UpdateAccessKey: updateAccessKeyOperation,
  UpdateAssumeRolePolicy: updateAssumeRolePolicyOperation,
  UpdateGroup: updateGroupOperation,
  UpdateLoginProfile: updateLoginProfileOperation,
  UpdateOpenIDConnectProviderThumbprint:
    updateOpenIDConnectProviderThumbprintOperation,
  UpdateRole: updateRoleOperation,
  UpdateSAMLProvider: updateSAMLProviderOperation,
  UpdateServerCertificate: updateServerCertificateOperation,
  UpdateUser: updateUserOperation,
  UploadServerCertificate: uploadServerCertificateOperation,
};

export const iamService: AwsServiceDefinition = {
  service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
  version: "2010-05-08",
  protocol: "awsQuery",
  signingName: "iam",
  endpointRules: {
    version: "1.0",
    parameters: {
      UseDualStack: {
        type: "boolean",
        required: true,
        default: false,
      },
      UseFIPS: {
        type: "boolean",
        required: true,
        default: false,
      },
      Endpoint: {
        type: "string",
        required: false,
      },
      Region: {
        type: "string",
        required: false,
      },
    },
    rules: [
      {
        conditions: [
          {
            fn: "isSet",
            argv: [
              {
                ref: "Endpoint",
              },
            ],
          },
        ],
        rules: [
          {
            conditions: [
              {
                fn: "booleanEquals",
                argv: [
                  {
                    ref: "UseFIPS",
                  },
                  true,
                ],
              },
            ],
            error:
              "Invalid Configuration: FIPS and custom endpoint are not supported",
            type: "error",
          },
          {
            conditions: [],
            rules: [
              {
                conditions: [
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseDualStack",
                      },
                      true,
                    ],
                  },
                ],
                error:
                  "Invalid Configuration: Dualstack and custom endpoint are not supported",
                type: "error",
              },
              {
                conditions: [],
                endpoint: {
                  url: {
                    ref: "Endpoint",
                  },
                  properties: {},
                  headers: {},
                },
                type: "endpoint",
              },
            ],
            type: "tree",
          },
        ],
        type: "tree",
      },
      {
        conditions: [],
        rules: [
          {
            conditions: [
              {
                fn: "isSet",
                argv: [
                  {
                    ref: "Region",
                  },
                ],
              },
            ],
            rules: [
              {
                conditions: [
                  {
                    fn: "aws.partition",
                    argv: [
                      {
                        ref: "Region",
                      },
                    ],
                    assign: "PartitionResult",
                  },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.amazonaws.com",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.amazonaws.com",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.global.api.aws",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.global.api.aws",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-cn",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.global.api.amazonwebservices.com.cn",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "cn-north-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-cn",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.api.amazonwebservices.com.cn",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "cn-north-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-cn",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.cn-north-1.amazonaws.com.cn",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "cn-north-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-cn",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.amazonaws.com.cn",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "cn-north-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-us-gov",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.us-gov.api.aws",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-gov-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-us-gov",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.us-gov.api.aws",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-gov-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-us-gov",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.us-gov.amazonaws.com",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-gov-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-us-gov",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.us-gov.amazonaws.com",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-gov-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.us-iso-east-1.c2s.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-iso-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.us-iso-east-1.c2s.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-iso-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.api.aws.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-iso-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.api.aws.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-iso-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-b",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.us-isob-east-1.sc2s.sgov.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isob-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-b",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.us-isob-east-1.sc2s.sgov.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isob-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-b",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.api.aws.scloud",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isob-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-b",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.api.aws.scloud",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isob-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-e",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.eu-isoe-west-1.cloud.adc-e.uk",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eu-isoe-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-e",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.cloud.adc-e.uk",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eu-isoe-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-e",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.api.cloud-aws.adc-e.uk",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eu-isoe-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-e",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.api.cloud-aws.adc-e.uk",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eu-isoe-west-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-f",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.us-isof-south-1.csp.hci.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isof-south-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-f",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.csp.hci.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isof-south-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-f",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.api.aws.hci.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isof-south-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-iso-f",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.api.aws.hci.ic.gov",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "us-isof-south-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-eusc",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.eusc-de-east-1.amazonaws.eu",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eusc-de-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-eusc",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.amazonaws.eu",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eusc-de-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-eusc",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam.global.api.amazonwebservices.eu",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eusc-de-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "stringEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "name",
                            ],
                          },
                          "aws-eusc",
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    endpoint: {
                      url: "https://iam-fips.api.amazonwebservices.eu",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion: "eusc-de-east-1",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [
                          {
                            fn: "booleanEquals",
                            argv: [
                              true,
                              {
                                fn: "getAttr",
                                argv: [
                                  {
                                    ref: "PartitionResult",
                                  },
                                  "supportsFIPS",
                                ],
                              },
                            ],
                          },
                          {
                            fn: "booleanEquals",
                            argv: [
                              true,
                              {
                                fn: "getAttr",
                                argv: [
                                  {
                                    ref: "PartitionResult",
                                  },
                                  "supportsDualStack",
                                ],
                              },
                            ],
                          },
                        ],
                        rules: [
                          {
                            conditions: [],
                            endpoint: {
                              url: "https://iam-fips.{PartitionResult#implicitGlobalRegion}.{PartitionResult#dualStackDnsSuffix}",
                              properties: {
                                authSchemes: [
                                  {
                                    name: "sigv4",
                                    signingRegion:
                                      "{PartitionResult#implicitGlobalRegion}",
                                  },
                                ],
                              },
                              headers: {},
                            },
                            type: "endpoint",
                          },
                        ],
                        type: "tree",
                      },
                      {
                        conditions: [],
                        error:
                          "FIPS and DualStack are enabled, but this partition does not support one or both",
                        type: "error",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          true,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          false,
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [
                          {
                            fn: "booleanEquals",
                            argv: [
                              {
                                fn: "getAttr",
                                argv: [
                                  {
                                    ref: "PartitionResult",
                                  },
                                  "supportsFIPS",
                                ],
                              },
                              true,
                            ],
                          },
                        ],
                        rules: [
                          {
                            conditions: [],
                            endpoint: {
                              url: "https://iam-fips.{PartitionResult#implicitGlobalRegion}.{PartitionResult#dnsSuffix}",
                              properties: {
                                authSchemes: [
                                  {
                                    name: "sigv4",
                                    signingRegion:
                                      "{PartitionResult#implicitGlobalRegion}",
                                  },
                                ],
                              },
                              headers: {},
                            },
                            type: "endpoint",
                          },
                        ],
                        type: "tree",
                      },
                      {
                        conditions: [],
                        error:
                          "FIPS is enabled but this partition does not support FIPS",
                        type: "error",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseFIPS",
                          },
                          false,
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            ref: "UseDualStack",
                          },
                          true,
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [
                          {
                            fn: "booleanEquals",
                            argv: [
                              true,
                              {
                                fn: "getAttr",
                                argv: [
                                  {
                                    ref: "PartitionResult",
                                  },
                                  "supportsDualStack",
                                ],
                              },
                            ],
                          },
                        ],
                        rules: [
                          {
                            conditions: [],
                            endpoint: {
                              url: "https://iam.{PartitionResult#implicitGlobalRegion}.{PartitionResult#dualStackDnsSuffix}",
                              properties: {
                                authSchemes: [
                                  {
                                    name: "sigv4",
                                    signingRegion:
                                      "{PartitionResult#implicitGlobalRegion}",
                                  },
                                ],
                              },
                              headers: {},
                            },
                            type: "endpoint",
                          },
                        ],
                        type: "tree",
                      },
                      {
                        conditions: [],
                        error:
                          "DualStack is enabled but this partition does not support DualStack",
                        type: "error",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [],
                    endpoint: {
                      url: "https://iam.{PartitionResult#implicitGlobalRegion}.{PartitionResult#dnsSuffix}",
                      properties: {
                        authSchemes: [
                          {
                            name: "sigv4",
                            signingRegion:
                              "{PartitionResult#implicitGlobalRegion}",
                          },
                        ],
                      },
                      headers: {},
                    },
                    type: "endpoint",
                  },
                ],
                type: "tree",
              },
            ],
            type: "tree",
          },
          {
            conditions: [],
            error: "Invalid Configuration: Missing Region",
            type: "error",
          },
        ],
        type: "tree",
      },
    ],
  },
  xmlNamespace: "https://iam.amazonaws.com/doc/2010-05-08/",
};

/** The makeIAMClient Effect gives callers access to IAM with the region and credentials configured in their AWS runtime. */
export const makeIAMClient = Effect.gen(function* () {
  const aws = yield* AwsClient;

  const bindOperation = aws.bindOperation(iamService);
  const bindOperationPages = aws.bindOperationPages(iamService);

  return {
    /** Adds a new client ID (also known as audience) to the list of client IDs already registered for the specified IAM OpenID Connect (OIDC) provider resource. Success means AWS accepted the request. */
    addClientIDToOpenIDConnectProvider: bindOperation(
      addClientIDToOpenIDConnectProviderOperation,
    ),
    /** Adds the specified IAM role to the specified instance profile. An instance profile can contain only one role, and this quota cannot be increased. You can remove the existing role and then add a different role to an instance profile. You must then wait for the change to appear across all of Amazon Web Services because of eventual consistency. To force the change, you must disassociate the instance profile and then associate the instance profile, or you can stop your instance and then restart it. Success means AWS accepted the request. */
    addRoleToInstanceProfile: bindOperation(addRoleToInstanceProfileOperation),
    /** Adds the specified user to the specified group. Success means AWS accepted the request. */
    addUserToGroup: bindOperation(addUserToGroupOperation),
    /** Attaches the specified managed policy to the specified IAM group. Success means AWS accepted the request. */
    attachGroupPolicy: bindOperation(attachGroupPolicyOperation),
    /** Attaches the specified managed policy to the specified IAM role. When you attach a managed policy to a role, the managed policy becomes part of the role's permission (access) policy. Success means AWS accepted the request. */
    attachRolePolicy: bindOperation(attachRolePolicyOperation),
    /** Attaches the specified managed policy to the specified user. Success means AWS accepted the request. */
    attachUserPolicy: bindOperation(attachUserPolicyOperation),
    /** Creates a new Amazon Web Services secret access key and corresponding Amazon Web Services access key ID for the specified user. The default status for new keys is Active. */
    createAccessKey: bindOperation(createAccessKeyOperation),
    /** Creates a new group. */
    createGroup: bindOperation(createGroupOperation),
    /** Creates a new instance profile. For information about instance profiles, see Using roles for applications on Amazon EC2 in the IAM User Guide, and Instance profiles in the Amazon EC2 User Guide. */
    createInstanceProfile: bindOperation(createInstanceProfileOperation),
    /** Creates a password for the specified IAM user. A password allows an IAM user to access Amazon Web Services services through the Amazon Web Services Management Console. */
    createLoginProfile: bindOperation(createLoginProfileOperation),
    /** Creates an IAM entity to describe an identity provider (IdP) that supports OpenID Connect (OIDC). */
    createOpenIDConnectProvider: bindOperation(
      createOpenIDConnectProviderOperation,
    ),
    /** Creates a new managed policy for your Amazon Web Services account. */
    createPolicy: bindOperation(createPolicyOperation),
    /** Creates a new version of the specified managed policy. To update a managed policy, you create a new policy version. A managed policy can have up to five versions. If the policy has five versions, you must delete an existing version using DeletePolicyVersion before you create a new version. */
    createPolicyVersion: bindOperation(createPolicyVersionOperation),
    /** Creates a new role for your Amazon Web Services account. */
    createRole: bindOperation(createRoleOperation),
    /** Creates an IAM resource that describes an identity provider (IdP) that supports SAML 2.0. */
    createSAMLProvider: bindOperation(createSAMLProviderOperation),
    /** Creates an IAM role that is linked to a specific Amazon Web Services service. The service controls the attached policies and when the role can be deleted. This helps ensure that the service is not broken by an unexpectedly changed or deleted role, which could put your Amazon Web Services resources into an unknown state. Allowing the service to control the role helps improve service stability and proper cleanup when a service and its role are no longer needed. For more information, see Using service-linked roles in the IAM User Guide. */
    createServiceLinkedRole: bindOperation(createServiceLinkedRoleOperation),
    /** Creates a new IAM user for your Amazon Web Services account. */
    createUser: bindOperation(createUserOperation),
    /** Creates a new virtual MFA device for the Amazon Web Services account. After creating the virtual MFA, use EnableMFADevice to attach the MFA device to an IAM user. For more information about creating and working with virtual MFA devices, see Using a virtual MFA device in the IAM User Guide. */
    createVirtualMFADevice: bindOperation(createVirtualMFADeviceOperation),
    /** Deactivates the specified MFA device and removes it from association with the user name for which it was originally enabled. Success means AWS accepted the request. */
    deactivateMFADevice: bindOperation(deactivateMFADeviceOperation),
    /** Deletes the access key pair associated with the specified IAM user. Success means AWS accepted the request. */
    deleteAccessKey: bindOperation(deleteAccessKeyOperation),
    /** Deletes the specified IAM group. The group must not contain any users or have any attached policies. Success means AWS accepted the request. */
    deleteGroup: bindOperation(deleteGroupOperation),
    /** Deletes the specified inline policy that is embedded in the specified IAM group. Success means AWS accepted the request. */
    deleteGroupPolicy: bindOperation(deleteGroupPolicyOperation),
    /** Deletes the specified instance profile. The instance profile must not have an associated role. Success means AWS accepted the request. */
    deleteInstanceProfile: bindOperation(deleteInstanceProfileOperation),
    /** Deletes the password for the specified IAM user or root user, For more information, see Managing passwords for IAM users. Success means AWS accepted the request. */
    deleteLoginProfile: bindOperation(deleteLoginProfileOperation),
    /** Deletes an OpenID Connect identity provider (IdP) resource object in IAM. Success means AWS accepted the request. */
    deleteOpenIDConnectProvider: bindOperation(
      deleteOpenIDConnectProviderOperation,
    ),
    /** Deletes the specified managed policy. Success means AWS accepted the request. */
    deletePolicy: bindOperation(deletePolicyOperation),
    /** Deletes the specified version from the specified managed policy. Success means AWS accepted the request. */
    deletePolicyVersion: bindOperation(deletePolicyVersionOperation),
    /** Deletes the specified role. Unlike the Amazon Web Services Management Console, when you delete a role programmatically, you must delete the items attached to the role manually, or the deletion fails. For more information, see Deleting an IAM role. Before attempting to delete a role, remove the following attached items: Success means AWS accepted the request. */
    deleteRole: bindOperation(deleteRoleOperation),
    /** Deletes the permissions boundary for the specified IAM role. Success means AWS accepted the request. */
    deleteRolePermissionsBoundary: bindOperation(
      deleteRolePermissionsBoundaryOperation,
    ),
    /** Deletes the specified inline policy that is embedded in the specified IAM role. Success means AWS accepted the request. */
    deleteRolePolicy: bindOperation(deleteRolePolicyOperation),
    /** Deletes a SAML provider resource in IAM. Success means AWS accepted the request. */
    deleteSAMLProvider: bindOperation(deleteSAMLProviderOperation),
    /** Deletes the specified server certificate. Success means AWS accepted the request. */
    deleteServerCertificate: bindOperation(deleteServerCertificateOperation),
    /** Submits a service-linked role deletion request and returns a DeletionTaskId, which you can use to check the status of the deletion. Before you call this operation, confirm that the role has no active sessions and that any resources used by the role in the linked service are deleted. If you call this operation more than once for the same service-linked role and an earlier deletion task is not complete, then the DeletionTaskId of the earlier request is returned. */
    deleteServiceLinkedRole: bindOperation(deleteServiceLinkedRoleOperation),
    /** Deletes the specified IAM user. Unlike the Amazon Web Services Management Console, when you delete a user programmatically, you must delete the items attached to the user manually, or the deletion fails. For more information, see Deleting an IAM user. Before attempting to delete a user, remove the following items: Success means AWS accepted the request. */
    deleteUser: bindOperation(deleteUserOperation),
    /** Deletes the permissions boundary for the specified IAM user. Success means AWS accepted the request. */
    deleteUserPermissionsBoundary: bindOperation(
      deleteUserPermissionsBoundaryOperation,
    ),
    /** Deletes the specified inline policy that is embedded in the specified IAM user. Success means AWS accepted the request. */
    deleteUserPolicy: bindOperation(deleteUserPolicyOperation),
    /** Deletes a virtual MFA device. Success means AWS accepted the request. */
    deleteVirtualMFADevice: bindOperation(deleteVirtualMFADeviceOperation),
    /** Removes the specified managed policy from the specified IAM group. Success means AWS accepted the request. */
    detachGroupPolicy: bindOperation(detachGroupPolicyOperation),
    /** Removes the specified managed policy from the specified role. Success means AWS accepted the request. */
    detachRolePolicy: bindOperation(detachRolePolicyOperation),
    /** Removes the specified managed policy from the specified user. Success means AWS accepted the request. */
    detachUserPolicy: bindOperation(detachUserPolicyOperation),
    /** Enables the specified MFA device and associates it with the specified IAM user. When enabled, the MFA device is required for every subsequent login by the IAM user associated with the device. Success means AWS accepted the request. */
    enableMFADevice: bindOperation(enableMFADeviceOperation),
    /** Returns a list of IAM users that are in the specified IAM group. You can paginate the results using the MaxItems and Marker parameters. This call returns one page. Use getGroupPages to read subsequent pages. */
    getGroup: bindOperation(getGroupOperation),
    /** Retrieves the specified inline policy document that is embedded in the specified IAM group. */
    getGroupPolicy: bindOperation(getGroupPolicyOperation),
    /** Retrieves information about the specified instance profile, including the instance profile's path, GUID, ARN, and role. For more information about instance profiles, see Using instance profiles in the IAM User Guide. */
    getInstanceProfile: bindOperation(getInstanceProfileOperation),
    /** Retrieves the user name for the specified IAM user. A login profile is created when you create a password for the user to access the Amazon Web Services Management Console. If the user does not exist or does not have a password, the operation returns a 404 (NoSuchEntity) error. */
    getLoginProfile: bindOperation(getLoginProfileOperation),
    /** Returns information about the specified OpenID Connect (OIDC) provider resource object in IAM. */
    getOpenIDConnectProvider: bindOperation(getOpenIDConnectProviderOperation),
    /** Retrieves information about the specified managed policy, including the policy's default version and the total number of IAM users, groups, and roles to which the policy is attached. To retrieve the list of the specific users, groups, and roles that the policy is attached to, use ListEntitiesForPolicy. This operation returns metadata about the policy. To retrieve the actual policy document for a specific version of the policy, use GetPolicyVersion. */
    getPolicy: bindOperation(getPolicyOperation),
    /** Retrieves information about the specified version of the specified managed policy, including the policy document. */
    getPolicyVersion: bindOperation(getPolicyVersionOperation),
    /** Retrieves information about the specified role, including the role's path, GUID, ARN, and the role's trust policy that grants permission to assume the role. For more information about roles, see IAM roles in the IAM User Guide. */
    getRole: bindOperation(getRoleOperation),
    /** Retrieves the specified inline policy document that is embedded with the specified IAM role. */
    getRolePolicy: bindOperation(getRolePolicyOperation),
    /** Returns the SAML provider metadocument that was uploaded when the IAM SAML provider resource object was created or updated. */
    getSAMLProvider: bindOperation(getSAMLProviderOperation),
    /** Retrieves information about the specified server certificate stored in IAM. */
    getServerCertificate: bindOperation(getServerCertificateOperation),
    /** Retrieves the status of your service-linked role deletion. After you use DeleteServiceLinkedRole to submit a service-linked role for deletion, you can use the DeletionTaskId parameter in GetServiceLinkedRoleDeletionStatus to check the status of the deletion. If the deletion fails, this operation returns the reason that it failed, if that information is returned by the service. */
    getServiceLinkedRoleDeletionStatus: bindOperation(
      getServiceLinkedRoleDeletionStatusOperation,
    ),
    /** Retrieves information about the specified IAM user, including the user's creation date, path, unique ID, and ARN. */
    getUser: bindOperation(getUserOperation),
    /** Retrieves the specified inline policy document that is embedded in the specified IAM user. */
    getUserPolicy: bindOperation(getUserPolicyOperation),
    /** Returns information about the access key IDs associated with the specified IAM user. If there is none, the operation returns an empty list. This call returns one page. Use listAccessKeysPages to read subsequent pages. */
    listAccessKeys: bindOperation(listAccessKeysOperation),
    /** Lists all managed policies that are attached to the specified IAM group. This call returns one page. Use listAttachedGroupPoliciesPages to read subsequent pages. */
    listAttachedGroupPolicies: bindOperation(
      listAttachedGroupPoliciesOperation,
    ),
    /** Lists all managed policies that are attached to the specified IAM role. This call returns one page. Use listAttachedRolePoliciesPages to read subsequent pages. */
    listAttachedRolePolicies: bindOperation(listAttachedRolePoliciesOperation),
    /** Lists all managed policies that are attached to the specified IAM user. This call returns one page. Use listAttachedUserPoliciesPages to read subsequent pages. */
    listAttachedUserPolicies: bindOperation(listAttachedUserPoliciesOperation),
    /** Lists all IAM users, groups, and roles that the specified managed policy is attached to. This call returns one page. Use listEntitiesForPolicyPages to read subsequent pages. */
    listEntitiesForPolicy: bindOperation(listEntitiesForPolicyOperation),
    /** Lists the names of the inline policies that are embedded in the specified IAM group. This call returns one page. Use listGroupPoliciesPages to read subsequent pages. */
    listGroupPolicies: bindOperation(listGroupPoliciesOperation),
    /** Lists the IAM groups that the specified IAM user belongs to. This call returns one page. Use listGroupsForUserPages to read subsequent pages. */
    listGroupsForUser: bindOperation(listGroupsForUserOperation),
    /** Lists the tags that are attached to the specified IAM virtual multi-factor authentication (MFA) device. The returned list of tags is sorted by tag key. For more information about tagging, see Tagging IAM resources in the IAM User Guide. This call returns one page. Use listMFADeviceTagsPages to read subsequent pages. */
    listMFADeviceTags: bindOperation(listMFADeviceTagsOperation),
    /** Lists the MFA devices for an IAM user. If the request includes a IAM user name, then this operation lists all the MFA devices associated with the specified user. If you do not specify a user name, IAM determines the user name implicitly based on the Amazon Web Services access key ID signing the request for this operation. This call returns one page. Use listMFADevicesPages to read subsequent pages. */
    listMFADevices: bindOperation(listMFADevicesOperation),
    /** Lists the tags that are attached to the specified OpenID Connect (OIDC)-compatible identity provider. The returned list of tags is sorted by tag key. For more information, see About web identity federation. This call returns one page. Use listOpenIDConnectProviderTagsPages to read subsequent pages. */
    listOpenIDConnectProviderTags: bindOperation(
      listOpenIDConnectProviderTagsOperation,
    ),
    /** Lists information about the versions of the specified managed policy, including the version that is currently set as the policy's default version. This call returns one page. Use listPolicyVersionsPages to read subsequent pages. */
    listPolicyVersions: bindOperation(listPolicyVersionsOperation),
    /** Lists the names of the inline policies that are embedded in the specified IAM role. This call returns one page. Use listRolePoliciesPages to read subsequent pages. */
    listRolePolicies: bindOperation(listRolePoliciesOperation),
    /** Lists the tags that are attached to the specified Security Assertion Markup Language (SAML) identity provider. The returned list of tags is sorted by tag key. For more information, see About SAML 2.0-based federation. This call returns one page. Use listSAMLProviderTagsPages to read subsequent pages. */
    listSAMLProviderTags: bindOperation(listSAMLProviderTagsOperation),
    /** Lists the tags that are attached to the specified IAM server certificate. The returned list of tags is sorted by tag key. For more information about tagging, see Tagging IAM resources in the IAM User Guide. This call returns one page. Use listServerCertificateTagsPages to read subsequent pages. */
    listServerCertificateTags: bindOperation(
      listServerCertificateTagsOperation,
    ),
    /** Lists the names of the inline policies embedded in the specified IAM user. This call returns one page. Use listUserPoliciesPages to read subsequent pages. */
    listUserPolicies: bindOperation(listUserPoliciesOperation),
    /** Lists the tags that are attached to the specified IAM user. The returned list of tags is sorted by tag key. For more information about tagging, see Tagging IAM resources in the IAM User Guide. This call returns one page. Use listUserTagsPages to read subsequent pages. */
    listUserTags: bindOperation(listUserTagsOperation),
    /** Lists the virtual MFA devices defined in the Amazon Web Services account by assignment status. If you do not specify an assignment status, the operation returns a list of all virtual MFA devices. Assignment status can be Assigned, Unassigned, or Any. This call returns one page. Use listVirtualMFADevicesPages to read subsequent pages. */
    listVirtualMFADevices: bindOperation(listVirtualMFADevicesOperation),
    /** Adds or updates an inline policy document that is embedded in the specified IAM group. Success means AWS accepted the request. */
    putGroupPolicy: bindOperation(putGroupPolicyOperation),
    /** Adds or updates the policy that is specified as the IAM role's permissions boundary. You can use an Amazon Web Services managed policy or a customer managed policy to set the boundary for a role. Use the boundary to control the maximum permissions that the role can have. Setting a permissions boundary is an advanced feature that can affect the permissions for the role. Success means AWS accepted the request. */
    putRolePermissionsBoundary: bindOperation(
      putRolePermissionsBoundaryOperation,
    ),
    /** Adds or updates an inline policy document that is embedded in the specified IAM role. Success means AWS accepted the request. */
    putRolePolicy: bindOperation(putRolePolicyOperation),
    /** Adds or updates the policy that is specified as the IAM user's permissions boundary. You can use an Amazon Web Services managed policy or a customer managed policy to set the boundary for a user. Use the boundary to control the maximum permissions that the user can have. Setting a permissions boundary is an advanced feature that can affect the permissions for the user. Success means AWS accepted the request. */
    putUserPermissionsBoundary: bindOperation(
      putUserPermissionsBoundaryOperation,
    ),
    /** Adds or updates an inline policy document that is embedded in the specified IAM user. Success means AWS accepted the request. */
    putUserPolicy: bindOperation(putUserPolicyOperation),
    /** Removes the specified client ID (also known as audience) from the list of client IDs registered for the specified IAM OpenID Connect (OIDC) provider resource object. Success means AWS accepted the request. */
    removeClientIDFromOpenIDConnectProvider: bindOperation(
      removeClientIDFromOpenIDConnectProviderOperation,
    ),
    /** Removes the specified IAM role from the specified Amazon EC2 instance profile. Success means AWS accepted the request. */
    removeRoleFromInstanceProfile: bindOperation(
      removeRoleFromInstanceProfileOperation,
    ),
    /** Removes the specified user from the specified group. Success means AWS accepted the request. */
    removeUserFromGroup: bindOperation(removeUserFromGroupOperation),
    /** Sets the specified version of the specified policy as the policy's default (operative) version. Success means AWS accepted the request. */
    setDefaultPolicyVersion: bindOperation(setDefaultPolicyVersionOperation),
    /** Adds one or more tags to an IAM virtual multi-factor authentication (MFA) device. If a tag with the same key name already exists, then that tag is overwritten with the new value. Success means AWS accepted the request. */
    tagMFADevice: bindOperation(tagMFADeviceOperation),
    /** Adds one or more tags to an OpenID Connect (OIDC)-compatible identity provider. For more information about these providers, see About web identity federation. If a tag with the same key name already exists, then that tag is overwritten with the new value. Success means AWS accepted the request. */
    tagOpenIDConnectProvider: bindOperation(tagOpenIDConnectProviderOperation),
    /** Adds one or more tags to an IAM customer managed policy. If a tag with the same key name already exists, then that tag is overwritten with the new value. Success means AWS accepted the request. */
    tagPolicy: bindOperation(tagPolicyOperation),
    /** Adds one or more tags to an IAM role. The role can be a regular role or a service-linked role. If a tag with the same key name already exists, then that tag is overwritten with the new value. Success means AWS accepted the request. */
    tagRole: bindOperation(tagRoleOperation),
    /** Adds one or more tags to a Security Assertion Markup Language (SAML) identity provider. For more information about these providers, see About SAML 2.0-based federation . If a tag with the same key name already exists, then that tag is overwritten with the new value. Success means AWS accepted the request. */
    tagSAMLProvider: bindOperation(tagSAMLProviderOperation),
    /** Adds one or more tags to an IAM server certificate. If a tag with the same key name already exists, then that tag is overwritten with the new value. Success means AWS accepted the request. */
    tagServerCertificate: bindOperation(tagServerCertificateOperation),
    /** Adds one or more tags to an IAM user. If a tag with the same key name already exists, then that tag is overwritten with the new value. Success means AWS accepted the request. */
    tagUser: bindOperation(tagUserOperation),
    /** Removes the specified tags from the IAM virtual multi-factor authentication (MFA) device. For more information about tagging, see Tagging IAM resources in the IAM User Guide. Success means AWS accepted the request. */
    untagMFADevice: bindOperation(untagMFADeviceOperation),
    /** Removes the specified tags from the specified OpenID Connect (OIDC)-compatible identity provider in IAM. For more information about OIDC providers, see About web identity federation. For more information about tagging, see Tagging IAM resources in the IAM User Guide. Success means AWS accepted the request. */
    untagOpenIDConnectProvider: bindOperation(
      untagOpenIDConnectProviderOperation,
    ),
    /** Removes the specified tags from the customer managed policy. For more information about tagging, see Tagging IAM resources in the IAM User Guide. Success means AWS accepted the request. */
    untagPolicy: bindOperation(untagPolicyOperation),
    /** Removes the specified tags from the role. For more information about tagging, see Tagging IAM resources in the IAM User Guide. Success means AWS accepted the request. */
    untagRole: bindOperation(untagRoleOperation),
    /** Removes the specified tags from the specified Security Assertion Markup Language (SAML) identity provider in IAM. For more information about these providers, see About web identity federation. For more information about tagging, see Tagging IAM resources in the IAM User Guide. Success means AWS accepted the request. */
    untagSAMLProvider: bindOperation(untagSAMLProviderOperation),
    /** Removes the specified tags from the IAM server certificate. For more information about tagging, see Tagging IAM resources in the IAM User Guide. Success means AWS accepted the request. */
    untagServerCertificate: bindOperation(untagServerCertificateOperation),
    /** Removes the specified tags from the user. For more information about tagging, see Tagging IAM resources in the IAM User Guide. Success means AWS accepted the request. */
    untagUser: bindOperation(untagUserOperation),
    /** Changes the status of the specified access key from Active to Inactive, or vice versa. This operation can be used to disable a user's key as part of a key rotation workflow. Success means AWS accepted the request. */
    updateAccessKey: bindOperation(updateAccessKeyOperation),
    /** Updates the policy that grants an IAM entity permission to assume a role. This is typically referred to as the "role trust policy". For more information about roles, see Using roles to delegate permissions and federate identities. Success means AWS accepted the request. */
    updateAssumeRolePolicy: bindOperation(updateAssumeRolePolicyOperation),
    /** Updates the name and/or the path of the specified IAM group. Success means AWS accepted the request. */
    updateGroup: bindOperation(updateGroupOperation),
    /** Changes the password for the specified IAM user. You can use the CLI, the Amazon Web Services API, or the Users page in the IAM console to change the password for any IAM user. Use ChangePassword to change your own password in the My Security Credentials page in the Amazon Web Services Management Console. Success means AWS accepted the request. */
    updateLoginProfile: bindOperation(updateLoginProfileOperation),
    /** Replaces the existing list of server certificate thumbprints associated with an OpenID Connect (OIDC) provider resource object with a new list of thumbprints. Success means AWS accepted the request. */
    updateOpenIDConnectProviderThumbprint: bindOperation(
      updateOpenIDConnectProviderThumbprintOperation,
    ),
    /** Updates the description or maximum session duration setting of a role. */
    updateRole: bindOperation(updateRoleOperation),
    /** Updates the metadata document, SAML encryption settings, and private keys for an existing SAML provider. To rotate private keys, add your new private key and then remove the old key in a separate request. */
    updateSAMLProvider: bindOperation(updateSAMLProviderOperation),
    /** Updates the name and/or the path of the specified server certificate stored in IAM. Success means AWS accepted the request. */
    updateServerCertificate: bindOperation(updateServerCertificateOperation),
    /** Updates the name and/or the path of the specified IAM user. Success means AWS accepted the request. */
    updateUser: bindOperation(updateUserOperation),
    /** Uploads a server certificate entity for the Amazon Web Services account. The server certificate entity includes a public key certificate, a private key, and an optional certificate chain, which should all be PEM-encoded. */
    uploadServerCertificate: bindOperation(uploadServerCertificateOperation),
    /** The getGroupPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    getGroupPages: bindOperationPages(getGroupOperation),
    /** The listAccessKeysPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listAccessKeysPages: bindOperationPages(listAccessKeysOperation),
    /** The listAttachedGroupPoliciesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listAttachedGroupPoliciesPages: bindOperationPages(
      listAttachedGroupPoliciesOperation,
    ),
    /** The listAttachedRolePoliciesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listAttachedRolePoliciesPages: bindOperationPages(
      listAttachedRolePoliciesOperation,
    ),
    /** The listAttachedUserPoliciesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listAttachedUserPoliciesPages: bindOperationPages(
      listAttachedUserPoliciesOperation,
    ),
    /** The listEntitiesForPolicyPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listEntitiesForPolicyPages: bindOperationPages(
      listEntitiesForPolicyOperation,
    ),
    /** The listGroupPoliciesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listGroupPoliciesPages: bindOperationPages(listGroupPoliciesOperation),
    /** The listGroupsForUserPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listGroupsForUserPages: bindOperationPages(listGroupsForUserOperation),
    /** The listMFADeviceTagsPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listMFADeviceTagsPages: bindOperationPages(listMFADeviceTagsOperation),
    /** The listMFADevicesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listMFADevicesPages: bindOperationPages(listMFADevicesOperation),
    /** The listOpenIDConnectProviderTagsPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listOpenIDConnectProviderTagsPages: bindOperationPages(
      listOpenIDConnectProviderTagsOperation,
    ),
    /** The listPolicyVersionsPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listPolicyVersionsPages: bindOperationPages(listPolicyVersionsOperation),
    /** The listRolePoliciesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listRolePoliciesPages: bindOperationPages(listRolePoliciesOperation),
    /** The listSAMLProviderTagsPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listSAMLProviderTagsPages: bindOperationPages(
      listSAMLProviderTagsOperation,
    ),
    /** The listServerCertificateTagsPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listServerCertificateTagsPages: bindOperationPages(
      listServerCertificateTagsOperation,
    ),
    /** The listUserPoliciesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listUserPoliciesPages: bindOperationPages(listUserPoliciesOperation),
    /** The listUserTagsPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listUserTagsPages: bindOperationPages(listUserTagsOperation),
    /** The listVirtualMFADevicesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listVirtualMFADevicesPages: bindOperationPages(
      listVirtualMFADevicesOperation,
    ),
  };
});
