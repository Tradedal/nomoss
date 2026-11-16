// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";

export type StripeResourceEntityInputAlternatives_12 = ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "product";
}>;

export const StripeResourceEntityInputAlternatives_12 = Schema.Union([
  Schema.Union([
    ResourceReferenceSchema(
      Schema.Struct({
        provider: Schema.Literal("stripe"),
        service: Schema.Literal("billing"),
        resource: Schema.Literal("product"),
      }),
      {
        value: null,
        outputs: [
          {
            source: ["ProductId"],
            target: [],
          },
        ],
      },
    ).annotate({ expected: "ResourceEntity" }),
  ]),
]);
