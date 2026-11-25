// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeRecipientVerificationProps = {
  readonly payout_method: string;
  readonly recipient?: string;
} & { readonly [x: string]: Schema.Json };

export const StripeRecipientVerificationResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "money_management",
    resource: "recipient-verification",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/RecipientVerificationId"],
  });
export const StripeRecipientVerificationPropsSchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
      payout_method: Schema.String.annotate({
        description: "ID of the payout method.",
      }),
      recipient: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "ID of the recipient account. Required if the recipient is different from the sender. Omit for payouts to your own account.",
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
  StripeRecipientVerificationResourceSchema,
);
