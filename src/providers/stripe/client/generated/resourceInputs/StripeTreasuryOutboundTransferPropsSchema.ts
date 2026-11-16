// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeTreasuryOutboundTransferProps = {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly destination_payment_method?: string;
  readonly destination_payment_method_data?: {
    readonly financial_account?: string;
    readonly type: "financial_account";
  } & { readonly [x: string]: Schema.Json };
  readonly destination_payment_method_options?: {
    readonly us_bank_account?:
      | ({ readonly network?: "ach" | "us_domestic_wire" } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly statement_descriptor?: string;
};

export const StripeTreasuryOutboundTransferResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "treasury-outbound-transfer",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/TreasuryOutboundTransferId"],
  });
export const StripeTreasuryOutboundTransferPropsSchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "Amount (in cents) to be transferred.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
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
    destination_payment_method: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The PaymentMethod to use as the payment instrument for the OutboundTransfer.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    destination_payment_method_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          financial_account: Schema.optionalKey(Schema.String),
          type: Schema.Literal("financial_account"),
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
          "Hash used to generate the PaymentMethod to be used for this OutboundTransfer. Exclusive with `destination_payment_method`.",
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
        description: "Hash describing payment method configuration details.",
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
          'Statement descriptor to be shown on the receiving end of an OutboundTransfer. Maximum 10 characters for `ach` transfers or 140 characters for `us_domestic_wire` transfers. The default value is "transfer". Can only include -#.$&*, spaces, and alphanumeric characters.',
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  }),
  StripeTreasuryOutboundTransferResourceSchema,
);
