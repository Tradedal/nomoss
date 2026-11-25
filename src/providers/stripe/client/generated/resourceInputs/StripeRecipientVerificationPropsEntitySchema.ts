// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeRecipientVerificationResourceSchema } from "./StripeRecipientVerificationPropsSchema.js";

export type StripeRecipientVerificationPropsEntity = {
  readonly payout_method: string;
  readonly recipient?: string;
} & { readonly [x: string]: Schema.Json };

export const StripeRecipientVerificationPropsEntitySchema =
  annotateResourceSchema(
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
