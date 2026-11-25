// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripecredit_note,
  Stripecredit_note_line_item,
  Stripeerror,
} from "./models/common.js";

export type GetCreditNotesInput = {
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly customer?: string;
  readonly customer_account?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly invoice?: string;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCreditNotesOutput = {
  readonly data: ReadonlyArray<Stripecredit_note>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCreditNotesError = Stripeerror;
export type PostCreditNotesInput = {
  readonly amount?: number;
  readonly credit_amount?: number;
  readonly effective_at?: number;
  readonly email_type?: "credit_note" | "none";
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
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
      readonly refund?: string;
      readonly type?: "payment_record_refund" | "refund";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly shipping_cost?: { readonly shipping_rate?: string } & {
    readonly [x: string]: Schema.Json;
  };
};
export type PostCreditNotesOutput = Stripecredit_note;
export type PostCreditNotesError = Stripeerror;
export type GetCreditNotesPreviewInput = {
  readonly amount?: number;
  readonly credit_amount?: number;
  readonly effective_at?: number;
  readonly email_type?: "credit_note" | "none";
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
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
      readonly refund?: string;
      readonly type?: "payment_record_refund" | "refund";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly shipping_cost?: { readonly shipping_rate?: string } & {
    readonly [x: string]: Schema.Json;
  };
};
export type GetCreditNotesPreviewOutput = Stripecredit_note;
export type GetCreditNotesPreviewError = Stripeerror;
export type GetCreditNotesPreviewLinesInput = {
  readonly amount?: number;
  readonly credit_amount?: number;
  readonly effective_at?: number;
  readonly email_type?: "credit_note" | "none";
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly invoice: string;
  readonly limit?: number;
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
      readonly refund?: string;
      readonly type?: "payment_record_refund" | "refund";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly shipping_cost?: { readonly shipping_rate?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly starting_after?: string;
};
export type GetCreditNotesPreviewLinesOutput = {
  readonly data: ReadonlyArray<Stripecredit_note_line_item>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCreditNotesPreviewLinesError = Stripeerror;
export type GetCreditNotesCreditNoteLinesInput = {
  readonly credit_note: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetCreditNotesCreditNoteLinesOutput = {
  readonly data: ReadonlyArray<Stripecredit_note_line_item>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetCreditNotesCreditNoteLinesError = Stripeerror;
export type GetCreditNotesIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetCreditNotesIdOutput = Stripecredit_note;
export type GetCreditNotesIdError = Stripeerror;
export type PostCreditNotesIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly memo?: string;
  readonly metadata?: { readonly [x: string]: string };
  readonly id: string;
};
export type PostCreditNotesIdOutput = Stripecredit_note;
export type PostCreditNotesIdError = Stripeerror;
export type PostCreditNotesIdVoidInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type PostCreditNotesIdVoidOutput = Stripecredit_note;
export type PostCreditNotesIdVoidError = Stripeerror;

export const GetCreditNotesInput = Schema.Struct({
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
  customer_account: Schema.optionalKey(
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
  invoice: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
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
export const GetCreditNotesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecredit_note),
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
).annotate({ title: "CreditNotesList", description: "" });
export const GetCreditNotesError = Stripeerror;
export const PostCreditNotesInput = Schema.Struct({
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  invoice: Schema.String.annotate({ description: "ID of the invoice." }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
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
          refund: Schema.optionalKey(Schema.String),
          type: Schema.optionalKey(
            Schema.Literals(["payment_record_refund", "refund"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "credit_note_refund_params" }),
    ).annotate({ description: "Refunds to link to this credit note." }),
  ),
  shipping_cost: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        shipping_rate: Schema.optionalKey(
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
    ).annotate({
      title: "credit_note_shipping_cost",
      description:
        "When shipping_cost contains the shipping_rate from the invoice, the shipping_cost is included in the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
    }),
  ),
});
export const PostCreditNotesOutput = Stripecredit_note;
export const PostCreditNotesError = Stripeerror;
export const GetCreditNotesPreviewInput = Schema.Struct({
  amount: Schema.optionalKey(Schema.Int),
  credit_amount: Schema.optionalKey(Schema.Int),
  effective_at: Schema.optionalKey(
    Schema.Number.annotate({ format: "unix-time" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
  ),
  email_type: Schema.optionalKey(Schema.Literals(["credit_note", "none"])),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
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
    ),
  ),
  memo: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
  out_of_band_amount: Schema.optionalKey(Schema.Int),
  reason: Schema.optionalKey(
    Schema.Literals([
      "duplicate",
      "fraudulent",
      "order_change",
      "product_unsatisfactory",
    ]),
  ),
  refund_amount: Schema.optionalKey(Schema.Int),
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
          refund: Schema.optionalKey(Schema.String),
          type: Schema.optionalKey(
            Schema.Literals(["payment_record_refund", "refund"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "credit_note_refund_params" }),
    ),
  ),
  shipping_cost: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        shipping_rate: Schema.optionalKey(
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
    ).annotate({ title: "credit_note_shipping_cost" }),
  ),
});
export const GetCreditNotesPreviewOutput = Stripecredit_note;
export const GetCreditNotesPreviewError = Stripeerror;
export const GetCreditNotesPreviewLinesInput = Schema.Struct({
  amount: Schema.optionalKey(Schema.Int),
  credit_amount: Schema.optionalKey(Schema.Int),
  effective_at: Schema.optionalKey(
    Schema.Number.annotate({ format: "unix-time" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
  ),
  email_type: Schema.optionalKey(Schema.Literals(["credit_note", "none"])),
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
  invoice: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  limit: Schema.optionalKey(Schema.Int),
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
    ),
  ),
  memo: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
  out_of_band_amount: Schema.optionalKey(Schema.Int),
  reason: Schema.optionalKey(
    Schema.Literals([
      "duplicate",
      "fraudulent",
      "order_change",
      "product_unsatisfactory",
    ]),
  ),
  refund_amount: Schema.optionalKey(Schema.Int),
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
          refund: Schema.optionalKey(Schema.String),
          type: Schema.optionalKey(
            Schema.Literals(["payment_record_refund", "refund"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "credit_note_refund_params" }),
    ),
  ),
  shipping_cost: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        shipping_rate: Schema.optionalKey(
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
    ).annotate({ title: "credit_note_shipping_cost" }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetCreditNotesPreviewLinesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecredit_note_line_item).annotate({
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
).annotate({ title: "CreditNoteLinesList", description: "" });
export const GetCreditNotesPreviewLinesError = Stripeerror;
export const GetCreditNotesCreditNoteLinesInput = Schema.Struct({
  credit_note: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
export const GetCreditNotesCreditNoteLinesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecredit_note_line_item).annotate({
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
).annotate({ title: "CreditNoteLinesList", description: "" });
export const GetCreditNotesCreditNoteLinesError = Stripeerror;
export const GetCreditNotesIdInput = Schema.Struct({
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
export const GetCreditNotesIdOutput = Stripecredit_note;
export const GetCreditNotesIdError = Stripeerror;
export const PostCreditNotesIdInput = Schema.Struct({
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
  memo: Schema.optionalKey(
    Schema.String.annotate({ description: "Credit note memo." }).check(
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
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostCreditNotesIdOutput = Stripecredit_note;
export const PostCreditNotesIdError = Stripeerror;
export const PostCreditNotesIdVoidInput = Schema.Struct({
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
export const PostCreditNotesIdVoidOutput = Stripecredit_note;
export const PostCreditNotesIdVoidError = Stripeerror;
/**
 * The GetCreditNotesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCreditNotesOperation: StripeOperation & {
  readonly input: typeof GetCreditNotesInput;
  readonly output: typeof GetCreditNotesOutput;
  readonly error: typeof GetCreditNotesError;
} = {
  name: "GetCreditNotes",
  method: "GET",
  path: "/v1/credit_notes",
  pathParameters: [],
  queryParameters: [
    "created",
    "customer",
    "customer_account",
    "ending_before",
    "expand",
    "invoice",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCreditNotesInput,
  output: GetCreditNotesOutput,
  error: GetCreditNotesError,
};
/**
 * The PostCreditNotesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCreditNotesOperation: StripeOperation & {
  readonly input: typeof PostCreditNotesInput;
  readonly output: typeof PostCreditNotesOutput;
  readonly error: typeof PostCreditNotesError;
} = {
  name: "PostCreditNotes",
  method: "POST",
  path: "/v1/credit_notes",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCreditNotesInput,
  output: PostCreditNotesOutput,
  error: PostCreditNotesError,
};
/**
 * The GetCreditNotesPreviewOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCreditNotesPreviewOperation: StripeOperation & {
  readonly input: typeof GetCreditNotesPreviewInput;
  readonly output: typeof GetCreditNotesPreviewOutput;
  readonly error: typeof GetCreditNotesPreviewError;
} = {
  name: "GetCreditNotesPreview",
  method: "GET",
  path: "/v1/credit_notes/preview",
  pathParameters: [],
  queryParameters: [
    "amount",
    "credit_amount",
    "effective_at",
    "email_type",
    "expand",
    "invoice",
    "lines",
    "memo",
    "metadata",
    "out_of_band_amount",
    "reason",
    "refund_amount",
    "refunds",
    "shipping_cost",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCreditNotesPreviewInput,
  output: GetCreditNotesPreviewOutput,
  error: GetCreditNotesPreviewError,
};
/**
 * The GetCreditNotesPreviewLinesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCreditNotesPreviewLinesOperation: StripeOperation & {
  readonly input: typeof GetCreditNotesPreviewLinesInput;
  readonly output: typeof GetCreditNotesPreviewLinesOutput;
  readonly error: typeof GetCreditNotesPreviewLinesError;
} = {
  name: "GetCreditNotesPreviewLines",
  method: "GET",
  path: "/v1/credit_notes/preview/lines",
  pathParameters: [],
  queryParameters: [
    "amount",
    "credit_amount",
    "effective_at",
    "email_type",
    "ending_before",
    "expand",
    "invoice",
    "limit",
    "lines",
    "memo",
    "metadata",
    "out_of_band_amount",
    "reason",
    "refund_amount",
    "refunds",
    "shipping_cost",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCreditNotesPreviewLinesInput,
  output: GetCreditNotesPreviewLinesOutput,
  error: GetCreditNotesPreviewLinesError,
};
/**
 * The GetCreditNotesCreditNoteLinesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCreditNotesCreditNoteLinesOperation: StripeOperation & {
  readonly input: typeof GetCreditNotesCreditNoteLinesInput;
  readonly output: typeof GetCreditNotesCreditNoteLinesOutput;
  readonly error: typeof GetCreditNotesCreditNoteLinesError;
} = {
  name: "GetCreditNotesCreditNoteLines",
  method: "GET",
  path: "/v1/credit_notes/{credit_note}/lines",
  pathParameters: ["credit_note"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCreditNotesCreditNoteLinesInput,
  output: GetCreditNotesCreditNoteLinesOutput,
  error: GetCreditNotesCreditNoteLinesError,
};
/**
 * The GetCreditNotesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetCreditNotesIdOperation: StripeOperation & {
  readonly input: typeof GetCreditNotesIdInput;
  readonly output: typeof GetCreditNotesIdOutput;
  readonly error: typeof GetCreditNotesIdError;
} = {
  name: "GetCreditNotesId",
  method: "GET",
  path: "/v1/credit_notes/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetCreditNotesIdInput,
  output: GetCreditNotesIdOutput,
  error: GetCreditNotesIdError,
};
/**
 * The PostCreditNotesIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCreditNotesIdOperation: StripeOperation & {
  readonly input: typeof PostCreditNotesIdInput;
  readonly output: typeof PostCreditNotesIdOutput;
  readonly error: typeof PostCreditNotesIdError;
} = {
  name: "PostCreditNotesId",
  method: "POST",
  path: "/v1/credit_notes/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCreditNotesIdInput,
  output: PostCreditNotesIdOutput,
  error: PostCreditNotesIdError,
};
/**
 * The PostCreditNotesIdVoidOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostCreditNotesIdVoidOperation: StripeOperation & {
  readonly input: typeof PostCreditNotesIdVoidInput;
  readonly output: typeof PostCreditNotesIdVoidOutput;
  readonly error: typeof PostCreditNotesIdVoidError;
} = {
  name: "PostCreditNotesIdVoid",
  method: "POST",
  path: "/v1/credit_notes/{id}/void",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostCreditNotesIdVoidInput,
  output: PostCreditNotesIdVoidOutput,
  error: PostCreditNotesIdVoidError,
};
/**
 * The makeCreditNotesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeCreditNotesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetCreditNotes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCreditNotes = Effect.fn("creditNotes.GetCreditNotes")(function* (
    input: GetCreditNotesInput,
  ) {
    const response: GetCreditNotesOutput = yield* client.invoke(
      GetCreditNotesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCreditNotes function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCreditNotes = Effect.fn("creditNotes.PostCreditNotes")(function* (
    input: PostCreditNotesInput,
  ) {
    const response: PostCreditNotesOutput = yield* client.invoke(
      PostCreditNotesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCreditNotesPreview function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCreditNotesPreview = Effect.fn("creditNotes.GetCreditNotesPreview")(
    function* (input: GetCreditNotesPreviewInput) {
      const response: GetCreditNotesPreviewOutput = yield* client.invoke(
        GetCreditNotesPreviewOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetCreditNotesPreviewLines function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCreditNotesPreviewLines = Effect.fn(
    "creditNotes.GetCreditNotesPreviewLines",
  )(function* (input: GetCreditNotesPreviewLinesInput) {
    const response: GetCreditNotesPreviewLinesOutput = yield* client.invoke(
      GetCreditNotesPreviewLinesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCreditNotesCreditNoteLines function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCreditNotesCreditNoteLines = Effect.fn(
    "creditNotes.GetCreditNotesCreditNoteLines",
  )(function* (input: GetCreditNotesCreditNoteLinesInput) {
    const response: GetCreditNotesCreditNoteLinesOutput = yield* client.invoke(
      GetCreditNotesCreditNoteLinesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetCreditNotesId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCreditNotesId = Effect.fn("creditNotes.GetCreditNotesId")(function* (
    input: GetCreditNotesIdInput,
  ) {
    const response: GetCreditNotesIdOutput = yield* client.invoke(
      GetCreditNotesIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCreditNotesId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCreditNotesId = Effect.fn("creditNotes.PostCreditNotesId")(
    function* (input: PostCreditNotesIdInput) {
      const response: PostCreditNotesIdOutput = yield* client.invoke(
        PostCreditNotesIdOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostCreditNotesIdVoid function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCreditNotesIdVoid = Effect.fn("creditNotes.PostCreditNotesIdVoid")(
    function* (input: PostCreditNotesIdVoidInput) {
      const response: PostCreditNotesIdVoidOutput = yield* client.invoke(
        PostCreditNotesIdVoidOperation,
        input,
      );
      return response;
    },
  );
  return {
    GetCreditNotes,
    PostCreditNotes,
    GetCreditNotesPreview,
    GetCreditNotesPreviewLines,
    GetCreditNotesCreditNoteLines,
    GetCreditNotesId,
    PostCreditNotesId,
    PostCreditNotesIdVoid,
  };
});
