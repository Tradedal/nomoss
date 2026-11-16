// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripePaymentMethodDomainProps = {
  readonly domain_name: string;
  readonly enabled?: boolean;
  readonly expand?: ReadonlyArray<string>;
};

export const StripePaymentMethodDomainResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "payment-method-domain",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PaymentMethodDomainId"],
  });
export const StripePaymentMethodDomainPropsSchema = annotateResourceSchema(
  Schema.Struct({
    domain_name: Schema.String.annotate({
      description:
        "The domain name that this payment method domain object represents.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    enabled: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Whether this payment method domain is enabled. If the domain is not enabled, payment methods that require a payment method domain will not appear in Elements or Embedded Checkout.",
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
  StripePaymentMethodDomainResourceSchema,
);
