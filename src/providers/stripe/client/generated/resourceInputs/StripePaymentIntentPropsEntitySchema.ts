// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  type ResourceInputJson,
  ResourceInputJsonSchema,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripePaymentIntentResourceSchema } from "./StripePaymentIntentPropsSchema.js";
import { StripeResourceEntityInputAlternatives_60 } from "./StripeResourceEntityInputAlternatives_60.js";

export type StripePaymentIntentPropsEntity = {
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
  readonly amount: number;
  readonly amount_details?: {
    readonly discount_amount?: number | "";
    readonly enforce_arithmetic_validation?: boolean;
    readonly line_items?:
      | ReadonlyArray<
          {
            readonly discount_amount?: number;
            readonly payment_method_options?: {
              readonly card?: { readonly commodity_code?: string } & {
                readonly [x: string]: Schema.Json;
              };
              readonly card_present?: { readonly commodity_code?: string } & {
                readonly [x: string]: Schema.Json;
              };
              readonly klarna?: {
                readonly image_url?: string;
                readonly product_url?: string;
                readonly reference?: string;
                readonly subscription_reference?: string;
              } & { readonly [x: string]: Schema.Json };
              readonly paypal?: {
                readonly category?:
                  | "digital_goods"
                  | "donation"
                  | "physical_goods";
                readonly description?: string;
                readonly sold_by?: string;
              } & { readonly [x: string]: Schema.Json };
            } & { readonly [x: string]: Schema.Json };
            readonly product_code?: string;
            readonly product_name: string;
            readonly quantity: number;
            readonly tax?: { readonly total_tax_amount: number } & {
              readonly [x: string]: Schema.Json;
            };
            readonly unit_cost: number;
            readonly unit_of_measure?: string;
          } & { readonly [x: string]: Schema.Json }
        >
      | "";
    readonly shipping?:
      | ({
          readonly amount?: number | "";
          readonly from_postal_code?: string | "";
          readonly to_postal_code?: string | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly tax?:
      | ({ readonly total_tax_amount: number } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly application_fee_amount?: number;
  readonly automatic_payment_methods?: {
    readonly allow_redirects?: "always" | "never";
    readonly enabled: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly capture_method?: "automatic" | "automatic_async" | "manual";
  readonly confirm?: boolean;
  readonly confirmation_method?: "automatic" | "manual";
  readonly confirmation_token?: string;
  readonly currency: string;
  readonly customer?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "customer";
  }>;
  readonly customer_account?: string;
  readonly description?: string;
  readonly error_on_requires_action?: boolean;
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
  readonly hooks?: {
    readonly inputs?: {
      readonly tax?: { readonly calculation: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly mandate?: string;
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
  readonly off_session?: boolean | "one_off" | "recurring";
  readonly on_behalf_of?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "v1-account";
  }>;
  readonly payment_details?: {
    readonly customer_reference?: string | "";
    readonly order_reference?: string | "";
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "payment-method";
  }>;
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
    readonly acss_debit?:
      | ({
          readonly mandate_options?: {
            readonly custom_mandate_url?: string | "";
            readonly interval_description?: string;
            readonly payment_schedule?: "combined" | "interval" | "sporadic";
            readonly transaction_type?: "business" | "personal";
          } & { readonly [x: string]: Schema.Json };
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
          readonly target_date?: string;
          readonly verification_method?:
            | "automatic"
            | "instant"
            | "microdeposits";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly affirm?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly preferred_locale?: string;
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly afterpay_clearpay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly reference?: string;
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly alipay?:
      | ({ readonly setup_future_usage?: "" | "none" | "off_session" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly alma?:
      | ({ readonly capture_method?: "" | "manual" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly amazon_pay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly au_becs_debit?:
      | ({
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
          readonly target_date?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly bacs_debit?:
      | ({
          readonly mandate_options?: {
            readonly reference_prefix?: string | "";
          } & { readonly [x: string]: Schema.Json };
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
          readonly target_date?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly bancontact?:
      | ({
          readonly preferred_language?: "de" | "en" | "fr" | "nl";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly billie?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly company_details?:
            | ({
                readonly registered_address?:
                  | ({
                      readonly city?: string;
                      readonly country?: string;
                      readonly line1?: string;
                      readonly line2?: string;
                      readonly postal_code?: string;
                      readonly state?: string;
                    } & { readonly [x: string]: Schema.Json })
                  | "";
                readonly registered_name?: string;
                readonly registration_number?: string;
                readonly registration_type?:
                  | ""
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
                readonly vat?: string;
              } & { readonly [x: string]: Schema.Json })
            | "";
          readonly reference?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly bizum?: { readonly [x: string]: Schema.Json } | "";
    readonly blik?:
      | ({
          readonly code?: string;
          readonly mandate_options?: { readonly expires_at?: number } & {
            readonly [x: string]: Schema.Json;
          };
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly boleto?:
      | ({
          readonly expires_after_days?: number;
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly card?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly cvc_token?: string;
          readonly installments?: {
            readonly enabled?: boolean;
            readonly plan?:
              | ({
                  readonly count?: number;
                  readonly interval?: "month";
                  readonly type: "bonus" | "fixed_count" | "revolving";
                } & { readonly [x: string]: Schema.Json })
              | "";
          } & { readonly [x: string]: Schema.Json };
          readonly mandate_options?: {
            readonly amount: number;
            readonly amount_type: "fixed" | "maximum";
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
          readonly request_extended_authorization?: "if_available" | "never";
          readonly request_incremental_authorization?: "if_available" | "never";
          readonly request_multicapture?: "if_available" | "never";
          readonly request_overcapture?: "if_available" | "never";
          readonly request_three_d_secure?: "any" | "automatic" | "challenge";
          readonly require_cvc_recollection?: boolean;
          readonly setup_credential_usage?:
            | "installment"
            | "recurring"
            | "unscheduled";
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
          readonly statement_descriptor_suffix_kana?: string | "";
          readonly statement_descriptor_suffix_kanji?: string | "";
          readonly stored_credential_usage?:
            | "installment"
            | "recurring"
            | "unscheduled";
          readonly three_d_secure?: {
            readonly ares_trans_status?:
              | "A"
              | "C"
              | "I"
              | "N"
              | "R"
              | "U"
              | "Y";
            readonly cryptogram: string;
            readonly electronic_commerce_indicator?:
              | "01"
              | "02"
              | "05"
              | "06"
              | "07";
            readonly exemption_indicator?: "low_risk" | "none";
            readonly network_options?: {
              readonly cartes_bancaires?: {
                readonly cb_avalgo: "0" | "1" | "2" | "3" | "4" | "A";
                readonly cb_exemption?: string;
                readonly cb_score?: number;
              } & { readonly [x: string]: Schema.Json };
            } & { readonly [x: string]: Schema.Json };
            readonly requestor_challenge_indicator?: string;
            readonly transaction_id: string;
            readonly version: "1.0.2" | "2.1.0" | "2.2.0" | "2.3.0" | "2.3.1";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly card_present?:
      | ({
          readonly capture_method?: "manual" | "manual_preferred";
          readonly request_extended_authorization?: boolean;
          readonly request_incremental_authorization_support?: boolean;
          readonly routing?: {
            readonly requested_priority?: "domestic" | "international";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly cashapp?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly crypto?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly customer_balance?:
      | ({
          readonly bank_transfer?: {
            readonly eu_bank_transfer?: { readonly country: string } & {
              readonly [x: string]: Schema.Json;
            };
            readonly requested_address_types?: ReadonlyArray<
              | "aba"
              | "iban"
              | "sepa"
              | "sort_code"
              | "spei"
              | "swift"
              | "zengin"
            >;
            readonly type:
              | "eu_bank_transfer"
              | "gb_bank_transfer"
              | "jp_bank_transfer"
              | "mx_bank_transfer"
              | "us_bank_transfer";
          } & { readonly [x: string]: Schema.Json };
          readonly funding_type?: "bank_transfer";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly eps?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly fpx?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly giropay?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly grabpay?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly ideal?:
      | ({ readonly setup_future_usage?: "" | "none" | "off_session" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly interac_present?: { readonly [x: string]: Schema.Json } | "";
    readonly kakao_pay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly klarna?:
      | ({
          readonly capture_method?: "" | "manual";
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
          readonly setup_future_usage?: "none" | "off_session" | "on_session";
          readonly subscriptions?:
            | ReadonlyArray<
                {
                  readonly interval: "day" | "month" | "week" | "year";
                  readonly interval_count?: number;
                  readonly name?: string;
                  readonly next_billing?: {
                    readonly amount: number;
                    readonly date: string;
                  } & { readonly [x: string]: Schema.Json };
                  readonly reference: string;
                } & { readonly [x: string]: Schema.Json }
              >
            | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly konbini?:
      | ({
          readonly confirmation_number?: string | "";
          readonly expires_after_days?: number | "";
          readonly expires_at?: number | "";
          readonly product_description?: string | "";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly kr_card?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly link?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly mb_way?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly mobilepay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly multibanco?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly naver_pay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly nz_bank_account?:
      | ({
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
          readonly target_date?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly oxxo?:
      | ({
          readonly expires_after_days?: number;
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly p24?:
      | ({
          readonly setup_future_usage?: "none";
          readonly tos_shown_and_accepted?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly pay_by_bank?: { readonly [x: string]: Schema.Json } | "";
    readonly payco?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly paynow?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly paypal?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly preferred_locale?:
            | "cs-CZ"
            | "da-DK"
            | "de-AT"
            | "de-DE"
            | "de-LU"
            | "el-GR"
            | "en-GB"
            | "en-US"
            | "es-ES"
            | "fi-FI"
            | "fr-BE"
            | "fr-FR"
            | "fr-LU"
            | "hu-HU"
            | "it-IT"
            | "nl-BE"
            | "nl-NL"
            | "pl-PL"
            | "pt-PT"
            | "sk-SK"
            | "sv-SE";
          readonly reference?: string;
          readonly risk_correlation_id?: string;
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly paypay?: { readonly [x: string]: Schema.Json } | "";
    readonly payto?:
      | ({
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
          } & { readonly [x: string]: Schema.Json };
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly pix?:
      | ({
          readonly amount_includes_iof?: "always" | "never";
          readonly expires_after_seconds?: number;
          readonly expires_at?: number;
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
          readonly setup_future_usage?: "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly promptpay?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly revolut_pay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly samsung_pay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly satispay?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly scalapay?:
      | ({ readonly capture_method?: "" | "manual" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly sepa_debit?:
      | ({
          readonly mandate_options?: {
            readonly reference_prefix?: string | "";
          } & { readonly [x: string]: Schema.Json };
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
          readonly target_date?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly sequra?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly sofort?:
      | ({
          readonly preferred_language?:
            | ""
            | "de"
            | "en"
            | "es"
            | "fr"
            | "it"
            | "nl"
            | "pl";
          readonly setup_future_usage?: "" | "none" | "off_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly sunbit?:
      | ({
          readonly capture_method?: "" | "manual";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly swish?:
      | ({
          readonly reference?: string | "";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly twint?:
      | ({ readonly setup_future_usage?: "none" | "off_session" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
    readonly upi?:
      | ({
          readonly mandate_options?: {
            readonly amount?: number;
            readonly amount_type?: "fixed" | "maximum";
            readonly description?: string;
            readonly end_date?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly us_bank_account?:
      | ({
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
          readonly setup_future_usage?:
            | ""
            | "none"
            | "off_session"
            | "on_session";
          readonly target_date?: string;
          readonly transaction_purpose?:
            | ""
            | "goods"
            | "other"
            | "services"
            | "unspecified";
          readonly verification_method?:
            | "automatic"
            | "instant"
            | "microdeposits";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly wechat_pay?:
      | ({
          readonly app_id?: string;
          readonly client?: "android" | "ios" | "web";
          readonly setup_future_usage?: "none";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly zip?:
      | ({ readonly setup_future_usage?: "none" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly radar_options?: {
    readonly referrer?: string | "";
    readonly session?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly receipt_email?: string;
  readonly return_url?: string;
  readonly setup_future_usage?: "off_session" | "on_session";
  readonly shipping?: {
    readonly address: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly carrier?: string;
    readonly name: string;
    readonly phone?: string;
    readonly tracking_number?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly statement_descriptor?: string;
  readonly statement_descriptor_suffix?: string;
  readonly transfer_data?: {
    readonly amount?: number;
    readonly description?: string;
    readonly destination: StripeResourceEntityInputAlternatives_60;
    readonly metadata?: { readonly [x: string]: string } | "";
    readonly payment_data?: {
      readonly description?: string;
      readonly metadata?: { readonly [x: string]: string } | "";
    } & { readonly [x: string]: Schema.Json };
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_60;
  };
  readonly transfer_group?: string;
  readonly use_stripe_sdk?: boolean;
};

export const StripePaymentIntentPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
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
          "The list of payment method types allowed for use with this payment. Stripe automatically returns compatible payment methods from this list in the `payment_method_types` field of the response, based on the other PaymentIntent parameters, such as `currency`, `amount`, and `customer`.",
      }),
    ),
    amount: Schema.Number.annotate({
      description:
        "Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    amount_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          discount_amount: Schema.optionalKey(
            Schema.Union([Schema.Int, Schema.Literal("")]),
          ),
          enforce_arithmetic_validation: Schema.optionalKey(Schema.Boolean),
          line_items: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.StructWithRest(
                  Schema.Struct({
                    discount_amount: Schema.optionalKey(Schema.Int),
                    payment_method_options: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          card: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                commodity_code: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(12).annotate({
                                      expected:
                                        "a string with at most 12 code points",
                                    }),
                                  ),
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
                              title:
                                "payment_intent_amount_details_line_item_payment_method_options_param",
                            }),
                          ),
                          card_present: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                commodity_code: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(12).annotate({
                                      expected:
                                        "a string with at most 12 code points",
                                    }),
                                  ),
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
                              title:
                                "amount_details_line_item_payment_method_options_param",
                            }),
                          ),
                          klarna: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                image_url: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(4096).annotate({
                                      expected:
                                        "a string with at most 4096 code points",
                                    }),
                                  ),
                                ),
                                product_url: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(4096).annotate({
                                      expected:
                                        "a string with at most 4096 code points",
                                    }),
                                  ),
                                ),
                                reference: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(255).annotate({
                                      expected:
                                        "a string with at most 255 code points",
                                    }),
                                  ),
                                ),
                                subscription_reference: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(255).annotate({
                                      expected:
                                        "a string with at most 255 code points",
                                    }),
                                  ),
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
                              title:
                                "payment_intent_amount_details_line_item_payment_method_options_param",
                            }),
                          ),
                          paypal: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                category: Schema.optionalKey(
                                  Schema.Literals([
                                    "digital_goods",
                                    "donation",
                                    "physical_goods",
                                  ]),
                                ),
                                description: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(127).annotate({
                                      expected:
                                        "a string with at most 127 code points",
                                    }),
                                  ),
                                ),
                                sold_by: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(127).annotate({
                                      expected:
                                        "a string with at most 127 code points",
                                    }),
                                  ),
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
                              title:
                                "amount_details_line_item_payment_method_options_param",
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
                          "amount_details_line_item_payment_method_options_param",
                      }),
                    ),
                    product_code: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(12).annotate({
                          expected: "a string with at most 12 code points",
                        }),
                      ),
                    ),
                    product_name: Schema.String.check(
                      Schema.isMaxCodePoints(1024).annotate({
                        expected: "a string with at most 1024 code points",
                      }),
                    ),
                    quantity: Schema.Int,
                    tax: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({ total_tax_amount: Schema.Int }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        title: "amount_details_line_item_tax_param",
                      }),
                    ),
                    unit_cost: Schema.Int,
                    unit_of_measure: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(12).annotate({
                          expected: "a string with at most 12 code points",
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
                ).annotate({ title: "amount_details_line_item_param" }),
              ),
              Schema.Literal(""),
            ]),
          ),
          shipping: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  amount: Schema.optionalKey(
                    Schema.Union([Schema.Int, Schema.Literal("")]),
                  ),
                  from_postal_code: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(10).annotate({
                          expected: "a string with at most 10 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  to_postal_code: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(10).annotate({
                          expected: "a string with at most 10 code points",
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
              ).annotate({ title: "amount_details_shipping_param" }),
              Schema.Literal(""),
            ]),
          ),
          tax: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({ total_tax_amount: Schema.Int }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "amount_details_tax_param" }),
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
        title: "amount_details_param",
        description: "Provides industry-specific information about the amount.",
      }),
    ),
    application_fee_amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account. The amount of the application fee collected will be capped at the total amount captured. For more information, see the PaymentIntents [use case for connected accounts](https://docs.stripe.com/payments/connected-accounts).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
          "When you enable this parameter, this PaymentIntent accepts payment methods that you enable in the Dashboard and that are compatible with this PaymentIntent's other parameters.",
      }),
    ),
    capture_method: Schema.optionalKey(
      Schema.Literals(["automatic", "automatic_async", "manual"]).annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    confirm: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Set to `true` to attempt to [confirm this PaymentIntent](https://docs.stripe.com/api/payment_intents/confirm) immediately. This parameter defaults to `false`. When creating and confirming a PaymentIntent at the same time, you can also provide the parameters available in the [Confirm API](https://docs.stripe.com/api/payment_intents/confirm).",
      }),
    ),
    confirmation_method: Schema.optionalKey(
      Schema.Literals(["automatic", "manual"]).annotate({
        description:
          "Describes whether we can confirm this PaymentIntent automatically, or if it requires customer action to confirm the payment.",
      }),
    ),
    confirmation_token: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the ConfirmationToken used to confirm this PaymentIntent.\n\nIf the provided ConfirmationToken contains properties that are also being provided in this request, such as `payment_method`, then the values in this request will take precedence.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
    customer: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("customer"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["CustomerId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    customer_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the Account representing the customer that this PaymentIntent belongs to, if one exists.\n\nPayment methods attached to other Accounts cannot be used with this PaymentIntent.\n\nIf [setup_future_usage](https://docs.stripe.com/api#payment_intent_object-setup_future_usage) is set and this PaymentIntent's payment method is not `card_present`, then the payment method attaches to the Account after the PaymentIntent has been confirmed and any required actions from the user are complete. If the payment method is `card_present` and isn't a digital wallet, then a [generated_card](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card is created and attached to the Account instead.",
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
    error_on_requires_action: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Set to `true` to fail the payment attempt if the PaymentIntent transitions into `requires_action`. Use this parameter for simpler integrations that don't handle customer actions, such as [saving cards without authentication](https://docs.stripe.com/payments/save-card-without-authentication). This parameter can only be used with [`confirm=true`](https://docs.stripe.com/api/payment_intents/create#create_payment_intent-confirm).",
      }),
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
          "The list of payment method types to exclude from use with this payment.",
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
        description:
          "Specifies which fields in the response should be expanded.",
      }),
    ),
    hooks: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          inputs: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                tax: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      calculation: Schema.Union([
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        Schema.Literal(""),
                      ]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "async_workflows_inputs_tax_param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "async_workflows_inputs_param" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "async_workflows_param",
        description: "Automations to be run during the PaymentIntent lifecycle",
      }),
    ),
    mandate: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the mandate that's used for this payment. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/api/payment_intents/create#create_payment_intent-confirm).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
          "This hash contains details about the Mandate to create. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/api/payment_intents/create#create_payment_intent-confirm).",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    off_session: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean,
        Schema.Literals(["one_off", "recurring"]),
      ]).annotate({
        description:
          "Set to `true` to indicate that the customer isn't in your checkout flow during this payment attempt and can't authenticate. Use this parameter in scenarios where you collect payment method details and [charge them later](https://docs.stripe.com/payments/save-during-payment). This parameter can only be used with [`confirm=true`](https://docs.stripe.com/api/payment_intents/create#create_payment_intent-confirm).",
      }),
    ),
    on_behalf_of: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("v1-account"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["V1AccountId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    payment_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          customer_reference: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          order_reference: Schema.optionalKey(
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
        title: "payment_details",
        description: "Provides industry-specific information about the charge.",
      }),
    ),
    payment_method: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("payment-method"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PaymentMethodId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    payment_method_configuration: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the [payment method configuration](https://docs.stripe.com/api/payment_method_configurations) to use with this PaymentIntent.",
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
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        country: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        line1: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        line2: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        postal_code: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        state: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
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
                funding: Schema.optionalKey(
                  Schema.Literals(["card", "points"]),
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
          "If provided, this hash will be used to create a PaymentMethod. The new PaymentMethod will appear\nin the [payment_method](https://docs.stripe.com/api/payment_intents/object#payment_intent_object-payment_method)\nproperty on the PaymentIntent.",
      }),
    ),
    payment_method_options: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          acss_debit: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  mandate_options: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        custom_mandate_url: Schema.optionalKey(
                          Schema.Union([Schema.String, Schema.Literal("")]),
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
                        "payment_intent_payment_method_options_mandate_options_param",
                    }),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session", "on_session"]),
                  ),
                  target_date: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
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
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          affirm: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  preferred_locale: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(30).annotate({
                        expected: "a string with at most 30 code points",
                      }),
                    ),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          afterpay_clearpay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  reference: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(128).annotate({
                        expected: "a string with at most 128 code points",
                      }),
                    ),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          alipay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          alma: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          amazon_pay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          au_becs_debit: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session", "on_session"]),
                  ),
                  target_date: Schema.optionalKey(
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
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          bacs_debit: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  mandate_options: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        reference_prefix: Schema.optionalKey(
                          Schema.Union([
                            Schema.String.check(
                              Schema.isMaxCodePoints(12).annotate({
                                expected:
                                  "a string with at most 12 code points",
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
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session", "on_session"]),
                  ),
                  target_date: Schema.optionalKey(
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
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          bancontact: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  preferred_language: Schema.optionalKey(
                    Schema.Literals(["de", "en", "fr", "nl"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          billie: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  company_details: Schema.optionalKey(
                    Schema.Union([
                      Schema.StructWithRest(
                        Schema.Struct({
                          registered_address: Schema.optionalKey(
                            Schema.Union([
                              Schema.StructWithRest(
                                Schema.Struct({
                                  city: Schema.optionalKey(
                                    Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
                                      }),
                                    ),
                                  ),
                                  country: Schema.optionalKey(
                                    Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
                                      }),
                                    ),
                                  ),
                                  line1: Schema.optionalKey(
                                    Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
                                      }),
                                    ),
                                  ),
                                  line2: Schema.optionalKey(
                                    Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
                                      }),
                                    ),
                                  ),
                                  postal_code: Schema.optionalKey(
                                    Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
                                      }),
                                    ),
                                  ),
                                  state: Schema.optionalKey(
                                    Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
                                      }),
                                    ),
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
                              ).annotate({ title: "registered_address_param" }),
                              Schema.Literal(""),
                            ]),
                          ),
                          registered_name: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          registration_number: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          registration_type: Schema.optionalKey(
                            Schema.Literals([
                              "",
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
                            ]),
                          ),
                          vat: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
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
                      ).annotate({ title: "company_details_param" }),
                      Schema.Literal(""),
                    ]),
                  ),
                  reference: Schema.optionalKey(
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
              Schema.Literal(""),
            ]),
          ),
          bizum: Schema.optionalKey(
            Schema.Union([
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          blik: Schema.optionalKey(
            Schema.Union([
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
                        "payment_intent_payment_method_options_mandate_options_param",
                    }),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          boleto: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  expires_after_days: Schema.optionalKey(Schema.Int),
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
              Schema.Literal(""),
            ]),
          ),
          card: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  cvc_token: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  installments: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        enabled: Schema.optionalKey(Schema.Boolean),
                        plan: Schema.optionalKey(
                          Schema.Union([
                            Schema.StructWithRest(
                              Schema.Struct({
                                count: Schema.optionalKey(Schema.Int),
                                interval: Schema.optionalKey(
                                  Schema.Literal("month"),
                                ),
                                type: Schema.Literals([
                                  "bonus",
                                  "fixed_count",
                                  "revolving",
                                ]),
                              }),
                              [
                                Schema.Record(
                                  Schema.String,
                                  Schema.Json.annotate({
                                    expected: "JSON value",
                                  }),
                                ),
                              ],
                            ).annotate({ title: "installment_plan" }),
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
                    ).annotate({ title: "installments_param" }),
                  ),
                  mandate_options: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        amount: Schema.Int,
                        amount_type: Schema.Literals(["fixed", "maximum"]),
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
                    ).annotate({ title: "mandate_options_param" }),
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
                  request_extended_authorization: Schema.optionalKey(
                    Schema.Literals(["if_available", "never"]),
                  ),
                  request_incremental_authorization: Schema.optionalKey(
                    Schema.Literals(["if_available", "never"]),
                  ),
                  request_multicapture: Schema.optionalKey(
                    Schema.Literals(["if_available", "never"]),
                  ),
                  request_overcapture: Schema.optionalKey(
                    Schema.Literals(["if_available", "never"]),
                  ),
                  request_three_d_secure: Schema.optionalKey(
                    Schema.Literals(["any", "automatic", "challenge"]),
                  ),
                  require_cvc_recollection: Schema.optionalKey(Schema.Boolean),
                  setup_credential_usage: Schema.optionalKey(
                    Schema.Literals([
                      "installment",
                      "recurring",
                      "unscheduled",
                    ]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session", "on_session"]),
                  ),
                  statement_descriptor_suffix_kana: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(22).annotate({
                          expected: "a string with at most 22 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  statement_descriptor_suffix_kanji: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(17).annotate({
                          expected: "a string with at most 17 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  stored_credential_usage: Schema.optionalKey(
                    Schema.Literals([
                      "installment",
                      "recurring",
                      "unscheduled",
                    ]),
                  ),
                  three_d_secure: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        ares_trans_status: Schema.optionalKey(
                          Schema.Literals(["A", "C", "I", "N", "R", "U", "Y"]),
                        ),
                        cryptogram: Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        electronic_commerce_indicator: Schema.optionalKey(
                          Schema.Literals(["01", "02", "05", "06", "07"]),
                        ),
                        exemption_indicator: Schema.optionalKey(
                          Schema.Literals(["low_risk", "none"]),
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
                                  title:
                                    "cartes_bancaires_network_options_param",
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
                          ).annotate({ title: "network_options_param" }),
                        ),
                        requestor_challenge_indicator: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(2).annotate({
                              expected: "a string with at most 2 code points",
                            }),
                          ),
                        ),
                        transaction_id: Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        version: Schema.Literals([
                          "1.0.2",
                          "2.1.0",
                          "2.2.0",
                          "2.3.0",
                          "2.3.1",
                        ]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "payment_method_options_param" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_intent_param" }),
              Schema.Literal(""),
            ]),
          ),
          card_present: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["manual", "manual_preferred"]),
                  ),
                  request_extended_authorization: Schema.optionalKey(
                    Schema.Boolean,
                  ),
                  request_incremental_authorization_support: Schema.optionalKey(
                    Schema.Boolean,
                  ),
                  routing: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        requested_priority: Schema.optionalKey(
                          Schema.Literals(["domestic", "international"]),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "routing_payment_method_options_param",
                    }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          cashapp: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
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
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          crypto: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          customer_balance: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  bank_transfer: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        eu_bank_transfer: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              country: Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
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
                          ).annotate({ title: "eu_bank_transfer_params" }),
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
                          ),
                        ),
                        type: Schema.Literals([
                          "eu_bank_transfer",
                          "gb_bank_transfer",
                          "jp_bank_transfer",
                          "mx_bank_transfer",
                          "us_bank_transfer",
                        ]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "bank_transfer_param" }),
                  ),
                  funding_type: Schema.optionalKey(
                    Schema.Literal("bank_transfer"),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          eps: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          fpx: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          giropay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          grabpay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          ideal: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          interac_present: Schema.optionalKey(
            Schema.Union([
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          kakao_pay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          klarna: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
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
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["none", "off_session", "on_session"]),
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
                                  expected:
                                    "a string with at most 255 code points",
                                }),
                              ),
                            ),
                            next_billing: Schema.optionalKey(
                              Schema.StructWithRest(
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
                                    Schema.Json.annotate({
                                      expected: "JSON value",
                                    }),
                                  ),
                                ],
                              ).annotate({
                                title: "subscription_next_billing_param",
                              }),
                            ),
                            reference: Schema.String.check(
                              Schema.isMaxCodePoints(255).annotate({
                                expected:
                                  "a string with at most 255 code points",
                              }),
                            ),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "subscription_param" }),
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
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          konbini: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  confirmation_number: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(11).annotate({
                          expected: "a string with at most 11 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  expires_after_days: Schema.optionalKey(
                    Schema.Union([Schema.Int, Schema.Literal("")]),
                  ),
                  expires_at: Schema.optionalKey(
                    Schema.Union([
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  product_description: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(22).annotate({
                          expected: "a string with at most 22 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          kr_card: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          link: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          mb_way: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          mobilepay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          multibanco: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          naver_pay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          nz_bank_account: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session", "on_session"]),
                  ),
                  target_date: Schema.optionalKey(
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
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          oxxo: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  expires_after_days: Schema.optionalKey(Schema.Int),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          p24: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                  tos_shown_and_accepted: Schema.optionalKey(Schema.Boolean),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          pay_by_bank: Schema.optionalKey(
            Schema.Union([
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          payco: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          paynow: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          paypal: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  preferred_locale: Schema.optionalKey(
                    Schema.Literals([
                      "cs-CZ",
                      "da-DK",
                      "de-AT",
                      "de-DE",
                      "de-LU",
                      "el-GR",
                      "en-GB",
                      "en-US",
                      "es-ES",
                      "fi-FI",
                      "fr-BE",
                      "fr-FR",
                      "fr-LU",
                      "hu-HU",
                      "it-IT",
                      "nl-BE",
                      "nl-NL",
                      "pl-PL",
                      "pt-PT",
                      "sk-SK",
                      "sv-SE",
                    ]),
                  ),
                  reference: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(127).annotate({
                        expected: "a string with at most 127 code points",
                      }),
                    ),
                  ),
                  risk_correlation_id: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(32).annotate({
                        expected: "a string with at most 32 code points",
                      }),
                    ),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          paypay: Schema.optionalKey(
            Schema.Union([
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          payto: Schema.optionalKey(
            Schema.Union([
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
                                expected:
                                  "a string with at most 5000 code points",
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
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title:
                        "payment_intent_payment_method_options_mandate_options_param",
                    }),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          pix: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  amount_includes_iof: Schema.optionalKey(
                    Schema.Literals(["always", "never"]),
                  ),
                  expires_after_seconds: Schema.optionalKey(Schema.Int),
                  expires_at: Schema.optionalKey(
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                  ),
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
                              expected:
                                "a string with at most 5000 code points",
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
                              expected:
                                "a string with at most 5000 code points",
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
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          promptpay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          revolut_pay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          samsung_pay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          satispay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
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
              Schema.Literal(""),
            ]),
          ),
          scalapay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          sepa_debit: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  mandate_options: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        reference_prefix: Schema.optionalKey(
                          Schema.Union([
                            Schema.String.check(
                              Schema.isMaxCodePoints(12).annotate({
                                expected:
                                  "a string with at most 12 code points",
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
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session", "on_session"]),
                  ),
                  target_date: Schema.optionalKey(
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
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          sequra: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          sofort: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  preferred_language: Schema.optionalKey(
                    Schema.Literals([
                      "",
                      "de",
                      "en",
                      "es",
                      "fr",
                      "it",
                      "nl",
                      "pl",
                    ]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          sunbit: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  capture_method: Schema.optionalKey(
                    Schema.Literals(["", "manual"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          swish: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  reference: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          twint: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["none", "off_session"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          upi: Schema.optionalKey(
            Schema.Union([
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
              Schema.Literal(""),
            ]),
          ),
          us_bank_account: Schema.optionalKey(
            Schema.Union([
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                              expected:
                                "a string with at most 5000 code points",
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
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literals(["", "none", "off_session", "on_session"]),
                  ),
                  target_date: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  transaction_purpose: Schema.optionalKey(
                    Schema.Literals([
                      "",
                      "goods",
                      "other",
                      "services",
                      "unspecified",
                    ]),
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
              ).annotate({
                title: "payment_intent_payment_method_options_param",
              }),
              Schema.Literal(""),
            ]),
          ),
          wechat_pay: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  app_id: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  client: Schema.optionalKey(
                    Schema.Literals(["android", "ios", "web"]),
                  ),
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
              Schema.Literal(""),
            ]),
          ),
          zip: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  setup_future_usage: Schema.optionalKey(
                    Schema.Literal("none"),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "payment_method_options_param" }),
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
        title: "payment_method_options_param",
        description:
          "Payment method-specific configuration for this PaymentIntent.",
      }),
    ),
    radar_options: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          referrer: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
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
      ).annotate({
        title: "radar_options_with_peval_options",
        description:
          "Options to configure Radar. Learn more about [Radar Sessions](https://docs.stripe.com/radar/radar-session).",
      }),
    ),
    receipt_email: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Email address to send the receipt to. If you specify `receipt_email` for a payment in live mode, you send a receipt regardless of your [email settings](https://dashboard.stripe.com/account/emails).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    return_url: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site. If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme. This parameter can only be used with [`confirm=true`](https://docs.stripe.com/api/payment_intents/create#create_payment_intent-confirm).",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["off_session", "on_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
      }),
    ),
    shipping: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          address: Schema.StructWithRest(
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
          ).annotate({ title: "optional_fields_address" }),
          carrier: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          name: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          phone: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          tracking_number: Schema.optionalKey(
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
        title: "optional_fields_shipping",
        description: "Shipping information for this PaymentIntent.",
      }),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Text that appears on the customer's statement as the statement descriptor for a non-card charge. This value overrides the account's default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors).\n\nSetting this value for a card charge returns an error. For card charges, set the [statement_descriptor_suffix](https://docs.stripe.com/get-started/account/statement-descriptors#dynamic) instead.",
      }).check(
        Schema.isMaxCodePoints(22).annotate({
          expected: "a string with at most 22 code points",
        }),
      ),
    ),
    statement_descriptor_suffix: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Provides information about a card charge. Concatenated to the account's [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer's statement.",
      }).check(
        Schema.isMaxCodePoints(22).annotate({
          expected: "a string with at most 22 code points",
        }),
      ),
    ),
    transfer_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Int),
          description: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          destination: StripeResourceEntityInputAlternatives_60,
          metadata: Schema.optionalKey(
            Schema.Union([
              Schema.Record(Schema.String, Schema.String),
              Schema.Literal(""),
            ]),
          ),
          payment_data: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                description: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                metadata: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(Schema.String, Schema.String),
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
            ).annotate({ title: "transfer_data_payment_data_params" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_60,
            ]),
          ),
        ],
      ).annotate({
        title: "transfer_data_creation_params",
        description:
          "The parameters that you can use to automatically create a Transfer.\nLearn more about the [use case for connected accounts](https://docs.stripe.com/payments/connected-accounts).",
      }),
    ),
    transfer_group: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A string that identifies the resulting payment as part of a group. Learn more about the [use case for connected accounts](https://docs.stripe.com/connect/separate-charges-and-transfers).",
      }),
    ),
    use_stripe_sdk: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Set to `true` when confirming server-side and using Stripe.js, iOS, or Android client-side SDKs to handle the next actions.",
      }),
    ),
  }),
  StripePaymentIntentResourceSchema,
);
