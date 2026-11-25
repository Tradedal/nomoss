// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_65 } from "./StripeResourceEntityInputAlternatives_65.js";
import { StripeResourceEntityInputProperties_21 } from "./StripeResourceEntityInputProperties_21.js";

export type StripeResourceEntityInputProperties_20 = {
  readonly account_tax_ids?: StripeResourceEntityInputAlternatives_65;
  readonly custom_fields?:
    | ReadonlyArray<
        { readonly name: string; readonly value: string } & {
          readonly [x: string]: Schema.Json;
        }
      >
    | "";
  readonly description?: string;
  readonly footer?: string;
  readonly issuer?: StripeResourceEntityInputProperties_21;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_65
    | StripeResourceEntityInputProperties_21;
};

export const StripeResourceEntityInputProperties_20 = Schema.StructWithRest(
  Schema.Struct({
    account_tax_ids: Schema.optionalKey(
      StripeResourceEntityInputAlternatives_65,
    ),
    custom_fields: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.StructWithRest(
            Schema.Struct({
              name: Schema.String.check(
                Schema.isMaxCodePoints(40).annotate({
                  expected: "a string with at most 40 code points",
                }),
              ),
              value: Schema.String.check(
                Schema.isMaxCodePoints(140).annotate({
                  expected: "a string with at most 140 code points",
                }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "custom_field_params" }),
        ),
        Schema.Literal(""),
      ]),
    ),
    description: Schema.optionalKey(
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ),
    footer: Schema.optionalKey(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    issuer: Schema.optionalKey(StripeResourceEntityInputProperties_21),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_65,
        StripeResourceEntityInputProperties_21,
      ]),
    ),
  ],
).annotate({ title: "subscription_data_invoice_settings_params" });
