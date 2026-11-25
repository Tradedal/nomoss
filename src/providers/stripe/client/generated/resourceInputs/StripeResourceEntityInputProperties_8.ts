// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_11 } from "./StripeResourceEntityInputAlternatives_11.js";

export type StripeResourceEntityInputProperties_8 = {
  readonly billing_cycle_anchor?: "now" | "unchanged";
  readonly default_allowed_updates?:
    | ReadonlyArray<"price" | "promotion_code" | "quantity">
    | "";
  readonly enabled: boolean;
  readonly products?: StripeResourceEntityInputAlternatives_11;
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
  readonly schedule_at_period_end?: {
    readonly conditions?: ReadonlyArray<
      { readonly type: "decreasing_item_amount" | "shortening_interval" } & {
        readonly [x: string]: Schema.Json;
      }
    >;
  } & { readonly [x: string]: Schema.Json };
  readonly trial_update_behavior?: "continue_trial" | "end_trial";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputAlternatives_11;
};

export const StripeResourceEntityInputProperties_8 = Schema.StructWithRest(
  Schema.Struct({
    billing_cycle_anchor: Schema.optionalKey(
      Schema.Literals(["now", "unchanged"]),
    ),
    default_allowed_updates: Schema.optionalKey(
      Schema.Union([
        Schema.Array(Schema.Literals(["price", "promotion_code", "quantity"])),
        Schema.Literal(""),
      ]),
    ),
    enabled: Schema.Boolean,
    products: Schema.optionalKey(StripeResourceEntityInputAlternatives_11),
    proration_behavior: Schema.optionalKey(
      Schema.Literals(["always_invoice", "create_prorations", "none"]),
    ),
    schedule_at_period_end: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          conditions: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  type: Schema.Literals([
                    "decreasing_item_amount",
                    "shortening_interval",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({
                title: "schedule_update_at_period_end_condition_param",
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
      ).annotate({ title: "schedule_update_at_period_end_creating_param" }),
    ),
    trial_update_behavior: Schema.optionalKey(
      Schema.Literals(["continue_trial", "end_trial"]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputAlternatives_11,
      ]),
    ),
  ],
).annotate({ title: "subscription_update_creation_param" });
