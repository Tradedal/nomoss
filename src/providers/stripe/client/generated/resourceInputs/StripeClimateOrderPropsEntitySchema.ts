// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeClimateOrderResourceSchema } from "./StripeClimateOrderPropsSchema.js";

export type StripeClimateOrderPropsEntity = {
  readonly amount?: number;
  readonly beneficiary?: { readonly public_name: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly currency?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly metric_tons?: string;
  readonly product: string;
};

export const StripeClimateOrderPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Requested amount of carbon removal units. Either this or `metric_tons` must be specified.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    beneficiary: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          public_name: Schema.String.check(
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
      ).annotate({
        title: "beneficiary_params",
        description:
          "Publicly sharable reference for the end beneficiary of carbon removal. Assumed to be the Stripe account if not set.",
      }),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Request currency for the order as a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a supported [settlement currency for your account](https://stripe.com/docs/currencies). If omitted, the account's default currency will be used.",
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
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    metric_tons: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Requested number of tons for the order. Either this or `amount` must be specified.",
        format: "decimal",
      }),
    ),
    product: Schema.String.annotate({
      description: "Unique identifier of the Climate product.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  StripeClimateOrderResourceSchema,
);
