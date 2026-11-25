// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripeshipping_rate } from "./models/common.js";

export type GetShippingRatesInput = {
  readonly active?: boolean;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly currency?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetShippingRatesOutput = {
  readonly data: ReadonlyArray<Stripeshipping_rate>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetShippingRatesError = Stripeerror;
export type PostShippingRatesInput = {
  readonly delivery_estimate?: {
    readonly maximum?: {
      readonly unit: "business_day" | "day" | "hour" | "month" | "week";
      readonly value: number;
    } & { readonly [x: string]: Schema.Json };
    readonly minimum?: {
      readonly unit: "business_day" | "day" | "hour" | "month" | "week";
      readonly value: number;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly display_name: string;
  readonly expand?: ReadonlyArray<string>;
  readonly fixed_amount?: {
    readonly amount: number;
    readonly currency: string;
    readonly currency_options?: {
      readonly [x: string]: {
        readonly amount: number;
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
      } & { readonly [x: string]: Schema.Json };
    };
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
  readonly tax_code?: string;
  readonly type?: "fixed_amount";
};
export type PostShippingRatesOutput = Stripeshipping_rate;
export type PostShippingRatesError = Stripeerror;
export type GetShippingRatesShippingRateTokenInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly shipping_rate_token: string;
};
export type GetShippingRatesShippingRateTokenOutput = Stripeshipping_rate;
export type GetShippingRatesShippingRateTokenError = Stripeerror;
export type PostShippingRatesShippingRateTokenInput = {
  readonly active?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly fixed_amount?: {
    readonly currency_options?: {
      readonly [x: string]: {
        readonly amount?: number;
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
      } & { readonly [x: string]: Schema.Json };
    };
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
  readonly shipping_rate_token: string;
};
export type PostShippingRatesShippingRateTokenOutput = Stripeshipping_rate;
export type PostShippingRatesShippingRateTokenError = Stripeerror;

export const GetShippingRatesInput = Schema.Struct({
  active: Schema.optionalKey(Schema.Boolean),
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
  currency: Schema.optionalKey(Schema.String.annotate({ format: "currency" })),
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
export const GetShippingRatesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeshipping_rate),
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
          new globalThis.RegExp("^\\/v1\\/shipping_rates", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/shipping_rates",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "ShippingResourcesShippingRateList", description: "" });
export const GetShippingRatesError = Stripeerror;
export const PostShippingRatesInput = Schema.Struct({
  delivery_estimate: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        maximum: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              unit: Schema.Literals([
                "business_day",
                "day",
                "hour",
                "month",
                "week",
              ]),
              value: Schema.Int,
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "delivery_estimate_bound" }),
        ),
        minimum: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              unit: Schema.Literals([
                "business_day",
                "day",
                "hour",
                "month",
                "week",
              ]),
              value: Schema.Int,
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "delivery_estimate_bound" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "delivery_estimate",
      description:
        "The estimated range for how long shipping will take, meant to be displayable to the customer. This will appear on CheckoutSessions.",
    }),
  ),
  display_name: Schema.String.annotate({
    description:
      "The name of the shipping rate, meant to be displayable to the customer. This will appear on CheckoutSessions.",
  }).check(
    Schema.isMaxCodePoints(100).annotate({
      expected: "a string with at most 100 code points",
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
  fixed_amount: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Int,
        currency: Schema.String.annotate({ format: "currency" }),
        currency_options: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.StructWithRest(
              Schema.Struct({
                amount: Schema.Int,
                tax_behavior: Schema.optionalKey(
                  Schema.Literals(["exclusive", "inclusive", "unspecified"]),
                ),
              }),
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
      title: "fixed_amount",
      description:
        "Describes a fixed amount to charge for shipping. Must be present if type is `fixed_amount`.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  tax_behavior: Schema.optionalKey(
    Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate({
      description:
        "Specifies whether the rate is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`.",
    }),
  ),
  tax_code: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A [tax code](https://docs.stripe.com/tax/tax-categories) ID. The Shipping tax code is `txcd_92010001`.",
    }),
  ),
  type: Schema.optionalKey(
    Schema.Literal("fixed_amount").annotate({
      description: "The type of calculation to use on the shipping rate.",
    }),
  ),
});
export const PostShippingRatesOutput = Stripeshipping_rate;
export const PostShippingRatesError = Stripeerror;
export const GetShippingRatesShippingRateTokenInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  shipping_rate_token: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetShippingRatesShippingRateTokenOutput = Stripeshipping_rate;
export const GetShippingRatesShippingRateTokenError = Stripeerror;
export const PostShippingRatesShippingRateTokenInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the shipping rate can be used for new purchases. Defaults to `true`.",
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
  fixed_amount: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        currency_options: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.StructWithRest(
              Schema.Struct({
                amount: Schema.optionalKey(Schema.Int),
                tax_behavior: Schema.optionalKey(
                  Schema.Literals(["exclusive", "inclusive", "unspecified"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_option_update" }),
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
      title: "fixed_amount_update",
      description:
        "Describes a fixed amount to charge for shipping. Must be present if type is `fixed_amount`.",
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
  tax_behavior: Schema.optionalKey(
    Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate({
      description:
        "Specifies whether the rate is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`.",
    }),
  ),
  shipping_rate_token: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostShippingRatesShippingRateTokenOutput = Stripeshipping_rate;
export const PostShippingRatesShippingRateTokenError = Stripeerror;
/**
 * The GetShippingRatesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetShippingRatesOperation: StripeOperation & {
  readonly input: typeof GetShippingRatesInput;
  readonly output: typeof GetShippingRatesOutput;
  readonly error: typeof GetShippingRatesError;
} = {
  name: "GetShippingRates",
  method: "GET",
  path: "/v1/shipping_rates",
  pathParameters: [],
  queryParameters: [
    "active",
    "created",
    "currency",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetShippingRatesInput,
  output: GetShippingRatesOutput,
  error: GetShippingRatesError,
};
/**
 * The PostShippingRatesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostShippingRatesOperation: StripeOperation & {
  readonly input: typeof PostShippingRatesInput;
  readonly output: typeof PostShippingRatesOutput;
  readonly error: typeof PostShippingRatesError;
} = {
  name: "PostShippingRates",
  method: "POST",
  path: "/v1/shipping_rates",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostShippingRatesInput,
  output: PostShippingRatesOutput,
  error: PostShippingRatesError,
};
/**
 * The GetShippingRatesShippingRateTokenOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetShippingRatesShippingRateTokenOperation: StripeOperation & {
  readonly input: typeof GetShippingRatesShippingRateTokenInput;
  readonly output: typeof GetShippingRatesShippingRateTokenOutput;
  readonly error: typeof GetShippingRatesShippingRateTokenError;
} = {
  name: "GetShippingRatesShippingRateToken",
  method: "GET",
  path: "/v1/shipping_rates/{shipping_rate_token}",
  pathParameters: ["shipping_rate_token"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetShippingRatesShippingRateTokenInput,
  output: GetShippingRatesShippingRateTokenOutput,
  error: GetShippingRatesShippingRateTokenError,
};
/**
 * The PostShippingRatesShippingRateTokenOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostShippingRatesShippingRateTokenOperation: StripeOperation & {
  readonly input: typeof PostShippingRatesShippingRateTokenInput;
  readonly output: typeof PostShippingRatesShippingRateTokenOutput;
  readonly error: typeof PostShippingRatesShippingRateTokenError;
} = {
  name: "PostShippingRatesShippingRateToken",
  method: "POST",
  path: "/v1/shipping_rates/{shipping_rate_token}",
  pathParameters: ["shipping_rate_token"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostShippingRatesShippingRateTokenInput,
  output: PostShippingRatesShippingRateTokenOutput,
  error: PostShippingRatesShippingRateTokenError,
};
/**
 * The makeShippingRatesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeShippingRatesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetShippingRates function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetShippingRates = Effect.fn("shippingRates.GetShippingRates")(
    function* (input: GetShippingRatesInput) {
      const response: GetShippingRatesOutput = yield* client.invoke(
        GetShippingRatesOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostShippingRates function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostShippingRates = Effect.fn("shippingRates.PostShippingRates")(
    function* (input: PostShippingRatesInput) {
      const response: PostShippingRatesOutput = yield* client.invoke(
        PostShippingRatesOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetShippingRatesShippingRateToken function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetShippingRatesShippingRateToken = Effect.fn(
    "shippingRates.GetShippingRatesShippingRateToken",
  )(function* (input: GetShippingRatesShippingRateTokenInput) {
    const response: GetShippingRatesShippingRateTokenOutput =
      yield* client.invoke(GetShippingRatesShippingRateTokenOperation, input);
    return response;
  });
  /**
   * The PostShippingRatesShippingRateToken function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostShippingRatesShippingRateToken = Effect.fn(
    "shippingRates.PostShippingRatesShippingRateToken",
  )(function* (input: PostShippingRatesShippingRateTokenInput) {
    const response: PostShippingRatesShippingRateTokenOutput =
      yield* client.invoke(PostShippingRatesShippingRateTokenOperation, input);
    return response;
  });
  return {
    GetShippingRates,
    PostShippingRates,
    GetShippingRatesShippingRateToken,
    PostShippingRatesShippingRateToken,
  };
});
