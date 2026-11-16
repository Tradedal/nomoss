// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeProductCatalogTrialOfferProps = {
  readonly active?: boolean;
  readonly duration: {
    readonly relative?: { readonly iterations: number } & {
      readonly [x: string]: Schema.Json;
    };
    readonly type: "relative";
  } & { readonly [x: string]: Schema.Json };
  readonly end_behavior: {
    readonly transition: { readonly price: string } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly nickname?: string;
  readonly price: string;
};

export const StripeProductCatalogTrialOfferResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "product-catalog-trial-offer",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ProductCatalogTrialOfferId"],
  });
export const StripeProductCatalogTrialOfferPropsSchema = annotateResourceSchema(
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
      Schema.Struct({
        transition: Schema.StructWithRest(
          Schema.Struct({
            price: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "trial_offer_end_behavior_transition_param" }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
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
    price: Schema.String.annotate({
      description:
        "Price configuration during the trial period (amount, billing scheme, etc).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  StripeProductCatalogTrialOfferResourceSchema,
);
