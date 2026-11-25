// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeBankAccountResourceSchema } from "./StripeBankAccountPropsSchema.js";

export type StripeBankAccountPropsEntity = {
  readonly bank_account?:
    | ({
        readonly account_holder_name?: string;
        readonly account_holder_type?: "company" | "individual";
        readonly account_number: string;
        readonly account_type?: "checking" | "futsu" | "savings" | "toza";
        readonly country: string;
        readonly currency?: string;
        readonly documents?: {
          readonly bank_account_ownership_verification?: {
            readonly files?: ReadonlyArray<string>;
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly object?: "bank_account";
        readonly routing_number?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly default_for_currency?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly external_account?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly account: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "v1-account";
  }>;
};

export const StripeBankAccountPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    bank_account: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(
          Schema.Struct({
            account_holder_name: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            account_holder_type: Schema.optionalKey(
              Schema.Literals(["company", "individual"]),
            ),
            account_number: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            account_type: Schema.optionalKey(
              Schema.Literals(["checking", "futsu", "savings", "toza"]),
            ),
            country: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            currency: Schema.optionalKey(
              Schema.String.annotate({ format: "currency" }),
            ),
            documents: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  bank_account_ownership_verification: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        files: Schema.optionalKey(
                          Schema.Array(
                            Schema.String.check(
                              Schema.isMaxCodePoints(500).annotate({
                                expected:
                                  "a string with at most 500 code points",
                              }),
                            ),
                          ),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "documents_param" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "external_account_documents_param" }),
            ),
            object: Schema.optionalKey(Schema.Literal("bank_account")),
            routing_number: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "external_account_payout_bank_account" }),
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ]).annotate({
        description:
          "Either a token, like the ones returned by [Stripe.js](https://stripe.com/docs/js), or a dictionary containing a user's bank account details.",
      }),
    ),
    default_for_currency: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "When set to true, or if this is the first external account added in this currency, this account becomes the default external account for its currency.",
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
    external_account: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A token, like the ones returned by [Stripe.js](https://docs.stripe.com/js) or a dictionary containing a user's external account details (with the options shown below). Please refer to full [documentation](https://stripe.com/docs/api/external_accounts) instead.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    account: Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("stripe"),
            service: Schema.Literal("billing"),
            resource: Schema.Literal("v1-account"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["V1AccountId"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
    ]),
  }),
  StripeBankAccountResourceSchema,
);
