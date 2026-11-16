// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeUSBankAccountProps = {
  readonly account_number: string;
  readonly bank_account_type?: "checking" | "savings";
  readonly currency: string;
  readonly fedwire_routing_number?: string;
  readonly routing_number?: string;
} & { readonly [x: string]: Schema.Json };

export const StripeUSBankAccountResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "core",
    resource: "usbank-account",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/USBankAccountId"],
  });
export const StripeUSBankAccountPropsSchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
      account_number: Schema.String.annotate({
        description: "The account number of the bank account.",
      }),
      bank_account_type: Schema.optionalKey(
        Schema.Literals(["checking", "savings"]).annotate({
          description:
            "Closed Enum. The type of the bank account (checking or savings).",
        }),
      ),
      currency: Schema.String.annotate({
        description: "The currency of the bank account.",
      }),
      fedwire_routing_number: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The fedwire routing number of the bank account. Note that certain banks have the same ACH and wire routing number.",
        }),
      ),
      routing_number: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The ACH routing number of the bank account. Note that certain banks have the same ACH and wire routing number.",
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
  StripeUSBankAccountResourceSchema,
);
