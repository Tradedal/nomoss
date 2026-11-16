// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import { Stripecharge } from "./charges.js";
import {
  Stripeapi_errors,
  Stripeapplication,
  Stripefunding_instructions_bank_transfer_financial_address,
  Stripelinked_account_options_common,
  Stripereview,
  Stripeshipping,
  Stripesmor_resource_managed_payments,
} from "./common.js";
import { Stripecustomer, Stripedeleted_customer } from "./customers.js";
import {
  Stripepayment_method_options_affirm,
  Stripepayment_method_options_afterpay_clearpay,
  Stripepayment_method_options_alipay,
  Stripepayment_method_options_alma,
  Stripepayment_method_options_amazon_pay,
  Stripepayment_method_options_bancontact,
  Stripepayment_method_options_billie,
  Stripepayment_method_options_bizum,
  Stripepayment_method_options_boleto,
  Stripepayment_method_options_card_installments,
  Stripepayment_method_options_card_mandate_options,
  Stripepayment_method_options_card_present,
  Stripepayment_method_options_card_present_routing,
  Stripepayment_method_options_cashapp,
  Stripepayment_method_options_crypto,
  Stripepayment_method_options_customer_balance,
  Stripepayment_method_options_fpx,
  Stripepayment_method_options_giropay,
  Stripepayment_method_options_grabpay,
  Stripepayment_method_options_ideal,
  Stripepayment_method_options_interac_present,
  Stripepayment_method_options_klarna,
  Stripepayment_method_options_konbini,
  Stripepayment_method_options_kr_card,
  Stripepayment_method_options_mb_way,
  Stripepayment_method_options_multibanco,
  Stripepayment_method_options_oxxo,
  Stripepayment_method_options_p24,
  Stripepayment_method_options_pay_by_bank,
  Stripepayment_method_options_paynow,
  Stripepayment_method_options_paypal,
  Stripepayment_method_options_paypay,
  Stripepayment_method_options_pix,
  Stripepayment_method_options_promptpay,
  Stripepayment_method_options_revolut_pay,
  Stripepayment_method_options_satispay,
  Stripepayment_method_options_scalapay,
  Stripepayment_method_options_sequra,
  Stripepayment_method_options_sofort,
  Stripepayment_method_options_sunbit,
  Stripepayment_method_options_twint,
  Stripepayment_method_options_upi,
  Stripepayment_method_options_us_bank_account_mandate_options,
  Stripepayment_method_options_wechat_pay,
  Stripepayment_method_options_zip,
} from "./paymentMethodOptions.js";
import {
  Stripepayment_method,
  Stripepayment_method_config_biz_payment_method_configuration_details,
} from "./paymentMethods.js";
import {
  Stripepayment_flows_amount_details,
  Stripepayment_flows_amount_details_client,
  Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_payment_method_options,
  Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_tax,
  Stripepayment_flows_automatic_payment_methods_payment_intent,
  Stripepayment_flows_installment_options,
  Stripepayment_flows_payment_details,
  Stripepayment_flows_payment_intent_async_workflows,
  Stripepayment_flows_payment_intent_presentment_details,
  Stripepayment_flows_private_payment_methods_kakao_pay_payment_method_options,
  Stripepayment_flows_private_payment_methods_naver_pay_payment_method_options,
  Stripepayment_flows_private_payment_methods_payco_payment_method_options,
  Stripepayment_flows_private_payment_methods_samsung_pay_payment_method_options,
  Stripepayment_record,
} from "./payments.js";
import { Stripetransfer_data } from "./transfers.js";

export type Stripepayment_intent = {
  readonly allowed_payment_method_types?: ReadonlyArray<
    | "acss_debit"
    | "affirm"
    | "afterpay_clearpay"
    | "alipay"
    | "alma"
    | "amazon_pay"
    | "au_becs_debit"
    | "bacs_debit"
    | "bancontact"
    | "billie"
    | "bizum"
    | "blik"
    | "boku_promptpay"
    | "boleto"
    | "capchase_pay"
    | "card"
    | "card_present"
    | "cashapp"
    | "check_scan"
    | "click_to_pay"
    | "crypto"
    | "customer_balance"
    | "demo_pay"
    | "duitnow"
    | "dummy_auth_push"
    | "dummy_passthrough_card"
    | "edenred"
    | "eps"
    | "fpx"
    | "gcash"
    | "getbalance"
    | "gift_card"
    | "giropay"
    | "gopay"
    | "grabpay"
    | "id_bank_transfer"
    | "ideal"
    | "interac_present"
    | "kakao_pay"
    | "klarna"
    | "knet"
    | "konbini"
    | "kr_card"
    | "kr_market"
    | "kriya"
    | "link"
    | "mb_way"
    | "mobilepay"
    | "momo"
    | "mondu"
    | "multibanco"
    | "naver_pay"
    | "netbanking"
    | "ng_bank"
    | "ng_bank_transfer"
    | "ng_card"
    | "ng_market"
    | "ng_ussd"
    | "ng_wallet"
    | "nz_bank_account"
    | "octopus"
    | "oxxo"
    | "p24"
    | "paper_check"
    | "pay_by_bank"
    | "payco"
    | "paynow"
    | "paypal"
    | "paypay"
    | "payto"
    | "pix"
    | "promptpay"
    | "qris"
    | "rechnung"
    | "revolut_pay"
    | "samsung_pay"
    | "satispay"
    | "scalapay"
    | "sepa_debit"
    | "sequra"
    | "shop_pay"
    | "shopeepay"
    | "sofort"
    | "south_korea_market"
    | "stripe_balance"
    | "sunbit"
    | "swish"
    | "tamara"
    | "test_pay"
    | "touch_n_go"
    | "truemoney"
    | "twint"
    | "upi"
    | "us_bank_account"
    | "us_cash_voucher"
    | "vipps"
    | "wechat_pay"
    | "wero"
    | "zip"
  > | null;
  readonly amount?: number;
  readonly amount_capturable?: number;
  readonly amount_details?:
    | Stripepayment_flows_amount_details
    | Stripepayment_flows_amount_details_client;
  readonly amount_received?: number;
  readonly application?: string | Stripeapplication | null;
  readonly application_fee_amount?: number | null;
  readonly automatic_payment_methods?: Stripepayment_flows_automatic_payment_methods_payment_intent | null;
  readonly canceled_at?: number | null;
  readonly cancellation_reason?:
    | "abandoned"
    | "automatic"
    | "duplicate"
    | "expired"
    | "failed_invoice"
    | "fraudulent"
    | "requested_by_customer"
    | "void_invoice"
    | null;
  readonly capture_method?: "automatic" | "automatic_async" | "manual";
  readonly client_secret?: string | null;
  readonly confirmation_method?: "automatic" | "manual";
  readonly created: number;
  readonly currency?: string;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly description?: string | null;
  readonly excluded_payment_method_types?: ReadonlyArray<
    | "acss_debit"
    | "affirm"
    | "afterpay_clearpay"
    | "alipay"
    | "alma"
    | "amazon_pay"
    | "au_becs_debit"
    | "bacs_debit"
    | "bancontact"
    | "billie"
    | "bizum"
    | "blik"
    | "boleto"
    | "card"
    | "cashapp"
    | "crypto"
    | "customer_balance"
    | "eps"
    | "fpx"
    | "giropay"
    | "grabpay"
    | "ideal"
    | "kakao_pay"
    | "klarna"
    | "konbini"
    | "kr_card"
    | "mb_way"
    | "mobilepay"
    | "multibanco"
    | "naver_pay"
    | "nz_bank_account"
    | "oxxo"
    | "p24"
    | "pay_by_bank"
    | "payco"
    | "paynow"
    | "paypal"
    | "paypay"
    | "payto"
    | "pix"
    | "promptpay"
    | "revolut_pay"
    | "samsung_pay"
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
  readonly hooks?: Stripepayment_flows_payment_intent_async_workflows;
  readonly id: string;
  readonly last_payment_error?: Stripeapi_errors | null;
  readonly latest_charge?: string | Stripecharge | null;
  readonly livemode: boolean;
  readonly managed_payments?: Stripesmor_resource_managed_payments | null;
  readonly metadata?: { readonly [x: string]: string };
  readonly next_action?: Stripepayment_intent_next_action | null;
  readonly object: "payment_intent";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly payment_details?: Stripepayment_flows_payment_details;
  readonly payment_method?: string | Stripepayment_method | null;
  readonly payment_method_configuration_details?: Stripepayment_method_config_biz_payment_method_configuration_details | null;
  readonly payment_method_options?: Stripepayment_intent_payment_method_options | null;
  readonly payment_method_types?: ReadonlyArray<string>;
  readonly payment_record?: string | Stripepayment_record | null;
  readonly presentment_details?: Stripepayment_flows_payment_intent_presentment_details;
  readonly processing?: Stripepayment_intent_processing | null;
  readonly receipt_email?: string | null;
  readonly review?: string | Stripereview | null;
  readonly setup_future_usage?: "off_session" | "on_session" | null;
  readonly shipping?: Stripeshipping | null;
  readonly statement_descriptor?: string | null;
  readonly statement_descriptor_suffix?: string | null;
  readonly status:
    | "canceled"
    | "processing"
    | "requires_action"
    | "requires_capture"
    | "requires_confirmation"
    | "requires_payment_method"
    | "succeeded";
  readonly transfer_data?: Stripetransfer_data | null;
  readonly transfer_group?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_alipay_handle_redirect = {
  readonly native_data?: string | null;
  readonly native_url?: string | null;
  readonly return_url?: string | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_blik_authorize = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_intent_next_action_boleto = {
  readonly expires_at?: number | null;
  readonly hosted_voucher_url?: string | null;
  readonly number?: string | null;
  readonly pdf?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_card_await_notification = {
  readonly charge_attempt_at?: number | null;
  readonly customer_approval_required?: boolean | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_cashapp_qr_code = {
  readonly expires_at: number;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_klarna_display_qr_code = {
  readonly data: string;
  readonly expires_at?: number | null;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_konbini_familymart = {
  readonly confirmation_number?: string;
  readonly payment_code: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_konbini_lawson = {
  readonly confirmation_number?: string;
  readonly payment_code: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_konbini_ministop = {
  readonly confirmation_number?: string;
  readonly payment_code: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_konbini_seicomart = {
  readonly confirmation_number?: string;
  readonly payment_code: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_display_multibanco_details = {
  readonly entity?: string | null;
  readonly expires_at?: number | null;
  readonly hosted_voucher_url?: string | null;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_display_oxxo_details = {
  readonly expires_after?: number | null;
  readonly hosted_voucher_url?: string | null;
  readonly number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_paynow_display_qr_code = {
  readonly data: string;
  readonly hosted_instructions_url?: string | null;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_pix_display_qr_code = {
  readonly data?: string;
  readonly expires_at?: number;
  readonly hosted_instructions_url?: string;
  readonly image_url_png?: string;
  readonly image_url_svg?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_promptpay_display_qr_code = {
  readonly data: string;
  readonly hosted_instructions_url: string;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_redirect_to_url = {
  readonly return_url?: string | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_swish_qr_code = {
  readonly data: string;
  readonly expires_at: number;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_upiqr_code = {
  readonly expires_at: number;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_verify_with_microdeposits = {
  readonly arrival_date: number;
  readonly hosted_verification_url: string;
  readonly microdeposit_type?: "amounts" | "descriptor_code" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_wechat_pay_display_qr_code = {
  readonly data: string;
  readonly hosted_instructions_url: string;
  readonly image_data_url: string;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_wechat_pay_redirect_to_android_app =
  {
    readonly app_id: string;
    readonly nonce_str: string;
    readonly package: string;
    readonly partner_id: string;
    readonly prepay_id: string;
    readonly sign: string;
    readonly timestamp: string;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_wechat_pay_redirect_to_ios_app = {
  readonly native_url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_mandate_options_acss_debit =
  {
    readonly custom_mandate_url?: string;
    readonly interval_description?: string | null;
    readonly payment_schedule?: "combined" | "interval" | "sporadic" | null;
    readonly transaction_type?: "business" | "personal" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_mandate_options_payto =
  {
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
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_au_becs_debit = {
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_mandate_options_bacs_debit =
  { readonly reference_prefix?: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_intent_payment_method_options_mandate_options_blik = {
  readonly expires_at?: number | null;
  readonly type?: "off_session" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_eps = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_link = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_mobilepay = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_nz_bank_account = {
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_mandate_options_sepa_debit =
  { readonly reference_prefix?: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_intent_payment_method_options_swish = {
  readonly reference?: string | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_processing_customer_notification = {
  readonly approval_requested?: boolean | null;
  readonly completes_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code =
  {
    readonly hosted_instructions_url: string;
    readonly mobile_auth_url: string;
    readonly qr_code: Stripepayment_intent_next_action_cashapp_qr_code;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_konbini_stores = {
  readonly familymart?: Stripepayment_intent_next_action_konbini_familymart | null;
  readonly lawson?: Stripepayment_intent_next_action_konbini_lawson | null;
  readonly ministop?: Stripepayment_intent_next_action_konbini_ministop | null;
  readonly seicomart?: Stripepayment_intent_next_action_konbini_seicomart | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_swish_handle_redirect_or_display_qr_code =
  {
    readonly hosted_instructions_url: string;
    readonly qr_code: Stripepayment_intent_next_action_swish_qr_code;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code =
  {
    readonly hosted_instructions_url: string;
    readonly qr_code: Stripepayment_intent_next_action_upiqr_code;
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_acss_debit = {
  readonly mandate_options?: Stripepayment_intent_payment_method_options_mandate_options_acss_debit;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_payto = {
  readonly mandate_options?: Stripepayment_intent_payment_method_options_mandate_options_payto;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_bacs_debit = {
  readonly mandate_options?: Stripepayment_intent_payment_method_options_mandate_options_bacs_debit;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_blik = {
  readonly mandate_options?: Stripepayment_intent_payment_method_options_mandate_options_blik;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_sepa_debit = {
  readonly mandate_options?: Stripepayment_intent_payment_method_options_mandate_options_sepa_debit;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_card_processing = {
  readonly customer_notification?: Stripepayment_intent_processing_customer_notification;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_amount_details_line_item = {
  readonly discount_amount?: number | null;
  readonly id: string;
  readonly object: "payment_intent_amount_details_line_item";
  readonly payment_method_options?: Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_payment_method_options | null;
  readonly product_code?: string | null;
  readonly product_name: string;
  readonly quantity: number;
  readonly tax?: Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_tax | null;
  readonly unit_cost: number;
  readonly unit_of_measure?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_type_specific_payment_method_options_client = {
  readonly capture_method?: "automatic_delayed" | "manual" | "manual_preferred";
  readonly installments?: Stripepayment_flows_installment_options;
  readonly mandate_options?: Stripepayment_intent_payment_method_options_mandate_options_payto;
  readonly request_incremental_authorization_support?: boolean;
  readonly require_cvc_recollection?: boolean;
  readonly routing?: Stripepayment_method_options_card_present_routing;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_card = {
  readonly capture_method?: "manual";
  readonly installments?: Stripepayment_method_options_card_installments | null;
  readonly mandate_options?: Stripepayment_method_options_card_mandate_options | null;
  readonly network?:
    | "amex"
    | "cartes_bancaires"
    | "diners"
    | "discover"
    | "eftpos_au"
    | "girocard"
    | "interac"
    | "jcb"
    | "link"
    | "mastercard"
    | "unionpay"
    | "unknown"
    | "visa"
    | null;
  readonly request_extended_authorization?: "if_available" | "never";
  readonly request_incremental_authorization?: "if_available" | "never";
  readonly request_multicapture?: "if_available" | "never";
  readonly request_overcapture?: "if_available" | "never";
  readonly request_three_d_secure?: "any" | "automatic" | "challenge" | null;
  readonly require_cvc_recollection?: boolean;
  readonly setup_credential_usage?: "installment" | "recurring" | "unscheduled";
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly statement_descriptor_suffix_kana?: string;
  readonly statement_descriptor_suffix_kanji?: string;
  readonly stored_credential_usage?:
    | "installment"
    | "recurring"
    | "unscheduled";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_konbini = {
  readonly expires_at: number;
  readonly hosted_voucher_url?: string | null;
  readonly stores: Stripepayment_intent_next_action_konbini_stores;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options_us_bank_account = {
  readonly financial_connections?: Stripelinked_account_options_common;
  readonly mandate_options?: Stripepayment_method_options_us_bank_account_mandate_options;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
  readonly target_date?: string;
  readonly transaction_purpose?: "goods" | "other" | "services" | "unspecified";
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_processing = {
  readonly card?: Stripepayment_intent_card_processing;
  readonly type: "card";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action_display_bank_transfer_instructions =
  {
    readonly amount_remaining?: number | null;
    readonly currency?: string | null;
    readonly financial_addresses?: ReadonlyArray<Stripefunding_instructions_bank_transfer_financial_address>;
    readonly hosted_instructions_url?: string | null;
    readonly reference?: string | null;
    readonly type:
      | "eu_bank_transfer"
      | "gb_bank_transfer"
      | "jp_bank_transfer"
      | "mx_bank_transfer"
      | "us_bank_transfer";
  } & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_payment_method_options = {
  readonly acss_debit?:
    | Stripepayment_intent_payment_method_options_acss_debit
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly affirm?:
    | Stripepayment_method_options_affirm
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly afterpay_clearpay?:
    | Stripepayment_method_options_afterpay_clearpay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly alipay?:
    | Stripepayment_method_options_alipay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly alma?:
    | Stripepayment_method_options_alma
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly amazon_pay?:
    | Stripepayment_method_options_amazon_pay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly au_becs_debit?:
    | Stripepayment_intent_payment_method_options_au_becs_debit
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly bacs_debit?:
    | Stripepayment_intent_payment_method_options_bacs_debit
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly bancontact?:
    | Stripepayment_method_options_bancontact
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly billie?:
    | Stripepayment_method_options_billie
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly bizum?:
    | Stripepayment_method_options_bizum
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly blik?:
    | Stripepayment_intent_payment_method_options_blik
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly boleto?:
    | Stripepayment_method_options_boleto
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly card?:
    | Stripepayment_intent_payment_method_options_card
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly card_present?:
    | Stripepayment_method_options_card_present
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly cashapp?:
    | Stripepayment_method_options_cashapp
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly crypto?:
    | Stripepayment_method_options_crypto
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly customer_balance?:
    | Stripepayment_method_options_customer_balance
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly eps?:
    | Stripepayment_intent_payment_method_options_eps
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly fpx?:
    | Stripepayment_method_options_fpx
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly giropay?:
    | Stripepayment_method_options_giropay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly grabpay?:
    | Stripepayment_method_options_grabpay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly ideal?:
    | Stripepayment_method_options_ideal
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly interac_present?:
    | Stripepayment_method_options_interac_present
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly kakao_pay?:
    | Stripepayment_flows_private_payment_methods_kakao_pay_payment_method_options
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly klarna?:
    | Stripepayment_method_options_klarna
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly konbini?:
    | Stripepayment_method_options_konbini
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly kr_card?:
    | Stripepayment_method_options_kr_card
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly link?:
    | Stripepayment_intent_payment_method_options_link
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly mb_way?:
    | Stripepayment_method_options_mb_way
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly mobilepay?:
    | Stripepayment_intent_payment_method_options_mobilepay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly multibanco?:
    | Stripepayment_method_options_multibanco
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly naver_pay?:
    | Stripepayment_flows_private_payment_methods_naver_pay_payment_method_options
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly nz_bank_account?:
    | Stripepayment_intent_payment_method_options_nz_bank_account
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly oxxo?:
    | Stripepayment_method_options_oxxo
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly p24?:
    | Stripepayment_method_options_p24
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly pay_by_bank?:
    | Stripepayment_method_options_pay_by_bank
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly payco?:
    | Stripepayment_flows_private_payment_methods_payco_payment_method_options
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly paynow?:
    | Stripepayment_method_options_paynow
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly paypal?:
    | Stripepayment_method_options_paypal
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly paypay?:
    | Stripepayment_method_options_paypay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly payto?:
    | Stripepayment_intent_payment_method_options_payto
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly pix?:
    | Stripepayment_method_options_pix
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly promptpay?:
    | Stripepayment_method_options_promptpay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly revolut_pay?:
    | Stripepayment_method_options_revolut_pay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly samsung_pay?:
    | Stripepayment_flows_private_payment_methods_samsung_pay_payment_method_options
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly satispay?:
    | Stripepayment_method_options_satispay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly scalapay?:
    | Stripepayment_method_options_scalapay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly sepa_debit?:
    | Stripepayment_intent_payment_method_options_sepa_debit
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly sequra?:
    | Stripepayment_method_options_sequra
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly sofort?:
    | Stripepayment_method_options_sofort
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly sunbit?:
    | Stripepayment_method_options_sunbit
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly swish?:
    | Stripepayment_intent_payment_method_options_swish
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly twint?:
    | Stripepayment_method_options_twint
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly upi?:
    | Stripepayment_method_options_upi
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly us_bank_account?:
    | Stripepayment_intent_payment_method_options_us_bank_account
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly wechat_pay?:
    | Stripepayment_method_options_wechat_pay
    | Stripepayment_intent_type_specific_payment_method_options_client;
  readonly zip?:
    | Stripepayment_method_options_zip
    | Stripepayment_intent_type_specific_payment_method_options_client;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_intent_next_action = {
  readonly alipay_handle_redirect?: Stripepayment_intent_next_action_alipay_handle_redirect;
  readonly blik_authorize?: Stripepayment_intent_next_action_blik_authorize;
  readonly boleto_display_details?: Stripepayment_intent_next_action_boleto;
  readonly card_await_notification?: Stripepayment_intent_next_action_card_await_notification;
  readonly cashapp_handle_redirect_or_display_qr_code?: Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code;
  readonly display_bank_transfer_instructions?: Stripepayment_intent_next_action_display_bank_transfer_instructions;
  readonly klarna_display_qr_code?: Stripepayment_intent_next_action_klarna_display_qr_code;
  readonly konbini_display_details?: Stripepayment_intent_next_action_konbini;
  readonly multibanco_display_details?: Stripepayment_intent_next_action_display_multibanco_details;
  readonly oxxo_display_details?: Stripepayment_intent_next_action_display_oxxo_details;
  readonly paynow_display_qr_code?: Stripepayment_intent_next_action_paynow_display_qr_code;
  readonly pix_display_qr_code?: Stripepayment_intent_next_action_pix_display_qr_code;
  readonly promptpay_display_qr_code?: Stripepayment_intent_next_action_promptpay_display_qr_code;
  readonly redirect_to_url?: Stripepayment_intent_next_action_redirect_to_url;
  readonly swish_handle_redirect_or_display_qr_code?: Stripepayment_intent_next_action_swish_handle_redirect_or_display_qr_code;
  readonly type: string;
  readonly upi_handle_redirect_or_display_qr_code?: Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code;
  readonly use_stripe_sdk?: { readonly [x: string]: Schema.Json };
  readonly verify_with_microdeposits?: Stripepayment_intent_next_action_verify_with_microdeposits;
  readonly wechat_pay_display_qr_code?: Stripepayment_intent_next_action_wechat_pay_display_qr_code;
  readonly wechat_pay_redirect_to_android_app?: Stripepayment_intent_next_action_wechat_pay_redirect_to_android_app;
  readonly wechat_pay_redirect_to_ios_app?: Stripepayment_intent_next_action_wechat_pay_redirect_to_ios_app;
} & { readonly [x: string]: Schema.Json };

export const Stripepayment_intent = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent> =>
    Schema.StructWithRest(
      Schema.Struct({
        allowed_payment_method_types: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "acss_debit",
                "affirm",
                "afterpay_clearpay",
                "alipay",
                "alma",
                "amazon_pay",
                "au_becs_debit",
                "bacs_debit",
                "bancontact",
                "billie",
                "bizum",
                "blik",
                "boku_promptpay",
                "boleto",
                "capchase_pay",
                "card",
                "card_present",
                "cashapp",
                "check_scan",
                "click_to_pay",
                "crypto",
                "customer_balance",
                "demo_pay",
                "duitnow",
                "dummy_auth_push",
                "dummy_passthrough_card",
                "edenred",
                "eps",
                "fpx",
                "gcash",
                "getbalance",
                "gift_card",
                "giropay",
                "gopay",
                "grabpay",
                "id_bank_transfer",
                "ideal",
                "interac_present",
                "kakao_pay",
                "klarna",
                "knet",
                "konbini",
                "kr_card",
                "kr_market",
                "kriya",
                "link",
                "mb_way",
                "mobilepay",
                "momo",
                "mondu",
                "multibanco",
                "naver_pay",
                "netbanking",
                "ng_bank",
                "ng_bank_transfer",
                "ng_card",
                "ng_market",
                "ng_ussd",
                "ng_wallet",
                "nz_bank_account",
                "octopus",
                "oxxo",
                "p24",
                "paper_check",
                "pay_by_bank",
                "payco",
                "paynow",
                "paypal",
                "paypay",
                "payto",
                "pix",
                "promptpay",
                "qris",
                "rechnung",
                "revolut_pay",
                "samsung_pay",
                "satispay",
                "scalapay",
                "sepa_debit",
                "sequra",
                "shop_pay",
                "shopeepay",
                "sofort",
                "south_korea_market",
                "stripe_balance",
                "sunbit",
                "swish",
                "tamara",
                "test_pay",
                "touch_n_go",
                "truemoney",
                "twint",
                "upi",
                "us_bank_account",
                "us_cash_voucher",
                "vipps",
                "wechat_pay",
                "wero",
                "zip",
              ]),
            ).annotate({
              description:
                "The list of payment method types allowed for use with this payment. Stripe automatically returns compatible payment methods from this list in the `payment_method_types` field of the response, based on the other PaymentIntent parameters, such as `currency`, `amount`, and `customer`.",
            }),
            Schema.Null,
          ]),
        ),
        amount: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        amount_capturable: Schema.optionalKey(
          Schema.Number.annotate({
            description: "Amount that can be captured from this PaymentIntent.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        amount_details: Schema.optionalKey(
          Schema.Union([
            Stripepayment_flows_amount_details,
            Stripepayment_flows_amount_details_client,
          ]),
        ),
        amount_received: Schema.optionalKey(
          Schema.Number.annotate({
            description: "Amount that this PaymentIntent collects.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        application: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeapplication,
            ]).annotate({
              description:
                "ID of the Connect application that created the PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        application_fee_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account. The amount of the application fee collected will be capped at the total amount captured. For more information, see the PaymentIntents [use case for connected accounts](https://docs.stripe.com/payments/connected-accounts).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        automatic_payment_methods: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_flows_automatic_payment_methods_payment_intent,
            ]).annotate({
              description:
                "Settings to configure compatible payment methods from the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods)",
            }),
            Schema.Null,
          ]),
        ),
        canceled_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Populated when `status` is `canceled`, this is the time at which the PaymentIntent was canceled. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        cancellation_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "abandoned",
              "automatic",
              "duplicate",
              "expired",
              "failed_invoice",
              "fraudulent",
              "requested_by_customer",
              "void_invoice",
            ]).annotate({
              description:
                "Reason for cancellation of this PaymentIntent, either user-provided (`duplicate`, `fraudulent`, `requested_by_customer`, or `abandoned`) or generated by Stripe internally (`failed_invoice`, `void_invoice`, `automatic`, or `expired`).",
            }),
            Schema.Null,
          ]),
        ),
        capture_method: Schema.optionalKey(
          Schema.Literals(["automatic", "automatic_async", "manual"]).annotate({
            description:
              "Controls when the funds will be captured from the customer's account.",
          }),
        ),
        client_secret: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The client secret of this PaymentIntent. Used for client-side retrieval using a publishable key. \n\nThe client secret can be used to complete a payment from your frontend. It should not be stored, logged, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.\n\nRefer to our docs to [accept a payment](https://docs.stripe.com/payments/accept-a-payment?ui=elements) and learn about how `client_secret` should be handled.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        confirmation_method: Schema.optionalKey(
          Schema.Literals(["automatic", "manual"]).annotate({
            description:
              "Describes whether we can confirm this PaymentIntent automatically, or if it requires customer action to confirm the payment.",
          }),
        ),
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
                "ID of the Customer this PaymentIntent belongs to, if one exists.\n\nPayment methods attached to other Customers cannot be used with this PaymentIntent.\n\nIf [setup_future_usage](https://docs.stripe.com/api#payment_intent_object-setup_future_usage) is set and this PaymentIntent's payment method is not `card_present`, then the payment method attaches to the Customer after the PaymentIntent has been confirmed and any required actions from the user are complete. If the payment method is `card_present` and isn't a digital wallet, then a [generated_card](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card is created and attached to the Customer instead.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the Account representing the customer that this PaymentIntent belongs to, if one exists.\n\nPayment methods attached to other Accounts cannot be used with this PaymentIntent.\n\nIf [setup_future_usage](https://docs.stripe.com/api#payment_intent_object-setup_future_usage) is set and this PaymentIntent's payment method is not `card_present`, then the payment method attaches to the Account after the PaymentIntent has been confirmed and any required actions from the user are complete. If the payment method is `card_present` and isn't a digital wallet, then a [generated_card](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card is created and attached to the Account instead.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
        excluded_payment_method_types: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "acss_debit",
                "affirm",
                "afterpay_clearpay",
                "alipay",
                "alma",
                "amazon_pay",
                "au_becs_debit",
                "bacs_debit",
                "bancontact",
                "billie",
                "bizum",
                "blik",
                "boleto",
                "card",
                "cashapp",
                "crypto",
                "customer_balance",
                "eps",
                "fpx",
                "giropay",
                "grabpay",
                "ideal",
                "kakao_pay",
                "klarna",
                "konbini",
                "kr_card",
                "mb_way",
                "mobilepay",
                "multibanco",
                "naver_pay",
                "nz_bank_account",
                "oxxo",
                "p24",
                "pay_by_bank",
                "payco",
                "paynow",
                "paypal",
                "paypay",
                "payto",
                "pix",
                "promptpay",
                "revolut_pay",
                "samsung_pay",
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
                "The list of payment method types to exclude from use with this payment.",
            }),
            Schema.Null,
          ]),
        ),
        hooks: Schema.optionalKey(
          Stripepayment_flows_payment_intent_async_workflows,
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last_payment_error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripeapi_errors> => Stripeapi_errors,
              ),
            ]).annotate({
              description:
                "The payment error encountered in the previous PaymentIntent confirmation. It will be cleared if the PaymentIntent is later updated for any reason.",
            }),
            Schema.Null,
          ]),
        ),
        latest_charge: Schema.optionalKey(
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
                "ID of the latest [Charge object](https://docs.stripe.com/api/charges) created by this PaymentIntent. This property is `null` until PaymentIntent confirmation is attempted.",
            }),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        managed_payments: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesmor_resource_managed_payments]).annotate({
              description: "Settings for Managed Payments.",
            }),
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
              "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Learn more about [storing information in metadata](https://docs.stripe.com/payments/payment-intents/creating-payment-intents#storing-information-in-metadata).",
          }),
        ),
        next_action: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_intent_next_action]).annotate({
              description:
                "If present, this property tells you what actions you need to take in order for your customer to fulfill a payment using the provided source.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("payment_intent").annotate({
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
                "You can specify the settlement merchant as the\nconnected account using the `on_behalf_of` attribute on the charge. See the PaymentIntents [use case for connected accounts](/payments/connected-accounts) for details.",
            }),
            Schema.Null,
          ]),
        ),
        payment_details: Schema.optionalKey(
          Stripepayment_flows_payment_details,
        ),
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
                "ID of the payment method used in this PaymentIntent.",
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
                "Information about the [payment method configuration](https://docs.stripe.com/api/payment_method_configurations) used for this PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_intent_payment_method_options,
            ]).annotate({
              description:
                "Payment-method-specific configuration for this PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_types: Schema.optionalKey(
          Schema.Array(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ).annotate({
            description:
              "The list of payment method types (e.g. card) that this PaymentIntent is allowed to use. A comprehensive list of valid payment method types can be found [here](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type).",
          }),
        ),
        payment_record: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepayment_record> => Stripepayment_record,
              ),
            ]).annotate({
              description:
                "ID of the [Payment Record object](https://docs.stripe.com/api/payment-record) created by this PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        presentment_details: Schema.optionalKey(
          Stripepayment_flows_payment_intent_presentment_details,
        ),
        processing: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_intent_processing]).annotate({
              description:
                "If present, this property tells you about the processing state of the payment.",
            }),
            Schema.Null,
          ]),
        ),
        receipt_email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Email address that the receipt for the resulting payment will be sent to. If `receipt_email` is specified for a payment in live mode, a receipt will be sent regardless of your [email settings](https://dashboard.stripe.com/account/emails).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        review: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripereview> => Stripereview),
            ]).annotate({
              description:
                "ID of the review associated with this PaymentIntent, if any.",
            }),
            Schema.Null,
          ]),
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["off_session", "on_session"]).annotate({
              description:
                "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
            }),
            Schema.Null,
          ]),
        ),
        shipping: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeshipping]).annotate({
              description: "Shipping information for this PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Text that appears on the customer's statement as the statement descriptor for a non-card charge. This value overrides the account's default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors).\n\nSetting this value for a card charge returns an error. For card charges, set the [statement_descriptor_suffix](https://docs.stripe.com/get-started/account/statement-descriptors#dynamic) instead.",
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
                "Provides information about a card charge. Concatenated to the account's [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer's statement.",
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
          "processing",
          "requires_action",
          "requires_capture",
          "requires_confirmation",
          "requires_payment_method",
          "succeeded",
        ]).annotate({
          description:
            "Status of this PaymentIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `requires_capture`, `canceled`, or `succeeded`. Read more about each PaymentIntent [status](https://docs.stripe.com/payments/intents#intent-statuses).",
        }),
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetransfer_data]).annotate({
              description:
                "The data that automatically creates a Transfer after the payment finalizes. Learn more about the [use case for connected accounts](https://docs.stripe.com/payments/connected-accounts).",
            }),
            Schema.Null,
          ]),
        ),
        transfer_group: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A string that identifies the resulting payment as part of a group. Learn more about the [use case for connected accounts](https://docs.stripe.com/connect/separate-charges-and-transfers).",
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
      title: "PaymentIntent",
      description:
        "A PaymentIntent guides you through the process of collecting a payment from your customer.\nWe recommend that you create exactly one PaymentIntent for each order or\ncustomer session in your system. You can reference the PaymentIntent later to\nsee the history of payment attempts for a particular session.\n\nA PaymentIntent transitions through\n[multiple statuses](/payments/paymentintents/lifecycle)\nthroughout its lifetime as it interfaces with Stripe.js to perform\nauthentication flows and ultimately creates at most one successful charge.\n\nRelated guide: [Payment Intents API](https://docs.stripe.com/payments/payment-intents)",
      identifier: "Stripepayment_intent",
    }),
);
export const Stripepayment_intent_next_action_alipay_handle_redirect =
  Schema.StructWithRest(
    Schema.Struct({
      native_data: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The native data to be used with Alipay SDK you must redirect your customer to in order to authenticate the payment in an Android App.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      native_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The native URL you must redirect your customer to in order to authenticate the payment in an iOS App.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      return_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.",
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
              "The URL you must redirect your customer to in order to authenticate the payment.",
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
    title: "PaymentIntentNextActionAlipayHandleRedirect",
    description: "",
    identifier: "Stripepayment_intent_next_action_alipay_handle_redirect",
  });
export const Stripepayment_intent_next_action_blik_authorize = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "PaymentIntentNextActionBlikAuthorize",
  description: "",
  identifier: "Stripepayment_intent_next_action_blik_authorize",
});
export const Stripepayment_intent_next_action_boleto = Schema.StructWithRest(
  Schema.Struct({
    expires_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The timestamp after which the boleto expires.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    hosted_voucher_url: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The URL to the hosted boleto voucher page, which allows customers to view the boleto voucher.",
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
        Schema.String.annotate({ description: "The boleto number." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    pdf: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The URL to the downloadable boleto voucher PDF.",
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
  title: "payment_intent_next_action_boleto",
  description: "",
  identifier: "Stripepayment_intent_next_action_boleto",
});
export const Stripepayment_intent_next_action_card_await_notification =
  Schema.StructWithRest(
    Schema.Struct({
      charge_attempt_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The time that payment will be attempted. If customer approval is required, they need to provide approval before this time.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      customer_approval_required: Schema.optionalKey(
        Schema.Union([
          Schema.Boolean.annotate({
            description:
              "For payments greater than INR 15000, the customer must provide explicit approval of the payment with their bank. For payments of lower amount, no customer action is required.",
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
    title: "PaymentIntentNextActionCardAwaitNotification",
    description: "",
    identifier: "Stripepayment_intent_next_action_card_await_notification",
  });
export const Stripepayment_intent_next_action_cashapp_qr_code =
  Schema.StructWithRest(
    Schema.Struct({
      expires_at: Schema.Number.annotate({
        description: "The date (unix timestamp) when the QR code expires.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      image_url_png: Schema.String.annotate({
        description: "The image_url_png string used to render QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description: "The image_url_svg string used to render QR code",
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
    title: "PaymentIntentNextActionCashappQRCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_cashapp_qr_code",
  });
export const Stripepayment_intent_next_action_klarna_display_qr_code =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.String.annotate({
        description: "The data being used to generate QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      expires_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The timestamp at which the QR code expires.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      image_url_png: Schema.String.annotate({
        description: "The image_url_png string used to render QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description: "The image_url_svg string used to render QR code",
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
    title: "PaymentIntentNextActionKlarnaDisplayQrCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_klarna_display_qr_code",
  });
export const Stripepayment_intent_next_action_konbini_familymart =
  Schema.StructWithRest(
    Schema.Struct({
      confirmation_number: Schema.optionalKey(
        Schema.String.annotate({
          description: "The confirmation number.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      payment_code: Schema.String.annotate({
        description: "The payment code.",
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
    title: "payment_intent_next_action_konbini_familymart",
    description: "",
    identifier: "Stripepayment_intent_next_action_konbini_familymart",
  });
export const Stripepayment_intent_next_action_konbini_lawson =
  Schema.StructWithRest(
    Schema.Struct({
      confirmation_number: Schema.optionalKey(
        Schema.String.annotate({
          description: "The confirmation number.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      payment_code: Schema.String.annotate({
        description: "The payment code.",
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
    title: "payment_intent_next_action_konbini_lawson",
    description: "",
    identifier: "Stripepayment_intent_next_action_konbini_lawson",
  });
export const Stripepayment_intent_next_action_konbini_ministop =
  Schema.StructWithRest(
    Schema.Struct({
      confirmation_number: Schema.optionalKey(
        Schema.String.annotate({
          description: "The confirmation number.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      payment_code: Schema.String.annotate({
        description: "The payment code.",
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
    title: "payment_intent_next_action_konbini_ministop",
    description: "",
    identifier: "Stripepayment_intent_next_action_konbini_ministop",
  });
export const Stripepayment_intent_next_action_konbini_seicomart =
  Schema.StructWithRest(
    Schema.Struct({
      confirmation_number: Schema.optionalKey(
        Schema.String.annotate({
          description: "The confirmation number.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      payment_code: Schema.String.annotate({
        description: "The payment code.",
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
    title: "payment_intent_next_action_konbini_seicomart",
    description: "",
    identifier: "Stripepayment_intent_next_action_konbini_seicomart",
  });
export const Stripepayment_intent_next_action_display_multibanco_details =
  Schema.StructWithRest(
    Schema.Struct({
      entity: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Entity number associated with this Multibanco payment.",
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
              "The timestamp at which the Multibanco voucher expires.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      hosted_voucher_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The URL for the hosted Multibanco voucher page, which allows customers to view a Multibanco voucher.",
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
              "Reference number associated with this Multibanco payment.",
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
    title: "PaymentIntentNextActionDisplayMultibancoDetails",
    description: "",
    identifier: "Stripepayment_intent_next_action_display_multibanco_details",
  });
export const Stripepayment_intent_next_action_display_oxxo_details =
  Schema.StructWithRest(
    Schema.Struct({
      expires_after: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The timestamp after which the OXXO voucher expires.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      hosted_voucher_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The URL for the hosted OXXO voucher page, which allows customers to view and print an OXXO voucher.",
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
            description: "OXXO reference number.",
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
    title: "PaymentIntentNextActionDisplayOxxoDetails",
    description: "",
    identifier: "Stripepayment_intent_next_action_display_oxxo_details",
  });
export const Stripepayment_intent_next_action_paynow_display_qr_code =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.String.annotate({
        description:
          "The raw data string used to generate QR code, it should be used together with QR code library.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      hosted_instructions_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The URL to the hosted PayNow instructions page, which allows customers to view the PayNow QR code.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      image_url_png: Schema.String.annotate({
        description: "The image_url_png string used to render QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description: "The image_url_svg string used to render QR code",
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
    title: "PaymentIntentNextActionPaynowDisplayQrCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_paynow_display_qr_code",
  });
export const Stripepayment_intent_next_action_pix_display_qr_code =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The raw data string used to generate QR code, it should be used together with QR code library.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      expires_at: Schema.optionalKey(
        Schema.Number.annotate({
          description: "The date (unix timestamp) when the PIX expires.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      hosted_instructions_url: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The URL to the hosted pix instructions page, which allows customers to view the pix QR code.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      image_url_png: Schema.optionalKey(
        Schema.String.annotate({
          description: "The image_url_png string used to render png QR code",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      image_url_svg: Schema.optionalKey(
        Schema.String.annotate({
          description: "The image_url_svg string used to render svg QR code",
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
    title: "PaymentIntentNextActionPixDisplayQrCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_pix_display_qr_code",
  });
export const Stripepayment_intent_next_action_promptpay_display_qr_code =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.String.annotate({
        description:
          "The raw data string used to generate QR code, it should be used together with QR code library.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      hosted_instructions_url: Schema.String.annotate({
        description:
          "The URL to the hosted PromptPay instructions page, which allows customers to view the PromptPay QR code.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_png: Schema.String.annotate({
        description:
          "The PNG path used to render the QR code, can be used as the source in an HTML img tag",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description:
          "The SVG path used to render the QR code, can be used as the source in an HTML img tag",
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
    title: "PaymentIntentNextActionPromptpayDisplayQrCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_promptpay_display_qr_code",
  });
export const Stripepayment_intent_next_action_redirect_to_url =
  Schema.StructWithRest(
    Schema.Struct({
      return_url: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.",
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
              "The URL you must redirect your customer to in order to authenticate the payment.",
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
    title: "PaymentIntentNextActionRedirectToUrl",
    description: "",
    identifier: "Stripepayment_intent_next_action_redirect_to_url",
  });
export const Stripepayment_intent_next_action_swish_qr_code =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.String.annotate({
        description:
          "The raw data string used to generate QR code, it should be used together with QR code library.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      expires_at: Schema.Number.annotate({
        description: "The timestamp at which the QR code expires.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      image_url_png: Schema.String.annotate({
        description: "The image_url_png string used to render QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description: "The image_url_svg string used to render QR code",
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
    title: "PaymentIntentNextActionSwishQRCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_swish_qr_code",
  });
export const Stripepayment_intent_next_action_upiqr_code =
  Schema.StructWithRest(
    Schema.Struct({
      expires_at: Schema.Number.annotate({
        description: "The date (unix timestamp) when the QR code expires.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      image_url_png: Schema.String.annotate({
        description: "The image_url_png string used to render QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description: "The image_url_svg string used to render QR code",
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
    title: "PaymentIntentNextActionUPIQRCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_upiqr_code",
  });
export const Stripepayment_intent_next_action_verify_with_microdeposits =
  Schema.StructWithRest(
    Schema.Struct({
      arrival_date: Schema.Number.annotate({
        description:
          "The timestamp when the microdeposits are expected to land.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      hosted_verification_url: Schema.String.annotate({
        description:
          "The URL for the hosted verification page, which allows customers to verify their bank account.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      microdeposit_type: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["amounts", "descriptor_code"]).annotate({
            description:
              "The type of the microdeposit sent to the customer. Used to distinguish between different verification methods.",
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
    title: "PaymentIntentNextActionVerifyWithMicrodeposits",
    description: "",
    identifier: "Stripepayment_intent_next_action_verify_with_microdeposits",
  });
export const Stripepayment_intent_next_action_wechat_pay_display_qr_code =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.String.annotate({
        description: "The data being used to generate QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      hosted_instructions_url: Schema.String.annotate({
        description:
          "The URL to the hosted WeChat Pay instructions page, which allows customers to view the WeChat Pay QR code.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_data_url: Schema.String.annotate({
        description: "The base64 image data for a pre-generated QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_png: Schema.String.annotate({
        description: "The image_url_png string used to render QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description: "The image_url_svg string used to render QR code",
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
    title: "PaymentIntentNextActionWechatPayDisplayQrCode",
    description: "",
    identifier: "Stripepayment_intent_next_action_wechat_pay_display_qr_code",
  });
export const Stripepayment_intent_next_action_wechat_pay_redirect_to_android_app =
  Schema.StructWithRest(
    Schema.Struct({
      app_id: Schema.String.annotate({
        description: "app_id is the APP ID registered on WeChat open platform",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      nonce_str: Schema.String.annotate({
        description: "nonce_str is a random string",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      package: Schema.String.annotate({
        description: "package is static value",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      partner_id: Schema.String.annotate({
        description: "an unique merchant ID assigned by WeChat Pay",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      prepay_id: Schema.String.annotate({
        description: "an unique trading ID assigned by WeChat Pay",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      sign: Schema.String.annotate({ description: "A signature" }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      timestamp: Schema.String.annotate({
        description: "Specifies the current time in epoch format",
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
    title: "PaymentIntentNextActionWechatPayRedirectToAndroidApp",
    description: "",
    identifier:
      "Stripepayment_intent_next_action_wechat_pay_redirect_to_android_app",
  });
export const Stripepayment_intent_next_action_wechat_pay_redirect_to_ios_app =
  Schema.StructWithRest(
    Schema.Struct({
      native_url: Schema.String.annotate({
        description: "An universal link that redirect to WeChat Pay app",
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
    title: "PaymentIntentNextActionWechatPayRedirectToIOSApp",
    description: "",
    identifier:
      "Stripepayment_intent_next_action_wechat_pay_redirect_to_ios_app",
  });
export const Stripepayment_intent_payment_method_options_mandate_options_acss_debit =
  Schema.StructWithRest(
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
    title: "payment_intent_payment_method_options_mandate_options_acss_debit",
    description: "",
    identifier:
      "Stripepayment_intent_payment_method_options_mandate_options_acss_debit",
  });
export const Stripepayment_intent_payment_method_options_mandate_options_payto =
  Schema.StructWithRest(
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
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "payment_intent_payment_method_options_mandate_options_payto",
    description: "",
    identifier:
      "Stripepayment_intent_payment_method_options_mandate_options_payto",
  });
export const Stripepayment_intent_payment_method_options_au_becs_debit =
  Schema.StructWithRest(
    Schema.Struct({
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
    title: "payment_intent_payment_method_options_au_becs_debit",
    description: "",
    identifier: "Stripepayment_intent_payment_method_options_au_becs_debit",
  });
export const Stripepayment_intent_payment_method_options_mandate_options_bacs_debit =
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
    title: "payment_intent_payment_method_options_mandate_options_bacs_debit",
    description: "",
    identifier:
      "Stripepayment_intent_payment_method_options_mandate_options_bacs_debit",
  });
export const Stripepayment_intent_payment_method_options_mandate_options_blik =
  Schema.StructWithRest(
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
      type: Schema.optionalKey(
        Schema.Union([
          Schema.Literal("off_session").annotate({
            description: "Type of the mandate.",
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
    title: "payment_intent_payment_method_options_mandate_options_blik",
    description: "",
    identifier:
      "Stripepayment_intent_payment_method_options_mandate_options_blik",
  });
export const Stripepayment_intent_payment_method_options_eps =
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
    title: "payment_intent_payment_method_options_eps",
    description: "",
    identifier: "Stripepayment_intent_payment_method_options_eps",
  });
export const Stripepayment_intent_payment_method_options_link =
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
    title: "payment_intent_payment_method_options_link",
    description: "",
    identifier: "Stripepayment_intent_payment_method_options_link",
  });
export const Stripepayment_intent_payment_method_options_mobilepay =
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
    title: "payment_intent_payment_method_options_mobilepay",
    description: "",
    identifier: "Stripepayment_intent_payment_method_options_mobilepay",
  });
export const Stripepayment_intent_payment_method_options_nz_bank_account =
  Schema.StructWithRest(
    Schema.Struct({
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
    title: "payment_intent_payment_method_options_nz_bank_account",
    description: "",
    identifier: "Stripepayment_intent_payment_method_options_nz_bank_account",
  });
export const Stripepayment_intent_payment_method_options_mandate_options_sepa_debit =
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
    title: "payment_intent_payment_method_options_mandate_options_sepa_debit",
    description: "",
    identifier:
      "Stripepayment_intent_payment_method_options_mandate_options_sepa_debit",
  });
export const Stripepayment_intent_payment_method_options_swish =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A reference for this payment to be displayed in the Swish app.",
          }).check(
            Schema.isMaxCodePoints(35).annotate({
              expected: "a string with at most 35 code points",
            }),
          ),
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
    title: "payment_intent_payment_method_options_swish",
    description: "",
    identifier: "Stripepayment_intent_payment_method_options_swish",
  });
export const Stripepayment_intent_processing_customer_notification =
  Schema.StructWithRest(
    Schema.Struct({
      approval_requested: Schema.optionalKey(
        Schema.Union([
          Schema.Boolean.annotate({
            description:
              "Whether customer approval has been requested for this payment. For payments greater than INR 15000 or mandate amount, the customer must provide explicit approval of the payment with their bank.",
          }),
          Schema.Null,
        ]),
      ),
      completes_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "If customer approval is required, they need to provide approval before this time.",
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
    title: "PaymentIntentProcessingCustomerNotification",
    description: "",
    identifier: "Stripepayment_intent_processing_customer_notification",
  });
export const Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code> =>
      Schema.StructWithRest(
        Schema.Struct({
          hosted_instructions_url: Schema.String.annotate({
            description:
              "The URL to the hosted Cash App Pay instructions page, which allows customers to view the QR code, and supports QR code refreshing on expiration.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          mobile_auth_url: Schema.String.annotate({
            description: "The url for mobile redirect based auth",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          qr_code: Stripepayment_intent_next_action_cashapp_qr_code,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentIntentNextActionCashappHandleRedirectOrDisplayQrCode",
        description: "",
        identifier:
          "Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code",
      }),
  );
export const Stripepayment_intent_next_action_konbini_stores = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_next_action_konbini_stores> =>
    Schema.StructWithRest(
      Schema.Struct({
        familymart: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_intent_next_action_konbini_familymart,
            ]).annotate({ description: "FamilyMart instruction details." }),
            Schema.Null,
          ]),
        ),
        lawson: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_intent_next_action_konbini_lawson,
            ]).annotate({ description: "Lawson instruction details." }),
            Schema.Null,
          ]),
        ),
        ministop: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_intent_next_action_konbini_ministop,
            ]).annotate({ description: "Ministop instruction details." }),
            Schema.Null,
          ]),
        ),
        seicomart: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_intent_next_action_konbini_seicomart,
            ]).annotate({ description: "Seicomart instruction details." }),
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
      title: "payment_intent_next_action_konbini_stores",
      description: "",
      identifier: "Stripepayment_intent_next_action_konbini_stores",
    }),
);
export const Stripepayment_intent_next_action_swish_handle_redirect_or_display_qr_code =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_next_action_swish_handle_redirect_or_display_qr_code> =>
      Schema.StructWithRest(
        Schema.Struct({
          hosted_instructions_url: Schema.String.annotate({
            description:
              "The URL to the hosted Swish instructions page, which allows customers to view the QR code.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          qr_code: Stripepayment_intent_next_action_swish_qr_code,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentIntentNextActionSwishHandleRedirectOrDisplayQrCode",
        description: "",
        identifier:
          "Stripepayment_intent_next_action_swish_handle_redirect_or_display_qr_code",
      }),
  );
export const Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code> =>
      Schema.StructWithRest(
        Schema.Struct({
          hosted_instructions_url: Schema.String.annotate({
            description:
              "The URL to the hosted UPI instructions page, which allows customers to view the QR code.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          qr_code: Stripepayment_intent_next_action_upiqr_code,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentIntentNextActionUpiHandleRedirectOrDisplayQrCode",
        description: "",
        identifier:
          "Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code",
      }),
  );
export const Stripepayment_intent_payment_method_options_acss_debit =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_payment_method_options_acss_debit> =>
      Schema.StructWithRest(
        Schema.Struct({
          mandate_options: Schema.optionalKey(
            Stripepayment_intent_payment_method_options_mandate_options_acss_debit,
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
            Schema.Literals(["automatic", "instant", "microdeposits"]).annotate(
              {
                description:
                  "Bank account verification method. The default value is `automatic`.",
              },
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
        title: "payment_intent_payment_method_options_acss_debit",
        description: "",
        identifier: "Stripepayment_intent_payment_method_options_acss_debit",
      }),
  );
export const Stripepayment_intent_payment_method_options_payto = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_payment_method_options_payto> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripepayment_intent_payment_method_options_mandate_options_payto,
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
      title: "payment_intent_payment_method_options_payto",
      description: "",
      identifier: "Stripepayment_intent_payment_method_options_payto",
    }),
);
export const Stripepayment_intent_payment_method_options_bacs_debit =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_payment_method_options_bacs_debit> =>
      Schema.StructWithRest(
        Schema.Struct({
          mandate_options: Schema.optionalKey(
            Stripepayment_intent_payment_method_options_mandate_options_bacs_debit,
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
        title: "payment_intent_payment_method_options_bacs_debit",
        description: "",
        identifier: "Stripepayment_intent_payment_method_options_bacs_debit",
      }),
  );
export const Stripepayment_intent_payment_method_options_blik = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_payment_method_options_blik> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripepayment_intent_payment_method_options_mandate_options_blik,
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
      title: "payment_intent_payment_method_options_blik",
      description: "",
      identifier: "Stripepayment_intent_payment_method_options_blik",
    }),
);
export const Stripepayment_intent_payment_method_options_sepa_debit =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_payment_method_options_sepa_debit> =>
      Schema.StructWithRest(
        Schema.Struct({
          mandate_options: Schema.optionalKey(
            Stripepayment_intent_payment_method_options_mandate_options_sepa_debit,
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
        title: "payment_intent_payment_method_options_sepa_debit",
        description: "",
        identifier: "Stripepayment_intent_payment_method_options_sepa_debit",
      }),
  );
export const Stripepayment_intent_card_processing = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_card_processing> =>
    Schema.StructWithRest(
      Schema.Struct({
        customer_notification: Schema.optionalKey(
          Stripepayment_intent_processing_customer_notification,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentIntentCardProcessing",
      description: "",
      identifier: "Stripepayment_intent_card_processing",
    }),
);
export const Stripepayment_intent_amount_details_line_item = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_amount_details_line_item> =>
    Schema.StructWithRest(
      Schema.Struct({
        discount_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The discount applied on this line item represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). An integer greater than 0.\n\nThis field is mutually exclusive with the `amount_details[discount_amount]` field.",
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
        object: Schema.Literal(
          "payment_intent_amount_details_line_item",
        ).annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_payment_method_options,
            ]).annotate({
              description:
                "Payment method-specific information for line items.",
            }),
            Schema.Null,
          ]),
        ),
        product_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The product code of the line item, such as an SKU. Required for L3 rates. At most 12 characters long.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_name: Schema.String.annotate({
          description:
            "The product name of the line item. Required for L3 rates. At most 1024 characters long.\n\nFor Cards, this field is truncated to 26 alphanumeric characters before being sent to the card networks. For PayPal, this field is truncated to 127 characters.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        quantity: Schema.Number.annotate({
          description:
            "The quantity of items. Required for L3 rates. An integer greater than 0.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        tax: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_flows_amount_details_resource_line_items_list_resource_line_item_resource_tax,
            ]).annotate({
              description: "Contains information about the tax on the item.",
            }),
            Schema.Null,
          ]),
        ),
        unit_cost: Schema.Number.annotate({
          description:
            "The unit cost of the line item represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). Required for L3 rates. An integer greater than or equal to 0.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        unit_of_measure: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A unit of measure for the line item, such as gallons, feet, meters, etc. Required for L3 rates. At most 12 alphanumeric characters long.",
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
      title: "PaymentIntent LineItem",
      description: "",
      identifier: "Stripepayment_intent_amount_details_line_item",
    }),
);
export const Stripepayment_intent_type_specific_payment_method_options_client =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_type_specific_payment_method_options_client> =>
      Schema.StructWithRest(
        Schema.Struct({
          capture_method: Schema.optionalKey(
            Schema.Literals([
              "automatic_delayed",
              "manual",
              "manual_preferred",
            ]).annotate({
              description:
                "Controls when the funds will be captured from the customer's account.",
            }),
          ),
          installments: Schema.optionalKey(
            Stripepayment_flows_installment_options,
          ),
          mandate_options: Schema.optionalKey(
            Stripepayment_intent_payment_method_options_mandate_options_payto,
          ),
          request_incremental_authorization_support: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Request ability to [increment](https://docs.stripe.com/terminal/features/incremental-authorizations) this PaymentIntent if the combination of MCC and card brand is eligible. Check [incremental_authorization_supported](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-card_present-incremental_authorization_supported) in the [Confirm](https://docs.stripe.com/api/payment_intents/confirm) response to verify support.",
            }),
          ),
          require_cvc_recollection: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "When enabled, using a card that is attached to a customer will require the CVC to be provided again (i.e. using the cvc_token parameter).",
            }),
          ),
          routing: Schema.optionalKey(
            Stripepayment_method_options_card_present_routing,
          ),
          setup_future_usage: Schema.optionalKey(
            Schema.Literals(["none", "off_session", "on_session"]).annotate({
              description:
                "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
            }),
          ),
          verification_method: Schema.optionalKey(
            Schema.Literals(["automatic", "instant", "microdeposits"]).annotate(
              {
                description:
                  "Bank account verification method. The default value is `automatic`.",
              },
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
        title: "PaymentIntentTypeSpecificPaymentMethodOptionsClient",
        description: "",
        identifier:
          "Stripepayment_intent_type_specific_payment_method_options_client",
      }),
  );
export const Stripepayment_intent_payment_method_options_card = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_payment_method_options_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        capture_method: Schema.optionalKey(
          Schema.Literal("manual").annotate({
            description:
              "Controls when the funds will be captured from the customer's account.",
          }),
        ),
        installments: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_options_card_installments,
            ]).annotate({
              description:
                "Installment details for this payment.\n\nFor more information, see the [installments integration guide](https://docs.stripe.com/payments/installments).",
            }),
            Schema.Null,
          ]),
        ),
        mandate_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_options_card_mandate_options,
            ]).annotate({
              description:
                "Configuration options for setting up an eMandate for cards issued in India.",
            }),
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
              "girocard",
              "interac",
              "jcb",
              "link",
              "mastercard",
              "unionpay",
              "unknown",
              "visa",
            ]).annotate({
              description:
                "Selected network to process this payment intent on. Depends on the available networks of the card attached to the payment intent. Can be only set confirm-time.",
            }),
            Schema.Null,
          ]),
        ),
        request_extended_authorization: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to [capture beyond the standard authorization validity window](https://docs.stripe.com/payments/extended-authorization) for this PaymentIntent.",
          }),
        ),
        request_incremental_authorization: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to [increment the authorization](https://docs.stripe.com/payments/incremental-authorization) for this PaymentIntent.",
          }),
        ),
        request_multicapture: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to make [multiple captures](https://docs.stripe.com/payments/multicapture) for this PaymentIntent.",
          }),
        ),
        request_overcapture: Schema.optionalKey(
          Schema.Literals(["if_available", "never"]).annotate({
            description:
              "Request ability to [overcapture](https://docs.stripe.com/payments/overcapture) for this PaymentIntent.",
          }),
        ),
        request_three_d_secure: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["any", "automatic", "challenge"]).annotate({
              description:
                "We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. If not provided, this value defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/payments/3d-secure/authentication-flow#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.",
            }),
            Schema.Null,
          ]),
        ),
        require_cvc_recollection: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "When enabled, using a card that is attached to a customer will require the CVC to be provided again (i.e. using the cvc_token parameter).",
          }),
        ),
        setup_credential_usage: Schema.optionalKey(
          Schema.Literals(["installment", "recurring", "unscheduled"]).annotate(
            {
              description:
                "Set to indicate the future transaction type usage for the card being set up.",
            },
          ),
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
        stored_credential_usage: Schema.optionalKey(
          Schema.Literals(["installment", "recurring", "unscheduled"]).annotate(
            {
              description:
                "Selected usage to indicate the transaction type of the off-session payment.",
            },
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
      title: "payment_intent_payment_method_options_card",
      description: "",
      identifier: "Stripepayment_intent_payment_method_options_card",
    }),
);
export const Stripepayment_intent_next_action_konbini = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_next_action_konbini> =>
    Schema.StructWithRest(
      Schema.Struct({
        expires_at: Schema.Number.annotate({
          description:
            "The timestamp at which the pending Konbini payment expires.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        hosted_voucher_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The URL for the Konbini payment instructions page, which allows customers to view and print a Konbini voucher.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        stores: Stripepayment_intent_next_action_konbini_stores,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_intent_next_action_konbini",
      description: "",
      identifier: "Stripepayment_intent_next_action_konbini",
    }),
);
export const Stripepayment_intent_payment_method_options_us_bank_account =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_payment_method_options_us_bank_account> =>
      Schema.StructWithRest(
        Schema.Struct({
          financial_connections: Schema.optionalKey(
            Stripelinked_account_options_common,
          ),
          mandate_options: Schema.optionalKey(
            Stripepayment_method_options_us_bank_account_mandate_options,
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
          transaction_purpose: Schema.optionalKey(
            Schema.Literals([
              "goods",
              "other",
              "services",
              "unspecified",
            ]).annotate({ description: "The purpose of the transaction." }),
          ),
          verification_method: Schema.optionalKey(
            Schema.Literals(["automatic", "instant", "microdeposits"]).annotate(
              {
                description:
                  "Bank account verification method. The default value is `automatic`.",
              },
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
        title: "payment_intent_payment_method_options_us_bank_account",
        description: "",
        identifier:
          "Stripepayment_intent_payment_method_options_us_bank_account",
      }),
  );
export const Stripepayment_intent_processing = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_processing> =>
    Schema.StructWithRest(
      Schema.Struct({
        card: Schema.optionalKey(Stripepayment_intent_card_processing),
        type: Schema.Literal("card").annotate({
          description:
            "Type of the payment method for which payment is in `processing` state, one of `card`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentIntentProcessing",
      description: "",
      identifier: "Stripepayment_intent_processing",
    }),
);
export const Stripepayment_intent_next_action_display_bank_transfer_instructions =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_intent_next_action_display_bank_transfer_instructions> =>
      Schema.StructWithRest(
        Schema.Struct({
          amount_remaining: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "The remaining amount that needs to be transferred to complete the payment.",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
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
          financial_addresses: Schema.optionalKey(
            Schema.Array(
              Stripefunding_instructions_bank_transfer_financial_address,
            ).annotate({
              description:
                "A list of financial addresses that can be used to fund the customer balance",
            }),
          ),
          hosted_instructions_url: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "A link to a hosted page that guides your customer through completing the transfer.",
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
                  "A string identifying this payment. Instruct your customer to include this code in the reference or memo field of their bank transfer.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          type: Schema.Literals([
            "eu_bank_transfer",
            "gb_bank_transfer",
            "jp_bank_transfer",
            "mx_bank_transfer",
            "us_bank_transfer",
          ]).annotate({ description: "Type of bank transfer" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentIntentNextActionDisplayBankTransferInstructions",
        description: "",
        identifier:
          "Stripepayment_intent_next_action_display_bank_transfer_instructions",
      }),
  );
export const Stripepayment_intent_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_acss_debit,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        affirm: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_affirm,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        afterpay_clearpay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_afterpay_clearpay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        alipay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_alipay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        alma: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_alma,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_amazon_pay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        au_becs_debit: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_au_becs_debit,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_bacs_debit,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        bancontact: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_bancontact,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        billie: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_billie,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        bizum: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_bizum,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        blik: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_blik,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        boleto: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_boleto,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        card: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_card,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        card_present: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_card_present,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        cashapp: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_cashapp,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        crypto: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_crypto,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        customer_balance: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_customer_balance,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        eps: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_eps,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        fpx: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_fpx,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        giropay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_giropay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        grabpay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_grabpay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        ideal: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_ideal,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        interac_present: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_interac_present,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        kakao_pay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_flows_private_payment_methods_kakao_pay_payment_method_options,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        klarna: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_klarna,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        konbini: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_konbini,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        kr_card: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_kr_card,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        link: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_link,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        mb_way: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_mb_way,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        mobilepay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_mobilepay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        multibanco: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_multibanco,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        naver_pay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_flows_private_payment_methods_naver_pay_payment_method_options,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        nz_bank_account: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_nz_bank_account,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        oxxo: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_oxxo,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        p24: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_p24,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        pay_by_bank: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_pay_by_bank,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        payco: Schema.optionalKey(
          Schema.Union([
            Stripepayment_flows_private_payment_methods_payco_payment_method_options,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        paynow: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_paynow,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        paypal: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_paypal,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        paypay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_paypay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        payto: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_payto,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        pix: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_pix,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        promptpay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_promptpay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        revolut_pay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_revolut_pay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        samsung_pay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_flows_private_payment_methods_samsung_pay_payment_method_options,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        satispay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_satispay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        scalapay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_scalapay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_sepa_debit,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        sequra: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_sequra,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        sofort: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_sofort,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        sunbit: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_sunbit,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        swish: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_swish,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        twint: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_twint,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        upi: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_upi,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.Union([
            Stripepayment_intent_payment_method_options_us_bank_account,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        wechat_pay: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_wechat_pay,
            Stripepayment_intent_type_specific_payment_method_options_client,
          ]),
        ),
        zip: Schema.optionalKey(
          Schema.Union([
            Stripepayment_method_options_zip,
            Stripepayment_intent_type_specific_payment_method_options_client,
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
      title: "PaymentIntentPaymentMethodOptions",
      description: "",
      identifier: "Stripepayment_intent_payment_method_options",
    }),
);
export const Stripepayment_intent_next_action = Schema.suspend(
  (): Schema.Codec<Stripepayment_intent_next_action> =>
    Schema.StructWithRest(
      Schema.Struct({
        alipay_handle_redirect: Schema.optionalKey(
          Stripepayment_intent_next_action_alipay_handle_redirect,
        ),
        blik_authorize: Schema.optionalKey(
          Stripepayment_intent_next_action_blik_authorize,
        ),
        boleto_display_details: Schema.optionalKey(
          Stripepayment_intent_next_action_boleto,
        ),
        card_await_notification: Schema.optionalKey(
          Stripepayment_intent_next_action_card_await_notification,
        ),
        cashapp_handle_redirect_or_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code,
        ),
        display_bank_transfer_instructions: Schema.optionalKey(
          Stripepayment_intent_next_action_display_bank_transfer_instructions,
        ),
        klarna_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_klarna_display_qr_code,
        ),
        konbini_display_details: Schema.optionalKey(
          Stripepayment_intent_next_action_konbini,
        ),
        multibanco_display_details: Schema.optionalKey(
          Stripepayment_intent_next_action_display_multibanco_details,
        ),
        oxxo_display_details: Schema.optionalKey(
          Stripepayment_intent_next_action_display_oxxo_details,
        ),
        paynow_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_paynow_display_qr_code,
        ),
        pix_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_pix_display_qr_code,
        ),
        promptpay_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_promptpay_display_qr_code,
        ),
        redirect_to_url: Schema.optionalKey(
          Stripepayment_intent_next_action_redirect_to_url,
        ),
        swish_handle_redirect_or_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_swish_handle_redirect_or_display_qr_code,
        ),
        type: Schema.String.annotate({
          description:
            "Type of the next action to perform. Refer to the other child attributes under `next_action` for available values. Examples include: `redirect_to_url`, `use_stripe_sdk`, `alipay_handle_redirect`, `oxxo_display_details`, or `verify_with_microdeposits`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        upi_handle_redirect_or_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code,
        ),
        use_stripe_sdk: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({
            description:
              "When confirming a PaymentIntent with Stripe.js, Stripe.js depends on the contents of this dictionary to invoke authentication flows. The shape of the contents is subject to change and is only intended to be used by Stripe.js.",
          }),
        ),
        verify_with_microdeposits: Schema.optionalKey(
          Stripepayment_intent_next_action_verify_with_microdeposits,
        ),
        wechat_pay_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_wechat_pay_display_qr_code,
        ),
        wechat_pay_redirect_to_android_app: Schema.optionalKey(
          Stripepayment_intent_next_action_wechat_pay_redirect_to_android_app,
        ),
        wechat_pay_redirect_to_ios_app: Schema.optionalKey(
          Stripepayment_intent_next_action_wechat_pay_redirect_to_ios_app,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentIntentNextAction",
      description: "",
      identifier: "Stripepayment_intent_next_action",
    }),
);
