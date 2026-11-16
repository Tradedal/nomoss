// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripetax_rate } from "./models/catalog.js";
import { Stripeerror } from "./models/common.js";

export type GetTaxRatesInput = {
  readonly active?: boolean;
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly inclusive?: boolean;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetTaxRatesOutput = {
  readonly data: ReadonlyArray<Stripetax_rate>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTaxRatesError = Stripeerror;
export type PostTaxRatesInput = {
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
export type PostTaxRatesOutput = Stripetax_rate;
export type PostTaxRatesError = Stripeerror;
export type GetTaxRatesTaxRateInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly tax_rate: string;
};
export type GetTaxRatesTaxRateOutput = Stripetax_rate;
export type GetTaxRatesTaxRateError = Stripeerror;
export type PostTaxRatesTaxRateInput = {
  readonly active?: boolean;
  readonly country?: string;
  readonly description?: string;
  readonly display_name?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly jurisdiction?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
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
  readonly tax_rate: string;
};
export type PostTaxRatesTaxRateOutput = Stripetax_rate;
export type PostTaxRatesTaxRateError = Stripeerror;

export const GetTaxRatesInput = Schema.Struct({
  active: Schema.optionalKey(Schema.Boolean),
  created: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          gt: Schema.optionalKey(Schema.Int),
          gte: Schema.optionalKey(Schema.Int),
          lt: Schema.optionalKey(Schema.Int),
          lte: Schema.optionalKey(Schema.Int),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "range_query_specs" }),
      Schema.Int,
    ]),
  ),
  ending_before: Schema.optionalKey(
    Schema.String.check(
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
    ),
  ),
  inclusive: Schema.optionalKey(Schema.Boolean),
  limit: Schema.optionalKey(Schema.Int),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetTaxRatesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetax_rate),
    has_more: Schema.Boolean.annotate({
      description:
        "True if this list has another page of items after this one that can be fetched.",
    }),
    object: Schema.Literal("list").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
    }),
    url: Schema.String.annotate({
      description: "The URL where this list can be accessed.",
    })
      .check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^\\/v1\\/tax_rates", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/tax_rates",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "TaxRatesList", description: "" });
export const GetTaxRatesError = Stripeerror;
export const PostTaxRatesInput = Schema.Struct({
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
      description: "Specifies which fields in the response should be expanded.",
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
});
export const PostTaxRatesOutput = Stripetax_rate;
export const PostTaxRatesError = Stripeerror;
export const GetTaxRatesTaxRateInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  tax_rate: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTaxRatesTaxRateOutput = Stripetax_rate;
export const GetTaxRatesTaxRateError = Stripeerror;
export const PostTaxRatesTaxRateInput = Schema.Struct({
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
  display_name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The display name of the tax rate, which will be shown to users.",
    }).check(
      Schema.isMaxCodePoints(50).annotate({
        expected: "a string with at most 50 code points",
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
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
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
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
  tax_rate: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTaxRatesTaxRateOutput = Stripetax_rate;
export const PostTaxRatesTaxRateError = Stripeerror;
/**
 * The GetTaxRatesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxRatesOperation: StripeOperation & {
  readonly input: typeof GetTaxRatesInput;
  readonly output: typeof GetTaxRatesOutput;
  readonly error: typeof GetTaxRatesError;
} = {
  name: "GetTaxRates",
  method: "GET",
  path: "/v1/tax_rates",
  pathParameters: [],
  queryParameters: [
    "active",
    "created",
    "ending_before",
    "expand",
    "inclusive",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxRatesInput,
  output: GetTaxRatesOutput,
  error: GetTaxRatesError,
};
/**
 * The PostTaxRatesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTaxRatesOperation: StripeOperation & {
  readonly input: typeof PostTaxRatesInput;
  readonly output: typeof PostTaxRatesOutput;
  readonly error: typeof PostTaxRatesError;
} = {
  name: "PostTaxRates",
  method: "POST",
  path: "/v1/tax_rates",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTaxRatesInput,
  output: PostTaxRatesOutput,
  error: PostTaxRatesError,
};
/**
 * The GetTaxRatesTaxRateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxRatesTaxRateOperation: StripeOperation & {
  readonly input: typeof GetTaxRatesTaxRateInput;
  readonly output: typeof GetTaxRatesTaxRateOutput;
  readonly error: typeof GetTaxRatesTaxRateError;
} = {
  name: "GetTaxRatesTaxRate",
  method: "GET",
  path: "/v1/tax_rates/{tax_rate}",
  pathParameters: ["tax_rate"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxRatesTaxRateInput,
  output: GetTaxRatesTaxRateOutput,
  error: GetTaxRatesTaxRateError,
};
/**
 * The PostTaxRatesTaxRateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTaxRatesTaxRateOperation: StripeOperation & {
  readonly input: typeof PostTaxRatesTaxRateInput;
  readonly output: typeof PostTaxRatesTaxRateOutput;
  readonly error: typeof PostTaxRatesTaxRateError;
} = {
  name: "PostTaxRatesTaxRate",
  method: "POST",
  path: "/v1/tax_rates/{tax_rate}",
  pathParameters: ["tax_rate"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTaxRatesTaxRateInput,
  output: PostTaxRatesTaxRateOutput,
  error: PostTaxRatesTaxRateError,
};
/**
 * The makeTaxRatesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTaxRatesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTaxRates function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxRates = Effect.fn("taxRates.GetTaxRates")(function* (
    input: GetTaxRatesInput,
  ) {
    const response: GetTaxRatesOutput = yield* client.invoke(
      GetTaxRatesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTaxRates function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTaxRates = Effect.fn("taxRates.PostTaxRates")(function* (
    input: PostTaxRatesInput,
  ) {
    const response: PostTaxRatesOutput = yield* client.invoke(
      PostTaxRatesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTaxRatesTaxRate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxRatesTaxRate = Effect.fn("taxRates.GetTaxRatesTaxRate")(
    function* (input: GetTaxRatesTaxRateInput) {
      const response: GetTaxRatesTaxRateOutput = yield* client.invoke(
        GetTaxRatesTaxRateOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostTaxRatesTaxRate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTaxRatesTaxRate = Effect.fn("taxRates.PostTaxRatesTaxRate")(
    function* (input: PostTaxRatesTaxRateInput) {
      const response: PostTaxRatesTaxRateOutput = yield* client.invoke(
        PostTaxRatesTaxRateOperation,
        input,
      );
      return response;
    },
  );
  return {
    GetTaxRates,
    PostTaxRates,
    GetTaxRatesTaxRate,
    PostTaxRatesTaxRate,
  };
});
