// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripeapple_pay_domain,
  Stripedeleted_apple_pay_domain,
  Stripeerror,
} from "./models/common.js";

export type GetApplePayDomainsInput = {
  readonly domain_name?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetApplePayDomainsOutput = {
  readonly data: ReadonlyArray<Stripeapple_pay_domain>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetApplePayDomainsError = Stripeerror;
export type PostApplePayDomainsInput = {
  readonly domain_name: string;
  readonly expand?: ReadonlyArray<string>;
};
export type PostApplePayDomainsOutput = Stripeapple_pay_domain;
export type PostApplePayDomainsError = Stripeerror;
export type GetApplePayDomainsDomainInput = {
  readonly domain: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetApplePayDomainsDomainOutput = Stripeapple_pay_domain;
export type GetApplePayDomainsDomainError = Stripeerror;
export type DeleteApplePayDomainsDomainInput = { readonly domain: string };
export type DeleteApplePayDomainsDomainOutput = Stripedeleted_apple_pay_domain;
export type DeleteApplePayDomainsDomainError = Stripeerror;

export const GetApplePayDomainsInput = Schema.Struct({
  domain_name: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
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
export const GetApplePayDomainsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeapple_pay_domain),
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
          new globalThis.RegExp("^\\/v1\\/apple_pay\\/domains", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/apple_pay\\/domains",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "ApplePayDomainList", description: "" });
export const GetApplePayDomainsError = Stripeerror;
export const PostApplePayDomainsInput = Schema.Struct({
  domain_name: Schema.String,
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
export const PostApplePayDomainsOutput = Stripeapple_pay_domain;
export const PostApplePayDomainsError = Stripeerror;
export const GetApplePayDomainsDomainInput = Schema.Struct({
  domain: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetApplePayDomainsDomainOutput = Stripeapple_pay_domain;
export const GetApplePayDomainsDomainError = Stripeerror;
export const DeleteApplePayDomainsDomainInput = Schema.Struct({
  domain: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteApplePayDomainsDomainOutput = Stripedeleted_apple_pay_domain;
export const DeleteApplePayDomainsDomainError = Stripeerror;
/**
 * The GetApplePayDomainsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetApplePayDomainsOperation: StripeOperation & {
  readonly input: typeof GetApplePayDomainsInput;
  readonly output: typeof GetApplePayDomainsOutput;
  readonly error: typeof GetApplePayDomainsError;
} = {
  name: "GetApplePayDomains",
  method: "GET",
  path: "/v1/apple_pay/domains",
  pathParameters: [],
  queryParameters: [
    "domain_name",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetApplePayDomainsInput,
  output: GetApplePayDomainsOutput,
  error: GetApplePayDomainsError,
};
/**
 * The PostApplePayDomainsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostApplePayDomainsOperation: StripeOperation & {
  readonly input: typeof PostApplePayDomainsInput;
  readonly output: typeof PostApplePayDomainsOutput;
  readonly error: typeof PostApplePayDomainsError;
} = {
  name: "PostApplePayDomains",
  method: "POST",
  path: "/v1/apple_pay/domains",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostApplePayDomainsInput,
  output: PostApplePayDomainsOutput,
  error: PostApplePayDomainsError,
};
/**
 * The GetApplePayDomainsDomainOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetApplePayDomainsDomainOperation: StripeOperation & {
  readonly input: typeof GetApplePayDomainsDomainInput;
  readonly output: typeof GetApplePayDomainsDomainOutput;
  readonly error: typeof GetApplePayDomainsDomainError;
} = {
  name: "GetApplePayDomainsDomain",
  method: "GET",
  path: "/v1/apple_pay/domains/{domain}",
  pathParameters: ["domain"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetApplePayDomainsDomainInput,
  output: GetApplePayDomainsDomainOutput,
  error: GetApplePayDomainsDomainError,
};
/**
 * The DeleteApplePayDomainsDomainOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteApplePayDomainsDomainOperation: StripeOperation & {
  readonly input: typeof DeleteApplePayDomainsDomainInput;
  readonly output: typeof DeleteApplePayDomainsDomainOutput;
  readonly error: typeof DeleteApplePayDomainsDomainError;
} = {
  name: "DeleteApplePayDomainsDomain",
  method: "DELETE",
  path: "/v1/apple_pay/domains/{domain}",
  pathParameters: ["domain"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteApplePayDomainsDomainInput,
  output: DeleteApplePayDomainsDomainOutput,
  error: DeleteApplePayDomainsDomainError,
};
/**
 * The makeApplePayDomainsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeApplePayDomainsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetApplePayDomains function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetApplePayDomains = Effect.fn("applePayDomains.GetApplePayDomains")(
    function* (input: GetApplePayDomainsInput) {
      const response: GetApplePayDomainsOutput = yield* client.invoke(
        GetApplePayDomainsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostApplePayDomains function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostApplePayDomains = Effect.fn("applePayDomains.PostApplePayDomains")(
    function* (input: PostApplePayDomainsInput) {
      const response: PostApplePayDomainsOutput = yield* client.invoke(
        PostApplePayDomainsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetApplePayDomainsDomain function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetApplePayDomainsDomain = Effect.fn(
    "applePayDomains.GetApplePayDomainsDomain",
  )(function* (input: GetApplePayDomainsDomainInput) {
    const response: GetApplePayDomainsDomainOutput = yield* client.invoke(
      GetApplePayDomainsDomainOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteApplePayDomainsDomain function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteApplePayDomainsDomain = Effect.fn(
    "applePayDomains.DeleteApplePayDomainsDomain",
  )(function* (input: DeleteApplePayDomainsDomainInput) {
    const response: DeleteApplePayDomainsDomainOutput = yield* client.invoke(
      DeleteApplePayDomainsDomainOperation,
      input,
    );
    return response;
  });
  return {
    GetApplePayDomains,
    PostApplePayDomains,
    GetApplePayDomainsDomain,
    DeleteApplePayDomainsDomain,
  };
});
