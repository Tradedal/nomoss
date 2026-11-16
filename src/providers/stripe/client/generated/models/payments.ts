// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import { Stripetax_id } from "./catalog.js";
import {
  Stripeaddress,
  Stripeapplication,
  Stripeconnect_account_reference,
  Stripecoupon,
  Stripedeleted_application,
  Stripedeleted_tax_id,
  Stripeitem,
  Stripeline_items_discount_amount,
  Stripeline_items_tax_amount,
  Stripepromotion_code,
  Stripeshipping_rate,
} from "./common.js";
import {
  Stripeinvoice_setting_checkout_rendering_options,
  Stripeinvoice_setting_custom_field,
} from "./invoices.js";
import { Stripepayment_intent_amount_details_line_item } from "./paymentIntents.js";
import {
  Stripepayment_method_details_ach_credit_transfer,
  Stripepayment_method_details_ach_debit,
  Stripepayment_method_details_card_installments_plan,
  Stripepayment_method_details_card_present,
  Stripepayment_method_details_crypto,
  Stripepayment_method_details_customer_balance,
  Stripepayment_method_details_fpx,
  Stripepayment_method_details_grabpay,
  Stripepayment_method_details_interac_present,
  Stripepayment_method_details_kr_card,
  Stripepayment_method_details_payment_record_acss_debit,
  Stripepayment_method_details_payment_record_affirm,
  Stripepayment_method_details_payment_record_afterpay_clearpay,
  Stripepayment_method_details_payment_record_alipay,
  Stripepayment_method_details_payment_record_alma,
  Stripepayment_method_details_payment_record_amazon_pay,
  Stripepayment_method_details_payment_record_au_becs_debit,
  Stripepayment_method_details_payment_record_bacs_debit,
  Stripepayment_method_details_payment_record_bancontact,
  Stripepayment_method_details_payment_record_billie,
  Stripepayment_method_details_payment_record_bizum,
  Stripepayment_method_details_payment_record_blik,
  Stripepayment_method_details_payment_record_boleto,
  Stripepayment_method_details_payment_record_cashapp,
  Stripepayment_method_details_payment_record_eps,
  Stripepayment_method_details_payment_record_giropay,
  Stripepayment_method_details_payment_record_ideal,
  Stripepayment_method_details_payment_record_kakao_pay,
  Stripepayment_method_details_payment_record_klarna,
  Stripepayment_method_details_payment_record_konbini,
  Stripepayment_method_details_payment_record_link,
  Stripepayment_method_details_payment_record_mb_way,
  Stripepayment_method_details_payment_record_mobilepay,
  Stripepayment_method_details_payment_record_momo,
  Stripepayment_method_details_payment_record_multibanco,
  Stripepayment_method_details_payment_record_naver_pay,
  Stripepayment_method_details_payment_record_nz_bank_account,
  Stripepayment_method_details_payment_record_oxxo,
  Stripepayment_method_details_payment_record_p24,
  Stripepayment_method_details_payment_record_pay_by_bank,
  Stripepayment_method_details_payment_record_payco,
  Stripepayment_method_details_payment_record_paynow,
  Stripepayment_method_details_payment_record_paypay,
  Stripepayment_method_details_payment_record_payto,
  Stripepayment_method_details_payment_record_pix,
  Stripepayment_method_details_payment_record_promptpay,
  Stripepayment_method_details_payment_record_revolut_pay,
  Stripepayment_method_details_payment_record_samsung_pay,
  Stripepayment_method_details_payment_record_satispay,
  Stripepayment_method_details_payment_record_scalapay,
  Stripepayment_method_details_payment_record_sepa_debit,
  Stripepayment_method_details_payment_record_sequra,
  Stripepayment_method_details_payment_record_sofort,
  Stripepayment_method_details_payment_record_sunbit,
  Stripepayment_method_details_payment_record_swish,
  Stripepayment_method_details_payment_record_twint,
  Stripepayment_method_details_payment_record_upi,
  Stripepayment_method_details_payment_record_us_bank_account,
  Stripepayment_method_details_payment_record_wechat_pay,
  Stripepayment_method_details_payment_record_zip,
  Stripepayment_method_details_paypal,
  Stripepayment_method_details_stripe_account,
  Stripepayment_method_details_wechat,
} from "./paymentMethodDetails.js";
import { Stripebank_account, Stripecard } from "./paymentSources.js";
import { Stripesource } from "./sources.js";
import { Stripesubscriptions_trials_resource_trial_settings } from "./subscriptions.js";

export type Stripepayment_record = {
  readonly amount: Stripepayments_primitives_payment_records_resource_amount;
  readonly amount_authorized: Stripepayments_primitives_payment_records_resource_amount;
  readonly amount_canceled: Stripepayments_primitives_payment_records_resource_amount;
  readonly amount_failed: Stripepayments_primitives_payment_records_resource_amount;
  readonly amount_guaranteed: Stripepayments_primitives_payment_records_resource_amount;
  readonly amount_refunded: Stripepayments_primitives_payment_records_resource_amount;
  readonly amount_requested: Stripepayments_primitives_payment_records_resource_amount;
  readonly application?: string | null;
  readonly created: number;
  readonly customer_details?: Stripepayments_primitives_payment_records_resource_customer_details | null;
  readonly customer_presence?: "off_session" | "on_session" | null;
  readonly description?: string | null;
  readonly id: string;
  readonly latest_payment_attempt_record?: string | null;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "payment_record";
  readonly payment_method_details?: Stripepayments_primitives_payment_records_resource_payment_method_details | null;
  readonly processor_details: Stripepayments_primitives_payment_records_resource_processor_details;
  readonly reported_by: "self" | "stripe";
  readonly shipping_details?: Stripepayments_primitives_payment_records_resource_shipping_details | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_details =
  {
    readonly ach_credit_transfer?: Stripepayment_method_details_ach_credit_transfer;
    readonly ach_debit?: Stripepayment_method_details_ach_debit;
    readonly acss_debit?: Stripepayment_method_details_payment_record_acss_debit;
    readonly affirm?: Stripepayment_method_details_payment_record_affirm;
    readonly afterpay_clearpay?: Stripepayment_method_details_payment_record_afterpay_clearpay;
    readonly alipay?: Stripepayment_method_details_payment_record_alipay;
    readonly alma?: Stripepayment_method_details_payment_record_alma;
    readonly amazon_pay?: Stripepayment_method_details_payment_record_amazon_pay;
    readonly au_becs_debit?: Stripepayment_method_details_payment_record_au_becs_debit;
    readonly bacs_debit?: Stripepayment_method_details_payment_record_bacs_debit;
    readonly bancontact?: Stripepayment_method_details_payment_record_bancontact;
    readonly billie?: Stripepayment_method_details_payment_record_billie;
    readonly billing_details?: Stripepayments_primitives_payment_records_resource_billing_details | null;
    readonly bizum?: Stripepayment_method_details_payment_record_bizum;
    readonly blik?: Stripepayment_method_details_payment_record_blik;
    readonly boleto?: Stripepayment_method_details_payment_record_boleto;
    readonly card?: Stripepayments_primitives_payment_records_resource_payment_method_card_details;
    readonly card_present?: Stripepayment_method_details_card_present;
    readonly cashapp?: Stripepayment_method_details_payment_record_cashapp;
    readonly crypto?: Stripepayment_method_details_crypto;
    readonly custom?: Stripepayments_primitives_payment_records_resource_payment_method_custom_details;
    readonly customer_balance?: Stripepayment_method_details_customer_balance;
    readonly eps?: Stripepayment_method_details_payment_record_eps;
    readonly fpx?: Stripepayment_method_details_fpx;
    readonly giropay?: Stripepayment_method_details_payment_record_giropay;
    readonly grabpay?: Stripepayment_method_details_grabpay;
    readonly ideal?: Stripepayment_method_details_payment_record_ideal;
    readonly interac_present?: Stripepayment_method_details_interac_present;
    readonly kakao_pay?: Stripepayment_method_details_payment_record_kakao_pay;
    readonly klarna?: Stripepayment_method_details_payment_record_klarna;
    readonly konbini?: Stripepayment_method_details_payment_record_konbini;
    readonly kr_card?: Stripepayment_method_details_kr_card;
    readonly link?: Stripepayment_method_details_payment_record_link;
    readonly mb_way?: Stripepayment_method_details_payment_record_mb_way;
    readonly mobilepay?: Stripepayment_method_details_payment_record_mobilepay;
    readonly momo?: Stripepayment_method_details_payment_record_momo;
    readonly multibanco?: Stripepayment_method_details_payment_record_multibanco;
    readonly naver_pay?: Stripepayment_method_details_payment_record_naver_pay;
    readonly nz_bank_account?: Stripepayment_method_details_payment_record_nz_bank_account;
    readonly oxxo?: Stripepayment_method_details_payment_record_oxxo;
    readonly p24?: Stripepayment_method_details_payment_record_p24;
    readonly pay_by_bank?: Stripepayment_method_details_payment_record_pay_by_bank;
    readonly payco?: Stripepayment_method_details_payment_record_payco;
    readonly payment_method?: string | null;
    readonly paynow?: Stripepayment_method_details_payment_record_paynow;
    readonly paypal?: Stripepayment_method_details_paypal;
    readonly paypay?: Stripepayment_method_details_payment_record_paypay;
    readonly payto?: Stripepayment_method_details_payment_record_payto;
    readonly pix?: Stripepayment_method_details_payment_record_pix;
    readonly promptpay?: Stripepayment_method_details_payment_record_promptpay;
    readonly revolut_pay?: Stripepayment_method_details_payment_record_revolut_pay;
    readonly samsung_pay?: Stripepayment_method_details_payment_record_samsung_pay;
    readonly satispay?: Stripepayment_method_details_payment_record_satispay;
    readonly scalapay?: Stripepayment_method_details_payment_record_scalapay;
    readonly sepa_debit?: Stripepayment_method_details_payment_record_sepa_debit;
    readonly sequra?: Stripepayment_method_details_payment_record_sequra;
    readonly sofort?: Stripepayment_method_details_payment_record_sofort;
    readonly stripe_account?: Stripepayment_method_details_stripe_account;
    readonly sunbit?: Stripepayment_method_details_payment_record_sunbit;
    readonly swish?: Stripepayment_method_details_payment_record_swish;
    readonly twint?: Stripepayment_method_details_payment_record_twint;
    readonly type: string;
    readonly upi?: Stripepayment_method_details_payment_record_upi;
    readonly us_bank_account?: Stripepayment_method_details_payment_record_us_bank_account;
    readonly wechat?: Stripepayment_method_details_wechat;
    readonly wechat_pay?: Stripepayment_method_details_payment_record_wechat_pay;
    readonly zip?: Stripepayment_method_details_payment_record_zip;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_alipay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_flows_private_payment_methods_card_present_common_wallet =
  { readonly type: "apple_pay" | "google_pay" | "samsung_pay" | "unknown" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_flows_private_payment_methods_satispay_setup_attempt_details =
  { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details_resource_error = {
  readonly code?:
    | "amount_details_amount_mismatch"
    | "amount_details_tax_shipping_discount_greater_than_amount"
    | null;
  readonly message?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_card_payment_intent_amount_details_line_item_payment_method_options =
  { readonly commodity_code?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_flows_private_payment_methods_card_present_amount_details_line_item_payment_method_options =
  { readonly commodity_code?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_flows_private_payment_methods_klarna_payment_intent_amount_details_line_item_payment_method_options =
  {
    readonly image_url?: string | null;
    readonly product_url?: string | null;
    readonly reference?: string | null;
    readonly subscription_reference?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_paypal_amount_details_line_item_payment_method_options =
  {
    readonly category?: "digital_goods" | "donation" | "physical_goods";
    readonly description?: string;
    readonly sold_by?: string;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_tax =
  { readonly total_tax_amount: number } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details_resource_shipping = {
  readonly amount?: number | null;
  readonly from_postal_code?: string | null;
  readonly to_postal_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details_resource_tax = {
  readonly total_tax_amount?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details_client_resource_tip = {
  readonly amount?: number;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_automatic_payment_methods_payment_intent = {
  readonly allow_redirects?: "always" | "never";
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_payment_intent_async_workflows_resource_inputs_resource_tax =
  { readonly calculation: string } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_payment_intent_presentment_details = {
  readonly presentment_amount: number;
  readonly presentment_currency: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_alma_details_resource_installments =
  { readonly count: number } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization =
  { readonly status: "disabled" | "enabled" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization =
  { readonly status: "available" | "unavailable" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_flows_private_payment_methods_card_details_api_resource_multicapture =
  { readonly status: "available" | "unavailable" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture =
  {
    readonly maximum_amount_capturable: number;
    readonly status: "available" | "unavailable";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_konbini_details_resource_store =
  {
    readonly chain?: "familymart" | "lawson" | "ministop" | "seicomart" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_payment_details = {
  readonly customer_reference?: string | null;
  readonly order_reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details_resource_company_details_registered_address =
  {
    readonly city?: string | null;
    readonly country?: string | null;
    readonly line1?: string | null;
    readonly line2?: string | null;
    readonly postal_code?: string | null;
    readonly state?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_kakao_pay_payment_method_options =
  {
    readonly capture_method?: "manual";
    readonly setup_future_usage?: "none" | "off_session";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_naver_pay_payment_method_options =
  {
    readonly capture_method?: "manual";
    readonly setup_future_usage?: "none" | "off_session";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_payco_payment_method_options =
  {
    readonly capture_method?: "manual";
    readonly setup_future_usage?: "none";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_samsung_pay_payment_method_options =
  {
    readonly capture_method?: "manual";
    readonly setup_future_usage?: "none";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_financial_connections_common_linked_account_options_filters =
  { readonly account_subcategories?: ReadonlyArray<"checking" | "savings"> } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayments_primitives_payment_records_resource_amount = {
  readonly currency: string;
  readonly value: number;
} & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_customer_details =
  {
    readonly customer?: string | null;
    readonly email?: string | null;
    readonly name?: string | null;
    readonly phone?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_alma_details_resource_installments =
  { readonly count: number } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding_resource_funding_card =
  {
    readonly brand?: string | null;
    readonly country?: string | null;
    readonly exp_month?: number | null;
    readonly exp_year?: number | null;
    readonly funding?: string | null;
    readonly last4?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_address = {
  readonly city?: string | null;
  readonly country?: string | null;
  readonly line1?: string | null;
  readonly line2?: string | null;
  readonly postal_code?: string | null;
  readonly state?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_checks =
  {
    readonly address_line1_check?:
      | "fail"
      | "pass"
      | "unavailable"
      | "unchecked"
      | null;
    readonly address_postal_code_check?:
      | "fail"
      | "pass"
      | "unavailable"
      | "unchecked"
      | null;
    readonly cvc_check?: "fail" | "pass" | "unavailable" | "unchecked" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installment_plan =
  {
    readonly count?: number | null;
    readonly interval?: "month" | null;
    readonly type: "bonus" | "fixed_count" | "revolving";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_network_token =
  { readonly used: boolean } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_three_d_secure =
  {
    readonly authentication_flow?: "challenge" | "frictionless" | null;
    readonly electronic_commerce_indicator?:
      | "01"
      | "02"
      | "03"
      | "04"
      | "05"
      | "06"
      | "07"
      | null;
    readonly exemption_indicator?: "low_risk" | "none" | null;
    readonly exemption_indicator_applied?: boolean | null;
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
    readonly version?: "1.0.2" | "2.1.0" | "2.2.0" | "2.3.0" | "2.3.1" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_apple_pay =
  { readonly type: string } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_google_pay =
  { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_link =
  { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_custom_details =
  { readonly display_name: string; readonly type?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details_resource_payer_details_address =
  { readonly country?: string | null } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_konbini_details_resource_store =
  {
    readonly chain?: "familymart" | "lawson" | "ministop" | "seicomart" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_mobilepay_details_resource_card =
  {
    readonly brand?: string | null;
    readonly country?: string | null;
    readonly exp_month?: number | null;
    readonly exp_year?: number | null;
    readonly last4?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding_resource_funding_card =
  {
    readonly brand?: string | null;
    readonly country?: string | null;
    readonly exp_month?: number | null;
    readonly exp_year?: number | null;
    readonly funding?: string | null;
    readonly last4?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_processor_details_resource_custom_details =
  { readonly payment_reference?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_data = {
  readonly description?: string;
  readonly metadata?: { readonly [x: string]: string };
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_automatic_payment_methods_setup_intent = {
  readonly allow_redirects?: "always" | "never";
  readonly enabled?: boolean | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_klarna_dob = {
  readonly day?: number | null;
  readonly month?: number | null;
  readonly year?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_adaptive_pricing = {
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_after_expiration_recovery = {
  readonly allow_promotion_codes: boolean;
  readonly enabled: boolean;
  readonly expires_at?: number | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_branding_settings_icon = {
  readonly file?: string;
  readonly type: "file" | "url";
  readonly url?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_branding_settings_logo = {
  readonly file?: string;
  readonly type: "file" | "url";
  readonly url?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_consent = {
  readonly promotions?: "opt_in" | "opt_out" | null;
  readonly terms_of_service?: "accepted" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_payment_method_reuse_agreement =
  { readonly position: "auto" | "hidden" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_pages_checkout_session_currency_conversion = {
  readonly amount_subtotal: number;
  readonly amount_total: number;
  readonly fx_rate: string;
  readonly source_currency: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_fields_option = {
  readonly label: string;
  readonly value: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_fields_label = {
  readonly custom?: string | null;
  readonly type: "custom";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_fields_numeric = {
  readonly default_value?: string | null;
  readonly maximum_length?: number | null;
  readonly minimum_length?: number | null;
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_fields_text = {
  readonly default_value?: string | null;
  readonly maximum_length?: number | null;
  readonly minimum_length?: number | null;
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_text_position = {
  readonly message: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_tax_id = {
  readonly type:
    | "ad_nrt"
    | "ae_trn"
    | "al_tin"
    | "am_tin"
    | "ao_tin"
    | "ar_cuit"
    | "au_abn"
    | "au_acn"
    | "au_arn"
    | "au_wpn"
    | "aw_tin"
    | "az_tin"
    | "ba_tin"
    | "bb_tin"
    | "bd_bin"
    | "bf_ifu"
    | "bg_uic"
    | "bh_vat"
    | "bj_ifu"
    | "bo_tin"
    | "br_cnpj"
    | "br_cpf"
    | "bs_tin"
    | "bw_vat"
    | "by_tin"
    | "ca_bn"
    | "ca_gst_hst"
    | "ca_pst_bc"
    | "ca_pst_mb"
    | "ca_pst_sk"
    | "ca_qst"
    | "cd_nif"
    | "ch_uid"
    | "ch_vat"
    | "ci_vat"
    | "cl_tin"
    | "cm_niu"
    | "cn_tin"
    | "co_nit"
    | "cr_tin"
    | "cv_nif"
    | "cz_dic"
    | "de_stn"
    | "do_rcn"
    | "ec_ruc"
    | "eg_tin"
    | "es_cif"
    | "et_tin"
    | "eu_oss_vat"
    | "eu_vat"
    | "fo_vat"
    | "fr_siren"
    | "fr_siret"
    | "fr_spi"
    | "gb_vat"
    | "ge_vat"
    | "gh_tin"
    | "gi_tin"
    | "gn_nif"
    | "hk_br"
    | "hr_oib"
    | "hu_tin"
    | "ic_nif"
    | "id_npwp"
    | "il_vat"
    | "in_gst"
    | "is_kt"
    | "is_vat"
    | "it_cf"
    | "jp_cn"
    | "jp_rn"
    | "jp_trn"
    | "ke_pin"
    | "kg_tin"
    | "kh_tin"
    | "kr_brn"
    | "kz_bin"
    | "la_tin"
    | "li_uid"
    | "li_vat"
    | "lk_vat"
    | "ma_vat"
    | "md_cf"
    | "md_vat"
    | "me_pib"
    | "mk_vat"
    | "mr_nif"
    | "mu_vat"
    | "mx_rfc"
    | "my_frp"
    | "my_itn"
    | "my_sst"
    | "mz_nuit"
    | "ng_tin"
    | "no_vat"
    | "no_voec"
    | "np_pan"
    | "nz_bn"
    | "nz_gst"
    | "om_vat"
    | "pe_ruc"
    | "ph_tin"
    | "pl_nip"
    | "pt_nif"
    | "py_ruc"
    | "ro_tin"
    | "rs_pib"
    | "ru_inn"
    | "ru_kpp"
    | "sa_vat"
    | "sg_gst"
    | "sg_uen"
    | "si_tin"
    | "sm_coe"
    | "sn_ninea"
    | "sr_fin"
    | "sv_nit"
    | "th_vat"
    | "tj_tin"
    | "tr_tin"
    | "tt_bir"
    | "tt_vat"
    | "tw_vat"
    | "tz_vat"
    | "ua_vat"
    | "ug_tin"
    | "unknown"
    | "us_ein"
    | "uy_ruc"
    | "uz_tin"
    | "uz_vat"
    | "ve_rif"
    | "vn_tin"
    | "za_vat"
    | "zm_tin"
    | "zw_tin";
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_managed_payments = {
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_business_name = {
  readonly enabled: boolean;
  readonly optional: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_individual_name = {
  readonly enabled: boolean;
  readonly optional: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_optional_item_adjustable_quantity =
  {
    readonly enabled: boolean;
    readonly maximum?: number | null;
    readonly minimum?: number | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_completion_behavior_confirmation_page =
  { readonly custom_message?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_links_resource_completion_behavior_redirect = {
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_payment_method_reuse_agreement = {
  readonly position: "auto" | "hidden";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_fields_dropdown_option = {
  readonly label: string;
  readonly value: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_fields_label = {
  readonly custom?: string | null;
  readonly type: "custom";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_fields_numeric = {
  readonly default_value?: string | null;
  readonly maximum_length?: number | null;
  readonly minimum_length?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_fields_text = {
  readonly default_value?: string | null;
  readonly maximum_length?: number | null;
  readonly minimum_length?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_text_position = {
  readonly message: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_business_name = {
  readonly enabled: boolean;
  readonly optional: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_individual_name = {
  readonly enabled: boolean;
  readonly optional: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_optional_item_adjustable_quantity = {
  readonly enabled: boolean;
  readonly maximum?: number | null;
  readonly minimum?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_payment_intent_data = {
  readonly capture_method?: "automatic" | "automatic_async" | "manual" | null;
  readonly description?: string | null;
  readonly metadata: { readonly [x: string]: string };
  readonly setup_future_usage?: "off_session" | "on_session" | null;
  readonly statement_descriptor?: string | null;
  readonly statement_descriptor_suffix?: string | null;
  readonly transfer_group?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_card_restrictions = {
  readonly brands_blocked: ReadonlyArray<
    "american_express" | "discover_global_network" | "mastercard" | "visa"
  >;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_phone_number_collection = {
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_completed_sessions = {
  readonly count: number;
  readonly limit: number;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_shipping_address_collection = {
  readonly allowed_countries: ReadonlyArray<
    | "AC"
    | "AD"
    | "AE"
    | "AF"
    | "AG"
    | "AI"
    | "AL"
    | "AM"
    | "AO"
    | "AQ"
    | "AR"
    | "AT"
    | "AU"
    | "AW"
    | "AX"
    | "AZ"
    | "BA"
    | "BB"
    | "BD"
    | "BE"
    | "BF"
    | "BG"
    | "BH"
    | "BI"
    | "BJ"
    | "BL"
    | "BM"
    | "BN"
    | "BO"
    | "BQ"
    | "BR"
    | "BS"
    | "BT"
    | "BV"
    | "BW"
    | "BY"
    | "BZ"
    | "CA"
    | "CD"
    | "CF"
    | "CG"
    | "CH"
    | "CI"
    | "CK"
    | "CL"
    | "CM"
    | "CN"
    | "CO"
    | "CR"
    | "CV"
    | "CW"
    | "CY"
    | "CZ"
    | "DE"
    | "DJ"
    | "DK"
    | "DM"
    | "DO"
    | "DZ"
    | "EC"
    | "EE"
    | "EG"
    | "EH"
    | "ER"
    | "ES"
    | "ET"
    | "FI"
    | "FJ"
    | "FK"
    | "FO"
    | "FR"
    | "GA"
    | "GB"
    | "GD"
    | "GE"
    | "GF"
    | "GG"
    | "GH"
    | "GI"
    | "GL"
    | "GM"
    | "GN"
    | "GP"
    | "GQ"
    | "GR"
    | "GS"
    | "GT"
    | "GU"
    | "GW"
    | "GY"
    | "HK"
    | "HN"
    | "HR"
    | "HT"
    | "HU"
    | "ID"
    | "IE"
    | "IL"
    | "IM"
    | "IN"
    | "IO"
    | "IQ"
    | "IS"
    | "IT"
    | "JE"
    | "JM"
    | "JO"
    | "JP"
    | "KE"
    | "KG"
    | "KH"
    | "KI"
    | "KM"
    | "KN"
    | "KR"
    | "KW"
    | "KY"
    | "KZ"
    | "LA"
    | "LB"
    | "LC"
    | "LI"
    | "LK"
    | "LR"
    | "LS"
    | "LT"
    | "LU"
    | "LV"
    | "LY"
    | "MA"
    | "MC"
    | "MD"
    | "ME"
    | "MF"
    | "MG"
    | "MK"
    | "ML"
    | "MM"
    | "MN"
    | "MO"
    | "MQ"
    | "MR"
    | "MS"
    | "MT"
    | "MU"
    | "MV"
    | "MW"
    | "MX"
    | "MY"
    | "MZ"
    | "NA"
    | "NC"
    | "NE"
    | "NG"
    | "NI"
    | "NL"
    | "NO"
    | "NP"
    | "NR"
    | "NU"
    | "NZ"
    | "OM"
    | "PA"
    | "PE"
    | "PF"
    | "PG"
    | "PH"
    | "PK"
    | "PL"
    | "PM"
    | "PN"
    | "PR"
    | "PS"
    | "PT"
    | "PY"
    | "QA"
    | "RE"
    | "RO"
    | "RS"
    | "RU"
    | "RW"
    | "SA"
    | "SB"
    | "SC"
    | "SD"
    | "SE"
    | "SG"
    | "SH"
    | "SI"
    | "SJ"
    | "SK"
    | "SL"
    | "SM"
    | "SN"
    | "SO"
    | "SR"
    | "SS"
    | "ST"
    | "SV"
    | "SX"
    | "SZ"
    | "TA"
    | "TC"
    | "TD"
    | "TF"
    | "TG"
    | "TH"
    | "TJ"
    | "TK"
    | "TL"
    | "TM"
    | "TN"
    | "TO"
    | "TR"
    | "TT"
    | "TV"
    | "TW"
    | "TZ"
    | "UA"
    | "UG"
    | "US"
    | "UY"
    | "UZ"
    | "VA"
    | "VC"
    | "VE"
    | "VG"
    | "VN"
    | "VU"
    | "WF"
    | "WS"
    | "XK"
    | "YE"
    | "YT"
    | "ZA"
    | "ZM"
    | "ZW"
    | "ZZ"
  >;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_tax_id_collection = {
  readonly enabled: boolean;
  readonly required: "if_supported" | "never";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_transfer_data = {
  readonly amount?: number | null;
  readonly destination: string | Stripeaccount;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_private_card_payment_method_options_resource_restrictions =
  {
    readonly brands_blocked?: ReadonlyArray<
      "american_express" | "discover_global_network" | "mastercard" | "visa"
    >;
    readonly funding_types_blocked?: ReadonlyArray<
      "credit" | "debit" | "prepaid"
    >;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_permissions = {
  readonly update_shipping_details?: "client_only" | "server_only" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_phone_number_collection = {
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_saved_payment_method_options =
  {
    readonly allow_redisplay_filters?: ReadonlyArray<
      "always" | "limited" | "unspecified"
    > | null;
    readonly payment_method_remove?: "disabled" | "enabled" | null;
    readonly payment_method_save?: "disabled" | "enabled" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_shipping_address_collection = {
  readonly allowed_countries: ReadonlyArray<
    | "AC"
    | "AD"
    | "AE"
    | "AF"
    | "AG"
    | "AI"
    | "AL"
    | "AM"
    | "AO"
    | "AQ"
    | "AR"
    | "AT"
    | "AU"
    | "AW"
    | "AX"
    | "AZ"
    | "BA"
    | "BB"
    | "BD"
    | "BE"
    | "BF"
    | "BG"
    | "BH"
    | "BI"
    | "BJ"
    | "BL"
    | "BM"
    | "BN"
    | "BO"
    | "BQ"
    | "BR"
    | "BS"
    | "BT"
    | "BV"
    | "BW"
    | "BY"
    | "BZ"
    | "CA"
    | "CD"
    | "CF"
    | "CG"
    | "CH"
    | "CI"
    | "CK"
    | "CL"
    | "CM"
    | "CN"
    | "CO"
    | "CR"
    | "CV"
    | "CW"
    | "CY"
    | "CZ"
    | "DE"
    | "DJ"
    | "DK"
    | "DM"
    | "DO"
    | "DZ"
    | "EC"
    | "EE"
    | "EG"
    | "EH"
    | "ER"
    | "ES"
    | "ET"
    | "FI"
    | "FJ"
    | "FK"
    | "FO"
    | "FR"
    | "GA"
    | "GB"
    | "GD"
    | "GE"
    | "GF"
    | "GG"
    | "GH"
    | "GI"
    | "GL"
    | "GM"
    | "GN"
    | "GP"
    | "GQ"
    | "GR"
    | "GS"
    | "GT"
    | "GU"
    | "GW"
    | "GY"
    | "HK"
    | "HN"
    | "HR"
    | "HT"
    | "HU"
    | "ID"
    | "IE"
    | "IL"
    | "IM"
    | "IN"
    | "IO"
    | "IQ"
    | "IS"
    | "IT"
    | "JE"
    | "JM"
    | "JO"
    | "JP"
    | "KE"
    | "KG"
    | "KH"
    | "KI"
    | "KM"
    | "KN"
    | "KR"
    | "KW"
    | "KY"
    | "KZ"
    | "LA"
    | "LB"
    | "LC"
    | "LI"
    | "LK"
    | "LR"
    | "LS"
    | "LT"
    | "LU"
    | "LV"
    | "LY"
    | "MA"
    | "MC"
    | "MD"
    | "ME"
    | "MF"
    | "MG"
    | "MK"
    | "ML"
    | "MM"
    | "MN"
    | "MO"
    | "MQ"
    | "MR"
    | "MS"
    | "MT"
    | "MU"
    | "MV"
    | "MW"
    | "MX"
    | "MY"
    | "MZ"
    | "NA"
    | "NC"
    | "NE"
    | "NG"
    | "NI"
    | "NL"
    | "NO"
    | "NP"
    | "NR"
    | "NU"
    | "NZ"
    | "OM"
    | "PA"
    | "PE"
    | "PF"
    | "PG"
    | "PH"
    | "PK"
    | "PL"
    | "PM"
    | "PN"
    | "PR"
    | "PS"
    | "PT"
    | "PY"
    | "QA"
    | "RE"
    | "RO"
    | "RS"
    | "RU"
    | "RW"
    | "SA"
    | "SB"
    | "SC"
    | "SD"
    | "SE"
    | "SG"
    | "SH"
    | "SI"
    | "SJ"
    | "SK"
    | "SL"
    | "SM"
    | "SN"
    | "SO"
    | "SR"
    | "SS"
    | "ST"
    | "SV"
    | "SX"
    | "SZ"
    | "TA"
    | "TC"
    | "TD"
    | "TF"
    | "TG"
    | "TH"
    | "TJ"
    | "TK"
    | "TL"
    | "TM"
    | "TN"
    | "TO"
    | "TR"
    | "TT"
    | "TV"
    | "TW"
    | "TZ"
    | "UA"
    | "UG"
    | "US"
    | "UY"
    | "UZ"
    | "VA"
    | "VC"
    | "VE"
    | "VG"
    | "VN"
    | "VU"
    | "WF"
    | "WS"
    | "XK"
    | "YE"
    | "YT"
    | "ZA"
    | "ZM"
    | "ZW"
    | "ZZ"
  >;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_tax_id_collection = {
  readonly enabled: boolean;
  readonly required: "if_supported" | "never";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_checkout_address_details = {
  readonly address: Stripeaddress;
  readonly name: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_payment_method_options =
  {
    readonly card?: Stripepayment_flows_private_payment_methods_card_payment_intent_amount_details_line_item_payment_method_options;
    readonly card_present?: Stripepayment_flows_private_payment_methods_card_present_amount_details_line_item_payment_method_options;
    readonly klarna?: Stripepayment_flows_private_payment_methods_klarna_payment_intent_amount_details_line_item_payment_method_options;
    readonly paypal?: Stripepayment_flows_private_payment_methods_paypal_amount_details_line_item_payment_method_options;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details_client = {
  readonly tip?: Stripepayment_flows_amount_details_client_resource_tip;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_payment_intent_async_workflows_resource_inputs =
  {
    readonly tax?: Stripepayment_flows_payment_intent_async_workflows_resource_inputs_resource_tax;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_installment_options = {
  readonly enabled: boolean;
  readonly plan?: Stripepayment_method_details_card_installments_plan;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details =
  {
    readonly registered_address?: Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details_resource_company_details_registered_address;
    readonly registered_name?: string | null;
    readonly registration_number?: string | null;
    readonly registration_type?:
      | "ch_ein"
      | "de_hrb"
      | "dk_cvr"
      | "es_cif"
      | "fi_tunnus"
      | "fr_siren"
      | "fr_siret"
      | "it_rea"
      | "nl_kvk"
      | "no_org_number"
      | "no_pno"
      | "se_org_number"
      | "se_pno"
      | "uk_crn";
    readonly vat?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding =
  {
    readonly card?: Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding_resource_funding_card;
    readonly type?: "card" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_billing_details =
  {
    readonly address: Stripepayments_primitives_payment_records_resource_address;
    readonly email?: string | null;
    readonly name?: string | null;
    readonly phone?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_shipping_details =
  {
    readonly address: Stripepayments_primitives_payment_records_resource_address;
    readonly name?: string | null;
    readonly phone?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installments =
  {
    readonly plan?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installment_plan | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet =
  {
    readonly apple_pay?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_apple_pay;
    readonly dynamic_last4?: string;
    readonly google_pay?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_google_pay;
    readonly link?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_link;
    readonly type: string;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details =
  {
    readonly address?: Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details_resource_payer_details_address | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding =
  {
    readonly card?: Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding_resource_funding_card;
    readonly type?: "card" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_processor_details =
  {
    readonly custom?: Stripepayments_primitives_payment_records_resource_processor_details_resource_custom_details;
    readonly type: "custom";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_automatic_tax = {
  readonly enabled: boolean;
  readonly liability?: Stripeconnect_account_reference | null;
  readonly provider?: string | null;
  readonly status?: "complete" | "failed" | "requires_location_inputs" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_automatic_tax = {
  readonly enabled: boolean;
  readonly liability?: Stripeconnect_account_reference | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_subscription_data_invoice_settings = {
  readonly account_tax_ids?: ReadonlyArray<
    string | Stripetax_id | Stripedeleted_tax_id
  > | null;
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly description?: string | null;
  readonly footer?: string | null;
  readonly issuer: Stripeconnect_account_reference;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_after_expiration = {
  readonly recovery?: Stripepayment_pages_checkout_session_after_expiration_recovery | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_branding_settings = {
  readonly background_color: string;
  readonly border_style: "pill" | "rectangular" | "rounded";
  readonly button_color: string;
  readonly display_name: string;
  readonly font_family: string;
  readonly icon?: Stripepayment_pages_checkout_session_branding_settings_icon | null;
  readonly logo?: Stripepayment_pages_checkout_session_branding_settings_logo | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_consent_collection = {
  readonly payment_method_reuse_agreement?: Stripepayment_pages_checkout_session_payment_method_reuse_agreement | null;
  readonly promotions?: "auto" | "none" | null;
  readonly terms_of_service?: "none" | "required" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_fields_dropdown = {
  readonly default_value?: string | null;
  readonly options: ReadonlyArray<Stripepayment_pages_checkout_session_custom_fields_option>;
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_text = {
  readonly after_submit?: Stripepayment_pages_checkout_session_custom_text_position | null;
  readonly shipping_address?: Stripepayment_pages_checkout_session_custom_text_position | null;
  readonly submit?: Stripepayment_pages_checkout_session_custom_text_position | null;
  readonly terms_of_service_acceptance?: Stripepayment_pages_checkout_session_custom_text_position | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_customer_details = {
  readonly address?: Stripeaddress | null;
  readonly business_name?: string | null;
  readonly email?: string | null;
  readonly individual_name?: string | null;
  readonly name?: string | null;
  readonly phone?: string | null;
  readonly tax_exempt?: "exempt" | "none" | "reverse" | null;
  readonly tax_ids?: ReadonlyArray<Stripepayment_pages_checkout_session_tax_id> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_invoice_settings = {
  readonly account_tax_ids?: ReadonlyArray<
    string | Stripetax_id | Stripedeleted_tax_id
  > | null;
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly description?: string | null;
  readonly footer?: string | null;
  readonly issuer?: Stripeconnect_account_reference | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly rendering_options?: Stripeinvoice_setting_checkout_rendering_options | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_invoice_settings = {
  readonly account_tax_ids?: ReadonlyArray<
    string | Stripetax_id | Stripedeleted_tax_id
  > | null;
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly description?: string | null;
  readonly footer?: string | null;
  readonly issuer?: Stripeconnect_account_reference | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly rendering_options?: Stripeinvoice_setting_checkout_rendering_options | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_name_collection = {
  readonly business?: Stripepayment_pages_checkout_session_business_name;
  readonly individual?: Stripepayment_pages_checkout_session_individual_name;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_optional_item = {
  readonly adjustable_quantity?: Stripepayment_pages_checkout_session_optional_item_adjustable_quantity | null;
  readonly price: string;
  readonly quantity: number;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_after_completion = {
  readonly hosted_confirmation?: Stripepayment_links_resource_completion_behavior_confirmation_page;
  readonly redirect?: Stripepayment_links_resource_completion_behavior_redirect;
  readonly type: "hosted_confirmation" | "redirect";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_consent_collection = {
  readonly payment_method_reuse_agreement?: Stripepayment_links_resource_payment_method_reuse_agreement | null;
  readonly promotions?: "auto" | "none" | null;
  readonly terms_of_service?: "none" | "required" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_fields_dropdown = {
  readonly default_value?: string | null;
  readonly options: ReadonlyArray<Stripepayment_links_resource_custom_fields_dropdown_option>;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_text = {
  readonly after_submit?: Stripepayment_links_resource_custom_text_position | null;
  readonly shipping_address?: Stripepayment_links_resource_custom_text_position | null;
  readonly submit?: Stripepayment_links_resource_custom_text_position | null;
  readonly terms_of_service_acceptance?: Stripepayment_links_resource_custom_text_position | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_name_collection = {
  readonly business?: Stripepayment_links_resource_business_name;
  readonly individual?: Stripepayment_links_resource_individual_name;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_optional_item = {
  readonly adjustable_quantity?: Stripepayment_links_resource_optional_item_adjustable_quantity | null;
  readonly price: string;
  readonly quantity: number;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_card_payment_method_options = {
  readonly restrictions?: Stripepayment_links_resource_card_restrictions | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_restrictions = {
  readonly completed_sessions: Stripepayment_links_resource_completed_sessions;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_collected_information = {
  readonly business_name?: string | null;
  readonly individual_name?: string | null;
  readonly shipping_details?: Stripepayment_pages_checkout_session_checkout_address_details | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_discount = {
  readonly coupon?: string | Stripecoupon | null;
  readonly promotion_code?: string | Stripepromotion_code | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_payment_intent_async_workflows = {
  readonly inputs?: Stripepayment_flows_payment_intent_async_workflows_resource_inputs;
} & { readonly [x: string]: Schema.Json };
export type Stripepayments_primitives_payment_records_resource_payment_method_card_details =
  {
    readonly authorization_code?: string | null;
    readonly brand?:
      | "amex"
      | "cartes_bancaires"
      | "diners"
      | "discover"
      | "eftpos_au"
      | "interac"
      | "jcb"
      | "link"
      | "mastercard"
      | "unionpay"
      | "unknown"
      | "visa"
      | null;
    readonly capture_before?: number;
    readonly checks?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_checks | null;
    readonly country?: string | null;
    readonly exp_month?: number | null;
    readonly exp_year?: number | null;
    readonly fingerprint?: string | null;
    readonly funding?: "credit" | "debit" | "prepaid" | "unknown" | null;
    readonly installments?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installments | null;
    readonly last4?: string | null;
    readonly network?:
      | "amex"
      | "cartes_bancaires"
      | "diners"
      | "discover"
      | "eftpos_au"
      | "interac"
      | "jcb"
      | "link"
      | "mastercard"
      | "unionpay"
      | "unknown"
      | "visa"
      | null;
    readonly network_advice_code?: string | null;
    readonly network_decline_code?: string | null;
    readonly network_token?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_network_token | null;
    readonly network_transaction_id?: string | null;
    readonly stored_credential_usage?:
      | "installment"
      | "recurring"
      | "unscheduled"
      | null;
    readonly three_d_secure?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_three_d_secure | null;
    readonly wallet?: Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_custom_fields = {
  readonly dropdown?: Stripepayment_pages_checkout_session_custom_fields_dropdown;
  readonly key: string;
  readonly label: Stripepayment_pages_checkout_session_custom_fields_label;
  readonly numeric?: Stripepayment_pages_checkout_session_custom_fields_numeric;
  readonly optional: boolean;
  readonly text?: Stripepayment_pages_checkout_session_custom_fields_text;
  readonly type: "dropdown" | "numeric" | "text";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_invoice_creation = {
  readonly enabled: boolean;
  readonly invoice_data: Stripepayment_pages_checkout_session_invoice_settings;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_invoice_creation = {
  readonly enabled: boolean;
  readonly invoice_data?: Stripepayment_links_resource_invoice_settings | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_custom_fields = {
  readonly dropdown?: Stripepayment_links_resource_custom_fields_dropdown;
  readonly key: string;
  readonly label: Stripepayment_links_resource_custom_fields_label;
  readonly numeric?: Stripepayment_links_resource_custom_fields_numeric;
  readonly optional: boolean;
  readonly text?: Stripepayment_links_resource_custom_fields_text;
  readonly type: "dropdown" | "numeric" | "text";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_payment_method_options = {
  readonly card?: Stripepayment_links_resource_card_payment_method_options | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_subscription_data = {
  readonly description?: string | null;
  readonly invoice_settings: Stripepayment_links_resource_subscription_data_invoice_settings;
  readonly metadata: { readonly [x: string]: string };
  readonly trial_period_days?: number | null;
  readonly trial_settings?: Stripesubscriptions_trials_resource_trial_settings | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_flows_amount_details = {
  readonly discount_amount?: number;
  readonly error?: Stripepayment_flows_amount_details_resource_error;
  readonly line_items?: {
    readonly data: ReadonlyArray<Stripepayment_intent_amount_details_line_item>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly shipping?: Stripepayment_flows_amount_details_resource_shipping;
  readonly tax?: Stripepayment_flows_amount_details_resource_tax;
  readonly tip?: Stripepayment_flows_amount_details_client_resource_tip;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_total_details_resource_breakdown =
  {
    readonly discounts: ReadonlyArray<Stripeline_items_discount_amount>;
    readonly taxes: ReadonlyArray<Stripeline_items_tax_amount>;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_links_resource_shipping_option = {
  readonly shipping_amount: number;
  readonly shipping_rate: string | Stripeshipping_rate;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_shipping_cost = {
  readonly amount_subtotal: number;
  readonly amount_tax: number;
  readonly amount_total: number;
  readonly shipping_rate?: string | Stripeshipping_rate | null;
  readonly taxes?: ReadonlyArray<Stripeline_items_tax_amount>;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_pages_checkout_session_shipping_option = {
  readonly shipping_amount: number;
  readonly shipping_rate: string | Stripeshipping_rate;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_source =
  | Stripeaccount
  | Stripebank_account
  | Stripecard
  | Stripesource;
export type Stripepayment_pages_checkout_session_total_details = {
  readonly amount_discount: number;
  readonly amount_shipping?: number | null;
  readonly amount_tax: number;
  readonly breakdown?: Stripepayment_pages_checkout_session_total_details_resource_breakdown;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_link = {
  readonly active: boolean;
  readonly after_completion: Stripepayment_links_resource_after_completion;
  readonly allow_promotion_codes: boolean;
  readonly application?:
    | string
    | Stripeapplication
    | Stripedeleted_application
    | null;
  readonly application_fee_amount?: number | null;
  readonly application_fee_percent?: number | null;
  readonly automatic_tax: Stripepayment_links_resource_automatic_tax;
  readonly billing_address_collection: "auto" | "required";
  readonly consent_collection?: Stripepayment_links_resource_consent_collection | null;
  readonly currency: string;
  readonly custom_fields: ReadonlyArray<Stripepayment_links_resource_custom_fields>;
  readonly custom_text: Stripepayment_links_resource_custom_text;
  readonly customer_creation: "always" | "if_required";
  readonly id: string;
  readonly inactive_message?: string | null;
  readonly invoice_creation?: Stripepayment_links_resource_invoice_creation | null;
  readonly line_items?: {
    readonly data: ReadonlyArray<Stripeitem>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly managed_payments?: Stripepayment_pages_checkout_session_managed_payments | null;
  readonly metadata: { readonly [x: string]: string };
  readonly name_collection?: Stripepayment_links_resource_name_collection;
  readonly object: "payment_link";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly optional_items?: ReadonlyArray<Stripepayment_links_resource_optional_item> | null;
  readonly payment_intent_data?: Stripepayment_links_resource_payment_intent_data | null;
  readonly payment_method_collection: "always" | "if_required";
  readonly payment_method_options?: Stripepayment_links_resource_payment_method_options | null;
  readonly payment_method_types?: ReadonlyArray<
    | "affirm"
    | "afterpay_clearpay"
    | "alipay"
    | "alma"
    | "au_becs_debit"
    | "bacs_debit"
    | "bancontact"
    | "billie"
    | "bizum"
    | "blik"
    | "boleto"
    | "card"
    | "cashapp"
    | "eps"
    | "fpx"
    | "giropay"
    | "grabpay"
    | "ideal"
    | "klarna"
    | "konbini"
    | "link"
    | "mb_way"
    | "mobilepay"
    | "multibanco"
    | "oxxo"
    | "p24"
    | "pay_by_bank"
    | "paynow"
    | "paypal"
    | "paypay"
    | "payto"
    | "pix"
    | "promptpay"
    | "satispay"
    | "scalapay"
    | "sepa_debit"
    | "sequra"
    | "sofort"
    | "sunbit"
    | "swish"
    | "twint"
    | "upi"
    | "us_bank_account"
    | "wechat_pay"
    | "zip"
  > | null;
  readonly phone_number_collection: Stripepayment_links_resource_phone_number_collection;
  readonly restrictions?: Stripepayment_links_resource_restrictions | null;
  readonly shipping_address_collection?: Stripepayment_links_resource_shipping_address_collection | null;
  readonly shipping_options: ReadonlyArray<Stripepayment_links_resource_shipping_option>;
  readonly submit_type: "auto" | "book" | "donate" | "pay" | "subscribe";
  readonly subscription_data?: Stripepayment_links_resource_subscription_data | null;
  readonly tax_id_collection: Stripepayment_links_resource_tax_id_collection;
  readonly transfer_data?: Stripepayment_links_resource_transfer_data | null;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };

export const Stripepayment_record = Schema.suspend(
  (): Schema.Codec<Stripepayment_record> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Stripepayments_primitives_payment_records_resource_amount,
        amount_authorized:
          Stripepayments_primitives_payment_records_resource_amount,
        amount_canceled:
          Stripepayments_primitives_payment_records_resource_amount,
        amount_failed:
          Stripepayments_primitives_payment_records_resource_amount,
        amount_guaranteed:
          Stripepayments_primitives_payment_records_resource_amount,
        amount_refunded:
          Stripepayments_primitives_payment_records_resource_amount,
        amount_requested:
          Stripepayments_primitives_payment_records_resource_amount,
        application: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the Connect application that created the PaymentRecord.",
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
        customer_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayments_primitives_payment_records_resource_customer_details,
            ]).annotate({
              description: "Customer information for this payment.",
            }),
            Schema.Null,
          ]),
        ),
        customer_presence: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["off_session", "on_session"]).annotate({
              description:
                "Indicates whether the customer was present in your checkout flow during this payment.",
            }),
            Schema.Null,
          ]),
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
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        latest_payment_attempt_record: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the latest Payment Attempt Record attached to this Payment Record.",
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
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        object: Schema.Literal("payment_record").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payment_method_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_details> =>
                  Stripepayments_primitives_payment_records_resource_payment_method_details,
              ),
            ]).annotate({
              description:
                "Information about the Payment Method debited for this payment.",
            }),
            Schema.Null,
          ]),
        ),
        processor_details:
          Stripepayments_primitives_payment_records_resource_processor_details,
        reported_by: Schema.Literals(["self", "stripe"]).annotate({
          description: "Indicates who reported the payment.",
        }),
        shipping_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayments_primitives_payment_records_resource_shipping_details,
            ]).annotate({
              description: "Shipping information for this payment.",
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
      title: "Payment Record",
      description:
        "A Payment Record is a resource that allows you to represent payments that occur on- or off-Stripe.\nFor example, you can create a Payment Record to model a payment made on a different payment processor,\nin order to mark an Invoice as paid and a Subscription as active. Payment Records consist of one or\nmore Payment Attempt Records, which represent individual attempts made on a payment network.",
      identifier: "Stripepayment_record",
    }),
);
export const Stripepayments_primitives_payment_records_resource_payment_method_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          ach_credit_transfer: Schema.optionalKey(
            Stripepayment_method_details_ach_credit_transfer,
          ),
          ach_debit: Schema.optionalKey(Stripepayment_method_details_ach_debit),
          acss_debit: Schema.optionalKey(
            Stripepayment_method_details_payment_record_acss_debit,
          ),
          affirm: Schema.optionalKey(
            Stripepayment_method_details_payment_record_affirm,
          ),
          afterpay_clearpay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_afterpay_clearpay,
          ),
          alipay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_alipay,
          ),
          alma: Schema.optionalKey(
            Stripepayment_method_details_payment_record_alma,
          ),
          amazon_pay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_amazon_pay,
          ),
          au_becs_debit: Schema.optionalKey(
            Stripepayment_method_details_payment_record_au_becs_debit,
          ),
          bacs_debit: Schema.optionalKey(
            Stripepayment_method_details_payment_record_bacs_debit,
          ),
          bancontact: Schema.optionalKey(
            Schema.suspend(
              (): Schema.Codec<Stripepayment_method_details_payment_record_bancontact> =>
                Stripepayment_method_details_payment_record_bancontact,
            ),
          ),
          billie: Schema.optionalKey(
            Stripepayment_method_details_payment_record_billie,
          ),
          billing_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_billing_details,
              ]).annotate({
                description:
                  "The billing details associated with the method of payment.",
              }),
              Schema.Null,
            ]),
          ),
          bizum: Schema.optionalKey(
            Stripepayment_method_details_payment_record_bizum,
          ),
          blik: Schema.optionalKey(
            Stripepayment_method_details_payment_record_blik,
          ),
          boleto: Schema.optionalKey(
            Stripepayment_method_details_payment_record_boleto,
          ),
          card: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_card_details,
          ),
          card_present: Schema.optionalKey(
            Stripepayment_method_details_card_present,
          ),
          cashapp: Schema.optionalKey(
            Stripepayment_method_details_payment_record_cashapp,
          ),
          crypto: Schema.optionalKey(Stripepayment_method_details_crypto),
          custom: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_custom_details,
          ),
          customer_balance: Schema.optionalKey(
            Stripepayment_method_details_customer_balance,
          ),
          eps: Schema.optionalKey(
            Stripepayment_method_details_payment_record_eps,
          ),
          fpx: Schema.optionalKey(Stripepayment_method_details_fpx),
          giropay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_giropay,
          ),
          grabpay: Schema.optionalKey(Stripepayment_method_details_grabpay),
          ideal: Schema.optionalKey(
            Schema.suspend(
              (): Schema.Codec<Stripepayment_method_details_payment_record_ideal> =>
                Stripepayment_method_details_payment_record_ideal,
            ),
          ),
          interac_present: Schema.optionalKey(
            Stripepayment_method_details_interac_present,
          ),
          kakao_pay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_kakao_pay,
          ),
          klarna: Schema.optionalKey(
            Stripepayment_method_details_payment_record_klarna,
          ),
          konbini: Schema.optionalKey(
            Stripepayment_method_details_payment_record_konbini,
          ),
          kr_card: Schema.optionalKey(Stripepayment_method_details_kr_card),
          link: Schema.optionalKey(
            Stripepayment_method_details_payment_record_link,
          ),
          mb_way: Schema.optionalKey(
            Stripepayment_method_details_payment_record_mb_way,
          ),
          mobilepay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_mobilepay,
          ),
          momo: Schema.optionalKey(
            Stripepayment_method_details_payment_record_momo,
          ),
          multibanco: Schema.optionalKey(
            Stripepayment_method_details_payment_record_multibanco,
          ),
          naver_pay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_naver_pay,
          ),
          nz_bank_account: Schema.optionalKey(
            Stripepayment_method_details_payment_record_nz_bank_account,
          ),
          oxxo: Schema.optionalKey(
            Stripepayment_method_details_payment_record_oxxo,
          ),
          p24: Schema.optionalKey(
            Stripepayment_method_details_payment_record_p24,
          ),
          pay_by_bank: Schema.optionalKey(
            Stripepayment_method_details_payment_record_pay_by_bank,
          ),
          payco: Schema.optionalKey(
            Stripepayment_method_details_payment_record_payco,
          ),
          payment_method: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "ID of the Stripe PaymentMethod used to make this payment.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          paynow: Schema.optionalKey(
            Stripepayment_method_details_payment_record_paynow,
          ),
          paypal: Schema.optionalKey(Stripepayment_method_details_paypal),
          paypay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_paypay,
          ),
          payto: Schema.optionalKey(
            Stripepayment_method_details_payment_record_payto,
          ),
          pix: Schema.optionalKey(
            Stripepayment_method_details_payment_record_pix,
          ),
          promptpay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_promptpay,
          ),
          revolut_pay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_revolut_pay,
          ),
          samsung_pay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_samsung_pay,
          ),
          satispay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_satispay,
          ),
          scalapay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_scalapay,
          ),
          sepa_debit: Schema.optionalKey(
            Stripepayment_method_details_payment_record_sepa_debit,
          ),
          sequra: Schema.optionalKey(
            Stripepayment_method_details_payment_record_sequra,
          ),
          sofort: Schema.optionalKey(
            Schema.suspend(
              (): Schema.Codec<Stripepayment_method_details_payment_record_sofort> =>
                Stripepayment_method_details_payment_record_sofort,
            ),
          ),
          stripe_account: Schema.optionalKey(
            Stripepayment_method_details_stripe_account,
          ),
          sunbit: Schema.optionalKey(
            Stripepayment_method_details_payment_record_sunbit,
          ),
          swish: Schema.optionalKey(
            Stripepayment_method_details_payment_record_swish,
          ),
          twint: Schema.optionalKey(
            Stripepayment_method_details_payment_record_twint,
          ),
          type: Schema.String.annotate({
            description:
              "The type of transaction-specific details of the payment method used in the payment. See [PaymentMethod.type](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type) for the full list of possible types.\nAn additional hash is included on `payment_method_details` with a name matching this value.\nIt contains information specific to the payment method.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          upi: Schema.optionalKey(
            Stripepayment_method_details_payment_record_upi,
          ),
          us_bank_account: Schema.optionalKey(
            Stripepayment_method_details_payment_record_us_bank_account,
          ),
          wechat: Schema.optionalKey(Stripepayment_method_details_wechat),
          wechat_pay: Schema.optionalKey(
            Stripepayment_method_details_payment_record_wechat_pay,
          ),
          zip: Schema.optionalKey(
            Stripepayment_method_details_payment_record_zip,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Payment method detail",
        description:
          "Details about the Payment Method used in this payment attempt.",
        identifier:
          "Stripepayments_primitives_payment_records_resource_payment_method_details",
      }),
  );
export const Stripepayment_flows_private_payment_methods_alipay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "PaymentFlowsPrivatePaymentMethodsAlipay",
  description: "",
  identifier: "Stripepayment_flows_private_payment_methods_alipay",
});
export const Stripepayment_flows_private_payment_methods_card_present_common_wallet =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals([
        "apple_pay",
        "google_pay",
        "samsung_pay",
        "unknown",
      ]).annotate({
        description:
          "The type of mobile wallet, one of `apple_pay`, `google_pay`, `samsung_pay`, or `unknown`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_card_present_common_wallet",
  });
export const Stripepayment_flows_private_payment_methods_satispay_setup_attempt_details =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "PaymentFlowsPrivatePaymentMethodsSatispaySetupAttemptDetails",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_satispay_setup_attempt_details",
  });
export const Stripepayment_flows_amount_details_resource_error =
  Schema.StructWithRest(
    Schema.Struct({
      code: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "amount_details_amount_mismatch",
            "amount_details_tax_shipping_discount_greater_than_amount",
          ]).annotate({
            description:
              "The code of the error that occurred when validating the current amount details.",
          }),
          Schema.Null,
        ]),
      ),
      message: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "A message providing more details about the error.",
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
    title: "PaymentFlowsAmountDetailsResourceError",
    description: "",
    identifier: "Stripepayment_flows_amount_details_resource_error",
  });
export const Stripepayment_flows_private_payment_methods_card_payment_intent_amount_details_line_item_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      commodity_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
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
    title:
      "PaymentFlowsPrivatePaymentMethodsCardPaymentIntentAmountDetailsLineItemPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_card_payment_intent_amount_details_line_item_payment_method_options",
  });
export const Stripepayment_flows_private_payment_methods_card_present_amount_details_line_item_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      commodity_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
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
    title:
      "PaymentFlowsPrivatePaymentMethodsCardPresentAmountDetailsLineItemPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_card_present_amount_details_line_item_payment_method_options",
  });
export const Stripepayment_flows_private_payment_methods_klarna_payment_intent_amount_details_line_item_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      image_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      product_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(255).annotate({
              expected: "a string with at most 255 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      subscription_reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
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
    title:
      "PaymentFlowsPrivatePaymentMethodsKlarnaPaymentIntentAmountDetailsLineItemPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_klarna_payment_intent_amount_details_line_item_payment_method_options",
  });
export const Stripepayment_flows_private_payment_methods_paypal_amount_details_line_item_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      category: Schema.optionalKey(
        Schema.Literals([
          "digital_goods",
          "donation",
          "physical_goods",
        ]).annotate({ description: "Type of the line item." }),
      ),
      description: Schema.optionalKey(
        Schema.String.annotate({
          description: "Description of the line item.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sold_by: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The Stripe account ID of the connected account that sells the item. This is only needed when using [Separate Charges and Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers).",
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
    title:
      "PaymentFlowsPrivatePaymentMethodsPaypalAmountDetailsLineItemPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_paypal_amount_details_line_item_payment_method_options",
  });
export const Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_tax =
  Schema.StructWithRest(
    Schema.Struct({
      total_tax_amount: Schema.Number.annotate({
        description:
          "The total amount of tax on a single line item represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). Required for L3 rates. An integer greater than or equal to 0.\n\nThis field is mutually exclusive with the `amount_details[tax][total_tax_amount]` field.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourceTax",
    description: "",
    identifier:
      "Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_tax",
  });
export const Stripepayment_flows_amount_details_resource_shipping =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "If a physical good is being shipped, the cost of shipping represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). An integer greater than or equal to 0.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      from_postal_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If a physical good is being shipped, the postal code of where it is being shipped from. At most 10 alphanumeric characters long, hyphens and spaces are allowed.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      to_postal_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If a physical good is being shipped, the postal code of where it is being shipped to. At most 10 alphanumeric characters long, hyphens and spaces are allowed.",
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
    title: "PaymentFlowsAmountDetailsResourceShipping",
    description: "",
    identifier: "Stripepayment_flows_amount_details_resource_shipping",
  });
export const Stripepayment_flows_amount_details_resource_tax =
  Schema.StructWithRest(
    Schema.Struct({
      total_tax_amount: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The total amount of tax on the transaction represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). Required for L2 rates. An integer greater than or equal to 0.\n\nThis field is mutually exclusive with the `amount_details[line_items][#][tax][total_tax_amount]` field.",
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
    title: "PaymentFlowsAmountDetailsResourceTax",
    description: "",
    identifier: "Stripepayment_flows_amount_details_resource_tax",
  });
export const Stripepayment_flows_amount_details_client_resource_tip =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.optionalKey(
        Schema.Number.annotate({
          description: "Portion of the amount that corresponds to a tip.",
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
    title: "PaymentFlowsAmountDetailsClientResourceTip",
    description: "",
    identifier: "Stripepayment_flows_amount_details_client_resource_tip",
  });
export const Stripepayment_flows_automatic_payment_methods_payment_intent =
  Schema.StructWithRest(
    Schema.Struct({
      allow_redirects: Schema.optionalKey(
        Schema.Literals(["always", "never"]).annotate({
          description:
            "Controls whether this PaymentIntent will accept redirect-based payment methods.\n\nRedirect-based payment methods may require your customer to be redirected to a payment method's app or site for authentication or additional steps. To [confirm](https://docs.stripe.com/api/payment_intents/confirm) this PaymentIntent, you may be required to provide a `return_url` to redirect customers back to your site after they authenticate or complete the payment.",
        }),
      ),
      enabled: Schema.Boolean.annotate({
        description: "Automatically calculates compatible payment methods",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentFlowsAutomaticPaymentMethodsPaymentIntent",
    description: "",
    identifier: "Stripepayment_flows_automatic_payment_methods_payment_intent",
  });
export const Stripepayment_flows_payment_intent_async_workflows_resource_inputs_resource_tax =
  Schema.StructWithRest(
    Schema.Struct({
      calculation: Schema.String.annotate({
        description:
          "The [TaxCalculation](https://docs.stripe.com/api/tax/calculations) id",
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
    title: "PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputsResourceTax",
    description: "",
    identifier:
      "Stripepayment_flows_payment_intent_async_workflows_resource_inputs_resource_tax",
  });
export const Stripepayment_flows_payment_intent_presentment_details =
  Schema.StructWithRest(
    Schema.Struct({
      presentment_amount: Schema.Number.annotate({
        description:
          "Amount intended to be collected by this payment, denominated in `presentment_currency`.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      presentment_currency: Schema.String.annotate({
        description: "Currency presented to the customer during payment.",
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
    title: "PaymentFlowsPaymentIntentPresentmentDetails",
    description: "",
    identifier: "Stripepayment_flows_payment_intent_presentment_details",
  });
export const Stripepayment_flows_private_payment_methods_alma_details_resource_installments =
  Schema.StructWithRest(
    Schema.Struct({
      count: Schema.Number.annotate({
        description: "The number of installments.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentFlowsPrivatePaymentMethodsAlmaDetailsResourceInstallments",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_alma_details_resource_installments",
  });
export const Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization =
  Schema.StructWithRest(
    Schema.Struct({
      status: Schema.Literals(["disabled", "enabled"]).annotate({
        description:
          "Indicates whether or not the capture window is extended beyond the standard authorization.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentFlowsPrivatePaymentMethodsCardDetailsAPIResourceEnterpriseFeaturesExtendedAuthorizationExtendedAuthorization",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization",
  });
export const Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization =
  Schema.StructWithRest(
    Schema.Struct({
      status: Schema.Literals(["available", "unavailable"]).annotate({
        description:
          "Indicates whether or not the incremental authorization feature is supported.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentFlowsPrivatePaymentMethodsCardDetailsAPIResourceEnterpriseFeaturesIncrementalAuthorizationIncrementalAuthorization",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization",
  });
export const Stripepayment_flows_private_payment_methods_card_details_api_resource_multicapture =
  Schema.StructWithRest(
    Schema.Struct({
      status: Schema.Literals(["available", "unavailable"]).annotate({
        description:
          "Indicates whether or not multiple captures are supported.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentFlowsPrivatePaymentMethodsCardDetailsAPIResourceMulticapture",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_card_details_api_resource_multicapture",
  });
export const Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture =
  Schema.StructWithRest(
    Schema.Struct({
      maximum_amount_capturable: Schema.Number.annotate({
        description: "The maximum amount that can be captured.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      status: Schema.Literals(["available", "unavailable"]).annotate({
        description:
          "Indicates whether or not the authorized amount can be over-captured.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentFlowsPrivatePaymentMethodsCardDetailsAPIResourceEnterpriseFeaturesOvercaptureOvercapture",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture",
  });
export const Stripepayment_flows_private_payment_methods_konbini_details_resource_store =
  Schema.StructWithRest(
    Schema.Struct({
      chain: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "familymart",
            "lawson",
            "ministop",
            "seicomart",
          ]).annotate({
            description:
              "The name of the convenience store chain where the payment was completed.",
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
    title: "PaymentFlowsPrivatePaymentMethodsKonbiniDetailsResourceStore",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_konbini_details_resource_store",
  });
export const Stripepayment_flows_payment_details = Schema.StructWithRest(
  Schema.Struct({
    customer_reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique value to identify the customer. This field is available only for card payments.\n\nThis field is truncated to 25 alphanumeric characters, excluding spaces, before being sent to card networks.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    order_reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique value assigned by the business to identify the transaction. Required for L2 and L3 rates.\n\nFor Cards, this field is truncated to 25 alphanumeric characters, excluding spaces, before being sent to card networks. For Klarna, this field is truncated to 255 characters and is visible to customers when they view the order in the Klarna app.",
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
  title: "PaymentFlowsPaymentDetails",
  description: "",
  identifier: "Stripepayment_flows_payment_details",
});
export const Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details_resource_company_details_registered_address =
  Schema.StructWithRest(
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
            description: "Two-letter country code.",
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
              "Address line 1 (e.g., street, PO Box, or company name).",
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
              "Address line 2 (e.g., apartment, suite, unit, or building).",
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
            description: "State, county, province, or region.",
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
    title:
      "PaymentFlowsPrivatePaymentMethodsBilliePaymentMethodOptionsResourceCompanyDetailsResourceCompanyDetailsRegisteredAddress",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details_resource_company_details_registered_address",
  });
export const Stripepayment_flows_private_payment_methods_kakao_pay_payment_method_options =
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
    title: "PaymentFlowsPrivatePaymentMethodsKakaoPayPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_kakao_pay_payment_method_options",
  });
export const Stripepayment_flows_private_payment_methods_naver_pay_payment_method_options =
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
    title: "PaymentFlowsPrivatePaymentMethodsNaverPayPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_naver_pay_payment_method_options",
  });
export const Stripepayment_flows_private_payment_methods_payco_payment_method_options =
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
    title: "PaymentFlowsPrivatePaymentMethodsPaycoPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_payco_payment_method_options",
  });
export const Stripepayment_flows_private_payment_methods_samsung_pay_payment_method_options =
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
    title: "PaymentFlowsPrivatePaymentMethodsSamsungPayPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_samsung_pay_payment_method_options",
  });
export const Stripepayment_flows_private_payment_methods_financial_connections_common_linked_account_options_filters =
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
    title:
      "PaymentFlowsPrivatePaymentMethodsFinancialConnectionsCommonLinkedAccountOptionsFilters",
    description: "",
    identifier:
      "Stripepayment_flows_private_payment_methods_financial_connections_common_linked_account_options_filters",
  });
export const Stripepayments_primitives_payment_records_resource_amount =
  Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        format: "currency",
      }),
      value: Schema.Number.annotate({
        description:
          "A positive integer representing the amount in the currency's [minor unit](https://docs.stripe.com/currencies#zero-decimal). For example, `100` can represent 1 USD or 100 JPY.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Amount",
    description:
      "A representation of an amount of money, consisting of an amount and a currency.",
    identifier: "Stripepayments_primitives_payment_records_resource_amount",
  });
export const Stripepayments_primitives_payment_records_resource_customer_details =
  Schema.StructWithRest(
    Schema.Struct({
      customer: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "ID of the Stripe Customer associated with this payment.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      email: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The customer's email address.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "The customer's name." }).check(
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
            description: "The customer's phone number.",
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
    title: "Customer Detail",
    description: "Information about the customer for this payment.",
    identifier:
      "Stripepayments_primitives_payment_records_resource_customer_details",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_alma_details_resource_installments =
  Schema.StructWithRest(
    Schema.Struct({
      count: Schema.Number.annotate({
        description: "The number of installments.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodAlmaDetailsResourceInstallments",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_alma_details_resource_installments",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding_resource_funding_card =
  Schema.StructWithRest(
    Schema.Struct({
      brand: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Card brand. Can be `American Express`, `Cartes Bancaires`, `Diners Club`, `Discover`, `Eftpos Australia`, `Girocard`, `JCB`, `MasterCard`, `UnionPay`, `Visa`, or `Unknown`.",
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
              "Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.",
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
              "Two-digit number representing the card's expiration month.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      exp_year: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Four-digit number representing the card's expiration year.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      funding: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.",
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
            description: "The last four digits of the card.",
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodAmazonPayDetailsResourceFundingResourceFundingCard",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding_resource_funding_card",
  });
export const Stripepayments_primitives_payment_records_resource_address =
  Schema.StructWithRest(
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
    title: "Address",
    description: "A representation of a physical address.",
    identifier: "Stripepayments_primitives_payment_records_resource_address",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_checks =
  Schema.StructWithRest(
    Schema.Struct({
      address_line1_check: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "fail",
            "pass",
            "unavailable",
            "unchecked",
          ]).annotate({
            description:
              "If you provide a value for `address.line1`, the check result is one of `pass`, `fail`, `unavailable`, or `unchecked`.",
          }),
          Schema.Null,
        ]),
      ),
      address_postal_code_check: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "fail",
            "pass",
            "unavailable",
            "unchecked",
          ]).annotate({
            description:
              "If you provide a address postal code, the check result is one of `pass`, `fail`, `unavailable`, or `unchecked`.",
          }),
          Schema.Null,
        ]),
      ),
      cvc_check: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "fail",
            "pass",
            "unavailable",
            "unchecked",
          ]).annotate({
            description:
              "If you provide a CVC, the check results is one of `pass`, `fail`, `unavailable`, or `unchecked`.",
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceChecks",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_checks",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installment_plan =
  Schema.StructWithRest(
    Schema.Struct({
      count: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "For `fixed_count` installment plans, this is the number of installment payments your customer will make to their credit card.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      interval: Schema.optionalKey(
        Schema.Union([
          Schema.Literal("month").annotate({
            description:
              "For `fixed_count` installment plans, this is the interval between installment payments your customer will make to their credit card. One of `month`.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literals(["bonus", "fixed_count", "revolving"]).annotate({
        description:
          "Type of installment plan, one of `fixed_count`, `revolving`, or `bonus`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceInstallmentPlan",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installment_plan",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_network_token =
  Schema.StructWithRest(
    Schema.Struct({
      used: Schema.Boolean.annotate({
        description:
          "Indicates if Stripe used a network token, either user provided or Stripe managed when processing the transaction.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceNetworkToken",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_network_token",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_three_d_secure =
  Schema.StructWithRest(
    Schema.Struct({
      authentication_flow: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["challenge", "frictionless"]).annotate({
            description:
              "For authenticated transactions: Indicates how the issuing bank authenticated the customer.",
          }),
          Schema.Null,
        ]),
      ),
      electronic_commerce_indicator: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["01", "02", "03", "04", "05", "06", "07"]).annotate({
            description:
              "The Electronic Commerce Indicator (ECI). A protocol-level field indicating what degree of authentication was performed.",
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
        Schema.Union([
          Schema.Boolean.annotate({
            description:
              "Whether Stripe requested the value of `exemption_indicator` in the transaction. This will depend on the outcome of Stripe's internal risk assessment.",
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
              "Additional information about why 3D Secure succeeded or failed, based on the `result`.",
          }),
          Schema.Null,
        ]),
      ),
      version: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "1.0.2",
            "2.1.0",
            "2.2.0",
            "2.3.0",
            "2.3.1",
          ]).annotate({
            description: "The version of 3D Secure that was used.",
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceThreeDSecure",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_three_d_secure",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_apple_pay =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Type of the apple_pay transaction, one of `apple_pay` or `apple_pay_later`.",
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceApplePay",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_apple_pay",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_google_pay =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceGooglePay",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_google_pay",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_link =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceLink",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_link",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_custom_details =
  Schema.StructWithRest(
    Schema.Struct({
      display_name: Schema.String.annotate({
        description:
          "Display name for the custom (user-defined) payment method type used to make this payment.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      type: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The custom payment method type associated with this payment.",
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
    title: "Custom payment method detail",
    description:
      "Custom Payment Methods represent Payment Method types not modeled directly in\nthe Stripe API. This resource consists of details about the custom payment method\nused for this payment attempt.",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_custom_details",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details_resource_payer_details_address =
  Schema.StructWithRest(
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodKlarnaDetailsResourcePayerDetailsResourcePayerDetailsAddress",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details_resource_payer_details_address",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_konbini_details_resource_store =
  Schema.StructWithRest(
    Schema.Struct({
      chain: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "familymart",
            "lawson",
            "ministop",
            "seicomart",
          ]).annotate({
            description:
              "The name of the convenience store chain where the payment was completed.",
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodKonbiniDetailsResourceStore",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_konbini_details_resource_store",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_mobilepay_details_resource_card =
  Schema.StructWithRest(
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodMobilepayDetailsResourceCard",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_mobilepay_details_resource_card",
  });
export const Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding_resource_funding_card =
  Schema.StructWithRest(
    Schema.Struct({
      brand: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.",
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
              "Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.",
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
              "Two-digit number representing the card's expiration month.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      exp_year: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Four-digit number representing the card's expiration year.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      funding: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.",
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
            description: "The last four digits of the card.",
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
    title:
      "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodRevolutPayDetailsResourceFundingResourceFundingCard",
    description: "",
    identifier:
      "Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding_resource_funding_card",
  });
export const Stripepayments_primitives_payment_records_resource_processor_details_resource_custom_details =
  Schema.StructWithRest(
    Schema.Struct({
      payment_reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "An opaque string for manual reconciliation of this payment, for example a check number or a payment processor ID.",
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
    title: "Custom processor detail",
    description:
      "Custom processors represent payment processors not modeled directly in\nthe Stripe API. This resource consists of details about the custom processor\nused for this payment attempt.",
    identifier:
      "Stripepayments_primitives_payment_records_resource_processor_details_resource_custom_details",
  });
export const Stripepayment_data = Schema.StructWithRest(
  Schema.Struct({
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string attached to the destination payment. Often useful for displaying to users.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_data",
  description: "",
  identifier: "Stripepayment_data",
});
export const Stripepayment_flows_automatic_payment_methods_setup_intent =
  Schema.StructWithRest(
    Schema.Struct({
      allow_redirects: Schema.optionalKey(
        Schema.Literals(["always", "never"]).annotate({
          description:
            "Controls whether this SetupIntent will accept redirect-based payment methods.\n\nRedirect-based payment methods may require your customer to be redirected to a payment method's app or site for authentication or additional steps. To [confirm](https://docs.stripe.com/api/setup_intents/confirm) this SetupIntent, you may be required to provide a `return_url` to redirect customers back to your site after they authenticate or complete the setup.",
        }),
      ),
      enabled: Schema.optionalKey(
        Schema.Union([
          Schema.Boolean.annotate({
            description: "Automatically calculates compatible payment methods",
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
    title: "PaymentFlowsAutomaticPaymentMethodsSetupIntent",
    description: "",
    identifier: "Stripepayment_flows_automatic_payment_methods_setup_intent",
  });
export const Stripepayment_flows_private_payment_methods_klarna_dob =
  Schema.StructWithRest(
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
    title: "PaymentFlowsPrivatePaymentMethodsKlarnaDOB",
    description: "",
    identifier: "Stripepayment_flows_private_payment_methods_klarna_dob",
  });
export const Stripepayment_pages_checkout_session_adaptive_pricing =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "If enabled, Adaptive Pricing is available on [eligible sessions](https://docs.stripe.com/payments/currencies/localize-prices/adaptive-pricing?payment-ui=stripe-hosted#restrictions).",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionAdaptivePricing",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_adaptive_pricing",
  });
export const Stripepayment_pages_checkout_session_after_expiration_recovery =
  Schema.StructWithRest(
    Schema.Struct({
      allow_promotion_codes: Schema.Boolean.annotate({
        description:
          "Enables user redeemable promotion codes on the recovered Checkout Sessions. Defaults to `false`",
      }),
      enabled: Schema.Boolean.annotate({
        description:
          "If `true`, a recovery url will be generated to recover this Checkout Session if it\nexpires before a transaction is completed. It will be attached to the\nCheckout Session object upon expiration.",
      }),
      expires_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The timestamp at which the recovery URL will expire.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      url: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "URL that creates a new Checkout Session when clicked that is a copy of this expired Checkout Session",
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
    title: "PaymentPagesCheckoutSessionAfterExpirationRecovery",
    description: "",
    identifier:
      "Stripepayment_pages_checkout_session_after_expiration_recovery",
  });
export const Stripepayment_pages_checkout_session_branding_settings_icon =
  Schema.StructWithRest(
    Schema.Struct({
      file: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The ID of a [File upload](https://stripe.com/docs/api/files) representing the icon. Purpose must be `business_icon`. Required if `type` is `file` and disallowed otherwise.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      type: Schema.Literals(["file", "url"]).annotate({
        description:
          "The type of image for the icon. Must be one of `file` or `url`.",
      }),
      url: Schema.optionalKey(
        Schema.String.annotate({
          description: "The URL of the image. Present when `type` is `url`.",
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
    title: "PaymentPagesCheckoutSessionBrandingSettingsIcon",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_branding_settings_icon",
  });
export const Stripepayment_pages_checkout_session_branding_settings_logo =
  Schema.StructWithRest(
    Schema.Struct({
      file: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The ID of a [File upload](https://stripe.com/docs/api/files) representing the logo. Purpose must be `business_logo`. Required if `type` is `file` and disallowed otherwise.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      type: Schema.Literals(["file", "url"]).annotate({
        description:
          "The type of image for the logo. Must be one of `file` or `url`.",
      }),
      url: Schema.optionalKey(
        Schema.String.annotate({
          description: "The URL of the image. Present when `type` is `url`.",
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
    title: "PaymentPagesCheckoutSessionBrandingSettingsLogo",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_branding_settings_logo",
  });
export const Stripepayment_pages_checkout_session_consent =
  Schema.StructWithRest(
    Schema.Struct({
      promotions: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["opt_in", "opt_out"]).annotate({
            description:
              "If `opt_in`, the customer consents to receiving promotional communications\nfrom the merchant about this Checkout Session.",
          }),
          Schema.Null,
        ]),
      ),
      terms_of_service: Schema.optionalKey(
        Schema.Union([
          Schema.Literal("accepted").annotate({
            description:
              "If `accepted`, the customer in this Checkout Session has agreed to the merchant's terms of service.",
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
    title: "PaymentPagesCheckoutSessionConsent",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_consent",
  });
export const Stripepayment_pages_checkout_session_payment_method_reuse_agreement =
  Schema.StructWithRest(
    Schema.Struct({
      position: Schema.Literals(["auto", "hidden"]).annotate({
        description:
          "Determines the position and visibility of the payment method reuse agreement in the UI. When set to `auto`, Stripe's defaults will be used.\n\nWhen set to `hidden`, the payment method reuse agreement text will always be hidden in the UI.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionPaymentMethodReuseAgreement",
    description: "",
    identifier:
      "Stripepayment_pages_checkout_session_payment_method_reuse_agreement",
  });
export const Stripepayment_pages_checkout_session_currency_conversion =
  Schema.StructWithRest(
    Schema.Struct({
      amount_subtotal: Schema.Number.annotate({
        description:
          "Total of all items in source currency before discounts or taxes are applied.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      amount_total: Schema.Number.annotate({
        description:
          "Total of all items in source currency after discounts and taxes are applied.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      fx_rate: Schema.String.annotate({
        description:
          "Exchange rate used to convert source currency amounts to customer currency amounts",
        format: "decimal",
      }),
      source_currency: Schema.String.annotate({
        description:
          "Creation currency of the CheckoutSession before localization",
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
    title: "PaymentPagesCheckoutSessionCurrencyConversion",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_currency_conversion",
  });
export const Stripepayment_pages_checkout_session_custom_fields_option =
  Schema.StructWithRest(
    Schema.Struct({
      label: Schema.String.annotate({
        description:
          "The label for the option, displayed to the customer. Up to 100 characters.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      value: Schema.String.annotate({
        description:
          "The value for this option, not displayed to the customer, used by your integration to reconcile the option selected by the customer. Must be unique to this option, alphanumeric, and up to 100 characters.",
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
    title: "PaymentPagesCheckoutSessionCustomFieldsOption",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_custom_fields_option",
  });
export const Stripepayment_pages_checkout_session_custom_fields_label =
  Schema.StructWithRest(
    Schema.Struct({
      custom: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Custom text for the label, displayed to the customer. Up to 100 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("custom").annotate({
        description: "The type of the label.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionCustomFieldsLabel",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_custom_fields_label",
  });
export const Stripepayment_pages_checkout_session_custom_fields_numeric =
  Schema.StructWithRest(
    Schema.Struct({
      default_value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The value that pre-fills the field on the payment page.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      maximum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The maximum character length constraint for the customer's input.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minimum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The minimum character length requirement for the customer's input.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The value entered by the customer, containing only digits.",
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
    title: "PaymentPagesCheckoutSessionCustomFieldsNumeric",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_custom_fields_numeric",
  });
export const Stripepayment_pages_checkout_session_custom_fields_text =
  Schema.StructWithRest(
    Schema.Struct({
      default_value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The value that pre-fills the field on the payment page.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      maximum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The maximum character length constraint for the customer's input.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minimum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The minimum character length requirement for the customer's input.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The value entered by the customer.",
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
    title: "PaymentPagesCheckoutSessionCustomFieldsText",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_custom_fields_text",
  });
export const Stripepayment_pages_checkout_session_custom_text_position =
  Schema.StructWithRest(
    Schema.Struct({
      message: Schema.String.annotate({
        description: "Text can be up to 1200 characters in length.",
      }).check(
        Schema.isMaxCodePoints(1200).annotate({
          expected: "a string with at most 1200 code points",
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
    title: "PaymentPagesCheckoutSessionCustomTextPosition",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_custom_text_position",
  });
export const Stripepayment_pages_checkout_session_tax_id =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals([
        "ad_nrt",
        "ae_trn",
        "al_tin",
        "am_tin",
        "ao_tin",
        "ar_cuit",
        "au_abn",
        "au_acn",
        "au_arn",
        "au_wpn",
        "aw_tin",
        "az_tin",
        "ba_tin",
        "bb_tin",
        "bd_bin",
        "bf_ifu",
        "bg_uic",
        "bh_vat",
        "bj_ifu",
        "bo_tin",
        "br_cnpj",
        "br_cpf",
        "bs_tin",
        "bw_vat",
        "by_tin",
        "ca_bn",
        "ca_gst_hst",
        "ca_pst_bc",
        "ca_pst_mb",
        "ca_pst_sk",
        "ca_qst",
        "cd_nif",
        "ch_uid",
        "ch_vat",
        "ci_vat",
        "cl_tin",
        "cm_niu",
        "cn_tin",
        "co_nit",
        "cr_tin",
        "cv_nif",
        "cz_dic",
        "de_stn",
        "do_rcn",
        "ec_ruc",
        "eg_tin",
        "es_cif",
        "et_tin",
        "eu_oss_vat",
        "eu_vat",
        "fo_vat",
        "fr_siren",
        "fr_siret",
        "fr_spi",
        "gb_vat",
        "ge_vat",
        "gh_tin",
        "gi_tin",
        "gn_nif",
        "hk_br",
        "hr_oib",
        "hu_tin",
        "ic_nif",
        "id_npwp",
        "il_vat",
        "in_gst",
        "is_kt",
        "is_vat",
        "it_cf",
        "jp_cn",
        "jp_rn",
        "jp_trn",
        "ke_pin",
        "kg_tin",
        "kh_tin",
        "kr_brn",
        "kz_bin",
        "la_tin",
        "li_uid",
        "li_vat",
        "lk_vat",
        "ma_vat",
        "md_cf",
        "md_vat",
        "me_pib",
        "mk_vat",
        "mr_nif",
        "mu_vat",
        "mx_rfc",
        "my_frp",
        "my_itn",
        "my_sst",
        "mz_nuit",
        "ng_tin",
        "no_vat",
        "no_voec",
        "np_pan",
        "nz_bn",
        "nz_gst",
        "om_vat",
        "pe_ruc",
        "ph_tin",
        "pl_nip",
        "pt_nif",
        "py_ruc",
        "ro_tin",
        "rs_pib",
        "ru_inn",
        "ru_kpp",
        "sa_vat",
        "sg_gst",
        "sg_uen",
        "si_tin",
        "sm_coe",
        "sn_ninea",
        "sr_fin",
        "sv_nit",
        "th_vat",
        "tj_tin",
        "tr_tin",
        "tt_bir",
        "tt_vat",
        "tw_vat",
        "tz_vat",
        "ua_vat",
        "ug_tin",
        "unknown",
        "us_ein",
        "uy_ruc",
        "uz_tin",
        "uz_vat",
        "ve_rif",
        "vn_tin",
        "za_vat",
        "zm_tin",
        "zw_tin",
      ]).annotate({
        description:
          "The type of the tax ID, one of `ad_nrt`, `ar_cuit`, `eu_vat`, `bo_tin`, `br_cnpj`, `br_cpf`, `cn_tin`, `co_nit`, `cr_tin`, `do_rcn`, `ec_ruc`, `eu_oss_vat`, `hr_oib`, `pe_ruc`, `ro_tin`, `rs_pib`, `sv_nit`, `uy_ruc`, `ve_rif`, `vn_tin`, `gb_vat`, `nz_gst`, `au_abn`, `au_arn`, `in_gst`, `no_vat`, `no_voec`, `za_vat`, `ch_vat`, `mx_rfc`, `sg_uen`, `ru_inn`, `ru_kpp`, `ca_bn`, `hk_br`, `es_cif`, `pl_nip`, `it_cf`, `fo_vat`, `gi_tin`, `py_ruc`, `tw_vat`, `th_vat`, `jp_cn`, `jp_rn`, `jp_trn`, `li_uid`, `li_vat`, `lk_vat`, `my_itn`, `us_ein`, `kr_brn`, `ca_qst`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `my_sst`, `sg_gst`, `ae_trn`, `cl_tin`, `sa_vat`, `id_npwp`, `my_frp`, `il_vat`, `ge_vat`, `ua_vat`, `is_vat`, `bg_uic`, `hu_tin`, `si_tin`, `ke_pin`, `tr_tin`, `eg_tin`, `ph_tin`, `al_tin`, `bh_vat`, `kz_bin`, `ng_tin`, `om_vat`, `de_stn`, `ch_uid`, `tz_vat`, `uz_vat`, `uz_tin`, `md_vat`, `ma_vat`, `by_tin`, `ao_tin`, `bs_tin`, `bb_tin`, `cd_nif`, `mr_nif`, `me_pib`, `zw_tin`, `ba_tin`, `gn_nif`, `mk_vat`, `sr_fin`, `sn_ninea`, `am_tin`, `np_pan`, `tj_tin`, `ug_tin`, `zm_tin`, `kh_tin`, `aw_tin`, `az_tin`, `bd_bin`, `au_acn`, `nz_bn`, `pt_nif`, `cz_dic`, `fr_siret`, `fr_siren`, `fr_spi`, `sm_coe`, `tt_vat`, `tt_bir`, `mu_vat`, `mz_nuit`, `au_wpn`, `md_cf`, `is_kt`, `bj_ifu`, `et_tin`, `kg_tin`, `la_tin`, `cm_niu`, `cv_nif`, `bf_ifu`, `ic_nif`, `gh_tin`, `bw_vat`, `ci_vat`, or `unknown`",
      }),
      value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The value of the tax ID.",
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
    title: "PaymentPagesCheckoutSessionTaxID",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_tax_id",
  });
export const Stripepayment_pages_checkout_session_managed_payments =
  Schema.StructWithRest(
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
    title: "PaymentPagesCheckoutSessionManagedPayments",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_managed_payments",
  });
export const Stripepayment_pages_checkout_session_business_name =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Indicates whether business name collection is enabled for the session",
      }),
      optional: Schema.Boolean.annotate({
        description:
          "Whether the customer is required to complete the field before completing the Checkout Session. Defaults to `false`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionBusinessName",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_business_name",
  });
export const Stripepayment_pages_checkout_session_individual_name =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Indicates whether individual name collection is enabled for the session",
      }),
      optional: Schema.Boolean.annotate({
        description:
          "Whether the customer is required to complete the field before completing the Checkout Session. Defaults to `false`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionIndividualName",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_individual_name",
  });
export const Stripepayment_pages_checkout_session_optional_item_adjustable_quantity =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Set to true if the quantity can be adjusted to any non-negative integer.",
      }),
      maximum: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The maximum quantity of this item the customer can purchase. By default this value is 99. You can specify a value up to 999999.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minimum: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The minimum quantity of this item the customer must purchase, if they choose to purchase it. Because this item is optional, the customer will always be able to remove it from their order, even if the `minimum` configured here is greater than 0. By default this value is 0.",
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
    title: "PaymentPagesCheckoutSessionOptionalItemAdjustableQuantity",
    description: "",
    identifier:
      "Stripepayment_pages_checkout_session_optional_item_adjustable_quantity",
  });
export const Stripepayment_links_resource_completion_behavior_confirmation_page =
  Schema.StructWithRest(
    Schema.Struct({
      custom_message: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The custom message that is displayed to the customer after the purchase is complete.",
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
    title: "PaymentLinksResourceCompletionBehaviorConfirmationPage",
    description: "",
    identifier:
      "Stripepayment_links_resource_completion_behavior_confirmation_page",
  });
export const Stripepayment_links_resource_completion_behavior_redirect =
  Schema.StructWithRest(
    Schema.Struct({
      url: Schema.String.annotate({
        description:
          "The URL the customer will be redirected to after the purchase is complete.",
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
    title: "PaymentLinksResourceCompletionBehaviorRedirect",
    description: "",
    identifier: "Stripepayment_links_resource_completion_behavior_redirect",
  });
export const Stripepayment_links_resource_payment_method_reuse_agreement =
  Schema.StructWithRest(
    Schema.Struct({
      position: Schema.Literals(["auto", "hidden"]).annotate({
        description:
          "Determines the position and visibility of the payment method reuse agreement in the UI. When set to `auto`, Stripe's defaults will be used.\n\nWhen set to `hidden`, the payment method reuse agreement text will always be hidden in the UI.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourcePaymentMethodReuseAgreement",
    description: "",
    identifier: "Stripepayment_links_resource_payment_method_reuse_agreement",
  });
export const Stripepayment_links_resource_custom_fields_dropdown_option =
  Schema.StructWithRest(
    Schema.Struct({
      label: Schema.String.annotate({
        description:
          "The label for the option, displayed to the customer. Up to 100 characters.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      value: Schema.String.annotate({
        description:
          "The value for this option, not displayed to the customer, used by your integration to reconcile the option selected by the customer. Must be unique to this option, alphanumeric, and up to 100 characters.",
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
    title: "PaymentLinksResourceCustomFieldsDropdownOption",
    description: "",
    identifier: "Stripepayment_links_resource_custom_fields_dropdown_option",
  });
export const Stripepayment_links_resource_custom_fields_label =
  Schema.StructWithRest(
    Schema.Struct({
      custom: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Custom text for the label, displayed to the customer. Up to 100 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("custom").annotate({
        description: "The type of the label.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourceCustomFieldsLabel",
    description: "",
    identifier: "Stripepayment_links_resource_custom_fields_label",
  });
export const Stripepayment_links_resource_custom_fields_numeric =
  Schema.StructWithRest(
    Schema.Struct({
      default_value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The value that pre-fills the field on the payment page.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      maximum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The maximum character length constraint for the customer's input.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minimum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The minimum character length requirement for the customer's input.",
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
    title: "PaymentLinksResourceCustomFieldsNumeric",
    description: "",
    identifier: "Stripepayment_links_resource_custom_fields_numeric",
  });
export const Stripepayment_links_resource_custom_fields_text =
  Schema.StructWithRest(
    Schema.Struct({
      default_value: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The value that pre-fills the field on the payment page.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      maximum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The maximum character length constraint for the customer's input.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minimum_length: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The minimum character length requirement for the customer's input.",
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
    title: "PaymentLinksResourceCustomFieldsText",
    description: "",
    identifier: "Stripepayment_links_resource_custom_fields_text",
  });
export const Stripepayment_links_resource_custom_text_position =
  Schema.StructWithRest(
    Schema.Struct({
      message: Schema.String.annotate({
        description: "Text can be up to 1200 characters in length.",
      }).check(
        Schema.isMaxCodePoints(1200).annotate({
          expected: "a string with at most 1200 code points",
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
    title: "PaymentLinksResourceCustomTextPosition",
    description: "",
    identifier: "Stripepayment_links_resource_custom_text_position",
  });
export const Stripepayment_links_resource_business_name = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean.annotate({
      description:
        "Indicates whether business name collection is enabled for the payment link.",
    }),
    optional: Schema.Boolean.annotate({
      description:
        "Whether the customer is required to complete the field before checking out. Defaults to `false`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PaymentLinksResourceBusinessName",
  description: "",
  identifier: "Stripepayment_links_resource_business_name",
});
export const Stripepayment_links_resource_individual_name =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Indicates whether individual name collection is enabled for the payment link.",
      }),
      optional: Schema.Boolean.annotate({
        description:
          "Whether the customer is required to complete the field before checking out. Defaults to `false`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourceIndividualName",
    description: "",
    identifier: "Stripepayment_links_resource_individual_name",
  });
export const Stripepayment_links_resource_optional_item_adjustable_quantity =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Set to true if the quantity can be adjusted to any non-negative integer.",
      }),
      maximum: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The maximum quantity of this item the customer can purchase. By default this value is 99.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minimum: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The minimum quantity of this item the customer must purchase, if they choose to purchase it. Because this item is optional, the customer will always be able to remove it from their order, even if the `minimum` configured here is greater than 0. By default this value is 0.",
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
    title: "PaymentLinksResourceOptionalItemAdjustableQuantity",
    description: "",
    identifier:
      "Stripepayment_links_resource_optional_item_adjustable_quantity",
  });
export const Stripepayment_links_resource_payment_intent_data =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["automatic", "automatic_async", "manual"]).annotate({
            description:
              "Indicates when the funds will be captured from the customer's account.",
          }),
          Schema.Null,
        ]),
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
      metadata: Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.isMaxCodePoints(500).annotate({
            expected: "a string with at most 500 code points",
          }),
        ),
      ).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that will set metadata on [Payment Intents](https://docs.stripe.com/api/payment_intents) generated from this payment link.",
      }),
      setup_future_usage: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["off_session", "on_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with the payment method collected during checkout.",
          }),
          Schema.Null,
        ]),
      ),
      statement_descriptor: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "For a non-card payment, information about the charge that appears on the customer's statement when this payment succeeds in creating a charge.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      statement_descriptor_suffix: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "For a card payment, information about the charge that appears on the customer's statement when this payment succeeds in creating a charge. Concatenated with the account's statement descriptor prefix to form the complete statement descriptor.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transfer_group: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A string that identifies the resulting payment as part of a group. See the PaymentIntents [use case for connected accounts](https://docs.stripe.com/connect/separate-charges-and-transfers) for details.",
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
    title: "PaymentLinksResourcePaymentIntentData",
    description: "",
    identifier: "Stripepayment_links_resource_payment_intent_data",
  });
export const Stripepayment_links_resource_card_restrictions =
  Schema.StructWithRest(
    Schema.Struct({
      brands_blocked: Schema.Array(
        Schema.Literals([
          "american_express",
          "discover_global_network",
          "mastercard",
          "visa",
        ]),
      ).annotate({
        description:
          "The card brands to block. If a customer enters or selects a card belonging to a blocked brand, they can't complete the payment.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourceCardRestrictions",
    description: "",
    identifier: "Stripepayment_links_resource_card_restrictions",
  });
export const Stripepayment_links_resource_phone_number_collection =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "If `true`, a phone number will be collected during checkout.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourcePhoneNumberCollection",
    description: "",
    identifier: "Stripepayment_links_resource_phone_number_collection",
  });
export const Stripepayment_links_resource_completed_sessions =
  Schema.StructWithRest(
    Schema.Struct({
      count: Schema.Number.annotate({
        description:
          "The current number of checkout sessions that have been completed on the payment link which count towards the `completed_sessions` restriction to be met.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      limit: Schema.Number.annotate({
        description:
          "The maximum number of checkout sessions that can be completed for the `completed_sessions` restriction to be met.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourceCompletedSessions",
    description: "",
    identifier: "Stripepayment_links_resource_completed_sessions",
  });
export const Stripepayment_links_resource_shipping_address_collection =
  Schema.StructWithRest(
    Schema.Struct({
      allowed_countries: Schema.Array(
        Schema.Literals([
          "AC",
          "AD",
          "AE",
          "AF",
          "AG",
          "AI",
          "AL",
          "AM",
          "AO",
          "AQ",
          "AR",
          "AT",
          "AU",
          "AW",
          "AX",
          "AZ",
          "BA",
          "BB",
          "BD",
          "BE",
          "BF",
          "BG",
          "BH",
          "BI",
          "BJ",
          "BL",
          "BM",
          "BN",
          "BO",
          "BQ",
          "BR",
          "BS",
          "BT",
          "BV",
          "BW",
          "BY",
          "BZ",
          "CA",
          "CD",
          "CF",
          "CG",
          "CH",
          "CI",
          "CK",
          "CL",
          "CM",
          "CN",
          "CO",
          "CR",
          "CV",
          "CW",
          "CY",
          "CZ",
          "DE",
          "DJ",
          "DK",
          "DM",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "EH",
          "ER",
          "ES",
          "ET",
          "FI",
          "FJ",
          "FK",
          "FO",
          "FR",
          "GA",
          "GB",
          "GD",
          "GE",
          "GF",
          "GG",
          "GH",
          "GI",
          "GL",
          "GM",
          "GN",
          "GP",
          "GQ",
          "GR",
          "GS",
          "GT",
          "GU",
          "GW",
          "GY",
          "HK",
          "HN",
          "HR",
          "HT",
          "HU",
          "ID",
          "IE",
          "IL",
          "IM",
          "IN",
          "IO",
          "IQ",
          "IS",
          "IT",
          "JE",
          "JM",
          "JO",
          "JP",
          "KE",
          "KG",
          "KH",
          "KI",
          "KM",
          "KN",
          "KR",
          "KW",
          "KY",
          "KZ",
          "LA",
          "LB",
          "LC",
          "LI",
          "LK",
          "LR",
          "LS",
          "LT",
          "LU",
          "LV",
          "LY",
          "MA",
          "MC",
          "MD",
          "ME",
          "MF",
          "MG",
          "MK",
          "ML",
          "MM",
          "MN",
          "MO",
          "MQ",
          "MR",
          "MS",
          "MT",
          "MU",
          "MV",
          "MW",
          "MX",
          "MY",
          "MZ",
          "NA",
          "NC",
          "NE",
          "NG",
          "NI",
          "NL",
          "NO",
          "NP",
          "NR",
          "NU",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PF",
          "PG",
          "PH",
          "PK",
          "PL",
          "PM",
          "PN",
          "PR",
          "PS",
          "PT",
          "PY",
          "QA",
          "RE",
          "RO",
          "RS",
          "RU",
          "RW",
          "SA",
          "SB",
          "SC",
          "SD",
          "SE",
          "SG",
          "SH",
          "SI",
          "SJ",
          "SK",
          "SL",
          "SM",
          "SN",
          "SO",
          "SR",
          "SS",
          "ST",
          "SV",
          "SX",
          "SZ",
          "TA",
          "TC",
          "TD",
          "TF",
          "TG",
          "TH",
          "TJ",
          "TK",
          "TL",
          "TM",
          "TN",
          "TO",
          "TR",
          "TT",
          "TV",
          "TW",
          "TZ",
          "UA",
          "UG",
          "US",
          "UY",
          "UZ",
          "VA",
          "VC",
          "VE",
          "VG",
          "VN",
          "VU",
          "WF",
          "WS",
          "XK",
          "YE",
          "YT",
          "ZA",
          "ZM",
          "ZW",
          "ZZ",
        ]),
      ).annotate({
        description:
          "An array of two-letter ISO country codes representing which countries Checkout should provide as options for shipping locations. Unsupported country codes: `AS, CX, CC, CU, HM, IR, KP, MH, FM, NF, MP, PW, SD, SY, UM, VI`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourceShippingAddressCollection",
    description: "",
    identifier: "Stripepayment_links_resource_shipping_address_collection",
  });
export const Stripepayment_links_resource_tax_id_collection =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Indicates whether tax ID collection is enabled for the session.",
      }),
      required: Schema.Literals(["if_supported", "never"]),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentLinksResourceTaxIdCollection",
    description: "",
    identifier: "Stripepayment_links_resource_tax_id_collection",
  });
export const Stripepayment_links_resource_transfer_data = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_transfer_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount in cents (or local equivalent) that will be transferred to the destination account. By default, the entire amount is transferred to the destination.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
          description: "The connected account receiving the transfer.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentLinksResourceTransferData",
      description: "",
      identifier: "Stripepayment_links_resource_transfer_data",
    }),
);
export const Stripepayment_pages_private_card_payment_method_options_resource_restrictions =
  Schema.StructWithRest(
    Schema.Struct({
      brands_blocked: Schema.optionalKey(
        Schema.Array(
          Schema.Literals([
            "american_express",
            "discover_global_network",
            "mastercard",
            "visa",
          ]),
        ).annotate({
          description:
            "The card brands to block. If a customer enters or selects a card belonging to a blocked brand, they can't complete the payment.",
        }),
      ),
      funding_types_blocked: Schema.optionalKey(
        Schema.Array(Schema.Literals(["credit", "debit", "prepaid"])).annotate({
          description:
            "Card funding types to block for this Checkout Session. Supported values are `credit`, `debit`, and `prepaid`.",
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
    title: "PaymentPagesPrivateCardPaymentMethodOptionsResourceRestrictions",
    description: "",
    identifier:
      "Stripepayment_pages_private_card_payment_method_options_resource_restrictions",
  });
export const Stripepayment_pages_checkout_session_permissions =
  Schema.StructWithRest(
    Schema.Struct({
      update_shipping_details: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["client_only", "server_only"]).annotate({
            description:
              "Determines which entity is allowed to update the shipping details.\n\nDefault is `client_only`. Stripe Checkout client will automatically update the shipping details. If set to `server_only`, only your server is allowed to update the shipping details.\n\nThis parameter is only supported when `ui_mode=elements`.",
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
    title: "PaymentPagesCheckoutSessionPermissions",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_permissions",
  });
export const Stripepayment_pages_checkout_session_phone_number_collection =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Indicates whether phone number collection is enabled for the session",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionPhoneNumberCollection",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_phone_number_collection",
  });
export const Stripepayment_pages_checkout_session_saved_payment_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      allow_redisplay_filters: Schema.optionalKey(
        Schema.Union([
          Schema.Array(
            Schema.Literals(["always", "limited", "unspecified"]),
          ).annotate({
            description:
              "Uses the `allow_redisplay` value of each saved payment method to filter the set presented to a returning customer. By default, only saved payment methods with ’allow_redisplay: ‘always’ are shown in Checkout.",
          }),
          Schema.Null,
        ]),
      ),
      payment_method_remove: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["disabled", "enabled"]).annotate({
            description:
              "Enable customers to choose if they wish to remove their saved payment methods. Disabled by default.",
          }),
          Schema.Null,
        ]),
      ),
      payment_method_save: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["disabled", "enabled"]).annotate({
            description:
              "Enable customers to choose if they wish to save their payment method for future use. Disabled by default.",
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
    title: "PaymentPagesCheckoutSessionSavedPaymentMethodOptions",
    description: "",
    identifier:
      "Stripepayment_pages_checkout_session_saved_payment_method_options",
  });
export const Stripepayment_pages_checkout_session_shipping_address_collection =
  Schema.StructWithRest(
    Schema.Struct({
      allowed_countries: Schema.Array(
        Schema.Literals([
          "AC",
          "AD",
          "AE",
          "AF",
          "AG",
          "AI",
          "AL",
          "AM",
          "AO",
          "AQ",
          "AR",
          "AT",
          "AU",
          "AW",
          "AX",
          "AZ",
          "BA",
          "BB",
          "BD",
          "BE",
          "BF",
          "BG",
          "BH",
          "BI",
          "BJ",
          "BL",
          "BM",
          "BN",
          "BO",
          "BQ",
          "BR",
          "BS",
          "BT",
          "BV",
          "BW",
          "BY",
          "BZ",
          "CA",
          "CD",
          "CF",
          "CG",
          "CH",
          "CI",
          "CK",
          "CL",
          "CM",
          "CN",
          "CO",
          "CR",
          "CV",
          "CW",
          "CY",
          "CZ",
          "DE",
          "DJ",
          "DK",
          "DM",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "EH",
          "ER",
          "ES",
          "ET",
          "FI",
          "FJ",
          "FK",
          "FO",
          "FR",
          "GA",
          "GB",
          "GD",
          "GE",
          "GF",
          "GG",
          "GH",
          "GI",
          "GL",
          "GM",
          "GN",
          "GP",
          "GQ",
          "GR",
          "GS",
          "GT",
          "GU",
          "GW",
          "GY",
          "HK",
          "HN",
          "HR",
          "HT",
          "HU",
          "ID",
          "IE",
          "IL",
          "IM",
          "IN",
          "IO",
          "IQ",
          "IS",
          "IT",
          "JE",
          "JM",
          "JO",
          "JP",
          "KE",
          "KG",
          "KH",
          "KI",
          "KM",
          "KN",
          "KR",
          "KW",
          "KY",
          "KZ",
          "LA",
          "LB",
          "LC",
          "LI",
          "LK",
          "LR",
          "LS",
          "LT",
          "LU",
          "LV",
          "LY",
          "MA",
          "MC",
          "MD",
          "ME",
          "MF",
          "MG",
          "MK",
          "ML",
          "MM",
          "MN",
          "MO",
          "MQ",
          "MR",
          "MS",
          "MT",
          "MU",
          "MV",
          "MW",
          "MX",
          "MY",
          "MZ",
          "NA",
          "NC",
          "NE",
          "NG",
          "NI",
          "NL",
          "NO",
          "NP",
          "NR",
          "NU",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PF",
          "PG",
          "PH",
          "PK",
          "PL",
          "PM",
          "PN",
          "PR",
          "PS",
          "PT",
          "PY",
          "QA",
          "RE",
          "RO",
          "RS",
          "RU",
          "RW",
          "SA",
          "SB",
          "SC",
          "SD",
          "SE",
          "SG",
          "SH",
          "SI",
          "SJ",
          "SK",
          "SL",
          "SM",
          "SN",
          "SO",
          "SR",
          "SS",
          "ST",
          "SV",
          "SX",
          "SZ",
          "TA",
          "TC",
          "TD",
          "TF",
          "TG",
          "TH",
          "TJ",
          "TK",
          "TL",
          "TM",
          "TN",
          "TO",
          "TR",
          "TT",
          "TV",
          "TW",
          "TZ",
          "UA",
          "UG",
          "US",
          "UY",
          "UZ",
          "VA",
          "VC",
          "VE",
          "VG",
          "VN",
          "VU",
          "WF",
          "WS",
          "XK",
          "YE",
          "YT",
          "ZA",
          "ZM",
          "ZW",
          "ZZ",
        ]),
      ).annotate({
        description:
          "An array of two-letter ISO country codes representing which countries Checkout should provide as options for\nshipping locations. Unsupported country codes: `AS, CX, CC, CU, HM, IR, KP, MH, FM, NF, MP, PW, SY, UM, VI`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionShippingAddressCollection",
    description: "",
    identifier:
      "Stripepayment_pages_checkout_session_shipping_address_collection",
  });
export const Stripepayment_pages_checkout_session_tax_id_collection =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "Indicates whether tax ID collection is enabled for the session",
      }),
      required: Schema.Literals(["if_supported", "never"]).annotate({
        description:
          "Indicates whether a tax ID is required on the payment page",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentPagesCheckoutSessionTaxIDCollection",
    description: "",
    identifier: "Stripepayment_pages_checkout_session_tax_id_collection",
  });
export const Stripepayment_pages_checkout_session_checkout_address_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_checkout_address_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          address: Stripeaddress,
          name: Schema.String.annotate({ description: "Customer name." }).check(
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
        title: "PaymentPagesCheckoutSessionCheckoutAddressDetails",
        description: "",
        identifier:
          "Stripepayment_pages_checkout_session_checkout_address_details",
      }),
  );
export const Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Stripepayment_flows_private_payment_methods_card_payment_intent_amount_details_line_item_payment_method_options,
          ),
          card_present: Schema.optionalKey(
            Stripepayment_flows_private_payment_methods_card_present_amount_details_line_item_payment_method_options,
          ),
          klarna: Schema.optionalKey(
            Stripepayment_flows_private_payment_methods_klarna_payment_intent_amount_details_line_item_payment_method_options,
          ),
          paypal: Schema.optionalKey(
            Stripepayment_flows_private_payment_methods_paypal_amount_details_line_item_payment_method_options,
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
          "PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourcePaymentMethodOptions",
        description: "",
        identifier:
          "Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_payment_method_options",
      }),
  );
export const Stripepayment_flows_amount_details_client = Schema.suspend(
  (): Schema.Codec<Stripepayment_flows_amount_details_client> =>
    Schema.StructWithRest(
      Schema.Struct({
        tip: Schema.optionalKey(
          Stripepayment_flows_amount_details_client_resource_tip,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentFlowsAmountDetailsClient",
      description: "",
      identifier: "Stripepayment_flows_amount_details_client",
    }),
);
export const Stripepayment_flows_payment_intent_async_workflows_resource_inputs =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_flows_payment_intent_async_workflows_resource_inputs> =>
      Schema.StructWithRest(
        Schema.Struct({
          tax: Schema.optionalKey(
            Stripepayment_flows_payment_intent_async_workflows_resource_inputs_resource_tax,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputs",
        description: "",
        identifier:
          "Stripepayment_flows_payment_intent_async_workflows_resource_inputs",
      }),
  );
export const Stripepayment_flows_installment_options = Schema.suspend(
  (): Schema.Codec<Stripepayment_flows_installment_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        plan: Schema.optionalKey(
          Stripepayment_method_details_card_installments_plan,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentFlowsInstallmentOptions",
      description: "",
      identifier: "Stripepayment_flows_installment_options",
    }),
);
export const Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          registered_address: Schema.optionalKey(
            Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details_resource_company_details_registered_address,
          ),
          registered_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Company or entity name.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          registration_number: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The official registration number for the given registration type.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          registration_type: Schema.optionalKey(
            Schema.Literals([
              "ch_ein",
              "de_hrb",
              "dk_cvr",
              "es_cif",
              "fi_tunnus",
              "fr_siren",
              "fr_siret",
              "it_rea",
              "nl_kvk",
              "no_org_number",
              "no_pno",
              "se_org_number",
              "se_pno",
              "uk_crn",
            ]).annotate({
              description:
                "Type of registration the company or entity holds in their registered country.",
            }),
          ),
          vat: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({ description: "VAT id number" }).check(
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
        title:
          "PaymentFlowsPrivatePaymentMethodsBilliePaymentMethodOptionsResourceCompanyDetails",
        description: "",
        identifier:
          "Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding> =>
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding_resource_funding_card,
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
        title:
          "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodAmazonPayDetailsResourceFunding",
        description: "",
        identifier:
          "Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_billing_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_billing_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          address: Stripepayments_primitives_payment_records_resource_address,
          email: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The billing email associated with the method of payment.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The billing name associated with the method of payment.",
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
                description:
                  "The billing phone number associated with the method of payment.",
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
        title: "Billing Detail",
        description: "Billing details used by the customer for this payment.",
        identifier:
          "Stripepayments_primitives_payment_records_resource_billing_details",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_shipping_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_shipping_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          address: Stripepayments_primitives_payment_records_resource_address,
          name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The shipping recipient's name.",
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
                description: "The shipping recipient's phone number.",
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
        title: "Shipping Detail",
        description:
          "The customer's shipping information associated with this payment.",
        identifier:
          "Stripepayments_primitives_payment_records_resource_shipping_details",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installments =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installments> =>
      Schema.StructWithRest(
        Schema.Struct({
          plan: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installment_plan,
              ]).annotate({
                description: "Installment plan selected for the payment.",
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
        title:
          "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceInstallments",
        description: "",
        identifier:
          "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installments",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet> =>
      Schema.StructWithRest(
        Schema.Struct({
          apple_pay: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_apple_pay,
          ),
          dynamic_last4: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "(For tokenized numbers only.) The last four digits of the device account number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          google_pay: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_google_pay,
          ),
          link: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet_resource_link,
          ),
          type: Schema.String.annotate({
            description:
              "The type of the card wallet, one of `apple_pay`, `google_pay`, or `link`. An additional hash is included on the Wallet subhash with a name matching this value. It contains additional information specific to the card wallet type.",
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
        title:
          "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWallet",
        description: "",
        identifier:
          "Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details_resource_payer_details_address,
              ]).annotate({ description: "The payer's address" }),
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
        title:
          "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodKlarnaDetailsResourcePayerDetails",
        description: "",
        identifier:
          "Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding> =>
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding_resource_funding_card,
          ),
          type: Schema.optionalKey(
            Schema.Union([
              Schema.Literal("card").annotate({
                description: "Funding type of the underlying payment method.",
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
        title:
          "PaymentsPrimitivesPaymentRecordsResourcePaymentMethodRevolutPayDetailsResourceFunding",
        description: "",
        identifier:
          "Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_processor_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_processor_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          custom: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_processor_details_resource_custom_details,
          ),
          type: Schema.Literal("custom").annotate({
            description: "The processor used for this payment attempt.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Processor Detail",
        description: "Processor information associated with this payment.",
        identifier:
          "Stripepayments_primitives_payment_records_resource_processor_details",
      }),
  );
export const Stripepayment_pages_checkout_session_automatic_tax =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_automatic_tax> =>
      Schema.StructWithRest(
        Schema.Struct({
          enabled: Schema.Boolean.annotate({
            description:
              "Indicates whether automatic tax is enabled for the session",
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
                  "The status of the most recent automated tax calculation for this session.",
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
        title: "PaymentPagesCheckoutSessionAutomaticTax",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_automatic_tax",
      }),
  );
export const Stripepayment_links_resource_automatic_tax = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_automatic_tax> =>
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean.annotate({
          description:
            "If `true`, tax will be calculated automatically using the customer's location.",
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
      title: "PaymentLinksResourceAutomaticTax",
      description: "",
      identifier: "Stripepayment_links_resource_automatic_tax",
    }),
);
export const Stripepayment_links_resource_subscription_data_invoice_settings =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_links_resource_subscription_data_invoice_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_tax_ids: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Stripetax_id,
                  Stripedeleted_tax_id,
                ]),
              ).annotate({
                description:
                  "The account tax IDs associated with the subscription. Will be set on invoices generated by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          custom_fields: Schema.optionalKey(
            Schema.Union([
              Schema.Array(Stripeinvoice_setting_custom_field).annotate({
                description:
                  "A list of up to 4 custom fields to be displayed on the invoice.",
              }),
              Schema.Null,
            ]),
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
          footer: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Footer to be displayed on the invoice.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          issuer: Stripeconnect_account_reference,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentLinksResourceSubscriptionDataInvoiceSettings",
        description: "",
        identifier:
          "Stripepayment_links_resource_subscription_data_invoice_settings",
      }),
  );
export const Stripepayment_pages_checkout_session_after_expiration =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_after_expiration> =>
      Schema.StructWithRest(
        Schema.Struct({
          recovery: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_pages_checkout_session_after_expiration_recovery,
              ]).annotate({
                description:
                  "When set, configuration used to recover the Checkout Session on expiry.",
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
        title: "PaymentPagesCheckoutSessionAfterExpiration",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_after_expiration",
      }),
  );
export const Stripepayment_pages_checkout_session_branding_settings =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_branding_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          background_color: Schema.String.annotate({
            description:
              "A hex color value starting with `#` representing the background color for the Checkout Session.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          border_style: Schema.Literals([
            "pill",
            "rectangular",
            "rounded",
          ]).annotate({
            description:
              "The border style for the Checkout Session. Must be one of `rounded`, `rectangular`, or `pill`.",
          }),
          button_color: Schema.String.annotate({
            description:
              "A hex color value starting with `#` representing the button color for the Checkout Session.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          display_name: Schema.String.annotate({
            description: "The display name shown on the Checkout Session.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          font_family: Schema.String.annotate({
            description:
              "The font family for the Checkout Session. Must be one of the [supported font families](https://docs.stripe.com/payments/checkout/customization/appearance?payment-ui=stripe-hosted#font-compatibility).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          icon: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_pages_checkout_session_branding_settings_icon,
              ]).annotate({
                description:
                  "The icon for the Checkout Session. You cannot set both `logo` and `icon`.",
              }),
              Schema.Null,
            ]),
          ),
          logo: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_pages_checkout_session_branding_settings_logo,
              ]).annotate({
                description:
                  "The logo for the Checkout Session. You cannot set both `logo` and `icon`.",
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
        title: "PaymentPagesCheckoutSessionBrandingSettings",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_branding_settings",
      }),
  );
export const Stripepayment_pages_checkout_session_consent_collection =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_consent_collection> =>
      Schema.StructWithRest(
        Schema.Struct({
          payment_method_reuse_agreement: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_pages_checkout_session_payment_method_reuse_agreement,
              ]).annotate({
                description:
                  "If set to `hidden`, it will hide legal text related to the reuse of a payment method.",
              }),
              Schema.Null,
            ]),
          ),
          promotions: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["auto", "none"]).annotate({
                description:
                  "If set to `auto`, enables the collection of customer consent for promotional communications. The Checkout\nSession will determine whether to display an option to opt into promotional communication\nfrom the merchant depending on the customer's locale. Only available to US merchants and US customers.",
              }),
              Schema.Null,
            ]),
          ),
          terms_of_service: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["none", "required"]).annotate({
                description:
                  "If set to `required`, it requires customers to accept the terms of service before being able to pay.",
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
        title: "PaymentPagesCheckoutSessionConsentCollection",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_consent_collection",
      }),
  );
export const Stripepayment_pages_checkout_session_custom_fields_dropdown =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_custom_fields_dropdown> =>
      Schema.StructWithRest(
        Schema.Struct({
          default_value: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The value that pre-fills on the payment page.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          options: Schema.Array(
            Stripepayment_pages_checkout_session_custom_fields_option,
          ).annotate({
            description:
              "The options available for the customer to select. Up to 200 options allowed.",
          }),
          value: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The option selected by the customer. This will be the `value` for the option.",
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
        title: "PaymentPagesCheckoutSessionCustomFieldsDropdown",
        description: "",
        identifier:
          "Stripepayment_pages_checkout_session_custom_fields_dropdown",
      }),
  );
export const Stripepayment_pages_checkout_session_custom_text = Schema.suspend(
  (): Schema.Codec<Stripepayment_pages_checkout_session_custom_text> =>
    Schema.StructWithRest(
      Schema.Struct({
        after_submit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed after the payment confirmation button.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed alongside shipping address collection.",
            }),
            Schema.Null,
          ]),
        ),
        submit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed alongside the payment confirmation button.",
            }),
            Schema.Null,
          ]),
        ),
        terms_of_service_acceptance: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed in place of the default terms of service agreement text.",
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
      title: "PaymentPagesCheckoutSessionCustomText",
      description: "",
      identifier: "Stripepayment_pages_checkout_session_custom_text",
    }),
);
export const Stripepayment_pages_checkout_session_customer_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_customer_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeaddress]).annotate({
                description:
                  "The customer's address after a completed Checkout Session. Note: This property is populated only for sessions on or after March 30, 2022.",
              }),
              Schema.Null,
            ]),
          ),
          business_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The customer's business name after a completed Checkout Session.",
              }).check(
                Schema.isMaxCodePoints(150).annotate({
                  expected: "a string with at most 150 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          email: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The email associated with the Customer, if one exists, on the Checkout Session after a completed Checkout Session or at time of session expiry.\nOtherwise, if the customer has consented to promotional content, this value is the most recent valid email provided by the customer on the Checkout form.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          individual_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The customer's individual name after a completed Checkout Session.",
              }).check(
                Schema.isMaxCodePoints(150).annotate({
                  expected: "a string with at most 150 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The customer's name after a completed Checkout Session. Note: This property is populated only for sessions on or after March 30, 2022.",
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
                description:
                  "The customer's phone number after a completed Checkout Session.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          tax_exempt: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["exempt", "none", "reverse"]).annotate({
                description:
                  "The customer’s tax exempt status after a completed Checkout Session.",
              }),
              Schema.Null,
            ]),
          ),
          tax_ids: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Stripepayment_pages_checkout_session_tax_id,
              ).annotate({
                description:
                  "The customer’s tax IDs after a completed Checkout Session.",
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
        title: "PaymentPagesCheckoutSessionCustomerDetails",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_customer_details",
      }),
  );
export const Stripepayment_pages_checkout_session_invoice_settings =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_invoice_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_tax_ids: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Stripetax_id,
                  Stripedeleted_tax_id,
                ]),
              ).annotate({
                description: "The account tax IDs associated with the invoice.",
              }),
              Schema.Null,
            ]),
          ),
          custom_fields: Schema.optionalKey(
            Schema.Union([
              Schema.Array(Stripeinvoice_setting_custom_field).annotate({
                description: "Custom fields displayed on the invoice.",
              }),
              Schema.Null,
            ]),
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
          footer: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Footer displayed on the invoice.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          issuer: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeconnect_account_reference]).annotate({
                description:
                  "The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.",
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
          rendering_options: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeinvoice_setting_checkout_rendering_options,
              ]).annotate({
                description: "Options for invoice PDF rendering.",
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
        title: "PaymentPagesCheckoutSessionInvoiceSettings",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_invoice_settings",
      }),
  );
export const Stripepayment_links_resource_invoice_settings = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_invoice_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        account_tax_ids: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripetax_id,
                Stripedeleted_tax_id,
              ]),
            ).annotate({
              description: "The account tax IDs associated with the invoice.",
            }),
            Schema.Null,
          ]),
        ),
        custom_fields: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeinvoice_setting_custom_field).annotate({
              description:
                "A list of up to 4 custom fields to be displayed on the invoice.",
            }),
            Schema.Null,
          ]),
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
        footer: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Footer to be displayed on the invoice.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        issuer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeconnect_account_reference]).annotate({
              description:
                "The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.",
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
        rendering_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_setting_checkout_rendering_options,
            ]).annotate({ description: "Options for invoice PDF rendering." }),
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
      title: "PaymentLinksResourceInvoiceSettings",
      description: "",
      identifier: "Stripepayment_links_resource_invoice_settings",
    }),
);
export const Stripepayment_pages_checkout_session_name_collection =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_name_collection> =>
      Schema.StructWithRest(
        Schema.Struct({
          business: Schema.optionalKey(
            Stripepayment_pages_checkout_session_business_name,
          ),
          individual: Schema.optionalKey(
            Stripepayment_pages_checkout_session_individual_name,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentPagesCheckoutSessionNameCollection",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_name_collection",
      }),
  );
export const Stripepayment_pages_checkout_session_optional_item =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_optional_item> =>
      Schema.StructWithRest(
        Schema.Struct({
          adjustable_quantity: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_pages_checkout_session_optional_item_adjustable_quantity,
              ]),
              Schema.Null,
            ]),
          ),
          price: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          quantity: Schema.Int,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentPagesCheckoutSessionOptionalItem",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_optional_item",
      }),
  );
export const Stripepayment_links_resource_after_completion = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_after_completion> =>
    Schema.StructWithRest(
      Schema.Struct({
        hosted_confirmation: Schema.optionalKey(
          Stripepayment_links_resource_completion_behavior_confirmation_page,
        ),
        redirect: Schema.optionalKey(
          Stripepayment_links_resource_completion_behavior_redirect,
        ),
        type: Schema.Literals(["hosted_confirmation", "redirect"]).annotate({
          description: "The specified behavior after the purchase is complete.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentLinksResourceAfterCompletion",
      description: "",
      identifier: "Stripepayment_links_resource_after_completion",
    }),
);
export const Stripepayment_links_resource_consent_collection = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_consent_collection> =>
    Schema.StructWithRest(
      Schema.Struct({
        payment_method_reuse_agreement: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_payment_method_reuse_agreement,
            ]).annotate({
              description:
                "Settings related to the payment method reuse text shown in the Checkout UI.",
            }),
            Schema.Null,
          ]),
        ),
        promotions: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["auto", "none"]).annotate({
              description:
                "If set to `auto`, enables the collection of customer consent for promotional communications.",
            }),
            Schema.Null,
          ]),
        ),
        terms_of_service: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["none", "required"]).annotate({
              description:
                "If set to `required`, it requires cutomers to accept the terms of service before being able to pay. If set to `none`, customers won't be shown a checkbox to accept the terms of service.",
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
      title: "PaymentLinksResourceConsentCollection",
      description: "",
      identifier: "Stripepayment_links_resource_consent_collection",
    }),
);
export const Stripepayment_links_resource_custom_fields_dropdown =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_links_resource_custom_fields_dropdown> =>
      Schema.StructWithRest(
        Schema.Struct({
          default_value: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The value that pre-fills on the payment page.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          options: Schema.Array(
            Stripepayment_links_resource_custom_fields_dropdown_option,
          ).annotate({
            description:
              "The options available for the customer to select. Up to 200 options allowed.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentLinksResourceCustomFieldsDropdown",
        description: "",
        identifier: "Stripepayment_links_resource_custom_fields_dropdown",
      }),
  );
export const Stripepayment_links_resource_custom_text = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_custom_text> =>
    Schema.StructWithRest(
      Schema.Struct({
        after_submit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed after the payment confirmation button.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed alongside shipping address collection.",
            }),
            Schema.Null,
          ]),
        ),
        submit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed alongside the payment confirmation button.",
            }),
            Schema.Null,
          ]),
        ),
        terms_of_service_acceptance: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_custom_text_position,
            ]).annotate({
              description:
                "Custom text that should be displayed in place of the default terms of service agreement text.",
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
      title: "PaymentLinksResourceCustomText",
      description: "",
      identifier: "Stripepayment_links_resource_custom_text",
    }),
);
export const Stripepayment_links_resource_name_collection = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_name_collection> =>
    Schema.StructWithRest(
      Schema.Struct({
        business: Schema.optionalKey(
          Stripepayment_links_resource_business_name,
        ),
        individual: Schema.optionalKey(
          Stripepayment_links_resource_individual_name,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentLinksResourceNameCollection",
      description: "",
      identifier: "Stripepayment_links_resource_name_collection",
    }),
);
export const Stripepayment_links_resource_optional_item = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_optional_item> =>
    Schema.StructWithRest(
      Schema.Struct({
        adjustable_quantity: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_optional_item_adjustable_quantity,
            ]),
            Schema.Null,
          ]),
        ),
        price: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        quantity: Schema.Int,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentLinksResourceOptionalItem",
      description: "",
      identifier: "Stripepayment_links_resource_optional_item",
    }),
);
export const Stripepayment_links_resource_card_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_links_resource_card_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          restrictions: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_links_resource_card_restrictions,
              ]).annotate({
                description:
                  "Restrictions to apply to the card payment method. For example, you can block specific card brands.",
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
        title: "PaymentLinksResourceCardPaymentMethodOptions",
        description: "",
        identifier: "Stripepayment_links_resource_card_payment_method_options",
      }),
  );
export const Stripepayment_links_resource_restrictions = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_restrictions> =>
    Schema.StructWithRest(
      Schema.Struct({
        completed_sessions: Stripepayment_links_resource_completed_sessions,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentLinksResourceRestrictions",
      description: "",
      identifier: "Stripepayment_links_resource_restrictions",
    }),
);
export const Stripepayment_pages_checkout_session_collected_information =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_collected_information> =>
      Schema.StructWithRest(
        Schema.Struct({
          business_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Customer’s business name for this Checkout Session",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          individual_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Customer’s individual name for this Checkout Session",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          shipping_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_pages_checkout_session_checkout_address_details,
              ]).annotate({
                description: "Shipping information for this Checkout Session.",
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
        title: "PaymentPagesCheckoutSessionCollectedInformation",
        description: "",
        identifier:
          "Stripepayment_pages_checkout_session_collected_information",
      }),
  );
export const Stripepayment_pages_checkout_session_discount = Schema.suspend(
  (): Schema.Codec<Stripepayment_pages_checkout_session_discount> =>
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
              description: "Coupon attached to the Checkout Session.",
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
              description: "Promotion code attached to the Checkout Session.",
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
      title: "PaymentPagesCheckoutSessionDiscount",
      description: "",
      identifier: "Stripepayment_pages_checkout_session_discount",
    }),
);
export const Stripepayment_flows_payment_intent_async_workflows =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_flows_payment_intent_async_workflows> =>
      Schema.StructWithRest(
        Schema.Struct({
          inputs: Schema.optionalKey(
            Stripepayment_flows_payment_intent_async_workflows_resource_inputs,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentFlowsPaymentIntentAsyncWorkflows",
        description: "",
        identifier: "Stripepayment_flows_payment_intent_async_workflows",
      }),
  );
export const Stripepayments_primitives_payment_records_resource_payment_method_card_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayments_primitives_payment_records_resource_payment_method_card_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          authorization_code: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The authorization code of the payment.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          brand: Schema.optionalKey(
            Schema.Union([
              Schema.Literals([
                "amex",
                "cartes_bancaires",
                "diners",
                "discover",
                "eftpos_au",
                "interac",
                "jcb",
                "link",
                "mastercard",
                "unionpay",
                "unknown",
                "visa",
              ]).annotate({
                description:
                  "Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.",
              }),
              Schema.Null,
            ]),
          ),
          capture_before: Schema.optionalKey(
            Schema.Number.annotate({
              description:
                "When using manual capture, a future timestamp at which the charge will be automatically refunded if uncaptured.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
          ),
          checks: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_checks,
              ]).annotate({
                description:
                  "Check results by Card networks on Card address and CVC at time of payment.",
              }),
              Schema.Null,
            ]),
          ),
          country: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.",
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
                  "Two-digit number representing the card's expiration month.",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
          exp_year: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "Four-digit number representing the card's expiration year.",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
          fingerprint: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number, for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.\n\n*As of May 1, 2021, card fingerprint in India for Connect changed to allow two fingerprints for the same card---one for India and one for the rest of the world.*",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          funding: Schema.optionalKey(
            Schema.Union([
              Schema.Literals([
                "credit",
                "debit",
                "prepaid",
                "unknown",
              ]).annotate({
                description:
                  "Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.",
              }),
              Schema.Null,
            ]),
          ),
          installments: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_installments,
              ]).annotate({
                description: "Installment details for this payment.",
              }),
              Schema.Null,
            ]),
          ),
          last4: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The last four digits of the card.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          network: Schema.optionalKey(
            Schema.Union([
              Schema.Literals([
                "amex",
                "cartes_bancaires",
                "diners",
                "discover",
                "eftpos_au",
                "interac",
                "jcb",
                "link",
                "mastercard",
                "unionpay",
                "unknown",
                "visa",
              ]).annotate({
                description:
                  "Identifies which network this charge was processed on. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`, `mastercard`, `unionpay`, `visa`, or `unknown`.",
              }),
              Schema.Null,
            ]),
          ),
          network_advice_code: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Advice code from the card network for the failed payment.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          network_decline_code: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Decline code from the card network for the failed payment.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          network_token: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_network_token,
              ]).annotate({
                description:
                  "If this card has network token credentials, this contains the details of the network token credentials.",
              }),
              Schema.Null,
            ]),
          ),
          network_transaction_id: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "This is used by the financial networks to identify a transaction. Visa calls this the Transaction ID, Mastercard calls this the Trace ID, and American Express calls this the Acquirer Reference Data. This value will be present if it is returned by the financial network in the authorization response, and null otherwise.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          stored_credential_usage: Schema.optionalKey(
            Schema.Union([
              Schema.Literals([
                "installment",
                "recurring",
                "unscheduled",
              ]).annotate({
                description:
                  "The transaction type that was passed for an off-session, Merchant-Initiated transaction, one of `recurring` or `unscheduled`.",
              }),
              Schema.Null,
            ]),
          ),
          three_d_secure: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_three_d_secure,
              ]).annotate({
                description:
                  "Populated if this transaction used 3D Secure authentication.",
              }),
              Schema.Null,
            ]),
          ),
          wallet: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_card_details_resource_wallet,
              ]).annotate({
                description:
                  "If this Card is part of a card wallet, this contains the details of the card wallet.",
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
        title: "Card payment method detail",
        description: "Details of the card used for this payment attempt.",
        identifier:
          "Stripepayments_primitives_payment_records_resource_payment_method_card_details",
      }),
  );
export const Stripepayment_pages_checkout_session_custom_fields =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_custom_fields> =>
      Schema.StructWithRest(
        Schema.Struct({
          dropdown: Schema.optionalKey(
            Stripepayment_pages_checkout_session_custom_fields_dropdown,
          ),
          key: Schema.String.annotate({
            description:
              "String of your choice that your integration can use to reconcile this field. Must be unique to this field, alphanumeric, and up to 200 characters.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          label: Stripepayment_pages_checkout_session_custom_fields_label,
          numeric: Schema.optionalKey(
            Stripepayment_pages_checkout_session_custom_fields_numeric,
          ),
          optional: Schema.Boolean.annotate({
            description:
              "Whether the customer is required to complete the field before completing the Checkout Session. Defaults to `false`.",
          }),
          text: Schema.optionalKey(
            Stripepayment_pages_checkout_session_custom_fields_text,
          ),
          type: Schema.Literals(["dropdown", "numeric", "text"]).annotate({
            description: "The type of the field.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentPagesCheckoutSessionCustomFields",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_custom_fields",
      }),
  );
export const Stripepayment_pages_checkout_session_invoice_creation =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_invoice_creation> =>
      Schema.StructWithRest(
        Schema.Struct({
          enabled: Schema.Boolean.annotate({
            description:
              "Indicates whether invoice creation is enabled for the Checkout Session.",
          }),
          invoice_data: Stripepayment_pages_checkout_session_invoice_settings,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentPagesCheckoutSessionInvoiceCreation",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_invoice_creation",
      }),
  );
export const Stripepayment_links_resource_invoice_creation = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_invoice_creation> =>
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean.annotate({
          description: "Enable creating an invoice on successful payment.",
        }),
        invoice_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_invoice_settings,
            ]).annotate({
              description:
                "Configuration for the invoice. Default invoice values will be used if unspecified.",
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
      title: "PaymentLinksResourceInvoiceCreation",
      description: "",
      identifier: "Stripepayment_links_resource_invoice_creation",
    }),
);
export const Stripepayment_links_resource_custom_fields = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_custom_fields> =>
    Schema.StructWithRest(
      Schema.Struct({
        dropdown: Schema.optionalKey(
          Stripepayment_links_resource_custom_fields_dropdown,
        ),
        key: Schema.String.annotate({
          description:
            "String of your choice that your integration can use to reconcile this field. Must be unique to this field, alphanumeric, and up to 200 characters.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        label: Stripepayment_links_resource_custom_fields_label,
        numeric: Schema.optionalKey(
          Stripepayment_links_resource_custom_fields_numeric,
        ),
        optional: Schema.Boolean.annotate({
          description:
            "Whether the customer is required to complete the field before completing the Checkout Session. Defaults to `false`.",
        }),
        text: Schema.optionalKey(
          Stripepayment_links_resource_custom_fields_text,
        ),
        type: Schema.Literals(["dropdown", "numeric", "text"]).annotate({
          description: "The type of the field.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentLinksResourceCustomFields",
      description: "",
      identifier: "Stripepayment_links_resource_custom_fields",
    }),
);
export const Stripepayment_links_resource_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_links_resource_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_links_resource_card_payment_method_options,
              ]).annotate({
                description: "Configuration for `card` payment methods.",
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
        title: "PaymentLinksResourcePaymentMethodOptions",
        description: "",
        identifier: "Stripepayment_links_resource_payment_method_options",
      }),
  );
export const Stripepayment_links_resource_subscription_data = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_subscription_data> =>
    Schema.StructWithRest(
      Schema.Struct({
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
        invoice_settings:
          Stripepayment_links_resource_subscription_data_invoice_settings,
        metadata: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that will set metadata on [Subscriptions](https://docs.stripe.com/api/subscriptions) generated from this payment link.",
        }),
        trial_period_days: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Integer representing the number of trial period days before the customer is charged for the first time.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        trial_settings: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_trials_resource_trial_settings,
            ]).annotate({
              description: "Settings related to subscription trials.",
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
      title: "PaymentLinksResourceSubscriptionData",
      description: "",
      identifier: "Stripepayment_links_resource_subscription_data",
    }),
);
export const Stripepayment_flows_amount_details = Schema.suspend(
  (): Schema.Codec<Stripepayment_flows_amount_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        discount_amount: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The total discount applied on the transaction represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). An integer greater than 0.\n\nThis field is mutually exclusive with the `amount_details[line_items][#][discount_amount]` field.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        error: Schema.optionalKey(
          Stripepayment_flows_amount_details_resource_error,
        ),
        line_items: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(
                Stripepayment_intent_amount_details_line_item,
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
            title: "PaymentFlowsAmountDetailsResourceLineItemsList",
            description:
              "A list of line items, each containing information about a product in the PaymentIntent. There is a maximum of 200 line items.",
          }),
        ),
        shipping: Schema.optionalKey(
          Stripepayment_flows_amount_details_resource_shipping,
        ),
        tax: Schema.optionalKey(
          Stripepayment_flows_amount_details_resource_tax,
        ),
        tip: Schema.optionalKey(
          Stripepayment_flows_amount_details_client_resource_tip,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentFlowsAmountDetails",
      description: "",
      identifier: "Stripepayment_flows_amount_details",
    }),
);
export const Stripepayment_pages_checkout_session_total_details_resource_breakdown =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_total_details_resource_breakdown> =>
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
        title: "PaymentPagesCheckoutSessionTotalDetailsResourceBreakdown",
        description: "",
        identifier:
          "Stripepayment_pages_checkout_session_total_details_resource_breakdown",
      }),
  );
export const Stripepayment_links_resource_shipping_option = Schema.suspend(
  (): Schema.Codec<Stripepayment_links_resource_shipping_option> =>
    Schema.StructWithRest(
      Schema.Struct({
        shipping_amount: Schema.Number.annotate({
          description:
            "A non-negative integer in cents representing how much to charge.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        shipping_rate: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeshipping_rate,
        ]).annotate({
          description:
            "The ID of the Shipping Rate to use for this shipping option.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentLinksResourceShippingOption",
      description: "",
      identifier: "Stripepayment_links_resource_shipping_option",
    }),
);
export const Stripepayment_pages_checkout_session_shipping_cost =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_shipping_cost> =>
      Schema.StructWithRest(
        Schema.Struct({
          amount_subtotal: Schema.Number.annotate({
            description:
              "Total shipping cost before any discounts or taxes are applied.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          amount_tax: Schema.Number.annotate({
            description:
              "Total tax amount applied due to shipping costs. If no tax was applied, defaults to 0.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          amount_total: Schema.Number.annotate({
            description:
              "Total shipping cost after discounts and taxes are applied.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          shipping_rate: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripeshipping_rate,
              ]).annotate({
                description: "The ID of the ShippingRate for this order.",
              }),
              Schema.Null,
            ]),
          ),
          taxes: Schema.optionalKey(
            Schema.Array(Stripeline_items_tax_amount).annotate({
              description: "The taxes applied to the shipping rate.",
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
        title: "PaymentPagesCheckoutSessionShippingCost",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_shipping_cost",
      }),
  );
export const Stripepayment_pages_checkout_session_shipping_option =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_shipping_option> =>
      Schema.StructWithRest(
        Schema.Struct({
          shipping_amount: Schema.Number.annotate({
            description:
              "A non-negative integer in cents representing how much to charge.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          shipping_rate: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripeshipping_rate,
          ]).annotate({ description: "The shipping rate." }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentPagesCheckoutSessionShippingOption",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_shipping_option",
      }),
  );
export const Stripepayment_source = Schema.suspend(
  (): Schema.Codec<Stripepayment_source> =>
    Schema.Union([
      Stripeaccount,
      Stripebank_account,
      Stripecard,
      Stripesource,
    ]).annotate({ title: "Polymorphic", identifier: "Stripepayment_source" }),
);
export const Stripepayment_pages_checkout_session_total_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_pages_checkout_session_total_details> =>
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
            Stripepayment_pages_checkout_session_total_details_resource_breakdown,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentPagesCheckoutSessionTotalDetails",
        description: "",
        identifier: "Stripepayment_pages_checkout_session_total_details",
      }),
  );
export const Stripepayment_link = Schema.suspend(
  (): Schema.Codec<Stripepayment_link> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description:
            "Whether the payment link's `url` is active. If `false`, customers visiting the URL will be shown a page saying that the link has been deactivated.",
        }),
        after_completion: Stripepayment_links_resource_after_completion,
        allow_promotion_codes: Schema.Boolean.annotate({
          description: "Whether user redeemable promotion codes are enabled.",
        }),
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
                "The ID of the Connect application that created the Payment Link.",
            }),
            Schema.Null,
          ]),
        ),
        application_fee_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        application_fee_percent: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        automatic_tax: Stripepayment_links_resource_automatic_tax,
        billing_address_collection: Schema.Literals([
          "auto",
          "required",
        ]).annotate({
          description:
            "Configuration for collecting the customer's billing address. Defaults to `auto`.",
        }),
        consent_collection: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_consent_collection,
            ]).annotate({
              description:
                "When set, provides configuration to gather active consent from customers.",
            }),
            Schema.Null,
          ]),
        ),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        custom_fields: Schema.Array(
          Stripepayment_links_resource_custom_fields,
        ).annotate({
          description:
            "Collect additional information from your customer using custom fields. Up to 3 fields are supported. You can't set this parameter if `ui_mode` is `elements`.",
        }),
        custom_text: Stripepayment_links_resource_custom_text,
        customer_creation: Schema.Literals(["always", "if_required"]).annotate({
          description: "Configuration for Customer creation during checkout.",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        inactive_message: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The custom message to be displayed to a customer when a payment link is no longer active.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        invoice_creation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_invoice_creation,
            ]).annotate({
              description:
                "Configuration for creating invoice for payment mode payment links.",
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
            title: "PaymentLinksResourceListLineItems",
            description: "The line items representing what is being sold.",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        managed_payments: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_pages_checkout_session_managed_payments,
            ]).annotate({
              description:
                "Settings for Managed Payments for this Payment Link and resulting [CheckoutSessions](/api/checkout/sessions/object), [PaymentIntents](/api/payment_intents/object), [Invoices](/api/invoices/object), and [Subscriptions](/api/subscriptions/object).",
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
        name_collection: Schema.optionalKey(
          Stripepayment_links_resource_name_collection,
        ),
        object: Schema.Literal("payment_link").annotate({
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
              Stripeaccount,
            ]).annotate({
              description:
                "The account on behalf of which to charge. See the [Connect documentation](https://support.stripe.com/questions/sending-invoices-on-behalf-of-connected-accounts) for details.",
            }),
            Schema.Null,
          ]),
        ),
        optional_items: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripepayment_links_resource_optional_item).annotate({
              description:
                "The optional items presented to the customer at checkout.",
            }),
            Schema.Null,
          ]),
        ),
        payment_intent_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_payment_intent_data,
            ]).annotate({
              description:
                "Indicates the parameters to be passed to PaymentIntent creation during checkout.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_collection: Schema.Literals([
          "always",
          "if_required",
        ]).annotate({
          description:
            "Configuration for collecting a payment method during checkout. Defaults to `always`.",
        }),
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_payment_method_options,
            ]).annotate({
              description: "Payment-method-specific configuration.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_types: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "affirm",
                "afterpay_clearpay",
                "alipay",
                "alma",
                "au_becs_debit",
                "bacs_debit",
                "bancontact",
                "billie",
                "bizum",
                "blik",
                "boleto",
                "card",
                "cashapp",
                "eps",
                "fpx",
                "giropay",
                "grabpay",
                "ideal",
                "klarna",
                "konbini",
                "link",
                "mb_way",
                "mobilepay",
                "multibanco",
                "oxxo",
                "p24",
                "pay_by_bank",
                "paynow",
                "paypal",
                "paypay",
                "payto",
                "pix",
                "promptpay",
                "satispay",
                "scalapay",
                "sepa_debit",
                "sequra",
                "sofort",
                "sunbit",
                "swish",
                "twint",
                "upi",
                "us_bank_account",
                "wechat_pay",
                "zip",
              ]),
            ).annotate({
              description:
                "The list of payment method types that customers can use. When `null`, Stripe will dynamically show relevant payment methods you've enabled in your [payment method settings](https://dashboard.stripe.com/settings/payment_methods).",
            }),
            Schema.Null,
          ]),
        ),
        phone_number_collection:
          Stripepayment_links_resource_phone_number_collection,
        restrictions: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_links_resource_restrictions]).annotate({
              description:
                "Settings that restrict the usage of a payment link.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_address_collection: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_shipping_address_collection,
            ]).annotate({
              description:
                "Configuration for collecting the customer's shipping address.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_options: Schema.Array(
          Stripepayment_links_resource_shipping_option,
        ).annotate({
          description: "The shipping rate options applied to the session.",
        }),
        submit_type: Schema.Literals([
          "auto",
          "book",
          "donate",
          "pay",
          "subscribe",
        ]).annotate({
          description:
            "Indicates the type of transaction being performed which customizes relevant text on the page, such as the submit button.",
        }),
        subscription_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_links_resource_subscription_data,
            ]).annotate({
              description:
                "When creating a subscription, the specified configuration data will be used. There must be at least one line item with a recurring price to use `subscription_data`.",
            }),
            Schema.Null,
          ]),
        ),
        tax_id_collection: Stripepayment_links_resource_tax_id_collection,
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_links_resource_transfer_data]).annotate(
              {
                description:
                  "The account (if any) the payments will be attributed to for tax reporting, and where funds from each payment will be transferred to.",
              },
            ),
            Schema.Null,
          ]),
        ),
        url: Schema.String.annotate({
          description: "The public URL that can be shared with customers.",
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
      title: "Payment Link",
      description:
        "A payment link is a shareable URL that will take your customers to a hosted payment page. A payment link can be shared and used multiple times.\n\nWhen a customer opens a payment link it will open a new [checkout session](https://docs.stripe.com/api/checkout/sessions) to render the payment page. You can use [checkout session events](https://docs.stripe.com/api/events/types#event_types-checkout.session.completed) to track payments through payment links.\n\nRelated guide: [Payment Links API](https://docs.stripe.com/payment-links)",
      identifier: "Stripepayment_link",
    }),
);
