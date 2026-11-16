// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeBillingFeedbackOptionResourceSchema } from "./StripeBillingFeedbackOptionPropsSchema.js";

export type StripeBillingFeedbackOptionPropsEntity = {
  readonly description: string;
  readonly expand?: ReadonlyArray<string>;
};

export const StripeBillingFeedbackOptionPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      description: Schema.String.annotate({
        description:
          "The text of the feedback option, which customers see when canceling. Maximum 100 characters.",
      }).check(
        Schema.isMaxCodePoints(100).annotate({
          expected: "a string with at most 100 code points",
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
    }),
    StripeBillingFeedbackOptionResourceSchema,
  );
