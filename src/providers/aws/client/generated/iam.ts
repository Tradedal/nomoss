// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import { AwsClient } from "../awsClient.js";
import type {
  AwsQueryOperation,
  AwsServiceDefinition,
} from "../awsClientModel.js";

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

export const iamErrors = {
  EntityAlreadyExistsException: {
    name: "EntityAlreadyExistsException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "EntityAlreadyExists",
    schema: EntityAlreadyExistsException,
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
  UnmodifiableEntityException: {
    name: "UnmodifiableEntityException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "UnmodifiableEntity",
    schema: UnmodifiableEntityException,
  },
  InvalidInputException: {
    name: "InvalidInputException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "InvalidInput",
    schema: InvalidInputException,
  },
  PolicyNotAttachableException: {
    name: "PolicyNotAttachableException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "PolicyNotAttachable",
    schema: PolicyNotAttachableException,
  },
  ConcurrentModificationException: {
    name: "ConcurrentModificationException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "ConcurrentModification",
    schema: ConcurrentModificationException,
  },
  MalformedPolicyDocumentException: {
    name: "MalformedPolicyDocumentException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "MalformedPolicyDocument",
    schema: MalformedPolicyDocumentException,
  },
  DeleteConflictException: {
    name: "DeleteConflictException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "DeleteConflict",
    schema: DeleteConflictException,
  },
  EntityTemporarilyUnmodifiableException: {
    name: "EntityTemporarilyUnmodifiableException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "EntityTemporarilyUnmodifiable",
    schema: EntityTemporarilyUnmodifiableException,
  },
};

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

export const createUserErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.InvalidInputException,
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

export const detachRolePolicyErrors = [
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
  iamErrors.UnmodifiableEntityException,
];

export const getGroupErrors = [
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const getPolicyErrors = [
  iamErrors.InvalidInputException,
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

export const tagPolicyErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.InvalidInputException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

export const untagPolicyErrors = [
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

export const updateUserErrors = [
  iamErrors.ConcurrentModificationException,
  iamErrors.EntityAlreadyExistsException,
  iamErrors.EntityTemporarilyUnmodifiableException,
  iamErrors.LimitExceededException,
  iamErrors.NoSuchEntityException,
  iamErrors.ServiceFailureException,
];

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
    input: [
      3,
      "com.amazonaws.iam",
      "AddRoleToInstanceProfileRequest",
      0,
      ["InstanceProfileName", "RoleName"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "AddUserToGroupRequest",
      0,
      ["GroupName", "UserName"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: AddUserToGroupRequest,
  output: AddUserToGroupOutput,
  errors: addUserToGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "AttachRolePolicyRequest",
      0,
      ["RoleName", "PolicyArn"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: AttachRolePolicyRequest,
  output: AttachRolePolicyOutput,
  errors: attachRolePolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "CreateGroupRequest",
      0,
      ["Path", "GroupName"],
      [0, 0],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "CreateGroupResponse",
      0,
      ["Group"],
      [
        [
          3,
          "com.amazonaws.iam",
          "Group",
          0,
          ["Path", "GroupName", "GroupId", "Arn", "CreateDate"],
          [0, 0, 0, 0, 4],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "CreateInstanceProfileRequest",
      0,
      ["InstanceProfileName", "Path", "Tags"],
      [
        0,
        0,
        [
          1,
          "com.amazonaws.iam",
          "tagListType",
          0,
          [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
        ],
      ],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "CreateInstanceProfileResponse",
      0,
      ["InstanceProfile"],
      [
        [
          3,
          "com.amazonaws.iam",
          "InstanceProfile",
          0,
          [
            "Path",
            "InstanceProfileName",
            "InstanceProfileId",
            "Arn",
            "CreateDate",
            "Roles",
            "Tags",
          ],
          [
            0,
            0,
            0,
            0,
            4,
            [
              1,
              "com.amazonaws.iam",
              "roleListType",
              0,
              [
                3,
                "com.amazonaws.iam",
                "Role",
                0,
                [
                  "Path",
                  "RoleName",
                  "RoleId",
                  "Arn",
                  "CreateDate",
                  "AssumeRolePolicyDocument",
                  "Description",
                  "MaxSessionDuration",
                  "PermissionsBoundary",
                  "Tags",
                  "RoleLastUsed",
                  "SourceRoleTemplate",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  0,
                  0,
                  1,
                  [
                    3,
                    "com.amazonaws.iam",
                    "AttachedPermissionsBoundary",
                    0,
                    ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                    [0, 0],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "RoleLastUsed",
                    0,
                    ["LastUsedDate", "Region"],
                    [4, 0],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "SourceRoleTemplate",
                    0,
                    ["TemplateArn", "TemplateMinorVersion"],
                    [0, 1],
                  ],
                ],
              ],
            ],
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: CreateInstanceProfileRequest,
  output: CreateInstanceProfileResponse,
  errors: createInstanceProfileErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "CreatePolicyRequest",
      0,
      ["PolicyName", "Path", "PolicyDocument", "Description", "Tags"],
      [
        0,
        0,
        0,
        0,
        [
          1,
          "com.amazonaws.iam",
          "tagListType",
          0,
          [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
        ],
      ],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "CreatePolicyResponse",
      0,
      ["Policy"],
      [
        [
          3,
          "com.amazonaws.iam",
          "Policy",
          0,
          [
            "PolicyName",
            "PolicyId",
            "Arn",
            "Path",
            "DefaultVersionId",
            "AttachmentCount",
            "PermissionsBoundaryUsageCount",
            "IsAttachable",
            "Description",
            "CreateDate",
            "UpdateDate",
            "Tags",
          ],
          [
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            2,
            0,
            4,
            4,
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "CreatePolicyVersionRequest",
      0,
      ["PolicyArn", "PolicyDocument", "SetAsDefault"],
      [0, 0, 2],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "CreatePolicyVersionResponse",
      0,
      ["PolicyVersion"],
      [
        [
          3,
          "com.amazonaws.iam",
          "PolicyVersion",
          0,
          ["Document", "VersionId", "IsDefaultVersion", "CreateDate"],
          [0, 0, 2, 4],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "CreateRoleRequest",
      0,
      [
        "Path",
        "RoleName",
        "AssumeRolePolicyDocument",
        "Description",
        "MaxSessionDuration",
        "PermissionsBoundary",
        "Tags",
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        [
          1,
          "com.amazonaws.iam",
          "tagListType",
          0,
          [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
        ],
      ],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "CreateRoleResponse",
      0,
      ["Role"],
      [
        [
          3,
          "com.amazonaws.iam",
          "Role",
          0,
          [
            "Path",
            "RoleName",
            "RoleId",
            "Arn",
            "CreateDate",
            "AssumeRolePolicyDocument",
            "Description",
            "MaxSessionDuration",
            "PermissionsBoundary",
            "Tags",
            "RoleLastUsed",
            "SourceRoleTemplate",
          ],
          [
            0,
            0,
            0,
            0,
            4,
            0,
            0,
            1,
            [
              3,
              "com.amazonaws.iam",
              "AttachedPermissionsBoundary",
              0,
              ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
              [0, 0],
            ],
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
            [
              3,
              "com.amazonaws.iam",
              "RoleLastUsed",
              0,
              ["LastUsedDate", "Region"],
              [4, 0],
            ],
            [
              3,
              "com.amazonaws.iam",
              "SourceRoleTemplate",
              0,
              ["TemplateArn", "TemplateMinorVersion"],
              [0, 1],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: CreateRoleRequest,
  output: CreateRoleResponse,
  errors: createPolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "CreateUserRequest",
      0,
      ["Path", "UserName", "PermissionsBoundary", "Tags"],
      [
        0,
        0,
        0,
        [
          1,
          "com.amazonaws.iam",
          "tagListType",
          0,
          [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
        ],
      ],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "CreateUserResponse",
      0,
      ["User"],
      [
        [
          3,
          "com.amazonaws.iam",
          "User",
          0,
          [
            "Path",
            "UserName",
            "UserId",
            "Arn",
            "CreateDate",
            "PasswordLastUsed",
            "PermissionsBoundary",
            "Tags",
          ],
          [
            0,
            0,
            0,
            0,
            4,
            4,
            [
              3,
              "com.amazonaws.iam",
              "AttachedPermissionsBoundary",
              0,
              ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
              [0, 0],
            ],
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: createUserErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "DeleteGroupRequest",
      0,
      ["GroupName"],
      [0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteGroupRequest,
  output: DeleteGroupOutput,
  errors: deleteGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "DeleteInstanceProfileRequest",
      0,
      ["InstanceProfileName"],
      [0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteInstanceProfileRequest,
  output: DeleteInstanceProfileOutput,
  errors: deleteGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "DeletePolicyRequest",
      0,
      ["PolicyArn"],
      [0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "DeletePolicyVersionRequest",
      0,
      ["PolicyArn", "VersionId"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [3, "com.amazonaws.iam", "DeleteRoleRequest", 0, ["RoleName"], [0]],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "DeleteRolePermissionsBoundaryRequest",
      0,
      ["RoleName"],
      [0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "DeleteRolePolicyRequest",
      0,
      ["RoleName", "PolicyName"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteRolePolicyRequest,
  output: DeleteRolePolicyOutput,
  errors: deleteRolePolicyErrors,
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
    input: [3, "com.amazonaws.iam", "DeleteUserRequest", 0, ["UserName"], [0]],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteUserRequest,
  output: DeleteUserOutput,
  errors: deleteUserErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "DetachRolePolicyRequest",
      0,
      ["RoleName", "PolicyArn"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DetachRolePolicyRequest,
  output: DetachRolePolicyOutput,
  errors: detachRolePolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "GetGroupRequest",
      0,
      ["GroupName", "Marker", "MaxItems"],
      [0, 0, 1],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "GetGroupResponse",
      0,
      ["Group", "Users", "IsTruncated", "Marker"],
      [
        [
          3,
          "com.amazonaws.iam",
          "Group",
          0,
          ["Path", "GroupName", "GroupId", "Arn", "CreateDate"],
          [0, 0, 0, 0, 4],
        ],
        [
          1,
          "com.amazonaws.iam",
          "userListType",
          0,
          [
            3,
            "com.amazonaws.iam",
            "User",
            0,
            [
              "Path",
              "UserName",
              "UserId",
              "Arn",
              "CreateDate",
              "PasswordLastUsed",
              "PermissionsBoundary",
              "Tags",
            ],
            [
              0,
              0,
              0,
              0,
              4,
              4,
              [
                3,
                "com.amazonaws.iam",
                "AttachedPermissionsBoundary",
                0,
                ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                [0, 0],
              ],
              [
                1,
                "com.amazonaws.iam",
                "tagListType",
                0,
                [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
              ],
            ],
          ],
        ],
        2,
        0,
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "MaxItems",
  },
  waiters: {},
  input: GetGroupRequest,
  output: GetGroupResponse,
  errors: getGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "GetInstanceProfileRequest",
      0,
      ["InstanceProfileName"],
      [0],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "GetInstanceProfileResponse",
      0,
      ["InstanceProfile"],
      [
        [
          3,
          "com.amazonaws.iam",
          "InstanceProfile",
          0,
          [
            "Path",
            "InstanceProfileName",
            "InstanceProfileId",
            "Arn",
            "CreateDate",
            "Roles",
            "Tags",
          ],
          [
            0,
            0,
            0,
            0,
            4,
            [
              1,
              "com.amazonaws.iam",
              "roleListType",
              0,
              [
                3,
                "com.amazonaws.iam",
                "Role",
                0,
                [
                  "Path",
                  "RoleName",
                  "RoleId",
                  "Arn",
                  "CreateDate",
                  "AssumeRolePolicyDocument",
                  "Description",
                  "MaxSessionDuration",
                  "PermissionsBoundary",
                  "Tags",
                  "RoleLastUsed",
                  "SourceRoleTemplate",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  0,
                  0,
                  1,
                  [
                    3,
                    "com.amazonaws.iam",
                    "AttachedPermissionsBoundary",
                    0,
                    ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                    [0, 0],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "RoleLastUsed",
                    0,
                    ["LastUsedDate", "Region"],
                    [4, 0],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "SourceRoleTemplate",
                    0,
                    ["TemplateArn", "TemplateMinorVersion"],
                    [0, 1],
                  ],
                ],
              ],
            ],
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {
    InstanceProfileExists: {
      acceptors: [
        {
          state: "success",
          matcher: {
            success: true,
          },
        },
        {
          state: "retry",
          matcher: {
            errorType: "NoSuchEntityException",
          },
        },
      ],
      minDelay: 1,
    },
  },
  input: GetInstanceProfileRequest,
  output: GetInstanceProfileResponse,
  errors: getGroupErrors,
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
    input: [3, "com.amazonaws.iam", "GetPolicyRequest", 0, ["PolicyArn"], [0]],
    output: [
      3,
      "com.amazonaws.iam",
      "GetPolicyResponse",
      0,
      ["Policy"],
      [
        [
          3,
          "com.amazonaws.iam",
          "Policy",
          0,
          [
            "PolicyName",
            "PolicyId",
            "Arn",
            "Path",
            "DefaultVersionId",
            "AttachmentCount",
            "PermissionsBoundaryUsageCount",
            "IsAttachable",
            "Description",
            "CreateDate",
            "UpdateDate",
            "Tags",
          ],
          [
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            2,
            0,
            4,
            4,
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {
    PolicyExists: {
      acceptors: [
        {
          state: "success",
          matcher: {
            success: true,
          },
        },
        {
          state: "retry",
          matcher: {
            errorType: "NoSuchEntity",
          },
        },
      ],
      minDelay: 1,
    },
  },
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: getPolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "GetPolicyVersionRequest",
      0,
      ["PolicyArn", "VersionId"],
      [0, 0],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "GetPolicyVersionResponse",
      0,
      ["PolicyVersion"],
      [
        [
          3,
          "com.amazonaws.iam",
          "PolicyVersion",
          0,
          ["Document", "VersionId", "IsDefaultVersion", "CreateDate"],
          [0, 0, 2, 4],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: GetPolicyVersionRequest,
  output: GetPolicyVersionResponse,
  errors: getPolicyErrors,
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
    input: [3, "com.amazonaws.iam", "GetRoleRequest", 0, ["RoleName"], [0]],
    output: [
      3,
      "com.amazonaws.iam",
      "GetRoleResponse",
      0,
      ["Role"],
      [
        [
          3,
          "com.amazonaws.iam",
          "Role",
          0,
          [
            "Path",
            "RoleName",
            "RoleId",
            "Arn",
            "CreateDate",
            "AssumeRolePolicyDocument",
            "Description",
            "MaxSessionDuration",
            "PermissionsBoundary",
            "Tags",
            "RoleLastUsed",
            "SourceRoleTemplate",
          ],
          [
            0,
            0,
            0,
            0,
            4,
            0,
            0,
            1,
            [
              3,
              "com.amazonaws.iam",
              "AttachedPermissionsBoundary",
              0,
              ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
              [0, 0],
            ],
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
            [
              3,
              "com.amazonaws.iam",
              "RoleLastUsed",
              0,
              ["LastUsedDate", "Region"],
              [4, 0],
            ],
            [
              3,
              "com.amazonaws.iam",
              "SourceRoleTemplate",
              0,
              ["TemplateArn", "TemplateMinorVersion"],
              [0, 1],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {
    RoleExists: {
      acceptors: [
        {
          state: "success",
          matcher: {
            success: true,
          },
        },
        {
          state: "retry",
          matcher: {
            errorType: "NoSuchEntity",
          },
        },
      ],
      minDelay: 1,
    },
  },
  input: GetRoleRequest,
  output: GetRoleResponse,
  errors: getGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "GetRolePolicyRequest",
      0,
      ["RoleName", "PolicyName"],
      [0, 0],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "GetRolePolicyResponse",
      0,
      ["RoleName", "PolicyName", "PolicyDocument"],
      [0, 0, 0],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: GetRolePolicyRequest,
  output: GetRolePolicyResponse,
  errors: getGroupErrors,
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
    input: [3, "com.amazonaws.iam", "GetUserRequest", 0, ["UserName"], [0]],
    output: [
      3,
      "com.amazonaws.iam",
      "GetUserResponse",
      0,
      ["User"],
      [
        [
          3,
          "com.amazonaws.iam",
          "User",
          0,
          [
            "Path",
            "UserName",
            "UserId",
            "Arn",
            "CreateDate",
            "PasswordLastUsed",
            "PermissionsBoundary",
            "Tags",
          ],
          [
            0,
            0,
            0,
            0,
            4,
            4,
            [
              3,
              "com.amazonaws.iam",
              "AttachedPermissionsBoundary",
              0,
              ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
              [0, 0],
            ],
            [
              1,
              "com.amazonaws.iam",
              "tagListType",
              0,
              [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
            ],
          ],
        ],
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {
    UserExists: {
      acceptors: [
        {
          state: "success",
          matcher: {
            success: true,
          },
        },
        {
          state: "retry",
          matcher: {
            errorType: "NoSuchEntity",
          },
        },
      ],
      minDelay: 1,
    },
  },
  input: GetUserRequest,
  output: GetUserResponse,
  errors: getGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "ListAttachedRolePoliciesRequest",
      0,
      ["RoleName", "PathPrefix", "Marker", "MaxItems"],
      [0, 0, 0, 1],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "ListAttachedRolePoliciesResponse",
      0,
      ["AttachedPolicies", "IsTruncated", "Marker"],
      [
        [
          1,
          "com.amazonaws.iam",
          "attachedPoliciesListType",
          0,
          [
            3,
            "com.amazonaws.iam",
            "AttachedPolicy",
            0,
            ["PolicyName", "PolicyArn"],
            [0, 0],
          ],
        ],
        2,
        0,
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "AttachedPolicies",
    pageSize: "MaxItems",
  },
  waiters: {},
  input: ListAttachedRolePoliciesRequest,
  output: ListAttachedRolePoliciesResponse,
  errors: getPolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "ListGroupsForUserRequest",
      0,
      ["UserName", "Marker", "MaxItems"],
      [0, 0, 1],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "ListGroupsForUserResponse",
      0,
      ["Groups", "IsTruncated", "Marker"],
      [
        [
          1,
          "com.amazonaws.iam",
          "groupListType",
          0,
          [
            3,
            "com.amazonaws.iam",
            "Group",
            0,
            ["Path", "GroupName", "GroupId", "Arn", "CreateDate"],
            [0, 0, 0, 0, 4],
          ],
        ],
        2,
        0,
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Groups",
    pageSize: "MaxItems",
  },
  waiters: {},
  input: ListGroupsForUserRequest,
  output: ListGroupsForUserResponse,
  errors: getGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "ListPolicyVersionsRequest",
      0,
      ["PolicyArn", "Marker", "MaxItems"],
      [0, 0, 1],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "ListPolicyVersionsResponse",
      0,
      ["Versions", "IsTruncated", "Marker"],
      [
        [
          1,
          "com.amazonaws.iam",
          "policyDocumentVersionListType",
          0,
          [
            3,
            "com.amazonaws.iam",
            "PolicyVersion",
            0,
            ["Document", "VersionId", "IsDefaultVersion", "CreateDate"],
            [0, 0, 2, 4],
          ],
        ],
        2,
        0,
      ],
    ],
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Versions",
    pageSize: "MaxItems",
  },
  waiters: {},
  input: ListPolicyVersionsRequest,
  output: ListPolicyVersionsResponse,
  errors: getPolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "ListRolePoliciesRequest",
      0,
      ["RoleName", "Marker", "MaxItems"],
      [0, 0, 1],
    ],
    output: [
      3,
      "com.amazonaws.iam",
      "ListRolePoliciesResponse",
      0,
      ["PolicyNames", "IsTruncated", "Marker"],
      [[1, "com.amazonaws.iam", "policyNameListType", 0, 0], 2, 0],
    ],
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PolicyNames",
    pageSize: "MaxItems",
  },
  waiters: {},
  input: ListRolePoliciesRequest,
  output: ListRolePoliciesResponse,
  errors: getGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "PutRolePermissionsBoundaryRequest",
      0,
      ["RoleName", "PermissionsBoundary"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "PutRolePolicyRequest",
      0,
      ["RoleName", "PolicyName", "PolicyDocument"],
      [0, 0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: PutRolePolicyRequest,
  output: PutRolePolicyOutput,
  errors: putRolePolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "RemoveRoleFromInstanceProfileRequest",
      0,
      ["InstanceProfileName", "RoleName"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "RemoveUserFromGroupRequest",
      0,
      ["GroupName", "UserName"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: RemoveUserFromGroupRequest,
  output: RemoveUserFromGroupOutput,
  errors: addUserToGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "TagPolicyRequest",
      0,
      ["PolicyArn", "Tags"],
      [
        0,
        [
          1,
          "com.amazonaws.iam",
          "tagListType",
          0,
          [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
        ],
      ],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: TagPolicyRequest,
  output: TagPolicyOutput,
  errors: tagPolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "TagRoleRequest",
      0,
      ["RoleName", "Tags"],
      [
        0,
        [
          1,
          "com.amazonaws.iam",
          "tagListType",
          0,
          [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
        ],
      ],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: TagRoleRequest,
  output: TagRoleOutput,
  errors: tagPolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "UntagPolicyRequest",
      0,
      ["PolicyArn", "TagKeys"],
      [0, [1, "com.amazonaws.iam", "tagKeyListType", 0, 0]],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: UntagPolicyRequest,
  output: UntagPolicyOutput,
  errors: untagPolicyErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "UntagRoleRequest",
      0,
      ["RoleName", "TagKeys"],
      [0, [1, "com.amazonaws.iam", "tagKeyListType", 0, 0]],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: UntagRoleRequest,
  output: UntagRoleOutput,
  errors: untagRoleErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "UpdateAssumeRolePolicyRequest",
      0,
      ["RoleName", "PolicyDocument"],
      [0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
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
    input: [
      3,
      "com.amazonaws.iam",
      "UpdateGroupRequest",
      0,
      ["GroupName", "NewPath", "NewGroupName"],
      [0, 0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: UpdateGroupRequest,
  output: UpdateGroupOutput,
  errors: createGroupErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "UpdateRoleRequest",
      0,
      ["RoleName", "Description", "MaxSessionDuration"],
      [0, 0, 1],
    ],
    output: [3, "com.amazonaws.iam", "UpdateRoleResponse", 0, [], []],
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: UpdateRoleRequest,
  output: UpdateRoleResponse,
  errors: deleteRolePermissionsBoundaryErrors,
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
    input: [
      3,
      "com.amazonaws.iam",
      "UpdateUserRequest",
      0,
      ["UserName", "NewPath", "NewUserName"],
      [0, 0, 0],
    ],
    output: "unit",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: UpdateUserRequest,
  output: UpdateUserOutput,
  errors: updateUserErrors,
};

export const iamOperations = {
  AddRoleToInstanceProfile: addRoleToInstanceProfileOperation,
  AddUserToGroup: addUserToGroupOperation,
  AttachRolePolicy: attachRolePolicyOperation,
  CreateGroup: createGroupOperation,
  CreateInstanceProfile: createInstanceProfileOperation,
  CreatePolicy: createPolicyOperation,
  CreatePolicyVersion: createPolicyVersionOperation,
  CreateRole: createRoleOperation,
  CreateUser: createUserOperation,
  DeleteGroup: deleteGroupOperation,
  DeleteInstanceProfile: deleteInstanceProfileOperation,
  DeletePolicy: deletePolicyOperation,
  DeletePolicyVersion: deletePolicyVersionOperation,
  DeleteRole: deleteRoleOperation,
  DeleteRolePermissionsBoundary: deleteRolePermissionsBoundaryOperation,
  DeleteRolePolicy: deleteRolePolicyOperation,
  DeleteUser: deleteUserOperation,
  DetachRolePolicy: detachRolePolicyOperation,
  GetGroup: getGroupOperation,
  GetInstanceProfile: getInstanceProfileOperation,
  GetPolicy: getPolicyOperation,
  GetPolicyVersion: getPolicyVersionOperation,
  GetRole: getRoleOperation,
  GetRolePolicy: getRolePolicyOperation,
  GetUser: getUserOperation,
  ListAttachedRolePolicies: listAttachedRolePoliciesOperation,
  ListGroupsForUser: listGroupsForUserOperation,
  ListPolicyVersions: listPolicyVersionsOperation,
  ListRolePolicies: listRolePoliciesOperation,
  PutRolePermissionsBoundary: putRolePermissionsBoundaryOperation,
  PutRolePolicy: putRolePolicyOperation,
  RemoveRoleFromInstanceProfile: removeRoleFromInstanceProfileOperation,
  RemoveUserFromGroup: removeUserFromGroupOperation,
  TagPolicy: tagPolicyOperation,
  TagRole: tagRoleOperation,
  UntagPolicy: untagPolicyOperation,
  UntagRole: untagRoleOperation,
  UpdateAssumeRolePolicy: updateAssumeRolePolicyOperation,
  UpdateGroup: updateGroupOperation,
  UpdateRole: updateRoleOperation,
  UpdateUser: updateUserOperation,
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
        builtIn: "AWS::UseDualStack",
        required: true,
        default: false,
        documentation:
          "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
        type: "boolean",
      },
      UseFIPS: {
        builtIn: "AWS::UseFIPS",
        required: true,
        default: false,
        documentation:
          "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
        type: "boolean",
      },
      Endpoint: {
        builtIn: "SDK::Endpoint",
        required: false,
        documentation: "Override the endpoint used to send this request",
        type: "string",
      },
      Region: {
        builtIn: "AWS::Region",
        required: false,
        documentation: "The AWS region used to dispatch the request.",
        type: "string",
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

/** The makeIAMClient constructor supplies callable IAM operations through the shared AwsClient service. Calls validate inputs and responses with the generated schemas and retain typed request, response, and provider failures. */
export const makeIAMClient = Effect.gen(function* () {
  const aws = yield* AwsClient;
  const bindOperation = aws.bindOperation(iamService);

  /** The addRoleToInstanceProfile function invokes AWS AddRoleToInstanceProfile through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const addRoleToInstanceProfile = bindOperation(
    addRoleToInstanceProfileOperation,
  );
  /** The addUserToGroup function invokes AWS AddUserToGroup through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const addUserToGroup = bindOperation(addUserToGroupOperation);
  /** The attachRolePolicy function invokes AWS AttachRolePolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const attachRolePolicy = bindOperation(attachRolePolicyOperation);
  /** The createGroup function invokes AWS CreateGroup through the shared client. Its Effect returns the decoded CreateGroupResponse result after a successful response; validation and provider failures remain in the error channel. */
  const createGroup = bindOperation(createGroupOperation);
  /** The createInstanceProfile function invokes AWS CreateInstanceProfile through the shared client. Its Effect returns the decoded CreateInstanceProfileResponse result after a successful response; validation and provider failures remain in the error channel. */
  const createInstanceProfile = bindOperation(createInstanceProfileOperation);
  /** The createPolicy function invokes AWS CreatePolicy through the shared client. Its Effect returns the decoded CreatePolicyResponse result after a successful response; validation and provider failures remain in the error channel. */
  const createPolicy = bindOperation(createPolicyOperation);
  /** The createPolicyVersion function invokes AWS CreatePolicyVersion through the shared client. Its Effect returns the decoded CreatePolicyVersionResponse result after a successful response; validation and provider failures remain in the error channel. */
  const createPolicyVersion = bindOperation(createPolicyVersionOperation);
  /** The createRole function invokes AWS CreateRole through the shared client. Its Effect returns the decoded CreateRoleResponse result after a successful response; validation and provider failures remain in the error channel. */
  const createRole = bindOperation(createRoleOperation);
  /** The createUser function invokes AWS CreateUser through the shared client. Its Effect returns the decoded CreateUserResponse result after a successful response; validation and provider failures remain in the error channel. */
  const createUser = bindOperation(createUserOperation);
  /** The deleteGroup function invokes AWS DeleteGroup through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteGroup = bindOperation(deleteGroupOperation);
  /** The deleteInstanceProfile function invokes AWS DeleteInstanceProfile through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteInstanceProfile = bindOperation(deleteInstanceProfileOperation);
  /** The deletePolicy function invokes AWS DeletePolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deletePolicy = bindOperation(deletePolicyOperation);
  /** The deletePolicyVersion function invokes AWS DeletePolicyVersion through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deletePolicyVersion = bindOperation(deletePolicyVersionOperation);
  /** The deleteRole function invokes AWS DeleteRole through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteRole = bindOperation(deleteRoleOperation);
  /** The deleteRolePermissionsBoundary function invokes AWS DeleteRolePermissionsBoundary through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteRolePermissionsBoundary = bindOperation(
    deleteRolePermissionsBoundaryOperation,
  );
  /** The deleteRolePolicy function invokes AWS DeleteRolePolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteRolePolicy = bindOperation(deleteRolePolicyOperation);
  /** The deleteUser function invokes AWS DeleteUser through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteUser = bindOperation(deleteUserOperation);
  /** The detachRolePolicy function invokes AWS DetachRolePolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const detachRolePolicy = bindOperation(detachRolePolicyOperation);
  /** The getGroup function invokes AWS GetGroup through the shared client. Its Effect returns the decoded GetGroupResponse result after a successful response; validation and provider failures remain in the error channel. */
  const getGroup = bindOperation(getGroupOperation);
  /** The getInstanceProfile function invokes AWS GetInstanceProfile through the shared client. Its Effect returns the decoded GetInstanceProfileResponse result after a successful response; validation and provider failures remain in the error channel. */
  const getInstanceProfile = bindOperation(getInstanceProfileOperation);
  /** The getPolicy function invokes AWS GetPolicy through the shared client. Its Effect returns the decoded GetPolicyResponse result after a successful response; validation and provider failures remain in the error channel. */
  const getPolicy = bindOperation(getPolicyOperation);
  /** The getPolicyVersion function invokes AWS GetPolicyVersion through the shared client. Its Effect returns the decoded GetPolicyVersionResponse result after a successful response; validation and provider failures remain in the error channel. */
  const getPolicyVersion = bindOperation(getPolicyVersionOperation);
  /** The getRole function invokes AWS GetRole through the shared client. Its Effect returns the decoded GetRoleResponse result after a successful response; validation and provider failures remain in the error channel. */
  const getRole = bindOperation(getRoleOperation);
  /** The getRolePolicy function invokes AWS GetRolePolicy through the shared client. Its Effect returns the decoded GetRolePolicyResponse result after a successful response; validation and provider failures remain in the error channel. */
  const getRolePolicy = bindOperation(getRolePolicyOperation);
  /** The getUser function invokes AWS GetUser through the shared client. Its Effect returns the decoded GetUserResponse result after a successful response; validation and provider failures remain in the error channel. */
  const getUser = bindOperation(getUserOperation);
  /** The listAttachedRolePolicies function invokes AWS ListAttachedRolePolicies through the shared client. Its Effect returns the decoded ListAttachedRolePoliciesResponse result after a successful response; validation and provider failures remain in the error channel. */
  const listAttachedRolePolicies = bindOperation(
    listAttachedRolePoliciesOperation,
  );
  /** The listGroupsForUser function invokes AWS ListGroupsForUser through the shared client. Its Effect returns the decoded ListGroupsForUserResponse result after a successful response; validation and provider failures remain in the error channel. */
  const listGroupsForUser = bindOperation(listGroupsForUserOperation);
  /** The listPolicyVersions function invokes AWS ListPolicyVersions through the shared client. Its Effect returns the decoded ListPolicyVersionsResponse result after a successful response; validation and provider failures remain in the error channel. */
  const listPolicyVersions = bindOperation(listPolicyVersionsOperation);
  /** The listRolePolicies function invokes AWS ListRolePolicies through the shared client. Its Effect returns the decoded ListRolePoliciesResponse result after a successful response; validation and provider failures remain in the error channel. */
  const listRolePolicies = bindOperation(listRolePoliciesOperation);
  /** The putRolePermissionsBoundary function invokes AWS PutRolePermissionsBoundary through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const putRolePermissionsBoundary = bindOperation(
    putRolePermissionsBoundaryOperation,
  );
  /** The putRolePolicy function invokes AWS PutRolePolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const putRolePolicy = bindOperation(putRolePolicyOperation);
  /** The removeRoleFromInstanceProfile function invokes AWS RemoveRoleFromInstanceProfile through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const removeRoleFromInstanceProfile = bindOperation(
    removeRoleFromInstanceProfileOperation,
  );
  /** The removeUserFromGroup function invokes AWS RemoveUserFromGroup through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const removeUserFromGroup = bindOperation(removeUserFromGroupOperation);
  /** The tagPolicy function invokes AWS TagPolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const tagPolicy = bindOperation(tagPolicyOperation);
  /** The tagRole function invokes AWS TagRole through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const tagRole = bindOperation(tagRoleOperation);
  /** The untagPolicy function invokes AWS UntagPolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const untagPolicy = bindOperation(untagPolicyOperation);
  /** The untagRole function invokes AWS UntagRole through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const untagRole = bindOperation(untagRoleOperation);
  /** The updateAssumeRolePolicy function invokes AWS UpdateAssumeRolePolicy through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const updateAssumeRolePolicy = bindOperation(updateAssumeRolePolicyOperation);
  /** The updateGroup function invokes AWS UpdateGroup through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const updateGroup = bindOperation(updateGroupOperation);
  /** The updateRole function invokes AWS UpdateRole through the shared client. Its Effect returns the decoded UpdateRoleResponse result after a successful response; validation and provider failures remain in the error channel. */
  const updateRole = bindOperation(updateRoleOperation);
  /** The updateUser function invokes AWS UpdateUser through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const updateUser = bindOperation(updateUserOperation);

  return {
    addRoleToInstanceProfile,
    addUserToGroup,
    attachRolePolicy,
    createGroup,
    createInstanceProfile,
    createPolicy,
    createPolicyVersion,
    createRole,
    createUser,
    deleteGroup,
    deleteInstanceProfile,
    deletePolicy,
    deletePolicyVersion,
    deleteRole,
    deleteRolePermissionsBoundary,
    deleteRolePolicy,
    deleteUser,
    detachRolePolicy,
    getGroup,
    getInstanceProfile,
    getPolicy,
    getPolicyVersion,
    getRole,
    getRolePolicy,
    getUser,
    listAttachedRolePolicies,
    listGroupsForUser,
    listPolicyVersions,
    listRolePolicies,
    putRolePermissionsBoundary,
    putRolePolicy,
    removeRoleFromInstanceProfile,
    removeUserFromGroup,
    tagPolicy,
    tagRole,
    untagPolicy,
    untagRole,
    updateAssumeRolePolicy,
    updateGroup,
    updateRole,
    updateUser,
  };
});
export const iamOperationCatalog = [
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "AddRoleToInstanceProfile.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "AddRoleToInstanceProfile",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/AddRoleToInstanceProfileRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "AddRoleToInstanceProfileRequest",
            0,
            ["InstanceProfileName", "RoleName"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "AddUserToGroup.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "AddUserToGroup",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/AddUserToGroupRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "AddUserToGroupRequest",
            0,
            ["GroupName", "UserName"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "AttachRolePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "AttachRolePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/PolicyNotAttachableException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/AttachRolePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "AttachRolePolicyRequest",
            0,
            ["RoleName", "PolicyArn"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "CreateGroup.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "CreateGroup",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/CreateGroupRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "CreateGroupRequest",
            0,
            ["Path", "GroupName"],
            [0, 0],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "CreateGroupResponse",
            0,
            ["Group"],
            [
              [
                3,
                "com.amazonaws.iam",
                "Group",
                0,
                ["Path", "GroupName", "GroupId", "Arn", "CreateDate"],
                [0, 0, 0, 0, 4],
              ],
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "CreateInstanceProfile.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "CreateInstanceProfile",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/CreateInstanceProfileRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "CreateInstanceProfileRequest",
            0,
            ["InstanceProfileName", "Path", "Tags"],
            [
              0,
              0,
              [
                1,
                "com.amazonaws.iam",
                "tagListType",
                0,
                [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
              ],
            ],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "CreateInstanceProfileResponse",
            0,
            ["InstanceProfile"],
            [
              [
                3,
                "com.amazonaws.iam",
                "InstanceProfile",
                0,
                [
                  "Path",
                  "InstanceProfileName",
                  "InstanceProfileId",
                  "Arn",
                  "CreateDate",
                  "Roles",
                  "Tags",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  [
                    1,
                    "com.amazonaws.iam",
                    "roleListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Role",
                      0,
                      [
                        "Path",
                        "RoleName",
                        "RoleId",
                        "Arn",
                        "CreateDate",
                        "AssumeRolePolicyDocument",
                        "Description",
                        "MaxSessionDuration",
                        "PermissionsBoundary",
                        "Tags",
                        "RoleLastUsed",
                        "SourceRoleTemplate",
                      ],
                      [
                        0,
                        0,
                        0,
                        0,
                        4,
                        0,
                        0,
                        1,
                        [
                          3,
                          "com.amazonaws.iam",
                          "AttachedPermissionsBoundary",
                          0,
                          ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                          [0, 0],
                        ],
                        [
                          1,
                          "com.amazonaws.iam",
                          "tagListType",
                          0,
                          [
                            3,
                            "com.amazonaws.iam",
                            "Tag",
                            0,
                            ["Key", "Value"],
                            [0, 0],
                          ],
                        ],
                        [
                          3,
                          "com.amazonaws.iam",
                          "RoleLastUsed",
                          0,
                          ["LastUsedDate", "Region"],
                          [4, 0],
                        ],
                        [
                          3,
                          "com.amazonaws.iam",
                          "SourceRoleTemplate",
                          0,
                          ["TemplateArn", "TemplateMinorVersion"],
                          [0, 1],
                        ],
                      ],
                    ],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "CreatePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "CreatePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/MalformedPolicyDocumentException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/CreatePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "CreatePolicyRequest",
            0,
            ["PolicyName", "Path", "PolicyDocument", "Description", "Tags"],
            [
              0,
              0,
              0,
              0,
              [
                1,
                "com.amazonaws.iam",
                "tagListType",
                0,
                [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
              ],
            ],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "CreatePolicyResponse",
            0,
            ["Policy"],
            [
              [
                3,
                "com.amazonaws.iam",
                "Policy",
                0,
                [
                  "PolicyName",
                  "PolicyId",
                  "Arn",
                  "Path",
                  "DefaultVersionId",
                  "AttachmentCount",
                  "PermissionsBoundaryUsageCount",
                  "IsAttachable",
                  "Description",
                  "CreateDate",
                  "UpdateDate",
                  "Tags",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  1,
                  2,
                  0,
                  4,
                  4,
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "CreatePolicyVersion.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "CreatePolicyVersion",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/MalformedPolicyDocumentException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/CreatePolicyVersionRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "CreatePolicyVersionRequest",
            0,
            ["PolicyArn", "PolicyDocument", "SetAsDefault"],
            [0, 0, 2],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "CreatePolicyVersionResponse",
            0,
            ["PolicyVersion"],
            [
              [
                3,
                "com.amazonaws.iam",
                "PolicyVersion",
                0,
                ["Document", "VersionId", "IsDefaultVersion", "CreateDate"],
                [0, 0, 2, 4],
              ],
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "CreateRole.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "CreateRole",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/MalformedPolicyDocumentException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/CreateRoleRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "CreateRoleRequest",
            0,
            [
              "Path",
              "RoleName",
              "AssumeRolePolicyDocument",
              "Description",
              "MaxSessionDuration",
              "PermissionsBoundary",
              "Tags",
            ],
            [
              0,
              0,
              0,
              0,
              1,
              0,
              [
                1,
                "com.amazonaws.iam",
                "tagListType",
                0,
                [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
              ],
            ],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "CreateRoleResponse",
            0,
            ["Role"],
            [
              [
                3,
                "com.amazonaws.iam",
                "Role",
                0,
                [
                  "Path",
                  "RoleName",
                  "RoleId",
                  "Arn",
                  "CreateDate",
                  "AssumeRolePolicyDocument",
                  "Description",
                  "MaxSessionDuration",
                  "PermissionsBoundary",
                  "Tags",
                  "RoleLastUsed",
                  "SourceRoleTemplate",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  0,
                  0,
                  1,
                  [
                    3,
                    "com.amazonaws.iam",
                    "AttachedPermissionsBoundary",
                    0,
                    ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                    [0, 0],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "RoleLastUsed",
                    0,
                    ["LastUsedDate", "Region"],
                    [4, 0],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "SourceRoleTemplate",
                    0,
                    ["TemplateArn", "TemplateMinorVersion"],
                    [0, 1],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "CreateUser.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "CreateUser",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/CreateUserRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "CreateUserRequest",
            0,
            ["Path", "UserName", "PermissionsBoundary", "Tags"],
            [
              0,
              0,
              0,
              [
                1,
                "com.amazonaws.iam",
                "tagListType",
                0,
                [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
              ],
            ],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "CreateUserResponse",
            0,
            ["User"],
            [
              [
                3,
                "com.amazonaws.iam",
                "User",
                0,
                [
                  "Path",
                  "UserName",
                  "UserId",
                  "Arn",
                  "CreateDate",
                  "PasswordLastUsed",
                  "PermissionsBoundary",
                  "Tags",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  4,
                  [
                    3,
                    "com.amazonaws.iam",
                    "AttachedPermissionsBoundary",
                    0,
                    ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                    [0, 0],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeleteGroup.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeleteGroup",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/DeleteConflictException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeleteGroupRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeleteGroupRequest",
            0,
            ["GroupName"],
            [0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeleteInstanceProfile.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeleteInstanceProfile",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/DeleteConflictException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeleteInstanceProfileRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeleteInstanceProfileRequest",
            0,
            ["InstanceProfileName"],
            [0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeletePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeletePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/DeleteConflictException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeletePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeletePolicyRequest",
            0,
            ["PolicyArn"],
            [0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeletePolicyVersion.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeletePolicyVersion",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/DeleteConflictException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeletePolicyVersionRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeletePolicyVersionRequest",
            0,
            ["PolicyArn", "VersionId"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeleteRole.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeleteRole",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/DeleteConflictException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeleteRoleRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeleteRoleRequest",
            0,
            ["RoleName"],
            [0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeleteRolePermissionsBoundary.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeleteRolePermissionsBoundary",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeleteRolePermissionsBoundaryRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeleteRolePermissionsBoundaryRequest",
            0,
            ["RoleName"],
            [0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeleteRolePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeleteRolePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeleteRolePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeleteRolePolicyRequest",
            0,
            ["RoleName", "PolicyName"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DeleteUser.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DeleteUser",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/DeleteConflictException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DeleteUserRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DeleteUserRequest",
            0,
            ["UserName"],
            [0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "DetachRolePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "DetachRolePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/DetachRolePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "DetachRolePolicyRequest",
            0,
            ["RoleName", "PolicyArn"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "GetGroup.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "GetGroup",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/GetGroupRequest",
        },
        "x-aws-pagination": {
          inputToken: "Marker",
          outputToken: "Marker",
          items: "Users",
          pageSize: "MaxItems",
        },
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "GetGroupRequest",
            0,
            ["GroupName", "Marker", "MaxItems"],
            [0, 0, 1],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "GetGroupResponse",
            0,
            ["Group", "Users", "IsTruncated", "Marker"],
            [
              [
                3,
                "com.amazonaws.iam",
                "Group",
                0,
                ["Path", "GroupName", "GroupId", "Arn", "CreateDate"],
                [0, 0, 0, 0, 4],
              ],
              [
                1,
                "com.amazonaws.iam",
                "userListType",
                0,
                [
                  3,
                  "com.amazonaws.iam",
                  "User",
                  0,
                  [
                    "Path",
                    "UserName",
                    "UserId",
                    "Arn",
                    "CreateDate",
                    "PasswordLastUsed",
                    "PermissionsBoundary",
                    "Tags",
                  ],
                  [
                    0,
                    0,
                    0,
                    0,
                    4,
                    4,
                    [
                      3,
                      "com.amazonaws.iam",
                      "AttachedPermissionsBoundary",
                      0,
                      ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                      [0, 0],
                    ],
                    [
                      1,
                      "com.amazonaws.iam",
                      "tagListType",
                      0,
                      [
                        3,
                        "com.amazonaws.iam",
                        "Tag",
                        0,
                        ["Key", "Value"],
                        [0, 0],
                      ],
                    ],
                  ],
                ],
              ],
              2,
              0,
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "GetInstanceProfile.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "GetInstanceProfile",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/GetInstanceProfileRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "GetInstanceProfileRequest",
            0,
            ["InstanceProfileName"],
            [0],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "GetInstanceProfileResponse",
            0,
            ["InstanceProfile"],
            [
              [
                3,
                "com.amazonaws.iam",
                "InstanceProfile",
                0,
                [
                  "Path",
                  "InstanceProfileName",
                  "InstanceProfileId",
                  "Arn",
                  "CreateDate",
                  "Roles",
                  "Tags",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  [
                    1,
                    "com.amazonaws.iam",
                    "roleListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Role",
                      0,
                      [
                        "Path",
                        "RoleName",
                        "RoleId",
                        "Arn",
                        "CreateDate",
                        "AssumeRolePolicyDocument",
                        "Description",
                        "MaxSessionDuration",
                        "PermissionsBoundary",
                        "Tags",
                        "RoleLastUsed",
                        "SourceRoleTemplate",
                      ],
                      [
                        0,
                        0,
                        0,
                        0,
                        4,
                        0,
                        0,
                        1,
                        [
                          3,
                          "com.amazonaws.iam",
                          "AttachedPermissionsBoundary",
                          0,
                          ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                          [0, 0],
                        ],
                        [
                          1,
                          "com.amazonaws.iam",
                          "tagListType",
                          0,
                          [
                            3,
                            "com.amazonaws.iam",
                            "Tag",
                            0,
                            ["Key", "Value"],
                            [0, 0],
                          ],
                        ],
                        [
                          3,
                          "com.amazonaws.iam",
                          "RoleLastUsed",
                          0,
                          ["LastUsedDate", "Region"],
                          [4, 0],
                        ],
                        [
                          3,
                          "com.amazonaws.iam",
                          "SourceRoleTemplate",
                          0,
                          ["TemplateArn", "TemplateMinorVersion"],
                          [0, 1],
                        ],
                      ],
                    ],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {
          InstanceProfileExists: {
            acceptors: [
              {
                state: "success",
                matcher: {
                  success: true,
                },
              },
              {
                state: "retry",
                matcher: {
                  errorType: "NoSuchEntityException",
                },
              },
            ],
            minDelay: 1,
          },
        },
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "GetPolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "GetPolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/GetPolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "GetPolicyRequest",
            0,
            ["PolicyArn"],
            [0],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "GetPolicyResponse",
            0,
            ["Policy"],
            [
              [
                3,
                "com.amazonaws.iam",
                "Policy",
                0,
                [
                  "PolicyName",
                  "PolicyId",
                  "Arn",
                  "Path",
                  "DefaultVersionId",
                  "AttachmentCount",
                  "PermissionsBoundaryUsageCount",
                  "IsAttachable",
                  "Description",
                  "CreateDate",
                  "UpdateDate",
                  "Tags",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  1,
                  2,
                  0,
                  4,
                  4,
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {
          PolicyExists: {
            acceptors: [
              {
                state: "success",
                matcher: {
                  success: true,
                },
              },
              {
                state: "retry",
                matcher: {
                  errorType: "NoSuchEntity",
                },
              },
            ],
            minDelay: 1,
          },
        },
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "GetPolicyVersion.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "GetPolicyVersion",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/GetPolicyVersionRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "GetPolicyVersionRequest",
            0,
            ["PolicyArn", "VersionId"],
            [0, 0],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "GetPolicyVersionResponse",
            0,
            ["PolicyVersion"],
            [
              [
                3,
                "com.amazonaws.iam",
                "PolicyVersion",
                0,
                ["Document", "VersionId", "IsDefaultVersion", "CreateDate"],
                [0, 0, 2, 4],
              ],
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "GetRole.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "GetRole",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/GetRoleRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "GetRoleRequest",
            0,
            ["RoleName"],
            [0],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "GetRoleResponse",
            0,
            ["Role"],
            [
              [
                3,
                "com.amazonaws.iam",
                "Role",
                0,
                [
                  "Path",
                  "RoleName",
                  "RoleId",
                  "Arn",
                  "CreateDate",
                  "AssumeRolePolicyDocument",
                  "Description",
                  "MaxSessionDuration",
                  "PermissionsBoundary",
                  "Tags",
                  "RoleLastUsed",
                  "SourceRoleTemplate",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  0,
                  0,
                  1,
                  [
                    3,
                    "com.amazonaws.iam",
                    "AttachedPermissionsBoundary",
                    0,
                    ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                    [0, 0],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "RoleLastUsed",
                    0,
                    ["LastUsedDate", "Region"],
                    [4, 0],
                  ],
                  [
                    3,
                    "com.amazonaws.iam",
                    "SourceRoleTemplate",
                    0,
                    ["TemplateArn", "TemplateMinorVersion"],
                    [0, 1],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {
          RoleExists: {
            acceptors: [
              {
                state: "success",
                matcher: {
                  success: true,
                },
              },
              {
                state: "retry",
                matcher: {
                  errorType: "NoSuchEntity",
                },
              },
            ],
            minDelay: 1,
          },
        },
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "GetRolePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "GetRolePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/GetRolePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "GetRolePolicyRequest",
            0,
            ["RoleName", "PolicyName"],
            [0, 0],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "GetRolePolicyResponse",
            0,
            ["RoleName", "PolicyName", "PolicyDocument"],
            [0, 0, 0],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "GetUser.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "GetUser",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/GetUserRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "GetUserRequest",
            0,
            ["UserName"],
            [0],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "GetUserResponse",
            0,
            ["User"],
            [
              [
                3,
                "com.amazonaws.iam",
                "User",
                0,
                [
                  "Path",
                  "UserName",
                  "UserId",
                  "Arn",
                  "CreateDate",
                  "PasswordLastUsed",
                  "PermissionsBoundary",
                  "Tags",
                ],
                [
                  0,
                  0,
                  0,
                  0,
                  4,
                  4,
                  [
                    3,
                    "com.amazonaws.iam",
                    "AttachedPermissionsBoundary",
                    0,
                    ["PermissionsBoundaryType", "PermissionsBoundaryArn"],
                    [0, 0],
                  ],
                  [
                    1,
                    "com.amazonaws.iam",
                    "tagListType",
                    0,
                    [
                      3,
                      "com.amazonaws.iam",
                      "Tag",
                      0,
                      ["Key", "Value"],
                      [0, 0],
                    ],
                  ],
                ],
              ],
            ],
          ],
        },
        "x-aws-waiters": {
          UserExists: {
            acceptors: [
              {
                state: "success",
                matcher: {
                  success: true,
                },
              },
              {
                state: "retry",
                matcher: {
                  errorType: "NoSuchEntity",
                },
              },
            ],
            minDelay: 1,
          },
        },
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "ListAttachedRolePolicies.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "ListAttachedRolePolicies",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/ListAttachedRolePoliciesRequest",
        },
        "x-aws-pagination": {
          inputToken: "Marker",
          outputToken: "Marker",
          items: "AttachedPolicies",
          pageSize: "MaxItems",
        },
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "ListAttachedRolePoliciesRequest",
            0,
            ["RoleName", "PathPrefix", "Marker", "MaxItems"],
            [0, 0, 0, 1],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "ListAttachedRolePoliciesResponse",
            0,
            ["AttachedPolicies", "IsTruncated", "Marker"],
            [
              [
                1,
                "com.amazonaws.iam",
                "attachedPoliciesListType",
                0,
                [
                  3,
                  "com.amazonaws.iam",
                  "AttachedPolicy",
                  0,
                  ["PolicyName", "PolicyArn"],
                  [0, 0],
                ],
              ],
              2,
              0,
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "ListGroupsForUser.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "ListGroupsForUser",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/ListGroupsForUserRequest",
        },
        "x-aws-pagination": {
          inputToken: "Marker",
          outputToken: "Marker",
          items: "Groups",
          pageSize: "MaxItems",
        },
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "ListGroupsForUserRequest",
            0,
            ["UserName", "Marker", "MaxItems"],
            [0, 0, 1],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "ListGroupsForUserResponse",
            0,
            ["Groups", "IsTruncated", "Marker"],
            [
              [
                1,
                "com.amazonaws.iam",
                "groupListType",
                0,
                [
                  3,
                  "com.amazonaws.iam",
                  "Group",
                  0,
                  ["Path", "GroupName", "GroupId", "Arn", "CreateDate"],
                  [0, 0, 0, 0, 4],
                ],
              ],
              2,
              0,
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "ListPolicyVersions.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "ListPolicyVersions",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/ListPolicyVersionsRequest",
        },
        "x-aws-pagination": {
          inputToken: "Marker",
          outputToken: "Marker",
          items: "Versions",
          pageSize: "MaxItems",
        },
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "ListPolicyVersionsRequest",
            0,
            ["PolicyArn", "Marker", "MaxItems"],
            [0, 0, 1],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "ListPolicyVersionsResponse",
            0,
            ["Versions", "IsTruncated", "Marker"],
            [
              [
                1,
                "com.amazonaws.iam",
                "policyDocumentVersionListType",
                0,
                [
                  3,
                  "com.amazonaws.iam",
                  "PolicyVersion",
                  0,
                  ["Document", "VersionId", "IsDefaultVersion", "CreateDate"],
                  [0, 0, 2, 4],
                ],
              ],
              2,
              0,
            ],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "ListRolePolicies.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "ListRolePolicies",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/ListRolePoliciesRequest",
        },
        "x-aws-pagination": {
          inputToken: "Marker",
          outputToken: "Marker",
          items: "PolicyNames",
          pageSize: "MaxItems",
        },
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "ListRolePoliciesRequest",
            0,
            ["RoleName", "Marker", "MaxItems"],
            [0, 0, 1],
          ],
          output: [
            3,
            "com.amazonaws.iam",
            "ListRolePoliciesResponse",
            0,
            ["PolicyNames", "IsTruncated", "Marker"],
            [[1, "com.amazonaws.iam", "policyNameListType", 0, 0], 2, 0],
          ],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "PutRolePermissionsBoundary.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "PutRolePermissionsBoundary",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/PolicyNotAttachableException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/PutRolePermissionsBoundaryRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "PutRolePermissionsBoundaryRequest",
            0,
            ["RoleName", "PermissionsBoundary"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "PutRolePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "PutRolePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/MalformedPolicyDocumentException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/PutRolePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "PutRolePolicyRequest",
            0,
            ["RoleName", "PolicyName", "PolicyDocument"],
            [0, 0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "RemoveRoleFromInstanceProfile.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "RemoveRoleFromInstanceProfile",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/RemoveRoleFromInstanceProfileRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "RemoveRoleFromInstanceProfileRequest",
            0,
            ["InstanceProfileName", "RoleName"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "RemoveUserFromGroup.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "RemoveUserFromGroup",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/RemoveUserFromGroupRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "RemoveUserFromGroupRequest",
            0,
            ["GroupName", "UserName"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "TagPolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "TagPolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/TagPolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "TagPolicyRequest",
            0,
            ["PolicyArn", "Tags"],
            [
              0,
              [
                1,
                "com.amazonaws.iam",
                "tagListType",
                0,
                [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
              ],
            ],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "TagRole.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "TagRole",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/TagRoleRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "TagRoleRequest",
            0,
            ["RoleName", "Tags"],
            [
              0,
              [
                1,
                "com.amazonaws.iam",
                "tagListType",
                0,
                [3, "com.amazonaws.iam", "Tag", 0, ["Key", "Value"], [0, 0]],
              ],
            ],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "UntagPolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "UntagPolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/InvalidInputException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/UntagPolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "UntagPolicyRequest",
            0,
            ["PolicyArn", "TagKeys"],
            [0, [1, "com.amazonaws.iam", "tagKeyListType", 0, 0]],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "UntagRole.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "UntagRole",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/UntagRoleRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "UntagRoleRequest",
            0,
            ["RoleName", "TagKeys"],
            [0, [1, "com.amazonaws.iam", "tagKeyListType", 0, 0]],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "UpdateAssumeRolePolicy.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "UpdateAssumeRolePolicy",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/MalformedPolicyDocumentException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/UpdateAssumeRolePolicyRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "UpdateAssumeRolePolicyRequest",
            0,
            ["RoleName", "PolicyDocument"],
            [0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "UpdateGroup.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "UpdateGroup",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/UpdateGroupRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "UpdateGroupRequest",
            0,
            ["GroupName", "NewPath", "NewGroupName"],
            [0, 0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "UpdateRole.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "UpdateRole",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": ["text/xml"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
          {
            $ref: "#/components/schemas/UnmodifiableEntityException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/UpdateRoleRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "UpdateRoleRequest",
            0,
            ["RoleName", "Description", "MaxSessionDuration"],
            [0, 0, 1],
          ],
          output: [3, "com.amazonaws.iam", "UpdateRoleResponse", 0, [], []],
        },
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.iam#AWSIdentityManagementV20100508",
      name: "UpdateUser.json",
      format: "Smithy",
    },
    version: "2010-05-08",
    operationId: "UpdateUser",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [],
    responses: {
      "200": [],
    },
    providerMetadata: {
      document: {
        "x-aws-service": iamService,
      },
      operation: {
        "x-aws-errors": [
          {
            $ref: "#/components/schemas/ConcurrentModificationException",
          },
          {
            $ref: "#/components/schemas/EntityAlreadyExistsException",
          },
          {
            $ref: "#/components/schemas/EntityTemporarilyUnmodifiableException",
          },
          {
            $ref: "#/components/schemas/LimitExceededException",
          },
          {
            $ref: "#/components/schemas/NoSuchEntityException",
          },
          {
            $ref: "#/components/schemas/ServiceFailureException",
          },
        ],
        "x-aws-idempotency-tokens": [],
        "x-aws-input": {
          $ref: "#/components/schemas/UpdateUserRequest",
        },
        "x-aws-pagination": {},
        "x-aws-query": {
          input: [
            3,
            "com.amazonaws.iam",
            "UpdateUserRequest",
            0,
            ["UserName", "NewPath", "NewUserName"],
            [0, 0, 0],
          ],
          output: "unit",
        },
        "x-aws-waiters": {},
      },
    },
  },
];
