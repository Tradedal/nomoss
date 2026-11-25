// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_29 } from "./StripeResourceEntityInputAlternatives_29.js";
import { StripeResourceEntityInputAlternatives_30 } from "./StripeResourceEntityInputAlternatives_30.js";
import { StripeTaxIdResourceSchema } from "./StripeTaxIdPropsSchema.js";

export type StripeTaxIdPropsEntity = {
  readonly expand?: ReadonlyArray<string>;
  readonly owner?: {
    readonly account?: StripeResourceEntityInputAlternatives_29;
    readonly customer?: StripeResourceEntityInputAlternatives_30;
    readonly customer_account?: string;
    readonly type: "account" | "application" | "customer" | "self";
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_29
      | StripeResourceEntityInputAlternatives_30;
  };
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
};

export const StripeTaxIdPropsEntitySchema = annotateResourceSchema(
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
    owner: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          account: Schema.optionalKey(StripeResourceEntityInputAlternatives_29),
          customer: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_30,
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          type: Schema.Literals(["account", "application", "customer", "self"]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_29,
              StripeResourceEntityInputAlternatives_30,
            ]),
          ),
        ],
      ).annotate({
        title: "owner_params",
        description:
          "The account or customer the tax ID belongs to. Defaults to `owner[type]=self`.",
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
  }),
  StripeTaxIdResourceSchema,
);
