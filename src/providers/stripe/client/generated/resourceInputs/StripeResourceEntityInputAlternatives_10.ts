// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";

export type StripeResourceEntityInputAlternatives_10 =
  | ReadonlyArray<
      ResourceEntity<{
        readonly provider: "stripe";
        readonly service: "billing";
        readonly resource: "billing-feedback-option";
      }>
    >
  | "";

export const StripeResourceEntityInputAlternatives_10 = Schema.Union([
  Schema.Array(
    Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("stripe"),
            service: Schema.Literal("billing"),
            resource: Schema.Literal("billing-feedback-option"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["BillingFeedbackOptionId"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
    ]),
  ),
  Schema.Literal(""),
]);
