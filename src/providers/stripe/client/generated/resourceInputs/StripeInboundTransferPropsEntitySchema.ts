// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeInboundTransferResourceSchema } from "./StripeInboundTransferPropsSchema.js";

export type StripeInboundTransferPropsEntity = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly description?: string;
  readonly from: {
    readonly currency?: string;
    readonly payment_method: string;
  } & { readonly [x: string]: Schema.Json };
  readonly to: {
    readonly currency: string;
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };

export const StripeInboundTransferPropsEntitySchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.String.annotate({
            description:
              "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          }),
          value: Schema.Number.annotate({
            description:
              "A non-negative integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#minor-units).",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description:
          "The amount and currency to credit to the FinancialAccount.",
      }),
      description: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "An optional, freeform description field intended to store metadata.",
        }),
      ),
      from: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "An optional currency field used to specify which currency is debited from the Payment Method.\nSince many Payment Methods support only one currency, this field is optional.",
            }),
          ),
          payment_method: Schema.String.annotate({
            description:
              "ID of the verified bank account credential to debit for this InboundTransfer (for example, `usba_`), not a Payments API `pm_` PaymentMethod.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description:
          "The verified bank account credential to debit for this InboundTransfer.",
      }),
      to: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.String.annotate({
            description: "The currency to credit to the FinancialAccount.",
          }),
          financial_account: Schema.String.annotate({
            description: "The FinancialAccount that receives the funds.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description:
          "The FinancialAccount and currency to credit with the transferred funds.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ),
  StripeInboundTransferResourceSchema,
);
