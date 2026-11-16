// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_83 } from "./StripeResourceEntityInputAlternatives_83.js";
import { StripeResourceEntityInputAlternatives_84 } from "./StripeResourceEntityInputAlternatives_84.js";

export type StripeResourceEntityInputItems_4 = ReadonlyArray<
  {
    readonly coupon?: StripeResourceEntityInputAlternatives_83;
    readonly discount?: string;
    readonly promotion_code?: StripeResourceEntityInputAlternatives_84;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_83
      | StripeResourceEntityInputAlternatives_84;
  }
>;

export const StripeResourceEntityInputItems_4 = Schema.Array(
  Schema.StructWithRest(
    Schema.Struct({
      coupon: Schema.optionalKey(StripeResourceEntityInputAlternatives_83),
      discount: Schema.optionalKey(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      promotion_code: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_84,
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_83,
          StripeResourceEntityInputAlternatives_84,
        ]),
      ),
    ],
  ).annotate({ title: "discounts_data_param" }),
);
