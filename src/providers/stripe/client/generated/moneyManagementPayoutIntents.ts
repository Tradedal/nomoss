// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_money_management_payout_intent } from "./models/common.js";
import {
  Stripev2_error,
  Stripev2_error_account_not_configured_as_recipient,
  Stripev2_error_amount_too_large_for_payout_method,
  Stripev2_error_amount_too_large_for_preferred_networks,
  Stripev2_error_cop_not_accepted,
  Stripev2_error_currency_required,
  Stripev2_error_default_payout_method_config_not_found,
  Stripev2_error_financial_account_capability_not_enabled,
  Stripev2_error_financial_account_capability_restricted,
  Stripev2_error_from_balance_unsupported_currency,
  Stripev2_error_from_financial_account_not_found,
  Stripev2_error_fx_quote_invalid_for_payout_intent_without_fx,
  Stripev2_error_idempotency_error,
  Stripev2_error_invalid_outbound_flow,
  Stripev2_error_invalid_payout_method_country,
  Stripev2_error_manual_confirmation_not_supported_with_schedule_options,
  Stripev2_error_network_not_supported_for_payout_method,
  Stripev2_error_not_found,
  Stripev2_error_outbound_flow_from_closed_financial_account_unsupported,
  Stripev2_error_outbound_flow_unsupported_country,
  Stripev2_error_outbound_flow_unsupported_currency,
  Stripev2_error_outbound_payment_not_allowed,
  Stripev2_error_payout_intent_cannot_be_modified,
  Stripev2_error_payout_intent_fx_quote_expired,
  Stripev2_error_payout_intent_large_rate_drift,
  Stripev2_error_payout_intent_not_cancelable,
  Stripev2_error_payout_intent_not_confirmable,
  Stripev2_error_payout_intent_scheduled_date_exceed_maximum,
  Stripev2_error_payout_intent_scheduled_date_too_soon,
  Stripev2_error_payout_method_archived,
  Stripev2_error_payout_method_disabled,
  Stripev2_error_payout_method_expired,
  Stripev2_error_payout_method_invalid,
  Stripev2_error_payout_method_unsupported_currency,
  Stripev2_error_pending_financial_account,
  Stripev2_error_preferred_networks_not_available,
  Stripev2_error_recipient_capability_not_active,
  Stripev2_error_recipient_email_does_not_exist,
  Stripev2_error_recipient_feature_not_active,
  Stripev2_error_schedule_options_incompatible_with_confirmation_required,
  Stripev2_error_submission_not_supported,
  Stripev2_error_to_recipient_not_found,
  Stripev2_error_unsupported_operation_with_managed_financial_account,
  Stripev2_error_unsupported_parameter_delivery_options,
} from "./models/v2Errors.js";

export type GetV2MoneyManagementPayoutIntentsInput = {
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2MoneyManagementPayoutIntentsOutput = {
  readonly data: ReadonlyArray<Stripev2_money_management_payout_intent>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2MoneyManagementPayoutIntentsError = Stripev2_error;
export type PostV2MoneyManagementPayoutIntentsInput = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly confirmation_method?: "automatic" | "manual";
  readonly description?: string;
  readonly from: {
    readonly currency: string;
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly recipient_notification?: {
    readonly setting: "configured" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly schedule_options?: { readonly execute_on?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly statement_descriptor?: string;
  readonly to: {
    readonly currency?: string;
    readonly payout_method?: string;
    readonly payout_method_options?: {
      readonly bank_account?: {
        readonly preferred_network_options?: {
          readonly ach?: {
            readonly submission?: "next_day" | "same_day";
            readonly transaction_purpose?: "payroll";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly preferred_networks?: ReadonlyArray<
          "ach" | "fedwire" | "fps" | "rtp" | "sepa" | "swift"
        >;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly recipient?: string;
  } & { readonly [x: string]: Schema.Json };
};
export type PostV2MoneyManagementPayoutIntentsOutput =
  Stripev2_money_management_payout_intent;
export type PostV2MoneyManagementPayoutIntentsError =
  | Stripev2_error_account_not_configured_as_recipient
  | Stripev2_error_amount_too_large_for_payout_method
  | Stripev2_error_amount_too_large_for_preferred_networks
  | Stripev2_error_cop_not_accepted
  | Stripev2_error_currency_required
  | Stripev2_error_default_payout_method_config_not_found
  | Stripev2_error_financial_account_capability_not_enabled
  | Stripev2_error_financial_account_capability_restricted
  | Stripev2_error_from_balance_unsupported_currency
  | Stripev2_error_from_financial_account_not_found
  | Stripev2_error_idempotency_error
  | Stripev2_error_invalid_outbound_flow
  | Stripev2_error_invalid_payout_method_country
  | Stripev2_error_manual_confirmation_not_supported_with_schedule_options
  | Stripev2_error_network_not_supported_for_payout_method
  | Stripev2_error_not_found
  | Stripev2_error_outbound_flow_from_closed_financial_account_unsupported
  | Stripev2_error_outbound_flow_unsupported_country
  | Stripev2_error_outbound_flow_unsupported_currency
  | Stripev2_error_outbound_payment_not_allowed
  | Stripev2_error_payout_intent_scheduled_date_exceed_maximum
  | Stripev2_error_payout_intent_scheduled_date_too_soon
  | Stripev2_error_payout_method_archived
  | Stripev2_error_payout_method_disabled
  | Stripev2_error_payout_method_expired
  | Stripev2_error_payout_method_invalid
  | Stripev2_error_payout_method_unsupported_currency
  | Stripev2_error_pending_financial_account
  | Stripev2_error_preferred_networks_not_available
  | Stripev2_error_recipient_capability_not_active
  | Stripev2_error_recipient_email_does_not_exist
  | Stripev2_error_recipient_feature_not_active
  | Stripev2_error_schedule_options_incompatible_with_confirmation_required
  | Stripev2_error_submission_not_supported
  | Stripev2_error_to_recipient_not_found
  | Stripev2_error_unsupported_operation_with_managed_financial_account
  | Stripev2_error_unsupported_parameter_delivery_options
  | Stripev2_error;
export type GetV2MoneyManagementPayoutIntentsIdInput = { readonly id: string };
export type GetV2MoneyManagementPayoutIntentsIdOutput =
  Stripev2_money_management_payout_intent;
export type GetV2MoneyManagementPayoutIntentsIdError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2MoneyManagementPayoutIntentsIdInput = {
  readonly description?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly recipient_notification?: {
    readonly setting: "configured" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly schedule_options?: { readonly execute_on?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly statement_descriptor?: string;
  readonly to?: {
    readonly currency?: string;
    readonly payout_method?: string;
    readonly payout_method_options?: {
      readonly bank_account?: {
        readonly preferred_network_options?: {
          readonly ach?: {
            readonly submission?: "next_day" | "same_day";
            readonly transaction_purpose?: "payroll";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly preferred_networks?: ReadonlyArray<
          "ach" | "fedwire" | "fps" | "rtp" | "sepa" | "swift"
        >;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly recipient?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly id: string;
};
export type PostV2MoneyManagementPayoutIntentsIdOutput =
  Stripev2_money_management_payout_intent;
export type PostV2MoneyManagementPayoutIntentsIdError =
  | Stripev2_error_account_not_configured_as_recipient
  | Stripev2_error_amount_too_large_for_payout_method
  | Stripev2_error_amount_too_large_for_preferred_networks
  | Stripev2_error_cop_not_accepted
  | Stripev2_error_default_payout_method_config_not_found
  | Stripev2_error_financial_account_capability_not_enabled
  | Stripev2_error_financial_account_capability_restricted
  | Stripev2_error_from_balance_unsupported_currency
  | Stripev2_error_from_financial_account_not_found
  | Stripev2_error_invalid_outbound_flow
  | Stripev2_error_invalid_payout_method_country
  | Stripev2_error_manual_confirmation_not_supported_with_schedule_options
  | Stripev2_error_network_not_supported_for_payout_method
  | Stripev2_error_not_found
  | Stripev2_error_outbound_flow_from_closed_financial_account_unsupported
  | Stripev2_error_outbound_flow_unsupported_country
  | Stripev2_error_outbound_flow_unsupported_currency
  | Stripev2_error_outbound_payment_not_allowed
  | Stripev2_error_payout_intent_cannot_be_modified
  | Stripev2_error_payout_intent_scheduled_date_exceed_maximum
  | Stripev2_error_payout_intent_scheduled_date_too_soon
  | Stripev2_error_payout_method_archived
  | Stripev2_error_payout_method_disabled
  | Stripev2_error_payout_method_expired
  | Stripev2_error_payout_method_invalid
  | Stripev2_error_payout_method_unsupported_currency
  | Stripev2_error_pending_financial_account
  | Stripev2_error_preferred_networks_not_available
  | Stripev2_error_recipient_capability_not_active
  | Stripev2_error_recipient_email_does_not_exist
  | Stripev2_error_recipient_feature_not_active
  | Stripev2_error_schedule_options_incompatible_with_confirmation_required
  | Stripev2_error_submission_not_supported
  | Stripev2_error_to_recipient_not_found
  | Stripev2_error_unsupported_operation_with_managed_financial_account
  | Stripev2_error_unsupported_parameter_delivery_options
  | Stripev2_error;
export type PostV2MoneyManagementPayoutIntentsIdCancelInput = {
  readonly id: string;
};
export type PostV2MoneyManagementPayoutIntentsIdCancelOutput =
  Stripev2_money_management_payout_intent;
export type PostV2MoneyManagementPayoutIntentsIdCancelError =
  | Stripev2_error_not_found
  | Stripev2_error_payout_intent_not_cancelable
  | Stripev2_error;
export type PostV2MoneyManagementPayoutIntentsIdConfirmInput = {
  readonly id: string;
};
export type PostV2MoneyManagementPayoutIntentsIdConfirmOutput =
  Stripev2_money_management_payout_intent;
export type PostV2MoneyManagementPayoutIntentsIdConfirmError =
  | Stripev2_error_invalid_outbound_flow
  | Stripev2_error_not_found
  | Stripev2_error_payout_intent_fx_quote_expired
  | Stripev2_error_payout_intent_large_rate_drift
  | Stripev2_error_payout_intent_not_confirmable
  | Stripev2_error_payout_intent_scheduled_date_exceed_maximum
  | Stripev2_error_payout_intent_scheduled_date_too_soon
  | Stripev2_error;
export type PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteInput = {
  readonly id: string;
};
export type PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOutput =
  Stripev2_money_management_payout_intent;
export type PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteError =
  | Stripev2_error_fx_quote_invalid_for_payout_intent_without_fx
  | Stripev2_error_not_found
  | Stripev2_error_payout_intent_cannot_be_modified
  | Stripev2_error_payout_method_archived
  | Stripev2_error;
export type PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationInput =
  { readonly id: string };
export type PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOutput =
  Stripev2_money_management_payout_intent;
export type PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationError =
  | Stripev2_error_not_found
  | Stripev2_error_payout_intent_cannot_be_modified
  | Stripev2_error_payout_method_archived
  | Stripev2_error;

export const GetV2MoneyManagementPayoutIntentsInput = Schema.Struct({
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2MoneyManagementPayoutIntentsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_money_management_payout_intent).annotate({
      description: "The PayoutIntents retrieved.",
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
export const GetV2MoneyManagementPayoutIntentsError = Schema.Union(
  [Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementPayoutIntentsInput = Schema.Struct({
  amount: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      }),
      value: Schema.Number.annotate({
        description:
          "A non-negative integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#minor-units).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({ description: "The monetary amount to be sent." }),
  confirmation_method: Schema.optionalKey(
    Schema.Literals(["automatic", "manual"]).annotate({
      description:
        "Controls whether the PayoutIntent requires explicit confirmation before transitioning to `pending`. Defaults to `automatic`, but regulatory requirements may still require confirmation. See [Send money with Global Payouts](https://docs.stripe.com/global-payouts/send-money) for details.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the PayoutIntent. Often useful for displaying to users.",
    }),
  ),
  from: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.String.annotate({
        description: "The currency of the financial account.",
      }),
      financial_account: Schema.String.annotate({
        description: "The FinancialAccount that funds are pulled from.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "The FinancialAccount that funds are pulled from.",
  }),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
  ),
  recipient_notification: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        setting: Schema.Literals(["configured", "none"]).annotate({
          description:
            "Closed Enum. Configuration option to enable or disable notifications to recipients.\nDo not send notifications when `setting` is `none`. Use the account setting when `setting` is `configured` or omitted.",
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
        "Recipient notification settings for the PayoutIntent. Only applicable when the PayoutIntent creates an OutboundPayment.",
    }),
  ),
  schedule_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        execute_on: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The date when the payout should be executed, in YYYY-MM-DD format.",
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
        "Scheduling options for the payout. If omitted, the payout is scheduled for immediate execution.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The description that appears on the receiving end for the payout (for example, on a bank statement).",
    }),
  ),
  to: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.optionalKey(
        Schema.String.annotate({
          description: "The currency to send to the recipient.",
        }),
      ),
      payout_method: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The payout method ID for the PayoutIntent. Optional when the PayoutIntent creates an OutboundPayment and the recipient has a default payout method. Required when the PayoutIntent creates an OutboundTransfer.",
        }),
      ),
      payout_method_options: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            bank_account: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preferred_network_options: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        ach: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              submission: Schema.optionalKey(
                                Schema.Literals([
                                  "next_day",
                                  "same_day",
                                ]).annotate({
                                  description:
                                    "Open Enum. ACH submission timing.",
                                }),
                              ),
                              transaction_purpose: Schema.optionalKey(
                                Schema.Literal("payroll").annotate({
                                  description:
                                    "The transaction purpose for this ACH payment.",
                                }),
                              ),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({
                            description: "ACH-specific network options.",
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
                      description: "Per-network configuration options.",
                    }),
                  ),
                  preferred_networks: Schema.optionalKey(
                    Schema.Array(
                      Schema.Literals([
                        "ach",
                        "fedwire",
                        "fps",
                        "rtp",
                        "sepa",
                        "swift",
                      ]),
                    ).annotate({
                      description:
                        "The preferred networks to use for this PayoutIntent.",
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
                description: "Options for bank account payout methods.",
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
          description: "Payout method options for the PayoutIntent.",
        }),
      ),
      recipient: Schema.optionalKey(
        Schema.String.annotate({
          description: "The recipient ID for the PayoutIntent.",
        }),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({ description: "To which payout method the payout is sent." }),
});
export const PostV2MoneyManagementPayoutIntentsOutput =
  Stripev2_money_management_payout_intent;
export const PostV2MoneyManagementPayoutIntentsError = Schema.Union(
  [
    Stripev2_error_account_not_configured_as_recipient,
    Stripev2_error_amount_too_large_for_payout_method,
    Stripev2_error_amount_too_large_for_preferred_networks,
    Stripev2_error_cop_not_accepted,
    Stripev2_error_currency_required,
    Stripev2_error_default_payout_method_config_not_found,
    Stripev2_error_financial_account_capability_not_enabled,
    Stripev2_error_financial_account_capability_restricted,
    Stripev2_error_from_balance_unsupported_currency,
    Stripev2_error_from_financial_account_not_found,
    Stripev2_error_idempotency_error,
    Stripev2_error_invalid_outbound_flow,
    Stripev2_error_invalid_payout_method_country,
    Stripev2_error_manual_confirmation_not_supported_with_schedule_options,
    Stripev2_error_network_not_supported_for_payout_method,
    Stripev2_error_not_found,
    Stripev2_error_outbound_flow_from_closed_financial_account_unsupported,
    Stripev2_error_outbound_flow_unsupported_country,
    Stripev2_error_outbound_flow_unsupported_currency,
    Stripev2_error_outbound_payment_not_allowed,
    Stripev2_error_payout_intent_scheduled_date_exceed_maximum,
    Stripev2_error_payout_intent_scheduled_date_too_soon,
    Stripev2_error_payout_method_archived,
    Stripev2_error_payout_method_disabled,
    Stripev2_error_payout_method_expired,
    Stripev2_error_payout_method_invalid,
    Stripev2_error_payout_method_unsupported_currency,
    Stripev2_error_pending_financial_account,
    Stripev2_error_preferred_networks_not_available,
    Stripev2_error_recipient_capability_not_active,
    Stripev2_error_recipient_email_does_not_exist,
    Stripev2_error_recipient_feature_not_active,
    Stripev2_error_schedule_options_incompatible_with_confirmation_required,
    Stripev2_error_submission_not_supported,
    Stripev2_error_to_recipient_not_found,
    Stripev2_error_unsupported_operation_with_managed_financial_account,
    Stripev2_error_unsupported_parameter_delivery_options,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2MoneyManagementPayoutIntentsIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2MoneyManagementPayoutIntentsIdOutput =
  Stripev2_money_management_payout_intent;
export const GetV2MoneyManagementPayoutIntentsIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementPayoutIntentsIdInput = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the PayoutIntent. Often useful for displaying to users.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
  ),
  recipient_notification: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        setting: Schema.Literals(["configured", "none"]).annotate({
          description:
            "Closed Enum. Configuration option to enable or disable notifications to recipients.\nDo not send notifications when `setting` is `none`. Use the account setting when `setting` is `configured` or omitted.",
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
        "Recipient notification settings for the PayoutIntent. Only applicable when the PayoutIntent creates an OutboundPayment.",
    }),
  ),
  schedule_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        execute_on: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The date when the payout should be executed, in YYYY-MM-DD format.",
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
        "Scheduling options for the payout. If omitted, the payout is scheduled for immediate execution.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The description that appears on the receiving end for the payout (for example, on a bank statement).",
    }),
  ),
  to: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        currency: Schema.optionalKey(
          Schema.String.annotate({
            description: "The currency to send to the recipient.",
          }),
        ),
        payout_method: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The payout method ID for the PayoutIntent. Optional when the PayoutIntent creates an OutboundPayment and the recipient has a default payout method. Required when the PayoutIntent creates an OutboundTransfer.",
          }),
        ),
        payout_method_options: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank_account: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    preferred_network_options: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          ach: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                submission: Schema.optionalKey(
                                  Schema.Literals([
                                    "next_day",
                                    "same_day",
                                  ]).annotate({
                                    description:
                                      "Open Enum. ACH submission timing.",
                                  }),
                                ),
                                transaction_purpose: Schema.optionalKey(
                                  Schema.Literal("payroll").annotate({
                                    description:
                                      "The transaction purpose for this ACH payment.",
                                  }),
                                ),
                              }),
                              [
                                Schema.Record(
                                  Schema.String,
                                  Schema.Json.annotate({
                                    expected: "JSON value",
                                  }),
                                ),
                              ],
                            ).annotate({
                              description: "ACH-specific network options.",
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
                        description: "Per-network configuration options.",
                      }),
                    ),
                    preferred_networks: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "ach",
                          "fedwire",
                          "fps",
                          "rtp",
                          "sepa",
                          "swift",
                        ]),
                      ).annotate({
                        description:
                          "The preferred networks to use for this PayoutIntent.",
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
                  description: "Options for bank account payout methods.",
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
            description: "Payout method options for the PayoutIntent.",
          }),
        ),
        recipient: Schema.optionalKey(
          Schema.String.annotate({
            description: "The recipient ID for the PayoutIntent.",
          }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "To which payout method the payout is sent." }),
  ),
  id: Schema.String,
});
export const PostV2MoneyManagementPayoutIntentsIdOutput =
  Stripev2_money_management_payout_intent;
export const PostV2MoneyManagementPayoutIntentsIdError = Schema.Union(
  [
    Stripev2_error_account_not_configured_as_recipient,
    Stripev2_error_amount_too_large_for_payout_method,
    Stripev2_error_amount_too_large_for_preferred_networks,
    Stripev2_error_cop_not_accepted,
    Stripev2_error_default_payout_method_config_not_found,
    Stripev2_error_financial_account_capability_not_enabled,
    Stripev2_error_financial_account_capability_restricted,
    Stripev2_error_from_balance_unsupported_currency,
    Stripev2_error_from_financial_account_not_found,
    Stripev2_error_invalid_outbound_flow,
    Stripev2_error_invalid_payout_method_country,
    Stripev2_error_manual_confirmation_not_supported_with_schedule_options,
    Stripev2_error_network_not_supported_for_payout_method,
    Stripev2_error_not_found,
    Stripev2_error_outbound_flow_from_closed_financial_account_unsupported,
    Stripev2_error_outbound_flow_unsupported_country,
    Stripev2_error_outbound_flow_unsupported_currency,
    Stripev2_error_outbound_payment_not_allowed,
    Stripev2_error_payout_intent_cannot_be_modified,
    Stripev2_error_payout_intent_scheduled_date_exceed_maximum,
    Stripev2_error_payout_intent_scheduled_date_too_soon,
    Stripev2_error_payout_method_archived,
    Stripev2_error_payout_method_disabled,
    Stripev2_error_payout_method_expired,
    Stripev2_error_payout_method_invalid,
    Stripev2_error_payout_method_unsupported_currency,
    Stripev2_error_pending_financial_account,
    Stripev2_error_preferred_networks_not_available,
    Stripev2_error_recipient_capability_not_active,
    Stripev2_error_recipient_email_does_not_exist,
    Stripev2_error_recipient_feature_not_active,
    Stripev2_error_schedule_options_incompatible_with_confirmation_required,
    Stripev2_error_submission_not_supported,
    Stripev2_error_to_recipient_not_found,
    Stripev2_error_unsupported_operation_with_managed_financial_account,
    Stripev2_error_unsupported_parameter_delivery_options,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementPayoutIntentsIdCancelInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2MoneyManagementPayoutIntentsIdCancelOutput =
  Stripev2_money_management_payout_intent;
export const PostV2MoneyManagementPayoutIntentsIdCancelError = Schema.Union(
  [
    Stripev2_error_not_found,
    Stripev2_error_payout_intent_not_cancelable,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementPayoutIntentsIdConfirmInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2MoneyManagementPayoutIntentsIdConfirmOutput =
  Stripev2_money_management_payout_intent;
export const PostV2MoneyManagementPayoutIntentsIdConfirmError = Schema.Union(
  [
    Stripev2_error_invalid_outbound_flow,
    Stripev2_error_not_found,
    Stripev2_error_payout_intent_fx_quote_expired,
    Stripev2_error_payout_intent_large_rate_drift,
    Stripev2_error_payout_intent_not_confirmable,
    Stripev2_error_payout_intent_scheduled_date_exceed_maximum,
    Stripev2_error_payout_intent_scheduled_date_too_soon,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteInput =
  Schema.Struct({ id: Schema.String });
export const PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOutput =
  Stripev2_money_management_payout_intent;
export const PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteError =
  Schema.Union(
    [
      Stripev2_error_fx_quote_invalid_for_payout_intent_without_fx,
      Stripev2_error_not_found,
      Stripev2_error_payout_intent_cannot_be_modified,
      Stripev2_error_payout_method_archived,
      Stripev2_error,
    ],
    { mode: "oneOf" },
  );
export const PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationInput =
  Schema.Struct({ id: Schema.String });
export const PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOutput =
  Stripev2_money_management_payout_intent;
export const PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationError =
  Schema.Union(
    [
      Stripev2_error_not_found,
      Stripev2_error_payout_intent_cannot_be_modified,
      Stripev2_error_payout_method_archived,
      Stripev2_error,
    ],
    { mode: "oneOf" },
  );
/**
 * The GetV2MoneyManagementPayoutIntentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementPayoutIntentsOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementPayoutIntentsInput;
  readonly output: typeof GetV2MoneyManagementPayoutIntentsOutput;
  readonly error: typeof GetV2MoneyManagementPayoutIntentsError;
} = {
  name: "GetV2MoneyManagementPayoutIntents",
  method: "GET",
  path: "/v2/money_management/payout_intents",
  pathParameters: [],
  queryParameters: ["limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementPayoutIntentsInput,
  output: GetV2MoneyManagementPayoutIntentsOutput,
  error: GetV2MoneyManagementPayoutIntentsError,
};
/**
 * The PostV2MoneyManagementPayoutIntentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementPayoutIntentsOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementPayoutIntentsInput;
  readonly output: typeof PostV2MoneyManagementPayoutIntentsOutput;
  readonly error: typeof PostV2MoneyManagementPayoutIntentsError;
} = {
  name: "PostV2MoneyManagementPayoutIntents",
  method: "POST",
  path: "/v2/money_management/payout_intents",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementPayoutIntentsInput,
  output: PostV2MoneyManagementPayoutIntentsOutput,
  error: PostV2MoneyManagementPayoutIntentsError,
};
/**
 * The GetV2MoneyManagementPayoutIntentsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementPayoutIntentsIdOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementPayoutIntentsIdInput;
  readonly output: typeof GetV2MoneyManagementPayoutIntentsIdOutput;
  readonly error: typeof GetV2MoneyManagementPayoutIntentsIdError;
} = {
  name: "GetV2MoneyManagementPayoutIntentsId",
  method: "GET",
  path: "/v2/money_management/payout_intents/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementPayoutIntentsIdInput,
  output: GetV2MoneyManagementPayoutIntentsIdOutput,
  error: GetV2MoneyManagementPayoutIntentsIdError,
};
/**
 * The PostV2MoneyManagementPayoutIntentsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementPayoutIntentsIdOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementPayoutIntentsIdInput;
  readonly output: typeof PostV2MoneyManagementPayoutIntentsIdOutput;
  readonly error: typeof PostV2MoneyManagementPayoutIntentsIdError;
} = {
  name: "PostV2MoneyManagementPayoutIntentsId",
  method: "POST",
  path: "/v2/money_management/payout_intents/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementPayoutIntentsIdInput,
  output: PostV2MoneyManagementPayoutIntentsIdOutput,
  error: PostV2MoneyManagementPayoutIntentsIdError,
};
/**
 * The PostV2MoneyManagementPayoutIntentsIdCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementPayoutIntentsIdCancelOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementPayoutIntentsIdCancelInput;
  readonly output: typeof PostV2MoneyManagementPayoutIntentsIdCancelOutput;
  readonly error: typeof PostV2MoneyManagementPayoutIntentsIdCancelError;
} = {
  name: "PostV2MoneyManagementPayoutIntentsIdCancel",
  method: "POST",
  path: "/v2/money_management/payout_intents/{id}/cancel",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementPayoutIntentsIdCancelInput,
  output: PostV2MoneyManagementPayoutIntentsIdCancelOutput,
  error: PostV2MoneyManagementPayoutIntentsIdCancelError,
};
/**
 * The PostV2MoneyManagementPayoutIntentsIdConfirmOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementPayoutIntentsIdConfirmOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementPayoutIntentsIdConfirmInput;
  readonly output: typeof PostV2MoneyManagementPayoutIntentsIdConfirmOutput;
  readonly error: typeof PostV2MoneyManagementPayoutIntentsIdConfirmError;
} = {
  name: "PostV2MoneyManagementPayoutIntentsIdConfirm",
  method: "POST",
  path: "/v2/money_management/payout_intents/{id}/confirm",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementPayoutIntentsIdConfirmInput,
  output: PostV2MoneyManagementPayoutIntentsIdConfirmOutput,
  error: PostV2MoneyManagementPayoutIntentsIdConfirmError,
};
/**
 * The PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteInput;
  readonly output: typeof PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOutput;
  readonly error: typeof PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteError;
} = {
  name: "PostV2MoneyManagementPayoutIntentsIdRefreshFxQuote",
  method: "POST",
  path: "/v2/money_management/payout_intents/{id}/refresh_fx_quote",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteInput,
  output: PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOutput,
  error: PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteError,
};
/**
 * The PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationInput;
  readonly output: typeof PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOutput;
  readonly error: typeof PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationError;
} = {
  name: "PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerification",
  method: "POST",
  path: "/v2/money_management/payout_intents/{id}/refresh_recipient_verification",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationInput,
  output:
    PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOutput,
  error: PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationError,
};
/**
 * The makeMoneyManagementPayoutIntentsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeMoneyManagementPayoutIntentsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetV2MoneyManagementPayoutIntents function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2MoneyManagementPayoutIntents = Effect.fn(
    "moneyManagementPayoutIntents.GetV2MoneyManagementPayoutIntents",
  )(function* (input: GetV2MoneyManagementPayoutIntentsInput) {
    const response: GetV2MoneyManagementPayoutIntentsOutput =
      yield* client.invoke(GetV2MoneyManagementPayoutIntentsOperation, input);
    return response;
  });
  /**
   * The PostV2MoneyManagementPayoutIntents function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2MoneyManagementPayoutIntents = Effect.fn(
    "moneyManagementPayoutIntents.PostV2MoneyManagementPayoutIntents",
  )(function* (input: PostV2MoneyManagementPayoutIntentsInput) {
    const response: PostV2MoneyManagementPayoutIntentsOutput =
      yield* client.invoke(PostV2MoneyManagementPayoutIntentsOperation, input);
    return response;
  });
  /**
   * The GetV2MoneyManagementPayoutIntentsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2MoneyManagementPayoutIntentsId = Effect.fn(
    "moneyManagementPayoutIntents.GetV2MoneyManagementPayoutIntentsId",
  )(function* (input: GetV2MoneyManagementPayoutIntentsIdInput) {
    const response: GetV2MoneyManagementPayoutIntentsIdOutput =
      yield* client.invoke(GetV2MoneyManagementPayoutIntentsIdOperation, input);
    return response;
  });
  /**
   * The PostV2MoneyManagementPayoutIntentsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2MoneyManagementPayoutIntentsId = Effect.fn(
    "moneyManagementPayoutIntents.PostV2MoneyManagementPayoutIntentsId",
  )(function* (input: PostV2MoneyManagementPayoutIntentsIdInput) {
    const response: PostV2MoneyManagementPayoutIntentsIdOutput =
      yield* client.invoke(
        PostV2MoneyManagementPayoutIntentsIdOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2MoneyManagementPayoutIntentsIdCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2MoneyManagementPayoutIntentsIdCancel = Effect.fn(
    "moneyManagementPayoutIntents.PostV2MoneyManagementPayoutIntentsIdCancel",
  )(function* (input: PostV2MoneyManagementPayoutIntentsIdCancelInput) {
    const response: PostV2MoneyManagementPayoutIntentsIdCancelOutput =
      yield* client.invoke(
        PostV2MoneyManagementPayoutIntentsIdCancelOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2MoneyManagementPayoutIntentsIdConfirm function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2MoneyManagementPayoutIntentsIdConfirm = Effect.fn(
    "moneyManagementPayoutIntents.PostV2MoneyManagementPayoutIntentsIdConfirm",
  )(function* (input: PostV2MoneyManagementPayoutIntentsIdConfirmInput) {
    const response: PostV2MoneyManagementPayoutIntentsIdConfirmOutput =
      yield* client.invoke(
        PostV2MoneyManagementPayoutIntentsIdConfirmOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2MoneyManagementPayoutIntentsIdRefreshFxQuote function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2MoneyManagementPayoutIntentsIdRefreshFxQuote = Effect.fn(
    "moneyManagementPayoutIntents.PostV2MoneyManagementPayoutIntentsIdRefreshFxQuote",
  )(function* (input: PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteInput) {
    const response: PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOutput =
      yield* client.invoke(
        PostV2MoneyManagementPayoutIntentsIdRefreshFxQuoteOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerification function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerification =
    Effect.fn(
      "moneyManagementPayoutIntents.PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerification",
    )(function* (
      input: PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationInput,
    ) {
      const response: PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOutput =
        yield* client.invoke(
          PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerificationOperation,
          input,
        );
      return response;
    });
  return {
    GetV2MoneyManagementPayoutIntents,
    PostV2MoneyManagementPayoutIntents,
    GetV2MoneyManagementPayoutIntentsId,
    PostV2MoneyManagementPayoutIntentsId,
    PostV2MoneyManagementPayoutIntentsIdCancel,
    PostV2MoneyManagementPayoutIntentsIdConfirm,
    PostV2MoneyManagementPayoutIntentsIdRefreshFxQuote,
    PostV2MoneyManagementPayoutIntentsIdRefreshRecipientVerification,
  };
});
