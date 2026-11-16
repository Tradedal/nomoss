// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeRadarValueListItemResourceSchema } from "./StripeRadarValueListItemPropsSchema.js";

export type StripeRadarValueListItemPropsEntity = {
  readonly expand?: ReadonlyArray<string>;
  readonly value: string;
  readonly value_list: string;
};

export const StripeRadarValueListItemPropsEntitySchema = annotateResourceSchema(
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
    value: Schema.String.annotate({
      description:
        "The value of the item (whose type must match the type of the parent value list).",
    }).check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
    value_list: Schema.String.annotate({
      description:
        "The identifier of the value list which the created item will be added to.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  StripeRadarValueListItemResourceSchema,
);
