// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_62 } from "./StripeResourceEntityInputAlternatives_62.js";
import { StripeResourceEntityInputProperties_19 } from "./StripeResourceEntityInputProperties_19.js";

export type StripeResourceEntityInputProperties_18 = {
  readonly account_tax_ids?: StripeResourceEntityInputAlternatives_62;
  readonly custom_fields?:
    | ReadonlyArray<
        { readonly name: string; readonly value: string } & {
          readonly [x: string]: Schema.Json;
        }
      >
    | "";
  readonly description?: string;
  readonly footer?: string;
  readonly issuer?: StripeResourceEntityInputProperties_19;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly rendering_options?:
    | ({
        readonly amount_tax_display?:
          | ""
          | "exclude_tax"
          | "include_inclusive_tax";
        readonly template?: string;
      } & { readonly [x: string]: Schema.Json })
    | "";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_62
    | StripeResourceEntityInputProperties_19;
};

export const StripeResourceEntityInputProperties_18 = Schema.StructWithRest(
  Schema.Struct({
    account_tax_ids: Schema.optionalKey(
      StripeResourceEntityInputAlternatives_62,
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
        Schema.isMaxCodePoints(1500).annotate({
          expected: "a string with at most 1500 code points",
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
    issuer: Schema.optionalKey(StripeResourceEntityInputProperties_19),
    metadata: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.String),
        Schema.Literal(""),
      ]),
    ),
    rendering_options: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(
          Schema.Struct({
            amount_tax_display: Schema.optionalKey(
              Schema.Literals(["", "exclude_tax", "include_inclusive_tax"]),
            ),
            template: Schema.optionalKey(
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
        ).annotate({ title: "checkout_rendering_options_param" }),
        Schema.Literal(""),
      ]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_62,
        StripeResourceEntityInputProperties_19,
      ]),
    ),
  ],
).annotate({ title: "invoice_settings_params" });
