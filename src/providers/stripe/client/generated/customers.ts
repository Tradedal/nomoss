// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripetax_id } from "./models/catalog.js";
import {
  Stripecash_balance,
  Stripedeleted_discount,
  Stripedeleted_payment_source,
  Stripedeleted_tax_id,
  Stripediscount,
  Stripeerror,
  Stripefunding_instructions,
} from "./models/common.js";
import {
  Stripecustomer,
  Stripecustomer_balance_transaction,
  Stripecustomer_cash_balance_transaction,
  Stripedeleted_customer,
} from "./models/customers.js";
import { Stripepayment_method } from "./models/paymentMethods.js";
import { Stripebank_account, Stripecard } from "./models/paymentSources.js";
import { Stripepayment_source } from "./models/payments.js";
import { Stripesource } from "./models/sources.js";
import { Stripesubscription } from "./models/subscriptions.js";

export type GetCustomersInput = {
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly email?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly test_clock?: string;
};
export type GetCustomersOutput = {
  readonly data: ReadonlyArray<Stripecustomer>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersError = Stripeerror;
export type PostCustomersInput = {
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
  readonly balance?: number;
  readonly business_name?: string | "";
  readonly cash_balance?: {
    readonly settings?: {
      readonly reconciliation_mode?:
        | "automatic"
        | "manual"
        | "merchant_default";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly description?: string;
  readonly email?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly individual_name?: string | "";
  readonly invoice_prefix?: string;
  readonly invoice_settings?: {
    readonly custom_fields?:
      | ReadonlyArray<
          { readonly name: string; readonly value: string } & {
            readonly [x: string]: Schema.Json;
          }
        >
      | "";
    readonly default_payment_method?: string;
    readonly footer?: string;
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
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly next_invoice_sequence?: number;
  readonly payment_method?: string;
  readonly phone?: string;
  readonly preferred_locales?: ReadonlyArray<string>;
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
  readonly source?: string;
  readonly tax?: {
    readonly ip_address?: string | "";
    readonly validate_location?: "deferred" | "immediately";
  } & { readonly [x: string]: Schema.Json };
  readonly tax_exempt?: "" | "exempt" | "none" | "reverse";
  readonly tax_id_data?: ReadonlyArray<
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
  readonly test_clock?: string;
};
export type PostCustomersOutput = Stripecustomer;
export type PostCustomersError = Stripeerror;
export type GetCustomersSearchInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly page?: string;
  readonly query: string;
};
export type GetCustomersSearchOutput = {
  readonly data: ReadonlyArray<Stripecustomer>;
  readonly has_more: boolean;
  readonly next_page?: string | null;
  readonly object: "search_result";
  readonly total_count?: number;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersSearchError = Stripeerror;
export type GetCustomersCustomerInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetCustomersCustomerOutput =
  | Stripecustomer
  | Stripedeleted_customer;
export type GetCustomersCustomerError = Stripeerror;
export type PostCustomersCustomerInput = {
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
  readonly balance?: number;
  readonly bank_account?:
    | ({
        readonly account_holder_name?: string;
        readonly account_holder_type?: "company" | "individual";
        readonly account_number: string;
        readonly country: string;
        readonly currency?: string;
        readonly object?: "bank_account";
        readonly routing_number?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly business_name?: string | "";
  readonly card?:
    | ({
        readonly address_city?: string;
        readonly address_country?: string;
        readonly address_line1?: string;
        readonly address_line2?: string;
        readonly address_state?: string;
        readonly address_zip?: string;
        readonly cvc?: string;
        readonly encrypted?: string;
        readonly exp_month: number;
        readonly exp_year: number;
        readonly metadata?: { readonly [x: string]: string };
        readonly name?: string;
        readonly network_token?: { readonly number?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly number: string;
        readonly object?: "card";
        readonly swipe_data?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly cash_balance?: {
    readonly settings?: {
      readonly reconciliation_mode?:
        | "automatic"
        | "manual"
        | "merchant_default";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly default_alipay_account?: string;
  readonly default_bank_account?: string;
  readonly default_card?: string;
  readonly default_source?: string;
  readonly description?: string;
  readonly email?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly individual_name?: string | "";
  readonly invoice_prefix?: string;
  readonly invoice_settings?: {
    readonly custom_fields?:
      | ReadonlyArray<
          { readonly name: string; readonly value: string } & {
            readonly [x: string]: Schema.Json;
          }
        >
      | "";
    readonly default_payment_method?: string;
    readonly footer?: string;
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
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly next_invoice_sequence?: number;
  readonly phone?: string;
  readonly preferred_locales?: ReadonlyArray<string>;
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
  readonly source?: string;
  readonly tax?: {
    readonly ip_address?: string | "";
    readonly validate_location?: "auto" | "deferred" | "immediately";
  } & { readonly [x: string]: Schema.Json };
  readonly tax_exempt?: "" | "exempt" | "none" | "reverse";
  readonly customer: string;
};
export type PostCustomersCustomerOutput = Stripecustomer;
export type PostCustomersCustomerError = Stripeerror;
export type DeleteCustomersCustomerInput = { readonly customer: string };
export type DeleteCustomersCustomerOutput = Stripedeleted_customer;
export type DeleteCustomersCustomerError = Stripeerror;
export type GetCustomersCustomerBalanceTransactionsInput = {
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly invoice?: string;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCustomersCustomerBalanceTransactionsOutput = {
  readonly data: ReadonlyArray<Stripecustomer_balance_transaction>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerBalanceTransactionsError = Stripeerror;
export type PostCustomersCustomerBalanceTransactionsInput = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly customer: string;
};
export type PostCustomersCustomerBalanceTransactionsOutput =
  Stripecustomer_balance_transaction;
export type PostCustomersCustomerBalanceTransactionsError = Stripeerror;
export type GetCustomersCustomerBalanceTransactionsTransactionInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly transaction: string;
};
export type GetCustomersCustomerBalanceTransactionsTransactionOutput =
  Stripecustomer_balance_transaction;
export type GetCustomersCustomerBalanceTransactionsTransactionError =
  Stripeerror;
export type PostCustomersCustomerBalanceTransactionsTransactionInput = {
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly customer: string;
  readonly transaction: string;
};
export type PostCustomersCustomerBalanceTransactionsTransactionOutput =
  Stripecustomer_balance_transaction;
export type PostCustomersCustomerBalanceTransactionsTransactionError =
  Stripeerror;
export type GetCustomersCustomerBankAccountsInput = {
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCustomersCustomerBankAccountsOutput = {
  readonly data: ReadonlyArray<Stripebank_account>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerBankAccountsError = Stripeerror;
export type PostCustomersCustomerBankAccountsInput = {
  readonly alipay_account?: string;
  readonly bank_account?:
    | ({
        readonly account_holder_name?: string;
        readonly account_holder_type?: "company" | "individual";
        readonly account_number: string;
        readonly country: string;
        readonly currency?: string;
        readonly object?: "bank_account";
        readonly routing_number?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly card?:
    | ({
        readonly address_city?: string;
        readonly address_country?: string;
        readonly address_line1?: string;
        readonly address_line2?: string;
        readonly address_state?: string;
        readonly address_zip?: string;
        readonly cvc?: string;
        readonly encrypted?: string;
        readonly exp_month: number;
        readonly exp_year: number;
        readonly metadata?: { readonly [x: string]: string };
        readonly name?: string;
        readonly network_token?: { readonly number?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly number: string;
        readonly object?: "card";
        readonly swipe_data?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly source?: string;
  readonly customer: string;
};
export type PostCustomersCustomerBankAccountsOutput = Stripepayment_source;
export type PostCustomersCustomerBankAccountsError = Stripeerror;
export type GetCustomersCustomerBankAccountsIdInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetCustomersCustomerBankAccountsIdOutput = Stripebank_account;
export type GetCustomersCustomerBankAccountsIdError = Stripeerror;
export type PostCustomersCustomerBankAccountsIdInput = {
  readonly account_holder_name?: string;
  readonly account_holder_type?: "company" | "individual";
  readonly address_city?: string;
  readonly address_country?: string;
  readonly address_line1?: string;
  readonly address_line2?: string;
  readonly address_state?: string;
  readonly address_zip?: string;
  readonly exp_month?: string;
  readonly exp_year?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly owner?: {
    readonly address?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly email?: string;
    readonly name?: string;
    readonly phone?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly customer: string;
  readonly id: string;
};
export type PostCustomersCustomerBankAccountsIdOutput =
  | Stripecard
  | Stripebank_account
  | Stripesource;
export type PostCustomersCustomerBankAccountsIdError = Stripeerror;
export type DeleteCustomersCustomerBankAccountsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly customer: string;
  readonly id: string;
};
export type DeleteCustomersCustomerBankAccountsIdOutput =
  | Stripepayment_source
  | Stripedeleted_payment_source;
export type DeleteCustomersCustomerBankAccountsIdError = Stripeerror;
export type PostCustomersCustomerBankAccountsIdVerifyInput = {
  readonly amounts?: ReadonlyArray<number>;
  readonly expand?: ReadonlyArray<string>;
  readonly customer: string;
  readonly id: string;
};
export type PostCustomersCustomerBankAccountsIdVerifyOutput =
  Stripebank_account;
export type PostCustomersCustomerBankAccountsIdVerifyError = Stripeerror;
export type GetCustomersCustomerCardsInput = {
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCustomersCustomerCardsOutput = {
  readonly data: ReadonlyArray<Stripecard>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerCardsError = Stripeerror;
export type PostCustomersCustomerCardsInput = {
  readonly alipay_account?: string;
  readonly bank_account?:
    | ({
        readonly account_holder_name?: string;
        readonly account_holder_type?: "company" | "individual";
        readonly account_number: string;
        readonly country: string;
        readonly currency?: string;
        readonly object?: "bank_account";
        readonly routing_number?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly card?:
    | ({
        readonly address_city?: string;
        readonly address_country?: string;
        readonly address_line1?: string;
        readonly address_line2?: string;
        readonly address_state?: string;
        readonly address_zip?: string;
        readonly cvc?: string;
        readonly encrypted?: string;
        readonly exp_month: number;
        readonly exp_year: number;
        readonly metadata?: { readonly [x: string]: string };
        readonly name?: string;
        readonly network_token?: { readonly number?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly number: string;
        readonly object?: "card";
        readonly swipe_data?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly source?: string;
  readonly customer: string;
};
export type PostCustomersCustomerCardsOutput = Stripepayment_source;
export type PostCustomersCustomerCardsError = Stripeerror;
export type GetCustomersCustomerCardsIdInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetCustomersCustomerCardsIdOutput = Stripecard;
export type GetCustomersCustomerCardsIdError = Stripeerror;
export type PostCustomersCustomerCardsIdInput = {
  readonly account_holder_name?: string;
  readonly account_holder_type?: "company" | "individual";
  readonly address_city?: string;
  readonly address_country?: string;
  readonly address_line1?: string;
  readonly address_line2?: string;
  readonly address_state?: string;
  readonly address_zip?: string;
  readonly exp_month?: string;
  readonly exp_year?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly owner?: {
    readonly address?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly email?: string;
    readonly name?: string;
    readonly phone?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly customer: string;
  readonly id: string;
};
export type PostCustomersCustomerCardsIdOutput =
  | Stripecard
  | Stripebank_account
  | Stripesource;
export type PostCustomersCustomerCardsIdError = Stripeerror;
export type DeleteCustomersCustomerCardsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly customer: string;
  readonly id: string;
};
export type DeleteCustomersCustomerCardsIdOutput =
  | Stripepayment_source
  | Stripedeleted_payment_source;
export type DeleteCustomersCustomerCardsIdError = Stripeerror;
export type GetCustomersCustomerCashBalanceInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetCustomersCustomerCashBalanceOutput = Stripecash_balance;
export type GetCustomersCustomerCashBalanceError = Stripeerror;
export type PostCustomersCustomerCashBalanceInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly settings?: {
    readonly reconciliation_mode?: "automatic" | "manual" | "merchant_default";
  } & { readonly [x: string]: Schema.Json };
  readonly customer: string;
};
export type PostCustomersCustomerCashBalanceOutput = Stripecash_balance;
export type PostCustomersCustomerCashBalanceError = Stripeerror;
export type GetCustomersCustomerCashBalanceTransactionsInput = {
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCustomersCustomerCashBalanceTransactionsOutput = {
  readonly data: ReadonlyArray<Stripecustomer_cash_balance_transaction>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerCashBalanceTransactionsError = Stripeerror;
export type GetCustomersCustomerCashBalanceTransactionsTransactionInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly transaction: string;
};
export type GetCustomersCustomerCashBalanceTransactionsTransactionOutput =
  Stripecustomer_cash_balance_transaction;
export type GetCustomersCustomerCashBalanceTransactionsTransactionError =
  Stripeerror;
export type GetCustomersCustomerDiscountInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetCustomersCustomerDiscountOutput = Stripediscount;
export type GetCustomersCustomerDiscountError = Stripeerror;
export type DeleteCustomersCustomerDiscountInput = {
  readonly customer: string;
};
export type DeleteCustomersCustomerDiscountOutput = Stripedeleted_discount;
export type DeleteCustomersCustomerDiscountError = Stripeerror;
export type PostCustomersCustomerFundingInstructionsInput = {
  readonly bank_transfer: {
    readonly eu_bank_transfer?: { readonly country: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly requested_address_types?: ReadonlyArray<
      "iban" | "sort_code" | "spei" | "zengin"
    >;
    readonly type:
      | "eu_bank_transfer"
      | "gb_bank_transfer"
      | "jp_bank_transfer"
      | "mx_bank_transfer"
      | "us_bank_transfer";
  } & { readonly [x: string]: Schema.Json };
  readonly currency: string;
  readonly expand?: ReadonlyArray<string>;
  readonly funding_type: "bank_transfer";
  readonly customer: string;
};
export type PostCustomersCustomerFundingInstructionsOutput =
  Stripefunding_instructions;
export type PostCustomersCustomerFundingInstructionsError = Stripeerror;
export type GetCustomersCustomerPaymentMethodsInput = {
  readonly allow_redisplay?: "always" | "limited" | "unspecified";
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly type?:
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
    | "custom"
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
};
export type GetCustomersCustomerPaymentMethodsOutput = {
  readonly data: ReadonlyArray<Stripepayment_method>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerPaymentMethodsError = Stripeerror;
export type GetCustomersCustomerPaymentMethodsPaymentMethodInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly payment_method: string;
};
export type GetCustomersCustomerPaymentMethodsPaymentMethodOutput =
  Stripepayment_method;
export type GetCustomersCustomerPaymentMethodsPaymentMethodError = Stripeerror;
export type GetCustomersCustomerSourcesInput = {
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly object?: string;
  readonly starting_after?: string;
};
export type GetCustomersCustomerSourcesOutput = {
  readonly data: ReadonlyArray<Stripebank_account | Stripecard | Stripesource>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerSourcesError = Stripeerror;
export type PostCustomersCustomerSourcesInput = {
  readonly alipay_account?: string;
  readonly bank_account?:
    | ({
        readonly account_holder_name?: string;
        readonly account_holder_type?: "company" | "individual";
        readonly account_number: string;
        readonly country: string;
        readonly currency?: string;
        readonly object?: "bank_account";
        readonly routing_number?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly card?:
    | ({
        readonly address_city?: string;
        readonly address_country?: string;
        readonly address_line1?: string;
        readonly address_line2?: string;
        readonly address_state?: string;
        readonly address_zip?: string;
        readonly cvc?: string;
        readonly encrypted?: string;
        readonly exp_month: number;
        readonly exp_year: number;
        readonly metadata?: { readonly [x: string]: string };
        readonly name?: string;
        readonly network_token?: { readonly number?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly number: string;
        readonly object?: "card";
        readonly swipe_data?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly source?: string;
  readonly customer: string;
};
export type PostCustomersCustomerSourcesOutput = Stripepayment_source;
export type PostCustomersCustomerSourcesError = Stripeerror;
export type GetCustomersCustomerSourcesIdInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetCustomersCustomerSourcesIdOutput = Stripepayment_source;
export type GetCustomersCustomerSourcesIdError = Stripeerror;
export type PostCustomersCustomerSourcesIdInput = {
  readonly account_holder_name?: string;
  readonly account_holder_type?: "company" | "individual";
  readonly address_city?: string;
  readonly address_country?: string;
  readonly address_line1?: string;
  readonly address_line2?: string;
  readonly address_state?: string;
  readonly address_zip?: string;
  readonly exp_month?: string;
  readonly exp_year?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly owner?: {
    readonly address?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly email?: string;
    readonly name?: string;
    readonly phone?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly customer: string;
  readonly id: string;
};
export type PostCustomersCustomerSourcesIdOutput =
  | Stripecard
  | Stripebank_account
  | Stripesource;
export type PostCustomersCustomerSourcesIdError = Stripeerror;
export type DeleteCustomersCustomerSourcesIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly customer: string;
  readonly id: string;
};
export type DeleteCustomersCustomerSourcesIdOutput =
  | Stripepayment_source
  | Stripedeleted_payment_source;
export type DeleteCustomersCustomerSourcesIdError = Stripeerror;
export type PostCustomersCustomerSourcesIdVerifyInput = {
  readonly amounts?: ReadonlyArray<number>;
  readonly expand?: ReadonlyArray<string>;
  readonly customer: string;
  readonly id: string;
};
export type PostCustomersCustomerSourcesIdVerifyOutput = Stripebank_account;
export type PostCustomersCustomerSourcesIdVerifyError = Stripeerror;
export type GetCustomersCustomerSubscriptionsInput = {
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCustomersCustomerSubscriptionsOutput = {
  readonly data: ReadonlyArray<Stripesubscription>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerSubscriptionsError = Stripeerror;
export type PostCustomersCustomerSubscriptionsInput = {
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
          readonly type: "min_item_period_end" | "timestamp";
        } & { readonly [x: string]: Schema.Json };
        readonly start: {
          readonly timestamp?: number;
          readonly type: "max_item_period_start" | "now" | "timestamp";
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
  readonly application_fee_percent?: number | "";
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly backdate_start_date?: number;
  readonly billing_cycle_anchor?: number;
  readonly billing_thresholds?:
    | ({
        readonly amount_gte?: number;
        readonly reset_billing_cycle_anchor?: boolean;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly cancel_at?:
    | number
    | "max_billed_until"
    | "max_period_end"
    | "min_period_end";
  readonly cancel_at_period_end?: boolean;
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly currency?: string;
  readonly days_until_due?: number;
  readonly default_payment_method?: string;
  readonly default_source?: string;
  readonly default_tax_rates?: ReadonlyArray<string> | "";
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
  readonly items?: ReadonlyArray<
    {
      readonly billing_thresholds?:
        | ({ readonly usage_gte: number } & {
            readonly [x: string]: Schema.Json;
          })
        | "";
      readonly current_trial?: { readonly trial_offer: string } & {
        readonly [x: string]: Schema.Json;
      };
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
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly off_session?: boolean;
  readonly payment_behavior?:
    | "allow_incomplete"
    | "default_incomplete"
    | "error_if_incomplete"
    | "pending_if_incomplete";
  readonly payment_settings?: {
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
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly blik?:
        | ({
            readonly mandate_options?: { readonly expires_at?: number } & {
              readonly [x: string]: Schema.Json;
            };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly card?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_type?: "fixed" | "maximum";
              readonly description?: string;
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
            readonly expires_after_seconds?: number;
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_includes_iof?: "always" | "never";
              readonly end_date?: string;
              readonly payment_schedule?:
                | "halfyearly"
                | "monthly"
                | "quarterly"
                | "weekly"
                | "yearly";
            } & { readonly [x: string]: Schema.Json };
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
    readonly save_default_payment_method?: "off" | "on_subscription";
  } & { readonly [x: string]: Schema.Json };
  readonly pending_invoice_item_interval?:
    | ({
        readonly interval: "day" | "month" | "week" | "year";
        readonly interval_count?: number;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
  readonly transfer_data?: {
    readonly amount_percent?: number;
    readonly destination: string;
  } & { readonly [x: string]: Schema.Json };
  readonly trial_end?: "now" | number;
  readonly trial_from_plan?: boolean;
  readonly trial_period_days?: number;
  readonly trial_settings?: {
    readonly end_behavior: {
      readonly billing_cycle_anchor?: "now" | "unchanged";
      readonly missing_payment_method?: "cancel" | "create_invoice" | "pause";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly customer: string;
};
export type PostCustomersCustomerSubscriptionsOutput = Stripesubscription;
export type PostCustomersCustomerSubscriptionsError = Stripeerror;
export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly subscription_exposed_id: string;
};
export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
  Stripesubscription;
export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdError =
  Stripeerror;
export type PostCustomersCustomerSubscriptionsSubscriptionExposedIdInput = {
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
          readonly type: "min_item_period_end" | "timestamp";
        } & { readonly [x: string]: Schema.Json };
        readonly start: {
          readonly timestamp?: number;
          readonly type: "max_item_period_start" | "now" | "timestamp";
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
  readonly application_fee_percent?: number | "";
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly billing_cycle_anchor?: "now" | "unchanged";
  readonly billing_thresholds?:
    | ({
        readonly amount_gte?: number;
        readonly reset_billing_cycle_anchor?: boolean;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly cancel_at?:
    | number
    | ""
    | "max_billed_until"
    | "max_period_end"
    | "min_period_end";
  readonly cancel_at_period_end?: boolean;
  readonly cancellation_details?: {
    readonly comment?: string | "";
    readonly feedback?:
      | ""
      | "customer_service"
      | "low_quality"
      | "missing_features"
      | "other"
      | "switched_service"
      | "too_complex"
      | "too_expensive"
      | "unused";
    readonly feedback_option?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly days_until_due?: number;
  readonly default_payment_method?: string;
  readonly default_source?: string | "";
  readonly default_tax_rates?: ReadonlyArray<string> | "";
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
  readonly invoice_settings?: {
    readonly account_tax_ids?: ReadonlyArray<string> | "";
    readonly custom_fields?:
      | ReadonlyArray<
          { readonly name: string; readonly value: string } & {
            readonly [x: string]: Schema.Json;
          }
        >
      | "";
    readonly description?: string | "";
    readonly footer?: string | "";
    readonly issuer?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
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
  readonly off_session?: boolean;
  readonly pause_collection?:
    | ({
        readonly behavior: "keep_as_draft" | "mark_uncollectible" | "void";
        readonly resumes_at?: number;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly payment_behavior?:
    | "allow_incomplete"
    | "default_incomplete"
    | "error_if_incomplete"
    | "pending_if_incomplete";
  readonly payment_settings?: {
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
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly blik?:
        | ({
            readonly mandate_options?: { readonly expires_at?: number } & {
              readonly [x: string]: Schema.Json;
            };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly card?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_type?: "fixed" | "maximum";
              readonly description?: string;
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
            readonly expires_after_seconds?: number;
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_includes_iof?: "always" | "never";
              readonly end_date?: string;
              readonly payment_schedule?:
                | "halfyearly"
                | "monthly"
                | "quarterly"
                | "weekly"
                | "yearly";
            } & { readonly [x: string]: Schema.Json };
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
    readonly save_default_payment_method?: "off" | "on_subscription";
  } & { readonly [x: string]: Schema.Json };
  readonly pending_invoice_item_interval?:
    | ({
        readonly interval: "day" | "month" | "week" | "year";
        readonly interval_count?: number;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
  readonly proration_date?: number;
  readonly transfer_data?:
    | ({ readonly amount_percent?: number; readonly destination: string } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly trial_end?: "now" | number;
  readonly trial_from_plan?: boolean;
  readonly trial_settings?: {
    readonly end_behavior: {
      readonly billing_cycle_anchor?: "now" | "unchanged";
      readonly missing_payment_method?: "cancel" | "create_invoice" | "pause";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly customer: string;
  readonly subscription_exposed_id: string;
};
export type PostCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
  Stripesubscription;
export type PostCustomersCustomerSubscriptionsSubscriptionExposedIdError =
  Stripeerror;
export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice_now?: boolean;
  readonly prorate?: boolean;
  readonly customer: string;
  readonly subscription_exposed_id: string;
};
export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
  Stripesubscription;
export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdError =
  Stripeerror;
export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput =
  {
    readonly customer: string;
    readonly expand?: ReadonlyArray<string>;
    readonly subscription_exposed_id: string;
  };
export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput =
  Stripediscount;
export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError =
  Stripeerror;
export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput =
  { readonly customer: string; readonly subscription_exposed_id: string };
export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput =
  Stripedeleted_discount;
export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError =
  Stripeerror;
export type GetCustomersCustomerTaxIdsInput = {
  readonly customer: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCustomersCustomerTaxIdsOutput = {
  readonly data: ReadonlyArray<Stripetax_id>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCustomersCustomerTaxIdsError = Stripeerror;
export type PostCustomersCustomerTaxIdsInput = {
  readonly expand?: ReadonlyArray<string>;
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
  readonly customer: string;
};
export type PostCustomersCustomerTaxIdsOutput = Stripetax_id;
export type PostCustomersCustomerTaxIdsError = Stripeerror;
export type GetCustomersCustomerTaxIdsIdInput = {
  readonly customer: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetCustomersCustomerTaxIdsIdOutput = Stripetax_id;
export type GetCustomersCustomerTaxIdsIdError = Stripeerror;
export type DeleteCustomersCustomerTaxIdsIdInput = {
  readonly customer: string;
  readonly id: string;
};
export type DeleteCustomersCustomerTaxIdsIdOutput = Stripedeleted_tax_id;
export type DeleteCustomersCustomerTaxIdsIdError = Stripeerror;

export const GetCustomersInput = Schema.Struct({
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
  email: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(512).annotate({
        expected: "a string with at most 512 code points",
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  test_clock: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetCustomersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecustomer),
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
          new globalThis.RegExp("^\\/v1\\/customers", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/customers",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "CustomerResourceCustomerList", description: "" });
export const GetCustomersError = Stripeerror;
export const PostCustomersInput = Schema.Struct({
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
      ).annotate({ title: "optional_fields_customer_address" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The customer's address. Learn about [country-specific requirements for calculating tax](https://docs.stripe.com/invoicing/taxes?dashboard-or-api=dashboard#set-up-customer).",
    }),
  ),
  balance: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "An integer amount in cents (or local equivalent) that represents the customer's current balance, which affect the customer's future invoices. A negative amount represents a credit that decreases the amount due on an invoice; a positive amount increases the amount due on an invoice.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  business_name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(150).annotate({
          expected: "a string with at most 150 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The customer's business name. This may be up to *150 characters*.",
    }),
  ),
  cash_balance: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        settings: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              reconciliation_mode: Schema.optionalKey(
                Schema.Literals(["automatic", "manual", "merchant_default"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "balance_settings_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "cash_balance_param",
      description:
        "Balance information and default balance settings for this customer.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Customer's email address. It's displayed alongside the customer in your dashboard and can be useful for searching and tracking. This may be up to *512 characters*.",
    }).check(
      Schema.isMaxCodePoints(512).annotate({
        expected: "a string with at most 512 code points",
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
  individual_name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(150).annotate({
          expected: "a string with at most 150 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The customer's full name. This may be up to *150 characters*.",
    }),
  ),
  invoice_prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix for the customer used to generate unique invoice numbers. Must be 1–12 uppercase letters or numbers.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  invoice_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
        default_payment_method: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
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
        rendering_options: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                amount_tax_display: Schema.optionalKey(
                  Schema.Literals(["", "exclude_tax", "include_inclusive_tax"]),
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
            ).annotate({ title: "customer_rendering_options_param" }),
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
      title: "customer_param",
      description: "Default invoice settings for this customer.",
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
  name: Schema.optionalKey(
    Schema.String.annotate({
      description: "The customer's full name or business name.",
    }).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
  ),
  next_invoice_sequence: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The sequence to be used on the customer's next invoice. Defaults to 1.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  payment_method: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({
      description: "The customer's phone number.",
    }).check(
      Schema.isMaxCodePoints(20).annotate({
        expected: "a string with at most 20 code points",
      }),
    ),
  ),
  preferred_locales: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Customer's preferred languages, ordered by preference.",
    }),
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
    ]).annotate({
      description:
        "The customer's shipping information. Appears on invoices emailed to this customer.",
    }),
  ),
  source: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  tax: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        ip_address: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
        validate_location: Schema.optionalKey(
          Schema.Literals(["deferred", "immediately"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "shared_tax_create_param",
      description: "Tax details about the customer.",
    }),
  ),
  tax_exempt: Schema.optionalKey(
    Schema.Literals(["", "exempt", "none", "reverse"]).annotate({
      description:
        "The customer's tax exemption. One of `none`, `exempt`, or `reverse`.",
    }),
  ),
  tax_id_data: Schema.optionalKey(
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
    ).annotate({ description: "The customer's tax IDs." }),
  ),
  test_clock: Schema.optionalKey(
    Schema.String.annotate({
      description: "ID of the test clock to attach to the customer.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const PostCustomersOutput = Stripecustomer;
export const PostCustomersError = Stripeerror;
export const GetCustomersSearchInput = Schema.Struct({
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
export const GetCustomersSearchOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecustomer),
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
export const GetCustomersSearchError = Stripeerror;
export const GetCustomersCustomerInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetCustomersCustomerOutput = Schema.Union([
  Stripecustomer,
  Stripedeleted_customer,
]);
export const GetCustomersCustomerError = Stripeerror;
export const PostCustomersCustomerInput = Schema.Struct({
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
      ).annotate({ title: "optional_fields_customer_address" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The customer's address. Learn about [country-specific requirements for calculating tax](https://docs.stripe.com/invoicing/taxes?dashboard-or-api=dashboard#set-up-customer).",
    }),
  ),
  balance: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "An integer amount in cents (or local equivalent) that represents the customer's current balance, which affect the customer's future invoices. A negative amount represents a credit that decreases the amount due on an invoice; a positive amount increases the amount due on an invoice.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  bank_account: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          account_holder_type: Schema.optionalKey(
            Schema.Literals(["company", "individual"]),
          ),
          account_number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          country: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
          object: Schema.optionalKey(Schema.Literal("bank_account")),
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
      ).annotate({ title: "customer_payment_source_bank_account" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "Either a token, like the ones returned by [Stripe.js](https://stripe.com/docs/js), or a dictionary containing a user's bank account details.",
    }),
  ),
  business_name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(150).annotate({
          expected: "a string with at most 150 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The customer's business name. This may be up to *150 characters*.",
    }),
  ),
  card: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          address_city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_country: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_zip: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          cvc: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          encrypted: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          exp_month: Schema.Int,
          exp_year: Schema.Int,
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          network_token: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                number: Schema.optionalKey(
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
            ).annotate({ title: "source_deprecated_card_network_token" }),
          ),
          number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          object: Schema.optionalKey(Schema.Literal("card")),
          swipe_data: Schema.optionalKey(
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
      ).annotate({ title: "customer_payment_source_card" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "A token, like the ones returned by [Stripe.js](https://stripe.com/docs/js).",
    }),
  ),
  cash_balance: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        settings: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              reconciliation_mode: Schema.optionalKey(
                Schema.Literals(["automatic", "manual", "merchant_default"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "balance_settings_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "cash_balance_param",
      description:
        "Balance information and default balance settings for this customer.",
    }),
  ),
  default_alipay_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of Alipay account to make the customer's new default for invoice payments.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  default_bank_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of bank account to make the customer's new default for invoice payments.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  default_card: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of card to make the customer's new default for invoice payments.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  default_source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "If you are using payment methods created via the PaymentMethods API, see the [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/update#update_customer-invoice_settings-default_payment_method) parameter.\n\nProvide the ID of a payment source already attached to this customer to make it this customer's default payment source.\n\nIf you want to add a new payment source and make it the default, see the [source](https://docs.stripe.com/api/customers/update#update_customer-source) property.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Customer's email address. It's displayed alongside the customer in your dashboard and can be useful for searching and tracking. This may be up to *512 characters*.",
    }).check(
      Schema.isMaxCodePoints(512).annotate({
        expected: "a string with at most 512 code points",
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
  individual_name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(150).annotate({
          expected: "a string with at most 150 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The customer's full name. This may be up to *150 characters*.",
    }),
  ),
  invoice_prefix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The prefix for the customer used to generate unique invoice numbers. Must be 1–12 uppercase letters or numbers.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  invoice_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
        default_payment_method: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
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
        rendering_options: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                amount_tax_display: Schema.optionalKey(
                  Schema.Literals(["", "exclude_tax", "include_inclusive_tax"]),
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
            ).annotate({ title: "customer_rendering_options_param" }),
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
      title: "customer_param",
      description: "Default invoice settings for this customer.",
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
  name: Schema.optionalKey(
    Schema.String.annotate({
      description: "The customer's full name or business name.",
    }).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
  ),
  next_invoice_sequence: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The sequence to be used on the customer's next invoice. Defaults to 1.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({
      description: "The customer's phone number.",
    }).check(
      Schema.isMaxCodePoints(20).annotate({
        expected: "a string with at most 20 code points",
      }),
    ),
  ),
  preferred_locales: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Customer's preferred languages, ordered by preference.",
    }),
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
    ]).annotate({
      description:
        "The customer's shipping information. Appears on invoices emailed to this customer.",
    }),
  ),
  source: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  tax: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        ip_address: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
        validate_location: Schema.optionalKey(
          Schema.Literals(["auto", "deferred", "immediately"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "shared_tax_update_param",
      description: "Tax details about the customer.",
    }),
  ),
  tax_exempt: Schema.optionalKey(
    Schema.Literals(["", "exempt", "none", "reverse"]).annotate({
      description:
        "The customer's tax exemption. One of `none`, `exempt`, or `reverse`.",
    }),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerOutput = Stripecustomer;
export const PostCustomersCustomerError = Stripeerror;
export const DeleteCustomersCustomerInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteCustomersCustomerOutput = Stripedeleted_customer;
export const DeleteCustomersCustomerError = Stripeerror;
export const GetCustomersCustomerBalanceTransactionsInput = Schema.Struct({
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
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
  invoice: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
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
export const GetCustomersCustomerBalanceTransactionsOutput =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.Array(Stripecustomer_balance_transaction).annotate({
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
  ).annotate({ title: "CustomerBalanceTransactionList", description: "" });
export const GetCustomersCustomerBalanceTransactionsError = Stripeerror;
export const PostCustomersCustomerBalanceTransactionsInput = Schema.Struct({
  amount: Schema.Number.annotate({
    description:
      "The integer amount in **cents (or local equivalent)** to apply to the customer's credit balance.",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies). Specifies the [`invoice_credit_balance`](https://docs.stripe.com/api/customers/object#customer_object-invoice_credit_balance) that this transaction will apply to. If the customer's `currency` is not set, it will be updated to this value.",
    format: "currency",
  }),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users.",
    }).check(
      Schema.isMaxCodePoints(350).annotate({
        expected: "a string with at most 350 code points",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerBalanceTransactionsOutput =
  Stripecustomer_balance_transaction;
export const PostCustomersCustomerBalanceTransactionsError = Stripeerror;
export const GetCustomersCustomerBalanceTransactionsTransactionInput =
  Schema.Struct({
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
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
    transaction: Schema.String,
  });
export const GetCustomersCustomerBalanceTransactionsTransactionOutput =
  Stripecustomer_balance_transaction;
export const GetCustomersCustomerBalanceTransactionsTransactionError =
  Stripeerror;
export const PostCustomersCustomerBalanceTransactionsTransactionInput =
  Schema.Struct({
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string attached to the object. Often useful for displaying to users.",
      }).check(
        Schema.isMaxCodePoints(350).annotate({
          expected: "a string with at most 350 code points",
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
        description:
          "Specifies which fields in the response should be expanded.",
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
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    transaction: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostCustomersCustomerBalanceTransactionsTransactionOutput =
  Stripecustomer_balance_transaction;
export const PostCustomersCustomerBalanceTransactionsTransactionError =
  Stripeerror;
export const GetCustomersCustomerBankAccountsInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  ending_before: Schema.optionalKey(Schema.String),
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
  starting_after: Schema.optionalKey(Schema.String),
});
export const GetCustomersCustomerBankAccountsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripebank_account).annotate({
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
).annotate({ title: "BankAccountList", description: "" });
export const GetCustomersCustomerBankAccountsError = Stripeerror;
export const PostCustomersCustomerBankAccountsInput = Schema.Struct({
  alipay_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A token returned by [Stripe.js](https://stripe.com/docs/js) representing the user’s Alipay account details.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  bank_account: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          account_holder_type: Schema.optionalKey(
            Schema.Literals(["company", "individual"]),
          ),
          account_number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          country: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
          object: Schema.optionalKey(Schema.Literal("bank_account")),
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
      ).annotate({ title: "customer_payment_source_bank_account" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "Either a token, like the ones returned by [Stripe.js](https://stripe.com/docs/js), or a dictionary containing a user's bank account details.",
    }),
  ),
  card: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          address_city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_country: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_zip: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          cvc: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          encrypted: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          exp_month: Schema.Int,
          exp_year: Schema.Int,
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          network_token: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                number: Schema.optionalKey(
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
            ).annotate({ title: "source_deprecated_card_network_token" }),
          ),
          number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          object: Schema.optionalKey(Schema.Literal("card")),
          swipe_data: Schema.optionalKey(
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
      ).annotate({ title: "customer_payment_source_card" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "A token, like the ones returned by [Stripe.js](https://stripe.com/docs/js).",
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
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Please refer to full [documentation](https://api.stripe.com) instead.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerBankAccountsOutput = Stripepayment_source;
export const PostCustomersCustomerBankAccountsError = Stripeerror;
export const GetCustomersCustomerBankAccountsIdInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetCustomersCustomerBankAccountsIdOutput = Stripebank_account;
export const GetCustomersCustomerBankAccountsIdError = Stripeerror;
export const PostCustomersCustomerBankAccountsIdInput = Schema.Struct({
  account_holder_name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the person or business that owns the bank account.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  account_holder_type: Schema.optionalKey(
    Schema.Literals(["company", "individual"]).annotate({
      description:
        "The type of entity that holds the account. This can be either `individual` or `company`.",
    }),
  ),
  address_city: Schema.optionalKey(
    Schema.String.annotate({
      description: "City/District/Suburb/Town/Village.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_country: Schema.optionalKey(
    Schema.String.annotate({
      description: "Billing address country, if provided when creating card.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_line1: Schema.optionalKey(
    Schema.String.annotate({
      description: "Address line 1 (Street address/PO Box/Company name).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_line2: Schema.optionalKey(
    Schema.String.annotate({
      description: "Address line 2 (Apartment/Suite/Unit/Building).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_state: Schema.optionalKey(
    Schema.String.annotate({
      description: "State/County/Province/Region.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_zip: Schema.optionalKey(
    Schema.String.annotate({ description: "ZIP or postal code." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  exp_month: Schema.optionalKey(
    Schema.String.annotate({
      description: "Two digit number representing the card’s expiration month.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  exp_year: Schema.optionalKey(
    Schema.String.annotate({
      description: "Four digit number representing the card’s expiration year.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  name: Schema.optionalKey(
    Schema.String.annotate({ description: "Cardholder name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  owner: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
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
          ).annotate({ title: "source_address" }),
        ),
        email: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(800).annotate({
              expected: "a string with at most 800 code points",
            }),
          ),
        ),
        name: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
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
    ).annotate({ title: "owner" }),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerBankAccountsIdOutput = Schema.Union([
  Stripecard,
  Stripebank_account,
  Stripesource,
]);
export const PostCustomersCustomerBankAccountsIdError = Stripeerror;
export const DeleteCustomersCustomerBankAccountsIdInput = Schema.Struct({
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
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const DeleteCustomersCustomerBankAccountsIdOutput = Schema.Union([
  Stripepayment_source,
  Stripedeleted_payment_source,
]);
export const DeleteCustomersCustomerBankAccountsIdError = Stripeerror;
export const PostCustomersCustomerBankAccountsIdVerifyInput = Schema.Struct({
  amounts: Schema.optionalKey(
    Schema.Array(Schema.Int).annotate({
      description:
        "Two positive integers, in *cents*, equal to the values of the microdeposits sent to the bank account.",
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
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerBankAccountsIdVerifyOutput =
  Stripebank_account;
export const PostCustomersCustomerBankAccountsIdVerifyError = Stripeerror;
export const GetCustomersCustomerCardsInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  ending_before: Schema.optionalKey(Schema.String),
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
  starting_after: Schema.optionalKey(Schema.String),
});
export const GetCustomersCustomerCardsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecard),
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
).annotate({ title: "CardList", description: "" });
export const GetCustomersCustomerCardsError = Stripeerror;
export const PostCustomersCustomerCardsInput = Schema.Struct({
  alipay_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A token returned by [Stripe.js](https://stripe.com/docs/js) representing the user’s Alipay account details.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  bank_account: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          account_holder_type: Schema.optionalKey(
            Schema.Literals(["company", "individual"]),
          ),
          account_number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          country: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
          object: Schema.optionalKey(Schema.Literal("bank_account")),
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
      ).annotate({ title: "customer_payment_source_bank_account" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "Either a token, like the ones returned by [Stripe.js](https://stripe.com/docs/js), or a dictionary containing a user's bank account details.",
    }),
  ),
  card: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          address_city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_country: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_zip: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          cvc: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          encrypted: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          exp_month: Schema.Int,
          exp_year: Schema.Int,
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          network_token: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                number: Schema.optionalKey(
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
            ).annotate({ title: "source_deprecated_card_network_token" }),
          ),
          number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          object: Schema.optionalKey(Schema.Literal("card")),
          swipe_data: Schema.optionalKey(
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
      ).annotate({ title: "customer_payment_source_card" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "A token, like the ones returned by [Stripe.js](https://stripe.com/docs/js).",
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
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Please refer to full [documentation](https://api.stripe.com) instead.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerCardsOutput = Stripepayment_source;
export const PostCustomersCustomerCardsError = Stripeerror;
export const GetCustomersCustomerCardsIdInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetCustomersCustomerCardsIdOutput = Stripecard;
export const GetCustomersCustomerCardsIdError = Stripeerror;
export const PostCustomersCustomerCardsIdInput = Schema.Struct({
  account_holder_name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the person or business that owns the bank account.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  account_holder_type: Schema.optionalKey(
    Schema.Literals(["company", "individual"]).annotate({
      description:
        "The type of entity that holds the account. This can be either `individual` or `company`.",
    }),
  ),
  address_city: Schema.optionalKey(
    Schema.String.annotate({
      description: "City/District/Suburb/Town/Village.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_country: Schema.optionalKey(
    Schema.String.annotate({
      description: "Billing address country, if provided when creating card.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_line1: Schema.optionalKey(
    Schema.String.annotate({
      description: "Address line 1 (Street address/PO Box/Company name).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_line2: Schema.optionalKey(
    Schema.String.annotate({
      description: "Address line 2 (Apartment/Suite/Unit/Building).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_state: Schema.optionalKey(
    Schema.String.annotate({
      description: "State/County/Province/Region.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_zip: Schema.optionalKey(
    Schema.String.annotate({ description: "ZIP or postal code." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  exp_month: Schema.optionalKey(
    Schema.String.annotate({
      description: "Two digit number representing the card’s expiration month.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  exp_year: Schema.optionalKey(
    Schema.String.annotate({
      description: "Four digit number representing the card’s expiration year.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  name: Schema.optionalKey(
    Schema.String.annotate({ description: "Cardholder name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  owner: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
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
          ).annotate({ title: "source_address" }),
        ),
        email: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(800).annotate({
              expected: "a string with at most 800 code points",
            }),
          ),
        ),
        name: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
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
    ).annotate({ title: "owner" }),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerCardsIdOutput = Schema.Union([
  Stripecard,
  Stripebank_account,
  Stripesource,
]);
export const PostCustomersCustomerCardsIdError = Stripeerror;
export const DeleteCustomersCustomerCardsIdInput = Schema.Struct({
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
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const DeleteCustomersCustomerCardsIdOutput = Schema.Union([
  Stripepayment_source,
  Stripedeleted_payment_source,
]);
export const DeleteCustomersCustomerCardsIdError = Stripeerror;
export const GetCustomersCustomerCashBalanceInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetCustomersCustomerCashBalanceOutput = Stripecash_balance;
export const GetCustomersCustomerCashBalanceError = Stripeerror;
export const PostCustomersCustomerCashBalanceInput = Schema.Struct({
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
  settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        reconciliation_mode: Schema.optionalKey(
          Schema.Literals(["automatic", "manual", "merchant_default"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "balance_settings_param",
      description: "A hash of settings for this cash balance.",
    }),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerCashBalanceOutput = Stripecash_balance;
export const PostCustomersCustomerCashBalanceError = Stripeerror;
export const GetCustomersCustomerCashBalanceTransactionsInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetCustomersCustomerCashBalanceTransactionsOutput =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.Array(Stripecustomer_cash_balance_transaction).annotate({
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
  ).annotate({
    title: "Cash Balance Transaction List",
    description:
      "Customers with certain payments enabled have a cash balance, representing funds that were paid\nby the customer to a merchant, but have not yet been allocated to a payment. Cash Balance Transactions\nrepresent when funds are moved into or out of this balance. This includes funding by the customer, allocation\nto payments, and refunds to the customer.",
  });
export const GetCustomersCustomerCashBalanceTransactionsError = Stripeerror;
export const GetCustomersCustomerCashBalanceTransactionsTransactionInput =
  Schema.Struct({
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
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
    transaction: Schema.String,
  });
export const GetCustomersCustomerCashBalanceTransactionsTransactionOutput =
  Stripecustomer_cash_balance_transaction;
export const GetCustomersCustomerCashBalanceTransactionsTransactionError =
  Stripeerror;
export const GetCustomersCustomerDiscountInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetCustomersCustomerDiscountOutput = Stripediscount;
export const GetCustomersCustomerDiscountError = Stripeerror;
export const DeleteCustomersCustomerDiscountInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteCustomersCustomerDiscountOutput = Stripedeleted_discount;
export const DeleteCustomersCustomerDiscountError = Stripeerror;
export const PostCustomersCustomerFundingInstructionsInput = Schema.Struct({
  bank_transfer: Schema.StructWithRest(
    Schema.Struct({
      eu_bank_transfer: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            country: Schema.String.check(
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
        ).annotate({ title: "eu_bank_account_params" }),
      ),
      requested_address_types: Schema.optionalKey(
        Schema.Array(Schema.Literals(["iban", "sort_code", "spei", "zengin"])),
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
  ).annotate({
    title: "bank_transfer_params",
    description: "Additional parameters for `bank_transfer` funding types",
  }),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
    format: "currency",
  }),
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
  funding_type: Schema.Literal("bank_transfer").annotate({
    description: "The `funding_type` to get the instructions for.",
  }),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerFundingInstructionsOutput =
  Stripefunding_instructions;
export const PostCustomersCustomerFundingInstructionsError = Stripeerror;
export const GetCustomersCustomerPaymentMethodsInput = Schema.Struct({
  allow_redisplay: Schema.optionalKey(
    Schema.Literals(["always", "limited", "unspecified"]),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
  type: Schema.optionalKey(
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
      "custom",
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
  ),
});
export const GetCustomersCustomerPaymentMethodsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripepayment_method),
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
).annotate({ title: "CustomerPaymentMethodResourceList", description: "" });
export const GetCustomersCustomerPaymentMethodsError = Stripeerror;
export const GetCustomersCustomerPaymentMethodsPaymentMethodInput =
  Schema.Struct({
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
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
    payment_method: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const GetCustomersCustomerPaymentMethodsPaymentMethodOutput =
  Stripepayment_method;
export const GetCustomersCustomerPaymentMethodsPaymentMethodError = Stripeerror;
export const GetCustomersCustomerSourcesInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  ending_before: Schema.optionalKey(Schema.String),
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
  object: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(Schema.String),
});
export const GetCustomersCustomerSourcesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(
      Schema.Union([Stripebank_account, Stripecard, Stripesource]).annotate({
        title: "Polymorphic",
      }),
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
).annotate({ title: "ApmsSourcesSourceList", description: "" });
export const GetCustomersCustomerSourcesError = Stripeerror;
export const PostCustomersCustomerSourcesInput = Schema.Struct({
  alipay_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A token returned by [Stripe.js](https://stripe.com/docs/js) representing the user’s Alipay account details.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  bank_account: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          account_holder_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          account_holder_type: Schema.optionalKey(
            Schema.Literals(["company", "individual"]),
          ),
          account_number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          country: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
          object: Schema.optionalKey(Schema.Literal("bank_account")),
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
      ).annotate({ title: "customer_payment_source_bank_account" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "Either a token, like the ones returned by [Stripe.js](https://stripe.com/docs/js), or a dictionary containing a user's bank account details.",
    }),
  ),
  card: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          address_city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_country: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_zip: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          cvc: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          encrypted: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          exp_month: Schema.Int,
          exp_year: Schema.Int,
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          network_token: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                number: Schema.optionalKey(
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
            ).annotate({ title: "source_deprecated_card_network_token" }),
          ),
          number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          object: Schema.optionalKey(Schema.Literal("card")),
          swipe_data: Schema.optionalKey(
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
      ).annotate({ title: "customer_payment_source_card" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "A token, like the ones returned by [Stripe.js](https://stripe.com/docs/js).",
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
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Please refer to full [documentation](https://api.stripe.com) instead.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerSourcesOutput = Stripepayment_source;
export const PostCustomersCustomerSourcesError = Stripeerror;
export const GetCustomersCustomerSourcesIdInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(500).annotate({
      expected: "a string with at most 500 code points",
    }),
  ),
});
export const GetCustomersCustomerSourcesIdOutput = Stripepayment_source;
export const GetCustomersCustomerSourcesIdError = Stripeerror;
export const PostCustomersCustomerSourcesIdInput = Schema.Struct({
  account_holder_name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the person or business that owns the bank account.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  account_holder_type: Schema.optionalKey(
    Schema.Literals(["company", "individual"]).annotate({
      description:
        "The type of entity that holds the account. This can be either `individual` or `company`.",
    }),
  ),
  address_city: Schema.optionalKey(
    Schema.String.annotate({
      description: "City/District/Suburb/Town/Village.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_country: Schema.optionalKey(
    Schema.String.annotate({
      description: "Billing address country, if provided when creating card.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_line1: Schema.optionalKey(
    Schema.String.annotate({
      description: "Address line 1 (Street address/PO Box/Company name).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_line2: Schema.optionalKey(
    Schema.String.annotate({
      description: "Address line 2 (Apartment/Suite/Unit/Building).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_state: Schema.optionalKey(
    Schema.String.annotate({
      description: "State/County/Province/Region.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  address_zip: Schema.optionalKey(
    Schema.String.annotate({ description: "ZIP or postal code." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  exp_month: Schema.optionalKey(
    Schema.String.annotate({
      description: "Two digit number representing the card’s expiration month.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  exp_year: Schema.optionalKey(
    Schema.String.annotate({
      description: "Four digit number representing the card’s expiration year.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  name: Schema.optionalKey(
    Schema.String.annotate({ description: "Cardholder name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  owner: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
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
          ).annotate({ title: "source_address" }),
        ),
        email: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(800).annotate({
              expected: "a string with at most 800 code points",
            }),
          ),
        ),
        name: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
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
    ).annotate({ title: "owner" }),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerSourcesIdOutput = Schema.Union([
  Stripecard,
  Stripebank_account,
  Stripesource,
]);
export const PostCustomersCustomerSourcesIdError = Stripeerror;
export const DeleteCustomersCustomerSourcesIdInput = Schema.Struct({
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
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const DeleteCustomersCustomerSourcesIdOutput = Schema.Union([
  Stripepayment_source,
  Stripedeleted_payment_source,
]);
export const DeleteCustomersCustomerSourcesIdError = Stripeerror;
export const PostCustomersCustomerSourcesIdVerifyInput = Schema.Struct({
  amounts: Schema.optionalKey(
    Schema.Array(Schema.Int).annotate({
      description:
        "Two positive integers, in *cents*, equal to the values of the microdeposits sent to the bank account.",
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
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerSourcesIdVerifyOutput = Stripebank_account;
export const PostCustomersCustomerSourcesIdVerifyError = Stripeerror;
export const GetCustomersCustomerSubscriptionsInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetCustomersCustomerSubscriptionsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripesubscription).annotate({
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
).annotate({ title: "SubscriptionList", description: "" });
export const GetCustomersCustomerSubscriptionsError = Stripeerror;
export const PostCustomersCustomerSubscriptionsInput = Schema.Struct({
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
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    type: Schema.Literals(["min_item_period_end", "timestamp"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "invoice_item_period_end" }),
                start: Schema.StructWithRest(
                  Schema.Struct({
                    timestamp: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    type: Schema.Literals([
                      "max_item_period_start",
                      "now",
                      "timestamp",
                    ]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "invoice_item_period_start" }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "invoice_item_period" }),
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
            ).annotate({ title: "one_time_price_data_with_negative_amounts" }),
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
      ).annotate({ title: "add_invoice_item_entry" }),
    ).annotate({
      description:
        "A list of prices and quantities that will generate invoice items appended to the next invoice for this subscription. You may pass up to 20 items.",
    }),
  ),
  application_fee_percent: Schema.optionalKey(
    Schema.Union([Schema.Finite, Schema.Literal("")]).annotate({
      description:
        "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. The request must be made by a platform account on a connected account in order to set an application fee percentage. For more information, see the application fees [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).",
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
      title: "automatic_tax_config",
      description: "Automatic tax settings for this subscription.",
    }),
  ),
  backdate_start_date: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A past timestamp to backdate the subscription's start date to. If set, the first invoice will contain line items for the timespan between the start date and the current time. Can be combined with trials and the billing cycle anchor.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  billing_cycle_anchor: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A future timestamp in UTC format to anchor the subscription's [billing cycle](https://docs.stripe.com/subscriptions/billing-cycle). The anchor is the reference point that aligns future billing cycle dates. It sets the day of week for `week` intervals, the day of month for `month` and `year` intervals, and the month of year for `year` intervals.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  billing_thresholds: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          amount_gte: Schema.optionalKey(Schema.Int),
          reset_billing_cycle_anchor: Schema.optionalKey(Schema.Boolean),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "billing_thresholds_param" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. When updating, pass an empty string to remove previously-defined thresholds.",
    }),
  ),
  cancel_at: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Literals(["max_billed_until", "max_period_end", "min_period_end"]),
    ]).annotate({
      description:
        "A timestamp at which the subscription should cancel. If set to a date before the current period ends, this will cause a proration if prorations have been enabled using `proration_behavior`. If set during a future period, this will always cause a proration for that period.",
    }),
  ),
  cancel_at_period_end: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicate whether this subscription should cancel at the end of the current period (`current_period_end`). Defaults to `false`.",
    }),
  ),
  collection_method: Schema.optionalKey(
    Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
      description:
        "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this subscription at the end of the cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`. Defaults to `charge_automatically`.",
    }),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
  ),
  days_until_due: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Number of days a customer has to pay invoices generated by this subscription. Valid only for subscriptions where `collection_method` is set to `send_invoice`.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  default_payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the default payment method for the subscription. It must belong to the customer associated with the subscription. This takes precedence over `default_source`. If neither are set, invoices will use the customer's [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  default_source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the default payment source for the subscription. It must belong to the customer associated with the subscription and be in a chargeable state. If `default_payment_method` is also set, `default_payment_method` will take precedence. If neither are set, invoices will use the customer's [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).",
    }).check(
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
    ]).annotate({
      description:
        "The tax rates that will apply to any subscription item that does not have `tax_rates` set. Invoices created will have their `default_tax_rates` populated from the subscription.",
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
        "The coupons to redeem into discounts for the subscription. If not specified or empty, inherits the discount from the subscription's customer.",
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "invoice_settings_param",
      description: "All invoices will be billed using the specified settings.",
    }),
  ),
  items: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          billing_thresholds: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(Schema.Struct({ usage_gte: Schema.Int }), [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ]).annotate({ title: "item_billing_thresholds_param" }),
              Schema.Literal(""),
            ]),
          ),
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
                product: Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                recurring: Schema.StructWithRest(
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
      ).annotate({ title: "subscription_item_create_params" }),
    ).annotate({
      description:
        "A list of up to 20 subscription items, each with an attached price.",
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
  off_session: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates if a customer is on or off-session while an invoice payment is attempted. Defaults to `false` (on-session).",
    }),
  ),
  payment_behavior: Schema.optionalKey(
    Schema.Literals([
      "allow_incomplete",
      "default_incomplete",
      "error_if_incomplete",
      "pending_if_incomplete",
    ]).annotate({
      description:
        "Controls how Stripe handles the first invoice when payment is required and `collection_method=charge_automatically`. Subscriptions with `collection_method=send_invoice` are automatically activated regardless of the first Invoice status.",
    }),
  ),
  payment_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({
                    title: "subscription_payment_method_options_param",
                  }),
                  Schema.Literal(""),
                ]),
              ),
              blik: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      mandate_options: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            expires_at: Schema.optionalKey(
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
                            "subscription_payment_method_options_mandate_options_param",
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
                    title: "subscription_payment_method_options_param",
                  }),
                  Schema.Literal(""),
                ]),
              ),
              card: Schema.optionalKey(
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
                                Schema.isMaxCodePoints(200).annotate({
                                  expected:
                                    "a string with at most 200 code points",
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
                  ).annotate({
                    title: "subscription_payment_method_options_param",
                  }),
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
                      expires_after_seconds: Schema.optionalKey(Schema.Int),
                      mandate_options: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            amount: Schema.optionalKey(Schema.Int),
                            amount_includes_iof: Schema.optionalKey(
                              Schema.Literals(["always", "never"]),
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
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({
                    title: "subscription_payment_method_options_param",
                  }),
                  Schema.Literal(""),
                ]),
              ),
              sepa_debit: Schema.optionalKey(
                Schema.Union([
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ).annotate({
                    title: "subscription_payment_method_options_param",
                  }),
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
        save_default_payment_method: Schema.optionalKey(
          Schema.Literals(["off", "on_subscription"]),
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
        "Payment settings to pass to invoices created by the subscription.",
    }),
  ),
  pending_invoice_item_interval: Schema.optionalKey(
    Schema.Union([
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
      Schema.Literal(""),
    ]).annotate({
      description:
        "Specifies an interval for how often to bill for any pending invoice items. It is analogous to calling [Create an invoice](/api/invoices/create) for the given subscription at the specified interval.",
    }),
  ),
  proration_behavior: Schema.optionalKey(
    Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate({
      description:
        "Determines how to handle [prorations](https://docs.stripe.com/billing/subscriptions/prorations) resulting from the `billing_cycle_anchor`. If no value is passed, the default is `create_prorations`.",
    }),
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
    ).annotate({
      title: "transfer_data_specs",
      description:
        "If specified, the funds from the subscription's invoices will be transferred to the destination and the ID of the resulting transfers will be found on the resulting charges.",
    }),
  ),
  trial_end: Schema.optionalKey(
    Schema.Union([
      Schema.Literal("now"),
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ]).annotate({
      description:
        "Unix timestamp representing the end of the trial period the customer will get before being charged for the first time. If set, trial_end will override the default trial period of the plan the customer is being subscribed to. The special value `now` can be provided to end the customer's trial immediately. Can be at most two years from `billing_cycle_anchor`. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
    }),
  ),
  trial_from_plan: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates if a plan's `trial_period_days` should be applied to the subscription. Setting `trial_end` per subscription is preferred, and this defaults to `false`. Setting this flag to `true` together with `trial_end` is not allowed. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
    }),
  ),
  trial_period_days: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Integer representing the number of trial period days before the customer is charged for the first time. This will always overwrite any trials that might apply via a subscribed plan. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  trial_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        end_behavior: Schema.StructWithRest(
          Schema.Struct({
            billing_cycle_anchor: Schema.optionalKey(
              Schema.Literals(["now", "unchanged"]),
            ),
            missing_payment_method: Schema.optionalKey(
              Schema.Literals(["cancel", "create_invoice", "pause"]),
            ),
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
    ).annotate({
      title: "trial_settings_config",
      description: "Settings related to subscription trials.",
    }),
  ),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerSubscriptionsOutput = Stripesubscription;
export const PostCustomersCustomerSubscriptionsError = Stripeerror;
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdInput =
  Schema.Struct({
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
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
    subscription_exposed_id: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
  Stripesubscription;
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdError =
  Stripeerror;
export const PostCustomersCustomerSubscriptionsSubscriptionExposedIdInput =
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
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      type: Schema.Literals([
                        "min_item_period_end",
                        "timestamp",
                      ]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_item_period_end" }),
                  start: Schema.StructWithRest(
                    Schema.Struct({
                      timestamp: Schema.optionalKey(
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      type: Schema.Literals([
                        "max_item_period_start",
                        "now",
                        "timestamp",
                      ]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "invoice_item_period_start" }),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "invoice_item_period" }),
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
        ).annotate({ title: "add_invoice_item_entry" }),
      ).annotate({
        description:
          "A list of prices and quantities that will generate invoice items appended to the next invoice for this subscription. You may pass up to 20 items.",
      }),
    ),
    application_fee_percent: Schema.optionalKey(
      Schema.Union([Schema.Finite, Schema.Literal("")]).annotate({
        description:
          "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. The request must be made by a platform account on a connected account in order to set an application fee percentage. For more information, see the application fees [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).",
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
        title: "automatic_tax_config",
        description:
          "Automatic tax settings for this subscription. We recommend you only include this parameter when the existing value is being changed.",
      }),
    ),
    billing_cycle_anchor: Schema.optionalKey(
      Schema.Literals(["now", "unchanged"]).annotate({
        description:
          "Either `now` or `unchanged`. Setting the value to `now` resets the subscription's billing cycle anchor to the current time. For more information, see the billing cycle [documentation](https://docs.stripe.com/billing/subscriptions/billing-cycle).",
      }),
    ),
    billing_thresholds: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(
          Schema.Struct({
            amount_gte: Schema.optionalKey(Schema.Int),
            reset_billing_cycle_anchor: Schema.optionalKey(Schema.Boolean),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "billing_thresholds_param" }),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. When updating, pass an empty string to remove previously-defined thresholds.",
      }),
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
      ]).annotate({
        description:
          "A timestamp at which the subscription should cancel. If set to a date before the current period ends, this will cause a proration if prorations have been enabled using `proration_behavior`. If set during a future period, this will always cause a proration for that period.",
      }),
    ),
    cancel_at_period_end: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicate whether this subscription should cancel at the end of the current period (`current_period_end`).",
      }),
    ),
    cancellation_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          comment: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          feedback: Schema.optionalKey(
            Schema.Literals([
              "",
              "customer_service",
              "low_quality",
              "missing_features",
              "other",
              "switched_service",
              "too_complex",
              "too_expensive",
              "unused",
            ]),
          ),
          feedback_option: Schema.optionalKey(
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
        title: "cancellation_details_param",
        description: "Details about why this subscription was cancelled",
      }),
    ),
    collection_method: Schema.optionalKey(
      Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
        description:
          "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this subscription at the end of the cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`. Defaults to `charge_automatically`.",
      }),
    ),
    days_until_due: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Number of days a customer has to pay invoices generated by this subscription. Valid only for subscriptions where `collection_method` is set to `send_invoice`.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    default_payment_method: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the default payment method for the subscription. It must belong to the customer associated with the subscription. This takes precedence over `default_source`. If neither are set, invoices will use the customer's [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source). For subscriptions created by Checkout Sessions with Managed Payments enabled, you can't update this field directly through the API. Customers can update it through the Customer Portal.",
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
          "ID of the default payment source for the subscription. It must belong to the customer associated with the subscription and be in a chargeable state. If `default_payment_method` is also set, `default_payment_method` will take precedence. If neither are set, invoices will use the customer's [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).",
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
          "The tax rates that will apply to any subscription item that does not have `tax_rates` set. Invoices created will have their `default_tax_rates` populated from the subscription. Pass an empty string to remove previously-defined tax rates.",
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
          "The coupons to redeem into discounts for the subscription. A populated array overwrites the existing discounts on the subscription. If not specified or empty array, it leaves the subscription's discounts unchanged. If empty string, it clears the subscription's discounts.",
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
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(1500).annotate({
                  expected: "a string with at most 1500 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          footer: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
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
      ).annotate({
        title: "invoice_settings_update_param",
        description:
          "All invoices will be billed using the specified settings.",
      }),
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
      ).annotate({
        description:
          "A list of up to 20 subscription items, each with an attached price.",
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
    off_session: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicates if a customer is on or off-session while an invoice payment is attempted. Defaults to `false` (on-session).",
      }),
    ),
    pause_collection: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(
          Schema.Struct({
            behavior: Schema.Literals([
              "keep_as_draft",
              "mark_uncollectible",
              "void",
            ]),
            resumes_at: Schema.optionalKey(
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
        ).annotate({ title: "pause_collection_param" }),
        Schema.Literal(""),
      ]).annotate({
        description:
          "If specified, payment collection for this subscription will be paused. Note that the subscription status will be unchanged and will not be updated to `paused`. Learn more about [pausing collection](https://docs.stripe.com/billing/subscriptions/pause-payment).",
      }),
    ),
    payment_behavior: Schema.optionalKey(
      Schema.Literals([
        "allow_incomplete",
        "default_incomplete",
        "error_if_incomplete",
        "pending_if_incomplete",
      ]).annotate({
        description:
          "Controls how Stripe handles payment when a subscription update requires payment and `collection_method=charge_automatically`.",
      }),
    ),
    payment_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                    ).annotate({
                      title: "invoice_payment_method_options_param",
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
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
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
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        country: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        line1: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        line2: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        postal_code: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        state: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
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
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                blik: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              expires_at: Schema.optionalKey(
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({
                            title:
                              "subscription_payment_method_options_mandate_options_param",
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
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                card: Schema.optionalKey(
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
                                  Schema.isMaxCodePoints(200).annotate({
                                    expected:
                                      "a string with at most 200 code points",
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
                    ).annotate({
                      title: "subscription_payment_method_options_param",
                    }),
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                konbini: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                pix: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        expires_after_seconds: Schema.optionalKey(Schema.Int),
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.optionalKey(Schema.Int),
                              amount_includes_iof: Schema.optionalKey(
                                Schema.Literals(["always", "never"]),
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
                              "subscription_payment_method_options_mandate_options_param",
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
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                sepa_debit: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ).annotate({
                      title: "subscription_payment_method_options_param",
                    }),
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
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
                                        Schema.Literals([
                                          "checking",
                                          "savings",
                                        ]),
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
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
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
                    ).annotate({
                      title: "invoice_payment_method_options_param",
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
          save_default_payment_method: Schema.optionalKey(
            Schema.Literals(["off", "on_subscription"]),
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
          "Payment settings to pass to invoices created by the subscription.",
      }),
    ),
    pending_invoice_item_interval: Schema.optionalKey(
      Schema.Union([
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
        Schema.Literal(""),
      ]).annotate({
        description:
          "Specifies an interval for how often to bill for any pending invoice items. It is analogous to calling [Create an invoice](/api/invoices/create) for the given subscription at the specified interval.",
      }),
    ),
    proration_behavior: Schema.optionalKey(
      Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate(
        {
          description:
            "Determines how to handle [prorations](https://docs.stripe.com/billing/subscriptions/prorations) when the billing cycle changes (e.g., when switching plans, resetting `billing_cycle_anchor=now`, or starting a trial), or if an item's `quantity` changes. The default value is `create_prorations`.",
        },
      ),
    ),
    proration_date: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "If set, prorations will be calculated as though the subscription was updated at the given time. This can be used to apply exactly the same prorations that were previewed with the [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint. `proration_date` can also be used to implement custom proration logic, such as prorating by day instead of by second, by providing the time that you wish to use for proration calculations.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    transfer_data: Schema.optionalKey(
      Schema.Union([
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
        Schema.Literal(""),
      ]).annotate({
        description:
          "If specified, the funds from the subscription's invoices will be transferred to the destination and the ID of the resulting transfers will be found on the resulting charges. This will be unset if you POST an empty value.",
      }),
    ),
    trial_end: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("now"),
        Schema.Number.annotate({ format: "unix-time" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
      ]).annotate({
        description:
          "Unix timestamp representing the end of the trial period the customer will get before being charged for the first time. This will always overwrite any trials that might apply via a subscribed plan. If set, trial_end will override the default trial period of the plan the customer is being subscribed to. The special value `now` can be provided to end the customer's trial immediately. Can be at most two years from `billing_cycle_anchor`.",
      }),
    ),
    trial_from_plan: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicates if a plan's `trial_period_days` should be applied to the subscription. Setting `trial_end` per subscription is preferred, and this defaults to `false`. Setting this flag to `true` together with `trial_end` is not allowed. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
      }),
    ),
    trial_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          end_behavior: Schema.StructWithRest(
            Schema.Struct({
              billing_cycle_anchor: Schema.optionalKey(
                Schema.Literals(["now", "unchanged"]),
              ),
              missing_payment_method: Schema.optionalKey(
                Schema.Literals(["cancel", "create_invoice", "pause"]),
              ),
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
      ).annotate({
        title: "trial_settings_config",
        description: "Settings related to subscription trials.",
      }),
    ),
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    subscription_exposed_id: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
  Stripesubscription;
export const PostCustomersCustomerSubscriptionsSubscriptionExposedIdError =
  Stripeerror;
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdInput =
  Schema.Struct({
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
    invoice_now: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Can be set to `true` if `at_period_end` is not set to `true`. Will generate a final invoice that invoices for any un-invoiced metered usage and new/pending proration invoice items.",
      }),
    ),
    prorate: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Can be set to `true` if `at_period_end` is not set to `true`. Will generate a proration invoice item that credits remaining unused time until the subscription period end.",
      }),
    ),
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    subscription_exposed_id: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
  Stripesubscription;
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdError =
  Stripeerror;
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput =
  Schema.Struct({
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
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
    subscription_exposed_id: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput =
  Stripediscount;
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError =
  Stripeerror;
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput =
  Schema.Struct({
    customer: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    subscription_exposed_id: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput =
  Stripedeleted_discount;
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError =
  Stripeerror;
export const GetCustomersCustomerTaxIdsInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetCustomersCustomerTaxIdsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetax_id).annotate({
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
).annotate({ title: "TaxIDsList", description: "" });
export const GetCustomersCustomerTaxIdsError = Stripeerror;
export const PostCustomersCustomerTaxIdsInput = Schema.Struct({
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
  ]).annotate({
    description:
      "Type of the tax ID, one of `ad_nrt`, `ae_trn`, `al_tin`, `am_tin`, `ao_tin`, `ar_cuit`, `au_abn`, `au_acn`, `au_arn`, `au_wpn`, `aw_tin`, `az_tin`, `ba_tin`, `bb_tin`, `bd_bin`, `bf_ifu`, `bg_uic`, `bh_vat`, `bj_ifu`, `bo_tin`, `br_cnpj`, `br_cpf`, `bs_tin`, `bw_vat`, `by_tin`, `ca_bn`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `ca_qst`, `cd_nif`, `ch_uid`, `ch_vat`, `ci_vat`, `cl_tin`, `cm_niu`, `cn_tin`, `co_nit`, `cr_tin`, `cv_nif`, `cz_dic`, `de_stn`, `do_rcn`, `ec_ruc`, `eg_tin`, `es_cif`, `et_tin`, `eu_oss_vat`, `eu_vat`, `fo_vat`, `fr_siren`, `fr_siret`, `fr_spi`, `gb_vat`, `ge_vat`, `gh_tin`, `gi_tin`, `gn_nif`, `hk_br`, `hr_oib`, `hu_tin`, `ic_nif`, `id_npwp`, `il_vat`, `in_gst`, `is_kt`, `is_vat`, `it_cf`, `jp_cn`, `jp_rn`, `jp_trn`, `ke_pin`, `kg_tin`, `kh_tin`, `kr_brn`, `kz_bin`, `la_tin`, `li_uid`, `li_vat`, `lk_vat`, `ma_vat`, `md_cf`, `md_vat`, `me_pib`, `mk_vat`, `mr_nif`, `mu_vat`, `mx_rfc`, `my_frp`, `my_itn`, `my_sst`, `mz_nuit`, `ng_tin`, `no_vat`, `no_voec`, `np_pan`, `nz_bn`, `nz_gst`, `om_vat`, `pe_ruc`, `ph_tin`, `pl_nip`, `pt_nif`, `py_ruc`, `ro_tin`, `rs_pib`, `ru_inn`, `ru_kpp`, `sa_vat`, `sg_gst`, `sg_uen`, `si_tin`, `sm_coe`, `sn_ninea`, `sr_fin`, `sv_nit`, `th_vat`, `tj_tin`, `tr_tin`, `tt_bir`, `tt_vat`, `tw_vat`, `tz_vat`, `ua_vat`, `ug_tin`, `us_ein`, `uy_ruc`, `uz_tin`, `uz_vat`, `ve_rif`, `vn_tin`, `za_vat`, `zm_tin`, or `zw_tin`",
  }),
  value: Schema.String.annotate({ description: "Value of the tax ID." }),
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCustomersCustomerTaxIdsOutput = Stripetax_id;
export const PostCustomersCustomerTaxIdsError = Stripeerror;
export const GetCustomersCustomerTaxIdsIdInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
  id: Schema.String,
});
export const GetCustomersCustomerTaxIdsIdOutput = Stripetax_id;
export const GetCustomersCustomerTaxIdsIdError = Stripeerror;
export const DeleteCustomersCustomerTaxIdsIdInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const DeleteCustomersCustomerTaxIdsIdOutput = Stripedeleted_tax_id;
export const DeleteCustomersCustomerTaxIdsIdError = Stripeerror;
/**
 * The GetCustomersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersOperation: StripeOperation & {
  readonly input: typeof GetCustomersInput;
  readonly output: typeof GetCustomersOutput;
  readonly error: typeof GetCustomersError;
} = {
  name: "GetCustomers",
  method: "GET",
  path: "/v1/customers",
  pathParameters: [],
  queryParameters: [
    "created",
    "email",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "test_clock",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersInput,
  output: GetCustomersOutput,
  error: GetCustomersError,
};
/**
 * The PostCustomersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersOperation: StripeOperation & {
  readonly input: typeof PostCustomersInput;
  readonly output: typeof PostCustomersOutput;
  readonly error: typeof PostCustomersError;
} = {
  name: "PostCustomers",
  method: "POST",
  path: "/v1/customers",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersInput,
  output: PostCustomersOutput,
  error: PostCustomersError,
};
/**
 * The GetCustomersSearchOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersSearchOperation: StripeOperation & {
  readonly input: typeof GetCustomersSearchInput;
  readonly output: typeof GetCustomersSearchOutput;
  readonly error: typeof GetCustomersSearchError;
} = {
  name: "GetCustomersSearch",
  method: "GET",
  path: "/v1/customers/search",
  pathParameters: [],
  queryParameters: ["expand", "limit", "page", "query"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersSearchInput,
  output: GetCustomersSearchOutput,
  error: GetCustomersSearchError,
};
/**
 * The GetCustomersCustomerOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerInput;
  readonly output: typeof GetCustomersCustomerOutput;
  readonly error: typeof GetCustomersCustomerError;
} = {
  name: "GetCustomersCustomer",
  method: "GET",
  path: "/v1/customers/{customer}",
  pathParameters: ["customer"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerInput,
  output: GetCustomersCustomerOutput,
  error: GetCustomersCustomerError,
};
/**
 * The PostCustomersCustomerOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerInput;
  readonly output: typeof PostCustomersCustomerOutput;
  readonly error: typeof PostCustomersCustomerError;
} = {
  name: "PostCustomersCustomer",
  method: "POST",
  path: "/v1/customers/{customer}",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerInput,
  output: PostCustomersCustomerOutput,
  error: PostCustomersCustomerError,
};
/**
 * The DeleteCustomersCustomerOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerInput;
  readonly output: typeof DeleteCustomersCustomerOutput;
  readonly error: typeof DeleteCustomersCustomerError;
} = {
  name: "DeleteCustomersCustomer",
  method: "DELETE",
  path: "/v1/customers/{customer}",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerInput,
  output: DeleteCustomersCustomerOutput,
  error: DeleteCustomersCustomerError,
};
/**
 * The GetCustomersCustomerBalanceTransactionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerBalanceTransactionsOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerBalanceTransactionsInput;
  readonly output: typeof GetCustomersCustomerBalanceTransactionsOutput;
  readonly error: typeof GetCustomersCustomerBalanceTransactionsError;
} = {
  name: "GetCustomersCustomerBalanceTransactions",
  method: "GET",
  path: "/v1/customers/{customer}/balance_transactions",
  pathParameters: ["customer"],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "invoice",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerBalanceTransactionsInput,
  output: GetCustomersCustomerBalanceTransactionsOutput,
  error: GetCustomersCustomerBalanceTransactionsError,
};
/**
 * The PostCustomersCustomerBalanceTransactionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerBalanceTransactionsOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerBalanceTransactionsInput;
  readonly output: typeof PostCustomersCustomerBalanceTransactionsOutput;
  readonly error: typeof PostCustomersCustomerBalanceTransactionsError;
} = {
  name: "PostCustomersCustomerBalanceTransactions",
  method: "POST",
  path: "/v1/customers/{customer}/balance_transactions",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerBalanceTransactionsInput,
  output: PostCustomersCustomerBalanceTransactionsOutput,
  error: PostCustomersCustomerBalanceTransactionsError,
};
/**
 * The GetCustomersCustomerBalanceTransactionsTransactionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerBalanceTransactionsTransactionOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerBalanceTransactionsTransactionInput;
  readonly output: typeof GetCustomersCustomerBalanceTransactionsTransactionOutput;
  readonly error: typeof GetCustomersCustomerBalanceTransactionsTransactionError;
} = {
  name: "GetCustomersCustomerBalanceTransactionsTransaction",
  method: "GET",
  path: "/v1/customers/{customer}/balance_transactions/{transaction}",
  pathParameters: ["customer", "transaction"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerBalanceTransactionsTransactionInput,
  output: GetCustomersCustomerBalanceTransactionsTransactionOutput,
  error: GetCustomersCustomerBalanceTransactionsTransactionError,
};
/**
 * The PostCustomersCustomerBalanceTransactionsTransactionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerBalanceTransactionsTransactionOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerBalanceTransactionsTransactionInput;
  readonly output: typeof PostCustomersCustomerBalanceTransactionsTransactionOutput;
  readonly error: typeof PostCustomersCustomerBalanceTransactionsTransactionError;
} = {
  name: "PostCustomersCustomerBalanceTransactionsTransaction",
  method: "POST",
  path: "/v1/customers/{customer}/balance_transactions/{transaction}",
  pathParameters: ["customer", "transaction"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerBalanceTransactionsTransactionInput,
  output: PostCustomersCustomerBalanceTransactionsTransactionOutput,
  error: PostCustomersCustomerBalanceTransactionsTransactionError,
};
/**
 * The GetCustomersCustomerBankAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerBankAccountsOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerBankAccountsInput;
  readonly output: typeof GetCustomersCustomerBankAccountsOutput;
  readonly error: typeof GetCustomersCustomerBankAccountsError;
} = {
  name: "GetCustomersCustomerBankAccounts",
  method: "GET",
  path: "/v1/customers/{customer}/bank_accounts",
  pathParameters: ["customer"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerBankAccountsInput,
  output: GetCustomersCustomerBankAccountsOutput,
  error: GetCustomersCustomerBankAccountsError,
};
/**
 * The PostCustomersCustomerBankAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerBankAccountsOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerBankAccountsInput;
  readonly output: typeof PostCustomersCustomerBankAccountsOutput;
  readonly error: typeof PostCustomersCustomerBankAccountsError;
} = {
  name: "PostCustomersCustomerBankAccounts",
  method: "POST",
  path: "/v1/customers/{customer}/bank_accounts",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerBankAccountsInput,
  output: PostCustomersCustomerBankAccountsOutput,
  error: PostCustomersCustomerBankAccountsError,
};
/**
 * The GetCustomersCustomerBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerBankAccountsIdInput;
  readonly output: typeof GetCustomersCustomerBankAccountsIdOutput;
  readonly error: typeof GetCustomersCustomerBankAccountsIdError;
} = {
  name: "GetCustomersCustomerBankAccountsId",
  method: "GET",
  path: "/v1/customers/{customer}/bank_accounts/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerBankAccountsIdInput,
  output: GetCustomersCustomerBankAccountsIdOutput,
  error: GetCustomersCustomerBankAccountsIdError,
};
/**
 * The PostCustomersCustomerBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerBankAccountsIdInput;
  readonly output: typeof PostCustomersCustomerBankAccountsIdOutput;
  readonly error: typeof PostCustomersCustomerBankAccountsIdError;
} = {
  name: "PostCustomersCustomerBankAccountsId",
  method: "POST",
  path: "/v1/customers/{customer}/bank_accounts/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerBankAccountsIdInput,
  output: PostCustomersCustomerBankAccountsIdOutput,
  error: PostCustomersCustomerBankAccountsIdError,
};
/**
 * The DeleteCustomersCustomerBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerBankAccountsIdInput;
  readonly output: typeof DeleteCustomersCustomerBankAccountsIdOutput;
  readonly error: typeof DeleteCustomersCustomerBankAccountsIdError;
} = {
  name: "DeleteCustomersCustomerBankAccountsId",
  method: "DELETE",
  path: "/v1/customers/{customer}/bank_accounts/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerBankAccountsIdInput,
  output: DeleteCustomersCustomerBankAccountsIdOutput,
  error: DeleteCustomersCustomerBankAccountsIdError,
};
/**
 * The PostCustomersCustomerBankAccountsIdVerifyOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerBankAccountsIdVerifyOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerBankAccountsIdVerifyInput;
  readonly output: typeof PostCustomersCustomerBankAccountsIdVerifyOutput;
  readonly error: typeof PostCustomersCustomerBankAccountsIdVerifyError;
} = {
  name: "PostCustomersCustomerBankAccountsIdVerify",
  method: "POST",
  path: "/v1/customers/{customer}/bank_accounts/{id}/verify",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerBankAccountsIdVerifyInput,
  output: PostCustomersCustomerBankAccountsIdVerifyOutput,
  error: PostCustomersCustomerBankAccountsIdVerifyError,
};
/**
 * The GetCustomersCustomerCardsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerCardsOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerCardsInput;
  readonly output: typeof GetCustomersCustomerCardsOutput;
  readonly error: typeof GetCustomersCustomerCardsError;
} = {
  name: "GetCustomersCustomerCards",
  method: "GET",
  path: "/v1/customers/{customer}/cards",
  pathParameters: ["customer"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerCardsInput,
  output: GetCustomersCustomerCardsOutput,
  error: GetCustomersCustomerCardsError,
};
/**
 * The PostCustomersCustomerCardsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerCardsOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerCardsInput;
  readonly output: typeof PostCustomersCustomerCardsOutput;
  readonly error: typeof PostCustomersCustomerCardsError;
} = {
  name: "PostCustomersCustomerCards",
  method: "POST",
  path: "/v1/customers/{customer}/cards",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerCardsInput,
  output: PostCustomersCustomerCardsOutput,
  error: PostCustomersCustomerCardsError,
};
/**
 * The GetCustomersCustomerCardsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerCardsIdOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerCardsIdInput;
  readonly output: typeof GetCustomersCustomerCardsIdOutput;
  readonly error: typeof GetCustomersCustomerCardsIdError;
} = {
  name: "GetCustomersCustomerCardsId",
  method: "GET",
  path: "/v1/customers/{customer}/cards/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerCardsIdInput,
  output: GetCustomersCustomerCardsIdOutput,
  error: GetCustomersCustomerCardsIdError,
};
/**
 * The PostCustomersCustomerCardsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerCardsIdOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerCardsIdInput;
  readonly output: typeof PostCustomersCustomerCardsIdOutput;
  readonly error: typeof PostCustomersCustomerCardsIdError;
} = {
  name: "PostCustomersCustomerCardsId",
  method: "POST",
  path: "/v1/customers/{customer}/cards/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerCardsIdInput,
  output: PostCustomersCustomerCardsIdOutput,
  error: PostCustomersCustomerCardsIdError,
};
/**
 * The DeleteCustomersCustomerCardsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerCardsIdOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerCardsIdInput;
  readonly output: typeof DeleteCustomersCustomerCardsIdOutput;
  readonly error: typeof DeleteCustomersCustomerCardsIdError;
} = {
  name: "DeleteCustomersCustomerCardsId",
  method: "DELETE",
  path: "/v1/customers/{customer}/cards/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerCardsIdInput,
  output: DeleteCustomersCustomerCardsIdOutput,
  error: DeleteCustomersCustomerCardsIdError,
};
/**
 * The GetCustomersCustomerCashBalanceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerCashBalanceOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerCashBalanceInput;
  readonly output: typeof GetCustomersCustomerCashBalanceOutput;
  readonly error: typeof GetCustomersCustomerCashBalanceError;
} = {
  name: "GetCustomersCustomerCashBalance",
  method: "GET",
  path: "/v1/customers/{customer}/cash_balance",
  pathParameters: ["customer"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerCashBalanceInput,
  output: GetCustomersCustomerCashBalanceOutput,
  error: GetCustomersCustomerCashBalanceError,
};
/**
 * The PostCustomersCustomerCashBalanceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerCashBalanceOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerCashBalanceInput;
  readonly output: typeof PostCustomersCustomerCashBalanceOutput;
  readonly error: typeof PostCustomersCustomerCashBalanceError;
} = {
  name: "PostCustomersCustomerCashBalance",
  method: "POST",
  path: "/v1/customers/{customer}/cash_balance",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerCashBalanceInput,
  output: PostCustomersCustomerCashBalanceOutput,
  error: PostCustomersCustomerCashBalanceError,
};
/**
 * The GetCustomersCustomerCashBalanceTransactionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerCashBalanceTransactionsOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerCashBalanceTransactionsInput;
  readonly output: typeof GetCustomersCustomerCashBalanceTransactionsOutput;
  readonly error: typeof GetCustomersCustomerCashBalanceTransactionsError;
} = {
  name: "GetCustomersCustomerCashBalanceTransactions",
  method: "GET",
  path: "/v1/customers/{customer}/cash_balance_transactions",
  pathParameters: ["customer"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerCashBalanceTransactionsInput,
  output: GetCustomersCustomerCashBalanceTransactionsOutput,
  error: GetCustomersCustomerCashBalanceTransactionsError,
};
/**
 * The GetCustomersCustomerCashBalanceTransactionsTransactionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerCashBalanceTransactionsTransactionOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerCashBalanceTransactionsTransactionInput;
  readonly output: typeof GetCustomersCustomerCashBalanceTransactionsTransactionOutput;
  readonly error: typeof GetCustomersCustomerCashBalanceTransactionsTransactionError;
} = {
  name: "GetCustomersCustomerCashBalanceTransactionsTransaction",
  method: "GET",
  path: "/v1/customers/{customer}/cash_balance_transactions/{transaction}",
  pathParameters: ["customer", "transaction"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerCashBalanceTransactionsTransactionInput,
  output: GetCustomersCustomerCashBalanceTransactionsTransactionOutput,
  error: GetCustomersCustomerCashBalanceTransactionsTransactionError,
};
/**
 * The GetCustomersCustomerDiscountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerDiscountOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerDiscountInput;
  readonly output: typeof GetCustomersCustomerDiscountOutput;
  readonly error: typeof GetCustomersCustomerDiscountError;
} = {
  name: "GetCustomersCustomerDiscount",
  method: "GET",
  path: "/v1/customers/{customer}/discount",
  pathParameters: ["customer"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerDiscountInput,
  output: GetCustomersCustomerDiscountOutput,
  error: GetCustomersCustomerDiscountError,
};
/**
 * The DeleteCustomersCustomerDiscountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerDiscountOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerDiscountInput;
  readonly output: typeof DeleteCustomersCustomerDiscountOutput;
  readonly error: typeof DeleteCustomersCustomerDiscountError;
} = {
  name: "DeleteCustomersCustomerDiscount",
  method: "DELETE",
  path: "/v1/customers/{customer}/discount",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerDiscountInput,
  output: DeleteCustomersCustomerDiscountOutput,
  error: DeleteCustomersCustomerDiscountError,
};
/**
 * The PostCustomersCustomerFundingInstructionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerFundingInstructionsOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerFundingInstructionsInput;
  readonly output: typeof PostCustomersCustomerFundingInstructionsOutput;
  readonly error: typeof PostCustomersCustomerFundingInstructionsError;
} = {
  name: "PostCustomersCustomerFundingInstructions",
  method: "POST",
  path: "/v1/customers/{customer}/funding_instructions",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerFundingInstructionsInput,
  output: PostCustomersCustomerFundingInstructionsOutput,
  error: PostCustomersCustomerFundingInstructionsError,
};
/**
 * The GetCustomersCustomerPaymentMethodsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerPaymentMethodsOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerPaymentMethodsInput;
  readonly output: typeof GetCustomersCustomerPaymentMethodsOutput;
  readonly error: typeof GetCustomersCustomerPaymentMethodsError;
} = {
  name: "GetCustomersCustomerPaymentMethods",
  method: "GET",
  path: "/v1/customers/{customer}/payment_methods",
  pathParameters: ["customer"],
  queryParameters: [
    "allow_redisplay",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "type",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerPaymentMethodsInput,
  output: GetCustomersCustomerPaymentMethodsOutput,
  error: GetCustomersCustomerPaymentMethodsError,
};
/**
 * The GetCustomersCustomerPaymentMethodsPaymentMethodOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerPaymentMethodsPaymentMethodOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerPaymentMethodsPaymentMethodInput;
  readonly output: typeof GetCustomersCustomerPaymentMethodsPaymentMethodOutput;
  readonly error: typeof GetCustomersCustomerPaymentMethodsPaymentMethodError;
} = {
  name: "GetCustomersCustomerPaymentMethodsPaymentMethod",
  method: "GET",
  path: "/v1/customers/{customer}/payment_methods/{payment_method}",
  pathParameters: ["customer", "payment_method"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerPaymentMethodsPaymentMethodInput,
  output: GetCustomersCustomerPaymentMethodsPaymentMethodOutput,
  error: GetCustomersCustomerPaymentMethodsPaymentMethodError,
};
/**
 * The GetCustomersCustomerSourcesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerSourcesOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerSourcesInput;
  readonly output: typeof GetCustomersCustomerSourcesOutput;
  readonly error: typeof GetCustomersCustomerSourcesError;
} = {
  name: "GetCustomersCustomerSources",
  method: "GET",
  path: "/v1/customers/{customer}/sources",
  pathParameters: ["customer"],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "object",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerSourcesInput,
  output: GetCustomersCustomerSourcesOutput,
  error: GetCustomersCustomerSourcesError,
};
/**
 * The PostCustomersCustomerSourcesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerSourcesOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerSourcesInput;
  readonly output: typeof PostCustomersCustomerSourcesOutput;
  readonly error: typeof PostCustomersCustomerSourcesError;
} = {
  name: "PostCustomersCustomerSources",
  method: "POST",
  path: "/v1/customers/{customer}/sources",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerSourcesInput,
  output: PostCustomersCustomerSourcesOutput,
  error: PostCustomersCustomerSourcesError,
};
/**
 * The GetCustomersCustomerSourcesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerSourcesIdOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerSourcesIdInput;
  readonly output: typeof GetCustomersCustomerSourcesIdOutput;
  readonly error: typeof GetCustomersCustomerSourcesIdError;
} = {
  name: "GetCustomersCustomerSourcesId",
  method: "GET",
  path: "/v1/customers/{customer}/sources/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerSourcesIdInput,
  output: GetCustomersCustomerSourcesIdOutput,
  error: GetCustomersCustomerSourcesIdError,
};
/**
 * The PostCustomersCustomerSourcesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerSourcesIdOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerSourcesIdInput;
  readonly output: typeof PostCustomersCustomerSourcesIdOutput;
  readonly error: typeof PostCustomersCustomerSourcesIdError;
} = {
  name: "PostCustomersCustomerSourcesId",
  method: "POST",
  path: "/v1/customers/{customer}/sources/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerSourcesIdInput,
  output: PostCustomersCustomerSourcesIdOutput,
  error: PostCustomersCustomerSourcesIdError,
};
/**
 * The DeleteCustomersCustomerSourcesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerSourcesIdOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerSourcesIdInput;
  readonly output: typeof DeleteCustomersCustomerSourcesIdOutput;
  readonly error: typeof DeleteCustomersCustomerSourcesIdError;
} = {
  name: "DeleteCustomersCustomerSourcesId",
  method: "DELETE",
  path: "/v1/customers/{customer}/sources/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerSourcesIdInput,
  output: DeleteCustomersCustomerSourcesIdOutput,
  error: DeleteCustomersCustomerSourcesIdError,
};
/**
 * The PostCustomersCustomerSourcesIdVerifyOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerSourcesIdVerifyOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerSourcesIdVerifyInput;
  readonly output: typeof PostCustomersCustomerSourcesIdVerifyOutput;
  readonly error: typeof PostCustomersCustomerSourcesIdVerifyError;
} = {
  name: "PostCustomersCustomerSourcesIdVerify",
  method: "POST",
  path: "/v1/customers/{customer}/sources/{id}/verify",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerSourcesIdVerifyInput,
  output: PostCustomersCustomerSourcesIdVerifyOutput,
  error: PostCustomersCustomerSourcesIdVerifyError,
};
/**
 * The GetCustomersCustomerSubscriptionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerSubscriptionsOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerSubscriptionsInput;
  readonly output: typeof GetCustomersCustomerSubscriptionsOutput;
  readonly error: typeof GetCustomersCustomerSubscriptionsError;
} = {
  name: "GetCustomersCustomerSubscriptions",
  method: "GET",
  path: "/v1/customers/{customer}/subscriptions",
  pathParameters: ["customer"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerSubscriptionsInput,
  output: GetCustomersCustomerSubscriptionsOutput,
  error: GetCustomersCustomerSubscriptionsError,
};
/**
 * The PostCustomersCustomerSubscriptionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerSubscriptionsOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerSubscriptionsInput;
  readonly output: typeof PostCustomersCustomerSubscriptionsOutput;
  readonly error: typeof PostCustomersCustomerSubscriptionsError;
} = {
  name: "PostCustomersCustomerSubscriptions",
  method: "POST",
  path: "/v1/customers/{customer}/subscriptions",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerSubscriptionsInput,
  output: PostCustomersCustomerSubscriptionsOutput,
  error: PostCustomersCustomerSubscriptionsError,
};
/**
 * The GetCustomersCustomerSubscriptionsSubscriptionExposedIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerSubscriptionsSubscriptionExposedIdInput;
  readonly output: typeof GetCustomersCustomerSubscriptionsSubscriptionExposedIdOutput;
  readonly error: typeof GetCustomersCustomerSubscriptionsSubscriptionExposedIdError;
} = {
  name: "GetCustomersCustomerSubscriptionsSubscriptionExposedId",
  method: "GET",
  path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
  pathParameters: ["customer", "subscription_exposed_id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerSubscriptionsSubscriptionExposedIdInput,
  output: GetCustomersCustomerSubscriptionsSubscriptionExposedIdOutput,
  error: GetCustomersCustomerSubscriptionsSubscriptionExposedIdError,
};
/**
 * The PostCustomersCustomerSubscriptionsSubscriptionExposedIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerSubscriptionsSubscriptionExposedIdOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerSubscriptionsSubscriptionExposedIdInput;
  readonly output: typeof PostCustomersCustomerSubscriptionsSubscriptionExposedIdOutput;
  readonly error: typeof PostCustomersCustomerSubscriptionsSubscriptionExposedIdError;
} = {
  name: "PostCustomersCustomerSubscriptionsSubscriptionExposedId",
  method: "POST",
  path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
  pathParameters: ["customer", "subscription_exposed_id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerSubscriptionsSubscriptionExposedIdInput,
  output: PostCustomersCustomerSubscriptionsSubscriptionExposedIdOutput,
  error: PostCustomersCustomerSubscriptionsSubscriptionExposedIdError,
};
/**
 * The DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdInput;
  readonly output: typeof DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOutput;
  readonly error: typeof DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdError;
} = {
  name: "DeleteCustomersCustomerSubscriptionsSubscriptionExposedId",
  method: "DELETE",
  path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
  pathParameters: ["customer", "subscription_exposed_id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdInput,
  output: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOutput,
  error: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdError,
};
/**
 * The GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput;
  readonly output: typeof GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput;
  readonly error: typeof GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError;
} = {
  name: "GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount",
  method: "GET",
  path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount",
  pathParameters: ["customer", "subscription_exposed_id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput,
  output: GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput,
  error: GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError,
};
/**
 * The DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput;
  readonly output: typeof DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput;
  readonly error: typeof DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError;
} = {
  name: "DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount",
  method: "DELETE",
  path: "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount",
  pathParameters: ["customer", "subscription_exposed_id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput,
  output:
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput,
  error: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountError,
};
/**
 * The GetCustomersCustomerTaxIdsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerTaxIdsOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerTaxIdsInput;
  readonly output: typeof GetCustomersCustomerTaxIdsOutput;
  readonly error: typeof GetCustomersCustomerTaxIdsError;
} = {
  name: "GetCustomersCustomerTaxIds",
  method: "GET",
  path: "/v1/customers/{customer}/tax_ids",
  pathParameters: ["customer"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerTaxIdsInput,
  output: GetCustomersCustomerTaxIdsOutput,
  error: GetCustomersCustomerTaxIdsError,
};
/**
 * The PostCustomersCustomerTaxIdsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCustomersCustomerTaxIdsOperation: StripeOperation & {
  readonly input: typeof PostCustomersCustomerTaxIdsInput;
  readonly output: typeof PostCustomersCustomerTaxIdsOutput;
  readonly error: typeof PostCustomersCustomerTaxIdsError;
} = {
  name: "PostCustomersCustomerTaxIds",
  method: "POST",
  path: "/v1/customers/{customer}/tax_ids",
  pathParameters: ["customer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCustomersCustomerTaxIdsInput,
  output: PostCustomersCustomerTaxIdsOutput,
  error: PostCustomersCustomerTaxIdsError,
};
/**
 * The GetCustomersCustomerTaxIdsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCustomersCustomerTaxIdsIdOperation: StripeOperation & {
  readonly input: typeof GetCustomersCustomerTaxIdsIdInput;
  readonly output: typeof GetCustomersCustomerTaxIdsIdOutput;
  readonly error: typeof GetCustomersCustomerTaxIdsIdError;
} = {
  name: "GetCustomersCustomerTaxIdsId",
  method: "GET",
  path: "/v1/customers/{customer}/tax_ids/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCustomersCustomerTaxIdsIdInput,
  output: GetCustomersCustomerTaxIdsIdOutput,
  error: GetCustomersCustomerTaxIdsIdError,
};
/**
 * The DeleteCustomersCustomerTaxIdsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteCustomersCustomerTaxIdsIdOperation: StripeOperation & {
  readonly input: typeof DeleteCustomersCustomerTaxIdsIdInput;
  readonly output: typeof DeleteCustomersCustomerTaxIdsIdOutput;
  readonly error: typeof DeleteCustomersCustomerTaxIdsIdError;
} = {
  name: "DeleteCustomersCustomerTaxIdsId",
  method: "DELETE",
  path: "/v1/customers/{customer}/tax_ids/{id}",
  pathParameters: ["customer", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteCustomersCustomerTaxIdsIdInput,
  output: DeleteCustomersCustomerTaxIdsIdOutput,
  error: DeleteCustomersCustomerTaxIdsIdError,
};
/**
 * The makeCustomersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeCustomersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetCustomers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomers = Effect.fn("customers.GetCustomers")(function* (
    input: GetCustomersInput,
  ) {
    const response: GetCustomersOutput = yield* client.invoke(
      GetCustomersOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCustomers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomers = Effect.fn("customers.PostCustomers")(function* (
    input: PostCustomersInput,
  ) {
    const response: PostCustomersOutput = yield* client.invoke(
      PostCustomersOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCustomersSearch function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersSearch = Effect.fn("customers.GetCustomersSearch")(
    function* (input: GetCustomersSearchInput) {
      const response: GetCustomersSearchOutput = yield* client.invoke(
        GetCustomersSearchOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetCustomersCustomer function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomer = Effect.fn("customers.GetCustomersCustomer")(
    function* (input: GetCustomersCustomerInput) {
      const response: GetCustomersCustomerOutput = yield* client.invoke(
        GetCustomersCustomerOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostCustomersCustomer function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomer = Effect.fn("customers.PostCustomersCustomer")(
    function* (input: PostCustomersCustomerInput) {
      const response: PostCustomersCustomerOutput = yield* client.invoke(
        PostCustomersCustomerOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The DeleteCustomersCustomer function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomer = Effect.fn(
    "customers.DeleteCustomersCustomer",
  )(function* (input: DeleteCustomersCustomerInput) {
    const response: DeleteCustomersCustomerOutput = yield* client.invoke(
      DeleteCustomersCustomerOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCustomersCustomerBalanceTransactions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerBalanceTransactions = Effect.fn(
    "customers.GetCustomersCustomerBalanceTransactions",
  )(function* (input: GetCustomersCustomerBalanceTransactionsInput) {
    const response: GetCustomersCustomerBalanceTransactionsOutput =
      yield* client.invoke(
        GetCustomersCustomerBalanceTransactionsOperation,
        input,
      );
    return response;
  });
  /**
   * The PostCustomersCustomerBalanceTransactions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerBalanceTransactions = Effect.fn(
    "customers.PostCustomersCustomerBalanceTransactions",
  )(function* (input: PostCustomersCustomerBalanceTransactionsInput) {
    const response: PostCustomersCustomerBalanceTransactionsOutput =
      yield* client.invoke(
        PostCustomersCustomerBalanceTransactionsOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerBalanceTransactionsTransaction function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerBalanceTransactionsTransaction = Effect.fn(
    "customers.GetCustomersCustomerBalanceTransactionsTransaction",
  )(function* (input: GetCustomersCustomerBalanceTransactionsTransactionInput) {
    const response: GetCustomersCustomerBalanceTransactionsTransactionOutput =
      yield* client.invoke(
        GetCustomersCustomerBalanceTransactionsTransactionOperation,
        input,
      );
    return response;
  });
  /**
   * The PostCustomersCustomerBalanceTransactionsTransaction function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerBalanceTransactionsTransaction = Effect.fn(
    "customers.PostCustomersCustomerBalanceTransactionsTransaction",
  )(function* (
    input: PostCustomersCustomerBalanceTransactionsTransactionInput,
  ) {
    const response: PostCustomersCustomerBalanceTransactionsTransactionOutput =
      yield* client.invoke(
        PostCustomersCustomerBalanceTransactionsTransactionOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerBankAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerBankAccounts = Effect.fn(
    "customers.GetCustomersCustomerBankAccounts",
  )(function* (input: GetCustomersCustomerBankAccountsInput) {
    const response: GetCustomersCustomerBankAccountsOutput =
      yield* client.invoke(GetCustomersCustomerBankAccountsOperation, input);
    return response;
  });
  /**
   * The PostCustomersCustomerBankAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerBankAccounts = Effect.fn(
    "customers.PostCustomersCustomerBankAccounts",
  )(function* (input: PostCustomersCustomerBankAccountsInput) {
    const response: PostCustomersCustomerBankAccountsOutput =
      yield* client.invoke(PostCustomersCustomerBankAccountsOperation, input);
    return response;
  });
  /**
   * The GetCustomersCustomerBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerBankAccountsId = Effect.fn(
    "customers.GetCustomersCustomerBankAccountsId",
  )(function* (input: GetCustomersCustomerBankAccountsIdInput) {
    const response: GetCustomersCustomerBankAccountsIdOutput =
      yield* client.invoke(GetCustomersCustomerBankAccountsIdOperation, input);
    return response;
  });
  /**
   * The PostCustomersCustomerBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerBankAccountsId = Effect.fn(
    "customers.PostCustomersCustomerBankAccountsId",
  )(function* (input: PostCustomersCustomerBankAccountsIdInput) {
    const response: PostCustomersCustomerBankAccountsIdOutput =
      yield* client.invoke(PostCustomersCustomerBankAccountsIdOperation, input);
    return response;
  });
  /**
   * The DeleteCustomersCustomerBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomerBankAccountsId = Effect.fn(
    "customers.DeleteCustomersCustomerBankAccountsId",
  )(function* (input: DeleteCustomersCustomerBankAccountsIdInput) {
    const response: DeleteCustomersCustomerBankAccountsIdOutput =
      yield* client.invoke(
        DeleteCustomersCustomerBankAccountsIdOperation,
        input,
      );
    return response;
  });
  /**
   * The PostCustomersCustomerBankAccountsIdVerify function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerBankAccountsIdVerify = Effect.fn(
    "customers.PostCustomersCustomerBankAccountsIdVerify",
  )(function* (input: PostCustomersCustomerBankAccountsIdVerifyInput) {
    const response: PostCustomersCustomerBankAccountsIdVerifyOutput =
      yield* client.invoke(
        PostCustomersCustomerBankAccountsIdVerifyOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerCards function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerCards = Effect.fn(
    "customers.GetCustomersCustomerCards",
  )(function* (input: GetCustomersCustomerCardsInput) {
    const response: GetCustomersCustomerCardsOutput = yield* client.invoke(
      GetCustomersCustomerCardsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCustomersCustomerCards function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerCards = Effect.fn(
    "customers.PostCustomersCustomerCards",
  )(function* (input: PostCustomersCustomerCardsInput) {
    const response: PostCustomersCustomerCardsOutput = yield* client.invoke(
      PostCustomersCustomerCardsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCustomersCustomerCardsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerCardsId = Effect.fn(
    "customers.GetCustomersCustomerCardsId",
  )(function* (input: GetCustomersCustomerCardsIdInput) {
    const response: GetCustomersCustomerCardsIdOutput = yield* client.invoke(
      GetCustomersCustomerCardsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCustomersCustomerCardsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerCardsId = Effect.fn(
    "customers.PostCustomersCustomerCardsId",
  )(function* (input: PostCustomersCustomerCardsIdInput) {
    const response: PostCustomersCustomerCardsIdOutput = yield* client.invoke(
      PostCustomersCustomerCardsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteCustomersCustomerCardsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomerCardsId = Effect.fn(
    "customers.DeleteCustomersCustomerCardsId",
  )(function* (input: DeleteCustomersCustomerCardsIdInput) {
    const response: DeleteCustomersCustomerCardsIdOutput = yield* client.invoke(
      DeleteCustomersCustomerCardsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCustomersCustomerCashBalance function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerCashBalance = Effect.fn(
    "customers.GetCustomersCustomerCashBalance",
  )(function* (input: GetCustomersCustomerCashBalanceInput) {
    const response: GetCustomersCustomerCashBalanceOutput =
      yield* client.invoke(GetCustomersCustomerCashBalanceOperation, input);
    return response;
  });
  /**
   * The PostCustomersCustomerCashBalance function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerCashBalance = Effect.fn(
    "customers.PostCustomersCustomerCashBalance",
  )(function* (input: PostCustomersCustomerCashBalanceInput) {
    const response: PostCustomersCustomerCashBalanceOutput =
      yield* client.invoke(PostCustomersCustomerCashBalanceOperation, input);
    return response;
  });
  /**
   * The GetCustomersCustomerCashBalanceTransactions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerCashBalanceTransactions = Effect.fn(
    "customers.GetCustomersCustomerCashBalanceTransactions",
  )(function* (input: GetCustomersCustomerCashBalanceTransactionsInput) {
    const response: GetCustomersCustomerCashBalanceTransactionsOutput =
      yield* client.invoke(
        GetCustomersCustomerCashBalanceTransactionsOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerCashBalanceTransactionsTransaction function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerCashBalanceTransactionsTransaction = Effect.fn(
    "customers.GetCustomersCustomerCashBalanceTransactionsTransaction",
  )(function* (
    input: GetCustomersCustomerCashBalanceTransactionsTransactionInput,
  ) {
    const response: GetCustomersCustomerCashBalanceTransactionsTransactionOutput =
      yield* client.invoke(
        GetCustomersCustomerCashBalanceTransactionsTransactionOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerDiscount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerDiscount = Effect.fn(
    "customers.GetCustomersCustomerDiscount",
  )(function* (input: GetCustomersCustomerDiscountInput) {
    const response: GetCustomersCustomerDiscountOutput = yield* client.invoke(
      GetCustomersCustomerDiscountOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteCustomersCustomerDiscount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomerDiscount = Effect.fn(
    "customers.DeleteCustomersCustomerDiscount",
  )(function* (input: DeleteCustomersCustomerDiscountInput) {
    const response: DeleteCustomersCustomerDiscountOutput =
      yield* client.invoke(DeleteCustomersCustomerDiscountOperation, input);
    return response;
  });
  /**
   * The PostCustomersCustomerFundingInstructions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerFundingInstructions = Effect.fn(
    "customers.PostCustomersCustomerFundingInstructions",
  )(function* (input: PostCustomersCustomerFundingInstructionsInput) {
    const response: PostCustomersCustomerFundingInstructionsOutput =
      yield* client.invoke(
        PostCustomersCustomerFundingInstructionsOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerPaymentMethods function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerPaymentMethods = Effect.fn(
    "customers.GetCustomersCustomerPaymentMethods",
  )(function* (input: GetCustomersCustomerPaymentMethodsInput) {
    const response: GetCustomersCustomerPaymentMethodsOutput =
      yield* client.invoke(GetCustomersCustomerPaymentMethodsOperation, input);
    return response;
  });
  /**
   * The GetCustomersCustomerPaymentMethodsPaymentMethod function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerPaymentMethodsPaymentMethod = Effect.fn(
    "customers.GetCustomersCustomerPaymentMethodsPaymentMethod",
  )(function* (input: GetCustomersCustomerPaymentMethodsPaymentMethodInput) {
    const response: GetCustomersCustomerPaymentMethodsPaymentMethodOutput =
      yield* client.invoke(
        GetCustomersCustomerPaymentMethodsPaymentMethodOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerSources function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerSources = Effect.fn(
    "customers.GetCustomersCustomerSources",
  )(function* (input: GetCustomersCustomerSourcesInput) {
    const response: GetCustomersCustomerSourcesOutput = yield* client.invoke(
      GetCustomersCustomerSourcesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCustomersCustomerSources function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerSources = Effect.fn(
    "customers.PostCustomersCustomerSources",
  )(function* (input: PostCustomersCustomerSourcesInput) {
    const response: PostCustomersCustomerSourcesOutput = yield* client.invoke(
      PostCustomersCustomerSourcesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCustomersCustomerSourcesId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerSourcesId = Effect.fn(
    "customers.GetCustomersCustomerSourcesId",
  )(function* (input: GetCustomersCustomerSourcesIdInput) {
    const response: GetCustomersCustomerSourcesIdOutput = yield* client.invoke(
      GetCustomersCustomerSourcesIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCustomersCustomerSourcesId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerSourcesId = Effect.fn(
    "customers.PostCustomersCustomerSourcesId",
  )(function* (input: PostCustomersCustomerSourcesIdInput) {
    const response: PostCustomersCustomerSourcesIdOutput = yield* client.invoke(
      PostCustomersCustomerSourcesIdOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteCustomersCustomerSourcesId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomerSourcesId = Effect.fn(
    "customers.DeleteCustomersCustomerSourcesId",
  )(function* (input: DeleteCustomersCustomerSourcesIdInput) {
    const response: DeleteCustomersCustomerSourcesIdOutput =
      yield* client.invoke(DeleteCustomersCustomerSourcesIdOperation, input);
    return response;
  });
  /**
   * The PostCustomersCustomerSourcesIdVerify function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerSourcesIdVerify = Effect.fn(
    "customers.PostCustomersCustomerSourcesIdVerify",
  )(function* (input: PostCustomersCustomerSourcesIdVerifyInput) {
    const response: PostCustomersCustomerSourcesIdVerifyOutput =
      yield* client.invoke(
        PostCustomersCustomerSourcesIdVerifyOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerSubscriptions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerSubscriptions = Effect.fn(
    "customers.GetCustomersCustomerSubscriptions",
  )(function* (input: GetCustomersCustomerSubscriptionsInput) {
    const response: GetCustomersCustomerSubscriptionsOutput =
      yield* client.invoke(GetCustomersCustomerSubscriptionsOperation, input);
    return response;
  });
  /**
   * The PostCustomersCustomerSubscriptions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerSubscriptions = Effect.fn(
    "customers.PostCustomersCustomerSubscriptions",
  )(function* (input: PostCustomersCustomerSubscriptionsInput) {
    const response: PostCustomersCustomerSubscriptionsOutput =
      yield* client.invoke(PostCustomersCustomerSubscriptionsOperation, input);
    return response;
  });
  /**
   * The GetCustomersCustomerSubscriptionsSubscriptionExposedId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerSubscriptionsSubscriptionExposedId = Effect.fn(
    "customers.GetCustomersCustomerSubscriptionsSubscriptionExposedId",
  )(function* (
    input: GetCustomersCustomerSubscriptionsSubscriptionExposedIdInput,
  ) {
    const response: GetCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
      yield* client.invoke(
        GetCustomersCustomerSubscriptionsSubscriptionExposedIdOperation,
        input,
      );
    return response;
  });
  /**
   * The PostCustomersCustomerSubscriptionsSubscriptionExposedId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerSubscriptionsSubscriptionExposedId = Effect.fn(
    "customers.PostCustomersCustomerSubscriptionsSubscriptionExposedId",
  )(function* (
    input: PostCustomersCustomerSubscriptionsSubscriptionExposedIdInput,
  ) {
    const response: PostCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
      yield* client.invoke(
        PostCustomersCustomerSubscriptionsSubscriptionExposedIdOperation,
        input,
      );
    return response;
  });
  /**
   * The DeleteCustomersCustomerSubscriptionsSubscriptionExposedId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomerSubscriptionsSubscriptionExposedId = Effect.fn(
    "customers.DeleteCustomersCustomerSubscriptionsSubscriptionExposedId",
  )(function* (
    input: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdInput,
  ) {
    const response: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOutput =
      yield* client.invoke(
        DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdOperation,
        input,
      );
    return response;
  });
  /**
   * The GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount =
    Effect.fn(
      "customers.GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount",
    )(function* (
      input: GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput,
    ) {
      const response: GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput =
        yield* client.invoke(
          GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOperation,
          input,
        );
      return response;
    });
  /**
   * The DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount =
    Effect.fn(
      "customers.DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount",
    )(function* (
      input: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountInput,
    ) {
      const response: DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOutput =
        yield* client.invoke(
          DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountOperation,
          input,
        );
      return response;
    });
  /**
   * The GetCustomersCustomerTaxIds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerTaxIds = Effect.fn(
    "customers.GetCustomersCustomerTaxIds",
  )(function* (input: GetCustomersCustomerTaxIdsInput) {
    const response: GetCustomersCustomerTaxIdsOutput = yield* client.invoke(
      GetCustomersCustomerTaxIdsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCustomersCustomerTaxIds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCustomersCustomerTaxIds = Effect.fn(
    "customers.PostCustomersCustomerTaxIds",
  )(function* (input: PostCustomersCustomerTaxIdsInput) {
    const response: PostCustomersCustomerTaxIdsOutput = yield* client.invoke(
      PostCustomersCustomerTaxIdsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCustomersCustomerTaxIdsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCustomersCustomerTaxIdsId = Effect.fn(
    "customers.GetCustomersCustomerTaxIdsId",
  )(function* (input: GetCustomersCustomerTaxIdsIdInput) {
    const response: GetCustomersCustomerTaxIdsIdOutput = yield* client.invoke(
      GetCustomersCustomerTaxIdsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteCustomersCustomerTaxIdsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteCustomersCustomerTaxIdsId = Effect.fn(
    "customers.DeleteCustomersCustomerTaxIdsId",
  )(function* (input: DeleteCustomersCustomerTaxIdsIdInput) {
    const response: DeleteCustomersCustomerTaxIdsIdOutput =
      yield* client.invoke(DeleteCustomersCustomerTaxIdsIdOperation, input);
    return response;
  });
  return {
    GetCustomers,
    PostCustomers,
    GetCustomersSearch,
    GetCustomersCustomer,
    PostCustomersCustomer,
    DeleteCustomersCustomer,
    GetCustomersCustomerBalanceTransactions,
    PostCustomersCustomerBalanceTransactions,
    GetCustomersCustomerBalanceTransactionsTransaction,
    PostCustomersCustomerBalanceTransactionsTransaction,
    GetCustomersCustomerBankAccounts,
    PostCustomersCustomerBankAccounts,
    GetCustomersCustomerBankAccountsId,
    PostCustomersCustomerBankAccountsId,
    DeleteCustomersCustomerBankAccountsId,
    PostCustomersCustomerBankAccountsIdVerify,
    GetCustomersCustomerCards,
    PostCustomersCustomerCards,
    GetCustomersCustomerCardsId,
    PostCustomersCustomerCardsId,
    DeleteCustomersCustomerCardsId,
    GetCustomersCustomerCashBalance,
    PostCustomersCustomerCashBalance,
    GetCustomersCustomerCashBalanceTransactions,
    GetCustomersCustomerCashBalanceTransactionsTransaction,
    GetCustomersCustomerDiscount,
    DeleteCustomersCustomerDiscount,
    PostCustomersCustomerFundingInstructions,
    GetCustomersCustomerPaymentMethods,
    GetCustomersCustomerPaymentMethodsPaymentMethod,
    GetCustomersCustomerSources,
    PostCustomersCustomerSources,
    GetCustomersCustomerSourcesId,
    PostCustomersCustomerSourcesId,
    DeleteCustomersCustomerSourcesId,
    PostCustomersCustomerSourcesIdVerify,
    GetCustomersCustomerSubscriptions,
    PostCustomersCustomerSubscriptions,
    GetCustomersCustomerSubscriptionsSubscriptionExposedId,
    PostCustomersCustomerSubscriptionsSubscriptionExposedId,
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedId,
    GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount,
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount,
    GetCustomersCustomerTaxIds,
    PostCustomersCustomerTaxIds,
    GetCustomersCustomerTaxIdsId,
    DeleteCustomersCustomerTaxIdsId,
  };
});
