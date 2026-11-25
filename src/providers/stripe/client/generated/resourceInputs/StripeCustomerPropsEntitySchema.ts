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
import { StripeCustomerResourceSchema } from "./StripeCustomerPropsSchema.js";
import { StripeResourceEntityInputAlternatives_22 } from "./StripeResourceEntityInputAlternatives_22.js";

export type StripeCustomerPropsEntity = {
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
    readonly default_payment_method?: StripeResourceEntityInputAlternatives_22;
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
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_22;
  };
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
  readonly test_clock?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "test-helpers-test-clock";
  }>;
};

export const StripeCustomerPropsEntitySchema = annotateResourceSchema(
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
        description:
          "Specifies which fields in the response should be expanded.",
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
            StripeResourceEntityInputAlternatives_22,
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
              ).annotate({ title: "customer_rendering_options_param" }),
              Schema.Literal(""),
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_22,
            ]),
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
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("test-helpers-test-clock"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["TestHelpersTestClockId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
  }),
  StripeCustomerResourceSchema,
);
