// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripetreasury_inbound_transfer } from "./models/treasury.js";

export type GetTreasuryInboundTransfersInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: "canceled" | "failed" | "processing" | "succeeded";
};
export type GetTreasuryInboundTransfersOutput = {
  readonly data: ReadonlyArray<Stripetreasury_inbound_transfer>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTreasuryInboundTransfersError = Stripeerror;
export type PostTreasuryInboundTransfersInput = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly origin_payment_method: string;
  readonly statement_descriptor?: string;
};
export type PostTreasuryInboundTransfersOutput =
  Stripetreasury_inbound_transfer;
export type PostTreasuryInboundTransfersError = Stripeerror;
export type GetTreasuryInboundTransfersIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetTreasuryInboundTransfersIdOutput =
  Stripetreasury_inbound_transfer;
export type GetTreasuryInboundTransfersIdError = Stripeerror;
export type PostTreasuryInboundTransfersInboundTransferCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly inbound_transfer: string;
};
export type PostTreasuryInboundTransfersInboundTransferCancelOutput =
  Stripetreasury_inbound_transfer;
export type PostTreasuryInboundTransfersInboundTransferCancelError =
  Stripeerror;

export const GetTreasuryInboundTransfersInput = Schema.Struct({
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
    Schema.Literals(["canceled", "failed", "processing", "succeeded"]),
  ),
});
export const GetTreasuryInboundTransfersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetreasury_inbound_transfer).annotate({
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
  title: "TreasuryInboundTransfersResourceInboundTransferList",
  description: "",
});
export const GetTreasuryInboundTransfersError = Stripeerror;
export const PostTreasuryInboundTransfersInput = Schema.Struct({
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
    description: "The FinancialAccount to send funds to.",
  }),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  origin_payment_method: Schema.String.annotate({
    description:
      "The origin payment method to be debited for the InboundTransfer.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The complete description that appears on your customers' statements. Maximum 10 characters. Can only include -#.$&*, spaces, and alphanumeric characters.",
    }).check(
      Schema.isMaxCodePoints(10).annotate({
        expected: "a string with at most 10 code points",
      }),
    ),
  ),
});
export const PostTreasuryInboundTransfersOutput =
  Stripetreasury_inbound_transfer;
export const PostTreasuryInboundTransfersError = Stripeerror;
export const GetTreasuryInboundTransfersIdInput = Schema.Struct({
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
export const GetTreasuryInboundTransfersIdOutput =
  Stripetreasury_inbound_transfer;
export const GetTreasuryInboundTransfersIdError = Stripeerror;
export const PostTreasuryInboundTransfersInboundTransferCancelInput =
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
    inbound_transfer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostTreasuryInboundTransfersInboundTransferCancelOutput =
  Stripetreasury_inbound_transfer;
export const PostTreasuryInboundTransfersInboundTransferCancelError =
  Stripeerror;
/**
 * The GetTreasuryInboundTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryInboundTransfersOperation: StripeOperation & {
  readonly input: typeof GetTreasuryInboundTransfersInput;
  readonly output: typeof GetTreasuryInboundTransfersOutput;
  readonly error: typeof GetTreasuryInboundTransfersError;
} = {
  name: "GetTreasuryInboundTransfers",
  method: "GET",
  path: "/v1/treasury/inbound_transfers",
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
  input: GetTreasuryInboundTransfersInput,
  output: GetTreasuryInboundTransfersOutput,
  error: GetTreasuryInboundTransfersError,
};
/**
 * The PostTreasuryInboundTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryInboundTransfersOperation: StripeOperation & {
  readonly input: typeof PostTreasuryInboundTransfersInput;
  readonly output: typeof PostTreasuryInboundTransfersOutput;
  readonly error: typeof PostTreasuryInboundTransfersError;
} = {
  name: "PostTreasuryInboundTransfers",
  method: "POST",
  path: "/v1/treasury/inbound_transfers",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryInboundTransfersInput,
  output: PostTreasuryInboundTransfersOutput,
  error: PostTreasuryInboundTransfersError,
};
/**
 * The GetTreasuryInboundTransfersIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryInboundTransfersIdOperation: StripeOperation & {
  readonly input: typeof GetTreasuryInboundTransfersIdInput;
  readonly output: typeof GetTreasuryInboundTransfersIdOutput;
  readonly error: typeof GetTreasuryInboundTransfersIdError;
} = {
  name: "GetTreasuryInboundTransfersId",
  method: "GET",
  path: "/v1/treasury/inbound_transfers/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryInboundTransfersIdInput,
  output: GetTreasuryInboundTransfersIdOutput,
  error: GetTreasuryInboundTransfersIdError,
};
/**
 * The PostTreasuryInboundTransfersInboundTransferCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryInboundTransfersInboundTransferCancelOperation: StripeOperation & {
  readonly input: typeof PostTreasuryInboundTransfersInboundTransferCancelInput;
  readonly output: typeof PostTreasuryInboundTransfersInboundTransferCancelOutput;
  readonly error: typeof PostTreasuryInboundTransfersInboundTransferCancelError;
} = {
  name: "PostTreasuryInboundTransfersInboundTransferCancel",
  method: "POST",
  path: "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel",
  pathParameters: ["inbound_transfer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryInboundTransfersInboundTransferCancelInput,
  output: PostTreasuryInboundTransfersInboundTransferCancelOutput,
  error: PostTreasuryInboundTransfersInboundTransferCancelError,
};
/**
 * The makeTreasuryInboundTransfersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTreasuryInboundTransfersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTreasuryInboundTransfers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryInboundTransfers = Effect.fn(
    "treasuryInboundTransfers.GetTreasuryInboundTransfers",
  )(function* (input: GetTreasuryInboundTransfersInput) {
    const response: GetTreasuryInboundTransfersOutput = yield* client.invoke(
      GetTreasuryInboundTransfersOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryInboundTransfers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryInboundTransfers = Effect.fn(
    "treasuryInboundTransfers.PostTreasuryInboundTransfers",
  )(function* (input: PostTreasuryInboundTransfersInput) {
    const response: PostTreasuryInboundTransfersOutput = yield* client.invoke(
      PostTreasuryInboundTransfersOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTreasuryInboundTransfersId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryInboundTransfersId = Effect.fn(
    "treasuryInboundTransfers.GetTreasuryInboundTransfersId",
  )(function* (input: GetTreasuryInboundTransfersIdInput) {
    const response: GetTreasuryInboundTransfersIdOutput = yield* client.invoke(
      GetTreasuryInboundTransfersIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryInboundTransfersInboundTransferCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryInboundTransfersInboundTransferCancel = Effect.fn(
    "treasuryInboundTransfers.PostTreasuryInboundTransfersInboundTransferCancel",
  )(function* (input: PostTreasuryInboundTransfersInboundTransferCancelInput) {
    const response: PostTreasuryInboundTransfersInboundTransferCancelOutput =
      yield* client.invoke(
        PostTreasuryInboundTransfersInboundTransferCancelOperation,
        input,
      );
    return response;
  });
  return {
    GetTreasuryInboundTransfers,
    PostTreasuryInboundTransfers,
    GetTreasuryInboundTransfersId,
    PostTreasuryInboundTransfersInboundTransferCancel,
  };
});
