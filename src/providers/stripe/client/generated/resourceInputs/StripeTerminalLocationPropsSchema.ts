// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeTerminalLocationProps = {
  readonly address?: {
    readonly city?: string;
    readonly country: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly address_kana?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
    readonly town?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly address_kanji?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
    readonly town?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly configuration_overrides?: string;
  readonly display_name?: string;
  readonly display_name_kana?: string;
  readonly display_name_kanji?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly phone?: string;
};

export const StripeTerminalLocationResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "terminal-location",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TerminalLocationId"],
  });
export const StripeTerminalLocationPropsSchema = annotateResourceSchema(
  Schema.Struct({
    address: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          country: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          postal_code: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
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
        title: "create_location_address_param",
        description: "The full address of the location.",
      }),
    ),
    address_kana: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          country: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          postal_code: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          town: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
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
        title: "japan_address_kana_specs",
        description:
          "The Kana variation of the full address of the location (Japan only).",
      }),
    ),
    address_kanji: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          country: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          postal_code: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          town: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
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
        title: "japan_address_kanji_specs",
        description:
          "The Kanji variation of the full address of the location (Japan only).",
      }),
    ),
    configuration_overrides: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of a configuration that will be used to customize all readers in this location.",
      }).check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ),
    display_name: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A name for the location. Maximum length is 1000 characters.",
      }).check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
    ),
    display_name_kana: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The Kana variation of the name for the location (Japan only). Maximum length is 1000 characters.",
      }).check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
    ),
    display_name_kanji: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The Kanji variation of the name for the location (Japan only). Maximum length is 1000 characters.",
      }).check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
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
    metadata: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.String),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    phone: Schema.optionalKey(
      Schema.String.annotate({
        description: "The phone number for the location.",
      }),
    ),
  }),
  StripeTerminalLocationResourceSchema,
);
