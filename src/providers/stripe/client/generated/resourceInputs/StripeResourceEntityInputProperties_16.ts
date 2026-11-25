// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_39 } from "./StripeResourceEntityInputAlternatives_39.js";
import { StripeResourceEntityInputAlternatives_40 } from "./StripeResourceEntityInputAlternatives_40.js";

export type StripeResourceEntityInputProperties_16 = {
  readonly back?: StripeResourceEntityInputAlternatives_39;
  readonly front?: StripeResourceEntityInputAlternatives_40;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_39
    | StripeResourceEntityInputAlternatives_40;
};

export const StripeResourceEntityInputProperties_16 = Schema.StructWithRest(
  Schema.Struct({
    back: Schema.optionalKey(StripeResourceEntityInputAlternatives_39),
    front: Schema.optionalKey(StripeResourceEntityInputAlternatives_40),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_39,
        StripeResourceEntityInputAlternatives_40,
      ]),
    ),
  ],
).annotate({ title: "person_verification_document_param" });
