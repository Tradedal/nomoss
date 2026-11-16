// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeprice } from "./models/catalog.js";
import { Stripeerror } from "./models/common.js";

export type GetPricesInput = {
  readonly active?: boolean;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly currency?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly lookup_keys?: ReadonlyArray<string>;
  readonly product?: string;
  readonly recurring?: {
    readonly interval?: "day" | "month" | "week" | "year";
    readonly meter?: string;
    readonly usage_type?: "licensed" | "metered";
  } & { readonly [x: string]: Schema.Json };
  readonly starting_after?: string;
  readonly type?: "one_time" | "recurring";
};
export type GetPricesOutput = {
  readonly data: ReadonlyArray<Stripeprice>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPricesError = Stripeerror;
export type PostPricesInput = {
  readonly active?: boolean;
  readonly billing_scheme?: "per_unit" | "tiered";
  readonly currency: string;
  readonly currency_options?: {
    readonly [x: string]: {
      readonly custom_unit_amount?: {
        readonly enabled: boolean;
        readonly maximum?: number;
        readonly minimum?: number;
        readonly preset?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
      readonly tiers?: ReadonlyArray<
        {
          readonly flat_amount?: number;
          readonly flat_amount_decimal?: string;
          readonly unit_amount?: number;
          readonly unit_amount_decimal?: string;
          readonly up_to: "inf" | number;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly unit_amount?: number;
      readonly unit_amount_decimal?: string;
    } & { readonly [x: string]: Schema.Json };
  };
  readonly custom_unit_amount?: {
    readonly enabled: boolean;
    readonly maximum?: number;
    readonly minimum?: number;
    readonly preset?: number;
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly lookup_key?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly nickname?: string;
  readonly product?: string;
  readonly product_data?: {
    readonly active?: boolean;
    readonly id?: string;
    readonly metadata?: { readonly [x: string]: string };
    readonly name: string;
    readonly statement_descriptor?: string;
    readonly tax_code?: string;
    readonly tax_details?: {
      readonly performance_location?: string;
      readonly tax_code?: string | "";
    } & { readonly [x: string]: Schema.Json };
    readonly unit_label?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly recurring?: {
    readonly interval: "day" | "month" | "week" | "year";
    readonly interval_count?: number;
    readonly meter?: string;
    readonly usage_type?: "licensed" | "metered";
  } & { readonly [x: string]: Schema.Json };
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
  readonly tiers?: ReadonlyArray<
    {
      readonly flat_amount?: number;
      readonly flat_amount_decimal?: string;
      readonly unit_amount?: number;
      readonly unit_amount_decimal?: string;
      readonly up_to: "inf" | number;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly tiers_mode?: "graduated" | "volume";
  readonly transfer_lookup_key?: boolean;
  readonly transform_quantity?: {
    readonly divide_by: number;
    readonly round: "down" | "up";
  } & { readonly [x: string]: Schema.Json };
  readonly unit_amount?: number;
  readonly unit_amount_decimal?: string;
};
export type PostPricesOutput = Stripeprice;
export type PostPricesError = Stripeerror;
export type GetPricesSearchInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly page?: string;
  readonly query: string;
};
export type GetPricesSearchOutput = {
  readonly data: ReadonlyArray<Stripeprice>;
  readonly has_more: boolean;
  readonly next_page?: string | null;
  readonly object: "search_result";
  readonly total_count?: number;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPricesSearchError = Stripeerror;
export type GetPricesPriceInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly price: string;
};
export type GetPricesPriceOutput = Stripeprice;
export type GetPricesPriceError = Stripeerror;
export type PostPricesPriceInput = {
  readonly active?: boolean;
  readonly currency_options?:
    | {
        readonly [x: string]: {
          readonly custom_unit_amount?: {
            readonly enabled: boolean;
            readonly maximum?: number;
            readonly minimum?: number;
            readonly preset?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
          readonly tiers?: ReadonlyArray<
            {
              readonly flat_amount?: number;
              readonly flat_amount_decimal?: string;
              readonly unit_amount?: number;
              readonly unit_amount_decimal?: string;
              readonly up_to: "inf" | number;
            } & { readonly [x: string]: Schema.Json }
          >;
          readonly unit_amount?: number;
          readonly unit_amount_decimal?: string;
        } & { readonly [x: string]: Schema.Json };
      }
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly lookup_key?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly nickname?: string;
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
  readonly transfer_lookup_key?: boolean;
  readonly price: string;
};
export type PostPricesPriceOutput = Stripeprice;
export type PostPricesPriceError = Stripeerror;

export const GetPricesInput = Schema.Struct({
  active: Schema.optionalKey(Schema.Boolean),
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
  currency: Schema.optionalKey(Schema.String.annotate({ format: "currency" })),
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
  lookup_keys: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  product: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  recurring: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        interval: Schema.optionalKey(
          Schema.Literals(["day", "month", "week", "year"]),
        ),
        meter: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        usage_type: Schema.optionalKey(
          Schema.Literals(["licensed", "metered"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "all_prices_recurring_params" }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  type: Schema.optionalKey(Schema.Literals(["one_time", "recurring"])),
});
export const GetPricesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeprice).annotate({
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
    })
      .check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^\\/v1\\/prices", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/prices",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "PriceList", description: "" });
export const GetPricesError = Stripeerror;
export const PostPricesInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the price can be used for new purchases. Defaults to `true`.",
    }),
  ),
  billing_scheme: Schema.optionalKey(
    Schema.Literals(["per_unit", "tiered"]).annotate({
      description:
        "Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.",
    }),
  ),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
    format: "currency",
  }),
  currency_options: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.StructWithRest(
        Schema.Struct({
          custom_unit_amount: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                maximum: Schema.optionalKey(Schema.Int),
                minimum: Schema.optionalKey(Schema.Int),
                preset: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "custom_unit_amount" }),
          ),
          tax_behavior: Schema.optionalKey(
            Schema.Literals(["exclusive", "inclusive", "unspecified"]),
          ),
          tiers: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  flat_amount: Schema.optionalKey(Schema.Int),
                  flat_amount_decimal: Schema.optionalKey(
                    Schema.String.annotate({ format: "decimal" }),
                  ),
                  unit_amount: Schema.optionalKey(Schema.Int),
                  unit_amount_decimal: Schema.optionalKey(
                    Schema.String.annotate({ format: "decimal" }),
                  ),
                  up_to: Schema.Union([Schema.Literal("inf"), Schema.Int]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "tier" }),
            ),
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
      ).annotate({ title: "currency_option" }),
    ).annotate({
      description:
        "Prices defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
    }),
  ),
  custom_unit_amount: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enabled: Schema.Boolean,
        maximum: Schema.optionalKey(Schema.Int),
        minimum: Schema.optionalKey(Schema.Int),
        preset: Schema.optionalKey(Schema.Int),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "custom_unit_amount",
      description:
        "When set, provides configuration for the amount to be adjusted by the customer during Checkout Sessions and Payment Links.",
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
  lookup_key: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.",
    }).check(
      Schema.isMaxCodePoints(200).annotate({
        expected: "a string with at most 200 code points",
      }),
    ),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  nickname: Schema.optionalKey(
    Schema.String.annotate({
      description: "A brief description of the price, hidden from customers.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  product: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the [Product](https://docs.stripe.com/api/products) that this [Price](https://docs.stripe.com/api/prices) will belong to.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  product_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        active: Schema.optionalKey(Schema.Boolean),
        id: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        name: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(22).annotate({
              expected: "a string with at most 22 code points",
            }),
          ),
        ),
        tax_code: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        tax_details: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              performance_location: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              tax_code: Schema.optionalKey(
                Schema.Union([Schema.String, Schema.Literal("")]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "tax_details" }),
        ),
        unit_label: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(12).annotate({
              expected: "a string with at most 12 code points",
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
      title: "inline_product_params",
      description:
        "These fields can be used to create a new product that this price will belong to.",
    }),
  ),
  recurring: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        interval: Schema.Literals(["day", "month", "week", "year"]),
        interval_count: Schema.optionalKey(Schema.Int),
        meter: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        usage_type: Schema.optionalKey(
          Schema.Literals(["licensed", "metered"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "recurring",
      description:
        "The recurring components of a price such as `interval` and `usage_type`.",
    }),
  ),
  tax_behavior: Schema.optionalKey(
    Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate({
      description:
        "Only required if a [default tax behavior](https://docs.stripe.com/tax/products-prices-tax-categories-tax-behavior#setting-a-default-tax-behavior-(recommended)) was not provided in the Stripe Tax settings. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.",
    }),
  ),
  tiers: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          flat_amount: Schema.optionalKey(Schema.Int),
          flat_amount_decimal: Schema.optionalKey(
            Schema.String.annotate({ format: "decimal" }),
          ),
          unit_amount: Schema.optionalKey(Schema.Int),
          unit_amount_decimal: Schema.optionalKey(
            Schema.String.annotate({ format: "decimal" }),
          ),
          up_to: Schema.Union([Schema.Literal("inf"), Schema.Int]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "tier" }),
    ).annotate({
      description:
        "Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.",
    }),
  ),
  tiers_mode: Schema.optionalKey(
    Schema.Literals(["graduated", "volume"]).annotate({
      description:
        "Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price, in `graduated` tiering pricing can successively change as the quantity grows.",
    }),
  ),
  transfer_lookup_key: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If set to true, will atomically remove the lookup key from the existing price, and assign it to this price.",
    }),
  ),
  transform_quantity: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        divide_by: Schema.Int,
        round: Schema.Literals(["down", "up"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "transform_usage_param",
      description:
        "Apply a transformation to the reported usage or set quantity before computing the billed price. Cannot be combined with `tiers`.",
    }),
  ),
  unit_amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer in cents (or local equivalent) (or 0 for a free price) representing how much to charge. One of `unit_amount`, `unit_amount_decimal`, or `custom_unit_amount` is required, unless `billing_scheme=tiered`.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  unit_amount_decimal: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Same as `unit_amount`, but accepts a decimal value in cents (or local equivalent) with at most 12 decimal places. Only one of `unit_amount` and `unit_amount_decimal` can be set.",
      format: "decimal",
    }),
  ),
});
export const PostPricesOutput = Stripeprice;
export const PostPricesError = Stripeerror;
export const GetPricesSearchInput = Schema.Struct({
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
  page: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  query: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPricesSearchOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeprice),
    has_more: Schema.Boolean,
    next_page: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("search_result").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    total_count: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The total number of objects that match the query, only accurate up to 10,000.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    url: Schema.String.check(
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
).annotate({ title: "SearchResult", description: "" });
export const GetPricesSearchError = Stripeerror;
export const GetPricesPriceInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  price: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPricesPriceOutput = Stripeprice;
export const GetPricesPriceError = Stripeerror;
export const PostPricesPriceInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the price can be used for new purchases. Defaults to `true`.",
    }),
  ),
  currency_options: Schema.optionalKey(
    Schema.Union([
      Schema.Record(
        Schema.String,
        Schema.StructWithRest(
          Schema.Struct({
            custom_unit_amount: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  enabled: Schema.Boolean,
                  maximum: Schema.optionalKey(Schema.Int),
                  minimum: Schema.optionalKey(Schema.Int),
                  preset: Schema.optionalKey(Schema.Int),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "custom_unit_amount" }),
            ),
            tax_behavior: Schema.optionalKey(
              Schema.Literals(["exclusive", "inclusive", "unspecified"]),
            ),
            tiers: Schema.optionalKey(
              Schema.Array(
                Schema.StructWithRest(
                  Schema.Struct({
                    flat_amount: Schema.optionalKey(Schema.Int),
                    flat_amount_decimal: Schema.optionalKey(
                      Schema.String.annotate({ format: "decimal" }),
                    ),
                    unit_amount: Schema.optionalKey(Schema.Int),
                    unit_amount_decimal: Schema.optionalKey(
                      Schema.String.annotate({ format: "decimal" }),
                    ),
                    up_to: Schema.Union([Schema.Literal("inf"), Schema.Int]),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "tier" }),
              ),
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
        ).annotate({ title: "currency_option" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Prices defined in each available currency option. Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
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
  lookup_key: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.",
    }).check(
      Schema.isMaxCodePoints(200).annotate({
        expected: "a string with at most 200 code points",
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
  nickname: Schema.optionalKey(
    Schema.String.annotate({
      description: "A brief description of the price, hidden from customers.",
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
  transfer_lookup_key: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If set to true, will atomically remove the lookup key from the existing price, and assign it to this price.",
    }),
  ),
  price: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPricesPriceOutput = Stripeprice;
export const PostPricesPriceError = Stripeerror;
/**
 * The GetPricesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPricesOperation: StripeOperation & {
  readonly input: typeof GetPricesInput;
  readonly output: typeof GetPricesOutput;
  readonly error: typeof GetPricesError;
} = {
  name: "GetPrices",
  method: "GET",
  path: "/v1/prices",
  pathParameters: [],
  queryParameters: [
    "active",
    "created",
    "currency",
    "ending_before",
    "expand",
    "limit",
    "lookup_keys",
    "product",
    "recurring",
    "starting_after",
    "type",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPricesInput,
  output: GetPricesOutput,
  error: GetPricesError,
};
/**
 * The PostPricesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPricesOperation: StripeOperation & {
  readonly input: typeof PostPricesInput;
  readonly output: typeof PostPricesOutput;
  readonly error: typeof PostPricesError;
} = {
  name: "PostPrices",
  method: "POST",
  path: "/v1/prices",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPricesInput,
  output: PostPricesOutput,
  error: PostPricesError,
};
/**
 * The GetPricesSearchOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPricesSearchOperation: StripeOperation & {
  readonly input: typeof GetPricesSearchInput;
  readonly output: typeof GetPricesSearchOutput;
  readonly error: typeof GetPricesSearchError;
} = {
  name: "GetPricesSearch",
  method: "GET",
  path: "/v1/prices/search",
  pathParameters: [],
  queryParameters: ["expand", "limit", "page", "query"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPricesSearchInput,
  output: GetPricesSearchOutput,
  error: GetPricesSearchError,
};
/**
 * The GetPricesPriceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPricesPriceOperation: StripeOperation & {
  readonly input: typeof GetPricesPriceInput;
  readonly output: typeof GetPricesPriceOutput;
  readonly error: typeof GetPricesPriceError;
} = {
  name: "GetPricesPrice",
  method: "GET",
  path: "/v1/prices/{price}",
  pathParameters: ["price"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPricesPriceInput,
  output: GetPricesPriceOutput,
  error: GetPricesPriceError,
};
/**
 * The PostPricesPriceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPricesPriceOperation: StripeOperation & {
  readonly input: typeof PostPricesPriceInput;
  readonly output: typeof PostPricesPriceOutput;
  readonly error: typeof PostPricesPriceError;
} = {
  name: "PostPricesPrice",
  method: "POST",
  path: "/v1/prices/{price}",
  pathParameters: ["price"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPricesPriceInput,
  output: PostPricesPriceOutput,
  error: PostPricesPriceError,
};
/**
 * The makePricesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makePricesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetPrices function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPrices = Effect.fn("prices.GetPrices")(function* (
    input: GetPricesInput,
  ) {
    const response: GetPricesOutput = yield* client.invoke(
      GetPricesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPrices function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPrices = Effect.fn("prices.PostPrices")(function* (
    input: PostPricesInput,
  ) {
    const response: PostPricesOutput = yield* client.invoke(
      PostPricesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetPricesSearch function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPricesSearch = Effect.fn("prices.GetPricesSearch")(function* (
    input: GetPricesSearchInput,
  ) {
    const response: GetPricesSearchOutput = yield* client.invoke(
      GetPricesSearchOperation,
      input,
    );
    return response;
  });
  /**
   * The GetPricesPrice function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPricesPrice = Effect.fn("prices.GetPricesPrice")(function* (
    input: GetPricesPriceInput,
  ) {
    const response: GetPricesPriceOutput = yield* client.invoke(
      GetPricesPriceOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPricesPrice function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPricesPrice = Effect.fn("prices.PostPricesPrice")(function* (
    input: PostPricesPriceInput,
  ) {
    const response: PostPricesPriceOutput = yield* client.invoke(
      PostPricesPriceOperation,
      input,
    );
    return response;
  });
  return {
    GetPrices,
    PostPrices,
    GetPricesSearch,
    GetPricesPrice,
    PostPricesPrice,
  };
});
