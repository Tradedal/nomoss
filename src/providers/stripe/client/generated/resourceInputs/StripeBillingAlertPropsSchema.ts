// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeBillingAlertProps = {
  readonly alert_type: "usage_threshold";
  readonly expand?: ReadonlyArray<string>;
  readonly title: string;
  readonly usage_threshold?: {
    readonly filters?: ReadonlyArray<
      { readonly customer?: string; readonly type: "customer" } & {
        readonly [x: string]: Schema.Json;
      }
    >;
    readonly gte: number;
    readonly meter: string;
    readonly recurrence: "one_time";
  } & { readonly [x: string]: Schema.Json };
};

export const StripeBillingAlertResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "billing-alert",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/BillingAlertId"],
  });
export const StripeBillingAlertPropsSchema = annotateResourceSchema(
  Schema.Struct({
    alert_type: Schema.Literal("usage_threshold").annotate({
      description: "The type of alert to create.",
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
    title: Schema.String.annotate({
      description: "The title of the alert.",
    }).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
    usage_threshold: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          filters: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  customer: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  type: Schema.Literal("customer"),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "usage_alert_filter" }),
            ),
          ),
          gte: Schema.Int,
          meter: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          recurrence: Schema.Literal("one_time"),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "usage_threshold_config",
        description: "The configuration of the usage threshold.",
      }),
    ),
  }),
  StripeBillingAlertResourceSchema,
);
