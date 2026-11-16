// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeProductProps = {
  readonly active?: boolean;
  readonly default_price_data?: {
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
    readonly metadata?: { readonly [x: string]: string };
    readonly recurring?: {
      readonly interval: "day" | "month" | "week" | "year";
      readonly interval_count?: number;
    } & { readonly [x: string]: Schema.Json };
    readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
    readonly unit_amount?: number;
    readonly unit_amount_decimal?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id?: string;
  readonly images?: ReadonlyArray<string>;
  readonly marketing_features?: ReadonlyArray<
    { readonly name: string } & { readonly [x: string]: Schema.Json }
  >;
  readonly metadata?: { readonly [x: string]: string };
  readonly name: string;
  readonly package_dimensions?: {
    readonly height: number;
    readonly length: number;
    readonly weight: number;
    readonly width: number;
  } & { readonly [x: string]: Schema.Json };
  readonly shippable?: boolean;
  readonly statement_descriptor?: string;
  readonly tax_code?: string;
  readonly tax_details?: {
    readonly performance_location?: string;
    readonly tax_code?: string | "";
  } & { readonly [x: string]: Schema.Json };
  readonly unit_label?: string;
  readonly url?: string;
};

export const StripeProductResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "stripe",
  service: "billing",
  resource: "product",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/ProductId"],
});
export const StripeProductPropsSchema = annotateResourceSchema(
  Schema.Struct({
    active: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Whether the product is currently available for purchase. Defaults to `true`.",
      }),
    ),
    default_price_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.String.annotate({ format: "currency" }),
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
                          up_to: Schema.Union([
                            Schema.Literal("inf"),
                            Schema.Int,
                          ]),
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
            ).annotate({ title: "custom_unit_amount" }),
          ),
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          recurring: Schema.optionalKey(
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
      ).annotate({
        title: "price_data_without_product_with_metadata",
        description:
          "Data used to generate a new [Price](https://docs.stripe.com/api/prices) object. This Price will be set as the default price for this product.",
      }),
    ),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.",
      }).check(
        Schema.isMaxCodePoints(40000).annotate({
          expected: "a string with at most 40000 code points",
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
      ).annotate({
        description:
          "Specifies which fields in the response should be expanded.",
      }),
    ),
    id: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An identifier will be randomly generated by Stripe. You can optionally override this ID, but the ID must be unique across all products in your Stripe account.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    images: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description:
          "A list of up to 8 URLs of images for this product, meant to be displayable to the customer.",
      }),
    ),
    marketing_features: Schema.optionalKey(
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            name: Schema.String.check(
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
        ).annotate({ title: "features" }),
      ).annotate({
        description:
          "A list of up to 15 marketing features for this product. These are displayed in [pricing tables](https://docs.stripe.com/payments/checkout/pricing-table).",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    name: Schema.String.annotate({
      description:
        "The product's name, meant to be displayable to the customer.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    package_dimensions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          height: Schema.Finite,
          length: Schema.Finite,
          weight: Schema.Finite,
          width: Schema.Finite,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "package_dimensions_specs",
        description: "The dimensions of this product for shipping purposes.",
      }),
    ),
    shippable: Schema.optionalKey(
      Schema.Boolean.annotate({
        description: "Whether this product is shipped (i.e., physical goods).",
      }),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string to be displayed on your customer's credit card or bank statement. While most banks display this information consistently, some may display it incorrectly or not at all.\n\nThis may be up to 22 characters. The statement description may not include `<`, `>`, `\\`, `\"`, `'` characters, and will appear on your customer's statement in capital letters. Non-ASCII characters are automatically stripped.\n It must contain at least one letter. Only used for subscription payments.",
      }).check(
        Schema.isMaxCodePoints(22).annotate({
          expected: "a string with at most 22 code points",
        }),
      ),
    ),
    tax_code: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A [tax code](https://docs.stripe.com/tax/tax-categories) ID.",
      }),
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
      ).annotate({
        title: "tax_details",
        description:
          "Tax details for this product, including the [tax code](/tax/tax-codes) and an optional performance location.",
      }),
    ),
    unit_label: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A label that represents units of this product. When set, this will be included in customers' receipts, invoices, Checkout, and the customer portal.",
      }).check(
        Schema.isMaxCodePoints(12).annotate({
          expected: "a string with at most 12 code points",
        }),
      ),
    ),
    url: Schema.optionalKey(
      Schema.String.annotate({
        description: "A URL of a publicly-accessible webpage for this product.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  StripeProductResourceSchema,
);
