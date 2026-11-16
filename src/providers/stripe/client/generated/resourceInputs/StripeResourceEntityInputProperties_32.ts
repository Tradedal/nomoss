// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_92 } from "./StripeResourceEntityInputAlternatives_92.js";

export type StripeResourceEntityInputProperties_32 = {
  readonly account?: StripeResourceEntityInputAlternatives_92;
  readonly type: "account" | "self";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_92;
};

export const StripeResourceEntityInputProperties_32 = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.optionalKey(StripeResourceEntityInputAlternatives_92),
    type: Schema.Literals(["account", "self"]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_92,
      ]),
    ),
  ],
).annotate({ title: "param" });
