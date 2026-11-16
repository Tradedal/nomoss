// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripePayoutResourceSchema } from "./StripePayoutPropsSchema.js";

export type StripePayoutPropsEntity = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly destination?:
    | ResourceEntity<{
        readonly provider: "stripe";
        readonly service: "billing";
        readonly resource: "bank-account";
      }>
    | ResourceEntity<{
        readonly provider: "stripe";
        readonly service: "billing";
        readonly resource: "card";
      }>;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly method?: "instant" | "standard";
  readonly payout_method?: string;
  readonly source_type?: "bank_account" | "card" | "fpx";
  readonly statement_descriptor?: string;
};

export const StripePayoutPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description:
        "A positive integer in cents representing how much to pay out.",
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
    destination: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("bank-account"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["BankAccountId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("card"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["CardId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      ]),
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
    method: Schema.optionalKey(
      Schema.Literals(["instant", "standard"]).annotate({
        description:
          "The method used to send this payout, which is `standard` or `instant`. We support `instant` for payouts to debit cards and bank accounts in certain countries. Learn more about [bank support for Instant Payouts](https://stripe.com/docs/payouts/instant-payouts-banks).",
      }),
    ),
    payout_method: Schema.optionalKey(
      Schema.String.annotate({
        description: "The ID of a v2 FinancialAccount to send funds to.",
      }),
    ),
    source_type: Schema.optionalKey(
      Schema.Literals(["bank_account", "card", "fpx"]).annotate({
        description:
          "The balance type of your Stripe balance to draw this payout from. Balances for different payment sources are kept separately. You can find the amounts with the Balances API. One of `bank_account`, `card`, or `fpx`.",
      }),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A string that displays on the recipient's bank or card statement (up to 22 characters). A `statement_descriptor` that's longer than 22 characters return an error. Most banks truncate this information and display it inconsistently. Some banks might not display it at all. For US ACH payouts, this maps to the ACH Company Entry Description field, which the NACHA standard limits to 10 characters. Stripe truncates descriptors longer than 10 characters for US ACH payouts.",
      }).check(
        Schema.isMaxCodePoints(22).annotate({
          expected: "a string with at most 22 code points",
        }),
      ),
    ),
  }),
  StripePayoutResourceSchema,
);
