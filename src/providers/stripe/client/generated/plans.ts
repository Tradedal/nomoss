// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeplan } from "./models/catalog.js";
import { Stripedeleted_plan, Stripeerror } from "./models/common.js";

export type GetPlansInput = {
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
  readonly product?: string;
  readonly starting_after?: string;
};
export type GetPlansOutput = {
  readonly data: ReadonlyArray<Stripeplan>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPlansError = Stripeerror;
export type PostPlansInput = {
  readonly active?: boolean;
  readonly amount?: number;
  readonly amount_decimal?: string;
  readonly billing_scheme?: "per_unit" | "tiered";
  readonly currency: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id?: string;
  readonly interval: "day" | "month" | "week" | "year";
  readonly interval_count?: number;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly meter?: string;
  readonly nickname?: string;
  readonly product?:
    | ({
        readonly active?: boolean;
        readonly id?: string;
        readonly metadata?: { readonly [x: string]: string };
        readonly name: string;
        readonly statement_descriptor?: string;
        readonly tax_code?: string;
        readonly tax_details?: {
          readonly performance_location?: string;
          readonly tax_code?: string | "";
        } & { readonly [x: string]: Schema.Json };
        readonly unit_label?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly tiers?: ReadonlyArray<
    {
      readonly flat_amount?: number;
      readonly flat_amount_decimal?: string;
      readonly unit_amount?: number;
      readonly unit_amount_decimal?: string;
      readonly up_to: "inf" | number;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly tiers_mode?: "graduated" | "volume";
  readonly transform_usage?: {
    readonly divide_by: number;
    readonly round: "down" | "up";
  } & { readonly [x: string]: Schema.Json };
  readonly trial_period_days?: number;
  readonly usage_type?: "licensed" | "metered";
};
export type PostPlansOutput = Stripeplan;
export type PostPlansError = Stripeerror;
export type GetPlansPlanInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly plan: string;
};
export type GetPlansPlanOutput = Stripeplan;
export type GetPlansPlanError = Stripeerror;
export type PostPlansPlanInput = {
  readonly active?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly nickname?: string;
  readonly product?: string;
  readonly trial_period_days?: number;
  readonly plan: string;
};
export type PostPlansPlanOutput = Stripeplan;
export type PostPlansPlanError = Stripeerror;
export type DeletePlansPlanInput = { readonly plan: string };
export type DeletePlansPlanOutput = Stripedeleted_plan;
export type DeletePlansPlanError = Stripeerror;

export const GetPlansInput = Schema.Struct({
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
  product: Schema.optionalKey(
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
export const GetPlansOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeplan).annotate({
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
        Schema.isPattern(new globalThis.RegExp("^\\/v1\\/plans", "u")).annotate(
          { expected: "a string matching the RegExp ^\\/v1\\/plans" },
        ),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "PlanList", description: "" });
export const GetPlansError = Stripeerror;
export const PostPlansInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the plan is currently available for new subscriptions. Defaults to `true`.",
    }),
  ),
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer in cents (or local equivalent) (or 0 for a free plan) representing how much to charge on a recurring basis.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  amount_decimal: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Same as `amount`, but accepts a decimal value with at most 12 decimal places. Only one of `amount` and `amount_decimal` can be set.",
      format: "decimal",
    }),
  ),
  billing_scheme: Schema.optionalKey(
    Schema.Literals(["per_unit", "tiered"]).annotate({
      description:
        "Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `amount`) will be charged per unit in `quantity` (for plans with `usage_type=licensed`), or per unit of total usage (for plans with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.",
    }),
  ),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
    format: "currency",
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
  id: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An identifier randomly generated by Stripe. Used to identify this plan when subscribing a customer. You can optionally override this ID, but the ID must be unique across all plans in your Stripe account. You can use the same plan ID in live mode and in your sandboxes.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  interval: Schema.Literals(["day", "month", "week", "year"]).annotate({
    description:
      "Specifies billing frequency. Either `day`, `week`, `month` or `year`.",
  }),
  interval_count: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of intervals between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. Maximum of three years interval allowed (3 years, 36 months, or 156 weeks).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  meter: Schema.optionalKey(
    Schema.String.annotate({
      description: "The meter tracking the usage of a metered price",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  nickname: Schema.optionalKey(
    Schema.String.annotate({
      description: "A brief description of the plan, hidden from customers.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  product: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          active: Schema.optionalKey(Schema.Boolean),
          id: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          name: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          statement_descriptor: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(22).annotate({
                expected: "a string with at most 22 code points",
              }),
            ),
          ),
          tax_code: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          tax_details: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                performance_location: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                tax_code: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "tax_details" }),
          ),
          unit_label: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(12).annotate({
                expected: "a string with at most 12 code points",
              }),
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
        title: "inline_product_params",
        description:
          "The product whose pricing the created plan will represent. This can either be the ID of an existing product, or a dictionary containing fields used to create a [service product](https://docs.stripe.com/api#product_object-type).",
      }),
      Schema.String.annotate({
        description:
          "The ID of the product whose pricing the created plan will represent.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]),
  ),
  tiers: Schema.optionalKey(
    Schema.Array(
      Schema.StructWithRest(
        Schema.Struct({
          flat_amount: Schema.optionalKey(Schema.Int),
          flat_amount_decimal: Schema.optionalKey(
            Schema.String.annotate({ format: "decimal" }),
          ),
          unit_amount: Schema.optionalKey(Schema.Int),
          unit_amount_decimal: Schema.optionalKey(
            Schema.String.annotate({ format: "decimal" }),
          ),
          up_to: Schema.Union([Schema.Literal("inf"), Schema.Int]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "tier" }),
    ).annotate({
      description:
        "Each element represents a pricing tier. This parameter requires `billing_scheme` to be set to `tiered`. See also the documentation for `billing_scheme`.",
    }),
  ),
  tiers_mode: Schema.optionalKey(
    Schema.Literals(["graduated", "volume"]).annotate({
      description:
        "Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price, in `graduated` tiering pricing can successively change as the quantity grows.",
    }),
  ),
  transform_usage: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        divide_by: Schema.Int,
        round: Schema.Literals(["down", "up"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "transform_usage_param",
      description:
        "Apply a transformation to the reported usage or set quantity before computing the billed price. Cannot be combined with `tiers`.",
    }),
  ),
  trial_period_days: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Default number of trial days when subscribing a customer to this plan using [`trial_from_plan=true`](https://docs.stripe.com/api#create_subscription-trial_from_plan).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  usage_type: Schema.optionalKey(
    Schema.Literals(["licensed", "metered"]).annotate({
      description:
        "Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.",
    }),
  ),
});
export const PostPlansOutput = Stripeplan;
export const PostPlansError = Stripeerror;
export const GetPlansPlanInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  plan: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPlansPlanOutput = Stripeplan;
export const GetPlansPlanError = Stripeerror;
export const PostPlansPlanInput = Schema.Struct({
  active: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the plan is currently available for new subscriptions.",
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
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  nickname: Schema.optionalKey(
    Schema.String.annotate({
      description: "A brief description of the plan, hidden from customers.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  product: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The product the plan belongs to. This cannot be changed once it has been used in a subscription or subscription schedule.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  trial_period_days: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Default number of trial days when subscribing a customer to this plan using [`trial_from_plan=true`](https://docs.stripe.com/api#create_subscription-trial_from_plan).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  plan: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPlansPlanOutput = Stripeplan;
export const PostPlansPlanError = Stripeerror;
export const DeletePlansPlanInput = Schema.Struct({
  plan: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeletePlansPlanOutput = Stripedeleted_plan;
export const DeletePlansPlanError = Stripeerror;
/**
 * The GetPlansOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPlansOperation: StripeOperation & {
  readonly input: typeof GetPlansInput;
  readonly output: typeof GetPlansOutput;
  readonly error: typeof GetPlansError;
} = {
  name: "GetPlans",
  method: "GET",
  path: "/v1/plans",
  pathParameters: [],
  queryParameters: [
    "active",
    "created",
    "ending_before",
    "expand",
    "limit",
    "product",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPlansInput,
  output: GetPlansOutput,
  error: GetPlansError,
};
/**
 * The PostPlansOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPlansOperation: StripeOperation & {
  readonly input: typeof PostPlansInput;
  readonly output: typeof PostPlansOutput;
  readonly error: typeof PostPlansError;
} = {
  name: "PostPlans",
  method: "POST",
  path: "/v1/plans",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPlansInput,
  output: PostPlansOutput,
  error: PostPlansError,
};
/**
 * The GetPlansPlanOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPlansPlanOperation: StripeOperation & {
  readonly input: typeof GetPlansPlanInput;
  readonly output: typeof GetPlansPlanOutput;
  readonly error: typeof GetPlansPlanError;
} = {
  name: "GetPlansPlan",
  method: "GET",
  path: "/v1/plans/{plan}",
  pathParameters: ["plan"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPlansPlanInput,
  output: GetPlansPlanOutput,
  error: GetPlansPlanError,
};
/**
 * The PostPlansPlanOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPlansPlanOperation: StripeOperation & {
  readonly input: typeof PostPlansPlanInput;
  readonly output: typeof PostPlansPlanOutput;
  readonly error: typeof PostPlansPlanError;
} = {
  name: "PostPlansPlan",
  method: "POST",
  path: "/v1/plans/{plan}",
  pathParameters: ["plan"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPlansPlanInput,
  output: PostPlansPlanOutput,
  error: PostPlansPlanError,
};
/**
 * The DeletePlansPlanOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeletePlansPlanOperation: StripeOperation & {
  readonly input: typeof DeletePlansPlanInput;
  readonly output: typeof DeletePlansPlanOutput;
  readonly error: typeof DeletePlansPlanError;
} = {
  name: "DeletePlansPlan",
  method: "DELETE",
  path: "/v1/plans/{plan}",
  pathParameters: ["plan"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeletePlansPlanInput,
  output: DeletePlansPlanOutput,
  error: DeletePlansPlanError,
};
/**
 * The makePlansClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makePlansClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetPlans function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPlans = Effect.fn("plans.GetPlans")(function* (
    input: GetPlansInput,
  ) {
    const response: GetPlansOutput = yield* client.invoke(
      GetPlansOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPlans function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPlans = Effect.fn("plans.PostPlans")(function* (
    input: PostPlansInput,
  ) {
    const response: PostPlansOutput = yield* client.invoke(
      PostPlansOperation,
      input,
    );
    return response;
  });
  /**
   * The GetPlansPlan function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPlansPlan = Effect.fn("plans.GetPlansPlan")(function* (
    input: GetPlansPlanInput,
  ) {
    const response: GetPlansPlanOutput = yield* client.invoke(
      GetPlansPlanOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPlansPlan function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPlansPlan = Effect.fn("plans.PostPlansPlan")(function* (
    input: PostPlansPlanInput,
  ) {
    const response: PostPlansPlanOutput = yield* client.invoke(
      PostPlansPlanOperation,
      input,
    );
    return response;
  });
  /**
   * The DeletePlansPlan function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeletePlansPlan = Effect.fn("plans.DeletePlansPlan")(function* (
    input: DeletePlansPlanInput,
  ) {
    const response: DeletePlansPlanOutput = yield* client.invoke(
      DeletePlansPlanOperation,
      input,
    );
    return response;
  });
  return {
    GetPlans,
    PostPlans,
    GetPlansPlan,
    PostPlansPlan,
    DeletePlansPlan,
  };
});
