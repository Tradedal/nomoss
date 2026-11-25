// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeTreasuryInboundTransferResourceSchema } from "./StripeTreasuryInboundTransferPropsSchema.js";

export type StripeTreasuryInboundTransferPropsEntity = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly origin_payment_method: string;
  readonly statement_descriptor?: string;
};

export const StripeTreasuryInboundTransferPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      amount: Schema.Number.annotate({
        description: "Amount (in cents) to be transferred.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      currency: Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
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
      financial_account: Schema.String.annotate({
        description: "The FinancialAccount to send funds to.",
      }),
      metadata: Schema.optionalKey(
        Schema.Record(Schema.String, Schema.String).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
        }),
      ),
      origin_payment_method: Schema.String.annotate({
        description:
          "The origin payment method to be debited for the InboundTransfer.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      statement_descriptor: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The complete description that appears on your customers' statements. Maximum 10 characters. Can only include -#.$&*, spaces, and alphanumeric characters.",
        }).check(
          Schema.isMaxCodePoints(10).annotate({
            expected: "a string with at most 10 code points",
          }),
        ),
      ),
    }),
    StripeTreasuryInboundTransferResourceSchema,
  );
