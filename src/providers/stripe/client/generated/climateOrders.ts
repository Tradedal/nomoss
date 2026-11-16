// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeclimate_order, Stripeerror } from "./models/common.js";

export type GetClimateOrdersInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetClimateOrdersOutput = {
  readonly data: ReadonlyArray<Stripeclimate_order>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetClimateOrdersError = Stripeerror;
export type PostClimateOrdersInput = {
  readonly amount?: number;
  readonly beneficiary?: { readonly public_name: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly currency?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly metric_tons?: string;
  readonly product: string;
};
export type PostClimateOrdersOutput = Stripeclimate_order;
export type PostClimateOrdersError = Stripeerror;
export type GetClimateOrdersOrderInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly order: string;
};
export type GetClimateOrdersOrderOutput = Stripeclimate_order;
export type GetClimateOrdersOrderError = Stripeerror;
export type PostClimateOrdersOrderInput = {
  readonly beneficiary?:
    | ({ readonly public_name: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly order: string;
};
export type PostClimateOrdersOrderOutput = Stripeclimate_order;
export type PostClimateOrdersOrderError = Stripeerror;
export type PostClimateOrdersOrderCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly order: string;
};
export type PostClimateOrdersOrderCancelOutput = Stripeclimate_order;
export type PostClimateOrdersOrderCancelError = Stripeerror;

export const GetClimateOrdersInput = Schema.Struct({
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
});
export const GetClimateOrdersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeclimate_order),
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
          new globalThis.RegExp("^\\/v1\\/climate\\/orders", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/climate\\/orders",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "ClimateRemovalsOrdersList", description: "" });
export const GetClimateOrdersError = Stripeerror;
export const PostClimateOrdersInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Requested amount of carbon removal units. Either this or `metric_tons` must be specified.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  beneficiary: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        public_name: Schema.String.check(
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
    ).annotate({
      title: "beneficiary_params",
      description:
        "Publicly sharable reference for the end beneficiary of carbon removal. Assumed to be the Stripe account if not set.",
    }),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Request currency for the order as a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a supported [settlement currency for your account](https://stripe.com/docs/currencies). If omitted, the account's default currency will be used.",
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
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  metric_tons: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Requested number of tons for the order. Either this or `amount` must be specified.",
      format: "decimal",
    }),
  ),
  product: Schema.String.annotate({
    description: "Unique identifier of the Climate product.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostClimateOrdersOutput = Stripeclimate_order;
export const PostClimateOrdersError = Stripeerror;
export const GetClimateOrdersOrderInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  order: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetClimateOrdersOrderOutput = Stripeclimate_order;
export const GetClimateOrdersOrderError = Stripeerror;
export const PostClimateOrdersOrderInput = Schema.Struct({
  beneficiary: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          public_name: Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "beneficiary_params" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Publicly sharable reference for the end beneficiary of carbon removal. Assumed to be the Stripe account if not set.",
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
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  order: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostClimateOrdersOrderOutput = Stripeclimate_order;
export const PostClimateOrdersOrderError = Stripeerror;
export const PostClimateOrdersOrderCancelInput = Schema.Struct({
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
  order: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostClimateOrdersOrderCancelOutput = Stripeclimate_order;
export const PostClimateOrdersOrderCancelError = Stripeerror;
/**
 * The GetClimateOrdersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetClimateOrdersOperation: StripeOperation & {
  readonly input: typeof GetClimateOrdersInput;
  readonly output: typeof GetClimateOrdersOutput;
  readonly error: typeof GetClimateOrdersError;
} = {
  name: "GetClimateOrders",
  method: "GET",
  path: "/v1/climate/orders",
  pathParameters: [],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetClimateOrdersInput,
  output: GetClimateOrdersOutput,
  error: GetClimateOrdersError,
};
/**
 * The PostClimateOrdersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostClimateOrdersOperation: StripeOperation & {
  readonly input: typeof PostClimateOrdersInput;
  readonly output: typeof PostClimateOrdersOutput;
  readonly error: typeof PostClimateOrdersError;
} = {
  name: "PostClimateOrders",
  method: "POST",
  path: "/v1/climate/orders",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostClimateOrdersInput,
  output: PostClimateOrdersOutput,
  error: PostClimateOrdersError,
};
/**
 * The GetClimateOrdersOrderOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetClimateOrdersOrderOperation: StripeOperation & {
  readonly input: typeof GetClimateOrdersOrderInput;
  readonly output: typeof GetClimateOrdersOrderOutput;
  readonly error: typeof GetClimateOrdersOrderError;
} = {
  name: "GetClimateOrdersOrder",
  method: "GET",
  path: "/v1/climate/orders/{order}",
  pathParameters: ["order"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetClimateOrdersOrderInput,
  output: GetClimateOrdersOrderOutput,
  error: GetClimateOrdersOrderError,
};
/**
 * The PostClimateOrdersOrderOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostClimateOrdersOrderOperation: StripeOperation & {
  readonly input: typeof PostClimateOrdersOrderInput;
  readonly output: typeof PostClimateOrdersOrderOutput;
  readonly error: typeof PostClimateOrdersOrderError;
} = {
  name: "PostClimateOrdersOrder",
  method: "POST",
  path: "/v1/climate/orders/{order}",
  pathParameters: ["order"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostClimateOrdersOrderInput,
  output: PostClimateOrdersOrderOutput,
  error: PostClimateOrdersOrderError,
};
/**
 * The PostClimateOrdersOrderCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostClimateOrdersOrderCancelOperation: StripeOperation & {
  readonly input: typeof PostClimateOrdersOrderCancelInput;
  readonly output: typeof PostClimateOrdersOrderCancelOutput;
  readonly error: typeof PostClimateOrdersOrderCancelError;
} = {
  name: "PostClimateOrdersOrderCancel",
  method: "POST",
  path: "/v1/climate/orders/{order}/cancel",
  pathParameters: ["order"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostClimateOrdersOrderCancelInput,
  output: PostClimateOrdersOrderCancelOutput,
  error: PostClimateOrdersOrderCancelError,
};
/**
 * The makeClimateOrdersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeClimateOrdersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetClimateOrders function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetClimateOrders = Effect.fn("climateOrders.GetClimateOrders")(
    function* (input: GetClimateOrdersInput) {
      const response: GetClimateOrdersOutput = yield* client.invoke(
        GetClimateOrdersOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostClimateOrders function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostClimateOrders = Effect.fn("climateOrders.PostClimateOrders")(
    function* (input: PostClimateOrdersInput) {
      const response: PostClimateOrdersOutput = yield* client.invoke(
        PostClimateOrdersOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetClimateOrdersOrder function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetClimateOrdersOrder = Effect.fn(
    "climateOrders.GetClimateOrdersOrder",
  )(function* (input: GetClimateOrdersOrderInput) {
    const response: GetClimateOrdersOrderOutput = yield* client.invoke(
      GetClimateOrdersOrderOperation,
      input,
    );
    return response;
  });
  /**
   * The PostClimateOrdersOrder function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostClimateOrdersOrder = Effect.fn(
    "climateOrders.PostClimateOrdersOrder",
  )(function* (input: PostClimateOrdersOrderInput) {
    const response: PostClimateOrdersOrderOutput = yield* client.invoke(
      PostClimateOrdersOrderOperation,
      input,
    );
    return response;
  });
  /**
   * The PostClimateOrdersOrderCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostClimateOrdersOrderCancel = Effect.fn(
    "climateOrders.PostClimateOrdersOrderCancel",
  )(function* (input: PostClimateOrdersOrderCancelInput) {
    const response: PostClimateOrdersOrderCancelOutput = yield* client.invoke(
      PostClimateOrdersOrderCancelOperation,
      input,
    );
    return response;
  });
  return {
    GetClimateOrders,
    PostClimateOrders,
    GetClimateOrdersOrder,
    PostClimateOrdersOrder,
    PostClimateOrdersOrderCancel,
  };
});
