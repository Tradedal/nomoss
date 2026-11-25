// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_subscription_item,
  Stripeerror,
} from "./models/common.js";
import { Stripesubscription_item } from "./models/subscriptions.js";

export type GetSubscriptionItemsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly subscription: string;
};
export type GetSubscriptionItemsOutput = {
  readonly data: ReadonlyArray<Stripesubscription_item>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetSubscriptionItemsError = Stripeerror;
export type PostSubscriptionItemsInput = {
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
          readonly promotion_code?: string;
        } & { readonly [x: string]: Schema.Json }
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
export type PostSubscriptionItemsOutput = Stripesubscription_item;
export type PostSubscriptionItemsError = Stripeerror;
export type GetSubscriptionItemsItemInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly item: string;
};
export type GetSubscriptionItemsItemOutput = Stripesubscription_item;
export type GetSubscriptionItemsItemError = Stripeerror;
export type PostSubscriptionItemsItemInput = {
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
          readonly promotion_code?: string;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly off_session?: boolean;
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
  readonly tax_rates?: ReadonlyArray<string> | "";
  readonly item: string;
};
export type PostSubscriptionItemsItemOutput = Stripesubscription_item;
export type PostSubscriptionItemsItemError = Stripeerror;
export type DeleteSubscriptionItemsItemInput = {
  readonly clear_usage?: boolean;
  readonly payment_behavior?:
    | "allow_incomplete"
    | "default_incomplete"
    | "error_if_incomplete"
    | "pending_if_incomplete";
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
  readonly proration_date?: number;
  readonly item: string;
};
export type DeleteSubscriptionItemsItemOutput = Stripedeleted_subscription_item;
export type DeleteSubscriptionItemsItemError = Stripeerror;

export const GetSubscriptionItemsInput = Schema.Struct({
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
  subscription: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetSubscriptionItemsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripesubscription_item),
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
          new globalThis.RegExp("^\\/v1\\/subscription_items", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/subscription_items",
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
  title: "SubscriptionsItemsSubscriptionItemList",
  description: "",
});
export const GetSubscriptionItemsError = Stripeerror;
export const PostSubscriptionItemsInput = Schema.Struct({
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
      description: "Specifies which fields in the response should be expanded.",
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
    Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate({
      description:
        "Determines how to handle [prorations](https://docs.stripe.com/billing/subscriptions/prorations) when the billing cycle changes (e.g., when switching plans, resetting `billing_cycle_anchor=now`, or starting a trial), or if an item's `quantity` changes. The default value is `create_prorations`.",
    }),
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
});
export const PostSubscriptionItemsOutput = Stripesubscription_item;
export const PostSubscriptionItemsError = Stripeerror;
export const GetSubscriptionItemsItemInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  item: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetSubscriptionItemsItemOutput = Stripesubscription_item;
export const GetSubscriptionItemsItemError = Stripeerror;
export const PostSubscriptionItemsItemInput = Schema.Struct({
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
  off_session: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates if a customer is on or off-session while an invoice payment is attempted. Defaults to `false` (on-session).",
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
      description:
        "The ID of the price object. You can use either `price` or `price_data`, but not both, to set or change this item's price. If you're updating an existing item without changing its price, omit both. When changing a subscription item's price, `quantity` is set to 1 unless a `quantity` parameter is provided.",
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
        "Data used to generate a new [Price](https://docs.stripe.com/api/prices) object inline. You can use either `price` or `price_data`, but not both, to set or change this item's price. If you're updating an existing item without changing its price, omit both.",
    }),
  ),
  proration_behavior: Schema.optionalKey(
    Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate({
      description:
        "Determines how to handle [prorations](https://docs.stripe.com/billing/subscriptions/prorations) when the billing cycle changes (e.g., when switching plans, resetting `billing_cycle_anchor=now`, or starting a trial), or if an item's `quantity` changes. The default value is `create_prorations`.",
    }),
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
  item: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSubscriptionItemsItemOutput = Stripesubscription_item;
export const PostSubscriptionItemsItemError = Stripeerror;
export const DeleteSubscriptionItemsItemInput = Schema.Struct({
  clear_usage: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Delete all usage for the given subscription item. Allowed only when the current plan's `usage_type` is `metered`.",
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
  proration_behavior: Schema.optionalKey(
    Schema.Literals(["always_invoice", "create_prorations", "none"]).annotate({
      description:
        "Determines how to handle [prorations](https://docs.stripe.com/billing/subscriptions/prorations) when the billing cycle changes (e.g., when switching plans, resetting `billing_cycle_anchor=now`, or starting a trial), or if an item's `quantity` changes. The default value is `create_prorations`.",
    }),
  ),
  proration_date: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "If set, the proration will be calculated as though the subscription was updated at the given time. This can be used to apply the same proration that was previewed with the [upcoming invoice](/api/invoices/create_preview) endpoint.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  item: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteSubscriptionItemsItemOutput =
  Stripedeleted_subscription_item;
export const DeleteSubscriptionItemsItemError = Stripeerror;
/**
 * The GetSubscriptionItemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSubscriptionItemsOperation: StripeOperation & {
  readonly input: typeof GetSubscriptionItemsInput;
  readonly output: typeof GetSubscriptionItemsOutput;
  readonly error: typeof GetSubscriptionItemsError;
} = {
  name: "GetSubscriptionItems",
  method: "GET",
  path: "/v1/subscription_items",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "subscription",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSubscriptionItemsInput,
  output: GetSubscriptionItemsOutput,
  error: GetSubscriptionItemsError,
};
/**
 * The PostSubscriptionItemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSubscriptionItemsOperation: StripeOperation & {
  readonly input: typeof PostSubscriptionItemsInput;
  readonly output: typeof PostSubscriptionItemsOutput;
  readonly error: typeof PostSubscriptionItemsError;
} = {
  name: "PostSubscriptionItems",
  method: "POST",
  path: "/v1/subscription_items",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSubscriptionItemsInput,
  output: PostSubscriptionItemsOutput,
  error: PostSubscriptionItemsError,
};
/**
 * The GetSubscriptionItemsItemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSubscriptionItemsItemOperation: StripeOperation & {
  readonly input: typeof GetSubscriptionItemsItemInput;
  readonly output: typeof GetSubscriptionItemsItemOutput;
  readonly error: typeof GetSubscriptionItemsItemError;
} = {
  name: "GetSubscriptionItemsItem",
  method: "GET",
  path: "/v1/subscription_items/{item}",
  pathParameters: ["item"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSubscriptionItemsItemInput,
  output: GetSubscriptionItemsItemOutput,
  error: GetSubscriptionItemsItemError,
};
/**
 * The PostSubscriptionItemsItemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSubscriptionItemsItemOperation: StripeOperation & {
  readonly input: typeof PostSubscriptionItemsItemInput;
  readonly output: typeof PostSubscriptionItemsItemOutput;
  readonly error: typeof PostSubscriptionItemsItemError;
} = {
  name: "PostSubscriptionItemsItem",
  method: "POST",
  path: "/v1/subscription_items/{item}",
  pathParameters: ["item"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSubscriptionItemsItemInput,
  output: PostSubscriptionItemsItemOutput,
  error: PostSubscriptionItemsItemError,
};
/**
 * The DeleteSubscriptionItemsItemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteSubscriptionItemsItemOperation: StripeOperation & {
  readonly input: typeof DeleteSubscriptionItemsItemInput;
  readonly output: typeof DeleteSubscriptionItemsItemOutput;
  readonly error: typeof DeleteSubscriptionItemsItemError;
} = {
  name: "DeleteSubscriptionItemsItem",
  method: "DELETE",
  path: "/v1/subscription_items/{item}",
  pathParameters: ["item"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteSubscriptionItemsItemInput,
  output: DeleteSubscriptionItemsItemOutput,
  error: DeleteSubscriptionItemsItemError,
};
/**
 * The makeSubscriptionItemsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeSubscriptionItemsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetSubscriptionItems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSubscriptionItems = Effect.fn(
    "subscriptionItems.GetSubscriptionItems",
  )(function* (input: GetSubscriptionItemsInput) {
    const response: GetSubscriptionItemsOutput = yield* client.invoke(
      GetSubscriptionItemsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSubscriptionItems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSubscriptionItems = Effect.fn(
    "subscriptionItems.PostSubscriptionItems",
  )(function* (input: PostSubscriptionItemsInput) {
    const response: PostSubscriptionItemsOutput = yield* client.invoke(
      PostSubscriptionItemsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetSubscriptionItemsItem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSubscriptionItemsItem = Effect.fn(
    "subscriptionItems.GetSubscriptionItemsItem",
  )(function* (input: GetSubscriptionItemsItemInput) {
    const response: GetSubscriptionItemsItemOutput = yield* client.invoke(
      GetSubscriptionItemsItemOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSubscriptionItemsItem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSubscriptionItemsItem = Effect.fn(
    "subscriptionItems.PostSubscriptionItemsItem",
  )(function* (input: PostSubscriptionItemsItemInput) {
    const response: PostSubscriptionItemsItemOutput = yield* client.invoke(
      PostSubscriptionItemsItemOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteSubscriptionItemsItem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteSubscriptionItemsItem = Effect.fn(
    "subscriptionItems.DeleteSubscriptionItemsItem",
  )(function* (input: DeleteSubscriptionItemsItemInput) {
    const response: DeleteSubscriptionItemsItemOutput = yield* client.invoke(
      DeleteSubscriptionItemsItemOperation,
      input,
    );
    return response;
  });
  return {
    GetSubscriptionItems,
    PostSubscriptionItems,
    GetSubscriptionItemsItem,
    PostSubscriptionItemsItem,
    DeleteSubscriptionItemsItem,
  };
});
