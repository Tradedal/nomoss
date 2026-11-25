// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import {
  Stripeapi_errors,
  Stripeapplication,
  Stripelinked_account_options_common,
  Stripemandate,
  Stripesmor_resource_managed_payments,
  Stripethree_d_secure_details,
} from "./common.js";
import { Stripecustomer, Stripedeleted_customer } from "./customers.js";
import {
  Stripepayment_intent_next_action_blik_authorize,
  Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code,
  Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code,
} from "./paymentIntents.js";
import {
  Stripepayment_method_details_card_present_offline,
  Stripepayment_method_details_card_wallet_apple_pay,
  Stripepayment_method_details_card_wallet_google_pay,
} from "./paymentMethodDetails.js";
import {
  Stripepayment_method_options_mandate_options_pix,
  Stripepayment_method_options_mandate_options_upi,
  Stripepayment_method_options_us_bank_account_mandate_options,
} from "./paymentMethodOptions.js";
import {
  Stripepayment_method,
  Stripepayment_method_config_biz_payment_method_configuration_details,
} from "./paymentMethods.js";
import {
  Stripepayment_flows_automatic_payment_methods_setup_intent,
  Stripepayment_flows_private_payment_methods_satispay_setup_attempt_details,
} from "./payments.js";

export type Stripesetup_attempt = {
  readonly application?: string | Stripeapplication | null;
  readonly attach_to_self?: boolean;
  readonly created: number;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly flow_directions?: ReadonlyArray<"inbound" | "outbound"> | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "setup_attempt";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly payment_method: string | Stripepayment_method;
  readonly payment_method_details: Stripesetup_attempt_payment_method_details;
  readonly setup_error?: Stripeapi_errors | null;
  readonly setup_intent: string | Stripesetup_intent;
  readonly status: string;
  readonly usage: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent = {
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
  readonly application?: string | Stripeapplication | null;
  readonly attach_to_self?: boolean;
  readonly automatic_payment_methods?: Stripepayment_flows_automatic_payment_methods_setup_intent | null;
  readonly cancellation_reason?:
    | "abandoned"
    | "duplicate"
    | "requested_by_customer"
    | null;
  readonly client_secret?: string | null;
  readonly created: number;
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
  readonly flow_directions?: ReadonlyArray<"inbound" | "outbound"> | null;
  readonly id: string;
  readonly last_setup_error?: Stripeapi_errors | null;
  readonly latest_attempt?: string | Stripesetup_attempt | null;
  readonly livemode: boolean;
  readonly managed_payments?: Stripesmor_resource_managed_payments | null;
  readonly mandate?: string | Stripemandate | null;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly next_action?: Stripesetup_intent_next_action | null;
  readonly object: "setup_intent";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly payment_method?: string | Stripepayment_method | null;
  readonly payment_method_configuration_details?: Stripepayment_method_config_biz_payment_method_configuration_details | null;
  readonly payment_method_options?: Stripesetup_intent_payment_method_options | null;
  readonly payment_method_types: ReadonlyArray<string>;
  readonly single_use_mandate?: string | Stripemandate | null;
  readonly status:
    | "canceled"
    | "processing"
    | "requires_action"
    | "requires_confirmation"
    | "requires_payment_method"
    | "succeeded";
  readonly usage: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details = {
  readonly acss_debit?: Stripesetup_attempt_payment_method_details_acss_debit;
  readonly amazon_pay?: Stripesetup_attempt_payment_method_details_amazon_pay;
  readonly au_becs_debit?: Stripesetup_attempt_payment_method_details_au_becs_debit;
  readonly bacs_debit?: Stripesetup_attempt_payment_method_details_bacs_debit;
  readonly bancontact?: Stripesetup_attempt_payment_method_details_bancontact;
  readonly blik?: Stripesetup_attempt_payment_method_details_blik;
  readonly boleto?: Stripesetup_attempt_payment_method_details_boleto;
  readonly card?: Stripesetup_attempt_payment_method_details_card;
  readonly card_present?: Stripesetup_attempt_payment_method_details_card_present;
  readonly cashapp?: Stripesetup_attempt_payment_method_details_cashapp;
  readonly ideal?: Stripesetup_attempt_payment_method_details_ideal;
  readonly kakao_pay?: Stripesetup_attempt_payment_method_details_kakao_pay;
  readonly klarna?: Stripesetup_attempt_payment_method_details_klarna;
  readonly kr_card?: Stripesetup_attempt_payment_method_details_kr_card;
  readonly link?: Stripesetup_attempt_payment_method_details_link;
  readonly naver_pay?: Stripesetup_attempt_payment_method_details_naver_pay;
  readonly nz_bank_account?: Stripesetup_attempt_payment_method_details_nz_bank_account;
  readonly paypal?: Stripesetup_attempt_payment_method_details_paypal;
  readonly payto?: Stripesetup_attempt_payment_method_details_payto;
  readonly pix?: Stripesetup_attempt_payment_method_details_pix;
  readonly revolut_pay?: Stripesetup_attempt_payment_method_details_revolut_pay;
  readonly satispay?: Stripepayment_flows_private_payment_methods_satispay_setup_attempt_details;
  readonly sepa_debit?: Stripesetup_attempt_payment_method_details_sepa_debit;
  readonly sofort?: Stripesetup_attempt_payment_method_details_sofort;
  readonly twint?: Stripesetup_attempt_payment_method_details_twint;
  readonly type: string;
  readonly upi?: Stripesetup_attempt_payment_method_details_upi;
  readonly us_bank_account?: Stripesetup_attempt_payment_method_details_us_bank_account;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_sofort = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly generated_sepa_debit?: string | Stripepayment_method | null;
  readonly generated_sepa_debit_mandate?: string | Stripemandate | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?: "de" | "en" | "fr" | "nl" | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_ideal = {
  readonly bank?:
    | "abn_amro"
    | "adyen"
    | "asn_bank"
    | "bunq"
    | "buut"
    | "finom"
    | "handelsbanken"
    | "ing"
    | "knab"
    | "mollie"
    | "moneyou"
    | "n26"
    | "nn"
    | "rabobank"
    | "regiobank"
    | "revolut"
    | "sns_bank"
    | "triodos_bank"
    | "van_lanschot"
    | "yoursafe"
    | null;
  readonly bic?:
    | "ABNANL2A"
    | "ADYBNL2A"
    | "ASNBNL21"
    | "BITSNL2A"
    | "BUNQNL2A"
    | "BUUTNL2A"
    | "FNOMNL22"
    | "FVLBNL22"
    | "HANDNL2A"
    | "INGBNL2A"
    | "KNABNL2H"
    | "MLLENL2A"
    | "MOYONL21"
    | "NNBANL2G"
    | "NTSBDEB1"
    | "RABONL2U"
    | "RBRBNL21"
    | "REVOIE23"
    | "REVOLT21"
    | "SNSBNL2A"
    | "TRIONL2U"
    | null;
  readonly generated_sepa_debit?: string | Stripepayment_method | null;
  readonly generated_sepa_debit_mandate?: string | Stripemandate | null;
  readonly iban_last4?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_card_present = {
  readonly generated_card?: string | Stripepayment_method | null;
  readonly offline?: Stripepayment_method_details_card_present_offline | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_bancontact = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly generated_sepa_debit?: string | Stripepayment_method | null;
  readonly generated_sepa_debit_mandate?: string | Stripemandate | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?: "de" | "en" | "fr" | "nl" | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_acss_debit = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_amazon_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_au_becs_debit = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_bacs_debit = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_blik = {
  readonly buyer_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_boleto = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_card_checks = {
  readonly address_line1_check?: string | null;
  readonly address_postal_code_check?: string | null;
  readonly cvc_check?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_cashapp = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_kakao_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_klarna = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_kr_card = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_link = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_naver_pay = {
  readonly buyer_id?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_nz_bank_account = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_paypal = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_payto = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_pix = {
  readonly fingerprint?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_revolut_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_sepa_debit = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_twint = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_upi = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_attempt_payment_method_details_us_bank_account = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_intent_next_action_pix_display_qr_code = {
  readonly data: string;
  readonly expires_at: number;
  readonly hosted_instructions_url: string;
  readonly image_url_png: string;
  readonly image_url_svg: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_next_action_redirect_to_url = {
  readonly return_url?: string | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_next_action_verify_with_microdeposits = {
  readonly arrival_date: number;
  readonly hosted_verification_url: string;
  readonly microdeposit_type?: "amounts" | "descriptor_code" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_mandate_options_acss_debit =
  {
    readonly custom_mandate_url?: string;
    readonly default_for?: ReadonlyArray<"invoice" | "subscription">;
    readonly interval_description?: string | null;
    readonly payment_schedule?: "combined" | "interval" | "sporadic" | null;
    readonly transaction_type?: "business" | "personal" | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_mandate_options_payto = {
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
export type Stripesetup_intent_payment_method_options_amazon_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_intent_payment_method_options_mandate_options_bacs_debit =
  { readonly reference_prefix?: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripesetup_intent_payment_method_options_bizum = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_intent_payment_method_options_mandate_options_blik = {
  readonly expires_at?: number | null;
  readonly type?: "off_session" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_card_mandate_options = {
  readonly amount: number;
  readonly amount_type: "fixed" | "maximum";
  readonly currency: string;
  readonly description?: string | null;
  readonly end_date?: number | null;
  readonly interval: "day" | "month" | "sporadic" | "week" | "year";
  readonly interval_count?: number | null;
  readonly reference: string;
  readonly start_date: number;
  readonly supported_types?: ReadonlyArray<"india"> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_card_present = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_intent_payment_method_options_klarna = {
  readonly currency?: string | null;
  readonly preferred_locale?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_link = {
  readonly [x: string]: Schema.Json;
};
export type Stripesetup_intent_payment_method_options_paypal = {
  readonly billing_agreement_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_mandate_options_sepa_debit =
  { readonly reference_prefix?: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripesetup_attempt_payment_method_details_card_wallet = {
  readonly apple_pay?: Stripepayment_method_details_card_wallet_apple_pay;
  readonly google_pay?: Stripepayment_method_details_card_wallet_google_pay;
  readonly type: "apple_pay" | "google_pay" | "link";
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_pix = {
  readonly mandate_options?: Stripepayment_method_options_mandate_options_pix;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_acss_debit = {
  readonly currency?: "cad" | "usd" | null;
  readonly mandate_options?: Stripesetup_intent_payment_method_options_mandate_options_acss_debit;
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_type_specific_payment_method_options_client = {
  readonly mandate_options?: Stripesetup_intent_payment_method_options_mandate_options_payto;
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_payto = {
  readonly mandate_options?: Stripesetup_intent_payment_method_options_mandate_options_payto;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_bacs_debit = {
  readonly mandate_options?: Stripesetup_intent_payment_method_options_mandate_options_bacs_debit;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_blik = {
  readonly mandate_options?: Stripesetup_intent_payment_method_options_mandate_options_blik;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_card = {
  readonly mandate_options?: Stripesetup_intent_payment_method_options_card_mandate_options | null;
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
  readonly request_three_d_secure?: "any" | "automatic" | "challenge" | null;
  readonly setup_credential_usage?: "installment" | "recurring" | "unscheduled";
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_sepa_debit = {
  readonly mandate_options?: Stripesetup_intent_payment_method_options_mandate_options_sepa_debit;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_upi = {
  readonly mandate_options?: Stripepayment_method_options_mandate_options_upi;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_attempt_payment_method_details_card = {
  readonly brand?: string | null;
  readonly checks?: Stripesetup_attempt_payment_method_details_card_checks | null;
  readonly country?: string | null;
  readonly exp_month?: number | null;
  readonly exp_year?: number | null;
  readonly fingerprint?: string | null;
  readonly funding?: string | null;
  readonly last4?: string | null;
  readonly network?: string | null;
  readonly three_d_secure?: Stripethree_d_secure_details | null;
  readonly wallet?: Stripesetup_attempt_payment_method_details_card_wallet | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_next_action = {
  readonly blik_authorize?: Stripepayment_intent_next_action_blik_authorize;
  readonly cashapp_handle_redirect_or_display_qr_code?: Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code;
  readonly pix_display_qr_code?: Stripesetup_intent_next_action_pix_display_qr_code;
  readonly redirect_to_url?: Stripesetup_intent_next_action_redirect_to_url;
  readonly type: string;
  readonly upi_handle_redirect_or_display_qr_code?: Stripepayment_intent_next_action_upi_handle_redirect_or_display_qr_code;
  readonly use_stripe_sdk?: { readonly [x: string]: Schema.Json };
  readonly verify_with_microdeposits?: Stripesetup_intent_next_action_verify_with_microdeposits;
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options_us_bank_account = {
  readonly financial_connections?: Stripelinked_account_options_common;
  readonly mandate_options?: Stripepayment_method_options_us_bank_account_mandate_options;
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripesetup_intent_payment_method_options = {
  readonly acss_debit?:
    | Stripesetup_intent_payment_method_options_acss_debit
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly amazon_pay?:
    | Stripesetup_intent_payment_method_options_amazon_pay
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly bacs_debit?:
    | Stripesetup_intent_payment_method_options_bacs_debit
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly bizum?:
    | Stripesetup_intent_payment_method_options_bizum
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly blik?:
    | Stripesetup_intent_payment_method_options_blik
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly card?:
    | Stripesetup_intent_payment_method_options_card
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly card_present?:
    | Stripesetup_intent_payment_method_options_card_present
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly klarna?:
    | Stripesetup_intent_payment_method_options_klarna
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly link?:
    | Stripesetup_intent_payment_method_options_link
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly paypal?:
    | Stripesetup_intent_payment_method_options_paypal
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly payto?:
    | Stripesetup_intent_payment_method_options_payto
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly pix?:
    | Stripesetup_intent_payment_method_options_pix
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly sepa_debit?:
    | Stripesetup_intent_payment_method_options_sepa_debit
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly upi?:
    | Stripesetup_intent_payment_method_options_upi
    | Stripesetup_intent_type_specific_payment_method_options_client;
  readonly us_bank_account?:
    | Stripesetup_intent_payment_method_options_us_bank_account
    | Stripesetup_intent_type_specific_payment_method_options_client;
} & { readonly [x: string]: Schema.Json };

export const Stripesetup_attempt = Schema.suspend(
  (): Schema.Codec<Stripesetup_attempt> =>
    Schema.StructWithRest(
      Schema.Struct({
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
                "The value of [application](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-application) on the SetupIntent at the time of this confirmation.",
            }),
            Schema.Null,
          ]),
        ),
        attach_to_self: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "If present, the SetupIntent's payment method will be attached to the in-context Stripe Account.\n\nIt can only be used for this Stripe Account’s own money movement flows like InboundTransfer and OutboundTransfers. It cannot be set to true when setting up a PaymentMethod for a Customer, and defaults to false when attaching a PaymentMethod to a Customer.",
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
              description:
                "The value of [customer](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-customer) on the SetupIntent at the time of this confirmation.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The value of [customer_account](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-customer_account) on the SetupIntent at the time of this confirmation.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        flow_directions: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Schema.Literals(["inbound", "outbound"])).annotate({
              description:
                "Indicates the directions of money movement for which this payment method is intended to be used.\n\nInclude `inbound` if you intend to use the payment method as the origin to pull funds from. Include `outbound` if you intend to use the payment method as the destination to send funds to. You can include both if you intend to use the payment method for both purposes.",
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
        object: Schema.Literal("setup_attempt").annotate({
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
                "The value of [on_behalf_of](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-on_behalf_of) on the SetupIntent at the time of this confirmation.",
            }),
            Schema.Null,
          ]),
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
          description: "ID of the payment method used with this SetupAttempt.",
        }),
        payment_method_details: Schema.suspend(
          (): Schema.Codec<Stripesetup_attempt_payment_method_details> =>
            Stripesetup_attempt_payment_method_details,
        ),
        setup_error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripeapi_errors> => Stripeapi_errors,
              ),
            ]).annotate({
              description:
                "The error encountered during this attempt to confirm the SetupIntent, if any.",
            }),
            Schema.Null,
          ]),
        ),
        setup_intent: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripesetup_intent> => Stripesetup_intent,
          ),
        ]).annotate({
          description: "ID of the SetupIntent that this attempt belongs to.",
        }),
        status: Schema.String.annotate({
          description:
            "Status of this SetupAttempt, one of `requires_confirmation`, `requires_action`, `processing`, `succeeded`, `failed`, or `abandoned`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        usage: Schema.String.annotate({
          description:
            "The value of [usage](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-usage) on the SetupIntent at the time of this confirmation, one of `off_session` or `on_session`.",
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
      title: "SetupAttempt",
      description:
        "A SetupAttempt describes one attempted confirmation of a SetupIntent,\nwhether that confirmation is successful or unsuccessful. You can use\nSetupAttempts to inspect details of a specific attempt at setting up a\npayment method using a SetupIntent.",
      identifier: "Stripesetup_attempt",
    }),
);
export const Stripesetup_intent = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent> =>
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
                "The list of payment method types to allow for this SetupIntent. Stripe will only use methods in this list when determining the payment methods to offer.",
            }),
            Schema.Null,
          ]),
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
                "ID of the Connect application that created the SetupIntent.",
            }),
            Schema.Null,
          ]),
        ),
        attach_to_self: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "If present, the SetupIntent's payment method will be attached to the in-context Stripe Account.\n\nIt can only be used for this Stripe Account’s own money movement flows like InboundTransfer and OutboundTransfers. It cannot be set to true when setting up a PaymentMethod for a Customer, and defaults to false when attaching a PaymentMethod to a Customer.",
          }),
        ),
        automatic_payment_methods: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_flows_automatic_payment_methods_setup_intent,
            ]).annotate({
              description:
                "Settings for dynamic payment methods compatible with this Setup Intent",
            }),
            Schema.Null,
          ]),
        ),
        cancellation_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "abandoned",
              "duplicate",
              "requested_by_customer",
            ]).annotate({
              description:
                "Reason for cancellation of this SetupIntent, one of `abandoned`, `requested_by_customer`, or `duplicate`.",
            }),
            Schema.Null,
          ]),
        ),
        client_secret: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The client secret of this SetupIntent. Used for client-side retrieval using a publishable key.\n\nThe client secret can be used to complete payment setup from your frontend. It should not be stored, logged, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.",
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
                "ID of the Customer this SetupIntent belongs to, if one exists.\n\nIf present, the SetupIntent's payment method will be attached to the Customer on successful setup. Payment methods attached to other Customers cannot be used with this SetupIntent.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the Account this SetupIntent belongs to, if one exists.\n\nIf present, the SetupIntent's payment method will be attached to the Account on successful setup. Payment methods attached to other Accounts cannot be used with this SetupIntent.",
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
                "Payment method types that are excluded from this SetupIntent.",
            }),
            Schema.Null,
          ]),
        ),
        flow_directions: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Schema.Literals(["inbound", "outbound"])).annotate({
              description:
                "Indicates the directions of money movement for which this payment method is intended to be used.\n\nInclude `inbound` if you intend to use the payment method as the origin to pull funds from. Include `outbound` if you intend to use the payment method as the destination to send funds to. You can include both if you intend to use the payment method for both purposes.",
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
        last_setup_error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripeapi_errors> => Stripeapi_errors,
              ),
            ]).annotate({
              description:
                "The error encountered in the previous SetupIntent confirmation.",
            }),
            Schema.Null,
          ]),
        ),
        latest_attempt: Schema.optionalKey(
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
              description: "The most recent SetupAttempt for this SetupIntent.",
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
            Schema.Union([Stripesmor_resource_managed_payments]),
            Schema.Null,
          ]),
        ),
        mandate: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripemandate> => Stripemandate),
            ]).annotate({
              description:
                "ID of the multi use Mandate generated by the SetupIntent.",
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
        next_action: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesetup_intent_next_action]).annotate({
              description:
                "If present, this property tells you what actions you need to take in order for your customer to continue payment setup.",
            }),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("setup_intent").annotate({
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
                "The account (if any) for which the setup is intended.",
            }),
            Schema.Null,
          ]),
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
                "ID of the payment method used with this SetupIntent. If the payment method is `card_present` and isn't a digital wallet, then the [generated_card](https://docs.stripe.com/api/setup_attempts/object#setup_attempt_object-payment_method_details-card_present-generated_card) associated with the `latest_attempt` is attached to the Customer instead.",
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
                "Information about the [payment method configuration](https://docs.stripe.com/api/payment_method_configurations) used for this Setup Intent.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesetup_intent_payment_method_options]).annotate({
              description:
                "Payment method-specific configuration for this SetupIntent.",
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
            "The list of payment method types (e.g. card) that this SetupIntent is allowed to set up. A list of valid payment method types can be found [here](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type).",
        }),
        single_use_mandate: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripemandate> => Stripemandate),
            ]).annotate({
              description:
                "ID of the single_use Mandate generated by the SetupIntent.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals([
          "canceled",
          "processing",
          "requires_action",
          "requires_confirmation",
          "requires_payment_method",
          "succeeded",
        ]).annotate({
          description:
            "[Status](https://docs.stripe.com/payments/intents#intent-statuses) of this SetupIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `canceled`, or `succeeded`.",
        }),
        usage: Schema.String.annotate({
          description:
            "Indicates how the payment method is intended to be used in the future.\n\nUse `on_session` if you intend to only reuse the payment method when the customer is in your checkout flow. Use `off_session` if your customer may or may not be in your checkout flow. If not provided, this value defaults to `off_session`.",
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
      title: "SetupIntent",
      description:
        "A SetupIntent guides you through the process of setting up and saving a customer's payment credentials for future payments.\nFor example, you can use a SetupIntent to set up and save your customer's card without immediately collecting a payment.\nLater, you can use [PaymentIntents](https://docs.stripe.com/api#payment_intents) to drive the payment flow.\n\nCreate a SetupIntent when you're ready to collect your customer's payment credentials.\nDon't maintain long-lived, unconfirmed SetupIntents because they might not be valid.\nThe SetupIntent transitions through multiple [statuses](https://docs.stripe.com/payments/intents#intent-statuses) as it guides\nyou through the setup process.\n\nSuccessful SetupIntents result in payment credentials that are optimized for future payments.\nFor example, cardholders in [certain regions](https://stripe.com/guides/strong-customer-authentication) might need to be run through\n[Strong Customer Authentication](https://docs.stripe.com/strong-customer-authentication) during payment method collection\nto streamline later [off-session payments](https://docs.stripe.com/payments/setup-intents).\nIf you use the SetupIntent with a [Customer](https://docs.stripe.com/api#setup_intent_object-customer),\nit automatically attaches the resulting payment method to that Customer after successful setup.\nWe recommend using SetupIntents or [setup_future_usage](https://docs.stripe.com/api#payment_intent_object-setup_future_usage) on\nPaymentIntents to save payment methods to prevent saving invalid or unoptimized payment methods.\n\nBy using SetupIntents, you can reduce friction for your customers, even as regulations change over time.\n\nRelated guide: [Setup Intents API](https://docs.stripe.com/payments/setup-intents)",
      identifier: "Stripesetup_intent",
    }),
);
export const Stripesetup_attempt_payment_method_details = Schema.suspend(
  (): Schema.Codec<Stripesetup_attempt_payment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_acss_debit,
        ),
        amazon_pay: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_amazon_pay,
        ),
        au_becs_debit: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_au_becs_debit,
        ),
        bacs_debit: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_bacs_debit,
        ),
        bancontact: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripesetup_attempt_payment_method_details_bancontact> =>
              Stripesetup_attempt_payment_method_details_bancontact,
          ),
        ),
        blik: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_blik,
        ),
        boleto: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_boleto,
        ),
        card: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_card,
        ),
        card_present: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripesetup_attempt_payment_method_details_card_present> =>
              Stripesetup_attempt_payment_method_details_card_present,
          ),
        ),
        cashapp: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_cashapp,
        ),
        ideal: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripesetup_attempt_payment_method_details_ideal> =>
              Stripesetup_attempt_payment_method_details_ideal,
          ),
        ),
        kakao_pay: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_kakao_pay,
        ),
        klarna: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_klarna,
        ),
        kr_card: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_kr_card,
        ),
        link: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_link,
        ),
        naver_pay: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_naver_pay,
        ),
        nz_bank_account: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_nz_bank_account,
        ),
        paypal: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_paypal,
        ),
        payto: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_payto,
        ),
        pix: Schema.optionalKey(Stripesetup_attempt_payment_method_details_pix),
        revolut_pay: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_revolut_pay,
        ),
        satispay: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_satispay_setup_attempt_details,
        ),
        sepa_debit: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_sepa_debit,
        ),
        sofort: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripesetup_attempt_payment_method_details_sofort> =>
              Stripesetup_attempt_payment_method_details_sofort,
          ),
        ),
        twint: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_twint,
        ),
        type: Schema.String.annotate({
          description:
            "The type of the payment method used in the SetupIntent (e.g., `card`). An additional hash is included on `payment_method_details` with a name matching this value. It contains confirmation-specific information for the payment method.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        upi: Schema.optionalKey(Stripesetup_attempt_payment_method_details_upi),
        us_bank_account: Schema.optionalKey(
          Stripesetup_attempt_payment_method_details_us_bank_account,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "SetupAttemptPaymentMethodDetails",
      description: "",
      identifier: "Stripesetup_attempt_payment_method_details",
    }),
);
export const Stripesetup_attempt_payment_method_details_sofort =
  Schema.StructWithRest(
    Schema.Struct({
      bank_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Bank code of bank associated with the bank account.",
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
            description: "Name of the bank associated with the bank account.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      bic: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Bank Identifier Code of the bank associated with the bank account.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      generated_sepa_debit: Schema.optionalKey(
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
              "The ID of the SEPA Direct Debit PaymentMethod which was generated by this SetupAttempt.",
          }),
          Schema.Null,
        ]),
      ),
      generated_sepa_debit_mandate: Schema.optionalKey(
        Schema.Union([
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripemandate> => Stripemandate),
          ]).annotate({
            description:
              "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this SetupAttempt.",
          }),
          Schema.Null,
        ]),
      ),
      iban_last4: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Last four characters of the IBAN.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      preferred_language: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["de", "en", "fr", "nl"]).annotate({
            description:
              "Preferred language of the Sofort authorization page that the customer is redirected to.\nCan be one of `en`, `de`, `fr`, or `nl`",
          }),
          Schema.Null,
        ]),
      ),
      verified_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Owner's verified full name. Values are verified or provided by Sofort directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
    title: "setup_attempt_payment_method_details_sofort",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_sofort",
  });
export const Stripesetup_attempt_payment_method_details_ideal =
  Schema.StructWithRest(
    Schema.Struct({
      bank: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "abn_amro",
            "adyen",
            "asn_bank",
            "bunq",
            "buut",
            "finom",
            "handelsbanken",
            "ing",
            "knab",
            "mollie",
            "moneyou",
            "n26",
            "nn",
            "rabobank",
            "regiobank",
            "revolut",
            "sns_bank",
            "triodos_bank",
            "van_lanschot",
            "yoursafe",
          ]).annotate({
            description:
              "The customer's bank. Can be one of `abn_amro`, `adyen`, `asn_bank`, `bunq`, `buut`, `finom`, `handelsbanken`, `ing`, `knab`, `mollie`, `moneyou`, `n26`, `nn`, `rabobank`, `regiobank`, `revolut`, `sns_bank`, `triodos_bank`, `van_lanschot`, or `yoursafe`.",
          }),
          Schema.Null,
        ]),
      ),
      bic: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "ABNANL2A",
            "ADYBNL2A",
            "ASNBNL21",
            "BITSNL2A",
            "BUNQNL2A",
            "BUUTNL2A",
            "FNOMNL22",
            "FVLBNL22",
            "HANDNL2A",
            "INGBNL2A",
            "KNABNL2H",
            "MLLENL2A",
            "MOYONL21",
            "NNBANL2G",
            "NTSBDEB1",
            "RABONL2U",
            "RBRBNL21",
            "REVOIE23",
            "REVOLT21",
            "SNSBNL2A",
            "TRIONL2U",
          ]).annotate({
            description: "The Bank Identifier Code of the customer's bank.",
          }),
          Schema.Null,
        ]),
      ),
      generated_sepa_debit: Schema.optionalKey(
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
              "The ID of the SEPA Direct Debit PaymentMethod which was generated by this SetupAttempt.",
          }),
          Schema.Null,
        ]),
      ),
      generated_sepa_debit_mandate: Schema.optionalKey(
        Schema.Union([
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripemandate> => Stripemandate),
          ]).annotate({
            description:
              "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this SetupAttempt.",
          }),
          Schema.Null,
        ]),
      ),
      iban_last4: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Last four characters of the IBAN.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      verified_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Owner's verified full name. Values are verified or provided by iDEAL directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
    title: "setup_attempt_payment_method_details_ideal",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_ideal",
  });
export const Stripesetup_attempt_payment_method_details_card_present =
  Schema.suspend(
    (): Schema.Codec<Stripesetup_attempt_payment_method_details_card_present> =>
      Schema.StructWithRest(
        Schema.Struct({
          generated_card: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Schema.suspend(
                  (): Schema.Codec<Stripepayment_method> =>
                    Stripepayment_method,
                ),
              ]).annotate({
                description:
                  "The ID of the Card PaymentMethod which was generated by this SetupAttempt.",
              }),
              Schema.Null,
            ]),
          ),
          offline: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayment_method_details_card_present_offline,
              ]).annotate({
                description: "Details about payments collected offline.",
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
        title: "setup_attempt_payment_method_details_card_present",
        description: "",
        identifier: "Stripesetup_attempt_payment_method_details_card_present",
      }),
  );
export const Stripesetup_attempt_payment_method_details_bancontact =
  Schema.StructWithRest(
    Schema.Struct({
      bank_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Bank code of bank associated with the bank account.",
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
            description: "Name of the bank associated with the bank account.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      bic: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Bank Identifier Code of the bank associated with the bank account.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      generated_sepa_debit: Schema.optionalKey(
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
              "The ID of the SEPA Direct Debit PaymentMethod which was generated by this SetupAttempt.",
          }),
          Schema.Null,
        ]),
      ),
      generated_sepa_debit_mandate: Schema.optionalKey(
        Schema.Union([
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripemandate> => Stripemandate),
          ]).annotate({
            description:
              "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this SetupAttempt.",
          }),
          Schema.Null,
        ]),
      ),
      iban_last4: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Last four characters of the IBAN.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      preferred_language: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["de", "en", "fr", "nl"]).annotate({
            description:
              "Preferred language of the Bancontact authorization page that the customer is redirected to.\nCan be one of `en`, `de`, `fr`, or `nl`",
          }),
          Schema.Null,
        ]),
      ),
      verified_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Owner's verified full name. Values are verified or provided by Bancontact directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
    title: "setup_attempt_payment_method_details_bancontact",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_bancontact",
  });
export const Stripesetup_attempt_payment_method_details_acss_debit =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_acss_debit",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_acss_debit",
  });
export const Stripesetup_attempt_payment_method_details_amazon_pay =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_amazon_pay",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_amazon_pay",
  });
export const Stripesetup_attempt_payment_method_details_au_becs_debit =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_au_becs_debit",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_au_becs_debit",
  });
export const Stripesetup_attempt_payment_method_details_bacs_debit =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_bacs_debit",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_bacs_debit",
  });
export const Stripesetup_attempt_payment_method_details_blik =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique and immutable identifier assigned by BLIK to every buyer.",
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
    title: "setup_attempt_payment_method_details_blik",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_blik",
  });
export const Stripesetup_attempt_payment_method_details_boleto = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_boleto",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_boleto",
});
export const Stripesetup_attempt_payment_method_details_card_checks =
  Schema.StructWithRest(
    Schema.Struct({
      address_line1_check: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If a address line1 was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      address_postal_code_check: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If a address postal code was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      cvc_check: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If a CVC was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.",
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
    title: "setup_attempt_payment_method_details_card_checks",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_card_checks",
  });
export const Stripesetup_attempt_payment_method_details_cashapp = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_cashapp",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_cashapp",
});
export const Stripesetup_attempt_payment_method_details_kakao_pay =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_kakao_pay",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_kakao_pay",
  });
export const Stripesetup_attempt_payment_method_details_klarna = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_klarna",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_klarna",
});
export const Stripesetup_attempt_payment_method_details_kr_card = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_kr_card",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_kr_card",
});
export const Stripesetup_attempt_payment_method_details_link = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_link",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_link",
});
export const Stripesetup_attempt_payment_method_details_naver_pay =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Uniquely identifies this particular Naver Pay account. You can use this attribute to check whether two Naver Pay accounts are the same.",
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
    title: "setup_attempt_payment_method_details_naver_pay",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_naver_pay",
  });
export const Stripesetup_attempt_payment_method_details_nz_bank_account =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_nz_bank_account",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_nz_bank_account",
  });
export const Stripesetup_attempt_payment_method_details_paypal = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_paypal",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_paypal",
});
export const Stripesetup_attempt_payment_method_details_payto = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_payto",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_payto",
});
export const Stripesetup_attempt_payment_method_details_pix =
  Schema.StructWithRest(
    Schema.Struct({
      fingerprint: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Uniquely identifies this particular Pix account. You can use this attribute to check whether two Pix accounts are the same.",
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
    title: "setup_attempt_payment_method_details_pix",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_pix",
  });
export const Stripesetup_attempt_payment_method_details_revolut_pay =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_revolut_pay",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_revolut_pay",
  });
export const Stripesetup_attempt_payment_method_details_sepa_debit =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_sepa_debit",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_sepa_debit",
  });
export const Stripesetup_attempt_payment_method_details_twint = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_twint",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_twint",
});
export const Stripesetup_attempt_payment_method_details_upi = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_attempt_payment_method_details_upi",
  description: "",
  identifier: "Stripesetup_attempt_payment_method_details_upi",
});
export const Stripesetup_attempt_payment_method_details_us_bank_account =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_attempt_payment_method_details_us_bank_account",
    description: "",
    identifier: "Stripesetup_attempt_payment_method_details_us_bank_account",
  });
export const Stripesetup_intent_next_action_pix_display_qr_code =
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
        description: "The date (unix timestamp) when the PIX expires.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      hosted_instructions_url: Schema.String.annotate({
        description:
          "The URL to the hosted pix instructions page, which allows customers to view the pix QR code.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_png: Schema.String.annotate({
        description: "The image_url_png string used to render png QR code",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      image_url_svg: Schema.String.annotate({
        description: "The image_url_svg string used to render svg QR code",
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
    title: "SetupIntentNextActionPixDisplayQrCode",
    description: "",
    identifier: "Stripesetup_intent_next_action_pix_display_qr_code",
  });
export const Stripesetup_intent_next_action_redirect_to_url =
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
              "The URL you must redirect your customer to in order to authenticate.",
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
    title: "SetupIntentNextActionRedirectToUrl",
    description: "",
    identifier: "Stripesetup_intent_next_action_redirect_to_url",
  });
export const Stripesetup_intent_next_action_verify_with_microdeposits =
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
    title: "SetupIntentNextActionVerifyWithMicrodeposits",
    description: "",
    identifier: "Stripesetup_intent_next_action_verify_with_microdeposits",
  });
export const Stripesetup_intent_payment_method_options_mandate_options_acss_debit =
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
    title: "setup_intent_payment_method_options_mandate_options_acss_debit",
    description: "",
    identifier:
      "Stripesetup_intent_payment_method_options_mandate_options_acss_debit",
  });
export const Stripesetup_intent_payment_method_options_mandate_options_payto =
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
    title: "setup_intent_payment_method_options_mandate_options_payto",
    description: "",
    identifier:
      "Stripesetup_intent_payment_method_options_mandate_options_payto",
  });
export const Stripesetup_intent_payment_method_options_amazon_pay =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_intent_payment_method_options_amazon_pay",
    description: "",
    identifier: "Stripesetup_intent_payment_method_options_amazon_pay",
  });
export const Stripesetup_intent_payment_method_options_mandate_options_bacs_debit =
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
    title: "setup_intent_payment_method_options_mandate_options_bacs_debit",
    description: "",
    identifier:
      "Stripesetup_intent_payment_method_options_mandate_options_bacs_debit",
  });
export const Stripesetup_intent_payment_method_options_bizum = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_intent_payment_method_options_bizum",
  description: "",
  identifier: "Stripesetup_intent_payment_method_options_bizum",
});
export const Stripesetup_intent_payment_method_options_mandate_options_blik =
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
    title: "setup_intent_payment_method_options_mandate_options_blik",
    description: "",
    identifier:
      "Stripesetup_intent_payment_method_options_mandate_options_blik",
  });
export const Stripesetup_intent_payment_method_options_card_mandate_options =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.Number.annotate({
        description:
          "Amount to be charged for future payments, specified in the presentment currency.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      amount_type: Schema.Literals(["fixed", "maximum"]).annotate({
        description:
          "One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.",
      }),
      currency: Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        format: "currency",
      }),
      description: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A description of the mandate or subscription that is meant to be displayed to the customer.",
          }).check(
            Schema.isMaxCodePoints(200).annotate({
              expected: "a string with at most 200 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      end_date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "End date of the mandate or subscription. If not provided, the mandate will be active until canceled. If provided, end date should be after start date.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      interval: Schema.Literals([
        "day",
        "month",
        "sporadic",
        "week",
        "year",
      ]).annotate({
        description:
          "Specifies payment frequency. One of `day`, `week`, `month`, `year`, or `sporadic`.",
      }),
      interval_count: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The number of intervals between payments. For example, `interval=month` and `interval_count=3` indicates one payment every three months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks). This parameter is optional when `interval=sporadic`.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      reference: Schema.String.annotate({
        description: "Unique identifier for the mandate or subscription.",
      }).check(
        Schema.isMaxCodePoints(80).annotate({
          expected: "a string with at most 80 code points",
        }),
      ),
      start_date: Schema.Number.annotate({
        description:
          "Start date of the mandate or subscription. Start date should not be lesser than yesterday.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      supported_types: Schema.optionalKey(
        Schema.Union([
          Schema.Array(Schema.Literal("india")).annotate({
            description:
              "Specifies the type of mandates supported. Possible values are `india`.",
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
    title: "setup_intent_payment_method_options_card_mandate_options",
    description: "",
    identifier:
      "Stripesetup_intent_payment_method_options_card_mandate_options",
  });
export const Stripesetup_intent_payment_method_options_card_present =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "setup_intent_payment_method_options_card_present",
    description: "",
    identifier: "Stripesetup_intent_payment_method_options_card_present",
  });
export const Stripesetup_intent_payment_method_options_klarna =
  Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The currency of the setup intent. Three letter ISO currency code.",
            format: "currency",
          }),
          Schema.Null,
        ]),
      ),
      preferred_locale: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Preferred locale of the Klarna checkout page that the customer is redirected to.",
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
    title: "setup_intent_payment_method_options_klarna",
    description: "",
    identifier: "Stripesetup_intent_payment_method_options_klarna",
  });
export const Stripesetup_intent_payment_method_options_link = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "setup_intent_payment_method_options_link",
  description: "",
  identifier: "Stripesetup_intent_payment_method_options_link",
});
export const Stripesetup_intent_payment_method_options_paypal =
  Schema.StructWithRest(
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
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "setup_intent_payment_method_options_paypal",
    description: "",
    identifier: "Stripesetup_intent_payment_method_options_paypal",
  });
export const Stripesetup_intent_payment_method_options_mandate_options_sepa_debit =
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
    title: "setup_intent_payment_method_options_mandate_options_sepa_debit",
    description: "",
    identifier:
      "Stripesetup_intent_payment_method_options_mandate_options_sepa_debit",
  });
export const Stripesetup_attempt_payment_method_details_card_wallet =
  Schema.suspend(
    (): Schema.Codec<Stripesetup_attempt_payment_method_details_card_wallet> =>
      Schema.StructWithRest(
        Schema.Struct({
          apple_pay: Schema.optionalKey(
            Stripepayment_method_details_card_wallet_apple_pay,
          ),
          google_pay: Schema.optionalKey(
            Stripepayment_method_details_card_wallet_google_pay,
          ),
          type: Schema.Literals(["apple_pay", "google_pay", "link"]).annotate({
            description:
              "The type of the card wallet, one of `apple_pay`, `google_pay`, or `link`. An additional hash is included on the Wallet subhash with a name matching this value. It contains additional information specific to the card wallet type.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "setup_attempt_payment_method_details_card_wallet",
        description: "",
        identifier: "Stripesetup_attempt_payment_method_details_card_wallet",
      }),
  );
export const Stripesetup_intent_payment_method_options_pix = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent_payment_method_options_pix> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripepayment_method_options_mandate_options_pix,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "setup_intent_payment_method_options_pix",
      description: "",
      identifier: "Stripesetup_intent_payment_method_options_pix",
    }),
);
export const Stripesetup_intent_payment_method_options_acss_debit =
  Schema.suspend(
    (): Schema.Codec<Stripesetup_intent_payment_method_options_acss_debit> =>
      Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["cad", "usd"]).annotate({
                description: "Currency supported by the bank account",
              }),
              Schema.Null,
            ]),
          ),
          mandate_options: Schema.optionalKey(
            Stripesetup_intent_payment_method_options_mandate_options_acss_debit,
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
        title: "setup_intent_payment_method_options_acss_debit",
        description: "",
        identifier: "Stripesetup_intent_payment_method_options_acss_debit",
      }),
  );
export const Stripesetup_intent_type_specific_payment_method_options_client =
  Schema.suspend(
    (): Schema.Codec<Stripesetup_intent_type_specific_payment_method_options_client> =>
      Schema.StructWithRest(
        Schema.Struct({
          mandate_options: Schema.optionalKey(
            Stripesetup_intent_payment_method_options_mandate_options_payto,
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
        title: "SetupIntentTypeSpecificPaymentMethodOptionsClient",
        description: "",
        identifier:
          "Stripesetup_intent_type_specific_payment_method_options_client",
      }),
  );
export const Stripesetup_intent_payment_method_options_payto = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent_payment_method_options_payto> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripesetup_intent_payment_method_options_mandate_options_payto,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "setup_intent_payment_method_options_payto",
      description: "",
      identifier: "Stripesetup_intent_payment_method_options_payto",
    }),
);
export const Stripesetup_intent_payment_method_options_bacs_debit =
  Schema.suspend(
    (): Schema.Codec<Stripesetup_intent_payment_method_options_bacs_debit> =>
      Schema.StructWithRest(
        Schema.Struct({
          mandate_options: Schema.optionalKey(
            Stripesetup_intent_payment_method_options_mandate_options_bacs_debit,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "setup_intent_payment_method_options_bacs_debit",
        description: "",
        identifier: "Stripesetup_intent_payment_method_options_bacs_debit",
      }),
  );
export const Stripesetup_intent_payment_method_options_blik = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent_payment_method_options_blik> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripesetup_intent_payment_method_options_mandate_options_blik,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "setup_intent_payment_method_options_blik",
      description: "",
      identifier: "Stripesetup_intent_payment_method_options_blik",
    }),
);
export const Stripesetup_intent_payment_method_options_card = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent_payment_method_options_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesetup_intent_payment_method_options_card_mandate_options,
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
                "Selected network to process this SetupIntent on. Depends on the available networks of the card attached to the setup intent. Can be only set confirm-time.",
            }),
            Schema.Null,
          ]),
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
        setup_credential_usage: Schema.optionalKey(
          Schema.Literals(["installment", "recurring", "unscheduled"]).annotate(
            {
              description:
                "Set to indicate the future transaction type usage for the card being set up.",
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
      title: "setup_intent_payment_method_options_card",
      description: "",
      identifier: "Stripesetup_intent_payment_method_options_card",
    }),
);
export const Stripesetup_intent_payment_method_options_sepa_debit =
  Schema.suspend(
    (): Schema.Codec<Stripesetup_intent_payment_method_options_sepa_debit> =>
      Schema.StructWithRest(
        Schema.Struct({
          mandate_options: Schema.optionalKey(
            Stripesetup_intent_payment_method_options_mandate_options_sepa_debit,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "setup_intent_payment_method_options_sepa_debit",
        description: "",
        identifier: "Stripesetup_intent_payment_method_options_sepa_debit",
      }),
  );
export const Stripesetup_intent_payment_method_options_upi = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent_payment_method_options_upi> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripepayment_method_options_mandate_options_upi,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "setup_intent_payment_method_options_upi",
      description: "",
      identifier: "Stripesetup_intent_payment_method_options_upi",
    }),
);
export const Stripesetup_attempt_payment_method_details_card = Schema.suspend(
  (): Schema.Codec<Stripesetup_attempt_payment_method_details_card> =>
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
        checks: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesetup_attempt_payment_method_details_card_checks,
            ]).annotate({
              description:
                "Check results by Card networks on Card address and CVC at the time of authorization",
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
        network: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Identifies which network this charge was processed on. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`, `mastercard`, `unionpay`, `visa`, or `unknown`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        three_d_secure: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripethree_d_secure_details]).annotate({
              description:
                "Populated if this authorization used 3D Secure authentication.",
            }),
            Schema.Null,
          ]),
        ),
        wallet: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesetup_attempt_payment_method_details_card_wallet,
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
      title: "setup_attempt_payment_method_details_card",
      description: "",
      identifier: "Stripesetup_attempt_payment_method_details_card",
    }),
);
export const Stripesetup_intent_next_action = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent_next_action> =>
    Schema.StructWithRest(
      Schema.Struct({
        blik_authorize: Schema.optionalKey(
          Stripepayment_intent_next_action_blik_authorize,
        ),
        cashapp_handle_redirect_or_display_qr_code: Schema.optionalKey(
          Stripepayment_intent_next_action_cashapp_handle_redirect_or_display_qr_code,
        ),
        pix_display_qr_code: Schema.optionalKey(
          Stripesetup_intent_next_action_pix_display_qr_code,
        ),
        redirect_to_url: Schema.optionalKey(
          Stripesetup_intent_next_action_redirect_to_url,
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
              "When confirming a SetupIntent with Stripe.js, Stripe.js depends on the contents of this dictionary to invoke authentication flows. The shape of the contents is subject to change and is only intended to be used by Stripe.js.",
          }),
        ),
        verify_with_microdeposits: Schema.optionalKey(
          Stripesetup_intent_next_action_verify_with_microdeposits,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "SetupIntentNextAction",
      description: "",
      identifier: "Stripesetup_intent_next_action",
    }),
);
export const Stripesetup_intent_payment_method_options_us_bank_account =
  Schema.suspend(
    (): Schema.Codec<Stripesetup_intent_payment_method_options_us_bank_account> =>
      Schema.StructWithRest(
        Schema.Struct({
          financial_connections: Schema.optionalKey(
            Stripelinked_account_options_common,
          ),
          mandate_options: Schema.optionalKey(
            Stripepayment_method_options_us_bank_account_mandate_options,
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
        title: "setup_intent_payment_method_options_us_bank_account",
        description: "",
        identifier: "Stripesetup_intent_payment_method_options_us_bank_account",
      }),
  );
export const Stripesetup_intent_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripesetup_intent_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_acss_debit,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_amazon_pay,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_bacs_debit,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        bizum: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_bizum,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        blik: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_blik,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        card: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_card,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        card_present: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_card_present,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        klarna: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_klarna,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        link: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_link,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        paypal: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_paypal,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        payto: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_payto,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        pix: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_pix,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_sepa_debit,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        upi: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_upi,
            Stripesetup_intent_type_specific_payment_method_options_client,
          ]),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.Union([
            Stripesetup_intent_payment_method_options_us_bank_account,
            Stripesetup_intent_type_specific_payment_method_options_client,
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
      title: "SetupIntentPaymentMethodOptions",
      description: "",
      identifier: "Stripesetup_intent_payment_method_options",
    }),
);
