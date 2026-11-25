// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  Stripeaccount,
  Stripeaccount_capability_future_requirements,
  Stripeaccount_capability_requirements,
  Stripeaccount_requirements_alternative,
  Stripeaccount_requirements_error,
} from "./accounts.js";
import {
  Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_parent,
  Stripebilling_bill_resource_invoicing_pricing_pricing,
  Stripebilling_bill_resource_invoicing_taxes_tax,
  Stripebilling_clocks_resource_status_details_status_details,
  Stripebilling_credit_balance_transaction,
  Stripebilling_feedback_option,
  Stripebilling_meter,
} from "./billing.js";
import {
  Stripeprice,
  Stripeprice_tier,
  Stripetax_code,
  Stripetax_rate,
} from "./catalog.js";
import { Stripecharge, Striperefund } from "./charges.js";
import {
  Stripecustomer,
  Stripecustomer_acceptance,
  Stripecustomer_balance_customer_balance_settings,
  Stripecustomer_balance_transaction,
  Stripedeleted_customer,
} from "./customers.js";
import {
  Stripeinvoice,
  Stripeinvoice_item_proration_credited_items,
  Stripeinvoice_line_item_period,
  Stripeinvoice_setting_quote_setting,
  Stripeinvoices_resource_pretax_credit_amount,
  Stripeinvoices_resource_shipping_cost,
} from "./invoices.js";
import { Stripepayment_intent } from "./paymentIntents.js";
import { Stripepayment_method_details_passthrough_card } from "./paymentMethodDetails.js";
import {
  Stripepayment_method_options_customer_balance_eu_bank_account,
  Stripepayment_method_options_mandate_options_pix,
} from "./paymentMethodOptions.js";
import {
  Stripepayment_method,
  Stripepayment_method_config_biz_payment_method_configuration_details,
} from "./paymentMethods.js";
import {
  Stripebank_account,
  Stripebank_connections_resource_account_number_details,
  Stripebank_connections_resource_account_status_details,
  Stripebank_connections_resource_accountholder,
  Stripebank_connections_resource_balance,
  Stripebank_connections_resource_balance_refresh,
  Stripebank_connections_resource_link_account_session_filters,
  Stripebank_connections_resource_link_account_session_limits,
  Stripebank_connections_resource_link_account_session_manual_entry,
  Stripebank_connections_resource_ownership_refresh,
  Stripebank_connections_resource_transaction_refresh,
  Stripecard,
  Stripecard_mandate_payment_method_details,
  Stripetoken,
} from "./paymentSources.js";
import {
  Stripepayment_flows_payment_intent_presentment_details,
  Stripepayment_flows_private_payment_methods_financial_connections_common_linked_account_options_filters,
  Stripepayment_link,
  Stripepayment_pages_checkout_session_adaptive_pricing,
  Stripepayment_pages_checkout_session_after_expiration,
  Stripepayment_pages_checkout_session_automatic_tax,
  Stripepayment_pages_checkout_session_branding_settings,
  Stripepayment_pages_checkout_session_collected_information,
  Stripepayment_pages_checkout_session_consent,
  Stripepayment_pages_checkout_session_consent_collection,
  Stripepayment_pages_checkout_session_currency_conversion,
  Stripepayment_pages_checkout_session_custom_fields,
  Stripepayment_pages_checkout_session_custom_text,
  Stripepayment_pages_checkout_session_customer_details,
  Stripepayment_pages_checkout_session_discount,
  Stripepayment_pages_checkout_session_invoice_creation,
  Stripepayment_pages_checkout_session_managed_payments,
  Stripepayment_pages_checkout_session_name_collection,
  Stripepayment_pages_checkout_session_optional_item,
  Stripepayment_pages_checkout_session_permissions,
  Stripepayment_pages_checkout_session_phone_number_collection,
  Stripepayment_pages_checkout_session_saved_payment_method_options,
  Stripepayment_pages_checkout_session_shipping_address_collection,
  Stripepayment_pages_checkout_session_shipping_cost,
  Stripepayment_pages_checkout_session_shipping_option,
  Stripepayment_pages_checkout_session_tax_id_collection,
  Stripepayment_pages_checkout_session_total_details,
  Stripepayment_pages_private_card_payment_method_options_resource_restrictions,
} from "./payments.js";
import { Stripesetup_attempt, Stripesetup_intent } from "./setupIntents.js";
import { Stripesource } from "./sources.js";
import {
  Stripesubscription,
  Stripesubscription_schedule,
  Stripesubscriptions_resource_billing_mode_flexible,
} from "./subscriptions.js";
import { Stripebalance_transaction } from "./transfers.js";
import { Stripetreasury_shared_resource_billing_details } from "./treasury.js";

export type Stripefile_link = {
  readonly created: number;
  readonly expired: boolean;
  readonly expires_at?: number | null;
  readonly file: string | Stripefile;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "file_link";
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripefile = {
  readonly created: number;
  readonly expires_at?: number | null;
  readonly filename?: string | null;
  readonly id: string;
  readonly links?:
    | ({
        readonly data: ReadonlyArray<Stripefile_link>;
        readonly has_more: boolean;
        readonly object: "list";
        readonly url: string;
      } & { readonly [x: string]: Schema.Json })
    | null;
  readonly object: "file";
  readonly purpose:
    | "account_requirement"
    | "additional_verification"
    | "business_icon"
    | "business_logo"
    | "customer_signature"
    | "dispute_evidence"
    | "document_provider_identity_document"
    | "finance_report_run"
    | "financial_account_statement"
    | "identity_document"
    | "identity_document_downloadable"
    | "issuing_regulatory_reporting"
    | "pci_document"
    | "platform_terms_of_service"
    | "selfie"
    | "sigma_scheduled_query"
    | "tax_document_user_upload"
    | "terminal_android_apk"
    | "terminal_reader_splashscreen"
    | "terminal_wifi_certificate"
    | "terminal_wifi_private_key";
  readonly size: number;
  readonly title?: string | null;
  readonly type?: string | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripestackable_discount_with_discount_settings = {
  readonly coupon?: string | Stripecoupon | null;
  readonly discount?: string | Stripediscount | null;
  readonly promotion_code?: string | Stripepromotion_code | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepromotion_code = {
  readonly active: boolean;
  readonly code: string;
  readonly created: number;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly expires_at?: number | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly max_redemptions?: number | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "promotion_code";
  readonly promotion: Stripepromotion_codes_resource_promotion;
  readonly restrictions: Stripepromotion_codes_resource_restrictions;
  readonly times_redeemed: number;
} & { readonly [x: string]: Schema.Json };
export type Stripediscount = {
  readonly checkout_session?: string | null;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly end?: number | null;
  readonly id: string;
  readonly invoice?: string | null;
  readonly invoice_item?: string | null;
  readonly object: "discount";
  readonly promotion_code?: string | Stripepromotion_code | null;
  readonly source: Stripediscount_source;
  readonly start: number;
  readonly subscription?: string | null;
  readonly subscription_item?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesepa_debit_generated_from = {
  readonly charge?: string | Stripecharge | null;
  readonly setup_attempt?: string | Stripesetup_attempt | null;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate = {
  readonly customer_acceptance: Stripecustomer_acceptance;
  readonly id: string;
  readonly livemode: boolean;
  readonly multi_use?: Stripemandate_multi_use;
  readonly object: "mandate";
  readonly on_behalf_of?: string;
  readonly payment_method: string | Stripepayment_method;
  readonly payment_method_details: Stripemandate_payment_method_details;
  readonly single_use?: Stripemandate_single_use;
  readonly status: "active" | "inactive" | "pending";
  readonly type: "multi_use" | "single_use";
} & { readonly [x: string]: Schema.Json };
export type Stripeapi_errors = {
  readonly advice_code?: string;
  readonly charge?: string;
  readonly code?: string;
  readonly decline_code?: string;
  readonly doc_url?: string;
  readonly message?: string;
  readonly network_advice_code?: string;
  readonly network_decline_code?: string;
  readonly param?: string;
  readonly payment_intent?: Stripepayment_intent;
  readonly payment_method?: Stripepayment_method;
  readonly payment_method_type?: string;
  readonly request_log_url?: string;
  readonly setup_intent?: Stripesetup_intent;
  readonly source?: Stripebank_account | Stripecard | Stripesource;
  readonly type:
    | "api_error"
    | "card_error"
    | "idempotency_error"
    | "invalid_request_error";
} & { readonly [x: string]: Schema.Json };
export type Stripereview = {
  readonly billing_zip?: string | null;
  readonly charge?: string | Stripecharge | null;
  readonly closed_reason?:
    | "acknowledged"
    | "approved"
    | "canceled"
    | "disputed"
    | "payment_never_settled"
    | "redacted"
    | "refunded"
    | "refunded_as_fraud"
    | null;
  readonly created: number;
  readonly id: string;
  readonly ip_address?: string | null;
  readonly ip_address_location?: Striperadar_review_resource_location | null;
  readonly livemode: boolean;
  readonly object: "review";
  readonly open: boolean;
  readonly opened_reason: "manual" | "rule";
  readonly payment_intent?: string | Stripepayment_intent;
  readonly reason: string;
  readonly session?: Striperadar_review_resource_session | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetopup = {
  readonly amount: number;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly created: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly expected_availability_date?: number | null;
  readonly failure_code?: string | null;
  readonly failure_message?: string | null;
  readonly id: string;
  readonly initiated_by?: "stripe" | "user" | null;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "topup";
  readonly payment_method?: string | Stripepayment_method | null;
  readonly payment_method_options?: Stripetopup_resource_payment_method_options | null;
  readonly source?: Stripesource | null;
  readonly statement_descriptor?: string | null;
  readonly status: "canceled" | "failed" | "pending" | "reversed" | "succeeded";
  readonly transfer_group?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeapplication_fee = {
  readonly account: string | Stripeaccount;
  readonly amount: number;
  readonly amount_refunded: number;
  readonly application: string | Stripeapplication;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly charge: string | Stripecharge;
  readonly created: number;
  readonly currency: string;
  readonly fee_source?: Stripeplatform_earning_fee_source | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "application_fee";
  readonly originating_transaction?: string | Stripecharge | null;
  readonly refunded: boolean;
  readonly refunds: {
    readonly data: ReadonlyArray<Stripefee_refund>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripefee_refund = {
  readonly amount: number;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly created: number;
  readonly currency: string;
  readonly fee: string | Stripeapplication_fee;
  readonly id: string;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "fee_refund";
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_discount = {
  readonly checkout_session?: string | null;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly deleted: true;
  readonly id: string;
  readonly invoice?: string | null;
  readonly invoice_item?: string | null;
  readonly object: "discount";
  readonly promotion_code?: string | Stripepromotion_code | null;
  readonly source: Stripediscount_source;
  readonly start: number;
  readonly subscription?: string | null;
  readonly subscription_item?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeline_item = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly discount_amounts?: ReadonlyArray<Stripediscounts_resource_discount_amount> | null;
  readonly discountable: boolean;
  readonly discounts: ReadonlyArray<string | Stripediscount>;
  readonly id: string;
  readonly invoice?: string | null;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "line_item";
  readonly parent?: Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_parent | null;
  readonly period: Stripeinvoice_line_item_period;
  readonly pretax_credit_amounts?: ReadonlyArray<Stripeinvoices_resource_pretax_credit_amount> | null;
  readonly pricing?: Stripebilling_bill_resource_invoicing_pricing_pricing | null;
  readonly quantity?: number | null;
  readonly quantity_decimal?: string | null;
  readonly subscription?: string | Stripesubscription | null;
  readonly subtotal: number;
  readonly taxes?: ReadonlyArray<Stripebilling_bill_resource_invoicing_taxes_tax> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecredit_note = {
  readonly amount: number;
  readonly amount_shipping: number;
  readonly created: number;
  readonly currency: string;
  readonly customer: string | Stripecustomer | Stripedeleted_customer;
  readonly customer_account?: string | null;
  readonly customer_balance_transaction?:
    | string
    | Stripecustomer_balance_transaction
    | null;
  readonly discount_amount: number;
  readonly discount_amounts: ReadonlyArray<Stripediscounts_resource_discount_amount>;
  readonly effective_at?: number | null;
  readonly id: string;
  readonly invoice: string | Stripeinvoice;
  readonly lines: {
    readonly data: ReadonlyArray<Stripecredit_note_line_item>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly memo?: string | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly number: string;
  readonly object: "credit_note";
  readonly out_of_band_amount?: number | null;
  readonly pdf: string;
  readonly post_payment_amount: number;
  readonly pre_payment_amount: number;
  readonly pretax_credit_amounts: ReadonlyArray<Stripecredit_notes_pretax_credit_amount>;
  readonly reason?:
    | "duplicate"
    | "fraudulent"
    | "order_change"
    | "product_unsatisfactory"
    | null;
  readonly refunds: ReadonlyArray<Stripecredit_note_refund>;
  readonly shipping_cost?: Stripeinvoices_resource_shipping_cost | null;
  readonly status: "issued" | "void";
  readonly subtotal: number;
  readonly subtotal_excluding_tax?: number | null;
  readonly total: number;
  readonly total_excluding_tax?: number | null;
  readonly total_taxes?: ReadonlyArray<Stripebilling_bill_resource_invoicing_taxes_tax> | null;
  readonly type: "mixed" | "post_payment" | "pre_payment";
  readonly voided_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_from_quote = {
  readonly is_revision: boolean;
  readonly quote: string | Stripequote;
} & { readonly [x: string]: Schema.Json };
export type Stripequote = {
  readonly amount_subtotal: number;
  readonly amount_total: number;
  readonly application?:
    | string
    | Stripeapplication
    | Stripedeleted_application
    | null;
  readonly application_fee_amount?: number | null;
  readonly application_fee_percent?: number | null;
  readonly automatic_tax: Stripequotes_resource_automatic_tax;
  readonly collection_method: "charge_automatically" | "send_invoice";
  readonly computed: Stripequotes_resource_computed;
  readonly created: number;
  readonly currency?: string | null;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly default_tax_rates?: ReadonlyArray<string | Stripetax_rate>;
  readonly description?: string | null;
  readonly discounts: ReadonlyArray<string | Stripediscount>;
  readonly expires_at: number;
  readonly footer?: string | null;
  readonly from_quote?: Stripequotes_resource_from_quote | null;
  readonly header?: string | null;
  readonly id: string;
  readonly invoice?: string | Stripeinvoice | Stripedeleted_invoice | null;
  readonly invoice_settings: Stripeinvoice_setting_quote_setting;
  readonly line_items?: {
    readonly data: ReadonlyArray<Stripeitem>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly number?: string | null;
  readonly object: "quote";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly status: "accepted" | "canceled" | "draft" | "open";
  readonly status_transitions: Stripequotes_resource_status_transitions;
  readonly subscription?: string | Stripesubscription | null;
  readonly subscription_data: Stripequotes_resource_subscription_data_subscription_data;
  readonly subscription_schedule?: string | Stripesubscription_schedule | null;
  readonly test_clock?: string | Stripetest_helpers_test_clock | null;
  readonly total_details: Stripequotes_resource_total_details;
  readonly transfer_data?: Stripequotes_resource_transfer_data | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaddress = {
  readonly city?: string | null;
  readonly country?: string | null;
  readonly line1?: string | null;
  readonly line2?: string | null;
  readonly postal_code?: string | null;
  readonly state?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_japan_address = {
  readonly city?: string | null;
  readonly country?: string | null;
  readonly line1?: string | null;
  readonly line2?: string | null;
  readonly postal_code?: string | null;
  readonly state?: string | null;
  readonly town?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_directorship_declaration = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly user_agent?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_ubo_declaration = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly user_agent?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_registration_date = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_representative_declaration = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly user_agent?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_company_verification_document = {
  readonly back?: string | Stripefile | null;
  readonly details?: string | null;
  readonly details_code?: string | null;
  readonly front?: string | Stripefile | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecoupon_applies_to = {
  readonly products: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripecoupon_currency_option = { readonly amount_off: number } & {
  readonly [x: string]: Schema.Json;
};
export type Stripepromotion_code_currency_option = {
  readonly minimum_amount: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeapplication = {
  readonly id: string;
  readonly name?: string | null;
  readonly object: "application";
} & { readonly [x: string]: Schema.Json };
export type Stripeoffline_acceptance = { readonly [x: string]: Schema.Json };
export type Stripeonline_acceptance = {
  readonly ip_address?: string | null;
  readonly user_agent?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_multi_use = {
  readonly amount?: number;
  readonly currency?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_acss_debit = {
  readonly default_for?: ReadonlyArray<"invoice" | "subscription">;
  readonly interval_description?: string | null;
  readonly payment_schedule: "combined" | "interval" | "sporadic";
  readonly transaction_type: "business" | "personal";
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_amazon_pay = { readonly [x: string]: Schema.Json };
export type Stripemandate_au_becs_debit = { readonly url: string } & {
  readonly [x: string]: Schema.Json;
};
export type Stripemandate_bacs_debit = {
  readonly display_name?: string | null;
  readonly network_status: "accepted" | "pending" | "refused" | "revoked";
  readonly reference: string;
  readonly revocation_reason?:
    | "account_closed"
    | "bank_account_restricted"
    | "bank_ownership_changed"
    | "could_not_process"
    | "debit_not_authorized"
    | null;
  readonly service_user_number?: string | null;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_blik = {
  readonly expires_at?: number | null;
  readonly type: "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_cashapp = { readonly [x: string]: Schema.Json };
export type Stripemandate_kakao_pay = { readonly [x: string]: Schema.Json };
export type Stripemandate_klarna = { readonly [x: string]: Schema.Json };
export type Stripemandate_kr_card = { readonly [x: string]: Schema.Json };
export type Stripemandate_link = { readonly [x: string]: Schema.Json };
export type Stripemandate_naver_pay = { readonly [x: string]: Schema.Json };
export type Stripemandate_nz_bank_account = {
  readonly [x: string]: Schema.Json;
};
export type Stripemandate_paypal = {
  readonly billing_agreement_id?: string | null;
  readonly payer_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_payto = {
  readonly amount?: number | null;
  readonly amount_type: "fixed" | "maximum";
  readonly end_date?: string | null;
  readonly payment_schedule:
    | "adhoc"
    | "annual"
    | "daily"
    | "fortnightly"
    | "monthly"
    | "quarterly"
    | "semi_annual"
    | "weekly";
  readonly payments_per_period?: number | null;
  readonly purpose?:
    | "dependant_support"
    | "government"
    | "loan"
    | "mortgage"
    | "other"
    | "pension"
    | "personal"
    | "retail"
    | "salary"
    | "tax"
    | "utility"
    | null;
  readonly start_date?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_pix = {
  readonly amount_includes_iof?: "always" | "never";
  readonly amount_type?: "fixed" | "maximum";
  readonly end_date?: string;
  readonly payment_schedule?:
    | "halfyearly"
    | "monthly"
    | "quarterly"
    | "weekly"
    | "yearly";
  readonly reference?: string;
  readonly start_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_revolut_pay = { readonly [x: string]: Schema.Json };
export type Stripemandate_sepa_debit = {
  readonly reference: string;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_twint = { readonly [x: string]: Schema.Json };
export type Stripemandate_upi = {
  readonly amount?: number | null;
  readonly amount_type?: "fixed" | "maximum" | null;
  readonly description?: string | null;
  readonly end_date?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_us_bank_account = {
  readonly collection_method?: "paper";
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_single_use = {
  readonly amount: number;
  readonly currency: string;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_details = {
  readonly authentication_flow?: "challenge" | "frictionless" | null;
  readonly electronic_commerce_indicator?:
    | "01"
    | "02"
    | "05"
    | "06"
    | "07"
    | null;
  readonly result?:
    | "attempt_acknowledged"
    | "authenticated"
    | "data_share_only"
    | "exempted"
    | "failed"
    | "not_supported"
    | "processing_error"
    | null;
  readonly result_reason?:
    | "abandoned"
    | "bypassed"
    | "canceled"
    | "card_not_enrolled"
    | "network_not_supported"
    | "protocol_error"
    | "rejected"
    | null;
  readonly transaction_id?: string | null;
  readonly version?: "1.0.2" | "2.1.0" | "2.2.0" | "2.3.0" | "2.3.1" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripefee = {
  readonly amount: number;
  readonly application?: string | null;
  readonly currency: string;
  readonly description?: string | null;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeconnect_collection_transfer = {
  readonly amount: number;
  readonly currency: string;
  readonly destination: string | Stripeaccount;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "connect_collection_transfer";
} & { readonly [x: string]: Schema.Json };
export type Stripedestination_details_unimplemented = {
  readonly [x: string]: Schema.Json;
};
export type Stripeemail_sent = {
  readonly email_sent_at: number;
  readonly email_sent_to: string;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_bank_account = {
  readonly currency?: string | null;
  readonly deleted: true;
  readonly id: string;
  readonly object: "bank_account";
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_card = {
  readonly currency?: string | null;
  readonly deleted: true;
  readonly id: string;
  readonly object: "card";
} & { readonly [x: string]: Schema.Json };
export type Stripereserve_transaction = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly id: string;
  readonly object: "reserve_transaction";
} & { readonly [x: string]: Schema.Json };
export type Stripetopup_resource_us_bank_account = {
  readonly network: "ach";
} & { readonly [x: string]: Schema.Json };
export type Stripeplatform_earning_fee_source = {
  readonly charge?: string;
  readonly payout?: string;
  readonly type: "charge" | "payout";
} & { readonly [x: string]: Schema.Json };
export type Striperadar_rule = {
  readonly action: string;
  readonly id: string;
  readonly predicate: string;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_details_charge = {
  readonly authentication_flow?: "challenge" | "frictionless" | null;
  readonly electronic_commerce_indicator?:
    | "01"
    | "02"
    | "05"
    | "06"
    | "07"
    | null;
  readonly exemption_indicator?: "low_risk" | "none" | null;
  readonly exemption_indicator_applied?: boolean;
  readonly result?:
    | "attempt_acknowledged"
    | "authenticated"
    | "data_share_only"
    | "exempted"
    | "failed"
    | "not_supported"
    | "processing_error"
    | null;
  readonly result_reason?:
    | "abandoned"
    | "bypassed"
    | "canceled"
    | "card_not_enrolled"
    | "network_not_supported"
    | "protocol_error"
    | "rejected"
    | null;
  readonly transaction_id?: string | null;
  readonly version?: "1.0.2" | "2.1.0" | "2.2.0" | "2.3.0" | "2.3.1" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeklarna_address = { readonly country?: string | null } & {
  readonly [x: string]: Schema.Json;
};
export type Stripeinternal_card = {
  readonly brand?: string | null;
  readonly country?: string | null;
  readonly exp_month?: number | null;
  readonly exp_year?: number | null;
  readonly last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepaypal_seller_protection = {
  readonly dispute_categories?: ReadonlyArray<
    "fraudulent" | "product_not_received"
  > | null;
  readonly status: "eligible" | "not_eligible" | "partially_eligible";
} & { readonly [x: string]: Schema.Json };
export type Striperadar_radar_options = { readonly session?: string } & {
  readonly [x: string]: Schema.Json;
};
export type Striperadar_review_resource_location = {
  readonly city?: string | null;
  readonly country?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly region?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperadar_review_resource_session = {
  readonly browser?: string | null;
  readonly device?: string | null;
  readonly platform?: string | null;
  readonly version?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesmor_resource_managed_payments = {
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripenetworks = {
  readonly available: ReadonlyArray<string>;
  readonly preferred?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_usage = { readonly supported: boolean } & {
  readonly [x: string]: Schema.Json;
};
export type Stripecustom_logo = {
  readonly content_type?: string | null;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeus_bank_account_networks = {
  readonly preferred?: string | null;
  readonly supported: ReadonlyArray<"ach" | "us_domestic_wire">;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_application = {
  readonly deleted: true;
  readonly id: string;
  readonly name?: string | null;
  readonly object: "application";
} & { readonly [x: string]: Schema.Json };
export type Stripeconnect_account_reference = {
  readonly account?: string | Stripeaccount;
  readonly type: "account" | "self";
} & { readonly [x: string]: Schema.Json };
export type Stripecustom_unit_amount = {
  readonly maximum?: number | null;
  readonly minimum?: number | null;
  readonly preset?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepackage_dimensions = {
  readonly height: number;
  readonly length: number;
  readonly weight: number;
  readonly width: number;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_product = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "product";
} & { readonly [x: string]: Schema.Json };
export type Striperecurring = {
  readonly interval: "day" | "month" | "week" | "year";
  readonly interval_count: number;
  readonly meter?: string | null;
  readonly usage_type: "licensed" | "metered";
} & { readonly [x: string]: Schema.Json };
export type Stripetransform_quantity = {
  readonly divide_by: number;
  readonly round: "down" | "up";
} & { readonly [x: string]: Schema.Json };
export type Stripefeedback_options_status_transitions = {
  readonly deactivated_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_tax_id = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "tax_id";
} & { readonly [x: string]: Schema.Json };
export type Stripediscounts_resource_discount_amount = {
  readonly amount: number;
  readonly discount: string | Stripediscount | Stripedeleted_discount;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_invoice = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "invoice";
} & { readonly [x: string]: Schema.Json };
export type Stripeshipping_rate_delivery_estimate_bound = {
  readonly unit: "business_day" | "day" | "hour" | "month" | "week";
  readonly value: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeshipping_rate_currency_option = {
  readonly amount: number;
  readonly tax_behavior: "exclusive" | "inclusive" | "unspecified";
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_price = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "price";
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_additional_tos_acceptance = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly user_agent?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_dob = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_relationship = {
  readonly authorizer?: boolean | null;
  readonly director?: boolean | null;
  readonly executive?: boolean | null;
  readonly legal_guardian?: boolean | null;
  readonly owner?: boolean | null;
  readonly percent_ownership?: number | null;
  readonly representative?: boolean | null;
  readonly title?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_ethnicity_details = {
  readonly ethnicity?: ReadonlyArray<
    | "cuban"
    | "hispanic_or_latino"
    | "mexican"
    | "not_hispanic_or_latino"
    | "other_hispanic_or_latino"
    | "prefer_not_to_answer"
    | "puerto_rican"
  > | null;
  readonly ethnicity_other?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_race_details = {
  readonly race?: ReadonlyArray<
    | "african_american"
    | "american_indian_or_alaska_native"
    | "asian"
    | "asian_indian"
    | "black_or_african_american"
    | "chinese"
    | "ethiopian"
    | "filipino"
    | "guamanian_or_chamorro"
    | "haitian"
    | "jamaican"
    | "japanese"
    | "korean"
    | "native_hawaiian"
    | "native_hawaiian_or_other_pacific_islander"
    | "nigerian"
    | "other_asian"
    | "other_black_or_african_american"
    | "other_pacific_islander"
    | "prefer_not_to_answer"
    | "samoan"
    | "somali"
    | "vietnamese"
    | "white"
  > | null;
  readonly race_other?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_person_verification_document = {
  readonly back?: string | Stripefile | null;
  readonly details?: string | null;
  readonly details_code?: string | null;
  readonly front?: string | Stripefile | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeerror = { readonly error: Stripeapi_errors } & {
  readonly [x: string]: Schema.Json;
};
export type Stripedeleted_account = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "account";
} & { readonly [x: string]: Schema.Json };
export type Stripeexternal_account = Stripebank_account | Stripecard;
export type Stripelogin_link = {
  readonly created: number;
  readonly object: "login_link";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_person = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "person";
} & { readonly [x: string]: Schema.Json };
export type Stripeapple_pay_domain = {
  readonly created: number;
  readonly domain_name: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "apple_pay_domain";
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_apple_pay_domain = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "apple_pay_domain";
} & { readonly [x: string]: Schema.Json };
export type Stripeapp_service_resource_install_content_security_policy = {
  readonly connect_src: ReadonlyArray<string>;
  readonly image_src: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripethresholds_resource_usage_alert_filter = {
  readonly customer?: string | Stripecustomer | null;
  readonly type: "customer";
} & { readonly [x: string]: Schema.Json };
export type Stripeline_items_adjustable_quantity = {
  readonly enabled: boolean;
  readonly maximum?: number | null;
  readonly minimum?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeline_items_discount_amount = {
  readonly amount: number;
  readonly discount: Stripediscount;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_acss_debit_mandate_options = {
  readonly custom_mandate_url?: string;
  readonly default_for?: ReadonlyArray<"invoice" | "subscription">;
  readonly interval_description?: string | null;
  readonly payment_schedule?: "combined" | "interval" | "sporadic" | null;
  readonly transaction_type?: "business" | "personal" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_affirm_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_afterpay_clearpay_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_alipay_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_alma_payment_method_options = {
  readonly capture_method?: "manual";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_amazon_pay_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_au_becs_debit_payment_method_options = {
  readonly setup_future_usage?: "none";
  readonly target_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_payment_method_options_mandate_options_bacs_debit = {
  readonly reference_prefix?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_bancontact_payment_method_options = {
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_billie_payment_method_options = {
  readonly capture_method?: "manual";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_boleto_payment_method_options = {
  readonly expires_after_days: number;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_card_installments_options = {
  readonly enabled?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_cashapp_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_eps_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_fpx_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_giropay_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_grab_pay_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_ideal_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_kakao_pay_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_klarna_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_konbini_payment_method_options = {
  readonly expires_after_days?: number | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_kr_card_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_link_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_mobilepay_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_multibanco_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_naver_pay_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_oxxo_payment_method_options = {
  readonly expires_after_days: number;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_p24_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_payco_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_paynow_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_paypal_payment_method_options = {
  readonly capture_method?: "manual";
  readonly preferred_locale?: string | null;
  readonly reference?: string | null;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_options_payto = {
  readonly amount?: number | null;
  readonly amount_type?: "fixed" | "maximum" | null;
  readonly end_date?: string | null;
  readonly payment_schedule?:
    | "adhoc"
    | "annual"
    | "daily"
    | "fortnightly"
    | "monthly"
    | "quarterly"
    | "semi_annual"
    | "weekly"
    | null;
  readonly payments_per_period?: number | null;
  readonly purpose?:
    | "dependant_support"
    | "government"
    | "loan"
    | "mortgage"
    | "other"
    | "pension"
    | "personal"
    | "retail"
    | "salary"
    | "tax"
    | "utility"
    | null;
  readonly start_date?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_revolut_pay_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_samsung_pay_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_satispay_payment_method_options = {
  readonly capture_method?: "manual";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_scalapay_payment_method_options = {
  readonly capture_method?: "manual";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_payment_method_options_mandate_options_sepa_debit = {
  readonly reference_prefix?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_sequra_payment_method_options = {
  readonly capture_method?: "manual";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_sofort_payment_method_options = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_sunbit_payment_method_options = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_swish_payment_method_options = {
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_twint_payment_method_options = {
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_options_upi = {
  readonly amount?: number | null;
  readonly amount_type?: "fixed" | "maximum" | null;
  readonly description?: string | null;
  readonly end_date?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_financial_connections_payment_method_options_filters =
  { readonly account_subcategories?: ReadonlyArray<"checking" | "savings"> } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripecheckout_wechat_pay_payment_method_options = {
  readonly app_id?: string | null;
  readonly client?: "android" | "ios" | "web" | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_link_wallet_options = {
  readonly display?: "auto" | "never";
} & { readonly [x: string]: Schema.Json };
export type Stripeclimate_removals_beneficiary = {
  readonly public_name: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeclimate_removals_location = {
  readonly city?: string | null;
  readonly country: string;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly region?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeclimate_removals_products_price = {
  readonly amount_fees: number;
  readonly amount_subtotal: number;
  readonly amount_total: number;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_coupon = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "coupon";
} & { readonly [x: string]: Schema.Json };
export type Stripecredit_notes_pretax_credit_amount = {
  readonly amount: number;
  readonly credit_balance_transaction?:
    | string
    | Stripebilling_credit_balance_transaction;
  readonly discount?: string | Stripediscount | Stripedeleted_discount;
  readonly type: "credit_balance_transaction" | "discount";
} & { readonly [x: string]: Schema.Json };
export type Stripecredit_notes_payment_record_refund = {
  readonly payment_record: string;
  readonly refund_group: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeentitlements_feature = {
  readonly active: boolean;
  readonly id: string;
  readonly livemode: boolean;
  readonly lookup_key: string;
  readonly metadata: { readonly [x: string]: string };
  readonly name: string;
  readonly object: "entitlements.feature";
} & { readonly [x: string]: Schema.Json };
export type Stripefinancial_connections_account_owner = {
  readonly email?: string | null;
  readonly id: string;
  readonly name: string;
  readonly object: "financial_connections.account_owner";
  readonly ownership: string;
  readonly phone?: string | null;
  readonly raw_address?: string | null;
  readonly refreshed_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeforwarded_request_context = {
  readonly destination_duration: number;
  readonly destination_ip_address: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeforwarded_request_header = {
  readonly name: string;
  readonly value: string;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_session_last_error = {
  readonly code?:
    | "abandoned"
    | "consent_declined"
    | "country_not_supported"
    | "device_not_supported"
    | "document_expired"
    | "document_type_not_supported"
    | "document_unverified_other"
    | "email_unverified_other"
    | "email_verification_declined"
    | "id_number_insufficient_document_data"
    | "id_number_mismatch"
    | "id_number_unverified_other"
    | "phone_unverified_other"
    | "phone_verification_declined"
    | "selfie_document_missing_photo"
    | "selfie_face_mismatch"
    | "selfie_manipulated"
    | "selfie_unverified_other"
    | "under_supported_age"
    | null;
  readonly reason?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_data_document_report_date_of_birth = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_document_report_error = {
  readonly code?:
    | "document_expired"
    | "document_type_not_supported"
    | "document_unverified_other"
    | null;
  readonly reason?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_data_document_report_expiration_date = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_data_document_report_issued_date = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_email_report_error = {
  readonly code?:
    | "email_unverified_other"
    | "email_verification_declined"
    | null;
  readonly reason?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_data_id_number_report_date = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_id_number_report_error = {
  readonly code?:
    | "id_number_insufficient_document_data"
    | "id_number_mismatch"
    | "id_number_unverified_other"
    | null;
  readonly reason?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_report_document_options = {
  readonly allowed_types?: ReadonlyArray<
    "driving_license" | "id_card" | "passport"
  >;
  readonly require_id_number?: boolean;
  readonly require_live_capture?: boolean;
  readonly require_matching_selfie?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_report_id_number_options = {
  readonly [x: string]: Schema.Json;
};
export type Stripegelato_phone_report_error = {
  readonly code?:
    | "phone_unverified_other"
    | "phone_verification_declined"
    | null;
  readonly reason?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_selfie_report_error = {
  readonly code?:
    | "selfie_document_missing_photo"
    | "selfie_face_mismatch"
    | "selfie_manipulated"
    | "selfie_unverified_other"
    | null;
  readonly reason?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_session_document_options = {
  readonly allowed_types?: ReadonlyArray<
    "driving_license" | "id_card" | "passport"
  >;
  readonly require_id_number?: boolean;
  readonly require_live_capture?: boolean;
  readonly require_matching_selfie?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_session_email_options = {
  readonly require_verification?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_session_id_number_options = {
  readonly [x: string]: Schema.Json;
};
export type Stripegelato_session_matching_options = {
  readonly dob?: "none" | "similar";
  readonly name?: "none" | "similar";
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_session_phone_options = {
  readonly require_verification?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_provided_details = {
  readonly email?: string;
  readonly phone?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeverification_session_redaction = {
  readonly status: "processing" | "redacted" | "validated";
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_related_person = {
  readonly account: string;
  readonly person: string;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_data_verified_outputs_date = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoicing_rule = {
  readonly type: "defer_until_credited_items_resolved";
} & { readonly [x: string]: Schema.Json };
export type Stripecredited_items_invoice_line_items = {
  readonly invoice: string;
  readonly invoice_line_items: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_invoiceitem = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "invoiceitem";
} & { readonly [x: string]: Schema.Json };
export type Stripetransform_usage = {
  readonly divide_by: number;
  readonly round: "down" | "up";
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_plan = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "plan";
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_product_feature = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "product_feature";
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_status_transitions = {
  readonly accepted_at?: number | null;
  readonly canceled_at?: number | null;
  readonly finalized_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_transfer_data = {
  readonly amount?: number | null;
  readonly amount_percent?: number | null;
  readonly destination: string | Stripeaccount;
} & { readonly [x: string]: Schema.Json };
export type Striperadar_value_list_item = {
  readonly created: number;
  readonly created_by: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "radar.value_list_item";
  readonly value: string;
  readonly value_list: string;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_radar_value_list_item = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "radar.value_list_item";
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_radar_value_list = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "radar.value_list";
} & { readonly [x: string]: Schema.Json };
export type Stripefinancial_reporting_finance_report_run_run_parameters = {
  readonly columns?: ReadonlyArray<string>;
  readonly connected_account?: string;
  readonly currency?: string;
  readonly interval_end?: number;
  readonly interval_start?: number;
  readonly payout?: string;
  readonly reporting_category?: string;
  readonly timezone?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_subscription_item = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "subscription_item";
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_device_type_specific_config =
  { readonly splashscreen?: string | Stripefile } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripeterminal_configuration_configuration_resource_cellular_config =
  { readonly enabled: boolean } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_offline_config =
  { readonly enabled?: boolean | null } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_reader_security_config =
  { readonly admin_menu_passcode: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripeterminal_configuration_configuration_resource_reboot_window =
  { readonly end_hour: number; readonly start_hour: number } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripeterminal_configuration_configuration_resource_currency_specific_config =
  {
    readonly fixed_amounts?: ReadonlyArray<number> | null;
    readonly percentages?: ReadonlyArray<number> | null;
    readonly smart_tip_threshold?: number;
  } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_enterprise_peap_wifi =
  {
    readonly ca_certificate_file?: string;
    readonly password: string;
    readonly ssid: string;
    readonly username: string;
  } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_enterprise_tls_wifi =
  {
    readonly ca_certificate_file?: string;
    readonly client_certificate_file: string;
    readonly private_key_file: string;
    readonly private_key_file_password?: string;
    readonly ssid: string;
  } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_personal_psk_wifi =
  { readonly password: string; readonly ssid: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripedeleted_terminal_configuration = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "terminal.configuration";
} & { readonly [x: string]: Schema.Json };
export type Stripeaddress_api_resource_terminal = {
  readonly city?: string | null;
  readonly country?: string | null;
  readonly line1?: string | null;
  readonly line2?: string | null;
  readonly postal_code?: string | null;
  readonly state?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_terminal_location = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "terminal.location";
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_custom_text = {
  readonly description?: string | null;
  readonly skip_button?: string | null;
  readonly submit_button?: string | null;
  readonly title?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_email = {
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_numeric = {
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_phone = {
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_choice = {
  readonly id?: string | null;
  readonly style?: "primary" | "secondary" | null;
  readonly text: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_signature = {
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_text = {
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_toggle = {
  readonly default_value?: "disabled" | "enabled" | null;
  readonly description?: string | null;
  readonly title?: string | null;
  readonly value?: "disabled" | "enabled" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_tipping_config = {
  readonly amount_eligible?: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_confirm_config = {
  readonly return_url?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_file_metadata = {
  readonly created_at: number;
  readonly filename: string;
  readonly size: number;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_process_setup_config = {
  readonly enable_customer_cancellation?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_refund_payment_config = {
  readonly enable_customer_cancellation?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_line_item = {
  readonly amount: number;
  readonly description: string;
  readonly quantity: number;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_terminal_reader = {
  readonly deleted: true;
  readonly device_type:
    | "bbpos_chipper2x"
    | "bbpos_wisepad3"
    | "bbpos_wisepos_e"
    | "mobile_phone_reader"
    | "simulated_stripe_s700"
    | "simulated_stripe_s710"
    | "simulated_stripe_t600"
    | "simulated_verifone_m425"
    | "simulated_verifone_p630"
    | "simulated_verifone_ux700"
    | "simulated_verifone_v660p"
    | "simulated_wisepos_e"
    | "stripe_m2"
    | "stripe_s700"
    | "stripe_s710"
    | "stripe_t600"
    | "verifone_P400"
    | "verifone_m425"
    | "verifone_p630"
    | "verifone_ux700"
    | "verifone_v660p";
  readonly id: string;
  readonly object: "terminal.reader";
  readonly serial_number: string;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_test_helpers_test_clock = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "test_helpers.test_clock";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_acquirer_details = {
  readonly acquirer_bin?: string;
  readonly acquirer_country?: string;
  readonly acquirer_merchant_id?: string;
  readonly mcc?: string;
  readonly merchant_name?: string;
  readonly requestor_id?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_browser_details = {
  readonly accept_header: string;
  readonly color_depth?: number;
  readonly ip_address: string;
  readonly java_enabled?: boolean;
  readonly javascript_enabled: boolean;
  readonly language: string;
  readonly screen_height?: number;
  readonly screen_width?: number;
  readonly timezone_offset?: number;
  readonly user_agent: string;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_three_ri_details = {
  readonly previous_authentication: string;
  readonly type:
    | "delayed_shipment"
    | "other_payment"
    | "recurring"
    | "split_shipment";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_challenge_details = {
  readonly type: "mandated" | "preferred";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_data_share_details = {
  readonly type: "ds_specific" | "emv_standard";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_frictionless_details = {
  readonly type: "low_risk" | "none";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_expiry = {
  readonly date?: string;
  readonly type: "date" | "never";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_cartes_bancaires = {
  readonly avalgo: string;
  readonly cb_exemption?: string | null;
  readonly cb_score?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_shipping_address = {
  readonly city?: string;
  readonly country?: string;
  readonly line1?: string;
  readonly line2?: string;
  readonly postal_code?: string;
  readonly state?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeinbound_transfers_payment_method_details_us_bank_account = {
  readonly account_holder_type?: "company" | "individual" | null;
  readonly account_type?: "checking" | "savings" | null;
  readonly bank_name?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | Stripemandate;
  readonly network: "ach";
  readonly routing_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeoutbound_payments_payment_method_details_financial_account = {
  readonly id: string;
  readonly network: "stripe";
} & { readonly [x: string]: Schema.Json };
export type Stripeoutbound_payments_payment_method_details_us_bank_account = {
  readonly account_holder_type?: "company" | "individual" | null;
  readonly account_type?: "checking" | "savings" | null;
  readonly bank_name?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | Stripemandate;
  readonly network: "ach" | "us_domestic_wire";
  readonly routing_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeoutbound_transfers_payment_method_details_financial_account =
  { readonly id: string; readonly network: "stripe" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripeoutbound_transfers_payment_method_details_us_bank_account = {
  readonly account_holder_type?: "company" | "individual" | null;
  readonly account_type?: "checking" | "savings" | null;
  readonly bank_name?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | Stripemandate;
  readonly network: "ach" | "us_domestic_wire";
  readonly routing_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripereceived_payment_method_details_financial_account = {
  readonly id: string;
  readonly network: "stripe";
} & { readonly [x: string]: Schema.Json };
export type Stripewebhook_endpoint = {
  readonly api_version?: string | null;
  readonly application?: string | null;
  readonly created: number;
  readonly description?: string | null;
  readonly enabled_events: ReadonlyArray<string>;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "webhook_endpoint";
  readonly secret?: string;
  readonly status: string;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_webhook_endpoint = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "webhook_endpoint";
} & { readonly [x: string]: Schema.Json };
export type Stripev2_commerce_product_catalog_import = {
  readonly created: string;
  readonly feed_type: "inventory" | "pricing" | "product" | "promotion";
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly mode: "replace" | "upsert";
  readonly object: "v2.commerce.product_catalog_import";
  readonly status:
    | "awaiting_upload"
    | "failed"
    | "processing"
    | "succeeded"
    | "succeeded_with_errors";
  readonly status_details?: {
    readonly awaiting_upload?: {
      readonly upload_url: {
        readonly expires_at: string;
        readonly url: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly failed?: {
      readonly code: "file_not_found" | "internal_error" | "invalid_file";
      readonly failure_message: string;
      readonly type: "cannot_proceed" | "transient_failure";
    } & { readonly [x: string]: Schema.Json };
    readonly processing?: {
      readonly error_count: string;
      readonly success_count: string;
    } & { readonly [x: string]: Schema.Json };
    readonly succeeded?: { readonly success_count: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly succeeded_with_errors?: {
      readonly error_count: string;
      readonly error_file: {
        readonly content_type: string;
        readonly download_url: {
          readonly expires_at: string;
          readonly url: string;
        } & { readonly [x: string]: Schema.Json };
        readonly size: string;
      } & { readonly [x: string]: Schema.Json };
      readonly samples: ReadonlyArray<
        {
          readonly error_message: string;
          readonly field: string;
          readonly id: string;
          readonly row: string;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly success_count: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_deleted_object = {
  readonly id: string;
  readonly object?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_money_management_financial_address = {
  readonly bank_account?: {
    readonly aba?: {
      readonly account_holder_name?: string;
      readonly account_number: string;
      readonly address?: {
        readonly city: string;
        readonly country: string;
        readonly line1: string;
        readonly line2: string;
        readonly postal_code: string;
        readonly state: string;
        readonly town: string;
      } & { readonly [x: string]: Schema.Json };
      readonly bank_name?: string;
      readonly routing_number: string;
    } & { readonly [x: string]: Schema.Json };
    readonly country?: string;
    readonly currency: string;
    readonly iban?: {
      readonly account_holder_name: string;
      readonly bank_name: string;
      readonly iban: string;
    } & { readonly [x: string]: Schema.Json };
    readonly sort_code?: {
      readonly account_holder_name: string;
      readonly account_number: string;
      readonly sort_code: string;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "aba" | "iban" | "sort_code";
  } & { readonly [x: string]: Schema.Json };
  readonly created: string;
  readonly financial_account: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "v2.money_management.financial_address";
  readonly settlement_currency: string;
  readonly status: "active" | "archived" | "failed" | "pending";
  readonly type: "bank_account";
} & { readonly [x: string]: Schema.Json };
export type Stripev2_money_management_inbound_transfer = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly created: string;
  readonly description: string;
  readonly from: {
    readonly debited: { readonly currency: string; readonly value: number } & {
      readonly [x: string]: Schema.Json;
    };
    readonly payment_method: {
      readonly type: string;
      readonly us_bank_account?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "v2.money_management.inbound_transfer";
  readonly to: {
    readonly credited: { readonly currency: string; readonly value: number } & {
      readonly [x: string]: Schema.Json;
    };
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
  readonly transfer_history: ReadonlyArray<
    {
      readonly bank_debit_failed?: {
        readonly failure_reason:
          | "bank_account_closed"
          | "bank_account_not_found"
          | "bank_debit_could_not_be_processed"
          | "bank_debit_not_authorized"
          | "insufficient_funds";
      } & { readonly [x: string]: Schema.Json };
      readonly bank_debit_processing?: { readonly [x: string]: Schema.Json };
      readonly bank_debit_queued?: { readonly [x: string]: Schema.Json };
      readonly bank_debit_returned?: {
        readonly return_reason:
          | "bank_account_closed"
          | "bank_account_not_found"
          | "bank_debit_could_not_be_processed"
          | "bank_debit_not_authorized"
          | "insufficient_funds";
      } & { readonly [x: string]: Schema.Json };
      readonly bank_debit_succeeded?: { readonly [x: string]: Schema.Json };
      readonly created: string;
      readonly effective_at: string;
      readonly id: string;
      readonly type:
        | "bank_debit_failed"
        | "bank_debit_processing"
        | "bank_debit_queued"
        | "bank_debit_returned"
        | "bank_debit_succeeded";
    } & { readonly [x: string]: Schema.Json }
  >;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_money_management_outbound_payment = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly cancelable: boolean;
  readonly created: string;
  readonly description?: string;
  readonly expected_arrival_date?: string;
  readonly from: {
    readonly debited: { readonly currency: string; readonly value: number } & {
      readonly [x: string]: Schema.Json;
    };
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string };
  readonly object: "v2.money_management.outbound_payment";
  readonly payout_intent?: string;
  readonly recipient_notification: {
    readonly setting: "configured" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly recipient_verification?: string;
  readonly statement_descriptor: string;
  readonly status: "canceled" | "failed" | "posted" | "processing" | "returned";
  readonly status_details?: {
    readonly failed?: {
      readonly reason:
        | "fx_rate_drift_exceeded_after_review"
        | "payout_method_amount_limit_exceeded"
        | "payout_method_declined"
        | "payout_method_does_not_exist"
        | "payout_method_expired"
        | "payout_method_unsupported"
        | "payout_method_usage_frequency_limit_exceeded"
        | "review_rejected"
        | "unknown_failure";
    } & { readonly [x: string]: Schema.Json };
    readonly processing?: { readonly reason: "under_review" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly returned?: {
      readonly reason:
        | "payout_method_canceled_by_customer"
        | "payout_method_closed"
        | "payout_method_currency_unsupported"
        | "payout_method_does_not_exist"
        | "payout_method_holder_address_incorrect"
        | "payout_method_holder_details_incorrect"
        | "payout_method_holder_name_incorrect"
        | "payout_method_invalid_account_number"
        | "payout_method_restricted"
        | "recalled"
        | "unknown_failure";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly status_transitions?: {
    readonly canceled_at?: string;
    readonly failed_at?: string;
    readonly posted_at?: string;
    readonly returned_at?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly to: {
    readonly credited: { readonly currency: string; readonly value: number } & {
      readonly [x: string]: Schema.Json;
    };
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
  readonly tracking_details?: {
    readonly bank_account?: { readonly trace_id?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly card?: { readonly retrieval_reference?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly status: "pending" | "supported" | "unsupported";
    readonly type: "bank_account" | "card";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_money_management_payout_method = {
  readonly archived: boolean;
  readonly bank_account?: {
    readonly bank_account_type: "checking" | "futsu" | "savings" | "toza";
    readonly bank_name: string;
    readonly branch_number?: string;
    readonly country: string;
    readonly financial_connections_account?: string;
    readonly last4: string;
    readonly routing_number?: string;
    readonly supported_currencies: ReadonlyArray<string>;
    readonly swift_code?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly card?: {
    readonly exp_month: string;
    readonly exp_year: string;
    readonly fingerprint: string;
    readonly last4: string;
    readonly supported_currencies: ReadonlyArray<string>;
  } & { readonly [x: string]: Schema.Json };
  readonly created: string;
  readonly id: string;
  readonly latest_outbound_setup_intent?: string;
  readonly livemode: boolean;
  readonly object: "v2.money_management.payout_method";
  readonly restricted: boolean;
  readonly type: "bank_account" | "card";
  readonly usage_status: {
    readonly payments:
      | "disabled"
      | "eligible"
      | "ineligible"
      | "invalid"
      | "requires_action";
    readonly transfers:
      | "disabled"
      | "eligible"
      | "ineligible"
      | "invalid"
      | "requires_action";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_money_management_payout_intent = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly confirmation_method: "automatic" | "manual";
  readonly created: string;
  readonly description?: string;
  readonly estimated_fees?: ReadonlyArray<
    {
      readonly amount: { readonly currency: string; readonly value: number } & {
        readonly [x: string]: Schema.Json;
      };
      readonly network_fee_details?: {
        readonly network:
          | "ach"
          | "fedwire"
          | "fps"
          | "local"
          | "rtp"
          | "sepa"
          | "swift";
        readonly network_options: {
          readonly ach?: { readonly submission?: "next_day" | "same_day" } & {
            readonly [x: string]: Schema.Json;
          };
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly tax_amount?: {
        readonly currency: string;
        readonly value_decimal: string;
      } & { readonly [x: string]: Schema.Json };
      readonly type:
        | "cross_border_fee"
        | "foreign_exchange_fee"
        | "instant_card_payout_fee"
        | "network_fee"
        | "next_day_payout_fee"
        | "real_time_payout_fee"
        | "standard_payout_fee"
        | "wire_payout_fee";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly from: {
    readonly currency: string;
    readonly debited?: { readonly currency: string; readonly value: number } & {
      readonly [x: string]: Schema.Json;
    };
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
  readonly fx_quote?: {
    readonly lock_duration: "five_minutes" | "none";
    readonly lock_expires_at?: string;
    readonly lock_status: "active" | "expired" | "none";
    readonly rates: {
      readonly [x: string]: { readonly exchange_rate: string } & {
        readonly [x: string]: Schema.Json;
      };
    };
    readonly to_currency: string;
  } & { readonly [x: string]: Schema.Json };
  readonly id: string;
  readonly latest_payout?: {
    readonly outbound_payment?: string;
    readonly outbound_transfer?: string;
    readonly type: "outbound_payment" | "outbound_transfer";
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string };
  readonly next_action?: {
    readonly confirm?: {
      readonly fields_to_review?: ReadonlyArray<
        "estimated_fees" | "fx_quote" | "recipient_verification"
      >;
      readonly reason: "automatically_required" | "manually_requested";
    } & { readonly [x: string]: Schema.Json };
    readonly handle_failure?: {
      readonly failure_reason:
        | "account_not_configured_as_recipient"
        | "fx_rate_drift_exceeded_after_review"
        | "insufficient_funds"
        | "payout_method_account_type_incorrect"
        | "payout_method_amount_limit_exceeded"
        | "payout_method_canceled_by_customer"
        | "payout_method_closed"
        | "payout_method_currency_unsupported"
        | "payout_method_declined"
        | "payout_method_does_not_exist"
        | "payout_method_expired"
        | "payout_method_holder_address_incorrect"
        | "payout_method_holder_details_incorrect"
        | "payout_method_holder_name_incorrect"
        | "payout_method_invalid"
        | "payout_method_invalid_account_number"
        | "payout_method_restricted"
        | "payout_method_unsupported"
        | "payout_method_usage_frequency_limit_exceeded"
        | "recalled"
        | "recipient_capability_not_active"
        | "review_rejected"
        | "unknown_failure";
    } & { readonly [x: string]: Schema.Json };
    readonly type: "confirm" | "handle_failure";
  } & { readonly [x: string]: Schema.Json };
  readonly object: "v2.money_management.payout_intent";
  readonly recipient_notification?: {
    readonly setting: "configured" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly recipient_verification?: {
    readonly match_result: "close_match" | "match" | "no_match" | "unavailable";
    readonly match_result_details: {
      readonly matched_business_type?: "business" | "personal";
      readonly matched_name?: string;
      readonly message: string;
      readonly provided_business_type?: "business" | "personal";
      readonly provided_name: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly schedule_options?: { readonly execute_on?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly statement_descriptor?: string;
  readonly status:
    | "canceled"
    | "pending"
    | "posted"
    | "processing"
    | "requires_action";
  readonly status_transitions?: {
    readonly canceled_at?: string;
    readonly posted_at?: string;
    readonly processing_at?: string;
    readonly requires_action_at?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly to: {
    readonly credited?: {
      readonly currency: string;
      readonly value: number;
    } & { readonly [x: string]: Schema.Json };
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
} & { readonly [x: string]: Schema.Json };
export type Stripev2_money_management_recipient_verification = {
  readonly consumed_by?: {
    readonly outbound_payment?: string;
    readonly type: "outbound_payment";
  } & { readonly [x: string]: Schema.Json };
  readonly created: string;
  readonly expires_at?: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly match_result: "close_match" | "match" | "no_match" | "unavailable";
  readonly match_result_details: {
    readonly matched_business_type?: "business" | "personal";
    readonly matched_name?: string;
    readonly message: string;
    readonly provided_business_type?: "business" | "personal";
    readonly provided_name: string;
  } & { readonly [x: string]: Schema.Json };
  readonly object: "v2.money_management.recipient_verification";
  readonly payout_method: string;
  readonly recipient?: string;
  readonly status:
    | "acknowledged"
    | "awaiting_acknowledgement"
    | "consumed"
    | "expired"
    | "verified";
  readonly status_transitions?: {
    readonly acknowledged_at?: string;
    readonly consumed_at?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly verification_type: "confirmation_of_payee" | "verification_of_payee";
} & { readonly [x: string]: Schema.Json };
export type Stripeshipping = {
  readonly address?: Stripeaddress;
  readonly carrier?: string | null;
  readonly name?: string;
  readonly phone?: string | null;
  readonly tracking_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer_aba_record = {
  readonly account_holder_address: Stripeaddress;
  readonly account_holder_name: string;
  readonly account_number: string;
  readonly account_type: string;
  readonly bank_address: Stripeaddress;
  readonly bank_name: string;
  readonly routing_number: string;
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer_iban_record = {
  readonly account_holder_address: Stripeaddress;
  readonly account_holder_name: string;
  readonly bank_address: Stripeaddress;
  readonly bic: string;
  readonly country: string;
  readonly iban: string;
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer_sort_code_record = {
  readonly account_holder_address: Stripeaddress;
  readonly account_holder_name: string;
  readonly account_number: string;
  readonly bank_address: Stripeaddress;
  readonly sort_code: string;
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer_spei_record = {
  readonly account_holder_address: Stripeaddress;
  readonly account_holder_name: string;
  readonly bank_address: Stripeaddress;
  readonly bank_code: string;
  readonly bank_name: string;
  readonly clabe: string;
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer_swift_record = {
  readonly account_holder_address: Stripeaddress;
  readonly account_holder_name: string;
  readonly account_number: string;
  readonly account_type: string;
  readonly bank_address: Stripeaddress;
  readonly bank_name: string;
  readonly swift_code: string;
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer_zengin_record = {
  readonly account_holder_address: Stripeaddress;
  readonly account_holder_name?: string | null;
  readonly account_number?: string | null;
  readonly account_type?: string | null;
  readonly bank_address: Stripeaddress;
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly branch_code?: string | null;
  readonly branch_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_company_verification = {
  readonly document: Stripelegal_entity_company_verification_document;
} & { readonly [x: string]: Schema.Json };
export type Stripecash_balance = {
  readonly available?: { readonly [x: string]: number } | null;
  readonly customer: string;
  readonly customer_account?: string | null;
  readonly livemode: boolean;
  readonly object: "cash_balance";
  readonly settings: Stripecustomer_balance_customer_balance_settings;
} & { readonly [x: string]: Schema.Json };
export type Stripecoupon = {
  readonly amount_off?: number | null;
  readonly applies_to?: Stripecoupon_applies_to;
  readonly created: number;
  readonly currency?: string | null;
  readonly currency_options?: {
    readonly [x: string]: Stripecoupon_currency_option;
  };
  readonly duration: "forever" | "once" | "repeating";
  readonly duration_in_months?: number | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly max_redemptions?: number | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly name?: string | null;
  readonly object: "coupon";
  readonly percent_off?: number | null;
  readonly redeem_by?: number | null;
  readonly times_redeemed: number;
  readonly valid: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepromotion_codes_resource_restrictions = {
  readonly currency_options?: {
    readonly [x: string]: Stripepromotion_code_currency_option;
  };
  readonly first_time_transaction: boolean;
  readonly minimum_amount?: number | null;
  readonly minimum_amount_currency?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_external_account =
  | Stripedeleted_bank_account
  | Stripedeleted_card;
export type Stripedeleted_payment_source =
  | Stripedeleted_bank_account
  | Stripedeleted_card;
export type Stripetopup_resource_payment_method_options = {
  readonly us_bank_account?: Stripetopup_resource_us_bank_account | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeamazon_pay_underlying_payment_method_funding_details = {
  readonly card?: Stripepayment_method_details_passthrough_card;
  readonly type?: "card" | null;
} & { readonly [x: string]: Schema.Json };
export type Striperevolut_pay_underlying_payment_method_funding_details = {
  readonly card?: Stripepayment_method_details_passthrough_card;
  readonly type?: "card" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeklarna_payer_details = {
  readonly address?: Stripeklarna_address | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_customer_balance_bank_transfer_payment_method_options =
  {
    readonly eu_bank_transfer?: Stripepayment_method_options_customer_balance_eu_bank_account;
    readonly requested_address_types?: ReadonlyArray<
      "aba" | "iban" | "sepa" | "sort_code" | "spei" | "swift" | "zengin"
    >;
    readonly type?:
      | "eu_bank_transfer"
      | "gb_bank_transfer"
      | "jp_bank_transfer"
      | "mx_bank_transfer"
      | "us_bank_transfer"
      | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripecheckout_pix_payment_method_options = {
  readonly amount_includes_iof?: "always" | "never";
  readonly expires_after_seconds?: number | null;
  readonly mandate_options?: Stripepayment_method_options_mandate_options_pix;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripelinked_account_options_common = {
  readonly filters?: Stripepayment_flows_private_payment_methods_financial_connections_common_linked_account_options_filters;
  readonly permissions?: ReadonlyArray<
    "balances" | "ownership" | "payment_method" | "transactions"
  >;
  readonly prefetch?: ReadonlyArray<
    "balances" | "ownership" | "transactions"
  > | null;
  readonly return_url?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeautomatic_tax = {
  readonly disabled_reason?:
    | "finalization_requires_location_inputs"
    | "finalization_system_error"
    | null;
  readonly enabled: boolean;
  readonly liability?: Stripeconnect_account_reference | null;
  readonly provider?: string | null;
  readonly status?: "complete" | "failed" | "requires_location_inputs" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeschedules_phase_automatic_tax = {
  readonly disabled_reason?: "requires_location_inputs" | null;
  readonly enabled: boolean;
  readonly liability?: Stripeconnect_account_reference | null;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_automatic_tax = {
  readonly enabled: boolean;
  readonly liability?: Stripeconnect_account_reference | null;
  readonly provider?: string | null;
  readonly status?: "complete" | "failed" | "requires_location_inputs" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_subscription_data_billing_mode = {
  readonly flexible?: Stripesubscriptions_resource_billing_mode_flexible;
  readonly type: "classic" | "flexible";
} & { readonly [x: string]: Schema.Json };
export type Stripecurrency_option = {
  readonly custom_unit_amount?: Stripecustom_unit_amount | null;
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified" | null;
  readonly tiers?: ReadonlyArray<Stripeprice_tier>;
  readonly unit_amount?: number | null;
  readonly unit_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeshipping_rate_delivery_estimate = {
  readonly maximum?: Stripeshipping_rate_delivery_estimate_bound | null;
  readonly minimum?: Stripeshipping_rate_delivery_estimate_bound | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeshipping_rate_fixed_amount = {
  readonly amount: number;
  readonly currency: string;
  readonly currency_options?: {
    readonly [x: string]: Stripeshipping_rate_currency_option;
  };
} & { readonly [x: string]: Schema.Json };
export type Stripeexternal_account_requirements = {
  readonly currently_due?: ReadonlyArray<string> | null;
  readonly errors?: ReadonlyArray<Stripeaccount_requirements_error> | null;
  readonly past_due?: ReadonlyArray<string> | null;
  readonly pending_verification?: ReadonlyArray<string> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_future_requirements = {
  readonly alternatives?: ReadonlyArray<Stripeaccount_requirements_alternative> | null;
  readonly currently_due: ReadonlyArray<string>;
  readonly errors: ReadonlyArray<Stripeaccount_requirements_error>;
  readonly eventually_due: ReadonlyArray<string>;
  readonly past_due: ReadonlyArray<string>;
  readonly pending_verification: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_requirements = {
  readonly alternatives?: ReadonlyArray<Stripeaccount_requirements_alternative> | null;
  readonly currently_due: ReadonlyArray<string>;
  readonly errors: ReadonlyArray<Stripeaccount_requirements_error>;
  readonly eventually_due: ReadonlyArray<string>;
  readonly past_due: ReadonlyArray<string>;
  readonly pending_verification: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_additional_tos_acceptances = {
  readonly account?: Stripeperson_additional_tos_acceptance | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeperson_us_cfpb_data = {
  readonly ethnicity_details?: Stripeperson_ethnicity_details | null;
  readonly race_details?: Stripeperson_race_details | null;
  readonly self_identified_gender?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_person_verification = {
  readonly additional_document?: Stripelegal_entity_person_verification_document | null;
  readonly details?: string | null;
  readonly details_code?: string | null;
  readonly document?: Stripelegal_entity_person_verification_document;
  readonly status: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeapps_install = {
  readonly account: string;
  readonly app: string;
  readonly approval_required: boolean;
  readonly auth_code?: string | null;
  readonly channel:
    | "private_live"
    | "private_test"
    | "public"
    | "review"
    | "testing";
  readonly content_security_policy_granted: Stripeapp_service_resource_install_content_security_policy;
  readonly content_security_policy_pending: Stripeapp_service_resource_install_content_security_policy;
  readonly created: number;
  readonly created_by?: string | null;
  readonly endpoints_granted: ReadonlyArray<string>;
  readonly endpoints_pending: ReadonlyArray<string>;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "apps.install";
  readonly permissions_granted: ReadonlyArray<string>;
  readonly permissions_pending: ReadonlyArray<string>;
  readonly status:
    | "install_failed"
    | "installed"
    | "installing"
    | "uninstall_failed"
    | "uninstalling";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_acss_debit_payment_method_options = {
  readonly currency?: "cad" | "usd";
  readonly mandate_options?: Stripecheckout_acss_debit_mandate_options;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_bacs_debit_payment_method_options = {
  readonly mandate_options?: Stripecheckout_payment_method_options_mandate_options_bacs_debit;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_card_payment_method_options = {
  readonly capture_method?: "manual";
  readonly installments?: Stripecheckout_card_installments_options;
  readonly request_extended_authorization?: "if_available" | "never";
  readonly request_incremental_authorization?: "if_available" | "never";
  readonly request_multicapture?: "if_available" | "never";
  readonly request_overcapture?: "if_available" | "never";
  readonly request_three_d_secure: "any" | "automatic" | "challenge";
  readonly restrictions?: Stripepayment_pages_private_card_payment_method_options_resource_restrictions;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly statement_descriptor_suffix_kana?: string;
  readonly statement_descriptor_suffix_kanji?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_payto_payment_method_options = {
  readonly mandate_options?: Stripemandate_options_payto;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_sepa_debit_payment_method_options = {
  readonly mandate_options?: Stripecheckout_payment_method_options_mandate_options_sepa_debit;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_upi_payment_method_options = {
  readonly mandate_options?: Stripemandate_options_upi;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_financial_connections_payment_method_options = {
  readonly filters?: Stripecheckout_financial_connections_payment_method_options_filters;
  readonly permissions?: ReadonlyArray<
    "balances" | "ownership" | "payment_method" | "transactions"
  >;
  readonly prefetch?: ReadonlyArray<
    "balances" | "ownership" | "transactions"
  > | null;
  readonly return_url?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_session_wallet_options = {
  readonly link?: Stripecheckout_link_wallet_options;
} & { readonly [x: string]: Schema.Json };
export type Stripeclimate_supplier = {
  readonly id: string;
  readonly info_url: string;
  readonly livemode: boolean;
  readonly locations: ReadonlyArray<Stripeclimate_removals_location>;
  readonly name: string;
  readonly object: "climate.supplier";
  readonly removal_pathway:
    | "biomass_carbon_removal_and_storage"
    | "direct_air_capture"
    | "enhanced_weathering"
    | "marine_carbon_removal";
} & { readonly [x: string]: Schema.Json };
export type Stripecredit_note_refund = {
  readonly amount_refunded: number;
  readonly payment_record_refund?: Stripecredit_notes_payment_record_refund | null;
  readonly refund: string | Striperefund;
  readonly type?: "payment_record_refund" | "refund" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripefinancial_connections_account_ownership = {
  readonly created: number;
  readonly id: string;
  readonly object: "financial_connections.account_ownership";
  readonly owners: {
    readonly data: ReadonlyArray<Stripefinancial_connections_account_owner>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripeforwarded_request_details = {
  readonly body: string;
  readonly headers: ReadonlyArray<Stripeforwarded_request_header>;
  readonly http_method: "POST";
} & { readonly [x: string]: Schema.Json };
export type Stripeforwarded_response_details = {
  readonly body: string;
  readonly headers: ReadonlyArray<Stripeforwarded_request_header>;
  readonly status: number;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_document_report = {
  readonly address?: Stripeaddress | null;
  readonly dob?: Stripegelato_data_document_report_date_of_birth | null;
  readonly error?: Stripegelato_document_report_error | null;
  readonly expiration_date?: Stripegelato_data_document_report_expiration_date | null;
  readonly files?: ReadonlyArray<string> | null;
  readonly first_name?: string | null;
  readonly issued_date?: Stripegelato_data_document_report_issued_date | null;
  readonly issuing_country?: string | null;
  readonly last_name?: string | null;
  readonly number?: string | null;
  readonly sex?: "[redacted]" | "female" | "male" | "unknown" | null;
  readonly status: "unverified" | "verified";
  readonly type?: "driving_license" | "id_card" | "passport" | null;
  readonly unparsed_place_of_birth?: string | null;
  readonly unparsed_sex?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_email_report = {
  readonly email?: string | null;
  readonly error?: Stripegelato_email_report_error | null;
  readonly status: "unverified" | "verified";
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_id_number_report = {
  readonly dob?: Stripegelato_data_id_number_report_date | null;
  readonly error?: Stripegelato_id_number_report_error | null;
  readonly first_name?: string | null;
  readonly id_number?: string | null;
  readonly id_number_type?: "br_cpf" | "sg_nric" | "us_ssn" | null;
  readonly last_name?: string | null;
  readonly status: "unverified" | "verified";
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_verification_report_options = {
  readonly document?: Stripegelato_report_document_options;
  readonly id_number?: Stripegelato_report_id_number_options;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_phone_report = {
  readonly error?: Stripegelato_phone_report_error | null;
  readonly phone?: string | null;
  readonly status: "unverified" | "verified";
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_selfie_report = {
  readonly document?: string | null;
  readonly error?: Stripegelato_selfie_report_error | null;
  readonly selfie?: string | null;
  readonly status: "unverified" | "verified";
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_verification_session_options = {
  readonly document?: Stripegelato_session_document_options;
  readonly email?: Stripegelato_session_email_options;
  readonly id_number?: Stripegelato_session_id_number_options;
  readonly matching?: Stripegelato_session_matching_options;
  readonly phone?: Stripegelato_session_phone_options;
} & { readonly [x: string]: Schema.Json };
export type Stripegelato_verified_outputs = {
  readonly address?: Stripeaddress | null;
  readonly dob?: Stripegelato_data_verified_outputs_date | null;
  readonly email?: string | null;
  readonly first_name?: string | null;
  readonly id_number?: string | null;
  readonly id_number_type?: "br_cpf" | "sg_nric" | "us_ssn" | null;
  readonly last_name?: string | null;
  readonly phone?: string | null;
  readonly sex?: "[redacted]" | "female" | "male" | "unknown" | null;
  readonly unparsed_place_of_birth?: string | null;
  readonly unparsed_sex?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperadar_value_list = {
  readonly alias: string;
  readonly created: number;
  readonly created_by: string;
  readonly id: string;
  readonly item_type:
    | "account"
    | "card_bin"
    | "card_fingerprint"
    | "case_sensitive_string"
    | "country"
    | "crypto_fingerprint"
    | "customer_id"
    | "email"
    | "ip_address"
    | "sepa_debit_fingerprint"
    | "string"
    | "us_bank_account_fingerprint";
  readonly list_items: {
    readonly data: ReadonlyArray<Striperadar_value_list_item>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly name: string;
  readonly object: "radar.value_list";
} & { readonly [x: string]: Schema.Json };
export type Stripereporting_report_run = {
  readonly created: number;
  readonly error?: string | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "reporting.report_run";
  readonly parameters: Stripefinancial_reporting_finance_report_run_run_parameters;
  readonly report_type: string;
  readonly result?: Stripefile | null;
  readonly status: string;
  readonly succeeded_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_tipping = {
  readonly aed?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly aud?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly cad?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly chf?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly czk?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly dkk?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly eur?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly gbp?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly gip?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly hkd?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly huf?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly jpy?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly mxn?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly myr?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly nok?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly nzd?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly pln?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly ron?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly sek?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly sgd?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
  readonly usd?: Stripeterminal_configuration_configuration_resource_currency_specific_config;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration_configuration_resource_wifi_config = {
  readonly enterprise_eap_peap?: Stripeterminal_configuration_configuration_resource_enterprise_peap_wifi;
  readonly enterprise_eap_tls?: Stripeterminal_configuration_configuration_resource_enterprise_tls_wifi;
  readonly personal_psk?: Stripeterminal_configuration_configuration_resource_personal_psk_wifi;
  readonly type: "enterprise_eap_peap" | "enterprise_eap_tls" | "personal_psk";
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_location = {
  readonly address: Stripeaddress_api_resource_terminal;
  readonly address_kana?: Stripelegal_entity_japan_address;
  readonly address_kanji?: Stripelegal_entity_japan_address;
  readonly configuration_overrides?: string;
  readonly display_name: string;
  readonly display_name_kana?: string;
  readonly display_name_kanji?: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "terminal.location";
  readonly phone?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_selection = {
  readonly choices: ReadonlyArray<Stripeterminal_reader_reader_resource_choice>;
  readonly id?: string | null;
  readonly text?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_collect_config = {
  readonly enable_customer_cancellation?: boolean;
  readonly skip_tipping?: boolean;
  readonly tipping?: Stripeterminal_reader_reader_resource_tipping_config;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_process_config = {
  readonly enable_customer_cancellation?: boolean;
  readonly return_url?: string;
  readonly skip_tipping?: boolean;
  readonly tipping?: Stripeterminal_reader_reader_resource_tipping_config;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_confirm_payment_intent_action =
  {
    readonly confirm_config?: Stripeterminal_reader_reader_resource_confirm_config;
    readonly payment_intent: string | Stripepayment_intent;
  } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_print_content = {
  readonly image?: Stripeterminal_reader_reader_resource_file_metadata;
  readonly type: "image";
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_process_setup_intent_action =
  {
    readonly generated_card?: string;
    readonly process_config?: Stripeterminal_reader_reader_resource_process_setup_config;
    readonly setup_intent: string | Stripesetup_intent;
  } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_refund_payment_action = {
  readonly amount?: number;
  readonly charge?: string | Stripecharge;
  readonly metadata?: { readonly [x: string]: string };
  readonly payment_intent?: string | Stripepayment_intent;
  readonly reason?: "duplicate" | "fraudulent" | "requested_by_customer";
  readonly refund?: string | Striperefund;
  readonly refund_application_fee?: boolean;
  readonly refund_payment_config?: Stripeterminal_reader_reader_resource_refund_payment_config;
  readonly reverse_transfer?: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_cart = {
  readonly currency: string;
  readonly line_items: ReadonlyArray<Stripeterminal_reader_reader_resource_line_item>;
  readonly tax?: number | null;
  readonly total: number;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_channel = {
  readonly browser?: Stripethree_d_secure_standalone_resource_browser_details;
  readonly three_r_i?: Stripethree_d_secure_standalone_resource_three_ri_details;
  readonly type: "browser" | "three_r_i";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_flow_preference = {
  readonly challenge?: Stripethree_d_secure_standalone_resource_challenge_details;
  readonly data_share?: Stripethree_d_secure_standalone_resource_data_share_details;
  readonly frictionless?: Stripethree_d_secure_standalone_resource_frictionless_details;
  readonly type: "challenge" | "data_share" | "frictionless";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_installment = {
  readonly amount?: number;
  readonly expiry: Stripethree_d_secure_standalone_resource_expiry;
  readonly interval: "day";
  readonly interval_count: number;
  readonly number: number;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_recurring = {
  readonly amount?: number;
  readonly expiry: Stripethree_d_secure_standalone_resource_expiry;
  readonly interval: "day";
  readonly interval_count: number;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_network_details = {
  readonly cartes_bancaires?: Stripethree_d_secure_standalone_resource_cartes_bancaires;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_money_management_outbound_setup_intent = {
  readonly created: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "v2.money_management.outbound_setup_intent";
  readonly payout_method?: Stripev2_money_management_payout_method;
  readonly status:
    | "canceled"
    | "requires_action"
    | "requires_payout_method"
    | "succeeded";
  readonly usage_intent: "payment" | "transfer";
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer_financial_address = {
  readonly aba?: Stripefunding_instructions_bank_transfer_aba_record;
  readonly iban?: Stripefunding_instructions_bank_transfer_iban_record;
  readonly sort_code?: Stripefunding_instructions_bank_transfer_sort_code_record;
  readonly spei?: Stripefunding_instructions_bank_transfer_spei_record;
  readonly supported_networks?: ReadonlyArray<
    | "ach"
    | "bacs"
    | "chaps"
    | "domestic_wire_us"
    | "fps"
    | "sepa"
    | "spei"
    | "swift"
    | "zengin"
  >;
  readonly swift?: Stripefunding_instructions_bank_transfer_swift_record;
  readonly type: "aba" | "iban" | "sort_code" | "spei" | "swift" | "zengin";
  readonly zengin?: Stripefunding_instructions_bank_transfer_zengin_record;
} & { readonly [x: string]: Schema.Json };
export type Stripeinbound_transfers = {
  readonly billing_details: Stripetreasury_shared_resource_billing_details;
  readonly type: "us_bank_account";
  readonly us_bank_account?: Stripeinbound_transfers_payment_method_details_us_bank_account;
} & { readonly [x: string]: Schema.Json };
export type Stripeoutbound_payments_payment_method_details = {
  readonly billing_details: Stripetreasury_shared_resource_billing_details;
  readonly financial_account?: Stripeoutbound_payments_payment_method_details_financial_account;
  readonly type: "financial_account" | "us_bank_account";
  readonly us_bank_account?: Stripeoutbound_payments_payment_method_details_us_bank_account;
} & { readonly [x: string]: Schema.Json };
export type Stripeoutbound_transfers_payment_method_details = {
  readonly billing_details: Stripetreasury_shared_resource_billing_details;
  readonly financial_account?: Stripeoutbound_transfers_payment_method_details_financial_account;
  readonly type: "financial_account" | "us_bank_account";
  readonly us_bank_account?: Stripeoutbound_transfers_payment_method_details_us_bank_account;
} & { readonly [x: string]: Schema.Json };
export type Stripelegal_entity_company = {
  readonly address?: Stripeaddress;
  readonly address_kana?: Stripelegal_entity_japan_address | null;
  readonly address_kanji?: Stripelegal_entity_japan_address | null;
  readonly administrative_address?: Stripeaddress;
  readonly directors_provided?: boolean;
  readonly directorship_declaration?: Stripelegal_entity_directorship_declaration | null;
  readonly executives_provided?: boolean;
  readonly export_license_id?: string;
  readonly export_purpose_code?: string;
  readonly name?: string | null;
  readonly name_kana?: string | null;
  readonly name_kanji?: string | null;
  readonly owners_provided?: boolean;
  readonly ownership_declaration?: Stripelegal_entity_ubo_declaration | null;
  readonly ownership_exemption_reason?:
    | "qualified_entity_exceeds_ownership_threshold"
    | "qualifies_as_financial_institution";
  readonly phone?: string | null;
  readonly physical_address?: Stripeaddress;
  readonly principal_place_of_business?: Stripeaddress;
  readonly registration_date?: Stripelegal_entity_registration_date;
  readonly representative_declaration?: Stripelegal_entity_representative_declaration | null;
  readonly structure?:
    | "free_zone_establishment"
    | "free_zone_llc"
    | "government_instrumentality"
    | "governmental_unit"
    | "incorporated_non_profit"
    | "incorporated_partnership"
    | "limited_liability_partnership"
    | "llc"
    | "multi_member_llc"
    | "private_company"
    | "private_corporation"
    | "private_partnership"
    | "public_company"
    | "public_corporation"
    | "public_partnership"
    | "registered_charity"
    | "single_member_llc"
    | "sole_establishment"
    | "sole_proprietorship"
    | "tax_exempt_government_instrumentality"
    | "unincorporated_association"
    | "unincorporated_non_profit"
    | "unincorporated_partnership";
  readonly tax_id_provided?: boolean;
  readonly tax_id_registrar?: string;
  readonly vat_id_provided?: boolean;
  readonly verification?: Stripelegal_entity_company_verification | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepromotion_codes_resource_promotion = {
  readonly coupon?: string | Stripecoupon | null;
  readonly type: "coupon";
} & { readonly [x: string]: Schema.Json };
export type Stripediscount_source = {
  readonly coupon?: string | Stripecoupon | null;
  readonly type: "coupon";
} & { readonly [x: string]: Schema.Json };
export type Stripediscounts_resource_stackable_discount_with_discount_end = {
  readonly coupon?: string | Stripecoupon | null;
  readonly discount?: string | Stripediscount | null;
  readonly promotion_code?: string | Stripepromotion_code | null;
} & { readonly [x: string]: Schema.Json };
export type Stripestackable_discount_with_discount_settings_and_discount_end = {
  readonly coupon?: string | Stripecoupon | null;
  readonly discount?: string | Stripediscount | null;
  readonly promotion_code?: string | Stripepromotion_code | null;
} & { readonly [x: string]: Schema.Json };
export type Stripemandate_payment_method_details = {
  readonly acss_debit?: Stripemandate_acss_debit;
  readonly amazon_pay?: Stripemandate_amazon_pay;
  readonly au_becs_debit?: Stripemandate_au_becs_debit;
  readonly bacs_debit?: Stripemandate_bacs_debit;
  readonly blik?: Stripemandate_blik;
  readonly card?: Stripecard_mandate_payment_method_details;
  readonly cashapp?: Stripemandate_cashapp;
  readonly kakao_pay?: Stripemandate_kakao_pay;
  readonly klarna?: Stripemandate_klarna;
  readonly kr_card?: Stripemandate_kr_card;
  readonly link?: Stripemandate_link;
  readonly naver_pay?: Stripemandate_naver_pay;
  readonly nz_bank_account?: Stripemandate_nz_bank_account;
  readonly paypal?: Stripemandate_paypal;
  readonly payto?: Stripemandate_payto;
  readonly pix?: Stripemandate_pix;
  readonly revolut_pay?: Stripemandate_revolut_pay;
  readonly sepa_debit?: Stripemandate_sepa_debit;
  readonly twint?: Stripemandate_twint;
  readonly type: string;
  readonly upi?: Stripemandate_upi;
  readonly us_bank_account?: Stripemandate_us_bank_account;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_customer_balance_payment_method_options = {
  readonly bank_transfer?: Stripecheckout_customer_balance_bank_transfer_payment_method_options;
  readonly funding_type?: "bank_transfer" | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_subscription_data_subscription_data = {
  readonly billing_mode: Stripequotes_resource_subscription_data_billing_mode;
  readonly description?: string | null;
  readonly effective_date?: number | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly trial_period_days?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecancellation_details = {
  readonly comment?: string | null;
  readonly feedback?:
    | "customer_service"
    | "low_quality"
    | "missing_features"
    | "other"
    | "switched_service"
    | "too_complex"
    | "too_expensive"
    | "unused"
    | null;
  readonly feedback_option?: string | Stripebilling_feedback_option | null;
  readonly reason?:
    | "canceled_by_retention_policy"
    | "cancellation_requested"
    | "payment_disputed"
    | "payment_failed"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeline_items_tax_amount = {
  readonly amount: number;
  readonly rate: Stripetax_rate;
  readonly taxability_reason?:
    | "customer_exempt"
    | "not_collecting"
    | "not_subject_to_tax"
    | "not_supported"
    | "portion_product_exempt"
    | "portion_reduced_rated"
    | "portion_standard_rated"
    | "product_exempt"
    | "product_exempt_holiday"
    | "proportionally_rated"
    | "reduced_rated"
    | "reverse_charge"
    | "standard_rated"
    | "taxable_basis_reduced"
    | "zero_rated"
    | null;
  readonly taxable_amount?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetest_helpers_test_clock = {
  readonly created: number;
  readonly deletes_after: number;
  readonly frozen_time: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly name?: string | null;
  readonly object: "test_helpers.test_clock";
  readonly status: "advancing" | "internal_failure" | "ready";
  readonly status_details: Stripebilling_clocks_resource_status_details_status_details;
} & { readonly [x: string]: Schema.Json };
export type Stripeshipping_rate = {
  readonly active: boolean;
  readonly created: number;
  readonly delivery_estimate?: Stripeshipping_rate_delivery_estimate | null;
  readonly display_name?: string | null;
  readonly fixed_amount?: Stripeshipping_rate_fixed_amount;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "shipping_rate";
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified" | null;
  readonly tax_code?: string | Stripetax_code | null;
  readonly type: "fixed_amount";
} & { readonly [x: string]: Schema.Json };
export type Stripecapability = {
  readonly account: string | Stripeaccount;
  readonly future_requirements?: Stripeaccount_capability_future_requirements;
  readonly id: string;
  readonly object: "capability";
  readonly requested: boolean;
  readonly requested_at?: number | null;
  readonly requirements?: Stripeaccount_capability_requirements;
  readonly status: "active" | "inactive" | "pending" | "unrequested";
} & { readonly [x: string]: Schema.Json };
export type Stripeperson = {
  readonly account: string;
  readonly additional_tos_acceptances?: Stripeperson_additional_tos_acceptances;
  readonly address?: Stripeaddress;
  readonly address_kana?: Stripelegal_entity_japan_address | null;
  readonly address_kanji?: Stripelegal_entity_japan_address | null;
  readonly created: number;
  readonly dob?: Stripelegal_entity_dob;
  readonly email?: string | null;
  readonly first_name?: string | null;
  readonly first_name_kana?: string | null;
  readonly first_name_kanji?: string | null;
  readonly full_name_aliases?: ReadonlyArray<string>;
  readonly future_requirements?: Stripeperson_future_requirements | null;
  readonly gender?: string | null;
  readonly id: string;
  readonly id_number_provided?: boolean;
  readonly id_number_secondary_provided?: boolean;
  readonly last_name?: string | null;
  readonly last_name_kana?: string | null;
  readonly last_name_kanji?: string | null;
  readonly maiden_name?: string | null;
  readonly metadata?: { readonly [x: string]: string };
  readonly nationality?: string | null;
  readonly object: "person";
  readonly phone?: string | null;
  readonly political_exposure?: "existing" | "none";
  readonly registered_address?: Stripeaddress;
  readonly relationship?: Stripeperson_relationship;
  readonly requirements?: Stripeperson_requirements | null;
  readonly ssn_last_4_provided?: boolean;
  readonly us_cfpb_data?: Stripeperson_us_cfpb_data | null;
  readonly verification?: Stripelegal_entity_person_verification;
} & { readonly [x: string]: Schema.Json };
export type Stripethresholds_resource_usage_threshold_config = {
  readonly filters?: ReadonlyArray<Stripethresholds_resource_usage_alert_filter> | null;
  readonly gte: number;
  readonly meter: string | Stripebilling_meter;
  readonly recurrence: "one_time";
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_us_bank_account_payment_method_options = {
  readonly financial_connections?: Stripecheckout_financial_connections_payment_method_options;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
  readonly verification_method?: "automatic" | "instant";
} & { readonly [x: string]: Schema.Json };
export type Stripeclimate_removals_order_deliveries = {
  readonly delivered_at: number;
  readonly location?: Stripeclimate_removals_location | null;
  readonly metric_tons: string;
  readonly registry_url?: string | null;
  readonly supplier: Stripeclimate_supplier;
} & { readonly [x: string]: Schema.Json };
export type Stripeclimate_product = {
  readonly created: number;
  readonly current_prices_per_metric_ton: {
    readonly [x: string]: Stripeclimate_removals_products_price;
  };
  readonly delivery_year?: number | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly metric_tons_available: string;
  readonly name: string;
  readonly object: "climate.product";
  readonly suppliers: ReadonlyArray<Stripeclimate_supplier>;
} & { readonly [x: string]: Schema.Json };
export type Stripefinancial_connections_account = {
  readonly account_holder?: Stripebank_connections_resource_accountholder | null;
  readonly account_numbers?: ReadonlyArray<Stripebank_connections_resource_account_number_details> | null;
  readonly balance?: Stripebank_connections_resource_balance | null;
  readonly balance_refresh?: Stripebank_connections_resource_balance_refresh | null;
  readonly category: "cash" | "credit" | "investment" | "other";
  readonly created: number;
  readonly display_name?: string | null;
  readonly id: string;
  readonly institution_name: string;
  readonly last4?: string | null;
  readonly livemode: boolean;
  readonly object: "financial_connections.account";
  readonly ownership?:
    | string
    | Stripefinancial_connections_account_ownership
    | null;
  readonly ownership_refresh?: Stripebank_connections_resource_ownership_refresh | null;
  readonly permissions?: ReadonlyArray<
    "balances" | "ownership" | "payment_method" | "transactions"
  > | null;
  readonly status: "active" | "disconnected" | "inactive";
  readonly status_details?: Stripebank_connections_resource_account_status_details;
  readonly subcategory:
    | "checking"
    | "credit_card"
    | "line_of_credit"
    | "mortgage"
    | "other"
    | "savings";
  readonly subscriptions?: ReadonlyArray<"transactions"> | null;
  readonly supported_payment_method_types: ReadonlyArray<
    "link" | "us_bank_account"
  >;
  readonly transaction_refresh?: Stripebank_connections_resource_transaction_refresh | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeforwarding_request = {
  readonly created: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "forwarding.request";
  readonly payment_method: string;
  readonly replacements: ReadonlyArray<
    | "card_cvc"
    | "card_expiry"
    | "card_number"
    | "cardholder_name"
    | "request_signature"
  >;
  readonly request_context?: Stripeforwarded_request_context | null;
  readonly request_details?: Stripeforwarded_request_details | null;
  readonly response_details?: Stripeforwarded_response_details | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeidentity_verification_report = {
  readonly client_reference_id?: string | null;
  readonly created: number;
  readonly document?: Stripegelato_document_report;
  readonly email?: Stripegelato_email_report;
  readonly id: string;
  readonly id_number?: Stripegelato_id_number_report;
  readonly livemode: boolean;
  readonly object: "identity.verification_report";
  readonly options?: Stripegelato_verification_report_options;
  readonly phone?: Stripegelato_phone_report;
  readonly selfie?: Stripegelato_selfie_report;
  readonly type: "document" | "id_number" | "verification_flow";
  readonly verification_flow?: string;
  readonly verification_session?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeproration_details = {
  readonly credited_items?: Stripeinvoice_item_proration_credited_items | null;
  readonly discount_amounts: ReadonlyArray<Stripediscounts_resource_discount_amount>;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_configuration = {
  readonly bbpos_wisepad3?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly bbpos_wisepos_e?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly cellular?: Stripeterminal_configuration_configuration_resource_cellular_config;
  readonly id: string;
  readonly is_account_default?: boolean | null;
  readonly livemode: boolean;
  readonly name?: string | null;
  readonly object: "terminal.configuration";
  readonly offline?: Stripeterminal_configuration_configuration_resource_offline_config;
  readonly reader_security?: Stripeterminal_configuration_configuration_resource_reader_security_config;
  readonly reboot_window?: Stripeterminal_configuration_configuration_resource_reboot_window;
  readonly stripe_s700?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly stripe_s710?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly stripe_t600?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly tipping?: Stripeterminal_configuration_configuration_resource_tipping;
  readonly verifone_m425?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly verifone_p400?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly verifone_p630?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly verifone_ux700?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly verifone_v660p?: Stripeterminal_configuration_configuration_resource_device_type_specific_config;
  readonly wifi?: Stripeterminal_configuration_configuration_resource_wifi_config;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_input = {
  readonly custom_text?: Stripeterminal_reader_reader_resource_custom_text | null;
  readonly email?: Stripeterminal_reader_reader_resource_email;
  readonly numeric?: Stripeterminal_reader_reader_resource_numeric;
  readonly phone?: Stripeterminal_reader_reader_resource_phone;
  readonly required?: boolean | null;
  readonly selection?: Stripeterminal_reader_reader_resource_selection;
  readonly signature?: Stripeterminal_reader_reader_resource_signature;
  readonly skipped?: boolean;
  readonly text?: Stripeterminal_reader_reader_resource_text;
  readonly toggles?: ReadonlyArray<Stripeterminal_reader_reader_resource_toggle> | null;
  readonly type:
    | "email"
    | "numeric"
    | "phone"
    | "selection"
    | "signature"
    | "text";
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_collect_payment_method_action =
  {
    readonly collect_config?: Stripeterminal_reader_reader_resource_collect_config;
    readonly payment_intent: string | Stripepayment_intent;
    readonly payment_method?: Stripepayment_method;
  } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_process_payment_intent_action =
  {
    readonly payment_intent: string | Stripepayment_intent;
    readonly process_config?: Stripeterminal_reader_reader_resource_process_config;
  } & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_set_reader_display_action = {
  readonly cart?: Stripeterminal_reader_reader_resource_cart | null;
  readonly type: "cart";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_future_usage = {
  readonly installment?: Stripethree_d_secure_standalone_resource_installment;
  readonly recurring?: Stripethree_d_secure_standalone_resource_recurring;
  readonly type: "card_on_file" | "installment" | "recurring";
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_standalone_resource_outcome_details = {
  readonly acs_transaction_id?: string;
  readonly ares?: string;
  readonly ares_trans_status?:
    | "A"
    | "C"
    | "D"
    | "I"
    | "N"
    | "R"
    | "S"
    | "U"
    | "Y";
  readonly cryptogram?: string;
  readonly ds_transaction_id?: string;
  readonly eci?: string;
  readonly network_details?: Stripethree_d_secure_standalone_resource_network_details;
  readonly protocol_version: "2.1.0" | "2.2.0" | "2.3.1";
  readonly requestor_challenge_indicator?:
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "06";
  readonly rreq?: string;
  readonly rreq_trans_status?:
    | "A"
    | "C"
    | "D"
    | "I"
    | "N"
    | "R"
    | "S"
    | "U"
    | "Y";
  readonly three_ds_server_transaction_id: string;
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions_bank_transfer = {
  readonly country: string;
  readonly financial_addresses: ReadonlyArray<Stripefunding_instructions_bank_transfer_financial_address>;
  readonly type: "eu_bank_transfer" | "jp_bank_transfer";
} & { readonly [x: string]: Schema.Json };
export type Stripeitem = {
  readonly adjustable_quantity?: Stripeline_items_adjustable_quantity | null;
  readonly amount_discount: number;
  readonly amount_subtotal: number;
  readonly amount_tax: number;
  readonly amount_total: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly discounts?: ReadonlyArray<Stripeline_items_discount_amount>;
  readonly id: string;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "item";
  readonly price?: Stripeprice | null;
  readonly quantity?: number | null;
  readonly taxes?: ReadonlyArray<Stripeline_items_tax_amount>;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_total_details_resource_breakdown = {
  readonly discounts: ReadonlyArray<Stripeline_items_discount_amount>;
  readonly taxes: ReadonlyArray<Stripeline_items_tax_amount>;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_session_payment_method_options = {
  readonly acss_debit?: Stripecheckout_acss_debit_payment_method_options;
  readonly affirm?: Stripecheckout_affirm_payment_method_options;
  readonly afterpay_clearpay?: Stripecheckout_afterpay_clearpay_payment_method_options;
  readonly alipay?: Stripecheckout_alipay_payment_method_options;
  readonly alma?: Stripecheckout_alma_payment_method_options;
  readonly amazon_pay?: Stripecheckout_amazon_pay_payment_method_options;
  readonly au_becs_debit?: Stripecheckout_au_becs_debit_payment_method_options;
  readonly bacs_debit?: Stripecheckout_bacs_debit_payment_method_options;
  readonly bancontact?: Stripecheckout_bancontact_payment_method_options;
  readonly billie?: Stripecheckout_billie_payment_method_options;
  readonly boleto?: Stripecheckout_boleto_payment_method_options;
  readonly card?: Stripecheckout_card_payment_method_options;
  readonly cashapp?: Stripecheckout_cashapp_payment_method_options;
  readonly customer_balance?: Stripecheckout_customer_balance_payment_method_options;
  readonly eps?: Stripecheckout_eps_payment_method_options;
  readonly fpx?: Stripecheckout_fpx_payment_method_options;
  readonly giropay?: Stripecheckout_giropay_payment_method_options;
  readonly grabpay?: Stripecheckout_grab_pay_payment_method_options;
  readonly ideal?: Stripecheckout_ideal_payment_method_options;
  readonly kakao_pay?: Stripecheckout_kakao_pay_payment_method_options;
  readonly klarna?: Stripecheckout_klarna_payment_method_options;
  readonly konbini?: Stripecheckout_konbini_payment_method_options;
  readonly kr_card?: Stripecheckout_kr_card_payment_method_options;
  readonly link?: Stripecheckout_link_payment_method_options;
  readonly mobilepay?: Stripecheckout_mobilepay_payment_method_options;
  readonly multibanco?: Stripecheckout_multibanco_payment_method_options;
  readonly naver_pay?: Stripecheckout_naver_pay_payment_method_options;
  readonly oxxo?: Stripecheckout_oxxo_payment_method_options;
  readonly p24?: Stripecheckout_p24_payment_method_options;
  readonly payco?: Stripecheckout_payco_payment_method_options;
  readonly paynow?: Stripecheckout_paynow_payment_method_options;
  readonly paypal?: Stripecheckout_paypal_payment_method_options;
  readonly payto?: Stripecheckout_payto_payment_method_options;
  readonly pix?: Stripecheckout_pix_payment_method_options;
  readonly revolut_pay?: Stripecheckout_revolut_pay_payment_method_options;
  readonly samsung_pay?: Stripecheckout_samsung_pay_payment_method_options;
  readonly satispay?: Stripecheckout_satispay_payment_method_options;
  readonly scalapay?: Stripecheckout_scalapay_payment_method_options;
  readonly sepa_debit?: Stripecheckout_sepa_debit_payment_method_options;
  readonly sequra?: Stripecheckout_sequra_payment_method_options;
  readonly sofort?: Stripecheckout_sofort_payment_method_options;
  readonly sunbit?: Stripecheckout_sunbit_payment_method_options;
  readonly swish?: Stripecheckout_swish_payment_method_options;
  readonly twint?: Stripecheckout_twint_payment_method_options;
  readonly upi?: Stripecheckout_upi_payment_method_options;
  readonly us_bank_account?: Stripecheckout_us_bank_account_payment_method_options;
  readonly wechat_pay?: Stripecheckout_wechat_pay_payment_method_options;
} & { readonly [x: string]: Schema.Json };
export type Stripeclimate_order = {
  readonly amount_fees: number;
  readonly amount_subtotal: number;
  readonly amount_total: number;
  readonly beneficiary?: Stripeclimate_removals_beneficiary;
  readonly canceled_at?: number | null;
  readonly cancellation_reason?:
    | "expired"
    | "product_unavailable"
    | "requested"
    | null;
  readonly certificate?: string | null;
  readonly confirmed_at?: number | null;
  readonly created: number;
  readonly currency: string;
  readonly delayed_at?: number | null;
  readonly delivered_at?: number | null;
  readonly delivery_details: ReadonlyArray<Stripeclimate_removals_order_deliveries>;
  readonly expected_delivery_year: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly metric_tons: string;
  readonly object: "climate.order";
  readonly product: string | Stripeclimate_product;
  readonly product_substituted_at?: number | null;
  readonly status:
    | "awaiting_funds"
    | "canceled"
    | "confirmed"
    | "delivered"
    | "open";
} & { readonly [x: string]: Schema.Json };
export type Stripefinancial_connections_session = {
  readonly account_holder?: Stripebank_connections_resource_accountholder | null;
  readonly accounts: {
    readonly data: ReadonlyArray<Stripefinancial_connections_account>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly bank_account_token?: Stripetoken;
  readonly client_secret?: string | null;
  readonly filters?: Stripebank_connections_resource_link_account_session_filters;
  readonly id: string;
  readonly limits?: Stripebank_connections_resource_link_account_session_limits;
  readonly livemode: boolean;
  readonly manual_entry?: Stripebank_connections_resource_link_account_session_manual_entry;
  readonly object: "financial_connections.session";
  readonly permissions: ReadonlyArray<
    "balances" | "ownership" | "payment_method" | "transactions"
  >;
  readonly prefetch?: ReadonlyArray<
    "balances" | "ownership" | "transactions"
  > | null;
  readonly return_url?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeidentity_verification_session = {
  readonly client_reference_id?: string | null;
  readonly client_secret?: string | null;
  readonly created: number;
  readonly id: string;
  readonly last_error?: Stripegelato_session_last_error | null;
  readonly last_verification_report?:
    | string
    | Stripeidentity_verification_report
    | null;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "identity.verification_session";
  readonly options?: Stripegelato_verification_session_options | null;
  readonly provided_details?: Stripegelato_provided_details | null;
  readonly redaction?: Stripeverification_session_redaction | null;
  readonly related_customer?: string | null;
  readonly related_customer_account?: string | null;
  readonly related_person?: Stripegelato_related_person;
  readonly status: "canceled" | "processing" | "requires_input" | "verified";
  readonly type: "document" | "id_number" | "verification_flow";
  readonly url?: string | null;
  readonly verification_flow?: string;
  readonly verified_outputs?: Stripegelato_verified_outputs | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_collect_inputs_action = {
  readonly inputs: ReadonlyArray<Stripeterminal_reader_reader_resource_input>;
  readonly metadata?: { readonly [x: string]: string } | null;
} & { readonly [x: string]: Schema.Json };
export type Stripethree_d_secure_authentication = {
  readonly acquirer_details?: Stripethree_d_secure_standalone_resource_acquirer_details;
  readonly amount?: number;
  readonly challenge_url?: string;
  readonly channel: Stripethree_d_secure_standalone_resource_channel;
  readonly created: number;
  readonly currency?: string;
  readonly directory_server:
    | "american_express"
    | "cartes_bancaires"
    | "discover"
    | "mastercard"
    | "visa";
  readonly fingerprinting_url?: string;
  readonly flow_preference?: Stripethree_d_secure_standalone_resource_flow_preference;
  readonly future_usage?: Stripethree_d_secure_standalone_resource_future_usage;
  readonly id: string;
  readonly livemode: boolean;
  readonly message_category:
    | "non_payment_authentication"
    | "payment_authentication";
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "three_d_secure.authentication";
  readonly outcome?:
    | "abandoned"
    | "attempt_acknowledged"
    | "authenticated"
    | "canceled"
    | "denied"
    | "informational"
    | "internal_error"
    | "not_supported"
    | "not_triggered"
    | "processing_error"
    | "rejected";
  readonly outcome_details?: Stripethree_d_secure_standalone_resource_outcome_details;
  readonly payment_method: string | Stripepayment_method;
  readonly reason?:
    | "cardholder_authentication"
    | "issuer_requested"
    | "liability_shift"
    | "processing_costs"
    | "regulatory_compliance";
  readonly shipping_address?: Stripethree_d_secure_standalone_resource_shipping_address;
  readonly status:
    | "canceled"
    | "error"
    | "failed"
    | "requires_challenge"
    | "requires_submission"
    | "succeeded";
} & { readonly [x: string]: Schema.Json };
export type Stripefunding_instructions = {
  readonly bank_transfer: Stripefunding_instructions_bank_transfer;
  readonly currency: string;
  readonly funding_type: "bank_transfer";
  readonly livemode: boolean;
  readonly object: "funding_instructions";
} & { readonly [x: string]: Schema.Json };
export type Stripecredit_note_line_item = {
  readonly amount: number;
  readonly description?: string | null;
  readonly discount_amount: number;
  readonly discount_amounts: ReadonlyArray<Stripediscounts_resource_discount_amount>;
  readonly id: string;
  readonly invoice_line_item?: string;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "credit_note_line_item";
  readonly pretax_credit_amounts: ReadonlyArray<Stripecredit_notes_pretax_credit_amount>;
  readonly quantity?: number | null;
  readonly tax_rates: ReadonlyArray<Stripetax_rate>;
  readonly taxes?: ReadonlyArray<Stripebilling_bill_resource_invoicing_taxes_tax> | null;
  readonly type: "custom_line_item" | "invoice_line_item";
  readonly unit_amount?: number | null;
  readonly unit_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_total_details = {
  readonly amount_discount: number;
  readonly amount_shipping?: number | null;
  readonly amount_tax: number;
  readonly breakdown?: Stripequotes_resource_total_details_resource_breakdown;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader_reader_resource_reader_action = {
  readonly api_error?: Stripeapi_errors | null;
  readonly collect_inputs?: Stripeterminal_reader_reader_resource_collect_inputs_action;
  readonly collect_payment_method?: Stripeterminal_reader_reader_resource_collect_payment_method_action;
  readonly confirm_payment_intent?: Stripeterminal_reader_reader_resource_confirm_payment_intent_action;
  readonly failure_code?: string | null;
  readonly failure_message?: string | null;
  readonly print_content?: Stripeterminal_reader_reader_resource_print_content;
  readonly process_payment_intent?: Stripeterminal_reader_reader_resource_process_payment_intent_action;
  readonly process_setup_intent?: Stripeterminal_reader_reader_resource_process_setup_intent_action;
  readonly refund_payment?: Stripeterminal_reader_reader_resource_refund_payment_action;
  readonly set_reader_display?: Stripeterminal_reader_reader_resource_set_reader_display_action;
  readonly status: "failed" | "in_progress" | "succeeded";
  readonly type:
    | "collect_inputs"
    | "collect_payment_method"
    | "confirm_payment_intent"
    | "print_content"
    | "process_payment_intent"
    | "process_setup_intent"
    | "refund_payment"
    | "set_reader_display";
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_recurring = {
  readonly amount_subtotal: number;
  readonly amount_total: number;
  readonly interval: "day" | "month" | "week" | "year";
  readonly interval_count: number;
  readonly total_details: Stripequotes_resource_total_details;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_upfront = {
  readonly amount_subtotal: number;
  readonly amount_total: number;
  readonly line_items?: {
    readonly data: ReadonlyArray<Stripeitem>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly total_details: Stripequotes_resource_total_details;
} & { readonly [x: string]: Schema.Json };
export type Stripecheckout_session = {
  readonly adaptive_pricing?: Stripepayment_pages_checkout_session_adaptive_pricing | null;
  readonly after_expiration?: Stripepayment_pages_checkout_session_after_expiration | null;
  readonly allow_promotion_codes?: boolean | null;
  readonly allowed_payment_method_types?: ReadonlyArray<string> | null;
  readonly amount_subtotal?: number | null;
  readonly amount_total?: number | null;
  readonly automatic_tax: Stripepayment_pages_checkout_session_automatic_tax;
  readonly billing_address_collection?: "auto" | "required" | null;
  readonly branding_settings?: Stripepayment_pages_checkout_session_branding_settings;
  readonly cancel_url?: string | null;
  readonly client_reference_id?: string | null;
  readonly client_secret?: string | null;
  readonly collected_information?: Stripepayment_pages_checkout_session_collected_information | null;
  readonly consent?: Stripepayment_pages_checkout_session_consent | null;
  readonly consent_collection?: Stripepayment_pages_checkout_session_consent_collection | null;
  readonly created: number;
  readonly currency?: string | null;
  readonly currency_conversion?: Stripepayment_pages_checkout_session_currency_conversion | null;
  readonly custom_fields: ReadonlyArray<Stripepayment_pages_checkout_session_custom_fields>;
  readonly custom_text: Stripepayment_pages_checkout_session_custom_text;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly customer_creation?: "always" | "if_required" | null;
  readonly customer_details?: Stripepayment_pages_checkout_session_customer_details | null;
  readonly customer_email?: string | null;
  readonly discounts?: ReadonlyArray<Stripepayment_pages_checkout_session_discount> | null;
  readonly excluded_payment_method_types?: ReadonlyArray<string>;
  readonly expires_at: number;
  readonly id: string;
  readonly integration_identifier?: string | null;
  readonly invoice?: string | Stripeinvoice | null;
  readonly invoice_creation?: Stripepayment_pages_checkout_session_invoice_creation | null;
  readonly line_items?: {
    readonly data: ReadonlyArray<Stripeitem>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly locale?:
    | "auto"
    | "bg"
    | "cs"
    | "da"
    | "de"
    | "el"
    | "en"
    | "en-GB"
    | "es"
    | "es-419"
    | "et"
    | "fi"
    | "fil"
    | "fr"
    | "fr-CA"
    | "hi-IN"
    | "hr"
    | "hu"
    | "id"
    | "it"
    | "ja"
    | "ko"
    | "lt"
    | "lv"
    | "ms"
    | "mt"
    | "nb"
    | "nl"
    | "pl"
    | "pt"
    | "pt-BR"
    | "ro"
    | "ru"
    | "sk"
    | "sl"
    | "sv"
    | "th"
    | "tr"
    | "vi"
    | "zh"
    | "zh-HK"
    | "zh-TW"
    | null;
  readonly managed_payments?: Stripepayment_pages_checkout_session_managed_payments | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly mode: "payment" | "setup" | "subscription";
  readonly name_collection?: Stripepayment_pages_checkout_session_name_collection;
  readonly object: "checkout.session";
  readonly optional_items?: ReadonlyArray<Stripepayment_pages_checkout_session_optional_item> | null;
  readonly origin_context?: "mobile_app" | "web" | null;
  readonly payment_intent?: string | Stripepayment_intent | null;
  readonly payment_link?: string | Stripepayment_link | null;
  readonly payment_method_collection?: "always" | "if_required" | null;
  readonly payment_method_configuration_details?: Stripepayment_method_config_biz_payment_method_configuration_details | null;
  readonly payment_method_options?: Stripecheckout_session_payment_method_options | null;
  readonly payment_method_types: ReadonlyArray<string>;
  readonly payment_status: "no_payment_required" | "paid" | "unpaid";
  readonly permissions?: Stripepayment_pages_checkout_session_permissions | null;
  readonly phone_number_collection?: Stripepayment_pages_checkout_session_phone_number_collection;
  readonly presentment_details?: Stripepayment_flows_payment_intent_presentment_details;
  readonly recovered_from?: string | null;
  readonly redirect_on_completion?: "always" | "if_required" | "never";
  readonly return_url?: string;
  readonly saved_payment_method_options?: Stripepayment_pages_checkout_session_saved_payment_method_options | null;
  readonly setup_intent?: string | Stripesetup_intent | null;
  readonly shipping_address_collection?: Stripepayment_pages_checkout_session_shipping_address_collection | null;
  readonly shipping_cost?: Stripepayment_pages_checkout_session_shipping_cost | null;
  readonly shipping_options: ReadonlyArray<Stripepayment_pages_checkout_session_shipping_option>;
  readonly status?: "complete" | "expired" | "open" | null;
  readonly submit_type?:
    | "auto"
    | "book"
    | "donate"
    | "pay"
    | "subscribe"
    | null;
  readonly subscription?: string | Stripesubscription | null;
  readonly success_url?: string | null;
  readonly tax_id_collection?: Stripepayment_pages_checkout_session_tax_id_collection;
  readonly total_details?: Stripepayment_pages_checkout_session_total_details | null;
  readonly ui_mode?:
    | "elements"
    | "embedded_page"
    | "form"
    | "hosted_page"
    | null;
  readonly url?: string | null;
  readonly wallet_options?: Stripecheckout_session_wallet_options | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeterminal_reader = {
  readonly action?: Stripeterminal_reader_reader_resource_reader_action | null;
  readonly device_sw_version?: string | null;
  readonly device_type:
    | "bbpos_chipper2x"
    | "bbpos_wisepad3"
    | "bbpos_wisepos_e"
    | "mobile_phone_reader"
    | "simulated_stripe_s700"
    | "simulated_stripe_s710"
    | "simulated_stripe_t600"
    | "simulated_verifone_m425"
    | "simulated_verifone_p630"
    | "simulated_verifone_ux700"
    | "simulated_verifone_v660p"
    | "simulated_wisepos_e"
    | "stripe_m2"
    | "stripe_s700"
    | "stripe_s710"
    | "stripe_t600"
    | "verifone_P400"
    | "verifone_m425"
    | "verifone_p630"
    | "verifone_ux700"
    | "verifone_v660p";
  readonly id: string;
  readonly ip_address?: string | null;
  readonly label: string;
  readonly last_seen_at?: number | null;
  readonly livemode: boolean;
  readonly location?: string | Stripeterminal_location | null;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "terminal.reader";
  readonly serial_number: string;
  readonly status?: "offline" | "online" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripequotes_resource_computed = {
  readonly recurring?: Stripequotes_resource_recurring | null;
  readonly upfront: Stripequotes_resource_upfront;
} & { readonly [x: string]: Schema.Json };

export const Stripefile_link = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    expired: Schema.Boolean.annotate({
      description: "Returns if the link is already expired.",
    }),
    expires_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Time that the link expires.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    file: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.suspend((): Schema.Codec<Stripefile> => Stripefile),
    ]).annotate({ description: "The file object this link points to." }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
    }),
    metadata: Schema.Record(
      Schema.String,
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
    object: Schema.Literal("file_link").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    url: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The publicly accessible URL to download the file.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "File Link",
  description:
    "To share the contents of a `File` object with non-Stripe users, you can\ncreate a `FileLink`. `FileLink`s contain a URL that you can use to\nretrieve the contents of the file without authentication.",
  identifier: "Stripefile_link",
});
export const Stripefile = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    expires_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The file expires and isn't available at this time in epoch seconds.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    filename: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The suitable name for saving the file to a filesystem.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    links: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(
              Schema.suspend(
                (): Schema.Codec<Stripefile_link> => Stripefile_link,
              ),
            ).annotate({ description: "Details about each object." }),
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
            })
              .check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              )
              .check(
                Schema.isPattern(
                  new globalThis.RegExp("^\\/v1\\/file_links", "u"),
                ).annotate({
                  expected: "a string matching the RegExp ^\\/v1\\/file_links",
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
          title: "FileResourceFileLinkList",
          description:
            "A list of [file links](https://docs.stripe.com/api#file_links) that point at this file.",
        }),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("file").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    purpose: Schema.Literals([
      "account_requirement",
      "additional_verification",
      "business_icon",
      "business_logo",
      "customer_signature",
      "dispute_evidence",
      "document_provider_identity_document",
      "finance_report_run",
      "financial_account_statement",
      "identity_document",
      "identity_document_downloadable",
      "issuing_regulatory_reporting",
      "pci_document",
      "platform_terms_of_service",
      "selfie",
      "sigma_scheduled_query",
      "tax_document_user_upload",
      "terminal_android_apk",
      "terminal_reader_splashscreen",
      "terminal_wifi_certificate",
      "terminal_wifi_private_key",
    ]).annotate({
      description:
        "The [purpose](https://docs.stripe.com/file-upload#uploading-a-file) of the uploaded file.",
    }),
    size: Schema.Number.annotate({
      description: "The size of the file object in bytes.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "A suitable title for the document.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The returned file type (for example, `csv`, `pdf`, `jpg`, or `png`).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    url: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Use your live secret API key to download the file from this URL.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "File",
  description:
    "This object represents files hosted on Stripe's servers. You can upload\nfiles with the [create file](https://docs.stripe.com/api#create_file) request\n(for example, when uploading dispute evidence). Stripe also\ncreates files independently (for example, the results of a [Sigma scheduled\nquery](#scheduled_queries)).\n\nRelated guide: [File upload guide](https://docs.stripe.com/file-upload)",
  identifier: "Stripefile",
});
export const Stripestackable_discount_with_discount_settings = Schema.suspend(
  (): Schema.Codec<Stripestackable_discount_with_discount_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        coupon: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecoupon,
            ]).annotate({
              description: "ID of the coupon to create a new discount for.",
            }),
            Schema.Null,
          ]),
        ),
        discount: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripediscount> => Stripediscount,
              ),
            ]).annotate({
              description:
                "ID of an existing discount on the object (or one of its ancestors) to reuse.",
            }),
            Schema.Null,
          ]),
        ),
        promotion_code: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepromotion_code> => Stripepromotion_code,
              ),
            ]).annotate({
              description:
                "ID of the promotion code to create a new discount for.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "StackableDiscountWithDiscountSettings",
      description: "",
      identifier: "Stripestackable_discount_with_discount_settings",
    }),
);
export const Stripepromotion_code = Schema.suspend(
  (): Schema.Codec<Stripepromotion_code> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description:
            "Whether the promotion code is currently active. A promotion code is only active if the coupon is also valid.",
        }),
        code: Schema.String.annotate({
          description:
            "The customer-facing code. Regardless of case, this code must be unique across all active promotion codes for each customer. Valid characters are lower case letters (a-z), upper case letters (A-Z), digits (0-9), and dashes (-).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({
              description: "The customer who can use this promotion code.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The account representing the customer who can use this promotion code.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expires_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date at which the promotion code can no longer be redeemed.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        max_redemptions: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Maximum number of times this promotion code can be redeemed.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("promotion_code").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        promotion: Stripepromotion_codes_resource_promotion,
        restrictions: Stripepromotion_codes_resource_restrictions,
        times_redeemed: Schema.Number.annotate({
          description: "Number of times this promotion code has been used.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Promotion Code",
      description:
        "A Promotion Code represents a customer-redeemable code for an underlying promotion.\nYou can create multiple codes for a single promotion.\n\nIf you enable promotion codes in your [customer portal configuration](https://docs.stripe.com/customer-management/configure-portal), then customers can redeem a code themselves when updating a subscription in the portal.\nCustomers can also view the currently active promotion codes and coupons on each of their subscriptions in the portal.",
      identifier: "Stripepromotion_code",
    }),
);
export const Stripediscount = Schema.suspend(
  (): Schema.Codec<Stripediscount> =>
    Schema.StructWithRest(
      Schema.Struct({
        checkout_session: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Checkout session that this coupon is applied to, if it is applied to a particular session in payment mode. Not present for subscription mode.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({
              description:
                "The ID of the customer associated with this discount.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the account representing the customer associated with this discount.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        end: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If the coupon has a duration of `repeating`, the date that this discount will end. If the coupon has a duration of `once` or `forever`, this attribute will be null.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description:
            "The ID of the discount object. Discounts can't be fetched by ID. Use `expand[]=discounts` in API calls to expand discount IDs in an array.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The invoice that the discount's coupon was applied to, if it was applied directly to a particular invoice.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        invoice_item: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The invoice item `id` (or invoice line item `id` for invoice line items of type='subscription') that the discount's coupon was applied to, if it was applied directly to a particular invoice item or invoice line item.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("discount").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        promotion_code: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepromotion_code> => Stripepromotion_code,
              ),
            ]).annotate({
              description:
                "The promotion code applied to create this discount.",
            }),
            Schema.Null,
          ]),
        ),
        source: Stripediscount_source,
        start: Schema.Number.annotate({
          description: "Date that the coupon was applied.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        subscription: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The subscription that this coupon is applied to, if it is applied to a particular subscription.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        subscription_item: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The subscription item that this coupon is applied to, if it is applied to a particular subscription item.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Discount",
      description:
        "A discount represents the actual application of a [coupon](https://docs.stripe.com/api#coupons) or [promotion code](https://docs.stripe.com/api#promotion_codes).\nIt contains information about when the discount began, when it will end, and what it is applied to.\n\nRelated guide: [Applying discounts to subscriptions](https://docs.stripe.com/billing/subscriptions/discounts)",
      identifier: "Stripediscount",
    }),
);
export const Stripesepa_debit_generated_from = Schema.StructWithRest(
  Schema.Struct({
    charge: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
        ]).annotate({
          description:
            "The ID of the Charge that generated this PaymentMethod, if any.",
        }),
        Schema.Null,
      ]),
    ),
    setup_attempt: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripesetup_attempt> => Stripesetup_attempt,
          ),
        ]).annotate({
          description:
            "The ID of the SetupAttempt that generated this PaymentMethod, if any.",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "sepa_debit_generated_from",
  description: "",
  identifier: "Stripesepa_debit_generated_from",
});
export const Stripemandate = Schema.suspend(
  (): Schema.Codec<Stripemandate> =>
    Schema.StructWithRest(
      Schema.Struct({
        customer_acceptance: Stripecustomer_acceptance,
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        multi_use: Schema.optionalKey(Stripemandate_multi_use),
        object: Schema.Literal("mandate").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        on_behalf_of: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The account (if any) that the mandate is intended for.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        payment_method: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripepayment_method> => Stripepayment_method,
          ),
        ]).annotate({
          description: "ID of the payment method associated with this mandate.",
        }),
        payment_method_details: Stripemandate_payment_method_details,
        single_use: Schema.optionalKey(Stripemandate_single_use),
        status: Schema.Literals(["active", "inactive", "pending"]).annotate({
          description:
            "The mandate status indicates whether or not you can use it to initiate a payment.",
        }),
        type: Schema.Literals(["multi_use", "single_use"]).annotate({
          description: "The type of the mandate.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Mandate",
      description:
        "A Mandate is a record of the permission that your customer gives you to debit their payment method.",
      identifier: "Stripemandate",
    }),
);
export const Stripeapi_errors = Schema.suspend(
  (): Schema.Codec<Stripeapi_errors> =>
    Schema.StructWithRest(
      Schema.Struct({
        advice_code: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "For card errors resulting from a card issuer decline, a short string indicating [how to proceed with an error](https://docs.stripe.com/declines/card#retrying-issuer-declines) if they provide one.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        charge: Schema.optionalKey(
          Schema.String.annotate({
            description: "For card errors, the ID of the failed charge.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        code: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "For some errors that could be handled programmatically, a short string indicating the [error code](https://docs.stripe.com/error-codes) reported.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        decline_code: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "For card errors resulting from a card issuer decline, a short string indicating the [card issuer's reason for the decline](https://docs.stripe.com/declines#issuer-declines) if they provide one.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        doc_url: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "A URL to more information about the [error code](https://docs.stripe.com/error-codes) reported.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        message: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.",
          }).check(
            Schema.isMaxCodePoints(40000).annotate({
              expected: "a string with at most 40000 code points",
            }),
          ),
        ),
        network_advice_code: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "For card errors resulting from a card issuer decline, a 2 digit code which indicates the advice given to merchant by the card network on how to proceed with an error.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        network_decline_code: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "For payments declined by the network, an alphanumeric code which indicates the reason the payment failed.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        param: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        payment_intent: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripepayment_intent> => Stripepayment_intent,
          ),
        ),
        payment_method: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripepayment_method> => Stripepayment_method,
          ),
        ),
        payment_method_type: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "If the error is specific to the type of payment method, the payment method type that had a problem. This field is only populated for invoice-related errors.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        request_log_url: Schema.optionalKey(
          Schema.String.annotate({
            description: "A URL to the request log entry in your dashboard.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        setup_intent: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripesetup_intent> => Stripesetup_intent,
          ),
        ),
        source: Schema.optionalKey(
          Schema.Union([
            Schema.suspend(
              (): Schema.Codec<Stripebank_account> => Stripebank_account,
            ),
            Schema.suspend((): Schema.Codec<Stripecard> => Stripecard),
            Stripesource,
          ]).annotate({
            description:
              "The [source object](https://docs.stripe.com/api/sources/object) for errors returned on a request involving a source.",
          }),
        ),
        type: Schema.Literals([
          "api_error",
          "card_error",
          "idempotency_error",
          "invalid_request_error",
        ]).annotate({
          description:
            "The type of error returned. One of `api_error`, `card_error`, `idempotency_error`, or `invalid_request_error`",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "APIErrors",
      description: "",
      identifier: "Stripeapi_errors",
    }),
);
export const Stripereview = Schema.suspend(
  (): Schema.Codec<Stripereview> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing_zip: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ZIP or postal code of the card used, if applicable.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        charge: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
            ]).annotate({
              description: "The charge associated with this review.",
            }),
            Schema.Null,
          ]),
        ),
        closed_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "acknowledged",
              "approved",
              "canceled",
              "disputed",
              "payment_never_settled",
              "redacted",
              "refunded",
              "refunded_as_fraud",
            ]).annotate({
              description:
                "The reason the review was closed, or null if it has not yet been closed. One of `approved`, `refunded`, `refunded_as_fraud`, `disputed`, `redacted`, `canceled`, `payment_never_settled`, or `acknowledged`.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        ip_address: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The IP address where the payment originated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ip_address_location: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Striperadar_review_resource_location]).annotate({
              description:
                "Information related to the location of the payment. Note that this information is an approximation and attempts to locate the nearest population center - it should not be used to determine a specific address.",
            }),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("review").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        open: Schema.Boolean.annotate({
          description: "If `true`, the review needs action.",
        }),
        opened_reason: Schema.Literals(["manual", "rule"]).annotate({
          description:
            "The reason the review was opened. One of `rule` or `manual`.",
        }),
        payment_intent: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend(
              (): Schema.Codec<Stripepayment_intent> => Stripepayment_intent,
            ),
          ]).annotate({
            description:
              "The PaymentIntent ID associated with this review, if one exists.",
          }),
        ),
        reason: Schema.String.annotate({
          description:
            "The reason the review is currently open or closed. One of `rule`, `manual`, `approved`, `refunded`, `refunded_as_fraud`, `disputed`, `redacted`, `canceled`, `payment_never_settled`, or `acknowledged`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        session: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Striperadar_review_resource_session]).annotate({
              description:
                "Information related to the browsing session of the user who initiated the payment.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Review",
      description:
        "Reviews can be used to supplement automated fraud detection with human expertise.\n\nLearn more about [Radar](/radar) and reviewing payments\n[here](https://docs.stripe.com/radar/reviews).",
      identifier: "Stripereview",
    }),
);
export const Stripetopup = Schema.suspend(
  (): Schema.Codec<Stripetopup> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        balance_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebalance_transaction> =>
                  Stripebalance_transaction,
              ),
            ]).annotate({
              description:
                "ID of the balance transaction that describes the impact of this top-up on your account balance. May not be specified depending on status of top-up.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An arbitrary string attached to the object. Often useful for displaying to users.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expected_availability_date: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date the funds are expected to arrive in your Stripe account for payouts. This factors in delays like weekends or bank holidays. May not be specified depending on status of top-up.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        failure_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Error code explaining reason for top-up failure if available (see [the errors section](/api/errors) for a list of codes).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        failure_message: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Message to user further explaining reason for top-up failure if available.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        initiated_by: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["stripe", "user"]).annotate({
              description:
                "Indicates whether the top-up was initiated by Stripe or by the user.",
            }),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        object: Schema.Literal("topup").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepayment_method> => Stripepayment_method,
              ),
            ]).annotate({
              description:
                "The ID of a PaymentMethod representing the payment method used for the top-up. A PaymentMethod of type `us_bank_account` can be used.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetopup_resource_payment_method_options,
            ]).annotate({
              description:
                "Payment-method-specific configuration for this top-up.",
            }),
            Schema.Null,
          ]),
        ),
        source: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesource]).annotate({
              description:
                "The source field is deprecated. It might not always be present in the API response.",
            }),
            Schema.Null,
          ]),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Extra information about a top-up. This will appear on your source's bank statement. It must contain at least one letter.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals([
          "canceled",
          "failed",
          "pending",
          "reversed",
          "succeeded",
        ]).annotate({
          description:
            "The status of the top-up is either `canceled`, `failed`, `pending`, `reversed`, or `succeeded`.",
        }),
        transfer_group: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A string that identifies this top-up as part of a group.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Top-up",
      description:
        "To top up your Stripe balance, you create a top-up object. You can retrieve\nindividual top-ups, as well as list all top-ups. Top-ups are identified by a\nunique, random ID.\n\nRelated guide: [Topping up your platform account](https://docs.stripe.com/connect/top-ups)",
      identifier: "Stripetopup",
    }),
);
export const Stripeapplication_fee = Schema.suspend(
  (): Schema.Codec<Stripeapplication_fee> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
        ]).annotate({
          description: "ID of the Stripe account this fee was taken from.",
        }),
        amount: Schema.Number.annotate({
          description: "Amount earned, in cents (or local equivalent).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_refunded: Schema.Number.annotate({
          description:
            "Amount in cents (or local equivalent) refunded (can be less than the amount attribute on the fee if a partial refund was issued)",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        application: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeapplication,
        ]).annotate({
          description: "ID of the Connect application that earned the fee.",
        }),
        balance_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebalance_transaction> =>
                  Stripebalance_transaction,
              ),
            ]).annotate({
              description:
                "Balance transaction that describes the impact of this collected application fee on your account balance (not including refunds).",
            }),
            Schema.Null,
          ]),
        ),
        charge: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
        ]).annotate({
          description:
            "ID of the charge that the application fee was taken from.",
        }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        fee_source: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeplatform_earning_fee_source]).annotate({
              description:
                "Polymorphic source of the application fee. Includes the ID of the object the application fee was created from.",
            }),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("application_fee").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        originating_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
            ]).annotate({
              description:
                "ID of the corresponding charge on the platform account, if this fee was the result of a charge using the `destination` parameter.",
            }),
            Schema.Null,
          ]),
        ),
        refunded: Schema.Boolean.annotate({
          description:
            "Whether the fee has been fully refunded. If the fee is only partially refunded, this attribute will still be false.",
        }),
        refunds: Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(
              Schema.suspend(
                (): Schema.Codec<Stripefee_refund> => Stripefee_refund,
              ),
            ).annotate({ description: "Details about each object." }),
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
          title: "FeeRefundList",
          description: "A list of refunds that have been applied to the fee.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Application Fee",
      description:
        "When you collect a transaction fee on top of a charge made for your user\n(using [Connect](https://docs.stripe.com/connect)), an `Application Fee` object is created in\nyour account. You can list, retrieve, and refund application fees.\n\nRelated guide: [Collecting application fees](https://docs.stripe.com/connect/direct-charges#collect-fees)",
      identifier: "Stripeapplication_fee",
    }),
);
export const Stripefee_refund = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "Amount, in cents (or local equivalent).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    balance_transaction: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripebalance_transaction> =>
              Stripebalance_transaction,
          ),
        ]).annotate({
          description:
            "Balance transaction that describes the impact on your account balance.",
        }),
        Schema.Null,
      ]),
    ),
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
    fee: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.suspend(
        (): Schema.Codec<Stripeapplication_fee> => Stripeapplication_fee,
      ),
    ]).annotate({
      description: "ID of the application fee that was refunded.",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Union([
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("fee_refund").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Application Fee Refund",
  description:
    "`Application Fee Refund` objects allow you to refund an application fee that\nhas previously been created but not yet refunded. Funds will be refunded to\nthe Stripe account from which the fee was originally collected.\n\nRelated guide: [Refunding application fees](https://docs.stripe.com/connect/destination-charges#refunding-app-fee)",
  identifier: "Stripefee_refund",
});
export const Stripedeleted_discount = Schema.suspend(
  (): Schema.Codec<Stripedeleted_discount> =>
    Schema.StructWithRest(
      Schema.Struct({
        checkout_session: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Checkout session that this coupon is applied to, if it is applied to a particular session in payment mode. Not present for subscription mode.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({
              description:
                "The ID of the customer associated with this discount.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the account representing the customer associated with this discount.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        deleted: Schema.Literal(true).annotate({
          description: "Always true for a deleted object",
        }),
        id: Schema.String.annotate({
          description:
            "The ID of the discount object. Discounts can't be fetched by ID. Use `expand[]=discounts` in API calls to expand discount IDs in an array.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The invoice that the discount's coupon was applied to, if it was applied directly to a particular invoice.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        invoice_item: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The invoice item `id` (or invoice line item `id` for invoice line items of type='subscription') that the discount's coupon was applied to, if it was applied directly to a particular invoice item or invoice line item.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("discount").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        promotion_code: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepromotion_code> => Stripepromotion_code,
              ),
            ]).annotate({
              description:
                "The promotion code applied to create this discount.",
            }),
            Schema.Null,
          ]),
        ),
        source: Stripediscount_source,
        start: Schema.Number.annotate({
          description: "Date that the coupon was applied.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        subscription: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The subscription that this coupon is applied to, if it is applied to a particular subscription.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        subscription_item: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The subscription item that this coupon is applied to, if it is applied to a particular subscription item.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DeletedDiscount",
      description: "",
      identifier: "Stripedeleted_discount",
    }),
);
export const Stripeline_item = Schema.suspend(
  (): Schema.Codec<Stripeline_item> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "The amount, in cents (or local equivalent).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An arbitrary string attached to the object. Often useful for displaying to users.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discount_amounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripediscounts_resource_discount_amount).annotate({
              description:
                "The amount of discount calculated per discount for this line item.",
            }),
            Schema.Null,
          ]),
        ),
        discountable: Schema.Boolean.annotate({
          description:
            "If true, discounts will apply to this line item. Always false for prorations.",
        }),
        discounts: Schema.Array(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripediscount> => Stripediscount),
          ]),
        ).annotate({
          description:
            "The discounts applied to the invoice line item. Line item discounts are applied before invoice discounts. Use `expand[]=discounts` to expand each discount.",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the invoice that contains this line item.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Note that for line items with `type=subscription`, `metadata` reflects the current metadata from the subscription associated with the line item, unless the invoice line was directly updated with different metadata after creation.",
        }),
        object: Schema.Literal("line_item").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        parent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_parent,
            ]).annotate({
              description: "The parent that generated this line item.",
            }),
            Schema.Null,
          ]),
        ),
        period: Stripeinvoice_line_item_period,
        pretax_credit_amounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.suspend(
                (): Schema.Codec<Stripeinvoices_resource_pretax_credit_amount> =>
                  Stripeinvoices_resource_pretax_credit_amount,
              ),
            ).annotate({
              description:
                "Contains pretax credit amounts (ex: discount, credit grants, etc) that apply to this line item.",
            }),
            Schema.Null,
          ]),
        ),
        pricing: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebilling_bill_resource_invoicing_pricing_pricing,
            ]).annotate({
              description: "The pricing information of the line item.",
            }),
            Schema.Null,
          ]),
        ),
        quantity: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Quantity of units for the invoice line item in integer format, with any decimal precision truncated. For the line item's full-precision decimal quantity, use `quantity_decimal`. This field will be deprecated in favor of `quantity_decimal` in a future version. If the line item is a proration or subscription, the quantity of the subscription that the proration was computed for.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        quantity_decimal: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Non-negative decimal with at most 12 decimal places. The quantity of units for the line item.",
              format: "decimal",
            }),
            Schema.Null,
          ]),
        ),
        subscription: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripesubscription> => Stripesubscription,
              ),
            ]),
            Schema.Null,
          ]),
        ),
        subtotal: Schema.Number.annotate({
          description:
            "The subtotal of the line item, in cents (or local equivalent), before any discounts or taxes.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        taxes: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripebilling_bill_resource_invoicing_taxes_tax,
            ).annotate({
              description: "The tax information of the line item.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Invoice Line Item",
      description:
        "Invoice Line Items represent the individual lines within an [invoice](https://docs.stripe.com/api/invoices) and only exist within the context of an invoice.\n\nEach line item is backed by either an [invoice item](https://docs.stripe.com/api/invoiceitems) or a [subscription item](https://docs.stripe.com/api/subscription_items).",
      identifier: "Stripeline_item",
    }),
);
export const Stripecredit_note = Schema.suspend(
  (): Schema.Codec<Stripecredit_note> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The integer amount in cents (or local equivalent) representing the total amount of the credit note, including tax.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_shipping: Schema.Number.annotate({
          description: "This is the sum of all the shipping amounts.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
          Stripedeleted_customer,
        ]).annotate({ description: "ID of the customer." }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "ID of the account representing the customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_balance_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer_balance_transaction> =>
                  Stripecustomer_balance_transaction,
              ),
            ]).annotate({
              description:
                "Customer balance transaction related to this credit note.",
            }),
            Schema.Null,
          ]),
        ),
        discount_amount: Schema.Number.annotate({
          description:
            "The integer amount in cents (or local equivalent) representing the total amount of discount that was credited.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        discount_amounts: Schema.Array(
          Stripediscounts_resource_discount_amount,
        ).annotate({
          description:
            "The aggregate amounts calculated per discount for all line items.",
        }),
        effective_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
        ]).annotate({ description: "ID of the invoice." }),
        lines: Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(Stripecredit_note_line_item).annotate({
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
          title: "CreditNoteLinesList",
          description: "Line items that make up the credit note",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        memo: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Customer-facing text that appears on the credit note PDF.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        number: Schema.String.annotate({
          description:
            "A unique number that identifies this particular credit note and appears on the PDF of the credit note and its associated invoice.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("credit_note").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        out_of_band_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "Amount that was credited outside of Stripe.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        pdf: Schema.String.annotate({
          description: "The link to download the PDF of the credit note.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        post_payment_amount: Schema.Number.annotate({
          description:
            "The amount of the credit note that was refunded to the customer, credited to the customer's balance, credited outside of Stripe, or any combination thereof.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        pre_payment_amount: Schema.Number.annotate({
          description:
            "The amount of the credit note by which the invoice's `amount_remaining` and `amount_due` were reduced.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        pretax_credit_amounts: Schema.Array(
          Stripecredit_notes_pretax_credit_amount,
        ).annotate({
          description:
            "The pretax credit amounts (ex: discount, credit grants, etc) for all line items.",
        }),
        reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "duplicate",
              "fraudulent",
              "order_change",
              "product_unsatisfactory",
            ]).annotate({
              description:
                "Reason for issuing this credit note, one of `duplicate`, `fraudulent`, `order_change`, or `product_unsatisfactory`",
            }),
            Schema.Null,
          ]),
        ),
        refunds: Schema.Array(Stripecredit_note_refund).annotate({
          description: "Refunds related to this credit note.",
        }),
        shipping_cost: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoices_resource_shipping_cost]).annotate({
              description:
                "The details of the cost of shipping, including the ShippingRate applied to the invoice.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["issued", "void"]).annotate({
          description:
            "Status of this credit note, one of `issued` or `void`. Learn more about [voiding credit notes](https://docs.stripe.com/billing/invoices/credit-notes#voiding).",
        }),
        subtotal: Schema.Number.annotate({
          description:
            "The integer amount in cents (or local equivalent) representing the amount of the credit note, excluding exclusive tax and invoice level discounts.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        subtotal_excluding_tax: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The integer amount in cents (or local equivalent) representing the amount of the credit note, excluding all tax and invoice level discounts.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        total: Schema.Number.annotate({
          description:
            "The integer amount in cents (or local equivalent) representing the total amount of the credit note, including tax and all discount.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        total_excluding_tax: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The integer amount in cents (or local equivalent) representing the total amount of the credit note, excluding tax, but including discounts.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        total_taxes: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripebilling_bill_resource_invoicing_taxes_tax,
            ).annotate({
              description: "The aggregate tax information for all line items.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals([
          "mixed",
          "post_payment",
          "pre_payment",
        ]).annotate({
          description:
            "Type of this credit note, one of `pre_payment` or `post_payment`. A `pre_payment` credit note means it was issued when the invoice was open. A `post_payment` credit note means it was issued when the invoice was paid.",
        }),
        voided_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The time that the credit note was voided.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Credit Note",
      description:
        "Issue a credit note to adjust an invoice's amount after the invoice is finalized.\n\nRelated guide: [Credit notes](https://docs.stripe.com/billing/invoices/credit-notes)",
      identifier: "Stripecredit_note",
    }),
);
export const Stripequotes_resource_from_quote = Schema.StructWithRest(
  Schema.Struct({
    is_revision: Schema.Boolean.annotate({
      description: "Whether this quote is a revision of a different quote.",
    }),
    quote: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.suspend((): Schema.Codec<Stripequote> => Stripequote),
    ]).annotate({ description: "The quote that was cloned." }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "QuotesResourceFromQuote",
  description: "",
  identifier: "Stripequotes_resource_from_quote",
});
export const Stripequote = Schema.suspend(
  (): Schema.Codec<Stripequote> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_subtotal: Schema.Number.annotate({
          description: "Total before any discounts or taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_total: Schema.Number.annotate({
          description: "Total after discounts and taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        application: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeapplication,
              Stripedeleted_application,
            ]).annotate({
              description:
                "ID of the Connect Application that created the quote.",
            }),
            Schema.Null,
          ]),
        ),
        application_fee_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account. Only applicable if there are no line items with recurring prices on the quote.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        application_fee_percent: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. Only applicable if there are line items with recurring prices on the quote.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        automatic_tax: Stripequotes_resource_automatic_tax,
        collection_method: Schema.Literals([
          "charge_automatically",
          "send_invoice",
        ]).annotate({
          description:
            "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay invoices at the end of the subscription cycle or on finalization using the default payment method attached to the subscription or customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`. Defaults to `charge_automatically`.",
        }),
        computed: Stripequotes_resource_computed,
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({
              description:
                "The customer who received this quote. A customer is required to finalize the quote. Once specified, you can't change it.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The account representing the customer who received this quote. A customer or account is required to finalize the quote. Once specified, you can't change it.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        default_tax_rates: Schema.optionalKey(
          Schema.Array(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetax_rate,
            ]),
          ).annotate({ description: "The tax rates applied to this quote." }),
        ),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A description that will be displayed on the quote PDF.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discounts: Schema.Array(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripediscount> => Stripediscount),
          ]),
        ).annotate({ description: "The discounts applied to this quote." }),
        expires_at: Schema.Number.annotate({
          description:
            "The date on which the quote will be canceled if in `open` or `draft` status. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        footer: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "A footer that will be displayed on the quote PDF.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        from_quote: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripequotes_resource_from_quote> =>
                  Stripequotes_resource_from_quote,
              ),
            ]).annotate({
              description:
                "Details of the quote that was cloned. See the [cloning documentation](https://docs.stripe.com/quotes/clone) for more details.",
            }),
            Schema.Null,
          ]),
        ),
        header: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "A header that will be displayed on the quote PDF.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
              Stripedeleted_invoice,
            ]).annotate({
              description: "The invoice that was created from this quote.",
            }),
            Schema.Null,
          ]),
        ),
        invoice_settings: Stripeinvoice_setting_quote_setting,
        line_items: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(Stripeitem).annotate({
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
            title: "QuotesResourceListLineItems",
            description: "A list of items the customer is being quoted for.",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A unique number that identifies this particular quote. This number is assigned once the quote is [finalized](https://docs.stripe.com/quotes/overview#finalize).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("quote").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        on_behalf_of: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
            ]).annotate({
              description:
                "The account on behalf of which to charge. See the [Connect documentation](https://support.stripe.com/questions/sending-invoices-on-behalf-of-connected-accounts) for details.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals([
          "accepted",
          "canceled",
          "draft",
          "open",
        ]).annotate({ description: "The status of the quote." }),
        status_transitions: Stripequotes_resource_status_transitions,
        subscription: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripesubscription> => Stripesubscription,
              ),
            ]).annotate({
              description:
                "The subscription that was created or updated from this quote.",
            }),
            Schema.Null,
          ]),
        ),
        subscription_data:
          Stripequotes_resource_subscription_data_subscription_data,
        subscription_schedule: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripesubscription_schedule> =>
                  Stripesubscription_schedule,
              ),
            ]).annotate({
              description:
                "The subscription schedule that was created or updated from this quote.",
            }),
            Schema.Null,
          ]),
        ),
        test_clock: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetest_helpers_test_clock,
            ]).annotate({
              description: "ID of the test clock this quote belongs to.",
            }),
            Schema.Null,
          ]),
        ),
        total_details: Stripequotes_resource_total_details,
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripequotes_resource_transfer_data]).annotate({
              description:
                "The account (if any) the payments will be attributed to for tax reporting, and where funds from each payment will be transferred to for each of the invoices.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Quote",
      description:
        "A Quote is a way to model prices that you'd like to provide to a customer.\nOnce accepted, it will automatically create an invoice, subscription or subscription schedule.",
      identifier: "Stripequote",
    }),
);
export const Stripeaddress = Schema.StructWithRest(
  Schema.Struct({
    city: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "City, district, suburb, town, or village.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line1: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Address line 1, such as the street, PO Box, or company name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line2: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Address line 2, such as the apartment, suite, unit, or building.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    postal_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "ZIP or postal code." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    state: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "Address", description: "", identifier: "Stripeaddress" });
export const Stripelegal_entity_japan_address = Schema.StructWithRest(
  Schema.Struct({
    city: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "City/Ward." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line1: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Block/Building number." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line2: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Building details." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    postal_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "ZIP or postal code." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    state: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Prefecture." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    town: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Town/cho-me." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "LegalEntityJapanAddress",
  description: "",
  identifier: "Stripelegal_entity_japan_address",
});
export const Stripelegal_entity_directorship_declaration =
  Schema.StructWithRest(
    Schema.Struct({
      date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The Unix timestamp marking when the directorship declaration attestation was made.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      ip: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The IP address from which the directorship declaration attestation was made.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      user_agent: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The user-agent string from the browser where the directorship declaration attestation was made.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "LegalEntityDirectorshipDeclaration",
    description: "",
    identifier: "Stripelegal_entity_directorship_declaration",
  });
export const Stripelegal_entity_ubo_declaration = Schema.StructWithRest(
  Schema.Struct({
    date: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The Unix timestamp marking when the beneficial owner attestation was made.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    ip: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The IP address from which the beneficial owner attestation was made.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    user_agent: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The user-agent string from the browser where the beneficial owner attestation was made.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "LegalEntityUBODeclaration",
  description: "",
  identifier: "Stripelegal_entity_ubo_declaration",
});
export const Stripelegal_entity_registration_date = Schema.StructWithRest(
  Schema.Struct({
    day: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The day of registration, between 1 and 31.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    month: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The month of registration, between 1 and 12.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    year: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The four-digit year of registration.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "LegalEntityRegistrationDate",
  description: "",
  identifier: "Stripelegal_entity_registration_date",
});
export const Stripelegal_entity_representative_declaration =
  Schema.StructWithRest(
    Schema.Struct({
      date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The Unix timestamp marking when the representative declaration attestation was made.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      ip: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The IP address from which the representative declaration attestation was made.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      user_agent: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The user-agent string from the browser where the representative declaration attestation was made.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "LegalEntityRepresentativeDeclaration",
    description: "",
    identifier: "Stripelegal_entity_representative_declaration",
  });
export const Stripelegal_entity_company_verification_document = Schema.suspend(
  (): Schema.Codec<Stripelegal_entity_company_verification_document> =>
    Schema.StructWithRest(
      Schema.Struct({
        back: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "The back of a document returned by a [file upload](https://docs.stripe.com/api#create_file) with a `purpose` value of `additional_verification`. Note that `additional_verification` files are [not downloadable](/file-upload#uploading-a-file).",
            }),
            Schema.Null,
          ]),
        ),
        details: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A user-displayable string describing the verification state of this document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        details_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "One of `document_corrupt`, `document_expired`, `document_failed_copy`, `document_failed_greyscale`, `document_failed_other`, `document_failed_test_mode`, `document_fraudulent`, `document_incomplete`, `document_invalid`, `document_manipulated`, `document_not_readable`, `document_not_uploaded`, `document_type_not_supported`, or `document_too_large`. A machine-readable code specifying the verification state for this document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        front: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "The front of a document returned by a [file upload](https://docs.stripe.com/api#create_file) with a `purpose` value of `additional_verification`. Note that `additional_verification` files are [not downloadable](/file-upload#uploading-a-file).",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "LegalEntityCompanyVerificationDocument",
      description: "",
      identifier: "Stripelegal_entity_company_verification_document",
    }),
);
export const Stripecoupon_applies_to = Schema.StructWithRest(
  Schema.Struct({
    products: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({ description: "A list of product IDs this coupon applies to" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "AppliesTo",
  description: "",
  identifier: "Stripecoupon_applies_to",
});
export const Stripecoupon_currency_option = Schema.StructWithRest(
  Schema.Struct({
    amount_off: Schema.Number.annotate({
      description:
        "Amount (in the `currency` specified) that will be taken off the subtotal of any invoices for this customer.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "CouponCurrencyOption",
  description: "",
  identifier: "Stripecoupon_currency_option",
});
export const Stripepromotion_code_currency_option = Schema.StructWithRest(
  Schema.Struct({
    minimum_amount: Schema.Number.annotate({
      description:
        "Minimum amount required to redeem this Promotion Code into a Coupon (e.g., a purchase must be $100 or more to work).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PromotionCodeCurrencyOption",
  description: "",
  identifier: "Stripepromotion_code_currency_option",
});
export const Stripeapplication = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The name of the application.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("application").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Application",
  description: "",
  identifier: "Stripeapplication",
});
export const Stripeoffline_acceptance = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "offline_acceptance",
  description: "",
  identifier: "Stripeoffline_acceptance",
});
export const Stripeonline_acceptance = Schema.StructWithRest(
  Schema.Struct({
    ip_address: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The customer accepts the mandate from this IP address.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    user_agent: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The customer accepts the mandate using the user agent of the browser.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "online_acceptance",
  description: "",
  identifier: "Stripeonline_acceptance",
});
export const Stripemandate_multi_use = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Number.annotate({
        description: "The amount of the payment on a multi use mandate.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description: "The currency of the payment on a multi use mandate.",
        format: "currency",
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
  title: "mandate_multi_use",
  description: "",
  identifier: "Stripemandate_multi_use",
});
export const Stripemandate_acss_debit = Schema.StructWithRest(
  Schema.Struct({
    default_for: Schema.optionalKey(
      Schema.Array(Schema.Literals(["invoice", "subscription"])).annotate({
        description:
          "List of Stripe products where this mandate can be selected automatically.",
      }),
    ),
    interval_description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Description of the interval. Only required if the 'payment_schedule' parameter is 'interval' or 'combined'.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    payment_schedule: Schema.Literals([
      "combined",
      "interval",
      "sporadic",
    ]).annotate({ description: "Payment schedule for the mandate." }),
    transaction_type: Schema.Literals(["business", "personal"]).annotate({
      description: "Transaction type of the mandate.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_acss_debit",
  description: "",
  identifier: "Stripemandate_acss_debit",
});
export const Stripemandate_amazon_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_amazon_pay",
  description: "",
  identifier: "Stripemandate_amazon_pay",
});
export const Stripemandate_au_becs_debit = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String.annotate({
      description:
        "The URL of the mandate. This URL generally contains sensitive information about the customer and should be shared with them exclusively.",
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
  title: "mandate_au_becs_debit",
  description: "",
  identifier: "Stripemandate_au_becs_debit",
});
export const Stripemandate_bacs_debit = Schema.StructWithRest(
  Schema.Struct({
    display_name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The display name for the account on this mandate.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    network_status: Schema.Literals([
      "accepted",
      "pending",
      "refused",
      "revoked",
    ]).annotate({
      description:
        "The status of the mandate on the Bacs network. Can be one of `pending`, `revoked`, `refused`, or `accepted`.",
    }),
    reference: Schema.String.annotate({
      description:
        "The unique reference identifying the mandate on the Bacs network.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    revocation_reason: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "account_closed",
          "bank_account_restricted",
          "bank_ownership_changed",
          "could_not_process",
          "debit_not_authorized",
        ]).annotate({
          description:
            "When the mandate is revoked on the Bacs network this field displays the reason for the revocation.",
        }),
        Schema.Null,
      ]),
    ),
    service_user_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The service user number for the account on this mandate.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    url: Schema.String.annotate({
      description:
        "The URL that will contain the mandate that the customer has signed.",
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
  title: "mandate_bacs_debit",
  description: "",
  identifier: "Stripemandate_bacs_debit",
});
export const Stripemandate_blik = Schema.StructWithRest(
  Schema.Struct({
    expires_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Date at which the mandate expires.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    type: Schema.Literal("off_session").annotate({
      description: "Type of the mandate.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_blik",
  description: "",
  identifier: "Stripemandate_blik",
});
export const Stripemandate_cashapp = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_cashapp",
  description: "",
  identifier: "Stripemandate_cashapp",
});
export const Stripemandate_kakao_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_kakao_pay",
  description: "",
  identifier: "Stripemandate_kakao_pay",
});
export const Stripemandate_klarna = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_klarna",
  description: "",
  identifier: "Stripemandate_klarna",
});
export const Stripemandate_kr_card = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_kr_card",
  description: "",
  identifier: "Stripemandate_kr_card",
});
export const Stripemandate_link = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_link",
  description: "",
  identifier: "Stripemandate_link",
});
export const Stripemandate_naver_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_naver_pay",
  description: "",
  identifier: "Stripemandate_naver_pay",
});
export const Stripemandate_nz_bank_account = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_nz_bank_account",
  description: "",
  identifier: "Stripemandate_nz_bank_account",
});
export const Stripemandate_paypal = Schema.StructWithRest(
  Schema.Struct({
    billing_agreement_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The PayPal Billing Agreement ID (BAID). This is an ID generated by PayPal which represents the mandate between the merchant and the customer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    payer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "PayPal account PayerID. This identifier uniquely identifies the PayPal customer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_paypal",
  description: "",
  identifier: "Stripemandate_paypal",
});
export const Stripemandate_payto = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Amount that will be collected. It is required when `amount_type` is `fixed`.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    amount_type: Schema.Literals(["fixed", "maximum"]).annotate({
      description:
        "The type of amount that will be collected. The amount charged must be exact or up to the value of `amount` param for `fixed` or `maximum` type respectively. Defaults to `maximum`.",
    }),
    end_date: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Date, in YYYY-MM-DD format, after which payments will not be collected. Defaults to no end date.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    payment_schedule: Schema.Literals([
      "adhoc",
      "annual",
      "daily",
      "fortnightly",
      "monthly",
      "quarterly",
      "semi_annual",
      "weekly",
    ]).annotate({
      description:
        "The periodicity at which payments will be collected. Defaults to `adhoc`.",
    }),
    payments_per_period: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The number of payments that will be made during a payment period. Defaults to 1 except for when `payment_schedule` is `adhoc`. In that case, it defaults to no limit.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    purpose: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "dependant_support",
          "government",
          "loan",
          "mortgage",
          "other",
          "pension",
          "personal",
          "retail",
          "salary",
          "tax",
          "utility",
        ]).annotate({
          description:
            "The purpose for which payments are made. Has a default value based on your merchant category code.",
        }),
        Schema.Null,
      ]),
    ),
    start_date: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Date, in YYYY-MM-DD format, from which payments will be collected. Defaults to confirmation time.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_payto",
  description: "",
  identifier: "Stripemandate_payto",
});
export const Stripemandate_pix = Schema.StructWithRest(
  Schema.Struct({
    amount_includes_iof: Schema.optionalKey(
      Schema.Literals(["always", "never"]).annotate({
        description: "Determines if the amount includes the IOF tax.",
      }),
    ),
    amount_type: Schema.optionalKey(
      Schema.Literals(["fixed", "maximum"]).annotate({
        description: "Type of amount.",
      }),
    ),
    end_date: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Date when the mandate expires and no further payments will be charged, in `YYYY-MM-DD`.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    payment_schedule: Schema.optionalKey(
      Schema.Literals([
        "halfyearly",
        "monthly",
        "quarterly",
        "weekly",
        "yearly",
      ]).annotate({
        description: "Schedule at which the future payments will be charged.",
      }),
    ),
    reference: Schema.optionalKey(
      Schema.String.annotate({
        description: "Subscription name displayed to buyers in their bank app.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    start_date: Schema.optionalKey(
      Schema.String.annotate({
        description: "Start date of the mandate, in `YYYY-MM-DD`.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_pix",
  description: "",
  identifier: "Stripemandate_pix",
});
export const Stripemandate_revolut_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_revolut_pay",
  description: "",
  identifier: "Stripemandate_revolut_pay",
});
export const Stripemandate_sepa_debit = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.String.annotate({
      description: "The unique reference of the mandate.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    url: Schema.String.annotate({
      description:
        "The URL of the mandate. This URL generally contains sensitive information about the customer and should be shared with them exclusively.",
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
  title: "mandate_sepa_debit",
  description: "",
  identifier: "Stripemandate_sepa_debit",
});
export const Stripemandate_twint = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "mandate_twint",
  description: "",
  identifier: "Stripemandate_twint",
});
export const Stripemandate_upi = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Amount to be charged for future payments.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    amount_type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["fixed", "maximum"]).annotate({
          description:
            "One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.",
        }),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A description of the mandate or subscription that is meant to be displayed to the customer.",
        }).check(
          Schema.isMaxCodePoints(20).annotate({
            expected: "a string with at most 20 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    end_date: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "End date of the mandate or subscription.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_upi",
  description: "",
  identifier: "Stripemandate_upi",
});
export const Stripemandate_us_bank_account = Schema.StructWithRest(
  Schema.Struct({
    collection_method: Schema.optionalKey(
      Schema.Literal("paper").annotate({
        description: "Mandate collection method",
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
  title: "mandate_us_bank_account",
  description: "",
  identifier: "Stripemandate_us_bank_account",
});
export const Stripemandate_single_use = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "The amount of the payment on a single use mandate.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description: "The currency of the payment on a single use mandate.",
      format: "currency",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_single_use",
  description: "",
  identifier: "Stripemandate_single_use",
});
export const Stripethree_d_secure_details = Schema.StructWithRest(
  Schema.Struct({
    authentication_flow: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["challenge", "frictionless"]).annotate({
          description:
            "For authenticated transactions: how the customer was authenticated by\nthe issuing bank.",
        }),
        Schema.Null,
      ]),
    ),
    electronic_commerce_indicator: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["01", "02", "05", "06", "07"]).annotate({
          description:
            "The Electronic Commerce Indicator (ECI). A protocol-level field\nindicating what degree of authentication was performed.",
        }),
        Schema.Null,
      ]),
    ),
    result: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "attempt_acknowledged",
          "authenticated",
          "data_share_only",
          "exempted",
          "failed",
          "not_supported",
          "processing_error",
        ]).annotate({
          description: "Indicates the outcome of 3D Secure authentication.",
        }),
        Schema.Null,
      ]),
    ),
    result_reason: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "abandoned",
          "bypassed",
          "canceled",
          "card_not_enrolled",
          "network_not_supported",
          "protocol_error",
          "rejected",
        ]).annotate({
          description:
            "Additional information about why 3D Secure succeeded or failed based\non the `result`.",
        }),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The 3D Secure 1 XID or 3D Secure 2 Directory Server Transaction ID\n(dsTransId) for this payment.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    version: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["1.0.2", "2.1.0", "2.2.0", "2.3.0", "2.3.1"]).annotate(
          { description: "The version of 3D Secure that was used." },
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "three_d_secure_details",
  description: "",
  identifier: "Stripethree_d_secure_details",
});
export const Stripefee = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "Amount of the fee, in cents.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    application: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "ID of the Connect application that earned the fee.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "An arbitrary string attached to the object. Often useful for displaying to users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    type: Schema.String.annotate({
      description:
        "Type of the fee, one of: `application_fee`, `payment_method_passthrough_fee`, `stripe_fee`, `tax`, or `withheld_tax`.",
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
).annotate({ title: "Fee", description: "", identifier: "Stripefee" });
export const Stripeconnect_collection_transfer = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "Amount transferred, in cents (or local equivalent).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
    destination: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
    ]).annotate({
      description: "ID of the account that funds are being collected for.",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
    }),
    object: Schema.Literal("connect_collection_transfer").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ConnectCollectionTransfer",
  description: "",
  identifier: "Stripeconnect_collection_transfer",
});
export const Stripedestination_details_unimplemented = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "destination_details_unimplemented",
  description: "",
  identifier: "Stripedestination_details_unimplemented",
});
export const Stripeemail_sent = Schema.StructWithRest(
  Schema.Struct({
    email_sent_at: Schema.Number.annotate({
      description: "The timestamp when the email was sent.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    email_sent_to: Schema.String.annotate({
      description: "The recipient's email address.",
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
  title: "EmailSent",
  description: "",
  identifier: "Stripeemail_sent",
});
export const Stripedeleted_bank_account = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("bank_account").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedBankAccount",
  description: "",
  identifier: "Stripedeleted_bank_account",
});
export const Stripedeleted_card = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("card").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedCard",
  description: "",
  identifier: "Stripedeleted_card",
});
export const Stripereserve_transaction = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Int,
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "An arbitrary string attached to the object. Often useful for displaying to users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("reserve_transaction").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ReserveTransaction",
  description: "",
  identifier: "Stripereserve_transaction",
});
export const Stripetopup_resource_us_bank_account = Schema.StructWithRest(
  Schema.Struct({
    network: Schema.Literal("ach").annotate({
      description:
        "The US bank transfer network used for this top-up. The default is `ach`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "TopupResourceUSBankAccount",
  description: "",
  identifier: "Stripetopup_resource_us_bank_account",
});
export const Stripeplatform_earning_fee_source = Schema.StructWithRest(
  Schema.Struct({
    charge: Schema.optionalKey(
      Schema.String.annotate({
        description: "Charge ID that created this application fee.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    payout: Schema.optionalKey(
      Schema.String.annotate({
        description: "Payout ID that created this application fee.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    type: Schema.Literals(["charge", "payout"]).annotate({
      description: "Type of object that created the application fee.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PlatformEarningFeeSource",
  description: "",
  identifier: "Stripeplatform_earning_fee_source",
});
export const Striperadar_rule = Schema.StructWithRest(
  Schema.Struct({
    action: Schema.String.annotate({
      description: "The action taken on the payment.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    predicate: Schema.String.annotate({
      description: "The predicate to evaluate the payment against.",
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
  title: "RadarRule",
  description: "",
  identifier: "Striperadar.rule",
});
export const Stripethree_d_secure_details_charge = Schema.StructWithRest(
  Schema.Struct({
    authentication_flow: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["challenge", "frictionless"]).annotate({
          description:
            "For authenticated transactions: how the customer was authenticated by\nthe issuing bank.",
        }),
        Schema.Null,
      ]),
    ),
    electronic_commerce_indicator: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["01", "02", "05", "06", "07"]).annotate({
          description:
            "The Electronic Commerce Indicator (ECI). A protocol-level field\nindicating what degree of authentication was performed.",
        }),
        Schema.Null,
      ]),
    ),
    exemption_indicator: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["low_risk", "none"]).annotate({
          description:
            "The exemption requested via 3DS and accepted by the issuer at authentication time.",
        }),
        Schema.Null,
      ]),
    ),
    exemption_indicator_applied: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Whether Stripe requested the value of `exemption_indicator` in the transaction. This will depend on\nthe outcome of Stripe's internal risk assessment.",
      }),
    ),
    result: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "attempt_acknowledged",
          "authenticated",
          "data_share_only",
          "exempted",
          "failed",
          "not_supported",
          "processing_error",
        ]).annotate({
          description: "Indicates the outcome of 3D Secure authentication.",
        }),
        Schema.Null,
      ]),
    ),
    result_reason: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "abandoned",
          "bypassed",
          "canceled",
          "card_not_enrolled",
          "network_not_supported",
          "protocol_error",
          "rejected",
        ]).annotate({
          description:
            "Additional information about why 3D Secure succeeded or failed based\non the `result`.",
        }),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The 3D Secure 1 XID or 3D Secure 2 Directory Server Transaction ID\n(dsTransId) for this payment.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    version: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["1.0.2", "2.1.0", "2.2.0", "2.3.0", "2.3.1"]).annotate(
          { description: "The version of 3D Secure that was used." },
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "three_d_secure_details_charge",
  description: "",
  identifier: "Stripethree_d_secure_details_charge",
});
export const Stripeklarna_address = Schema.StructWithRest(
  Schema.Struct({
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The payer address country",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "klarna_address",
  description: "",
  identifier: "Stripeklarna_address",
});
export const Stripeinternal_card = Schema.StructWithRest(
  Schema.Struct({
    brand: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Brand of the card used in the transaction",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter ISO code representing the country of the card",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    exp_month: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Two digit number representing the card's expiration month",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    exp_year: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Two digit number representing the card's expiration year",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    last4: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The last 4 digits of the card",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "internal_card",
  description: "",
  identifier: "Stripeinternal_card",
});
export const Stripepaypal_seller_protection = Schema.StructWithRest(
  Schema.Struct({
    dispute_categories: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.Literals(["fraudulent", "product_not_received"]),
        ).annotate({
          description:
            "An array of conditions that are covered for the transaction, if applicable.",
        }),
        Schema.Null,
      ]),
    ),
    status: Schema.Literals([
      "eligible",
      "not_eligible",
      "partially_eligible",
    ]).annotate({
      description:
        "Indicates whether the transaction is eligible for PayPal's seller protection.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "paypal_seller_protection",
  description: "",
  identifier: "Stripepaypal_seller_protection",
});
export const Striperadar_radar_options = Schema.StructWithRest(
  Schema.Struct({
    session: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A [Radar Session](https://docs.stripe.com/radar/radar-session) is a snapshot of the browser metadata and device details that help Radar make more accurate predictions on your payments.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "RadarOption",
  description:
    "Options to configure Radar. See [Radar Session](https://docs.stripe.com/radar/radar-session) for more information.",
  identifier: "Striperadar_radar_options",
});
export const Striperadar_review_resource_location = Schema.StructWithRest(
  Schema.Struct({
    city: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The city where the payment originated.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter ISO code representing the country where the payment originated.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    latitude: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The geographic latitude where the payment originated.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
    longitude: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The geographic longitude where the payment originated.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
    region: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The state/county/province/region where the payment originated.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "RadarReviewResourceLocation",
  description: "",
  identifier: "Striperadar_review_resource_location",
});
export const Striperadar_review_resource_session = Schema.StructWithRest(
  Schema.Struct({
    browser: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The browser used in this browser session (e.g., `Chrome`).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    device: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Information about the device used for the browser session (e.g., `Samsung SM-G930T`).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    platform: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The platform for the browser session (e.g., `Macintosh`).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    version: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The version for the browser session (e.g., `61.0.3163.100`).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "RadarReviewResourceSession",
  description: "",
  identifier: "Striperadar_review_resource_session",
});
export const Stripesmor_resource_managed_payments = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean.annotate({
      description:
        "Set to `true` to enable [Managed Payments](https://docs.stripe.com/payments/managed-payments), Stripe's merchant of record solution, for this session.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "SmorResourceManagedPayments",
  description: "",
  identifier: "Stripesmor_resource_managed_payments",
});
export const Stripenetworks = Schema.StructWithRest(
  Schema.Struct({
    available: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "All networks available for selection via [payment_method_options.card.network](/api/payment_intents/confirm#confirm_payment_intent-payment_method_options-card-network).",
    }),
    preferred: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The preferred network for co-branded cards. Can be `cartes_bancaires`, `mastercard`, `visa` or `invalid_preference` if requested network is not valid for the card.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "networks",
  description: "",
  identifier: "Stripenetworks",
});
export const Stripethree_d_secure_usage = Schema.StructWithRest(
  Schema.Struct({
    supported: Schema.Boolean.annotate({
      description: "Whether 3D Secure is supported on this card.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "three_d_secure_usage",
  description: "",
  identifier: "Stripethree_d_secure_usage",
});
export const Stripecustom_logo = Schema.StructWithRest(
  Schema.Struct({
    content_type: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Content type of the Dashboard-only CustomPaymentMethodType logo.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    url: Schema.String.annotate({
      description: "URL of the Dashboard-only CustomPaymentMethodType logo.",
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
  title: "custom_logo",
  description: "",
  identifier: "Stripecustom_logo",
});
export const Stripeus_bank_account_networks = Schema.StructWithRest(
  Schema.Struct({
    preferred: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "The preferred network." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    supported: Schema.Array(
      Schema.Literals(["ach", "us_domestic_wire"]),
    ).annotate({ description: "All supported networks." }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "us_bank_account_networks",
  description: "",
  identifier: "Stripeus_bank_account_networks",
});
export const Stripedeleted_application = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The name of the application.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("application").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedApplication",
  description: "",
  identifier: "Stripedeleted_application",
});
export const Stripeconnect_account_reference = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
      ]).annotate({
        description:
          "The connected account being referenced when `type` is `account`.",
      }),
    ),
    type: Schema.Literals(["account", "self"]).annotate({
      description: "Type of the account referenced.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ConnectAccountReference",
  description: "",
  identifier: "Stripeconnect_account_reference",
});
export const Stripecustom_unit_amount = Schema.StructWithRest(
  Schema.Struct({
    maximum: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The maximum unit amount the customer can specify for this item.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    minimum: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The minimum unit amount the customer can specify for this item. Must be at least the minimum charge amount.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    preset: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The starting unit amount which can be updated by the customer.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "CustomUnitAmount",
  description: "",
  identifier: "Stripecustom_unit_amount",
});
export const Stripepackage_dimensions = Schema.StructWithRest(
  Schema.Struct({
    height: Schema.Number.annotate({ description: "Height, in inches." }).check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    length: Schema.Number.annotate({ description: "Length, in inches." }).check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    weight: Schema.Number.annotate({ description: "Weight, in ounces." }).check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    width: Schema.Number.annotate({ description: "Width, in inches." }).check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PackageDimensions",
  description: "",
  identifier: "Stripepackage_dimensions",
});
export const Stripedeleted_product = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("product").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedProduct",
  description: "",
  identifier: "Stripedeleted_product",
});
export const Striperecurring = Schema.StructWithRest(
  Schema.Struct({
    interval: Schema.Literals(["day", "month", "week", "year"]).annotate({
      description:
        "The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.",
    }),
    interval_count: Schema.Number.annotate({
      description:
        "The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    meter: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The meter tracking the usage of a metered price",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    usage_type: Schema.Literals(["licensed", "metered"]).annotate({
      description:
        "Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Recurring",
  description: "",
  identifier: "Striperecurring",
});
export const Stripetransform_quantity = Schema.StructWithRest(
  Schema.Struct({
    divide_by: Schema.Number.annotate({
      description: "Divide usage by this number.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    round: Schema.Literals(["down", "up"]).annotate({
      description: "After division, either round the result `up` or `down`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "TransformQuantity",
  description: "",
  identifier: "Stripetransform_quantity",
});
export const Stripefeedback_options_status_transitions = Schema.StructWithRest(
  Schema.Struct({
    deactivated_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The time the feedback option was deactivated, if any. Measured in seconds since Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "FeedbackOptionsStatusTransitions",
  description: "",
  identifier: "Stripefeedback_options_status_transitions",
});
export const Stripedeleted_tax_id = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("tax_id").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "deleted_tax_id",
  description: "",
  identifier: "Stripedeleted_tax_id",
});
export const Stripediscounts_resource_discount_amount = Schema.suspend(
  (): Schema.Codec<Stripediscounts_resource_discount_amount> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The amount, in cents (or local equivalent), of the discount.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        discount: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripediscount,
          Stripedeleted_discount,
        ]).annotate({
          description:
            "The discount that was applied to get this discount amount.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DiscountsResourceDiscountAmount",
      description: "",
      identifier: "Stripediscounts_resource_discount_amount",
    }),
);
export const Stripedeleted_invoice = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("invoice").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedInvoice",
  description: "",
  identifier: "Stripedeleted_invoice",
});
export const Stripeshipping_rate_delivery_estimate_bound =
  Schema.StructWithRest(
    Schema.Struct({
      unit: Schema.Literals([
        "business_day",
        "day",
        "hour",
        "month",
        "week",
      ]).annotate({ description: "A unit of time." }),
      value: Schema.Number.annotate({
        description: "Must be greater than 0.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "ShippingRateDeliveryEstimateBound",
    description: "",
    identifier: "Stripeshipping_rate_delivery_estimate_bound",
  });
export const Stripeshipping_rate_currency_option = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description:
        "A non-negative integer in cents representing how much to charge.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    tax_behavior: Schema.Literals([
      "exclusive",
      "inclusive",
      "unspecified",
    ]).annotate({
      description:
        "Specifies whether the rate is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ShippingRateCurrencyOption",
  description: "",
  identifier: "Stripeshipping_rate_currency_option",
});
export const Stripedeleted_price = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("price").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedPrice",
  description: "",
  identifier: "Stripedeleted_price",
});
export const Stripeperson_additional_tos_acceptance = Schema.StructWithRest(
  Schema.Struct({
    date: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The Unix timestamp marking when the legal guardian accepted the service agreement.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    ip: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The IP address from which the legal guardian accepted the service agreement.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    user_agent: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The user agent of the browser from which the legal guardian accepted the service agreement.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PersonAdditionalTOSAcceptance",
  description: "",
  identifier: "Stripeperson_additional_tos_acceptance",
});
export const Stripelegal_entity_dob = Schema.StructWithRest(
  Schema.Struct({
    day: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The day of birth, between 1 and 31.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    month: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The month of birth, between 1 and 12.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    year: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The four-digit year of birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "LegalEntityDOB",
  description: "",
  identifier: "Stripelegal_entity_dob",
});
export const Stripeperson_relationship = Schema.StructWithRest(
  Schema.Struct({
    authorizer: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "Whether the person is the authorizer of the account's representative.",
        }),
        Schema.Null,
      ]),
    ),
    director: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "Whether the person is a director of the account's legal entity. Directors are typically members of the governing board of the company, or responsible for ensuring the company meets its regulatory obligations.",
        }),
        Schema.Null,
      ]),
    ),
    executive: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "Whether the person has significant responsibility to control, manage, or direct the organization.",
        }),
        Schema.Null,
      ]),
    ),
    legal_guardian: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "Whether the person is the legal guardian of the account's representative.",
        }),
        Schema.Null,
      ]),
    ),
    owner: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "Whether the person is an owner of the account’s legal entity.",
        }),
        Schema.Null,
      ]),
    ),
    percent_ownership: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The percent owned by the person of the account's legal entity.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
    representative: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "Whether the person is authorized as the primary representative of the account. This is the person nominated by the business to provide information about themselves, and general information about the account. There can only be one representative at any given time. At the time the account is created, this person should be set to the person responsible for opening the account.",
        }),
        Schema.Null,
      ]),
    ),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The person's title (e.g., CEO, Support Engineer).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PersonRelationship",
  description: "",
  identifier: "Stripeperson_relationship",
});
export const Stripeperson_ethnicity_details = Schema.StructWithRest(
  Schema.Struct({
    ethnicity: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.Literals([
            "cuban",
            "hispanic_or_latino",
            "mexican",
            "not_hispanic_or_latino",
            "other_hispanic_or_latino",
            "prefer_not_to_answer",
            "puerto_rican",
          ]),
        ).annotate({ description: "The persons ethnicity" }),
        Schema.Null,
      ]),
    ),
    ethnicity_other: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Please specify your origin, when other is selected.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PersonEthnicityDetails",
  description: "",
  identifier: "Stripeperson_ethnicity_details",
});
export const Stripeperson_race_details = Schema.StructWithRest(
  Schema.Struct({
    race: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.Literals([
            "african_american",
            "american_indian_or_alaska_native",
            "asian",
            "asian_indian",
            "black_or_african_american",
            "chinese",
            "ethiopian",
            "filipino",
            "guamanian_or_chamorro",
            "haitian",
            "jamaican",
            "japanese",
            "korean",
            "native_hawaiian",
            "native_hawaiian_or_other_pacific_islander",
            "nigerian",
            "other_asian",
            "other_black_or_african_american",
            "other_pacific_islander",
            "prefer_not_to_answer",
            "samoan",
            "somali",
            "vietnamese",
            "white",
          ]),
        ).annotate({ description: "The persons race." }),
        Schema.Null,
      ]),
    ),
    race_other: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Please specify your race, when other is selected.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PersonRaceDetails",
  description: "",
  identifier: "Stripeperson_race_details",
});
export const Stripelegal_entity_person_verification_document = Schema.suspend(
  (): Schema.Codec<Stripelegal_entity_person_verification_document> =>
    Schema.StructWithRest(
      Schema.Struct({
        back: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "The back of an ID returned by a [file upload](https://docs.stripe.com/api#create_file) with a `purpose` value of `identity_document`.",
            }),
            Schema.Null,
          ]),
        ),
        details: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                'A user-displayable string describing the verification state of this document. For example, if a document is uploaded and the picture is too fuzzy, this may say "Identity document is too unclear to read".',
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        details_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "One of `document_corrupt`, `document_country_not_supported`, `document_expired`, `document_failed_copy`, `document_failed_other`, `document_failed_test_mode`, `document_fraudulent`, `document_failed_greyscale`, `document_incomplete`, `document_invalid`, `document_manipulated`, `document_missing_back`, `document_missing_front`, `document_not_readable`, `document_not_uploaded`, `document_photo_mismatch`, `document_too_large`, or `document_type_not_supported`. A machine-readable code specifying the verification state for this document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        front: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "The front of an ID returned by a [file upload](https://docs.stripe.com/api#create_file) with a `purpose` value of `identity_document`.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "LegalEntityPersonVerificationDocument",
      description: "",
      identifier: "Stripelegal_entity_person_verification_document",
    }),
);
export const Stripeerror = Schema.suspend(
  (): Schema.Codec<Stripeerror> =>
    Schema.StructWithRest(Schema.Struct({ error: Stripeapi_errors }), [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ]).annotate({
      description: "An error response from the Stripe API",
      identifier: "Stripeerror",
    }),
);
export const Stripedeleted_account = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("account").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedAccount",
  description: "",
  identifier: "Stripedeleted_account",
});
export const Stripeexternal_account = Schema.suspend(
  (): Schema.Codec<Stripeexternal_account> =>
    Schema.Union([Stripebank_account, Stripecard]).annotate({
      title: "Polymorphic",
      identifier: "Stripeexternal_account",
    }),
);
export const Stripelogin_link = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    object: Schema.Literal("login_link").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    url: Schema.String.annotate({
      description: "The URL for the login link.",
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
  title: "Login Link",
  description:
    "Login Links are single-use URLs that takes an Express account to the login page for their Stripe dashboard.\nA Login Link differs from an [Account Link](https://docs.stripe.com/api/account_links) in that it takes the user directly to their [Express dashboard for the specified account](https://docs.stripe.com/connect/integrate-express-dashboard#create-login-link)",
  identifier: "Stripelogin_link",
});
export const Stripedeleted_person = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("person").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedPerson",
  description: "",
  identifier: "Stripedeleted_person",
});
export const Stripeapple_pay_domain = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    domain_name: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
    }),
    object: Schema.Literal("apple_pay_domain").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ApplePayDomain",
  description: "",
  identifier: "Stripeapple_pay_domain",
});
export const Stripedeleted_apple_pay_domain = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("apple_pay_domain").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedApplePayDomain",
  description: "",
  identifier: "Stripedeleted_apple_pay_domain",
});
export const Stripeapp_service_resource_install_content_security_policy =
  Schema.StructWithRest(
    Schema.Struct({
      connect_src: Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description: "The URLs that the app can make network requests to.",
      }),
      image_src: Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description: "The URLs that the app can load images from.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "AppServiceResourceInstallContentSecurityPolicy",
    description: "",
    identifier: "Stripeapp_service_resource_install_content_security_policy",
  });
export const Stripethresholds_resource_usage_alert_filter = Schema.suspend(
  (): Schema.Codec<Stripethresholds_resource_usage_alert_filter> =>
    Schema.StructWithRest(
      Schema.Struct({
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecustomer,
            ]).annotate({
              description: "Limit the scope of the alert to this customer ID",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literal("customer"),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ThresholdsResourceUsageAlertFilter",
      description: "",
      identifier: "Stripethresholds_resource_usage_alert_filter",
    }),
);
export const Stripeline_items_adjustable_quantity = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean,
    maximum: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
    minimum: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "LineItemsAdjustableQuantity",
  description: "",
  identifier: "Stripeline_items_adjustable_quantity",
});
export const Stripeline_items_discount_amount = Schema.suspend(
  (): Schema.Codec<Stripeline_items_discount_amount> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "The amount discounted.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        discount: Stripediscount,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "LineItemsDiscountAmount",
      description: "",
      identifier: "Stripeline_items_discount_amount",
    }),
);
export const Stripecheckout_acss_debit_mandate_options = Schema.StructWithRest(
  Schema.Struct({
    custom_mandate_url: Schema.optionalKey(
      Schema.String.annotate({
        description: "A URL for custom mandate text",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    default_for: Schema.optionalKey(
      Schema.Array(Schema.Literals(["invoice", "subscription"])).annotate({
        description:
          "List of Stripe products where this mandate can be selected automatically. Returned when the Session is in `setup` mode.",
      }),
    ),
    interval_description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Description of the interval. Only required if the 'payment_schedule' parameter is 'interval' or 'combined'.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    payment_schedule: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["combined", "interval", "sporadic"]).annotate({
          description: "Payment schedule for the mandate.",
        }),
        Schema.Null,
      ]),
    ),
    transaction_type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["business", "personal"]).annotate({
          description: "Transaction type of the mandate.",
        }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "CheckoutAcssDebitMandateOptions",
  description: "",
  identifier: "Stripecheckout_acss_debit_mandate_options",
});
export const Stripecheckout_affirm_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutAffirmPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_affirm_payment_method_options",
  });
export const Stripecheckout_afterpay_clearpay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutAfterpayClearpayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_afterpay_clearpay_payment_method_options",
  });
export const Stripecheckout_alipay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutAlipayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_alipay_payment_method_options",
  });
export const Stripecheckout_alma_payment_method_options = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
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
  title: "CheckoutAlmaPaymentMethodOptions",
  description: "",
  identifier: "Stripecheckout_alma_payment_method_options",
});
export const Stripecheckout_amazon_pay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutAmazonPayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_amazon_pay_payment_method_options",
  });
export const Stripecheckout_au_becs_debit_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
        }),
      ),
      target_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Controls when Stripe will attempt to debit the funds from the customer's account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "CheckoutAuBecsDebitPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_au_becs_debit_payment_method_options",
  });
export const Stripecheckout_payment_method_options_mandate_options_bacs_debit =
  Schema.StructWithRest(
    Schema.Struct({
      reference_prefix: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: '/', '_', '-', '&', '.'. Cannot begin with 'DDIC' or 'STRIPE'.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "checkout_payment_method_options_mandate_options_bacs_debit",
    description: "",
    identifier:
      "Stripecheckout_payment_method_options_mandate_options_bacs_debit",
  });
export const Stripecheckout_bancontact_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutBancontactPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_bancontact_payment_method_options",
  });
export const Stripecheckout_billie_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
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
    title: "CheckoutBilliePaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_billie_payment_method_options",
  });
export const Stripecheckout_boleto_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      expires_after_days: Schema.Number.annotate({
        description:
          "The number of calendar days before a Boleto voucher expires. For example, if you create a Boleto voucher on Monday and you set expires_after_days to 2, the Boleto voucher will expire on Wednesday at 23:59 America/Sao_Paulo time.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session", "on_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutBoletoPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_boleto_payment_method_options",
  });
export const Stripecheckout_card_installments_options = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.optionalKey(
      Schema.Boolean.annotate({
        description: "Indicates if installments are enabled",
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
  title: "CheckoutCardInstallmentsOptions",
  description: "",
  identifier: "Stripecheckout_card_installments_options",
});
export const Stripecheckout_cashapp_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutCashappPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_cashapp_payment_method_options",
  });
export const Stripecheckout_eps_payment_method_options = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "CheckoutEpsPaymentMethodOptions",
  description: "",
  identifier: "Stripecheckout_eps_payment_method_options",
});
export const Stripecheckout_fpx_payment_method_options = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "CheckoutFpxPaymentMethodOptions",
  description: "",
  identifier: "Stripecheckout_fpx_payment_method_options",
});
export const Stripecheckout_giropay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutGiropayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_giropay_payment_method_options",
  });
export const Stripecheckout_grab_pay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutGrabPayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_grab_pay_payment_method_options",
  });
export const Stripecheckout_ideal_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutIdealPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_ideal_payment_method_options",
  });
export const Stripecheckout_kakao_pay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutKakaoPayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_kakao_pay_payment_method_options",
  });
export const Stripecheckout_klarna_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session", "on_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutKlarnaPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_klarna_payment_method_options",
  });
export const Stripecheckout_konbini_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      expires_after_days: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The number of calendar days (between 1 and 60) after which Konbini payment instructions will expire. For example, if a PaymentIntent is confirmed with Konbini and `expires_after_days` set to 2 on Monday JST, the instructions will expire on Wednesday 23:59:59 JST.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutKonbiniPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_konbini_payment_method_options",
  });
export const Stripecheckout_kr_card_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutKrCardPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_kr_card_payment_method_options",
  });
export const Stripecheckout_link_payment_method_options = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "CheckoutLinkPaymentMethodOptions",
  description: "",
  identifier: "Stripecheckout_link_payment_method_options",
});
export const Stripecheckout_mobilepay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutMobilepayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_mobilepay_payment_method_options",
  });
export const Stripecheckout_multibanco_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutMultibancoPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_multibanco_payment_method_options",
  });
export const Stripecheckout_naver_pay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutNaverPayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_naver_pay_payment_method_options",
  });
export const Stripecheckout_oxxo_payment_method_options = Schema.StructWithRest(
  Schema.Struct({
    expires_after_days: Schema.Number.annotate({
      description:
        "The number of calendar days before an OXXO invoice expires. For example, if you create an OXXO invoice on Monday and you set expires_after_days to 2, the OXXO invoice will expire on Wednesday at 23:59 America/Mexico_City time.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "CheckoutOxxoPaymentMethodOptions",
  description: "",
  identifier: "Stripecheckout_oxxo_payment_method_options",
});
export const Stripecheckout_p24_payment_method_options = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "CheckoutP24PaymentMethodOptions",
  description: "",
  identifier: "Stripecheckout_p24_payment_method_options",
});
export const Stripecheckout_payco_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutPaycoPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_payco_payment_method_options",
  });
export const Stripecheckout_paynow_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutPaynowPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_paynow_payment_method_options",
  });
export const Stripecheckout_paypal_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      preferred_locale: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Preferred locale of the PayPal checkout page that the customer is redirected to.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A reference of the PayPal transaction visible to customer which is mapped to PayPal's invoice ID. This must be a globally unique ID if you have configured in your PayPal settings to block multiple payments per invoice ID.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutPaypalPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_paypal_payment_method_options",
  });
export const Stripemandate_options_payto = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Amount that will be collected. It is required when `amount_type` is `fixed`.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    amount_type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["fixed", "maximum"]).annotate({
          description:
            "The type of amount that will be collected. The amount charged must be exact or up to the value of `amount` param for `fixed` or `maximum` type respectively. Defaults to `maximum`.",
        }),
        Schema.Null,
      ]),
    ),
    end_date: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Date, in YYYY-MM-DD format, after which payments will not be collected. Defaults to no end date.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    payment_schedule: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "adhoc",
          "annual",
          "daily",
          "fortnightly",
          "monthly",
          "quarterly",
          "semi_annual",
          "weekly",
        ]).annotate({
          description:
            "The periodicity at which payments will be collected. Defaults to `adhoc`.",
        }),
        Schema.Null,
      ]),
    ),
    payments_per_period: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The number of payments that will be made during a payment period. Defaults to 1 except for when `payment_schedule` is `adhoc`. In that case, it defaults to no limit.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    purpose: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "dependant_support",
          "government",
          "loan",
          "mortgage",
          "other",
          "pension",
          "personal",
          "retail",
          "salary",
          "tax",
          "utility",
        ]).annotate({
          description:
            "The purpose for which payments are made. Has a default value based on your merchant category code.",
        }),
        Schema.Null,
      ]),
    ),
    start_date: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Date, in YYYY-MM-DD format, from which payments will be collected. Defaults to confirmation time.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_options_payto",
  description: "",
  identifier: "Stripemandate_options_payto",
});
export const Stripecheckout_revolut_pay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutRevolutPayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_revolut_pay_payment_method_options",
  });
export const Stripecheckout_samsung_pay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutSamsungPayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_samsung_pay_payment_method_options",
  });
export const Stripecheckout_satispay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
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
    title: "CheckoutSatispayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_satispay_payment_method_options",
  });
export const Stripecheckout_scalapay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
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
    title: "CheckoutScalapayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_scalapay_payment_method_options",
  });
export const Stripecheckout_payment_method_options_mandate_options_sepa_debit =
  Schema.StructWithRest(
    Schema.Struct({
      reference_prefix: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Prefix used to generate the Mandate reference. Must be at most 12 characters long. Must consist of only uppercase letters, numbers, spaces, or the following special characters: '/', '_', '-', '&', '.'. Cannot begin with 'STRIPE'.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "checkout_payment_method_options_mandate_options_sepa_debit",
    description: "",
    identifier:
      "Stripecheckout_payment_method_options_mandate_options_sepa_debit",
  });
export const Stripecheckout_sequra_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
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
    title: "CheckoutSequraPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_sequra_payment_method_options",
  });
export const Stripecheckout_sofort_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutSofortPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_sofort_payment_method_options",
  });
export const Stripecheckout_sunbit_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutSunbitPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_sunbit_payment_method_options",
  });
export const Stripecheckout_swish_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The order reference that will be displayed to customers in the Swish application. Defaults to the `id` of the Payment Intent.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "CheckoutSwishPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_swish_payment_method_options",
  });
export const Stripecheckout_twint_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      setup_future_usage: Schema.optionalKey(
        Schema.Literals(["none", "off_session"]).annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutTwintPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_twint_payment_method_options",
  });
export const Stripemandate_options_upi = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Amount to be charged for future payments.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    amount_type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["fixed", "maximum"]).annotate({
          description:
            "One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.",
        }),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A description of the mandate or subscription that is meant to be displayed to the customer.",
        }).check(
          Schema.isMaxCodePoints(20).annotate({
            expected: "a string with at most 20 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    end_date: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "End date of the mandate or subscription.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "mandate_options_upi",
  description: "",
  identifier: "Stripemandate_options_upi",
});
export const Stripecheckout_financial_connections_payment_method_options_filters =
  Schema.StructWithRest(
    Schema.Struct({
      account_subcategories: Schema.optionalKey(
        Schema.Array(Schema.Literals(["checking", "savings"])).annotate({
          description:
            "The account subcategories to use to filter for possible accounts to link. Valid subcategories are `checking` and `savings`.",
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
    title: "CheckoutFinancialConnectionsPaymentMethodOptionsFilters",
    description: "",
    identifier:
      "Stripecheckout_financial_connections_payment_method_options_filters",
  });
export const Stripecheckout_wechat_pay_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      app_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The app ID registered with WeChat Pay. Only required when client is iOS or Android.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      client: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["android", "ios", "web"]).annotate({
            description: "The client type that the end customer will pay from",
          }),
          Schema.Null,
        ]),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "CheckoutWechatPayPaymentMethodOptions",
    description: "",
    identifier: "Stripecheckout_wechat_pay_payment_method_options",
  });
export const Stripecheckout_link_wallet_options = Schema.StructWithRest(
  Schema.Struct({
    display: Schema.optionalKey(
      Schema.Literals(["auto", "never"]).annotate({
        description:
          "Describes whether Checkout should display Link. Defaults to `auto`.",
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
  title: "CheckoutLinkWalletOptions",
  description: "",
  identifier: "Stripecheckout_link_wallet_options",
});
export const Stripeclimate_removals_beneficiary = Schema.StructWithRest(
  Schema.Struct({
    public_name: Schema.String.annotate({
      description:
        "Publicly displayable name for the end beneficiary of carbon removal.",
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
  title: "ClimateRemovalsBeneficiary",
  description: "",
  identifier: "Stripeclimate_removals_beneficiary",
});
export const Stripeclimate_removals_location = Schema.StructWithRest(
  Schema.Struct({
    city: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The city where the supplier is located.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.String.annotate({
      description:
        "Two-letter ISO code representing the country where the supplier is located.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    latitude: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The geographic latitude where the supplier is located.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
    longitude: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The geographic longitude where the supplier is located.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
    region: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The state/county/province/region where the supplier is located.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ClimateRemovalsLocation",
  description: "",
  identifier: "Stripeclimate_removals_location",
});
export const Stripeclimate_removals_products_price = Schema.StructWithRest(
  Schema.Struct({
    amount_fees: Schema.Number.annotate({
      description:
        "Fees for one metric ton of carbon removal in the currency's smallest unit.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    amount_subtotal: Schema.Number.annotate({
      description:
        "Subtotal for one metric ton of carbon removal (excluding fees) in the currency's smallest unit.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    amount_total: Schema.Number.annotate({
      description:
        "Total for one metric ton of carbon removal (including fees) in the currency's smallest unit.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ClimateRemovalsProductsPrice",
  description: "",
  identifier: "Stripeclimate_removals_products_price",
});
export const Stripedeleted_coupon = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("coupon").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedCoupon",
  description: "",
  identifier: "Stripedeleted_coupon",
});
export const Stripecredit_notes_pretax_credit_amount = Schema.suspend(
  (): Schema.Codec<Stripecredit_notes_pretax_credit_amount> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The amount, in cents (or local equivalent), of the pretax credit amount.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        credit_balance_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripebilling_credit_balance_transaction,
          ]).annotate({
            description:
              "The credit balance transaction that was applied to get this pretax credit amount.",
          }),
        ),
        discount: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripediscount,
            Stripedeleted_discount,
          ]).annotate({
            description:
              "The discount that was applied to get this pretax credit amount.",
          }),
        ),
        type: Schema.Literals([
          "credit_balance_transaction",
          "discount",
        ]).annotate({
          description: "Type of the pretax credit amount referenced.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CreditNotesPretaxCreditAmount",
      description: "",
      identifier: "Stripecredit_notes_pretax_credit_amount",
    }),
);
export const Stripecredit_notes_payment_record_refund = Schema.StructWithRest(
  Schema.Struct({
    payment_record: Schema.String.annotate({
      description: "ID of the payment record.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    refund_group: Schema.String.annotate({
      description: "ID of the refund group.",
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
  title: "CreditNotesPaymentRecordRefund",
  description: "",
  identifier: "Stripecredit_notes_payment_record_refund",
});
export const Stripeentitlements_feature = Schema.StructWithRest(
  Schema.Struct({
    active: Schema.Boolean.annotate({
      description:
        "Inactive features cannot be attached to new products and will not be returned from the features list endpoint.",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
    }),
    lookup_key: Schema.String.annotate({
      description:
        "A unique key you provide as your own system identifier. This may be up to 80 characters.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    metadata: Schema.Record(
      Schema.String,
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
    name: Schema.String.annotate({
      description:
        "The feature's name, for your own purpose, not meant to be displayable to the customer.",
    }).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
    object: Schema.Literal("entitlements.feature").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Feature",
  description:
    "A feature represents a monetizable ability or functionality in your system.\nFeatures can be assigned to products, and when those products are purchased, Stripe will create an entitlement to the feature for the purchasing customer.",
  identifier: "Stripeentitlements.feature",
});
export const Stripefinancial_connections_account_owner = Schema.StructWithRest(
  Schema.Struct({
    email: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The email address of the owner.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    name: Schema.String.annotate({
      description: "The full name of the owner.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("financial_connections.account_owner").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    ownership: Schema.String.annotate({
      description: "The ownership object that this owner belongs to.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    phone: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The raw phone number of the owner.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    raw_address: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The raw physical address of the owner.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    refreshed_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The timestamp of the refresh that updated this owner.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Account Owner",
  description: "Describes an owner of an account.",
  identifier: "Stripefinancial_connections.account_owner",
});
export const Stripeforwarded_request_context = Schema.StructWithRest(
  Schema.Struct({
    destination_duration: Schema.Number.annotate({
      description:
        "The time it took in milliseconds for the destination endpoint to respond.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    destination_ip_address: Schema.String.annotate({
      description: "The IP address of the destination.",
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
  title: "ForwardedRequestContext",
  description: "Metadata about the forwarded request.",
  identifier: "Stripeforwarded_request_context",
});
export const Stripeforwarded_request_header = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String.annotate({ description: "The header name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    value: Schema.String.annotate({ description: "The header value." }).check(
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
  title: "ForwardedRequestHeader",
  description: "Header data.",
  identifier: "Stripeforwarded_request_header",
});
export const Stripegelato_session_last_error = Schema.StructWithRest(
  Schema.Struct({
    code: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "abandoned",
          "consent_declined",
          "country_not_supported",
          "device_not_supported",
          "document_expired",
          "document_type_not_supported",
          "document_unverified_other",
          "email_unverified_other",
          "email_verification_declined",
          "id_number_insufficient_document_data",
          "id_number_mismatch",
          "id_number_unverified_other",
          "phone_unverified_other",
          "phone_verification_declined",
          "selfie_document_missing_photo",
          "selfie_face_mismatch",
          "selfie_manipulated",
          "selfie_unverified_other",
          "under_supported_age",
        ]).annotate({
          description:
            "A short machine-readable string giving the reason for the verification or user-session failure.",
        }),
        Schema.Null,
      ]),
    ),
    reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A message that explains the reason for verification or user-session failure.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "SessionLastError",
  description: "Shows last VerificationSession error",
  identifier: "Stripegelato_session_last_error",
});
export const Stripegelato_data_document_report_date_of_birth =
  Schema.StructWithRest(
    Schema.Struct({
      day: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Numerical day between 1 and 31.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      month: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Numerical month between 1 and 12.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      year: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ description: "The four-digit year." }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Date",
    description: "Point in Time",
    identifier: "Stripegelato_data_document_report_date_of_birth",
  });
export const Stripegelato_document_report_error = Schema.StructWithRest(
  Schema.Struct({
    code: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "document_expired",
          "document_type_not_supported",
          "document_unverified_other",
        ]).annotate({
          description:
            "A short machine-readable string giving the reason for the verification failure.",
        }),
        Schema.Null,
      ]),
    ),
    reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A human-readable message giving the reason for the failure. These messages can be shown to your users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "GelatoDocumentReportError",
  description: "",
  identifier: "Stripegelato_document_report_error",
});
export const Stripegelato_data_document_report_expiration_date =
  Schema.StructWithRest(
    Schema.Struct({
      day: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Numerical day between 1 and 31.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      month: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Numerical month between 1 and 12.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      year: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ description: "The four-digit year." }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Date",
    description: "Point in Time",
    identifier: "Stripegelato_data_document_report_expiration_date",
  });
export const Stripegelato_data_document_report_issued_date =
  Schema.StructWithRest(
    Schema.Struct({
      day: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Numerical day between 1 and 31.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      month: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Numerical month between 1 and 12.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      year: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ description: "The four-digit year." }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Date",
    description: "Point in Time",
    identifier: "Stripegelato_data_document_report_issued_date",
  });
export const Stripegelato_email_report_error = Schema.StructWithRest(
  Schema.Struct({
    code: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "email_unverified_other",
          "email_verification_declined",
        ]).annotate({
          description:
            "A short machine-readable string giving the reason for the verification failure.",
        }),
        Schema.Null,
      ]),
    ),
    reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A human-readable message giving the reason for the failure. These messages can be shown to your users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "GelatoEmailReportError",
  description: "",
  identifier: "Stripegelato_email_report_error",
});
export const Stripegelato_data_id_number_report_date = Schema.StructWithRest(
  Schema.Struct({
    day: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Numerical day between 1 and 31.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    month: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Numerical month between 1 and 12.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    year: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ description: "The four-digit year." }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Date",
  description: "Point in Time",
  identifier: "Stripegelato_data_id_number_report_date",
});
export const Stripegelato_id_number_report_error = Schema.StructWithRest(
  Schema.Struct({
    code: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "id_number_insufficient_document_data",
          "id_number_mismatch",
          "id_number_unverified_other",
        ]).annotate({
          description:
            "A short machine-readable string giving the reason for the verification failure.",
        }),
        Schema.Null,
      ]),
    ),
    reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A human-readable message giving the reason for the failure. These messages can be shown to your users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "GelatoIdNumberReportError",
  description: "",
  identifier: "Stripegelato_id_number_report_error",
});
export const Stripegelato_report_document_options = Schema.StructWithRest(
  Schema.Struct({
    allowed_types: Schema.optionalKey(
      Schema.Array(
        Schema.Literals(["driving_license", "id_card", "passport"]),
      ).annotate({
        description:
          "Array of strings of allowed identity document types. If the provided identity document isn’t one of the allowed types, the verification check will fail with a document_type_not_allowed error code.",
      }),
    ),
    require_id_number: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Collect an ID number and perform an [ID number check](https://docs.stripe.com/identity/verification-checks?type=id-number) with the document’s extracted name and date of birth.",
      }),
    ),
    require_live_capture: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Disable image uploads, identity document images have to be captured using the device’s camera.",
      }),
    ),
    require_matching_selfie: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Capture a face image and perform a [selfie check](https://docs.stripe.com/identity/verification-checks?type=selfie) comparing a photo ID and a picture of your user’s face. [Learn more](https://docs.stripe.com/identity/selfie).",
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
  title: "GelatoReportDocumentOptions",
  description: "",
  identifier: "Stripegelato_report_document_options",
});
export const Stripegelato_report_id_number_options = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "GelatoReportIdNumberOptions",
  description: "",
  identifier: "Stripegelato_report_id_number_options",
});
export const Stripegelato_phone_report_error = Schema.StructWithRest(
  Schema.Struct({
    code: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "phone_unverified_other",
          "phone_verification_declined",
        ]).annotate({
          description:
            "A short machine-readable string giving the reason for the verification failure.",
        }),
        Schema.Null,
      ]),
    ),
    reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A human-readable message giving the reason for the failure. These messages can be shown to your users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "GelatoPhoneReportError",
  description: "",
  identifier: "Stripegelato_phone_report_error",
});
export const Stripegelato_selfie_report_error = Schema.StructWithRest(
  Schema.Struct({
    code: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "selfie_document_missing_photo",
          "selfie_face_mismatch",
          "selfie_manipulated",
          "selfie_unverified_other",
        ]).annotate({
          description:
            "A short machine-readable string giving the reason for the verification failure.",
        }),
        Schema.Null,
      ]),
    ),
    reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A human-readable message giving the reason for the failure. These messages can be shown to your users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "GelatoSelfieReportError",
  description: "",
  identifier: "Stripegelato_selfie_report_error",
});
export const Stripegelato_session_document_options = Schema.StructWithRest(
  Schema.Struct({
    allowed_types: Schema.optionalKey(
      Schema.Array(
        Schema.Literals(["driving_license", "id_card", "passport"]),
      ).annotate({
        description:
          "Array of strings of allowed identity document types. If the provided identity document isn’t one of the allowed types, the verification check will fail with a document_type_not_allowed error code.",
      }),
    ),
    require_id_number: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Collect an ID number and perform an [ID number check](https://docs.stripe.com/identity/verification-checks?type=id-number) with the document’s extracted name and date of birth.",
      }),
    ),
    require_live_capture: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Disable image uploads, identity document images have to be captured using the device’s camera.",
      }),
    ),
    require_matching_selfie: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Capture a face image and perform a [selfie check](https://docs.stripe.com/identity/verification-checks?type=selfie) comparing a photo ID and a picture of your user’s face. [Learn more](https://docs.stripe.com/identity/selfie).",
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
  title: "GelatoSessionDocumentOptions",
  description: "",
  identifier: "Stripegelato_session_document_options",
});
export const Stripegelato_session_email_options = Schema.StructWithRest(
  Schema.Struct({
    require_verification: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Request one time password verification of `provided_details.email`.",
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
  title: "GelatoSessionEmailOptions",
  description: "",
  identifier: "Stripegelato_session_email_options",
});
export const Stripegelato_session_id_number_options = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "GelatoSessionIdNumberOptions",
  description: "",
  identifier: "Stripegelato_session_id_number_options",
});
export const Stripegelato_session_matching_options = Schema.StructWithRest(
  Schema.Struct({
    dob: Schema.optionalKey(
      Schema.Literals(["none", "similar"]).annotate({
        description: "Strictness of the DOB matching policy to apply.",
      }),
    ),
    name: Schema.optionalKey(
      Schema.Literals(["none", "similar"]).annotate({
        description: "Strictness of the name matching policy to apply.",
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
  title: "GelatoSessionMatchingOptions",
  description: "",
  identifier: "Stripegelato_session_matching_options",
});
export const Stripegelato_session_phone_options = Schema.StructWithRest(
  Schema.Struct({
    require_verification: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Request one time password verification of `provided_details.phone`.",
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
  title: "GelatoSessionPhoneOptions",
  description: "",
  identifier: "Stripegelato_session_phone_options",
});
export const Stripegelato_provided_details = Schema.StructWithRest(
  Schema.Struct({
    email: Schema.optionalKey(
      Schema.String.annotate({
        description: "Email of user being verified",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    phone: Schema.optionalKey(
      Schema.String.annotate({
        description: "Phone number of user being verified",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "GelatoProvidedDetails",
  description: "",
  identifier: "Stripegelato_provided_details",
});
export const Stripeverification_session_redaction = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literals(["processing", "redacted", "validated"]).annotate({
      description:
        "Indicates whether this object and its related objects have been redacted or not.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "verification_session_redaction",
  description: "",
  identifier: "Stripeverification_session_redaction",
});
export const Stripegelato_related_person = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.String.annotate({
      description:
        "Token referencing the associated Account of the related Person resource.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    person: Schema.String.annotate({
      description: "Token referencing the related Person resource.",
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
  title: "GelatoRelatedPerson",
  description: "",
  identifier: "Stripegelato_related_person",
});
export const Stripegelato_data_verified_outputs_date = Schema.StructWithRest(
  Schema.Struct({
    day: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Numerical day between 1 and 31.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    month: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Numerical month between 1 and 12.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    year: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ description: "The four-digit year." }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Date",
  description: "Point in Time",
  identifier: "Stripegelato_data_verified_outputs_date",
});
export const Stripeinvoicing_rule = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("defer_until_credited_items_resolved").annotate({
      description: "The type of invoicing rule.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "InvoicingRule",
  description: "",
  identifier: "Stripeinvoicing_rule",
});
export const Stripecredited_items_invoice_line_items = Schema.StructWithRest(
  Schema.Struct({
    invoice: Schema.String.annotate({
      description: "The invoice id for the debited line item(s).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    invoice_line_items: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "IDs of the debited invoice line item(s) on the invoice that correspond to the credit proration.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "CreditedItemsInvoiceLineItems",
  description: "",
  identifier: "Stripecredited_items_invoice_line_items",
});
export const Stripedeleted_invoiceitem = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("invoiceitem").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedInvoiceItem",
  description: "",
  identifier: "Stripedeleted_invoiceitem",
});
export const Stripetransform_usage = Schema.StructWithRest(
  Schema.Struct({
    divide_by: Schema.Number.annotate({
      description: "Divide usage by this number.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    round: Schema.Literals(["down", "up"]).annotate({
      description: "After division, either round the result `up` or `down`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "TransformUsage",
  description: "",
  identifier: "Stripetransform_usage",
});
export const Stripedeleted_plan = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("plan").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedPlan",
  description: "",
  identifier: "Stripedeleted_plan",
});
export const Stripedeleted_product_feature = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("product_feature").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedProductFeature",
  description: "",
  identifier: "Stripedeleted_product_feature",
});
export const Stripequotes_resource_status_transitions = Schema.StructWithRest(
  Schema.Struct({
    accepted_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The time that the quote was accepted. Measured in seconds since Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    canceled_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The time that the quote was canceled. Measured in seconds since Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    finalized_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The time that the quote was finalized. Measured in seconds since Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "QuotesResourceStatusTransitions",
  description: "",
  identifier: "Stripequotes_resource_status_transitions",
});
export const Stripequotes_resource_transfer_data = Schema.suspend(
  (): Schema.Codec<Stripequotes_resource_transfer_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount in cents (or local equivalent) that will be transferred to the destination account when the invoice is paid. By default, the entire amount is transferred to the destination.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        amount_percent: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the destination account. By default, the entire amount will be transferred to the destination.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        destination: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeaccount,
        ]).annotate({
          description:
            "The account where funds from the payment will be transferred to upon payment success.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "QuotesResourceTransferData",
      description: "",
      identifier: "Stripequotes_resource_transfer_data",
    }),
);
export const Striperadar_value_list_item = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    created_by: Schema.String.annotate({
      description:
        "The name or email address of the user who added this item to the value list.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
    }),
    object: Schema.Literal("radar.value_list_item").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    value: Schema.String.annotate({
      description: "The value of the item.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    value_list: Schema.String.annotate({
      description: "The identifier of the value list this item belongs to.",
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
  title: "Value List Item",
  description:
    "Value list items allow you to add specific values to a given Radar value list, which can then be used in rules.\n\nRelated guide: [Managing list items](https://docs.stripe.com/radar/lists#managing-list-items)",
  identifier: "Striperadar.value_list_item",
});
export const Stripedeleted_radar_value_list_item = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("radar.value_list_item").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "RadarListDeletedListItem",
  description: "",
  identifier: "Stripedeleted_radar.value_list_item",
});
export const Stripedeleted_radar_value_list = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("radar.value_list").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "RadarListDeletedList",
  description: "",
  identifier: "Stripedeleted_radar.value_list",
});
export const Stripefinancial_reporting_finance_report_run_run_parameters =
  Schema.StructWithRest(
    Schema.Struct({
      columns: Schema.optionalKey(
        Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "The set of output columns requested for inclusion in the report run.",
        }),
      ),
      connected_account: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Connected account ID by which to filter the report run.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      currency: Schema.optionalKey(
        Schema.String.annotate({
          description: "Currency of objects to be included in the report run.",
          format: "currency",
        }),
      ),
      interval_end: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Ending timestamp of data to be included in the report run. Can be any UTC timestamp between 1 second after the user specified `interval_start` and 1 second before this report's last `data_available_end` value.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      interval_start: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Starting timestamp of data to be included in the report run. Can be any UTC timestamp between 1 second after this report's `data_available_start` and 1 second before the user specified `interval_end` value.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      payout: Schema.optionalKey(
        Schema.String.annotate({
          description: "Payout ID by which to filter the report run.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      reporting_category: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Category of balance transactions to be included in the report run.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      timezone: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Defaults to `Etc/UTC`. The output timezone for all timestamps in the report. A list of possible time zone values is maintained at the [IANA Time Zone Database](http://www.iana.org/time-zones). Has no effect on `interval_start` or `interval_end`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "FinancialReportingFinanceReportRunRunParameters",
    description: "",
    identifier: "Stripefinancial_reporting_finance_report_run_run_parameters",
  });
export const Stripedeleted_subscription_item = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("subscription_item").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedSubscriptionItem",
  description: "",
  identifier: "Stripedeleted_subscription_item",
});
export const Stripeterminal_configuration_configuration_resource_device_type_specific_config =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_configuration_configuration_resource_device_type_specific_config> =>
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "A File ID representing an image to display on the reader",
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
        title:
          "TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfig",
        description: "",
        identifier:
          "Stripeterminal_configuration_configuration_resource_device_type_specific_config",
      }),
  );
export const Stripeterminal_configuration_configuration_resource_cellular_config =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Whether a cellular-capable reader can connect to the internet over cellular.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TerminalConfigurationConfigurationResourceCellularConfig",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_cellular_config",
  });
export const Stripeterminal_configuration_configuration_resource_offline_config =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.optionalKey(
        Schema.Union([
          Schema.Boolean.annotate({
            description:
              "Determines whether to allow transactions to be collected while reader is offline. Defaults to false.",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TerminalConfigurationConfigurationResourceOfflineConfig",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_offline_config",
  });
export const Stripeterminal_configuration_configuration_resource_reader_security_config =
  Schema.StructWithRest(
    Schema.Struct({
      admin_menu_passcode: Schema.String.annotate({
        description: "Passcode used to access a reader's admin menu.",
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
    title: "TerminalConfigurationConfigurationResourceReaderSecurityConfig",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_reader_security_config",
  });
export const Stripeterminal_configuration_configuration_resource_reboot_window =
  Schema.StructWithRest(
    Schema.Struct({
      end_hour: Schema.Number.annotate({
        description:
          "Integer between 0 to 23 that represents the end hour of the reboot time window. The value must be different than the start_hour.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      start_hour: Schema.Number.annotate({
        description:
          "Integer between 0 to 23 that represents the start hour of the reboot time window.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TerminalConfigurationConfigurationResourceRebootWindow",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_reboot_window",
  });
export const Stripeterminal_configuration_configuration_resource_currency_specific_config =
  Schema.StructWithRest(
    Schema.Struct({
      fixed_amounts: Schema.optionalKey(
        Schema.Union([
          Schema.Array(Schema.Int).annotate({
            description: "Fixed amounts displayed when collecting a tip",
          }),
          Schema.Null,
        ]),
      ),
      percentages: Schema.optionalKey(
        Schema.Union([
          Schema.Array(Schema.Int).annotate({
            description: "Percentages displayed when collecting a tip",
          }),
          Schema.Null,
        ]),
      ),
      smart_tip_threshold: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Below this amount, fixed amounts will be displayed; above it, percentages will be displayed",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TerminalConfigurationConfigurationResourceCurrencySpecificConfig",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_currency_specific_config",
  });
export const Stripeterminal_configuration_configuration_resource_enterprise_peap_wifi =
  Schema.StructWithRest(
    Schema.Struct({
      ca_certificate_file: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "A File ID representing a PEM file containing the server certificate",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      password: Schema.String.annotate({
        description: "Password for connecting to the WiFi network",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      ssid: Schema.String.annotate({
        description: "Name of the WiFi network",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      username: Schema.String.annotate({
        description: "Username for connecting to the WiFi network",
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
    title: "TerminalConfigurationConfigurationResourceEnterprisePEAPWifi",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_enterprise_peap_wifi",
  });
export const Stripeterminal_configuration_configuration_resource_enterprise_tls_wifi =
  Schema.StructWithRest(
    Schema.Struct({
      ca_certificate_file: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "A File ID representing a PEM file containing the server certificate",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      client_certificate_file: Schema.String.annotate({
        description:
          "A File ID representing a PEM file containing the client certificate",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      private_key_file: Schema.String.annotate({
        description:
          "A File ID representing a PEM file containing the client RSA private key",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      private_key_file_password: Schema.optionalKey(
        Schema.String.annotate({
          description: "Password for the private key file",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      ssid: Schema.String.annotate({
        description: "Name of the WiFi network",
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
    title: "TerminalConfigurationConfigurationResourceEnterpriseTLSWifi",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_enterprise_tls_wifi",
  });
export const Stripeterminal_configuration_configuration_resource_personal_psk_wifi =
  Schema.StructWithRest(
    Schema.Struct({
      password: Schema.String.annotate({
        description: "Password for connecting to the WiFi network",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      ssid: Schema.String.annotate({
        description: "Name of the WiFi network",
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
    title: "TerminalConfigurationConfigurationResourcePersonalPSKWifi",
    description: "",
    identifier:
      "Stripeterminal_configuration_configuration_resource_personal_psk_wifi",
  });
export const Stripedeleted_terminal_configuration = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("terminal.configuration").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "TerminalConfigurationDeletedConfiguration",
  description: "",
  identifier: "Stripedeleted_terminal.configuration",
});
export const Stripeaddress_api_resource_terminal = Schema.StructWithRest(
  Schema.Struct({
    city: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "City, district, suburb, town, or village.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line1: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Address line 1, such as the street, PO Box, or company name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line2: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Address line 2, such as the apartment, suite, unit, or building.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    postal_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "ZIP or postal code." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    state: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "AddressAPIResourceTerminal",
  description: "",
  identifier: "Stripeaddress_api_resource_terminal",
});
export const Stripedeleted_terminal_location = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("terminal.location").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "TerminalLocationDeletedLocation",
  description: "",
  identifier: "Stripedeleted_terminal.location",
});
export const Stripeterminal_reader_reader_resource_custom_text =
  Schema.StructWithRest(
    Schema.Struct({
      description: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Customize the default description for this input",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      skip_button: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Customize the default label for this input's skip button",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      submit_button: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Customize the default label for this input's submit button",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      title: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Customize the default title for this input",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Custom Text",
    description:
      "Represents custom text to be displayed when collecting the input using a reader",
    identifier: "Stripeterminal_reader_reader_resource_custom_text",
  });
export const Stripeterminal_reader_reader_resource_email =
  Schema.StructWithRest(
    Schema.Struct({
      value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The collected email address",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Email",
    description: "Information about a email being collected using a reader",
    identifier: "Stripeterminal_reader_reader_resource_email",
  });
export const Stripeterminal_reader_reader_resource_numeric =
  Schema.StructWithRest(
    Schema.Struct({
      value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "The collected number" }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Numeric",
    description: "Information about a number being collected using a reader",
    identifier: "Stripeterminal_reader_reader_resource_numeric",
  });
export const Stripeterminal_reader_reader_resource_phone =
  Schema.StructWithRest(
    Schema.Struct({
      value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The collected phone number",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Phone",
    description:
      "Information about a phone number being collected using a reader",
    identifier: "Stripeterminal_reader_reader_resource_phone",
  });
export const Stripeterminal_reader_reader_resource_choice =
  Schema.StructWithRest(
    Schema.Struct({
      id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The identifier for the selected choice. Maximum 50 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      style: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["primary", "secondary"]).annotate({
            description:
              "The button style for the choice. Can be `primary` or `secondary`.",
          }),
          Schema.Null,
        ]),
      ),
      text: Schema.String.annotate({
        description: "The text to be selected. Maximum 30 characters.",
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
    title: "Choice",
    description: "Choice to be selected on a Reader",
    identifier: "Stripeterminal_reader_reader_resource_choice",
  });
export const Stripeterminal_reader_reader_resource_signature =
  Schema.StructWithRest(
    Schema.Struct({
      value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The File ID of a collected signature image",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Signature",
    description: "Information about a signature being collected using a reader",
    identifier: "Stripeterminal_reader_reader_resource_signature",
  });
export const Stripeterminal_reader_reader_resource_text = Schema.StructWithRest(
  Schema.Struct({
    value: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The collected text value",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Text",
  description: "Information about text being collected using a reader",
  identifier: "Stripeterminal_reader_reader_resource_text",
});
export const Stripeterminal_reader_reader_resource_toggle =
  Schema.StructWithRest(
    Schema.Struct({
      default_value: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["disabled", "enabled"]).annotate({
            description:
              "The toggle's default value. Can be `enabled` or `disabled`.",
          }),
          Schema.Null,
        ]),
      ),
      description: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The toggle's description text. Maximum 50 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      title: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The toggle's title text. Maximum 50 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      value: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["disabled", "enabled"]).annotate({
            description:
              "The toggle's collected value. Can be `enabled` or `disabled`.",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Toggle",
    description: "Information about an input's toggle",
    identifier: "Stripeterminal_reader_reader_resource_toggle",
  });
export const Stripeterminal_reader_reader_resource_tipping_config =
  Schema.StructWithRest(
    Schema.Struct({
      amount_eligible: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Amount used to calculate tip suggestions on tipping selection screen for this transaction. Must be a positive integer in the smallest currency unit (e.g., 100 cents to represent $1.00 or 100 to represent ¥100, a zero-decimal currency).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TippingConfig",
    description: "Represents a per-transaction tipping configuration",
    identifier: "Stripeterminal_reader_reader_resource_tipping_config",
  });
export const Stripeterminal_reader_reader_resource_confirm_config =
  Schema.StructWithRest(
    Schema.Struct({
      return_url: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "If the customer doesn't abandon authenticating the payment, they're redirected to this URL after completion.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "ConfirmConfig",
    description:
      "Represents a per-transaction override of a reader configuration",
    identifier: "Stripeterminal_reader_reader_resource_confirm_config",
  });
export const Stripeterminal_reader_reader_resource_file_metadata =
  Schema.StructWithRest(
    Schema.Struct({
      created_at: Schema.Number.annotate({
        description:
          "Creation time of the object (in seconds since the Unix epoch).",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      filename: Schema.String.annotate({
        description:
          "The original name of the uploaded file (e.g. `receipt.png`).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      size: Schema.Number.annotate({
        description: "The size (in bytes) of the uploaded file.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      type: Schema.String.annotate({
        description: "The format of the uploaded file.",
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
    title: "FileMetadata",
    description: "Metadata of an uploaded file",
    identifier: "Stripeterminal_reader_reader_resource_file_metadata",
  });
export const Stripeterminal_reader_reader_resource_process_setup_config =
  Schema.StructWithRest(
    Schema.Struct({
      enable_customer_cancellation: Schema.optionalKey(
        Schema.Boolean.annotate({
          description:
            "Enable customer-initiated cancellation when processing this SetupIntent.",
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
    title: "ProcessSetupConfig",
    description: "Represents a per-setup override of a reader configuration",
    identifier: "Stripeterminal_reader_reader_resource_process_setup_config",
  });
export const Stripeterminal_reader_reader_resource_refund_payment_config =
  Schema.StructWithRest(
    Schema.Struct({
      enable_customer_cancellation: Schema.optionalKey(
        Schema.Boolean.annotate({
          description:
            "Enable customer-initiated cancellation when refunding this payment.",
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
    title: "RefundPaymentConfig",
    description:
      "Represents a per-transaction override of a reader configuration",
    identifier: "Stripeterminal_reader_reader_resource_refund_payment_config",
  });
export const Stripeterminal_reader_reader_resource_line_item =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.Number.annotate({
        description:
          "The amount of the line item. A positive integer in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      description: Schema.String.annotate({
        description: "Description of the line item.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      quantity: Schema.Number.annotate({
        description: "The quantity of the line item.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "LineItem",
    description: "Represents a line item to be displayed on the reader",
    identifier: "Stripeterminal_reader_reader_resource_line_item",
  });
export const Stripedeleted_terminal_reader = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    device_type: Schema.Literals([
      "bbpos_chipper2x",
      "bbpos_wisepad3",
      "bbpos_wisepos_e",
      "mobile_phone_reader",
      "simulated_stripe_s700",
      "simulated_stripe_s710",
      "simulated_stripe_t600",
      "simulated_verifone_m425",
      "simulated_verifone_p630",
      "simulated_verifone_ux700",
      "simulated_verifone_v660p",
      "simulated_wisepos_e",
      "stripe_m2",
      "stripe_s700",
      "stripe_s710",
      "stripe_t600",
      "verifone_P400",
      "verifone_m425",
      "verifone_p630",
      "verifone_ux700",
      "verifone_v660p",
    ]).annotate({ description: "Device type of the reader." }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("terminal.reader").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    serial_number: Schema.String.annotate({
      description: "Serial number of the reader.",
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
  title: "TerminalReaderDeletedReader",
  description: "",
  identifier: "Stripedeleted_terminal.reader",
});
export const Stripedeleted_test_helpers_test_clock = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("test_helpers.test_clock").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedTestClock",
  description: "",
  identifier: "Stripedeleted_test_helpers.test_clock",
});
export const Stripethree_d_secure_standalone_resource_acquirer_details =
  Schema.StructWithRest(
    Schema.Struct({
      acquirer_bin: Schema.optionalKey(
        Schema.String.annotate({
          description: "The Acquirer BIN (specific to the directory_server).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      acquirer_country: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The two-letter country code of the acquirer ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      acquirer_merchant_id: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The Merchant ID (or Card Acceptor ID) that your acquirer assigned you (specific to the directory_server).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      mcc: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The [merchant category code](https://en.wikipedia.org/wiki/Merchant_category_code) as defined by each payment system or directory server.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      merchant_name: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The merchant name assigned by the acquirer or payment system. Same name used in the authorization message as defined in [ISO 8583](https://en.wikipedia.org/wiki/ISO_8583).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      requestor_id: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Requestor ID if you’re enrolled in the card network’s 3DS program. Otherwise, you can omit this field because Stripe assigns a Requestor ID with the card networks.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Acquirer Detail",
    description:
      "Contains additional details about the acquirer for a 3DS Authentication.",
    identifier: "Stripethree_d_secure_standalone_resource_acquirer_details",
  });
export const Stripethree_d_secure_standalone_resource_browser_details =
  Schema.StructWithRest(
    Schema.Struct({
      accept_header: Schema.String.annotate({
        description: "The HTTP accept headers from the cardholder's browser.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      color_depth: Schema.optionalKey(
        Schema.Number.annotate({
          description: "The color depth of the cardholder’s screen.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      ip_address: Schema.String.annotate({
        description: "The IP address of the browser.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      java_enabled: Schema.optionalKey(
        Schema.Boolean.annotate({
          description: "The cardholder browser’s ability to execute Java.",
        }),
      ),
      javascript_enabled: Schema.Boolean.annotate({
        description: "The cardholder browser’s ability to execute JavaScript.",
      }),
      language: Schema.String.annotate({
        description:
          "An IETF BCP 47 language tag representing the browser language.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      screen_height: Schema.optionalKey(
        Schema.Number.annotate({
          description: "The total height of the cardholder’s screen in pixels.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      screen_width: Schema.optionalKey(
        Schema.Number.annotate({
          description: "The total width of the cardholder’s screen in pixels.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      timezone_offset: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "The time difference between UTC time and the local time of the cardholder’s browser, in minutes.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      user_agent: Schema.String.annotate({
        description: "The browser user agent.",
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
    title: "BrowserDetailsResource",
    description:
      "Contains details on the browser for a standalone 3DS Authentication.",
    identifier: "Stripethree_d_secure_standalone_resource_browser_details",
  });
export const Stripethree_d_secure_standalone_resource_three_ri_details =
  Schema.StructWithRest(
    Schema.Struct({
      previous_authentication: Schema.String.annotate({
        description:
          "ID of the previous initial authenticated 3DS Authentication object.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      type: Schema.Literals([
        "delayed_shipment",
        "other_payment",
        "recurring",
        "split_shipment",
      ]).annotate({ description: "Type of the 3RI Authentication." }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "ThreeRIDetailsResource",
    description: "Contains details for a 3RI standalone 3DS Authentication.",
    identifier: "Stripethree_d_secure_standalone_resource_three_ri_details",
  });
export const Stripethree_d_secure_standalone_resource_challenge_details =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals(["mandated", "preferred"]).annotate({
        description:
          "Type of challenge flow you requested for this 3DS Authentication.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "ChallengeDetailsResource",
    description: "",
    identifier: "Stripethree_d_secure_standalone_resource_challenge_details",
  });
export const Stripethree_d_secure_standalone_resource_data_share_details =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals(["ds_specific", "emv_standard"]).annotate({
        description:
          "Type of data share flow you requested for this 3DS Authentication.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "DataShareDetailsResource",
    description: "",
    identifier: "Stripethree_d_secure_standalone_resource_data_share_details",
  });
export const Stripethree_d_secure_standalone_resource_frictionless_details =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals(["low_risk", "none"]).annotate({
        description:
          "Type of frictionless flow you requested for this 3DS Authentication.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "FrictionlessDetailsResource",
    description: "",
    identifier: "Stripethree_d_secure_standalone_resource_frictionless_details",
  });
export const Stripethree_d_secure_standalone_resource_expiry =
  Schema.StructWithRest(
    Schema.Struct({
      date: Schema.optionalKey(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      type: Schema.Literals(["date", "never"]),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Expiry Detail",
    description: "Information about recurring payment expiry",
    identifier: "Stripethree_d_secure_standalone_resource_expiry",
  });
export const Stripethree_d_secure_standalone_resource_cartes_bancaires =
  Schema.StructWithRest(
    Schema.Struct({
      avalgo: Schema.String.annotate({
        description:
          "The cryptogram calculation algorithm used by the card Issuer's ACS to calculate the Authentication cryptogram. Also known as cavvAlgorithm. ARes/RReq messageExtension: `CB-AVALGO`",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      cb_exemption: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The exemption indicator returned from Cartes Bancaires in the ARes. This is a 3 byte bitmap (lowest significant byte first and most significant bit first) that has been Base64 encoded. String (4 characters). ARes message extension: `CB-EXEMPTION`",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      cb_score: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The risk score returned from Cartes Bancaires in the ARes. Numeric value 0-99. ARes/RReq message extension: `CB-SCORE`",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "CartesBancairesResource",
    description:
      "Contains details for Cartes Bancaires specific fields in the authentication outcomes.",
    identifier: "Stripethree_d_secure_standalone_resource_cartes_bancaires",
  });
export const Stripethree_d_secure_standalone_resource_shipping_address =
  Schema.StructWithRest(
    Schema.Struct({
      city: Schema.optionalKey(
        Schema.String.annotate({
          description: "City, district, suburb, town, or village.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      country: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      line1: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Address line 1, such as the street, PO Box, or company name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      line2: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Address line 2, such as the apartment, suite, unit, or building.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      postal_code: Schema.optionalKey(
        Schema.String.annotate({ description: "ZIP or postal code." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      state: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Shipping Address",
    description:
      "Contains details about the shipping address for a 3DS Authentication.",
    identifier: "Stripethree_d_secure_standalone_resource_shipping_address",
  });
export const Stripeinbound_transfers_payment_method_details_us_bank_account =
  Schema.suspend(
    (): Schema.Codec<Stripeinbound_transfers_payment_method_details_us_bank_account> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["company", "individual"]).annotate({
                description: "Account holder type: individual or company.",
              }),
              Schema.Null,
            ]),
          ),
          account_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["checking", "savings"]).annotate({
                description:
                  "Account type: checkings or savings. Defaults to checking if omitted.",
              }),
              Schema.Null,
            ]),
          ),
          bank_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Name of the bank associated with the bank account.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          fingerprint: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          last4: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Last four digits of the bank account number.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          mandate: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripemandate,
            ]).annotate({
              description: "ID of the mandate used to make this payment.",
            }),
          ),
          network: Schema.Literal("ach").annotate({
            description:
              "The network rails used. See the [docs](https://docs.stripe.com/treasury/money-movement/timelines) to learn more about money movement timelines for each network type.",
          }),
          routing_number: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Routing number of the bank account.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "inbound_transfers_payment_method_details_us_bank_account",
        description: "",
        identifier:
          "Stripeinbound_transfers_payment_method_details_us_bank_account",
      }),
  );
export const Stripeoutbound_payments_payment_method_details_financial_account =
  Schema.StructWithRest(
    Schema.Struct({
      id: Schema.String.annotate({
        description: "Token of the FinancialAccount.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      network: Schema.Literal("stripe").annotate({
        description: "The rails used to send funds.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "outbound_payments_payment_method_details_financial_account",
    description: "",
    identifier:
      "Stripeoutbound_payments_payment_method_details_financial_account",
  });
export const Stripeoutbound_payments_payment_method_details_us_bank_account =
  Schema.suspend(
    (): Schema.Codec<Stripeoutbound_payments_payment_method_details_us_bank_account> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["company", "individual"]).annotate({
                description: "Account holder type: individual or company.",
              }),
              Schema.Null,
            ]),
          ),
          account_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["checking", "savings"]).annotate({
                description:
                  "Account type: checkings or savings. Defaults to checking if omitted.",
              }),
              Schema.Null,
            ]),
          ),
          bank_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Name of the bank associated with the bank account.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          fingerprint: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          last4: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Last four digits of the bank account number.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          mandate: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripemandate,
            ]).annotate({
              description: "ID of the mandate used to make this payment.",
            }),
          ),
          network: Schema.Literals(["ach", "us_domestic_wire"]).annotate({
            description:
              "The network rails used. See the [docs](https://docs.stripe.com/treasury/money-movement/timelines) to learn more about money movement timelines for each network type.",
          }),
          routing_number: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Routing number of the bank account.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "outbound_payments_payment_method_details_us_bank_account",
        description: "",
        identifier:
          "Stripeoutbound_payments_payment_method_details_us_bank_account",
      }),
  );
export const Stripeoutbound_transfers_payment_method_details_financial_account =
  Schema.StructWithRest(
    Schema.Struct({
      id: Schema.String.annotate({
        description: "Token of the FinancialAccount.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      network: Schema.Literal("stripe").annotate({
        description: "The rails used to send funds.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "outbound_transfers_payment_method_details_financial_account",
    description: "",
    identifier:
      "Stripeoutbound_transfers_payment_method_details_financial_account",
  });
export const Stripeoutbound_transfers_payment_method_details_us_bank_account =
  Schema.suspend(
    (): Schema.Codec<Stripeoutbound_transfers_payment_method_details_us_bank_account> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["company", "individual"]).annotate({
                description: "Account holder type: individual or company.",
              }),
              Schema.Null,
            ]),
          ),
          account_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["checking", "savings"]).annotate({
                description:
                  "Account type: checkings or savings. Defaults to checking if omitted.",
              }),
              Schema.Null,
            ]),
          ),
          bank_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Name of the bank associated with the bank account.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          fingerprint: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          last4: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Last four digits of the bank account number.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          mandate: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripemandate,
            ]).annotate({
              description: "ID of the mandate used to make this payment.",
            }),
          ),
          network: Schema.Literals(["ach", "us_domestic_wire"]).annotate({
            description:
              "The network rails used. See the [docs](https://docs.stripe.com/treasury/money-movement/timelines) to learn more about money movement timelines for each network type.",
          }),
          routing_number: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Routing number of the bank account.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "outbound_transfers_payment_method_details_us_bank_account",
        description: "",
        identifier:
          "Stripeoutbound_transfers_payment_method_details_us_bank_account",
      }),
  );
export const Stripereceived_payment_method_details_financial_account =
  Schema.StructWithRest(
    Schema.Struct({
      id: Schema.String.annotate({
        description: "The FinancialAccount ID.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      network: Schema.Literal("stripe").annotate({
        description:
          "The rails the ReceivedCredit was sent over. A FinancialAccount can only send funds over `stripe`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "received_payment_method_details_financial_account",
    description: "",
    identifier: "Stripereceived_payment_method_details_financial_account",
  });
export const Stripewebhook_endpoint = Schema.StructWithRest(
  Schema.Struct({
    api_version: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The API version that events are rendered as for this webhook endpoint. You can't change this value after you create the endpoint.",
        }),
        Schema.Null,
      ]),
    ),
    application: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The ID of the associated Connect application.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "An optional description of what the webhook is used for.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    enabled_events: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "The list of events to enable for this endpoint. `['*']` indicates that all events are enabled, except those that require explicit selection.",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
    }),
    metadata: Schema.Record(
      Schema.String,
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
    object: Schema.Literal("webhook_endpoint").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    secret: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The endpoint's secret, used to generate [webhook signatures](https://docs.stripe.com/webhooks/signatures). Only returned at creation.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    status: Schema.String.annotate({
      description:
        "The status of the webhook. It can be `enabled` or `disabled`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    url: Schema.String.annotate({
      description: "The URL of the webhook endpoint.",
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
  title: "Webhook Endpoint",
  description:
    "You can configure [webhook endpoints](https://docs.stripe.com/webhooks/) via the API to be\nnotified about events that happen in your Stripe account or connected\naccounts.\n\nMost users configure webhooks from [the dashboard](https://dashboard.stripe.com/webhooks), which provides a user interface for registering and testing your webhook endpoints.\n\nRelated guide: [Setting up webhooks](https://docs.stripe.com/webhooks/configure)",
  identifier: "Stripewebhook_endpoint",
});
export const Stripedeleted_webhook_endpoint = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("webhook_endpoint").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "NotificationWebhookEndpointDeleted",
  description: "",
  identifier: "Stripedeleted_webhook_endpoint",
});
export const Stripev2_commerce_product_catalog_import = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.String.annotate({
      description: "The time this ProductCatalogImport was created.",
      format: "date-time",
    }),
    feed_type: Schema.Literals([
      "inventory",
      "pricing",
      "product",
      "promotion",
    ]).annotate({
      description:
        "The type of feed data being imported into the product catalog.",
    }),
    id: Schema.String.annotate({
      description: "The unique identifier for this ProductCatalogImport.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    metadata: Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Additional information about the object in a structured format.",
    }),
    mode: Schema.Literals(["replace", "upsert"]).annotate({
      description: "The import strategy for handling existing catalog data.",
    }),
    object: Schema.Literal("v2.commerce.product_catalog_import").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    status: Schema.Literals([
      "awaiting_upload",
      "failed",
      "processing",
      "succeeded",
      "succeeded_with_errors",
    ]).annotate({
      description: "The current status of this ProductCatalogImport.",
    }),
    status_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          awaiting_upload: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                upload_url: Schema.StructWithRest(
                  Schema.Struct({
                    expires_at: Schema.String.annotate({
                      description: "The timestamp when the upload URL expires.",
                      format: "date-time",
                    }),
                    url: Schema.String.annotate({
                      description:
                        "The pre-signed URL for uploading the catalog file.",
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
                    "The pre-signed URL information for uploading the catalog file.",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({
              description: "Details when the import is awaiting file upload.",
            }),
          ),
          failed: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                code: Schema.Literals([
                  "file_not_found",
                  "internal_error",
                  "invalid_file",
                ]).annotate({
                  description:
                    "The error code for this product catalog processing failure.",
                }),
                failure_message: Schema.String.annotate({
                  description: "A message explaining why the import failed.",
                }),
                type: Schema.Literals([
                  "cannot_proceed",
                  "transient_failure",
                ]).annotate({
                  description:
                    "The error type for this product catalog processing failure.",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({
              description: "Details when the import didn't complete.",
            }),
          ),
          processing: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                error_count: Schema.String.annotate({
                  description:
                    "The number of records that failed to process so far.",
                  format: "int64",
                }),
                success_count: Schema.String.annotate({
                  description: "The number of records processed so far.",
                  format: "int64",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({
              description: "Details when the import is processing.",
            }),
          ),
          succeeded: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                success_count: Schema.String.annotate({
                  description: "The total number of records processed.",
                  format: "int64",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({
              description: "Details when the import has succeeded.",
            }),
          ),
          succeeded_with_errors: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                error_count: Schema.String.annotate({
                  description:
                    "The total number of records that failed to process.",
                  format: "int64",
                }),
                error_file: Schema.StructWithRest(
                  Schema.Struct({
                    content_type: Schema.String.annotate({
                      description: "The MIME type of the error file.",
                    }),
                    download_url: Schema.StructWithRest(
                      Schema.Struct({
                        expires_at: Schema.String.annotate({
                          description:
                            "The timestamp when the download URL expires.",
                          format: "date-time",
                        }),
                        url: Schema.String.annotate({
                          description:
                            "The pre-signed URL for downloading the error file.",
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
                        "The pre-signed URL information for downloading the error file.",
                    }),
                    size: Schema.String.annotate({
                      description: "The size of the error file in bytes.",
                      format: "int64",
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
                    "A file containing details about all errors that occurred.",
                }),
                samples: Schema.Array(
                  Schema.StructWithRest(
                    Schema.Struct({
                      error_message: Schema.String.annotate({
                        description:
                          "A description of what went wrong with this record.",
                      }),
                      field: Schema.String.annotate({
                        description:
                          "The name of the field that caused the error.",
                      }),
                      id: Schema.String.annotate({
                        description:
                          "The identifier of the record that failed to process.",
                      }),
                      row: Schema.String.annotate({
                        description:
                          "The row number in the import file where the error occurred.",
                        format: "int64",
                      }),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ),
                ).annotate({
                  description:
                    "A sample of errors that occurred during processing.",
                }),
                success_count: Schema.String.annotate({
                  description: "The total number of records processed.",
                  format: "int64",
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
                "Details when the import completed but some records failed to process.",
            }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Details about the current import status." }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Product Catalog Import",
  description:
    "The ProductCatalogImport object tracks the long-running background process that handles uploading, processing and validation.",
  identifier: "Stripev2.commerce.product_catalog_import",
});
export const Stripev2_deleted_object = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String.annotate({
      description: "The ID of the object that's being deleted.",
    }),
    object: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "String representing the type of the object that has been deleted. Objects of the same type share the same value of the object field.",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripev2.deleted_object" });
export const Stripev2_money_management_financial_address =
  Schema.StructWithRest(
    Schema.Struct({
      bank_account: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            aba: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  account_holder_name: Schema.optionalKey(
                    Schema.String.annotate({
                      description: "The name of the account holder.",
                    }),
                  ),
                  account_number: Schema.String.annotate({
                    description:
                      "The full account number. Empty while the bank account is pending allocation.",
                  }),
                  address: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        city: Schema.String.annotate({ description: "City." }),
                        country: Schema.String.annotate({
                          description: "Country.",
                        }),
                        line1: Schema.String.annotate({
                          description: "Address line 1.",
                        }),
                        line2: Schema.String.annotate({
                          description: "Address line 2.",
                        }),
                        postal_code: Schema.String.annotate({
                          description: "Postal code.",
                        }),
                        state: Schema.String.annotate({
                          description: "State or province.",
                        }),
                        town: Schema.String.annotate({
                          description: "Town or suburb.",
                        }),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      description: "The address of the account holder.",
                    }),
                  ),
                  bank_name: Schema.optionalKey(
                    Schema.String.annotate({
                      description: "The name of the bank.",
                    }),
                  ),
                  routing_number: Schema.String.annotate({
                    description: "The ABA routing number.",
                  }),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ description: "ABA bank account details (US)." }),
            ),
            country: Schema.optionalKey(
              Schema.String.annotate({
                description:
                  "The country of the bank account. Always included in the response, but null while the bank\naccount is pending and its country is not yet known.",
              }),
            ),
            currency: Schema.String.annotate({
              description: "Open Enum. The currency of the bank account.",
            }),
            iban: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  account_holder_name: Schema.String.annotate({
                    description: "The name of the account holder.",
                  }),
                  bank_name: Schema.String.annotate({
                    description: "The name of the bank.",
                  }),
                  iban: Schema.String.annotate({
                    description:
                      "The full IBAN. Empty while the bank account is pending allocation.",
                  }),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ description: "IBAN bank account details." }),
            ),
            sort_code: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  account_holder_name: Schema.String.annotate({
                    description: "The name of the account holder.",
                  }),
                  account_number: Schema.String.annotate({
                    description:
                      "The full account number. Empty while the bank account is pending allocation.",
                  }),
                  sort_code: Schema.String.annotate({
                    description: "The sort code.",
                  }),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                description: "Sort code bank account details (UK).",
              }),
            ),
            type: Schema.Literals(["aba", "iban", "sort_code"]).annotate({
              description: "Open Enum. The type of bank account details.",
            }),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          description: "Bank account details for this FinancialAddress.",
        }),
      ),
      created: Schema.String.annotate({
        description: "The creation timestamp of the FinancialAddress.",
        format: "date-time",
      }),
      financial_account: Schema.String.annotate({
        description:
          "The ID of the FinancialAccount this FinancialAddress corresponds to.",
      }),
      id: Schema.String.annotate({
        description: "The ID of the FinancialAddress.",
      }),
      livemode: Schema.Boolean.annotate({
        description:
          "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
      }),
      object: Schema.Literal("v2.money_management.financial_address").annotate({
        description:
          "String representing the object's type. Objects of the same type share the same value of the object field.",
      }),
      settlement_currency: Schema.String,
      status: Schema.Literals([
        "active",
        "archived",
        "failed",
        "pending",
      ]).annotate({
        description: "Closed Enum. The status of the FinancialAddress.",
      }),
      type: Schema.Literal("bank_account").annotate({
        description: "Open Enum. The type of FinancialAddress.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Financial Address",
    description:
      "A FinancialAddress contains information needed to transfer money to a Financial Account. A Financial Account can have more than one Financial Address.",
    identifier: "Stripev2.money_management.financial_address",
  });
export const Stripev2_money_management_inbound_transfer = Schema.StructWithRest(
  Schema.Struct({
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
      description:
        "The amount in specified currency that will land in the FinancialAccount balance.",
    }),
    created: Schema.String.annotate({
      description:
        "Creation time of the InboundTransfer. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
    description: Schema.String.annotate({
      description:
        "A freeform text field provided by user, containing metadata.",
    }),
    from: Schema.StructWithRest(
      Schema.Struct({
        debited: Schema.StructWithRest(
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
          description:
            "The amount in specified currency that was debited from the Payment Method.",
        }),
        payment_method: Schema.StructWithRest(
          Schema.Struct({
            type: Schema.String.annotate({
              description:
                "The type of PaymentMethod used to create the InboundTransfer. Clients should tolerate future values.",
            }),
            us_bank_account: Schema.optionalKey(
              Schema.String.annotate({
                description:
                  'The destination US bank account identifier. eg "usba_***".',
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
            "The bank account credential used to fund the InboundTransfer (for example, a US bank account), not a Payments API `pm_` PaymentMethod.",
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
        "A nested object containing information about the origin of the InboundTransfer.",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the InboundTransfer.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    object: Schema.Literal("v2.money_management.inbound_transfer").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    to: Schema.StructWithRest(
      Schema.Struct({
        credited: Schema.StructWithRest(
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
          description:
            "The amount by which the FinancialAccount balance is credited.",
        }),
        financial_account: Schema.String.annotate({
          description: "The FinancialAccount that funds will land in.",
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
        "A nested object containing information about the destination of the InboundTransfer.",
    }),
    transfer_history: Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          bank_debit_failed: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                failure_reason: Schema.Literals([
                  "bank_account_closed",
                  "bank_account_not_found",
                  "bank_debit_could_not_be_processed",
                  "bank_debit_not_authorized",
                  "insufficient_funds",
                ]).annotate({
                  description:
                    "Open Enum. The return reason for the failed InboundTransfer.",
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
                "The InboundTransfer failed. See `failure_reason` for more details.",
            }),
          ),
          bank_debit_processing: Schema.optionalKey(
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ).annotate({
              description:
                "The InboundTransfer was submitted to the scheme for processing. The debit is still in progress and can later succeed or fail.",
            }),
          ),
          bank_debit_queued: Schema.optionalKey(
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ).annotate({
              description:
                "The InboundTransfer was created and is waiting to be submitted to the scheme for processing.",
            }),
          ),
          bank_debit_returned: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                return_reason: Schema.Literals([
                  "bank_account_closed",
                  "bank_account_not_found",
                  "bank_debit_could_not_be_processed",
                  "bank_debit_not_authorized",
                  "insufficient_funds",
                ]).annotate({
                  description:
                    "Open Enum. The return reason for the returned InboundTransfer.",
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
                "The InboundTransfer was returned. The original transaction has been reversed.",
            }),
          ),
          bank_debit_succeeded: Schema.optionalKey(
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ).annotate({
              description:
                "The InboundTransfer succeeded. Funds might not yet be available; check the associated Transaction for availability.",
            }),
          ),
          created: Schema.String.annotate({
            description:
              "Creation time of the HistoryEntry in RFC 3339 format and UTC.",
            format: "date-time",
          }),
          effective_at: Schema.String.annotate({
            description:
              "Effective at time of the HistoryEntry in RFC 3339 format and UTC.",
            format: "date-time",
          }),
          id: Schema.String.annotate({
            description: "A unique ID for the HistoryEntry.",
          }),
          type: Schema.Literals([
            "bank_debit_failed",
            "bank_debit_processing",
            "bank_debit_queued",
            "bank_debit_returned",
            "bank_debit_succeeded",
          ]).annotate({
            description: "Open Enum. The type of the HistoryEntry.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ),
    ).annotate({
      description:
        "A list of history objects, representing changes in the state of the InboundTransfer. The most recent entry's type indicates the current status of the InboundTransfer.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Inbound Transfer",
  description:
    "An InboundTransfer object, representing a money movement from a\nuser owned PaymentMethod to a FinancialAccount belonging to the same user.",
  identifier: "Stripev2.money_management.inbound_transfer",
});
export const Stripev2_money_management_outbound_payment = Schema.StructWithRest(
  Schema.Struct({
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
      description:
        "The amount and currency requested for this OutboundPayment.",
    }),
    cancelable: Schema.Boolean.annotate({
      description:
        "Returns true if the OutboundPayment can be canceled, and false otherwise.",
    }),
    created: Schema.String.annotate({
      description:
        "Time at which the OutboundPayment was created.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string attached to the OutboundPayment. Often useful for displaying to users.",
      }),
    ),
    expected_arrival_date: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The date when funds are expected to arrive in the payout method. This field is not set if the payout method is in a `failed`, `canceled`, or `returned` state.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
        format: "date-time",
      }),
    ),
    from: Schema.StructWithRest(
      Schema.Struct({
        debited: Schema.StructWithRest(
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
          description:
            "The monetary amount debited from the sender, only set on responses.",
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
      description: "The FinancialAccount that funds were pulled from.",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the OutboundPayment.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
      }),
    ),
    object: Schema.Literal("v2.money_management.outbound_payment").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    payout_intent: Schema.optionalKey(
      Schema.String.annotate({
        description: "The PayoutIntent ID that triggered this OutboundPayment.",
      }),
    ),
    recipient_notification: Schema.StructWithRest(
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
        "Details about the OutboundPayment notification settings for recipient.",
    }),
    recipient_verification: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the RecipientVerification for this OutboundPayment. Required where recipient-name verification is mandated before creating an OutboundPayment.",
      }),
    ),
    statement_descriptor: Schema.String.annotate({
      description:
        "The description that appears on the receiving end of an OutboundPayment (for example, on a bank statement). Defaults to `STRIPE` if not configured in the account settings.",
    }),
    status: Schema.Literals([
      "canceled",
      "failed",
      "posted",
      "processing",
      "returned",
    ]).annotate({
      description:
        "Current status of the OutboundPayment.\nAn OutboundPayment is `processing` after creation. It becomes `posted` when funds leave the account,\n`failed` if it cannot be sent, `canceled` if canceled before posting, or `returned` if the funds are returned.",
    }),
    status_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          failed: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                reason: Schema.Literals([
                  "fx_rate_drift_exceeded_after_review",
                  "payout_method_amount_limit_exceeded",
                  "payout_method_declined",
                  "payout_method_does_not_exist",
                  "payout_method_expired",
                  "payout_method_unsupported",
                  "payout_method_usage_frequency_limit_exceeded",
                  "review_rejected",
                  "unknown_failure",
                ]).annotate({
                  description: "Open Enum. The `failed` status reason.",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ description: "The `failed` status reason." }),
          ),
          processing: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                reason: Schema.Literal("under_review").annotate({
                  description: "Open Enum. The `processing` status reason.",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ description: "The `processing` status details." }),
          ),
          returned: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                reason: Schema.Literals([
                  "payout_method_canceled_by_customer",
                  "payout_method_closed",
                  "payout_method_currency_unsupported",
                  "payout_method_does_not_exist",
                  "payout_method_holder_address_incorrect",
                  "payout_method_holder_details_incorrect",
                  "payout_method_holder_name_incorrect",
                  "payout_method_invalid_account_number",
                  "payout_method_restricted",
                  "recalled",
                  "unknown_failure",
                ]).annotate({
                  description: "Open Enum. The `returned` status reason.",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ description: "The `returned` status reason." }),
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
          "Status details for an OutboundPayment in a `processing`, `failed`, or `returned` state.",
      }),
    ),
    status_transitions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          canceled_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when an OutboundPayment changed status to `canceled`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
              format: "date-time",
            }),
          ),
          failed_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when an OutboundPayment changed status to `failed`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
              format: "date-time",
            }),
          ),
          posted_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when an OutboundPayment changed status to `posted`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
              format: "date-time",
            }),
          ),
          returned_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when an OutboundPayment changed status to `returned`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
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
      ).annotate({
        description:
          "Hash containing timestamps of when the object transitioned to a particular status.",
      }),
    ),
    to: Schema.StructWithRest(
      Schema.Struct({
        credited: Schema.StructWithRest(
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
          description: "The monetary amount being credited to the destination.",
        }),
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
      description: "To which payout method the OutboundPayment was sent.",
    }),
    tracking_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          bank_account: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                trace_id: Schema.optionalKey(
                  Schema.String.annotate({
                    description:
                      "A unique identifier that can be used to track this OutboundPayment with the recipient bank. Banks might call this a “reference number” or something similar.",
                  }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ description: "Bank account tracking details." }),
          ),
          card: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                retrieval_reference: Schema.optionalKey(
                  Schema.String.annotate({
                    description:
                      "A unique identifier that can be used to track this OutboundPayment with the recipient card.",
                  }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ description: "Card tracking details." }),
          ),
          status: Schema.Literals([
            "pending",
            "supported",
            "unsupported",
          ]).annotate({
            description:
              "The status of the tracking details for this OutboundPayment.",
          }),
          type: Schema.Literals(["bank_account", "card"]).annotate({
            description:
              "The type of tracking details for this OutboundPayment.",
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
          "Information to track this OutboundPayment with the recipient bank.",
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
  title: "Outbound Payment",
  description:
    "OutboundPayment represents a single money movement from one FinancialAccount you own to a payout method someone else owns.",
  identifier: "Stripev2.money_management.outbound_payment",
});
export const Stripev2_money_management_payout_method = Schema.StructWithRest(
  Schema.Struct({
    archived: Schema.Boolean.annotate({
      description:
        "Whether the payout method was archived. Payout methods can be archived through the /archive API,\nand they will not be automatically archived by Stripe. Archived payout methods cannot be used\nfor outbound money movement.",
    }),
    bank_account: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          bank_account_type: Schema.Literals([
            "checking",
            "futsu",
            "savings",
            "toza",
          ]).annotate({
            description: "The type of bank account (checking or savings).",
          }),
          bank_name: Schema.String.annotate({
            description:
              "The name of the bank this bank account is in. This field is populated automatically by Stripe.",
          }),
          branch_number: Schema.optionalKey(
            Schema.String.annotate({
              description: "The branch number of the bank account, if present.",
            }),
          ),
          country: Schema.String.annotate({
            description: "The country code of the bank account.",
          }),
          financial_connections_account: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The ID of the Financial Connections Account used to create the bank account.",
            }),
          ),
          last4: Schema.String.annotate({
            description: "The last 4 digits of the account number.",
          }),
          routing_number: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The routing number of the bank account, if present.",
            }),
          ),
          supported_currencies: Schema.Array(Schema.String).annotate({
            description:
              "The list of currencies supported by this bank account.",
          }),
          swift_code: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The swift code of the bank or financial institution.",
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
        description: "The PayoutMethodBankAccount object details.",
      }),
    ),
    card: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          exp_month: Schema.String.annotate({
            description: "The month the card expires.",
          }),
          exp_year: Schema.String.annotate({
            description: "The year the card expires.",
          }),
          fingerprint: Schema.String.annotate({
            description:
              "Uniquely identifies this particular card number. You can use this attribute to check whether two\nrecipients who've signed up with you are using the same card number, for example.",
          }),
          last4: Schema.String.annotate({
            description: "The last 4 digits of the card number.",
          }),
          supported_currencies: Schema.Array(Schema.String).annotate({
            description:
              "The list of currencies supported by this bank account.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "The PayoutMethodCard object details." }),
    ),
    created: Schema.String.annotate({
      description: "Created timestamp.",
      format: "date-time",
    }),
    id: Schema.String.annotate({
      description: "ID of the PayoutMethod object.",
    }),
    latest_outbound_setup_intent: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the underlying active OutboundSetupIntent object, if any.",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    object: Schema.Literal("v2.money_management.payout_method").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    restricted: Schema.Boolean.annotate({
      description:
        "Whether the Payout Method is currently unusable for money movement, despite potentially being correctly set up.\nPlease reach out to Stripe Support for more information.",
    }),
    type: Schema.Literals(["bank_account", "card"]).annotate({
      description: "Open Enum. The type of payout method.",
    }),
    usage_status: Schema.StructWithRest(
      Schema.Struct({
        payments: Schema.Literals([
          "disabled",
          "eligible",
          "ineligible",
          "invalid",
          "requires_action",
        ]).annotate({
          description:
            "Payments status - used when sending OutboundPayments (sending funds to recipients).\nIf disabled, enable the payout method by creating an OutboundSetupIntent using [`POST /v2/money_management/outbound_setup_intents`](https://docs.stripe.com/api/v2/money-management/outbound-setup-intents/create).",
        }),
        transfers: Schema.Literals([
          "disabled",
          "eligible",
          "ineligible",
          "invalid",
          "requires_action",
        ]).annotate({
          description:
            "Transfers status - used when making an OutboundTransfer (sending funds to yourself).\nIf disabled, enable the payout method by creating an OutboundSetupIntent using [`POST /v2/money_management/outbound_setup_intents`](https://docs.stripe.com/api/v2/money-management/outbound-setup-intents/create).",
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
        "Indicates whether the payout method has met the necessary requirements for outbound money movement.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Payout Method",
  description:
    "Use the PayoutMethods API to list and interact with PayoutMethod objects.",
  identifier: "Stripev2.money_management.payout_method",
});
export const Stripev2_money_management_payout_intent = Schema.StructWithRest(
  Schema.Struct({
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
    confirmation_method: Schema.Literals(["automatic", "manual"]).annotate({
      description:
        "Controls whether the PayoutIntent requires explicit confirmation before transitioning to `pending`.\nEven when `automatic`, regulatory requirements may require confirmation. See [Send money with Global Payouts](https://docs.stripe.com/global-payouts/send-money) for details.",
    }),
    created: Schema.String.annotate({
      description:
        "Time at which the PayoutIntent was created.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string attached to the PayoutIntent. Often useful for displaying to users.",
      }),
    ),
    estimated_fees: Schema.optionalKey(
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
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
            ).annotate({ description: "The fee amount." }),
            network_fee_details: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  network: Schema.Literals([
                    "ach",
                    "fedwire",
                    "fps",
                    "local",
                    "rtp",
                    "sepa",
                    "swift",
                  ]).annotate({
                    description: "The network associated with the fee.",
                  }),
                  network_options: Schema.StructWithRest(
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
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({
                          description: "ACH-specific network fee options.",
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
                    description: "Per-network options that affect the fee.",
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
                  "Details about the network and options associated with this fee. Present when `type` is `network_fee`.",
              }),
            ),
            tax_amount: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  currency: Schema.String.annotate({
                    description: "Currency code.",
                  }),
                  value_decimal: Schema.String.annotate({
                    description:
                      "Tax amount value represented as a decimal string in major units.",
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
                  "Tax charged for this fee, if applicable. Value expressed as a decimal string in major units.",
              }),
            ),
            type: Schema.Literals([
              "cross_border_fee",
              "foreign_exchange_fee",
              "instant_card_payout_fee",
              "network_fee",
              "next_day_payout_fee",
              "real_time_payout_fee",
              "standard_payout_fee",
              "wire_payout_fee",
            ]).annotate({ description: "Open Enum. The type of fee." }),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ),
      ).annotate({ description: "Estimated fees and taxes." }),
    ),
    from: Schema.StructWithRest(
      Schema.Struct({
        currency: Schema.String.annotate({
          description: "The currency of the financial account.",
        }),
        debited: Schema.optionalKey(
          Schema.StructWithRest(
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
            description:
              "Estimated amount to be debited from the financial account.",
          }),
        ),
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
    fx_quote: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          lock_duration: Schema.Literals(["five_minutes", "none"]).annotate({
            description: "Open Enum. Duration of the FX rate lock.",
          }),
          lock_expires_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp when the rate lock expires. Null when rate locking is not supported.",
              format: "date-time",
            }),
          ),
          lock_status: Schema.Literals(["active", "expired", "none"]).annotate({
            description: "Open Enum. Lock status of the FX rate.",
          }),
          rates: Schema.Record(
            Schema.String,
            Schema.StructWithRest(
              Schema.Struct({
                exchange_rate: Schema.String.annotate({
                  description:
                    "The exchange rate from the source currency to `to_currency`, represented as a decimal string\n(for example, `1.1520`) to preserve the full precision of the rate.",
                }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ),
          ).annotate({
            description:
              "Maps each source currency to its exchange rate into `to_currency`.",
          }),
          to_currency: Schema.String.annotate({
            description: "The destination currency.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "FX rate information for fee transparency." }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the PayoutIntent.",
    }),
    latest_payout: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          outbound_payment: Schema.optionalKey(
            Schema.String.annotate({
              description: "The ID of the OutboundPayment, if applicable.",
            }),
          ),
          outbound_transfer: Schema.optionalKey(
            Schema.String.annotate({
              description: "The ID of the OutboundTransfer, if applicable.",
            }),
          ),
          type: Schema.Literals([
            "outbound_payment",
            "outbound_transfer",
          ]).annotate({ description: "The type of payout." }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description:
          "Details about the latest payout associated with this PayoutIntent.",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
      }),
    ),
    next_action: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          confirm: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fields_to_review: Schema.optionalKey(
                  Schema.Array(
                    Schema.Literals([
                      "estimated_fees",
                      "fx_quote",
                      "recipient_verification",
                    ]),
                  ).annotate({
                    description:
                      "The PayoutIntent fields that must be reviewed before confirmation.",
                  }),
                ),
                reason: Schema.Literals([
                  "automatically_required",
                  "manually_requested",
                ]).annotate({
                  description:
                    "Open Enum. The reason the PayoutIntent requires confirmation.",
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
                "Details about a confirmation required. Populated when `type` is `confirm`.",
            }),
          ),
          handle_failure: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                failure_reason: Schema.Literals([
                  "account_not_configured_as_recipient",
                  "fx_rate_drift_exceeded_after_review",
                  "insufficient_funds",
                  "payout_method_account_type_incorrect",
                  "payout_method_amount_limit_exceeded",
                  "payout_method_canceled_by_customer",
                  "payout_method_closed",
                  "payout_method_currency_unsupported",
                  "payout_method_declined",
                  "payout_method_does_not_exist",
                  "payout_method_expired",
                  "payout_method_holder_address_incorrect",
                  "payout_method_holder_details_incorrect",
                  "payout_method_holder_name_incorrect",
                  "payout_method_invalid",
                  "payout_method_invalid_account_number",
                  "payout_method_restricted",
                  "payout_method_unsupported",
                  "payout_method_usage_frequency_limit_exceeded",
                  "recalled",
                  "recipient_capability_not_active",
                  "review_rejected",
                  "unknown_failure",
                ]).annotate({
                  description: "Open Enum. The reason for the failure.",
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
                "Details about a failure that requires user action. Populated when `type` is `handle_failure`.",
            }),
          ),
          type: Schema.Literals(["confirm", "handle_failure"]).annotate({
            description: "Open Enum. The type of next action required.",
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
          "Next action required for a PayoutIntent in the `requires_action` state. Populated when `status` is `requires_action`.",
      }),
    ),
    object: Schema.Literal("v2.money_management.payout_intent").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
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
    recipient_verification: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          match_result: Schema.Literals([
            "close_match",
            "match",
            "no_match",
            "unavailable",
          ]).annotate({
            description:
              "Closed Enum. The recipient-verification provider's match result.",
          }),
          match_result_details: Schema.StructWithRest(
            Schema.Struct({
              matched_business_type: Schema.optionalKey(
                Schema.Literals(["business", "personal"]).annotate({
                  description:
                    "The business type returned by the recipient-verification provider.",
                }),
              ),
              matched_name: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The account name returned by the recipient-verification provider.",
                }),
              ),
              message: Schema.String.annotate({
                description: "A message describing the match result.",
              }),
              provided_business_type: Schema.optionalKey(
                Schema.Literals(["business", "personal"]).annotate({
                  description:
                    "The business type provided for recipient verification.",
                }),
              ),
              provided_name: Schema.String.annotate({
                description: "The name associated with the provided recipient.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({
            description: "Details associated with the match result.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description: "Recipient verification details for this PayoutIntent.",
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
    status: Schema.Literals([
      "canceled",
      "pending",
      "posted",
      "processing",
      "requires_action",
    ]).annotate({ description: "Current status of the PayoutIntent." }),
    status_transitions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          canceled_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when a PayoutIntent changed status to `canceled`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
              format: "date-time",
            }),
          ),
          posted_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when a PayoutIntent changed status to `posted`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
              format: "date-time",
            }),
          ),
          processing_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when a PayoutIntent changed status to `processing`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
              format: "date-time",
            }),
          ),
          requires_action_at: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Timestamp describing when a PayoutIntent changed status to `requires_action`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
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
      ).annotate({
        description:
          "Hash containing timestamps of when transitioned to a particular status.",
      }),
    ),
    to: Schema.StructWithRest(
      Schema.Struct({
        credited: Schema.optionalKey(
          Schema.StructWithRest(
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
            description:
              "Estimated amount to be credited to the recipient in the destination currency.",
          }),
        ),
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Payout Intent",
  description:
    "PayoutIntent represents an intent to send funds from a Financial Account to a payout method.",
  identifier: "Stripev2.money_management.payout_intent",
});
export const Stripev2_money_management_recipient_verification =
  Schema.StructWithRest(
    Schema.Struct({
      consumed_by: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            outbound_payment: Schema.optionalKey(
              Schema.String.annotate({
                description:
                  "The ID of the OutboundPayment that consumed the RecipientVerification.",
              }),
            ),
            type: Schema.Literal("outbound_payment").annotate({
              description:
                "The type of resource that consumed the RecipientVerification.",
            }),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          description: "The resource that consumed this verification.",
        }),
      ),
      created: Schema.String.annotate({
        description:
          "Time at which the RecipientVerification was created.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
        format: "date-time",
      }),
      expires_at: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Time at which the RecipientVerification expires, 5 minutes after the creation. Only applicable for Verification of Payee (VoP) verifications.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
          format: "date-time",
        }),
      ),
      id: Schema.String.annotate({
        description: "The ID of the RecipientVerification.",
      }),
      livemode: Schema.Boolean.annotate({
        description:
          "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
      }),
      match_result: Schema.Literals([
        "close_match",
        "match",
        "no_match",
        "unavailable",
      ]).annotate({
        description:
          "Closed Enum. Match level of the RecipientVerification: `match`, `close_match`, `no_match`, `unavailable`.",
      }),
      match_result_details: Schema.StructWithRest(
        Schema.Struct({
          matched_business_type: Schema.optionalKey(
            Schema.Literals(["business", "personal"]).annotate({
              description:
                "The business type matched by the provider. Only present for Confirmation of Payee (CoP) verifications.",
            }),
          ),
          matched_name: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The account name associated with the bank account as provided by the VoP provider, only present if there is a match or close match.",
            }),
          ),
          message: Schema.String.annotate({
            description: "A message describing the match result.",
          }),
          provided_business_type: Schema.optionalKey(
            Schema.Literals(["business", "personal"]).annotate({
              description:
                "The business type provided by the user. Only present for Confirmation of Payee (CoP) verifications.",
            }),
          ),
          provided_name: Schema.String.annotate({
            description: "The name associated with the provided recipient.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Details for the match result." }),
      object: Schema.Literal(
        "v2.money_management.recipient_verification",
      ).annotate({
        description:
          "String representing the object's type. Objects of the same type share the same value of the object field.",
      }),
      payout_method: Schema.String.annotate({
        description: "ID of the payout method that was verified.",
      }),
      recipient: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the recipient account. Omitted for same-entity payouts.",
        }),
      ),
      status: Schema.Literals([
        "acknowledged",
        "awaiting_acknowledgement",
        "consumed",
        "expired",
        "verified",
      ]).annotate({
        description: "Current status of the recipient verification.",
      }),
      status_transitions: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            acknowledged_at: Schema.optionalKey(
              Schema.String.annotate({
                description:
                  "Timestamp describing when a RecipientVerification changed status to `acknowledged`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                format: "date-time",
              }),
            ),
            consumed_at: Schema.optionalKey(
              Schema.String.annotate({
                description:
                  "Timestamp describing when a RecipientVerification changed status to `consumed`.\nRepresented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
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
        ).annotate({
          description:
            "Hash containing timestamps of when the object transitioned to a particular status.",
        }),
      ),
      verification_type: Schema.Literals([
        "confirmation_of_payee",
        "verification_of_payee",
      ]).annotate({
        description:
          "Open Enum. The type of verification performed: `verification_of_payee`, `confirmation_of_payee`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Recipient Verification",
    description:
      "RecipientVerification represents a verification of recipient you intend to send funds to.",
    identifier: "Stripev2.money_management.recipient_verification",
  });
export const Stripeshipping = Schema.suspend(
  (): Schema.Codec<Stripeshipping> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(Stripeaddress),
        carrier: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        name: Schema.optionalKey(
          Schema.String.annotate({ description: "Recipient name." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Recipient phone (including extension).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        tracking_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Shipping",
      description: "",
      identifier: "Stripeshipping",
    }),
);
export const Stripefunding_instructions_bank_transfer_aba_record =
  Schema.suspend(
    (): Schema.Codec<Stripefunding_instructions_bank_transfer_aba_record> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_address: Stripeaddress,
          account_holder_name: Schema.String.annotate({
            description: "The account holder name",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          account_number: Schema.String.annotate({
            description: "The ABA account number",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          account_type: Schema.String.annotate({
            description: "The account type",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          bank_address: Stripeaddress,
          bank_name: Schema.String.annotate({
            description: "The bank name",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          routing_number: Schema.String.annotate({
            description: "The ABA routing number",
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
        title: "ABARecord",
        description:
          "ABA Records contain U.S. bank account details per the ABA format.",
        identifier: "Stripefunding_instructions_bank_transfer_aba_record",
      }),
  );
export const Stripefunding_instructions_bank_transfer_iban_record =
  Schema.suspend(
    (): Schema.Codec<Stripefunding_instructions_bank_transfer_iban_record> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_address: Stripeaddress,
          account_holder_name: Schema.String.annotate({
            description:
              "The name of the person or business that owns the bank account",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          bank_address: Stripeaddress,
          bic: Schema.String.annotate({
            description: "The BIC/SWIFT code of the account.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          country: Schema.String.annotate({
            description:
              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          iban: Schema.String.annotate({
            description: "The IBAN of the account.",
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
        title: "IbanRecord",
        description:
          "Iban Records contain E.U. bank account details per the SEPA format.",
        identifier: "Stripefunding_instructions_bank_transfer_iban_record",
      }),
  );
export const Stripefunding_instructions_bank_transfer_sort_code_record =
  Schema.suspend(
    (): Schema.Codec<Stripefunding_instructions_bank_transfer_sort_code_record> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_address: Stripeaddress,
          account_holder_name: Schema.String.annotate({
            description:
              "The name of the person or business that owns the bank account",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          account_number: Schema.String.annotate({
            description: "The account number",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          bank_address: Stripeaddress,
          sort_code: Schema.String.annotate({
            description: "The six-digit sort code",
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
        title: "SortCodeRecord",
        description:
          "Sort Code Records contain U.K. bank account details per the sort code format.",
        identifier: "Stripefunding_instructions_bank_transfer_sort_code_record",
      }),
  );
export const Stripefunding_instructions_bank_transfer_spei_record =
  Schema.suspend(
    (): Schema.Codec<Stripefunding_instructions_bank_transfer_spei_record> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_address: Stripeaddress,
          account_holder_name: Schema.String.annotate({
            description: "The account holder name",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          bank_address: Stripeaddress,
          bank_code: Schema.String.annotate({
            description: "The three-digit bank code",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          bank_name: Schema.String.annotate({
            description: "The short banking institution name",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          clabe: Schema.String.annotate({
            description: "The CLABE number",
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
        title: "SpeiRecord",
        description:
          "SPEI Records contain Mexico bank account details per the SPEI format.",
        identifier: "Stripefunding_instructions_bank_transfer_spei_record",
      }),
  );
export const Stripefunding_instructions_bank_transfer_swift_record =
  Schema.suspend(
    (): Schema.Codec<Stripefunding_instructions_bank_transfer_swift_record> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_address: Stripeaddress,
          account_holder_name: Schema.String.annotate({
            description: "The account holder name",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          account_number: Schema.String.annotate({
            description: "The account number",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          account_type: Schema.String.annotate({
            description: "The account type",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          bank_address: Stripeaddress,
          bank_name: Schema.String.annotate({
            description: "The bank name",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          swift_code: Schema.String.annotate({
            description: "The SWIFT code",
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
        title: "SWIFTRecord",
        description:
          "SWIFT Records contain U.S. bank account details per the SWIFT format.",
        identifier: "Stripefunding_instructions_bank_transfer_swift_record",
      }),
  );
export const Stripefunding_instructions_bank_transfer_zengin_record =
  Schema.suspend(
    (): Schema.Codec<Stripefunding_instructions_bank_transfer_zengin_record> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_address: Stripeaddress,
          account_holder_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The account holder name",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          account_number: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The account number",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          account_type: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The bank account type. In Japan, this can only be `futsu` or `toza`.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          bank_address: Stripeaddress,
          bank_code: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The bank code of the account",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          bank_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The bank name of the account",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          branch_code: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The branch code of the account",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          branch_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The branch name of the account",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "ZenginRecord",
        description:
          "Zengin Records contain Japan bank account details per the Zengin format.",
        identifier: "Stripefunding_instructions_bank_transfer_zengin_record",
      }),
  );
export const Stripelegal_entity_company_verification = Schema.suspend(
  (): Schema.Codec<Stripelegal_entity_company_verification> =>
    Schema.StructWithRest(
      Schema.Struct({
        document: Stripelegal_entity_company_verification_document,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "LegalEntityCompanyVerification",
      description: "",
      identifier: "Stripelegal_entity_company_verification",
    }),
);
export const Stripecash_balance = Schema.suspend(
  (): Schema.Codec<Stripecash_balance> =>
    Schema.StructWithRest(
      Schema.Struct({
        available: Schema.optionalKey(
          Schema.Union([
            Schema.Record(Schema.String, Schema.Int).annotate({
              description:
                "A hash of all cash balances available to this customer. You cannot delete a customer with any cash balances, even if the balance is 0. Amounts are represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
            }),
            Schema.Null,
          ]),
        ),
        customer: Schema.String.annotate({
          description:
            "The ID of the customer whose cash balance this object represents.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of an Account representing a customer whose cash balance this object represents.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("cash_balance").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        settings: Stripecustomer_balance_customer_balance_settings,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Cash balance",
      description:
        "A customer's `Cash balance` represents real funds. Customers can add funds to their cash balance by sending a bank transfer. These funds can be used for payment and can eventually be paid out to your bank account.",
      identifier: "Stripecash_balance",
    }),
);
export const Stripecoupon = Schema.suspend(
  (): Schema.Codec<Stripecoupon> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_off: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Amount (in the `currency` specified) that will be taken off the subtotal of any invoices for this customer.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        applies_to: Schema.optionalKey(Stripecoupon_applies_to),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If `amount_off` has been set, the three-letter [ISO code for the currency](https://stripe.com/docs/currencies) of the amount to take off.",
              format: "currency",
            }),
            Schema.Null,
          ]),
        ),
        currency_options: Schema.optionalKey(
          Schema.Record(Schema.String, Stripecoupon_currency_option).annotate({
            description:
              "Coupons defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
          }),
        ),
        duration: Schema.Literals(["forever", "once", "repeating"]).annotate({
          description:
            "One of `forever`, `once`, or `repeating`. Describes how long a customer who applies this coupon will get the discount.",
        }),
        duration_in_months: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If `duration` is `repeating`, the number of months the coupon applies. Null if coupon `duration` is `forever` or `once`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        max_redemptions: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Maximum number of times this coupon can be redeemed, in total, across all customers, before it is no longer valid.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Name of the coupon displayed to customers on for instance invoices or receipts.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("coupon").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        percent_off: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Percent that will be taken off the subtotal of any invoices for this customer for the duration of the coupon. For example, a coupon with percent_off of 50 will make a $ (or local equivalent)100 invoice $ (or local equivalent)50 instead.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        redeem_by: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date after which the coupon can no longer be redeemed.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        times_redeemed: Schema.Number.annotate({
          description:
            "Number of times this coupon has been applied to a customer.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        valid: Schema.Boolean.annotate({
          description:
            "Taking account of the above properties, whether this coupon can still be applied to a customer.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Coupon",
      description:
        "A coupon contains information about a percent-off or amount-off discount you\nmight want to apply to a customer. Coupons may be applied to [subscriptions](https://docs.stripe.com/api#subscriptions), [invoices](https://docs.stripe.com/api#invoices),\n[checkout sessions](https://docs.stripe.com/api/checkout/sessions), [quotes](https://docs.stripe.com/api#quotes), and more. Coupons do not work with conventional one-off [charges](/api/charges/create) or [payment intents](https://docs.stripe.com/api/payment_intents).",
      identifier: "Stripecoupon",
    }),
);
export const Stripepromotion_codes_resource_restrictions = Schema.suspend(
  (): Schema.Codec<Stripepromotion_codes_resource_restrictions> =>
    Schema.StructWithRest(
      Schema.Struct({
        currency_options: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Stripepromotion_code_currency_option,
          ).annotate({
            description:
              "Promotion code restrictions defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
          }),
        ),
        first_time_transaction: Schema.Boolean.annotate({
          description:
            "A Boolean indicating if the Promotion Code should only be redeemed for Customers without any successful payments or invoices",
        }),
        minimum_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Minimum amount required to redeem this Promotion Code into a Coupon (e.g., a purchase must be $100 or more to work).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        minimum_amount_currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Three-letter [ISO code](https://stripe.com/docs/currencies) for minimum_amount",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PromotionCodesResourceRestrictions",
      description: "",
      identifier: "Stripepromotion_codes_resource_restrictions",
    }),
);
export const Stripedeleted_external_account = Schema.suspend(
  (): Schema.Codec<Stripedeleted_external_account> =>
    Schema.Union([Stripedeleted_bank_account, Stripedeleted_card]).annotate({
      title: "Polymorphic",
      identifier: "Stripedeleted_external_account",
    }),
);
export const Stripedeleted_payment_source = Schema.suspend(
  (): Schema.Codec<Stripedeleted_payment_source> =>
    Schema.Union([Stripedeleted_bank_account, Stripedeleted_card]).annotate({
      title: "Polymorphic",
      identifier: "Stripedeleted_payment_source",
    }),
);
export const Stripetopup_resource_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripetopup_resource_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        us_bank_account: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetopup_resource_us_bank_account]).annotate({
              description:
                "If this top-up is to be used with a `us_bank_account` payment method, this sub-hash contains configuration for it.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "TopupResourcePaymentMethodOptions",
      description: "",
      identifier: "Stripetopup_resource_payment_method_options",
    }),
);
export const Stripeamazon_pay_underlying_payment_method_funding_details =
  Schema.suspend(
    (): Schema.Codec<Stripeamazon_pay_underlying_payment_method_funding_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Stripepayment_method_details_passthrough_card,
          ),
          type: Schema.optionalKey(
            Schema.Union([
              Schema.Literal("card").annotate({
                description: "funding type of the underlying payment method.",
              }),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "amazon_pay_underlying_payment_method_funding_details",
        description: "",
        identifier:
          "Stripeamazon_pay_underlying_payment_method_funding_details",
      }),
  );
export const Striperevolut_pay_underlying_payment_method_funding_details =
  Schema.suspend(
    (): Schema.Codec<Striperevolut_pay_underlying_payment_method_funding_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Stripepayment_method_details_passthrough_card,
          ),
          type: Schema.optionalKey(
            Schema.Union([
              Schema.Literal("card").annotate({
                description: "funding type of the underlying payment method.",
              }),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "revolut_pay_underlying_payment_method_funding_details",
        description: "",
        identifier:
          "Striperevolut_pay_underlying_payment_method_funding_details",
      }),
  );
export const Stripeklarna_payer_details = Schema.suspend(
  (): Schema.Codec<Stripeklarna_payer_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeklarna_address]).annotate({
              description: "The payer's address",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "klarna_payer_details",
      description: "",
      identifier: "Stripeklarna_payer_details",
    }),
);
export const Stripecheckout_customer_balance_bank_transfer_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripecheckout_customer_balance_bank_transfer_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          eu_bank_transfer: Schema.optionalKey(
            Stripepayment_method_options_customer_balance_eu_bank_account,
          ),
          requested_address_types: Schema.optionalKey(
            Schema.Array(
              Schema.Literals([
                "aba",
                "iban",
                "sepa",
                "sort_code",
                "spei",
                "swift",
                "zengin",
              ]),
            ).annotate({
              description:
                "List of address types that should be returned in the financial_addresses response. If not specified, all valid types will be returned.\n\nPermitted values include: `sort_code`, `zengin`, `iban`, or `spei`.",
            }),
          ),
          type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals([
                "eu_bank_transfer",
                "gb_bank_transfer",
                "jp_bank_transfer",
                "mx_bank_transfer",
                "us_bank_transfer",
              ]).annotate({
                description:
                  "The bank transfer type that this PaymentIntent is allowed to use for funding Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.",
              }),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "CheckoutCustomerBalanceBankTransferPaymentMethodOptions",
        description: "",
        identifier:
          "Stripecheckout_customer_balance_bank_transfer_payment_method_options",
      }),
  );
export const Stripecheckout_pix_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_pix_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_includes_iof: Schema.optionalKey(
          Schema.Literals(["always", "never"]).annotate({
            description: "Determines if the amount includes the IOF tax.",
          }),
        ),
        expires_after_seconds: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The number of seconds after which Pix payment will expire.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        mandate_options: Schema.optionalKey(
          Stripepayment_method_options_mandate_options_pix,
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
      title: "CheckoutPixPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_pix_payment_method_options",
    }),
);
export const Stripelinked_account_options_common = Schema.suspend(
  (): Schema.Codec<Stripelinked_account_options_common> =>
    Schema.StructWithRest(
      Schema.Struct({
        filters: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_financial_connections_common_linked_account_options_filters,
        ),
        permissions: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "balances",
              "ownership",
              "payment_method",
              "transactions",
            ]),
          ).annotate({
            description:
              "The list of permissions to request. The `payment_method` permission must be included.",
          }),
        ),
        prefetch: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals(["balances", "ownership", "transactions"]),
            ).annotate({
              description:
                "Data features requested to be retrieved upon account creation.",
            }),
            Schema.Null,
          ]),
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "linked_account_options_common",
      description: "",
      identifier: "Stripelinked_account_options_common",
    }),
);
export const Stripeautomatic_tax = Schema.suspend(
  (): Schema.Codec<Stripeautomatic_tax> =>
    Schema.StructWithRest(
      Schema.Struct({
        disabled_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "finalization_requires_location_inputs",
              "finalization_system_error",
            ]).annotate({
              description:
                "If Stripe disabled automatic tax, this enum describes why.",
            }),
            Schema.Null,
          ]),
        ),
        enabled: Schema.Boolean.annotate({
          description:
            "Whether Stripe automatically computes tax on this invoice. Note that incompatible invoice items (invoice items with manually specified [tax rates](https://docs.stripe.com/api/tax_rates), negative amounts, or `tax_behavior=unspecified`) cannot be added to automatic tax invoices.",
        }),
        liability: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeconnect_account_reference]).annotate({
              description:
                "The account that's liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.",
            }),
            Schema.Null,
          ]),
        ),
        provider: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The tax provider powering automatic tax.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "complete",
              "failed",
              "requires_location_inputs",
            ]).annotate({
              description:
                "The status of the most recent automated tax calculation for this invoice.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AutomaticTax",
      description: "",
      identifier: "Stripeautomatic_tax",
    }),
);
export const Stripeschedules_phase_automatic_tax = Schema.suspend(
  (): Schema.Codec<Stripeschedules_phase_automatic_tax> =>
    Schema.StructWithRest(
      Schema.Struct({
        disabled_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literal("requires_location_inputs").annotate({
              description:
                "If Stripe disabled automatic tax, this enum describes why.",
            }),
            Schema.Null,
          ]),
        ),
        enabled: Schema.Boolean.annotate({
          description:
            "Whether Stripe automatically computes tax on invoices created during this phase.",
        }),
        liability: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeconnect_account_reference]).annotate({
              description:
                "The account that's liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "SchedulesPhaseAutomaticTax",
      description: "",
      identifier: "Stripeschedules_phase_automatic_tax",
    }),
);
export const Stripequotes_resource_automatic_tax = Schema.suspend(
  (): Schema.Codec<Stripequotes_resource_automatic_tax> =>
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean.annotate({
          description: "Automatically calculate taxes",
        }),
        liability: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeconnect_account_reference]).annotate({
              description:
                "The account that's liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.",
            }),
            Schema.Null,
          ]),
        ),
        provider: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The tax provider powering automatic tax.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "complete",
              "failed",
              "requires_location_inputs",
            ]).annotate({
              description:
                "The status of the most recent automated tax calculation for this quote.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "QuotesResourceAutomaticTax",
      description: "",
      identifier: "Stripequotes_resource_automatic_tax",
    }),
);
export const Stripequotes_resource_subscription_data_billing_mode =
  Schema.suspend(
    (): Schema.Codec<Stripequotes_resource_subscription_data_billing_mode> =>
      Schema.StructWithRest(
        Schema.Struct({
          flexible: Schema.optionalKey(
            Stripesubscriptions_resource_billing_mode_flexible,
          ),
          type: Schema.Literals(["classic", "flexible"]).annotate({
            description:
              "Controls how prorations and invoices for subscriptions are calculated and orchestrated.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Billing Mode",
        description: "The billing mode of the quote.",
        identifier: "Stripequotes_resource_subscription_data_billing_mode",
      }),
  );
export const Stripecurrency_option = Schema.suspend(
  (): Schema.Codec<Stripecurrency_option> =>
    Schema.StructWithRest(
      Schema.Struct({
        custom_unit_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecustom_unit_amount]).annotate({
              description:
                "When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.",
            }),
            Schema.Null,
          ]),
        ),
        tax_behavior: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate(
              {
                description:
                  "Only required if a [default tax behavior](https://docs.stripe.com/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.",
              },
            ),
            Schema.Null,
          ]),
        ),
        tiers: Schema.optionalKey(
          Schema.Array(Stripeprice_tier).annotate({
            description:
              "Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.",
          }),
        ),
        unit_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The unit amount in cents (or local equivalent) to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        unit_amount_decimal: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The unit amount in cents (or local equivalent) to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.",
              format: "decimal",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CurrencyOption",
      description: "",
      identifier: "Stripecurrency_option",
    }),
);
export const Stripeshipping_rate_delivery_estimate = Schema.suspend(
  (): Schema.Codec<Stripeshipping_rate_delivery_estimate> =>
    Schema.StructWithRest(
      Schema.Struct({
        maximum: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeshipping_rate_delivery_estimate_bound,
            ]).annotate({
              description:
                "The upper bound of the estimated range. If empty, represents no upper bound i.e., infinite.",
            }),
            Schema.Null,
          ]),
        ),
        minimum: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeshipping_rate_delivery_estimate_bound,
            ]).annotate({
              description:
                "The lower bound of the estimated range. If empty, represents no lower bound.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ShippingRateDeliveryEstimate",
      description: "",
      identifier: "Stripeshipping_rate_delivery_estimate",
    }),
);
export const Stripeshipping_rate_fixed_amount = Schema.suspend(
  (): Schema.Codec<Stripeshipping_rate_fixed_amount> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "A non-negative integer in cents representing how much to charge.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        currency_options: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Stripeshipping_rate_currency_option,
          ).annotate({
            description:
              "Shipping rates defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
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
      title: "ShippingRateFixedAmount",
      description: "",
      identifier: "Stripeshipping_rate_fixed_amount",
    }),
);
export const Stripeexternal_account_requirements = Schema.suspend(
  (): Schema.Codec<Stripeexternal_account_requirements> =>
    Schema.StructWithRest(
      Schema.Struct({
        currently_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that need to be resolved to keep the external account enabled. If not resolved by `current_deadline`, these fields will appear in `past_due` as well, and the account is disabled.",
            }),
            Schema.Null,
          ]),
        ),
        errors: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_error).annotate({
              description:
                "Fields that are `currently_due` and need to be collected again because validation or verification failed.",
            }),
            Schema.Null,
          ]),
        ),
        past_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that haven't been resolved by `current_deadline`. These fields need to be resolved to enable the external account.",
            }),
            Schema.Null,
          ]),
        ),
        pending_verification: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that are being reviewed, or might become required depending on the results of a review. If the review fails, these fields can move to `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in `pending_verification` if one verification fails but another is still pending.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ExternalAccountRequirements",
      description: "",
      identifier: "Stripeexternal_account_requirements",
    }),
);
export const Stripeperson_future_requirements = Schema.suspend(
  (): Schema.Codec<Stripeperson_future_requirements> =>
    Schema.StructWithRest(
      Schema.Struct({
        alternatives: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_alternative).annotate({
              description:
                "Fields that are due and can be resolved by providing the corresponding alternative fields instead. Many alternatives can list the same `original_fields_due`, and any of these alternatives can serve as a pathway for attempting to resolve the fields again. Re-providing `original_fields_due` also serves as a pathway for attempting to resolve the fields again.",
            }),
            Schema.Null,
          ]),
        ),
        currently_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that need to be resolved to keep the person's account enabled. If not resolved by the account's `future_requirements[current_deadline]`, these fields will transition to the main `requirements` hash, and may immediately become `past_due`, but the account may also be given a grace period depending on the account's enablement state prior to transition.",
        }),
        errors: Schema.Array(Stripeaccount_requirements_error).annotate({
          description:
            "Fields that are `currently_due` and need to be collected again because validation or verification failed.",
        }),
        eventually_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields you must collect when all thresholds are reached. As they become required, they appear in `currently_due` as well, and the account's `future_requirements[current_deadline]` becomes set.",
        }),
        past_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that haven't been resolved by the account's `requirements.current_deadline`. These fields need to be resolved to enable the person's account. `future_requirements.past_due` is a subset of `requirements.past_due`.",
        }),
        pending_verification: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that are being reviewed, or might become required depending on the results of a review. If the review fails, these fields can move to `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in `pending_verification` if one verification fails but another is still pending.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PersonFutureRequirements",
      description: "",
      identifier: "Stripeperson_future_requirements",
    }),
);
export const Stripeperson_requirements = Schema.suspend(
  (): Schema.Codec<Stripeperson_requirements> =>
    Schema.StructWithRest(
      Schema.Struct({
        alternatives: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_alternative).annotate({
              description:
                "Fields that are due and can be resolved by providing the corresponding alternative fields instead. Many alternatives can list the same `original_fields_due`, and any of these alternatives can serve as a pathway for attempting to resolve the fields again. Re-providing `original_fields_due` also serves as a pathway for attempting to resolve the fields again.",
            }),
            Schema.Null,
          ]),
        ),
        currently_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that need to be resolved to keep the person's account enabled. If not resolved by the account's `current_deadline`, these fields will appear in `past_due` as well, and the account is disabled.",
        }),
        errors: Schema.Array(Stripeaccount_requirements_error).annotate({
          description:
            "Fields that are `currently_due` and need to be collected again because validation or verification failed.",
        }),
        eventually_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields you must collect when all thresholds are reached. As they become required, they appear in `currently_due` as well, and the account's `current_deadline` becomes set.",
        }),
        past_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that haven't been resolved by `current_deadline`. These fields need to be resolved to enable the person's account.",
        }),
        pending_verification: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that are being reviewed, or might become required depending on the results of a review. If the review fails, these fields can move to `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in `pending_verification` if one verification fails but another is still pending.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PersonRequirements",
      description: "",
      identifier: "Stripeperson_requirements",
    }),
);
export const Stripeperson_additional_tos_acceptances = Schema.suspend(
  (): Schema.Codec<Stripeperson_additional_tos_acceptances> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeperson_additional_tos_acceptance]).annotate({
              description:
                "Details on the legal guardian's acceptance of the main Stripe service agreement.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PersonAdditionalTOSAcceptances",
      description: "",
      identifier: "Stripeperson_additional_tos_acceptances",
    }),
);
export const Stripeperson_us_cfpb_data = Schema.suspend(
  (): Schema.Codec<Stripeperson_us_cfpb_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        ethnicity_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeperson_ethnicity_details]).annotate({
              description: "The persons ethnicity details",
            }),
            Schema.Null,
          ]),
        ),
        race_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeperson_race_details]).annotate({
              description: "The persons race details",
            }),
            Schema.Null,
          ]),
        ),
        self_identified_gender: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The persons self-identified gender",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PersonUSCfpbData",
      description: "",
      identifier: "Stripeperson_us_cfpb_data",
    }),
);
export const Stripelegal_entity_person_verification = Schema.suspend(
  (): Schema.Codec<Stripelegal_entity_person_verification> =>
    Schema.StructWithRest(
      Schema.Struct({
        additional_document: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripelegal_entity_person_verification_document,
            ]).annotate({
              description:
                "A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.",
            }),
            Schema.Null,
          ]),
        ),
        details: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                'A user-displayable string describing the verification state for the person. For example, this may say "Provided identity information could not be verified".',
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        details_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "One of `document_address_mismatch`, `document_dob_mismatch`, `document_duplicate_type`, `document_id_number_mismatch`, `document_name_mismatch`, `document_nationality_mismatch`, `failed_keyed_identity`, or `failed_other`. A machine-readable code specifying the verification state for the person.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        document: Schema.optionalKey(
          Stripelegal_entity_person_verification_document,
        ),
        status: Schema.String.annotate({
          description:
            "The state of verification for the person. Possible values are `unverified`, `pending`, or `verified`. Please refer [guide](https://docs.stripe.com/connect/handling-api-verification) to handle verification updates.",
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
      title: "LegalEntityPersonVerification",
      description: "",
      identifier: "Stripelegal_entity_person_verification",
    }),
);
export const Stripeapps_install = Schema.suspend(
  (): Schema.Codec<Stripeapps_install> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.String.annotate({
          description: "The ID of the account that the app install belongs to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        app: Schema.String.annotate({
          description: "The ID of the app installed.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        approval_required: Schema.Boolean.annotate({
          description:
            "Whether the installer must authorize pending permissions, content security policy entries, or endpoints. For private apps, `approval_required` stays `false`; creating or reauthorizing the install through the API installs the newest completed upload and grants its permissions.",
        }),
        auth_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The authorization code for an oauth app install.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        channel: Schema.Literals([
          "private_live",
          "private_test",
          "public",
          "review",
          "testing",
        ]).annotate({
          description:
            "The distribution channel associated with the app install.",
        }),
        content_security_policy_granted:
          Stripeapp_service_resource_install_content_security_policy,
        content_security_policy_pending:
          Stripeapp_service_resource_install_content_security_policy,
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        created_by: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the embedding platform that created the install, if applicable.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        endpoints_granted: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description: "The endpoint URLs authorized by the installer.",
        }),
        endpoints_pending: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "The endpoint URLs requested by the latest app version that the installer has not authorized.",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("apps.install").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        permissions_granted: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description: "The permissions authorized by the installer.",
        }),
        permissions_pending: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "The permissions requested by the latest app version that the installer has not authorized.",
        }),
        status: Schema.Literals([
          "install_failed",
          "installed",
          "installing",
          "uninstall_failed",
          "uninstalling",
        ]).annotate({ description: "The status of the app install." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "App Install",
      description:
        "An app install represents a Stripe App that is installed on an account. It reports the permissions,\ncontent security policy entries, and endpoints that the installing account has authorized, along with any\nthat the app's latest version requests but the account has not authorized yet. Use the Install API to\ninstall, reauthorize, and uninstall apps, and to check the state of existing installs.",
      identifier: "Stripeapps.install",
    }),
);
export const Stripecheckout_acss_debit_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_acss_debit_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        currency: Schema.optionalKey(
          Schema.Literals(["cad", "usd"]).annotate({
            description:
              "Currency supported by the bank account. Returned when the Session is in `setup` mode.",
          }),
        ),
        mandate_options: Schema.optionalKey(
          Stripecheckout_acss_debit_mandate_options,
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session", "on_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
          }),
        ),
        target_date: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Controls when Stripe will attempt to debit the funds from the customer's account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        verification_method: Schema.optionalKey(
          Schema.Literals(["automatic", "instant", "microdeposits"]).annotate({
            description:
              "Bank account verification method. The default value is `automatic`.",
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
      title: "CheckoutAcssDebitPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_acss_debit_payment_method_options",
    }),
);
export const Stripecheckout_bacs_debit_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_bacs_debit_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripecheckout_payment_method_options_mandate_options_bacs_debit,
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session", "on_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
          }),
        ),
        target_date: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Controls when Stripe will attempt to debit the funds from the customer's account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CheckoutBacsDebitPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_bacs_debit_payment_method_options",
    }),
);
export const Stripecheckout_card_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_card_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        capture_method: Schema.optionalKey(
          Schema.Literal("manual").annotate({
            description:
              "Controls when the funds will be captured from the customer's account.",
          }),
        ),
        installments: Schema.optionalKey(
          Stripecheckout_card_installments_options,
        ),
        request_extended_authorization: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to [capture beyond the standard authorization validity window](/payments/extended-authorization) for this CheckoutSession.",
          }),
        ),
        request_incremental_authorization: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to [increment the authorization](/payments/incremental-authorization) for this CheckoutSession.",
          }),
        ),
        request_multicapture: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to make [multiple captures](/payments/multicapture) for this CheckoutSession.",
          }),
        ),
        request_overcapture: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to [overcapture](/payments/overcapture) for this CheckoutSession.",
          }),
        ),
        request_three_d_secure: Schema.Literals([
          "any",
          "automatic",
          "challenge",
        ]).annotate({
          description:
            "We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. If not provided, this value defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/payments/3d-secure/authentication-flow#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.",
        }),
        restrictions: Schema.optionalKey(
          Stripepayment_pages_private_card_payment_method_options_resource_restrictions,
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session", "on_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
          }),
        ),
        statement_descriptor_suffix_kana: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Provides information about a card payment that customers see on their statements. Concatenated with the Kana prefix (shortened Kana descriptor) or Kana statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 22 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 22 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        statement_descriptor_suffix_kanji: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Provides information about a card payment that customers see on their statements. Concatenated with the Kanji prefix (shortened Kanji descriptor) or Kanji statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 17 characters. On card statements, the *concatenation* of both prefix and suffix (including separators) will appear truncated to 17 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CheckoutCardPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_card_payment_method_options",
    }),
);
export const Stripecheckout_payto_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_payto_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(Stripemandate_options_payto),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
      title: "CheckoutPaytoPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_payto_payment_method_options",
    }),
);
export const Stripecheckout_sepa_debit_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_sepa_debit_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripecheckout_payment_method_options_mandate_options_sepa_debit,
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session", "on_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
          }),
        ),
        target_date: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Controls when Stripe will attempt to debit the funds from the customer's account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CheckoutSepaDebitPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_sepa_debit_payment_method_options",
    }),
);
export const Stripecheckout_upi_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_upi_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(Stripemandate_options_upi),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session", "on_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
      title: "CheckoutUPIPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_upi_payment_method_options",
    }),
);
export const Stripecheckout_financial_connections_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripecheckout_financial_connections_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          filters: Schema.optionalKey(
            Stripecheckout_financial_connections_payment_method_options_filters,
          ),
          permissions: Schema.optionalKey(
            Schema.Array(
              Schema.Literals([
                "balances",
                "ownership",
                "payment_method",
                "transactions",
              ]),
            ).annotate({
              description:
                "The list of permissions to request. The `payment_method` permission must be included.",
            }),
          ),
          prefetch: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.Literals(["balances", "ownership", "transactions"]),
              ).annotate({
                description:
                  "Data features requested to be retrieved upon account creation.",
              }),
              Schema.Null,
            ]),
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
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "CheckoutFinancialConnectionsPaymentMethodOptions",
        description: "",
        identifier:
          "Stripecheckout_financial_connections_payment_method_options",
      }),
  );
export const Stripecheckout_session_wallet_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_session_wallet_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        link: Schema.optionalKey(Stripecheckout_link_wallet_options),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CheckoutSessionWalletOptions",
      description: "",
      identifier: "Stripecheckout_session_wallet_options",
    }),
);
export const Stripeclimate_supplier = Schema.suspend(
  (): Schema.Codec<Stripeclimate_supplier> =>
    Schema.StructWithRest(
      Schema.Struct({
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        info_url: Schema.String.annotate({
          description: "Link to a webpage to learn more about the supplier.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
        }),
        locations: Schema.Array(Stripeclimate_removals_location).annotate({
          description: "The locations in which this supplier operates.",
        }),
        name: Schema.String.annotate({
          description: "Name of this carbon removal supplier.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("climate.supplier").annotate({
          description:
            "String representing the object’s type. Objects of the same type share the same value.",
        }),
        removal_pathway: Schema.Literals([
          "biomass_carbon_removal_and_storage",
          "direct_air_capture",
          "enhanced_weathering",
          "marine_carbon_removal",
        ]).annotate({
          description: "The scientific pathway used for carbon removal.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Climate supplier",
      description: "A supplier of carbon removal.",
      identifier: "Stripeclimate.supplier",
    }),
);
export const Stripecredit_note_refund = Schema.suspend(
  (): Schema.Codec<Stripecredit_note_refund> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_refunded: Schema.Number.annotate({
          description:
            "Amount of the refund that applies to this credit note, in cents (or local equivalent).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        payment_record_refund: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecredit_notes_payment_record_refund]).annotate({
              description:
                "The PaymentRecord refund details associated with this credit note refund.",
            }),
            Schema.Null,
          ]),
        ),
        refund: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Striperefund,
        ]).annotate({ description: "ID of the refund." }),
        type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["payment_record_refund", "refund"]).annotate({
              description:
                "Type of the refund, one of `refund` or `payment_record_refund`.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Credit Note Refund",
      description: "",
      identifier: "Stripecredit_note_refund",
    }),
);
export const Stripefinancial_connections_account_ownership = Schema.suspend(
  (): Schema.Codec<Stripefinancial_connections_account_ownership> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal(
          "financial_connections.account_ownership",
        ).annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        owners: Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(
              Stripefinancial_connections_account_owner,
            ).annotate({ description: "Details about each object." }),
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
          title: "BankConnectionsResourceOwnerList",
          description: "A paginated list of owners for this account.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Account Ownership",
      description:
        "Describes a snapshot of the owners of an account at a particular point in time.",
      identifier: "Stripefinancial_connections.account_ownership",
    }),
);
export const Stripeforwarded_request_details = Schema.suspend(
  (): Schema.Codec<Stripeforwarded_request_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        body: Schema.String.annotate({
          description: "The body payload to send to the destination endpoint.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        headers: Schema.Array(Stripeforwarded_request_header).annotate({
          description:
            "The headers to include in the forwarded request. Can be omitted if no additional headers (excluding Stripe-generated ones such as the Content-Type header) should be included.",
        }),
        http_method: Schema.Literal("POST").annotate({
          description: "The HTTP method used to call the destination endpoint.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ForwardedRequestDetail",
      description:
        "Details about the request forwarded to the destination endpoint.",
      identifier: "Stripeforwarded_request_details",
    }),
);
export const Stripeforwarded_response_details = Schema.suspend(
  (): Schema.Codec<Stripeforwarded_response_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        body: Schema.String.annotate({
          description:
            "The response body from the destination endpoint to Stripe.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        headers: Schema.Array(Stripeforwarded_request_header).annotate({
          description: "HTTP headers that the destination endpoint returned.",
        }),
        status: Schema.Number.annotate({
          description:
            "The HTTP status code that the destination endpoint returned.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ForwardedResponseDetail",
      description: "Details about the response from the destination endpoint.",
      identifier: "Stripeforwarded_response_details",
    }),
);
export const Stripegelato_document_report = Schema.suspend(
  (): Schema.Codec<Stripegelato_document_report> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description: "Address as it appears in the document.",
            }),
            Schema.Null,
          ]),
        ),
        dob: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripegelato_data_document_report_date_of_birth,
            ]).annotate({
              description: "Date of birth as it appears in the document.",
            }),
            Schema.Null,
          ]),
        ),
        error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_document_report_error]).annotate({
              description:
                "Details on the verification error. Present when status is `unverified`.",
            }),
            Schema.Null,
          ]),
        ),
        expiration_date: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripegelato_data_document_report_expiration_date,
            ]).annotate({ description: "Expiration date of the document." }),
            Schema.Null,
          ]),
        ),
        files: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Array of [File](https://docs.stripe.com/api/files) ids containing images for this document.",
            }),
            Schema.Null,
          ]),
        ),
        first_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "First name as it appears in the document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        issued_date: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripegelato_data_document_report_issued_date,
            ]).annotate({ description: "Issued date of the document." }),
            Schema.Null,
          ]),
        ),
        issuing_country: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Issuing country of the document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        last_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Last name as it appears in the document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Document ID number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        sex: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "[redacted]",
              "female",
              "male",
              "unknown",
            ]).annotate({ description: "Sex of the person in the document." }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["unverified", "verified"]).annotate({
          description: "Status of this `document` check.",
        }),
        type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "driving_license",
              "id_card",
              "passport",
            ]).annotate({ description: "Type of the document." }),
            Schema.Null,
          ]),
        ),
        unparsed_place_of_birth: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Place of birth as it appears in the document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        unparsed_sex: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Sex as it appears in the document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DocumentCheckResult",
      description: "Result from a document check",
      identifier: "Stripegelato_document_report",
    }),
);
export const Stripegelato_email_report = Schema.suspend(
  (): Schema.Codec<Stripegelato_email_report> =>
    Schema.StructWithRest(
      Schema.Struct({
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Email to be verified.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_email_report_error]).annotate({
              description:
                "Details on the verification error. Present when status is `unverified`.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["unverified", "verified"]).annotate({
          description: "Status of this `email` check.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "EmailCheckResult",
      description: "Result from a email check",
      identifier: "Stripegelato_email_report",
    }),
);
export const Stripegelato_id_number_report = Schema.suspend(
  (): Schema.Codec<Stripegelato_id_number_report> =>
    Schema.StructWithRest(
      Schema.Struct({
        dob: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_data_id_number_report_date]).annotate({
              description: "Date of birth.",
            }),
            Schema.Null,
          ]),
        ),
        error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_id_number_report_error]).annotate({
              description:
                "Details on the verification error. Present when status is `unverified`.",
            }),
            Schema.Null,
          ]),
        ),
        first_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "First name." }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID number. When `id_number_type` is `us_ssn`, only the last 4 digits are present.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id_number_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["br_cpf", "sg_nric", "us_ssn"]).annotate({
              description: "Type of ID number.",
            }),
            Schema.Null,
          ]),
        ),
        last_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Last name." }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["unverified", "verified"]).annotate({
          description: "Status of this `id_number` check.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "IdNumberCheckResult",
      description: "Result from an id_number check",
      identifier: "Stripegelato_id_number_report",
    }),
);
export const Stripegelato_verification_report_options = Schema.suspend(
  (): Schema.Codec<Stripegelato_verification_report_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        document: Schema.optionalKey(Stripegelato_report_document_options),
        id_number: Schema.optionalKey(Stripegelato_report_id_number_options),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "GelatoVerificationReportOptions",
      description: "",
      identifier: "Stripegelato_verification_report_options",
    }),
);
export const Stripegelato_phone_report = Schema.suspend(
  (): Schema.Codec<Stripegelato_phone_report> =>
    Schema.StructWithRest(
      Schema.Struct({
        error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_phone_report_error]).annotate({
              description:
                "Details on the verification error. Present when status is `unverified`.",
            }),
            Schema.Null,
          ]),
        ),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Phone to be verified.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["unverified", "verified"]).annotate({
          description: "Status of this `phone` check.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PhoneCheckResult",
      description: "Result from a phone check",
      identifier: "Stripegelato_phone_report",
    }),
);
export const Stripegelato_selfie_report = Schema.suspend(
  (): Schema.Codec<Stripegelato_selfie_report> =>
    Schema.StructWithRest(
      Schema.Struct({
        document: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the [File](https://docs.stripe.com/api/files) holding the image of the identity document used in this check.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_selfie_report_error]).annotate({
              description:
                "Details on the verification error. Present when status is `unverified`.",
            }),
            Schema.Null,
          ]),
        ),
        selfie: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the [File](https://docs.stripe.com/api/files) holding the image of the selfie used in this check.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["unverified", "verified"]).annotate({
          description: "Status of this `selfie` check.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "SelfieCheckResult",
      description: "Result from a selfie check",
      identifier: "Stripegelato_selfie_report",
    }),
);
export const Stripegelato_verification_session_options = Schema.suspend(
  (): Schema.Codec<Stripegelato_verification_session_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        document: Schema.optionalKey(Stripegelato_session_document_options),
        email: Schema.optionalKey(Stripegelato_session_email_options),
        id_number: Schema.optionalKey(Stripegelato_session_id_number_options),
        matching: Schema.optionalKey(Stripegelato_session_matching_options),
        phone: Schema.optionalKey(Stripegelato_session_phone_options),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "GelatoVerificationSessionOptions",
      description: "",
      identifier: "Stripegelato_verification_session_options",
    }),
);
export const Stripegelato_verified_outputs = Schema.suspend(
  (): Schema.Codec<Stripegelato_verified_outputs> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description: "The user's verified address.",
            }),
            Schema.Null,
          ]),
        ),
        dob: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_data_verified_outputs_date]).annotate({
              description: "The user’s verified date of birth.",
            }),
            Schema.Null,
          ]),
        ),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The user's verified email address",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        first_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The user's verified first name.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The user's verified id number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id_number_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["br_cpf", "sg_nric", "us_ssn"]).annotate({
              description: "The user's verified id number type.",
            }),
            Schema.Null,
          ]),
        ),
        last_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The user's verified last name.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The user's verified phone number",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        sex: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "[redacted]",
              "female",
              "male",
              "unknown",
            ]).annotate({ description: "The user's verified sex." }),
            Schema.Null,
          ]),
        ),
        unparsed_place_of_birth: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The user's verified place of birth as it appears in the document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        unparsed_sex: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The user's verified sex as it appears in the document.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "GelatoVerifiedOutputs",
      description: "",
      identifier: "Stripegelato_verified_outputs",
    }),
);
export const Striperadar_value_list = Schema.suspend(
  (): Schema.Codec<Striperadar_value_list> =>
    Schema.StructWithRest(
      Schema.Struct({
        alias: Schema.String.annotate({
          description: "The name of the value list for use in rules.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        created_by: Schema.String.annotate({
          description:
            "The name or email address of the user who created this value list.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        item_type: Schema.Literals([
          "account",
          "card_bin",
          "card_fingerprint",
          "case_sensitive_string",
          "country",
          "crypto_fingerprint",
          "customer_id",
          "email",
          "ip_address",
          "sepa_debit_fingerprint",
          "string",
          "us_bank_account_fingerprint",
        ]).annotate({
          description:
            "The type of items in the value list. One of `card_fingerprint`, `card_bin`, `crypto_fingerprint`, `email`, `ip_address`, `country`, `string`, `case_sensitive_string`, `customer_id`, `account`, `sepa_debit_fingerprint`, or `us_bank_account_fingerprint`.",
        }),
        list_items: Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(Striperadar_value_list_item).annotate({
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
          title: "RadarListListItemList",
          description: "List of items contained within this value list.",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        name: Schema.String.annotate({
          description: "The name of the value list.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("radar.value_list").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Value List",
      description:
        "Value lists allow you to group values together which can then be referenced in rules.\n\nRelated guide: [Default Stripe lists](https://docs.stripe.com/radar/lists#managing-list-items)",
      identifier: "Striperadar.value_list",
    }),
);
export const Stripereporting_report_run = Schema.suspend(
  (): Schema.Codec<Stripereporting_report_run> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        error: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If something should go wrong during the run, a message about the failure (populated when\n `status=failed`).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "`true` if the report is run on live mode data and `false` if it is run on test mode data.",
        }),
        object: Schema.Literal("reporting.report_run").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        parameters: Stripefinancial_reporting_finance_report_run_run_parameters,
        report_type: Schema.String.annotate({
          description:
            'The ID of the [report type](https://docs.stripe.com/reports/report-types) to run, such as `"balance.summary.1"`.',
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        result: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripefile]).annotate({
              description:
                "The file object representing the result of the report run (populated when\n `status=succeeded`).",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.String.annotate({
          description:
            "Status of this report run. This will be `pending` when the run is initially created.\n When the run finishes, this will be set to `succeeded` and the `result` field will be populated.\n Rarely, we may encounter an error, at which point this will be set to `failed` and the `error` field will be populated.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        succeeded_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Timestamp at which this run successfully finished (populated when\n `status=succeeded`). Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Report Run",
      description:
        "The Report Run object represents an instance of a report type generated with\nspecific run parameters. Once the object is created, Stripe begins processing the report.\nWhen the report has finished running, it will give you a reference to a file\nwhere you can retrieve your results. For an overview, see\n[API Access to Reports](https://docs.stripe.com/reporting/statements/api).\n\nNote that certain report types can only be run based on your live-mode data (not test-mode\ndata), and will error when queried without a [live-mode API key](https://docs.stripe.com/keys#test-live-modes).",
      identifier: "Stripereporting.report_run",
    }),
);
export const Stripeterminal_configuration_configuration_resource_tipping =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_configuration_configuration_resource_tipping> =>
      Schema.StructWithRest(
        Schema.Struct({
          aed: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          aud: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          cad: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          chf: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          czk: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          dkk: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          eur: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          gbp: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          gip: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          hkd: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          huf: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          jpy: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          mxn: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          myr: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          nok: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          nzd: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          pln: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          ron: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          sek: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          sgd: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
          usd: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_currency_specific_config,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TerminalConfigurationConfigurationResourceTipping",
        description: "",
        identifier:
          "Stripeterminal_configuration_configuration_resource_tipping",
      }),
  );
export const Stripeterminal_configuration_configuration_resource_wifi_config =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_configuration_configuration_resource_wifi_config> =>
      Schema.StructWithRest(
        Schema.Struct({
          enterprise_eap_peap: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_enterprise_peap_wifi,
          ),
          enterprise_eap_tls: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_enterprise_tls_wifi,
          ),
          personal_psk: Schema.optionalKey(
            Stripeterminal_configuration_configuration_resource_personal_psk_wifi,
          ),
          type: Schema.Literals([
            "enterprise_eap_peap",
            "enterprise_eap_tls",
            "personal_psk",
          ]).annotate({
            description:
              "Security type of the WiFi network. The hash with the corresponding name contains the credentials for this security type.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TerminalConfigurationConfigurationResourceWifiConfig",
        description: "",
        identifier:
          "Stripeterminal_configuration_configuration_resource_wifi_config",
      }),
  );
export const Stripeterminal_location = Schema.suspend(
  (): Schema.Codec<Stripeterminal_location> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Stripeaddress_api_resource_terminal,
        address_kana: Schema.optionalKey(Stripelegal_entity_japan_address),
        address_kanji: Schema.optionalKey(Stripelegal_entity_japan_address),
        configuration_overrides: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The ID of a configuration that will be used to customize all readers in this location.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        display_name: Schema.String.annotate({
          description: "The display name of the location.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        display_name_kana: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The Kana variation of the display name of the location.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        display_name_kanji: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The Kanji variation of the display name of the location.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        object: Schema.Literal("terminal.location").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        phone: Schema.optionalKey(
          Schema.String.annotate({
            description: "The phone number of the location.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Location",
      description:
        "A Location represents a grouping of readers.\n\nRelated guide: [Fleet management](https://docs.stripe.com/terminal/fleet/locations)",
      identifier: "Stripeterminal.location",
    }),
);
export const Stripeterminal_reader_reader_resource_selection = Schema.suspend(
  (): Schema.Codec<Stripeterminal_reader_reader_resource_selection> =>
    Schema.StructWithRest(
      Schema.Struct({
        choices: Schema.Array(
          Stripeterminal_reader_reader_resource_choice,
        ).annotate({ description: "List of possible choices to be selected" }),
        id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The id of the selected choice",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        text: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The text of the selected choice",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Selection",
      description:
        "Information about a selection being collected using a reader",
      identifier: "Stripeterminal_reader_reader_resource_selection",
    }),
);
export const Stripeterminal_reader_reader_resource_collect_config =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_collect_config> =>
      Schema.StructWithRest(
        Schema.Struct({
          enable_customer_cancellation: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Enable customer-initiated cancellation when processing this payment.",
            }),
          ),
          skip_tipping: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Override showing a tipping selection screen on this transaction.",
            }),
          ),
          tipping: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_tipping_config,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "CollectConfig",
        description:
          "Represents a per-transaction override of a reader configuration",
        identifier: "Stripeterminal_reader_reader_resource_collect_config",
      }),
  );
export const Stripeterminal_reader_reader_resource_process_config =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_process_config> =>
      Schema.StructWithRest(
        Schema.Struct({
          enable_customer_cancellation: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Enable customer-initiated cancellation when processing this payment.",
            }),
          ),
          return_url: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "If the customer doesn't abandon authenticating the payment, they're redirected to this URL after completion.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          skip_tipping: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Override showing a tipping selection screen on this transaction.",
            }),
          ),
          tipping: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_tipping_config,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "ProcessConfig",
        description:
          "Represents a per-transaction override of a reader configuration",
        identifier: "Stripeterminal_reader_reader_resource_process_config",
      }),
  );
export const Stripeterminal_reader_reader_resource_confirm_payment_intent_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_confirm_payment_intent_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          confirm_config: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_confirm_config,
          ),
          payment_intent: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripepayment_intent,
          ]).annotate({
            description: "Most recent PaymentIntent processed by the reader.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "ConfirmPaymentIntentReaderAction",
        description: "Represents a reader action to confirm a payment",
        identifier:
          "Stripeterminal_reader_reader_resource_confirm_payment_intent_action",
      }),
  );
export const Stripeterminal_reader_reader_resource_print_content =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_print_content> =>
      Schema.StructWithRest(
        Schema.Struct({
          image: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_file_metadata,
          ),
          type: Schema.Literal("image").annotate({
            description:
              "The type of content to print. Currently supports `image`.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PrintContent",
        description: "Represents a reader action to print content",
        identifier: "Stripeterminal_reader_reader_resource_print_content",
      }),
  );
export const Stripeterminal_reader_reader_resource_process_setup_intent_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_process_setup_intent_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          generated_card: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "ID of a card PaymentMethod generated from the card_present PaymentMethod that may be attached to a Customer for future transactions. Only present if it was possible to generate a card PaymentMethod.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          process_config: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_process_setup_config,
          ),
          setup_intent: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripesetup_intent,
          ]).annotate({
            description: "Most recent SetupIntent processed by the reader.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "ProcessSetupIntentReaderAction",
        description: "Represents a reader action to process a setup intent",
        identifier:
          "Stripeterminal_reader_reader_resource_process_setup_intent_action",
      }),
  );
export const Stripeterminal_reader_reader_resource_refund_payment_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_refund_payment_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(
            Schema.Number.annotate({
              description: "The amount being refunded.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
          ),
          charge: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecharge,
            ]).annotate({ description: "Charge that is being refunded." }),
          ),
          metadata: Schema.optionalKey(
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
          ),
          payment_intent: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripepayment_intent,
            ]).annotate({
              description: "Payment intent that is being refunded.",
            }),
          ),
          reason: Schema.optionalKey(
            Schema.Literals([
              "duplicate",
              "fraudulent",
              "requested_by_customer",
            ]).annotate({ description: "The reason for the refund." }),
          ),
          refund: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Striperefund,
            ]).annotate({
              description: "Unique identifier for the refund object.",
            }),
          ),
          refund_application_fee: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Boolean indicating whether the application fee should be refunded when refunding this charge. If a full charge refund is given, the full application fee will be refunded. Otherwise, the application fee will be refunded in an amount proportional to the amount of the charge refunded. An application fee can be refunded only by the application that created the charge.",
            }),
          ),
          refund_payment_config: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_refund_payment_config,
          ),
          reverse_transfer: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Boolean indicating whether the transfer should be reversed when refunding this charge. The transfer will be reversed proportionally to the amount being refunded (either the entire or partial amount). A transfer can be reversed only by the application that created the charge.",
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
        title: "RefundPaymentReaderAction",
        description: "Represents a reader action to refund a payment",
        identifier:
          "Stripeterminal_reader_reader_resource_refund_payment_action",
      }),
  );
export const Stripeterminal_reader_reader_resource_cart = Schema.suspend(
  (): Schema.Codec<Stripeterminal_reader_reader_resource_cart> =>
    Schema.StructWithRest(
      Schema.Struct({
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        line_items: Schema.Array(
          Stripeterminal_reader_reader_resource_line_item,
        ).annotate({ description: "List of line items in the cart." }),
        tax: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Tax amount for the entire cart. A positive integer in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        total: Schema.Number.annotate({
          description:
            "Total amount for the entire cart, including tax. A positive integer in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CartItem",
      description: "Represents a cart to be displayed on the reader",
      identifier: "Stripeterminal_reader_reader_resource_cart",
    }),
);
export const Stripethree_d_secure_standalone_resource_channel = Schema.suspend(
  (): Schema.Codec<Stripethree_d_secure_standalone_resource_channel> =>
    Schema.StructWithRest(
      Schema.Struct({
        browser: Schema.optionalKey(
          Stripethree_d_secure_standalone_resource_browser_details,
        ),
        three_r_i: Schema.optionalKey(
          Stripethree_d_secure_standalone_resource_three_ri_details,
        ),
        type: Schema.Literals(["browser", "three_r_i"]).annotate({
          description:
            "Type of channel you would prefer to use for this 3DS Authentication. Only browser.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ChannelResource",
      description:
        "Contains details on the channel used (browser, 3RI) for a standalone 3DS Authentication.",
      identifier: "Stripethree_d_secure_standalone_resource_channel",
    }),
);
export const Stripethree_d_secure_standalone_resource_flow_preference =
  Schema.suspend(
    (): Schema.Codec<Stripethree_d_secure_standalone_resource_flow_preference> =>
      Schema.StructWithRest(
        Schema.Struct({
          challenge: Schema.optionalKey(
            Stripethree_d_secure_standalone_resource_challenge_details,
          ),
          data_share: Schema.optionalKey(
            Stripethree_d_secure_standalone_resource_data_share_details,
          ),
          frictionless: Schema.optionalKey(
            Stripethree_d_secure_standalone_resource_frictionless_details,
          ),
          type: Schema.Literals([
            "challenge",
            "data_share",
            "frictionless",
          ]).annotate({
            description:
              "Type of flow you requested for this 3DS Authentication.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "FlowPreferenceResource",
        description:
          "Contains details of the flow preference used for a standalone 3DS Authentication.",
        identifier: "Stripethree_d_secure_standalone_resource_flow_preference",
      }),
  );
export const Stripethree_d_secure_standalone_resource_installment =
  Schema.suspend(
    (): Schema.Codec<Stripethree_d_secure_standalone_resource_installment> =>
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(
            Schema.Number.annotate({
              description:
                "A non-negative integer representing the amount in the [smallest currency unit](/currencies#zero-decimal).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
          ),
          expiry: Stripethree_d_secure_standalone_resource_expiry,
          interval: Schema.Literal("day").annotate({
            description: "The unit of time for `interval_count`.",
          }),
          interval_count: Schema.Number.annotate({
            description:
              "The minimum number of time intervals between authorizations.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          number: Schema.Number.annotate({
            description: "The maximum number of installments.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Installment Detail",
        description: "Details about installment payments",
        identifier: "Stripethree_d_secure_standalone_resource_installment",
      }),
  );
export const Stripethree_d_secure_standalone_resource_recurring =
  Schema.suspend(
    (): Schema.Codec<Stripethree_d_secure_standalone_resource_recurring> =>
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(
            Schema.Number.annotate({
              description:
                "A non-negative integer representing the amount in the [smallest currency unit](/currencies#zero-decimal).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
          ),
          expiry: Stripethree_d_secure_standalone_resource_expiry,
          interval: Schema.Literal("day").annotate({
            description: "The unit of time for `interval_count`.",
          }),
          interval_count: Schema.Number.annotate({
            description:
              "The minimum number of time intervals between authorizations.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Recurring Detail",
        description: "Details about recurring payments",
        identifier: "Stripethree_d_secure_standalone_resource_recurring",
      }),
  );
export const Stripethree_d_secure_standalone_resource_network_details =
  Schema.suspend(
    (): Schema.Codec<Stripethree_d_secure_standalone_resource_network_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          cartes_bancaires: Schema.optionalKey(
            Stripethree_d_secure_standalone_resource_cartes_bancaires,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "NetworkDetailsResource",
        description: "Contains details specific to the individual network.",
        identifier: "Stripethree_d_secure_standalone_resource_network_details",
      }),
  );
export const Stripev2_money_management_outbound_setup_intent = Schema.suspend(
  (): Schema.Codec<Stripev2_money_management_outbound_setup_intent> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.String.annotate({
          description: "Created timestamp.",
          format: "date-time",
        }),
        id: Schema.String.annotate({
          description: "ID of the outbound setup intent.",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
        }),
        object: Schema.Literal(
          "v2.money_management.outbound_setup_intent",
        ).annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value of the object field.",
        }),
        payout_method: Schema.optionalKey(
          Stripev2_money_management_payout_method,
        ),
        status: Schema.Literals([
          "canceled",
          "requires_action",
          "requires_payout_method",
          "succeeded",
        ]).annotate({
          description: "Closed Enum. Status of the outbound setup intent.",
        }),
        usage_intent: Schema.Literals(["payment", "transfer"]).annotate({
          description:
            "The intended money movement flow this payout method should be set up for, specified in params.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Outbound Setup Intent",
      description:
        "Use the OutboundSetupIntent API to create and setup usable payout methods.",
      identifier: "Stripev2.money_management.outbound_setup_intent",
    }),
);
export const Stripefunding_instructions_bank_transfer_financial_address =
  Schema.suspend(
    (): Schema.Codec<Stripefunding_instructions_bank_transfer_financial_address> =>
      Schema.StructWithRest(
        Schema.Struct({
          aba: Schema.optionalKey(
            Stripefunding_instructions_bank_transfer_aba_record,
          ),
          iban: Schema.optionalKey(
            Stripefunding_instructions_bank_transfer_iban_record,
          ),
          sort_code: Schema.optionalKey(
            Stripefunding_instructions_bank_transfer_sort_code_record,
          ),
          spei: Schema.optionalKey(
            Stripefunding_instructions_bank_transfer_spei_record,
          ),
          supported_networks: Schema.optionalKey(
            Schema.Array(
              Schema.Literals([
                "ach",
                "bacs",
                "chaps",
                "domestic_wire_us",
                "fps",
                "sepa",
                "spei",
                "swift",
                "zengin",
              ]),
            ).annotate({
              description:
                "The payment networks supported by this FinancialAddress",
            }),
          ),
          swift: Schema.optionalKey(
            Stripefunding_instructions_bank_transfer_swift_record,
          ),
          type: Schema.Literals([
            "aba",
            "iban",
            "sort_code",
            "spei",
            "swift",
            "zengin",
          ]).annotate({ description: "The type of financial address" }),
          zengin: Schema.optionalKey(
            Stripefunding_instructions_bank_transfer_zengin_record,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "FundingInstructionsBankTransferFinancialAddress",
        description:
          "FinancialAddresses contain identifying information that resolves to a FinancialAccount.",
        identifier:
          "Stripefunding_instructions_bank_transfer_financial_address",
      }),
  );
export const Stripeinbound_transfers = Schema.suspend(
  (): Schema.Codec<Stripeinbound_transfers> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing_details: Stripetreasury_shared_resource_billing_details,
        type: Schema.Literal("us_bank_account").annotate({
          description:
            "The type of the payment method used in the InboundTransfer.",
        }),
        us_bank_account: Schema.optionalKey(
          Stripeinbound_transfers_payment_method_details_us_bank_account,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "InboundTransfers",
      description: "",
      identifier: "Stripeinbound_transfers",
    }),
);
export const Stripeoutbound_payments_payment_method_details = Schema.suspend(
  (): Schema.Codec<Stripeoutbound_payments_payment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing_details: Stripetreasury_shared_resource_billing_details,
        financial_account: Schema.optionalKey(
          Stripeoutbound_payments_payment_method_details_financial_account,
        ),
        type: Schema.Literals([
          "financial_account",
          "us_bank_account",
        ]).annotate({
          description:
            "The type of the payment method used in the OutboundPayment.",
        }),
        us_bank_account: Schema.optionalKey(
          Stripeoutbound_payments_payment_method_details_us_bank_account,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "OutboundPaymentsPaymentMethodDetails",
      description: "",
      identifier: "Stripeoutbound_payments_payment_method_details",
    }),
);
export const Stripeoutbound_transfers_payment_method_details = Schema.suspend(
  (): Schema.Codec<Stripeoutbound_transfers_payment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing_details: Stripetreasury_shared_resource_billing_details,
        financial_account: Schema.optionalKey(
          Stripeoutbound_transfers_payment_method_details_financial_account,
        ),
        type: Schema.Literals([
          "financial_account",
          "us_bank_account",
        ]).annotate({
          description:
            "The type of the payment method used in the OutboundTransfer.",
        }),
        us_bank_account: Schema.optionalKey(
          Stripeoutbound_transfers_payment_method_details_us_bank_account,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "OutboundTransfersPaymentMethodDetails",
      description: "",
      identifier: "Stripeoutbound_transfers_payment_method_details",
    }),
);
export const Stripelegal_entity_company = Schema.suspend(
  (): Schema.Codec<Stripelegal_entity_company> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(Stripeaddress),
        address_kana: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripelegal_entity_japan_address]).annotate({
              description:
                "The Kana variation of the company's primary address (Japan only).",
            }),
            Schema.Null,
          ]),
        ),
        address_kanji: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripelegal_entity_japan_address]).annotate({
              description:
                "The Kanji variation of the company's primary address (Japan only).",
            }),
            Schema.Null,
          ]),
        ),
        administrative_address: Schema.optionalKey(Stripeaddress),
        directors_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the company's directors have been provided. This Boolean will be `true` if you've manually indicated that all directors are provided via [the `directors_provided` parameter](https://docs.stripe.com/api/accounts/update#update_account-company-directors_provided).",
          }),
        ),
        directorship_declaration: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripelegal_entity_directorship_declaration,
            ]).annotate({
              description:
                "This hash is used to attest that the director information provided to Stripe is both current and correct.",
            }),
            Schema.Null,
          ]),
        ),
        executives_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the company's executives have been provided. This Boolean will be `true` if you've manually indicated that all executives are provided via [the `executives_provided` parameter](https://docs.stripe.com/api/accounts/update#update_account-company-executives_provided), or if Stripe determined that sufficient executives were provided.",
          }),
        ),
        export_license_id: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The export license ID number of the company, also referred as Import Export Code (India only).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        export_purpose_code: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The purpose code to use for export transactions (India only).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The company's legal name. Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        name_kana: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kana variation of the company's legal name (Japan only). Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        name_kanji: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kanji variation of the company's legal name (Japan only). Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        owners_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the company's owners have been provided. This Boolean will be `true` if you've manually indicated that all owners are provided via [the `owners_provided` parameter](https://docs.stripe.com/api/accounts/update#update_account-company-owners_provided), or if Stripe determined that sufficient owners were provided. Stripe determines ownership requirements using both the number of owners provided and their total percent ownership (calculated by adding the `percent_ownership` of each owner together).",
          }),
        ),
        ownership_declaration: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripelegal_entity_ubo_declaration]).annotate({
              description:
                "This hash is used to attest that the beneficial owner information provided to Stripe is both current and correct.",
            }),
            Schema.Null,
          ]),
        ),
        ownership_exemption_reason: Schema.optionalKey(
          Schema.Literals([
            "qualified_entity_exceeds_ownership_threshold",
            "qualifies_as_financial_institution",
          ]).annotate({
            description:
              "This value is used to determine if a business is exempt from providing ultimate beneficial owners. See [this support article](https://support.stripe.com/questions/exemption-from-providing-ownership-details) and [changelog](https://docs.stripe.com/changelog/acacia/2025-01-27/ownership-exemption-reason-accounts-api) for more details.",
          }),
        ),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The company's phone number (used for verification).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        physical_address: Schema.optionalKey(Stripeaddress),
        principal_place_of_business: Schema.optionalKey(Stripeaddress),
        registration_date: Schema.optionalKey(
          Stripelegal_entity_registration_date,
        ),
        representative_declaration: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripelegal_entity_representative_declaration,
            ]).annotate({
              description:
                "This hash is used to attest that the representative is authorized to act as the representative of their legal entity.",
            }),
            Schema.Null,
          ]),
        ),
        structure: Schema.optionalKey(
          Schema.Literals([
            "free_zone_establishment",
            "free_zone_llc",
            "government_instrumentality",
            "governmental_unit",
            "incorporated_non_profit",
            "incorporated_partnership",
            "limited_liability_partnership",
            "llc",
            "multi_member_llc",
            "private_company",
            "private_corporation",
            "private_partnership",
            "public_company",
            "public_corporation",
            "public_partnership",
            "registered_charity",
            "single_member_llc",
            "sole_establishment",
            "sole_proprietorship",
            "tax_exempt_government_instrumentality",
            "unincorporated_association",
            "unincorporated_non_profit",
            "unincorporated_partnership",
          ]).annotate({
            description:
              "The category identifying the legal structure of the company or legal entity. Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`. See [Business structure](https://docs.stripe.com/connect/identity-verification#business-structure) for more details.",
          }),
        ),
        tax_id_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the company's business ID number was provided.",
          }),
        ),
        tax_id_registrar: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The jurisdiction in which the `tax_id` is registered (Germany-based companies only).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        vat_id_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the company's business VAT number was provided.",
          }),
        ),
        verification: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripelegal_entity_company_verification]).annotate({
              description:
                "Information on the verification state of the company.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "LegalEntityCompany",
      description: "",
      identifier: "Stripelegal_entity_company",
    }),
);
export const Stripepromotion_codes_resource_promotion = Schema.suspend(
  (): Schema.Codec<Stripepromotion_codes_resource_promotion> =>
    Schema.StructWithRest(
      Schema.Struct({
        coupon: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecoupon,
            ]).annotate({
              description:
                "If promotion `type` is `coupon`, the coupon for this promotion.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literal("coupon").annotate({
          description: "The type of promotion.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PromotionCodesResourcePromotion",
      description: "",
      identifier: "Stripepromotion_codes_resource_promotion",
    }),
);
export const Stripediscount_source = Schema.suspend(
  (): Schema.Codec<Stripediscount_source> =>
    Schema.StructWithRest(
      Schema.Struct({
        coupon: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecoupon,
            ]).annotate({
              description:
                "The coupon that was redeemed to create this discount.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literal("coupon").annotate({
          description: "The source type of the discount.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DiscountSource",
      description: "",
      identifier: "Stripediscount_source",
    }),
);
export const Stripediscounts_resource_stackable_discount_with_discount_end =
  Schema.suspend(
    (): Schema.Codec<Stripediscounts_resource_stackable_discount_with_discount_end> =>
      Schema.StructWithRest(
        Schema.Struct({
          coupon: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripecoupon,
              ]).annotate({
                description: "ID of the coupon to create a new discount for.",
              }),
              Schema.Null,
            ]),
          ),
          discount: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripediscount,
              ]).annotate({
                description:
                  "ID of an existing discount on the object (or one of its ancestors) to reuse.",
              }),
              Schema.Null,
            ]),
          ),
          promotion_code: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripepromotion_code,
              ]).annotate({
                description:
                  "ID of the promotion code to create a new discount for.",
              }),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "DiscountsResourceStackableDiscountWithDiscountEnd",
        description: "",
        identifier:
          "Stripediscounts_resource_stackable_discount_with_discount_end",
      }),
  );
export const Stripestackable_discount_with_discount_settings_and_discount_end =
  Schema.suspend(
    (): Schema.Codec<Stripestackable_discount_with_discount_settings_and_discount_end> =>
      Schema.StructWithRest(
        Schema.Struct({
          coupon: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripecoupon,
              ]).annotate({
                description: "ID of the coupon to create a new discount for.",
              }),
              Schema.Null,
            ]),
          ),
          discount: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripediscount,
              ]).annotate({
                description:
                  "ID of an existing discount on the object (or one of its ancestors) to reuse.",
              }),
              Schema.Null,
            ]),
          ),
          promotion_code: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripepromotion_code,
              ]).annotate({
                description:
                  "ID of the promotion code to create a new discount for.",
              }),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "StackableDiscountWithDiscountSettingsAndDiscountEnd",
        description: "",
        identifier:
          "Stripestackable_discount_with_discount_settings_and_discount_end",
      }),
  );
export const Stripemandate_payment_method_details = Schema.suspend(
  (): Schema.Codec<Stripemandate_payment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(Stripemandate_acss_debit),
        amazon_pay: Schema.optionalKey(Stripemandate_amazon_pay),
        au_becs_debit: Schema.optionalKey(Stripemandate_au_becs_debit),
        bacs_debit: Schema.optionalKey(Stripemandate_bacs_debit),
        blik: Schema.optionalKey(Stripemandate_blik),
        card: Schema.optionalKey(Stripecard_mandate_payment_method_details),
        cashapp: Schema.optionalKey(Stripemandate_cashapp),
        kakao_pay: Schema.optionalKey(Stripemandate_kakao_pay),
        klarna: Schema.optionalKey(Stripemandate_klarna),
        kr_card: Schema.optionalKey(Stripemandate_kr_card),
        link: Schema.optionalKey(Stripemandate_link),
        naver_pay: Schema.optionalKey(Stripemandate_naver_pay),
        nz_bank_account: Schema.optionalKey(Stripemandate_nz_bank_account),
        paypal: Schema.optionalKey(Stripemandate_paypal),
        payto: Schema.optionalKey(Stripemandate_payto),
        pix: Schema.optionalKey(Stripemandate_pix),
        revolut_pay: Schema.optionalKey(Stripemandate_revolut_pay),
        sepa_debit: Schema.optionalKey(Stripemandate_sepa_debit),
        twint: Schema.optionalKey(Stripemandate_twint),
        type: Schema.String.annotate({
          description:
            "This mandate corresponds with a specific payment method type. The `payment_method_details` includes an additional hash with the same name and contains mandate information that's specific to that payment method.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        upi: Schema.optionalKey(Stripemandate_upi),
        us_bank_account: Schema.optionalKey(Stripemandate_us_bank_account),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "mandate_payment_method_details",
      description: "",
      identifier: "Stripemandate_payment_method_details",
    }),
);
export const Stripecheckout_customer_balance_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripecheckout_customer_balance_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          bank_transfer: Schema.optionalKey(
            Stripecheckout_customer_balance_bank_transfer_payment_method_options,
          ),
          funding_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literal("bank_transfer").annotate({
                description:
                  "The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.",
              }),
              Schema.Null,
            ]),
          ),
          setup_future_usage: Schema.optionalKey(
            Schema.Literal("none").annotate({
              description:
                "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
        title: "CheckoutCustomerBalancePaymentMethodOptions",
        description: "",
        identifier: "Stripecheckout_customer_balance_payment_method_options",
      }),
  );
export const Stripequotes_resource_subscription_data_subscription_data =
  Schema.suspend(
    (): Schema.Codec<Stripequotes_resource_subscription_data_subscription_data> =>
      Schema.StructWithRest(
        Schema.Struct({
          billing_mode: Stripequotes_resource_subscription_data_billing_mode,
          description: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The subscription's description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in Stripe surfaces and certain local payment methods UIs.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          effective_date: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "When creating a new subscription, the date of which the subscription schedule will start after the quote is accepted. This date is ignored if it is in the past when the quote is accepted. Measured in seconds since the Unix epoch.",
                format: "unix-time",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
          metadata: Schema.optionalKey(
            Schema.Union([
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.isMaxCodePoints(500).annotate({
                    expected: "a string with at most 500 code points",
                  }),
                ),
              ).annotate({
                description:
                  "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that will set metadata on the subscription or subscription schedule when the quote is accepted. If a recurring price is included in `line_items`, this field will be passed to the resulting subscription's `metadata` field. If `subscription_data.effective_date` is used, this field will be passed to the resulting subscription schedule's `phases.metadata` field. Unlike object-level metadata, this field is declarative. Updates will clear prior values.",
              }),
              Schema.Null,
            ]),
          ),
          trial_period_days: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "Integer representing the number of trial period days before the customer is charged for the first time.",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "QuotesResourceSubscriptionDataSubscriptionData",
        description: "",
        identifier: "Stripequotes_resource_subscription_data_subscription_data",
      }),
  );
export const Stripecancellation_details = Schema.suspend(
  (): Schema.Codec<Stripecancellation_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        comment: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Additional comments about why the user canceled the subscription, if the subscription was canceled explicitly by the user.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        feedback: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "customer_service",
              "low_quality",
              "missing_features",
              "other",
              "switched_service",
              "too_complex",
              "too_expensive",
              "unused",
            ]).annotate({
              description:
                "The customer submitted reason for why they canceled, if the subscription was canceled explicitly by the user.",
            }),
            Schema.Null,
          ]),
        ),
        feedback_option: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripebilling_feedback_option,
            ]).annotate({
              description:
                "Customized feedback options that provide deeper insight into why the subscription was canceled, if the subscription was canceled explicitly by the user.",
            }),
            Schema.Null,
          ]),
        ),
        reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "canceled_by_retention_policy",
              "cancellation_requested",
              "payment_disputed",
              "payment_failed",
            ]).annotate({ description: "Why this subscription was canceled." }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CancellationDetails",
      description: "",
      identifier: "Stripecancellation_details",
    }),
);
export const Stripeline_items_tax_amount = Schema.suspend(
  (): Schema.Codec<Stripeline_items_tax_amount> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount of tax applied for this rate.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        rate: Stripetax_rate,
        taxability_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "customer_exempt",
              "not_collecting",
              "not_subject_to_tax",
              "not_supported",
              "portion_product_exempt",
              "portion_reduced_rated",
              "portion_standard_rated",
              "product_exempt",
              "product_exempt_holiday",
              "proportionally_rated",
              "reduced_rated",
              "reverse_charge",
              "standard_rated",
              "taxable_basis_reduced",
              "zero_rated",
            ]).annotate({
              description:
                "The reasoning behind this tax, for example, if the product is tax exempt. The possible values for this field may be extended as new tax rules are supported.",
            }),
            Schema.Null,
          ]),
        ),
        taxable_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount on which tax is calculated, in cents (or local equivalent).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "LineItemsTaxAmount",
      description: "",
      identifier: "Stripeline_items_tax_amount",
    }),
);
export const Stripetest_helpers_test_clock = Schema.suspend(
  (): Schema.Codec<Stripetest_helpers_test_clock> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        deletes_after: Schema.Number.annotate({
          description: "Time at which this clock is scheduled to auto delete.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        frozen_time: Schema.Number.annotate({
          description:
            "Time at which all objects belonging to this clock are frozen.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The custom name supplied at creation.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("test_helpers.test_clock").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals([
          "advancing",
          "internal_failure",
          "ready",
        ]).annotate({ description: "The status of the Test Clock." }),
        status_details:
          Stripebilling_clocks_resource_status_details_status_details,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Test Clock",
      description:
        "A test clock enables deterministic control over objects in testmode. With a test clock, you can create\nobjects at a frozen time in the past or future, and advance to a specific future time to observe webhooks and state changes. After the clock advances,\nyou can either validate the current state of your scenario (and test your assumptions), change the current state of your scenario (and test more complex scenarios), or keep advancing forward in time.",
      identifier: "Stripetest_helpers.test_clock",
    }),
);
export const Stripeshipping_rate = Schema.suspend(
  (): Schema.Codec<Stripeshipping_rate> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description:
            "Whether the shipping rate can be used for new purchases. Defaults to `true`.",
        }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        delivery_estimate: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeshipping_rate_delivery_estimate]).annotate({
              description:
                "The estimated range for how long shipping will take, meant to be displayable to the customer. This will appear on CheckoutSessions.",
            }),
            Schema.Null,
          ]),
        ),
        display_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The name of the shipping rate, meant to be displayable to the customer. This will appear on CheckoutSessions.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        fixed_amount: Schema.optionalKey(Stripeshipping_rate_fixed_amount),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        object: Schema.Literal("shipping_rate").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        tax_behavior: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate(
              {
                description:
                  "Specifies whether the rate is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`.",
              },
            ),
            Schema.Null,
          ]),
        ),
        tax_code: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetax_code,
            ]).annotate({
              description:
                "A [tax code](https://docs.stripe.com/tax/tax-categories) ID. The Shipping tax code is `txcd_92010001`.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literal("fixed_amount").annotate({
          description: "The type of calculation to use on the shipping rate.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Shipping Rate",
      description:
        "Shipping rates describe the price of shipping presented to your customers and\napplied to a purchase. For more information, see [Charge for shipping](https://docs.stripe.com/payments/during-payment/charge-shipping).",
      identifier: "Stripeshipping_rate",
    }),
);
export const Stripecapability = Schema.suspend(
  (): Schema.Codec<Stripecapability> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeaccount,
        ]).annotate({
          description:
            "The account for which the capability enables functionality.",
        }),
        future_requirements: Schema.optionalKey(
          Stripeaccount_capability_future_requirements,
        ),
        id: Schema.String.annotate({
          description: "The identifier for the capability.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("capability").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        requested: Schema.Boolean.annotate({
          description: "Whether the capability has been requested.",
        }),
        requested_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the capability was requested. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        requirements: Schema.optionalKey(Stripeaccount_capability_requirements),
        status: Schema.Literals([
          "active",
          "inactive",
          "pending",
          "unrequested",
        ]).annotate({ description: "The status of the capability." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Capability",
      description:
        "This is an object representing a capability for a Stripe account.\n\nRelated guide: [Account capabilities](https://docs.stripe.com/connect/account-capabilities)",
      identifier: "Stripecapability",
    }),
);
export const Stripeperson = Schema.suspend(
  (): Schema.Codec<Stripeperson> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.String.annotate({
          description: "The account the person is associated with.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        additional_tos_acceptances: Schema.optionalKey(
          Stripeperson_additional_tos_acceptances,
        ),
        address: Schema.optionalKey(Stripeaddress),
        address_kana: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripelegal_entity_japan_address]).annotate({
              description:
                "The Kana variation of the person's address (Japan only).",
            }),
            Schema.Null,
          ]),
        ),
        address_kanji: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripelegal_entity_japan_address]).annotate({
              description:
                "The Kanji variation of the person's address (Japan only).",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        dob: Schema.optionalKey(Stripelegal_entity_dob),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The person's email address. Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        first_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The person's first name. Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        first_name_kana: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kana variation of the person's first name (Japan only). Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        first_name_kanji: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kanji variation of the person's first name (Japan only). Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        full_name_aliases: Schema.optionalKey(
          Schema.Array(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ).annotate({
            description:
              "A list of alternate names or aliases that the person is known by. Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
          }),
        ),
        future_requirements: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeperson_future_requirements]).annotate({
              description:
                "Information about the [upcoming new requirements for this person](https://docs.stripe.com/connect/custom-accounts/future-requirements), including what information needs to be collected, and by when.",
            }),
            Schema.Null,
          ]),
        ),
        gender: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "The person's gender." }),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        id_number_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the person's `id_number` was provided. True if either the full ID number was provided or if only the required part of the ID number was provided (ex. last four of an individual's SSN for the US indicated by `ssn_last_4_provided`).",
          }),
        ),
        id_number_secondary_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the person's `id_number_secondary` was provided.",
          }),
        ),
        last_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The person's last name. Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        last_name_kana: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kana variation of the person's last name (Japan only). Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        last_name_kanji: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kanji variation of the person's last name (Japan only). Also available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        maiden_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The person's maiden name.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.String.check(
              Schema.isMaxCodePoints(500).annotate({
                expected: "a string with at most 500 code points",
              }),
            ),
          ).annotate({
            description:
              "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
          }),
        ),
        nationality: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The country where the person is a national.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("person").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The person's phone number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        political_exposure: Schema.optionalKey(
          Schema.Literals(["existing", "none"]).annotate({
            description:
              "Indicates if the person or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.",
          }),
        ),
        registered_address: Schema.optionalKey(Stripeaddress),
        relationship: Schema.optionalKey(Stripeperson_relationship),
        requirements: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeperson_requirements]).annotate({
              description:
                "Information about the requirements for this person, including what information needs to be collected, and by when.",
            }),
            Schema.Null,
          ]),
        ),
        ssn_last_4_provided: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the last four digits of the person's Social Security number have been provided (U.S. only).",
          }),
        ),
        us_cfpb_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeperson_us_cfpb_data]).annotate({
              description: "Demographic data related to the person.",
            }),
            Schema.Null,
          ]),
        ),
        verification: Schema.optionalKey(
          Stripelegal_entity_person_verification,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Person",
      description:
        "This is an object representing a person associated with a Stripe account.\n\nA platform can only access a subset of data in a person for an account where [account.controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `stripe`, which includes Standard and Express accounts, after creating an Account Link or Account Session to start Connect onboarding.\n\nSee the [Standard onboarding](/connect/standard-accounts) or [Express onboarding](/connect/express-accounts) documentation for information about prefilling information and account onboarding steps. Learn more about [handling identity verification with the API](/connect/handling-api-verification#person-information).",
      identifier: "Stripeperson",
    }),
);
export const Stripethresholds_resource_usage_threshold_config = Schema.suspend(
  (): Schema.Codec<Stripethresholds_resource_usage_threshold_config> =>
    Schema.StructWithRest(
      Schema.Struct({
        filters: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripethresholds_resource_usage_alert_filter).annotate(
              {
                description:
                  "The filters allow limiting the scope of this usage alert. You can only specify up to one filter at this time.",
              },
            ),
            Schema.Null,
          ]),
        ),
        gte: Schema.Number.annotate({
          description: "The value at which this alert will trigger.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        meter: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripebilling_meter,
        ]).annotate({
          description:
            "The [Billing Meter](/api/billing/meter) ID whose usage is monitored.",
        }),
        recurrence: Schema.Literal("one_time").annotate({
          description: "Defines how the alert will behave.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Usage threshold alert configuration",
      description:
        "The usage threshold alert configuration enables setting up alerts for when a certain usage threshold on a specific meter is crossed.",
      identifier: "Stripethresholds_resource_usage_threshold_config",
    }),
);
export const Stripecheckout_us_bank_account_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripecheckout_us_bank_account_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          financial_connections: Schema.optionalKey(
            Stripecheckout_financial_connections_payment_method_options,
          ),
          setup_future_usage: Schema.optionalKey(
            Schema.Literals(["none", "off_session", "on_session"]).annotate({
              description:
                "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
            }),
          ),
          target_date: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Controls when Stripe will attempt to debit the funds from the customer's account. The date must be a string in YYYY-MM-DD format. The date must be in the future and between 3 and 15 calendar days from now.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          verification_method: Schema.optionalKey(
            Schema.Literals(["automatic", "instant"]).annotate({
              description:
                "Bank account verification method. The default value is `automatic`.",
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
        title: "CheckoutUsBankAccountPaymentMethodOptions",
        description: "",
        identifier: "Stripecheckout_us_bank_account_payment_method_options",
      }),
  );
export const Stripeclimate_removals_order_deliveries = Schema.suspend(
  (): Schema.Codec<Stripeclimate_removals_order_deliveries> =>
    Schema.StructWithRest(
      Schema.Struct({
        delivered_at: Schema.Number.annotate({
          description:
            "Time at which the delivery occurred. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        location: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeclimate_removals_location]).annotate({
              description: "Specific location of this delivery.",
            }),
            Schema.Null,
          ]),
        ),
        metric_tons: Schema.String.annotate({
          description: "Quantity of carbon removal supplied by this delivery.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        registry_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Once retired, a URL to the registry entry for the tons from this delivery.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        supplier: Stripeclimate_supplier,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Climate order delivery",
      description:
        "The delivery of a specified quantity of carbon for an order.",
      identifier: "Stripeclimate_removals_order_deliveries",
    }),
);
export const Stripeclimate_product = Schema.suspend(
  (): Schema.Codec<Stripeclimate_product> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        current_prices_per_metric_ton: Schema.Record(
          Schema.String,
          Stripeclimate_removals_products_price,
        ).annotate({
          description:
            "Current prices for a metric ton of carbon removal in a currency's smallest unit.",
        }),
        delivery_year: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The year in which the carbon removal is expected to be delivered. If the year is in the past, this represents spot inventory with guaranteed delivery.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description:
            "Unique identifier for the object. For convenience, Climate product IDs are human-readable strings\nthat start with `climsku_`. See [carbon removal inventory](https://stripe.com/docs/climate/orders/carbon-removal-inventory)\nfor a list of available carbon removal products.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
        }),
        metric_tons_available: Schema.String.annotate({
          description: "The quantity of metric tons available for reservation.",
          format: "decimal",
        }),
        name: Schema.String.annotate({
          description: "The Climate product's name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("climate.product").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        suppliers: Schema.Array(Stripeclimate_supplier).annotate({
          description:
            "The carbon removal suppliers that fulfill orders for this Climate product.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Climate product",
      description:
        "A Climate product represents a type of carbon removal unit available for reservation.\nYou can retrieve it to see the current price and availability.",
      identifier: "Stripeclimate.product",
    }),
);
export const Stripefinancial_connections_account = Schema.suspend(
  (): Schema.Codec<Stripefinancial_connections_account> =>
    Schema.StructWithRest(
      Schema.Struct({
        account_holder: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebank_connections_resource_accountholder,
            ]).annotate({
              description: "The account holder that this account belongs to.",
            }),
            Schema.Null,
          ]),
        ),
        account_numbers: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripebank_connections_resource_account_number_details,
            ).annotate({ description: "Details about the account numbers." }),
            Schema.Null,
          ]),
        ),
        balance: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripebank_connections_resource_balance]).annotate({
              description:
                "The most recent information about the account's balance.",
            }),
            Schema.Null,
          ]),
        ),
        balance_refresh: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebank_connections_resource_balance_refresh,
            ]).annotate({
              description:
                "The state of the most recent attempt to refresh the account balance.",
            }),
            Schema.Null,
          ]),
        ),
        category: Schema.Literals([
          "cash",
          "credit",
          "investment",
          "other",
        ]).annotate({
          description:
            "The type of the account. Account category is further divided in `subcategory`.",
        }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        display_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A human-readable name that has been assigned to this account, either by the account holder or by the institution.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        institution_name: Schema.String.annotate({
          description: "The name of the institution that holds this account.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last4: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The last 4 digits of the account number. If present, this will be 4 numeric characters.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("financial_connections.account").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        ownership: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefinancial_connections_account_ownership,
            ]).annotate({
              description:
                "The ID of the [Financial Connections Account Ownership](https://docs.stripe.com/api/financial_connections/ownership) object associated with this account.",
            }),
            Schema.Null,
          ]),
        ),
        ownership_refresh: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebank_connections_resource_ownership_refresh,
            ]).annotate({
              description:
                "The state of the most recent attempt to refresh the account owners.",
            }),
            Schema.Null,
          ]),
        ),
        permissions: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "balances",
                "ownership",
                "payment_method",
                "transactions",
              ]),
            ).annotate({
              description: "The list of permissions granted by this account.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals([
          "active",
          "disconnected",
          "inactive",
        ]).annotate({ description: "The status of the link to the account." }),
        status_details: Schema.optionalKey(
          Stripebank_connections_resource_account_status_details,
        ),
        subcategory: Schema.Literals([
          "checking",
          "credit_card",
          "line_of_credit",
          "mortgage",
          "other",
          "savings",
        ]).annotate({
          description:
            "If `category` is `cash`, one of:\n\n - `checking`\n - `savings`\n - `other`\n\nIf `category` is `credit`, one of:\n\n - `mortgage`\n - `line_of_credit`\n - `credit_card`\n - `other`\n\nIf `category` is `investment` or `other`, this will be `other`.",
        }),
        subscriptions: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Schema.Literal("transactions")).annotate({
              description:
                "The list of data refresh subscriptions requested on this account.",
            }),
            Schema.Null,
          ]),
        ),
        supported_payment_method_types: Schema.Array(
          Schema.Literals(["link", "us_bank_account"]),
        ).annotate({
          description:
            "The [PaymentMethod type](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type)(s) that can be created from this account.",
        }),
        transaction_refresh: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebank_connections_resource_transaction_refresh,
            ]).annotate({
              description:
                "The state of the most recent attempt to refresh the account transactions.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Account",
      description:
        "A Financial Connections Account represents an account that exists outside of Stripe, to which you have been granted some degree of access.",
      identifier: "Stripefinancial_connections.account",
    }),
);
export const Stripeforwarding_request = Schema.suspend(
  (): Schema.Codec<Stripeforwarding_request> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("forwarding.request").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payment_method: Schema.String.annotate({
          description:
            "The PaymentMethod to insert into the forwarded request. Forwarding previously consumed PaymentMethods is allowed.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        replacements: Schema.Array(
          Schema.Literals([
            "card_cvc",
            "card_expiry",
            "card_number",
            "cardholder_name",
            "request_signature",
          ]),
        ).annotate({
          description:
            "The field kinds to be replaced in the forwarded request.",
        }),
        request_context: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeforwarded_request_context]).annotate({
              description:
                "Context about the request from Stripe's servers to the destination endpoint.",
            }),
            Schema.Null,
          ]),
        ),
        request_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeforwarded_request_details]).annotate({
              description:
                "The request that was sent to the destination endpoint. We redact any sensitive fields.",
            }),
            Schema.Null,
          ]),
        ),
        response_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeforwarded_response_details]).annotate({
              description:
                "The response that the destination endpoint returned to us. We redact any sensitive fields.",
            }),
            Schema.Null,
          ]),
        ),
        url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The destination URL for the forwarded request. Must be supported by the config.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ForwardingRequest",
      description:
        "Instructs Stripe to make a request on your behalf using the destination URL. The destination URL\nis activated by Stripe at the time of onboarding. Stripe verifies requests with your credentials\nprovided during onboarding, and injects card details from the payment_method into the request.\n\nStripe redacts all sensitive fields and headers, including authentication credentials and card numbers,\nbefore storing the request and response data in the forwarding Request object, which are subject to a\n30-day retention period.\n\nYou can provide a Stripe idempotency key to make sure that requests with the same key result in only one\noutbound request. The Stripe idempotency key provided should be unique and different from any idempotency\nkeys provided on the underlying third-party request.\n\nForwarding Requests are synchronous requests that return a response or time out according to\nStripe’s limits.\n\nRelated guide: [Forward card details to third-party API endpoints](https://docs.stripe.com/payments/forwarding).",
      identifier: "Stripeforwarding.request",
    }),
);
export const Stripeidentity_verification_report = Schema.suspend(
  (): Schema.Codec<Stripeidentity_verification_report> =>
    Schema.StructWithRest(
      Schema.Struct({
        client_reference_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        document: Schema.optionalKey(Stripegelato_document_report),
        email: Schema.optionalKey(Stripegelato_email_report),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        id_number: Schema.optionalKey(Stripegelato_id_number_report),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("identity.verification_report").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        options: Schema.optionalKey(Stripegelato_verification_report_options),
        phone: Schema.optionalKey(Stripegelato_phone_report),
        selfie: Schema.optionalKey(Stripegelato_selfie_report),
        type: Schema.Literals([
          "document",
          "id_number",
          "verification_flow",
        ]).annotate({ description: "Type of report." }),
        verification_flow: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The configuration token of a verification flow from the dashboard.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        verification_session: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the VerificationSession that created this report.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "VerificationReport",
      description:
        "A VerificationReport is the result of an attempt to collect and verify data from a user.\nThe collection of verification checks performed is determined from the `type` and `options`\nparameters used. You can find the result of each verification check performed in the\nappropriate sub-resource: `document`, `id_number`, `selfie`.\n\nEach VerificationReport contains a copy of any data collected by the user as well as\nreference IDs which can be used to access collected images through the [FileUpload](https://docs.stripe.com/api/files)\nAPI. To configure and create VerificationReports, use the\n[VerificationSession](https://docs.stripe.com/api/identity/verification_sessions) API.\n\nRelated guide: [Accessing verification results](https://docs.stripe.com/identity/verification-sessions#results).",
      identifier: "Stripeidentity.verification_report",
    }),
);
export const Stripeproration_details = Schema.suspend(
  (): Schema.Codec<Stripeproration_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        credited_items: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_item_proration_credited_items,
            ]).annotate({
              description:
                "For a credit proration, links to the debit that the credit applies to. The reference is to an invoice item if the debit was pending when the credit was created, and to invoice line items if the debit was already invoiced.",
            }),
            Schema.Null,
          ]),
        ),
        discount_amounts: Schema.Array(
          Stripediscounts_resource_discount_amount,
        ).annotate({
          description:
            "Discount amounts applied when the proration was created. This field is only populated for prorations created from subscriptions with `billing_mode=flexible`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ProrationDetails",
      description: "",
      identifier: "Stripeproration_details",
    }),
);
export const Stripeterminal_configuration = Schema.suspend(
  (): Schema.Codec<Stripeterminal_configuration> =>
    Schema.StructWithRest(
      Schema.Struct({
        bbpos_wisepad3: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        bbpos_wisepos_e: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        cellular: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_cellular_config,
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        is_account_default: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Whether this Configuration is the default for your account",
            }),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "String indicating the name of the Configuration object, set by the user",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("terminal.configuration").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        offline: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_offline_config,
        ),
        reader_security: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_reader_security_config,
        ),
        reboot_window: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_reboot_window,
        ),
        stripe_s700: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        stripe_s710: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        stripe_t600: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        tipping: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_tipping,
        ),
        verifone_m425: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        verifone_p400: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        verifone_p630: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        verifone_ux700: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        verifone_v660p: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_device_type_specific_config,
        ),
        wifi: Schema.optionalKey(
          Stripeterminal_configuration_configuration_resource_wifi_config,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Configuration",
      description:
        "A Configurations object represents how features should be configured for terminal readers.\nFor information about how to use it, see the [Terminal configurations documentation](https://docs.stripe.com/terminal/fleet/configurations-overview).",
      identifier: "Stripeterminal.configuration",
    }),
);
export const Stripeterminal_reader_reader_resource_input = Schema.suspend(
  (): Schema.Codec<Stripeterminal_reader_reader_resource_input> =>
    Schema.StructWithRest(
      Schema.Struct({
        custom_text: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeterminal_reader_reader_resource_custom_text,
            ]).annotate({
              description: "Default text of input being collected.",
            }),
            Schema.Null,
          ]),
        ),
        email: Schema.optionalKey(Stripeterminal_reader_reader_resource_email),
        numeric: Schema.optionalKey(
          Stripeterminal_reader_reader_resource_numeric,
        ),
        phone: Schema.optionalKey(Stripeterminal_reader_reader_resource_phone),
        required: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Indicate that this input is required, disabling the skip button.",
            }),
            Schema.Null,
          ]),
        ),
        selection: Schema.optionalKey(
          Stripeterminal_reader_reader_resource_selection,
        ),
        signature: Schema.optionalKey(
          Stripeterminal_reader_reader_resource_signature,
        ),
        skipped: Schema.optionalKey(
          Schema.Boolean.annotate({
            description: "Indicate that this input was skipped by the user.",
          }),
        ),
        text: Schema.optionalKey(Stripeterminal_reader_reader_resource_text),
        toggles: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeterminal_reader_reader_resource_toggle).annotate(
              {
                description:
                  "List of toggles being collected. Values are present if collection is complete.",
              },
            ),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals([
          "email",
          "numeric",
          "phone",
          "selection",
          "signature",
          "text",
        ]).annotate({ description: "Type of input being collected." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Input",
      description: "Represents an input to be collected using the reader",
      identifier: "Stripeterminal_reader_reader_resource_input",
    }),
);
export const Stripeterminal_reader_reader_resource_collect_payment_method_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_collect_payment_method_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          collect_config: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_collect_config,
          ),
          payment_intent: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripepayment_intent,
          ]).annotate({
            description: "Most recent PaymentIntent processed by the reader.",
          }),
          payment_method: Schema.optionalKey(Stripepayment_method),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "CollectPaymentMethodReaderAction",
        description: "Represents a reader action to collect a payment method",
        identifier:
          "Stripeterminal_reader_reader_resource_collect_payment_method_action",
      }),
  );
export const Stripeterminal_reader_reader_resource_process_payment_intent_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_process_payment_intent_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          payment_intent: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripepayment_intent,
          ]).annotate({
            description: "Most recent PaymentIntent processed by the reader.",
          }),
          process_config: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_process_config,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "ProcessPaymentIntentReaderAction",
        description: "Represents a reader action to process a payment intent",
        identifier:
          "Stripeterminal_reader_reader_resource_process_payment_intent_action",
      }),
  );
export const Stripeterminal_reader_reader_resource_set_reader_display_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_set_reader_display_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          cart: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeterminal_reader_reader_resource_cart,
              ]).annotate({
                description:
                  "Cart object to be displayed by the reader, including line items, amounts, and currency.",
              }),
              Schema.Null,
            ]),
          ),
          type: Schema.Literal("cart").annotate({
            description:
              "Type of information to be displayed by the reader. Only `cart` is currently supported.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SetReaderDisplayAction",
        description: "Represents a reader action to set the reader display",
        identifier:
          "Stripeterminal_reader_reader_resource_set_reader_display_action",
      }),
  );
export const Stripethree_d_secure_standalone_resource_future_usage =
  Schema.suspend(
    (): Schema.Codec<Stripethree_d_secure_standalone_resource_future_usage> =>
      Schema.StructWithRest(
        Schema.Struct({
          installment: Schema.optionalKey(
            Stripethree_d_secure_standalone_resource_installment,
          ),
          recurring: Schema.optionalKey(
            Stripethree_d_secure_standalone_resource_recurring,
          ),
          type: Schema.Literals([
            "card_on_file",
            "installment",
            "recurring",
          ]).annotate({
            description:
              "The type of future usage declared for this 3DS Authentication.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Future Usage Detail",
        description:
          "Contains information about the future authorisations related to this authentication",
        identifier: "Stripethree_d_secure_standalone_resource_future_usage",
      }),
  );
export const Stripethree_d_secure_standalone_resource_outcome_details =
  Schema.suspend(
    (): Schema.Codec<Stripethree_d_secure_standalone_resource_outcome_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          acs_transaction_id: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Universally unique transaction identifier assigned by the issuer to identify the transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          ares: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The Authentication Response Message (ARes) is the issuer's response to the AReq message.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          ares_trans_status: Schema.optionalKey(
            Schema.Literals([
              "A",
              "C",
              "D",
              "I",
              "N",
              "R",
              "S",
              "U",
              "Y",
            ]).annotate({ description: "TransStatus field on the ARes" }),
          ),
          cryptogram: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "A 28-character Base64 string proving that 3DS was completed. Store this value securely, and don’t reuse it for multiple authorizations.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          ds_transaction_id: Schema.optionalKey(
            Schema.String.annotate({
              description: "The 3DS2 Directory Server Transaction ID.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          eci: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Electronic Commerce Indicator provided by the issuer to indicate the result of this 3DS Authentication.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          network_details: Schema.optionalKey(
            Stripethree_d_secure_standalone_resource_network_details,
          ),
          protocol_version: Schema.Literals([
            "2.1.0",
            "2.2.0",
            "2.3.1",
          ]).annotate({
            description:
              "The 3DS protocol version used for this 3DS Authentication.",
          }),
          requestor_challenge_indicator: Schema.optionalKey(
            Schema.Literals(["01", "02", "03", "04", "05", "06"]).annotate({
              description:
                "The indicator provided to the issuer by Stripe in the AReq that indicates whether a challenge is requested for this Authentication. This indicator should match the flow_preference you specified but may be overridden (for compliance reasons for example).",
            }),
          ),
          rreq: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The Results Request Message (RReq) communicates the results of the authentication or verification.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          rreq_trans_status: Schema.optionalKey(
            Schema.Literals([
              "A",
              "C",
              "D",
              "I",
              "N",
              "R",
              "S",
              "U",
              "Y",
            ]).annotate({ description: "TransStatus field on the RReq" }),
          ),
          three_ds_server_transaction_id: Schema.String.annotate({
            description:
              "Universally unique transaction identifier assigned by Stripe to identify the transaction.",
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
        title: "OutcomeDetailsResource",
        description:
          "Contains details on the result for a standalone 3DS Authentication.",
        identifier: "Stripethree_d_secure_standalone_resource_outcome_details",
      }),
  );
export const Stripefunding_instructions_bank_transfer = Schema.suspend(
  (): Schema.Codec<Stripefunding_instructions_bank_transfer> =>
    Schema.StructWithRest(
      Schema.Struct({
        country: Schema.String.annotate({
          description: "The country of the bank account to fund",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        financial_addresses: Schema.Array(
          Stripefunding_instructions_bank_transfer_financial_address,
        ).annotate({
          description:
            "A list of financial addresses that can be used to fund a particular balance",
        }),
        type: Schema.Literals([
          "eu_bank_transfer",
          "jp_bank_transfer",
        ]).annotate({ description: "The bank_transfer type" }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "FundingInstructionsBankTransfer",
      description: "",
      identifier: "Stripefunding_instructions_bank_transfer",
    }),
);
export const Stripeitem = Schema.suspend(
  (): Schema.Codec<Stripeitem> =>
    Schema.StructWithRest(
      Schema.Struct({
        adjustable_quantity: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeline_items_adjustable_quantity]),
            Schema.Null,
          ]),
        ),
        amount_discount: Schema.Number.annotate({
          description:
            "Total discount amount applied. If no discounts were applied, defaults to 0.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_subtotal: Schema.Number.annotate({
          description: "Total before any discounts or taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_tax: Schema.Number.annotate({
          description:
            "Total tax amount applied. If no tax was applied, defaults to 0.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_total: Schema.Number.annotate({
          description: "Total after discounts and taxes.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An arbitrary string attached to the object. Often useful for displaying to users. Defaults to product name.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discounts: Schema.optionalKey(
          Schema.Array(Stripeline_items_discount_amount).annotate({
            description: "The discounts applied to the line item.",
          }),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("item").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        price: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeprice]).annotate({
              description: "The price used to generate the line item.",
            }),
            Schema.Null,
          ]),
        ),
        quantity: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The quantity of products being purchased.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        taxes: Schema.optionalKey(
          Schema.Array(Stripeline_items_tax_amount).annotate({
            description: "The taxes applied to the line item.",
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
      title: "LineItem",
      description: "A line item.",
      identifier: "Stripeitem",
    }),
);
export const Stripequotes_resource_total_details_resource_breakdown =
  Schema.suspend(
    (): Schema.Codec<Stripequotes_resource_total_details_resource_breakdown> =>
      Schema.StructWithRest(
        Schema.Struct({
          discounts: Schema.Array(Stripeline_items_discount_amount).annotate({
            description: "The aggregated discounts.",
          }),
          taxes: Schema.Array(Stripeline_items_tax_amount).annotate({
            description: "The aggregated tax amounts by rate.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "QuotesResourceTotalDetailsResourceBreakdown",
        description: "",
        identifier: "Stripequotes_resource_total_details_resource_breakdown",
      }),
  );
export const Stripecheckout_session_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripecheckout_session_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Stripecheckout_acss_debit_payment_method_options,
        ),
        affirm: Schema.optionalKey(
          Stripecheckout_affirm_payment_method_options,
        ),
        afterpay_clearpay: Schema.optionalKey(
          Stripecheckout_afterpay_clearpay_payment_method_options,
        ),
        alipay: Schema.optionalKey(
          Stripecheckout_alipay_payment_method_options,
        ),
        alma: Schema.optionalKey(Stripecheckout_alma_payment_method_options),
        amazon_pay: Schema.optionalKey(
          Stripecheckout_amazon_pay_payment_method_options,
        ),
        au_becs_debit: Schema.optionalKey(
          Stripecheckout_au_becs_debit_payment_method_options,
        ),
        bacs_debit: Schema.optionalKey(
          Stripecheckout_bacs_debit_payment_method_options,
        ),
        bancontact: Schema.optionalKey(
          Stripecheckout_bancontact_payment_method_options,
        ),
        billie: Schema.optionalKey(
          Stripecheckout_billie_payment_method_options,
        ),
        boleto: Schema.optionalKey(
          Stripecheckout_boleto_payment_method_options,
        ),
        card: Schema.optionalKey(Stripecheckout_card_payment_method_options),
        cashapp: Schema.optionalKey(
          Stripecheckout_cashapp_payment_method_options,
        ),
        customer_balance: Schema.optionalKey(
          Stripecheckout_customer_balance_payment_method_options,
        ),
        eps: Schema.optionalKey(Stripecheckout_eps_payment_method_options),
        fpx: Schema.optionalKey(Stripecheckout_fpx_payment_method_options),
        giropay: Schema.optionalKey(
          Stripecheckout_giropay_payment_method_options,
        ),
        grabpay: Schema.optionalKey(
          Stripecheckout_grab_pay_payment_method_options,
        ),
        ideal: Schema.optionalKey(Stripecheckout_ideal_payment_method_options),
        kakao_pay: Schema.optionalKey(
          Stripecheckout_kakao_pay_payment_method_options,
        ),
        klarna: Schema.optionalKey(
          Stripecheckout_klarna_payment_method_options,
        ),
        konbini: Schema.optionalKey(
          Stripecheckout_konbini_payment_method_options,
        ),
        kr_card: Schema.optionalKey(
          Stripecheckout_kr_card_payment_method_options,
        ),
        link: Schema.optionalKey(Stripecheckout_link_payment_method_options),
        mobilepay: Schema.optionalKey(
          Stripecheckout_mobilepay_payment_method_options,
        ),
        multibanco: Schema.optionalKey(
          Stripecheckout_multibanco_payment_method_options,
        ),
        naver_pay: Schema.optionalKey(
          Stripecheckout_naver_pay_payment_method_options,
        ),
        oxxo: Schema.optionalKey(Stripecheckout_oxxo_payment_method_options),
        p24: Schema.optionalKey(Stripecheckout_p24_payment_method_options),
        payco: Schema.optionalKey(Stripecheckout_payco_payment_method_options),
        paynow: Schema.optionalKey(
          Stripecheckout_paynow_payment_method_options,
        ),
        paypal: Schema.optionalKey(
          Stripecheckout_paypal_payment_method_options,
        ),
        payto: Schema.optionalKey(Stripecheckout_payto_payment_method_options),
        pix: Schema.optionalKey(Stripecheckout_pix_payment_method_options),
        revolut_pay: Schema.optionalKey(
          Stripecheckout_revolut_pay_payment_method_options,
        ),
        samsung_pay: Schema.optionalKey(
          Stripecheckout_samsung_pay_payment_method_options,
        ),
        satispay: Schema.optionalKey(
          Stripecheckout_satispay_payment_method_options,
        ),
        scalapay: Schema.optionalKey(
          Stripecheckout_scalapay_payment_method_options,
        ),
        sepa_debit: Schema.optionalKey(
          Stripecheckout_sepa_debit_payment_method_options,
        ),
        sequra: Schema.optionalKey(
          Stripecheckout_sequra_payment_method_options,
        ),
        sofort: Schema.optionalKey(
          Stripecheckout_sofort_payment_method_options,
        ),
        sunbit: Schema.optionalKey(
          Stripecheckout_sunbit_payment_method_options,
        ),
        swish: Schema.optionalKey(Stripecheckout_swish_payment_method_options),
        twint: Schema.optionalKey(Stripecheckout_twint_payment_method_options),
        upi: Schema.optionalKey(Stripecheckout_upi_payment_method_options),
        us_bank_account: Schema.optionalKey(
          Stripecheckout_us_bank_account_payment_method_options,
        ),
        wechat_pay: Schema.optionalKey(
          Stripecheckout_wechat_pay_payment_method_options,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CheckoutSessionPaymentMethodOptions",
      description: "",
      identifier: "Stripecheckout_session_payment_method_options",
    }),
);
export const Stripeclimate_order = Schema.suspend(
  (): Schema.Codec<Stripeclimate_order> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_fees: Schema.Number.annotate({
          description:
            "Total amount of [Frontier](https://frontierclimate.com/)'s service fees in the currency's smallest unit.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_subtotal: Schema.Number.annotate({
          description:
            "Total amount of the carbon removal in the currency's smallest unit.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_total: Schema.Number.annotate({
          description:
            "Total amount of the order including fees in the currency's smallest unit.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        beneficiary: Schema.optionalKey(Stripeclimate_removals_beneficiary),
        canceled_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the order was canceled. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        cancellation_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "expired",
              "product_unavailable",
              "requested",
            ]).annotate({
              description: "Reason for the cancellation of this order.",
            }),
            Schema.Null,
          ]),
        ),
        certificate: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "For delivered orders, a URL to a delivery certificate for the order.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        confirmed_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the order was confirmed. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase, representing the currency for this order.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        delayed_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the order's expected_delivery_year was delayed. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        delivered_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the order was delivered. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        delivery_details: Schema.Array(
          Stripeclimate_removals_order_deliveries,
        ).annotate({
          description:
            "Details about the delivery of carbon removal for this order.",
        }),
        expected_delivery_year: Schema.Number.annotate({
          description:
            "The year this order is expected to be delivered. If the year is in the past, the order is a spot purchase and will be delivered within 30 days of purchase.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        metric_tons: Schema.String.annotate({
          description:
            "Quantity of carbon removal that is included in this order.",
          format: "decimal",
        }),
        object: Schema.Literal("climate.order").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        product: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeclimate_product,
        ]).annotate({
          description:
            "Unique ID for the Climate `Product` this order is purchasing.",
        }),
        product_substituted_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the order's product was substituted for a different product. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals([
          "awaiting_funds",
          "canceled",
          "confirmed",
          "delivered",
          "open",
        ]).annotate({ description: "The current status of this order." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Climate order",
      description:
        "Orders represent your intent to purchase a particular Climate product. When you create an order, the\npayment is deducted from your merchant balance.",
      identifier: "Stripeclimate.order",
    }),
);
export const Stripefinancial_connections_session = Schema.suspend(
  (): Schema.Codec<Stripefinancial_connections_session> =>
    Schema.StructWithRest(
      Schema.Struct({
        account_holder: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebank_connections_resource_accountholder,
            ]).annotate({
              description:
                "The account holder for whom accounts are collected in this session.",
            }),
            Schema.Null,
          ]),
        ),
        accounts: Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(Stripefinancial_connections_account).annotate({
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
            })
              .check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              )
              .check(
                Schema.isPattern(
                  new globalThis.RegExp(
                    "^\\/v1\\/financial_connections\\/accounts",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/v1\\/financial_connections\\/accounts",
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
          title: "BankConnectionsResourceLinkedAccountList",
          description:
            "The accounts that were collected as part of this Session.",
        }),
        bank_account_token: Schema.optionalKey(Stripetoken),
        client_secret: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A value that will be passed to the client to launch the authentication flow.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        filters: Schema.optionalKey(
          Stripebank_connections_resource_link_account_session_filters,
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        limits: Schema.optionalKey(
          Stripebank_connections_resource_link_account_session_limits,
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        manual_entry: Schema.optionalKey(
          Stripebank_connections_resource_link_account_session_manual_entry,
        ),
        object: Schema.Literal("financial_connections.session").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        permissions: Schema.Array(
          Schema.Literals([
            "balances",
            "ownership",
            "payment_method",
            "transactions",
          ]),
        ).annotate({
          description:
            "Permissions requested for accounts collected during this session.",
        }),
        prefetch: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals(["balances", "ownership", "transactions"]),
            ).annotate({
              description:
                "Data features requested to be retrieved upon account creation.",
            }),
            Schema.Null,
          ]),
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Session",
      description:
        "A Financial Connections Session is the secure way to programmatically launch the client-side Stripe.js modal that lets your users link their accounts.",
      identifier: "Stripefinancial_connections.session",
    }),
);
export const Stripeidentity_verification_session = Schema.suspend(
  (): Schema.Codec<Stripeidentity_verification_session> =>
    Schema.StructWithRest(
      Schema.Struct({
        client_reference_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        client_secret: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The short-lived client secret used by Stripe.js to [show a verification modal](https://docs.stripe.com/js/identity/modal) inside your app. This client secret expires after 24 hours and can only be used once. Don’t store it, log it, embed it in a URL, or expose it to anyone other than the user. Make sure that you have TLS enabled on any page that includes the client secret. Refer to our docs on [passing the client secret to the frontend](https://docs.stripe.com/identity/verification-sessions#client-secret) to learn more.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last_error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_session_last_error]).annotate({
              description:
                "If present, this property tells you the last error encountered when processing the verification.",
            }),
            Schema.Null,
          ]),
        ),
        last_verification_report: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeidentity_verification_report,
            ]).annotate({
              description:
                "ID of the most recent VerificationReport. [Learn more about accessing detailed verification results.](https://docs.stripe.com/identity/verification-sessions#results)",
            }),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        object: Schema.Literal("identity.verification_session").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_verification_session_options]).annotate({
              description:
                "A set of options for the session’s verification checks.",
            }),
            Schema.Null,
          ]),
        ),
        provided_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_provided_details]).annotate({
              description:
                "Details provided about the user being verified. These details may be shown to the user.",
            }),
            Schema.Null,
          ]),
        ),
        redaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeverification_session_redaction]).annotate({
              description:
                "Redaction status of this VerificationSession. If the VerificationSession is not redacted, this field will be null.",
            }),
            Schema.Null,
          ]),
        ),
        related_customer: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Customer ID" }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        related_customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The ID of the Account representing a customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        related_person: Schema.optionalKey(Stripegelato_related_person),
        status: Schema.Literals([
          "canceled",
          "processing",
          "requires_input",
          "verified",
        ]).annotate({
          description:
            "Status of this VerificationSession. [Learn more about the lifecycle of sessions](https://docs.stripe.com/identity/how-sessions-work).",
        }),
        type: Schema.Literals([
          "document",
          "id_number",
          "verification_flow",
        ]).annotate({
          description:
            "The type of [verification check](https://docs.stripe.com/identity/verification-checks) to be performed.",
        }),
        url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The short-lived URL that you use to redirect a user to Stripe to submit their identity information. This URL expires after 48 hours and can only be used once. Don’t store it, log it, send it in emails or expose it to anyone other than the user. Refer to our docs on [verifying identity documents](https://docs.stripe.com/identity/verify-identity-documents?platform=web&type=redirect) to learn how to redirect users to Stripe.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        verification_flow: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The configuration token of a verification flow from the dashboard.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        verified_outputs: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripegelato_verified_outputs]).annotate({
              description: "The user’s verified data.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "VerificationSession",
      description:
        "A VerificationSession guides you through the process of collecting and verifying the identities\nof your users. It contains details about the type of verification, such as what [verification\ncheck](/docs/identity/verification-checks) to perform. Only create one VerificationSession for\neach verification in your system.\n\nA VerificationSession transitions through [multiple\nstatuses](/docs/identity/how-sessions-work) throughout its lifetime as it progresses through\nthe verification flow. The VerificationSession contains the user's verified data after\nverification checks are complete.\n\nRelated guide: [The Verification Sessions API](https://docs.stripe.com/identity/verification-sessions)",
      identifier: "Stripeidentity.verification_session",
    }),
);
export const Stripeterminal_reader_reader_resource_collect_inputs_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_collect_inputs_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          inputs: Schema.Array(
            Stripeterminal_reader_reader_resource_input,
          ).annotate({ description: "List of inputs to be collected." }),
          metadata: Schema.optionalKey(
            Schema.Union([
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.isMaxCodePoints(500).annotate({
                    expected: "a string with at most 500 code points",
                  }),
                ),
              ).annotate({
                description:
                  "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
              }),
              Schema.Null,
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "CollectInputsAction",
        description: "Represents a reader action to collect customer inputs",
        identifier:
          "Stripeterminal_reader_reader_resource_collect_inputs_action",
      }),
  );
export const Stripethree_d_secure_authentication = Schema.suspend(
  (): Schema.Codec<Stripethree_d_secure_authentication> =>
    Schema.StructWithRest(
      Schema.Struct({
        acquirer_details: Schema.optionalKey(
          Stripethree_d_secure_standalone_resource_acquirer_details,
        ),
        amount: Schema.optionalKey(
          Schema.Number.annotate({
            description: "The amount for this 3DS Authentication.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        challenge_url: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The URL for presenting a challenge to your cardholder, present if status is requires_challenge.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        channel: Stripethree_d_secure_standalone_resource_channel,
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
            format: "currency",
          }),
        ),
        directory_server: Schema.Literals([
          "american_express",
          "cartes_bancaires",
          "discover",
          "mastercard",
          "visa",
        ]).annotate({
          description:
            "The 3DS directory server with which this 3DS Authentication was processed.",
        }),
        fingerprinting_url: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The URL for performing issuer fingerprinting, present if fingerprinting is supported for the given payment method.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        flow_preference: Schema.optionalKey(
          Stripethree_d_secure_standalone_resource_flow_preference,
        ),
        future_usage: Schema.optionalKey(
          Stripethree_d_secure_standalone_resource_future_usage,
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        message_category: Schema.Literals([
          "non_payment_authentication",
          "payment_authentication",
        ]).annotate({
          description:
            "Indicates whether this 3DS Authentication is being performed for a payment or non-payment use case.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("three_d_secure.authentication").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        outcome: Schema.optionalKey(
          Schema.Literals([
            "abandoned",
            "attempt_acknowledged",
            "authenticated",
            "canceled",
            "denied",
            "informational",
            "internal_error",
            "not_supported",
            "not_triggered",
            "processing_error",
            "rejected",
          ]).annotate({
            description: "The outcome of this 3DS Authentication.",
          }),
        ),
        outcome_details: Schema.optionalKey(
          Stripethree_d_secure_standalone_resource_outcome_details,
        ),
        payment_method: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripepayment_method,
        ]).annotate({
          description:
            "ID of the payment method (a PaymentMethod object) to attach to this 3DS Authentication.",
        }),
        reason: Schema.optionalKey(
          Schema.Literals([
            "cardholder_authentication",
            "issuer_requested",
            "liability_shift",
            "processing_costs",
            "regulatory_compliance",
          ]).annotate({
            description: "The reason for invoking this 3DS Authentication.",
          }),
        ),
        shipping_address: Schema.optionalKey(
          Stripethree_d_secure_standalone_resource_shipping_address,
        ),
        status: Schema.Literals([
          "canceled",
          "error",
          "failed",
          "requires_challenge",
          "requires_submission",
          "succeeded",
        ]).annotate({ description: "Status of this Authentication." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "3DS Authentication",
      description:
        "The Standalone 3DS API allows you to run EMV 3D Secure (3DS) authentication using Stripe while authorizing the payment with any PSP.\n\nRelated guide: [Standalone 3DS](/payments/3d-secure/standalone-3d-secure)",
      identifier: "Stripethree_d_secure.authentication",
    }),
);
export const Stripefunding_instructions = Schema.suspend(
  (): Schema.Codec<Stripefunding_instructions> =>
    Schema.StructWithRest(
      Schema.Struct({
        bank_transfer: Stripefunding_instructions_bank_transfer,
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        funding_type: Schema.Literal("bank_transfer").annotate({
          description: "The `funding_type` of the returned instructions",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("funding_instructions").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Funding Instruction",
      description:
        "Each customer has a [`balance`](https://docs.stripe.com/api/customers/object#customer_object-balance) that is\nautomatically applied to future invoices and payments using the `customer_balance` payment method.\nCustomers can fund this balance by initiating a bank transfer to any account in the\n`financial_addresses` field.\nRelated guide: [Customer balance funding instructions](https://docs.stripe.com/payments/customer-balance/funding-instructions)",
      identifier: "Stripefunding_instructions",
    }),
);
export const Stripecredit_note_line_item = Schema.suspend(
  (): Schema.Codec<Stripecredit_note_line_item> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The integer amount in cents (or local equivalent) representing the gross amount being credited for this line item, excluding (exclusive) tax and discounts.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Description of the item being credited.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discount_amount: Schema.Number.annotate({
          description:
            "The integer amount in cents (or local equivalent) representing the discount being credited for this line item.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        discount_amounts: Schema.Array(
          Stripediscounts_resource_discount_amount,
        ).annotate({
          description:
            "The amount of discount calculated per discount for this line item",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice_line_item: Schema.optionalKey(
          Schema.String.annotate({
            description: "ID of the invoice line item being credited",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("credit_note_line_item").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        pretax_credit_amounts: Schema.Array(
          Stripecredit_notes_pretax_credit_amount,
        ).annotate({
          description:
            "The pretax credit amounts (ex: discount, credit grants, etc) for this line item.",
        }),
        quantity: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The number of units of product being credited.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        tax_rates: Schema.Array(Stripetax_rate).annotate({
          description: "The tax rates which apply to the line item.",
        }),
        taxes: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripebilling_bill_resource_invoicing_taxes_tax,
            ).annotate({
              description: "The tax information of the line item.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals([
          "custom_line_item",
          "invoice_line_item",
        ]).annotate({
          description:
            "The type of the credit note line item, one of `invoice_line_item` or `custom_line_item`. When the type is `invoice_line_item` there is an additional `invoice_line_item` property on the resource the value of which is the id of the credited line item on the invoice.",
        }),
        unit_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The cost of each unit of product being credited.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        unit_amount_decimal: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.",
              format: "decimal",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Credit Note Line Item",
      description: "The credit note line item object",
      identifier: "Stripecredit_note_line_item",
    }),
);
export const Stripequotes_resource_total_details = Schema.suspend(
  (): Schema.Codec<Stripequotes_resource_total_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_discount: Schema.Number.annotate({
          description: "This is the sum of all the discounts.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_shipping: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "This is the sum of all the shipping amounts.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        amount_tax: Schema.Number.annotate({
          description: "This is the sum of all the tax amounts.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        breakdown: Schema.optionalKey(
          Stripequotes_resource_total_details_resource_breakdown,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "QuotesResourceTotalDetails",
      description: "",
      identifier: "Stripequotes_resource_total_details",
    }),
);
export const Stripeterminal_reader_reader_resource_reader_action =
  Schema.suspend(
    (): Schema.Codec<Stripeterminal_reader_reader_resource_reader_action> =>
      Schema.StructWithRest(
        Schema.Struct({
          api_error: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeapi_errors]).annotate({
                description:
                  "The reader action failed due to an [API error](https://docs.stripe.com/api/errors). Only present when `status` is `failed` and the underlying failure was an API error. Avoid parsing the `message` field for programmatic logic; use `type` or `code` instead. The `message` field is for display to humans only and may be updated at anytime. Requires [reader version](https://docs.stripe.com/terminal/readers/stripe-reader-s700-s710#reader-software-version) 2.42 or later. Readers on older versions always return null.",
              }),
              Schema.Null,
            ]),
          ),
          collect_inputs: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_collect_inputs_action,
          ),
          collect_payment_method: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_collect_payment_method_action,
          ),
          confirm_payment_intent: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_confirm_payment_intent_action,
          ),
          failure_code: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Failure code, only set if status is `failed`.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          failure_message: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Detailed failure message, only set if status is `failed`.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          print_content: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_print_content,
          ),
          process_payment_intent: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_process_payment_intent_action,
          ),
          process_setup_intent: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_process_setup_intent_action,
          ),
          refund_payment: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_refund_payment_action,
          ),
          set_reader_display: Schema.optionalKey(
            Stripeterminal_reader_reader_resource_set_reader_display_action,
          ),
          status: Schema.Literals([
            "failed",
            "in_progress",
            "succeeded",
          ]).annotate({
            description: "Status of the action performed by the reader.",
          }),
          type: Schema.Literals([
            "collect_inputs",
            "collect_payment_method",
            "confirm_payment_intent",
            "print_content",
            "process_payment_intent",
            "process_setup_intent",
            "refund_payment",
            "set_reader_display",
          ]).annotate({
            description: "Type of action performed by the reader.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "ReaderAction",
        description: "Represents an action performed by the reader",
        identifier: "Stripeterminal_reader_reader_resource_reader_action",
      }),
  );
export const Stripequotes_resource_recurring = Schema.suspend(
  (): Schema.Codec<Stripequotes_resource_recurring> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_subtotal: Schema.Number.annotate({
          description: "Total before any discounts or taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_total: Schema.Number.annotate({
          description: "Total after discounts and taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        interval: Schema.Literals(["day", "month", "week", "year"]).annotate({
          description:
            "The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.",
        }),
        interval_count: Schema.Number.annotate({
          description:
            "The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        total_details: Stripequotes_resource_total_details,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "QuotesResourceRecurring",
      description: "",
      identifier: "Stripequotes_resource_recurring",
    }),
);
export const Stripequotes_resource_upfront = Schema.suspend(
  (): Schema.Codec<Stripequotes_resource_upfront> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_subtotal: Schema.Number.annotate({
          description: "Total before any discounts or taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_total: Schema.Number.annotate({
          description: "Total after discounts and taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        line_items: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(Stripeitem).annotate({
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
            title: "QuotesResourceListLineItems",
            description:
              "The line items that will appear on the next invoice after this quote is accepted. This does not include pending invoice items that exist on the customer but may still be included in the next invoice.",
          }),
        ),
        total_details: Stripequotes_resource_total_details,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "QuotesResourceUpfront",
      description: "",
      identifier: "Stripequotes_resource_upfront",
    }),
);
export const Stripecheckout_session = Schema.suspend(
  (): Schema.Codec<Stripecheckout_session> =>
    Schema.StructWithRest(
      Schema.Struct({
        adaptive_pricing: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_adaptive_pricing,
            ]).annotate({
              description:
                "Settings for price localization with [Adaptive Pricing](https://docs.stripe.com/payments/checkout/adaptive-pricing).",
            }),
            Schema.Null,
          ]),
        ),
        after_expiration: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_after_expiration,
            ]).annotate({
              description:
                "When set, provides configuration for actions to take if this Checkout Session expires.",
            }),
            Schema.Null,
          ]),
        ),
        allow_promotion_codes: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description: "Enables user redeemable promotion codes.",
            }),
            Schema.Null,
          ]),
        ),
        allowed_payment_method_types: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "A list of the types of payment methods (e.g., `card`) this Checkout Session can accept.",
            }),
            Schema.Null,
          ]),
        ),
        amount_subtotal: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Total of all items before discounts or taxes are applied.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        amount_total: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Total of all items after discounts and taxes are applied.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        automatic_tax: Stripepayment_pages_checkout_session_automatic_tax,
        billing_address_collection: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["auto", "required"]).annotate({
              description:
                "Describes whether Checkout should collect the customer's billing address. Defaults to `auto`.",
            }),
            Schema.Null,
          ]),
        ),
        branding_settings: Schema.optionalKey(
          Stripepayment_pages_checkout_session_branding_settings,
        ),
        cancel_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If set, Checkout displays a back button and customers will be directed to this URL if they decide to cancel payment and return to your website.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        client_reference_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A unique string to reference the Checkout Session. This can be a\ncustomer ID, a cart ID, or similar, and can be used to reconcile the\nSession with your internal systems.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        client_secret: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The client secret of your Checkout Session. Applies to Checkout Sessions with `ui_mode: embedded_page` or `ui_mode: elements`. For `ui_mode: embedded_page`, the client secret is to be used when initializing Stripe.js embedded checkout.\n For `ui_mode: elements`, use the client secret with [initCheckout](https://docs.stripe.com/js/custom_checkout/init) on your front end.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        collected_information: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_collected_information,
            ]).annotate({
              description:
                "Information about the customer collected within the Checkout Session.",
            }),
            Schema.Null,
          ]),
        ),
        consent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_consent,
            ]).annotate({
              description: "Results of `consent_collection` for this session.",
            }),
            Schema.Null,
          ]),
        ),
        consent_collection: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_consent_collection,
            ]).annotate({
              description:
                "When set, provides configuration for the Checkout Session to gather active consent from customers.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
              format: "currency",
            }),
            Schema.Null,
          ]),
        ),
        currency_conversion: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_currency_conversion,
            ]).annotate({
              description:
                "Currency conversion details for [Adaptive Pricing](https://docs.stripe.com/payments/checkout/adaptive-pricing) sessions created before 2025-03-31.",
            }),
            Schema.Null,
          ]),
        ),
        custom_fields: Schema.Array(
          Stripepayment_pages_checkout_session_custom_fields,
        ).annotate({
          description:
            "Collect additional information from your customer using custom fields. Up to 3 fields are supported. You can't set this parameter if `ui_mode` is `elements`.",
        }),
        custom_text: Stripepayment_pages_checkout_session_custom_text,
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecustomer,
              Stripedeleted_customer,
            ]).annotate({
              description:
                "The ID of the customer for this Session.\nFor Checkout Sessions in `subscription` mode or Checkout Sessions with `customer_creation` set as `always` in `payment` mode, Checkout\nwill create a new customer object based on information provided\nduring the payment flow unless an existing customer was provided when\nthe Session was created.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The ID of the account for this Session.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_creation: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["always", "if_required"]).annotate({
              description:
                "Configure whether a Checkout Session creates a Customer when the Checkout Session completes.",
            }),
            Schema.Null,
          ]),
        ),
        customer_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_customer_details,
            ]).annotate({
              description:
                "The customer details including the customer's tax exempt status and the customer's tax IDs. Customer's address details are not present on Sessions in `setup` mode.",
            }),
            Schema.Null,
          ]),
        ),
        customer_email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If provided, this value will be used when the Customer object is created.\nIf not provided, customers will be asked to enter their email address.\nUse this parameter to prefill customer data if you already have an email\non file. To access information about the customer once the payment flow is\ncomplete, use the `customer` attribute.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripepayment_pages_checkout_session_discount,
            ).annotate({
              description:
                "List of coupons and promotion codes attached to the Checkout Session.",
            }),
            Schema.Null,
          ]),
        ),
        excluded_payment_method_types: Schema.optionalKey(
          Schema.Array(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ).annotate({
            description:
              "A list of the types of payment methods (e.g., `card`) that should be excluded from this Checkout Session. This should only be used when payment methods for this Checkout Session are managed through the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods).",
          }),
        ),
        expires_at: Schema.Number.annotate({
          description:
            "The timestamp at which the Checkout Session will expire.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        integration_identifier: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The integration identifier for this Checkout Session. Multiple Checkout Sessions can have the same integration identifier.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        invoice: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeinvoice,
            ]).annotate({
              description:
                "ID of the invoice created by the Checkout Session, if it exists.",
            }),
            Schema.Null,
          ]),
        ),
        invoice_creation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_invoice_creation,
            ]).annotate({
              description:
                "Details on the state of invoice creation for the Checkout Session.",
            }),
            Schema.Null,
          ]),
        ),
        line_items: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(Stripeitem).annotate({
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
            title: "PaymentPagesCheckoutSessionListLineItems",
            description: "The line items purchased by the customer.",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        locale: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "auto",
              "bg",
              "cs",
              "da",
              "de",
              "el",
              "en",
              "en-GB",
              "es",
              "es-419",
              "et",
              "fi",
              "fil",
              "fr",
              "fr-CA",
              "hi-IN",
              "hr",
              "hu",
              "id",
              "it",
              "ja",
              "ko",
              "lt",
              "lv",
              "ms",
              "mt",
              "nb",
              "nl",
              "pl",
              "pt",
              "pt-BR",
              "ro",
              "ru",
              "sk",
              "sl",
              "sv",
              "th",
              "tr",
              "vi",
              "zh",
              "zh-HK",
              "zh-TW",
            ]).annotate({
              description:
                "The IETF language tag of the locale Checkout is displayed in. If blank or `auto`, the browser's locale is used.",
            }),
            Schema.Null,
          ]),
        ),
        managed_payments: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_managed_payments,
            ]).annotate({
              description:
                "Settings for Managed Payments for this Checkout Session and resulting [PaymentIntents](/api/payment_intents/object), [Invoices](/api/invoices/object), and [Subscriptions](/api/subscriptions/object).",
            }),
            Schema.Null,
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        mode: Schema.Literals(["payment", "setup", "subscription"]).annotate({
          description: "The mode of the Checkout Session.",
        }),
        name_collection: Schema.optionalKey(
          Stripepayment_pages_checkout_session_name_collection,
        ),
        object: Schema.Literal("checkout.session").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        optional_items: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripepayment_pages_checkout_session_optional_item,
            ).annotate({
              description:
                "The optional items presented to the customer at checkout.",
            }),
            Schema.Null,
          ]),
        ),
        origin_context: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["mobile_app", "web"]).annotate({
              description:
                "Where the user is coming from. This informs the optimizations that are applied to the session.",
            }),
            Schema.Null,
          ]),
        ),
        payment_intent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripepayment_intent,
            ]).annotate({
              description:
                "The ID of the PaymentIntent for Checkout Sessions in `payment` mode. You can't confirm or cancel the PaymentIntent for a Checkout Session. To cancel, [expire the Checkout Session](https://docs.stripe.com/api/checkout/sessions/expire) instead.",
            }),
            Schema.Null,
          ]),
        ),
        payment_link: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripepayment_link,
            ]).annotate({
              description:
                "The ID of the Payment Link that created this Session.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_collection: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["always", "if_required"]).annotate({
              description:
                "Configure whether a Checkout Session should collect a payment method. Can only be set in `subscription` mode. Defaults to `always`.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_configuration_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_config_biz_payment_method_configuration_details,
            ]).annotate({
              description:
                "Information about the payment method configuration used for this Checkout session if using dynamic payment methods.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripecheckout_session_payment_method_options,
            ]).annotate({
              description:
                "Payment-method-specific configuration for the PaymentIntent or SetupIntent of this CheckoutSession.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_types: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "A list of the types of payment methods (e.g. card) this Checkout\nSession is allowed to accept.",
        }),
        payment_status: Schema.Literals([
          "no_payment_required",
          "paid",
          "unpaid",
        ]).annotate({
          description:
            "The payment status of the Checkout Session, one of `paid`, `unpaid`, or `no_payment_required`.\nYou can use this value to decide when to fulfill your customer's order.",
        }),
        permissions: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_permissions,
            ]).annotate({
              description:
                "This property is used to set up permissions for various actions (e.g., update) on the CheckoutSession object.\n\nFor specific permissions, please refer to their dedicated subsections, such as `permissions.update_shipping_details`.",
            }),
            Schema.Null,
          ]),
        ),
        phone_number_collection: Schema.optionalKey(
          Stripepayment_pages_checkout_session_phone_number_collection,
        ),
        presentment_details: Schema.optionalKey(
          Stripepayment_flows_payment_intent_presentment_details,
        ),
        recovered_from: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the original expired Checkout Session that triggered the recovery flow.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        redirect_on_completion: Schema.optionalKey(
          Schema.Literals(["always", "if_required", "never"]).annotate({
            description:
              "This parameter applies to `ui_mode: embedded_page`. Learn more about the [redirect behavior](https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=embedded-form) of embedded sessions. Defaults to `always`.",
          }),
        ),
        return_url: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Applies to Checkout Sessions with `ui_mode: embedded_page` or `ui_mode: elements`. The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        saved_payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_saved_payment_method_options,
            ]).annotate({
              description:
                "Controls saved payment method settings for the session. Only available in `payment` and `subscription` mode.",
            }),
            Schema.Null,
          ]),
        ),
        setup_intent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripesetup_intent,
            ]).annotate({
              description:
                "The ID of the SetupIntent for Checkout Sessions in `setup` mode. You can't confirm or cancel the SetupIntent for a Checkout Session. To cancel, [expire the Checkout Session](https://docs.stripe.com/api/checkout/sessions/expire) instead.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_address_collection: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_shipping_address_collection,
            ]).annotate({
              description:
                "When set, provides configuration for Checkout to collect a shipping address from a customer.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_cost: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_shipping_cost,
            ]).annotate({
              description:
                "The details of the customer cost of shipping, including the customer chosen ShippingRate.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_options: Schema.Array(
          Stripepayment_pages_checkout_session_shipping_option,
        ).annotate({
          description: "The shipping rate options applied to this Session.",
        }),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["complete", "expired", "open"]).annotate({
              description:
                "The status of the Checkout Session, one of `open`, `complete`, or `expired`.",
            }),
            Schema.Null,
          ]),
        ),
        submit_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "auto",
              "book",
              "donate",
              "pay",
              "subscribe",
            ]).annotate({
              description:
                "Describes the type of transaction being performed by Checkout in order to customize\nrelevant text on the page, such as the submit button. `submit_type` can only be\nspecified on Checkout Sessions in `payment` mode. If blank or `auto`, `pay` is used.",
            }),
            Schema.Null,
          ]),
        ),
        subscription: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripesubscription,
            ]).annotate({
              description:
                "The ID of the [Subscription](https://docs.stripe.com/api/subscriptions) for Checkout Sessions in `subscription` mode.",
            }),
            Schema.Null,
          ]),
        ),
        success_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The URL the customer will be directed to after the payment or\nsubscription creation is successful.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        tax_id_collection: Schema.optionalKey(
          Stripepayment_pages_checkout_session_tax_id_collection,
        ),
        total_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_total_details,
            ]).annotate({
              description:
                "Tax and discount details for the computed total amount.",
            }),
            Schema.Null,
          ]),
        ),
        ui_mode: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "elements",
              "embedded_page",
              "form",
              "hosted_page",
            ]).annotate({
              description:
                "The UI mode of the Session. Defaults to `hosted_page`.",
            }),
            Schema.Null,
          ]),
        ),
        url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The URL to the Checkout Session. Applies to Checkout Sessions with `ui_mode: hosted_page`. Redirect customers to this URL to take them to Checkout. If you’re using [Custom Domains](https://docs.stripe.com/payments/checkout/custom-domains), the URL will use your subdomain. Otherwise, it’ll use `checkout.stripe.com.`\nThis value is only present when the session is active.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        wallet_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecheckout_session_wallet_options]).annotate({
              description:
                "Wallet-specific configuration for this Checkout Session.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Checkout Session",
      description:
        "A Checkout Session represents your customer's session as they pay for\none-time purchases or subscriptions through [Checkout](https://docs.stripe.com/payments/checkout)\nor [Payment Links](https://docs.stripe.com/payments/payment-links). We recommend creating a\nnew Session each time your customer attempts to pay.\n\nOnce payment is successful, the Checkout Session will contain a reference\nto the [Customer](https://docs.stripe.com/api/customers), and either the successful\n[PaymentIntent](https://docs.stripe.com/api/payment_intents) or an active\n[Subscription](https://docs.stripe.com/api/subscriptions).\n\nYou can create a Checkout Session on your server and redirect to its URL\nto begin Checkout.\n\nRelated guide: [Checkout quickstart](https://docs.stripe.com/checkout/quickstart)",
      identifier: "Stripecheckout.session",
    }),
);
export const Stripeterminal_reader = Schema.suspend(
  (): Schema.Codec<Stripeterminal_reader> =>
    Schema.StructWithRest(
      Schema.Struct({
        action: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeterminal_reader_reader_resource_reader_action,
            ]).annotate({
              description: "The most recent action performed by the reader.",
            }),
            Schema.Null,
          ]),
        ),
        device_sw_version: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The current software version of the reader.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        device_type: Schema.Literals([
          "bbpos_chipper2x",
          "bbpos_wisepad3",
          "bbpos_wisepos_e",
          "mobile_phone_reader",
          "simulated_stripe_s700",
          "simulated_stripe_s710",
          "simulated_stripe_t600",
          "simulated_verifone_m425",
          "simulated_verifone_p630",
          "simulated_verifone_ux700",
          "simulated_verifone_v660p",
          "simulated_wisepos_e",
          "stripe_m2",
          "stripe_s700",
          "stripe_s710",
          "stripe_t600",
          "verifone_P400",
          "verifone_m425",
          "verifone_p630",
          "verifone_ux700",
          "verifone_v660p",
        ]).annotate({ description: "Device type of the reader." }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        ip_address: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The local IP address of the reader.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        label: Schema.String.annotate({
          description:
            "Custom label given to the reader for easier identification.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last_seen_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The last time this reader reported to Stripe backend. Timestamp is measured in milliseconds since the Unix epoch. Unlike most other Stripe timestamp fields which use seconds, this field uses milliseconds.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        location: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeterminal_location,
            ]).annotate({
              description: "The location identifier of the reader.",
            }),
            Schema.Null,
          ]),
        ),
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        object: Schema.Literal("terminal.reader").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        serial_number: Schema.String.annotate({
          description: "Serial number of the reader.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["offline", "online"]).annotate({
              description:
                "The networking status of the reader. This value is `null` for mobile readers. We do not recommend using this field in flows that may block taking payments.",
            }),
            Schema.Null,
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Reader",
      description:
        "A Reader represents a physical device for accepting payment details.\n\nRelated guide: [Connecting to a reader](https://docs.stripe.com/terminal/payments/connect-reader)",
      identifier: "Stripeterminal.reader",
    }),
);
export const Stripequotes_resource_computed = Schema.suspend(
  (): Schema.Codec<Stripequotes_resource_computed> =>
    Schema.StructWithRest(
      Schema.Struct({
        recurring: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripequotes_resource_recurring]).annotate({
              description:
                "The definitive totals and line items the customer will be charged on a recurring basis. Takes into account the line items with recurring prices and discounts with `duration=forever` coupons only. Defaults to `null` if no inputted line items with recurring prices.",
            }),
            Schema.Null,
          ]),
        ),
        upfront: Stripequotes_resource_upfront,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "QuotesResourceComputed",
      description: "",
      identifier: "Stripequotes_resource_computed",
    }),
);
