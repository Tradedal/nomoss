// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripeissuing_dispute } from "./models/issuing.js";

export type GetIssuingDisputesInput = {
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
  readonly status?: "expired" | "lost" | "submitted" | "unsubmitted" | "won";
  readonly transaction?: string;
};
export type GetIssuingDisputesOutput = {
  readonly data: ReadonlyArray<Stripeissuing_dispute>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetIssuingDisputesError = Stripeerror;
export type PostIssuingDisputesInput = {
  readonly amount?: number;
  readonly evidence?: {
    readonly canceled?:
      | ({
          readonly additional_documentation?: string | "";
          readonly canceled_at?: number | "";
          readonly cancellation_policy_provided?: boolean | "";
          readonly cancellation_reason?: string | "";
          readonly expected_at?: number | "";
          readonly explanation?: string | "";
          readonly product_description?: string | "";
          readonly product_type?: "" | "merchandise" | "service";
          readonly return_status?: "" | "merchant_rejected" | "successful";
          readonly returned_at?: number | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly duplicate?:
      | ({
          readonly additional_documentation?: string | "";
          readonly card_statement?: string | "";
          readonly cash_receipt?: string | "";
          readonly check_image?: string | "";
          readonly explanation?: string | "";
          readonly original_transaction?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly fraudulent?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly merchandise_not_as_described?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
          readonly received_at?: number | "";
          readonly return_description?: string | "";
          readonly return_status?: "" | "merchant_rejected" | "successful";
          readonly returned_at?: number | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly no_valid_authorization?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly not_received?:
      | ({
          readonly additional_documentation?: string | "";
          readonly expected_at?: number | "";
          readonly explanation?: string | "";
          readonly product_description?: string | "";
          readonly product_type?: "" | "merchandise" | "service";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly other?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
          readonly product_description?: string | "";
          readonly product_type?: "" | "merchandise" | "service";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly reason?:
      | "canceled"
      | "duplicate"
      | "fraudulent"
      | "merchandise_not_as_described"
      | "no_valid_authorization"
      | "not_received"
      | "other"
      | "service_not_as_described";
    readonly service_not_as_described?:
      | ({
          readonly additional_documentation?: string | "";
          readonly canceled_at?: number | "";
          readonly cancellation_reason?: string | "";
          readonly explanation?: string | "";
          readonly received_at?: number | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly transaction?: string;
  readonly treasury?: { readonly received_debit: string } & {
    readonly [x: string]: Schema.Json;
  };
};
export type PostIssuingDisputesOutput = Stripeissuing_dispute;
export type PostIssuingDisputesError = Stripeerror;
export type GetIssuingDisputesDisputeInput = {
  readonly dispute: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetIssuingDisputesDisputeOutput = Stripeissuing_dispute;
export type GetIssuingDisputesDisputeError = Stripeerror;
export type PostIssuingDisputesDisputeInput = {
  readonly amount?: number;
  readonly evidence?: {
    readonly canceled?:
      | ({
          readonly additional_documentation?: string | "";
          readonly canceled_at?: number | "";
          readonly cancellation_policy_provided?: boolean | "";
          readonly cancellation_reason?: string | "";
          readonly expected_at?: number | "";
          readonly explanation?: string | "";
          readonly product_description?: string | "";
          readonly product_type?: "" | "merchandise" | "service";
          readonly return_status?: "" | "merchant_rejected" | "successful";
          readonly returned_at?: number | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly duplicate?:
      | ({
          readonly additional_documentation?: string | "";
          readonly card_statement?: string | "";
          readonly cash_receipt?: string | "";
          readonly check_image?: string | "";
          readonly explanation?: string | "";
          readonly original_transaction?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly fraudulent?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly merchandise_not_as_described?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
          readonly received_at?: number | "";
          readonly return_description?: string | "";
          readonly return_status?: "" | "merchant_rejected" | "successful";
          readonly returned_at?: number | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly no_valid_authorization?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly not_received?:
      | ({
          readonly additional_documentation?: string | "";
          readonly expected_at?: number | "";
          readonly explanation?: string | "";
          readonly product_description?: string | "";
          readonly product_type?: "" | "merchandise" | "service";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly other?:
      | ({
          readonly additional_documentation?: string | "";
          readonly explanation?: string | "";
          readonly product_description?: string | "";
          readonly product_type?: "" | "merchandise" | "service";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly reason?:
      | "canceled"
      | "duplicate"
      | "fraudulent"
      | "merchandise_not_as_described"
      | "no_valid_authorization"
      | "not_received"
      | "other"
      | "service_not_as_described";
    readonly service_not_as_described?:
      | ({
          readonly additional_documentation?: string | "";
          readonly canceled_at?: number | "";
          readonly cancellation_reason?: string | "";
          readonly explanation?: string | "";
          readonly received_at?: number | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly dispute: string;
};
export type PostIssuingDisputesDisputeOutput = Stripeissuing_dispute;
export type PostIssuingDisputesDisputeError = Stripeerror;
export type PostIssuingDisputesDisputeSubmitInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly dispute: string;
};
export type PostIssuingDisputesDisputeSubmitOutput = Stripeissuing_dispute;
export type PostIssuingDisputesDisputeSubmitError = Stripeerror;

export const GetIssuingDisputesInput = Schema.Struct({
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
  status: Schema.optionalKey(
    Schema.Literals(["expired", "lost", "submitted", "unsubmitted", "won"]),
  ),
  transaction: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetIssuingDisputesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeissuing_dispute),
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
          new globalThis.RegExp("^\\/v1\\/issuing\\/disputes", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/issuing\\/disputes",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "IssuingDisputeList", description: "" });
export const GetIssuingDisputesError = Stripeerror;
export const PostIssuingDisputesInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The dispute amount in the card's currency and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). If not set, defaults to the full transaction amount.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  evidence: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        canceled: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                canceled_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                cancellation_policy_provided: Schema.optionalKey(
                  Schema.Union([Schema.Boolean, Schema.Literal("")]),
                ),
                cancellation_reason: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                expected_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_type: Schema.optionalKey(
                  Schema.Literals(["", "merchandise", "service"]),
                ),
                return_status: Schema.optionalKey(
                  Schema.Literals(["", "merchant_rejected", "successful"]),
                ),
                returned_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
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
            ).annotate({ title: "canceled" }),
            Schema.Literal(""),
          ]),
        ),
        duplicate: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                card_statement: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                cash_receipt: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                check_image: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                original_transaction: Schema.optionalKey(
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
            ).annotate({ title: "duplicate" }),
            Schema.Literal(""),
          ]),
        ),
        fraudulent: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
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
            ).annotate({ title: "fraudulent" }),
            Schema.Literal(""),
          ]),
        ),
        merchandise_not_as_described: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                received_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                return_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                return_status: Schema.optionalKey(
                  Schema.Literals(["", "merchant_rejected", "successful"]),
                ),
                returned_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
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
            ).annotate({ title: "merchandise_not_as_described" }),
            Schema.Literal(""),
          ]),
        ),
        no_valid_authorization: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
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
            ).annotate({ title: "no_valid_authorization" }),
            Schema.Literal(""),
          ]),
        ),
        not_received: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                expected_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_type: Schema.optionalKey(
                  Schema.Literals(["", "merchandise", "service"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "not_received" }),
            Schema.Literal(""),
          ]),
        ),
        other: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_type: Schema.optionalKey(
                  Schema.Literals(["", "merchandise", "service"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "other" }),
            Schema.Literal(""),
          ]),
        ),
        reason: Schema.optionalKey(
          Schema.Literals([
            "canceled",
            "duplicate",
            "fraudulent",
            "merchandise_not_as_described",
            "no_valid_authorization",
            "not_received",
            "other",
            "service_not_as_described",
          ]),
        ),
        service_not_as_described: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                canceled_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                cancellation_reason: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                received_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
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
            ).annotate({ title: "service_not_as_described" }),
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
      title: "evidence_param",
      description: "Evidence provided for the dispute.",
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
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  transaction: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the issuing transaction to create a dispute for. For transaction on Treasury FinancialAccounts, use `treasury.received_debit`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  treasury: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        received_debit: Schema.String.check(
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
    ).annotate({
      title: "treasury_param",
      description: "Params for disputes related to Treasury FinancialAccounts",
    }),
  ),
});
export const PostIssuingDisputesOutput = Stripeissuing_dispute;
export const PostIssuingDisputesError = Stripeerror;
export const GetIssuingDisputesDisputeInput = Schema.Struct({
  dispute: Schema.String.check(
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
export const GetIssuingDisputesDisputeOutput = Stripeissuing_dispute;
export const GetIssuingDisputesDisputeError = Stripeerror;
export const PostIssuingDisputesDisputeInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The dispute amount in the card's currency and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  evidence: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        canceled: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                canceled_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                cancellation_policy_provided: Schema.optionalKey(
                  Schema.Union([Schema.Boolean, Schema.Literal("")]),
                ),
                cancellation_reason: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                expected_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_type: Schema.optionalKey(
                  Schema.Literals(["", "merchandise", "service"]),
                ),
                return_status: Schema.optionalKey(
                  Schema.Literals(["", "merchant_rejected", "successful"]),
                ),
                returned_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
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
            ).annotate({ title: "canceled" }),
            Schema.Literal(""),
          ]),
        ),
        duplicate: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                card_statement: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                cash_receipt: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                check_image: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                original_transaction: Schema.optionalKey(
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
            ).annotate({ title: "duplicate" }),
            Schema.Literal(""),
          ]),
        ),
        fraudulent: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
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
            ).annotate({ title: "fraudulent" }),
            Schema.Literal(""),
          ]),
        ),
        merchandise_not_as_described: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                received_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                return_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                return_status: Schema.optionalKey(
                  Schema.Literals(["", "merchant_rejected", "successful"]),
                ),
                returned_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
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
            ).annotate({ title: "merchandise_not_as_described" }),
            Schema.Literal(""),
          ]),
        ),
        no_valid_authorization: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
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
            ).annotate({ title: "no_valid_authorization" }),
            Schema.Literal(""),
          ]),
        ),
        not_received: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                expected_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_type: Schema.optionalKey(
                  Schema.Literals(["", "merchandise", "service"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "not_received" }),
            Schema.Literal(""),
          ]),
        ),
        other: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                product_type: Schema.optionalKey(
                  Schema.Literals(["", "merchandise", "service"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "other" }),
            Schema.Literal(""),
          ]),
        ),
        reason: Schema.optionalKey(
          Schema.Literals([
            "canceled",
            "duplicate",
            "fraudulent",
            "merchandise_not_as_described",
            "no_valid_authorization",
            "not_received",
            "other",
            "service_not_as_described",
          ]),
        ),
        service_not_as_described: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                additional_documentation: Schema.optionalKey(
                  Schema.Union([Schema.String, Schema.Literal("")]),
                ),
                canceled_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                cancellation_reason: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                explanation: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(2500).annotate({
                        expected: "a string with at most 2500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                received_at: Schema.optionalKey(
                  Schema.Union([
                    Schema.Number.annotate({ format: "unix-time" }).check(
                      Schema.isInt().annotate({ expected: "an integer" }),
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
            ).annotate({ title: "service_not_as_described" }),
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
      title: "evidence_param",
      description: "Evidence provided for the dispute.",
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
  dispute: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostIssuingDisputesDisputeOutput = Stripeissuing_dispute;
export const PostIssuingDisputesDisputeError = Stripeerror;
export const PostIssuingDisputesDisputeSubmitInput = Schema.Struct({
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
  dispute: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostIssuingDisputesDisputeSubmitOutput = Stripeissuing_dispute;
export const PostIssuingDisputesDisputeSubmitError = Stripeerror;
/**
 * The GetIssuingDisputesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetIssuingDisputesOperation: StripeOperation & {
  readonly input: typeof GetIssuingDisputesInput;
  readonly output: typeof GetIssuingDisputesOutput;
  readonly error: typeof GetIssuingDisputesError;
} = {
  name: "GetIssuingDisputes",
  method: "GET",
  path: "/v1/issuing/disputes",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
    "transaction",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetIssuingDisputesInput,
  output: GetIssuingDisputesOutput,
  error: GetIssuingDisputesError,
};
/**
 * The PostIssuingDisputesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIssuingDisputesOperation: StripeOperation & {
  readonly input: typeof PostIssuingDisputesInput;
  readonly output: typeof PostIssuingDisputesOutput;
  readonly error: typeof PostIssuingDisputesError;
} = {
  name: "PostIssuingDisputes",
  method: "POST",
  path: "/v1/issuing/disputes",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIssuingDisputesInput,
  output: PostIssuingDisputesOutput,
  error: PostIssuingDisputesError,
};
/**
 * The GetIssuingDisputesDisputeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetIssuingDisputesDisputeOperation: StripeOperation & {
  readonly input: typeof GetIssuingDisputesDisputeInput;
  readonly output: typeof GetIssuingDisputesDisputeOutput;
  readonly error: typeof GetIssuingDisputesDisputeError;
} = {
  name: "GetIssuingDisputesDispute",
  method: "GET",
  path: "/v1/issuing/disputes/{dispute}",
  pathParameters: ["dispute"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetIssuingDisputesDisputeInput,
  output: GetIssuingDisputesDisputeOutput,
  error: GetIssuingDisputesDisputeError,
};
/**
 * The PostIssuingDisputesDisputeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIssuingDisputesDisputeOperation: StripeOperation & {
  readonly input: typeof PostIssuingDisputesDisputeInput;
  readonly output: typeof PostIssuingDisputesDisputeOutput;
  readonly error: typeof PostIssuingDisputesDisputeError;
} = {
  name: "PostIssuingDisputesDispute",
  method: "POST",
  path: "/v1/issuing/disputes/{dispute}",
  pathParameters: ["dispute"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIssuingDisputesDisputeInput,
  output: PostIssuingDisputesDisputeOutput,
  error: PostIssuingDisputesDisputeError,
};
/**
 * The PostIssuingDisputesDisputeSubmitOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostIssuingDisputesDisputeSubmitOperation: StripeOperation & {
  readonly input: typeof PostIssuingDisputesDisputeSubmitInput;
  readonly output: typeof PostIssuingDisputesDisputeSubmitOutput;
  readonly error: typeof PostIssuingDisputesDisputeSubmitError;
} = {
  name: "PostIssuingDisputesDisputeSubmit",
  method: "POST",
  path: "/v1/issuing/disputes/{dispute}/submit",
  pathParameters: ["dispute"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostIssuingDisputesDisputeSubmitInput,
  output: PostIssuingDisputesDisputeSubmitOutput,
  error: PostIssuingDisputesDisputeSubmitError,
};
/**
 * The makeIssuingDisputesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeIssuingDisputesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetIssuingDisputes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetIssuingDisputes = Effect.fn("issuingDisputes.GetIssuingDisputes")(
    function* (input: GetIssuingDisputesInput) {
      const response: GetIssuingDisputesOutput = yield* client.invoke(
        GetIssuingDisputesOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostIssuingDisputes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIssuingDisputes = Effect.fn("issuingDisputes.PostIssuingDisputes")(
    function* (input: PostIssuingDisputesInput) {
      const response: PostIssuingDisputesOutput = yield* client.invoke(
        PostIssuingDisputesOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetIssuingDisputesDispute function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetIssuingDisputesDispute = Effect.fn(
    "issuingDisputes.GetIssuingDisputesDispute",
  )(function* (input: GetIssuingDisputesDisputeInput) {
    const response: GetIssuingDisputesDisputeOutput = yield* client.invoke(
      GetIssuingDisputesDisputeOperation,
      input,
    );
    return response;
  });
  /**
   * The PostIssuingDisputesDispute function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIssuingDisputesDispute = Effect.fn(
    "issuingDisputes.PostIssuingDisputesDispute",
  )(function* (input: PostIssuingDisputesDisputeInput) {
    const response: PostIssuingDisputesDisputeOutput = yield* client.invoke(
      PostIssuingDisputesDisputeOperation,
      input,
    );
    return response;
  });
  /**
   * The PostIssuingDisputesDisputeSubmit function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostIssuingDisputesDisputeSubmit = Effect.fn(
    "issuingDisputes.PostIssuingDisputesDisputeSubmit",
  )(function* (input: PostIssuingDisputesDisputeSubmitInput) {
    const response: PostIssuingDisputesDisputeSubmitOutput =
      yield* client.invoke(PostIssuingDisputesDisputeSubmitOperation, input);
    return response;
  });
  return {
    GetIssuingDisputes,
    PostIssuingDisputes,
    GetIssuingDisputesDispute,
    PostIssuingDisputesDispute,
    PostIssuingDisputesDisputeSubmit,
  };
});
