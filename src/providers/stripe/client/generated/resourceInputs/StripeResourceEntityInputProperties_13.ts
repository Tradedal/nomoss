// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_27 } from "./StripeResourceEntityInputAlternatives_27.js";

export type StripeResourceEntityInputProperties_13 = {
  readonly account?: StripeResourceEntityInputAlternatives_27;
  readonly type: "account" | "self";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_27;
};

export const StripeResourceEntityInputProperties_13 = Schema.StructWithRest(
  Schema.Struct({
    account: Schema.optionalKey(StripeResourceEntityInputAlternatives_27),
    type: Schema.Literals(["account", "self"]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_27,
      ]),
    ),
  ],
).annotate({ title: "param" });
