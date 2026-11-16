// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeTransferResourceSchema } from "./StripeTransferPropsSchema.js";

export type StripeTransferPropsEntity = {
  readonly amount?: number;
  readonly currency: string;
  readonly description?: string;
  readonly destination: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "v1-account";
  }>;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly source_transaction?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "charge";
  }>;
  readonly source_type?: "bank_account" | "card" | "fpx";
  readonly transfer_group?: string;
};

export const StripeTransferPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A positive integer in cents (or local equivalent) representing how much to transfer.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO code for currency](https://www.iso.org/iso-4217-currency-codes.html) in lowercase. Must be a [supported currency](https://docs.stripe.com/currencies).",
      format: "currency",
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
    destination: Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("stripe"),
            service: Schema.Literal("billing"),
            resource: Schema.Literal("v1-account"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["V1AccountId"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
    ]),
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
    source_transaction: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("charge"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["ChargeId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
    ),
    source_type: Schema.optionalKey(
      Schema.Literals(["bank_account", "card", "fpx"]).annotate({
        description:
          "The source balance to use for this transfer. One of `bank_account`, `card`, or `fpx`. For most users, this will default to `card`.",
      }),
    ),
    transfer_group: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A string that identifies this transaction as part of a group. See the [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options) for details.",
      }),
    ),
  }),
  StripeTransferResourceSchema,
);
