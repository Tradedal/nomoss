// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_core_vault_gb_bank_account } from "./models/v2Accounts.js";
import {
  Stripev2_error,
  Stripev2_error_blocked_gb_bank_account,
  Stripev2_error_default_gb_bank_account_cannot_be_archived,
  Stripev2_error_gb_bank_account_cannot_be_archived,
  Stripev2_error_gb_bank_account_cannot_be_unarchived,
  Stripev2_error_gb_bank_account_incompatible_currency,
  Stripev2_error_gb_bank_account_unsupported_currency,
  Stripev2_error_idempotency_error,
  Stripev2_error_invalid_gb_bank_account,
  Stripev2_error_limit_gb_bank_account,
  Stripev2_error_not_found,
  Stripev2_error_unsupported_gb_bank,
} from "./models/v2Errors.js";

export type GetV2CoreVaultGbBankAccountsInput = {
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2CoreVaultGbBankAccountsOutput = {
  readonly data: ReadonlyArray<Stripev2_core_vault_gb_bank_account>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2CoreVaultGbBankAccountsError = Stripev2_error;
export type PostV2CoreVaultGbBankAccountsInput = {
  readonly account_number?: string;
  readonly bank_account_type?: "checking" | "savings";
  readonly currency: string;
  readonly iban?: string;
  readonly sort_code?: string;
};
export type PostV2CoreVaultGbBankAccountsOutput =
  Stripev2_core_vault_gb_bank_account;
export type PostV2CoreVaultGbBankAccountsError =
  | Stripev2_error_blocked_gb_bank_account
  | Stripev2_error_gb_bank_account_incompatible_currency
  | Stripev2_error_gb_bank_account_unsupported_currency
  | Stripev2_error_idempotency_error
  | Stripev2_error_invalid_gb_bank_account
  | Stripev2_error_limit_gb_bank_account
  | Stripev2_error_not_found
  | Stripev2_error_unsupported_gb_bank
  | Stripev2_error;
export type GetV2CoreVaultGbBankAccountsIdInput = { readonly id: string };
export type GetV2CoreVaultGbBankAccountsIdOutput =
  Stripev2_core_vault_gb_bank_account;
export type GetV2CoreVaultGbBankAccountsIdError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2CoreVaultGbBankAccountsIdArchiveInput = {
  readonly id: string;
};
export type PostV2CoreVaultGbBankAccountsIdArchiveOutput =
  Stripev2_core_vault_gb_bank_account;
export type PostV2CoreVaultGbBankAccountsIdArchiveError =
  | Stripev2_error_default_gb_bank_account_cannot_be_archived
  | Stripev2_error_gb_bank_account_cannot_be_archived
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2CoreVaultGbBankAccountsIdUnarchiveInput = {
  readonly id: string;
};
export type PostV2CoreVaultGbBankAccountsIdUnarchiveOutput =
  Stripev2_core_vault_gb_bank_account;
export type PostV2CoreVaultGbBankAccountsIdUnarchiveError =
  | Stripev2_error_gb_bank_account_cannot_be_unarchived
  | Stripev2_error_not_found
  | Stripev2_error;

export const GetV2CoreVaultGbBankAccountsInput = Schema.Struct({
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2CoreVaultGbBankAccountsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_core_vault_gb_bank_account).annotate({
      description: "The retrieved GB Bank Accounts.",
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
export const GetV2CoreVaultGbBankAccountsError = Schema.Union(
  [Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreVaultGbBankAccountsInput = Schema.Struct({
  account_number: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Account Number of the bank account.",
    }),
  ),
  bank_account_type: Schema.optionalKey(
    Schema.Literals(["checking", "savings"]).annotate({
      description:
        "Closed Enum. The type of the bank account (checking or savings).",
    }),
  ),
  currency: Schema.String.annotate({
    description: "The currency of the bank account.",
  }),
  iban: Schema.optionalKey(
    Schema.String.annotate({ description: "The IBAN of the bank account." }),
  ),
  sort_code: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Sort Code of the bank account.",
    }),
  ),
});
export const PostV2CoreVaultGbBankAccountsOutput =
  Stripev2_core_vault_gb_bank_account;
export const PostV2CoreVaultGbBankAccountsError = Schema.Union(
  [
    Stripev2_error_blocked_gb_bank_account,
    Stripev2_error_gb_bank_account_incompatible_currency,
    Stripev2_error_gb_bank_account_unsupported_currency,
    Stripev2_error_idempotency_error,
    Stripev2_error_invalid_gb_bank_account,
    Stripev2_error_limit_gb_bank_account,
    Stripev2_error_not_found,
    Stripev2_error_unsupported_gb_bank,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2CoreVaultGbBankAccountsIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2CoreVaultGbBankAccountsIdOutput =
  Stripev2_core_vault_gb_bank_account;
export const GetV2CoreVaultGbBankAccountsIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreVaultGbBankAccountsIdArchiveInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2CoreVaultGbBankAccountsIdArchiveOutput =
  Stripev2_core_vault_gb_bank_account;
export const PostV2CoreVaultGbBankAccountsIdArchiveError = Schema.Union(
  [
    Stripev2_error_default_gb_bank_account_cannot_be_archived,
    Stripev2_error_gb_bank_account_cannot_be_archived,
    Stripev2_error_not_found,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreVaultGbBankAccountsIdUnarchiveInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2CoreVaultGbBankAccountsIdUnarchiveOutput =
  Stripev2_core_vault_gb_bank_account;
export const PostV2CoreVaultGbBankAccountsIdUnarchiveError = Schema.Union(
  [
    Stripev2_error_gb_bank_account_cannot_be_unarchived,
    Stripev2_error_not_found,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
/**
 * The GetV2CoreVaultGbBankAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreVaultGbBankAccountsOperation: StripeOperation & {
  readonly input: typeof GetV2CoreVaultGbBankAccountsInput;
  readonly output: typeof GetV2CoreVaultGbBankAccountsOutput;
  readonly error: typeof GetV2CoreVaultGbBankAccountsError;
} = {
  name: "GetV2CoreVaultGbBankAccounts",
  method: "GET",
  path: "/v2/core/vault/gb_bank_accounts",
  pathParameters: [],
  queryParameters: ["limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreVaultGbBankAccountsInput,
  output: GetV2CoreVaultGbBankAccountsOutput,
  error: GetV2CoreVaultGbBankAccountsError,
};
/**
 * The PostV2CoreVaultGbBankAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultGbBankAccountsOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultGbBankAccountsInput;
  readonly output: typeof PostV2CoreVaultGbBankAccountsOutput;
  readonly error: typeof PostV2CoreVaultGbBankAccountsError;
} = {
  name: "PostV2CoreVaultGbBankAccounts",
  method: "POST",
  path: "/v2/core/vault/gb_bank_accounts",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultGbBankAccountsInput,
  output: PostV2CoreVaultGbBankAccountsOutput,
  error: PostV2CoreVaultGbBankAccountsError,
};
/**
 * The GetV2CoreVaultGbBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreVaultGbBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof GetV2CoreVaultGbBankAccountsIdInput;
  readonly output: typeof GetV2CoreVaultGbBankAccountsIdOutput;
  readonly error: typeof GetV2CoreVaultGbBankAccountsIdError;
} = {
  name: "GetV2CoreVaultGbBankAccountsId",
  method: "GET",
  path: "/v2/core/vault/gb_bank_accounts/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreVaultGbBankAccountsIdInput,
  output: GetV2CoreVaultGbBankAccountsIdOutput,
  error: GetV2CoreVaultGbBankAccountsIdError,
};
/**
 * The PostV2CoreVaultGbBankAccountsIdArchiveOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultGbBankAccountsIdArchiveOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultGbBankAccountsIdArchiveInput;
  readonly output: typeof PostV2CoreVaultGbBankAccountsIdArchiveOutput;
  readonly error: typeof PostV2CoreVaultGbBankAccountsIdArchiveError;
} = {
  name: "PostV2CoreVaultGbBankAccountsIdArchive",
  method: "POST",
  path: "/v2/core/vault/gb_bank_accounts/{id}/archive",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultGbBankAccountsIdArchiveInput,
  output: PostV2CoreVaultGbBankAccountsIdArchiveOutput,
  error: PostV2CoreVaultGbBankAccountsIdArchiveError,
};
/**
 * The PostV2CoreVaultGbBankAccountsIdUnarchiveOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultGbBankAccountsIdUnarchiveOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultGbBankAccountsIdUnarchiveInput;
  readonly output: typeof PostV2CoreVaultGbBankAccountsIdUnarchiveOutput;
  readonly error: typeof PostV2CoreVaultGbBankAccountsIdUnarchiveError;
} = {
  name: "PostV2CoreVaultGbBankAccountsIdUnarchive",
  method: "POST",
  path: "/v2/core/vault/gb_bank_accounts/{id}/unarchive",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultGbBankAccountsIdUnarchiveInput,
  output: PostV2CoreVaultGbBankAccountsIdUnarchiveOutput,
  error: PostV2CoreVaultGbBankAccountsIdUnarchiveError,
};
/**
 * The makeCoreVaultGbBankAccountsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeCoreVaultGbBankAccountsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetV2CoreVaultGbBankAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreVaultGbBankAccounts = Effect.fn(
    "coreVaultGbBankAccounts.GetV2CoreVaultGbBankAccounts",
  )(function* (input: GetV2CoreVaultGbBankAccountsInput) {
    const response: GetV2CoreVaultGbBankAccountsOutput = yield* client.invoke(
      GetV2CoreVaultGbBankAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostV2CoreVaultGbBankAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultGbBankAccounts = Effect.fn(
    "coreVaultGbBankAccounts.PostV2CoreVaultGbBankAccounts",
  )(function* (input: PostV2CoreVaultGbBankAccountsInput) {
    const response: PostV2CoreVaultGbBankAccountsOutput = yield* client.invoke(
      PostV2CoreVaultGbBankAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetV2CoreVaultGbBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreVaultGbBankAccountsId = Effect.fn(
    "coreVaultGbBankAccounts.GetV2CoreVaultGbBankAccountsId",
  )(function* (input: GetV2CoreVaultGbBankAccountsIdInput) {
    const response: GetV2CoreVaultGbBankAccountsIdOutput = yield* client.invoke(
      GetV2CoreVaultGbBankAccountsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostV2CoreVaultGbBankAccountsIdArchive function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultGbBankAccountsIdArchive = Effect.fn(
    "coreVaultGbBankAccounts.PostV2CoreVaultGbBankAccountsIdArchive",
  )(function* (input: PostV2CoreVaultGbBankAccountsIdArchiveInput) {
    const response: PostV2CoreVaultGbBankAccountsIdArchiveOutput =
      yield* client.invoke(
        PostV2CoreVaultGbBankAccountsIdArchiveOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2CoreVaultGbBankAccountsIdUnarchive function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultGbBankAccountsIdUnarchive = Effect.fn(
    "coreVaultGbBankAccounts.PostV2CoreVaultGbBankAccountsIdUnarchive",
  )(function* (input: PostV2CoreVaultGbBankAccountsIdUnarchiveInput) {
    const response: PostV2CoreVaultGbBankAccountsIdUnarchiveOutput =
      yield* client.invoke(
        PostV2CoreVaultGbBankAccountsIdUnarchiveOperation,
        input,
      );
    return response;
  });
  return {
    GetV2CoreVaultGbBankAccounts,
    PostV2CoreVaultGbBankAccounts,
    GetV2CoreVaultGbBankAccountsId,
    PostV2CoreVaultGbBankAccountsIdArchive,
    PostV2CoreVaultGbBankAccountsIdUnarchive,
  };
});
