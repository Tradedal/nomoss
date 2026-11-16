// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeTransferProps = {
  readonly amount?: number;
  readonly currency: string;
  readonly description?: string;
  readonly destination: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly source_transaction?: string;
  readonly source_type?: "bank_account" | "card" | "fpx";
  readonly transfer_group?: string;
};

export const StripeTransferResourceSchema = ResourceSchemaAnnotationSchema.make(
  {
    provider: "stripe",
    service: "billing",
    resource: "transfer",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TransferId"],
  },
);
export const StripeTransferPropsSchema = annotateResourceSchema(
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
    destination: Schema.String.annotate({
      description:
        'The ID of a connected Stripe account. <a href="/docs/connect/separate-charges-and-transfers">See the Connect documentation</a> for details.',
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
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    source_transaction: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "You can use this parameter to transfer funds from a charge before they are added to your available balance. A pending balance will transfer immediately but the funds will not become available until the original charge becomes available. [See the Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-availability) for details.",
      }),
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
