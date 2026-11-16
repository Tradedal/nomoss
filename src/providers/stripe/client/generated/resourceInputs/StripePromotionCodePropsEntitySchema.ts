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
import { StripePromotionCodeResourceSchema } from "./StripePromotionCodePropsSchema.js";
import { StripeResourceEntityInputAlternatives_69 } from "./StripeResourceEntityInputAlternatives_69.js";

export type StripePromotionCodePropsEntity = {
  readonly active?: boolean;
  readonly code?: string;
  readonly customer?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "customer";
  }>;
  readonly customer_account?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly max_redemptions?: number;
  readonly metadata?: { readonly [x: string]: string };
  readonly promotion: {
    readonly coupon?: StripeResourceEntityInputAlternatives_69;
    readonly type: "coupon";
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_69;
  };
  readonly restrictions?: {
    readonly currency_options?: {
      readonly [x: string]: { readonly minimum_amount?: number } & {
        readonly [x: string]: Schema.Json;
      };
    };
    readonly first_time_transaction?: boolean;
    readonly minimum_amount?: number;
    readonly minimum_amount_currency?: string;
  } & { readonly [x: string]: Schema.Json };
};

export const StripePromotionCodePropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    active: Schema.optionalKey(
      Schema.Boolean.annotate({
        description: "Whether the promotion code is currently active.",
      }),
    ),
    code: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The customer-facing code. Regardless of case, this code must be unique across all active promotion codes for a specific customer. Valid characters are lower case letters (a-z), upper case letters (A-Z), digits (0-9), and dashes (-).\n\nIf left blank, we will generate one automatically.",
      }).check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ),
    customer: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("customer"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["CustomerId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    customer_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The account representing the customer who can use this promotion code. If not set, all customers can use the promotion code.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
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
    expires_at: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The timestamp at which this promotion code will expire. If the coupon has specified a `redeems_by`, then this value cannot be after the coupon's `redeems_by`.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    max_redemptions: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A positive integer specifying the number of times the promotion code can be redeemed. If the coupon has specified a `max_redemptions`, then this value cannot be greater than the coupon's `max_redemptions`.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    promotion: Schema.StructWithRest(
      Schema.Struct({
        coupon: Schema.optionalKey(StripeResourceEntityInputAlternatives_69),
        type: Schema.Literal("coupon"),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Union([
            ResourceInputJsonSchema,
            StripeResourceEntityInputAlternatives_69,
          ]),
        ),
      ],
    ).annotate({
      title: "promotion",
      description: "The promotion referenced by this promotion code.",
    }),
    restrictions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          currency_options: Schema.optionalKey(
            Schema.Record(
              Schema.String,
              Schema.StructWithRest(
                Schema.Struct({
                  minimum_amount: Schema.optionalKey(Schema.Int),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "currency_option" }),
            ),
          ),
          first_time_transaction: Schema.optionalKey(Schema.Boolean),
          minimum_amount: Schema.optionalKey(Schema.Int),
          minimum_amount_currency: Schema.optionalKey(
            Schema.String.annotate({ format: "currency" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "restrictions_params",
        description:
          "Settings that restrict the redemption of the promotion code.",
      }),
    ),
  }),
  StripePromotionCodeResourceSchema,
);
