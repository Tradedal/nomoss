// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_test_helpers_test_clock,
  Stripeerror,
  Stripetest_helpers_test_clock,
} from "./models/common.js";

export type GetTestHelpersTestClocksInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetTestHelpersTestClocksOutput = {
  readonly data: ReadonlyArray<Stripetest_helpers_test_clock>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTestHelpersTestClocksError = Stripeerror;
export type PostTestHelpersTestClocksInput = {
  readonly customer?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly frozen_time: number;
  readonly name?: string;
};
export type PostTestHelpersTestClocksOutput = Stripetest_helpers_test_clock;
export type PostTestHelpersTestClocksError = Stripeerror;
export type GetTestHelpersTestClocksTestClockInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly test_clock: string;
};
export type GetTestHelpersTestClocksTestClockOutput =
  Stripetest_helpers_test_clock;
export type GetTestHelpersTestClocksTestClockError = Stripeerror;
export type DeleteTestHelpersTestClocksTestClockInput = {
  readonly test_clock: string;
};
export type DeleteTestHelpersTestClocksTestClockOutput =
  Stripedeleted_test_helpers_test_clock;
export type DeleteTestHelpersTestClocksTestClockError = Stripeerror;
export type PostTestHelpersTestClocksTestClockAdvanceInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly frozen_time: number;
  readonly test_clock: string;
};
export type PostTestHelpersTestClocksTestClockAdvanceOutput =
  Stripetest_helpers_test_clock;
export type PostTestHelpersTestClocksTestClockAdvanceError = Stripeerror;

export const GetTestHelpersTestClocksInput = Schema.Struct({
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
export const GetTestHelpersTestClocksOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetest_helpers_test_clock),
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
          new globalThis.RegExp("^\\/v1\\/test_helpers\\/test_clocks", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/test_helpers\\/test_clocks",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "BillingClocksResourceBillingClockList", description: "" });
export const GetTestHelpersTestClocksError = Stripeerror;
export const PostTestHelpersTestClocksInput = Schema.Struct({
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Existing customer this test clock will be attached to. Once attached, customers can't be removed from a test clock.",
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
  frozen_time: Schema.Number.annotate({
    description: "The initial frozen time for this test clock.",
    format: "unix-time",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  name: Schema.optionalKey(
    Schema.String.annotate({
      description: "The name for this test clock.",
    }).check(
      Schema.isMaxCodePoints(300).annotate({
        expected: "a string with at most 300 code points",
      }),
    ),
  ),
});
export const PostTestHelpersTestClocksOutput = Stripetest_helpers_test_clock;
export const PostTestHelpersTestClocksError = Stripeerror;
export const GetTestHelpersTestClocksTestClockInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  test_clock: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTestHelpersTestClocksTestClockOutput =
  Stripetest_helpers_test_clock;
export const GetTestHelpersTestClocksTestClockError = Stripeerror;
export const DeleteTestHelpersTestClocksTestClockInput = Schema.Struct({
  test_clock: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteTestHelpersTestClocksTestClockOutput =
  Stripedeleted_test_helpers_test_clock;
export const DeleteTestHelpersTestClocksTestClockError = Stripeerror;
export const PostTestHelpersTestClocksTestClockAdvanceInput = Schema.Struct({
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
  frozen_time: Schema.Number.annotate({
    description:
      "The time to advance the test clock. Must be after the test clock's current frozen time. Cannot be more than two intervals in the future from the shortest subscription in this test clock. If there are no subscriptions in this test clock, it cannot be more than two years in the future.",
    format: "unix-time",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  test_clock: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTestHelpersTestClocksTestClockAdvanceOutput =
  Stripetest_helpers_test_clock;
export const PostTestHelpersTestClocksTestClockAdvanceError = Stripeerror;
/**
 * The GetTestHelpersTestClocksOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTestHelpersTestClocksOperation: StripeOperation & {
  readonly input: typeof GetTestHelpersTestClocksInput;
  readonly output: typeof GetTestHelpersTestClocksOutput;
  readonly error: typeof GetTestHelpersTestClocksError;
} = {
  name: "GetTestHelpersTestClocks",
  method: "GET",
  path: "/v1/test_helpers/test_clocks",
  pathParameters: [],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTestHelpersTestClocksInput,
  output: GetTestHelpersTestClocksOutput,
  error: GetTestHelpersTestClocksError,
};
/**
 * The PostTestHelpersTestClocksOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTestHelpersTestClocksOperation: StripeOperation & {
  readonly input: typeof PostTestHelpersTestClocksInput;
  readonly output: typeof PostTestHelpersTestClocksOutput;
  readonly error: typeof PostTestHelpersTestClocksError;
} = {
  name: "PostTestHelpersTestClocks",
  method: "POST",
  path: "/v1/test_helpers/test_clocks",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTestHelpersTestClocksInput,
  output: PostTestHelpersTestClocksOutput,
  error: PostTestHelpersTestClocksError,
};
/**
 * The GetTestHelpersTestClocksTestClockOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTestHelpersTestClocksTestClockOperation: StripeOperation & {
  readonly input: typeof GetTestHelpersTestClocksTestClockInput;
  readonly output: typeof GetTestHelpersTestClocksTestClockOutput;
  readonly error: typeof GetTestHelpersTestClocksTestClockError;
} = {
  name: "GetTestHelpersTestClocksTestClock",
  method: "GET",
  path: "/v1/test_helpers/test_clocks/{test_clock}",
  pathParameters: ["test_clock"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTestHelpersTestClocksTestClockInput,
  output: GetTestHelpersTestClocksTestClockOutput,
  error: GetTestHelpersTestClocksTestClockError,
};
/**
 * The DeleteTestHelpersTestClocksTestClockOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteTestHelpersTestClocksTestClockOperation: StripeOperation & {
  readonly input: typeof DeleteTestHelpersTestClocksTestClockInput;
  readonly output: typeof DeleteTestHelpersTestClocksTestClockOutput;
  readonly error: typeof DeleteTestHelpersTestClocksTestClockError;
} = {
  name: "DeleteTestHelpersTestClocksTestClock",
  method: "DELETE",
  path: "/v1/test_helpers/test_clocks/{test_clock}",
  pathParameters: ["test_clock"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteTestHelpersTestClocksTestClockInput,
  output: DeleteTestHelpersTestClocksTestClockOutput,
  error: DeleteTestHelpersTestClocksTestClockError,
};
/**
 * The PostTestHelpersTestClocksTestClockAdvanceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTestHelpersTestClocksTestClockAdvanceOperation: StripeOperation & {
  readonly input: typeof PostTestHelpersTestClocksTestClockAdvanceInput;
  readonly output: typeof PostTestHelpersTestClocksTestClockAdvanceOutput;
  readonly error: typeof PostTestHelpersTestClocksTestClockAdvanceError;
} = {
  name: "PostTestHelpersTestClocksTestClockAdvance",
  method: "POST",
  path: "/v1/test_helpers/test_clocks/{test_clock}/advance",
  pathParameters: ["test_clock"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTestHelpersTestClocksTestClockAdvanceInput,
  output: PostTestHelpersTestClocksTestClockAdvanceOutput,
  error: PostTestHelpersTestClocksTestClockAdvanceError,
};
/**
 * The makeTestHelpersTestClocksClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTestHelpersTestClocksClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTestHelpersTestClocks function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTestHelpersTestClocks = Effect.fn(
    "testHelpersTestClocks.GetTestHelpersTestClocks",
  )(function* (input: GetTestHelpersTestClocksInput) {
    const response: GetTestHelpersTestClocksOutput = yield* client.invoke(
      GetTestHelpersTestClocksOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTestHelpersTestClocks function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTestHelpersTestClocks = Effect.fn(
    "testHelpersTestClocks.PostTestHelpersTestClocks",
  )(function* (input: PostTestHelpersTestClocksInput) {
    const response: PostTestHelpersTestClocksOutput = yield* client.invoke(
      PostTestHelpersTestClocksOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTestHelpersTestClocksTestClock function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTestHelpersTestClocksTestClock = Effect.fn(
    "testHelpersTestClocks.GetTestHelpersTestClocksTestClock",
  )(function* (input: GetTestHelpersTestClocksTestClockInput) {
    const response: GetTestHelpersTestClocksTestClockOutput =
      yield* client.invoke(GetTestHelpersTestClocksTestClockOperation, input);
    return response;
  });
  /**
   * The DeleteTestHelpersTestClocksTestClock function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteTestHelpersTestClocksTestClock = Effect.fn(
    "testHelpersTestClocks.DeleteTestHelpersTestClocksTestClock",
  )(function* (input: DeleteTestHelpersTestClocksTestClockInput) {
    const response: DeleteTestHelpersTestClocksTestClockOutput =
      yield* client.invoke(
        DeleteTestHelpersTestClocksTestClockOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTestHelpersTestClocksTestClockAdvance function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTestHelpersTestClocksTestClockAdvance = Effect.fn(
    "testHelpersTestClocks.PostTestHelpersTestClocksTestClockAdvance",
  )(function* (input: PostTestHelpersTestClocksTestClockAdvanceInput) {
    const response: PostTestHelpersTestClocksTestClockAdvanceOutput =
      yield* client.invoke(
        PostTestHelpersTestClocksTestClockAdvanceOperation,
        input,
      );
    return response;
  });
  return {
    GetTestHelpersTestClocks,
    PostTestHelpersTestClocks,
    GetTestHelpersTestClocksTestClock,
    DeleteTestHelpersTestClocksTestClock,
    PostTestHelpersTestClocksTestClockAdvance,
  };
});
