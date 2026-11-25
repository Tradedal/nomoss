// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_85 } from "./StripeResourceEntityInputAlternatives_85.js";
import { StripeResourceEntityInputItems_4 } from "./StripeResourceEntityInputItems_4.js";

export type StripeResourceEntityInputItems_3 = ReadonlyArray<
  {
    readonly discountable?: boolean;
    readonly discounts?: StripeResourceEntityInputItems_4;
    readonly metadata?: { readonly [x: string]: string };
    readonly period?: {
      readonly end: {
        readonly timestamp?: number;
        readonly type: "min_item_period_end" | "phase_end" | "timestamp";
      } & { readonly [x: string]: Schema.Json };
      readonly start: {
        readonly timestamp?: number;
        readonly type: "max_item_period_start" | "phase_start" | "timestamp";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly price?: StripeResourceEntityInputAlternatives_85;
    readonly price_data?: {
      readonly currency: string;
      readonly product: string;
      readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
      readonly unit_amount?: number;
      readonly unit_amount_decimal?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly quantity?: number;
    readonly tax_rates?: ReadonlyArray<string> | "";
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputItems_4
      | StripeResourceEntityInputAlternatives_85;
  }
>;

export const StripeResourceEntityInputItems_3 = Schema.Array(
  Schema.StructWithRest(
    Schema.Struct({
      discountable: Schema.optionalKey(Schema.Boolean),
      discounts: Schema.optionalKey(StripeResourceEntityInputItems_4),
      metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
      period: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            end: Schema.StructWithRest(
              Schema.Struct({
                timestamp: Schema.optionalKey(
                  Schema.Number.annotate({ format: "unix-time" }).check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  ),
                ),
                type: Schema.Literals([
                  "min_item_period_end",
                  "phase_end",
                  "timestamp",
                ]),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "invoice_item_period_end" }),
            start: Schema.StructWithRest(
              Schema.Struct({
                timestamp: Schema.optionalKey(
                  Schema.Number.annotate({ format: "unix-time" }).check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  ),
                ),
                type: Schema.Literals([
                  "max_item_period_start",
                  "phase_start",
                  "timestamp",
                ]),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "invoice_item_period_start" }),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "invoice_item_period" }),
      ),
      price: Schema.optionalKey(StripeResourceEntityInputAlternatives_85),
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
        ).annotate({ title: "one_time_price_data_with_negative_amounts" }),
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
          StripeResourceEntityInputItems_4,
          StripeResourceEntityInputAlternatives_85,
        ]),
      ),
    ],
  ).annotate({ title: "add_invoice_item_entry" }),
);
