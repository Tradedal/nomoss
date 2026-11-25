// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripebilling_alert } from "./models/billing.js";
import { Stripeerror } from "./models/common.js";

export type GetBillingAlertsInput = {
  readonly alert_type?: "usage_threshold";
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly meter?: string;
  readonly starting_after?: string;
};
export type GetBillingAlertsOutput = {
  readonly data: ReadonlyArray<Stripebilling_alert>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetBillingAlertsError = Stripeerror;
export type PostBillingAlertsInput = {
  readonly alert_type: "usage_threshold";
  readonly expand?: ReadonlyArray<string>;
  readonly title: string;
  readonly usage_threshold?: {
    readonly filters?: ReadonlyArray<
      { readonly customer?: string; readonly type: "customer" } & {
        readonly [x: string]: Schema.Json;
      }
    >;
    readonly gte: number;
    readonly meter: string;
    readonly recurrence: "one_time";
  } & { readonly [x: string]: Schema.Json };
};
export type PostBillingAlertsOutput = Stripebilling_alert;
export type PostBillingAlertsError = Stripeerror;
export type GetBillingAlertsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetBillingAlertsIdOutput = Stripebilling_alert;
export type GetBillingAlertsIdError = Stripeerror;
export type PostBillingAlertsIdActivateInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingAlertsIdActivateOutput = Stripebilling_alert;
export type PostBillingAlertsIdActivateError = Stripeerror;
export type PostBillingAlertsIdArchiveInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingAlertsIdArchiveOutput = Stripebilling_alert;
export type PostBillingAlertsIdArchiveError = Stripeerror;
export type PostBillingAlertsIdDeactivateInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingAlertsIdDeactivateOutput = Stripebilling_alert;
export type PostBillingAlertsIdDeactivateError = Stripeerror;

export const GetBillingAlertsInput = Schema.Struct({
  alert_type: Schema.optionalKey(Schema.Literal("usage_threshold")),
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
  meter: Schema.optionalKey(
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
export const GetBillingAlertsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripebilling_alert),
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
          new globalThis.RegExp("^\\/v1\\/billing\\/alerts", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/billing\\/alerts",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "ThresholdsResourceAlertList", description: "" });
export const GetBillingAlertsError = Stripeerror;
export const PostBillingAlertsInput = Schema.Struct({
  alert_type: Schema.Literal("usage_threshold").annotate({
    description: "The type of alert to create.",
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
  title: Schema.String.annotate({
    description: "The title of the alert.",
  }).check(
    Schema.isMaxCodePoints(256).annotate({
      expected: "a string with at most 256 code points",
    }),
  ),
  usage_threshold: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        filters: Schema.optionalKey(
          Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                customer: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                type: Schema.Literal("customer"),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "usage_alert_filter" }),
          ),
        ),
        gte: Schema.Int,
        meter: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        recurrence: Schema.Literal("one_time"),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "usage_threshold_config",
      description: "The configuration of the usage threshold.",
    }),
  ),
});
export const PostBillingAlertsOutput = Stripebilling_alert;
export const PostBillingAlertsError = Stripeerror;
export const GetBillingAlertsIdInput = Schema.Struct({
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
export const GetBillingAlertsIdOutput = Stripebilling_alert;
export const GetBillingAlertsIdError = Stripeerror;
export const PostBillingAlertsIdActivateInput = Schema.Struct({
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
export const PostBillingAlertsIdActivateOutput = Stripebilling_alert;
export const PostBillingAlertsIdActivateError = Stripeerror;
export const PostBillingAlertsIdArchiveInput = Schema.Struct({
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
export const PostBillingAlertsIdArchiveOutput = Stripebilling_alert;
export const PostBillingAlertsIdArchiveError = Stripeerror;
export const PostBillingAlertsIdDeactivateInput = Schema.Struct({
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
export const PostBillingAlertsIdDeactivateOutput = Stripebilling_alert;
export const PostBillingAlertsIdDeactivateError = Stripeerror;
/**
 * The GetBillingAlertsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingAlertsOperation: StripeOperation & {
  readonly input: typeof GetBillingAlertsInput;
  readonly output: typeof GetBillingAlertsOutput;
  readonly error: typeof GetBillingAlertsError;
} = {
  name: "GetBillingAlerts",
  method: "GET",
  path: "/v1/billing/alerts",
  pathParameters: [],
  queryParameters: [
    "alert_type",
    "ending_before",
    "expand",
    "limit",
    "meter",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingAlertsInput,
  output: GetBillingAlertsOutput,
  error: GetBillingAlertsError,
};
/**
 * The PostBillingAlertsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingAlertsOperation: StripeOperation & {
  readonly input: typeof PostBillingAlertsInput;
  readonly output: typeof PostBillingAlertsOutput;
  readonly error: typeof PostBillingAlertsError;
} = {
  name: "PostBillingAlerts",
  method: "POST",
  path: "/v1/billing/alerts",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingAlertsInput,
  output: PostBillingAlertsOutput,
  error: PostBillingAlertsError,
};
/**
 * The GetBillingAlertsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingAlertsIdOperation: StripeOperation & {
  readonly input: typeof GetBillingAlertsIdInput;
  readonly output: typeof GetBillingAlertsIdOutput;
  readonly error: typeof GetBillingAlertsIdError;
} = {
  name: "GetBillingAlertsId",
  method: "GET",
  path: "/v1/billing/alerts/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingAlertsIdInput,
  output: GetBillingAlertsIdOutput,
  error: GetBillingAlertsIdError,
};
/**
 * The PostBillingAlertsIdActivateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingAlertsIdActivateOperation: StripeOperation & {
  readonly input: typeof PostBillingAlertsIdActivateInput;
  readonly output: typeof PostBillingAlertsIdActivateOutput;
  readonly error: typeof PostBillingAlertsIdActivateError;
} = {
  name: "PostBillingAlertsIdActivate",
  method: "POST",
  path: "/v1/billing/alerts/{id}/activate",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingAlertsIdActivateInput,
  output: PostBillingAlertsIdActivateOutput,
  error: PostBillingAlertsIdActivateError,
};
/**
 * The PostBillingAlertsIdArchiveOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingAlertsIdArchiveOperation: StripeOperation & {
  readonly input: typeof PostBillingAlertsIdArchiveInput;
  readonly output: typeof PostBillingAlertsIdArchiveOutput;
  readonly error: typeof PostBillingAlertsIdArchiveError;
} = {
  name: "PostBillingAlertsIdArchive",
  method: "POST",
  path: "/v1/billing/alerts/{id}/archive",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingAlertsIdArchiveInput,
  output: PostBillingAlertsIdArchiveOutput,
  error: PostBillingAlertsIdArchiveError,
};
/**
 * The PostBillingAlertsIdDeactivateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingAlertsIdDeactivateOperation: StripeOperation & {
  readonly input: typeof PostBillingAlertsIdDeactivateInput;
  readonly output: typeof PostBillingAlertsIdDeactivateOutput;
  readonly error: typeof PostBillingAlertsIdDeactivateError;
} = {
  name: "PostBillingAlertsIdDeactivate",
  method: "POST",
  path: "/v1/billing/alerts/{id}/deactivate",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingAlertsIdDeactivateInput,
  output: PostBillingAlertsIdDeactivateOutput,
  error: PostBillingAlertsIdDeactivateError,
};
/**
 * The makeBillingAlertsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeBillingAlertsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetBillingAlerts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingAlerts = Effect.fn("billingAlerts.GetBillingAlerts")(
    function* (input: GetBillingAlertsInput) {
      const response: GetBillingAlertsOutput = yield* client.invoke(
        GetBillingAlertsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostBillingAlerts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingAlerts = Effect.fn("billingAlerts.PostBillingAlerts")(
    function* (input: PostBillingAlertsInput) {
      const response: PostBillingAlertsOutput = yield* client.invoke(
        PostBillingAlertsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetBillingAlertsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingAlertsId = Effect.fn("billingAlerts.GetBillingAlertsId")(
    function* (input: GetBillingAlertsIdInput) {
      const response: GetBillingAlertsIdOutput = yield* client.invoke(
        GetBillingAlertsIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostBillingAlertsIdActivate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingAlertsIdActivate = Effect.fn(
    "billingAlerts.PostBillingAlertsIdActivate",
  )(function* (input: PostBillingAlertsIdActivateInput) {
    const response: PostBillingAlertsIdActivateOutput = yield* client.invoke(
      PostBillingAlertsIdActivateOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingAlertsIdArchive function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingAlertsIdArchive = Effect.fn(
    "billingAlerts.PostBillingAlertsIdArchive",
  )(function* (input: PostBillingAlertsIdArchiveInput) {
    const response: PostBillingAlertsIdArchiveOutput = yield* client.invoke(
      PostBillingAlertsIdArchiveOperation,
      input,
    );
    return response;
  });
  /**
   * The PostBillingAlertsIdDeactivate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingAlertsIdDeactivate = Effect.fn(
    "billingAlerts.PostBillingAlertsIdDeactivate",
  )(function* (input: PostBillingAlertsIdDeactivateInput) {
    const response: PostBillingAlertsIdDeactivateOutput = yield* client.invoke(
      PostBillingAlertsIdDeactivateOperation,
      input,
    );
    return response;
  });
  return {
    GetBillingAlerts,
    PostBillingAlerts,
    GetBillingAlertsId,
    PostBillingAlertsIdActivate,
    PostBillingAlertsIdArchive,
    PostBillingAlertsIdDeactivate,
  };
});
