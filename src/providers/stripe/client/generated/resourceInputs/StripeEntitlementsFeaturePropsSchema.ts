// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeEntitlementsFeatureProps = {
  readonly expand?: ReadonlyArray<string>;
  readonly lookup_key: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly name: string;
};

export const StripeEntitlementsFeatureResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "entitlements-feature",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/EntitlementsFeatureId"],
  });
export const StripeEntitlementsFeaturePropsSchema = annotateResourceSchema(
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
    lookup_key: Schema.String.annotate({
      description:
        "A unique key you provide as your own system identifier. This may be up to 80 characters.",
    }).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
      }),
    ),
    name: Schema.String.annotate({
      description:
        "The feature's name, for your own purpose, not meant to be displayable to the customer.",
    }).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
  }),
  StripeEntitlementsFeatureResourceSchema,
);
