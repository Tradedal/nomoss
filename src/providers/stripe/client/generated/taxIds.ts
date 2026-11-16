// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripetax_id } from "./models/catalog.js";
import { Stripedeleted_tax_id, Stripeerror } from "./models/common.js";

export type GetTaxIdsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly owner?: {
    readonly account?: string;
    readonly customer?: string;
    readonly customer_account?: string;
    readonly type: "account" | "application" | "customer" | "self";
  } & { readonly [x: string]: Schema.Json };
  readonly starting_after?: string;
};
export type GetTaxIdsOutput = {
  readonly data: ReadonlyArray<Stripetax_id>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTaxIdsError = Stripeerror;
export type PostTaxIdsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly owner?: {
    readonly account?: string;
    readonly customer?: string;
    readonly customer_account?: string;
    readonly type: "account" | "application" | "customer" | "self";
  } & { readonly [x: string]: Schema.Json };
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
export type PostTaxIdsOutput = Stripetax_id;
export type PostTaxIdsError = Stripeerror;
export type GetTaxIdsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetTaxIdsIdOutput = Stripetax_id;
export type GetTaxIdsIdError = Stripeerror;
export type DeleteTaxIdsIdInput = { readonly id: string };
export type DeleteTaxIdsIdOutput = Stripedeleted_tax_id;
export type DeleteTaxIdsIdError = Stripeerror;

export const GetTaxIdsInput = Schema.Struct({
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
  owner: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(Schema.String),
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
        type: Schema.Literals(["account", "application", "customer", "self"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "owner_params" }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetTaxIdsOutput = Schema.StructWithRest(
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
export const GetTaxIdsError = Stripeerror;
export const PostTaxIdsInput = Schema.Struct({
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
  owner: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(Schema.String),
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
        type: Schema.Literals(["account", "application", "customer", "self"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
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
});
export const PostTaxIdsOutput = Stripetax_id;
export const PostTaxIdsError = Stripeerror;
export const GetTaxIdsIdInput = Schema.Struct({
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
export const GetTaxIdsIdOutput = Stripetax_id;
export const GetTaxIdsIdError = Stripeerror;
export const DeleteTaxIdsIdInput = Schema.Struct({
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteTaxIdsIdOutput = Stripedeleted_tax_id;
export const DeleteTaxIdsIdError = Stripeerror;
/**
 * The GetTaxIdsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxIdsOperation: StripeOperation & {
  readonly input: typeof GetTaxIdsInput;
  readonly output: typeof GetTaxIdsOutput;
  readonly error: typeof GetTaxIdsError;
} = {
  name: "GetTaxIds",
  method: "GET",
  path: "/v1/tax_ids",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "owner",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxIdsInput,
  output: GetTaxIdsOutput,
  error: GetTaxIdsError,
};
/**
 * The PostTaxIdsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTaxIdsOperation: StripeOperation & {
  readonly input: typeof PostTaxIdsInput;
  readonly output: typeof PostTaxIdsOutput;
  readonly error: typeof PostTaxIdsError;
} = {
  name: "PostTaxIds",
  method: "POST",
  path: "/v1/tax_ids",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTaxIdsInput,
  output: PostTaxIdsOutput,
  error: PostTaxIdsError,
};
/**
 * The GetTaxIdsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxIdsIdOperation: StripeOperation & {
  readonly input: typeof GetTaxIdsIdInput;
  readonly output: typeof GetTaxIdsIdOutput;
  readonly error: typeof GetTaxIdsIdError;
} = {
  name: "GetTaxIdsId",
  method: "GET",
  path: "/v1/tax_ids/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxIdsIdInput,
  output: GetTaxIdsIdOutput,
  error: GetTaxIdsIdError,
};
/**
 * The DeleteTaxIdsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteTaxIdsIdOperation: StripeOperation & {
  readonly input: typeof DeleteTaxIdsIdInput;
  readonly output: typeof DeleteTaxIdsIdOutput;
  readonly error: typeof DeleteTaxIdsIdError;
} = {
  name: "DeleteTaxIdsId",
  method: "DELETE",
  path: "/v1/tax_ids/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteTaxIdsIdInput,
  output: DeleteTaxIdsIdOutput,
  error: DeleteTaxIdsIdError,
};
/**
 * The makeTaxIdsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTaxIdsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTaxIds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxIds = Effect.fn("taxIds.GetTaxIds")(function* (
    input: GetTaxIdsInput,
  ) {
    const response: GetTaxIdsOutput = yield* client.invoke(
      GetTaxIdsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTaxIds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTaxIds = Effect.fn("taxIds.PostTaxIds")(function* (
    input: PostTaxIdsInput,
  ) {
    const response: PostTaxIdsOutput = yield* client.invoke(
      PostTaxIdsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTaxIdsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxIdsId = Effect.fn("taxIds.GetTaxIdsId")(function* (
    input: GetTaxIdsIdInput,
  ) {
    const response: GetTaxIdsIdOutput = yield* client.invoke(
      GetTaxIdsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteTaxIdsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteTaxIdsId = Effect.fn("taxIds.DeleteTaxIdsId")(function* (
    input: DeleteTaxIdsIdInput,
  ) {
    const response: DeleteTaxIdsIdOutput = yield* client.invoke(
      DeleteTaxIdsIdOperation,
      input,
    );
    return response;
  });
  return {
    GetTaxIds,
    PostTaxIds,
    GetTaxIdsId,
    DeleteTaxIdsId,
  };
});
