// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeGBBankAccountProps = {
  readonly account_number?: string;
  readonly bank_account_type?: "checking" | "savings";
  readonly currency: string;
  readonly iban?: string;
  readonly sort_code?: string;
} & { readonly [x: string]: Schema.Json };

export const StripeGBBankAccountResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "core",
    resource: "gbbank-account",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/GBBankAccountId"],
  });
export const StripeGBBankAccountPropsSchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
      account_number: Schema.optionalKey(
        Schema.String.annotate({
          description: "The Account Number of the bank account.",
        }),
      ),
      bank_account_type: Schema.optionalKey(
        Schema.Literals(["checking", "savings"]).annotate({
          description:
            "Closed Enum. The type of the bank account (checking or savings).",
        }),
      ),
      currency: Schema.String.annotate({
        description: "The currency of the bank account.",
      }),
      iban: Schema.optionalKey(
        Schema.String.annotate({
          description: "The IBAN of the bank account.",
        }),
      ),
      sort_code: Schema.optionalKey(
        Schema.String.annotate({
          description: "The Sort Code of the bank account.",
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
  StripeGBBankAccountResourceSchema,
);
