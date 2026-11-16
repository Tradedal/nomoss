// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputProperties_3 } from "./StripeResourceEntityInputProperties_3.js";
import { StripeResourceEntityInputProperties_4 } from "./StripeResourceEntityInputProperties_4.js";

export type StripeResourceEntityInputProperties_2 = {
  readonly additional_document?: StripeResourceEntityInputProperties_3;
  readonly document?: StripeResourceEntityInputProperties_4;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputProperties_3
    | StripeResourceEntityInputProperties_4;
};

export const StripeResourceEntityInputProperties_2 = Schema.StructWithRest(
  Schema.Struct({
    additional_document: Schema.optionalKey(
      StripeResourceEntityInputProperties_3,
    ),
    document: Schema.optionalKey(StripeResourceEntityInputProperties_4),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputProperties_3,
        StripeResourceEntityInputProperties_4,
      ]),
    ),
  ],
).annotate({ title: "person_verification_specs" });
