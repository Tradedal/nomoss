// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeIssuingPersonalizationDesignProps = {
  readonly card_logo?: string;
  readonly carrier_text?: {
    readonly footer_body?: string | "";
    readonly footer_title?: string | "";
    readonly header_body?: string | "";
    readonly header_title?: string | "";
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly lookup_key?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly name?: string;
  readonly physical_bundle: string;
  readonly preferences?: { readonly is_default: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly transfer_lookup_key?: boolean;
};

export const StripeIssuingPersonalizationDesignResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "issuing-personalization-design",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IssuingPersonalizationDesignId"],
  });
export const StripeIssuingPersonalizationDesignPropsSchema =
  annotateResourceSchema(
    Schema.Struct({
      card_logo: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The file for the card logo, for use with physical bundles that support card logos. Must have a `purpose` value of `issuing_logo`.",
        }),
      ),
      carrier_text: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            footer_body: Schema.optionalKey(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(200).annotate({
                    expected: "a string with at most 200 code points",
                  }),
                ),
                Schema.Literal(""),
              ]),
            ),
            footer_title: Schema.optionalKey(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(30).annotate({
                    expected: "a string with at most 30 code points",
                  }),
                ),
                Schema.Literal(""),
              ]),
            ),
            header_body: Schema.optionalKey(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(200).annotate({
                    expected: "a string with at most 200 code points",
                  }),
                ),
                Schema.Literal(""),
              ]),
            ),
            header_title: Schema.optionalKey(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(30).annotate({
                    expected: "a string with at most 30 code points",
                  }),
                ),
                Schema.Literal(""),
              ]),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "carrier_text_param",
          description:
            "Hash containing carrier text, for use with physical bundles that support carrier text.",
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
      lookup_key: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "A lookup key used to retrieve personalization designs dynamically from a static string. This may be up to 200 characters.",
        }).check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        ),
      ),
      metadata: Schema.optionalKey(
        Schema.Record(Schema.String, Schema.String).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
        }),
      ),
      name: Schema.optionalKey(
        Schema.String.annotate({ description: "Friendly display name." }).check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        ),
      ),
      physical_bundle: Schema.String.annotate({
        description:
          "The physical bundle object belonging to this personalization design.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      preferences: Schema.optionalKey(
        Schema.StructWithRest(Schema.Struct({ is_default: Schema.Boolean }), [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ]).annotate({
          title: "preferences_param",
          description:
            "Information on whether this personalization design is used to create cards when one is not specified.",
        }),
      ),
      transfer_lookup_key: Schema.optionalKey(
        Schema.Boolean.annotate({
          description:
            "If set to true, will atomically remove the lookup key from the existing personalization design, and assign it to this personalization design.",
        }),
      ),
    }),
    StripeIssuingPersonalizationDesignResourceSchema,
  );
