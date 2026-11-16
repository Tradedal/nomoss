// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  type ResourceInputJson,
  ResourceInputJsonSchema,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeProductCatalogTrialOfferResourceSchema } from "./StripeProductCatalogTrialOfferPropsSchema.js";
import { StripeResourceEntityInputProperties_22 } from "./StripeResourceEntityInputProperties_22.js";

export type StripeProductCatalogTrialOfferPropsEntity = {
  readonly active?: boolean;
  readonly duration: {
    readonly relative?: { readonly iterations: number } & {
      readonly [x: string]: Schema.Json;
    };
    readonly type: "relative";
  } & { readonly [x: string]: Schema.Json };
  readonly end_behavior: {
    readonly transition: StripeResourceEntityInputProperties_22;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputProperties_22;
  };
  readonly expand?: ReadonlyArray<string>;
  readonly nickname?: string;
  readonly price: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "price";
  }>;
};

export const StripeProductCatalogTrialOfferPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      active: Schema.optionalKey(
        Schema.Boolean.annotate({
          description:
            "Whether the trial offer can be used for new subscriptions. Defaults to true.",
        }),
      ),
      duration: Schema.StructWithRest(
        Schema.Struct({
          relative: Schema.optionalKey(
            Schema.StructWithRest(Schema.Struct({ iterations: Schema.Int }), [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ]).annotate({ title: "trial_offer_duration_relative_param" }),
          ),
          type: Schema.Literal("relative"),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "trial_offer_duration_param",
        description: "Duration of one service period of the trial.",
      }),
      end_behavior: Schema.StructWithRest(
        Schema.Struct({ transition: StripeResourceEntityInputProperties_22 }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputProperties_22,
            ]),
          ),
        ],
      ).annotate({
        title: "trial_offer_end_behavior_param",
        description: "Define behavior that occurs at the end of the trial.",
      }),
      expand: Schema.optionalKey(
        Schema.Array(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ).annotate({
          description:
            "Specifies which fields in the response should be expanded.",
        }),
      ),
      nickname: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "A brief description of the trial offer, hidden from customers.",
        }).check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        ),
      ),
      price: Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("price"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PriceId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    }),
    StripeProductCatalogTrialOfferResourceSchema,
  );
