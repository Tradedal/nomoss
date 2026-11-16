// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeInvoiceitemProps = {
  readonly amount?: number;
  readonly currency?: string;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly description?: string;
  readonly discountable?: boolean;
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
  readonly invoice?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly period?: { readonly end: number; readonly start: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly price_data?: {
    readonly currency: string;
    readonly product: string;
    readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
    readonly unit_amount?: number;
    readonly unit_amount_decimal?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly pricing?: { readonly price?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly quantity?: number;
  readonly quantity_decimal?: string;
  readonly subscription?: string;
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
  readonly tax_code?: string | "";
  readonly tax_rates?: ReadonlyArray<string>;
  readonly unit_amount_decimal?: string;
};

export const StripeInvoiceitemResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "invoiceitem",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/InvoiceitemId"],
  });
export const StripeInvoiceitemPropsSchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The integer amount in cents (or local equivalent) of the charge to be applied to the upcoming invoice. Passing in a negative `amount` will reduce the `amount_due` on the invoice.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        format: "currency",
      }),
    ),
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description: "The ID of the customer to bill for this invoice item.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    customer_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the account representing the customer to bill for this invoice item.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string which you can attach to the invoice item. The description is displayed in the invoice for easy tracking.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    discountable: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Controls whether discounts apply to this invoice item. Defaults to false for prorations or negative invoice items, and true for all other invoice items.",
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
          "The coupons and promotion codes to redeem into discounts for the invoice item or invoice line item.",
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
    invoice: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of an existing invoice to add this invoice item to. For subscription invoices, when left blank, the invoice item will be added to the next upcoming scheduled invoice. For standalone invoices, the invoice item won't be automatically added unless you pass `pending_invoice_item_behavior: 'include'` when creating the invoice. This is useful when adding invoice items in response to an invoice.created webhook. You can only add invoice items to draft invoices and there is a maximum of 250 items per invoice.",
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
    period: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          end: Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          start: Schema.Number.annotate({ format: "unix-time" }).check(
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
        title: "period",
        description:
          "The period associated with this invoice item. When set to different values, the period will be rendered on the invoice. If you have [Stripe Revenue Recognition](https://docs.stripe.com/revenue-recognition) enabled, the period will be used to recognize and defer revenue. See the [Revenue Recognition documentation](https://docs.stripe.com/revenue-recognition/methodology/subscriptions-and-invoicing) for details.",
      }),
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
        title: "one_time_price_data",
        description:
          "Data used to generate a new [Price](https://docs.stripe.com/api/prices) object inline.",
      }),
    ),
    pricing: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          price: Schema.optionalKey(
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
      ).annotate({
        title: "pricing_param",
        description: "The pricing information for the invoice item.",
      }),
    ),
    quantity: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Non-negative integer. The quantity of units for the invoice item. Use `quantity_decimal` instead to provide decimal precision. This field will be deprecated in favor of `quantity_decimal` in a future version.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    quantity_decimal: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Non-negative decimal with at most 12 decimal places. The quantity of units for the invoice item.",
        format: "decimal",
      }),
    ),
    subscription: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of a subscription to add this invoice item to. When left blank, the invoice item is added to the next upcoming scheduled invoice. When set, scheduled invoices for subscriptions other than the specified subscription will ignore the invoice item. Use this when you want to express that an invoice item has been accrued within the context of a particular subscription.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    tax_behavior: Schema.optionalKey(
      Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate({
        description:
          "Only required if a [default tax behavior](https://docs.stripe.com/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.",
      }),
    ),
    tax_code: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Literal("")]).annotate({
        description:
          "A [tax code](https://docs.stripe.com/tax/tax-categories) ID.",
      }),
    ),
    tax_rates: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "The tax rates which apply to the invoice item. When set, the `default_tax_rates` on the invoice do not apply to this invoice item.",
      }),
    ),
    unit_amount_decimal: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The decimal unit amount in cents (or local equivalent) of the charge to be applied to the upcoming invoice. This `unit_amount_decimal` will be multiplied by the quantity to get the full amount. Passing in a negative `unit_amount_decimal` will reduce the `amount_due` on the invoice. Accepts at most 12 decimal places.",
        format: "decimal",
      }),
    ),
  }),
  StripeInvoiceitemResourceSchema,
);
