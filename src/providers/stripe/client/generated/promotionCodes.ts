// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripepromotion_code } from "./models/common.js";

export type GetPromotionCodesInput = {
  readonly active?: boolean;
  readonly code?: string;
  readonly coupon?: string;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetPromotionCodesOutput = {
  readonly data: ReadonlyArray<Stripepromotion_code>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPromotionCodesError = Stripeerror;
export type PostPromotionCodesInput = {
  readonly active?: boolean;
  readonly code?: string;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly max_redemptions?: number;
  readonly metadata?: { readonly [x: string]: string };
  readonly promotion: { readonly coupon?: string; readonly type: "coupon" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly restrictions?: {
    readonly currency_options?: {
      readonly [x: string]: { readonly minimum_amount?: number } & {
        readonly [x: string]: Schema.Json;
      };
    };
    readonly first_time_transaction?: boolean;
    readonly minimum_amount?: number;
    readonly minimum_amount_currency?: string;
  } & { readonly [x: string]: Schema.Json };
};
export type PostPromotionCodesOutput = Stripepromotion_code;
export type PostPromotionCodesError = Stripeerror;
export type GetPromotionCodesPromotionCodeInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly promotion_code: string;
};
export type GetPromotionCodesPromotionCodeOutput = Stripepromotion_code;
export type GetPromotionCodesPromotionCodeError = Stripeerror;
export type PostPromotionCodesPromotionCodeInput = {
  readonly active?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly restrictions?: {
    readonly currency_options?: {
      readonly [x: string]: { readonly minimum_amount?: number } & {
        readonly [x: string]: Schema.Json;
      };
    };
  } & { readonly [x: string]: Schema.Json };
  readonly promotion_code: string;
};
export type PostPromotionCodesPromotionCodeOutput = Stripepromotion_code;
export type PostPromotionCodesPromotionCodeError = Stripeerror;

export const GetPromotionCodesInput = Schema.Struct({
  active: Schema.optionalKey(Schema.Boolean),
  code: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  coupon: Schema.optionalKey(
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
export const GetPromotionCodesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripepromotion_code),
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
          new globalThis.RegExp("^\\/v1\\/promotion_codes", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/promotion_codes",
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
  title: "PromotionCodesResourcePromotionCodeList",
  description: "",
});
export const GetPromotionCodesError = Stripeerror;
export const PostPromotionCodesInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Whether the promotion code is currently active.",
    }),
  ),
  code: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The customer-facing code. Regardless of case, this code must be unique across all active promotion codes for a specific customer. Valid characters are lower case letters (a-z), upper case letters (A-Z), digits (0-9), and dashes (-).\n\nIf left blank, we will generate one automatically.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The customer who can use this promotion code. If not set, all customers can use the promotion code.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The account representing the customer who can use this promotion code. If not set, all customers can use the promotion code.",
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
  expires_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The timestamp at which this promotion code will expire. If the coupon has specified a `redeems_by`, then this value cannot be after the coupon's `redeems_by`.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  max_redemptions: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer specifying the number of times the promotion code can be redeemed. If the coupon has specified a `max_redemptions`, then this value cannot be greater than the coupon's `max_redemptions`.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  promotion: Schema.StructWithRest(
    Schema.Struct({
      coupon: Schema.optionalKey(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      type: Schema.Literal("coupon"),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "promotion",
    description: "The promotion referenced by this promotion code.",
  }),
  restrictions: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        currency_options: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.StructWithRest(
              Schema.Struct({ minimum_amount: Schema.optionalKey(Schema.Int) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_option" }),
          ),
        ),
        first_time_transaction: Schema.optionalKey(Schema.Boolean),
        minimum_amount: Schema.optionalKey(Schema.Int),
        minimum_amount_currency: Schema.optionalKey(
          Schema.String.annotate({ format: "currency" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "restrictions_params",
      description:
        "Settings that restrict the redemption of the promotion code.",
    }),
  ),
});
export const PostPromotionCodesOutput = Stripepromotion_code;
export const PostPromotionCodesError = Stripeerror;
export const GetPromotionCodesPromotionCodeInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  promotion_code: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPromotionCodesPromotionCodeOutput = Stripepromotion_code;
export const GetPromotionCodesPromotionCodeError = Stripeerror;
export const PostPromotionCodesPromotionCodeInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the promotion code is currently active. A promotion code can only be reactivated when the coupon is still valid and the promotion code is otherwise redeemable.",
    }),
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
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  restrictions: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        currency_options: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.StructWithRest(
              Schema.Struct({ minimum_amount: Schema.optionalKey(Schema.Int) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_option" }),
          ),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "restrictions_params",
      description:
        "Settings that restrict the redemption of the promotion code.",
    }),
  ),
  promotion_code: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPromotionCodesPromotionCodeOutput = Stripepromotion_code;
export const PostPromotionCodesPromotionCodeError = Stripeerror;
/**
 * The GetPromotionCodesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPromotionCodesOperation: StripeOperation & {
  readonly input: typeof GetPromotionCodesInput;
  readonly output: typeof GetPromotionCodesOutput;
  readonly error: typeof GetPromotionCodesError;
} = {
  name: "GetPromotionCodes",
  method: "GET",
  path: "/v1/promotion_codes",
  pathParameters: [],
  queryParameters: [
    "active",
    "code",
    "coupon",
    "created",
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
  input: GetPromotionCodesInput,
  output: GetPromotionCodesOutput,
  error: GetPromotionCodesError,
};
/**
 * The PostPromotionCodesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPromotionCodesOperation: StripeOperation & {
  readonly input: typeof PostPromotionCodesInput;
  readonly output: typeof PostPromotionCodesOutput;
  readonly error: typeof PostPromotionCodesError;
} = {
  name: "PostPromotionCodes",
  method: "POST",
  path: "/v1/promotion_codes",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPromotionCodesInput,
  output: PostPromotionCodesOutput,
  error: PostPromotionCodesError,
};
/**
 * The GetPromotionCodesPromotionCodeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPromotionCodesPromotionCodeOperation: StripeOperation & {
  readonly input: typeof GetPromotionCodesPromotionCodeInput;
  readonly output: typeof GetPromotionCodesPromotionCodeOutput;
  readonly error: typeof GetPromotionCodesPromotionCodeError;
} = {
  name: "GetPromotionCodesPromotionCode",
  method: "GET",
  path: "/v1/promotion_codes/{promotion_code}",
  pathParameters: ["promotion_code"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPromotionCodesPromotionCodeInput,
  output: GetPromotionCodesPromotionCodeOutput,
  error: GetPromotionCodesPromotionCodeError,
};
/**
 * The PostPromotionCodesPromotionCodeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPromotionCodesPromotionCodeOperation: StripeOperation & {
  readonly input: typeof PostPromotionCodesPromotionCodeInput;
  readonly output: typeof PostPromotionCodesPromotionCodeOutput;
  readonly error: typeof PostPromotionCodesPromotionCodeError;
} = {
  name: "PostPromotionCodesPromotionCode",
  method: "POST",
  path: "/v1/promotion_codes/{promotion_code}",
  pathParameters: ["promotion_code"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPromotionCodesPromotionCodeInput,
  output: PostPromotionCodesPromotionCodeOutput,
  error: PostPromotionCodesPromotionCodeError,
};
/**
 * The makePromotionCodesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makePromotionCodesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetPromotionCodes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPromotionCodes = Effect.fn("promotionCodes.GetPromotionCodes")(
    function* (input: GetPromotionCodesInput) {
      const response: GetPromotionCodesOutput = yield* client.invoke(
        GetPromotionCodesOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostPromotionCodes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPromotionCodes = Effect.fn("promotionCodes.PostPromotionCodes")(
    function* (input: PostPromotionCodesInput) {
      const response: PostPromotionCodesOutput = yield* client.invoke(
        PostPromotionCodesOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetPromotionCodesPromotionCode function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPromotionCodesPromotionCode = Effect.fn(
    "promotionCodes.GetPromotionCodesPromotionCode",
  )(function* (input: GetPromotionCodesPromotionCodeInput) {
    const response: GetPromotionCodesPromotionCodeOutput = yield* client.invoke(
      GetPromotionCodesPromotionCodeOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPromotionCodesPromotionCode function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPromotionCodesPromotionCode = Effect.fn(
    "promotionCodes.PostPromotionCodesPromotionCode",
  )(function* (input: PostPromotionCodesPromotionCodeInput) {
    const response: PostPromotionCodesPromotionCodeOutput =
      yield* client.invoke(PostPromotionCodesPromotionCodeOperation, input);
    return response;
  });
  return {
    GetPromotionCodes,
    PostPromotionCodes,
    GetPromotionCodesPromotionCode,
    PostPromotionCodesPromotionCode,
  };
});
