// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";

export type Stripev2_core_account_token = {
  readonly created: string;
  readonly expires_at: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "v2.core.account_token";
  readonly used: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_core_account = {
  readonly applied_configurations: ReadonlyArray<
    "customer" | "merchant" | "recipient"
  >;
  readonly closed?: boolean;
  readonly configuration?: {
    readonly customer?: {
      readonly applied: boolean;
      readonly automatic_indirect_tax?: {
        readonly exempt?: "exempt" | "none" | "reverse";
        readonly ip_address?: string;
        readonly location?: {
          readonly country?: string;
          readonly state?: string;
        } & { readonly [x: string]: Schema.Json };
        readonly location_source?:
          | "identity_address"
          | "ip_address"
          | "payment_method"
          | "shipping_address";
      } & { readonly [x: string]: Schema.Json };
      readonly billing?: {
        readonly default_payment_method?: string;
        readonly invoice?: {
          readonly custom_fields: ReadonlyArray<
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
        readonly automatic_indirect_tax?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
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
      readonly applied: boolean;
      readonly bacs_debit_payments?: {
        readonly display_name?: string;
        readonly service_user_number?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly branding?: {
        readonly icon?: string;
        readonly logo?: string;
        readonly primary_color?: string;
        readonly secondary_color?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly capabilities?: {
        readonly ach_debit_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly acss_debit_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly affirm_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly afterpay_clearpay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly alma_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly amazon_pay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly au_becs_debit_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly bacs_debit_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly bancontact_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly blik_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly blik_recurring_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly boleto_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly card_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly cartes_bancaires_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly cashapp_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly eps_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly fpx_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly gb_bank_transfer_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly grabpay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly ideal_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly jcb_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly jp_bank_transfer_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly kakao_pay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly klarna_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly konbini_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly kr_card_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly link_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly mobilepay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly multibanco_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly mx_bank_transfer_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly naver_pay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly oxxo_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly p24_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly pay_by_bank_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly payco_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly paynow_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly promptpay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly revolut_pay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly samsung_pay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly satispay_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly sepa_bank_transfer_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly sepa_debit_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly sequra_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly stripe_balance?: {
          readonly payouts?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly sunbit_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly swish_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly twint_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly us_bank_transfer_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly zip_payments?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
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
      readonly applied: boolean;
      readonly capabilities?: {
        readonly bank_accounts?: {
          readonly ach?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly fedwire?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly fps?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly local?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly rtp?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly sepa?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly swift?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly cards?: {
          readonly status:
            | "active"
            | "pending"
            | "rejected"
            | "restricted"
            | "unsupported";
          readonly status_details: ReadonlyArray<
            {
              readonly code:
                | "determining_status"
                | "rejected_fraud"
                | "rejected_incomplete_verification"
                | "rejected_listed"
                | "rejected_other"
                | "rejected_platform_fraud"
                | "rejected_platform_other"
                | "rejected_platform_terms_of_service"
                | "rejected_terms_of_service"
                | "requirements_past_due"
                | "requirements_pending_verification"
                | "restricted_other"
                | "unsupported_business"
                | "unsupported_country"
                | "unsupported_entity_type";
              readonly resolution:
                | "contact_stripe"
                | "no_resolution"
                | "provide_info";
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly stripe_balance?: {
          readonly payouts?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly stripe_transfers?: {
            readonly status:
              | "active"
              | "pending"
              | "rejected"
              | "restricted"
              | "unsupported";
            readonly status_details: ReadonlyArray<
              {
                readonly code:
                  | "determining_status"
                  | "rejected_fraud"
                  | "rejected_incomplete_verification"
                  | "rejected_listed"
                  | "rejected_other"
                  | "rejected_platform_fraud"
                  | "rejected_platform_other"
                  | "rejected_platform_terms_of_service"
                  | "rejected_terms_of_service"
                  | "requirements_past_due"
                  | "requirements_pending_verification"
                  | "restricted_other"
                  | "unsupported_business"
                  | "unsupported_country"
                  | "unsupported_entity_type";
                readonly resolution:
                  | "contact_stripe"
                  | "no_resolution"
                  | "provide_info";
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly contact_email?: string;
  readonly contact_phone?: string;
  readonly created: string;
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
    readonly responsibilities: {
      readonly fees_collector?:
        | "application"
        | "application_custom"
        | "application_express"
        | "stripe";
      readonly losses_collector?: "application" | "stripe";
      readonly requirements_collector: "application" | "stripe";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly display_name?: string;
  readonly future_requirements?: {
    readonly alternatives?: ReadonlyArray<
      {
        readonly options: ReadonlyArray<
          {
            readonly entries: ReadonlyArray<
              {
                readonly awaiting_action_from: "stripe" | "user";
                readonly description: string;
                readonly errors: ReadonlyArray<
                  {
                    readonly code:
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
                      | "invalid_url_web_presence_detected"
                      | "invalid_value_other"
                      | "unresolvable_ip_address"
                      | "unresolvable_postal_code"
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
                      | "verification_missing_directors"
                      | "verification_missing_executives"
                      | "verification_missing_owners"
                      | "verification_requires_additional_memorandum_of_associations"
                      | "verification_requires_additional_proof_of_registration"
                      | "verification_selfie_document_missing_photo"
                      | "verification_selfie_face_mismatch"
                      | "verification_selfie_manipulated"
                      | "verification_selfie_unverified_other"
                      | "verification_supportability"
                      | "verification_token_stale";
                    readonly description: string;
                  } & { readonly [x: string]: Schema.Json }
                >;
                readonly reference?: {
                  readonly inquiry?: string;
                  readonly resource?: string;
                  readonly type: "inquiry" | "payment_method" | "person";
                } & { readonly [x: string]: Schema.Json };
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json }
        >;
        readonly original_entries: ReadonlyArray<
          {
            readonly description: string;
            readonly reference?: {
              readonly inquiry?: string;
              readonly resource?: string;
              readonly type: "inquiry" | "payment_method" | "person";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json }
        >;
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly entries?: ReadonlyArray<
      {
        readonly awaiting_action_from: "stripe" | "user";
        readonly description: string;
        readonly errors: ReadonlyArray<
          {
            readonly code:
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
              | "invalid_url_web_presence_detected"
              | "invalid_value_other"
              | "unresolvable_ip_address"
              | "unresolvable_postal_code"
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
              | "verification_missing_directors"
              | "verification_missing_executives"
              | "verification_missing_owners"
              | "verification_requires_additional_memorandum_of_associations"
              | "verification_requires_additional_proof_of_registration"
              | "verification_selfie_document_missing_photo"
              | "verification_selfie_face_mismatch"
              | "verification_selfie_manipulated"
              | "verification_selfie_unverified_other"
              | "verification_supportability"
              | "verification_token_stale";
            readonly description: string;
          } & { readonly [x: string]: Schema.Json }
        >;
        readonly impact: {
          readonly restricts_capabilities?: ReadonlyArray<
            {
              readonly capability:
                | "ach_debit_payments"
                | "acss_debit_payments"
                | "affirm_payments"
                | "afterpay_clearpay_payments"
                | "alma_payments"
                | "amazon_pay_payments"
                | "automatic_indirect_tax"
                | "au_becs_debit_payments"
                | "bacs_debit_payments"
                | "bancontact_payments"
                | "bank_accounts.ach"
                | "bank_accounts.fedwire"
                | "bank_accounts.fps"
                | "bank_accounts.local"
                | "bank_accounts.rtp"
                | "bank_accounts.sepa"
                | "bank_accounts.swift"
                | "bank_accounts.wire"
                | "blik_payments"
                | "blik_recurring_payments"
                | "boleto_payments"
                | "cards"
                | "card_payments"
                | "cartes_bancaires_payments"
                | "cashapp_payments"
                | "eps_payments"
                | "fpx_payments"
                | "gb_bank_transfer_payments"
                | "grabpay_payments"
                | "ideal_payments"
                | "jcb_payments"
                | "jp_bank_transfer_payments"
                | "kakao_pay_payments"
                | "klarna_payments"
                | "konbini_payments"
                | "kr_card_payments"
                | "link_payments"
                | "mobilepay_payments"
                | "multibanco_payments"
                | "mx_bank_transfer_payments"
                | "naver_pay_payments"
                | "oxxo_payments"
                | "p24_payments"
                | "payco_payments"
                | "paynow_payments"
                | "pay_by_bank_payments"
                | "promptpay_payments"
                | "revolut_pay_payments"
                | "samsung_pay_payments"
                | "satispay_payments"
                | "sepa_bank_transfer_payments"
                | "sepa_debit_payments"
                | "stripe_balance.payouts"
                | "stripe_balance.stripe_transfers"
                | "swish_payments"
                | "twint_payments"
                | "us_bank_transfer_payments"
                | "zip_payments";
              readonly configuration: "customer" | "merchant" | "recipient";
              readonly deadline: {
                readonly status:
                  | "currently_due"
                  | "eventually_due"
                  | "past_due";
              } & { readonly [x: string]: Schema.Json };
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly minimum_deadline: {
          readonly status: "currently_due" | "eventually_due" | "past_due";
        } & { readonly [x: string]: Schema.Json };
        readonly reference?: {
          readonly inquiry?: string;
          readonly resource?: string;
          readonly type: "inquiry" | "payment_method" | "person";
        } & { readonly [x: string]: Schema.Json };
        readonly requested_reasons: ReadonlyArray<
          { readonly code: "routine_onboarding" | "routine_verification" } & {
            readonly [x: string]: Schema.Json;
          }
        >;
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly minimum_transition_date?: string;
    readonly summary?: {
      readonly minimum_deadline?: {
        readonly status: "currently_due" | "eventually_due" | "past_due";
        readonly time?: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly id: string;
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
      readonly account: string;
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
      readonly created: string;
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
      readonly id: string;
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
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly legal_gender?: "female" | "male";
      readonly metadata?: { readonly [x: string]: string };
      readonly nationalities?: ReadonlyArray<string>;
      readonly object: string;
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
      readonly updated: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string };
  readonly object: "v2.core.account";
  readonly requirements?: {
    readonly alternatives?: ReadonlyArray<
      {
        readonly options: ReadonlyArray<
          {
            readonly entries: ReadonlyArray<
              {
                readonly awaiting_action_from: "stripe" | "user";
                readonly description: string;
                readonly errors: ReadonlyArray<
                  {
                    readonly code:
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
                      | "invalid_url_web_presence_detected"
                      | "invalid_value_other"
                      | "unresolvable_ip_address"
                      | "unresolvable_postal_code"
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
                      | "verification_missing_directors"
                      | "verification_missing_executives"
                      | "verification_missing_owners"
                      | "verification_requires_additional_memorandum_of_associations"
                      | "verification_requires_additional_proof_of_registration"
                      | "verification_selfie_document_missing_photo"
                      | "verification_selfie_face_mismatch"
                      | "verification_selfie_manipulated"
                      | "verification_selfie_unverified_other"
                      | "verification_supportability"
                      | "verification_token_stale";
                    readonly description: string;
                  } & { readonly [x: string]: Schema.Json }
                >;
                readonly reference?: {
                  readonly inquiry?: string;
                  readonly resource?: string;
                  readonly type: "inquiry" | "payment_method" | "person";
                } & { readonly [x: string]: Schema.Json };
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json }
        >;
        readonly original_entries: ReadonlyArray<
          {
            readonly description: string;
            readonly reference?: {
              readonly inquiry?: string;
              readonly resource?: string;
              readonly type: "inquiry" | "payment_method" | "person";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json }
        >;
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly entries?: ReadonlyArray<
      {
        readonly awaiting_action_from: "stripe" | "user";
        readonly description: string;
        readonly errors: ReadonlyArray<
          {
            readonly code:
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
              | "invalid_url_web_presence_detected"
              | "invalid_value_other"
              | "unresolvable_ip_address"
              | "unresolvable_postal_code"
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
              | "verification_missing_directors"
              | "verification_missing_executives"
              | "verification_missing_owners"
              | "verification_requires_additional_memorandum_of_associations"
              | "verification_requires_additional_proof_of_registration"
              | "verification_selfie_document_missing_photo"
              | "verification_selfie_face_mismatch"
              | "verification_selfie_manipulated"
              | "verification_selfie_unverified_other"
              | "verification_supportability"
              | "verification_token_stale";
            readonly description: string;
          } & { readonly [x: string]: Schema.Json }
        >;
        readonly impact: {
          readonly restricts_capabilities?: ReadonlyArray<
            {
              readonly capability:
                | "ach_debit_payments"
                | "acss_debit_payments"
                | "affirm_payments"
                | "afterpay_clearpay_payments"
                | "alma_payments"
                | "amazon_pay_payments"
                | "automatic_indirect_tax"
                | "au_becs_debit_payments"
                | "bacs_debit_payments"
                | "bancontact_payments"
                | "bank_accounts.ach"
                | "bank_accounts.fedwire"
                | "bank_accounts.fps"
                | "bank_accounts.local"
                | "bank_accounts.rtp"
                | "bank_accounts.sepa"
                | "bank_accounts.swift"
                | "bank_accounts.wire"
                | "blik_payments"
                | "blik_recurring_payments"
                | "boleto_payments"
                | "cards"
                | "card_payments"
                | "cartes_bancaires_payments"
                | "cashapp_payments"
                | "eps_payments"
                | "fpx_payments"
                | "gb_bank_transfer_payments"
                | "grabpay_payments"
                | "ideal_payments"
                | "jcb_payments"
                | "jp_bank_transfer_payments"
                | "kakao_pay_payments"
                | "klarna_payments"
                | "konbini_payments"
                | "kr_card_payments"
                | "link_payments"
                | "mobilepay_payments"
                | "multibanco_payments"
                | "mx_bank_transfer_payments"
                | "naver_pay_payments"
                | "oxxo_payments"
                | "p24_payments"
                | "payco_payments"
                | "paynow_payments"
                | "pay_by_bank_payments"
                | "promptpay_payments"
                | "revolut_pay_payments"
                | "samsung_pay_payments"
                | "satispay_payments"
                | "sepa_bank_transfer_payments"
                | "sepa_debit_payments"
                | "stripe_balance.payouts"
                | "stripe_balance.stripe_transfers"
                | "swish_payments"
                | "twint_payments"
                | "us_bank_transfer_payments"
                | "zip_payments";
              readonly configuration: "customer" | "merchant" | "recipient";
              readonly deadline: {
                readonly status:
                  | "currently_due"
                  | "eventually_due"
                  | "past_due";
              } & { readonly [x: string]: Schema.Json };
            } & { readonly [x: string]: Schema.Json }
          >;
        } & { readonly [x: string]: Schema.Json };
        readonly minimum_deadline: {
          readonly status: "currently_due" | "eventually_due" | "past_due";
        } & { readonly [x: string]: Schema.Json };
        readonly reference?: {
          readonly inquiry?: string;
          readonly resource?: string;
          readonly type: "inquiry" | "payment_method" | "person";
        } & { readonly [x: string]: Schema.Json };
        readonly requested_reasons: ReadonlyArray<
          { readonly code: "routine_onboarding" | "routine_verification" } & {
            readonly [x: string]: Schema.Json;
          }
        >;
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly summary?: {
      readonly minimum_deadline?: {
        readonly status: "currently_due" | "eventually_due" | "past_due";
        readonly time?: string;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_core_account_person_token = {
  readonly created: string;
  readonly expires_at: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "v2.core.account_person_token";
  readonly used: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_core_account_person = {
  readonly account: string;
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
  readonly created: string;
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
  readonly id: string;
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
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly legal_gender?: "female" | "male";
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string };
  readonly nationalities?: ReadonlyArray<string>;
  readonly object: "v2.core.account_person";
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
  readonly updated: string;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_core_event_destination = {
  readonly amazon_eventbridge?: {
    readonly aws_account_id: string;
    readonly aws_event_source_arn: string;
    readonly aws_event_source_status:
      | "active"
      | "deleted"
      | "pending"
      | "unknown";
  } & { readonly [x: string]: Schema.Json };
  readonly azure_event_grid?: {
    readonly azure_partner_topic_name: string;
    readonly azure_partner_topic_status:
      | "activated"
      | "deleted"
      | "never_activated"
      | "unknown";
    readonly azure_region: string;
    readonly azure_resource_group_name: string;
    readonly azure_subscription_id: string;
  } & { readonly [x: string]: Schema.Json };
  readonly created: string;
  readonly description: string;
  readonly enabled_events: ReadonlyArray<string>;
  readonly event_payload: "snapshot" | "thin";
  readonly events_from?: ReadonlyArray<string>;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string };
  readonly name: string;
  readonly object: "v2.core.event_destination";
  readonly snapshot_api_version?: string;
  readonly status: "disabled" | "enabled";
  readonly status_details?: {
    readonly disabled?: {
      readonly reason:
        | "no_aws_event_source_exists"
        | "no_azure_partner_topic_exists"
        | "user";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly type: "amazon_eventbridge" | "azure_event_grid" | "webhook_endpoint";
  readonly updated: string;
  readonly webhook_endpoint?: {
    readonly signing_secret?: string;
    readonly url?: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };
export type Stripev2_core_event = {
  readonly changes?: { readonly [x: string]: Schema.Json };
  readonly context?: string;
  readonly created: string;
  readonly data?: { readonly [x: string]: Schema.Json };
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "v2.core.event";
  readonly reason?: {
    readonly request?: {
      readonly id: string;
      readonly idempotency_key: string;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "request";
  } & { readonly [x: string]: Schema.Json };
  readonly related_object?: {
    readonly id?: string;
    readonly type: string;
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly snapshot_event?: string;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_core_vault_gb_bank_account = {
  readonly archived: boolean;
  readonly bank_account_type: "checking" | "savings";
  readonly bank_name: string;
  readonly created: string;
  readonly id: string;
  readonly last4: string;
  readonly livemode: boolean;
  readonly object: "v2.core.vault.gb_bank_account";
  readonly restricted: boolean;
  readonly sort_code?: string;
  readonly supported_currencies: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripev2_core_vault_us_bank_account = {
  readonly archived: boolean;
  readonly bank_account_type: "checking" | "savings";
  readonly bank_name: string;
  readonly created: string;
  readonly fedwire_routing_number?: string;
  readonly financial_connections_account?: string;
  readonly id: string;
  readonly last4: string;
  readonly livemode: boolean;
  readonly object: "v2.core.vault.us_bank_account";
  readonly restricted: boolean;
  readonly routing_number?: string;
  readonly supported_currencies: ReadonlyArray<string>;
  readonly verification: {
    readonly microdeposit_verification_details?: {
      readonly expires: string;
      readonly microdeposit_type: "amounts" | "descriptor_code";
      readonly sent: string;
    } & { readonly [x: string]: Schema.Json };
    readonly status:
      | "awaiting_verification"
      | "unverified"
      | "verification_failed"
      | "verified";
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };

export const Stripev2_core_account_token = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.String.annotate({
      description:
        "Time at which the token was created. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
    expires_at: Schema.String.annotate({
      description: "Time at which the token will expire.",
      format: "date-time",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the token.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the token exists in live mode or the value `false` if the object exists in test mode.",
    }),
    object: Schema.Literal("v2.core.account_token").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    used: Schema.Boolean.annotate({
      description:
        "Determines if the token has already been used (tokens can only be used once).",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Account Token",
  description:
    "Account tokens are single-use tokens which tokenize an account's contact_email, display_name, contact_phone, and identity.",
  identifier: "Stripev2.core.account_token",
});
export const Stripev2_core_account = Schema.StructWithRest(
  Schema.Struct({
    applied_configurations: Schema.Array(
      Schema.Literals(["customer", "merchant", "recipient"]),
    ).annotate({
      description: "The configurations that have been applied to this account.",
    }),
    closed: Schema.optionalKey(
      Schema.Boolean.annotate({
        description: "Indicates whether the account has been closed.",
      }),
    ),
    configuration: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          customer: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                applied: Schema.Boolean.annotate({
                  description:
                    "Indicates whether the customer configuration is active. You can deactivate or reactivate the customer configuration by updating this property. Deactivating the configuration by setting this value to false will unrequest all capabilities within the configuration. It will not delete any of the configuration's other properties.",
                }),
                automatic_indirect_tax: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      exempt: Schema.optionalKey(
                        Schema.Literals(["exempt", "none", "reverse"]).annotate(
                          {
                            description:
                              'The customer account\'s tax exemption status: `none`, `exempt`, or `reverse`. When `reverse`, invoice and receipt PDFs include "Reverse charge".',
                          },
                        ),
                      ),
                      ip_address: Schema.optionalKey(
                        Schema.String.annotate({
                          description:
                            "A recent IP address of the customer used for tax reporting and tax location inference.",
                        }),
                      ),
                      location: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            country: Schema.optionalKey(
                              Schema.String.annotate({
                                description:
                                  "The identified tax country of the customer.",
                              }),
                            ),
                            state: Schema.optionalKey(
                              Schema.String.annotate({
                                description:
                                  "The identified tax state, county, province, or region of the customer.",
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
                            "The customer account's identified tax location, derived from `location_source`. Only rendered if the `automatic_indirect_tax` feature is requested and `active`.",
                        }),
                      ),
                      location_source: Schema.optionalKey(
                        Schema.Literals([
                          "identity_address",
                          "ip_address",
                          "payment_method",
                          "shipping_address",
                        ]).annotate({
                          description:
                            "Data source used to identify the customer account's tax location. Defaults to `identity_address`. Used for automatic indirect tax calculation.",
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
                      "Settings for automatic indirect tax calculation on the customer's invoices, subscriptions, Checkout Sessions, and Payment Links. Available when automatic tax calculation is available for the customer account's location.",
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
                            custom_fields: Schema.Array(
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
                                "The list of up to 4 default custom fields to be displayed on invoices for this customer. When updating, pass an empty string to remove previously-defined fields.",
                            }),
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
                      "Default Billing settings for the customer account, used in Invoices and Subscriptions.",
                  }),
                ),
                capabilities: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      automatic_indirect_tax: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                        ).annotate({
                          description: "Customer shipping address.",
                        }),
                      ),
                      name: Schema.optionalKey(
                        Schema.String.annotate({
                          description: "Customer name.",
                        }),
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
                applied: Schema.Boolean.annotate({
                  description:
                    "Indicates whether the merchant configuration is active. You can deactivate or reactivate the merchant configuration by updating this property. Deactivating the configuration by setting this value to false doesn't delete the configuration's properties.",
                }),
                bacs_debit_payments: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      display_name: Schema.optionalKey(
                        Schema.String.annotate({
                          description:
                            "Display name for Bacs Direct Debit payments.",
                        }),
                      ),
                      service_user_number: Schema.optionalKey(
                        Schema.String.annotate({
                          description:
                            "Service User Number (SUN) for Bacs Direct Debit payments.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                      stripe_balance: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            payouts: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  "Enables this Account to complete payouts from their Stripe Balance (/v1/balance).",
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
                            "Capabilities that enable the merchant to manage their Stripe Balance (/v1/balance).",
                        }),
                      ),
                      sunbit_payments: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                      "Capabilities that have been requested on the Merchant Configuration.",
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
                applied: Schema.Boolean.annotate({
                  description:
                    "Indicates whether the recipient configuration is active. You can deactivate or reactivate the recipient configuration by updating this property. Deactivating the configuration by setting this value to false  unrequest all capabilities within the configuration. It will not delete any of the configuration's other properties.",
                }),
                capabilities: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      bank_accounts: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            ach: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            status: Schema.Literals([
                              "active",
                              "pending",
                              "rejected",
                              "restricted",
                              "unsupported",
                            ]).annotate({
                              description: "The status of the Capability.",
                            }),
                            status_details: Schema.Array(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  code: Schema.Literals([
                                    "determining_status",
                                    "rejected_fraud",
                                    "rejected_incomplete_verification",
                                    "rejected_listed",
                                    "rejected_other",
                                    "rejected_platform_fraud",
                                    "rejected_platform_other",
                                    "rejected_platform_terms_of_service",
                                    "rejected_terms_of_service",
                                    "requirements_past_due",
                                    "requirements_pending_verification",
                                    "restricted_other",
                                    "unsupported_business",
                                    "unsupported_country",
                                    "unsupported_entity_type",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                  }),
                                  resolution: Schema.Literals([
                                    "contact_stripe",
                                    "no_resolution",
                                    "provide_info",
                                  ]).annotate({
                                    description:
                                      "Machine-readable code explaining how to make the Capability active.",
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
                                "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                            "Enables this Account to receive OutboundPayments to a linked debit card.",
                        }),
                      ),
                      stripe_balance: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            payouts: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                                  "Enables this Account to complete payouts from their Stripe Balance (/v1/balance).",
                              }),
                            ),
                            stripe_transfers: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  status: Schema.Literals([
                                    "active",
                                    "pending",
                                    "rejected",
                                    "restricted",
                                    "unsupported",
                                  ]).annotate({
                                    description:
                                      "The status of the Capability.",
                                  }),
                                  status_details: Schema.Array(
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        code: Schema.Literals([
                                          "determining_status",
                                          "rejected_fraud",
                                          "rejected_incomplete_verification",
                                          "rejected_listed",
                                          "rejected_other",
                                          "rejected_platform_fraud",
                                          "rejected_platform_other",
                                          "rejected_platform_terms_of_service",
                                          "rejected_terms_of_service",
                                          "requirements_past_due",
                                          "requirements_pending_verification",
                                          "restricted_other",
                                          "unsupported_business",
                                          "unsupported_country",
                                          "unsupported_entity_type",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining the reason for the Capability to be in its current status.",
                                        }),
                                        resolution: Schema.Literals([
                                          "contact_stripe",
                                          "no_resolution",
                                          "provide_info",
                                        ]).annotate({
                                          description:
                                            "Machine-readable code explaining how to make the Capability active.",
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
                                      "Additional details about the capability's status. This value is empty when `status` is `active`.",
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
                      "Capabilities that have been requested on the Recipient Configuration.",
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
          "An Account represents a company, individual, or other entity that a user interacts with. Accounts store identity information and one or more configurations that enable product-specific capabilities. You can assign configurations at creation or add them later.",
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
    created: Schema.String.annotate({
      description:
        "Time at which the object was created. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
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
                    description: "The customer-facing business name.",
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
          responsibilities: Schema.StructWithRest(
            Schema.Struct({
              fees_collector: Schema.optionalKey(
                Schema.Literals([
                  "application",
                  "application_custom",
                  "application_express",
                  "stripe",
                ]).annotate({
                  description:
                    "Indicates whether the platform or connected account is responsible for paying Stripe fees for pricing-control-eligible products.",
                }),
              ),
              losses_collector: Schema.optionalKey(
                Schema.Literals(["application", "stripe"]).annotate({
                  description:
                    "A value indicating the responsibility for losses on this account.",
                }),
              ),
              requirements_collector: Schema.Literals([
                "application",
                "stripe",
              ]).annotate({
                description:
                  "A value indicating responsibility for collecting requirements on this account.",
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
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description:
          "Default values for settings shared across Account configurations.",
      }),
    ),
    display_name: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A descriptive name for the Account. This name will be surfaced in the Stripe Dashboard and on any invoices sent to the Account.",
      }),
    ),
    future_requirements: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          alternatives: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  options: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        entries: Schema.Array(
                          Schema.StructWithRest(
                            Schema.Struct({
                              awaiting_action_from: Schema.Literals([
                                "stripe",
                                "user",
                              ]).annotate({
                                description:
                                  "Indicates whether the user or Stripe is currently responsible for taking action on the requirement. Value can be `user` or `stripe`.",
                              }),
                              description: Schema.String.annotate({
                                description:
                                  "Machine-readable string describing the requirement.",
                              }),
                              errors: Schema.Array(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    code: Schema.Literals([
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
                                      "invalid_url_web_presence_detected",
                                      "invalid_value_other",
                                      "unresolvable_ip_address",
                                      "unresolvable_postal_code",
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
                                      "verification_missing_directors",
                                      "verification_missing_executives",
                                      "verification_missing_owners",
                                      "verification_requires_additional_memorandum_of_associations",
                                      "verification_requires_additional_proof_of_registration",
                                      "verification_selfie_document_missing_photo",
                                      "verification_selfie_face_mismatch",
                                      "verification_selfie_manipulated",
                                      "verification_selfie_unverified_other",
                                      "verification_supportability",
                                      "verification_token_stale",
                                    ]).annotate({
                                      description:
                                        "Machine-readable code describing the error.",
                                    }),
                                    description: Schema.String.annotate({
                                      description:
                                        "Human-readable description of the error.",
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
                                  "Descriptions of why the requirement must be collected, or why the collected information isn't satisfactory to Stripe.",
                              }),
                              reference: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    inquiry: Schema.optionalKey(
                                      Schema.String.annotate({
                                        description:
                                          "If `inquiry` is the type, the inquiry token.",
                                      }),
                                    ),
                                    resource: Schema.optionalKey(
                                      Schema.String.annotate({
                                        description:
                                          "If `resource` is the type, the resource token.",
                                      }),
                                    ),
                                    type: Schema.Literals([
                                      "inquiry",
                                      "payment_method",
                                      "person",
                                    ]).annotate({
                                      description:
                                        'The type of the reference. If the type is "inquiry", the inquiry token can be found in the "inquiry" field.\nOtherwise the type is an API resource, the token for which can be found in the "resource" field.',
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
                                    "A reference to the location of the requirement.",
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
                          ),
                        ).annotate({
                          description:
                            "The requirements that must all be provided to satisfy this option.",
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
                      "The alternative sets of requirements that can be provided. Providing every entry in any one of these options resolves all of the requirements in `original_entries`.",
                  }),
                  original_entries: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        description: Schema.String.annotate({
                          description:
                            "Machine-readable string describing the requirement.",
                        }),
                        reference: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              inquiry: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "If `inquiry` is the type, the inquiry token.",
                                }),
                              ),
                              resource: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "If `resource` is the type, the resource token.",
                                }),
                              ),
                              type: Schema.Literals([
                                "inquiry",
                                "payment_method",
                                "person",
                              ]).annotate({
                                description:
                                  'The type of the reference. If the type is "inquiry", the inquiry token can be found in the "inquiry" field.\nOtherwise the type is an API resource, the token for which can be found in the "resource" field.',
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
                              "A reference to the location of the requirement.",
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
                      "The requirements that can be satisfied either directly, or by providing every entry in any one of `options`.",
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
                "A list of alternative sets of requirements that can be provided in lieu of requirements in `entries`.",
            }),
          ),
          entries: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  awaiting_action_from: Schema.Literals([
                    "stripe",
                    "user",
                  ]).annotate({
                    description:
                      "Indicates whether the user or Stripe is currently responsible for taking action on the requirement. Value can be `user` or `stripe`.",
                  }),
                  description: Schema.String.annotate({
                    description:
                      "Machine-readable string describing the requirement.",
                  }),
                  errors: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        code: Schema.Literals([
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
                          "invalid_url_web_presence_detected",
                          "invalid_value_other",
                          "unresolvable_ip_address",
                          "unresolvable_postal_code",
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
                          "verification_missing_directors",
                          "verification_missing_executives",
                          "verification_missing_owners",
                          "verification_requires_additional_memorandum_of_associations",
                          "verification_requires_additional_proof_of_registration",
                          "verification_selfie_document_missing_photo",
                          "verification_selfie_face_mismatch",
                          "verification_selfie_manipulated",
                          "verification_selfie_unverified_other",
                          "verification_supportability",
                          "verification_token_stale",
                        ]).annotate({
                          description:
                            "Machine-readable code describing the error.",
                        }),
                        description: Schema.String.annotate({
                          description:
                            "Human-readable description of the error.",
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
                      "Descriptions of why the requirement must be collected, or why the collected information isn't satisfactory to Stripe.",
                  }),
                  impact: Schema.StructWithRest(
                    Schema.Struct({
                      restricts_capabilities: Schema.optionalKey(
                        Schema.Array(
                          Schema.StructWithRest(
                            Schema.Struct({
                              capability: Schema.Literals([
                                "ach_debit_payments",
                                "acss_debit_payments",
                                "affirm_payments",
                                "afterpay_clearpay_payments",
                                "alma_payments",
                                "amazon_pay_payments",
                                "automatic_indirect_tax",
                                "au_becs_debit_payments",
                                "bacs_debit_payments",
                                "bancontact_payments",
                                "bank_accounts.ach",
                                "bank_accounts.fedwire",
                                "bank_accounts.fps",
                                "bank_accounts.local",
                                "bank_accounts.rtp",
                                "bank_accounts.sepa",
                                "bank_accounts.swift",
                                "bank_accounts.wire",
                                "blik_payments",
                                "blik_recurring_payments",
                                "boleto_payments",
                                "cards",
                                "card_payments",
                                "cartes_bancaires_payments",
                                "cashapp_payments",
                                "eps_payments",
                                "fpx_payments",
                                "gb_bank_transfer_payments",
                                "grabpay_payments",
                                "ideal_payments",
                                "jcb_payments",
                                "jp_bank_transfer_payments",
                                "kakao_pay_payments",
                                "klarna_payments",
                                "konbini_payments",
                                "kr_card_payments",
                                "link_payments",
                                "mobilepay_payments",
                                "multibanco_payments",
                                "mx_bank_transfer_payments",
                                "naver_pay_payments",
                                "oxxo_payments",
                                "p24_payments",
                                "payco_payments",
                                "paynow_payments",
                                "pay_by_bank_payments",
                                "promptpay_payments",
                                "revolut_pay_payments",
                                "samsung_pay_payments",
                                "satispay_payments",
                                "sepa_bank_transfer_payments",
                                "sepa_debit_payments",
                                "stripe_balance.payouts",
                                "stripe_balance.stripe_transfers",
                                "swish_payments",
                                "twint_payments",
                                "us_bank_transfer_payments",
                                "zip_payments",
                              ]).annotate({
                                description:
                                  "The name of the Capability which will be restricted.",
                              }),
                              configuration: Schema.Literals([
                                "customer",
                                "merchant",
                                "recipient",
                              ]).annotate({
                                description:
                                  "The configuration which specifies the Capability which will be restricted.",
                              }),
                              deadline: Schema.StructWithRest(
                                Schema.Struct({
                                  status: Schema.Literals([
                                    "currently_due",
                                    "eventually_due",
                                    "past_due",
                                  ]).annotate({
                                    description:
                                      "The current status of the requirement's impact.",
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
                                  "Details about when in the account lifecycle the requirement must be collected by the avoid the Capability restriction.",
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
                            "The Capabilities that will be restricted if the requirement is not collected and satisfactory to Stripe.",
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
                      "A hash describing the impact of not collecting the requirement, or Stripe not being able to verify the collected information.",
                  }),
                  minimum_deadline: Schema.StructWithRest(
                    Schema.Struct({
                      status: Schema.Literals([
                        "currently_due",
                        "eventually_due",
                        "past_due",
                      ]).annotate({
                        description:
                          "The current status of the requirement's impact.",
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
                      "The soonest point when the account will be impacted by not providing the requirement.",
                  }),
                  reference: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        inquiry: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "If `inquiry` is the type, the inquiry token.",
                          }),
                        ),
                        resource: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "If `resource` is the type, the resource token.",
                          }),
                        ),
                        type: Schema.Literals([
                          "inquiry",
                          "payment_method",
                          "person",
                        ]).annotate({
                          description:
                            'The type of the reference. If the type is "inquiry", the inquiry token can be found in the "inquiry" field.\nOtherwise the type is an API resource, the token for which can be found in the "resource" field.',
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
                        "A reference to the location of the requirement.",
                    }),
                  ),
                  requested_reasons: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        code: Schema.Literals([
                          "routine_onboarding",
                          "routine_verification",
                        ]).annotate({
                          description:
                            "Machine-readable description of Stripe's reason for collecting the requirement.",
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
                      "A list of reasons why Stripe is collecting the requirement.",
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
              description: "A list of requirements for the Account.",
            }),
          ),
          minimum_transition_date: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The time at which the future requirements become effective.",
              format: "date-time",
            }),
          ),
          summary: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                minimum_deadline: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      status: Schema.Literals([
                        "currently_due",
                        "eventually_due",
                        "past_due",
                      ]).annotate({
                        description:
                          "The current strictest status of all requirements on the Account.",
                      }),
                      time: Schema.optionalKey(
                        Schema.String.annotate({
                          description:
                            "The soonest RFC3339 date & time UTC value a requirement can impact the Account.",
                          format: "date-time",
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
                      "The soonest date and time a requirement on the Account will become `past due`. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: `2022-09-18T13:22:18.123Z`.",
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
                "An object containing an overview of requirements for the Account.",
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
          "Information about the future requirements for the Account that will eventually come into effect, including what information needs to be collected, and by when.",
      }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the Account.",
    }),
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
                  ).annotate({ description: "The company's primary address." }),
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
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({
                          description:
                            "Annual revenue amount in minor currency units (for example, '123' for 1.23 USD).",
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
                            "One or more documents that support the Bank account ownership verification requirement. Must be a document associated with the account's primary active bank account that displays the last 4 digits of the account number, either a statement or a check.",
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
                                "The [file upload](https://docs.stripe.com/api/files/create) tokens for the front and back of the verification document.",
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
                    description:
                      "Documents that may be submitted to satisfy various informational requests.",
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
                      "The provided ID numbers of a business entity.",
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
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({
                          description:
                            "Estimated monthly revenue amount in minor currency units (for example, '123' for 1.23 USD).",
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
                      "An estimate of the monthly revenue of the business. Only accepted for accounts in Brazil and India.",
                  }),
                ),
                phone: Schema.optionalKey(
                  Schema.String.annotate({
                    description:
                      "The company's phone number (used for verification).",
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
                account: Schema.String.annotate({
                  description:
                    "The account ID which the individual belongs to.",
                }),
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
                            description: "The individual's full name.",
                          }),
                        ),
                        given_name: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "The individual's first or given name.",
                          }),
                        ),
                        purpose: Schema.Literals(["alias", "maiden"]).annotate({
                          description:
                            "The purpose or type of the additional name.",
                        }),
                        surname: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "The individual's last or family name.",
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
                        ).annotate({
                          description: "Stripe terms of service agreement.",
                        }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ description: "Terms of service acceptances." }),
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
                created: Schema.String.annotate({
                  description:
                    "Time at which the object was created. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
                  format: "date-time",
                }),
                date_of_birth: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      day: Schema.Number.annotate({
                        description: "The day of birth, between 1 and 31.",
                      }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                      month: Schema.Number.annotate({
                        description: "The month of birth, between 1 and 12.",
                      }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                      year: Schema.Number.annotate({
                        description: "The four-digit year of birth.",
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
                                "The [file upload](https://docs.stripe.com/api/files/create) tokens for the front and back of the verification document.",
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
                                "The [file upload](https://docs.stripe.com/api/files/create) tokens for the front and back of the verification document.",
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
                id: Schema.String.annotate({
                  description: "Unique identifier for the object.",
                }),
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
                object: Schema.String.annotate({
                  description:
                    "String representing the object's type. Objects of the same type share the same value.",
                }),
                phone: Schema.optionalKey(
                  Schema.String.annotate({
                    description: "The individual's phone number.",
                  }),
                ),
                political_exposure: Schema.optionalKey(
                  Schema.Literals(["existing", "none"]).annotate({
                    description:
                      "Indicates if the individual or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.",
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
                            "Whether the individual is a director of the Account's identity. Directors are typically members of the governing board of the company or are responsible for making sure that the company meets its regulatory obligations.",
                        }),
                      ),
                      executive: Schema.optionalKey(
                        Schema.Boolean.annotate({
                          description:
                            "Whether the individual has significant responsibility to control, manage, or direct the organization.",
                        }),
                      ),
                      legal_guardian: Schema.optionalKey(
                        Schema.Boolean.annotate({
                          description:
                            "Whether the individual is the legal guardian of the Account's representative.",
                        }),
                      ),
                      owner: Schema.optionalKey(
                        Schema.Boolean.annotate({
                          description:
                            "Whether the individual is an owner of the Account's identity.",
                        }),
                      ),
                      percent_ownership: Schema.optionalKey(
                        Schema.String.annotate({
                          description:
                            "The percentage of the Account's identity that the individual owns.",
                          format: "decimal",
                        }),
                      ),
                      representative: Schema.optionalKey(
                        Schema.Boolean.annotate({
                          description:
                            "Whether the individual is authorized as the primary representative of the Account. This is the person nominated by the business to provide information about themselves, and general information about the account. There can only be one representative at any given time. At the time the account is created, this person should be set to the person responsible for opening the account.",
                        }),
                      ),
                      title: Schema.optionalKey(
                        Schema.String.annotate({
                          description:
                            "The individual's title (e.g., CEO, Support Engineer).",
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
                      "The relationship that this individual has with the Account's identity.",
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
                      "The script names (e.g. non-Latin characters) associated with the individual.",
                  }),
                ),
                surname: Schema.optionalKey(
                  Schema.String.annotate({
                    description: "The individual's last name.",
                  }),
                ),
                updated: Schema.String.annotate({
                  description: "Time at which the object was last updated.",
                  format: "date-time",
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
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
      }),
    ),
    object: Schema.Literal("v2.core.account").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    requirements: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          alternatives: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  options: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        entries: Schema.Array(
                          Schema.StructWithRest(
                            Schema.Struct({
                              awaiting_action_from: Schema.Literals([
                                "stripe",
                                "user",
                              ]).annotate({
                                description:
                                  "Indicates whether the user or Stripe is currently responsible for taking action on the requirement. Value can be `user` or `stripe`.",
                              }),
                              description: Schema.String.annotate({
                                description:
                                  "Machine-readable string describing the requirement.",
                              }),
                              errors: Schema.Array(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    code: Schema.Literals([
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
                                      "invalid_url_web_presence_detected",
                                      "invalid_value_other",
                                      "unresolvable_ip_address",
                                      "unresolvable_postal_code",
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
                                      "verification_missing_directors",
                                      "verification_missing_executives",
                                      "verification_missing_owners",
                                      "verification_requires_additional_memorandum_of_associations",
                                      "verification_requires_additional_proof_of_registration",
                                      "verification_selfie_document_missing_photo",
                                      "verification_selfie_face_mismatch",
                                      "verification_selfie_manipulated",
                                      "verification_selfie_unverified_other",
                                      "verification_supportability",
                                      "verification_token_stale",
                                    ]).annotate({
                                      description:
                                        "Machine-readable code describing the error.",
                                    }),
                                    description: Schema.String.annotate({
                                      description:
                                        "Human-readable description of the error.",
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
                                  "Descriptions of why the requirement must be collected, or why the collected information isn't satisfactory to Stripe.",
                              }),
                              reference: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    inquiry: Schema.optionalKey(
                                      Schema.String.annotate({
                                        description:
                                          "If `inquiry` is the type, the inquiry token.",
                                      }),
                                    ),
                                    resource: Schema.optionalKey(
                                      Schema.String.annotate({
                                        description:
                                          "If `resource` is the type, the resource token.",
                                      }),
                                    ),
                                    type: Schema.Literals([
                                      "inquiry",
                                      "payment_method",
                                      "person",
                                    ]).annotate({
                                      description:
                                        'The type of the reference. If the type is "inquiry", the inquiry token can be found in the "inquiry" field.\nOtherwise the type is an API resource, the token for which can be found in the "resource" field.',
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
                                    "A reference to the location of the requirement.",
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
                          ),
                        ).annotate({
                          description:
                            "The requirements that must all be provided to satisfy this option.",
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
                      "The alternative sets of requirements that can be provided. Providing every entry in any one of these options resolves all of the requirements in `original_entries`.",
                  }),
                  original_entries: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        description: Schema.String.annotate({
                          description:
                            "Machine-readable string describing the requirement.",
                        }),
                        reference: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              inquiry: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "If `inquiry` is the type, the inquiry token.",
                                }),
                              ),
                              resource: Schema.optionalKey(
                                Schema.String.annotate({
                                  description:
                                    "If `resource` is the type, the resource token.",
                                }),
                              ),
                              type: Schema.Literals([
                                "inquiry",
                                "payment_method",
                                "person",
                              ]).annotate({
                                description:
                                  'The type of the reference. If the type is "inquiry", the inquiry token can be found in the "inquiry" field.\nOtherwise the type is an API resource, the token for which can be found in the "resource" field.',
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
                              "A reference to the location of the requirement.",
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
                      "The requirements that can be satisfied either directly, or by providing every entry in any one of `options`.",
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
                "A list of alternative sets of requirements that can be provided in lieu of requirements in `entries`.",
            }),
          ),
          entries: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  awaiting_action_from: Schema.Literals([
                    "stripe",
                    "user",
                  ]).annotate({
                    description:
                      "Indicates whether the user or Stripe is currently responsible for taking action on the requirement. Value can be `user` or `stripe`.",
                  }),
                  description: Schema.String.annotate({
                    description:
                      "Machine-readable string describing the requirement.",
                  }),
                  errors: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        code: Schema.Literals([
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
                          "invalid_url_web_presence_detected",
                          "invalid_value_other",
                          "unresolvable_ip_address",
                          "unresolvable_postal_code",
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
                          "verification_missing_directors",
                          "verification_missing_executives",
                          "verification_missing_owners",
                          "verification_requires_additional_memorandum_of_associations",
                          "verification_requires_additional_proof_of_registration",
                          "verification_selfie_document_missing_photo",
                          "verification_selfie_face_mismatch",
                          "verification_selfie_manipulated",
                          "verification_selfie_unverified_other",
                          "verification_supportability",
                          "verification_token_stale",
                        ]).annotate({
                          description:
                            "Machine-readable code describing the error.",
                        }),
                        description: Schema.String.annotate({
                          description:
                            "Human-readable description of the error.",
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
                      "Descriptions of why the requirement must be collected, or why the collected information isn't satisfactory to Stripe.",
                  }),
                  impact: Schema.StructWithRest(
                    Schema.Struct({
                      restricts_capabilities: Schema.optionalKey(
                        Schema.Array(
                          Schema.StructWithRest(
                            Schema.Struct({
                              capability: Schema.Literals([
                                "ach_debit_payments",
                                "acss_debit_payments",
                                "affirm_payments",
                                "afterpay_clearpay_payments",
                                "alma_payments",
                                "amazon_pay_payments",
                                "automatic_indirect_tax",
                                "au_becs_debit_payments",
                                "bacs_debit_payments",
                                "bancontact_payments",
                                "bank_accounts.ach",
                                "bank_accounts.fedwire",
                                "bank_accounts.fps",
                                "bank_accounts.local",
                                "bank_accounts.rtp",
                                "bank_accounts.sepa",
                                "bank_accounts.swift",
                                "bank_accounts.wire",
                                "blik_payments",
                                "blik_recurring_payments",
                                "boleto_payments",
                                "cards",
                                "card_payments",
                                "cartes_bancaires_payments",
                                "cashapp_payments",
                                "eps_payments",
                                "fpx_payments",
                                "gb_bank_transfer_payments",
                                "grabpay_payments",
                                "ideal_payments",
                                "jcb_payments",
                                "jp_bank_transfer_payments",
                                "kakao_pay_payments",
                                "klarna_payments",
                                "konbini_payments",
                                "kr_card_payments",
                                "link_payments",
                                "mobilepay_payments",
                                "multibanco_payments",
                                "mx_bank_transfer_payments",
                                "naver_pay_payments",
                                "oxxo_payments",
                                "p24_payments",
                                "payco_payments",
                                "paynow_payments",
                                "pay_by_bank_payments",
                                "promptpay_payments",
                                "revolut_pay_payments",
                                "samsung_pay_payments",
                                "satispay_payments",
                                "sepa_bank_transfer_payments",
                                "sepa_debit_payments",
                                "stripe_balance.payouts",
                                "stripe_balance.stripe_transfers",
                                "swish_payments",
                                "twint_payments",
                                "us_bank_transfer_payments",
                                "zip_payments",
                              ]).annotate({
                                description:
                                  "The name of the Capability which will be restricted.",
                              }),
                              configuration: Schema.Literals([
                                "customer",
                                "merchant",
                                "recipient",
                              ]).annotate({
                                description:
                                  "The configuration which specifies the Capability which will be restricted.",
                              }),
                              deadline: Schema.StructWithRest(
                                Schema.Struct({
                                  status: Schema.Literals([
                                    "currently_due",
                                    "eventually_due",
                                    "past_due",
                                  ]).annotate({
                                    description:
                                      "The current status of the requirement's impact.",
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
                                  "Details about when in the account lifecycle the requirement must be collected by the avoid the Capability restriction.",
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
                            "The Capabilities that will be restricted if the requirement is not collected and satisfactory to Stripe.",
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
                      "A hash describing the impact of not collecting the requirement, or Stripe not being able to verify the collected information.",
                  }),
                  minimum_deadline: Schema.StructWithRest(
                    Schema.Struct({
                      status: Schema.Literals([
                        "currently_due",
                        "eventually_due",
                        "past_due",
                      ]).annotate({
                        description:
                          "The current status of the requirement's impact.",
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
                      "The soonest point when the account will be impacted by not providing the requirement.",
                  }),
                  reference: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        inquiry: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "If `inquiry` is the type, the inquiry token.",
                          }),
                        ),
                        resource: Schema.optionalKey(
                          Schema.String.annotate({
                            description:
                              "If `resource` is the type, the resource token.",
                          }),
                        ),
                        type: Schema.Literals([
                          "inquiry",
                          "payment_method",
                          "person",
                        ]).annotate({
                          description:
                            'The type of the reference. If the type is "inquiry", the inquiry token can be found in the "inquiry" field.\nOtherwise the type is an API resource, the token for which can be found in the "resource" field.',
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
                        "A reference to the location of the requirement.",
                    }),
                  ),
                  requested_reasons: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        code: Schema.Literals([
                          "routine_onboarding",
                          "routine_verification",
                        ]).annotate({
                          description:
                            "Machine-readable description of Stripe's reason for collecting the requirement.",
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
                      "A list of reasons why Stripe is collecting the requirement.",
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
              description: "A list of requirements for the Account.",
            }),
          ),
          summary: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                minimum_deadline: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      status: Schema.Literals([
                        "currently_due",
                        "eventually_due",
                        "past_due",
                      ]).annotate({
                        description:
                          "The current strictest status of all requirements on the Account.",
                      }),
                      time: Schema.optionalKey(
                        Schema.String.annotate({
                          description:
                            "The soonest RFC3339 date & time UTC value a requirement can impact the Account.",
                          format: "date-time",
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
                      "The soonest date and time a requirement on the Account will become `past due`. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: `2022-09-18T13:22:18.123Z`.",
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
                "An object containing an overview of requirements for the Account.",
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
          "Information about the active requirements for the Account, including what information needs to be collected, and by when.",
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
    "An Account v2 object represents a company, individual, or other entity that your Stripe integration interacts with. It contains both identifying information and properties that control its behavior and functionality. An Account can have one or more configurations that enable sets of related features, such as allowing it to act as a merchant or customer.\nThe Accounts v2 API is broadly available to Connect platforms, and to other users in preview. The Accounts v2 API also supports the Global Payouts preview feature.",
  identifier: "Stripev2.core.account",
});
export const Stripev2_core_account_person_token = Schema.StructWithRest(
  Schema.Struct({
    created: Schema.String.annotate({
      description:
        "Time at which the token was created. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
    expires_at: Schema.String.annotate({
      description: "Time at which the token will expire.",
      format: "date-time",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the token.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the token exists in live mode or the value `false` if the object exists in test mode.",
    }),
    object: Schema.Literal("v2.core.account_person_token").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    used: Schema.Boolean.annotate({
      description:
        "Determines if the token has already been used (tokens can only be used once).",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Person Token",
  description:
    "Person Tokens are single-use tokens which tokenize person information, and are used for creating or updating a Person.",
  identifier: "Stripev2.core.account_person_token",
});
export const Stripev2_core_account_person = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.String.annotate({
      description: "The account ID which the individual belongs to.",
    }),
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
              Schema.String.annotate({
                description: "The individual's full name.",
              }),
            ),
            given_name: Schema.optionalKey(
              Schema.String.annotate({
                description: "The individual's first or given name.",
              }),
            ),
            purpose: Schema.Literals(["alias", "maiden"]).annotate({
              description: "The purpose or type of the additional name.",
            }),
            surname: Schema.optionalKey(
              Schema.String.annotate({
                description: "The individual's last or family name.",
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
      ).annotate({ description: "The person's residential address." }),
    ),
    created: Schema.String.annotate({
      description:
        "Time at which the object was created. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
    date_of_birth: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          day: Schema.Number.annotate({
            description: "The day of birth, between 1 and 31.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          month: Schema.Number.annotate({
            description: "The month of birth, between 1 and 12.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          year: Schema.Number.annotate({
            description: "The four-digit year of birth.",
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
                    "The [file upload](https://docs.stripe.com/api/files/create) tokens for the front and back of the verification document.",
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
                    "The [file upload](https://docs.stripe.com/api/files/create) tokens for the front and back of the verification document.",
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
      Schema.String.annotate({ description: "The person's email address." }),
    ),
    given_name: Schema.optionalKey(
      Schema.String.annotate({ description: "The person's first name." }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the Person.",
    }),
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
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
      }),
    ),
    nationalities: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description:
          "The countries where the person is a national. Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
      }),
    ),
    object: Schema.Literal("v2.core.account_person").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    phone: Schema.optionalKey(
      Schema.String.annotate({ description: "The person's phone number." }),
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
                "Whether the individual is a director of the Account's identity. Directors are typically members of the governing board of the company or are responsible for making sure that the company meets its regulatory obligations.",
            }),
          ),
          executive: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Whether the individual has significant responsibility to control, manage, or direct the organization.",
            }),
          ),
          legal_guardian: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Whether the individual is the legal guardian of the Account's representative.",
            }),
          ),
          owner: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Whether the individual is an owner of the Account's identity.",
            }),
          ),
          percent_ownership: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The percentage of the Account's identity that the individual owns.",
              format: "decimal",
            }),
          ),
          representative: Schema.optionalKey(
            Schema.Boolean.annotate({
              description:
                "Whether the individual is authorized as the primary representative of the Account. This is the person nominated by the business to provide information about themselves, and general information about the account. There can only be one representative at any given time. At the time the account is created, this person should be set to the person responsible for opening the account.",
            }),
          ),
          title: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The individual's title (e.g., CEO, Support Engineer).",
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
    updated: Schema.String.annotate({
      description:
        "Time at which the object was last updated. Represented as a RFC 3339 date & time UTC value in millisecond precision, for example: 2022-09-18T13:22:18.123Z.",
      format: "date-time",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Person",
  description:
    "A Person represents an individual associated with an Account's identity (for example, an owner, director, executive, or representative). Use Persons to provide and update identity information for verification and compliance.",
  identifier: "Stripev2.core.account_person",
});
export const Stripev2_core_event_destination = Schema.StructWithRest(
  Schema.Struct({
    amazon_eventbridge: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          aws_account_id: Schema.String.annotate({
            description:
              "The AWS account ID that owns the event bus receiving events.",
          }),
          aws_event_source_arn: Schema.String.annotate({
            description:
              "The ARN of the Stripe-created partner event source in your AWS account.",
          }),
          aws_event_source_status: Schema.Literals([
            "active",
            "deleted",
            "pending",
            "unknown",
          ]).annotate({
            description:
              "The AWS-reported lifecycle state of the partner event source.",
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
          "Configuration for delivering events through an Amazon EventBridge partner event source.",
      }),
    ),
    azure_event_grid: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          azure_partner_topic_name: Schema.String.annotate({
            description:
              "The name of the Stripe-created partner topic that receives events.",
          }),
          azure_partner_topic_status: Schema.Literals([
            "activated",
            "deleted",
            "never_activated",
            "unknown",
          ]).annotate({
            description:
              "The Azure-reported lifecycle state of the partner topic.",
          }),
          azure_region: Schema.String.annotate({
            description: "The Azure region where the partner topic is located.",
          }),
          azure_resource_group_name: Schema.String.annotate({
            description:
              "The Azure resource group containing the partner topic.",
          }),
          azure_subscription_id: Schema.String.annotate({
            description:
              "The Azure subscription containing the resource group and partner topic.",
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
          "Configuration for delivering events through an Azure Event Grid partner topic.",
      }),
    ),
    created: Schema.String.annotate({
      description: "The time when the destination was created.",
      format: "date-time",
    }),
    description: Schema.String.annotate({
      description:
        "An optional user-defined description of the destination's purpose.",
    }),
    enabled_events: Schema.Array(Schema.String).annotate({
      description:
        "The list of event types enabled for delivery to this destination.",
    }),
    event_payload: Schema.Literals(["snapshot", "thin"]).annotate({
      description: "Whether to deliver as snapshot or thin events.",
    }),
    events_from: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description:
          "Specifies which accounts' events route to this destination.\n`@self`: Receive events from the account that owns the event destination.\n`@accounts`: Receive events emitted from other accounts you manage which includes your v1 and v2 accounts.\n`@organization_members`: Receive events from accounts directly linked to the organization.\n`@organization_members/@accounts`: Receive events from all accounts connected to any platform accounts in the organization.",
      }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "User-defined key/value data for the destination; it has no effect on event matching or delivery.",
      }),
    ),
    name: Schema.String.annotate({
      description:
        "A user-defined label for identifying the destination in Stripe.",
    }),
    object: Schema.Literal("v2.core.event_destination").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    snapshot_api_version: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For snapshot events only, the Stripe API version used to render event objects. You can't change this value after you create the event destination. Thin events are not pinned to an API version.",
      }),
    ),
    status: Schema.Literals(["disabled", "enabled"]).annotate({
      description:
        "Whether Stripe currently attempts delivery. Stripe attempts delivery to enabled destinations when their provider configuration is active; disabled destinations do not receive delivery attempts.",
    }),
    status_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          disabled: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                reason: Schema.Literals([
                  "no_aws_event_source_exists",
                  "no_azure_partner_topic_exists",
                  "user",
                ]).annotate({
                  description: "Reason event destination has been disabled.",
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
                "Present when the destination was disabled; identifies the cause, time, and provider-side object involved when available.",
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
          "Additional lifecycle context for the destination status, when available.",
      }),
    ),
    type: Schema.Literals([
      "amazon_eventbridge",
      "azure_event_grid",
      "webhook_endpoint",
    ]).annotate({
      description:
        "The delivery transport. Chosen when the destination is created and cannot be changed by update.",
    }),
    updated: Schema.String.annotate({
      description: "The time when the destination object was last updated.",
      format: "date-time",
    }),
    webhook_endpoint: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          signing_secret: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The secret used to verify Stripe signatures on delivered events. Returned only in the create response when explicitly included; public API clients cannot retrieve it later.",
            }),
          ),
          url: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The URL where Stripe sends matching events. Live mode requires HTTPS; sandbox mode also supports HTTP. Returned only when explicitly included.",
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
          "Configuration for delivering events to a webhook endpoint. Live mode requires HTTPS; sandbox mode also supports HTTP.",
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
  title: "Event Destination",
  description:
    "Set up an event destination to receive events from Stripe across multiple destination types, including [webhook endpoints](https://docs.stripe.com/webhooks), [Amazon EventBridge](https://docs.stripe.com/event-destinations/eventbridge), and [Azure Event Grid](https://docs.stripe.com/event-destinations/eventgrid). Event destinations support receiving [thin events](https://docs.stripe.com/api/v2/events) and [snapshot events](https://docs.stripe.com/api/events).",
  identifier: "Stripev2.core.event_destination",
});
export const Stripev2_core_event = Schema.StructWithRest(
  Schema.Struct({
    changes: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({
        description: "Before and after changes for the primary related object.",
      }),
    ),
    context: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Authentication context needed to fetch the event or related object.",
      }),
    ),
    created: Schema.String.annotate({
      description: "Time at which the object was created.",
      format: "date-time",
    }),
    data: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({ description: "Additional data about the event." }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the event.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    object: Schema.Literal("v2.core.event").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    reason: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          request: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                id: Schema.String.annotate({
                  description: "ID of the API request that caused the event.",
                }),
                idempotency_key: Schema.String.annotate({
                  description:
                    "The idempotency key transmitted during the request.",
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
                "Information on the API request that instigated the event.",
            }),
          ),
          type: Schema.Literal("request").annotate({
            description: "Event reason type.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "Reason for the event." }),
    ),
    related_object: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          id: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Unique identifier for the object relevant to the event.",
            }),
          ),
          type: Schema.String.annotate({
            description: "Object tag of the resource relevant to the event.",
          }),
          url: Schema.String.annotate({
            description: "URL to retrieve the resource.",
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
          "Object containing the reference to API resource relevant to the event.",
      }),
    ),
    snapshot_event: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For thin events with a corresponding snapshot event, this is the snapshot event ID.",
      }),
    ),
    type: Schema.String.annotate({ description: "The type of the event." }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Event",
  description:
    "Events are generated to keep you informed of activity in your business account. APIs in the /v2 namespace generate [thin events](https://docs.stripe.com/event-destinations#benefits-of-thin-events) which have small, unversioned payloads that include a reference to the ID of the object that has changed. The Events v2 API returns these new thin events. [Retrieve the event object](https://docs.stripe.com/event-destinations#fetch-data) for additional data about the event. Use the related object ID in the event payload to [fetch the API resource](https://docs.stripe.com/event-destinations#retrieve-the-object-associated-with-thin-events) of the object associated with the event. Comparatively, events generated by most API v1 include a versioned snapshot of an API object in their payload.\nYou can access events through the [Retrieve Event API](https://docs.stripe.com/api/v2/core/events/retrieve) for 30 days.",
  identifier: "Stripev2.core.event",
});
export const Stripev2_core_vault_gb_bank_account = Schema.StructWithRest(
  Schema.Struct({
    archived: Schema.Boolean.annotate({
      description:
        "Whether this bank account object was archived. Bank account objects can be archived through\nthe /archive API, and they will not be automatically archived by Stripe. Archived bank account objects\ncannot be used as outbound destinations and will not appear in the outbound destination list.",
    }),
    bank_account_type: Schema.Literals(["checking", "savings"]).annotate({
      description:
        "Closed Enum. The type of the bank account (checking or savings).",
    }),
    bank_name: Schema.String.annotate({ description: "The name of the bank." }),
    created: Schema.String.annotate({
      description: "Creation time.",
      format: "date-time",
    }),
    id: Schema.String.annotate({
      description: "The ID of the GBBankAccount object.",
    }),
    last4: Schema.String.annotate({
      description: "The last 4 digits of the account number or IBAN.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    object: Schema.Literal("v2.core.vault.gb_bank_account").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    restricted: Schema.Boolean.annotate({
      description:
        "Whether the GB Bank Account is currently unusable for money movement, despite potentially being correctly set up. Please reach out to Stripe Support for more information.",
    }),
    sort_code: Schema.optionalKey(
      Schema.String.annotate({
        description: "The Sort Code of the bank account.",
      }),
    ),
    supported_currencies: Schema.Array(Schema.String).annotate({
      description: "The list of currencies supported by this bank account.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "GB Bank Account",
  description:
    "Use the GBBankAccounts API to create and manage GB bank account objects",
  identifier: "Stripev2.core.vault.gb_bank_account",
});
export const Stripev2_core_vault_us_bank_account = Schema.StructWithRest(
  Schema.Struct({
    archived: Schema.Boolean.annotate({
      description: "Whether this USBankAccount object was archived.",
    }),
    bank_account_type: Schema.Literals(["checking", "savings"]).annotate({
      description:
        "Closed Enum. The type of bank account (checking or savings).",
    }),
    bank_name: Schema.String.annotate({
      description:
        "The name of the bank this bank account belongs to. This field is populated automatically by Stripe based on the routing number.",
    }),
    created: Schema.String.annotate({
      description: "Creation time of the object.",
      format: "date-time",
    }),
    fedwire_routing_number: Schema.optionalKey(
      Schema.String.annotate({
        description: "The fedwire routing number of the bank account.",
      }),
    ),
    financial_connections_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the Financial Connections Account used to create the bank account.",
      }),
    ),
    id: Schema.String.annotate({
      description: "The ID of the USBankAccount object.",
    }),
    last4: Schema.String.annotate({
      description: "The last 4 digits of the account number.",
    }),
    livemode: Schema.Boolean.annotate({
      description:
        "Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.",
    }),
    object: Schema.Literal("v2.core.vault.us_bank_account").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value of the object field.",
    }),
    restricted: Schema.Boolean.annotate({
      description:
        "Whether the US Bank Account is currently unusable for money movement, despite potentially being correctly set up. Please reach out to Stripe Support for more information.",
    }),
    routing_number: Schema.optionalKey(
      Schema.String.annotate({
        description: "The ACH routing number of the bank account.",
      }),
    ),
    supported_currencies: Schema.Array(Schema.String).annotate({
      description: "The list of currencies supported by this bank account.",
    }),
    verification: Schema.StructWithRest(
      Schema.Struct({
        microdeposit_verification_details: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              expires: Schema.String.annotate({
                description:
                  "Time when microdeposits will expire and have to be re-sent.",
                format: "date-time",
              }),
              microdeposit_type: Schema.Literals([
                "amounts",
                "descriptor_code",
              ]).annotate({
                description:
                  "Microdeposit type can be amounts or descriptor_type.",
              }),
              sent: Schema.String.annotate({
                description: "Time when microdeposits were sent.",
                format: "date-time",
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
              "The microdeposit verification details if the status is awaiting verification.",
          }),
        ),
        status: Schema.Literals([
          "awaiting_verification",
          "unverified",
          "verification_failed",
          "verified",
        ]).annotate({ description: "The bank account verification status." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ description: "The bank account verification details." }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "US Bank Account",
  description:
    "Use the USBankAccounts API to create and manage US bank accounts objects that you can use to receive funds. Note that these are not interchangeable with v1 Tokens.",
  identifier: "Stripev2.core.vault.us_bank_account",
});
