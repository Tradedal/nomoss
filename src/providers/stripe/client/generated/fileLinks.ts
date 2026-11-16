// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripefile_link } from "./models/common.js";

export type GetFileLinksInput = {
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
  readonly expired?: boolean;
  readonly file?: string;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetFileLinksOutput = {
  readonly data: ReadonlyArray<Stripefile_link>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetFileLinksError = Stripeerror;
export type PostFileLinksInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
  readonly file: string;
  readonly metadata?: { readonly [x: string]: string } | "";
};
export type PostFileLinksOutput = Stripefile_link;
export type PostFileLinksError = Stripeerror;
export type GetFileLinksLinkInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly link: string;
};
export type GetFileLinksLinkOutput = Stripefile_link;
export type GetFileLinksLinkError = Stripeerror;
export type PostFileLinksLinkInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: "now" | number | "";
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly link: string;
};
export type PostFileLinksLinkOutput = Stripefile_link;
export type PostFileLinksLinkError = Stripeerror;

export const GetFileLinksInput = Schema.Struct({
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
  ending_before: Schema.optionalKey(Schema.String),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  expired: Schema.optionalKey(Schema.Boolean),
  file: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  limit: Schema.optionalKey(Schema.Int),
  starting_after: Schema.optionalKey(Schema.String),
});
export const GetFileLinksOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripefile_link).annotate({
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
        Schema.isPattern(
          new globalThis.RegExp("^\\/v1\\/file_links", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/file_links",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "FileResourceFileLinkList", description: "" });
export const GetFileLinksError = Stripeerror;
export const PostFileLinksInput = Schema.Struct({
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
  expires_at: Schema.optionalKey(
    Schema.Number.annotate({
      description: "The link isn't usable after this future timestamp.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  file: Schema.String.annotate({
    description:
      "The ID of the file. The file's `purpose` must be one of the following: `business_icon`, `business_logo`, `customer_signature`, `dispute_evidence`, `finance_report_run`, `financial_account_statement`, `identity_document_downloadable`, `issuing_regulatory_reporting`, `pci_document`, `selfie`, `sigma_scheduled_query`, `tax_document_user_upload`, `terminal_android_apk`, or `terminal_reader_splashscreen`.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
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
});
export const PostFileLinksOutput = Stripefile_link;
export const PostFileLinksError = Stripeerror;
export const GetFileLinksLinkInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  link: Schema.String,
});
export const GetFileLinksLinkOutput = Stripefile_link;
export const GetFileLinksLinkError = Stripeerror;
export const PostFileLinksLinkInput = Schema.Struct({
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
  expires_at: Schema.optionalKey(
    Schema.Union([
      Schema.Literal("now"),
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "A future timestamp after which the link will no longer be usable, or `now` to expire the link immediately.",
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
  link: Schema.String,
});
export const PostFileLinksLinkOutput = Stripefile_link;
export const PostFileLinksLinkError = Stripeerror;
/**
 * The GetFileLinksOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetFileLinksOperation: StripeOperation & {
  readonly input: typeof GetFileLinksInput;
  readonly output: typeof GetFileLinksOutput;
  readonly error: typeof GetFileLinksError;
} = {
  name: "GetFileLinks",
  method: "GET",
  path: "/v1/file_links",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "expired",
    "file",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetFileLinksInput,
  output: GetFileLinksOutput,
  error: GetFileLinksError,
};
/**
 * The PostFileLinksOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostFileLinksOperation: StripeOperation & {
  readonly input: typeof PostFileLinksInput;
  readonly output: typeof PostFileLinksOutput;
  readonly error: typeof PostFileLinksError;
} = {
  name: "PostFileLinks",
  method: "POST",
  path: "/v1/file_links",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostFileLinksInput,
  output: PostFileLinksOutput,
  error: PostFileLinksError,
};
/**
 * The GetFileLinksLinkOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetFileLinksLinkOperation: StripeOperation & {
  readonly input: typeof GetFileLinksLinkInput;
  readonly output: typeof GetFileLinksLinkOutput;
  readonly error: typeof GetFileLinksLinkError;
} = {
  name: "GetFileLinksLink",
  method: "GET",
  path: "/v1/file_links/{link}",
  pathParameters: ["link"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetFileLinksLinkInput,
  output: GetFileLinksLinkOutput,
  error: GetFileLinksLinkError,
};
/**
 * The PostFileLinksLinkOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostFileLinksLinkOperation: StripeOperation & {
  readonly input: typeof PostFileLinksLinkInput;
  readonly output: typeof PostFileLinksLinkOutput;
  readonly error: typeof PostFileLinksLinkError;
} = {
  name: "PostFileLinksLink",
  method: "POST",
  path: "/v1/file_links/{link}",
  pathParameters: ["link"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostFileLinksLinkInput,
  output: PostFileLinksLinkOutput,
  error: PostFileLinksLinkError,
};
/**
 * The makeFileLinksClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeFileLinksClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetFileLinks function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetFileLinks = Effect.fn("fileLinks.GetFileLinks")(function* (
    input: GetFileLinksInput,
  ) {
    const response: GetFileLinksOutput = yield* client.invoke(
      GetFileLinksOperation,
      input,
    );
    return response;
  });
  /**
   * The PostFileLinks function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostFileLinks = Effect.fn("fileLinks.PostFileLinks")(function* (
    input: PostFileLinksInput,
  ) {
    const response: PostFileLinksOutput = yield* client.invoke(
      PostFileLinksOperation,
      input,
    );
    return response;
  });
  /**
   * The GetFileLinksLink function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetFileLinksLink = Effect.fn("fileLinks.GetFileLinksLink")(function* (
    input: GetFileLinksLinkInput,
  ) {
    const response: GetFileLinksLinkOutput = yield* client.invoke(
      GetFileLinksLinkOperation,
      input,
    );
    return response;
  });
  /**
   * The PostFileLinksLink function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostFileLinksLink = Effect.fn("fileLinks.PostFileLinksLink")(function* (
    input: PostFileLinksLinkInput,
  ) {
    const response: PostFileLinksLinkOutput = yield* client.invoke(
      PostFileLinksLinkOperation,
      input,
    );
    return response;
  });
  return {
    GetFileLinks,
    PostFileLinks,
    GetFileLinksLink,
    PostFileLinksLink,
  };
});
