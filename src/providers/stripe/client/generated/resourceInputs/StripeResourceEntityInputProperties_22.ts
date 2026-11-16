// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_68 } from "./StripeResourceEntityInputAlternatives_68.js";

export type StripeResourceEntityInputProperties_22 = {
  readonly price: StripeResourceEntityInputAlternatives_68;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_68;
};

export const StripeResourceEntityInputProperties_22 = Schema.StructWithRest(
  Schema.Struct({ price: StripeResourceEntityInputAlternatives_68 }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_68,
      ]),
    ),
  ],
).annotate({ title: "trial_offer_end_behavior_transition_param" });
