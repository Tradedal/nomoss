// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripesubscription_schedule } from "./models/subscriptions.js";

export type GetSubscriptionSchedulesInput = {
  readonly canceled_at?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly completed_at?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly released_at?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly scheduled?: boolean;
  readonly starting_after?: string;
};
export type GetSubscriptionSchedulesOutput = {
  readonly data: ReadonlyArray<Stripesubscription_schedule>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetSubscriptionSchedulesError = Stripeerror;
export type PostSubscriptionSchedulesInput = {
  readonly billing_mode?: {
    readonly flexible?: {
      readonly proration_discounts?: "included" | "itemized";
    } & { readonly [x: string]: Schema.Json };
    readonly type: "classic" | "flexible";
  } & { readonly [x: string]: Schema.Json };
  readonly customer?: string;
  readonly customer_account?: string;
  readonly default_settings?: {
    readonly application_fee_percent?: number;
    readonly automatic_tax?: {
      readonly enabled: boolean;
      readonly liability?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly billing_cycle_anchor?: "automatic" | "phase_start";
    readonly billing_thresholds?:
      | ({
          readonly amount_gte?: number;
          readonly reset_billing_cycle_anchor?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly collection_method?: "charge_automatically" | "send_invoice";
    readonly default_payment_method?: string;
    readonly description?: string | "";
    readonly invoice_settings?: {
      readonly account_tax_ids?: ReadonlyArray<string> | "";
      readonly custom_fields?:
        | ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >
        | "";
      readonly days_until_due?: number;
      readonly description?: string | "";
      readonly footer?: string | "";
      readonly issuer?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly on_behalf_of?: string | "";
    readonly transfer_data?:
      | ({ readonly amount_percent?: number; readonly destination: string } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly end_behavior?: "cancel" | "none" | "release" | "renew";
  readonly expand?: ReadonlyArray<string>;
  readonly from_subscription?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly pause_schedules?: ReadonlyArray<
    {
      readonly key?: string;
      readonly pause?: {
        readonly pause_at: {
          readonly timestamp?: number;
          readonly type: "now" | "timestamp";
        } & { readonly [x: string]: Schema.Json };
        readonly settings?: {
          readonly bill_for?: {
            readonly outstanding_usage_through?: {
              readonly type?: "none" | "pause_at";
            } & { readonly [x: string]: Schema.Json };
            readonly unused_time_from?: {
              readonly type?: "item_current_period_start" | "none" | "pause_at";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json };
          readonly invoicing_behavior?: "invoice" | "pending_invoice_item";
          readonly type?: "subscription";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly resume?: {
        readonly resume_at: {
          readonly duration?: {
            readonly interval: "day" | "month" | "week" | "year";
            readonly interval_count?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly timestamp?: number;
          readonly type: "duration" | "now" | "timestamp";
        } & { readonly [x: string]: Schema.Json };
        readonly settings?: {
          readonly billing_cycle_anchor?: "resume_at" | "unchanged";
          readonly payment_behavior?:
            | "resume_on_payment_attempt"
            | "resume_on_payment_success";
          readonly proration_behavior?:
            | "always_invoice"
            | "create_prorations"
            | "none";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly phases?: ReadonlyArray<
    {
      readonly add_invoice_items?: ReadonlyArray<
        {
          readonly discountable?: boolean;
          readonly discounts?: ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >;
          readonly metadata?: { readonly [x: string]: string };
          readonly period?: {
            readonly end: {
              readonly timestamp?: number;
              readonly type: "min_item_period_end" | "phase_end" | "timestamp";
            } & { readonly [x: string]: Schema.Json };
            readonly start: {
              readonly timestamp?: number;
              readonly type:
                | "max_item_period_start"
                | "phase_start"
                | "timestamp";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json };
          readonly price?: string;
          readonly price_data?: {
            readonly currency: string;
            readonly product: string;
            readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
            readonly unit_amount?: number;
            readonly unit_amount_decimal?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly quantity?: number;
          readonly tax_rates?: ReadonlyArray<string> | "";
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly application_fee_percent?: number;
      readonly automatic_tax?: {
        readonly enabled: boolean;
        readonly liability?: {
          readonly account?: string;
          readonly type: "account" | "self";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly billing_cycle_anchor?: "automatic" | "phase_start";
      readonly billing_thresholds?:
        | ({
            readonly amount_gte?: number;
            readonly reset_billing_cycle_anchor?: boolean;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly collection_method?: "charge_automatically" | "send_invoice";
      readonly currency?: string;
      readonly default_payment_method?: string;
      readonly default_tax_rates?: ReadonlyArray<string> | "";
      readonly description?: string | "";
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly duration?: {
        readonly interval: "day" | "month" | "week" | "year";
        readonly interval_count?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly end_date?: number;
      readonly invoice_settings?: {
        readonly account_tax_ids?: ReadonlyArray<string> | "";
        readonly custom_fields?:
          | ReadonlyArray<
              { readonly name: string; readonly value: string } & {
                readonly [x: string]: Schema.Json;
              }
            >
          | "";
        readonly days_until_due?: number;
        readonly description?: string | "";
        readonly footer?: string | "";
        readonly issuer?: {
          readonly account?: string;
          readonly type: "account" | "self";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly items: ReadonlyArray<
        {
          readonly billing_thresholds?:
            | ({ readonly usage_gte: number } & {
                readonly [x: string]: Schema.Json;
              })
            | "";
          readonly discounts?:
            | ReadonlyArray<
                {
                  readonly coupon?: string;
                  readonly discount?: string;
                  readonly promotion_code?: string;
                } & { readonly [x: string]: Schema.Json }
              >
            | "";
          readonly metadata?: { readonly [x: string]: string };
          readonly price?: string;
          readonly price_data?: {
            readonly currency: string;
            readonly product: string;
            readonly recurring: {
              readonly interval: "day" | "month" | "week" | "year";
              readonly interval_count?: number;
            } & { readonly [x: string]: Schema.Json };
            readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
            readonly unit_amount?: number;
            readonly unit_amount_decimal?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly quantity?: number;
          readonly tax_rates?: ReadonlyArray<string> | "";
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly metadata?: { readonly [x: string]: string };
      readonly on_behalf_of?: string;
      readonly proration_behavior?:
        | "always_invoice"
        | "create_prorations"
        | "none";
      readonly transfer_data?: {
        readonly amount_percent?: number;
        readonly destination: string;
      } & { readonly [x: string]: Schema.Json };
      readonly trial?: boolean;
      readonly trial_end?: number;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly start_date?: number | "now";
};
export type PostSubscriptionSchedulesOutput = Stripesubscription_schedule;
export type PostSubscriptionSchedulesError = Stripeerror;
export type GetSubscriptionSchedulesScheduleInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly schedule: string;
};
export type GetSubscriptionSchedulesScheduleOutput =
  Stripesubscription_schedule;
export type GetSubscriptionSchedulesScheduleError = Stripeerror;
export type PostSubscriptionSchedulesScheduleInput = {
  readonly default_settings?: {
    readonly application_fee_percent?: number;
    readonly automatic_tax?: {
      readonly enabled: boolean;
      readonly liability?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly billing_cycle_anchor?: "automatic" | "phase_start";
    readonly billing_thresholds?:
      | ({
          readonly amount_gte?: number;
          readonly reset_billing_cycle_anchor?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly collection_method?: "charge_automatically" | "send_invoice";
    readonly default_payment_method?: string;
    readonly description?: string | "";
    readonly invoice_settings?: {
      readonly account_tax_ids?: ReadonlyArray<string> | "";
      readonly custom_fields?:
        | ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >
        | "";
      readonly days_until_due?: number;
      readonly description?: string | "";
      readonly footer?: string | "";
      readonly issuer?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly on_behalf_of?: string | "";
    readonly transfer_data?:
      | ({ readonly amount_percent?: number; readonly destination: string } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly end_behavior?: "cancel" | "none" | "release" | "renew";
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly pause_schedules?:
    | ReadonlyArray<
        {
          readonly key?: string;
          readonly pause?: {
            readonly pause_at?: {
              readonly timestamp?: number;
              readonly type: "now" | "timestamp";
            } & { readonly [x: string]: Schema.Json };
            readonly settings?: {
              readonly bill_for?: {
                readonly outstanding_usage_through?: {
                  readonly type?: "none" | "pause_at";
                } & { readonly [x: string]: Schema.Json };
                readonly unused_time_from?: {
                  readonly type?:
                    | "item_current_period_start"
                    | "none"
                    | "pause_at";
                } & { readonly [x: string]: Schema.Json };
              } & { readonly [x: string]: Schema.Json };
              readonly invoicing_behavior?: "invoice" | "pending_invoice_item";
              readonly type?: "subscription";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json };
          readonly resume?:
            | ({
                readonly resume_at?: {
                  readonly duration?: {
                    readonly interval: "day" | "month" | "week" | "year";
                    readonly interval_count?: number;
                  } & { readonly [x: string]: Schema.Json };
                  readonly timestamp?: number;
                  readonly type: "duration" | "now" | "timestamp";
                } & { readonly [x: string]: Schema.Json };
                readonly settings?: {
                  readonly billing_cycle_anchor?: "resume_at" | "unchanged";
                  readonly payment_behavior?:
                    | "resume_on_payment_attempt"
                    | "resume_on_payment_success";
                  readonly proration_behavior?:
                    | "always_invoice"
                    | "create_prorations"
                    | "none";
                } & { readonly [x: string]: Schema.Json };
              } & { readonly [x: string]: Schema.Json })
            | "";
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly phases?: ReadonlyArray<
    {
      readonly add_invoice_items?: ReadonlyArray<
        {
          readonly discountable?: boolean;
          readonly discounts?: ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >;
          readonly metadata?: { readonly [x: string]: string };
          readonly period?: {
            readonly end: {
              readonly timestamp?: number;
              readonly type: "min_item_period_end" | "phase_end" | "timestamp";
            } & { readonly [x: string]: Schema.Json };
            readonly start: {
              readonly timestamp?: number;
              readonly type:
                | "max_item_period_start"
                | "phase_start"
                | "timestamp";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json };
          readonly price?: string;
          readonly price_data?: {
            readonly currency: string;
            readonly product: string;
            readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
            readonly unit_amount?: number;
            readonly unit_amount_decimal?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly quantity?: number;
          readonly tax_rates?: ReadonlyArray<string> | "";
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly application_fee_percent?: number;
      readonly automatic_tax?: {
        readonly enabled: boolean;
        readonly liability?: {
          readonly account?: string;
          readonly type: "account" | "self";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly billing_cycle_anchor?: "automatic" | "phase_start";
      readonly billing_thresholds?:
        | ({
            readonly amount_gte?: number;
            readonly reset_billing_cycle_anchor?: boolean;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly collection_method?: "charge_automatically" | "send_invoice";
      readonly default_payment_method?: string;
      readonly default_tax_rates?: ReadonlyArray<string> | "";
      readonly description?: string | "";
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly duration?: {
        readonly interval: "day" | "month" | "week" | "year";
        readonly interval_count?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly end_date?: number | "now";
      readonly invoice_settings?: {
        readonly account_tax_ids?: ReadonlyArray<string> | "";
        readonly custom_fields?:
          | ReadonlyArray<
              { readonly name: string; readonly value: string } & {
                readonly [x: string]: Schema.Json;
              }
            >
          | "";
        readonly days_until_due?: number;
        readonly description?: string | "";
        readonly footer?: string | "";
        readonly issuer?: {
          readonly account?: string;
          readonly type: "account" | "self";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly items: ReadonlyArray<
        {
          readonly billing_thresholds?:
            | ({ readonly usage_gte: number } & {
                readonly [x: string]: Schema.Json;
              })
            | "";
          readonly discounts?:
            | ReadonlyArray<
                {
                  readonly coupon?: string;
                  readonly discount?: string;
                  readonly promotion_code?: string;
                } & { readonly [x: string]: Schema.Json }
              >
            | "";
          readonly metadata?: { readonly [x: string]: string };
          readonly price?: string;
          readonly price_data?: {
            readonly currency: string;
            readonly product: string;
            readonly recurring: {
              readonly interval: "day" | "month" | "week" | "year";
              readonly interval_count?: number;
            } & { readonly [x: string]: Schema.Json };
            readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
            readonly unit_amount?: number;
            readonly unit_amount_decimal?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly quantity?: number;
          readonly tax_rates?: ReadonlyArray<string> | "";
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly metadata?: { readonly [x: string]: string };
      readonly on_behalf_of?: string;
      readonly proration_behavior?:
        | "always_invoice"
        | "create_prorations"
        | "none";
      readonly start_date?: number | "now";
      readonly transfer_data?: {
        readonly amount_percent?: number;
        readonly destination: string;
      } & { readonly [x: string]: Schema.Json };
      readonly trial?: boolean;
      readonly trial_end?: number | "now";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
  readonly schedule: string;
};
export type PostSubscriptionSchedulesScheduleOutput =
  Stripesubscription_schedule;
export type PostSubscriptionSchedulesScheduleError = Stripeerror;
export type PostSubscriptionSchedulesScheduleCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoice_now?: boolean;
  readonly prorate?: boolean;
  readonly schedule: string;
};
export type PostSubscriptionSchedulesScheduleCancelOutput =
  Stripesubscription_schedule;
export type PostSubscriptionSchedulesScheduleCancelError = Stripeerror;
export type PostSubscriptionSchedulesScheduleReleaseInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly preserve_cancel_date?: boolean;
  readonly schedule: string;
};
export type PostSubscriptionSchedulesScheduleReleaseOutput =
  Stripesubscription_schedule;
export type PostSubscriptionSchedulesScheduleReleaseError = Stripeerror;

export const GetSubscriptionSchedulesInput = Schema.Struct({
  canceled_at: Schema.optionalKey(
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
  completed_at: Schema.optionalKey(
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
  customer: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
  released_at: Schema.optionalKey(
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
  scheduled: Schema.optionalKey(Schema.Boolean),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetSubscriptionSchedulesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripesubscription_schedule),
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
          new globalThis.RegExp("^\\/v1\\/subscription_schedules", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/subscription_schedules",
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
  title: "SubscriptionSchedulesResourceScheduleList",
  description: "",
});
export const GetSubscriptionSchedulesError = Stripeerror;
export const PostSubscriptionSchedulesInput = Schema.Struct({
  billing_mode: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        flexible: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              proration_discounts: Schema.optionalKey(
                Schema.Literals(["included", "itemized"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "flexible_params" }),
        ),
        type: Schema.Literals(["classic", "flexible"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "billing_mode",
      description:
        "Controls how prorations and invoices for subscriptions are calculated and orchestrated.",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the customer to create the subscription schedule for.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the account to create the subscription schedule for.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  default_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        application_fee_percent: Schema.optionalKey(Schema.Finite),
        automatic_tax: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              enabled: Schema.Boolean,
              liability: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "automatic_tax_config" }),
        ),
        billing_cycle_anchor: Schema.optionalKey(
          Schema.Literals(["automatic", "phase_start"]),
        ),
        billing_thresholds: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                amount_gte: Schema.optionalKey(Schema.Int),
                reset_billing_cycle_anchor: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "billing_thresholds_param" }),
            Schema.Literal(""),
          ]),
        ),
        collection_method: Schema.optionalKey(
          Schema.Literals(["charge_automatically", "send_invoice"]),
        ),
        default_payment_method: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(500).annotate({
                expected: "a string with at most 500 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        invoice_settings: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_tax_ids: Schema.optionalKey(
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
              custom_fields: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        name: Schema.String.check(
                          Schema.isMaxCodePoints(40).annotate({
                            expected: "a string with at most 40 code points",
                          }),
                        ),
                        value: Schema.String.check(
                          Schema.isMaxCodePoints(140).annotate({
                            expected: "a string with at most 140 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "custom_field_params" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              days_until_due: Schema.optionalKey(Schema.Int),
              description: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(1500).annotate({
                      expected: "a string with at most 1500 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              footer: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              issuer: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "subscription_schedule_default_settings_param" }),
        ),
        on_behalf_of: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                amount_percent: Schema.optionalKey(Schema.Finite),
                destination: Schema.String,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "transfer_data_specs" }),
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
      title: "default_settings_params",
      description:
        "Object representing the subscription schedule's default settings.",
    }),
  ),
  end_behavior: Schema.optionalKey(
    Schema.Literals(["cancel", "none", "release", "renew"]).annotate({
      description:
        "Behavior of the subscription schedule and underlying subscription when it ends. Possible values are `release` or `cancel` with the default being `release`. `release` will end the subscription schedule and keep the underlying subscription running. `cancel` will end the subscription schedule and cancel the underlying subscription.",
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
  from_subscription: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Migrate an existing subscription to be managed by a subscription schedule. If this parameter is set, a subscription schedule will be created using the subscription's item(s), set to auto-renew using the subscription's interval. When using this parameter, other parameters (such as phase values) cannot be set. To create a subscription schedule with other modifications, we recommend making two separate API calls.",
    }).check(
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
  pause_schedules: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          key: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(40).annotate({
                expected: "a string with at most 40 code points",
              }),
            ),
          ),
          pause: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                pause_at: Schema.StructWithRest(
                  Schema.Struct({
                    timestamp: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    type: Schema.Literals(["now", "timestamp"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "pause_at_params" }),
                settings: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      bill_for: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            outstanding_usage_through: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  type: Schema.optionalKey(
                                    Schema.Literals(["none", "pause_at"]),
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
                                title:
                                  "pause_settings_bill_for_outstanding_usage_through_params",
                              }),
                            ),
                            unused_time_from: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  type: Schema.optionalKey(
                                    Schema.Literals([
                                      "item_current_period_start",
                                      "none",
                                      "pause_at",
                                    ]),
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
                                title:
                                  "pause_settings_bill_for_unused_time_from_params",
                              }),
                            ),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "pause_settings_bill_for_params" }),
                      ),
                      invoicing_behavior: Schema.optionalKey(
                        Schema.Literals(["invoice", "pending_invoice_item"]),
                      ),
                      type: Schema.optionalKey(Schema.Literal("subscription")),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "pause_settings_params" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "pause_schedule_create_pause_params" }),
          ),
          resume: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                resume_at: Schema.StructWithRest(
                  Schema.Struct({
                    duration: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          interval: Schema.Literals([
                            "day",
                            "month",
                            "week",
                            "year",
                          ]),
                          interval_count: Schema.optionalKey(Schema.Int),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "resume_at_duration_params" }),
                    ),
                    timestamp: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    type: Schema.Literals(["duration", "now", "timestamp"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "resume_at_params" }),
                settings: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      billing_cycle_anchor: Schema.optionalKey(
                        Schema.Literals(["resume_at", "unchanged"]),
                      ),
                      payment_behavior: Schema.optionalKey(
                        Schema.Literals([
                          "resume_on_payment_attempt",
                          "resume_on_payment_success",
                        ]),
                      ),
                      proration_behavior: Schema.optionalKey(
                        Schema.Literals([
                          "always_invoice",
                          "create_prorations",
                          "none",
                        ]),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "resume_settings_params" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "pause_schedule_create_resume_params" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "pause_schedules_create_params" }),
    ).annotate({
      description:
        "Configures the subscription's pause behavior and, optionally, its resume behavior. Only one entry is supported.",
    }),
  ),
  phases: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          add_invoice_items: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  discountable: Schema.optionalKey(Schema.Boolean),
                  discounts: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          coupon: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          discount: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          promotion_code: Schema.optionalKey(
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
                      ).annotate({ title: "discounts_data_param" }),
                    ),
                  ),
                  metadata: Schema.optionalKey(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  period: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        end: Schema.StructWithRest(
                          Schema.Struct({
                            timestamp: Schema.optionalKey(
                              Schema.Number.annotate({
                                format: "unix-time",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
                                }),
                              ),
                            ),
                            type: Schema.Literals([
                              "min_item_period_end",
                              "phase_end",
                              "timestamp",
                            ]),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "invoice_item_period_end" }),
                        start: Schema.StructWithRest(
                          Schema.Struct({
                            timestamp: Schema.optionalKey(
                              Schema.Number.annotate({
                                format: "unix-time",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
                                }),
                              ),
                            ),
                            type: Schema.Literals([
                              "max_item_period_start",
                              "phase_start",
                              "timestamp",
                            ]),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "invoice_item_period_start" }),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "invoice_item_period" }),
                  ),
                  price: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  price_data: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        currency: Schema.String.annotate({
                          format: "currency",
                        }),
                        product: Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        tax_behavior: Schema.optionalKey(
                          Schema.Literals([
                            "exclusive",
                            "inclusive",
                            "unspecified",
                          ]),
                        ),
                        unit_amount: Schema.optionalKey(Schema.Int),
                        unit_amount_decimal: Schema.optionalKey(
                          Schema.String.annotate({ format: "decimal" }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "one_time_price_data_with_negative_amounts",
                    }),
                  ),
                  quantity: Schema.optionalKey(Schema.Int),
                  tax_rates: Schema.optionalKey(
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
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "add_invoice_item_entry" }),
            ),
          ),
          application_fee_percent: Schema.optionalKey(Schema.Finite),
          automatic_tax: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                liability: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      account: Schema.optionalKey(Schema.String),
                      type: Schema.Literals(["account", "self"]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "automatic_tax_config" }),
          ),
          billing_cycle_anchor: Schema.optionalKey(
            Schema.Literals(["automatic", "phase_start"]),
          ),
          billing_thresholds: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  amount_gte: Schema.optionalKey(Schema.Int),
                  reset_billing_cycle_anchor: Schema.optionalKey(
                    Schema.Boolean,
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "billing_thresholds_param" }),
              Schema.Literal(""),
            ]),
          ),
          collection_method: Schema.optionalKey(
            Schema.Literals(["charge_automatically", "send_invoice"]),
          ),
          currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
          default_payment_method: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          default_tax_rates: Schema.optionalKey(
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
          description: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          discounts: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.StructWithRest(
                  Schema.Struct({
                    coupon: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    discount: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    promotion_code: Schema.optionalKey(
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
                ).annotate({ title: "schedule_discounts_data_param" }),
              ),
              Schema.Literal(""),
            ]),
          ),
          duration: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                interval: Schema.Literals(["day", "month", "week", "year"]),
                interval_count: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "duration_params" }),
          ),
          end_date: Schema.optionalKey(
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
          ),
          invoice_settings: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                account_tax_ids: Schema.optionalKey(
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
                custom_fields: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          name: Schema.String.check(
                            Schema.isMaxCodePoints(40).annotate({
                              expected: "a string with at most 40 code points",
                            }),
                          ),
                          value: Schema.String.check(
                            Schema.isMaxCodePoints(140).annotate({
                              expected: "a string with at most 140 code points",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "custom_field_params" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                days_until_due: Schema.optionalKey(Schema.Int),
                description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(1500).annotate({
                        expected: "a string with at most 1500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                footer: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                issuer: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      account: Schema.optionalKey(Schema.String),
                      type: Schema.Literals(["account", "self"]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "schedule_phase_invoice_settings" }),
          ),
          items: Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                billing_thresholds: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({ usage_gte: Schema.Int }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "item_billing_thresholds_param" }),
                    Schema.Literal(""),
                  ]),
                ),
                discounts: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          coupon: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          discount: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          promotion_code: Schema.optionalKey(
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
                      ).annotate({ title: "schedule_discounts_data_param" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                metadata: Schema.optionalKey(
                  Schema.Record(Schema.String, Schema.String),
                ),
                price: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                price_data: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      currency: Schema.String.annotate({ format: "currency" }),
                      product: Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                      recurring: Schema.StructWithRest(
                        Schema.Struct({
                          interval: Schema.Literals([
                            "day",
                            "month",
                            "week",
                            "year",
                          ]),
                          interval_count: Schema.optionalKey(Schema.Int),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "recurring_adhoc" }),
                      tax_behavior: Schema.optionalKey(
                        Schema.Literals([
                          "exclusive",
                          "inclusive",
                          "unspecified",
                        ]),
                      ),
                      unit_amount: Schema.optionalKey(Schema.Int),
                      unit_amount_decimal: Schema.optionalKey(
                        Schema.String.annotate({ format: "decimal" }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "recurring_price_data" }),
                ),
                quantity: Schema.optionalKey(Schema.Int),
                tax_rates: Schema.optionalKey(
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
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "configuration_item_params" }),
          ),
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          on_behalf_of: Schema.optionalKey(Schema.String),
          proration_behavior: Schema.optionalKey(
            Schema.Literals(["always_invoice", "create_prorations", "none"]),
          ),
          transfer_data: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount_percent: Schema.optionalKey(Schema.Finite),
                destination: Schema.String,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "transfer_data_specs" }),
          ),
          trial: Schema.optionalKey(Schema.Boolean),
          trial_end: Schema.optionalKey(
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "phase_configuration_params" }),
    ).annotate({
      description:
        "List representing phases of the subscription schedule. Each phase can be customized to have different durations, plans, and coupons. If there are multiple phases, the `end_date` of one phase will always equal the `start_date` of the next phase.",
    }),
  ),
  start_date: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Literal("now"),
    ]).annotate({
      description:
        "When the subscription schedule starts. We recommend using `now` so that it starts the subscription immediately, and to avoid unexpected behavior due to request delays or clock skew resulting in a slightly backdated or postdated start. You can also use a Unix timestamp to backdate the subscription so that it starts on a past date, or set a future date for the subscription to start on.",
    }),
  ),
});
export const PostSubscriptionSchedulesOutput = Stripesubscription_schedule;
export const PostSubscriptionSchedulesError = Stripeerror;
export const GetSubscriptionSchedulesScheduleInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  schedule: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetSubscriptionSchedulesScheduleOutput =
  Stripesubscription_schedule;
export const GetSubscriptionSchedulesScheduleError = Stripeerror;
export const PostSubscriptionSchedulesScheduleInput = Schema.Struct({
  default_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        application_fee_percent: Schema.optionalKey(Schema.Finite),
        automatic_tax: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              enabled: Schema.Boolean,
              liability: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "automatic_tax_config" }),
        ),
        billing_cycle_anchor: Schema.optionalKey(
          Schema.Literals(["automatic", "phase_start"]),
        ),
        billing_thresholds: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                amount_gte: Schema.optionalKey(Schema.Int),
                reset_billing_cycle_anchor: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "billing_thresholds_param" }),
            Schema.Literal(""),
          ]),
        ),
        collection_method: Schema.optionalKey(
          Schema.Literals(["charge_automatically", "send_invoice"]),
        ),
        default_payment_method: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(500).annotate({
                expected: "a string with at most 500 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        invoice_settings: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_tax_ids: Schema.optionalKey(
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
              custom_fields: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        name: Schema.String.check(
                          Schema.isMaxCodePoints(40).annotate({
                            expected: "a string with at most 40 code points",
                          }),
                        ),
                        value: Schema.String.check(
                          Schema.isMaxCodePoints(140).annotate({
                            expected: "a string with at most 140 code points",
                          }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "custom_field_params" }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              days_until_due: Schema.optionalKey(Schema.Int),
              description: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(1500).annotate({
                      expected: "a string with at most 1500 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              footer: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              issuer: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account: Schema.optionalKey(Schema.String),
                    type: Schema.Literals(["account", "self"]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "param" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "subscription_schedule_default_settings_param" }),
        ),
        on_behalf_of: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                amount_percent: Schema.optionalKey(Schema.Finite),
                destination: Schema.String,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "transfer_data_specs" }),
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
      title: "default_settings_params",
      description:
        "Object representing the subscription schedule's default settings.",
    }),
  ),
  end_behavior: Schema.optionalKey(
    Schema.Literals(["cancel", "none", "release", "renew"]).annotate({
      description:
        "Behavior of the subscription schedule and underlying subscription when it ends. Possible values are `release` or `cancel` with the default being `release`. `release` will end the subscription schedule and keep the underlying subscription running. `cancel` will end the subscription schedule and cancel the underlying subscription.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  pause_schedules: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            key: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(40).annotate({
                  expected: "a string with at most 40 code points",
                }),
              ),
            ),
            pause: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  pause_at: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        timestamp: Schema.optionalKey(
                          Schema.Number.annotate({ format: "unix-time" }).check(
                            Schema.isInt().annotate({ expected: "an integer" }),
                          ),
                        ),
                        type: Schema.Literals(["now", "timestamp"]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "pause_at_params" }),
                  ),
                  settings: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        bill_for: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              outstanding_usage_through: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    type: Schema.optionalKey(
                                      Schema.Literals(["none", "pause_at"]),
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
                                  title:
                                    "pause_settings_bill_for_outstanding_usage_through_params",
                                }),
                              ),
                              unused_time_from: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    type: Schema.optionalKey(
                                      Schema.Literals([
                                        "item_current_period_start",
                                        "none",
                                        "pause_at",
                                      ]),
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
                                  title:
                                    "pause_settings_bill_for_unused_time_from_params",
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
                            title: "pause_settings_bill_for_params",
                          }),
                        ),
                        invoicing_behavior: Schema.optionalKey(
                          Schema.Literals(["invoice", "pending_invoice_item"]),
                        ),
                        type: Schema.optionalKey(
                          Schema.Literal("subscription"),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "pause_settings_params" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "pause_schedule_update_pause_params" }),
            ),
            resume: Schema.optionalKey(
              Schema.Union([
                Schema.StructWithRest(
                  Schema.Struct({
                    resume_at: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          duration: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                interval: Schema.Literals([
                                  "day",
                                  "month",
                                  "week",
                                  "year",
                                ]),
                                interval_count: Schema.optionalKey(Schema.Int),
                              }),
                              [
                                Schema.Record(
                                  Schema.String,
                                  Schema.Json.annotate({
                                    expected: "JSON value",
                                  }),
                                ),
                              ],
                            ).annotate({ title: "resume_at_duration_params" }),
                          ),
                          timestamp: Schema.optionalKey(
                            Schema.Number.annotate({
                              format: "unix-time",
                            }).check(
                              Schema.isInt().annotate({
                                expected: "an integer",
                              }),
                            ),
                          ),
                          type: Schema.Literals([
                            "duration",
                            "now",
                            "timestamp",
                          ]),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "resume_at_params" }),
                    ),
                    settings: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          billing_cycle_anchor: Schema.optionalKey(
                            Schema.Literals(["resume_at", "unchanged"]),
                          ),
                          payment_behavior: Schema.optionalKey(
                            Schema.Literals([
                              "resume_on_payment_attempt",
                              "resume_on_payment_success",
                            ]),
                          ),
                          proration_behavior: Schema.optionalKey(
                            Schema.Literals([
                              "always_invoice",
                              "create_prorations",
                              "none",
                            ]),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "resume_settings_params" }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "pause_schedule_update_resume_params" }),
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
        ).annotate({ title: "pause_schedules_update_params" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        'The subscription\'s pause behavior and optional resume behavior. You can provide one entry. Include its `key` to update an existing pause schedule. Omit `pause_schedules` to leave the existing schedule unchanged, or pass an empty string (`""`) to clear it.',
    }),
  ),
  phases: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          add_invoice_items: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  discountable: Schema.optionalKey(Schema.Boolean),
                  discounts: Schema.optionalKey(
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          coupon: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          discount: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          promotion_code: Schema.optionalKey(
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
                      ).annotate({ title: "discounts_data_param" }),
                    ),
                  ),
                  metadata: Schema.optionalKey(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  period: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        end: Schema.StructWithRest(
                          Schema.Struct({
                            timestamp: Schema.optionalKey(
                              Schema.Number.annotate({
                                format: "unix-time",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
                                }),
                              ),
                            ),
                            type: Schema.Literals([
                              "min_item_period_end",
                              "phase_end",
                              "timestamp",
                            ]),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "invoice_item_period_end" }),
                        start: Schema.StructWithRest(
                          Schema.Struct({
                            timestamp: Schema.optionalKey(
                              Schema.Number.annotate({
                                format: "unix-time",
                              }).check(
                                Schema.isInt().annotate({
                                  expected: "an integer",
                                }),
                              ),
                            ),
                            type: Schema.Literals([
                              "max_item_period_start",
                              "phase_start",
                              "timestamp",
                            ]),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "invoice_item_period_start" }),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "invoice_item_period" }),
                  ),
                  price: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  price_data: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        currency: Schema.String.annotate({
                          format: "currency",
                        }),
                        product: Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        tax_behavior: Schema.optionalKey(
                          Schema.Literals([
                            "exclusive",
                            "inclusive",
                            "unspecified",
                          ]),
                        ),
                        unit_amount: Schema.optionalKey(Schema.Int),
                        unit_amount_decimal: Schema.optionalKey(
                          Schema.String.annotate({ format: "decimal" }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "one_time_price_data_with_negative_amounts",
                    }),
                  ),
                  quantity: Schema.optionalKey(Schema.Int),
                  tax_rates: Schema.optionalKey(
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
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "add_invoice_item_entry" }),
            ),
          ),
          application_fee_percent: Schema.optionalKey(Schema.Finite),
          automatic_tax: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                liability: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      account: Schema.optionalKey(Schema.String),
                      type: Schema.Literals(["account", "self"]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "automatic_tax_config" }),
          ),
          billing_cycle_anchor: Schema.optionalKey(
            Schema.Literals(["automatic", "phase_start"]),
          ),
          billing_thresholds: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  amount_gte: Schema.optionalKey(Schema.Int),
                  reset_billing_cycle_anchor: Schema.optionalKey(
                    Schema.Boolean,
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "billing_thresholds_param" }),
              Schema.Literal(""),
            ]),
          ),
          collection_method: Schema.optionalKey(
            Schema.Literals(["charge_automatically", "send_invoice"]),
          ),
          default_payment_method: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          default_tax_rates: Schema.optionalKey(
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
          description: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          discounts: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.StructWithRest(
                  Schema.Struct({
                    coupon: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    discount: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    promotion_code: Schema.optionalKey(
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
                ).annotate({ title: "schedule_discounts_data_param" }),
              ),
              Schema.Literal(""),
            ]),
          ),
          duration: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                interval: Schema.Literals(["day", "month", "week", "year"]),
                interval_count: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "duration_params" }),
          ),
          end_date: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({ format: "unix-time" }).check(
                Schema.isInt().annotate({ expected: "an integer" }),
              ),
              Schema.Literal("now"),
            ]),
          ),
          invoice_settings: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                account_tax_ids: Schema.optionalKey(
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
                custom_fields: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          name: Schema.String.check(
                            Schema.isMaxCodePoints(40).annotate({
                              expected: "a string with at most 40 code points",
                            }),
                          ),
                          value: Schema.String.check(
                            Schema.isMaxCodePoints(140).annotate({
                              expected: "a string with at most 140 code points",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "custom_field_params" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                days_until_due: Schema.optionalKey(Schema.Int),
                description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(1500).annotate({
                        expected: "a string with at most 1500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                footer: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                issuer: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      account: Schema.optionalKey(Schema.String),
                      type: Schema.Literals(["account", "self"]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "schedule_phase_invoice_settings" }),
          ),
          items: Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                billing_thresholds: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({ usage_gte: Schema.Int }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "item_billing_thresholds_param" }),
                    Schema.Literal(""),
                  ]),
                ),
                discounts: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          coupon: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          discount: Schema.optionalKey(
                            Schema.String.check(
                              Schema.isMaxCodePoints(5000).annotate({
                                expected:
                                  "a string with at most 5000 code points",
                              }),
                            ),
                          ),
                          promotion_code: Schema.optionalKey(
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
                      ).annotate({ title: "schedule_discounts_data_param" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                metadata: Schema.optionalKey(
                  Schema.Record(Schema.String, Schema.String),
                ),
                price: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                price_data: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      currency: Schema.String.annotate({ format: "currency" }),
                      product: Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                      recurring: Schema.StructWithRest(
                        Schema.Struct({
                          interval: Schema.Literals([
                            "day",
                            "month",
                            "week",
                            "year",
                          ]),
                          interval_count: Schema.optionalKey(Schema.Int),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "recurring_adhoc" }),
                      tax_behavior: Schema.optionalKey(
                        Schema.Literals([
                          "exclusive",
                          "inclusive",
                          "unspecified",
                        ]),
                      ),
                      unit_amount: Schema.optionalKey(Schema.Int),
                      unit_amount_decimal: Schema.optionalKey(
                        Schema.String.annotate({ format: "decimal" }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "recurring_price_data" }),
                ),
                quantity: Schema.optionalKey(Schema.Int),
                tax_rates: Schema.optionalKey(
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
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "configuration_item_params" }),
          ),
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          on_behalf_of: Schema.optionalKey(Schema.String),
          proration_behavior: Schema.optionalKey(
            Schema.Literals(["always_invoice", "create_prorations", "none"]),
          ),
          start_date: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({ format: "unix-time" }).check(
                Schema.isInt().annotate({ expected: "an integer" }),
              ),
              Schema.Literal("now"),
            ]),
          ),
          transfer_data: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount_percent: Schema.optionalKey(Schema.Finite),
                destination: Schema.String,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "transfer_data_specs" }),
          ),
          trial: Schema.optionalKey(Schema.Boolean),
          trial_end: Schema.optionalKey(
            Schema.Union([
              Schema.Number.annotate({ format: "unix-time" }).check(
                Schema.isInt().annotate({ expected: "an integer" }),
              ),
              Schema.Literal("now"),
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "phase_configuration_params" }),
    ).annotate({
      description:
        "List representing phases of the subscription schedule. Each phase can be customized to have different durations, plans, and coupons. If there are multiple phases, the `end_date` of one phase will always equal the `start_date` of the next phase. Note that past phases can be omitted.",
    }),
  ),
  proration_behavior: Schema.optionalKey(
    Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate({
      description:
        "If the update changes the billing configuration (item price, quantity, etc.) of the current phase, indicates how prorations from this change should be handled. The default value is `create_prorations`.",
    }),
  ),
  schedule: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSubscriptionSchedulesScheduleOutput =
  Stripesubscription_schedule;
export const PostSubscriptionSchedulesScheduleError = Stripeerror;
export const PostSubscriptionSchedulesScheduleCancelInput = Schema.Struct({
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
  invoice_now: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If the subscription schedule is `active`, indicates if a final invoice will be generated that contains any un-invoiced metered usage and new/pending proration invoice items. Defaults to `true`.",
    }),
  ),
  prorate: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If the subscription schedule is `active`, indicates if the cancellation should be prorated. Defaults to `true`.",
    }),
  ),
  schedule: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSubscriptionSchedulesScheduleCancelOutput =
  Stripesubscription_schedule;
export const PostSubscriptionSchedulesScheduleCancelError = Stripeerror;
export const PostSubscriptionSchedulesScheduleReleaseInput = Schema.Struct({
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
  preserve_cancel_date: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Keep any cancellation on the subscription that the schedule has set",
    }),
  ),
  schedule: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSubscriptionSchedulesScheduleReleaseOutput =
  Stripesubscription_schedule;
export const PostSubscriptionSchedulesScheduleReleaseError = Stripeerror;
/**
 * The GetSubscriptionSchedulesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSubscriptionSchedulesOperation: StripeOperation & {
  readonly input: typeof GetSubscriptionSchedulesInput;
  readonly output: typeof GetSubscriptionSchedulesOutput;
  readonly error: typeof GetSubscriptionSchedulesError;
} = {
  name: "GetSubscriptionSchedules",
  method: "GET",
  path: "/v1/subscription_schedules",
  pathParameters: [],
  queryParameters: [
    "canceled_at",
    "completed_at",
    "created",
    "customer",
    "customer_account",
    "ending_before",
    "expand",
    "limit",
    "released_at",
    "scheduled",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSubscriptionSchedulesInput,
  output: GetSubscriptionSchedulesOutput,
  error: GetSubscriptionSchedulesError,
};
/**
 * The PostSubscriptionSchedulesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSubscriptionSchedulesOperation: StripeOperation & {
  readonly input: typeof PostSubscriptionSchedulesInput;
  readonly output: typeof PostSubscriptionSchedulesOutput;
  readonly error: typeof PostSubscriptionSchedulesError;
} = {
  name: "PostSubscriptionSchedules",
  method: "POST",
  path: "/v1/subscription_schedules",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSubscriptionSchedulesInput,
  output: PostSubscriptionSchedulesOutput,
  error: PostSubscriptionSchedulesError,
};
/**
 * The GetSubscriptionSchedulesScheduleOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSubscriptionSchedulesScheduleOperation: StripeOperation & {
  readonly input: typeof GetSubscriptionSchedulesScheduleInput;
  readonly output: typeof GetSubscriptionSchedulesScheduleOutput;
  readonly error: typeof GetSubscriptionSchedulesScheduleError;
} = {
  name: "GetSubscriptionSchedulesSchedule",
  method: "GET",
  path: "/v1/subscription_schedules/{schedule}",
  pathParameters: ["schedule"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSubscriptionSchedulesScheduleInput,
  output: GetSubscriptionSchedulesScheduleOutput,
  error: GetSubscriptionSchedulesScheduleError,
};
/**
 * The PostSubscriptionSchedulesScheduleOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSubscriptionSchedulesScheduleOperation: StripeOperation & {
  readonly input: typeof PostSubscriptionSchedulesScheduleInput;
  readonly output: typeof PostSubscriptionSchedulesScheduleOutput;
  readonly error: typeof PostSubscriptionSchedulesScheduleError;
} = {
  name: "PostSubscriptionSchedulesSchedule",
  method: "POST",
  path: "/v1/subscription_schedules/{schedule}",
  pathParameters: ["schedule"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSubscriptionSchedulesScheduleInput,
  output: PostSubscriptionSchedulesScheduleOutput,
  error: PostSubscriptionSchedulesScheduleError,
};
/**
 * The PostSubscriptionSchedulesScheduleCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSubscriptionSchedulesScheduleCancelOperation: StripeOperation & {
  readonly input: typeof PostSubscriptionSchedulesScheduleCancelInput;
  readonly output: typeof PostSubscriptionSchedulesScheduleCancelOutput;
  readonly error: typeof PostSubscriptionSchedulesScheduleCancelError;
} = {
  name: "PostSubscriptionSchedulesScheduleCancel",
  method: "POST",
  path: "/v1/subscription_schedules/{schedule}/cancel",
  pathParameters: ["schedule"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSubscriptionSchedulesScheduleCancelInput,
  output: PostSubscriptionSchedulesScheduleCancelOutput,
  error: PostSubscriptionSchedulesScheduleCancelError,
};
/**
 * The PostSubscriptionSchedulesScheduleReleaseOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSubscriptionSchedulesScheduleReleaseOperation: StripeOperation & {
  readonly input: typeof PostSubscriptionSchedulesScheduleReleaseInput;
  readonly output: typeof PostSubscriptionSchedulesScheduleReleaseOutput;
  readonly error: typeof PostSubscriptionSchedulesScheduleReleaseError;
} = {
  name: "PostSubscriptionSchedulesScheduleRelease",
  method: "POST",
  path: "/v1/subscription_schedules/{schedule}/release",
  pathParameters: ["schedule"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSubscriptionSchedulesScheduleReleaseInput,
  output: PostSubscriptionSchedulesScheduleReleaseOutput,
  error: PostSubscriptionSchedulesScheduleReleaseError,
};
/**
 * The makeSubscriptionSchedulesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeSubscriptionSchedulesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetSubscriptionSchedules function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSubscriptionSchedules = Effect.fn(
    "subscriptionSchedules.GetSubscriptionSchedules",
  )(function* (input: GetSubscriptionSchedulesInput) {
    const response: GetSubscriptionSchedulesOutput = yield* client.invoke(
      GetSubscriptionSchedulesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSubscriptionSchedules function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSubscriptionSchedules = Effect.fn(
    "subscriptionSchedules.PostSubscriptionSchedules",
  )(function* (input: PostSubscriptionSchedulesInput) {
    const response: PostSubscriptionSchedulesOutput = yield* client.invoke(
      PostSubscriptionSchedulesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetSubscriptionSchedulesSchedule function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSubscriptionSchedulesSchedule = Effect.fn(
    "subscriptionSchedules.GetSubscriptionSchedulesSchedule",
  )(function* (input: GetSubscriptionSchedulesScheduleInput) {
    const response: GetSubscriptionSchedulesScheduleOutput =
      yield* client.invoke(GetSubscriptionSchedulesScheduleOperation, input);
    return response;
  });
  /**
   * The PostSubscriptionSchedulesSchedule function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSubscriptionSchedulesSchedule = Effect.fn(
    "subscriptionSchedules.PostSubscriptionSchedulesSchedule",
  )(function* (input: PostSubscriptionSchedulesScheduleInput) {
    const response: PostSubscriptionSchedulesScheduleOutput =
      yield* client.invoke(PostSubscriptionSchedulesScheduleOperation, input);
    return response;
  });
  /**
   * The PostSubscriptionSchedulesScheduleCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSubscriptionSchedulesScheduleCancel = Effect.fn(
    "subscriptionSchedules.PostSubscriptionSchedulesScheduleCancel",
  )(function* (input: PostSubscriptionSchedulesScheduleCancelInput) {
    const response: PostSubscriptionSchedulesScheduleCancelOutput =
      yield* client.invoke(
        PostSubscriptionSchedulesScheduleCancelOperation,
        input,
      );
    return response;
  });
  /**
   * The PostSubscriptionSchedulesScheduleRelease function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSubscriptionSchedulesScheduleRelease = Effect.fn(
    "subscriptionSchedules.PostSubscriptionSchedulesScheduleRelease",
  )(function* (input: PostSubscriptionSchedulesScheduleReleaseInput) {
    const response: PostSubscriptionSchedulesScheduleReleaseOutput =
      yield* client.invoke(
        PostSubscriptionSchedulesScheduleReleaseOperation,
        input,
      );
    return response;
  });
  return {
    GetSubscriptionSchedules,
    PostSubscriptionSchedules,
    GetSubscriptionSchedulesSchedule,
    PostSubscriptionSchedulesSchedule,
    PostSubscriptionSchedulesScheduleCancel,
    PostSubscriptionSchedulesScheduleRelease,
  };
});
