// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_10 } from "./StripeResourceEntityInputAlternatives_10.js";

export type StripeResourceEntityInputProperties_7 = {
  readonly enabled: boolean;
  readonly feedback_options?: StripeResourceEntityInputAlternatives_10;
  readonly options:
    | ReadonlyArray<
        | "customer_service"
        | "low_quality"
        | "missing_features"
        | "other"
        | "switched_service"
        | "too_complex"
        | "too_expensive"
        | "unused"
      >
    | "";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_10;
};

export const StripeResourceEntityInputProperties_7 = Schema.StructWithRest(
  Schema.Struct({
    enabled: Schema.Boolean,
    feedback_options: Schema.optionalKey(
      StripeResourceEntityInputAlternatives_10,
    ),
    options: Schema.Union([
      Schema.Array(
        Schema.Literals([
          "customer_service",
          "low_quality",
          "missing_features",
          "other",
          "switched_service",
          "too_complex",
          "too_expensive",
          "unused",
        ]),
      ),
      Schema.Literal(""),
    ]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_10,
      ]),
    ),
  ],
).annotate({ title: "subscription_cancellation_reason_creation_param" });
