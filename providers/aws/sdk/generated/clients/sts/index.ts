// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.

import { AwsClient } from "@nomoss/aws";
import type {
  AwsQueryOperation,
  AwsServiceDefinition,
} from "@nomoss/aws/model";
import { Effect, Schema } from "effect";

export const PolicyDescriptorType = Schema.StructWithRest(
  Schema.Struct({
    arn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(2048).annotate({
            expected: "a string with at most 2048 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
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
).annotate({ identifier: "PolicyDescriptorType" });

export type PolicyDescriptorType = typeof PolicyDescriptorType.Type;

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

export const ProvidedContext = Schema.StructWithRest(
  Schema.Struct({
    ProviderArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(2048).annotate({
            expected: "a string with at most 2048 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
          }),
        ),
    ),
    ContextAssertion: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(4).annotate({
          expected: "a string with at least 4 code points",
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
).annotate({ identifier: "ProvidedContext" });

export type ProvidedContext = typeof ProvidedContext.Type;

export const Credentials = Schema.StructWithRest(
  Schema.Struct({
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
        Schema.isPattern(new globalThis.RegExp("^[\\w]*$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\w]*$",
        }),
      ),
    SecretAccessKey: Schema.String.annotate({ format: "password" }),
    SessionToken: Schema.String,
    Expiration: Schema.String.annotate({ format: "date-time" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Credentials" });

export type Credentials = typeof Credentials.Type;

export const AssumedRoleUser = Schema.StructWithRest(
  Schema.Struct({
    AssumedRoleId: Schema.String.check(
      Schema.isMinCodePoints(2).annotate({
        expected: "a string with at least 2 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(193).annotate({
          expected: "a string with at most 193 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[\\w+=,.@:-]*$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[\\w+=,.@:-]*$",
        }),
      ),
    Arn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "AssumedRoleUser" });

export type AssumedRoleUser = typeof AssumedRoleUser.Type;

export const AssumeRoleRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
        }),
      ),
    RoleSessionName: Schema.String.check(
      Schema.isMinCodePoints(2).annotate({
        expected: "a string with at least 2 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]*$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]*$" },
        ),
      ),
    PolicyArns: Schema.optionalKey(Schema.Array(PolicyDescriptorType)),
    Policy: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
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
    DurationSeconds: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(900).annotate({
          expected: "a value greater than or equal to 900",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(43200).annotate({
          expected: "a value less than or equal to 43200",
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
    TransitiveTagKeys: Schema.optionalKey(
      Schema.Array(
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
    ),
    ExternalId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(2).annotate({
          expected: "a string with at least 2 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1224).annotate({
            expected: "a string with at most 1224 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@:\\/-]*$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@:\\/-]*$",
          }),
        ),
    ),
    SerialNumber: Schema.optionalKey(
      Schema.String.check(
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
            new globalThis.RegExp("^[\\w+=/:,.@-]*$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=/:,.@-]*$",
          }),
        ),
    ),
    TokenCode: Schema.optionalKey(
      Schema.String.check(
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
          Schema.isPattern(new globalThis.RegExp("^[\\d]*$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\d]*$",
          }),
        ),
    ),
    SourceIdentity: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(2).annotate({
          expected: "a string with at least 2 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]*$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]*$",
          }),
        ),
    ),
    ProvidedContexts: Schema.optionalKey(
      Schema.Array(ProvidedContext)
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(5).annotate({
            expected: "a value with a length of at most 5",
          }),
        ),
    ),
    MinimumSessionTokenSize: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(4096).annotate({
          expected: "a value less than or equal to 4096",
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

export type AssumeRoleRequest = typeof AssumeRoleRequest.Type;

export const AssumeRoleResponse = Schema.StructWithRest(
  Schema.Struct({
    Credentials: Schema.optionalKey(Credentials),
    AssumedRoleUser: Schema.optionalKey(AssumedRoleUser),
    PackedPolicySize: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    ),
    SourceIdentity: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(2).annotate({
          expected: "a string with at least 2 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]*$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]*$",
          }),
        ),
    ),
    SessionTokenUtilization: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    ),
    SessionTokenSize: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
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

export type AssumeRoleResponse = typeof AssumeRoleResponse.Type;

export const ExpiredTokenException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ExpiredTokenException = typeof ExpiredTokenException.Type;

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

export const PackedPolicyTooLargeException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PackedPolicyTooLargeException =
  typeof PackedPolicyTooLargeException.Type;

export const RegionDisabledException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type RegionDisabledException = typeof RegionDisabledException.Type;

export const AssumeRoleWithWebIdentityRequest = Schema.StructWithRest(
  Schema.Struct({
    RoleArn: Schema.String.check(
      Schema.isMinCodePoints(20).annotate({
        expected: "a string with at least 20 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
        }),
      ),
    RoleSessionName: Schema.String.check(
      Schema.isMinCodePoints(2).annotate({
        expected: "a string with at least 2 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\w+=,.@-]*$", "u")).annotate(
          { expected: "a string matching the RegExp ^[\\w+=,.@-]*$" },
        ),
      ),
    WebIdentityToken: Schema.String.annotate({ format: "password" })
      .check(
        Schema.isMinCodePoints(4).annotate({
          expected: "a string with at least 4 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(20000).annotate({
          expected: "a string with at most 20000 code points",
        }),
      ),
    ProviderId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(4).annotate({
          expected: "a string with at least 4 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
    PolicyArns: Schema.optionalKey(Schema.Array(PolicyDescriptorType)),
    Policy: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(2048).annotate({
            expected: "a string with at most 2048 code points",
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
    DurationSeconds: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(900).annotate({
          expected: "a value greater than or equal to 900",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(43200).annotate({
          expected: "a value less than or equal to 43200",
        }),
      ),
    ),
    MinimumSessionTokenSize: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(4096).annotate({
          expected: "a value less than or equal to 4096",
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

export type AssumeRoleWithWebIdentityRequest =
  typeof AssumeRoleWithWebIdentityRequest.Type;

export const AssumeRoleWithWebIdentityResponse = Schema.StructWithRest(
  Schema.Struct({
    Credentials: Schema.optionalKey(Credentials),
    SubjectFromWebIdentityToken: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(6).annotate({
          expected: "a string with at least 6 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(255).annotate({
          expected: "a string with at most 255 code points",
        }),
      ),
    ),
    AssumedRoleUser: Schema.optionalKey(AssumedRoleUser),
    PackedPolicySize: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    ),
    Provider: Schema.optionalKey(Schema.String),
    Audience: Schema.optionalKey(Schema.String),
    SourceIdentity: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(2).annotate({
          expected: "a string with at least 2 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[\\w+=,.@-]*$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\w+=,.@-]*$",
          }),
        ),
    ),
    SessionTokenUtilization: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    ),
    SessionTokenSize: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
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

export type AssumeRoleWithWebIdentityResponse =
  typeof AssumeRoleWithWebIdentityResponse.Type;

export const IDPCommunicationErrorException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type IDPCommunicationErrorException =
  typeof IDPCommunicationErrorException.Type;

export const IDPRejectedClaimException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type IDPRejectedClaimException = typeof IDPRejectedClaimException.Type;

export const InvalidIdentityTokenException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidIdentityTokenException =
  typeof InvalidIdentityTokenException.Type;

export const GetCallerIdentityRequest = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
);

export type GetCallerIdentityRequest = typeof GetCallerIdentityRequest.Type;

export const GetCallerIdentityResponse = Schema.StructWithRest(
  Schema.Struct({
    UserId: Schema.optionalKey(Schema.String),
    Account: Schema.optionalKey(Schema.String),
    Arn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(2048).annotate({
            expected: "a string with at most 2048 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]+$",
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

export type GetCallerIdentityResponse = typeof GetCallerIdentityResponse.Type;

export const stsErrors = {
  ExpiredTokenException: {
    name: "ExpiredTokenException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "ExpiredTokenException",
    schema: ExpiredTokenException,
  },
  MalformedPolicyDocumentException: {
    name: "MalformedPolicyDocumentException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "MalformedPolicyDocument",
    schema: MalformedPolicyDocumentException,
  },
  PackedPolicyTooLargeException: {
    name: "PackedPolicyTooLargeException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "PackedPolicyTooLarge",
    schema: PackedPolicyTooLargeException,
  },
  RegionDisabledException: {
    name: "RegionDisabledException",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "RegionDisabledException",
    schema: RegionDisabledException,
  },
  IDPCommunicationErrorException: {
    name: "IDPCommunicationErrorException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "IDPCommunicationError",
    schema: IDPCommunicationErrorException,
  },
  IDPRejectedClaimException: {
    name: "IDPRejectedClaimException",
    fault: "client",
    httpStatus: 403,
    retryable: null,
    code: "IDPRejectedClaim",
    schema: IDPRejectedClaimException,
  },
  InvalidIdentityTokenException: {
    name: "InvalidIdentityTokenException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "InvalidIdentityToken",
    schema: InvalidIdentityTokenException,
  },
};

export const assumeRoleErrors = [
  stsErrors.ExpiredTokenException,
  stsErrors.MalformedPolicyDocumentException,
  stsErrors.PackedPolicyTooLargeException,
  stsErrors.RegionDisabledException,
];

export const assumeRoleWithWebIdentityErrors = [
  stsErrors.ExpiredTokenException,
  stsErrors.IDPCommunicationErrorException,
  stsErrors.IDPRejectedClaimException,
  stsErrors.InvalidIdentityTokenException,
  stsErrors.MalformedPolicyDocumentException,
  stsErrors.PackedPolicyTooLargeException,
  stsErrors.RegionDisabledException,
];

export const getCallerIdentityErrors = [];

export const assumeRoleOperation: AwsQueryOperation & {
  readonly input: typeof AssumeRoleRequest;
  readonly output: typeof AssumeRoleResponse;
} = {
  name: "AssumeRole",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.sts#AssumeRoleRequest",
    output: "com.amazonaws.sts#AssumeRoleResponse",
    shapes: {
      "com.amazonaws.sts#AssumeRoleRequest": {
        type: "structure",
        members: {
          RoleArn: {
            target: "com.amazonaws.sts#arnType",
          },
          RoleSessionName: {
            target: "com.amazonaws.sts#roleSessionNameType",
          },
          PolicyArns: {
            target: "com.amazonaws.sts#policyDescriptorListType",
          },
          Policy: {
            target: "com.amazonaws.sts#unrestrictedSessionPolicyDocumentType",
          },
          DurationSeconds: {
            target: "com.amazonaws.sts#roleDurationSecondsType",
          },
          Tags: {
            target: "com.amazonaws.sts#tagListType",
          },
          TransitiveTagKeys: {
            target: "com.amazonaws.sts#tagKeyListType",
          },
          ExternalId: {
            target: "com.amazonaws.sts#externalIdType",
          },
          SerialNumber: {
            target: "com.amazonaws.sts#serialNumberType",
          },
          TokenCode: {
            target: "com.amazonaws.sts#tokenCodeType",
          },
          SourceIdentity: {
            target: "com.amazonaws.sts#sourceIdentityType",
          },
          ProvidedContexts: {
            target: "com.amazonaws.sts#ProvidedContextsListType",
          },
          MinimumSessionTokenSize: {
            target: "com.amazonaws.sts#minimumSessionTokenSizeType",
          },
        },
      },
      "com.amazonaws.sts#AssumeRoleResponse": {
        type: "structure",
        members: {
          Credentials: {
            target: "com.amazonaws.sts#Credentials",
          },
          AssumedRoleUser: {
            target: "com.amazonaws.sts#AssumedRoleUser",
          },
          PackedPolicySize: {
            target: "com.amazonaws.sts#nonNegativeIntegerType",
          },
          SourceIdentity: {
            target: "com.amazonaws.sts#sourceIdentityType",
          },
          SessionTokenUtilization: {
            target: "com.amazonaws.sts#sessionTokenUtilizationType",
          },
          SessionTokenSize: {
            target: "com.amazonaws.sts#sessionTokenSizeType",
          },
        },
      },
      "com.amazonaws.sts#arnType": {
        type: "string",
      },
      "com.amazonaws.sts#roleSessionNameType": {
        type: "string",
      },
      "com.amazonaws.sts#policyDescriptorListType": {
        type: "list",
        member: {
          target: "com.amazonaws.sts#PolicyDescriptorType",
        },
      },
      "com.amazonaws.sts#unrestrictedSessionPolicyDocumentType": {
        type: "string",
      },
      "com.amazonaws.sts#roleDurationSecondsType": {
        type: "number",
      },
      "com.amazonaws.sts#tagListType": {
        type: "list",
        member: {
          target: "com.amazonaws.sts#Tag",
        },
      },
      "com.amazonaws.sts#tagKeyListType": {
        type: "list",
        member: {
          target: "com.amazonaws.sts#tagKeyType",
        },
      },
      "com.amazonaws.sts#externalIdType": {
        type: "string",
      },
      "com.amazonaws.sts#serialNumberType": {
        type: "string",
      },
      "com.amazonaws.sts#tokenCodeType": {
        type: "string",
      },
      "com.amazonaws.sts#sourceIdentityType": {
        type: "string",
      },
      "com.amazonaws.sts#ProvidedContextsListType": {
        type: "list",
        member: {
          target: "com.amazonaws.sts#ProvidedContext",
        },
      },
      "com.amazonaws.sts#minimumSessionTokenSizeType": {
        type: "number",
      },
      "com.amazonaws.sts#Credentials": {
        type: "structure",
        members: {
          AccessKeyId: {
            target: "com.amazonaws.sts#accessKeyIdType",
          },
          SecretAccessKey: {
            target: "com.amazonaws.sts#accessKeySecretType",
          },
          SessionToken: {
            target: "com.amazonaws.sts#tokenType",
          },
          Expiration: {
            target: "com.amazonaws.sts#dateType",
          },
        },
      },
      "com.amazonaws.sts#AssumedRoleUser": {
        type: "structure",
        members: {
          AssumedRoleId: {
            target: "com.amazonaws.sts#assumedRoleIdType",
          },
          Arn: {
            target: "com.amazonaws.sts#arnType",
          },
        },
      },
      "com.amazonaws.sts#nonNegativeIntegerType": {
        type: "number",
      },
      "com.amazonaws.sts#sessionTokenUtilizationType": {
        type: "number",
      },
      "com.amazonaws.sts#sessionTokenSizeType": {
        type: "number",
      },
      "com.amazonaws.sts#PolicyDescriptorType": {
        type: "structure",
        members: {
          arn: {
            target: "com.amazonaws.sts#arnType",
          },
        },
      },
      "com.amazonaws.sts#Tag": {
        type: "structure",
        members: {
          Key: {
            target: "com.amazonaws.sts#tagKeyType",
          },
          Value: {
            target: "com.amazonaws.sts#tagValueType",
          },
        },
      },
      "com.amazonaws.sts#tagKeyType": {
        type: "string",
      },
      "com.amazonaws.sts#ProvidedContext": {
        type: "structure",
        members: {
          ProviderArn: {
            target: "com.amazonaws.sts#arnType",
          },
          ContextAssertion: {
            target: "com.amazonaws.sts#contextAssertionType",
          },
        },
      },
      "com.amazonaws.sts#accessKeyIdType": {
        type: "string",
      },
      "com.amazonaws.sts#accessKeySecretType": {
        type: "string",
      },
      "com.amazonaws.sts#tokenType": {
        type: "string",
      },
      "com.amazonaws.sts#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.sts#assumedRoleIdType": {
        type: "string",
      },
      "com.amazonaws.sts#tagValueType": {
        type: "string",
      },
      "com.amazonaws.sts#contextAssertionType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AssumeRoleRequest,
  output: AssumeRoleResponse,
  errors: assumeRoleErrors,
};

export const assumeRoleWithWebIdentityOperation: AwsQueryOperation & {
  readonly input: typeof AssumeRoleWithWebIdentityRequest;
  readonly output: typeof AssumeRoleWithWebIdentityResponse;
} = {
  name: "AssumeRoleWithWebIdentity",
  unsigned: true,
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.sts#AssumeRoleWithWebIdentityRequest",
    output: "com.amazonaws.sts#AssumeRoleWithWebIdentityResponse",
    shapes: {
      "com.amazonaws.sts#AssumeRoleWithWebIdentityRequest": {
        type: "structure",
        members: {
          RoleArn: {
            target: "com.amazonaws.sts#arnType",
          },
          RoleSessionName: {
            target: "com.amazonaws.sts#roleSessionNameType",
          },
          WebIdentityToken: {
            target: "com.amazonaws.sts#clientTokenType",
          },
          ProviderId: {
            target: "com.amazonaws.sts#urlType",
          },
          PolicyArns: {
            target: "com.amazonaws.sts#policyDescriptorListType",
          },
          Policy: {
            target: "com.amazonaws.sts#sessionPolicyDocumentType",
          },
          DurationSeconds: {
            target: "com.amazonaws.sts#roleDurationSecondsType",
          },
          MinimumSessionTokenSize: {
            target: "com.amazonaws.sts#minimumSessionTokenSizeType",
          },
        },
      },
      "com.amazonaws.sts#AssumeRoleWithWebIdentityResponse": {
        type: "structure",
        members: {
          Credentials: {
            target: "com.amazonaws.sts#Credentials",
          },
          SubjectFromWebIdentityToken: {
            target: "com.amazonaws.sts#webIdentitySubjectType",
          },
          AssumedRoleUser: {
            target: "com.amazonaws.sts#AssumedRoleUser",
          },
          PackedPolicySize: {
            target: "com.amazonaws.sts#nonNegativeIntegerType",
          },
          Provider: {
            target: "com.amazonaws.sts#Issuer",
          },
          Audience: {
            target: "com.amazonaws.sts#Audience",
          },
          SourceIdentity: {
            target: "com.amazonaws.sts#sourceIdentityType",
          },
          SessionTokenUtilization: {
            target: "com.amazonaws.sts#sessionTokenUtilizationType",
          },
          SessionTokenSize: {
            target: "com.amazonaws.sts#sessionTokenSizeType",
          },
        },
      },
      "com.amazonaws.sts#arnType": {
        type: "string",
      },
      "com.amazonaws.sts#roleSessionNameType": {
        type: "string",
      },
      "com.amazonaws.sts#clientTokenType": {
        type: "string",
      },
      "com.amazonaws.sts#urlType": {
        type: "string",
      },
      "com.amazonaws.sts#policyDescriptorListType": {
        type: "list",
        member: {
          target: "com.amazonaws.sts#PolicyDescriptorType",
        },
      },
      "com.amazonaws.sts#sessionPolicyDocumentType": {
        type: "string",
      },
      "com.amazonaws.sts#roleDurationSecondsType": {
        type: "number",
      },
      "com.amazonaws.sts#minimumSessionTokenSizeType": {
        type: "number",
      },
      "com.amazonaws.sts#Credentials": {
        type: "structure",
        members: {
          AccessKeyId: {
            target: "com.amazonaws.sts#accessKeyIdType",
          },
          SecretAccessKey: {
            target: "com.amazonaws.sts#accessKeySecretType",
          },
          SessionToken: {
            target: "com.amazonaws.sts#tokenType",
          },
          Expiration: {
            target: "com.amazonaws.sts#dateType",
          },
        },
      },
      "com.amazonaws.sts#webIdentitySubjectType": {
        type: "string",
      },
      "com.amazonaws.sts#AssumedRoleUser": {
        type: "structure",
        members: {
          AssumedRoleId: {
            target: "com.amazonaws.sts#assumedRoleIdType",
          },
          Arn: {
            target: "com.amazonaws.sts#arnType",
          },
        },
      },
      "com.amazonaws.sts#nonNegativeIntegerType": {
        type: "number",
      },
      "com.amazonaws.sts#Issuer": {
        type: "string",
      },
      "com.amazonaws.sts#Audience": {
        type: "string",
      },
      "com.amazonaws.sts#sourceIdentityType": {
        type: "string",
      },
      "com.amazonaws.sts#sessionTokenUtilizationType": {
        type: "number",
      },
      "com.amazonaws.sts#sessionTokenSizeType": {
        type: "number",
      },
      "com.amazonaws.sts#PolicyDescriptorType": {
        type: "structure",
        members: {
          arn: {
            target: "com.amazonaws.sts#arnType",
          },
        },
      },
      "com.amazonaws.sts#accessKeyIdType": {
        type: "string",
      },
      "com.amazonaws.sts#accessKeySecretType": {
        type: "string",
      },
      "com.amazonaws.sts#tokenType": {
        type: "string",
      },
      "com.amazonaws.sts#dateType": {
        type: "timestamp",
      },
      "com.amazonaws.sts#assumedRoleIdType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: AssumeRoleWithWebIdentityRequest,
  output: AssumeRoleWithWebIdentityResponse,
  errors: assumeRoleWithWebIdentityErrors,
};

export const getCallerIdentityOperation: AwsQueryOperation & {
  readonly input: typeof GetCallerIdentityRequest;
  readonly output: typeof GetCallerIdentityResponse;
} = {
  name: "GetCallerIdentity",
  method: "POST",
  path: "/",
  headers: {},
  query: {
    input: "com.amazonaws.sts#GetCallerIdentityRequest",
    output: "com.amazonaws.sts#GetCallerIdentityResponse",
    shapes: {
      "com.amazonaws.sts#GetCallerIdentityRequest": {
        type: "structure",
        members: {},
      },
      "com.amazonaws.sts#GetCallerIdentityResponse": {
        type: "structure",
        members: {
          UserId: {
            target: "com.amazonaws.sts#userIdType",
          },
          Account: {
            target: "com.amazonaws.sts#accountType",
          },
          Arn: {
            target: "com.amazonaws.sts#arnType",
          },
        },
      },
      "com.amazonaws.sts#userIdType": {
        type: "string",
      },
      "com.amazonaws.sts#accountType": {
        type: "string",
      },
      "com.amazonaws.sts#arnType": {
        type: "string",
      },
    },
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetCallerIdentityRequest,
  output: GetCallerIdentityResponse,
  errors: getCallerIdentityErrors,
};

export const stsOperations = {
  AssumeRole: assumeRoleOperation,
  AssumeRoleWithWebIdentity: assumeRoleWithWebIdentityOperation,
  GetCallerIdentity: getCallerIdentityOperation,
};

export const stsService: AwsServiceDefinition = {
  service: "com.amazonaws.sts#AWSSecurityTokenServiceV20110615",
  version: "2011-06-15",
  protocol: "awsQuery",
  signingName: "sts",
  endpointRules: {
    version: "1.0",
    parameters: {
      Region: {
        type: "string",
        required: false,
      },
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
      UseGlobalEndpoint: {
        type: "boolean",
        required: true,
        default: false,
      },
    },
    rules: [
      {
        conditions: [
          {
            fn: "booleanEquals",
            argv: [
              {
                ref: "UseGlobalEndpoint",
              },
              true,
            ],
          },
          {
            fn: "not",
            argv: [
              {
                fn: "isSet",
                argv: [
                  {
                    ref: "Endpoint",
                  },
                ],
              },
            ],
          },
          {
            fn: "isSet",
            argv: [
              {
                ref: "Region",
              },
            ],
          },
          {
            fn: "aws.partition",
            argv: [
              {
                ref: "Region",
              },
            ],
            assign: "PartitionResult",
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
        rules: [
          {
            conditions: [
              {
                fn: "stringEquals",
                argv: [
                  {
                    ref: "Region",
                  },
                  "ap-northeast-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "ap-south-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "ap-southeast-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "ap-southeast-2",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "aws-global",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "ca-central-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "eu-central-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "eu-north-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "eu-west-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "eu-west-2",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "eu-west-3",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "sa-east-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "us-east-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "us-east-2",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "us-west-1",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
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
                    ref: "Region",
                  },
                  "us-west-2",
                ],
              },
            ],
            endpoint: {
              url: "https://sts.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
                    signingRegion: "us-east-1",
                  },
                ],
              },
              headers: {},
            },
            type: "endpoint",
          },
          {
            conditions: [],
            endpoint: {
              url: "https://sts.{Region}.{PartitionResult#dnsSuffix}",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "sts",
                    signingRegion: "{Region}",
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
                          url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: {},
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
                        ],
                        endpoint: {
                          url: "https://sts.{Region}.amazonaws.com",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                          properties: {},
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
                          url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: {},
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
                conditions: [
                  {
                    fn: "stringEquals",
                    argv: [
                      {
                        ref: "Region",
                      },
                      "aws-global",
                    ],
                  },
                ],
                endpoint: {
                  url: "https://sts.amazonaws.com",
                  properties: {
                    authSchemes: [
                      {
                        name: "sigv4",
                        signingName: "sts",
                        signingRegion: "us-east-1",
                      },
                    ],
                  },
                  headers: {},
                },
                type: "endpoint",
              },
              {
                conditions: [],
                endpoint: {
                  url: "https://sts.{Region}.{PartitionResult#dnsSuffix}",
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
        error: "Invalid Configuration: Missing Region",
        type: "error",
      },
    ],
  },
  xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
};

/** The makeSTSClient Effect gives callers access to STS with the region and credentials configured in their AWS runtime. */
export const makeSTSClient = Effect.gen(function* () {
  const aws = yield* AwsClient;

  const bindOperation = aws.bindOperation(stsService);

  return {
    /** Returns a set of temporary security credentials that you can use to access Amazon Web Services resources. These temporary credentials consist of an access key ID, a secret access key, and a security token. Typically, you use AssumeRole within your account or for cross-account access. For a comparison of AssumeRole with other API operations that produce temporary credentials, see Requesting Temporary Security Credentials and Compare STS credentials in the IAM User Guide. */
    assumeRole: bindOperation(assumeRoleOperation),
    /** Returns a set of temporary security credentials for users who have been authenticated in a mobile or web application with a web identity provider. Example providers include the OAuth 2.0 providers Login with Amazon and Facebook, or any OpenID Connect-compatible identity provider such as Google or Amazon Cognito federated identities. */
    assumeRoleWithWebIdentity: bindOperation(
      assumeRoleWithWebIdentityOperation,
    ),
    /** Returns details about the IAM user or role whose credentials are used to call the operation. */
    getCallerIdentity: bindOperation(getCallerIdentityOperation),
  };
});
