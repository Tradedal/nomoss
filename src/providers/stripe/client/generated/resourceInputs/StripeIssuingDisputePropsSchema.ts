// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeIssuingDisputeProps = {
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

export const StripeIssuingDisputeResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "issuing-dispute",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/IssuingDisputeId"],
  });
export const StripeIssuingDisputePropsSchema = annotateResourceSchema(
  Schema.Struct({
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
        description:
          "Specifies which fields in the response should be expanded.",
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
        description:
          "Params for disputes related to Treasury FinancialAccounts",
      }),
    ),
  }),
  StripeIssuingDisputeResourceSchema,
);
