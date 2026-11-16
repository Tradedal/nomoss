// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripetreasury_credit_reversal } from "./models/treasury.js";

export type GetTreasuryCreditReversalsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly limit?: number;
  readonly received_credit?: string;
  readonly starting_after?: string;
  readonly status?: "canceled" | "posted" | "processing";
};
export type GetTreasuryCreditReversalsOutput = {
  readonly data: ReadonlyArray<Stripetreasury_credit_reversal>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTreasuryCreditReversalsError = Stripeerror;
export type PostTreasuryCreditReversalsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly received_credit: string;
};
export type PostTreasuryCreditReversalsOutput = Stripetreasury_credit_reversal;
export type PostTreasuryCreditReversalsError = Stripeerror;
export type GetTreasuryCreditReversalsCreditReversalInput = {
  readonly credit_reversal: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetTreasuryCreditReversalsCreditReversalOutput =
  Stripetreasury_credit_reversal;
export type GetTreasuryCreditReversalsCreditReversalError = Stripeerror;

export const GetTreasuryCreditReversalsInput = Schema.Struct({
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
  received_credit: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(["canceled", "posted", "processing"]),
  ),
});
export const GetTreasuryCreditReversalsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetreasury_credit_reversal).annotate({
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
  title: "TreasuryReceivedCreditsResourceCreditReversalList",
  description: "",
});
export const GetTreasuryCreditReversalsError = Stripeerror;
export const PostTreasuryCreditReversalsInput = Schema.Struct({
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
  received_credit: Schema.String.annotate({
    description: "The ReceivedCredit to reverse.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTreasuryCreditReversalsOutput = Stripetreasury_credit_reversal;
export const PostTreasuryCreditReversalsError = Stripeerror;
export const GetTreasuryCreditReversalsCreditReversalInput = Schema.Struct({
  credit_reversal: Schema.String.check(
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
export const GetTreasuryCreditReversalsCreditReversalOutput =
  Stripetreasury_credit_reversal;
export const GetTreasuryCreditReversalsCreditReversalError = Stripeerror;
/**
 * The GetTreasuryCreditReversalsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryCreditReversalsOperation: StripeOperation & {
  readonly input: typeof GetTreasuryCreditReversalsInput;
  readonly output: typeof GetTreasuryCreditReversalsOutput;
  readonly error: typeof GetTreasuryCreditReversalsError;
} = {
  name: "GetTreasuryCreditReversals",
  method: "GET",
  path: "/v1/treasury/credit_reversals",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "financial_account",
    "limit",
    "received_credit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryCreditReversalsInput,
  output: GetTreasuryCreditReversalsOutput,
  error: GetTreasuryCreditReversalsError,
};
/**
 * The PostTreasuryCreditReversalsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryCreditReversalsOperation: StripeOperation & {
  readonly input: typeof PostTreasuryCreditReversalsInput;
  readonly output: typeof PostTreasuryCreditReversalsOutput;
  readonly error: typeof PostTreasuryCreditReversalsError;
} = {
  name: "PostTreasuryCreditReversals",
  method: "POST",
  path: "/v1/treasury/credit_reversals",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryCreditReversalsInput,
  output: PostTreasuryCreditReversalsOutput,
  error: PostTreasuryCreditReversalsError,
};
/**
 * The GetTreasuryCreditReversalsCreditReversalOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryCreditReversalsCreditReversalOperation: StripeOperation & {
  readonly input: typeof GetTreasuryCreditReversalsCreditReversalInput;
  readonly output: typeof GetTreasuryCreditReversalsCreditReversalOutput;
  readonly error: typeof GetTreasuryCreditReversalsCreditReversalError;
} = {
  name: "GetTreasuryCreditReversalsCreditReversal",
  method: "GET",
  path: "/v1/treasury/credit_reversals/{credit_reversal}",
  pathParameters: ["credit_reversal"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryCreditReversalsCreditReversalInput,
  output: GetTreasuryCreditReversalsCreditReversalOutput,
  error: GetTreasuryCreditReversalsCreditReversalError,
};
/**
 * The makeTreasuryCreditReversalsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTreasuryCreditReversalsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTreasuryCreditReversals function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryCreditReversals = Effect.fn(
    "treasuryCreditReversals.GetTreasuryCreditReversals",
  )(function* (input: GetTreasuryCreditReversalsInput) {
    const response: GetTreasuryCreditReversalsOutput = yield* client.invoke(
      GetTreasuryCreditReversalsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryCreditReversals function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryCreditReversals = Effect.fn(
    "treasuryCreditReversals.PostTreasuryCreditReversals",
  )(function* (input: PostTreasuryCreditReversalsInput) {
    const response: PostTreasuryCreditReversalsOutput = yield* client.invoke(
      PostTreasuryCreditReversalsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTreasuryCreditReversalsCreditReversal function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryCreditReversalsCreditReversal = Effect.fn(
    "treasuryCreditReversals.GetTreasuryCreditReversalsCreditReversal",
  )(function* (input: GetTreasuryCreditReversalsCreditReversalInput) {
    const response: GetTreasuryCreditReversalsCreditReversalOutput =
      yield* client.invoke(
        GetTreasuryCreditReversalsCreditReversalOperation,
        input,
      );
    return response;
  });
  return {
    GetTreasuryCreditReversals,
    PostTreasuryCreditReversals,
    GetTreasuryCreditReversalsCreditReversal,
  };
});
