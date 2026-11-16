// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_deleted_object } from "./models/common.js";
import {
  Stripev2_core_account,
  Stripev2_core_account_person,
  Stripev2_core_account_person_token,
} from "./models/v2Accounts.js";
import {
  Stripev2_error,
  Stripev2_error_account_capability_not_supported,
  Stripev2_error_account_configuration_not_supported,
  Stripev2_error_account_controller_express_dash_without_application_losses_or_fees,
  Stripev2_error_account_controller_stripe_pricing_platform_liable,
  Stripev2_error_account_controller_ua_unsupported_configuration,
  Stripev2_error_account_controller_unsupported_configuration,
  Stripev2_error_account_controller_unsupported_configuration_private_preview,
  Stripev2_error_account_country_unsupported_currency,
  Stripev2_error_account_create_activation_required,
  Stripev2_error_account_creation_blocked_due_to_suspicious_activity,
  Stripev2_error_account_creation_identity_verification_incomplete,
  Stripev2_error_account_creation_invalid,
  Stripev2_error_account_creation_liability_unacknowledged,
  Stripev2_error_account_creation_liability_unacknowledged_and_identity_verification_incomplete,
  Stripev2_error_account_creation_losses_collector_unavailable,
  Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged,
  Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete,
  Stripev2_error_account_creation_requirement_collection_unacknowledged,
  Stripev2_error_account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete,
  Stripev2_error_account_not_yet_compatible_with_v2,
  Stripev2_error_account_rate_limit_exceeded,
  Stripev2_error_account_terms_of_service_not_accepted,
  Stripev2_error_account_token_required,
  Stripev2_error_accounts_v2_access_blocked,
  Stripev2_error_additional_legal_guardian_not_allowed,
  Stripev2_error_additional_representative_not_allowed,
  Stripev2_error_additional_tos_only_allowed_for_legal_guardian,
  Stripev2_error_address_characters_invalid,
  Stripev2_error_address_country_identity_country_mismatch,
  Stripev2_error_address_country_mismatch,
  Stripev2_error_address_country_required,
  Stripev2_error_address_postal_code_invalid,
  Stripev2_error_address_state_invalid,
  Stripev2_error_address_town_invalid,
  Stripev2_error_attach_payment_method_to_customer,
  Stripev2_error_authorizer_duplicate,
  Stripev2_error_authorizer_relationship_invalid_for_representative,
  Stripev2_error_bgn_bank_accounts_unsupported,
  Stripev2_error_can_create_platform_owned_onboarding_accounts_required,
  Stripev2_error_cannot_add_connect_due_to_incompatible_default_payout_method,
  Stripev2_error_cannot_create_connected_account,
  Stripev2_error_cannot_create_new_account_rejected,
  Stripev2_error_cannot_delete_account_with_balance,
  Stripev2_error_cannot_delete_customer_with_available_cash_balance,
  Stripev2_error_cannot_use_validate_location_on_customer_create,
  Stripev2_error_capability_cannot_be_unrequested_due_to_other_capability_requirement,
  Stripev2_error_capability_not_available_for_dashboard_type,
  Stripev2_error_capability_not_available_for_entity_type_in_country,
  Stripev2_error_capability_not_available_for_loss_collector,
  Stripev2_error_capability_not_available_in_country,
  Stripev2_error_capability_not_available_in_platform_country,
  Stripev2_error_capability_not_available_without_other_capability,
  Stripev2_error_capability_not_available_without_other_capability_in_country,
  Stripev2_error_configs_must_match_to_close,
  Stripev2_error_configuration_cannot_be_deactivated,
  Stripev2_error_configuration_cannot_be_deactivated_due_to_other_capability_requirement,
  Stripev2_error_configuration_cannot_be_deactivated_due_to_other_configuration,
  Stripev2_error_configuration_cannot_be_updated_while_deactivated,
  Stripev2_error_configuration_creation_invalid,
  Stripev2_error_connect_identity_not_verified,
  Stripev2_error_connect_profile_not_submitted,
  Stripev2_error_cross_border_connected_account_creation_not_allowed,
  Stripev2_error_custom_account_beta,
  Stripev2_error_customer_invalid_tax_location,
  Stripev2_error_date_of_birth_age_restriction,
  Stripev2_error_date_of_birth_invalid,
  Stripev2_error_default_currency_immutable,
  Stripev2_error_default_outbound_destination_invalid,
  Stripev2_error_default_payment_method_invalid,
  Stripev2_error_default_payment_method_invalid_type,
  Stripev2_error_directorship_declaration_not_allowed_during_account_creation,
  Stripev2_error_document_invalid,
  Stripev2_error_document_purpose_invalid,
  Stripev2_error_duplicate_person_not_allowed,
  Stripev2_error_email_domain_invalid_for_recipient,
  Stripev2_error_email_invalid,
  Stripev2_error_entity_type_not_supported_in_country,
  Stripev2_error_high_risk_activities_none_cant_be_combined_with_other_options,
  Stripev2_error_id_number_invalid,
  Stripev2_error_idempotency_error,
  Stripev2_error_identity_country_required,
  Stripev2_error_immutable_identity_param,
  Stripev2_error_incompatible_default_payout_method,
  Stripev2_error_incorrect_account_for_person_token,
  Stripev2_error_incorrect_id_number_for_country,
  Stripev2_error_incorrect_token_wrong_type,
  Stripev2_error_individual_additional_person_not_allowed,
  Stripev2_error_invalid_account_token,
  Stripev2_error_invalid_id_number_for_structure,
  Stripev2_error_invalid_id_number_registrar,
  Stripev2_error_invalid_konbini_payments_support_hours,
  Stripev2_error_invalid_konbini_payments_support_phone_number,
  Stripev2_error_invalid_person_token,
  Stripev2_error_invalid_relationship_for_identity_type_structure_and_country,
  Stripev2_error_invalid_sepa_creditor_id_format,
  Stripev2_error_invalid_timezone,
  Stripev2_error_invoice_rendering_template_invalid,
  Stripev2_error_ip_address_invalid,
  Stripev2_error_legal_guardian_representative_not_allowed,
  Stripev2_error_legal_guardian_requires_existing_representative,
  Stripev2_error_mcc_invalid,
  Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
  Stripev2_error_non_jp_kana_kanji_address,
  Stripev2_error_not_found,
  Stripev2_error_ownership_declaration_not_allowed_during_account_creation,
  Stripev2_error_param_alongside_account_token,
  Stripev2_error_param_alongside_person_token,
  Stripev2_error_payout_method_incompatible_type,
  Stripev2_error_pending_transactions_cannot_be_deleted,
  Stripev2_error_person_percent_ownership_invalid,
  Stripev2_error_person_token_required,
  Stripev2_error_phone_invalid,
  Stripev2_error_platform_registration_required,
  Stripev2_error_postal_code_required_for_jp_address,
  Stripev2_error_purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds,
  Stripev2_error_registration_date_invalid,
  Stripev2_error_script_characters_invalid,
  Stripev2_error_sepa_debit_creditor_identifier_not_allowed,
  Stripev2_error_sepa_debit_stripe_creditor_identifier,
  Stripev2_error_shipping_address_required,
  Stripev2_error_shipping_name_required,
  Stripev2_error_statement_descriptor_invalid,
  Stripev2_error_stripe_loss_liable_cannot_be_deleted,
  Stripev2_error_structure_incompatible_for_entity_type_country,
  Stripev2_error_test_clock_disallowed_on_live_mode,
  Stripev2_error_test_clock_invalid,
  Stripev2_error_test_clocks_advance_in_progress,
  Stripev2_error_test_clocks_customer_limit_reached,
  Stripev2_error_token_already_used,
  Stripev2_error_token_expired,
  Stripev2_error_token_must_be_created_with_publishable_key,
  Stripev2_error_tos_acceptance_on_behalf_not_allowed,
  Stripev2_error_total_person_ownership_exceeded,
  Stripev2_error_unsupported_field_for_configs,
  Stripev2_error_unsupported_identity_field_for_configs,
  Stripev2_error_unsupported_postal_code,
  Stripev2_error_unsupported_state,
  Stripev2_error_url_invalid,
  Stripev2_error_v1_account_instead_of_v2_account,
  Stripev2_error_v1_customer_instead_of_v2_account,
  Stripev2_error_v1_token_invalid_in_v2,
} from "./models/v2Errors.js";

export type GetV2CoreAccountsInput = {
  readonly applied_configurations?: ReadonlyArray<
    "customer" | "merchant" | "recipient"
  >;
  readonly closed?: boolean;
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2CoreAccountsOutput = {
  readonly data: ReadonlyArray<Stripev2_core_account>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2CoreAccountsError =
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error;
export type PostV2CoreAccountsInput = {
  readonly account_token?: string;
  readonly configuration?: {
    readonly customer?: {
      readonly automatic_indirect_tax?: {
        readonly exempt?: "exempt" | "none" | "reverse";
        readonly ip_address?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly billing?: {
        readonly invoice?: {
          readonly custom_fields?: ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >;
          readonly footer?: string;
          readonly next_sequence?: number;
          readonly prefix?: string;
          readonly rendering?: {
            readonly amount_tax_display?:
              | "exclude_tax"
              | "include_inclusive_tax";
            readonly template?: string;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly capabilities?: {
        readonly automatic_indirect_tax?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
      } & { readonly [x: string]: Schema.Json };
      readonly shipping?: {
        readonly address?: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly name?: string;
        readonly phone?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly test_clock?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly merchant?: {
      readonly bacs_debit_payments?: { readonly display_name?: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly branding?: {
        readonly icon?: string;
        readonly logo?: string;
        readonly primary_color?: string;
        readonly secondary_color?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly capabilities?: {
        readonly ach_debit_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly acss_debit_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly affirm_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly afterpay_clearpay_payments?: {
          readonly requested: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly alma_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly amazon_pay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly au_becs_debit_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly bacs_debit_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly bancontact_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly blik_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly blik_recurring_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly boleto_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly card_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly cartes_bancaires_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly cashapp_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly eps_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly fpx_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly gb_bank_transfer_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly grabpay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly ideal_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly jcb_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly jp_bank_transfer_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly kakao_pay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly klarna_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly konbini_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly kr_card_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly link_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly mobilepay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly multibanco_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly mx_bank_transfer_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly naver_pay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly oxxo_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly p24_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly pay_by_bank_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly payco_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly paynow_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly promptpay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly revolut_pay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly samsung_pay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly satispay_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly sepa_bank_transfer_payments?: {
          readonly requested: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly sepa_debit_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly sequra_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly sunbit_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly swish_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly twint_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly us_bank_transfer_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly zip_payments?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
      } & { readonly [x: string]: Schema.Json };
      readonly card_payments?: {
        readonly decline_on?: {
          readonly avs_failure?: boolean;
          readonly cvc_failure?: boolean;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly konbini_payments?: {
        readonly support?: {
          readonly email?: string;
          readonly hours?: {
            readonly end_time?: string;
            readonly start_time?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly phone?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly mcc?: string;
      readonly script_statement_descriptor?: {
        readonly kana?: {
          readonly descriptor?: string;
          readonly prefix?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly kanji?: {
          readonly descriptor?: string;
          readonly prefix?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly sepa_debit_payments?: { readonly creditor_id?: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly statement_descriptor?: {
        readonly descriptor?: string;
        readonly prefix?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly support?: {
        readonly address?: {
          readonly city?: string;
          readonly country: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly email?: string;
        readonly phone?: string;
        readonly url?: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly recipient?: {
      readonly capabilities?: {
        readonly bank_accounts?: {
          readonly ach?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly fedwire?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly fps?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly local?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly rtp?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly sepa?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly swift?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
        } & { readonly [x: string]: Schema.Json };
        readonly cards?: { readonly requested: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly stripe_balance?: {
          readonly stripe_transfers?: { readonly requested: boolean } & {
            readonly [x: string]: Schema.Json;
          };
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly contact_email?: string;
  readonly contact_phone?: string;
  readonly dashboard?: "express" | "full" | "none";
  readonly defaults?: {
    readonly currency?: string;
    readonly locales?: ReadonlyArray<
      | "ar-SA"
      | "bg"
      | "bg-BG"
      | "cs"
      | "cs-CZ"
      | "da"
      | "da-DK"
      | "de"
      | "de-DE"
      | "el"
      | "el-GR"
      | "en"
      | "en-AU"
      | "en-CA"
      | "en-GB"
      | "en-IE"
      | "en-IN"
      | "en-NZ"
      | "en-SG"
      | "en-US"
      | "es"
      | "es-419"
      | "es-ES"
      | "et"
      | "et-EE"
      | "fi"
      | "fil"
      | "fil-PH"
      | "fi-FI"
      | "fr"
      | "fr-CA"
      | "fr-FR"
      | "he-IL"
      | "hr"
      | "hr-HR"
      | "hu"
      | "hu-HU"
      | "id"
      | "id-ID"
      | "it"
      | "it-IT"
      | "ja"
      | "ja-JP"
      | "ko"
      | "ko-KR"
      | "lt"
      | "lt-LT"
      | "lv"
      | "lv-LV"
      | "ms"
      | "ms-MY"
      | "mt"
      | "mt-MT"
      | "nb"
      | "nb-NO"
      | "nl"
      | "nl-NL"
      | "pl"
      | "pl-PL"
      | "pt"
      | "pt-BR"
      | "pt-PT"
      | "ro"
      | "ro-RO"
      | "ru"
      | "ru-RU"
      | "sk"
      | "sk-SK"
      | "sl"
      | "sl-SI"
      | "sv"
      | "sv-SE"
      | "th"
      | "th-TH"
      | "tr"
      | "tr-TR"
      | "vi"
      | "vi-VN"
      | "zh"
      | "zh-Hans"
      | "zh-Hant-HK"
      | "zh-Hant-TW"
      | "zh-HK"
      | "zh-TW"
    >;
    readonly profile?: {
      readonly business_url?: string;
      readonly doing_business_as?: string;
      readonly product_description?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly responsibilities?: {
      readonly fees_collector:
        | "application"
        | "application_custom"
        | "application_express"
        | "stripe";
      readonly losses_collector: "application" | "stripe";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly display_name?: string;
  readonly identity?: {
    readonly attestations?: {
      readonly directorship_declaration?: {
        readonly date?: string;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly ownership_declaration?: {
        readonly date?: string;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly persons_provided?: {
        readonly directors?: boolean;
        readonly executives?: boolean;
        readonly owners?: boolean;
        readonly ownership_exemption_reason?:
          | "qualified_entity_exceeds_ownership_threshold"
          | "qualifies_as_financial_institution";
      } & { readonly [x: string]: Schema.Json };
      readonly representative_declaration?: {
        readonly date?: string;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly terms_of_service?: {
        readonly account?: {
          readonly date: string;
          readonly ip: string;
          readonly user_agent?: string;
        } & { readonly [x: string]: Schema.Json };
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
        readonly country: string;
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
            readonly front: string;
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
          readonly country: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly kanji?: {
          readonly city?: string;
          readonly country: string;
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
    readonly country?: string;
    readonly entity_type?:
      | "company"
      | "government_entity"
      | "individual"
      | "non_profit";
    readonly individual?: {
      readonly additional_addresses?: ReadonlyArray<
        {
          readonly city?: string;
          readonly country: string;
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
        readonly country: string;
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
            readonly front: string;
          } & { readonly [x: string]: Schema.Json };
          readonly type: "front_back";
        } & { readonly [x: string]: Schema.Json };
        readonly secondary_verification?: {
          readonly front_back: {
            readonly back?: string;
            readonly front: string;
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
      readonly metadata?: { readonly [x: string]: string };
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
          readonly country: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly kanji?: {
          readonly city?: string;
          readonly country: string;
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
  readonly include?: ReadonlyArray<
    | "configuration.customer"
    | "configuration.merchant"
    | "configuration.recipient"
    | "defaults"
    | "future_requirements"
    | "identity"
    | "requirements"
  >;
  readonly metadata?: { readonly [x: string]: string };
};
export type PostV2CoreAccountsOutput = Stripev2_core_account;
export type PostV2CoreAccountsError =
  | Stripev2_error_account_capability_not_supported
  | Stripev2_error_account_configuration_not_supported
  | Stripev2_error_account_controller_express_dash_without_application_losses_or_fees
  | Stripev2_error_account_controller_stripe_pricing_platform_liable
  | Stripev2_error_account_controller_ua_unsupported_configuration
  | Stripev2_error_account_controller_unsupported_configuration
  | Stripev2_error_account_controller_unsupported_configuration_private_preview
  | Stripev2_error_account_country_unsupported_currency
  | Stripev2_error_account_create_activation_required
  | Stripev2_error_account_creation_blocked_due_to_suspicious_activity
  | Stripev2_error_account_creation_identity_verification_incomplete
  | Stripev2_error_account_creation_invalid
  | Stripev2_error_account_creation_liability_unacknowledged
  | Stripev2_error_account_creation_liability_unacknowledged_and_identity_verification_incomplete
  | Stripev2_error_account_creation_losses_collector_unavailable
  | Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged
  | Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete
  | Stripev2_error_account_creation_requirement_collection_unacknowledged
  | Stripev2_error_account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_account_terms_of_service_not_accepted
  | Stripev2_error_account_token_required
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_address_characters_invalid
  | Stripev2_error_address_country_identity_country_mismatch
  | Stripev2_error_address_postal_code_invalid
  | Stripev2_error_address_state_invalid
  | Stripev2_error_address_town_invalid
  | Stripev2_error_bgn_bank_accounts_unsupported
  | Stripev2_error_can_create_platform_owned_onboarding_accounts_required
  | Stripev2_error_cannot_create_connected_account
  | Stripev2_error_cannot_create_new_account_rejected
  | Stripev2_error_capability_cannot_be_unrequested_due_to_other_capability_requirement
  | Stripev2_error_capability_not_available_for_dashboard_type
  | Stripev2_error_capability_not_available_for_entity_type_in_country
  | Stripev2_error_capability_not_available_for_loss_collector
  | Stripev2_error_capability_not_available_in_country
  | Stripev2_error_capability_not_available_in_platform_country
  | Stripev2_error_capability_not_available_without_other_capability
  | Stripev2_error_capability_not_available_without_other_capability_in_country
  | Stripev2_error_configuration_creation_invalid
  | Stripev2_error_connect_identity_not_verified
  | Stripev2_error_connect_profile_not_submitted
  | Stripev2_error_cross_border_connected_account_creation_not_allowed
  | Stripev2_error_custom_account_beta
  | Stripev2_error_date_of_birth_age_restriction
  | Stripev2_error_date_of_birth_invalid
  | Stripev2_error_default_currency_immutable
  | Stripev2_error_default_payment_method_invalid
  | Stripev2_error_default_payment_method_invalid_type
  | Stripev2_error_directorship_declaration_not_allowed_during_account_creation
  | Stripev2_error_document_invalid
  | Stripev2_error_document_purpose_invalid
  | Stripev2_error_email_domain_invalid_for_recipient
  | Stripev2_error_email_invalid
  | Stripev2_error_entity_type_not_supported_in_country
  | Stripev2_error_high_risk_activities_none_cant_be_combined_with_other_options
  | Stripev2_error_id_number_invalid
  | Stripev2_error_idempotency_error
  | Stripev2_error_identity_country_required
  | Stripev2_error_incorrect_id_number_for_country
  | Stripev2_error_incorrect_token_wrong_type
  | Stripev2_error_invalid_account_token
  | Stripev2_error_invalid_id_number_for_structure
  | Stripev2_error_invalid_id_number_registrar
  | Stripev2_error_invalid_konbini_payments_support_hours
  | Stripev2_error_invalid_konbini_payments_support_phone_number
  | Stripev2_error_invalid_sepa_creditor_id_format
  | Stripev2_error_invalid_timezone
  | Stripev2_error_invoice_rendering_template_invalid
  | Stripev2_error_ip_address_invalid
  | Stripev2_error_mcc_invalid
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_non_jp_kana_kanji_address
  | Stripev2_error_ownership_declaration_not_allowed_during_account_creation
  | Stripev2_error_param_alongside_account_token
  | Stripev2_error_person_percent_ownership_invalid
  | Stripev2_error_phone_invalid
  | Stripev2_error_platform_registration_required
  | Stripev2_error_postal_code_required_for_jp_address
  | Stripev2_error_purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds
  | Stripev2_error_registration_date_invalid
  | Stripev2_error_script_characters_invalid
  | Stripev2_error_sepa_debit_creditor_identifier_not_allowed
  | Stripev2_error_sepa_debit_stripe_creditor_identifier
  | Stripev2_error_shipping_address_required
  | Stripev2_error_shipping_name_required
  | Stripev2_error_statement_descriptor_invalid
  | Stripev2_error_structure_incompatible_for_entity_type_country
  | Stripev2_error_test_clock_disallowed_on_live_mode
  | Stripev2_error_test_clock_invalid
  | Stripev2_error_test_clocks_advance_in_progress
  | Stripev2_error_test_clocks_customer_limit_reached
  | Stripev2_error_token_already_used
  | Stripev2_error_token_expired
  | Stripev2_error_tos_acceptance_on_behalf_not_allowed
  | Stripev2_error_unsupported_field_for_configs
  | Stripev2_error_unsupported_identity_field_for_configs
  | Stripev2_error_unsupported_postal_code
  | Stripev2_error_unsupported_state
  | Stripev2_error_url_invalid
  | Stripev2_error_v1_token_invalid_in_v2
  | Stripev2_error;
export type PostV2CoreAccountsAccountIdPersonTokensInput = {
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
  readonly additional_terms_of_service?: {
    readonly account?: { readonly shown_and_accepted?: boolean } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
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
    readonly authorizer?: boolean;
    readonly director?: boolean;
    readonly executive?: boolean;
    readonly legal_guardian?: boolean;
    readonly owner?: boolean;
    readonly percent_ownership?: string;
    readonly representative?: boolean;
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
  readonly account_id: string;
};
export type PostV2CoreAccountsAccountIdPersonTokensOutput =
  Stripev2_core_account_person_token;
export type PostV2CoreAccountsAccountIdPersonTokensError =
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_platform_registration_required
  | Stripev2_error_token_must_be_created_with_publishable_key
  | Stripev2_error;
export type GetV2CoreAccountsAccountIdPersonTokensIdInput = {
  readonly account_id: string;
  readonly id: string;
};
export type GetV2CoreAccountsAccountIdPersonTokensIdOutput =
  Stripev2_core_account_person_token;
export type GetV2CoreAccountsAccountIdPersonTokensIdError =
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_not_found
  | Stripev2_error;
export type GetV2CoreAccountsAccountIdPersonsInput = {
  readonly account_id: string;
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2CoreAccountsAccountIdPersonsOutput = {
  readonly data: ReadonlyArray<Stripev2_core_account_person>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2CoreAccountsAccountIdPersonsError =
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error;
export type PostV2CoreAccountsAccountIdPersonsInput = {
  readonly additional_addresses?: ReadonlyArray<
    {
      readonly city?: string;
      readonly country: string;
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
  readonly additional_terms_of_service?: {
    readonly account?: {
      readonly date: string;
      readonly ip: string;
      readonly user_agent?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly address?: {
    readonly city?: string;
    readonly country: string;
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
        readonly front: string;
      } & { readonly [x: string]: Schema.Json };
      readonly type: "front_back";
    } & { readonly [x: string]: Schema.Json };
    readonly secondary_verification?: {
      readonly front_back: {
        readonly back?: string;
        readonly front: string;
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
  readonly metadata?: { readonly [x: string]: string };
  readonly nationalities?: ReadonlyArray<string>;
  readonly person_token?: string;
  readonly phone?: string;
  readonly political_exposure?: "existing" | "none";
  readonly relationship?: {
    readonly authorizer?: boolean;
    readonly director?: boolean;
    readonly executive?: boolean;
    readonly legal_guardian?: boolean;
    readonly owner?: boolean;
    readonly percent_ownership?: string;
    readonly representative?: boolean;
    readonly title?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly script_addresses?: {
    readonly kana?: {
      readonly city?: string;
      readonly country: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
      readonly town?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly kanji?: {
      readonly city?: string;
      readonly country: string;
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
  readonly account_id: string;
};
export type PostV2CoreAccountsAccountIdPersonsOutput =
  Stripev2_core_account_person;
export type PostV2CoreAccountsAccountIdPersonsError =
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_additional_legal_guardian_not_allowed
  | Stripev2_error_additional_representative_not_allowed
  | Stripev2_error_additional_tos_only_allowed_for_legal_guardian
  | Stripev2_error_address_characters_invalid
  | Stripev2_error_address_country_identity_country_mismatch
  | Stripev2_error_address_country_mismatch
  | Stripev2_error_address_country_required
  | Stripev2_error_address_postal_code_invalid
  | Stripev2_error_address_state_invalid
  | Stripev2_error_address_town_invalid
  | Stripev2_error_authorizer_duplicate
  | Stripev2_error_authorizer_relationship_invalid_for_representative
  | Stripev2_error_date_of_birth_age_restriction
  | Stripev2_error_date_of_birth_invalid
  | Stripev2_error_document_invalid
  | Stripev2_error_document_purpose_invalid
  | Stripev2_error_duplicate_person_not_allowed
  | Stripev2_error_email_domain_invalid_for_recipient
  | Stripev2_error_email_invalid
  | Stripev2_error_id_number_invalid
  | Stripev2_error_identity_country_required
  | Stripev2_error_incorrect_account_for_person_token
  | Stripev2_error_incorrect_id_number_for_country
  | Stripev2_error_incorrect_token_wrong_type
  | Stripev2_error_individual_additional_person_not_allowed
  | Stripev2_error_invalid_person_token
  | Stripev2_error_invalid_relationship_for_identity_type_structure_and_country
  | Stripev2_error_ip_address_invalid
  | Stripev2_error_legal_guardian_representative_not_allowed
  | Stripev2_error_legal_guardian_requires_existing_representative
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_non_jp_kana_kanji_address
  | Stripev2_error_param_alongside_person_token
  | Stripev2_error_person_percent_ownership_invalid
  | Stripev2_error_person_token_required
  | Stripev2_error_phone_invalid
  | Stripev2_error_platform_registration_required
  | Stripev2_error_postal_code_required_for_jp_address
  | Stripev2_error_script_characters_invalid
  | Stripev2_error_token_already_used
  | Stripev2_error_token_expired
  | Stripev2_error_total_person_ownership_exceeded
  | Stripev2_error_unsupported_postal_code
  | Stripev2_error_unsupported_state
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error_v1_token_invalid_in_v2
  | Stripev2_error;
export type GetV2CoreAccountsAccountIdPersonsIdInput = {
  readonly account_id: string;
  readonly id: string;
};
export type GetV2CoreAccountsAccountIdPersonsIdOutput =
  Stripev2_core_account_person;
export type GetV2CoreAccountsAccountIdPersonsIdError =
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_not_found
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error;
export type PostV2CoreAccountsAccountIdPersonsIdInput = {
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
  readonly additional_terms_of_service?: {
    readonly account?: {
      readonly date?: string;
      readonly ip?: string;
      readonly user_agent?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
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
  readonly person_token?: string;
  readonly phone?: string;
  readonly political_exposure?: "existing" | "none";
  readonly relationship?: {
    readonly authorizer?: boolean;
    readonly director?: boolean;
    readonly executive?: boolean;
    readonly legal_guardian?: boolean;
    readonly owner?: boolean;
    readonly percent_ownership?: string;
    readonly representative?: boolean;
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
  readonly account_id: string;
  readonly id: string;
};
export type PostV2CoreAccountsAccountIdPersonsIdOutput =
  Stripev2_core_account_person;
export type PostV2CoreAccountsAccountIdPersonsIdError =
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_additional_legal_guardian_not_allowed
  | Stripev2_error_additional_representative_not_allowed
  | Stripev2_error_additional_tos_only_allowed_for_legal_guardian
  | Stripev2_error_address_characters_invalid
  | Stripev2_error_address_country_identity_country_mismatch
  | Stripev2_error_address_country_mismatch
  | Stripev2_error_address_country_required
  | Stripev2_error_address_postal_code_invalid
  | Stripev2_error_address_state_invalid
  | Stripev2_error_address_town_invalid
  | Stripev2_error_date_of_birth_age_restriction
  | Stripev2_error_date_of_birth_invalid
  | Stripev2_error_document_invalid
  | Stripev2_error_document_purpose_invalid
  | Stripev2_error_duplicate_person_not_allowed
  | Stripev2_error_email_domain_invalid_for_recipient
  | Stripev2_error_email_invalid
  | Stripev2_error_id_number_invalid
  | Stripev2_error_identity_country_required
  | Stripev2_error_immutable_identity_param
  | Stripev2_error_incorrect_account_for_person_token
  | Stripev2_error_incorrect_id_number_for_country
  | Stripev2_error_incorrect_token_wrong_type
  | Stripev2_error_invalid_person_token
  | Stripev2_error_ip_address_invalid
  | Stripev2_error_legal_guardian_representative_not_allowed
  | Stripev2_error_legal_guardian_requires_existing_representative
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_non_jp_kana_kanji_address
  | Stripev2_error_not_found
  | Stripev2_error_param_alongside_person_token
  | Stripev2_error_person_percent_ownership_invalid
  | Stripev2_error_person_token_required
  | Stripev2_error_phone_invalid
  | Stripev2_error_platform_registration_required
  | Stripev2_error_postal_code_required_for_jp_address
  | Stripev2_error_script_characters_invalid
  | Stripev2_error_token_already_used
  | Stripev2_error_token_expired
  | Stripev2_error_total_person_ownership_exceeded
  | Stripev2_error_unsupported_postal_code
  | Stripev2_error_unsupported_state
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error_v1_token_invalid_in_v2
  | Stripev2_error;
export type DeleteV2CoreAccountsAccountIdPersonsIdInput = {
  readonly account_id: string;
  readonly id: string;
};
export type DeleteV2CoreAccountsAccountIdPersonsIdOutput =
  Stripev2_deleted_object;
export type DeleteV2CoreAccountsAccountIdPersonsIdError =
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_not_found
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error;
export type GetV2CoreAccountsIdInput = {
  readonly id: string;
  readonly include?: ReadonlyArray<
    | "configuration.customer"
    | "configuration.merchant"
    | "configuration.recipient"
    | "defaults"
    | "future_requirements"
    | "identity"
    | "requirements"
  >;
};
export type GetV2CoreAccountsIdOutput = Stripev2_core_account;
export type GetV2CoreAccountsIdError =
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_not_found
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error;
export type PostV2CoreAccountsIdInput = {
  readonly account_token?: string;
  readonly configuration?: {
    readonly customer?: {
      readonly applied?: boolean;
      readonly automatic_indirect_tax?: {
        readonly exempt?: "exempt" | "none" | "reverse";
        readonly ip_address?: string;
        readonly validate_location?: "auto" | "deferred" | "immediately";
      } & { readonly [x: string]: Schema.Json };
      readonly billing?: {
        readonly default_payment_method?: string;
        readonly invoice?: {
          readonly custom_fields?: ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >;
          readonly footer?: string;
          readonly next_sequence?: number;
          readonly prefix?: string;
          readonly rendering?: {
            readonly amount_tax_display?:
              | "exclude_tax"
              | "include_inclusive_tax";
            readonly template?: string;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly capabilities?: {
        readonly automatic_indirect_tax?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
      } & { readonly [x: string]: Schema.Json };
      readonly shipping?: {
        readonly address?: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly name?: string;
        readonly phone?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly test_clock?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly merchant?: {
      readonly applied?: boolean;
      readonly bacs_debit_payments?: { readonly display_name?: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly branding?: {
        readonly icon?: string;
        readonly logo?: string;
        readonly primary_color?: string;
        readonly secondary_color?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly capabilities?: {
        readonly ach_debit_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly acss_debit_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly affirm_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly afterpay_clearpay_payments?: {
          readonly requested?: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly alma_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly amazon_pay_payments?: { readonly requested?: boolean } & {
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
        readonly blik_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly blik_recurring_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly boleto_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly card_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly cartes_bancaires_payments?: {
          readonly requested?: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly cashapp_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly eps_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly fpx_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly gb_bank_transfer_payments?: {
          readonly requested?: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly grabpay_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly ideal_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly jcb_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly jp_bank_transfer_payments?: {
          readonly requested?: boolean;
        } & { readonly [x: string]: Schema.Json };
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
        readonly link_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly mobilepay_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly multibanco_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly mx_bank_transfer_payments?: {
          readonly requested?: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly naver_pay_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
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
        readonly sepa_bank_transfer_payments?: {
          readonly requested?: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly sepa_debit_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly sequra_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly sunbit_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly swish_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly twint_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly us_bank_transfer_payments?: {
          readonly requested?: boolean;
        } & { readonly [x: string]: Schema.Json };
        readonly zip_payments?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
      } & { readonly [x: string]: Schema.Json };
      readonly card_payments?: {
        readonly decline_on?: {
          readonly avs_failure?: boolean;
          readonly cvc_failure?: boolean;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly konbini_payments?: {
        readonly support?: {
          readonly email?: string;
          readonly hours?: {
            readonly end_time?: string;
            readonly start_time?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly phone?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly mcc?: string;
      readonly script_statement_descriptor?: {
        readonly kana?: {
          readonly descriptor?: string;
          readonly prefix?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly kanji?: {
          readonly descriptor?: string;
          readonly prefix?: string;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly sepa_debit_payments?: { readonly creditor_id?: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly statement_descriptor?: {
        readonly descriptor?: string;
        readonly prefix?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly support?: {
        readonly address?: {
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
          readonly town?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly email?: string;
        readonly phone?: string;
        readonly url?: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly recipient?: {
      readonly applied?: boolean;
      readonly capabilities?: {
        readonly bank_accounts?: {
          readonly ach?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly fedwire?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly fps?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly local?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly rtp?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly sepa?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
          readonly swift?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
        } & { readonly [x: string]: Schema.Json };
        readonly cards?: { readonly requested?: boolean } & {
          readonly [x: string]: Schema.Json;
        };
        readonly stripe_balance?: {
          readonly stripe_transfers?: { readonly requested?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly contact_email?: string;
  readonly contact_phone?: string;
  readonly dashboard?: "express" | "full" | "none";
  readonly defaults?: {
    readonly currency?: string;
    readonly locales?: ReadonlyArray<
      | "ar-SA"
      | "bg"
      | "bg-BG"
      | "cs"
      | "cs-CZ"
      | "da"
      | "da-DK"
      | "de"
      | "de-DE"
      | "el"
      | "el-GR"
      | "en"
      | "en-AU"
      | "en-CA"
      | "en-GB"
      | "en-IE"
      | "en-IN"
      | "en-NZ"
      | "en-SG"
      | "en-US"
      | "es"
      | "es-419"
      | "es-ES"
      | "et"
      | "et-EE"
      | "fi"
      | "fil"
      | "fil-PH"
      | "fi-FI"
      | "fr"
      | "fr-CA"
      | "fr-FR"
      | "he-IL"
      | "hr"
      | "hr-HR"
      | "hu"
      | "hu-HU"
      | "id"
      | "id-ID"
      | "it"
      | "it-IT"
      | "ja"
      | "ja-JP"
      | "ko"
      | "ko-KR"
      | "lt"
      | "lt-LT"
      | "lv"
      | "lv-LV"
      | "ms"
      | "ms-MY"
      | "mt"
      | "mt-MT"
      | "nb"
      | "nb-NO"
      | "nl"
      | "nl-NL"
      | "pl"
      | "pl-PL"
      | "pt"
      | "pt-BR"
      | "pt-PT"
      | "ro"
      | "ro-RO"
      | "ru"
      | "ru-RU"
      | "sk"
      | "sk-SK"
      | "sl"
      | "sl-SI"
      | "sv"
      | "sv-SE"
      | "th"
      | "th-TH"
      | "tr"
      | "tr-TR"
      | "vi"
      | "vi-VN"
      | "zh"
      | "zh-Hans"
      | "zh-Hant-HK"
      | "zh-Hant-TW"
      | "zh-HK"
      | "zh-TW"
    >;
    readonly payout_methods?: { readonly [x: string]: string };
    readonly profile?: {
      readonly business_url?: string;
      readonly doing_business_as?: string;
      readonly product_description?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly responsibilities?: {
      readonly fees_collector:
        | "application"
        | "application_custom"
        | "application_express"
        | "stripe";
      readonly losses_collector: "application" | "stripe";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly display_name?: string;
  readonly identity?: {
    readonly attestations?: {
      readonly directorship_declaration?: {
        readonly date?: string;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly ownership_declaration?: {
        readonly date?: string;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly persons_provided?: {
        readonly directors?: boolean;
        readonly executives?: boolean;
        readonly owners?: boolean;
        readonly ownership_exemption_reason?:
          | "qualified_entity_exceeds_ownership_threshold"
          | "qualifies_as_financial_institution";
      } & { readonly [x: string]: Schema.Json };
      readonly representative_declaration?: {
        readonly date?: string;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly terms_of_service?: {
        readonly account?: {
          readonly date?: string;
          readonly ip?: string;
          readonly user_agent?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly crypto_money_manager?: {
          readonly date?: string;
          readonly ip?: string;
          readonly user_agent?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly money_manager?: {
          readonly date?: string;
          readonly ip?: string;
          readonly user_agent?: string;
        } & { readonly [x: string]: Schema.Json };
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
    readonly country?: string;
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
  readonly include?: ReadonlyArray<
    | "configuration.customer"
    | "configuration.merchant"
    | "configuration.recipient"
    | "defaults"
    | "future_requirements"
    | "identity"
    | "requirements"
  >;
  readonly metadata?: { readonly [x: string]: string | null };
  readonly id: string;
};
export type PostV2CoreAccountsIdOutput = Stripev2_core_account;
export type PostV2CoreAccountsIdError =
  | Stripev2_error_account_capability_not_supported
  | Stripev2_error_account_configuration_not_supported
  | Stripev2_error_account_controller_express_dash_without_application_losses_or_fees
  | Stripev2_error_account_controller_stripe_pricing_platform_liable
  | Stripev2_error_account_controller_unsupported_configuration
  | Stripev2_error_account_controller_unsupported_configuration_private_preview
  | Stripev2_error_account_country_unsupported_currency
  | Stripev2_error_account_creation_blocked_due_to_suspicious_activity
  | Stripev2_error_account_creation_identity_verification_incomplete
  | Stripev2_error_account_creation_liability_unacknowledged_and_identity_verification_incomplete
  | Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete
  | Stripev2_error_account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_account_terms_of_service_not_accepted
  | Stripev2_error_account_token_required
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_address_characters_invalid
  | Stripev2_error_address_country_identity_country_mismatch
  | Stripev2_error_address_postal_code_invalid
  | Stripev2_error_address_state_invalid
  | Stripev2_error_address_town_invalid
  | Stripev2_error_attach_payment_method_to_customer
  | Stripev2_error_bgn_bank_accounts_unsupported
  | Stripev2_error_can_create_platform_owned_onboarding_accounts_required
  | Stripev2_error_cannot_add_connect_due_to_incompatible_default_payout_method
  | Stripev2_error_cannot_use_validate_location_on_customer_create
  | Stripev2_error_capability_cannot_be_unrequested_due_to_other_capability_requirement
  | Stripev2_error_capability_not_available_for_dashboard_type
  | Stripev2_error_capability_not_available_for_entity_type_in_country
  | Stripev2_error_capability_not_available_for_loss_collector
  | Stripev2_error_capability_not_available_in_country
  | Stripev2_error_capability_not_available_in_platform_country
  | Stripev2_error_capability_not_available_without_other_capability
  | Stripev2_error_capability_not_available_without_other_capability_in_country
  | Stripev2_error_configuration_cannot_be_deactivated
  | Stripev2_error_configuration_cannot_be_deactivated_due_to_other_capability_requirement
  | Stripev2_error_configuration_cannot_be_deactivated_due_to_other_configuration
  | Stripev2_error_configuration_cannot_be_updated_while_deactivated
  | Stripev2_error_configuration_creation_invalid
  | Stripev2_error_cross_border_connected_account_creation_not_allowed
  | Stripev2_error_custom_account_beta
  | Stripev2_error_customer_invalid_tax_location
  | Stripev2_error_date_of_birth_age_restriction
  | Stripev2_error_date_of_birth_invalid
  | Stripev2_error_default_currency_immutable
  | Stripev2_error_default_outbound_destination_invalid
  | Stripev2_error_default_payment_method_invalid
  | Stripev2_error_document_invalid
  | Stripev2_error_document_purpose_invalid
  | Stripev2_error_duplicate_person_not_allowed
  | Stripev2_error_email_domain_invalid_for_recipient
  | Stripev2_error_email_invalid
  | Stripev2_error_entity_type_not_supported_in_country
  | Stripev2_error_high_risk_activities_none_cant_be_combined_with_other_options
  | Stripev2_error_id_number_invalid
  | Stripev2_error_idempotency_error
  | Stripev2_error_identity_country_required
  | Stripev2_error_immutable_identity_param
  | Stripev2_error_incompatible_default_payout_method
  | Stripev2_error_incorrect_id_number_for_country
  | Stripev2_error_incorrect_token_wrong_type
  | Stripev2_error_invalid_account_token
  | Stripev2_error_invalid_id_number_for_structure
  | Stripev2_error_invalid_id_number_registrar
  | Stripev2_error_invalid_konbini_payments_support_hours
  | Stripev2_error_invalid_konbini_payments_support_phone_number
  | Stripev2_error_invalid_sepa_creditor_id_format
  | Stripev2_error_invalid_timezone
  | Stripev2_error_ip_address_invalid
  | Stripev2_error_mcc_invalid
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_non_jp_kana_kanji_address
  | Stripev2_error_not_found
  | Stripev2_error_param_alongside_account_token
  | Stripev2_error_payout_method_incompatible_type
  | Stripev2_error_person_percent_ownership_invalid
  | Stripev2_error_phone_invalid
  | Stripev2_error_platform_registration_required
  | Stripev2_error_postal_code_required_for_jp_address
  | Stripev2_error_purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds
  | Stripev2_error_registration_date_invalid
  | Stripev2_error_script_characters_invalid
  | Stripev2_error_sepa_debit_creditor_identifier_not_allowed
  | Stripev2_error_sepa_debit_stripe_creditor_identifier
  | Stripev2_error_shipping_address_required
  | Stripev2_error_shipping_name_required
  | Stripev2_error_statement_descriptor_invalid
  | Stripev2_error_structure_incompatible_for_entity_type_country
  | Stripev2_error_test_clock_disallowed_on_live_mode
  | Stripev2_error_test_clock_invalid
  | Stripev2_error_token_already_used
  | Stripev2_error_token_expired
  | Stripev2_error_tos_acceptance_on_behalf_not_allowed
  | Stripev2_error_total_person_ownership_exceeded
  | Stripev2_error_unsupported_field_for_configs
  | Stripev2_error_unsupported_identity_field_for_configs
  | Stripev2_error_unsupported_postal_code
  | Stripev2_error_unsupported_state
  | Stripev2_error_url_invalid
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error_v1_token_invalid_in_v2
  | Stripev2_error;
export type PostV2CoreAccountsIdCloseInput = {
  readonly applied_configurations?: ReadonlyArray<
    "customer" | "merchant" | "recipient"
  >;
  readonly id: string;
};
export type PostV2CoreAccountsIdCloseOutput = Stripev2_core_account;
export type PostV2CoreAccountsIdCloseError =
  | Stripev2_error_account_not_yet_compatible_with_v2
  | Stripev2_error_account_rate_limit_exceeded
  | Stripev2_error_accounts_v2_access_blocked
  | Stripev2_error_cannot_delete_account_with_balance
  | Stripev2_error_cannot_delete_customer_with_available_cash_balance
  | Stripev2_error_configs_must_match_to_close
  | Stripev2_error_non_connect_platform_accounts_v2_access_blocked
  | Stripev2_error_not_found
  | Stripev2_error_pending_transactions_cannot_be_deleted
  | Stripev2_error_platform_registration_required
  | Stripev2_error_stripe_loss_liable_cannot_be_deleted
  | Stripev2_error_v1_account_instead_of_v2_account
  | Stripev2_error_v1_customer_instead_of_v2_account
  | Stripev2_error;

export const GetV2CoreAccountsInput = Schema.Struct({
  applied_configurations: Schema.optionalKey(
    Schema.Array(Schema.Literals(["customer", "merchant", "recipient"])),
  ),
  closed: Schema.optionalKey(Schema.Boolean),
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2CoreAccountsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_core_account).annotate({
      description: "A list of retrieved Account objects.",
    }),
    next_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the next page of the list. If there are no more pages, the value is null.",
      }),
      Schema.Null,
    ]),
    previous_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the previous page of the list. If there are no previous pages, the value is null.",
      }),
      Schema.Null,
    ]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);
export const GetV2CoreAccountsError = Schema.Union(
  [
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreAccountsInput = Schema.Struct({
  account_token: Schema.optionalKey(
    Schema.String.annotate({
      description: "The account token generated by the account token API.",
    }),
  ),
  configuration: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        customer: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              automatic_indirect_tax: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    exempt: Schema.optionalKey(
                      Schema.Literals(["exempt", "none", "reverse"]).annotate({
                        description:
                          'Describes the customer\'s tax exemption status, which is `none`, `exempt`, or `reverse`. When set to reverse, invoice and receipt PDFs include the following text: "Reverse charge".',
                      }),
                    ),
                    ip_address: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A recent IP address of the customer used for tax reporting and tax location inference.",
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
                    "Automatic indirect tax settings to be used when automatic tax calculation is enabled on the customer's invoices, subscriptions, checkout sessions, or payment links. Surfaces if automatic tax calculation is possible given the current customer location information.",
                }),
              ),
              billing: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    invoice: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          custom_fields: Schema.optionalKey(
                            Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  name: Schema.String.annotate({
                                    description:
                                      "The name of the custom field. This may be up to 40 characters.",
                                  }),
                                  value: Schema.String.annotate({
                                    description:
                                      "The value of the custom field. This may be up to 140 characters. When updating, pass an empty string to remove previously-defined values.",
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
                              ),
                            ).annotate({
                              description:
                                "The list of up to 4 default custom fields to be displayed on invoices for this customer.",
                            }),
                          ),
                          footer: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "Default invoice footer.",
                            }),
                          ),
                          next_sequence: Schema.optionalKey(
                            Schema.Number.annotate({
                              description:
                                "Sequence number to use on the customer account's next invoice. Defaults to 1.",
                            }).check(
                              Schema.isInt().annotate({
                                expected: "an integer",
                              }),
                            ),
                          ),
                          prefix: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Prefix used to generate unique invoice numbers. Must be 3-12 uppercase letters or numbers.",
                            }),
                          ),
                          rendering: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                amount_tax_display: Schema.optionalKey(
                                  Schema.Literals([
                                    "exclude_tax",
                                    "include_inclusive_tax",
                                  ]).annotate({
                                    description:
                                      "Indicates whether displayed line item prices and amounts on invoice PDFs include inclusive tax amounts. Must be either `include_inclusive_tax` or `exclude_tax`.",
                                  }),
                                ),
                                template: Schema.optionalKey(
                                  Schema.String.annotate({
                                    description:
                                      "ID of the invoice rendering template to use for future invoices.",
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
                                "Default invoice PDF rendering options.",
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
                          "Default invoice settings for the customer account.",
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
                    "Billing settings - default settings used for this customer in Billing flows such as Invoices and Subscriptions.",
                }),
              ),
              capabilities: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    automatic_indirect_tax: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Generates requirements for enabling automatic indirect tax calculation on this customer's invoices or subscriptions. Recommended to request this capability if planning to enable automatic tax calculation on this customer's invoices or subscriptions.",
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
                    "Capabilities that have been requested on the Customer Configuration.",
                }),
              ),
              shipping: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
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
                              description:
                                "State, county, province, or region.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ description: "Customer shipping address." }),
                    ),
                    name: Schema.optionalKey(
                      Schema.String.annotate({ description: "Customer name." }),
                    ),
                    phone: Schema.optionalKey(
                      Schema.String.annotate({
                        description: "Customer phone (including extension).",
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
                    "The customer's shipping information. Appears on invoices emailed to this customer.",
                }),
              ),
              test_clock: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "ID of the test clock to attach to the customer. Can only be set on testmode Accounts, and when the Customer Configuration is first set on an Account.",
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
              "The Customer Configuration allows the Account to be used in inbound payment flows (i.e. customer-facing payment and billing flows).",
          }),
        ),
        merchant: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bacs_debit_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    display_name: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "Display name for Bacs Direct Debit payments.",
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
                  description: "Settings used for Bacs debit payments.",
                }),
              ),
              branding: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    icon: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "ID of a [file upload](https://docs.stripe.com/api/files/create): An icon for the merchant. Must be square and at least 128px x 128px.",
                      }),
                    ),
                    logo: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "ID of a [file upload](https://docs.stripe.com/api/files/create): A logo for the merchant that will be used in Checkout instead of the icon and without the merchant's name next to it if provided. Must be at least 128px x 128px.",
                      }),
                    ),
                    primary_color: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A CSS hex color value representing the primary branding color for the merchant.",
                      }),
                    ),
                    secondary_color: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A CSS hex color value representing the secondary branding color for the merchant.",
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
                    "Settings used to apply the merchant's branding to email receipts, invoices, Checkout, and other products.",
                }),
              ),
              capabilities: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    ach_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process ACH debit payments.",
                      }),
                    ),
                    acss_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process ACSS debit payments.",
                      }),
                    ),
                    affirm_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Affirm payments.",
                      }),
                    ),
                    afterpay_clearpay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Afterpay/Clearpay payments.",
                      }),
                    ),
                    alma_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Alma payments.",
                      }),
                    ),
                    amazon_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Amazon Pay payments.",
                      }),
                    ),
                    au_becs_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Australian BECS Direct Debit payments.",
                      }),
                    ),
                    bacs_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process BACS Direct Debit payments.",
                      }),
                    ),
                    bancontact_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Bancontact payments.",
                      }),
                    ),
                    blik_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process BLIK payments.",
                      }),
                    ),
                    blik_recurring_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process recurring BLIK payments.",
                      }),
                    ),
                    boleto_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Boleto payments.",
                      }),
                    ),
                    card_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to collect card payments.",
                      }),
                    ),
                    cartes_bancaires_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Cartes Bancaires payments.",
                      }),
                    ),
                    cashapp_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Cash App payments.",
                      }),
                    ),
                    eps_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process EPS payments.",
                      }),
                    ),
                    fpx_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process FPX payments.",
                      }),
                    ),
                    gb_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process UK bank transfer payments.",
                      }),
                    ),
                    grabpay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process GrabPay payments.",
                      }),
                    ),
                    ideal_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process iDEAL payments.",
                      }),
                    ),
                    jcb_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process JCB card payments.",
                      }),
                    ),
                    jp_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Japanese bank transfer payments.",
                      }),
                    ),
                    kakao_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Kakao Pay payments.",
                      }),
                    ),
                    klarna_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Klarna payments.",
                      }),
                    ),
                    konbini_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Konbini convenience store payments.",
                      }),
                    ),
                    kr_card_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Korean card payments.",
                      }),
                    ),
                    link_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Link payments.",
                      }),
                    ),
                    mobilepay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process MobilePay payments.",
                      }),
                    ),
                    multibanco_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Multibanco payments.",
                      }),
                    ),
                    mx_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Mexican bank transfer payments.",
                      }),
                    ),
                    naver_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Naver Pay payments.",
                      }),
                    ),
                    oxxo_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process OXXO payments.",
                      }),
                    ),
                    p24_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Przelewy24 (P24) payments.",
                      }),
                    ),
                    pay_by_bank_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Pay by Bank payments.",
                      }),
                    ),
                    payco_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process PAYCO payments.",
                      }),
                    ),
                    paynow_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process PayNow payments.",
                      }),
                    ),
                    promptpay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process PromptPay payments.",
                      }),
                    ),
                    revolut_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Revolut Pay payments.",
                      }),
                    ),
                    samsung_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Samsung Pay payments.",
                      }),
                    ),
                    satispay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Satispay payments.",
                      }),
                    ),
                    sepa_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process SEPA bank transfer payments.",
                      }),
                    ),
                    sepa_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process SEPA Direct Debit payments.",
                      }),
                    ),
                    sequra_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process SeQura payments.",
                      }),
                    ),
                    sunbit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Sunbit payments.",
                      }),
                    ),
                    swish_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Swish payments.",
                      }),
                    ),
                    twint_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process TWINT payments.",
                      }),
                    ),
                    us_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process US bank transfer payments.",
                      }),
                    ),
                    zip_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Allow the merchant to process Zip payments.",
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
                    "Capabilities to request on the Merchant Configuration.",
                }),
              ),
              card_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    decline_on: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          avs_failure: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "Whether Stripe automatically declines charges with an incorrect ZIP or postal code. This setting only applies when a ZIP or postal code is provided and they fail bank verification.",
                            }),
                          ),
                          cvc_failure: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "Whether Stripe automatically declines charges with an incorrect CVC. This setting only applies when a CVC is provided and it fails bank verification.",
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
                          "Automatically declines certain charge types regardless of whether the card issuer accepted or declined the charge.",
                      }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ description: "Card payments settings." }),
              ),
              konbini_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    support: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          email: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Support email address for Konbini payments.",
                            }),
                          ),
                          hours: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                end_time: Schema.optionalKey(
                                  Schema.String.annotate({
                                    description:
                                      "Support hours end time (JST time of day) for in `HH:MM` format.",
                                  }),
                                ),
                                start_time: Schema.optionalKey(
                                  Schema.String.annotate({
                                    description:
                                      "Support hours start time (JST time of day) for in `HH:MM` format.",
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
                                "Support hours for Konbini payments.",
                            }),
                          ),
                          phone: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Support phone number for Konbini payments.",
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
                        description: "Support for Konbini payments.",
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
                    "Settings specific to Konbini payments on the account.",
                }),
              ),
              mcc: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The Merchant Category Code (MCC) for the Merchant Configuration. MCCs classify businesses based on the goods or services they provide.",
                }),
              ),
              script_statement_descriptor: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    kana: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          descriptor: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don’t set a statement_descriptor_prefix, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the statement_descriptor text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
                            }),
                          ),
                          prefix: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Default text that appears on statements for card charges outside of Japan, prefixing any dynamic statement_descriptor_suffix specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don’t specify this value, statement_descriptor is used as the prefix. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
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
                          "The Kana variation of statement_descriptor used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).",
                      }),
                    ),
                    kanji: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          descriptor: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don’t set a statement_descriptor_prefix, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the statement_descriptor text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
                            }),
                          ),
                          prefix: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Default text that appears on statements for card charges outside of Japan, prefixing any dynamic statement_descriptor_suffix specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don’t specify this value, statement_descriptor is used as the prefix. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
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
                          "The Kanji variation of statement_descriptor used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).",
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
                    "Settings for the default text that appears on statements for language variations.",
                }),
              ),
              sepa_debit_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    creditor_id: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "Creditor ID for SEPA Direct Debit payments.",
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
                  description: "Settings used for SEPA Direct Debit payments.",
                }),
              ),
              statement_descriptor: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    descriptor: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don’t set a statement_descriptor_prefix, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the statement_descriptor text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
                      }),
                    ),
                    prefix: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "Default text that appears on statements for card charges outside of Japan, prefixing any dynamic statement_descriptor_suffix specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don’t specify this value, statement_descriptor is used as the prefix. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
                      }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ description: "Statement descriptor." }),
              ),
              support: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    address: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          city: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "City, district, suburb, town, or village.",
                            }),
                          ),
                          country: Schema.String.annotate({
                            description:
                              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                          }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "A publicly available mailing address for sending support issues to.",
                      }),
                    ),
                    email: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A publicly available email address for sending support issues to.",
                      }),
                    ),
                    phone: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A publicly available phone number to call with support issues.",
                      }),
                    ),
                    url: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A publicly available website for handling support issues.",
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
                    "Publicly available contact information for sending support issues to.",
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
              "Enables the Account to act as a connected account and collect payments facilitated by a Connect platform. You must onboard your platform to Connect before you can add this configuration to your connected accounts. Utilize this configuration when the Account will be the Merchant of Record, like with Direct charges or Destination Charges with on_behalf_of set.",
          }),
        ),
        recipient: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              capabilities: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    bank_accounts: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          ach: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over ACH rails.",
                            }),
                          ),
                          fedwire: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over Fedwire or CHIPS.",
                            }),
                          ),
                          fps: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over FPS rails.",
                            }),
                          ),
                          local: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over local networks.",
                            }),
                          ),
                          rtp: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over RTP rails.",
                            }),
                          ),
                          sepa: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over SEPA rails.",
                            }),
                          ),
                          swift: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over SWIFT.",
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
                          "Capabilities that enable OutboundPayments to a bank account linked to this Account.",
                      }),
                    ),
                    cards: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.Boolean.annotate({
                            description:
                              "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
                          }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "Capabilities that enable OutboundPayments to a card linked to this Account.",
                      }),
                    ),
                    stripe_balance: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          stripe_transfers: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.Boolean.annotate({
                                  description:
                                    "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive /v1/transfers into their Stripe Balance (/v1/balance).",
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
                          "Capabilities that enable the recipient to manage their Stripe Balance (/v1/balance).",
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
                    "Capabilities to be requested on the Recipient Configuration.",
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
              "The Recipient Configuration allows the Account to receive funds. Utilize this configuration if the Account will not be the Merchant of Record, like with Separate Charges & Transfers, or Destination Charges without on_behalf_of set.",
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
        "An Account Configuration which allows the Account to take on a key persona across Stripe products.",
    }),
  ),
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
  dashboard: Schema.optionalKey(
    Schema.Literals(["express", "full", "none"]).annotate({
      description:
        "A value indicating the Stripe dashboard this Account has access to. This will depend on which configurations are enabled for this account.",
    }),
  ),
  defaults: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        currency: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          }),
        ),
        locales: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "ar-SA",
              "bg",
              "bg-BG",
              "cs",
              "cs-CZ",
              "da",
              "da-DK",
              "de",
              "de-DE",
              "el",
              "el-GR",
              "en",
              "en-AU",
              "en-CA",
              "en-GB",
              "en-IE",
              "en-IN",
              "en-NZ",
              "en-SG",
              "en-US",
              "es",
              "es-419",
              "es-ES",
              "et",
              "et-EE",
              "fi",
              "fil",
              "fil-PH",
              "fi-FI",
              "fr",
              "fr-CA",
              "fr-FR",
              "he-IL",
              "hr",
              "hr-HR",
              "hu",
              "hu-HU",
              "id",
              "id-ID",
              "it",
              "it-IT",
              "ja",
              "ja-JP",
              "ko",
              "ko-KR",
              "lt",
              "lt-LT",
              "lv",
              "lv-LV",
              "ms",
              "ms-MY",
              "mt",
              "mt-MT",
              "nb",
              "nb-NO",
              "nl",
              "nl-NL",
              "pl",
              "pl-PL",
              "pt",
              "pt-BR",
              "pt-PT",
              "ro",
              "ro-RO",
              "ru",
              "ru-RU",
              "sk",
              "sk-SK",
              "sl",
              "sl-SI",
              "sv",
              "sv-SE",
              "th",
              "th-TH",
              "tr",
              "tr-TR",
              "vi",
              "vi-VN",
              "zh",
              "zh-Hans",
              "zh-Hant-HK",
              "zh-Hant-TW",
              "zh-HK",
              "zh-TW",
            ]),
          ).annotate({
            description:
              "The Account's preferred locales (languages), ordered by preference.",
          }),
        ),
        profile: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              business_url: Schema.optionalKey(
                Schema.String.annotate({
                  description: "The business's publicly-available website.",
                }),
              ),
              doing_business_as: Schema.optionalKey(
                Schema.String.annotate({
                  description: "The name which is used by the business.",
                }),
              ),
              product_description: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "Internal-only description of the product sold or service provided by the business. It's used by Stripe for risk and underwriting purposes.",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Account profile information." }),
        ),
        responsibilities: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              fees_collector: Schema.Literals([
                "application",
                "application_custom",
                "application_express",
                "stripe",
              ]).annotate({
                description:
                  "A value indicating the party responsible for collecting fees from this account.",
              }),
              losses_collector: Schema.Literals([
                "application",
                "stripe",
              ]).annotate({
                description:
                  "A value indicating who is responsible for losses when this Account can’t pay back negative balances from payments.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({
            description:
              "Default responsibilities held by either Stripe or the platform.",
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
      description: "Default values to be used on Account Configurations.",
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
                    date: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The time marking when the director attestation was made. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                        format: "date-time",
                      }),
                    ),
                    ip: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The IP address from which the director attestation was made.",
                      }),
                    ),
                    user_agent: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The user agent of the browser from which the director attestation was made.",
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
                    "This hash is used to attest that the directors information provided to Stripe is both current and correct.",
                }),
              ),
              ownership_declaration: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    date: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The time marking when the beneficial owner attestation was made. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                        format: "date-time",
                      }),
                    ),
                    ip: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The IP address from which the beneficial owner attestation was made.",
                      }),
                    ),
                    user_agent: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The user agent of the browser from which the beneficial owner attestation was made.",
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
                    "This hash is used to attest that the beneficial owner information provided to Stripe is both current and correct.",
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
                    date: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The time marking when the representative attestation was made. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                        format: "date-time",
                      }),
                    ),
                    ip: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The IP address from which the representative attestation was made.",
                      }),
                    ),
                    user_agent: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The user agent of the browser from which the representative attestation was made.",
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
                    "This hash is used to attest that the representative is authorized to act as the representative of their legal entity.",
                }),
              ),
              terms_of_service: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          date: Schema.String.annotate({
                            description:
                              "The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                            format: "date-time",
                          }),
                          ip: Schema.String.annotate({
                            description:
                              "The IP address from which the Account's representative accepted the terms of service.",
                          }),
                          user_agent: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The user agent of the browser from which the Account's representative accepted the terms of service.",
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
                          "Details on the Account's acceptance of the Stripe Services Agreement.",
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
                    country: Schema.String.annotate({
                      description:
                        "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                    }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                              front: Schema.String.annotate({
                                description:
                                  "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                                  description: "Person signing the document.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "One or more documents showing the company's proof of registration with the national business registry.",
                      }),
                    ),
                    proof_of_ultimate_beneficial_ownership: Schema.optionalKey(
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
                                  description: "Person signing the document.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
                      description: "The day of registration, between 1 and 31.",
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
                          country: Schema.String.annotate({
                            description:
                              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                          }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                          country: Schema.String.annotate({
                            description:
                              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                          }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                              description: "Registered name of the business.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ description: "Kana name." }),
                    ),
                    kanji: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          registered_name: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "Registered name of the business.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                  description: "The business legal name in non latin script.",
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
        country: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The country in which the account holder resides, or in which the business is legally established. This should be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.",
          }),
        ),
        entity_type: Schema.optionalKey(
          Schema.Literals([
            "company",
            "government_entity",
            "individual",
            "non_profit",
          ]).annotate({
            description:
              "The entity type represented by the Account. Ensure this field is accurate before adding configurations that rely on identity information, as it determines which identity fields apply and how the Account is validated.",
          }),
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
                      country: Schema.String.annotate({
                        description:
                          "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                      }),
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
                      purpose: Schema.Literals(["alias", "maiden"]).annotate({
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
                    country: Schema.String.annotate({
                      description:
                        "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                    }),
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
                      description: "The day of birth.",
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
                ).annotate({ description: "The individual's date of birth." }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                              front: Schema.String.annotate({
                                description:
                                  "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                              front: Schema.String.annotate({
                                description:
                                  "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Record(Schema.String, Schema.String).annotate({
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
                          country: Schema.String.annotate({
                            description:
                              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                          }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                          country: Schema.String.annotate({
                            description:
                              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
                          }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                              description: "The person's first or given name.",
                            }),
                          ),
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
                      ).annotate({
                        description: "Persons name in kana script.",
                      }),
                    ),
                    kanji: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          given_name: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "The person's first or given name.",
                            }),
                          ),
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
  include: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "configuration.customer",
        "configuration.merchant",
        "configuration.recipient",
        "defaults",
        "future_requirements",
        "identity",
        "requirements",
      ]),
    ).annotate({
      description: "Additional fields to include in the response.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
  ),
});
export const PostV2CoreAccountsOutput = Stripev2_core_account;
export const PostV2CoreAccountsError = Schema.Union(
  [
    Stripev2_error_account_capability_not_supported,
    Stripev2_error_account_configuration_not_supported,
    Stripev2_error_account_controller_express_dash_without_application_losses_or_fees,
    Stripev2_error_account_controller_stripe_pricing_platform_liable,
    Stripev2_error_account_controller_ua_unsupported_configuration,
    Stripev2_error_account_controller_unsupported_configuration,
    Stripev2_error_account_controller_unsupported_configuration_private_preview,
    Stripev2_error_account_country_unsupported_currency,
    Stripev2_error_account_create_activation_required,
    Stripev2_error_account_creation_blocked_due_to_suspicious_activity,
    Stripev2_error_account_creation_identity_verification_incomplete,
    Stripev2_error_account_creation_invalid,
    Stripev2_error_account_creation_liability_unacknowledged,
    Stripev2_error_account_creation_liability_unacknowledged_and_identity_verification_incomplete,
    Stripev2_error_account_creation_losses_collector_unavailable,
    Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged,
    Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete,
    Stripev2_error_account_creation_requirement_collection_unacknowledged,
    Stripev2_error_account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_account_terms_of_service_not_accepted,
    Stripev2_error_account_token_required,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_address_characters_invalid,
    Stripev2_error_address_country_identity_country_mismatch,
    Stripev2_error_address_postal_code_invalid,
    Stripev2_error_address_state_invalid,
    Stripev2_error_address_town_invalid,
    Stripev2_error_bgn_bank_accounts_unsupported,
    Stripev2_error_can_create_platform_owned_onboarding_accounts_required,
    Stripev2_error_cannot_create_connected_account,
    Stripev2_error_cannot_create_new_account_rejected,
    Stripev2_error_capability_cannot_be_unrequested_due_to_other_capability_requirement,
    Stripev2_error_capability_not_available_for_dashboard_type,
    Stripev2_error_capability_not_available_for_entity_type_in_country,
    Stripev2_error_capability_not_available_for_loss_collector,
    Stripev2_error_capability_not_available_in_country,
    Stripev2_error_capability_not_available_in_platform_country,
    Stripev2_error_capability_not_available_without_other_capability,
    Stripev2_error_capability_not_available_without_other_capability_in_country,
    Stripev2_error_configuration_creation_invalid,
    Stripev2_error_connect_identity_not_verified,
    Stripev2_error_connect_profile_not_submitted,
    Stripev2_error_cross_border_connected_account_creation_not_allowed,
    Stripev2_error_custom_account_beta,
    Stripev2_error_date_of_birth_age_restriction,
    Stripev2_error_date_of_birth_invalid,
    Stripev2_error_default_currency_immutable,
    Stripev2_error_default_payment_method_invalid,
    Stripev2_error_default_payment_method_invalid_type,
    Stripev2_error_directorship_declaration_not_allowed_during_account_creation,
    Stripev2_error_document_invalid,
    Stripev2_error_document_purpose_invalid,
    Stripev2_error_email_domain_invalid_for_recipient,
    Stripev2_error_email_invalid,
    Stripev2_error_entity_type_not_supported_in_country,
    Stripev2_error_high_risk_activities_none_cant_be_combined_with_other_options,
    Stripev2_error_id_number_invalid,
    Stripev2_error_idempotency_error,
    Stripev2_error_identity_country_required,
    Stripev2_error_incorrect_id_number_for_country,
    Stripev2_error_incorrect_token_wrong_type,
    Stripev2_error_invalid_account_token,
    Stripev2_error_invalid_id_number_for_structure,
    Stripev2_error_invalid_id_number_registrar,
    Stripev2_error_invalid_konbini_payments_support_hours,
    Stripev2_error_invalid_konbini_payments_support_phone_number,
    Stripev2_error_invalid_sepa_creditor_id_format,
    Stripev2_error_invalid_timezone,
    Stripev2_error_invoice_rendering_template_invalid,
    Stripev2_error_ip_address_invalid,
    Stripev2_error_mcc_invalid,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_non_jp_kana_kanji_address,
    Stripev2_error_ownership_declaration_not_allowed_during_account_creation,
    Stripev2_error_param_alongside_account_token,
    Stripev2_error_person_percent_ownership_invalid,
    Stripev2_error_phone_invalid,
    Stripev2_error_platform_registration_required,
    Stripev2_error_postal_code_required_for_jp_address,
    Stripev2_error_purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds,
    Stripev2_error_registration_date_invalid,
    Stripev2_error_script_characters_invalid,
    Stripev2_error_sepa_debit_creditor_identifier_not_allowed,
    Stripev2_error_sepa_debit_stripe_creditor_identifier,
    Stripev2_error_shipping_address_required,
    Stripev2_error_shipping_name_required,
    Stripev2_error_statement_descriptor_invalid,
    Stripev2_error_structure_incompatible_for_entity_type_country,
    Stripev2_error_test_clock_disallowed_on_live_mode,
    Stripev2_error_test_clock_invalid,
    Stripev2_error_test_clocks_advance_in_progress,
    Stripev2_error_test_clocks_customer_limit_reached,
    Stripev2_error_token_already_used,
    Stripev2_error_token_expired,
    Stripev2_error_tos_acceptance_on_behalf_not_allowed,
    Stripev2_error_unsupported_field_for_configs,
    Stripev2_error_unsupported_identity_field_for_configs,
    Stripev2_error_unsupported_postal_code,
    Stripev2_error_unsupported_state,
    Stripev2_error_url_invalid,
    Stripev2_error_v1_token_invalid_in_v2,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreAccountsAccountIdPersonTokensInput = Schema.Struct({
  additional_addresses: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          city: Schema.optionalKey(
            Schema.String.annotate({
              description: "City, district, suburb, town, or village.",
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
            Schema.String.annotate({ description: "ZIP or postal code." }),
          ),
          purpose: Schema.Literal("registered").annotate({
            description: "Purpose of additional address.",
          }),
          state: Schema.optionalKey(
            Schema.String.annotate({
              description: "State, county, province, or region.",
            }),
          ),
          town: Schema.optionalKey(
            Schema.String.annotate({ description: "Town or district." }),
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
      description: "Additional addresses associated with the person.",
    }),
  ),
  additional_names: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          full_name: Schema.optionalKey(
            Schema.String.annotate({ description: "The person's full name." }),
          ),
          given_name: Schema.optionalKey(
            Schema.String.annotate({
              description: "The person's first or given name.",
            }),
          ),
          purpose: Schema.Literals(["alias", "maiden"]).annotate({
            description: "The purpose or type of the additional name.",
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
        "Additional names (e.g. aliases) associated with the person.",
    }),
  ),
  additional_terms_of_service: Schema.optionalKey(
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
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({
            description:
              "Details on the Person's acceptance of the [Stripe Services Agreement]; IP, date, and User Agent are expanded by Stripe.",
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
      description: "Attestations of accepted terms of service agreements.",
    }),
  ),
  address: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        city: Schema.optionalKey(
          Schema.String.annotate({
            description: "City, district, suburb, town, or village.",
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
          Schema.String.annotate({ description: "ZIP or postal code." }),
        ),
        state: Schema.optionalKey(
          Schema.String.annotate({
            description: "State, county, province, or region.",
          }),
        ),
        town: Schema.optionalKey(
          Schema.String.annotate({ description: "Town or district." }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "The person's residential address." }),
  ),
  date_of_birth: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        day: Schema.Number.annotate({
          description: "The day of the birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        month: Schema.Number.annotate({
          description: "The month of birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        year: Schema.Number.annotate({
          description: "The year of birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "The person's date of birth." }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                    Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                    Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
  email: Schema.optionalKey(Schema.String.annotate({ description: "Email." })),
  given_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's first name." }),
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
          ]).annotate({ description: "The ID number type of an individual." }),
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
        "The identification numbers (e.g., SSN) associated with the person.",
    }),
  ),
  legal_gender: Schema.optionalKey(
    Schema.Literals(["female", "male"]).annotate({
      description:
        'The person\'s gender (International regulations require either "male" or "female").',
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
        "The nationalities (countries) this person is associated with.",
    }),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({
      description: "The phone number for this person.",
    }),
  ),
  political_exposure: Schema.optionalKey(
    Schema.Literals(["existing", "none"]).annotate({
      description: "The person's political exposure.",
    }),
  ),
  relationship: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        authorizer: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the individual is an authorizer of the Account's identity.",
          }),
        ),
        director: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a director of the associated legal entity.",
          }),
        ),
        executive: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is an executive of the associated legal entity.",
          }),
        ),
        legal_guardian: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a legal guardian of the associated legal entity.",
          }),
        ),
        owner: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is an owner of the associated legal entity.",
          }),
        ),
        percent_ownership: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The percentage of ownership the person has in the associated legal entity.",
            format: "decimal",
          }),
        ),
        representative: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a representative of the associated legal entity.",
          }),
        ),
        title: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The title or position the person holds in the associated legal entity.",
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
        "The relationship that this person has with the Account's business or legal entity.",
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
                  description: "City, district, suburb, town, or village.",
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
                Schema.String.annotate({ description: "ZIP or postal code." }),
              ),
              state: Schema.optionalKey(
                Schema.String.annotate({
                  description: "State, county, province, or region.",
                }),
              ),
              town: Schema.optionalKey(
                Schema.String.annotate({ description: "Town or district." }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Kana Address." }),
        ),
        kanji: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              city: Schema.optionalKey(
                Schema.String.annotate({
                  description: "City, district, suburb, town, or village.",
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
                Schema.String.annotate({ description: "ZIP or postal code." }),
              ),
              state: Schema.optionalKey(
                Schema.String.annotate({
                  description: "State, county, province, or region.",
                }),
              ),
              town: Schema.optionalKey(
                Schema.String.annotate({ description: "Town or district." }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
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
        "The script addresses (e.g., non-Latin characters) associated with the person.",
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
                  description: "The person's first or given name.",
                }),
              ),
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
          ).annotate({ description: "Persons name in kana script." }),
        ),
        kanji: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              given_name: Schema.optionalKey(
                Schema.String.annotate({
                  description: "The person's first or given name.",
                }),
              ),
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
          ).annotate({ description: "Persons name in kanji script." }),
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
        "The script names (e.g. non-Latin characters) associated with the person.",
    }),
  ),
  surname: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's last name." }),
  ),
  account_id: Schema.String,
});
export const PostV2CoreAccountsAccountIdPersonTokensOutput =
  Stripev2_core_account_person_token;
export const PostV2CoreAccountsAccountIdPersonTokensError = Schema.Union(
  [
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_platform_registration_required,
    Stripev2_error_token_must_be_created_with_publishable_key,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2CoreAccountsAccountIdPersonTokensIdInput = Schema.Struct({
  account_id: Schema.String,
  id: Schema.String,
});
export const GetV2CoreAccountsAccountIdPersonTokensIdOutput =
  Stripev2_core_account_person_token;
export const GetV2CoreAccountsAccountIdPersonTokensIdError = Schema.Union(
  [
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_not_found,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2CoreAccountsAccountIdPersonsInput = Schema.Struct({
  account_id: Schema.String,
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2CoreAccountsAccountIdPersonsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_core_account_person).annotate({
      description: "A list of retrieved Person objects.",
    }),
    next_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the next page of the list. If there are no more pages, the value is null.",
      }),
      Schema.Null,
    ]),
    previous_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the previous page of the list. If there are no previous pages, the value is null.",
      }),
      Schema.Null,
    ]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);
export const GetV2CoreAccountsAccountIdPersonsError = Schema.Union(
  [
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreAccountsAccountIdPersonsInput = Schema.Struct({
  additional_addresses: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          city: Schema.optionalKey(
            Schema.String.annotate({
              description: "City, district, suburb, town, or village.",
            }),
          ),
          country: Schema.String.annotate({
            description:
              "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
          }),
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
            Schema.String.annotate({ description: "ZIP or postal code." }),
          ),
          purpose: Schema.Literal("registered").annotate({
            description: "Purpose of additional address.",
          }),
          state: Schema.optionalKey(
            Schema.String.annotate({
              description: "State, county, province, or region.",
            }),
          ),
          town: Schema.optionalKey(
            Schema.String.annotate({ description: "Town or district." }),
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
      description: "Additional addresses associated with the person.",
    }),
  ),
  additional_names: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          full_name: Schema.optionalKey(
            Schema.String.annotate({ description: "The person's full name." }),
          ),
          given_name: Schema.optionalKey(
            Schema.String.annotate({
              description: "The person's first or given name.",
            }),
          ),
          purpose: Schema.Literals(["alias", "maiden"]).annotate({
            description: "The purpose or type of the additional name.",
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
        "Additional names (e.g. aliases) associated with the person.",
    }),
  ),
  additional_terms_of_service: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              date: Schema.String.annotate({
                description:
                  "The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                format: "date-time",
              }),
              ip: Schema.String.annotate({
                description:
                  "The IP address from which the Account's representative accepted the terms of service.",
              }),
              user_agent: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The user agent of the browser from which the Account's representative accepted the terms of service.",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Stripe terms of service agreement." }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      description: "Attestations of accepted terms of service agreements.",
    }),
  ),
  address: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        city: Schema.optionalKey(
          Schema.String.annotate({
            description: "City, district, suburb, town, or village.",
          }),
        ),
        country: Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }),
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
          Schema.String.annotate({ description: "ZIP or postal code." }),
        ),
        state: Schema.optionalKey(
          Schema.String.annotate({
            description: "State, county, province, or region.",
          }),
        ),
        town: Schema.optionalKey(
          Schema.String.annotate({ description: "Town or district." }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "The person's residential address." }),
  ),
  date_of_birth: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        day: Schema.Number.annotate({ description: "The day of birth." }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        month: Schema.Number.annotate({
          description: "The month of birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        year: Schema.Number.annotate({
          description: "The year of birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "The person's date of birth." }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                  front: Schema.String.annotate({
                    description:
                      "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
                  }),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                  front: Schema.String.annotate({
                    description:
                      "A [file upload](https://docs.stripe.com/api/files/create) token representing the front of the verification document. The purpose of the uploaded file should be 'identity_document'. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.",
                  }),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
  email: Schema.optionalKey(Schema.String.annotate({ description: "Email." })),
  given_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's first name." }),
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
          ]).annotate({ description: "The ID number type of an individual." }),
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
        "The identification numbers (e.g., SSN) associated with the person.",
    }),
  ),
  legal_gender: Schema.optionalKey(
    Schema.Literals(["female", "male"]).annotate({
      description:
        'The person\'s gender (International regulations require either "male" or "female").',
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
  ),
  nationalities: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "The nationalities (countries) this person is associated with.",
    }),
  ),
  person_token: Schema.optionalKey(
    Schema.String.annotate({
      description: "The person token generated by the person token api.",
    }),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({
      description: "The phone number for this person.",
    }),
  ),
  political_exposure: Schema.optionalKey(
    Schema.Literals(["existing", "none"]).annotate({
      description: "The person's political exposure.",
    }),
  ),
  relationship: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        authorizer: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the individual is an authorizer of the Account's identity.",
          }),
        ),
        director: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a director of the associated legal entity.",
          }),
        ),
        executive: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is an executive of the associated legal entity.",
          }),
        ),
        legal_guardian: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a legal guardian of the associated legal entity.",
          }),
        ),
        owner: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is an owner of the associated legal entity.",
          }),
        ),
        percent_ownership: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The percentage of ownership the person has in the associated legal entity.",
            format: "decimal",
          }),
        ),
        representative: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a representative of the associated legal entity.",
          }),
        ),
        title: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The title or position the person holds in the associated legal entity.",
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
        "The relationship that this person has with the Account's business or legal entity.",
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
                  description: "City, district, suburb, town, or village.",
                }),
              ),
              country: Schema.String.annotate({
                description:
                  "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
              }),
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
                Schema.String.annotate({ description: "ZIP or postal code." }),
              ),
              state: Schema.optionalKey(
                Schema.String.annotate({
                  description: "State, county, province, or region.",
                }),
              ),
              town: Schema.optionalKey(
                Schema.String.annotate({ description: "Town or district." }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Kana Address." }),
        ),
        kanji: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              city: Schema.optionalKey(
                Schema.String.annotate({
                  description: "City, district, suburb, town, or village.",
                }),
              ),
              country: Schema.String.annotate({
                description:
                  "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
              }),
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
                Schema.String.annotate({ description: "ZIP or postal code." }),
              ),
              state: Schema.optionalKey(
                Schema.String.annotate({
                  description: "State, county, province, or region.",
                }),
              ),
              town: Schema.optionalKey(
                Schema.String.annotate({ description: "Town or district." }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
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
        "The script addresses (e.g., non-Latin characters) associated with the person.",
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
                  description: "The person's first or given name.",
                }),
              ),
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
          ).annotate({ description: "Persons name in kana script." }),
        ),
        kanji: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              given_name: Schema.optionalKey(
                Schema.String.annotate({
                  description: "The person's first or given name.",
                }),
              ),
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
          ).annotate({ description: "Persons name in kanji script." }),
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
        "The script names (e.g. non-Latin characters) associated with the person.",
    }),
  ),
  surname: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's last name." }),
  ),
  account_id: Schema.String,
});
export const PostV2CoreAccountsAccountIdPersonsOutput =
  Stripev2_core_account_person;
export const PostV2CoreAccountsAccountIdPersonsError = Schema.Union(
  [
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_additional_legal_guardian_not_allowed,
    Stripev2_error_additional_representative_not_allowed,
    Stripev2_error_additional_tos_only_allowed_for_legal_guardian,
    Stripev2_error_address_characters_invalid,
    Stripev2_error_address_country_identity_country_mismatch,
    Stripev2_error_address_country_mismatch,
    Stripev2_error_address_country_required,
    Stripev2_error_address_postal_code_invalid,
    Stripev2_error_address_state_invalid,
    Stripev2_error_address_town_invalid,
    Stripev2_error_authorizer_duplicate,
    Stripev2_error_authorizer_relationship_invalid_for_representative,
    Stripev2_error_date_of_birth_age_restriction,
    Stripev2_error_date_of_birth_invalid,
    Stripev2_error_document_invalid,
    Stripev2_error_document_purpose_invalid,
    Stripev2_error_duplicate_person_not_allowed,
    Stripev2_error_email_domain_invalid_for_recipient,
    Stripev2_error_email_invalid,
    Stripev2_error_id_number_invalid,
    Stripev2_error_identity_country_required,
    Stripev2_error_incorrect_account_for_person_token,
    Stripev2_error_incorrect_id_number_for_country,
    Stripev2_error_incorrect_token_wrong_type,
    Stripev2_error_individual_additional_person_not_allowed,
    Stripev2_error_invalid_person_token,
    Stripev2_error_invalid_relationship_for_identity_type_structure_and_country,
    Stripev2_error_ip_address_invalid,
    Stripev2_error_legal_guardian_representative_not_allowed,
    Stripev2_error_legal_guardian_requires_existing_representative,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_non_jp_kana_kanji_address,
    Stripev2_error_param_alongside_person_token,
    Stripev2_error_person_percent_ownership_invalid,
    Stripev2_error_person_token_required,
    Stripev2_error_phone_invalid,
    Stripev2_error_platform_registration_required,
    Stripev2_error_postal_code_required_for_jp_address,
    Stripev2_error_script_characters_invalid,
    Stripev2_error_token_already_used,
    Stripev2_error_token_expired,
    Stripev2_error_total_person_ownership_exceeded,
    Stripev2_error_unsupported_postal_code,
    Stripev2_error_unsupported_state,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error_v1_token_invalid_in_v2,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2CoreAccountsAccountIdPersonsIdInput = Schema.Struct({
  account_id: Schema.String,
  id: Schema.String,
});
export const GetV2CoreAccountsAccountIdPersonsIdOutput =
  Stripev2_core_account_person;
export const GetV2CoreAccountsAccountIdPersonsIdError = Schema.Union(
  [
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_not_found,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreAccountsAccountIdPersonsIdInput = Schema.Struct({
  additional_addresses: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          city: Schema.optionalKey(
            Schema.String.annotate({
              description: "City, district, suburb, town, or village.",
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
            Schema.String.annotate({ description: "ZIP or postal code." }),
          ),
          purpose: Schema.Literal("registered").annotate({
            description: "Purpose of additional address.",
          }),
          state: Schema.optionalKey(
            Schema.String.annotate({
              description: "State, county, province, or region.",
            }),
          ),
          town: Schema.optionalKey(
            Schema.String.annotate({ description: "Town or district." }),
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
      description: "Additional addresses associated with the person.",
    }),
  ),
  additional_names: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          full_name: Schema.optionalKey(
            Schema.String.annotate({ description: "The person's full name." }),
          ),
          given_name: Schema.optionalKey(
            Schema.String.annotate({
              description: "The person's first or given name.",
            }),
          ),
          purpose: Schema.Literals(["alias", "maiden"]).annotate({
            description: "The purpose or type of the additional name.",
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
        "Additional names (e.g. aliases) associated with the person.",
    }),
  ),
  additional_terms_of_service: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              date: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                  format: "date-time",
                }),
              ),
              ip: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The IP address from which the Account's representative accepted the terms of service.",
                }),
              ),
              user_agent: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The user agent of the browser from which the Account's representative accepted the terms of service.",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Stripe terms of service agreement." }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      description: "Attestations of accepted terms of service agreements.",
    }),
  ),
  address: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        city: Schema.optionalKey(
          Schema.String.annotate({
            description: "City, district, suburb, town, or village.",
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
          Schema.String.annotate({ description: "ZIP or postal code." }),
        ),
        state: Schema.optionalKey(
          Schema.String.annotate({
            description: "State, county, province, or region.",
          }),
        ),
        town: Schema.optionalKey(
          Schema.String.annotate({ description: "Town or district." }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      description: "The primary address associated with the person.",
    }),
  ),
  date_of_birth: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        day: Schema.Number.annotate({
          description: "The day of the birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        month: Schema.Number.annotate({
          description: "The month of birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        year: Schema.Number.annotate({
          description: "The year of birth.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "The person's date of birth." }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                    Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                    Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
                Schema.Json.annotate({ expected: "JSON value" }),
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
  email: Schema.optionalKey(Schema.String.annotate({ description: "Email." })),
  given_name: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's first name." }),
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
          ]).annotate({ description: "The ID number type of an individual." }),
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
        "The identification numbers (e.g., SSN) associated with the person.",
    }),
  ),
  legal_gender: Schema.optionalKey(
    Schema.Literals(["female", "male"]).annotate({
      description:
        'The person\'s gender (International regulations require either "male" or "female").',
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
        "The nationalities (countries) this person is associated with.",
    }),
  ),
  person_token: Schema.optionalKey(
    Schema.String.annotate({
      description: "The person token generated by the person token api.",
    }),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({
      description: "The phone number for this person.",
    }),
  ),
  political_exposure: Schema.optionalKey(
    Schema.Literals(["existing", "none"]).annotate({
      description: "The person's political exposure.",
    }),
  ),
  relationship: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        authorizer: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Whether the individual is an authorizer of the Account's identity.",
          }),
        ),
        director: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a director of the associated legal entity.",
          }),
        ),
        executive: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is an executive of the associated legal entity.",
          }),
        ),
        legal_guardian: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a legal guardian of the associated legal entity.",
          }),
        ),
        owner: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is an owner of the associated legal entity.",
          }),
        ),
        percent_ownership: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The percentage of ownership the person has in the associated legal entity.",
            format: "decimal",
          }),
        ),
        representative: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "Indicates whether the person is a representative of the associated legal entity.",
          }),
        ),
        title: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The title or position the person holds in the associated legal entity.",
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
        "The relationship that this person has with the Account's business or legal entity.",
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
                  description: "City, district, suburb, town, or village.",
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
                Schema.String.annotate({ description: "ZIP or postal code." }),
              ),
              state: Schema.optionalKey(
                Schema.String.annotate({
                  description: "State, county, province, or region.",
                }),
              ),
              town: Schema.optionalKey(
                Schema.String.annotate({ description: "Town or district." }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Kana Address." }),
        ),
        kanji: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              city: Schema.optionalKey(
                Schema.String.annotate({
                  description: "City, district, suburb, town, or village.",
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
                Schema.String.annotate({ description: "ZIP or postal code." }),
              ),
              state: Schema.optionalKey(
                Schema.String.annotate({
                  description: "State, county, province, or region.",
                }),
              ),
              town: Schema.optionalKey(
                Schema.String.annotate({ description: "Town or district." }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
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
        "The script addresses (e.g., non-Latin characters) associated with the person.",
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
                  description: "The person's first or given name.",
                }),
              ),
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
          ).annotate({ description: "Persons name in kana script." }),
        ),
        kanji: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              given_name: Schema.optionalKey(
                Schema.String.annotate({
                  description: "The person's first or given name.",
                }),
              ),
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
          ).annotate({ description: "Persons name in kanji script." }),
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
        "The script names (e.g. non-Latin characters) associated with the person.",
    }),
  ),
  surname: Schema.optionalKey(
    Schema.String.annotate({ description: "The person's last name." }),
  ),
  account_id: Schema.String,
  id: Schema.String,
});
export const PostV2CoreAccountsAccountIdPersonsIdOutput =
  Stripev2_core_account_person;
export const PostV2CoreAccountsAccountIdPersonsIdError = Schema.Union(
  [
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_additional_legal_guardian_not_allowed,
    Stripev2_error_additional_representative_not_allowed,
    Stripev2_error_additional_tos_only_allowed_for_legal_guardian,
    Stripev2_error_address_characters_invalid,
    Stripev2_error_address_country_identity_country_mismatch,
    Stripev2_error_address_country_mismatch,
    Stripev2_error_address_country_required,
    Stripev2_error_address_postal_code_invalid,
    Stripev2_error_address_state_invalid,
    Stripev2_error_address_town_invalid,
    Stripev2_error_date_of_birth_age_restriction,
    Stripev2_error_date_of_birth_invalid,
    Stripev2_error_document_invalid,
    Stripev2_error_document_purpose_invalid,
    Stripev2_error_duplicate_person_not_allowed,
    Stripev2_error_email_domain_invalid_for_recipient,
    Stripev2_error_email_invalid,
    Stripev2_error_id_number_invalid,
    Stripev2_error_identity_country_required,
    Stripev2_error_immutable_identity_param,
    Stripev2_error_incorrect_account_for_person_token,
    Stripev2_error_incorrect_id_number_for_country,
    Stripev2_error_incorrect_token_wrong_type,
    Stripev2_error_invalid_person_token,
    Stripev2_error_ip_address_invalid,
    Stripev2_error_legal_guardian_representative_not_allowed,
    Stripev2_error_legal_guardian_requires_existing_representative,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_non_jp_kana_kanji_address,
    Stripev2_error_not_found,
    Stripev2_error_param_alongside_person_token,
    Stripev2_error_person_percent_ownership_invalid,
    Stripev2_error_person_token_required,
    Stripev2_error_phone_invalid,
    Stripev2_error_platform_registration_required,
    Stripev2_error_postal_code_required_for_jp_address,
    Stripev2_error_script_characters_invalid,
    Stripev2_error_token_already_used,
    Stripev2_error_token_expired,
    Stripev2_error_total_person_ownership_exceeded,
    Stripev2_error_unsupported_postal_code,
    Stripev2_error_unsupported_state,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error_v1_token_invalid_in_v2,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const DeleteV2CoreAccountsAccountIdPersonsIdInput = Schema.Struct({
  account_id: Schema.String,
  id: Schema.String,
});
export const DeleteV2CoreAccountsAccountIdPersonsIdOutput =
  Stripev2_deleted_object;
export const DeleteV2CoreAccountsAccountIdPersonsIdError = Schema.Union(
  [
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_not_found,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2CoreAccountsIdInput = Schema.Struct({
  id: Schema.String,
  include: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "configuration.customer",
        "configuration.merchant",
        "configuration.recipient",
        "defaults",
        "future_requirements",
        "identity",
        "requirements",
      ]),
    ),
  ),
});
export const GetV2CoreAccountsIdOutput = Stripev2_core_account;
export const GetV2CoreAccountsIdError = Schema.Union(
  [
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_not_found,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreAccountsIdInput = Schema.Struct({
  account_token: Schema.optionalKey(
    Schema.String.annotate({
      description: "The account token generated by the account token API.",
    }),
  ),
  configuration: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        customer: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              applied: Schema.optionalKey(
                Schema.Boolean.annotate({
                  description:
                    "Represents the state of the configuration, and can be updated to deactivate or re-apply a configuration.",
                }),
              ),
              automatic_indirect_tax: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    exempt: Schema.optionalKey(
                      Schema.Literals(["exempt", "none", "reverse"]).annotate({
                        description:
                          'The customer account\'s tax exemption status: `none`, `exempt`, or `reverse`. When `reverse`, invoice and receipt PDFs include "Reverse charge".',
                      }),
                    ),
                    ip_address: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A recent IP address of the customer used for tax reporting and tax location inference.",
                      }),
                    ),
                    validate_location: Schema.optionalKey(
                      Schema.Literals([
                        "auto",
                        "deferred",
                        "immediately",
                      ]).annotate({
                        description:
                          "A per-request flag that indicates when Stripe should validate the customer tax location - defaults to `auto`.",
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
                    "Automatic indirect tax settings to be used when automatic tax calculation is enabled on the customer's invoices, subscriptions, checkout sessions, or payment links. Surfaces if automatic tax calculation is possible given the current customer location information.",
                }),
              ),
              billing: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    default_payment_method: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The ID of a `PaymentMethod` attached to this Account's `customer` configuration, used as the default payment method for invoices and subscriptions.",
                      }),
                    ),
                    invoice: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          custom_fields: Schema.optionalKey(
                            Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  name: Schema.String.annotate({
                                    description:
                                      "The name of the custom field. This may be up to 40 characters.",
                                  }),
                                  value: Schema.String.annotate({
                                    description:
                                      "The value of the custom field. This may be up to 140 characters. When updating, pass an empty string to remove previously-defined values.",
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
                              ),
                            ).annotate({
                              description:
                                "The list of up to 4 default custom fields to be displayed on invoices for this customer.",
                            }),
                          ),
                          footer: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "Default invoice footer.",
                            }),
                          ),
                          next_sequence: Schema.optionalKey(
                            Schema.Number.annotate({
                              description:
                                "Sequence number to use on the customer account's next invoice. Defaults to 1.",
                            }).check(
                              Schema.isInt().annotate({
                                expected: "an integer",
                              }),
                            ),
                          ),
                          prefix: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Prefix used to generate unique invoice numbers. Must be 3-12 uppercase letters or numbers.",
                            }),
                          ),
                          rendering: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                amount_tax_display: Schema.optionalKey(
                                  Schema.Literals([
                                    "exclude_tax",
                                    "include_inclusive_tax",
                                  ]).annotate({
                                    description:
                                      "Indicates whether displayed line item prices and amounts on invoice PDFs include inclusive tax amounts. Must be either `include_inclusive_tax` or `exclude_tax`.",
                                  }),
                                ),
                                template: Schema.optionalKey(
                                  Schema.String.annotate({
                                    description:
                                      "ID of the invoice rendering template to use for future invoices.",
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
                                "Default invoice PDF rendering options.",
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
                          "Default invoice settings for the customer account.",
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
                    "Billing settings - default settings used for this customer in Billing flows such as Invoices and Subscriptions.",
                }),
              ),
              capabilities: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    automatic_indirect_tax: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Generates requirements for enabling automatic indirect tax calculation on this customer's invoices or subscriptions. Recommended to request this capability if planning to enable automatic tax calculation on this customer's invoices or subscriptions.",
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
                    "Capabilities that have been requested on the Customer Configuration.",
                }),
              ),
              shipping: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
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
                              description:
                                "State, county, province, or region.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ description: "Customer shipping address." }),
                    ),
                    name: Schema.optionalKey(
                      Schema.String.annotate({ description: "Customer name." }),
                    ),
                    phone: Schema.optionalKey(
                      Schema.String.annotate({
                        description: "Customer phone (including extension).",
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
                    "The customer's shipping information. Appears on invoices emailed to this customer.",
                }),
              ),
              test_clock: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "ID of the test clock to attach to the customer. Can only be set on testmode Accounts, and when the Customer Configuration is first set on an Account.",
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
              "The Customer Configuration allows the Account to be charged.",
          }),
        ),
        merchant: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              applied: Schema.optionalKey(
                Schema.Boolean.annotate({
                  description:
                    "Represents the state of the configuration, and can be updated to deactivate or re-apply a configuration.",
                }),
              ),
              bacs_debit_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    display_name: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "Display name for Bacs Direct Debit payments.",
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
                  description: "Settings for Bacs Direct Debit payments.",
                }),
              ),
              branding: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    icon: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "ID of a [file upload](https://docs.stripe.com/api/files/create): An icon for the merchant. Must be square and at least 128px x 128px.",
                      }),
                    ),
                    logo: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "ID of a [file upload](https://docs.stripe.com/api/files/create): A logo for the merchant that will be used in Checkout instead of the icon and without the merchant's name next to it if provided. Must be at least 128px x 128px.",
                      }),
                    ),
                    primary_color: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A CSS hex color value representing the primary branding color for the merchant.",
                      }),
                    ),
                    secondary_color: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A CSS hex color value representing the secondary branding color for the merchant.",
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
                    "Settings used to apply the merchant's branding to email receipts, invoices, Checkout, and other products.",
                }),
              ),
              capabilities: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    ach_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process ACH debit payments.",
                      }),
                    ),
                    acss_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process ACSS debit payments.",
                      }),
                    ),
                    affirm_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Affirm payments.",
                      }),
                    ),
                    afterpay_clearpay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Afterpay/Clearpay payments.",
                      }),
                    ),
                    alma_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Alma payments.",
                      }),
                    ),
                    amazon_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Amazon Pay payments.",
                      }),
                    ),
                    au_becs_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Australian BECS Direct Debit payments.",
                      }),
                    ),
                    bacs_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process BACS Direct Debit payments.",
                      }),
                    ),
                    bancontact_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Bancontact payments.",
                      }),
                    ),
                    blik_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process BLIK payments.",
                      }),
                    ),
                    blik_recurring_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process recurring BLIK payments.",
                      }),
                    ),
                    boleto_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Boleto payments.",
                      }),
                    ),
                    card_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to collect card payments.",
                      }),
                    ),
                    cartes_bancaires_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Cartes Bancaires payments.",
                      }),
                    ),
                    cashapp_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Cash App payments.",
                      }),
                    ),
                    eps_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process EPS payments.",
                      }),
                    ),
                    fpx_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process FPX payments.",
                      }),
                    ),
                    gb_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process UK bank transfer payments.",
                      }),
                    ),
                    grabpay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process GrabPay payments.",
                      }),
                    ),
                    ideal_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process iDEAL payments.",
                      }),
                    ),
                    jcb_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process JCB card payments.",
                      }),
                    ),
                    jp_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Japanese bank transfer payments.",
                      }),
                    ),
                    kakao_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Kakao Pay payments.",
                      }),
                    ),
                    klarna_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Klarna payments.",
                      }),
                    ),
                    konbini_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Konbini convenience store payments.",
                      }),
                    ),
                    kr_card_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Korean card payments.",
                      }),
                    ),
                    link_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Link payments.",
                      }),
                    ),
                    mobilepay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process MobilePay payments.",
                      }),
                    ),
                    multibanco_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Multibanco payments.",
                      }),
                    ),
                    mx_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Mexican bank transfer payments.",
                      }),
                    ),
                    naver_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Naver Pay payments.",
                      }),
                    ),
                    oxxo_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process OXXO payments.",
                      }),
                    ),
                    p24_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Przelewy24 (P24) payments.",
                      }),
                    ),
                    pay_by_bank_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Pay by Bank payments.",
                      }),
                    ),
                    payco_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process PAYCO payments.",
                      }),
                    ),
                    paynow_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process PayNow payments.",
                      }),
                    ),
                    promptpay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process PromptPay payments.",
                      }),
                    ),
                    revolut_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Revolut Pay payments.",
                      }),
                    ),
                    samsung_pay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Samsung Pay payments.",
                      }),
                    ),
                    satispay_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Satispay payments.",
                      }),
                    ),
                    sepa_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process SEPA bank transfer payments.",
                      }),
                    ),
                    sepa_debit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process SEPA Direct Debit payments.",
                      }),
                    ),
                    sequra_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process SeQura payments.",
                      }),
                    ),
                    sunbit_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Sunbit payments.",
                      }),
                    ),
                    swish_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Swish payments.",
                      }),
                    ),
                    twint_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process TWINT payments.",
                      }),
                    ),
                    us_bank_transfer_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process US bank transfer payments.",
                      }),
                    ),
                    zip_payments: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Allow the merchant to process Zip payments.",
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
                    "Capabilities to request on the Merchant Configuration.",
                }),
              ),
              card_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    decline_on: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          avs_failure: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "Whether Stripe automatically declines charges with an incorrect ZIP or postal code. This setting only applies when a ZIP or postal code is provided and they fail bank verification.",
                            }),
                          ),
                          cvc_failure: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "Whether Stripe automatically declines charges with an incorrect CVC. This setting only applies when a CVC is provided and it fails bank verification.",
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
                          "Automatically declines certain charge types regardless of whether the card issuer accepted or declined the charge.",
                      }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ description: "Card payments settings." }),
              ),
              konbini_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    support: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          email: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Support email address for Konbini payments.",
                            }),
                          ),
                          hours: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                end_time: Schema.optionalKey(
                                  Schema.String.annotate({
                                    description:
                                      "Support hours end time (JST time of day) for in `HH:MM` format.",
                                  }),
                                ),
                                start_time: Schema.optionalKey(
                                  Schema.String.annotate({
                                    description:
                                      "Support hours start time (JST time of day) for in `HH:MM` format.",
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
                                "Support hours for Konbini payments.",
                            }),
                          ),
                          phone: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Support phone number for Konbini payments.",
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
                        description: "Support for Konbini payments.",
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
                    "Settings specific to Konbini payments on the account.",
                }),
              ),
              mcc: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "The Merchant Category Code (MCC) for the merchant. MCCs classify businesses based on the goods or services they provide.",
                }),
              ),
              script_statement_descriptor: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    kana: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          descriptor: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don’t set a statement_descriptor_prefix, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the statement_descriptor text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
                            }),
                          ),
                          prefix: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Default text that appears on statements for card charges outside of Japan, prefixing any dynamic statement_descriptor_suffix specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don’t specify this value, statement_descriptor is used as the prefix. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
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
                          "The Kana variation of statement_descriptor used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).",
                      }),
                    ),
                    kanji: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          descriptor: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don’t set a statement_descriptor_prefix, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the statement_descriptor text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
                            }),
                          ),
                          prefix: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "Default text that appears on statements for card charges outside of Japan, prefixing any dynamic statement_descriptor_suffix specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don’t specify this value, statement_descriptor is used as the prefix. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
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
                          "The Kanji variation of statement_descriptor used for charges in Japan. Japanese statement descriptors have [special requirements](https://docs.stripe.com/get-started/account/statement-descriptors#set-japanese-statement-descriptors).",
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
                    "Settings for the default text that appears on statements for language variations.",
                }),
              ),
              sepa_debit_payments: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    creditor_id: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "Creditor ID for SEPA Direct Debit payments.",
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
                  description: "Settings for SEPA Direct Debit payments.",
                }),
              ),
              statement_descriptor: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    descriptor: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The default text that appears on statements for non-card charges outside of Japan. For card charges, if you don’t set a statement_descriptor_prefix, this text is also used as the statement descriptor prefix. In that case, if concatenating the statement descriptor suffix causes the combined statement descriptor to exceed 22 characters, we truncate the statement_descriptor text to limit the full descriptor to 22 characters. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
                      }),
                    ),
                    prefix: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "Default text that appears on statements for card charges outside of Japan, prefixing any dynamic statement_descriptor_suffix specified on the charge. To maximize space for the dynamic part of the descriptor, keep this text short. If you don’t specify this value, statement_descriptor is used as the prefix. For more information about statement descriptors and their requirements, see the Merchant Configuration settings documentation.",
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
                    "Settings for the default statement descriptor text.",
                }),
              ),
              support: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
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
                      ).annotate({
                        description:
                          "A publicly available mailing address for sending support issues to.",
                      }),
                    ),
                    email: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A publicly available email address for sending support issues to.",
                      }),
                    ),
                    phone: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A publicly available phone number to call with support issues.",
                      }),
                    ),
                    url: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "A publicly available website for handling support issues.",
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
                    "Publicly available contact information for sending support issues to.",
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
              "Enables the Account to act as a connected account and collect payments facilitated by a Connect platform. You must onboard your platform to Connect before you can add this configuration to your connected accounts. Utilize this configuration when the Account will be the Merchant of Record, like with Direct charges or Destination Charges with on_behalf_of set.",
          }),
        ),
        recipient: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              applied: Schema.optionalKey(
                Schema.Boolean.annotate({
                  description:
                    "Represents the state of the configuration, and can be updated to deactivate or re-apply a configuration.",
                }),
              ),
              capabilities: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    bank_accounts: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          ach: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over ACH rails.",
                            }),
                          ),
                          fedwire: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over Fedwire or CHIPS.",
                            }),
                          ),
                          fps: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over FPS rails.",
                            }),
                          ),
                          local: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over local networks.",
                            }),
                          ),
                          rtp: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over RTP rails.",
                            }),
                          ),
                          sepa: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over SEPA rails.",
                            }),
                          ),
                          swift: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive OutboundPayments to linked bank accounts over SWIFT.",
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
                          "Capabilities that enable OutboundPayments to a bank account linked to this Account.",
                      }),
                    ),
                    cards: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          requested: Schema.optionalKey(
                            Schema.Boolean.annotate({
                              description:
                                "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                          "Capability that enable OutboundPayments to a debit card linked to this Account.",
                      }),
                    ),
                    stripe_balance: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          stripe_transfers: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                requested: Schema.optionalKey(
                                  Schema.Boolean.annotate({
                                    description:
                                      "To request a new Capability for an account, pass true. There can be a delay before the requested Capability becomes active.",
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
                                "Enables this Account to receive /v1/transfers into their Stripe Balance (/v1/balance).",
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
                          "Capabilities that enable the recipient to manage their Stripe Balance (/v1/balance).",
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
                    "Capabilities to request on the Recipient Configuration.",
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
              "The Recipient Configuration allows the Account to receive funds. Utilize this configuration if the Account will not be the Merchant of Record, like with Separate Charges & Transfers, or Destination Charges without on_behalf_of set.",
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
        "An Account Configuration which allows the Account to take on a key persona across Stripe products.",
    }),
  ),
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
  dashboard: Schema.optionalKey(
    Schema.Literals(["express", "full", "none"]).annotate({
      description:
        "A value indicating the Stripe dashboard this Account has access to. This will depend on which configurations are enabled for this account.",
    }),
  ),
  defaults: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        currency: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          }),
        ),
        locales: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "ar-SA",
              "bg",
              "bg-BG",
              "cs",
              "cs-CZ",
              "da",
              "da-DK",
              "de",
              "de-DE",
              "el",
              "el-GR",
              "en",
              "en-AU",
              "en-CA",
              "en-GB",
              "en-IE",
              "en-IN",
              "en-NZ",
              "en-SG",
              "en-US",
              "es",
              "es-419",
              "es-ES",
              "et",
              "et-EE",
              "fi",
              "fil",
              "fil-PH",
              "fi-FI",
              "fr",
              "fr-CA",
              "fr-FR",
              "he-IL",
              "hr",
              "hr-HR",
              "hu",
              "hu-HU",
              "id",
              "id-ID",
              "it",
              "it-IT",
              "ja",
              "ja-JP",
              "ko",
              "ko-KR",
              "lt",
              "lt-LT",
              "lv",
              "lv-LV",
              "ms",
              "ms-MY",
              "mt",
              "mt-MT",
              "nb",
              "nb-NO",
              "nl",
              "nl-NL",
              "pl",
              "pl-PL",
              "pt",
              "pt-BR",
              "pt-PT",
              "ro",
              "ro-RO",
              "ru",
              "ru-RU",
              "sk",
              "sk-SK",
              "sl",
              "sl-SI",
              "sv",
              "sv-SE",
              "th",
              "th-TH",
              "tr",
              "tr-TR",
              "vi",
              "vi-VN",
              "zh",
              "zh-Hans",
              "zh-Hant-HK",
              "zh-Hant-TW",
              "zh-HK",
              "zh-TW",
            ]),
          ).annotate({
            description:
              "The Account's preferred locales (languages), ordered by preference.",
          }),
        ),
        payout_methods: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String).annotate({
            description:
              "Default payout methods per currency. Keys are three-letter [ISO currency codes](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Values are v2 Payout Method IDs.",
          }),
        ),
        profile: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              business_url: Schema.optionalKey(
                Schema.String.annotate({
                  description: "The business's publicly-available website.",
                }),
              ),
              doing_business_as: Schema.optionalKey(
                Schema.String.annotate({
                  description: "The name which is used by the business.",
                }),
              ),
              product_description: Schema.optionalKey(
                Schema.String.annotate({
                  description:
                    "Internal-only description of the product sold or service provided by the business. It's used by Stripe for risk and underwriting purposes.",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Account profile information." }),
        ),
        responsibilities: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              fees_collector: Schema.Literals([
                "application",
                "application_custom",
                "application_express",
                "stripe",
              ]).annotate({
                description:
                  "A value indicating the party responsible for collecting fees from this account.",
              }),
              losses_collector: Schema.Literals([
                "application",
                "stripe",
              ]).annotate({
                description:
                  "A value indicating who is responsible for losses when this Account can’t pay back negative balances from payments.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({
            description:
              "Default responsibilities held by either Stripe or the platform.",
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
      description: "Default values to be used on Account Configurations.",
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
                    date: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The time marking when the director attestation was made. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                        format: "date-time",
                      }),
                    ),
                    ip: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The IP address from which the director attestation was made.",
                      }),
                    ),
                    user_agent: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The user agent of the browser from which the director attestation was made.",
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
                    "This hash is used to attest that the directors information provided to Stripe is both current and correct.",
                }),
              ),
              ownership_declaration: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    date: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The time marking when the beneficial owner attestation was made. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                        format: "date-time",
                      }),
                    ),
                    ip: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The IP address from which the beneficial owner attestation was made.",
                      }),
                    ),
                    user_agent: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The user agent of the browser from which the beneficial owner attestation was made.",
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
                    "This hash is used to attest that the beneficial owner information provided to Stripe is both current and correct.",
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
                    date: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The time marking when the representative attestation was made. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                        format: "date-time",
                      }),
                    ),
                    ip: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The IP address from which the representative attestation was made.",
                      }),
                    ),
                    user_agent: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The user agent of the browser from which the representative attestation was made.",
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
                    "This hash is used to attest that the representative is authorized to act as the representative of their legal entity.",
                }),
              ),
              terms_of_service: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          date: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                              format: "date-time",
                            }),
                          ),
                          ip: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The IP address from which the Account's representative accepted the terms of service.",
                            }),
                          ),
                          user_agent: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The user agent of the browser from which the Account's representative accepted the terms of service.",
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
                          "Details on the Account's acceptance of the Stripe Services Agreement.",
                      }),
                    ),
                    crypto_money_manager: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          date: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                              format: "date-time",
                            }),
                          ),
                          ip: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The IP address from which the Account's representative accepted the terms of service.",
                            }),
                          ),
                          user_agent: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The user agent of the browser from which the Account's representative accepted the terms of service.",
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
                          "Details on the Account's acceptance of Crypto-specific terms of service.",
                      }),
                    ),
                    money_manager: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          date: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The time when the Account's representative accepted the terms of service. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                              format: "date-time",
                            }),
                          ),
                          ip: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The IP address from which the Account's representative accepted the terms of service.",
                            }),
                          ),
                          user_agent: Schema.optionalKey(
                            Schema.String.annotate({
                              description:
                                "The user agent of the browser from which the Account's representative accepted the terms of service.",
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
                          "Details on the Account's acceptance of Treasury-specific terms of service.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                                  description: "Person signing the document.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        description:
                          "One or more documents that demonstrate proof of ultimate beneficial ownership.",
                      }),
                    ),
                    proof_of_ultimate_beneficial_ownership: Schema.optionalKey(
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
                                  description: "Person signing the document.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
                      description: "The day of registration, between 1 and 31.",
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                              description: "Registered name of the business.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ description: "Kana name." }),
                    ),
                    kanji: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          registered_name: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "Registered name of the business.",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                  description: "The business legal name in non latin script.",
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
        country: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The country in which the account holder resides, or in which the business is legally established. This should be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.",
          }),
        ),
        entity_type: Schema.optionalKey(
          Schema.Literals([
            "company",
            "government_entity",
            "individual",
            "non_profit",
          ]).annotate({
            description:
              "The entity type represented by the Account. Ensure this field is accurate before adding configurations that rely on identity information, as it determines which identity fields apply and how the Account is validated.",
          }),
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
                      purpose: Schema.Literals(["alias", "maiden"]).annotate({
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
                ).annotate({ description: "The individual's date of birth." }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                            Schema.Json.annotate({ expected: "JSON value" }),
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
                              description: "The person's first or given name.",
                            }),
                          ),
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
                      ).annotate({
                        description: "Persons name in kana script.",
                      }),
                    ),
                    kanji: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          given_name: Schema.optionalKey(
                            Schema.String.annotate({
                              description: "The person's first or given name.",
                            }),
                          ),
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
              "Information about the individual represented by the Account. This property is `null` unless `entity_type` is set to `individual`.",
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
  include: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "configuration.customer",
        "configuration.merchant",
        "configuration.recipient",
        "defaults",
        "future_requirements",
        "identity",
        "requirements",
      ]),
    ).annotate({
      description: "Additional fields to include in the response.",
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
  id: Schema.String,
});
export const PostV2CoreAccountsIdOutput = Stripev2_core_account;
export const PostV2CoreAccountsIdError = Schema.Union(
  [
    Stripev2_error_account_capability_not_supported,
    Stripev2_error_account_configuration_not_supported,
    Stripev2_error_account_controller_express_dash_without_application_losses_or_fees,
    Stripev2_error_account_controller_stripe_pricing_platform_liable,
    Stripev2_error_account_controller_unsupported_configuration,
    Stripev2_error_account_controller_unsupported_configuration_private_preview,
    Stripev2_error_account_country_unsupported_currency,
    Stripev2_error_account_creation_blocked_due_to_suspicious_activity,
    Stripev2_error_account_creation_identity_verification_incomplete,
    Stripev2_error_account_creation_liability_unacknowledged_and_identity_verification_incomplete,
    Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete,
    Stripev2_error_account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete,
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_account_terms_of_service_not_accepted,
    Stripev2_error_account_token_required,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_address_characters_invalid,
    Stripev2_error_address_country_identity_country_mismatch,
    Stripev2_error_address_postal_code_invalid,
    Stripev2_error_address_state_invalid,
    Stripev2_error_address_town_invalid,
    Stripev2_error_attach_payment_method_to_customer,
    Stripev2_error_bgn_bank_accounts_unsupported,
    Stripev2_error_can_create_platform_owned_onboarding_accounts_required,
    Stripev2_error_cannot_add_connect_due_to_incompatible_default_payout_method,
    Stripev2_error_cannot_use_validate_location_on_customer_create,
    Stripev2_error_capability_cannot_be_unrequested_due_to_other_capability_requirement,
    Stripev2_error_capability_not_available_for_dashboard_type,
    Stripev2_error_capability_not_available_for_entity_type_in_country,
    Stripev2_error_capability_not_available_for_loss_collector,
    Stripev2_error_capability_not_available_in_country,
    Stripev2_error_capability_not_available_in_platform_country,
    Stripev2_error_capability_not_available_without_other_capability,
    Stripev2_error_capability_not_available_without_other_capability_in_country,
    Stripev2_error_configuration_cannot_be_deactivated,
    Stripev2_error_configuration_cannot_be_deactivated_due_to_other_capability_requirement,
    Stripev2_error_configuration_cannot_be_deactivated_due_to_other_configuration,
    Stripev2_error_configuration_cannot_be_updated_while_deactivated,
    Stripev2_error_configuration_creation_invalid,
    Stripev2_error_cross_border_connected_account_creation_not_allowed,
    Stripev2_error_custom_account_beta,
    Stripev2_error_customer_invalid_tax_location,
    Stripev2_error_date_of_birth_age_restriction,
    Stripev2_error_date_of_birth_invalid,
    Stripev2_error_default_currency_immutable,
    Stripev2_error_default_outbound_destination_invalid,
    Stripev2_error_default_payment_method_invalid,
    Stripev2_error_document_invalid,
    Stripev2_error_document_purpose_invalid,
    Stripev2_error_duplicate_person_not_allowed,
    Stripev2_error_email_domain_invalid_for_recipient,
    Stripev2_error_email_invalid,
    Stripev2_error_entity_type_not_supported_in_country,
    Stripev2_error_high_risk_activities_none_cant_be_combined_with_other_options,
    Stripev2_error_id_number_invalid,
    Stripev2_error_idempotency_error,
    Stripev2_error_identity_country_required,
    Stripev2_error_immutable_identity_param,
    Stripev2_error_incompatible_default_payout_method,
    Stripev2_error_incorrect_id_number_for_country,
    Stripev2_error_incorrect_token_wrong_type,
    Stripev2_error_invalid_account_token,
    Stripev2_error_invalid_id_number_for_structure,
    Stripev2_error_invalid_id_number_registrar,
    Stripev2_error_invalid_konbini_payments_support_hours,
    Stripev2_error_invalid_konbini_payments_support_phone_number,
    Stripev2_error_invalid_sepa_creditor_id_format,
    Stripev2_error_invalid_timezone,
    Stripev2_error_ip_address_invalid,
    Stripev2_error_mcc_invalid,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_non_jp_kana_kanji_address,
    Stripev2_error_not_found,
    Stripev2_error_param_alongside_account_token,
    Stripev2_error_payout_method_incompatible_type,
    Stripev2_error_person_percent_ownership_invalid,
    Stripev2_error_phone_invalid,
    Stripev2_error_platform_registration_required,
    Stripev2_error_postal_code_required_for_jp_address,
    Stripev2_error_purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds,
    Stripev2_error_registration_date_invalid,
    Stripev2_error_script_characters_invalid,
    Stripev2_error_sepa_debit_creditor_identifier_not_allowed,
    Stripev2_error_sepa_debit_stripe_creditor_identifier,
    Stripev2_error_shipping_address_required,
    Stripev2_error_shipping_name_required,
    Stripev2_error_statement_descriptor_invalid,
    Stripev2_error_structure_incompatible_for_entity_type_country,
    Stripev2_error_test_clock_disallowed_on_live_mode,
    Stripev2_error_test_clock_invalid,
    Stripev2_error_token_already_used,
    Stripev2_error_token_expired,
    Stripev2_error_tos_acceptance_on_behalf_not_allowed,
    Stripev2_error_total_person_ownership_exceeded,
    Stripev2_error_unsupported_field_for_configs,
    Stripev2_error_unsupported_identity_field_for_configs,
    Stripev2_error_unsupported_postal_code,
    Stripev2_error_unsupported_state,
    Stripev2_error_url_invalid,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error_v1_token_invalid_in_v2,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const PostV2CoreAccountsIdCloseInput = Schema.Struct({
  applied_configurations: Schema.optionalKey(
    Schema.Array(
      Schema.Literals(["customer", "merchant", "recipient"]),
    ).annotate({
      description:
        "Configurations on the Account to be closed. All configurations on the Account must be passed in for this request to succeed.",
    }),
  ),
  id: Schema.String,
});
export const PostV2CoreAccountsIdCloseOutput = Stripev2_core_account;
export const PostV2CoreAccountsIdCloseError = Schema.Union(
  [
    Stripev2_error_account_not_yet_compatible_with_v2,
    Stripev2_error_account_rate_limit_exceeded,
    Stripev2_error_accounts_v2_access_blocked,
    Stripev2_error_cannot_delete_account_with_balance,
    Stripev2_error_cannot_delete_customer_with_available_cash_balance,
    Stripev2_error_configs_must_match_to_close,
    Stripev2_error_non_connect_platform_accounts_v2_access_blocked,
    Stripev2_error_not_found,
    Stripev2_error_pending_transactions_cannot_be_deleted,
    Stripev2_error_platform_registration_required,
    Stripev2_error_stripe_loss_liable_cannot_be_deleted,
    Stripev2_error_v1_account_instead_of_v2_account,
    Stripev2_error_v1_customer_instead_of_v2_account,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
/**
 * The GetV2CoreAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreAccountsOperation: StripeOperation & {
  readonly input: typeof GetV2CoreAccountsInput;
  readonly output: typeof GetV2CoreAccountsOutput;
  readonly error: typeof GetV2CoreAccountsError;
} = {
  name: "GetV2CoreAccounts",
  method: "GET",
  path: "/v2/core/accounts",
  pathParameters: [],
  queryParameters: ["applied_configurations", "closed", "limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreAccountsInput,
  output: GetV2CoreAccountsOutput,
  error: GetV2CoreAccountsError,
};
/**
 * The PostV2CoreAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreAccountsOperation: StripeOperation & {
  readonly input: typeof PostV2CoreAccountsInput;
  readonly output: typeof PostV2CoreAccountsOutput;
  readonly error: typeof PostV2CoreAccountsError;
} = {
  name: "PostV2CoreAccounts",
  method: "POST",
  path: "/v2/core/accounts",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreAccountsInput,
  output: PostV2CoreAccountsOutput,
  error: PostV2CoreAccountsError,
};
/**
 * The PostV2CoreAccountsAccountIdPersonTokensOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreAccountsAccountIdPersonTokensOperation: StripeOperation & {
  readonly input: typeof PostV2CoreAccountsAccountIdPersonTokensInput;
  readonly output: typeof PostV2CoreAccountsAccountIdPersonTokensOutput;
  readonly error: typeof PostV2CoreAccountsAccountIdPersonTokensError;
} = {
  name: "PostV2CoreAccountsAccountIdPersonTokens",
  method: "POST",
  path: "/v2/core/accounts/{account_id}/person_tokens",
  pathParameters: ["account_id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreAccountsAccountIdPersonTokensInput,
  output: PostV2CoreAccountsAccountIdPersonTokensOutput,
  error: PostV2CoreAccountsAccountIdPersonTokensError,
};
/**
 * The GetV2CoreAccountsAccountIdPersonTokensIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreAccountsAccountIdPersonTokensIdOperation: StripeOperation & {
  readonly input: typeof GetV2CoreAccountsAccountIdPersonTokensIdInput;
  readonly output: typeof GetV2CoreAccountsAccountIdPersonTokensIdOutput;
  readonly error: typeof GetV2CoreAccountsAccountIdPersonTokensIdError;
} = {
  name: "GetV2CoreAccountsAccountIdPersonTokensId",
  method: "GET",
  path: "/v2/core/accounts/{account_id}/person_tokens/{id}",
  pathParameters: ["account_id", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreAccountsAccountIdPersonTokensIdInput,
  output: GetV2CoreAccountsAccountIdPersonTokensIdOutput,
  error: GetV2CoreAccountsAccountIdPersonTokensIdError,
};
/**
 * The GetV2CoreAccountsAccountIdPersonsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreAccountsAccountIdPersonsOperation: StripeOperation & {
  readonly input: typeof GetV2CoreAccountsAccountIdPersonsInput;
  readonly output: typeof GetV2CoreAccountsAccountIdPersonsOutput;
  readonly error: typeof GetV2CoreAccountsAccountIdPersonsError;
} = {
  name: "GetV2CoreAccountsAccountIdPersons",
  method: "GET",
  path: "/v2/core/accounts/{account_id}/persons",
  pathParameters: ["account_id"],
  queryParameters: ["limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreAccountsAccountIdPersonsInput,
  output: GetV2CoreAccountsAccountIdPersonsOutput,
  error: GetV2CoreAccountsAccountIdPersonsError,
};
/**
 * The PostV2CoreAccountsAccountIdPersonsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreAccountsAccountIdPersonsOperation: StripeOperation & {
  readonly input: typeof PostV2CoreAccountsAccountIdPersonsInput;
  readonly output: typeof PostV2CoreAccountsAccountIdPersonsOutput;
  readonly error: typeof PostV2CoreAccountsAccountIdPersonsError;
} = {
  name: "PostV2CoreAccountsAccountIdPersons",
  method: "POST",
  path: "/v2/core/accounts/{account_id}/persons",
  pathParameters: ["account_id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreAccountsAccountIdPersonsInput,
  output: PostV2CoreAccountsAccountIdPersonsOutput,
  error: PostV2CoreAccountsAccountIdPersonsError,
};
/**
 * The GetV2CoreAccountsAccountIdPersonsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreAccountsAccountIdPersonsIdOperation: StripeOperation & {
  readonly input: typeof GetV2CoreAccountsAccountIdPersonsIdInput;
  readonly output: typeof GetV2CoreAccountsAccountIdPersonsIdOutput;
  readonly error: typeof GetV2CoreAccountsAccountIdPersonsIdError;
} = {
  name: "GetV2CoreAccountsAccountIdPersonsId",
  method: "GET",
  path: "/v2/core/accounts/{account_id}/persons/{id}",
  pathParameters: ["account_id", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreAccountsAccountIdPersonsIdInput,
  output: GetV2CoreAccountsAccountIdPersonsIdOutput,
  error: GetV2CoreAccountsAccountIdPersonsIdError,
};
/**
 * The PostV2CoreAccountsAccountIdPersonsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreAccountsAccountIdPersonsIdOperation: StripeOperation & {
  readonly input: typeof PostV2CoreAccountsAccountIdPersonsIdInput;
  readonly output: typeof PostV2CoreAccountsAccountIdPersonsIdOutput;
  readonly error: typeof PostV2CoreAccountsAccountIdPersonsIdError;
} = {
  name: "PostV2CoreAccountsAccountIdPersonsId",
  method: "POST",
  path: "/v2/core/accounts/{account_id}/persons/{id}",
  pathParameters: ["account_id", "id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreAccountsAccountIdPersonsIdInput,
  output: PostV2CoreAccountsAccountIdPersonsIdOutput,
  error: PostV2CoreAccountsAccountIdPersonsIdError,
};
/**
 * The DeleteV2CoreAccountsAccountIdPersonsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteV2CoreAccountsAccountIdPersonsIdOperation: StripeOperation & {
  readonly input: typeof DeleteV2CoreAccountsAccountIdPersonsIdInput;
  readonly output: typeof DeleteV2CoreAccountsAccountIdPersonsIdOutput;
  readonly error: typeof DeleteV2CoreAccountsAccountIdPersonsIdError;
} = {
  name: "DeleteV2CoreAccountsAccountIdPersonsId",
  method: "DELETE",
  path: "/v2/core/accounts/{account_id}/persons/{id}",
  pathParameters: ["account_id", "id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteV2CoreAccountsAccountIdPersonsIdInput,
  output: DeleteV2CoreAccountsAccountIdPersonsIdOutput,
  error: DeleteV2CoreAccountsAccountIdPersonsIdError,
};
/**
 * The GetV2CoreAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreAccountsIdOperation: StripeOperation & {
  readonly input: typeof GetV2CoreAccountsIdInput;
  readonly output: typeof GetV2CoreAccountsIdOutput;
  readonly error: typeof GetV2CoreAccountsIdError;
} = {
  name: "GetV2CoreAccountsId",
  method: "GET",
  path: "/v2/core/accounts/{id}",
  pathParameters: ["id"],
  queryParameters: ["include"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreAccountsIdInput,
  output: GetV2CoreAccountsIdOutput,
  error: GetV2CoreAccountsIdError,
};
/**
 * The PostV2CoreAccountsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreAccountsIdOperation: StripeOperation & {
  readonly input: typeof PostV2CoreAccountsIdInput;
  readonly output: typeof PostV2CoreAccountsIdOutput;
  readonly error: typeof PostV2CoreAccountsIdError;
} = {
  name: "PostV2CoreAccountsId",
  method: "POST",
  path: "/v2/core/accounts/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreAccountsIdInput,
  output: PostV2CoreAccountsIdOutput,
  error: PostV2CoreAccountsIdError,
};
/**
 * The PostV2CoreAccountsIdCloseOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreAccountsIdCloseOperation: StripeOperation & {
  readonly input: typeof PostV2CoreAccountsIdCloseInput;
  readonly output: typeof PostV2CoreAccountsIdCloseOutput;
  readonly error: typeof PostV2CoreAccountsIdCloseError;
} = {
  name: "PostV2CoreAccountsIdClose",
  method: "POST",
  path: "/v2/core/accounts/{id}/close",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreAccountsIdCloseInput,
  output: PostV2CoreAccountsIdCloseOutput,
  error: PostV2CoreAccountsIdCloseError,
};
/**
 * The makeAccountsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeAccountsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetV2CoreAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreAccounts = Effect.fn("accounts.GetV2CoreAccounts")(function* (
    input: GetV2CoreAccountsInput,
  ) {
    const response: GetV2CoreAccountsOutput = yield* client.invoke(
      GetV2CoreAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostV2CoreAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreAccounts = Effect.fn("accounts.PostV2CoreAccounts")(
    function* (input: PostV2CoreAccountsInput) {
      const response: PostV2CoreAccountsOutput = yield* client.invoke(
        PostV2CoreAccountsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostV2CoreAccountsAccountIdPersonTokens function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreAccountsAccountIdPersonTokens = Effect.fn(
    "accounts.PostV2CoreAccountsAccountIdPersonTokens",
  )(function* (input: PostV2CoreAccountsAccountIdPersonTokensInput) {
    const response: PostV2CoreAccountsAccountIdPersonTokensOutput =
      yield* client.invoke(
        PostV2CoreAccountsAccountIdPersonTokensOperation,
        input,
      );
    return response;
  });
  /**
   * The GetV2CoreAccountsAccountIdPersonTokensId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreAccountsAccountIdPersonTokensId = Effect.fn(
    "accounts.GetV2CoreAccountsAccountIdPersonTokensId",
  )(function* (input: GetV2CoreAccountsAccountIdPersonTokensIdInput) {
    const response: GetV2CoreAccountsAccountIdPersonTokensIdOutput =
      yield* client.invoke(
        GetV2CoreAccountsAccountIdPersonTokensIdOperation,
        input,
      );
    return response;
  });
  /**
   * The GetV2CoreAccountsAccountIdPersons function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreAccountsAccountIdPersons = Effect.fn(
    "accounts.GetV2CoreAccountsAccountIdPersons",
  )(function* (input: GetV2CoreAccountsAccountIdPersonsInput) {
    const response: GetV2CoreAccountsAccountIdPersonsOutput =
      yield* client.invoke(GetV2CoreAccountsAccountIdPersonsOperation, input);
    return response;
  });
  /**
   * The PostV2CoreAccountsAccountIdPersons function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreAccountsAccountIdPersons = Effect.fn(
    "accounts.PostV2CoreAccountsAccountIdPersons",
  )(function* (input: PostV2CoreAccountsAccountIdPersonsInput) {
    const response: PostV2CoreAccountsAccountIdPersonsOutput =
      yield* client.invoke(PostV2CoreAccountsAccountIdPersonsOperation, input);
    return response;
  });
  /**
   * The GetV2CoreAccountsAccountIdPersonsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreAccountsAccountIdPersonsId = Effect.fn(
    "accounts.GetV2CoreAccountsAccountIdPersonsId",
  )(function* (input: GetV2CoreAccountsAccountIdPersonsIdInput) {
    const response: GetV2CoreAccountsAccountIdPersonsIdOutput =
      yield* client.invoke(GetV2CoreAccountsAccountIdPersonsIdOperation, input);
    return response;
  });
  /**
   * The PostV2CoreAccountsAccountIdPersonsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreAccountsAccountIdPersonsId = Effect.fn(
    "accounts.PostV2CoreAccountsAccountIdPersonsId",
  )(function* (input: PostV2CoreAccountsAccountIdPersonsIdInput) {
    const response: PostV2CoreAccountsAccountIdPersonsIdOutput =
      yield* client.invoke(
        PostV2CoreAccountsAccountIdPersonsIdOperation,
        input,
      );
    return response;
  });
  /**
   * The DeleteV2CoreAccountsAccountIdPersonsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteV2CoreAccountsAccountIdPersonsId = Effect.fn(
    "accounts.DeleteV2CoreAccountsAccountIdPersonsId",
  )(function* (input: DeleteV2CoreAccountsAccountIdPersonsIdInput) {
    const response: DeleteV2CoreAccountsAccountIdPersonsIdOutput =
      yield* client.invoke(
        DeleteV2CoreAccountsAccountIdPersonsIdOperation,
        input,
      );
    return response;
  });
  /**
   * The GetV2CoreAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreAccountsId = Effect.fn("accounts.GetV2CoreAccountsId")(
    function* (input: GetV2CoreAccountsIdInput) {
      const response: GetV2CoreAccountsIdOutput = yield* client.invoke(
        GetV2CoreAccountsIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostV2CoreAccountsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreAccountsId = Effect.fn("accounts.PostV2CoreAccountsId")(
    function* (input: PostV2CoreAccountsIdInput) {
      const response: PostV2CoreAccountsIdOutput = yield* client.invoke(
        PostV2CoreAccountsIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostV2CoreAccountsIdClose function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreAccountsIdClose = Effect.fn(
    "accounts.PostV2CoreAccountsIdClose",
  )(function* (input: PostV2CoreAccountsIdCloseInput) {
    const response: PostV2CoreAccountsIdCloseOutput = yield* client.invoke(
      PostV2CoreAccountsIdCloseOperation,
      input,
    );
    return response;
  });
  return {
    GetV2CoreAccounts,
    PostV2CoreAccounts,
    PostV2CoreAccountsAccountIdPersonTokens,
    GetV2CoreAccountsAccountIdPersonTokensId,
    GetV2CoreAccountsAccountIdPersons,
    PostV2CoreAccountsAccountIdPersons,
    GetV2CoreAccountsAccountIdPersonsId,
    PostV2CoreAccountsAccountIdPersonsId,
    DeleteV2CoreAccountsAccountIdPersonsId,
    GetV2CoreAccountsId,
    PostV2CoreAccountsId,
    PostV2CoreAccountsIdClose,
  };
});
