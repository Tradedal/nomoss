// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_86 } from "./StripeResourceEntityInputAlternatives_86.js";

export type StripeResourceEntityInputProperties_30 = {
  readonly account?: StripeResourceEntityInputAlternatives_86;
  readonly type: "account" | "self";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_86;
};

export const StripeResourceEntityInputProperties_30 = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.optionalKey(StripeResourceEntityInputAlternatives_86),
    type: Schema.Literals(["account", "self"]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_86,
      ]),
    ),
  ],
).annotate({ title: "param" });
