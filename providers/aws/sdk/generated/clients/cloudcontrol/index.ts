// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.

import { AwsClient } from "@nomoss/aws";
import type {
  AwsJsonRpcOperation,
  AwsServiceDefinition,
} from "@nomoss/aws/model";
import { Effect, Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";

export const Operation = Schema.Literals([
  "CREATE",
  "DELETE",
  "UPDATE",
]).annotate({ identifier: "Operation" });

export type Operation = typeof Operation.Type;

export const OperationStatus = Schema.Literals([
  "PENDING",
  "IN_PROGRESS",
  "SUCCESS",
  "FAILED",
  "CANCEL_IN_PROGRESS",
  "CANCEL_COMPLETE",
]).annotate({ identifier: "OperationStatus" });

export type OperationStatus = typeof OperationStatus.Type;

export const HandlerErrorCode = Schema.Literals([
  "NotUpdatable",
  "InvalidRequest",
  "AccessDenied",
  "UnauthorizedTaggingOperation",
  "InvalidCredentials",
  "AlreadyExists",
  "NotFound",
  "ResourceConflict",
  "Throttling",
  "ServiceLimitExceeded",
  "NotStabilized",
  "GeneralServiceException",
  "ServiceInternalError",
  "ServiceTimeout",
  "NetworkFailure",
  "InternalFailure",
]).annotate({ identifier: "HandlerErrorCode" });

export type HandlerErrorCode = typeof HandlerErrorCode.Type;

export const ResourceDescription = Schema.StructWithRest(
  Schema.Struct({
    Identifier: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
          }),
        ),
    ),
    Properties: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(262144).annotate({
            expected: "a string with at most 262144 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\s\\S]*$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\s\\S]*$",
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
).annotate({ identifier: "ResourceDescription" });

export type ResourceDescription = typeof ResourceDescription.Type;

export const HookProgressEvent = Schema.StructWithRest(
  Schema.Struct({
    HookTypeName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(10).annotate({
          expected: "a string with at least 10 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(196).annotate({
            expected: "a string with at most 196 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
          }),
        ),
    ),
    HookTypeVersionId: Schema.optionalKey(
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
            new globalThis.RegExp("^[A-Za-z0-9-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[A-Za-z0-9-]+$",
          }),
        ),
    ),
    HookTypeArn: Schema.optionalKey(
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
            new globalThis.RegExp("^arn:aws.*:.+:.*:.*:.+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^arn:aws.*:.+:.*:.*:.+$",
          }),
        ),
    ),
    InvocationPoint: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z_]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z_]+$",
          }),
        ),
    ),
    HookStatus: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z_]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z_]+$",
          }),
        ),
    ),
    HookEventTime: Schema.optionalKey(
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    HookStatusMessage: Schema.optionalKey(
      Schema.String.check(
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
          Schema.isPattern(new globalThis.RegExp("^[\\s\\S]*$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\s\\S]*$",
          }),
        ),
    ),
    FailureMode: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z_]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z_]+$",
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
).annotate({ identifier: "HookProgressEvent" });

export type HookProgressEvent = typeof HookProgressEvent.Type;

export const ResourceRequestStatusFilter = Schema.StructWithRest(
  Schema.Struct({
    Operations: Schema.optionalKey(Schema.Array(Operation)),
    OperationStatuses: Schema.optionalKey(Schema.Array(OperationStatus)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ResourceRequestStatusFilter" });

export type ResourceRequestStatusFilter =
  typeof ResourceRequestStatusFilter.Type;

export const ProgressEvent = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(10).annotate({
          expected: "a string with at least 10 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(196).annotate({
            expected: "a string with at most 196 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
          }),
        ),
    ),
    Identifier: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
          }),
        ),
    ),
    RequestToken: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
          }),
        ),
    ),
    HooksRequestToken: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
          }),
        ),
    ),
    Operation: Schema.optionalKey(Operation),
    OperationStatus: Schema.optionalKey(OperationStatus),
    EventTime: Schema.optionalKey(
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    ResourceModel: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(262144).annotate({
            expected: "a string with at most 262144 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\s\\S]*$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\s\\S]*$",
          }),
        ),
    ),
    StatusMessage: Schema.optionalKey(
      Schema.String.check(
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
          Schema.isPattern(new globalThis.RegExp("^[\\s\\S]*$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\s\\S]*$",
          }),
        ),
    ),
    ErrorCode: Schema.optionalKey(HandlerErrorCode),
    RetryAfter: Schema.optionalKey(
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ProgressEvent" });

export type ProgressEvent = typeof ProgressEvent.Type;

export const CancelResourceRequestInput = Schema.StructWithRest(
  Schema.Struct({
    RequestToken: Schema.String.check(
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
          new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
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

export type CancelResourceRequestInput = typeof CancelResourceRequestInput.Type;

export const CancelResourceRequestOutput = Schema.StructWithRest(
  Schema.Struct({ ProgressEvent: Schema.optionalKey(ProgressEvent) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CancelResourceRequestOutput =
  typeof CancelResourceRequestOutput.Type;

export const RequestTokenNotFoundException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type RequestTokenNotFoundException =
  typeof RequestTokenNotFoundException.Type;

export const ConcurrentModificationException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ConcurrentModificationException =
  typeof ConcurrentModificationException.Type;

export const CreateResourceInput = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.String.check(
      Schema.isMinCodePoints(10).annotate({
        expected: "a string with at least 10 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(196).annotate({
          expected: "a string with at most 196 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
        }),
      ),
    TypeVersionId: Schema.optionalKey(
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
            new globalThis.RegExp("^[A-Za-z0-9-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[A-Za-z0-9-]+$",
          }),
        ),
    ),
    RoleArn: Schema.optionalKey(
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
            new globalThis.RegExp("^arn:.+:iam::[0-9]{12}:role\\/.+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:.+:iam::[0-9]{12}:role\\/.+$",
          }),
        ),
    ),
    ClientToken: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
          }),
        ),
    ),
    DesiredState: Schema.String.annotate({ format: "password" })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(262144).annotate({
          expected: "a string with at most 262144 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]*$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]*$",
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

export type CreateResourceInput = typeof CreateResourceInput.Type;

export const CreateResourceOutput = Schema.StructWithRest(
  Schema.Struct({ ProgressEvent: Schema.optionalKey(ProgressEvent) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateResourceOutput = typeof CreateResourceOutput.Type;

export const AlreadyExistsException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type AlreadyExistsException = typeof AlreadyExistsException.Type;

export const GeneralServiceException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type GeneralServiceException = typeof GeneralServiceException.Type;

export const InvalidRequestException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type InvalidRequestException = typeof InvalidRequestException.Type;

export const NotStabilizedException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type NotStabilizedException = typeof NotStabilizedException.Type;

export const NotUpdatableException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type NotUpdatableException = typeof NotUpdatableException.Type;

export const PrivateTypeException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type PrivateTypeException = typeof PrivateTypeException.Type;

export const ServiceLimitExceededException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ServiceLimitExceededException =
  typeof ServiceLimitExceededException.Type;

export const InvalidCredentialsException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type InvalidCredentialsException =
  typeof InvalidCredentialsException.Type;

export const ResourceNotFoundException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ResourceNotFoundException = typeof ResourceNotFoundException.Type;

export const TypeNotFoundException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type TypeNotFoundException = typeof TypeNotFoundException.Type;

export const UnsupportedActionException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type UnsupportedActionException = typeof UnsupportedActionException.Type;

export const ClientTokenConflictException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ClientTokenConflictException =
  typeof ClientTokenConflictException.Type;

export const ConcurrentOperationException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ConcurrentOperationException =
  typeof ConcurrentOperationException.Type;

export const ResourceConflictException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ResourceConflictException = typeof ResourceConflictException.Type;

export const ThrottlingException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ThrottlingException = typeof ThrottlingException.Type;

export const HandlerFailureException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type HandlerFailureException = typeof HandlerFailureException.Type;

export const HandlerInternalFailureException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type HandlerInternalFailureException =
  typeof HandlerInternalFailureException.Type;

export const NetworkFailureException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type NetworkFailureException = typeof NetworkFailureException.Type;

export const ServiceInternalErrorException = Schema.StructWithRest(
  Schema.Struct({
    Message: Schema.optionalKey(
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
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ServiceInternalErrorException =
  typeof ServiceInternalErrorException.Type;

export const DeleteResourceInput = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.String.check(
      Schema.isMinCodePoints(10).annotate({
        expected: "a string with at least 10 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(196).annotate({
          expected: "a string with at most 196 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
        }),
      ),
    TypeVersionId: Schema.optionalKey(
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
            new globalThis.RegExp("^[A-Za-z0-9-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[A-Za-z0-9-]+$",
          }),
        ),
    ),
    RoleArn: Schema.optionalKey(
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
            new globalThis.RegExp("^arn:.+:iam::[0-9]{12}:role\\/.+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:.+:iam::[0-9]{12}:role\\/.+$",
          }),
        ),
    ),
    ClientToken: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
          }),
        ),
    ),
    Identifier: Schema.String.check(
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
        Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
          expected: "a string matching the RegExp ^.+$",
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

export type DeleteResourceInput = typeof DeleteResourceInput.Type;

export const DeleteResourceOutput = Schema.StructWithRest(
  Schema.Struct({ ProgressEvent: Schema.optionalKey(ProgressEvent) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteResourceOutput = typeof DeleteResourceOutput.Type;

export const GetResourceInput = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.String.check(
      Schema.isMinCodePoints(10).annotate({
        expected: "a string with at least 10 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(196).annotate({
          expected: "a string with at most 196 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
        }),
      ),
    TypeVersionId: Schema.optionalKey(
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
            new globalThis.RegExp("^[A-Za-z0-9-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[A-Za-z0-9-]+$",
          }),
        ),
    ),
    RoleArn: Schema.optionalKey(
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
            new globalThis.RegExp("^arn:.+:iam::[0-9]{12}:role\\/.+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:.+:iam::[0-9]{12}:role\\/.+$",
          }),
        ),
    ),
    Identifier: Schema.String.check(
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
        Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
          expected: "a string matching the RegExp ^.+$",
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

export type GetResourceInput = typeof GetResourceInput.Type;

export const GetResourceOutput = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(10).annotate({
          expected: "a string with at least 10 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(196).annotate({
            expected: "a string with at most 196 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
          }),
        ),
    ),
    ResourceDescription: Schema.optionalKey(ResourceDescription),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetResourceOutput = typeof GetResourceOutput.Type;

export const GetResourceRequestStatusInput = Schema.StructWithRest(
  Schema.Struct({
    RequestToken: Schema.String.check(
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
          new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
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

export type GetResourceRequestStatusInput =
  typeof GetResourceRequestStatusInput.Type;

export const GetResourceRequestStatusOutput = Schema.StructWithRest(
  Schema.Struct({
    ProgressEvent: Schema.optionalKey(ProgressEvent),
    HooksProgressEvent: Schema.optionalKey(Schema.Array(HookProgressEvent)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetResourceRequestStatusOutput =
  typeof GetResourceRequestStatusOutput.Type;

export const ListResourceRequestsInput = Schema.StructWithRest(
  Schema.Struct({
    MaxResults: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        ),
    ),
    NextToken: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
          }),
        ),
    ),
    ResourceRequestStatusFilter: Schema.optionalKey(
      ResourceRequestStatusFilter,
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ListResourceRequestsInput = typeof ListResourceRequestsInput.Type;

export const ListResourceRequestsOutput = Schema.StructWithRest(
  Schema.Struct({
    ResourceRequestStatusSummaries: Schema.optionalKey(
      Schema.Array(ProgressEvent),
    ),
    NextToken: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
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

export type ListResourceRequestsOutput = typeof ListResourceRequestsOutput.Type;

export const ListResourcesInput = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.String.check(
      Schema.isMinCodePoints(10).annotate({
        expected: "a string with at least 10 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(196).annotate({
          expected: "a string with at most 196 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
        }),
      ),
    TypeVersionId: Schema.optionalKey(
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
            new globalThis.RegExp("^[A-Za-z0-9-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[A-Za-z0-9-]+$",
          }),
        ),
    ),
    RoleArn: Schema.optionalKey(
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
            new globalThis.RegExp("^arn:.+:iam::[0-9]{12}:role\\/.+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:.+:iam::[0-9]{12}:role\\/.+$",
          }),
        ),
    ),
    NextToken: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(4096).annotate({
            expected: "a string with at most 4096 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
          }),
        ),
    ),
    MaxResults: Schema.optionalKey(
      Schema.Number.annotate({ format: "int32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        ),
    ),
    ResourceModel: Schema.optionalKey(
      Schema.String.annotate({ format: "password" })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(262144).annotate({
            expected: "a string with at most 262144 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[\\s\\S]*$", "u")).annotate({
            expected: "a string matching the RegExp ^[\\s\\S]*$",
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

export type ListResourcesInput = typeof ListResourcesInput.Type;

export const ListResourcesOutput = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(10).annotate({
          expected: "a string with at least 10 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(196).annotate({
            expected: "a string with at most 196 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
          }),
        ),
    ),
    ResourceDescriptions: Schema.optionalKey(Schema.Array(ResourceDescription)),
    NextToken: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(4096).annotate({
            expected: "a string with at most 4096 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
            expected: "a string matching the RegExp ^.+$",
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

export type ListResourcesOutput = typeof ListResourcesOutput.Type;

export const UpdateResourceInput = Schema.StructWithRest(
  Schema.Struct({
    TypeName: Schema.String.check(
      Schema.isMinCodePoints(10).annotate({
        expected: "a string with at least 10 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(196).annotate({
          expected: "a string with at most 196 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
        }),
      ),
    TypeVersionId: Schema.optionalKey(
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
            new globalThis.RegExp("^[A-Za-z0-9-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[A-Za-z0-9-]+$",
          }),
        ),
    ),
    RoleArn: Schema.optionalKey(
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
            new globalThis.RegExp("^arn:.+:iam::[0-9]{12}:role\\/.+$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^arn:.+:iam::[0-9]{12}:role\\/.+$",
          }),
        ),
    ),
    ClientToken: Schema.optionalKey(
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
            new globalThis.RegExp("^[-A-Za-z0-9+/=]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[-A-Za-z0-9+/=]+$",
          }),
        ),
    ),
    Identifier: Schema.String.check(
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
        Schema.isPattern(new globalThis.RegExp("^.+$", "u")).annotate({
          expected: "a string matching the RegExp ^.+$",
        }),
      ),
    PatchDocument: Schema.String.annotate({ format: "password" })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(262144).annotate({
          expected: "a string with at most 262144 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]*$", "u")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]*$",
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

export type UpdateResourceInput = typeof UpdateResourceInput.Type;

export const UpdateResourceOutput = Schema.StructWithRest(
  Schema.Struct({ ProgressEvent: Schema.optionalKey(ProgressEvent) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateResourceOutput = typeof UpdateResourceOutput.Type;

export const cloudControlErrors = {
  RequestTokenNotFoundException: {
    name: "RequestTokenNotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    code: "RequestTokenNotFoundException",
    schema: RequestTokenNotFoundException,
  },
  ConcurrentModificationException: {
    name: "ConcurrentModificationException",
    fault: "server",
    httpStatus: 500,
    retryable: null,
    code: "ConcurrentModificationException",
    schema: ConcurrentModificationException,
  },
  AlreadyExistsException: {
    name: "AlreadyExistsException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "AlreadyExistsException",
    schema: AlreadyExistsException,
  },
  GeneralServiceException: {
    name: "GeneralServiceException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "GeneralServiceException",
    schema: GeneralServiceException,
  },
  InvalidRequestException: {
    name: "InvalidRequestException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "InvalidRequestException",
    schema: InvalidRequestException,
  },
  NotStabilizedException: {
    name: "NotStabilizedException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "NotStabilizedException",
    schema: NotStabilizedException,
  },
  NotUpdatableException: {
    name: "NotUpdatableException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "NotUpdatableException",
    schema: NotUpdatableException,
  },
  PrivateTypeException: {
    name: "PrivateTypeException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "PrivateTypeException",
    schema: PrivateTypeException,
  },
  ServiceLimitExceededException: {
    name: "ServiceLimitExceededException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    code: "ServiceLimitExceededException",
    schema: ServiceLimitExceededException,
  },
  InvalidCredentialsException: {
    name: "InvalidCredentialsException",
    fault: "client",
    httpStatus: 401,
    retryable: null,
    code: "InvalidCredentialsException",
    schema: InvalidCredentialsException,
  },
  ResourceNotFoundException: {
    name: "ResourceNotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    code: "ResourceNotFoundException",
    schema: ResourceNotFoundException,
  },
  TypeNotFoundException: {
    name: "TypeNotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    code: "TypeNotFoundException",
    schema: TypeNotFoundException,
  },
  UnsupportedActionException: {
    name: "UnsupportedActionException",
    fault: "client",
    httpStatus: 405,
    retryable: null,
    code: "UnsupportedActionException",
    schema: UnsupportedActionException,
  },
  ClientTokenConflictException: {
    name: "ClientTokenConflictException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "ClientTokenConflictException",
    schema: ClientTokenConflictException,
  },
  ConcurrentOperationException: {
    name: "ConcurrentOperationException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "ConcurrentOperationException",
    schema: ConcurrentOperationException,
  },
  ResourceConflictException: {
    name: "ResourceConflictException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    code: "ResourceConflictException",
    schema: ResourceConflictException,
  },
  ThrottlingException: {
    name: "ThrottlingException",
    fault: "client",
    httpStatus: 429,
    retryable: null,
    code: "ThrottlingException",
    schema: ThrottlingException,
  },
  HandlerFailureException: {
    name: "HandlerFailureException",
    fault: "server",
    httpStatus: 502,
    retryable: null,
    code: "HandlerFailureException",
    schema: HandlerFailureException,
  },
  HandlerInternalFailureException: {
    name: "HandlerInternalFailureException",
    fault: "server",
    httpStatus: 502,
    retryable: null,
    code: "HandlerInternalFailureException",
    schema: HandlerInternalFailureException,
  },
  NetworkFailureException: {
    name: "NetworkFailureException",
    fault: "server",
    httpStatus: 502,
    retryable: null,
    code: "NetworkFailureException",
    schema: NetworkFailureException,
  },
  ServiceInternalErrorException: {
    name: "ServiceInternalErrorException",
    fault: "server",
    httpStatus: 502,
    retryable: null,
    code: "ServiceInternalErrorException",
    schema: ServiceInternalErrorException,
  },
};

export const cancelResourceRequestErrors = [
  cloudControlErrors.RequestTokenNotFoundException,
  cloudControlErrors.ConcurrentModificationException,
];

export const createResourceErrors = [
  cloudControlErrors.AlreadyExistsException,
  cloudControlErrors.GeneralServiceException,
  cloudControlErrors.InvalidRequestException,
  cloudControlErrors.NotStabilizedException,
  cloudControlErrors.NotUpdatableException,
  cloudControlErrors.PrivateTypeException,
  cloudControlErrors.ServiceLimitExceededException,
  cloudControlErrors.InvalidCredentialsException,
  cloudControlErrors.ResourceNotFoundException,
  cloudControlErrors.TypeNotFoundException,
  cloudControlErrors.UnsupportedActionException,
  cloudControlErrors.ClientTokenConflictException,
  cloudControlErrors.ConcurrentOperationException,
  cloudControlErrors.ResourceConflictException,
  cloudControlErrors.ThrottlingException,
  cloudControlErrors.HandlerFailureException,
  cloudControlErrors.HandlerInternalFailureException,
  cloudControlErrors.NetworkFailureException,
  cloudControlErrors.ServiceInternalErrorException,
];

export const getResourceErrors = [
  cloudControlErrors.AlreadyExistsException,
  cloudControlErrors.GeneralServiceException,
  cloudControlErrors.InvalidRequestException,
  cloudControlErrors.NotStabilizedException,
  cloudControlErrors.NotUpdatableException,
  cloudControlErrors.PrivateTypeException,
  cloudControlErrors.ServiceLimitExceededException,
  cloudControlErrors.InvalidCredentialsException,
  cloudControlErrors.ResourceNotFoundException,
  cloudControlErrors.TypeNotFoundException,
  cloudControlErrors.UnsupportedActionException,
  cloudControlErrors.ResourceConflictException,
  cloudControlErrors.ThrottlingException,
  cloudControlErrors.HandlerFailureException,
  cloudControlErrors.HandlerInternalFailureException,
  cloudControlErrors.NetworkFailureException,
  cloudControlErrors.ServiceInternalErrorException,
];

export const getResourceRequestStatusErrors = [
  cloudControlErrors.RequestTokenNotFoundException,
];

export const listResourceRequestsErrors = [];

export const cancelResourceRequestOperation: AwsJsonRpcOperation & {
  readonly input: typeof CancelResourceRequestInput;
  readonly output: typeof CancelResourceRequestOutput;
} = {
  name: "CancelResourceRequest",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.CancelResourceRequest",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  input: CancelResourceRequestInput,
  output: CancelResourceRequestOutput,
  errors: cancelResourceRequestErrors,
};

export const cancelResourceRequestEndpoint = HttpApiEndpoint.make("POST")(
  "CancelResourceRequest",
  "/",
  {
    payload: CancelResourceRequestInput,
    success: CancelResourceRequestOutput,
  },
);

export const createResourceOperation: AwsJsonRpcOperation & {
  readonly input: typeof CreateResourceInput;
  readonly output: typeof CreateResourceOutput;
} = {
  name: "CreateResource",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.CreateResource",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: ["ClientToken"],
  pagination: {},
  input: CreateResourceInput,
  output: CreateResourceOutput,
  errors: createResourceErrors,
};

export const createResourceEndpoint = HttpApiEndpoint.make("POST")(
  "CreateResource",
  "/",
  {
    payload: CreateResourceInput,
    success: CreateResourceOutput,
  },
);

export const deleteResourceOperation: AwsJsonRpcOperation & {
  readonly input: typeof DeleteResourceInput;
  readonly output: typeof DeleteResourceOutput;
} = {
  name: "DeleteResource",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.DeleteResource",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: ["ClientToken"],
  pagination: {},
  input: DeleteResourceInput,
  output: DeleteResourceOutput,
  errors: createResourceErrors,
};

export const deleteResourceEndpoint = HttpApiEndpoint.make("POST")(
  "DeleteResource",
  "/",
  {
    payload: DeleteResourceInput,
    success: DeleteResourceOutput,
  },
);

export const getResourceOperation: AwsJsonRpcOperation & {
  readonly input: typeof GetResourceInput;
  readonly output: typeof GetResourceOutput;
} = {
  name: "GetResource",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.GetResource",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetResourceInput,
  output: GetResourceOutput,
  errors: getResourceErrors,
};

export const getResourceEndpoint = HttpApiEndpoint.make("POST")(
  "GetResource",
  "/",
  {
    payload: GetResourceInput,
    success: GetResourceOutput,
  },
);

export const getResourceRequestStatusOperation: AwsJsonRpcOperation & {
  readonly input: typeof GetResourceRequestStatusInput;
  readonly output: typeof GetResourceRequestStatusOutput;
} = {
  name: "GetResourceRequestStatus",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.GetResourceRequestStatus",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetResourceRequestStatusInput,
  output: GetResourceRequestStatusOutput,
  errors: getResourceRequestStatusErrors,
};

export const getResourceRequestStatusEndpoint = HttpApiEndpoint.make("POST")(
  "GetResourceRequestStatus",
  "/",
  {
    payload: GetResourceRequestStatusInput,
    success: GetResourceRequestStatusOutput,
  },
);

export const listResourceRequestsOperation: AwsJsonRpcOperation & {
  readonly input: typeof ListResourceRequestsInput;
  readonly output: typeof ListResourceRequestsOutput;
} = {
  name: "ListResourceRequests",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.ListResourceRequests",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
    items: "ResourceRequestStatusSummaries",
  },
  input: ListResourceRequestsInput,
  output: ListResourceRequestsOutput,
  errors: listResourceRequestsErrors,
};

export const listResourceRequestsEndpoint = HttpApiEndpoint.make("POST")(
  "ListResourceRequests",
  "/",
  {
    payload: ListResourceRequestsInput,
    success: ListResourceRequestsOutput,
  },
);

export const listResourcesOperation: AwsJsonRpcOperation & {
  readonly input: typeof ListResourcesInput;
  readonly output: typeof ListResourcesOutput;
} = {
  name: "ListResources",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.ListResources",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: [],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
    items: "ResourceDescriptions",
  },
  input: ListResourcesInput,
  output: ListResourcesOutput,
  errors: getResourceErrors,
};

export const listResourcesEndpoint = HttpApiEndpoint.make("POST")(
  "ListResources",
  "/",
  {
    payload: ListResourcesInput,
    success: ListResourcesOutput,
  },
);

export const updateResourceOperation: AwsJsonRpcOperation & {
  readonly input: typeof UpdateResourceInput;
  readonly output: typeof UpdateResourceOutput;
} = {
  name: "UpdateResource",
  method: "POST",
  path: "/",
  headers: {
    "x-amz-target": "CloudApiService.UpdateResource",
    "content-type": "application/x-amz-json-1.0",
  },
  idempotencyTokens: ["ClientToken"],
  pagination: {},
  input: UpdateResourceInput,
  output: UpdateResourceOutput,
  errors: createResourceErrors,
};

export const updateResourceEndpoint = HttpApiEndpoint.make("POST")(
  "UpdateResource",
  "/",
  {
    payload: UpdateResourceInput,
    success: UpdateResourceOutput,
  },
);

export const cloudControlOperations = {
  CancelResourceRequest: cancelResourceRequestOperation,
  CreateResource: createResourceOperation,
  DeleteResource: deleteResourceOperation,
  GetResource: getResourceOperation,
  GetResourceRequestStatus: getResourceRequestStatusOperation,
  ListResourceRequests: listResourceRequestsOperation,
  ListResources: listResourcesOperation,
  UpdateResource: updateResourceOperation,
};

export const cloudControlApi = HttpApi.make("CloudControl").add(
  HttpApiGroup.make("cloudcontrol").add(
    cancelResourceRequestEndpoint,
    createResourceEndpoint,
    deleteResourceEndpoint,
    getResourceEndpoint,
    getResourceRequestStatusEndpoint,
    listResourceRequestsEndpoint,
    listResourcesEndpoint,
    updateResourceEndpoint,
  ),
);

export const cloudControlService: AwsServiceDefinition = {
  service: "com.amazonaws.cloudcontrol#CloudApiService",
  version: "2021-09-30",
  protocol: "awsJson1_0",
  signingName: "cloudcontrolapi",
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
                          url: "https://cloudcontrolapi-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                          url: "https://cloudcontrolapi-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                          url: "https://cloudcontrolapi.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                  url: "https://cloudcontrolapi.{Region}.{PartitionResult#dnsSuffix}",
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

/** The makeCloudControlClient Effect gives callers access to CloudControl with the region and credentials configured in their AWS runtime. */
export const makeCloudControlClient = Effect.gen(function* () {
  const aws = yield* AwsClient;

  const bindOperation = aws.bindOperation(cloudControlService);
  const bindOperationPages = aws.bindOperationPages(cloudControlService);

  return {
    /** Cancels the specified resource operation request. For more information, see Canceling resource operation requests in the Amazon Web Services Cloud Control API User Guide. */
    cancelResourceRequest: bindOperation(cancelResourceRequestOperation),
    /** Creates the specified resource. For more information, see Creating a resource in the Amazon Web Services Cloud Control API User Guide. */
    createResource: bindOperation(createResourceOperation),
    /** Deletes the specified resource. For details, see Deleting a resource in the Amazon Web Services Cloud Control API User Guide. */
    deleteResource: bindOperation(deleteResourceOperation),
    /** Returns information about the current state of the specified resource. For details, see Reading a resource's current state. */
    getResource: bindOperation(getResourceOperation),
    /** Returns the current status of a resource operation request. For more information, see Tracking the progress of resource operation requests in the Amazon Web Services Cloud Control API User Guide. */
    getResourceRequestStatus: bindOperation(getResourceRequestStatusOperation),
    /** Returns existing resource operation requests. This includes requests of all status types. For more information, see Listing active resource operation requests in the Amazon Web Services Cloud Control API User Guide. This call returns one page. Use listResourceRequestsPages to read subsequent pages. */
    listResourceRequests: bindOperation(listResourceRequestsOperation),
    /** Returns information about the specified resources. For more information, see Discovering resources in the Amazon Web Services Cloud Control API User Guide. This call returns one page. Use listResourcesPages to read subsequent pages. */
    listResources: bindOperation(listResourcesOperation),
    /** Updates the specified property values in the resource. */
    updateResource: bindOperation(updateResourceOperation),
    /** The listResourceRequestsPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listResourceRequestsPages: bindOperationPages(
      listResourceRequestsOperation,
    ),
    /** The listResourcesPages function streams one AWS response per page. Stop consuming the stream to skip the remaining pages. */
    listResourcesPages: bindOperationPages(listResourcesOperation),
  };
});
