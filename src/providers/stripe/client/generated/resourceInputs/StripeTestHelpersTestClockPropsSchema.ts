// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeTestHelpersTestClockProps = {
  readonly customer?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly frozen_time: number;
  readonly name?: string;
};

export const StripeTestHelpersTestClockResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "test-helpers-test-clock",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TestHelpersTestClockId"],
  });
export const StripeTestHelpersTestClockPropsSchema = annotateResourceSchema(
  Schema.Struct({
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Existing customer this test clock will be attached to. Once attached, customers can't be removed from a test clock.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
    frozen_time: Schema.Number.annotate({
      description: "The initial frozen time for this test clock.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    name: Schema.optionalKey(
      Schema.String.annotate({
        description: "The name for this test clock.",
      }).check(
        Schema.isMaxCodePoints(300).annotate({
          expected: "a string with at most 300 code points",
        }),
      ),
    ),
  }),
  StripeTestHelpersTestClockResourceSchema,
);
