// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_radar_value_list_item,
  Stripeerror,
  Striperadar_value_list_item,
} from "./models/common.js";

export type GetRadarValueListItemsInput = {
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
  readonly value?: string;
  readonly value_list: string;
};
export type GetRadarValueListItemsOutput = {
  readonly data: ReadonlyArray<Striperadar_value_list_item>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetRadarValueListItemsError = Stripeerror;
export type PostRadarValueListItemsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly value: string;
  readonly value_list: string;
};
export type PostRadarValueListItemsOutput = Striperadar_value_list_item;
export type PostRadarValueListItemsError = Stripeerror;
export type GetRadarValueListItemsItemInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly item: string;
};
export type GetRadarValueListItemsItemOutput = Striperadar_value_list_item;
export type GetRadarValueListItemsItemError = Stripeerror;
export type DeleteRadarValueListItemsItemInput = { readonly item: string };
export type DeleteRadarValueListItemsItemOutput =
  Stripedeleted_radar_value_list_item;
export type DeleteRadarValueListItemsItemError = Stripeerror;

export const GetRadarValueListItemsInput = Schema.Struct({
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
  value: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
  ),
  value_list: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetRadarValueListItemsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Striperadar_value_list_item),
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
          new globalThis.RegExp("^\\/v1\\/radar\\/value_list_items", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/radar\\/value_list_items",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "RadarListListItemList", description: "" });
export const GetRadarValueListItemsError = Stripeerror;
export const PostRadarValueListItemsInput = Schema.Struct({
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
  value: Schema.String.annotate({
    description:
      "The value of the item (whose type must match the type of the parent value list).",
  }).check(
    Schema.isMaxCodePoints(800).annotate({
      expected: "a string with at most 800 code points",
    }),
  ),
  value_list: Schema.String.annotate({
    description:
      "The identifier of the value list which the created item will be added to.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostRadarValueListItemsOutput = Striperadar_value_list_item;
export const PostRadarValueListItemsError = Stripeerror;
export const GetRadarValueListItemsItemInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  item: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetRadarValueListItemsItemOutput = Striperadar_value_list_item;
export const GetRadarValueListItemsItemError = Stripeerror;
export const DeleteRadarValueListItemsItemInput = Schema.Struct({
  item: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteRadarValueListItemsItemOutput =
  Stripedeleted_radar_value_list_item;
export const DeleteRadarValueListItemsItemError = Stripeerror;
/**
 * The GetRadarValueListItemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetRadarValueListItemsOperation: StripeOperation & {
  readonly input: typeof GetRadarValueListItemsInput;
  readonly output: typeof GetRadarValueListItemsOutput;
  readonly error: typeof GetRadarValueListItemsError;
} = {
  name: "GetRadarValueListItems",
  method: "GET",
  path: "/v1/radar/value_list_items",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "value",
    "value_list",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetRadarValueListItemsInput,
  output: GetRadarValueListItemsOutput,
  error: GetRadarValueListItemsError,
};
/**
 * The PostRadarValueListItemsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostRadarValueListItemsOperation: StripeOperation & {
  readonly input: typeof PostRadarValueListItemsInput;
  readonly output: typeof PostRadarValueListItemsOutput;
  readonly error: typeof PostRadarValueListItemsError;
} = {
  name: "PostRadarValueListItems",
  method: "POST",
  path: "/v1/radar/value_list_items",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostRadarValueListItemsInput,
  output: PostRadarValueListItemsOutput,
  error: PostRadarValueListItemsError,
};
/**
 * The GetRadarValueListItemsItemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetRadarValueListItemsItemOperation: StripeOperation & {
  readonly input: typeof GetRadarValueListItemsItemInput;
  readonly output: typeof GetRadarValueListItemsItemOutput;
  readonly error: typeof GetRadarValueListItemsItemError;
} = {
  name: "GetRadarValueListItemsItem",
  method: "GET",
  path: "/v1/radar/value_list_items/{item}",
  pathParameters: ["item"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetRadarValueListItemsItemInput,
  output: GetRadarValueListItemsItemOutput,
  error: GetRadarValueListItemsItemError,
};
/**
 * The DeleteRadarValueListItemsItemOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteRadarValueListItemsItemOperation: StripeOperation & {
  readonly input: typeof DeleteRadarValueListItemsItemInput;
  readonly output: typeof DeleteRadarValueListItemsItemOutput;
  readonly error: typeof DeleteRadarValueListItemsItemError;
} = {
  name: "DeleteRadarValueListItemsItem",
  method: "DELETE",
  path: "/v1/radar/value_list_items/{item}",
  pathParameters: ["item"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteRadarValueListItemsItemInput,
  output: DeleteRadarValueListItemsItemOutput,
  error: DeleteRadarValueListItemsItemError,
};
/**
 * The makeRadarValueListItemsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeRadarValueListItemsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetRadarValueListItems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetRadarValueListItems = Effect.fn(
    "radarValueListItems.GetRadarValueListItems",
  )(function* (input: GetRadarValueListItemsInput) {
    const response: GetRadarValueListItemsOutput = yield* client.invoke(
      GetRadarValueListItemsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostRadarValueListItems function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostRadarValueListItems = Effect.fn(
    "radarValueListItems.PostRadarValueListItems",
  )(function* (input: PostRadarValueListItemsInput) {
    const response: PostRadarValueListItemsOutput = yield* client.invoke(
      PostRadarValueListItemsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetRadarValueListItemsItem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetRadarValueListItemsItem = Effect.fn(
    "radarValueListItems.GetRadarValueListItemsItem",
  )(function* (input: GetRadarValueListItemsItemInput) {
    const response: GetRadarValueListItemsItemOutput = yield* client.invoke(
      GetRadarValueListItemsItemOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteRadarValueListItemsItem function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteRadarValueListItemsItem = Effect.fn(
    "radarValueListItems.DeleteRadarValueListItemsItem",
  )(function* (input: DeleteRadarValueListItemsItemInput) {
    const response: DeleteRadarValueListItemsItemOutput = yield* client.invoke(
      DeleteRadarValueListItemsItemOperation,
      input,
    );
    return response;
  });
  return {
    GetRadarValueListItems,
    PostRadarValueListItems,
    GetRadarValueListItemsItem,
    DeleteRadarValueListItemsItem,
  };
});
