// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripetreasury_debit_reversal } from "./models/treasury.js";

export type GetTreasuryDebitReversalsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly limit?: number;
  readonly received_debit?: string;
  readonly resolution?: "lost" | "won";
  readonly starting_after?: string;
  readonly status?: "canceled" | "completed" | "processing";
};
export type GetTreasuryDebitReversalsOutput = {
  readonly data: ReadonlyArray<Stripetreasury_debit_reversal>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTreasuryDebitReversalsError = Stripeerror;
export type PostTreasuryDebitReversalsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly received_debit: string;
};
export type PostTreasuryDebitReversalsOutput = Stripetreasury_debit_reversal;
export type PostTreasuryDebitReversalsError = Stripeerror;
export type GetTreasuryDebitReversalsDebitReversalInput = {
  readonly debit_reversal: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetTreasuryDebitReversalsDebitReversalOutput =
  Stripetreasury_debit_reversal;
export type GetTreasuryDebitReversalsDebitReversalError = Stripeerror;

export const GetTreasuryDebitReversalsInput = Schema.Struct({
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
  received_debit: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  resolution: Schema.optionalKey(Schema.Literals(["lost", "won"])),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(["canceled", "completed", "processing"]),
  ),
});
export const GetTreasuryDebitReversalsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetreasury_debit_reversal).annotate({
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
  title: "TreasuryReceivedDebitsResourceDebitReversalList",
  description: "",
});
export const GetTreasuryDebitReversalsError = Stripeerror;
export const PostTreasuryDebitReversalsInput = Schema.Struct({
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
  received_debit: Schema.String.annotate({
    description: "The ReceivedDebit to reverse.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTreasuryDebitReversalsOutput = Stripetreasury_debit_reversal;
export const PostTreasuryDebitReversalsError = Stripeerror;
export const GetTreasuryDebitReversalsDebitReversalInput = Schema.Struct({
  debit_reversal: Schema.String.check(
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
export const GetTreasuryDebitReversalsDebitReversalOutput =
  Stripetreasury_debit_reversal;
export const GetTreasuryDebitReversalsDebitReversalError = Stripeerror;
/**
 * The GetTreasuryDebitReversalsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryDebitReversalsOperation: StripeOperation & {
  readonly input: typeof GetTreasuryDebitReversalsInput;
  readonly output: typeof GetTreasuryDebitReversalsOutput;
  readonly error: typeof GetTreasuryDebitReversalsError;
} = {
  name: "GetTreasuryDebitReversals",
  method: "GET",
  path: "/v1/treasury/debit_reversals",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "financial_account",
    "limit",
    "received_debit",
    "resolution",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryDebitReversalsInput,
  output: GetTreasuryDebitReversalsOutput,
  error: GetTreasuryDebitReversalsError,
};
/**
 * The PostTreasuryDebitReversalsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryDebitReversalsOperation: StripeOperation & {
  readonly input: typeof PostTreasuryDebitReversalsInput;
  readonly output: typeof PostTreasuryDebitReversalsOutput;
  readonly error: typeof PostTreasuryDebitReversalsError;
} = {
  name: "PostTreasuryDebitReversals",
  method: "POST",
  path: "/v1/treasury/debit_reversals",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryDebitReversalsInput,
  output: PostTreasuryDebitReversalsOutput,
  error: PostTreasuryDebitReversalsError,
};
/**
 * The GetTreasuryDebitReversalsDebitReversalOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryDebitReversalsDebitReversalOperation: StripeOperation & {
  readonly input: typeof GetTreasuryDebitReversalsDebitReversalInput;
  readonly output: typeof GetTreasuryDebitReversalsDebitReversalOutput;
  readonly error: typeof GetTreasuryDebitReversalsDebitReversalError;
} = {
  name: "GetTreasuryDebitReversalsDebitReversal",
  method: "GET",
  path: "/v1/treasury/debit_reversals/{debit_reversal}",
  pathParameters: ["debit_reversal"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryDebitReversalsDebitReversalInput,
  output: GetTreasuryDebitReversalsDebitReversalOutput,
  error: GetTreasuryDebitReversalsDebitReversalError,
};
/**
 * The makeTreasuryDebitReversalsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTreasuryDebitReversalsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTreasuryDebitReversals function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryDebitReversals = Effect.fn(
    "treasuryDebitReversals.GetTreasuryDebitReversals",
  )(function* (input: GetTreasuryDebitReversalsInput) {
    const response: GetTreasuryDebitReversalsOutput = yield* client.invoke(
      GetTreasuryDebitReversalsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryDebitReversals function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryDebitReversals = Effect.fn(
    "treasuryDebitReversals.PostTreasuryDebitReversals",
  )(function* (input: PostTreasuryDebitReversalsInput) {
    const response: PostTreasuryDebitReversalsOutput = yield* client.invoke(
      PostTreasuryDebitReversalsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTreasuryDebitReversalsDebitReversal function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryDebitReversalsDebitReversal = Effect.fn(
    "treasuryDebitReversals.GetTreasuryDebitReversalsDebitReversal",
  )(function* (input: GetTreasuryDebitReversalsDebitReversalInput) {
    const response: GetTreasuryDebitReversalsDebitReversalOutput =
      yield* client.invoke(
        GetTreasuryDebitReversalsDebitReversalOperation,
        input,
      );
    return response;
  });
  return {
    GetTreasuryDebitReversals,
    PostTreasuryDebitReversals,
    GetTreasuryDebitReversalsDebitReversal,
  };
});
