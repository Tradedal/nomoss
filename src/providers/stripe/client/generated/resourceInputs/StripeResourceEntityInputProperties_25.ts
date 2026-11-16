// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputProperties_26 } from "./StripeResourceEntityInputProperties_26.js";

export type StripeResourceEntityInputProperties_25 = {
  readonly enabled: boolean;
  readonly liability?: StripeResourceEntityInputProperties_26;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputProperties_26;
};

export const StripeResourceEntityInputProperties_25 = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean,
    liability: Schema.optionalKey(StripeResourceEntityInputProperties_26),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputProperties_26,
      ]),
    ),
  ],
).annotate({ title: "automatic_tax_config" });
