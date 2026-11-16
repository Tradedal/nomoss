// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeTokenResourceSchema } from "./StripeTokenPropsSchema.js";

export type StripeTokenPropsEntity = {
  readonly account?: {
    readonly business_type?:
      | "company"
      | "government_entity"
      | "individual"
      | "non_profit";
    readonly company?: {
      readonly address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly address_kana?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
        readonly town?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly address_kanji?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
        readonly town?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly administrative_address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly directors_provided?: boolean;
      readonly directorship_declaration?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly executives_provided?: boolean;
      readonly export_license_id?: string;
      readonly export_purpose_code?: string;
      readonly name?: string;
      readonly name_kana?: string;
      readonly name_kanji?: string;
      readonly owners_provided?: boolean;
      readonly ownership_declaration?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly ownership_declaration_shown_and_signed?: boolean;
      readonly ownership_exemption_reason?:
        | ""
        | "qualified_entity_exceeds_ownership_threshold"
        | "qualifies_as_financial_institution";
      readonly phone?: string;
      readonly physical_address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly principal_place_of_business?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly registration_date?:
        | ({
            readonly day: number;
            readonly month: number;
            readonly year: number;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly registration_number?: string;
      readonly representative_declaration?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly structure?:
        | ""
        | "free_zone_establishment"
        | "free_zone_llc"
        | "government_instrumentality"
        | "governmental_unit"
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
        | "public_partnership"
        | "registered_charity"
        | "single_member_llc"
        | "sole_establishment"
        | "sole_proprietorship"
        | "tax_exempt_government_instrumentality"
        | "unincorporated_association"
        | "unincorporated_non_profit"
        | "unincorporated_partnership";
      readonly tax_id?: string;
      readonly tax_id_registrar?: string;
      readonly vat_id?: string;
      readonly verification?: {
        readonly document?: {
          readonly back?: string;
          readonly front?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly individual?: {
      readonly address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly address_kana?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
        readonly town?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly address_kanji?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
        readonly town?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly dob?:
        | ({
            readonly day: number;
            readonly month: number;
            readonly year: number;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly email?: string;
      readonly first_name?: string;
      readonly first_name_kana?: string;
      readonly first_name_kanji?: string;
      readonly full_name_aliases?: ReadonlyArray<string> | "";
      readonly gender?: string;
      readonly id_number?: string;
      readonly id_number_secondary?: string;
      readonly last_name?: string;
      readonly last_name_kana?: string;
      readonly last_name_kanji?: string;
      readonly maiden_name?: string;
      readonly metadata?: { readonly [x: string]: string } | "";
      readonly phone?: string;
      readonly political_exposure?: "existing" | "none";
      readonly registered_address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly relationship?: {
        readonly director?: boolean;
        readonly executive?: boolean;
        readonly owner?: boolean;
        readonly percent_ownership?: number | "";
        readonly title?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly ssn_last_4?: string;
      readonly verification?: {
        readonly additional_document?: {
          readonly back?: string;
          readonly front?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly document?: {
          readonly back?: string;
          readonly front?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly tos_shown_and_accepted?: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly bank_account?: {
    readonly account_holder_name?: string;
    readonly account_holder_type?: "company" | "individual";
    readonly account_number: string;
    readonly account_type?: "checking" | "futsu" | "savings" | "toza";
    readonly country: string;
    readonly currency?: string;
    readonly payment_method?: string;
    readonly routing_number?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly card?:
    | ({
        readonly address_city?: string;
        readonly address_country?: string;
        readonly address_line1?: string;
        readonly address_line2?: string;
        readonly address_state?: string;
        readonly address_zip?: string;
        readonly currency?: string;
        readonly cvc?: string;
        readonly exp_month: string;
        readonly exp_year: string;
        readonly name?: string;
        readonly networks?: {
          readonly preferred?: "cartes_bancaires" | "mastercard" | "visa";
        } & { readonly [x: string]: Schema.Json };
        readonly number: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly customer?: string;
  readonly cvc_update?: { readonly cvc: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly expand?: ReadonlyArray<string>;
  readonly person?: {
    readonly additional_tos_acceptances?: {
      readonly account?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string | "";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly address?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly address_kana?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
      readonly town?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly address_kanji?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
      readonly town?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly dob?:
      | ({
          readonly day: number;
          readonly month: number;
          readonly year: number;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly documents?: {
      readonly company_authorization?: {
        readonly files?: ReadonlyArray<string | "">;
      } & { readonly [x: string]: Schema.Json };
      readonly passport?: { readonly files?: ReadonlyArray<string | ""> } & {
        readonly [x: string]: Schema.Json;
      };
      readonly visa?: { readonly files?: ReadonlyArray<string | ""> } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly email?: string;
    readonly first_name?: string;
    readonly first_name_kana?: string;
    readonly first_name_kanji?: string;
    readonly full_name_aliases?: ReadonlyArray<string> | "";
    readonly gender?: string;
    readonly id_number?: string;
    readonly id_number_secondary?: string;
    readonly last_name?: string;
    readonly last_name_kana?: string;
    readonly last_name_kanji?: string;
    readonly maiden_name?: string;
    readonly metadata?: { readonly [x: string]: string } | "";
    readonly nationality?: string;
    readonly phone?: string;
    readonly political_exposure?: "existing" | "none";
    readonly registered_address?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly relationship?: {
      readonly authorizer?: boolean;
      readonly director?: boolean;
      readonly executive?: boolean;
      readonly legal_guardian?: boolean;
      readonly owner?: boolean;
      readonly percent_ownership?: number | "";
      readonly representative?: boolean;
      readonly title?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly ssn_last_4?: string;
    readonly us_cfpb_data?: {
      readonly ethnicity_details?: {
        readonly ethnicity?: ReadonlyArray<
          | "cuban"
          | "hispanic_or_latino"
          | "mexican"
          | "not_hispanic_or_latino"
          | "other_hispanic_or_latino"
          | "prefer_not_to_answer"
          | "puerto_rican"
        >;
        readonly ethnicity_other?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly race_details?: {
        readonly race?: ReadonlyArray<
          | "african_american"
          | "american_indian_or_alaska_native"
          | "asian"
          | "asian_indian"
          | "black_or_african_american"
          | "chinese"
          | "ethiopian"
          | "filipino"
          | "guamanian_or_chamorro"
          | "haitian"
          | "jamaican"
          | "japanese"
          | "korean"
          | "native_hawaiian"
          | "native_hawaiian_or_other_pacific_islander"
          | "nigerian"
          | "other_asian"
          | "other_black_or_african_american"
          | "other_pacific_islander"
          | "prefer_not_to_answer"
          | "samoan"
          | "somali"
          | "vietnamese"
          | "white"
        >;
        readonly race_other?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly self_identified_gender?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly verification?: {
      readonly additional_document?: {
        readonly back?: string;
        readonly front?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly document?: {
        readonly back?: string;
        readonly front?: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly pii?: { readonly id_number?: string } & {
    readonly [x: string]: Schema.Json;
  };
};

export const StripeTokenPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    account: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          business_type: Schema.optionalKey(
            Schema.Literals([
              "company",
              "government_entity",
              "individual",
              "non_profit",
            ]),
          ),
          company: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                address: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
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
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
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
                  ).annotate({ title: "legal_entity_and_kyc_address_specs" }),
                ),
                address_kana: Schema.optionalKey(
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
                      town: Schema.optionalKey(
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
                  ).annotate({ title: "japan_address_kana_specs" }),
                ),
                address_kanji: Schema.optionalKey(
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
                      town: Schema.optionalKey(
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
                  ).annotate({ title: "japan_address_kanji_specs" }),
                ),
                administrative_address: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
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
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
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
                  ).annotate({ title: "address_specs" }),
                ),
                directors_provided: Schema.optionalKey(Schema.Boolean),
                directorship_declaration: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      date: Schema.optionalKey(
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      ip: Schema.optionalKey(Schema.String),
                      user_agent: Schema.optionalKey(
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
                  ).annotate({ title: "company_directorship_declaration" }),
                ),
                executives_provided: Schema.optionalKey(Schema.Boolean),
                export_license_id: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                export_purpose_code: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                name: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
                    }),
                  ),
                ),
                name_kana: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
                    }),
                  ),
                ),
                name_kanji: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
                    }),
                  ),
                ),
                owners_provided: Schema.optionalKey(Schema.Boolean),
                ownership_declaration: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      date: Schema.optionalKey(
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      ip: Schema.optionalKey(Schema.String),
                      user_agent: Schema.optionalKey(
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
                  ).annotate({ title: "company_ownership_declaration" }),
                ),
                ownership_declaration_shown_and_signed: Schema.optionalKey(
                  Schema.Boolean,
                ),
                ownership_exemption_reason: Schema.optionalKey(
                  Schema.Literals([
                    "",
                    "qualified_entity_exceeds_ownership_threshold",
                    "qualifies_as_financial_institution",
                  ]),
                ),
                phone: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                physical_address: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
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
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
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
                  ).annotate({ title: "address_specs" }),
                ),
                principal_place_of_business: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
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
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
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
                  ).annotate({ title: "address_specs" }),
                ),
                registration_date: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        day: Schema.Int,
                        month: Schema.Int,
                        year: Schema.Int,
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "registration_date_specs" }),
                    Schema.Literal(""),
                  ]),
                ),
                registration_number: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                representative_declaration: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      date: Schema.optionalKey(
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      ip: Schema.optionalKey(Schema.String),
                      user_agent: Schema.optionalKey(
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
                  ).annotate({ title: "company_representative_declaration" }),
                ),
                structure: Schema.optionalKey(
                  Schema.Literals([
                    "",
                    "free_zone_establishment",
                    "free_zone_llc",
                    "government_instrumentality",
                    "governmental_unit",
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
                    "public_partnership",
                    "registered_charity",
                    "single_member_llc",
                    "sole_establishment",
                    "sole_proprietorship",
                    "tax_exempt_government_instrumentality",
                    "unincorporated_association",
                    "unincorporated_non_profit",
                    "unincorporated_partnership",
                  ]),
                ),
                tax_id: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                tax_id_registrar: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                vat_id: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                verification: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      document: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            back: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(500).annotate({
                                  expected:
                                    "a string with at most 500 code points",
                                }),
                              ),
                            ),
                            front: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(500).annotate({
                                  expected:
                                    "a string with at most 500 code points",
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
                        ).annotate({ title: "verification_document_specs" }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "verification_specs" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "connect_js_account_token_company_specs" }),
          ),
          individual: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                address: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
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
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
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
                  ).annotate({ title: "address_specs" }),
                ),
                address_kana: Schema.optionalKey(
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
                      town: Schema.optionalKey(
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
                  ).annotate({ title: "japan_address_kana_specs" }),
                ),
                address_kanji: Schema.optionalKey(
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
                      town: Schema.optionalKey(
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
                  ).annotate({ title: "japan_address_kanji_specs" }),
                ),
                dob: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        day: Schema.Int,
                        month: Schema.Int,
                        year: Schema.Int,
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "date_of_birth_specs" }),
                    Schema.Literal(""),
                  ]),
                ),
                email: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(800).annotate({
                      expected: "a string with at most 800 code points",
                    }),
                  ),
                ),
                first_name: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(100).annotate({
                      expected: "a string with at most 100 code points",
                    }),
                  ),
                ),
                first_name_kana: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                first_name_kanji: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                full_name_aliases: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.String.check(
                        Schema.isMaxCodePoints(300).annotate({
                          expected: "a string with at most 300 code points",
                        }),
                      ),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                gender: Schema.optionalKey(Schema.String),
                id_number: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                id_number_secondary: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                last_name: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(100).annotate({
                      expected: "a string with at most 100 code points",
                    }),
                  ),
                ),
                last_name_kana: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                last_name_kanji: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                maiden_name: Schema.optionalKey(
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
                phone: Schema.optionalKey(Schema.String),
                political_exposure: Schema.optionalKey(
                  Schema.Literals(["existing", "none"]),
                ),
                registered_address: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(100).annotate({
                            expected: "a string with at most 100 code points",
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
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(200).annotate({
                            expected: "a string with at most 200 code points",
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
                  ).annotate({ title: "address_specs" }),
                ),
                relationship: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      director: Schema.optionalKey(Schema.Boolean),
                      executive: Schema.optionalKey(Schema.Boolean),
                      owner: Schema.optionalKey(Schema.Boolean),
                      percent_ownership: Schema.optionalKey(
                        Schema.Union([Schema.Finite, Schema.Literal("")]),
                      ),
                      title: Schema.optionalKey(
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
                  ).annotate({ title: "individual_relationship_specs" }),
                ),
                ssn_last_4: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                verification: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      additional_document: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            back: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(500).annotate({
                                  expected:
                                    "a string with at most 500 code points",
                                }),
                              ),
                            ),
                            front: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(500).annotate({
                                  expected:
                                    "a string with at most 500 code points",
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
                          title: "person_verification_document_specs",
                        }),
                      ),
                      document: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            back: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(500).annotate({
                                  expected:
                                    "a string with at most 500 code points",
                                }),
                              ),
                            ),
                            front: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(500).annotate({
                                  expected:
                                    "a string with at most 500 code points",
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
                          title: "person_verification_document_specs",
                        }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "person_verification_specs" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "individual_specs" }),
          ),
          tos_shown_and_accepted: Schema.optionalKey(Schema.Boolean),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "connect_js_account_token_specs",
        description: "Information for the account this token represents.",
      }),
    ),
    bank_account: Schema.optionalKey(
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
          account_type: Schema.optionalKey(
            Schema.Literals(["checking", "futsu", "savings", "toza"]),
          ),
          country: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
          payment_method: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
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
      ).annotate({
        title: "token_create_bank_account",
        description: "The bank account this token will represent.",
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
            currency: Schema.optionalKey(
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
            exp_month: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            exp_year: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            name: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            networks: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  preferred: Schema.optionalKey(
                    Schema.Literals(["cartes_bancaires", "mastercard", "visa"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "networks_param_specs" }),
            ),
            number: Schema.String.check(
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
        ).annotate({ title: "credit_card_specs" }),
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ]).annotate({
        description:
          "The card this token will represent. If you also pass in a customer, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass in a customer, this is a dictionary containing a user's credit card details, with the options described below.",
      }),
    ),
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Create a token for the customer, which is owned by the application's account. You can only use this with an [OAuth access token](https://docs.stripe.com/connect/standard-accounts) or [Stripe-Account header](https://docs.stripe.com/connect/authentication). Learn more about [cloning saved payment methods](https://docs.stripe.com/connect/cloning-saved-payment-methods).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    cvc_update: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          cvc: Schema.String.check(
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
        title: "cvc_params",
        description: "The updated CVC value this token represents.",
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
    person: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          additional_tos_acceptances: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                account: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      date: Schema.optionalKey(
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      ip: Schema.optionalKey(Schema.String),
                      user_agent: Schema.optionalKey(
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
                  ).annotate({ title: "settings_terms_of_service_specs" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "person_additional_tos_acceptances_specs" }),
          ),
          address: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                city: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(100).annotate({
                      expected: "a string with at most 100 code points",
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
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
                    }),
                  ),
                ),
                line2: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
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
            ).annotate({ title: "legal_entity_and_kyc_address_specs" }),
          ),
          address_kana: Schema.optionalKey(
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
                town: Schema.optionalKey(
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
            ).annotate({ title: "japan_address_kana_specs" }),
          ),
          address_kanji: Schema.optionalKey(
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
                town: Schema.optionalKey(
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
            ).annotate({ title: "japan_address_kanji_specs" }),
          ),
          dob: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  day: Schema.Int,
                  month: Schema.Int,
                  year: Schema.Int,
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "date_of_birth_specs" }),
              Schema.Literal(""),
            ]),
          ),
          documents: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                company_authorization: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      files: Schema.optionalKey(
                        Schema.Array(
                          Schema.Union([
                            Schema.String.check(
                              Schema.isMaxCodePoints(500).annotate({
                                expected:
                                  "a string with at most 500 code points",
                              }),
                            ),
                            Schema.Literal(""),
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
                  ).annotate({ title: "documents_param" }),
                ),
                passport: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      files: Schema.optionalKey(
                        Schema.Array(
                          Schema.Union([
                            Schema.String.check(
                              Schema.isMaxCodePoints(500).annotate({
                                expected:
                                  "a string with at most 500 code points",
                              }),
                            ),
                            Schema.Literal(""),
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
                  ).annotate({ title: "documents_param" }),
                ),
                visa: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      files: Schema.optionalKey(
                        Schema.Array(
                          Schema.Union([
                            Schema.String.check(
                              Schema.isMaxCodePoints(500).annotate({
                                expected:
                                  "a string with at most 500 code points",
                              }),
                            ),
                            Schema.Literal(""),
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
                  ).annotate({ title: "documents_param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "person_documents_specs" }),
          ),
          email: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(800).annotate({
                expected: "a string with at most 800 code points",
              }),
            ),
          ),
          first_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          first_name_kana: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          first_name_kanji: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          full_name_aliases: Schema.optionalKey(
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
          gender: Schema.optionalKey(Schema.String),
          id_number: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          id_number_secondary: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          last_name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          last_name_kana: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          last_name_kanji: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          maiden_name: Schema.optionalKey(
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
          nationality: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          phone: Schema.optionalKey(Schema.String),
          political_exposure: Schema.optionalKey(
            Schema.Literals(["existing", "none"]),
          ),
          registered_address: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                city: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(100).annotate({
                      expected: "a string with at most 100 code points",
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
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
                    }),
                  ),
                ),
                line2: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(200).annotate({
                      expected: "a string with at most 200 code points",
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
            ).annotate({ title: "address_specs" }),
          ),
          relationship: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                authorizer: Schema.optionalKey(Schema.Boolean),
                director: Schema.optionalKey(Schema.Boolean),
                executive: Schema.optionalKey(Schema.Boolean),
                legal_guardian: Schema.optionalKey(Schema.Boolean),
                owner: Schema.optionalKey(Schema.Boolean),
                percent_ownership: Schema.optionalKey(
                  Schema.Union([Schema.Finite, Schema.Literal("")]),
                ),
                representative: Schema.optionalKey(Schema.Boolean),
                title: Schema.optionalKey(
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
            ).annotate({ title: "relationship_specs" }),
          ),
          ssn_last_4: Schema.optionalKey(Schema.String),
          us_cfpb_data: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ethnicity_details: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      ethnicity: Schema.optionalKey(
                        Schema.Array(
                          Schema.Literals([
                            "cuban",
                            "hispanic_or_latino",
                            "mexican",
                            "not_hispanic_or_latino",
                            "other_hispanic_or_latino",
                            "prefer_not_to_answer",
                            "puerto_rican",
                          ]),
                        ),
                      ),
                      ethnicity_other: Schema.optionalKey(
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
                  ).annotate({ title: "us_cfpb_ethnicity_details_specs" }),
                ),
                race_details: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      race: Schema.optionalKey(
                        Schema.Array(
                          Schema.Literals([
                            "african_american",
                            "american_indian_or_alaska_native",
                            "asian",
                            "asian_indian",
                            "black_or_african_american",
                            "chinese",
                            "ethiopian",
                            "filipino",
                            "guamanian_or_chamorro",
                            "haitian",
                            "jamaican",
                            "japanese",
                            "korean",
                            "native_hawaiian",
                            "native_hawaiian_or_other_pacific_islander",
                            "nigerian",
                            "other_asian",
                            "other_black_or_african_american",
                            "other_pacific_islander",
                            "prefer_not_to_answer",
                            "samoan",
                            "somali",
                            "vietnamese",
                            "white",
                          ]),
                        ),
                      ),
                      race_other: Schema.optionalKey(
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
                  ).annotate({ title: "us_cfpb_race_details_specs" }),
                ),
                self_identified_gender: Schema.optionalKey(
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
            ).annotate({ title: "us_cfpb_data_specs" }),
          ),
          verification: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                additional_document: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      back: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(500).annotate({
                            expected: "a string with at most 500 code points",
                          }),
                        ),
                      ),
                      front: Schema.optionalKey(
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
                  ).annotate({ title: "person_verification_document_specs" }),
                ),
                document: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      back: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(500).annotate({
                            expected: "a string with at most 500 code points",
                          }),
                        ),
                      ),
                      front: Schema.optionalKey(
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
                  ).annotate({ title: "person_verification_document_specs" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "person_verification_specs" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "person_token_specs",
        description: "Information for the person this token represents.",
      }),
    ),
    pii: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          id_number: Schema.optionalKey(
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
        title: "pii_token_specs",
        description: "The PII this token represents.",
      }),
    ),
  }),
  StripeTokenResourceSchema,
);
