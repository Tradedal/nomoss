// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Striperefund } from "./models/charges.js";
import { Stripeerror } from "./models/common.js";

export type GetRefundsInput = {
  readonly charge?: string;
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
  readonly payment_intent?: string;
  readonly starting_after?: string;
};
export type GetRefundsOutput = {
  readonly data: ReadonlyArray<Striperefund>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetRefundsError = Stripeerror;
export type PostRefundsInput = {
  readonly amount?: number;
  readonly charge?: string;
  readonly currency?: string;
  readonly customer?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly instructions_email?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly origin?: "customer_balance";
  readonly payment_intent?: string;
  readonly reason?: "duplicate" | "fraudulent" | "requested_by_customer";
  readonly refund_application_fee?: boolean;
  readonly reverse_transfer?: boolean;
};
export type PostRefundsOutput = Striperefund;
export type PostRefundsError = Stripeerror;
export type GetRefundsRefundInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly refund: string;
};
export type GetRefundsRefundOutput = Striperefund;
export type GetRefundsRefundError = Stripeerror;
export type PostRefundsRefundInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly refund: string;
};
export type PostRefundsRefundOutput = Striperefund;
export type PostRefundsRefundError = Stripeerror;
export type PostRefundsRefundCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly refund: string;
};
export type PostRefundsRefundCancelOutput = Striperefund;
export type PostRefundsRefundCancelError = Stripeerror;

export const GetRefundsInput = Schema.Struct({
  charge: Schema.optionalKey(Schema.String),
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
  ending_before: Schema.optionalKey(Schema.String),
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
  payment_intent: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(Schema.String),
});
export const GetRefundsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Striperefund),
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
          new globalThis.RegExp("^\\/v1\\/refunds", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/refunds",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "APIMethodRefundList", description: "" });
export const GetRefundsError = Stripeerror;
export const PostRefundsInput = Schema.Struct({
  amount: Schema.optionalKey(Schema.Int),
  charge: Schema.optionalKey(
    Schema.String.annotate({
      description: "The identifier of the charge to refund.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description: "Customer whose customer balance to refund from.",
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
  instructions_email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For payment methods without native refund support (e.g., Konbini, PromptPay), use this email from the customer to receive refund instructions.",
    }).check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
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
  origin: Schema.optionalKey(
    Schema.Literal("customer_balance").annotate({
      description: "Origin of the refund",
    }),
  ),
  payment_intent: Schema.optionalKey(
    Schema.String.annotate({
      description: "The identifier of the PaymentIntent to refund.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  reason: Schema.optionalKey(
    Schema.Literals([
      "duplicate",
      "fraudulent",
      "requested_by_customer",
    ]).annotate({
      description:
        "String indicating the reason for the refund. If set, possible values are `duplicate`, `fraudulent`, and `requested_by_customer`. If you believe the charge to be fraudulent, specifying `fraudulent` as the reason will add the associated card and email to your [block lists](https://docs.stripe.com/radar/lists), and will also help us improve our fraud detection algorithms.",
    }),
  ),
  refund_application_fee: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the application fee should be refunded when refunding this charge. If a full charge refund is given, the full application fee will be refunded. Otherwise, the application fee will be refunded in an amount proportional to the amount of the charge refunded. An application fee can be refunded only by the application that created the charge.",
    }),
  ),
  reverse_transfer: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the transfer should be reversed when refunding this charge. The transfer will be reversed proportionally to the amount being refunded (either the entire or partial amount).<br><br>A transfer can be reversed only by the application that created the charge.",
    }),
  ),
});
export const PostRefundsOutput = Striperefund;
export const PostRefundsError = Stripeerror;
export const GetRefundsRefundInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  refund: Schema.String,
});
export const GetRefundsRefundOutput = Striperefund;
export const GetRefundsRefundError = Stripeerror;
export const PostRefundsRefundInput = Schema.Struct({
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
  refund: Schema.String,
});
export const PostRefundsRefundOutput = Striperefund;
export const PostRefundsRefundError = Stripeerror;
export const PostRefundsRefundCancelInput = Schema.Struct({
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
  refund: Schema.String,
});
export const PostRefundsRefundCancelOutput = Striperefund;
export const PostRefundsRefundCancelError = Stripeerror;
/**
 * The GetRefundsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetRefundsOperation: StripeOperation & {
  readonly input: typeof GetRefundsInput;
  readonly output: typeof GetRefundsOutput;
  readonly error: typeof GetRefundsError;
} = {
  name: "GetRefunds",
  method: "GET",
  path: "/v1/refunds",
  pathParameters: [],
  queryParameters: [
    "charge",
    "created",
    "ending_before",
    "expand",
    "limit",
    "payment_intent",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetRefundsInput,
  output: GetRefundsOutput,
  error: GetRefundsError,
};
/**
 * The PostRefundsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostRefundsOperation: StripeOperation & {
  readonly input: typeof PostRefundsInput;
  readonly output: typeof PostRefundsOutput;
  readonly error: typeof PostRefundsError;
} = {
  name: "PostRefunds",
  method: "POST",
  path: "/v1/refunds",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostRefundsInput,
  output: PostRefundsOutput,
  error: PostRefundsError,
};
/**
 * The GetRefundsRefundOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetRefundsRefundOperation: StripeOperation & {
  readonly input: typeof GetRefundsRefundInput;
  readonly output: typeof GetRefundsRefundOutput;
  readonly error: typeof GetRefundsRefundError;
} = {
  name: "GetRefundsRefund",
  method: "GET",
  path: "/v1/refunds/{refund}",
  pathParameters: ["refund"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetRefundsRefundInput,
  output: GetRefundsRefundOutput,
  error: GetRefundsRefundError,
};
/**
 * The PostRefundsRefundOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostRefundsRefundOperation: StripeOperation & {
  readonly input: typeof PostRefundsRefundInput;
  readonly output: typeof PostRefundsRefundOutput;
  readonly error: typeof PostRefundsRefundError;
} = {
  name: "PostRefundsRefund",
  method: "POST",
  path: "/v1/refunds/{refund}",
  pathParameters: ["refund"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostRefundsRefundInput,
  output: PostRefundsRefundOutput,
  error: PostRefundsRefundError,
};
/**
 * The PostRefundsRefundCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostRefundsRefundCancelOperation: StripeOperation & {
  readonly input: typeof PostRefundsRefundCancelInput;
  readonly output: typeof PostRefundsRefundCancelOutput;
  readonly error: typeof PostRefundsRefundCancelError;
} = {
  name: "PostRefundsRefundCancel",
  method: "POST",
  path: "/v1/refunds/{refund}/cancel",
  pathParameters: ["refund"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostRefundsRefundCancelInput,
  output: PostRefundsRefundCancelOutput,
  error: PostRefundsRefundCancelError,
};
/**
 * The makeRefundsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeRefundsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetRefunds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetRefunds = Effect.fn("refunds.GetRefunds")(function* (
    input: GetRefundsInput,
  ) {
    const response: GetRefundsOutput = yield* client.invoke(
      GetRefundsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostRefunds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostRefunds = Effect.fn("refunds.PostRefunds")(function* (
    input: PostRefundsInput,
  ) {
    const response: PostRefundsOutput = yield* client.invoke(
      PostRefundsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetRefundsRefund function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetRefundsRefund = Effect.fn("refunds.GetRefundsRefund")(function* (
    input: GetRefundsRefundInput,
  ) {
    const response: GetRefundsRefundOutput = yield* client.invoke(
      GetRefundsRefundOperation,
      input,
    );
    return response;
  });
  /**
   * The PostRefundsRefund function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostRefundsRefund = Effect.fn("refunds.PostRefundsRefund")(function* (
    input: PostRefundsRefundInput,
  ) {
    const response: PostRefundsRefundOutput = yield* client.invoke(
      PostRefundsRefundOperation,
      input,
    );
    return response;
  });
  /**
   * The PostRefundsRefundCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostRefundsRefundCancel = Effect.fn("refunds.PostRefundsRefundCancel")(
    function* (input: PostRefundsRefundCancelInput) {
      const response: PostRefundsRefundCancelOutput = yield* client.invoke(
        PostRefundsRefundCancelOperation,
        input,
      );
      return response;
    },
  );
  return {
    GetRefunds,
    PostRefunds,
    GetRefundsRefund,
    PostRefundsRefund,
    PostRefundsRefundCancel,
  };
});
