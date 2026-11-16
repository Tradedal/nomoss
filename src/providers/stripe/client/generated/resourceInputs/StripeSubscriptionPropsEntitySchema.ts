// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  type ResourceInputJson,
  ResourceInputJsonSchema,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_25 } from "./StripeResourceEntityInputAlternatives_25.js";
import { StripeResourceEntityInputAlternatives_26 } from "./StripeResourceEntityInputAlternatives_26.js";
import { StripeResourceEntityInputAlternatives_28 } from "./StripeResourceEntityInputAlternatives_28.js";
import { StripeResourceEntityInputItems_2 } from "./StripeResourceEntityInputItems_2.js";
import { StripeResourceEntityInputProperties_12 } from "./StripeResourceEntityInputProperties_12.js";
import { StripeResourceEntityInputProperties_13 } from "./StripeResourceEntityInputProperties_13.js";
import { StripeSubscriptionResourceSchema } from "./StripeSubscriptionPropsSchema.js";

export type StripeSubscriptionPropsEntity = {
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
          readonly type: "min_item_period_end" | "timestamp";
        } & { readonly [x: string]: Schema.Json };
        readonly start: {
          readonly timestamp?: number;
          readonly type: "max_item_period_start" | "now" | "timestamp";
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
  readonly application_fee_percent?: number | "";
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: StripeResourceEntityInputProperties_12;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputProperties_12;
  };
  readonly backdate_start_date?: number;
  readonly billing_cycle_anchor?: number;
  readonly billing_cycle_anchor_config?: {
    readonly day_of_month: number;
    readonly hour?: number;
    readonly minute?: number;
    readonly month?: number;
    readonly second?: number;
  } & { readonly [x: string]: Schema.Json };
  readonly billing_mode?: {
    readonly flexible?: {
      readonly proration_discounts?: "included" | "itemized";
    } & { readonly [x: string]: Schema.Json };
    readonly type: "classic" | "flexible";
  } & { readonly [x: string]: Schema.Json };
  readonly billing_schedules?: ReadonlyArray<
    {
      readonly applies_to?: StripeResourceEntityInputItems_2;
      readonly bill_until: {
        readonly duration?: {
          readonly interval: "day" | "month" | "week" | "year";
          readonly interval_count?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly timestamp?: number;
        readonly type: "duration" | "timestamp";
      } & { readonly [x: string]: Schema.Json };
      readonly key?: string;
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputItems_2;
    }
  >;
  readonly billing_thresholds?:
    | ({
        readonly amount_gte?: number;
        readonly reset_billing_cycle_anchor?: boolean;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly cancel_at?:
    | number
    | "max_billed_until"
    | "max_period_end"
    | "min_period_end";
  readonly cancel_at_period_end?: boolean;
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly currency?: string;
  readonly customer?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "customer";
  }>;
  readonly customer_account?: string;
  readonly days_until_due?: number;
  readonly default_payment_method?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "payment-method";
  }>;
  readonly default_source?:
    | ResourceEntity<{
        readonly provider: "stripe";
        readonly service: "billing";
        readonly resource: "bank-account";
      }>
    | ResourceEntity<{
        readonly provider: "stripe";
        readonly service: "billing";
        readonly resource: "card";
      }>
    | ResourceEntity<{
        readonly provider: "stripe";
        readonly service: "billing";
        readonly resource: "source";
      }>;
  readonly default_tax_rates?: ReadonlyArray<string> | "";
  readonly description?: string;
  readonly discounts?:
    | ReadonlyArray<
        {
          readonly coupon?: string;
          readonly discount?: string;
          readonly promotion_code?: StripeResourceEntityInputAlternatives_25;
        } & {
          readonly [x: string]:
            | ResourceInputJson
            | StripeResourceEntityInputAlternatives_25;
        }
      >
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly invoice_settings?: {
    readonly account_tax_ids?: StripeResourceEntityInputAlternatives_26;
    readonly custom_fields?:
      | ReadonlyArray<
          { readonly name: string; readonly value: string } & {
            readonly [x: string]: Schema.Json;
          }
        >
      | "";
    readonly description?: string;
    readonly footer?: string;
    readonly issuer?: StripeResourceEntityInputProperties_13;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_26
      | StripeResourceEntityInputProperties_13;
  };
  readonly items?: ReadonlyArray<
    {
      readonly billing_thresholds?:
        | ({ readonly usage_gte: number } & {
            readonly [x: string]: Schema.Json;
          })
        | "";
      readonly current_trial?: { readonly trial_offer: string } & {
        readonly [x: string]: Schema.Json;
      };
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
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly off_session?: boolean;
  readonly on_behalf_of?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "v1-account";
  }>;
  readonly payment_behavior?:
    | "allow_incomplete"
    | "default_incomplete"
    | "error_if_incomplete"
    | "pending_if_incomplete";
  readonly payment_settings?: {
    readonly payment_method_options?: {
      readonly acss_debit?:
        | ({
            readonly mandate_options?: {
              readonly transaction_type?: "business" | "personal";
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly bancontact?:
        | ({ readonly preferred_language?: "de" | "en" | "fr" | "nl" } & {
            readonly [x: string]: Schema.Json;
          })
        | "";
      readonly billie?:
        | ({
            readonly company_details?:
              | ({
                  readonly registered_address?:
                    | ({
                        readonly city?: string;
                        readonly country?: string;
                        readonly line1?: string;
                        readonly line2?: string;
                        readonly postal_code?: string;
                        readonly state?: string;
                      } & { readonly [x: string]: Schema.Json })
                    | "";
                  readonly registered_name?: string;
                  readonly registration_number?: string;
                  readonly registration_type?:
                    | ""
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
                  readonly vat?: string;
                } & { readonly [x: string]: Schema.Json })
              | "";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly blik?:
        | ({
            readonly mandate_options?: { readonly expires_at?: number } & {
              readonly [x: string]: Schema.Json;
            };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly card?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_type?: "fixed" | "maximum";
              readonly description?: string;
            } & { readonly [x: string]: Schema.Json };
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
              | "visa";
            readonly request_three_d_secure?: "any" | "automatic" | "challenge";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly customer_balance?:
        | ({
            readonly bank_transfer?: {
              readonly eu_bank_transfer?: { readonly country: string } & {
                readonly [x: string]: Schema.Json;
              };
              readonly type?: string;
            } & { readonly [x: string]: Schema.Json };
            readonly funding_type?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly konbini?: { readonly [x: string]: Schema.Json } | "";
      readonly payto?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly purpose?:
                | "dependant_support"
                | "government"
                | "loan"
                | "mortgage"
                | "other"
                | "pension"
                | "personal"
                | "retail"
                | "salary"
                | "tax"
                | "utility";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly pix?:
        | ({
            readonly expires_after_seconds?: number;
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_includes_iof?: "always" | "never";
              readonly end_date?: string;
              readonly payment_schedule?:
                | "halfyearly"
                | "monthly"
                | "quarterly"
                | "weekly"
                | "yearly";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly sepa_debit?: { readonly [x: string]: Schema.Json } | "";
      readonly upi?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_type?: "fixed" | "maximum";
              readonly description?: string;
              readonly end_date?: number;
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly us_bank_account?:
        | ({
            readonly financial_connections?: {
              readonly filters?: {
                readonly account_subcategories?: ReadonlyArray<
                  "checking" | "savings"
                >;
              } & { readonly [x: string]: Schema.Json };
              readonly permissions?: ReadonlyArray<
                "balances" | "ownership" | "payment_method" | "transactions"
              >;
              readonly prefetch?: ReadonlyArray<
                "balances" | "ownership" | "transactions"
              >;
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
    } & { readonly [x: string]: Schema.Json };
    readonly payment_method_types?:
      | ReadonlyArray<
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
        >
      | "";
    readonly save_default_payment_method?: "off" | "on_subscription";
  } & { readonly [x: string]: Schema.Json };
  readonly pending_invoice_item_interval?:
    | ({
        readonly interval: "day" | "month" | "week" | "year";
        readonly interval_count?: number;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
  readonly transfer_data?: {
    readonly amount_percent?: number;
    readonly destination: StripeResourceEntityInputAlternatives_28;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_28;
  };
  readonly trial_end?: "now" | number;
  readonly trial_from_plan?: boolean;
  readonly trial_period_days?: number;
  readonly trial_settings?: {
    readonly end_behavior: {
      readonly billing_cycle_anchor?: "now" | "unchanged";
      readonly missing_payment_method?: "cancel" | "create_invoice" | "pause";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
};

export const StripeSubscriptionPropsEntitySchema = annotateResourceSchema(
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
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      type: Schema.Literals([
                        "min_item_period_end",
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
                        Schema.Number.annotate({ format: "unix-time" }).check(
                          Schema.isInt().annotate({ expected: "an integer" }),
                        ),
                      ),
                      type: Schema.Literals([
                        "max_item_period_start",
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
                  currency: Schema.String.annotate({ format: "currency" }),
                  product: Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  tax_behavior: Schema.optionalKey(
                    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
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
      ).annotate({
        description:
          "A list of prices and quantities that will generate invoice items appended to the next invoice for this subscription. You may pass up to 20 items.",
      }),
    ),
    application_fee_percent: Schema.optionalKey(
      Schema.Union([Schema.Finite, Schema.Literal("")]).annotate({
        description:
          "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. The request must be made by a platform account on a connected account in order to set an application fee percentage. For more information, see the application fees [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).",
      }),
    ),
    automatic_tax: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          enabled: Schema.Boolean,
          liability: Schema.optionalKey(StripeResourceEntityInputProperties_12),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputProperties_12,
            ]),
          ),
        ],
      ).annotate({
        title: "automatic_tax_config",
        description: "Automatic tax settings for this subscription.",
      }),
    ),
    backdate_start_date: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A past timestamp to backdate the subscription's start date to. If set, the first invoice will contain line items for the timespan between the start date and the current time. Can be combined with trials and the billing cycle anchor.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    billing_cycle_anchor: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A future timestamp in UTC format to anchor the subscription's [billing cycle](https://docs.stripe.com/subscriptions/billing-cycle). The anchor is the reference point that aligns future billing cycle dates. It sets the day of week for `week` intervals, the day of month for `month` and `year` intervals, and the month of year for `year` intervals.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    billing_cycle_anchor_config: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          day_of_month: Schema.Int,
          hour: Schema.optionalKey(Schema.Int),
          minute: Schema.optionalKey(Schema.Int),
          month: Schema.optionalKey(Schema.Int),
          second: Schema.optionalKey(Schema.Int),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "cycle_anchor_config_param",
        description:
          "Mutually exclusive with billing_cycle_anchor and only valid with monthly and yearly price intervals. When provided, the billing_cycle_anchor is set to the next occurrence of the day_of_month at the hour, minute, and second UTC.",
      }),
    ),
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
    billing_schedules: Schema.optionalKey(
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            applies_to: Schema.optionalKey(StripeResourceEntityInputItems_2),
            bill_until: Schema.StructWithRest(
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
                  ).annotate({
                    title: "billing_schedules_bill_until_duration",
                  }),
                ),
                timestamp: Schema.optionalKey(
                  Schema.Number.annotate({ format: "unix-time" }).check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  ),
                ),
                type: Schema.Literals(["duration", "timestamp"]),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "billing_schedules_bill_until" }),
            key: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(200).annotate({
                  expected: "a string with at most 200 code points",
                }),
              ),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputItems_2,
              ]),
            ),
          ],
        ).annotate({ title: "billing_schedules_create_params" }),
      ).annotate({
        description:
          "An array of billing schedules, which allow you to bill customers in advance for multiple service periods. Requires flexible billing mode and API version 2026-05-27.dahlia or later. Learn more about [prebilling](https://docs.stripe.com/billing/subscriptions/prebilling).",
      }),
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
      ]).annotate({
        description:
          "Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. When updating, pass an empty string to remove previously-defined thresholds.",
      }),
    ),
    cancel_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ format: "unix-time" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        Schema.Literals([
          "max_billed_until",
          "max_period_end",
          "min_period_end",
        ]),
      ]).annotate({
        description:
          "A timestamp at which the subscription should cancel. If set to a date before the current period ends, this will cause a proration if prorations have been enabled using `proration_behavior`. If set during a future period, this will always cause a proration for that period.",
      }),
    ),
    cancel_at_period_end: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicate whether this subscription should cancel at the end of the current period (`current_period_end`). Defaults to `false`.",
      }),
    ),
    collection_method: Schema.optionalKey(
      Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
        description:
          "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this subscription at the end of the cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`. Defaults to `charge_automatically`.",
      }),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        format: "currency",
      }),
    ),
    customer: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("customer"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["CustomerId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    customer_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The identifier of the account representing the customer to subscribe.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    days_until_due: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Number of days a customer has to pay invoices generated by this subscription. Valid only for subscriptions where `collection_method` is set to `send_invoice`.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    default_payment_method: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("payment-method"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PaymentMethodId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    default_source: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("bank-account"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["BankAccountId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("card"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["CardId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("source"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["SourceId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
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
      ]).annotate({
        description:
          "The tax rates that will apply to any subscription item that does not have `tax_rates` set. Invoices created will have their `default_tax_rates` populated from the subscription.",
      }),
    ),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The subscription's description, meant to be displayable to the customer. Use this field to optionally store an explanation of the subscription for rendering in Stripe surfaces and certain local payment methods UIs.",
      }).check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
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
                StripeResourceEntityInputAlternatives_25,
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Union([
                  ResourceInputJsonSchema,
                  StripeResourceEntityInputAlternatives_25,
                ]),
              ),
            ],
          ).annotate({ title: "discounts_data_param" }),
        ),
        Schema.Literal(""),
      ]).annotate({
        description:
          "The coupons to redeem into discounts for the subscription. If not specified or empty, inherits the discount from the subscription's customer.",
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
    invoice_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          account_tax_ids: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_26,
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
          description: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(1500).annotate({
                expected: "a string with at most 1500 code points",
              }),
            ),
          ),
          footer: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          issuer: Schema.optionalKey(StripeResourceEntityInputProperties_13),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_26,
              StripeResourceEntityInputProperties_13,
            ]),
          ),
        ],
      ).annotate({
        title: "invoice_settings_param",
        description:
          "All invoices will be billed using the specified settings.",
      }),
    ),
    items: Schema.optionalKey(
      Schema.Array(
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
            current_trial: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  trial_offer: Schema.String.check(
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
              ).annotate({ title: "current_trial_param" }),
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
                  ).annotate({ title: "discounts_data_param" }),
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
                    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
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
        ).annotate({ title: "subscription_item_create_params" }),
      ).annotate({
        description:
          "A list of up to 20 subscription items, each with an attached price.",
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
    off_session: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicates if a customer is on or off-session while an invoice payment is attempted. Defaults to `false` (on-session).",
      }),
    ),
    on_behalf_of: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("v1-account"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["V1AccountId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    payment_behavior: Schema.optionalKey(
      Schema.Literals([
        "allow_incomplete",
        "default_incomplete",
        "error_if_incomplete",
        "pending_if_incomplete",
      ]).annotate({
        description:
          "Controls how Stripe handles the first invoice when payment is required and `collection_method=charge_automatically`. Subscriptions with `collection_method=send_invoice` are automatically activated regardless of the first Invoice status.",
      }),
    ),
    payment_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          payment_method_options: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                acss_debit: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              transaction_type: Schema.optionalKey(
                                Schema.Literals(["business", "personal"]),
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
                          ).annotate({ title: "mandate_options_param" }),
                        ),
                        verification_method: Schema.optionalKey(
                          Schema.Literals([
                            "automatic",
                            "instant",
                            "microdeposits",
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
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                bancontact: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        preferred_language: Schema.optionalKey(
                          Schema.Literals(["de", "en", "fr", "nl"]),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                billie: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        company_details: Schema.optionalKey(
                          Schema.Union([
                            Schema.StructWithRest(
                              Schema.Struct({
                                registered_address: Schema.optionalKey(
                                  Schema.Union([
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        city: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        country: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        line1: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        line2: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        postal_code: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        state: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
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
                                      title: "registered_address_param",
                                    }),
                                    Schema.Literal(""),
                                  ]),
                                ),
                                registered_name: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                registration_number: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                registration_type: Schema.optionalKey(
                                  Schema.Literals([
                                    "",
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
                                  ]),
                                ),
                                vat: Schema.optionalKey(
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
                                  Schema.Json.annotate({
                                    expected: "JSON value",
                                  }),
                                ),
                              ],
                            ).annotate({ title: "company_details_param" }),
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
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                blik: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              expires_at: Schema.optionalKey(
                                Schema.Number.annotate({
                                  format: "unix-time",
                                }).check(
                                  Schema.isInt().annotate({
                                    expected: "an integer",
                                  }),
                                ),
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
                              "subscription_payment_method_options_mandate_options_param",
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
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                card: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.optionalKey(Schema.Int),
                              amount_type: Schema.optionalKey(
                                Schema.Literals(["fixed", "maximum"]),
                              ),
                              description: Schema.optionalKey(
                                Schema.String.check(
                                  Schema.isMaxCodePoints(200).annotate({
                                    expected:
                                      "a string with at most 200 code points",
                                  }),
                                ),
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
                          ).annotate({ title: "mandate_options_param" }),
                        ),
                        network: Schema.optionalKey(
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
                          ]),
                        ),
                        request_three_d_secure: Schema.optionalKey(
                          Schema.Literals(["any", "automatic", "challenge"]),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                customer_balance: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        bank_transfer: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              eu_bank_transfer: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    country: Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
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
                                ).annotate({ title: "eu_bank_transfer_param" }),
                              ),
                              type: Schema.optionalKey(Schema.String),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "bank_transfer_param" }),
                        ),
                        funding_type: Schema.optionalKey(Schema.String),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                konbini: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                payto: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.optionalKey(Schema.Int),
                              purpose: Schema.optionalKey(
                                Schema.Literals([
                                  "dependant_support",
                                  "government",
                                  "loan",
                                  "mortgage",
                                  "other",
                                  "pension",
                                  "personal",
                                  "retail",
                                  "salary",
                                  "tax",
                                  "utility",
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
                          ).annotate({ title: "mandate_options_param" }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                pix: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        expires_after_seconds: Schema.optionalKey(Schema.Int),
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.optionalKey(Schema.Int),
                              amount_includes_iof: Schema.optionalKey(
                                Schema.Literals(["always", "never"]),
                              ),
                              end_date: Schema.optionalKey(
                                Schema.String.check(
                                  Schema.isMaxCodePoints(5000).annotate({
                                    expected:
                                      "a string with at most 5000 code points",
                                  }),
                                ),
                              ),
                              payment_schedule: Schema.optionalKey(
                                Schema.Literals([
                                  "halfyearly",
                                  "monthly",
                                  "quarterly",
                                  "weekly",
                                  "yearly",
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
                              "subscription_payment_method_options_mandate_options_param",
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
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                sepa_debit: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ).annotate({
                      title: "subscription_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                upi: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.optionalKey(Schema.Int),
                              amount_type: Schema.optionalKey(
                                Schema.Literals(["fixed", "maximum"]),
                              ),
                              description: Schema.optionalKey(
                                Schema.String.check(
                                  Schema.isMaxCodePoints(20).annotate({
                                    expected:
                                      "a string with at most 20 code points",
                                  }),
                                ),
                              ),
                              end_date: Schema.optionalKey(
                                Schema.Number.annotate({
                                  format: "unix-time",
                                }).check(
                                  Schema.isInt().annotate({
                                    expected: "an integer",
                                  }),
                                ),
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
                              "invoice_payment_method_options_mandate_options_param",
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
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                us_bank_account: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        financial_connections: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              filters: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    account_subcategories: Schema.optionalKey(
                                      Schema.Array(
                                        Schema.Literals([
                                          "checking",
                                          "savings",
                                        ]),
                                      ),
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
                                    "invoice_linked_account_options_filters_param",
                                }),
                              ),
                              permissions: Schema.optionalKey(
                                Schema.Array(
                                  Schema.Literals([
                                    "balances",
                                    "ownership",
                                    "payment_method",
                                    "transactions",
                                  ]),
                                ),
                              ),
                              prefetch: Schema.optionalKey(
                                Schema.Array(
                                  Schema.Literals([
                                    "balances",
                                    "ownership",
                                    "transactions",
                                  ]),
                                ),
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
                            title: "invoice_linked_account_options_param",
                          }),
                        ),
                        verification_method: Schema.optionalKey(
                          Schema.Literals([
                            "automatic",
                            "instant",
                            "microdeposits",
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
                      title: "invoice_payment_method_options_param",
                    }),
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
            ).annotate({ title: "payment_method_options" }),
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
              ),
              Schema.Literal(""),
            ]),
          ),
          save_default_payment_method: Schema.optionalKey(
            Schema.Literals(["off", "on_subscription"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "payment_settings",
        description:
          "Payment settings to pass to invoices created by the subscription.",
      }),
    ),
    pending_invoice_item_interval: Schema.optionalKey(
      Schema.Union([
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
        ).annotate({ title: "pending_invoice_item_interval_params" }),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Specifies an interval for how often to bill for any pending invoice items. It is analogous to calling [Create an invoice](/api/invoices/create) for the given subscription at the specified interval.",
      }),
    ),
    proration_behavior: Schema.optionalKey(
      Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate(
        {
          description:
            "Determines how to handle [prorations](https://docs.stripe.com/billing/subscriptions/prorations) resulting from the `billing_cycle_anchor`. If no value is passed, the default is `create_prorations`.",
        },
      ),
    ),
    transfer_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          amount_percent: Schema.optionalKey(Schema.Finite),
          destination: StripeResourceEntityInputAlternatives_28,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_28,
            ]),
          ),
        ],
      ).annotate({
        title: "transfer_data_specs",
        description:
          "If specified, the funds from the subscription's invoices will be transferred to the destination and the ID of the resulting transfers will be found on the resulting charges.",
      }),
    ),
    trial_end: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("now"),
        Schema.Number.annotate({ format: "unix-time" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
      ]).annotate({
        description:
          "Unix timestamp representing the end of the trial period the customer will get before being charged for the first time. If set, trial_end will override the default trial period of the plan the customer is being subscribed to. The special value `now` can be provided to end the customer's trial immediately. Can be at most two years from `billing_cycle_anchor`. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
      }),
    ),
    trial_from_plan: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicates if a plan's `trial_period_days` should be applied to the subscription. Setting `trial_end` per subscription is preferred, and this defaults to `false`. Setting this flag to `true` together with `trial_end` is not allowed. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
      }),
    ),
    trial_period_days: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Integer representing the number of trial period days before the customer is charged for the first time. This will always overwrite any trials that might apply via a subscribed plan. See [Using trial periods on subscriptions](https://docs.stripe.com/billing/subscriptions/trials/free-trials) to learn more.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    trial_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          end_behavior: Schema.StructWithRest(
            Schema.Struct({
              billing_cycle_anchor: Schema.optionalKey(
                Schema.Literals(["now", "unchanged"]),
              ),
              missing_payment_method: Schema.optionalKey(
                Schema.Literals(["cancel", "create_invoice", "pause"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "end_behavior" }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "trial_settings_config",
        description: "Settings related to subscription trials.",
      }),
    ),
  }),
  StripeSubscriptionResourceSchema,
);
