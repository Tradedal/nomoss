// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeaccount } from "./models/accounts.js";
import {
  Stripecapability,
  Stripedeleted_account,
  Stripedeleted_external_account,
  Stripedeleted_person,
  Stripeerror,
  Stripeexternal_account,
  Stripelogin_link,
  Stripeperson,
} from "./models/common.js";
import { Stripebank_account, Stripecard } from "./models/paymentSources.js";

export type GetAccountsInput = {
  readonly created?:
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
};
export type GetAccountsOutput = {
  readonly data: ReadonlyArray<Stripeaccount>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetAccountsError = Stripeerror;
export type PostAccountsInput = {
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
    readonly verification?: {
      readonly document?: {
        readonly back?: string;
        readonly front?: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
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
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly settings?: {
    readonly bacs_debit_payments?: { readonly display_name?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly branding?: {
      readonly icon?: string;
      readonly logo?: string;
      readonly primary_color?: string;
      readonly secondary_color?: string;
    } & { readonly [x: string]: Schema.Json };
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
  } & { readonly [x: string]: Schema.Json };
  readonly tos_acceptance?: {
    readonly date?: number;
    readonly ip?: string;
    readonly service_agreement?: string;
    readonly user_agent?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly type?: "custom" | "express" | "standard";
};
export type PostAccountsOutput = Stripeaccount;
export type PostAccountsError = Stripeerror;
export type GetAccountsAccountInput = {
  readonly account: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetAccountsAccountOutput = Stripeaccount;
export type GetAccountsAccountError = Stripeerror;
export type PostAccountsAccountInput = {
  readonly account_token?: string;
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
    readonly verification?: {
      readonly document?: {
        readonly back?: string;
        readonly front?: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
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
    readonly proof_of_registration?: {
      readonly files?: ReadonlyArray<string>;
      readonly signer?: { readonly person?: string } & {
        readonly [x: string]: Schema.Json;
      };
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
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly settings?: {
    readonly bacs_debit_payments?: { readonly display_name?: string } & {
      readonly [x: string]: Schema.Json;
    };
    readonly branding?: {
      readonly icon?: string;
      readonly logo?: string;
      readonly primary_color?: string;
      readonly secondary_color?: string;
    } & { readonly [x: string]: Schema.Json };
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
      readonly default_account_tax_ids?: ReadonlyArray<string> | "";
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
  } & { readonly [x: string]: Schema.Json };
  readonly tos_acceptance?: {
    readonly date?: number;
    readonly ip?: string;
    readonly service_agreement?: string;
    readonly user_agent?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly account: string;
};
export type PostAccountsAccountOutput = Stripeaccount;
export type PostAccountsAccountError = Stripeerror;
export type DeleteAccountsAccountInput = { readonly account: string };
export type DeleteAccountsAccountOutput = Stripedeleted_account;
export type DeleteAccountsAccountError = Stripeerror;
export type PostAccountsAccountBankAccountsInput = {
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
  readonly default_for_currency?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly external_account?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly account: string;
};
export type PostAccountsAccountBankAccountsOutput = Stripeexternal_account;
export type PostAccountsAccountBankAccountsError = Stripeerror;
export type GetAccountsAccountBankAccountsIdInput = {
  readonly account: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetAccountsAccountBankAccountsIdOutput = Stripeexternal_account;
export type GetAccountsAccountBankAccountsIdError = Stripeerror;
export type PostAccountsAccountBankAccountsIdInput = {
  readonly account_holder_name?: string;
  readonly account_holder_type?: "" | "company" | "individual";
  readonly account_type?: "checking" | "futsu" | "savings" | "toza";
  readonly address_city?: string;
  readonly address_country?: string;
  readonly address_line1?: string;
  readonly address_line2?: string;
  readonly address_state?: string;
  readonly address_zip?: string;
  readonly default_for_currency?: boolean;
  readonly documents?: {
    readonly bank_account_ownership_verification?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly exp_month?: string;
  readonly exp_year?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly account: string;
  readonly id: string;
};
export type PostAccountsAccountBankAccountsIdOutput = Stripeexternal_account;
export type PostAccountsAccountBankAccountsIdError = Stripeerror;
export type DeleteAccountsAccountBankAccountsIdInput = {
  readonly account: string;
  readonly id: string;
};
export type DeleteAccountsAccountBankAccountsIdOutput =
  Stripedeleted_external_account;
export type DeleteAccountsAccountBankAccountsIdError = Stripeerror;
export type GetAccountsAccountCapabilitiesInput = {
  readonly account: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetAccountsAccountCapabilitiesOutput = {
  readonly data: ReadonlyArray<Stripecapability>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetAccountsAccountCapabilitiesError = Stripeerror;
export type GetAccountsAccountCapabilitiesCapabilityInput = {
  readonly account: string;
  readonly capability: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetAccountsAccountCapabilitiesCapabilityOutput = Stripecapability;
export type GetAccountsAccountCapabilitiesCapabilityError = Stripeerror;
export type PostAccountsAccountCapabilitiesCapabilityInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly requested?: boolean;
  readonly account: string;
  readonly capability: string;
};
export type PostAccountsAccountCapabilitiesCapabilityOutput = Stripecapability;
export type PostAccountsAccountCapabilitiesCapabilityError = Stripeerror;
export type GetAccountsAccountExternalAccountsInput = {
  readonly account: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly object?: "bank_account" | "card";
  readonly starting_after?: string;
};
export type GetAccountsAccountExternalAccountsOutput = {
  readonly data: ReadonlyArray<Stripebank_account | Stripecard>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetAccountsAccountExternalAccountsError = Stripeerror;
export type PostAccountsAccountExternalAccountsInput = {
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
  readonly default_for_currency?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly external_account?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly account: string;
};
export type PostAccountsAccountExternalAccountsOutput = Stripeexternal_account;
export type PostAccountsAccountExternalAccountsError = Stripeerror;
export type GetAccountsAccountExternalAccountsIdInput = {
  readonly account: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetAccountsAccountExternalAccountsIdOutput = Stripeexternal_account;
export type GetAccountsAccountExternalAccountsIdError = Stripeerror;
export type PostAccountsAccountExternalAccountsIdInput = {
  readonly account_holder_name?: string;
  readonly account_holder_type?: "" | "company" | "individual";
  readonly account_type?: "checking" | "futsu" | "savings" | "toza";
  readonly address_city?: string;
  readonly address_country?: string;
  readonly address_line1?: string;
  readonly address_line2?: string;
  readonly address_state?: string;
  readonly address_zip?: string;
  readonly default_for_currency?: boolean;
  readonly documents?: {
    readonly bank_account_ownership_verification?: {
      readonly files?: ReadonlyArray<string>;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly exp_month?: string;
  readonly exp_year?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly account: string;
  readonly id: string;
};
export type PostAccountsAccountExternalAccountsIdOutput =
  Stripeexternal_account;
export type PostAccountsAccountExternalAccountsIdError = Stripeerror;
export type DeleteAccountsAccountExternalAccountsIdInput = {
  readonly account: string;
  readonly id: string;
};
export type DeleteAccountsAccountExternalAccountsIdOutput =
  Stripedeleted_external_account;
export type DeleteAccountsAccountExternalAccountsIdError = Stripeerror;
export type PostAccountsAccountLoginLinksInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly account: string;
};
export type PostAccountsAccountLoginLinksOutput = Stripelogin_link;
export type PostAccountsAccountLoginLinksError = Stripeerror;
export type GetAccountsAccountPeopleInput = {
  readonly account: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly relationship?: {
    readonly authorizer?: boolean;
    readonly director?: boolean;
    readonly executive?: boolean;
    readonly legal_guardian?: boolean;
    readonly owner?: boolean;
    readonly representative?: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly starting_after?: string;
};
export type GetAccountsAccountPeopleOutput = {
  readonly data: ReadonlyArray<Stripeperson>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetAccountsAccountPeopleError = Stripeerror;
export type PostAccountsAccountPeopleInput = {
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
  readonly expand?: ReadonlyArray<string>;
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
  readonly person_token?: string;
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
    readonly document?: { readonly back?: string; readonly front?: string } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly account: string;
};
export type PostAccountsAccountPeopleOutput = Stripeperson;
export type PostAccountsAccountPeopleError = Stripeerror;
export type GetAccountsAccountPeoplePersonInput = {
  readonly account: string;
  readonly expand?: ReadonlyArray<string>;
  readonly person: string;
};
export type GetAccountsAccountPeoplePersonOutput = Stripeperson;
export type GetAccountsAccountPeoplePersonError = Stripeerror;
export type PostAccountsAccountPeoplePersonInput = {
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
  readonly expand?: ReadonlyArray<string>;
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
  readonly person_token?: string;
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
    readonly document?: { readonly back?: string; readonly front?: string } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly account: string;
  readonly person: string;
};
export type PostAccountsAccountPeoplePersonOutput = Stripeperson;
export type PostAccountsAccountPeoplePersonError = Stripeerror;
export type DeleteAccountsAccountPeoplePersonInput = {
  readonly account: string;
  readonly person: string;
};
export type DeleteAccountsAccountPeoplePersonOutput = Stripedeleted_person;
export type DeleteAccountsAccountPeoplePersonError = Stripeerror;
export type GetAccountsAccountPersonsInput = {
  readonly account: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly relationship?: {
    readonly authorizer?: boolean;
    readonly director?: boolean;
    readonly executive?: boolean;
    readonly legal_guardian?: boolean;
    readonly owner?: boolean;
    readonly representative?: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly starting_after?: string;
};
export type GetAccountsAccountPersonsOutput = {
  readonly data: ReadonlyArray<Stripeperson>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetAccountsAccountPersonsError = Stripeerror;
export type PostAccountsAccountPersonsInput = {
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
  readonly expand?: ReadonlyArray<string>;
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
  readonly person_token?: string;
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
    readonly document?: { readonly back?: string; readonly front?: string } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly account: string;
};
export type PostAccountsAccountPersonsOutput = Stripeperson;
export type PostAccountsAccountPersonsError = Stripeerror;
export type GetAccountsAccountPersonsPersonInput = {
  readonly account: string;
  readonly expand?: ReadonlyArray<string>;
  readonly person: string;
};
export type GetAccountsAccountPersonsPersonOutput = Stripeperson;
export type GetAccountsAccountPersonsPersonError = Stripeerror;
export type PostAccountsAccountPersonsPersonInput = {
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
  readonly expand?: ReadonlyArray<string>;
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
  readonly person_token?: string;
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
    readonly document?: { readonly back?: string; readonly front?: string } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly account: string;
  readonly person: string;
};
export type PostAccountsAccountPersonsPersonOutput = Stripeperson;
export type PostAccountsAccountPersonsPersonError = Stripeerror;
export type DeleteAccountsAccountPersonsPersonInput = {
  readonly account: string;
  readonly person: string;
};
export type DeleteAccountsAccountPersonsPersonOutput = Stripedeleted_person;
export type DeleteAccountsAccountPersonsPersonError = Stripeerror;
export type PostAccountsAccountRejectInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payouts_action?: "none" | "pause";
  readonly reason:
    | "credit"
    | "fraud_no_intent_to_fulfill"
    | "fraud_other"
    | "fraud_payment_method_casher"
    | "fraud_payment_method_tester"
    | "other"
    | "terms_of_service";
  readonly account: string;
};
export type PostAccountsAccountRejectOutput = Stripeaccount;
export type PostAccountsAccountRejectError = Stripeerror;
export type PostAccountsAccountUnrejectInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly account: string;
};
export type PostAccountsAccountUnrejectOutput = Stripeaccount;
export type PostAccountsAccountUnrejectError = Stripeerror;

export const GetAccountsInput = Schema.Struct({
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
export const GetAccountsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeaccount),
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
          new globalThis.RegExp("^\\/v1\\/accounts", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/accounts",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "AccountList", description: "" });
export const GetAccountsError = Stripeerror;
export const PostAccountsInput = Schema.Struct({
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
        verification: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
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
      description: "Specifies which fields in the response should be expanded.",
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
            Schema.Struct({ display_name: Schema.optionalKey(Schema.String) }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "bacs_debit_payments_specs" }),
        ),
        branding: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              icon: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              logo: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              primary_color: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              secondary_color: Schema.optionalKey(
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
          ).annotate({ title: "branding_settings_specs" }),
        ),
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
                      Schema.Literals(["daily", "manual", "monthly", "weekly"]),
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
                      ).annotate({ title: "paypay_site_in_development_specs" }),
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
          Schema.Json.annotate({ expected: "JSON value" }),
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
});
export const PostAccountsOutput = Stripeaccount;
export const PostAccountsError = Stripeerror;
export const GetAccountsAccountInput = Schema.Struct({
  account: Schema.String.check(
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
export const GetAccountsAccountOutput = Stripeaccount;
export const GetAccountsAccountError = Stripeerror;
export const PostAccountsAccountInput = Schema.Struct({
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
      title: "business_profile_update_specs",
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
        verification: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
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
    ).annotate({
      title: "company_update_specs",
      description:
        "Information about the company or business. This field is available for any `business_type`. Once you create an [Account Link](/api/account_links) or [Account Session](/api/account_sessions), this property can only be updated for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts.",
    }),
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
        proof_of_registration: Schema.optionalKey(
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
      title: "documents_specs_update",
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
      description: "Specifies which fields in the response should be expanded.",
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
      title: "individual_update_specs",
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
            Schema.Struct({ display_name: Schema.optionalKey(Schema.String) }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "bacs_debit_payments_specs" }),
        ),
        branding: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              icon: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              logo: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              primary_color: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              secondary_color: Schema.optionalKey(
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
          ).annotate({ title: "branding_settings_specs" }),
        ),
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
              default_account_tax_ids: Schema.optionalKey(
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
          ).annotate({ title: "invoices_settings_specs" }),
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
                      Schema.Literals(["daily", "manual", "monthly", "weekly"]),
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
                      ).annotate({ title: "paypay_site_in_development_specs" }),
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
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "settings_specs_update",
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
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountOutput = Stripeaccount;
export const PostAccountsAccountError = Stripeerror;
export const DeleteAccountsAccountInput = Schema.Struct({
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteAccountsAccountOutput = Stripedeleted_account;
export const DeleteAccountsAccountError = Stripeerror;
export const PostAccountsAccountBankAccountsInput = Schema.Struct({
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
  default_for_currency: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When set to true, or if this is the first external account added in this currency, this account becomes the default external account for its currency.",
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
  external_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A token, like the ones returned by [Stripe.js](https://docs.stripe.com/js) or a dictionary containing a user's external account details (with the options shown below). Please refer to full [documentation](https://stripe.com/docs/api/external_accounts) instead.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountBankAccountsOutput = Stripeexternal_account;
export const PostAccountsAccountBankAccountsError = Stripeerror;
export const GetAccountsAccountBankAccountsIdInput = Schema.Struct({
  account: Schema.String.check(
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
export const GetAccountsAccountBankAccountsIdOutput = Stripeexternal_account;
export const GetAccountsAccountBankAccountsIdError = Stripeerror;
export const PostAccountsAccountBankAccountsIdInput = Schema.Struct({
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
    Schema.Literals(["", "company", "individual"]).annotate({
      description:
        "The type of entity that holds the account. This can be either `individual` or `company`.",
    }),
  ),
  account_type: Schema.optionalKey(
    Schema.Literals(["checking", "futsu", "savings", "toza"]).annotate({
      description:
        "The bank account type. This can only be `checking` or `savings` in most countries. In Japan, this can only be `futsu` or `toza`.",
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
  default_for_currency: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When set to true, this becomes the default external account for its currency.",
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "external_account_documents_param",
      description:
        "Documents that may be submitted to satisfy various informational requests.",
    }),
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
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const PostAccountsAccountBankAccountsIdOutput = Stripeexternal_account;
export const PostAccountsAccountBankAccountsIdError = Stripeerror;
export const DeleteAccountsAccountBankAccountsIdInput = Schema.Struct({
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const DeleteAccountsAccountBankAccountsIdOutput =
  Stripedeleted_external_account;
export const DeleteAccountsAccountBankAccountsIdError = Stripeerror;
export const GetAccountsAccountCapabilitiesInput = Schema.Struct({
  account: Schema.String.check(
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
export const GetAccountsAccountCapabilitiesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecapability),
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
).annotate({ title: "ListAccountCapability", description: "" });
export const GetAccountsAccountCapabilitiesError = Stripeerror;
export const GetAccountsAccountCapabilitiesCapabilityInput = Schema.Struct({
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  capability: Schema.String,
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
export const GetAccountsAccountCapabilitiesCapabilityOutput = Stripecapability;
export const GetAccountsAccountCapabilitiesCapabilityError = Stripeerror;
export const PostAccountsAccountCapabilitiesCapabilityInput = Schema.Struct({
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
  requested: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "To request a new capability for an account, pass true. There can be a delay before the requested capability becomes active. If the capability has any activation requirements, the response includes them in the `requirements` arrays.\n\nIf a capability isn't permanent, you can remove it from the account by passing false. Some capabilities are permanent after they've been requested. Attempting to remove a permanent capability returns an error.",
    }),
  ),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  capability: Schema.String,
});
export const PostAccountsAccountCapabilitiesCapabilityOutput = Stripecapability;
export const PostAccountsAccountCapabilitiesCapabilityError = Stripeerror;
export const GetAccountsAccountExternalAccountsInput = Schema.Struct({
  account: Schema.String.check(
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
  object: Schema.optionalKey(Schema.Literals(["bank_account", "card"])),
  starting_after: Schema.optionalKey(Schema.String),
});
export const GetAccountsAccountExternalAccountsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(
      Schema.Union([Stripebank_account, Stripecard]).annotate({
        title: "Polymorphic",
      }),
    ).annotate({
      description:
        "The list contains all external accounts that have been attached to the Stripe account. These may be bank accounts or cards.",
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
).annotate({ title: "ExternalAccountList", description: "" });
export const GetAccountsAccountExternalAccountsError = Stripeerror;
export const PostAccountsAccountExternalAccountsInput = Schema.Struct({
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
  default_for_currency: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When set to true, or if this is the first external account added in this currency, this account becomes the default external account for its currency.",
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
  external_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A token, like the ones returned by [Stripe.js](https://docs.stripe.com/js) or a dictionary containing a user's external account details (with the options shown below). Please refer to full [documentation](https://stripe.com/docs/api/external_accounts) instead.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountExternalAccountsOutput = Stripeexternal_account;
export const PostAccountsAccountExternalAccountsError = Stripeerror;
export const GetAccountsAccountExternalAccountsIdInput = Schema.Struct({
  account: Schema.String.check(
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
export const GetAccountsAccountExternalAccountsIdOutput =
  Stripeexternal_account;
export const GetAccountsAccountExternalAccountsIdError = Stripeerror;
export const PostAccountsAccountExternalAccountsIdInput = Schema.Struct({
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
    Schema.Literals(["", "company", "individual"]).annotate({
      description:
        "The type of entity that holds the account. This can be either `individual` or `company`.",
    }),
  ),
  account_type: Schema.optionalKey(
    Schema.Literals(["checking", "futsu", "savings", "toza"]).annotate({
      description:
        "The bank account type. This can only be `checking` or `savings` in most countries. In Japan, this can only be `futsu` or `toza`.",
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
  default_for_currency: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When set to true, this becomes the default external account for its currency.",
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
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "external_account_documents_param",
      description:
        "Documents that may be submitted to satisfy various informational requests.",
    }),
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
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const PostAccountsAccountExternalAccountsIdOutput =
  Stripeexternal_account;
export const PostAccountsAccountExternalAccountsIdError = Stripeerror;
export const DeleteAccountsAccountExternalAccountsIdInput = Schema.Struct({
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  id: Schema.String,
});
export const DeleteAccountsAccountExternalAccountsIdOutput =
  Stripedeleted_external_account;
export const DeleteAccountsAccountExternalAccountsIdError = Stripeerror;
export const PostAccountsAccountLoginLinksInput = Schema.Struct({
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
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountLoginLinksOutput = Stripelogin_link;
export const PostAccountsAccountLoginLinksError = Stripeerror;
export const GetAccountsAccountPeopleInput = Schema.Struct({
  account: Schema.String.check(
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
  relationship: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        authorizer: Schema.optionalKey(Schema.Boolean),
        director: Schema.optionalKey(Schema.Boolean),
        executive: Schema.optionalKey(Schema.Boolean),
        legal_guardian: Schema.optionalKey(Schema.Boolean),
        owner: Schema.optionalKey(Schema.Boolean),
        representative: Schema.optionalKey(Schema.Boolean),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "all_people_relationship_specs" }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetAccountsAccountPeopleOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeperson),
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
).annotate({ title: "PersonList", description: "" });
export const GetAccountsAccountPeopleError = Stripeerror;
export const PostAccountsAccountPeopleInput = Schema.Struct({
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
          ).annotate({ title: "settings_terms_of_service_specs" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "person_additional_tos_acceptances_specs",
      description:
        "Details on the legal guardian's or authorizer's acceptance of the required Stripe agreements.",
    }),
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
    ).annotate({
      title: "legal_entity_and_kyc_address_specs",
      description: "The person's address.",
    }),
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
    ).annotate({
      title: "japan_address_kana_specs",
      description: "The Kana variation of the person's address (Japan only).",
    }),
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
    ).annotate({
      title: "japan_address_kanji_specs",
      description: "The Kanji variation of the person's address (Japan only).",
    }),
  ),
  dob: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({ day: Schema.Int, month: Schema.Int, year: Schema.Int }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "date_of_birth_specs" }),
      Schema.Literal(""),
    ]).annotate({ description: "The person's date of birth." }),
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
    ).annotate({
      title: "person_documents_specs",
      description:
        "Documents that may be submitted to satisfy various informational requests.",
    }),
  ),
  email: Schema.optionalKey(
    Schema.String.annotate({
      description: "The person's email address.",
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  first_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's first name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kana variation of the person's first name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's first name (Japan only).",
    }).check(
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
    ]).annotate({
      description:
        "A list of alternate names or aliases that the person is known by.",
    }),
  ),
  gender: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The person\'s gender (International regulations require either "male" or "female").',
    }),
  ),
  id_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's ID number, as appropriate for their country. For example, a social security number in the U.S., social insurance number in Canada, etc. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  id_number_secondary: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's secondary ID number, as appropriate for their country, will be used for enhanced verification checks. In Thailand, this would be the laser code found on the back of an ID card. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's last name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Kana variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  maiden_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's maiden name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
  nationality: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The country where the person is a national. Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)), or "XX" if unavailable.',
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  person_token: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A [person token](https://docs.stripe.com/connect/account-tokens), used to securely provide details to the person.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's phone number." }),
  ),
  political_exposure: Schema.optionalKey(
    Schema.Literals(["existing", "none"]).annotate({
      description:
        "Indicates if the person or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.",
    }),
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
    ).annotate({
      title: "address_specs",
      description: "The person's registered address.",
    }),
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
    ).annotate({
      title: "relationship_specs",
      description:
        "The relationship that this person has with the account's legal entity.",
    }),
  ),
  ssn_last_4: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The last four digits of the person's Social Security number (U.S. only).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }),
  ),
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
    ).annotate({
      title: "us_cfpb_data_specs",
      description: "Demographic data related to the person.",
    }),
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
    ).annotate({
      title: "person_verification_specs",
      description: "The person's verification status.",
    }),
  ),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountPeopleOutput = Stripeperson;
export const PostAccountsAccountPeopleError = Stripeerror;
export const GetAccountsAccountPeoplePersonInput = Schema.Struct({
  account: Schema.String.check(
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
  person: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetAccountsAccountPeoplePersonOutput = Stripeperson;
export const GetAccountsAccountPeoplePersonError = Stripeerror;
export const PostAccountsAccountPeoplePersonInput = Schema.Struct({
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
          ).annotate({ title: "settings_terms_of_service_specs" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "person_additional_tos_acceptances_specs",
      description:
        "Details on the legal guardian's or authorizer's acceptance of the required Stripe agreements.",
    }),
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
    ).annotate({
      title: "legal_entity_and_kyc_address_specs",
      description: "The person's address.",
    }),
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
    ).annotate({
      title: "japan_address_kana_specs",
      description: "The Kana variation of the person's address (Japan only).",
    }),
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
    ).annotate({
      title: "japan_address_kanji_specs",
      description: "The Kanji variation of the person's address (Japan only).",
    }),
  ),
  dob: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({ day: Schema.Int, month: Schema.Int, year: Schema.Int }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "date_of_birth_specs" }),
      Schema.Literal(""),
    ]).annotate({ description: "The person's date of birth." }),
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
    ).annotate({
      title: "person_documents_specs",
      description:
        "Documents that may be submitted to satisfy various informational requests.",
    }),
  ),
  email: Schema.optionalKey(
    Schema.String.annotate({
      description: "The person's email address.",
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  first_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's first name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kana variation of the person's first name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's first name (Japan only).",
    }).check(
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
    ]).annotate({
      description:
        "A list of alternate names or aliases that the person is known by.",
    }),
  ),
  gender: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The person\'s gender (International regulations require either "male" or "female").',
    }),
  ),
  id_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's ID number, as appropriate for their country. For example, a social security number in the U.S., social insurance number in Canada, etc. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  id_number_secondary: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's secondary ID number, as appropriate for their country, will be used for enhanced verification checks. In Thailand, this would be the laser code found on the back of an ID card. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's last name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Kana variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  maiden_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's maiden name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
  nationality: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The country where the person is a national. Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)), or "XX" if unavailable.',
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  person_token: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A [person token](https://docs.stripe.com/connect/account-tokens), used to securely provide details to the person.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's phone number." }),
  ),
  political_exposure: Schema.optionalKey(
    Schema.Literals(["existing", "none"]).annotate({
      description:
        "Indicates if the person or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.",
    }),
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
    ).annotate({
      title: "address_specs",
      description: "The person's registered address.",
    }),
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
    ).annotate({
      title: "relationship_specs",
      description:
        "The relationship that this person has with the account's legal entity.",
    }),
  ),
  ssn_last_4: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The last four digits of the person's Social Security number (U.S. only).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }),
  ),
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
    ).annotate({
      title: "us_cfpb_data_specs",
      description: "Demographic data related to the person.",
    }),
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
    ).annotate({
      title: "person_verification_specs",
      description: "The person's verification status.",
    }),
  ),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  person: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountPeoplePersonOutput = Stripeperson;
export const PostAccountsAccountPeoplePersonError = Stripeerror;
export const DeleteAccountsAccountPeoplePersonInput = Schema.Struct({
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  person: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteAccountsAccountPeoplePersonOutput = Stripedeleted_person;
export const DeleteAccountsAccountPeoplePersonError = Stripeerror;
export const GetAccountsAccountPersonsInput = Schema.Struct({
  account: Schema.String.check(
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
  relationship: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        authorizer: Schema.optionalKey(Schema.Boolean),
        director: Schema.optionalKey(Schema.Boolean),
        executive: Schema.optionalKey(Schema.Boolean),
        legal_guardian: Schema.optionalKey(Schema.Boolean),
        owner: Schema.optionalKey(Schema.Boolean),
        representative: Schema.optionalKey(Schema.Boolean),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "all_people_relationship_specs" }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetAccountsAccountPersonsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeperson),
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
).annotate({ title: "PersonList", description: "" });
export const GetAccountsAccountPersonsError = Stripeerror;
export const PostAccountsAccountPersonsInput = Schema.Struct({
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
          ).annotate({ title: "settings_terms_of_service_specs" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "person_additional_tos_acceptances_specs",
      description:
        "Details on the legal guardian's or authorizer's acceptance of the required Stripe agreements.",
    }),
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
    ).annotate({
      title: "legal_entity_and_kyc_address_specs",
      description: "The person's address.",
    }),
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
    ).annotate({
      title: "japan_address_kana_specs",
      description: "The Kana variation of the person's address (Japan only).",
    }),
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
    ).annotate({
      title: "japan_address_kanji_specs",
      description: "The Kanji variation of the person's address (Japan only).",
    }),
  ),
  dob: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({ day: Schema.Int, month: Schema.Int, year: Schema.Int }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "date_of_birth_specs" }),
      Schema.Literal(""),
    ]).annotate({ description: "The person's date of birth." }),
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
    ).annotate({
      title: "person_documents_specs",
      description:
        "Documents that may be submitted to satisfy various informational requests.",
    }),
  ),
  email: Schema.optionalKey(
    Schema.String.annotate({
      description: "The person's email address.",
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  first_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's first name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kana variation of the person's first name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's first name (Japan only).",
    }).check(
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
    ]).annotate({
      description:
        "A list of alternate names or aliases that the person is known by.",
    }),
  ),
  gender: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The person\'s gender (International regulations require either "male" or "female").',
    }),
  ),
  id_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's ID number, as appropriate for their country. For example, a social security number in the U.S., social insurance number in Canada, etc. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  id_number_secondary: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's secondary ID number, as appropriate for their country, will be used for enhanced verification checks. In Thailand, this would be the laser code found on the back of an ID card. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's last name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Kana variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  maiden_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's maiden name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
  nationality: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The country where the person is a national. Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)), or "XX" if unavailable.',
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  person_token: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A [person token](https://docs.stripe.com/connect/account-tokens), used to securely provide details to the person.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's phone number." }),
  ),
  political_exposure: Schema.optionalKey(
    Schema.Literals(["existing", "none"]).annotate({
      description:
        "Indicates if the person or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.",
    }),
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
    ).annotate({
      title: "address_specs",
      description: "The person's registered address.",
    }),
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
    ).annotate({
      title: "relationship_specs",
      description:
        "The relationship that this person has with the account's legal entity.",
    }),
  ),
  ssn_last_4: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The last four digits of the person's Social Security number (U.S. only).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }),
  ),
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
    ).annotate({
      title: "us_cfpb_data_specs",
      description: "Demographic data related to the person.",
    }),
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
    ).annotate({
      title: "person_verification_specs",
      description: "The person's verification status.",
    }),
  ),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountPersonsOutput = Stripeperson;
export const PostAccountsAccountPersonsError = Stripeerror;
export const GetAccountsAccountPersonsPersonInput = Schema.Struct({
  account: Schema.String.check(
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
  person: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetAccountsAccountPersonsPersonOutput = Stripeperson;
export const GetAccountsAccountPersonsPersonError = Stripeerror;
export const PostAccountsAccountPersonsPersonInput = Schema.Struct({
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
          ).annotate({ title: "settings_terms_of_service_specs" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "person_additional_tos_acceptances_specs",
      description:
        "Details on the legal guardian's or authorizer's acceptance of the required Stripe agreements.",
    }),
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
    ).annotate({
      title: "legal_entity_and_kyc_address_specs",
      description: "The person's address.",
    }),
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
    ).annotate({
      title: "japan_address_kana_specs",
      description: "The Kana variation of the person's address (Japan only).",
    }),
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
    ).annotate({
      title: "japan_address_kanji_specs",
      description: "The Kanji variation of the person's address (Japan only).",
    }),
  ),
  dob: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({ day: Schema.Int, month: Schema.Int, year: Schema.Int }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "date_of_birth_specs" }),
      Schema.Literal(""),
    ]).annotate({ description: "The person's date of birth." }),
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
                        expected: "a string with at most 500 code points",
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
    ).annotate({
      title: "person_documents_specs",
      description:
        "Documents that may be submitted to satisfy various informational requests.",
    }),
  ),
  email: Schema.optionalKey(
    Schema.String.annotate({
      description: "The person's email address.",
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  first_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's first name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kana variation of the person's first name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  first_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's first name (Japan only).",
    }).check(
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
    ]).annotate({
      description:
        "A list of alternate names or aliases that the person is known by.",
    }),
  ),
  gender: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The person\'s gender (International regulations require either "male" or "female").',
    }),
  ),
  id_number: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's ID number, as appropriate for their country. For example, a social security number in the U.S., social insurance number in Canada, etc. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  id_number_secondary: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The person's secondary ID number, as appropriate for their country, will be used for enhanced verification checks. In Thailand, this would be the laser code found on the back of an ID card. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=pii).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's last name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Kana variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  last_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the person's last name (Japan only).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  maiden_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's maiden name." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
  nationality: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The country where the person is a national. Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)), or "XX" if unavailable.',
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  person_token: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A [person token](https://docs.stripe.com/connect/account-tokens), used to securely provide details to the person.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's phone number." }),
  ),
  political_exposure: Schema.optionalKey(
    Schema.Literals(["existing", "none"]).annotate({
      description:
        "Indicates if the person or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.",
    }),
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
    ).annotate({
      title: "address_specs",
      description: "The person's registered address.",
    }),
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
    ).annotate({
      title: "relationship_specs",
      description:
        "The relationship that this person has with the account's legal entity.",
    }),
  ),
  ssn_last_4: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The last four digits of the person's Social Security number (U.S. only).\n\nChanging this value for the account's representative requires that the account re-accept the [terms of service](/api/accounts/object#account_object-tos_acceptance).",
    }),
  ),
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
    ).annotate({
      title: "us_cfpb_data_specs",
      description: "Demographic data related to the person.",
    }),
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
    ).annotate({
      title: "person_verification_specs",
      description: "The person's verification status.",
    }),
  ),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  person: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountPersonsPersonOutput = Stripeperson;
export const PostAccountsAccountPersonsPersonError = Stripeerror;
export const DeleteAccountsAccountPersonsPersonInput = Schema.Struct({
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  person: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteAccountsAccountPersonsPersonOutput = Stripedeleted_person;
export const DeleteAccountsAccountPersonsPersonError = Stripeerror;
export const PostAccountsAccountRejectInput = Schema.Struct({
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
  payouts_action: Schema.optionalKey(
    Schema.Literals(["none", "pause"]).annotate({
      description:
        "Whether to pause payouts on the account as part of the rejection. Defaults to `pause`. Use `none` to leave payouts enabled.",
    }),
  ),
  reason: Schema.Literals([
    "credit",
    "fraud_no_intent_to_fulfill",
    "fraud_other",
    "fraud_payment_method_casher",
    "fraud_payment_method_tester",
    "other",
    "terms_of_service",
  ]).annotate({
    description:
      "The reason for rejecting the account. Can be `fraud_payment_method_casher`, `fraud_payment_method_tester`, `fraud_no_intent_to_fulfill`, `fraud_other`, `credit`, `terms_of_service`, or `other`.",
  }),
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountRejectOutput = Stripeaccount;
export const PostAccountsAccountRejectError = Stripeerror;
export const PostAccountsAccountUnrejectInput = Schema.Struct({
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
  account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostAccountsAccountUnrejectOutput = Stripeaccount;
export const PostAccountsAccountUnrejectError = Stripeerror;
/**
 * The GetAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsOperation: StripeOperation & {
  readonly input: typeof GetAccountsInput;
  readonly output: typeof GetAccountsOutput;
  readonly error: typeof GetAccountsError;
} = {
  name: "GetAccounts",
  method: "GET",
  path: "/v1/accounts",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsInput,
  output: GetAccountsOutput,
  error: GetAccountsError,
};
/**
 * The PostAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsOperation: StripeOperation & {
  readonly input: typeof PostAccountsInput;
  readonly output: typeof PostAccountsOutput;
  readonly error: typeof PostAccountsError;
} = {
  name: "PostAccounts",
  method: "POST",
  path: "/v1/accounts",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsInput,
  output: PostAccountsOutput,
  error: PostAccountsError,
};
/**
 * The GetAccountsAccountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountInput;
  readonly output: typeof GetAccountsAccountOutput;
  readonly error: typeof GetAccountsAccountError;
} = {
  name: "GetAccountsAccount",
  method: "GET",
  path: "/v1/accounts/{account}",
  pathParameters: ["account"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountInput,
  output: GetAccountsAccountOutput,
  error: GetAccountsAccountError,
};
/**
 * The PostAccountsAccountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountInput;
  readonly output: typeof PostAccountsAccountOutput;
  readonly error: typeof PostAccountsAccountError;
} = {
  name: "PostAccountsAccount",
  method: "POST",
  path: "/v1/accounts/{account}",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountInput,
  output: PostAccountsAccountOutput,
  error: PostAccountsAccountError,
};
/**
 * The DeleteAccountsAccountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteAccountsAccountOperation: StripeOperation & {
  readonly input: typeof DeleteAccountsAccountInput;
  readonly output: typeof DeleteAccountsAccountOutput;
  readonly error: typeof DeleteAccountsAccountError;
} = {
  name: "DeleteAccountsAccount",
  method: "DELETE",
  path: "/v1/accounts/{account}",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteAccountsAccountInput,
  output: DeleteAccountsAccountOutput,
  error: DeleteAccountsAccountError,
};
/**
 * The PostAccountsAccountBankAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountBankAccountsOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountBankAccountsInput;
  readonly output: typeof PostAccountsAccountBankAccountsOutput;
  readonly error: typeof PostAccountsAccountBankAccountsError;
} = {
  name: "PostAccountsAccountBankAccounts",
  method: "POST",
  path: "/v1/accounts/{account}/bank_accounts",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountBankAccountsInput,
  output: PostAccountsAccountBankAccountsOutput,
  error: PostAccountsAccountBankAccountsError,
};
/**
 * The GetAccountsAccountBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountBankAccountsIdInput;
  readonly output: typeof GetAccountsAccountBankAccountsIdOutput;
  readonly error: typeof GetAccountsAccountBankAccountsIdError;
} = {
  name: "GetAccountsAccountBankAccountsId",
  method: "GET",
  path: "/v1/accounts/{account}/bank_accounts/{id}",
  pathParameters: ["account", "id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountBankAccountsIdInput,
  output: GetAccountsAccountBankAccountsIdOutput,
  error: GetAccountsAccountBankAccountsIdError,
};
/**
 * The PostAccountsAccountBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountBankAccountsIdInput;
  readonly output: typeof PostAccountsAccountBankAccountsIdOutput;
  readonly error: typeof PostAccountsAccountBankAccountsIdError;
} = {
  name: "PostAccountsAccountBankAccountsId",
  method: "POST",
  path: "/v1/accounts/{account}/bank_accounts/{id}",
  pathParameters: ["account", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountBankAccountsIdInput,
  output: PostAccountsAccountBankAccountsIdOutput,
  error: PostAccountsAccountBankAccountsIdError,
};
/**
 * The DeleteAccountsAccountBankAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteAccountsAccountBankAccountsIdOperation: StripeOperation & {
  readonly input: typeof DeleteAccountsAccountBankAccountsIdInput;
  readonly output: typeof DeleteAccountsAccountBankAccountsIdOutput;
  readonly error: typeof DeleteAccountsAccountBankAccountsIdError;
} = {
  name: "DeleteAccountsAccountBankAccountsId",
  method: "DELETE",
  path: "/v1/accounts/{account}/bank_accounts/{id}",
  pathParameters: ["account", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteAccountsAccountBankAccountsIdInput,
  output: DeleteAccountsAccountBankAccountsIdOutput,
  error: DeleteAccountsAccountBankAccountsIdError,
};
/**
 * The GetAccountsAccountCapabilitiesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountCapabilitiesOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountCapabilitiesInput;
  readonly output: typeof GetAccountsAccountCapabilitiesOutput;
  readonly error: typeof GetAccountsAccountCapabilitiesError;
} = {
  name: "GetAccountsAccountCapabilities",
  method: "GET",
  path: "/v1/accounts/{account}/capabilities",
  pathParameters: ["account"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountCapabilitiesInput,
  output: GetAccountsAccountCapabilitiesOutput,
  error: GetAccountsAccountCapabilitiesError,
};
/**
 * The GetAccountsAccountCapabilitiesCapabilityOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountCapabilitiesCapabilityOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountCapabilitiesCapabilityInput;
  readonly output: typeof GetAccountsAccountCapabilitiesCapabilityOutput;
  readonly error: typeof GetAccountsAccountCapabilitiesCapabilityError;
} = {
  name: "GetAccountsAccountCapabilitiesCapability",
  method: "GET",
  path: "/v1/accounts/{account}/capabilities/{capability}",
  pathParameters: ["account", "capability"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountCapabilitiesCapabilityInput,
  output: GetAccountsAccountCapabilitiesCapabilityOutput,
  error: GetAccountsAccountCapabilitiesCapabilityError,
};
/**
 * The PostAccountsAccountCapabilitiesCapabilityOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountCapabilitiesCapabilityOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountCapabilitiesCapabilityInput;
  readonly output: typeof PostAccountsAccountCapabilitiesCapabilityOutput;
  readonly error: typeof PostAccountsAccountCapabilitiesCapabilityError;
} = {
  name: "PostAccountsAccountCapabilitiesCapability",
  method: "POST",
  path: "/v1/accounts/{account}/capabilities/{capability}",
  pathParameters: ["account", "capability"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountCapabilitiesCapabilityInput,
  output: PostAccountsAccountCapabilitiesCapabilityOutput,
  error: PostAccountsAccountCapabilitiesCapabilityError,
};
/**
 * The GetAccountsAccountExternalAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountExternalAccountsOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountExternalAccountsInput;
  readonly output: typeof GetAccountsAccountExternalAccountsOutput;
  readonly error: typeof GetAccountsAccountExternalAccountsError;
} = {
  name: "GetAccountsAccountExternalAccounts",
  method: "GET",
  path: "/v1/accounts/{account}/external_accounts",
  pathParameters: ["account"],
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
  input: GetAccountsAccountExternalAccountsInput,
  output: GetAccountsAccountExternalAccountsOutput,
  error: GetAccountsAccountExternalAccountsError,
};
/**
 * The PostAccountsAccountExternalAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountExternalAccountsOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountExternalAccountsInput;
  readonly output: typeof PostAccountsAccountExternalAccountsOutput;
  readonly error: typeof PostAccountsAccountExternalAccountsError;
} = {
  name: "PostAccountsAccountExternalAccounts",
  method: "POST",
  path: "/v1/accounts/{account}/external_accounts",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountExternalAccountsInput,
  output: PostAccountsAccountExternalAccountsOutput,
  error: PostAccountsAccountExternalAccountsError,
};
/**
 * The GetAccountsAccountExternalAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountExternalAccountsIdOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountExternalAccountsIdInput;
  readonly output: typeof GetAccountsAccountExternalAccountsIdOutput;
  readonly error: typeof GetAccountsAccountExternalAccountsIdError;
} = {
  name: "GetAccountsAccountExternalAccountsId",
  method: "GET",
  path: "/v1/accounts/{account}/external_accounts/{id}",
  pathParameters: ["account", "id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountExternalAccountsIdInput,
  output: GetAccountsAccountExternalAccountsIdOutput,
  error: GetAccountsAccountExternalAccountsIdError,
};
/**
 * The PostAccountsAccountExternalAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountExternalAccountsIdOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountExternalAccountsIdInput;
  readonly output: typeof PostAccountsAccountExternalAccountsIdOutput;
  readonly error: typeof PostAccountsAccountExternalAccountsIdError;
} = {
  name: "PostAccountsAccountExternalAccountsId",
  method: "POST",
  path: "/v1/accounts/{account}/external_accounts/{id}",
  pathParameters: ["account", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountExternalAccountsIdInput,
  output: PostAccountsAccountExternalAccountsIdOutput,
  error: PostAccountsAccountExternalAccountsIdError,
};
/**
 * The DeleteAccountsAccountExternalAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteAccountsAccountExternalAccountsIdOperation: StripeOperation & {
  readonly input: typeof DeleteAccountsAccountExternalAccountsIdInput;
  readonly output: typeof DeleteAccountsAccountExternalAccountsIdOutput;
  readonly error: typeof DeleteAccountsAccountExternalAccountsIdError;
} = {
  name: "DeleteAccountsAccountExternalAccountsId",
  method: "DELETE",
  path: "/v1/accounts/{account}/external_accounts/{id}",
  pathParameters: ["account", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteAccountsAccountExternalAccountsIdInput,
  output: DeleteAccountsAccountExternalAccountsIdOutput,
  error: DeleteAccountsAccountExternalAccountsIdError,
};
/**
 * The PostAccountsAccountLoginLinksOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountLoginLinksOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountLoginLinksInput;
  readonly output: typeof PostAccountsAccountLoginLinksOutput;
  readonly error: typeof PostAccountsAccountLoginLinksError;
} = {
  name: "PostAccountsAccountLoginLinks",
  method: "POST",
  path: "/v1/accounts/{account}/login_links",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountLoginLinksInput,
  output: PostAccountsAccountLoginLinksOutput,
  error: PostAccountsAccountLoginLinksError,
};
/**
 * The GetAccountsAccountPeopleOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountPeopleOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountPeopleInput;
  readonly output: typeof GetAccountsAccountPeopleOutput;
  readonly error: typeof GetAccountsAccountPeopleError;
} = {
  name: "GetAccountsAccountPeople",
  method: "GET",
  path: "/v1/accounts/{account}/people",
  pathParameters: ["account"],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "relationship",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountPeopleInput,
  output: GetAccountsAccountPeopleOutput,
  error: GetAccountsAccountPeopleError,
};
/**
 * The PostAccountsAccountPeopleOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountPeopleOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountPeopleInput;
  readonly output: typeof PostAccountsAccountPeopleOutput;
  readonly error: typeof PostAccountsAccountPeopleError;
} = {
  name: "PostAccountsAccountPeople",
  method: "POST",
  path: "/v1/accounts/{account}/people",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountPeopleInput,
  output: PostAccountsAccountPeopleOutput,
  error: PostAccountsAccountPeopleError,
};
/**
 * The GetAccountsAccountPeoplePersonOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountPeoplePersonOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountPeoplePersonInput;
  readonly output: typeof GetAccountsAccountPeoplePersonOutput;
  readonly error: typeof GetAccountsAccountPeoplePersonError;
} = {
  name: "GetAccountsAccountPeoplePerson",
  method: "GET",
  path: "/v1/accounts/{account}/people/{person}",
  pathParameters: ["account", "person"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountPeoplePersonInput,
  output: GetAccountsAccountPeoplePersonOutput,
  error: GetAccountsAccountPeoplePersonError,
};
/**
 * The PostAccountsAccountPeoplePersonOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountPeoplePersonOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountPeoplePersonInput;
  readonly output: typeof PostAccountsAccountPeoplePersonOutput;
  readonly error: typeof PostAccountsAccountPeoplePersonError;
} = {
  name: "PostAccountsAccountPeoplePerson",
  method: "POST",
  path: "/v1/accounts/{account}/people/{person}",
  pathParameters: ["account", "person"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountPeoplePersonInput,
  output: PostAccountsAccountPeoplePersonOutput,
  error: PostAccountsAccountPeoplePersonError,
};
/**
 * The DeleteAccountsAccountPeoplePersonOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteAccountsAccountPeoplePersonOperation: StripeOperation & {
  readonly input: typeof DeleteAccountsAccountPeoplePersonInput;
  readonly output: typeof DeleteAccountsAccountPeoplePersonOutput;
  readonly error: typeof DeleteAccountsAccountPeoplePersonError;
} = {
  name: "DeleteAccountsAccountPeoplePerson",
  method: "DELETE",
  path: "/v1/accounts/{account}/people/{person}",
  pathParameters: ["account", "person"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteAccountsAccountPeoplePersonInput,
  output: DeleteAccountsAccountPeoplePersonOutput,
  error: DeleteAccountsAccountPeoplePersonError,
};
/**
 * The GetAccountsAccountPersonsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountPersonsOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountPersonsInput;
  readonly output: typeof GetAccountsAccountPersonsOutput;
  readonly error: typeof GetAccountsAccountPersonsError;
} = {
  name: "GetAccountsAccountPersons",
  method: "GET",
  path: "/v1/accounts/{account}/persons",
  pathParameters: ["account"],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "relationship",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountPersonsInput,
  output: GetAccountsAccountPersonsOutput,
  error: GetAccountsAccountPersonsError,
};
/**
 * The PostAccountsAccountPersonsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountPersonsOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountPersonsInput;
  readonly output: typeof PostAccountsAccountPersonsOutput;
  readonly error: typeof PostAccountsAccountPersonsError;
} = {
  name: "PostAccountsAccountPersons",
  method: "POST",
  path: "/v1/accounts/{account}/persons",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountPersonsInput,
  output: PostAccountsAccountPersonsOutput,
  error: PostAccountsAccountPersonsError,
};
/**
 * The GetAccountsAccountPersonsPersonOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAccountsAccountPersonsPersonOperation: StripeOperation & {
  readonly input: typeof GetAccountsAccountPersonsPersonInput;
  readonly output: typeof GetAccountsAccountPersonsPersonOutput;
  readonly error: typeof GetAccountsAccountPersonsPersonError;
} = {
  name: "GetAccountsAccountPersonsPerson",
  method: "GET",
  path: "/v1/accounts/{account}/persons/{person}",
  pathParameters: ["account", "person"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAccountsAccountPersonsPersonInput,
  output: GetAccountsAccountPersonsPersonOutput,
  error: GetAccountsAccountPersonsPersonError,
};
/**
 * The PostAccountsAccountPersonsPersonOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountPersonsPersonOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountPersonsPersonInput;
  readonly output: typeof PostAccountsAccountPersonsPersonOutput;
  readonly error: typeof PostAccountsAccountPersonsPersonError;
} = {
  name: "PostAccountsAccountPersonsPerson",
  method: "POST",
  path: "/v1/accounts/{account}/persons/{person}",
  pathParameters: ["account", "person"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountPersonsPersonInput,
  output: PostAccountsAccountPersonsPersonOutput,
  error: PostAccountsAccountPersonsPersonError,
};
/**
 * The DeleteAccountsAccountPersonsPersonOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteAccountsAccountPersonsPersonOperation: StripeOperation & {
  readonly input: typeof DeleteAccountsAccountPersonsPersonInput;
  readonly output: typeof DeleteAccountsAccountPersonsPersonOutput;
  readonly error: typeof DeleteAccountsAccountPersonsPersonError;
} = {
  name: "DeleteAccountsAccountPersonsPerson",
  method: "DELETE",
  path: "/v1/accounts/{account}/persons/{person}",
  pathParameters: ["account", "person"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteAccountsAccountPersonsPersonInput,
  output: DeleteAccountsAccountPersonsPersonOutput,
  error: DeleteAccountsAccountPersonsPersonError,
};
/**
 * The PostAccountsAccountRejectOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountRejectOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountRejectInput;
  readonly output: typeof PostAccountsAccountRejectOutput;
  readonly error: typeof PostAccountsAccountRejectError;
} = {
  name: "PostAccountsAccountReject",
  method: "POST",
  path: "/v1/accounts/{account}/reject",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountRejectInput,
  output: PostAccountsAccountRejectOutput,
  error: PostAccountsAccountRejectError,
};
/**
 * The PostAccountsAccountUnrejectOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAccountsAccountUnrejectOperation: StripeOperation & {
  readonly input: typeof PostAccountsAccountUnrejectInput;
  readonly output: typeof PostAccountsAccountUnrejectOutput;
  readonly error: typeof PostAccountsAccountUnrejectError;
} = {
  name: "PostAccountsAccountUnreject",
  method: "POST",
  path: "/v1/accounts/{account}/unreject",
  pathParameters: ["account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAccountsAccountUnrejectInput,
  output: PostAccountsAccountUnrejectOutput,
  error: PostAccountsAccountUnrejectError,
};
/**
 * The makeV1AccountsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeV1AccountsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccounts = Effect.fn("v1Accounts.GetAccounts")(function* (
    input: GetAccountsInput,
  ) {
    const response: GetAccountsOutput = yield* client.invoke(
      GetAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccounts = Effect.fn("v1Accounts.PostAccounts")(function* (
    input: PostAccountsInput,
  ) {
    const response: PostAccountsOutput = yield* client.invoke(
      PostAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetAccountsAccount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccount = Effect.fn("v1Accounts.GetAccountsAccount")(
    function* (input: GetAccountsAccountInput) {
      const response: GetAccountsAccountOutput = yield* client.invoke(
        GetAccountsAccountOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostAccountsAccount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccount = Effect.fn("v1Accounts.PostAccountsAccount")(
    function* (input: PostAccountsAccountInput) {
      const response: PostAccountsAccountOutput = yield* client.invoke(
        PostAccountsAccountOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The DeleteAccountsAccount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteAccountsAccount = Effect.fn("v1Accounts.DeleteAccountsAccount")(
    function* (input: DeleteAccountsAccountInput) {
      const response: DeleteAccountsAccountOutput = yield* client.invoke(
        DeleteAccountsAccountOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostAccountsAccountBankAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountBankAccounts = Effect.fn(
    "v1Accounts.PostAccountsAccountBankAccounts",
  )(function* (input: PostAccountsAccountBankAccountsInput) {
    const response: PostAccountsAccountBankAccountsOutput =
      yield* client.invoke(PostAccountsAccountBankAccountsOperation, input);
    return response;
  });
  /**
   * The GetAccountsAccountBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountBankAccountsId = Effect.fn(
    "v1Accounts.GetAccountsAccountBankAccountsId",
  )(function* (input: GetAccountsAccountBankAccountsIdInput) {
    const response: GetAccountsAccountBankAccountsIdOutput =
      yield* client.invoke(GetAccountsAccountBankAccountsIdOperation, input);
    return response;
  });
  /**
   * The PostAccountsAccountBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountBankAccountsId = Effect.fn(
    "v1Accounts.PostAccountsAccountBankAccountsId",
  )(function* (input: PostAccountsAccountBankAccountsIdInput) {
    const response: PostAccountsAccountBankAccountsIdOutput =
      yield* client.invoke(PostAccountsAccountBankAccountsIdOperation, input);
    return response;
  });
  /**
   * The DeleteAccountsAccountBankAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteAccountsAccountBankAccountsId = Effect.fn(
    "v1Accounts.DeleteAccountsAccountBankAccountsId",
  )(function* (input: DeleteAccountsAccountBankAccountsIdInput) {
    const response: DeleteAccountsAccountBankAccountsIdOutput =
      yield* client.invoke(DeleteAccountsAccountBankAccountsIdOperation, input);
    return response;
  });
  /**
   * The GetAccountsAccountCapabilities function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountCapabilities = Effect.fn(
    "v1Accounts.GetAccountsAccountCapabilities",
  )(function* (input: GetAccountsAccountCapabilitiesInput) {
    const response: GetAccountsAccountCapabilitiesOutput = yield* client.invoke(
      GetAccountsAccountCapabilitiesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetAccountsAccountCapabilitiesCapability function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountCapabilitiesCapability = Effect.fn(
    "v1Accounts.GetAccountsAccountCapabilitiesCapability",
  )(function* (input: GetAccountsAccountCapabilitiesCapabilityInput) {
    const response: GetAccountsAccountCapabilitiesCapabilityOutput =
      yield* client.invoke(
        GetAccountsAccountCapabilitiesCapabilityOperation,
        input,
      );
    return response;
  });
  /**
   * The PostAccountsAccountCapabilitiesCapability function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountCapabilitiesCapability = Effect.fn(
    "v1Accounts.PostAccountsAccountCapabilitiesCapability",
  )(function* (input: PostAccountsAccountCapabilitiesCapabilityInput) {
    const response: PostAccountsAccountCapabilitiesCapabilityOutput =
      yield* client.invoke(
        PostAccountsAccountCapabilitiesCapabilityOperation,
        input,
      );
    return response;
  });
  /**
   * The GetAccountsAccountExternalAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountExternalAccounts = Effect.fn(
    "v1Accounts.GetAccountsAccountExternalAccounts",
  )(function* (input: GetAccountsAccountExternalAccountsInput) {
    const response: GetAccountsAccountExternalAccountsOutput =
      yield* client.invoke(GetAccountsAccountExternalAccountsOperation, input);
    return response;
  });
  /**
   * The PostAccountsAccountExternalAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountExternalAccounts = Effect.fn(
    "v1Accounts.PostAccountsAccountExternalAccounts",
  )(function* (input: PostAccountsAccountExternalAccountsInput) {
    const response: PostAccountsAccountExternalAccountsOutput =
      yield* client.invoke(PostAccountsAccountExternalAccountsOperation, input);
    return response;
  });
  /**
   * The GetAccountsAccountExternalAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountExternalAccountsId = Effect.fn(
    "v1Accounts.GetAccountsAccountExternalAccountsId",
  )(function* (input: GetAccountsAccountExternalAccountsIdInput) {
    const response: GetAccountsAccountExternalAccountsIdOutput =
      yield* client.invoke(
        GetAccountsAccountExternalAccountsIdOperation,
        input,
      );
    return response;
  });
  /**
   * The PostAccountsAccountExternalAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountExternalAccountsId = Effect.fn(
    "v1Accounts.PostAccountsAccountExternalAccountsId",
  )(function* (input: PostAccountsAccountExternalAccountsIdInput) {
    const response: PostAccountsAccountExternalAccountsIdOutput =
      yield* client.invoke(
        PostAccountsAccountExternalAccountsIdOperation,
        input,
      );
    return response;
  });
  /**
   * The DeleteAccountsAccountExternalAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteAccountsAccountExternalAccountsId = Effect.fn(
    "v1Accounts.DeleteAccountsAccountExternalAccountsId",
  )(function* (input: DeleteAccountsAccountExternalAccountsIdInput) {
    const response: DeleteAccountsAccountExternalAccountsIdOutput =
      yield* client.invoke(
        DeleteAccountsAccountExternalAccountsIdOperation,
        input,
      );
    return response;
  });
  /**
   * The PostAccountsAccountLoginLinks function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountLoginLinks = Effect.fn(
    "v1Accounts.PostAccountsAccountLoginLinks",
  )(function* (input: PostAccountsAccountLoginLinksInput) {
    const response: PostAccountsAccountLoginLinksOutput = yield* client.invoke(
      PostAccountsAccountLoginLinksOperation,
      input,
    );
    return response;
  });
  /**
   * The GetAccountsAccountPeople function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountPeople = Effect.fn(
    "v1Accounts.GetAccountsAccountPeople",
  )(function* (input: GetAccountsAccountPeopleInput) {
    const response: GetAccountsAccountPeopleOutput = yield* client.invoke(
      GetAccountsAccountPeopleOperation,
      input,
    );
    return response;
  });
  /**
   * The PostAccountsAccountPeople function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountPeople = Effect.fn(
    "v1Accounts.PostAccountsAccountPeople",
  )(function* (input: PostAccountsAccountPeopleInput) {
    const response: PostAccountsAccountPeopleOutput = yield* client.invoke(
      PostAccountsAccountPeopleOperation,
      input,
    );
    return response;
  });
  /**
   * The GetAccountsAccountPeoplePerson function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountPeoplePerson = Effect.fn(
    "v1Accounts.GetAccountsAccountPeoplePerson",
  )(function* (input: GetAccountsAccountPeoplePersonInput) {
    const response: GetAccountsAccountPeoplePersonOutput = yield* client.invoke(
      GetAccountsAccountPeoplePersonOperation,
      input,
    );
    return response;
  });
  /**
   * The PostAccountsAccountPeoplePerson function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountPeoplePerson = Effect.fn(
    "v1Accounts.PostAccountsAccountPeoplePerson",
  )(function* (input: PostAccountsAccountPeoplePersonInput) {
    const response: PostAccountsAccountPeoplePersonOutput =
      yield* client.invoke(PostAccountsAccountPeoplePersonOperation, input);
    return response;
  });
  /**
   * The DeleteAccountsAccountPeoplePerson function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteAccountsAccountPeoplePerson = Effect.fn(
    "v1Accounts.DeleteAccountsAccountPeoplePerson",
  )(function* (input: DeleteAccountsAccountPeoplePersonInput) {
    const response: DeleteAccountsAccountPeoplePersonOutput =
      yield* client.invoke(DeleteAccountsAccountPeoplePersonOperation, input);
    return response;
  });
  /**
   * The GetAccountsAccountPersons function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountPersons = Effect.fn(
    "v1Accounts.GetAccountsAccountPersons",
  )(function* (input: GetAccountsAccountPersonsInput) {
    const response: GetAccountsAccountPersonsOutput = yield* client.invoke(
      GetAccountsAccountPersonsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostAccountsAccountPersons function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountPersons = Effect.fn(
    "v1Accounts.PostAccountsAccountPersons",
  )(function* (input: PostAccountsAccountPersonsInput) {
    const response: PostAccountsAccountPersonsOutput = yield* client.invoke(
      PostAccountsAccountPersonsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetAccountsAccountPersonsPerson function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAccountsAccountPersonsPerson = Effect.fn(
    "v1Accounts.GetAccountsAccountPersonsPerson",
  )(function* (input: GetAccountsAccountPersonsPersonInput) {
    const response: GetAccountsAccountPersonsPersonOutput =
      yield* client.invoke(GetAccountsAccountPersonsPersonOperation, input);
    return response;
  });
  /**
   * The PostAccountsAccountPersonsPerson function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountPersonsPerson = Effect.fn(
    "v1Accounts.PostAccountsAccountPersonsPerson",
  )(function* (input: PostAccountsAccountPersonsPersonInput) {
    const response: PostAccountsAccountPersonsPersonOutput =
      yield* client.invoke(PostAccountsAccountPersonsPersonOperation, input);
    return response;
  });
  /**
   * The DeleteAccountsAccountPersonsPerson function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteAccountsAccountPersonsPerson = Effect.fn(
    "v1Accounts.DeleteAccountsAccountPersonsPerson",
  )(function* (input: DeleteAccountsAccountPersonsPersonInput) {
    const response: DeleteAccountsAccountPersonsPersonOutput =
      yield* client.invoke(DeleteAccountsAccountPersonsPersonOperation, input);
    return response;
  });
  /**
   * The PostAccountsAccountReject function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountReject = Effect.fn(
    "v1Accounts.PostAccountsAccountReject",
  )(function* (input: PostAccountsAccountRejectInput) {
    const response: PostAccountsAccountRejectOutput = yield* client.invoke(
      PostAccountsAccountRejectOperation,
      input,
    );
    return response;
  });
  /**
   * The PostAccountsAccountUnreject function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAccountsAccountUnreject = Effect.fn(
    "v1Accounts.PostAccountsAccountUnreject",
  )(function* (input: PostAccountsAccountUnrejectInput) {
    const response: PostAccountsAccountUnrejectOutput = yield* client.invoke(
      PostAccountsAccountUnrejectOperation,
      input,
    );
    return response;
  });
  return {
    GetAccounts,
    PostAccounts,
    GetAccountsAccount,
    PostAccountsAccount,
    DeleteAccountsAccount,
    PostAccountsAccountBankAccounts,
    GetAccountsAccountBankAccountsId,
    PostAccountsAccountBankAccountsId,
    DeleteAccountsAccountBankAccountsId,
    GetAccountsAccountCapabilities,
    GetAccountsAccountCapabilitiesCapability,
    PostAccountsAccountCapabilitiesCapability,
    GetAccountsAccountExternalAccounts,
    PostAccountsAccountExternalAccounts,
    GetAccountsAccountExternalAccountsId,
    PostAccountsAccountExternalAccountsId,
    DeleteAccountsAccountExternalAccountsId,
    PostAccountsAccountLoginLinks,
    GetAccountsAccountPeople,
    PostAccountsAccountPeople,
    GetAccountsAccountPeoplePerson,
    PostAccountsAccountPeoplePerson,
    DeleteAccountsAccountPeoplePerson,
    GetAccountsAccountPersons,
    PostAccountsAccountPersons,
    GetAccountsAccountPersonsPerson,
    PostAccountsAccountPersonsPerson,
    DeleteAccountsAccountPersonsPerson,
    PostAccountsAccountReject,
    PostAccountsAccountUnreject,
  };
});
