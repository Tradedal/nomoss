// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_money_management_outbound_setup_intent } from "./models/common.js";
import {
  Stripev2_error,
  Stripev2_error_active_outbound_setup_intent_exists_for_payout_method,
  Stripev2_error_apple_pay_invalid_format,
  Stripev2_error_apple_pay_no_signing_key,
  Stripev2_error_apple_pay_payment_decryption,
  Stripev2_error_apple_pay_pk_token_required,
  Stripev2_error_archived_payout_method,
  Stripev2_error_blocked_payout_method,
  Stripev2_error_cannot_cancel_terminal_outbound_setup_intent,
  Stripev2_error_cannot_update_terminal_outbound_setup_intent,
  Stripev2_error_idempotency_error,
  Stripev2_error_incompatible_payout_method_currency,
  Stripev2_error_invalid_fields,
  Stripev2_error_invalid_payout_method,
  Stripev2_error_invalid_payout_method_data,
  Stripev2_error_invalid_payout_method_update,
  Stripev2_error_invalid_status_payout_method,
  Stripev2_error_limit_payout_method,
  Stripev2_error_not_found,
  Stripev2_error_parameter_pair_exclusive,
  Stripev2_error_payment_method_unsupported_for_payouts,
  Stripev2_error_payout_method_cannot_be_updated,
  Stripev2_error_resource_not_found,
  Stripev2_error_unsupported_payout_method,
  Stripev2_error_unsupported_payout_method_currency,
} from "./models/v2Errors.js";

export type GetV2MoneyManagementOutboundSetupIntentsInput = {
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2MoneyManagementOutboundSetupIntentsOutput = {
  readonly data: ReadonlyArray<Stripev2_money_management_outbound_setup_intent>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2MoneyManagementOutboundSetupIntentsError = Stripev2_error;
export type PostV2MoneyManagementOutboundSetupIntentsInput = {
  readonly payout_method?: string;
  readonly payout_method_data?: {
    readonly bank_account?: {
      readonly account_number: string;
      readonly bank_account_type?: "checking" | "futsu" | "savings" | "toza";
      readonly branch_number?: string;
      readonly country: string;
      readonly currency: string;
      readonly routing_number?: string;
      readonly swift_code?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "bank_account" | "card";
  } & { readonly [x: string]: Schema.Json };
  readonly usage_intent?: "payment" | "transfer";
};
export type PostV2MoneyManagementOutboundSetupIntentsOutput =
  Stripev2_money_management_outbound_setup_intent;
export type PostV2MoneyManagementOutboundSetupIntentsError =
  | Stripev2_error_active_outbound_setup_intent_exists_for_payout_method
  | Stripev2_error_apple_pay_invalid_format
  | Stripev2_error_apple_pay_no_signing_key
  | Stripev2_error_apple_pay_payment_decryption
  | Stripev2_error_apple_pay_pk_token_required
  | Stripev2_error_archived_payout_method
  | Stripev2_error_blocked_payout_method
  | Stripev2_error_idempotency_error
  | Stripev2_error_incompatible_payout_method_currency
  | Stripev2_error_invalid_fields
  | Stripev2_error_invalid_payout_method
  | Stripev2_error_invalid_payout_method_data
  | Stripev2_error_invalid_payout_method_update
  | Stripev2_error_invalid_status_payout_method
  | Stripev2_error_limit_payout_method
  | Stripev2_error_parameter_pair_exclusive
  | Stripev2_error_payment_method_unsupported_for_payouts
  | Stripev2_error_payout_method_cannot_be_updated
  | Stripev2_error_resource_not_found
  | Stripev2_error_unsupported_payout_method
  | Stripev2_error_unsupported_payout_method_currency
  | Stripev2_error;
export type GetV2MoneyManagementOutboundSetupIntentsIdInput = {
  readonly id: string;
};
export type GetV2MoneyManagementOutboundSetupIntentsIdOutput =
  Stripev2_money_management_outbound_setup_intent;
export type GetV2MoneyManagementOutboundSetupIntentsIdError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2MoneyManagementOutboundSetupIntentsIdInput = {
  readonly payout_method?: string;
  readonly payout_method_data?: {
    readonly bank_account?: {
      readonly account_number: string;
      readonly bank_account_type?: "checking" | "futsu" | "savings" | "toza";
      readonly branch_number?: string;
      readonly country: string;
      readonly currency: string;
      readonly routing_number?: string;
      readonly swift_code?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "bank_account" | "card";
  } & { readonly [x: string]: Schema.Json };
  readonly id: string;
};
export type PostV2MoneyManagementOutboundSetupIntentsIdOutput =
  Stripev2_money_management_outbound_setup_intent;
export type PostV2MoneyManagementOutboundSetupIntentsIdError =
  | Stripev2_error_archived_payout_method
  | Stripev2_error_blocked_payout_method
  | Stripev2_error_cannot_update_terminal_outbound_setup_intent
  | Stripev2_error_invalid_payout_method_data
  | Stripev2_error_not_found
  | Stripev2_error_payout_method_cannot_be_updated
  | Stripev2_error;
export type PostV2MoneyManagementOutboundSetupIntentsIdCancelInput = {
  readonly id: string;
};
export type PostV2MoneyManagementOutboundSetupIntentsIdCancelOutput =
  Stripev2_money_management_outbound_setup_intent;
export type PostV2MoneyManagementOutboundSetupIntentsIdCancelError =
  | Stripev2_error_cannot_cancel_terminal_outbound_setup_intent
  | Stripev2_error_not_found
  | Stripev2_error;

export const GetV2MoneyManagementOutboundSetupIntentsInput = Schema.Struct({
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2MoneyManagementOutboundSetupIntentsOutput =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.Array(
        Stripev2_money_management_outbound_setup_intent,
      ).annotate({ description: "The list of OutboundSetupIntent objects." }),
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
export const GetV2MoneyManagementOutboundSetupIntentsError = Schema.Union(
  [Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementOutboundSetupIntentsInput = Schema.Struct({
  payout_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "If provided, the existing payout method resource to link to this setup intent.\nAny payout_method_data provided is used to update information on this linked payout method resource.",
    }),
  ),
  payout_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.annotate({
                description: "The account number or IBAN of the bank account.",
              }),
              bank_account_type: Schema.optionalKey(
                Schema.Literals([
                  "checking",
                  "futsu",
                  "savings",
                  "toza",
                ]).annotate({
                  description:
                    "Closed Enum. The type of the bank account (checking or savings).",
                }),
              ),
              branch_number: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The branch number of the bank account, if present.",
                }),
              ),
              country: Schema.String.annotate({
                description: "The country code of the bank account.",
              }),
              currency: Schema.String.annotate({
                description: "The currency of the bank account.",
              }),
              routing_number: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The routing number of the bank account, if present.",
                }),
              ),
              swift_code: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The swift code of the bank account, if present.",
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
            description:
              "The type specific details of the bank account payout method.",
          }),
        ),
        type: Schema.Literals(["bank_account", "card"]).annotate({
          description: "Open Enum. The type of payout method to be created.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      description:
        "If no payout_method provided, used to create the underlying credential that is set up for outbound money movement.\nIf a payout_method provided, used to update data on the credential linked to this setup intent.",
    }),
  ),
  usage_intent: Schema.optionalKey(
    Schema.Literals(["payment", "transfer"]).annotate({
      description:
        "Specify which type of outbound money movement this credential should be set up for (payment | transfer).\nIf not provided, defaults to payment.",
    }),
  ),
});
export const PostV2MoneyManagementOutboundSetupIntentsOutput =
  Stripev2_money_management_outbound_setup_intent;
export const PostV2MoneyManagementOutboundSetupIntentsError = Schema.Union(
  [
    Stripev2_error_active_outbound_setup_intent_exists_for_payout_method,
    Stripev2_error_apple_pay_invalid_format,
    Stripev2_error_apple_pay_no_signing_key,
    Stripev2_error_apple_pay_payment_decryption,
    Stripev2_error_apple_pay_pk_token_required,
    Stripev2_error_archived_payout_method,
    Stripev2_error_blocked_payout_method,
    Stripev2_error_idempotency_error,
    Stripev2_error_incompatible_payout_method_currency,
    Stripev2_error_invalid_fields,
    Stripev2_error_invalid_payout_method,
    Stripev2_error_invalid_payout_method_data,
    Stripev2_error_invalid_payout_method_update,
    Stripev2_error_invalid_status_payout_method,
    Stripev2_error_limit_payout_method,
    Stripev2_error_parameter_pair_exclusive,
    Stripev2_error_payment_method_unsupported_for_payouts,
    Stripev2_error_payout_method_cannot_be_updated,
    Stripev2_error_resource_not_found,
    Stripev2_error_unsupported_payout_method,
    Stripev2_error_unsupported_payout_method_currency,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2MoneyManagementOutboundSetupIntentsIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2MoneyManagementOutboundSetupIntentsIdOutput =
  Stripev2_money_management_outbound_setup_intent;
export const GetV2MoneyManagementOutboundSetupIntentsIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementOutboundSetupIntentsIdInput = Schema.Struct({
  payout_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "If provided, the existing payout method resource to link to this outbound setup intent.",
    }),
  ),
  payout_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.annotate({
                description: "The account number or IBAN of the bank account.",
              }),
              bank_account_type: Schema.optionalKey(
                Schema.Literals([
                  "checking",
                  "futsu",
                  "savings",
                  "toza",
                ]).annotate({
                  description:
                    "Closed Enum. The type of the bank account (checking or savings).",
                }),
              ),
              branch_number: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The branch number of the bank account, if present.",
                }),
              ),
              country: Schema.String.annotate({
                description: "The country code of the bank account.",
              }),
              currency: Schema.String.annotate({
                description: "The currency of the bank account.",
              }),
              routing_number: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The routing number of the bank account, if present.",
                }),
              ),
              swift_code: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The swift code of the bank account, if present.",
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
            description:
              "The type specific details of the bank account payout method.",
          }),
        ),
        type: Schema.Literals(["bank_account", "card"]).annotate({
          description:
            "Open Enum. The type of payout method to be created/updated.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      description:
        "If no payout_method provided, used to create the underlying credential that is set up for outbound money movement.\nIf a payout_method provided, used to update data on the credential linked to this setup intent.\nOnly card expiry (exp_month, exp_year) can be updated in the case where payout_method is provided.",
    }),
  ),
  id: Schema.String,
});
export const PostV2MoneyManagementOutboundSetupIntentsIdOutput =
  Stripev2_money_management_outbound_setup_intent;
export const PostV2MoneyManagementOutboundSetupIntentsIdError = Schema.Union(
  [
    Stripev2_error_archived_payout_method,
    Stripev2_error_blocked_payout_method,
    Stripev2_error_cannot_update_terminal_outbound_setup_intent,
    Stripev2_error_invalid_payout_method_data,
    Stripev2_error_not_found,
    Stripev2_error_payout_method_cannot_be_updated,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementOutboundSetupIntentsIdCancelInput =
  Schema.Struct({ id: Schema.String });
export const PostV2MoneyManagementOutboundSetupIntentsIdCancelOutput =
  Stripev2_money_management_outbound_setup_intent;
export const PostV2MoneyManagementOutboundSetupIntentsIdCancelError =
  Schema.Union(
    [
      Stripev2_error_cannot_cancel_terminal_outbound_setup_intent,
      Stripev2_error_not_found,
      Stripev2_error,
    ],
    { mode: "oneOf" },
  );
/**
 * The GetV2MoneyManagementOutboundSetupIntentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementOutboundSetupIntentsOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementOutboundSetupIntentsInput;
  readonly output: typeof GetV2MoneyManagementOutboundSetupIntentsOutput;
  readonly error: typeof GetV2MoneyManagementOutboundSetupIntentsError;
} = {
  name: "GetV2MoneyManagementOutboundSetupIntents",
  method: "GET",
  path: "/v2/money_management/outbound_setup_intents",
  pathParameters: [],
  queryParameters: ["limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementOutboundSetupIntentsInput,
  output: GetV2MoneyManagementOutboundSetupIntentsOutput,
  error: GetV2MoneyManagementOutboundSetupIntentsError,
};
/**
 * The PostV2MoneyManagementOutboundSetupIntentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementOutboundSetupIntentsOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementOutboundSetupIntentsInput;
  readonly output: typeof PostV2MoneyManagementOutboundSetupIntentsOutput;
  readonly error: typeof PostV2MoneyManagementOutboundSetupIntentsError;
} = {
  name: "PostV2MoneyManagementOutboundSetupIntents",
  method: "POST",
  path: "/v2/money_management/outbound_setup_intents",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementOutboundSetupIntentsInput,
  output: PostV2MoneyManagementOutboundSetupIntentsOutput,
  error: PostV2MoneyManagementOutboundSetupIntentsError,
};
/**
 * The GetV2MoneyManagementOutboundSetupIntentsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementOutboundSetupIntentsIdOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementOutboundSetupIntentsIdInput;
  readonly output: typeof GetV2MoneyManagementOutboundSetupIntentsIdOutput;
  readonly error: typeof GetV2MoneyManagementOutboundSetupIntentsIdError;
} = {
  name: "GetV2MoneyManagementOutboundSetupIntentsId",
  method: "GET",
  path: "/v2/money_management/outbound_setup_intents/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementOutboundSetupIntentsIdInput,
  output: GetV2MoneyManagementOutboundSetupIntentsIdOutput,
  error: GetV2MoneyManagementOutboundSetupIntentsIdError,
};
/**
 * The PostV2MoneyManagementOutboundSetupIntentsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementOutboundSetupIntentsIdOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementOutboundSetupIntentsIdInput;
  readonly output: typeof PostV2MoneyManagementOutboundSetupIntentsIdOutput;
  readonly error: typeof PostV2MoneyManagementOutboundSetupIntentsIdError;
} = {
  name: "PostV2MoneyManagementOutboundSetupIntentsId",
  method: "POST",
  path: "/v2/money_management/outbound_setup_intents/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementOutboundSetupIntentsIdInput,
  output: PostV2MoneyManagementOutboundSetupIntentsIdOutput,
  error: PostV2MoneyManagementOutboundSetupIntentsIdError,
};
/**
 * The PostV2MoneyManagementOutboundSetupIntentsIdCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementOutboundSetupIntentsIdCancelOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementOutboundSetupIntentsIdCancelInput;
  readonly output: typeof PostV2MoneyManagementOutboundSetupIntentsIdCancelOutput;
  readonly error: typeof PostV2MoneyManagementOutboundSetupIntentsIdCancelError;
} = {
  name: "PostV2MoneyManagementOutboundSetupIntentsIdCancel",
  method: "POST",
  path: "/v2/money_management/outbound_setup_intents/{id}/cancel",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementOutboundSetupIntentsIdCancelInput,
  output: PostV2MoneyManagementOutboundSetupIntentsIdCancelOutput,
  error: PostV2MoneyManagementOutboundSetupIntentsIdCancelError,
};
/**
 * The makeMoneyManagementOutboundSetupIntentsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeMoneyManagementOutboundSetupIntentsClient = Effect.gen(
  function* () {
    const client = yield* StripeClient;
    /**
     * The GetV2MoneyManagementOutboundSetupIntents function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementOutboundSetupIntents = Effect.fn(
      "moneyManagementOutboundSetupIntents.GetV2MoneyManagementOutboundSetupIntents",
    )(function* (input: GetV2MoneyManagementOutboundSetupIntentsInput) {
      const response: GetV2MoneyManagementOutboundSetupIntentsOutput =
        yield* client.invoke(
          GetV2MoneyManagementOutboundSetupIntentsOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementOutboundSetupIntents function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementOutboundSetupIntents = Effect.fn(
      "moneyManagementOutboundSetupIntents.PostV2MoneyManagementOutboundSetupIntents",
    )(function* (input: PostV2MoneyManagementOutboundSetupIntentsInput) {
      const response: PostV2MoneyManagementOutboundSetupIntentsOutput =
        yield* client.invoke(
          PostV2MoneyManagementOutboundSetupIntentsOperation,
          input,
        );
      return response;
    });
    /**
     * The GetV2MoneyManagementOutboundSetupIntentsId function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementOutboundSetupIntentsId = Effect.fn(
      "moneyManagementOutboundSetupIntents.GetV2MoneyManagementOutboundSetupIntentsId",
    )(function* (input: GetV2MoneyManagementOutboundSetupIntentsIdInput) {
      const response: GetV2MoneyManagementOutboundSetupIntentsIdOutput =
        yield* client.invoke(
          GetV2MoneyManagementOutboundSetupIntentsIdOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementOutboundSetupIntentsId function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementOutboundSetupIntentsId = Effect.fn(
      "moneyManagementOutboundSetupIntents.PostV2MoneyManagementOutboundSetupIntentsId",
    )(function* (input: PostV2MoneyManagementOutboundSetupIntentsIdInput) {
      const response: PostV2MoneyManagementOutboundSetupIntentsIdOutput =
        yield* client.invoke(
          PostV2MoneyManagementOutboundSetupIntentsIdOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementOutboundSetupIntentsIdCancel function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementOutboundSetupIntentsIdCancel = Effect.fn(
      "moneyManagementOutboundSetupIntents.PostV2MoneyManagementOutboundSetupIntentsIdCancel",
    )(function* (
      input: PostV2MoneyManagementOutboundSetupIntentsIdCancelInput,
    ) {
      const response: PostV2MoneyManagementOutboundSetupIntentsIdCancelOutput =
        yield* client.invoke(
          PostV2MoneyManagementOutboundSetupIntentsIdCancelOperation,
          input,
        );
      return response;
    });
    return {
      GetV2MoneyManagementOutboundSetupIntents,
      PostV2MoneyManagementOutboundSetupIntents,
      GetV2MoneyManagementOutboundSetupIntentsId,
      PostV2MoneyManagementOutboundSetupIntentsId,
      PostV2MoneyManagementOutboundSetupIntentsIdCancel,
    };
  },
);
