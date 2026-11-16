// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_money_management_financial_address } from "./models/common.js";
import {
  Stripev2_error,
  Stripev2_error_financial_account_balance_does_not_support_currency,
  Stripev2_error_financial_account_capability_not_enabled,
  Stripev2_error_financial_account_capability_restricted,
  Stripev2_error_financial_account_feature_restricted,
  Stripev2_error_financial_account_not_in_open_status,
  Stripev2_error_financial_account_operation_unsupported_for_property,
  Stripev2_error_financial_account_operation_unsupported_for_type,
  Stripev2_error_financial_account_unsupported_currency,
  Stripev2_error_financial_account_unsupported_type,
  Stripev2_error_financial_address_account_unsupported_configuration,
  Stripev2_error_financial_address_invalid_page_token,
  Stripev2_error_financial_address_type_and_settlement_currency_pair_unsupported,
  Stripev2_error_financial_addresses_creation_limit_exceeded,
  Stripev2_error_idempotency_error,
  Stripev2_error_not_found,
  Stripev2_error_storer_capability_missing,
  Stripev2_error_storer_capability_not_active,
  Stripev2_error_unsupported_country_for_bank_account_financial_address,
  Stripev2_error_unsupported_crypto_wallet_settlement_currency,
  Stripev2_error_unsupported_currency,
  Stripev2_error_unsupported_operation_with_managed_financial_account,
} from "./models/v2Errors.js";

export type GetV2MoneyManagementFinancialAddressesInput = {
  readonly financial_account?: string;
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2MoneyManagementFinancialAddressesOutput = {
  readonly data: ReadonlyArray<Stripev2_money_management_financial_address>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2MoneyManagementFinancialAddressesError =
  | Stripev2_error_financial_address_invalid_page_token
  | Stripev2_error;
export type PostV2MoneyManagementFinancialAddressesInput = {
  readonly bank_account?: {
    readonly country?: string;
    readonly currency: "eur" | "gbp" | "usd";
  } & { readonly [x: string]: Schema.Json };
  readonly financial_account: string;
  readonly type: "bank_account";
};
export type PostV2MoneyManagementFinancialAddressesOutput =
  Stripev2_money_management_financial_address;
export type PostV2MoneyManagementFinancialAddressesError =
  | Stripev2_error_financial_account_balance_does_not_support_currency
  | Stripev2_error_financial_account_capability_not_enabled
  | Stripev2_error_financial_account_capability_restricted
  | Stripev2_error_financial_account_feature_restricted
  | Stripev2_error_financial_account_not_in_open_status
  | Stripev2_error_financial_account_operation_unsupported_for_property
  | Stripev2_error_financial_account_operation_unsupported_for_type
  | Stripev2_error_financial_account_unsupported_currency
  | Stripev2_error_financial_account_unsupported_type
  | Stripev2_error_financial_address_account_unsupported_configuration
  | Stripev2_error_financial_address_type_and_settlement_currency_pair_unsupported
  | Stripev2_error_financial_addresses_creation_limit_exceeded
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error_storer_capability_missing
  | Stripev2_error_storer_capability_not_active
  | Stripev2_error_unsupported_country_for_bank_account_financial_address
  | Stripev2_error_unsupported_crypto_wallet_settlement_currency
  | Stripev2_error_unsupported_currency
  | Stripev2_error_unsupported_operation_with_managed_financial_account
  | Stripev2_error;
export type GetV2MoneyManagementFinancialAddressesIdInput = {
  readonly id: string;
};
export type GetV2MoneyManagementFinancialAddressesIdOutput =
  Stripev2_money_management_financial_address;
export type GetV2MoneyManagementFinancialAddressesIdError =
  | Stripev2_error_not_found
  | Stripev2_error;

export const GetV2MoneyManagementFinancialAddressesInput = Schema.Struct({
  financial_account: Schema.optionalKey(Schema.String),
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2MoneyManagementFinancialAddressesOutput =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.Array(Stripev2_money_management_financial_address).annotate({
        description: "A list of FinancialAddresses.",
      }),
      next_page_url: Schema.Union([
        Schema.String.annotate({
          description:
            "URL to fetch the next page of the list. If there are no more pages, the value is null.",
        }),
        Schema.Null,
      ]),
      previous_page_url: Schema.Union([
        Schema.String.annotate({
          description:
            "URL to fetch the previous page of the list. If there are no previous pages, the value is null.",
        }),
        Schema.Null,
      ]),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  );
export const GetV2MoneyManagementFinancialAddressesError = Schema.Union(
  [Stripev2_error_financial_address_invalid_page_token, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementFinancialAddressesInput = Schema.Struct({
  bank_account: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        country: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The country for the bank account. Used to select the appropriate rails (e.g. for SEPA).",
          }),
        ),
        currency: Schema.Literals(["eur", "gbp", "usd"]).annotate({
          description:
            "The currency of the bank account to provision. Available currencies depend on your account's enabled features and rollout access; `eur` requires the Financial Address Global Payouts EU preview.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      description: "Properties for creating a bank account FinancialAddress.",
    }),
  ),
  financial_account: Schema.String.annotate({
    description:
      "The ID of the FinancialAccount the new FinancialAddress should be associated with.",
  }),
  type: Schema.Literal("bank_account").annotate({
    description:
      "The type of FinancialAddress to create. Must agree with which branch of financial_address_type_properties is set.",
  }),
});
export const PostV2MoneyManagementFinancialAddressesOutput =
  Stripev2_money_management_financial_address;
export const PostV2MoneyManagementFinancialAddressesError = Schema.Union(
  [
    Stripev2_error_financial_account_balance_does_not_support_currency,
    Stripev2_error_financial_account_capability_not_enabled,
    Stripev2_error_financial_account_capability_restricted,
    Stripev2_error_financial_account_feature_restricted,
    Stripev2_error_financial_account_not_in_open_status,
    Stripev2_error_financial_account_operation_unsupported_for_property,
    Stripev2_error_financial_account_operation_unsupported_for_type,
    Stripev2_error_financial_account_unsupported_currency,
    Stripev2_error_financial_account_unsupported_type,
    Stripev2_error_financial_address_account_unsupported_configuration,
    Stripev2_error_financial_address_type_and_settlement_currency_pair_unsupported,
    Stripev2_error_financial_addresses_creation_limit_exceeded,
    Stripev2_error_idempotency_error,
    Stripev2_error_not_found,
    Stripev2_error_storer_capability_missing,
    Stripev2_error_storer_capability_not_active,
    Stripev2_error_unsupported_country_for_bank_account_financial_address,
    Stripev2_error_unsupported_crypto_wallet_settlement_currency,
    Stripev2_error_unsupported_currency,
    Stripev2_error_unsupported_operation_with_managed_financial_account,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2MoneyManagementFinancialAddressesIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2MoneyManagementFinancialAddressesIdOutput =
  Stripev2_money_management_financial_address;
export const GetV2MoneyManagementFinancialAddressesIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
/**
 * The GetV2MoneyManagementFinancialAddressesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementFinancialAddressesOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementFinancialAddressesInput;
  readonly output: typeof GetV2MoneyManagementFinancialAddressesOutput;
  readonly error: typeof GetV2MoneyManagementFinancialAddressesError;
} = {
  name: "GetV2MoneyManagementFinancialAddresses",
  method: "GET",
  path: "/v2/money_management/financial_addresses",
  pathParameters: [],
  queryParameters: ["financial_account", "limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementFinancialAddressesInput,
  output: GetV2MoneyManagementFinancialAddressesOutput,
  error: GetV2MoneyManagementFinancialAddressesError,
};
/**
 * The PostV2MoneyManagementFinancialAddressesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementFinancialAddressesOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementFinancialAddressesInput;
  readonly output: typeof PostV2MoneyManagementFinancialAddressesOutput;
  readonly error: typeof PostV2MoneyManagementFinancialAddressesError;
} = {
  name: "PostV2MoneyManagementFinancialAddresses",
  method: "POST",
  path: "/v2/money_management/financial_addresses",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementFinancialAddressesInput,
  output: PostV2MoneyManagementFinancialAddressesOutput,
  error: PostV2MoneyManagementFinancialAddressesError,
};
/**
 * The GetV2MoneyManagementFinancialAddressesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementFinancialAddressesIdOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementFinancialAddressesIdInput;
  readonly output: typeof GetV2MoneyManagementFinancialAddressesIdOutput;
  readonly error: typeof GetV2MoneyManagementFinancialAddressesIdError;
} = {
  name: "GetV2MoneyManagementFinancialAddressesId",
  method: "GET",
  path: "/v2/money_management/financial_addresses/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementFinancialAddressesIdInput,
  output: GetV2MoneyManagementFinancialAddressesIdOutput,
  error: GetV2MoneyManagementFinancialAddressesIdError,
};
/**
 * The makeMoneyManagementFinancialAddressesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeMoneyManagementFinancialAddressesClient = Effect.gen(
  function* () {
    const client = yield* StripeClient;
    /**
     * The GetV2MoneyManagementFinancialAddresses function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementFinancialAddresses = Effect.fn(
      "moneyManagementFinancialAddresses.GetV2MoneyManagementFinancialAddresses",
    )(function* (input: GetV2MoneyManagementFinancialAddressesInput) {
      const response: GetV2MoneyManagementFinancialAddressesOutput =
        yield* client.invoke(
          GetV2MoneyManagementFinancialAddressesOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementFinancialAddresses function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementFinancialAddresses = Effect.fn(
      "moneyManagementFinancialAddresses.PostV2MoneyManagementFinancialAddresses",
    )(function* (input: PostV2MoneyManagementFinancialAddressesInput) {
      const response: PostV2MoneyManagementFinancialAddressesOutput =
        yield* client.invoke(
          PostV2MoneyManagementFinancialAddressesOperation,
          input,
        );
      return response;
    });
    /**
     * The GetV2MoneyManagementFinancialAddressesId function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementFinancialAddressesId = Effect.fn(
      "moneyManagementFinancialAddresses.GetV2MoneyManagementFinancialAddressesId",
    )(function* (input: GetV2MoneyManagementFinancialAddressesIdInput) {
      const response: GetV2MoneyManagementFinancialAddressesIdOutput =
        yield* client.invoke(
          GetV2MoneyManagementFinancialAddressesIdOperation,
          input,
        );
      return response;
    });
    return {
      GetV2MoneyManagementFinancialAddresses,
      PostV2MoneyManagementFinancialAddresses,
      GetV2MoneyManagementFinancialAddressesId,
    };
  },
);
