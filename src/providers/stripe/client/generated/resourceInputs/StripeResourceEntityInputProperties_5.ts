// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_6 } from "./StripeResourceEntityInputAlternatives_6.js";
import { StripeResourceEntityInputAlternatives_7 } from "./StripeResourceEntityInputAlternatives_7.js";

export type StripeResourceEntityInputProperties_5 = {
  readonly icon?: StripeResourceEntityInputAlternatives_6;
  readonly logo?: StripeResourceEntityInputAlternatives_7;
  readonly primary_color?: string;
  readonly secondary_color?: string;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_6
    | StripeResourceEntityInputAlternatives_7;
};

export const StripeResourceEntityInputProperties_5 = Schema.StructWithRest(
  Schema.Struct({
    icon: Schema.optionalKey(StripeResourceEntityInputAlternatives_6),
    logo: Schema.optionalKey(StripeResourceEntityInputAlternatives_7),
    primary_color: Schema.optionalKey(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    secondary_color: Schema.optionalKey(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_6,
        StripeResourceEntityInputAlternatives_7,
      ]),
    ),
  ],
).annotate({ title: "branding_settings_specs" });
