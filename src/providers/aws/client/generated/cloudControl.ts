// Generated from the official AWS Cloud Control Smithy model. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.

import * as HttpApi from "effect/http-api/HttpApi";
import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import * as Schema from "effect/Schema";

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
      Schema.String.check(
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
    HookEventTime: Schema.optionalKey(Schema.Finite),
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "HookProgressEvent" });
export type HookProgressEvent = typeof HookProgressEvent.Type;

export const ProgressEvent = Schema.StructWithRest(
  Schema.Struct({
    ErrorCode: Schema.optionalKey(HandlerErrorCode),
    EventTime: Schema.optionalKey(Schema.Finite),
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
    Operation: Schema.optionalKey(Operation),
    OperationStatus: Schema.optionalKey(OperationStatus),
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
    ResourceModel: Schema.optionalKey(
      Schema.String.check(
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
    RetryAfter: Schema.optionalKey(Schema.Finite),
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ProgressEvent" });
export type ProgressEvent = typeof ProgressEvent.Type;

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

export const CreateResourceInput = Schema.StructWithRest(
  Schema.Struct({
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
    DesiredState: Schema.String.check(
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

export const DeleteResourceInput = Schema.StructWithRest(
  Schema.Struct({
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

export const GetResourceInput = Schema.StructWithRest(
  Schema.Struct({
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
    ResourceDescription: Schema.optionalKey(ResourceDescription),
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
    HooksProgressEvent: Schema.optionalKey(Schema.Array(HookProgressEvent)),
    ProgressEvent: Schema.optionalKey(ProgressEvent),
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

export const ListResourceRequestsInput = Schema.StructWithRest(
  Schema.Struct({
    MaxResults: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
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
    ResourceRequestStatusSummaries: Schema.optionalKey(
      Schema.Array(ProgressEvent),
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
    MaxResults: Schema.optionalKey(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ).check(
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
    ResourceModel: Schema.optionalKey(
      Schema.String.check(
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
    ResourceDescriptions: Schema.optionalKey(Schema.Array(ResourceDescription)),
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);
export type ListResourcesOutput = typeof ListResourcesOutput.Type;

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

export const UpdateResourceInput = Schema.StructWithRest(
  Schema.Struct({
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
    PatchDocument: Schema.String.check(
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

export const cloudControlService = {
  service: "com.amazonaws.cloudcontrol#CloudApiService",
  version: "2021-09-30",
  protocol: "awsJson1_0",
  signingName: "cloudcontrolapi",
  endpointRules: {
    version: "1.0",
    parameters: {
      Region: {
        builtIn: "AWS::Region",
        required: false,
        documentation: "The AWS region used to dispatch the request.",
        type: "string",
      },
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
    },
    rules: [
      {
        conditions: [{ fn: "isSet", argv: [{ ref: "Endpoint" }] }],
        rules: [
          {
            conditions: [
              { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
            ],
            error:
              "Invalid Configuration: FIPS and custom endpoint are not supported",
            type: "error",
          },
          {
            conditions: [
              { fn: "booleanEquals", argv: [{ ref: "UseDualStack" }, true] },
            ],
            error:
              "Invalid Configuration: Dualstack and custom endpoint are not supported",
            type: "error",
          },
          {
            conditions: [],
            endpoint: { url: { ref: "Endpoint" }, properties: {}, headers: {} },
            type: "endpoint",
          },
        ],
        type: "tree",
      },
      {
        conditions: [{ fn: "isSet", argv: [{ ref: "Region" }] }],
        rules: [
          {
            conditions: [
              {
                fn: "aws.partition",
                argv: [{ ref: "Region" }],
                assign: "PartitionResult",
              },
            ],
            rules: [
              {
                conditions: [
                  { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                  {
                    fn: "booleanEquals",
                    argv: [{ ref: "UseDualStack" }, true],
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
                            argv: [{ ref: "PartitionResult" }, "supportsFIPS"],
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
                              { ref: "PartitionResult" },
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
                  { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [{ ref: "PartitionResult" }, "supportsFIPS"],
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
                    argv: [{ ref: "UseDualStack" }, true],
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
                              { ref: "PartitionResult" },
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

export const cloudControlErrors = {
  ConcurrentModificationException: {
    ...{
      name: "ConcurrentModificationException",
      fault: "server",
      httpStatus: 500,
      retryable: null,
    },
    schema: ConcurrentModificationException,
  },
  RequestTokenNotFoundException: {
    ...{
      name: "RequestTokenNotFoundException",
      fault: "client",
      httpStatus: 404,
      retryable: null,
    },
    schema: RequestTokenNotFoundException,
  },
  AlreadyExistsException: {
    ...{
      name: "AlreadyExistsException",
      fault: "client",
      httpStatus: 400,
      retryable: null,
    },
    schema: AlreadyExistsException,
  },
  ClientTokenConflictException: {
    ...{
      name: "ClientTokenConflictException",
      fault: "client",
      httpStatus: 409,
      retryable: null,
    },
    schema: ClientTokenConflictException,
  },
  ConcurrentOperationException: {
    ...{
      name: "ConcurrentOperationException",
      fault: "client",
      httpStatus: 409,
      retryable: null,
    },
    schema: ConcurrentOperationException,
  },
  GeneralServiceException: {
    ...{
      name: "GeneralServiceException",
      fault: "client",
      httpStatus: 400,
      retryable: null,
    },
    schema: GeneralServiceException,
  },
  HandlerFailureException: {
    ...{
      name: "HandlerFailureException",
      fault: "server",
      httpStatus: 502,
      retryable: null,
    },
    schema: HandlerFailureException,
  },
  HandlerInternalFailureException: {
    ...{
      name: "HandlerInternalFailureException",
      fault: "server",
      httpStatus: 502,
      retryable: null,
    },
    schema: HandlerInternalFailureException,
  },
  InvalidCredentialsException: {
    ...{
      name: "InvalidCredentialsException",
      fault: "client",
      httpStatus: 401,
      retryable: null,
    },
    schema: InvalidCredentialsException,
  },
  InvalidRequestException: {
    ...{
      name: "InvalidRequestException",
      fault: "client",
      httpStatus: 400,
      retryable: null,
    },
    schema: InvalidRequestException,
  },
  NetworkFailureException: {
    ...{
      name: "NetworkFailureException",
      fault: "server",
      httpStatus: 502,
      retryable: null,
    },
    schema: NetworkFailureException,
  },
  NotStabilizedException: {
    ...{
      name: "NotStabilizedException",
      fault: "client",
      httpStatus: 400,
      retryable: null,
    },
    schema: NotStabilizedException,
  },
  NotUpdatableException: {
    ...{
      name: "NotUpdatableException",
      fault: "client",
      httpStatus: 400,
      retryable: null,
    },
    schema: NotUpdatableException,
  },
  PrivateTypeException: {
    ...{
      name: "PrivateTypeException",
      fault: "client",
      httpStatus: 400,
      retryable: null,
    },
    schema: PrivateTypeException,
  },
  ResourceConflictException: {
    ...{
      name: "ResourceConflictException",
      fault: "client",
      httpStatus: 409,
      retryable: null,
    },
    schema: ResourceConflictException,
  },
  ResourceNotFoundException: {
    ...{
      name: "ResourceNotFoundException",
      fault: "client",
      httpStatus: 404,
      retryable: null,
    },
    schema: ResourceNotFoundException,
  },
  ServiceInternalErrorException: {
    ...{
      name: "ServiceInternalErrorException",
      fault: "server",
      httpStatus: 502,
      retryable: null,
    },
    schema: ServiceInternalErrorException,
  },
  ServiceLimitExceededException: {
    ...{
      name: "ServiceLimitExceededException",
      fault: "client",
      httpStatus: 400,
      retryable: null,
    },
    schema: ServiceLimitExceededException,
  },
  ThrottlingException: {
    ...{
      name: "ThrottlingException",
      fault: "client",
      httpStatus: 429,
      retryable: null,
    },
    schema: ThrottlingException,
  },
  TypeNotFoundException: {
    ...{
      name: "TypeNotFoundException",
      fault: "client",
      httpStatus: 404,
      retryable: null,
    },
    schema: TypeNotFoundException,
  },
  UnsupportedActionException: {
    ...{
      name: "UnsupportedActionException",
      fault: "client",
      httpStatus: 405,
      retryable: null,
    },
    schema: UnsupportedActionException,
  },
};

export const cloudControlOperations = {
  CancelResourceRequest: {
    ...{
      name: "CancelResourceRequest",
      input: "CancelResourceRequestInput",
      output: "CancelResourceRequestOutput",
      target: "CloudApiService.CancelResourceRequest",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.CancelResourceRequest",
      },
      idempotencyTokens: [],
      pagination: {},
      waiters: {},
    },
    input: CancelResourceRequestInput,
    output: CancelResourceRequestOutput,
    errors: [
      cloudControlErrors.ConcurrentModificationException,
      cloudControlErrors.RequestTokenNotFoundException,
    ],
  },
  CreateResource: {
    ...{
      name: "CreateResource",
      input: "CreateResourceInput",
      output: "CreateResourceOutput",
      target: "CloudApiService.CreateResource",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.CreateResource",
      },
      idempotencyTokens: ["ClientToken"],
      pagination: {},
      waiters: {},
    },
    input: CreateResourceInput,
    output: CreateResourceOutput,
    errors: [
      cloudControlErrors.AlreadyExistsException,
      cloudControlErrors.ClientTokenConflictException,
      cloudControlErrors.ConcurrentOperationException,
      cloudControlErrors.GeneralServiceException,
      cloudControlErrors.HandlerFailureException,
      cloudControlErrors.HandlerInternalFailureException,
      cloudControlErrors.InvalidCredentialsException,
      cloudControlErrors.InvalidRequestException,
      cloudControlErrors.NetworkFailureException,
      cloudControlErrors.NotStabilizedException,
      cloudControlErrors.NotUpdatableException,
      cloudControlErrors.PrivateTypeException,
      cloudControlErrors.ResourceConflictException,
      cloudControlErrors.ResourceNotFoundException,
      cloudControlErrors.ServiceInternalErrorException,
      cloudControlErrors.ServiceLimitExceededException,
      cloudControlErrors.ThrottlingException,
      cloudControlErrors.TypeNotFoundException,
      cloudControlErrors.UnsupportedActionException,
    ],
  },
  DeleteResource: {
    ...{
      name: "DeleteResource",
      input: "DeleteResourceInput",
      output: "DeleteResourceOutput",
      target: "CloudApiService.DeleteResource",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.DeleteResource",
      },
      idempotencyTokens: ["ClientToken"],
      pagination: {},
      waiters: {},
    },
    input: DeleteResourceInput,
    output: DeleteResourceOutput,
    errors: [
      cloudControlErrors.AlreadyExistsException,
      cloudControlErrors.ClientTokenConflictException,
      cloudControlErrors.ConcurrentOperationException,
      cloudControlErrors.GeneralServiceException,
      cloudControlErrors.HandlerFailureException,
      cloudControlErrors.HandlerInternalFailureException,
      cloudControlErrors.InvalidCredentialsException,
      cloudControlErrors.InvalidRequestException,
      cloudControlErrors.NetworkFailureException,
      cloudControlErrors.NotStabilizedException,
      cloudControlErrors.NotUpdatableException,
      cloudControlErrors.PrivateTypeException,
      cloudControlErrors.ResourceConflictException,
      cloudControlErrors.ResourceNotFoundException,
      cloudControlErrors.ServiceInternalErrorException,
      cloudControlErrors.ServiceLimitExceededException,
      cloudControlErrors.ThrottlingException,
      cloudControlErrors.TypeNotFoundException,
      cloudControlErrors.UnsupportedActionException,
    ],
  },
  GetResource: {
    ...{
      name: "GetResource",
      input: "GetResourceInput",
      output: "GetResourceOutput",
      target: "CloudApiService.GetResource",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.GetResource",
      },
      idempotencyTokens: [],
      pagination: {},
      waiters: {},
    },
    input: GetResourceInput,
    output: GetResourceOutput,
    errors: [
      cloudControlErrors.AlreadyExistsException,
      cloudControlErrors.GeneralServiceException,
      cloudControlErrors.HandlerFailureException,
      cloudControlErrors.HandlerInternalFailureException,
      cloudControlErrors.InvalidCredentialsException,
      cloudControlErrors.InvalidRequestException,
      cloudControlErrors.NetworkFailureException,
      cloudControlErrors.NotStabilizedException,
      cloudControlErrors.NotUpdatableException,
      cloudControlErrors.PrivateTypeException,
      cloudControlErrors.ResourceConflictException,
      cloudControlErrors.ResourceNotFoundException,
      cloudControlErrors.ServiceInternalErrorException,
      cloudControlErrors.ServiceLimitExceededException,
      cloudControlErrors.ThrottlingException,
      cloudControlErrors.TypeNotFoundException,
      cloudControlErrors.UnsupportedActionException,
    ],
  },
  GetResourceRequestStatus: {
    ...{
      name: "GetResourceRequestStatus",
      input: "GetResourceRequestStatusInput",
      output: "GetResourceRequestStatusOutput",
      target: "CloudApiService.GetResourceRequestStatus",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.GetResourceRequestStatus",
      },
      idempotencyTokens: [],
      pagination: {},
      waiters: {
        ResourceRequestSuccess: {
          documentation: "Wait until resource operation request is successful",
          acceptors: [
            {
              state: "success",
              matcher: {
                output: {
                  path: "ProgressEvent.OperationStatus",
                  expected: "SUCCESS",
                  comparator: "stringEquals",
                },
              },
            },
            {
              state: "failure",
              matcher: {
                output: {
                  path: "ProgressEvent.OperationStatus",
                  expected: "FAILED",
                  comparator: "stringEquals",
                },
              },
            },
            {
              state: "failure",
              matcher: {
                output: {
                  path: "ProgressEvent.OperationStatus",
                  expected: "CANCEL_COMPLETE",
                  comparator: "stringEquals",
                },
              },
            },
          ],
          minDelay: 5,
        },
      },
    },
    input: GetResourceRequestStatusInput,
    output: GetResourceRequestStatusOutput,
    errors: [cloudControlErrors.RequestTokenNotFoundException],
  },
  ListResourceRequests: {
    ...{
      name: "ListResourceRequests",
      input: "ListResourceRequestsInput",
      output: "ListResourceRequestsOutput",
      target: "CloudApiService.ListResourceRequests",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.ListResourceRequests",
      },
      idempotencyTokens: [],
      pagination: {
        inputToken: "NextToken",
        outputToken: "NextToken",
        pageSize: "MaxResults",
        items: "ResourceRequestStatusSummaries",
      },
      waiters: {},
    },
    input: ListResourceRequestsInput,
    output: ListResourceRequestsOutput,
    errors: [],
  },
  ListResources: {
    ...{
      name: "ListResources",
      input: "ListResourcesInput",
      output: "ListResourcesOutput",
      target: "CloudApiService.ListResources",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.ListResources",
      },
      idempotencyTokens: [],
      pagination: {
        inputToken: "NextToken",
        outputToken: "NextToken",
        pageSize: "MaxResults",
        items: "ResourceDescriptions",
      },
      waiters: {},
    },
    input: ListResourcesInput,
    output: ListResourcesOutput,
    errors: [
      cloudControlErrors.AlreadyExistsException,
      cloudControlErrors.GeneralServiceException,
      cloudControlErrors.HandlerFailureException,
      cloudControlErrors.HandlerInternalFailureException,
      cloudControlErrors.InvalidCredentialsException,
      cloudControlErrors.InvalidRequestException,
      cloudControlErrors.NetworkFailureException,
      cloudControlErrors.NotStabilizedException,
      cloudControlErrors.NotUpdatableException,
      cloudControlErrors.PrivateTypeException,
      cloudControlErrors.ResourceConflictException,
      cloudControlErrors.ResourceNotFoundException,
      cloudControlErrors.ServiceInternalErrorException,
      cloudControlErrors.ServiceLimitExceededException,
      cloudControlErrors.ThrottlingException,
      cloudControlErrors.TypeNotFoundException,
      cloudControlErrors.UnsupportedActionException,
    ],
  },
  UpdateResource: {
    ...{
      name: "UpdateResource",
      input: "UpdateResourceInput",
      output: "UpdateResourceOutput",
      target: "CloudApiService.UpdateResource",
      headers: {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": "CloudApiService.UpdateResource",
      },
      idempotencyTokens: ["ClientToken"],
      pagination: {},
      waiters: {},
    },
    input: UpdateResourceInput,
    output: UpdateResourceOutput,
    errors: [
      cloudControlErrors.AlreadyExistsException,
      cloudControlErrors.ClientTokenConflictException,
      cloudControlErrors.ConcurrentOperationException,
      cloudControlErrors.GeneralServiceException,
      cloudControlErrors.HandlerFailureException,
      cloudControlErrors.HandlerInternalFailureException,
      cloudControlErrors.InvalidCredentialsException,
      cloudControlErrors.InvalidRequestException,
      cloudControlErrors.NetworkFailureException,
      cloudControlErrors.NotStabilizedException,
      cloudControlErrors.NotUpdatableException,
      cloudControlErrors.PrivateTypeException,
      cloudControlErrors.ResourceConflictException,
      cloudControlErrors.ResourceNotFoundException,
      cloudControlErrors.ServiceInternalErrorException,
      cloudControlErrors.ServiceLimitExceededException,
      cloudControlErrors.ThrottlingException,
      cloudControlErrors.TypeNotFoundException,
      cloudControlErrors.UnsupportedActionException,
    ],
  },
};

export const cloudControlApi = HttpApi.make("CloudControl").add(
  HttpApiGroup.make("cloudcontrol", { topLevel: true }).add(
    HttpApiEndpoint.make("POST")("CancelResourceRequest", "/", {
      payload: CancelResourceRequestInput,
      success: CancelResourceRequestOutput,
    }),
    HttpApiEndpoint.make("POST")("CreateResource", "/", {
      payload: CreateResourceInput,
      success: CreateResourceOutput,
    }),
    HttpApiEndpoint.make("POST")("DeleteResource", "/", {
      payload: DeleteResourceInput,
      success: DeleteResourceOutput,
    }),
    HttpApiEndpoint.make("POST")("GetResource", "/", {
      payload: GetResourceInput,
      success: GetResourceOutput,
    }),
    HttpApiEndpoint.make("POST")("GetResourceRequestStatus", "/", {
      payload: GetResourceRequestStatusInput,
      success: GetResourceRequestStatusOutput,
    }),
    HttpApiEndpoint.make("POST")("ListResourceRequests", "/", {
      payload: ListResourceRequestsInput,
      success: ListResourceRequestsOutput,
    }),
    HttpApiEndpoint.make("POST")("ListResources", "/", {
      payload: ListResourcesInput,
      success: ListResourcesOutput,
    }),
    HttpApiEndpoint.make("POST")("UpdateResource", "/", {
      payload: UpdateResourceInput,
      success: UpdateResourceOutput,
    }),
  ),
);
