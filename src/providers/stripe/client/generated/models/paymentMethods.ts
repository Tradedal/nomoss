// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripebilling_details } from "./billing.js";
import {
  Stripeaddress,
  Stripecustom_logo,
  Stripenetworks,
  Striperadar_radar_options,
  Stripesepa_debit_generated_from,
  Stripethree_d_secure_usage,
  Stripeus_bank_account_networks,
} from "./common.js";
import { Stripecustomer } from "./customers.js";
import { Stripepayment_method_details_card_present_offline } from "./paymentMethodDetails.js";
import { Stripecard_generated_from_payment_method_details } from "./paymentSources.js";
import {
  Stripepayment_flows_private_payment_methods_alipay,
  Stripepayment_flows_private_payment_methods_card_present_common_wallet,
  Stripepayment_flows_private_payment_methods_klarna_dob,
} from "./payments.js";
import { Stripesetup_attempt } from "./setupIntents.js";

export type Stripepayment_method = {
  readonly acss_debit?: Stripepayment_method_acss_debit;
  readonly affirm?: Stripepayment_method_affirm;
  readonly afterpay_clearpay?: Stripepayment_method_afterpay_clearpay;
  readonly alipay?: Stripepayment_flows_private_payment_methods_alipay;
  readonly allow_redisplay?: "always" | "limited" | "unspecified";
  readonly alma?: Stripepayment_method_alma;
  readonly amazon_pay?: Stripepayment_method_amazon_pay;
  readonly au_becs_debit?: Stripepayment_method_au_becs_debit;
  readonly bacs_debit?: Stripepayment_method_bacs_debit;
  readonly bancontact?: Stripepayment_method_bancontact;
  readonly billie?: Stripepayment_method_billie;
  readonly billing_details: Stripebilling_details;
  readonly bizum?: Stripepayment_method_bizum;
  readonly blik?: Stripepayment_method_blik;
  readonly boleto?: Stripepayment_method_boleto;
  readonly card?: Stripepayment_method_card;
  readonly card_present?: Stripepayment_method_card_present;
  readonly cashapp?: Stripepayment_method_cashapp;
  readonly created: number;
  readonly crypto?: Stripepayment_method_crypto;
  readonly custom?: Stripepayment_method_custom;
  readonly customer?: string | Stripecustomer | null;
  readonly customer_account?: string | null;
  readonly customer_balance?: Stripepayment_method_customer_balance;
  readonly eps?: Stripepayment_method_eps;
  readonly fpx?: Stripepayment_method_fpx;
  readonly giropay?: Stripepayment_method_giropay;
  readonly grabpay?: Stripepayment_method_grabpay;
  readonly id: string;
  readonly ideal?: Stripepayment_method_ideal;
  readonly interac_present?: Stripepayment_method_interac_present;
  readonly kakao_pay?: Stripepayment_method_kakao_pay;
  readonly klarna?: Stripepayment_method_klarna;
  readonly konbini?: Stripepayment_method_konbini;
  readonly kr_card?: Stripepayment_method_kr_card;
  readonly link?: Stripepayment_method_link;
  readonly livemode: boolean;
  readonly mb_way?: Stripepayment_method_mb_way;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly mobilepay?: Stripepayment_method_mobilepay;
  readonly multibanco?: Stripepayment_method_multibanco;
  readonly naver_pay?: Stripepayment_method_naver_pay;
  readonly nz_bank_account?: Stripepayment_method_nz_bank_account;
  readonly object: "payment_method";
  readonly oxxo?: Stripepayment_method_oxxo;
  readonly p24?: Stripepayment_method_p24;
  readonly pay_by_bank?: Stripepayment_method_pay_by_bank;
  readonly payco?: Stripepayment_method_payco;
  readonly paynow?: Stripepayment_method_paynow;
  readonly paypal?: Stripepayment_method_paypal;
  readonly paypay?: Stripepayment_method_paypay;
  readonly payto?: Stripepayment_method_payto;
  readonly pix?: Stripepayment_method_pix;
  readonly promptpay?: Stripepayment_method_promptpay;
  readonly radar_options?: Striperadar_radar_options;
  readonly revolut_pay?: Stripepayment_method_revolut_pay;
  readonly samsung_pay?: Stripepayment_method_samsung_pay;
  readonly satispay?: Stripepayment_method_satispay;
  readonly scalapay?: Stripepayment_method_scalapay;
  readonly sepa_debit?: Stripepayment_method_sepa_debit;
  readonly sequra?: Stripepayment_method_sequra;
  readonly sofort?: Stripepayment_method_sofort;
  readonly sunbit?: Stripepayment_method_sunbit;
  readonly swish?: Stripepayment_method_swish;
  readonly twint?: Stripepayment_method_twint;
  readonly type:
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
    | "card_present"
    | "cashapp"
    | "crypto"
    | "custom"
    | "customer_balance"
    | "eps"
    | "fpx"
    | "giropay"
    | "grabpay"
    | "ideal"
    | "interac_present"
    | "kakao_pay"
    | "klarna"
    | "konbini"
    | "kr_card"
    | "link"
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
    | "zip";
  readonly upi?: Stripepayment_method_upi;
  readonly us_bank_account?: Stripepayment_method_us_bank_account;
  readonly wechat_pay?: Stripepayment_method_wechat_pay;
  readonly zip?: Stripepayment_method_zip;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_sepa_debit = {
  readonly bank_code?: string | null;
  readonly branch_code?: string | null;
  readonly country?: string | null;
  readonly fingerprint?: string | null;
  readonly generated_from?: Stripesepa_debit_generated_from | null;
  readonly last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_acss_debit = {
  readonly bank_name?: string | null;
  readonly fingerprint?: string | null;
  readonly institution_number?: string | null;
  readonly last4?: string | null;
  readonly transit_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_affirm = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_afterpay_clearpay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_alma = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_amazon_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_au_becs_debit = {
  readonly bsb_number?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_bacs_debit = {
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly sort_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_bancontact = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_billie = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_bizum = {
  readonly buyer_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_blik = {
  readonly buyer_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_boleto = { readonly tax_id: string } & {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_card_checks = {
  readonly address_line1_check?: string | null;
  readonly address_postal_code_check?: string | null;
  readonly cvc_check?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_config_biz_payment_method_configuration_details =
  { readonly id: string; readonly parent?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripepayment_method_card_wallet_amex_express_checkout = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_card_wallet_apple_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_card_wallet_google_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_card_wallet_link = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_card_wallet_samsung_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_card_present_networks = {
  readonly available: ReadonlyArray<string>;
  readonly preferred?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_cashapp = {
  readonly buyer_id?: string | null;
  readonly cashtag?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_crypto = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_customer_balance = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_eps = {
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
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_fpx = {
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
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_giropay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_grabpay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_ideal = {
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
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_kakao_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_konbini = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_kr_card = {
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
  readonly last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_link = { readonly email?: string | null } & {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_mb_way = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_mobilepay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_multibanco = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_naver_pay = {
  readonly buyer_id?: string | null;
  readonly funding: "card" | "points";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_nz_bank_account = {
  readonly account_holder_name?: string | null;
  readonly bank_code: string;
  readonly bank_name: string;
  readonly branch_code: string;
  readonly last4: string;
  readonly suffix?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_oxxo = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_p24 = {
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
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_pay_by_bank = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_payco = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_paynow = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_paypal = {
  readonly country?: string | null;
  readonly payer_email?: string | null;
  readonly payer_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_paypay = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_payto = {
  readonly bsb_number?: string | null;
  readonly last4?: string | null;
  readonly pay_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_pix = {
  readonly fingerprint?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_promptpay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_revolut_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_samsung_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_satispay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_scalapay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_sequra = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_sofort = {
  readonly country?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_sunbit = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_swish = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_twint = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_upi = { readonly vpa?: string | null } & {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_us_bank_account_blocked = {
  readonly network_code?:
    | "R02"
    | "R03"
    | "R04"
    | "R05"
    | "R07"
    | "R08"
    | "R10"
    | "R11"
    | "R16"
    | "R20"
    | "R29"
    | "R31"
    | null;
  readonly reason?:
    | "bank_account_closed"
    | "bank_account_frozen"
    | "bank_account_invalid_details"
    | "bank_account_restricted"
    | "bank_account_unusable"
    | "debit_not_authorized"
    | "tokenized_account_number_deactivated"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_wechat_pay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_zip = { readonly [x: string]: Schema.Json };
export type Stripepayment_method_config_resource_display_preference = {
  readonly overridable?: boolean | null;
  readonly preference: "none" | "off" | "on";
  readonly value: "off" | "on";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_domain_resource_payment_method_status_details =
  { readonly error_message: string } & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_card_wallet_masterpass = {
  readonly billing_address?: Stripeaddress | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly shipping_address?: Stripeaddress | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_card_wallet_visa_checkout = {
  readonly billing_address?: Stripeaddress | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly shipping_address?: Stripeaddress | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_card_present = {
  readonly brand?: string | null;
  readonly brand_product?: string | null;
  readonly cardholder_name?: string | null;
  readonly country?: string | null;
  readonly description?: string | null;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly fingerprint?: string | null;
  readonly funding?: string | null;
  readonly issuer?: string | null;
  readonly last4?: string | null;
  readonly networks?: Stripepayment_method_card_present_networks | null;
  readonly offline?: Stripepayment_method_details_card_present_offline | null;
  readonly preferred_locales?: ReadonlyArray<string> | null;
  readonly read_method?:
    | "contact_emv"
    | "contactless_emv"
    | "contactless_magstripe_mode"
    | "magnetic_stripe_fallback"
    | "magnetic_stripe_track2"
    | null;
  readonly wallet?: Stripepayment_flows_private_payment_methods_card_present_common_wallet;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_interac_present = {
  readonly brand?: string | null;
  readonly cardholder_name?: string | null;
  readonly country?: string | null;
  readonly description?: string | null;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly fingerprint?: string | null;
  readonly funding?: string | null;
  readonly issuer?: string | null;
  readonly last4?: string | null;
  readonly networks?: Stripepayment_method_card_present_networks | null;
  readonly preferred_locales?: ReadonlyArray<string> | null;
  readonly read_method?:
    | "contact_emv"
    | "contactless_emv"
    | "contactless_magstripe_mode"
    | "magnetic_stripe_fallback"
    | "magnetic_stripe_track2"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_custom = {
  readonly display_name?: string | null;
  readonly logo?: Stripecustom_logo | null;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_klarna = {
  readonly dob?: Stripepayment_flows_private_payment_methods_klarna_dob | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_us_bank_account_status_details = {
  readonly blocked?: Stripepayment_method_us_bank_account_blocked;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_config_resource_payment_method_properties = {
  readonly available: boolean;
  readonly display_preference: Stripepayment_method_config_resource_display_preference;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_domain_resource_payment_method_status = {
  readonly status: "active" | "inactive";
  readonly status_details?: Stripepayment_method_domain_resource_payment_method_status_details;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_card_wallet = {
  readonly amex_express_checkout?: Stripepayment_method_card_wallet_amex_express_checkout;
  readonly apple_pay?: Stripepayment_method_card_wallet_apple_pay;
  readonly dynamic_last4?: string | null;
  readonly google_pay?: Stripepayment_method_card_wallet_google_pay;
  readonly link?: Stripepayment_method_card_wallet_link;
  readonly masterpass?: Stripepayment_method_card_wallet_masterpass;
  readonly samsung_pay?: Stripepayment_method_card_wallet_samsung_pay;
  readonly type:
    | "amex_express_checkout"
    | "apple_pay"
    | "google_pay"
    | "link"
    | "masterpass"
    | "samsung_pay"
    | "visa_checkout";
  readonly visa_checkout?: Stripepayment_method_card_wallet_visa_checkout;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_us_bank_account = {
  readonly account_holder_type?: "company" | "individual" | null;
  readonly account_type?: "checking" | "savings" | null;
  readonly bank_name?: string | null;
  readonly financial_connections_account?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly networks?: Stripeus_bank_account_networks | null;
  readonly routing_number?: string | null;
  readonly status_details?: Stripepayment_method_us_bank_account_status_details | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_configuration = {
  readonly acss_debit?: Stripepayment_method_config_resource_payment_method_properties;
  readonly active: boolean;
  readonly affirm?: Stripepayment_method_config_resource_payment_method_properties;
  readonly afterpay_clearpay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly alipay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly alma?: Stripepayment_method_config_resource_payment_method_properties;
  readonly amazon_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly apple_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly application?: string | null;
  readonly au_becs_debit?: Stripepayment_method_config_resource_payment_method_properties;
  readonly bacs_debit?: Stripepayment_method_config_resource_payment_method_properties;
  readonly bancontact?: Stripepayment_method_config_resource_payment_method_properties;
  readonly billie?: Stripepayment_method_config_resource_payment_method_properties;
  readonly bizum?: Stripepayment_method_config_resource_payment_method_properties;
  readonly blik?: Stripepayment_method_config_resource_payment_method_properties;
  readonly boleto?: Stripepayment_method_config_resource_payment_method_properties;
  readonly card?: Stripepayment_method_config_resource_payment_method_properties;
  readonly cartes_bancaires?: Stripepayment_method_config_resource_payment_method_properties;
  readonly cashapp?: Stripepayment_method_config_resource_payment_method_properties;
  readonly crypto?: Stripepayment_method_config_resource_payment_method_properties;
  readonly customer_balance?: Stripepayment_method_config_resource_payment_method_properties;
  readonly eps?: Stripepayment_method_config_resource_payment_method_properties;
  readonly fpx?: Stripepayment_method_config_resource_payment_method_properties;
  readonly giropay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly google_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly grabpay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly id: string;
  readonly ideal?: Stripepayment_method_config_resource_payment_method_properties;
  readonly is_default: boolean;
  readonly jcb?: Stripepayment_method_config_resource_payment_method_properties;
  readonly kakao_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly klarna?: Stripepayment_method_config_resource_payment_method_properties;
  readonly konbini?: Stripepayment_method_config_resource_payment_method_properties;
  readonly kr_card?: Stripepayment_method_config_resource_payment_method_properties;
  readonly link?: Stripepayment_method_config_resource_payment_method_properties;
  readonly livemode: boolean;
  readonly mb_way?: Stripepayment_method_config_resource_payment_method_properties;
  readonly mobilepay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly multibanco?: Stripepayment_method_config_resource_payment_method_properties;
  readonly name: string;
  readonly naver_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly nz_bank_account?: Stripepayment_method_config_resource_payment_method_properties;
  readonly object: "payment_method_configuration";
  readonly oxxo?: Stripepayment_method_config_resource_payment_method_properties;
  readonly p24?: Stripepayment_method_config_resource_payment_method_properties;
  readonly parent?: string | null;
  readonly pay_by_bank?: Stripepayment_method_config_resource_payment_method_properties;
  readonly payco?: Stripepayment_method_config_resource_payment_method_properties;
  readonly paynow?: Stripepayment_method_config_resource_payment_method_properties;
  readonly paypal?: Stripepayment_method_config_resource_payment_method_properties;
  readonly paypay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly payto?: Stripepayment_method_config_resource_payment_method_properties;
  readonly pix?: Stripepayment_method_config_resource_payment_method_properties;
  readonly promptpay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly revolut_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly samsung_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly satispay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly scalapay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly sepa_debit?: Stripepayment_method_config_resource_payment_method_properties;
  readonly sequra?: Stripepayment_method_config_resource_payment_method_properties;
  readonly sofort?: Stripepayment_method_config_resource_payment_method_properties;
  readonly sunbit?: Stripepayment_method_config_resource_payment_method_properties;
  readonly swish?: Stripepayment_method_config_resource_payment_method_properties;
  readonly twint?: Stripepayment_method_config_resource_payment_method_properties;
  readonly upi?: Stripepayment_method_config_resource_payment_method_properties;
  readonly us_bank_account?: Stripepayment_method_config_resource_payment_method_properties;
  readonly wechat_pay?: Stripepayment_method_config_resource_payment_method_properties;
  readonly zip?: Stripepayment_method_config_resource_payment_method_properties;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_domain = {
  readonly amazon_pay: Stripepayment_method_domain_resource_payment_method_status;
  readonly apple_pay: Stripepayment_method_domain_resource_payment_method_status;
  readonly created: number;
  readonly domain_name: string;
  readonly enabled: boolean;
  readonly google_pay: Stripepayment_method_domain_resource_payment_method_status;
  readonly id: string;
  readonly klarna: Stripepayment_method_domain_resource_payment_method_status;
  readonly link: Stripepayment_method_domain_resource_payment_method_status;
  readonly livemode: boolean;
  readonly object: "payment_method_domain";
  readonly paypal: Stripepayment_method_domain_resource_payment_method_status;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_card_generated_card = {
  readonly charge?: string | null;
  readonly payment_method_details?: Stripecard_generated_from_payment_method_details | null;
  readonly setup_attempt?: string | Stripesetup_attempt | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_card = {
  readonly brand: string;
  readonly checks?: Stripepayment_method_card_checks | null;
  readonly country?: string | null;
  readonly display_brand?: string | null;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly fingerprint?: string | null;
  readonly funding: string;
  readonly generated_from?: Stripepayment_method_card_generated_card | null;
  readonly last4: string;
  readonly networks?: Stripenetworks | null;
  readonly regulated_status?: "regulated" | "unregulated" | null;
  readonly three_d_secure_usage?: Stripethree_d_secure_usage | null;
  readonly wallet?: Stripepayment_method_card_wallet | null;
} & { readonly [x: string]: Schema.Json };

export const Stripepayment_method = Schema.suspend(
  (): Schema.Codec<Stripepayment_method> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(Stripepayment_method_acss_debit),
        affirm: Schema.optionalKey(Stripepayment_method_affirm),
        afterpay_clearpay: Schema.optionalKey(
          Stripepayment_method_afterpay_clearpay,
        ),
        alipay: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_alipay,
        ),
        allow_redisplay: Schema.optionalKey(
          Schema.Literals(["always", "limited", "unspecified"]).annotate({
            description:
              "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to “unspecified”.",
          }),
        ),
        alma: Schema.optionalKey(Stripepayment_method_alma),
        amazon_pay: Schema.optionalKey(Stripepayment_method_amazon_pay),
        au_becs_debit: Schema.optionalKey(Stripepayment_method_au_becs_debit),
        bacs_debit: Schema.optionalKey(Stripepayment_method_bacs_debit),
        bancontact: Schema.optionalKey(Stripepayment_method_bancontact),
        billie: Schema.optionalKey(Stripepayment_method_billie),
        billing_details: Stripebilling_details,
        bizum: Schema.optionalKey(Stripepayment_method_bizum),
        blik: Schema.optionalKey(Stripepayment_method_blik),
        boleto: Schema.optionalKey(Stripepayment_method_boleto),
        card: Schema.optionalKey(Stripepayment_method_card),
        card_present: Schema.optionalKey(Stripepayment_method_card_present),
        cashapp: Schema.optionalKey(Stripepayment_method_cashapp),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        crypto: Schema.optionalKey(Stripepayment_method_crypto),
        custom: Schema.optionalKey(Stripepayment_method_custom),
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
            ]).annotate({
              description:
                "The ID of the Customer to which this PaymentMethod is saved. This will not be set when the PaymentMethod has not been saved to a Customer.",
            }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_balance: Schema.optionalKey(
          Stripepayment_method_customer_balance,
        ),
        eps: Schema.optionalKey(Stripepayment_method_eps),
        fpx: Schema.optionalKey(Stripepayment_method_fpx),
        giropay: Schema.optionalKey(Stripepayment_method_giropay),
        grabpay: Schema.optionalKey(Stripepayment_method_grabpay),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        ideal: Schema.optionalKey(Stripepayment_method_ideal),
        interac_present: Schema.optionalKey(
          Stripepayment_method_interac_present,
        ),
        kakao_pay: Schema.optionalKey(Stripepayment_method_kakao_pay),
        klarna: Schema.optionalKey(Stripepayment_method_klarna),
        konbini: Schema.optionalKey(Stripepayment_method_konbini),
        kr_card: Schema.optionalKey(Stripepayment_method_kr_card),
        link: Schema.optionalKey(Stripepayment_method_link),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        mb_way: Schema.optionalKey(Stripepayment_method_mb_way),
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
        mobilepay: Schema.optionalKey(Stripepayment_method_mobilepay),
        multibanco: Schema.optionalKey(Stripepayment_method_multibanco),
        naver_pay: Schema.optionalKey(Stripepayment_method_naver_pay),
        nz_bank_account: Schema.optionalKey(
          Stripepayment_method_nz_bank_account,
        ),
        object: Schema.Literal("payment_method").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        oxxo: Schema.optionalKey(Stripepayment_method_oxxo),
        p24: Schema.optionalKey(Stripepayment_method_p24),
        pay_by_bank: Schema.optionalKey(Stripepayment_method_pay_by_bank),
        payco: Schema.optionalKey(Stripepayment_method_payco),
        paynow: Schema.optionalKey(Stripepayment_method_paynow),
        paypal: Schema.optionalKey(Stripepayment_method_paypal),
        paypay: Schema.optionalKey(Stripepayment_method_paypay),
        payto: Schema.optionalKey(Stripepayment_method_payto),
        pix: Schema.optionalKey(Stripepayment_method_pix),
        promptpay: Schema.optionalKey(Stripepayment_method_promptpay),
        radar_options: Schema.optionalKey(Striperadar_radar_options),
        revolut_pay: Schema.optionalKey(Stripepayment_method_revolut_pay),
        samsung_pay: Schema.optionalKey(Stripepayment_method_samsung_pay),
        satispay: Schema.optionalKey(Stripepayment_method_satispay),
        scalapay: Schema.optionalKey(Stripepayment_method_scalapay),
        sepa_debit: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripepayment_method_sepa_debit> =>
              Stripepayment_method_sepa_debit,
          ),
        ),
        sequra: Schema.optionalKey(Stripepayment_method_sequra),
        sofort: Schema.optionalKey(Stripepayment_method_sofort),
        sunbit: Schema.optionalKey(Stripepayment_method_sunbit),
        swish: Schema.optionalKey(Stripepayment_method_swish),
        twint: Schema.optionalKey(Stripepayment_method_twint),
        type: Schema.Literals([
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
          "card_present",
          "cashapp",
          "crypto",
          "custom",
          "customer_balance",
          "eps",
          "fpx",
          "giropay",
          "grabpay",
          "ideal",
          "interac_present",
          "kakao_pay",
          "klarna",
          "konbini",
          "kr_card",
          "link",
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
        ]).annotate({
          description:
            "The type of the PaymentMethod. An additional hash is included on the PaymentMethod with a name matching this value. It contains additional information specific to the PaymentMethod type.",
        }),
        upi: Schema.optionalKey(Stripepayment_method_upi),
        us_bank_account: Schema.optionalKey(
          Stripepayment_method_us_bank_account,
        ),
        wechat_pay: Schema.optionalKey(Stripepayment_method_wechat_pay),
        zip: Schema.optionalKey(Stripepayment_method_zip),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentMethod",
      description:
        "PaymentMethod objects represent your customer's payment instruments.\nYou can use them with [PaymentIntents](https://docs.stripe.com/payments/payment-intents) to collect payments or save them to\nCustomer objects to store instrument details for future payments.\n\nRelated guides: [Payment Methods](https://docs.stripe.com/payments/payment-methods) and [More Payment Scenarios](https://docs.stripe.com/payments/more-payment-scenarios).",
      identifier: "Stripepayment_method",
    }),
);
export const Stripepayment_method_sepa_debit = Schema.StructWithRest(
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
    generated_from: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.suspend(
            (): Schema.Codec<Stripesepa_debit_generated_from> =>
              Stripesepa_debit_generated_from,
          ),
        ]).annotate({
          description:
            "Information about the object that generated this PaymentMethod.",
        }),
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_sepa_debit",
  description: "",
  identifier: "Stripepayment_method_sepa_debit",
});
export const Stripepayment_method_acss_debit = Schema.StructWithRest(
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
          description: "Institution number of the bank account.",
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
  title: "payment_method_acss_debit",
  description: "",
  identifier: "Stripepayment_method_acss_debit",
});
export const Stripepayment_method_affirm = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_affirm",
  description: "",
  identifier: "Stripepayment_method_affirm",
});
export const Stripepayment_method_afterpay_clearpay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_afterpay_clearpay",
  description: "",
  identifier: "Stripepayment_method_afterpay_clearpay",
});
export const Stripepayment_method_alma = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_alma",
  description: "",
  identifier: "Stripepayment_method_alma",
});
export const Stripepayment_method_amazon_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_amazon_pay",
  description: "",
  identifier: "Stripepayment_method_amazon_pay",
});
export const Stripepayment_method_au_becs_debit = Schema.StructWithRest(
  Schema.Struct({
    bsb_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Six-digit number identifying bank and branch associated with this bank account.",
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_au_becs_debit",
  description: "",
  identifier: "Stripepayment_method_au_becs_debit",
});
export const Stripepayment_method_bacs_debit = Schema.StructWithRest(
  Schema.Struct({
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
  title: "payment_method_bacs_debit",
  description: "",
  identifier: "Stripepayment_method_bacs_debit",
});
export const Stripepayment_method_bancontact = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_bancontact",
  description: "",
  identifier: "Stripepayment_method_bancontact",
});
export const Stripepayment_method_billie = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_billie",
  description: "",
  identifier: "Stripepayment_method_billie",
});
export const Stripepayment_method_bizum = Schema.StructWithRest(
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_bizum",
  description: "",
  identifier: "Stripepayment_method_bizum",
});
export const Stripepayment_method_blik = Schema.StructWithRest(
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
  title: "payment_method_blik",
  description: "",
  identifier: "Stripepayment_method_blik",
});
export const Stripepayment_method_boleto = Schema.StructWithRest(
  Schema.Struct({
    tax_id: Schema.String.annotate({
      description: "Uniquely identifies the customer tax id (CNPJ or CPF)",
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
  title: "payment_method_boleto",
  description: "",
  identifier: "Stripepayment_method_boleto",
});
export const Stripepayment_method_card_checks = Schema.StructWithRest(
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
  title: "payment_method_card_checks",
  description: "",
  identifier: "Stripepayment_method_card_checks",
});
export const Stripepayment_method_config_biz_payment_method_configuration_details =
  Schema.StructWithRest(
    Schema.Struct({
      id: Schema.String.annotate({
        description: "ID of the payment method configuration used.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      parent: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "ID of the parent payment method configuration used.",
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
    title: "PaymentMethodConfigBizPaymentMethodConfigurationDetails",
    description: "",
    identifier:
      "Stripepayment_method_config_biz_payment_method_configuration_details",
  });
export const Stripepayment_method_card_wallet_amex_express_checkout =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "payment_method_card_wallet_amex_express_checkout",
    description: "",
    identifier: "Stripepayment_method_card_wallet_amex_express_checkout",
  });
export const Stripepayment_method_card_wallet_apple_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_card_wallet_apple_pay",
  description: "",
  identifier: "Stripepayment_method_card_wallet_apple_pay",
});
export const Stripepayment_method_card_wallet_google_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_card_wallet_google_pay",
  description: "",
  identifier: "Stripepayment_method_card_wallet_google_pay",
});
export const Stripepayment_method_card_wallet_link = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_card_wallet_link",
  description: "",
  identifier: "Stripepayment_method_card_wallet_link",
});
export const Stripepayment_method_card_wallet_samsung_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_card_wallet_samsung_pay",
  description: "",
  identifier: "Stripepayment_method_card_wallet_samsung_pay",
});
export const Stripepayment_method_card_present_networks = Schema.StructWithRest(
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
          description: "The preferred network for the card.",
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
  title: "payment_method_card_present_networks",
  description: "",
  identifier: "Stripepayment_method_card_present_networks",
});
export const Stripepayment_method_cashapp = Schema.StructWithRest(
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_cashapp",
  description: "",
  identifier: "Stripepayment_method_cashapp",
});
export const Stripepayment_method_crypto = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_crypto",
  description: "",
  identifier: "Stripepayment_method_crypto",
});
export const Stripepayment_method_customer_balance = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_customer_balance",
  description: "",
  identifier: "Stripepayment_method_customer_balance",
});
export const Stripepayment_method_eps = Schema.StructWithRest(
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_eps",
  description: "",
  identifier: "Stripepayment_method_eps",
});
export const Stripepayment_method_fpx = Schema.StructWithRest(
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
        "The customer's bank, if provided. Can be one of `affin_bank`, `agrobank`, `alliance_bank`, `ambank`, `bank_islam`, `bank_muamalat`, `bnp_paribas`, `bank_rakyat`, `bsn`, `cimb`, `citibank`, `hong_leong_bank`, `hsbc`, `kfh`, `maybank2u`, `ocbc`, `public_bank`, `rhb`, `standard_chartered`, `uob`, `deutsche_bank`, `maybank2e`, `mbsb_bank`, `pb_enterprise`, or `bank_of_china`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_fpx",
  description: "",
  identifier: "Stripepayment_method_fpx",
});
export const Stripepayment_method_giropay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_giropay",
  description: "",
  identifier: "Stripepayment_method_giropay",
});
export const Stripepayment_method_grabpay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_grabpay",
  description: "",
  identifier: "Stripepayment_method_grabpay",
});
export const Stripepayment_method_ideal = Schema.StructWithRest(
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
            "The customer's bank, if provided. Can be one of `abn_amro`, `adyen`, `asn_bank`, `bunq`, `buut`, `finom`, `handelsbanken`, `ing`, `knab`, `mollie`, `moneyou`, `n26`, `nn`, `rabobank`, `regiobank`, `revolut`, `sns_bank`, `triodos_bank`, `van_lanschot`, or `yoursafe`.",
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
          description:
            "The Bank Identifier Code of the customer's bank, if the bank was provided.",
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
  title: "payment_method_ideal",
  description: "",
  identifier: "Stripepayment_method_ideal",
});
export const Stripepayment_method_kakao_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_kakao_pay",
  description: "",
  identifier: "Stripepayment_method_kakao_pay",
});
export const Stripepayment_method_konbini = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_konbini",
  description: "",
  identifier: "Stripepayment_method_konbini",
});
export const Stripepayment_method_kr_card = Schema.StructWithRest(
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_kr_card",
  description: "",
  identifier: "Stripepayment_method_kr_card",
});
export const Stripepayment_method_link = Schema.StructWithRest(
  Schema.Struct({
    email: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Account owner's email address.",
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
  title: "payment_method_link",
  description: "",
  identifier: "Stripepayment_method_link",
});
export const Stripepayment_method_mb_way = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_mb_way",
  description: "",
  identifier: "Stripepayment_method_mb_way",
});
export const Stripepayment_method_mobilepay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_mobilepay",
  description: "",
  identifier: "Stripepayment_method_mobilepay",
});
export const Stripepayment_method_multibanco = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_multibanco",
  description: "",
  identifier: "Stripepayment_method_multibanco",
});
export const Stripepayment_method_naver_pay = Schema.StructWithRest(
  Schema.Struct({
    buyer_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Uniquely identifies this particular Naver Pay account. You can use this attribute to check whether two Naver Pay accounts are the same.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    funding: Schema.Literals(["card", "points"]).annotate({
      description:
        "Whether to fund this transaction with Naver Pay points or a card.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_naver_pay",
  description: "",
  identifier: "Stripepayment_method_naver_pay",
});
export const Stripepayment_method_nz_bank_account = Schema.StructWithRest(
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
  title: "payment_method_nz_bank_account",
  description: "",
  identifier: "Stripepayment_method_nz_bank_account",
});
export const Stripepayment_method_oxxo = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_oxxo",
  description: "",
  identifier: "Stripepayment_method_oxxo",
});
export const Stripepayment_method_p24 = Schema.StructWithRest(
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
        ]).annotate({ description: "The customer's bank, if provided." }),
        Schema.Null,
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_p24",
  description: "",
  identifier: "Stripepayment_method_p24",
});
export const Stripepayment_method_pay_by_bank = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_pay_by_bank",
  description: "",
  identifier: "Stripepayment_method_pay_by_bank",
});
export const Stripepayment_method_payco = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_payco",
  description: "",
  identifier: "Stripepayment_method_payco",
});
export const Stripepayment_method_paynow = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_paynow",
  description: "",
  identifier: "Stripepayment_method_paynow",
});
export const Stripepayment_method_paypal = Schema.StructWithRest(
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_paypal",
  description: "",
  identifier: "Stripepayment_method_paypal",
});
export const Stripepayment_method_paypay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_paypay",
  description: "",
  identifier: "Stripepayment_method_paypay",
});
export const Stripepayment_method_payto = Schema.StructWithRest(
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
  title: "payment_method_payto",
  description: "",
  identifier: "Stripepayment_method_payto",
});
export const Stripepayment_method_pix = Schema.StructWithRest(
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
  title: "payment_method_pix",
  description: "",
  identifier: "Stripepayment_method_pix",
});
export const Stripepayment_method_promptpay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_promptpay",
  description: "",
  identifier: "Stripepayment_method_promptpay",
});
export const Stripepayment_method_revolut_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_revolut_pay",
  description: "",
  identifier: "Stripepayment_method_revolut_pay",
});
export const Stripepayment_method_samsung_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_samsung_pay",
  description: "",
  identifier: "Stripepayment_method_samsung_pay",
});
export const Stripepayment_method_satispay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_satispay",
  description: "",
  identifier: "Stripepayment_method_satispay",
});
export const Stripepayment_method_scalapay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_scalapay",
  description: "",
  identifier: "Stripepayment_method_scalapay",
});
export const Stripepayment_method_sequra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_sequra",
  description: "",
  identifier: "Stripepayment_method_sequra",
});
export const Stripepayment_method_sofort = Schema.StructWithRest(
  Schema.Struct({
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "payment_method_sofort",
  description: "",
  identifier: "Stripepayment_method_sofort",
});
export const Stripepayment_method_sunbit = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_sunbit",
  description: "",
  identifier: "Stripepayment_method_sunbit",
});
export const Stripepayment_method_swish = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_swish",
  description: "",
  identifier: "Stripepayment_method_swish",
});
export const Stripepayment_method_twint = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_twint",
  description: "",
  identifier: "Stripepayment_method_twint",
});
export const Stripepayment_method_upi = Schema.StructWithRest(
  Schema.Struct({
    vpa: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Customer's unique Virtual Payment Address",
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
  title: "payment_method_upi",
  description: "",
  identifier: "Stripepayment_method_upi",
});
export const Stripepayment_method_us_bank_account_blocked =
  Schema.StructWithRest(
    Schema.Struct({
      network_code: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "R02",
            "R03",
            "R04",
            "R05",
            "R07",
            "R08",
            "R10",
            "R11",
            "R16",
            "R20",
            "R29",
            "R31",
          ]).annotate({
            description: "The ACH network code that resulted in this block.",
          }),
          Schema.Null,
        ]),
      ),
      reason: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "bank_account_closed",
            "bank_account_frozen",
            "bank_account_invalid_details",
            "bank_account_restricted",
            "bank_account_unusable",
            "debit_not_authorized",
            "tokenized_account_number_deactivated",
          ]).annotate({
            description:
              "The reason why this PaymentMethod's fingerprint has been blocked",
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
    title: "payment_method_us_bank_account_blocked",
    description: "",
    identifier: "Stripepayment_method_us_bank_account_blocked",
  });
export const Stripepayment_method_wechat_pay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_wechat_pay",
  description: "",
  identifier: "Stripepayment_method_wechat_pay",
});
export const Stripepayment_method_zip = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_zip",
  description: "",
  identifier: "Stripepayment_method_zip",
});
export const Stripepayment_method_config_resource_display_preference =
  Schema.StructWithRest(
    Schema.Struct({
      overridable: Schema.optionalKey(
        Schema.Union([
          Schema.Boolean.annotate({
            description:
              "For child configs, whether or not the account's preference will be observed. If `false`, the parent configuration's default is used.",
          }),
          Schema.Null,
        ]),
      ),
      preference: Schema.Literals(["none", "off", "on"]).annotate({
        description: "The account's display preference.",
      }),
      value: Schema.Literals(["off", "on"]).annotate({
        description: "The effective display preference value.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PaymentMethodConfigResourceDisplayPreference",
    description: "",
    identifier: "Stripepayment_method_config_resource_display_preference",
  });
export const Stripepayment_method_domain_resource_payment_method_status_details =
  Schema.StructWithRest(
    Schema.Struct({
      error_message: Schema.String.annotate({
        description:
          "The error message associated with the status of the payment method on the domain.",
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
    title: "PaymentMethodStatusDetail",
    description:
      "Contains additional details about the status of a payment method for a specific payment method domain.",
    identifier:
      "Stripepayment_method_domain_resource_payment_method_status_details",
  });
export const Stripepayment_method_card_wallet_masterpass = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_card_wallet_masterpass> =>
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
      title: "payment_method_card_wallet_masterpass",
      description: "",
      identifier: "Stripepayment_method_card_wallet_masterpass",
    }),
);
export const Stripepayment_method_card_wallet_visa_checkout = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_card_wallet_visa_checkout> =>
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
      title: "payment_method_card_wallet_visa_checkout",
      description: "",
      identifier: "Stripepayment_method_card_wallet_visa_checkout",
    }),
);
export const Stripepayment_method_card_present = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_card_present> =>
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
        networks: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_method_card_present_networks]).annotate(
              {
                description:
                  "Contains information about card networks that can be used to process the payment.",
              },
            ),
            Schema.Null,
          ]),
        ),
        offline: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_details_card_present_offline,
            ]).annotate({
              description: "Details about payment methods collected offline.",
            }),
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
      title: "payment_method_card_present",
      description: "",
      identifier: "Stripepayment_method_card_present",
    }),
);
export const Stripepayment_method_interac_present = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_interac_present> =>
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
        networks: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_method_card_present_networks]).annotate(
              {
                description:
                  "Contains information about card networks that can be used to process the payment.",
              },
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_interac_present",
      description: "",
      identifier: "Stripepayment_method_interac_present",
    }),
);
export const Stripepayment_method_custom = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_custom> =>
    Schema.StructWithRest(
      Schema.Struct({
        display_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Display name of the Dashboard-only CustomPaymentMethodType.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        logo: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecustom_logo]).annotate({
              description:
                "Contains information about the Dashboard-only CustomPaymentMethodType logo.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.String.annotate({
          description:
            "ID of the Dashboard-only CustomPaymentMethodType. Not expandable.",
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
      title: "payment_method_custom",
      description: "",
      identifier: "Stripepayment_method_custom",
    }),
);
export const Stripepayment_method_klarna = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_klarna> =>
    Schema.StructWithRest(
      Schema.Struct({
        dob: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_flows_private_payment_methods_klarna_dob,
            ]).annotate({
              description: "The customer's date of birth, if provided.",
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
      title: "payment_method_klarna",
      description: "",
      identifier: "Stripepayment_method_klarna",
    }),
);
export const Stripepayment_method_us_bank_account_status_details =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_us_bank_account_status_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          blocked: Schema.optionalKey(
            Stripepayment_method_us_bank_account_blocked,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "payment_method_us_bank_account_status_details",
        description: "",
        identifier: "Stripepayment_method_us_bank_account_status_details",
      }),
  );
export const Stripepayment_method_config_resource_payment_method_properties =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_config_resource_payment_method_properties> =>
      Schema.StructWithRest(
        Schema.Struct({
          available: Schema.Boolean.annotate({
            description:
              "Whether this payment method may be offered at checkout. True if `display_preference` is `on` and the payment method's capability is active.",
          }),
          display_preference:
            Stripepayment_method_config_resource_display_preference,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentMethodConfigResourcePaymentMethodProperties",
        description: "",
        identifier:
          "Stripepayment_method_config_resource_payment_method_properties",
      }),
  );
export const Stripepayment_method_domain_resource_payment_method_status =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_domain_resource_payment_method_status> =>
      Schema.StructWithRest(
        Schema.Struct({
          status: Schema.Literals(["active", "inactive"]).annotate({
            description: "The status of the payment method on the domain.",
          }),
          status_details: Schema.optionalKey(
            Stripepayment_method_domain_resource_payment_method_status_details,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PaymentMethodStatus",
        description:
          "Indicates the status of a specific payment method on a payment method domain.",
        identifier:
          "Stripepayment_method_domain_resource_payment_method_status",
      }),
  );
export const Stripepayment_method_card_wallet = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_card_wallet> =>
    Schema.StructWithRest(
      Schema.Struct({
        amex_express_checkout: Schema.optionalKey(
          Stripepayment_method_card_wallet_amex_express_checkout,
        ),
        apple_pay: Schema.optionalKey(
          Stripepayment_method_card_wallet_apple_pay,
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
          Stripepayment_method_card_wallet_google_pay,
        ),
        link: Schema.optionalKey(Stripepayment_method_card_wallet_link),
        masterpass: Schema.optionalKey(
          Stripepayment_method_card_wallet_masterpass,
        ),
        samsung_pay: Schema.optionalKey(
          Stripepayment_method_card_wallet_samsung_pay,
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
          Stripepayment_method_card_wallet_visa_checkout,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_card_wallet",
      description: "",
      identifier: "Stripepayment_method_card_wallet",
    }),
);
export const Stripepayment_method_us_bank_account = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_us_bank_account> =>
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
              description: "The name of the bank.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        financial_connections_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the Financial Connections Account used to create the payment method.",
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
        networks: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeus_bank_account_networks]).annotate({
              description:
                "Contains information about US bank account networks that can be used.",
            }),
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
        status_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_us_bank_account_status_details,
            ]).annotate({
              description:
                "Contains information about the future reusability of this PaymentMethod.",
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
      title: "payment_method_us_bank_account",
      description: "",
      identifier: "Stripepayment_method_us_bank_account",
    }),
);
export const Stripepayment_method_configuration = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_configuration> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        active: Schema.Boolean.annotate({
          description:
            "Whether the configuration can be used for new payments.",
        }),
        affirm: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        afterpay_clearpay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        alipay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        alma: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        amazon_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        apple_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        application: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "For child configs, the Connect application associated with the configuration.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        au_becs_debit: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        bacs_debit: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        bancontact: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        billie: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        bizum: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        blik: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        boleto: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        card: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        cartes_bancaires: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        cashapp: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        crypto: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        customer_balance: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        eps: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        fpx: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        giropay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        google_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        grabpay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        ideal: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        is_default: Schema.Boolean.annotate({
          description:
            "The default configuration is used whenever a payment method configuration is not specified.",
        }),
        jcb: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        kakao_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        klarna: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        konbini: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        kr_card: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        link: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        mb_way: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        mobilepay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        multibanco: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        name: Schema.String.annotate({
          description: "The configuration's name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        naver_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        nz_bank_account: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        object: Schema.Literal("payment_method_configuration").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        oxxo: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        p24: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        parent: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "For child configs, the configuration's parent configuration.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        pay_by_bank: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        payco: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        paynow: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        paypal: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        paypay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        payto: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        pix: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        promptpay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        revolut_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        samsung_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        satispay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        scalapay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        sepa_debit: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        sequra: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        sofort: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        sunbit: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        swish: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        twint: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        upi: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        us_bank_account: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        wechat_pay: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
        zip: Schema.optionalKey(
          Stripepayment_method_config_resource_payment_method_properties,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Payment Method Configuration",
      description:
        "PaymentMethodConfigurations control which payment methods are displayed to your customers when you don't explicitly specify payment method types. You can have multiple configurations with different sets of payment methods for different scenarios.\n\nThere are two types of PaymentMethodConfigurations. Which is used depends on the [charge type](https://docs.stripe.com/connect/charges):\n\n**Direct** configurations apply to payments created on your account, including Connect destination charges, Connect separate charges and transfers, and payments not involving Connect.\n\n**Child** configurations apply to payments created on your connected accounts using direct charges, and charges with the on_behalf_of parameter.\n\nChild configurations have a `parent` that sets default values and controls which settings connected accounts may override. You can specify a parent ID at payment time, and Stripe will automatically resolve the connected account’s associated child configuration. Parent configurations are [managed in the dashboard](https://dashboard.stripe.com/settings/payment_methods/connected_accounts) and are not available in this API.\n\nRelated guides:\n- [Payment Method Configurations API](https://docs.stripe.com/connect/payment-method-configurations)\n- [Multiple configurations on dynamic payment methods](https://docs.stripe.com/payments/multiple-payment-method-configs)\n- [Multiple configurations for your Connect accounts](https://docs.stripe.com/connect/multiple-payment-method-configurations)",
      identifier: "Stripepayment_method_configuration",
    }),
);
export const Stripepayment_method_domain = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_domain> =>
    Schema.StructWithRest(
      Schema.Struct({
        amazon_pay: Stripepayment_method_domain_resource_payment_method_status,
        apple_pay: Stripepayment_method_domain_resource_payment_method_status,
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        domain_name: Schema.String.annotate({
          description:
            "The domain name that this payment method domain object represents.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        enabled: Schema.Boolean.annotate({
          description:
            "Whether this payment method domain is enabled. If the domain is not enabled, payment methods that require a payment method domain will not appear in Elements.",
        }),
        google_pay: Stripepayment_method_domain_resource_payment_method_status,
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        klarna: Stripepayment_method_domain_resource_payment_method_status,
        link: Stripepayment_method_domain_resource_payment_method_status,
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("payment_method_domain").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        paypal: Stripepayment_method_domain_resource_payment_method_status,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PaymentMethodDomain",
      description:
        "A payment method domain represents a web domain that you have registered with Stripe.\nStripe Elements use registered payment method domains to control where certain payment methods are shown.\n\nRelated guide: [Payment method domains](https://docs.stripe.com/payments/payment-methods/pmd-registration).",
      identifier: "Stripepayment_method_domain",
    }),
);
export const Stripepayment_method_card_generated_card = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_card_generated_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        charge: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The charge that created this object.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        payment_method_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripecard_generated_from_payment_method_details,
            ]).annotate({
              description:
                "Transaction-specific details of the payment method used in the payment.",
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
              Stripesetup_attempt,
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
      title: "payment_method_card_generated_card",
      description: "",
      identifier: "Stripepayment_method_card_generated_card",
    }),
);
export const Stripepayment_method_card = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        brand: Schema.String.annotate({
          description:
            "Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        checks: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_method_card_checks]).annotate({
              description: "Checks on Card address and CVC if provided.",
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
        display_brand: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The brand to use when displaying the card, this accounts for customer's brand choice on dual-branded cards. Can be `american_express`, `cartes_bancaires`, `diners_club`, `discover`, `eftpos_australia`, `interac`, `jcb`, `mastercard`, `union_pay`, `visa`, or `other` and may contain more values in the future.",
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
        funding: Schema.String.annotate({
          description:
            "Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        generated_from: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_method_card_generated_card]).annotate({
              description:
                "Details of the original PaymentMethod that created this object.",
            }),
            Schema.Null,
          ]),
        ),
        last4: Schema.String.annotate({
          description: "The last four digits of the card.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        networks: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripenetworks]).annotate({
              description:
                "Contains information about card networks that can be used to process the payment.",
            }),
            Schema.Null,
          ]),
        ),
        regulated_status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["regulated", "unregulated"]).annotate({
              description: "Status of a card based on the card issuer.",
            }),
            Schema.Null,
          ]),
        ),
        three_d_secure_usage: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripethree_d_secure_usage]).annotate({
              description:
                "Contains details on how this Card may be used for 3D Secure authentication.",
            }),
            Schema.Null,
          ]),
        ),
        wallet: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayment_method_card_wallet]).annotate({
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
      title: "payment_method_card",
      description: "",
      identifier: "Stripepayment_method_card",
    }),
);
