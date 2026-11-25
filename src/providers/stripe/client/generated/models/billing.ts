// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeprice, Stripetax_rate } from "./catalog.js";
import {
  Stripeaddress,
  Stripeapplication,
  Stripedeleted_application,
  Stripefeedback_options_status_transitions,
  Stripetest_helpers_test_clock,
  Stripethresholds_resource_usage_threshold_config,
} from "./common.js";
import { Stripecustomer, Stripedeleted_customer } from "./customers.js";
import { Stripeinvoice } from "./invoices.js";
import { Stripesubscription } from "./subscriptions.js";

export type Stripebilling_credit_balance_transaction = {
  readonly created: number;
  readonly credit?: Stripebilling_credit_grants_resource_balance_credit | null;
  readonly credit_grant: string | Stripebilling_credit_grant;
  readonly debit?: Stripebilling_credit_grants_resource_balance_debit | null;
  readonly effective_at: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "billing.credit_balance_transaction";
  readonly test_clock?: string | Stripetest_helpers_test_clock | null;
  readonly type?: "credit" | "debit" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_balance_debit = {
  readonly amount: Stripebilling_credit_grants_resource_amount;
  readonly credits_applied?: Stripebilling_credit_grants_resource_balance_credits_applied | null;
  readonly type: "credits_applied" | "credits_expired" | "credits_voided";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_balance_credits_applied = {
  readonly invoice: string | Stripeinvoice;
  readonly invoice_line_item: string;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grant = {
  readonly amount: Stripebilling_credit_grants_resource_amount;
  readonly applicability_config: Stripebilling_credit_grants_resource_applicability_config;
  readonly category: "paid" | "promotional";
  readonly created: number;
  readonly customer: string | Stripecustomer | Stripedeleted_customer;
  readonly customer_account?: string | null;
  readonly effective_at?: number | null;
  readonly expires_at?: number | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly name?: string | null;
  readonly object: "billing.credit_grant";
  readonly priority?: number | null;
  readonly test_clock?: string | Stripetest_helpers_test_clock | null;
  readonly updated: number;
  readonly voided_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_balance_credit = {
  readonly amount: Stripebilling_credit_grants_resource_amount;
  readonly credits_application_invoice_voided?: Stripebilling_credit_grants_resource_balance_credits_application_invoice_voided | null;
  readonly type: "credits_application_invoice_voided" | "credits_granted";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_balance_credits_application_invoice_voided =
  {
    readonly invoice: string | Stripeinvoice;
    readonly invoice_line_item: string;
  } & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_parents_invoice_parent = {
  readonly quote_details?: Stripebilling_bill_resource_invoicing_parents_invoice_quote_parent | null;
  readonly subscription_details?: Stripebilling_bill_resource_invoicing_parents_invoice_subscription_parent | null;
  readonly type: "quote_details" | "subscription_details";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_parents_invoice_subscription_parent =
  {
    readonly metadata?: { readonly [x: string]: string } | null;
    readonly subscription: string | Stripesubscription;
    readonly subscription_proration_date?: number;
  } & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_lines_common_credited_items =
  {
    readonly invoice: string;
    readonly invoice_line_items: ReadonlyArray<string>;
  } & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_monetary_amount = {
  readonly currency: string;
  readonly value: number;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_applicable_price = {
  readonly id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_clocks_resource_status_details_advancing_status_details =
  { readonly target_frozen_time: number } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripebilling_bill_resource_invoicing_pricing_pricing_price_details =
  { readonly price: string | Stripeprice; readonly product: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripebilling_bill_resource_invoicing_parents_invoice_quote_parent =
  { readonly quote: string } & { readonly [x: string]: Schema.Json };
export type Stripebilling_meter_resource_customer_mapping_settings = {
  readonly event_payload_key: string;
  readonly type: "by_id";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_meter_resource_aggregation_settings = {
  readonly formula: "count" | "last" | "sum";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_meter_resource_billing_meter_status_transitions = {
  readonly deactivated_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_meter_resource_billing_meter_value = {
  readonly event_payload_key: string;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_meter_event_summary = {
  readonly aggregated_value: number;
  readonly end_time: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly meter: string;
  readonly object: "billing.meter_event_summary";
  readonly start_time: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_business_profile = {
  readonly headline?: string | null;
  readonly privacy_policy_url?: string | null;
  readonly terms_of_service_url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_customer_update = {
  readonly allowed_updates: ReadonlyArray<
    "address" | "email" | "name" | "phone" | "shipping" | "tax_id"
  >;
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_invoice_list = { readonly enabled: boolean } & {
  readonly [x: string]: Schema.Json;
};
export type Stripeportal_payment_method_update = {
  readonly enabled: boolean;
  readonly payment_method_configuration?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_pause_interval_option = {
  readonly interval: "day" | "month" | "week" | "year";
  readonly interval_count: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_update_product_adjustable_quantity = {
  readonly enabled: boolean;
  readonly maximum?: number | null;
  readonly minimum: number;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_resource_schedule_update_at_period_end_condition = {
  readonly type: "decreasing_item_amount" | "shortening_interval";
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_login_page = {
  readonly enabled: boolean;
  readonly url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoice_item_parents_invoice_item_subscription_parent =
  { readonly subscription: string; readonly subscription_item?: string } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripebilling_details = {
  readonly address?: Stripeaddress | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly phone?: string | null;
  readonly tax_id?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_feedback_option = {
  readonly description: string;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "billing.feedback_option";
  readonly status: "active" | "inactive";
  readonly status_transitions: Stripefeedback_options_status_transitions;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_lines_common_proration_details =
  {
    readonly credited_items?: Stripebilling_bill_resource_invoicing_lines_common_credited_items | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_amount = {
  readonly monetary?: Stripebilling_credit_grants_resource_monetary_amount | null;
  readonly type: "monetary";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_scope = {
  readonly price_type?: "metered";
  readonly prices?: ReadonlyArray<Stripebilling_credit_grants_resource_applicable_price>;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_clocks_resource_status_details_status_details = {
  readonly advancing?: Stripebilling_clocks_resource_status_details_advancing_status_details;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_pricing_pricing = {
  readonly price_details?: Stripebilling_bill_resource_invoicing_pricing_pricing_price_details;
  readonly type: "price_details";
  readonly unit_amount_decimal?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_meter = {
  readonly created: number;
  readonly customer_mapping: Stripebilling_meter_resource_customer_mapping_settings;
  readonly default_aggregation: Stripebilling_meter_resource_aggregation_settings;
  readonly display_name: string;
  readonly event_name: string;
  readonly event_time_window?: "day" | "hour" | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "billing.meter";
  readonly status: "active" | "inactive";
  readonly status_transitions: Stripebilling_meter_resource_billing_meter_status_transitions;
  readonly updated: number;
  readonly value_settings: Stripebilling_meter_resource_billing_meter_value;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_pause_duration = {
  readonly interval_options: ReadonlyArray<Stripeportal_subscription_pause_interval_option>;
  readonly type: "indefinite" | "interval_options";
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_update_product = {
  readonly adjustable_quantity: Stripeportal_subscription_update_product_adjustable_quantity;
  readonly prices: ReadonlyArray<string>;
  readonly product: string;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_resource_schedule_update_at_period_end = {
  readonly conditions: ReadonlyArray<Stripeportal_resource_schedule_update_at_period_end_condition>;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoice_item_parents_invoice_item_parent =
  {
    readonly subscription_details?: Stripebilling_bill_resource_invoice_item_parents_invoice_item_subscription_parent | null;
    readonly type: "subscription_details";
  } & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_cancellation_reason = {
  readonly enabled: boolean;
  readonly feedback_options?: ReadonlyArray<
    string | Stripebilling_feedback_option
  > | null;
  readonly options: ReadonlyArray<
    | "customer_service"
    | "low_quality"
    | "missing_features"
    | "other"
    | "switched_service"
    | "too_complex"
    | "too_expensive"
    | "unused"
  >;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_taxes_tax_rate_details = {
  readonly tax_rate: string | Stripetax_rate;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_invoice_item_parent =
  {
    readonly invoice_item: string;
    readonly proration: boolean;
    readonly proration_details?: Stripebilling_bill_resource_invoicing_lines_common_proration_details | null;
    readonly subscription?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_subscription_item_parent =
  {
    readonly invoice_item?: string | null;
    readonly proration: boolean;
    readonly proration_details?: Stripebilling_bill_resource_invoicing_lines_common_proration_details | null;
    readonly subscription?: string | null;
    readonly subscription_item: string;
  } & { readonly [x: string]: Schema.Json };
export type Stripebilling_credit_grants_resource_applicability_config = {
  readonly scope: Stripebilling_credit_grants_resource_scope;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_pause = {
  readonly duration: Stripeportal_subscription_pause_duration;
  readonly enabled: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_update = {
  readonly billing_cycle_anchor?: "now" | "unchanged" | null;
  readonly default_allowed_updates: ReadonlyArray<
    "price" | "promotion_code" | "quantity"
  >;
  readonly enabled: boolean;
  readonly products?: ReadonlyArray<Stripeportal_subscription_update_product> | null;
  readonly proration_behavior: "always_invoice" | "create_prorations" | "none";
  readonly schedule_at_period_end: Stripeportal_resource_schedule_update_at_period_end;
  readonly trial_update_behavior: "continue_trial" | "end_trial";
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_subscription_cancel = {
  readonly cancellation_reason: Stripeportal_subscription_cancellation_reason;
  readonly enabled: boolean;
  readonly mode: "at_period_end" | "immediately";
  readonly proration_behavior: "always_invoice" | "create_prorations" | "none";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_taxes_tax = {
  readonly amount: number;
  readonly tax_behavior: "exclusive" | "inclusive";
  readonly tax_rate_details?: Stripebilling_bill_resource_invoicing_taxes_tax_rate_details | null;
  readonly taxability_reason:
    | "customer_exempt"
    | "not_available"
    | "not_collecting"
    | "not_subject_to_tax"
    | "not_supported"
    | "portion_product_exempt"
    | "portion_reduced_rated"
    | "portion_standard_rated"
    | "product_exempt"
    | "product_exempt_holiday"
    | "proportionally_rated"
    | "reduced_rated"
    | "reverse_charge"
    | "standard_rated"
    | "taxable_basis_reduced"
    | "zero_rated";
  readonly taxable_amount?: number | null;
  readonly type: "tax_rate_details";
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_parent =
  {
    readonly invoice_item_details?: Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_invoice_item_parent | null;
    readonly subscription_item_details?: Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_subscription_item_parent | null;
    readonly type: "invoice_item_details" | "subscription_item_details";
  } & { readonly [x: string]: Schema.Json };
export type Stripebilling_alert = {
  readonly alert_type: "usage_threshold";
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "billing.alert";
  readonly status?: "active" | "archived" | "inactive" | null;
  readonly title: string;
  readonly usage_threshold?: Stripethresholds_resource_usage_threshold_config | null;
} & { readonly [x: string]: Schema.Json };
export type Stripeportal_features = {
  readonly customer_update: Stripeportal_customer_update;
  readonly invoice_history: Stripeportal_invoice_list;
  readonly payment_method_update: Stripeportal_payment_method_update;
  readonly subscription_cancel: Stripeportal_subscription_cancel;
  readonly subscription_pause: Stripeportal_subscription_pause;
  readonly subscription_update: Stripeportal_subscription_update;
} & { readonly [x: string]: Schema.Json };
export type Stripebilling_portal_configuration = {
  readonly active: boolean;
  readonly application?:
    | string
    | Stripeapplication
    | Stripedeleted_application
    | null;
  readonly business_profile: Stripeportal_business_profile;
  readonly created: number;
  readonly default_return_url?: string | null;
  readonly features: Stripeportal_features;
  readonly id: string;
  readonly is_default: boolean;
  readonly livemode: boolean;
  readonly login_page: Stripeportal_login_page;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly name?: string | null;
  readonly object: "billing_portal.configuration";
  readonly updated: number;
} & { readonly [x: string]: Schema.Json };

export const Stripebilling_credit_balance_transaction = Schema.suspend(
  (): Schema.Codec<Stripebilling_credit_balance_transaction> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        credit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripebilling_credit_grants_resource_balance_credit> =>
                  Stripebilling_credit_grants_resource_balance_credit,
              ),
            ]).annotate({
              description:
                "Credit details for this credit balance transaction. Only present if type is `credit`.",
            }),
            Schema.Null,
          ]),
        ),
        credit_grant: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripebilling_credit_grant> =>
              Stripebilling_credit_grant,
          ),
        ]).annotate({
          description:
            "The credit grant associated with this credit balance transaction.",
        }),
        debit: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripebilling_credit_grants_resource_balance_debit> =>
                  Stripebilling_credit_grants_resource_balance_debit,
              ),
            ]).annotate({
              description:
                "Debit details for this credit balance transaction. Only present if type is `debit`.",
            }),
            Schema.Null,
          ]),
        ),
        effective_at: Schema.Number.annotate({
          description: "The effective time of this credit balance transaction.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        object: Schema.Literal("billing.credit_balance_transaction").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
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
                "ID of the test clock this credit balance transaction belongs to.",
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["credit", "debit"]).annotate({
              description:
                "The type of credit balance transaction (credit or debit).",
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
      title: "Credit Balance Transaction",
      description:
        "A credit balance transaction is a resource representing a transaction (either a credit or a debit) against an existing credit grant.",
      identifier: "Stripebilling.credit_balance_transaction",
    }),
);
export const Stripebilling_credit_grants_resource_balance_debit =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_credit_grants_resource_balance_debit> =>
      Schema.StructWithRest(
        Schema.Struct({
          amount: Stripebilling_credit_grants_resource_amount,
          credits_applied: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.suspend(
                  (): Schema.Codec<Stripebilling_credit_grants_resource_balance_credits_applied> =>
                    Stripebilling_credit_grants_resource_balance_credits_applied,
                ),
              ]).annotate({
                description:
                  "Details of how the billing credits were applied to an invoice. Only present if `type` is `credits_applied`.",
              }),
              Schema.Null,
            ]),
          ),
          type: Schema.Literals([
            "credits_applied",
            "credits_expired",
            "credits_voided",
          ]).annotate({ description: "The type of debit transaction." }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingCreditGrantsResourceBalanceDebit",
        description: "",
        identifier: "Stripebilling_credit_grants_resource_balance_debit",
      }),
  );
export const Stripebilling_credit_grants_resource_balance_credits_applied =
  Schema.StructWithRest(
    Schema.Struct({
      invoice: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
      ]).annotate({
        description: "The invoice to which the billing credits were applied.",
      }),
      invoice_line_item: Schema.String.annotate({
        description:
          "The invoice line item to which the billing credits were applied.",
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
    title: "BillingCreditGrantsResourceBalanceCreditsApplied",
    description: "",
    identifier: "Stripebilling_credit_grants_resource_balance_credits_applied",
  });
export const Stripebilling_credit_grant = Schema.suspend(
  (): Schema.Codec<Stripebilling_credit_grant> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Stripebilling_credit_grants_resource_amount,
        applicability_config:
          Stripebilling_credit_grants_resource_applicability_config,
        category: Schema.Literals(["paid", "promotional"]).annotate({
          description:
            "The category of this credit grant. This is for tracking purposes and isn't displayed to the customer.",
        }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
          Stripedeleted_customer,
        ]).annotate({
          description: "ID of the customer receiving the billing credits.",
        }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the account representing the customer receiving the billing credits",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        effective_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The time when the billing credits become effective-when they're eligible for use.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        expires_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The time when the billing credits expire. If not present, the billing credits don't expire.",
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
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
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
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "A descriptive name shown in dashboard.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("billing.credit_grant").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        priority: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The priority for applying this credit grant. The highest priority is 0 and the lowest is 100.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
              description: "ID of the test clock this credit grant belongs to.",
            }),
            Schema.Null,
          ]),
        ),
        updated: Schema.Number.annotate({
          description:
            "Time at which the object was last updated. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        voided_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The time when this credit grant was voided. If not present, the credit grant hasn't been voided.",
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
      title: "Credit Grant",
      description:
        "A credit grant is an API resource that documents the allocation of some billing credits to a customer.\n\nRelated guide: [Billing credits](https://docs.stripe.com/billing/subscriptions/usage-based/billing-credits)",
      identifier: "Stripebilling.credit_grant",
    }),
);
export const Stripebilling_credit_grants_resource_balance_credit =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_credit_grants_resource_balance_credit> =>
      Schema.StructWithRest(
        Schema.Struct({
          amount: Stripebilling_credit_grants_resource_amount,
          credits_application_invoice_voided: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.suspend(
                  (): Schema.Codec<Stripebilling_credit_grants_resource_balance_credits_application_invoice_voided> =>
                    Stripebilling_credit_grants_resource_balance_credits_application_invoice_voided,
                ),
              ]).annotate({
                description:
                  "Details of the invoice to which the reinstated credits were originally applied. Only present if `type` is `credits_application_invoice_voided`.",
              }),
              Schema.Null,
            ]),
          ),
          type: Schema.Literals([
            "credits_application_invoice_voided",
            "credits_granted",
          ]).annotate({ description: "The type of credit transaction." }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingCreditGrantsResourceBalanceCredit",
        description: "",
        identifier: "Stripebilling_credit_grants_resource_balance_credit",
      }),
  );
export const Stripebilling_credit_grants_resource_balance_credits_application_invoice_voided =
  Schema.StructWithRest(
    Schema.Struct({
      invoice: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
      ]).annotate({
        description:
          "The invoice to which the reinstated billing credits were originally applied.",
      }),
      invoice_line_item: Schema.String.annotate({
        description:
          "The invoice line item to which the reinstated billing credits were originally applied.",
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
    title: "BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided",
    description: "",
    identifier:
      "Stripebilling_credit_grants_resource_balance_credits_application_invoice_voided",
  });
export const Stripebilling_bill_resource_invoicing_parents_invoice_parent =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_parents_invoice_parent> =>
      Schema.StructWithRest(
        Schema.Struct({
          quote_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripebilling_bill_resource_invoicing_parents_invoice_quote_parent,
              ]).annotate({
                description:
                  "Details about the quote that generated this invoice",
              }),
              Schema.Null,
            ]),
          ),
          subscription_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.suspend(
                  (): Schema.Codec<Stripebilling_bill_resource_invoicing_parents_invoice_subscription_parent> =>
                    Stripebilling_bill_resource_invoicing_parents_invoice_subscription_parent,
                ),
              ]).annotate({
                description:
                  "Details about the subscription that generated this invoice",
              }),
              Schema.Null,
            ]),
          ),
          type: Schema.Literals([
            "quote_details",
            "subscription_details",
          ]).annotate({
            description: "The type of parent that generated this invoice",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingBillResourceInvoicingParentsInvoiceParent",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoicing_parents_invoice_parent",
      }),
  );
export const Stripebilling_bill_resource_invoicing_parents_invoice_subscription_parent =
  Schema.StructWithRest(
    Schema.Struct({
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
              "Set of [key-value pairs](https://docs.stripe.com/api/metadata) defined as subscription metadata when an invoice is created. Becomes an immutable snapshot of the subscription metadata at the time of invoice finalization.\n *Note: This attribute is populated only for invoices created on or after June 29, 2023.*",
          }),
          Schema.Null,
        ]),
      ),
      subscription: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend(
          (): Schema.Codec<Stripesubscription> => Stripesubscription,
        ),
      ]).annotate({
        description: "The subscription that generated this invoice",
      }),
      subscription_proration_date: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Only set for upcoming invoices that preview prorations. The time used to calculate prorations.",
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
    title: "BillingBillResourceInvoicingParentsInvoiceSubscriptionParent",
    description: "",
    identifier:
      "Stripebilling_bill_resource_invoicing_parents_invoice_subscription_parent",
  });
export const Stripebilling_bill_resource_invoicing_lines_common_credited_items =
  Schema.StructWithRest(
    Schema.Struct({
      invoice: Schema.String.annotate({
        description: "Invoice containing the credited invoice line items",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      invoice_line_items: Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({ description: "Credited invoice line items" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BillingBillResourceInvoicingLinesCommonCreditedItems",
    description: "",
    identifier:
      "Stripebilling_bill_resource_invoicing_lines_common_credited_items",
  });
export const Stripebilling_credit_grants_resource_monetary_amount =
  Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      value: Schema.Number.annotate({
        description: "A positive integer representing the amount.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BillingCreditGrantsResourceMonetaryAmount",
    description: "",
    identifier: "Stripebilling_credit_grants_resource_monetary_amount",
  });
export const Stripebilling_credit_grants_resource_applicable_price =
  Schema.StructWithRest(
    Schema.Struct({
      id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Unique identifier for the object.",
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
    title: "BillingCreditGrantsResourceApplicablePrice",
    description: "",
    identifier: "Stripebilling_credit_grants_resource_applicable_price",
  });
export const Stripebilling_clocks_resource_status_details_advancing_status_details =
  Schema.StructWithRest(
    Schema.Struct({
      target_frozen_time: Schema.Number.annotate({
        description:
          "The `frozen_time` that the Test Clock is advancing towards.",
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
    title: "BillingClocksResourceStatusDetailsAdvancingStatusDetails",
    description: "",
    identifier:
      "Stripebilling_clocks_resource_status_details_advancing_status_details",
  });
export const Stripebilling_bill_resource_invoicing_pricing_pricing_price_details =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_pricing_pricing_price_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          price: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripeprice,
          ]).annotate({
            description: "The ID of the price this item is associated with.",
          }),
          product: Schema.String.annotate({
            description: "The ID of the product this item is associated with.",
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
        title: "BillingBillResourceInvoicingPricingPricingPriceDetails",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoicing_pricing_pricing_price_details",
      }),
  );
export const Stripebilling_bill_resource_invoicing_parents_invoice_quote_parent =
  Schema.StructWithRest(
    Schema.Struct({
      quote: Schema.String.annotate({
        description: "The quote that generated this invoice",
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
    title: "BillingBillResourceInvoicingParentsInvoiceQuoteParent",
    description: "",
    identifier:
      "Stripebilling_bill_resource_invoicing_parents_invoice_quote_parent",
  });
export const Stripebilling_meter_resource_customer_mapping_settings =
  Schema.StructWithRest(
    Schema.Struct({
      event_payload_key: Schema.String.annotate({
        description:
          "The key in the meter event payload to use for mapping the event to a customer.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      type: Schema.Literal("by_id").annotate({
        description: "The method for mapping a meter event to a customer.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BillingMeterResourceCustomerMappingSettings",
    description: "",
    identifier: "Stripebilling_meter_resource_customer_mapping_settings",
  });
export const Stripebilling_meter_resource_aggregation_settings =
  Schema.StructWithRest(
    Schema.Struct({
      formula: Schema.Literals(["count", "last", "sum"]).annotate({
        description: "Specifies how events are aggregated.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BillingMeterResourceAggregationSettings",
    description: "",
    identifier: "Stripebilling_meter_resource_aggregation_settings",
  });
export const Stripebilling_meter_resource_billing_meter_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      deactivated_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The time the meter was deactivated, if any. Measured in seconds since Unix epoch.",
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
    title: "BillingMeterResourceBillingMeterStatusTransitions",
    description: "",
    identifier: "Stripebilling_meter_resource_billing_meter_status_transitions",
  });
export const Stripebilling_meter_resource_billing_meter_value =
  Schema.StructWithRest(
    Schema.Struct({
      event_payload_key: Schema.String.annotate({
        description:
          "The key in the meter event payload to use as the value for this meter.",
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
    title: "BillingMeterResourceBillingMeterValue",
    description: "",
    identifier: "Stripebilling_meter_resource_billing_meter_value",
  });
export const Stripebilling_meter_event_summary = Schema.StructWithRest(
  Schema.Struct({
    aggregated_value: Schema.Number.annotate({
      description:
        "Aggregated value of all the events within `start_time` (inclusive) and `end_time` (inclusive). The aggregation strategy is defined on meter via `default_aggregation`.",
    }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
    end_time: Schema.Number.annotate({
      description:
        "End timestamp for this event summary (exclusive). Must be aligned with minute boundaries.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    meter: Schema.String.annotate({
      description: "The meter associated with this event summary.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("billing.meter_event_summary").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    start_time: Schema.Number.annotate({
      description:
        "Start timestamp for this event summary (inclusive). Must be aligned with minute boundaries.",
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
  title: "Billing Meter Event Summary",
  description:
    "A billing meter event summary represents an aggregated view of a customer's billing meter events within a specified timeframe. It indicates how much\nusage was accrued by a customer for that period.\n\nNote: Meters events are aggregated asynchronously so the meter event summaries provide an eventually consistent view of the reported usage.",
  identifier: "Stripebilling.meter_event_summary",
});
export const Stripeportal_business_profile = Schema.StructWithRest(
  Schema.Struct({
    headline: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The messaging shown to customers in the portal.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    privacy_policy_url: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A link to the business’s publicly available privacy policy.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    terms_of_service_url: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A link to the business’s publicly available terms of service.",
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
  title: "PortalBusinessProfile",
  description: "",
  identifier: "Stripeportal_business_profile",
});
export const Stripeportal_customer_update = Schema.StructWithRest(
  Schema.Struct({
    allowed_updates: Schema.Array(
      Schema.Literals([
        "address",
        "email",
        "name",
        "phone",
        "shipping",
        "tax_id",
      ]),
    ).annotate({
      description:
        "The types of customer updates that are supported. When empty, customers are not updateable.",
    }),
    enabled: Schema.Boolean.annotate({
      description: "Whether the feature is enabled.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PortalCustomerUpdate",
  description: "",
  identifier: "Stripeportal_customer_update",
});
export const Stripeportal_invoice_list = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean.annotate({
      description: "Whether the feature is enabled.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "PortalInvoiceList",
  description: "",
  identifier: "Stripeportal_invoice_list",
});
export const Stripeportal_payment_method_update = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean.annotate({
      description: "Whether the feature is enabled.",
    }),
    payment_method_configuration: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The [Payment Method Configuration](/api/payment_method_configurations) to use for this portal session. When specified, customers will be able to update their payment method to one of the options specified by the payment method configuration. If not set, the default payment method configuration is used.",
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
  title: "PortalPaymentMethodUpdate",
  description: "",
  identifier: "Stripeportal_payment_method_update",
});
export const Stripeportal_subscription_pause_interval_option =
  Schema.StructWithRest(
    Schema.Struct({
      interval: Schema.Literals(["day", "month", "week", "year"]).annotate({
        description:
          "Specifies the pause duration unit. Either `day`, `week`, `month`, or `year`.",
      }),
      interval_count: Schema.Number.annotate({
        description:
          "The number of intervals in the pause duration. The maximum duration is three years.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PortalSubscriptionPauseIntervalOption",
    description: "",
    identifier: "Stripeportal_subscription_pause_interval_option",
  });
export const Stripeportal_subscription_update_product_adjustable_quantity =
  Schema.StructWithRest(
    Schema.Struct({
      enabled: Schema.Boolean.annotate({
        description:
          "If true, the quantity can be adjusted to any non-negative integer.",
      }),
      maximum: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The maximum quantity that can be set for the product.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      minimum: Schema.Number.annotate({
        description: "The minimum quantity that can be set for the product.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PortalSubscriptionUpdateProductAdjustableQuantity",
    description: "",
    identifier: "Stripeportal_subscription_update_product_adjustable_quantity",
  });
export const Stripeportal_resource_schedule_update_at_period_end_condition =
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.Literals([
        "decreasing_item_amount",
        "shortening_interval",
      ]).annotate({ description: "The type of condition." }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "PortalResourceScheduleUpdateAtPeriodEndCondition",
    description: "",
    identifier: "Stripeportal_resource_schedule_update_at_period_end_condition",
  });
export const Stripeportal_login_page = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean.annotate({
      description:
        "If `true`, a shareable `url` will be generated that will take your customers to a hosted login page for the customer portal.\n\nIf `false`, the previously generated `url`, if any, will be deactivated.",
    }),
    url: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A shareable URL to the hosted portal login page. Your customers will be able to log in with their [email](https://docs.stripe.com/api/customers/object#customer_object-email) and receive a link to their customer portal.",
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
  title: "PortalLoginPage",
  description: "",
  identifier: "Stripeportal_login_page",
});
export const Stripebilling_bill_resource_invoice_item_parents_invoice_item_subscription_parent =
  Schema.StructWithRest(
    Schema.Struct({
      subscription: Schema.String.annotate({
        description: "The subscription that generated this invoice item",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      subscription_item: Schema.optionalKey(
        Schema.String.annotate({
          description: "The subscription item that generated this invoice item",
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
    title: "BillingBillResourceInvoiceItemParentsInvoiceItemSubscriptionParent",
    description: "",
    identifier:
      "Stripebilling_bill_resource_invoice_item_parents_invoice_item_subscription_parent",
  });
export const Stripebilling_details = Schema.suspend(
  (): Schema.Codec<Stripebilling_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description: "Billing address.",
            }),
            Schema.Null,
          ]),
        ),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Email address." }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Full name." }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Billing phone number (including extension).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        tax_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Taxpayer identification number. Used only for transactions between LATAM buyers and non-LATAM sellers.",
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
      title: "billing_details",
      description: "",
      identifier: "Stripebilling_details",
    }),
);
export const Stripebilling_feedback_option = Schema.suspend(
  (): Schema.Codec<Stripebilling_feedback_option> =>
    Schema.StructWithRest(
      Schema.Struct({
        description: Schema.String.annotate({
          description:
            "An arbitrary string attached to the object. Often useful for displaying to users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
        object: Schema.Literal("billing.feedback_option").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals(["active", "inactive"]).annotate({
          description: "The feedback option's status.",
        }),
        status_transitions: Stripefeedback_options_status_transitions,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Feedback Option",
      description:
        "A feedback option is a reason you can present to customers when they cancel a\nsubscription through the customer portal. Configure the set of options a customer\ncan choose from on a [portal configuration](/api/customer_portal/configuration).\n\nRelated guide: [Customer management](/customer-management)",
      identifier: "Stripebilling.feedback_option",
    }),
);
export const Stripebilling_bill_resource_invoicing_lines_common_proration_details =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_lines_common_proration_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          credited_items: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripebilling_bill_resource_invoicing_lines_common_credited_items,
              ]).annotate({
                description:
                  "For a credit proration `line_item`, the original debit line_items to which the credit proration applies.",
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
        title: "BillingBillResourceInvoicingLinesCommonProrationDetails",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoicing_lines_common_proration_details",
      }),
  );
export const Stripebilling_credit_grants_resource_amount = Schema.suspend(
  (): Schema.Codec<Stripebilling_credit_grants_resource_amount> =>
    Schema.StructWithRest(
      Schema.Struct({
        monetary: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebilling_credit_grants_resource_monetary_amount,
            ]).annotate({ description: "The monetary amount." }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literal("monetary").annotate({
          description:
            "The type of this amount. We currently only support `monetary` billing credits.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "BillingCreditGrantsResourceAmount",
      description: "",
      identifier: "Stripebilling_credit_grants_resource_amount",
    }),
);
export const Stripebilling_credit_grants_resource_scope = Schema.suspend(
  (): Schema.Codec<Stripebilling_credit_grants_resource_scope> =>
    Schema.StructWithRest(
      Schema.Struct({
        price_type: Schema.optionalKey(
          Schema.Literal("metered").annotate({
            description:
              "The price type that credit grants can apply to. We currently only support the `metered` price type. This refers to prices that have a [Billing Meter](https://docs.stripe.com/api/billing/meter) attached to them. Cannot be used in combination with `prices`.",
          }),
        ),
        prices: Schema.optionalKey(
          Schema.Array(
            Stripebilling_credit_grants_resource_applicable_price,
          ).annotate({
            description:
              "The prices that credit grants can apply to. We currently only support `metered` prices. This refers to prices that have a [Billing Meter](https://docs.stripe.com/api/billing/meter) attached to them. Cannot be used in combination with `price_type`.",
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
      title: "BillingCreditGrantsResourceScope",
      description: "",
      identifier: "Stripebilling_credit_grants_resource_scope",
    }),
);
export const Stripebilling_clocks_resource_status_details_status_details =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_clocks_resource_status_details_status_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          advancing: Schema.optionalKey(
            Stripebilling_clocks_resource_status_details_advancing_status_details,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingClocksResourceStatusDetailsStatusDetails",
        description: "",
        identifier:
          "Stripebilling_clocks_resource_status_details_status_details",
      }),
  );
export const Stripebilling_bill_resource_invoicing_pricing_pricing =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_pricing_pricing> =>
      Schema.StructWithRest(
        Schema.Struct({
          price_details: Schema.optionalKey(
            Stripebilling_bill_resource_invoicing_pricing_pricing_price_details,
          ),
          type: Schema.Literal("price_details").annotate({
            description: "The type of the pricing details.",
          }),
          unit_amount_decimal: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The unit amount (in the `currency` specified) of the item which contains a decimal value with at most 12 decimal places.",
                format: "decimal",
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
        title: "BillingBillResourceInvoicingPricingPricing",
        description: "",
        identifier: "Stripebilling_bill_resource_invoicing_pricing_pricing",
      }),
  );
export const Stripebilling_meter = Schema.suspend(
  (): Schema.Codec<Stripebilling_meter> =>
    Schema.StructWithRest(
      Schema.Struct({
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        customer_mapping:
          Stripebilling_meter_resource_customer_mapping_settings,
        default_aggregation: Stripebilling_meter_resource_aggregation_settings,
        display_name: Schema.String.annotate({
          description: "The meter's name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        event_name: Schema.String.annotate({
          description:
            "The name of the meter event to record usage for. Corresponds with the `event_name` field on meter events.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        event_time_window: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["day", "hour"]).annotate({
              description:
                "The time window which meter events have been pre-aggregated for, if any.",
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
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("billing.meter").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals(["active", "inactive"]).annotate({
          description: "The meter's status.",
        }),
        status_transitions:
          Stripebilling_meter_resource_billing_meter_status_transitions,
        updated: Schema.Number.annotate({
          description:
            "Time at which the object was last updated. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        value_settings: Stripebilling_meter_resource_billing_meter_value,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Billing Meter",
      description:
        "Meters specify how to aggregate meter events over a billing period. Meter events represent the actions that customers take in your system. Meters attach to prices and form the basis of the bill.\n\nRelated guide: [Usage based billing](https://docs.stripe.com/billing/subscriptions/usage-based)",
      identifier: "Stripebilling.meter",
    }),
);
export const Stripeportal_subscription_pause_duration = Schema.suspend(
  (): Schema.Codec<Stripeportal_subscription_pause_duration> =>
    Schema.StructWithRest(
      Schema.Struct({
        interval_options: Schema.Array(
          Stripeportal_subscription_pause_interval_option,
        ).annotate({
          description: "The preset pause durations customers can choose from.",
        }),
        type: Schema.Literals(["indefinite", "interval_options"]).annotate({
          description:
            "Whether subscriptions can be paused indefinitely or for a preset duration.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PortalSubscriptionPauseDuration",
      description: "",
      identifier: "Stripeportal_subscription_pause_duration",
    }),
);
export const Stripeportal_subscription_update_product = Schema.suspend(
  (): Schema.Codec<Stripeportal_subscription_update_product> =>
    Schema.StructWithRest(
      Schema.Struct({
        adjustable_quantity:
          Stripeportal_subscription_update_product_adjustable_quantity,
        prices: Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "The list of price IDs which, when subscribed to, a subscription can be updated.",
        }),
        product: Schema.String.annotate({
          description: "The product ID.",
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
      title: "PortalSubscriptionUpdateProduct",
      description: "",
      identifier: "Stripeportal_subscription_update_product",
    }),
);
export const Stripeportal_resource_schedule_update_at_period_end =
  Schema.suspend(
    (): Schema.Codec<Stripeportal_resource_schedule_update_at_period_end> =>
      Schema.StructWithRest(
        Schema.Struct({
          conditions: Schema.Array(
            Stripeportal_resource_schedule_update_at_period_end_condition,
          ).annotate({
            description:
              "List of conditions. When any condition is true, an update will be scheduled at the end of the current period.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "PortalResourceScheduleUpdateAtPeriodEnd",
        description: "",
        identifier: "Stripeportal_resource_schedule_update_at_period_end",
      }),
  );
export const Stripebilling_bill_resource_invoice_item_parents_invoice_item_parent =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoice_item_parents_invoice_item_parent> =>
      Schema.StructWithRest(
        Schema.Struct({
          subscription_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripebilling_bill_resource_invoice_item_parents_invoice_item_subscription_parent,
              ]).annotate({
                description:
                  "Details about the subscription that generated this invoice item",
              }),
              Schema.Null,
            ]),
          ),
          type: Schema.Literal("subscription_details").annotate({
            description: "The type of parent that generated this invoice item",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingBillResourceInvoiceItemParentsInvoiceItemParent",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoice_item_parents_invoice_item_parent",
      }),
  );
export const Stripeportal_subscription_cancellation_reason = Schema.suspend(
  (): Schema.Codec<Stripeportal_subscription_cancellation_reason> =>
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean.annotate({
          description: "Whether the feature is enabled.",
        }),
        feedback_options: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                Stripebilling_feedback_option,
              ]),
            ).annotate({
              description:
                "The IDs of custom feedback options configured for this cancellation reason.",
            }),
            Schema.Null,
          ]),
        ),
        options: Schema.Array(
          Schema.Literals([
            "customer_service",
            "low_quality",
            "missing_features",
            "other",
            "switched_service",
            "too_complex",
            "too_expensive",
            "unused",
          ]),
        ).annotate({
          description:
            "Which cancellation reasons will be given as options to the customer.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PortalSubscriptionCancellationReason",
      description: "",
      identifier: "Stripeportal_subscription_cancellation_reason",
    }),
);
export const Stripebilling_bill_resource_invoicing_taxes_tax_rate_details =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_taxes_tax_rate_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          tax_rate: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripetax_rate,
          ]).annotate({ description: "ID of the tax rate" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingBillResourceInvoicingTaxesTaxRateDetails",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoicing_taxes_tax_rate_details",
      }),
  );
export const Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_invoice_item_parent =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_invoice_item_parent> =>
      Schema.StructWithRest(
        Schema.Struct({
          invoice_item: Schema.String.annotate({
            description: "The invoice item that generated this line item",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          proration: Schema.Boolean.annotate({
            description: "Whether this is a proration",
          }),
          proration_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripebilling_bill_resource_invoicing_lines_common_proration_details,
              ]).annotate({
                description: "Additional details for proration line items",
              }),
              Schema.Null,
            ]),
          ),
          subscription: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The subscription that the invoice item belongs to",
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
          "BillingBillResourceInvoicingLinesParentsInvoiceLineItemInvoiceItemParent",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_invoice_item_parent",
      }),
  );
export const Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_subscription_item_parent =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_subscription_item_parent> =>
      Schema.StructWithRest(
        Schema.Struct({
          invoice_item: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The invoice item that generated this line item",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          proration: Schema.Boolean.annotate({
            description: "Whether this is a proration",
          }),
          proration_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripebilling_bill_resource_invoicing_lines_common_proration_details,
              ]).annotate({
                description: "Additional details for proration line items",
              }),
              Schema.Null,
            ]),
          ),
          subscription: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The subscription that the subscription item belongs to",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          subscription_item: Schema.String.annotate({
            description: "The subscription item that generated this line item",
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
        title:
          "BillingBillResourceInvoicingLinesParentsInvoiceLineItemSubscriptionItemParent",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_subscription_item_parent",
      }),
  );
export const Stripebilling_credit_grants_resource_applicability_config =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_credit_grants_resource_applicability_config> =>
      Schema.StructWithRest(
        Schema.Struct({ scope: Stripebilling_credit_grants_resource_scope }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingCreditGrantsResourceApplicabilityConfig",
        description: "",
        identifier: "Stripebilling_credit_grants_resource_applicability_config",
      }),
  );
export const Stripeportal_subscription_pause = Schema.suspend(
  (): Schema.Codec<Stripeportal_subscription_pause> =>
    Schema.StructWithRest(
      Schema.Struct({
        duration: Stripeportal_subscription_pause_duration,
        enabled: Schema.Boolean.annotate({
          description:
            "Whether the feature is enabled. Customers can only pause subscriptions in the [redesigned customer portal](/customer-management).",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PortalSubscriptionPause",
      description: "",
      identifier: "Stripeportal_subscription_pause",
    }),
);
export const Stripeportal_subscription_update = Schema.suspend(
  (): Schema.Codec<Stripeportal_subscription_update> =>
    Schema.StructWithRest(
      Schema.Struct({
        billing_cycle_anchor: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["now", "unchanged"]).annotate({
              description:
                "Determines the value to use for the billing cycle anchor on subscription updates. Valid values are `now` or `unchanged`, and the default value is `unchanged`. Setting the value to `now` resets the subscription's billing cycle anchor to the current time (in UTC). For more information, see the billing cycle [documentation](https://docs.stripe.com/billing/subscriptions/billing-cycle).",
            }),
            Schema.Null,
          ]),
        ),
        default_allowed_updates: Schema.Array(
          Schema.Literals(["price", "promotion_code", "quantity"]),
        ).annotate({
          description:
            "The types of subscription updates that are supported for items listed in the `products` attribute. When empty, subscriptions are not updateable.",
        }),
        enabled: Schema.Boolean.annotate({
          description: "Whether the feature is enabled.",
        }),
        products: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripeportal_subscription_update_product).annotate({
              description:
                "The list of up to 10 products that support subscription updates.",
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
            "Determines how to handle prorations resulting from subscription updates. Valid values are `none`, `create_prorations`, and `always_invoice`. Defaults to a value of `none` if you don't set it during creation.",
        }),
        schedule_at_period_end:
          Stripeportal_resource_schedule_update_at_period_end,
        trial_update_behavior: Schema.Literals([
          "continue_trial",
          "end_trial",
        ]).annotate({
          description:
            "Determines how handle updates to trialing subscriptions. Valid values are `end_trial` and `continue_trial`. Defaults to a value of `end_trial` if you don't set it during creation.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PortalSubscriptionUpdate",
      description: "",
      identifier: "Stripeportal_subscription_update",
    }),
);
export const Stripeportal_subscription_cancel = Schema.suspend(
  (): Schema.Codec<Stripeportal_subscription_cancel> =>
    Schema.StructWithRest(
      Schema.Struct({
        cancellation_reason: Stripeportal_subscription_cancellation_reason,
        enabled: Schema.Boolean.annotate({
          description: "Whether the feature is enabled.",
        }),
        mode: Schema.Literals(["at_period_end", "immediately"]).annotate({
          description:
            "Whether to cancel subscriptions immediately or at the end of the billing period.",
        }),
        proration_behavior: Schema.Literals([
          "always_invoice",
          "create_prorations",
          "none",
        ]).annotate({
          description:
            "Whether to create prorations when canceling subscriptions. Possible values are `none` and `create_prorations`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PortalSubscriptionCancel",
      description: "",
      identifier: "Stripeportal_subscription_cancel",
    }),
);
export const Stripebilling_bill_resource_invoicing_taxes_tax = Schema.suspend(
  (): Schema.Codec<Stripebilling_bill_resource_invoicing_taxes_tax> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "The amount of the tax, in cents (or local equivalent).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        tax_behavior: Schema.Literals(["exclusive", "inclusive"]).annotate({
          description: "Whether this tax is inclusive or exclusive.",
        }),
        tax_rate_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripebilling_bill_resource_invoicing_taxes_tax_rate_details,
            ]).annotate({
              description:
                "Additional details about the tax rate. Only present when `type` is `tax_rate_details`.",
            }),
            Schema.Null,
          ]),
        ),
        taxability_reason: Schema.Literals([
          "customer_exempt",
          "not_available",
          "not_collecting",
          "not_subject_to_tax",
          "not_supported",
          "portion_product_exempt",
          "portion_reduced_rated",
          "portion_standard_rated",
          "product_exempt",
          "product_exempt_holiday",
          "proportionally_rated",
          "reduced_rated",
          "reverse_charge",
          "standard_rated",
          "taxable_basis_reduced",
          "zero_rated",
        ]).annotate({
          description:
            "The reasoning behind this tax, for example, if the product is tax exempt. The possible values for this field may be extended as new tax rules are supported.",
        }),
        taxable_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount on which tax is calculated, in cents (or local equivalent).",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        type: Schema.Literal("tax_rate_details").annotate({
          description: "The type of tax information.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "BillingBillResourceInvoicingTaxesTax",
      description: "",
      identifier: "Stripebilling_bill_resource_invoicing_taxes_tax",
    }),
);
export const Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_parent =
  Schema.suspend(
    (): Schema.Codec<Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_parent> =>
      Schema.StructWithRest(
        Schema.Struct({
          invoice_item_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_invoice_item_parent,
              ]).annotate({
                description:
                  "Details about the invoice item that generated this line item",
              }),
              Schema.Null,
            ]),
          ),
          subscription_item_details: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_subscription_item_parent,
              ]).annotate({
                description:
                  "Details about the subscription item that generated this line item",
              }),
              Schema.Null,
            ]),
          ),
          type: Schema.Literals([
            "invoice_item_details",
            "subscription_item_details",
          ]).annotate({
            description: "The type of parent that generated this line item",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BillingBillResourceInvoicingLinesParentsInvoiceLineItemParent",
        description: "",
        identifier:
          "Stripebilling_bill_resource_invoicing_lines_parents_invoice_line_item_parent",
      }),
  );
export const Stripebilling_alert = Schema.suspend(
  (): Schema.Codec<Stripebilling_alert> =>
    Schema.StructWithRest(
      Schema.Struct({
        alert_type: Schema.Literal("usage_threshold").annotate({
          description: "Defines the type of the alert.",
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
        object: Schema.Literal("billing.alert").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["active", "archived", "inactive"]).annotate({
              description:
                "Status of the alert. This can be active, inactive or archived.",
            }),
            Schema.Null,
          ]),
        ),
        title: Schema.String.annotate({
          description: "Title of the alert.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        usage_threshold: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripethresholds_resource_usage_threshold_config,
            ]).annotate({
              description:
                "Encapsulates configuration of the alert to monitor usage on a specific [Billing Meter](https://docs.stripe.com/api/billing/meter).",
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
      title: "Alert",
      description:
        "A billing alert is a resource that notifies you when a certain usage threshold on a meter is crossed. For example, you might create a billing alert to notify you when a certain user made 100 API requests.",
      identifier: "Stripebilling.alert",
    }),
);
export const Stripeportal_features = Schema.suspend(
  (): Schema.Codec<Stripeportal_features> =>
    Schema.StructWithRest(
      Schema.Struct({
        customer_update: Stripeportal_customer_update,
        invoice_history: Stripeportal_invoice_list,
        payment_method_update: Stripeportal_payment_method_update,
        subscription_cancel: Stripeportal_subscription_cancel,
        subscription_pause: Stripeportal_subscription_pause,
        subscription_update: Stripeportal_subscription_update,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "PortalFeatures",
      description: "",
      identifier: "Stripeportal_features",
    }),
);
export const Stripebilling_portal_configuration = Schema.suspend(
  (): Schema.Codec<Stripebilling_portal_configuration> =>
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.Boolean.annotate({
          description:
            "Whether the configuration is active and can be used to create portal sessions.",
        }),
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
                "ID of the Connect Application that created the configuration.",
            }),
            Schema.Null,
          ]),
        ),
        business_profile: Stripeportal_business_profile,
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        default_return_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The default URL to redirect customers to when they click on the portal's link to return to your website. This can be [overridden](https://docs.stripe.com/api/customer_portal/sessions/create#create_portal_session-return_url) when creating the session.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        features: Stripeportal_features,
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        is_default: Schema.Boolean.annotate({
          description:
            "Whether the configuration is the default. If `true`, this configuration can be managed in the Dashboard and portal sessions will use this configuration unless it is overriden when creating the session.",
        }),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        login_page: Stripeportal_login_page,
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
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The name of the configuration.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("billing_portal.configuration").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        updated: Schema.Number.annotate({
          description:
            "Time at which the object was last updated. Measured in seconds since the Unix epoch.",
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
      title: "Customer portal configuration",
      description:
        "A portal configuration describes the functionality and behavior you embed in a portal session. Related guide: [Configure the customer portal](/customer-management/configure-portal).",
      identifier: "Stripebilling_portal.configuration",
    }),
);
