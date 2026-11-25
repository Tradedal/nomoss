// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeTaxRateResourceSchema } from "./StripeTaxRatePropsSchema.js";

export type StripeTaxRatePropsEntity = {
  readonly active?: boolean;
  readonly country?: string;
  readonly description?: string;
  readonly display_name: string;
  readonly expand?: ReadonlyArray<string>;
  readonly inclusive: boolean;
  readonly jurisdiction?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly percentage: number;
  readonly state?: string;
  readonly tax_type?:
    | "admissions_tax"
    | "amusement_tax"
    | "attendance_tax"
    | "communications_tax"
    | "digital_excise_tax"
    | "entertainment_tax"
    | "get_fund"
    | "gross_receipts_tax"
    | "gst"
    | "hospitality_tax"
    | "hst"
    | "igst"
    | "jct"
    | "lease_tax"
    | "luxury_tax"
    | "mass_transit_parking_tax"
    | "nhil"
    | "parking_tax"
    | "pst"
    | "qst"
    | "resort_tax"
    | "retail_delivery_fee"
    | "rst"
    | "sales_tax"
    | "service_tax"
    | "tourism_tax"
    | "utility_users_tax"
    | "vat";
};

export const StripeTaxRatePropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    active: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Flag determining whether the tax rate is active or inactive (archived). Inactive tax rates cannot be used with new applications or Checkout Sessions, but will still work for subscriptions and invoices that already have it set.",
      }),
    ),
    country: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string attached to the tax rate for your internal use only. It will not be visible to your customers.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    display_name: Schema.String.annotate({
      description:
        "The display name of the tax rate, which will be shown to users.",
    }).check(
      Schema.isMaxCodePoints(50).annotate({
        expected: "a string with at most 50 code points",
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
    inclusive: Schema.Boolean.annotate({
      description: "This specifies if the tax rate is inclusive or exclusive.",
    }),
    jurisdiction: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The jurisdiction for the tax rate. You can use this label field for tax reporting purposes. It also appears on your customer’s invoice.",
      }).check(
        Schema.isMaxCodePoints(50).annotate({
          expected: "a string with at most 50 code points",
        }),
      ),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    percentage: Schema.Number.annotate({
      description: "This represents the tax rate percent out of 100.",
    }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
    state: Schema.optionalKey(
      Schema.String.annotate({
        description:
          '[ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2), without country prefix. For example, "NY" for New York, United States.',
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    tax_type: Schema.optionalKey(
      Schema.Literals([
        "admissions_tax",
        "amusement_tax",
        "attendance_tax",
        "communications_tax",
        "digital_excise_tax",
        "entertainment_tax",
        "get_fund",
        "gross_receipts_tax",
        "gst",
        "hospitality_tax",
        "hst",
        "igst",
        "jct",
        "lease_tax",
        "luxury_tax",
        "mass_transit_parking_tax",
        "nhil",
        "parking_tax",
        "pst",
        "qst",
        "resort_tax",
        "retail_delivery_fee",
        "rst",
        "sales_tax",
        "service_tax",
        "tourism_tax",
        "utility_users_tax",
        "vat",
      ]).annotate({
        description: "The high-level tax type, such as `vat` or `sales_tax`.",
      }),
    ),
  }),
  StripeTaxRateResourceSchema,
);
