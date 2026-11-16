// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_commerce_product_catalog_import } from "./models/common.js";
import {
  Stripev2_error,
  Stripev2_error_not_found,
  Stripev2_error_resource_missing,
} from "./models/v2Errors.js";

export type GetV2CommerceProductCatalogImportsInput = {
  readonly created?: string;
  readonly created_gt?: string;
  readonly created_gte?: string;
  readonly created_lt?: string;
  readonly created_lte?: string;
  readonly feed_type?: "inventory" | "pricing" | "product" | "promotion";
  readonly limit?: number;
  readonly page?: string;
  readonly status?:
    | "awaiting_upload"
    | "failed"
    | "processing"
    | "succeeded"
    | "succeeded_with_errors";
};
export type GetV2CommerceProductCatalogImportsOutput = {
  readonly data: ReadonlyArray<Stripev2_commerce_product_catalog_import>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2CommerceProductCatalogImportsError = Stripev2_error;
export type PostV2CommerceProductCatalogImportsInput = {
  readonly feed_type: "inventory" | "pricing" | "product" | "promotion";
  readonly metadata: { readonly [x: string]: string };
  readonly mode: "replace" | "upsert";
};
export type PostV2CommerceProductCatalogImportsOutput =
  Stripev2_commerce_product_catalog_import;
export type PostV2CommerceProductCatalogImportsError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type GetV2CommerceProductCatalogImportsIdInput = { readonly id: string };
export type GetV2CommerceProductCatalogImportsIdOutput =
  Stripev2_commerce_product_catalog_import;
export type GetV2CommerceProductCatalogImportsIdError =
  | Stripev2_error_resource_missing
  | Stripev2_error;

export const GetV2CommerceProductCatalogImportsInput = Schema.Struct({
  created: Schema.optionalKey(Schema.String.annotate({ format: "date-time" })),
  created_gt: Schema.optionalKey(
    Schema.String.annotate({ format: "date-time" }),
  ),
  created_gte: Schema.optionalKey(
    Schema.String.annotate({ format: "date-time" }),
  ),
  created_lt: Schema.optionalKey(
    Schema.String.annotate({ format: "date-time" }),
  ),
  created_lte: Schema.optionalKey(
    Schema.String.annotate({ format: "date-time" }),
  ),
  feed_type: Schema.optionalKey(
    Schema.Literals(["inventory", "pricing", "product", "promotion"]),
  ),
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
  status: Schema.optionalKey(
    Schema.Literals([
      "awaiting_upload",
      "failed",
      "processing",
      "succeeded",
      "succeeded_with_errors",
    ]),
  ),
});
export const GetV2CommerceProductCatalogImportsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_commerce_product_catalog_import).annotate({
      description: "List of ProductCatalogImport objects.",
    }),
    next_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the next page of the list. If there are no more pages, the value is null.",
      }),
      Schema.Null,
    ]),
    previous_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the previous page of the list. If there are no previous pages, the value is null.",
      }),
      Schema.Null,
    ]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);
export const GetV2CommerceProductCatalogImportsError = Schema.Union(
  [Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CommerceProductCatalogImportsInput = Schema.Struct({
  feed_type: Schema.Literals([
    "inventory",
    "pricing",
    "product",
    "promotion",
  ]).annotate({ description: "The type of catalog data to import." }),
  metadata: Schema.Record(Schema.String, Schema.String).annotate({
    description:
      "Additional information about the import in a structured format.",
  }),
  mode: Schema.Literals(["replace", "upsert"]).annotate({
    description:
      "The strategy for handling existing catalog data during import.",
  }),
});
export const PostV2CommerceProductCatalogImportsOutput =
  Stripev2_commerce_product_catalog_import;
export const PostV2CommerceProductCatalogImportsError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const GetV2CommerceProductCatalogImportsIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2CommerceProductCatalogImportsIdOutput =
  Stripev2_commerce_product_catalog_import;
export const GetV2CommerceProductCatalogImportsIdError = Schema.Union(
  [Stripev2_error_resource_missing, Stripev2_error],
  { mode: "oneOf" },
);
/**
 * The GetV2CommerceProductCatalogImportsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CommerceProductCatalogImportsOperation: StripeOperation & {
  readonly input: typeof GetV2CommerceProductCatalogImportsInput;
  readonly output: typeof GetV2CommerceProductCatalogImportsOutput;
  readonly error: typeof GetV2CommerceProductCatalogImportsError;
} = {
  name: "GetV2CommerceProductCatalogImports",
  method: "GET",
  path: "/v2/commerce/product_catalog/imports",
  pathParameters: [],
  queryParameters: [
    "created",
    "created_gt",
    "created_gte",
    "created_lt",
    "created_lte",
    "feed_type",
    "limit",
    "page",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CommerceProductCatalogImportsInput,
  output: GetV2CommerceProductCatalogImportsOutput,
  error: GetV2CommerceProductCatalogImportsError,
};
/**
 * The PostV2CommerceProductCatalogImportsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CommerceProductCatalogImportsOperation: StripeOperation & {
  readonly input: typeof PostV2CommerceProductCatalogImportsInput;
  readonly output: typeof PostV2CommerceProductCatalogImportsOutput;
  readonly error: typeof PostV2CommerceProductCatalogImportsError;
} = {
  name: "PostV2CommerceProductCatalogImports",
  method: "POST",
  path: "/v2/commerce/product_catalog/imports",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CommerceProductCatalogImportsInput,
  output: PostV2CommerceProductCatalogImportsOutput,
  error: PostV2CommerceProductCatalogImportsError,
};
/**
 * The GetV2CommerceProductCatalogImportsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CommerceProductCatalogImportsIdOperation: StripeOperation & {
  readonly input: typeof GetV2CommerceProductCatalogImportsIdInput;
  readonly output: typeof GetV2CommerceProductCatalogImportsIdOutput;
  readonly error: typeof GetV2CommerceProductCatalogImportsIdError;
} = {
  name: "GetV2CommerceProductCatalogImportsId",
  method: "GET",
  path: "/v2/commerce/product_catalog/imports/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CommerceProductCatalogImportsIdInput,
  output: GetV2CommerceProductCatalogImportsIdOutput,
  error: GetV2CommerceProductCatalogImportsIdError,
};
/**
 * The makeCommerceProductCatalogImportsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeCommerceProductCatalogImportsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetV2CommerceProductCatalogImports function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CommerceProductCatalogImports = Effect.fn(
    "commerceProductCatalogImports.GetV2CommerceProductCatalogImports",
  )(function* (input: GetV2CommerceProductCatalogImportsInput) {
    const response: GetV2CommerceProductCatalogImportsOutput =
      yield* client.invoke(GetV2CommerceProductCatalogImportsOperation, input);
    return response;
  });
  /**
   * The PostV2CommerceProductCatalogImports function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CommerceProductCatalogImports = Effect.fn(
    "commerceProductCatalogImports.PostV2CommerceProductCatalogImports",
  )(function* (input: PostV2CommerceProductCatalogImportsInput) {
    const response: PostV2CommerceProductCatalogImportsOutput =
      yield* client.invoke(PostV2CommerceProductCatalogImportsOperation, input);
    return response;
  });
  /**
   * The GetV2CommerceProductCatalogImportsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CommerceProductCatalogImportsId = Effect.fn(
    "commerceProductCatalogImports.GetV2CommerceProductCatalogImportsId",
  )(function* (input: GetV2CommerceProductCatalogImportsIdInput) {
    const response: GetV2CommerceProductCatalogImportsIdOutput =
      yield* client.invoke(
        GetV2CommerceProductCatalogImportsIdOperation,
        input,
      );
    return response;
  });
  return {
    GetV2CommerceProductCatalogImports,
    PostV2CommerceProductCatalogImports,
    GetV2CommerceProductCatalogImportsId,
  };
});
