// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_57 } from "./StripeResourceEntityInputAlternatives_57.js";

export type StripeResourceEntityInputAlternatives_56 =
  | ({
      readonly additional_documentation?: StripeResourceEntityInputAlternatives_57;
      readonly explanation?: string | "";
      readonly product_description?: string | "";
      readonly product_type?: "" | "merchandise" | "service";
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_57;
    })
  | "";

export const StripeResourceEntityInputAlternatives_56 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      additional_documentation: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_57,
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
      product_description: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2500).annotate({
              expected: "a string with at most 2500 code points",
            }),
          ),
          Schema.Literal(""),
        ]),
      ),
      product_type: Schema.optionalKey(
        Schema.Literals(["", "merchandise", "service"]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_57,
        ]),
      ),
    ],
  ).annotate({ title: "other" }),
  Schema.Literal(""),
]);
