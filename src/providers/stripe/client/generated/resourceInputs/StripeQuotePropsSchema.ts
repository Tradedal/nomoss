// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeQuoteProps = {
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

export const StripeQuoteResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "stripe",
  service: "billing",
  resource: "quote",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/QuoteId"],
});
export const StripeQuotePropsSchema = annotateResourceSchema(
  Schema.Struct({
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
        description:
          "Specifies which fields in the response should be expanded.",
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
        description:
          "All invoices will be billed using the specified settings.",
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
  }),
  StripeQuoteResourceSchema,
);
