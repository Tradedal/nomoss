// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";
import { AwsClient } from "../awsClient.js";
import type {
  AwsJsonRpcOperation,
  AwsServiceDefinition,
} from "../awsClientModel.js";
import { awsJsonRpcEmptyOutput } from "../awsHttpOperation.js";

export const StateMachineType = Schema.Literals([
  "STANDARD",
  "EXPRESS",
]).annotate({ identifier: "StateMachineType" });

export type StateMachineType = typeof StateMachineType.Type;

export const LogLevel = Schema.Literals([
  "ALL",
  "ERROR",
  "FATAL",
  "OFF",
]).annotate({ identifier: "LogLevel" });

export type LogLevel = typeof LogLevel.Type;

export const CloudWatchLogsLogGroup = Schema.StructWithRest(
  Schema.Struct({
    logGroupArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
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
).annotate({ identifier: "CloudWatchLogsLogGroup" });

export type CloudWatchLogsLogGroup = typeof CloudWatchLogsLogGroup.Type;

export const Tag = Schema.StructWithRest(
  Schema.Struct({
    key: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      ),
    ),
    value: Schema.optionalKey(
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Tag" });

export type Tag = typeof Tag.Type;

export const TracingConfiguration = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "TracingConfiguration" });

export type TracingConfiguration = typeof TracingConfiguration.Type;

export const EncryptionType = Schema.Literals([
  "AWS_OWNED_KEY",
  "CUSTOMER_MANAGED_KMS_KEY",
]).annotate({ identifier: "EncryptionType" });

export type EncryptionType = typeof EncryptionType.Type;

export const ValidationExceptionReason = Schema.Literals([
  "API_DOES_NOT_SUPPORT_LABELED_ARNS",
  "MISSING_REQUIRED_PARAMETER",
  "CANNOT_UPDATE_COMPLETED_MAP_RUN",
  "INVALID_ROUTING_CONFIGURATION",
]).annotate({ identifier: "ValidationExceptionReason" });

export type ValidationExceptionReason = typeof ValidationExceptionReason.Type;

export const IncludedData = Schema.Literals([
  "ALL_DATA",
  "METADATA_ONLY",
]).annotate({ identifier: "IncludedData" });

export type IncludedData = typeof IncludedData.Type;

export const StateMachineStatus = Schema.Literals([
  "ACTIVE",
  "DELETING",
]).annotate({ identifier: "StateMachineStatus" });

export type StateMachineStatus = typeof StateMachineStatus.Type;

export const VariableReferences = Schema.Record(
  Schema.String,
  Schema.Array(Schema.String.annotate({ format: "password" })),
)
  .annotate({ format: "password" })
  .check(
    Schema.isPropertyNames(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(80).annotate({
          expected: "a string with at most 80 code points",
        }),
      ),
    ).annotate({
      expected: "an object with property names matching the schema",
      identifier: "VariableReferences",
    }),
  );

export type VariableReferences = typeof VariableReferences.Type;

export const KmsKeyState = Schema.Literals([
  "DISABLED",
  "PENDING_DELETION",
  "PENDING_IMPORT",
  "UNAVAILABLE",
  "CREATING",
]).annotate({ identifier: "KmsKeyState" });

export type KmsKeyState = typeof KmsKeyState.Type;

export const LogDestination = Schema.StructWithRest(
  Schema.Struct({
    cloudWatchLogsLogGroup: Schema.optionalKey(CloudWatchLogsLogGroup),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "LogDestination" });

export type LogDestination = typeof LogDestination.Type;

export const EncryptionConfiguration = Schema.StructWithRest(
  Schema.Struct({
    kmsKeyId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
    ),
    kmsDataKeyReusePeriodSeconds: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(60).annotate({
            expected: "a value greater than or equal to 60",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(900).annotate({
            expected: "a value less than or equal to 900",
          }),
        ),
    ),
    type: EncryptionType,
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "EncryptionConfiguration" });

export type EncryptionConfiguration = typeof EncryptionConfiguration.Type;

export const LoggingConfiguration = Schema.StructWithRest(
  Schema.Struct({
    level: Schema.optionalKey(LogLevel),
    includeExecutionData: Schema.optionalKey(
      Schema.Boolean.annotate({ default: false }),
    ),
    destinations: Schema.optionalKey(Schema.Array(LogDestination)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "LoggingConfiguration" });

export type LoggingConfiguration = typeof LoggingConfiguration.Type;

export const CreateStateMachineInput = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
    definition: Schema.String.annotate({ format: "password" })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1048576).annotate({
          expected: "a string with at most 1048576 code points",
        }),
      ),
    roleArn: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
    type: Schema.optionalKey(StateMachineType),
    loggingConfiguration: Schema.optionalKey(LoggingConfiguration),
    tags: Schema.optionalKey(Schema.Array(Tag)),
    tracingConfiguration: Schema.optionalKey(TracingConfiguration),
    publish: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
    versionDescription: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinCodePoints(0).annotate({
            expected: "a string with at least 0 code points",
          }),
        )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        ),
    ),
    encryptionConfiguration: Schema.optionalKey(EncryptionConfiguration),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateStateMachineInput = typeof CreateStateMachineInput.Type;

export const CreateStateMachineOutput = Schema.StructWithRest(
  Schema.Struct({
    stateMachineArn: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
    creationDate: Schema.Number.annotate({ format: "double" }).check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    stateMachineVersionArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
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

export type CreateStateMachineOutput = typeof CreateStateMachineOutput.Type;

export const InvalidArn = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidArn = typeof InvalidArn.Type;

export const InvalidDefinition = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidDefinition = typeof InvalidDefinition.Type;

export const InvalidEncryptionConfiguration = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidEncryptionConfiguration =
  typeof InvalidEncryptionConfiguration.Type;

export const InvalidLoggingConfiguration = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidLoggingConfiguration =
  typeof InvalidLoggingConfiguration.Type;

export const InvalidName = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidName = typeof InvalidName.Type;

export const InvalidTracingConfiguration = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidTracingConfiguration =
  typeof InvalidTracingConfiguration.Type;

export const KmsAccessDeniedException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsAccessDeniedException = typeof KmsAccessDeniedException.Type;

export const KmsThrottlingException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsThrottlingException = typeof KmsThrottlingException.Type;

export const StateMachineAlreadyExists = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type StateMachineAlreadyExists = typeof StateMachineAlreadyExists.Type;

export const StateMachineDeleting = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type StateMachineDeleting = typeof StateMachineDeleting.Type;

export const StateMachineLimitExceeded = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type StateMachineLimitExceeded = typeof StateMachineLimitExceeded.Type;

export const StateMachineTypeNotSupported = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type StateMachineTypeNotSupported =
  typeof StateMachineTypeNotSupported.Type;

export const TooManyTags = Schema.StructWithRest(
  Schema.Struct({
    message: Schema.optionalKey(Schema.String),
    resourceName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
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

export type TooManyTags = typeof TooManyTags.Type;

export const ValidationException = Schema.StructWithRest(
  Schema.Struct({
    message: Schema.optionalKey(Schema.String),
    reason: Schema.optionalKey(ValidationExceptionReason),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ValidationException = typeof ValidationException.Type;

export const ConflictException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ConflictException = typeof ConflictException.Type;

export const DeleteStateMachineInput = Schema.StructWithRest(
  Schema.Struct({
    stateMachineArn: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
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

export type DeleteStateMachineInput = typeof DeleteStateMachineInput.Type;

export const DescribeStateMachineInput = Schema.StructWithRest(
  Schema.Struct({
    stateMachineArn: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
    includedData: Schema.optionalKey(IncludedData),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DescribeStateMachineInput = typeof DescribeStateMachineInput.Type;

export const DescribeStateMachineOutput = Schema.StructWithRest(
  Schema.Struct({
    stateMachineArn: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
    status: Schema.optionalKey(StateMachineStatus),
    definition: Schema.String.annotate({ format: "password" })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1048576).annotate({
          expected: "a string with at most 1048576 code points",
        }),
      ),
    roleArn: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
    type: StateMachineType,
    creationDate: Schema.Number.annotate({ format: "double" }).check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    loggingConfiguration: Schema.optionalKey(LoggingConfiguration),
    tracingConfiguration: Schema.optionalKey(TracingConfiguration),
    label: Schema.optionalKey(Schema.String),
    revisionId: Schema.optionalKey(Schema.String),
    description: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinCodePoints(0).annotate({
            expected: "a string with at least 0 code points",
          }),
        )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        ),
    ),
    encryptionConfiguration: Schema.optionalKey(EncryptionConfiguration),
    variableReferences: Schema.optionalKey(VariableReferences),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DescribeStateMachineOutput = typeof DescribeStateMachineOutput.Type;

export const KmsInvalidStateException = Schema.StructWithRest(
  Schema.Struct({
    kmsKeyState: Schema.optionalKey(KmsKeyState),
    message: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type KmsInvalidStateException = typeof KmsInvalidStateException.Type;

export const StateMachineDoesNotExist = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type StateMachineDoesNotExist = typeof StateMachineDoesNotExist.Type;

export const UpdateStateMachineInput = Schema.StructWithRest(
  Schema.Struct({
    stateMachineArn: Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
    definition: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(1048576).annotate({
            expected: "a string with at most 1048576 code points",
          }),
        ),
    ),
    roleArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    loggingConfiguration: Schema.optionalKey(LoggingConfiguration),
    tracingConfiguration: Schema.optionalKey(TracingConfiguration),
    publish: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
    versionDescription: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinCodePoints(0).annotate({
            expected: "a string with at least 0 code points",
          }),
        )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        ),
    ),
    encryptionConfiguration: Schema.optionalKey(EncryptionConfiguration),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateStateMachineInput = typeof UpdateStateMachineInput.Type;

export const UpdateStateMachineOutput = Schema.StructWithRest(
  Schema.Struct({
    updateDate: Schema.Number.annotate({ format: "double" }).check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    revisionId: Schema.optionalKey(Schema.String),
    stateMachineVersionArn: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
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

export type UpdateStateMachineOutput = typeof UpdateStateMachineOutput.Type;

export const MissingRequiredParameter = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type MissingRequiredParameter = typeof MissingRequiredParameter.Type;

export const ServiceQuotaExceededException = Schema.StructWithRest(
  Schema.Struct({ message: Schema.optionalKey(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ServiceQuotaExceededException =
  typeof ServiceQuotaExceededException.Type;

export const stepFunctionsErrors = {
  InvalidArn: {
    name: "InvalidArn",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidArn,
  },
  InvalidDefinition: {
    name: "InvalidDefinition",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidDefinition,
  },
  InvalidEncryptionConfiguration: {
    name: "InvalidEncryptionConfiguration",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidEncryptionConfiguration,
  },
  InvalidLoggingConfiguration: {
    name: "InvalidLoggingConfiguration",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidLoggingConfiguration,
  },
  InvalidName: {
    name: "InvalidName",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidName,
  },
  InvalidTracingConfiguration: {
    name: "InvalidTracingConfiguration",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidTracingConfiguration,
  },
  KmsAccessDeniedException: {
    name: "KmsAccessDeniedException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: KmsAccessDeniedException,
  },
  KmsThrottlingException: {
    name: "KmsThrottlingException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: KmsThrottlingException,
  },
  StateMachineAlreadyExists: {
    name: "StateMachineAlreadyExists",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: StateMachineAlreadyExists,
  },
  StateMachineDeleting: {
    name: "StateMachineDeleting",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: StateMachineDeleting,
  },
  StateMachineLimitExceeded: {
    name: "StateMachineLimitExceeded",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: StateMachineLimitExceeded,
  },
  StateMachineTypeNotSupported: {
    name: "StateMachineTypeNotSupported",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: StateMachineTypeNotSupported,
  },
  TooManyTags: {
    name: "TooManyTags",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: TooManyTags,
  },
  ValidationException: {
    name: "ValidationException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: ValidationException,
  },
  ConflictException: {
    name: "ConflictException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    schema: ConflictException,
  },
  KmsInvalidStateException: {
    name: "KmsInvalidStateException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: KmsInvalidStateException,
  },
  StateMachineDoesNotExist: {
    name: "StateMachineDoesNotExist",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: StateMachineDoesNotExist,
  },
  MissingRequiredParameter: {
    name: "MissingRequiredParameter",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: MissingRequiredParameter,
  },
  ServiceQuotaExceededException: {
    name: "ServiceQuotaExceededException",
    fault: "client",
    httpStatus: 402,
    retryable: null,
    schema: ServiceQuotaExceededException,
  },
};

export const createStateMachineErrors = [
  stepFunctionsErrors.InvalidArn,
  stepFunctionsErrors.InvalidDefinition,
  stepFunctionsErrors.InvalidEncryptionConfiguration,
  stepFunctionsErrors.InvalidLoggingConfiguration,
  stepFunctionsErrors.InvalidName,
  stepFunctionsErrors.InvalidTracingConfiguration,
  stepFunctionsErrors.KmsAccessDeniedException,
  stepFunctionsErrors.KmsThrottlingException,
  stepFunctionsErrors.StateMachineAlreadyExists,
  stepFunctionsErrors.StateMachineDeleting,
  stepFunctionsErrors.StateMachineLimitExceeded,
  stepFunctionsErrors.StateMachineTypeNotSupported,
  stepFunctionsErrors.TooManyTags,
  stepFunctionsErrors.ValidationException,
  stepFunctionsErrors.ConflictException,
];

export const deleteStateMachineErrors = [
  stepFunctionsErrors.InvalidArn,
  stepFunctionsErrors.ValidationException,
];

export const describeStateMachineErrors = [
  stepFunctionsErrors.InvalidArn,
  stepFunctionsErrors.KmsAccessDeniedException,
  stepFunctionsErrors.KmsInvalidStateException,
  stepFunctionsErrors.KmsThrottlingException,
  stepFunctionsErrors.StateMachineDoesNotExist,
];

export const updateStateMachineErrors = [
  stepFunctionsErrors.InvalidArn,
  stepFunctionsErrors.InvalidDefinition,
  stepFunctionsErrors.InvalidEncryptionConfiguration,
  stepFunctionsErrors.InvalidLoggingConfiguration,
  stepFunctionsErrors.InvalidTracingConfiguration,
  stepFunctionsErrors.KmsAccessDeniedException,
  stepFunctionsErrors.KmsThrottlingException,
  stepFunctionsErrors.MissingRequiredParameter,
  stepFunctionsErrors.StateMachineDeleting,
  stepFunctionsErrors.StateMachineDoesNotExist,
  stepFunctionsErrors.ValidationException,
  stepFunctionsErrors.ServiceQuotaExceededException,
  stepFunctionsErrors.ConflictException,
];

export const createStateMachineOperation: AwsJsonRpcOperation & {
  readonly input: typeof CreateStateMachineInput;
  readonly output: typeof CreateStateMachineOutput;
} = {
  name: "CreateStateMachine",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AWSStepFunctions.CreateStateMachine",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: CreateStateMachineInput,
  output: CreateStateMachineOutput,
  errors: createStateMachineErrors,
};

export const createStateMachineEndpoint = HttpApiEndpoint.make("POST")(
  "CreateStateMachine",
  "/",
  {
    payload: CreateStateMachineInput,
    success: CreateStateMachineOutput,
  },
);

export const DeleteStateMachineOutput = awsJsonRpcEmptyOutput(
  "application/x-amz-json-1.0",
);

export const deleteStateMachineOperation: AwsJsonRpcOperation & {
  readonly input: typeof DeleteStateMachineInput;
  readonly output: typeof DeleteStateMachineOutput;
} = {
  name: "DeleteStateMachine",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AWSStepFunctions.DeleteStateMachine",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DeleteStateMachineInput,
  output: DeleteStateMachineOutput,
  errors: deleteStateMachineErrors,
};

export const deleteStateMachineEndpoint = HttpApiEndpoint.make("POST")(
  "DeleteStateMachine",
  "/",
  {
    payload: DeleteStateMachineInput,
    success: DeleteStateMachineOutput,
  },
);

export const describeStateMachineOperation: AwsJsonRpcOperation & {
  readonly input: typeof DescribeStateMachineInput;
  readonly output: typeof DescribeStateMachineOutput;
} = {
  name: "DescribeStateMachine",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AWSStepFunctions.DescribeStateMachine",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: DescribeStateMachineInput,
  output: DescribeStateMachineOutput,
  errors: describeStateMachineErrors,
};

export const describeStateMachineEndpoint = HttpApiEndpoint.make("POST")(
  "DescribeStateMachine",
  "/",
  {
    payload: DescribeStateMachineInput,
    success: DescribeStateMachineOutput,
  },
);

export const updateStateMachineOperation: AwsJsonRpcOperation & {
  readonly input: typeof UpdateStateMachineInput;
  readonly output: typeof UpdateStateMachineOutput;
} = {
  name: "UpdateStateMachine",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "AWSStepFunctions.UpdateStateMachine",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  waiters: {},
  input: UpdateStateMachineInput,
  output: UpdateStateMachineOutput,
  errors: updateStateMachineErrors,
};

export const updateStateMachineEndpoint = HttpApiEndpoint.make("POST")(
  "UpdateStateMachine",
  "/",
  {
    payload: UpdateStateMachineInput,
    success: UpdateStateMachineOutput,
  },
);

export const stepFunctionsOperations = {
  CreateStateMachine: createStateMachineOperation,
  DeleteStateMachine: deleteStateMachineOperation,
  DescribeStateMachine: describeStateMachineOperation,
  UpdateStateMachine: updateStateMachineOperation,
};

export const stepFunctionsApi = HttpApi.make("StepFunctions").add(
  HttpApiGroup.make("stepfunctions").add(
    createStateMachineEndpoint,
    deleteStateMachineEndpoint,
    describeStateMachineEndpoint,
    updateStateMachineEndpoint,
  ),
);

export const stepFunctionsService: AwsServiceDefinition = {
  service: "com.amazonaws.sfn#AWSStepFunctions",
  version: "2016-11-23",
  protocol: "awsJson1_0",
  signingName: "states",
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
                            ref: "Region",
                          },
                          "us-gov-west-1",
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
                      url: "https://states.{Region}.{PartitionResult#dnsSuffix}",
                      properties: {},
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
                      url: "https://states-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                      properties: {},
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
                              url: "https://states-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                              url: "https://states-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                              url: "https://states.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                      url: "https://states.{Region}.{PartitionResult#dnsSuffix}",
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
        type: "tree",
      },
    ],
  },
};

/** The makeStepFunctionsClient constructor supplies callable StepFunctions operations through the shared AwsClient service. Calls validate inputs and responses with the generated schemas and retain typed request, response, and provider failures. */
export const makeStepFunctionsClient = Effect.gen(function* () {
  const aws = yield* AwsClient;
  const bindOperation = aws.bindOperation(stepFunctionsService);

  /** The createStateMachine function invokes AWS CreateStateMachine through the shared client. Its Effect returns the decoded CreateStateMachineOutput result after a successful response; validation and provider failures remain in the error channel. */
  const createStateMachine = bindOperation(createStateMachineOperation);
  /** The deleteStateMachine function invokes AWS DeleteStateMachine through the shared client. Its Effect returns the decoded void result after a successful response; validation and provider failures remain in the error channel. */
  const deleteStateMachine = bindOperation(deleteStateMachineOperation);
  /** The describeStateMachine function invokes AWS DescribeStateMachine through the shared client. Its Effect returns the decoded DescribeStateMachineOutput result after a successful response; validation and provider failures remain in the error channel. */
  const describeStateMachine = bindOperation(describeStateMachineOperation);
  /** The updateStateMachine function invokes AWS UpdateStateMachine through the shared client. Its Effect returns the decoded UpdateStateMachineOutput result after a successful response; validation and provider failures remain in the error channel. */
  const updateStateMachine = bindOperation(updateStateMachineOperation);

  return {
    createStateMachine,
    deleteStateMachine,
    describeStateMachine,
    updateStateMachine,
  };
});
export const stepFunctionsOperationCatalog = [
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sfn#AWSStepFunctions",
      name: "CreateStateMachine.json",
      format: "Smithy",
    },
    version: "2016-11-23",
    operationId: "CreateStateMachine",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "409": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": stepFunctionsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sfn#AWSStepFunctions",
      name: "DeleteStateMachine.json",
      format: "Smithy",
    },
    version: "2016-11-23",
    operationId: "DeleteStateMachine",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": [],
      "400": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": stepFunctionsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sfn#AWSStepFunctions",
      name: "DescribeStateMachine.json",
      format: "Smithy",
    },
    version: "2016-11-23",
    operationId: "DescribeStateMachine",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": stepFunctionsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
  {
    source: {
      provider: "AWS",
      service: "com.amazonaws.sfn#AWSStepFunctions",
      name: "UpdateStateMachine.json",
      format: "Smithy",
    },
    version: "2016-11-23",
    operationId: "UpdateStateMachine",
    method: "POST",
    path: "/",
    servers: [],
    parameters: [
      {
        name: "X-Amz-Target",
        location: "header",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      mediaTypes: ["application/x-amz-json-1.0"],
    },
    responses: {
      "200": ["application/x-amz-json-1.0"],
      "400": ["application/x-amz-json-1.0"],
      "402": ["application/x-amz-json-1.0"],
      "409": ["application/x-amz-json-1.0"],
    },
    providerMetadata: {
      document: {
        "x-aws-service": stepFunctionsService,
      },
      operation: {
        "x-aws-idempotency-tokens": [],
        "x-aws-pagination": {},
        "x-aws-waiters": {},
      },
    },
  },
];
