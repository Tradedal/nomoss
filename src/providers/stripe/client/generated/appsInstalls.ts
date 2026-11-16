// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeapps_install, Stripeerror } from "./models/common.js";

export type GetAppsInstallsInput = {
  readonly account?: string;
  readonly app?: string;
  readonly approval_required?: boolean;
  readonly channel?: "private_live" | "private_test" | "public" | "testing";
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly created_by?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?:
    | "install_failed"
    | "installed"
    | "installing"
    | "uninstall_failed"
    | "uninstalling";
};
export type GetAppsInstallsOutput = {
  readonly data: ReadonlyArray<Stripeapps_install>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetAppsInstallsError = Stripeerror;
export type PostAppsInstallsInput = {
  readonly app: string;
  readonly channel?: "private_live" | "private_test" | "public" | "testing";
  readonly code_challenge?: string;
  readonly code_challenge_method?: string;
  readonly expand?: ReadonlyArray<string>;
};
export type PostAppsInstallsOutput = Stripeapps_install;
export type PostAppsInstallsError = Stripeerror;
export type GetAppsInstallsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetAppsInstallsIdOutput = Stripeapps_install;
export type GetAppsInstallsIdError = Stripeerror;
export type PostAppsInstallsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostAppsInstallsIdOutput = Stripeapps_install;
export type PostAppsInstallsIdError = Stripeerror;
export type PostAppsInstallsIdUninstallInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostAppsInstallsIdUninstallOutput = Stripeapps_install;
export type PostAppsInstallsIdUninstallError = Stripeerror;

export const GetAppsInstallsInput = Schema.Struct({
  account: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  app: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  approval_required: Schema.optionalKey(Schema.Boolean),
  channel: Schema.optionalKey(
    Schema.Literals(["private_live", "private_test", "public", "testing"]),
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
  created_by: Schema.optionalKey(
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
  status: Schema.optionalKey(
    Schema.Literals([
      "install_failed",
      "installed",
      "installing",
      "uninstall_failed",
      "uninstalling",
    ]),
  ),
});
export const GetAppsInstallsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeapps_install),
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
          new globalThis.RegExp("^\\/v1\\/apps\\/installs", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/apps\\/installs",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "AppServiceResourceInstallAPIList", description: "" });
export const GetAppsInstallsError = Stripeerror;
export const PostAppsInstallsInput = Schema.Struct({
  app: Schema.String.annotate({
    description: "The ID of the app to install.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  channel: Schema.optionalKey(
    Schema.Literals([
      "private_live",
      "private_test",
      "public",
      "testing",
    ]).annotate({
      description:
        "The distribution channel to install from. Defaults to `public`, which only app developers and embedding platforms can use. An account installing its own private app must pass `private_test` or `private_live`, matching the mode of the API key.",
    }),
  ),
  code_challenge: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For OAuth apps, the PKCE code challenge used to issue the `auth_code` returned on the install. Must be 43 to 128 characters and contain only letters, numbers, `-`, `.`, `_`, and `~`. Only applies to installs made by the app developer or an embedding platform; ignored when an account installs its own private app.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  code_challenge_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The method used to derive `code_challenge`. Required when `code_challenge` is provided, and must be `S256`.",
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
});
export const PostAppsInstallsOutput = Stripeapps_install;
export const PostAppsInstallsError = Stripeerror;
export const GetAppsInstallsIdInput = Schema.Struct({
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
export const GetAppsInstallsIdOutput = Stripeapps_install;
export const GetAppsInstallsIdError = Stripeerror;
export const PostAppsInstallsIdInput = Schema.Struct({
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
export const PostAppsInstallsIdOutput = Stripeapps_install;
export const PostAppsInstallsIdError = Stripeerror;
export const PostAppsInstallsIdUninstallInput = Schema.Struct({
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
export const PostAppsInstallsIdUninstallOutput = Stripeapps_install;
export const PostAppsInstallsIdUninstallError = Stripeerror;
/**
 * The GetAppsInstallsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAppsInstallsOperation: StripeOperation & {
  readonly input: typeof GetAppsInstallsInput;
  readonly output: typeof GetAppsInstallsOutput;
  readonly error: typeof GetAppsInstallsError;
} = {
  name: "GetAppsInstalls",
  method: "GET",
  path: "/v1/apps/installs",
  pathParameters: [],
  queryParameters: [
    "account",
    "app",
    "approval_required",
    "channel",
    "created",
    "created_by",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAppsInstallsInput,
  output: GetAppsInstallsOutput,
  error: GetAppsInstallsError,
};
/**
 * The PostAppsInstallsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAppsInstallsOperation: StripeOperation & {
  readonly input: typeof PostAppsInstallsInput;
  readonly output: typeof PostAppsInstallsOutput;
  readonly error: typeof PostAppsInstallsError;
} = {
  name: "PostAppsInstalls",
  method: "POST",
  path: "/v1/apps/installs",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAppsInstallsInput,
  output: PostAppsInstallsOutput,
  error: PostAppsInstallsError,
};
/**
 * The GetAppsInstallsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetAppsInstallsIdOperation: StripeOperation & {
  readonly input: typeof GetAppsInstallsIdInput;
  readonly output: typeof GetAppsInstallsIdOutput;
  readonly error: typeof GetAppsInstallsIdError;
} = {
  name: "GetAppsInstallsId",
  method: "GET",
  path: "/v1/apps/installs/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetAppsInstallsIdInput,
  output: GetAppsInstallsIdOutput,
  error: GetAppsInstallsIdError,
};
/**
 * The PostAppsInstallsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAppsInstallsIdOperation: StripeOperation & {
  readonly input: typeof PostAppsInstallsIdInput;
  readonly output: typeof PostAppsInstallsIdOutput;
  readonly error: typeof PostAppsInstallsIdError;
} = {
  name: "PostAppsInstallsId",
  method: "POST",
  path: "/v1/apps/installs/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAppsInstallsIdInput,
  output: PostAppsInstallsIdOutput,
  error: PostAppsInstallsIdError,
};
/**
 * The PostAppsInstallsIdUninstallOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostAppsInstallsIdUninstallOperation: StripeOperation & {
  readonly input: typeof PostAppsInstallsIdUninstallInput;
  readonly output: typeof PostAppsInstallsIdUninstallOutput;
  readonly error: typeof PostAppsInstallsIdUninstallError;
} = {
  name: "PostAppsInstallsIdUninstall",
  method: "POST",
  path: "/v1/apps/installs/{id}/uninstall",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostAppsInstallsIdUninstallInput,
  output: PostAppsInstallsIdUninstallOutput,
  error: PostAppsInstallsIdUninstallError,
};
/**
 * The makeAppsInstallsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeAppsInstallsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetAppsInstalls function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAppsInstalls = Effect.fn("appsInstalls.GetAppsInstalls")(function* (
    input: GetAppsInstallsInput,
  ) {
    const response: GetAppsInstallsOutput = yield* client.invoke(
      GetAppsInstallsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostAppsInstalls function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAppsInstalls = Effect.fn("appsInstalls.PostAppsInstalls")(
    function* (input: PostAppsInstallsInput) {
      const response: PostAppsInstallsOutput = yield* client.invoke(
        PostAppsInstallsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetAppsInstallsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetAppsInstallsId = Effect.fn("appsInstalls.GetAppsInstallsId")(
    function* (input: GetAppsInstallsIdInput) {
      const response: GetAppsInstallsIdOutput = yield* client.invoke(
        GetAppsInstallsIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostAppsInstallsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAppsInstallsId = Effect.fn("appsInstalls.PostAppsInstallsId")(
    function* (input: PostAppsInstallsIdInput) {
      const response: PostAppsInstallsIdOutput = yield* client.invoke(
        PostAppsInstallsIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostAppsInstallsIdUninstall function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostAppsInstallsIdUninstall = Effect.fn(
    "appsInstalls.PostAppsInstallsIdUninstall",
  )(function* (input: PostAppsInstallsIdUninstallInput) {
    const response: PostAppsInstallsIdUninstallOutput = yield* client.invoke(
      PostAppsInstallsIdUninstallOperation,
      input,
    );
    return response;
  });
  return {
    GetAppsInstalls,
    PostAppsInstalls,
    GetAppsInstallsId,
    PostAppsInstallsId,
    PostAppsInstallsIdUninstall,
  };
});
