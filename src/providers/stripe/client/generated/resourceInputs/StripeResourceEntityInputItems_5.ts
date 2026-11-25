// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_93 } from "./StripeResourceEntityInputAlternatives_93.js";
import { StripeResourceEntityInputAlternatives_96 } from "./StripeResourceEntityInputAlternatives_96.js";

export type StripeResourceEntityInputItems_5 = ReadonlyArray<
  {
    readonly billing_thresholds?:
      | ({ readonly usage_gte: number } & { readonly [x: string]: Schema.Json })
      | "";
    readonly discounts?: StripeResourceEntityInputAlternatives_93;
    readonly metadata?: { readonly [x: string]: string };
    readonly price?: StripeResourceEntityInputAlternatives_96;
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
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_93
      | StripeResourceEntityInputAlternatives_96;
  }
>;

export const StripeResourceEntityInputItems_5 = Schema.Array(
  Schema.StructWithRest(
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
        ]),
      ),
      discounts: Schema.optionalKey(StripeResourceEntityInputAlternatives_93),
      metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
      price: Schema.optionalKey(StripeResourceEntityInputAlternatives_96),
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
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_93,
          StripeResourceEntityInputAlternatives_96,
        ]),
      ),
    ],
  ).annotate({ title: "configuration_item_params" }),
);
