// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripetax_id } from "./catalog.js";
import {
  Stripeaddress,
  Stripefile,
  Stripelegal_entity_company,
  Stripeperson,
} from "./common.js";
import {
  Stripebank_account,
  Stripecard,
  Stripecard_issuing_account_terms_of_service,
} from "./paymentSources.js";
import { Stripetransfer_schedule } from "./transfers.js";

export type Stripeaccount = {
  readonly business_profile?: Stripeaccount_business_profile | null;
  readonly business_type?:
    | "company"
    | "government_entity"
    | "individual"
    | "non_profit"
    | null;
  readonly capabilities?: Stripeaccount_capabilities;
  readonly charges_enabled?: boolean;
  readonly company?: Stripelegal_entity_company;
  readonly controller?: Stripeaccount_unification_account_controller;
  readonly country?: string;
  readonly created?: number;
  readonly default_currency?: string;
  readonly details_submitted?: boolean;
  readonly email?: string | null;
  readonly external_accounts?: {
    readonly data: ReadonlyArray<Stripebank_account | Stripecard>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly future_requirements?: Stripeaccount_future_requirements;
  readonly groups?: Stripeaccount_group_membership | null;
  readonly id: string;
  readonly individual?: Stripeperson;
  readonly metadata?: { readonly [x: string]: string };
  readonly object: "account";
  readonly payouts_enabled?: boolean;
  readonly requirements?: Stripeaccount_requirements;
  readonly settings?: Stripeaccount_settings | null;
  readonly tos_acceptance?: Stripeaccount_tos_acceptance;
  readonly type?: "custom" | "express" | "none" | "standard";
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_settings = {
  readonly bacs_debit_payments?: Stripeaccount_bacs_debit_payments_settings;
  readonly branding: Stripeaccount_branding_settings;
  readonly card_issuing?: Stripeaccount_card_issuing_settings;
  readonly card_payments: Stripeaccount_card_payments_settings;
  readonly dashboard: Stripeaccount_dashboard_settings;
  readonly invoices?: Stripeaccount_invoices_settings;
  readonly payments: Stripeaccount_payments_settings;
  readonly payouts?: Stripeaccount_payout_settings;
  readonly paypay_payments?: Stripeaccount_paypay_payments_settings;
  readonly sepa_debit_payments?: Stripeaccount_sepa_debit_payments_settings;
  readonly treasury?: Stripeaccount_treasury_settings;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_invoices_settings = {
  readonly default_account_tax_ids?: ReadonlyArray<
    string | Stripetax_id
  > | null;
  readonly hosted_payment_method_save?: "always" | "never" | "offer" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_annual_revenue = {
  readonly amount?: number | null;
  readonly currency?: string | null;
  readonly fiscal_year_end?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_monthly_estimated_revenue = {
  readonly amount: number;
  readonly currency: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_capabilities = {
  readonly acss_debit_payments?: "active" | "inactive" | "pending";
  readonly affirm_payments?: "active" | "inactive" | "pending";
  readonly afterpay_clearpay_payments?: "active" | "inactive" | "pending";
  readonly alma_payments?: "active" | "inactive" | "pending";
  readonly amazon_pay_payments?: "active" | "inactive" | "pending";
  readonly app_distribution?: "active" | "inactive" | "pending";
  readonly au_becs_debit_payments?: "active" | "inactive" | "pending";
  readonly bacs_debit_payments?: "active" | "inactive" | "pending";
  readonly bancontact_payments?: "active" | "inactive" | "pending";
  readonly bank_transfer_payments?: "active" | "inactive" | "pending";
  readonly billie_payments?: "active" | "inactive" | "pending";
  readonly bizum_payments?: "active" | "inactive" | "pending";
  readonly blik_payments?: "active" | "inactive" | "pending";
  readonly blik_recurring_payments?: "active" | "inactive" | "pending";
  readonly boleto_payments?: "active" | "inactive" | "pending";
  readonly card_issuing?: "active" | "inactive" | "pending";
  readonly card_payments?: "active" | "inactive" | "pending";
  readonly cartes_bancaires_payments?: "active" | "inactive" | "pending";
  readonly cashapp_payments?: "active" | "inactive" | "pending";
  readonly crypto_payments?: "active" | "inactive" | "pending";
  readonly eps_payments?: "active" | "inactive" | "pending";
  readonly fpx_payments?: "active" | "inactive" | "pending";
  readonly gb_bank_transfer_payments?: "active" | "inactive" | "pending";
  readonly giropay_payments?: "active" | "inactive" | "pending";
  readonly grabpay_payments?: "active" | "inactive" | "pending";
  readonly ideal_payments?: "active" | "inactive" | "pending";
  readonly india_international_payments?: "active" | "inactive" | "pending";
  readonly jcb_payments?: "active" | "inactive" | "pending";
  readonly jp_bank_transfer_payments?: "active" | "inactive" | "pending";
  readonly kakao_pay_payments?: "active" | "inactive" | "pending";
  readonly klarna_payments?: "active" | "inactive" | "pending";
  readonly konbini_payments?: "active" | "inactive" | "pending";
  readonly kr_card_payments?: "active" | "inactive" | "pending";
  readonly legacy_payments?: "active" | "inactive" | "pending";
  readonly link_payments?: "active" | "inactive" | "pending";
  readonly mb_way_payments?: "active" | "inactive" | "pending";
  readonly mobilepay_payments?: "active" | "inactive" | "pending";
  readonly multibanco_payments?: "active" | "inactive" | "pending";
  readonly mx_bank_transfer_payments?: "active" | "inactive" | "pending";
  readonly naver_pay_payments?: "active" | "inactive" | "pending";
  readonly nz_bank_account_becs_debit_payments?:
    | "active"
    | "inactive"
    | "pending";
  readonly oxxo_payments?: "active" | "inactive" | "pending";
  readonly p24_payments?: "active" | "inactive" | "pending";
  readonly pay_by_bank_payments?: "active" | "inactive" | "pending";
  readonly payco_payments?: "active" | "inactive" | "pending";
  readonly paynow_payments?: "active" | "inactive" | "pending";
  readonly paypay_payments?: "active" | "inactive" | "pending";
  readonly payto_payments?: "active" | "inactive" | "pending";
  readonly pix_payments?: "active" | "inactive" | "pending";
  readonly promptpay_payments?: "active" | "inactive" | "pending";
  readonly revolut_pay_payments?: "active" | "inactive" | "pending";
  readonly samsung_pay_payments?: "active" | "inactive" | "pending";
  readonly satispay_payments?: "active" | "inactive" | "pending";
  readonly scalapay_payments?: "active" | "inactive" | "pending";
  readonly sepa_bank_transfer_payments?: "active" | "inactive" | "pending";
  readonly sepa_debit_payments?: "active" | "inactive" | "pending";
  readonly sequra_payments?: "active" | "inactive" | "pending";
  readonly sofort_payments?: "active" | "inactive" | "pending";
  readonly sunbit_payments?: "active" | "inactive" | "pending";
  readonly swish_payments?: "active" | "inactive" | "pending";
  readonly tax_reporting_us_1099_k?: "active" | "inactive" | "pending";
  readonly tax_reporting_us_1099_misc?: "active" | "inactive" | "pending";
  readonly transfers?: "active" | "inactive" | "pending";
  readonly treasury?: "active" | "inactive" | "pending";
  readonly twint_payments?: "active" | "inactive" | "pending";
  readonly upi_payments?: "active" | "inactive" | "pending";
  readonly us_bank_account_ach_payments?: "active" | "inactive" | "pending";
  readonly us_bank_transfer_payments?: "active" | "inactive" | "pending";
  readonly wero_payments?: "active" | "inactive" | "pending";
  readonly zip_payments?: "active" | "inactive" | "pending";
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_unification_account_controller_fees = {
  readonly payer:
    | "account"
    | "application"
    | "application_custom"
    | "application_express";
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_unification_account_controller_losses = {
  readonly payments: "application" | "stripe";
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_unification_account_controller_stripe_dashboard = {
  readonly type: "express" | "full" | "none";
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_requirements_error = {
  readonly code:
    | "external_request"
    | "information_missing"
    | "invalid_address_city_state_postal_code"
    | "invalid_address_cmra_address"
    | "invalid_address_highway_contract_box"
    | "invalid_address_private_mailbox"
    | "invalid_address_registered_agent_address"
    | "invalid_business_profile_name"
    | "invalid_business_profile_name_denylisted"
    | "invalid_company_name_denylisted"
    | "invalid_dob_age_over_maximum"
    | "invalid_dob_age_under_18"
    | "invalid_dob_age_under_minimum"
    | "invalid_product_description_length"
    | "invalid_product_description_url_match"
    | "invalid_representative_country"
    | "invalid_signator"
    | "invalid_statement_descriptor_business_mismatch"
    | "invalid_statement_descriptor_denylisted"
    | "invalid_statement_descriptor_length"
    | "invalid_statement_descriptor_prefix_denylisted"
    | "invalid_statement_descriptor_prefix_mismatch"
    | "invalid_street_address"
    | "invalid_tax_id"
    | "invalid_tax_id_format"
    | "invalid_tos_acceptance"
    | "invalid_url_denylisted"
    | "invalid_url_format"
    | "invalid_url_web_presence_detected"
    | "invalid_url_website_business_information_mismatch"
    | "invalid_url_website_empty"
    | "invalid_url_website_inaccessible"
    | "invalid_url_website_inaccessible_geoblocked"
    | "invalid_url_website_inaccessible_password_protected"
    | "invalid_url_website_incomplete"
    | "invalid_url_website_incomplete_cancellation_policy"
    | "invalid_url_website_incomplete_customer_service_details"
    | "invalid_url_website_incomplete_legal_restrictions"
    | "invalid_url_website_incomplete_refund_policy"
    | "invalid_url_website_incomplete_return_policy"
    | "invalid_url_website_incomplete_terms_and_conditions"
    | "invalid_url_website_incomplete_under_construction"
    | "invalid_url_website_other"
    | "invalid_value_other"
    | "unsupported_business_type"
    | "verification_directors_mismatch"
    | "verification_document_address_mismatch"
    | "verification_document_address_missing"
    | "verification_document_corrupt"
    | "verification_document_country_not_supported"
    | "verification_document_directors_mismatch"
    | "verification_document_dob_mismatch"
    | "verification_document_duplicate_type"
    | "verification_document_expired"
    | "verification_document_failed_copy"
    | "verification_document_failed_greyscale"
    | "verification_document_failed_other"
    | "verification_document_failed_test_mode"
    | "verification_document_fraudulent"
    | "verification_document_id_number_mismatch"
    | "verification_document_id_number_missing"
    | "verification_document_incomplete"
    | "verification_document_invalid"
    | "verification_document_issue_or_expiry_date_missing"
    | "verification_document_manipulated"
    | "verification_document_missing_back"
    | "verification_document_missing_front"
    | "verification_document_name_mismatch"
    | "verification_document_name_missing"
    | "verification_document_nationality_mismatch"
    | "verification_document_not_readable"
    | "verification_document_not_signed"
    | "verification_document_not_uploaded"
    | "verification_document_photo_mismatch"
    | "verification_document_too_large"
    | "verification_document_type_not_supported"
    | "verification_extraneous_directors"
    | "verification_failed_address_match"
    | "verification_failed_authorizer_authority"
    | "verification_failed_business_iec_number"
    | "verification_failed_document_match"
    | "verification_failed_id_number_match"
    | "verification_failed_keyed_identity"
    | "verification_failed_keyed_match"
    | "verification_failed_name_match"
    | "verification_failed_other"
    | "verification_failed_representative_authority"
    | "verification_failed_residential_address"
    | "verification_failed_tax_id_match"
    | "verification_failed_tax_id_not_issued"
    | "verification_legal_entity_structure_mismatch"
    | "verification_missing_directors"
    | "verification_missing_executives"
    | "verification_missing_owners"
    | "verification_rejected_ownership_exemption_reason"
    | "verification_requires_additional_memorandum_of_associations"
    | "verification_requires_additional_proof_of_registration"
    | "verification_supportability";
  readonly reason: string;
  readonly requirement: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_requirements_alternative = {
  readonly alternative_fields_due: ReadonlyArray<string>;
  readonly original_fields_due: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_group_membership = {
  readonly payments_pricing?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_bacs_debit_payments_settings = {
  readonly display_name?: string | null;
  readonly service_user_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_branding_settings = {
  readonly icon?: string | Stripefile | null;
  readonly logo?: string | Stripefile | null;
  readonly primary_color?: string | null;
  readonly secondary_color?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_decline_charge_on = {
  readonly avs_failure: boolean;
  readonly cvc_failure: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_dashboard_settings = {
  readonly display_name?: string | null;
  readonly timezone?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_payments_settings = {
  readonly statement_descriptor?: string | null;
  readonly statement_descriptor_kana?: string | null;
  readonly statement_descriptor_kanji?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_paypay_site_accessible_settings = {
  readonly [x: string]: Schema.Json;
};
export type Stripeaccount_paypay_site_in_development_settings = {
  readonly password_provided?: boolean;
  readonly username?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_paypay_site_restricted_settings = {
  readonly payment_flow_file?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_sepa_debit_payments_settings = {
  readonly creditor_id?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_terms_of_service = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly user_agent?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_tos_acceptance = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly service_agreement?: string;
  readonly user_agent?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_business_profile = {
  readonly annual_revenue?: Stripeaccount_annual_revenue | null;
  readonly estimated_worker_count?: number | null;
  readonly mcc?: string | null;
  readonly minority_owned_business_designation?: ReadonlyArray<
    | "lgbtqi_owned_business"
    | "minority_owned_business"
    | "none_of_these_apply"
    | "prefer_not_to_answer"
    | "women_owned_business"
  > | null;
  readonly monthly_estimated_revenue?: Stripeaccount_monthly_estimated_revenue;
  readonly name?: string | null;
  readonly product_description?: string | null;
  readonly specified_commercial_transactions_act_url?: string | null;
  readonly support_address?: Stripeaddress | null;
  readonly support_email?: string | null;
  readonly support_phone?: string | null;
  readonly support_url?: string | null;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_unification_account_controller = {
  readonly fees?: Stripeaccount_unification_account_controller_fees;
  readonly is_controller?: boolean;
  readonly losses?: Stripeaccount_unification_account_controller_losses;
  readonly requirement_collection?: "application" | "stripe";
  readonly stripe_dashboard?: Stripeaccount_unification_account_controller_stripe_dashboard;
  readonly type: "account" | "application";
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_future_requirements = {
  readonly alternatives?: ReadonlyArray<Stripeaccount_requirements_alternative> | null;
  readonly current_deadline?: number | null;
  readonly currently_due?: ReadonlyArray<string> | null;
  readonly disabled_reason?:
    | "action_required.requested_capabilities"
    | "listed"
    | "other"
    | "platform_paused"
    | "rejected.fraud"
    | "rejected.incomplete_verification"
    | "rejected.listed"
    | "rejected.other"
    | "rejected.platform_fraud"
    | "rejected.platform_other"
    | "rejected.platform_terms_of_service"
    | "rejected.terms_of_service"
    | "requirements.past_due"
    | "requirements.pending_verification"
    | "under_review"
    | null;
  readonly errors?: ReadonlyArray<Stripeaccount_requirements_error> | null;
  readonly eventually_due?: ReadonlyArray<string> | null;
  readonly past_due?: ReadonlyArray<string> | null;
  readonly pending_verification?: ReadonlyArray<string> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_requirements = {
  readonly alternatives?: ReadonlyArray<Stripeaccount_requirements_alternative> | null;
  readonly current_deadline?: number | null;
  readonly currently_due?: ReadonlyArray<string> | null;
  readonly disabled_reason?:
    | "action_required.requested_capabilities"
    | "listed"
    | "other"
    | "platform_paused"
    | "rejected.fraud"
    | "rejected.incomplete_verification"
    | "rejected.listed"
    | "rejected.other"
    | "rejected.platform_fraud"
    | "rejected.platform_other"
    | "rejected.platform_terms_of_service"
    | "rejected.terms_of_service"
    | "requirements.past_due"
    | "requirements.pending_verification"
    | "under_review"
    | null;
  readonly errors?: ReadonlyArray<Stripeaccount_requirements_error> | null;
  readonly eventually_due?: ReadonlyArray<string> | null;
  readonly past_due?: ReadonlyArray<string> | null;
  readonly pending_verification?: ReadonlyArray<string> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_capability_future_requirements = {
  readonly alternatives?: ReadonlyArray<Stripeaccount_requirements_alternative> | null;
  readonly current_deadline?: number | null;
  readonly currently_due: ReadonlyArray<string>;
  readonly disabled_reason?:
    | "other"
    | "paused.inactivity"
    | "pending.onboarding"
    | "pending.review"
    | "platform_disabled"
    | "platform_paused"
    | "rejected.inactivity"
    | "rejected.other"
    | "rejected.unsupported_business"
    | "requirements.fields_needed"
    | null;
  readonly errors: ReadonlyArray<Stripeaccount_requirements_error>;
  readonly eventually_due: ReadonlyArray<string>;
  readonly past_due: ReadonlyArray<string>;
  readonly pending_verification: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_capability_requirements = {
  readonly alternatives?: ReadonlyArray<Stripeaccount_requirements_alternative> | null;
  readonly current_deadline?: number | null;
  readonly currently_due: ReadonlyArray<string>;
  readonly disabled_reason?:
    | "other"
    | "paused.inactivity"
    | "pending.onboarding"
    | "pending.review"
    | "platform_disabled"
    | "platform_paused"
    | "rejected.inactivity"
    | "rejected.other"
    | "rejected.unsupported_business"
    | "requirements.fields_needed"
    | null;
  readonly errors: ReadonlyArray<Stripeaccount_requirements_error>;
  readonly eventually_due: ReadonlyArray<string>;
  readonly past_due: ReadonlyArray<string>;
  readonly pending_verification: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_card_issuing_settings = {
  readonly tos_acceptance?: Stripecard_issuing_account_terms_of_service;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_card_payments_settings = {
  readonly decline_on?: Stripeaccount_decline_charge_on;
  readonly statement_descriptor_prefix?: string | null;
  readonly statement_descriptor_prefix_kana?: string | null;
  readonly statement_descriptor_prefix_kanji?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_payout_settings = {
  readonly debit_negative_balances: boolean;
  readonly schedule: Stripetransfer_schedule;
  readonly statement_descriptor?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_paypay_site_settings = {
  readonly accessible?: Stripeaccount_paypay_site_accessible_settings;
  readonly in_development?: Stripeaccount_paypay_site_in_development_settings;
  readonly restricted?: Stripeaccount_paypay_site_restricted_settings;
  readonly type?: "accessible" | "in_development" | "restricted";
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_treasury_settings = {
  readonly tos_acceptance?: Stripeaccount_terms_of_service;
} & { readonly [x: string]: Schema.Json };
export type Stripeaccount_paypay_payments_settings = {
  readonly additional_files?: ReadonlyArray<string>;
  readonly goods_type?: "digital_content" | "other";
  readonly site?: Stripeaccount_paypay_site_settings;
} & { readonly [x: string]: Schema.Json };

export const Stripeaccount = Schema.suspend(
  (): Schema.Codec<Stripeaccount> =>
    Schema.StructWithRest(
      Schema.Struct({
        business_profile: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaccount_business_profile]).annotate({
              description: "Business information about the account.",
            }),
            Schema.Null,
          ]),
        ),
        business_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "company",
              "government_entity",
              "individual",
              "non_profit",
            ]).annotate({ description: "The business type." }),
            Schema.Null,
          ]),
        ),
        capabilities: Schema.optionalKey(Stripeaccount_capabilities),
        charges_enabled: Schema.optionalKey(
          Schema.Boolean.annotate({
            description: "Whether the account can process charges.",
          }),
        ),
        company: Schema.optionalKey(Stripelegal_entity_company),
        controller: Schema.optionalKey(
          Stripeaccount_unification_account_controller,
        ),
        country: Schema.optionalKey(
          Schema.String.annotate({
            description: "The account's country.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        created: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "Time at which the account was connected. Measured in seconds since the Unix epoch.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        default_currency: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Three-letter ISO currency code representing the default currency for the account. This must be a currency that [Stripe supports in the account's country](https://stripe.com/docs/payouts).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        details_submitted: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether account details have been submitted. Accounts with Stripe Dashboard access, which includes Standard accounts, cannot receive payouts before this is true. Accounts where this is false should be directed to [an onboarding flow](/connect/onboarding) to finish submitting account details.",
          }),
        ),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An email address associated with the account. It's not used for authentication and Stripe doesn't market to this field without explicit approval from the platform.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        external_accounts: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(
                Schema.Union([
                  Schema.suspend(
                    (): Schema.Codec<Stripebank_account> => Stripebank_account,
                  ),
                  Schema.suspend((): Schema.Codec<Stripecard> => Stripecard),
                ]).annotate({ title: "Polymorphic" }),
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
          ).annotate({
            title: "ExternalAccountList",
            description:
              "External accounts (bank accounts and debit cards) currently attached to this account. External accounts are only returned for requests where `controller[is_controller]` is true.",
          }),
        ),
        future_requirements: Schema.optionalKey(
          Stripeaccount_future_requirements,
        ),
        groups: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaccount_group_membership]).annotate({
              description: "The groups associated with the account.",
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
        individual: Schema.optionalKey(Stripeperson),
        metadata: Schema.optionalKey(
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
        ),
        object: Schema.Literal("account").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payouts_enabled: Schema.optionalKey(
          Schema.Boolean.annotate({
            description: "Whether the funds in this account can be paid out.",
          }),
        ),
        requirements: Schema.optionalKey(Stripeaccount_requirements),
        settings: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripeaccount_settings> =>
                  Stripeaccount_settings,
              ),
            ]).annotate({
              description:
                "Options for customizing how the account functions within Stripe.",
            }),
            Schema.Null,
          ]),
        ),
        tos_acceptance: Schema.optionalKey(Stripeaccount_tos_acceptance),
        type: Schema.optionalKey(
          Schema.Literals(["custom", "express", "none", "standard"]).annotate({
            description:
              "The Stripe account type. Can be `standard`, `express`, `custom`, or `none`.",
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
      title: "Account",
      description:
        "For new integrations, we recommend using the [Accounts v2 API](/api/v2/core/accounts), in place of /v1/accounts and /v1/customers to represent a user.\n\nThis is an object representing a Stripe account. You can retrieve it to see\nproperties on the account like its current requirements or if the account is\nenabled to make live charges or receive payouts.\n\nFor accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)\nis `application`, which includes Custom accounts, the properties below are always\nreturned.\n\nFor accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)\nis `stripe`, which includes Standard and Express accounts, some properties are only returned\nuntil you create an [Account Link](/api/account_links) or [Account Session](/api/account_sessions)\nto start Connect Onboarding. Learn about the [differences between accounts](/connect/accounts).",
      identifier: "Stripeaccount",
    }),
);
export const Stripeaccount_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        bacs_debit_payments: Schema.optionalKey(
          Stripeaccount_bacs_debit_payments_settings,
        ),
        branding: Stripeaccount_branding_settings,
        card_issuing: Schema.optionalKey(Stripeaccount_card_issuing_settings),
        card_payments: Stripeaccount_card_payments_settings,
        dashboard: Stripeaccount_dashboard_settings,
        invoices: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripeaccount_invoices_settings> =>
              Stripeaccount_invoices_settings,
          ),
        ),
        payments: Stripeaccount_payments_settings,
        payouts: Schema.optionalKey(Stripeaccount_payout_settings),
        paypay_payments: Schema.optionalKey(
          Stripeaccount_paypay_payments_settings,
        ),
        sepa_debit_payments: Schema.optionalKey(
          Stripeaccount_sepa_debit_payments_settings,
        ),
        treasury: Schema.optionalKey(Stripeaccount_treasury_settings),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AccountSettings",
      description: "",
      identifier: "Stripeaccount_settings",
    }),
);
export const Stripeaccount_invoices_settings = Schema.StructWithRest(
  Schema.Struct({
    default_account_tax_ids: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripetax_id> => Stripetax_id),
          ]),
        ).annotate({
          description:
            "The list of default Account Tax IDs to automatically include on invoices. Account Tax IDs get added when an invoice is finalized.",
        }),
        Schema.Null,
      ]),
    ),
    hosted_payment_method_save: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["always", "never", "offer"]).annotate({
          description:
            "Whether to save the payment method after a payment is completed for a one-time invoice or a subscription invoice when the customer already has a default payment method on the hosted invoice page.",
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
  title: "AccountInvoicesSettings",
  description: "",
  identifier: "Stripeaccount_invoices_settings",
});
export const Stripeaccount_annual_revenue = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "A non-negative integer representing the amount in the [smallest currency unit](/currencies#zero-decimal).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    currency: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        Schema.Null,
      ]),
    ),
    fiscal_year_end: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The close-out date of the preceding fiscal year in ISO 8601 format. E.g. 2023-12-31 for the 31st of December, 2023.",
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
  title: "AccountAnnualRevenue",
  description: "",
  identifier: "Stripeaccount_annual_revenue",
});
export const Stripeaccount_monthly_estimated_revenue = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description:
        "A non-negative integer representing how much to charge in the [smallest currency unit](/currencies#zero-decimal).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "AccountMonthlyEstimatedRevenue",
  description: "",
  identifier: "Stripeaccount_monthly_estimated_revenue",
});
export const Stripeaccount_capabilities = Schema.StructWithRest(
  Schema.Struct({
    acss_debit_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Canadian pre-authorized debits payments capability of the account, or whether the account can directly process Canadian pre-authorized debits charges.",
      }),
    ),
    affirm_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Affirm capability of the account, or whether the account can directly process Affirm charges.",
      }),
    ),
    afterpay_clearpay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Afterpay Clearpay capability of the account, or whether the account can directly process Afterpay Clearpay charges.",
      }),
    ),
    alma_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Alma capability of the account, or whether the account can directly process Alma payments.",
      }),
    ),
    amazon_pay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the AmazonPay capability of the account, or whether the account can directly process AmazonPay payments.",
      }),
    ),
    app_distribution: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the `app_distribution` capability of the account, or whether the platform can distribute apps to other accounts.",
      }),
    ),
    au_becs_debit_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the BECS Direct Debit (AU) payments capability of the account, or whether the account can directly process BECS Direct Debit (AU) charges.",
      }),
    ),
    bacs_debit_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Bacs Direct Debits payments capability of the account, or whether the account can directly process Bacs Direct Debits charges.",
      }),
    ),
    bancontact_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Bancontact payments capability of the account, or whether the account can directly process Bancontact charges.",
      }),
    ),
    bank_transfer_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the customer_balance payments capability of the account, or whether the account can directly process customer_balance charges.",
      }),
    ),
    billie_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Billie capability of the account, or whether the account can directly process Billie payments.",
      }),
    ),
    bizum_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Bizum capability of the account, or whether the account can directly process Bizum payments.",
      }),
    ),
    blik_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the blik payments capability of the account, or whether the account can directly process blik charges.",
      }),
    ),
    blik_recurring_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the BLIK recurring payments capability of the account, or whether the account can accept recurring and subscription BLIK payments.",
      }),
    ),
    boleto_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the boleto payments capability of the account, or whether the account can directly process boleto charges.",
      }),
    ),
    card_issuing: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the card issuing capability of the account, or whether you can use Issuing to distribute funds on cards",
      }),
    ),
    card_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the card payments capability of the account, or whether the account can directly process credit and debit card charges.",
      }),
    ),
    cartes_bancaires_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Cartes Bancaires payments capability of the account, or whether the account can directly process Cartes Bancaires card charges in EUR currency.",
      }),
    ),
    cashapp_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Cash App Pay capability of the account, or whether the account can directly process Cash App Pay payments.",
      }),
    ),
    crypto_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Crypto capability of the account, or whether the account can directly process Crypto payments.",
      }),
    ),
    eps_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the EPS payments capability of the account, or whether the account can directly process EPS charges.",
      }),
    ),
    fpx_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the FPX payments capability of the account, or whether the account can directly process FPX charges.",
      }),
    ),
    gb_bank_transfer_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the GB customer_balance payments (GBP currency) capability of the account, or whether the account can directly process GB customer_balance charges.",
      }),
    ),
    giropay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the giropay payments capability of the account, or whether the account can directly process giropay charges.",
      }),
    ),
    grabpay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the GrabPay payments capability of the account, or whether the account can directly process GrabPay charges.",
      }),
    ),
    ideal_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the iDEAL payments capability of the account, or whether the account can directly process iDEAL charges.",
      }),
    ),
    india_international_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the india_international_payments capability of the account, or whether the account can process international charges (non INR) in India.",
      }),
    ),
    jcb_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the JCB payments capability of the account, or whether the account (Japan only) can directly process JCB credit card charges in JPY currency.",
      }),
    ),
    jp_bank_transfer_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Japanese customer_balance payments (JPY currency) capability of the account, or whether the account can directly process Japanese customer_balance charges.",
      }),
    ),
    kakao_pay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the KakaoPay capability of the account, or whether the account can directly process KakaoPay payments.",
      }),
    ),
    klarna_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Klarna payments capability of the account, or whether the account can directly process Klarna charges.",
      }),
    ),
    konbini_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the konbini payments capability of the account, or whether the account can directly process konbini charges.",
      }),
    ),
    kr_card_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the KrCard capability of the account, or whether the account can directly process KrCard payments.",
      }),
    ),
    legacy_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the legacy payments capability of the account.",
      }),
    ),
    link_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the link_payments capability of the account, or whether the account can directly process Link charges.",
      }),
    ),
    mb_way_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the MB WAY payments capability of the account, or whether the account can directly process MB WAY charges.",
      }),
    ),
    mobilepay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the MobilePay capability of the account, or whether the account can directly process MobilePay charges.",
      }),
    ),
    multibanco_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Multibanco payments capability of the account, or whether the account can directly process Multibanco charges.",
      }),
    ),
    mx_bank_transfer_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Mexican customer_balance payments (MXN currency) capability of the account, or whether the account can directly process Mexican customer_balance charges.",
      }),
    ),
    naver_pay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the NaverPay capability of the account, or whether the account can directly process NaverPay payments.",
      }),
    ),
    nz_bank_account_becs_debit_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the New Zealand BECS Direct Debit payments capability of the account, or whether the account can directly process New Zealand BECS Direct Debit charges.",
      }),
    ),
    oxxo_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the OXXO payments capability of the account, or whether the account can directly process OXXO charges.",
      }),
    ),
    p24_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the P24 payments capability of the account, or whether the account can directly process P24 charges.",
      }),
    ),
    pay_by_bank_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the pay_by_bank payments capability of the account, or whether the account can directly process pay_by_bank charges.",
      }),
    ),
    payco_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Payco capability of the account, or whether the account can directly process Payco payments.",
      }),
    ),
    paynow_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the paynow payments capability of the account, or whether the account can directly process paynow charges.",
      }),
    ),
    paypay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Paypay capability of the account, or whether the account can directly process Paypay payments.",
      }),
    ),
    payto_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the PayTo capability of the account, or whether the account can directly process PayTo charges.",
      }),
    ),
    pix_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the pix payments capability of the account, or whether the account can directly process pix charges.",
      }),
    ),
    promptpay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the promptpay payments capability of the account, or whether the account can directly process promptpay charges.",
      }),
    ),
    revolut_pay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the RevolutPay capability of the account, or whether the account can directly process RevolutPay payments.",
      }),
    ),
    samsung_pay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the SamsungPay capability of the account, or whether the account can directly process SamsungPay payments.",
      }),
    ),
    satispay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Satispay capability of the account, or whether the account can directly process Satispay payments.",
      }),
    ),
    scalapay_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Scalapay capability of the account, or whether the account can directly process Scalapay payments.",
      }),
    ),
    sepa_bank_transfer_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the SEPA customer_balance payments (EUR currency) capability of the account, or whether the account can directly process SEPA customer_balance charges.",
      }),
    ),
    sepa_debit_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the SEPA Direct Debits payments capability of the account, or whether the account can directly process SEPA Direct Debits charges.",
      }),
    ),
    sequra_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the SeQura capability of the account, or whether the account can directly process SeQura payments.",
      }),
    ),
    sofort_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Sofort payments capability of the account, or whether the account can directly process Sofort charges.",
      }),
    ),
    sunbit_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Sunbit capability of the account, or whether the account can directly process Sunbit payments.",
      }),
    ),
    swish_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Swish capability of the account, or whether the account can directly process Swish payments.",
      }),
    ),
    tax_reporting_us_1099_k: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the tax reporting 1099-K (US) capability of the account.",
      }),
    ),
    tax_reporting_us_1099_misc: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the tax reporting 1099-MISC (US) capability of the account.",
      }),
    ),
    transfers: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the transfers capability of the account, or whether your platform can transfer funds to the account.",
      }),
    ),
    treasury: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the banking capability, or whether the account can have bank accounts.",
      }),
    ),
    twint_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the TWINT capability of the account, or whether the account can directly process TWINT charges.",
      }),
    ),
    upi_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the upi payments capability of the account, or whether the account can directly process upi charges.",
      }),
    ),
    us_bank_account_ach_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the US bank account ACH payments capability of the account, or whether the account can directly process US bank account charges.",
      }),
    ),
    us_bank_transfer_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the US customer_balance payments (USD currency) capability of the account, or whether the account can directly process US customer_balance charges.",
      }),
    ),
    wero_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Wero capability of the account, or whether the account can directly process Wero payments.",
      }),
    ),
    zip_payments: Schema.optionalKey(
      Schema.Literals(["active", "inactive", "pending"]).annotate({
        description:
          "The status of the Zip capability of the account, or whether the account can directly process Zip charges.",
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
  title: "AccountCapabilities",
  description: "",
  identifier: "Stripeaccount_capabilities",
});
export const Stripeaccount_unification_account_controller_fees =
  Schema.StructWithRest(
    Schema.Struct({
      payer: Schema.Literals([
        "account",
        "application",
        "application_custom",
        "application_express",
      ]).annotate({
        description:
          "A value indicating the responsible payer of a bundle of Stripe fees for pricing-control eligible products on this account. Learn more about [fee behavior on connected accounts](https://docs.stripe.com/connect/direct-charges-fee-payer-behavior).",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "AccountUnificationAccountControllerFees",
    description: "",
    identifier: "Stripeaccount_unification_account_controller_fees",
  });
export const Stripeaccount_unification_account_controller_losses =
  Schema.StructWithRest(
    Schema.Struct({
      payments: Schema.Literals(["application", "stripe"]).annotate({
        description:
          "A value indicating who is liable when this account can't pay back negative balances from payments.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "AccountUnificationAccountControllerLosses",
    description: "",
    identifier: "Stripeaccount_unification_account_controller_losses",
  });
export const Stripeaccount_unification_account_controller_stripe_dashboard =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals(["express", "full", "none"]).annotate({
        description:
          "A value indicating the Stripe dashboard this account has access to independent of the Connect application.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "AccountUnificationAccountControllerStripeDashboard",
    description: "",
    identifier: "Stripeaccount_unification_account_controller_stripe_dashboard",
  });
export const Stripeaccount_requirements_error = Schema.StructWithRest(
  Schema.Struct({
    code: Schema.Literals([
      "external_request",
      "information_missing",
      "invalid_address_city_state_postal_code",
      "invalid_address_cmra_address",
      "invalid_address_highway_contract_box",
      "invalid_address_private_mailbox",
      "invalid_address_registered_agent_address",
      "invalid_business_profile_name",
      "invalid_business_profile_name_denylisted",
      "invalid_company_name_denylisted",
      "invalid_dob_age_over_maximum",
      "invalid_dob_age_under_18",
      "invalid_dob_age_under_minimum",
      "invalid_product_description_length",
      "invalid_product_description_url_match",
      "invalid_representative_country",
      "invalid_signator",
      "invalid_statement_descriptor_business_mismatch",
      "invalid_statement_descriptor_denylisted",
      "invalid_statement_descriptor_length",
      "invalid_statement_descriptor_prefix_denylisted",
      "invalid_statement_descriptor_prefix_mismatch",
      "invalid_street_address",
      "invalid_tax_id",
      "invalid_tax_id_format",
      "invalid_tos_acceptance",
      "invalid_url_denylisted",
      "invalid_url_format",
      "invalid_url_web_presence_detected",
      "invalid_url_website_business_information_mismatch",
      "invalid_url_website_empty",
      "invalid_url_website_inaccessible",
      "invalid_url_website_inaccessible_geoblocked",
      "invalid_url_website_inaccessible_password_protected",
      "invalid_url_website_incomplete",
      "invalid_url_website_incomplete_cancellation_policy",
      "invalid_url_website_incomplete_customer_service_details",
      "invalid_url_website_incomplete_legal_restrictions",
      "invalid_url_website_incomplete_refund_policy",
      "invalid_url_website_incomplete_return_policy",
      "invalid_url_website_incomplete_terms_and_conditions",
      "invalid_url_website_incomplete_under_construction",
      "invalid_url_website_other",
      "invalid_value_other",
      "unsupported_business_type",
      "verification_directors_mismatch",
      "verification_document_address_mismatch",
      "verification_document_address_missing",
      "verification_document_corrupt",
      "verification_document_country_not_supported",
      "verification_document_directors_mismatch",
      "verification_document_dob_mismatch",
      "verification_document_duplicate_type",
      "verification_document_expired",
      "verification_document_failed_copy",
      "verification_document_failed_greyscale",
      "verification_document_failed_other",
      "verification_document_failed_test_mode",
      "verification_document_fraudulent",
      "verification_document_id_number_mismatch",
      "verification_document_id_number_missing",
      "verification_document_incomplete",
      "verification_document_invalid",
      "verification_document_issue_or_expiry_date_missing",
      "verification_document_manipulated",
      "verification_document_missing_back",
      "verification_document_missing_front",
      "verification_document_name_mismatch",
      "verification_document_name_missing",
      "verification_document_nationality_mismatch",
      "verification_document_not_readable",
      "verification_document_not_signed",
      "verification_document_not_uploaded",
      "verification_document_photo_mismatch",
      "verification_document_too_large",
      "verification_document_type_not_supported",
      "verification_extraneous_directors",
      "verification_failed_address_match",
      "verification_failed_authorizer_authority",
      "verification_failed_business_iec_number",
      "verification_failed_document_match",
      "verification_failed_id_number_match",
      "verification_failed_keyed_identity",
      "verification_failed_keyed_match",
      "verification_failed_name_match",
      "verification_failed_other",
      "verification_failed_representative_authority",
      "verification_failed_residential_address",
      "verification_failed_tax_id_match",
      "verification_failed_tax_id_not_issued",
      "verification_legal_entity_structure_mismatch",
      "verification_missing_directors",
      "verification_missing_executives",
      "verification_missing_owners",
      "verification_rejected_ownership_exemption_reason",
      "verification_requires_additional_memorandum_of_associations",
      "verification_requires_additional_proof_of_registration",
      "verification_supportability",
    ]).annotate({ description: "The code for the type of error." }),
    reason: Schema.String.annotate({
      description:
        "An informative message that indicates the error type and provides additional details about the error.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    requirement: Schema.String.annotate({
      description:
        "The specific user onboarding requirement field (in the requirements hash) that needs to be resolved.",
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
  title: "AccountRequirementsError",
  description: "",
  identifier: "Stripeaccount_requirements_error",
});
export const Stripeaccount_requirements_alternative = Schema.StructWithRest(
  Schema.Struct({
    alternative_fields_due: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "Fields that can be provided to resolve all fields in `original_fields_due`.",
    }),
    original_fields_due: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description:
        "Fields that are due and can be resolved by providing all fields in `alternative_fields_due`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "AccountRequirementsAlternative",
  description: "",
  identifier: "Stripeaccount_requirements_alternative",
});
export const Stripeaccount_group_membership = Schema.StructWithRest(
  Schema.Struct({
    payments_pricing: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The group the account is in to determine their payments pricing, and null if the account is on customized pricing. [See the Platform pricing tool documentation](https://docs.stripe.com/connect/platform-pricing-tools) for details.",
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
  title: "AccountGroupMembership",
  description: "",
  identifier: "Stripeaccount_group_membership",
});
export const Stripeaccount_bacs_debit_payments_settings = Schema.StructWithRest(
  Schema.Struct({
    display_name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Bacs Direct Debit display name for this account. For payments made with Bacs Direct Debit, this name appears on the mandate as the statement descriptor. Mobile banking apps display it as the name of the business. To use custom branding, set the Bacs Direct Debit Display Name during or right after creation. Custom branding incurs an additional monthly fee for the platform. The fee appears 5 business days after requesting Bacs. If you don't set the display name before requesting Bacs capability, it's automatically set as \"Stripe\" and the account is onboarded to Stripe branding, which is free.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    service_user_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Bacs Direct Debit Service user number for this account. For payments made with Bacs Direct Debit, this number is a unique identifier of the account with our banking partners.",
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
  title: "AccountBacsDebitPaymentsSettings",
  description: "",
  identifier: "Stripeaccount_bacs_debit_payments_settings",
});
export const Stripeaccount_branding_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_branding_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        icon: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) An icon for the account. Must be square and at least 128px x 128px.",
            }),
            Schema.Null,
          ]),
        ),
        logo: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A logo for the account that will be used in Checkout instead of the icon and without the account's name next to it if provided. Must be at least 128px x 128px.",
            }),
            Schema.Null,
          ]),
        ),
        primary_color: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A CSS hex color value representing the primary branding color for this account",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        secondary_color: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A CSS hex color value representing the secondary branding color for this account",
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
      title: "AccountBrandingSettings",
      description: "",
      identifier: "Stripeaccount_branding_settings",
    }),
);
export const Stripeaccount_decline_charge_on = Schema.StructWithRest(
  Schema.Struct({
    avs_failure: Schema.Boolean.annotate({
      description:
        "Whether Stripe automatically declines charges with an incorrect ZIP or postal code. This setting only applies when a ZIP or postal code is provided and they fail bank verification.",
    }),
    cvc_failure: Schema.Boolean.annotate({
      description:
        "Whether Stripe automatically declines charges with an incorrect CVC. This setting only applies when a CVC is provided and it fails bank verification.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "AccountDeclineChargeOn",
  description: "",
  identifier: "Stripeaccount_decline_charge_on",
});
export const Stripeaccount_dashboard_settings = Schema.StructWithRest(
  Schema.Struct({
    display_name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The display name for this account. This is used on the Stripe Dashboard to differentiate between accounts.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    timezone: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The timezone used in the Stripe Dashboard for this account. A list of possible time zone values is maintained at the [IANA Time Zone Database](http://www.iana.org/time-zones).",
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
  title: "AccountDashboardSettings",
  description: "",
  identifier: "Stripeaccount_dashboard_settings",
});
export const Stripeaccount_payments_settings = Schema.StructWithRest(
  Schema.Struct({
    statement_descriptor: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The default text that appears on credit card statements when a charge is made. This field prefixes any dynamic `statement_descriptor` specified on the charge.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    statement_descriptor_kana: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Kana variation of `statement_descriptor` used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    statement_descriptor_kanji: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The Kanji variation of `statement_descriptor` used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).",
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
  title: "AccountPaymentsSettings",
  description: "",
  identifier: "Stripeaccount_payments_settings",
});
export const Stripeaccount_paypay_site_accessible_settings = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "AccountPaypaySiteAccessibleSettings",
  description: "",
  identifier: "Stripeaccount_paypay_site_accessible_settings",
});
export const Stripeaccount_paypay_site_in_development_settings =
  Schema.StructWithRest(
    Schema.Struct({
      password_provided: Schema.optionalKey(
        Schema.Boolean.annotate({
          description:
            "Field to indicate that the website password has been provided.",
        }),
      ),
      username: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The username needed to access your business's website.",
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
    title: "AccountPaypaySiteInDevelopmentSettings",
    description: "",
    identifier: "Stripeaccount_paypay_site_in_development_settings",
  });
export const Stripeaccount_paypay_site_restricted_settings =
  Schema.StructWithRest(
    Schema.Struct({
      payment_flow_file: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "File explaining the payment flow for your business.",
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
    title: "AccountPaypaySiteRestrictedSettings",
    description: "",
    identifier: "Stripeaccount_paypay_site_restricted_settings",
  });
export const Stripeaccount_sepa_debit_payments_settings = Schema.StructWithRest(
  Schema.Struct({
    creditor_id: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "SEPA creditor identifier that identifies the company making the payment.",
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
  title: "AccountSepaDebitPaymentsSettings",
  description: "",
  identifier: "Stripeaccount_sepa_debit_payments_settings",
});
export const Stripeaccount_terms_of_service = Schema.StructWithRest(
  Schema.Struct({
    date: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The Unix timestamp marking when the account representative accepted the service agreement.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    ip: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The IP address from which the account representative accepted the service agreement.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    user_agent: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The user agent of the browser from which the account representative accepted the service agreement.",
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
  title: "AccountTermsOfService",
  description: "",
  identifier: "Stripeaccount_terms_of_service",
});
export const Stripeaccount_tos_acceptance = Schema.StructWithRest(
  Schema.Struct({
    date: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The Unix timestamp marking when the account representative accepted their service agreement",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    ip: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The IP address from which the account representative accepted their service agreement",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    service_agreement: Schema.optionalKey(
      Schema.String.annotate({
        description: "The user's service agreement type",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    user_agent: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The user agent of the browser from which the account representative accepted their service agreement",
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
  title: "AccountTOSAcceptance",
  description: "",
  identifier: "Stripeaccount_tos_acceptance",
});
export const Stripeaccount_business_profile = Schema.suspend(
  (): Schema.Codec<Stripeaccount_business_profile> =>
    Schema.StructWithRest(
      Schema.Struct({
        annual_revenue: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaccount_annual_revenue]).annotate({
              description:
                "The applicant's gross annual revenue for its preceding fiscal year.",
            }),
            Schema.Null,
          ]),
        ),
        estimated_worker_count: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "An estimated upper bound of employees, contractors, vendors, etc. currently working for the business.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        mcc: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "[The merchant category code for the account](/connect/setting-mcc). MCCs are used to classify businesses based on the goods or services they provide.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        minority_owned_business_designation: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "lgbtqi_owned_business",
                "minority_owned_business",
                "none_of_these_apply",
                "prefer_not_to_answer",
                "women_owned_business",
              ]),
            ).annotate({
              description:
                "Whether the business is a minority-owned, women-owned, and/or LGBTQI+ -owned business.",
            }),
            Schema.Null,
          ]),
        ),
        monthly_estimated_revenue: Schema.optionalKey(
          Stripeaccount_monthly_estimated_revenue,
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The customer-facing business name.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        product_description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Internal-only description of the product sold or service provided by the business. It's used by Stripe for risk and underwriting purposes.",
            }).check(
              Schema.isMaxCodePoints(40000).annotate({
                expected: "a string with at most 40000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        specified_commercial_transactions_act_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A link to the business's publicly available terms related to the Specified Commercial Transaction Act. Only used for accounts in Japan.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        support_address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description:
                "A publicly available mailing address for sending support issues to.",
            }),
            Schema.Null,
          ]),
        ),
        support_email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A publicly available email address for sending support issues to.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        support_phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A publicly available phone number to call with support issues.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        support_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A publicly available website for handling support issues.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The business's publicly available website.",
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
      title: "AccountBusinessProfile",
      description: "",
      identifier: "Stripeaccount_business_profile",
    }),
);
export const Stripeaccount_unification_account_controller = Schema.suspend(
  (): Schema.Codec<Stripeaccount_unification_account_controller> =>
    Schema.StructWithRest(
      Schema.Struct({
        fees: Schema.optionalKey(
          Stripeaccount_unification_account_controller_fees,
        ),
        is_controller: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "`true` if the Connect application retrieving the resource controls the account and can therefore exercise [platform controls](https://docs.stripe.com/connect/platform-controls-for-standard-accounts). Otherwise, this field is null.",
          }),
        ),
        losses: Schema.optionalKey(
          Stripeaccount_unification_account_controller_losses,
        ),
        requirement_collection: Schema.optionalKey(
          Schema.Literals(["application", "stripe"]).annotate({
            description:
              "A value indicating responsibility for collecting requirements on this account. Only returned when the Connect application retrieving the resource controls the account.",
          }),
        ),
        stripe_dashboard: Schema.optionalKey(
          Stripeaccount_unification_account_controller_stripe_dashboard,
        ),
        type: Schema.Literals(["account", "application"]).annotate({
          description:
            "The controller type. Can be `application`, if a Connect application controls the account, or `account`, if the account controls itself.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AccountUnificationAccountController",
      description: "",
      identifier: "Stripeaccount_unification_account_controller",
    }),
);
export const Stripeaccount_future_requirements = Schema.suspend(
  (): Schema.Codec<Stripeaccount_future_requirements> =>
    Schema.StructWithRest(
      Schema.Struct({
        alternatives: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_alternative).annotate({
              description:
                "Fields that are due and can be resolved by providing the corresponding alternative fields instead. Many alternatives can list the same `original_fields_due`, and any of these alternatives can serve as a pathway for attempting to resolve the fields again. Re-providing `original_fields_due` also serves as a pathway for attempting to resolve the fields again.",
            }),
            Schema.Null,
          ]),
        ),
        current_deadline: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date on which `future_requirements` becomes the main `requirements` hash and `future_requirements` becomes empty. After the transition, `currently_due` requirements may immediately become `past_due`, but the account may also be given a grace period depending on its enablement state prior to transitioning.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        currently_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that need to be resolved to keep the account enabled. If not resolved by `future_requirements[current_deadline]`, these fields will transition to the main `requirements` hash.",
            }),
            Schema.Null,
          ]),
        ),
        disabled_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "action_required.requested_capabilities",
              "listed",
              "other",
              "platform_paused",
              "rejected.fraud",
              "rejected.incomplete_verification",
              "rejected.listed",
              "rejected.other",
              "rejected.platform_fraud",
              "rejected.platform_other",
              "rejected.platform_terms_of_service",
              "rejected.terms_of_service",
              "requirements.past_due",
              "requirements.pending_verification",
              "under_review",
            ]).annotate({
              description:
                "This is typed as an enum for consistency with `requirements.disabled_reason`.",
            }),
            Schema.Null,
          ]),
        ),
        errors: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_error).annotate({
              description:
                "Fields that are `currently_due` and need to be collected again because validation or verification failed.",
            }),
            Schema.Null,
          ]),
        ),
        eventually_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields you must collect when all thresholds are reached. As they become required, they appear in `currently_due` as well.",
            }),
            Schema.Null,
          ]),
        ),
        past_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that haven't been resolved by `requirements.current_deadline`. These fields need to be resolved to enable the capability on the account. `future_requirements.past_due` is a subset of `requirements.past_due`.",
            }),
            Schema.Null,
          ]),
        ),
        pending_verification: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that are being reviewed, or might become required depending on the results of a review. If the review fails, these fields can move to `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in `pending_verification` if one verification fails but another is still pending.",
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
      title: "AccountFutureRequirements",
      description: "",
      identifier: "Stripeaccount_future_requirements",
    }),
);
export const Stripeaccount_requirements = Schema.suspend(
  (): Schema.Codec<Stripeaccount_requirements> =>
    Schema.StructWithRest(
      Schema.Struct({
        alternatives: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_alternative).annotate({
              description:
                "Fields that are due and can be resolved by providing the corresponding alternative fields instead. Many alternatives can list the same `original_fields_due`, and any of these alternatives can serve as a pathway for attempting to resolve the fields again. Re-providing `original_fields_due` also serves as a pathway for attempting to resolve the fields again.",
            }),
            Schema.Null,
          ]),
        ),
        current_deadline: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date by which the fields in `currently_due` must be collected to keep the account enabled. These fields may disable the account sooner if the next threshold is reached before they are collected.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        currently_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that need to be resolved to keep the account enabled. If not resolved by `current_deadline`, these fields will appear in `past_due` as well, and the account will be disabled.",
            }),
            Schema.Null,
          ]),
        ),
        disabled_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "action_required.requested_capabilities",
              "listed",
              "other",
              "platform_paused",
              "rejected.fraud",
              "rejected.incomplete_verification",
              "rejected.listed",
              "rejected.other",
              "rejected.platform_fraud",
              "rejected.platform_other",
              "rejected.platform_terms_of_service",
              "rejected.terms_of_service",
              "requirements.past_due",
              "requirements.pending_verification",
              "under_review",
            ]).annotate({
              description:
                "If the account is disabled, this enum describes why. [Learn more about handling verification issues](https://docs.stripe.com/connect/handling-api-verification).",
            }),
            Schema.Null,
          ]),
        ),
        errors: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_error).annotate({
              description:
                "Fields that are `currently_due` and need to be collected again because validation or verification failed.",
            }),
            Schema.Null,
          ]),
        ),
        eventually_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields you must collect when all thresholds are reached. As they become required, they appear in `currently_due` as well, and `current_deadline` becomes set.",
            }),
            Schema.Null,
          ]),
        ),
        past_due: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that haven't been resolved by `current_deadline`. These fields need to be resolved to enable the account.",
            }),
            Schema.Null,
          ]),
        ),
        pending_verification: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "Fields that are being reviewed, or might become required depending on the results of a review. If the review fails, these fields can move to `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in `pending_verification` if one verification fails but another is still pending.",
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
      title: "AccountRequirements",
      description: "",
      identifier: "Stripeaccount_requirements",
    }),
);
export const Stripeaccount_capability_future_requirements = Schema.suspend(
  (): Schema.Codec<Stripeaccount_capability_future_requirements> =>
    Schema.StructWithRest(
      Schema.Struct({
        alternatives: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_alternative).annotate({
              description:
                "Fields that are due and can be resolved by providing the corresponding alternative fields instead. Multiple alternatives can reference the same `original_fields_due`. When this happens, any of these alternatives can serve as a pathway for attempting to resolve the fields. Additionally, providing `original_fields_due` again also serves as a pathway for attempting to resolve the fields.",
            }),
            Schema.Null,
          ]),
        ),
        current_deadline: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date on which `future_requirements` becomes the main `requirements` hash and `future_requirements` becomes empty. After the transition, `currently_due` requirements may immediately become `past_due`, but the account may also be given a grace period depending on the capability's enablement state prior to transitioning.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        currently_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that need to be resolved to keep the capability enabled. If not resolved by `future_requirements[current_deadline]`, these fields will transition to the main `requirements` hash.",
        }),
        disabled_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "other",
              "paused.inactivity",
              "pending.onboarding",
              "pending.review",
              "platform_disabled",
              "platform_paused",
              "rejected.inactivity",
              "rejected.other",
              "rejected.unsupported_business",
              "requirements.fields_needed",
            ]).annotate({
              description:
                "This is typed as an enum for consistency with `requirements.disabled_reason`, but it safe to assume `future_requirements.disabled_reason` is null because fields in `future_requirements` will never disable the account.",
            }),
            Schema.Null,
          ]),
        ),
        errors: Schema.Array(Stripeaccount_requirements_error).annotate({
          description:
            "Fields that are `currently_due` and need to be collected again because validation or verification failed.",
        }),
        eventually_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields you must collect when all thresholds are reached. As they become required, they appear in `currently_due` as well.",
        }),
        past_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that haven't been resolved by `requirements.current_deadline`. These fields need to be resolved to enable the capability on the account. `future_requirements.past_due` is a subset of `requirements.past_due`.",
        }),
        pending_verification: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that are being reviewed, or might become required depending on the results of a review. If the review fails, these fields can move to `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in `pending_verification` if one verification fails but another is still pending.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AccountCapabilityFutureRequirements",
      description: "",
      identifier: "Stripeaccount_capability_future_requirements",
    }),
);
export const Stripeaccount_capability_requirements = Schema.suspend(
  (): Schema.Codec<Stripeaccount_capability_requirements> =>
    Schema.StructWithRest(
      Schema.Struct({
        alternatives: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeaccount_requirements_alternative).annotate({
              description:
                "Fields that are due and can be resolved by providing the corresponding alternative fields instead. Multiple alternatives can reference the same `original_fields_due`. When this happens, any of these alternatives can serve as a pathway for attempting to resolve the fields. Additionally, providing `original_fields_due` again also serves as a pathway for attempting to resolve the fields.",
            }),
            Schema.Null,
          ]),
        ),
        current_deadline: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The date by which all required account information must be both submitted and verified. This includes fields listed in `currently_due` as well as those in `pending_verification`. If any required information is missing or unverified by this date, the account may be disabled. Note that `current_deadline` may change if additional `currently_due` requirements are requested.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        currently_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that need to be resolved to keep the capability enabled. If not resolved by `current_deadline`, these fields will appear in `past_due` as well, and the capability is disabled.",
        }),
        disabled_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "other",
              "paused.inactivity",
              "pending.onboarding",
              "pending.review",
              "platform_disabled",
              "platform_paused",
              "rejected.inactivity",
              "rejected.other",
              "rejected.unsupported_business",
              "requirements.fields_needed",
            ]).annotate({
              description:
                "Description of why the capability is disabled. [Learn more about handling verification issues](https://docs.stripe.com/connect/handling-api-verification).",
            }),
            Schema.Null,
          ]),
        ),
        errors: Schema.Array(Stripeaccount_requirements_error).annotate({
          description:
            "Fields that are `currently_due` and need to be collected again because validation or verification failed.",
        }),
        eventually_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields you must collect when all thresholds are reached. As they become required, they appear in `currently_due` as well, and `current_deadline` becomes set.",
        }),
        past_due: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that haven't been resolved by `current_deadline`. These fields need to be resolved to enable the capability on the account.",
        }),
        pending_verification: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Fields that are being reviewed, or might become required depending on the results of a review. If the review fails, these fields can move to `eventually_due`, `currently_due`, `past_due` or `alternatives`. Fields might appear in `eventually_due`, `currently_due`, `past_due` or `alternatives` and in `pending_verification` if one verification fails but another is still pending.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AccountCapabilityRequirements",
      description: "",
      identifier: "Stripeaccount_capability_requirements",
    }),
);
export const Stripeaccount_card_issuing_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_card_issuing_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        tos_acceptance: Schema.optionalKey(
          Stripecard_issuing_account_terms_of_service,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AccountCardIssuingSettings",
      description: "",
      identifier: "Stripeaccount_card_issuing_settings",
    }),
);
export const Stripeaccount_card_payments_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_card_payments_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        decline_on: Schema.optionalKey(Stripeaccount_decline_charge_on),
        statement_descriptor_prefix: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The default text that appears on credit card statements when a charge is made. This field prefixes any dynamic `statement_descriptor` specified on the charge. `statement_descriptor_prefix` is useful for maximizing descriptor space for the dynamic portion.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        statement_descriptor_prefix_kana: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kana variation of the default text that appears on credit card statements when a charge is made (Japan only). This field prefixes any dynamic `statement_descriptor_suffix_kana` specified on the charge. `statement_descriptor_prefix_kana` is useful for maximizing descriptor space for the dynamic portion.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        statement_descriptor_prefix_kanji: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Kanji variation of the default text that appears on credit card statements when a charge is made (Japan only). This field prefixes any dynamic `statement_descriptor_suffix_kanji` specified on the charge. `statement_descriptor_prefix_kanji` is useful for maximizing descriptor space for the dynamic portion.",
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
      title: "AccountCardPaymentsSettings",
      description: "",
      identifier: "Stripeaccount_card_payments_settings",
    }),
);
export const Stripeaccount_payout_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_payout_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        debit_negative_balances: Schema.Boolean.annotate({
          description:
            "A Boolean indicating if Stripe should try to reclaim negative balances from an attached bank account. See [Understanding Connect account balances](/connect/account-balances) for details. The default value is `false` when [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts, otherwise `true`.",
        }),
        schedule: Stripetransfer_schedule,
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The text that appears on the bank account statement for payouts. If not set, this defaults to the platform's bank descriptor as set in the Dashboard.",
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
      title: "AccountPayoutSettings",
      description: "",
      identifier: "Stripeaccount_payout_settings",
    }),
);
export const Stripeaccount_paypay_site_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_paypay_site_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        accessible: Schema.optionalKey(
          Stripeaccount_paypay_site_accessible_settings,
        ),
        in_development: Schema.optionalKey(
          Stripeaccount_paypay_site_in_development_settings,
        ),
        restricted: Schema.optionalKey(
          Stripeaccount_paypay_site_restricted_settings,
        ),
        type: Schema.optionalKey(
          Schema.Literals([
            "accessible",
            "in_development",
            "restricted",
          ]).annotate({
            description: "The status of your business's website.",
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
      title: "AccountPaypaySiteSettings",
      description: "",
      identifier: "Stripeaccount_paypay_site_settings",
    }),
);
export const Stripeaccount_treasury_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_treasury_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        tos_acceptance: Schema.optionalKey(Stripeaccount_terms_of_service),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AccountTreasurySettings",
      description: "",
      identifier: "Stripeaccount_treasury_settings",
    }),
);
export const Stripeaccount_paypay_payments_settings = Schema.suspend(
  (): Schema.Codec<Stripeaccount_paypay_payments_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        additional_files: Schema.optionalKey(
          Schema.Array(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ).annotate({
            description:
              "Additional files that are required to support the onboarding process of your business.",
          }),
        ),
        goods_type: Schema.optionalKey(
          Schema.Literals(["digital_content", "other"]).annotate({
            description:
              "The type of goods your business sells. Use `digital_content` if you sell digital content. Use `other` for all other types of goods or services.",
          }),
        ),
        site: Schema.optionalKey(Stripeaccount_paypay_site_settings),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "AccountPaypayPaymentsSettings",
      description: "",
      identifier: "Stripeaccount_paypay_payments_settings",
    }),
);
