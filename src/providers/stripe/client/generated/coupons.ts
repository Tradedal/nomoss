// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripecoupon,
  Stripedeleted_coupon,
  Stripeerror,
} from "./models/common.js";

export type GetCouponsInput = {
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
  readonly starting_after?: string;
};
export type GetCouponsOutput = {
  readonly data: ReadonlyArray<Stripecoupon>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCouponsError = Stripeerror;
export type PostCouponsInput = {
  readonly amount_off?: number;
  readonly applies_to?: { readonly products?: ReadonlyArray<string> } & {
    readonly [x: string]: Schema.Json;
  };
  readonly currency?: string;
  readonly currency_options?: {
    readonly [x: string]: { readonly amount_off: number } & {
      readonly [x: string]: Schema.Json;
    };
  };
  readonly duration?: "forever" | "once" | "repeating";
  readonly duration_in_months?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly id?: string;
  readonly max_redemptions?: number;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly percent_off?: number;
  readonly redeem_by?: number;
};
export type PostCouponsOutput = Stripecoupon;
export type PostCouponsError = Stripeerror;
export type GetCouponsCouponInput = {
  readonly coupon: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetCouponsCouponOutput = Stripecoupon;
export type GetCouponsCouponError = Stripeerror;
export type PostCouponsCouponInput = {
  readonly currency_options?: {
    readonly [x: string]: { readonly amount_off: number } & {
      readonly [x: string]: Schema.Json;
    };
  };
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly coupon: string;
};
export type PostCouponsCouponOutput = Stripecoupon;
export type PostCouponsCouponError = Stripeerror;
export type DeleteCouponsCouponInput = { readonly coupon: string };
export type DeleteCouponsCouponOutput = Stripedeleted_coupon;
export type DeleteCouponsCouponError = Stripeerror;

export const GetCouponsInput = Schema.Struct({
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetCouponsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecoupon),
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
          new globalThis.RegExp("^\\/v1\\/coupons", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/coupons",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "CouponsResourceCouponList", description: "" });
export const GetCouponsError = Stripeerror;
export const PostCouponsInput = Schema.Struct({
  amount_off: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer representing the amount to subtract from an invoice total (required if `percent_off` is not passed).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  applies_to: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        products: Schema.optionalKey(
          Schema.Array(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
      title: "applies_to_params",
      description:
        "A hash containing directions for what this Coupon will apply discounts to.",
    }),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) of the `amount_off` parameter (required if `amount_off` is passed).",
      format: "currency",
    }),
  ),
  currency_options: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.StructWithRest(Schema.Struct({ amount_off: Schema.Int }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({ title: "currency_option" }),
    ).annotate({
      description:
        "Coupons defined in each available currency option (only supported if `amount_off` is passed). Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
    }),
  ),
  duration: Schema.optionalKey(
    Schema.Literals(["forever", "once", "repeating"]).annotate({
      description:
        "Specifies how long the discount will be in effect if used on a subscription. Defaults to `once`.",
    }),
  ),
  duration_in_months: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Required only if `duration` is `repeating`, in which case it must be a positive integer that specifies the number of months the discount will be in effect.",
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
  id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Unique string of your choice that will be used to identify this coupon when applying it to a customer. If you don't want to specify a particular code, you can leave the ID blank and we'll generate a random code for you.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  max_redemptions: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer specifying the number of times the coupon can be redeemed before it's no longer valid. For example, you might have a 50% off coupon that the first 20 readers of your blog can use.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
  name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Name of the coupon displayed to customers on, for instance invoices, or receipts. By default the `id` is shown if `name` is not set.",
    }).check(
      Schema.isMaxCodePoints(40).annotate({
        expected: "a string with at most 40 code points",
      }),
    ),
  ),
  percent_off: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive float larger than 0, and smaller or equal to 100, that represents the discount the coupon will apply (required if `amount_off` is not passed).",
    }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
  ),
  redeem_by: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Unix timestamp specifying the last time at which the coupon can be redeemed (cannot be set to more than 5 years in the future). After the redeem_by date, the coupon can no longer be applied to new customers.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
});
export const PostCouponsOutput = Stripecoupon;
export const PostCouponsError = Stripeerror;
export const GetCouponsCouponInput = Schema.Struct({
  coupon: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetCouponsCouponOutput = Stripecoupon;
export const GetCouponsCouponError = Stripeerror;
export const PostCouponsCouponInput = Schema.Struct({
  currency_options: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.StructWithRest(Schema.Struct({ amount_off: Schema.Int }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({ title: "currency_option" }),
    ).annotate({
      description:
        "Coupons defined in each available currency option (only supported if the coupon is amount-based). Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
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
  name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Name of the coupon displayed to customers on, for instance invoices, or receipts. By default the `id` is shown if `name` is not set.",
    }).check(
      Schema.isMaxCodePoints(40).annotate({
        expected: "a string with at most 40 code points",
      }),
    ),
  ),
  coupon: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCouponsCouponOutput = Stripecoupon;
export const PostCouponsCouponError = Stripeerror;
export const DeleteCouponsCouponInput = Schema.Struct({
  coupon: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteCouponsCouponOutput = Stripedeleted_coupon;
export const DeleteCouponsCouponError = Stripeerror;
/**
 * The GetCouponsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCouponsOperation: StripeOperation & {
  readonly input: typeof GetCouponsInput;
  readonly output: typeof GetCouponsOutput;
  readonly error: typeof GetCouponsError;
} = {
  name: "GetCoupons",
  method: "GET",
  path: "/v1/coupons",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCouponsInput,
  output: GetCouponsOutput,
  error: GetCouponsError,
};
/**
 * The PostCouponsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCouponsOperation: StripeOperation & {
  readonly input: typeof PostCouponsInput;
  readonly output: typeof PostCouponsOutput;
  readonly error: typeof PostCouponsError;
} = {
  name: "PostCoupons",
  method: "POST",
  path: "/v1/coupons",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCouponsInput,
  output: PostCouponsOutput,
  error: PostCouponsError,
};
/**
 * The GetCouponsCouponOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCouponsCouponOperation: StripeOperation & {
  readonly input: typeof GetCouponsCouponInput;
  readonly output: typeof GetCouponsCouponOutput;
  readonly error: typeof GetCouponsCouponError;
} = {
  name: "GetCouponsCoupon",
  method: "GET",
  path: "/v1/coupons/{coupon}",
  pathParameters: ["coupon"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCouponsCouponInput,
  output: GetCouponsCouponOutput,
  error: GetCouponsCouponError,
};
/**
 * The PostCouponsCouponOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCouponsCouponOperation: StripeOperation & {
  readonly input: typeof PostCouponsCouponInput;
  readonly output: typeof PostCouponsCouponOutput;
  readonly error: typeof PostCouponsCouponError;
} = {
  name: "PostCouponsCoupon",
  method: "POST",
  path: "/v1/coupons/{coupon}",
  pathParameters: ["coupon"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCouponsCouponInput,
  output: PostCouponsCouponOutput,
  error: PostCouponsCouponError,
};
/**
 * The DeleteCouponsCouponOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCouponsCouponOperation: StripeOperation & {
  readonly input: typeof DeleteCouponsCouponInput;
  readonly output: typeof DeleteCouponsCouponOutput;
  readonly error: typeof DeleteCouponsCouponError;
} = {
  name: "DeleteCouponsCoupon",
  method: "DELETE",
  path: "/v1/coupons/{coupon}",
  pathParameters: ["coupon"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCouponsCouponInput,
  output: DeleteCouponsCouponOutput,
  error: DeleteCouponsCouponError,
};
/**
 * The makeCouponsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeCouponsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetCoupons function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCoupons = Effect.fn("coupons.GetCoupons")(function* (
    input: GetCouponsInput,
  ) {
    const response: GetCouponsOutput = yield* client.invoke(
      GetCouponsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCoupons function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCoupons = Effect.fn("coupons.PostCoupons")(function* (
    input: PostCouponsInput,
  ) {
    const response: PostCouponsOutput = yield* client.invoke(
      PostCouponsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCouponsCoupon function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCouponsCoupon = Effect.fn("coupons.GetCouponsCoupon")(function* (
    input: GetCouponsCouponInput,
  ) {
    const response: GetCouponsCouponOutput = yield* client.invoke(
      GetCouponsCouponOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCouponsCoupon function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCouponsCoupon = Effect.fn("coupons.PostCouponsCoupon")(function* (
    input: PostCouponsCouponInput,
  ) {
    const response: PostCouponsCouponOutput = yield* client.invoke(
      PostCouponsCouponOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteCouponsCoupon function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCouponsCoupon = Effect.fn("coupons.DeleteCouponsCoupon")(
    function* (input: DeleteCouponsCouponInput) {
      const response: DeleteCouponsCouponOutput = yield* client.invoke(
        DeleteCouponsCouponOperation,
        input,
      );
      return response;
    },
  );
  return {
    GetCoupons,
    PostCoupons,
    GetCouponsCoupon,
    PostCouponsCoupon,
    DeleteCouponsCoupon,
  };
});
