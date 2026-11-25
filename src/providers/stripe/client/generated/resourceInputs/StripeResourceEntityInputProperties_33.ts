// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_98 } from "./StripeResourceEntityInputAlternatives_98.js";

export type StripeResourceEntityInputProperties_33 = {
  readonly amount_percent?: number;
  readonly destination: StripeResourceEntityInputAlternatives_98;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_98;
};

export const StripeResourceEntityInputProperties_33 = Schema.StructWithRest(
  Schema.Struct({
    amount_percent: Schema.optionalKey(Schema.Finite),
    destination: StripeResourceEntityInputAlternatives_98,
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_98,
      ]),
    ),
  ],
).annotate({ title: "transfer_data_specs" });
