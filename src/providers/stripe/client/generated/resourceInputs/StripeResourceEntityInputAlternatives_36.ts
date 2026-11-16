// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";

export type StripeResourceEntityInputAlternatives_36 = ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "billing";
  readonly resource: "invoice";
}>;

export const StripeResourceEntityInputAlternatives_36 = Schema.Union([
  Schema.Union([
    ResourceReferenceSchema(
      Schema.Struct({
        provider: Schema.Literal("stripe"),
        service: Schema.Literal("billing"),
        resource: Schema.Literal("invoice"),
      }),
      {
        value: null,
        outputs: [
          {
            source: ["InvoiceId"],
            target: [],
          },
        ],
      },
    ).annotate({ expected: "ResourceEntity" }),
  ]),
]);
