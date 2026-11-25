// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeproduct_catalog_trial_offer } from "./models/catalog.js";
import { Stripeerror } from "./models/common.js";

export type GetProductCatalogTrialOffersInput = {
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
  readonly limit?: number;
  readonly prices?: ReadonlyArray<string>;
  readonly starting_after?: string;
};
export type GetProductCatalogTrialOffersOutput = {
  readonly data: ReadonlyArray<Stripeproduct_catalog_trial_offer>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetProductCatalogTrialOffersError = Stripeerror;
export type PostProductCatalogTrialOffersInput = {
  readonly active?: boolean;
  readonly duration: {
    readonly relative?: { readonly iterations: number } & {
      readonly [x: string]: Schema.Json;
    };
    readonly type: "relative";
  } & { readonly [x: string]: Schema.Json };
  readonly end_behavior: {
    readonly transition: { readonly price: string } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly nickname?: string;
  readonly price: string;
};
export type PostProductCatalogTrialOffersOutput =
  Stripeproduct_catalog_trial_offer;
export type PostProductCatalogTrialOffersError = Stripeerror;
export type GetProductCatalogTrialOffersIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetProductCatalogTrialOffersIdOutput =
  Stripeproduct_catalog_trial_offer;
export type GetProductCatalogTrialOffersIdError = Stripeerror;
export type PostProductCatalogTrialOffersIdInput = {
  readonly active?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostProductCatalogTrialOffersIdOutput =
  Stripeproduct_catalog_trial_offer;
export type PostProductCatalogTrialOffersIdError = Stripeerror;

export const GetProductCatalogTrialOffersInput = Schema.Struct({
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
  limit: Schema.optionalKey(Schema.Int),
  prices: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
export const GetProductCatalogTrialOffersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeproduct_catalog_trial_offer).annotate({
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
    }).check(
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
).annotate({ title: "TrialOfferList", description: "" });
export const GetProductCatalogTrialOffersError = Stripeerror;
export const PostProductCatalogTrialOffersInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the trial offer can be used for new subscriptions. Defaults to true.",
    }),
  ),
  duration: Schema.StructWithRest(
    Schema.Struct({
      relative: Schema.optionalKey(
        Schema.StructWithRest(Schema.Struct({ iterations: Schema.Int }), [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ]).annotate({ title: "trial_offer_duration_relative_param" }),
      ),
      type: Schema.Literal("relative"),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "trial_offer_duration_param",
    description: "Duration of one service period of the trial.",
  }),
  end_behavior: Schema.StructWithRest(
    Schema.Struct({
      transition: Schema.StructWithRest(
        Schema.Struct({
          price: Schema.String.check(
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
      ).annotate({ title: "trial_offer_end_behavior_transition_param" }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "trial_offer_end_behavior_param",
    description: "Define behavior that occurs at the end of the trial.",
  }),
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
  nickname: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A brief description of the trial offer, hidden from customers.",
    }).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  ),
  price: Schema.String.annotate({
    description:
      "Price configuration during the trial period (amount, billing scheme, etc).",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostProductCatalogTrialOffersOutput =
  Stripeproduct_catalog_trial_offer;
export const PostProductCatalogTrialOffersError = Stripeerror;
export const GetProductCatalogTrialOffersIdInput = Schema.Struct({
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
export const GetProductCatalogTrialOffersIdOutput =
  Stripeproduct_catalog_trial_offer;
export const GetProductCatalogTrialOffersIdError = Stripeerror;
export const PostProductCatalogTrialOffersIdInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Whether the trial offer can be used for new purchases.",
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostProductCatalogTrialOffersIdOutput =
  Stripeproduct_catalog_trial_offer;
export const PostProductCatalogTrialOffersIdError = Stripeerror;
/**
 * The GetProductCatalogTrialOffersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetProductCatalogTrialOffersOperation: StripeOperation & {
  readonly input: typeof GetProductCatalogTrialOffersInput;
  readonly output: typeof GetProductCatalogTrialOffersOutput;
  readonly error: typeof GetProductCatalogTrialOffersError;
} = {
  name: "GetProductCatalogTrialOffers",
  method: "GET",
  path: "/v1/product_catalog/trial_offers",
  pathParameters: [],
  queryParameters: [
    "active",
    "created",
    "ending_before",
    "expand",
    "limit",
    "prices",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetProductCatalogTrialOffersInput,
  output: GetProductCatalogTrialOffersOutput,
  error: GetProductCatalogTrialOffersError,
};
/**
 * The PostProductCatalogTrialOffersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostProductCatalogTrialOffersOperation: StripeOperation & {
  readonly input: typeof PostProductCatalogTrialOffersInput;
  readonly output: typeof PostProductCatalogTrialOffersOutput;
  readonly error: typeof PostProductCatalogTrialOffersError;
} = {
  name: "PostProductCatalogTrialOffers",
  method: "POST",
  path: "/v1/product_catalog/trial_offers",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostProductCatalogTrialOffersInput,
  output: PostProductCatalogTrialOffersOutput,
  error: PostProductCatalogTrialOffersError,
};
/**
 * The GetProductCatalogTrialOffersIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetProductCatalogTrialOffersIdOperation: StripeOperation & {
  readonly input: typeof GetProductCatalogTrialOffersIdInput;
  readonly output: typeof GetProductCatalogTrialOffersIdOutput;
  readonly error: typeof GetProductCatalogTrialOffersIdError;
} = {
  name: "GetProductCatalogTrialOffersId",
  method: "GET",
  path: "/v1/product_catalog/trial_offers/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetProductCatalogTrialOffersIdInput,
  output: GetProductCatalogTrialOffersIdOutput,
  error: GetProductCatalogTrialOffersIdError,
};
/**
 * The PostProductCatalogTrialOffersIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostProductCatalogTrialOffersIdOperation: StripeOperation & {
  readonly input: typeof PostProductCatalogTrialOffersIdInput;
  readonly output: typeof PostProductCatalogTrialOffersIdOutput;
  readonly error: typeof PostProductCatalogTrialOffersIdError;
} = {
  name: "PostProductCatalogTrialOffersId",
  method: "POST",
  path: "/v1/product_catalog/trial_offers/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostProductCatalogTrialOffersIdInput,
  output: PostProductCatalogTrialOffersIdOutput,
  error: PostProductCatalogTrialOffersIdError,
};
/**
 * The makeProductCatalogTrialOffersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeProductCatalogTrialOffersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetProductCatalogTrialOffers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetProductCatalogTrialOffers = Effect.fn(
    "productCatalogTrialOffers.GetProductCatalogTrialOffers",
  )(function* (input: GetProductCatalogTrialOffersInput) {
    const response: GetProductCatalogTrialOffersOutput = yield* client.invoke(
      GetProductCatalogTrialOffersOperation,
      input,
    );
    return response;
  });
  /**
   * The PostProductCatalogTrialOffers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostProductCatalogTrialOffers = Effect.fn(
    "productCatalogTrialOffers.PostProductCatalogTrialOffers",
  )(function* (input: PostProductCatalogTrialOffersInput) {
    const response: PostProductCatalogTrialOffersOutput = yield* client.invoke(
      PostProductCatalogTrialOffersOperation,
      input,
    );
    return response;
  });
  /**
   * The GetProductCatalogTrialOffersId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetProductCatalogTrialOffersId = Effect.fn(
    "productCatalogTrialOffers.GetProductCatalogTrialOffersId",
  )(function* (input: GetProductCatalogTrialOffersIdInput) {
    const response: GetProductCatalogTrialOffersIdOutput = yield* client.invoke(
      GetProductCatalogTrialOffersIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostProductCatalogTrialOffersId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostProductCatalogTrialOffersId = Effect.fn(
    "productCatalogTrialOffers.PostProductCatalogTrialOffersId",
  )(function* (input: PostProductCatalogTrialOffersIdInput) {
    const response: PostProductCatalogTrialOffersIdOutput =
      yield* client.invoke(PostProductCatalogTrialOffersIdOperation, input);
    return response;
  });
  return {
    GetProductCatalogTrialOffers,
    PostProductCatalogTrialOffers,
    GetProductCatalogTrialOffersId,
    PostProductCatalogTrialOffersId,
  };
});
