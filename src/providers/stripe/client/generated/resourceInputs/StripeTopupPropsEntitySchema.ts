// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeTopupResourceSchema } from "./StripeTopupPropsSchema.js";

export type StripeTopupPropsEntity = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly payment_method?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "payment-method";
  }>;
  readonly payment_method_options?: {
    readonly us_bank_account?: { readonly network: "ach" } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly source?: string;
  readonly statement_descriptor?: string;
  readonly transfer_group?: string;
};

export const StripeTopupPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "A positive integer representing how much to transfer.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
    }),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string attached to the object. Often useful for displaying to users.",
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
      Schema.Union([
        Schema.Record(Schema.String, Schema.String),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    payment_method: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("payment-method"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PaymentMethodId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    payment_method_options: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          us_bank_account: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ network: Schema.Literal("ach") }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "us_bank_account_param" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "payment_method_options_param",
        description: "Payment method-specific configuration for this top-up.",
      }),
    ),
    source: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of a source to transfer funds from. For most users, this should be left unspecified which will use the bank account that was set up in the dashboard for the specified currency. While testing, this can be a test bank token (see [Testing Top-ups](https://docs.stripe.com/connect/testing#testing-top-ups)).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Extra information about a top-up for the source's bank statement. Limited to 15 ASCII characters.",
      }).check(
        Schema.isMaxCodePoints(15).annotate({
          expected: "a string with at most 15 code points",
        }),
      ),
    ),
    transfer_group: Schema.optionalKey(
      Schema.String.annotate({
        description: "A string that identifies this top-up as part of a group.",
      }),
    ),
  }),
  StripeTopupResourceSchema,
);
