// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_8 } from "./StripeResourceEntityInputAlternatives_8.js";

export type StripeResourceEntityInputItems = ReadonlyArray<
  {
    readonly customer?: StripeResourceEntityInputAlternatives_8;
    readonly type: "customer";
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_8;
  }
>;

export const StripeResourceEntityInputItems = Schema.Array(
  Schema.StructWithRest(
    Schema.Struct({
      customer: Schema.optionalKey(StripeResourceEntityInputAlternatives_8),
      type: Schema.Literal("customer"),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_8,
        ]),
      ),
    ],
  ).annotate({ title: "usage_alert_filter" }),
);
