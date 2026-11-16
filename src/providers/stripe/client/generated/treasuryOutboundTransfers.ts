// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripetreasury_outbound_transfer } from "./models/treasury.js";

export type GetTreasuryOutboundTransfersInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?:
    | "canceled"
    | "failed"
    | "posted"
    | "processing"
    | "returned";
};
export type GetTreasuryOutboundTransfersOutput = {
  readonly data: ReadonlyArray<Stripetreasury_outbound_transfer>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTreasuryOutboundTransfersError = Stripeerror;
export type PostTreasuryOutboundTransfersInput = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly destination_payment_method?: string;
  readonly destination_payment_method_data?: {
    readonly financial_account?: string;
    readonly type: "financial_account";
  } & { readonly [x: string]: Schema.Json };
  readonly destination_payment_method_options?: {
    readonly us_bank_account?:
      | ({ readonly network?: "ach" | "us_domestic_wire" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly statement_descriptor?: string;
};
export type PostTreasuryOutboundTransfersOutput =
  Stripetreasury_outbound_transfer;
export type PostTreasuryOutboundTransfersError = Stripeerror;
export type GetTreasuryOutboundTransfersOutboundTransferInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly outbound_transfer: string;
};
export type GetTreasuryOutboundTransfersOutboundTransferOutput =
  Stripetreasury_outbound_transfer;
export type GetTreasuryOutboundTransfersOutboundTransferError = Stripeerror;
export type PostTreasuryOutboundTransfersOutboundTransferCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly outbound_transfer: string;
};
export type PostTreasuryOutboundTransfersOutboundTransferCancelOutput =
  Stripetreasury_outbound_transfer;
export type PostTreasuryOutboundTransfersOutboundTransferCancelError =
  Stripeerror;

export const GetTreasuryOutboundTransfersInput = Schema.Struct({
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
  financial_account: Schema.String,
  limit: Schema.optionalKey(Schema.Int),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(["canceled", "failed", "posted", "processing", "returned"]),
  ),
});
export const GetTreasuryOutboundTransfersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetreasury_outbound_transfer).annotate({
      description: "Details about each object.",
    }),
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
    }).check(
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
  title: "TreasuryOutboundTransfersResourceOutboundTransferList",
  description: "",
});
export const GetTreasuryOutboundTransfersError = Stripeerror;
export const PostTreasuryOutboundTransfersInput = Schema.Struct({
  amount: Schema.Number.annotate({
    description: "Amount (in cents) to be transferred.",
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
  destination_payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The PaymentMethod to use as the payment instrument for the OutboundTransfer.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  destination_payment_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        financial_account: Schema.optionalKey(Schema.String),
        type: Schema.Literal("financial_account"),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_data",
      description:
        "Hash used to generate the PaymentMethod to be used for this OutboundTransfer. Exclusive with `destination_payment_method`.",
    }),
  ),
  destination_payment_method_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        us_bank_account: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                network: Schema.optionalKey(
                  Schema.Literals(["ach", "us_domestic_wire"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
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
      title: "payment_method_options",
      description: "Hash describing payment method configuration details.",
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
  financial_account: Schema.String.annotate({
    description: "The FinancialAccount to pull funds from.",
  }),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'Statement descriptor to be shown on the receiving end of an OutboundTransfer. Maximum 10 characters for `ach` transfers or 140 characters for `us_domestic_wire` transfers. The default value is "transfer". Can only include -#.$&*, spaces, and alphanumeric characters.',
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const PostTreasuryOutboundTransfersOutput =
  Stripetreasury_outbound_transfer;
export const PostTreasuryOutboundTransfersError = Stripeerror;
export const GetTreasuryOutboundTransfersOutboundTransferInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  outbound_transfer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTreasuryOutboundTransfersOutboundTransferOutput =
  Stripetreasury_outbound_transfer;
export const GetTreasuryOutboundTransfersOutboundTransferError = Stripeerror;
export const PostTreasuryOutboundTransfersOutboundTransferCancelInput =
  Schema.Struct({
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
    outbound_transfer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostTreasuryOutboundTransfersOutboundTransferCancelOutput =
  Stripetreasury_outbound_transfer;
export const PostTreasuryOutboundTransfersOutboundTransferCancelError =
  Stripeerror;
/**
 * The GetTreasuryOutboundTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryOutboundTransfersOperation: StripeOperation & {
  readonly input: typeof GetTreasuryOutboundTransfersInput;
  readonly output: typeof GetTreasuryOutboundTransfersOutput;
  readonly error: typeof GetTreasuryOutboundTransfersError;
} = {
  name: "GetTreasuryOutboundTransfers",
  method: "GET",
  path: "/v1/treasury/outbound_transfers",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "financial_account",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryOutboundTransfersInput,
  output: GetTreasuryOutboundTransfersOutput,
  error: GetTreasuryOutboundTransfersError,
};
/**
 * The PostTreasuryOutboundTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryOutboundTransfersOperation: StripeOperation & {
  readonly input: typeof PostTreasuryOutboundTransfersInput;
  readonly output: typeof PostTreasuryOutboundTransfersOutput;
  readonly error: typeof PostTreasuryOutboundTransfersError;
} = {
  name: "PostTreasuryOutboundTransfers",
  method: "POST",
  path: "/v1/treasury/outbound_transfers",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryOutboundTransfersInput,
  output: PostTreasuryOutboundTransfersOutput,
  error: PostTreasuryOutboundTransfersError,
};
/**
 * The GetTreasuryOutboundTransfersOutboundTransferOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryOutboundTransfersOutboundTransferOperation: StripeOperation & {
  readonly input: typeof GetTreasuryOutboundTransfersOutboundTransferInput;
  readonly output: typeof GetTreasuryOutboundTransfersOutboundTransferOutput;
  readonly error: typeof GetTreasuryOutboundTransfersOutboundTransferError;
} = {
  name: "GetTreasuryOutboundTransfersOutboundTransfer",
  method: "GET",
  path: "/v1/treasury/outbound_transfers/{outbound_transfer}",
  pathParameters: ["outbound_transfer"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryOutboundTransfersOutboundTransferInput,
  output: GetTreasuryOutboundTransfersOutboundTransferOutput,
  error: GetTreasuryOutboundTransfersOutboundTransferError,
};
/**
 * The PostTreasuryOutboundTransfersOutboundTransferCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryOutboundTransfersOutboundTransferCancelOperation: StripeOperation & {
  readonly input: typeof PostTreasuryOutboundTransfersOutboundTransferCancelInput;
  readonly output: typeof PostTreasuryOutboundTransfersOutboundTransferCancelOutput;
  readonly error: typeof PostTreasuryOutboundTransfersOutboundTransferCancelError;
} = {
  name: "PostTreasuryOutboundTransfersOutboundTransferCancel",
  method: "POST",
  path: "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel",
  pathParameters: ["outbound_transfer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryOutboundTransfersOutboundTransferCancelInput,
  output: PostTreasuryOutboundTransfersOutboundTransferCancelOutput,
  error: PostTreasuryOutboundTransfersOutboundTransferCancelError,
};
/**
 * The makeTreasuryOutboundTransfersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTreasuryOutboundTransfersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTreasuryOutboundTransfers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryOutboundTransfers = Effect.fn(
    "treasuryOutboundTransfers.GetTreasuryOutboundTransfers",
  )(function* (input: GetTreasuryOutboundTransfersInput) {
    const response: GetTreasuryOutboundTransfersOutput = yield* client.invoke(
      GetTreasuryOutboundTransfersOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryOutboundTransfers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryOutboundTransfers = Effect.fn(
    "treasuryOutboundTransfers.PostTreasuryOutboundTransfers",
  )(function* (input: PostTreasuryOutboundTransfersInput) {
    const response: PostTreasuryOutboundTransfersOutput = yield* client.invoke(
      PostTreasuryOutboundTransfersOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTreasuryOutboundTransfersOutboundTransfer function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryOutboundTransfersOutboundTransfer = Effect.fn(
    "treasuryOutboundTransfers.GetTreasuryOutboundTransfersOutboundTransfer",
  )(function* (input: GetTreasuryOutboundTransfersOutboundTransferInput) {
    const response: GetTreasuryOutboundTransfersOutboundTransferOutput =
      yield* client.invoke(
        GetTreasuryOutboundTransfersOutboundTransferOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTreasuryOutboundTransfersOutboundTransferCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryOutboundTransfersOutboundTransferCancel = Effect.fn(
    "treasuryOutboundTransfers.PostTreasuryOutboundTransfersOutboundTransferCancel",
  )(function* (
    input: PostTreasuryOutboundTransfersOutboundTransferCancelInput,
  ) {
    const response: PostTreasuryOutboundTransfersOutboundTransferCancelOutput =
      yield* client.invoke(
        PostTreasuryOutboundTransfersOutboundTransferCancelOperation,
        input,
      );
    return response;
  });
  return {
    GetTreasuryOutboundTransfers,
    PostTreasuryOutboundTransfers,
    GetTreasuryOutboundTransfersOutboundTransfer,
    PostTreasuryOutboundTransfersOutboundTransferCancel,
  };
});
