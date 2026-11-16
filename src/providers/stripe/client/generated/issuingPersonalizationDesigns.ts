// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripeissuing_personalization_design } from "./models/issuing.js";

export type GetIssuingPersonalizationDesignsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly lookup_keys?: ReadonlyArray<string>;
  readonly preferences?: {
    readonly is_default?: boolean;
    readonly is_platform_default?: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly starting_after?: string;
  readonly status?: "active" | "inactive" | "rejected" | "review";
};
export type GetIssuingPersonalizationDesignsOutput = {
  readonly data: ReadonlyArray<Stripeissuing_personalization_design>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetIssuingPersonalizationDesignsError = Stripeerror;
export type PostIssuingPersonalizationDesignsInput = {
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
export type PostIssuingPersonalizationDesignsOutput =
  Stripeissuing_personalization_design;
export type PostIssuingPersonalizationDesignsError = Stripeerror;
export type GetIssuingPersonalizationDesignsPersonalizationDesignInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly personalization_design: string;
};
export type GetIssuingPersonalizationDesignsPersonalizationDesignOutput =
  Stripeissuing_personalization_design;
export type GetIssuingPersonalizationDesignsPersonalizationDesignError =
  Stripeerror;
export type PostIssuingPersonalizationDesignsPersonalizationDesignInput = {
  readonly card_logo?: string | "";
  readonly carrier_text?:
    | ({
        readonly footer_body?: string | "";
        readonly footer_title?: string | "";
        readonly header_body?: string | "";
        readonly header_title?: string | "";
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly lookup_key?: string | "";
  readonly metadata?: { readonly [x: string]: string };
  readonly name?: string | "";
  readonly physical_bundle?: string;
  readonly preferences?: { readonly is_default: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly transfer_lookup_key?: boolean;
  readonly personalization_design: string;
};
export type PostIssuingPersonalizationDesignsPersonalizationDesignOutput =
  Stripeissuing_personalization_design;
export type PostIssuingPersonalizationDesignsPersonalizationDesignError =
  Stripeerror;

export const GetIssuingPersonalizationDesignsInput = Schema.Struct({
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
  lookup_keys: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(200).annotate({
          expected: "a string with at most 200 code points",
        }),
      ),
    ),
  ),
  preferences: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        is_default: Schema.optionalKey(Schema.Boolean),
        is_platform_default: Schema.optionalKey(Schema.Boolean),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "preferences_list_param" }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(["active", "inactive", "rejected", "review"]),
  ),
});
export const GetIssuingPersonalizationDesignsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeissuing_personalization_design),
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
          new globalThis.RegExp(
            "^\\/v1\\/issuing\\/personalization_designs",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/issuing\\/personalization_designs",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "IssuingPersonalizationDesignList", description: "" });
export const GetIssuingPersonalizationDesignsError = Stripeerror;
export const PostIssuingPersonalizationDesignsInput = Schema.Struct({
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
      description: "Specifies which fields in the response should be expanded.",
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
});
export const PostIssuingPersonalizationDesignsOutput =
  Stripeissuing_personalization_design;
export const PostIssuingPersonalizationDesignsError = Stripeerror;
export const GetIssuingPersonalizationDesignsPersonalizationDesignInput =
  Schema.Struct({
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    ),
    personalization_design: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const GetIssuingPersonalizationDesignsPersonalizationDesignOutput =
  Stripeissuing_personalization_design;
export const GetIssuingPersonalizationDesignsPersonalizationDesignError =
  Stripeerror;
export const PostIssuingPersonalizationDesignsPersonalizationDesignInput =
  Schema.Struct({
    card_logo: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Literal("")]).annotate({
        description:
          "The file for the card logo, for use with physical bundles that support card logos. Must have a `purpose` value of `issuing_logo`.",
      }),
    ),
    carrier_text: Schema.optionalKey(
      Schema.Union([
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
        ).annotate({ title: "carrier_text_param" }),
        Schema.Literal(""),
      ]).annotate({
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
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        ),
        Schema.Literal(""),
      ]).annotate({
        description:
          "A lookup key used to retrieve personalization designs dynamically from a static string. This may be up to 200 characters.",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        ),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Friendly display name. Providing an empty string will set the field to null.",
      }),
    ),
    physical_bundle: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The physical bundle object belonging to this personalization design.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
    personalization_design: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostIssuingPersonalizationDesignsPersonalizationDesignOutput =
  Stripeissuing_personalization_design;
export const PostIssuingPersonalizationDesignsPersonalizationDesignError =
  Stripeerror;
/**
 * The GetIssuingPersonalizationDesignsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetIssuingPersonalizationDesignsOperation: StripeOperation & {
  readonly input: typeof GetIssuingPersonalizationDesignsInput;
  readonly output: typeof GetIssuingPersonalizationDesignsOutput;
  readonly error: typeof GetIssuingPersonalizationDesignsError;
} = {
  name: "GetIssuingPersonalizationDesigns",
  method: "GET",
  path: "/v1/issuing/personalization_designs",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "lookup_keys",
    "preferences",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetIssuingPersonalizationDesignsInput,
  output: GetIssuingPersonalizationDesignsOutput,
  error: GetIssuingPersonalizationDesignsError,
};
/**
 * The PostIssuingPersonalizationDesignsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIssuingPersonalizationDesignsOperation: StripeOperation & {
  readonly input: typeof PostIssuingPersonalizationDesignsInput;
  readonly output: typeof PostIssuingPersonalizationDesignsOutput;
  readonly error: typeof PostIssuingPersonalizationDesignsError;
} = {
  name: "PostIssuingPersonalizationDesigns",
  method: "POST",
  path: "/v1/issuing/personalization_designs",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIssuingPersonalizationDesignsInput,
  output: PostIssuingPersonalizationDesignsOutput,
  error: PostIssuingPersonalizationDesignsError,
};
/**
 * The GetIssuingPersonalizationDesignsPersonalizationDesignOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetIssuingPersonalizationDesignsPersonalizationDesignOperation: StripeOperation & {
  readonly input: typeof GetIssuingPersonalizationDesignsPersonalizationDesignInput;
  readonly output: typeof GetIssuingPersonalizationDesignsPersonalizationDesignOutput;
  readonly error: typeof GetIssuingPersonalizationDesignsPersonalizationDesignError;
} = {
  name: "GetIssuingPersonalizationDesignsPersonalizationDesign",
  method: "GET",
  path: "/v1/issuing/personalization_designs/{personalization_design}",
  pathParameters: ["personalization_design"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetIssuingPersonalizationDesignsPersonalizationDesignInput,
  output: GetIssuingPersonalizationDesignsPersonalizationDesignOutput,
  error: GetIssuingPersonalizationDesignsPersonalizationDesignError,
};
/**
 * The PostIssuingPersonalizationDesignsPersonalizationDesignOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIssuingPersonalizationDesignsPersonalizationDesignOperation: StripeOperation & {
  readonly input: typeof PostIssuingPersonalizationDesignsPersonalizationDesignInput;
  readonly output: typeof PostIssuingPersonalizationDesignsPersonalizationDesignOutput;
  readonly error: typeof PostIssuingPersonalizationDesignsPersonalizationDesignError;
} = {
  name: "PostIssuingPersonalizationDesignsPersonalizationDesign",
  method: "POST",
  path: "/v1/issuing/personalization_designs/{personalization_design}",
  pathParameters: ["personalization_design"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIssuingPersonalizationDesignsPersonalizationDesignInput,
  output: PostIssuingPersonalizationDesignsPersonalizationDesignOutput,
  error: PostIssuingPersonalizationDesignsPersonalizationDesignError,
};
/**
 * The makeIssuingPersonalizationDesignsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeIssuingPersonalizationDesignsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetIssuingPersonalizationDesigns function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetIssuingPersonalizationDesigns = Effect.fn(
    "issuingPersonalizationDesigns.GetIssuingPersonalizationDesigns",
  )(function* (input: GetIssuingPersonalizationDesignsInput) {
    const response: GetIssuingPersonalizationDesignsOutput =
      yield* client.invoke(GetIssuingPersonalizationDesignsOperation, input);
    return response;
  });
  /**
   * The PostIssuingPersonalizationDesigns function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIssuingPersonalizationDesigns = Effect.fn(
    "issuingPersonalizationDesigns.PostIssuingPersonalizationDesigns",
  )(function* (input: PostIssuingPersonalizationDesignsInput) {
    const response: PostIssuingPersonalizationDesignsOutput =
      yield* client.invoke(PostIssuingPersonalizationDesignsOperation, input);
    return response;
  });
  /**
   * The GetIssuingPersonalizationDesignsPersonalizationDesign function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetIssuingPersonalizationDesignsPersonalizationDesign = Effect.fn(
    "issuingPersonalizationDesigns.GetIssuingPersonalizationDesignsPersonalizationDesign",
  )(function* (
    input: GetIssuingPersonalizationDesignsPersonalizationDesignInput,
  ) {
    const response: GetIssuingPersonalizationDesignsPersonalizationDesignOutput =
      yield* client.invoke(
        GetIssuingPersonalizationDesignsPersonalizationDesignOperation,
        input,
      );
    return response;
  });
  /**
   * The PostIssuingPersonalizationDesignsPersonalizationDesign function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIssuingPersonalizationDesignsPersonalizationDesign = Effect.fn(
    "issuingPersonalizationDesigns.PostIssuingPersonalizationDesignsPersonalizationDesign",
  )(function* (
    input: PostIssuingPersonalizationDesignsPersonalizationDesignInput,
  ) {
    const response: PostIssuingPersonalizationDesignsPersonalizationDesignOutput =
      yield* client.invoke(
        PostIssuingPersonalizationDesignsPersonalizationDesignOperation,
        input,
      );
    return response;
  });
  return {
    GetIssuingPersonalizationDesigns,
    PostIssuingPersonalizationDesigns,
    GetIssuingPersonalizationDesignsPersonalizationDesign,
    PostIssuingPersonalizationDesignsPersonalizationDesign,
  };
});
