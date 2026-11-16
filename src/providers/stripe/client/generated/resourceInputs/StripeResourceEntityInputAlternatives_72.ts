// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";

export type StripeResourceEntityInputAlternatives_72 = ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "quote";
}>;

export const StripeResourceEntityInputAlternatives_72 = Schema.Union([
  Schema.Union([
    ResourceReferenceSchema(
      Schema.Struct({
        provider: Schema.Literal("stripe"),
        service: Schema.Literal("billing"),
        resource: Schema.Literal("quote"),
      }),
      {
        value: null,
        outputs: [
          {
            source: ["QuoteId"],
            target: [],
          },
        ],
      },
    ).annotate({ expected: "ResourceEntity" }),
  ]),
]);
