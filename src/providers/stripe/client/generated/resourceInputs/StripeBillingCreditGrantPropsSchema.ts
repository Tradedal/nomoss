// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeBillingCreditGrantProps = {
  readonly amount: {
    readonly monetary?: {
      readonly currency: string;
      readonly value: number;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "monetary";
  } & { readonly [x: string]: Schema.Json };
  readonly applicability_config: {
    readonly scope: {
      readonly price_type?: "metered";
      readonly prices?: ReadonlyArray<
        { readonly id: string } & { readonly [x: string]: Schema.Json }
      >;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly category?: "paid" | "promotional";
  readonly customer?: string;
  readonly customer_account?: string;
  readonly effective_at?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly metadata?: { readonly [x: string]: string };
  readonly name?: string;
  readonly priority?: number;
};

export const StripeBillingCreditGrantResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "billing-credit-grant",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BillingCreditGrantId"],
  });
export const StripeBillingCreditGrantPropsSchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.StructWithRest(
      Schema.Struct({
        monetary: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              currency: Schema.String.annotate({ format: "currency" }),
              value: Schema.Int,
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "monetary_amount_param" }),
        ),
        type: Schema.Literal("monetary"),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "amount_param",
      description: "Amount of this credit grant.",
    }),
    applicability_config: Schema.StructWithRest(
      Schema.Struct({
        scope: Schema.StructWithRest(
          Schema.Struct({
            price_type: Schema.optionalKey(Schema.Literal("metered")),
            prices: Schema.optionalKey(
              Schema.Array(
                Schema.StructWithRest(
                  Schema.Struct({
                    id: Schema.String.check(
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
                ).annotate({ title: "applicable_price_param" }),
              ),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "scope_param" }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "applicability_config_param",
      description:
        "Configuration specifying what this credit grant applies to. We currently only support `metered` prices that have a [Billing Meter](https://docs.stripe.com/api/billing/meter) attached to them.",
    }),
    category: Schema.optionalKey(
      Schema.Literals(["paid", "promotional"]).annotate({
        description:
          "The category of this credit grant. It defaults to `paid` if not specified.",
      }),
    ),
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description: "ID of the customer receiving the billing credits.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    customer_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the account representing the customer receiving the billing credits.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    effective_at: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The time when the billing credits become effective-when they're eligible for use. It defaults to the current timestamp if not specified.",
        format: "unix-time",
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
    expires_at: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The time when the billing credits expire. If not specified, the billing credits don't expire.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of key-value pairs that you can attach to an object. You can use this to store additional information about the object (for example, cost basis) in a structured format.",
      }),
    ),
    name: Schema.optionalKey(
      Schema.String.annotate({
        description: "A descriptive name shown in the Dashboard.",
      }).check(
        Schema.isMaxCodePoints(100).annotate({
          expected: "a string with at most 100 code points",
        }),
      ),
    ),
    priority: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The desired priority for applying this credit grant. If not specified, it will be set to the default value of 50. The highest priority is 0 and the lowest is 100.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
  }),
  StripeBillingCreditGrantResourceSchema,
);
