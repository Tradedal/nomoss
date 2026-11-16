// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripetopup } from "./models/common.js";

export type GetTopupsInput = {
  readonly amount?:
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
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: "canceled" | "failed" | "pending" | "succeeded";
};
export type GetTopupsOutput = {
  readonly data: ReadonlyArray<Stripetopup>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTopupsError = Stripeerror;
export type PostTopupsInput = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly payment_method?: string;
  readonly payment_method_options?: {
    readonly us_bank_account?: { readonly network: "ach" } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly source?: string;
  readonly statement_descriptor?: string;
  readonly transfer_group?: string;
};
export type PostTopupsOutput = Stripetopup;
export type PostTopupsError = Stripeerror;
export type GetTopupsTopupInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly topup: string;
};
export type GetTopupsTopupOutput = Stripetopup;
export type GetTopupsTopupError = Stripeerror;
export type PostTopupsTopupInput = {
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly topup: string;
};
export type PostTopupsTopupOutput = Stripetopup;
export type PostTopupsTopupError = Stripeerror;
export type PostTopupsTopupCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly topup: string;
};
export type PostTopupsTopupCancelOutput = Stripetopup;
export type PostTopupsTopupCancelError = Stripeerror;

export const GetTopupsInput = Schema.Struct({
  amount: Schema.optionalKey(
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
    Schema.Literals(["canceled", "failed", "pending", "succeeded"]),
  ),
});
export const GetTopupsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetopup),
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
          new globalThis.RegExp("^\\/v1\\/topups", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/topups",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "TopupList", description: "" });
export const GetTopupsError = Stripeerror;
export const PostTopupsInput = Schema.Struct({
  amount: Schema.Number.annotate({
    description: "A positive integer representing how much to transfer.",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
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
  payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of a PaymentMethod representing the payment method to be used for the top-up. A PaymentMethod of type `us_bank_account` can be used.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  payment_method_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({ network: Schema.Literal("ach") }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "us_bank_account_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_options_param",
      description: "Payment method-specific configuration for this top-up.",
    }),
  ),
  source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of a source to transfer funds from. For most users, this should be left unspecified which will use the bank account that was set up in the dashboard for the specified currency. While testing, this can be a test bank token (see [Testing Top-ups](https://docs.stripe.com/connect/testing#testing-top-ups)).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Extra information about a top-up for the source's bank statement. Limited to 15 ASCII characters.",
    }).check(
      Schema.isMaxCodePoints(15).annotate({
        expected: "a string with at most 15 code points",
      }),
    ),
  ),
  transfer_group: Schema.optionalKey(
    Schema.String.annotate({
      description: "A string that identifies this top-up as part of a group.",
    }),
  ),
});
export const PostTopupsOutput = Stripetopup;
export const PostTopupsError = Stripeerror;
export const GetTopupsTopupInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  topup: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTopupsTopupOutput = Stripetopup;
export const GetTopupsTopupError = Stripeerror;
export const PostTopupsTopupInput = Schema.Struct({
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
  topup: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTopupsTopupOutput = Stripetopup;
export const PostTopupsTopupError = Stripeerror;
export const PostTopupsTopupCancelInput = Schema.Struct({
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
  topup: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTopupsTopupCancelOutput = Stripetopup;
export const PostTopupsTopupCancelError = Stripeerror;
/**
 * The GetTopupsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTopupsOperation: StripeOperation & {
  readonly input: typeof GetTopupsInput;
  readonly output: typeof GetTopupsOutput;
  readonly error: typeof GetTopupsError;
} = {
  name: "GetTopups",
  method: "GET",
  path: "/v1/topups",
  pathParameters: [],
  queryParameters: [
    "amount",
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTopupsInput,
  output: GetTopupsOutput,
  error: GetTopupsError,
};
/**
 * The PostTopupsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTopupsOperation: StripeOperation & {
  readonly input: typeof PostTopupsInput;
  readonly output: typeof PostTopupsOutput;
  readonly error: typeof PostTopupsError;
} = {
  name: "PostTopups",
  method: "POST",
  path: "/v1/topups",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTopupsInput,
  output: PostTopupsOutput,
  error: PostTopupsError,
};
/**
 * The GetTopupsTopupOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTopupsTopupOperation: StripeOperation & {
  readonly input: typeof GetTopupsTopupInput;
  readonly output: typeof GetTopupsTopupOutput;
  readonly error: typeof GetTopupsTopupError;
} = {
  name: "GetTopupsTopup",
  method: "GET",
  path: "/v1/topups/{topup}",
  pathParameters: ["topup"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTopupsTopupInput,
  output: GetTopupsTopupOutput,
  error: GetTopupsTopupError,
};
/**
 * The PostTopupsTopupOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTopupsTopupOperation: StripeOperation & {
  readonly input: typeof PostTopupsTopupInput;
  readonly output: typeof PostTopupsTopupOutput;
  readonly error: typeof PostTopupsTopupError;
} = {
  name: "PostTopupsTopup",
  method: "POST",
  path: "/v1/topups/{topup}",
  pathParameters: ["topup"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTopupsTopupInput,
  output: PostTopupsTopupOutput,
  error: PostTopupsTopupError,
};
/**
 * The PostTopupsTopupCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTopupsTopupCancelOperation: StripeOperation & {
  readonly input: typeof PostTopupsTopupCancelInput;
  readonly output: typeof PostTopupsTopupCancelOutput;
  readonly error: typeof PostTopupsTopupCancelError;
} = {
  name: "PostTopupsTopupCancel",
  method: "POST",
  path: "/v1/topups/{topup}/cancel",
  pathParameters: ["topup"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTopupsTopupCancelInput,
  output: PostTopupsTopupCancelOutput,
  error: PostTopupsTopupCancelError,
};
/**
 * The makeTopupsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTopupsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTopups function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTopups = Effect.fn("topups.GetTopups")(function* (
    input: GetTopupsInput,
  ) {
    const response: GetTopupsOutput = yield* client.invoke(
      GetTopupsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTopups function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTopups = Effect.fn("topups.PostTopups")(function* (
    input: PostTopupsInput,
  ) {
    const response: PostTopupsOutput = yield* client.invoke(
      PostTopupsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTopupsTopup function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTopupsTopup = Effect.fn("topups.GetTopupsTopup")(function* (
    input: GetTopupsTopupInput,
  ) {
    const response: GetTopupsTopupOutput = yield* client.invoke(
      GetTopupsTopupOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTopupsTopup function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTopupsTopup = Effect.fn("topups.PostTopupsTopup")(function* (
    input: PostTopupsTopupInput,
  ) {
    const response: PostTopupsTopupOutput = yield* client.invoke(
      PostTopupsTopupOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTopupsTopupCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTopupsTopupCancel = Effect.fn("topups.PostTopupsTopupCancel")(
    function* (input: PostTopupsTopupCancelInput) {
      const response: PostTopupsTopupCancelOutput = yield* client.invoke(
        PostTopupsTopupCancelOperation,
        input,
      );
      return response;
    },
  );
  return {
    GetTopups,
    PostTopups,
    GetTopupsTopup,
    PostTopupsTopup,
    PostTopupsTopupCancel,
  };
});
