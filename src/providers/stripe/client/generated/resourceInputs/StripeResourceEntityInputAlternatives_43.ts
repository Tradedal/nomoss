// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_44 } from "./StripeResourceEntityInputAlternatives_44.js";
import { StripeResourceEntityInputAlternatives_45 } from "./StripeResourceEntityInputAlternatives_45.js";
import { StripeResourceEntityInputAlternatives_46 } from "./StripeResourceEntityInputAlternatives_46.js";
import { StripeResourceEntityInputAlternatives_47 } from "./StripeResourceEntityInputAlternatives_47.js";

export type StripeResourceEntityInputAlternatives_43 =
  | ({
      readonly additional_documentation?: StripeResourceEntityInputAlternatives_44;
      readonly card_statement?: StripeResourceEntityInputAlternatives_45;
      readonly cash_receipt?: StripeResourceEntityInputAlternatives_46;
      readonly check_image?: StripeResourceEntityInputAlternatives_47;
      readonly explanation?: string | "";
      readonly original_transaction?: string;
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_44
        | StripeResourceEntityInputAlternatives_45
        | StripeResourceEntityInputAlternatives_46
        | StripeResourceEntityInputAlternatives_47;
    })
  | "";

export const StripeResourceEntityInputAlternatives_43 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      additional_documentation: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_44,
      ),
      card_statement: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_45,
      ),
      cash_receipt: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_46,
      ),
      check_image: Schema.optionalKey(StripeResourceEntityInputAlternatives_47),
      explanation: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2500).annotate({
              expected: "a string with at most 2500 code points",
            }),
          ),
          Schema.Literal(""),
        ]),
      ),
      original_transaction: Schema.optionalKey(
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
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_44,
          StripeResourceEntityInputAlternatives_45,
          StripeResourceEntityInputAlternatives_46,
          StripeResourceEntityInputAlternatives_47,
        ]),
      ),
    ],
  ).annotate({ title: "duplicate" }),
  Schema.Literal(""),
]);
