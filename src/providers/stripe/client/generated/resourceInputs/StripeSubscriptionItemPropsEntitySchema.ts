// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_75 } from "./StripeResourceEntityInputAlternatives_75.js";
import { StripeSubscriptionItemResourceSchema } from "./StripeSubscriptionItemPropsSchema.js";

export type StripeSubscriptionItemPropsEntity = {
  readonly billing_thresholds?:
    | ({ readonly usage_gte: number } & { readonly [x: string]: Schema.Json })
    | "";
  readonly current_trial?: { readonly trial_offer: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly discounts?:
    | ReadonlyArray<
        {
          readonly coupon?: string;
          readonly discount?: string;
          readonly promotion_code?: StripeResourceEntityInputAlternatives_75;
        } & {
          readonly [x: string]:
            | ResourceInputJson
            | StripeResourceEntityInputAlternatives_75;
        }
      >
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly payment_behavior?:
    | "allow_incomplete"
    | "default_incomplete"
    | "error_if_incomplete"
    | "pending_if_incomplete";
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
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
  readonly proration_date?: number;
  readonly quantity?: number;
  readonly subscription: string;
  readonly tax_rates?: ReadonlyArray<string> | "";
};

export const StripeSubscriptionItemPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    billing_thresholds: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(Schema.Struct({ usage_gte: Schema.Int }), [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ]).annotate({ title: "item_billing_thresholds_param" }),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. Pass an empty string to remove previously-defined thresholds.",
      }),
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
      ).annotate({
        title: "current_trial_param",
        description: "The trial offer to apply to this subscription item.",
      }),
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
                StripeResourceEntityInputAlternatives_75,
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Union([
                  ResourceInputJsonSchema,
                  StripeResourceEntityInputAlternatives_75,
                ]),
              ),
            ],
          ).annotate({ title: "discounts_data_param" }),
        ),
        Schema.Literal(""),
      ]).annotate({
        description:
          "The coupons to redeem into discounts for the subscription item.",
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
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    payment_behavior: Schema.optionalKey(
      Schema.Literals([
        "allow_incomplete",
        "default_incomplete",
        "error_if_incomplete",
        "pending_if_incomplete",
      ]).annotate({
        description:
          "Controls how Stripe handles payment when a subscription update requires payment and `collection_method=charge_automatically`.",
      }),
    ),
    price: Schema.optionalKey(
      Schema.String.annotate({
        description: "The ID of the price object.",
      }).check(
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
              interval: Schema.Literals(["day", "month", "week", "year"]),
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
      ).annotate({
        title: "recurring_price_data",
        description:
          "Data used to generate a new [Price](https://docs.stripe.com/api/prices) object inline.",
      }),
    ),
    proration_behavior: Schema.optionalKey(
      Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate(
        {
          description:
            "Determines how to handle [prorations](https://docs.stripe.com/billing/subscriptions/prorations) when the billing cycle changes (e.g., when switching plans, resetting `billing_cycle_anchor=now`, or starting a trial), or if an item's `quantity` changes. The default value is `create_prorations`.",
        },
      ),
    ),
    proration_date: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "If set, the proration will be calculated as though the subscription was updated at the given time. This can be used to apply the same proration that was previewed with the [upcoming invoice](/api/invoices/create_preview) endpoint.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    quantity: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The quantity you'd like to apply to the subscription item you're creating.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    subscription: Schema.String.annotate({
      description: "The identifier of the subscription to modify.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
      ]).annotate({
        description:
          "A list of [Tax Rate](https://docs.stripe.com/api/tax_rates) ids. These Tax Rates will override the [`default_tax_rates`](https://docs.stripe.com/api/subscriptions/create#create_subscription-default_tax_rates) on the Subscription. When updating, pass an empty string to remove previously-defined tax rates.",
      }),
    ),
  }),
  StripeSubscriptionItemResourceSchema,
);
