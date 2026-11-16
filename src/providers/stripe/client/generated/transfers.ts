// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripetransfer, Stripetransfer_reversal } from "./models/transfers.js";

export type GetTransfersInput = {
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly destination?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly transfer_group?: string;
};
export type GetTransfersOutput = {
  readonly data: ReadonlyArray<Stripetransfer>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTransfersError = Stripeerror;
export type PostTransfersInput = {
  readonly amount?: number;
  readonly currency: string;
  readonly description?: string;
  readonly destination: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly source_transaction?: string;
  readonly source_type?: "bank_account" | "card" | "fpx";
  readonly transfer_group?: string;
};
export type PostTransfersOutput = Stripetransfer;
export type PostTransfersError = Stripeerror;
export type GetTransfersIdReversalsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetTransfersIdReversalsOutput = {
  readonly data: ReadonlyArray<Stripetransfer_reversal>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTransfersIdReversalsError = Stripeerror;
export type PostTransfersIdReversalsInput = {
  readonly amount?: number;
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly refund_application_fee?: boolean;
  readonly id: string;
};
export type PostTransfersIdReversalsOutput = Stripetransfer_reversal;
export type PostTransfersIdReversalsError = Stripeerror;
export type GetTransfersTransferInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly transfer: string;
};
export type GetTransfersTransferOutput = Stripetransfer;
export type GetTransfersTransferError = Stripeerror;
export type PostTransfersTransferInput = {
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly transfer: string;
};
export type PostTransfersTransferOutput = Stripetransfer;
export type PostTransfersTransferError = Stripeerror;
export type GetTransfersTransferReversalsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
  readonly transfer: string;
};
export type GetTransfersTransferReversalsIdOutput = Stripetransfer_reversal;
export type GetTransfersTransferReversalsIdError = Stripeerror;
export type PostTransfersTransferReversalsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly id: string;
  readonly transfer: string;
};
export type PostTransfersTransferReversalsIdOutput = Stripetransfer_reversal;
export type PostTransfersTransferReversalsIdError = Stripeerror;

export const GetTransfersInput = Schema.Struct({
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
  destination: Schema.optionalKey(
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
  transfer_group: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetTransfersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetransfer).annotate({
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
          new globalThis.RegExp("^\\/v1\\/transfers", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/transfers",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "TransferList", description: "" });
export const GetTransfersError = Stripeerror;
export const PostTransfersInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer in cents (or local equivalent) representing how much to transfer.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO code for currency](https://www.iso.org/iso-4217-currency-codes.html) in lowercase. Must be a [supported currency](https://docs.stripe.com/currencies).",
    format: "currency",
  }),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  destination: Schema.String.annotate({
    description:
      'The ID of a connected Stripe account. <a href="/docs/connect/separate-charges-and-transfers">See the Connect documentation</a> for details.',
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
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  source_transaction: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "You can use this parameter to transfer funds from a charge before they are added to your available balance. A pending balance will transfer immediately but the funds will not become available until the original charge becomes available. [See the Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-availability) for details.",
    }),
  ),
  source_type: Schema.optionalKey(
    Schema.Literals(["bank_account", "card", "fpx"]).annotate({
      description:
        "The source balance to use for this transfer. One of `bank_account`, `card`, or `fpx`. For most users, this will default to `card`.",
    }),
  ),
  transfer_group: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A string that identifies this transaction as part of a group. See the [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options) for details.",
    }),
  ),
});
export const PostTransfersOutput = Stripetransfer;
export const PostTransfersError = Stripeerror;
export const GetTransfersIdReversalsInput = Schema.Struct({
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetTransfersIdReversalsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetransfer_reversal).annotate({
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
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "TransferReversalList", description: "" });
export const GetTransfersIdReversalsError = Stripeerror;
export const PostTransfersIdReversalsInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer in cents (or local equivalent) representing how much of this transfer to reverse. Can only reverse up to the unreversed amount remaining of the transfer. Partial transfer reversals are only allowed for transfers to Stripe Accounts. Defaults to the entire transfer amount.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string which you can attach to a reversal object. This will be unset if you POST an empty value.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  refund_application_fee: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the application fee should be refunded when reversing this transfer. If a full transfer reversal is given, the full application fee will be refunded. Otherwise, the application fee will be refunded with an amount proportional to the amount of the transfer reversed.",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTransfersIdReversalsOutput = Stripetransfer_reversal;
export const PostTransfersIdReversalsError = Stripeerror;
export const GetTransfersTransferInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  transfer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTransfersTransferOutput = Stripetransfer;
export const GetTransfersTransferError = Stripeerror;
export const PostTransfersTransferInput = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string attached to the object. Often useful for displaying to users.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  transfer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTransfersTransferOutput = Stripetransfer;
export const PostTransfersTransferError = Stripeerror;
export const GetTransfersTransferReversalsIdInput = Schema.Struct({
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
  transfer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTransfersTransferReversalsIdOutput = Stripetransfer_reversal;
export const GetTransfersTransferReversalsIdError = Stripeerror;
export const PostTransfersTransferReversalsIdInput = Schema.Struct({
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  transfer: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTransfersTransferReversalsIdOutput = Stripetransfer_reversal;
export const PostTransfersTransferReversalsIdError = Stripeerror;
/**
 * The GetTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTransfersOperation: StripeOperation & {
  readonly input: typeof GetTransfersInput;
  readonly output: typeof GetTransfersOutput;
  readonly error: typeof GetTransfersError;
} = {
  name: "GetTransfers",
  method: "GET",
  path: "/v1/transfers",
  pathParameters: [],
  queryParameters: [
    "created",
    "destination",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "transfer_group",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTransfersInput,
  output: GetTransfersOutput,
  error: GetTransfersError,
};
/**
 * The PostTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTransfersOperation: StripeOperation & {
  readonly input: typeof PostTransfersInput;
  readonly output: typeof PostTransfersOutput;
  readonly error: typeof PostTransfersError;
} = {
  name: "PostTransfers",
  method: "POST",
  path: "/v1/transfers",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTransfersInput,
  output: PostTransfersOutput,
  error: PostTransfersError,
};
/**
 * The GetTransfersIdReversalsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTransfersIdReversalsOperation: StripeOperation & {
  readonly input: typeof GetTransfersIdReversalsInput;
  readonly output: typeof GetTransfersIdReversalsOutput;
  readonly error: typeof GetTransfersIdReversalsError;
} = {
  name: "GetTransfersIdReversals",
  method: "GET",
  path: "/v1/transfers/{id}/reversals",
  pathParameters: ["id"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTransfersIdReversalsInput,
  output: GetTransfersIdReversalsOutput,
  error: GetTransfersIdReversalsError,
};
/**
 * The PostTransfersIdReversalsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTransfersIdReversalsOperation: StripeOperation & {
  readonly input: typeof PostTransfersIdReversalsInput;
  readonly output: typeof PostTransfersIdReversalsOutput;
  readonly error: typeof PostTransfersIdReversalsError;
} = {
  name: "PostTransfersIdReversals",
  method: "POST",
  path: "/v1/transfers/{id}/reversals",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTransfersIdReversalsInput,
  output: PostTransfersIdReversalsOutput,
  error: PostTransfersIdReversalsError,
};
/**
 * The GetTransfersTransferOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTransfersTransferOperation: StripeOperation & {
  readonly input: typeof GetTransfersTransferInput;
  readonly output: typeof GetTransfersTransferOutput;
  readonly error: typeof GetTransfersTransferError;
} = {
  name: "GetTransfersTransfer",
  method: "GET",
  path: "/v1/transfers/{transfer}",
  pathParameters: ["transfer"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTransfersTransferInput,
  output: GetTransfersTransferOutput,
  error: GetTransfersTransferError,
};
/**
 * The PostTransfersTransferOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTransfersTransferOperation: StripeOperation & {
  readonly input: typeof PostTransfersTransferInput;
  readonly output: typeof PostTransfersTransferOutput;
  readonly error: typeof PostTransfersTransferError;
} = {
  name: "PostTransfersTransfer",
  method: "POST",
  path: "/v1/transfers/{transfer}",
  pathParameters: ["transfer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTransfersTransferInput,
  output: PostTransfersTransferOutput,
  error: PostTransfersTransferError,
};
/**
 * The GetTransfersTransferReversalsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTransfersTransferReversalsIdOperation: StripeOperation & {
  readonly input: typeof GetTransfersTransferReversalsIdInput;
  readonly output: typeof GetTransfersTransferReversalsIdOutput;
  readonly error: typeof GetTransfersTransferReversalsIdError;
} = {
  name: "GetTransfersTransferReversalsId",
  method: "GET",
  path: "/v1/transfers/{transfer}/reversals/{id}",
  pathParameters: ["id", "transfer"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTransfersTransferReversalsIdInput,
  output: GetTransfersTransferReversalsIdOutput,
  error: GetTransfersTransferReversalsIdError,
};
/**
 * The PostTransfersTransferReversalsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTransfersTransferReversalsIdOperation: StripeOperation & {
  readonly input: typeof PostTransfersTransferReversalsIdInput;
  readonly output: typeof PostTransfersTransferReversalsIdOutput;
  readonly error: typeof PostTransfersTransferReversalsIdError;
} = {
  name: "PostTransfersTransferReversalsId",
  method: "POST",
  path: "/v1/transfers/{transfer}/reversals/{id}",
  pathParameters: ["id", "transfer"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTransfersTransferReversalsIdInput,
  output: PostTransfersTransferReversalsIdOutput,
  error: PostTransfersTransferReversalsIdError,
};
/**
 * The makeTransfersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTransfersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTransfers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTransfers = Effect.fn("transfers.GetTransfers")(function* (
    input: GetTransfersInput,
  ) {
    const response: GetTransfersOutput = yield* client.invoke(
      GetTransfersOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTransfers function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTransfers = Effect.fn("transfers.PostTransfers")(function* (
    input: PostTransfersInput,
  ) {
    const response: PostTransfersOutput = yield* client.invoke(
      PostTransfersOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTransfersIdReversals function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTransfersIdReversals = Effect.fn(
    "transfers.GetTransfersIdReversals",
  )(function* (input: GetTransfersIdReversalsInput) {
    const response: GetTransfersIdReversalsOutput = yield* client.invoke(
      GetTransfersIdReversalsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTransfersIdReversals function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTransfersIdReversals = Effect.fn(
    "transfers.PostTransfersIdReversals",
  )(function* (input: PostTransfersIdReversalsInput) {
    const response: PostTransfersIdReversalsOutput = yield* client.invoke(
      PostTransfersIdReversalsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTransfersTransfer function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTransfersTransfer = Effect.fn("transfers.GetTransfersTransfer")(
    function* (input: GetTransfersTransferInput) {
      const response: GetTransfersTransferOutput = yield* client.invoke(
        GetTransfersTransferOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostTransfersTransfer function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTransfersTransfer = Effect.fn("transfers.PostTransfersTransfer")(
    function* (input: PostTransfersTransferInput) {
      const response: PostTransfersTransferOutput = yield* client.invoke(
        PostTransfersTransferOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetTransfersTransferReversalsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTransfersTransferReversalsId = Effect.fn(
    "transfers.GetTransfersTransferReversalsId",
  )(function* (input: GetTransfersTransferReversalsIdInput) {
    const response: GetTransfersTransferReversalsIdOutput =
      yield* client.invoke(GetTransfersTransferReversalsIdOperation, input);
    return response;
  });
  /**
   * The PostTransfersTransferReversalsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTransfersTransferReversalsId = Effect.fn(
    "transfers.PostTransfersTransferReversalsId",
  )(function* (input: PostTransfersTransferReversalsIdInput) {
    const response: PostTransfersTransferReversalsIdOutput =
      yield* client.invoke(PostTransfersTransferReversalsIdOperation, input);
    return response;
  });
  return {
    GetTransfers,
    PostTransfers,
    GetTransfersIdReversals,
    PostTransfersIdReversals,
    GetTransfersTransfer,
    PostTransfersTransfer,
    GetTransfersTransferReversalsId,
    PostTransfersTransferReversalsId,
  };
});
