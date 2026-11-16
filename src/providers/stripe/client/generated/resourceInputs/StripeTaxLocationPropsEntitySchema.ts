// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeTaxLocationResourceSchema } from "./StripeTaxLocationPropsSchema.js";

export type StripeTaxLocationPropsEntity = {
  readonly address: {
    readonly city?: string | "";
    readonly country: string;
    readonly line1?: string | "";
    readonly line2?: string | "";
    readonly postal_code?: string | "";
    readonly state?: string | "";
  } & { readonly [x: string]: Schema.Json };
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly type: "performance";
};

export const StripeTaxLocationPropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    address: Schema.StructWithRest(
      Schema.Struct({
        city: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        country: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        line1: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        line2: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        postal_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        state: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
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
      title: "tax_location_address",
      description: "The physical address of the tax location.",
    }),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'Details to identify the tax location by its venue, types of events held, or available services, such as "A spacious auditorium suitable for large concerts and events.".',
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
    type: Schema.Literal("performance").annotate({
      description:
        'The type of tax location. The only supported value is "performance".',
    }),
  }),
  StripeTaxLocationResourceSchema,
);
