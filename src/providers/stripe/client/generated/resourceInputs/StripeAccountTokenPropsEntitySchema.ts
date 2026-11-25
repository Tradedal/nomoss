// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeAccountTokenResourceSchema } from "./StripeAccountTokenPropsSchema.js";

export type StripeAccountTokenPropsEntity = {
  readonly contact_email?: string;
  readonly contact_phone?: string;
  readonly display_name?: string;
  readonly identity?: {
    readonly attestations?: {
      readonly directorship_declaration?: { readonly attested?: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly ownership_declaration?: { readonly attested?: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly persons_provided?: {
        readonly directors?: boolean;
        readonly executives?: boolean;
        readonly owners?: boolean;
        readonly ownership_exemption_reason?:
          | "qualified_entity_exceeds_ownership_threshold"
          | "qualifies_as_financial_institution";
      } & { readonly [x: string]: Schema.Json };
      readonly representative_declaration?: { readonly attested?: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly terms_of_service?: {
        readonly account?: { readonly shown_and_accepted?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly business_details?: {
      readonly additional_addresses?: ReadonlyArray<
        {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly purpose: "administrative" | "principal_place_of_business";
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
        readonly town?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly annual_revenue?: {
        readonly amount?: {
          readonly currency: string;
          readonly value: number;
        } & { readonly [x: string]: Schema.Json };
        readonly fiscal_year_end?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly documents?: {
        readonly bank_account_ownership_verification?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly company_license?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly company_memorandum_of_association?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly company_ministerial_decree?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly company_registration_verification?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly company_tax_id_verification?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly primary_verification?: {
          readonly front_back: {
            readonly back?: string;
            readonly front?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "front_back";
        } & { readonly [x: string]: Schema.Json };
        readonly proof_of_address?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly proof_of_registration?: {
          readonly files: ReadonlyArray<string>;
          readonly signer?: { readonly person: string } & {
            readonly [x: string]: Schema.Json;
          };
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly proof_of_ultimate_beneficial_ownership?: {
          readonly files: ReadonlyArray<string>;
          readonly signer?: { readonly person: string } & {
            readonly [x: string]: Schema.Json;
          };
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly estimated_worker_count?: number;
      readonly id_numbers?: ReadonlyArray<
        {
          readonly registrar?: string;
          readonly type:
            | "ae_crn"
            | "ae_vat"
            | "ao_nif"
            | "ar_cuit"
            | "at_fn"
            | "at_stn"
            | "at_vat"
            | "au_abn"
            | "au_acn"
            | "au_in"
            | "az_tin"
            | "bd_etin"
            | "be_cbe"
            | "be_vat"
            | "bg_uic"
            | "bg_vat"
            | "br_cnpj"
            | "ca_cn"
            | "ca_crarr"
            | "ca_gst_hst"
            | "ca_neq"
            | "ca_rid"
            | "ch_chid"
            | "ch_uid"
            | "cr_cpj"
            | "cr_nite"
            | "cy_he"
            | "cy_tic"
            | "cy_vat"
            | "cz_ico"
            | "cz_vat"
            | "de_hrn"
            | "de_stn"
            | "de_vat"
            | "dk_cvr"
            | "dk_vat"
            | "do_rcn"
            | "ee_rk"
            | "ee_vat"
            | "es_cif"
            | "es_vat"
            | "fi_vat"
            | "fi_yt"
            | "fr_rna"
            | "fr_siren"
            | "fr_vat"
            | "gb_crn"
            | "gb_vat"
            | "gi_crn"
            | "gr_afm"
            | "gr_gemi"
            | "gr_vat"
            | "gt_nit"
            | "hk_br"
            | "hk_cr"
            | "hr_mbs"
            | "hr_oib"
            | "hr_vat"
            | "hu_cjs"
            | "hu_tin"
            | "hu_vat"
            | "ie_crn"
            | "ie_trn"
            | "ie_vat"
            | "it_rea"
            | "it_vat"
            | "jp_cn"
            | "kz_bin"
            | "li_uid"
            | "lt_ccrn"
            | "lt_vat"
            | "lu_nif"
            | "lu_rcs"
            | "lu_vat"
            | "lv_urn"
            | "lv_vat"
            | "mt_crn"
            | "mt_tin"
            | "mt_vat"
            | "mx_rfc"
            | "my_brn"
            | "my_coid"
            | "my_itn"
            | "my_sst"
            | "mz_nuit"
            | "nl_kvk"
            | "nl_rsin"
            | "nl_vat"
            | "no_orgnr"
            | "nz_bn"
            | "nz_ird"
            | "pe_ruc"
            | "pk_ntn"
            | "pl_nip"
            | "pl_regon"
            | "pl_vat"
            | "pt_vat"
            | "ro_cui"
            | "ro_orc"
            | "ro_vat"
            | "sa_crn"
            | "sa_tin"
            | "se_orgnr"
            | "se_vat"
            | "sg_uen"
            | "si_msp"
            | "si_tin"
            | "si_vat"
            | "sk_dic"
            | "sk_ico"
            | "sk_vat"
            | "th_crn"
            | "th_prn"
            | "th_tin"
            | "us_ein";
          readonly value: string;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly monthly_estimated_revenue?: {
        readonly amount?: {
          readonly currency: string;
          readonly value: number;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly phone?: string;
      readonly registered_name?: string;
      readonly registration_date?: {
        readonly day: number;
        readonly month: number;
        readonly year: number;
      } & { readonly [x: string]: Schema.Json };
      readonly script_addresses?: {
        readonly kana?: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly kanji?: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly script_names?: {
        readonly kana?: { readonly registered_name?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly kanji?: { readonly registered_name?: string } & {
          readonly [x: string]: Schema.Json;
        };
      } & { readonly [x: string]: Schema.Json };
      readonly structure?:
        | "cooperative"
        | "free_zone_establishment"
        | "free_zone_llc"
        | "governmental_unit"
        | "government_instrumentality"
        | "incorporated_association"
        | "incorporated_non_profit"
        | "incorporated_partnership"
        | "limited_liability_partnership"
        | "llc"
        | "multi_member_llc"
        | "private_company"
        | "private_corporation"
        | "private_partnership"
        | "public_company"
        | "public_corporation"
        | "public_listed_corporation"
        | "public_partnership"
        | "registered_charity"
        | "single_member_llc"
        | "sole_establishment"
        | "sole_proprietorship"
        | "tax_exempt_government_instrumentality"
        | "trust"
        | "unincorporated_association"
        | "unincorporated_non_profit"
        | "unincorporated_partnership";
    } & { readonly [x: string]: Schema.Json };
    readonly entity_type?:
      | "company"
      | "government_entity"
      | "individual"
      | "non_profit";
    readonly individual?: {
      readonly additional_addresses?: ReadonlyArray<
        {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly purpose: "registered";
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly additional_names?: ReadonlyArray<
        {
          readonly full_name?: string;
          readonly given_name?: string;
          readonly purpose: "alias" | "maiden";
          readonly surname?: string;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
        readonly town?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly date_of_birth?: {
        readonly day: number;
        readonly month: number;
        readonly year: number;
      } & { readonly [x: string]: Schema.Json };
      readonly documents?: {
        readonly company_authorization?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly passport?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
        readonly primary_verification?: {
          readonly front_back: {
            readonly back?: string;
            readonly front?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "front_back";
        } & { readonly [x: string]: Schema.Json };
        readonly secondary_verification?: {
          readonly front_back: {
            readonly back?: string;
            readonly front?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "front_back";
        } & { readonly [x: string]: Schema.Json };
        readonly visa?: {
          readonly files: ReadonlyArray<string>;
          readonly type: "files";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly email?: string;
      readonly given_name?: string;
      readonly id_numbers?: ReadonlyArray<
        {
          readonly type:
            | "ae_eid"
            | "ao_nif"
            | "ar_cuil"
            | "ar_dni"
            | "at_stn"
            | "az_tin"
            | "bd_brc"
            | "bd_etin"
            | "bd_nid"
            | "be_nrn"
            | "bg_ucn"
            | "bn_nric"
            | "br_cpf"
            | "ca_sin"
            | "ch_oasi"
            | "cl_rut"
            | "cn_pp"
            | "co_nuip"
            | "cr_ci"
            | "cr_cpf"
            | "cr_dimex"
            | "cr_nite"
            | "cy_tic"
            | "cz_rc"
            | "de_stn"
            | "dk_cpr"
            | "do_cie"
            | "do_rcn"
            | "ec_ci"
            | "ee_ik"
            | "es_nif"
            | "fi_hetu"
            | "fr_nir"
            | "gb_nino"
            | "gr_afm"
            | "gt_nit"
            | "hk_id"
            | "hr_oib"
            | "hu_ad"
            | "id_nik"
            | "ie_ppsn"
            | "is_kt"
            | "it_cf"
            | "jp_inc"
            | "ke_pin"
            | "kz_iin"
            | "li_peid"
            | "lt_ak"
            | "lu_nif"
            | "lv_pk"
            | "mx_rfc"
            | "my_nric"
            | "mz_nuit"
            | "ng_nin"
            | "nl_bsn"
            | "no_nin"
            | "nz_ird"
            | "pe_dni"
            | "pk_cnic"
            | "pk_snic"
            | "pl_pesel"
            | "pt_nif"
            | "ro_cnp"
            | "sa_tin"
            | "se_pin"
            | "sg_fin"
            | "sg_nric"
            | "sk_dic"
            | "th_lc"
            | "th_pin"
            | "tr_tin"
            | "us_itin"
            | "us_itin_last_4"
            | "us_ssn"
            | "us_ssn_last_4"
            | "uy_dni"
            | "za_id";
          readonly value: string;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly legal_gender?: "female" | "male";
      readonly metadata?: { readonly [x: string]: string | null };
      readonly nationalities?: ReadonlyArray<string>;
      readonly phone?: string;
      readonly political_exposure?: "existing" | "none";
      readonly relationship?: {
        readonly director?: boolean;
        readonly executive?: boolean;
        readonly owner?: boolean;
        readonly percent_ownership?: string;
        readonly title?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly script_addresses?: {
        readonly kana?: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly kanji?: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly script_names?: {
        readonly kana?: {
          readonly given_name?: string;
          readonly surname?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly kanji?: {
          readonly given_name?: string;
          readonly surname?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly surname?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };

export const StripeAccountTokenPropsEntitySchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
      contact_email: Schema.optionalKey(
        Schema.String.annotate({
          description: "The primary contact email address for the Account.",
        }),
      ),
      contact_phone: Schema.optionalKey(
        Schema.String.annotate({
          description: "The default contact phone for the Account.",
        }),
      ),
      display_name: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "A descriptive name for the Account. This name will be surfaced in the Stripe Dashboard and on any invoices sent to the Account.",
        }),
      ),
      identity: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            attestations: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  directorship_declaration: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        attested: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "A boolean indicating if the directors information has been attested.",
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
                      description:
                        "This hash is used to attest that the directors information provided to Stripe is both current and correct; IP, date, and User Agent are expanded by Stripe.",
                    }),
                  ),
                  ownership_declaration: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        attested: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "A boolean indicating if the beneficial owner information has been attested.",
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
                      description:
                        "This hash is used to attest that the beneficial owner information provided to Stripe is both current and correct; IP, date, and User Agent are expanded by Stripe.",
                    }),
                  ),
                  persons_provided: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        directors: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "Whether the company’s directors have been provided. Set this Boolean to true after creating all the company’s directors with the [Persons API](https://docs.stripe.com/api/v2/core/accounts/createperson).",
                          }),
                        ),
                        executives: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "Whether the company’s executives have been provided. Set this Boolean to true after creating all the company’s executives with the [Persons API](https://docs.stripe.com/api/v2/core/accounts/createperson).",
                          }),
                        ),
                        owners: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "Whether the company’s owners have been provided. Set this Boolean to true after creating all the company’s owners with the [Persons API](https://docs.stripe.com/api/v2/core/accounts/createperson).",
                          }),
                        ),
                        ownership_exemption_reason: Schema.optionalKey(
                          Schema.Literals([
                            "qualified_entity_exceeds_ownership_threshold",
                            "qualifies_as_financial_institution",
                          ]).annotate({
                            description:
                              "Reason for why the company is exempt from providing ownership information.",
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
                      description:
                        "Attestation that all Persons with a specific Relationship value have been provided.",
                    }),
                  ),
                  representative_declaration: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        attested: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "A boolean indicating if the representative is authorized to act as the representative of their legal entity.",
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
                      description:
                        "This hash is used to attest that the representative is authorized to act as the representative of their legal entity; IP, date, and User Agent are expanded by Stripe.",
                    }),
                  ),
                  terms_of_service: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        account: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              shown_and_accepted: Schema.optionalKey(
                                Schema.Boolean.annotate({
                                  description:
                                    "The boolean value indicating if the terms of service have been accepted.",
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
                            description:
                              "Details on the Account's acceptance of the [Stripe Services Agreement]; IP, date, and User Agent are expanded by Stripe.",
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
                      description:
                        "Attestations of accepted terms of service agreements.",
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
                description:
                  "Attestations from the identity's key people, e.g. owners, executives, directors, representatives.",
              }),
            ),
            business_details: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  additional_addresses: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          city: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "City, district, suburb, town, or village.",
                            }),
                          ),
                          country: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                            }),
                          ),
                          line1: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Address line 1 (e.g., street, PO Box, or company name).",
                            }),
                          ),
                          line2: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Address line 2 (e.g., apartment, suite, unit, or building).",
                            }),
                          ),
                          postal_code: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "ZIP or postal code.",
                            }),
                          ),
                          purpose: Schema.Literals([
                            "administrative",
                            "principal_place_of_business",
                          ]).annotate({
                            description: "Purpose of additional address.",
                          }),
                          state: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "State, county, province, or region.",
                            }),
                          ),
                          town: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "Town or district.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ),
                    ).annotate({
                      description:
                        "Additional addresses associated with the business.",
                    }),
                  ),
                  address: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        city: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "City, district, suburb, town, or village.",
                          }),
                        ),
                        country: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                          }),
                        ),
                        line1: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "Address line 1 (e.g., street, PO Box, or company name).",
                          }),
                        ),
                        line2: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "Address line 2 (e.g., apartment, suite, unit, or building).",
                          }),
                        ),
                        postal_code: Schema.optionalKey(
                          Schema.String.annotate({
                            description: "ZIP or postal code.",
                          }),
                        ),
                        state: Schema.optionalKey(
                          Schema.String.annotate({
                            description: "State, county, province, or region.",
                          }),
                        ),
                        town: Schema.optionalKey(
                          Schema.String.annotate({
                            description: "Town or district.",
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
                      description:
                        "The business registration address of the business entity.",
                    }),
                  ),
                  annual_revenue: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        amount: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              currency: Schema.String.annotate({
                                description:
                                  "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
                              }),
                              value: Schema.Number.annotate({
                                description:
                                  "A non-negative integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#minor-units).",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
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
                            description:
                              "A non-negative integer representing the amount in the smallest currency unit.",
                          }),
                        ),
                        fiscal_year_end: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "The close-out date of the preceding fiscal year in ISO 8601 format. E.g. 2023-12-31 for the 31st of December, 2023.",
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
                      description:
                        "The business gross annual revenue for its preceding fiscal year.",
                    }),
                  ),
                  documents: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        bank_account_ownership_verification: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents that support the bank account ownership verification requirement. Must be a document associated with the account's primary active bank account that displays the last 4 digits of the account number, either a statement or a check.",
                          }),
                        ),
                        company_license: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents that demonstrate proof of a company's license to operate.",
                          }),
                        ),
                        company_memorandum_of_association: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents showing the company's Memorandum of Association.",
                          }),
                        ),
                        company_ministerial_decree: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "Certain countries only: One or more documents showing the ministerial decree legalizing the company's establishment.",
                          }),
                        ),
                        company_registration_verification: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents that demonstrate proof of a company's registration with the appropriate local authorities.",
                          }),
                        ),
                        company_tax_id_verification: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents that demonstrate proof of a company's tax ID.",
                          }),
                        ),
                        primary_verification: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              front_back: Schema.StructWithRest(
                                Schema.Struct({
                                  back: Schema.optionalKey(
                                    Schema.String.annotate({
                                      description:
                                        "A [file upload](https://docs.stripe.com/api/files/create) token representing the back of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
                                    }),
                                  ),
                                  front: Schema.optionalKey(
                                    Schema.String.annotate({
                                      description:
                                        "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
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
                                description:
                                  "The [file upload](https://docs.stripe.com/api/files/create) tokens referring to each side of the document.",
                              }),
                              type: Schema.Literal("front_back").annotate({
                                description:
                                  "The format of the verification document. Currently supports `front_back` only.",
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
                          ).annotate({
                            description: "A document verifying the business.",
                          }),
                        ),
                        proof_of_address: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents that demonstrate proof of address.",
                          }),
                        ),
                        proof_of_registration: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              signer: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    person: Schema.String.annotate({
                                      description:
                                        "Person signing the document.",
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
                                ).annotate({
                                  description:
                                    "Person that is signing the document.",
                                }),
                              ),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents that demonstrate proof of ultimate beneficial ownership.",
                          }),
                        ),
                        proof_of_ultimate_beneficial_ownership:
                          Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                files: Schema.Array(Schema.String).annotate({
                                  description:
                                    "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                                }),
                                signer: Schema.optionalKey(
                                  Schema.StructWithRest(
                                    Schema.Struct({
                                      person: Schema.String.annotate({
                                        description:
                                          "Person signing the document.",
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
                                  ).annotate({
                                    description:
                                      "Person that is signing the document.",
                                  }),
                                ),
                                type: Schema.Literal("files").annotate({
                                  description:
                                    "The format of the document. Currently supports `files` only.",
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
                            ).annotate({
                              description:
                                "One or more documents that demonstrate proof of ultimate beneficial ownership.",
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
                      description: "A document verifying the business.",
                    }),
                  ),
                  estimated_worker_count: Schema.optionalKey(
                    Schema.Number.annotate({
                      description:
                        "Estimated maximum number of workers currently engaged by the business (including employees, contractors, and vendors).",
                    }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                  ),
                  id_numbers: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          registrar: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The registrar of the ID number (Only valid for DE ID number types).",
                            }),
                          ),
                          type: Schema.Literals([
                            "ae_crn",
                            "ae_vat",
                            "ao_nif",
                            "ar_cuit",
                            "at_fn",
                            "at_stn",
                            "at_vat",
                            "au_abn",
                            "au_acn",
                            "au_in",
                            "az_tin",
                            "bd_etin",
                            "be_cbe",
                            "be_vat",
                            "bg_uic",
                            "bg_vat",
                            "br_cnpj",
                            "ca_cn",
                            "ca_crarr",
                            "ca_gst_hst",
                            "ca_neq",
                            "ca_rid",
                            "ch_chid",
                            "ch_uid",
                            "cr_cpj",
                            "cr_nite",
                            "cy_he",
                            "cy_tic",
                            "cy_vat",
                            "cz_ico",
                            "cz_vat",
                            "de_hrn",
                            "de_stn",
                            "de_vat",
                            "dk_cvr",
                            "dk_vat",
                            "do_rcn",
                            "ee_rk",
                            "ee_vat",
                            "es_cif",
                            "es_vat",
                            "fi_vat",
                            "fi_yt",
                            "fr_rna",
                            "fr_siren",
                            "fr_vat",
                            "gb_crn",
                            "gb_vat",
                            "gi_crn",
                            "gr_afm",
                            "gr_gemi",
                            "gr_vat",
                            "gt_nit",
                            "hk_br",
                            "hk_cr",
                            "hr_mbs",
                            "hr_oib",
                            "hr_vat",
                            "hu_cjs",
                            "hu_tin",
                            "hu_vat",
                            "ie_crn",
                            "ie_trn",
                            "ie_vat",
                            "it_rea",
                            "it_vat",
                            "jp_cn",
                            "kz_bin",
                            "li_uid",
                            "lt_ccrn",
                            "lt_vat",
                            "lu_nif",
                            "lu_rcs",
                            "lu_vat",
                            "lv_urn",
                            "lv_vat",
                            "mt_crn",
                            "mt_tin",
                            "mt_vat",
                            "mx_rfc",
                            "my_brn",
                            "my_coid",
                            "my_itn",
                            "my_sst",
                            "mz_nuit",
                            "nl_kvk",
                            "nl_rsin",
                            "nl_vat",
                            "no_orgnr",
                            "nz_bn",
                            "nz_ird",
                            "pe_ruc",
                            "pk_ntn",
                            "pl_nip",
                            "pl_regon",
                            "pl_vat",
                            "pt_vat",
                            "ro_cui",
                            "ro_orc",
                            "ro_vat",
                            "sa_crn",
                            "sa_tin",
                            "se_orgnr",
                            "se_vat",
                            "sg_uen",
                            "si_msp",
                            "si_tin",
                            "si_vat",
                            "sk_dic",
                            "sk_ico",
                            "sk_vat",
                            "th_crn",
                            "th_prn",
                            "th_tin",
                            "us_ein",
                          ]).annotate({
                            description:
                              "Open Enum. The ID number type of a business entity.",
                          }),
                          value: Schema.String.annotate({
                            description: "The value of the ID number.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ),
                    ).annotate({
                      description: "The ID numbers of a business entity.",
                    }),
                  ),
                  monthly_estimated_revenue: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        amount: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              currency: Schema.String.annotate({
                                description:
                                  "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
                              }),
                              value: Schema.Number.annotate({
                                description:
                                  "A non-negative integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#minor-units).",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
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
                            description:
                              "A non-negative integer representing the amount in the smallest currency unit.",
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
                      description:
                        "An estimate of the monthly revenue of the business.",
                    }),
                  ),
                  phone: Schema.optionalKey(
                    Schema.String.annotate({
                      description: "The phone number of the Business Entity.",
                    }),
                  ),
                  registered_name: Schema.optionalKey(
                    Schema.String.annotate({
                      description: "The business legal name.",
                    }),
                  ),
                  registration_date: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        day: Schema.Number.annotate({
                          description:
                            "The day of registration, between 1 and 31.",
                        }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                        month: Schema.Number.annotate({
                          description:
                            "The month of registration, between 1 and 12.",
                        }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                        year: Schema.Number.annotate({
                          description: "The four-digit year of registration.",
                        }).check(
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
                      description:
                        "When the business was incorporated or registered.",
                    }),
                  ),
                  script_addresses: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        kana: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              city: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "City, district, suburb, town, or village.",
                                }),
                              ),
                              country: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                                }),
                              ),
                              line1: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 1 (e.g., street, PO Box, or company name).",
                                }),
                              ),
                              line2: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 2 (e.g., apartment, suite, unit, or building).",
                                }),
                              ),
                              postal_code: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "ZIP or postal code.",
                                }),
                              ),
                              state: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "State, county, province, or region.",
                                }),
                              ),
                              town: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "Town or district.",
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
                          ).annotate({ description: "Kana Address." }),
                        ),
                        kanji: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              city: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "City, district, suburb, town, or village.",
                                }),
                              ),
                              country: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                                }),
                              ),
                              line1: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 1 (e.g., street, PO Box, or company name).",
                                }),
                              ),
                              line2: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 2 (e.g., apartment, suite, unit, or building).",
                                }),
                              ),
                              postal_code: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "ZIP or postal code.",
                                }),
                              ),
                              state: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "State, county, province, or region.",
                                }),
                              ),
                              town: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "Town or district.",
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
                          ).annotate({ description: "Kanji Address." }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      description:
                        "The business registration address of the business entity in non latin script.",
                    }),
                  ),
                  script_names: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        kana: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              registered_name: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Registered name of the business.",
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
                          ).annotate({ description: "Kana name." }),
                        ),
                        kanji: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              registered_name: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Registered name of the business.",
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
                          ).annotate({ description: "Kanji name." }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      description:
                        "The business legal name in non latin script.",
                    }),
                  ),
                  structure: Schema.optionalKey(
                    Schema.Literals([
                      "cooperative",
                      "free_zone_establishment",
                      "free_zone_llc",
                      "governmental_unit",
                      "government_instrumentality",
                      "incorporated_association",
                      "incorporated_non_profit",
                      "incorporated_partnership",
                      "limited_liability_partnership",
                      "llc",
                      "multi_member_llc",
                      "private_company",
                      "private_corporation",
                      "private_partnership",
                      "public_company",
                      "public_corporation",
                      "public_listed_corporation",
                      "public_partnership",
                      "registered_charity",
                      "single_member_llc",
                      "sole_establishment",
                      "sole_proprietorship",
                      "tax_exempt_government_instrumentality",
                      "trust",
                      "unincorporated_association",
                      "unincorporated_non_profit",
                      "unincorporated_partnership",
                    ]).annotate({
                      description:
                        "The category identifying the legal structure of the business.",
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
                description: "Information about the company or business.",
              }),
            ),
            entity_type: Schema.optionalKey(
              Schema.Literals([
                "company",
                "government_entity",
                "individual",
                "non_profit",
              ]).annotate({ description: "The entity type." }),
            ),
            individual: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  additional_addresses: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          city: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "City, district, suburb, town, or village.",
                            }),
                          ),
                          country: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                            }),
                          ),
                          line1: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Address line 1 (e.g., street, PO Box, or company name).",
                            }),
                          ),
                          line2: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Address line 2 (e.g., apartment, suite, unit, or building).",
                            }),
                          ),
                          postal_code: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "ZIP or postal code.",
                            }),
                          ),
                          purpose: Schema.Literal("registered").annotate({
                            description: "Purpose of additional address.",
                          }),
                          state: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "State, county, province, or region.",
                            }),
                          ),
                          town: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "Town or district.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ),
                    ).annotate({
                      description:
                        "Additional addresses associated with the individual.",
                    }),
                  ),
                  additional_names: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          full_name: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "The person's full name.",
                            }),
                          ),
                          given_name: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "The person's first or given name.",
                            }),
                          ),
                          purpose: Schema.Literals([
                            "alias",
                            "maiden",
                          ]).annotate({
                            description:
                              "The purpose or type of the additional name.",
                          }),
                          surname: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "The person's last or family name.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ),
                    ).annotate({
                      description:
                        "Additional names (e.g. aliases) associated with the individual.",
                    }),
                  ),
                  address: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        city: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "City, district, suburb, town, or village.",
                          }),
                        ),
                        country: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                          }),
                        ),
                        line1: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "Address line 1 (e.g., street, PO Box, or company name).",
                          }),
                        ),
                        line2: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "Address line 2 (e.g., apartment, suite, unit, or building).",
                          }),
                        ),
                        postal_code: Schema.optionalKey(
                          Schema.String.annotate({
                            description: "ZIP or postal code.",
                          }),
                        ),
                        state: Schema.optionalKey(
                          Schema.String.annotate({
                            description: "State, county, province, or region.",
                          }),
                        ),
                        town: Schema.optionalKey(
                          Schema.String.annotate({
                            description: "Town or district.",
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
                      description: "The individual's residential address.",
                    }),
                  ),
                  date_of_birth: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        day: Schema.Number.annotate({
                          description: "The day of the birth.",
                        }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                        month: Schema.Number.annotate({
                          description: "The month of birth.",
                        }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                        year: Schema.Number.annotate({
                          description: "The year of birth.",
                        }).check(
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
                      description: "The individual's date of birth.",
                    }),
                  ),
                  documents: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        company_authorization: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents that demonstrate proof that this person is authorized to represent the company.",
                          }),
                        ),
                        passport: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents showing the person's passport page with photo and personal data.",
                          }),
                        ),
                        primary_verification: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              front_back: Schema.StructWithRest(
                                Schema.Struct({
                                  back: Schema.optionalKey(
                                    Schema.String.annotate({
                                      description:
                                        "A [file upload](https://docs.stripe.com/api/files/create) token representing the back of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
                                    }),
                                  ),
                                  front: Schema.optionalKey(
                                    Schema.String.annotate({
                                      description:
                                        "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
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
                                description:
                                  "The [file upload](https://docs.stripe.com/api/files/create) tokens referring to each side of the document.",
                              }),
                              type: Schema.Literal("front_back").annotate({
                                description:
                                  "The format of the verification document. Currently supports `front_back` only.",
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
                          ).annotate({
                            description:
                              "An identifying document showing the person's name, either a passport or local ID card.",
                          }),
                        ),
                        secondary_verification: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              front_back: Schema.StructWithRest(
                                Schema.Struct({
                                  back: Schema.optionalKey(
                                    Schema.String.annotate({
                                      description:
                                        "A [file upload](https://docs.stripe.com/api/files/create) token representing the back of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
                                    }),
                                  ),
                                  front: Schema.optionalKey(
                                    Schema.String.annotate({
                                      description:
                                        "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
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
                                description:
                                  "The [file upload](https://docs.stripe.com/api/files/create) tokens referring to each side of the document.",
                              }),
                              type: Schema.Literal("front_back").annotate({
                                description:
                                  "The format of the verification document. Currently supports `front_back` only.",
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
                          ).annotate({
                            description:
                              "A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.",
                          }),
                        ),
                        visa: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              files: Schema.Array(Schema.String).annotate({
                                description:
                                  "One or more document IDs returned by a [file upload](https://docs.stripe.com/api/files/create) with a purpose value of `account_requirement`.",
                              }),
                              type: Schema.Literal("files").annotate({
                                description:
                                  "The format of the document. Currently supports `files` only.",
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
                          ).annotate({
                            description:
                              "One or more documents showing the person's visa required for living in the country where they are residing.",
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
                      description:
                        "Documents that may be submitted to satisfy various informational requests.",
                    }),
                  ),
                  email: Schema.optionalKey(
                    Schema.String.annotate({
                      description:
                        "The individual's email address. You can only set this field when the Account is configured as a `merchant` or `recipient`. Use `contact_email` as the primary contact email for this Account.",
                    }),
                  ),
                  given_name: Schema.optionalKey(
                    Schema.String.annotate({
                      description: "The individual's first name.",
                    }),
                  ),
                  id_numbers: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          type: Schema.Literals([
                            "ae_eid",
                            "ao_nif",
                            "ar_cuil",
                            "ar_dni",
                            "at_stn",
                            "az_tin",
                            "bd_brc",
                            "bd_etin",
                            "bd_nid",
                            "be_nrn",
                            "bg_ucn",
                            "bn_nric",
                            "br_cpf",
                            "ca_sin",
                            "ch_oasi",
                            "cl_rut",
                            "cn_pp",
                            "co_nuip",
                            "cr_ci",
                            "cr_cpf",
                            "cr_dimex",
                            "cr_nite",
                            "cy_tic",
                            "cz_rc",
                            "de_stn",
                            "dk_cpr",
                            "do_cie",
                            "do_rcn",
                            "ec_ci",
                            "ee_ik",
                            "es_nif",
                            "fi_hetu",
                            "fr_nir",
                            "gb_nino",
                            "gr_afm",
                            "gt_nit",
                            "hk_id",
                            "hr_oib",
                            "hu_ad",
                            "id_nik",
                            "ie_ppsn",
                            "is_kt",
                            "it_cf",
                            "jp_inc",
                            "ke_pin",
                            "kz_iin",
                            "li_peid",
                            "lt_ak",
                            "lu_nif",
                            "lv_pk",
                            "mx_rfc",
                            "my_nric",
                            "mz_nuit",
                            "ng_nin",
                            "nl_bsn",
                            "no_nin",
                            "nz_ird",
                            "pe_dni",
                            "pk_cnic",
                            "pk_snic",
                            "pl_pesel",
                            "pt_nif",
                            "ro_cnp",
                            "sa_tin",
                            "se_pin",
                            "sg_fin",
                            "sg_nric",
                            "sk_dic",
                            "th_lc",
                            "th_pin",
                            "tr_tin",
                            "us_itin",
                            "us_itin_last_4",
                            "us_ssn",
                            "us_ssn_last_4",
                            "uy_dni",
                            "za_id",
                          ]).annotate({
                            description: "The ID number type of an individual.",
                          }),
                          value: Schema.String.annotate({
                            description: "The value of the ID number.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ),
                    ).annotate({
                      description:
                        "The identification numbers (e.g., SSN) associated with the individual.",
                    }),
                  ),
                  legal_gender: Schema.optionalKey(
                    Schema.Literals(["female", "male"]).annotate({
                      description:
                        'The individual\'s gender (International regulations require either "male" or "female").',
                    }),
                  ),
                  metadata: Schema.optionalKey(
                    Schema.Record(
                      Schema.String,
                      Schema.Union([Schema.String, Schema.Null]),
                    ).annotate({
                      description:
                        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
                    }),
                  ),
                  nationalities: Schema.optionalKey(
                    Schema.Array(Schema.String).annotate({
                      description:
                        "The countries where the individual is a national. Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                    }),
                  ),
                  phone: Schema.optionalKey(
                    Schema.String.annotate({
                      description: "The individual's phone number.",
                    }),
                  ),
                  political_exposure: Schema.optionalKey(
                    Schema.Literals(["existing", "none"]).annotate({
                      description: "The individual's political exposure.",
                    }),
                  ),
                  relationship: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        director: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "Whether the person is a director of the account's identity. Directors are typically members of the governing board of the company, or responsible for ensuring the company meets its regulatory obligations.",
                          }),
                        ),
                        executive: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "Whether the person has significant responsibility to control, manage, or direct the organization.",
                          }),
                        ),
                        owner: Schema.optionalKey(
                          Schema.Boolean.annotate({
                            description:
                              "Whether the person is an owner of the account's identity.",
                          }),
                        ),
                        percent_ownership: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "The percent owned by the person of the account's legal entity.",
                            format: "decimal",
                          }),
                        ),
                        title: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "The person's title (e.g., CEO, Support Engineer).",
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
                      description:
                        "The relationship that this individual has with the account's identity.",
                    }),
                  ),
                  script_addresses: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        kana: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              city: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "City, district, suburb, town, or village.",
                                }),
                              ),
                              country: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                                }),
                              ),
                              line1: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 1 (e.g., street, PO Box, or company name).",
                                }),
                              ),
                              line2: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 2 (e.g., apartment, suite, unit, or building).",
                                }),
                              ),
                              postal_code: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "ZIP or postal code.",
                                }),
                              ),
                              state: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "State, county, province, or region.",
                                }),
                              ),
                              town: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "Town or district.",
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
                          ).annotate({ description: "Kana Address." }),
                        ),
                        kanji: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              city: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "City, district, suburb, town, or village.",
                                }),
                              ),
                              country: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                                }),
                              ),
                              line1: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 1 (e.g., street, PO Box, or company name).",
                                }),
                              ),
                              line2: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "Address line 2 (e.g., apartment, suite, unit, or building).",
                                }),
                              ),
                              postal_code: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "ZIP or postal code.",
                                }),
                              ),
                              state: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "State, county, province, or region.",
                                }),
                              ),
                              town: Schema.optionalKey(
                                Schema.String.annotate({
                                  description: "Town or district.",
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
                          ).annotate({ description: "Kanji Address." }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      description:
                        "The script addresses (e.g., non-Latin characters) associated with the individual.",
                    }),
                  ),
                  script_names: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        kana: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              given_name: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "The person's first or given name.",
                                }),
                              ),
                              surname: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "The person's last or family name.",
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
                            description: "Persons name in kana script.",
                          }),
                        ),
                        kanji: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              given_name: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "The person's first or given name.",
                                }),
                              ),
                              surname: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "The person's last or family name.",
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
                            description: "Persons name in kanji script.",
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
                      description:
                        "The individuals primary name in non latin script.",
                    }),
                  ),
                  surname: Schema.optionalKey(
                    Schema.String.annotate({
                      description: "The individual's last name.",
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
                description:
                  "Information about the person represented by the account.",
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
          description:
            "Information about the company, individual, and business represented by the Account.",
        }),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ),
  StripeAccountTokenResourceSchema,
);
