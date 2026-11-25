// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripetreasury_outbound_payment } from "./models/treasury.js";

export type GetTreasuryOutboundPaymentsInput = {
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly customer?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?:
    | "canceled"
    | "failed"
    | "posted"
    | "processing"
    | "returned";
};
export type GetTreasuryOutboundPaymentsOutput = {
  readonly data: ReadonlyArray<Stripetreasury_outbound_payment>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTreasuryOutboundPaymentsError = Stripeerror;
export type PostTreasuryOutboundPaymentsInput = {
  readonly amount: number;
  readonly currency: string;
  readonly customer?: string;
  readonly description?: string;
  readonly destination_payment_method?: string;
  readonly destination_payment_method_data?: {
    readonly billing_details?: {
      readonly address?:
        | ({
            readonly city?: string;
            readonly country?: string;
            readonly line1?: string;
            readonly line2?: string;
            readonly postal_code?: string;
            readonly state?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly email?: string | "";
      readonly name?: string | "";
      readonly phone?: string | "";
    } & { readonly [x: string]: Schema.Json };
    readonly financial_account?: string;
    readonly metadata?: { readonly [x: string]: string };
    readonly type: "financial_account" | "us_bank_account";
    readonly us_bank_account?: {
      readonly account_holder_type?: "company" | "individual";
      readonly account_number?: string;
      readonly account_type?: "checking" | "savings";
      readonly financial_connections_account?: string;
      readonly routing_number?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly destination_payment_method_options?: {
    readonly us_bank_account?:
      | ({ readonly network?: "ach" | "us_domestic_wire" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly end_user_details?: {
    readonly ip_address?: string;
    readonly present: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly statement_descriptor?: string;
};
export type PostTreasuryOutboundPaymentsOutput =
  Stripetreasury_outbound_payment;
export type PostTreasuryOutboundPaymentsError = Stripeerror;
export type GetTreasuryOutboundPaymentsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetTreasuryOutboundPaymentsIdOutput =
  Stripetreasury_outbound_payment;
export type GetTreasuryOutboundPaymentsIdError = Stripeerror;
export type PostTreasuryOutboundPaymentsIdCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostTreasuryOutboundPaymentsIdCancelOutput =
  Stripetreasury_outbound_payment;
export type PostTreasuryOutboundPaymentsIdCancelError = Stripeerror;

export const GetTreasuryOutboundPaymentsInput = Schema.Struct({
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
  customer: Schema.optionalKey(
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
  financial_account: Schema.String,
  limit: Schema.optionalKey(Schema.Int),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(["canceled", "failed", "posted", "processing", "returned"]),
  ),
});
export const GetTreasuryOutboundPaymentsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetreasury_outbound_payment).annotate({
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
          new globalThis.RegExp("^\\/v1\\/treasury\\/outbound_payments", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/treasury\\/outbound_payments",
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
  title: "TreasuryOutboundPaymentsResourceOutboundPaymentList",
  description: "",
});
export const GetTreasuryOutboundPaymentsError = Stripeerror;
export const PostTreasuryOutboundPaymentsInput = Schema.Struct({
  amount: Schema.Number.annotate({
    description: "Amount (in cents) to be transferred.",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  currency: Schema.String.annotate({
    description:
      "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
    format: "currency",
  }),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the customer to whom the OutboundPayment is sent. Must match the Customer attached to the `destination_payment_method` passed in.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
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
  destination_payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The PaymentMethod to use as the payment instrument for the OutboundPayment. Exclusive with `destination_payment_method_data`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  destination_payment_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        billing_details: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              address: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      city: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      country: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line1: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      line2: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      postal_code: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      state: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
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
                  ).annotate({ title: "billing_details_address" }),
                  Schema.Literal(""),
                ]),
              ),
              email: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(800).annotate({
                      expected: "a string with at most 800 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              name: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              phone: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "billing_details_inner_params" }),
        ),
        financial_account: Schema.optionalKey(Schema.String),
        metadata: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.String),
        ),
        type: Schema.Literals(["financial_account", "us_bank_account"]),
        us_bank_account: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              account_holder_type: Schema.optionalKey(
                Schema.Literals(["company", "individual"]),
              ),
              account_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              account_type: Schema.optionalKey(
                Schema.Literals(["checking", "savings"]),
              ),
              financial_connections_account: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              routing_number: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
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
          ).annotate({ title: "payment_method_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_data",
      description:
        "Hash used to generate the PaymentMethod to be used for this OutboundPayment. Exclusive with `destination_payment_method`.",
    }),
  ),
  destination_payment_method_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        us_bank_account: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                network: Schema.optionalKey(
                  Schema.Literals(["ach", "us_domestic_wire"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_options_param" }),
            Schema.Literal(""),
          ]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_options",
      description:
        "Payment method-specific configuration for this OutboundPayment.",
    }),
  ),
  end_user_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        ip_address: Schema.optionalKey(Schema.String),
        present: Schema.Boolean,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "end_user_details_params",
      description: "End user details.",
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
  financial_account: Schema.String.annotate({
    description: "The FinancialAccount to pull funds from.",
  }),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The description that appears on the receiving end for this OutboundPayment (for example, bank statement for external bank transfer). Maximum 10 characters for `ach` payments, 140 characters for `us_domestic_wire` payments, or 500 characters for `stripe` network transfers. Can only include -#.$&*, spaces, and alphanumeric characters. The default value is "payment".',
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const PostTreasuryOutboundPaymentsOutput =
  Stripetreasury_outbound_payment;
export const PostTreasuryOutboundPaymentsError = Stripeerror;
export const GetTreasuryOutboundPaymentsIdInput = Schema.Struct({
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
export const GetTreasuryOutboundPaymentsIdOutput =
  Stripetreasury_outbound_payment;
export const GetTreasuryOutboundPaymentsIdError = Stripeerror;
export const PostTreasuryOutboundPaymentsIdCancelInput = Schema.Struct({
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
export const PostTreasuryOutboundPaymentsIdCancelOutput =
  Stripetreasury_outbound_payment;
export const PostTreasuryOutboundPaymentsIdCancelError = Stripeerror;
/**
 * The GetTreasuryOutboundPaymentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryOutboundPaymentsOperation: StripeOperation & {
  readonly input: typeof GetTreasuryOutboundPaymentsInput;
  readonly output: typeof GetTreasuryOutboundPaymentsOutput;
  readonly error: typeof GetTreasuryOutboundPaymentsError;
} = {
  name: "GetTreasuryOutboundPayments",
  method: "GET",
  path: "/v1/treasury/outbound_payments",
  pathParameters: [],
  queryParameters: [
    "created",
    "customer",
    "ending_before",
    "expand",
    "financial_account",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryOutboundPaymentsInput,
  output: GetTreasuryOutboundPaymentsOutput,
  error: GetTreasuryOutboundPaymentsError,
};
/**
 * The PostTreasuryOutboundPaymentsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryOutboundPaymentsOperation: StripeOperation & {
  readonly input: typeof PostTreasuryOutboundPaymentsInput;
  readonly output: typeof PostTreasuryOutboundPaymentsOutput;
  readonly error: typeof PostTreasuryOutboundPaymentsError;
} = {
  name: "PostTreasuryOutboundPayments",
  method: "POST",
  path: "/v1/treasury/outbound_payments",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryOutboundPaymentsInput,
  output: PostTreasuryOutboundPaymentsOutput,
  error: PostTreasuryOutboundPaymentsError,
};
/**
 * The GetTreasuryOutboundPaymentsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryOutboundPaymentsIdOperation: StripeOperation & {
  readonly input: typeof GetTreasuryOutboundPaymentsIdInput;
  readonly output: typeof GetTreasuryOutboundPaymentsIdOutput;
  readonly error: typeof GetTreasuryOutboundPaymentsIdError;
} = {
  name: "GetTreasuryOutboundPaymentsId",
  method: "GET",
  path: "/v1/treasury/outbound_payments/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryOutboundPaymentsIdInput,
  output: GetTreasuryOutboundPaymentsIdOutput,
  error: GetTreasuryOutboundPaymentsIdError,
};
/**
 * The PostTreasuryOutboundPaymentsIdCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryOutboundPaymentsIdCancelOperation: StripeOperation & {
  readonly input: typeof PostTreasuryOutboundPaymentsIdCancelInput;
  readonly output: typeof PostTreasuryOutboundPaymentsIdCancelOutput;
  readonly error: typeof PostTreasuryOutboundPaymentsIdCancelError;
} = {
  name: "PostTreasuryOutboundPaymentsIdCancel",
  method: "POST",
  path: "/v1/treasury/outbound_payments/{id}/cancel",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryOutboundPaymentsIdCancelInput,
  output: PostTreasuryOutboundPaymentsIdCancelOutput,
  error: PostTreasuryOutboundPaymentsIdCancelError,
};
/**
 * The makeTreasuryOutboundPaymentsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTreasuryOutboundPaymentsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTreasuryOutboundPayments function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryOutboundPayments = Effect.fn(
    "treasuryOutboundPayments.GetTreasuryOutboundPayments",
  )(function* (input: GetTreasuryOutboundPaymentsInput) {
    const response: GetTreasuryOutboundPaymentsOutput = yield* client.invoke(
      GetTreasuryOutboundPaymentsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryOutboundPayments function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryOutboundPayments = Effect.fn(
    "treasuryOutboundPayments.PostTreasuryOutboundPayments",
  )(function* (input: PostTreasuryOutboundPaymentsInput) {
    const response: PostTreasuryOutboundPaymentsOutput = yield* client.invoke(
      PostTreasuryOutboundPaymentsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTreasuryOutboundPaymentsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryOutboundPaymentsId = Effect.fn(
    "treasuryOutboundPayments.GetTreasuryOutboundPaymentsId",
  )(function* (input: GetTreasuryOutboundPaymentsIdInput) {
    const response: GetTreasuryOutboundPaymentsIdOutput = yield* client.invoke(
      GetTreasuryOutboundPaymentsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryOutboundPaymentsIdCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryOutboundPaymentsIdCancel = Effect.fn(
    "treasuryOutboundPayments.PostTreasuryOutboundPaymentsIdCancel",
  )(function* (input: PostTreasuryOutboundPaymentsIdCancelInput) {
    const response: PostTreasuryOutboundPaymentsIdCancelOutput =
      yield* client.invoke(
        PostTreasuryOutboundPaymentsIdCancelOperation,
        input,
      );
    return response;
  });
  return {
    GetTreasuryOutboundPayments,
    PostTreasuryOutboundPayments,
    GetTreasuryOutboundPaymentsId,
    PostTreasuryOutboundPaymentsIdCancel,
  };
});
