// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_55 } from "./StripeResourceEntityInputAlternatives_55.js";

export type StripeResourceEntityInputAlternatives_54 =
  | ({
      readonly additional_documentation?: StripeResourceEntityInputAlternatives_55;
      readonly expected_at?: number | "";
      readonly explanation?: string | "";
      readonly product_description?: string | "";
      readonly product_type?: "" | "merchandise" | "service";
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_55;
    })
  | "";

export const StripeResourceEntityInputAlternatives_54 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      additional_documentation: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_55,
      ),
      expected_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Literal(""),
        ]),
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
          StripeResourceEntityInputAlternatives_55,
        ]),
      ),
    ],
  ).annotate({ title: "not_received" }),
  Schema.Literal(""),
]);
