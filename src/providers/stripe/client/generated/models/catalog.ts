// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import {
  Stripeaddress,
  Stripeapplication,
  Stripecurrency_option,
  Stripecustom_unit_amount,
  Stripedeleted_price,
  Stripedeleted_product,
  Stripeentitlements_feature,
  Stripepackage_dimensions,
  Striperecurring,
  Stripetransform_quantity,
  Stripetransform_usage,
} from "./common.js";
import { Stripecustomer } from "./customers.js";

export type Stripetax_id = {
  readonly country?: string | null;
  readonly created: number;
  readonly customer?: string | Stripecustomer | null;
  readonly customer_account?: string | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "tax_id";
  readonly owner?: Stripetax_i_ds_owner | null;
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
  readonly value: string;
  readonly verification?: Stripetax_id_verification | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetax_i_ds_owner = {
  readonly account?: string | Stripeaccount;
  readonly application?: string | Stripeapplication;
  readonly customer?: string | Stripecustomer;
  readonly customer_account?: string | null;
  readonly type: "account" | "application" | "customer" | "self";
} & { readonly [x: string]: Schema.Json };
export type Stripeprice = {
  readonly active: boolean;
  readonly billing_scheme: "per_unit" | "tiered";
  readonly created: number;
  readonly currency: string;
  readonly currency_options?: { readonly [x: string]: Stripecurrency_option };
  readonly custom_unit_amount?: Stripecustom_unit_amount | null | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly lookup_key?: string | null;
  readonly metadata: { readonly [x: string]: string };
  readonly nickname?: string | null;
  readonly object: "price";
  readonly product: string | Stripeproduct | Stripedeleted_product;
  readonly recurring?: Striperecurring | null | null;
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified" | null;
  readonly tiers?: ReadonlyArray<Stripeprice_tier>;
  readonly tiers_mode?: "graduated" | "volume" | null;
  readonly transform_quantity?: Stripetransform_quantity | null | null;
  readonly type: "one_time" | "recurring";
  readonly unit_amount?: number | null;
  readonly unit_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeproduct = {
  readonly active: boolean;
  readonly created: number;
  readonly default_price?: string | Stripeprice | null | null;
  readonly description?: string | null;
  readonly id: string;
  readonly images: ReadonlyArray<string>;
  readonly livemode: boolean;
  readonly marketing_features: ReadonlyArray<Stripeproduct_marketing_feature>;
  readonly metadata: { readonly [x: string]: string };
  readonly name: string;
  readonly object: "product";
  readonly package_dimensions?: Stripepackage_dimensions | null | null;
  readonly shippable?: boolean | null;
  readonly statement_descriptor?: string | null;
  readonly tax_code?: string | Stripetax_code | null | null;
  readonly tax_details?: Stripetax_product_tax_details_resource_tax_details | null | null;
  readonly unit_label?: string | null;
  readonly updated: number;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetax_deducted_at_source = {
  readonly id: string;
  readonly object: "tax_deducted_at_source";
  readonly period_end: number;
  readonly period_start: number;
  readonly tax_deduction_account_number: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeprice_tier = {
  readonly flat_amount?: number | null;
  readonly flat_amount_decimal?: string | null;
  readonly unit_amount?: number | null;
  readonly unit_amount_decimal?: string | null;
  readonly up_to?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeproduct_marketing_feature = { readonly name?: string } & {
  readonly [x: string]: Schema.Json;
};
export type Stripetax_code_requirements = {
  readonly performance_location: "optional" | "required";
} & { readonly [x: string]: Schema.Json };
export type Stripetax_product_tax_details_resource_tax_details = {
  readonly performance_location?: string | null;
  readonly tax_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetax_rate_flat_amount = {
  readonly amount: number;
  readonly currency: string;
} & { readonly [x: string]: Schema.Json };
export type Stripetax_id_verification = {
  readonly status: "pending" | "unavailable" | "unverified" | "verified";
  readonly verified_address?: string | null;
  readonly verified_name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeplan_tier = {
  readonly flat_amount?: number | null;
  readonly flat_amount_decimal?: string | null;
  readonly unit_amount?: number | null;
  readonly unit_amount_decimal?: string | null;
  readonly up_to?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeproduct_catalog_impl_endpoints_trial_offer_resource_relative_duration =
  { readonly iterations: number } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_default_standard =
  { readonly place_of_supply_scheme: "inbound_goods" | "standard" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripetax_product_registrations_resource_country_options_default = {
  readonly type: "standard";
} & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_simplified =
  { readonly type: "simplified" } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_eu_standard =
  {
    readonly place_of_supply_scheme:
      | "inbound_goods"
      | "small_seller"
      | "standard";
  } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_ca_province_standard =
  { readonly province: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_thailand =
  { readonly type: "simplified" } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_admissions_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_attendance_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_entertainment_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_gross_receipts_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_hospitality_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_local_amusement_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_local_lease_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_luxury_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_mass_transit_parking_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_parking_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_resort_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_state_sales_tax_election =
  {
    readonly jurisdiction?: string;
    readonly type:
      | "local_use_tax"
      | "simplified_sellers_use_tax"
      | "single_local_use_tax";
  } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_tourism_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_utility_users_tax =
  { readonly jurisdiction: string } & { readonly [x: string]: Schema.Json };
export type Stripetax_location = {
  readonly address: Stripeaddress;
  readonly description?: string | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "tax.location";
  readonly type: "performance";
} & { readonly [x: string]: Schema.Json };
export type Stripetax_code = {
  readonly description: string;
  readonly id: string;
  readonly name: string;
  readonly object: "tax_code";
  readonly requirements?: Stripetax_code_requirements | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetax_rate = {
  readonly active: boolean;
  readonly country?: string | null;
  readonly created: number;
  readonly description?: string | null;
  readonly display_name: string;
  readonly effective_percentage?: number | null;
  readonly flat_amount?: Stripetax_rate_flat_amount | null;
  readonly id: string;
  readonly inclusive: boolean;
  readonly jurisdiction?: string | null;
  readonly jurisdiction_level?:
    | "city"
    | "country"
    | "county"
    | "district"
    | "multiple"
    | "state"
    | null;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "tax_rate";
  readonly percentage: number;
  readonly rate_type?: "flat_amount" | "percentage" | null;
  readonly state?: string | null;
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
    | "vat"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeproduct_catalog_impl_endpoints_trial_offer_resource_transition =
  { readonly price: string | Stripeprice | Stripedeleted_price } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripeproduct_feature = {
  readonly entitlement_feature: Stripeentitlements_feature;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "product_feature";
} & { readonly [x: string]: Schema.Json };
export type Stripeplan = {
  readonly active: boolean;
  readonly amount?: number | null;
  readonly amount_decimal?: string | null;
  readonly billing_scheme: "per_unit" | "tiered";
  readonly created: number;
  readonly currency: string;
  readonly id: string;
  readonly interval: "day" | "month" | "week" | "year";
  readonly interval_count: number;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly meter?: string | null;
  readonly nickname?: string | null;
  readonly object: "plan";
  readonly product?: string | Stripeproduct | Stripedeleted_product | null;
  readonly tiers?: ReadonlyArray<Stripeplan_tier>;
  readonly tiers_mode?: "graduated" | "volume" | null;
  readonly transform_usage?: Stripetransform_usage | null;
  readonly trial_period_days?: number | null;
  readonly usage_type: "licensed" | "metered";
} & { readonly [x: string]: Schema.Json };
export type Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_duration =
  {
    readonly relative?: Stripeproduct_catalog_impl_endpoints_trial_offer_resource_relative_duration;
    readonly type: "relative";
  } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_default_inbound_goods =
  {
    readonly standard?: Stripetax_product_registrations_resource_country_options_default_standard;
    readonly type: "standard";
  } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_europe = {
  readonly standard?: Stripetax_product_registrations_resource_country_options_eu_standard;
  readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
} & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_spain = {
  readonly standard?: Stripetax_product_registrations_resource_country_options_eu_standard;
  readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
} & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_canada = {
  readonly province_standard?: Stripetax_product_registrations_resource_country_options_ca_province_standard;
  readonly type: "province_standard" | "simplified" | "standard";
} & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_us_state_sales_tax =
  {
    readonly elections?: ReadonlyArray<Stripetax_product_registrations_resource_country_options_us_state_sales_tax_election>;
  } & { readonly [x: string]: Schema.Json };
export type Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_end_behavior =
  {
    readonly transition?: Stripeproduct_catalog_impl_endpoints_trial_offer_resource_transition;
    readonly type: "transition";
  } & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options_united_states =
  {
    readonly admissions_tax?: Stripetax_product_registrations_resource_country_options_us_admissions_tax;
    readonly attendance_tax?: Stripetax_product_registrations_resource_country_options_us_attendance_tax;
    readonly entertainment_tax?: Stripetax_product_registrations_resource_country_options_us_entertainment_tax;
    readonly gross_receipts_tax?: Stripetax_product_registrations_resource_country_options_us_gross_receipts_tax;
    readonly hospitality_tax?: Stripetax_product_registrations_resource_country_options_us_hospitality_tax;
    readonly local_amusement_tax?: Stripetax_product_registrations_resource_country_options_us_local_amusement_tax;
    readonly local_lease_tax?: Stripetax_product_registrations_resource_country_options_us_local_lease_tax;
    readonly luxury_tax?: Stripetax_product_registrations_resource_country_options_us_luxury_tax;
    readonly mass_transit_parking_tax?: Stripetax_product_registrations_resource_country_options_us_mass_transit_parking_tax;
    readonly parking_tax?: Stripetax_product_registrations_resource_country_options_us_parking_tax;
    readonly resort_tax?: Stripetax_product_registrations_resource_country_options_us_resort_tax;
    readonly state: string;
    readonly state_sales_tax?: Stripetax_product_registrations_resource_country_options_us_state_sales_tax;
    readonly tourism_tax?: Stripetax_product_registrations_resource_country_options_us_tourism_tax;
    readonly type:
      | "admissions_tax"
      | "attendance_tax"
      | "digital_excise_tax"
      | "entertainment_tax"
      | "gross_receipts_tax"
      | "hospitality_tax"
      | "local_amusement_tax"
      | "local_lease_tax"
      | "luxury_tax"
      | "mass_transit_parking_tax"
      | "parking_tax"
      | "resort_tax"
      | "state_communications_tax"
      | "state_retail_delivery_fee"
      | "state_sales_tax"
      | "tourism_tax"
      | "utility_users_tax";
    readonly utility_users_tax?: Stripetax_product_registrations_resource_country_options_us_utility_users_tax;
  } & { readonly [x: string]: Schema.Json };
export type Stripeproduct_catalog_trial_offer = {
  readonly active: boolean;
  readonly duration: Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_duration;
  readonly end_behavior: Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_end_behavior;
  readonly id: string;
  readonly livemode: boolean;
  readonly nickname?: string | null;
  readonly object: "product_catalog.trial_offer";
  readonly price: string | Stripeprice | Stripedeleted_price;
} & { readonly [x: string]: Schema.Json };
export type Stripetax_product_registrations_resource_country_options = {
  readonly ae?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly al?: Stripetax_product_registrations_resource_country_options_default;
  readonly am?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ao?: Stripetax_product_registrations_resource_country_options_default;
  readonly at?: Stripetax_product_registrations_resource_country_options_europe;
  readonly au?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly aw?: Stripetax_product_registrations_resource_country_options_default;
  readonly az?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ba?: Stripetax_product_registrations_resource_country_options_default;
  readonly bb?: Stripetax_product_registrations_resource_country_options_default;
  readonly bd?: Stripetax_product_registrations_resource_country_options_default;
  readonly be?: Stripetax_product_registrations_resource_country_options_europe;
  readonly bf?: Stripetax_product_registrations_resource_country_options_default;
  readonly bg?: Stripetax_product_registrations_resource_country_options_europe;
  readonly bh?: Stripetax_product_registrations_resource_country_options_default;
  readonly bj?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly bs?: Stripetax_product_registrations_resource_country_options_default;
  readonly bw?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly by?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ca?: Stripetax_product_registrations_resource_country_options_canada;
  readonly cd?: Stripetax_product_registrations_resource_country_options_default;
  readonly ch?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly ci?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly cl?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly cm?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly co?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly cr?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly cv?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly cy?: Stripetax_product_registrations_resource_country_options_europe;
  readonly cz?: Stripetax_product_registrations_resource_country_options_europe;
  readonly de?: Stripetax_product_registrations_resource_country_options_europe;
  readonly dk?: Stripetax_product_registrations_resource_country_options_europe;
  readonly ec?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ee?: Stripetax_product_registrations_resource_country_options_europe;
  readonly eg?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly es?: Stripetax_product_registrations_resource_country_options_spain;
  readonly et?: Stripetax_product_registrations_resource_country_options_default;
  readonly fi?: Stripetax_product_registrations_resource_country_options_europe;
  readonly fr?: Stripetax_product_registrations_resource_country_options_europe;
  readonly gb?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly ge?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly gh?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly gn?: Stripetax_product_registrations_resource_country_options_default;
  readonly gr?: Stripetax_product_registrations_resource_country_options_europe;
  readonly hr?: Stripetax_product_registrations_resource_country_options_europe;
  readonly hu?: Stripetax_product_registrations_resource_country_options_europe;
  readonly id?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ie?: Stripetax_product_registrations_resource_country_options_europe;
  readonly in?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly is?: Stripetax_product_registrations_resource_country_options_default;
  readonly it?: Stripetax_product_registrations_resource_country_options_europe;
  readonly jp?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly ke?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly kg?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly kh?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly kr?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly kz?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly la?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly lk?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly lt?: Stripetax_product_registrations_resource_country_options_europe;
  readonly lu?: Stripetax_product_registrations_resource_country_options_europe;
  readonly lv?: Stripetax_product_registrations_resource_country_options_europe;
  readonly ma?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly md?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly me?: Stripetax_product_registrations_resource_country_options_default;
  readonly mk?: Stripetax_product_registrations_resource_country_options_default;
  readonly mr?: Stripetax_product_registrations_resource_country_options_default;
  readonly mt?: Stripetax_product_registrations_resource_country_options_europe;
  readonly mu?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly mx?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly my?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ng?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly nl?: Stripetax_product_registrations_resource_country_options_europe;
  readonly no?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly np?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly nz?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly om?: Stripetax_product_registrations_resource_country_options_default;
  readonly pe?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ph?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly pl?: Stripetax_product_registrations_resource_country_options_europe;
  readonly pt?: Stripetax_product_registrations_resource_country_options_europe;
  readonly ro?: Stripetax_product_registrations_resource_country_options_europe;
  readonly rs?: Stripetax_product_registrations_resource_country_options_default;
  readonly ru?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly sa?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly se?: Stripetax_product_registrations_resource_country_options_europe;
  readonly sg?: Stripetax_product_registrations_resource_country_options_default_inbound_goods;
  readonly si?: Stripetax_product_registrations_resource_country_options_europe;
  readonly sk?: Stripetax_product_registrations_resource_country_options_europe;
  readonly sn?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly sr?: Stripetax_product_registrations_resource_country_options_default;
  readonly th?: Stripetax_product_registrations_resource_country_options_thailand;
  readonly tj?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly tr?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly tw?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly tz?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ua?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly ug?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly us?: Stripetax_product_registrations_resource_country_options_united_states;
  readonly uy?: Stripetax_product_registrations_resource_country_options_default;
  readonly uz?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly vn?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly za?: Stripetax_product_registrations_resource_country_options_default;
  readonly zm?: Stripetax_product_registrations_resource_country_options_simplified;
  readonly zw?: Stripetax_product_registrations_resource_country_options_default;
} & { readonly [x: string]: Schema.Json };
export type Stripetax_registration = {
  readonly active_from: number;
  readonly country: string;
  readonly country_options: Stripetax_product_registrations_resource_country_options;
  readonly created: number;
  readonly expires_at?: number | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "tax.registration";
  readonly status: "active" | "expired" | "scheduled";
} & { readonly [x: string]: Schema.Json };

export const Stripetax_id = Schema.suspend(
  (): Schema.Codec<Stripetax_id> =>
    Schema.StructWithRest(
      Schema.Struct({
        country: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Two-letter ISO code representing the country of the tax ID.",
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
            ]).annotate({ description: "ID of the customer." }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "ID of the Account representing the customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
        object: Schema.Literal("tax_id").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        owner: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripetax_i_ds_owner> => Stripetax_i_ds_owner,
              ),
            ]).annotate({
              description: "The account or customer the tax ID belongs to.",
            }),
            Schema.Null,
          ]),
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
            "Type of the tax ID, one of `ad_nrt`, `ae_trn`, `al_tin`, `am_tin`, `ao_tin`, `ar_cuit`, `au_abn`, `au_acn`, `au_arn`, `au_wpn`, `aw_tin`, `az_tin`, `ba_tin`, `bb_tin`, `bd_bin`, `bf_ifu`, `bg_uic`, `bh_vat`, `bj_ifu`, `bo_tin`, `br_cnpj`, `br_cpf`, `bs_tin`, `bw_vat`, `by_tin`, `ca_bn`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `ca_qst`, `cd_nif`, `ch_uid`, `ch_vat`, `ci_vat`, `cl_tin`, `cm_niu`, `cn_tin`, `co_nit`, `cr_tin`, `cv_nif`, `cz_dic`, `de_stn`, `do_rcn`, `ec_ruc`, `eg_tin`, `es_cif`, `et_tin`, `eu_oss_vat`, `eu_vat`, `fo_vat`, `fr_siren`, `fr_siret`, `fr_spi`, `gb_vat`, `ge_vat`, `gh_tin`, `gi_tin`, `gn_nif`, `hk_br`, `hr_oib`, `hu_tin`, `ic_nif`, `id_npwp`, `il_vat`, `in_gst`, `is_kt`, `is_vat`, `it_cf`, `jp_cn`, `jp_rn`, `jp_trn`, `ke_pin`, `kg_tin`, `kh_tin`, `kr_brn`, `kz_bin`, `la_tin`, `li_uid`, `li_vat`, `lk_vat`, `ma_vat`, `md_cf`, `md_vat`, `me_pib`, `mk_vat`, `mr_nif`, `mu_vat`, `mx_rfc`, `my_frp`, `my_itn`, `my_sst`, `mz_nuit`, `ng_tin`, `no_vat`, `no_voec`, `np_pan`, `nz_bn`, `nz_gst`, `om_vat`, `pe_ruc`, `ph_tin`, `pl_nip`, `pt_nif`, `py_ruc`, `ro_tin`, `rs_pib`, `ru_inn`, `ru_kpp`, `sa_vat`, `sg_gst`, `sg_uen`, `si_tin`, `sm_coe`, `sn_ninea`, `sr_fin`, `sv_nit`, `th_vat`, `tj_tin`, `tr_tin`, `tt_bir`, `tt_vat`, `tw_vat`, `tz_vat`, `ua_vat`, `ug_tin`, `us_ein`, `uy_ruc`, `uz_tin`, `uz_vat`, `ve_rif`, `vn_tin`, `za_vat`, `zm_tin`, or `zw_tin`. Note that some legacy tax IDs have type `unknown`",
        }),
        value: Schema.String.annotate({
          description: "Value of the tax ID.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        verification: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetax_id_verification]).annotate({
              description: "Tax ID verification information.",
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
      title: "Tax ID",
      description:
        "You can add one or multiple tax IDs to a [customer](https://docs.stripe.com/api/customers) or account.\nCustomer and account tax IDs get displayed on related invoices and credit notes.\n\nRelated guides: [Customer tax identification numbers](https://docs.stripe.com/billing/taxes/tax-ids), [Account tax IDs](https://docs.stripe.com/invoicing/connect#account-tax-ids)",
      identifier: "Stripetax_id",
    }),
);
export const Stripetax_i_ds_owner = Schema.suspend(
  (): Schema.Codec<Stripetax_i_ds_owner> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
          ]).annotate({
            description:
              "The account being referenced when `type` is `account`.",
          }),
        ),
        application: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripeapplication,
          ]).annotate({
            description:
              "The Connect Application being referenced when `type` is `application`.",
          }),
        ),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
          ]).annotate({
            description:
              "The customer being referenced when `type` is `customer`.",
          }),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Account representing the customer being referenced when `type` is `customer`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals([
          "account",
          "application",
          "customer",
          "self",
        ]).annotate({ description: "Type of owner referenced." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "TaxIDsOwner",
      description: "",
      identifier: "Stripetax_i_ds_owner",
    }),
);
export const Stripeprice = Schema.suspend(
  (): Schema.Codec<Stripeprice> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description: "Whether the price can be used for new purchases.",
        }),
        billing_scheme: Schema.Literals(["per_unit", "tiered"]).annotate({
          description:
            "Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.",
        }),
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
        currency_options: Schema.optionalKey(
          Schema.Record(Schema.String, Stripecurrency_option).annotate({
            description:
              "Prices defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
          }),
        ),
        custom_unit_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecustom_unit_amount, Schema.Null]).annotate({
              description:
                "When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.",
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
        lookup_key: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        metadata: Schema.Record(
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
        nickname: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A brief description of the price, hidden from customers.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("price").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        product: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripeproduct> => Stripeproduct),
          Stripedeleted_product,
        ]).annotate({
          description: "The ID of the product this price is associated with.",
        }),
        recurring: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Striperecurring, Schema.Null]).annotate({
              description:
                "The recurring components of a price such as `interval` and `usage_type`.",
            }),
            Schema.Null,
          ]),
        ),
        tax_behavior: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate(
              {
                description:
                  "Only required if a [default tax behavior](https://docs.stripe.com/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.",
              },
            ),
            Schema.Null,
          ]),
        ),
        tiers: Schema.optionalKey(
          Schema.Array(Stripeprice_tier).annotate({
            description:
              "Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.",
          }),
        ),
        tiers_mode: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["graduated", "volume"]).annotate({
              description:
                "Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price. In `graduated` tiering, pricing can change as the quantity grows.",
            }),
            Schema.Null,
          ]),
        ),
        transform_quantity: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetransform_quantity, Schema.Null]).annotate({
              description:
                "Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with `tiers`.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals(["one_time", "recurring"]).annotate({
          description:
            "One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.",
        }),
        unit_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The unit amount in cents (or local equivalent) to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        unit_amount_decimal: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The unit amount in cents (or local equivalent) to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.",
              format: "decimal",
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
      title: "Price",
      description:
        'Prices define the unit cost, currency, and (optional) billing cycle for both recurring and one-time purchases of products.\n[Products](https://docs.stripe.com/api#products) help you track inventory or provisioning, and prices help you track payment terms. Different physical goods or levels of service should be represented by products, and pricing options should be represented by prices. This approach lets you change prices without having to change your provisioning scheme.\n\nFor example, you might have a single "gold" product that has prices for $10/month, $100/year, and €9 once.\n\nRelated guides: [Set up a subscription](https://docs.stripe.com/billing/subscriptions/set-up-subscription), [create an invoice](https://docs.stripe.com/billing/invoices/create), and more about [products and prices](https://docs.stripe.com/products-prices/overview).',
      identifier: "Stripeprice",
    }),
);
export const Stripeproduct = Schema.suspend(
  (): Schema.Codec<Stripeproduct> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description:
            "Whether the product is currently available for purchase.",
        }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        default_price: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeprice> => Stripeprice),
              Schema.Null,
            ]).annotate({
              description:
                "The ID of the [Price](https://docs.stripe.com/api/prices) object that is the default price for this product.",
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
        images: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "A list of up to 8 URLs of images for this product, meant to be displayable to the customer.",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        marketing_features: Schema.Array(
          Stripeproduct_marketing_feature,
        ).annotate({
          description:
            "A list of up to 15 marketing features for this product. These are displayed in [pricing tables](https://docs.stripe.com/payments/checkout/pricing-table).",
        }),
        metadata: Schema.Record(
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
        name: Schema.String.annotate({
          description:
            "The product's name, meant to be displayable to the customer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("product").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        package_dimensions: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepackage_dimensions, Schema.Null]).annotate({
              description:
                "The dimensions of this product for shipping purposes.",
            }),
            Schema.Null,
          ]),
        ),
        shippable: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Whether this product is shipped (i.e., physical goods).",
            }),
            Schema.Null,
          ]),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Extra information about a product which will appear on your customer's credit card statement. In the case that multiple products are billed at once, the first statement descriptor will be used. Only used for subscription payments.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        tax_code: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetax_code,
              Schema.Null,
            ]).annotate({
              description:
                "A [tax code](https://docs.stripe.com/tax/tax-categories) ID.",
            }),
            Schema.Null,
          ]),
        ),
        tax_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetax_product_tax_details_resource_tax_details,
              Schema.Null,
            ]).annotate({
              description:
                "Tax details for this product, including the [tax code](/tax/tax-codes) and an optional performance location.",
            }),
            Schema.Null,
          ]),
        ),
        unit_label: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A label that represents units of this product. When set, this will be included in customers' receipts, invoices, Checkout, and the customer portal.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        updated: Schema.Number.annotate({
          description:
            "Time at which the object was last updated. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A URL of a publicly-accessible webpage for this product.",
            }).check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
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
      title: "Product",
      description:
        "Products describe the specific goods or services you offer to your customers.\nFor example, you might offer a Standard and Premium version of your goods or service; each version would be a separate Product.\nThey can be used in conjunction with [Prices](https://docs.stripe.com/api#prices) to configure pricing in Payment Links, Checkout, and Subscriptions.\n\nRelated guides: [Set up a subscription](https://docs.stripe.com/billing/subscriptions/set-up-subscription),\n[share a Payment Link](https://docs.stripe.com/payment-links),\n[accept payments with Checkout](https://docs.stripe.com/payments/accept-a-payment#create-product-prices-upfront),\nand more about [Products and Prices](https://docs.stripe.com/products-prices/overview)",
      identifier: "Stripeproduct",
    }),
);
export const Stripetax_deducted_at_source = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("tax_deducted_at_source").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    period_end: Schema.Number.annotate({
      description:
        "The end of the invoicing period. This TDS applies to Stripe fees collected during this invoicing period.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    period_start: Schema.Number.annotate({
      description:
        "The start of the invoicing period. This TDS applies to Stripe fees collected during this invoicing period.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    tax_deduction_account_number: Schema.String.annotate({
      description: "The TAN that was supplied to Stripe when TDS was assessed",
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
  title: "TaxDeductedAtSource",
  description: "",
  identifier: "Stripetax_deducted_at_source",
});
export const Stripeprice_tier = Schema.StructWithRest(
  Schema.Struct({
    flat_amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Price for the entire tier.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    flat_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    unit_amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Per unit price for units relevant to the tier.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    unit_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    up_to: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Up to and including to this quantity will be contained in the tier.",
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
  title: "PriceTier",
  description: "",
  identifier: "Stripeprice_tier",
});
export const Stripeproduct_marketing_feature = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.optionalKey(
      Schema.String.annotate({
        description: "The marketing feature name. Up to 80 characters long.",
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
  title: "ProductMarketingFeature",
  description: "",
  identifier: "Stripeproduct_marketing_feature",
});
export const Stripetax_code_requirements = Schema.StructWithRest(
  Schema.Struct({
    performance_location: Schema.Literals(["optional", "required"]).annotate({
      description:
        "Describes whether a performance location is required for a successful tax calculation with a tax code.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "TaxCodeRequirements",
  description: "",
  identifier: "Stripetax_code_requirements",
});
export const Stripetax_product_tax_details_resource_tax_details =
  Schema.StructWithRest(
    Schema.Struct({
      performance_location: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The ID of a tax location with type `performance`, representing where the performance takes place.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      tax_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A [tax code](https://docs.stripe.com/tax/tax-categories) ID.",
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
    title: "Tax Detail",
    description:
      "Tax details contains information about the data that was used to calculate taxes.",
    identifier: "Stripetax_product_tax_details_resource_tax_details",
  });
export const Stripetax_rate_flat_amount = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description:
        "Amount of the tax when the `rate_type` is `flat_amount`. This positive integer represents how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description: "Three-letter ISO currency code, in lowercase.",
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
  title: "Flat Amount",
  description:
    "The amount of the tax rate when the `rate_type`` is `flat_amount`. Tax rates with `rate_type` `percentage` can vary based on the transaction, resulting in this field being `null`. This field exposes the amount and currency of the flat tax rate.",
  identifier: "Stripetax_rate_flat_amount",
});
export const Stripetax_id_verification = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literals([
      "pending",
      "unavailable",
      "unverified",
      "verified",
    ]).annotate({
      description:
        "Verification status, one of `pending`, `verified`, `unverified`, or `unavailable`.",
    }),
    verified_address: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Verified address." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    verified_name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Verified name." }).check(
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
  title: "tax_id_verification",
  description: "",
  identifier: "Stripetax_id_verification",
});
export const Stripeplan_tier = Schema.StructWithRest(
  Schema.Struct({
    flat_amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Price for the entire tier.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    flat_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Same as `flat_amount`, but contains a decimal value with at most 12 decimal places.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    unit_amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Per unit price for units relevant to the tier.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    unit_amount_decimal: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Same as `unit_amount`, but contains a decimal value with at most 12 decimal places.",
          format: "decimal",
        }),
        Schema.Null,
      ]),
    ),
    up_to: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Up to and including to this quantity will be contained in the tier.",
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
  title: "PlanTier",
  description: "",
  identifier: "Stripeplan_tier",
});
export const Stripeproduct_catalog_impl_endpoints_trial_offer_resource_relative_duration =
  Schema.StructWithRest(
    Schema.Struct({
      iterations: Schema.Number.annotate({
        description:
          "The number of iterations of the price's interval for this trial offer.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "ProductCatalogImplEndpointsTrialOfferResourceRelativeDuration",
    description: "",
    identifier:
      "Stripeproduct_catalog_impl_endpoints_trial_offer_resource_relative_duration",
  });
export const Stripetax_product_registrations_resource_country_options_default_standard =
  Schema.StructWithRest(
    Schema.Struct({
      place_of_supply_scheme: Schema.Literals([
        "inbound_goods",
        "standard",
      ]).annotate({
        description:
          "Place of supply scheme used in an Default standard registration.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TaxProductRegistrationsResourceCountryOptionsDefaultStandard",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_default_standard",
  });
export const Stripetax_product_registrations_resource_country_options_default =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literal("standard").annotate({
        description: "Type of registration in `country`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TaxProductRegistrationsResourceCountryOptionsDefault",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_default",
  });
export const Stripetax_product_registrations_resource_country_options_simplified =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literal("simplified").annotate({
        description: "Type of registration in `country`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TaxProductRegistrationsResourceCountryOptionsSimplified",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_simplified",
  });
export const Stripetax_product_registrations_resource_country_options_eu_standard =
  Schema.StructWithRest(
    Schema.Struct({
      place_of_supply_scheme: Schema.Literals([
        "inbound_goods",
        "small_seller",
        "standard",
      ]).annotate({
        description:
          "Place of supply scheme used in an EU standard registration.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TaxProductRegistrationsResourceCountryOptionsEuStandard",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_eu_standard",
  });
export const Stripetax_product_registrations_resource_country_options_ca_province_standard =
  Schema.StructWithRest(
    Schema.Struct({
      province: Schema.String.annotate({
        description:
          "Two-letter CA province code ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).",
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
    title: "TaxProductRegistrationsResourceCountryOptionsCaProvinceStandard",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_ca_province_standard",
  });
export const Stripetax_product_registrations_resource_country_options_thailand =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literal("simplified").annotate({
        description: "Type of registration in `country`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TaxProductRegistrationsResourceCountryOptionsThailand",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_thailand",
  });
export const Stripetax_product_registrations_resource_country_options_us_admissions_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=admissions_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsAdmissionsTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_admissions_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_attendance_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=attendance_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsAttendanceTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_attendance_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_entertainment_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=entertainment_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsEntertainmentTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_entertainment_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_gross_receipts_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=gross_receipts_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsGrossReceiptsTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_gross_receipts_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_hospitality_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=hospitality_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsHospitalityTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_hospitality_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_local_amusement_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [FIPS code](https://www.census.gov/library/reference/code-lists/ansi.html) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsLocalAmusementTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_local_amusement_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_local_lease_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [FIPS code](https://www.census.gov/library/reference/code-lists/ansi.html) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsLocalLeaseTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_local_lease_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_luxury_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=luxury_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsLuxuryTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_luxury_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_mass_transit_parking_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=mass_transit_parking_tax#registration-types) representing the local jurisdiction.",
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
    title:
      "TaxProductRegistrationsResourceCountryOptionsUsMassTransitParkingTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_mass_transit_parking_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_parking_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=parking_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsParkingTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_parking_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_resort_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=resort_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsResortTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_resort_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_state_sales_tax_election =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "A [FIPS code](https://www.census.gov/library/reference/code-lists/ansi.html) representing the local jurisdiction.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      type: Schema.Literals([
        "local_use_tax",
        "simplified_sellers_use_tax",
        "single_local_use_tax",
      ]).annotate({
        description:
          "The type of the election for the state sales tax registration.",
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
      "TaxProductRegistrationsResourceCountryOptionsUsStateSalesTaxElection",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_state_sales_tax_election",
  });
export const Stripetax_product_registrations_resource_country_options_us_tourism_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=tourism_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsTourismTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_tourism_tax",
  });
export const Stripetax_product_registrations_resource_country_options_us_utility_users_tax =
  Schema.StructWithRest(
    Schema.Struct({
      jurisdiction: Schema.String.annotate({
        description:
          "A [jurisdiction code](https://docs.stripe.com/tax/registering?type=utility_users_tax#registration-types) representing the local jurisdiction.",
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
    title: "TaxProductRegistrationsResourceCountryOptionsUsUtilityUsersTax",
    description: "",
    identifier:
      "Stripetax_product_registrations_resource_country_options_us_utility_users_tax",
  });
export const Stripetax_location = Schema.suspend(
  (): Schema.Codec<Stripetax_location> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Stripeaddress,
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                'A descriptive text providing additional context about the tax location. This can include information about the venue, types of events held, services available, or any relevant details for better identification (for example, "A spacious auditorium suitable for large concerts and events.").',
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
        object: Schema.Literal("tax.location").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        type: Schema.Literal("performance").annotate({
          description:
            "The type of tax location to be defined. Currently the only option is `performance`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Tax location",
      description:
        "Tax locations represent venues for services, tickets, or other product types.",
      identifier: "Stripetax.location",
    }),
);
export const Stripetax_code = Schema.suspend(
  (): Schema.Codec<Stripetax_code> =>
    Schema.StructWithRest(
      Schema.Struct({
        description: Schema.String.annotate({
          description:
            "A detailed description of which types of products the tax code represents.",
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
        name: Schema.String.annotate({
          description: "A short name for the tax code.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("tax_code").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        requirements: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetax_code_requirements]).annotate({
              description:
                "An object that describes more information about the tax location required for this tax code. Some tax codes require a [performance location](/tax/location-sales#required-versus-optional-performance-locations) to calculate tax correctly.",
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
      title: "Tax Code",
      description:
        "[Tax codes](https://stripe.com/docs/tax/tax-categories) classify goods and services for tax purposes.",
      identifier: "Stripetax_code",
    }),
);
export const Stripetax_rate = Schema.suspend(
  (): Schema.Codec<Stripetax_rate> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description:
            "Defaults to `true`. When set to `false`, this tax rate cannot be used with new applications or Checkout Sessions, but will still work for subscriptions and invoices that already have it set.",
        }),
        country: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
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
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An arbitrary string attached to the tax rate for your internal use only. It will not be visible to your customers.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        display_name: Schema.String.annotate({
          description:
            "The display name of the tax rates as it will appear to your customer on their receipt email, PDF, and the hosted invoice page.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        effective_percentage: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Actual/effective tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true,\nthis percentage reflects the rate actually used to calculate tax based on the product's taxability\nand whether the user is registered to collect taxes in the corresponding jurisdiction.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        flat_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetax_rate_flat_amount]).annotate({
              description:
                "The amount of the tax rate when the `rate_type` is `flat_amount`. Tax rates with `rate_type` `percentage` can vary based on the transaction, resulting in this field being `null`. This field exposes the amount and currency of the flat tax rate.",
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
        inclusive: Schema.Boolean.annotate({
          description:
            "This specifies if the tax rate is inclusive or exclusive.",
        }),
        jurisdiction: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The jurisdiction for the tax rate. You can use this label field for tax reporting purposes. It also appears on your customer’s invoice.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        jurisdiction_level: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "city",
              "country",
              "county",
              "district",
              "multiple",
              "state",
            ]).annotate({
              description:
                "The level of the jurisdiction that imposes this tax rate. Will be `null` for manually defined tax rates.",
            }),
            Schema.Null,
          ]),
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
        object: Schema.Literal("tax_rate").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        percentage: Schema.Number.annotate({
          description:
            "Tax rate percentage out of 100. For tax calculations with automatic_tax[enabled]=true, this percentage includes the statutory tax rate of non-taxable jurisdictions.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        rate_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["flat_amount", "percentage"]).annotate({
              description:
                "Indicates the type of tax rate applied to the taxable amount. This value can be `null` when no tax applies to the location. This field is only present for TaxRates created by Stripe Tax.",
            }),
            Schema.Null,
          ]),
        ),
        state: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                '[ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without country prefix. For example, "NY" for New York, United States.',
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        tax_type: Schema.optionalKey(
          Schema.Union([
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
            ]).annotate({
              description:
                "The high-level tax type, such as `vat` or `sales_tax`.",
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
      title: "Tax Rate",
      description:
        "Tax rates can be applied to [invoices](/invoicing/taxes/tax-rates), [subscriptions](/billing/taxes/tax-rates) and [Checkout Sessions](/payments/checkout/use-manual-tax-rates) to collect tax.\n\nRelated guide: [Tax rates](/billing/taxes/tax-rates)",
      identifier: "Stripetax_rate",
    }),
);
export const Stripeproduct_catalog_impl_endpoints_trial_offer_resource_transition =
  Schema.suspend(
    (): Schema.Codec<Stripeproduct_catalog_impl_endpoints_trial_offer_resource_transition> =>
      Schema.StructWithRest(
        Schema.Struct({
          price: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripeprice,
            Stripedeleted_price,
          ]).annotate({
            description:
              "The new price to use at the end of the trial offer period.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "ProductCatalogImplEndpointsTrialOfferResourceTransition",
        description: "",
        identifier:
          "Stripeproduct_catalog_impl_endpoints_trial_offer_resource_transition",
      }),
  );
export const Stripeproduct_feature = Schema.suspend(
  (): Schema.Codec<Stripeproduct_feature> =>
    Schema.StructWithRest(
      Schema.Struct({
        entitlement_feature: Stripeentitlements_feature,
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
        object: Schema.Literal("product_feature").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "ProductFeature",
      description:
        "A product_feature represents an attachment between a feature and a product.\nWhen a product is purchased that has a feature attached, Stripe will create an entitlement to the feature for the purchasing customer.",
      identifier: "Stripeproduct_feature",
    }),
);
export const Stripeplan = Schema.suspend(
  (): Schema.Codec<Stripeplan> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description: "Whether the plan can be used for new purchases.",
        }),
        amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The unit amount in cents (or local equivalent) to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        amount_decimal: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The unit amount in cents (or local equivalent) to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.",
              format: "decimal",
            }),
            Schema.Null,
          ]),
        ),
        billing_scheme: Schema.Literals(["per_unit", "tiered"]).annotate({
          description:
            "Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `amount`) will be charged per unit in `quantity` (for plans with `usage_type=licensed`), or per unit of total usage (for plans with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.",
        }),
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
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        interval: Schema.Literals(["day", "month", "week", "year"]).annotate({
          description:
            "The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.",
        }),
        interval_count: Schema.Number.annotate({
          description:
            "The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        meter: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The meter tracking the usage of a metered price",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        nickname: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A brief description of the plan, hidden from customers.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("plan").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        product: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeproduct,
              Stripedeleted_product,
            ]).annotate({
              description: "The product whose pricing this plan determines.",
            }),
            Schema.Null,
          ]),
        ),
        tiers: Schema.optionalKey(
          Schema.Array(Stripeplan_tier).annotate({
            description:
              "Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.",
          }),
        ),
        tiers_mode: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["graduated", "volume"]).annotate({
              description:
                "Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price. In `graduated` tiering, pricing can change as the quantity grows.",
            }),
            Schema.Null,
          ]),
        ),
        transform_usage: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetransform_usage]).annotate({
              description:
                "Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with `tiers`.",
            }),
            Schema.Null,
          ]),
        ),
        trial_period_days: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Default number of trial days when subscribing a customer to this plan using [`trial_from_plan=true`](https://docs.stripe.com/api#create_subscription-trial_from_plan).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        usage_type: Schema.Literals(["licensed", "metered"]).annotate({
          description:
            "Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Plan",
      description:
        'You can now model subscriptions more flexibly using the [Prices API](https://docs.stripe.com/api#prices). It replaces the Plans API and is backwards compatible to simplify your migration.\n\nPlans define the base price, currency, and billing cycle for recurring purchases of products.\n[Products](https://docs.stripe.com/api#products) help you track inventory or provisioning, and plans help you track pricing. Different physical goods or levels of service should be represented by products, and pricing options should be represented by plans. This approach lets you change prices without having to change your provisioning scheme.\n\nFor example, you might have a single "gold" product that has plans for $10/month, $100/year, €9/month, and €90/year.\n\nRelated guides: [Set up a subscription](https://docs.stripe.com/billing/subscriptions/set-up-subscription) and more about [products and prices](https://docs.stripe.com/products-prices/overview).',
      identifier: "Stripeplan",
    }),
);
export const Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_duration =
  Schema.suspend(
    (): Schema.Codec<Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_duration> =>
      Schema.StructWithRest(
        Schema.Struct({
          relative: Schema.optionalKey(
            Stripeproduct_catalog_impl_endpoints_trial_offer_resource_relative_duration,
          ),
          type: Schema.Literal("relative").annotate({
            description: "The type of trial offer duration.",
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
          "ProductCatalogImplEndpointsTrialOfferResourceTrialOfferDuration",
        description: "",
        identifier:
          "Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_duration",
      }),
  );
export const Stripetax_product_registrations_resource_country_options_default_inbound_goods =
  Schema.suspend(
    (): Schema.Codec<Stripetax_product_registrations_resource_country_options_default_inbound_goods> =>
      Schema.StructWithRest(
        Schema.Struct({
          standard: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_standard,
          ),
          type: Schema.Literal("standard").annotate({
            description: "Type of registration in `country`.",
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
          "TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods",
        description: "",
        identifier:
          "Stripetax_product_registrations_resource_country_options_default_inbound_goods",
      }),
  );
export const Stripetax_product_registrations_resource_country_options_europe =
  Schema.suspend(
    (): Schema.Codec<Stripetax_product_registrations_resource_country_options_europe> =>
      Schema.StructWithRest(
        Schema.Struct({
          standard: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_eu_standard,
          ),
          type: Schema.Literals([
            "ioss",
            "oss_non_union",
            "oss_union",
            "standard",
          ]).annotate({
            description: "Type of registration in an EU country.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TaxProductRegistrationsResourceCountryOptionsEurope",
        description: "",
        identifier:
          "Stripetax_product_registrations_resource_country_options_europe",
      }),
  );
export const Stripetax_product_registrations_resource_country_options_spain =
  Schema.suspend(
    (): Schema.Codec<Stripetax_product_registrations_resource_country_options_spain> =>
      Schema.StructWithRest(
        Schema.Struct({
          standard: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_eu_standard,
          ),
          type: Schema.Literals([
            "ioss",
            "oss_non_union",
            "oss_union",
            "standard",
          ]).annotate({ description: "Type of registration in ES." }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TaxProductRegistrationsResourceCountryOptionsSpain",
        description: "",
        identifier:
          "Stripetax_product_registrations_resource_country_options_spain",
      }),
  );
export const Stripetax_product_registrations_resource_country_options_canada =
  Schema.suspend(
    (): Schema.Codec<Stripetax_product_registrations_resource_country_options_canada> =>
      Schema.StructWithRest(
        Schema.Struct({
          province_standard: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_ca_province_standard,
          ),
          type: Schema.Literals([
            "province_standard",
            "simplified",
            "standard",
          ]).annotate({ description: "Type of registration in Canada." }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TaxProductRegistrationsResourceCountryOptionsCanada",
        description: "",
        identifier:
          "Stripetax_product_registrations_resource_country_options_canada",
      }),
  );
export const Stripetax_product_registrations_resource_country_options_us_state_sales_tax =
  Schema.suspend(
    (): Schema.Codec<Stripetax_product_registrations_resource_country_options_us_state_sales_tax> =>
      Schema.StructWithRest(
        Schema.Struct({
          elections: Schema.optionalKey(
            Schema.Array(
              Stripetax_product_registrations_resource_country_options_us_state_sales_tax_election,
            ).annotate({
              description: "Elections for the state sales tax registration.",
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
        title: "TaxProductRegistrationsResourceCountryOptionsUsStateSalesTax",
        description: "",
        identifier:
          "Stripetax_product_registrations_resource_country_options_us_state_sales_tax",
      }),
  );
export const Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_end_behavior =
  Schema.suspend(
    (): Schema.Codec<Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_end_behavior> =>
      Schema.StructWithRest(
        Schema.Struct({
          transition: Schema.optionalKey(
            Stripeproduct_catalog_impl_endpoints_trial_offer_resource_transition,
          ),
          type: Schema.Literal("transition").annotate({
            description: "The type of behavior when the trial offer ends.",
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
          "ProductCatalogImplEndpointsTrialOfferResourceTrialOfferEndBehavior",
        description: "",
        identifier:
          "Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_end_behavior",
      }),
  );
export const Stripetax_product_registrations_resource_country_options_united_states =
  Schema.suspend(
    (): Schema.Codec<Stripetax_product_registrations_resource_country_options_united_states> =>
      Schema.StructWithRest(
        Schema.Struct({
          admissions_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_admissions_tax,
          ),
          attendance_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_attendance_tax,
          ),
          entertainment_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_entertainment_tax,
          ),
          gross_receipts_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_gross_receipts_tax,
          ),
          hospitality_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_hospitality_tax,
          ),
          local_amusement_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_local_amusement_tax,
          ),
          local_lease_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_local_lease_tax,
          ),
          luxury_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_luxury_tax,
          ),
          mass_transit_parking_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_mass_transit_parking_tax,
          ),
          parking_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_parking_tax,
          ),
          resort_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_resort_tax,
          ),
          state: Schema.String.annotate({
            description:
              "Two-letter US state code ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          state_sales_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_state_sales_tax,
          ),
          tourism_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_tourism_tax,
          ),
          type: Schema.Literals([
            "admissions_tax",
            "attendance_tax",
            "digital_excise_tax",
            "entertainment_tax",
            "gross_receipts_tax",
            "hospitality_tax",
            "local_amusement_tax",
            "local_lease_tax",
            "luxury_tax",
            "mass_transit_parking_tax",
            "parking_tax",
            "resort_tax",
            "state_communications_tax",
            "state_retail_delivery_fee",
            "state_sales_tax",
            "tourism_tax",
            "utility_users_tax",
          ]).annotate({ description: "Type of registration in the US." }),
          utility_users_tax: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_us_utility_users_tax,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TaxProductRegistrationsResourceCountryOptionsUnitedStates",
        description: "",
        identifier:
          "Stripetax_product_registrations_resource_country_options_united_states",
      }),
  );
export const Stripeproduct_catalog_trial_offer = Schema.suspend(
  (): Schema.Codec<Stripeproduct_catalog_trial_offer> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description:
            "Whether the trial offer is active. Set to false to archive the trial offer.",
        }),
        duration:
          Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_duration,
        end_behavior:
          Stripeproduct_catalog_impl_endpoints_trial_offer_resource_trial_offer_end_behavior,
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
        nickname: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A brief description of the trial offer, hidden from customers.",
            }).check(
              Schema.isMaxCodePoints(255).annotate({
                expected: "a string with at most 255 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("product_catalog.trial_offer").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        price: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeprice,
          Stripedeleted_price,
        ]).annotate({ description: "The price during the trial offer." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Trial Offer",
      description:
        "Trial offers let you define free or paid introductory pricing for a subscription item.\nA TrialOffer specifies the price to charge during the trial, how many billing intervals\nthe trial lasts, and what price the subscription item transitions to when the trial ends.\nYou attach a TrialOffer to a subscription item\nusing `items[current_trial][trial_offer]` when creating or updating a subscription.",
      identifier: "Stripeproduct_catalog.trial_offer",
    }),
);
export const Stripetax_product_registrations_resource_country_options =
  Schema.suspend(
    (): Schema.Codec<Stripetax_product_registrations_resource_country_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          ae: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          al: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          am: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ao: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          at: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          au: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          aw: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          az: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ba: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          bb: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          bd: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          be: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          bf: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          bg: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          bh: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          bj: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          bs: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          bw: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          by: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ca: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_canada,
          ),
          cd: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          ch: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          ci: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          cl: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          cm: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          co: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          cr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          cv: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          cy: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          cz: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          de: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          dk: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          ec: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ee: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          eg: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          es: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_spain,
          ),
          et: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          fi: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          fr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          gb: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          ge: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          gh: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          gn: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          gr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          hr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          hu: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          id: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ie: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          in: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          is: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          it: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          jp: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          ke: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          kg: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          kh: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          kr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          kz: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          la: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          lk: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          lt: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          lu: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          lv: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          ma: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          md: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          me: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          mk: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          mr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          mt: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          mu: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          mx: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          my: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ng: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          nl: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          no: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          np: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          nz: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          om: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          pe: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ph: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          pl: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          pt: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          ro: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          rs: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          ru: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          sa: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          se: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          sg: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default_inbound_goods,
          ),
          si: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          sk: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_europe,
          ),
          sn: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          sr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          th: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_thailand,
          ),
          tj: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          tr: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          tw: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          tz: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ua: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          ug: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          us: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_united_states,
          ),
          uy: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          uz: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          vn: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          za: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
          zm: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_simplified,
          ),
          zw: Schema.optionalKey(
            Stripetax_product_registrations_resource_country_options_default,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TaxProductRegistrationsResourceCountryOptions",
        description: "",
        identifier: "Stripetax_product_registrations_resource_country_options",
      }),
  );
export const Stripetax_registration = Schema.suspend(
  (): Schema.Codec<Stripetax_registration> =>
    Schema.StructWithRest(
      Schema.Struct({
        active_from: Schema.Number.annotate({
          description:
            "Time at which the registration becomes active. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        country: Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        country_options:
          Stripetax_product_registrations_resource_country_options,
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        expires_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If set, the registration stops being active at this time. If not set, the registration will be active indefinitely. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        object: Schema.Literal("tax.registration").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals(["active", "expired", "scheduled"]).annotate({
          description:
            "The status of the registration. This field is present for convenience and can be deduced from `active_from` and `expires_at`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Tax Registration",
      description:
        "A Tax `Registration` lets us know that your business is registered to collect tax on payments within a region, enabling you to [automatically collect tax](https://docs.stripe.com/tax).\n\nStripe doesn't register on your behalf with the relevant authorities when you create a Tax `Registration` object. For more information on how to register to collect tax, see [our guide](https://docs.stripe.com/tax/registering).\n\nRelated guide: [Using the Registrations API](https://docs.stripe.com/tax/registrations-api)",
      identifier: "Stripetax.registration",
    }),
);
