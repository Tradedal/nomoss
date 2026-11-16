// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_24 } from "./StripeResourceEntityInputAlternatives_24.js";

export type StripeResourceEntityInputItems_2 = ReadonlyArray<
  {
    readonly price?: StripeResourceEntityInputAlternatives_24;
    readonly type: "price";
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_24;
  }
>;

export const StripeResourceEntityInputItems_2 = Schema.Array(
  Schema.StructWithRest(
    Schema.Struct({
      price: Schema.optionalKey(StripeResourceEntityInputAlternatives_24),
      type: Schema.Literal("price"),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_24,
        ]),
      ),
    ],
  ).annotate({ title: "billing_schedules_applies_to" }),
);
