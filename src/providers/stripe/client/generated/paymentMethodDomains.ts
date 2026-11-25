// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripepayment_method_domain } from "./models/paymentMethods.js";

export type GetPaymentMethodDomainsInput = {
  readonly domain_name?: string;
  readonly enabled?: boolean;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetPaymentMethodDomainsOutput = {
  readonly data: ReadonlyArray<Stripepayment_method_domain>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPaymentMethodDomainsError = Stripeerror;
export type PostPaymentMethodDomainsInput = {
  readonly domain_name: string;
  readonly enabled?: boolean;
  readonly expand?: ReadonlyArray<string>;
};
export type PostPaymentMethodDomainsOutput = Stripepayment_method_domain;
export type PostPaymentMethodDomainsError = Stripeerror;
export type GetPaymentMethodDomainsPaymentMethodDomainInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payment_method_domain: string;
};
export type GetPaymentMethodDomainsPaymentMethodDomainOutput =
  Stripepayment_method_domain;
export type GetPaymentMethodDomainsPaymentMethodDomainError = Stripeerror;
export type PostPaymentMethodDomainsPaymentMethodDomainInput = {
  readonly enabled?: boolean;
  readonly expand?: ReadonlyArray<string>;
  readonly payment_method_domain: string;
};
export type PostPaymentMethodDomainsPaymentMethodDomainOutput =
  Stripepayment_method_domain;
export type PostPaymentMethodDomainsPaymentMethodDomainError = Stripeerror;
export type PostPaymentMethodDomainsPaymentMethodDomainValidateInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payment_method_domain: string;
};
export type PostPaymentMethodDomainsPaymentMethodDomainValidateOutput =
  Stripepayment_method_domain;
export type PostPaymentMethodDomainsPaymentMethodDomainValidateError =
  Stripeerror;

export const GetPaymentMethodDomainsInput = Schema.Struct({
  domain_name: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  enabled: Schema.optionalKey(Schema.Boolean),
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
export const GetPaymentMethodDomainsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripepayment_method_domain),
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
          new globalThis.RegExp("^\\/v1\\/payment_method_domains", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/payment_method_domains",
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
  title: "PaymentMethodDomainResourcePaymentMethodDomainList",
  description: "",
});
export const GetPaymentMethodDomainsError = Stripeerror;
export const PostPaymentMethodDomainsInput = Schema.Struct({
  domain_name: Schema.String.annotate({
    description:
      "The domain name that this payment method domain object represents.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  enabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether this payment method domain is enabled. If the domain is not enabled, payment methods that require a payment method domain will not appear in Elements or Embedded Checkout.",
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
export const PostPaymentMethodDomainsOutput = Stripepayment_method_domain;
export const PostPaymentMethodDomainsError = Stripeerror;
export const GetPaymentMethodDomainsPaymentMethodDomainInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  payment_method_domain: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPaymentMethodDomainsPaymentMethodDomainOutput =
  Stripepayment_method_domain;
export const GetPaymentMethodDomainsPaymentMethodDomainError = Stripeerror;
export const PostPaymentMethodDomainsPaymentMethodDomainInput = Schema.Struct({
  enabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether this payment method domain is enabled. If the domain is not enabled, payment methods that require a payment method domain will not appear in Elements or Embedded Checkout.",
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
  payment_method_domain: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPaymentMethodDomainsPaymentMethodDomainOutput =
  Stripepayment_method_domain;
export const PostPaymentMethodDomainsPaymentMethodDomainError = Stripeerror;
export const PostPaymentMethodDomainsPaymentMethodDomainValidateInput =
  Schema.Struct({
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "Specifies which fields in the response should be expanded.",
      }),
    ),
    payment_method_domain: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostPaymentMethodDomainsPaymentMethodDomainValidateOutput =
  Stripepayment_method_domain;
export const PostPaymentMethodDomainsPaymentMethodDomainValidateError =
  Stripeerror;
/**
 * The GetPaymentMethodDomainsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPaymentMethodDomainsOperation: StripeOperation & {
  readonly input: typeof GetPaymentMethodDomainsInput;
  readonly output: typeof GetPaymentMethodDomainsOutput;
  readonly error: typeof GetPaymentMethodDomainsError;
} = {
  name: "GetPaymentMethodDomains",
  method: "GET",
  path: "/v1/payment_method_domains",
  pathParameters: [],
  queryParameters: [
    "domain_name",
    "enabled",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPaymentMethodDomainsInput,
  output: GetPaymentMethodDomainsOutput,
  error: GetPaymentMethodDomainsError,
};
/**
 * The PostPaymentMethodDomainsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentMethodDomainsOperation: StripeOperation & {
  readonly input: typeof PostPaymentMethodDomainsInput;
  readonly output: typeof PostPaymentMethodDomainsOutput;
  readonly error: typeof PostPaymentMethodDomainsError;
} = {
  name: "PostPaymentMethodDomains",
  method: "POST",
  path: "/v1/payment_method_domains",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentMethodDomainsInput,
  output: PostPaymentMethodDomainsOutput,
  error: PostPaymentMethodDomainsError,
};
/**
 * The GetPaymentMethodDomainsPaymentMethodDomainOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPaymentMethodDomainsPaymentMethodDomainOperation: StripeOperation & {
  readonly input: typeof GetPaymentMethodDomainsPaymentMethodDomainInput;
  readonly output: typeof GetPaymentMethodDomainsPaymentMethodDomainOutput;
  readonly error: typeof GetPaymentMethodDomainsPaymentMethodDomainError;
} = {
  name: "GetPaymentMethodDomainsPaymentMethodDomain",
  method: "GET",
  path: "/v1/payment_method_domains/{payment_method_domain}",
  pathParameters: ["payment_method_domain"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPaymentMethodDomainsPaymentMethodDomainInput,
  output: GetPaymentMethodDomainsPaymentMethodDomainOutput,
  error: GetPaymentMethodDomainsPaymentMethodDomainError,
};
/**
 * The PostPaymentMethodDomainsPaymentMethodDomainOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentMethodDomainsPaymentMethodDomainOperation: StripeOperation & {
  readonly input: typeof PostPaymentMethodDomainsPaymentMethodDomainInput;
  readonly output: typeof PostPaymentMethodDomainsPaymentMethodDomainOutput;
  readonly error: typeof PostPaymentMethodDomainsPaymentMethodDomainError;
} = {
  name: "PostPaymentMethodDomainsPaymentMethodDomain",
  method: "POST",
  path: "/v1/payment_method_domains/{payment_method_domain}",
  pathParameters: ["payment_method_domain"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentMethodDomainsPaymentMethodDomainInput,
  output: PostPaymentMethodDomainsPaymentMethodDomainOutput,
  error: PostPaymentMethodDomainsPaymentMethodDomainError,
};
/**
 * The PostPaymentMethodDomainsPaymentMethodDomainValidateOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentMethodDomainsPaymentMethodDomainValidateOperation: StripeOperation & {
  readonly input: typeof PostPaymentMethodDomainsPaymentMethodDomainValidateInput;
  readonly output: typeof PostPaymentMethodDomainsPaymentMethodDomainValidateOutput;
  readonly error: typeof PostPaymentMethodDomainsPaymentMethodDomainValidateError;
} = {
  name: "PostPaymentMethodDomainsPaymentMethodDomainValidate",
  method: "POST",
  path: "/v1/payment_method_domains/{payment_method_domain}/validate",
  pathParameters: ["payment_method_domain"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentMethodDomainsPaymentMethodDomainValidateInput,
  output: PostPaymentMethodDomainsPaymentMethodDomainValidateOutput,
  error: PostPaymentMethodDomainsPaymentMethodDomainValidateError,
};
/**
 * The makePaymentMethodDomainsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makePaymentMethodDomainsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetPaymentMethodDomains function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPaymentMethodDomains = Effect.fn(
    "paymentMethodDomains.GetPaymentMethodDomains",
  )(function* (input: GetPaymentMethodDomainsInput) {
    const response: GetPaymentMethodDomainsOutput = yield* client.invoke(
      GetPaymentMethodDomainsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPaymentMethodDomains function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentMethodDomains = Effect.fn(
    "paymentMethodDomains.PostPaymentMethodDomains",
  )(function* (input: PostPaymentMethodDomainsInput) {
    const response: PostPaymentMethodDomainsOutput = yield* client.invoke(
      PostPaymentMethodDomainsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetPaymentMethodDomainsPaymentMethodDomain function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPaymentMethodDomainsPaymentMethodDomain = Effect.fn(
    "paymentMethodDomains.GetPaymentMethodDomainsPaymentMethodDomain",
  )(function* (input: GetPaymentMethodDomainsPaymentMethodDomainInput) {
    const response: GetPaymentMethodDomainsPaymentMethodDomainOutput =
      yield* client.invoke(
        GetPaymentMethodDomainsPaymentMethodDomainOperation,
        input,
      );
    return response;
  });
  /**
   * The PostPaymentMethodDomainsPaymentMethodDomain function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentMethodDomainsPaymentMethodDomain = Effect.fn(
    "paymentMethodDomains.PostPaymentMethodDomainsPaymentMethodDomain",
  )(function* (input: PostPaymentMethodDomainsPaymentMethodDomainInput) {
    const response: PostPaymentMethodDomainsPaymentMethodDomainOutput =
      yield* client.invoke(
        PostPaymentMethodDomainsPaymentMethodDomainOperation,
        input,
      );
    return response;
  });
  /**
   * The PostPaymentMethodDomainsPaymentMethodDomainValidate function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentMethodDomainsPaymentMethodDomainValidate = Effect.fn(
    "paymentMethodDomains.PostPaymentMethodDomainsPaymentMethodDomainValidate",
  )(function* (
    input: PostPaymentMethodDomainsPaymentMethodDomainValidateInput,
  ) {
    const response: PostPaymentMethodDomainsPaymentMethodDomainValidateOutput =
      yield* client.invoke(
        PostPaymentMethodDomainsPaymentMethodDomainValidateOperation,
        input,
      );
    return response;
  });
  return {
    GetPaymentMethodDomains,
    PostPaymentMethodDomains,
    GetPaymentMethodDomainsPaymentMethodDomain,
    PostPaymentMethodDomainsPaymentMethodDomain,
    PostPaymentMethodDomainsPaymentMethodDomainValidate,
  };
});
