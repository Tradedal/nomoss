// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_89 } from "./StripeResourceEntityInputAlternatives_89.js";
import { StripeResourceEntityInputAlternatives_90 } from "./StripeResourceEntityInputAlternatives_90.js";

export type StripeResourceEntityInputAlternatives_88 =
  | ReadonlyArray<
      {
        readonly coupon?: StripeResourceEntityInputAlternatives_89;
        readonly discount?: string;
        readonly promotion_code?: StripeResourceEntityInputAlternatives_90;
      } & {
        readonly [x: string]:
          | ResourceInputJson
          | StripeResourceEntityInputAlternatives_89
          | StripeResourceEntityInputAlternatives_90;
      }
    >
  | "";

export const StripeResourceEntityInputAlternatives_88 = Schema.Union([
  Schema.Array(
    Schema.StructWithRest(
      Schema.Struct({
        coupon: Schema.optionalKey(StripeResourceEntityInputAlternatives_89),
        discount: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        promotion_code: Schema.optionalKey(
          StripeResourceEntityInputAlternatives_90,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Union([
            ResourceInputJsonSchema,
            StripeResourceEntityInputAlternatives_89,
            StripeResourceEntityInputAlternatives_90,
          ]),
        ),
      ],
    ).annotate({ title: "schedule_discounts_data_param" }),
  ),
  Schema.Literal(""),
]);
