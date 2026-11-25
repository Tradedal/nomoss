// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeBillingAlertResourceSchema } from "./StripeBillingAlertPropsSchema.js";
import { StripeResourceEntityInputAlternatives_9 } from "./StripeResourceEntityInputAlternatives_9.js";
import { StripeResourceEntityInputItems } from "./StripeResourceEntityInputItems.js";

export type StripeBillingAlertPropsEntity = {
  readonly alert_type: "usage_threshold";
  readonly expand?: ReadonlyArray<string>;
  readonly title: string;
  readonly usage_threshold?: {
    readonly filters?: StripeResourceEntityInputItems;
    readonly gte: number;
    readonly meter: StripeResourceEntityInputAlternatives_9;
    readonly recurrence: "one_time";
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputItems
      | StripeResourceEntityInputAlternatives_9;
  };
};

export const StripeBillingAlertPropsEntitySchema = annotateResourceSchema(
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
          filters: Schema.optionalKey(StripeResourceEntityInputItems),
          gte: Schema.Int,
          meter: StripeResourceEntityInputAlternatives_9,
          recurrence: Schema.Literal("one_time"),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputItems,
              StripeResourceEntityInputAlternatives_9,
            ]),
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
