// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripesetup_intent } from "./models/setupIntents.js";

export type GetSetupIntentsInput = {
  readonly attach_to_self?: boolean;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly payment_method?: string;
  readonly starting_after?: string;
};
export type GetSetupIntentsOutput = {
  readonly data: ReadonlyArray<Stripesetup_intent>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetSetupIntentsError = Stripeerror;
export type PostSetupIntentsInput = {
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
  >;
  readonly attach_to_self?: boolean;
  readonly automatic_payment_methods?: {
    readonly allow_redirects?: "always" | "never";
    readonly enabled: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly confirm?: boolean;
  readonly confirmation_token?: string;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly description?: string;
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
  >;
  readonly expand?: ReadonlyArray<string>;
  readonly flow_directions?: ReadonlyArray<"inbound" | "outbound">;
  readonly mandate_data?:
    | ({
        readonly customer_acceptance: {
          readonly accepted_at?: number;
          readonly offline?: { readonly [x: string]: Schema.Json };
          readonly online?: {
            readonly ip_address: string;
            readonly user_agent: string;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "offline" | "online";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly metadata?: { readonly [x: string]: string };
  readonly on_behalf_of?: string;
  readonly payment_method?: string;
  readonly payment_method_configuration?: string;
  readonly payment_method_data?: {
    readonly acss_debit?: {
      readonly account_number: string;
      readonly institution_number: string;
      readonly transit_number: string;
    } & { readonly [x: string]: Schema.Json };
    readonly affirm?: { readonly [x: string]: Schema.Json };
    readonly afterpay_clearpay?: { readonly [x: string]: Schema.Json };
    readonly alipay?: { readonly [x: string]: Schema.Json };
    readonly allow_redisplay?: "always" | "limited" | "unspecified";
    readonly alma?: { readonly [x: string]: Schema.Json };
    readonly amazon_pay?: { readonly [x: string]: Schema.Json };
    readonly au_becs_debit?: {
      readonly account_number: string;
      readonly bsb_number: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bacs_debit?: {
      readonly account_number?: string;
      readonly sort_code?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bancontact?: { readonly [x: string]: Schema.Json };
    readonly billie?: { readonly [x: string]: Schema.Json };
    readonly billing_details?: {
      readonly address?:
        | ({
            readonly city?: string;
            readonly country?: string;
            readonly line1?: string;
            readonly line2?: string;
            readonly postal_code?: string;
            readonly state?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly email?: string | "";
      readonly name?: string | "";
      readonly phone?: string | "";
      readonly tax_id?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bizum?: { readonly [x: string]: Schema.Json };
    readonly blik?: { readonly [x: string]: Schema.Json };
    readonly boleto?: { readonly tax_id: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cashapp?: { readonly [x: string]: Schema.Json };
    readonly crypto?: { readonly [x: string]: Schema.Json };
    readonly customer_balance?: { readonly [x: string]: Schema.Json };
    readonly eps?: {
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
        | "vr_bank_braunau";
    } & { readonly [x: string]: Schema.Json };
    readonly fpx?: {
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
    readonly giropay?: { readonly [x: string]: Schema.Json };
    readonly grabpay?: { readonly [x: string]: Schema.Json };
    readonly ideal?: {
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
        | "yoursafe";
    } & { readonly [x: string]: Schema.Json };
    readonly interac_present?: { readonly [x: string]: Schema.Json };
    readonly kakao_pay?: { readonly [x: string]: Schema.Json };
    readonly klarna?: {
      readonly dob?: {
        readonly day: number;
        readonly month: number;
        readonly year: number;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly konbini?: { readonly [x: string]: Schema.Json };
    readonly kr_card?: { readonly [x: string]: Schema.Json };
    readonly link?: { readonly [x: string]: Schema.Json };
    readonly mb_way?: { readonly [x: string]: Schema.Json };
    readonly metadata?: { readonly [x: string]: string };
    readonly mobilepay?: { readonly [x: string]: Schema.Json };
    readonly multibanco?: { readonly [x: string]: Schema.Json };
    readonly naver_pay?: { readonly funding?: "card" | "points" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly nz_bank_account?: {
      readonly account_holder_name?: string;
      readonly account_number: string;
      readonly bank_code: string;
      readonly branch_code: string;
      readonly reference?: string;
      readonly suffix: string;
    } & { readonly [x: string]: Schema.Json };
    readonly oxxo?: { readonly [x: string]: Schema.Json };
    readonly p24?: {
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
        | "volkswagen_bank";
    } & { readonly [x: string]: Schema.Json };
    readonly pay_by_bank?: { readonly [x: string]: Schema.Json };
    readonly payco?: { readonly [x: string]: Schema.Json };
    readonly paynow?: { readonly [x: string]: Schema.Json };
    readonly paypal?: { readonly [x: string]: Schema.Json };
    readonly paypay?: { readonly [x: string]: Schema.Json };
    readonly payto?: {
      readonly account_number?: string;
      readonly bsb_number?: string;
      readonly pay_id?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly pix?: { readonly [x: string]: Schema.Json };
    readonly promptpay?: { readonly [x: string]: Schema.Json };
    readonly radar_options?: { readonly session?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly revolut_pay?: { readonly [x: string]: Schema.Json };
    readonly samsung_pay?: { readonly [x: string]: Schema.Json };
    readonly satispay?: { readonly [x: string]: Schema.Json };
    readonly scalapay?: { readonly [x: string]: Schema.Json };
    readonly sepa_debit?: { readonly iban: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sequra?: { readonly [x: string]: Schema.Json };
    readonly sofort?: {
      readonly country: "AT" | "BE" | "DE" | "ES" | "IT" | "NL";
    } & { readonly [x: string]: Schema.Json };
    readonly sunbit?: { readonly [x: string]: Schema.Json };
    readonly swish?: { readonly [x: string]: Schema.Json };
    readonly twint?: { readonly [x: string]: Schema.Json };
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
    readonly upi?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_type?: "fixed" | "maximum";
        readonly description?: string;
        readonly end_date?: number;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly us_bank_account?: {
      readonly account_holder_type?: "company" | "individual";
      readonly account_number?: string;
      readonly account_type?: "checking" | "savings";
      readonly financial_connections_account?: string;
      readonly routing_number?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly wechat_pay?: { readonly [x: string]: Schema.Json };
    readonly zip?: { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method_options?: {
    readonly acss_debit?: {
      readonly currency?: "cad" | "usd";
      readonly mandate_options?: {
        readonly custom_mandate_url?: string | "";
        readonly default_for?: ReadonlyArray<"invoice" | "subscription">;
        readonly interval_description?: string;
        readonly payment_schedule?: "combined" | "interval" | "sporadic";
        readonly transaction_type?: "business" | "personal";
      } & { readonly [x: string]: Schema.Json };
      readonly verification_method?: "automatic" | "instant" | "microdeposits";
    } & { readonly [x: string]: Schema.Json };
    readonly amazon_pay?: { readonly [x: string]: Schema.Json };
    readonly bacs_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly bizum?: { readonly [x: string]: Schema.Json };
    readonly blik?: {
      readonly code?: string;
      readonly mandate_options?: { readonly expires_at?: number } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly card?: {
      readonly mandate_options?: {
        readonly amount: number;
        readonly amount_type: "fixed" | "maximum";
        readonly currency: string;
        readonly description?: string;
        readonly end_date?: number;
        readonly interval: "day" | "month" | "sporadic" | "week" | "year";
        readonly interval_count?: number;
        readonly reference: string;
        readonly start_date: number;
        readonly supported_types?: ReadonlyArray<"india">;
      } & { readonly [x: string]: Schema.Json };
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
        | "visa";
      readonly request_three_d_secure?: "any" | "automatic" | "challenge";
      readonly setup_credential_usage?:
        | "installment"
        | "recurring"
        | "unscheduled";
      readonly three_d_secure?: {
        readonly ares_trans_status?: "A" | "C" | "I" | "N" | "R" | "U" | "Y";
        readonly cryptogram?: string;
        readonly electronic_commerce_indicator?:
          | "01"
          | "02"
          | "05"
          | "06"
          | "07";
        readonly network_options?: {
          readonly cartes_bancaires?: {
            readonly cb_avalgo: "0" | "1" | "2" | "3" | "4" | "A";
            readonly cb_exemption?: string;
            readonly cb_score?: number;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly requestor_challenge_indicator?: string;
        readonly transaction_id?: string;
        readonly version?: "1.0.2" | "2.1.0" | "2.2.0" | "2.3.0" | "2.3.1";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly card_present?: { readonly [x: string]: Schema.Json };
    readonly klarna?: {
      readonly currency?: string;
      readonly on_demand?: {
        readonly average_amount?: number;
        readonly maximum_amount?: number;
        readonly minimum_amount?: number;
        readonly purchase_interval?: "day" | "month" | "week" | "year";
        readonly purchase_interval_count?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly preferred_locale?:
        | "cs-CZ"
        | "da-DK"
        | "de-AT"
        | "de-CH"
        | "de-DE"
        | "el-GR"
        | "en-AT"
        | "en-AU"
        | "en-BE"
        | "en-CA"
        | "en-CH"
        | "en-CZ"
        | "en-DE"
        | "en-DK"
        | "en-ES"
        | "en-FI"
        | "en-FR"
        | "en-GB"
        | "en-GR"
        | "en-IE"
        | "en-IT"
        | "en-NL"
        | "en-NO"
        | "en-NZ"
        | "en-PL"
        | "en-PT"
        | "en-RO"
        | "en-SE"
        | "en-US"
        | "es-ES"
        | "es-US"
        | "fi-FI"
        | "fr-BE"
        | "fr-CA"
        | "fr-CH"
        | "fr-FR"
        | "it-CH"
        | "it-IT"
        | "nb-NO"
        | "nl-BE"
        | "nl-NL"
        | "pl-PL"
        | "pt-PT"
        | "ro-RO"
        | "sv-FI"
        | "sv-SE";
      readonly subscriptions?:
        | ReadonlyArray<
            {
              readonly interval: "day" | "month" | "week" | "year";
              readonly interval_count?: number;
              readonly name?: string;
              readonly next_billing: {
                readonly amount: number;
                readonly date: string;
              } & { readonly [x: string]: Schema.Json };
              readonly reference: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
    } & { readonly [x: string]: Schema.Json };
    readonly link?: { readonly [x: string]: Schema.Json };
    readonly paypal?: { readonly billing_agreement_id?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly payto?: {
      readonly mandate_options?: {
        readonly amount?: number | "";
        readonly amount_type?: "" | "fixed" | "maximum";
        readonly end_date?: string | "";
        readonly payment_schedule?:
          | ""
          | "adhoc"
          | "annual"
          | "daily"
          | "fortnightly"
          | "monthly"
          | "quarterly"
          | "semi_annual"
          | "weekly";
        readonly payments_per_period?: number | "";
        readonly purpose?:
          | ""
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
          | "utility";
        readonly start_date?: string | "";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly pix?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_includes_iof?: "always" | "never";
        readonly amount_type?: "fixed" | "maximum";
        readonly currency?: string;
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
    } & { readonly [x: string]: Schema.Json };
    readonly sepa_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly upi?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_type?: "fixed" | "maximum";
        readonly description?: string;
        readonly end_date?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly setup_future_usage?: "" | "none" | "off_session" | "on_session";
    } & { readonly [x: string]: Schema.Json };
    readonly us_bank_account?: {
      readonly financial_connections?: {
        readonly filters?: {
          readonly account_subcategories?: ReadonlyArray<
            "checking" | "savings"
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly permissions?: ReadonlyArray<
          "balances" | "ownership" | "payment_method" | "transactions"
        >;
        readonly prefetch?: ReadonlyArray<
          "balances" | "ownership" | "transactions"
        >;
        readonly return_url?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly mandate_options?: {
        readonly collection_method?: "" | "paper";
      } & { readonly [x: string]: Schema.Json };
      readonly networks?: {
        readonly requested?: ReadonlyArray<"ach" | "us_domestic_wire">;
      } & { readonly [x: string]: Schema.Json };
      readonly verification_method?: "automatic" | "instant" | "microdeposits";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly return_url?: string;
  readonly single_use?: {
    readonly amount: number;
    readonly currency: string;
  } & { readonly [x: string]: Schema.Json };
  readonly usage?: "off_session" | "on_session";
  readonly use_stripe_sdk?: boolean;
};
export type PostSetupIntentsOutput = Stripesetup_intent;
export type PostSetupIntentsError = Stripeerror;
export type GetSetupIntentsIntentInput = {
  readonly client_secret?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly intent: string;
};
export type GetSetupIntentsIntentOutput = Stripesetup_intent;
export type GetSetupIntentsIntentError = Stripeerror;
export type PostSetupIntentsIntentInput = {
  readonly allowed_payment_method_types?:
    | ReadonlyArray<
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
      >
    | "";
  readonly attach_to_self?: boolean;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly description?: string;
  readonly excluded_payment_method_types?:
    | ReadonlyArray<
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
      >
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly flow_directions?: ReadonlyArray<"inbound" | "outbound">;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly payment_method?: string;
  readonly payment_method_configuration?: string;
  readonly payment_method_data?: {
    readonly acss_debit?: {
      readonly account_number: string;
      readonly institution_number: string;
      readonly transit_number: string;
    } & { readonly [x: string]: Schema.Json };
    readonly affirm?: { readonly [x: string]: Schema.Json };
    readonly afterpay_clearpay?: { readonly [x: string]: Schema.Json };
    readonly alipay?: { readonly [x: string]: Schema.Json };
    readonly allow_redisplay?: "always" | "limited" | "unspecified";
    readonly alma?: { readonly [x: string]: Schema.Json };
    readonly amazon_pay?: { readonly [x: string]: Schema.Json };
    readonly au_becs_debit?: {
      readonly account_number: string;
      readonly bsb_number: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bacs_debit?: {
      readonly account_number?: string;
      readonly sort_code?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bancontact?: { readonly [x: string]: Schema.Json };
    readonly billie?: { readonly [x: string]: Schema.Json };
    readonly billing_details?: {
      readonly address?:
        | ({
            readonly city?: string;
            readonly country?: string;
            readonly line1?: string;
            readonly line2?: string;
            readonly postal_code?: string;
            readonly state?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly email?: string | "";
      readonly name?: string | "";
      readonly phone?: string | "";
      readonly tax_id?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bizum?: { readonly [x: string]: Schema.Json };
    readonly blik?: { readonly [x: string]: Schema.Json };
    readonly boleto?: { readonly tax_id: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cashapp?: { readonly [x: string]: Schema.Json };
    readonly crypto?: { readonly [x: string]: Schema.Json };
    readonly customer_balance?: { readonly [x: string]: Schema.Json };
    readonly eps?: {
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
        | "vr_bank_braunau";
    } & { readonly [x: string]: Schema.Json };
    readonly fpx?: {
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
    readonly giropay?: { readonly [x: string]: Schema.Json };
    readonly grabpay?: { readonly [x: string]: Schema.Json };
    readonly ideal?: {
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
        | "yoursafe";
    } & { readonly [x: string]: Schema.Json };
    readonly interac_present?: { readonly [x: string]: Schema.Json };
    readonly kakao_pay?: { readonly [x: string]: Schema.Json };
    readonly klarna?: {
      readonly dob?: {
        readonly day: number;
        readonly month: number;
        readonly year: number;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly konbini?: { readonly [x: string]: Schema.Json };
    readonly kr_card?: { readonly [x: string]: Schema.Json };
    readonly link?: { readonly [x: string]: Schema.Json };
    readonly mb_way?: { readonly [x: string]: Schema.Json };
    readonly metadata?: { readonly [x: string]: string };
    readonly mobilepay?: { readonly [x: string]: Schema.Json };
    readonly multibanco?: { readonly [x: string]: Schema.Json };
    readonly naver_pay?: { readonly funding?: "card" | "points" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly nz_bank_account?: {
      readonly account_holder_name?: string;
      readonly account_number: string;
      readonly bank_code: string;
      readonly branch_code: string;
      readonly reference?: string;
      readonly suffix: string;
    } & { readonly [x: string]: Schema.Json };
    readonly oxxo?: { readonly [x: string]: Schema.Json };
    readonly p24?: {
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
        | "volkswagen_bank";
    } & { readonly [x: string]: Schema.Json };
    readonly pay_by_bank?: { readonly [x: string]: Schema.Json };
    readonly payco?: { readonly [x: string]: Schema.Json };
    readonly paynow?: { readonly [x: string]: Schema.Json };
    readonly paypal?: { readonly [x: string]: Schema.Json };
    readonly paypay?: { readonly [x: string]: Schema.Json };
    readonly payto?: {
      readonly account_number?: string;
      readonly bsb_number?: string;
      readonly pay_id?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly pix?: { readonly [x: string]: Schema.Json };
    readonly promptpay?: { readonly [x: string]: Schema.Json };
    readonly radar_options?: { readonly session?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly revolut_pay?: { readonly [x: string]: Schema.Json };
    readonly samsung_pay?: { readonly [x: string]: Schema.Json };
    readonly satispay?: { readonly [x: string]: Schema.Json };
    readonly scalapay?: { readonly [x: string]: Schema.Json };
    readonly sepa_debit?: { readonly iban: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sequra?: { readonly [x: string]: Schema.Json };
    readonly sofort?: {
      readonly country: "AT" | "BE" | "DE" | "ES" | "IT" | "NL";
    } & { readonly [x: string]: Schema.Json };
    readonly sunbit?: { readonly [x: string]: Schema.Json };
    readonly swish?: { readonly [x: string]: Schema.Json };
    readonly twint?: { readonly [x: string]: Schema.Json };
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
    readonly upi?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_type?: "fixed" | "maximum";
        readonly description?: string;
        readonly end_date?: number;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly us_bank_account?: {
      readonly account_holder_type?: "company" | "individual";
      readonly account_number?: string;
      readonly account_type?: "checking" | "savings";
      readonly financial_connections_account?: string;
      readonly routing_number?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly wechat_pay?: { readonly [x: string]: Schema.Json };
    readonly zip?: { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method_options?: {
    readonly acss_debit?: {
      readonly currency?: "cad" | "usd";
      readonly mandate_options?: {
        readonly custom_mandate_url?: string | "";
        readonly default_for?: ReadonlyArray<"invoice" | "subscription">;
        readonly interval_description?: string;
        readonly payment_schedule?: "combined" | "interval" | "sporadic";
        readonly transaction_type?: "business" | "personal";
      } & { readonly [x: string]: Schema.Json };
      readonly verification_method?: "automatic" | "instant" | "microdeposits";
    } & { readonly [x: string]: Schema.Json };
    readonly amazon_pay?: { readonly [x: string]: Schema.Json };
    readonly bacs_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly bizum?: { readonly [x: string]: Schema.Json };
    readonly blik?: {
      readonly code?: string;
      readonly mandate_options?: { readonly expires_at?: number } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly card?: {
      readonly mandate_options?: {
        readonly amount: number;
        readonly amount_type: "fixed" | "maximum";
        readonly currency: string;
        readonly description?: string;
        readonly end_date?: number;
        readonly interval: "day" | "month" | "sporadic" | "week" | "year";
        readonly interval_count?: number;
        readonly reference: string;
        readonly start_date: number;
        readonly supported_types?: ReadonlyArray<"india">;
      } & { readonly [x: string]: Schema.Json };
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
        | "visa";
      readonly request_three_d_secure?: "any" | "automatic" | "challenge";
      readonly setup_credential_usage?:
        | "installment"
        | "recurring"
        | "unscheduled";
      readonly three_d_secure?: {
        readonly ares_trans_status?: "A" | "C" | "I" | "N" | "R" | "U" | "Y";
        readonly cryptogram?: string;
        readonly electronic_commerce_indicator?:
          | "01"
          | "02"
          | "05"
          | "06"
          | "07";
        readonly network_options?: {
          readonly cartes_bancaires?: {
            readonly cb_avalgo: "0" | "1" | "2" | "3" | "4" | "A";
            readonly cb_exemption?: string;
            readonly cb_score?: number;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly requestor_challenge_indicator?: string;
        readonly transaction_id?: string;
        readonly version?: "1.0.2" | "2.1.0" | "2.2.0" | "2.3.0" | "2.3.1";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly card_present?: { readonly [x: string]: Schema.Json };
    readonly klarna?: {
      readonly currency?: string;
      readonly on_demand?: {
        readonly average_amount?: number;
        readonly maximum_amount?: number;
        readonly minimum_amount?: number;
        readonly purchase_interval?: "day" | "month" | "week" | "year";
        readonly purchase_interval_count?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly preferred_locale?:
        | "cs-CZ"
        | "da-DK"
        | "de-AT"
        | "de-CH"
        | "de-DE"
        | "el-GR"
        | "en-AT"
        | "en-AU"
        | "en-BE"
        | "en-CA"
        | "en-CH"
        | "en-CZ"
        | "en-DE"
        | "en-DK"
        | "en-ES"
        | "en-FI"
        | "en-FR"
        | "en-GB"
        | "en-GR"
        | "en-IE"
        | "en-IT"
        | "en-NL"
        | "en-NO"
        | "en-NZ"
        | "en-PL"
        | "en-PT"
        | "en-RO"
        | "en-SE"
        | "en-US"
        | "es-ES"
        | "es-US"
        | "fi-FI"
        | "fr-BE"
        | "fr-CA"
        | "fr-CH"
        | "fr-FR"
        | "it-CH"
        | "it-IT"
        | "nb-NO"
        | "nl-BE"
        | "nl-NL"
        | "pl-PL"
        | "pt-PT"
        | "ro-RO"
        | "sv-FI"
        | "sv-SE";
      readonly subscriptions?:
        | ReadonlyArray<
            {
              readonly interval: "day" | "month" | "week" | "year";
              readonly interval_count?: number;
              readonly name?: string;
              readonly next_billing: {
                readonly amount: number;
                readonly date: string;
              } & { readonly [x: string]: Schema.Json };
              readonly reference: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
    } & { readonly [x: string]: Schema.Json };
    readonly link?: { readonly [x: string]: Schema.Json };
    readonly paypal?: { readonly billing_agreement_id?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly payto?: {
      readonly mandate_options?: {
        readonly amount?: number | "";
        readonly amount_type?: "" | "fixed" | "maximum";
        readonly end_date?: string | "";
        readonly payment_schedule?:
          | ""
          | "adhoc"
          | "annual"
          | "daily"
          | "fortnightly"
          | "monthly"
          | "quarterly"
          | "semi_annual"
          | "weekly";
        readonly payments_per_period?: number | "";
        readonly purpose?:
          | ""
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
          | "utility";
        readonly start_date?: string | "";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly pix?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_includes_iof?: "always" | "never";
        readonly amount_type?: "fixed" | "maximum";
        readonly currency?: string;
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
    } & { readonly [x: string]: Schema.Json };
    readonly sepa_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly upi?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_type?: "fixed" | "maximum";
        readonly description?: string;
        readonly end_date?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly setup_future_usage?: "" | "none" | "off_session" | "on_session";
    } & { readonly [x: string]: Schema.Json };
    readonly us_bank_account?: {
      readonly financial_connections?: {
        readonly filters?: {
          readonly account_subcategories?: ReadonlyArray<
            "checking" | "savings"
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly permissions?: ReadonlyArray<
          "balances" | "ownership" | "payment_method" | "transactions"
        >;
        readonly prefetch?: ReadonlyArray<
          "balances" | "ownership" | "transactions"
        >;
        readonly return_url?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly mandate_options?: {
        readonly collection_method?: "" | "paper";
      } & { readonly [x: string]: Schema.Json };
      readonly networks?: {
        readonly requested?: ReadonlyArray<"ach" | "us_domestic_wire">;
      } & { readonly [x: string]: Schema.Json };
      readonly verification_method?: "automatic" | "instant" | "microdeposits";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly intent: string;
};
export type PostSetupIntentsIntentOutput = Stripesetup_intent;
export type PostSetupIntentsIntentError = Stripeerror;
export type PostSetupIntentsIntentCancelInput = {
  readonly cancellation_reason?:
    | "abandoned"
    | "duplicate"
    | "requested_by_customer";
  readonly expand?: ReadonlyArray<string>;
  readonly intent: string;
};
export type PostSetupIntentsIntentCancelOutput = Stripesetup_intent;
export type PostSetupIntentsIntentCancelError = Stripeerror;
export type PostSetupIntentsIntentConfirmInput = {
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
  >;
  readonly client_secret?: string;
  readonly confirmation_token?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly mandate_data?:
    | ({
        readonly customer_acceptance: {
          readonly accepted_at?: number;
          readonly offline?: { readonly [x: string]: Schema.Json };
          readonly online?: {
            readonly ip_address: string;
            readonly user_agent: string;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "offline" | "online";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json })
    | ""
    | ({
        readonly customer_acceptance: {
          readonly online: {
            readonly ip_address?: string;
            readonly user_agent?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "online";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json });
  readonly payment_method?: string;
  readonly payment_method_data?: {
    readonly acss_debit?: {
      readonly account_number: string;
      readonly institution_number: string;
      readonly transit_number: string;
    } & { readonly [x: string]: Schema.Json };
    readonly affirm?: { readonly [x: string]: Schema.Json };
    readonly afterpay_clearpay?: { readonly [x: string]: Schema.Json };
    readonly alipay?: { readonly [x: string]: Schema.Json };
    readonly allow_redisplay?: "always" | "limited" | "unspecified";
    readonly alma?: { readonly [x: string]: Schema.Json };
    readonly amazon_pay?: { readonly [x: string]: Schema.Json };
    readonly au_becs_debit?: {
      readonly account_number: string;
      readonly bsb_number: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bacs_debit?: {
      readonly account_number?: string;
      readonly sort_code?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bancontact?: { readonly [x: string]: Schema.Json };
    readonly billie?: { readonly [x: string]: Schema.Json };
    readonly billing_details?: {
      readonly address?:
        | ({
            readonly city?: string;
            readonly country?: string;
            readonly line1?: string;
            readonly line2?: string;
            readonly postal_code?: string;
            readonly state?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly email?: string | "";
      readonly name?: string | "";
      readonly phone?: string | "";
      readonly tax_id?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bizum?: { readonly [x: string]: Schema.Json };
    readonly blik?: { readonly [x: string]: Schema.Json };
    readonly boleto?: { readonly tax_id: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cashapp?: { readonly [x: string]: Schema.Json };
    readonly crypto?: { readonly [x: string]: Schema.Json };
    readonly customer_balance?: { readonly [x: string]: Schema.Json };
    readonly eps?: {
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
        | "vr_bank_braunau";
    } & { readonly [x: string]: Schema.Json };
    readonly fpx?: {
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
    readonly giropay?: { readonly [x: string]: Schema.Json };
    readonly grabpay?: { readonly [x: string]: Schema.Json };
    readonly ideal?: {
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
        | "yoursafe";
    } & { readonly [x: string]: Schema.Json };
    readonly interac_present?: { readonly [x: string]: Schema.Json };
    readonly kakao_pay?: { readonly [x: string]: Schema.Json };
    readonly klarna?: {
      readonly dob?: {
        readonly day: number;
        readonly month: number;
        readonly year: number;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly konbini?: { readonly [x: string]: Schema.Json };
    readonly kr_card?: { readonly [x: string]: Schema.Json };
    readonly link?: { readonly [x: string]: Schema.Json };
    readonly mb_way?: { readonly [x: string]: Schema.Json };
    readonly metadata?: { readonly [x: string]: string };
    readonly mobilepay?: { readonly [x: string]: Schema.Json };
    readonly multibanco?: { readonly [x: string]: Schema.Json };
    readonly naver_pay?: { readonly funding?: "card" | "points" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly nz_bank_account?: {
      readonly account_holder_name?: string;
      readonly account_number: string;
      readonly bank_code: string;
      readonly branch_code: string;
      readonly reference?: string;
      readonly suffix: string;
    } & { readonly [x: string]: Schema.Json };
    readonly oxxo?: { readonly [x: string]: Schema.Json };
    readonly p24?: {
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
        | "volkswagen_bank";
    } & { readonly [x: string]: Schema.Json };
    readonly pay_by_bank?: { readonly [x: string]: Schema.Json };
    readonly payco?: { readonly [x: string]: Schema.Json };
    readonly paynow?: { readonly [x: string]: Schema.Json };
    readonly paypal?: { readonly [x: string]: Schema.Json };
    readonly paypay?: { readonly [x: string]: Schema.Json };
    readonly payto?: {
      readonly account_number?: string;
      readonly bsb_number?: string;
      readonly pay_id?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly pix?: { readonly [x: string]: Schema.Json };
    readonly promptpay?: { readonly [x: string]: Schema.Json };
    readonly radar_options?: { readonly session?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly revolut_pay?: { readonly [x: string]: Schema.Json };
    readonly samsung_pay?: { readonly [x: string]: Schema.Json };
    readonly satispay?: { readonly [x: string]: Schema.Json };
    readonly scalapay?: { readonly [x: string]: Schema.Json };
    readonly sepa_debit?: { readonly iban: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sequra?: { readonly [x: string]: Schema.Json };
    readonly sofort?: {
      readonly country: "AT" | "BE" | "DE" | "ES" | "IT" | "NL";
    } & { readonly [x: string]: Schema.Json };
    readonly sunbit?: { readonly [x: string]: Schema.Json };
    readonly swish?: { readonly [x: string]: Schema.Json };
    readonly twint?: { readonly [x: string]: Schema.Json };
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
    readonly upi?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_type?: "fixed" | "maximum";
        readonly description?: string;
        readonly end_date?: number;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly us_bank_account?: {
      readonly account_holder_type?: "company" | "individual";
      readonly account_number?: string;
      readonly account_type?: "checking" | "savings";
      readonly financial_connections_account?: string;
      readonly routing_number?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly wechat_pay?: { readonly [x: string]: Schema.Json };
    readonly zip?: { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method_options?: {
    readonly acss_debit?: {
      readonly currency?: "cad" | "usd";
      readonly mandate_options?: {
        readonly custom_mandate_url?: string | "";
        readonly default_for?: ReadonlyArray<"invoice" | "subscription">;
        readonly interval_description?: string;
        readonly payment_schedule?: "combined" | "interval" | "sporadic";
        readonly transaction_type?: "business" | "personal";
      } & { readonly [x: string]: Schema.Json };
      readonly verification_method?: "automatic" | "instant" | "microdeposits";
    } & { readonly [x: string]: Schema.Json };
    readonly amazon_pay?: { readonly [x: string]: Schema.Json };
    readonly bacs_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly bizum?: { readonly [x: string]: Schema.Json };
    readonly blik?: {
      readonly code?: string;
      readonly mandate_options?: { readonly expires_at?: number } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly card?: {
      readonly mandate_options?: {
        readonly amount: number;
        readonly amount_type: "fixed" | "maximum";
        readonly currency: string;
        readonly description?: string;
        readonly end_date?: number;
        readonly interval: "day" | "month" | "sporadic" | "week" | "year";
        readonly interval_count?: number;
        readonly reference: string;
        readonly start_date: number;
        readonly supported_types?: ReadonlyArray<"india">;
      } & { readonly [x: string]: Schema.Json };
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
        | "visa";
      readonly request_three_d_secure?: "any" | "automatic" | "challenge";
      readonly setup_credential_usage?:
        | "installment"
        | "recurring"
        | "unscheduled";
      readonly three_d_secure?: {
        readonly ares_trans_status?: "A" | "C" | "I" | "N" | "R" | "U" | "Y";
        readonly cryptogram?: string;
        readonly electronic_commerce_indicator?:
          | "01"
          | "02"
          | "05"
          | "06"
          | "07";
        readonly network_options?: {
          readonly cartes_bancaires?: {
            readonly cb_avalgo: "0" | "1" | "2" | "3" | "4" | "A";
            readonly cb_exemption?: string;
            readonly cb_score?: number;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly requestor_challenge_indicator?: string;
        readonly transaction_id?: string;
        readonly version?: "1.0.2" | "2.1.0" | "2.2.0" | "2.3.0" | "2.3.1";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly card_present?: { readonly [x: string]: Schema.Json };
    readonly klarna?: {
      readonly currency?: string;
      readonly on_demand?: {
        readonly average_amount?: number;
        readonly maximum_amount?: number;
        readonly minimum_amount?: number;
        readonly purchase_interval?: "day" | "month" | "week" | "year";
        readonly purchase_interval_count?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly preferred_locale?:
        | "cs-CZ"
        | "da-DK"
        | "de-AT"
        | "de-CH"
        | "de-DE"
        | "el-GR"
        | "en-AT"
        | "en-AU"
        | "en-BE"
        | "en-CA"
        | "en-CH"
        | "en-CZ"
        | "en-DE"
        | "en-DK"
        | "en-ES"
        | "en-FI"
        | "en-FR"
        | "en-GB"
        | "en-GR"
        | "en-IE"
        | "en-IT"
        | "en-NL"
        | "en-NO"
        | "en-NZ"
        | "en-PL"
        | "en-PT"
        | "en-RO"
        | "en-SE"
        | "en-US"
        | "es-ES"
        | "es-US"
        | "fi-FI"
        | "fr-BE"
        | "fr-CA"
        | "fr-CH"
        | "fr-FR"
        | "it-CH"
        | "it-IT"
        | "nb-NO"
        | "nl-BE"
        | "nl-NL"
        | "pl-PL"
        | "pt-PT"
        | "ro-RO"
        | "sv-FI"
        | "sv-SE";
      readonly subscriptions?:
        | ReadonlyArray<
            {
              readonly interval: "day" | "month" | "week" | "year";
              readonly interval_count?: number;
              readonly name?: string;
              readonly next_billing: {
                readonly amount: number;
                readonly date: string;
              } & { readonly [x: string]: Schema.Json };
              readonly reference: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
    } & { readonly [x: string]: Schema.Json };
    readonly link?: { readonly [x: string]: Schema.Json };
    readonly paypal?: { readonly billing_agreement_id?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly payto?: {
      readonly mandate_options?: {
        readonly amount?: number | "";
        readonly amount_type?: "" | "fixed" | "maximum";
        readonly end_date?: string | "";
        readonly payment_schedule?:
          | ""
          | "adhoc"
          | "annual"
          | "daily"
          | "fortnightly"
          | "monthly"
          | "quarterly"
          | "semi_annual"
          | "weekly";
        readonly payments_per_period?: number | "";
        readonly purpose?:
          | ""
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
          | "utility";
        readonly start_date?: string | "";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly pix?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_includes_iof?: "always" | "never";
        readonly amount_type?: "fixed" | "maximum";
        readonly currency?: string;
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
    } & { readonly [x: string]: Schema.Json };
    readonly sepa_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly upi?: {
      readonly mandate_options?: {
        readonly amount?: number;
        readonly amount_type?: "fixed" | "maximum";
        readonly description?: string;
        readonly end_date?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly setup_future_usage?: "" | "none" | "off_session" | "on_session";
    } & { readonly [x: string]: Schema.Json };
    readonly us_bank_account?: {
      readonly financial_connections?: {
        readonly filters?: {
          readonly account_subcategories?: ReadonlyArray<
            "checking" | "savings"
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly permissions?: ReadonlyArray<
          "balances" | "ownership" | "payment_method" | "transactions"
        >;
        readonly prefetch?: ReadonlyArray<
          "balances" | "ownership" | "transactions"
        >;
        readonly return_url?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly mandate_options?: {
        readonly collection_method?: "" | "paper";
      } & { readonly [x: string]: Schema.Json };
      readonly networks?: {
        readonly requested?: ReadonlyArray<"ach" | "us_domestic_wire">;
      } & { readonly [x: string]: Schema.Json };
      readonly verification_method?: "automatic" | "instant" | "microdeposits";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly return_url?: string;
  readonly use_stripe_sdk?: boolean;
  readonly intent: string;
};
export type PostSetupIntentsIntentConfirmOutput = Stripesetup_intent;
export type PostSetupIntentsIntentConfirmError = Stripeerror;
export type PostSetupIntentsIntentVerifyMicrodepositsInput = {
  readonly amounts?: ReadonlyArray<number>;
  readonly client_secret?: string;
  readonly descriptor_code?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly intent: string;
};
export type PostSetupIntentsIntentVerifyMicrodepositsOutput =
  Stripesetup_intent;
export type PostSetupIntentsIntentVerifyMicrodepositsError = Stripeerror;

export const GetSetupIntentsInput = Schema.Struct({
  attach_to_self: Schema.optionalKey(Schema.Boolean),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          gt: Schema.optionalKey(Schema.Int),
          gte: Schema.optionalKey(Schema.Int),
          lt: Schema.optionalKey(Schema.Int),
          lte: Schema.optionalKey(Schema.Int),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "range_query_specs" }),
      Schema.Int,
    ]),
  ),
  customer: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  ending_before: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  limit: Schema.optionalKey(Schema.Int),
  payment_method: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetSetupIntentsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripesetup_intent),
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
          new globalThis.RegExp("^\\/v1\\/setup_intents", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/setup_intents",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "PaymentFlowsSetupIntentList", description: "" });
export const GetSetupIntentsError = Stripeerror;
export const PostSetupIntentsInput = Schema.Struct({
  allowed_payment_method_types: Schema.optionalKey(
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
        "The list of payment method types to allow for this SetupIntent. Stripe will only use methods in this list when determining the payment methods to offer. A list of valid payment method types can be found [here](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type).",
    }),
  ),
  attach_to_self: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If present, the SetupIntent's payment method will be attached to the in-context Stripe Account.\n\nIt can only be used for this Stripe Account’s own money movement flows like InboundTransfer and OutboundTransfers. It cannot be set to true when setting up a PaymentMethod for a Customer, and defaults to false when attaching a PaymentMethod to a Customer.",
    }),
  ),
  automatic_payment_methods: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        allow_redirects: Schema.optionalKey(
          Schema.Literals(["always", "never"]),
        ),
        enabled: Schema.Boolean,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "automatic_payment_methods_param",
      description:
        "When you enable this parameter, this SetupIntent accepts payment methods that you enable in the Dashboard and that are compatible with its other parameters.",
    }),
  ),
  confirm: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Set to `true` to attempt to confirm this SetupIntent immediately. This parameter defaults to `false`. If a card is the attached payment method, you can provide a `return_url` in case further authentication is necessary.",
    }),
  ),
  confirmation_token: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the ConfirmationToken used to confirm this SetupIntent.\n\nIf the provided ConfirmationToken contains properties that are also being provided in this request, such as `payment_method`, then the values in this request will take precedence.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the Customer this SetupIntent belongs to, if one exists.\n\nIf present, the SetupIntent's payment method will be attached to the Customer on successful setup. Payment methods attached to other Customers cannot be used with this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the Account this SetupIntent belongs to, if one exists.\n\nIf present, the SetupIntent's payment method will be attached to the Account on successful setup. Payment methods attached to other Accounts cannot be used with this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users.",
    }).check(
      Schema.isMaxCodePoints(1000).annotate({
        expected: "a string with at most 1000 code points",
      }),
    ),
  ),
  excluded_payment_method_types: Schema.optionalKey(
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
        "The list of payment method types to exclude from use with this SetupIntent.",
    }),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  flow_directions: Schema.optionalKey(
    Schema.Array(Schema.Literals(["inbound", "outbound"])).annotate({
      description:
        "Indicates the directions of money movement for which this payment method is intended to be used.\n\nInclude `inbound` if you intend to use the payment method as the origin to pull funds from. Include `outbound` if you intend to use the payment method as the destination to send funds to. You can include both if you intend to use the payment method for both purposes.",
    }),
  ),
  mandate_data: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          customer_acceptance: Schema.StructWithRest(
            Schema.Struct({
              accepted_at: Schema.optionalKey(
                Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              ),
              offline: Schema.optionalKey(
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ).annotate({ title: "offline_param" }),
              ),
              online: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    ip_address: Schema.String,
                    user_agent: Schema.String.check(
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
                ).annotate({ title: "online_param" }),
              ),
              type: Schema.Literals(["offline", "online"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "customer_acceptance_param" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "secret_key_param" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "This hash contains details about the mandate to create. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/api/setup_intents/create#create_setup_intent-confirm).",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Stripe account ID created for this SetupIntent.",
    }),
  ),
  payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of a PaymentMethod to attach to this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  payment_method_configuration: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the [payment method configuration](https://docs.stripe.com/api/payment_method_configurations) to use with this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  ),
  payment_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              institution_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              transit_number: Schema.String.check(
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
          ).annotate({ title: "payment_method_param" }),
        ),
        affirm: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        afterpay_clearpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        alipay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        allow_redisplay: Schema.optionalKey(
          Schema.Literals(["always", "limited", "unspecified"]),
        ),
        alma: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        au_becs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              bsb_number: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              sort_code: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        bancontact: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        billie: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        billing_details: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              address: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      country: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line1: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      postal_code: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      state: Schema.optionalKey(
                        Schema.String.check(
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
                  ).annotate({ title: "billing_details_address" }),
                  Schema.Literal(""),
                ]),
              ),
              email: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(800).annotate({
                      expected: "a string with at most 800 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              name: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              phone: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              tax_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "billing_details_inner_params" }),
        ),
        bizum: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        blik: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        boleto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              tax_id: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        cashapp: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        crypto: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        customer_balance: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        eps: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        fpx: Schema.optionalKey(
          Schema.StructWithRest(
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
              ]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        giropay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        grabpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        ideal: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        interac_present: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        kakao_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        klarna: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              dob: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    day: Schema.Int,
                    month: Schema.Int,
                    year: Schema.Int,
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "date_of_birth" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        konbini: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        kr_card: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        link: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        mb_way: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        mobilepay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        multibanco: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        naver_pay: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              funding: Schema.optionalKey(Schema.Literals(["card", "points"])),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        nz_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_holder_name: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              bank_code: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              branch_code: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              reference: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(128).annotate({
                    expected: "a string with at most 128 code points",
                  }),
                ),
              ),
              suffix: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        oxxo: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        p24: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        pay_by_bank: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        payco: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paynow: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paypal: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paypay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        payto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              bsb_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              pay_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        pix: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        promptpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        radar_options: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              session: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "radar_options_with_hidden_options" }),
        ),
        revolut_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        samsung_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        satispay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        scalapay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              iban: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        sequra: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        sofort: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              country: Schema.Literals(["AT", "BE", "DE", "ES", "IT", "NL"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        sunbit: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        swish: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        twint: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
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
        ]),
        upi: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(20).annotate({
                          expected: "a string with at most 20 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_options" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_holder_type: Schema.optionalKey(
                Schema.Literals(["company", "individual"]),
              ),
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              account_type: Schema.optionalKey(
                Schema.Literals(["checking", "savings"]),
              ),
              financial_connections_account: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              routing_number: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "payment_method_param" }),
        ),
        wechat_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        zip: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_data_params",
      description:
        "When included, this hash creates a PaymentMethod that is set as the [`payment_method`](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-payment_method)\nvalue in the SetupIntent.",
    }),
  ),
  payment_method_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.optionalKey(Schema.Literals(["cad", "usd"])),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    custom_mandate_url: Schema.optionalKey(
                      Schema.Union([Schema.String, Schema.Literal("")]),
                    ),
                    default_for: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals(["invoice", "subscription"]),
                      ),
                    ),
                    interval_description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(500).annotate({
                          expected: "a string with at most 500 code points",
                        }),
                      ),
                    ),
                    payment_schedule: Schema.optionalKey(
                      Schema.Literals(["combined", "interval", "sporadic"]),
                    ),
                    transaction_type: Schema.optionalKey(
                      Schema.Literals(["business", "personal"]),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
              verification_method: Schema.optionalKey(
                Schema.Literals(["automatic", "instant", "microdeposits"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    reference_prefix: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(12).annotate({
                            expected: "a string with at most 12 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        bizum: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        blik: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              code: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    expires_at: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        card: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.Int,
                    amount_type: Schema.Literals(["fixed", "maximum"]),
                    currency: Schema.String.annotate({ format: "currency" }),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(200).annotate({
                          expected: "a string with at most 200 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    interval: Schema.Literals([
                      "day",
                      "month",
                      "sporadic",
                      "week",
                      "year",
                    ]),
                    interval_count: Schema.optionalKey(Schema.Int),
                    reference: Schema.String.check(
                      Schema.isMaxCodePoints(80).annotate({
                        expected: "a string with at most 80 code points",
                      }),
                    ),
                    start_date: Schema.Number.annotate({
                      format: "unix-time",
                    }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    supported_types: Schema.optionalKey(
                      Schema.Array(Schema.Literal("india")),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "setup_intent_mandate_options_param" }),
              ),
              network: Schema.optionalKey(
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
                ]),
              ),
              request_three_d_secure: Schema.optionalKey(
                Schema.Literals(["any", "automatic", "challenge"]),
              ),
              setup_credential_usage: Schema.optionalKey(
                Schema.Literals(["installment", "recurring", "unscheduled"]),
              ),
              three_d_secure: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    ares_trans_status: Schema.optionalKey(
                      Schema.Literals(["A", "C", "I", "N", "R", "U", "Y"]),
                    ),
                    cryptogram: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    electronic_commerce_indicator: Schema.optionalKey(
                      Schema.Literals(["01", "02", "05", "06", "07"]),
                    ),
                    network_options: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          cartes_bancaires: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                cb_avalgo: Schema.Literals([
                                  "0",
                                  "1",
                                  "2",
                                  "3",
                                  "4",
                                  "A",
                                ]),
                                cb_exemption: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(4).annotate({
                                      expected:
                                        "a string with at most 4 code points",
                                    }),
                                  ),
                                ),
                                cb_score: Schema.optionalKey(Schema.Int),
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
                              title: "cartes_bancaires_network_options_param",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "network_options_param" }),
                    ),
                    requestor_challenge_indicator: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(2).annotate({
                          expected: "a string with at most 2 code points",
                        }),
                      ),
                    ),
                    transaction_id: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    version: Schema.optionalKey(
                      Schema.Literals([
                        "1.0.2",
                        "2.1.0",
                        "2.2.0",
                        "2.3.0",
                        "2.3.1",
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "setup_intent_payment_method_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_param" }),
        ),
        card_present: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        klarna: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.optionalKey(
                Schema.String.annotate({ format: "currency" }),
              ),
              on_demand: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    average_amount: Schema.optionalKey(Schema.Int),
                    maximum_amount: Schema.optionalKey(Schema.Int),
                    minimum_amount: Schema.optionalKey(Schema.Int),
                    purchase_interval: Schema.optionalKey(
                      Schema.Literals(["day", "month", "week", "year"]),
                    ),
                    purchase_interval_count: Schema.optionalKey(Schema.Int),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "on_demand_param" }),
              ),
              preferred_locale: Schema.optionalKey(
                Schema.Literals([
                  "cs-CZ",
                  "da-DK",
                  "de-AT",
                  "de-CH",
                  "de-DE",
                  "el-GR",
                  "en-AT",
                  "en-AU",
                  "en-BE",
                  "en-CA",
                  "en-CH",
                  "en-CZ",
                  "en-DE",
                  "en-DK",
                  "en-ES",
                  "en-FI",
                  "en-FR",
                  "en-GB",
                  "en-GR",
                  "en-IE",
                  "en-IT",
                  "en-NL",
                  "en-NO",
                  "en-NZ",
                  "en-PL",
                  "en-PT",
                  "en-RO",
                  "en-SE",
                  "en-US",
                  "es-ES",
                  "es-US",
                  "fi-FI",
                  "fr-BE",
                  "fr-CA",
                  "fr-CH",
                  "fr-FR",
                  "it-CH",
                  "it-IT",
                  "nb-NO",
                  "nl-BE",
                  "nl-NL",
                  "pl-PL",
                  "pt-PT",
                  "ro-RO",
                  "sv-FI",
                  "sv-SE",
                ]),
              ),
              subscriptions: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        interval: Schema.Literals([
                          "day",
                          "month",
                          "week",
                          "year",
                        ]),
                        interval_count: Schema.optionalKey(Schema.Int),
                        name: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(255).annotate({
                              expected: "a string with at most 255 code points",
                            }),
                          ),
                        ),
                        next_billing: Schema.StructWithRest(
                          Schema.Struct({
                            amount: Schema.Int,
                            date: Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
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
                          title: "subscription_next_billing_param",
                        }),
                        reference: Schema.String.check(
                          Schema.isMaxCodePoints(255).annotate({
                            expected: "a string with at most 255 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "setup_intent_subscription_param" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        link: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        paypal: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              billing_agreement_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "payment_method_options_param" }),
        ),
        payto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(
                      Schema.Union([Schema.Int, Schema.Literal("")]),
                    ),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["", "fixed", "maximum"]),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                    payment_schedule: Schema.optionalKey(
                      Schema.Literals([
                        "",
                        "adhoc",
                        "annual",
                        "daily",
                        "fortnightly",
                        "monthly",
                        "quarterly",
                        "semi_annual",
                        "weekly",
                      ]),
                    ),
                    payments_per_period: Schema.optionalKey(
                      Schema.Union([Schema.Int, Schema.Literal("")]),
                    ),
                    purpose: Schema.optionalKey(
                      Schema.Literals([
                        "",
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
                      ]),
                    ),
                    start_date: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        pix: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_includes_iof: Schema.optionalKey(
                      Schema.Literals(["always", "never"]),
                    ),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    currency: Schema.optionalKey(
                      Schema.String.annotate({ format: "currency" }),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.String.check(
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
                      ]),
                    ),
                    reference: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(35).annotate({
                          expected: "a string with at most 35 code points",
                        }),
                      ),
                    ),
                    start_date: Schema.optionalKey(
                      Schema.String.check(
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
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    reference_prefix: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(12).annotate({
                            expected: "a string with at most 12 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        upi: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(20).annotate({
                          expected: "a string with at most 20 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
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
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
              setup_future_usage: Schema.optionalKey(
                Schema.Literals(["", "none", "off_session", "on_session"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "payment_method_options_param" }),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              financial_connections: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    filters: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          account_subcategories: Schema.optionalKey(
                            Schema.Array(
                              Schema.Literals(["checking", "savings"]),
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
                        title: "linked_account_options_filters_param",
                      }),
                    ),
                    permissions: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "balances",
                          "ownership",
                          "payment_method",
                          "transactions",
                        ]),
                      ),
                    ),
                    prefetch: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "balances",
                          "ownership",
                          "transactions",
                        ]),
                      ),
                    ),
                    return_url: Schema.optionalKey(
                      Schema.String.check(
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
                ).annotate({ title: "linked_account_options_param" }),
              ),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    collection_method: Schema.optionalKey(
                      Schema.Literals(["", "paper"]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_options_param" }),
              ),
              networks: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    requested: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals(["ach", "us_domestic_wire"]),
                      ),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "networks_options_param" }),
              ),
              verification_method: Schema.optionalKey(
                Schema.Literals(["automatic", "instant", "microdeposits"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_options_param",
      description:
        "Payment method-specific configuration for this SetupIntent.",
    }),
  ),
  return_url: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site. To redirect to a mobile application, you can alternatively supply an application URI scheme. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/api/setup_intents/create#create_setup_intent-confirm).",
    }),
  ),
  single_use: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Int,
        currency: Schema.String.annotate({ format: "currency" }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "setup_intent_single_use_params",
      description:
        "If you populate this hash, this SetupIntent generates a `single_use` mandate after successful completion.\n\nSingle-use mandates are only valid for the following payment methods: `acss_debit`, `alipay`, `au_becs_debit`, `bacs_debit`, `bancontact`, `boleto`, `ideal`, `link`, `sepa_debit`, and `us_bank_account`.",
    }),
  ),
  usage: Schema.optionalKey(
    Schema.Literals(["off_session", "on_session"]).annotate({
      description:
        "Indicates how the payment method is intended to be used in the future. If not provided, this value defaults to `off_session`.",
    }),
  ),
  use_stripe_sdk: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Set to `true` when confirming server-side and using Stripe.js, iOS, or Android client-side SDKs to handle the next actions.",
    }),
  ),
});
export const PostSetupIntentsOutput = Stripesetup_intent;
export const PostSetupIntentsError = Stripeerror;
export const GetSetupIntentsIntentInput = Schema.Struct({
  client_secret: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  intent: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetSetupIntentsIntentOutput = Stripesetup_intent;
export const GetSetupIntentsIntentError = Stripeerror;
export const PostSetupIntentsIntentInput = Schema.Struct({
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
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The list of payment method types to allow for this SetupIntent. Stripe will only use methods in this list when determining the payment methods to offer. A list of valid payment method types can be found [here](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type).",
    }),
  ),
  attach_to_self: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If present, the SetupIntent's payment method will be attached to the in-context Stripe Account.\n\nIt can only be used for this Stripe Account’s own money movement flows like InboundTransfer and OutboundTransfers. It cannot be set to true when setting up a PaymentMethod for a Customer, and defaults to false when attaching a PaymentMethod to a Customer.",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the Customer this SetupIntent belongs to, if one exists.\n\nIf present, the SetupIntent's payment method will be attached to the Customer on successful setup. Payment methods attached to other Customers cannot be used with this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the Account this SetupIntent belongs to, if one exists.\n\nIf present, the SetupIntent's payment method will be attached to the Account on successful setup. Payment methods attached to other Accounts cannot be used with this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users.",
    }).check(
      Schema.isMaxCodePoints(1000).annotate({
        expected: "a string with at most 1000 code points",
      }),
    ),
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
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The list of payment method types to exclude from use with this SetupIntent.",
    }),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  flow_directions: Schema.optionalKey(
    Schema.Array(Schema.Literals(["inbound", "outbound"])).annotate({
      description:
        "Indicates the directions of money movement for which this payment method is intended to be used.\n\nInclude `inbound` if you intend to use the payment method as the origin to pull funds from. Include `outbound` if you intend to use the payment method as the destination to send funds to. You can include both if you intend to use the payment method for both purposes.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of a PaymentMethod to attach to this SetupIntent. To unset this field to null, pass in an empty string.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  payment_method_configuration: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the [payment method configuration](https://docs.stripe.com/api/payment_method_configurations) to use with this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  ),
  payment_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              institution_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              transit_number: Schema.String.check(
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
          ).annotate({ title: "payment_method_param" }),
        ),
        affirm: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        afterpay_clearpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        alipay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        allow_redisplay: Schema.optionalKey(
          Schema.Literals(["always", "limited", "unspecified"]),
        ),
        alma: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        au_becs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              bsb_number: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              sort_code: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        bancontact: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        billie: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        billing_details: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              address: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      country: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line1: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      postal_code: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      state: Schema.optionalKey(
                        Schema.String.check(
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
                  ).annotate({ title: "billing_details_address" }),
                  Schema.Literal(""),
                ]),
              ),
              email: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(800).annotate({
                      expected: "a string with at most 800 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              name: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              phone: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              tax_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "billing_details_inner_params" }),
        ),
        bizum: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        blik: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        boleto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              tax_id: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        cashapp: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        crypto: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        customer_balance: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        eps: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        fpx: Schema.optionalKey(
          Schema.StructWithRest(
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
              ]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        giropay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        grabpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        ideal: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        interac_present: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        kakao_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        klarna: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              dob: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    day: Schema.Int,
                    month: Schema.Int,
                    year: Schema.Int,
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "date_of_birth" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        konbini: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        kr_card: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        link: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        mb_way: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        mobilepay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        multibanco: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        naver_pay: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              funding: Schema.optionalKey(Schema.Literals(["card", "points"])),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        nz_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_holder_name: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              bank_code: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              branch_code: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              reference: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(128).annotate({
                    expected: "a string with at most 128 code points",
                  }),
                ),
              ),
              suffix: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        oxxo: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        p24: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        pay_by_bank: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        payco: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paynow: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paypal: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paypay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        payto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              bsb_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              pay_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        pix: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        promptpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        radar_options: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              session: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "radar_options_with_hidden_options" }),
        ),
        revolut_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        samsung_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        satispay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        scalapay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              iban: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        sequra: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        sofort: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              country: Schema.Literals(["AT", "BE", "DE", "ES", "IT", "NL"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        sunbit: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        swish: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        twint: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
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
        ]),
        upi: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(20).annotate({
                          expected: "a string with at most 20 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_options" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_holder_type: Schema.optionalKey(
                Schema.Literals(["company", "individual"]),
              ),
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              account_type: Schema.optionalKey(
                Schema.Literals(["checking", "savings"]),
              ),
              financial_connections_account: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              routing_number: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "payment_method_param" }),
        ),
        wechat_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        zip: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_data_params",
      description:
        "When included, this hash creates a PaymentMethod that is set as the [`payment_method`](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-payment_method)\nvalue in the SetupIntent.",
    }),
  ),
  payment_method_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.optionalKey(Schema.Literals(["cad", "usd"])),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    custom_mandate_url: Schema.optionalKey(
                      Schema.Union([Schema.String, Schema.Literal("")]),
                    ),
                    default_for: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals(["invoice", "subscription"]),
                      ),
                    ),
                    interval_description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(500).annotate({
                          expected: "a string with at most 500 code points",
                        }),
                      ),
                    ),
                    payment_schedule: Schema.optionalKey(
                      Schema.Literals(["combined", "interval", "sporadic"]),
                    ),
                    transaction_type: Schema.optionalKey(
                      Schema.Literals(["business", "personal"]),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
              verification_method: Schema.optionalKey(
                Schema.Literals(["automatic", "instant", "microdeposits"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    reference_prefix: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(12).annotate({
                            expected: "a string with at most 12 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        bizum: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        blik: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              code: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    expires_at: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        card: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.Int,
                    amount_type: Schema.Literals(["fixed", "maximum"]),
                    currency: Schema.String.annotate({ format: "currency" }),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(200).annotate({
                          expected: "a string with at most 200 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    interval: Schema.Literals([
                      "day",
                      "month",
                      "sporadic",
                      "week",
                      "year",
                    ]),
                    interval_count: Schema.optionalKey(Schema.Int),
                    reference: Schema.String.check(
                      Schema.isMaxCodePoints(80).annotate({
                        expected: "a string with at most 80 code points",
                      }),
                    ),
                    start_date: Schema.Number.annotate({
                      format: "unix-time",
                    }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    supported_types: Schema.optionalKey(
                      Schema.Array(Schema.Literal("india")),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "setup_intent_mandate_options_param" }),
              ),
              network: Schema.optionalKey(
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
                ]),
              ),
              request_three_d_secure: Schema.optionalKey(
                Schema.Literals(["any", "automatic", "challenge"]),
              ),
              setup_credential_usage: Schema.optionalKey(
                Schema.Literals(["installment", "recurring", "unscheduled"]),
              ),
              three_d_secure: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    ares_trans_status: Schema.optionalKey(
                      Schema.Literals(["A", "C", "I", "N", "R", "U", "Y"]),
                    ),
                    cryptogram: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    electronic_commerce_indicator: Schema.optionalKey(
                      Schema.Literals(["01", "02", "05", "06", "07"]),
                    ),
                    network_options: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          cartes_bancaires: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                cb_avalgo: Schema.Literals([
                                  "0",
                                  "1",
                                  "2",
                                  "3",
                                  "4",
                                  "A",
                                ]),
                                cb_exemption: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(4).annotate({
                                      expected:
                                        "a string with at most 4 code points",
                                    }),
                                  ),
                                ),
                                cb_score: Schema.optionalKey(Schema.Int),
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
                              title: "cartes_bancaires_network_options_param",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "network_options_param" }),
                    ),
                    requestor_challenge_indicator: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(2).annotate({
                          expected: "a string with at most 2 code points",
                        }),
                      ),
                    ),
                    transaction_id: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    version: Schema.optionalKey(
                      Schema.Literals([
                        "1.0.2",
                        "2.1.0",
                        "2.2.0",
                        "2.3.0",
                        "2.3.1",
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "setup_intent_payment_method_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_param" }),
        ),
        card_present: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        klarna: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.optionalKey(
                Schema.String.annotate({ format: "currency" }),
              ),
              on_demand: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    average_amount: Schema.optionalKey(Schema.Int),
                    maximum_amount: Schema.optionalKey(Schema.Int),
                    minimum_amount: Schema.optionalKey(Schema.Int),
                    purchase_interval: Schema.optionalKey(
                      Schema.Literals(["day", "month", "week", "year"]),
                    ),
                    purchase_interval_count: Schema.optionalKey(Schema.Int),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "on_demand_param" }),
              ),
              preferred_locale: Schema.optionalKey(
                Schema.Literals([
                  "cs-CZ",
                  "da-DK",
                  "de-AT",
                  "de-CH",
                  "de-DE",
                  "el-GR",
                  "en-AT",
                  "en-AU",
                  "en-BE",
                  "en-CA",
                  "en-CH",
                  "en-CZ",
                  "en-DE",
                  "en-DK",
                  "en-ES",
                  "en-FI",
                  "en-FR",
                  "en-GB",
                  "en-GR",
                  "en-IE",
                  "en-IT",
                  "en-NL",
                  "en-NO",
                  "en-NZ",
                  "en-PL",
                  "en-PT",
                  "en-RO",
                  "en-SE",
                  "en-US",
                  "es-ES",
                  "es-US",
                  "fi-FI",
                  "fr-BE",
                  "fr-CA",
                  "fr-CH",
                  "fr-FR",
                  "it-CH",
                  "it-IT",
                  "nb-NO",
                  "nl-BE",
                  "nl-NL",
                  "pl-PL",
                  "pt-PT",
                  "ro-RO",
                  "sv-FI",
                  "sv-SE",
                ]),
              ),
              subscriptions: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        interval: Schema.Literals([
                          "day",
                          "month",
                          "week",
                          "year",
                        ]),
                        interval_count: Schema.optionalKey(Schema.Int),
                        name: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(255).annotate({
                              expected: "a string with at most 255 code points",
                            }),
                          ),
                        ),
                        next_billing: Schema.StructWithRest(
                          Schema.Struct({
                            amount: Schema.Int,
                            date: Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
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
                          title: "subscription_next_billing_param",
                        }),
                        reference: Schema.String.check(
                          Schema.isMaxCodePoints(255).annotate({
                            expected: "a string with at most 255 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "setup_intent_subscription_param" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        link: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        paypal: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              billing_agreement_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "payment_method_options_param" }),
        ),
        payto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(
                      Schema.Union([Schema.Int, Schema.Literal("")]),
                    ),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["", "fixed", "maximum"]),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                    payment_schedule: Schema.optionalKey(
                      Schema.Literals([
                        "",
                        "adhoc",
                        "annual",
                        "daily",
                        "fortnightly",
                        "monthly",
                        "quarterly",
                        "semi_annual",
                        "weekly",
                      ]),
                    ),
                    payments_per_period: Schema.optionalKey(
                      Schema.Union([Schema.Int, Schema.Literal("")]),
                    ),
                    purpose: Schema.optionalKey(
                      Schema.Literals([
                        "",
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
                      ]),
                    ),
                    start_date: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        pix: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_includes_iof: Schema.optionalKey(
                      Schema.Literals(["always", "never"]),
                    ),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    currency: Schema.optionalKey(
                      Schema.String.annotate({ format: "currency" }),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.String.check(
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
                      ]),
                    ),
                    reference: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(35).annotate({
                          expected: "a string with at most 35 code points",
                        }),
                      ),
                    ),
                    start_date: Schema.optionalKey(
                      Schema.String.check(
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
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    reference_prefix: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(12).annotate({
                            expected: "a string with at most 12 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        upi: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(20).annotate({
                          expected: "a string with at most 20 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
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
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
              setup_future_usage: Schema.optionalKey(
                Schema.Literals(["", "none", "off_session", "on_session"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "payment_method_options_param" }),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              financial_connections: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    filters: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          account_subcategories: Schema.optionalKey(
                            Schema.Array(
                              Schema.Literals(["checking", "savings"]),
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
                        title: "linked_account_options_filters_param",
                      }),
                    ),
                    permissions: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "balances",
                          "ownership",
                          "payment_method",
                          "transactions",
                        ]),
                      ),
                    ),
                    prefetch: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "balances",
                          "ownership",
                          "transactions",
                        ]),
                      ),
                    ),
                    return_url: Schema.optionalKey(
                      Schema.String.check(
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
                ).annotate({ title: "linked_account_options_param" }),
              ),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    collection_method: Schema.optionalKey(
                      Schema.Literals(["", "paper"]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_options_param" }),
              ),
              networks: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    requested: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals(["ach", "us_domestic_wire"]),
                      ),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "networks_options_param" }),
              ),
              verification_method: Schema.optionalKey(
                Schema.Literals(["automatic", "instant", "microdeposits"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_options_param",
      description:
        "Payment method-specific configuration for this SetupIntent.",
    }),
  ),
  intent: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSetupIntentsIntentOutput = Stripesetup_intent;
export const PostSetupIntentsIntentError = Stripeerror;
export const PostSetupIntentsIntentCancelInput = Schema.Struct({
  cancellation_reason: Schema.optionalKey(
    Schema.Literals([
      "abandoned",
      "duplicate",
      "requested_by_customer",
    ]).annotate({
      description:
        "Reason for canceling this SetupIntent. Possible values are: `abandoned`, `requested_by_customer`, or `duplicate`",
    }),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  intent: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSetupIntentsIntentCancelOutput = Stripesetup_intent;
export const PostSetupIntentsIntentCancelError = Stripeerror;
export const PostSetupIntentsIntentConfirmInput = Schema.Struct({
  allowed_payment_method_types: Schema.optionalKey(
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
        "The list of payment method types to allow for this SetupIntent. Stripe will only use methods in this list when determining the payment methods to offer. A list of valid payment method types can be found [here](https://docs.stripe.com/api/payment_methods/object#payment_method_object-type).",
    }),
  ),
  client_secret: Schema.optionalKey(
    Schema.String.annotate({
      description: "The client secret of the SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  confirmation_token: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the ConfirmationToken used to confirm this SetupIntent.\n\nIf the provided ConfirmationToken contains properties that are also being provided in this request, such as `payment_method`, then the values in this request will take precedence.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  mandate_data: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          customer_acceptance: Schema.StructWithRest(
            Schema.Struct({
              accepted_at: Schema.optionalKey(
                Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              ),
              offline: Schema.optionalKey(
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ).annotate({ title: "offline_param" }),
              ),
              online: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    ip_address: Schema.String,
                    user_agent: Schema.String.check(
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
                ).annotate({ title: "online_param" }),
              ),
              type: Schema.Literals(["offline", "online"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "customer_acceptance_param" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "secret_key_param" }),
      Schema.Literal(""),
      Schema.StructWithRest(
        Schema.Struct({
          customer_acceptance: Schema.StructWithRest(
            Schema.Struct({
              online: Schema.StructWithRest(
                Schema.Struct({
                  ip_address: Schema.optionalKey(Schema.String),
                  user_agent: Schema.optionalKey(
                    Schema.String.check(
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
              ).annotate({ title: "online_param" }),
              type: Schema.Literal("online"),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "customer_acceptance_param" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "client_key_param",
        description: "This hash contains details about the Mandate to create",
      }),
    ]),
  ),
  payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of a PaymentMethod to attach to this SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  payment_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              institution_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              transit_number: Schema.String.check(
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
          ).annotate({ title: "payment_method_param" }),
        ),
        affirm: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        afterpay_clearpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        alipay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        allow_redisplay: Schema.optionalKey(
          Schema.Literals(["always", "limited", "unspecified"]),
        ),
        alma: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        au_becs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              bsb_number: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              sort_code: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        bancontact: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        billie: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        billing_details: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              address: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      country: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line1: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      postal_code: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      state: Schema.optionalKey(
                        Schema.String.check(
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
                  ).annotate({ title: "billing_details_address" }),
                  Schema.Literal(""),
                ]),
              ),
              email: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(800).annotate({
                      expected: "a string with at most 800 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              name: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              phone: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              tax_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "billing_details_inner_params" }),
        ),
        bizum: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        blik: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        boleto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              tax_id: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        cashapp: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        crypto: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        customer_balance: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        eps: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        fpx: Schema.optionalKey(
          Schema.StructWithRest(
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
              ]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        giropay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        grabpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        ideal: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        interac_present: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        kakao_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        klarna: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              dob: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    day: Schema.Int,
                    month: Schema.Int,
                    year: Schema.Int,
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "date_of_birth" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        konbini: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        kr_card: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        link: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        mb_way: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        mobilepay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        multibanco: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        naver_pay: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              funding: Schema.optionalKey(Schema.Literals(["card", "points"])),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        nz_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_holder_name: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              account_number: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              bank_code: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              branch_code: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              reference: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(128).annotate({
                    expected: "a string with at most 128 code points",
                  }),
                ),
              ),
              suffix: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        oxxo: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        p24: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank: Schema.optionalKey(
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
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        pay_by_bank: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        payco: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paynow: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paypal: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        paypay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        payto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              bsb_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              pay_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        pix: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        promptpay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        radar_options: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              session: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "radar_options_with_hidden_options" }),
        ),
        revolut_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        samsung_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        satispay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        scalapay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              iban: Schema.String.check(
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
          ).annotate({ title: "param" }),
        ),
        sequra: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        sofort: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              country: Schema.Literals(["AT", "BE", "DE", "ES", "IT", "NL"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        sunbit: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        swish: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        twint: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
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
        ]),
        upi: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(20).annotate({
                          expected: "a string with at most 20 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_options" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "param" }),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_holder_type: Schema.optionalKey(
                Schema.Literals(["company", "individual"]),
              ),
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              account_type: Schema.optionalKey(
                Schema.Literals(["checking", "savings"]),
              ),
              financial_connections_account: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              routing_number: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "payment_method_param" }),
        ),
        wechat_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
        zip: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_data_params",
      description:
        "When included, this hash creates a PaymentMethod that is set as the [`payment_method`](https://docs.stripe.com/api/setup_intents/object#setup_intent_object-payment_method)\nvalue in the SetupIntent.",
    }),
  ),
  payment_method_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.optionalKey(Schema.Literals(["cad", "usd"])),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    custom_mandate_url: Schema.optionalKey(
                      Schema.Union([Schema.String, Schema.Literal("")]),
                    ),
                    default_for: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals(["invoice", "subscription"]),
                      ),
                    ),
                    interval_description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(500).annotate({
                          expected: "a string with at most 500 code points",
                        }),
                      ),
                    ),
                    payment_schedule: Schema.optionalKey(
                      Schema.Literals(["combined", "interval", "sporadic"]),
                    ),
                    transaction_type: Schema.optionalKey(
                      Schema.Literals(["business", "personal"]),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
              verification_method: Schema.optionalKey(
                Schema.Literals(["automatic", "instant", "microdeposits"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        amazon_pay: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        bacs_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    reference_prefix: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(12).annotate({
                            expected: "a string with at most 12 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        bizum: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        blik: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              code: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    expires_at: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        card: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.Int,
                    amount_type: Schema.Literals(["fixed", "maximum"]),
                    currency: Schema.String.annotate({ format: "currency" }),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(200).annotate({
                          expected: "a string with at most 200 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    interval: Schema.Literals([
                      "day",
                      "month",
                      "sporadic",
                      "week",
                      "year",
                    ]),
                    interval_count: Schema.optionalKey(Schema.Int),
                    reference: Schema.String.check(
                      Schema.isMaxCodePoints(80).annotate({
                        expected: "a string with at most 80 code points",
                      }),
                    ),
                    start_date: Schema.Number.annotate({
                      format: "unix-time",
                    }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    supported_types: Schema.optionalKey(
                      Schema.Array(Schema.Literal("india")),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "setup_intent_mandate_options_param" }),
              ),
              network: Schema.optionalKey(
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
                ]),
              ),
              request_three_d_secure: Schema.optionalKey(
                Schema.Literals(["any", "automatic", "challenge"]),
              ),
              setup_credential_usage: Schema.optionalKey(
                Schema.Literals(["installment", "recurring", "unscheduled"]),
              ),
              three_d_secure: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    ares_trans_status: Schema.optionalKey(
                      Schema.Literals(["A", "C", "I", "N", "R", "U", "Y"]),
                    ),
                    cryptogram: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    electronic_commerce_indicator: Schema.optionalKey(
                      Schema.Literals(["01", "02", "05", "06", "07"]),
                    ),
                    network_options: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          cartes_bancaires: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                cb_avalgo: Schema.Literals([
                                  "0",
                                  "1",
                                  "2",
                                  "3",
                                  "4",
                                  "A",
                                ]),
                                cb_exemption: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(4).annotate({
                                      expected:
                                        "a string with at most 4 code points",
                                    }),
                                  ),
                                ),
                                cb_score: Schema.optionalKey(Schema.Int),
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
                              title: "cartes_bancaires_network_options_param",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "network_options_param" }),
                    ),
                    requestor_challenge_indicator: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(2).annotate({
                          expected: "a string with at most 2 code points",
                        }),
                      ),
                    ),
                    transaction_id: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    version: Schema.optionalKey(
                      Schema.Literals([
                        "1.0.2",
                        "2.1.0",
                        "2.2.0",
                        "2.3.0",
                        "2.3.1",
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "setup_intent_payment_method_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_param" }),
        ),
        card_present: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        klarna: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.optionalKey(
                Schema.String.annotate({ format: "currency" }),
              ),
              on_demand: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    average_amount: Schema.optionalKey(Schema.Int),
                    maximum_amount: Schema.optionalKey(Schema.Int),
                    minimum_amount: Schema.optionalKey(Schema.Int),
                    purchase_interval: Schema.optionalKey(
                      Schema.Literals(["day", "month", "week", "year"]),
                    ),
                    purchase_interval_count: Schema.optionalKey(Schema.Int),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "on_demand_param" }),
              ),
              preferred_locale: Schema.optionalKey(
                Schema.Literals([
                  "cs-CZ",
                  "da-DK",
                  "de-AT",
                  "de-CH",
                  "de-DE",
                  "el-GR",
                  "en-AT",
                  "en-AU",
                  "en-BE",
                  "en-CA",
                  "en-CH",
                  "en-CZ",
                  "en-DE",
                  "en-DK",
                  "en-ES",
                  "en-FI",
                  "en-FR",
                  "en-GB",
                  "en-GR",
                  "en-IE",
                  "en-IT",
                  "en-NL",
                  "en-NO",
                  "en-NZ",
                  "en-PL",
                  "en-PT",
                  "en-RO",
                  "en-SE",
                  "en-US",
                  "es-ES",
                  "es-US",
                  "fi-FI",
                  "fr-BE",
                  "fr-CA",
                  "fr-CH",
                  "fr-FR",
                  "it-CH",
                  "it-IT",
                  "nb-NO",
                  "nl-BE",
                  "nl-NL",
                  "pl-PL",
                  "pt-PT",
                  "ro-RO",
                  "sv-FI",
                  "sv-SE",
                ]),
              ),
              subscriptions: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        interval: Schema.Literals([
                          "day",
                          "month",
                          "week",
                          "year",
                        ]),
                        interval_count: Schema.optionalKey(Schema.Int),
                        name: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(255).annotate({
                              expected: "a string with at most 255 code points",
                            }),
                          ),
                        ),
                        next_billing: Schema.StructWithRest(
                          Schema.Struct({
                            amount: Schema.Int,
                            date: Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
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
                          title: "subscription_next_billing_param",
                        }),
                        reference: Schema.String.check(
                          Schema.isMaxCodePoints(255).annotate({
                            expected: "a string with at most 255 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "setup_intent_subscription_param" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        link: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        paypal: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              billing_agreement_id: Schema.optionalKey(
                Schema.String.check(
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
          ).annotate({ title: "payment_method_options_param" }),
        ),
        payto: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(
                      Schema.Union([Schema.Int, Schema.Literal("")]),
                    ),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["", "fixed", "maximum"]),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                    payment_schedule: Schema.optionalKey(
                      Schema.Literals([
                        "",
                        "adhoc",
                        "annual",
                        "daily",
                        "fortnightly",
                        "monthly",
                        "quarterly",
                        "semi_annual",
                        "weekly",
                      ]),
                    ),
                    payments_per_period: Schema.optionalKey(
                      Schema.Union([Schema.Int, Schema.Literal("")]),
                    ),
                    purpose: Schema.optionalKey(
                      Schema.Literals([
                        "",
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
                      ]),
                    ),
                    start_date: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
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
                    "setup_intent_payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        pix: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_includes_iof: Schema.optionalKey(
                      Schema.Literals(["always", "never"]),
                    ),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    currency: Schema.optionalKey(
                      Schema.String.annotate({ format: "currency" }),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.String.check(
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
                      ]),
                    ),
                    reference: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(35).annotate({
                          expected: "a string with at most 35 code points",
                        }),
                      ),
                    ),
                    start_date: Schema.optionalKey(
                      Schema.String.check(
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
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    reference_prefix: Schema.optionalKey(
                      Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(12).annotate({
                            expected: "a string with at most 12 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
        upi: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    amount: Schema.optionalKey(Schema.Int),
                    amount_type: Schema.optionalKey(
                      Schema.Literals(["fixed", "maximum"]),
                    ),
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(20).annotate({
                          expected: "a string with at most 20 code points",
                        }),
                      ),
                    ),
                    end_date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
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
                  title: "payment_method_options_mandate_options_param",
                }),
              ),
              setup_future_usage: Schema.optionalKey(
                Schema.Literals(["", "none", "off_session", "on_session"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "payment_method_options_param" }),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              financial_connections: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    filters: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          account_subcategories: Schema.optionalKey(
                            Schema.Array(
                              Schema.Literals(["checking", "savings"]),
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
                        title: "linked_account_options_filters_param",
                      }),
                    ),
                    permissions: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "balances",
                          "ownership",
                          "payment_method",
                          "transactions",
                        ]),
                      ),
                    ),
                    prefetch: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals([
                          "balances",
                          "ownership",
                          "transactions",
                        ]),
                      ),
                    ),
                    return_url: Schema.optionalKey(
                      Schema.String.check(
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
                ).annotate({ title: "linked_account_options_param" }),
              ),
              mandate_options: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    collection_method: Schema.optionalKey(
                      Schema.Literals(["", "paper"]),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_options_param" }),
              ),
              networks: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    requested: Schema.optionalKey(
                      Schema.Array(
                        Schema.Literals(["ach", "us_domestic_wire"]),
                      ),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "networks_options_param" }),
              ),
              verification_method: Schema.optionalKey(
                Schema.Literals(["automatic", "instant", "microdeposits"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "setup_intent_payment_method_options_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_options_param",
      description:
        "Payment method-specific configuration for this SetupIntent.",
    }),
  ),
  return_url: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The URL to redirect your customer back to after they authenticate on the payment method's app or site.\nIf you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme.\nThis parameter is only used for cards and other redirect-based payment methods.",
    }),
  ),
  use_stripe_sdk: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Set to `true` when confirming server-side and using Stripe.js, iOS, or Android client-side SDKs to handle the next actions.",
    }),
  ),
  intent: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSetupIntentsIntentConfirmOutput = Stripesetup_intent;
export const PostSetupIntentsIntentConfirmError = Stripeerror;
export const PostSetupIntentsIntentVerifyMicrodepositsInput = Schema.Struct({
  amounts: Schema.optionalKey(
    Schema.Array(Schema.Int).annotate({
      description:
        "Two positive integers, in *cents*, equal to the values of the microdeposits sent to the bank account.",
    }),
  ),
  client_secret: Schema.optionalKey(
    Schema.String.annotate({
      description: "The client secret of the SetupIntent.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  descriptor_code: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A six-character code starting with SM present in the microdeposit sent to the bank account.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  intent: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSetupIntentsIntentVerifyMicrodepositsOutput =
  Stripesetup_intent;
export const PostSetupIntentsIntentVerifyMicrodepositsError = Stripeerror;
/**
 * The GetSetupIntentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSetupIntentsOperation: StripeOperation & {
  readonly input: typeof GetSetupIntentsInput;
  readonly output: typeof GetSetupIntentsOutput;
  readonly error: typeof GetSetupIntentsError;
} = {
  name: "GetSetupIntents",
  method: "GET",
  path: "/v1/setup_intents",
  pathParameters: [],
  queryParameters: [
    "attach_to_self",
    "created",
    "customer",
    "customer_account",
    "ending_before",
    "expand",
    "limit",
    "payment_method",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSetupIntentsInput,
  output: GetSetupIntentsOutput,
  error: GetSetupIntentsError,
};
/**
 * The PostSetupIntentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSetupIntentsOperation: StripeOperation & {
  readonly input: typeof PostSetupIntentsInput;
  readonly output: typeof PostSetupIntentsOutput;
  readonly error: typeof PostSetupIntentsError;
} = {
  name: "PostSetupIntents",
  method: "POST",
  path: "/v1/setup_intents",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSetupIntentsInput,
  output: PostSetupIntentsOutput,
  error: PostSetupIntentsError,
};
/**
 * The GetSetupIntentsIntentOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSetupIntentsIntentOperation: StripeOperation & {
  readonly input: typeof GetSetupIntentsIntentInput;
  readonly output: typeof GetSetupIntentsIntentOutput;
  readonly error: typeof GetSetupIntentsIntentError;
} = {
  name: "GetSetupIntentsIntent",
  method: "GET",
  path: "/v1/setup_intents/{intent}",
  pathParameters: ["intent"],
  queryParameters: ["client_secret", "expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSetupIntentsIntentInput,
  output: GetSetupIntentsIntentOutput,
  error: GetSetupIntentsIntentError,
};
/**
 * The PostSetupIntentsIntentOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSetupIntentsIntentOperation: StripeOperation & {
  readonly input: typeof PostSetupIntentsIntentInput;
  readonly output: typeof PostSetupIntentsIntentOutput;
  readonly error: typeof PostSetupIntentsIntentError;
} = {
  name: "PostSetupIntentsIntent",
  method: "POST",
  path: "/v1/setup_intents/{intent}",
  pathParameters: ["intent"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSetupIntentsIntentInput,
  output: PostSetupIntentsIntentOutput,
  error: PostSetupIntentsIntentError,
};
/**
 * The PostSetupIntentsIntentCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSetupIntentsIntentCancelOperation: StripeOperation & {
  readonly input: typeof PostSetupIntentsIntentCancelInput;
  readonly output: typeof PostSetupIntentsIntentCancelOutput;
  readonly error: typeof PostSetupIntentsIntentCancelError;
} = {
  name: "PostSetupIntentsIntentCancel",
  method: "POST",
  path: "/v1/setup_intents/{intent}/cancel",
  pathParameters: ["intent"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSetupIntentsIntentCancelInput,
  output: PostSetupIntentsIntentCancelOutput,
  error: PostSetupIntentsIntentCancelError,
};
/**
 * The PostSetupIntentsIntentConfirmOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSetupIntentsIntentConfirmOperation: StripeOperation & {
  readonly input: typeof PostSetupIntentsIntentConfirmInput;
  readonly output: typeof PostSetupIntentsIntentConfirmOutput;
  readonly error: typeof PostSetupIntentsIntentConfirmError;
} = {
  name: "PostSetupIntentsIntentConfirm",
  method: "POST",
  path: "/v1/setup_intents/{intent}/confirm",
  pathParameters: ["intent"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSetupIntentsIntentConfirmInput,
  output: PostSetupIntentsIntentConfirmOutput,
  error: PostSetupIntentsIntentConfirmError,
};
/**
 * The PostSetupIntentsIntentVerifyMicrodepositsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSetupIntentsIntentVerifyMicrodepositsOperation: StripeOperation & {
  readonly input: typeof PostSetupIntentsIntentVerifyMicrodepositsInput;
  readonly output: typeof PostSetupIntentsIntentVerifyMicrodepositsOutput;
  readonly error: typeof PostSetupIntentsIntentVerifyMicrodepositsError;
} = {
  name: "PostSetupIntentsIntentVerifyMicrodeposits",
  method: "POST",
  path: "/v1/setup_intents/{intent}/verify_microdeposits",
  pathParameters: ["intent"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSetupIntentsIntentVerifyMicrodepositsInput,
  output: PostSetupIntentsIntentVerifyMicrodepositsOutput,
  error: PostSetupIntentsIntentVerifyMicrodepositsError,
};
/**
 * The makeSetupIntentsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeSetupIntentsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetSetupIntents function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSetupIntents = Effect.fn("setupIntents.GetSetupIntents")(function* (
    input: GetSetupIntentsInput,
  ) {
    const response: GetSetupIntentsOutput = yield* client.invoke(
      GetSetupIntentsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSetupIntents function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSetupIntents = Effect.fn("setupIntents.PostSetupIntents")(
    function* (input: PostSetupIntentsInput) {
      const response: PostSetupIntentsOutput = yield* client.invoke(
        PostSetupIntentsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetSetupIntentsIntent function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSetupIntentsIntent = Effect.fn("setupIntents.GetSetupIntentsIntent")(
    function* (input: GetSetupIntentsIntentInput) {
      const response: GetSetupIntentsIntentOutput = yield* client.invoke(
        GetSetupIntentsIntentOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostSetupIntentsIntent function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSetupIntentsIntent = Effect.fn(
    "setupIntents.PostSetupIntentsIntent",
  )(function* (input: PostSetupIntentsIntentInput) {
    const response: PostSetupIntentsIntentOutput = yield* client.invoke(
      PostSetupIntentsIntentOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSetupIntentsIntentCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSetupIntentsIntentCancel = Effect.fn(
    "setupIntents.PostSetupIntentsIntentCancel",
  )(function* (input: PostSetupIntentsIntentCancelInput) {
    const response: PostSetupIntentsIntentCancelOutput = yield* client.invoke(
      PostSetupIntentsIntentCancelOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSetupIntentsIntentConfirm function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSetupIntentsIntentConfirm = Effect.fn(
    "setupIntents.PostSetupIntentsIntentConfirm",
  )(function* (input: PostSetupIntentsIntentConfirmInput) {
    const response: PostSetupIntentsIntentConfirmOutput = yield* client.invoke(
      PostSetupIntentsIntentConfirmOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSetupIntentsIntentVerifyMicrodeposits function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSetupIntentsIntentVerifyMicrodeposits = Effect.fn(
    "setupIntents.PostSetupIntentsIntentVerifyMicrodeposits",
  )(function* (input: PostSetupIntentsIntentVerifyMicrodepositsInput) {
    const response: PostSetupIntentsIntentVerifyMicrodepositsOutput =
      yield* client.invoke(
        PostSetupIntentsIntentVerifyMicrodepositsOperation,
        input,
      );
    return response;
  });
  return {
    GetSetupIntents,
    PostSetupIntents,
    GetSetupIntentsIntent,
    PostSetupIntentsIntent,
    PostSetupIntentsIntentCancel,
    PostSetupIntentsIntentConfirm,
    PostSetupIntentsIntentVerifyMicrodeposits,
  };
});
