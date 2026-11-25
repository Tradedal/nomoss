// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_82 } from "./StripeResourceEntityInputAlternatives_82.js";

export type StripeResourceEntityInputAlternatives_81 =
  | ({
      readonly amount_percent?: number;
      readonly destination: StripeResourceEntityInputAlternatives_82;
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_82;
    })
  | "";

export const StripeResourceEntityInputAlternatives_81 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      amount_percent: Schema.optionalKey(Schema.Finite),
      destination: StripeResourceEntityInputAlternatives_82,
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_82,
        ]),
      ),
    ],
  ).annotate({ title: "transfer_data_specs" }),
  Schema.Literal(""),
]);
