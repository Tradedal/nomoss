// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripeforwarding_request } from "./models/common.js";

export type GetForwardingRequestsInput = {
  readonly created?: {
    readonly gt?: number;
    readonly gte?: number;
    readonly lt?: number;
    readonly lte?: number;
  } & { readonly [x: string]: Schema.Json };
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetForwardingRequestsOutput = {
  readonly data: ReadonlyArray<Stripeforwarding_request>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetForwardingRequestsError = Stripeerror;
export type PostForwardingRequestsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly payment_method: string;
  readonly replacements: ReadonlyArray<
    | "card_cvc"
    | "card_expiry"
    | "card_number"
    | "cardholder_name"
    | "request_signature"
  >;
  readonly request?: {
    readonly body?: string;
    readonly headers?: ReadonlyArray<
      { readonly name: string; readonly value: string } & {
        readonly [x: string]: Schema.Json;
      }
    >;
  } & { readonly [x: string]: Schema.Json };
  readonly url: string;
};
export type PostForwardingRequestsOutput = Stripeforwarding_request;
export type PostForwardingRequestsError = Stripeerror;
export type GetForwardingRequestsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetForwardingRequestsIdOutput = Stripeforwarding_request;
export type GetForwardingRequestsIdError = Stripeerror;

export const GetForwardingRequestsInput = Schema.Struct({
  created: Schema.optionalKey(
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
    ).annotate({ title: "created_param" }),
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetForwardingRequestsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeforwarding_request),
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
).annotate({
  title: "ForwardingRequestList",
  description: "List of ForwardingRequest data.",
});
export const GetForwardingRequestsError = Stripeerror;
export const PostForwardingRequestsInput = Schema.Struct({
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
  payment_method: Schema.String.annotate({
    description:
      "The PaymentMethod to insert into the forwarded request. Forwarding previously consumed PaymentMethods is allowed.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  replacements: Schema.Array(
    Schema.Literals([
      "card_cvc",
      "card_expiry",
      "card_number",
      "cardholder_name",
      "request_signature",
    ]),
  ).annotate({
    description: "The field kinds to be replaced in the forwarded request.",
  }),
  request: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        body: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        headers: Schema.optionalKey(
          Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                name: Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                value: Schema.String.check(
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
            ).annotate({ title: "header_param" }),
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
      title: "request_param",
      description:
        "The request body and headers to be sent to the destination endpoint.",
    }),
  ),
  url: Schema.String.annotate({
    description:
      "The destination URL for the forwarded request. Must be supported by the config.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostForwardingRequestsOutput = Stripeforwarding_request;
export const PostForwardingRequestsError = Stripeerror;
export const GetForwardingRequestsIdInput = Schema.Struct({
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
export const GetForwardingRequestsIdOutput = Stripeforwarding_request;
export const GetForwardingRequestsIdError = Stripeerror;
/**
 * The GetForwardingRequestsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetForwardingRequestsOperation: StripeOperation & {
  readonly input: typeof GetForwardingRequestsInput;
  readonly output: typeof GetForwardingRequestsOutput;
  readonly error: typeof GetForwardingRequestsError;
} = {
  name: "GetForwardingRequests",
  method: "GET",
  path: "/v1/forwarding/requests",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetForwardingRequestsInput,
  output: GetForwardingRequestsOutput,
  error: GetForwardingRequestsError,
};
/**
 * The PostForwardingRequestsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostForwardingRequestsOperation: StripeOperation & {
  readonly input: typeof PostForwardingRequestsInput;
  readonly output: typeof PostForwardingRequestsOutput;
  readonly error: typeof PostForwardingRequestsError;
} = {
  name: "PostForwardingRequests",
  method: "POST",
  path: "/v1/forwarding/requests",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostForwardingRequestsInput,
  output: PostForwardingRequestsOutput,
  error: PostForwardingRequestsError,
};
/**
 * The GetForwardingRequestsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetForwardingRequestsIdOperation: StripeOperation & {
  readonly input: typeof GetForwardingRequestsIdInput;
  readonly output: typeof GetForwardingRequestsIdOutput;
  readonly error: typeof GetForwardingRequestsIdError;
} = {
  name: "GetForwardingRequestsId",
  method: "GET",
  path: "/v1/forwarding/requests/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetForwardingRequestsIdInput,
  output: GetForwardingRequestsIdOutput,
  error: GetForwardingRequestsIdError,
};
/**
 * The makeForwardingRequestsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeForwardingRequestsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetForwardingRequests function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetForwardingRequests = Effect.fn(
    "forwardingRequests.GetForwardingRequests",
  )(function* (input: GetForwardingRequestsInput) {
    const response: GetForwardingRequestsOutput = yield* client.invoke(
      GetForwardingRequestsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostForwardingRequests function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostForwardingRequests = Effect.fn(
    "forwardingRequests.PostForwardingRequests",
  )(function* (input: PostForwardingRequestsInput) {
    const response: PostForwardingRequestsOutput = yield* client.invoke(
      PostForwardingRequestsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetForwardingRequestsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetForwardingRequestsId = Effect.fn(
    "forwardingRequests.GetForwardingRequestsId",
  )(function* (input: GetForwardingRequestsIdInput) {
    const response: GetForwardingRequestsIdOutput = yield* client.invoke(
      GetForwardingRequestsIdOperation,
      input,
    );
    return response;
  });
  return {
    GetForwardingRequests,
    PostForwardingRequests,
    GetForwardingRequestsId,
  };
});
