// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeRadarValueListResourceSchema } from "./StripeRadarValueListPropsSchema.js";

export type StripeRadarValueListPropsEntity = {
  readonly alias: string;
  readonly expand?: ReadonlyArray<string>;
  readonly item_type?:
    | "account"
    | "card_bin"
    | "card_fingerprint"
    | "case_sensitive_string"
    | "country"
    | "crypto_fingerprint"
    | "customer_id"
    | "email"
    | "ip_address"
    | "sepa_debit_fingerprint"
    | "string"
    | "us_bank_account_fingerprint";
  readonly metadata?: { readonly [x: string]: string };
  readonly name: string;
};

export const StripeRadarValueListPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    alias: Schema.String.annotate({
      description: "The name of the value list for use in rules.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
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
    item_type: Schema.optionalKey(
      Schema.Literals([
        "account",
        "card_bin",
        "card_fingerprint",
        "case_sensitive_string",
        "country",
        "crypto_fingerprint",
        "customer_id",
        "email",
        "ip_address",
        "sepa_debit_fingerprint",
        "string",
        "us_bank_account_fingerprint",
      ]).annotate({
        description:
          "Type of the items in the value list. One of `card_fingerprint`, `card_bin`, `crypto_fingerprint`, `email`, `ip_address`, `country`, `string`, `case_sensitive_string`, `customer_id`, `account`, `sepa_debit_fingerprint`, or `us_bank_account_fingerprint`. Use `string` if the item type is unknown or mixed.",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    name: Schema.String.annotate({
      description: "The human-readable name of the value list.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  }),
  StripeRadarValueListResourceSchema,
);
