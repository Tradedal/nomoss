// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_14 } from "./StripeResourceEntityInputAlternatives_14.js";

export type StripeResourceEntityInputProperties_9 = {
  readonly account?: StripeResourceEntityInputAlternatives_14;
  readonly type: "account" | "self";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_14;
};

export const StripeResourceEntityInputProperties_9 = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.optionalKey(StripeResourceEntityInputAlternatives_14),
    type: Schema.Literals(["account", "self"]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_14,
      ]),
    ),
  ],
).annotate({ title: "param" });
