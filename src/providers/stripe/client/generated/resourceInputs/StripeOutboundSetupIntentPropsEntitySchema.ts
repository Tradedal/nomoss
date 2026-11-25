// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeOutboundSetupIntentResourceSchema } from "./StripeOutboundSetupIntentPropsSchema.js";

export type StripeOutboundSetupIntentPropsEntity = {
  readonly payout_method?: string;
  readonly payout_method_data?: {
    readonly bank_account?: {
      readonly account_number: string;
      readonly bank_account_type?: "checking" | "futsu" | "savings" | "toza";
      readonly branch_number?: string;
      readonly country: string;
      readonly currency: string;
      readonly routing_number?: string;
      readonly swift_code?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "bank_account" | "card";
  } & { readonly [x: string]: Schema.Json };
  readonly usage_intent?: "payment" | "transfer";
} & { readonly [x: string]: Schema.Json };

export const StripeOutboundSetupIntentPropsEntitySchema =
  annotateResourceSchema(
    Schema.StructWithRest(
      Schema.Struct({
        payout_method: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "If provided, the existing payout method resource to link to this setup intent.\nAny payout_method_data provided is used to update information on this linked payout method resource.",
          }),
        ),
        payout_method_data: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              bank_account: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    account_number: Schema.String.annotate({
                      description:
                        "The account number or IBAN of the bank account.",
                    }),
                    bank_account_type: Schema.optionalKey(
                      Schema.Literals([
                        "checking",
                        "futsu",
                        "savings",
                        "toza",
                      ]).annotate({
                        description:
                          "Closed Enum. The type of the bank account (checking or savings).",
                      }),
                    ),
                    branch_number: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The branch number of the bank account, if present.",
                      }),
                    ),
                    country: Schema.String.annotate({
                      description: "The country code of the bank account.",
                    }),
                    currency: Schema.String.annotate({
                      description: "The currency of the bank account.",
                    }),
                    routing_number: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The routing number of the bank account, if present.",
                      }),
                    ),
                    swift_code: Schema.optionalKey(
                      Schema.String.annotate({
                        description:
                          "The swift code of the bank account, if present.",
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
                  description:
                    "The type specific details of the bank account payout method.",
                }),
              ),
              type: Schema.Literals(["bank_account", "card"]).annotate({
                description:
                  "Open Enum. The type of payout method to be created.",
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
              "If no payout_method provided, used to create the underlying credential that is set up for outbound money movement.\nIf a payout_method provided, used to update data on the credential linked to this setup intent.",
          }),
        ),
        usage_intent: Schema.optionalKey(
          Schema.Literals(["payment", "transfer"]).annotate({
            description:
              "Specify which type of outbound money movement this credential should be set up for (payment | transfer).\nIf not provided, defaults to payment.",
          }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ),
    StripeOutboundSetupIntentResourceSchema,
  );
