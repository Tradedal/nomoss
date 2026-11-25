// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripebilling_feedback_option } from "./models/billing.js";
import { Stripeerror } from "./models/common.js";

export type GetBillingFeedbackOptionsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: "active" | "inactive";
};
export type GetBillingFeedbackOptionsOutput = {
  readonly data: ReadonlyArray<Stripebilling_feedback_option>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetBillingFeedbackOptionsError = Stripeerror;
export type PostBillingFeedbackOptionsInput = {
  readonly description: string;
  readonly expand?: ReadonlyArray<string>;
};
export type PostBillingFeedbackOptionsOutput = Stripebilling_feedback_option;
export type PostBillingFeedbackOptionsError = Stripeerror;
export type GetBillingFeedbackOptionsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetBillingFeedbackOptionsIdOutput = Stripebilling_feedback_option;
export type GetBillingFeedbackOptionsIdError = Stripeerror;
export type PostBillingFeedbackOptionsIdInput = {
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingFeedbackOptionsIdOutput = Stripebilling_feedback_option;
export type PostBillingFeedbackOptionsIdError = Stripeerror;
export type PostBillingFeedbackOptionsIdDeactivateInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingFeedbackOptionsIdDeactivateOutput =
  Stripebilling_feedback_option;
export type PostBillingFeedbackOptionsIdDeactivateError = Stripeerror;

export const GetBillingFeedbackOptionsInput = Schema.Struct({
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
  status: Schema.optionalKey(Schema.Literals(["active", "inactive"])),
});
export const GetBillingFeedbackOptionsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripebilling_feedback_option),
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
  title: "Resource for List Endpoint",
  description: "Resource for the List Endpoint of Feedback Option.",
});
export const GetBillingFeedbackOptionsError = Stripeerror;
export const PostBillingFeedbackOptionsInput = Schema.Struct({
  description: Schema.String.annotate({
    description:
      "The text of the feedback option, which customers see when canceling. Maximum 100 characters.",
  }).check(
    Schema.isMaxCodePoints(100).annotate({
      expected: "a string with at most 100 code points",
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
});
export const PostBillingFeedbackOptionsOutput = Stripebilling_feedback_option;
export const PostBillingFeedbackOptionsError = Stripeerror;
export const GetBillingFeedbackOptionsIdInput = Schema.Struct({
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
export const GetBillingFeedbackOptionsIdOutput = Stripebilling_feedback_option;
export const GetBillingFeedbackOptionsIdError = Stripeerror;
export const PostBillingFeedbackOptionsIdInput = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The text of the feedback option, which customers see when canceling. Maximum 100 characters.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostBillingFeedbackOptionsIdOutput = Stripebilling_feedback_option;
export const PostBillingFeedbackOptionsIdError = Stripeerror;
export const PostBillingFeedbackOptionsIdDeactivateInput = Schema.Struct({
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
export const PostBillingFeedbackOptionsIdDeactivateOutput =
  Stripebilling_feedback_option;
export const PostBillingFeedbackOptionsIdDeactivateError = Stripeerror;
/**
 * The GetBillingFeedbackOptionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingFeedbackOptionsOperation: StripeOperation & {
  readonly input: typeof GetBillingFeedbackOptionsInput;
  readonly output: typeof GetBillingFeedbackOptionsOutput;
  readonly error: typeof GetBillingFeedbackOptionsError;
} = {
  name: "GetBillingFeedbackOptions",
  method: "GET",
  path: "/v1/billing/feedback_options",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingFeedbackOptionsInput,
  output: GetBillingFeedbackOptionsOutput,
  error: GetBillingFeedbackOptionsError,
};
/**
 * The PostBillingFeedbackOptionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingFeedbackOptionsOperation: StripeOperation & {
  readonly input: typeof PostBillingFeedbackOptionsInput;
  readonly output: typeof PostBillingFeedbackOptionsOutput;
  readonly error: typeof PostBillingFeedbackOptionsError;
} = {
  name: "PostBillingFeedbackOptions",
  method: "POST",
  path: "/v1/billing/feedback_options",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingFeedbackOptionsInput,
  output: PostBillingFeedbackOptionsOutput,
  error: PostBillingFeedbackOptionsError,
};
/**
 * The GetBillingFeedbackOptionsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingFeedbackOptionsIdOperation: StripeOperation & {
  readonly input: typeof GetBillingFeedbackOptionsIdInput;
  readonly output: typeof GetBillingFeedbackOptionsIdOutput;
  readonly error: typeof GetBillingFeedbackOptionsIdError;
} = {
  name: "GetBillingFeedbackOptionsId",
  method: "GET",
  path: "/v1/billing/feedback_options/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingFeedbackOptionsIdInput,
  output: GetBillingFeedbackOptionsIdOutput,
  error: GetBillingFeedbackOptionsIdError,
};
/**
 * The PostBillingFeedbackOptionsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingFeedbackOptionsIdOperation: StripeOperation & {
  readonly input: typeof PostBillingFeedbackOptionsIdInput;
  readonly output: typeof PostBillingFeedbackOptionsIdOutput;
  readonly error: typeof PostBillingFeedbackOptionsIdError;
} = {
  name: "PostBillingFeedbackOptionsId",
  method: "POST",
  path: "/v1/billing/feedback_options/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingFeedbackOptionsIdInput,
  output: PostBillingFeedbackOptionsIdOutput,
  error: PostBillingFeedbackOptionsIdError,
};
/**
 * The PostBillingFeedbackOptionsIdDeactivateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingFeedbackOptionsIdDeactivateOperation: StripeOperation & {
  readonly input: typeof PostBillingFeedbackOptionsIdDeactivateInput;
  readonly output: typeof PostBillingFeedbackOptionsIdDeactivateOutput;
  readonly error: typeof PostBillingFeedbackOptionsIdDeactivateError;
} = {
  name: "PostBillingFeedbackOptionsIdDeactivate",
  method: "POST",
  path: "/v1/billing/feedback_options/{id}/deactivate",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingFeedbackOptionsIdDeactivateInput,
  output: PostBillingFeedbackOptionsIdDeactivateOutput,
  error: PostBillingFeedbackOptionsIdDeactivateError,
};
/**
 * The makeBillingFeedbackOptionsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeBillingFeedbackOptionsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetBillingFeedbackOptions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingFeedbackOptions = Effect.fn(
    "billingFeedbackOptions.GetBillingFeedbackOptions",
  )(function* (input: GetBillingFeedbackOptionsInput) {
    const response: GetBillingFeedbackOptionsOutput = yield* client.invoke(
      GetBillingFeedbackOptionsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingFeedbackOptions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingFeedbackOptions = Effect.fn(
    "billingFeedbackOptions.PostBillingFeedbackOptions",
  )(function* (input: PostBillingFeedbackOptionsInput) {
    const response: PostBillingFeedbackOptionsOutput = yield* client.invoke(
      PostBillingFeedbackOptionsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetBillingFeedbackOptionsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingFeedbackOptionsId = Effect.fn(
    "billingFeedbackOptions.GetBillingFeedbackOptionsId",
  )(function* (input: GetBillingFeedbackOptionsIdInput) {
    const response: GetBillingFeedbackOptionsIdOutput = yield* client.invoke(
      GetBillingFeedbackOptionsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingFeedbackOptionsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingFeedbackOptionsId = Effect.fn(
    "billingFeedbackOptions.PostBillingFeedbackOptionsId",
  )(function* (input: PostBillingFeedbackOptionsIdInput) {
    const response: PostBillingFeedbackOptionsIdOutput = yield* client.invoke(
      PostBillingFeedbackOptionsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingFeedbackOptionsIdDeactivate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingFeedbackOptionsIdDeactivate = Effect.fn(
    "billingFeedbackOptions.PostBillingFeedbackOptionsIdDeactivate",
  )(function* (input: PostBillingFeedbackOptionsIdDeactivateInput) {
    const response: PostBillingFeedbackOptionsIdDeactivateOutput =
      yield* client.invoke(
        PostBillingFeedbackOptionsIdDeactivateOperation,
        input,
      );
    return response;
  });
  return {
    GetBillingFeedbackOptions,
    PostBillingFeedbackOptions,
    GetBillingFeedbackOptionsId,
    PostBillingFeedbackOptionsId,
    PostBillingFeedbackOptionsIdDeactivate,
  };
});
