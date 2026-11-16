// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeTreasuryCreditReversalProps = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly received_credit: string;
};

export const StripeTreasuryCreditReversalResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "treasury-credit-reversal",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryCreditReversalId"],
  });
export const StripeTreasuryCreditReversalPropsSchema = annotateResourceSchema(
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
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    received_credit: Schema.String.annotate({
      description: "The ReceivedCredit to reverse.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  StripeTreasuryCreditReversalResourceSchema,
);
