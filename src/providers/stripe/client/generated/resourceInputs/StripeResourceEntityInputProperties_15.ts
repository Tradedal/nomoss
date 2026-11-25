// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputProperties_16 } from "./StripeResourceEntityInputProperties_16.js";

export type StripeResourceEntityInputProperties_15 = {
  readonly document?: StripeResourceEntityInputProperties_16;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputProperties_16;
};

export const StripeResourceEntityInputProperties_15 = Schema.StructWithRest(
  Schema.Struct({
    document: Schema.optionalKey(StripeResourceEntityInputProperties_16),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputProperties_16,
      ]),
    ),
  ],
).annotate({ title: "person_verification_param" });
