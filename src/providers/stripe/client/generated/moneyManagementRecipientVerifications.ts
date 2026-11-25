// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_money_management_recipient_verification } from "./models/common.js";
import {
  Stripev2_error,
  Stripev2_error_idempotency_error,
  Stripev2_error_not_found,
  Stripev2_error_recipient_verification_account_not_configured_as_recipient,
  Stripev2_error_recipient_verification_invalid_payout_method_country,
  Stripev2_error_recipient_verification_invalid_payout_method_currency,
  Stripev2_error_recipient_verification_not_acknowledgable,
  Stripev2_error_recipient_verification_not_supported,
  Stripev2_error_recipient_verification_payout_method_not_found,
  Stripev2_error_recipient_verification_recipient_not_found,
} from "./models/v2Errors.js";

export type PostV2MoneyManagementRecipientVerificationsInput = {
  readonly payout_method: string;
  readonly recipient?: string;
};
export type PostV2MoneyManagementRecipientVerificationsOutput =
  Stripev2_money_management_recipient_verification;
export type PostV2MoneyManagementRecipientVerificationsError =
  | Stripev2_error_idempotency_error
  | Stripev2_error_recipient_verification_account_not_configured_as_recipient
  | Stripev2_error_recipient_verification_invalid_payout_method_country
  | Stripev2_error_recipient_verification_invalid_payout_method_currency
  | Stripev2_error_recipient_verification_not_supported
  | Stripev2_error_recipient_verification_payout_method_not_found
  | Stripev2_error_recipient_verification_recipient_not_found
  | Stripev2_error;
export type GetV2MoneyManagementRecipientVerificationsIdInput = {
  readonly id: string;
};
export type GetV2MoneyManagementRecipientVerificationsIdOutput =
  Stripev2_money_management_recipient_verification;
export type GetV2MoneyManagementRecipientVerificationsIdError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2MoneyManagementRecipientVerificationsIdAcknowledgeInput = {
  readonly id: string;
};
export type PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOutput =
  Stripev2_money_management_recipient_verification;
export type PostV2MoneyManagementRecipientVerificationsIdAcknowledgeError =
  | Stripev2_error_not_found
  | Stripev2_error_recipient_verification_not_acknowledgable
  | Stripev2_error;

export const PostV2MoneyManagementRecipientVerificationsInput = Schema.Struct({
  payout_method: Schema.String.annotate({
    description: "ID of the payout method.",
  }),
  recipient: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the recipient account. Required if the recipient is different from the sender. Omit for payouts to your own account.",
    }),
  ),
});
export const PostV2MoneyManagementRecipientVerificationsOutput =
  Stripev2_money_management_recipient_verification;
export const PostV2MoneyManagementRecipientVerificationsError = Schema.Union(
  [
    Stripev2_error_idempotency_error,
    Stripev2_error_recipient_verification_account_not_configured_as_recipient,
    Stripev2_error_recipient_verification_invalid_payout_method_country,
    Stripev2_error_recipient_verification_invalid_payout_method_currency,
    Stripev2_error_recipient_verification_not_supported,
    Stripev2_error_recipient_verification_payout_method_not_found,
    Stripev2_error_recipient_verification_recipient_not_found,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2MoneyManagementRecipientVerificationsIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2MoneyManagementRecipientVerificationsIdOutput =
  Stripev2_money_management_recipient_verification;
export const GetV2MoneyManagementRecipientVerificationsIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementRecipientVerificationsIdAcknowledgeInput =
  Schema.Struct({ id: Schema.String });
export const PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOutput =
  Stripev2_money_management_recipient_verification;
export const PostV2MoneyManagementRecipientVerificationsIdAcknowledgeError =
  Schema.Union(
    [
      Stripev2_error_not_found,
      Stripev2_error_recipient_verification_not_acknowledgable,
      Stripev2_error,
    ],
    { mode: "oneOf" },
  );
/**
 * The PostV2MoneyManagementRecipientVerificationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementRecipientVerificationsOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementRecipientVerificationsInput;
  readonly output: typeof PostV2MoneyManagementRecipientVerificationsOutput;
  readonly error: typeof PostV2MoneyManagementRecipientVerificationsError;
} = {
  name: "PostV2MoneyManagementRecipientVerifications",
  method: "POST",
  path: "/v2/money_management/recipient_verifications",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementRecipientVerificationsInput,
  output: PostV2MoneyManagementRecipientVerificationsOutput,
  error: PostV2MoneyManagementRecipientVerificationsError,
};
/**
 * The GetV2MoneyManagementRecipientVerificationsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementRecipientVerificationsIdOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementRecipientVerificationsIdInput;
  readonly output: typeof GetV2MoneyManagementRecipientVerificationsIdOutput;
  readonly error: typeof GetV2MoneyManagementRecipientVerificationsIdError;
} = {
  name: "GetV2MoneyManagementRecipientVerificationsId",
  method: "GET",
  path: "/v2/money_management/recipient_verifications/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementRecipientVerificationsIdInput,
  output: GetV2MoneyManagementRecipientVerificationsIdOutput,
  error: GetV2MoneyManagementRecipientVerificationsIdError,
};
/**
 * The PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementRecipientVerificationsIdAcknowledgeInput;
  readonly output: typeof PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOutput;
  readonly error: typeof PostV2MoneyManagementRecipientVerificationsIdAcknowledgeError;
} = {
  name: "PostV2MoneyManagementRecipientVerificationsIdAcknowledge",
  method: "POST",
  path: "/v2/money_management/recipient_verifications/{id}/acknowledge",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementRecipientVerificationsIdAcknowledgeInput,
  output: PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOutput,
  error: PostV2MoneyManagementRecipientVerificationsIdAcknowledgeError,
};
/**
 * The makeMoneyManagementRecipientVerificationsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeMoneyManagementRecipientVerificationsClient = Effect.gen(
  function* () {
    const client = yield* StripeClient;
    /**
     * The PostV2MoneyManagementRecipientVerifications function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementRecipientVerifications = Effect.fn(
      "moneyManagementRecipientVerifications.PostV2MoneyManagementRecipientVerifications",
    )(function* (input: PostV2MoneyManagementRecipientVerificationsInput) {
      const response: PostV2MoneyManagementRecipientVerificationsOutput =
        yield* client.invoke(
          PostV2MoneyManagementRecipientVerificationsOperation,
          input,
        );
      return response;
    });
    /**
     * The GetV2MoneyManagementRecipientVerificationsId function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementRecipientVerificationsId = Effect.fn(
      "moneyManagementRecipientVerifications.GetV2MoneyManagementRecipientVerificationsId",
    )(function* (input: GetV2MoneyManagementRecipientVerificationsIdInput) {
      const response: GetV2MoneyManagementRecipientVerificationsIdOutput =
        yield* client.invoke(
          GetV2MoneyManagementRecipientVerificationsIdOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementRecipientVerificationsIdAcknowledge function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementRecipientVerificationsIdAcknowledge = Effect.fn(
      "moneyManagementRecipientVerifications.PostV2MoneyManagementRecipientVerificationsIdAcknowledge",
    )(function* (
      input: PostV2MoneyManagementRecipientVerificationsIdAcknowledgeInput,
    ) {
      const response: PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOutput =
        yield* client.invoke(
          PostV2MoneyManagementRecipientVerificationsIdAcknowledgeOperation,
          input,
        );
      return response;
    });
    return {
      PostV2MoneyManagementRecipientVerifications,
      GetV2MoneyManagementRecipientVerificationsId,
      PostV2MoneyManagementRecipientVerificationsIdAcknowledge,
    };
  },
);
