// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_94 } from "./StripeResourceEntityInputAlternatives_94.js";
import { StripeResourceEntityInputAlternatives_95 } from "./StripeResourceEntityInputAlternatives_95.js";

export type StripeResourceEntityInputAlternatives_93 =
  | ReadonlyArray<
      {
        readonly coupon?: StripeResourceEntityInputAlternatives_94;
        readonly discount?: string;
        readonly promotion_code?: StripeResourceEntityInputAlternatives_95;
      } & {
        readonly [x: string]:
          | ResourceInputJson
          | StripeResourceEntityInputAlternatives_94
          | StripeResourceEntityInputAlternatives_95;
      }
    >
  | "";

export const StripeResourceEntityInputAlternatives_93 = Schema.Union([
  Schema.Array(
    Schema.StructWithRest(
      Schema.Struct({
        coupon: Schema.optionalKey(StripeResourceEntityInputAlternatives_94),
        discount: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        promotion_code: Schema.optionalKey(
          StripeResourceEntityInputAlternatives_95,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Union([
            ResourceInputJsonSchema,
            StripeResourceEntityInputAlternatives_94,
            StripeResourceEntityInputAlternatives_95,
          ]),
        ),
      ],
    ).annotate({ title: "schedule_discounts_data_param" }),
  ),
  Schema.Literal(""),
]);
