// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeTreasuryOutboundPaymentProps = {
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

export const StripeTreasuryOutboundPaymentResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "treasury-outbound-payment",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryOutboundPaymentId"],
  });
export const StripeTreasuryOutboundPaymentPropsSchema = annotateResourceSchema(
  Schema.Struct({
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
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        country: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        line1: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        line2: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        postal_code: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        state: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
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
        description:
          "Specifies which fields in the response should be expanded.",
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
  }),
  StripeTreasuryOutboundPaymentResourceSchema,
);
