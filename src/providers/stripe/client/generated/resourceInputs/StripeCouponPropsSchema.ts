// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeCouponProps = {
  readonly amount_off?: number;
  readonly applies_to?: { readonly products?: ReadonlyArray<string> } & {
    readonly [x: string]: Schema.Json;
  };
  readonly currency?: string;
  readonly currency_options?: {
    readonly [x: string]: { readonly amount_off: number } & {
      readonly [x: string]: Schema.Json;
    };
  };
  readonly duration?: "forever" | "once" | "repeating";
  readonly duration_in_months?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly id?: string;
  readonly max_redemptions?: number;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly percent_off?: number;
  readonly redeem_by?: number;
};

export const StripeCouponResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "stripe",
  service: "billing",
  resource: "coupon",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/CouponId"],
});
export const StripeCouponPropsSchema = annotateResourceSchema(
  Schema.Struct({
    amount_off: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A positive integer representing the amount to subtract from an invoice total (required if `percent_off` is not passed).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    applies_to: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          products: Schema.optionalKey(
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "applies_to_params",
        description:
          "A hash containing directions for what this Coupon will apply discounts to.",
      }),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) of the `amount_off` parameter (required if `amount_off` is passed).",
        format: "currency",
      }),
    ),
    currency_options: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.StructWithRest(Schema.Struct({ amount_off: Schema.Int }), [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ]).annotate({ title: "currency_option" }),
      ).annotate({
        description:
          "Coupons defined in each available currency option (only supported if `amount_off` is passed). Each key must be a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) and a [supported currency](https://stripe.com/docs/currencies).",
      }),
    ),
    duration: Schema.optionalKey(
      Schema.Literals(["forever", "once", "repeating"]).annotate({
        description:
          "Specifies how long the discount will be in effect if used on a subscription. Defaults to `once`.",
      }),
    ),
    duration_in_months: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Required only if `duration` is `repeating`, in which case it must be a positive integer that specifies the number of months the discount will be in effect.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    id: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Unique string of your choice that will be used to identify this coupon when applying it to a customer. If you don't want to specify a particular code, you can leave the ID blank and we'll generate a random code for you.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    max_redemptions: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A positive integer specifying the number of times the coupon can be redeemed before it's no longer valid. For example, you might have a 50% off coupon that the first 20 readers of your blog can use.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    metadata: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.String),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    name: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Name of the coupon displayed to customers on, for instance invoices, or receipts. By default the `id` is shown if `name` is not set.",
      }).check(
        Schema.isMaxCodePoints(40).annotate({
          expected: "a string with at most 40 code points",
        }),
      ),
    ),
    percent_off: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A positive float larger than 0, and smaller or equal to 100, that represents the discount the coupon will apply (required if `amount_off` is not passed).",
      }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
    ),
    redeem_by: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Unix timestamp specifying the last time at which the coupon can be redeemed (cannot be set to more than 5 years in the future). After the redeem_by date, the coupon can no longer be applied to new customers.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
  }),
  StripeCouponResourceSchema,
);
