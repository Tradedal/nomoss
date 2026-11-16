// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import { Stripeprice, Stripetax_id, Stripetax_rate } from "./catalog.js";
import {
  Stripeapplication,
  Stripecancellation_details,
  Stripeconnect_account_reference,
  Stripedeleted_application,
  Stripedeleted_price,
  Stripedeleted_tax_id,
  Stripediscount,
  Stripediscounts_resource_stackable_discount_with_discount_end,
  Stripeschedules_phase_automatic_tax,
  Stripesmor_resource_managed_payments,
  Stripestackable_discount_with_discount_settings,
  Stripestackable_discount_with_discount_settings_and_discount_end,
  Stripetest_helpers_test_clock,
} from "./common.js";
import { Stripecustomer, Stripedeleted_customer } from "./customers.js";
import {
  Stripeinvoice,
  Stripeinvoice_mandate_options_card,
  Stripeinvoice_payment_method_options_acss_debit,
  Stripeinvoice_payment_method_options_bancontact,
  Stripeinvoice_payment_method_options_customer_balance,
  Stripeinvoice_payment_method_options_konbini,
  Stripeinvoice_payment_method_options_payto,
  Stripeinvoice_payment_method_options_upi,
  Stripeinvoice_payment_method_options_us_bank_account,
  Stripeinvoice_setting_custom_field,
  Stripeinvoice_setting_subscription_schedule_phase_setting,
  Stripeinvoice_setting_subscription_schedule_setting,
} from "./invoices.js";
import { Stripepayment_method } from "./paymentMethods.js";
import { Stripebank_account, Stripecard } from "./paymentSources.js";
import { Stripesetup_intent } from "./setupIntents.js";
import { Stripesource } from "./sources.js";

export type Stripesubscription = {
  readonly application?:
    | string
    | Stripeapplication
    | Stripedeleted_application
    | null;
  readonly application_fee_percent?: number | null;
  readonly automatic_tax: Stripesubscription_automatic_tax;
  readonly billing_cycle_anchor: number;
  readonly billing_cycle_anchor_config?: Stripesubscriptions_resource_billing_cycle_anchor_config | null;
  readonly billing_mode: Stripesubscriptions_resource_billing_mode;
  readonly billing_schedules: ReadonlyArray<Stripesubscriptions_resource_billing_schedules>;
  readonly billing_thresholds?: Stripesubscription_billing_thresholds | null;
  readonly cancel_at?: number | null;
  readonly cancel_at_period_end: boolean;
  readonly canceled_at?: number | null;
  readonly cancellation_details?: Stripecancellation_details | null;
  readonly collection_method: "charge_automatically" | "send_invoice";
  readonly created: number;
  readonly currency: string;
  readonly customer: string | Stripecustomer | Stripedeleted_customer;
  readonly customer_account?: string | null;
  readonly days_until_due?: number | null;
  readonly default_payment_method?: string | Stripepayment_method | null;
  readonly default_source?:
    | string
    | Stripebank_account
    | Stripecard
    | Stripesource
    | null;
  readonly default_tax_rates?: ReadonlyArray<Stripetax_rate> | null;
  readonly description?: string | null;
  readonly discounts: ReadonlyArray<string | Stripediscount>;
  readonly ended_at?: number | null;
  readonly id: string;
  readonly invoice_settings: Stripesubscriptions_resource_subscription_invoice_settings;
  readonly items: {
    readonly data: ReadonlyArray<Stripesubscription_item>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly latest_invoice?: string | Stripeinvoice | null;
  readonly livemode: boolean;
  readonly managed_payments?: Stripesmor_resource_managed_payments | null;
  readonly metadata: { readonly [x: string]: string };
  readonly next_pending_invoice_item_invoice?: number | null;
  readonly object: "subscription";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly pause_collection?: Stripesubscriptions_resource_pause_collection | null;
  readonly payment_settings?: Stripesubscriptions_resource_payment_settings | null;
  readonly pending_invoice_item_interval?: Stripesubscription_pending_invoice_item_interval | null;
  readonly pending_setup_intent?: string | Stripesetup_intent | null;
  readonly pending_update?: Stripesubscriptions_resource_pending_update | null;
  readonly presentment_details?: Stripesubscriptions_resource_subscription_presentment_details;
  readonly schedule?: string | Stripesubscription_schedule | null;
  readonly start_date: number;
  readonly status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "paused"
    | "trialing"
    | "unpaid";
  readonly status_details?: Stripesubscriptions_resource_status_details_public;
  readonly test_clock?: string | Stripetest_helpers_test_clock | null;
  readonly transfer_data?: Stripesubscription_transfer_data | null;
  readonly trial_end?: number | null;
  readonly trial_settings?: Stripesubscriptions_resource_trial_settings_trial_settings | null;
  readonly trial_start?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedule = {
  readonly application?:
    | string
    | Stripeapplication
    | Stripedeleted_application
    | null;
  readonly billing_mode: Stripesubscriptions_resource_billing_mode;
  readonly canceled_at?: number | null;
  readonly completed_at?: number | null;
  readonly created: number;
  readonly current_phase?: Stripesubscription_schedule_current_phase | null;
  readonly customer: string | Stripecustomer | Stripedeleted_customer;
  readonly customer_account?: string | null;
  readonly default_settings: Stripesubscription_schedules_resource_default_settings;
  readonly end_behavior: "cancel" | "none" | "release" | "renew";
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "subscription_schedule";
  readonly pause_schedules: ReadonlyArray<Stripesubscription_schedules_resource_pause_schedule>;
  readonly phases: ReadonlyArray<Stripesubscription_schedule_phase_configuration>;
  readonly released_at?: number | null;
  readonly released_subscription?: string | null;
  readonly status:
    | "active"
    | "canceled"
    | "completed"
    | "not_started"
    | "released";
  readonly subscription?: string | Stripesubscription | null;
  readonly test_clock?: string | Stripetest_helpers_test_clock | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedule_phase_configuration = {
  readonly add_invoice_items: ReadonlyArray<Stripesubscription_schedule_add_invoice_item>;
  readonly application_fee_percent?: number | null;
  readonly automatic_tax?: Stripeschedules_phase_automatic_tax;
  readonly billing_cycle_anchor?: "automatic" | "phase_start" | null;
  readonly billing_thresholds?: Stripesubscription_billing_thresholds | null;
  readonly collection_method?: "charge_automatically" | "send_invoice" | null;
  readonly currency: string;
  readonly default_payment_method?: string | Stripepayment_method | null;
  readonly default_tax_rates?: ReadonlyArray<Stripetax_rate> | null;
  readonly description?: string | null;
  readonly discounts: ReadonlyArray<Stripestackable_discount_with_discount_settings_and_discount_end>;
  readonly end_date: number;
  readonly invoice_settings?: Stripeinvoice_setting_subscription_schedule_phase_setting | null;
  readonly items: ReadonlyArray<Stripesubscription_schedule_configuration_item>;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly proration_behavior: "always_invoice" | "create_prorations" | "none";
  readonly start_date: number;
  readonly transfer_data?: Stripesubscription_transfer_data | null;
  readonly trial?: boolean;
  readonly trial_end?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedule_configuration_item = {
  readonly billing_thresholds?: Stripesubscription_item_billing_thresholds | null;
  readonly discounts: ReadonlyArray<Stripestackable_discount_with_discount_settings>;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly price: string | Stripeprice | Stripedeleted_price;
  readonly quantity?: number;
  readonly tax_rates?: ReadonlyArray<Stripetax_rate> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_billing_cycle_anchor_config = {
  readonly day_of_month: number;
  readonly hour?: number | null;
  readonly minute?: number | null;
  readonly month?: number | null;
  readonly second?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_billing_mode_flexible = {
  readonly proration_discounts?: "included" | "itemized";
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_billing_schedules_applies_to = {
  readonly price?: string | Stripeprice | null;
  readonly type: "price";
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_billing_schedules_bill_until_duration =
  {
    readonly interval: "day" | "month" | "week" | "year";
    readonly interval_count?: number | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscription_billing_thresholds = {
  readonly amount_gte?: number | null;
  readonly reset_billing_cycle_anchor?: boolean | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_item_billing_thresholds = {
  readonly usage_gte?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_trials_resource_current_trial = {
  readonly end_date: number;
  readonly start_date: number;
  readonly trial_offer: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_pause_collection = {
  readonly behavior: "keep_as_draft" | "mark_uncollectible" | "void";
  readonly resumes_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_billie_company_details_registered_address =
  {
    readonly city?: string | null;
    readonly country?: string | null;
    readonly line1?: string | null;
    readonly line2?: string | null;
    readonly postal_code?: string | null;
    readonly state?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_mandate_options_blik = {
  readonly expires_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_mandate_options_pix = {
  readonly amount?: number | null;
  readonly amount_includes_iof?: "always" | "never" | null;
  readonly end_date?: string | null;
  readonly payment_schedule?:
    | "halfyearly"
    | "monthly"
    | "quarterly"
    | "weekly"
    | "yearly"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_sepa_debit = {
  readonly [x: string]: Schema.Json;
};
export type Stripesubscription_pending_invoice_item_interval = {
  readonly interval: "day" | "month" | "week" | "year";
  readonly interval_count: number;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_subscription_presentment_details = {
  readonly presentment_currency: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedule_current_phase = {
  readonly end_date: number;
  readonly start_date: number;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_transfer_data = {
  readonly amount_percent?: number | null;
  readonly destination: string | Stripeaccount;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule_outstanding_usage_through =
  { readonly type: "none" | "pause_at" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripesubscription_schedules_resource_pause_schedule_unused_time_from =
  { readonly type: "item_current_period_start" | "none" | "pause_at" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripesubscription_schedules_resource_pause_schedule_status_error =
  { readonly code?: string; readonly message: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripesubscription_schedules_resource_pause_schedule_resume_settings =
  {
    readonly billing_cycle_anchor: "resume_at" | "unchanged";
    readonly payment_behavior:
      | "resume_on_payment_attempt"
      | "resume_on_payment_success";
    readonly proration_behavior:
      | "always_invoice"
      | "create_prorations"
      | "none";
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_invoice_item_period_resource_period_end =
  {
    readonly timestamp?: number;
    readonly type: "min_item_period_end" | "phase_end" | "timestamp";
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_invoice_item_period_resource_period_start =
  {
    readonly timestamp?: number;
    readonly type: "max_item_period_start" | "phase_start" | "timestamp";
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_paused_status_details_subscription = {
  readonly type:
    | "final_payment_failure"
    | "first_payment_failure"
    | "pause_requested"
    | "system"
    | "trial_end_without_payment_method";
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_trial_settings_end_behavior = {
  readonly billing_cycle_anchor?: "now" | "unchanged" | null;
  readonly missing_payment_method: "cancel" | "create_invoice" | "pause";
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_trials_resource_end_behavior = {
  readonly missing_payment_method: "cancel" | "create_invoice" | "pause";
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_automatic_tax = {
  readonly disabled_reason?: "requires_location_inputs" | null;
  readonly enabled: boolean;
  readonly liability?: Stripeconnect_account_reference | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_default_settings_automatic_tax =
  {
    readonly disabled_reason?: "requires_location_inputs" | null;
    readonly enabled: boolean;
    readonly liability?: Stripeconnect_account_reference | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_billing_mode = {
  readonly flexible?: Stripesubscriptions_resource_billing_mode_flexible | null;
  readonly type: "classic" | "flexible";
  readonly updated_at?: number;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_billing_schedules_bill_until = {
  readonly computed_timestamp: number;
  readonly duration?: Stripesubscriptions_resource_billing_schedules_bill_until_duration | null;
  readonly timestamp?: number | null;
  readonly type: "duration" | "timestamp";
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_subscription_invoice_settings = {
  readonly account_tax_ids?: ReadonlyArray<
    string | Stripetax_id | Stripedeleted_tax_id
  > | null;
  readonly custom_fields?: ReadonlyArray<Stripeinvoice_setting_custom_field> | null;
  readonly description?: string | null;
  readonly footer?: string | null;
  readonly issuer: Stripeconnect_account_reference;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_billie_company_details = {
  readonly registered_address?: Stripesubscription_payment_method_options_billie_company_details_registered_address;
  readonly registered_name?: string | null;
  readonly registration_number?: string | null;
  readonly registration_type?:
    | "ch_ein"
    | "de_hrb"
    | "dk_cvr"
    | "es_cif"
    | "fi_tunnus"
    | "fr_siren"
    | "fr_siret"
    | "it_rea"
    | "nl_kvk"
    | "no_org_number"
    | "no_pno"
    | "se_org_number"
    | "se_pno"
    | "uk_crn";
  readonly vat?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_blik = {
  readonly mandate_options?: Stripesubscription_payment_method_options_mandate_options_blik;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_card = {
  readonly mandate_options?: Stripeinvoice_mandate_options_card;
  readonly network?:
    | "amex"
    | "cartes_bancaires"
    | "diners"
    | "discover"
    | "eftpos_au"
    | "girocard"
    | "interac"
    | "jcb"
    | "link"
    | "mastercard"
    | "unionpay"
    | "unknown"
    | "visa"
    | null;
  readonly request_three_d_secure?: "any" | "automatic" | "challenge" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_pix = {
  readonly expires_after_seconds?: number;
  readonly mandate_options?: Stripesubscription_payment_method_options_mandate_options_pix;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule_bill_for = {
  readonly outstanding_usage_through: Stripesubscription_schedules_resource_pause_schedule_outstanding_usage_through;
  readonly unused_time_from: Stripesubscription_schedules_resource_pause_schedule_unused_time_from;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule_pause_status =
  {
    readonly error?: Stripesubscription_schedules_resource_pause_schedule_status_error;
    readonly type: "error" | "scheduled" | "succeeded";
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule_resume_status =
  {
    readonly error?: Stripesubscription_schedules_resource_pause_schedule_status_error;
    readonly type:
      | "error"
      | "pending"
      | "requires_action"
      | "scheduled"
      | "succeeded";
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedule_add_invoice_item_period = {
  readonly end: Stripesubscription_schedules_resource_invoice_item_period_resource_period_end;
  readonly start: Stripesubscription_schedules_resource_invoice_item_period_resource_period_start;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_paused_status_details_public = {
  readonly subscription: Stripesubscriptions_resource_paused_status_details_subscription;
  readonly transitioned_at: number;
  readonly type: "subscription";
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_trial_settings_trial_settings = {
  readonly end_behavior: Stripesubscriptions_resource_trial_settings_end_behavior;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_trials_resource_trial_settings = {
  readonly end_behavior: Stripesubscriptions_trials_resource_end_behavior;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_billing_schedules = {
  readonly applies_to?: ReadonlyArray<Stripesubscriptions_resource_billing_schedules_applies_to> | null;
  readonly bill_until: Stripesubscriptions_resource_billing_schedules_bill_until;
  readonly key: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_item = {
  readonly billed_until?: number;
  readonly billing_thresholds?: Stripesubscription_item_billing_thresholds | null;
  readonly created: number;
  readonly current_period_end: number;
  readonly current_period_start: number;
  readonly current_trial?: Stripesubscriptions_trials_resource_current_trial | null;
  readonly discounts: ReadonlyArray<string | Stripediscount>;
  readonly id: string;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "subscription_item";
  readonly price: Stripeprice;
  readonly quantity?: number;
  readonly subscription: string;
  readonly tax_rates?: ReadonlyArray<Stripetax_rate> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_default_settings = {
  readonly application_fee_percent?: number | null;
  readonly automatic_tax?: Stripesubscription_schedules_resource_default_settings_automatic_tax;
  readonly billing_cycle_anchor: "automatic" | "phase_start";
  readonly billing_thresholds?: Stripesubscription_billing_thresholds | null;
  readonly collection_method?: "charge_automatically" | "send_invoice" | null;
  readonly default_payment_method?: string | Stripepayment_method | null;
  readonly description?: string | null;
  readonly invoice_settings: Stripeinvoice_setting_subscription_schedule_setting;
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly transfer_data?: Stripesubscription_transfer_data | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_payment_method_options_billie = {
  readonly company_details?: Stripesubscription_payment_method_options_billie_company_details;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule_pause_settings =
  {
    readonly bill_for: Stripesubscription_schedules_resource_pause_schedule_bill_for;
    readonly invoicing_behavior: "invoice" | "pending_invoice_item";
    readonly type: "subscription";
  } & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule_resume = {
  readonly resume_at: number;
  readonly settings: Stripesubscription_schedules_resource_pause_schedule_resume_settings;
  readonly status: Stripesubscription_schedules_resource_pause_schedule_resume_status;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_status_details_public = {
  readonly paused: Stripesubscriptions_resource_paused_status_details_public;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedule_add_invoice_item = {
  readonly discountable?: boolean | null;
  readonly discounts: ReadonlyArray<Stripediscounts_resource_stackable_discount_with_discount_end>;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly period: Stripesubscription_schedule_add_invoice_item_period;
  readonly price: string | Stripeprice | Stripedeleted_price;
  readonly quantity?: number | null;
  readonly tax_rates?: ReadonlyArray<Stripetax_rate> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_pending_update = {
  readonly billing_cycle_anchor?: number | null;
  readonly cancel_at_period_end?: boolean | null;
  readonly discount?: Stripediscount | null;
  readonly discounts?: ReadonlyArray<string | Stripediscount> | null;
  readonly expires_at: number;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly subscription_items?: ReadonlyArray<Stripesubscription_item> | null;
  readonly trial_end?: number | null;
  readonly trial_from_plan?: boolean | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_payment_method_options = {
  readonly acss_debit?: Stripeinvoice_payment_method_options_acss_debit | null;
  readonly bancontact?: Stripeinvoice_payment_method_options_bancontact | null;
  readonly billie?: Stripesubscription_payment_method_options_billie | null;
  readonly blik?: Stripesubscription_payment_method_options_blik | null;
  readonly card?: Stripesubscription_payment_method_options_card | null;
  readonly customer_balance?: Stripeinvoice_payment_method_options_customer_balance | null;
  readonly konbini?: Stripeinvoice_payment_method_options_konbini | null;
  readonly payto?: Stripeinvoice_payment_method_options_payto | null;
  readonly pix?: Stripesubscription_payment_method_options_pix | null;
  readonly sepa_debit?: Stripesubscription_payment_method_options_sepa_debit | null;
  readonly upi?: Stripeinvoice_payment_method_options_upi | null;
  readonly us_bank_account?: Stripeinvoice_payment_method_options_us_bank_account | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule_pause = {
  readonly pause_at: number;
  readonly settings?: Stripesubscription_schedules_resource_pause_schedule_pause_settings | null;
  readonly status: Stripesubscription_schedules_resource_pause_schedule_pause_status;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscriptions_resource_payment_settings = {
  readonly payment_method_options?: Stripesubscriptions_resource_payment_method_options | null;
  readonly payment_method_types?: ReadonlyArray<
    | "ach_credit_transfer"
    | "ach_debit"
    | "acss_debit"
    | "affirm"
    | "alipay"
    | "amazon_pay"
    | "au_becs_debit"
    | "bacs_debit"
    | "bancontact"
    | "billie"
    | "blik"
    | "boleto"
    | "card"
    | "cashapp"
    | "crypto"
    | "custom"
    | "customer_balance"
    | "eps"
    | "fpx"
    | "giropay"
    | "grabpay"
    | "ideal"
    | "jp_credit_transfer"
    | "kakao_pay"
    | "klarna"
    | "konbini"
    | "kr_card"
    | "link"
    | "mb_way"
    | "multibanco"
    | "naver_pay"
    | "nz_bank_account"
    | "p24"
    | "pay_by_bank"
    | "payco"
    | "paynow"
    | "paypal"
    | "payto"
    | "pix"
    | "promptpay"
    | "revolut_pay"
    | "satispay"
    | "sepa_credit_transfer"
    | "sepa_debit"
    | "sequra"
    | "sofort"
    | "swish"
    | "twint"
    | "upi"
    | "us_bank_account"
    | "wechat_pay"
  > | null;
  readonly save_default_payment_method?: "off" | "on_subscription" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesubscription_schedules_resource_pause_schedule = {
  readonly key: string;
  readonly pause: Stripesubscription_schedules_resource_pause_schedule_pause;
  readonly resume?: Stripesubscription_schedules_resource_pause_schedule_resume | null;
} & { readonly [x: string]: Schema.Json };

export const Stripesubscription = Schema.suspend(
  (): Schema.Codec<Stripesubscription> =>
    Schema.StructWithRest(
      Schema.Struct({
        application: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeapplication,
              Stripedeleted_application,
            ]).annotate({
              description:
                "ID of the Connect Application that created the subscription.",
            }),
            Schema.Null,
          ]),
        ),
        application_fee_percent: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        automatic_tax: Stripesubscription_automatic_tax,
        billing_cycle_anchor: Schema.Number.annotate({
          description:
            "The reference point that aligns future [billing cycle](https://docs.stripe.com/subscriptions/billing-cycle) dates. It sets the day of week for `week` intervals, the day of month for `month` and `year` intervals, and the month of year for `year` intervals. The timestamp is in UTC format.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        billing_cycle_anchor_config: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_resource_billing_cycle_anchor_config,
            ]).annotate({
              description:
                "The fixed values used to calculate the `billing_cycle_anchor`.",
            }),
            Schema.Null,
          ]),
        ),
        billing_mode: Stripesubscriptions_resource_billing_mode,
        billing_schedules: Schema.Array(
          Stripesubscriptions_resource_billing_schedules,
        ).annotate({ description: "Billing schedules for this subscription." }),
        billing_thresholds: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesubscription_billing_thresholds]).annotate({
              description:
                "Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period",
            }),
            Schema.Null,
          ]),
        ),
        cancel_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A date in the future at which the subscription will automatically get canceled",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        cancel_at_period_end: Schema.Boolean.annotate({
          description:
            "Whether this subscription will (if `status=active`) or did (if `status=canceled`) cancel at the end of the current billing period.",
        }),
        canceled_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will reflect the time of the most recent update request, not the end of the subscription period when the subscription is automatically moved to a canceled state.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        cancellation_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecancellation_details]).annotate({
              description: "Details about why this subscription was cancelled",
            }),
            Schema.Null,
          ]),
        ),
        collection_method: Schema.Literals([
          "charge_automatically",
          "send_invoice",
        ]).annotate({
          description:
            "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this subscription at the end of the cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`.",
        }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
          Stripedeleted_customer,
        ]).annotate({
          description: "ID of the customer who owns the subscription.",
        }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the account representing the customer who owns the subscription.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        days_until_due: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Number of days a customer has to pay invoices generated by this subscription. This value will be `null` for subscriptions where `collection_method=charge_automatically`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        default_payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepayment_method> => Stripepayment_method,
              ),
            ]).annotate({
              description:
                "ID of the default payment method for the subscription. It must belong to the customer associated with the subscription. This takes precedence over `default_source`. If neither are set, invoices will use the customer's [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).",
            }),
            Schema.Null,
          ]),
        ),
        default_source: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebank_account> => Stripebank_account,
              ),
              Schema.suspend((): Schema.Codec<Stripecard> => Stripecard),
              Stripesource,
            ]).annotate({
              description:
                "ID of the default payment source for the subscription. It must belong to the customer associated with the subscription and be in a chargeable state. If `default_payment_method` is also set, `default_payment_method` will take precedence. If neither are set, invoices will use the customer's [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method) or [default_source](https://docs.stripe.com/api/customers/object#customer_object-default_source).",
            }),
            Schema.Null,
          ]),
        ),
        default_tax_rates: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripetax_rate).annotate({
              description:
                "The tax rates that will apply to any subscription item that does not have `tax_rates` set. Invoices created will have their `default_tax_rates` populated from the subscription.",
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The subscription's description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in Stripe surfaces and certain local payment methods UIs.",
            }).check(
              Schema.isMaxCodePoints(500).annotate({
                expected: "a string with at most 500 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discounts: Schema.Array(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripediscount> => Stripediscount),
          ]),
        ).annotate({
          description:
            "The discounts applied to the subscription. Subscription item discounts are applied before subscription discounts. Use `expand[]=discounts` to expand each discount.",
        }),
        ended_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If the subscription has ended, the date the subscription ended.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        invoice_settings:
          Stripesubscriptions_resource_subscription_invoice_settings,
        items: Schema.StructWithRest(
          Schema.Struct({
            data: Schema.Array(Stripesubscription_item).annotate({
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
        ).annotate({
          title: "SubscriptionItemList",
          description:
            "List of subscription items, each with an attached price.",
        }),
        latest_invoice: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
            ]).annotate({
              description:
                "The most recent invoice this subscription has generated over its lifecycle (for example, when it cycles or is updated).",
            }),
            Schema.Null,
          ]),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        managed_payments: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesmor_resource_managed_payments]).annotate({
              description:
                "Settings for Managed Payments for this Subscription and resulting [Invoices](/api/invoices/object) and [PaymentIntents](/api/payment_intents/object).",
            }),
            Schema.Null,
          ]),
        ),
        metadata: Schema.Record(
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
        next_pending_invoice_item_invoice: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Specifies the approximate timestamp on which any pending invoice items will be billed according to the schedule provided at `pending_invoice_item_interval`.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("subscription").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        on_behalf_of: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
            ]).annotate({
              description:
                "The account (if any) the charge was made on behalf of for charges associated with this subscription. See the [Connect documentation](https://docs.stripe.com/connect/subscriptions#on-behalf-of) for details.",
            }),
            Schema.Null,
          ]),
        ),
        pause_collection: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_resource_pause_collection,
            ]).annotate({
              description:
                "If specified, payment collection for this subscription will be paused. Note that the subscription status will be unchanged and will not be updated to `paused`. Learn more about [pausing collection](https://docs.stripe.com/billing/subscriptions/pause-payment).",
            }),
            Schema.Null,
          ]),
        ),
        payment_settings: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_resource_payment_settings,
            ]).annotate({
              description:
                "Payment settings passed on to invoices created by the subscription.",
            }),
            Schema.Null,
          ]),
        ),
        pending_invoice_item_interval: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscription_pending_invoice_item_interval,
            ]).annotate({
              description:
                "Specifies an interval for how often to bill for any pending invoice items. It is analogous to calling [Create an invoice](/api/invoices/create) for the given subscription at the specified interval.",
            }),
            Schema.Null,
          ]),
        ),
        pending_setup_intent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripesetup_intent> => Stripesetup_intent,
              ),
            ]).annotate({
              description:
                "You can use this [SetupIntent](https://docs.stripe.com/api/setup_intents) to collect user authentication when creating a subscription without immediate payment or updating a subscription's payment method, allowing you to optimize for off-session payments. Learn more in the [SCA Migration Guide](https://docs.stripe.com/billing/migration/strong-customer-authentication#scenario-2).",
            }),
            Schema.Null,
          ]),
        ),
        pending_update: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_resource_pending_update,
            ]).annotate({
              description:
                "If specified, [pending updates](https://docs.stripe.com/billing/subscriptions/pending-updates) that will be applied to the subscription once the `latest_invoice` has been paid.",
            }),
            Schema.Null,
          ]),
        ),
        presentment_details: Schema.optionalKey(
          Stripesubscriptions_resource_subscription_presentment_details,
        ),
        schedule: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripesubscription_schedule> =>
                  Stripesubscription_schedule,
              ),
            ]).annotate({
              description: "The schedule attached to the subscription",
            }),
            Schema.Null,
          ]),
        ),
        start_date: Schema.Number.annotate({
          description:
            "Date when the subscription was first created. The date might differ from the `created` date due to backdating.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        status: Schema.Literals([
          "active",
          "canceled",
          "incomplete",
          "incomplete_expired",
          "past_due",
          "paused",
          "trialing",
          "unpaid",
        ]).annotate({
          description:
            "Possible values are `incomplete`, `incomplete_expired`, `trialing`, `active`, `past_due`, `canceled`, `unpaid`, or `paused`. \n\nFor `collection_method=charge_automatically` a subscription moves into `incomplete` if the initial payment attempt fails. A subscription in this status can only have metadata and default_source updated. Once the first invoice is paid, the subscription moves into an `active` status. If the first invoice is not paid within 23 hours, the subscription transitions to `incomplete_expired`. This is a terminal status, the open invoice will be voided and no further invoices will be generated. \n\nA subscription that is currently in a trial period is `trialing` and moves to `active` when the trial period is over. \n\nA subscription can enter a `paused` status in several ways, including [when a trial ends without a payment method](https://docs.stripe.com/billing/subscriptions/trials/free-trials#create-free-trials-without-payment) or when you pause it using the [pause endpoint](https://docs.stripe.com/api/subscriptions/pause). A `paused` subscription doesn't advance to a new billing period or generate invoices until it resumes. The `paused` status is different from [pausing collection](https://docs.stripe.com/billing/subscriptions/pause-payment), which still generates invoices and leaves the subscription's status unchanged. \n\nIf subscription `collection_method=charge_automatically`, it becomes `past_due` when payment is required but cannot be paid (due to failed payment or awaiting additional user actions). Once Stripe has exhausted all payment retry attempts, the subscription will become `canceled` or `unpaid` (depending on your subscriptions settings). \n\nIf subscription `collection_method=send_invoice` it becomes `past_due` when its invoice is not paid by the due date, and `canceled` or `unpaid` if it is still not paid by an additional deadline after that. Note that when a subscription has a status of `unpaid`, no subsequent invoices will be attempted (invoices will be created, but then immediately automatically closed). After receiving updated payment information from a customer, you may choose to reopen and pay their closed invoices.",
        }),
        status_details: Schema.optionalKey(
          Stripesubscriptions_resource_status_details_public,
        ),
        test_clock: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetest_helpers_test_clock,
            ]).annotate({
              description: "ID of the test clock this subscription belongs to.",
            }),
            Schema.Null,
          ]),
        ),
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesubscription_transfer_data]).annotate({
              description:
                "The account (if any) the subscription's payments will be attributed to for tax reporting, and where funds from each payment will be transferred to for each of the subscription's invoices.",
            }),
            Schema.Null,
          ]),
        ),
        trial_end: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If the subscription has a trial, the end of that trial.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        trial_settings: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_resource_trial_settings_trial_settings,
            ]).annotate({
              description: "Settings related to subscription trials.",
            }),
            Schema.Null,
          ]),
        ),
        trial_start: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If the subscription has a trial, the beginning of that trial.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
      title: "Subscription",
      description:
        "Subscriptions allow you to charge a customer on a recurring basis.\n\nRelated guide: [Creating subscriptions](https://docs.stripe.com/billing/subscriptions/creating)",
      identifier: "Stripesubscription",
    }),
);
export const Stripesubscription_schedule = Schema.suspend(
  (): Schema.Codec<Stripesubscription_schedule> =>
    Schema.StructWithRest(
      Schema.Struct({
        application: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeapplication,
              Stripedeleted_application,
            ]).annotate({
              description:
                "ID of the Connect Application that created the schedule.",
            }),
            Schema.Null,
          ]),
        ),
        billing_mode: Stripesubscriptions_resource_billing_mode,
        canceled_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the subscription schedule was canceled. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        completed_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the subscription schedule was completed. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        current_phase: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesubscription_schedule_current_phase]).annotate({
              description:
                "Object representing the start and end dates for the current phase of the subscription schedule, if it is `active`.",
            }),
            Schema.Null,
          ]),
        ),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
          Stripedeleted_customer,
        ]).annotate({
          description: "ID of the customer who owns the subscription schedule.",
        }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the account who owns the subscription schedule.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        default_settings:
          Stripesubscription_schedules_resource_default_settings,
        end_behavior: Schema.Literals([
          "cancel",
          "none",
          "release",
          "renew",
        ]).annotate({
          description:
            "Behavior of the subscription schedule and underlying subscription when it ends. Possible values are `release` or `cancel` with the default being `release`. `release` will end the subscription schedule and keep the underlying subscription running. `cancel` will end the subscription schedule and cancel the underlying subscription.",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
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
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("subscription_schedule").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        pause_schedules: Schema.Array(
          Stripesubscription_schedules_resource_pause_schedule,
        ).annotate({
          description: "The pause schedules for this subscription schedule.",
        }),
        phases: Schema.Array(
          Schema.suspend(
            (): Schema.Codec<Stripesubscription_schedule_phase_configuration> =>
              Stripesubscription_schedule_phase_configuration,
          ),
        ).annotate({
          description: "Configuration for the subscription schedule's phases.",
        }),
        released_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Time at which the subscription schedule was released. Measured in seconds since the Unix epoch.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        released_subscription: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the subscription once managed by the subscription schedule (if it is released).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals([
          "active",
          "canceled",
          "completed",
          "not_started",
          "released",
        ]).annotate({
          description:
            "The present status of the subscription schedule. Possible values are `not_started`, `active`, `completed`, `released`, and `canceled`. You can read more about the different states in our [behavior guide](https://docs.stripe.com/billing/subscriptions/subscription-schedules).",
        }),
        subscription: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripesubscription> => Stripesubscription,
              ),
            ]).annotate({
              description:
                "ID of the subscription managed by the subscription schedule.",
            }),
            Schema.Null,
          ]),
        ),
        test_clock: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetest_helpers_test_clock,
            ]).annotate({
              description:
                "ID of the test clock this subscription schedule belongs to.",
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
      title: "Subscription Schedule",
      description:
        "A subscription schedule allows you to create and manage the lifecycle of a subscription by predefining expected changes.\n\nRelated guide: [Subscription schedules](https://docs.stripe.com/billing/subscriptions/subscription-schedules)",
      identifier: "Stripesubscription_schedule",
    }),
);
export const Stripesubscription_schedule_phase_configuration = Schema.suspend(
  (): Schema.Codec<Stripesubscription_schedule_phase_configuration> =>
    Schema.StructWithRest(
      Schema.Struct({
        add_invoice_items: Schema.Array(
          Stripesubscription_schedule_add_invoice_item,
        ).annotate({
          description:
            "A list of prices and quantities that will generate invoice items appended to the next invoice for this phase.",
        }),
        application_fee_percent: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account during this phase of the schedule.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        automatic_tax: Schema.optionalKey(Stripeschedules_phase_automatic_tax),
        billing_cycle_anchor: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["automatic", "phase_start"]).annotate({
              description:
                "Possible values are `phase_start` or `automatic`. If `phase_start` then billing cycle anchor of the subscription is set to the start of the phase when entering the phase. If `automatic` then the billing cycle anchor is automatically modified as needed when entering the phase. For more information, see the billing cycle [documentation](https://docs.stripe.com/billing/subscriptions/billing-cycle).",
            }),
            Schema.Null,
          ]),
        ),
        billing_thresholds: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesubscription_billing_thresholds]).annotate({
              description:
                "Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period",
            }),
            Schema.Null,
          ]),
        ),
        collection_method: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
              description:
                "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay the underlying subscription at the end of each billing cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`.",
            }),
            Schema.Null,
          ]),
        ),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        default_payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepayment_method> => Stripepayment_method,
              ),
            ]).annotate({
              description:
                "ID of the default payment method for the subscription schedule. It must belong to the customer associated with the subscription schedule. If not set, invoices will use the default payment method in the customer's invoice settings.",
            }),
            Schema.Null,
          ]),
        ),
        default_tax_rates: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripetax_rate).annotate({
              description:
                "The default tax rates to apply to the subscription during this phase of the subscription schedule.",
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Subscription description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in Stripe surfaces and certain local payment methods UIs.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        discounts: Schema.Array(
          Stripestackable_discount_with_discount_settings_and_discount_end,
        ).annotate({
          description:
            "The stackable discounts that will be applied to the subscription on this phase. Subscription item discounts are applied before subscription discounts.",
        }),
        end_date: Schema.Number.annotate({
          description: "The end of this phase of the subscription schedule.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        invoice_settings: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeinvoice_setting_subscription_schedule_phase_setting,
            ]).annotate({
              description: "The invoice settings applicable during this phase.",
            }),
            Schema.Null,
          ]),
        ),
        items: Schema.Array(
          Schema.suspend(
            (): Schema.Codec<Stripesubscription_schedule_configuration_item> =>
              Stripesubscription_schedule_configuration_item,
          ),
        ).annotate({
          description:
            "Subscription items to configure the subscription to during this phase of the subscription schedule.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to a phase. Metadata on a schedule's phase will update the underlying subscription's `metadata` when the phase is entered. Updating the underlying subscription's `metadata` directly will not affect the current phase's `metadata`.",
            }),
            Schema.Null,
          ]),
        ),
        on_behalf_of: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
            ]).annotate({
              description:
                "The account (if any) the charge was made on behalf of for charges associated with the schedule's subscription. See the Connect documentation for details.",
            }),
            Schema.Null,
          ]),
        ),
        proration_behavior: Schema.Literals([
          "always_invoice",
          "create_prorations",
          "none",
        ]).annotate({
          description:
            "When transitioning phases, controls how prorations are handled (if any). Possible values are `create_prorations`, `none`, and `always_invoice`.",
        }),
        start_date: Schema.Number.annotate({
          description: "The start of this phase of the subscription schedule.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesubscription_transfer_data]).annotate({
              description:
                "The account (if any) the associated subscription's payments will be attributed to for tax reporting, and where funds from each payment will be transferred to for each of the subscription's invoices.",
            }),
            Schema.Null,
          ]),
        ),
        trial: Schema.optionalKey(
          Schema.Boolean.annotate({
            description:
              "If set to true the entire phase is counted as a trial and the customer will not be charged for any fees.",
          }),
        ),
        trial_end: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "When the trial ends within the phase.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
      title: "Phase",
      description:
        "A phase describes the plans, coupon, and trialing status of a subscription for a predefined time period.",
      identifier: "Stripesubscription_schedule_phase_configuration",
    }),
);
export const Stripesubscription_schedule_configuration_item = Schema.suspend(
  (): Schema.Codec<Stripesubscription_schedule_configuration_item> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing_thresholds: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesubscription_item_billing_thresholds]).annotate(
              {
                description:
                  "Define thresholds at which an invoice will be sent, and the related subscription advanced to a new billing period",
              },
            ),
            Schema.Null,
          ]),
        ),
        discounts: Schema.Array(
          Schema.suspend(
            (): Schema.Codec<Stripestackable_discount_with_discount_settings> =>
              Stripestackable_discount_with_discount_settings,
          ),
        ).annotate({
          description:
            "The discounts applied to the subscription item. Subscription item discounts are applied before subscription discounts. Use `expand[]=discounts` to expand each discount.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an item. Metadata on this item will update the underlying subscription item's `metadata` when the phase is entered.",
            }),
            Schema.Null,
          ]),
        ),
        price: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripeprice> => Stripeprice),
          Stripedeleted_price,
        ]).annotate({
          description:
            "ID of the price to which the customer should be subscribed.",
        }),
        quantity: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "Quantity of the plan to which the customer should be subscribed.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        tax_rates: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripetax_rate).annotate({
              description:
                "The tax rates which apply to this `phase_item`. When set, the `default_tax_rates` on the phase do not apply to this `phase_item`.",
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
      title: "Phase Item",
      description: "A phase item describes the price and quantity of a phase.",
      identifier: "Stripesubscription_schedule_configuration_item",
    }),
);
export const Stripesubscriptions_resource_billing_cycle_anchor_config =
  Schema.StructWithRest(
    Schema.Struct({
      day_of_month: Schema.Number.annotate({
        description: "The day of the month of the billing_cycle_anchor.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      hour: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The hour of the day of the billing_cycle_anchor.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minute: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The minute of the hour of the billing_cycle_anchor.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      month: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The month to start full cycle billing periods.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      second: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The second of the minute of the billing_cycle_anchor.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    title: "SubscriptionsResourceBillingCycleAnchorConfig",
    description: "",
    identifier: "Stripesubscriptions_resource_billing_cycle_anchor_config",
  });
export const Stripesubscriptions_resource_billing_mode_flexible =
  Schema.StructWithRest(
    Schema.Struct({
      proration_discounts: Schema.optionalKey(
        Schema.Literals(["included", "itemized"]).annotate({
          description:
            "Controls how invoices and invoice items display proration amounts and discount amounts.",
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
    title: "SubscriptionsResourceBillingModeFlexible",
    description: "",
    identifier: "Stripesubscriptions_resource_billing_mode_flexible",
  });
export const Stripesubscriptions_resource_billing_schedules_applies_to =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_resource_billing_schedules_applies_to> =>
      Schema.StructWithRest(
        Schema.Struct({
          price: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripeprice,
              ]).annotate({
                description:
                  "The billing schedule will apply to the subscription item with the given price ID.",
              }),
              Schema.Null,
            ]),
          ),
          type: Schema.Literal("price").annotate({
            description:
              "Controls which subscription items the billing schedule applies to.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Billing Schedule Applies To",
        description:
          "Represents the entities that the billing schedule applies to.",
        identifier: "Stripesubscriptions_resource_billing_schedules_applies_to",
      }),
  );
export const Stripesubscriptions_resource_billing_schedules_bill_until_duration =
  Schema.StructWithRest(
    Schema.Struct({
      interval: Schema.Literals(["day", "month", "week", "year"]).annotate({
        description:
          "Specifies billing duration. Either `day`, `week`, `month` or `year`.",
      }),
      interval_count: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The multiplier applied to the interval.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    title: "Billing Schedule Configs Bill Until Duration",
    description:
      "Configures the `bill_until` date based on the provided `interval` and `interval_count`.",
    identifier:
      "Stripesubscriptions_resource_billing_schedules_bill_until_duration",
  });
export const Stripesubscription_billing_thresholds = Schema.StructWithRest(
  Schema.Struct({
    amount_gte: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Monetary threshold that triggers the subscription to create an invoice",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    reset_billing_cycle_anchor: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "Indicates if the `billing_cycle_anchor` should be reset when a threshold is reached. If true, `billing_cycle_anchor` will be updated to the date/time the threshold was last reached; otherwise, the value will remain unchanged. This value may not be `true` if the subscription contains items with plans that have `aggregate_usage=last_ever`.",
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
  title: "SubscriptionBillingThresholds",
  description: "",
  identifier: "Stripesubscription_billing_thresholds",
});
export const Stripesubscription_item_billing_thresholds = Schema.StructWithRest(
  Schema.Struct({
    usage_gte: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "Usage threshold that triggers the subscription to create an invoice",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
  title: "SubscriptionItemBillingThresholds",
  description: "",
  identifier: "Stripesubscription_item_billing_thresholds",
});
export const Stripesubscriptions_trials_resource_current_trial =
  Schema.StructWithRest(
    Schema.Struct({
      end_date: Schema.Number.annotate({
        description: "The time the current trial ends.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      start_date: Schema.Number.annotate({
        description: "The time the current trial started.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      trial_offer: Schema.String.annotate({
        description: "The Trial Offer ID applied to the subscription item.",
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
    title: "Current Trial",
    description: "The current trial attached to the subscription item.",
    identifier: "Stripesubscriptions_trials_resource_current_trial",
  });
export const Stripesubscriptions_resource_pause_collection =
  Schema.StructWithRest(
    Schema.Struct({
      behavior: Schema.Literals([
        "keep_as_draft",
        "mark_uncollectible",
        "void",
      ]).annotate({
        description:
          "The payment collection behavior for this subscription while paused.",
      }),
      resumes_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The time after which the subscription will resume collecting payments.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    title: "Pause Collection",
    description:
      "The Pause Collection settings determine how we will pause collection for this subscription and for how long the subscription\nshould be paused.",
    identifier: "Stripesubscriptions_resource_pause_collection",
  });
export const Stripesubscription_payment_method_options_billie_company_details_registered_address =
  Schema.StructWithRest(
    Schema.Struct({
      city: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "City, district, suburb, town, or village.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      country: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Two-letter country code.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      line1: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Address line 1 (for example, street, PO Box, or company name).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      line2: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Address line 2 (for example, apartment, suite, unit, or building).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      postal_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "ZIP or postal code." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      state: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "State, county, province, or region.",
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
    title:
      "subscription_payment_method_options_billie_company_details_registered_address",
    description: "",
    identifier:
      "Stripesubscription_payment_method_options_billie_company_details_registered_address",
  });
export const Stripesubscription_payment_method_options_mandate_options_blik =
  Schema.StructWithRest(
    Schema.Struct({
      expires_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Date when the mandate expires and no further payments will be charged. If not provided, the mandate will be set to be indefinite.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    title: "subscription_payment_method_options_mandate_options_blik",
    description: "",
    identifier:
      "Stripesubscription_payment_method_options_mandate_options_blik",
  });
export const Stripesubscription_payment_method_options_mandate_options_pix =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Amount to be charged for future payments.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      amount_includes_iof: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["always", "never"]).annotate({
            description: "Determines if the amount includes the IOF tax.",
          }),
          Schema.Null,
        ]),
      ),
      end_date: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Date when the mandate expires and no further payments will be charged, in `YYYY-MM-DD`.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      payment_schedule: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "halfyearly",
            "monthly",
            "quarterly",
            "weekly",
            "yearly",
          ]).annotate({
            description:
              "Schedule at which the future payments will be charged.",
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
    title: "subscription_payment_method_options_mandate_options_pix",
    description: "",
    identifier: "Stripesubscription_payment_method_options_mandate_options_pix",
  });
export const Stripesubscription_payment_method_options_sepa_debit =
  Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    title: "subscription_payment_method_options_sepa_debit",
    description: "",
    identifier: "Stripesubscription_payment_method_options_sepa_debit",
  });
export const Stripesubscription_pending_invoice_item_interval =
  Schema.StructWithRest(
    Schema.Struct({
      interval: Schema.Literals(["day", "month", "week", "year"]).annotate({
        description:
          "Specifies invoicing frequency. Either `day`, `week`, `month` or `year`.",
      }),
      interval_count: Schema.Number.annotate({
        description:
          "The number of intervals between invoices. For example, `interval=month` and `interval_count=3` bills every 3 months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "SubscriptionPendingInvoiceItemInterval",
    description: "",
    identifier: "Stripesubscription_pending_invoice_item_interval",
  });
export const Stripesubscriptions_resource_subscription_presentment_details =
  Schema.StructWithRest(
    Schema.Struct({
      presentment_currency: Schema.String.annotate({
        description: "Currency used for customer payments.",
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
    title: "SubscriptionsResourceSubscriptionPresentmentDetails",
    description: "",
    identifier: "Stripesubscriptions_resource_subscription_presentment_details",
  });
export const Stripesubscription_schedule_current_phase = Schema.StructWithRest(
  Schema.Struct({
    end_date: Schema.Number.annotate({
      description: "The end of this phase of the subscription schedule.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    start_date: Schema.Number.annotate({
      description: "The start of this phase of the subscription schedule.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "SubscriptionScheduleCurrentPhase",
  description: "",
  identifier: "Stripesubscription_schedule_current_phase",
});
export const Stripesubscription_transfer_data = Schema.StructWithRest(
  Schema.Struct({
    amount_percent: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the destination account. By default, the entire amount is transferred to the destination.",
        }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
    destination: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
    ]).annotate({
      description:
        "The account where funds from the payment will be transferred to upon payment success.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "SubscriptionTransferData",
  description: "",
  identifier: "Stripesubscription_transfer_data",
});
export const Stripesubscription_schedules_resource_pause_schedule_outstanding_usage_through =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals(["none", "pause_at"]).annotate({
        description: "The type of outstanding usage billing behavior.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "SubscriptionSchedulesResourcePauseScheduleOutstandingUsageThrough",
    description: "",
    identifier:
      "Stripesubscription_schedules_resource_pause_schedule_outstanding_usage_through",
  });
export const Stripesubscription_schedules_resource_pause_schedule_unused_time_from =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals([
        "item_current_period_start",
        "none",
        "pause_at",
      ]).annotate({ description: "The type of unused time credit behavior." }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "SubscriptionSchedulesResourcePauseScheduleUnusedTimeFrom",
    description: "",
    identifier:
      "Stripesubscription_schedules_resource_pause_schedule_unused_time_from",
  });
export const Stripesubscription_schedules_resource_pause_schedule_status_error =
  Schema.StructWithRest(
    Schema.Struct({
      code: Schema.optionalKey(
        Schema.String.annotate({
          description: "A machine-readable error code.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      message: Schema.String.annotate({
        description: "A description of the error.",
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
    title: "SubscriptionSchedulesResourcePauseScheduleStatusError",
    description: "",
    identifier:
      "Stripesubscription_schedules_resource_pause_schedule_status_error",
  });
export const Stripesubscription_schedules_resource_pause_schedule_resume_settings =
  Schema.StructWithRest(
    Schema.Struct({
      billing_cycle_anchor: Schema.Literals([
        "resume_at",
        "unchanged",
      ]).annotate({
        description:
          "The billing cycle anchor that applies when the subscription is resumed.",
      }),
      payment_behavior: Schema.Literals([
        "resume_on_payment_attempt",
        "resume_on_payment_success",
      ]).annotate({
        description:
          "Controls whether Stripe attempts payment on the resumption invoice and how that affects the subscription's status.",
      }),
      proration_behavior: Schema.Literals([
        "always_invoice",
        "create_prorations",
        "none",
      ]).annotate({
        description:
          "Determines how to handle prorations resulting from the billing_cycle_anchor change on resume.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "SubscriptionSchedulesResourcePauseScheduleResumeSettings",
    description: "",
    identifier:
      "Stripesubscription_schedules_resource_pause_schedule_resume_settings",
  });
export const Stripesubscription_schedules_resource_invoice_item_period_resource_period_end =
  Schema.StructWithRest(
    Schema.Struct({
      timestamp: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "A precise Unix timestamp for the end of the invoice item period. Must be greater than or equal to `period.start`.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      type: Schema.Literals([
        "min_item_period_end",
        "phase_end",
        "timestamp",
      ]).annotate({
        description:
          "Select how to calculate the end of the invoice item period.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodEnd",
    description: "",
    identifier:
      "Stripesubscription_schedules_resource_invoice_item_period_resource_period_end",
  });
export const Stripesubscription_schedules_resource_invoice_item_period_resource_period_start =
  Schema.StructWithRest(
    Schema.Struct({
      timestamp: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "A precise Unix timestamp for the start of the invoice item period. Must be less than or equal to `period.end`.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      type: Schema.Literals([
        "max_item_period_start",
        "phase_start",
        "timestamp",
      ]).annotate({
        description:
          "Select how to calculate the start of the invoice item period.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodStart",
    description: "",
    identifier:
      "Stripesubscription_schedules_resource_invoice_item_period_resource_period_start",
  });
export const Stripesubscriptions_resource_paused_status_details_subscription =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals([
        "final_payment_failure",
        "first_payment_failure",
        "pause_requested",
        "system",
        "trial_end_without_payment_method",
      ]).annotate({
        description: "The reason that the subscription was paused.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "Subscription pause detail",
    description: "Information on the `type=subscription` pause.",
    identifier:
      "Stripesubscriptions_resource_paused_status_details_subscription",
  });
export const Stripesubscriptions_resource_trial_settings_end_behavior =
  Schema.StructWithRest(
    Schema.Struct({
      billing_cycle_anchor: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["now", "unchanged"]).annotate({
            description:
              "Indicates how the subscription's billing cycle anchor is reset when a trial ends. If not set, the default is `now`.",
          }),
          Schema.Null,
        ]),
      ),
      missing_payment_method: Schema.Literals([
        "cancel",
        "create_invoice",
        "pause",
      ]).annotate({
        description:
          "Indicates how the subscription should change when the trial ends if the user did not provide a payment method.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "End Behavior",
    description: "Defines how a subscription behaves when a trial ends.",
    identifier: "Stripesubscriptions_resource_trial_settings_end_behavior",
  });
export const Stripesubscriptions_trials_resource_end_behavior =
  Schema.StructWithRest(
    Schema.Struct({
      missing_payment_method: Schema.Literals([
        "cancel",
        "create_invoice",
        "pause",
      ]).annotate({
        description:
          "Indicates how the subscription should change when the trial ends if the user did not provide a payment method.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "End Behavior",
    description: "Defines how a subscription behaves when a free trial ends.",
    identifier: "Stripesubscriptions_trials_resource_end_behavior",
  });
export const Stripesubscription_automatic_tax = Schema.suspend(
  (): Schema.Codec<Stripesubscription_automatic_tax> =>
    Schema.StructWithRest(
      Schema.Struct({
        disabled_reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literal("requires_location_inputs").annotate({
              description:
                "If Stripe disabled automatic tax, this enum describes why.",
            }),
            Schema.Null,
          ]),
        ),
        enabled: Schema.Boolean.annotate({
          description:
            "Whether Stripe automatically computes tax on this subscription.",
        }),
        liability: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeconnect_account_reference]).annotate({
              description:
                "The account that's liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.",
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
      title: "SubscriptionAutomaticTax",
      description: "",
      identifier: "Stripesubscription_automatic_tax",
    }),
);
export const Stripesubscription_schedules_resource_default_settings_automatic_tax =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_default_settings_automatic_tax> =>
      Schema.StructWithRest(
        Schema.Struct({
          disabled_reason: Schema.optionalKey(
            Schema.Union([
              Schema.Literal("requires_location_inputs").annotate({
                description:
                  "If Stripe disabled automatic tax, this enum describes why.",
              }),
              Schema.Null,
            ]),
          ),
          enabled: Schema.Boolean.annotate({
            description:
              "Whether Stripe automatically computes tax on invoices created during this phase.",
          }),
          liability: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeconnect_account_reference]).annotate({
                description:
                  "The account that's liable for tax. If set, the business address and tax registrations required to perform the tax calculation are loaded from this account. The tax transaction is returned in the report of the connected account.",
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
        title: "SubscriptionSchedulesResourceDefaultSettingsAutomaticTax",
        description: "",
        identifier:
          "Stripesubscription_schedules_resource_default_settings_automatic_tax",
      }),
  );
export const Stripesubscriptions_resource_billing_mode = Schema.suspend(
  (): Schema.Codec<Stripesubscriptions_resource_billing_mode> =>
    Schema.StructWithRest(
      Schema.Struct({
        flexible: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_resource_billing_mode_flexible,
            ]).annotate({
              description: "Configure behavior for flexible billing mode",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals(["classic", "flexible"]).annotate({
          description:
            "Controls how prorations and invoices for subscriptions are calculated and orchestrated.",
        }),
        updated_at: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "Details on when the current billing_mode was adopted.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Billing Mode",
      description: "The billing mode of the subscription.",
      identifier: "Stripesubscriptions_resource_billing_mode",
    }),
);
export const Stripesubscriptions_resource_billing_schedules_bill_until =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_resource_billing_schedules_bill_until> =>
      Schema.StructWithRest(
        Schema.Struct({
          computed_timestamp: Schema.Number.annotate({
            description: "The timestamp the billing schedule will apply until.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          duration: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscriptions_resource_billing_schedules_bill_until_duration,
              ]).annotate({ description: "Specifies the billing period." }),
              Schema.Null,
            ]),
          ),
          timestamp: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "If specified, the billing schedule will apply until the specified timestamp.",
                format: "unix-time",
              }).check(Schema.isInt().annotate({ expected: "an integer" })),
              Schema.Null,
            ]),
          ),
          type: Schema.Literals(["duration", "timestamp"]).annotate({
            description:
              "Describes how the billing schedule will determine the end date. Either `duration` or `timestamp`.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Billing Schedules Bill Until",
        description: "Specifies the end of billing period.",
        identifier: "Stripesubscriptions_resource_billing_schedules_bill_until",
      }),
  );
export const Stripesubscriptions_resource_subscription_invoice_settings =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_resource_subscription_invoice_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          account_tax_ids: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Stripetax_id,
                  Stripedeleted_tax_id,
                ]),
              ).annotate({
                description:
                  "The account tax IDs associated with the subscription. Will be set on invoices generated by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          custom_fields: Schema.optionalKey(
            Schema.Union([
              Schema.Array(Stripeinvoice_setting_custom_field).annotate({
                description:
                  "A list of up to 4 custom fields to be displayed on the invoice.",
              }),
              Schema.Null,
            ]),
          ),
          description: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "An arbitrary string attached to the object. Often useful for displaying to users.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          footer: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Footer to be displayed on the invoice.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          issuer: Stripeconnect_account_reference,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionsResourceSubscriptionInvoiceSettings",
        description: "",
        identifier:
          "Stripesubscriptions_resource_subscription_invoice_settings",
      }),
  );
export const Stripesubscription_payment_method_options_billie_company_details =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_payment_method_options_billie_company_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          registered_address: Schema.optionalKey(
            Stripesubscription_payment_method_options_billie_company_details_registered_address,
          ),
          registered_name: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "Company or entity name.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          registration_number: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The official registration number for the given registration type.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          registration_type: Schema.optionalKey(
            Schema.Literals([
              "ch_ein",
              "de_hrb",
              "dk_cvr",
              "es_cif",
              "fi_tunnus",
              "fr_siren",
              "fr_siret",
              "it_rea",
              "nl_kvk",
              "no_org_number",
              "no_pno",
              "se_org_number",
              "se_pno",
              "uk_crn",
            ]).annotate({
              description:
                "Type of registration the company or entity holds in their registered country.",
            }),
          ),
          vat: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({ description: "VAT ID number." }).check(
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
        title: "subscription_payment_method_options_billie_company_details",
        description: "",
        identifier:
          "Stripesubscription_payment_method_options_billie_company_details",
      }),
  );
export const Stripesubscription_payment_method_options_blik = Schema.suspend(
  (): Schema.Codec<Stripesubscription_payment_method_options_blik> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(
          Stripesubscription_payment_method_options_mandate_options_blik,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "subscription_payment_method_options_blik",
      description: "",
      identifier: "Stripesubscription_payment_method_options_blik",
    }),
);
export const Stripesubscription_payment_method_options_card = Schema.suspend(
  (): Schema.Codec<Stripesubscription_payment_method_options_card> =>
    Schema.StructWithRest(
      Schema.Struct({
        mandate_options: Schema.optionalKey(Stripeinvoice_mandate_options_card),
        network: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "amex",
              "cartes_bancaires",
              "diners",
              "discover",
              "eftpos_au",
              "girocard",
              "interac",
              "jcb",
              "link",
              "mastercard",
              "unionpay",
              "unknown",
              "visa",
            ]).annotate({
              description:
                "Selected network to process this Subscription on. Depends on the available networks of the card attached to the Subscription. Can be only set confirm-time.",
            }),
            Schema.Null,
          ]),
        ),
        request_three_d_secure: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["any", "automatic", "challenge"]).annotate({
              description:
                "We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://docs.stripe.com/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Read our guide on [manually requesting 3D Secure](https://docs.stripe.com/payments/3d-secure/authentication-flow#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.",
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
      title: "subscription_payment_method_options_card",
      description: "",
      identifier: "Stripesubscription_payment_method_options_card",
    }),
);
export const Stripesubscription_payment_method_options_pix = Schema.suspend(
  (): Schema.Codec<Stripesubscription_payment_method_options_pix> =>
    Schema.StructWithRest(
      Schema.Struct({
        expires_after_seconds: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The number of seconds after PaymentIntent confirmation when the Pix expires (between 60 and 1209600, inclusive). If unspecified, defaults to 14400 seconds (4 hours).",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        mandate_options: Schema.optionalKey(
          Stripesubscription_payment_method_options_mandate_options_pix,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "subscription_payment_method_options_pix",
      description: "",
      identifier: "Stripesubscription_payment_method_options_pix",
    }),
);
export const Stripesubscription_schedules_resource_pause_schedule_bill_for =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_pause_schedule_bill_for> =>
      Schema.StructWithRest(
        Schema.Struct({
          outstanding_usage_through:
            Stripesubscription_schedules_resource_pause_schedule_outstanding_usage_through,
          unused_time_from:
            Stripesubscription_schedules_resource_pause_schedule_unused_time_from,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionSchedulesResourcePauseScheduleBillFor",
        description: "",
        identifier:
          "Stripesubscription_schedules_resource_pause_schedule_bill_for",
      }),
  );
export const Stripesubscription_schedules_resource_pause_schedule_pause_status =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_pause_schedule_pause_status> =>
      Schema.StructWithRest(
        Schema.Struct({
          error: Schema.optionalKey(
            Stripesubscription_schedules_resource_pause_schedule_status_error,
          ),
          type: Schema.Literals(["error", "scheduled", "succeeded"]).annotate({
            description: "The lifecycle state of the pause operation.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionSchedulesResourcePauseSchedulePauseStatus",
        description: "",
        identifier:
          "Stripesubscription_schedules_resource_pause_schedule_pause_status",
      }),
  );
export const Stripesubscription_schedules_resource_pause_schedule_resume_status =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_pause_schedule_resume_status> =>
      Schema.StructWithRest(
        Schema.Struct({
          error: Schema.optionalKey(
            Stripesubscription_schedules_resource_pause_schedule_status_error,
          ),
          type: Schema.Literals([
            "error",
            "pending",
            "requires_action",
            "scheduled",
            "succeeded",
          ]).annotate({
            description: "The lifecycle state of the resume operation.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionSchedulesResourcePauseScheduleResumeStatus",
        description: "",
        identifier:
          "Stripesubscription_schedules_resource_pause_schedule_resume_status",
      }),
  );
export const Stripesubscription_schedule_add_invoice_item_period =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedule_add_invoice_item_period> =>
      Schema.StructWithRest(
        Schema.Struct({
          end: Stripesubscription_schedules_resource_invoice_item_period_resource_period_end,
          start:
            Stripesubscription_schedules_resource_invoice_item_period_resource_period_start,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionScheduleAddInvoiceItemPeriod",
        description: "",
        identifier: "Stripesubscription_schedule_add_invoice_item_period",
      }),
  );
export const Stripesubscriptions_resource_paused_status_details_public =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_resource_paused_status_details_public> =>
      Schema.StructWithRest(
        Schema.Struct({
          subscription:
            Stripesubscriptions_resource_paused_status_details_subscription,
          transitioned_at: Schema.Number.annotate({
            description:
              "Unix timestamp in seconds of when the subscription status transitioned to `paused`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          type: Schema.Literal("subscription").annotate({
            description: "The type of pause.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Paused",
        description:
          "Indicates when and why the subscription transitioned to the paused status.",
        identifier: "Stripesubscriptions_resource_paused_status_details_public",
      }),
  );
export const Stripesubscriptions_resource_trial_settings_trial_settings =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_resource_trial_settings_trial_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          end_behavior:
            Stripesubscriptions_resource_trial_settings_end_behavior,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Trial Setting",
        description:
          "Configures how this subscription behaves during the trial period.",
        identifier:
          "Stripesubscriptions_resource_trial_settings_trial_settings",
      }),
  );
export const Stripesubscriptions_trials_resource_trial_settings =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_trials_resource_trial_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          end_behavior: Stripesubscriptions_trials_resource_end_behavior,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Trial Setting",
        description:
          "Configures how this subscription behaves during the trial period.",
        identifier: "Stripesubscriptions_trials_resource_trial_settings",
      }),
  );
export const Stripesubscriptions_resource_billing_schedules = Schema.suspend(
  (): Schema.Codec<Stripesubscriptions_resource_billing_schedules> =>
    Schema.StructWithRest(
      Schema.Struct({
        applies_to: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripesubscriptions_resource_billing_schedules_applies_to,
            ).annotate({
              description:
                "Specifies which subscription items the billing schedule applies to.",
            }),
            Schema.Null,
          ]),
        ),
        bill_until: Stripesubscriptions_resource_billing_schedules_bill_until,
        key: Schema.String.annotate({
          description: "Unique identifier for the billing schedule.",
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
      title: "Billing Schedule",
      description: "Sets the billing schedule for the subscription.",
      identifier: "Stripesubscriptions_resource_billing_schedules",
    }),
);
export const Stripesubscription_item = Schema.suspend(
  (): Schema.Codec<Stripesubscription_item> =>
    Schema.StructWithRest(
      Schema.Struct({
        billed_until: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The time period the subscription item has been billed for.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        billing_thresholds: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesubscription_item_billing_thresholds]).annotate(
              {
                description:
                  "Define thresholds at which an invoice will be sent, and the related subscription advanced to a new billing period",
              },
            ),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        current_period_end: Schema.Number.annotate({
          description:
            "The end time of this subscription item's current billing period.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        current_period_start: Schema.Number.annotate({
          description:
            "The start time of this subscription item's current billing period.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        current_trial: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_trials_resource_current_trial,
            ]).annotate({
              description:
                "The current trial that is applied to this subscription item.",
            }),
            Schema.Null,
          ]),
        ),
        discounts: Schema.Array(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripediscount,
          ]),
        ).annotate({
          description:
            "The discounts applied to the subscription item. Subscription item discounts are applied before subscription discounts. Use `expand[]=discounts` to expand each discount.",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        metadata: Schema.Record(
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
        object: Schema.Literal("subscription_item").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        price: Stripeprice,
        quantity: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The [quantity](https://docs.stripe.com/subscriptions/quantities) of the plan to which the customer should be subscribed.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        subscription: Schema.String.annotate({
          description:
            "The `subscription` this `subscription_item` belongs to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        tax_rates: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripetax_rate).annotate({
              description:
                "The tax rates which apply to this `subscription_item`. When set, the `default_tax_rates` on the subscription do not apply to this `subscription_item`.",
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
      title: "Subscription Item",
      description:
        "Subscription items allow you to create customer subscriptions with more than\none plan, making it easy to represent complex billing relationships.",
      identifier: "Stripesubscription_item",
    }),
);
export const Stripesubscription_schedules_resource_default_settings =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_default_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          application_fee_percent: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({
                description:
                  "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account during this phase of the schedule.",
              }).check(
                Schema.isFinite().annotate({ expected: "a finite number" }),
              ),
              Schema.Null,
            ]),
          ),
          automatic_tax: Schema.optionalKey(
            Stripesubscription_schedules_resource_default_settings_automatic_tax,
          ),
          billing_cycle_anchor: Schema.Literals([
            "automatic",
            "phase_start",
          ]).annotate({
            description:
              "Possible values are `phase_start` or `automatic`. If `phase_start` then billing cycle anchor of the subscription is set to the start of the phase when entering the phase. If `automatic` then the billing cycle anchor is automatically modified as needed when entering the phase. For more information, see the billing cycle [documentation](https://docs.stripe.com/billing/subscriptions/billing-cycle).",
          }),
          billing_thresholds: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripesubscription_billing_thresholds]).annotate({
                description:
                  "Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period",
              }),
              Schema.Null,
            ]),
          ),
          collection_method: Schema.optionalKey(
            Schema.Union([
              Schema.Literals([
                "charge_automatically",
                "send_invoice",
              ]).annotate({
                description:
                  "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay the underlying subscription at the end of each billing cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`.",
              }),
              Schema.Null,
            ]),
          ),
          default_payment_method: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripepayment_method,
              ]).annotate({
                description:
                  "ID of the default payment method for the subscription schedule. If not set, invoices will use the default payment method in the customer's invoice settings.",
              }),
              Schema.Null,
            ]),
          ),
          description: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Subscription description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in Stripe surfaces and certain local payment methods UIs.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          invoice_settings: Stripeinvoice_setting_subscription_schedule_setting,
          on_behalf_of: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Schema.suspend(
                  (): Schema.Codec<Stripeaccount> => Stripeaccount,
                ),
              ]).annotate({
                description:
                  "The account (if any) the charge was made on behalf of for charges associated with the schedule's subscription. See the Connect documentation for details.",
              }),
              Schema.Null,
            ]),
          ),
          transfer_data: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripesubscription_transfer_data]).annotate({
                description:
                  "The account (if any) the associated subscription's payments will be attributed to for tax reporting, and where funds from each payment will be transferred to for each of the subscription's invoices.",
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
        title: "SubscriptionSchedulesResourceDefaultSettings",
        description: "",
        identifier: "Stripesubscription_schedules_resource_default_settings",
      }),
  );
export const Stripesubscription_payment_method_options_billie = Schema.suspend(
  (): Schema.Codec<Stripesubscription_payment_method_options_billie> =>
    Schema.StructWithRest(
      Schema.Struct({
        company_details: Schema.optionalKey(
          Stripesubscription_payment_method_options_billie_company_details,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "subscription_payment_method_options_billie",
      description: "",
      identifier: "Stripesubscription_payment_method_options_billie",
    }),
);
export const Stripesubscription_schedules_resource_pause_schedule_pause_settings =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_pause_schedule_pause_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          bill_for:
            Stripesubscription_schedules_resource_pause_schedule_bill_for,
          invoicing_behavior: Schema.Literals([
            "invoice",
            "pending_invoice_item",
          ]).annotate({
            description:
              "Determines how to handle debits and credits when pausing.",
          }),
          type: Schema.Literal("subscription").annotate({
            description: "The type of pause settings.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionSchedulesResourcePauseSchedulePauseSettings",
        description: "",
        identifier:
          "Stripesubscription_schedules_resource_pause_schedule_pause_settings",
      }),
  );
export const Stripesubscription_schedules_resource_pause_schedule_resume =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_pause_schedule_resume> =>
      Schema.StructWithRest(
        Schema.Struct({
          resume_at: Schema.Number.annotate({
            description: "Time at which the subscription resumes.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          settings:
            Stripesubscription_schedules_resource_pause_schedule_resume_settings,
          status:
            Stripesubscription_schedules_resource_pause_schedule_resume_status,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionSchedulesResourcePauseScheduleResume",
        description: "",
        identifier:
          "Stripesubscription_schedules_resource_pause_schedule_resume",
      }),
  );
export const Stripesubscriptions_resource_status_details_public =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_resource_status_details_public> =>
      Schema.StructWithRest(
        Schema.Struct({
          paused: Stripesubscriptions_resource_paused_status_details_public,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "Status Detail",
        description: "Describes changes to the subscription's status.",
        identifier: "Stripesubscriptions_resource_status_details_public",
      }),
  );
export const Stripesubscription_schedule_add_invoice_item = Schema.suspend(
  (): Schema.Codec<Stripesubscription_schedule_add_invoice_item> =>
    Schema.StructWithRest(
      Schema.Struct({
        discountable: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Controls whether discounts apply to this invoice item. Defaults to true if no value is provided.",
            }),
            Schema.Null,
          ]),
        ),
        discounts: Schema.Array(
          Stripediscounts_resource_stackable_discount_with_discount_end,
        ).annotate({
          description:
            "The stackable discounts that will be applied to the item.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
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
            Schema.Null,
          ]),
        ),
        period: Stripesubscription_schedule_add_invoice_item_period,
        price: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Stripeprice,
          Stripedeleted_price,
        ]).annotate({
          description: "ID of the price used to generate the invoice item.",
        }),
        quantity: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The quantity of the invoice item.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        tax_rates: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripetax_rate).annotate({
              description:
                "The tax rates which apply to the item. When set, the `default_tax_rates` do not apply to this item.",
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
      title: "Add Invoice Item",
      description:
        "An Add Invoice Item describes the prices and quantities that will be added as pending invoice items when entering a phase.",
      identifier: "Stripesubscription_schedule_add_invoice_item",
    }),
);
export const Stripesubscriptions_resource_pending_update = Schema.suspend(
  (): Schema.Codec<Stripesubscriptions_resource_pending_update> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing_cycle_anchor: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If the update is applied, determines the date of the first full invoice, and, for plans with `month` or `year` intervals, the day of the month for subsequent invoices. The timestamp is in UTC format.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        cancel_at_period_end: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Indicates whether this subscription should cancel at the end of the current period if the update is applied.",
            }),
            Schema.Null,
          ]),
        ),
        discount: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripediscount]).annotate({
              description:
                "The pending subscription-level discount that will be applied when the pending update is applied.",
            }),
            Schema.Null,
          ]),
        ),
        discounts: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripediscount,
              ]),
            ).annotate({
              description:
                "The discounts that will be applied to the subscription when the pending update is applied. Use `expand[]=discounts` to expand each discount.",
            }),
            Schema.Null,
          ]),
        ),
        expires_at: Schema.Number.annotate({
          description:
            "The point after which the changes reflected by this update will be discarded and no longer applied.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        metadata: Schema.optionalKey(
          Schema.Union([
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
            Schema.Null,
          ]),
        ),
        subscription_items: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripesubscription_item).annotate({
              description:
                "List of subscription items, each with an attached plan, that will be set if the update is applied.",
            }),
            Schema.Null,
          ]),
        ),
        trial_end: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Unix timestamp representing the end of the trial period the customer will get before being charged for the first time, if the update is applied.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        trial_from_plan: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Indicates if a plan's `trial_period_days` should be applied to the subscription. Setting `trial_end` per subscription is preferred, and this defaults to `false`. Setting this flag to `true` together with `trial_end` is not allowed. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
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
      title: "Pending Update",
      description:
        "Pending Updates store the changes pending from a previous update that will be applied\nto the Subscription upon successful payment.",
      identifier: "Stripesubscriptions_resource_pending_update",
    }),
);
export const Stripesubscriptions_resource_payment_method_options =
  Schema.suspend(
    (): Schema.Codec<Stripesubscriptions_resource_payment_method_options> =>
      Schema.StructWithRest(
        Schema.Struct({
          acss_debit: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeinvoice_payment_method_options_acss_debit,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Canadian pre-authorized debit payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          bancontact: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeinvoice_payment_method_options_bancontact,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Bancontact payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          billie: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscription_payment_method_options_billie,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Billie payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          blik: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscription_payment_method_options_blik,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Blik payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          card: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscription_payment_method_options_card,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Card payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          customer_balance: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeinvoice_payment_method_options_customer_balance,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Bank transfer payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          konbini: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeinvoice_payment_method_options_konbini,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Konbini payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          payto: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeinvoice_payment_method_options_payto,
              ]).annotate({
                description:
                  "This sub-hash contains details about the PayTo payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          pix: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscription_payment_method_options_pix,
              ]).annotate({
                description:
                  "This sub-hash contains details about the Pix payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          sepa_debit: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscription_payment_method_options_sepa_debit,
              ]).annotate({
                description:
                  "This sub-hash contains details about the SEPA Direct Debit payment method options to pass to invoices created by the subscription.",
              }),
              Schema.Null,
            ]),
          ),
          upi: Schema.optionalKey(
            Schema.Union([
              Schema.Union([Stripeinvoice_payment_method_options_upi]).annotate(
                {
                  description:
                    "This sub-hash contains details about the UPI payment method options to pass to invoices created by the subscription.",
                },
              ),
              Schema.Null,
            ]),
          ),
          us_bank_account: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripeinvoice_payment_method_options_us_bank_account,
              ]).annotate({
                description:
                  "This sub-hash contains details about the ACH direct debit payment method options to pass to invoices created by the subscription.",
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
        title: "SubscriptionsResourcePaymentMethodOptions",
        description: "",
        identifier: "Stripesubscriptions_resource_payment_method_options",
      }),
  );
export const Stripesubscription_schedules_resource_pause_schedule_pause =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_pause_schedule_pause> =>
      Schema.StructWithRest(
        Schema.Struct({
          pause_at: Schema.Number.annotate({
            description: "Time at which the subscription pauses.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          settings: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscription_schedules_resource_pause_schedule_pause_settings,
              ]).annotate({
                description:
                  "Settings controlling billing behavior during the pause.",
              }),
              Schema.Null,
            ]),
          ),
          status:
            Stripesubscription_schedules_resource_pause_schedule_pause_status,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "SubscriptionSchedulesResourcePauseSchedulePause",
        description: "",
        identifier:
          "Stripesubscription_schedules_resource_pause_schedule_pause",
      }),
  );
export const Stripesubscriptions_resource_payment_settings = Schema.suspend(
  (): Schema.Codec<Stripesubscriptions_resource_payment_settings> =>
    Schema.StructWithRest(
      Schema.Struct({
        payment_method_options: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripesubscriptions_resource_payment_method_options,
            ]).annotate({
              description:
                "Payment-method-specific configuration to provide to invoices created by the subscription.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_types: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "ach_credit_transfer",
                "ach_debit",
                "acss_debit",
                "affirm",
                "alipay",
                "amazon_pay",
                "au_becs_debit",
                "bacs_debit",
                "bancontact",
                "billie",
                "blik",
                "boleto",
                "card",
                "cashapp",
                "crypto",
                "custom",
                "customer_balance",
                "eps",
                "fpx",
                "giropay",
                "grabpay",
                "ideal",
                "jp_credit_transfer",
                "kakao_pay",
                "klarna",
                "konbini",
                "kr_card",
                "link",
                "mb_way",
                "multibanco",
                "naver_pay",
                "nz_bank_account",
                "p24",
                "pay_by_bank",
                "payco",
                "paynow",
                "paypal",
                "payto",
                "pix",
                "promptpay",
                "revolut_pay",
                "satispay",
                "sepa_credit_transfer",
                "sepa_debit",
                "sequra",
                "sofort",
                "swish",
                "twint",
                "upi",
                "us_bank_account",
                "wechat_pay",
              ]),
            ).annotate({
              description:
                "The list of payment method types to provide to every invoice created by the subscription. If not set, Stripe attempts to automatically determine the types to use by looking at the invoice’s default payment method, the subscription’s default payment method, the customer’s default payment method, and your [invoice template settings](https://dashboard.stripe.com/settings/billing/invoice).",
            }),
            Schema.Null,
          ]),
        ),
        save_default_payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["off", "on_subscription"]).annotate({
              description:
                "Configure whether Stripe updates `subscription.default_payment_method` when payment succeeds. Defaults to `off`.",
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
      title: "SubscriptionsResourcePaymentSettings",
      description: "",
      identifier: "Stripesubscriptions_resource_payment_settings",
    }),
);
export const Stripesubscription_schedules_resource_pause_schedule =
  Schema.suspend(
    (): Schema.Codec<Stripesubscription_schedules_resource_pause_schedule> =>
      Schema.StructWithRest(
        Schema.Struct({
          key: Schema.String.annotate({
            description: "A unique identifier for this pause schedule.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          pause: Stripesubscription_schedules_resource_pause_schedule_pause,
          resume: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripesubscription_schedules_resource_pause_schedule_resume,
              ]).annotate({
                description:
                  "Details about when and how the subscription resumes.",
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
        title: "SubscriptionSchedulesResourcePauseSchedule",
        description: "",
        identifier: "Stripesubscription_schedules_resource_pause_schedule",
      }),
  );
