// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_radar_value_list,
  Stripeerror,
  Striperadar_value_list,
} from "./models/common.js";

export type GetRadarValueListsInput = {
  readonly alias?: string;
  readonly contains?: string;
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
  readonly starting_after?: string;
};
export type GetRadarValueListsOutput = {
  readonly data: ReadonlyArray<Striperadar_value_list>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetRadarValueListsError = Stripeerror;
export type PostRadarValueListsInput = {
  readonly alias: string;
  readonly expand?: ReadonlyArray<string>;
  readonly item_type?:
    | "account"
    | "card_bin"
    | "card_fingerprint"
    | "case_sensitive_string"
    | "country"
    | "crypto_fingerprint"
    | "customer_id"
    | "email"
    | "ip_address"
    | "sepa_debit_fingerprint"
    | "string"
    | "us_bank_account_fingerprint";
  readonly metadata?: { readonly [x: string]: string };
  readonly name: string;
};
export type PostRadarValueListsOutput = Striperadar_value_list;
export type PostRadarValueListsError = Stripeerror;
export type GetRadarValueListsValueListInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly value_list: string;
};
export type GetRadarValueListsValueListOutput = Striperadar_value_list;
export type GetRadarValueListsValueListError = Stripeerror;
export type PostRadarValueListsValueListInput = {
  readonly alias?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly name?: string;
  readonly value_list: string;
};
export type PostRadarValueListsValueListOutput = Striperadar_value_list;
export type PostRadarValueListsValueListError = Stripeerror;
export type DeleteRadarValueListsValueListInput = {
  readonly value_list: string;
};
export type DeleteRadarValueListsValueListOutput =
  Stripedeleted_radar_value_list;
export type DeleteRadarValueListsValueListError = Stripeerror;

export const GetRadarValueListsInput = Schema.Struct({
  alias: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  ),
  contains: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
  ),
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetRadarValueListsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Striperadar_value_list),
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
          new globalThis.RegExp("^\\/v1\\/radar\\/value_lists", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/radar\\/value_lists",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "RadarListListList", description: "" });
export const GetRadarValueListsError = Stripeerror;
export const PostRadarValueListsInput = Schema.Struct({
  alias: Schema.String.annotate({
    description: "The name of the value list for use in rules.",
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
  item_type: Schema.optionalKey(
    Schema.Literals([
      "account",
      "card_bin",
      "card_fingerprint",
      "case_sensitive_string",
      "country",
      "crypto_fingerprint",
      "customer_id",
      "email",
      "ip_address",
      "sepa_debit_fingerprint",
      "string",
      "us_bank_account_fingerprint",
    ]).annotate({
      description:
        "Type of the items in the value list. One of `card_fingerprint`, `card_bin`, `crypto_fingerprint`, `email`, `ip_address`, `country`, `string`, `case_sensitive_string`, `customer_id`, `account`, `sepa_debit_fingerprint`, or `us_bank_account_fingerprint`. Use `string` if the item type is unknown or mixed.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  name: Schema.String.annotate({
    description: "The human-readable name of the value list.",
  }).check(
    Schema.isMaxCodePoints(100).annotate({
      expected: "a string with at most 100 code points",
    }),
  ),
});
export const PostRadarValueListsOutput = Striperadar_value_list;
export const PostRadarValueListsError = Stripeerror;
export const GetRadarValueListsValueListInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  value_list: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetRadarValueListsValueListOutput = Striperadar_value_list;
export const GetRadarValueListsValueListError = Stripeerror;
export const PostRadarValueListsValueListInput = Schema.Struct({
  alias: Schema.optionalKey(
    Schema.String.annotate({
      description: "The name of the value list for use in rules.",
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
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  name: Schema.optionalKey(
    Schema.String.annotate({
      description: "The human-readable name of the value list.",
    }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  ),
  value_list: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostRadarValueListsValueListOutput = Striperadar_value_list;
export const PostRadarValueListsValueListError = Stripeerror;
export const DeleteRadarValueListsValueListInput = Schema.Struct({
  value_list: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteRadarValueListsValueListOutput =
  Stripedeleted_radar_value_list;
export const DeleteRadarValueListsValueListError = Stripeerror;
/**
 * The GetRadarValueListsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetRadarValueListsOperation: StripeOperation & {
  readonly input: typeof GetRadarValueListsInput;
  readonly output: typeof GetRadarValueListsOutput;
  readonly error: typeof GetRadarValueListsError;
} = {
  name: "GetRadarValueLists",
  method: "GET",
  path: "/v1/radar/value_lists",
  pathParameters: [],
  queryParameters: [
    "alias",
    "contains",
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetRadarValueListsInput,
  output: GetRadarValueListsOutput,
  error: GetRadarValueListsError,
};
/**
 * The PostRadarValueListsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostRadarValueListsOperation: StripeOperation & {
  readonly input: typeof PostRadarValueListsInput;
  readonly output: typeof PostRadarValueListsOutput;
  readonly error: typeof PostRadarValueListsError;
} = {
  name: "PostRadarValueLists",
  method: "POST",
  path: "/v1/radar/value_lists",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostRadarValueListsInput,
  output: PostRadarValueListsOutput,
  error: PostRadarValueListsError,
};
/**
 * The GetRadarValueListsValueListOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetRadarValueListsValueListOperation: StripeOperation & {
  readonly input: typeof GetRadarValueListsValueListInput;
  readonly output: typeof GetRadarValueListsValueListOutput;
  readonly error: typeof GetRadarValueListsValueListError;
} = {
  name: "GetRadarValueListsValueList",
  method: "GET",
  path: "/v1/radar/value_lists/{value_list}",
  pathParameters: ["value_list"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetRadarValueListsValueListInput,
  output: GetRadarValueListsValueListOutput,
  error: GetRadarValueListsValueListError,
};
/**
 * The PostRadarValueListsValueListOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostRadarValueListsValueListOperation: StripeOperation & {
  readonly input: typeof PostRadarValueListsValueListInput;
  readonly output: typeof PostRadarValueListsValueListOutput;
  readonly error: typeof PostRadarValueListsValueListError;
} = {
  name: "PostRadarValueListsValueList",
  method: "POST",
  path: "/v1/radar/value_lists/{value_list}",
  pathParameters: ["value_list"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostRadarValueListsValueListInput,
  output: PostRadarValueListsValueListOutput,
  error: PostRadarValueListsValueListError,
};
/**
 * The DeleteRadarValueListsValueListOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteRadarValueListsValueListOperation: StripeOperation & {
  readonly input: typeof DeleteRadarValueListsValueListInput;
  readonly output: typeof DeleteRadarValueListsValueListOutput;
  readonly error: typeof DeleteRadarValueListsValueListError;
} = {
  name: "DeleteRadarValueListsValueList",
  method: "DELETE",
  path: "/v1/radar/value_lists/{value_list}",
  pathParameters: ["value_list"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteRadarValueListsValueListInput,
  output: DeleteRadarValueListsValueListOutput,
  error: DeleteRadarValueListsValueListError,
};
/**
 * The makeRadarValueListsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeRadarValueListsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetRadarValueLists function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetRadarValueLists = Effect.fn("radarValueLists.GetRadarValueLists")(
    function* (input: GetRadarValueListsInput) {
      const response: GetRadarValueListsOutput = yield* client.invoke(
        GetRadarValueListsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostRadarValueLists function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostRadarValueLists = Effect.fn("radarValueLists.PostRadarValueLists")(
    function* (input: PostRadarValueListsInput) {
      const response: PostRadarValueListsOutput = yield* client.invoke(
        PostRadarValueListsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetRadarValueListsValueList function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetRadarValueListsValueList = Effect.fn(
    "radarValueLists.GetRadarValueListsValueList",
  )(function* (input: GetRadarValueListsValueListInput) {
    const response: GetRadarValueListsValueListOutput = yield* client.invoke(
      GetRadarValueListsValueListOperation,
      input,
    );
    return response;
  });
  /**
   * The PostRadarValueListsValueList function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostRadarValueListsValueList = Effect.fn(
    "radarValueLists.PostRadarValueListsValueList",
  )(function* (input: PostRadarValueListsValueListInput) {
    const response: PostRadarValueListsValueListOutput = yield* client.invoke(
      PostRadarValueListsValueListOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteRadarValueListsValueList function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteRadarValueListsValueList = Effect.fn(
    "radarValueLists.DeleteRadarValueListsValueList",
  )(function* (input: DeleteRadarValueListsValueListInput) {
    const response: DeleteRadarValueListsValueListOutput = yield* client.invoke(
      DeleteRadarValueListsValueListOperation,
      input,
    );
    return response;
  });
  return {
    GetRadarValueLists,
    PostRadarValueLists,
    GetRadarValueListsValueList,
    PostRadarValueListsValueList,
    DeleteRadarValueListsValueList,
  };
});
