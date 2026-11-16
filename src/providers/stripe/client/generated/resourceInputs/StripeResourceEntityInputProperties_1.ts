// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives } from "./StripeResourceEntityInputAlternatives.js";
import { StripeResourceEntityInputAlternatives_1 } from "./StripeResourceEntityInputAlternatives_1.js";

export type StripeResourceEntityInputProperties_1 = {
  readonly back?: StripeResourceEntityInputAlternatives;
  readonly front?: StripeResourceEntityInputAlternatives_1;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives
    | StripeResourceEntityInputAlternatives_1;
};

export const StripeResourceEntityInputProperties_1 = Schema.StructWithRest(
  Schema.Struct({
    back: Schema.optionalKey(StripeResourceEntityInputAlternatives),
    front: Schema.optionalKey(StripeResourceEntityInputAlternatives_1),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives,
        StripeResourceEntityInputAlternatives_1,
      ]),
    ),
  ],
).annotate({ title: "verification_document_specs" });
