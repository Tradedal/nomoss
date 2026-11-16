// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeCheckoutSessionProps = {
  readonly adaptive_pricing?: { readonly enabled?: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly after_expiration?: {
    readonly recovery?: {
      readonly allow_promotion_codes?: boolean;
      readonly enabled: boolean;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly allow_promotion_codes?: boolean;
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
    | "zip"
  >;
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly billing_address_collection?: "auto" | "required";
  readonly branding_settings?: {
    readonly background_color?: string | "";
    readonly border_style?: "" | "pill" | "rectangular" | "rounded";
    readonly button_color?: string | "";
    readonly display_name?: string;
    readonly font_family?:
      | ""
      | "be_vietnam_pro"
      | "bitter"
      | "chakra_petch"
      | "default"
      | "hahmlet"
      | "inconsolata"
      | "inter"
      | "lato"
      | "lora"
      | "m_plus_1_code"
      | "montserrat"
      | "noto_sans"
      | "noto_sans_jp"
      | "noto_serif"
      | "nunito"
      | "open_sans"
      | "pridi"
      | "pt_sans"
      | "pt_serif"
      | "raleway"
      | "roboto"
      | "roboto_slab"
      | "source_sans_pro"
      | "titillium_web"
      | "ubuntu_mono"
      | "zen_maru_gothic";
    readonly icon?: {
      readonly file?: string;
      readonly type: "file" | "url";
      readonly url?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly logo?: {
      readonly file?: string;
      readonly type: "file" | "url";
      readonly url?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly cancel_url?: string;
  readonly client_reference_id?: string;
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
  readonly customer?: string;
  readonly customer_account?: string;
  readonly customer_creation?: "always" | "if_required";
  readonly customer_email?: string;
  readonly customer_update?: {
    readonly address?: "auto" | "never";
    readonly name?: "auto" | "never";
    readonly shipping?: "auto" | "never";
  } & { readonly [x: string]: Schema.Json };
  readonly discounts?: ReadonlyArray<
    { readonly coupon?: string; readonly promotion_code?: string } & {
      readonly [x: string]: Schema.Json;
    }
  >;
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
  readonly expires_at?: number;
  readonly integration_identifier?: string;
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
      readonly metadata?: { readonly [x: string]: string };
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
      readonly metadata?: { readonly [x: string]: string };
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
      readonly quantity?: number;
      readonly tax_rates?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json }
  >;
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
    | "zh-TW";
  readonly managed_payments?: { readonly enabled?: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly metadata?: { readonly [x: string]: string };
  readonly mode?: "payment" | "setup" | "subscription";
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
  readonly origin_context?: "mobile_app" | "web";
  readonly payment_intent_data?: {
    readonly application_fee_amount?: number;
    readonly capture_method?: "automatic" | "automatic_async" | "manual";
    readonly description?: string;
    readonly metadata?: { readonly [x: string]: string };
    readonly on_behalf_of?: string;
    readonly receipt_email?: string;
    readonly setup_future_usage?: "off_session" | "on_session";
    readonly shipping?: {
      readonly address: {
        readonly city?: string;
        readonly country?: string;
        readonly line1: string;
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
      readonly destination: string;
    } & { readonly [x: string]: Schema.Json };
    readonly transfer_group?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method_collection?: "always" | "if_required";
  readonly payment_method_configuration?: string;
  readonly payment_method_data?: {
    readonly allow_redisplay?: "always" | "limited" | "unspecified";
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
      readonly setup_future_usage?: "none" | "off_session" | "on_session";
      readonly target_date?: string;
      readonly verification_method?: "automatic" | "instant" | "microdeposits";
    } & { readonly [x: string]: Schema.Json };
    readonly affirm?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly afterpay_clearpay?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly alipay?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly alma?: { readonly capture_method?: "manual" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly amazon_pay?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly au_becs_debit?: {
      readonly setup_future_usage?: "none";
      readonly target_date?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bacs_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
      readonly setup_future_usage?: "none" | "off_session" | "on_session";
      readonly target_date?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly bancontact?: {
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly billie?: { readonly capture_method?: "manual" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly blik?: {
      readonly mandate_options?: { readonly expires_at?: number } & {
        readonly [x: string]: Schema.Json;
      };
      readonly setup_future_usage?: "" | "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly boleto?: {
      readonly expires_after_days?: number;
      readonly setup_future_usage?: "none" | "off_session" | "on_session";
    } & { readonly [x: string]: Schema.Json };
    readonly card?: {
      readonly capture_method?: "manual";
      readonly installments?: { readonly enabled?: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly request_extended_authorization?: "if_available" | "never";
      readonly request_incremental_authorization?: "if_available" | "never";
      readonly request_multicapture?: "if_available" | "never";
      readonly request_overcapture?: "if_available" | "never";
      readonly request_three_d_secure?: "any" | "automatic" | "challenge";
      readonly restrictions?: {
        readonly brands_blocked?: ReadonlyArray<
          "american_express" | "discover_global_network" | "mastercard" | "visa"
        >;
        readonly funding_types_blocked?: ReadonlyArray<
          "credit" | "debit" | "prepaid"
        >;
      } & { readonly [x: string]: Schema.Json };
      readonly setup_future_usage?: "off_session" | "on_session";
      readonly statement_descriptor_suffix_kana?: string;
      readonly statement_descriptor_suffix_kanji?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly cashapp?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none" | "off_session" | "on_session";
    } & { readonly [x: string]: Schema.Json };
    readonly crypto?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly customer_balance?: {
      readonly bank_transfer?: {
        readonly eu_bank_transfer?: { readonly country: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly requested_address_types?: ReadonlyArray<
          "aba" | "iban" | "sepa" | "sort_code" | "spei" | "swift" | "zengin"
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
    } & { readonly [x: string]: Schema.Json };
    readonly demo_pay?: {
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly eps?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly fpx?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly giropay?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly grabpay?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ideal?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly kakao_pay?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly klarna?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none";
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
    readonly konbini?: {
      readonly expires_after_days?: number;
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly kr_card?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly link?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly mobilepay?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly multibanco?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly naver_pay?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly oxxo?: {
      readonly expires_after_days?: number;
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly p24?: {
      readonly setup_future_usage?: "none";
      readonly tos_shown_and_accepted?: boolean;
    } & { readonly [x: string]: Schema.Json };
    readonly pay_by_bank?: { readonly [x: string]: Schema.Json };
    readonly payco?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly paynow?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly paypal?: {
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
    } & { readonly [x: string]: Schema.Json };
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
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly pix?: {
      readonly amount_includes_iof?: "always" | "never";
      readonly expires_after_seconds?: number;
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
    } & { readonly [x: string]: Schema.Json };
    readonly revolut_pay?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none" | "off_session";
    } & { readonly [x: string]: Schema.Json };
    readonly samsung_pay?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly satispay?: { readonly capture_method?: "manual" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly scalapay?: { readonly capture_method?: "manual" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sepa_debit?: {
      readonly mandate_options?: { readonly reference_prefix?: string | "" } & {
        readonly [x: string]: Schema.Json;
      };
      readonly setup_future_usage?: "none" | "off_session" | "on_session";
      readonly target_date?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly sequra?: { readonly capture_method?: "manual" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sofort?: { readonly setup_future_usage?: "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sunbit?: {
      readonly capture_method?: "manual";
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
    readonly swish?: { readonly reference?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly twint?: {
      readonly setup_future_usage?: "none" | "off_session";
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
        readonly permissions?: ReadonlyArray<
          "balances" | "ownership" | "payment_method" | "transactions"
        >;
        readonly prefetch?: ReadonlyArray<
          "balances" | "ownership" | "transactions"
        >;
      } & { readonly [x: string]: Schema.Json };
      readonly setup_future_usage?: "none" | "off_session" | "on_session";
      readonly target_date?: string;
      readonly verification_method?: "automatic" | "instant";
    } & { readonly [x: string]: Schema.Json };
    readonly wechat_pay?: {
      readonly app_id?: string;
      readonly client: "android" | "ios" | "web";
      readonly setup_future_usage?: "none";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly permissions?: {
    readonly update_shipping_details?: "client_only" | "server_only";
  } & { readonly [x: string]: Schema.Json };
  readonly phone_number_collection?: { readonly enabled: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly redirect_on_completion?: "always" | "if_required" | "never";
  readonly return_url?: string;
  readonly saved_payment_method_options?: {
    readonly allow_redisplay_filters?: ReadonlyArray<
      "always" | "limited" | "unspecified"
    >;
    readonly payment_method_remove?: "disabled" | "enabled";
    readonly payment_method_save?: "disabled" | "enabled";
  } & { readonly [x: string]: Schema.Json };
  readonly setup_intent_data?: {
    readonly description?: string;
    readonly metadata?: { readonly [x: string]: string };
    readonly on_behalf_of?: string;
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
    {
      readonly shipping_rate?: string;
      readonly shipping_rate_data?: {
        readonly delivery_estimate?: {
          readonly maximum?: {
            readonly unit: "business_day" | "day" | "hour" | "month" | "week";
            readonly value: number;
          } & { readonly [x: string]: Schema.Json };
          readonly minimum?: {
            readonly unit: "business_day" | "day" | "hour" | "month" | "week";
            readonly value: number;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly display_name: string;
        readonly fixed_amount?: {
          readonly amount: number;
          readonly currency: string;
          readonly currency_options?: {
            readonly [x: string]: {
              readonly amount: number;
              readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
            } & { readonly [x: string]: Schema.Json };
          };
        } & { readonly [x: string]: Schema.Json };
        readonly metadata?: { readonly [x: string]: string };
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
        readonly tax_code?: string;
        readonly type?: "fixed_amount";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly submit_type?: "auto" | "book" | "donate" | "pay" | "subscribe";
  readonly subscription_data?: {
    readonly application_fee_percent?: number;
    readonly billing_cycle_anchor?: number;
    readonly billing_cycle_anchor_config?: {
      readonly day_of_month: number;
      readonly hour?: number;
      readonly minute?: number;
      readonly month?: number;
      readonly second?: number;
    } & { readonly [x: string]: Schema.Json };
    readonly billing_mode?: {
      readonly flexible?: {
        readonly proration_discounts?: "included" | "itemized";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "classic" | "flexible";
    } & { readonly [x: string]: Schema.Json };
    readonly default_tax_rates?: ReadonlyArray<string>;
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
    readonly on_behalf_of?: string;
    readonly pending_invoice_item_interval?: {
      readonly interval: "day" | "month" | "week" | "year";
      readonly interval_count?: number;
    } & { readonly [x: string]: Schema.Json };
    readonly proration_behavior?: "create_prorations" | "none";
    readonly transfer_data?: {
      readonly amount_percent?: number;
      readonly destination: string;
    } & { readonly [x: string]: Schema.Json };
    readonly trial_end?: number;
    readonly trial_period_days?: number;
    readonly trial_settings?: {
      readonly end_behavior: {
        readonly missing_payment_method: "cancel" | "create_invoice" | "pause";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly success_url?: string;
  readonly tax_id_collection?: {
    readonly enabled: boolean;
    readonly required?: "if_supported" | "never";
  } & { readonly [x: string]: Schema.Json };
  readonly ui_mode?: "elements" | "embedded_page" | "form" | "hosted_page";
  readonly wallet_options?: {
    readonly link?: { readonly display?: "auto" | "never" } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
};

export const StripeCheckoutSessionResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "checkout-session",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/CheckoutSessionId"],
  });
export const StripeCheckoutSessionPropsSchema = annotateResourceSchema(
  Schema.Struct({
    adaptive_pricing: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({ enabled: Schema.optionalKey(Schema.Boolean) }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "adaptive_pricing_params",
        description:
          "Settings for price localization with [Adaptive Pricing](https://docs.stripe.com/payments/checkout/adaptive-pricing).",
      }),
    ),
    after_expiration: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          recovery: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                allow_promotion_codes: Schema.optionalKey(Schema.Boolean),
                enabled: Schema.Boolean,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "recovery_params" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "after_expiration_params",
        description:
          "Configure actions after a Checkout Session has expired. You can't set this parameter if `ui_mode` is `elements`.",
      }),
    ),
    allow_promotion_codes: Schema.optionalKey(
      Schema.Boolean.annotate({
        description: "Enables user redeemable promotion codes.",
      }),
    ),
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
      ).annotate({
        description:
          "A list of the types of payment methods (e.g., `card`) this Checkout Session can accept.\n\nUnlike `payment_method_types`, this acts as a filter on the dynamically computed set of\neligible payment methods rather than an explicit static list. Only payment methods that\nare both dynamically eligible and present in this list will be offered to the customer.",
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
        description:
          "Settings for automatic tax lookup for this session and resulting payments, invoices, and subscriptions.",
      }),
    ),
    billing_address_collection: Schema.optionalKey(
      Schema.Literals(["auto", "required"]).annotate({
        description:
          "Specify whether Checkout should collect the customer's billing address. Defaults to `auto`.",
      }),
    ),
    branding_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          background_color: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          border_style: Schema.optionalKey(
            Schema.Literals(["", "pill", "rectangular", "rounded"]),
          ),
          button_color: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          display_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          font_family: Schema.optionalKey(
            Schema.Literals([
              "",
              "be_vietnam_pro",
              "bitter",
              "chakra_petch",
              "default",
              "hahmlet",
              "inconsolata",
              "inter",
              "lato",
              "lora",
              "m_plus_1_code",
              "montserrat",
              "noto_sans",
              "noto_sans_jp",
              "noto_serif",
              "nunito",
              "open_sans",
              "pridi",
              "pt_sans",
              "pt_serif",
              "raleway",
              "roboto",
              "roboto_slab",
              "source_sans_pro",
              "titillium_web",
              "ubuntu_mono",
              "zen_maru_gothic",
            ]),
          ),
          icon: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                file: Schema.optionalKey(Schema.String),
                type: Schema.Literals(["file", "url"]),
                url: Schema.optionalKey(Schema.String),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "icon_params" }),
          ),
          logo: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                file: Schema.optionalKey(Schema.String),
                type: Schema.Literals(["file", "url"]),
                url: Schema.optionalKey(Schema.String),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "logo_params" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "branding_settings_params",
        description:
          "The branding settings for the Checkout Session. This parameter is not allowed if ui_mode is `elements`.",
      }),
    ),
    cancel_url: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "If set, Checkout displays a back button and customers will be directed to this URL if they decide to cancel payment and return to your website. This parameter is not allowed if ui_mode is `embedded_page` or `elements`.",
      }),
    ),
    client_reference_id: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A unique string to reference the Checkout Session. This can be a\ncustomer ID, a cart ID, or similar, and can be used to reconcile the\nsession with your internal systems.",
      }).check(
        Schema.isMaxCodePoints(200).annotate({
          expected: "a string with at most 200 code points",
        }),
      ),
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
        description:
          "Configure fields for the Checkout Session to gather active consent from customers.",
      }),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies). Required in `setup` mode when `allowed_payment_method_types` is not set.",
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
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of an existing Customer, if one exists. In `payment` mode, the customer’s most recently saved card\npayment method will be used to prefill the email, name, card details, and billing address\non the Checkout page. In `subscription` mode, the customer’s [default payment method](https://docs.stripe.com/api/customers/update#update_customer-invoice_settings-default_payment_method)\nwill be used if it’s a card, otherwise the most recently saved card will be used. A valid billing address, billing name and billing email are required on the payment method for Checkout to prefill the customer's card details.\n\nIf the Customer already has a valid [email](https://docs.stripe.com/api/customers/object#customer_object-email) set, the email will be prefilled and not editable in Checkout.\nIf the Customer does not have a valid `email`, Checkout will set the email entered during the session on the Customer.\n\nIf blank for Checkout Sessions in `subscription` mode or with `customer_creation` set as `always` in `payment` mode, Checkout will create a new Customer object based on information provided during the payment flow.\n\nYou can set [`payment_intent_data.setup_future_usage`](https://docs.stripe.com/api/checkout/sessions/create#create_checkout_session-payment_intent_data-setup_future_usage) to have Checkout automatically attach the payment method to the Customer you pass in for future reuse.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    customer_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of an existing Account, if one exists. Has the same behavior as `customer`.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    customer_creation: Schema.optionalKey(
      Schema.Literals(["always", "if_required"]).annotate({
        description:
          "Configure whether a Checkout Session creates a [Customer](https://docs.stripe.com/api/customers) during Session confirmation.\n\nWhen a Customer is not created, you can still retrieve email, address, and other customer data entered in Checkout\nwith [customer_details](https://docs.stripe.com/api/checkout/sessions/object#checkout_session_object-customer_details).\n\nSessions that don't create Customers instead are grouped by [guest customers](https://docs.stripe.com/payments/checkout/guest-customers)\nin the Dashboard. Promotion codes limited to first time customers will return invalid for these Sessions.\n\nCan only be set in `payment` and `setup` mode.",
      }),
    ),
    customer_email: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "If provided, this value will be used when the Customer object is created.\nIf not provided, customers will be asked to enter their email address.\nUse this parameter to prefill customer data if you already have an email\non file. To access information about the customer once a session is\ncomplete, use the `customer` field.",
      }).check(
        Schema.isMaxCodePoints(800).annotate({
          expected: "a string with at most 800 code points",
        }),
      ),
    ),
    customer_update: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          address: Schema.optionalKey(Schema.Literals(["auto", "never"])),
          name: Schema.optionalKey(Schema.Literals(["auto", "never"])),
          shipping: Schema.optionalKey(Schema.Literals(["auto", "never"])),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "customer_update_params",
        description:
          "Controls what fields on Customer can be updated by the Checkout Session. Can only be provided when `customer` is provided.",
      }),
    ),
    discounts: Schema.optionalKey(
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            coupon: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            promotion_code: Schema.optionalKey(
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
        ).annotate({ title: "discount_params" }),
      ).annotate({
        description:
          "The coupon or promotion code to apply to this Session. Currently, only up to one may be specified.",
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
          "A list of the types of payment methods (e.g., `card`) that should be excluded from this Checkout Session. This should only be used when payment methods for this Checkout Session are managed through the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods).",
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
    expires_at: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The Epoch time in seconds at which the Checkout Session will expire. It can be anywhere from 30 minutes to 24 hours after Checkout Session creation. By default, this value is 24 hours from creation.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    integration_identifier: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The integration identifier for this Checkout Session. Multiple Checkout Sessions can have the same integration identifier.",
      }).check(
        Schema.isMaxCodePoints(200).annotate({
          expected: "a string with at most 200 code points",
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
                  Schema.Record(Schema.String, Schema.String),
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
            ).annotate({ title: "invoice_data_params" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "invoice_creation_params",
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
            metadata: Schema.optionalKey(
              Schema.Record(Schema.String, Schema.String),
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
                              expected:
                                "a string with at most 40000 code points",
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
                              expected:
                                "a string with at most 5000 code points",
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
                                Schema.Union([
                                  Schema.String,
                                  Schema.Literal(""),
                                ]),
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
                        interval: Schema.Literals([
                          "day",
                          "month",
                          "week",
                          "year",
                        ]),
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
              ).annotate({ title: "price_data_with_product_data" }),
            ),
            quantity: Schema.optionalKey(Schema.Int),
            tax_rates: Schema.optionalKey(
              Schema.Array(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "line_item_params" }),
      ).annotate({
        description:
          "A list of items the customer is purchasing. Use this parameter to pass one-time or recurring [Prices](https://docs.stripe.com/api/prices). The parameter is required for `payment` and `subscription` mode.\n\nFor `payment` mode, there is a maximum of 100 line items, however it is recommended to consolidate line items if there are more than a few dozen.\n\nFor `subscription` mode, there is a maximum of 20 line items with recurring Prices and 20 line items with one-time Prices. Line items with one-time Prices will be on the initial invoice only.",
      }),
    ),
    locale: Schema.optionalKey(
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
    ),
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
          "Settings for Managed Payments for this Checkout Session and resulting [PaymentIntents](/api/payment_intents/object), [Invoices](/api/invoices/object), and [Subscriptions](/api/subscriptions/object).",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    mode: Schema.optionalKey(
      Schema.Literals(["payment", "setup", "subscription"]).annotate({
        description:
          "The mode of the Checkout Session. Pass `subscription` if the Checkout Session includes at least one recurring item.",
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
          "Controls name collection settings for the session.\n\nYou can configure Checkout to collect your customers' business names, individual names, or both. Each name field can be either required or optional.\n\nIf a [Customer](https://docs.stripe.com/api/customers) is created or provided, the names can be saved to the Customer object as well.",
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
          "A list of optional items the customer can add to their order at checkout. Use this parameter to pass one-time or recurring [Prices](https://docs.stripe.com/api/prices).\n\nThere is a maximum of 10 optional items allowed on a Checkout Session, and the existing limits on the number of line items allowed on a Checkout Session apply to the combined number of line items and optional items.\n\nFor `payment` mode, there is a maximum of 100 combined line items and optional items, however it is recommended to consolidate items if there are more than a few dozen.\n\nFor `subscription` mode, there is a maximum of 20 line items and optional items with recurring Prices and 20 line items and optional items with one-time Prices.\n\nYou can't set this parameter if `ui_mode` is `elements` or `form`.",
      }),
    ),
    origin_context: Schema.optionalKey(
      Schema.Literals(["mobile_app", "web"]).annotate({
        description:
          "Where the user is coming from. This informs the optimizations that are applied to the session. You can't set this parameter if `ui_mode` is `elements`.",
      }),
    ),
    payment_intent_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          application_fee_amount: Schema.optionalKey(Schema.Int),
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
          on_behalf_of: Schema.optionalKey(Schema.String),
          receipt_email: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          setup_future_usage: Schema.optionalKey(
            Schema.Literals(["off_session", "on_session"]),
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
                    line1: Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
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
                ).annotate({ title: "address" }),
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
            ).annotate({ title: "shipping" }),
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
            ).annotate({ title: "transfer_data_params" }),
          ),
          transfer_group: Schema.optionalKey(Schema.String),
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
          "Specify whether Checkout should collect a payment method. When set to `if_required`, Checkout will not collect a payment method when the total due for the session is 0.\nThis may occur if the Checkout Session includes a free trial or a discount.\n\nCan only be set in `subscription` mode. Defaults to `always`.\n\nIf you'd like information on how to collect a payment method outside of Checkout, read the guide on configuring [subscriptions with a free trial](https://docs.stripe.com/payments/checkout/free-trials).",
      }),
    ),
    payment_method_configuration: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the payment method configuration to use with this Checkout session.",
      }).check(
        Schema.isMaxCodePoints(100).annotate({
          expected: "a string with at most 100 code points",
        }),
      ),
    ),
    payment_method_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          allow_redisplay: Schema.optionalKey(
            Schema.Literals(["always", "limited", "unspecified"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "payment_method_data_param",
        description:
          "This parameter allows you to set some attributes on the payment method created during a Checkout session.",
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
                  ).annotate({ title: "mandate_options_param" }),
                ),
                setup_future_usage: Schema.optionalKey(
                  Schema.Literals(["none", "off_session", "on_session"]),
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
            ).annotate({ title: "payment_method_options_param" }),
          ),
          affirm: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          afterpay_clearpay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          alipay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          alma: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          amazon_pay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
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
          ),
          au_becs_debit: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
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
            ).annotate({ title: "payment_method_options_param" }),
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
                setup_future_usage: Schema.optionalKey(
                  Schema.Literals(["none", "off_session", "on_session"]),
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
            ).annotate({ title: "payment_method_options_param" }),
          ),
          bancontact: Schema.optionalKey(
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
          ),
          billie: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          blik: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
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
                      "subscription_payment_method_options_mandate_options_param",
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
            ).annotate({ title: "payment_method_options_param" }),
          ),
          boleto: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                expires_after_days: Schema.optionalKey(Schema.Int),
                setup_future_usage: Schema.optionalKey(
                  Schema.Literals(["none", "off_session", "on_session"]),
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
          card: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                installments: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      enabled: Schema.optionalKey(Schema.Boolean),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "installments_param" }),
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
                      funding_types_blocked: Schema.optionalKey(
                        Schema.Array(
                          Schema.Literals(["credit", "debit", "prepaid"]),
                        ),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "restrictions_param" }),
                ),
                setup_future_usage: Schema.optionalKey(
                  Schema.Literals(["off_session", "on_session"]),
                ),
                statement_descriptor_suffix_kana: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(22).annotate({
                      expected: "a string with at most 22 code points",
                    }),
                  ),
                ),
                statement_descriptor_suffix_kanji: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(17).annotate({
                      expected: "a string with at most 17 code points",
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
          cashapp: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(
                  Schema.Literals(["none", "off_session", "on_session"]),
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
          crypto: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          customer_balance: Schema.optionalKey(
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
                              Schema.Json.annotate({ expected: "JSON value" }),
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
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          demo_pay: Schema.optionalKey(
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
          ),
          eps: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          fpx: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          giropay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          grabpay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          ideal: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          kakao_pay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
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
          ),
          klarna: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
            ).annotate({ title: "payment_method_options_param" }),
          ),
          konbini: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                expires_after_days: Schema.optionalKey(Schema.Int),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          kr_card: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
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
          ),
          link: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
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
          ),
          mobilepay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          multibanco: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          naver_pay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
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
          ),
          oxxo: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                expires_after_days: Schema.optionalKey(Schema.Int),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          p24: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
                tos_shown_and_accepted: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          pay_by_bank: Schema.optionalKey(
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ).annotate({ title: "payment_method_options_param" }),
          ),
          payco: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          paynow: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          paypal: Schema.optionalKey(
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
                      start_date: Schema.optionalKey(
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
          ),
          pix: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount_includes_iof: Schema.optionalKey(
                  Schema.Literals(["always", "never"]),
                ),
                expires_after_seconds: Schema.optionalKey(Schema.Int),
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
          ),
          revolut_pay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
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
          ),
          samsung_pay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          satispay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          scalapay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
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
                setup_future_usage: Schema.optionalKey(
                  Schema.Literals(["none", "off_session", "on_session"]),
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
            ).annotate({ title: "payment_method_options_param" }),
          ),
          sequra: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          sofort: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          sunbit: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                capture_method: Schema.optionalKey(Schema.Literal("manual")),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
          ),
          swish: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
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
          ),
          twint: Schema.optionalKey(
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "linked_account_options_param" }),
                ),
                setup_future_usage: Schema.optionalKey(
                  Schema.Literals(["none", "off_session", "on_session"]),
                ),
                target_date: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                verification_method: Schema.optionalKey(
                  Schema.Literals(["automatic", "instant"]),
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
          wechat_pay: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                app_id: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                client: Schema.Literals(["android", "ios", "web"]),
                setup_future_usage: Schema.optionalKey(Schema.Literal("none")),
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
      ).annotate({
        title: "payment_method_options_param",
        description: "Payment-method-specific configuration.",
      }),
    ),
    permissions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          update_shipping_details: Schema.optionalKey(
            Schema.Literals(["client_only", "server_only"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "permissions_param",
        description:
          "This property is used to set up permissions for various actions (for example, update) on the CheckoutSession object. Can only be set when creating `embedded_page` or `elements` sessions.\n\nFor specific permissions, please refer to their dedicated subsections, such as `permissions.update_shipping_details`.",
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
          "Controls phone number collection settings for the session.\n\nWe recommend that you review your privacy policy and check with your legal contacts\nbefore using this feature. Learn more about [collecting phone numbers with Checkout](https://docs.stripe.com/payments/checkout/phone-numbers).",
      }),
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
          "The URL to redirect your customer back to after they authenticate or cancel their payment on the\npayment method's app or site. This parameter is required if `ui_mode` is `embedded_page` or `elements`\nand redirect-based payment methods are enabled on the session.",
      }),
    ),
    saved_payment_method_options: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          allow_redisplay_filters: Schema.optionalKey(
            Schema.Array(Schema.Literals(["always", "limited", "unspecified"])),
          ),
          payment_method_remove: Schema.optionalKey(
            Schema.Literals(["disabled", "enabled"]),
          ),
          payment_method_save: Schema.optionalKey(
            Schema.Literals(["disabled", "enabled"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "saved_payment_method_options_param",
        description:
          "Controls saved payment method settings for the session. Only available in `payment` and `subscription` mode.",
      }),
    ),
    setup_intent_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
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
          on_behalf_of: Schema.optionalKey(Schema.String),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "setup_intent_data_param",
        description:
          "A subset of parameters to be passed to SetupIntent creation for Checkout Sessions in `setup` mode.",
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
          "When set, provides configuration for Checkout to collect a shipping address from a customer.",
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
            shipping_rate_data: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  delivery_estimate: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        maximum: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              unit: Schema.Literals([
                                "business_day",
                                "day",
                                "hour",
                                "month",
                                "week",
                              ]),
                              value: Schema.Int,
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "delivery_estimate_bound" }),
                        ),
                        minimum: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              unit: Schema.Literals([
                                "business_day",
                                "day",
                                "hour",
                                "month",
                                "week",
                              ]),
                              value: Schema.Int,
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "delivery_estimate_bound" }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "delivery_estimate" }),
                  ),
                  display_name: Schema.String.check(
                    Schema.isMaxCodePoints(100).annotate({
                      expected: "a string with at most 100 code points",
                    }),
                  ),
                  fixed_amount: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        amount: Schema.Int,
                        currency: Schema.String.annotate({
                          format: "currency",
                        }),
                        currency_options: Schema.optionalKey(
                          Schema.Record(
                            Schema.String,
                            Schema.StructWithRest(
                              Schema.Struct({
                                amount: Schema.Int,
                                tax_behavior: Schema.optionalKey(
                                  Schema.Literals([
                                    "exclusive",
                                    "inclusive",
                                    "unspecified",
                                  ]),
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
                            ).annotate({ title: "currency_option" }),
                          ),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "fixed_amount" }),
                  ),
                  metadata: Schema.optionalKey(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  tax_behavior: Schema.optionalKey(
                    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
                  ),
                  tax_code: Schema.optionalKey(Schema.String),
                  type: Schema.optionalKey(Schema.Literal("fixed_amount")),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "create_params" }),
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
          "The shipping rate options to apply to this Session. Up to a maximum of 5.",
      }),
    ),
    submit_type: Schema.optionalKey(
      Schema.Literals(["auto", "book", "donate", "pay", "subscribe"]).annotate({
        description:
          "Describes the type of transaction being performed by Checkout in order\nto customize relevant text on the page, such as the submit button.\n `submit_type` can only be specified on Checkout Sessions in\n`payment` or `subscription` mode. If blank or `auto`, `pay` is used.\nYou can't set this parameter if `ui_mode` is `elements`.",
      }),
    ),
    subscription_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          application_fee_percent: Schema.optionalKey(Schema.Finite),
          billing_cycle_anchor: Schema.optionalKey(
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
          ),
          billing_cycle_anchor_config: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                day_of_month: Schema.Int,
                hour: Schema.optionalKey(Schema.Int),
                minute: Schema.optionalKey(Schema.Int),
                month: Schema.optionalKey(Schema.Int),
                second: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "cycle_anchor_config_param" }),
          ),
          billing_mode: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                flexible: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      proration_discounts: Schema.optionalKey(
                        Schema.Literals(["included", "itemized"]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "flexible_params" }),
                ),
                type: Schema.Literals(["classic", "flexible"]),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "billing_mode" }),
          ),
          default_tax_rates: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
          ),
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
            ).annotate({ title: "invoice_settings_params" }),
          ),
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          on_behalf_of: Schema.optionalKey(Schema.String),
          pending_invoice_item_interval: Schema.optionalKey(
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
            ).annotate({ title: "pending_invoice_item_interval_params" }),
          ),
          proration_behavior: Schema.optionalKey(
            Schema.Literals(["create_prorations", "none"]),
          ),
          transfer_data: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount_percent: Schema.optionalKey(Schema.Finite),
                destination: Schema.String,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "transfer_data_specs" }),
          ),
          trial_end: Schema.optionalKey(
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
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
          "A subset of parameters to be passed to subscription creation for Checkout Sessions in `subscription` mode.",
      }),
    ),
    success_url: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The URL to which Stripe should send customers when payment or setup\nis complete.\nThis parameter is not allowed if ui_mode is `embedded_page` or `elements`. If you'd like to use\ninformation from the successful Checkout Session on your page, read the\nguide on [customizing your success page](https://docs.stripe.com/payments/checkout/custom-success-page).",
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
    ui_mode: Schema.optionalKey(
      Schema.Literals([
        "elements",
        "embedded_page",
        "form",
        "hosted_page",
      ]).annotate({
        description: "The UI mode of the Session. Defaults to `hosted_page`.",
      }),
    ),
    wallet_options: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          link: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                display: Schema.optionalKey(Schema.Literals(["auto", "never"])),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "wallet_options_param" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "wallet_options_param",
        description: "Wallet-specific configuration.",
      }),
    ),
  }),
  StripeCheckoutSessionResourceSchema,
);
