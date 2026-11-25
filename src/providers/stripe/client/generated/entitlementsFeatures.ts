// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeentitlements_feature, Stripeerror } from "./models/common.js";

export type GetEntitlementsFeaturesInput = {
  readonly archived?: boolean;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly lookup_key?: string;
  readonly starting_after?: string;
};
export type GetEntitlementsFeaturesOutput = {
  readonly data: ReadonlyArray<Stripeentitlements_feature>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetEntitlementsFeaturesError = Stripeerror;
export type PostEntitlementsFeaturesInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly lookup_key: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly name: string;
};
export type PostEntitlementsFeaturesOutput = Stripeentitlements_feature;
export type PostEntitlementsFeaturesError = Stripeerror;
export type GetEntitlementsFeaturesIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetEntitlementsFeaturesIdOutput = Stripeentitlements_feature;
export type GetEntitlementsFeaturesIdError = Stripeerror;
export type PostEntitlementsFeaturesIdInput = {
  readonly active?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly name?: string;
  readonly id: string;
};
export type PostEntitlementsFeaturesIdOutput = Stripeentitlements_feature;
export type PostEntitlementsFeaturesIdError = Stripeerror;

export const GetEntitlementsFeaturesInput = Schema.Struct({
  archived: Schema.optionalKey(Schema.Boolean),
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
  lookup_key: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetEntitlementsFeaturesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeentitlements_feature),
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
          new globalThis.RegExp("^\\/v1\\/entitlements\\/features", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/entitlements\\/features",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "EntitlementsResourceFeatureList", description: "" });
export const GetEntitlementsFeaturesError = Stripeerror;
export const PostEntitlementsFeaturesInput = Schema.Struct({
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
  lookup_key: Schema.String.annotate({
    description:
      "A unique key you provide as your own system identifier. This may be up to 80 characters.",
  }).check(
    Schema.isMaxCodePoints(80).annotate({
      expected: "a string with at most 80 code points",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
  ),
  name: Schema.String.annotate({
    description:
      "The feature's name, for your own purpose, not meant to be displayable to the customer.",
  }).check(
    Schema.isMaxCodePoints(80).annotate({
      expected: "a string with at most 80 code points",
    }),
  ),
});
export const PostEntitlementsFeaturesOutput = Stripeentitlements_feature;
export const PostEntitlementsFeaturesError = Stripeerror;
export const GetEntitlementsFeaturesIdInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetEntitlementsFeaturesIdOutput = Stripeentitlements_feature;
export const GetEntitlementsFeaturesIdError = Stripeerror;
export const PostEntitlementsFeaturesIdInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Inactive features cannot be attached to new products and will not be returned from the features list endpoint.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
  ),
  name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The feature's name, for your own purpose, not meant to be displayable to the customer.",
    }).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostEntitlementsFeaturesIdOutput = Stripeentitlements_feature;
export const PostEntitlementsFeaturesIdError = Stripeerror;
/**
 * The GetEntitlementsFeaturesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetEntitlementsFeaturesOperation: StripeOperation & {
  readonly input: typeof GetEntitlementsFeaturesInput;
  readonly output: typeof GetEntitlementsFeaturesOutput;
  readonly error: typeof GetEntitlementsFeaturesError;
} = {
  name: "GetEntitlementsFeatures",
  method: "GET",
  path: "/v1/entitlements/features",
  pathParameters: [],
  queryParameters: [
    "archived",
    "ending_before",
    "expand",
    "limit",
    "lookup_key",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetEntitlementsFeaturesInput,
  output: GetEntitlementsFeaturesOutput,
  error: GetEntitlementsFeaturesError,
};
/**
 * The PostEntitlementsFeaturesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostEntitlementsFeaturesOperation: StripeOperation & {
  readonly input: typeof PostEntitlementsFeaturesInput;
  readonly output: typeof PostEntitlementsFeaturesOutput;
  readonly error: typeof PostEntitlementsFeaturesError;
} = {
  name: "PostEntitlementsFeatures",
  method: "POST",
  path: "/v1/entitlements/features",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostEntitlementsFeaturesInput,
  output: PostEntitlementsFeaturesOutput,
  error: PostEntitlementsFeaturesError,
};
/**
 * The GetEntitlementsFeaturesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetEntitlementsFeaturesIdOperation: StripeOperation & {
  readonly input: typeof GetEntitlementsFeaturesIdInput;
  readonly output: typeof GetEntitlementsFeaturesIdOutput;
  readonly error: typeof GetEntitlementsFeaturesIdError;
} = {
  name: "GetEntitlementsFeaturesId",
  method: "GET",
  path: "/v1/entitlements/features/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetEntitlementsFeaturesIdInput,
  output: GetEntitlementsFeaturesIdOutput,
  error: GetEntitlementsFeaturesIdError,
};
/**
 * The PostEntitlementsFeaturesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostEntitlementsFeaturesIdOperation: StripeOperation & {
  readonly input: typeof PostEntitlementsFeaturesIdInput;
  readonly output: typeof PostEntitlementsFeaturesIdOutput;
  readonly error: typeof PostEntitlementsFeaturesIdError;
} = {
  name: "PostEntitlementsFeaturesId",
  method: "POST",
  path: "/v1/entitlements/features/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostEntitlementsFeaturesIdInput,
  output: PostEntitlementsFeaturesIdOutput,
  error: PostEntitlementsFeaturesIdError,
};
/**
 * The makeEntitlementsFeaturesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeEntitlementsFeaturesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetEntitlementsFeatures function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetEntitlementsFeatures = Effect.fn(
    "entitlementsFeatures.GetEntitlementsFeatures",
  )(function* (input: GetEntitlementsFeaturesInput) {
    const response: GetEntitlementsFeaturesOutput = yield* client.invoke(
      GetEntitlementsFeaturesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostEntitlementsFeatures function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostEntitlementsFeatures = Effect.fn(
    "entitlementsFeatures.PostEntitlementsFeatures",
  )(function* (input: PostEntitlementsFeaturesInput) {
    const response: PostEntitlementsFeaturesOutput = yield* client.invoke(
      PostEntitlementsFeaturesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetEntitlementsFeaturesId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetEntitlementsFeaturesId = Effect.fn(
    "entitlementsFeatures.GetEntitlementsFeaturesId",
  )(function* (input: GetEntitlementsFeaturesIdInput) {
    const response: GetEntitlementsFeaturesIdOutput = yield* client.invoke(
      GetEntitlementsFeaturesIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostEntitlementsFeaturesId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostEntitlementsFeaturesId = Effect.fn(
    "entitlementsFeatures.PostEntitlementsFeaturesId",
  )(function* (input: PostEntitlementsFeaturesIdInput) {
    const response: PostEntitlementsFeaturesIdOutput = yield* client.invoke(
      PostEntitlementsFeaturesIdOperation,
      input,
    );
    return response;
  });
  return {
    GetEntitlementsFeatures,
    PostEntitlementsFeatures,
    GetEntitlementsFeaturesId,
    PostEntitlementsFeaturesId,
  };
});
