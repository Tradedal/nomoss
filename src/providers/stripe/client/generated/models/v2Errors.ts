// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";

export type Stripev2_error = {
  readonly error: {
    readonly code: string;
    readonly doc_url?: string;
    readonly message: string;
    readonly type?: string;
    readonly user_message?: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_not_found = {
  readonly error: { readonly code: "not_found"; readonly message: string } & {
    readonly [x: string]: Schema.Json;
  };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_resource_missing = {
  readonly error: {
    readonly code: "resource_missing";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_rate_limit_exceeded = {
  readonly error: {
    readonly code: "account_rate_limit_exceeded";
    readonly message: string;
    readonly type: "rate_limit";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_non_connect_platform_accounts_v2_access_blocked = {
  readonly error: {
    readonly code: "non_connect_platform_accounts_v2_access_blocked";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_platform_registration_required = {
  readonly error: {
    readonly code: "platform_registration_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_token_must_be_created_with_publishable_key = {
  readonly error: {
    readonly code: "token_must_be_created_with_publishable_key";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_accounts_v2_access_blocked = {
  readonly error: {
    readonly code: "accounts_v2_access_blocked";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_capability_not_supported = {
  readonly error: {
    readonly code: "account_capability_not_supported";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_configuration_not_supported = {
  readonly error: {
    readonly code: "account_configuration_not_supported";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_controller_express_dash_without_application_losses_or_fees =
  {
    readonly error: {
      readonly code: "account_controller_express_dash_without_application_losses_or_fees";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_controller_stripe_pricing_platform_liable = {
  readonly error: {
    readonly code: "account_controller_stripe_pricing_platform_liable";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_controller_ua_unsupported_configuration = {
  readonly error: {
    readonly code: "account_controller_ua_unsupported_configuration";
    readonly doc_url: string;
    readonly invalid_permutation: {
      readonly dashboard: string;
      readonly fees_collector: string;
      readonly losses_collector: string;
      readonly requirements_collector: string;
    } & { readonly [x: string]: Schema.Json };
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_controller_unsupported_configuration = {
  readonly error: {
    readonly code: "account_controller_unsupported_configuration";
    readonly doc_url: string;
    readonly invalid_permutation: {
      readonly dashboard: string;
      readonly fees_collector: string;
      readonly losses_collector: string;
      readonly requirements_collector: string;
    } & { readonly [x: string]: Schema.Json };
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_controller_unsupported_configuration_private_preview =
  {
    readonly error: {
      readonly code: "account_controller_unsupported_configuration_private_preview";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_country_unsupported_currency = {
  readonly error: {
    readonly code: "account_country_unsupported_currency";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_create_activation_required = {
  readonly error: {
    readonly code: "account_create_activation_required";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_blocked_due_to_suspicious_activity =
  {
    readonly error: {
      readonly code: "account_creation_blocked_due_to_suspicious_activity";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_identity_verification_incomplete = {
  readonly error: {
    readonly code: "account_creation_identity_verification_incomplete";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_invalid = {
  readonly error: {
    readonly code: "account_creation_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_liability_unacknowledged = {
  readonly error: {
    readonly code: "account_creation_liability_unacknowledged";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_liability_unacknowledged_and_identity_verification_incomplete =
  {
    readonly error: {
      readonly code: "account_creation_liability_unacknowledged_and_identity_verification_incomplete";
      readonly doc_url: string;
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_losses_collector_unavailable = {
  readonly error: {
    readonly code: "account_creation_losses_collector_unavailable";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged =
  {
    readonly error: {
      readonly code: "account_creation_requirement_collection_and_liability_unacknowledged";
      readonly doc_url: string;
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete =
  {
    readonly error: {
      readonly code: "account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete";
      readonly doc_url: string;
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_requirement_collection_unacknowledged =
  {
    readonly error: {
      readonly code: "account_creation_requirement_collection_unacknowledged";
      readonly doc_url: string;
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete =
  {
    readonly error: {
      readonly code: "account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete";
      readonly doc_url: string;
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_terms_of_service_not_accepted = {
  readonly error: {
    readonly code: "account_terms_of_service_not_accepted";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_token_required = {
  readonly error: {
    readonly code: "account_token_required";
    readonly doc_url: string;
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_address_characters_invalid = {
  readonly error: {
    readonly code: "address_characters_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_address_country_identity_country_mismatch = {
  readonly error: {
    readonly code: "address_country_identity_country_mismatch";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_address_postal_code_invalid = {
  readonly error: {
    readonly code: "address_postal_code_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_address_state_invalid = {
  readonly error: {
    readonly code: "address_state_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_address_town_invalid = {
  readonly error: {
    readonly code: "address_town_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_bgn_bank_accounts_unsupported = {
  readonly error: {
    readonly code: "bgn_bank_accounts_unsupported";
    readonly doc_url: string;
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_can_create_platform_owned_onboarding_accounts_required =
  {
    readonly error: {
      readonly code: "can_create_platform_owned_onboarding_accounts_required";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_create_connected_account = {
  readonly error: {
    readonly code: "cannot_create_connected_account";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_create_new_account_rejected = {
  readonly error: {
    readonly code: "cannot_create_new_account_rejected";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_cannot_be_unrequested_due_to_other_capability_requirement =
  {
    readonly error: {
      readonly code: "capability_cannot_be_unrequested_due_to_other_capability_requirement";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_not_available_for_dashboard_type = {
  readonly error: {
    readonly code: "capability_not_available_for_dashboard_type";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_not_available_for_entity_type_in_country =
  {
    readonly error: {
      readonly code: "capability_not_available_for_entity_type_in_country";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_not_available_for_loss_collector = {
  readonly error: {
    readonly code: "capability_not_available_for_loss_collector";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_not_available_in_country = {
  readonly error: {
    readonly code: "capability_not_available_in_country";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_not_available_in_platform_country = {
  readonly error: {
    readonly code: "capability_not_available_in_platform_country";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_not_available_without_other_capability = {
  readonly error: {
    readonly code: "capability_not_available_without_other_capability";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_capability_not_available_without_other_capability_in_country =
  {
    readonly error: {
      readonly code: "capability_not_available_without_other_capability_in_country";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_configuration_creation_invalid = {
  readonly error: {
    readonly code: "configuration_creation_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_connect_identity_not_verified = {
  readonly error: {
    readonly code: "connect_identity_not_verified";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_connect_profile_not_submitted = {
  readonly error: {
    readonly code: "connect_profile_not_submitted";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cross_border_connected_account_creation_not_allowed =
  {
    readonly error: {
      readonly code: "cross_border_connected_account_creation_not_allowed";
      readonly doc_url: string;
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_custom_account_beta = {
  readonly error: {
    readonly code: "custom_account_beta";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_date_of_birth_age_restriction = {
  readonly error: {
    readonly age_limit: string;
    readonly code: "date_of_birth_age_restriction";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_date_of_birth_invalid = {
  readonly error: {
    readonly code: "date_of_birth_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_default_currency_immutable = {
  readonly error: {
    readonly code: "default_currency_immutable";
    readonly doc_url: string;
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_default_payment_method_invalid = {
  readonly error: {
    readonly code: "default_payment_method_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_default_payment_method_invalid_type = {
  readonly error: {
    readonly code: "default_payment_method_invalid_type";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_directorship_declaration_not_allowed_during_account_creation =
  {
    readonly error: {
      readonly code: "directorship_declaration_not_allowed_during_account_creation";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_document_invalid = {
  readonly error: {
    readonly code: "document_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_document_purpose_invalid = {
  readonly error: {
    readonly code: "document_purpose_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_email_domain_invalid_for_recipient = {
  readonly error: {
    readonly code: "email_domain_invalid_for_recipient";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_email_invalid = {
  readonly error: {
    readonly code: "email_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_entity_type_not_supported_in_country = {
  readonly error: {
    readonly code: "entity_type_not_supported_in_country";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_high_risk_activities_none_cant_be_combined_with_other_options =
  {
    readonly error: {
      readonly code: "high_risk_activities_none_cant_be_combined_with_other_options";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_id_number_invalid = {
  readonly error: {
    readonly code: "id_number_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_idempotency_error = {
  readonly error: {
    readonly code: "idempotency_error";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_identity_country_required = {
  readonly error: {
    readonly code: "identity_country_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_incorrect_id_number_for_country = {
  readonly error: {
    readonly code: "incorrect_id_number_for_country";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_incorrect_token_wrong_type = {
  readonly error: {
    readonly code: "incorrect_token_wrong_type";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_account_token = {
  readonly error: {
    readonly code: "invalid_account_token";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_id_number_for_structure = {
  readonly error: {
    readonly code: "invalid_id_number_for_structure";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_id_number_registrar = {
  readonly error: {
    readonly code: "invalid_id_number_registrar";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_konbini_payments_support_hours = {
  readonly error: {
    readonly code: "invalid_konbini_payments_support_hours";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_konbini_payments_support_phone_number = {
  readonly error: {
    readonly code: "invalid_konbini_payments_support_phone_number";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_sepa_creditor_id_format = {
  readonly error: {
    readonly code: "invalid_sepa_creditor_id_format";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_timezone = {
  readonly error: {
    readonly code: "invalid_timezone";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invoice_rendering_template_invalid = {
  readonly error: {
    readonly code: "invoice_rendering_template_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_ip_address_invalid = {
  readonly error: {
    readonly code: "ip_address_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_mcc_invalid = {
  readonly error: {
    readonly code: "mcc_invalid";
    readonly doc_url: string;
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_non_jp_kana_kanji_address = {
  readonly error: {
    readonly code: "non_jp_kana_kanji_address";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_ownership_declaration_not_allowed_during_account_creation =
  {
    readonly error: {
      readonly code: "ownership_declaration_not_allowed_during_account_creation";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_param_alongside_account_token = {
  readonly error: {
    readonly code: "param_alongside_account_token";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_person_percent_ownership_invalid = {
  readonly error: {
    readonly code: "person_percent_ownership_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_phone_invalid = {
  readonly error: {
    readonly code: "phone_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_postal_code_required_for_jp_address = {
  readonly error: {
    readonly code: "postal_code_required_for_jp_address";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds =
  {
    readonly error: {
      readonly code: "purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_registration_date_invalid = {
  readonly error: {
    readonly code: "registration_date_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_script_characters_invalid = {
  readonly error: {
    readonly code: "script_characters_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_sepa_debit_creditor_identifier_not_allowed = {
  readonly error: {
    readonly code: "sepa_debit_creditor_identifier_not_allowed";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_sepa_debit_stripe_creditor_identifier = {
  readonly error: {
    readonly code: "sepa_debit_stripe_creditor_identifier";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_shipping_address_required = {
  readonly error: {
    readonly code: "shipping_address_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_shipping_name_required = {
  readonly error: {
    readonly code: "shipping_name_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_statement_descriptor_invalid = {
  readonly error: {
    readonly code: "statement_descriptor_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_structure_incompatible_for_entity_type_country = {
  readonly error: {
    readonly code: "structure_incompatible_for_entity_type_country";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_test_clock_disallowed_on_live_mode = {
  readonly error: {
    readonly code: "test_clock_disallowed_on_live_mode";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_test_clock_invalid = {
  readonly error: {
    readonly code: "test_clock_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_test_clocks_advance_in_progress = {
  readonly error: {
    readonly code: "test_clocks_advance_in_progress";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_test_clocks_customer_limit_reached = {
  readonly error: {
    readonly code: "test_clocks_customer_limit_reached";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_token_already_used = {
  readonly error: {
    readonly code: "token_already_used";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_token_expired = {
  readonly error: {
    readonly code: "token_expired";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_tos_acceptance_on_behalf_not_allowed = {
  readonly error: {
    readonly code: "tos_acceptance_on_behalf_not_allowed";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_field_for_configs = {
  readonly error: {
    readonly code: "unsupported_field_for_configs";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_identity_field_for_configs = {
  readonly error: {
    readonly code: "unsupported_identity_field_for_configs";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_postal_code = {
  readonly error: {
    readonly code: "unsupported_postal_code";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_state = {
  readonly error: {
    readonly code: "unsupported_state";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_url_invalid = {
  readonly error: {
    readonly code: "url_invalid";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_v1_token_invalid_in_v2 = {
  readonly error: {
    readonly code: "v1_token_invalid_in_v2";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_not_yet_compatible_with_v2 = {
  readonly error: {
    readonly code: "account_not_yet_compatible_with_v2";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_v1_account_instead_of_v2_account = {
  readonly error: {
    readonly code: "v1_account_instead_of_v2_account";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_v1_customer_instead_of_v2_account = {
  readonly error: {
    readonly code: "v1_customer_instead_of_v2_account";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_additional_legal_guardian_not_allowed = {
  readonly error: {
    readonly code: "additional_legal_guardian_not_allowed";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_additional_representative_not_allowed = {
  readonly error: {
    readonly code: "additional_representative_not_allowed";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_additional_tos_only_allowed_for_legal_guardian = {
  readonly error: {
    readonly code: "additional_tos_only_allowed_for_legal_guardian";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_address_country_mismatch = {
  readonly error: {
    readonly code: "address_country_mismatch";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_address_country_required = {
  readonly error: {
    readonly code: "address_country_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_authorizer_duplicate = {
  readonly error: {
    readonly code: "authorizer_duplicate";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_authorizer_relationship_invalid_for_representative =
  {
    readonly error: {
      readonly code: "authorizer_relationship_invalid_for_representative";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_duplicate_person_not_allowed = {
  readonly error: {
    readonly code: "duplicate_person_not_allowed";
    readonly duplicate_person_id: string;
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_incorrect_account_for_person_token = {
  readonly error: {
    readonly code: "incorrect_account_for_person_token";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_individual_additional_person_not_allowed = {
  readonly error: {
    readonly code: "individual_additional_person_not_allowed";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_person_token = {
  readonly error: {
    readonly code: "invalid_person_token";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_relationship_for_identity_type_structure_and_country =
  {
    readonly error: {
      readonly code: "invalid_relationship_for_identity_type_structure_and_country";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_legal_guardian_representative_not_allowed = {
  readonly error: {
    readonly code: "legal_guardian_representative_not_allowed";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_legal_guardian_requires_existing_representative = {
  readonly error: {
    readonly code: "legal_guardian_requires_existing_representative";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_param_alongside_person_token = {
  readonly error: {
    readonly code: "param_alongside_person_token";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_person_token_required = {
  readonly error: {
    readonly code: "person_token_required";
    readonly doc_url: string;
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_total_person_ownership_exceeded = {
  readonly error: {
    readonly code: "total_person_ownership_exceeded";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_immutable_identity_param = {
  readonly error: {
    readonly code: "immutable_identity_param";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_attach_payment_method_to_customer = {
  readonly error: {
    readonly code: "attach_payment_method_to_customer";
    readonly doc_url: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_add_connect_due_to_incompatible_default_payout_method =
  {
    readonly error: {
      readonly code: "cannot_add_connect_due_to_incompatible_default_payout_method";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_use_validate_location_on_customer_create = {
  readonly error: {
    readonly code: "cannot_use_validate_location_on_customer_create";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_configuration_cannot_be_deactivated = {
  readonly error: {
    readonly code: "configuration_cannot_be_deactivated";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_configuration_cannot_be_deactivated_due_to_other_capability_requirement =
  {
    readonly error: {
      readonly code: "configuration_cannot_be_deactivated_due_to_other_capability_requirement";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_configuration_cannot_be_deactivated_due_to_other_configuration =
  {
    readonly error: {
      readonly code: "configuration_cannot_be_deactivated_due_to_other_configuration";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_configuration_cannot_be_updated_while_deactivated = {
  readonly error: {
    readonly code: "configuration_cannot_be_updated_while_deactivated";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_customer_invalid_tax_location = {
  readonly error: {
    readonly code: "customer_invalid_tax_location";
    readonly incorrect_fields: ReadonlyArray<
      { readonly field: string; readonly type: string } & {
        readonly [x: string]: Schema.Json;
      }
    >;
    readonly message: string;
    readonly validate_location: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_default_outbound_destination_invalid = {
  readonly error: {
    readonly code: "default_outbound_destination_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_incompatible_default_payout_method = {
  readonly error: {
    readonly code: "incompatible_default_payout_method";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_incompatible_type = {
  readonly error: {
    readonly code: "payout_method_incompatible_type";
    readonly doc_url: string;
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_delete_account_with_balance = {
  readonly error: {
    readonly code: "cannot_delete_account_with_balance";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_delete_customer_with_available_cash_balance =
  {
    readonly error: {
      readonly code: "cannot_delete_customer_with_available_cash_balance";
      readonly doc_url: string;
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_configs_must_match_to_close = {
  readonly error: {
    readonly applied_configurations: ReadonlyArray<string>;
    readonly code: "configs_must_match_to_close";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_pending_transactions_cannot_be_deleted = {
  readonly error: {
    readonly code: "pending_transactions_cannot_be_deleted";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_stripe_loss_liable_cannot_be_deleted = {
  readonly error: {
    readonly code: "stripe_loss_liable_cannot_be_deleted";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_expired_azure_partner_authorization = {
  readonly error: {
    readonly code: "expired_azure_partner_authorization";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_azure_partner_authorization = {
  readonly error: {
    readonly code: "invalid_azure_partner_authorization";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_azure_partner_configuration = {
  readonly error: {
    readonly code: "invalid_azure_partner_configuration";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_blocked_gb_bank_account = {
  readonly error: {
    readonly code: "blocked_gb_bank_account";
    readonly message: string;
    readonly type: "blocked_by_stripe";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_gb_bank_account_incompatible_currency = {
  readonly error: {
    readonly code: "gb_bank_account_incompatible_currency";
    readonly currency: string;
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_gb_bank_account_unsupported_currency = {
  readonly error: {
    readonly code: "gb_bank_account_unsupported_currency";
    readonly currency: string;
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_gb_bank_account = {
  readonly error: {
    readonly code: "invalid_gb_bank_account";
    readonly invalid_param:
      | "account_number"
      | "currency"
      | "iban"
      | "sort_code";
    readonly message: string;
    readonly type: "invalid_vaulted_credential";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_limit_gb_bank_account = {
  readonly error: {
    readonly code: "limit_gb_bank_account";
    readonly message: string;
    readonly type: "quota_exceeded";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_gb_bank = {
  readonly error: {
    readonly code: "unsupported_gb_bank";
    readonly message: string;
    readonly type: "blocked_by_stripe";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_default_gb_bank_account_cannot_be_archived = {
  readonly error: {
    readonly code: "default_gb_bank_account_cannot_be_archived";
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_gb_bank_account_cannot_be_archived = {
  readonly error: {
    readonly code: "gb_bank_account_cannot_be_archived";
    readonly message: string;
    readonly type: "controlled_by_alternate_resource";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_gb_bank_account_cannot_be_unarchived = {
  readonly error: {
    readonly code: "gb_bank_account_cannot_be_unarchived";
    readonly message: string;
    readonly type: "controlled_by_alternate_resource";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_verification_status = {
  readonly error: {
    readonly code: "invalid_verification_status";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_blocked_us_bank_account = {
  readonly error: {
    readonly code: "blocked_us_bank_account";
    readonly message: string;
    readonly type: "blocked_by_stripe";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_us_bank_account = {
  readonly error: {
    readonly code: "invalid_us_bank_account";
    readonly invalid_param:
      | "account_number"
      | "currency"
      | "fedwire_routing_number"
      | "routing_number";
    readonly message: string;
    readonly type: "invalid_payment_method";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_limit_us_bank_account = {
  readonly error: {
    readonly code: "limit_us_bank_account";
    readonly message: string;
    readonly type: "quota_exceeded";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_us_bank = {
  readonly error: {
    readonly code: "unsupported_us_bank";
    readonly message: string;
    readonly type: "blocked_by_stripe";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_incompatible_currency = {
  readonly error: {
    readonly code: "us_bank_account_incompatible_currency";
    readonly currency: string;
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_unsupported_currency = {
  readonly error: {
    readonly code: "us_bank_account_unsupported_currency";
    readonly currency: string;
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_archived_us_bank_account = {
  readonly error: {
    readonly code: "archived_us_bank_account";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_field_already_exists = {
  readonly error: {
    readonly code: "us_bank_account_field_already_exists";
    readonly invalid_field: "fedwire_routing_number" | "routing_number";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_default_us_bank_account_cannot_be_archived = {
  readonly error: {
    readonly code: "default_us_bank_account_cannot_be_archived";
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_cannot_be_archived = {
  readonly error: {
    readonly code: "us_bank_account_cannot_be_archived";
    readonly message: string;
    readonly type: "controlled_by_alternate_resource";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_confirm_microdeposits_failure = {
  readonly error: {
    readonly code: "us_bank_account_confirm_microdeposits_failure";
    readonly message: string;
    readonly type: "verification_attempt_failed";
    readonly user_message: string;
    readonly verification_status:
      | "awaiting_verification"
      | "unverified"
      | "verification_failed"
      | "verified";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_microdeposits_cannot_be_confirmed = {
  readonly error: {
    readonly code: "us_bank_account_microdeposits_cannot_be_confirmed";
    readonly message: string;
    readonly type: "controlled_by_alternate_resource";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_microdeposits_not_sent_before_confirming =
  {
    readonly error: {
      readonly code: "us_bank_account_microdeposits_not_sent_before_confirming";
      readonly message: string;
      readonly type: "verification_not_initiated";
      readonly user_message: string;
      readonly verification_status:
        | "awaiting_verification"
        | "unverified"
        | "verification_failed"
        | "verified";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_microdeposits_timed_out = {
  readonly error: {
    readonly code: "us_bank_account_microdeposits_timed_out";
    readonly message: string;
    readonly type: "verification_expired";
    readonly user_message: string;
    readonly verification_status:
      | "awaiting_verification"
      | "unverified"
      | "verification_failed"
      | "verified";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_verification_failed = {
  readonly error: {
    readonly code: "us_bank_account_verification_failed";
    readonly message: string;
    readonly user_message: string;
    readonly verification_status:
      | "awaiting_verification"
      | "unverified"
      | "verification_failed"
      | "verified";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_microdeposits_cannot_be_sent = {
  readonly error: {
    readonly code: "us_bank_account_microdeposits_cannot_be_sent";
    readonly message: string;
    readonly type: "controlled_by_alternate_resource";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_microdeposits_failed_to_send = {
  readonly error: {
    readonly code: "us_bank_account_microdeposits_failed_to_send";
    readonly message: string;
    readonly user_message: string;
    readonly verification_status:
      | "awaiting_verification"
      | "unverified"
      | "verification_failed"
      | "verified";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_microdeposits_requires_routing_number =
  {
    readonly error: {
      readonly code: "us_bank_account_microdeposits_requires_routing_number";
      readonly message: string;
      readonly reason: string;
      readonly type: "cannot_proceed";
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_us_bank_account_cannot_be_unarchived = {
  readonly error: {
    readonly code: "us_bank_account_cannot_be_unarchived";
    readonly message: string;
    readonly type: "controlled_by_alternate_resource";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_address_invalid_page_token = {
  readonly error: {
    readonly code: "financial_address_invalid_page_token";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_balance_does_not_support_currency =
  {
    readonly error: {
      readonly code: "financial_account_balance_does_not_support_currency";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_capability_not_enabled = {
  readonly error: {
    readonly code: "financial_account_capability_not_enabled";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_capability_restricted = {
  readonly error: {
    readonly code: "financial_account_capability_restricted";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_feature_restricted = {
  readonly error: {
    readonly code: "financial_account_feature_restricted";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_not_in_open_status = {
  readonly error: {
    readonly code: "financial_account_not_in_open_status";
    readonly message: string;
    readonly type: "financial_account_not_open";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_operation_unsupported_for_property =
  {
    readonly error: {
      readonly code: "financial_account_operation_unsupported_for_property";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_operation_unsupported_for_type = {
  readonly error: {
    readonly code: "financial_account_operation_unsupported_for_type";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_unsupported_currency = {
  readonly error: {
    readonly code: "financial_account_unsupported_currency";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_account_unsupported_type = {
  readonly error: {
    readonly code: "financial_account_unsupported_type";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_address_account_unsupported_configuration =
  {
    readonly error: {
      readonly code: "financial_address_account_unsupported_configuration";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_address_type_and_settlement_currency_pair_unsupported =
  {
    readonly error: {
      readonly code: "financial_address_type_and_settlement_currency_pair_unsupported";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_addresses_creation_limit_exceeded = {
  readonly error: {
    readonly code: "financial_addresses_creation_limit_exceeded";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_storer_capability_missing = {
  readonly error: {
    readonly code: "storer_capability_missing";
    readonly message: string;
    readonly type: "feature_not_enabled";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_storer_capability_not_active = {
  readonly error: {
    readonly code: "storer_capability_not_active";
    readonly message: string;
    readonly type: "feature_not_enabled";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_country_for_bank_account_financial_address =
  {
    readonly error: {
      readonly code: "unsupported_country_for_bank_account_financial_address";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_crypto_wallet_settlement_currency = {
  readonly error: {
    readonly code: "unsupported_crypto_wallet_settlement_currency";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_currency = {
  readonly error: {
    readonly code: "unsupported_currency";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_operation_with_managed_financial_account =
  {
    readonly error: {
      readonly code: "unsupported_operation_with_managed_financial_account";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_from_closed_financial_account_unsupported =
  {
    readonly error: {
      readonly code: "inbound_transfer_from_closed_financial_account_unsupported";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_from_payment_method_mandate_inactive =
  {
    readonly error: {
      readonly code: "inbound_transfer_from_payment_method_mandate_inactive";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_from_payment_method_not_found = {
  readonly error: {
    readonly code: "inbound_transfer_from_payment_method_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_from_payment_method_type_unsupported =
  {
    readonly error: {
      readonly code: "inbound_transfer_from_payment_method_type_unsupported";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_from_payment_method_unusable = {
  readonly error: {
    readonly code: "inbound_transfer_from_payment_method_unusable";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_from_payment_method_unverified = {
  readonly error: {
    readonly code: "inbound_transfer_from_payment_method_unverified";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_not_allowed = {
  readonly error: {
    readonly code: "inbound_transfer_not_allowed";
    readonly message: string;
    readonly type: "blocked_by_stripe";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_inbound_transfer_to_financial_account_not_found = {
  readonly error: {
    readonly code: "inbound_transfer_to_financial_account_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_filters = {
  readonly error: {
    readonly code: "invalid_filters";
    readonly invalid_filters: ReadonlyArray<string>;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_page_token = {
  readonly error: {
    readonly code: "invalid_page_token";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_account_not_configured_as_recipient = {
  readonly error: {
    readonly code: "account_not_configured_as_recipient";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_amount_too_large_for_payout_method = {
  readonly error: {
    readonly code: "amount_too_large_for_payout_method";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_amount_too_large_for_preferred_networks = {
  readonly error: {
    readonly code: "amount_too_large_for_preferred_networks";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_amount_too_large_for_selected_delivery_option = {
  readonly error: {
    readonly code: "amount_too_large_for_selected_delivery_option";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_approval_required = {
  readonly error: {
    readonly code: "approval_required";
    readonly message: string;
    readonly rule_instruction?: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_approvals_cannot_be_only_approver_of_own_request = {
  readonly error: {
    readonly code: "approvals_cannot_be_only_approver_of_own_request";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_approvals_conflicting_approval_request_exists = {
  readonly error: {
    readonly code: "approvals_conflicting_approval_request_exists";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_approvals_request_blocked = {
  readonly error: {
    readonly code: "approvals_request_blocked";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_blocked_payout_method = {
  readonly error: {
    readonly code: "blocked_payout_method";
    readonly message: string;
    readonly type: "blocked_by_stripe";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_business_network_insufficient_permissions = {
  readonly error: {
    readonly code: "business_network_insufficient_permissions";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_business_network_profile_hidden = {
  readonly error: {
    readonly code: "business_network_profile_hidden";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_business_network_profile_not_found = {
  readonly error: {
    readonly code: "business_network_profile_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_card_payout_method_not_supported = {
  readonly error: {
    readonly code: "card_payout_method_not_supported";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cop_not_accepted = {
  readonly error: {
    readonly code: "cop_not_accepted";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_currency_required = {
  readonly error: {
    readonly code: "currency_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_default_payout_method_config_not_found = {
  readonly error: {
    readonly code: "default_payout_method_config_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_delivery_option_not_available = {
  readonly error: {
    readonly code: "delivery_option_not_available";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_delivery_option_not_supported = {
  readonly error: {
    readonly code: "delivery_option_not_supported";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_financial_address_creation_required = {
  readonly error: {
    readonly code: "financial_address_creation_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_from_balance_type_not_found = {
  readonly error: {
    readonly code: "from_balance_type_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_from_balance_unsupported_currency = {
  readonly error: {
    readonly code: "from_balance_unsupported_currency";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_from_financial_account_not_found = {
  readonly error: {
    readonly code: "from_financial_account_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_fx_quote_expired = {
  readonly error: {
    readonly code: "fx_quote_expired";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_idempotency_conflict = {
  readonly error: {
    readonly code: "idempotency_conflict";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_incompatible_delivery_options = {
  readonly error: {
    readonly code: "incompatible_delivery_options";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_insufficient_funds = {
  readonly error: {
    readonly code: "insufficient_funds";
    readonly message: string;
    readonly type: "insufficient_funds";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_outbound_flow = {
  readonly error: {
    readonly code: "invalid_outbound_flow";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_payout_method_country = {
  readonly error: {
    readonly code: "invalid_payout_method_country";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_payout_method_options = {
  readonly error: {
    readonly code: "invalid_payout_method_options";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_large_rate_drift = {
  readonly error: {
    readonly code: "large_rate_drift";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_network_not_supported_for_payout_method = {
  readonly error: {
    readonly code: "network_not_supported_for_payout_method";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_no_suitable_delivery_options_for_large_amount = {
  readonly error: {
    readonly code: "no_suitable_delivery_options_for_large_amount";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_flow_from_closed_financial_account_not_supported =
  {
    readonly error: {
      readonly code: "outbound_flow_from_closed_financial_account_not_supported";
      readonly message: string;
      readonly type: "capability_not_enabled";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_flow_from_closed_financial_account_unsupported =
  {
    readonly error: {
      readonly code: "outbound_flow_from_closed_financial_account_unsupported";
      readonly message: string;
      readonly type: "capability_not_enabled";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_flow_unsupported_country = {
  readonly error: {
    readonly code: "outbound_flow_unsupported_country";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_flow_unsupported_currency = {
  readonly error: {
    readonly code: "outbound_flow_unsupported_currency";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_cannot_be_processed = {
  readonly error: {
    readonly code: "outbound_payment_cannot_be_processed";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_check_recipient_name_too_long = {
  readonly error: {
    readonly code: "outbound_payment_check_recipient_name_too_long";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_ineligible_recipient_address = {
  readonly error: {
    readonly code: "outbound_payment_ineligible_recipient_address";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_invalid_check_attachment = {
  readonly error: {
    readonly code: "outbound_payment_invalid_check_attachment";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_invalid_check_signature = {
  readonly error: {
    readonly code: "outbound_payment_invalid_check_signature";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_invalid_paper_check_attachment = {
  readonly error: {
    readonly code: "outbound_payment_invalid_paper_check_attachment";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_invalid_paper_check_signature = {
  readonly error: {
    readonly code: "outbound_payment_invalid_paper_check_signature";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_memo_restricted_term = {
  readonly error: {
    readonly code: "outbound_payment_memo_restricted_term";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_not_allowed = {
  readonly error: {
    readonly code: "outbound_payment_not_allowed";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_paper_check_recipient_name_too_long =
  {
    readonly error: {
      readonly code: "outbound_payment_paper_check_recipient_name_too_long";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_quote_mismatch = {
  readonly error: {
    readonly code: "outbound_payment_quote_mismatch";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_quote_missing = {
  readonly error: {
    readonly code: "outbound_payment_quote_missing";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_already_consumed =
  {
    readonly error: {
      readonly code: "outbound_payment_recipient_verification_already_consumed";
      readonly message: string;
      readonly user_message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_awaiting_acknowledgement =
  {
    readonly error: {
      readonly code: "outbound_payment_recipient_verification_awaiting_acknowledgement";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_expired = {
  readonly error: {
    readonly code: "outbound_payment_recipient_verification_expired";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_missing = {
  readonly error: {
    readonly code: "outbound_payment_recipient_verification_missing";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_not_found = {
  readonly error: {
    readonly code: "outbound_payment_recipient_verification_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_payout_method_mismatch =
  {
    readonly error: {
      readonly code: "outbound_payment_recipient_verification_payout_method_mismatch";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_recipient_mismatch =
  {
    readonly error: {
      readonly code: "outbound_payment_recipient_verification_recipient_mismatch";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_recipient_verification_recipient_name_outdated =
  {
    readonly error: {
      readonly code: "outbound_payment_recipient_verification_recipient_name_outdated";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_requires_payout_intent = {
  readonly error: {
    readonly code: "outbound_payment_requires_payout_intent";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_archived = {
  readonly error: {
    readonly code: "payout_method_archived";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_disabled = {
  readonly error: {
    readonly code: "payout_method_disabled";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_expired = {
  readonly error: {
    readonly code: "payout_method_expired";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_invalid = {
  readonly error: {
    readonly code: "payout_method_invalid";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_unsupported_currency = {
  readonly error: {
    readonly code: "payout_method_unsupported_currency";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_unusable = {
  readonly error: {
    readonly code: "payout_method_unusable";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_pending_financial_account = {
  readonly error: {
    readonly code: "pending_financial_account";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_preferred_networks_not_available = {
  readonly error: {
    readonly code: "preferred_networks_not_available";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_amount_limit_exceeded = {
  readonly error: {
    readonly code: "recipient_amount_limit_exceeded";
    readonly message: string;
    readonly type: "quota_exceeded";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_capability_not_active = {
  readonly error: {
    readonly code: "recipient_capability_not_active";
    readonly message: string;
    readonly type: "capability_not_enabled";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_count_limit_exceeded = {
  readonly error: {
    readonly code: "recipient_count_limit_exceeded";
    readonly message: string;
    readonly type: "quota_exceeded";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_email_does_not_exist = {
  readonly error: {
    readonly code: "recipient_email_does_not_exist";
    readonly message: string;
    readonly type: "recipient_not_notifiable";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_feature_not_active = {
  readonly error: {
    readonly code: "recipient_feature_not_active";
    readonly message: string;
    readonly type: "feature_not_enabled";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_feature_not_active_for_suitable_delivery_option =
  {
    readonly error: {
      readonly code: "recipient_feature_not_active_for_suitable_delivery_option";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_submission_not_supported = {
  readonly error: {
    readonly code: "submission_not_supported";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_to_recipient_not_found = {
  readonly error: {
    readonly code: "to_recipient_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_parameter_delivery_options = {
  readonly error: {
    readonly code: "unsupported_parameter_delivery_options";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_already_canceled = {
  readonly error: {
    readonly code: "outbound_payment_already_canceled";
    readonly message: string;
    readonly type: "already_canceled";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_outbound_payment_not_cancelable = {
  readonly error: {
    readonly code: "outbound_payment_not_cancelable";
    readonly message: string;
    readonly type: "not_cancelable";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_active_outbound_setup_intent_exists_for_payout_method =
  {
    readonly error: {
      readonly code: "active_outbound_setup_intent_exists_for_payout_method";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_apple_pay_invalid_format = {
  readonly error: {
    readonly code: "apple_pay_invalid_format";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_apple_pay_no_signing_key = {
  readonly error: {
    readonly code: "apple_pay_no_signing_key";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_apple_pay_payment_decryption = {
  readonly error: {
    readonly code: "apple_pay_payment_decryption";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_apple_pay_pk_token_required = {
  readonly error: {
    readonly code: "apple_pay_pk_token_required";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_archived_payout_method = {
  readonly error: {
    readonly code: "archived_payout_method";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_incompatible_payout_method_currency = {
  readonly error: {
    readonly code: "incompatible_payout_method_currency";
    readonly currency: string;
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_fields = {
  readonly error: {
    readonly code: "invalid_fields";
    readonly flag_set_id: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_payout_method = {
  readonly error: {
    readonly code: "invalid_payout_method";
    readonly message: string;
    readonly type: "invalid_payout_method";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_payout_method_data = {
  readonly error: {
    readonly bank_account_data_error?: {
      readonly invalid_param:
        | "account_number"
        | "branch_number"
        | "currency"
        | "routing_number"
        | "swift_code";
    } & { readonly [x: string]: Schema.Json };
    readonly card_data_error?: {
      readonly invalid_param:
        | "currency"
        | "exp_date"
        | "exp_month"
        | "exp_year"
        | "number";
    } & { readonly [x: string]: Schema.Json };
    readonly code: "invalid_payout_method_data";
    readonly crypto_wallet_data_error?: {
      readonly invalid_param: "address" | "memo" | "network";
    } & { readonly [x: string]: Schema.Json };
    readonly message: string;
    readonly pix_data_error?: {
      readonly invalid_param: "br_code" | "pix_key";
    } & { readonly [x: string]: Schema.Json };
    readonly type: "invalid_payout_method";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_payout_method_update = {
  readonly error: {
    readonly code: "invalid_payout_method_update";
    readonly fields: ReadonlyArray<string>;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_invalid_status_payout_method = {
  readonly error: {
    readonly code: "invalid_status_payout_method";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_limit_payout_method = {
  readonly error: {
    readonly code: "limit_payout_method";
    readonly limit: number;
    readonly message: string;
    readonly type: "quota_exceeded";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_parameter_pair_exclusive = {
  readonly error: {
    readonly code: "parameter_pair_exclusive";
    readonly message: string;
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payment_method_unsupported_for_payouts = {
  readonly error: {
    readonly code: "payment_method_unsupported_for_payouts";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_method_cannot_be_updated = {
  readonly error: {
    readonly code: "payout_method_cannot_be_updated";
    readonly message: string;
    readonly type: "controlled_by_alternate_resource";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_resource_not_found = {
  readonly error: {
    readonly code: "resource_not_found";
    readonly id: string;
    readonly location: string;
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_payout_method = {
  readonly error: {
    readonly code: "unsupported_payout_method";
    readonly message: string;
    readonly type: "blocked_by_stripe";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_unsupported_payout_method_currency = {
  readonly error: {
    readonly code: "unsupported_payout_method_currency";
    readonly currency: string;
    readonly message: string;
    readonly reason: string;
    readonly type: "cannot_proceed";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_update_terminal_outbound_setup_intent = {
  readonly error: {
    readonly code: "cannot_update_terminal_outbound_setup_intent";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_cannot_cancel_terminal_outbound_setup_intent = {
  readonly error: {
    readonly code: "cannot_cancel_terminal_outbound_setup_intent";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_manual_confirmation_not_supported_with_schedule_options =
  {
    readonly error: {
      readonly code: "manual_confirmation_not_supported_with_schedule_options";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_intent_scheduled_date_exceed_maximum = {
  readonly error: {
    readonly code: "payout_intent_scheduled_date_exceed_maximum";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_intent_scheduled_date_too_soon = {
  readonly error: {
    readonly code: "payout_intent_scheduled_date_too_soon";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_schedule_options_incompatible_with_confirmation_required =
  {
    readonly error: {
      readonly code: "schedule_options_incompatible_with_confirmation_required";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_intent_cannot_be_modified = {
  readonly error: {
    readonly code: "payout_intent_cannot_be_modified";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_intent_not_cancelable = {
  readonly error: {
    readonly code: "payout_intent_not_cancelable";
    readonly message: string;
    readonly type: "not_cancelable";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_intent_fx_quote_expired = {
  readonly error: {
    readonly code: "payout_intent_fx_quote_expired";
    readonly message: string;
    readonly type: "fx_quote_needs_refresh";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_intent_large_rate_drift = {
  readonly error: {
    readonly code: "payout_intent_large_rate_drift";
    readonly message: string;
    readonly type: "fx_quote_needs_refresh";
    readonly user_message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_payout_intent_not_confirmable = {
  readonly error: {
    readonly code: "payout_intent_not_confirmable";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_fx_quote_invalid_for_payout_intent_without_fx = {
  readonly error: {
    readonly code: "fx_quote_invalid_for_payout_intent_without_fx";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_verification_account_not_configured_as_recipient =
  {
    readonly error: {
      readonly code: "recipient_verification_account_not_configured_as_recipient";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_verification_invalid_payout_method_country =
  {
    readonly error: {
      readonly code: "recipient_verification_invalid_payout_method_country";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_verification_invalid_payout_method_currency =
  {
    readonly error: {
      readonly code: "recipient_verification_invalid_payout_method_currency";
      readonly message: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_verification_not_supported = {
  readonly error: {
    readonly code: "recipient_verification_not_supported";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_verification_payout_method_not_found = {
  readonly error: {
    readonly code: "recipient_verification_payout_method_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_verification_recipient_not_found = {
  readonly error: {
    readonly code: "recipient_verification_recipient_not_found";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_error_recipient_verification_not_acknowledgable = {
  readonly error: {
    readonly code: "recipient_verification_not_acknowledgable";
    readonly message: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };

export const Stripev2_error = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.String.annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        doc_url: Schema.optionalKey(
          Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
        ),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.optionalKey(
          Schema.String.annotate({ description: "The type of error returned" }),
        ),
        user_message: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Stripe error response",
  identifier: "Stripev2.error",
});
export const Stripev2_error_not_found = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("not_found").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "The resource wasn't found.",
  identifier: "Stripev2.error.not_found",
});
export const Stripev2_error_resource_missing = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("resource_missing").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when looking up a non-existent product catalog import.",
  identifier: "Stripev2.error.resource_missing",
});
export const Stripev2_error_account_rate_limit_exceeded = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("account_rate_limit_exceeded").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("rate_limit").annotate({
          description: "The type of error returned",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Account cannot exceed a configured concurrency rate limit on updates.",
  identifier: "Stripev2.error.account_rate_limit_exceeded",
});
export const Stripev2_error_non_connect_platform_accounts_v2_access_blocked =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "non_connect_platform_accounts_v2_access_blocked",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Needs to use the newer API version or onboard to Connect.",
    identifier:
      "Stripev2.error.non_connect_platform_accounts_v2_access_blocked",
  });
export const Stripev2_error_platform_registration_required =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("platform_registration_required").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The direct merchant has not signed up for Connect and cannot create connected accounts.",
    identifier: "Stripev2.error.platform_registration_required",
  });
export const Stripev2_error_token_must_be_created_with_publishable_key =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "token_must_be_created_with_publishable_key",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Token must be created with publishable key.",
    identifier: "Stripev2.error.token_must_be_created_with_publishable_key",
  });
export const Stripev2_error_accounts_v2_access_blocked = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("accounts_v2_access_blocked").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Accounts v2 is not enabled for your merchant.",
  identifier: "Stripev2.error.accounts_v2_access_blocked",
});
export const Stripev2_error_account_capability_not_supported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("account_capability_not_supported").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Requested capability is not available.",
    identifier: "Stripev2.error.account_capability_not_supported",
  });
export const Stripev2_error_account_configuration_not_supported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("account_configuration_not_supported").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The requested configuration is not available for the account.",
    identifier: "Stripev2.error.account_configuration_not_supported",
  });
export const Stripev2_error_account_controller_express_dash_without_application_losses_or_fees =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_controller_express_dash_without_application_losses_or_fees",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "If `dashboard` is `express`, `fees_collector` must be `application` and `losses_collector` must be `application`.",
    identifier:
      "Stripev2.error.account_controller_express_dash_without_application_losses_or_fees",
  });
export const Stripev2_error_account_controller_stripe_pricing_platform_liable =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_controller_stripe_pricing_platform_liable",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "If `losses_collector` is `application`, `fees_collector` must also be `application`.",
    identifier:
      "Stripev2.error.account_controller_stripe_pricing_platform_liable",
  });
export const Stripev2_error_account_controller_ua_unsupported_configuration =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_controller_ua_unsupported_configuration",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          invalid_permutation: Schema.StructWithRest(
            Schema.Struct({
              dashboard: Schema.String.annotate({
                description: "The value provided for the dashboard field.",
              }),
              fees_collector: Schema.String.annotate({
                description: "The value provided for the fees_collector field.",
              }),
              losses_collector: Schema.String.annotate({
                description:
                  "The value provided for the losses_collector field.",
              }),
              requirements_collector: Schema.String.annotate({
                description:
                  "The value provided for the requirements_collector field.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "The invalid permutation provided." }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Connect integration combination is not supported when UA beta is enabled.",
    identifier:
      "Stripev2.error.account_controller_ua_unsupported_configuration",
  });
export const Stripev2_error_account_controller_unsupported_configuration =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_controller_unsupported_configuration",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          invalid_permutation: Schema.StructWithRest(
            Schema.Struct({
              dashboard: Schema.String.annotate({
                description: "The value provided for the dashboard field.",
              }),
              fees_collector: Schema.String.annotate({
                description: "The value provided for the fees_collector field.",
              }),
              losses_collector: Schema.String.annotate({
                description:
                  "The value provided for the losses_collector field.",
              }),
              requirements_collector: Schema.String.annotate({
                description:
                  "The value provided for the requirements_collector field.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "The invalid permutation provided." }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Connect integration combination is not supported when UA beta is disabled.",
    identifier: "Stripev2.error.account_controller_unsupported_configuration",
  });
export const Stripev2_error_account_controller_unsupported_configuration_private_preview =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_controller_unsupported_configuration_private_preview",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Responsibility combinations is not supported in private preview.",
    identifier:
      "Stripev2.error.account_controller_unsupported_configuration_private_preview",
  });
export const Stripev2_error_account_country_unsupported_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("account_country_unsupported_currency").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Currency is not allowed for the account's country.",
    identifier: "Stripev2.error.account_country_unsupported_currency",
  });
export const Stripev2_error_account_create_activation_required =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("account_create_activation_required").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Platform must be activated to create connected accounts.",
    identifier: "Stripev2.error.account_create_activation_required",
  });
export const Stripev2_error_account_creation_blocked_due_to_suspicious_activity =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_blocked_due_to_suspicious_activity",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Account creation is temporarily restricted. Confirm in the Stripe Dashboard\nthat you intended to create this account, then retry.",
    identifier:
      "Stripev2.error.account_creation_blocked_due_to_suspicious_activity",
  });
export const Stripev2_error_account_creation_identity_verification_incomplete =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_identity_verification_incomplete",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Identity verification is required before creating a connected account where your platform is liable for negative balances.",
    identifier:
      "Stripev2.error.account_creation_identity_verification_incomplete",
  });
export const Stripev2_error_account_creation_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("account_creation_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Account creation is invalid.",
  identifier: "Stripev2.error.account_creation_invalid",
});
export const Stripev2_error_account_creation_liability_unacknowledged =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_liability_unacknowledged",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Account creation error - liability unacknowledged.",
    identifier: "Stripev2.error.account_creation_liability_unacknowledged",
  });
export const Stripev2_error_account_creation_liability_unacknowledged_and_identity_verification_incomplete =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_liability_unacknowledged_and_identity_verification_incomplete",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Identity verification and loss liability acknowledgement are required.",
    identifier:
      "Stripev2.error.account_creation_liability_unacknowledged_and_identity_verification_incomplete",
  });
export const Stripev2_error_account_creation_losses_collector_unavailable =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_losses_collector_unavailable",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Account creation error - losses collector unavailable.",
    identifier: "Stripev2.error.account_creation_losses_collector_unavailable",
  });
export const Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_requirement_collection_and_liability_unacknowledged",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Account creation error - requirement collection and liability unacknowledged.",
    identifier:
      "Stripev2.error.account_creation_requirement_collection_and_liability_unacknowledged",
  });
export const Stripev2_error_account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Identity verification and acknowledgement of loss liability and requirements collection responsibilities are required.",
    identifier:
      "Stripev2.error.account_creation_requirement_collection_and_liability_unacknowledged_and_identity_verification_incomplete",
  });
export const Stripev2_error_account_creation_requirement_collection_unacknowledged =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_requirement_collection_unacknowledged",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Account creation error - requirement collection unacknowledged.",
    identifier:
      "Stripev2.error.account_creation_requirement_collection_unacknowledged",
  });
export const Stripev2_error_account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Identity verification and requirements collection acknowledgement are required.",
    identifier:
      "Stripev2.error.account_creation_requirement_collection_unacknowledged_and_identity_verification_incomplete",
  });
export const Stripev2_error_account_terms_of_service_not_accepted =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "account_terms_of_service_not_accepted",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Terms of service must be accepted before adding merchant configuration.",
    identifier: "Stripev2.error.account_terms_of_service_not_accepted",
  });
export const Stripev2_error_account_token_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("account_token_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        doc_url: Schema.String.annotate({
          description: "A URL to more information about the error reported",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Account token required for platforms in mandated countries (e.g., France).",
  identifier: "Stripev2.error.account_token_required",
});
export const Stripev2_error_address_characters_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("address_characters_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Invalid characters are provided for address fields.",
  identifier: "Stripev2.error.address_characters_invalid",
});
export const Stripev2_error_address_country_identity_country_mismatch =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "address_country_identity_country_mismatch",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Address country doesn't match identity country.",
    identifier: "Stripev2.error.address_country_identity_country_mismatch",
  });
export const Stripev2_error_address_postal_code_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("address_postal_code_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Address postal code is invalid.",
  identifier: "Stripev2.error.address_postal_code_invalid",
});
export const Stripev2_error_address_state_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("address_state_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Address state is invalid.",
  identifier: "Stripev2.error.address_state_invalid",
});
export const Stripev2_error_address_town_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("address_town_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Address town is invalid.",
  identifier: "Stripev2.error.address_town_invalid",
});
export const Stripev2_error_bgn_bank_accounts_unsupported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("bgn_bank_accounts_unsupported").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Creating accounts with the BGN currency is no longer supported, as Bulgaria is now using the Euro as of 2026-01-01.",
    identifier: "Stripev2.error.bgn_bank_accounts_unsupported",
  });
export const Stripev2_error_can_create_platform_owned_onboarding_accounts_required =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "can_create_platform_owned_onboarding_accounts_required",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Dormant accounts cannot create accounts where requirements collector is application (this is an account takeover prevention measure).",
    identifier:
      "Stripev2.error.can_create_platform_owned_onboarding_accounts_required",
  });
export const Stripev2_error_cannot_create_connected_account =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("cannot_create_connected_account").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Platform is in an invalid state and cannot create connected accounts.",
    identifier: "Stripev2.error.cannot_create_connected_account",
  });
export const Stripev2_error_cannot_create_new_account_rejected =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("cannot_create_new_account_rejected").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Platform is in a rejected state and cannot create connected accounts.",
    identifier: "Stripev2.error.cannot_create_new_account_rejected",
  });
export const Stripev2_error_capability_cannot_be_unrequested_due_to_other_capability_requirement =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "capability_cannot_be_unrequested_due_to_other_capability_requirement",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Feature cannot be unrequested due to being a requirement for another feature.",
    identifier:
      "Stripev2.error.capability_cannot_be_unrequested_due_to_other_capability_requirement",
  });
export const Stripev2_error_capability_not_available_for_dashboard_type =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "capability_not_available_for_dashboard_type",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Feature cannot be requested for the dashboard type.",
    identifier: "Stripev2.error.capability_not_available_for_dashboard_type",
  });
export const Stripev2_error_capability_not_available_for_entity_type_in_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "capability_not_available_for_entity_type_in_country",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Requested feature is not available for the entity type in your country.",
    identifier:
      "Stripev2.error.capability_not_available_for_entity_type_in_country",
  });
export const Stripev2_error_capability_not_available_for_loss_collector =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "capability_not_available_for_loss_collector",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "A v2 Account cannot have both the specified capability and Stripe-owned loss liability.",
    identifier: "Stripev2.error.capability_not_available_for_loss_collector",
  });
export const Stripev2_error_capability_not_available_in_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("capability_not_available_in_country").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Requested capability is not available in your country.",
    identifier: "Stripev2.error.capability_not_available_in_country",
  });
export const Stripev2_error_capability_not_available_in_platform_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "capability_not_available_in_platform_country",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Feature cannot be requested given the platform's country.",
    identifier: "Stripev2.error.capability_not_available_in_platform_country",
  });
export const Stripev2_error_capability_not_available_without_other_capability =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "capability_not_available_without_other_capability",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Requested feature is not available without also requesting a different feature.",
    identifier:
      "Stripev2.error.capability_not_available_without_other_capability",
  });
export const Stripev2_error_capability_not_available_without_other_capability_in_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "capability_not_available_without_other_capability_in_country",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Requested feature is not available without also requesting a different feature in your country.",
    identifier:
      "Stripev2.error.capability_not_available_without_other_capability_in_country",
  });
export const Stripev2_error_configuration_creation_invalid =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("configuration_creation_invalid").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Cannot create an account with an invalid configuration.",
    identifier: "Stripev2.error.configuration_creation_invalid",
  });
export const Stripev2_error_connect_identity_not_verified =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("connect_identity_not_verified").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Platform is not verified and cannot create connected accounts.",
    identifier: "Stripev2.error.connect_identity_not_verified",
  });
export const Stripev2_error_connect_profile_not_submitted =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("connect_profile_not_submitted").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Platform has not completed platform questionnaire and cannot create connected accounts.",
    identifier: "Stripev2.error.connect_profile_not_submitted",
  });
export const Stripev2_error_cross_border_connected_account_creation_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "cross_border_connected_account_creation_not_allowed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Cross-border connected account creation is not allowed for this platform/account country combination.",
    identifier:
      "Stripev2.error.cross_border_connected_account_creation_not_allowed",
  });
export const Stripev2_error_custom_account_beta = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("custom_account_beta").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Custom accounts cannot be created in certain countries.",
  identifier: "Stripev2.error.custom_account_beta",
});
export const Stripev2_error_date_of_birth_age_restriction =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          age_limit: Schema.String.annotate({
            description:
              "Representative age should be greater than or equal to the age_limit.",
          }),
          code: Schema.Literal("date_of_birth_age_restriction").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Representative date of birth does not meet the age limit.",
    identifier: "Stripev2.error.date_of_birth_age_restriction",
  });
export const Stripev2_error_date_of_birth_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("date_of_birth_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Representative date of birth is provided an invalid date or a future date.",
  identifier: "Stripev2.error.date_of_birth_invalid",
});
export const Stripev2_error_default_currency_immutable = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("default_currency_immutable").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        doc_url: Schema.String.annotate({
          description: "A URL to more information about the error reported",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Cannot change `defaults.currency` post account activation.",
  identifier: "Stripev2.error.default_currency_immutable",
});
export const Stripev2_error_default_payment_method_invalid =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("default_payment_method_invalid").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Default payment method provided for a customer does not exist or is otherwise invalid.",
    identifier: "Stripev2.error.default_payment_method_invalid",
  });
export const Stripev2_error_default_payment_method_invalid_type =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("default_payment_method_invalid_type").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Specified payment method exists but its type is not allowed to be the default payment method.",
    identifier: "Stripev2.error.default_payment_method_invalid_type",
  });
export const Stripev2_error_directorship_declaration_not_allowed_during_account_creation =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "directorship_declaration_not_allowed_during_account_creation",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Directorship declaration is not allowed during account creation.",
    identifier:
      "Stripev2.error.directorship_declaration_not_allowed_during_account_creation",
  });
export const Stripev2_error_document_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("document_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Provided file tokens for documents are invalid, not found, deleted, or belong to a different account.",
  identifier: "Stripev2.error.document_invalid",
});
export const Stripev2_error_document_purpose_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("document_purpose_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Provided file tokens for documents are of the wrong purpose.",
  identifier: "Stripev2.error.document_purpose_invalid",
});
export const Stripev2_error_email_domain_invalid_for_recipient =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("email_domain_invalid_for_recipient").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Email contains unsupported domain.",
    identifier: "Stripev2.error.email_domain_invalid_for_recipient",
  });
export const Stripev2_error_email_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("email_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Incorrect email is provided.",
  identifier: "Stripev2.error.email_invalid",
});
export const Stripev2_error_entity_type_not_supported_in_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("entity_type_not_supported_in_country").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The `identity.entity_type` value is not supported in a given `identity.country`.",
    identifier: "Stripev2.error.entity_type_not_supported_in_country",
  });
export const Stripev2_error_high_risk_activities_none_cant_be_combined_with_other_options =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "high_risk_activities_none_cant_be_combined_with_other_options",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "NONE is combined with another value in the HighRiskActivities list.",
    identifier:
      "Stripev2.error.high_risk_activities_none_cant_be_combined_with_other_options",
  });
export const Stripev2_error_id_number_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("id_number_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Provided ID number is of the wrong format for the given type.",
  identifier: "Stripev2.error.id_number_invalid",
});
export const Stripev2_error_idempotency_error = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("idempotency_error").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "An idempotent retry occurred with different request parameters.",
  identifier: "Stripev2.error.idempotency_error",
});
export const Stripev2_error_identity_country_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("identity_country_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "The `identity.country` value is required but not provided.",
  identifier: "Stripev2.error.identity_country_required",
});
export const Stripev2_error_incorrect_id_number_for_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("incorrect_id_number_for_country").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Incorrect ID number is provided for a country.",
    identifier: "Stripev2.error.incorrect_id_number_for_country",
  });
export const Stripev2_error_incorrect_token_wrong_type = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("incorrect_token_wrong_type").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "The incorrect token type is provided .",
  identifier: "Stripev2.error.incorrect_token_wrong_type",
});
export const Stripev2_error_invalid_account_token = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_account_token").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Invalid account token.",
  identifier: "Stripev2.error.invalid_account_token",
});
export const Stripev2_error_invalid_id_number_for_structure =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_id_number_for_structure").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "ID number is provided that is not permitted for the Identity's entity type and business structure.",
    identifier: "Stripev2.error.invalid_id_number_for_structure",
  });
export const Stripev2_error_invalid_id_number_registrar = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_id_number_registrar").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        doc_url: Schema.String.annotate({
          description: "A URL to more information about the error reported",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "The `identity.business_details.id_numbers.registrar` value is an invalid DE registrar.",
  identifier: "Stripev2.error.invalid_id_number_registrar",
});
export const Stripev2_error_invalid_konbini_payments_support_hours =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "invalid_konbini_payments_support_hours",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Konbini Payments Support Hours is Invalid.",
    identifier: "Stripev2.error.invalid_konbini_payments_support_hours",
  });
export const Stripev2_error_invalid_konbini_payments_support_phone_number =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "invalid_konbini_payments_support_phone_number",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Konbini Payments Support Phone Number is Invalid.",
    identifier: "Stripev2.error.invalid_konbini_payments_support_phone_number",
  });
export const Stripev2_error_invalid_sepa_creditor_id_format =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_sepa_creditor_id_format").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "The SEPA Creditor Identifier is invalid.",
    identifier: "Stripev2.error.invalid_sepa_creditor_id_format",
  });
export const Stripev2_error_invalid_timezone = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_timezone").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Timezone provided in account defaults is invalid.",
  identifier: "Stripev2.error.invalid_timezone",
});
export const Stripev2_error_invoice_rendering_template_invalid =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invoice_rendering_template_invalid").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Invoice rendering template does not exist or is otherwise invalid.",
    identifier: "Stripev2.error.invoice_rendering_template_invalid",
  });
export const Stripev2_error_ip_address_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("ip_address_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Invalid IP address is provided.",
  identifier: "Stripev2.error.ip_address_invalid",
});
export const Stripev2_error_mcc_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("mcc_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        doc_url: Schema.String.annotate({
          description: "A URL to more information about the error reported",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "MCC is invalid for `configuration.merchant.mcc`.",
  identifier: "Stripev2.error.mcc_invalid",
});
export const Stripev2_error_non_jp_kana_kanji_address = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("non_jp_kana_kanji_address").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Kana Kanji script addresses must have JP country.",
  identifier: "Stripev2.error.non_jp_kana_kanji_address",
});
export const Stripev2_error_ownership_declaration_not_allowed_during_account_creation =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "ownership_declaration_not_allowed_during_account_creation",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Ownership declaration is not allowed during account creation.",
    identifier:
      "Stripev2.error.ownership_declaration_not_allowed_during_account_creation",
  });
export const Stripev2_error_param_alongside_account_token =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("param_alongside_account_token").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Parameter cannot be passed alongside account_token.",
    identifier: "Stripev2.error.param_alongside_account_token",
  });
export const Stripev2_error_person_percent_ownership_invalid =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("person_percent_ownership_invalid").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when relationship.owner is set to true but the ownership percentage is set to 0%.",
    identifier: "Stripev2.error.person_percent_ownership_invalid",
  });
export const Stripev2_error_phone_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("phone_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Phone number is invalid.",
  identifier: "Stripev2.error.phone_invalid",
});
export const Stripev2_error_postal_code_required_for_jp_address =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("postal_code_required_for_jp_address").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Postal code is required for Japanese addresses.",
    identifier: "Stripev2.error.postal_code_required_for_jp_address",
  });
export const Stripev2_error_purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "PurposeOfFundsDescription is not empty while PurposeOfFunds is not OTHER.",
    identifier:
      "Stripev2.error.purpose_of_funds_description_must_be_empty_for_non_other_purpose_of_funds",
  });
export const Stripev2_error_registration_date_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("registration_date_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Registration date must be in the past.",
  identifier: "Stripev2.error.registration_date_invalid",
});
export const Stripev2_error_script_characters_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("script_characters_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Provided script characters are invalid for the script.",
  identifier: "Stripev2.error.script_characters_invalid",
});
export const Stripev2_error_sepa_debit_creditor_identifier_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "sepa_debit_creditor_identifier_not_allowed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "The SEPA Creditor Identifier is blocked from use at Stripe.",
    identifier: "Stripev2.error.sepa_debit_creditor_identifier_not_allowed",
  });
export const Stripev2_error_sepa_debit_stripe_creditor_identifier =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "sepa_debit_stripe_creditor_identifier",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "A Stripe-owned shared SEPA Creditor Identifier cannot be set as a custom identifier.",
    identifier: "Stripev2.error.sepa_debit_stripe_creditor_identifier",
  });
export const Stripev2_error_shipping_address_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("shipping_address_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Shipping address is required within the shipping hash.",
  identifier: "Stripev2.error.shipping_address_required",
});
export const Stripev2_error_shipping_name_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("shipping_name_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Shipping name is required within the shipping hash.",
  identifier: "Stripev2.error.shipping_name_required",
});
export const Stripev2_error_statement_descriptor_invalid =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("statement_descriptor_invalid").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Statement descriptor is invalid.",
    identifier: "Stripev2.error.statement_descriptor_invalid",
  });
export const Stripev2_error_structure_incompatible_for_entity_type_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "structure_incompatible_for_entity_type_country",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The `business_details.structure` value is not valid for `identity.country` and `identity.entity_type`.",
    identifier: "Stripev2.error.structure_incompatible_for_entity_type_country",
  });
export const Stripev2_error_test_clock_disallowed_on_live_mode =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("test_clock_disallowed_on_live_mode").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Cannot set a test clock on a livemode customer.",
    identifier: "Stripev2.error.test_clock_disallowed_on_live_mode",
  });
export const Stripev2_error_test_clock_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("test_clock_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Test clock does not exist or is otherwise invalid.",
  identifier: "Stripev2.error.test_clock_invalid",
});
export const Stripev2_error_test_clocks_advance_in_progress =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("test_clocks_advance_in_progress").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Cannot modify a test clock that is currently advancing.",
    identifier: "Stripev2.error.test_clocks_advance_in_progress",
  });
export const Stripev2_error_test_clocks_customer_limit_reached =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("test_clocks_customer_limit_reached").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Cannot add customer to a test clock that has already reached its customer limit.",
    identifier: "Stripev2.error.test_clocks_customer_limit_reached",
  });
export const Stripev2_error_token_already_used = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("token_already_used").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "The token is re-used with a different idempotency key.",
  identifier: "Stripev2.error.token_already_used",
});
export const Stripev2_error_token_expired = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("token_expired").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Token has expired.",
  identifier: "Stripev2.error.token_expired",
});
export const Stripev2_error_tos_acceptance_on_behalf_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("tos_acceptance_on_behalf_not_allowed").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "TOS cannot be accepted on behalf of accounts when requirement collection is `stripe`.",
    identifier: "Stripev2.error.tos_acceptance_on_behalf_not_allowed",
  });
export const Stripev2_error_unsupported_field_for_configs =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("unsupported_field_for_configs").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Cannot set responsibilities on the current configurations.",
    identifier: "Stripev2.error.unsupported_field_for_configs",
  });
export const Stripev2_error_unsupported_identity_field_for_configs =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "unsupported_identity_field_for_configs",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Cannot set identity fields when the Account is only configured as a customer.",
    identifier: "Stripev2.error.unsupported_identity_field_for_configs",
  });
export const Stripev2_error_unsupported_postal_code = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("unsupported_postal_code").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Address is in an unsupported postal code.",
  identifier: "Stripev2.error.unsupported_postal_code",
});
export const Stripev2_error_unsupported_state = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("unsupported_state").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Address is in an unsupported state.",
  identifier: "Stripev2.error.unsupported_state",
});
export const Stripev2_error_url_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("url_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "URL is invalid.",
  identifier: "Stripev2.error.url_invalid",
});
export const Stripev2_error_v1_token_invalid_in_v2 = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("v1_token_invalid_in_v2").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "A v1 token ID is passed in v2 APIs.",
  identifier: "Stripev2.error.v1_token_invalid_in_v2",
});
export const Stripev2_error_account_not_yet_compatible_with_v2 =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("account_not_yet_compatible_with_v2").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Account is not yet compatible with V2 APIs.",
    identifier: "Stripev2.error.account_not_yet_compatible_with_v2",
  });
export const Stripev2_error_v1_account_instead_of_v2_account =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("v1_account_instead_of_v2_account").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "V1 Account ID cannot be used in V2 Account APIs.",
    identifier: "Stripev2.error.v1_account_instead_of_v2_account",
  });
export const Stripev2_error_v1_customer_instead_of_v2_account =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("v1_customer_instead_of_v2_account").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "V1 Customer ID cannot be used in V2 Account APIs.",
    identifier: "Stripev2.error.v1_customer_instead_of_v2_account",
  });
export const Stripev2_error_additional_legal_guardian_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "additional_legal_guardian_not_allowed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "More than one legal guardian is added to an account.",
    identifier: "Stripev2.error.additional_legal_guardian_not_allowed",
  });
export const Stripev2_error_additional_representative_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "additional_representative_not_allowed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "More than one representative is added to an account.",
    identifier: "Stripev2.error.additional_representative_not_allowed",
  });
export const Stripev2_error_additional_tos_only_allowed_for_legal_guardian =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "additional_tos_only_allowed_for_legal_guardian",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Additional terms of service are signed by someone other than the legal guardian.",
    identifier: "Stripev2.error.additional_tos_only_allowed_for_legal_guardian",
  });
export const Stripev2_error_address_country_mismatch = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("address_country_mismatch").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Registered/script address country doesn't match residential address country.",
  identifier: "Stripev2.error.address_country_mismatch",
});
export const Stripev2_error_address_country_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("address_country_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Address country is required but not provided.",
  identifier: "Stripev2.error.address_country_required",
});
export const Stripev2_error_authorizer_duplicate = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("authorizer_duplicate").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "There can only be one authorizer.",
  identifier: "Stripev2.error.authorizer_duplicate",
});
export const Stripev2_error_authorizer_relationship_invalid_for_representative =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "authorizer_relationship_invalid_for_representative",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "An authorizer cannot be a representative.",
    identifier:
      "Stripev2.error.authorizer_relationship_invalid_for_representative",
  });
export const Stripev2_error_duplicate_person_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("duplicate_person_not_allowed").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          duplicate_person_id: Schema.String.annotate({
            description: "The ID of the other person with identical fields.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Duplicate person is added to an account.",
    identifier: "Stripev2.error.duplicate_person_not_allowed",
  });
export const Stripev2_error_incorrect_account_for_person_token =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("incorrect_account_for_person_token").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "A person token is created with one account but used on a different account.",
    identifier: "Stripev2.error.incorrect_account_for_person_token",
  });
export const Stripev2_error_individual_additional_person_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "individual_additional_person_not_allowed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Additional person is added for an individual business type.",
    identifier: "Stripev2.error.individual_additional_person_not_allowed",
  });
export const Stripev2_error_invalid_person_token = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_person_token").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Invalid person token.",
  identifier: "Stripev2.error.invalid_person_token",
});
export const Stripev2_error_invalid_relationship_for_identity_type_structure_and_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "invalid_relationship_for_identity_type_structure_and_country",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Some relationships are specific to type, structure, and country.",
    identifier:
      "Stripev2.error.invalid_relationship_for_identity_type_structure_and_country",
  });
export const Stripev2_error_legal_guardian_representative_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "legal_guardian_representative_not_allowed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Person is designated as both legal guardian and representative.",
    identifier: "Stripev2.error.legal_guardian_representative_not_allowed",
  });
export const Stripev2_error_legal_guardian_requires_existing_representative =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "legal_guardian_requires_existing_representative",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "A legal guardian may not be added to the account without an existing representative.",
    identifier:
      "Stripev2.error.legal_guardian_requires_existing_representative",
  });
export const Stripev2_error_param_alongside_person_token =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("param_alongside_person_token").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Parameter cannot be passed alongside person_token.",
    identifier: "Stripev2.error.param_alongside_person_token",
  });
export const Stripev2_error_person_token_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("person_token_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        doc_url: Schema.String.annotate({
          description: "A URL to more information about the error reported",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Person token required for platforms in mandated countries (e.g., France).",
  identifier: "Stripev2.error.person_token_required",
});
export const Stripev2_error_total_person_ownership_exceeded =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("total_person_ownership_exceeded").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Total ownership percentages of all Persons on the account exceeds 100%.",
    identifier: "Stripev2.error.total_person_ownership_exceeded",
  });
export const Stripev2_error_immutable_identity_param = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("immutable_identity_param").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Identity param has been made immutable due to the state of the account.",
  identifier: "Stripev2.error.immutable_identity_param",
});
export const Stripev2_error_attach_payment_method_to_customer =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("attach_payment_method_to_customer").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Default payment method is added to the customer config before attaching it to the account using `/v1/payment_methods`.",
    identifier: "Stripev2.error.attach_payment_method_to_customer",
  });
export const Stripev2_error_cannot_add_connect_due_to_incompatible_default_payout_method =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "cannot_add_connect_due_to_incompatible_default_payout_method",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "A v2 account cannot have a Connect configuration applied because a default payout method is not supported in Connect.",
    identifier:
      "Stripev2.error.cannot_add_connect_due_to_incompatible_default_payout_method",
  });
export const Stripev2_error_cannot_use_validate_location_on_customer_create =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "cannot_use_validate_location_on_customer_create",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Cannot set `automatic_indirect_tax.validate_location` when initially creating a customer configuration.",
    identifier:
      "Stripev2.error.cannot_use_validate_location_on_customer_create",
  });
export const Stripev2_error_configuration_cannot_be_deactivated =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("configuration_cannot_be_deactivated").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Configuration cannot be deactivated.",
    identifier: "Stripev2.error.configuration_cannot_be_deactivated",
  });
export const Stripev2_error_configuration_cannot_be_deactivated_due_to_other_capability_requirement =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "configuration_cannot_be_deactivated_due_to_other_capability_requirement",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Configuration cannot be deactivated due to a dependency with another capability.",
    identifier:
      "Stripev2.error.configuration_cannot_be_deactivated_due_to_other_capability_requirement",
  });
export const Stripev2_error_configuration_cannot_be_deactivated_due_to_other_configuration =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "configuration_cannot_be_deactivated_due_to_other_configuration",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Cannot deactivate a configuration due to another configuration depending on it.",
    identifier:
      "Stripev2.error.configuration_cannot_be_deactivated_due_to_other_configuration",
  });
export const Stripev2_error_configuration_cannot_be_updated_while_deactivated =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "configuration_cannot_be_updated_while_deactivated",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Configuration cannot be updated while deactivated.",
    identifier:
      "Stripev2.error.configuration_cannot_be_updated_while_deactivated",
  });
export const Stripev2_error_customer_invalid_tax_location =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("customer_invalid_tax_location").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          incorrect_fields: Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                field: Schema.String.annotate({
                  description: "Incorrect field.",
                }),
                type: Schema.String.annotate({
                  description: "Reason the field is incorrect.",
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
              "A list of fields to fix on the v2 account to achieve a valid customer tax location.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          validate_location: Schema.String.annotate({
            description:
              "The value of the request's 'automatic_indirect_tax.validate_location' field - defaults to `auto`.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Invalid customer tax location.",
    identifier: "Stripev2.error.customer_invalid_tax_location",
  });
export const Stripev2_error_default_outbound_destination_invalid =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("default_outbound_destination_invalid").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Outbound Destination ID is invalid.",
    identifier: "Stripev2.error.default_outbound_destination_invalid",
  });
export const Stripev2_error_incompatible_default_payout_method =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("incompatible_default_payout_method").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "A `defaults.payout_methods` value is not supported as a default payout method in Connect.",
    identifier: "Stripev2.error.incompatible_default_payout_method",
  });
export const Stripev2_error_payout_method_incompatible_type =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_method_incompatible_type").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "A v1 External Account ID was passed as a `defaults.payout_methods` value, which is not supported in Accounts v2.",
    identifier: "Stripev2.error.payout_method_incompatible_type",
  });
export const Stripev2_error_cannot_delete_account_with_balance =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("cannot_delete_account_with_balance").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Account with Merchant or Recipient configuration with transfers feature cannot be closed because the account has a cash balance.",
    identifier: "Stripev2.error.cannot_delete_account_with_balance",
  });
export const Stripev2_error_cannot_delete_customer_with_available_cash_balance =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "cannot_delete_customer_with_available_cash_balance",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          doc_url: Schema.String.annotate({
            description: "A URL to more information about the error reported",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Account with Customer configuration cannot be closed because the customer has a cash balance.",
    identifier:
      "Stripev2.error.cannot_delete_customer_with_available_cash_balance",
  });
export const Stripev2_error_configs_must_match_to_close = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        applied_configurations: Schema.Array(Schema.String).annotate({
          description: "The applied configurations that should be specified.",
        }),
        code: Schema.Literal("configs_must_match_to_close").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Account cannot be closed without specifying the right configurations.",
  identifier: "Stripev2.error.configs_must_match_to_close",
});
export const Stripev2_error_pending_transactions_cannot_be_deleted =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "pending_transactions_cannot_be_deleted",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Account cannot be closed due to other pending resources.",
    identifier: "Stripev2.error.pending_transactions_cannot_be_deleted",
  });
export const Stripev2_error_stripe_loss_liable_cannot_be_deleted =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("stripe_loss_liable_cannot_be_deleted").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Account with Stripe-owned loss liability and dashboard cannot be deleted.",
    identifier: "Stripev2.error.stripe_loss_liable_cannot_be_deleted",
  });
export const Stripev2_error_expired_azure_partner_authorization =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("expired_azure_partner_authorization").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when a user tries to create an event destination with an expired Azure partner authorization.",
    identifier: "Stripev2.error.expired_azure_partner_authorization",
  });
export const Stripev2_error_invalid_azure_partner_authorization =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_azure_partner_authorization").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when a user tries to create an event destination without an Azure partner authorization.",
    identifier: "Stripev2.error.invalid_azure_partner_authorization",
  });
export const Stripev2_error_invalid_azure_partner_configuration =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_azure_partner_configuration").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when no valid partner configuration is found using the user provided Azure subscription ID and Azure resource group name.",
    identifier: "Stripev2.error.invalid_azure_partner_configuration",
  });
export const Stripev2_error_blocked_gb_bank_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("blocked_gb_bank_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("blocked_by_stripe").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where the bank account cannot be used due to suspicious activity.",
  identifier: "Stripev2.error.blocked_gb_bank_account",
});
export const Stripev2_error_gb_bank_account_incompatible_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "gb_bank_account_incompatible_currency",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          currency: Schema.String.annotate({
            description:
              "The currency that is incompatible with the bank account.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned in cases where the currency provided is incompatible with GB bank accounts.\nThis occurs when the credentials provided do not match with the currency provided.",
    identifier: "Stripev2.error.gb_bank_account_incompatible_currency",
  });
export const Stripev2_error_gb_bank_account_unsupported_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("gb_bank_account_unsupported_currency").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          currency: Schema.String.annotate({
            description:
              "The currency that is unsupported for the bank account.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned in cases where the currency provided is unsupported for the GB bank accounts.\nThis occurs when the currency provided is not supported for GB regardless of the credentials provided.",
    identifier: "Stripev2.error.gb_bank_account_unsupported_currency",
  });
export const Stripev2_error_invalid_gb_bank_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_gb_bank_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        invalid_param: Schema.Literals([
          "account_number",
          "currency",
          "iban",
          "sort_code",
        ]).annotate({
          description:
            "Closed Enum. The field that already exists on the resource.",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("invalid_vaulted_credential").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where the bank account provided is not valid (wrong format of account number\nor a routing number that does not correspond to a banking institution).",
  identifier: "Stripev2.error.invalid_gb_bank_account",
});
export const Stripev2_error_limit_gb_bank_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("limit_gb_bank_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("quota_exceeded").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the number of GBBankAccount objects on a given V2 Account has exceeded the limit of 10.\nGBBankAccount objects may be archived with /archive, at which point they will not count against the limit.\nIf you are not passing a V2 Account ID in the Stripe-Context header you may receive this error since\nyou are creating all your GBBankAccount objects in your own workspace.",
  identifier: "Stripev2.error.limit_gb_bank_account",
});
export const Stripev2_error_unsupported_gb_bank = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("unsupported_gb_bank").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("blocked_by_stripe").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where Stripe is unable to support this bank at this time.",
  identifier: "Stripev2.error.unsupported_gb_bank",
});
export const Stripev2_error_default_gb_bank_account_cannot_be_archived =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "default_gb_bank_account_cannot_be_archived",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the GB Bank Account object is set as default_for_currency and cannot be archived.",
    identifier: "Stripev2.error.default_gb_bank_account_cannot_be_archived",
  });
export const Stripev2_error_gb_bank_account_cannot_be_archived =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("gb_bank_account_cannot_be_archived").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("controlled_by_alternate_resource").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the GB Bank Account is controlled by an alternate resource and cannot be archived.",
    identifier: "Stripev2.error.gb_bank_account_cannot_be_archived",
  });
export const Stripev2_error_gb_bank_account_cannot_be_unarchived =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("gb_bank_account_cannot_be_unarchived").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("controlled_by_alternate_resource").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the GB Bank Account is controlled by an alternate resource and cannot be unarchived.",
    identifier: "Stripev2.error.gb_bank_account_cannot_be_unarchived",
  });
export const Stripev2_error_invalid_verification_status = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_verification_status").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when ListUsBankAccounts is called with an invalid verification_status param.",
  identifier: "Stripev2.error.invalid_verification_status",
});
export const Stripev2_error_blocked_us_bank_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("blocked_us_bank_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("blocked_by_stripe").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where the bank account cannot be used due to suspicious activity.",
  identifier: "Stripev2.error.blocked_us_bank_account",
});
export const Stripev2_error_invalid_us_bank_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_us_bank_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        invalid_param: Schema.Literals([
          "account_number",
          "currency",
          "fedwire_routing_number",
          "routing_number",
        ]),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("invalid_payment_method").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where the bank account provided is not valid (wrong format of account number\nor a routing number that does not correspond to a banking institution).",
  identifier: "Stripev2.error.invalid_us_bank_account",
});
export const Stripev2_error_limit_us_bank_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("limit_us_bank_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("quota_exceeded").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the number of USBankAccount objects on a given V2 Account has exceeded the limit of 10.\nUSBankAccount objects may be archived with /archive, at which point they will not count against the limit.\nIf you are not passing a V2 Account ID in the Stripe-Context header you may receive this error since\nyou are creating all your USBankAccount objects in your own workspace.",
  identifier: "Stripev2.error.limit_us_bank_account",
});
export const Stripev2_error_unsupported_us_bank = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("unsupported_us_bank").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("blocked_by_stripe").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where Stripe is unable to support this bank at this time.",
  identifier: "Stripev2.error.unsupported_us_bank",
});
export const Stripev2_error_us_bank_account_incompatible_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_incompatible_currency",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          currency: Schema.String.annotate({
            description:
              "The currency that is incompatible with the bank account.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned in cases where the currency provided is incompatible with US bank accounts.\nThis occurs when the credentials provided do not match with the currency provided.",
    identifier: "Stripev2.error.us_bank_account_incompatible_currency",
  });
export const Stripev2_error_us_bank_account_unsupported_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("us_bank_account_unsupported_currency").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          currency: Schema.String.annotate({
            description:
              "The currency that is unsupported for the bank account.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned in cases where the currency provided is unsupported for US bank accounts.\nThis occurs when the currency provided is not supported for US regardless of the credentials provided.",
    identifier: "Stripev2.error.us_bank_account_unsupported_currency",
  });
export const Stripev2_error_archived_us_bank_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("archived_us_bank_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where the bank account cannot be updated due to being archived.",
  identifier: "Stripev2.error.archived_us_bank_account",
});
export const Stripev2_error_us_bank_account_field_already_exists =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("us_bank_account_field_already_exists").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          invalid_field: Schema.Literals([
            "fedwire_routing_number",
            "routing_number",
          ]).annotate({
            description:
              "Closed Enum. The field that already exists on the resource.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned in cases where the bank account cannot be updated due to requesting\nto update a field that already exists.",
    identifier: "Stripev2.error.us_bank_account_field_already_exists",
  });
export const Stripev2_error_default_us_bank_account_cannot_be_archived =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "default_us_bank_account_cannot_be_archived",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the US Bank Account object is set as default_for_currency and cannot be archived.",
    identifier: "Stripev2.error.default_us_bank_account_cannot_be_archived",
  });
export const Stripev2_error_us_bank_account_cannot_be_archived =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("us_bank_account_cannot_be_archived").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("controlled_by_alternate_resource").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the US Bank Account in question is controlled by an alternate resource, and cannot be archived.",
    identifier: "Stripev2.error.us_bank_account_cannot_be_archived",
  });
export const Stripev2_error_us_bank_account_confirm_microdeposits_failure =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_confirm_microdeposits_failure",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("verification_attempt_failed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
          verification_status: Schema.Literals([
            "awaiting_verification",
            "unverified",
            "verification_failed",
            "verified",
          ]).annotate({
            description:
              "Closed Enum. The verification status of the bank account associated with this error.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the wrong values were provided to confirm microdeposits.",
    identifier: "Stripev2.error.us_bank_account_confirm_microdeposits_failure",
  });
export const Stripev2_error_us_bank_account_microdeposits_cannot_be_confirmed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_microdeposits_cannot_be_confirmed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("controlled_by_alternate_resource").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when microdeposits cannot be confirmed for the US bank account in its current state.",
    identifier:
      "Stripev2.error.us_bank_account_microdeposits_cannot_be_confirmed",
  });
export const Stripev2_error_us_bank_account_microdeposits_not_sent_before_confirming =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_microdeposits_not_sent_before_confirming",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("verification_not_initiated").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
          verification_status: Schema.Literals([
            "awaiting_verification",
            "unverified",
            "verification_failed",
            "verified",
          ]).annotate({
            description:
              "Closed Enum. The verification status of the bank account associated with this error.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when an attempt is made to confirm microdeposits before the microdeposits have been sent.",
    identifier:
      "Stripev2.error.us_bank_account_microdeposits_not_sent_before_confirming",
  });
export const Stripev2_error_us_bank_account_microdeposits_timed_out =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_microdeposits_timed_out",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("verification_expired").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
          verification_status: Schema.Literals([
            "awaiting_verification",
            "unverified",
            "verification_failed",
            "verified",
          ]).annotate({
            description:
              "Closed Enum. The verification status of the bank account associated with this error.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when an attempt to confirm microdeposits has failed because too much time has elapsed since the\nmicrodeposits were sent.",
    identifier: "Stripev2.error.us_bank_account_microdeposits_timed_out",
  });
export const Stripev2_error_us_bank_account_verification_failed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("us_bank_account_verification_failed").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
          verification_status: Schema.Literals([
            "awaiting_verification",
            "unverified",
            "verification_failed",
            "verified",
          ]).annotate({
            description:
              "Closed Enum. The verification status of the bank account associated with this error.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when verification of a US bank account has failed, reaching a terminal failure state.",
    identifier: "Stripev2.error.us_bank_account_verification_failed",
  });
export const Stripev2_error_us_bank_account_microdeposits_cannot_be_sent =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_microdeposits_cannot_be_sent",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("controlled_by_alternate_resource").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when microdeposits cannot be sent to the US bank account in its current state.",
    identifier: "Stripev2.error.us_bank_account_microdeposits_cannot_be_sent",
  });
export const Stripev2_error_us_bank_account_microdeposits_failed_to_send =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_microdeposits_failed_to_send",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
          verification_status: Schema.Literals([
            "awaiting_verification",
            "unverified",
            "verification_failed",
            "verified",
          ]).annotate({
            description:
              "Closed Enum. The verification status of the bank account associated with this error.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when an attempt is made to confirm microdeposits before the microdeposits have been sent.",
    identifier: "Stripev2.error.us_bank_account_microdeposits_failed_to_send",
  });
export const Stripev2_error_us_bank_account_microdeposits_requires_routing_number =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "us_bank_account_microdeposits_requires_routing_number",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when microdeposits cannot be sent because the US bank account does not have a routing number.",
    identifier:
      "Stripev2.error.us_bank_account_microdeposits_requires_routing_number",
  });
export const Stripev2_error_us_bank_account_cannot_be_unarchived =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("us_bank_account_cannot_be_unarchived").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("controlled_by_alternate_resource").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the US Bank Account is controlled by an alternate resource and cannot be unarchived.",
    identifier: "Stripev2.error.us_bank_account_cannot_be_unarchived",
  });
export const Stripev2_error_financial_address_invalid_page_token =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("financial_address_invalid_page_token").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "",
    identifier: "Stripev2.error.financial_address_invalid_page_token",
  });
export const Stripev2_error_financial_account_balance_does_not_support_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_account_balance_does_not_support_currency",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "",
    identifier:
      "Stripev2.error.financial_account_balance_does_not_support_currency",
  });
export const Stripev2_error_financial_account_capability_not_enabled =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_account_capability_not_enabled",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error thrown when attempting to add currencies that require capabilities that are not enabled.",
    identifier: "Stripev2.error.financial_account_capability_not_enabled",
  });
export const Stripev2_error_financial_account_capability_restricted =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_account_capability_restricted",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error thrown when attempting to add currencies that require capabilities that are restricted.",
    identifier: "Stripev2.error.financial_account_capability_restricted",
  });
export const Stripev2_error_financial_account_feature_restricted =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("financial_account_feature_restricted").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "",
    identifier: "Stripev2.error.financial_account_feature_restricted",
  });
export const Stripev2_error_financial_account_not_in_open_status =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("financial_account_not_in_open_status").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("financial_account_not_open").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "",
    identifier: "Stripev2.error.financial_account_not_in_open_status",
  });
export const Stripev2_error_financial_account_operation_unsupported_for_property =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_account_operation_unsupported_for_property",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Operation not supported on Financial Accounts with this type and property.",
    identifier:
      "Stripev2.error.financial_account_operation_unsupported_for_property",
  });
export const Stripev2_error_financial_account_operation_unsupported_for_type =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_account_operation_unsupported_for_type",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Operation not supported on Financial Accounts with this type.",
    identifier:
      "Stripev2.error.financial_account_operation_unsupported_for_type",
  });
export const Stripev2_error_financial_account_unsupported_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_account_unsupported_currency",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when a Financial Account cannot hold the requested settlement currency.",
    identifier: "Stripev2.error.financial_account_unsupported_currency",
  });
export const Stripev2_error_financial_account_unsupported_type =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("financial_account_unsupported_type").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when a Financial Account type does not support crypto wallet Financial Addresses.",
    identifier: "Stripev2.error.financial_account_unsupported_type",
  });
export const Stripev2_error_financial_address_account_unsupported_configuration =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_address_account_unsupported_configuration",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when an Account does not have a supported configuration.",
    identifier:
      "Stripev2.error.financial_address_account_unsupported_configuration",
  });
export const Stripev2_error_financial_address_type_and_settlement_currency_pair_unsupported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_address_type_and_settlement_currency_pair_unsupported",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "",
    identifier:
      "Stripev2.error.financial_address_type_and_settlement_currency_pair_unsupported",
  });
export const Stripev2_error_financial_addresses_creation_limit_exceeded =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "financial_addresses_creation_limit_exceeded",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "",
    identifier: "Stripev2.error.financial_addresses_creation_limit_exceeded",
  });
export const Stripev2_error_storer_capability_missing = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("storer_capability_missing").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("feature_not_enabled").annotate({
          description: "The type of error returned",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "The required storer capabilities are missing.",
  identifier: "Stripev2.error.storer_capability_missing",
});
export const Stripev2_error_storer_capability_not_active =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("storer_capability_not_active").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("feature_not_enabled").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "The required storer capabilities are not active.",
    identifier: "Stripev2.error.storer_capability_not_active",
  });
export const Stripev2_error_unsupported_country_for_bank_account_financial_address =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "unsupported_country_for_bank_account_financial_address",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the country is not supported for a bank_account Financial Address with the requested currency.",
    identifier:
      "Stripev2.error.unsupported_country_for_bank_account_financial_address",
  });
export const Stripev2_error_unsupported_crypto_wallet_settlement_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "unsupported_crypto_wallet_settlement_currency",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when a crypto wallet cannot settle in the requested currency.",
    identifier: "Stripev2.error.unsupported_crypto_wallet_settlement_currency",
  });
export const Stripev2_error_unsupported_currency = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("unsupported_currency").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "The currency is not supported for Financial Accounts.",
  identifier: "Stripev2.error.unsupported_currency",
});
export const Stripev2_error_unsupported_operation_with_managed_financial_account =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "unsupported_operation_with_managed_financial_account",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Creation of an object is not allowed with a managed account.",
    identifier:
      "Stripev2.error.unsupported_operation_with_managed_financial_account",
  });
export const Stripev2_error_inbound_transfer_from_closed_financial_account_unsupported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "inbound_transfer_from_closed_financial_account_unsupported",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned if an InboundTransfer is made to a closed FinancialAccount.",
    identifier:
      "Stripev2.error.inbound_transfer_from_closed_financial_account_unsupported",
  });
export const Stripev2_error_inbound_transfer_from_payment_method_mandate_inactive =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "inbound_transfer_from_payment_method_mandate_inactive",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the payment method's scheme requires an active mandate (e.g. UK Bacs) but no active\nInboundTransferMandate authorizes Stripe to debit it.",
    identifier:
      "Stripev2.error.inbound_transfer_from_payment_method_mandate_inactive",
  });
export const Stripev2_error_inbound_transfer_from_payment_method_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "inbound_transfer_from_payment_method_not_found",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Returned when a PaymentMethod cannot be found.",
    identifier: "Stripev2.error.inbound_transfer_from_payment_method_not_found",
  });
export const Stripev2_error_inbound_transfer_from_payment_method_type_unsupported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "inbound_transfer_from_payment_method_type_unsupported",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when a valid, but unsupported PaymentMethod for InboundTransfers is provided.",
    identifier:
      "Stripev2.error.inbound_transfer_from_payment_method_type_unsupported",
  });
export const Stripev2_error_inbound_transfer_from_payment_method_unusable =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "inbound_transfer_from_payment_method_unusable",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned if the PM used for the inbound transfer is based on a tokenized account number that is no longer transactable.",
    identifier: "Stripev2.error.inbound_transfer_from_payment_method_unusable",
  });
export const Stripev2_error_inbound_transfer_from_payment_method_unverified =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "inbound_transfer_from_payment_method_unverified",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when a PaymentMethod that has not been verified, is provided.",
    identifier:
      "Stripev2.error.inbound_transfer_from_payment_method_unverified",
  });
export const Stripev2_error_inbound_transfer_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("inbound_transfer_not_allowed").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("blocked_by_stripe").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned if an InboundTransfer is not allowed for risk, legal, regulatory or other unforeseen reasons.",
    identifier: "Stripev2.error.inbound_transfer_not_allowed",
  });
export const Stripev2_error_inbound_transfer_to_financial_account_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "inbound_transfer_to_financial_account_not_found",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Returned when a FinancialAccount cannot be found.",
    identifier:
      "Stripev2.error.inbound_transfer_to_financial_account_not_found",
  });
export const Stripev2_error_invalid_filters = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_filters").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        invalid_filters: Schema.Array(Schema.String).annotate({
          description: "The names of the filter parameters that were invalid.",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when filter parameters in the request are invalid.",
  identifier: "Stripev2.error.invalid_filters",
});
export const Stripev2_error_invalid_page_token = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_page_token").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when the page token provided in the OutboundPayments/OutboundTransfers list request is invalid.",
  identifier: "Stripev2.error.invalid_page_token",
});
export const Stripev2_error_account_not_configured_as_recipient =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("account_not_configured_as_recipient").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the recipient account in the OutboundPayment request is not configured as a recipient.",
    identifier: "Stripev2.error.account_not_configured_as_recipient",
  });
export const Stripev2_error_amount_too_large_for_payout_method =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("amount_too_large_for_payout_method").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the specified amount exceeds the payout method's amount limits.",
    identifier: "Stripev2.error.amount_too_large_for_payout_method",
  });
export const Stripev2_error_amount_too_large_for_preferred_networks =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "amount_too_large_for_preferred_networks",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the amount is too large for the requested preferred_networks.",
    identifier: "Stripev2.error.amount_too_large_for_preferred_networks",
  });
export const Stripev2_error_amount_too_large_for_selected_delivery_option =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "amount_too_large_for_selected_delivery_option",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when user selected a delivery option but the specified amount exceeds the method limits.",
    identifier: "Stripev2.error.amount_too_large_for_selected_delivery_option",
  });
export const Stripev2_error_approval_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("approval_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        rule_instruction: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Deprecated: use approval_request_id instead. Still populated for backward compatibility; will be removed in a future API version.",
          }),
        ),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "This error is thrown when an operation requires approval.",
  identifier: "Stripev2.error.approval_required",
});
export const Stripev2_error_approvals_cannot_be_only_approver_of_own_request =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "approvals_cannot_be_only_approver_of_own_request",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "This error is thrown when a user is the only approver for their own request.",
    identifier:
      "Stripev2.error.approvals_cannot_be_only_approver_of_own_request",
  });
export const Stripev2_error_approvals_conflicting_approval_request_exists =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "approvals_conflicting_approval_request_exists",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "This error is thrown when a conflicting approval request already exists.",
    identifier: "Stripev2.error.approvals_conflicting_approval_request_exists",
  });
export const Stripev2_error_approvals_request_blocked = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("approvals_request_blocked").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "This error is thrown when an approval rule blocks a request.",
  identifier: "Stripev2.error.approvals_request_blocked",
});
export const Stripev2_error_blocked_payout_method = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("blocked_payout_method").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("blocked_by_stripe").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Returned when a payout method is blocked by Stripe.",
  identifier: "Stripev2.error.blocked_payout_method",
});
export const Stripev2_error_business_network_insufficient_permissions =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "business_network_insufficient_permissions",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The authenticated party does not have sufficient permissions.",
    identifier: "Stripev2.error.business_network_insufficient_permissions",
  });
export const Stripev2_error_business_network_profile_hidden =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("business_network_profile_hidden").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "The authenticated party's Stripe profile is hidden.",
    identifier: "Stripev2.error.business_network_profile_hidden",
  });
export const Stripev2_error_business_network_profile_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("business_network_profile_not_found").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The authenticated party does not have a Stripe network profile.",
    identifier: "Stripev2.error.business_network_profile_not_found",
  });
export const Stripev2_error_card_payout_method_not_supported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("card_payout_method_not_supported").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the provided Card payout method is not eligible for outbound payment or outbound transfer.",
    identifier: "Stripev2.error.card_payout_method_not_supported",
  });
export const Stripev2_error_cop_not_accepted = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("cop_not_accepted").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Error returned when the Confirmation of Payee is not accepted.",
  identifier: "Stripev2.error.cop_not_accepted",
});
export const Stripev2_error_currency_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("currency_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when an OutboundPayment is created without a destination currency specified,\nno payout method is specified, and the recipient has more than one currency default pair set.",
  identifier: "Stripev2.error.currency_required",
});
export const Stripev2_error_default_payout_method_config_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "default_payout_method_config_not_found",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when a payout method is not provided in the OutboundPayment request and the recipient account does not have a default payout method.",
    identifier: "Stripev2.error.default_payout_method_config_not_found",
  });
export const Stripev2_error_delivery_option_not_available =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("delivery_option_not_available").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when real time rails are undergoing downtime.",
    identifier: "Stripev2.error.delivery_option_not_available",
  });
export const Stripev2_error_delivery_option_not_supported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("delivery_option_not_supported").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the selected delivery option is not supported for the payout method.",
    identifier: "Stripev2.error.delivery_option_not_supported",
  });
export const Stripev2_error_financial_address_creation_required =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("financial_address_creation_required").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when there is no active financial address required for GB and EU\nOBPs or OBTs.",
    identifier: "Stripev2.error.financial_address_creation_required",
  });
export const Stripev2_error_from_balance_type_not_found = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("from_balance_type_not_found").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Deprecated. Error returned when balance type of provided financial account in the OutboundPayment/OutboundTransfer request cannot be identified.",
  identifier: "Stripev2.error.from_balance_type_not_found",
});
export const Stripev2_error_from_balance_unsupported_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("from_balance_unsupported_currency").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the balance type in the OutboundPayment/OutboundTransfer request does not support the provided currency.",
    identifier: "Stripev2.error.from_balance_unsupported_currency",
  });
export const Stripev2_error_from_financial_account_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("from_financial_account_not_found").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when financial account in the OutboundPayment/OutboundTransfer request cannot be identified.",
    identifier: "Stripev2.error.from_financial_account_not_found",
  });
export const Stripev2_error_fx_quote_expired = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("fx_quote_expired").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Error returned when rate locking in the used OBPQ is expired.",
  identifier: "Stripev2.error.fx_quote_expired",
});
export const Stripev2_error_idempotency_conflict = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("idempotency_conflict").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "An idempotent retry results in resource conflicts.",
  identifier: "Stripev2.error.idempotency_conflict",
});
export const Stripev2_error_incompatible_delivery_options =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("incompatible_delivery_options").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the delivery option type and speed chosen is incompatible.",
    identifier: "Stripev2.error.incompatible_delivery_options",
  });
export const Stripev2_error_insufficient_funds = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("insufficient_funds").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("insufficient_funds").annotate({
          description: "The type of error returned",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when the balance of provided financial account and balance type in the OutboundPayment/OutboundTransfer request does not have enough funds.",
  identifier: "Stripev2.error.insufficient_funds",
});
export const Stripev2_error_invalid_outbound_flow = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_outbound_flow").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Error returned when the outbound flow is invalid.",
  identifier: "Stripev2.error.invalid_outbound_flow",
});
export const Stripev2_error_invalid_payout_method_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_payout_method_country").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the payout method country does not match the recipient account country.",
    identifier: "Stripev2.error.invalid_payout_method_country",
  });
export const Stripev2_error_invalid_payout_method_options =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_payout_method_options").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when payout method options do not match the supplied payout method type.",
    identifier: "Stripev2.error.invalid_payout_method_options",
  });
export const Stripev2_error_large_rate_drift = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("large_rate_drift").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Error returned when the FX rate drift beyond threshold.",
  identifier: "Stripev2.error.large_rate_drift",
});
export const Stripev2_error_network_not_supported_for_payout_method =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "network_not_supported_for_payout_method",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the requested networks are not supported for the provided payout method.",
    identifier: "Stripev2.error.network_not_supported_for_payout_method",
  });
export const Stripev2_error_no_suitable_delivery_options_for_large_amount =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "no_suitable_delivery_options_for_large_amount",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when user does not specify the delivery option or provides automatic, and the amount exceeds all the possible delivery options for this payout method.",
    identifier: "Stripev2.error.no_suitable_delivery_options_for_large_amount",
  });
export const Stripev2_error_outbound_flow_from_closed_financial_account_not_supported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_flow_from_closed_financial_account_not_supported",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("capability_not_enabled").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The user attempts to create an outbound flow from a closed Financial Account.",
    identifier:
      "Stripev2.error.outbound_flow_from_closed_financial_account_not_supported",
  });
export const Stripev2_error_outbound_flow_from_closed_financial_account_unsupported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_flow_from_closed_financial_account_unsupported",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("capability_not_enabled").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The user attempts to create an outbound flow from a closed Financial Account.",
    identifier:
      "Stripev2.error.outbound_flow_from_closed_financial_account_unsupported",
  });
export const Stripev2_error_outbound_flow_unsupported_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_flow_unsupported_country").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the payout method country is not supported for the outbound payment.",
    identifier: "Stripev2.error.outbound_flow_unsupported_country",
  });
export const Stripev2_error_outbound_flow_unsupported_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_flow_unsupported_currency").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the payout method supported currencies are not supported for this outbound flow.",
    identifier: "Stripev2.error.outbound_flow_unsupported_currency",
  });
export const Stripev2_error_outbound_payment_cannot_be_processed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_payment_cannot_be_processed").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the OutboundPayment cannot be processed due to a Stripe review rejection.",
    identifier: "Stripev2.error.outbound_payment_cannot_be_processed",
  });
export const Stripev2_error_outbound_payment_check_recipient_name_too_long =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_check_recipient_name_too_long",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the check recipient name is too long.",
    identifier: "Stripev2.error.outbound_payment_check_recipient_name_too_long",
  });
export const Stripev2_error_outbound_payment_ineligible_recipient_address =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_ineligible_recipient_address",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the recipient's address is invalid.",
    identifier: "Stripev2.error.outbound_payment_ineligible_recipient_address",
  });
export const Stripev2_error_outbound_payment_invalid_check_attachment =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_invalid_check_attachment",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the check attachment is invalid.",
    identifier: "Stripev2.error.outbound_payment_invalid_check_attachment",
  });
export const Stripev2_error_outbound_payment_invalid_check_signature =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_invalid_check_signature",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the check signature is invalid.",
    identifier: "Stripev2.error.outbound_payment_invalid_check_signature",
  });
export const Stripev2_error_outbound_payment_invalid_paper_check_attachment =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_invalid_paper_check_attachment",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the paper check attachment is invalid.",
    identifier:
      "Stripev2.error.outbound_payment_invalid_paper_check_attachment",
  });
export const Stripev2_error_outbound_payment_invalid_paper_check_signature =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_invalid_paper_check_signature",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the paper check signature is invalid.",
    identifier: "Stripev2.error.outbound_payment_invalid_paper_check_signature",
  });
export const Stripev2_error_outbound_payment_memo_restricted_term =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_memo_restricted_term",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the paper check outbound payment's memo contains restricted words.",
    identifier: "Stripev2.error.outbound_payment_memo_restricted_term",
  });
export const Stripev2_error_outbound_payment_not_allowed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_payment_not_allowed").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the user is not allowed to make this OutboundPayment request.",
    identifier: "Stripev2.error.outbound_payment_not_allowed",
  });
export const Stripev2_error_outbound_payment_paper_check_recipient_name_too_long =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_paper_check_recipient_name_too_long",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the paper check recipient name is too long.",
    identifier:
      "Stripev2.error.outbound_payment_paper_check_recipient_name_too_long",
  });
export const Stripev2_error_outbound_payment_quote_mismatch =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_payment_quote_mismatch").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when key money movement fields on outbound payment quote creation request don’t match outbound payment creation request, including from, to, amount and delivery_options.",
    identifier: "Stripev2.error.outbound_payment_quote_mismatch",
  });
export const Stripev2_error_outbound_payment_quote_missing =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_payment_quote_missing").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when outbound payment quote is missing for CBPs that requires fee and amount estimates prior to OBP initiation.",
    identifier: "Stripev2.error.outbound_payment_quote_missing",
  });
export const Stripev2_error_outbound_payment_recipient_verification_already_consumed =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_already_consumed",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the provided recipient verification has been used for another payment.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_already_consumed",
  });
export const Stripev2_error_outbound_payment_recipient_verification_awaiting_acknowledgement =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_awaiting_acknowledgement",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when provided recipient verification has not been acknowledged.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_awaiting_acknowledgement",
  });
export const Stripev2_error_outbound_payment_recipient_verification_expired =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_expired",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when provided recipient verification is expired.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_expired",
  });
export const Stripev2_error_outbound_payment_recipient_verification_missing =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_missing",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when recipient verification is missing for OBPs which requires recipient verification prior to OBP initiation.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_missing",
  });
export const Stripev2_error_outbound_payment_recipient_verification_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_not_found",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the provided recipient verification cannot be identified.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_not_found",
  });
export const Stripev2_error_outbound_payment_recipient_verification_payout_method_mismatch =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_payout_method_mismatch",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when payout method on recipient verification creation request don’t match outbound payment creation request.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_payout_method_mismatch",
  });
export const Stripev2_error_outbound_payment_recipient_verification_recipient_mismatch =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_recipient_mismatch",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when recipient on recipient verification creation request don’t match outbound payment creation request.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_recipient_mismatch",
  });
export const Stripev2_error_outbound_payment_recipient_verification_recipient_name_outdated =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_recipient_verification_recipient_name_outdated",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the recipient account name of the recipient verification no longer matches the verified name.",
    identifier:
      "Stripev2.error.outbound_payment_recipient_verification_recipient_name_outdated",
  });
export const Stripev2_error_outbound_payment_requires_payout_intent =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "outbound_payment_requires_payout_intent",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when an outbound payment requires upfront fee and FX disclosure, and a\nPayout Intent with an FX Quote is available to review them before confirming the payment.",
    identifier: "Stripev2.error.outbound_payment_requires_payout_intent",
  });
export const Stripev2_error_payout_method_archived = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("payout_method_archived").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when the payout method in the OutboundPayment/OutboundTransfer request is archived and invalid.",
  identifier: "Stripev2.error.payout_method_archived",
});
export const Stripev2_error_payout_method_disabled = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("payout_method_disabled").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when the payout method in the OutboundPayment/OutboundTransfer request is disabled\nand needs to be enabled via OutboundSetupIntent.",
  identifier: "Stripev2.error.payout_method_disabled",
});
export const Stripev2_error_payout_method_expired = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("payout_method_expired").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description: "Error returned when the provided payout method is expired.",
  identifier: "Stripev2.error.payout_method_expired",
});
export const Stripev2_error_payout_method_invalid = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("payout_method_invalid").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when the payout method in the OutboundPayment/OutboundTransfer request cannot be identified.",
  identifier: "Stripev2.error.payout_method_invalid",
});
export const Stripev2_error_payout_method_unsupported_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_method_unsupported_currency").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the payout method does not support the request's payout method currency.",
    identifier: "Stripev2.error.payout_method_unsupported_currency",
  });
export const Stripev2_error_payout_method_unusable = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("payout_method_unusable").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned if the payout method used for the outbound payment is based on a tokenized account number that is no longer transactable.",
  identifier: "Stripev2.error.payout_method_unusable",
});
export const Stripev2_error_pending_financial_account = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("pending_financial_account").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when the source financial account is in a pending state and not yet active.",
  identifier: "Stripev2.error.pending_financial_account",
});
export const Stripev2_error_preferred_networks_not_available =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("preferred_networks_not_available").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the requested network is temporarily unavailable.",
    identifier: "Stripev2.error.preferred_networks_not_available",
  });
export const Stripev2_error_recipient_amount_limit_exceeded =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("recipient_amount_limit_exceeded").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("quota_exceeded").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the recipient's recent total amount in outbound payments has exceeded its limit.",
    identifier: "Stripev2.error.recipient_amount_limit_exceeded",
  });
export const Stripev2_error_recipient_capability_not_active =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("recipient_capability_not_active").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("capability_not_enabled").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when recipient does not have the active capabilities required to receive funds from this request.",
    identifier: "Stripev2.error.recipient_capability_not_active",
  });
export const Stripev2_error_recipient_count_limit_exceeded =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("recipient_count_limit_exceeded").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("quota_exceeded").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the recipient's recent outbound payment count has exceeded its limit.",
    identifier: "Stripev2.error.recipient_count_limit_exceeded",
  });
export const Stripev2_error_recipient_email_does_not_exist =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("recipient_email_does_not_exist").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("recipient_not_notifiable").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the user enables notifications in the OutboundPayment request, but an email is not set up on the recipient account.",
    identifier: "Stripev2.error.recipient_email_does_not_exist",
  });
export const Stripev2_error_recipient_feature_not_active =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("recipient_feature_not_active").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("feature_not_enabled").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when recipient does not have the active features required to receive funds from this OutboundPayment request.",
    identifier: "Stripev2.error.recipient_feature_not_active",
  });
export const Stripev2_error_recipient_feature_not_active_for_suitable_delivery_option =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "recipient_feature_not_active_for_suitable_delivery_option",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when user does not specify the delivery option or provides automatic, and recipient feature is not active for suitable delivery option.",
    identifier:
      "Stripev2.error.recipient_feature_not_active_for_suitable_delivery_option",
  });
export const Stripev2_error_submission_not_supported = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("submission_not_supported").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when an unsupported ACH submission value is provided.",
  identifier: "Stripev2.error.submission_not_supported",
});
export const Stripev2_error_to_recipient_not_found = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("to_recipient_not_found").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Error returned when the recipient account in the OutboundPayment request cannot be identified.",
  identifier: "Stripev2.error.to_recipient_not_found",
});
export const Stripev2_error_unsupported_parameter_delivery_options =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "unsupported_parameter_delivery_options",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when delivery_options and payout_method_options are both specified (mutually exclusive).",
    identifier: "Stripev2.error.unsupported_parameter_delivery_options",
  });
export const Stripev2_error_outbound_payment_already_canceled =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_payment_already_canceled").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("already_canceled").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when user tries to cancel an OutboundPayment that was already canceled.",
    identifier: "Stripev2.error.outbound_payment_already_canceled",
  });
export const Stripev2_error_outbound_payment_not_cancelable =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("outbound_payment_not_cancelable").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("not_cancelable").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when user tries to cancel an OutboundPayment that is not cancelable.",
    identifier: "Stripev2.error.outbound_payment_not_cancelable",
  });
export const Stripev2_error_active_outbound_setup_intent_exists_for_payout_method =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "active_outbound_setup_intent_exists_for_payout_method",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the outbound setup intent cannot be created for a given payout method because the payout method already has another active outbound setup intent.",
    identifier:
      "Stripev2.error.active_outbound_setup_intent_exists_for_payout_method",
  });
export const Stripev2_error_apple_pay_invalid_format = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("apple_pay_invalid_format").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the Apple Pay payment token is malformed or cannot be parsed.",
  identifier: "Stripev2.error.apple_pay_invalid_format",
});
export const Stripev2_error_apple_pay_no_signing_key = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("apple_pay_no_signing_key").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the Apple Pay payment token cannot be verified due to a missing signing key.",
  identifier: "Stripev2.error.apple_pay_no_signing_key",
});
export const Stripev2_error_apple_pay_payment_decryption =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("apple_pay_payment_decryption").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the Apple Pay payment token could not be decrypted.",
    identifier: "Stripev2.error.apple_pay_payment_decryption",
  });
export const Stripev2_error_apple_pay_pk_token_required = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("apple_pay_pk_token_required").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the Apple Pay payment token is absent from the request.",
  identifier: "Stripev2.error.apple_pay_pk_token_required",
});
export const Stripev2_error_archived_payout_method = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("archived_payout_method").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the credential ID provided corresponds to an archived Payout Method.",
  identifier: "Stripev2.error.archived_payout_method",
});
export const Stripev2_error_incompatible_payout_method_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("incompatible_payout_method_currency").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          currency: Schema.String.annotate({
            description:
              "The currency that is incompatible with the payout method.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned in cases where the currency provided is incompatible with the payout method.\nThis occurs when the credentials provided do not match with the currency provided.",
    identifier: "Stripev2.error.incompatible_payout_method_currency",
  });
export const Stripev2_error_invalid_fields = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_fields").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        flag_set_id: Schema.String,
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ description: "", identifier: "Stripev2.error.invalid_fields" });
export const Stripev2_error_invalid_payout_method = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("invalid_payout_method").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("invalid_payout_method").annotate({
          description: "The type of error returned",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where the ID provided doesn't correspond to a valid payout method.",
  identifier: "Stripev2.error.invalid_payout_method",
});
export const Stripev2_error_invalid_payout_method_data = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        bank_account_data_error: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              invalid_param: Schema.Literals([
                "account_number",
                "branch_number",
                "currency",
                "routing_number",
                "swift_code",
              ]).annotate({
                description: "Open Enum. The invalid parameter field.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({
            description: "Details for invalid bank account data error.",
          }),
        ),
        card_data_error: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              invalid_param: Schema.Literals([
                "currency",
                "exp_date",
                "exp_month",
                "exp_year",
                "number",
              ]).annotate({
                description: "Open Enum. The invalid parameter field.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Details for invalid card data error." }),
        ),
        code: Schema.Literal("invalid_payout_method_data").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        crypto_wallet_data_error: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              invalid_param: Schema.Literals([
                "address",
                "memo",
                "network",
              ]).annotate({
                description: "Open Enum. The invalid parameter field.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({
            description: "Details for invalid crypto wallet data error.",
          }),
        ),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        pix_data_error: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              invalid_param: Schema.Literals(["br_code", "pix_key"]).annotate({
                description: "Open Enum. The invalid parameter field.",
              }),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ description: "Details for invalid PIX data error." }),
        ),
        type: Schema.Literal("invalid_payout_method").annotate({
          description: "The type of error returned",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where the PayoutMethod object provided is not valid (wrong format of\ncredentials that does not correspond to a valid payout method).",
  identifier: "Stripev2.error.invalid_payout_method_data",
});
export const Stripev2_error_invalid_payout_method_update =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_payout_method_update").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          fields: Schema.Array(Schema.String).annotate({
            description: "The fields that were not updatable.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when attempting to update non-updatable credential data.",
    identifier: "Stripev2.error.invalid_payout_method_update",
  });
export const Stripev2_error_invalid_status_payout_method =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("invalid_status_payout_method").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the credential ID provided corresponds to a resource that does not allow usage as a payout method.",
    identifier: "Stripev2.error.invalid_status_payout_method",
  });
export const Stripev2_error_limit_payout_method = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("limit_payout_method").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        limit: Schema.Number.annotate({
          description:
            "The maximum number of credentials per workspace for the given type.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("quota_exceeded").annotate({
          description: "The type of error returned",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the number of payout methods has exceeded the limit in a given workspace.\nPayoutMethod objects may be archived with the /archive API, at which point they will not count against the limit.\nIf you are not passing a V2 Account ID in the Stripe-Context header you may receive this error since\nyou are creating all your payout method objects in your own workspace.",
  identifier: "Stripev2.error.limit_payout_method",
});
export const Stripev2_error_parameter_pair_exclusive = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("parameter_pair_exclusive").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        user_message: Schema.String.annotate({
          description: "A user-friendly message that can be shown to end-users",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Two mutually exclusive parameters were provided in the request.",
  identifier: "Stripev2.error.parameter_pair_exclusive",
});
export const Stripev2_error_payment_method_unsupported_for_payouts =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "payment_method_unsupported_for_payouts",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when the payment method referenced in from_resource is not supported for payouts.",
    identifier: "Stripev2.error.payment_method_unsupported_for_payouts",
  });
export const Stripev2_error_payout_method_cannot_be_updated =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_method_cannot_be_updated").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("controlled_by_alternate_resource").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when attempting to update a Payout Method controlled by another resource.",
    identifier: "Stripev2.error.payout_method_cannot_be_updated",
  });
export const Stripev2_error_resource_not_found = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("resource_not_found").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        id: Schema.String.annotate({
          description:
            "The identifier of the resource that could not be found.",
        }),
        location: Schema.String.annotate({
          description: "The field that referenced the missing resource.",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned when the request references a resource that cannot be found.",
  identifier: "Stripev2.error.resource_not_found",
});
export const Stripev2_error_unsupported_payout_method = Schema.StructWithRest(
  Schema.Struct({
    error: Schema.StructWithRest(
      Schema.Struct({
        code: Schema.Literal("unsupported_payout_method").annotate({
          description:
            "Short code to identify the error, should not be handled programmatically",
        }),
        message: Schema.String.annotate({
          description:
            "A human-readable message providing more details about the error",
        }),
        type: Schema.Literal("blocked_by_stripe").annotate({
          description: "The type of error returned",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "Information about the error that occurred" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  description:
    "Returned in cases where Stripe is unable to support this payout method at this time.",
  identifier: "Stripev2.error.unsupported_payout_method",
});
export const Stripev2_error_unsupported_payout_method_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("unsupported_payout_method_currency").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          currency: Schema.String.annotate({
            description:
              "The currency that is unsupported for the payout method.",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          reason: Schema.String,
          type: Schema.Literal("cannot_proceed").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned in cases where the currency provided is unsupported for the payout method.\nThis occurs when the currency provided is not supported regardless of the credentials provided.",
    identifier: "Stripev2.error.unsupported_payout_method_currency",
  });
export const Stripev2_error_cannot_update_terminal_outbound_setup_intent =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "cannot_update_terminal_outbound_setup_intent",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when attempting to update an outbound setup intent in a terminal state (canceled or succeeded).",
    identifier: "Stripev2.error.cannot_update_terminal_outbound_setup_intent",
  });
export const Stripev2_error_cannot_cancel_terminal_outbound_setup_intent =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "cannot_cancel_terminal_outbound_setup_intent",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Returned when attempting to cancel an outbound setup intent in a terminal state (canceled or succeeded).",
    identifier: "Stripev2.error.cannot_cancel_terminal_outbound_setup_intent",
  });
export const Stripev2_error_manual_confirmation_not_supported_with_schedule_options =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "manual_confirmation_not_supported_with_schedule_options",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when confirmation_method=manual is used with schedule_options.",
    identifier:
      "Stripev2.error.manual_confirmation_not_supported_with_schedule_options",
  });
export const Stripev2_error_payout_intent_scheduled_date_exceed_maximum =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "payout_intent_scheduled_date_exceed_maximum",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the scheduled date exceeds the maximum allowed range.",
    identifier: "Stripev2.error.payout_intent_scheduled_date_exceed_maximum",
  });
export const Stripev2_error_payout_intent_scheduled_date_too_soon =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "payout_intent_scheduled_date_too_soon",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the scheduled date is not in the future.",
    identifier: "Stripev2.error.payout_intent_scheduled_date_too_soon",
  });
export const Stripev2_error_schedule_options_incompatible_with_confirmation_required =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "schedule_options_incompatible_with_confirmation_required",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when schedule_options is used with a payout intent that requires confirmation.",
    identifier:
      "Stripev2.error.schedule_options_incompatible_with_confirmation_required",
  });
export const Stripev2_error_payout_intent_cannot_be_modified =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_intent_cannot_be_modified").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the payout intent cannot be modified.",
    identifier: "Stripev2.error.payout_intent_cannot_be_modified",
  });
export const Stripev2_error_payout_intent_not_cancelable =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_intent_not_cancelable").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("not_cancelable").annotate({
            description: "The type of error returned",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "Error returned when the payout intent cannot be canceled.",
    identifier: "Stripev2.error.payout_intent_not_cancelable",
  });
export const Stripev2_error_payout_intent_fx_quote_expired =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_intent_fx_quote_expired").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("fx_quote_needs_refresh").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the FX quote rate lock for a PayoutIntent has expired.",
    identifier: "Stripev2.error.payout_intent_fx_quote_expired",
  });
export const Stripev2_error_payout_intent_large_rate_drift =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_intent_large_rate_drift").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
          type: Schema.Literal("fx_quote_needs_refresh").annotate({
            description: "The type of error returned",
          }),
          user_message: Schema.String.annotate({
            description:
              "A user-friendly message that can be shown to end-users",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the FX quote rate lock for a PayoutIntent has drifted too far.",
    identifier: "Stripev2.error.payout_intent_large_rate_drift",
  });
export const Stripev2_error_payout_intent_not_confirmable =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("payout_intent_not_confirmable").annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when a payout intent is not confirmable. A payout intent is only confirmable\nwhen it has status=requires_action.",
    identifier: "Stripev2.error.payout_intent_not_confirmable",
  });
export const Stripev2_error_fx_quote_invalid_for_payout_intent_without_fx =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "fx_quote_invalid_for_payout_intent_without_fx",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned attempting to create FX quote for a PayoutIntent without FX.",
    identifier: "Stripev2.error.fx_quote_invalid_for_payout_intent_without_fx",
  });
export const Stripev2_error_recipient_verification_account_not_configured_as_recipient =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "recipient_verification_account_not_configured_as_recipient",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the recipient account in the RECVER request is not configured as a recipient.",
    identifier:
      "Stripev2.error.recipient_verification_account_not_configured_as_recipient",
  });
export const Stripev2_error_recipient_verification_invalid_payout_method_country =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "recipient_verification_invalid_payout_method_country",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the payout method country does not match the recipient account country.",
    identifier:
      "Stripev2.error.recipient_verification_invalid_payout_method_country",
  });
export const Stripev2_error_recipient_verification_invalid_payout_method_currency =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "recipient_verification_invalid_payout_method_currency",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the country and currency of the payout method means it does not require recipient verification.",
    identifier:
      "Stripev2.error.recipient_verification_invalid_payout_method_currency",
  });
export const Stripev2_error_recipient_verification_not_supported =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal("recipient_verification_not_supported").annotate(
            {
              description:
                "Short code to identify the error, should not be handled programmatically",
            },
          ),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the user initiating the RECVER request is not from EU/SEPA areas.",
    identifier: "Stripev2.error.recipient_verification_not_supported",
  });
export const Stripev2_error_recipient_verification_payout_method_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "recipient_verification_payout_method_not_found",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the payout method in the request cannot be identified.",
    identifier: "Stripev2.error.recipient_verification_payout_method_not_found",
  });
export const Stripev2_error_recipient_verification_recipient_not_found =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "recipient_verification_recipient_not_found",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the recipient account in the request or the required account information of the recipient cannot be identified.",
    identifier: "Stripev2.error.recipient_verification_recipient_not_found",
  });
export const Stripev2_error_recipient_verification_not_acknowledgable =
  Schema.StructWithRest(
    Schema.Struct({
      error: Schema.StructWithRest(
        Schema.Struct({
          code: Schema.Literal(
            "recipient_verification_not_acknowledgable",
          ).annotate({
            description:
              "Short code to identify the error, should not be handled programmatically",
          }),
          message: Schema.String.annotate({
            description:
              "A human-readable message providing more details about the error",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Information about the error that occurred" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "Error returned when the user tries to acknowledge a RECVER that is not in awaiting_acknowledgement status.",
    identifier: "Stripev2.error.recipient_verification_not_acknowledgable",
  });
