// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_money_management_outbound_payment } from "./models/common.js";
import {
  Stripev2_error,
  Stripev2_error_account_not_configured_as_recipient,
  Stripev2_error_amount_too_large_for_payout_method,
  Stripev2_error_amount_too_large_for_preferred_networks,
  Stripev2_error_amount_too_large_for_selected_delivery_option,
  Stripev2_error_approval_required,
  Stripev2_error_approvals_cannot_be_only_approver_of_own_request,
  Stripev2_error_approvals_conflicting_approval_request_exists,
  Stripev2_error_approvals_request_blocked,
  Stripev2_error_blocked_payout_method,
  Stripev2_error_business_network_insufficient_permissions,
  Stripev2_error_business_network_profile_hidden,
  Stripev2_error_business_network_profile_not_found,
  Stripev2_error_card_payout_method_not_supported,
  Stripev2_error_cop_not_accepted,
  Stripev2_error_currency_required,
  Stripev2_error_default_payout_method_config_not_found,
  Stripev2_error_delivery_option_not_available,
  Stripev2_error_delivery_option_not_supported,
  Stripev2_error_financial_account_capability_not_enabled,
  Stripev2_error_financial_account_capability_restricted,
  Stripev2_error_financial_account_operation_unsupported_for_property,
  Stripev2_error_financial_account_operation_unsupported_for_type,
  Stripev2_error_financial_address_creation_required,
  Stripev2_error_from_balance_type_not_found,
  Stripev2_error_from_balance_unsupported_currency,
  Stripev2_error_from_financial_account_not_found,
  Stripev2_error_fx_quote_expired,
  Stripev2_error_idempotency_conflict,
  Stripev2_error_idempotency_error,
  Stripev2_error_incompatible_delivery_options,
  Stripev2_error_insufficient_funds,
  Stripev2_error_invalid_filters,
  Stripev2_error_invalid_outbound_flow,
  Stripev2_error_invalid_page_token,
  Stripev2_error_invalid_payout_method_country,
  Stripev2_error_invalid_payout_method_options,
  Stripev2_error_large_rate_drift,
  Stripev2_error_network_not_supported_for_payout_method,
  Stripev2_error_no_suitable_delivery_options_for_large_amount,
  Stripev2_error_not_found,
  Stripev2_error_outbound_flow_from_closed_financial_account_not_supported,
  Stripev2_error_outbound_flow_from_closed_financial_account_unsupported,
  Stripev2_error_outbound_flow_unsupported_country,
  Stripev2_error_outbound_flow_unsupported_currency,
  Stripev2_error_outbound_payment_already_canceled,
  Stripev2_error_outbound_payment_cannot_be_processed,
  Stripev2_error_outbound_payment_check_recipient_name_too_long,
  Stripev2_error_outbound_payment_ineligible_recipient_address,
  Stripev2_error_outbound_payment_invalid_check_attachment,
  Stripev2_error_outbound_payment_invalid_check_signature,
  Stripev2_error_outbound_payment_invalid_paper_check_attachment,
  Stripev2_error_outbound_payment_invalid_paper_check_signature,
  Stripev2_error_outbound_payment_memo_restricted_term,
  Stripev2_error_outbound_payment_not_allowed,
  Stripev2_error_outbound_payment_not_cancelable,
  Stripev2_error_outbound_payment_paper_check_recipient_name_too_long,
  Stripev2_error_outbound_payment_quote_mismatch,
  Stripev2_error_outbound_payment_quote_missing,
  Stripev2_error_outbound_payment_recipient_verification_already_consumed,
  Stripev2_error_outbound_payment_recipient_verification_awaiting_acknowledgement,
  Stripev2_error_outbound_payment_recipient_verification_expired,
  Stripev2_error_outbound_payment_recipient_verification_missing,
  Stripev2_error_outbound_payment_recipient_verification_not_found,
  Stripev2_error_outbound_payment_recipient_verification_payout_method_mismatch,
  Stripev2_error_outbound_payment_recipient_verification_recipient_mismatch,
  Stripev2_error_outbound_payment_recipient_verification_recipient_name_outdated,
  Stripev2_error_outbound_payment_requires_payout_intent,
  Stripev2_error_payout_method_archived,
  Stripev2_error_payout_method_disabled,
  Stripev2_error_payout_method_expired,
  Stripev2_error_payout_method_invalid,
  Stripev2_error_payout_method_unsupported_currency,
  Stripev2_error_payout_method_unusable,
  Stripev2_error_pending_financial_account,
  Stripev2_error_preferred_networks_not_available,
  Stripev2_error_recipient_amount_limit_exceeded,
  Stripev2_error_recipient_capability_not_active,
  Stripev2_error_recipient_count_limit_exceeded,
  Stripev2_error_recipient_email_does_not_exist,
  Stripev2_error_recipient_feature_not_active,
  Stripev2_error_recipient_feature_not_active_for_suitable_delivery_option,
  Stripev2_error_storer_capability_missing,
  Stripev2_error_storer_capability_not_active,
  Stripev2_error_submission_not_supported,
  Stripev2_error_to_recipient_not_found,
  Stripev2_error_unsupported_currency,
  Stripev2_error_unsupported_operation_with_managed_financial_account,
  Stripev2_error_unsupported_parameter_delivery_options,
} from "./models/v2Errors.js";

export type GetV2MoneyManagementOutboundPaymentsInput = {
  readonly created?: {
    readonly gt?: string;
    readonly gte?: string;
    readonly lt?: string;
    readonly lte?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly limit?: number;
  readonly page?: string;
  readonly recipient?: string;
  readonly status?: ReadonlyArray<
    "canceled" | "failed" | "posted" | "processing" | "returned"
  >;
};
export type GetV2MoneyManagementOutboundPaymentsOutput = {
  readonly data: ReadonlyArray<Stripev2_money_management_outbound_payment>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2MoneyManagementOutboundPaymentsError =
  | Stripev2_error_invalid_filters
  | Stripev2_error_invalid_page_token
  | Stripev2_error;
export type PostV2MoneyManagementOutboundPaymentsInput = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly description?: string;
  readonly from: {
    readonly currency: string;
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly recipient_notification?: {
    readonly setting: "configured" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly recipient_verification?: string;
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
    readonly recipient: string;
  } & { readonly [x: string]: Schema.Json };
};
export type PostV2MoneyManagementOutboundPaymentsOutput =
  Stripev2_money_management_outbound_payment;
export type PostV2MoneyManagementOutboundPaymentsError =
  | Stripev2_error_account_not_configured_as_recipient
  | Stripev2_error_amount_too_large_for_payout_method
  | Stripev2_error_amount_too_large_for_preferred_networks
  | Stripev2_error_amount_too_large_for_selected_delivery_option
  | Stripev2_error_approval_required
  | Stripev2_error_approvals_cannot_be_only_approver_of_own_request
  | Stripev2_error_approvals_conflicting_approval_request_exists
  | Stripev2_error_approvals_request_blocked
  | Stripev2_error_blocked_payout_method
  | Stripev2_error_business_network_insufficient_permissions
  | Stripev2_error_business_network_profile_hidden
  | Stripev2_error_business_network_profile_not_found
  | Stripev2_error_card_payout_method_not_supported
  | Stripev2_error_cop_not_accepted
  | Stripev2_error_currency_required
  | Stripev2_error_default_payout_method_config_not_found
  | Stripev2_error_delivery_option_not_available
  | Stripev2_error_delivery_option_not_supported
  | Stripev2_error_financial_account_capability_not_enabled
  | Stripev2_error_financial_account_capability_restricted
  | Stripev2_error_financial_account_operation_unsupported_for_property
  | Stripev2_error_financial_account_operation_unsupported_for_type
  | Stripev2_error_financial_address_creation_required
  | Stripev2_error_from_balance_type_not_found
  | Stripev2_error_from_balance_unsupported_currency
  | Stripev2_error_from_financial_account_not_found
  | Stripev2_error_fx_quote_expired
  | Stripev2_error_idempotency_conflict
  | Stripev2_error_idempotency_error
  | Stripev2_error_incompatible_delivery_options
  | Stripev2_error_insufficient_funds
  | Stripev2_error_invalid_outbound_flow
  | Stripev2_error_invalid_payout_method_country
  | Stripev2_error_invalid_payout_method_options
  | Stripev2_error_large_rate_drift
  | Stripev2_error_network_not_supported_for_payout_method
  | Stripev2_error_no_suitable_delivery_options_for_large_amount
  | Stripev2_error_outbound_flow_from_closed_financial_account_not_supported
  | Stripev2_error_outbound_flow_from_closed_financial_account_unsupported
  | Stripev2_error_outbound_flow_unsupported_country
  | Stripev2_error_outbound_flow_unsupported_currency
  | Stripev2_error_outbound_payment_cannot_be_processed
  | Stripev2_error_outbound_payment_check_recipient_name_too_long
  | Stripev2_error_outbound_payment_ineligible_recipient_address
  | Stripev2_error_outbound_payment_invalid_check_attachment
  | Stripev2_error_outbound_payment_invalid_check_signature
  | Stripev2_error_outbound_payment_invalid_paper_check_attachment
  | Stripev2_error_outbound_payment_invalid_paper_check_signature
  | Stripev2_error_outbound_payment_memo_restricted_term
  | Stripev2_error_outbound_payment_not_allowed
  | Stripev2_error_outbound_payment_paper_check_recipient_name_too_long
  | Stripev2_error_outbound_payment_quote_mismatch
  | Stripev2_error_outbound_payment_quote_missing
  | Stripev2_error_outbound_payment_recipient_verification_already_consumed
  | Stripev2_error_outbound_payment_recipient_verification_awaiting_acknowledgement
  | Stripev2_error_outbound_payment_recipient_verification_expired
  | Stripev2_error_outbound_payment_recipient_verification_missing
  | Stripev2_error_outbound_payment_recipient_verification_not_found
  | Stripev2_error_outbound_payment_recipient_verification_payout_method_mismatch
  | Stripev2_error_outbound_payment_recipient_verification_recipient_mismatch
  | Stripev2_error_outbound_payment_recipient_verification_recipient_name_outdated
  | Stripev2_error_outbound_payment_requires_payout_intent
  | Stripev2_error_payout_method_archived
  | Stripev2_error_payout_method_disabled
  | Stripev2_error_payout_method_expired
  | Stripev2_error_payout_method_invalid
  | Stripev2_error_payout_method_unsupported_currency
  | Stripev2_error_payout_method_unusable
  | Stripev2_error_pending_financial_account
  | Stripev2_error_preferred_networks_not_available
  | Stripev2_error_recipient_amount_limit_exceeded
  | Stripev2_error_recipient_capability_not_active
  | Stripev2_error_recipient_count_limit_exceeded
  | Stripev2_error_recipient_email_does_not_exist
  | Stripev2_error_recipient_feature_not_active
  | Stripev2_error_recipient_feature_not_active_for_suitable_delivery_option
  | Stripev2_error_storer_capability_missing
  | Stripev2_error_storer_capability_not_active
  | Stripev2_error_submission_not_supported
  | Stripev2_error_to_recipient_not_found
  | Stripev2_error_unsupported_currency
  | Stripev2_error_unsupported_operation_with_managed_financial_account
  | Stripev2_error_unsupported_parameter_delivery_options
  | Stripev2_error;
export type GetV2MoneyManagementOutboundPaymentsIdInput = {
  readonly id: string;
};
export type GetV2MoneyManagementOutboundPaymentsIdOutput =
  Stripev2_money_management_outbound_payment;
export type GetV2MoneyManagementOutboundPaymentsIdError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2MoneyManagementOutboundPaymentsIdCancelInput = {
  readonly id: string;
};
export type PostV2MoneyManagementOutboundPaymentsIdCancelOutput =
  Stripev2_money_management_outbound_payment;
export type PostV2MoneyManagementOutboundPaymentsIdCancelError =
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error_outbound_payment_already_canceled
  | Stripev2_error_outbound_payment_not_cancelable
  | Stripev2_error;

export const GetV2MoneyManagementOutboundPaymentsInput = Schema.Struct({
  created: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        gt: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created after the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
        gte: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created on or after the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
        lt: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created before the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
        lte: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created on or before the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ),
  ),
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
  recipient: Schema.optionalKey(Schema.String),
  status: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "canceled",
        "failed",
        "posted",
        "processing",
        "returned",
      ]),
    ),
  ),
});
export const GetV2MoneyManagementOutboundPaymentsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_money_management_outbound_payment).annotate({
      description: "The OutboundPayments retrieved.",
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
export const GetV2MoneyManagementOutboundPaymentsError = Schema.Union(
  [
    Stripev2_error_invalid_filters,
    Stripev2_error_invalid_page_token,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementOutboundPaymentsInput = Schema.Struct({
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
  ).annotate({
    description: "The requested amount and currency for the OutboundPayment.",
  }),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the OutboundPayment. Often useful for displaying to users.",
    }),
  ),
  from: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.String.annotate({
        description: "Describes the FinancialAmount's currency drawn from.",
      }),
      financial_account: Schema.String.annotate({
        description: "The FinancialAccount that funds were pulled from.",
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
      "From which FinancialAccount and BalanceType to pull funds from.",
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
        "Details about the notification settings for the OutboundPayment recipient.",
    }),
  ),
  recipient_verification: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the RecipientVerification for this OutboundPayment. Required where recipient-name verification is mandated before creating an OutboundPayment.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The description that appears on the receiving end for an OutboundPayment (for example, on a bank statement). Must be between 3 and 22 characters long for most destinations (500 for FinancialAccount destinations), and not contain profanity.",
    }),
  ),
  to: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Describes the currency to send to the recipient.\nIf included, this currency must match a currency supported by the destination.\nCan be omitted in the following cases:\n- destination only supports one currency\n- destination supports multiple currencies and one matches `from.currency`\n- destination supports multiple currencies and one matches `amount.currency`\nWhen both `from.currency` and `amount.currency` are supported, Stripe selects `from.currency` to minimize currency conversion.",
        }),
      ),
      payout_method: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The payout method which the OutboundPayment uses to send payout.",
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
                        "The preferred networks to use for this OutboundPayment.",
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
          description: "Payout method options for the OutboundPayment.",
        }),
      ),
      recipient: Schema.String.annotate({
        description: "To which account the OutboundPayment is sent.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "To which payout method to send the OutboundPayment.",
  }),
});
export const PostV2MoneyManagementOutboundPaymentsOutput =
  Stripev2_money_management_outbound_payment;
export const PostV2MoneyManagementOutboundPaymentsError = Schema.Union(
  [
    Stripev2_error_account_not_configured_as_recipient,
    Stripev2_error_amount_too_large_for_payout_method,
    Stripev2_error_amount_too_large_for_preferred_networks,
    Stripev2_error_amount_too_large_for_selected_delivery_option,
    Stripev2_error_approval_required,
    Stripev2_error_approvals_cannot_be_only_approver_of_own_request,
    Stripev2_error_approvals_conflicting_approval_request_exists,
    Stripev2_error_approvals_request_blocked,
    Stripev2_error_blocked_payout_method,
    Stripev2_error_business_network_insufficient_permissions,
    Stripev2_error_business_network_profile_hidden,
    Stripev2_error_business_network_profile_not_found,
    Stripev2_error_card_payout_method_not_supported,
    Stripev2_error_cop_not_accepted,
    Stripev2_error_currency_required,
    Stripev2_error_default_payout_method_config_not_found,
    Stripev2_error_delivery_option_not_available,
    Stripev2_error_delivery_option_not_supported,
    Stripev2_error_financial_account_capability_not_enabled,
    Stripev2_error_financial_account_capability_restricted,
    Stripev2_error_financial_account_operation_unsupported_for_property,
    Stripev2_error_financial_account_operation_unsupported_for_type,
    Stripev2_error_financial_address_creation_required,
    Stripev2_error_from_balance_type_not_found,
    Stripev2_error_from_balance_unsupported_currency,
    Stripev2_error_from_financial_account_not_found,
    Stripev2_error_fx_quote_expired,
    Stripev2_error_idempotency_conflict,
    Stripev2_error_idempotency_error,
    Stripev2_error_incompatible_delivery_options,
    Stripev2_error_insufficient_funds,
    Stripev2_error_invalid_outbound_flow,
    Stripev2_error_invalid_payout_method_country,
    Stripev2_error_invalid_payout_method_options,
    Stripev2_error_large_rate_drift,
    Stripev2_error_network_not_supported_for_payout_method,
    Stripev2_error_no_suitable_delivery_options_for_large_amount,
    Stripev2_error_outbound_flow_from_closed_financial_account_not_supported,
    Stripev2_error_outbound_flow_from_closed_financial_account_unsupported,
    Stripev2_error_outbound_flow_unsupported_country,
    Stripev2_error_outbound_flow_unsupported_currency,
    Stripev2_error_outbound_payment_cannot_be_processed,
    Stripev2_error_outbound_payment_check_recipient_name_too_long,
    Stripev2_error_outbound_payment_ineligible_recipient_address,
    Stripev2_error_outbound_payment_invalid_check_attachment,
    Stripev2_error_outbound_payment_invalid_check_signature,
    Stripev2_error_outbound_payment_invalid_paper_check_attachment,
    Stripev2_error_outbound_payment_invalid_paper_check_signature,
    Stripev2_error_outbound_payment_memo_restricted_term,
    Stripev2_error_outbound_payment_not_allowed,
    Stripev2_error_outbound_payment_paper_check_recipient_name_too_long,
    Stripev2_error_outbound_payment_quote_mismatch,
    Stripev2_error_outbound_payment_quote_missing,
    Stripev2_error_outbound_payment_recipient_verification_already_consumed,
    Stripev2_error_outbound_payment_recipient_verification_awaiting_acknowledgement,
    Stripev2_error_outbound_payment_recipient_verification_expired,
    Stripev2_error_outbound_payment_recipient_verification_missing,
    Stripev2_error_outbound_payment_recipient_verification_not_found,
    Stripev2_error_outbound_payment_recipient_verification_payout_method_mismatch,
    Stripev2_error_outbound_payment_recipient_verification_recipient_mismatch,
    Stripev2_error_outbound_payment_recipient_verification_recipient_name_outdated,
    Stripev2_error_outbound_payment_requires_payout_intent,
    Stripev2_error_payout_method_archived,
    Stripev2_error_payout_method_disabled,
    Stripev2_error_payout_method_expired,
    Stripev2_error_payout_method_invalid,
    Stripev2_error_payout_method_unsupported_currency,
    Stripev2_error_payout_method_unusable,
    Stripev2_error_pending_financial_account,
    Stripev2_error_preferred_networks_not_available,
    Stripev2_error_recipient_amount_limit_exceeded,
    Stripev2_error_recipient_capability_not_active,
    Stripev2_error_recipient_count_limit_exceeded,
    Stripev2_error_recipient_email_does_not_exist,
    Stripev2_error_recipient_feature_not_active,
    Stripev2_error_recipient_feature_not_active_for_suitable_delivery_option,
    Stripev2_error_storer_capability_missing,
    Stripev2_error_storer_capability_not_active,
    Stripev2_error_submission_not_supported,
    Stripev2_error_to_recipient_not_found,
    Stripev2_error_unsupported_currency,
    Stripev2_error_unsupported_operation_with_managed_financial_account,
    Stripev2_error_unsupported_parameter_delivery_options,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2MoneyManagementOutboundPaymentsIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2MoneyManagementOutboundPaymentsIdOutput =
  Stripev2_money_management_outbound_payment;
export const GetV2MoneyManagementOutboundPaymentsIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementOutboundPaymentsIdCancelInput = Schema.Struct(
  { id: Schema.String },
);
export const PostV2MoneyManagementOutboundPaymentsIdCancelOutput =
  Stripev2_money_management_outbound_payment;
export const PostV2MoneyManagementOutboundPaymentsIdCancelError = Schema.Union(
  [
    Stripev2_error_idempotency_error,
    Stripev2_error_not_found,
    Stripev2_error_outbound_payment_already_canceled,
    Stripev2_error_outbound_payment_not_cancelable,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
/**
 * The GetV2MoneyManagementOutboundPaymentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementOutboundPaymentsOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementOutboundPaymentsInput;
  readonly output: typeof GetV2MoneyManagementOutboundPaymentsOutput;
  readonly error: typeof GetV2MoneyManagementOutboundPaymentsError;
} = {
  name: "GetV2MoneyManagementOutboundPayments",
  method: "GET",
  path: "/v2/money_management/outbound_payments",
  pathParameters: [],
  queryParameters: ["created", "limit", "page", "recipient", "status"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementOutboundPaymentsInput,
  output: GetV2MoneyManagementOutboundPaymentsOutput,
  error: GetV2MoneyManagementOutboundPaymentsError,
};
/**
 * The PostV2MoneyManagementOutboundPaymentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementOutboundPaymentsOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementOutboundPaymentsInput;
  readonly output: typeof PostV2MoneyManagementOutboundPaymentsOutput;
  readonly error: typeof PostV2MoneyManagementOutboundPaymentsError;
} = {
  name: "PostV2MoneyManagementOutboundPayments",
  method: "POST",
  path: "/v2/money_management/outbound_payments",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementOutboundPaymentsInput,
  output: PostV2MoneyManagementOutboundPaymentsOutput,
  error: PostV2MoneyManagementOutboundPaymentsError,
};
/**
 * The GetV2MoneyManagementOutboundPaymentsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementOutboundPaymentsIdOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementOutboundPaymentsIdInput;
  readonly output: typeof GetV2MoneyManagementOutboundPaymentsIdOutput;
  readonly error: typeof GetV2MoneyManagementOutboundPaymentsIdError;
} = {
  name: "GetV2MoneyManagementOutboundPaymentsId",
  method: "GET",
  path: "/v2/money_management/outbound_payments/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementOutboundPaymentsIdInput,
  output: GetV2MoneyManagementOutboundPaymentsIdOutput,
  error: GetV2MoneyManagementOutboundPaymentsIdError,
};
/**
 * The PostV2MoneyManagementOutboundPaymentsIdCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementOutboundPaymentsIdCancelOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementOutboundPaymentsIdCancelInput;
  readonly output: typeof PostV2MoneyManagementOutboundPaymentsIdCancelOutput;
  readonly error: typeof PostV2MoneyManagementOutboundPaymentsIdCancelError;
} = {
  name: "PostV2MoneyManagementOutboundPaymentsIdCancel",
  method: "POST",
  path: "/v2/money_management/outbound_payments/{id}/cancel",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementOutboundPaymentsIdCancelInput,
  output: PostV2MoneyManagementOutboundPaymentsIdCancelOutput,
  error: PostV2MoneyManagementOutboundPaymentsIdCancelError,
};
/**
 * The makeMoneyManagementOutboundPaymentsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeMoneyManagementOutboundPaymentsClient = Effect.gen(
  function* () {
    const client = yield* StripeClient;
    /**
     * The GetV2MoneyManagementOutboundPayments function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementOutboundPayments = Effect.fn(
      "moneyManagementOutboundPayments.GetV2MoneyManagementOutboundPayments",
    )(function* (input: GetV2MoneyManagementOutboundPaymentsInput) {
      const response: GetV2MoneyManagementOutboundPaymentsOutput =
        yield* client.invoke(
          GetV2MoneyManagementOutboundPaymentsOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementOutboundPayments function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementOutboundPayments = Effect.fn(
      "moneyManagementOutboundPayments.PostV2MoneyManagementOutboundPayments",
    )(function* (input: PostV2MoneyManagementOutboundPaymentsInput) {
      const response: PostV2MoneyManagementOutboundPaymentsOutput =
        yield* client.invoke(
          PostV2MoneyManagementOutboundPaymentsOperation,
          input,
        );
      return response;
    });
    /**
     * The GetV2MoneyManagementOutboundPaymentsId function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementOutboundPaymentsId = Effect.fn(
      "moneyManagementOutboundPayments.GetV2MoneyManagementOutboundPaymentsId",
    )(function* (input: GetV2MoneyManagementOutboundPaymentsIdInput) {
      const response: GetV2MoneyManagementOutboundPaymentsIdOutput =
        yield* client.invoke(
          GetV2MoneyManagementOutboundPaymentsIdOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementOutboundPaymentsIdCancel function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementOutboundPaymentsIdCancel = Effect.fn(
      "moneyManagementOutboundPayments.PostV2MoneyManagementOutboundPaymentsIdCancel",
    )(function* (input: PostV2MoneyManagementOutboundPaymentsIdCancelInput) {
      const response: PostV2MoneyManagementOutboundPaymentsIdCancelOutput =
        yield* client.invoke(
          PostV2MoneyManagementOutboundPaymentsIdCancelOperation,
          input,
        );
      return response;
    });
    return {
      GetV2MoneyManagementOutboundPayments,
      PostV2MoneyManagementOutboundPayments,
      GetV2MoneyManagementOutboundPaymentsId,
      PostV2MoneyManagementOutboundPaymentsIdCancel,
    };
  },
);
