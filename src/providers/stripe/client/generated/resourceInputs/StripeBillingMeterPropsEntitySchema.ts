// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeBillingMeterResourceSchema } from "./StripeBillingMeterPropsSchema.js";

export type StripeBillingMeterPropsEntity = {
  readonly customer_mapping?: {
    readonly event_payload_key: string;
    readonly type: "by_id";
  } & { readonly [x: string]: Schema.Json };
  readonly default_aggregation: {
    readonly formula: "count" | "last" | "sum";
  } & { readonly [x: string]: Schema.Json };
  readonly display_name: string;
  readonly event_name: string;
  readonly event_time_window?: "day" | "hour";
  readonly expand?: ReadonlyArray<string>;
  readonly value_settings?: { readonly event_payload_key: string } & {
    readonly [x: string]: Schema.Json;
  };
};

export const StripeBillingMeterPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    customer_mapping: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          event_payload_key: Schema.String.check(
            Schema.isMaxCodePoints(100).annotate({
              expected: "a string with at most 100 code points",
            }),
          ),
          type: Schema.Literal("by_id"),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "customer_mapping_param",
        description:
          "Fields that specify how to map a meter event to a customer.",
      }),
    ),
    default_aggregation: Schema.StructWithRest(
      Schema.Struct({ formula: Schema.Literals(["count", "last", "sum"]) }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "aggregation_settings_param",
      description: "The default settings to aggregate a meter's events with.",
    }),
    display_name: Schema.String.annotate({
      description: "The meter’s name. Not visible to the customer.",
    }).check(
      Schema.isMaxCodePoints(250).annotate({
        expected: "a string with at most 250 code points",
      }),
    ),
    event_name: Schema.String.annotate({
      description:
        "The name of the meter event to record usage for. Corresponds with the `event_name` field on meter events.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
    event_time_window: Schema.optionalKey(
      Schema.Literals(["day", "hour"]).annotate({
        description:
          "The time window which meter events have been pre-aggregated for, if any.",
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
    value_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          event_payload_key: Schema.String.check(
            Schema.isMaxCodePoints(100).annotate({
              expected: "a string with at most 100 code points",
            }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "meter_value_settings_param",
        description:
          "Fields that specify how to calculate a meter event's value.",
      }),
    ),
  }),
  StripeBillingMeterResourceSchema,
);
