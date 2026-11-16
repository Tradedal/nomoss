// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_12 } from "./StripeResourceEntityInputAlternatives_12.js";
import { StripeResourceEntityInputItems_1 } from "./StripeResourceEntityInputItems_1.js";

export type StripeResourceEntityInputAlternatives_11 =
  | ReadonlyArray<
      {
        readonly adjustable_quantity?: {
          readonly enabled: boolean;
          readonly maximum?: number;
          readonly minimum?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly prices: StripeResourceEntityInputItems_1;
        readonly product: StripeResourceEntityInputAlternatives_12;
      } & {
        readonly [x: string]:
          | ResourceInputJson
          | StripeResourceEntityInputItems_1
          | StripeResourceEntityInputAlternatives_12;
      }
    >
  | "";

export const StripeResourceEntityInputAlternatives_11 = Schema.Union([
  Schema.Array(
    Schema.StructWithRest(
      Schema.Struct({
        adjustable_quantity: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              enabled: Schema.Boolean,
              maximum: Schema.optionalKey(Schema.Int),
              minimum: Schema.optionalKey(Schema.Int),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({
            title: "subscription_update_product_adjustable_quantity_param",
          }),
        ),
        prices: StripeResourceEntityInputItems_1,
        product: StripeResourceEntityInputAlternatives_12,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Union([
            ResourceInputJsonSchema,
            StripeResourceEntityInputItems_1,
            StripeResourceEntityInputAlternatives_12,
          ]),
        ),
      ],
    ).annotate({ title: "subscription_update_product_param" }),
  ),
  Schema.Literal(""),
]);
