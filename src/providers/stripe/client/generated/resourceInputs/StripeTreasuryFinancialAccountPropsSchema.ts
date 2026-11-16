// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeTreasuryFinancialAccountProps = {
  readonly expand?: ReadonlyArray<string>;
  readonly features?: {
    readonly card_issuing?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly deposit_insurance?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly financial_addresses?: {
      readonly aba?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly inbound_transfers?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly intra_stripe_flows?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly outbound_payments?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly us_domestic_wire?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly outbound_transfers?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly us_domestic_wire?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly nickname?: string | "";
  readonly platform_restrictions?: {
    readonly inbound_flows?: "restricted" | "unrestricted";
    readonly outbound_flows?: "restricted" | "unrestricted";
  } & { readonly [x: string]: Schema.Json };
  readonly supported_currencies: ReadonlyArray<string>;
};

export const StripeTreasuryFinancialAccountResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "treasury-financial-account",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryFinancialAccountId"],
  });
export const StripeTreasuryFinancialAccountPropsSchema = annotateResourceSchema(
  Schema.Struct({
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
    features: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          card_issuing: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
          deposit_insurance: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
          financial_addresses: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                aba: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "aba_access" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "financial_addresses" }),
          ),
          inbound_transfers: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ach: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access_with_ach_details_inbound" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "inbound_transfers" }),
          ),
          intra_stripe_flows: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
          outbound_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ach: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access_with_ach_details_outbound" }),
                ),
                us_domestic_wire: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "outbound_payments" }),
          ),
          outbound_transfers: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ach: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access_with_ach_details_outbound" }),
                ),
                us_domestic_wire: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "outbound_transfers" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "feature_access",
        description:
          "Encodes whether a FinancialAccount has access to a particular feature. Stripe or the platform can control features via the requested field.",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    nickname: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Literal(""),
      ]).annotate({ description: "The nickname for the FinancialAccount." }),
    ),
    platform_restrictions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          inbound_flows: Schema.optionalKey(
            Schema.Literals(["restricted", "unrestricted"]),
          ),
          outbound_flows: Schema.optionalKey(
            Schema.Literals(["restricted", "unrestricted"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "platform_restrictions",
        description:
          "The set of functionalities that the platform can restrict on the FinancialAccount.",
      }),
    ),
    supported_currencies: Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "The currencies the FinancialAccount can hold a balance in.",
    }),
  }),
  StripeTreasuryFinancialAccountResourceSchema,
);
