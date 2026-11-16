// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_42 } from "./StripeResourceEntityInputAlternatives_42.js";

export type StripeResourceEntityInputAlternatives_41 =
  | ({
      readonly additional_documentation?: StripeResourceEntityInputAlternatives_42;
      readonly canceled_at?: number | "";
      readonly cancellation_policy_provided?: boolean | "";
      readonly cancellation_reason?: string | "";
      readonly expected_at?: number | "";
      readonly explanation?: string | "";
      readonly product_description?: string | "";
      readonly product_type?: "" | "merchandise" | "service";
      readonly return_status?: "" | "merchant_rejected" | "successful";
      readonly returned_at?: number | "";
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_42;
    })
  | "";

export const StripeResourceEntityInputAlternatives_41 = Schema.Union([
  Schema.StructWithRest(
    Schema.Struct({
      additional_documentation: Schema.optionalKey(
        StripeResourceEntityInputAlternatives_42,
      ),
      canceled_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Literal(""),
        ]),
      ),
      cancellation_policy_provided: Schema.optionalKey(
        Schema.Union([Schema.Boolean, Schema.Literal("")]),
      ),
      cancellation_reason: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2500).annotate({
              expected: "a string with at most 2500 code points",
            }),
          ),
          Schema.Literal(""),
        ]),
      ),
      expected_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Literal(""),
        ]),
      ),
      explanation: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2500).annotate({
              expected: "a string with at most 2500 code points",
            }),
          ),
          Schema.Literal(""),
        ]),
      ),
      product_description: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(2500).annotate({
              expected: "a string with at most 2500 code points",
            }),
          ),
          Schema.Literal(""),
        ]),
      ),
      product_type: Schema.optionalKey(
        Schema.Literals(["", "merchandise", "service"]),
      ),
      return_status: Schema.optionalKey(
        Schema.Literals(["", "merchant_rejected", "successful"]),
      ),
      returned_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Literal(""),
        ]),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Union([
          ResourceInputJsonSchema,
          StripeResourceEntityInputAlternatives_42,
        ]),
      ),
    ],
  ).annotate({ title: "canceled" }),
  Schema.Literal(""),
]);
