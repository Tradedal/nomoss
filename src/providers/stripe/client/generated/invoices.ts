// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_invoice,
  Stripeerror,
  Stripeline_item,
} from "./models/common.js";
import { Stripeinvoice } from "./models/invoices.js";

export type GetInvoicesInput = {
  readonly collection_method?: "charge_automatically" | "send_invoice";
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
  readonly due_date?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: "draft" | "open" | "paid" | "uncollectible" | "void";
  readonly subscription?: string;
};
export type GetInvoicesOutput = {
  readonly data: ReadonlyArray<Stripeinvoice>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetInvoicesError = Stripeerror;
export type PostInvoicesInput = {
  readonly account_tax_ids?: ReadonlyArray<string> | "";
  readonly application_fee_amount?: number;
  readonly auto_advance?: boolean;
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly automatically_finalizes_at?: number;
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly currency?: string;
  readonly custom_fields?:
    | ReadonlyArray<
        { readonly name: string; readonly value: string } & {
          readonly [x: string]: Schema.Json;
        }
      >
    | "";
  readonly customer?: string;
  readonly customer_account?: string;
  readonly days_until_due?: number;
  readonly default_payment_method?: string;
  readonly default_source?: string;
  readonly default_tax_rates?: ReadonlyArray<string>;
  readonly description?: string;
  readonly discounts?:
    | ReadonlyArray<
        {
          readonly coupon?: string;
          readonly discount?: string;
          readonly promotion_code?: string;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly due_date?: number;
  readonly effective_at?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly footer?: string;
  readonly from_invoice?: {
    readonly action: "revision";
    readonly invoice: string;
  } & { readonly [x: string]: Schema.Json };
  readonly issuer?: {
    readonly account?: string;
    readonly type: "account" | "self";
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly number?: string;
  readonly on_behalf_of?: string;
  readonly payment_settings?: {
    readonly default_mandate?: string | "";
    readonly payment_method_options?: {
      readonly acss_debit?:
        | ({
            readonly mandate_options?: {
              readonly transaction_type?: "business" | "personal";
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly bancontact?:
        | ({ readonly preferred_language?: "de" | "en" | "fr" | "nl" } & {
            readonly [x: string]: Schema.Json;
          })
        | "";
      readonly billie?:
        | ({
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
      readonly blik?: { readonly [x: string]: Schema.Json } | "";
      readonly card?:
        | ({
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
            readonly request_three_d_secure?: "any" | "automatic" | "challenge";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly customer_balance?:
        | ({
            readonly bank_transfer?: {
              readonly eu_bank_transfer?: { readonly country: string } & {
                readonly [x: string]: Schema.Json;
              };
              readonly type?: string;
            } & { readonly [x: string]: Schema.Json };
            readonly funding_type?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly konbini?: { readonly [x: string]: Schema.Json } | "";
      readonly payto?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
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
                | "utility";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly pix?:
        | ({
            readonly amount_includes_iof?: "always" | "never";
            readonly expires_after_seconds?: number;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly sepa_debit?: { readonly [x: string]: Schema.Json } | "";
      readonly upi?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_type?: "fixed" | "maximum";
              readonly description?: string;
              readonly end_date?: number;
            } & { readonly [x: string]: Schema.Json };
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
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
    } & { readonly [x: string]: Schema.Json };
    readonly payment_method_types?:
      | ReadonlyArray<
          | "ach_credit_transfer"
          | "ach_debit"
          | "acss_debit"
          | "affirm"
          | "alipay"
          | "amazon_pay"
          | "au_becs_debit"
          | "bacs_debit"
          | "bancontact"
          | "billie"
          | "blik"
          | "boleto"
          | "card"
          | "cashapp"
          | "crypto"
          | "custom"
          | "customer_balance"
          | "eps"
          | "fpx"
          | "giropay"
          | "grabpay"
          | "ideal"
          | "jp_credit_transfer"
          | "kakao_pay"
          | "klarna"
          | "konbini"
          | "kr_card"
          | "link"
          | "mb_way"
          | "multibanco"
          | "naver_pay"
          | "nz_bank_account"
          | "p24"
          | "pay_by_bank"
          | "payco"
          | "paynow"
          | "paypal"
          | "payto"
          | "pix"
          | "promptpay"
          | "revolut_pay"
          | "satispay"
          | "sepa_credit_transfer"
          | "sepa_debit"
          | "sequra"
          | "sofort"
          | "swish"
          | "twint"
          | "upi"
          | "us_bank_account"
          | "wechat_pay"
        >
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly pending_invoice_items_behavior?: "exclude" | "include";
  readonly rendering?: {
    readonly amount_tax_display?: "" | "exclude_tax" | "include_inclusive_tax";
    readonly pdf?: { readonly page_size?: "a4" | "auto" | "letter" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly template?: string;
    readonly template_version?: number | "";
  } & { readonly [x: string]: Schema.Json };
  readonly shipping_cost?: {
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
  } & { readonly [x: string]: Schema.Json };
  readonly shipping_details?: {
    readonly address: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly name: string;
    readonly phone?: string | "";
  } & { readonly [x: string]: Schema.Json };
  readonly statement_descriptor?: string;
  readonly subscription?: string;
  readonly transfer_data?: {
    readonly amount?: number;
    readonly destination: string;
  } & { readonly [x: string]: Schema.Json };
};
export type PostInvoicesOutput = Stripeinvoice;
export type PostInvoicesError = Stripeerror;
export type PostInvoicesCreatePreviewInput = {
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly currency?: string;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly customer_details?: {
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
    readonly shipping?:
      | ({
          readonly address: {
            readonly city?: string;
            readonly country?: string;
            readonly line1?: string;
            readonly line2?: string;
            readonly postal_code?: string;
            readonly state?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly name: string;
          readonly phone?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly tax?: { readonly ip_address?: string | "" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly tax_exempt?: "" | "exempt" | "none" | "reverse";
    readonly tax_ids?: ReadonlyArray<
      {
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
          | "us_ein"
          | "uy_ruc"
          | "uz_tin"
          | "uz_vat"
          | "ve_rif"
          | "vn_tin"
          | "za_vat"
          | "zm_tin"
          | "zw_tin";
        readonly value: string;
      } & { readonly [x: string]: Schema.Json }
    >;
  } & { readonly [x: string]: Schema.Json };
  readonly discounts?:
    | ReadonlyArray<
        {
          readonly coupon?: string;
          readonly discount?: string;
          readonly promotion_code?: string;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly invoice_items?: ReadonlyArray<
    {
      readonly amount?: number;
      readonly currency?: string;
      readonly description?: string;
      readonly discountable?: boolean;
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly invoiceitem?: string;
      readonly metadata?: { readonly [x: string]: string } | "";
      readonly period?: { readonly end: number; readonly start: number } & {
        readonly [x: string]: Schema.Json;
      };
      readonly price?: string;
      readonly price_data?: {
        readonly currency: string;
        readonly product: string;
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
        readonly unit_amount?: number;
        readonly unit_amount_decimal?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly quantity?: number;
      readonly quantity_decimal?: string;
      readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
      readonly tax_code?: string | "";
      readonly tax_rates?: ReadonlyArray<string> | "";
      readonly unit_amount?: number;
      readonly unit_amount_decimal?: string;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly issuer?: {
    readonly account?: string;
    readonly type: "account" | "self";
  } & { readonly [x: string]: Schema.Json };
  readonly on_behalf_of?: string | "";
  readonly preview_mode?: "next" | "recurring";
  readonly schedule?: string;
  readonly schedule_details?: {
    readonly billing_mode?: {
      readonly flexible?: {
        readonly proration_discounts?: "included" | "itemized";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "classic" | "flexible";
    } & { readonly [x: string]: Schema.Json };
    readonly end_behavior?: "cancel" | "release";
    readonly pause_schedules?:
      | ReadonlyArray<
          {
            readonly key?: string;
            readonly pause?: {
              readonly pause_at?: {
                readonly timestamp?: number;
                readonly type: "now" | "timestamp";
              } & { readonly [x: string]: Schema.Json };
              readonly settings?: {
                readonly bill_for?: {
                  readonly outstanding_usage_through?: {
                    readonly type?: "none" | "pause_at";
                  } & { readonly [x: string]: Schema.Json };
                  readonly unused_time_from?: {
                    readonly type?:
                      | "item_current_period_start"
                      | "none"
                      | "pause_at";
                  } & { readonly [x: string]: Schema.Json };
                } & { readonly [x: string]: Schema.Json };
                readonly invoicing_behavior?:
                  | "invoice"
                  | "pending_invoice_item";
                readonly type?: "subscription";
              } & { readonly [x: string]: Schema.Json };
            } & { readonly [x: string]: Schema.Json };
            readonly resume?:
              | ({
                  readonly resume_at?: {
                    readonly duration?: {
                      readonly interval: "day" | "month" | "week" | "year";
                      readonly interval_count?: number;
                    } & { readonly [x: string]: Schema.Json };
                    readonly timestamp?: number;
                    readonly type: "duration" | "now" | "timestamp";
                  } & { readonly [x: string]: Schema.Json };
                  readonly settings?: {
                    readonly billing_cycle_anchor?: "resume_at" | "unchanged";
                    readonly payment_behavior?:
                      | "resume_on_payment_attempt"
                      | "resume_on_payment_success";
                    readonly proration_behavior?:
                      | "always_invoice"
                      | "create_prorations"
                      | "none";
                  } & { readonly [x: string]: Schema.Json };
                } & { readonly [x: string]: Schema.Json })
              | "";
          } & { readonly [x: string]: Schema.Json }
        >
      | "";
    readonly phases?: ReadonlyArray<
      {
        readonly add_invoice_items?: ReadonlyArray<
          {
            readonly discountable?: boolean;
            readonly discounts?: ReadonlyArray<
              {
                readonly coupon?: string;
                readonly discount?: string;
                readonly promotion_code?: string;
              } & { readonly [x: string]: Schema.Json }
            >;
            readonly metadata?: { readonly [x: string]: string };
            readonly period?: {
              readonly end: {
                readonly timestamp?: number;
                readonly type:
                  | "min_item_period_end"
                  | "phase_end"
                  | "timestamp";
              } & { readonly [x: string]: Schema.Json };
              readonly start: {
                readonly timestamp?: number;
                readonly type:
                  | "max_item_period_start"
                  | "phase_start"
                  | "timestamp";
              } & { readonly [x: string]: Schema.Json };
            } & { readonly [x: string]: Schema.Json };
            readonly price?: string;
            readonly price_data?: {
              readonly currency: string;
              readonly product: string;
              readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
              readonly unit_amount?: number;
              readonly unit_amount_decimal?: string;
            } & { readonly [x: string]: Schema.Json };
            readonly quantity?: number;
            readonly tax_rates?: ReadonlyArray<string> | "";
          } & { readonly [x: string]: Schema.Json }
        >;
        readonly application_fee_percent?: number;
        readonly automatic_tax?: {
          readonly enabled: boolean;
          readonly liability?: {
            readonly account?: string;
            readonly type: "account" | "self";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly billing_cycle_anchor?: "automatic" | "phase_start";
        readonly billing_thresholds?:
          | ({
              readonly amount_gte?: number;
              readonly reset_billing_cycle_anchor?: boolean;
            } & { readonly [x: string]: Schema.Json })
          | "";
        readonly collection_method?: "charge_automatically" | "send_invoice";
        readonly default_payment_method?: string;
        readonly default_tax_rates?: ReadonlyArray<string> | "";
        readonly description?: string | "";
        readonly discounts?:
          | ReadonlyArray<
              {
                readonly coupon?: string;
                readonly discount?: string;
                readonly promotion_code?: string;
              } & { readonly [x: string]: Schema.Json }
            >
          | "";
        readonly duration?: {
          readonly interval: "day" | "month" | "week" | "year";
          readonly interval_count?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly end_date?: number | "now";
        readonly invoice_settings?: {
          readonly account_tax_ids?: ReadonlyArray<string> | "";
          readonly days_until_due?: number;
          readonly issuer?: {
            readonly account?: string;
            readonly type: "account" | "self";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly items: ReadonlyArray<
          {
            readonly billing_thresholds?:
              | ({ readonly usage_gte: number } & {
                  readonly [x: string]: Schema.Json;
                })
              | "";
            readonly discounts?:
              | ReadonlyArray<
                  {
                    readonly coupon?: string;
                    readonly discount?: string;
                    readonly promotion_code?: string;
                  } & { readonly [x: string]: Schema.Json }
                >
              | "";
            readonly metadata?: { readonly [x: string]: string };
            readonly price?: string;
            readonly price_data?: {
              readonly currency: string;
              readonly product: string;
              readonly recurring: {
                readonly interval: "day" | "month" | "week" | "year";
                readonly interval_count?: number;
              } & { readonly [x: string]: Schema.Json };
              readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
              readonly unit_amount?: number;
              readonly unit_amount_decimal?: string;
            } & { readonly [x: string]: Schema.Json };
            readonly quantity?: number;
            readonly tax_rates?: ReadonlyArray<string> | "";
          } & { readonly [x: string]: Schema.Json }
        >;
        readonly metadata?: { readonly [x: string]: string };
        readonly on_behalf_of?: string;
        readonly proration_behavior?:
          | "always_invoice"
          | "create_prorations"
          | "none";
        readonly start_date?: number | "now";
        readonly transfer_data?: {
          readonly amount_percent?: number;
          readonly destination: string;
        } & { readonly [x: string]: Schema.Json };
        readonly trial?: boolean;
        readonly trial_end?: number | "now";
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly proration_behavior?:
      | "always_invoice"
      | "create_prorations"
      | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly subscription?: string;
  readonly subscription_details?: {
    readonly billing_cycle_anchor?: {
      readonly timestamp?: number;
      readonly type: "now" | "timestamp" | "unchanged";
    } & { readonly [x: string]: Schema.Json };
    readonly billing_mode?: {
      readonly flexible?: {
        readonly proration_discounts?: "included" | "itemized";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "classic" | "flexible";
    } & { readonly [x: string]: Schema.Json };
    readonly billing_schedules?:
      | ReadonlyArray<
          {
            readonly applies_to?: ReadonlyArray<
              { readonly price?: string; readonly type: "price" } & {
                readonly [x: string]: Schema.Json;
              }
            >;
            readonly bill_until?: {
              readonly duration?: {
                readonly interval: "day" | "month" | "week" | "year";
                readonly interval_count?: number;
              } & { readonly [x: string]: Schema.Json };
              readonly timestamp?: number;
              readonly type: "duration" | "timestamp";
            } & { readonly [x: string]: Schema.Json };
            readonly key?: string;
          } & { readonly [x: string]: Schema.Json }
        >
      | "";
    readonly cancel_at?:
      | number
      | ""
      | "max_billed_until"
      | "max_period_end"
      | "min_period_end";
    readonly cancel_at_period_end?: boolean;
    readonly cancel_now?: boolean;
    readonly default_tax_rates?: ReadonlyArray<string> | "";
    readonly items?: ReadonlyArray<
      {
        readonly billing_thresholds?:
          | ({ readonly usage_gte: number } & {
              readonly [x: string]: Schema.Json;
            })
          | "";
        readonly clear_usage?: boolean;
        readonly current_trial?: { readonly trial_offer: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly deleted?: boolean;
        readonly discounts?:
          | ReadonlyArray<
              {
                readonly coupon?: string;
                readonly discount?: string;
                readonly promotion_code?: string;
              } & { readonly [x: string]: Schema.Json }
            >
          | "";
        readonly id?: string;
        readonly metadata?: { readonly [x: string]: string } | "";
        readonly price?: string;
        readonly price_data?: {
          readonly currency: string;
          readonly product: string;
          readonly recurring: {
            readonly interval: "day" | "month" | "week" | "year";
            readonly interval_count?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
          readonly unit_amount?: number;
          readonly unit_amount_decimal?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly quantity?: number;
        readonly tax_rates?: ReadonlyArray<string> | "";
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly metadata?: { readonly [x: string]: string } | "";
    readonly pause?: {
      readonly bill_for?: {
        readonly outstanding_usage_through?: {
          readonly type: "none" | "now";
        } & { readonly [x: string]: Schema.Json };
        readonly unused_time_from?: {
          readonly type: "item_current_period_start" | "none" | "now";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly invoicing_behavior?: "invoice" | "pending_invoice_item";
      readonly type?: "subscription";
    } & { readonly [x: string]: Schema.Json };
    readonly proration_behavior?:
      | "always_invoice"
      | "create_prorations"
      | "none";
    readonly proration_date?: number;
    readonly resume_at?: "now";
    readonly start_date?: number;
    readonly trial_end?: "now" | number;
  } & { readonly [x: string]: Schema.Json };
};
export type PostInvoicesCreatePreviewOutput = Stripeinvoice;
export type PostInvoicesCreatePreviewError = Stripeerror;
export type GetInvoicesSearchInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly page?: string;
  readonly query: string;
};
export type GetInvoicesSearchOutput = {
  readonly data: ReadonlyArray<Stripeinvoice>;
  readonly has_more: boolean;
  readonly next_page?: string | null;
  readonly object: "search_result";
  readonly total_count?: number;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetInvoicesSearchError = Stripeerror;
export type GetInvoicesInvoiceInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
};
export type GetInvoicesInvoiceOutput = Stripeinvoice;
export type GetInvoicesInvoiceError = Stripeerror;
export type PostInvoicesInvoiceInput = {
  readonly account_tax_ids?: ReadonlyArray<string> | "";
  readonly application_fee_amount?: number;
  readonly auto_advance?: boolean;
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly automatically_finalizes_at?: number;
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly custom_fields?:
    | ReadonlyArray<
        { readonly name: string; readonly value: string } & {
          readonly [x: string]: Schema.Json;
        }
      >
    | "";
  readonly days_until_due?: number;
  readonly default_payment_method?: string;
  readonly default_source?: string | "";
  readonly default_tax_rates?: ReadonlyArray<string> | "";
  readonly description?: string;
  readonly discounts?:
    | ReadonlyArray<
        {
          readonly coupon?: string;
          readonly discount?: string;
          readonly promotion_code?: string;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly due_date?: number;
  readonly effective_at?: number | "";
  readonly expand?: ReadonlyArray<string>;
  readonly footer?: string;
  readonly issuer?: {
    readonly account?: string;
    readonly type: "account" | "self";
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly number?: string | "";
  readonly on_behalf_of?: string | "";
  readonly payment_settings?: {
    readonly default_mandate?: string | "";
    readonly payment_method_options?: {
      readonly acss_debit?:
        | ({
            readonly mandate_options?: {
              readonly transaction_type?: "business" | "personal";
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly bancontact?:
        | ({ readonly preferred_language?: "de" | "en" | "fr" | "nl" } & {
            readonly [x: string]: Schema.Json;
          })
        | "";
      readonly billie?:
        | ({
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
      readonly blik?: { readonly [x: string]: Schema.Json } | "";
      readonly card?:
        | ({
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
            readonly request_three_d_secure?: "any" | "automatic" | "challenge";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly customer_balance?:
        | ({
            readonly bank_transfer?: {
              readonly eu_bank_transfer?: { readonly country: string } & {
                readonly [x: string]: Schema.Json;
              };
              readonly type?: string;
            } & { readonly [x: string]: Schema.Json };
            readonly funding_type?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly konbini?: { readonly [x: string]: Schema.Json } | "";
      readonly payto?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
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
                | "utility";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly pix?:
        | ({
            readonly amount_includes_iof?: "always" | "never";
            readonly expires_after_seconds?: number;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly sepa_debit?: { readonly [x: string]: Schema.Json } | "";
      readonly upi?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_type?: "fixed" | "maximum";
              readonly description?: string;
              readonly end_date?: number;
            } & { readonly [x: string]: Schema.Json };
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
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
    } & { readonly [x: string]: Schema.Json };
    readonly payment_method_types?:
      | ReadonlyArray<
          | "ach_credit_transfer"
          | "ach_debit"
          | "acss_debit"
          | "affirm"
          | "alipay"
          | "amazon_pay"
          | "au_becs_debit"
          | "bacs_debit"
          | "bancontact"
          | "billie"
          | "blik"
          | "boleto"
          | "card"
          | "cashapp"
          | "crypto"
          | "custom"
          | "customer_balance"
          | "eps"
          | "fpx"
          | "giropay"
          | "grabpay"
          | "ideal"
          | "jp_credit_transfer"
          | "kakao_pay"
          | "klarna"
          | "konbini"
          | "kr_card"
          | "link"
          | "mb_way"
          | "multibanco"
          | "naver_pay"
          | "nz_bank_account"
          | "p24"
          | "pay_by_bank"
          | "payco"
          | "paynow"
          | "paypal"
          | "payto"
          | "pix"
          | "promptpay"
          | "revolut_pay"
          | "satispay"
          | "sepa_credit_transfer"
          | "sepa_debit"
          | "sequra"
          | "sofort"
          | "swish"
          | "twint"
          | "upi"
          | "us_bank_account"
          | "wechat_pay"
        >
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly rendering?: {
    readonly amount_tax_display?: "" | "exclude_tax" | "include_inclusive_tax";
    readonly pdf?: { readonly page_size?: "a4" | "auto" | "letter" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly template?: string;
    readonly template_version?: number | "";
  } & { readonly [x: string]: Schema.Json };
  readonly shipping_cost?:
    | ({
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
                readonly tax_behavior?:
                  | "exclusive"
                  | "inclusive"
                  | "unspecified";
              } & { readonly [x: string]: Schema.Json };
            };
          } & { readonly [x: string]: Schema.Json };
          readonly metadata?: { readonly [x: string]: string };
          readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
          readonly tax_code?: string;
          readonly type?: "fixed_amount";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly shipping_details?:
    | ({
        readonly address: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly name: string;
        readonly phone?: string | "";
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly statement_descriptor?: string;
  readonly transfer_data?:
    | ({ readonly amount?: number; readonly destination: string } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly invoice: string;
};
export type PostInvoicesInvoiceOutput = Stripeinvoice;
export type PostInvoicesInvoiceError = Stripeerror;
export type DeleteInvoicesInvoiceInput = { readonly invoice: string };
export type DeleteInvoicesInvoiceOutput = Stripedeleted_invoice;
export type DeleteInvoicesInvoiceError = Stripeerror;
export type PostInvoicesInvoiceAddLinesInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice_metadata?: { readonly [x: string]: string } | "";
  readonly lines: ReadonlyArray<
    {
      readonly amount?: number;
      readonly description?: string;
      readonly discountable?: boolean;
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly invoice_item?: string;
      readonly metadata?: { readonly [x: string]: string } | "";
      readonly period?: { readonly end: number; readonly start: number } & {
        readonly [x: string]: Schema.Json;
      };
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
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
        readonly unit_amount?: number;
        readonly unit_amount_decimal?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly pricing?: { readonly price?: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly quantity?: number;
      readonly quantity_decimal?: string;
      readonly tax_amounts?:
        | ReadonlyArray<
            {
              readonly amount: number;
              readonly tax_rate_data: {
                readonly country?: string;
                readonly description?: string;
                readonly display_name: string;
                readonly inclusive: boolean;
                readonly jurisdiction?: string;
                readonly jurisdiction_level?:
                  | "city"
                  | "country"
                  | "county"
                  | "district"
                  | "multiple"
                  | "state";
                readonly percentage: number;
                readonly state?: string;
                readonly tax_type?:
                  | "admissions_tax"
                  | "amusement_tax"
                  | "attendance_tax"
                  | "communications_tax"
                  | "digital_excise_tax"
                  | "entertainment_tax"
                  | "get_fund"
                  | "gross_receipts_tax"
                  | "gst"
                  | "hospitality_tax"
                  | "hst"
                  | "igst"
                  | "jct"
                  | "lease_tax"
                  | "luxury_tax"
                  | "mass_transit_parking_tax"
                  | "nhil"
                  | "parking_tax"
                  | "pst"
                  | "qst"
                  | "resort_tax"
                  | "retail_delivery_fee"
                  | "rst"
                  | "sales_tax"
                  | "service_tax"
                  | "tourism_tax"
                  | "utility_users_tax"
                  | "vat";
              } & { readonly [x: string]: Schema.Json };
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
                | "zero_rated";
              readonly taxable_amount: number;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly tax_rates?: ReadonlyArray<string> | "";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly invoice: string;
};
export type PostInvoicesInvoiceAddLinesOutput = Stripeinvoice;
export type PostInvoicesInvoiceAddLinesError = Stripeerror;
export type PostInvoicesInvoiceAttachPaymentInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payment_intent?: string;
  readonly payment_record?: string;
  readonly invoice: string;
};
export type PostInvoicesInvoiceAttachPaymentOutput = Stripeinvoice;
export type PostInvoicesInvoiceAttachPaymentError = Stripeerror;
export type PostInvoicesInvoiceFinalizeInput = {
  readonly auto_advance?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
};
export type PostInvoicesInvoiceFinalizeOutput = Stripeinvoice;
export type PostInvoicesInvoiceFinalizeError = Stripeerror;
export type GetInvoicesInvoiceLinesInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetInvoicesInvoiceLinesOutput = {
  readonly data: ReadonlyArray<Stripeline_item>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetInvoicesInvoiceLinesError = Stripeerror;
export type PostInvoicesInvoiceLinesLineItemIdInput = {
  readonly amount?: number;
  readonly description?: string;
  readonly discountable?: boolean;
  readonly discounts?:
    | ReadonlyArray<
        {
          readonly coupon?: string;
          readonly discount?: string;
          readonly promotion_code?: string;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly period?: { readonly end: number; readonly start: number } & {
    readonly [x: string]: Schema.Json;
  };
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
    readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
    readonly unit_amount?: number;
    readonly unit_amount_decimal?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly pricing?: { readonly price?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly quantity?: number;
  readonly quantity_decimal?: string;
  readonly tax_amounts?:
    | ReadonlyArray<
        {
          readonly amount: number;
          readonly tax_rate_data: {
            readonly country?: string;
            readonly description?: string;
            readonly display_name: string;
            readonly inclusive: boolean;
            readonly jurisdiction?: string;
            readonly jurisdiction_level?:
              | "city"
              | "country"
              | "county"
              | "district"
              | "multiple"
              | "state";
            readonly percentage: number;
            readonly state?: string;
            readonly tax_type?:
              | "admissions_tax"
              | "amusement_tax"
              | "attendance_tax"
              | "communications_tax"
              | "digital_excise_tax"
              | "entertainment_tax"
              | "get_fund"
              | "gross_receipts_tax"
              | "gst"
              | "hospitality_tax"
              | "hst"
              | "igst"
              | "jct"
              | "lease_tax"
              | "luxury_tax"
              | "mass_transit_parking_tax"
              | "nhil"
              | "parking_tax"
              | "pst"
              | "qst"
              | "resort_tax"
              | "retail_delivery_fee"
              | "rst"
              | "sales_tax"
              | "service_tax"
              | "tourism_tax"
              | "utility_users_tax"
              | "vat";
          } & { readonly [x: string]: Schema.Json };
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
            | "zero_rated";
          readonly taxable_amount: number;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly tax_rates?: ReadonlyArray<string> | "";
  readonly invoice: string;
  readonly line_item_id: string;
};
export type PostInvoicesInvoiceLinesLineItemIdOutput = Stripeline_item;
export type PostInvoicesInvoiceLinesLineItemIdError = Stripeerror;
export type PostInvoicesInvoiceMarkUncollectibleInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
};
export type PostInvoicesInvoiceMarkUncollectibleOutput = Stripeinvoice;
export type PostInvoicesInvoiceMarkUncollectibleError = Stripeerror;
export type PostInvoicesInvoicePayInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly forgive?: boolean;
  readonly mandate?: string | "";
  readonly off_session?: boolean;
  readonly paid_out_of_band?: boolean;
  readonly payment_method?: string;
  readonly source?: string;
  readonly invoice: string;
};
export type PostInvoicesInvoicePayOutput = Stripeinvoice;
export type PostInvoicesInvoicePayError = Stripeerror;
export type PostInvoicesInvoiceRemoveLinesInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice_metadata?: { readonly [x: string]: string } | "";
  readonly lines: ReadonlyArray<
    { readonly behavior: "delete" | "unassign"; readonly id: string } & {
      readonly [x: string]: Schema.Json;
    }
  >;
  readonly invoice: string;
};
export type PostInvoicesInvoiceRemoveLinesOutput = Stripeinvoice;
export type PostInvoicesInvoiceRemoveLinesError = Stripeerror;
export type PostInvoicesInvoiceSendInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
};
export type PostInvoicesInvoiceSendOutput = Stripeinvoice;
export type PostInvoicesInvoiceSendError = Stripeerror;
export type PostInvoicesInvoiceUpdateLinesInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice_metadata?: { readonly [x: string]: string } | "";
  readonly lines: ReadonlyArray<
    {
      readonly amount?: number;
      readonly description?: string;
      readonly discountable?: boolean;
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly id: string;
      readonly metadata?: { readonly [x: string]: string } | "";
      readonly period?: { readonly end: number; readonly start: number } & {
        readonly [x: string]: Schema.Json;
      };
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
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
        readonly unit_amount?: number;
        readonly unit_amount_decimal?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly pricing?: { readonly price?: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly quantity?: number;
      readonly quantity_decimal?: string;
      readonly tax_amounts?:
        | ReadonlyArray<
            {
              readonly amount: number;
              readonly tax_rate_data: {
                readonly country?: string;
                readonly description?: string;
                readonly display_name: string;
                readonly inclusive: boolean;
                readonly jurisdiction?: string;
                readonly jurisdiction_level?:
                  | "city"
                  | "country"
                  | "county"
                  | "district"
                  | "multiple"
                  | "state";
                readonly percentage: number;
                readonly state?: string;
                readonly tax_type?:
                  | "admissions_tax"
                  | "amusement_tax"
                  | "attendance_tax"
                  | "communications_tax"
                  | "digital_excise_tax"
                  | "entertainment_tax"
                  | "get_fund"
                  | "gross_receipts_tax"
                  | "gst"
                  | "hospitality_tax"
                  | "hst"
                  | "igst"
                  | "jct"
                  | "lease_tax"
                  | "luxury_tax"
                  | "mass_transit_parking_tax"
                  | "nhil"
                  | "parking_tax"
                  | "pst"
                  | "qst"
                  | "resort_tax"
                  | "retail_delivery_fee"
                  | "rst"
                  | "sales_tax"
                  | "service_tax"
                  | "tourism_tax"
                  | "utility_users_tax"
                  | "vat";
              } & { readonly [x: string]: Schema.Json };
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
                | "zero_rated";
              readonly taxable_amount: number;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly tax_rates?: ReadonlyArray<string> | "";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly invoice: string;
};
export type PostInvoicesInvoiceUpdateLinesOutput = Stripeinvoice;
export type PostInvoicesInvoiceUpdateLinesError = Stripeerror;
export type PostInvoicesInvoiceVoidInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
};
export type PostInvoicesInvoiceVoidOutput = Stripeinvoice;
export type PostInvoicesInvoiceVoidError = Stripeerror;

export const GetInvoicesInput = Schema.Struct({
  collection_method: Schema.optionalKey(
    Schema.Literals(["charge_automatically", "send_invoice"]),
  ),
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
  due_date: Schema.optionalKey(
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
  status: Schema.optionalKey(
    Schema.Literals(["draft", "open", "paid", "uncollectible", "void"]),
  ),
  subscription: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetInvoicesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeinvoice),
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
          new globalThis.RegExp("^\\/v1\\/invoices", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/invoices",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "InvoicesResourceList", description: "" });
export const GetInvoicesError = Stripeerror;
export const PostInvoicesInput = Schema.Struct({
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
    ]).annotate({
      description:
        "The account tax IDs associated with the invoice. Only editable when the invoice is a draft.",
    }),
  ),
  application_fee_amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A fee in cents (or local equivalent) that will be applied to the invoice and transferred to the application owner's Stripe account. The request must be made with an OAuth key or the Stripe-Account header in order to take an application fee. For more information, see the application fees [documentation](https://docs.stripe.com/billing/invoices/connect#collecting-fees).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  auto_advance: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Controls whether Stripe performs [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection) of the invoice. If `false`, the invoice's state doesn't automatically advance without an explicit action. Defaults to false.",
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
      title: "automatic_tax_param",
      description: "Settings for automatic tax lookup for this invoice.",
    }),
  ),
  automatically_finalizes_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The time when this invoice should be scheduled to finalize (up to 5 years in the future). The invoice is finalized at this time if it's still in draft state.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  collection_method: Schema.optionalKey(
    Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
      description:
        "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this invoice using the default source attached to the customer. When sending an invoice, Stripe will email this invoice to the customer with payment instructions. Defaults to `charge_automatically`.",
    }),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The currency to create this invoice in. Defaults to that of `customer` if not specified.",
      format: "currency",
    }),
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
    ]).annotate({
      description:
        "A list of up to 4 custom fields to be displayed on the invoice.",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of the customer to bill.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of the account to bill.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  days_until_due: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of days from when the invoice is created until it is due. Valid only for invoices where `collection_method=send_invoice`.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  default_payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the default payment method for the invoice. It must belong to the customer associated with the invoice. If not set, defaults to the subscription's default payment method, if any, or to the default payment method in the customer's invoice settings.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  default_source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the default payment source for the invoice. It must belong to the customer associated with the invoice and be in a chargeable state. If not set, defaults to the subscription's default source, if any, or to the customer's default source.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  default_tax_rates: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "The tax rates that will apply to any line item that does not have `tax_rates` set.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users. Referenced as 'memo' in the Dashboard.",
    }).check(
      Schema.isMaxCodePoints(1500).annotate({
        expected: "a string with at most 1500 code points",
      }),
    ),
  ),
  discounts: Schema.optionalKey(
    Schema.Union([
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
            discount: Schema.optionalKey(
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
        ).annotate({ title: "discounts_data_param" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The coupons and promotion codes to redeem into discounts for the invoice. If not specified, inherits the discount from the invoice's customer. Pass an empty string to avoid inheriting any discounts.",
    }),
  ),
  due_date: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The date on which payment for this invoice is due. Valid only for invoices where `collection_method=send_invoice`.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  effective_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The date when this invoice is in effect. Same as `finalized_at` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the invoice PDF and receipt.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
  footer: Schema.optionalKey(
    Schema.String.annotate({
      description: "Footer to be displayed on the invoice.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  from_invoice: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        action: Schema.Literal("revision"),
        invoice: Schema.String.check(
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
      title: "from_invoice",
      description:
        "Revise an existing invoice. The new invoice will be created in `status=draft`. See the [revision documentation](https://docs.stripe.com/invoicing/invoice-revisions) for more details.",
    }),
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
    ).annotate({
      title: "param",
      description:
        "The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.",
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
  number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Set the number for this invoice. If no number is present then a number will be assigned automatically when the invoice is finalized. In many markets, regulations require invoices to be unique, sequential and / or gapless. You are responsible for ensuring this is true across all your different invoicing systems in the event that you edit the invoice number using our API. If you use only Stripe for your invoices and do not change invoice numbers, Stripe handles this aspect of compliance for you automatically.",
    }).check(
      Schema.isMaxCodePoints(26).annotate({
        expected: "a string with at most 26 code points",
      }),
    ),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The account (if any) for which the funds of the invoice payment are intended. If set, the invoice will be presented with the branding and support information of the specified account. See the [Invoices with Connect](https://docs.stripe.com/billing/invoices/connect) documentation for details.",
    }),
  ),
  payment_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        default_mandate: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
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
                      verification_method: Schema.optionalKey(
                        Schema.Literals([
                          "automatic",
                          "instant",
                          "microdeposits",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              billie: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
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
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      country: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      line1: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      line2: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      postal_code: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      state: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
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
                                    title: "registered_address_param",
                                  }),
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              blik: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              card: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
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
                      request_three_d_secure: Schema.optionalKey(
                        Schema.Literals(["any", "automatic", "challenge"]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                              ).annotate({ title: "eu_bank_transfer_param" }),
                            ),
                            type: Schema.optionalKey(Schema.String),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "bank_transfer_param" }),
                      ),
                      funding_type: Schema.optionalKey(Schema.String),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              konbini: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                            amount: Schema.optionalKey(Schema.Int),
                            purpose: Schema.optionalKey(
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
                              ]),
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              sepa_debit: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                                  expected:
                                    "a string with at most 20 code points",
                                }),
                              ),
                            ),
                            end_date: Schema.optionalKey(
                              Schema.Number.annotate({
                                format: "unix-time",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
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
                            "invoice_payment_method_options_mandate_options_param",
                        }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                                title:
                                  "invoice_linked_account_options_filters_param",
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
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({
                          title: "invoice_linked_account_options_param",
                        }),
                      ),
                      verification_method: Schema.optionalKey(
                        Schema.Literals([
                          "automatic",
                          "instant",
                          "microdeposits",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
          ).annotate({ title: "payment_method_options" }),
        ),
        payment_method_types: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "ach_credit_transfer",
                "ach_debit",
                "acss_debit",
                "affirm",
                "alipay",
                "amazon_pay",
                "au_becs_debit",
                "bacs_debit",
                "bancontact",
                "billie",
                "blik",
                "boleto",
                "card",
                "cashapp",
                "crypto",
                "custom",
                "customer_balance",
                "eps",
                "fpx",
                "giropay",
                "grabpay",
                "ideal",
                "jp_credit_transfer",
                "kakao_pay",
                "klarna",
                "konbini",
                "kr_card",
                "link",
                "mb_way",
                "multibanco",
                "naver_pay",
                "nz_bank_account",
                "p24",
                "pay_by_bank",
                "payco",
                "paynow",
                "paypal",
                "payto",
                "pix",
                "promptpay",
                "revolut_pay",
                "satispay",
                "sepa_credit_transfer",
                "sepa_debit",
                "sequra",
                "sofort",
                "swish",
                "twint",
                "upi",
                "us_bank_account",
                "wechat_pay",
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
    ).annotate({
      title: "payment_settings",
      description:
        "Configuration settings for the PaymentIntent that is generated when the invoice is finalized.",
    }),
  ),
  pending_invoice_items_behavior: Schema.optionalKey(
    Schema.Literals(["exclude", "include"]).annotate({
      description:
        "How to handle pending invoice items on invoice creation. Defaults to `exclude` if the parameter is omitted.",
    }),
  ),
  rendering: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        amount_tax_display: Schema.optionalKey(
          Schema.Literals(["", "exclude_tax", "include_inclusive_tax"]),
        ),
        pdf: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              page_size: Schema.optionalKey(
                Schema.Literals(["a4", "auto", "letter"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "rendering_pdf_param" }),
        ),
        template: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        template_version: Schema.optionalKey(
          Schema.Union([Schema.Int, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "rendering_param",
      description:
        "The rendering-related settings that control how invoices render in customer-facing interfaces such as the PDF or hosted invoice page.",
    }),
  ),
  shipping_cost: Schema.optionalKey(
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                    currency: Schema.String.annotate({ format: "currency" }),
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
                              Schema.Json.annotate({ expected: "JSON value" }),
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
    ).annotate({
      title: "shipping_cost",
      description: "Settings for the cost of shipping for this invoice.",
    }),
  ),
  shipping_details: Schema.optionalKey(
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
        name: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "recipient_shipping_with_optional_fields_address",
      description:
        "Shipping details for the invoice. The Invoice PDF will use the `shipping_details` value if it is set, otherwise the PDF will render the shipping address from the customer.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Extra information about a charge for the customer's credit card statement. It must contain at least one letter. If not specified and this invoice is part of a subscription, the default `statement_descriptor` will be set to the first subscription item's product's `statement_descriptor`.",
    }).check(
      Schema.isMaxCodePoints(22).annotate({
        expected: "a string with at most 22 code points",
      }),
    ),
  ),
  subscription: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the subscription to invoice, if any. If set, the created invoice will only include pending invoice items for that subscription. The subscription's billing cycle and regular subscription events won't be affected.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
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
    ).annotate({
      title: "transfer_data_specs",
      description:
        "If specified, the funds from the invoice will be transferred to the destination and the ID of the resulting transfer will be found on the invoice's charge.",
    }),
  ),
});
export const PostInvoicesOutput = Stripeinvoice;
export const PostInvoicesError = Stripeerror;
export const PostInvoicesCreatePreviewInput = Schema.Struct({
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
      title: "automatic_tax_param",
      description:
        "Settings for automatic tax lookup for this invoice preview.",
    }),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The currency to preview this invoice in. Defaults to that of `customer` if not specified.",
      format: "currency",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the customer whose upcoming invoice you're retrieving. If `automatic_tax` is enabled then one of `customer`, `customer_details`, `subscription`, or `schedule` must be set.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the account representing the customer whose upcoming invoice you're retrieving. If `automatic_tax` is enabled then one of `customer`, `customer_account`, `customer_details`, `subscription`, or `schedule` must be set.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_details: Schema.optionalKey(
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
            ).annotate({ title: "optional_fields_address" }),
            Schema.Literal(""),
          ]),
        ),
        shipping: Schema.optionalKey(
          Schema.Union([
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
                ).annotate({ title: "optional_fields_customer_address" }),
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
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "customer_shipping" }),
            Schema.Literal(""),
          ]),
        ),
        tax: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              ip_address: Schema.optionalKey(
                Schema.Union([Schema.String, Schema.Literal("")]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "tax_param" }),
        ),
        tax_exempt: Schema.optionalKey(
          Schema.Literals(["", "exempt", "none", "reverse"]),
        ),
        tax_ids: Schema.optionalKey(
          Schema.Array(
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
                  "us_ein",
                  "uy_ruc",
                  "uz_tin",
                  "uz_vat",
                  "ve_rif",
                  "vn_tin",
                  "za_vat",
                  "zm_tin",
                  "zw_tin",
                ]),
                value: Schema.String,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "data_params" }),
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
      title: "customer_details_param",
      description:
        "Details about the customer you want to invoice or overrides for an existing customer. If `automatic_tax` is enabled then one of `customer`, `customer_details`, `subscription`, or `schedule` must be set.",
    }),
  ),
  discounts: Schema.optionalKey(
    Schema.Union([
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
            discount: Schema.optionalKey(
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
        ).annotate({ title: "discounts_data_param" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The coupons to redeem into discounts for the invoice preview. If not specified, inherits the discount from the subscription or customer. This works for both coupons directly applied to an invoice and coupons applied to a subscription. Pass an empty string to avoid inheriting any discounts.",
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
  invoice_items: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Int),
          currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
          description: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          discountable: Schema.optionalKey(Schema.Boolean),
          discounts: Schema.optionalKey(
            Schema.Union([
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
                    discount: Schema.optionalKey(
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
                ).annotate({ title: "discounts_data_param" }),
              ),
              Schema.Literal(""),
            ]),
          ),
          invoiceitem: Schema.optionalKey(
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
          period: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                end: Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
                start: Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "period" }),
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
                product: Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
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
            ).annotate({ title: "one_time_price_data" }),
          ),
          quantity: Schema.optionalKey(Schema.Int),
          quantity_decimal: Schema.optionalKey(
            Schema.String.annotate({ format: "decimal" }),
          ),
          tax_behavior: Schema.optionalKey(
            Schema.Literals(["exclusive", "inclusive", "unspecified"]),
          ),
          tax_code: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
          tax_rates: Schema.optionalKey(
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
      ).annotate({ title: "invoice_item_preview_params" }),
    ).annotate({
      description:
        "List of invoice items to add or update in the upcoming invoice preview (up to 250).",
    }),
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
    ).annotate({
      title: "param",
      description:
        "The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.",
    }),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.Union([Schema.String, Schema.Literal("")]).annotate({
      description:
        "The account (if any) for which the funds of the invoice payment are intended. If set, the invoice will be presented with the branding and support information of the specified account. See the [Invoices with Connect](https://docs.stripe.com/billing/invoices/connect) documentation for details.",
    }),
  ),
  preview_mode: Schema.optionalKey(
    Schema.Literals(["next", "recurring"]).annotate({
      description:
        "Customizes the types of values to include when calculating the invoice. Defaults to `next` if unspecified.",
    }),
  ),
  schedule: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the schedule whose upcoming invoice you'd like to retrieve. Cannot be used with subscription or subscription fields.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  schedule_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
        end_behavior: Schema.optionalKey(
          Schema.Literals(["cancel", "release"]),
        ),
        pause_schedules: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  key: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(40).annotate({
                        expected: "a string with at most 40 code points",
                      }),
                    ),
                  ),
                  pause: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        pause_at: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              timestamp: Schema.optionalKey(
                                Schema.Number.annotate({
                                  format: "unix-time",
                                }).check(
                                  Schema.isInt().annotate({
                                    expected: "an integer",
                                  }),
                                ),
                              ),
                              type: Schema.Literals(["now", "timestamp"]),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "pause_at_params" }),
                        ),
                        settings: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              bill_for: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    outstanding_usage_through:
                                      Schema.optionalKey(
                                        Schema.StructWithRest(
                                          Schema.Struct({
                                            type: Schema.optionalKey(
                                              Schema.Literals([
                                                "none",
                                                "pause_at",
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
                                        ).annotate({
                                          title:
                                            "pause_settings_bill_for_outstanding_usage_through_params",
                                        }),
                                      ),
                                    unused_time_from: Schema.optionalKey(
                                      Schema.StructWithRest(
                                        Schema.Struct({
                                          type: Schema.optionalKey(
                                            Schema.Literals([
                                              "item_current_period_start",
                                              "none",
                                              "pause_at",
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
                                      ).annotate({
                                        title:
                                          "pause_settings_bill_for_unused_time_from_params",
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
                                  title: "pause_settings_bill_for_params",
                                }),
                              ),
                              invoicing_behavior: Schema.optionalKey(
                                Schema.Literals([
                                  "invoice",
                                  "pending_invoice_item",
                                ]),
                              ),
                              type: Schema.optionalKey(
                                Schema.Literal("subscription"),
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
                          ).annotate({ title: "pause_settings_params" }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "pause_schedule_update_pause_params" }),
                  ),
                  resume: Schema.optionalKey(
                    Schema.Union([
                      Schema.StructWithRest(
                        Schema.Struct({
                          resume_at: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                duration: Schema.optionalKey(
                                  Schema.StructWithRest(
                                    Schema.Struct({
                                      interval: Schema.Literals([
                                        "day",
                                        "month",
                                        "week",
                                        "year",
                                      ]),
                                      interval_count: Schema.optionalKey(
                                        Schema.Int,
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
                                    title: "resume_at_duration_params",
                                  }),
                                ),
                                timestamp: Schema.optionalKey(
                                  Schema.Number.annotate({
                                    format: "unix-time",
                                  }).check(
                                    Schema.isInt().annotate({
                                      expected: "an integer",
                                    }),
                                  ),
                                ),
                                type: Schema.Literals([
                                  "duration",
                                  "now",
                                  "timestamp",
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
                            ).annotate({ title: "resume_at_params" }),
                          ),
                          settings: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                billing_cycle_anchor: Schema.optionalKey(
                                  Schema.Literals(["resume_at", "unchanged"]),
                                ),
                                payment_behavior: Schema.optionalKey(
                                  Schema.Literals([
                                    "resume_on_payment_attempt",
                                    "resume_on_payment_success",
                                  ]),
                                ),
                                proration_behavior: Schema.optionalKey(
                                  Schema.Literals([
                                    "always_invoice",
                                    "create_prorations",
                                    "none",
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
                            ).annotate({ title: "resume_settings_params" }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        title: "pause_schedule_update_resume_params",
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
              ).annotate({ title: "pause_schedules_update_params" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        phases: Schema.optionalKey(
          Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                add_invoice_items: Schema.optionalKey(
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        discountable: Schema.optionalKey(Schema.Boolean),
                        discounts: Schema.optionalKey(
                          Schema.Array(
                            Schema.StructWithRest(
                              Schema.Struct({
                                coupon: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                discount: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                promotion_code: Schema.optionalKey(
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
                            ).annotate({ title: "discounts_data_param" }),
                          ),
                        ),
                        metadata: Schema.optionalKey(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                        period: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              end: Schema.StructWithRest(
                                Schema.Struct({
                                  timestamp: Schema.optionalKey(
                                    Schema.Number.annotate({
                                      format: "unix-time",
                                    }).check(
                                      Schema.isInt().annotate({
                                        expected: "an integer",
                                      }),
                                    ),
                                  ),
                                  type: Schema.Literals([
                                    "min_item_period_end",
                                    "phase_end",
                                    "timestamp",
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
                              ).annotate({ title: "invoice_item_period_end" }),
                              start: Schema.StructWithRest(
                                Schema.Struct({
                                  timestamp: Schema.optionalKey(
                                    Schema.Number.annotate({
                                      format: "unix-time",
                                    }).check(
                                      Schema.isInt().annotate({
                                        expected: "an integer",
                                      }),
                                    ),
                                  ),
                                  type: Schema.Literals([
                                    "max_item_period_start",
                                    "phase_start",
                                    "timestamp",
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
                              ).annotate({
                                title: "invoice_item_period_start",
                              }),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "invoice_item_period" }),
                        ),
                        price: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        price_data: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              currency: Schema.String.annotate({
                                format: "currency",
                              }),
                              product: Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                              tax_behavior: Schema.optionalKey(
                                Schema.Literals([
                                  "exclusive",
                                  "inclusive",
                                  "unspecified",
                                ]),
                              ),
                              unit_amount: Schema.optionalKey(Schema.Int),
                              unit_amount_decimal: Schema.optionalKey(
                                Schema.String.annotate({ format: "decimal" }),
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
                            title: "one_time_price_data_with_negative_amounts",
                          }),
                        ),
                        quantity: Schema.optionalKey(Schema.Int),
                        tax_rates: Schema.optionalKey(
                          Schema.Union([
                            Schema.Array(
                              Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
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
                    ).annotate({ title: "add_invoice_item_entry" }),
                  ),
                ),
                application_fee_percent: Schema.optionalKey(Schema.Finite),
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
                  ).annotate({ title: "automatic_tax_config" }),
                ),
                billing_cycle_anchor: Schema.optionalKey(
                  Schema.Literals(["automatic", "phase_start"]),
                ),
                billing_thresholds: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        amount_gte: Schema.optionalKey(Schema.Int),
                        reset_billing_cycle_anchor: Schema.optionalKey(
                          Schema.Boolean,
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "billing_thresholds_param" }),
                    Schema.Literal(""),
                  ]),
                ),
                collection_method: Schema.optionalKey(
                  Schema.Literals(["charge_automatically", "send_invoice"]),
                ),
                default_payment_method: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                default_tax_rates: Schema.optionalKey(
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
                description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                discounts: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          coupon: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          discount: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          promotion_code: Schema.optionalKey(
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
                      ).annotate({ title: "schedule_discounts_data_param" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                duration: Schema.optionalKey(
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
                  ).annotate({ title: "duration_params" }),
                ),
                end_date: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal("now"),
                  ]),
                ),
                invoice_settings: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      account_tax_ids: Schema.optionalKey(
                        Schema.Union([
                          Schema.Array(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          Schema.Literal(""),
                        ]),
                      ),
                      days_until_due: Schema.optionalKey(Schema.Int),
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
                  ).annotate({ title: "invoice_settings" }),
                ),
                items: Schema.Array(
                  Schema.StructWithRest(
                    Schema.Struct({
                      billing_thresholds: Schema.optionalKey(
                        Schema.Union([
                          Schema.StructWithRest(
                            Schema.Struct({ usage_gte: Schema.Int }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({
                            title: "item_billing_thresholds_param",
                          }),
                          Schema.Literal(""),
                        ]),
                      ),
                      discounts: Schema.optionalKey(
                        Schema.Union([
                          Schema.Array(
                            Schema.StructWithRest(
                              Schema.Struct({
                                coupon: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                discount: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                promotion_code: Schema.optionalKey(
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
                            ).annotate({
                              title: "schedule_discounts_data_param",
                            }),
                          ),
                          Schema.Literal(""),
                        ]),
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
                            currency: Schema.String.annotate({
                              format: "currency",
                            }),
                            product: Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                            recurring: Schema.StructWithRest(
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
                                  Schema.Json.annotate({
                                    expected: "JSON value",
                                  }),
                                ),
                              ],
                            ).annotate({ title: "recurring_adhoc" }),
                            tax_behavior: Schema.optionalKey(
                              Schema.Literals([
                                "exclusive",
                                "inclusive",
                                "unspecified",
                              ]),
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
                        ).annotate({ title: "recurring_price_data" }),
                      ),
                      quantity: Schema.optionalKey(Schema.Int),
                      tax_rates: Schema.optionalKey(
                        Schema.Union([
                          Schema.Array(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
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
                  ).annotate({ title: "configuration_item_params" }),
                ),
                metadata: Schema.optionalKey(
                  Schema.Record(Schema.String, Schema.String),
                ),
                on_behalf_of: Schema.optionalKey(Schema.String),
                proration_behavior: Schema.optionalKey(
                  Schema.Literals([
                    "always_invoice",
                    "create_prorations",
                    "none",
                  ]),
                ),
                start_date: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal("now"),
                  ]),
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
                trial: Schema.optionalKey(Schema.Boolean),
                trial_end: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal("now"),
                  ]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "phase_configuration_params" }),
          ),
        ),
        proration_behavior: Schema.optionalKey(
          Schema.Literals(["always_invoice", "create_prorations", "none"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "schedule_details_params",
      description:
        "The schedule creation or modification params to apply as a preview. Cannot be used with `subscription` or `subscription_` prefixed fields.",
    }),
  ),
  subscription: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the subscription for which you'd like to retrieve the upcoming invoice. If not provided, but a `subscription_details.items` is provided, you will preview creating a subscription with those items. If neither `subscription` nor `subscription_details.items` is provided, you will retrieve the next upcoming invoice from among the customer's subscriptions.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  subscription_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        billing_cycle_anchor: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              timestamp: Schema.optionalKey(
                Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              ),
              type: Schema.Literals(["now", "timestamp", "unchanged"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "billing_cycle_anchor_param" }),
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
        billing_schedules: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  applies_to: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          price: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          type: Schema.Literal("price"),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "billing_schedules_applies_to" }),
                    ),
                  ),
                  bill_until: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        duration: Schema.optionalKey(
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({
                            title: "billing_schedules_bill_until_duration",
                          }),
                        ),
                        timestamp: Schema.optionalKey(
                          Schema.Number.annotate({ format: "unix-time" }).check(
                            Schema.isInt().annotate({ expected: "an integer" }),
                          ),
                        ),
                        type: Schema.Literals(["duration", "timestamp"]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "billing_schedules_bill_until" }),
                  ),
                  key: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(200).annotate({
                        expected: "a string with at most 200 code points",
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
              ).annotate({ title: "billing_schedules_update_params" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        cancel_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
            Schema.Literal(""),
            Schema.Literals([
              "max_billed_until",
              "max_period_end",
              "min_period_end",
            ]),
          ]),
        ),
        cancel_at_period_end: Schema.optionalKey(Schema.Boolean),
        cancel_now: Schema.optionalKey(Schema.Boolean),
        default_tax_rates: Schema.optionalKey(
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
        items: Schema.optionalKey(
          Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                billing_thresholds: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({ usage_gte: Schema.Int }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "item_billing_thresholds_param" }),
                    Schema.Literal(""),
                  ]),
                ),
                clear_usage: Schema.optionalKey(Schema.Boolean),
                current_trial: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      trial_offer: Schema.String.check(
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
                  ).annotate({ title: "current_trial_param" }),
                ),
                deleted: Schema.optionalKey(Schema.Boolean),
                discounts: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          coupon: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          discount: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          promotion_code: Schema.optionalKey(
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
                      ).annotate({ title: "discounts_data_param" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                id: Schema.optionalKey(
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
                      product: Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                      recurring: Schema.StructWithRest(
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
                      tax_behavior: Schema.optionalKey(
                        Schema.Literals([
                          "exclusive",
                          "inclusive",
                          "unspecified",
                        ]),
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
                  ).annotate({ title: "recurring_price_data" }),
                ),
                quantity: Schema.optionalKey(Schema.Int),
                tax_rates: Schema.optionalKey(
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
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "subscription_item_update_params" }),
          ),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(Schema.String, Schema.String),
            Schema.Literal(""),
          ]),
        ),
        pause: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bill_for: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    outstanding_usage_through: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          type: Schema.Literals(["none", "now"]),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "outstanding_usage_through_param" }),
                    ),
                    unused_time_from: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          type: Schema.Literals([
                            "item_current_period_start",
                            "none",
                            "now",
                          ]),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "unused_time_from_param" }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "bill_for_param" }),
              ),
              invoicing_behavior: Schema.optionalKey(
                Schema.Literals(["invoice", "pending_invoice_item"]),
              ),
              type: Schema.optionalKey(Schema.Literal("subscription")),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "subscription_details_pause_params" }),
        ),
        proration_behavior: Schema.optionalKey(
          Schema.Literals(["always_invoice", "create_prorations", "none"]),
        ),
        proration_date: Schema.optionalKey(
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
        ),
        resume_at: Schema.optionalKey(Schema.Literal("now")),
        start_date: Schema.optionalKey(
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
        ),
        trial_end: Schema.optionalKey(
          Schema.Union([
            Schema.Literal("now"),
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "subscription_details_params",
      description:
        "The subscription creation or modification params to apply as a preview. Cannot be used with `schedule` or `schedule_details` fields.",
    }),
  ),
});
export const PostInvoicesCreatePreviewOutput = Stripeinvoice;
export const PostInvoicesCreatePreviewError = Stripeerror;
export const GetInvoicesSearchInput = Schema.Struct({
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
  page: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  query: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetInvoicesSearchOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeinvoice),
    has_more: Schema.Boolean,
    next_page: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("search_result").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    total_count: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The total number of objects that match the query, only accurate up to 10,000.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    url: Schema.String.check(
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
).annotate({ title: "SearchResult", description: "" });
export const GetInvoicesSearchError = Stripeerror;
export const GetInvoicesInvoiceInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetInvoicesInvoiceOutput = Stripeinvoice;
export const GetInvoicesInvoiceError = Stripeerror;
export const PostInvoicesInvoiceInput = Schema.Struct({
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
    ]).annotate({
      description:
        "The account tax IDs associated with the invoice. Only editable when the invoice is a draft.",
    }),
  ),
  application_fee_amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A fee in cents (or local equivalent) that will be applied to the invoice and transferred to the application owner's Stripe account. The request must be made with an OAuth key or the Stripe-Account header in order to take an application fee. For more information, see the application fees [documentation](https://docs.stripe.com/billing/invoices/connect#collecting-fees).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  auto_advance: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Controls whether Stripe performs [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection) of the invoice.",
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
      title: "automatic_tax_param",
      description: "Settings for automatic tax lookup for this invoice.",
    }),
  ),
  automatically_finalizes_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The time when this invoice should be scheduled to finalize (up to 5 years in the future). The invoice is finalized at this time if it's still in draft state. To turn off automatic finalization, set `auto_advance` to false.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  collection_method: Schema.optionalKey(
    Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
      description:
        "Either `charge_automatically` or `send_invoice`. This field can be updated only on `draft` invoices.",
    }),
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
    ]).annotate({
      description:
        "A list of up to 4 custom fields to be displayed on the invoice. If a value for `custom_fields` is specified, the list specified will replace the existing custom field list on this invoice. Pass an empty string to remove previously-defined fields.",
    }),
  ),
  days_until_due: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of days from which the invoice is created until it is due. Only valid for invoices where `collection_method=send_invoice`. This field can only be updated on `draft` invoices.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  default_payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the default payment method for the invoice. It must belong to the customer associated with the invoice. If not set, defaults to the subscription's default payment method, if any, or to the default payment method in the customer's invoice settings.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  default_source: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "ID of the default payment source for the invoice. It must belong to the customer associated with the invoice and be in a chargeable state. If not set, defaults to the subscription's default source, if any, or to the customer's default source.",
    }),
  ),
  default_tax_rates: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The tax rates that will apply to any line item that does not have `tax_rates` set. Pass an empty string to remove previously-defined tax rates.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users. Referenced as 'memo' in the Dashboard.",
    }).check(
      Schema.isMaxCodePoints(1500).annotate({
        expected: "a string with at most 1500 code points",
      }),
    ),
  ),
  discounts: Schema.optionalKey(
    Schema.Union([
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
            discount: Schema.optionalKey(
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
        ).annotate({ title: "discounts_data_param" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The discounts that will apply to the invoice. Pass an empty string to remove previously-defined discounts.",
    }),
  ),
  due_date: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The date on which payment for this invoice is due. Only valid for invoices where `collection_method=send_invoice`. This field can only be updated on `draft` invoices.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  effective_at: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The date when this invoice is in effect. Same as `finalized_at` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the invoice PDF and receipt.",
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
  footer: Schema.optionalKey(
    Schema.String.annotate({
      description: "Footer to be displayed on the invoice.",
    }).check(
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
    ).annotate({
      title: "param",
      description:
        "The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.",
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
  number: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(26).annotate({
          expected: "a string with at most 26 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set the number for this invoice. If no number is present then a number will be assigned automatically when the invoice is finalized. In many markets, regulations require invoices to be unique, sequential and / or gapless. You are responsible for ensuring this is true across all your different invoicing systems in the event that you edit the invoice number using our API. If you use only Stripe for your invoices and do not change invoice numbers, Stripe handles this aspect of compliance for you automatically.",
    }),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.Union([Schema.String, Schema.Literal("")]).annotate({
      description:
        "The account (if any) for which the funds of the invoice payment are intended. If set, the invoice will be presented with the branding and support information of the specified account. See the [Invoices with Connect](https://docs.stripe.com/billing/invoices/connect) documentation for details.",
    }),
  ),
  payment_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        default_mandate: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
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
                      verification_method: Schema.optionalKey(
                        Schema.Literals([
                          "automatic",
                          "instant",
                          "microdeposits",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              billie: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
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
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      country: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      line1: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      line2: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      postal_code: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                      ),
                                      state: Schema.optionalKey(
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
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
                                    title: "registered_address_param",
                                  }),
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              blik: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              card: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
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
                      request_three_d_secure: Schema.optionalKey(
                        Schema.Literals(["any", "automatic", "challenge"]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                              ).annotate({ title: "eu_bank_transfer_param" }),
                            ),
                            type: Schema.optionalKey(Schema.String),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "bank_transfer_param" }),
                      ),
                      funding_type: Schema.optionalKey(Schema.String),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              konbini: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                            amount: Schema.optionalKey(Schema.Int),
                            purpose: Schema.optionalKey(
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
                              ]),
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
                  Schema.Literal(""),
                ]),
              ),
              sepa_debit: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                                  expected:
                                    "a string with at most 20 code points",
                                }),
                              ),
                            ),
                            end_date: Schema.optionalKey(
                              Schema.Number.annotate({
                                format: "unix-time",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
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
                            "invoice_payment_method_options_mandate_options_param",
                        }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
                                title:
                                  "invoice_linked_account_options_filters_param",
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
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({
                          title: "invoice_linked_account_options_param",
                        }),
                      ),
                      verification_method: Schema.optionalKey(
                        Schema.Literals([
                          "automatic",
                          "instant",
                          "microdeposits",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_payment_method_options_param" }),
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
          ).annotate({ title: "payment_method_options" }),
        ),
        payment_method_types: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "ach_credit_transfer",
                "ach_debit",
                "acss_debit",
                "affirm",
                "alipay",
                "amazon_pay",
                "au_becs_debit",
                "bacs_debit",
                "bancontact",
                "billie",
                "blik",
                "boleto",
                "card",
                "cashapp",
                "crypto",
                "custom",
                "customer_balance",
                "eps",
                "fpx",
                "giropay",
                "grabpay",
                "ideal",
                "jp_credit_transfer",
                "kakao_pay",
                "klarna",
                "konbini",
                "kr_card",
                "link",
                "mb_way",
                "multibanco",
                "naver_pay",
                "nz_bank_account",
                "p24",
                "pay_by_bank",
                "payco",
                "paynow",
                "paypal",
                "payto",
                "pix",
                "promptpay",
                "revolut_pay",
                "satispay",
                "sepa_credit_transfer",
                "sepa_debit",
                "sequra",
                "sofort",
                "swish",
                "twint",
                "upi",
                "us_bank_account",
                "wechat_pay",
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
    ).annotate({
      title: "payment_settings",
      description:
        "Configuration settings for the PaymentIntent that is generated when the invoice is finalized.",
    }),
  ),
  rendering: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        amount_tax_display: Schema.optionalKey(
          Schema.Literals(["", "exclude_tax", "include_inclusive_tax"]),
        ),
        pdf: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              page_size: Schema.optionalKey(
                Schema.Literals(["a4", "auto", "letter"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "rendering_pdf_param" }),
        ),
        template: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        template_version: Schema.optionalKey(
          Schema.Union([Schema.Int, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "rendering_param",
      description:
        "The rendering-related settings that control how invoices render in customer-facing interfaces such as the PDF or hosted invoice page.",
    }),
  ),
  shipping_cost: Schema.optionalKey(
    Schema.Union([
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
                              Schema.Json.annotate({ expected: "JSON value" }),
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
                              Schema.Json.annotate({ expected: "JSON value" }),
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
                      currency: Schema.String.annotate({ format: "currency" }),
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
      ).annotate({ title: "shipping_cost" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Settings for the cost of shipping for this invoice.",
    }),
  ),
  shipping_details: Schema.optionalKey(
    Schema.Union([
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
          name: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
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
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "recipient_shipping_with_optional_fields_address" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Shipping details for the invoice. The Invoice PDF will use the `shipping_details` value if it is set, otherwise the PDF will render the shipping address from the customer.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Extra information about a charge for the customer's credit card statement. It must contain at least one letter. If not specified and this invoice is part of a subscription, the default `statement_descriptor` will be set to the first subscription item's product's `statement_descriptor`.",
    }).check(
      Schema.isMaxCodePoints(22).annotate({
        expected: "a string with at most 22 code points",
      }),
    ),
  ),
  transfer_data: Schema.optionalKey(
    Schema.Union([
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
      ).annotate({ title: "transfer_data_specs" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "If specified, the funds from the invoice will be transferred to the destination and the ID of the resulting transfer will be found on the invoice's charge. This will be unset if you POST an empty value.",
    }),
  ),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceOutput = Stripeinvoice;
export const PostInvoicesInvoiceError = Stripeerror;
export const DeleteInvoicesInvoiceInput = Schema.Struct({
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteInvoicesInvoiceOutput = Stripedeleted_invoice;
export const DeleteInvoicesInvoiceError = Stripeerror;
export const PostInvoicesInvoiceAddLinesInput = Schema.Struct({
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
  invoice_metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  lines: Schema.Array(
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
        discountable: Schema.optionalKey(Schema.Boolean),
        discounts: Schema.optionalKey(
          Schema.Union([
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
                  discount: Schema.optionalKey(
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
              ).annotate({ title: "discounts_data_param" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        invoice_item: Schema.optionalKey(
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
        period: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              end: Schema.Number.annotate({ format: "unix-time" }).check(
                Schema.isInt().annotate({ expected: "an integer" }),
              ),
              start: Schema.Number.annotate({ format: "unix-time" }).check(
                Schema.isInt().annotate({ expected: "an integer" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "period" }),
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
          ).annotate({ title: "one_time_price_data_with_product_data" }),
        ),
        pricing: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              price: Schema.optionalKey(
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
          ).annotate({ title: "pricing_param" }),
        ),
        quantity: Schema.optionalKey(Schema.Int),
        quantity_decimal: Schema.optionalKey(
          Schema.String.annotate({ format: "decimal" }),
        ),
        tax_amounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  amount: Schema.Int,
                  tax_rate_data: Schema.StructWithRest(
                    Schema.Struct({
                      country: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      description: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      display_name: Schema.String.check(
                        Schema.isMaxCodePoints(200).annotate({
                          expected: "a string with at most 200 code points",
                        }),
                      ),
                      inclusive: Schema.Boolean,
                      jurisdiction: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      jurisdiction_level: Schema.optionalKey(
                        Schema.Literals([
                          "city",
                          "country",
                          "county",
                          "district",
                          "multiple",
                          "state",
                        ]),
                      ),
                      percentage: Schema.Finite,
                      state: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      tax_type: Schema.optionalKey(
                        Schema.Literals([
                          "admissions_tax",
                          "amusement_tax",
                          "attendance_tax",
                          "communications_tax",
                          "digital_excise_tax",
                          "entertainment_tax",
                          "get_fund",
                          "gross_receipts_tax",
                          "gst",
                          "hospitality_tax",
                          "hst",
                          "igst",
                          "jct",
                          "lease_tax",
                          "luxury_tax",
                          "mass_transit_parking_tax",
                          "nhil",
                          "parking_tax",
                          "pst",
                          "qst",
                          "resort_tax",
                          "retail_delivery_fee",
                          "rst",
                          "sales_tax",
                          "service_tax",
                          "tourism_tax",
                          "utility_users_tax",
                          "vat",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "tax_rate_data_param" }),
                  taxability_reason: Schema.optionalKey(
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
                    ]),
                  ),
                  taxable_amount: Schema.Int,
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "tax_amount_param" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        tax_rates: Schema.optionalKey(
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "lines_data_param" }),
  ).annotate({ description: "The line items to add." }),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceAddLinesOutput = Stripeinvoice;
export const PostInvoicesInvoiceAddLinesError = Stripeerror;
export const PostInvoicesInvoiceAttachPaymentInput = Schema.Struct({
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
  payment_intent: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of the PaymentIntent to attach to the invoice.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  payment_record: Schema.optionalKey(
    Schema.String.annotate({
      description: "The ID of the PaymentRecord to attach to the invoice.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceAttachPaymentOutput = Stripeinvoice;
export const PostInvoicesInvoiceAttachPaymentError = Stripeerror;
export const PostInvoicesInvoiceFinalizeInput = Schema.Struct({
  auto_advance: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Controls whether Stripe performs [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection) of the invoice. If `false`, the invoice's state doesn't automatically advance without an explicit action.",
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
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceFinalizeOutput = Stripeinvoice;
export const PostInvoicesInvoiceFinalizeError = Stripeerror;
export const GetInvoicesInvoiceLinesInput = Schema.Struct({
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
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
export const GetInvoicesInvoiceLinesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeline_item).annotate({
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
).annotate({ title: "InvoiceLinesList", description: "" });
export const GetInvoicesInvoiceLinesError = Stripeerror;
export const PostInvoicesInvoiceLinesLineItemIdInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The integer amount in cents (or local equivalent) of the charge to be applied to the upcoming invoice. If you want to apply a credit to the customer's account, pass a negative amount.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string which you can attach to the invoice item. The description is displayed in the invoice for easy tracking.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  discountable: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Controls whether discounts apply to this line item. Defaults to false for prorations or negative line items, and true for all other line items. Cannot be set to true for prorations.",
    }),
  ),
  discounts: Schema.optionalKey(
    Schema.Union([
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
            discount: Schema.optionalKey(
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
        ).annotate({ title: "discounts_data_param" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The coupons, promotion codes & existing discounts which apply to the line item. Item discounts are applied before invoice discounts. Pass an empty string to remove previously-defined discounts.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`. For [type=subscription](/api/invoices/line_item) line items, the incoming metadata specified on the request is directly used to set this value, in contrast to [type=invoiceitem](/api/invoices/line_item) line items, where any existing metadata on the invoice line is merged with the incoming data.",
    }),
  ),
  period: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        end: Schema.Number.annotate({ format: "unix-time" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        start: Schema.Number.annotate({ format: "unix-time" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "period",
      description:
        "The period associated with this invoice item. When set to different values, the period will be rendered on the invoice. If you have [Stripe Revenue Recognition](https://docs.stripe.com/revenue-recognition) enabled, the period will be used to recognize and defer revenue. See the [Revenue Recognition documentation](https://docs.stripe.com/revenue-recognition/methodology/subscriptions-and-invoicing) for details.",
    }),
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
                          expected: "a string with at most 5000 code points",
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
    ).annotate({
      title: "one_time_price_data_with_product_data",
      description:
        "Data used to generate a new [Price](https://docs.stripe.com/api/prices) object inline.",
    }),
  ),
  pricing: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        price: Schema.optionalKey(
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
      title: "pricing_param",
      description: "The pricing information for the invoice item.",
    }),
  ),
  quantity: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Non-negative integer. The quantity of units for the line item. Use `quantity_decimal` instead to provide decimal precision. This field will be deprecated in favor of `quantity_decimal` in a future version.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  quantity_decimal: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Non-negative decimal with at most 12 decimal places. The quantity of units for the line item.",
      format: "decimal",
    }),
  ),
  tax_amounts: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            amount: Schema.Int,
            tax_rate_data: Schema.StructWithRest(
              Schema.Struct({
                country: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                description: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                display_name: Schema.String.check(
                  Schema.isMaxCodePoints(200).annotate({
                    expected: "a string with at most 200 code points",
                  }),
                ),
                inclusive: Schema.Boolean,
                jurisdiction: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
                    }),
                  ),
                ),
                jurisdiction_level: Schema.optionalKey(
                  Schema.Literals([
                    "city",
                    "country",
                    "county",
                    "district",
                    "multiple",
                    "state",
                  ]),
                ),
                percentage: Schema.Finite,
                state: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                tax_type: Schema.optionalKey(
                  Schema.Literals([
                    "admissions_tax",
                    "amusement_tax",
                    "attendance_tax",
                    "communications_tax",
                    "digital_excise_tax",
                    "entertainment_tax",
                    "get_fund",
                    "gross_receipts_tax",
                    "gst",
                    "hospitality_tax",
                    "hst",
                    "igst",
                    "jct",
                    "lease_tax",
                    "luxury_tax",
                    "mass_transit_parking_tax",
                    "nhil",
                    "parking_tax",
                    "pst",
                    "qst",
                    "resort_tax",
                    "retail_delivery_fee",
                    "rst",
                    "sales_tax",
                    "service_tax",
                    "tourism_tax",
                    "utility_users_tax",
                    "vat",
                  ]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "tax_rate_data_param" }),
            taxability_reason: Schema.optionalKey(
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
              ]),
            ),
            taxable_amount: Schema.Int,
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "tax_amount_param" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "A list of up to 20 tax amounts for this line item. This can be useful if you calculate taxes on your own or use a third-party to calculate them. You cannot set tax amounts if any line item has [tax_rates](https://docs.stripe.com/api/invoices/line_item#invoice_line_item_object-tax_rates) or if the invoice has [default_tax_rates](https://docs.stripe.com/api/invoices/object#invoice_object-default_tax_rates) or uses [automatic tax](https://docs.stripe.com/tax/invoicing). Pass an empty string to remove previously defined tax amounts.",
    }),
  ),
  tax_rates: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The tax rates which apply to the line item. When set, the `default_tax_rates` on the invoice do not apply to this line item. Pass an empty string to remove previously-defined tax rates.",
    }),
  ),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  line_item_id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceLinesLineItemIdOutput = Stripeline_item;
export const PostInvoicesInvoiceLinesLineItemIdError = Stripeerror;
export const PostInvoicesInvoiceMarkUncollectibleInput = Schema.Struct({
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
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceMarkUncollectibleOutput = Stripeinvoice;
export const PostInvoicesInvoiceMarkUncollectibleError = Stripeerror;
export const PostInvoicesInvoicePayInput = Schema.Struct({
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
  forgive: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "In cases where the source used to pay the invoice has insufficient funds, passing `forgive=true` controls whether a charge should be attempted for the full amount available on the source, up to the amount to fully pay the invoice. This effectively forgives the difference between the amount available on the source and the amount due. \n\nPassing `forgive=false` will fail the charge if the source hasn't been pre-funded with the right amount. An example for this case is with ACH Credit Transfers and wires: if the amount wired is less than the amount due by a small amount, you might want to forgive the difference. Defaults to `false`.",
    }),
  ),
  mandate: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "ID of the mandate to be used for this invoice. It must correspond to the payment method used to pay the invoice, including the payment_method param or the invoice's default_payment_method or default_source, if set.",
    }),
  ),
  off_session: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates if a customer is on or off-session while an invoice payment is attempted. Defaults to `true` (off-session).",
    }),
  ),
  paid_out_of_band: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean representing whether an invoice is paid outside of Stripe. This will result in no charge being made. Defaults to `false`.",
    }),
  ),
  payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A PaymentMethod to be charged. The PaymentMethod must be the ID of a PaymentMethod belonging to the customer associated with the invoice being paid.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A payment source to be charged. The source must be the ID of a source belonging to the customer associated with the invoice being paid.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoicePayOutput = Stripeinvoice;
export const PostInvoicesInvoicePayError = Stripeerror;
export const PostInvoicesInvoiceRemoveLinesInput = Schema.Struct({
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
  invoice_metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  lines: Schema.Array(
    Schema.StructWithRest(
      Schema.Struct({
        behavior: Schema.Literals(["delete", "unassign"]),
        id: Schema.String.check(
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
    ).annotate({ title: "lines_data_param" }),
  ).annotate({ description: "The line items to remove." }),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceRemoveLinesOutput = Stripeinvoice;
export const PostInvoicesInvoiceRemoveLinesError = Stripeerror;
export const PostInvoicesInvoiceSendInput = Schema.Struct({
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
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceSendOutput = Stripeinvoice;
export const PostInvoicesInvoiceSendError = Stripeerror;
export const PostInvoicesInvoiceUpdateLinesInput = Schema.Struct({
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
  invoice_metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`. For [type=subscription](https://docs.stripe.com/api/invoices/line_item#invoice_line_item_object-type) line items, the incoming metadata specified on the request is directly used to set this value, in contrast to [type=invoiceitem](api/invoices/line_item#invoice_line_item_object-type) line items, where any existing metadata on the invoice line is merged with the incoming data.",
    }),
  ),
  lines: Schema.Array(
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
        discountable: Schema.optionalKey(Schema.Boolean),
        discounts: Schema.optionalKey(
          Schema.Union([
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
                  discount: Schema.optionalKey(
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
              ).annotate({ title: "discounts_data_param" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        id: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(Schema.String, Schema.String),
            Schema.Literal(""),
          ]),
        ),
        period: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              end: Schema.Number.annotate({ format: "unix-time" }).check(
                Schema.isInt().annotate({ expected: "an integer" }),
              ),
              start: Schema.Number.annotate({ format: "unix-time" }).check(
                Schema.isInt().annotate({ expected: "an integer" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "period" }),
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
          ).annotate({ title: "one_time_price_data_with_product_data" }),
        ),
        pricing: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              price: Schema.optionalKey(
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
          ).annotate({ title: "pricing_param" }),
        ),
        quantity: Schema.optionalKey(Schema.Int),
        quantity_decimal: Schema.optionalKey(
          Schema.String.annotate({ format: "decimal" }),
        ),
        tax_amounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  amount: Schema.Int,
                  tax_rate_data: Schema.StructWithRest(
                    Schema.Struct({
                      country: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      description: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      display_name: Schema.String.check(
                        Schema.isMaxCodePoints(200).annotate({
                          expected: "a string with at most 200 code points",
                        }),
                      ),
                      inclusive: Schema.Boolean,
                      jurisdiction: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      jurisdiction_level: Schema.optionalKey(
                        Schema.Literals([
                          "city",
                          "country",
                          "county",
                          "district",
                          "multiple",
                          "state",
                        ]),
                      ),
                      percentage: Schema.Finite,
                      state: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      tax_type: Schema.optionalKey(
                        Schema.Literals([
                          "admissions_tax",
                          "amusement_tax",
                          "attendance_tax",
                          "communications_tax",
                          "digital_excise_tax",
                          "entertainment_tax",
                          "get_fund",
                          "gross_receipts_tax",
                          "gst",
                          "hospitality_tax",
                          "hst",
                          "igst",
                          "jct",
                          "lease_tax",
                          "luxury_tax",
                          "mass_transit_parking_tax",
                          "nhil",
                          "parking_tax",
                          "pst",
                          "qst",
                          "resort_tax",
                          "retail_delivery_fee",
                          "rst",
                          "sales_tax",
                          "service_tax",
                          "tourism_tax",
                          "utility_users_tax",
                          "vat",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "tax_rate_data_param" }),
                  taxability_reason: Schema.optionalKey(
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
                    ]),
                  ),
                  taxable_amount: Schema.Int,
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "tax_amount_param" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        tax_rates: Schema.optionalKey(
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "lines_data_param" }),
  ).annotate({ description: "The line items to update." }),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceUpdateLinesOutput = Stripeinvoice;
export const PostInvoicesInvoiceUpdateLinesError = Stripeerror;
export const PostInvoicesInvoiceVoidInput = Schema.Struct({
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
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoicesInvoiceVoidOutput = Stripeinvoice;
export const PostInvoicesInvoiceVoidError = Stripeerror;
/**
 * The GetInvoicesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetInvoicesOperation: StripeOperation & {
  readonly input: typeof GetInvoicesInput;
  readonly output: typeof GetInvoicesOutput;
  readonly error: typeof GetInvoicesError;
} = {
  name: "GetInvoices",
  method: "GET",
  path: "/v1/invoices",
  pathParameters: [],
  queryParameters: [
    "collection_method",
    "created",
    "customer",
    "customer_account",
    "due_date",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
    "subscription",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetInvoicesInput,
  output: GetInvoicesOutput,
  error: GetInvoicesError,
};
/**
 * The PostInvoicesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInput;
  readonly output: typeof PostInvoicesOutput;
  readonly error: typeof PostInvoicesError;
} = {
  name: "PostInvoices",
  method: "POST",
  path: "/v1/invoices",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInput,
  output: PostInvoicesOutput,
  error: PostInvoicesError,
};
/**
 * The PostInvoicesCreatePreviewOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesCreatePreviewOperation: StripeOperation & {
  readonly input: typeof PostInvoicesCreatePreviewInput;
  readonly output: typeof PostInvoicesCreatePreviewOutput;
  readonly error: typeof PostInvoicesCreatePreviewError;
} = {
  name: "PostInvoicesCreatePreview",
  method: "POST",
  path: "/v1/invoices/create_preview",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesCreatePreviewInput,
  output: PostInvoicesCreatePreviewOutput,
  error: PostInvoicesCreatePreviewError,
};
/**
 * The GetInvoicesSearchOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetInvoicesSearchOperation: StripeOperation & {
  readonly input: typeof GetInvoicesSearchInput;
  readonly output: typeof GetInvoicesSearchOutput;
  readonly error: typeof GetInvoicesSearchError;
} = {
  name: "GetInvoicesSearch",
  method: "GET",
  path: "/v1/invoices/search",
  pathParameters: [],
  queryParameters: ["expand", "limit", "page", "query"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetInvoicesSearchInput,
  output: GetInvoicesSearchOutput,
  error: GetInvoicesSearchError,
};
/**
 * The GetInvoicesInvoiceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetInvoicesInvoiceOperation: StripeOperation & {
  readonly input: typeof GetInvoicesInvoiceInput;
  readonly output: typeof GetInvoicesInvoiceOutput;
  readonly error: typeof GetInvoicesInvoiceError;
} = {
  name: "GetInvoicesInvoice",
  method: "GET",
  path: "/v1/invoices/{invoice}",
  pathParameters: ["invoice"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetInvoicesInvoiceInput,
  output: GetInvoicesInvoiceOutput,
  error: GetInvoicesInvoiceError,
};
/**
 * The PostInvoicesInvoiceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceInput;
  readonly output: typeof PostInvoicesInvoiceOutput;
  readonly error: typeof PostInvoicesInvoiceError;
} = {
  name: "PostInvoicesInvoice",
  method: "POST",
  path: "/v1/invoices/{invoice}",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceInput,
  output: PostInvoicesInvoiceOutput,
  error: PostInvoicesInvoiceError,
};
/**
 * The DeleteInvoicesInvoiceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteInvoicesInvoiceOperation: StripeOperation & {
  readonly input: typeof DeleteInvoicesInvoiceInput;
  readonly output: typeof DeleteInvoicesInvoiceOutput;
  readonly error: typeof DeleteInvoicesInvoiceError;
} = {
  name: "DeleteInvoicesInvoice",
  method: "DELETE",
  path: "/v1/invoices/{invoice}",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteInvoicesInvoiceInput,
  output: DeleteInvoicesInvoiceOutput,
  error: DeleteInvoicesInvoiceError,
};
/**
 * The PostInvoicesInvoiceAddLinesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceAddLinesOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceAddLinesInput;
  readonly output: typeof PostInvoicesInvoiceAddLinesOutput;
  readonly error: typeof PostInvoicesInvoiceAddLinesError;
} = {
  name: "PostInvoicesInvoiceAddLines",
  method: "POST",
  path: "/v1/invoices/{invoice}/add_lines",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceAddLinesInput,
  output: PostInvoicesInvoiceAddLinesOutput,
  error: PostInvoicesInvoiceAddLinesError,
};
/**
 * The PostInvoicesInvoiceAttachPaymentOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceAttachPaymentOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceAttachPaymentInput;
  readonly output: typeof PostInvoicesInvoiceAttachPaymentOutput;
  readonly error: typeof PostInvoicesInvoiceAttachPaymentError;
} = {
  name: "PostInvoicesInvoiceAttachPayment",
  method: "POST",
  path: "/v1/invoices/{invoice}/attach_payment",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceAttachPaymentInput,
  output: PostInvoicesInvoiceAttachPaymentOutput,
  error: PostInvoicesInvoiceAttachPaymentError,
};
/**
 * The PostInvoicesInvoiceFinalizeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceFinalizeOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceFinalizeInput;
  readonly output: typeof PostInvoicesInvoiceFinalizeOutput;
  readonly error: typeof PostInvoicesInvoiceFinalizeError;
} = {
  name: "PostInvoicesInvoiceFinalize",
  method: "POST",
  path: "/v1/invoices/{invoice}/finalize",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceFinalizeInput,
  output: PostInvoicesInvoiceFinalizeOutput,
  error: PostInvoicesInvoiceFinalizeError,
};
/**
 * The GetInvoicesInvoiceLinesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetInvoicesInvoiceLinesOperation: StripeOperation & {
  readonly input: typeof GetInvoicesInvoiceLinesInput;
  readonly output: typeof GetInvoicesInvoiceLinesOutput;
  readonly error: typeof GetInvoicesInvoiceLinesError;
} = {
  name: "GetInvoicesInvoiceLines",
  method: "GET",
  path: "/v1/invoices/{invoice}/lines",
  pathParameters: ["invoice"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetInvoicesInvoiceLinesInput,
  output: GetInvoicesInvoiceLinesOutput,
  error: GetInvoicesInvoiceLinesError,
};
/**
 * The PostInvoicesInvoiceLinesLineItemIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceLinesLineItemIdOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceLinesLineItemIdInput;
  readonly output: typeof PostInvoicesInvoiceLinesLineItemIdOutput;
  readonly error: typeof PostInvoicesInvoiceLinesLineItemIdError;
} = {
  name: "PostInvoicesInvoiceLinesLineItemId",
  method: "POST",
  path: "/v1/invoices/{invoice}/lines/{line_item_id}",
  pathParameters: ["invoice", "line_item_id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceLinesLineItemIdInput,
  output: PostInvoicesInvoiceLinesLineItemIdOutput,
  error: PostInvoicesInvoiceLinesLineItemIdError,
};
/**
 * The PostInvoicesInvoiceMarkUncollectibleOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceMarkUncollectibleOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceMarkUncollectibleInput;
  readonly output: typeof PostInvoicesInvoiceMarkUncollectibleOutput;
  readonly error: typeof PostInvoicesInvoiceMarkUncollectibleError;
} = {
  name: "PostInvoicesInvoiceMarkUncollectible",
  method: "POST",
  path: "/v1/invoices/{invoice}/mark_uncollectible",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceMarkUncollectibleInput,
  output: PostInvoicesInvoiceMarkUncollectibleOutput,
  error: PostInvoicesInvoiceMarkUncollectibleError,
};
/**
 * The PostInvoicesInvoicePayOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoicePayOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoicePayInput;
  readonly output: typeof PostInvoicesInvoicePayOutput;
  readonly error: typeof PostInvoicesInvoicePayError;
} = {
  name: "PostInvoicesInvoicePay",
  method: "POST",
  path: "/v1/invoices/{invoice}/pay",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoicePayInput,
  output: PostInvoicesInvoicePayOutput,
  error: PostInvoicesInvoicePayError,
};
/**
 * The PostInvoicesInvoiceRemoveLinesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceRemoveLinesOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceRemoveLinesInput;
  readonly output: typeof PostInvoicesInvoiceRemoveLinesOutput;
  readonly error: typeof PostInvoicesInvoiceRemoveLinesError;
} = {
  name: "PostInvoicesInvoiceRemoveLines",
  method: "POST",
  path: "/v1/invoices/{invoice}/remove_lines",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceRemoveLinesInput,
  output: PostInvoicesInvoiceRemoveLinesOutput,
  error: PostInvoicesInvoiceRemoveLinesError,
};
/**
 * The PostInvoicesInvoiceSendOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceSendOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceSendInput;
  readonly output: typeof PostInvoicesInvoiceSendOutput;
  readonly error: typeof PostInvoicesInvoiceSendError;
} = {
  name: "PostInvoicesInvoiceSend",
  method: "POST",
  path: "/v1/invoices/{invoice}/send",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceSendInput,
  output: PostInvoicesInvoiceSendOutput,
  error: PostInvoicesInvoiceSendError,
};
/**
 * The PostInvoicesInvoiceUpdateLinesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceUpdateLinesOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceUpdateLinesInput;
  readonly output: typeof PostInvoicesInvoiceUpdateLinesOutput;
  readonly error: typeof PostInvoicesInvoiceUpdateLinesError;
} = {
  name: "PostInvoicesInvoiceUpdateLines",
  method: "POST",
  path: "/v1/invoices/{invoice}/update_lines",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceUpdateLinesInput,
  output: PostInvoicesInvoiceUpdateLinesOutput,
  error: PostInvoicesInvoiceUpdateLinesError,
};
/**
 * The PostInvoicesInvoiceVoidOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoicesInvoiceVoidOperation: StripeOperation & {
  readonly input: typeof PostInvoicesInvoiceVoidInput;
  readonly output: typeof PostInvoicesInvoiceVoidOutput;
  readonly error: typeof PostInvoicesInvoiceVoidError;
} = {
  name: "PostInvoicesInvoiceVoid",
  method: "POST",
  path: "/v1/invoices/{invoice}/void",
  pathParameters: ["invoice"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoicesInvoiceVoidInput,
  output: PostInvoicesInvoiceVoidOutput,
  error: PostInvoicesInvoiceVoidError,
};
/**
 * The makeInvoicesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeInvoicesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetInvoices function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetInvoices = Effect.fn("invoices.GetInvoices")(function* (
    input: GetInvoicesInput,
  ) {
    const response: GetInvoicesOutput = yield* client.invoke(
      GetInvoicesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostInvoices function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoices = Effect.fn("invoices.PostInvoices")(function* (
    input: PostInvoicesInput,
  ) {
    const response: PostInvoicesOutput = yield* client.invoke(
      PostInvoicesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostInvoicesCreatePreview function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesCreatePreview = Effect.fn(
    "invoices.PostInvoicesCreatePreview",
  )(function* (input: PostInvoicesCreatePreviewInput) {
    const response: PostInvoicesCreatePreviewOutput = yield* client.invoke(
      PostInvoicesCreatePreviewOperation,
      input,
    );
    return response;
  });
  /**
   * The GetInvoicesSearch function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetInvoicesSearch = Effect.fn("invoices.GetInvoicesSearch")(function* (
    input: GetInvoicesSearchInput,
  ) {
    const response: GetInvoicesSearchOutput = yield* client.invoke(
      GetInvoicesSearchOperation,
      input,
    );
    return response;
  });
  /**
   * The GetInvoicesInvoice function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetInvoicesInvoice = Effect.fn("invoices.GetInvoicesInvoice")(
    function* (input: GetInvoicesInvoiceInput) {
      const response: GetInvoicesInvoiceOutput = yield* client.invoke(
        GetInvoicesInvoiceOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostInvoicesInvoice function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoice = Effect.fn("invoices.PostInvoicesInvoice")(
    function* (input: PostInvoicesInvoiceInput) {
      const response: PostInvoicesInvoiceOutput = yield* client.invoke(
        PostInvoicesInvoiceOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The DeleteInvoicesInvoice function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteInvoicesInvoice = Effect.fn("invoices.DeleteInvoicesInvoice")(
    function* (input: DeleteInvoicesInvoiceInput) {
      const response: DeleteInvoicesInvoiceOutput = yield* client.invoke(
        DeleteInvoicesInvoiceOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostInvoicesInvoiceAddLines function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceAddLines = Effect.fn(
    "invoices.PostInvoicesInvoiceAddLines",
  )(function* (input: PostInvoicesInvoiceAddLinesInput) {
    const response: PostInvoicesInvoiceAddLinesOutput = yield* client.invoke(
      PostInvoicesInvoiceAddLinesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostInvoicesInvoiceAttachPayment function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceAttachPayment = Effect.fn(
    "invoices.PostInvoicesInvoiceAttachPayment",
  )(function* (input: PostInvoicesInvoiceAttachPaymentInput) {
    const response: PostInvoicesInvoiceAttachPaymentOutput =
      yield* client.invoke(PostInvoicesInvoiceAttachPaymentOperation, input);
    return response;
  });
  /**
   * The PostInvoicesInvoiceFinalize function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceFinalize = Effect.fn(
    "invoices.PostInvoicesInvoiceFinalize",
  )(function* (input: PostInvoicesInvoiceFinalizeInput) {
    const response: PostInvoicesInvoiceFinalizeOutput = yield* client.invoke(
      PostInvoicesInvoiceFinalizeOperation,
      input,
    );
    return response;
  });
  /**
   * The GetInvoicesInvoiceLines function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetInvoicesInvoiceLines = Effect.fn("invoices.GetInvoicesInvoiceLines")(
    function* (input: GetInvoicesInvoiceLinesInput) {
      const response: GetInvoicesInvoiceLinesOutput = yield* client.invoke(
        GetInvoicesInvoiceLinesOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostInvoicesInvoiceLinesLineItemId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceLinesLineItemId = Effect.fn(
    "invoices.PostInvoicesInvoiceLinesLineItemId",
  )(function* (input: PostInvoicesInvoiceLinesLineItemIdInput) {
    const response: PostInvoicesInvoiceLinesLineItemIdOutput =
      yield* client.invoke(PostInvoicesInvoiceLinesLineItemIdOperation, input);
    return response;
  });
  /**
   * The PostInvoicesInvoiceMarkUncollectible function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceMarkUncollectible = Effect.fn(
    "invoices.PostInvoicesInvoiceMarkUncollectible",
  )(function* (input: PostInvoicesInvoiceMarkUncollectibleInput) {
    const response: PostInvoicesInvoiceMarkUncollectibleOutput =
      yield* client.invoke(
        PostInvoicesInvoiceMarkUncollectibleOperation,
        input,
      );
    return response;
  });
  /**
   * The PostInvoicesInvoicePay function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoicePay = Effect.fn("invoices.PostInvoicesInvoicePay")(
    function* (input: PostInvoicesInvoicePayInput) {
      const response: PostInvoicesInvoicePayOutput = yield* client.invoke(
        PostInvoicesInvoicePayOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostInvoicesInvoiceRemoveLines function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceRemoveLines = Effect.fn(
    "invoices.PostInvoicesInvoiceRemoveLines",
  )(function* (input: PostInvoicesInvoiceRemoveLinesInput) {
    const response: PostInvoicesInvoiceRemoveLinesOutput = yield* client.invoke(
      PostInvoicesInvoiceRemoveLinesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostInvoicesInvoiceSend function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceSend = Effect.fn("invoices.PostInvoicesInvoiceSend")(
    function* (input: PostInvoicesInvoiceSendInput) {
      const response: PostInvoicesInvoiceSendOutput = yield* client.invoke(
        PostInvoicesInvoiceSendOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostInvoicesInvoiceUpdateLines function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceUpdateLines = Effect.fn(
    "invoices.PostInvoicesInvoiceUpdateLines",
  )(function* (input: PostInvoicesInvoiceUpdateLinesInput) {
    const response: PostInvoicesInvoiceUpdateLinesOutput = yield* client.invoke(
      PostInvoicesInvoiceUpdateLinesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostInvoicesInvoiceVoid function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoicesInvoiceVoid = Effect.fn("invoices.PostInvoicesInvoiceVoid")(
    function* (input: PostInvoicesInvoiceVoidInput) {
      const response: PostInvoicesInvoiceVoidOutput = yield* client.invoke(
        PostInvoicesInvoiceVoidOperation,
        input,
      );
      return response;
    },
  );
  return {
    GetInvoices,
    PostInvoices,
    PostInvoicesCreatePreview,
    GetInvoicesSearch,
    GetInvoicesInvoice,
    PostInvoicesInvoice,
    DeleteInvoicesInvoice,
    PostInvoicesInvoiceAddLines,
    PostInvoicesInvoiceAttachPayment,
    PostInvoicesInvoiceFinalize,
    GetInvoicesInvoiceLines,
    PostInvoicesInvoiceLinesLineItemId,
    PostInvoicesInvoiceMarkUncollectible,
    PostInvoicesInvoicePay,
    PostInvoicesInvoiceRemoveLines,
    PostInvoicesInvoiceSend,
    PostInvoicesInvoiceUpdateLines,
    PostInvoicesInvoiceVoid,
  };
});
