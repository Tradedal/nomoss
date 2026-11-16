// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputProperties_1 } from "./StripeResourceEntityInputProperties_1.js";

export type StripeResourceEntityInputProperties = {
  readonly document?: StripeResourceEntityInputProperties_1;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputProperties_1;
};

export const StripeResourceEntityInputProperties = Schema.StructWithRest(
  Schema.Struct({
    document: Schema.optionalKey(StripeResourceEntityInputProperties_1),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputProperties_1,
      ]),
    ),
  ],
).annotate({ title: "verification_specs" });
