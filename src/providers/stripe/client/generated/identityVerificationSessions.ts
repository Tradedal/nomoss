// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripeerror,
  Stripeidentity_verification_session,
} from "./models/common.js";

export type GetIdentityVerificationSessionsInput = {
  readonly client_reference_id?: string;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly related_customer?: string;
  readonly related_customer_account?: string;
  readonly starting_after?: string;
  readonly status?: "canceled" | "processing" | "requires_input" | "verified";
};
export type GetIdentityVerificationSessionsOutput = {
  readonly data: ReadonlyArray<Stripeidentity_verification_session>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetIdentityVerificationSessionsError = Stripeerror;
export type PostIdentityVerificationSessionsInput = {
  readonly client_reference_id?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly options?: {
    readonly document?:
      | ({
          readonly allowed_types?: ReadonlyArray<
            "driving_license" | "id_card" | "passport"
          >;
          readonly require_id_number?: boolean;
          readonly require_live_capture?: boolean;
          readonly require_matching_selfie?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly provided_details?: {
    readonly email?: string;
    readonly phone?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly related_customer?: string;
  readonly related_customer_account?: string;
  readonly related_person?: {
    readonly account: string;
    readonly person: string;
  } & { readonly [x: string]: Schema.Json };
  readonly return_url?: string;
  readonly type?: "document" | "id_number";
  readonly verification_flow?: string;
};
export type PostIdentityVerificationSessionsOutput =
  Stripeidentity_verification_session;
export type PostIdentityVerificationSessionsError = Stripeerror;
export type GetIdentityVerificationSessionsSessionInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly session: string;
};
export type GetIdentityVerificationSessionsSessionOutput =
  Stripeidentity_verification_session;
export type GetIdentityVerificationSessionsSessionError = Stripeerror;
export type PostIdentityVerificationSessionsSessionInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly options?: {
    readonly document?:
      | ({
          readonly allowed_types?: ReadonlyArray<
            "driving_license" | "id_card" | "passport"
          >;
          readonly require_id_number?: boolean;
          readonly require_live_capture?: boolean;
          readonly require_matching_selfie?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly provided_details?: {
    readonly email?: string;
    readonly phone?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly type?: "document" | "id_number";
  readonly session: string;
};
export type PostIdentityVerificationSessionsSessionOutput =
  Stripeidentity_verification_session;
export type PostIdentityVerificationSessionsSessionError = Stripeerror;
export type PostIdentityVerificationSessionsSessionCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly session: string;
};
export type PostIdentityVerificationSessionsSessionCancelOutput =
  Stripeidentity_verification_session;
export type PostIdentityVerificationSessionsSessionCancelError = Stripeerror;
export type PostIdentityVerificationSessionsSessionRedactInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly session: string;
};
export type PostIdentityVerificationSessionsSessionRedactOutput =
  Stripeidentity_verification_session;
export type PostIdentityVerificationSessionsSessionRedactError = Stripeerror;

export const GetIdentityVerificationSessionsInput = Schema.Struct({
  client_reference_id: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          gt: Schema.optionalKey(Schema.Int),
          gte: Schema.optionalKey(Schema.Int),
          lt: Schema.optionalKey(Schema.Int),
          lte: Schema.optionalKey(Schema.Int),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "range_query_specs" }),
      Schema.Int,
    ]),
  ),
  ending_before: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  limit: Schema.optionalKey(Schema.Int),
  related_customer: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  related_customer_account: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(["canceled", "processing", "requires_input", "verified"]),
  ),
});
export const GetIdentityVerificationSessionsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeidentity_verification_session),
    has_more: Schema.Boolean.annotate({
      description:
        "True if this list has another page of items after this one that can be fetched.",
    }),
    object: Schema.Literal("list").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
    }),
    url: Schema.String.annotate({
      description: "The URL where this list can be accessed.",
    })
      .check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^\\/v1\\/identity\\/verification_sessions",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/identity\\/verification_sessions",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "GelatoVerificationSessionList", description: "" });
export const GetIdentityVerificationSessionsError = Stripeerror;
export const PostIdentityVerificationSessionsInput = Schema.Struct({
  client_reference_id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        document: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                allowed_types: Schema.optionalKey(
                  Schema.Array(
                    Schema.Literals(["driving_license", "id_card", "passport"]),
                  ),
                ),
                require_id_number: Schema.optionalKey(Schema.Boolean),
                require_live_capture: Schema.optionalKey(Schema.Boolean),
                require_matching_selfie: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "document_options" }),
            Schema.Literal(""),
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "session_options_param",
      description: "A set of options for the session’s verification checks.",
    }),
  ),
  provided_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        email: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(800).annotate({
              expected: "a string with at most 800 code points",
            }),
          ),
        ),
        phone: Schema.optionalKey(Schema.String),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "provided_details_param",
      description:
        "Details provided about the user being verified. These details might be shown to the user.",
    }),
  ),
  related_customer: Schema.optionalKey(
    Schema.String.annotate({ description: "Customer ID" }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  related_customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of the Account representing a customer.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  related_person: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        person: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "related_person_param",
      description:
        "Tokens referencing a Person resource and its associated account.",
    }),
  ),
  return_url: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The URL that the user will be redirected to upon completing the verification flow.",
    }),
  ),
  type: Schema.optionalKey(
    Schema.Literals(["document", "id_number"]).annotate({
      description:
        "The type of [verification check](https://docs.stripe.com/identity/verification-checks) to be performed. You must provide a `type` if not passing `verification_flow`.",
    }),
  ),
  verification_flow: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of a verification flow from the Dashboard. See https://docs.stripe.com/identity/verification-flows.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const PostIdentityVerificationSessionsOutput =
  Stripeidentity_verification_session;
export const PostIdentityVerificationSessionsError = Stripeerror;
export const GetIdentityVerificationSessionsSessionInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  session: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetIdentityVerificationSessionsSessionOutput =
  Stripeidentity_verification_session;
export const GetIdentityVerificationSessionsSessionError = Stripeerror;
export const PostIdentityVerificationSessionsSessionInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        document: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                allowed_types: Schema.optionalKey(
                  Schema.Array(
                    Schema.Literals(["driving_license", "id_card", "passport"]),
                  ),
                ),
                require_id_number: Schema.optionalKey(Schema.Boolean),
                require_live_capture: Schema.optionalKey(Schema.Boolean),
                require_matching_selfie: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "document_options" }),
            Schema.Literal(""),
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "session_options_param",
      description: "A set of options for the session’s verification checks.",
    }),
  ),
  provided_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        email: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(800).annotate({
              expected: "a string with at most 800 code points",
            }),
          ),
        ),
        phone: Schema.optionalKey(Schema.String),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "provided_details_param",
      description:
        "Details provided about the user being verified. These details may be shown to the user.",
    }),
  ),
  type: Schema.optionalKey(
    Schema.Literals(["document", "id_number"]).annotate({
      description:
        "The type of [verification check](https://docs.stripe.com/identity/verification-checks) to be performed.",
    }),
  ),
  session: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostIdentityVerificationSessionsSessionOutput =
  Stripeidentity_verification_session;
export const PostIdentityVerificationSessionsSessionError = Stripeerror;
export const PostIdentityVerificationSessionsSessionCancelInput = Schema.Struct(
  {
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "Specifies which fields in the response should be expanded.",
      }),
    ),
    session: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  },
);
export const PostIdentityVerificationSessionsSessionCancelOutput =
  Stripeidentity_verification_session;
export const PostIdentityVerificationSessionsSessionCancelError = Stripeerror;
export const PostIdentityVerificationSessionsSessionRedactInput = Schema.Struct(
  {
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "Specifies which fields in the response should be expanded.",
      }),
    ),
    session: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  },
);
export const PostIdentityVerificationSessionsSessionRedactOutput =
  Stripeidentity_verification_session;
export const PostIdentityVerificationSessionsSessionRedactError = Stripeerror;
/**
 * The GetIdentityVerificationSessionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetIdentityVerificationSessionsOperation: StripeOperation & {
  readonly input: typeof GetIdentityVerificationSessionsInput;
  readonly output: typeof GetIdentityVerificationSessionsOutput;
  readonly error: typeof GetIdentityVerificationSessionsError;
} = {
  name: "GetIdentityVerificationSessions",
  method: "GET",
  path: "/v1/identity/verification_sessions",
  pathParameters: [],
  queryParameters: [
    "client_reference_id",
    "created",
    "ending_before",
    "expand",
    "limit",
    "related_customer",
    "related_customer_account",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetIdentityVerificationSessionsInput,
  output: GetIdentityVerificationSessionsOutput,
  error: GetIdentityVerificationSessionsError,
};
/**
 * The PostIdentityVerificationSessionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIdentityVerificationSessionsOperation: StripeOperation & {
  readonly input: typeof PostIdentityVerificationSessionsInput;
  readonly output: typeof PostIdentityVerificationSessionsOutput;
  readonly error: typeof PostIdentityVerificationSessionsError;
} = {
  name: "PostIdentityVerificationSessions",
  method: "POST",
  path: "/v1/identity/verification_sessions",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIdentityVerificationSessionsInput,
  output: PostIdentityVerificationSessionsOutput,
  error: PostIdentityVerificationSessionsError,
};
/**
 * The GetIdentityVerificationSessionsSessionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetIdentityVerificationSessionsSessionOperation: StripeOperation & {
  readonly input: typeof GetIdentityVerificationSessionsSessionInput;
  readonly output: typeof GetIdentityVerificationSessionsSessionOutput;
  readonly error: typeof GetIdentityVerificationSessionsSessionError;
} = {
  name: "GetIdentityVerificationSessionsSession",
  method: "GET",
  path: "/v1/identity/verification_sessions/{session}",
  pathParameters: ["session"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetIdentityVerificationSessionsSessionInput,
  output: GetIdentityVerificationSessionsSessionOutput,
  error: GetIdentityVerificationSessionsSessionError,
};
/**
 * The PostIdentityVerificationSessionsSessionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIdentityVerificationSessionsSessionOperation: StripeOperation & {
  readonly input: typeof PostIdentityVerificationSessionsSessionInput;
  readonly output: typeof PostIdentityVerificationSessionsSessionOutput;
  readonly error: typeof PostIdentityVerificationSessionsSessionError;
} = {
  name: "PostIdentityVerificationSessionsSession",
  method: "POST",
  path: "/v1/identity/verification_sessions/{session}",
  pathParameters: ["session"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIdentityVerificationSessionsSessionInput,
  output: PostIdentityVerificationSessionsSessionOutput,
  error: PostIdentityVerificationSessionsSessionError,
};
/**
 * The PostIdentityVerificationSessionsSessionCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIdentityVerificationSessionsSessionCancelOperation: StripeOperation & {
  readonly input: typeof PostIdentityVerificationSessionsSessionCancelInput;
  readonly output: typeof PostIdentityVerificationSessionsSessionCancelOutput;
  readonly error: typeof PostIdentityVerificationSessionsSessionCancelError;
} = {
  name: "PostIdentityVerificationSessionsSessionCancel",
  method: "POST",
  path: "/v1/identity/verification_sessions/{session}/cancel",
  pathParameters: ["session"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIdentityVerificationSessionsSessionCancelInput,
  output: PostIdentityVerificationSessionsSessionCancelOutput,
  error: PostIdentityVerificationSessionsSessionCancelError,
};
/**
 * The PostIdentityVerificationSessionsSessionRedactOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIdentityVerificationSessionsSessionRedactOperation: StripeOperation & {
  readonly input: typeof PostIdentityVerificationSessionsSessionRedactInput;
  readonly output: typeof PostIdentityVerificationSessionsSessionRedactOutput;
  readonly error: typeof PostIdentityVerificationSessionsSessionRedactError;
} = {
  name: "PostIdentityVerificationSessionsSessionRedact",
  method: "POST",
  path: "/v1/identity/verification_sessions/{session}/redact",
  pathParameters: ["session"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIdentityVerificationSessionsSessionRedactInput,
  output: PostIdentityVerificationSessionsSessionRedactOutput,
  error: PostIdentityVerificationSessionsSessionRedactError,
};
/**
 * The makeIdentityVerificationSessionsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeIdentityVerificationSessionsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetIdentityVerificationSessions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetIdentityVerificationSessions = Effect.fn(
    "identityVerificationSessions.GetIdentityVerificationSessions",
  )(function* (input: GetIdentityVerificationSessionsInput) {
    const response: GetIdentityVerificationSessionsOutput =
      yield* client.invoke(GetIdentityVerificationSessionsOperation, input);
    return response;
  });
  /**
   * The PostIdentityVerificationSessions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIdentityVerificationSessions = Effect.fn(
    "identityVerificationSessions.PostIdentityVerificationSessions",
  )(function* (input: PostIdentityVerificationSessionsInput) {
    const response: PostIdentityVerificationSessionsOutput =
      yield* client.invoke(PostIdentityVerificationSessionsOperation, input);
    return response;
  });
  /**
   * The GetIdentityVerificationSessionsSession function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetIdentityVerificationSessionsSession = Effect.fn(
    "identityVerificationSessions.GetIdentityVerificationSessionsSession",
  )(function* (input: GetIdentityVerificationSessionsSessionInput) {
    const response: GetIdentityVerificationSessionsSessionOutput =
      yield* client.invoke(
        GetIdentityVerificationSessionsSessionOperation,
        input,
      );
    return response;
  });
  /**
   * The PostIdentityVerificationSessionsSession function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIdentityVerificationSessionsSession = Effect.fn(
    "identityVerificationSessions.PostIdentityVerificationSessionsSession",
  )(function* (input: PostIdentityVerificationSessionsSessionInput) {
    const response: PostIdentityVerificationSessionsSessionOutput =
      yield* client.invoke(
        PostIdentityVerificationSessionsSessionOperation,
        input,
      );
    return response;
  });
  /**
   * The PostIdentityVerificationSessionsSessionCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIdentityVerificationSessionsSessionCancel = Effect.fn(
    "identityVerificationSessions.PostIdentityVerificationSessionsSessionCancel",
  )(function* (input: PostIdentityVerificationSessionsSessionCancelInput) {
    const response: PostIdentityVerificationSessionsSessionCancelOutput =
      yield* client.invoke(
        PostIdentityVerificationSessionsSessionCancelOperation,
        input,
      );
    return response;
  });
  /**
   * The PostIdentityVerificationSessionsSessionRedact function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIdentityVerificationSessionsSessionRedact = Effect.fn(
    "identityVerificationSessions.PostIdentityVerificationSessionsSessionRedact",
  )(function* (input: PostIdentityVerificationSessionsSessionRedactInput) {
    const response: PostIdentityVerificationSessionsSessionRedactOutput =
      yield* client.invoke(
        PostIdentityVerificationSessionsSessionRedactOperation,
        input,
      );
    return response;
  });
  return {
    GetIdentityVerificationSessions,
    PostIdentityVerificationSessions,
    GetIdentityVerificationSessionsSession,
    PostIdentityVerificationSessionsSession,
    PostIdentityVerificationSessionsSessionCancel,
    PostIdentityVerificationSessionsSessionRedact,
  };
});
