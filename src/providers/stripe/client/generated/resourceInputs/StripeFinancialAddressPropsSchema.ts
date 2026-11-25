// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeFinancialAddressProps = {
  readonly bank_account?: {
    readonly country?: string;
    readonly currency: "eur" | "gbp" | "usd";
  } & { readonly [x: string]: Schema.Json };
  readonly financial_account: string;
  readonly type: "bank_account";
} & { readonly [x: string]: Schema.Json };

export const StripeFinancialAddressResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "money_management",
    resource: "financial-address",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/FinancialAddressId"],
  });
export const StripeFinancialAddressPropsSchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
      bank_account: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            country: Schema.optionalKey(
              Schema.String.annotate({
                description:
                  "The country for the bank account. Used to select the appropriate rails (e.g. for SEPA).",
              }),
            ),
            currency: Schema.Literals(["eur", "gbp", "usd"]).annotate({
              description:
                "The currency of the bank account to provision. Available currencies depend on your account's enabled features and rollout access; `eur` requires the Financial Address Global Payouts EU preview.",
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
            "Properties for creating a bank account FinancialAddress.",
        }),
      ),
      financial_account: Schema.String.annotate({
        description:
          "The ID of the FinancialAccount the new FinancialAddress should be associated with.",
      }),
      type: Schema.Literal("bank_account").annotate({
        description:
          "The type of FinancialAddress to create. Must agree with which branch of financial_address_type_properties is set.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ),
  StripeFinancialAddressResourceSchema,
);
