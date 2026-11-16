// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripedeleted_invoiceitem, Stripeerror } from "./models/common.js";
import { Stripeinvoiceitem } from "./models/invoices.js";

export type GetInvoiceitemsInput = {
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
  readonly invoice?: string;
  readonly limit?: number;
  readonly pending?: boolean;
  readonly starting_after?: string;
};
export type GetInvoiceitemsOutput = {
  readonly data: ReadonlyArray<Stripeinvoiceitem>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetInvoiceitemsError = Stripeerror;
export type PostInvoiceitemsInput = {
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
export type PostInvoiceitemsOutput = Stripeinvoiceitem;
export type PostInvoiceitemsError = Stripeerror;
export type GetInvoiceitemsInvoiceitemInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly invoiceitem: string;
};
export type GetInvoiceitemsInvoiceitemOutput = Stripeinvoiceitem;
export type GetInvoiceitemsInvoiceitemError = Stripeerror;
export type PostInvoiceitemsInvoiceitemInput = {
  readonly amount?: number;
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
  readonly invoicing_rules?: "";
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
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
  readonly tax_code?: string | "";
  readonly tax_rates?: ReadonlyArray<string> | "";
  readonly unit_amount_decimal?: string;
  readonly invoiceitem: string;
};
export type PostInvoiceitemsInvoiceitemOutput = Stripeinvoiceitem;
export type PostInvoiceitemsInvoiceitemError = Stripeerror;
export type DeleteInvoiceitemsInvoiceitemInput = {
  readonly invoiceitem: string;
};
export type DeleteInvoiceitemsInvoiceitemOutput = Stripedeleted_invoiceitem;
export type DeleteInvoiceitemsInvoiceitemError = Stripeerror;

export const GetInvoiceitemsInput = Schema.Struct({
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
  invoice: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  limit: Schema.optionalKey(Schema.Int),
  pending: Schema.optionalKey(Schema.Boolean),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetInvoiceitemsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeinvoiceitem),
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
          new globalThis.RegExp("^\\/v1\\/invoiceitems", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/invoiceitems",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "InvoicesItemsList", description: "" });
export const GetInvoiceitemsError = Stripeerror;
export const PostInvoiceitemsInput = Schema.Struct({
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
      description: "Specifies which fields in the response should be expanded.",
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
});
export const PostInvoiceitemsOutput = Stripeinvoiceitem;
export const PostInvoiceitemsError = Stripeerror;
export const GetInvoiceitemsInvoiceitemInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  invoiceitem: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetInvoiceitemsInvoiceitemOutput = Stripeinvoiceitem;
export const GetInvoiceitemsInvoiceitemError = Stripeerror;
export const PostInvoiceitemsInvoiceitemInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The integer amount in cents (or local equivalent) of the charge to be applied to the upcoming invoice. If you want to apply a credit to the customer's account, pass a negative amount.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        "Controls whether discounts apply to this invoice item. Defaults to false for prorations or negative invoice items, and true for all other invoice items. Cannot be set to true for prorations.",
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
        "The coupons, promotion codes & existing discounts which apply to the invoice item or invoice line item. Item discounts are applied before invoice discounts. Pass an empty string to remove previously-defined discounts.",
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
  invoicing_rules: Schema.optionalKey(
    Schema.Literal("").annotate({
      description:
        "Pass an empty string to remove previously-defined invoicing rules. Setting invoicing rules is not supported.",
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
        "Non-negative decimal with at most 12 decimal places. The quantity of units for the line item.",
      format: "decimal",
    }),
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
        "The tax rates which apply to the invoice item. When set, the `default_tax_rates` on the invoice do not apply to this invoice item. Pass an empty string to remove previously-defined tax rates.",
    }),
  ),
  unit_amount_decimal: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The decimal unit amount in cents (or local equivalent) of the charge to be applied to the upcoming invoice. This `unit_amount_decimal` will be multiplied by the quantity to get the full amount. Passing in a negative `unit_amount_decimal` will reduce the `amount_due` on the invoice. Accepts at most 12 decimal places.",
      format: "decimal",
    }),
  ),
  invoiceitem: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostInvoiceitemsInvoiceitemOutput = Stripeinvoiceitem;
export const PostInvoiceitemsInvoiceitemError = Stripeerror;
export const DeleteInvoiceitemsInvoiceitemInput = Schema.Struct({
  invoiceitem: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteInvoiceitemsInvoiceitemOutput = Stripedeleted_invoiceitem;
export const DeleteInvoiceitemsInvoiceitemError = Stripeerror;
/**
 * The GetInvoiceitemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetInvoiceitemsOperation: StripeOperation & {
  readonly input: typeof GetInvoiceitemsInput;
  readonly output: typeof GetInvoiceitemsOutput;
  readonly error: typeof GetInvoiceitemsError;
} = {
  name: "GetInvoiceitems",
  method: "GET",
  path: "/v1/invoiceitems",
  pathParameters: [],
  queryParameters: [
    "created",
    "customer",
    "customer_account",
    "ending_before",
    "expand",
    "invoice",
    "limit",
    "pending",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetInvoiceitemsInput,
  output: GetInvoiceitemsOutput,
  error: GetInvoiceitemsError,
};
/**
 * The PostInvoiceitemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoiceitemsOperation: StripeOperation & {
  readonly input: typeof PostInvoiceitemsInput;
  readonly output: typeof PostInvoiceitemsOutput;
  readonly error: typeof PostInvoiceitemsError;
} = {
  name: "PostInvoiceitems",
  method: "POST",
  path: "/v1/invoiceitems",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoiceitemsInput,
  output: PostInvoiceitemsOutput,
  error: PostInvoiceitemsError,
};
/**
 * The GetInvoiceitemsInvoiceitemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetInvoiceitemsInvoiceitemOperation: StripeOperation & {
  readonly input: typeof GetInvoiceitemsInvoiceitemInput;
  readonly output: typeof GetInvoiceitemsInvoiceitemOutput;
  readonly error: typeof GetInvoiceitemsInvoiceitemError;
} = {
  name: "GetInvoiceitemsInvoiceitem",
  method: "GET",
  path: "/v1/invoiceitems/{invoiceitem}",
  pathParameters: ["invoiceitem"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetInvoiceitemsInvoiceitemInput,
  output: GetInvoiceitemsInvoiceitemOutput,
  error: GetInvoiceitemsInvoiceitemError,
};
/**
 * The PostInvoiceitemsInvoiceitemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostInvoiceitemsInvoiceitemOperation: StripeOperation & {
  readonly input: typeof PostInvoiceitemsInvoiceitemInput;
  readonly output: typeof PostInvoiceitemsInvoiceitemOutput;
  readonly error: typeof PostInvoiceitemsInvoiceitemError;
} = {
  name: "PostInvoiceitemsInvoiceitem",
  method: "POST",
  path: "/v1/invoiceitems/{invoiceitem}",
  pathParameters: ["invoiceitem"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostInvoiceitemsInvoiceitemInput,
  output: PostInvoiceitemsInvoiceitemOutput,
  error: PostInvoiceitemsInvoiceitemError,
};
/**
 * The DeleteInvoiceitemsInvoiceitemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteInvoiceitemsInvoiceitemOperation: StripeOperation & {
  readonly input: typeof DeleteInvoiceitemsInvoiceitemInput;
  readonly output: typeof DeleteInvoiceitemsInvoiceitemOutput;
  readonly error: typeof DeleteInvoiceitemsInvoiceitemError;
} = {
  name: "DeleteInvoiceitemsInvoiceitem",
  method: "DELETE",
  path: "/v1/invoiceitems/{invoiceitem}",
  pathParameters: ["invoiceitem"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteInvoiceitemsInvoiceitemInput,
  output: DeleteInvoiceitemsInvoiceitemOutput,
  error: DeleteInvoiceitemsInvoiceitemError,
};
/**
 * The makeInvoiceitemsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeInvoiceitemsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetInvoiceitems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetInvoiceitems = Effect.fn("invoiceitems.GetInvoiceitems")(function* (
    input: GetInvoiceitemsInput,
  ) {
    const response: GetInvoiceitemsOutput = yield* client.invoke(
      GetInvoiceitemsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostInvoiceitems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoiceitems = Effect.fn("invoiceitems.PostInvoiceitems")(
    function* (input: PostInvoiceitemsInput) {
      const response: PostInvoiceitemsOutput = yield* client.invoke(
        PostInvoiceitemsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetInvoiceitemsInvoiceitem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetInvoiceitemsInvoiceitem = Effect.fn(
    "invoiceitems.GetInvoiceitemsInvoiceitem",
  )(function* (input: GetInvoiceitemsInvoiceitemInput) {
    const response: GetInvoiceitemsInvoiceitemOutput = yield* client.invoke(
      GetInvoiceitemsInvoiceitemOperation,
      input,
    );
    return response;
  });
  /**
   * The PostInvoiceitemsInvoiceitem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostInvoiceitemsInvoiceitem = Effect.fn(
    "invoiceitems.PostInvoiceitemsInvoiceitem",
  )(function* (input: PostInvoiceitemsInvoiceitemInput) {
    const response: PostInvoiceitemsInvoiceitemOutput = yield* client.invoke(
      PostInvoiceitemsInvoiceitemOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteInvoiceitemsInvoiceitem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteInvoiceitemsInvoiceitem = Effect.fn(
    "invoiceitems.DeleteInvoiceitemsInvoiceitem",
  )(function* (input: DeleteInvoiceitemsInvoiceitemInput) {
    const response: DeleteInvoiceitemsInvoiceitemOutput = yield* client.invoke(
      DeleteInvoiceitemsInvoiceitemOperation,
      input,
    );
    return response;
  });
  return {
    GetInvoiceitems,
    PostInvoiceitems,
    GetInvoiceitemsInvoiceitem,
    PostInvoiceitemsInvoiceitem,
    DeleteInvoiceitemsInvoiceitem,
  };
});
