// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripeerror,
  Stripefinancial_connections_session,
} from "./models/common.js";

export type PostFinancialConnectionsSessionsInput = {
  readonly account_holder: {
    readonly account?: string;
    readonly customer?: string;
    readonly customer_account?: string;
    readonly type: "account" | "customer";
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly filters?: {
    readonly account_subcategories?: ReadonlyArray<
      "checking" | "credit_card" | "line_of_credit" | "mortgage" | "savings"
    >;
    readonly country?: string;
    readonly require_payment_method_support?: "all" | "at_least_one" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly limits?: { readonly accounts: number | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly manual_entry?: { readonly mode?: "automatic" | "disabled" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly permissions: ReadonlyArray<
    "balances" | "ownership" | "payment_method" | "transactions"
  >;
  readonly prefetch?: ReadonlyArray<"balances" | "ownership" | "transactions">;
  readonly return_url?: string;
};
export type PostFinancialConnectionsSessionsOutput =
  Stripefinancial_connections_session;
export type PostFinancialConnectionsSessionsError = Stripeerror;
export type GetFinancialConnectionsSessionsSessionInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly session: string;
};
export type GetFinancialConnectionsSessionsSessionOutput =
  Stripefinancial_connections_session;
export type GetFinancialConnectionsSessionsSessionError = Stripeerror;

export const PostFinancialConnectionsSessionsInput = Schema.Struct({
  account_holder: Schema.StructWithRest(
    Schema.Struct({
      account: Schema.optionalKey(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
      type: Schema.Literals(["account", "customer"]),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "accountholder_params",
    description: "The account holder to link accounts for.",
  }),
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
  filters: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_subcategories: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "checking",
              "credit_card",
              "line_of_credit",
              "mortgage",
              "savings",
            ]),
          ),
        ),
        country: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        require_payment_method_support: Schema.optionalKey(
          Schema.Literals(["all", "at_least_one", "none"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "filters_params",
      description: "Filters to restrict the kinds of accounts to collect.",
    }),
  ),
  limits: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        accounts: Schema.Union([Schema.Int, Schema.Literal("")]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "limits_params",
      description: "Settings for configuring Session-specific limits.",
    }),
  ),
  manual_entry: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        mode: Schema.optionalKey(Schema.Literals(["automatic", "disabled"])),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "manual_entry_params",
      description: "Customize manual entry behavior",
    }),
  ),
  permissions: Schema.Array(
    Schema.Literals([
      "balances",
      "ownership",
      "payment_method",
      "transactions",
    ]),
  ).annotate({
    description:
      "List of data features that you would like to request access to.\n\nPossible values are `balances`, `transactions`, `ownership`, and `payment_method`.",
  }),
  prefetch: Schema.optionalKey(
    Schema.Array(
      Schema.Literals(["balances", "ownership", "transactions"]),
    ).annotate({
      description:
        "List of data features that you would like to retrieve upon account creation.",
    }),
  ),
  return_url: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For webview integrations only. Upon completing OAuth login in the native browser, the user will be redirected to this URL to return to your app.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const PostFinancialConnectionsSessionsOutput =
  Stripefinancial_connections_session;
export const PostFinancialConnectionsSessionsError = Stripeerror;
export const GetFinancialConnectionsSessionsSessionInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  session: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetFinancialConnectionsSessionsSessionOutput =
  Stripefinancial_connections_session;
export const GetFinancialConnectionsSessionsSessionError = Stripeerror;
/**
 * The PostFinancialConnectionsSessionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostFinancialConnectionsSessionsOperation: StripeOperation & {
  readonly input: typeof PostFinancialConnectionsSessionsInput;
  readonly output: typeof PostFinancialConnectionsSessionsOutput;
  readonly error: typeof PostFinancialConnectionsSessionsError;
} = {
  name: "PostFinancialConnectionsSessions",
  method: "POST",
  path: "/v1/financial_connections/sessions",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostFinancialConnectionsSessionsInput,
  output: PostFinancialConnectionsSessionsOutput,
  error: PostFinancialConnectionsSessionsError,
};
/**
 * The GetFinancialConnectionsSessionsSessionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetFinancialConnectionsSessionsSessionOperation: StripeOperation & {
  readonly input: typeof GetFinancialConnectionsSessionsSessionInput;
  readonly output: typeof GetFinancialConnectionsSessionsSessionOutput;
  readonly error: typeof GetFinancialConnectionsSessionsSessionError;
} = {
  name: "GetFinancialConnectionsSessionsSession",
  method: "GET",
  path: "/v1/financial_connections/sessions/{session}",
  pathParameters: ["session"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetFinancialConnectionsSessionsSessionInput,
  output: GetFinancialConnectionsSessionsSessionOutput,
  error: GetFinancialConnectionsSessionsSessionError,
};
/**
 * The makeFinancialConnectionsSessionsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeFinancialConnectionsSessionsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The PostFinancialConnectionsSessions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostFinancialConnectionsSessions = Effect.fn(
    "financialConnectionsSessions.PostFinancialConnectionsSessions",
  )(function* (input: PostFinancialConnectionsSessionsInput) {
    const response: PostFinancialConnectionsSessionsOutput =
      yield* client.invoke(PostFinancialConnectionsSessionsOperation, input);
    return response;
  });
  /**
   * The GetFinancialConnectionsSessionsSession function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetFinancialConnectionsSessionsSession = Effect.fn(
    "financialConnectionsSessions.GetFinancialConnectionsSessionsSession",
  )(function* (input: GetFinancialConnectionsSessionsSessionInput) {
    const response: GetFinancialConnectionsSessionsSessionOutput =
      yield* client.invoke(
        GetFinancialConnectionsSessionsSessionOperation,
        input,
      );
    return response;
  });
  return {
    PostFinancialConnectionsSessions,
    GetFinancialConnectionsSessionsSession,
  };
});
