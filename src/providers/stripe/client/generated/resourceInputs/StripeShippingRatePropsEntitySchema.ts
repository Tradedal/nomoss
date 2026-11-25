// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeShippingRateResourceSchema } from "./StripeShippingRatePropsSchema.js";

export type StripeShippingRatePropsEntity = {
  readonly delivery_estimate?: {
    readonly maximum?: {
      readonly unit: "business_day" | "day" | "hour" | "month" | "week";
      readonly value: number;
    } & { readonly [x: string]: Schema.Json };
    readonly minimum?: {
      readonly unit: "business_day" | "day" | "hour" | "month" | "week";
      readonly value: number;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly display_name: string;
  readonly expand?: ReadonlyArray<string>;
  readonly fixed_amount?: {
    readonly amount: number;
    readonly currency: string;
    readonly currency_options?: {
      readonly [x: string]: {
        readonly amount: number;
        readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
      } & { readonly [x: string]: Schema.Json };
    };
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
  readonly tax_code?: string;
  readonly type?: "fixed_amount";
};

export const StripeShippingRatePropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    delivery_estimate: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          maximum: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                unit: Schema.Literals([
                  "business_day",
                  "day",
                  "hour",
                  "month",
                  "week",
                ]),
                value: Schema.Int,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "delivery_estimate_bound" }),
          ),
          minimum: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                unit: Schema.Literals([
                  "business_day",
                  "day",
                  "hour",
                  "month",
                  "week",
                ]),
                value: Schema.Int,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "delivery_estimate_bound" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "delivery_estimate",
        description:
          "The estimated range for how long shipping will take, meant to be displayable to the customer. This will appear on CheckoutSessions.",
      }),
    ),
    display_name: Schema.String.annotate({
      description:
        "The name of the shipping rate, meant to be displayable to the customer. This will appear on CheckoutSessions.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
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
    fixed_amount: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.Int,
          currency: Schema.String.annotate({ format: "currency" }),
          currency_options: Schema.optionalKey(
            Schema.Record(
              Schema.String,
              Schema.StructWithRest(
                Schema.Struct({
                  amount: Schema.Int,
                  tax_behavior: Schema.optionalKey(
                    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
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
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "fixed_amount",
        description:
          "Describes a fixed amount to charge for shipping. Must be present if type is `fixed_amount`.",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    tax_behavior: Schema.optionalKey(
      Schema.Literals(["exclusive", "inclusive", "unspecified"]).annotate({
        description:
          "Specifies whether the rate is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`.",
      }),
    ),
    tax_code: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A [tax code](https://docs.stripe.com/tax/tax-categories) ID. The Shipping tax code is `txcd_92010001`.",
      }),
    ),
    type: Schema.optionalKey(
      Schema.Literal("fixed_amount").annotate({
        description: "The type of calculation to use on the shipping rate.",
      }),
    ),
  }),
  StripeShippingRateResourceSchema,
);
