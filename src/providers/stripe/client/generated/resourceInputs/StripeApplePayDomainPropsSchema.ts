// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeApplePayDomainProps = {
  readonly domain_name: string;
  readonly expand?: ReadonlyArray<string>;
};

export const StripeApplePayDomainResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "apple-pay-domain",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/ApplePayDomainId"],
  });
export const StripeApplePayDomainPropsSchema = annotateResourceSchema(
  Schema.Struct({
    domain_name: Schema.String,
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
  StripeApplePayDomainResourceSchema,
);
