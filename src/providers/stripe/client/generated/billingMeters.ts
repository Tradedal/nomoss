// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripebilling_meter,
  Stripebilling_meter_event_summary,
} from "./models/billing.js";
import { Stripeerror } from "./models/common.js";

export type GetBillingMetersInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: "active" | "inactive";
};
export type GetBillingMetersOutput = {
  readonly data: ReadonlyArray<Stripebilling_meter>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetBillingMetersError = Stripeerror;
export type PostBillingMetersInput = {
  readonly customer_mapping?: {
    readonly event_payload_key: string;
    readonly type: "by_id";
  } & { readonly [x: string]: Schema.Json };
  readonly default_aggregation: {
    readonly formula: "count" | "last" | "sum";
  } & { readonly [x: string]: Schema.Json };
  readonly display_name: string;
  readonly event_name: string;
  readonly event_time_window?: "day" | "hour";
  readonly expand?: ReadonlyArray<string>;
  readonly value_settings?: { readonly event_payload_key: string } & {
    readonly [x: string]: Schema.Json;
  };
};
export type PostBillingMetersOutput = Stripebilling_meter;
export type PostBillingMetersError = Stripeerror;
export type GetBillingMetersIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetBillingMetersIdOutput = Stripebilling_meter;
export type GetBillingMetersIdError = Stripeerror;
export type PostBillingMetersIdInput = {
  readonly display_name?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingMetersIdOutput = Stripebilling_meter;
export type PostBillingMetersIdError = Stripeerror;
export type PostBillingMetersIdDeactivateInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingMetersIdDeactivateOutput = Stripebilling_meter;
export type PostBillingMetersIdDeactivateError = Stripeerror;
export type GetBillingMetersIdEventSummariesInput = {
  readonly customer: string;
  readonly end_time: number;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
  readonly limit?: number;
  readonly start_time: number;
  readonly starting_after?: string;
  readonly value_grouping_window?: "day" | "hour";
};
export type GetBillingMetersIdEventSummariesOutput = {
  readonly data: ReadonlyArray<Stripebilling_meter_event_summary>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetBillingMetersIdEventSummariesError = Stripeerror;
export type PostBillingMetersIdReactivateInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostBillingMetersIdReactivateOutput = Stripebilling_meter;
export type PostBillingMetersIdReactivateError = Stripeerror;

export const GetBillingMetersInput = Schema.Struct({
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
export const GetBillingMetersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripebilling_meter),
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
          new globalThis.RegExp("^\\/v1\\/billing\\/meters", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/billing\\/meters",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "BillingMeterResourceBillingMeterList", description: "" });
export const GetBillingMetersError = Stripeerror;
export const PostBillingMetersInput = Schema.Struct({
  customer_mapping: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        event_payload_key: Schema.String.check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        ),
        type: Schema.Literal("by_id"),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "customer_mapping_param",
      description:
        "Fields that specify how to map a meter event to a customer.",
    }),
  ),
  default_aggregation: Schema.StructWithRest(
    Schema.Struct({ formula: Schema.Literals(["count", "last", "sum"]) }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "aggregation_settings_param",
    description: "The default settings to aggregate a meter's events with.",
  }),
  display_name: Schema.String.annotate({
    description: "The meter’s name. Not visible to the customer.",
  }).check(
    Schema.isMaxCodePoints(250).annotate({
      expected: "a string with at most 250 code points",
    }),
  ),
  event_name: Schema.String.annotate({
    description:
      "The name of the meter event to record usage for. Corresponds with the `event_name` field on meter events.",
  }).check(
    Schema.isMaxCodePoints(100).annotate({
      expected: "a string with at most 100 code points",
    }),
  ),
  event_time_window: Schema.optionalKey(
    Schema.Literals(["day", "hour"]).annotate({
      description:
        "The time window which meter events have been pre-aggregated for, if any.",
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
  value_settings: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        event_payload_key: Schema.String.check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
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
      title: "meter_value_settings_param",
      description:
        "Fields that specify how to calculate a meter event's value.",
    }),
  ),
});
export const PostBillingMetersOutput = Stripebilling_meter;
export const PostBillingMetersError = Stripeerror;
export const GetBillingMetersIdInput = Schema.Struct({
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
export const GetBillingMetersIdOutput = Stripebilling_meter;
export const GetBillingMetersIdError = Stripeerror;
export const PostBillingMetersIdInput = Schema.Struct({
  display_name: Schema.optionalKey(
    Schema.String.annotate({
      description: "The meter’s name. Not visible to the customer.",
    }).check(
      Schema.isMaxCodePoints(250).annotate({
        expected: "a string with at most 250 code points",
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
export const PostBillingMetersIdOutput = Stripebilling_meter;
export const PostBillingMetersIdError = Stripeerror;
export const PostBillingMetersIdDeactivateInput = Schema.Struct({
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
export const PostBillingMetersIdDeactivateOutput = Stripebilling_meter;
export const PostBillingMetersIdDeactivateError = Stripeerror;
export const GetBillingMetersIdEventSummariesInput = Schema.Struct({
  customer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  end_time: Schema.Number.annotate({ format: "unix-time" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  limit: Schema.optionalKey(Schema.Int),
  start_time: Schema.Number.annotate({ format: "unix-time" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  value_grouping_window: Schema.optionalKey(Schema.Literals(["day", "hour"])),
});
export const GetBillingMetersIdEventSummariesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripebilling_meter_event_summary),
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
            "^\\/v1\\/billing\\/meters\\/[^/]+\\/event_summaries",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/billing\\/meters\\/[^/]+\\/event_summaries",
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
  title: "BillingMeterResourceBillingMeterEventSummaryList",
  description: "",
});
export const GetBillingMetersIdEventSummariesError = Stripeerror;
export const PostBillingMetersIdReactivateInput = Schema.Struct({
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
export const PostBillingMetersIdReactivateOutput = Stripebilling_meter;
export const PostBillingMetersIdReactivateError = Stripeerror;
/**
 * The GetBillingMetersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingMetersOperation: StripeOperation & {
  readonly input: typeof GetBillingMetersInput;
  readonly output: typeof GetBillingMetersOutput;
  readonly error: typeof GetBillingMetersError;
} = {
  name: "GetBillingMeters",
  method: "GET",
  path: "/v1/billing/meters",
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
  input: GetBillingMetersInput,
  output: GetBillingMetersOutput,
  error: GetBillingMetersError,
};
/**
 * The PostBillingMetersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingMetersOperation: StripeOperation & {
  readonly input: typeof PostBillingMetersInput;
  readonly output: typeof PostBillingMetersOutput;
  readonly error: typeof PostBillingMetersError;
} = {
  name: "PostBillingMeters",
  method: "POST",
  path: "/v1/billing/meters",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingMetersInput,
  output: PostBillingMetersOutput,
  error: PostBillingMetersError,
};
/**
 * The GetBillingMetersIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingMetersIdOperation: StripeOperation & {
  readonly input: typeof GetBillingMetersIdInput;
  readonly output: typeof GetBillingMetersIdOutput;
  readonly error: typeof GetBillingMetersIdError;
} = {
  name: "GetBillingMetersId",
  method: "GET",
  path: "/v1/billing/meters/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingMetersIdInput,
  output: GetBillingMetersIdOutput,
  error: GetBillingMetersIdError,
};
/**
 * The PostBillingMetersIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingMetersIdOperation: StripeOperation & {
  readonly input: typeof PostBillingMetersIdInput;
  readonly output: typeof PostBillingMetersIdOutput;
  readonly error: typeof PostBillingMetersIdError;
} = {
  name: "PostBillingMetersId",
  method: "POST",
  path: "/v1/billing/meters/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingMetersIdInput,
  output: PostBillingMetersIdOutput,
  error: PostBillingMetersIdError,
};
/**
 * The PostBillingMetersIdDeactivateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingMetersIdDeactivateOperation: StripeOperation & {
  readonly input: typeof PostBillingMetersIdDeactivateInput;
  readonly output: typeof PostBillingMetersIdDeactivateOutput;
  readonly error: typeof PostBillingMetersIdDeactivateError;
} = {
  name: "PostBillingMetersIdDeactivate",
  method: "POST",
  path: "/v1/billing/meters/{id}/deactivate",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingMetersIdDeactivateInput,
  output: PostBillingMetersIdDeactivateOutput,
  error: PostBillingMetersIdDeactivateError,
};
/**
 * The GetBillingMetersIdEventSummariesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetBillingMetersIdEventSummariesOperation: StripeOperation & {
  readonly input: typeof GetBillingMetersIdEventSummariesInput;
  readonly output: typeof GetBillingMetersIdEventSummariesOutput;
  readonly error: typeof GetBillingMetersIdEventSummariesError;
} = {
  name: "GetBillingMetersIdEventSummaries",
  method: "GET",
  path: "/v1/billing/meters/{id}/event_summaries",
  pathParameters: ["id"],
  queryParameters: [
    "customer",
    "end_time",
    "ending_before",
    "expand",
    "limit",
    "start_time",
    "starting_after",
    "value_grouping_window",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetBillingMetersIdEventSummariesInput,
  output: GetBillingMetersIdEventSummariesOutput,
  error: GetBillingMetersIdEventSummariesError,
};
/**
 * The PostBillingMetersIdReactivateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostBillingMetersIdReactivateOperation: StripeOperation & {
  readonly input: typeof PostBillingMetersIdReactivateInput;
  readonly output: typeof PostBillingMetersIdReactivateOutput;
  readonly error: typeof PostBillingMetersIdReactivateError;
} = {
  name: "PostBillingMetersIdReactivate",
  method: "POST",
  path: "/v1/billing/meters/{id}/reactivate",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostBillingMetersIdReactivateInput,
  output: PostBillingMetersIdReactivateOutput,
  error: PostBillingMetersIdReactivateError,
};
/**
 * The makeBillingMetersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeBillingMetersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetBillingMeters function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingMeters = Effect.fn("billingMeters.GetBillingMeters")(
    function* (input: GetBillingMetersInput) {
      const response: GetBillingMetersOutput = yield* client.invoke(
        GetBillingMetersOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostBillingMeters function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingMeters = Effect.fn("billingMeters.PostBillingMeters")(
    function* (input: PostBillingMetersInput) {
      const response: PostBillingMetersOutput = yield* client.invoke(
        PostBillingMetersOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetBillingMetersId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingMetersId = Effect.fn("billingMeters.GetBillingMetersId")(
    function* (input: GetBillingMetersIdInput) {
      const response: GetBillingMetersIdOutput = yield* client.invoke(
        GetBillingMetersIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostBillingMetersId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingMetersId = Effect.fn("billingMeters.PostBillingMetersId")(
    function* (input: PostBillingMetersIdInput) {
      const response: PostBillingMetersIdOutput = yield* client.invoke(
        PostBillingMetersIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostBillingMetersIdDeactivate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingMetersIdDeactivate = Effect.fn(
    "billingMeters.PostBillingMetersIdDeactivate",
  )(function* (input: PostBillingMetersIdDeactivateInput) {
    const response: PostBillingMetersIdDeactivateOutput = yield* client.invoke(
      PostBillingMetersIdDeactivateOperation,
      input,
    );
    return response;
  });
  /**
   * The GetBillingMetersIdEventSummaries function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetBillingMetersIdEventSummaries = Effect.fn(
    "billingMeters.GetBillingMetersIdEventSummaries",
  )(function* (input: GetBillingMetersIdEventSummariesInput) {
    const response: GetBillingMetersIdEventSummariesOutput =
      yield* client.invoke(GetBillingMetersIdEventSummariesOperation, input);
    return response;
  });
  /**
   * The PostBillingMetersIdReactivate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostBillingMetersIdReactivate = Effect.fn(
    "billingMeters.PostBillingMetersIdReactivate",
  )(function* (input: PostBillingMetersIdReactivateInput) {
    const response: PostBillingMetersIdReactivateOutput = yield* client.invoke(
      PostBillingMetersIdReactivateOperation,
      input,
    );
    return response;
  });
  return {
    GetBillingMeters,
    PostBillingMeters,
    GetBillingMetersId,
    PostBillingMetersId,
    PostBillingMetersIdDeactivate,
    GetBillingMetersIdEventSummaries,
    PostBillingMetersIdReactivate,
  };
});
