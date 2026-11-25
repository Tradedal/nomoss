// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripebilling_credit_grant } from "./models/billing.js";
import { Stripeerror } from "./models/common.js";

export type GetBillingCreditGrantsInput = {
  readonly customer?: string;
  readonly customer_account?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetBillingCreditGrantsOutput = {
  readonly data: ReadonlyArray<Stripebilling_credit_grant>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetBillingCreditGrantsError = Stripeerror;
export type PostBillingCreditGrantsInput = {
  readonly amount: {
    readonly monetary?: {
      readonly currency: string;
      readonly value: number;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "monetary";
  } & { readonly [x: string]: Schema.Json };
  readonly applicability_config: {
    readonly scope: {
      readonly price_type?: "metered";
      readonly prices?: ReadonlyArray<
        { readonly id: string } & { readonly [x: string]: Schema.Json }
      >;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly category?: "paid" | "promotional";
  readonly customer?: string;
  readonly customer_account?: string;
  readonly effective_at?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly metadata?: { readonly [x: string]: string };
  readonly name?: string;
  readonly priority?: number;
};
export type PostBillingCreditGrantsOutput = Stripebilling_credit_grant;
export type PostBillingCreditGrantsError = Stripeerror;
export type GetBillingCreditGrantsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetBillingCreditGrantsIdOutput = Stripebilling_credit_grant;
export type GetBillingCreditGrantsIdError = Stripeerror;
export type PostBillingCreditGrantsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number | "";
  readonly metadata?: { readonly [x: string]: string };
  readonly id: string;
};
export type PostBillingCreditGrantsIdOutput = Stripebilling_credit_grant;
export type PostBillingCreditGrantsIdError = Stripeerror;
export type PostBillingCreditGrantsIdExpireInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingCreditGrantsIdExpireOutput = Stripebilling_credit_grant;
export type PostBillingCreditGrantsIdExpireError = Stripeerror;
export type PostBillingCreditGrantsIdVoidInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingCreditGrantsIdVoidOutput = Stripebilling_credit_grant;
export type PostBillingCreditGrantsIdVoidError = Stripeerror;

export const GetBillingCreditGrantsInput = Schema.Struct({
  customer: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetBillingCreditGrantsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripebilling_credit_grant),
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
          new globalThis.RegExp("^\\/v1\\/billing\\/credit_grants", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/billing\\/credit_grants",
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
  title: "BillingCreditGrantsResourceCreditGrantList",
  description: "",
});
export const GetBillingCreditGrantsError = Stripeerror;
export const PostBillingCreditGrantsInput = Schema.Struct({
  amount: Schema.StructWithRest(
    Schema.Struct({
      monetary: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            currency: Schema.String.annotate({ format: "currency" }),
            value: Schema.Int,
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "monetary_amount_param" }),
      ),
      type: Schema.Literal("monetary"),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "amount_param",
    description: "Amount of this credit grant.",
  }),
  applicability_config: Schema.StructWithRest(
    Schema.Struct({
      scope: Schema.StructWithRest(
        Schema.Struct({
          price_type: Schema.optionalKey(Schema.Literal("metered")),
          prices: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  id: Schema.String.check(
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
              ).annotate({ title: "applicable_price_param" }),
            ),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "scope_param" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "applicability_config_param",
    description:
      "Configuration specifying what this credit grant applies to. We currently only support `metered` prices that have a [Billing Meter](https://docs.stripe.com/api/billing/meter) attached to them.",
  }),
  category: Schema.optionalKey(
    Schema.Literals(["paid", "promotional"]).annotate({
      description:
        "The category of this credit grant. It defaults to `paid` if not specified.",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description: "ID of the customer receiving the billing credits.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the account representing the customer receiving the billing credits.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  effective_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The time when the billing credits become effective-when they're eligible for use. It defaults to the current timestamp if not specified.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
  expires_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The time when the billing credits expire. If not specified, the billing credits don't expire.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. You can use this to store additional information about the object (for example, cost basis) in a structured format.",
    }),
  ),
  name: Schema.optionalKey(
    Schema.String.annotate({
      description: "A descriptive name shown in the Dashboard.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  ),
  priority: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The desired priority for applying this credit grant. If not specified, it will be set to the default value of 50. The highest priority is 0 and the lowest is 100.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
});
export const PostBillingCreditGrantsOutput = Stripebilling_credit_grant;
export const PostBillingCreditGrantsError = Stripeerror;
export const GetBillingCreditGrantsIdInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetBillingCreditGrantsIdOutput = Stripebilling_credit_grant;
export const GetBillingCreditGrantsIdError = Stripeerror;
export const PostBillingCreditGrantsIdInput = Schema.Struct({
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
  expires_at: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The time when the billing credits created by this credit grant expire. If set to empty, the billing credits never expire.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of key-value pairs you can attach to an object. You can use this to store additional information about the object (for example, cost basis) in a structured format.",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostBillingCreditGrantsIdOutput = Stripebilling_credit_grant;
export const PostBillingCreditGrantsIdError = Stripeerror;
export const PostBillingCreditGrantsIdExpireInput = Schema.Struct({
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostBillingCreditGrantsIdExpireOutput = Stripebilling_credit_grant;
export const PostBillingCreditGrantsIdExpireError = Stripeerror;
export const PostBillingCreditGrantsIdVoidInput = Schema.Struct({
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostBillingCreditGrantsIdVoidOutput = Stripebilling_credit_grant;
export const PostBillingCreditGrantsIdVoidError = Stripeerror;
/**
 * The GetBillingCreditGrantsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingCreditGrantsOperation: StripeOperation & {
  readonly input: typeof GetBillingCreditGrantsInput;
  readonly output: typeof GetBillingCreditGrantsOutput;
  readonly error: typeof GetBillingCreditGrantsError;
} = {
  name: "GetBillingCreditGrants",
  method: "GET",
  path: "/v1/billing/credit_grants",
  pathParameters: [],
  queryParameters: [
    "customer",
    "customer_account",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingCreditGrantsInput,
  output: GetBillingCreditGrantsOutput,
  error: GetBillingCreditGrantsError,
};
/**
 * The PostBillingCreditGrantsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingCreditGrantsOperation: StripeOperation & {
  readonly input: typeof PostBillingCreditGrantsInput;
  readonly output: typeof PostBillingCreditGrantsOutput;
  readonly error: typeof PostBillingCreditGrantsError;
} = {
  name: "PostBillingCreditGrants",
  method: "POST",
  path: "/v1/billing/credit_grants",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingCreditGrantsInput,
  output: PostBillingCreditGrantsOutput,
  error: PostBillingCreditGrantsError,
};
/**
 * The GetBillingCreditGrantsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingCreditGrantsIdOperation: StripeOperation & {
  readonly input: typeof GetBillingCreditGrantsIdInput;
  readonly output: typeof GetBillingCreditGrantsIdOutput;
  readonly error: typeof GetBillingCreditGrantsIdError;
} = {
  name: "GetBillingCreditGrantsId",
  method: "GET",
  path: "/v1/billing/credit_grants/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingCreditGrantsIdInput,
  output: GetBillingCreditGrantsIdOutput,
  error: GetBillingCreditGrantsIdError,
};
/**
 * The PostBillingCreditGrantsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingCreditGrantsIdOperation: StripeOperation & {
  readonly input: typeof PostBillingCreditGrantsIdInput;
  readonly output: typeof PostBillingCreditGrantsIdOutput;
  readonly error: typeof PostBillingCreditGrantsIdError;
} = {
  name: "PostBillingCreditGrantsId",
  method: "POST",
  path: "/v1/billing/credit_grants/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingCreditGrantsIdInput,
  output: PostBillingCreditGrantsIdOutput,
  error: PostBillingCreditGrantsIdError,
};
/**
 * The PostBillingCreditGrantsIdExpireOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingCreditGrantsIdExpireOperation: StripeOperation & {
  readonly input: typeof PostBillingCreditGrantsIdExpireInput;
  readonly output: typeof PostBillingCreditGrantsIdExpireOutput;
  readonly error: typeof PostBillingCreditGrantsIdExpireError;
} = {
  name: "PostBillingCreditGrantsIdExpire",
  method: "POST",
  path: "/v1/billing/credit_grants/{id}/expire",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingCreditGrantsIdExpireInput,
  output: PostBillingCreditGrantsIdExpireOutput,
  error: PostBillingCreditGrantsIdExpireError,
};
/**
 * The PostBillingCreditGrantsIdVoidOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingCreditGrantsIdVoidOperation: StripeOperation & {
  readonly input: typeof PostBillingCreditGrantsIdVoidInput;
  readonly output: typeof PostBillingCreditGrantsIdVoidOutput;
  readonly error: typeof PostBillingCreditGrantsIdVoidError;
} = {
  name: "PostBillingCreditGrantsIdVoid",
  method: "POST",
  path: "/v1/billing/credit_grants/{id}/void",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingCreditGrantsIdVoidInput,
  output: PostBillingCreditGrantsIdVoidOutput,
  error: PostBillingCreditGrantsIdVoidError,
};
/**
 * The makeBillingCreditGrantsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeBillingCreditGrantsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetBillingCreditGrants function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingCreditGrants = Effect.fn(
    "billingCreditGrants.GetBillingCreditGrants",
  )(function* (input: GetBillingCreditGrantsInput) {
    const response: GetBillingCreditGrantsOutput = yield* client.invoke(
      GetBillingCreditGrantsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingCreditGrants function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingCreditGrants = Effect.fn(
    "billingCreditGrants.PostBillingCreditGrants",
  )(function* (input: PostBillingCreditGrantsInput) {
    const response: PostBillingCreditGrantsOutput = yield* client.invoke(
      PostBillingCreditGrantsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetBillingCreditGrantsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingCreditGrantsId = Effect.fn(
    "billingCreditGrants.GetBillingCreditGrantsId",
  )(function* (input: GetBillingCreditGrantsIdInput) {
    const response: GetBillingCreditGrantsIdOutput = yield* client.invoke(
      GetBillingCreditGrantsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingCreditGrantsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingCreditGrantsId = Effect.fn(
    "billingCreditGrants.PostBillingCreditGrantsId",
  )(function* (input: PostBillingCreditGrantsIdInput) {
    const response: PostBillingCreditGrantsIdOutput = yield* client.invoke(
      PostBillingCreditGrantsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingCreditGrantsIdExpire function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingCreditGrantsIdExpire = Effect.fn(
    "billingCreditGrants.PostBillingCreditGrantsIdExpire",
  )(function* (input: PostBillingCreditGrantsIdExpireInput) {
    const response: PostBillingCreditGrantsIdExpireOutput =
      yield* client.invoke(PostBillingCreditGrantsIdExpireOperation, input);
    return response;
  });
  /**
   * The PostBillingCreditGrantsIdVoid function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingCreditGrantsIdVoid = Effect.fn(
    "billingCreditGrants.PostBillingCreditGrantsIdVoid",
  )(function* (input: PostBillingCreditGrantsIdVoidInput) {
    const response: PostBillingCreditGrantsIdVoidOutput = yield* client.invoke(
      PostBillingCreditGrantsIdVoidOperation,
      input,
    );
    return response;
  });
  return {
    GetBillingCreditGrants,
    PostBillingCreditGrants,
    GetBillingCreditGrantsId,
    PostBillingCreditGrantsId,
    PostBillingCreditGrantsIdExpire,
    PostBillingCreditGrantsIdVoid,
  };
});
