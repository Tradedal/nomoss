// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_2 } from "./StripeResourceEntityInputAlternatives_2.js";
import { StripeResourceEntityInputAlternatives_3 } from "./StripeResourceEntityInputAlternatives_3.js";

export type StripeResourceEntityInputProperties_3 = {
  readonly back?: StripeResourceEntityInputAlternatives_2;
  readonly front?: StripeResourceEntityInputAlternatives_3;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_2
    | StripeResourceEntityInputAlternatives_3;
};

export const StripeResourceEntityInputProperties_3 = Schema.StructWithRest(
  Schema.Struct({
    back: Schema.optionalKey(StripeResourceEntityInputAlternatives_2),
    front: Schema.optionalKey(StripeResourceEntityInputAlternatives_3),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_2,
        StripeResourceEntityInputAlternatives_3,
      ]),
    ),
  ],
).annotate({ title: "person_verification_document_specs" });
