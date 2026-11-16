// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputProperties_30 } from "./StripeResourceEntityInputProperties_30.js";

export type StripeResourceEntityInputProperties_29 = {
  readonly enabled: boolean;
  readonly liability?: StripeResourceEntityInputProperties_30;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputProperties_30;
};

export const StripeResourceEntityInputProperties_29 = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean,
    liability: Schema.optionalKey(StripeResourceEntityInputProperties_30),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputProperties_30,
      ]),
    ),
  ],
).annotate({ title: "automatic_tax_config" });
