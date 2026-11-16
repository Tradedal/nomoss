// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_53 } from "./StripeResourceEntityInputAlternatives_53.js";

export type StripeResourceEntityInputAlternatives_52 =
  | ({
      readonly additional_documentation?: StripeResourceEntityInputAlternatives_53;
      readonly explanation?: string | "";
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_53;
    })
  | "";

export const StripeResourceEntityInputAlternatives_52 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      additional_documentation: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_53,
      ),
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
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_53,
        ]),
      ),
    ],
  ).annotate({ title: "no_valid_authorization" }),
  Schema.Literal(""),
]);
