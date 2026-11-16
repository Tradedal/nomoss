// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeRefundProps = {
  readonly amount?: number;
  readonly charge?: string;
  readonly currency?: string;
  readonly customer?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly instructions_email?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly origin?: "customer_balance";
  readonly payment_intent?: string;
  readonly reason?: "duplicate" | "fraudulent" | "requested_by_customer";
  readonly refund_application_fee?: boolean;
  readonly reverse_transfer?: boolean;
};

export const StripeRefundResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "stripe",
  service: "billing",
  resource: "refund",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/RefundId"],
});
export const StripeRefundPropsSchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.optionalKey(Schema.Int),
    charge: Schema.optionalKey(
      Schema.String.annotate({
        description: "The identifier of the charge to refund.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        format: "currency",
      }),
    ),
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description: "Customer whose customer balance to refund from.",
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
    instructions_email: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For payment methods without native refund support (e.g., Konbini, PromptPay), use this email from the customer to receive refund instructions.",
      }).check(
        Schema.isMaxCodePoints(800).annotate({
          expected: "a string with at most 800 code points",
        }),
      ),
    ),
    metadata: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.String),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    origin: Schema.optionalKey(
      Schema.Literal("customer_balance").annotate({
        description: "Origin of the refund",
      }),
    ),
    payment_intent: Schema.optionalKey(
      Schema.String.annotate({
        description: "The identifier of the PaymentIntent to refund.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    reason: Schema.optionalKey(
      Schema.Literals([
        "duplicate",
        "fraudulent",
        "requested_by_customer",
      ]).annotate({
        description:
          "String indicating the reason for the refund. If set, possible values are `duplicate`, `fraudulent`, and `requested_by_customer`. If you believe the charge to be fraudulent, specifying `fraudulent` as the reason will add the associated card and email to your [block lists](https://docs.stripe.com/radar/lists), and will also help us improve our fraud detection algorithms.",
      }),
    ),
    refund_application_fee: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Boolean indicating whether the application fee should be refunded when refunding this charge. If a full charge refund is given, the full application fee will be refunded. Otherwise, the application fee will be refunded in an amount proportional to the amount of the charge refunded. An application fee can be refunded only by the application that created the charge.",
      }),
    ),
    reverse_transfer: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Boolean indicating whether the transfer should be reversed when refunding this charge. The transfer will be reversed proportionally to the amount being refunded (either the entire or partial amount).<br><br>A transfer can be reversed only by the application that created the charge.",
      }),
    ),
  }),
  StripeRefundResourceSchema,
);
