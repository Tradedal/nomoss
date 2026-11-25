// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  Stripeaddress,
  Stripeamazon_pay_underlying_payment_method_funding_details,
  Stripeinternal_card,
  Stripeklarna_payer_details,
  Stripemandate,
  Stripepaypal_seller_protection,
  Striperevolut_pay_underlying_payment_method_funding_details,
  Stripethree_d_secure_details_charge,
} from "./common.js";
import { Stripepayment_method } from "./paymentMethods.js";
import {
  Stripepayment_flows_private_payment_methods_alma_details_resource_installments,
  Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization,
  Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization,
  Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture,
  Stripepayment_flows_private_payment_methods_card_details_api_resource_multicapture,
  Stripepayment_flows_private_payment_methods_card_present_common_wallet,
  Stripepayment_flows_private_payment_methods_konbini_details_resource_store,
  Stripepayments_primitives_payment_records_resource_payment_method_alma_details_resource_installments,
  Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding,
  Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details,
  Stripepayments_primitives_payment_records_resource_payment_method_konbini_details_resource_store,
  Stripepayments_primitives_payment_records_resource_payment_method_mobilepay_details_resource_card,
  Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding,
} from "./payments.js";

export type Stripepayment_method_details = {
  readonly ach_credit_transfer?: Stripepayment_method_details_ach_credit_transfer;
  readonly ach_debit?: Stripepayment_method_details_ach_debit;
  readonly acss_debit?: Stripepayment_method_details_acss_debit;
  readonly affirm?: Stripepayment_method_details_affirm;
  readonly afterpay_clearpay?: Stripepayment_method_details_afterpay_clearpay;
  readonly alipay?: Stripepayment_method_details_alipay;
  readonly alma?: Stripepayment_method_details_alma;
  readonly amazon_pay?: Stripepayment_method_details_amazon_pay;
  readonly au_becs_debit?: Stripepayment_method_details_au_becs_debit;
  readonly bacs_debit?: Stripepayment_method_details_bacs_debit;
  readonly bancontact?: Stripepayment_method_details_bancontact;
  readonly billie?: Stripepayment_method_details_billie;
  readonly bizum?: Stripepayment_method_details_bizum;
  readonly blik?: Stripepayment_method_details_blik;
  readonly boleto?: Stripepayment_method_details_boleto;
  readonly card?: Stripepayment_method_details_card;
  readonly card_present?: Stripepayment_method_details_card_present;
  readonly cashapp?: Stripepayment_method_details_cashapp;
  readonly crypto?: Stripepayment_method_details_crypto;
  readonly customer_balance?: Stripepayment_method_details_customer_balance;
  readonly eps?: Stripepayment_method_details_eps;
  readonly fpx?: Stripepayment_method_details_fpx;
  readonly giropay?: Stripepayment_method_details_giropay;
  readonly grabpay?: Stripepayment_method_details_grabpay;
  readonly ideal?: Stripepayment_method_details_ideal;
  readonly interac_present?: Stripepayment_method_details_interac_present;
  readonly kakao_pay?: Stripepayment_method_details_kakao_pay;
  readonly klarna?: Stripepayment_method_details_klarna;
  readonly konbini?: Stripepayment_method_details_konbini;
  readonly kr_card?: Stripepayment_method_details_kr_card;
  readonly link?: Stripepayment_method_details_link;
  readonly mb_way?: Stripepayment_method_details_mb_way;
  readonly mobilepay?: Stripepayment_method_details_mobilepay;
  readonly multibanco?: Stripepayment_method_details_multibanco;
  readonly naver_pay?: Stripepayment_method_details_naver_pay;
  readonly nz_bank_account?: Stripepayment_method_details_nz_bank_account;
  readonly oxxo?: Stripepayment_method_details_oxxo;
  readonly p24?: Stripepayment_method_details_p24;
  readonly pay_by_bank?: Stripepayment_method_details_pay_by_bank;
  readonly payco?: Stripepayment_method_details_payco;
  readonly paynow?: Stripepayment_method_details_paynow;
  readonly paypal?: Stripepayment_method_details_paypal;
  readonly paypay?: Stripepayment_method_details_paypay;
  readonly payto?: Stripepayment_method_details_payto;
  readonly pix?: Stripepayment_method_details_pix;
  readonly promptpay?: Stripepayment_method_details_promptpay;
  readonly revolut_pay?: Stripepayment_method_details_revolut_pay;
  readonly samsung_pay?: Stripepayment_method_details_samsung_pay;
  readonly satispay?: Stripepayment_method_details_satispay;
  readonly scalapay?: Stripepayment_method_details_scalapay;
  readonly sepa_debit?: Stripepayment_method_details_sepa_debit;
  readonly sequra?: Stripepayment_method_details_sequra;
  readonly sofort?: Stripepayment_method_details_sofort;
  readonly stripe_account?: Stripepayment_method_details_stripe_account;
  readonly sunbit?: Stripepayment_method_details_sunbit;
  readonly swish?: Stripepayment_method_details_swish;
  readonly twint?: Stripepayment_method_details_twint;
  readonly type: string;
  readonly upi?: Stripepayment_method_details_upi;
  readonly us_bank_account?: Stripepayment_method_details_us_bank_account;
  readonly wechat?: Stripepayment_method_details_wechat;
  readonly wechat_pay?: Stripepayment_method_details_wechat_pay;
  readonly zip?: Stripepayment_method_details_zip;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_sofort = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly country?: string | null;
  readonly generated_sepa_debit?: string | Stripepayment_method | null;
  readonly generated_sepa_debit_mandate?: string | Stripemandate | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?:
    | "de"
    | "en"
    | "es"
    | "fr"
    | "it"
    | "nl"
    | "pl"
    | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_ideal = {
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
  readonly transaction_id?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_bancontact = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly generated_sepa_debit?: string | Stripepayment_method | null;
  readonly generated_sepa_debit_mandate?: string | Stripemandate | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?: "de" | "en" | "fr" | "nl" | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_sofort = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly country?: string | null;
  readonly generated_sepa_debit?: string | Stripepayment_method | null;
  readonly generated_sepa_debit_mandate?: string | Stripemandate | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?:
    | "de"
    | "en"
    | "es"
    | "fr"
    | "it"
    | "nl"
    | "pl"
    | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_ideal = {
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
  readonly transaction_id?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_bancontact = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly generated_sepa_debit?: string | Stripepayment_method | null;
  readonly generated_sepa_debit_mandate?: string | Stripemandate | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?: "de" | "en" | "fr" | "nl" | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_present_offline = {
  readonly stored_at?: number | null;
  readonly type?: "deferred" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_present_receipt = {
  readonly account_type?: "checking" | "credit" | "prepaid" | "unknown";
  readonly application_cryptogram?: string | null;
  readonly application_preferred_name?: string | null;
  readonly authorization_code?: string | null;
  readonly authorization_response_code?: string | null;
  readonly cardholder_verification_method?: string | null;
  readonly dedicated_file_name?: string | null;
  readonly terminal_verification_results?: string | null;
  readonly transaction_status_information?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_wallet_apple_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_card_wallet_google_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_ach_credit_transfer = {
  readonly account_number?: string | null;
  readonly bank_name?: string | null;
  readonly routing_number?: string | null;
  readonly swift_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_ach_debit = {
  readonly account_holder_type?: "company" | "individual" | null;
  readonly bank_name?: string | null;
  readonly country?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly routing_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_acss_debit = {
  readonly bank_name?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly institution_number?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string;
  readonly transit_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_affirm = {
  readonly location?: string;
  readonly reader?: string;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_afterpay_clearpay = {
  readonly order_id?: string | null;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_alipay = {
  readonly buyer_id?: string;
  readonly fingerprint?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_passthrough_card = {
  readonly brand?: string | null;
  readonly country?: string | null;
  readonly exp_month?: number | null;
  readonly exp_year?: number | null;
  readonly funding?: string | null;
  readonly last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_au_becs_debit = {
  readonly bsb_number?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_bacs_debit = {
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | null;
  readonly sort_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_billie = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_bizum = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_blik = {
  readonly buyer_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_boleto = {
  readonly tax_id: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_checks = {
  readonly address_line1_check?: string | null;
  readonly address_postal_code_check?: string | null;
  readonly cvc_check?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_installments_plan = {
  readonly count?: number | null;
  readonly interval?: "month" | null;
  readonly type: "bonus" | "fixed_count" | "revolving";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_network_token = {
  readonly used: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_wallet_amex_express_checkout = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_card_wallet_link = {
  readonly funding_source_group?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_wallet_samsung_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_cashapp = {
  readonly buyer_id?: string | null;
  readonly cashtag?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_crypto = {
  readonly buyer_address?: string;
  readonly network?:
    | "base"
    | "ethereum"
    | "polygon"
    | "solana"
    | "sui"
    | "tempo";
  readonly token_currency?:
    | "ousd"
    | "phantom_cash"
    | "usdc"
    | "usdg"
    | "usdp"
    | "usdsui"
    | "usdt";
  readonly transaction_hash?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_customer_balance = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_eps = {
  readonly bank?:
    | "arzte_und_apotheker_bank"
    | "austrian_anadi_bank_ag"
    | "bank_austria"
    | "bankhaus_carl_spangler"
    | "bankhaus_schelhammer_und_schattera_ag"
    | "bawag_psk_ag"
    | "bks_bank_ag"
    | "brull_kallmus_bank_ag"
    | "btv_vier_lander_bank"
    | "capital_bank_grawe_gruppe_ag"
    | "deutsche_bank_ag"
    | "dolomitenbank"
    | "easybank_ag"
    | "erste_bank_und_sparkassen"
    | "hypo_alpeadriabank_international_ag"
    | "hypo_bank_burgenland_aktiengesellschaft"
    | "hypo_noe_lb_fur_niederosterreich_u_wien"
    | "hypo_oberosterreich_salzburg_steiermark"
    | "hypo_tirol_bank_ag"
    | "hypo_vorarlberg_bank_ag"
    | "marchfelder_bank"
    | "oberbank_ag"
    | "raiffeisen_bankengruppe_osterreich"
    | "schoellerbank_ag"
    | "sparda_bank_wien"
    | "volksbank_gruppe"
    | "volkskreditbank_ag"
    | "vr_bank_braunau"
    | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_fpx = {
  readonly bank:
    | "affin_bank"
    | "agrobank"
    | "alliance_bank"
    | "ambank"
    | "bank_islam"
    | "bank_muamalat"
    | "bank_of_china"
    | "bank_rakyat"
    | "bnp_paribas"
    | "bsn"
    | "cimb"
    | "citibank"
    | "deutsche_bank"
    | "hong_leong_bank"
    | "hsbc"
    | "kfh"
    | "maybank2e"
    | "maybank2u"
    | "mbsb_bank"
    | "ocbc"
    | "pb_enterprise"
    | "public_bank"
    | "rhb"
    | "standard_chartered"
    | "uob";
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_giropay = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_grabpay = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_interac_present_receipt = {
  readonly account_type?: "checking" | "savings" | "unknown";
  readonly application_cryptogram?: string | null;
  readonly application_preferred_name?: string | null;
  readonly authorization_code?: string | null;
  readonly authorization_response_code?: string | null;
  readonly cardholder_verification_method?: string | null;
  readonly dedicated_file_name?: string | null;
  readonly terminal_verification_results?: string | null;
  readonly transaction_status_information?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_kakao_pay = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_kr_card = {
  readonly brand?:
    | "bc"
    | "citi"
    | "hana"
    | "hyundai"
    | "jeju"
    | "jeonbuk"
    | "kakaobank"
    | "kbank"
    | "kdbbank"
    | "kookmin"
    | "kwangju"
    | "lotte"
    | "mg"
    | "nh"
    | "post"
    | "samsung"
    | "savingsbank"
    | "shinhan"
    | "shinhyup"
    | "suhyup"
    | "tossbank"
    | "woori"
    | null;
  readonly buyer_id?: string | null;
  readonly last4?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_link = {
  readonly country?: string | null;
  readonly funding_source_group?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_mb_way = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_multibanco = {
  readonly entity?: string | null;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_naver_pay = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_nz_bank_account = {
  readonly account_holder_name?: string | null;
  readonly bank_code: string;
  readonly bank_name: string;
  readonly branch_code: string;
  readonly expected_debit_date?: string;
  readonly last4: string;
  readonly suffix?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_oxxo = {
  readonly number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_p24 = {
  readonly bank?:
    | "alior_bank"
    | "bank_millennium"
    | "bank_nowy_bfg_sa"
    | "bank_pekao_sa"
    | "banki_spbdzielcze"
    | "blik"
    | "bnp_paribas"
    | "boz"
    | "citi_handlowy"
    | "credit_agricole"
    | "envelobank"
    | "etransfer_pocztowy24"
    | "getin_bank"
    | "ideabank"
    | "ing"
    | "inteligo"
    | "mbank_mtransfer"
    | "nest_przelew"
    | "noble_pay"
    | "pbac_z_ipko"
    | "plus_bank"
    | "santander_przelew24"
    | "tmobile_usbugi_bankowe"
    | "toyota_bank"
    | "velobank"
    | "volkswagen_bank"
    | null;
  readonly reference?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_pay_by_bank = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_payco = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_paynow = {
  readonly location?: string;
  readonly reader?: string;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_paypay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_payto = {
  readonly bsb_number?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string;
  readonly pay_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_pix = {
  readonly bank_transaction_id?: string | null;
  readonly fingerprint?: string | null;
  readonly mandate?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_promptpay = {
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_samsung_pay = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_satispay = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_scalapay = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_sepa_debit = {
  readonly bank_code?: string | null;
  readonly branch_code?: string | null;
  readonly country?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_sequra = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_stripe_account = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_sunbit = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_swish = {
  readonly fingerprint?: string | null;
  readonly payment_reference?: string | null;
  readonly verified_phone_last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_twint = {
  readonly mandate?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_upi = {
  readonly vpa?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_us_bank_account = {
  readonly account_holder_type?: "company" | "individual" | null;
  readonly account_type?: "checking" | "savings" | null;
  readonly bank_name?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | Stripemandate;
  readonly payment_reference?: string | null;
  readonly routing_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_wechat = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_wechat_pay = {
  readonly fingerprint?: string | null;
  readonly location?: string;
  readonly reader?: string;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_zip = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_payment_record_acss_debit = {
  readonly bank_name?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly institution_number?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string;
  readonly transit_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_affirm = {
  readonly location?: string;
  readonly reader?: string;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_afterpay_clearpay = {
  readonly order_id?: string | null;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_alipay = {
  readonly buyer_id?: string;
  readonly fingerprint?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_au_becs_debit = {
  readonly bsb_number?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_bacs_debit = {
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | null;
  readonly sort_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_billie = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_bizum = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_blik = {
  readonly buyer_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_boleto = {
  readonly tax_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_cashapp = {
  readonly buyer_id?: string | null;
  readonly cashtag?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_eps = {
  readonly bank?:
    | "arzte_und_apotheker_bank"
    | "austrian_anadi_bank_ag"
    | "bank_austria"
    | "bankhaus_carl_spangler"
    | "bankhaus_schelhammer_und_schattera_ag"
    | "bawag_psk_ag"
    | "bks_bank_ag"
    | "brull_kallmus_bank_ag"
    | "btv_vier_lander_bank"
    | "capital_bank_grawe_gruppe_ag"
    | "deutsche_bank_ag"
    | "dolomitenbank"
    | "easybank_ag"
    | "erste_bank_und_sparkassen"
    | "hypo_alpeadriabank_international_ag"
    | "hypo_bank_burgenland_aktiengesellschaft"
    | "hypo_noe_lb_fur_niederosterreich_u_wien"
    | "hypo_oberosterreich_salzburg_steiermark"
    | "hypo_tirol_bank_ag"
    | "hypo_vorarlberg_bank_ag"
    | "marchfelder_bank"
    | "oberbank_ag"
    | "raiffeisen_bankengruppe_osterreich"
    | "schoellerbank_ag"
    | "sparda_bank_wien"
    | "volksbank_gruppe"
    | "volkskreditbank_ag"
    | "vr_bank_braunau"
    | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_giropay = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_kakao_pay = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_link = {
  readonly country?: string | null;
  readonly funding_source_group?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_mb_way = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_payment_record_momo = {
  readonly fingerprint?: string | null;
  readonly mandate?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_multibanco = {
  readonly entity?: string | null;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_naver_pay = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_nz_bank_account = {
  readonly account_holder_name?: string | null;
  readonly bank_code: string;
  readonly bank_name: string;
  readonly branch_code: string;
  readonly expected_debit_date?: string;
  readonly last4: string;
  readonly suffix?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_oxxo = {
  readonly number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_p24 = {
  readonly bank?:
    | "alior_bank"
    | "bank_millennium"
    | "bank_nowy_bfg_sa"
    | "bank_pekao_sa"
    | "banki_spbdzielcze"
    | "blik"
    | "bnp_paribas"
    | "boz"
    | "citi_handlowy"
    | "credit_agricole"
    | "envelobank"
    | "etransfer_pocztowy24"
    | "getin_bank"
    | "ideabank"
    | "ing"
    | "inteligo"
    | "mbank_mtransfer"
    | "nest_przelew"
    | "noble_pay"
    | "pbac_z_ipko"
    | "plus_bank"
    | "santander_przelew24"
    | "tmobile_usbugi_bankowe"
    | "toyota_bank"
    | "velobank"
    | "volkswagen_bank"
    | null;
  readonly reference?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_pay_by_bank = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_payment_record_payco = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_paynow = {
  readonly location?: string;
  readonly reader?: string;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_paypay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_payment_record_payto = {
  readonly bsb_number?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string;
  readonly pay_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_pix = {
  readonly bank_transaction_id?: string | null;
  readonly mandate?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_promptpay = {
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_samsung_pay = {
  readonly buyer_id?: string | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_satispay = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_scalapay = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_sepa_debit = {
  readonly bank_code?: string | null;
  readonly branch_code?: string | null;
  readonly country?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_sequra = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_sunbit = {
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_swish = {
  readonly fingerprint?: string | null;
  readonly payment_reference?: string | null;
  readonly verified_phone_last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_twint = {
  readonly mandate?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_upi = {
  readonly vpa?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_us_bank_account = {
  readonly account_holder_type?: "company" | "individual" | null;
  readonly account_type?: "checking" | "savings" | null;
  readonly bank_name?: string | null;
  readonly expected_debit_date?: string;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate?: string | Stripemandate;
  readonly payment_reference?: string | null;
  readonly routing_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_wechat_pay = {
  readonly fingerprint?: string | null;
  readonly location?: string;
  readonly reader?: string;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_zip = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_details_card_wallet_masterpass = {
  readonly billing_address?: Stripeaddress | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly shipping_address?: Stripeaddress | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_wallet_visa_checkout = {
  readonly billing_address?: Stripeaddress | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly shipping_address?: Stripeaddress | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_present = {
  readonly amount_authorized?: number | null;
  readonly brand?: string | null;
  readonly brand_product?: string | null;
  readonly capture_before?: number;
  readonly cardholder_name?: string | null;
  readonly country?: string | null;
  readonly description?: string | null;
  readonly emv_auth_data?: string | null;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly fingerprint?: string | null;
  readonly funding?: string | null;
  readonly generated_card?: string | null;
  readonly incremental_authorization_supported: boolean;
  readonly issuer?: string | null;
  readonly last4?: string | null;
  readonly location?: string;
  readonly network?: string | null;
  readonly network_transaction_id?: string | null;
  readonly offline?: Stripepayment_method_details_card_present_offline | null;
  readonly overcapture_supported: boolean;
  readonly preferred_locales?: ReadonlyArray<string> | null;
  readonly read_method?:
    | "contact_emv"
    | "contactless_emv"
    | "contactless_magstripe_mode"
    | "magnetic_stripe_fallback"
    | "magnetic_stripe_track2"
    | null;
  readonly reader?: string;
  readonly receipt?: Stripepayment_method_details_card_present_receipt | null;
  readonly wallet?: Stripepayment_flows_private_payment_methods_card_present_common_wallet;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_alma = {
  readonly installments?: Stripepayment_flows_private_payment_methods_alma_details_resource_installments;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_installments = {
  readonly plan?: Stripepayment_method_details_card_installments_plan | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_interac_present = {
  readonly brand?: string | null;
  readonly cardholder_name?: string | null;
  readonly country?: string | null;
  readonly description?: string | null;
  readonly emv_auth_data?: string | null;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly fingerprint?: string | null;
  readonly funding?: string | null;
  readonly generated_card?: string | null;
  readonly issuer?: string | null;
  readonly last4?: string | null;
  readonly location?: string;
  readonly network?: string | null;
  readonly network_transaction_id?: string | null;
  readonly preferred_locales?: ReadonlyArray<string> | null;
  readonly read_method?:
    | "contact_emv"
    | "contactless_emv"
    | "contactless_magstripe_mode"
    | "magnetic_stripe_fallback"
    | "magnetic_stripe_track2"
    | null;
  readonly reader?: string;
  readonly receipt?: Stripepayment_method_details_interac_present_receipt | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_konbini = {
  readonly store?: Stripepayment_flows_private_payment_methods_konbini_details_resource_store | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_mobilepay = {
  readonly card?: Stripeinternal_card | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_paypal = {
  readonly country?: string | null;
  readonly payer_email?: string | null;
  readonly payer_id?: string | null;
  readonly payer_name?: string | null;
  readonly seller_protection?: Stripepaypal_seller_protection | null;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_alma = {
  readonly installments?: Stripepayments_primitives_payment_records_resource_payment_method_alma_details_resource_installments;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_konbini = {
  readonly store?: Stripepayments_primitives_payment_records_resource_payment_method_konbini_details_resource_store | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_mobilepay = {
  readonly card?: Stripepayments_primitives_payment_records_resource_payment_method_mobilepay_details_resource_card | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card_wallet = {
  readonly amex_express_checkout?: Stripepayment_method_details_card_wallet_amex_express_checkout;
  readonly apple_pay?: Stripepayment_method_details_card_wallet_apple_pay;
  readonly dynamic_last4?: string | null;
  readonly google_pay?: Stripepayment_method_details_card_wallet_google_pay;
  readonly link?: Stripepayment_method_details_card_wallet_link;
  readonly masterpass?: Stripepayment_method_details_card_wallet_masterpass;
  readonly samsung_pay?: Stripepayment_method_details_card_wallet_samsung_pay;
  readonly type:
    | "amex_express_checkout"
    | "apple_pay"
    | "google_pay"
    | "link"
    | "masterpass"
    | "samsung_pay"
    | "visa_checkout";
  readonly visa_checkout?: Stripepayment_method_details_card_wallet_visa_checkout;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_amazon_pay = {
  readonly funding?: Stripeamazon_pay_underlying_payment_method_funding_details;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_revolut_pay = {
  readonly funding?: Striperevolut_pay_underlying_payment_method_funding_details;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_klarna = {
  readonly location?: string;
  readonly payer_details?: Stripeklarna_payer_details | null;
  readonly payment_method_category?: string | null;
  readonly preferred_locale?: string | null;
  readonly reader?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_amazon_pay = {
  readonly funding?: Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_klarna = {
  readonly location?: string;
  readonly payer_details?: Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details | null;
  readonly payment_method_category?: string | null;
  readonly preferred_locale?: string | null;
  readonly reader?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_payment_record_revolut_pay = {
  readonly funding?: Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding;
  readonly transaction_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_details_card = {
  readonly amount_authorized?: number | null;
  readonly authorization_code?: string | null;
  readonly brand?: string | null;
  readonly capture_before?: number;
  readonly checks?: Stripepayment_method_details_card_checks | null;
  readonly country?: string | null;
  readonly electronic_commerce_indicator?: string | null;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly extended_authorization?: Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization;
  readonly fingerprint?: string | null;
  readonly funding?: string | null;
  readonly incremental_authorization?: Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization;
  readonly installments?: Stripepayment_method_details_card_installments | null;
  readonly last4?: string | null;
  readonly mandate?: string | Stripemandate | null;
  readonly multicapture?: Stripepayment_flows_private_payment_methods_card_details_api_resource_multicapture;
  readonly network?: string | null;
  readonly network_token?: Stripepayment_method_details_card_network_token | null;
  readonly network_transaction_id?: string | null;
  readonly overcapture?: Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture;
  readonly regulated_status?: "regulated" | "unregulated" | null;
  readonly setup_credential_usage?: "installment" | "recurring" | "unscheduled";
  readonly stored_credential_usage?:
    | "installment"
    | "recurring"
    | "unscheduled";
  readonly three_d_secure?: Stripethree_d_secure_details_charge | null;
  readonly transaction_link_id?: string | null;
  readonly wallet?: Stripepayment_method_details_card_wallet | null;
} & { readonly [x: string]: Schema.Json };

export const Stripepayment_method_details = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        ach_credit_transfer: Schema.optionalKey(
          Stripepayment_method_details_ach_credit_transfer,
        ),
        ach_debit: Schema.optionalKey(Stripepayment_method_details_ach_debit),
        acss_debit: Schema.optionalKey(Stripepayment_method_details_acss_debit),
        affirm: Schema.optionalKey(Stripepayment_method_details_affirm),
        afterpay_clearpay: Schema.optionalKey(
          Stripepayment_method_details_afterpay_clearpay,
        ),
        alipay: Schema.optionalKey(Stripepayment_method_details_alipay),
        alma: Schema.optionalKey(Stripepayment_method_details_alma),
        amazon_pay: Schema.optionalKey(Stripepayment_method_details_amazon_pay),
        au_becs_debit: Schema.optionalKey(
          Stripepayment_method_details_au_becs_debit,
        ),
        bacs_debit: Schema.optionalKey(Stripepayment_method_details_bacs_debit),
        bancontact: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripepayment_method_details_bancontact> =>
              Stripepayment_method_details_bancontact,
          ),
        ),
        billie: Schema.optionalKey(Stripepayment_method_details_billie),
        bizum: Schema.optionalKey(Stripepayment_method_details_bizum),
        blik: Schema.optionalKey(Stripepayment_method_details_blik),
        boleto: Schema.optionalKey(Stripepayment_method_details_boleto),
        card: Schema.optionalKey(Stripepayment_method_details_card),
        card_present: Schema.optionalKey(
          Stripepayment_method_details_card_present,
        ),
        cashapp: Schema.optionalKey(Stripepayment_method_details_cashapp),
        crypto: Schema.optionalKey(Stripepayment_method_details_crypto),
        customer_balance: Schema.optionalKey(
          Stripepayment_method_details_customer_balance,
        ),
        eps: Schema.optionalKey(Stripepayment_method_details_eps),
        fpx: Schema.optionalKey(Stripepayment_method_details_fpx),
        giropay: Schema.optionalKey(Stripepayment_method_details_giropay),
        grabpay: Schema.optionalKey(Stripepayment_method_details_grabpay),
        ideal: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripepayment_method_details_ideal> =>
              Stripepayment_method_details_ideal,
          ),
        ),
        interac_present: Schema.optionalKey(
          Stripepayment_method_details_interac_present,
        ),
        kakao_pay: Schema.optionalKey(Stripepayment_method_details_kakao_pay),
        klarna: Schema.optionalKey(Stripepayment_method_details_klarna),
        konbini: Schema.optionalKey(Stripepayment_method_details_konbini),
        kr_card: Schema.optionalKey(Stripepayment_method_details_kr_card),
        link: Schema.optionalKey(Stripepayment_method_details_link),
        mb_way: Schema.optionalKey(Stripepayment_method_details_mb_way),
        mobilepay: Schema.optionalKey(Stripepayment_method_details_mobilepay),
        multibanco: Schema.optionalKey(Stripepayment_method_details_multibanco),
        naver_pay: Schema.optionalKey(Stripepayment_method_details_naver_pay),
        nz_bank_account: Schema.optionalKey(
          Stripepayment_method_details_nz_bank_account,
        ),
        oxxo: Schema.optionalKey(Stripepayment_method_details_oxxo),
        p24: Schema.optionalKey(Stripepayment_method_details_p24),
        pay_by_bank: Schema.optionalKey(
          Stripepayment_method_details_pay_by_bank,
        ),
        payco: Schema.optionalKey(Stripepayment_method_details_payco),
        paynow: Schema.optionalKey(Stripepayment_method_details_paynow),
        paypal: Schema.optionalKey(Stripepayment_method_details_paypal),
        paypay: Schema.optionalKey(Stripepayment_method_details_paypay),
        payto: Schema.optionalKey(Stripepayment_method_details_payto),
        pix: Schema.optionalKey(Stripepayment_method_details_pix),
        promptpay: Schema.optionalKey(Stripepayment_method_details_promptpay),
        revolut_pay: Schema.optionalKey(
          Stripepayment_method_details_revolut_pay,
        ),
        samsung_pay: Schema.optionalKey(
          Stripepayment_method_details_samsung_pay,
        ),
        satispay: Schema.optionalKey(Stripepayment_method_details_satispay),
        scalapay: Schema.optionalKey(Stripepayment_method_details_scalapay),
        sepa_debit: Schema.optionalKey(Stripepayment_method_details_sepa_debit),
        sequra: Schema.optionalKey(Stripepayment_method_details_sequra),
        sofort: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripepayment_method_details_sofort> =>
              Stripepayment_method_details_sofort,
          ),
        ),
        stripe_account: Schema.optionalKey(
          Stripepayment_method_details_stripe_account,
        ),
        sunbit: Schema.optionalKey(Stripepayment_method_details_sunbit),
        swish: Schema.optionalKey(Stripepayment_method_details_swish),
        twint: Schema.optionalKey(Stripepayment_method_details_twint),
        type: Schema.String.annotate({
          description:
            "The type of transaction-specific details of the payment method used in the payment. See [PaymentMethod.type](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type) for the full list of possible types.\nAn additional hash is included on `payment_method_details` with a name matching this value.\nIt contains information specific to the payment method.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        upi: Schema.optionalKey(Stripepayment_method_details_upi),
        us_bank_account: Schema.optionalKey(
          Stripepayment_method_details_us_bank_account,
        ),
        wechat: Schema.optionalKey(Stripepayment_method_details_wechat),
        wechat_pay: Schema.optionalKey(Stripepayment_method_details_wechat_pay),
        zip: Schema.optionalKey(Stripepayment_method_details_zip),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_details",
      description: "",
      identifier: "Stripepayment_method_details",
    }),
);
export const Stripepayment_method_details_sofort = Schema.StructWithRest(
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
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter ISO code representing the country the bank account is located in.",
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
            "The ID of the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
            "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
        Schema.Literals(["de", "en", "es", "fr", "it", "nl", "pl"]).annotate({
          description:
            "Preferred language of the SOFORT authorization page that the customer is redirected to.\nCan be one of `de`, `en`, `es`, `fr`, `it`, `nl`, or `pl`",
        }),
        Schema.Null,
      ]),
    ),
    verified_name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Owner's verified full name. Values are verified or provided by SOFORT directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
  title: "payment_method_details_sofort",
  description: "",
  identifier: "Stripepayment_method_details_sofort",
});
export const Stripepayment_method_details_ideal = Schema.StructWithRest(
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
            "The ID of the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
            "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Unique transaction ID generated by iDEAL.",
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
  title: "payment_method_details_ideal",
  description: "",
  identifier: "Stripepayment_method_details_ideal",
});
export const Stripepayment_method_details_bancontact = Schema.StructWithRest(
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
            "The ID of the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
            "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
  title: "payment_method_details_bancontact",
  description: "",
  identifier: "Stripepayment_method_details_bancontact",
});
export const Stripepayment_method_details_payment_record_sofort =
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
      country: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Two-letter ISO code representing the country the bank account is located in.",
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
              "The ID of the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
              "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
          Schema.Literals(["de", "en", "es", "fr", "it", "nl", "pl"]).annotate({
            description:
              "Preferred language of the SOFORT authorization page that the customer is redirected to. Can be one of `de`, `en`, `es`, `fr`, `it`, `nl`, or `pl`",
          }),
          Schema.Null,
        ]),
      ),
      verified_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Owner's verified full name. Values are verified or provided by SOFORT directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
    title: "payment_method_details_payment_record_sofort",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_sofort",
  });
export const Stripepayment_method_details_payment_record_ideal =
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
              "The ID of the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
              "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Unique transaction ID generated by iDEAL.",
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
              "Owner's verified full name. Values are verified or provided by iDEAL directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
    title: "payment_method_details_payment_record_ideal",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_ideal",
  });
export const Stripepayment_method_details_payment_record_bancontact =
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
              "The ID of the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
              "The mandate for the SEPA Direct Debit PaymentMethod which was generated by this Charge.",
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
              "Preferred language of the Bancontact authorization page that the customer is redirected to. Can be one of `en`, `de`, `fr`, or `nl`",
          }),
          Schema.Null,
        ]),
      ),
      verified_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Owner's verified full name. Values are verified or provided by Bancontact directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
    title: "payment_method_details_payment_record_bancontact",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_bancontact",
  });
export const Stripepayment_method_details_card_present_offline =
  Schema.StructWithRest(
    Schema.Struct({
      stored_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Time at which the payment was collected while offline",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      type: Schema.optionalKey(
        Schema.Union([
          Schema.Literal("deferred").annotate({
            description:
              "The method used to process this payment method offline. Only deferred is allowed.",
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
    title: "payment_method_details_card_present_offline",
    description: "",
    identifier: "Stripepayment_method_details_card_present_offline",
  });
export const Stripepayment_method_details_card_present_receipt =
  Schema.StructWithRest(
    Schema.Struct({
      account_type: Schema.optionalKey(
        Schema.Literals(["checking", "credit", "prepaid", "unknown"]).annotate({
          description: "The type of account being debited or credited",
        }),
      ),
      application_cryptogram: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Application Cryptogram, a unique value generated by the card to authenticate the transaction with issuers.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      application_preferred_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Application Identifier (AID) on the card used to determine which networks are eligible to process the transaction. Referenced from EMV tag 9F12, data encoded on the card's chip.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      authorization_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Identifier for this transaction.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      authorization_response_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "EMV tag 8A. A code returned by the card issuer.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      cardholder_verification_method: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Describes the method used by the cardholder to verify ownership of the card. One of the following: `approval`, `failure`, `none`, `offline_pin`, `offline_pin_and_signature`, `online_pin`, or `signature`.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      dedicated_file_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Similar to the application_preferred_name, identifying the applications (AIDs) available on the card. Referenced from EMV tag 84.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      terminal_verification_results: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A 5-byte string that records the checks and validations that occur between the card and the terminal. These checks determine how the terminal processes the transaction and what risk tolerance is acceptable. Referenced from EMV Tag 95.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_status_information: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "An indication of which steps were completed during the card read process. Referenced from EMV Tag 9B.",
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
    title: "payment_method_details_card_present_receipt",
    description: "",
    identifier: "Stripepayment_method_details_card_present_receipt",
  });
export const Stripepayment_method_details_card_wallet_apple_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_card_wallet_apple_pay",
  description: "",
  identifier: "Stripepayment_method_details_card_wallet_apple_pay",
});
export const Stripepayment_method_details_card_wallet_google_pay =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "payment_method_details_card_wallet_google_pay",
    description: "",
    identifier: "Stripepayment_method_details_card_wallet_google_pay",
  });
export const Stripepayment_method_details_ach_credit_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      account_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Account number to transfer funds to.",
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
            description: "Name of the bank associated with the routing number.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      routing_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Routing transit number for the bank account to transfer funds to.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      swift_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "SWIFT code of the bank associated with the routing number.",
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
    title: "payment_method_details_ach_credit_transfer",
    description: "",
    identifier: "Stripepayment_method_details_ach_credit_transfer",
  });
export const Stripepayment_method_details_ach_debit = Schema.StructWithRest(
  Schema.Struct({
    account_holder_type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["company", "individual"]).annotate({
          description:
            "Type of entity that holds the account. This can be either `individual` or `company`.",
        }),
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
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter ISO code representing the country the bank account is located in.",
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
    routing_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Routing transit number of the bank account.",
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
  title: "payment_method_details_ach_debit",
  description: "",
  identifier: "Stripepayment_method_details_ach_debit",
});
export const Stripepayment_method_details_acss_debit = Schema.StructWithRest(
  Schema.Struct({
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
    expected_debit_date: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
    institution_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Institution number of the bank account",
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
      Schema.String.annotate({
        description: "ID of the mandate used to make this payment.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    transit_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Transit number of the bank account.",
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
  title: "payment_method_details_acss_debit",
  description: "",
  identifier: "Stripepayment_method_details_acss_debit",
});
export const Stripepayment_method_details_affirm = Schema.StructWithRest(
  Schema.Struct({
    location: Schema.optionalKey(
      Schema.String.annotate({
        description: "ID of the location that this reader is assigned to.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    reader: Schema.optionalKey(
      Schema.String.annotate({
        description: "ID of the reader this transaction was made on.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Affirm transaction ID associated with this payment.",
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
  title: "payment_method_details_affirm",
  description: "",
  identifier: "Stripepayment_method_details_affirm",
});
export const Stripepayment_method_details_afterpay_clearpay =
  Schema.StructWithRest(
    Schema.Struct({
      order_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Afterpay order ID associated with this payment intent.",
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
              "Order identifier shown to the merchant in Afterpay's online portal.",
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
    title: "payment_method_details_afterpay_clearpay",
    description: "",
    identifier: "Stripepayment_method_details_afterpay_clearpay",
  });
export const Stripepayment_method_details_alipay = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Uniquely identifies this particular Alipay account. You can use this attribute to check whether two Alipay accounts are the same.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    fingerprint: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Uniquely identifies this particular Alipay account. You can use this attribute to check whether two Alipay accounts are the same.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Transaction ID of this particular Alipay transaction.",
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
  title: "payment_method_details_alipay",
  description: "",
  identifier: "Stripepayment_method_details_alipay",
});
export const Stripepayment_method_details_passthrough_card =
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
    title: "payment_method_details_passthrough_card",
    description: "",
    identifier: "Stripepayment_method_details_passthrough_card",
  });
export const Stripepayment_method_details_au_becs_debit = Schema.StructWithRest(
  Schema.Struct({
    bsb_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Bank-State-Branch number of the bank account.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    expected_debit_date: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
      Schema.String.annotate({
        description: "ID of the mandate used to make this payment.",
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
  title: "payment_method_details_au_becs_debit",
  description: "",
  identifier: "Stripepayment_method_details_au_becs_debit",
});
export const Stripepayment_method_details_bacs_debit = Schema.StructWithRest(
  Schema.Struct({
    expected_debit_date: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
        Schema.String.annotate({
          description: "ID of the mandate used to make this payment.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    sort_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Sort code of the bank account. (e.g., `10-20-30`)",
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
  title: "payment_method_details_bacs_debit",
  description: "",
  identifier: "Stripepayment_method_details_bacs_debit",
});
export const Stripepayment_method_details_billie = Schema.StructWithRest(
  Schema.Struct({
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Billie transaction ID associated with this payment.",
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
  title: "payment_method_details_billie",
  description: "",
  identifier: "Stripepayment_method_details_billie",
});
export const Stripepayment_method_details_bizum = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique identifier for the buyer as determined by the local payment processor.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The Bizum transaction ID associated with this payment.",
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
  title: "payment_method_details_bizum",
  description: "",
  identifier: "Stripepayment_method_details_bizum",
});
export const Stripepayment_method_details_blik = Schema.StructWithRest(
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
  title: "payment_method_details_blik",
  description: "",
  identifier: "Stripepayment_method_details_blik",
});
export const Stripepayment_method_details_boleto = Schema.StructWithRest(
  Schema.Struct({
    tax_id: Schema.String.annotate({
      description:
        "The tax ID of the customer (CPF for individuals consumers or CNPJ for businesses consumers)",
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
  title: "payment_method_details_boleto",
  description: "",
  identifier: "Stripepayment_method_details_boleto",
});
export const Stripepayment_method_details_card_checks = Schema.StructWithRest(
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
  title: "payment_method_details_card_checks",
  description: "",
  identifier: "Stripepayment_method_details_card_checks",
});
export const Stripepayment_method_details_card_installments_plan =
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
              "For `fixed_count` installment plans, this is the interval between installment payments your customer will make to their credit card.\nOne of `month`.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literals(["bonus", "fixed_count", "revolving"]).annotate({
        description:
          "Type of installment plan, one of `fixed_count`, `bonus`, or `revolving`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "payment_method_details_card_installments_plan",
    description: "",
    identifier: "Stripepayment_method_details_card_installments_plan",
  });
export const Stripepayment_method_details_card_network_token =
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
    title: "payment_method_details_card_network_token",
    description: "",
    identifier: "Stripepayment_method_details_card_network_token",
  });
export const Stripepayment_method_details_card_wallet_amex_express_checkout =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "payment_method_details_card_wallet_amex_express_checkout",
    description: "",
    identifier:
      "Stripepayment_method_details_card_wallet_amex_express_checkout",
  });
export const Stripepayment_method_details_card_wallet_link =
  Schema.StructWithRest(
    Schema.Struct({
      funding_source_group: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The [funding source group code](https://docs.stripe.com/payments/link/link-payment-methods) applied to this Link payment at confirmation time.",
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
    title: "payment_method_details_card_wallet_link",
    description: "",
    identifier: "Stripepayment_method_details_card_wallet_link",
  });
export const Stripepayment_method_details_card_wallet_samsung_pay =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "payment_method_details_card_wallet_samsung_pay",
    description: "",
    identifier: "Stripepayment_method_details_card_wallet_samsung_pay",
  });
export const Stripepayment_method_details_cashapp = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique and immutable identifier assigned by Cash App to every buyer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    cashtag: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "A public identifier for buyers using Cash App.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique and immutable identifier of payments assigned by Cash App",
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
  title: "payment_method_details_cashapp",
  description: "",
  identifier: "Stripepayment_method_details_cashapp",
});
export const Stripepayment_method_details_crypto = Schema.StructWithRest(
  Schema.Struct({
    buyer_address: Schema.optionalKey(
      Schema.String.annotate({
        description: "The wallet address of the customer.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    network: Schema.optionalKey(
      Schema.Literals([
        "base",
        "ethereum",
        "polygon",
        "solana",
        "sui",
        "tempo",
      ]).annotate({
        description: "The blockchain network that the transaction was sent on.",
      }),
    ),
    token_currency: Schema.optionalKey(
      Schema.Literals([
        "ousd",
        "phantom_cash",
        "usdc",
        "usdg",
        "usdp",
        "usdsui",
        "usdt",
      ]).annotate({
        description: "The token currency that the transaction was sent with.",
      }),
    ),
    transaction_hash: Schema.optionalKey(
      Schema.String.annotate({
        description: "The blockchain transaction hash of the crypto payment.",
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
  title: "payment_method_details_crypto",
  description: "",
  identifier: "Stripepayment_method_details_crypto",
});
export const Stripepayment_method_details_customer_balance = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_customer_balance",
  description: "",
  identifier: "Stripepayment_method_details_customer_balance",
});
export const Stripepayment_method_details_eps = Schema.StructWithRest(
  Schema.Struct({
    bank: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "arzte_und_apotheker_bank",
          "austrian_anadi_bank_ag",
          "bank_austria",
          "bankhaus_carl_spangler",
          "bankhaus_schelhammer_und_schattera_ag",
          "bawag_psk_ag",
          "bks_bank_ag",
          "brull_kallmus_bank_ag",
          "btv_vier_lander_bank",
          "capital_bank_grawe_gruppe_ag",
          "deutsche_bank_ag",
          "dolomitenbank",
          "easybank_ag",
          "erste_bank_und_sparkassen",
          "hypo_alpeadriabank_international_ag",
          "hypo_bank_burgenland_aktiengesellschaft",
          "hypo_noe_lb_fur_niederosterreich_u_wien",
          "hypo_oberosterreich_salzburg_steiermark",
          "hypo_tirol_bank_ag",
          "hypo_vorarlberg_bank_ag",
          "marchfelder_bank",
          "oberbank_ag",
          "raiffeisen_bankengruppe_osterreich",
          "schoellerbank_ag",
          "sparda_bank_wien",
          "volksbank_gruppe",
          "volkskreditbank_ag",
          "vr_bank_braunau",
        ]).annotate({
          description:
            "The customer's bank. Should be one of `arzte_und_apotheker_bank`, `austrian_anadi_bank_ag`, `bank_austria`, `bankhaus_carl_spangler`, `bankhaus_schelhammer_und_schattera_ag`, `bawag_psk_ag`, `bks_bank_ag`, `brull_kallmus_bank_ag`, `btv_vier_lander_bank`, `capital_bank_grawe_gruppe_ag`, `deutsche_bank_ag`, `dolomitenbank`, `easybank_ag`, `erste_bank_und_sparkassen`, `hypo_alpeadriabank_international_ag`, `hypo_noe_lb_fur_niederosterreich_u_wien`, `hypo_oberosterreich_salzburg_steiermark`, `hypo_tirol_bank_ag`, `hypo_vorarlberg_bank_ag`, `hypo_bank_burgenland_aktiengesellschaft`, `marchfelder_bank`, `oberbank_ag`, `raiffeisen_bankengruppe_osterreich`, `schoellerbank_ag`, `sparda_bank_wien`, `volksbank_gruppe`, `volkskreditbank_ag`, or `vr_bank_braunau`.",
        }),
        Schema.Null,
      ]),
    ),
    verified_name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Owner's verified full name. Values are verified or provided by EPS directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.\nEPS rarely provides this information so the attribute is usually empty.",
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
  title: "payment_method_details_eps",
  description: "",
  identifier: "Stripepayment_method_details_eps",
});
export const Stripepayment_method_details_fpx = Schema.StructWithRest(
  Schema.Struct({
    bank: Schema.Literals([
      "affin_bank",
      "agrobank",
      "alliance_bank",
      "ambank",
      "bank_islam",
      "bank_muamalat",
      "bank_of_china",
      "bank_rakyat",
      "bnp_paribas",
      "bsn",
      "cimb",
      "citibank",
      "deutsche_bank",
      "hong_leong_bank",
      "hsbc",
      "kfh",
      "maybank2e",
      "maybank2u",
      "mbsb_bank",
      "ocbc",
      "pb_enterprise",
      "public_bank",
      "rhb",
      "standard_chartered",
      "uob",
    ]).annotate({
      description:
        "The customer's bank. Can be one of `affin_bank`, `agrobank`, `alliance_bank`, `ambank`, `bank_islam`, `bank_muamalat`, `bnp_paribas`, `bank_rakyat`, `bsn`, `cimb`, `citibank`, `hong_leong_bank`, `hsbc`, `kfh`, `maybank2u`, `ocbc`, `public_bank`, `rhb`, `standard_chartered`, `uob`, `deutsche_bank`, `maybank2e`, `mbsb_bank`, `pb_enterprise`, or `bank_of_china`.",
    }),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Unique transaction id generated by FPX for every request from the merchant",
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
  title: "payment_method_details_fpx",
  description: "",
  identifier: "Stripepayment_method_details_fpx",
});
export const Stripepayment_method_details_giropay = Schema.StructWithRest(
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
    verified_name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Owner's verified full name. Values are verified or provided by Giropay directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.\nGiropay rarely provides this information so the attribute is usually empty.",
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
  title: "payment_method_details_giropay",
  description: "",
  identifier: "Stripepayment_method_details_giropay",
});
export const Stripepayment_method_details_grabpay = Schema.StructWithRest(
  Schema.Struct({
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Unique transaction id generated by GrabPay",
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
  title: "payment_method_details_grabpay",
  description: "",
  identifier: "Stripepayment_method_details_grabpay",
});
export const Stripepayment_method_details_interac_present_receipt =
  Schema.StructWithRest(
    Schema.Struct({
      account_type: Schema.optionalKey(
        Schema.Literals(["checking", "savings", "unknown"]).annotate({
          description: "The type of account being debited or credited",
        }),
      ),
      application_cryptogram: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Application Cryptogram, a unique value generated by the card to authenticate the transaction with issuers.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      application_preferred_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Application Identifier (AID) on the card used to determine which networks are eligible to process the transaction. Referenced from EMV tag 9F12, data encoded on the card's chip.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      authorization_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Identifier for this transaction.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      authorization_response_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "EMV tag 8A. A code returned by the card issuer.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      cardholder_verification_method: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Describes the method used by the cardholder to verify ownership of the card. One of the following: `approval`, `failure`, `none`, `offline_pin`, `offline_pin_and_signature`, `online_pin`, or `signature`.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      dedicated_file_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Similar to the application_preferred_name, identifying the applications (AIDs) available on the card. Referenced from EMV tag 84.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      terminal_verification_results: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A 5-byte string that records the checks and validations that occur between the card and the terminal. These checks determine how the terminal processes the transaction and what risk tolerance is acceptable. Referenced from EMV Tag 95.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_status_information: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "An indication of which steps were completed during the card read process. Referenced from EMV Tag 9B.",
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
    title: "payment_method_details_interac_present_receipt",
    description: "",
    identifier: "Stripepayment_method_details_interac_present_receipt",
  });
export const Stripepayment_method_details_kakao_pay = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique identifier for the buyer as determined by the local payment processor.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Kakao Pay transaction ID associated with this payment.",
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
  title: "payment_method_details_kakao_pay",
  description: "",
  identifier: "Stripepayment_method_details_kakao_pay",
});
export const Stripepayment_method_details_kr_card = Schema.StructWithRest(
  Schema.Struct({
    brand: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "bc",
          "citi",
          "hana",
          "hyundai",
          "jeju",
          "jeonbuk",
          "kakaobank",
          "kbank",
          "kdbbank",
          "kookmin",
          "kwangju",
          "lotte",
          "mg",
          "nh",
          "post",
          "samsung",
          "savingsbank",
          "shinhan",
          "shinhyup",
          "suhyup",
          "tossbank",
          "woori",
        ]).annotate({ description: "The local credit or debit card brand." }),
        Schema.Null,
      ]),
    ),
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique identifier for the buyer as determined by the local payment processor.",
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
          description:
            "The last four digits of the card. This may not be present for American Express cards.",
        }).check(
          Schema.isMaxCodePoints(4).annotate({
            expected: "a string with at most 4 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Korean Card transaction ID associated with this payment.",
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
  title: "payment_method_details_kr_card",
  description: "",
  identifier: "Stripepayment_method_details_kr_card",
});
export const Stripepayment_method_details_link = Schema.StructWithRest(
  Schema.Struct({
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter ISO code representing the funding source country beneath the Link payment.\nYou could use this attribute to get a sense of international fees.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    funding_source_group: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The [funding source group code](https://docs.stripe.com/payments/link/link-payment-methods) applied to this Link payment at confirmation time.",
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
  title: "payment_method_details_link",
  description: "",
  identifier: "Stripepayment_method_details_link",
});
export const Stripepayment_method_details_mb_way = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_mb_way",
  description: "",
  identifier: "Stripepayment_method_details_mb_way",
});
export const Stripepayment_method_details_multibanco = Schema.StructWithRest(
  Schema.Struct({
    entity: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Entity number associated with this Multibanco payment.",
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
  title: "payment_method_details_multibanco",
  description: "",
  identifier: "Stripepayment_method_details_multibanco",
});
export const Stripepayment_method_details_naver_pay = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique identifier for the buyer as determined by the local payment processor.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Naver Pay transaction ID associated with this payment.",
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
  title: "payment_method_details_naver_pay",
  description: "",
  identifier: "Stripepayment_method_details_naver_pay",
});
export const Stripepayment_method_details_nz_bank_account =
  Schema.StructWithRest(
    Schema.Struct({
      account_holder_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The name on the bank account. Only present if the account holder name is different from the name of the authorized signatory collected in the PaymentMethod’s billing details.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      bank_code: Schema.String.annotate({
        description: "The numeric code for the bank account's bank.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      bank_name: Schema.String.annotate({
        description: "The name of the bank.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      branch_code: Schema.String.annotate({
        description: "The numeric code for the bank account's bank branch.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      expected_debit_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      last4: Schema.String.annotate({
        description: "Last four digits of the bank account number.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      suffix: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The suffix of the bank account number.",
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
    title: "payment_method_details_nz_bank_account",
    description: "",
    identifier: "Stripepayment_method_details_nz_bank_account",
  });
export const Stripepayment_method_details_oxxo = Schema.StructWithRest(
  Schema.Struct({
    number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "OXXO reference number" }).check(
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
  title: "payment_method_details_oxxo",
  description: "",
  identifier: "Stripepayment_method_details_oxxo",
});
export const Stripepayment_method_details_p24 = Schema.StructWithRest(
  Schema.Struct({
    bank: Schema.optionalKey(
      Schema.Union([
        Schema.Literals([
          "alior_bank",
          "bank_millennium",
          "bank_nowy_bfg_sa",
          "bank_pekao_sa",
          "banki_spbdzielcze",
          "blik",
          "bnp_paribas",
          "boz",
          "citi_handlowy",
          "credit_agricole",
          "envelobank",
          "etransfer_pocztowy24",
          "getin_bank",
          "ideabank",
          "ing",
          "inteligo",
          "mbank_mtransfer",
          "nest_przelew",
          "noble_pay",
          "pbac_z_ipko",
          "plus_bank",
          "santander_przelew24",
          "tmobile_usbugi_bankowe",
          "toyota_bank",
          "velobank",
          "volkswagen_bank",
        ]).annotate({
          description:
            "The customer's bank. Can be one of `ing`, `citi_handlowy`, `tmobile_usbugi_bankowe`, `plus_bank`, `etransfer_pocztowy24`, `banki_spbdzielcze`, `bank_nowy_bfg_sa`, `getin_bank`, `velobank`, `blik`, `noble_pay`, `ideabank`, `envelobank`, `santander_przelew24`, `nest_przelew`, `mbank_mtransfer`, `inteligo`, `pbac_z_ipko`, `bnp_paribas`, `credit_agricole`, `toyota_bank`, `bank_pekao_sa`, `volkswagen_bank`, `bank_millennium`, `alior_bank`, or `boz`.",
        }),
        Schema.Null,
      ]),
    ),
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Unique reference for this Przelewy24 payment.",
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
            "Owner's verified full name. Values are verified or provided by Przelewy24 directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.\nPrzelewy24 rarely provides this information so the attribute is usually empty.",
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
  title: "payment_method_details_p24",
  description: "",
  identifier: "Stripepayment_method_details_p24",
});
export const Stripepayment_method_details_pay_by_bank = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_pay_by_bank",
  description: "",
  identifier: "Stripepayment_method_details_pay_by_bank",
});
export const Stripepayment_method_details_payco = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique identifier for the buyer as determined by the local payment processor.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The Payco transaction ID associated with this payment.",
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
  title: "payment_method_details_payco",
  description: "",
  identifier: "Stripepayment_method_details_payco",
});
export const Stripepayment_method_details_paynow = Schema.StructWithRest(
  Schema.Struct({
    location: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    reader: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Reference number associated with this PayNow payment",
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
  title: "payment_method_details_paynow",
  description: "",
  identifier: "Stripepayment_method_details_paynow",
});
export const Stripepayment_method_details_paypay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_paypay",
  description: "",
  identifier: "Stripepayment_method_details_paypay",
});
export const Stripepayment_method_details_payto = Schema.StructWithRest(
  Schema.Struct({
    bsb_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Bank-State-Branch number of the bank account.",
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
      Schema.String.annotate({
        description: "ID of the mandate used to make this payment.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    pay_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The PayID alias for the bank account.",
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
  title: "payment_method_details_payto",
  description: "",
  identifier: "Stripepayment_method_details_payto",
});
export const Stripepayment_method_details_pix = Schema.StructWithRest(
  Schema.Struct({
    bank_transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Unique transaction id generated by BCB",
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
            "Uniquely identifies this particular Pix account. You can use this attribute to check whether two Pix accounts are the same.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    mandate: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the multi use Mandate generated by the PaymentIntent or SetupIntent.",
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
  title: "payment_method_details_pix",
  description: "",
  identifier: "Stripepayment_method_details_pix",
});
export const Stripepayment_method_details_promptpay = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Bill reference generated by PromptPay",
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
  title: "payment_method_details_promptpay",
  description: "",
  identifier: "Stripepayment_method_details_promptpay",
});
export const Stripepayment_method_details_samsung_pay = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A unique identifier for the buyer as determined by the local payment processor.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Samsung Pay transaction ID associated with this payment.",
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
  title: "payment_method_details_samsung_pay",
  description: "",
  identifier: "Stripepayment_method_details_samsung_pay",
});
export const Stripepayment_method_details_satispay = Schema.StructWithRest(
  Schema.Struct({
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Satispay transaction ID associated with this payment.",
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
  title: "payment_method_details_satispay",
  description: "",
  identifier: "Stripepayment_method_details_satispay",
});
export const Stripepayment_method_details_scalapay = Schema.StructWithRest(
  Schema.Struct({
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Scalapay transaction ID associated with this payment.",
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
  title: "payment_method_details_scalapay",
  description: "",
  identifier: "Stripepayment_method_details_scalapay",
});
export const Stripepayment_method_details_sepa_debit = Schema.StructWithRest(
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
    branch_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Branch code of bank associated with the bank account.",
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
            "Two-letter ISO code representing the country the bank account is located in.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    expected_debit_date: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
          description: "Last four characters of the IBAN.",
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
        Schema.String.annotate({
          description:
            "Find the ID of the mandate used for this payment under the [payment_method_details.sepa_debit.mandate](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-sepa_debit-mandate) property on the Charge. Use this mandate ID to [retrieve the Mandate](https://docs.stripe.com/api/mandates/retrieve).",
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
  title: "payment_method_details_sepa_debit",
  description: "",
  identifier: "Stripepayment_method_details_sepa_debit",
});
export const Stripepayment_method_details_sequra = Schema.StructWithRest(
  Schema.Struct({
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The SeQura transaction ID associated with this payment.",
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
  title: "payment_method_details_sequra",
  description: "",
  identifier: "Stripepayment_method_details_sequra",
});
export const Stripepayment_method_details_stripe_account = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_stripe_account",
  description: "",
  identifier: "Stripepayment_method_details_stripe_account",
});
export const Stripepayment_method_details_sunbit = Schema.StructWithRest(
  Schema.Struct({
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Sunbit transaction ID associated with this payment.",
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
  title: "payment_method_details_sunbit",
  description: "",
  identifier: "Stripepayment_method_details_sunbit",
});
export const Stripepayment_method_details_swish = Schema.StructWithRest(
  Schema.Struct({
    fingerprint: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Uniquely identifies the payer's Swish account. You can use this attribute to check whether two Swish transactions were paid for by the same payer",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    payment_reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Payer bank reference number for the payment",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    verified_phone_last4: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The last four digits of the Swish account phone number",
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
  title: "payment_method_details_swish",
  description: "",
  identifier: "Stripepayment_method_details_swish",
});
export const Stripepayment_method_details_twint = Schema.StructWithRest(
  Schema.Struct({
    mandate: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the multi use Mandate generated by the PaymentIntent or SetupIntent.",
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
  title: "payment_method_details_twint",
  description: "",
  identifier: "Stripepayment_method_details_twint",
});
export const Stripepayment_method_details_upi = Schema.StructWithRest(
  Schema.Struct({
    vpa: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Customer's unique Virtual Payment Address.",
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
  title: "payment_method_details_upi",
  description: "",
  identifier: "Stripepayment_method_details_upi",
});
export const Stripepayment_method_details_us_bank_account = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_us_bank_account> =>
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
              description: "Name of the bank associated with the bank account.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expected_debit_date: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
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
        payment_reference: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Reference number to locate ACH payments with customer's bank.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
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
      title: "payment_method_details_us_bank_account",
      description: "",
      identifier: "Stripepayment_method_details_us_bank_account",
    }),
);
export const Stripepayment_method_details_wechat = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_wechat",
  description: "",
  identifier: "Stripepayment_method_details_wechat",
});
export const Stripepayment_method_details_wechat_pay = Schema.StructWithRest(
  Schema.Struct({
    fingerprint: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Uniquely identifies this particular WeChat Pay account. You can use this attribute to check whether two WeChat accounts are the same.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    location: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    reader: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    transaction_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Transaction ID of this particular WeChat Pay transaction.",
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
  title: "payment_method_details_wechat_pay",
  description: "",
  identifier: "Stripepayment_method_details_wechat_pay",
});
export const Stripepayment_method_details_zip = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_zip",
  description: "",
  identifier: "Stripepayment_method_details_zip",
});
export const Stripepayment_method_details_payment_record_acss_debit =
  Schema.StructWithRest(
    Schema.Struct({
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
      expected_debit_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
      institution_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Institution number of the bank account",
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
        Schema.String.annotate({
          description: "ID of the mandate used to make this payment.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      transit_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Transit number of the bank account.",
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
    title: "payment_method_details_payment_record_acss_debit",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_acss_debit",
  });
export const Stripepayment_method_details_payment_record_affirm =
  Schema.StructWithRest(
    Schema.Struct({
      location: Schema.optionalKey(
        Schema.String.annotate({
          description: "ID of the location that this reader is assigned to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      reader: Schema.optionalKey(
        Schema.String.annotate({
          description: "ID of the reader this transaction was made on.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Affirm transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_affirm",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_affirm",
  });
export const Stripepayment_method_details_payment_record_afterpay_clearpay =
  Schema.StructWithRest(
    Schema.Struct({
      order_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Afterpay order ID associated with this payment intent.",
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
              "Order identifier shown to the merchant in Afterpay's online portal.",
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
    title: "payment_method_details_payment_record_afterpay_clearpay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_afterpay_clearpay",
  });
export const Stripepayment_method_details_payment_record_alipay =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Uniquely identifies this particular Alipay account. You can use this attribute to check whether two Alipay accounts are the same.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      fingerprint: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Uniquely identifies this particular Alipay account. You can use this attribute to check whether two Alipay accounts are the same.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Transaction ID of this particular Alipay transaction.",
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
    title: "payment_method_details_payment_record_alipay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_alipay",
  });
export const Stripepayment_method_details_payment_record_au_becs_debit =
  Schema.StructWithRest(
    Schema.Struct({
      bsb_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Bank-State-Branch number of the bank account.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      expected_debit_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
        Schema.String.annotate({
          description: "ID of the mandate used to make this payment.",
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
    title: "payment_method_details_payment_record_au_becs_debit",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_au_becs_debit",
  });
export const Stripepayment_method_details_payment_record_bacs_debit =
  Schema.StructWithRest(
    Schema.Struct({
      expected_debit_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
          Schema.String.annotate({
            description: "ID of the mandate used to make this payment.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      sort_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Sort code of the bank account. (e.g., `10-20-30`)",
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
    title: "payment_method_details_payment_record_bacs_debit",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_bacs_debit",
  });
export const Stripepayment_method_details_payment_record_billie =
  Schema.StructWithRest(
    Schema.Struct({
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Billie transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_billie",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_billie",
  });
export const Stripepayment_method_details_payment_record_bizum =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique identifier for the buyer as determined by the local payment processor.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Bizum transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_bizum",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_bizum",
  });
export const Stripepayment_method_details_payment_record_blik =
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
    title: "payment_method_details_payment_record_blik",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_blik",
  });
export const Stripepayment_method_details_payment_record_boleto =
  Schema.StructWithRest(
    Schema.Struct({
      tax_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The tax ID of the customer (CPF for individuals consumers or CNPJ for businesses consumers)",
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
    title: "payment_method_details_payment_record_boleto",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_boleto",
  });
export const Stripepayment_method_details_payment_record_cashapp =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique and immutable identifier assigned by Cash App to every buyer.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      cashtag: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "A public identifier for buyers using Cash App.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique and immutable identifier of payments assigned by Cash App.",
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
    title: "payment_method_details_payment_record_cashapp",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_cashapp",
  });
export const Stripepayment_method_details_payment_record_eps =
  Schema.StructWithRest(
    Schema.Struct({
      bank: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "arzte_und_apotheker_bank",
            "austrian_anadi_bank_ag",
            "bank_austria",
            "bankhaus_carl_spangler",
            "bankhaus_schelhammer_und_schattera_ag",
            "bawag_psk_ag",
            "bks_bank_ag",
            "brull_kallmus_bank_ag",
            "btv_vier_lander_bank",
            "capital_bank_grawe_gruppe_ag",
            "deutsche_bank_ag",
            "dolomitenbank",
            "easybank_ag",
            "erste_bank_und_sparkassen",
            "hypo_alpeadriabank_international_ag",
            "hypo_bank_burgenland_aktiengesellschaft",
            "hypo_noe_lb_fur_niederosterreich_u_wien",
            "hypo_oberosterreich_salzburg_steiermark",
            "hypo_tirol_bank_ag",
            "hypo_vorarlberg_bank_ag",
            "marchfelder_bank",
            "oberbank_ag",
            "raiffeisen_bankengruppe_osterreich",
            "schoellerbank_ag",
            "sparda_bank_wien",
            "volksbank_gruppe",
            "volkskreditbank_ag",
            "vr_bank_braunau",
          ]).annotate({
            description:
              "The customer's bank. Should be one of `arzte_und_apotheker_bank`, `austrian_anadi_bank_ag`, `bank_austria`, `bankhaus_carl_spangler`, `bankhaus_schelhammer_und_schattera_ag`, `bawag_psk_ag`, `bks_bank_ag`, `brull_kallmus_bank_ag`, `btv_vier_lander_bank`, `capital_bank_grawe_gruppe_ag`, `deutsche_bank_ag`, `dolomitenbank`, `easybank_ag`, `erste_bank_und_sparkassen`, `hypo_alpeadriabank_international_ag`, `hypo_noe_lb_fur_niederosterreich_u_wien`, `hypo_oberosterreich_salzburg_steiermark`, `hypo_tirol_bank_ag`, `hypo_vorarlberg_bank_ag`, `hypo_bank_burgenland_aktiengesellschaft`, `marchfelder_bank`, `oberbank_ag`, `raiffeisen_bankengruppe_osterreich`, `schoellerbank_ag`, `sparda_bank_wien`, `volksbank_gruppe`, `volkskreditbank_ag`, or `vr_bank_braunau`",
          }),
          Schema.Null,
        ]),
      ),
      verified_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Owner's verified full name. Values are verified or provided by EPS directly (if supported) at the time of authorization or settlement. They cannot be set or mutated. EPS rarely provides this information so the attribute is usually empty.",
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
    title: "payment_method_details_payment_record_eps",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_eps",
  });
export const Stripepayment_method_details_payment_record_giropay =
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
      verified_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Owner's verified full name. Values are verified or provided by Giropay directly (if supported) at the time of authorization or settlement. They cannot be set or mutated. Giropay rarely provides this information so the attribute is usually empty.",
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
    title: "payment_method_details_payment_record_giropay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_giropay",
  });
export const Stripepayment_method_details_payment_record_kakao_pay =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique identifier for the buyer as determined by the local payment processor.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Kakao Pay transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_kakao_pay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_kakao_pay",
  });
export const Stripepayment_method_details_payment_record_link =
  Schema.StructWithRest(
    Schema.Struct({
      country: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Two-letter ISO code representing the funding source country beneath the Link payment. You could use this attribute to get a sense of international fees.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      funding_source_group: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The [funding source group code](https://docs.stripe.com/payments/link/link-payment-methods) applied to this Link payment at confirmation time.",
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
    title: "payment_method_details_payment_record_link",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_link",
  });
export const Stripepayment_method_details_payment_record_mb_way = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_payment_record_mb_way",
  description: "",
  identifier: "Stripepayment_method_details_payment_record_mb_way",
});
export const Stripepayment_method_details_payment_record_momo =
  Schema.StructWithRest(
    Schema.Struct({
      fingerprint: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Uniquely identifies this particular MoMo account. You can use this attribute to check whether two MoMo accounts are the same.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      mandate: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the multi-use Mandate created by, or used to make, this MoMo payment.",
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
    title: "payment_method_details_payment_record_momo",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_momo",
  });
export const Stripepayment_method_details_payment_record_multibanco =
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
    title: "payment_method_details_payment_record_multibanco",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_multibanco",
  });
export const Stripepayment_method_details_payment_record_naver_pay =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique identifier for the buyer as determined by the local payment processor.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Naver Pay transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_naver_pay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_naver_pay",
  });
export const Stripepayment_method_details_payment_record_nz_bank_account =
  Schema.StructWithRest(
    Schema.Struct({
      account_holder_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The name on the bank account. Only present if the account holder name is different from the name of the authorized signatory collected in the PaymentMethod's billing details.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      bank_code: Schema.String.annotate({
        description: "The numeric code for the bank account's bank.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      bank_name: Schema.String.annotate({
        description: "The name of the bank.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      branch_code: Schema.String.annotate({
        description: "The numeric code for the bank account's bank branch.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      expected_debit_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      last4: Schema.String.annotate({
        description: "Last four digits of the bank account number.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      suffix: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The suffix of the bank account number.",
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
    title: "payment_method_details_payment_record_nz_bank_account",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_nz_bank_account",
  });
export const Stripepayment_method_details_payment_record_oxxo =
  Schema.StructWithRest(
    Schema.Struct({
      number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "OXXO reference number",
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
    title: "payment_method_details_payment_record_oxxo",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_oxxo",
  });
export const Stripepayment_method_details_payment_record_p24 =
  Schema.StructWithRest(
    Schema.Struct({
      bank: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "alior_bank",
            "bank_millennium",
            "bank_nowy_bfg_sa",
            "bank_pekao_sa",
            "banki_spbdzielcze",
            "blik",
            "bnp_paribas",
            "boz",
            "citi_handlowy",
            "credit_agricole",
            "envelobank",
            "etransfer_pocztowy24",
            "getin_bank",
            "ideabank",
            "ing",
            "inteligo",
            "mbank_mtransfer",
            "nest_przelew",
            "noble_pay",
            "pbac_z_ipko",
            "plus_bank",
            "santander_przelew24",
            "tmobile_usbugi_bankowe",
            "toyota_bank",
            "velobank",
            "volkswagen_bank",
          ]).annotate({
            description:
              "The customer's bank. Can be one of `ing`, `citi_handlowy`, `tmobile_usbugi_bankowe`, `plus_bank`, `etransfer_pocztowy24`, `banki_spbdzielcze`, `bank_nowy_bfg_sa`, `getin_bank`, `velobank`, `blik`, `noble_pay`, `ideabank`, `envelobank`, `santander_przelew24`, `nest_przelew`, `mbank_mtransfer`, `inteligo`, `pbac_z_ipko`, `bnp_paribas`, `credit_agricole`, `toyota_bank`, `bank_pekao_sa`, `volkswagen_bank`, `bank_millennium`, `alior_bank`, or `boz`.",
          }),
          Schema.Null,
        ]),
      ),
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Unique reference for this Przelewy24 payment.",
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
              "Owner's verified full name. Values are verified or provided by Przelewy24 directly (if supported) at the time of authorization or settlement. They cannot be set or mutated. Przelewy24 rarely provides this information so the attribute is usually empty.",
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
    title: "payment_method_details_payment_record_p24",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_p24",
  });
export const Stripepayment_method_details_payment_record_pay_by_bank =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "payment_method_details_payment_record_pay_by_bank",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_pay_by_bank",
  });
export const Stripepayment_method_details_payment_record_payco =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique identifier for the buyer as determined by the local payment processor.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Payco transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_payco",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_payco",
  });
export const Stripepayment_method_details_payment_record_paynow =
  Schema.StructWithRest(
    Schema.Struct({
      location: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      reader: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Reference number associated with this PayNow payment",
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
    title: "payment_method_details_payment_record_paynow",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_paynow",
  });
export const Stripepayment_method_details_payment_record_paypay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_payment_record_paypay",
  description: "",
  identifier: "Stripepayment_method_details_payment_record_paypay",
});
export const Stripepayment_method_details_payment_record_payto =
  Schema.StructWithRest(
    Schema.Struct({
      bsb_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Bank-State-Branch number of the bank account.",
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
        Schema.String.annotate({
          description: "ID of the mandate used to make this payment.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      pay_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The PayID alias for the bank account.",
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
    title: "payment_method_details_payment_record_payto",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_payto",
  });
export const Stripepayment_method_details_payment_record_pix =
  Schema.StructWithRest(
    Schema.Struct({
      bank_transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Unique transaction id generated by BCB",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      mandate: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the multi use Mandate generated by the PaymentIntent or SetupIntent.",
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
    title: "payment_method_details_payment_record_pix",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_pix",
  });
export const Stripepayment_method_details_payment_record_promptpay =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Bill reference generated by PromptPay",
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
    title: "payment_method_details_payment_record_promptpay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_promptpay",
  });
export const Stripepayment_method_details_payment_record_samsung_pay =
  Schema.StructWithRest(
    Schema.Struct({
      buyer_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A unique identifier for the buyer as determined by the local payment processor.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Samsung Pay transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_samsung_pay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_samsung_pay",
  });
export const Stripepayment_method_details_payment_record_satispay =
  Schema.StructWithRest(
    Schema.Struct({
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Satispay transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_satispay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_satispay",
  });
export const Stripepayment_method_details_payment_record_scalapay =
  Schema.StructWithRest(
    Schema.Struct({
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Scalapay transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_scalapay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_scalapay",
  });
export const Stripepayment_method_details_payment_record_sepa_debit =
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
      branch_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Branch code of bank associated with the bank account.",
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
              "Two-letter ISO code representing the country the bank account is located in.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      expected_debit_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
            description: "Last four characters of the IBAN.",
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
          Schema.String.annotate({
            description:
              "Find the ID of the mandate used for this payment under the [payment_method_details.sepa_debit.mandate](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-sepa_debit-mandate) property on the Charge. Use this mandate ID to [retrieve the Mandate](https://docs.stripe.com/api/mandates/retrieve).",
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
    title: "payment_method_details_payment_record_sepa_debit",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_sepa_debit",
  });
export const Stripepayment_method_details_payment_record_sequra =
  Schema.StructWithRest(
    Schema.Struct({
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The SeQura transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_sequra",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_sequra",
  });
export const Stripepayment_method_details_payment_record_sunbit =
  Schema.StructWithRest(
    Schema.Struct({
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The Sunbit transaction ID associated with this payment.",
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
    title: "payment_method_details_payment_record_sunbit",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_sunbit",
  });
export const Stripepayment_method_details_payment_record_swish =
  Schema.StructWithRest(
    Schema.Struct({
      fingerprint: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Uniquely identifies the payer's Swish account. You can use this attribute to check whether two Swish transactions were paid for by the same payer",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      payment_reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Payer bank reference number for the payment",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      verified_phone_last4: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The last four digits of the Swish account phone number",
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
    title: "payment_method_details_payment_record_swish",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_swish",
  });
export const Stripepayment_method_details_payment_record_twint =
  Schema.StructWithRest(
    Schema.Struct({
      mandate: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the multi use Mandate generated by the PaymentIntent or SetupIntent.",
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
    title: "payment_method_details_payment_record_twint",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_twint",
  });
export const Stripepayment_method_details_payment_record_upi =
  Schema.StructWithRest(
    Schema.Struct({
      vpa: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Customer's unique Virtual Payment Address.",
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
    title: "payment_method_details_payment_record_upi",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_upi",
  });
export const Stripepayment_method_details_payment_record_us_bank_account =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_payment_record_us_bank_account> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["company", "individual"]).annotate({
                description:
                  "The type of entity that holds the account. This can be either 'individual' or 'company'.",
              }),
              Schema.Null,
            ]),
          ),
          account_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["checking", "savings"]).annotate({
                description:
                  "The type of the bank account. This can be either 'checking' or 'savings'.",
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
          expected_debit_date: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Estimated date to debit the customer's bank account. A date string in YYYY-MM-DD format.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
          payment_reference: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The ACH payment reference for this transaction.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          routing_number: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The routing number for the bank account.",
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
        title: "payment_method_details_payment_record_us_bank_account",
        description: "",
        identifier:
          "Stripepayment_method_details_payment_record_us_bank_account",
      }),
  );
export const Stripepayment_method_details_payment_record_wechat_pay =
  Schema.StructWithRest(
    Schema.Struct({
      fingerprint: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Uniquely identifies this particular WeChat Pay account. You can use this attribute to check whether two WeChat accounts are the same.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      location: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      reader: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      transaction_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Transaction ID of this particular WeChat Pay transaction.",
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
    title: "payment_method_details_payment_record_wechat_pay",
    description: "",
    identifier: "Stripepayment_method_details_payment_record_wechat_pay",
  });
export const Stripepayment_method_details_payment_record_zip = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_details_payment_record_zip",
  description: "",
  identifier: "Stripepayment_method_details_payment_record_zip",
});
export const Stripepayment_method_details_card_wallet_masterpass =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_card_wallet_masterpass> =>
      Schema.StructWithRest(
        Schema.Struct({
          billing_address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeaddress]).annotate({
                description:
                  "Owner's verified billing address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
              }),
              Schema.Null,
            ]),
          ),
          email: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Owner's verified email. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
                  "Owner's verified full name. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          shipping_address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeaddress]).annotate({
                description:
                  "Owner's verified shipping address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
        title: "payment_method_details_card_wallet_masterpass",
        description: "",
        identifier: "Stripepayment_method_details_card_wallet_masterpass",
      }),
  );
export const Stripepayment_method_details_card_wallet_visa_checkout =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_card_wallet_visa_checkout> =>
      Schema.StructWithRest(
        Schema.Struct({
          billing_address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeaddress]).annotate({
                description:
                  "Owner's verified billing address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
              }),
              Schema.Null,
            ]),
          ),
          email: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Owner's verified email. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
                  "Owner's verified full name. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          shipping_address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeaddress]).annotate({
                description:
                  "Owner's verified shipping address. Values are verified or provided by the wallet directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
        title: "payment_method_details_card_wallet_visa_checkout",
        description: "",
        identifier: "Stripepayment_method_details_card_wallet_visa_checkout",
      }),
  );
export const Stripepayment_method_details_card_present = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_card_present> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_authorized: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The authorized amount",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
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
        brand_product: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The [product code](https://stripe.com/docs/card-product-codes) that identifies the specific program or product associated with a card.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        capture_before: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "When using manual capture, a future timestamp after which the charge will be automatically refunded if uncaptured.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        cardholder_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The cardholder name as read from the card, in [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include alphanumeric characters, special characters and first/last name separator (`/`). In some cases, the cardholder name may not be available depending on how the issuer has configured the card. Cardholder name is typically not available on swipe or contactless payments, such as those made with Apple Pay and Google Pay.",
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
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A high-level description of the type of cards issued in this range.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        emv_auth_data: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Authorization response cryptogram.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        exp_month: Schema.Number.annotate({
          description:
            "Two-digit number representing the card's expiration month.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        exp_year: Schema.Number.annotate({
          description:
            "Four-digit number representing the card's expiration year.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        generated_card: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of a card PaymentMethod generated from the card_present PaymentMethod that may be attached to a Customer for future transactions. Only present if it was possible to generate a card PaymentMethod.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        incremental_authorization_supported: Schema.Boolean.annotate({
          description:
            "Whether this [PaymentIntent](https://docs.stripe.com/api/payment_intents) is eligible for incremental authorizations. Request support using [request_incremental_authorization_support](https://docs.stripe.com/api/payment_intents/create#create_payment_intent-payment_method_options-card_present-request_incremental_authorization_support).",
        }),
        issuer: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The name of the card's issuing bank.",
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
        location: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
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
        overcapture_supported: Schema.Boolean.annotate({
          description:
            "Defines whether the authorized amount can be over-captured or not",
        }),
        preferred_locales: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "The languages that the issuing bank recommends using for localizing any customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data encoded on the card's chip.",
            }),
            Schema.Null,
          ]),
        ),
        read_method: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "contact_emv",
              "contactless_emv",
              "contactless_magstripe_mode",
              "magnetic_stripe_fallback",
              "magnetic_stripe_track2",
            ]).annotate({
              description: "How card details were read in this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        reader: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        receipt: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_details_card_present_receipt,
            ]).annotate({
              description:
                "A collection of fields required to be displayed on receipts. Only required for EMV transactions.",
            }),
            Schema.Null,
          ]),
        ),
        wallet: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_card_present_common_wallet,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_details_card_present",
      description: "",
      identifier: "Stripepayment_method_details_card_present",
    }),
);
export const Stripepayment_method_details_alma = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_alma> =>
    Schema.StructWithRest(
      Schema.Struct({
        installments: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_alma_details_resource_installments,
        ),
        transaction_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Alma transaction ID associated with this payment.",
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
      title: "payment_method_details_alma",
      description: "",
      identifier: "Stripepayment_method_details_alma",
    }),
);
export const Stripepayment_method_details_card_installments = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_card_installments> =>
    Schema.StructWithRest(
      Schema.Struct({
        plan: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_details_card_installments_plan,
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
      title: "payment_method_details_card_installments",
      description: "",
      identifier: "Stripepayment_method_details_card_installments",
    }),
);
export const Stripepayment_method_details_interac_present = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_interac_present> =>
    Schema.StructWithRest(
      Schema.Struct({
        brand: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Card brand. Can be `interac`, `mastercard` or `visa`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        cardholder_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The cardholder name as read from the card, in [ISO 7813](https://en.wikipedia.org/wiki/ISO/IEC_7813) format. May include alphanumeric characters, special characters and first/last name separator (`/`). In some cases, the cardholder name may not be available depending on how the issuer has configured the card. Cardholder name is typically not available on swipe or contactless payments, such as those made with Apple Pay and Google Pay.",
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
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A high-level description of the type of cards issued in this range.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        emv_auth_data: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Authorization response cryptogram.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        exp_month: Schema.Number.annotate({
          description:
            "Two-digit number representing the card's expiration month.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        exp_year: Schema.Number.annotate({
          description:
            "Four-digit number representing the card's expiration year.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        generated_card: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of a card PaymentMethod generated from the card_present PaymentMethod that may be attached to a Customer for future transactions. Only present if it was possible to generate a card PaymentMethod.",
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
            Schema.String.annotate({
              description: "The name of the card's issuing bank.",
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
        location: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
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
        preferred_locales: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "The languages that the issuing bank recommends using for localizing any customer-facing text, as read from the card. Referenced from EMV tag 5F2D, data encoded on the card's chip.",
            }),
            Schema.Null,
          ]),
        ),
        read_method: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "contact_emv",
              "contactless_emv",
              "contactless_magstripe_mode",
              "magnetic_stripe_fallback",
              "magnetic_stripe_track2",
            ]).annotate({
              description: "How card details were read in this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        reader: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        receipt: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_details_interac_present_receipt,
            ]).annotate({
              description:
                "A collection of fields required to be displayed on receipts. Only required for EMV transactions.",
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
      title: "payment_method_details_interac_present",
      description: "",
      identifier: "Stripepayment_method_details_interac_present",
    }),
);
export const Stripepayment_method_details_konbini = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_konbini> =>
    Schema.StructWithRest(
      Schema.Struct({
        store: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_flows_private_payment_methods_konbini_details_resource_store,
            ]).annotate({
              description:
                "If the payment succeeded, this contains the details of the convenience store where the payment was completed.",
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
      title: "payment_method_details_konbini",
      description: "",
      identifier: "Stripepayment_method_details_konbini",
    }),
);
export const Stripepayment_method_details_mobilepay = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_mobilepay> =>
    Schema.StructWithRest(
      Schema.Struct({
        card: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinternal_card]).annotate({
              description: "Internal card details",
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
      title: "payment_method_details_mobilepay",
      description: "",
      identifier: "Stripepayment_method_details_mobilepay",
    }),
);
export const Stripepayment_method_details_paypal = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_paypal> =>
    Schema.StructWithRest(
      Schema.Struct({
        country: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Two-letter ISO code representing the buyer's country. Values are provided by PayPal directly (if supported) at the time of authorization or settlement. They cannot be set or mutated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        payer_email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Owner's email. Values are provided by PayPal directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
        payer_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Owner's full name. Values provided by PayPal directly\n(if supported) at the time of authorization or settlement. They cannot be set or mutated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        seller_protection: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepaypal_seller_protection]).annotate({
              description:
                "The level of protection offered as defined by PayPal Seller Protection for Merchants, for this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        transaction_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A unique ID generated by PayPal for this transaction.",
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
      title: "payment_method_details_paypal",
      description: "",
      identifier: "Stripepayment_method_details_paypal",
    }),
);
export const Stripepayment_method_details_payment_record_alma = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_payment_record_alma> =>
    Schema.StructWithRest(
      Schema.Struct({
        installments: Schema.optionalKey(
          Stripepayments_primitives_payment_records_resource_payment_method_alma_details_resource_installments,
        ),
        transaction_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Alma transaction ID associated with this payment.",
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
      title: "payment_method_details_payment_record_alma",
      description: "",
      identifier: "Stripepayment_method_details_payment_record_alma",
    }),
);
export const Stripepayment_method_details_payment_record_konbini =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_payment_record_konbini> =>
      Schema.StructWithRest(
        Schema.Struct({
          store: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_konbini_details_resource_store,
              ]).annotate({
                description:
                  "If the payment succeeded, this contains the details of the convenience store where the payment was completed.",
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
        title: "payment_method_details_payment_record_konbini",
        description: "",
        identifier: "Stripepayment_method_details_payment_record_konbini",
      }),
  );
export const Stripepayment_method_details_payment_record_mobilepay =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_payment_record_mobilepay> =>
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_mobilepay_details_resource_card,
              ]).annotate({ description: "Internal card details" }),
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
        title: "payment_method_details_payment_record_mobilepay",
        description: "",
        identifier: "Stripepayment_method_details_payment_record_mobilepay",
      }),
  );
export const Stripepayment_method_details_card_wallet = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_card_wallet> =>
    Schema.StructWithRest(
      Schema.Struct({
        amex_express_checkout: Schema.optionalKey(
          Stripepayment_method_details_card_wallet_amex_express_checkout,
        ),
        apple_pay: Schema.optionalKey(
          Stripepayment_method_details_card_wallet_apple_pay,
        ),
        dynamic_last4: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "(For tokenized numbers only.) The last four digits of the device account number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        google_pay: Schema.optionalKey(
          Stripepayment_method_details_card_wallet_google_pay,
        ),
        link: Schema.optionalKey(Stripepayment_method_details_card_wallet_link),
        masterpass: Schema.optionalKey(
          Stripepayment_method_details_card_wallet_masterpass,
        ),
        samsung_pay: Schema.optionalKey(
          Stripepayment_method_details_card_wallet_samsung_pay,
        ),
        type: Schema.Literals([
          "amex_express_checkout",
          "apple_pay",
          "google_pay",
          "link",
          "masterpass",
          "samsung_pay",
          "visa_checkout",
        ]).annotate({
          description:
            "The type of the card wallet, one of `amex_express_checkout`, `apple_pay`, `google_pay`, `masterpass`, `samsung_pay`, `visa_checkout`, or `link`. An additional hash is included on the Wallet subhash with a name matching this value. It contains additional information specific to the card wallet type.",
        }),
        visa_checkout: Schema.optionalKey(
          Stripepayment_method_details_card_wallet_visa_checkout,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_details_card_wallet",
      description: "",
      identifier: "Stripepayment_method_details_card_wallet",
    }),
);
export const Stripepayment_method_details_amazon_pay = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_amazon_pay> =>
    Schema.StructWithRest(
      Schema.Struct({
        funding: Schema.optionalKey(
          Stripeamazon_pay_underlying_payment_method_funding_details,
        ),
        transaction_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Amazon Pay transaction ID associated with this payment.",
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
      title: "payment_method_details_amazon_pay",
      description: "",
      identifier: "Stripepayment_method_details_amazon_pay",
    }),
);
export const Stripepayment_method_details_revolut_pay = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_revolut_pay> =>
    Schema.StructWithRest(
      Schema.Struct({
        funding: Schema.optionalKey(
          Striperevolut_pay_underlying_payment_method_funding_details,
        ),
        transaction_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Revolut Pay transaction ID associated with this payment.",
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
      title: "payment_method_details_revolut_pay",
      description: "",
      identifier: "Stripepayment_method_details_revolut_pay",
    }),
);
export const Stripepayment_method_details_klarna = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_klarna> =>
    Schema.StructWithRest(
      Schema.Struct({
        location: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        payer_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeklarna_payer_details]).annotate({
              description: "The payer details for this transaction.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_category: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Klarna payment method used for this transaction.\nCan be one of `pay_later`, `pay_now`, `pay_with_financing`, or `pay_in_installments`",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        preferred_locale: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Preferred language of the Klarna authorization page that the customer is redirected to.\nCan be one of `de-AT`, `en-AT`, `nl-BE`, `fr-BE`, `en-BE`, `de-DE`, `en-DE`, `da-DK`, `en-DK`, `es-ES`, `en-ES`, `fi-FI`, `sv-FI`, `en-FI`, `en-GB`, `en-IE`, `it-IT`, `en-IT`, `nl-NL`, `en-NL`, `nb-NO`, `en-NO`, `sv-SE`, `en-SE`, `en-US`, `es-US`, `fr-FR`, `en-FR`, `cs-CZ`, `en-CZ`, `ro-RO`, `en-RO`, `el-GR`, `en-GR`, `en-AU`, `en-NZ`, `en-CA`, `fr-CA`, `pl-PL`, `en-PL`, `pt-PT`, `en-PT`, `de-CH`, `fr-CH`, `it-CH`, or `en-CH`",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        reader: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
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
      title: "payment_method_details_klarna",
      description: "",
      identifier: "Stripepayment_method_details_klarna",
    }),
);
export const Stripepayment_method_details_payment_record_amazon_pay =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_payment_record_amazon_pay> =>
      Schema.StructWithRest(
        Schema.Struct({
          funding: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_amazon_pay_details_resource_funding,
          ),
          transaction_id: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The Amazon Pay transaction ID associated with this payment.",
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
        title: "payment_method_details_payment_record_amazon_pay",
        description: "",
        identifier: "Stripepayment_method_details_payment_record_amazon_pay",
      }),
  );
export const Stripepayment_method_details_payment_record_klarna =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_payment_record_klarna> =>
      Schema.StructWithRest(
        Schema.Struct({
          location: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "ID of the [location](https://docs.stripe.com/api/terminal/locations) that this transaction's reader is assigned to.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          payer_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripepayments_primitives_payment_records_resource_payment_method_klarna_details_resource_payer_details,
              ]).annotate({
                description: "The payer details for this transaction.",
              }),
              Schema.Null,
            ]),
          ),
          payment_method_category: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The Klarna payment method used for this transaction. Can be one of `pay_later`, `pay_now`, `pay_with_financing`, or `pay_in_installments`",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          preferred_locale: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Preferred language of the Klarna authorization page that the customer is redirected to. Can be one of `de-AT`, `en-AT`, `nl-BE`, `fr-BE`, `en-BE`, `de-DE`, `en-DE`, `da-DK`, `en-DK`, `es-ES`, `en-ES`, `fi-FI`, `sv-FI`, `en-FI`, `en-GB`, `en-IE`, `it-IT`, `en-IT`, `nl-NL`, `en-NL`, `nb-NO`, `en-NO`, `sv-SE`, `en-SE`, `en-US`, `es-US`, `fr-FR`, `en-FR`, `cs-CZ`, `en-CZ`, `ro-RO`, `en-RO`, `el-GR`, `en-GR`, `en-AU`, `en-NZ`, `en-CA`, `fr-CA`, `pl-PL`, `en-PL`, `pt-PT`, `en-PT`, `de-CH`, `fr-CH`, `it-CH`, or `en-CH`",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          reader: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "ID of the [reader](https://docs.stripe.com/api/terminal/readers) this transaction was made on.",
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
        title: "payment_method_details_payment_record_klarna",
        description: "",
        identifier: "Stripepayment_method_details_payment_record_klarna",
      }),
  );
export const Stripepayment_method_details_payment_record_revolut_pay =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_details_payment_record_revolut_pay> =>
      Schema.StructWithRest(
        Schema.Struct({
          funding: Schema.optionalKey(
            Stripepayments_primitives_payment_records_resource_payment_method_revolut_pay_details_resource_funding,
          ),
          transaction_id: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The Revolut Pay transaction ID associated with this payment.",
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
        title: "payment_method_details_payment_record_revolut_pay",
        description: "",
        identifier: "Stripepayment_method_details_payment_record_revolut_pay",
      }),
  );
export const Stripepayment_method_details_card = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_details_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_authorized: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The authorized amount.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        authorization_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Authorization code on the charge.",
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
        capture_before: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "When using manual capture, a future timestamp at which the charge will be automatically refunded if uncaptured.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        checks: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_method_details_card_checks]).annotate({
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
        electronic_commerce_indicator: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Electronic Commerce Indicator (ECI) returned by the card network in the authorization response. Indicates the level of authentication used. Only populated for Visa and Mastercard transactions. This is the network's final ECI and can differ from the request value. An authenticated ECI alone doesn't determine liability shift.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        exp_month: Schema.Number.annotate({
          description:
            "Two-digit number representing the card's expiration month.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        exp_year: Schema.Number.annotate({
          description:
            "Four-digit number representing the card's expiration year.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        extended_authorization: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization,
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
        incremental_authorization: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization,
        ),
        installments: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_details_card_installments,
            ]).annotate({
              description:
                "Installment details for this payment.\n\nFor more information, see the [installments integration guide](https://docs.stripe.com/payments/installments).",
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
        mandate: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripemandate,
            ]).annotate({
              description:
                "ID of the mandate used to make this payment or created by it.",
            }),
            Schema.Null,
          ]),
        ),
        multicapture: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_card_details_api_resource_multicapture,
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
        network_token: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_details_card_network_token,
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
        overcapture: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture,
        ),
        regulated_status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["regulated", "unregulated"]).annotate({
              description: "Status of a card based on the card issuer.",
            }),
            Schema.Null,
          ]),
        ),
        setup_credential_usage: Schema.optionalKey(
          Schema.Literals(["installment", "recurring", "unscheduled"]).annotate(
            {
              description:
                "The payment_method_options.card.setup_credential_usage value that was passed when setup_future_usage was present at confirmation, one of `recurring`, `unscheduled`, or `installment`",
            },
          ),
        ),
        stored_credential_usage: Schema.optionalKey(
          Schema.Literals(["installment", "recurring", "unscheduled"]).annotate(
            {
              description:
                "The payment_method_options.card.stored_credential_usage value that was passed for an off session, merchant-initiated transaction.",
            },
          ),
        ),
        three_d_secure: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripethree_d_secure_details_charge]).annotate({
              description:
                "Populated if this transaction used 3D Secure authentication.",
            }),
            Schema.Null,
          ]),
        ),
        transaction_link_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Transaction Link ID (TLID) is a unique identifier for a transaction. This is used by some card networks, such as Mastercard, for transaction linking, in addition to Network Transaction IDs. This value will be present if it is returned by the financial network in the authorization response, and null otherwise.",
            }).check(
              Schema.isMaxCodePoints(22).annotate({
                expected: "a string with at most 22 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        wallet: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_method_details_card_wallet]).annotate({
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
      title: "payment_method_details_card",
      description: "",
      identifier: "Stripepayment_method_details_card",
    }),
);
