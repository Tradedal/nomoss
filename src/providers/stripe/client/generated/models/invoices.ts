// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import {
  Stripebilling_bill_resource_invoice_item_parents_invoice_item_parent,
  Stripebilling_bill_resource_invoicing_parents_invoice_parent,
  Stripebilling_bill_resource_invoicing_pricing_pricing,
  Stripebilling_bill_resource_invoicing_taxes_tax,
  Stripebilling_credit_balance_transaction,
} from "./billing.js";
import { Stripetax_id, Stripetax_rate } from "./catalog.js";
import { Stripecharge } from "./charges.js";
import {
  Stripeaddress,
  Stripeapi_errors,
  Stripeapplication,
  Stripeautomatic_tax,
  Stripeconnect_account_reference,
  Stripecredited_items_invoice_line_items,
  Stripedeleted_application,
  Stripedeleted_discount,
  Stripedeleted_invoice,
  Stripedeleted_tax_id,
  Stripediscount,
  Stripediscounts_resource_discount_amount,
  Stripeinvoicing_rule,
  Stripeline_item,
  Stripeline_items_tax_amount,
  Stripeproration_details,
  Stripeshipping,
  Stripeshipping_rate,
  Stripetest_helpers_test_clock,
} from "./common.js";
import { Stripecustomer, Stripedeleted_customer } from "./customers.js";
import { Stripepayment_intent } from "./paymentIntents.js";
import { Stripepayment_method } from "./paymentMethods.js";
import { Stripebank_account, Stripecard } from "./paymentSources.js";
import { Stripepayment_record } from "./payments.js";
import { Stripesource } from "./sources.js";

export type Stripeinvoice = {
  readonly account_country?: string | null;
  readonly account_name?: string | null;
  readonly account_tax_ids?: ReadonlyArray<
    string | Stripetax_id | Stripedeleted_tax_id
  > | null;
  readonly amount_due: number;
  readonly amount_overpaid: number;
  readonly amount_paid: number;
  readonly amount_paid_off_stripe: number;
  readonly amount_remaining: number;
  readonly amount_shipping: number;
  readonly application?:
    | string
    | Stripeapplication
    | Stripedeleted_application
    | null;
  readonly attempt_count: number;
  readonly attempted: boolean;
  readonly auto_advance: boolean;
  readonly automatic_tax: Stripeautomatic_tax;
  readonly automatically_finalizes_at?: number | null;
  readonly billing_reason?:
    | "automatic_pending_invoice_item_invoice"
    | "manual"
    | "quote_accept"
    | "subscription"
    | "subscription_create"
    | "subscription_cycle"
    | "subscription_threshold"
    | "subscription_update"
    | "upcoming"
    | null;
  readonly collection_method: "charge_automatically" | "send_invoice";
  readonly confirmation_secret?: Stripeinvoices_resource_confirmation_secret | null;
  readonly created: number;
  readonly currency: string;
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly customer: string | Stripecustomer | Stripedeleted_customer;
  readonly customer_account?: string | null;
  readonly customer_address?: Stripeaddress | null;
  readonly customer_email?: string | null;
  readonly customer_name?: string | null;
  readonly customer_phone?: string | null;
  readonly customer_shipping?: Stripeshipping | null;
  readonly customer_tax_exempt?: "exempt" | "none" | "reverse" | null;
  readonly customer_tax_ids?: ReadonlyArray<Stripeinvoices_resource_invoice_tax_id> | null;
  readonly default_payment_method?: string | Stripepayment_method | null;
  readonly default_source?:
    | string
    | Stripebank_account
    | Stripecard
    | Stripesource
    | null;
  readonly default_tax_rates: ReadonlyArray<Stripetax_rate>;
  readonly description?: string | null;
  readonly discounts: ReadonlyArray<
    string | Stripediscount | Stripedeleted_discount
  >;
  readonly due_date?: number | null;
  readonly effective_at?: number | null;
  readonly ending_balance?: number | null;
  readonly footer?: string | null;
  readonly from_invoice?: Stripeinvoices_resource_from_invoice | null;
  readonly hosted_invoice_url?: string | null;
  readonly id: string;
  readonly invoice_pdf?: string | null;
  readonly issuer: Stripeconnect_account_reference;
  readonly last_finalization_error?: Stripeapi_errors | null;
  readonly latest_revision?: string | Stripeinvoice | null;
  readonly lines: {
    readonly data: ReadonlyArray<Stripeline_item>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly next_payment_attempt?: number | null;
  readonly number?: string | null;
  readonly object: "invoice";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly parent?: Stripebilling_bill_resource_invoicing_parents_invoice_parent | null;
  readonly payment_settings: Stripeinvoices_payment_settings;
  readonly payments?: {
    readonly data: ReadonlyArray<Stripeinvoice_payment>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly period_end: number;
  readonly period_start: number;
  readonly post_payment_credit_notes_amount: number;
  readonly pre_payment_credit_notes_amount: number;
  readonly receipt_number?: string | null;
  readonly rendering?: Stripeinvoices_resource_invoice_rendering | null;
  readonly shipping_cost?: Stripeinvoices_resource_shipping_cost | null;
  readonly shipping_details?: Stripeshipping | null;
  readonly starting_balance: number;
  readonly statement_descriptor?: string | null;
  readonly status?: "draft" | "open" | "paid" | "uncollectible" | "void" | null;
  readonly status_details?: Stripeinvoices_resource_status_details;
  readonly status_transitions: Stripeinvoices_resource_status_transitions;
  readonly subtotal: number;
  readonly subtotal_excluding_tax?: number | null;
  readonly test_clock?: string | Stripetest_helpers_test_clock | null;
  readonly threshold_reason?: Stripeinvoice_threshold_reason;
  readonly total: number;
  readonly total_discount_amounts?: ReadonlyArray<Stripediscounts_resource_discount_amount> | null;
  readonly total_excluding_tax?: number | null;
  readonly total_pretax_credit_amounts?: ReadonlyArray<Stripeinvoices_resource_pretax_credit_amount> | null;
  readonly total_taxes?: ReadonlyArray<Stripebilling_bill_resource_invoicing_taxes_tax> | null;
  readonly webhooks_delivered_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_pretax_credit_amount = {
  readonly amount: number;
  readonly credit_balance_transaction?:
    | string
    | Stripebilling_credit_balance_transaction
    | null;
  readonly discount?: string | Stripediscount | Stripedeleted_discount;
  readonly type: "credit_balance_transaction" | "discount";
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment = {
  readonly amount_paid?: number | null;
  readonly amount_requested: number;
  readonly created: number;
  readonly currency: string;
  readonly id: string;
  readonly invoice: string | Stripeinvoice | Stripedeleted_invoice;
  readonly is_default: boolean;
  readonly livemode: boolean;
  readonly object: "invoice_payment";
  readonly payment: Stripeinvoices_payments_invoice_payment_associated_payment;
  readonly status: string;
  readonly status_transitions: Stripeinvoices_payments_invoice_payment_status_transitions;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_from_invoice = {
  readonly action: string;
  readonly invoice: string | Stripeinvoice;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_setting_custom_field = {
  readonly name: string;
  readonly value: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_setting_customer_rendering_options = {
  readonly amount_tax_display?: string | null;
  readonly template?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_confirmation_secret = {
  readonly client_secret: string;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_invoice_tax_id = {
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
export type Stripeinvoice_line_item_period = {
  readonly end: number;
  readonly start: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_acss_debit_mandate_options = {
  readonly transaction_type?: "business" | "personal" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_bancontact = {
  readonly preferred_language: "de" | "en" | "fr" | "nl";
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_billie_company_details_registered_address =
  {
    readonly city?: string | null;
    readonly country?: string | null;
    readonly line1?: string | null;
    readonly line2?: string | null;
    readonly postal_code?: string | null;
    readonly state?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_blik = {
  readonly [x: string]: Schema.Json;
};
export type Stripeinvoice_installments_card = {
  readonly enabled?: boolean | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer =
  { readonly country: "BE" | "DE" | "ES" | "FR" | "IE" | "NL" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripeinvoice_payment_method_options_konbini = {
  readonly [x: string]: Schema.Json;
};
export type Stripeinvoice_mandate_options_payto = {
  readonly amount?: number | null;
  readonly amount_type?: "fixed" | "maximum" | null;
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
export type Stripeinvoice_payment_method_options_pix = {
  readonly amount_includes_iof?: "always" | "never" | null;
  readonly expires_after_seconds?: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_sepa_debit = {
  readonly [x: string]: Schema.Json;
};
export type Stripeinvoice_payment_method_options_mandate_options_upi = {
  readonly amount?: number | null;
  readonly amount_type?: "fixed" | "maximum" | null;
  readonly description?: string | null;
  readonly end_date?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_us_bank_account_linked_account_options_filters =
  { readonly account_subcategories?: ReadonlyArray<"checking" | "savings"> } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripeinvoices_payments_invoice_payment_associated_payment = {
  readonly charge?: string | Stripecharge;
  readonly payment_intent?: string | Stripepayment_intent;
  readonly payment_record?: string | Stripepayment_record;
  readonly type: "charge" | "payment_intent" | "payment_record";
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_payments_invoice_payment_status_transitions = {
  readonly canceled_at?: number | null;
  readonly paid_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_rendering_pdf = {
  readonly page_size?: "a4" | "auto" | "letter" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_uncollectible_status_details = {
  readonly reason?:
    | "max_payment_attempts"
    | "payment_not_received"
    | "subscription_canceled"
    | "subscription_paused"
    | "user_forgiven"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_status_transitions = {
  readonly finalized_at?: number | null;
  readonly marked_uncollectible_at?: number | null;
  readonly paid_at?: number | null;
  readonly voided_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_item_threshold_reason = {
  readonly line_item_ids: ReadonlyArray<string>;
  readonly usage_gte: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_mandate_options_card = {
  readonly amount?: number | null;
  readonly amount_type?: "fixed" | "maximum" | null;
  readonly description?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_setting_checkout_rendering_options = {
  readonly amount_tax_display?: string | null;
  readonly template?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_setting_customer_setting = {
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly default_payment_method?: string | Stripepayment_method | null | null;
  readonly footer?: string | null;
  readonly rendering_options?: Stripeinvoice_setting_customer_rendering_options | null | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_setting_quote_setting = {
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly days_until_due?: number | null;
  readonly description?: string | null;
  readonly footer?: string | null;
  readonly issuer: Stripeconnect_account_reference;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_setting_subscription_schedule_setting = {
  readonly account_tax_ids?: ReadonlyArray<
    string | Stripetax_id | Stripedeleted_tax_id
  > | null;
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly days_until_due?: number | null;
  readonly description?: string | null;
  readonly footer?: string | null;
  readonly issuer: Stripeconnect_account_reference;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_setting_subscription_schedule_phase_setting = {
  readonly account_tax_ids?: ReadonlyArray<
    string | Stripetax_id | Stripedeleted_tax_id
  > | null;
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly days_until_due?: number | null;
  readonly description?: string | null;
  readonly footer?: string | null;
  readonly issuer?: Stripeconnect_account_reference | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_acss_debit = {
  readonly mandate_options?: Stripeinvoice_payment_method_options_acss_debit_mandate_options;
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_billie_company_details = {
  readonly registered_address?: Stripeinvoice_payment_method_options_billie_company_details_registered_address;
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
export type Stripeinvoice_payment_method_options_card = {
  readonly installments?: Stripeinvoice_installments_card;
  readonly request_three_d_secure?: "any" | "automatic" | "challenge" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_customer_balance_bank_transfer =
  {
    readonly eu_bank_transfer?: Stripeinvoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer;
    readonly type?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_payto = {
  readonly mandate_options?: Stripeinvoice_mandate_options_payto;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_upi = {
  readonly mandate_options?: Stripeinvoice_payment_method_options_mandate_options_upi;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_us_bank_account_linked_account_options =
  {
    readonly filters?: Stripeinvoice_payment_method_options_us_bank_account_linked_account_options_filters;
    readonly permissions?: ReadonlyArray<
      "balances" | "ownership" | "payment_method" | "transactions"
    >;
    readonly prefetch?: ReadonlyArray<
      "balances" | "ownership" | "transactions"
    > | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_invoice_rendering = {
  readonly amount_tax_display?: string | null;
  readonly pdf?: Stripeinvoice_rendering_pdf | null;
  readonly template?: string | null;
  readonly template_version?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_status_details = {
  readonly uncollectible?: Stripeinvoices_resource_uncollectible_status_details;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_threshold_reason = {
  readonly amount_gte?: number | null;
  readonly item_reasons: ReadonlyArray<Stripeinvoice_item_threshold_reason>;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_item_proration_credited_items = {
  readonly invoice_item?: string;
  readonly invoice_line_item_details?: Stripecredited_items_invoice_line_items;
  readonly type: "invoice_item" | "invoice_line_items";
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_billie = {
  readonly company_details?: Stripeinvoice_payment_method_options_billie_company_details;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_customer_balance = {
  readonly bank_transfer?: Stripeinvoice_payment_method_options_customer_balance_bank_transfer;
  readonly funding_type?: "bank_transfer" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoice_payment_method_options_us_bank_account = {
  readonly financial_connections?: Stripeinvoice_payment_method_options_us_bank_account_linked_account_options;
  readonly verification_method?: "automatic" | "instant" | "microdeposits";
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_payment_method_options = {
  readonly acss_debit?: Stripeinvoice_payment_method_options_acss_debit | null;
  readonly bancontact?: Stripeinvoice_payment_method_options_bancontact | null;
  readonly billie?: Stripeinvoice_payment_method_options_billie | null;
  readonly blik?: Stripeinvoice_payment_method_options_blik | null;
  readonly card?: Stripeinvoice_payment_method_options_card | null;
  readonly customer_balance?: Stripeinvoice_payment_method_options_customer_balance | null;
  readonly konbini?: Stripeinvoice_payment_method_options_konbini | null;
  readonly payto?: Stripeinvoice_payment_method_options_payto | null;
  readonly pix?: Stripeinvoice_payment_method_options_pix | null;
  readonly sepa_debit?: Stripeinvoice_payment_method_options_sepa_debit | null;
  readonly upi?: Stripeinvoice_payment_method_options_upi | null;
  readonly us_bank_account?: Stripeinvoice_payment_method_options_us_bank_account | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_resource_shipping_cost = {
  readonly amount_subtotal: number;
  readonly amount_tax: number;
  readonly amount_total: number;
  readonly shipping_rate?: string | Stripeshipping_rate | null;
  readonly taxes?: ReadonlyArray<Stripeline_items_tax_amount>;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoiceitem = {
  readonly amount: number;
  readonly currency: string;
  readonly customer: string | Stripecustomer | Stripedeleted_customer;
  readonly customer_account?: string | null;
  readonly date: number;
  readonly description?: string | null;
  readonly discountable: boolean;
  readonly discounts?: ReadonlyArray<string | Stripediscount> | null;
  readonly frozen_fields?: ReadonlyArray<"discounts" | "pricing" | "quantity">;
  readonly id: string;
  readonly invoice?: string | Stripeinvoice | null;
  readonly invoicing_rules?: ReadonlyArray<Stripeinvoicing_rule>;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly net_amount?: number;
  readonly object: "invoiceitem";
  readonly parent?: Stripebilling_bill_resource_invoice_item_parents_invoice_item_parent | null;
  readonly period: Stripeinvoice_line_item_period;
  readonly pricing?: Stripebilling_bill_resource_invoicing_pricing_pricing | null;
  readonly proration: boolean;
  readonly proration_details?: Stripeproration_details;
  readonly quantity: number;
  readonly quantity_decimal: string;
  readonly tax_rates?: ReadonlyArray<Stripetax_rate> | null;
  readonly test_clock?: string | Stripetest_helpers_test_clock | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeinvoices_payment_settings = {
  readonly default_mandate?: string | null;
  readonly payment_method_options?: Stripeinvoices_payment_method_options | null;
  readonly payment_method_types?: ReadonlyArray<
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
  > | null;
} & { readonly [x: string]: Schema.Json };

export const Stripeinvoice = Schema.suspend(
  (): Schema.Codec<Stripeinvoice> =>
    Schema.StructWithRest(
      Schema.Struct({
        account_country: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The country of the business associated with this invoice, most often the business creating the invoice.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        account_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The public name of the business associated with this invoice, most often the business creating the invoice.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        account_tax_ids: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Schema.suspend((): Schema.Codec<Stripetax_id> => Stripetax_id),
                Stripedeleted_tax_id,
              ]),
            ).annotate({
              description:
                "The account tax IDs associated with the invoice. Only editable when the invoice is a draft.",
            }),
            Schema.Null,
          ]),
        ),
        amount_due: Schema.Number.annotate({
          description:
            "Final amount due at this time for this invoice. If the invoice's total is smaller than the minimum charge amount, for example, or if there is account credit that can be applied to the invoice, the `amount_due` may be 0. If there is a positive `starting_balance` for the invoice (the customer owes money), the `amount_due` will also take that into account. The charge that gets generated for the invoice will be for the amount specified in `amount_due`.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_overpaid: Schema.Number.annotate({
          description:
            "Amount that was overpaid on the invoice. The amount overpaid is credited to the customer's credit balance.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_paid: Schema.Number.annotate({
          description:
            "The amount, in cents (or local equivalent), that was paid.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_paid_off_stripe: Schema.Number.annotate({
          description:
            "Amount, in cents (or local equivalent), that was paid on the invoice outside of Stripe.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_remaining: Schema.Number.annotate({
          description:
            "The difference between amount_due and amount_paid, in cents (or local equivalent).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_shipping: Schema.Number.annotate({
          description: "This is the sum of all the shipping amounts.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
                "ID of the Connect Application that created the invoice.",
            }),
            Schema.Null,
          ]),
        ),
        attempt_count: Schema.Number.annotate({
          description:
            "Number of payment attempts made for this invoice, from the perspective of the payment retry schedule. Any payment attempt counts as the first attempt, and subsequently only automatic retries increment the attempt count. In other words, manual payment attempts after the first attempt do not affect the retry schedule. If a failure is returned with a non-retryable return code, the invoice can no longer be retried unless a new payment method is obtained. Retries will continue to be scheduled, and attempt_count will continue to increment, but retries will only be executed if a new payment method is obtained.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        attempted: Schema.Boolean.annotate({
          description:
            "Whether an attempt has been made to pay the invoice. An invoice is not attempted until 1 hour after the `invoice.created` webhook, for example, so you might not want to display that invoice as unpaid to your users.",
        }),
        auto_advance: Schema.Boolean.annotate({
          description:
            "Controls whether Stripe performs [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection) of the invoice. If `false`, the invoice's state doesn't automatically advance without an explicit action.",
        }),
        automatic_tax: Stripeautomatic_tax,
        automatically_finalizes_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The time when this invoice is currently scheduled to be automatically finalized. The field will be `null` if the invoice is not scheduled to finalize in the future. If the invoice is not in the draft state, this field will always be `null` - see `finalized_at` for the time when an already-finalized invoice was finalized.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        billing_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "automatic_pending_invoice_item_invoice",
              "manual",
              "quote_accept",
              "subscription",
              "subscription_create",
              "subscription_cycle",
              "subscription_threshold",
              "subscription_update",
              "upcoming",
            ]).annotate({
              description:
                "Indicates the reason why the invoice was created.\n\n* `manual`: Unrelated to a subscription, for example, created via the invoice editor.\n* `subscription`: No longer in use. Applies to subscriptions from before May 2018 where no distinction was made between updates, cycles, and thresholds.\n* `subscription_create`: A new subscription was created.\n* `subscription_cycle`: A subscription advanced into a new period.\n* `subscription_threshold`: A subscription reached a billing threshold.\n* `subscription_update`: A subscription was updated.\n* `upcoming`: Reserved for upcoming invoices created through the Create Preview Invoice API or when an `invoice.upcoming` event is generated for an upcoming invoice on a subscription.",
            }),
            Schema.Null,
          ]),
        ),
        collection_method: Schema.Literals([
          "charge_automatically",
          "send_invoice",
        ]).annotate({
          description:
            "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this invoice using the default source attached to the customer. When sending an invoice, Stripe will email this invoice to the customer with payment instructions.",
        }),
        confirmation_secret: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoices_resource_confirmation_secret,
            ]).annotate({
              description:
                "The confirmation secret associated with this invoice. Currently, this contains the client_secret of the PaymentIntent that Stripe creates during invoice finalization.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        custom_fields: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeinvoice_setting_custom_field).annotate({
              description: "Custom fields displayed on the invoice.",
            }),
            Schema.Null,
          ]),
        ),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
          Stripedeleted_customer,
        ]).annotate({ description: "The ID of the customer to bill." }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the account representing the customer to bill.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description:
                "The customer's address. Until the invoice is finalized, this field will equal `customer.address`. Once the invoice is finalized, this field will no longer be updated.",
            }),
            Schema.Null,
          ]),
        ),
        customer_email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The customer's email. Until the invoice is finalized, this field will equal `customer.email`. Once the invoice is finalized, this field will no longer be updated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The customer's name. Until the invoice is finalized, this field will equal `customer.name`. Once the invoice is finalized, this field will no longer be updated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The customer's phone number. Until the invoice is finalized, this field will equal `customer.phone`. Once the invoice is finalized, this field will no longer be updated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_shipping: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeshipping]).annotate({
              description:
                "The customer's shipping information. Until the invoice is finalized, this field will equal `customer.shipping`. Once the invoice is finalized, this field will no longer be updated.",
            }),
            Schema.Null,
          ]),
        ),
        customer_tax_exempt: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["exempt", "none", "reverse"]).annotate({
              description:
                "The customer's tax exempt status. Until the invoice is finalized, this field will equal `customer.tax_exempt`. Once the invoice is finalized, this field will no longer be updated.",
            }),
            Schema.Null,
          ]),
        ),
        customer_tax_ids: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeinvoices_resource_invoice_tax_id).annotate({
              description:
                "The customer's tax IDs. Until the invoice is finalized, this field will contain the same tax IDs as `customer.tax_ids`. Once the invoice is finalized, this field will no longer be updated.",
            }),
            Schema.Null,
          ]),
        ),
        default_payment_method: Schema.optionalKey(
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
                "ID of the default payment method for the invoice. It must belong to the customer associated with the invoice. If not set, defaults to the subscription's default payment method, if any, or to the default payment method in the customer's invoice settings.",
            }),
            Schema.Null,
          ]),
        ),
        default_source: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebank_account> => Stripebank_account,
              ),
              Schema.suspend((): Schema.Codec<Stripecard> => Stripecard),
              Stripesource,
            ]).annotate({
              description:
                "ID of the default payment source for the invoice. It must belong to the customer associated with the invoice and be in a chargeable state. If not set, defaults to the subscription's default source, if any, or to the customer's default source.",
            }),
            Schema.Null,
          ]),
        ),
        default_tax_rates: Schema.Array(Stripetax_rate).annotate({
          description: "The tax rates applied to this invoice, if any.",
        }),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An arbitrary string attached to the object. Often useful for displaying to users. Referenced as 'memo' in the Dashboard.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discounts: Schema.Array(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripediscount> => Stripediscount),
            Schema.suspend(
              (): Schema.Codec<Stripedeleted_discount> =>
                Stripedeleted_discount,
            ),
          ]),
        ).annotate({
          description:
            "The discounts applied to the invoice. Line item discounts are applied before invoice discounts. Use `expand[]=discounts` to expand each discount.",
        }),
        due_date: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The date on which payment for this invoice is due. This value will be `null` for invoices where `collection_method=charge_automatically`.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        effective_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The date when this invoice is in effect. Same as `finalized_at` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the invoice PDF and receipt.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        ending_balance: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Ending customer balance after the invoice is finalized. Invoices are finalized approximately an hour after successful webhook delivery or when payment collection is attempted for the invoice. If the invoice has not been finalized yet, this will be null.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        from_invoice: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripeinvoices_resource_from_invoice> =>
                  Stripeinvoices_resource_from_invoice,
              ),
            ]).annotate({
              description:
                "Details of the invoice that was cloned. See the [revision documentation](https://docs.stripe.com/invoicing/invoice-revisions) for more details.",
            }),
            Schema.Null,
          ]),
        ),
        hosted_invoice_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The URL for the hosted invoice page, which allows customers to view and pay an invoice. If the invoice has not been finalized yet, this will be null.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description:
            "Unique identifier for the object. For preview invoices created using the [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint, this id will be prefixed with `upcoming_in`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice_pdf: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The link to download the PDF for the invoice. If the invoice has not been finalized yet, this will be null.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        issuer: Stripeconnect_account_reference,
        last_finalization_error: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripeapi_errors> => Stripeapi_errors,
              ),
            ]).annotate({
              description:
                "The error encountered during the previous attempt to finalize the invoice. This field is cleared when the invoice is successfully finalized.",
            }),
            Schema.Null,
          ]),
        ),
        latest_revision: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
            ]).annotate({
              description:
                "The ID of the most recent non-draft revision of this invoice",
            }),
            Schema.Null,
          ]),
        ),
        lines: Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(
              Schema.suspend(
                (): Schema.Codec<Stripeline_item> => Stripeline_item,
              ),
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
          title: "InvoiceLinesList",
          description:
            "The individual line items that make up the invoice. `lines` is sorted as follows: (1) pending invoice items (including prorations) in reverse chronological order, (2) subscription items in reverse chronological order, and (3) invoice items added after invoice creation in chronological order.",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
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
        next_payment_attempt: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The time at which payment will next be attempted. This value will be `null` for invoices where `collection_method=send_invoice`.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A unique, identifying string that appears on emails sent to the customer for this invoice. This starts with the customer's unique invoice_prefix if it is specified.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("invoice").annotate({
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
                "The account (if any) for which the funds of the invoice payment are intended. If set, the invoice will be presented with the branding and support information of the specified account. See the [Invoices with Connect](https://docs.stripe.com/billing/invoices/connect) documentation for details.",
            }),
            Schema.Null,
          ]),
        ),
        parent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripebilling_bill_resource_invoicing_parents_invoice_parent> =>
                  Stripebilling_bill_resource_invoicing_parents_invoice_parent,
              ),
            ]).annotate({
              description: "The parent that generated this invoice",
            }),
            Schema.Null,
          ]),
        ),
        payment_settings: Stripeinvoices_payment_settings,
        payments: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(
                Schema.suspend(
                  (): Schema.Codec<Stripeinvoice_payment> =>
                    Stripeinvoice_payment,
                ),
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
            title: "InvoicesPaymentsListInvoicePayments",
            description:
              "Payments for this invoice. Use [invoice payment](/api/invoice-payment) to get more details.",
          }),
        ),
        period_end: Schema.Number.annotate({
          description:
            "The latest timestamp at which invoice items can be associated with this invoice. Use the [line item period](/api/invoices/line_item#invoice_line_item_object-period) to get the service period for each price.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        period_start: Schema.Number.annotate({
          description:
            "The earliest timestamp at which invoice items can be associated with this invoice. Use the [line item period](/api/invoices/line_item#invoice_line_item_object-period) to get the service period for each price.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        post_payment_credit_notes_amount: Schema.Number.annotate({
          description:
            "Total amount of all post-payment credit notes issued for this invoice.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        pre_payment_credit_notes_amount: Schema.Number.annotate({
          description:
            "Total amount of all pre-payment credit notes issued for this invoice.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        receipt_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "This is the transaction number that appears on email receipts sent for this invoice.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        rendering: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoices_resource_invoice_rendering]).annotate({
              description:
                "The rendering-related settings that control how invoices render in customer-facing interfaces such as the PDF or hosted invoice page.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_cost: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoices_resource_shipping_cost]).annotate({
              description:
                "The details of the cost of shipping, including the ShippingRate applied on the invoice.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeshipping]).annotate({
              description:
                "Shipping details for the invoice. The Invoice PDF will use the `shipping_details` value if it is set, otherwise the PDF will render the shipping address from the customer.",
            }),
            Schema.Null,
          ]),
        ),
        starting_balance: Schema.Number.annotate({
          description:
            "Starting customer balance before the invoice is finalized. If the invoice has not been finalized yet, this will be the current customer balance. For revision invoices, this also includes any customer balance that was applied to the original invoice.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Extra information about an invoice for the customer's credit card statement.",
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
              "draft",
              "open",
              "paid",
              "uncollectible",
              "void",
            ]).annotate({
              description:
                "The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`. [Learn more](https://docs.stripe.com/billing/invoices/workflow#workflow-overview)",
            }),
            Schema.Null,
          ]),
        ),
        status_details: Schema.optionalKey(
          Stripeinvoices_resource_status_details,
        ),
        status_transitions: Stripeinvoices_resource_status_transitions,
        subtotal: Schema.Number.annotate({
          description:
            "Total of all subscriptions, invoice items, and prorations on the invoice before any invoice level discount or exclusive tax is applied. Item discounts are already incorporated",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        subtotal_excluding_tax: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The integer amount in cents (or local equivalent) representing the subtotal of the invoice before any invoice level discount or tax is applied. Item discounts are already incorporated",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        test_clock: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetest_helpers_test_clock,
            ]).annotate({
              description: "ID of the test clock this invoice belongs to.",
            }),
            Schema.Null,
          ]),
        ),
        threshold_reason: Schema.optionalKey(Stripeinvoice_threshold_reason),
        total: Schema.Number.annotate({
          description: "Total after discounts and taxes.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        total_discount_amounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripediscounts_resource_discount_amount).annotate({
              description:
                "The aggregate amounts calculated per discount across all line items.",
            }),
            Schema.Null,
          ]),
        ),
        total_excluding_tax: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The integer amount in cents (or local equivalent) representing the total amount of the invoice including all discounts but excluding all tax.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        total_pretax_credit_amounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.suspend(
                (): Schema.Codec<Stripeinvoices_resource_pretax_credit_amount> =>
                  Stripeinvoices_resource_pretax_credit_amount,
              ),
            ).annotate({
              description:
                "Contains pretax credit amounts (ex: discount, credit grants, etc) that apply to this invoice. This is a combined list of total_pretax_credit_amounts across all invoice line items.",
            }),
            Schema.Null,
          ]),
        ),
        total_taxes: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripebilling_bill_resource_invoicing_taxes_tax,
            ).annotate({
              description: "The aggregate tax information of all line items.",
            }),
            Schema.Null,
          ]),
        ),
        webhooks_delivered_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Invoices are automatically paid or sent 1 hour after webhooks are delivered, or until all webhook delivery attempts have [been exhausted](https://docs.stripe.com/billing/webhooks#understand). This field tracks the time when webhooks for this invoice were successfully delivered. If the invoice had no webhooks to deliver, this will be set while the invoice is being created.",
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
      title: "Invoice",
      description:
        "Invoices are statements of amounts owed by a customer, and are either\ngenerated one-off, or generated periodically from a subscription.\n\nThey contain [invoice items](https://docs.stripe.com/api#invoiceitems), and proration adjustments\nthat may be caused by subscription upgrades/downgrades (if necessary).\n\nIf your invoice is configured to be billed through automatic charges,\nStripe automatically finalizes your invoice and attempts payment. Note\nthat finalizing the invoice,\n[when automatic](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection), does\nnot happen immediately as the invoice is created. Stripe waits\nuntil one hour after the last webhook was successfully sent (or the last\nwebhook timed out after failing). If you (and the platforms you may have\nconnected to) have no webhooks configured, Stripe waits one hour after\ncreation to finalize the invoice.\n\nIf your invoice is configured to be billed by sending an email, then based on your\n[email settings](https://dashboard.stripe.com/account/billing/automatic),\nStripe will email the invoice to your customer and await payment. These\nemails can contain a link to a hosted page to pay the invoice.\n\nStripe applies any customer credit on the account before determining the\namount due for the invoice (i.e., the amount that will be actually\ncharged). If the amount due for the invoice is less than Stripe's [minimum allowed charge\nper currency](/docs/currencies#minimum-and-maximum-charge-amounts), the\ninvoice is automatically marked paid, and we add the amount due to the\ncustomer's credit balance which is applied to the next invoice.\n\nMore details on the customer's credit balance are\n[here](https://docs.stripe.com/billing/customer/balance).\n\nRelated guide: [Send invoices to customers](https://docs.stripe.com/billing/invoices/sending)",
      identifier: "Stripeinvoice",
    }),
);
export const Stripeinvoices_resource_pretax_credit_amount =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.Number.annotate({
        description:
          "The amount, in cents (or local equivalent), of the pretax credit amount.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      credit_balance_transaction: Schema.optionalKey(
        Schema.Union([
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend(
              (): Schema.Codec<Stripebilling_credit_balance_transaction> =>
                Stripebilling_credit_balance_transaction,
            ),
          ]).annotate({
            description:
              "The credit balance transaction that was applied to get this pretax credit amount.",
          }),
          Schema.Null,
        ]),
      ),
      discount: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripediscount> => Stripediscount),
          Schema.suspend(
            (): Schema.Codec<Stripedeleted_discount> => Stripedeleted_discount,
          ),
        ]).annotate({
          description:
            "The discount that was applied to get this pretax credit amount.",
        }),
      ),
      type: Schema.Literals([
        "credit_balance_transaction",
        "discount",
      ]).annotate({
        description: "Type of the pretax credit amount referenced.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "InvoicesResourcePretaxCreditAmount",
    description: "",
    identifier: "Stripeinvoices_resource_pretax_credit_amount",
  });
export const Stripeinvoice_payment = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_payment> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_paid: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Amount that was actually paid for this invoice, in cents (or local equivalent). This field is null until the payment is `paid`. This amount can be less than the `amount_requested` if the PaymentIntent’s `amount_received` is not sufficient to pay all of the invoices that it is attached to.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        amount_requested: Schema.Number.annotate({
          description:
            "Amount intended to be paid toward this invoice, in cents (or local equivalent)",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
          Stripedeleted_invoice,
        ]).annotate({ description: "The invoice that was paid." }),
        is_default: Schema.Boolean.annotate({
          description:
            "Stripe automatically creates a default InvoicePayment when the invoice is finalized, and keeps it synchronized with the invoice’s `amount_remaining`. The PaymentIntent associated with the default payment can’t be edited or canceled directly.",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("invoice_payment").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payment: Stripeinvoices_payments_invoice_payment_associated_payment,
        status: Schema.String.annotate({
          description:
            "The status of the payment, one of `open`, `paid`, or `canceled`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status_transitions:
          Stripeinvoices_payments_invoice_payment_status_transitions,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Invoice Payment",
      description:
        "Invoice Payments represent payments made against invoices. Invoice Payments can\nbe accessed in two ways:\n1. By expanding the `payments` field on the [Invoice](https://docs.stripe.com/api#invoice) resource.\n2. By using the Invoice Payment retrieve and list endpoints.\n\nInvoice Payments include the mapping between payment objects, such as Payment Intent, and Invoices.\nThis resource and its endpoints allows you to easily track if a payment is associated with a specific invoice and\nmonitor the allocation details of the payments.",
      identifier: "Stripeinvoice_payment",
    }),
);
export const Stripeinvoices_resource_from_invoice = Schema.StructWithRest(
  Schema.Struct({
    action: Schema.String.annotate({
      description: "The relation between this invoice and the cloned invoice",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    invoice: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
    ]).annotate({ description: "The invoice that was cloned." }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "InvoicesResourceFromInvoice",
  description: "",
  identifier: "Stripeinvoices_resource_from_invoice",
});
export const Stripeinvoice_setting_custom_field = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String.annotate({
      description: "The name of the custom field.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    value: Schema.String.annotate({
      description: "The value of the custom field.",
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
  title: "InvoiceSettingCustomField",
  description: "",
  identifier: "Stripeinvoice_setting_custom_field",
});
export const Stripeinvoice_setting_customer_rendering_options =
  Schema.StructWithRest(
    Schema.Struct({
      amount_tax_display: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "How line-item prices and amounts will be displayed with respect to tax on invoice PDFs.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      template: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "ID of the invoice rendering template to be used for this customer's invoices. If set, the template will be used on all invoices for this customer unless a template is set directly on the invoice.",
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
    title: "InvoiceSettingCustomerRenderingOptions",
    description: "",
    identifier: "Stripeinvoice_setting_customer_rendering_options",
  });
export const Stripeinvoices_resource_confirmation_secret =
  Schema.StructWithRest(
    Schema.Struct({
      client_secret: Schema.String.annotate({
        description:
          "The client_secret of the payment that Stripe creates for the invoice after finalization.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      type: Schema.String.annotate({
        description:
          "The type of client_secret. Currently this is always payment_intent, referencing the default payment_intent that Stripe creates during invoice finalization",
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
    title: "InvoicesResourceConfirmationSecret",
    description: "",
    identifier: "Stripeinvoices_resource_confirmation_secret",
  });
export const Stripeinvoices_resource_invoice_tax_id = Schema.StructWithRest(
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
  title: "InvoicesResourceInvoiceTaxID",
  description: "",
  identifier: "Stripeinvoices_resource_invoice_tax_id",
});
export const Stripeinvoice_line_item_period = Schema.StructWithRest(
  Schema.Struct({
    end: Schema.Number.annotate({
      description:
        "The end of the period, which must be greater than or equal to the start. This value is inclusive.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    start: Schema.Number.annotate({
      description: "The start of the period. This value is inclusive.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "InvoiceLineItemPeriod",
  description: "",
  identifier: "Stripeinvoice_line_item_period",
});
export const Stripeinvoice_payment_method_options_acss_debit_mandate_options =
  Schema.StructWithRest(
    Schema.Struct({
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
    title: "invoice_payment_method_options_acss_debit_mandate_options",
    description: "",
    identifier:
      "Stripeinvoice_payment_method_options_acss_debit_mandate_options",
  });
export const Stripeinvoice_payment_method_options_bancontact =
  Schema.StructWithRest(
    Schema.Struct({
      preferred_language: Schema.Literals(["de", "en", "fr", "nl"]).annotate({
        description:
          "Preferred language of the Bancontact authorization page that the customer is redirected to.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "invoice_payment_method_options_bancontact",
    description: "",
    identifier: "Stripeinvoice_payment_method_options_bancontact",
  });
export const Stripeinvoice_payment_method_options_billie_company_details_registered_address =
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
              "Address line 1 (for example, street, PO Box, or company name).",
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
              "Address line 2 (for example, apartment, suite, unit, or building).",
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
      "invoice_payment_method_options_billie_company_details_registered_address",
    description: "",
    identifier:
      "Stripeinvoice_payment_method_options_billie_company_details_registered_address",
  });
export const Stripeinvoice_payment_method_options_blik = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "invoice_payment_method_options_blik",
  description: "",
  identifier: "Stripeinvoice_payment_method_options_blik",
});
export const Stripeinvoice_installments_card = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description: "Whether Installments are enabled for this Invoice.",
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
  title: "invoice_installments_card",
  description: "",
  identifier: "Stripeinvoice_installments_card",
});
export const Stripeinvoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      country: Schema.Literals(["BE", "DE", "ES", "FR", "IE", "NL"]).annotate({
        description:
          "The desired country code of the bank account information. Permitted values include: `DE`, `FR`, `IE`, or `NL`.",
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
      "invoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer",
    description: "",
    identifier:
      "Stripeinvoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer",
  });
export const Stripeinvoice_payment_method_options_konbini = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "invoice_payment_method_options_konbini",
  description: "",
  identifier: "Stripeinvoice_payment_method_options_konbini",
});
export const Stripeinvoice_mandate_options_payto = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The maximum amount that can be collected in a single invoice. If you don't specify a maximum, then there is no limit.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    amount_type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["fixed", "maximum"]).annotate({
          description: "Only `maximum` is supported.",
        }),
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
  title: "invoice_mandate_options_payto",
  description: "",
  identifier: "Stripeinvoice_mandate_options_payto",
});
export const Stripeinvoice_payment_method_options_pix = Schema.StructWithRest(
  Schema.Struct({
    amount_includes_iof: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["always", "never"]).annotate({
          description: "Determines if the amount includes the IOF tax.",
        }),
        Schema.Null,
      ]),
    ),
    expires_after_seconds: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The number of seconds after PaymentIntent confirmation when the Pix expires (between 60 and 1209600, inclusive). If unspecified, defaults to 14400 seconds (4 hours).",
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
  title: "invoice_payment_method_options_pix",
  description: "",
  identifier: "Stripeinvoice_payment_method_options_pix",
});
export const Stripeinvoice_payment_method_options_sepa_debit = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "invoice_payment_method_options_sepa_debit",
  description: "",
  identifier: "Stripeinvoice_payment_method_options_sepa_debit",
});
export const Stripeinvoice_payment_method_options_mandate_options_upi =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Amount to be charged for future payments.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      amount_type: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["fixed", "maximum"]).annotate({
            description:
              "One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.",
          }),
          Schema.Null,
        ]),
      ),
      description: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A description of the mandate or subscription that is meant to be displayed to the customer.",
          }).check(
            Schema.isMaxCodePoints(20).annotate({
              expected: "a string with at most 20 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      end_date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "End date of the mandate or subscription.",
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
    title: "invoice_payment_method_options_mandate_options_upi",
    description: "",
    identifier: "Stripeinvoice_payment_method_options_mandate_options_upi",
  });
export const Stripeinvoice_payment_method_options_us_bank_account_linked_account_options_filters =
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
      "invoice_payment_method_options_us_bank_account_linked_account_options_filters",
    description: "",
    identifier:
      "Stripeinvoice_payment_method_options_us_bank_account_linked_account_options_filters",
  });
export const Stripeinvoices_payments_invoice_payment_associated_payment =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoices_payments_invoice_payment_associated_payment> =>
      Schema.StructWithRest(
        Schema.Struct({
          charge: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecharge,
            ]).annotate({
              description:
                "ID of the successful charge for this payment when `type` is `charge`. Note: charge is only surfaced if the charge object is not associated with a payment intent. If the charge object does have a payment intent, the Invoice Payment surfaces the payment intent instead.",
            }),
          ),
          payment_intent: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripepayment_intent,
            ]).annotate({
              description:
                "ID of the PaymentIntent associated with this payment when `type` is `payment_intent`. Note: This property is only populated for invoices finalized on or after March 15th, 2019.",
            }),
          ),
          payment_record: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripepayment_record,
            ]).annotate({
              description:
                "ID of the PaymentRecord associated with this payment when `type` is `payment_record`.",
            }),
          ),
          type: Schema.Literals([
            "charge",
            "payment_intent",
            "payment_record",
          ]).annotate({
            description:
              "Type of payment object associated with this invoice payment.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "InvoicesPaymentsInvoicePaymentAssociatedPayment",
        description: "",
        identifier:
          "Stripeinvoices_payments_invoice_payment_associated_payment",
      }),
  );
export const Stripeinvoices_payments_invoice_payment_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      canceled_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The time that the payment was canceled.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      paid_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The time that the payment succeeded.",
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
    title: "InvoicesPaymentsInvoicePaymentStatusTransitions",
    description: "",
    identifier: "Stripeinvoices_payments_invoice_payment_status_transitions",
  });
export const Stripeinvoice_rendering_pdf = Schema.StructWithRest(
  Schema.Struct({
    page_size: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["a4", "auto", "letter"]).annotate({
          description:
            "Page size of invoice pdf. Options include a4, letter, and auto. If set to auto, page size will be switched to a4 or letter based on customer locale.",
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
  title: "Invoice Rendering Pdf Resource",
  description: "",
  identifier: "Stripeinvoice_rendering_pdf",
});
export const Stripeinvoices_resource_uncollectible_status_details =
  Schema.StructWithRest(
    Schema.Struct({
      reason: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "max_payment_attempts",
            "payment_not_received",
            "subscription_canceled",
            "subscription_paused",
            "user_forgiven",
          ]).annotate({
            description: "The reason why the invoice is uncollectible.",
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
    title: "InvoicesResourceUncollectibleStatusDetails",
    description: "",
    identifier: "Stripeinvoices_resource_uncollectible_status_details",
  });
export const Stripeinvoices_resource_status_transitions = Schema.StructWithRest(
  Schema.Struct({
    finalized_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The time that the invoice draft was finalized.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    marked_uncollectible_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The time that the invoice was marked uncollectible.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    paid_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The time that the invoice was paid.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    voided_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The time that the invoice was voided.",
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
  title: "InvoicesResourceStatusTransitions",
  description: "",
  identifier: "Stripeinvoices_resource_status_transitions",
});
export const Stripeinvoice_item_threshold_reason = Schema.StructWithRest(
  Schema.Struct({
    line_item_ids: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "The IDs of the line items that triggered the threshold invoice.",
    }),
    usage_gte: Schema.Number.annotate({
      description:
        "The quantity threshold boundary that applied to the given line item.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "InvoiceItemThresholdReason",
  description: "",
  identifier: "Stripeinvoice_item_threshold_reason",
});
export const Stripeinvoice_mandate_options_card = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Amount to be charged for future payments, specified in the presentment currency.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    amount_type: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["fixed", "maximum"]).annotate({
          description:
            "One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.",
        }),
        Schema.Null,
      ]),
    ),
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
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "invoice_mandate_options_card",
  description: "",
  identifier: "Stripeinvoice_mandate_options_card",
});
export const Stripeinvoice_setting_checkout_rendering_options =
  Schema.StructWithRest(
    Schema.Struct({
      amount_tax_display: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "How line-item prices and amounts will be displayed with respect to tax on invoice PDFs.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      template: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "ID of the invoice rendering template to be used for the generated invoice.",
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
    title: "invoice_setting_checkout_rendering_options",
    description: "",
    identifier: "Stripeinvoice_setting_checkout_rendering_options",
  });
export const Stripeinvoice_setting_customer_setting = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_setting_customer_setting> =>
    Schema.StructWithRest(
      Schema.Struct({
        custom_fields: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeinvoice_setting_custom_field).annotate({
              description:
                "Default custom fields to be displayed on invoices for this customer.",
            }),
            Schema.Null,
          ]),
        ),
        default_payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripepayment_method,
              Schema.Null,
            ]).annotate({
              description:
                "ID of a payment method that's attached to the customer, to be used as the customer's default payment method for subscriptions and invoices.",
            }),
            Schema.Null,
          ]),
        ),
        footer: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Default footer to be displayed on invoices for this customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        rendering_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_setting_customer_rendering_options,
              Schema.Null,
            ]).annotate({
              description:
                "Default options for invoice PDF rendering for this customer.",
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
      title: "InvoiceSettingCustomerSetting",
      description: "",
      identifier: "Stripeinvoice_setting_customer_setting",
    }),
);
export const Stripeinvoice_setting_quote_setting = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_setting_quote_setting> =>
    Schema.StructWithRest(
      Schema.Struct({
        custom_fields: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeinvoice_setting_custom_field).annotate({
              description:
                "A list of up to 4 custom fields to be displayed on the invoice.",
            }),
            Schema.Null,
          ]),
        ),
        days_until_due: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Number of days within which a customer must pay invoices generated by this quote. This value will be `null` for quotes where `collection_method=charge_automatically`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
      title: "InvoiceSettingQuoteSetting",
      description: "",
      identifier: "Stripeinvoice_setting_quote_setting",
    }),
);
export const Stripeinvoice_setting_subscription_schedule_setting =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoice_setting_subscription_schedule_setting> =>
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
                  "The account tax IDs associated with the subscription schedule. Will be set on invoices generated by the subscription schedule.",
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
          days_until_due: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "Number of days within which a customer must pay invoices generated by this subscription schedule. This value will be `null` for subscription schedules where `billing=charge_automatically`.",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        title: "InvoiceSettingSubscriptionScheduleSetting",
        description: "",
        identifier: "Stripeinvoice_setting_subscription_schedule_setting",
      }),
  );
export const Stripeinvoice_setting_subscription_schedule_phase_setting =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoice_setting_subscription_schedule_phase_setting> =>
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
                  "The account tax IDs associated with this phase of the subscription schedule. Will be set on invoices generated by this phase of the subscription schedule.",
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
          days_until_due: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "Number of days within which a customer must pay invoices generated by this subscription schedule. This value will be `null` for subscription schedules where `billing=charge_automatically`.",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "InvoiceSettingSubscriptionSchedulePhaseSetting",
        description: "",
        identifier: "Stripeinvoice_setting_subscription_schedule_phase_setting",
      }),
  );
export const Stripeinvoice_payment_method_options_acss_debit = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_payment_method_options_acss_debit> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripeinvoice_payment_method_options_acss_debit_mandate_options,
        ),
        verification_method: Schema.optionalKey(
          Schema.Literals(["automatic", "instant", "microdeposits"]).annotate({
            description:
              "Bank account verification method. The default value is `automatic`.",
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
      title: "invoice_payment_method_options_acss_debit",
      description: "",
      identifier: "Stripeinvoice_payment_method_options_acss_debit",
    }),
);
export const Stripeinvoice_payment_method_options_billie_company_details =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoice_payment_method_options_billie_company_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          registered_address: Schema.optionalKey(
            Stripeinvoice_payment_method_options_billie_company_details_registered_address,
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
              Schema.String.annotate({ description: "VAT ID number." }).check(
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
        title: "invoice_payment_method_options_billie_company_details",
        description: "",
        identifier:
          "Stripeinvoice_payment_method_options_billie_company_details",
      }),
  );
export const Stripeinvoice_payment_method_options_card = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_payment_method_options_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        installments: Schema.optionalKey(Stripeinvoice_installments_card),
        request_three_d_secure: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["any", "automatic", "challenge"]).annotate({
              description:
                "We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/payments/3d-secure/authentication-flow#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.",
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
      title: "invoice_payment_method_options_card",
      description: "",
      identifier: "Stripeinvoice_payment_method_options_card",
    }),
);
export const Stripeinvoice_payment_method_options_customer_balance_bank_transfer =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoice_payment_method_options_customer_balance_bank_transfer> =>
      Schema.StructWithRest(
        Schema.Struct({
          eu_bank_transfer: Schema.optionalKey(
            Stripeinvoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer,
          ),
          type: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The bank transfer type that can be used for funding. Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.",
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
        title: "invoice_payment_method_options_customer_balance_bank_transfer",
        description: "",
        identifier:
          "Stripeinvoice_payment_method_options_customer_balance_bank_transfer",
      }),
  );
export const Stripeinvoice_payment_method_options_payto = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_payment_method_options_payto> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripeinvoice_mandate_options_payto,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "invoice_payment_method_options_payto",
      description: "",
      identifier: "Stripeinvoice_payment_method_options_payto",
    }),
);
export const Stripeinvoice_payment_method_options_upi = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_payment_method_options_upi> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripeinvoice_payment_method_options_mandate_options_upi,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "invoice_payment_method_options_upi",
      description: "",
      identifier: "Stripeinvoice_payment_method_options_upi",
    }),
);
export const Stripeinvoice_payment_method_options_us_bank_account_linked_account_options =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoice_payment_method_options_us_bank_account_linked_account_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          filters: Schema.optionalKey(
            Stripeinvoice_payment_method_options_us_bank_account_linked_account_options_filters,
          ),
          permissions: Schema.optionalKey(
            Schema.Array(
              Schema.Literals([
                "balances",
                "ownership",
                "payment_method",
                "transactions",
              ]),
            ).annotate({
              description:
                "The list of permissions to request. The `payment_method` permission must be included.",
            }),
          ),
          prefetch: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.Literals(["balances", "ownership", "transactions"]),
              ).annotate({
                description:
                  "Data features requested to be retrieved upon account creation.",
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
          "invoice_payment_method_options_us_bank_account_linked_account_options",
        description: "",
        identifier:
          "Stripeinvoice_payment_method_options_us_bank_account_linked_account_options",
      }),
  );
export const Stripeinvoices_resource_invoice_rendering = Schema.suspend(
  (): Schema.Codec<Stripeinvoices_resource_invoice_rendering> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_tax_display: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "How line-item prices and amounts will be displayed with respect to tax on invoice PDFs.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        pdf: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoice_rendering_pdf]).annotate({
              description: "Invoice pdf rendering options",
            }),
            Schema.Null,
          ]),
        ),
        template: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the rendering template that the invoice is formatted by.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        template_version: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Version of the rendering template that the invoice is using.",
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
      title: "InvoicesResourceInvoiceRendering",
      description: "",
      identifier: "Stripeinvoices_resource_invoice_rendering",
    }),
);
export const Stripeinvoices_resource_status_details = Schema.suspend(
  (): Schema.Codec<Stripeinvoices_resource_status_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        uncollectible: Schema.optionalKey(
          Stripeinvoices_resource_uncollectible_status_details,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "InvoicesResourceStatusDetails",
      description: "",
      identifier: "Stripeinvoices_resource_status_details",
    }),
);
export const Stripeinvoice_threshold_reason = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_threshold_reason> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_gte: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The total invoice amount threshold boundary if it triggered the threshold invoice.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        item_reasons: Schema.Array(
          Stripeinvoice_item_threshold_reason,
        ).annotate({
          description:
            "Indicates which line items triggered a threshold invoice.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "InvoiceThresholdReason",
      description: "",
      identifier: "Stripeinvoice_threshold_reason",
    }),
);
export const Stripeinvoice_item_proration_credited_items = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_item_proration_credited_items> =>
    Schema.StructWithRest(
      Schema.Struct({
        invoice_item: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "When `type` is `invoice_item`, the invoice item id for the debited invoice item corresponding to this credit proration.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        invoice_line_item_details: Schema.optionalKey(
          Stripecredited_items_invoice_line_items,
        ),
        type: Schema.Literals(["invoice_item", "invoice_line_items"]).annotate({
          description:
            "Whether the credit references a pending invoice item or one or more invoice line items on an invoice.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "InvoiceItemProrationCreditedItems",
      description: "",
      identifier: "Stripeinvoice_item_proration_credited_items",
    }),
);
export const Stripeinvoice_payment_method_options_billie = Schema.suspend(
  (): Schema.Codec<Stripeinvoice_payment_method_options_billie> =>
    Schema.StructWithRest(
      Schema.Struct({
        company_details: Schema.optionalKey(
          Stripeinvoice_payment_method_options_billie_company_details,
        ),
        reference: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An identifier or reference that this payment corresponds to.",
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
      title: "invoice_payment_method_options_billie",
      description: "",
      identifier: "Stripeinvoice_payment_method_options_billie",
    }),
);
export const Stripeinvoice_payment_method_options_customer_balance =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoice_payment_method_options_customer_balance> =>
      Schema.StructWithRest(
        Schema.Struct({
          bank_transfer: Schema.optionalKey(
            Stripeinvoice_payment_method_options_customer_balance_bank_transfer,
          ),
          funding_type: Schema.optionalKey(
            Schema.Union([
              Schema.Literal("bank_transfer").annotate({
                description:
                  "The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.",
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
        title: "invoice_payment_method_options_customer_balance",
        description: "",
        identifier: "Stripeinvoice_payment_method_options_customer_balance",
      }),
  );
export const Stripeinvoice_payment_method_options_us_bank_account =
  Schema.suspend(
    (): Schema.Codec<Stripeinvoice_payment_method_options_us_bank_account> =>
      Schema.StructWithRest(
        Schema.Struct({
          financial_connections: Schema.optionalKey(
            Stripeinvoice_payment_method_options_us_bank_account_linked_account_options,
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
        title: "invoice_payment_method_options_us_bank_account",
        description: "",
        identifier: "Stripeinvoice_payment_method_options_us_bank_account",
      }),
  );
export const Stripeinvoices_payment_method_options = Schema.suspend(
  (): Schema.Codec<Stripeinvoices_payment_method_options> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_payment_method_options_acss_debit,
            ]).annotate({
              description:
                "If paying by `acss_debit`, this sub-hash contains details about the Canadian pre-authorized debit payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        bancontact: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_payment_method_options_bancontact,
            ]).annotate({
              description:
                "If paying by `bancontact`, this sub-hash contains details about the Bancontact payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        billie: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_payment_method_options_billie,
            ]).annotate({
              description:
                "If paying by `billie`, this sub-hash contains details about the Billie payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        blik: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoice_payment_method_options_blik]).annotate({
              description:
                "If paying by `blik`, this sub-hash contains details about the Blik payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        card: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoice_payment_method_options_card]).annotate({
              description:
                "If paying by `card`, this sub-hash contains details about the Card payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        customer_balance: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_payment_method_options_customer_balance,
            ]).annotate({
              description:
                "If paying by `customer_balance`, this sub-hash contains details about the Bank transfer payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        konbini: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_payment_method_options_konbini,
            ]).annotate({
              description:
                "If paying by `konbini`, this sub-hash contains details about the Konbini payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        payto: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoice_payment_method_options_payto]).annotate(
              {
                description:
                  "If paying by `payto`, this sub-hash contains details about the PayTo payment method options to pass to the invoice’s PaymentIntent.",
              },
            ),
            Schema.Null,
          ]),
        ),
        pix: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoice_payment_method_options_pix]).annotate({
              description:
                "If paying by `pix`, this sub-hash contains details about the Pix payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        sepa_debit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_payment_method_options_sepa_debit,
            ]).annotate({
              description:
                "If paying by `sepa_debit`, this sub-hash contains details about the SEPA Direct Debit payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        upi: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoice_payment_method_options_upi]).annotate({
              description:
                "If paying by `upi`, this sub-hash contains details about the UPI payment method options to pass to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        us_bank_account: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_payment_method_options_us_bank_account,
            ]).annotate({
              description:
                "If paying by `us_bank_account`, this sub-hash contains details about the ACH direct debit payment method options to pass to the invoice’s PaymentIntent.",
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
      title: "InvoicesPaymentMethodOptions",
      description: "",
      identifier: "Stripeinvoices_payment_method_options",
    }),
);
export const Stripeinvoices_resource_shipping_cost = Schema.suspend(
  (): Schema.Codec<Stripeinvoices_resource_shipping_cost> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_subtotal: Schema.Number.annotate({
          description: "Total shipping cost before any taxes are applied.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_tax: Schema.Number.annotate({
          description:
            "Total tax amount applied due to shipping costs. If no tax was applied, defaults to 0.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_total: Schema.Number.annotate({
          description: "Total shipping cost after taxes are applied.",
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
              description: "The ID of the ShippingRate for this invoice.",
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
      title: "InvoicesResourceShippingCost",
      description: "",
      identifier: "Stripeinvoices_resource_shipping_cost",
    }),
);
export const Stripeinvoiceitem = Schema.suspend(
  (): Schema.Codec<Stripeinvoiceitem> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "Amount (in the `currency` specified) of the invoice item. This should always be equal to `unit_amount * quantity`.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripecustomer,
          Stripedeleted_customer,
        ]).annotate({
          description: "The ID of the customer to bill for this invoice item.",
        }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of the account to bill for this invoice item.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        date: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        discountable: Schema.Boolean.annotate({
          description:
            "If true, discounts will apply to this invoice item. Always false for prorations.",
        }),
        discounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripediscount,
              ]),
            ).annotate({
              description:
                "The discounts which apply to the invoice item. Item discounts are applied before invoice discounts. Use `expand[]=discounts` to expand each discount.",
            }),
            Schema.Null,
          ]),
        ),
        frozen_fields: Schema.optionalKey(
          Schema.Array(
            Schema.Literals(["discounts", "pricing", "quantity"]),
          ).annotate({
            description:
              "Array of field names that can't be modified. Attempting to update a frozen field returns an error.",
          }),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeinvoice,
            ]).annotate({
              description:
                "The ID of the invoice this invoice item belongs to.",
            }),
            Schema.Null,
          ]),
        ),
        invoicing_rules: Schema.optionalKey(
          Schema.Array(Stripeinvoicing_rule).annotate({
            description:
              "The rules that control when this invoice item is eligible for invoicing. All rules must be satisfied for the item to be invoiced.",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
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
        net_amount: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The amount after discounts, but before credits and taxes. This field is `null` for `discountable=true` items.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        object: Schema.Literal("invoiceitem").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        parent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebilling_bill_resource_invoice_item_parents_invoice_item_parent,
            ]).annotate({
              description: "The parent that generated this invoice item.",
            }),
            Schema.Null,
          ]),
        ),
        period: Stripeinvoice_line_item_period,
        pricing: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebilling_bill_resource_invoicing_pricing_pricing,
            ]).annotate({
              description: "The pricing information of the invoice item.",
            }),
            Schema.Null,
          ]),
        ),
        proration: Schema.Boolean.annotate({
          description:
            "Whether the invoice item was created automatically as a proration adjustment when the customer switched plans.",
        }),
        proration_details: Schema.optionalKey(Stripeproration_details),
        quantity: Schema.Number.annotate({
          description:
            "Quantity of units for the invoice item in integer format, with any decimal precision truncated. For the item's full-precision decimal quantity, use `quantity_decimal`. This field will be deprecated in favor of `quantity_decimal` in a future version. If the invoice item is a proration, the quantity of the subscription that the proration was computed for.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        quantity_decimal: Schema.String.annotate({
          description:
            "Non-negative decimal with at most 12 decimal places. The quantity of units for the invoice item.",
          format: "decimal",
        }),
        tax_rates: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripetax_rate).annotate({
              description:
                "The tax rates which apply to the invoice item. When set, the `default_tax_rates` on the invoice do not apply to this invoice item.",
            }),
            Schema.Null,
          ]),
        ),
        test_clock: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetest_helpers_test_clock,
            ]).annotate({
              description: "ID of the test clock this invoice item belongs to.",
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
      title: "Invoice Item",
      description:
        "Invoice Items represent the component lines of an [invoice](https://docs.stripe.com/api/invoices). When you create an invoice item with an `invoice` field, it is attached to the specified invoice and included as [an invoice line item](https://docs.stripe.com/api/invoices/line_item) within [invoice.lines](https://docs.stripe.com/api/invoices/object#invoice_object-lines).\n\nInvoice Items can be created before you are ready to actually send the invoice. This can be particularly useful when combined\nwith a [subscription](https://docs.stripe.com/api/subscriptions). Sometimes you want to add a charge or credit to a customer, but actually charge\nor credit the customer's card only at the end of a regular billing cycle. This is useful for combining several charges\n(to minimize per-transaction fees), or for having Stripe tabulate your usage-based billing totals.\n\nRelated guides: [Integrate with the Invoicing API](https://docs.stripe.com/invoicing/integration), [Subscription Invoices](https://docs.stripe.com/billing/invoices/subscription#adding-upcoming-invoice-items).",
      identifier: "Stripeinvoiceitem",
    }),
);
export const Stripeinvoices_payment_settings = Schema.suspend(
  (): Schema.Codec<Stripeinvoices_payment_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        default_mandate: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the mandate to be used for this invoice. It must correspond to the payment method used to pay the invoice, including the invoice's default_payment_method or default_source, if set.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinvoices_payment_method_options]).annotate({
              description:
                "Payment-method-specific configuration to provide to the invoice’s PaymentIntent.",
            }),
            Schema.Null,
          ]),
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
            ).annotate({
              description:
                "The list of payment method types (e.g. card) to provide to the invoice’s PaymentIntent. If not set, Stripe attempts to automatically determine the types to use by looking at the invoice’s default payment method, the subscription’s default payment method, the customer’s default payment method, and your [invoice template settings](https://dashboard.stripe.com/settings/billing/invoice).",
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
      title: "InvoicesPaymentSettings",
      description: "",
      identifier: "Stripeinvoices_payment_settings",
    }),
);
