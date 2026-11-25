// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_91 } from "./StripeResourceEntityInputAlternatives_91.js";
import { StripeResourceEntityInputProperties_32 } from "./StripeResourceEntityInputProperties_32.js";

export type StripeResourceEntityInputProperties_31 = {
  readonly account_tax_ids?: StripeResourceEntityInputAlternatives_91;
  readonly custom_fields?:
    | ReadonlyArray<
        { readonly name: string; readonly value: string } & {
          readonly [x: string]: Schema.Json;
        }
      >
    | "";
  readonly days_until_due?: number;
  readonly description?: string | "";
  readonly footer?: string | "";
  readonly issuer?: StripeResourceEntityInputProperties_32;
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_91
    | StripeResourceEntityInputProperties_32;
};

export const StripeResourceEntityInputProperties_31 = Schema.StructWithRest(
  Schema.Struct({
    account_tax_ids: Schema.optionalKey(
      StripeResourceEntityInputAlternatives_91,
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
    days_until_due: Schema.optionalKey(Schema.Int),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(1500).annotate({
            expected: "a string with at most 1500 code points",
          }),
        ),
        Schema.Literal(""),
      ]),
    ),
    footer: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Literal(""),
      ]),
    ),
    issuer: Schema.optionalKey(StripeResourceEntityInputProperties_32),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_91,
        StripeResourceEntityInputProperties_32,
      ]),
    ),
  ],
).annotate({ title: "schedule_phase_invoice_settings" });
