// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripepayout } from "./models/transfers.js";

export type GetPayoutsInput = {
  readonly arrival_date?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly destination?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: string;
};
export type GetPayoutsOutput = {
  readonly data: ReadonlyArray<Stripepayout>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPayoutsError = Stripeerror;
export type PostPayoutsInput = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly destination?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly method?: "instant" | "standard";
  readonly payout_method?: string;
  readonly source_type?: "bank_account" | "card" | "fpx";
  readonly statement_descriptor?: string;
};
export type PostPayoutsOutput = Stripepayout;
export type PostPayoutsError = Stripeerror;
export type GetPayoutsPayoutInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payout: string;
};
export type GetPayoutsPayoutOutput = Stripepayout;
export type GetPayoutsPayoutError = Stripeerror;
export type PostPayoutsPayoutInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly payout: string;
};
export type PostPayoutsPayoutOutput = Stripepayout;
export type PostPayoutsPayoutError = Stripeerror;
export type PostPayoutsPayoutCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payout: string;
};
export type PostPayoutsPayoutCancelOutput = Stripepayout;
export type PostPayoutsPayoutCancelError = Stripeerror;
export type PostPayoutsPayoutReverseInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly payout: string;
};
export type PostPayoutsPayoutReverseOutput = Stripepayout;
export type PostPayoutsPayoutReverseError = Stripeerror;

export const GetPayoutsInput = Schema.Struct({
  arrival_date: Schema.optionalKey(
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
  destination: Schema.optionalKey(Schema.String),
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
  status: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetPayoutsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripepayout),
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
          new globalThis.RegExp("^\\/v1\\/payouts", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/payouts",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "PayoutList", description: "" });
export const GetPayoutsError = Stripeerror;
export const PostPayoutsInput = Schema.Struct({
  amount: Schema.Number.annotate({
    description:
      "A positive integer in cents representing how much to pay out.",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
    format: "currency",
  }),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  destination: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of a bank account or a card to send the payout to. If you don't provide a destination, we use the default external account for the specified currency.",
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
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  method: Schema.optionalKey(
    Schema.Literals(["instant", "standard"]).annotate({
      description:
        "The method used to send this payout, which is `standard` or `instant`. We support `instant` for payouts to debit cards and bank accounts in certain countries. Learn more about [bank support for Instant Payouts](https://stripe.com/docs/payouts/instant-payouts-banks).",
    }),
  ),
  payout_method: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of a v2 FinancialAccount to send funds to.",
    }),
  ),
  source_type: Schema.optionalKey(
    Schema.Literals(["bank_account", "card", "fpx"]).annotate({
      description:
        "The balance type of your Stripe balance to draw this payout from. Balances for different payment sources are kept separately. You can find the amounts with the Balances API. One of `bank_account`, `card`, or `fpx`.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A string that displays on the recipient's bank or card statement (up to 22 characters). A `statement_descriptor` that's longer than 22 characters return an error. Most banks truncate this information and display it inconsistently. Some banks might not display it at all. For US ACH payouts, this maps to the ACH Company Entry Description field, which the NACHA standard limits to 10 characters. Stripe truncates descriptors longer than 10 characters for US ACH payouts.",
    }).check(
      Schema.isMaxCodePoints(22).annotate({
        expected: "a string with at most 22 code points",
      }),
    ),
  ),
});
export const PostPayoutsOutput = Stripepayout;
export const PostPayoutsError = Stripeerror;
export const GetPayoutsPayoutInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  payout: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPayoutsPayoutOutput = Stripepayout;
export const GetPayoutsPayoutError = Stripeerror;
export const PostPayoutsPayoutInput = Schema.Struct({
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
  payout: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPayoutsPayoutOutput = Stripepayout;
export const PostPayoutsPayoutError = Stripeerror;
export const PostPayoutsPayoutCancelInput = Schema.Struct({
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
  payout: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPayoutsPayoutCancelOutput = Stripepayout;
export const PostPayoutsPayoutCancelError = Stripeerror;
export const PostPayoutsPayoutReverseInput = Schema.Struct({
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
  payout: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPayoutsPayoutReverseOutput = Stripepayout;
export const PostPayoutsPayoutReverseError = Stripeerror;
/**
 * The GetPayoutsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPayoutsOperation: StripeOperation & {
  readonly input: typeof GetPayoutsInput;
  readonly output: typeof GetPayoutsOutput;
  readonly error: typeof GetPayoutsError;
} = {
  name: "GetPayouts",
  method: "GET",
  path: "/v1/payouts",
  pathParameters: [],
  queryParameters: [
    "arrival_date",
    "created",
    "destination",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPayoutsInput,
  output: GetPayoutsOutput,
  error: GetPayoutsError,
};
/**
 * The PostPayoutsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPayoutsOperation: StripeOperation & {
  readonly input: typeof PostPayoutsInput;
  readonly output: typeof PostPayoutsOutput;
  readonly error: typeof PostPayoutsError;
} = {
  name: "PostPayouts",
  method: "POST",
  path: "/v1/payouts",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPayoutsInput,
  output: PostPayoutsOutput,
  error: PostPayoutsError,
};
/**
 * The GetPayoutsPayoutOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPayoutsPayoutOperation: StripeOperation & {
  readonly input: typeof GetPayoutsPayoutInput;
  readonly output: typeof GetPayoutsPayoutOutput;
  readonly error: typeof GetPayoutsPayoutError;
} = {
  name: "GetPayoutsPayout",
  method: "GET",
  path: "/v1/payouts/{payout}",
  pathParameters: ["payout"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPayoutsPayoutInput,
  output: GetPayoutsPayoutOutput,
  error: GetPayoutsPayoutError,
};
/**
 * The PostPayoutsPayoutOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPayoutsPayoutOperation: StripeOperation & {
  readonly input: typeof PostPayoutsPayoutInput;
  readonly output: typeof PostPayoutsPayoutOutput;
  readonly error: typeof PostPayoutsPayoutError;
} = {
  name: "PostPayoutsPayout",
  method: "POST",
  path: "/v1/payouts/{payout}",
  pathParameters: ["payout"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPayoutsPayoutInput,
  output: PostPayoutsPayoutOutput,
  error: PostPayoutsPayoutError,
};
/**
 * The PostPayoutsPayoutCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPayoutsPayoutCancelOperation: StripeOperation & {
  readonly input: typeof PostPayoutsPayoutCancelInput;
  readonly output: typeof PostPayoutsPayoutCancelOutput;
  readonly error: typeof PostPayoutsPayoutCancelError;
} = {
  name: "PostPayoutsPayoutCancel",
  method: "POST",
  path: "/v1/payouts/{payout}/cancel",
  pathParameters: ["payout"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPayoutsPayoutCancelInput,
  output: PostPayoutsPayoutCancelOutput,
  error: PostPayoutsPayoutCancelError,
};
/**
 * The PostPayoutsPayoutReverseOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPayoutsPayoutReverseOperation: StripeOperation & {
  readonly input: typeof PostPayoutsPayoutReverseInput;
  readonly output: typeof PostPayoutsPayoutReverseOutput;
  readonly error: typeof PostPayoutsPayoutReverseError;
} = {
  name: "PostPayoutsPayoutReverse",
  method: "POST",
  path: "/v1/payouts/{payout}/reverse",
  pathParameters: ["payout"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPayoutsPayoutReverseInput,
  output: PostPayoutsPayoutReverseOutput,
  error: PostPayoutsPayoutReverseError,
};
/**
 * The makePayoutsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makePayoutsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetPayouts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPayouts = Effect.fn("payouts.GetPayouts")(function* (
    input: GetPayoutsInput,
  ) {
    const response: GetPayoutsOutput = yield* client.invoke(
      GetPayoutsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPayouts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPayouts = Effect.fn("payouts.PostPayouts")(function* (
    input: PostPayoutsInput,
  ) {
    const response: PostPayoutsOutput = yield* client.invoke(
      PostPayoutsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetPayoutsPayout function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPayoutsPayout = Effect.fn("payouts.GetPayoutsPayout")(function* (
    input: GetPayoutsPayoutInput,
  ) {
    const response: GetPayoutsPayoutOutput = yield* client.invoke(
      GetPayoutsPayoutOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPayoutsPayout function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPayoutsPayout = Effect.fn("payouts.PostPayoutsPayout")(function* (
    input: PostPayoutsPayoutInput,
  ) {
    const response: PostPayoutsPayoutOutput = yield* client.invoke(
      PostPayoutsPayoutOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPayoutsPayoutCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPayoutsPayoutCancel = Effect.fn("payouts.PostPayoutsPayoutCancel")(
    function* (input: PostPayoutsPayoutCancelInput) {
      const response: PostPayoutsPayoutCancelOutput = yield* client.invoke(
        PostPayoutsPayoutCancelOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostPayoutsPayoutReverse function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPayoutsPayoutReverse = Effect.fn(
    "payouts.PostPayoutsPayoutReverse",
  )(function* (input: PostPayoutsPayoutReverseInput) {
    const response: PostPayoutsPayoutReverseOutput = yield* client.invoke(
      PostPayoutsPayoutReverseOperation,
      input,
    );
    return response;
  });
  return {
    GetPayouts,
    PostPayouts,
    GetPayoutsPayout,
    PostPayoutsPayout,
    PostPayoutsPayoutCancel,
    PostPayoutsPayoutReverse,
  };
});
