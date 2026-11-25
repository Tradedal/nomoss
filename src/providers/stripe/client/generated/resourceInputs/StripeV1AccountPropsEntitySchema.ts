// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputProperties } from "./StripeResourceEntityInputProperties.js";
import { StripeResourceEntityInputProperties_2 } from "./StripeResourceEntityInputProperties_2.js";
import { StripeResourceEntityInputProperties_5 } from "./StripeResourceEntityInputProperties_5.js";
import { StripeV1AccountResourceSchema } from "./StripeV1AccountPropsSchema.js";

export type StripeV1AccountPropsEntity = {
  readonly account_token?: string;
  readonly bank_account?:
    | ({
        readonly account_holder_name?: string;
        readonly account_holder_type?: "company" | "individual";
        readonly account_number: string;
        readonly account_type?: "checking" | "futsu" | "savings" | "toza";
        readonly country: string;
        readonly currency?: string;
        readonly documents?: {
          readonly bank_account_ownership_verification?: {
            readonly files?: ReadonlyArray<string>;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly object?: "bank_account";
        readonly routing_number?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly business_profile?: {
    readonly annual_revenue?: {
      readonly amount: number;
      readonly currency: string;
      readonly fiscal_year_end: string;
    } & { readonly [x: string]: Schema.Json };
    readonly estimated_worker_count?: number;
    readonly mcc?: string;
    readonly minority_owned_business_designation?: ReadonlyArray<
      | "lgbtqi_owned_business"
      | "minority_owned_business"
      | "none_of_these_apply"
      | "prefer_not_to_answer"
      | "women_owned_business"
    >;
    readonly monthly_estimated_revenue?: {
      readonly amount: number;
      readonly currency: string;
    } & { readonly [x: string]: Schema.Json };
    readonly name?: string;
    readonly product_description?: string;
    readonly specified_commercial_transactions_act_url?: string | "";
    readonly support_address?: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly support_email?: string;
    readonly support_phone?: string;
    readonly support_url?: string | "";
    readonly url?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly business_type?:
    | "company"
    | "government_entity"
    | "individual"
    | "non_profit";
  readonly capabilities?: {
    readonly acss_debit_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly affirm_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly afterpay_clearpay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly alma_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly amazon_pay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly app_distribution?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly au_becs_debit_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly bacs_debit_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly bancontact_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly bank_transfer_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly billie_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly bizum_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly blik_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly blik_recurring_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly boleto_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly card_issuing?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly card_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cartes_bancaires_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cashapp_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly crypto_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly eps_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly fpx_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly gb_bank_transfer_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly giropay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly grabpay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ideal_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly india_international_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly jcb_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly jp_bank_transfer_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly kakao_pay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly klarna_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly konbini_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly kr_card_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly legacy_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly link_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly mb_way_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly mobilepay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly multibanco_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly mx_bank_transfer_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly naver_pay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly nz_bank_account_becs_debit_payments?: {
      readonly requested?: boolean;
    } & { readonly [x: string]: Schema.Json };
    readonly oxxo_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly p24_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly pay_by_bank_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly payco_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly paynow_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly paypay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly payto_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly pix_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly promptpay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly revolut_pay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly samsung_pay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly satispay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly scalapay_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sepa_bank_transfer_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sepa_debit_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sequra_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sofort_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sunbit_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly swish_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly tax_reporting_us_1099_k?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly tax_reporting_us_1099_misc?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly transfers?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly treasury?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly twint_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly upi_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly us_bank_account_ach_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly us_bank_transfer_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly wero_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly zip_payments?: { readonly requested?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
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
    readonly verification?: StripeResourceEntityInputProperties;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputProperties;
  };
  readonly controller?: {
    readonly fees?: { readonly payer?: "account" | "application" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly losses?: { readonly payments?: "application" | "stripe" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly requirement_collection?: "application" | "stripe";
    readonly stripe_dashboard?: {
      readonly type?: "express" | "full" | "none";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly country?: string;
  readonly default_currency?: string;
  readonly documents?: {
    readonly bank_account_ownership_verification?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
    readonly company_license?: { readonly files?: ReadonlyArray<string> } & {
      readonly [x: string]: Schema.Json;
    };
    readonly company_memorandum_of_association?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
    readonly company_ministerial_decree?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
    readonly company_registration_verification?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
    readonly company_tax_id_verification?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
    readonly proof_of_address?: { readonly files?: ReadonlyArray<string> } & {
      readonly [x: string]: Schema.Json;
    };
    readonly proof_of_business_presence?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
    readonly proof_of_ultimate_beneficial_ownership?: {
      readonly files?: ReadonlyArray<string>;
      readonly signer?: { readonly person?: string } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly email?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly external_account?: string;
  readonly groups?: { readonly payments_pricing?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
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
    readonly verification?: StripeResourceEntityInputProperties_2;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputProperties_2;
  };
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly settings?: {
    readonly bacs_debit_payments?: { readonly display_name?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly branding?: StripeResourceEntityInputProperties_5;
    readonly card_issuing?: {
      readonly tos_acceptance?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string | "";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly card_payments?: {
      readonly decline_on?: {
        readonly avs_failure?: boolean;
        readonly cvc_failure?: boolean;
      } & { readonly [x: string]: Schema.Json };
      readonly statement_descriptor_prefix?: string;
      readonly statement_descriptor_prefix_kana?: string | "";
      readonly statement_descriptor_prefix_kanji?: string | "";
    } & { readonly [x: string]: Schema.Json };
    readonly invoices?: {
      readonly hosted_payment_method_save?: "always" | "never" | "offer";
    } & { readonly [x: string]: Schema.Json };
    readonly payments?: {
      readonly statement_descriptor?: string;
      readonly statement_descriptor_kana?: string;
      readonly statement_descriptor_kanji?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly payouts?: {
      readonly debit_negative_balances?: boolean;
      readonly schedule?: {
        readonly delay_days?: "minimum" | number;
        readonly interval?: "daily" | "manual" | "monthly" | "weekly";
        readonly monthly_anchor?: number;
        readonly monthly_payout_days?: ReadonlyArray<number>;
        readonly weekly_anchor?:
          | "friday"
          | "monday"
          | "saturday"
          | "sunday"
          | "thursday"
          | "tuesday"
          | "wednesday";
        readonly weekly_payout_days?: ReadonlyArray<
          "friday" | "monday" | "thursday" | "tuesday" | "wednesday"
        >;
      } & { readonly [x: string]: Schema.Json };
      readonly statement_descriptor?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly paypay_payments?: {
      readonly additional_files?: ReadonlyArray<string>;
      readonly goods_type?: "digital_content" | "other";
      readonly site?: {
        readonly accessible?: { readonly [x: string]: Schema.Json };
        readonly in_development?: {
          readonly password: string;
          readonly username?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly restricted?: { readonly payment_flow_file?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly type?: "accessible" | "in_development" | "restricted";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly sepa_debit_payments?: { readonly creditor_id?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly treasury?: {
      readonly tos_acceptance?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string | "";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputProperties_5;
  };
  readonly tos_acceptance?: {
    readonly date?: number;
    readonly ip?: string;
    readonly service_agreement?: string;
    readonly user_agent?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly type?: "custom" | "express" | "standard";
};

export const StripeV1AccountPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    account_token: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An [account token](https://docs.stripe.com/api#create_account_token), used to securely provide details to the account.",
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
            documents: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  bank_account_ownership_verification: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        files: Schema.optionalKey(
                          Schema.Array(
                            Schema.String.check(
                              Schema.isMaxCodePoints(500).annotate({
                                expected:
                                  "a string with at most 500 code points",
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
                    ).annotate({ title: "documents_param" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "external_account_documents_param" }),
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
        ).annotate({ title: "external_account_payout_bank_account" }),
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
    business_profile: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          annual_revenue: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount: Schema.Int,
                currency: Schema.String.annotate({ format: "currency" }),
                fiscal_year_end: Schema.String.check(
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
            ).annotate({ title: "annual_revenue_specs" }),
          ),
          estimated_worker_count: Schema.optionalKey(Schema.Int),
          mcc: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(4).annotate({
                expected: "a string with at most 4 code points",
              }),
            ),
          ),
          minority_owned_business_designation: Schema.optionalKey(
            Schema.Array(
              Schema.Literals([
                "lgbtqi_owned_business",
                "minority_owned_business",
                "none_of_these_apply",
                "prefer_not_to_answer",
                "women_owned_business",
              ]),
            ),
          ),
          monthly_estimated_revenue: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount: Schema.Int,
                currency: Schema.String.annotate({ format: "currency" }),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "monthly_estimated_revenue_specs" }),
          ),
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          product_description: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(40000).annotate({
                expected: "a string with at most 40000 code points",
              }),
            ),
          ),
          specified_commercial_transactions_act_url: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
          support_address: Schema.optionalKey(
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
          support_email: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(800).annotate({
                expected: "a string with at most 800 code points",
              }),
            ),
          ),
          support_phone: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          support_url: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
          url: Schema.optionalKey(Schema.String),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "business_profile_specs",
        description: "Business information about the account.",
      }),
    ),
    business_type: Schema.optionalKey(
      Schema.Literals([
        "company",
        "government_entity",
        "individual",
        "non_profit",
      ]).annotate({
        description:
          "The business type. Once you create an [Account Link](/api/account_links) or [Account Session](/api/account_sessions), this property can only be updated for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts.",
      }),
    ),
    capabilities: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          acss_debit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          affirm_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          afterpay_clearpay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          alma_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          amazon_pay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          app_distribution: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          au_becs_debit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          bacs_debit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          bancontact_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          bank_transfer_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          billie_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          bizum_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          blik_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          blik_recurring_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          boleto_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          card_issuing: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          card_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "protectable_capability_param" }),
          ),
          cartes_bancaires_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          cashapp_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          crypto_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          eps_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          fpx_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          gb_bank_transfer_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          giropay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          grabpay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          ideal_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          india_international_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          jcb_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          jp_bank_transfer_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          kakao_pay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          klarna_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          konbini_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          kr_card_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          legacy_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          link_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          mb_way_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          mobilepay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          multibanco_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          mx_bank_transfer_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          naver_pay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          nz_bank_account_becs_debit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          oxxo_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          p24_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          pay_by_bank_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          payco_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          paynow_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          paypay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          payto_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          pix_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          promptpay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          revolut_pay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          samsung_pay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          satispay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          scalapay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          sepa_bank_transfer_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          sepa_debit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          sequra_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          sofort_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          sunbit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          swish_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          tax_reporting_us_1099_k: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          tax_reporting_us_1099_misc: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          transfers: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          treasury: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          twint_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          upi_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          us_bank_account_ach_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          us_bank_transfer_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          wero_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
          zip_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.optionalKey(Schema.Boolean) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "capability_param" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "capabilities_param",
        description:
          "Each key of the dictionary represents a capability, and each capability\nmaps to its settings (for example, whether it has been requested or not). Each\ncapability is inactive until you have provided its specific\nrequirements and Stripe has verified them. An account might have some\nof its requested capabilities be active and some be inactive.\n\nRequired when [account.controller.stripe_dashboard.type](/api/accounts/create#create_account-controller-dashboard-type)\nis `none`, which includes Custom accounts.",
      }),
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
          verification: Schema.optionalKey(StripeResourceEntityInputProperties),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputProperties,
            ]),
          ),
        ],
      ).annotate({
        title: "company_specs",
        description:
          "Information about the company or business. This field is available for any `business_type`. Once you create an [Account Link](/api/account_links) or [Account Session](/api/account_sessions), this property can only be updated for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts.",
      }),
    ),
    controller: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          fees: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                payer: Schema.optionalKey(
                  Schema.Literals(["account", "application"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "controller_fees_specs" }),
          ),
          losses: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                payments: Schema.optionalKey(
                  Schema.Literals(["application", "stripe"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "controller_losses_specs" }),
          ),
          requirement_collection: Schema.optionalKey(
            Schema.Literals(["application", "stripe"]),
          ),
          stripe_dashboard: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                type: Schema.optionalKey(
                  Schema.Literals(["express", "full", "none"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "controller_dashboard_specs" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "controller_specs",
        description:
          "Configures the account's Dashboard access, loss liability, requirements collection, and Stripe fee responsibility.",
      }),
    ),
    country: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The country in which the account holder resides, or in which the business is legally established. This should be an ISO 3166-1 alpha-2 country code. For example, if you are in the United States and the business for which you're creating an account is legally represented in Canada, you would use `CA` as the country for the account being created. Available countries include [Stripe's global markets](https://stripe.com/global) as well as countries where [cross-border payouts](https://stripe.com/docs/connect/cross-border-payouts) are supported.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    default_currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Three-letter ISO currency code representing the default currency for the account. This must be a currency that [Stripe supports in the account's country](https://docs.stripe.com/payouts).",
        format: "currency",
      }),
    ),
    documents: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          bank_account_ownership_verification: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          company_license: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          company_memorandum_of_association: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          company_ministerial_decree: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          company_registration_verification: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          company_tax_id_verification: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          proof_of_address: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          proof_of_business_presence: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
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
            ).annotate({ title: "documents_param" }),
          ),
          proof_of_ultimate_beneficial_ownership: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(500).annotate({
                        expected: "a string with at most 500 code points",
                      }),
                    ),
                  ),
                ),
                signer: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      person: Schema.optionalKey(
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
                  ).annotate({ title: "signer_name_param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "signer_param" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "documents_specs",
        description:
          "Documents that may be submitted to satisfy various informational requests.",
      }),
    ),
    email: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The email address of the account holder. This is only to make the account easier to identify to you. If [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts, Stripe doesn't email the account without your consent.",
      }).check(
        Schema.isMaxCodePoints(800).annotate({
          expected: "a string with at most 800 code points",
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
    external_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A card or bank account to attach to the account for receiving [payouts](/connect/bank-debit-card-payouts) (you won’t be able to use it for top-ups). You can provide either a token, like the ones returned by [Stripe.js](/js), or a dictionary, as documented in the `external_account` parameter for [bank account](/api#account_create_bank_account) creation. <br><br>By default, providing an external account sets it as the new default external account for its currency, and deletes the old default if one exists. To add additional external accounts without replacing the existing default for the currency, use the [bank account](/api#account_create_bank_account) or [card creation](/api#account_create_card) APIs. After you create an [Account Link](/api/account_links) or [Account Session](/api/account_sessions), this property can only be updated for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    groups: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          payments_pricing: Schema.optionalKey(
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
        title: "account_groups_specs",
        description:
          "A hash of account group type to tokens. These are account groups this account should be added to.",
      }),
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
            StripeResourceEntityInputProperties_2,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputProperties_2,
            ]),
          ),
        ],
      ).annotate({
        title: "individual_specs",
        description:
          "Information about the person represented by the account. This field is null unless `business_type` is set to `individual`. Once you create an [Account Link](/api/account_links) or [Account Session](/api/account_sessions), this property can only be updated for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts.",
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
    settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          bacs_debit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                display_name: Schema.optionalKey(Schema.String),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "bacs_debit_payments_specs" }),
          ),
          branding: Schema.optionalKey(StripeResourceEntityInputProperties_5),
          card_issuing: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                tos_acceptance: Schema.optionalKey(
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
            ).annotate({ title: "card_issuing_settings_specs" }),
          ),
          card_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                decline_on: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      avs_failure: Schema.optionalKey(Schema.Boolean),
                      cvc_failure: Schema.optionalKey(Schema.Boolean),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "decline_charge_on_specs" }),
                ),
                statement_descriptor_prefix: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(10).annotate({
                      expected: "a string with at most 10 code points",
                    }),
                  ),
                ),
                statement_descriptor_prefix_kana: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(10).annotate({
                        expected: "a string with at most 10 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                statement_descriptor_prefix_kanji: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(10).annotate({
                        expected: "a string with at most 10 code points",
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
            ).annotate({ title: "card_payments_settings_specs" }),
          ),
          invoices: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                hosted_payment_method_save: Schema.optionalKey(
                  Schema.Literals(["always", "never", "offer"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "invoices_settings_specs_create" }),
          ),
          payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                statement_descriptor: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(22).annotate({
                      expected: "a string with at most 22 code points",
                    }),
                  ),
                ),
                statement_descriptor_kana: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(22).annotate({
                      expected: "a string with at most 22 code points",
                    }),
                  ),
                ),
                statement_descriptor_kanji: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(22).annotate({
                      expected: "a string with at most 22 code points",
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
            ).annotate({ title: "payments_settings_specs" }),
          ),
          payouts: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                debit_negative_balances: Schema.optionalKey(Schema.Boolean),
                schedule: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      delay_days: Schema.optionalKey(
                        Schema.Union([Schema.Literal("minimum"), Schema.Int]),
                      ),
                      interval: Schema.optionalKey(
                        Schema.Literals([
                          "daily",
                          "manual",
                          "monthly",
                          "weekly",
                        ]),
                      ),
                      monthly_anchor: Schema.optionalKey(Schema.Int),
                      monthly_payout_days: Schema.optionalKey(
                        Schema.Array(Schema.Int),
                      ),
                      weekly_anchor: Schema.optionalKey(
                        Schema.Literals([
                          "friday",
                          "monday",
                          "saturday",
                          "sunday",
                          "thursday",
                          "tuesday",
                          "wednesday",
                        ]),
                      ),
                      weekly_payout_days: Schema.optionalKey(
                        Schema.Array(
                          Schema.Literals([
                            "friday",
                            "monday",
                            "thursday",
                            "tuesday",
                            "wednesday",
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
                  ).annotate({ title: "transfer_schedule_specs" }),
                ),
                statement_descriptor: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(22).annotate({
                      expected: "a string with at most 22 code points",
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
            ).annotate({ title: "payout_settings_specs" }),
          ),
          paypay_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                additional_files: Schema.optionalKey(
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                ),
                goods_type: Schema.optionalKey(
                  Schema.Literals(["digital_content", "other"]),
                ),
                site: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      accessible: Schema.optionalKey(
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ).annotate({ title: "paypay_site_accessible_specs" }),
                      ),
                      in_development: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            password: Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                            username: Schema.optionalKey(
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
                        ).annotate({
                          title: "paypay_site_in_development_specs",
                        }),
                      ),
                      restricted: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            payment_flow_file: Schema.optionalKey(
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
                        ).annotate({ title: "paypay_site_restricted_specs" }),
                      ),
                      type: Schema.optionalKey(
                        Schema.Literals([
                          "accessible",
                          "in_development",
                          "restricted",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "paypay_site_specs" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "paypay_payments_settings_specs" }),
          ),
          sepa_debit_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ creditor_id: Schema.optionalKey(Schema.String) }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "sepa_debit_payments_specs" }),
          ),
          treasury: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                tos_acceptance: Schema.optionalKey(
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
            ).annotate({ title: "treasury_settings_specs" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputProperties_5,
            ]),
          ),
        ],
      ).annotate({
        title: "settings_specs",
        description:
          "Options for customizing how the account functions within Stripe.",
      }),
    ),
    tos_acceptance: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          date: Schema.optionalKey(
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
          ),
          ip: Schema.optionalKey(Schema.String),
          service_agreement: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
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
      ).annotate({
        title: "tos_acceptance_specs",
        description:
          "Details on the account's acceptance of the [Stripe Services Agreement](/connect/updating-accounts#tos-acceptance). This property can only be updated for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts. This property defaults to a `full` service agreement when empty.",
      }),
    ),
    type: Schema.optionalKey(
      Schema.Literals(["custom", "express", "standard"]).annotate({
        description:
          "The `type` parameter is deprecated. Use [`controller`](/api/accounts/create#create_account-controller) instead to configure dashboard access, fee payer, loss liability, and requirement collection.",
      }),
    ),
  }),
  StripeV1AccountResourceSchema,
);
