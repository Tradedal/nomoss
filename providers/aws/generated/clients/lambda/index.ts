// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.

import { AwsClient } from "@tradedal/aws-client-core";
import {
  awsHttpEndpoint,
  optionalRestJsonMember,
} from "@tradedal/aws-client-core/http-operation";
import type {
  AwsRestJsonOperation,
  AwsServiceDefinition,
} from "@tradedal/aws-client-core/model";
import { Effect, Schema } from "effect";
import { HttpApi, HttpApiGroup, HttpApiSchema } from "effect/http-api";

export const FunctionUrlAuthType = Schema.Union([
  Schema.Literals(["NONE", "AWS_IAM"]),
  Schema.String,
]).annotate({ identifier: "FunctionUrlAuthType" });

export type FunctionUrlAuthType = typeof FunctionUrlAuthType.Type;

export const ThrottleReason = Schema.Union([
  Schema.Literals([
    "ConcurrentInvocationLimitExceeded",
    "FunctionInvocationRateLimitExceeded",
    "ReservedFunctionConcurrentInvocationLimitExceeded",
    "ReservedFunctionInvocationRateLimitExceeded",
    "CallerRateLimitExceeded",
    "ConcurrentSnapshotCreateLimitExceeded",
  ]),
  Schema.String,
]).annotate({ identifier: "ThrottleReason" });

export type ThrottleReason = typeof ThrottleReason.Type;

export const Runtime = Schema.Union([
  Schema.Literals([
    "nodejs",
    "nodejs4.3",
    "nodejs6.10",
    "nodejs8.10",
    "nodejs10.x",
    "nodejs12.x",
    "nodejs14.x",
    "nodejs16.x",
    "nodejs18.x",
    "nodejs20.x",
    "nodejs22.x",
    "nodejs24.x",
    "java8",
    "java8.al2",
    "java11",
    "java17",
    "java21",
    "java25",
    "python2.7",
    "python3.6",
    "python3.7",
    "python3.8",
    "python3.9",
    "python3.10",
    "python3.11",
    "python3.12",
    "python3.13",
    "python3.14",
    "dotnetcore1.0",
    "dotnetcore2.0",
    "dotnetcore2.1",
    "dotnetcore3.1",
    "dotnet6",
    "dotnet8",
    "dotnet10",
    "nodejs4.3-edge",
    "go1.x",
    "ruby2.5",
    "ruby2.7",
    "ruby3.2",
    "ruby3.3",
    "ruby3.4",
    "ruby4.0",
    "provided",
    "provided.al2",
    "provided.al2023",
    "nodejs26.x",
    "python3.15",
    "java8.al2023",
    "java11.al2023",
    "java17.al2023",
  ]),
  Schema.String,
]).annotate({ identifier: "Runtime" });

export type Runtime = typeof Runtime.Type;

export const S3ObjectStorageMode = Schema.Union([
  Schema.Literals(["COPY", "REFERENCE"]),
  Schema.String,
]).annotate({ identifier: "S3ObjectStorageMode" });

export type S3ObjectStorageMode = typeof S3ObjectStorageMode.Type;

export const FunctionVersionLatestPublished = Schema.Literal(
  "LATEST_PUBLISHED",
).annotate({ identifier: "FunctionVersionLatestPublished" });

export type FunctionVersionLatestPublished =
  typeof FunctionVersionLatestPublished.Type;

export const VpcConfig = Schema.StructWithRest(
  Schema.Struct({
    SubnetIds: optionalRestJsonMember(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(0).annotate({
            expected: "a string with at least 0 code points",
          }),
        )
          .check(
            Schema.isMaxCodePoints(1024).annotate({
              expected: "a string with at most 1024 code points",
            }),
          )
          .check(
            Schema.isPattern(
              new globalThis.RegExp("^subnet-[0-9a-z]*$", "u"),
            ).annotate({
              expected: "a string matching the RegExp ^subnet-[0-9a-z]*$",
            }),
          ),
      )
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(16).annotate({
            expected: "a value with a length of at most 16",
          }),
        ),
    ),
    SecurityGroupIds: optionalRestJsonMember(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(0).annotate({
            expected: "a string with at least 0 code points",
          }),
        )
          .check(
            Schema.isMaxCodePoints(1024).annotate({
              expected: "a string with at most 1024 code points",
            }),
          )
          .check(
            Schema.isPattern(
              new globalThis.RegExp("^sg-[0-9a-zA-Z]*$", "u"),
            ).annotate({
              expected: "a string matching the RegExp ^sg-[0-9a-zA-Z]*$",
            }),
          ),
      )
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(5).annotate({
            expected: "a value with a length of at most 5",
          }),
        ),
    ),
    Ipv6AllowedForDualStack: optionalRestJsonMember(Schema.Boolean),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "VpcConfig" });

export type VpcConfig = typeof VpcConfig.Type;

export const PackageType = Schema.Union([
  Schema.Literals(["Zip", "Image"]),
  Schema.String,
]).annotate({ identifier: "PackageType" });

export type PackageType = typeof PackageType.Type;

export const DeadLetterConfig = Schema.StructWithRest(
  Schema.Struct({
    TargetArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
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
).annotate({ identifier: "DeadLetterConfig" });

export type DeadLetterConfig = typeof DeadLetterConfig.Type;

export const EnvironmentVariables = Schema.Record(
  Schema.String,
  Schema.String.annotate({ format: "password" }),
)
  .annotate({ format: "password" })
  .check(
    Schema.isPropertyNames(
      Schema.String.check(
        Schema.isPattern(
          new globalThis.RegExp("^[a-zA-Z]([a-zA-Z0-9_])+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[a-zA-Z]([a-zA-Z0-9_])+$",
          format: "password",
        }),
      ),
    ).annotate({
      expected: "an object with property names matching the schema",
      identifier: "EnvironmentVariables",
    }),
  );

export type EnvironmentVariables = typeof EnvironmentVariables.Type;

export const TracingMode = Schema.Union([
  Schema.Literals(["Active", "PassThrough"]),
  Schema.String,
]).annotate({ identifier: "TracingMode" });

export type TracingMode = typeof TracingMode.Type;

export const Tags = Schema.Record(
  Schema.String,
  Schema.String.check(
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
        new globalThis.RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$",
      }),
    ),
).check(
  Schema.isPropertyNames(
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
          new globalThis.RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$",
        }),
      ),
  ).annotate({
    expected: "an object with property names matching the schema",
    identifier: "Tags",
  }),
);

export type Tags = typeof Tags.Type;

export const DirectS3Read = Schema.Union([
  Schema.Literals(["ENABLED", "DISABLED", "AUTO"]),
  Schema.String,
]).annotate({ identifier: "DirectS3Read" });

export type DirectS3Read = typeof DirectS3Read.Type;

export const ImageConfig = Schema.StructWithRest(
  Schema.Struct({
    EntryPoint: optionalRestJsonMember(
      Schema.Array(Schema.String)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1500).annotate({
            expected: "a value with a length of at most 1500",
          }),
        ),
    ),
    Command: optionalRestJsonMember(
      Schema.Array(Schema.String)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1500).annotate({
            expected: "a value with a length of at most 1500",
          }),
        ),
    ),
    WorkingDirectory: optionalRestJsonMember(
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ImageConfig" });

export type ImageConfig = typeof ImageConfig.Type;

export const Architecture = Schema.Union([
  Schema.Literals(["x86_64", "arm64"]),
  Schema.String,
]).annotate({ identifier: "Architecture" });

export type Architecture = typeof Architecture.Type;

export const EphemeralStorage = Schema.StructWithRest(
  Schema.Struct({
    Size: Schema.Finite.check(
      Schema.isGreaterThanOrEqualTo(512).annotate({
        expected: "a value greater than or equal to 512",
      }),
    ).check(
      Schema.isLessThanOrEqualTo(32768).annotate({
        expected: "a value less than or equal to 32768",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "EphemeralStorage" });

export type EphemeralStorage = typeof EphemeralStorage.Type;

export const SnapStartApplyOn = Schema.Union([
  Schema.Literals(["PublishedVersions", "None"]),
  Schema.String,
]).annotate({ identifier: "SnapStartApplyOn" });

export type SnapStartApplyOn = typeof SnapStartApplyOn.Type;

export const LogFormat = Schema.Union([
  Schema.Literals(["JSON", "Text"]),
  Schema.String,
]).annotate({ identifier: "LogFormat" });

export type LogFormat = typeof LogFormat.Type;

export const ApplicationLogLevel = Schema.Union([
  Schema.Literals(["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"]),
  Schema.String,
]).annotate({ identifier: "ApplicationLogLevel" });

export type ApplicationLogLevel = typeof ApplicationLogLevel.Type;

export const SystemLogLevel = Schema.Union([
  Schema.Literals(["DEBUG", "INFO", "WARN"]),
  Schema.String,
]).annotate({ identifier: "SystemLogLevel" });

export type SystemLogLevel = typeof SystemLogLevel.Type;

export const TenantIsolationMode = Schema.Literal("PER_TENANT").annotate({
  identifier: "TenantIsolationMode",
});

export type TenantIsolationMode = typeof TenantIsolationMode.Type;

export const LambdaManagedInstancesCapacityProviderConfig =
  Schema.StructWithRest(
    Schema.Struct({
      CapacityProviderArn: Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(140).annotate({
            expected: "a string with at most 140 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:capacity-provider:[a-zA-Z0-9-_]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:capacity-provider:[a-zA-Z0-9-_]+$",
          }),
        ),
      PerExecutionEnvironmentMaxConcurrency: optionalRestJsonMember(
        Schema.Finite.check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        ).check(
          Schema.isLessThanOrEqualTo(1600).annotate({
            expected: "a value less than or equal to 1600",
          }),
        ),
      ),
      ExecutionEnvironmentMemoryGiBPerVCpu: optionalRestJsonMember(
        Schema.Number.annotate({ format: "double" })
          .check(Schema.isFinite().annotate({ expected: "a finite number" }))
          .check(
            Schema.isGreaterThanOrEqualTo(2).annotate({
              expected: "a value greater than or equal to 2",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(8).annotate({
              expected: "a value less than or equal to 8",
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
  ).annotate({ identifier: "LambdaManagedInstancesCapacityProviderConfig" });

export type LambdaManagedInstancesCapacityProviderConfig =
  typeof LambdaManagedInstancesCapacityProviderConfig.Type;

export const DurableConfig = Schema.StructWithRest(
  Schema.Struct({
    KMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
    ),
    RetentionPeriodInDays: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(90).annotate({
          expected: "a value less than or equal to 90",
        }),
      ),
    ),
    ExecutionTimeout: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(31622400).annotate({
          expected: "a value less than or equal to 31622400",
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
).annotate({ identifier: "DurableConfig" });

export type DurableConfig = typeof DurableConfig.Type;

export const VpcConfigResponse = Schema.StructWithRest(
  Schema.Struct({
    SubnetIds: optionalRestJsonMember(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(0).annotate({
            expected: "a string with at least 0 code points",
          }),
        )
          .check(
            Schema.isMaxCodePoints(1024).annotate({
              expected: "a string with at most 1024 code points",
            }),
          )
          .check(
            Schema.isPattern(
              new globalThis.RegExp("^subnet-[0-9a-z]*$", "u"),
            ).annotate({
              expected: "a string matching the RegExp ^subnet-[0-9a-z]*$",
            }),
          ),
      )
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(16).annotate({
            expected: "a value with a length of at most 16",
          }),
        ),
    ),
    SecurityGroupIds: optionalRestJsonMember(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(0).annotate({
            expected: "a string with at least 0 code points",
          }),
        )
          .check(
            Schema.isMaxCodePoints(1024).annotate({
              expected: "a string with at most 1024 code points",
            }),
          )
          .check(
            Schema.isPattern(
              new globalThis.RegExp("^sg-[0-9a-zA-Z]*$", "u"),
            ).annotate({
              expected: "a string matching the RegExp ^sg-[0-9a-zA-Z]*$",
            }),
          ),
      )
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(5).annotate({
            expected: "a value with a length of at most 5",
          }),
        ),
    ),
    VpcId: optionalRestJsonMember(Schema.String),
    Ipv6AllowedForDualStack: optionalRestJsonMember(Schema.Boolean),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "VpcConfigResponse" });

export type VpcConfigResponse = typeof VpcConfigResponse.Type;

export const EnvironmentError = Schema.StructWithRest(
  Schema.Struct({
    ErrorCode: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "EnvironmentError" });

export type EnvironmentError = typeof EnvironmentError.Type;

export const Layer = Schema.StructWithRest(
  Schema.Struct({
    Arn: optionalRestJsonMember(
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
              "^((arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:layer:[a-zA-Z0-9-_]+:[0-9]+)|(arn:[a-zA-Z0-9-]+:lambda:::awslayer:[a-zA-Z0-9-_]+))$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^((arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:layer:[a-zA-Z0-9-_]+:[0-9]+)|(arn:[a-zA-Z0-9-]+:lambda:::awslayer:[a-zA-Z0-9-_]+))$",
          }),
        ),
    ),
    CodeSize: optionalRestJsonMember(
      Schema.Number.annotate({ default: 0 }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    SigningProfileVersionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    SigningJobArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
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
).annotate({ identifier: "Layer" });

export type Layer = typeof Layer.Type;

export const State = Schema.Union([
  Schema.Literals([
    "Pending",
    "Active",
    "Inactive",
    "Failed",
    "Deactivating",
    "Deactivated",
    "ActiveNonInvocable",
    "Deleting",
  ]),
  Schema.String,
]).annotate({ identifier: "State" });

export type State = typeof State.Type;

export const StateReasonCode = Schema.Union([
  Schema.Literals([
    "Idle",
    "Creating",
    "Restoring",
    "EniLimitExceeded",
    "InsufficientRolePermissions",
    "InvalidConfiguration",
    "InternalError",
    "SubnetOutOfIPAddresses",
    "InvalidSubnet",
    "InvalidSecurityGroup",
    "ImageDeleted",
    "ImageAccessDenied",
    "InvalidImage",
    "KMSKeyAccessDenied",
    "KMSKeyNotFound",
    "InvalidStateKMSKey",
    "DisabledKMSKey",
    "EFSIOError",
    "EFSMountConnectivityError",
    "EFSMountFailure",
    "EFSMountTimeout",
    "InvalidRuntime",
    "InvalidZipFileException",
    "FunctionError",
    "ServiceQuotaExceededException",
    "VcpuLimitExceeded",
    "CapacityProviderScalingLimitExceeded",
    "InsufficientCapacity",
    "EC2RequestLimitExceeded",
    "FunctionError.InitTimeout",
    "FunctionError.RuntimeInitError",
    "FunctionError.ExtensionInitError",
    "FunctionError.InvalidEntryPoint",
    "FunctionError.InvalidWorkingDirectory",
    "FunctionError.PermissionDenied",
    "FunctionError.TooManyExtensions",
    "FunctionError.InitResourceExhausted",
    "DisallowedByVpcEncryptionControl",
    "DrainingDurableExecutions",
    "DependencyError",
  ]),
  Schema.String,
]).annotate({ identifier: "StateReasonCode" });

export type StateReasonCode = typeof StateReasonCode.Type;

export const LastUpdateStatus = Schema.Union([
  Schema.Literals(["Successful", "Failed", "InProgress"]),
  Schema.String,
]).annotate({ identifier: "LastUpdateStatus" });

export type LastUpdateStatus = typeof LastUpdateStatus.Type;

export const LastUpdateStatusReasonCode = Schema.Union([
  Schema.Literals([
    "EniLimitExceeded",
    "InsufficientRolePermissions",
    "InvalidConfiguration",
    "InternalError",
    "SubnetOutOfIPAddresses",
    "InvalidSubnet",
    "InvalidSecurityGroup",
    "ImageDeleted",
    "ImageAccessDenied",
    "InvalidImage",
    "KMSKeyAccessDenied",
    "KMSKeyNotFound",
    "InvalidStateKMSKey",
    "DisabledKMSKey",
    "EFSIOError",
    "EFSMountConnectivityError",
    "EFSMountFailure",
    "EFSMountTimeout",
    "InvalidRuntime",
    "InvalidZipFileException",
    "FunctionError",
    "ServiceQuotaExceededException",
    "VcpuLimitExceeded",
    "CapacityProviderScalingLimitExceeded",
    "InsufficientCapacity",
    "EC2RequestLimitExceeded",
    "FunctionError.InitTimeout",
    "FunctionError.RuntimeInitError",
    "FunctionError.ExtensionInitError",
    "FunctionError.InvalidEntryPoint",
    "FunctionError.InvalidWorkingDirectory",
    "FunctionError.PermissionDenied",
    "FunctionError.TooManyExtensions",
    "FunctionError.InitResourceExhausted",
    "DisallowedByVpcEncryptionControl",
    "DependencyError",
  ]),
  Schema.String,
]).annotate({ identifier: "LastUpdateStatusReasonCode" });

export type LastUpdateStatusReasonCode = typeof LastUpdateStatusReasonCode.Type;

export const ImageConfigError = Schema.StructWithRest(
  Schema.Struct({
    ErrorCode: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ImageConfigError" });

export type ImageConfigError = typeof ImageConfigError.Type;

export const SnapStartOptimizationStatus = Schema.Union([
  Schema.Literals(["On", "Off"]),
  Schema.String,
]).annotate({ identifier: "SnapStartOptimizationStatus" });

export type SnapStartOptimizationStatus =
  typeof SnapStartOptimizationStatus.Type;

export const RuntimeVersionError = Schema.StructWithRest(
  Schema.Struct({
    ErrorCode: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "RuntimeVersionError" });

export type RuntimeVersionError = typeof RuntimeVersionError.Type;

export const FunctionCode = Schema.StructWithRest(
  Schema.Struct({
    ZipFile: optionalRestJsonMember(
      Schema.String.annotate({ contentEncoding: "byte" }),
    ),
    S3Bucket: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(3).annotate({
          expected: "a string with at least 3 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(63).annotate({
            expected: "a string with at most 63 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[0-9A-Za-z\\.\\-_]*(?<!\\.)$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[0-9A-Za-z\\.\\-_]*(?<!\\.)$",
          }),
        ),
    ),
    S3Key: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    S3ObjectVersion: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    S3ObjectStorageMode: optionalRestJsonMember(S3ObjectStorageMode),
    ImageUri: optionalRestJsonMember(Schema.String),
    SourceKMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
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
).annotate({ identifier: "FunctionCode" });

export type FunctionCode = typeof FunctionCode.Type;

export const Environment = Schema.StructWithRest(
  Schema.Struct({ Variables: optionalRestJsonMember(EnvironmentVariables) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Environment" });

export type Environment = typeof Environment.Type;

export const TracingConfig = Schema.StructWithRest(
  Schema.Struct({ Mode: optionalRestJsonMember(TracingMode) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "TracingConfig" });

export type TracingConfig = typeof TracingConfig.Type;

export const TracingConfigResponse = Schema.StructWithRest(
  Schema.Struct({ Mode: optionalRestJsonMember(TracingMode) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "TracingConfigResponse" });

export type TracingConfigResponse = typeof TracingConfigResponse.Type;

export const S3FilesConfig = Schema.StructWithRest(
  Schema.Struct({ DirectS3Read: optionalRestJsonMember(DirectS3Read) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "S3FilesConfig" });

export type S3FilesConfig = typeof S3FilesConfig.Type;

export const SnapStart = Schema.StructWithRest(
  Schema.Struct({ ApplyOn: optionalRestJsonMember(SnapStartApplyOn) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "SnapStart" });

export type SnapStart = typeof SnapStart.Type;

export const LoggingConfig = Schema.StructWithRest(
  Schema.Struct({
    LogFormat: optionalRestJsonMember(LogFormat),
    ApplicationLogLevel: optionalRestJsonMember(ApplicationLogLevel),
    SystemLogLevel: optionalRestJsonMember(SystemLogLevel),
    LogGroup: optionalRestJsonMember(
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
            new globalThis.RegExp("^[\\.\\-_/#A-Za-z0-9]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[\\.\\-_/#A-Za-z0-9]+$",
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
).annotate({ identifier: "LoggingConfig" });

export type LoggingConfig = typeof LoggingConfig.Type;

export const TenancyConfig = Schema.StructWithRest(
  Schema.Struct({ TenantIsolationMode: TenantIsolationMode }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "TenancyConfig" });

export type TenancyConfig = typeof TenancyConfig.Type;

export const CapacityProviderConfig = Schema.StructWithRest(
  Schema.Struct({
    LambdaManagedInstancesCapacityProviderConfig:
      LambdaManagedInstancesCapacityProviderConfig,
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "CapacityProviderConfig" });

export type CapacityProviderConfig = typeof CapacityProviderConfig.Type;

export const EnvironmentResponse = Schema.StructWithRest(
  Schema.Struct({
    Variables: optionalRestJsonMember(EnvironmentVariables),
    Error: optionalRestJsonMember(EnvironmentError),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "EnvironmentResponse" });

export type EnvironmentResponse = typeof EnvironmentResponse.Type;

export const ImageConfigResponse = Schema.StructWithRest(
  Schema.Struct({
    ImageConfig: optionalRestJsonMember(ImageConfig),
    Error: optionalRestJsonMember(ImageConfigError),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ImageConfigResponse" });

export type ImageConfigResponse = typeof ImageConfigResponse.Type;

export const SnapStartResponse = Schema.StructWithRest(
  Schema.Struct({
    ApplyOn: optionalRestJsonMember(SnapStartApplyOn),
    OptimizationStatus: optionalRestJsonMember(SnapStartOptimizationStatus),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "SnapStartResponse" });

export type SnapStartResponse = typeof SnapStartResponse.Type;

export const RuntimeVersionConfig = Schema.StructWithRest(
  Schema.Struct({
    RuntimeVersionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(26).annotate({
          expected: "a string with at least 26 code points",
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
              "^((arn:(aws[a-zA-Z-]*):lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}::runtime:.+)|(arn:(aws[a-zA-Z-]*):lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:runtime\\/[A-Za-z0-9_.-]{1,128}\\/version\\/[A-Za-z0-9_.-]{1,128}))$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^((arn:(aws[a-zA-Z-]*):lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}::runtime:.+)|(arn:(aws[a-zA-Z-]*):lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:runtime\\/[A-Za-z0-9_.-]{1,128}\\/version\\/[A-Za-z0-9_.-]{1,128}))$",
          }),
        ),
    ),
    Error: optionalRestJsonMember(RuntimeVersionError),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "RuntimeVersionConfig" });

export type RuntimeVersionConfig = typeof RuntimeVersionConfig.Type;

export const FileSystemConfig = Schema.StructWithRest(
  Schema.Struct({
    Arn: Schema.String.check(
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
          new globalThis.RegExp(
            "^arn:aws[a-zA-Z-]*:elasticfilesystem:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:access-point\\/fsap-[a-f0-9]{17}$|^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system\\/fs-[0-9a-f]{17,40}\\/access-point\\/fsap-[0-9a-f]{17,40}$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^arn:aws[a-zA-Z-]*:elasticfilesystem:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:access-point\\/fsap-[a-f0-9]{17}$|^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system\\/fs-[0-9a-f]{17,40}\\/access-point\\/fsap-[0-9a-f]{17,40}$",
        }),
      ),
    LocalMountPath: Schema.String.check(
      Schema.isMinCodePoints(0).annotate({
        expected: "a string with at least 0 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(160).annotate({
          expected: "a string with at most 160 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^\\/mnt\\/[a-zA-Z0-9-_.]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/mnt\\/[a-zA-Z0-9-_.]+$",
        }),
      ),
    S3FilesConfig: optionalRestJsonMember(S3FilesConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "FileSystemConfig" });

export type FileSystemConfig = typeof FileSystemConfig.Type;

export const AddPermissionRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    StatementId: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(100).annotate({
          expected: "a string with at most 100 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^([a-zA-Z0-9-_]+)$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^([a-zA-Z0-9-_]+)$",
        }),
      ),
    Action: Schema.String.check(
      Schema.isMinCodePoints(0).annotate({
        expected: "a string with at least 0 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(10000).annotate({
          expected: "a string with at most 10000 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^(lambda:[*]|lambda:[a-zA-Z]+|[*])$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(lambda:[*]|lambda:[a-zA-Z]+|[*])$",
        }),
      ),
    Principal: Schema.String.check(
      Schema.isMinCodePoints(0).annotate({
        expected: "a string with at least 0 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[^\\s]+$",
        }),
      ),
    SourceArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    FunctionUrlAuthType: optionalRestJsonMember(FunctionUrlAuthType),
    InvokedViaFunctionUrl: optionalRestJsonMember(Schema.Boolean),
    SourceAccount: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(12).annotate({
            expected: "a string with at most 12 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^\\d{12}$", "u")).annotate({
            expected: "a string matching the RegExp ^\\d{12}$",
          }),
        ),
    ),
    EventSourceToken: optionalRestJsonMember(
      Schema.String.check(
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
            new globalThis.RegExp("^[a-zA-Z0-9._\\-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[a-zA-Z0-9._\\-]+$",
          }),
        ),
    ),
    Qualifier: optionalRestJsonMember(
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
            new globalThis.RegExp(
              "^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
          }),
        ),
    ),
    RevisionId: optionalRestJsonMember(Schema.String),
    PrincipalOrgID: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(12).annotate({
          expected: "a string with at least 12 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(34).annotate({
            expected: "a string with at most 34 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^o-[a-z0-9]{10,32}$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^o-[a-z0-9]{10,32}$",
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

export type AddPermissionRequest = typeof AddPermissionRequest.Type;

export const AddPermissionResponseContent = Schema.StructWithRest(
  Schema.Struct({ Statement: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AddPermissionResponseContent =
  typeof AddPermissionResponseContent.Type;

export const InvalidParameterValueException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidParameterValueException =
  typeof InvalidParameterValueException.Type;

export const PolicyLengthExceededException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PolicyLengthExceededException =
  typeof PolicyLengthExceededException.Type;

export const PreconditionFailedException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PreconditionFailedException =
  typeof PreconditionFailedException.Type;

export const PublicPolicyException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type PublicPolicyException = typeof PublicPolicyException.Type;

export const ResourceConflictException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ResourceConflictException = typeof ResourceConflictException.Type;

export const ResourceNotFoundException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ResourceNotFoundException = typeof ResourceNotFoundException.Type;

export const ServiceException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ServiceException = typeof ServiceException.Type;

export const TooManyRequestsException = Schema.StructWithRest(
  Schema.Struct({
    retryAfterSeconds: optionalRestJsonMember(Schema.String),
    Type: optionalRestJsonMember(Schema.String),
    message: optionalRestJsonMember(Schema.String),
    Reason: optionalRestJsonMember(ThrottleReason),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TooManyRequestsException = typeof TooManyRequestsException.Type;

export const CreateFunctionRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(140).annotate({
          expected: "a string with at most 140 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    Runtime: optionalRestJsonMember(Runtime),
    Role: Schema.String.check(
      Schema.isMinCodePoints(0).annotate({
        expected: "a string with at least 0 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(10000).annotate({
          expected: "a string with at most 10000 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
        }),
      ),
    Handler: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[^\\s]+$",
          }),
        ),
    ),
    Code: FunctionCode,
    Description: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    Timeout: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(5400).annotate({
          expected: "a value less than or equal to 5400",
        }),
      ),
    ),
    MemorySize: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(128).annotate({
          expected: "a value greater than or equal to 128",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(32768).annotate({
          expected: "a value less than or equal to 32768",
        }),
      ),
    ),
    Publish: optionalRestJsonMember(
      Schema.Boolean.annotate({ default: false }),
    ),
    PublishTo: optionalRestJsonMember(FunctionVersionLatestPublished),
    VpcConfig: optionalRestJsonMember(VpcConfig),
    PackageType: optionalRestJsonMember(PackageType),
    DeadLetterConfig: optionalRestJsonMember(DeadLetterConfig),
    Environment: optionalRestJsonMember(Environment),
    KMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
    ),
    TracingConfig: optionalRestJsonMember(TracingConfig),
    Tags: optionalRestJsonMember(Tags),
    Layers: optionalRestJsonMember(
      Schema.Array(
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
                "^((arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:layer:[a-zA-Z0-9-_]+:[0-9]+)|(arn:[a-zA-Z0-9-]+:lambda:::awslayer:[a-zA-Z0-9-_]+))$",
                "u",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^((arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:layer:[a-zA-Z0-9-_]+:[0-9]+)|(arn:[a-zA-Z0-9-]+:lambda:::awslayer:[a-zA-Z0-9-_]+))$",
            }),
          ),
      ),
    ),
    FileSystemConfigs: optionalRestJsonMember(
      Schema.Array(FileSystemConfig)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    CodeSigningConfigArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}$",
          }),
        ),
    ),
    ImageConfig: optionalRestJsonMember(ImageConfig),
    Architectures: optionalRestJsonMember(
      Schema.Array(Architecture)
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    EphemeralStorage: optionalRestJsonMember(EphemeralStorage),
    SnapStart: optionalRestJsonMember(SnapStart),
    LoggingConfig: optionalRestJsonMember(LoggingConfig),
    TenancyConfig: optionalRestJsonMember(TenancyConfig),
    CapacityProviderConfig: optionalRestJsonMember(CapacityProviderConfig),
    DurableConfig: optionalRestJsonMember(DurableConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateFunctionRequest = typeof CreateFunctionRequest.Type;

export const CreateFunctionResponseContent = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    FunctionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    Runtime: optionalRestJsonMember(Runtime),
    Role: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
          }),
        ),
    ),
    Handler: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[^\\s]+$",
          }),
        ),
    ),
    CodeSize: optionalRestJsonMember(
      Schema.Number.annotate({ default: 0 }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    Description: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    Timeout: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(5400).annotate({
          expected: "a value less than or equal to 5400",
        }),
      ),
    ),
    MemorySize: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(128).annotate({
          expected: "a value greater than or equal to 128",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(32768).annotate({
          expected: "a value less than or equal to 32768",
        }),
      ),
    ),
    LastModified: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    CodeSha256: optionalRestJsonMember(Schema.String),
    Version: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^(\\$LATEST|[0-9]+)$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^(\\$LATEST|[0-9]+)$",
          }),
        ),
    ),
    VpcConfig: optionalRestJsonMember(VpcConfigResponse),
    DeadLetterConfig: optionalRestJsonMember(DeadLetterConfig),
    Environment: optionalRestJsonMember(EnvironmentResponse),
    KMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
    ),
    TracingConfig: optionalRestJsonMember(TracingConfigResponse),
    MasterArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    RevisionId: optionalRestJsonMember(Schema.String),
    Layers: optionalRestJsonMember(Schema.Array(Layer)),
    State: optionalRestJsonMember(State),
    StateReason: optionalRestJsonMember(Schema.String),
    StateReasonCode: optionalRestJsonMember(StateReasonCode),
    LastUpdateStatus: optionalRestJsonMember(LastUpdateStatus),
    LastUpdateStatusReason: optionalRestJsonMember(Schema.String),
    LastUpdateStatusReasonCode: optionalRestJsonMember(
      LastUpdateStatusReasonCode,
    ),
    FileSystemConfigs: optionalRestJsonMember(
      Schema.Array(FileSystemConfig)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    SigningProfileVersionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    SigningJobArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    PackageType: optionalRestJsonMember(PackageType),
    ImageConfigResponse: optionalRestJsonMember(ImageConfigResponse),
    Architectures: optionalRestJsonMember(
      Schema.Array(Architecture)
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    EphemeralStorage: optionalRestJsonMember(EphemeralStorage),
    SnapStart: optionalRestJsonMember(SnapStartResponse),
    RuntimeVersionConfig: optionalRestJsonMember(RuntimeVersionConfig),
    LoggingConfig: optionalRestJsonMember(LoggingConfig),
    TenancyConfig: optionalRestJsonMember(TenancyConfig),
    CapacityProviderConfig: optionalRestJsonMember(CapacityProviderConfig),
    ConfigSha256: optionalRestJsonMember(Schema.String),
    DurableConfig: optionalRestJsonMember(DurableConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateFunctionResponseContent =
  typeof CreateFunctionResponseContent.Type;

export const CodeSigningConfigNotFoundException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CodeSigningConfigNotFoundException =
  typeof CodeSigningConfigNotFoundException.Type;

export const CodeStorageExceededException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CodeStorageExceededException =
  typeof CodeStorageExceededException.Type;

export const CodeVerificationFailedException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CodeVerificationFailedException =
  typeof CodeVerificationFailedException.Type;

export const FunctionVersionsPerCapacityProviderLimitExceededException =
  Schema.StructWithRest(
    Schema.Struct({
      Type: optionalRestJsonMember(Schema.String),
      message: optionalRestJsonMember(Schema.String),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  );

export type FunctionVersionsPerCapacityProviderLimitExceededException =
  typeof FunctionVersionsPerCapacityProviderLimitExceededException.Type;

export const InvalidCodeSignatureException = Schema.StructWithRest(
  Schema.Struct({
    Type: optionalRestJsonMember(Schema.String),
    Message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidCodeSignatureException =
  typeof InvalidCodeSignatureException.Type;

export const DeleteFunctionRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    Qualifier: optionalRestJsonMember(
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
            new globalThis.RegExp(
              "^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
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

export type DeleteFunctionRequest = typeof DeleteFunctionRequest.Type;

export const GetFunctionConfigurationRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    Qualifier: optionalRestJsonMember(
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
            new globalThis.RegExp(
              "^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
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

export type GetFunctionConfigurationRequest =
  typeof GetFunctionConfigurationRequest.Type;

export const GetFunctionConfigurationResponseContent = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    FunctionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    Runtime: optionalRestJsonMember(Runtime),
    Role: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
          }),
        ),
    ),
    Handler: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[^\\s]+$",
          }),
        ),
    ),
    CodeSize: optionalRestJsonMember(
      Schema.Number.annotate({ default: 0 }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    Description: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    Timeout: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(5400).annotate({
          expected: "a value less than or equal to 5400",
        }),
      ),
    ),
    MemorySize: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(128).annotate({
          expected: "a value greater than or equal to 128",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(32768).annotate({
          expected: "a value less than or equal to 32768",
        }),
      ),
    ),
    LastModified: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    CodeSha256: optionalRestJsonMember(Schema.String),
    Version: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^(\\$LATEST|[0-9]+)$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^(\\$LATEST|[0-9]+)$",
          }),
        ),
    ),
    VpcConfig: optionalRestJsonMember(VpcConfigResponse),
    DeadLetterConfig: optionalRestJsonMember(DeadLetterConfig),
    Environment: optionalRestJsonMember(EnvironmentResponse),
    KMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
    ),
    TracingConfig: optionalRestJsonMember(TracingConfigResponse),
    MasterArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    RevisionId: optionalRestJsonMember(Schema.String),
    Layers: optionalRestJsonMember(Schema.Array(Layer)),
    State: optionalRestJsonMember(State),
    StateReason: optionalRestJsonMember(Schema.String),
    StateReasonCode: optionalRestJsonMember(StateReasonCode),
    LastUpdateStatus: optionalRestJsonMember(LastUpdateStatus),
    LastUpdateStatusReason: optionalRestJsonMember(Schema.String),
    LastUpdateStatusReasonCode: optionalRestJsonMember(
      LastUpdateStatusReasonCode,
    ),
    FileSystemConfigs: optionalRestJsonMember(
      Schema.Array(FileSystemConfig)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    SigningProfileVersionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    SigningJobArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    PackageType: optionalRestJsonMember(PackageType),
    ImageConfigResponse: optionalRestJsonMember(ImageConfigResponse),
    Architectures: optionalRestJsonMember(
      Schema.Array(Architecture)
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    EphemeralStorage: optionalRestJsonMember(EphemeralStorage),
    SnapStart: optionalRestJsonMember(SnapStartResponse),
    RuntimeVersionConfig: optionalRestJsonMember(RuntimeVersionConfig),
    LoggingConfig: optionalRestJsonMember(LoggingConfig),
    TenancyConfig: optionalRestJsonMember(TenancyConfig),
    CapacityProviderConfig: optionalRestJsonMember(CapacityProviderConfig),
    ConfigSha256: optionalRestJsonMember(Schema.String),
    DurableConfig: optionalRestJsonMember(DurableConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetFunctionConfigurationResponseContent =
  typeof GetFunctionConfigurationResponseContent.Type;

export const GetPolicyRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    Qualifier: optionalRestJsonMember(
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
            new globalThis.RegExp(
              "^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
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

export type GetPolicyRequest = typeof GetPolicyRequest.Type;

export const GetPolicyResponseContent = Schema.StructWithRest(
  Schema.Struct({
    Policy: optionalRestJsonMember(Schema.String),
    RevisionId: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetPolicyResponseContent = typeof GetPolicyResponseContent.Type;

export const RemovePermissionRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    StatementId: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(100).annotate({
          expected: "a string with at most 100 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^([a-zA-Z0-9-_.]+)$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^([a-zA-Z0-9-_.]+)$",
        }),
      ),
    Qualifier: optionalRestJsonMember(
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
            new globalThis.RegExp(
              "^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^\\$(LATEST(\\.PUBLISHED)?)|[a-zA-Z0-9-_$]+$",
          }),
        ),
    ),
    RevisionId: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type RemovePermissionRequest = typeof RemovePermissionRequest.Type;

export const UpdateFunctionCodeRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(140).annotate({
          expected: "a string with at most 140 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    ZipFile: optionalRestJsonMember(
      Schema.String.annotate({ contentEncoding: "byte" }),
    ),
    S3Bucket: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(3).annotate({
          expected: "a string with at least 3 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(63).annotate({
            expected: "a string with at most 63 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[0-9A-Za-z\\.\\-_]*(?<!\\.)$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[0-9A-Za-z\\.\\-_]*(?<!\\.)$",
          }),
        ),
    ),
    S3Key: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    S3ObjectVersion: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    S3ObjectStorageMode: optionalRestJsonMember(S3ObjectStorageMode),
    ImageUri: optionalRestJsonMember(Schema.String),
    Architectures: optionalRestJsonMember(
      Schema.Array(Architecture)
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    Publish: optionalRestJsonMember(
      Schema.Boolean.annotate({ default: false }),
    ),
    PublishTo: optionalRestJsonMember(FunctionVersionLatestPublished),
    DryRun: optionalRestJsonMember(Schema.Boolean.annotate({ default: false })),
    RevisionId: optionalRestJsonMember(Schema.String),
    SourceKMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
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

export type UpdateFunctionCodeRequest = typeof UpdateFunctionCodeRequest.Type;

export const UpdateFunctionCodeResponseContent = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    FunctionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    Runtime: optionalRestJsonMember(Runtime),
    Role: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
          }),
        ),
    ),
    Handler: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[^\\s]+$",
          }),
        ),
    ),
    CodeSize: optionalRestJsonMember(
      Schema.Number.annotate({ default: 0 }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    Description: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    Timeout: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(5400).annotate({
          expected: "a value less than or equal to 5400",
        }),
      ),
    ),
    MemorySize: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(128).annotate({
          expected: "a value greater than or equal to 128",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(32768).annotate({
          expected: "a value less than or equal to 32768",
        }),
      ),
    ),
    LastModified: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    CodeSha256: optionalRestJsonMember(Schema.String),
    Version: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^(\\$LATEST|[0-9]+)$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^(\\$LATEST|[0-9]+)$",
          }),
        ),
    ),
    VpcConfig: optionalRestJsonMember(VpcConfigResponse),
    DeadLetterConfig: optionalRestJsonMember(DeadLetterConfig),
    Environment: optionalRestJsonMember(EnvironmentResponse),
    KMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
    ),
    TracingConfig: optionalRestJsonMember(TracingConfigResponse),
    MasterArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    RevisionId: optionalRestJsonMember(Schema.String),
    Layers: optionalRestJsonMember(Schema.Array(Layer)),
    State: optionalRestJsonMember(State),
    StateReason: optionalRestJsonMember(Schema.String),
    StateReasonCode: optionalRestJsonMember(StateReasonCode),
    LastUpdateStatus: optionalRestJsonMember(LastUpdateStatus),
    LastUpdateStatusReason: optionalRestJsonMember(Schema.String),
    LastUpdateStatusReasonCode: optionalRestJsonMember(
      LastUpdateStatusReasonCode,
    ),
    FileSystemConfigs: optionalRestJsonMember(
      Schema.Array(FileSystemConfig)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    SigningProfileVersionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    SigningJobArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    PackageType: optionalRestJsonMember(PackageType),
    ImageConfigResponse: optionalRestJsonMember(ImageConfigResponse),
    Architectures: optionalRestJsonMember(
      Schema.Array(Architecture)
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    EphemeralStorage: optionalRestJsonMember(EphemeralStorage),
    SnapStart: optionalRestJsonMember(SnapStartResponse),
    RuntimeVersionConfig: optionalRestJsonMember(RuntimeVersionConfig),
    LoggingConfig: optionalRestJsonMember(LoggingConfig),
    TenancyConfig: optionalRestJsonMember(TenancyConfig),
    CapacityProviderConfig: optionalRestJsonMember(CapacityProviderConfig),
    ConfigSha256: optionalRestJsonMember(Schema.String),
    DurableConfig: optionalRestJsonMember(DurableConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateFunctionCodeResponseContent =
  typeof UpdateFunctionCodeResponseContent.Type;

export const UpdateFunctionConfigurationRequest = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(140).annotate({
          expected: "a string with at most 140 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
        }),
      ),
    Role: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
          }),
        ),
    ),
    Handler: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[^\\s]+$",
          }),
        ),
    ),
    Description: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    Timeout: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(5400).annotate({
          expected: "a value less than or equal to 5400",
        }),
      ),
    ),
    MemorySize: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(128).annotate({
          expected: "a value greater than or equal to 128",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(32768).annotate({
          expected: "a value less than or equal to 32768",
        }),
      ),
    ),
    VpcConfig: optionalRestJsonMember(VpcConfig),
    Environment: optionalRestJsonMember(Environment),
    Runtime: optionalRestJsonMember(Runtime),
    DeadLetterConfig: optionalRestJsonMember(DeadLetterConfig),
    KMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
    ),
    TracingConfig: optionalRestJsonMember(TracingConfig),
    RevisionId: optionalRestJsonMember(Schema.String),
    Layers: optionalRestJsonMember(
      Schema.Array(
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
                "^((arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:layer:[a-zA-Z0-9-_]+:[0-9]+)|(arn:[a-zA-Z0-9-]+:lambda:::awslayer:[a-zA-Z0-9-_]+))$",
                "u",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^((arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:layer:[a-zA-Z0-9-_]+:[0-9]+)|(arn:[a-zA-Z0-9-]+:lambda:::awslayer:[a-zA-Z0-9-_]+))$",
            }),
          ),
      ),
    ),
    FileSystemConfigs: optionalRestJsonMember(
      Schema.Array(FileSystemConfig)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    ImageConfig: optionalRestJsonMember(ImageConfig),
    EphemeralStorage: optionalRestJsonMember(EphemeralStorage),
    SnapStart: optionalRestJsonMember(SnapStart),
    LoggingConfig: optionalRestJsonMember(LoggingConfig),
    CapacityProviderConfig: optionalRestJsonMember(CapacityProviderConfig),
    DurableConfig: optionalRestJsonMember(DurableConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateFunctionConfigurationRequest =
  typeof UpdateFunctionConfigurationRequest.Type;

export const UpdateFunctionConfigurationResponseContent = Schema.StructWithRest(
  Schema.Struct({
    FunctionName: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_\\.]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    FunctionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    Runtime: optionalRestJsonMember(Runtime),
    Role: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
          }),
        ),
    ),
    Handler: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[^\\s]+$",
          }),
        ),
    ),
    CodeSize: optionalRestJsonMember(
      Schema.Number.annotate({ default: 0 }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    Description: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    Timeout: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(5400).annotate({
          expected: "a value less than or equal to 5400",
        }),
      ),
    ),
    MemorySize: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(128).annotate({
          expected: "a value greater than or equal to 128",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(32768).annotate({
          expected: "a value less than or equal to 32768",
        }),
      ),
    ),
    LastModified: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ),
    CodeSha256: optionalRestJsonMember(Schema.String),
    Version: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^(\\$LATEST|[0-9]+)$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^(\\$LATEST|[0-9]+)$",
          }),
        ),
    ),
    VpcConfig: optionalRestJsonMember(VpcConfigResponse),
    DeadLetterConfig: optionalRestJsonMember(DeadLetterConfig),
    Environment: optionalRestJsonMember(EnvironmentResponse),
    KMSKeyArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
    ),
    TracingConfig: optionalRestJsonMember(TracingConfigResponse),
    MasterArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ),
    RevisionId: optionalRestJsonMember(Schema.String),
    Layers: optionalRestJsonMember(Schema.Array(Layer)),
    State: optionalRestJsonMember(State),
    StateReason: optionalRestJsonMember(Schema.String),
    StateReasonCode: optionalRestJsonMember(StateReasonCode),
    LastUpdateStatus: optionalRestJsonMember(LastUpdateStatus),
    LastUpdateStatusReason: optionalRestJsonMember(Schema.String),
    LastUpdateStatusReasonCode: optionalRestJsonMember(
      LastUpdateStatusReasonCode,
    ),
    FileSystemConfigs: optionalRestJsonMember(
      Schema.Array(FileSystemConfig)
        .check(
          Schema.isMinLength(0).annotate({
            expected: "a value with a length of at least 0",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    SigningProfileVersionArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    SigningJobArn: optionalRestJsonMember(
      Schema.String.check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(10000).annotate({
            expected: "a string with at most 10000 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
          }),
        ),
    ),
    PackageType: optionalRestJsonMember(PackageType),
    ImageConfigResponse: optionalRestJsonMember(ImageConfigResponse),
    Architectures: optionalRestJsonMember(
      Schema.Array(Architecture)
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    EphemeralStorage: optionalRestJsonMember(EphemeralStorage),
    SnapStart: optionalRestJsonMember(SnapStartResponse),
    RuntimeVersionConfig: optionalRestJsonMember(RuntimeVersionConfig),
    LoggingConfig: optionalRestJsonMember(LoggingConfig),
    TenancyConfig: optionalRestJsonMember(TenancyConfig),
    CapacityProviderConfig: optionalRestJsonMember(CapacityProviderConfig),
    ConfigSha256: optionalRestJsonMember(Schema.String),
    DurableConfig: optionalRestJsonMember(DurableConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateFunctionConfigurationResponseContent =
  typeof UpdateFunctionConfigurationResponseContent.Type;

export const lambdaErrors = {
  InvalidParameterValueException: {
    name: "InvalidParameterValueException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidParameterValueException,
  },
  PolicyLengthExceededException: {
    name: "PolicyLengthExceededException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: PolicyLengthExceededException,
  },
  PreconditionFailedException: {
    name: "PreconditionFailedException",
    fault: "client",
    httpStatus: 412,
    retryable: null,
    schema: PreconditionFailedException,
  },
  PublicPolicyException: {
    name: "PublicPolicyException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: PublicPolicyException,
  },
  ResourceConflictException: {
    name: "ResourceConflictException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    schema: ResourceConflictException,
  },
  ResourceNotFoundException: {
    name: "ResourceNotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    schema: ResourceNotFoundException,
  },
  ServiceException: {
    name: "ServiceException",
    fault: "server",
    httpStatus: 500,
    retryable: null,
    schema: ServiceException,
  },
  TooManyRequestsException: {
    name: "TooManyRequestsException",
    fault: "client",
    httpStatus: 429,
    retryable: null,
    schema: TooManyRequestsException,
  },
  CodeSigningConfigNotFoundException: {
    name: "CodeSigningConfigNotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    schema: CodeSigningConfigNotFoundException,
  },
  CodeStorageExceededException: {
    name: "CodeStorageExceededException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: CodeStorageExceededException,
  },
  CodeVerificationFailedException: {
    name: "CodeVerificationFailedException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: CodeVerificationFailedException,
  },
  FunctionVersionsPerCapacityProviderLimitExceededException: {
    name: "FunctionVersionsPerCapacityProviderLimitExceededException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: FunctionVersionsPerCapacityProviderLimitExceededException,
  },
  InvalidCodeSignatureException: {
    name: "InvalidCodeSignatureException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidCodeSignatureException,
  },
};

export const addPermissionErrors = [
  lambdaErrors.InvalidParameterValueException,
  lambdaErrors.PolicyLengthExceededException,
  lambdaErrors.PreconditionFailedException,
  lambdaErrors.PublicPolicyException,
  lambdaErrors.ResourceConflictException,
  lambdaErrors.ResourceNotFoundException,
  lambdaErrors.ServiceException,
  lambdaErrors.TooManyRequestsException,
];

export const createFunctionErrors = [
  lambdaErrors.CodeSigningConfigNotFoundException,
  lambdaErrors.CodeStorageExceededException,
  lambdaErrors.CodeVerificationFailedException,
  lambdaErrors.FunctionVersionsPerCapacityProviderLimitExceededException,
  lambdaErrors.InvalidCodeSignatureException,
  lambdaErrors.InvalidParameterValueException,
  lambdaErrors.ResourceConflictException,
  lambdaErrors.ResourceNotFoundException,
  lambdaErrors.ServiceException,
  lambdaErrors.TooManyRequestsException,
];

export const deleteFunctionErrors = [
  lambdaErrors.InvalidParameterValueException,
  lambdaErrors.ResourceConflictException,
  lambdaErrors.ResourceNotFoundException,
  lambdaErrors.ServiceException,
  lambdaErrors.TooManyRequestsException,
];

export const getFunctionConfigurationErrors = [
  lambdaErrors.InvalidParameterValueException,
  lambdaErrors.ResourceNotFoundException,
  lambdaErrors.ServiceException,
  lambdaErrors.TooManyRequestsException,
];

export const removePermissionErrors = [
  lambdaErrors.InvalidParameterValueException,
  lambdaErrors.PreconditionFailedException,
  lambdaErrors.PublicPolicyException,
  lambdaErrors.ResourceNotFoundException,
  lambdaErrors.ServiceException,
  lambdaErrors.TooManyRequestsException,
];

export const updateFunctionCodeErrors = [
  lambdaErrors.CodeSigningConfigNotFoundException,
  lambdaErrors.CodeStorageExceededException,
  lambdaErrors.CodeVerificationFailedException,
  lambdaErrors.InvalidCodeSignatureException,
  lambdaErrors.InvalidParameterValueException,
  lambdaErrors.PreconditionFailedException,
  lambdaErrors.ResourceConflictException,
  lambdaErrors.ResourceNotFoundException,
  lambdaErrors.ServiceException,
  lambdaErrors.TooManyRequestsException,
];

export const updateFunctionConfigurationErrors = [
  lambdaErrors.CodeSigningConfigNotFoundException,
  lambdaErrors.CodeVerificationFailedException,
  lambdaErrors.InvalidCodeSignatureException,
  lambdaErrors.InvalidParameterValueException,
  lambdaErrors.PreconditionFailedException,
  lambdaErrors.ResourceConflictException,
  lambdaErrors.ResourceNotFoundException,
  lambdaErrors.ServiceException,
  lambdaErrors.TooManyRequestsException,
];

export const addPermissionOperation: AwsRestJsonOperation & {
  readonly input: typeof AddPermissionRequest;
  readonly output: typeof AddPermissionResponseContent;
} = {
  name: "AddPermission",
  method: "POST",
  path: "/2015-03-31/functions/{FunctionName}/policy",
  headers: {},
  rest: {
    bindings: {
      FunctionName: {
        location: "LABEL",
        name: "FunctionName",
      },
      Qualifier: {
        location: "QUERY",
        name: "Qualifier",
      },
    },
    status: 201,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: AddPermissionRequest,
  output: AddPermissionResponseContent,
  errors: addPermissionErrors,
};

export const addPermissionEndpoint = awsHttpEndpoint(
  "AddPermission",
  addPermissionOperation,
);

export const createFunctionOperation: AwsRestJsonOperation & {
  readonly input: typeof CreateFunctionRequest;
  readonly output: typeof CreateFunctionResponseContent;
} = {
  name: "CreateFunction",
  method: "POST",
  path: "/2015-03-31/functions",
  headers: {},
  rest: {
    bindings: {},
    status: 201,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateFunctionRequest,
  output: CreateFunctionResponseContent,
  errors: createFunctionErrors,
};

export const createFunctionEndpoint = awsHttpEndpoint(
  "CreateFunction",
  createFunctionOperation,
);

export const DeleteFunctionOutput = HttpApiSchema.Empty(204);

export const deleteFunctionOperation: AwsRestJsonOperation & {
  readonly input: typeof DeleteFunctionRequest;
  readonly output: typeof DeleteFunctionOutput;
} = {
  name: "DeleteFunction",
  method: "DELETE",
  path: "/2015-03-31/functions/{FunctionName}",
  headers: {},
  rest: {
    bindings: {
      FunctionName: {
        location: "LABEL",
        name: "FunctionName",
      },
      Qualifier: {
        location: "QUERY",
        name: "Qualifier",
      },
    },
    status: 204,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteFunctionRequest,
  output: DeleteFunctionOutput,
  errors: deleteFunctionErrors,
};

export const deleteFunctionEndpoint = awsHttpEndpoint(
  "DeleteFunction",
  deleteFunctionOperation,
);

export const getFunctionConfigurationOperation: AwsRestJsonOperation & {
  readonly input: typeof GetFunctionConfigurationRequest;
  readonly output: typeof GetFunctionConfigurationResponseContent;
} = {
  name: "GetFunctionConfiguration",
  method: "GET",
  path: "/2015-03-31/functions/{FunctionName}/configuration",
  headers: {},
  rest: {
    bindings: {
      FunctionName: {
        location: "LABEL",
        name: "FunctionName",
      },
      Qualifier: {
        location: "QUERY",
        name: "Qualifier",
      },
    },
    status: 200,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetFunctionConfigurationRequest,
  output: GetFunctionConfigurationResponseContent,
  errors: getFunctionConfigurationErrors,
};

export const getFunctionConfigurationEndpoint = awsHttpEndpoint(
  "GetFunctionConfiguration",
  getFunctionConfigurationOperation,
);

export const getPolicyOperation: AwsRestJsonOperation & {
  readonly input: typeof GetPolicyRequest;
  readonly output: typeof GetPolicyResponseContent;
} = {
  name: "GetPolicy",
  method: "GET",
  path: "/2015-03-31/functions/{FunctionName}/policy",
  headers: {},
  rest: {
    bindings: {
      FunctionName: {
        location: "LABEL",
        name: "FunctionName",
      },
      Qualifier: {
        location: "QUERY",
        name: "Qualifier",
      },
    },
    status: 200,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetPolicyRequest,
  output: GetPolicyResponseContent,
  errors: getFunctionConfigurationErrors,
};

export const getPolicyEndpoint = awsHttpEndpoint(
  "GetPolicy",
  getPolicyOperation,
);

export const RemovePermissionOutput = HttpApiSchema.Empty(204);

export const removePermissionOperation: AwsRestJsonOperation & {
  readonly input: typeof RemovePermissionRequest;
  readonly output: typeof RemovePermissionOutput;
} = {
  name: "RemovePermission",
  method: "DELETE",
  path: "/2015-03-31/functions/{FunctionName}/policy/{StatementId}",
  headers: {},
  rest: {
    bindings: {
      FunctionName: {
        location: "LABEL",
        name: "FunctionName",
      },
      StatementId: {
        location: "LABEL",
        name: "StatementId",
      },
      Qualifier: {
        location: "QUERY",
        name: "Qualifier",
      },
      RevisionId: {
        location: "QUERY",
        name: "RevisionId",
      },
    },
    status: 204,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: RemovePermissionRequest,
  output: RemovePermissionOutput,
  errors: removePermissionErrors,
};

export const removePermissionEndpoint = awsHttpEndpoint(
  "RemovePermission",
  removePermissionOperation,
);

export const updateFunctionCodeOperation: AwsRestJsonOperation & {
  readonly input: typeof UpdateFunctionCodeRequest;
  readonly output: typeof UpdateFunctionCodeResponseContent;
} = {
  name: "UpdateFunctionCode",
  method: "PUT",
  path: "/2015-03-31/functions/{FunctionName}/code",
  headers: {},
  rest: {
    bindings: {
      FunctionName: {
        location: "LABEL",
        name: "FunctionName",
      },
    },
    status: 200,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateFunctionCodeRequest,
  output: UpdateFunctionCodeResponseContent,
  errors: updateFunctionCodeErrors,
};

export const updateFunctionCodeEndpoint = awsHttpEndpoint(
  "UpdateFunctionCode",
  updateFunctionCodeOperation,
);

export const updateFunctionConfigurationOperation: AwsRestJsonOperation & {
  readonly input: typeof UpdateFunctionConfigurationRequest;
  readonly output: typeof UpdateFunctionConfigurationResponseContent;
} = {
  name: "UpdateFunctionConfiguration",
  method: "PUT",
  path: "/2015-03-31/functions/{FunctionName}/configuration",
  headers: {},
  rest: {
    bindings: {
      FunctionName: {
        location: "LABEL",
        name: "FunctionName",
      },
    },
    status: 200,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateFunctionConfigurationRequest,
  output: UpdateFunctionConfigurationResponseContent,
  errors: updateFunctionConfigurationErrors,
};

export const updateFunctionConfigurationEndpoint = awsHttpEndpoint(
  "UpdateFunctionConfiguration",
  updateFunctionConfigurationOperation,
);

export const lambdaOperations = {
  AddPermission: addPermissionOperation,
  CreateFunction: createFunctionOperation,
  DeleteFunction: deleteFunctionOperation,
  GetFunctionConfiguration: getFunctionConfigurationOperation,
  GetPolicy: getPolicyOperation,
  RemovePermission: removePermissionOperation,
  UpdateFunctionCode: updateFunctionCodeOperation,
  UpdateFunctionConfiguration: updateFunctionConfigurationOperation,
};

export const lambdaApi = HttpApi.make("Lambda").add(
  HttpApiGroup.make("lambda").add(
    addPermissionEndpoint,
    createFunctionEndpoint,
    deleteFunctionEndpoint,
    getFunctionConfigurationEndpoint,
    getPolicyEndpoint,
    removePermissionEndpoint,
    updateFunctionCodeEndpoint,
    updateFunctionConfigurationEndpoint,
  ),
);

export const lambdaService: AwsServiceDefinition = {
  service: "com.amazonaws.lambda#AWSGirApiService",
  version: "2015-03-31",
  protocol: "restJson1",
  signingName: "lambda",
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
                          url: "https://lambda-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                        conditions: [],
                        endpoint: {
                          url: "https://lambda-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                          url: "https://lambda.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                conditions: [],
                endpoint: {
                  url: "https://lambda.{Region}.{PartitionResult#dnsSuffix}",
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
};

/** The makeLambdaClient Effect gives callers access to Lambda with the region and credentials configured in their AWS runtime. */
export const makeLambdaClient = Effect.gen(function* () {
  const aws = yield* AwsClient;

  const bindOperation = aws.bindOperation(lambdaService);

  return {
    /** Grants a principal permission to use a function. You can apply the policy at the function level, or specify a qualifier to restrict access to a single version or alias. If you use a qualifier, the invoker must use the full Amazon Resource Name (ARN) of that version or alias to invoke the function. Note: Lambda does not support adding policies to version $LATEST. */
    addPermission: bindOperation(addPermissionOperation),
    /** Creates a Lambda Event Function. To create a function, you need a deployment package and an execution role. The deployment package is a .zip file archive or container image that contains your function code. The execution role grants the function permission to use Amazon Web Services services, such as Amazon CloudWatch Logs for log streaming and X-Ray for request tracing. */
    createFunction: bindOperation(createFunctionOperation),
    /** Deletes a Lambda Event Function. To delete a specific function version, use the Qualifier parameter. Otherwise, all versions and aliases are deleted. This doesn't require the user to have explicit permissions for DeleteAlias. Success means AWS accepted the request. */
    deleteFunction: bindOperation(deleteFunctionOperation),
    /** Returns the version-specific settings of a Lambda Event Function or version. The output includes only options that can vary between versions of a function. To modify these settings, use UpdateFunctionConfiguration. */
    getFunctionConfiguration: bindOperation(getFunctionConfigurationOperation),
    /** Returns the resource-based IAM policy for a function, version, or alias. */
    getPolicy: bindOperation(getPolicyOperation),
    /** Revokes function-use permission from an Amazon Web Services service or another Amazon Web Services account. You can get the ID of the statement from the output of GetPolicy. Success means AWS accepted the request. */
    removePermission: bindOperation(removePermissionOperation),
    /** Updates a Lambda Event Function's code. If code signing is enabled for the function, the code package must be signed by a trusted publisher. For more information, see Configuring code signing for Lambda. */
    updateFunctionCode: bindOperation(updateFunctionCodeOperation),
    /** Modifies the version-specific settings of a Lambda Event Function. */
    updateFunctionConfiguration: bindOperation(
      updateFunctionConfigurationOperation,
    ),
  };
});
