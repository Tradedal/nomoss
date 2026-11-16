// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripetax_location } from "./models/catalog.js";
import { Stripeerror } from "./models/common.js";

export type GetTaxLocationsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly type: "performance";
};
export type GetTaxLocationsOutput = {
  readonly data: ReadonlyArray<Stripetax_location>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTaxLocationsError = Stripeerror;
export type PostTaxLocationsInput = {
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
export type PostTaxLocationsOutput = Stripetax_location;
export type PostTaxLocationsError = Stripeerror;
export type GetTaxLocationsLocationInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly location: string;
};
export type GetTaxLocationsLocationOutput = Stripetax_location;
export type GetTaxLocationsLocationError = Stripeerror;

export const GetTaxLocationsInput = Schema.Struct({
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
  limit: Schema.optionalKey(Schema.Int),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  type: Schema.Literal("performance"),
});
export const GetTaxLocationsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetax_location).annotate({
      description: "Details about each object.",
    }),
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
          new globalThis.RegExp("^\\/v1\\/tax\\/locations", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/tax\\/locations",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "TaxLocationList", description: "" });
export const GetTaxLocationsError = Stripeerror;
export const PostTaxLocationsInput = Schema.Struct({
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  type: Schema.Literal("performance").annotate({
    description:
      'The type of tax location. The only supported value is "performance".',
  }),
});
export const PostTaxLocationsOutput = Stripetax_location;
export const PostTaxLocationsError = Stripeerror;
export const GetTaxLocationsLocationInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  location: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTaxLocationsLocationOutput = Stripetax_location;
export const GetTaxLocationsLocationError = Stripeerror;
/**
 * The GetTaxLocationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxLocationsOperation: StripeOperation & {
  readonly input: typeof GetTaxLocationsInput;
  readonly output: typeof GetTaxLocationsOutput;
  readonly error: typeof GetTaxLocationsError;
} = {
  name: "GetTaxLocations",
  method: "GET",
  path: "/v1/tax/locations",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "type",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxLocationsInput,
  output: GetTaxLocationsOutput,
  error: GetTaxLocationsError,
};
/**
 * The PostTaxLocationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTaxLocationsOperation: StripeOperation & {
  readonly input: typeof PostTaxLocationsInput;
  readonly output: typeof PostTaxLocationsOutput;
  readonly error: typeof PostTaxLocationsError;
} = {
  name: "PostTaxLocations",
  method: "POST",
  path: "/v1/tax/locations",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTaxLocationsInput,
  output: PostTaxLocationsOutput,
  error: PostTaxLocationsError,
};
/**
 * The GetTaxLocationsLocationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxLocationsLocationOperation: StripeOperation & {
  readonly input: typeof GetTaxLocationsLocationInput;
  readonly output: typeof GetTaxLocationsLocationOutput;
  readonly error: typeof GetTaxLocationsLocationError;
} = {
  name: "GetTaxLocationsLocation",
  method: "GET",
  path: "/v1/tax/locations/{location}",
  pathParameters: ["location"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxLocationsLocationInput,
  output: GetTaxLocationsLocationOutput,
  error: GetTaxLocationsLocationError,
};
/**
 * The makeTaxLocationsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTaxLocationsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTaxLocations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxLocations = Effect.fn("taxLocations.GetTaxLocations")(function* (
    input: GetTaxLocationsInput,
  ) {
    const response: GetTaxLocationsOutput = yield* client.invoke(
      GetTaxLocationsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTaxLocations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTaxLocations = Effect.fn("taxLocations.PostTaxLocations")(
    function* (input: PostTaxLocationsInput) {
      const response: PostTaxLocationsOutput = yield* client.invoke(
        PostTaxLocationsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetTaxLocationsLocation function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxLocationsLocation = Effect.fn(
    "taxLocations.GetTaxLocationsLocation",
  )(function* (input: GetTaxLocationsLocationInput) {
    const response: GetTaxLocationsLocationOutput = yield* client.invoke(
      GetTaxLocationsLocationOperation,
      input,
    );
    return response;
  });
  return {
    GetTaxLocations,
    PostTaxLocations,
    GetTaxLocationsLocation,
  };
});
