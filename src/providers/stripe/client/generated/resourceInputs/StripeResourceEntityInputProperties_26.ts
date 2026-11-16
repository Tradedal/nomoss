// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_76 } from "./StripeResourceEntityInputAlternatives_76.js";

export type StripeResourceEntityInputProperties_26 = {
  readonly account?: StripeResourceEntityInputAlternatives_76;
  readonly type: "account" | "self";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_76;
};

export const StripeResourceEntityInputProperties_26 = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.optionalKey(StripeResourceEntityInputAlternatives_76),
    type: Schema.Literals(["account", "self"]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_76,
      ]),
    ),
  ],
).annotate({ title: "param" });
