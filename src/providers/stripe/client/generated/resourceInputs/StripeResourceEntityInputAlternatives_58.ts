// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_59 } from "./StripeResourceEntityInputAlternatives_59.js";

export type StripeResourceEntityInputAlternatives_58 =
  | ({
      readonly additional_documentation?: StripeResourceEntityInputAlternatives_59;
      readonly canceled_at?: number | "";
      readonly cancellation_reason?: string | "";
      readonly explanation?: string | "";
      readonly received_at?: number | "";
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_59;
    })
  | "";

export const StripeResourceEntityInputAlternatives_58 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      additional_documentation: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_59,
      ),
      canceled_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Literal(""),
        ]),
      ),
      cancellation_reason: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2500).annotate({
              expected: "a string with at most 2500 code points",
            }),
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
      received_at: Schema.optionalKey(
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
          StripeResourceEntityInputAlternatives_59,
        ]),
      ),
    ],
  ).annotate({ title: "service_not_as_described" }),
  Schema.Literal(""),
]);
