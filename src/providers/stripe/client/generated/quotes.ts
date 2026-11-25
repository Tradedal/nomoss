// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripeitem, Stripequote } from "./models/common.js";

export type GetQuotesInput = {
  readonly customer?: string;
  readonly customer_account?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: "accepted" | "canceled" | "draft" | "open";
  readonly test_clock?: string;
};
export type GetQuotesOutput = {
  readonly data: ReadonlyArray<Stripequote>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetQuotesError = Stripeerror;
export type PostQuotesInput = {
  readonly application_fee_amount?: number | "";
  readonly application_fee_percent?: number | "";
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly customer?: string;
  readonly customer_account?: string;
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
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly footer?: string | "";
  readonly from_quote?: {
    readonly is_revision?: boolean;
    readonly quote: string;
  } & { readonly [x: string]: Schema.Json };
  readonly header?: string | "";
  readonly invoice_settings?: {
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
  readonly line_items?: ReadonlyArray<
    {
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly price?: string;
      readonly price_data?: {
        readonly currency: string;
        readonly product: string;
        readonly recurring?: {
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
  readonly on_behalf_of?: string | "";
  readonly subscription_data?: {
    readonly billing_mode?: {
      readonly flexible?: {
        readonly proration_discounts?: "included" | "itemized";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "classic" | "flexible";
    } & { readonly [x: string]: Schema.Json };
    readonly description?: string;
    readonly effective_date?: "current_period_end" | number | "";
    readonly metadata?: { readonly [x: string]: string };
    readonly trial_period_days?: number | "";
  } & { readonly [x: string]: Schema.Json };
  readonly test_clock?: string;
  readonly transfer_data?:
    | ({
        readonly amount?: number;
        readonly amount_percent?: number;
        readonly destination: string;
      } & { readonly [x: string]: Schema.Json })
    | "";
};
export type PostQuotesOutput = Stripequote;
export type PostQuotesError = Stripeerror;
export type GetQuotesQuoteInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly quote: string;
};
export type GetQuotesQuoteOutput = Stripequote;
export type GetQuotesQuoteError = Stripeerror;
export type PostQuotesQuoteInput = {
  readonly application_fee_amount?: number | "";
  readonly application_fee_percent?: number | "";
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly customer?: string;
  readonly customer_account?: string;
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
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly footer?: string | "";
  readonly header?: string | "";
  readonly invoice_settings?: {
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
  readonly line_items?: ReadonlyArray<
    {
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly id?: string;
      readonly price?: string;
      readonly price_data?: {
        readonly currency: string;
        readonly product: string;
        readonly recurring?: {
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
  readonly on_behalf_of?: string | "";
  readonly subscription_data?: {
    readonly description?: string | "";
    readonly effective_date?: "current_period_end" | number | "";
    readonly metadata?: { readonly [x: string]: string };
    readonly trial_period_days?: number | "";
  } & { readonly [x: string]: Schema.Json };
  readonly transfer_data?:
    | ({
        readonly amount?: number;
        readonly amount_percent?: number;
        readonly destination: string;
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly quote: string;
};
export type PostQuotesQuoteOutput = Stripequote;
export type PostQuotesQuoteError = Stripeerror;
export type PostQuotesQuoteAcceptInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly quote: string;
};
export type PostQuotesQuoteAcceptOutput = Stripequote;
export type PostQuotesQuoteAcceptError = Stripeerror;
export type PostQuotesQuoteCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly quote: string;
};
export type PostQuotesQuoteCancelOutput = Stripequote;
export type PostQuotesQuoteCancelError = Stripeerror;
export type GetQuotesQuoteComputedUpfrontLineItemsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly quote: string;
  readonly starting_after?: string;
};
export type GetQuotesQuoteComputedUpfrontLineItemsOutput = {
  readonly data: ReadonlyArray<Stripeitem>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetQuotesQuoteComputedUpfrontLineItemsError = Stripeerror;
export type PostQuotesQuoteFinalizeInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly quote: string;
};
export type PostQuotesQuoteFinalizeOutput = Stripequote;
export type PostQuotesQuoteFinalizeError = Stripeerror;
export type GetQuotesQuoteLineItemsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly quote: string;
  readonly starting_after?: string;
};
export type GetQuotesQuoteLineItemsOutput = {
  readonly data: ReadonlyArray<Stripeitem>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetQuotesQuoteLineItemsError = Stripeerror;

export const GetQuotesInput = Schema.Struct({
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(["accepted", "canceled", "draft", "open"]),
  ),
  test_clock: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetQuotesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripequote),
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
          new globalThis.RegExp("^\\/v1\\/quotes", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/quotes",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "QuotesResourceQuoteList", description: "" });
export const GetQuotesError = Stripeerror;
export const PostQuotesInput = Schema.Struct({
  application_fee_amount: Schema.optionalKey(
    Schema.Union([Schema.Int, Schema.Literal("")]).annotate({
      description:
        "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account. There cannot be any line items with recurring prices when using this field.",
    }),
  ),
  application_fee_percent: Schema.optionalKey(
    Schema.Union([Schema.Finite, Schema.Literal("")]).annotate({
      description:
        "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. There must be at least 1 line item with a recurring price to use this field.",
    }),
  ),
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
    ).annotate({
      title: "automatic_tax_param",
      description:
        "Settings for automatic tax lookup for this quote and resulting invoices and subscriptions.",
    }),
  ),
  collection_method: Schema.optionalKey(
    Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
      description:
        "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay invoices at the end of the subscription cycle or at invoice finalization using the default payment method attached to the subscription or customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`. Defaults to `charge_automatically`.",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The customer for which this quote belongs to. A customer is required before finalizing the quote. Once specified, it cannot be changed.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The account for which this quote belongs to. A customer or account is required before finalizing the quote. Once specified, it cannot be changed.",
    }).check(
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
    ]).annotate({
      description:
        "The tax rates that will apply to any line item that does not have `tax_rates` set.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "A description that will be displayed on the quote PDF. If no value is passed, the default description configured in your [quote template settings](https://dashboard.stripe.com/settings/billing/quote) will be used.",
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
    ]).annotate({ description: "The discounts applied to the quote." }),
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
  expires_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A future timestamp on which the quote will be canceled if in `open` or `draft` status. Measured in seconds since the Unix epoch. If no value is passed, the default expiration date configured in your [quote template settings](https://dashboard.stripe.com/settings/billing/quote) will be used.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  footer: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "A footer that will be displayed on the quote PDF. If no value is passed, the default footer configured in your [quote template settings](https://dashboard.stripe.com/settings/billing/quote) will be used.",
    }),
  ),
  from_quote: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        is_revision: Schema.optionalKey(Schema.Boolean),
        quote: Schema.String.check(
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
      title: "from_quote_params",
      description:
        "Clone an existing quote. The new quote will be created in `status=draft`. When using this parameter, you cannot specify any other parameters except for `expires_at`.",
    }),
  ),
  header: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(50).annotate({
          expected: "a string with at most 50 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "A header that will be displayed on the quote PDF. If no value is passed, the default header configured in your [quote template settings](https://dashboard.stripe.com/settings/billing/quote) will be used.",
    }),
  ),
  invoice_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
              Schema.isMaxCodePoints(500).annotate({
                expected: "a string with at most 500 code points",
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
    ).annotate({
      title: "quote_param",
      description: "All invoices will be billed using the specified settings.",
    }),
  ),
  line_items: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
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
                recurring: Schema.optionalKey(
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
                  ).annotate({ title: "recurring_adhoc" }),
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
            ).annotate({ title: "price_data" }),
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
      ).annotate({ title: "line_item_create_params" }),
    ).annotate({
      description:
        "A list of line items the customer is being quoted for. Each line item includes information about the product, the quantity, and the resulting cost.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.Union([Schema.String, Schema.Literal("")]).annotate({
      description: "The account on behalf of which to charge.",
    }),
  ),
  subscription_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
          ).annotate({ title: "billing_mode" }),
        ),
        description: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ),
        effective_date: Schema.optionalKey(
          Schema.Union([
            Schema.Literal("current_period_end"),
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        trial_period_days: Schema.optionalKey(
          Schema.Union([Schema.Int, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "subscription_data_create_params",
      description:
        "When creating a subscription or subscription schedule, the specified configuration data will be used. There must be at least one line item with a recurring price for a subscription or subscription schedule to be created. A subscription schedule is created if `subscription_data[effective_date]` is present and in the future, otherwise a subscription is created.",
    }),
  ),
  test_clock: Schema.optionalKey(
    Schema.String.annotate({
      description: "ID of the test clock to attach to the quote.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  transfer_data: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Int),
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
    ]).annotate({
      description:
        "The data with which to automatically create a Transfer for each of the invoices.",
    }),
  ),
});
export const PostQuotesOutput = Stripequote;
export const PostQuotesError = Stripeerror;
export const GetQuotesQuoteInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  quote: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetQuotesQuoteOutput = Stripequote;
export const GetQuotesQuoteError = Stripeerror;
export const PostQuotesQuoteInput = Schema.Struct({
  application_fee_amount: Schema.optionalKey(
    Schema.Union([Schema.Int, Schema.Literal("")]).annotate({
      description:
        "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner's Stripe account. There cannot be any line items with recurring prices when using this field.",
    }),
  ),
  application_fee_percent: Schema.optionalKey(
    Schema.Union([Schema.Finite, Schema.Literal("")]).annotate({
      description:
        "A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice total that will be transferred to the application owner's Stripe account. There must be at least 1 line item with a recurring price to use this field.",
    }),
  ),
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
    ).annotate({
      title: "automatic_tax_param",
      description:
        "Settings for automatic tax lookup for this quote and resulting invoices and subscriptions.",
    }),
  ),
  collection_method: Schema.optionalKey(
    Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
      description:
        "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay invoices at the end of the subscription cycle or at invoice finalization using the default payment method attached to the subscription or customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions and mark the subscription as `active`. Defaults to `charge_automatically`.",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The customer for which this quote belongs to. A customer is required before finalizing the quote. Once specified, it cannot be changed.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The account for which this quote belongs to. A customer or account is required before finalizing the quote. Once specified, it cannot be changed.",
    }).check(
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
    ]).annotate({
      description:
        "The tax rates that will apply to any line item that does not have `tax_rates` set.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description: "A description that will be displayed on the quote PDF.",
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
    ]).annotate({ description: "The discounts applied to the quote." }),
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
  expires_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A future timestamp on which the quote will be canceled if in `open` or `draft` status. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  footer: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description: "A footer that will be displayed on the quote PDF.",
    }),
  ),
  header: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(50).annotate({
          expected: "a string with at most 50 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description: "A header that will be displayed on the quote PDF.",
    }),
  ),
  invoice_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
              Schema.isMaxCodePoints(500).annotate({
                expected: "a string with at most 500 code points",
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
    ).annotate({
      title: "quote_param",
      description: "All invoices will be billed using the specified settings.",
    }),
  ),
  line_items: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
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
          id: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
                recurring: Schema.optionalKey(
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
                  ).annotate({ title: "recurring_adhoc" }),
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
            ).annotate({ title: "price_data" }),
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
      ).annotate({ title: "line_item_update_params" }),
    ).annotate({
      description:
        "A list of line items the customer is being quoted for. Each line item includes information about the product, the quantity, and the resulting cost.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  on_behalf_of: Schema.optionalKey(
    Schema.Union([Schema.String, Schema.Literal("")]).annotate({
      description: "The account on behalf of which to charge.",
    }),
  ),
  subscription_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
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
        effective_date: Schema.optionalKey(
          Schema.Union([
            Schema.Literal("current_period_end"),
            Schema.Number.annotate({ format: "unix-time" }).check(
              Schema.isInt().annotate({ expected: "an integer" }),
            ),
            Schema.Literal(""),
          ]),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        trial_period_days: Schema.optionalKey(
          Schema.Union([Schema.Int, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "subscription_data_update_params",
      description:
        "When creating a subscription or subscription schedule, the specified configuration data will be used. There must be at least one line item with a recurring price for a subscription or subscription schedule to be created. A subscription schedule is created if `subscription_data[effective_date]` is present and in the future, otherwise a subscription is created.",
    }),
  ),
  transfer_data: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Int),
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
    ]).annotate({
      description:
        "The data with which to automatically create a Transfer for each of the invoices.",
    }),
  ),
  quote: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostQuotesQuoteOutput = Stripequote;
export const PostQuotesQuoteError = Stripeerror;
export const PostQuotesQuoteAcceptInput = Schema.Struct({
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
  quote: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostQuotesQuoteAcceptOutput = Stripequote;
export const PostQuotesQuoteAcceptError = Stripeerror;
export const PostQuotesQuoteCancelInput = Schema.Struct({
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
  quote: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostQuotesQuoteCancelOutput = Stripequote;
export const PostQuotesQuoteCancelError = Stripeerror;
export const GetQuotesQuoteComputedUpfrontLineItemsInput = Schema.Struct({
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
  quote: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetQuotesQuoteComputedUpfrontLineItemsOutput =
  Schema.StructWithRest(
    Schema.Struct({
      data: Schema.Array(Stripeitem).annotate({
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
  ).annotate({ title: "QuotesResourceListLineItems", description: "" });
export const GetQuotesQuoteComputedUpfrontLineItemsError = Stripeerror;
export const PostQuotesQuoteFinalizeInput = Schema.Struct({
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
  expires_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A future timestamp on which the quote will be canceled if in `open` or `draft` status. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  quote: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostQuotesQuoteFinalizeOutput = Stripequote;
export const PostQuotesQuoteFinalizeError = Stripeerror;
export const GetQuotesQuoteLineItemsInput = Schema.Struct({
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
  quote: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetQuotesQuoteLineItemsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeitem).annotate({
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
).annotate({ title: "QuotesResourceListLineItems", description: "" });
export const GetQuotesQuoteLineItemsError = Stripeerror;
/**
 * The GetQuotesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetQuotesOperation: StripeOperation & {
  readonly input: typeof GetQuotesInput;
  readonly output: typeof GetQuotesOutput;
  readonly error: typeof GetQuotesError;
} = {
  name: "GetQuotes",
  method: "GET",
  path: "/v1/quotes",
  pathParameters: [],
  queryParameters: [
    "customer",
    "customer_account",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
    "test_clock",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetQuotesInput,
  output: GetQuotesOutput,
  error: GetQuotesError,
};
/**
 * The PostQuotesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostQuotesOperation: StripeOperation & {
  readonly input: typeof PostQuotesInput;
  readonly output: typeof PostQuotesOutput;
  readonly error: typeof PostQuotesError;
} = {
  name: "PostQuotes",
  method: "POST",
  path: "/v1/quotes",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostQuotesInput,
  output: PostQuotesOutput,
  error: PostQuotesError,
};
/**
 * The GetQuotesQuoteOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetQuotesQuoteOperation: StripeOperation & {
  readonly input: typeof GetQuotesQuoteInput;
  readonly output: typeof GetQuotesQuoteOutput;
  readonly error: typeof GetQuotesQuoteError;
} = {
  name: "GetQuotesQuote",
  method: "GET",
  path: "/v1/quotes/{quote}",
  pathParameters: ["quote"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetQuotesQuoteInput,
  output: GetQuotesQuoteOutput,
  error: GetQuotesQuoteError,
};
/**
 * The PostQuotesQuoteOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostQuotesQuoteOperation: StripeOperation & {
  readonly input: typeof PostQuotesQuoteInput;
  readonly output: typeof PostQuotesQuoteOutput;
  readonly error: typeof PostQuotesQuoteError;
} = {
  name: "PostQuotesQuote",
  method: "POST",
  path: "/v1/quotes/{quote}",
  pathParameters: ["quote"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostQuotesQuoteInput,
  output: PostQuotesQuoteOutput,
  error: PostQuotesQuoteError,
};
/**
 * The PostQuotesQuoteAcceptOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostQuotesQuoteAcceptOperation: StripeOperation & {
  readonly input: typeof PostQuotesQuoteAcceptInput;
  readonly output: typeof PostQuotesQuoteAcceptOutput;
  readonly error: typeof PostQuotesQuoteAcceptError;
} = {
  name: "PostQuotesQuoteAccept",
  method: "POST",
  path: "/v1/quotes/{quote}/accept",
  pathParameters: ["quote"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostQuotesQuoteAcceptInput,
  output: PostQuotesQuoteAcceptOutput,
  error: PostQuotesQuoteAcceptError,
};
/**
 * The PostQuotesQuoteCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostQuotesQuoteCancelOperation: StripeOperation & {
  readonly input: typeof PostQuotesQuoteCancelInput;
  readonly output: typeof PostQuotesQuoteCancelOutput;
  readonly error: typeof PostQuotesQuoteCancelError;
} = {
  name: "PostQuotesQuoteCancel",
  method: "POST",
  path: "/v1/quotes/{quote}/cancel",
  pathParameters: ["quote"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostQuotesQuoteCancelInput,
  output: PostQuotesQuoteCancelOutput,
  error: PostQuotesQuoteCancelError,
};
/**
 * The GetQuotesQuoteComputedUpfrontLineItemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetQuotesQuoteComputedUpfrontLineItemsOperation: StripeOperation & {
  readonly input: typeof GetQuotesQuoteComputedUpfrontLineItemsInput;
  readonly output: typeof GetQuotesQuoteComputedUpfrontLineItemsOutput;
  readonly error: typeof GetQuotesQuoteComputedUpfrontLineItemsError;
} = {
  name: "GetQuotesQuoteComputedUpfrontLineItems",
  method: "GET",
  path: "/v1/quotes/{quote}/computed_upfront_line_items",
  pathParameters: ["quote"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetQuotesQuoteComputedUpfrontLineItemsInput,
  output: GetQuotesQuoteComputedUpfrontLineItemsOutput,
  error: GetQuotesQuoteComputedUpfrontLineItemsError,
};
/**
 * The PostQuotesQuoteFinalizeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostQuotesQuoteFinalizeOperation: StripeOperation & {
  readonly input: typeof PostQuotesQuoteFinalizeInput;
  readonly output: typeof PostQuotesQuoteFinalizeOutput;
  readonly error: typeof PostQuotesQuoteFinalizeError;
} = {
  name: "PostQuotesQuoteFinalize",
  method: "POST",
  path: "/v1/quotes/{quote}/finalize",
  pathParameters: ["quote"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostQuotesQuoteFinalizeInput,
  output: PostQuotesQuoteFinalizeOutput,
  error: PostQuotesQuoteFinalizeError,
};
/**
 * The GetQuotesQuoteLineItemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetQuotesQuoteLineItemsOperation: StripeOperation & {
  readonly input: typeof GetQuotesQuoteLineItemsInput;
  readonly output: typeof GetQuotesQuoteLineItemsOutput;
  readonly error: typeof GetQuotesQuoteLineItemsError;
} = {
  name: "GetQuotesQuoteLineItems",
  method: "GET",
  path: "/v1/quotes/{quote}/line_items",
  pathParameters: ["quote"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetQuotesQuoteLineItemsInput,
  output: GetQuotesQuoteLineItemsOutput,
  error: GetQuotesQuoteLineItemsError,
};
/**
 * The makeQuotesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeQuotesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetQuotes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetQuotes = Effect.fn("quotes.GetQuotes")(function* (
    input: GetQuotesInput,
  ) {
    const response: GetQuotesOutput = yield* client.invoke(
      GetQuotesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostQuotes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostQuotes = Effect.fn("quotes.PostQuotes")(function* (
    input: PostQuotesInput,
  ) {
    const response: PostQuotesOutput = yield* client.invoke(
      PostQuotesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetQuotesQuote function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetQuotesQuote = Effect.fn("quotes.GetQuotesQuote")(function* (
    input: GetQuotesQuoteInput,
  ) {
    const response: GetQuotesQuoteOutput = yield* client.invoke(
      GetQuotesQuoteOperation,
      input,
    );
    return response;
  });
  /**
   * The PostQuotesQuote function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostQuotesQuote = Effect.fn("quotes.PostQuotesQuote")(function* (
    input: PostQuotesQuoteInput,
  ) {
    const response: PostQuotesQuoteOutput = yield* client.invoke(
      PostQuotesQuoteOperation,
      input,
    );
    return response;
  });
  /**
   * The PostQuotesQuoteAccept function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostQuotesQuoteAccept = Effect.fn("quotes.PostQuotesQuoteAccept")(
    function* (input: PostQuotesQuoteAcceptInput) {
      const response: PostQuotesQuoteAcceptOutput = yield* client.invoke(
        PostQuotesQuoteAcceptOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostQuotesQuoteCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostQuotesQuoteCancel = Effect.fn("quotes.PostQuotesQuoteCancel")(
    function* (input: PostQuotesQuoteCancelInput) {
      const response: PostQuotesQuoteCancelOutput = yield* client.invoke(
        PostQuotesQuoteCancelOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetQuotesQuoteComputedUpfrontLineItems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetQuotesQuoteComputedUpfrontLineItems = Effect.fn(
    "quotes.GetQuotesQuoteComputedUpfrontLineItems",
  )(function* (input: GetQuotesQuoteComputedUpfrontLineItemsInput) {
    const response: GetQuotesQuoteComputedUpfrontLineItemsOutput =
      yield* client.invoke(
        GetQuotesQuoteComputedUpfrontLineItemsOperation,
        input,
      );
    return response;
  });
  /**
   * The PostQuotesQuoteFinalize function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostQuotesQuoteFinalize = Effect.fn("quotes.PostQuotesQuoteFinalize")(
    function* (input: PostQuotesQuoteFinalizeInput) {
      const response: PostQuotesQuoteFinalizeOutput = yield* client.invoke(
        PostQuotesQuoteFinalizeOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetQuotesQuoteLineItems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetQuotesQuoteLineItems = Effect.fn("quotes.GetQuotesQuoteLineItems")(
    function* (input: GetQuotesQuoteLineItemsInput) {
      const response: GetQuotesQuoteLineItemsOutput = yield* client.invoke(
        GetQuotesQuoteLineItemsOperation,
        input,
      );
      return response;
    },
  );
  return {
    GetQuotes,
    PostQuotes,
    GetQuotesQuote,
    PostQuotesQuote,
    PostQuotesQuoteAccept,
    PostQuotesQuoteCancel,
    GetQuotesQuoteComputedUpfrontLineItems,
    PostQuotesQuoteFinalize,
    GetQuotesQuoteLineItems,
  };
});
