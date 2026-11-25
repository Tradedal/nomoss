// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripeitem } from "./models/common.js";
import { Stripepayment_link } from "./models/payments.js";

export type GetPaymentLinksInput = {
  readonly active?: boolean;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetPaymentLinksOutput = {
  readonly data: ReadonlyArray<Stripepayment_link>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPaymentLinksError = Stripeerror;
export type PostPaymentLinksInput = {
  readonly after_completion?: {
    readonly hosted_confirmation?: { readonly custom_message?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly redirect?: { readonly url: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly type: "hosted_confirmation" | "redirect";
  } & { readonly [x: string]: Schema.Json };
  readonly allow_promotion_codes?: boolean;
  readonly application_fee_amount?: number;
  readonly application_fee_percent?: number;
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly billing_address_collection?: "auto" | "required";
  readonly consent_collection?: {
    readonly payment_method_reuse_agreement?: {
      readonly position: "auto" | "hidden";
    } & { readonly [x: string]: Schema.Json };
    readonly promotions?: "auto" | "none";
    readonly terms_of_service?: "none" | "required";
  } & { readonly [x: string]: Schema.Json };
  readonly currency?: string;
  readonly custom_fields?: ReadonlyArray<
    {
      readonly dropdown?: {
        readonly default_value?: string;
        readonly options: ReadonlyArray<
          { readonly label: string; readonly value: string } & {
            readonly [x: string]: Schema.Json;
          }
        >;
      } & { readonly [x: string]: Schema.Json };
      readonly key: string;
      readonly label: { readonly custom: string; readonly type: "custom" } & {
        readonly [x: string]: Schema.Json;
      };
      readonly numeric?: {
        readonly default_value?: string;
        readonly maximum_length?: number;
        readonly minimum_length?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly optional?: boolean;
      readonly text?: {
        readonly default_value?: string;
        readonly maximum_length?: number;
        readonly minimum_length?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly type: "dropdown" | "numeric" | "text";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly custom_text?: {
    readonly after_submit?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
    readonly shipping_address?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
    readonly submit?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
    readonly terms_of_service_acceptance?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly customer_creation?: "always" | "if_required";
  readonly expand?: ReadonlyArray<string>;
  readonly inactive_message?: string;
  readonly invoice_creation?: {
    readonly enabled: boolean;
    readonly invoice_data?: {
      readonly account_tax_ids?: ReadonlyArray<string> | "";
      readonly custom_fields?:
        | ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >
        | "";
      readonly description?: string;
      readonly footer?: string;
      readonly issuer?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
      readonly metadata?: { readonly [x: string]: string } | "";
      readonly rendering_options?:
        | ({
            readonly amount_tax_display?:
              | ""
              | "exclude_tax"
              | "include_inclusive_tax";
            readonly template?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly line_items: ReadonlyArray<
    {
      readonly adjustable_quantity?: {
        readonly enabled: boolean;
        readonly maximum?: number;
        readonly minimum?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly price?: string;
      readonly price_data?: {
        readonly currency: string;
        readonly product?: string;
        readonly product_data?: {
          readonly description?: string;
          readonly images?: ReadonlyArray<string>;
          readonly metadata?: { readonly [x: string]: string };
          readonly name: string;
          readonly tax_code?: string;
          readonly tax_details?: {
            readonly performance_location?: string;
            readonly tax_code?: string | "";
          } & { readonly [x: string]: Schema.Json };
          readonly unit_label?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly recurring?: {
          readonly interval: "day" | "month" | "week" | "year";
          readonly interval_count?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
        readonly unit_amount?: number;
        readonly unit_amount_decimal?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly quantity: number;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly managed_payments?: { readonly enabled?: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly metadata?: { readonly [x: string]: string };
  readonly name_collection?: {
    readonly business?: {
      readonly enabled: boolean;
      readonly optional?: boolean;
    } & { readonly [x: string]: Schema.Json };
    readonly individual?: {
      readonly enabled: boolean;
      readonly optional?: boolean;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly on_behalf_of?: string;
  readonly optional_items?: ReadonlyArray<
    {
      readonly adjustable_quantity?: {
        readonly enabled: boolean;
        readonly maximum?: number;
        readonly minimum?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly price: string;
      readonly quantity: number;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly payment_intent_data?: {
    readonly capture_method?: "automatic" | "automatic_async" | "manual";
    readonly description?: string;
    readonly metadata?: { readonly [x: string]: string };
    readonly setup_future_usage?: "off_session" | "on_session";
    readonly statement_descriptor?: string;
    readonly statement_descriptor_suffix?: string;
    readonly transfer_group?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method_collection?: "always" | "if_required";
  readonly payment_method_options?: {
    readonly card?: {
      readonly restrictions?: {
        readonly brands_blocked?: ReadonlyArray<
          "american_express" | "discover_global_network" | "mastercard" | "visa"
        >;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
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
  >;
  readonly phone_number_collection?: { readonly enabled: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly restrictions?: {
    readonly completed_sessions: { readonly limit: number } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly shipping_address_collection?: {
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
  readonly shipping_options?: ReadonlyArray<
    { readonly shipping_rate?: string } & { readonly [x: string]: Schema.Json }
  >;
  readonly submit_type?: "auto" | "book" | "donate" | "pay" | "subscribe";
  readonly subscription_data?: {
    readonly description?: string;
    readonly invoice_settings?: {
      readonly account_tax_ids?: ReadonlyArray<string> | "";
      readonly custom_fields?:
        | ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >
        | "";
      readonly description?: string;
      readonly footer?: string;
      readonly issuer?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly metadata?: { readonly [x: string]: string };
    readonly trial_period_days?: number;
    readonly trial_settings?: {
      readonly end_behavior: {
        readonly missing_payment_method: "cancel" | "create_invoice" | "pause";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly tax_id_collection?: {
    readonly enabled: boolean;
    readonly required?: "if_supported" | "never";
  } & { readonly [x: string]: Schema.Json };
  readonly transfer_data?: {
    readonly amount?: number;
    readonly destination: string;
  } & { readonly [x: string]: Schema.Json };
};
export type PostPaymentLinksOutput = Stripepayment_link;
export type PostPaymentLinksError = Stripeerror;
export type GetPaymentLinksPaymentLinkInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payment_link: string;
};
export type GetPaymentLinksPaymentLinkOutput = Stripepayment_link;
export type GetPaymentLinksPaymentLinkError = Stripeerror;
export type PostPaymentLinksPaymentLinkInput = {
  readonly active?: boolean;
  readonly after_completion?: {
    readonly hosted_confirmation?: { readonly custom_message?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly redirect?: { readonly url: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly type: "hosted_confirmation" | "redirect";
  } & { readonly [x: string]: Schema.Json };
  readonly allow_promotion_codes?: boolean;
  readonly application_fee_amount?: number | "";
  readonly application_fee_percent?: number | "";
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly billing_address_collection?: "auto" | "required";
  readonly consent_collection?: {
    readonly payment_method_reuse_agreement?: {
      readonly position: "auto" | "hidden";
    } & { readonly [x: string]: Schema.Json };
    readonly promotions?: "auto" | "none";
    readonly terms_of_service?: "none" | "required";
  } & { readonly [x: string]: Schema.Json };
  readonly custom_fields?:
    | ReadonlyArray<
        {
          readonly dropdown?: {
            readonly default_value?: string;
            readonly options: ReadonlyArray<
              { readonly label: string; readonly value: string } & {
                readonly [x: string]: Schema.Json;
              }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly key: string;
          readonly label: {
            readonly custom: string;
            readonly type: "custom";
          } & { readonly [x: string]: Schema.Json };
          readonly numeric?: {
            readonly default_value?: string;
            readonly maximum_length?: number;
            readonly minimum_length?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly optional?: boolean;
          readonly text?: {
            readonly default_value?: string;
            readonly maximum_length?: number;
            readonly minimum_length?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "dropdown" | "numeric" | "text";
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly custom_text?: {
    readonly after_submit?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
    readonly shipping_address?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
    readonly submit?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
    readonly terms_of_service_acceptance?:
      | ({ readonly message: string } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly customer_creation?: "always" | "if_required";
  readonly expand?: ReadonlyArray<string>;
  readonly inactive_message?: string | "";
  readonly invoice_creation?: {
    readonly enabled: boolean;
    readonly invoice_data?: {
      readonly account_tax_ids?: ReadonlyArray<string> | "";
      readonly custom_fields?:
        | ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >
        | "";
      readonly description?: string;
      readonly footer?: string;
      readonly issuer?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
      readonly metadata?: { readonly [x: string]: string } | "";
      readonly rendering_options?:
        | ({
            readonly amount_tax_display?:
              | ""
              | "exclude_tax"
              | "include_inclusive_tax";
            readonly template?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly line_items?: ReadonlyArray<
    {
      readonly adjustable_quantity?: {
        readonly enabled: boolean;
        readonly maximum?: number;
        readonly minimum?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly id: string;
      readonly quantity?: number;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly metadata?: { readonly [x: string]: string };
  readonly name_collection?:
    | ({
        readonly business?: {
          readonly enabled: boolean;
          readonly optional?: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly individual?: {
          readonly enabled: boolean;
          readonly optional?: boolean;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly on_behalf_of?: string | "";
  readonly optional_items?:
    | ReadonlyArray<
        {
          readonly adjustable_quantity?: {
            readonly enabled: boolean;
            readonly maximum?: number;
            readonly minimum?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly price: string;
          readonly quantity: number;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly payment_intent_data?: {
    readonly description?: string | "";
    readonly metadata?: { readonly [x: string]: string } | "";
    readonly setup_future_usage?: "" | "off_session" | "on_session";
    readonly statement_descriptor?: string | "";
    readonly statement_descriptor_suffix?: string | "";
    readonly transfer_group?: string | "";
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method_collection?: "always" | "if_required";
  readonly payment_method_options?:
    | ({
        readonly card?:
          | ({
              readonly restrictions?:
                | ({
                    readonly brands_blocked?:
                      | ReadonlyArray<
                          | "american_express"
                          | "discover_global_network"
                          | "mastercard"
                          | "visa"
                        >
                      | "";
                  } & { readonly [x: string]: Schema.Json })
                | "";
            } & { readonly [x: string]: Schema.Json })
          | "";
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly payment_method_types?:
    | ReadonlyArray<
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
      >
    | "";
  readonly phone_number_collection?: { readonly enabled: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly restrictions?:
    | ({
        readonly completed_sessions: { readonly limit: number } & {
          readonly [x: string]: Schema.Json;
        };
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly shipping_address_collection?:
    | ({
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
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly shipping_options?:
    | ReadonlyArray<
        { readonly shipping_rate?: string } & {
          readonly [x: string]: Schema.Json;
        }
      >
    | "";
  readonly submit_type?: "auto" | "book" | "donate" | "pay" | "subscribe";
  readonly subscription_data?: {
    readonly invoice_settings?: {
      readonly account_tax_ids?: ReadonlyArray<string> | "";
      readonly custom_fields?:
        | ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >
        | "";
      readonly description?: string;
      readonly footer?: string;
      readonly issuer?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly metadata?: { readonly [x: string]: string } | "";
    readonly trial_period_days?: number | "";
    readonly trial_settings?:
      | ({
          readonly end_behavior: {
            readonly missing_payment_method:
              | "cancel"
              | "create_invoice"
              | "pause";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly tax_id_collection?: {
    readonly enabled: boolean;
    readonly required?: "if_supported" | "never";
  } & { readonly [x: string]: Schema.Json };
  readonly transfer_data?:
    | ({ readonly amount?: number | ""; readonly destination: string } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly payment_link: string;
};
export type PostPaymentLinksPaymentLinkOutput = Stripepayment_link;
export type PostPaymentLinksPaymentLinkError = Stripeerror;
export type GetPaymentLinksPaymentLinkLineItemsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly payment_link: string;
  readonly starting_after?: string;
};
export type GetPaymentLinksPaymentLinkLineItemsOutput = {
  readonly data: ReadonlyArray<Stripeitem>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPaymentLinksPaymentLinkLineItemsError = Stripeerror;

export const GetPaymentLinksInput = Schema.Struct({
  active: Schema.optionalKey(Schema.Boolean),
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetPaymentLinksOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripepayment_link),
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
          new globalThis.RegExp("^\\/v1\\/payment_links", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/payment_links",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "PaymentLinksResourcePaymentLinkList", description: "" });
export const GetPaymentLinksError = Stripeerror;
export const PostPaymentLinksInput = Schema.Struct({
  after_completion: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        hosted_confirmation: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              custom_message: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(500).annotate({
                    expected: "a string with at most 500 code points",
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
          ).annotate({ title: "after_completion_confirmation_page_params" }),
        ),
        redirect: Schema.optionalKey(
          Schema.StructWithRest(Schema.Struct({ url: Schema.String }), [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ]).annotate({ title: "after_completion_redirect_params" }),
        ),
        type: Schema.Literals(["hosted_confirmation", "redirect"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "after_completion_params",
      description: "Behavior after the purchase is complete.",
    }),
  ),
  allow_promotion_codes: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Enables user redeemable promotion codes.",
    }),
  ),
  application_fee_amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account. Can only be applied when there are no line items with recurring prices.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  application_fee_percent: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. There must be at least 1 line item with a recurring price to use this field.",
    }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
  ),
  automatic_tax: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        liability: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account: Schema.optionalKey(Schema.String),
              type: Schema.Literals(["account", "self"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
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
      title: "automatic_tax_params",
      description: "Configuration for automatic tax collection.",
    }),
  ),
  billing_address_collection: Schema.optionalKey(
    Schema.Literals(["auto", "required"]).annotate({
      description:
        "Configuration for collecting the customer's billing address. Defaults to `auto`.",
    }),
  ),
  consent_collection: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        payment_method_reuse_agreement: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({ position: Schema.Literals(["auto", "hidden"]) }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "payment_method_reuse_agreement_params" }),
        ),
        promotions: Schema.optionalKey(Schema.Literals(["auto", "none"])),
        terms_of_service: Schema.optionalKey(
          Schema.Literals(["none", "required"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "consent_collection_params",
      description: "Configure fields to gather active consent from customers.",
    }),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies) and supported by each line item's price.",
      format: "currency",
    }),
  ),
  custom_fields: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          dropdown: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                default_value: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(100).annotate({
                      expected: "a string with at most 100 code points",
                    }),
                  ),
                ),
                options: Schema.Array(
                  Schema.StructWithRest(
                    Schema.Struct({
                      label: Schema.String.check(
                        Schema.isMaxCodePoints(100).annotate({
                          expected: "a string with at most 100 code points",
                        }),
                      ),
                      value: Schema.String.check(
                        Schema.isMaxCodePoints(100).annotate({
                          expected: "a string with at most 100 code points",
                        }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "custom_field_option_param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "custom_field_dropdown_param" }),
          ),
          key: Schema.String.check(
            Schema.isMaxCodePoints(200).annotate({
              expected: "a string with at most 200 code points",
            }),
          ),
          label: Schema.StructWithRest(
            Schema.Struct({
              custom: Schema.String.check(
                Schema.isMaxCodePoints(100).annotate({
                  expected: "a string with at most 100 code points",
                }),
              ),
              type: Schema.Literal("custom"),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "custom_field_label_param" }),
          numeric: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                default_value: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(255).annotate({
                      expected: "a string with at most 255 code points",
                    }),
                  ),
                ),
                maximum_length: Schema.optionalKey(Schema.Int),
                minimum_length: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "custom_field_numeric_param" }),
          ),
          optional: Schema.optionalKey(Schema.Boolean),
          text: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                default_value: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(255).annotate({
                      expected: "a string with at most 255 code points",
                    }),
                  ),
                ),
                maximum_length: Schema.optionalKey(Schema.Int),
                minimum_length: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "custom_field_text_param" }),
          ),
          type: Schema.Literals(["dropdown", "numeric", "text"]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "custom_field_param" }),
    ).annotate({
      description:
        "Collect additional information from your customer using custom fields. Up to 3 fields are supported. You can't set this parameter if `ui_mode` is `elements`.",
    }),
  ),
  custom_text: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        after_submit: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
            Schema.Literal(""),
          ]),
        ),
        shipping_address: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
            Schema.Literal(""),
          ]),
        ),
        submit: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
            Schema.Literal(""),
          ]),
        ),
        terms_of_service_acceptance: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
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
      title: "custom_text_param",
      description:
        "Display additional text for your customers using custom text. You can't set this parameter if `ui_mode` is `elements`.",
    }),
  ),
  customer_creation: Schema.optionalKey(
    Schema.Literals(["always", "if_required"]).annotate({
      description:
        "Configures whether [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by this payment link create a [Customer](https://docs.stripe.com/api/customers).",
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
  inactive_message: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The custom message to be displayed to a customer when a payment link is no longer active.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  invoice_creation: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        invoice_data: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_tax_ids: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              custom_fields: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        name: Schema.String.check(
                          Schema.isMaxCodePoints(40).annotate({
                            expected: "a string with at most 40 code points",
                          }),
                        ),
                        value: Schema.String.check(
                          Schema.isMaxCodePoints(140).annotate({
                            expected: "a string with at most 140 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "custom_field_params" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              description: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(1500).annotate({
                    expected: "a string with at most 1500 code points",
                  }),
                ),
              ),
              footer: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              issuer: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
              metadata: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(Schema.String, Schema.String),
                  Schema.Literal(""),
                ]),
              ),
              rendering_options: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      amount_tax_display: Schema.optionalKey(
                        Schema.Literals([
                          "",
                          "exclude_tax",
                          "include_inclusive_tax",
                        ]),
                      ),
                      template: Schema.optionalKey(
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
                  ).annotate({ title: "checkout_rendering_options_param" }),
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
          ).annotate({ title: "invoice_settings_params" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "invoice_creation_create_params",
      description: "Generate a post-purchase Invoice for one-time payments.",
    }),
  ),
  line_items: Schema.Array(
    Schema.StructWithRest(
      Schema.Struct({
        adjustable_quantity: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              enabled: Schema.Boolean,
              maximum: Schema.optionalKey(Schema.Int),
              minimum: Schema.optionalKey(Schema.Int),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "adjustable_quantity_params" }),
        ),
        price: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        price_data: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.String.annotate({ format: "currency" }),
              product: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              product_data: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    description: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(40000).annotate({
                          expected: "a string with at most 40000 code points",
                        }),
                      ),
                    ),
                    images: Schema.optionalKey(Schema.Array(Schema.String)),
                    metadata: Schema.optionalKey(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    name: Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                    tax_code: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    tax_details: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          performance_location: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          tax_code: Schema.optionalKey(
                            Schema.Union([Schema.String, Schema.Literal("")]),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "tax_details" }),
                    ),
                    unit_label: Schema.optionalKey(
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
                ).annotate({ title: "product_data" }),
              ),
              recurring: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    interval: Schema.Literals(["day", "month", "week", "year"]),
                    interval_count: Schema.optionalKey(Schema.Int),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "recurring_adhoc" }),
              ),
              tax_behavior: Schema.optionalKey(
                Schema.Literals(["exclusive", "inclusive", "unspecified"]),
              ),
              unit_amount: Schema.optionalKey(Schema.Int),
              unit_amount_decimal: Schema.optionalKey(
                Schema.String.annotate({ format: "decimal" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "custom_amount_price_data_with_product_data" }),
        ),
        quantity: Schema.Int,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "line_items_create_params" }),
  ).annotate({
    description:
      "The line items representing what is being sold. Each line item represents an item being sold. Up to 20 line items are supported.",
  }),
  managed_payments: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({ enabled: Schema.optionalKey(Schema.Boolean) }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "managed_payments_params",
      description:
        "Settings for Managed Payments for this Payment Link and resulting [CheckoutSessions](/api/checkout/sessions/object), [PaymentIntents](/api/payment_intents/object), [Invoices](/api/invoices/object), and [Subscriptions](/api/subscriptions/object).",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`. Metadata associated with this Payment Link will automatically be copied to [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by this payment link.",
    }),
  ),
  name_collection: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        business: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              enabled: Schema.Boolean,
              optional: Schema.optionalKey(Schema.Boolean),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "name_collection_business_params" }),
        ),
        individual: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              enabled: Schema.Boolean,
              optional: Schema.optionalKey(Schema.Boolean),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "name_collection_individual_params" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "name_collection_params",
      description:
        "Controls settings applied for collecting the customer's name.",
    }),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.String.annotate({
      description: "The account on behalf of which to charge.",
    }),
  ),
  optional_items: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          adjustable_quantity: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                maximum: Schema.optionalKey(Schema.Int),
                minimum: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "optional_item_adjustable_quantity_params" }),
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
      ).annotate({ title: "optional_item_params" }),
    ).annotate({
      description:
        "A list of optional items the customer can add to their order at checkout. Use this parameter to pass one-time or recurring [Prices](https://docs.stripe.com/api/prices).\nThere is a maximum of 10 optional items allowed on a payment link, and the existing limits on the number of line items allowed on a payment link apply to the combined number of line items and optional items.\nThere is a maximum of 20 combined line items and optional items.",
    }),
  ),
  payment_intent_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        capture_method: Schema.optionalKey(
          Schema.Literals(["automatic", "automatic_async", "manual"]),
        ),
        description: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(1000).annotate({
              expected: "a string with at most 1000 code points",
            }),
          ),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["off_session", "on_session"]),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(22).annotate({
              expected: "a string with at most 22 code points",
            }),
          ),
        ),
        statement_descriptor_suffix: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(22).annotate({
              expected: "a string with at most 22 code points",
            }),
          ),
        ),
        transfer_group: Schema.optionalKey(
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
      title: "payment_intent_data_params",
      description:
        "A subset of parameters to be passed to PaymentIntent creation for Checkout Sessions in `payment` mode.",
    }),
  ),
  payment_method_collection: Schema.optionalKey(
    Schema.Literals(["always", "if_required"]).annotate({
      description:
        "Specify whether Checkout should collect a payment method. When set to `if_required`, Checkout will not collect a payment method when the total due for the session is 0.This may occur if the Checkout Session includes a free trial or a discount.\n\nCan only be set in `subscription` mode. Defaults to `always`.\n\nIf you'd like information on how to collect a payment method outside of Checkout, read the guide on [configuring subscriptions with a free trial](https://docs.stripe.com/payments/checkout/free-trials).",
    }),
  ),
  payment_method_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        card: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              restrictions: Schema.optionalKey(
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
                      ),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "card_restrictions_params" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "card_payment_method_options_params" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_options_params",
      description: "Payment-method-specific configuration.",
    }),
  ),
  payment_method_types: Schema.optionalKey(
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
        "The list of payment method types that customers can use. If no value is passed, Stripe will dynamically show relevant payment methods from your [payment method settings](https://dashboard.stripe.com/settings/payment_methods) (20+ payment methods [supported](https://docs.stripe.com/payments/payment-methods/integration-options#payment-method-product-support)).",
    }),
  ),
  phone_number_collection: Schema.optionalKey(
    Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ]).annotate({
      title: "phone_number_collection_params",
      description:
        "Controls phone number collection settings during checkout.\n\nWe recommend that you review your privacy policy and check with your legal contacts.",
    }),
  ),
  restrictions: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        completed_sessions: Schema.StructWithRest(
          Schema.Struct({ limit: Schema.Int }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "completed_sessions_params" }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "restrictions_params",
      description: "Settings that restrict the usage of a payment link.",
    }),
  ),
  shipping_address_collection: Schema.optionalKey(
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
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "shipping_address_collection_params",
      description:
        "Configuration for collecting the customer's shipping address.",
    }),
  ),
  shipping_options: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          shipping_rate: Schema.optionalKey(
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
      ).annotate({ title: "shipping_option_params" }),
    ).annotate({
      description:
        "The shipping rate options to apply to [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by this payment link.",
    }),
  ),
  submit_type: Schema.optionalKey(
    Schema.Literals(["auto", "book", "donate", "pay", "subscribe"]).annotate({
      description:
        "Describes the type of transaction being performed in order to customize relevant text on the page, such as the submit button. Changing this value will also affect the hostname in the [url](https://docs.stripe.com/api/payment_links/payment_links/object#url) property (example: `donate.stripe.com`).",
    }),
  ),
  subscription_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        description: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ),
        invoice_settings: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_tax_ids: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              custom_fields: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        name: Schema.String.check(
                          Schema.isMaxCodePoints(40).annotate({
                            expected: "a string with at most 40 code points",
                          }),
                        ),
                        value: Schema.String.check(
                          Schema.isMaxCodePoints(140).annotate({
                            expected: "a string with at most 140 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "custom_field_params" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              description: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(500).annotate({
                    expected: "a string with at most 500 code points",
                  }),
                ),
              ),
              footer: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              issuer: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "subscription_data_invoice_settings_params" }),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        trial_period_days: Schema.optionalKey(Schema.Int),
        trial_settings: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              end_behavior: Schema.StructWithRest(
                Schema.Struct({
                  missing_payment_method: Schema.Literals([
                    "cancel",
                    "create_invoice",
                    "pause",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "end_behavior" }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "trial_settings_config" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "subscription_data_params",
      description:
        "When creating a subscription, the specified configuration data will be used. There must be at least one line item with a recurring price to use `subscription_data`.",
    }),
  ),
  tax_id_collection: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        required: Schema.optionalKey(
          Schema.Literals(["if_supported", "never"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "tax_id_collection_params",
      description: "Controls tax ID collection during checkout.",
    }),
  ),
  transfer_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.optionalKey(Schema.Int),
        destination: Schema.String,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "transfer_data_params",
      description:
        "The account (if any) the payments will be attributed to for tax reporting, and where funds from each payment will be transferred to.",
    }),
  ),
});
export const PostPaymentLinksOutput = Stripepayment_link;
export const PostPaymentLinksError = Stripeerror;
export const GetPaymentLinksPaymentLinkInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  payment_link: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPaymentLinksPaymentLinkOutput = Stripepayment_link;
export const GetPaymentLinksPaymentLinkError = Stripeerror;
export const PostPaymentLinksPaymentLinkInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the payment link's `url` is active. If `false`, customers visiting the URL will be shown a page saying that the link has been deactivated.",
    }),
  ),
  after_completion: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        hosted_confirmation: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              custom_message: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(500).annotate({
                    expected: "a string with at most 500 code points",
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
          ).annotate({ title: "after_completion_confirmation_page_params" }),
        ),
        redirect: Schema.optionalKey(
          Schema.StructWithRest(Schema.Struct({ url: Schema.String }), [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ]).annotate({ title: "after_completion_redirect_params" }),
        ),
        type: Schema.Literals(["hosted_confirmation", "redirect"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "after_completion_params",
      description: "Behavior after the purchase is complete.",
    }),
  ),
  allow_promotion_codes: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Enables user redeemable promotion codes.",
    }),
  ),
  application_fee_amount: Schema.optionalKey(
    Schema.Union([Schema.Int, Schema.Literal("")]).annotate({
      description:
        "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account. Can only be applied when there are no line items with recurring prices.",
    }),
  ),
  application_fee_percent: Schema.optionalKey(
    Schema.Union([Schema.Finite, Schema.Literal("")]).annotate({
      description:
        "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. There must be at least 1 line item with a recurring price to use this field.",
    }),
  ),
  automatic_tax: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        liability: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account: Schema.optionalKey(Schema.String),
              type: Schema.Literals(["account", "self"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
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
      title: "automatic_tax_params",
      description: "Configuration for automatic tax collection.",
    }),
  ),
  billing_address_collection: Schema.optionalKey(
    Schema.Literals(["auto", "required"]).annotate({
      description:
        "Configuration for collecting the customer's billing address. Defaults to `auto`.",
    }),
  ),
  consent_collection: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        payment_method_reuse_agreement: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({ position: Schema.Literals(["auto", "hidden"]) }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "payment_method_reuse_agreement_params" }),
        ),
        promotions: Schema.optionalKey(Schema.Literals(["auto", "none"])),
        terms_of_service: Schema.optionalKey(
          Schema.Literals(["none", "required"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "consent_collection_params",
      description: "Configure fields to gather active consent from customers.",
    }),
  ),
  custom_fields: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            dropdown: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  default_value: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(100).annotate({
                        expected: "a string with at most 100 code points",
                      }),
                    ),
                  ),
                  options: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        label: Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
                          }),
                        ),
                        value: Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "custom_field_option_param" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "custom_field_dropdown_param" }),
            ),
            key: Schema.String.check(
              Schema.isMaxCodePoints(200).annotate({
                expected: "a string with at most 200 code points",
              }),
            ),
            label: Schema.StructWithRest(
              Schema.Struct({
                custom: Schema.String.check(
                  Schema.isMaxCodePoints(100).annotate({
                    expected: "a string with at most 100 code points",
                  }),
                ),
                type: Schema.Literal("custom"),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "custom_field_label_param" }),
            numeric: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  default_value: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(255).annotate({
                        expected: "a string with at most 255 code points",
                      }),
                    ),
                  ),
                  maximum_length: Schema.optionalKey(Schema.Int),
                  minimum_length: Schema.optionalKey(Schema.Int),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "custom_field_numeric_param" }),
            ),
            optional: Schema.optionalKey(Schema.Boolean),
            text: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  default_value: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(255).annotate({
                        expected: "a string with at most 255 code points",
                      }),
                    ),
                  ),
                  maximum_length: Schema.optionalKey(Schema.Int),
                  minimum_length: Schema.optionalKey(Schema.Int),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "custom_field_text_param" }),
            ),
            type: Schema.Literals(["dropdown", "numeric", "text"]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "custom_field_param" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Collect additional information from your customer using custom fields. Up to 3 fields are supported. You can't set this parameter if `ui_mode` is `elements`.",
    }),
  ),
  custom_text: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        after_submit: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
            Schema.Literal(""),
          ]),
        ),
        shipping_address: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
            Schema.Literal(""),
          ]),
        ),
        submit: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
            Schema.Literal(""),
          ]),
        ),
        terms_of_service_acceptance: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                message: Schema.String.check(
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
            ).annotate({ title: "custom_text_position_param" }),
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
      title: "custom_text_param",
      description:
        "Display additional text for your customers using custom text. You can't set this parameter if `ui_mode` is `elements`.",
    }),
  ),
  customer_creation: Schema.optionalKey(
    Schema.Literals(["always", "if_required"]).annotate({
      description:
        "Configures whether [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by this payment link create a [Customer](https://docs.stripe.com/api/customers).",
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
  inactive_message: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The custom message to be displayed to a customer when a payment link is no longer active.",
    }),
  ),
  invoice_creation: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        invoice_data: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_tax_ids: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              custom_fields: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        name: Schema.String.check(
                          Schema.isMaxCodePoints(40).annotate({
                            expected: "a string with at most 40 code points",
                          }),
                        ),
                        value: Schema.String.check(
                          Schema.isMaxCodePoints(140).annotate({
                            expected: "a string with at most 140 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "custom_field_params" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              description: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(1500).annotate({
                    expected: "a string with at most 1500 code points",
                  }),
                ),
              ),
              footer: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              issuer: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
              metadata: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(Schema.String, Schema.String),
                  Schema.Literal(""),
                ]),
              ),
              rendering_options: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      amount_tax_display: Schema.optionalKey(
                        Schema.Literals([
                          "",
                          "exclude_tax",
                          "include_inclusive_tax",
                        ]),
                      ),
                      template: Schema.optionalKey(
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
                  ).annotate({ title: "checkout_rendering_options_param" }),
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
          ).annotate({ title: "invoice_settings_params" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "invoice_creation_update_params",
      description: "Generate a post-purchase Invoice for one-time payments.",
    }),
  ),
  line_items: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          adjustable_quantity: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                maximum: Schema.optionalKey(Schema.Int),
                minimum: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "adjustable_quantity_params" }),
          ),
          id: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          quantity: Schema.optionalKey(Schema.Int),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "line_items_update_params" }),
    ).annotate({
      description:
        "The line items representing what is being sold. Each line item represents an item being sold. Up to 20 line items are supported.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`. Metadata associated with this Payment Link will automatically be copied to [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by this payment link.",
    }),
  ),
  name_collection: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          business: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                optional: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "name_collection_business_params" }),
          ),
          individual: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                optional: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "name_collection_individual_params" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "name_collection_params" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Controls settings applied for collecting the customer's name.",
    }),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.Union([Schema.String, Schema.Literal("")]).annotate({
      description: "The account on behalf of which to charge.",
    }),
  ),
  optional_items: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            adjustable_quantity: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  enabled: Schema.Boolean,
                  maximum: Schema.optionalKey(Schema.Int),
                  minimum: Schema.optionalKey(Schema.Int),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "optional_item_adjustable_quantity_params" }),
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
        ).annotate({ title: "optional_item_params" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "A list of optional items the customer can add to their order at checkout. Use this parameter to pass one-time or recurring [Prices](https://docs.stripe.com/api/prices).\nThere is a maximum of 10 optional items allowed on a payment link, and the existing limits on the number of line items allowed on a payment link apply to the combined number of line items and optional items.\nThere is a maximum of 20 combined line items and optional items.",
    }),
  ),
  payment_intent_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(1000).annotate({
                expected: "a string with at most 1000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(Schema.String, Schema.String),
            Schema.Literal(""),
          ]),
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["", "off_session", "on_session"]),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(22).annotate({
                expected: "a string with at most 22 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        statement_descriptor_suffix: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(22).annotate({
                expected: "a string with at most 22 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        transfer_group: Schema.optionalKey(
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
      title: "payment_intent_data_update_params",
      description:
        "A subset of parameters to be passed to PaymentIntent creation for Checkout Sessions in `payment` mode.",
    }),
  ),
  payment_method_collection: Schema.optionalKey(
    Schema.Literals(["always", "if_required"]).annotate({
      description:
        "Specify whether Checkout should collect a payment method. When set to `if_required`, Checkout will not collect a payment method when the total due for the session is 0.This may occur if the Checkout Session includes a free trial or a discount.\n\nCan only be set in `subscription` mode. Defaults to `always`.\n\nIf you'd like information on how to collect a payment method outside of Checkout, read the guide on [configuring subscriptions with a free trial](https://docs.stripe.com/payments/checkout/free-trials).",
    }),
  ),
  payment_method_options: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          card: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  restrictions: Schema.optionalKey(
                    Schema.Union([
                      Schema.StructWithRest(
                        Schema.Struct({
                          brands_blocked: Schema.optionalKey(
                            Schema.Union([
                              Schema.Array(
                                Schema.Literals([
                                  "american_express",
                                  "discover_global_network",
                                  "mastercard",
                                  "visa",
                                ]),
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
                      ).annotate({ title: "card_restrictions_update_params" }),
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
                title: "card_payment_method_options_update_params",
              }),
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
      ).annotate({ title: "payment_method_options_update_params" }),
      Schema.Literal(""),
    ]).annotate({ description: "Payment-method-specific configuration." }),
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
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The list of payment method types that customers can use. Pass an empty string to enable dynamic payment methods that use your [payment method settings](https://dashboard.stripe.com/settings/payment_methods).",
    }),
  ),
  phone_number_collection: Schema.optionalKey(
    Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ]).annotate({
      title: "phone_number_collection_params",
      description:
        "Controls phone number collection settings during checkout.\n\nWe recommend that you review your privacy policy and check with your legal contacts.",
    }),
  ),
  restrictions: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          completed_sessions: Schema.StructWithRest(
            Schema.Struct({ limit: Schema.Int }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "completed_sessions_params" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "restrictions_params" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Settings that restrict the usage of a payment link.",
    }),
  ),
  shipping_address_collection: Schema.optionalKey(
    Schema.Union([
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
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "shipping_address_collection_params" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Configuration for collecting the customer's shipping address.",
    }),
  ),
  shipping_options: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            shipping_rate: Schema.optionalKey(
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
        ).annotate({ title: "shipping_option_params" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The shipping rate options to apply to [checkout sessions](https://docs.stripe.com/api/checkout/sessions) created by this payment link.",
    }),
  ),
  submit_type: Schema.optionalKey(
    Schema.Literals(["auto", "book", "donate", "pay", "subscribe"]).annotate({
      description:
        "Describes the type of transaction being performed in order to customize relevant text on the page, such as the submit button. Changing this value will also affect the hostname in the [url](https://docs.stripe.com/api/payment_links/payment_links/object#url) property (example: `donate.stripe.com`).",
    }),
  ),
  subscription_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        invoice_settings: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_tax_ids: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              custom_fields: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        name: Schema.String.check(
                          Schema.isMaxCodePoints(40).annotate({
                            expected: "a string with at most 40 code points",
                          }),
                        ),
                        value: Schema.String.check(
                          Schema.isMaxCodePoints(140).annotate({
                            expected: "a string with at most 140 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "custom_field_params" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              description: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(500).annotate({
                    expected: "a string with at most 500 code points",
                  }),
                ),
              ),
              footer: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              issuer: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "subscription_data_invoice_settings_params" }),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(Schema.String, Schema.String),
            Schema.Literal(""),
          ]),
        ),
        trial_period_days: Schema.optionalKey(
          Schema.Union([Schema.Int, Schema.Literal("")]),
        ),
        trial_settings: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                end_behavior: Schema.StructWithRest(
                  Schema.Struct({
                    missing_payment_method: Schema.Literals([
                      "cancel",
                      "create_invoice",
                      "pause",
                    ]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "end_behavior" }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "trial_settings_config" }),
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
      title: "subscription_data_update_params",
      description:
        "When creating a subscription, the specified configuration data will be used. There must be at least one line item with a recurring price to use `subscription_data`.",
    }),
  ),
  tax_id_collection: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        required: Schema.optionalKey(
          Schema.Literals(["if_supported", "never"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "tax_id_collection_params",
      description: "Controls tax ID collection during checkout.",
    }),
  ),
  transfer_data: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(
            Schema.Union([Schema.Int, Schema.Literal("")]),
          ),
          destination: Schema.String,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "transfer_data_update_params" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The account (if any) the payments will be attributed to for tax reporting, and where funds from each payment will be transferred to.",
    }),
  ),
  payment_link: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPaymentLinksPaymentLinkOutput = Stripepayment_link;
export const PostPaymentLinksPaymentLinkError = Stripeerror;
export const GetPaymentLinksPaymentLinkLineItemsInput = Schema.Struct({
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
  payment_link: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetPaymentLinksPaymentLinkLineItemsOutput = Schema.StructWithRest(
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
).annotate({ title: "PaymentLinksResourceListLineItems", description: "" });
export const GetPaymentLinksPaymentLinkLineItemsError = Stripeerror;
/**
 * The GetPaymentLinksOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPaymentLinksOperation: StripeOperation & {
  readonly input: typeof GetPaymentLinksInput;
  readonly output: typeof GetPaymentLinksOutput;
  readonly error: typeof GetPaymentLinksError;
} = {
  name: "GetPaymentLinks",
  method: "GET",
  path: "/v1/payment_links",
  pathParameters: [],
  queryParameters: [
    "active",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPaymentLinksInput,
  output: GetPaymentLinksOutput,
  error: GetPaymentLinksError,
};
/**
 * The PostPaymentLinksOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentLinksOperation: StripeOperation & {
  readonly input: typeof PostPaymentLinksInput;
  readonly output: typeof PostPaymentLinksOutput;
  readonly error: typeof PostPaymentLinksError;
} = {
  name: "PostPaymentLinks",
  method: "POST",
  path: "/v1/payment_links",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentLinksInput,
  output: PostPaymentLinksOutput,
  error: PostPaymentLinksError,
};
/**
 * The GetPaymentLinksPaymentLinkOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPaymentLinksPaymentLinkOperation: StripeOperation & {
  readonly input: typeof GetPaymentLinksPaymentLinkInput;
  readonly output: typeof GetPaymentLinksPaymentLinkOutput;
  readonly error: typeof GetPaymentLinksPaymentLinkError;
} = {
  name: "GetPaymentLinksPaymentLink",
  method: "GET",
  path: "/v1/payment_links/{payment_link}",
  pathParameters: ["payment_link"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPaymentLinksPaymentLinkInput,
  output: GetPaymentLinksPaymentLinkOutput,
  error: GetPaymentLinksPaymentLinkError,
};
/**
 * The PostPaymentLinksPaymentLinkOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentLinksPaymentLinkOperation: StripeOperation & {
  readonly input: typeof PostPaymentLinksPaymentLinkInput;
  readonly output: typeof PostPaymentLinksPaymentLinkOutput;
  readonly error: typeof PostPaymentLinksPaymentLinkError;
} = {
  name: "PostPaymentLinksPaymentLink",
  method: "POST",
  path: "/v1/payment_links/{payment_link}",
  pathParameters: ["payment_link"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentLinksPaymentLinkInput,
  output: PostPaymentLinksPaymentLinkOutput,
  error: PostPaymentLinksPaymentLinkError,
};
/**
 * The GetPaymentLinksPaymentLinkLineItemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPaymentLinksPaymentLinkLineItemsOperation: StripeOperation & {
  readonly input: typeof GetPaymentLinksPaymentLinkLineItemsInput;
  readonly output: typeof GetPaymentLinksPaymentLinkLineItemsOutput;
  readonly error: typeof GetPaymentLinksPaymentLinkLineItemsError;
} = {
  name: "GetPaymentLinksPaymentLinkLineItems",
  method: "GET",
  path: "/v1/payment_links/{payment_link}/line_items",
  pathParameters: ["payment_link"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPaymentLinksPaymentLinkLineItemsInput,
  output: GetPaymentLinksPaymentLinkLineItemsOutput,
  error: GetPaymentLinksPaymentLinkLineItemsError,
};
/**
 * The makePaymentLinksClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makePaymentLinksClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetPaymentLinks function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPaymentLinks = Effect.fn("paymentLinks.GetPaymentLinks")(function* (
    input: GetPaymentLinksInput,
  ) {
    const response: GetPaymentLinksOutput = yield* client.invoke(
      GetPaymentLinksOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPaymentLinks function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentLinks = Effect.fn("paymentLinks.PostPaymentLinks")(
    function* (input: PostPaymentLinksInput) {
      const response: PostPaymentLinksOutput = yield* client.invoke(
        PostPaymentLinksOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetPaymentLinksPaymentLink function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPaymentLinksPaymentLink = Effect.fn(
    "paymentLinks.GetPaymentLinksPaymentLink",
  )(function* (input: GetPaymentLinksPaymentLinkInput) {
    const response: GetPaymentLinksPaymentLinkOutput = yield* client.invoke(
      GetPaymentLinksPaymentLinkOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPaymentLinksPaymentLink function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentLinksPaymentLink = Effect.fn(
    "paymentLinks.PostPaymentLinksPaymentLink",
  )(function* (input: PostPaymentLinksPaymentLinkInput) {
    const response: PostPaymentLinksPaymentLinkOutput = yield* client.invoke(
      PostPaymentLinksPaymentLinkOperation,
      input,
    );
    return response;
  });
  /**
   * The GetPaymentLinksPaymentLinkLineItems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPaymentLinksPaymentLinkLineItems = Effect.fn(
    "paymentLinks.GetPaymentLinksPaymentLinkLineItems",
  )(function* (input: GetPaymentLinksPaymentLinkLineItemsInput) {
    const response: GetPaymentLinksPaymentLinkLineItemsOutput =
      yield* client.invoke(GetPaymentLinksPaymentLinkLineItemsOperation, input);
    return response;
  });
  return {
    GetPaymentLinks,
    PostPaymentLinks,
    GetPaymentLinksPaymentLink,
    PostPaymentLinksPaymentLink,
    GetPaymentLinksPaymentLinkLineItems,
  };
});
