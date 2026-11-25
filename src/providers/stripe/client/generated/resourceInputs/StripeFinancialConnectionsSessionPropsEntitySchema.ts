// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeFinancialConnectionsSessionResourceSchema } from "./StripeFinancialConnectionsSessionPropsSchema.js";
import { StripeResourceEntityInputAlternatives_31 } from "./StripeResourceEntityInputAlternatives_31.js";
import { StripeResourceEntityInputAlternatives_32 } from "./StripeResourceEntityInputAlternatives_32.js";

export type StripeFinancialConnectionsSessionPropsEntity = {
  readonly account_holder: {
    readonly account?: StripeResourceEntityInputAlternatives_31;
    readonly customer?: StripeResourceEntityInputAlternatives_32;
    readonly customer_account?: string;
    readonly type: "account" | "customer";
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_31
      | StripeResourceEntityInputAlternatives_32;
  };
  readonly expand?: ReadonlyArray<string>;
  readonly filters?: {
    readonly account_subcategories?: ReadonlyArray<
      "checking" | "credit_card" | "line_of_credit" | "mortgage" | "savings"
    >;
    readonly country?: string;
    readonly require_payment_method_support?: "all" | "at_least_one" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly limits?: { readonly accounts: number | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly manual_entry?: { readonly mode?: "automatic" | "disabled" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly permissions: ReadonlyArray<
    "balances" | "ownership" | "payment_method" | "transactions"
  >;
  readonly prefetch?: ReadonlyArray<"balances" | "ownership" | "transactions">;
  readonly return_url?: string;
};

export const StripeFinancialConnectionsSessionPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      account_holder: Schema.StructWithRest(
        Schema.Struct({
          account: Schema.optionalKey(StripeResourceEntityInputAlternatives_31),
          customer: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_32,
          ),
          customer_account: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          type: Schema.Literals(["account", "customer"]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_31,
              StripeResourceEntityInputAlternatives_32,
            ]),
          ),
        ],
      ).annotate({
        title: "accountholder_params",
        description: "The account holder to link accounts for.",
      }),
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
      filters: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            account_subcategories: Schema.optionalKey(
              Schema.Array(
                Schema.Literals([
                  "checking",
                  "credit_card",
                  "line_of_credit",
                  "mortgage",
                  "savings",
                ]),
              ),
            ),
            country: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            require_payment_method_support: Schema.optionalKey(
              Schema.Literals(["all", "at_least_one", "none"]),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "filters_params",
          description: "Filters to restrict the kinds of accounts to collect.",
        }),
      ),
      limits: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            accounts: Schema.Union([Schema.Int, Schema.Literal("")]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "limits_params",
          description: "Settings for configuring Session-specific limits.",
        }),
      ),
      manual_entry: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            mode: Schema.optionalKey(
              Schema.Literals(["automatic", "disabled"]),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "manual_entry_params",
          description: "Customize manual entry behavior",
        }),
      ),
      permissions: Schema.Array(
        Schema.Literals([
          "balances",
          "ownership",
          "payment_method",
          "transactions",
        ]),
      ).annotate({
        description:
          "List of data features that you would like to request access to.\n\nPossible values are `balances`, `transactions`, `ownership`, and `payment_method`.",
      }),
      prefetch: Schema.optionalKey(
        Schema.Array(
          Schema.Literals(["balances", "ownership", "transactions"]),
        ).annotate({
          description:
            "List of data features that you would like to retrieve upon account creation.",
        }),
      ),
      return_url: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "For webview integrations only. Upon completing OAuth login in the native browser, the user will be redirected to this URL to return to your app.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    }),
    StripeFinancialConnectionsSessionResourceSchema,
  );
