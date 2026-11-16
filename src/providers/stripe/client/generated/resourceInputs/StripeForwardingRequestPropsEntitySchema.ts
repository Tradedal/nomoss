// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeForwardingRequestResourceSchema } from "./StripeForwardingRequestPropsSchema.js";

export type StripeForwardingRequestPropsEntity = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly payment_method: string;
  readonly replacements: ReadonlyArray<
    | "card_cvc"
    | "card_expiry"
    | "card_number"
    | "cardholder_name"
    | "request_signature"
  >;
  readonly request?: {
    readonly body?: string;
    readonly headers?: ReadonlyArray<
      { readonly name: string; readonly value: string } & {
        readonly [x: string]: Schema.Json;
      }
    >;
  } & { readonly [x: string]: Schema.Json };
  readonly url: string;
};

export const StripeForwardingRequestPropsEntitySchema = annotateResourceSchema(
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
    payment_method: Schema.String.annotate({
      description:
        "The PaymentMethod to insert into the forwarded request. Forwarding previously consumed PaymentMethods is allowed.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    replacements: Schema.Array(
      Schema.Literals([
        "card_cvc",
        "card_expiry",
        "card_number",
        "cardholder_name",
        "request_signature",
      ]),
    ).annotate({
      description: "The field kinds to be replaced in the forwarded request.",
    }),
    request: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          body: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          headers: Schema.optionalKey(
            Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  name: Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  value: Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "header_param" }),
            ),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "request_param",
        description:
          "The request body and headers to be sent to the destination endpoint.",
      }),
    ),
    url: Schema.String.annotate({
      description:
        "The destination URL for the forwarded request. Must be supported by the config.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  StripeForwardingRequestResourceSchema,
);
