// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_51 } from "./StripeResourceEntityInputAlternatives_51.js";

export type StripeResourceEntityInputAlternatives_50 =
  | ({
      readonly additional_documentation?: StripeResourceEntityInputAlternatives_51;
      readonly explanation?: string | "";
      readonly received_at?: number | "";
      readonly return_description?: string | "";
      readonly return_status?: "" | "merchant_rejected" | "successful";
      readonly returned_at?: number | "";
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_51;
    })
  | "";

export const StripeResourceEntityInputAlternatives_50 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      additional_documentation: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_51,
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
      received_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Literal(""),
        ]),
      ),
      return_description: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2500).annotate({
              expected: "a string with at most 2500 code points",
            }),
          ),
          Schema.Literal(""),
        ]),
      ),
      return_status: Schema.optionalKey(
        Schema.Literals(["", "merchant_rejected", "successful"]),
      ),
      returned_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
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
          StripeResourceEntityInputAlternatives_51,
        ]),
      ),
    ],
  ).annotate({ title: "merchandise_not_as_described" }),
  Schema.Literal(""),
]);
