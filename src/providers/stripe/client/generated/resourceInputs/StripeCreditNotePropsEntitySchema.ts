// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  type ResourceInputJson,
  ResourceInputJsonSchema,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeCreditNoteResourceSchema } from "./StripeCreditNotePropsSchema.js";
import { StripeResourceEntityInputAlternatives_20 } from "./StripeResourceEntityInputAlternatives_20.js";
import { StripeResourceEntityInputAlternatives_21 } from "./StripeResourceEntityInputAlternatives_21.js";

export type StripeCreditNotePropsEntity = {
  readonly amount?: number;
  readonly credit_amount?: number;
  readonly effective_at?: number;
  readonly email_type?: "credit_note" | "none";
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "invoice";
  }>;
  readonly lines?: ReadonlyArray<
    {
      readonly amount?: number;
      readonly description?: string;
      readonly invoice_line_item?: string;
      readonly metadata?: { readonly [x: string]: string };
      readonly quantity?: number;
      readonly tax_amounts?:
        | ReadonlyArray<
            {
              readonly amount: number;
              readonly tax_rate: string;
              readonly taxable_amount: number;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly tax_rates?: ReadonlyArray<string> | "";
      readonly type: "custom_line_item" | "invoice_line_item";
      readonly unit_amount?: number;
      readonly unit_amount_decimal?: string;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly memo?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly out_of_band_amount?: number;
  readonly reason?:
    | "duplicate"
    | "fraudulent"
    | "order_change"
    | "product_unsatisfactory";
  readonly refund_amount?: number;
  readonly refunds?: ReadonlyArray<
    {
      readonly amount_refunded?: number;
      readonly payment_record_refund?: {
        readonly payment_record: string;
        readonly refund_group: string;
      } & { readonly [x: string]: Schema.Json };
      readonly refund?: StripeResourceEntityInputAlternatives_20;
      readonly type?: "payment_record_refund" | "refund";
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputAlternatives_20;
    }
  >;
  readonly shipping_cost?: {
    readonly shipping_rate?: StripeResourceEntityInputAlternatives_21;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_21;
  };
};

export const StripeCreditNotePropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The integer amount in cents (or local equivalent) representing the total amount of the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    credit_amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The integer amount in cents (or local equivalent) representing the amount to credit the customer's balance, which will be automatically applied to their next invoice.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    effective_at: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    email_type: Schema.optionalKey(
      Schema.Literals(["credit_note", "none"]).annotate({
        description:
          "Type of email to send to the customer, one of `credit_note` or `none` and the default is `credit_note`.",
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
    invoice: Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("stripe"),
            service: Schema.Literal("billing"),
            resource: Schema.Literal("invoice"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["InvoiceId"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
    ]),
    lines: Schema.optionalKey(
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            amount: Schema.optionalKey(Schema.Int),
            description: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            invoice_line_item: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            metadata: Schema.optionalKey(
              Schema.Record(Schema.String, Schema.String),
            ),
            quantity: Schema.optionalKey(Schema.Int),
            tax_amounts: Schema.optionalKey(
              Schema.Union([
                Schema.Array(
                  Schema.StructWithRest(
                    Schema.Struct({
                      amount: Schema.Int,
                      tax_rate: Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                      taxable_amount: Schema.Int,
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "tax_amount_with_tax_rate_param" }),
                ),
                Schema.Literal(""),
              ]),
            ),
            tax_rates: Schema.optionalKey(
              Schema.Union([
                Schema.Array(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                Schema.Literal(""),
              ]),
            ),
            type: Schema.Literals(["custom_line_item", "invoice_line_item"]),
            unit_amount: Schema.optionalKey(Schema.Int),
            unit_amount_decimal: Schema.optionalKey(
              Schema.String.annotate({ format: "decimal" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "credit_note_line_item_params" }),
      ).annotate({
        description:
          "Line items that make up the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      }),
    ),
    memo: Schema.optionalKey(
      Schema.String.annotate({
        description: "The credit note's memo appears on the credit note PDF.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    out_of_band_amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The integer amount in cents (or local equivalent) representing the amount that is credited outside of Stripe.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    reason: Schema.optionalKey(
      Schema.Literals([
        "duplicate",
        "fraudulent",
        "order_change",
        "product_unsatisfactory",
      ]).annotate({
        description:
          "Reason for issuing this credit note, one of `duplicate`, `fraudulent`, `order_change`, or `product_unsatisfactory`",
      }),
    ),
    refund_amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The integer amount in cents (or local equivalent) representing the amount to refund. If set, a refund will be created for the charge associated with the invoice.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    refunds: Schema.optionalKey(
      Schema.Array(
        Schema.StructWithRest(
          Schema.Struct({
            amount_refunded: Schema.optionalKey(Schema.Int),
            payment_record_refund: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  payment_record: Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                  refund_group: Schema.String.check(
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
              ).annotate({ title: "payment_record_refund_params" }),
            ),
            refund: Schema.optionalKey(
              StripeResourceEntityInputAlternatives_20,
            ),
            type: Schema.optionalKey(
              Schema.Literals(["payment_record_refund", "refund"]),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_20,
              ]),
            ),
          ],
        ).annotate({ title: "credit_note_refund_params" }),
      ).annotate({ description: "Refunds to link to this credit note." }),
    ),
    shipping_cost: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          shipping_rate: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_21,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_21,
            ]),
          ),
        ],
      ).annotate({
        title: "credit_note_shipping_cost",
        description:
          "When shipping_cost contains the shipping_rate from the invoice, the shipping_cost is included in the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      }),
    ),
  }),
  StripeCreditNoteResourceSchema,
);
