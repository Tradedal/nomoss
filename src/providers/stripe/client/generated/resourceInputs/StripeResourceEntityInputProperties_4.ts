// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_4 } from "./StripeResourceEntityInputAlternatives_4.js";
import { StripeResourceEntityInputAlternatives_5 } from "./StripeResourceEntityInputAlternatives_5.js";

export type StripeResourceEntityInputProperties_4 = {
  readonly back?: StripeResourceEntityInputAlternatives_4;
  readonly front?: StripeResourceEntityInputAlternatives_5;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_4
    | StripeResourceEntityInputAlternatives_5;
};

export const StripeResourceEntityInputProperties_4 = Schema.StructWithRest(
  Schema.Struct({
    back: Schema.optionalKey(StripeResourceEntityInputAlternatives_4),
    front: Schema.optionalKey(StripeResourceEntityInputAlternatives_5),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_4,
        StripeResourceEntityInputAlternatives_5,
      ]),
    ),
  ],
).annotate({ title: "person_verification_document_specs" });
