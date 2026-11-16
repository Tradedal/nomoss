// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_core_vault_us_bank_account } from "./models/v2Accounts.js";
import {
  Stripev2_error,
  Stripev2_error_archived_us_bank_account,
  Stripev2_error_blocked_us_bank_account,
  Stripev2_error_default_us_bank_account_cannot_be_archived,
  Stripev2_error_idempotency_error,
  Stripev2_error_invalid_us_bank_account,
  Stripev2_error_invalid_verification_status,
  Stripev2_error_limit_us_bank_account,
  Stripev2_error_not_found,
  Stripev2_error_unsupported_us_bank,
  Stripev2_error_us_bank_account_cannot_be_archived,
  Stripev2_error_us_bank_account_cannot_be_unarchived,
  Stripev2_error_us_bank_account_confirm_microdeposits_failure,
  Stripev2_error_us_bank_account_field_already_exists,
  Stripev2_error_us_bank_account_incompatible_currency,
  Stripev2_error_us_bank_account_microdeposits_cannot_be_confirmed,
  Stripev2_error_us_bank_account_microdeposits_cannot_be_sent,
  Stripev2_error_us_bank_account_microdeposits_failed_to_send,
  Stripev2_error_us_bank_account_microdeposits_not_sent_before_confirming,
  Stripev2_error_us_bank_account_microdeposits_requires_routing_number,
  Stripev2_error_us_bank_account_microdeposits_timed_out,
  Stripev2_error_us_bank_account_unsupported_currency,
  Stripev2_error_us_bank_account_verification_failed,
} from "./models/v2Errors.js";

export type GetV2CoreVaultUsBankAccountsInput = {
  readonly limit?: number;
  readonly page?: string;
  readonly verification_status?:
    | "awaiting_verification"
    | "unverified"
    | "verification_failed"
    | "verified";
};
export type GetV2CoreVaultUsBankAccountsOutput = {
  readonly data: ReadonlyArray<Stripev2_core_vault_us_bank_account>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2CoreVaultUsBankAccountsError =
  | Stripev2_error_invalid_verification_status
  | Stripev2_error;
export type PostV2CoreVaultUsBankAccountsInput = {
  readonly account_number: string;
  readonly bank_account_type?: "checking" | "savings";
  readonly currency: string;
  readonly fedwire_routing_number?: string;
  readonly routing_number?: string;
};
export type PostV2CoreVaultUsBankAccountsOutput =
  Stripev2_core_vault_us_bank_account;
export type PostV2CoreVaultUsBankAccountsError =
  | Stripev2_error_blocked_us_bank_account
  | Stripev2_error_idempotency_error
  | Stripev2_error_invalid_us_bank_account
  | Stripev2_error_limit_us_bank_account
  | Stripev2_error_unsupported_us_bank
  | Stripev2_error_us_bank_account_incompatible_currency
  | Stripev2_error_us_bank_account_unsupported_currency
  | Stripev2_error;
export type GetV2CoreVaultUsBankAccountsIdInput = { readonly id: string };
export type GetV2CoreVaultUsBankAccountsIdOutput =
  Stripev2_core_vault_us_bank_account;
export type GetV2CoreVaultUsBankAccountsIdError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2CoreVaultUsBankAccountsIdInput = {
  readonly fedwire_routing_number?: string;
  readonly routing_number?: string;
  readonly id: string;
};
export type PostV2CoreVaultUsBankAccountsIdOutput =
  Stripev2_core_vault_us_bank_account;
export type PostV2CoreVaultUsBankAccountsIdError =
  | Stripev2_error_archived_us_bank_account
  | Stripev2_error_blocked_us_bank_account
  | Stripev2_error_idempotency_error
  | Stripev2_error_invalid_us_bank_account
  | Stripev2_error_limit_us_bank_account
  | Stripev2_error_not_found
  | Stripev2_error_unsupported_us_bank
  | Stripev2_error_us_bank_account_field_already_exists
  | Stripev2_error_us_bank_account_incompatible_currency
  | Stripev2_error;
export type PostV2CoreVaultUsBankAccountsIdArchiveInput = {
  readonly id: string;
};
export type PostV2CoreVaultUsBankAccountsIdArchiveOutput =
  Stripev2_core_vault_us_bank_account;
export type PostV2CoreVaultUsBankAccountsIdArchiveError =
  | Stripev2_error_default_us_bank_account_cannot_be_archived
  | Stripev2_error_not_found
  | Stripev2_error_us_bank_account_cannot_be_archived
  | Stripev2_error;
export type PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsInput = {
  readonly amounts?: ReadonlyArray<number>;
  readonly descriptor_code?: string;
  readonly id: string;
};
export type PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOutput =
  Stripev2_core_vault_us_bank_account;
export type PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsError =
  | Stripev2_error_archived_us_bank_account
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error_us_bank_account_confirm_microdeposits_failure
  | Stripev2_error_us_bank_account_microdeposits_cannot_be_confirmed
  | Stripev2_error_us_bank_account_microdeposits_not_sent_before_confirming
  | Stripev2_error_us_bank_account_microdeposits_timed_out
  | Stripev2_error_us_bank_account_verification_failed
  | Stripev2_error;
export type PostV2CoreVaultUsBankAccountsIdSendMicrodepositsInput = {
  readonly id: string;
};
export type PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOutput =
  Stripev2_core_vault_us_bank_account;
export type PostV2CoreVaultUsBankAccountsIdSendMicrodepositsError =
  | Stripev2_error_archived_us_bank_account
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error_us_bank_account_microdeposits_cannot_be_sent
  | Stripev2_error_us_bank_account_microdeposits_failed_to_send
  | Stripev2_error_us_bank_account_microdeposits_requires_routing_number
  | Stripev2_error_us_bank_account_verification_failed
  | Stripev2_error;
export type PostV2CoreVaultUsBankAccountsIdUnarchiveInput = {
  readonly id: string;
};
export type PostV2CoreVaultUsBankAccountsIdUnarchiveOutput =
  Stripev2_core_vault_us_bank_account;
export type PostV2CoreVaultUsBankAccountsIdUnarchiveError =
  | Stripev2_error_not_found
  | Stripev2_error_us_bank_account_cannot_be_unarchived
  | Stripev2_error;

export const GetV2CoreVaultUsBankAccountsInput = Schema.Struct({
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
  verification_status: Schema.optionalKey(
    Schema.Literals([
      "awaiting_verification",
      "unverified",
      "verification_failed",
      "verified",
    ]),
  ),
});
export const GetV2CoreVaultUsBankAccountsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_core_vault_us_bank_account).annotate({
      description: "The retrieved US Bank Accounts.",
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
export const GetV2CoreVaultUsBankAccountsError = Schema.Union(
  [Stripev2_error_invalid_verification_status, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreVaultUsBankAccountsInput = Schema.Struct({
  account_number: Schema.String.annotate({
    description: "The account number of the bank account.",
  }),
  bank_account_type: Schema.optionalKey(
    Schema.Literals(["checking", "savings"]).annotate({
      description:
        "Closed Enum. The type of the bank account (checking or savings).",
    }),
  ),
  currency: Schema.String.annotate({
    description: "The currency of the bank account.",
  }),
  fedwire_routing_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The fedwire routing number of the bank account. Note that certain banks have the same ACH and wire routing number.",
    }),
  ),
  routing_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ACH routing number of the bank account. Note that certain banks have the same ACH and wire routing number.",
    }),
  ),
});
export const PostV2CoreVaultUsBankAccountsOutput =
  Stripev2_core_vault_us_bank_account;
export const PostV2CoreVaultUsBankAccountsError = Schema.Union(
  [
    Stripev2_error_blocked_us_bank_account,
    Stripev2_error_idempotency_error,
    Stripev2_error_invalid_us_bank_account,
    Stripev2_error_limit_us_bank_account,
    Stripev2_error_unsupported_us_bank,
    Stripev2_error_us_bank_account_incompatible_currency,
    Stripev2_error_us_bank_account_unsupported_currency,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2CoreVaultUsBankAccountsIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2CoreVaultUsBankAccountsIdOutput =
  Stripev2_core_vault_us_bank_account;
export const GetV2CoreVaultUsBankAccountsIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreVaultUsBankAccountsIdInput = Schema.Struct({
  fedwire_routing_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The bank account's Fedwire routing number can be provided for update if it was empty previously.",
    }),
  ),
  routing_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The bank account's ACH routing number can be provided for update if it was empty previously.",
    }),
  ),
  id: Schema.String,
});
export const PostV2CoreVaultUsBankAccountsIdOutput =
  Stripev2_core_vault_us_bank_account;
export const PostV2CoreVaultUsBankAccountsIdError = Schema.Union(
  [
    Stripev2_error_archived_us_bank_account,
    Stripev2_error_blocked_us_bank_account,
    Stripev2_error_idempotency_error,
    Stripev2_error_invalid_us_bank_account,
    Stripev2_error_limit_us_bank_account,
    Stripev2_error_not_found,
    Stripev2_error_unsupported_us_bank,
    Stripev2_error_us_bank_account_field_already_exists,
    Stripev2_error_us_bank_account_incompatible_currency,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreVaultUsBankAccountsIdArchiveInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2CoreVaultUsBankAccountsIdArchiveOutput =
  Stripev2_core_vault_us_bank_account;
export const PostV2CoreVaultUsBankAccountsIdArchiveError = Schema.Union(
  [
    Stripev2_error_default_us_bank_account_cannot_be_archived,
    Stripev2_error_not_found,
    Stripev2_error_us_bank_account_cannot_be_archived,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsInput =
  Schema.Struct({
    amounts: Schema.optionalKey(
      Schema.Array(Schema.Int).annotate({
        description:
          "Two amounts received through Send Microdeposits must match the input to Confirm Microdeposits to verify US Bank Account.",
      }),
    ),
    descriptor_code: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Descriptor code received through Send Microdeposits must match the input to Confirm Microdeposits to verify US Bank Account.",
      }),
    ),
    id: Schema.String,
  });
export const PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOutput =
  Stripev2_core_vault_us_bank_account;
export const PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsError =
  Schema.Union(
    [
      Stripev2_error_archived_us_bank_account,
      Stripev2_error_idempotency_error,
      Stripev2_error_not_found,
      Stripev2_error_us_bank_account_confirm_microdeposits_failure,
      Stripev2_error_us_bank_account_microdeposits_cannot_be_confirmed,
      Stripev2_error_us_bank_account_microdeposits_not_sent_before_confirming,
      Stripev2_error_us_bank_account_microdeposits_timed_out,
      Stripev2_error_us_bank_account_verification_failed,
      Stripev2_error,
    ],
    { mode: "oneOf" },
  );
export const PostV2CoreVaultUsBankAccountsIdSendMicrodepositsInput =
  Schema.Struct({ id: Schema.String });
export const PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOutput =
  Stripev2_core_vault_us_bank_account;
export const PostV2CoreVaultUsBankAccountsIdSendMicrodepositsError =
  Schema.Union(
    [
      Stripev2_error_archived_us_bank_account,
      Stripev2_error_idempotency_error,
      Stripev2_error_not_found,
      Stripev2_error_us_bank_account_microdeposits_cannot_be_sent,
      Stripev2_error_us_bank_account_microdeposits_failed_to_send,
      Stripev2_error_us_bank_account_microdeposits_requires_routing_number,
      Stripev2_error_us_bank_account_verification_failed,
      Stripev2_error,
    ],
    { mode: "oneOf" },
  );
export const PostV2CoreVaultUsBankAccountsIdUnarchiveInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2CoreVaultUsBankAccountsIdUnarchiveOutput =
  Stripev2_core_vault_us_bank_account;
export const PostV2CoreVaultUsBankAccountsIdUnarchiveError = Schema.Union(
  [
    Stripev2_error_not_found,
    Stripev2_error_us_bank_account_cannot_be_unarchived,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
/**
 * The GetV2CoreVaultUsBankAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreVaultUsBankAccountsOperation: StripeOperation & {
  readonly input: typeof GetV2CoreVaultUsBankAccountsInput;
  readonly output: typeof GetV2CoreVaultUsBankAccountsOutput;
  readonly error: typeof GetV2CoreVaultUsBankAccountsError;
} = {
  name: "GetV2CoreVaultUsBankAccounts",
  method: "GET",
  path: "/v2/core/vault/us_bank_accounts",
  pathParameters: [],
  queryParameters: ["limit", "page", "verification_status"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreVaultUsBankAccountsInput,
  output: GetV2CoreVaultUsBankAccountsOutput,
  error: GetV2CoreVaultUsBankAccountsError,
};
/**
 * The PostV2CoreVaultUsBankAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultUsBankAccountsOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultUsBankAccountsInput;
  readonly output: typeof PostV2CoreVaultUsBankAccountsOutput;
  readonly error: typeof PostV2CoreVaultUsBankAccountsError;
} = {
  name: "PostV2CoreVaultUsBankAccounts",
  method: "POST",
  path: "/v2/core/vault/us_bank_accounts",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultUsBankAccountsInput,
  output: PostV2CoreVaultUsBankAccountsOutput,
  error: PostV2CoreVaultUsBankAccountsError,
};
/**
 * The GetV2CoreVaultUsBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreVaultUsBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof GetV2CoreVaultUsBankAccountsIdInput;
  readonly output: typeof GetV2CoreVaultUsBankAccountsIdOutput;
  readonly error: typeof GetV2CoreVaultUsBankAccountsIdError;
} = {
  name: "GetV2CoreVaultUsBankAccountsId",
  method: "GET",
  path: "/v2/core/vault/us_bank_accounts/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreVaultUsBankAccountsIdInput,
  output: GetV2CoreVaultUsBankAccountsIdOutput,
  error: GetV2CoreVaultUsBankAccountsIdError,
};
/**
 * The PostV2CoreVaultUsBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultUsBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultUsBankAccountsIdInput;
  readonly output: typeof PostV2CoreVaultUsBankAccountsIdOutput;
  readonly error: typeof PostV2CoreVaultUsBankAccountsIdError;
} = {
  name: "PostV2CoreVaultUsBankAccountsId",
  method: "POST",
  path: "/v2/core/vault/us_bank_accounts/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultUsBankAccountsIdInput,
  output: PostV2CoreVaultUsBankAccountsIdOutput,
  error: PostV2CoreVaultUsBankAccountsIdError,
};
/**
 * The PostV2CoreVaultUsBankAccountsIdArchiveOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultUsBankAccountsIdArchiveOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultUsBankAccountsIdArchiveInput;
  readonly output: typeof PostV2CoreVaultUsBankAccountsIdArchiveOutput;
  readonly error: typeof PostV2CoreVaultUsBankAccountsIdArchiveError;
} = {
  name: "PostV2CoreVaultUsBankAccountsIdArchive",
  method: "POST",
  path: "/v2/core/vault/us_bank_accounts/{id}/archive",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultUsBankAccountsIdArchiveInput,
  output: PostV2CoreVaultUsBankAccountsIdArchiveOutput,
  error: PostV2CoreVaultUsBankAccountsIdArchiveError,
};
/**
 * The PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsInput;
  readonly output: typeof PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOutput;
  readonly error: typeof PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsError;
} = {
  name: "PostV2CoreVaultUsBankAccountsIdConfirmMicrodeposits",
  method: "POST",
  path: "/v2/core/vault/us_bank_accounts/{id}/confirm_microdeposits",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsInput,
  output: PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOutput,
  error: PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsError,
};
/**
 * The PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultUsBankAccountsIdSendMicrodepositsInput;
  readonly output: typeof PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOutput;
  readonly error: typeof PostV2CoreVaultUsBankAccountsIdSendMicrodepositsError;
} = {
  name: "PostV2CoreVaultUsBankAccountsIdSendMicrodeposits",
  method: "POST",
  path: "/v2/core/vault/us_bank_accounts/{id}/send_microdeposits",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultUsBankAccountsIdSendMicrodepositsInput,
  output: PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOutput,
  error: PostV2CoreVaultUsBankAccountsIdSendMicrodepositsError,
};
/**
 * The PostV2CoreVaultUsBankAccountsIdUnarchiveOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreVaultUsBankAccountsIdUnarchiveOperation: StripeOperation & {
  readonly input: typeof PostV2CoreVaultUsBankAccountsIdUnarchiveInput;
  readonly output: typeof PostV2CoreVaultUsBankAccountsIdUnarchiveOutput;
  readonly error: typeof PostV2CoreVaultUsBankAccountsIdUnarchiveError;
} = {
  name: "PostV2CoreVaultUsBankAccountsIdUnarchive",
  method: "POST",
  path: "/v2/core/vault/us_bank_accounts/{id}/unarchive",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreVaultUsBankAccountsIdUnarchiveInput,
  output: PostV2CoreVaultUsBankAccountsIdUnarchiveOutput,
  error: PostV2CoreVaultUsBankAccountsIdUnarchiveError,
};
/**
 * The makeCoreVaultUsBankAccountsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeCoreVaultUsBankAccountsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetV2CoreVaultUsBankAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreVaultUsBankAccounts = Effect.fn(
    "coreVaultUsBankAccounts.GetV2CoreVaultUsBankAccounts",
  )(function* (input: GetV2CoreVaultUsBankAccountsInput) {
    const response: GetV2CoreVaultUsBankAccountsOutput = yield* client.invoke(
      GetV2CoreVaultUsBankAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostV2CoreVaultUsBankAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultUsBankAccounts = Effect.fn(
    "coreVaultUsBankAccounts.PostV2CoreVaultUsBankAccounts",
  )(function* (input: PostV2CoreVaultUsBankAccountsInput) {
    const response: PostV2CoreVaultUsBankAccountsOutput = yield* client.invoke(
      PostV2CoreVaultUsBankAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetV2CoreVaultUsBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreVaultUsBankAccountsId = Effect.fn(
    "coreVaultUsBankAccounts.GetV2CoreVaultUsBankAccountsId",
  )(function* (input: GetV2CoreVaultUsBankAccountsIdInput) {
    const response: GetV2CoreVaultUsBankAccountsIdOutput = yield* client.invoke(
      GetV2CoreVaultUsBankAccountsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostV2CoreVaultUsBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultUsBankAccountsId = Effect.fn(
    "coreVaultUsBankAccounts.PostV2CoreVaultUsBankAccountsId",
  )(function* (input: PostV2CoreVaultUsBankAccountsIdInput) {
    const response: PostV2CoreVaultUsBankAccountsIdOutput =
      yield* client.invoke(PostV2CoreVaultUsBankAccountsIdOperation, input);
    return response;
  });
  /**
   * The PostV2CoreVaultUsBankAccountsIdArchive function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultUsBankAccountsIdArchive = Effect.fn(
    "coreVaultUsBankAccounts.PostV2CoreVaultUsBankAccountsIdArchive",
  )(function* (input: PostV2CoreVaultUsBankAccountsIdArchiveInput) {
    const response: PostV2CoreVaultUsBankAccountsIdArchiveOutput =
      yield* client.invoke(
        PostV2CoreVaultUsBankAccountsIdArchiveOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2CoreVaultUsBankAccountsIdConfirmMicrodeposits function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultUsBankAccountsIdConfirmMicrodeposits = Effect.fn(
    "coreVaultUsBankAccounts.PostV2CoreVaultUsBankAccountsIdConfirmMicrodeposits",
  )(function* (
    input: PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsInput,
  ) {
    const response: PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOutput =
      yield* client.invoke(
        PostV2CoreVaultUsBankAccountsIdConfirmMicrodepositsOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2CoreVaultUsBankAccountsIdSendMicrodeposits function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultUsBankAccountsIdSendMicrodeposits = Effect.fn(
    "coreVaultUsBankAccounts.PostV2CoreVaultUsBankAccountsIdSendMicrodeposits",
  )(function* (input: PostV2CoreVaultUsBankAccountsIdSendMicrodepositsInput) {
    const response: PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOutput =
      yield* client.invoke(
        PostV2CoreVaultUsBankAccountsIdSendMicrodepositsOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2CoreVaultUsBankAccountsIdUnarchive function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreVaultUsBankAccountsIdUnarchive = Effect.fn(
    "coreVaultUsBankAccounts.PostV2CoreVaultUsBankAccountsIdUnarchive",
  )(function* (input: PostV2CoreVaultUsBankAccountsIdUnarchiveInput) {
    const response: PostV2CoreVaultUsBankAccountsIdUnarchiveOutput =
      yield* client.invoke(
        PostV2CoreVaultUsBankAccountsIdUnarchiveOperation,
        input,
      );
    return response;
  });
  return {
    GetV2CoreVaultUsBankAccounts,
    PostV2CoreVaultUsBankAccounts,
    GetV2CoreVaultUsBankAccountsId,
    PostV2CoreVaultUsBankAccountsId,
    PostV2CoreVaultUsBankAccountsIdArchive,
    PostV2CoreVaultUsBankAccountsIdConfirmMicrodeposits,
    PostV2CoreVaultUsBankAccountsIdSendMicrodeposits,
    PostV2CoreVaultUsBankAccountsIdUnarchive,
  };
});
