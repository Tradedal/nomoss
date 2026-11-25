// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripecharge, Stripedispute, Striperefund } from "./models/charges.js";
import { Stripeerror } from "./models/common.js";

export type GetChargesInput = {
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
  readonly limit?: number;
  readonly payment_intent?: string;
  readonly starting_after?: string;
  readonly transfer_group?: string;
};
export type GetChargesOutput = {
  readonly data: ReadonlyArray<Stripecharge>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetChargesError = Stripeerror;
export type PostChargesInput = {
  readonly amount?: number;
  readonly application_fee?: number;
  readonly application_fee_amount?: number;
  readonly capture?: boolean;
  readonly card?:
    | ({
        readonly address_city?: string;
        readonly address_country?: string;
        readonly address_line1?: string;
        readonly address_line2?: string;
        readonly address_state?: string;
        readonly address_zip?: string;
        readonly cvc?: string;
        readonly encrypted?: string;
        readonly exp_month: number;
        readonly exp_year: number;
        readonly metadata?: { readonly [x: string]: string };
        readonly name?: string;
        readonly network_token?: { readonly number?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly number: string;
        readonly object?: "card";
        readonly swipe_data?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly currency?: string;
  readonly customer?: string;
  readonly description?: string;
  readonly destination?:
    | ({ readonly account: string; readonly amount?: number } & {
        readonly [x: string]: Schema.Json;
      })
    | string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly on_behalf_of?: string;
  readonly radar_options?: { readonly session?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly receipt_email?: string;
  readonly shipping?: {
    readonly address: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly carrier?: string;
    readonly name: string;
    readonly phone?: string;
    readonly tracking_number?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly source?: string;
  readonly statement_descriptor?: string;
  readonly statement_descriptor_suffix?: string;
  readonly transfer_data?: {
    readonly amount?: number;
    readonly description?: string;
    readonly destination: string;
  } & { readonly [x: string]: Schema.Json };
  readonly transfer_group?: string;
};
export type PostChargesOutput = Stripecharge;
export type PostChargesError = Stripeerror;
export type GetChargesSearchInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly page?: string;
  readonly query: string;
};
export type GetChargesSearchOutput = {
  readonly data: ReadonlyArray<Stripecharge>;
  readonly has_more: boolean;
  readonly next_page?: string | null;
  readonly object: "search_result";
  readonly total_count?: number;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetChargesSearchError = Stripeerror;
export type GetChargesChargeInput = {
  readonly charge: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetChargesChargeOutput = Stripecharge;
export type GetChargesChargeError = Stripeerror;
export type PostChargesChargeInput = {
  readonly customer?: string;
  readonly description?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly fraud_details?: {
    readonly user_report: "" | "fraudulent" | "safe";
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly receipt_email?: string;
  readonly shipping?: {
    readonly address: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly carrier?: string;
    readonly name: string;
    readonly phone?: string;
    readonly tracking_number?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly transfer_group?: string;
  readonly charge: string;
};
export type PostChargesChargeOutput = Stripecharge;
export type PostChargesChargeError = Stripeerror;
export type PostChargesChargeCaptureInput = {
  readonly amount?: number;
  readonly application_fee?: number;
  readonly application_fee_amount?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly receipt_email?: string;
  readonly statement_descriptor?: string;
  readonly statement_descriptor_suffix?: string;
  readonly transfer_data?: { readonly amount?: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly transfer_group?: string;
  readonly charge: string;
};
export type PostChargesChargeCaptureOutput = Stripecharge;
export type PostChargesChargeCaptureError = Stripeerror;
export type GetChargesChargeDisputeInput = {
  readonly charge: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetChargesChargeDisputeOutput = Stripedispute;
export type GetChargesChargeDisputeError = Stripeerror;
export type PostChargesChargeDisputeInput = {
  readonly evidence?: {
    readonly access_activity_log?: string;
    readonly appeal?:
      | ({
          readonly card?:
            | ({
                readonly reason_for_filing?: string | "";
                readonly supporting_files?: ReadonlyArray<string> | "";
              } & { readonly [x: string]: Schema.Json })
            | "";
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly billing_address?: string;
    readonly cancellation_policy?: string;
    readonly cancellation_policy_disclosure?: string;
    readonly cancellation_rebuttal?: string;
    readonly customer_communication?: string;
    readonly customer_email_address?: string;
    readonly customer_name?: string;
    readonly customer_purchase_ip?: string;
    readonly customer_signature?: string;
    readonly duplicate_charge_documentation?: string;
    readonly duplicate_charge_explanation?: string;
    readonly duplicate_charge_id?: string;
    readonly enhanced_evidence?:
      | ({
          readonly mastercard_compliance?: {
            readonly fee_acknowledged?: boolean;
          } & { readonly [x: string]: Schema.Json };
          readonly visa_compelling_evidence_3?: {
            readonly disputed_transaction?: {
              readonly customer_account_id?: string | "";
              readonly customer_device_fingerprint?: string | "";
              readonly customer_device_id?: string | "";
              readonly customer_email_address?: string | "";
              readonly customer_purchase_ip?: string | "";
              readonly merchandise_or_services?: "merchandise" | "services";
              readonly product_description?: string | "";
              readonly shipping_address?: {
                readonly city?: string | "";
                readonly country?: string | "";
                readonly line1?: string | "";
                readonly line2?: string | "";
                readonly postal_code?: string | "";
                readonly state?: string | "";
              } & { readonly [x: string]: Schema.Json };
            } & { readonly [x: string]: Schema.Json };
            readonly prior_undisputed_transactions?: ReadonlyArray<
              {
                readonly charge: string;
                readonly customer_account_id?: string | "";
                readonly customer_device_fingerprint?: string | "";
                readonly customer_device_id?: string | "";
                readonly customer_email_address?: string | "";
                readonly customer_purchase_ip?: string | "";
                readonly product_description?: string | "";
                readonly shipping_address?: {
                  readonly city?: string | "";
                  readonly country?: string | "";
                  readonly line1?: string | "";
                  readonly line2?: string | "";
                  readonly postal_code?: string | "";
                  readonly state?: string | "";
                } & { readonly [x: string]: Schema.Json };
              } & { readonly [x: string]: Schema.Json }
            >;
          } & { readonly [x: string]: Schema.Json };
          readonly visa_compliance?: { readonly fee_acknowledged?: boolean } & {
            readonly [x: string]: Schema.Json;
          };
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly product_description?: string;
    readonly receipt?: string;
    readonly refund_policy?: string;
    readonly refund_policy_disclosure?: string;
    readonly refund_refusal_explanation?: string;
    readonly service_date?: string;
    readonly service_documentation?: string;
    readonly shipping_address?: string;
    readonly shipping_carrier?: string;
    readonly shipping_date?: string;
    readonly shipping_documentation?: string;
    readonly shipping_tracking_number?: string;
    readonly uncategorized_file?: string;
    readonly uncategorized_text?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly intended_submission_method?:
    | "manual"
    | "prefer_manual"
    | "prefer_smart_disputes"
    | "smart_disputes";
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly submit?: boolean;
  readonly charge: string;
};
export type PostChargesChargeDisputeOutput = Stripedispute;
export type PostChargesChargeDisputeError = Stripeerror;
export type PostChargesChargeDisputeCloseInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly charge: string;
};
export type PostChargesChargeDisputeCloseOutput = Stripedispute;
export type PostChargesChargeDisputeCloseError = Stripeerror;
export type PostChargesChargeRefundInput = {
  readonly amount?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly instructions_email?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly payment_intent?: string;
  readonly reason?: "duplicate" | "fraudulent" | "requested_by_customer";
  readonly refund_application_fee?: boolean;
  readonly reverse_transfer?: boolean;
  readonly charge: string;
};
export type PostChargesChargeRefundOutput = Stripecharge;
export type PostChargesChargeRefundError = Stripeerror;
export type GetChargesChargeRefundsInput = {
  readonly charge: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetChargesChargeRefundsOutput = {
  readonly data: ReadonlyArray<Striperefund>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetChargesChargeRefundsError = Stripeerror;
export type PostChargesChargeRefundsInput = {
  readonly amount?: number;
  readonly currency?: string;
  readonly customer?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly instructions_email?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly origin?: "customer_balance";
  readonly payment_intent?: string;
  readonly reason?: "duplicate" | "fraudulent" | "requested_by_customer";
  readonly refund_application_fee?: boolean;
  readonly reverse_transfer?: boolean;
  readonly charge: string;
};
export type PostChargesChargeRefundsOutput = Striperefund;
export type PostChargesChargeRefundsError = Stripeerror;
export type GetChargesChargeRefundsRefundInput = {
  readonly charge: string;
  readonly expand?: ReadonlyArray<string>;
  readonly refund: string;
};
export type GetChargesChargeRefundsRefundOutput = Striperefund;
export type GetChargesChargeRefundsRefundError = Stripeerror;
export type PostChargesChargeRefundsRefundInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly charge: string;
  readonly refund: string;
};
export type PostChargesChargeRefundsRefundOutput = Striperefund;
export type PostChargesChargeRefundsRefundError = Stripeerror;

export const GetChargesInput = Schema.Struct({
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
  ending_before: Schema.optionalKey(Schema.String),
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
  payment_intent: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(Schema.String),
  transfer_group: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetChargesOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecharge),
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
          new globalThis.RegExp("^\\/v1\\/charges", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/charges",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "ChargeList", description: "" });
export const GetChargesError = Stripeerror;
export const PostChargesInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Amount intended to be collected by this payment. A positive integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  application_fee: Schema.optionalKey(Schema.Int),
  application_fee_amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A fee in cents (or local equivalent) that will be applied to the charge and transferred to the application owner's Stripe account. The request must be made with an OAuth key or the `Stripe-Account` header in order to take an application fee. For more information, see the application fees [documentation](https://docs.stripe.com/connect/direct-charges#collect-fees).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  capture: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether to immediately capture the charge. Defaults to `true`. When `false`, the charge issues an authorization (or pre-authorization), and will need to be [captured](https://docs.stripe.com/api#capture_charge) later. Uncaptured charges expire after a set number of days (7 by default). For more information, see the [authorizing charges and settling later](https://docs.stripe.com/charges/placing-a-hold) documentation.",
    }),
  ),
  card: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          address_city: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_country: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line1: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_line2: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_state: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          address_zip: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          cvc: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          encrypted: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          exp_month: Schema.Int,
          exp_year: Schema.Int,
          metadata: Schema.optionalKey(
            Schema.Record(Schema.String, Schema.String),
          ),
          name: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          network_token: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                number: Schema.optionalKey(
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
            ).annotate({ title: "source_deprecated_card_network_token" }),
          ),
          number: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          object: Schema.optionalKey(Schema.Literal("card")),
          swipe_data: Schema.optionalKey(
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
      ).annotate({ title: "customer_payment_source_card" }),
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ]).annotate({
      description:
        "A token, like the ones returned by [Stripe.js](https://stripe.com/docs/js).",
    }),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of an existing customer that will be charged in this request.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string which you can attach to a `Charge` object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing.",
    }).check(
      Schema.isMaxCodePoints(40000).annotate({
        expected: "a string with at most 40000 code points",
      }),
    ),
  ),
  destination: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          account: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          amount: Schema.optionalKey(Schema.Int),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "destination_specs" }),
      Schema.String,
    ]),
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
  on_behalf_of: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Stripe account ID for which these funds are intended. You can specify the business of record as the connected account using the `on_behalf_of` attribute on the charge. For details, see [Creating Separate Charges and Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers#settlement-merchant).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  radar_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        session: Schema.optionalKey(
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
      title: "radar_options_with_hidden_options",
      description:
        "Options to configure Radar. See [Radar Session](https://docs.stripe.com/radar/radar-session) for more information.",
    }),
  ),
  receipt_email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The email address to which this charge's [receipt](https://docs.stripe.com/dashboard/receipts) will be sent. The receipt will not be sent until the charge is paid, and receipts are only sent for payments in live mode. If this charge is for a [Customer](https://docs.stripe.com/api/customers/object), the email address specified here will override the customer's email address. If `receipt_email` is specified for a charge in live mode, a receipt will be sent regardless of your [email settings](https://dashboard.stripe.com/account/emails).",
    }).check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
  ),
  shipping: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.StructWithRest(
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
        ).annotate({ title: "optional_fields_address" }),
        carrier: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        name: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        phone: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        tracking_number: Schema.optionalKey(
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
      title: "optional_fields_shipping",
      description:
        "Shipping information for the charge. Helps prevent fraud on charges for physical goods.",
    }),
  ),
  source: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A payment source to be charged. This can be the ID of a [card](https://docs.stripe.com/api#cards) (i.e., credit or debit card), a [bank account](https://docs.stripe.com/api#bank_accounts), a [source](https://docs.stripe.com/api#sources), a [token](https://docs.stripe.com/api#tokens), or a [connected account](https://docs.stripe.com/connect/account-debits#charging-a-connected-account). For certain sources---namely, [cards](https://docs.stripe.com/api#cards), [bank accounts](https://docs.stripe.com/api#bank_accounts), and attached [sources](https://docs.stripe.com/api#sources)---you must also pass the ID of the associated customer.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For a non-card charge, text that appears on the customer's statement as the statement descriptor. This value overrides the account's default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors).\n\nFor a card charge, this value is ignored unless you don't specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.",
    }).check(
      Schema.isMaxCodePoints(22).annotate({
        expected: "a string with at most 22 code points",
      }),
    ),
  ),
  statement_descriptor_suffix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Provides information about a card charge. Concatenated to the account's [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer's statement. If the account has no prefix value, the suffix is concatenated to the account's statement descriptor.",
    }).check(
      Schema.isMaxCodePoints(22).annotate({
        expected: "a string with at most 22 code points",
      }),
    ),
  ),
  transfer_data: Schema.optionalKey(
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
        destination: Schema.String.check(
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
      title: "transfer_data_specs",
      description:
        "An optional dictionary including the account to automatically transfer to as part of a destination charge. [See the Connect documentation](https://docs.stripe.com/connect/destination-charges) for details.",
    }),
  ),
  transfer_group: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A string that identifies this transaction as part of a group. For details, see [Grouping transactions](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options).",
    }),
  ),
});
export const PostChargesOutput = Stripecharge;
export const PostChargesError = Stripeerror;
export const GetChargesSearchInput = Schema.Struct({
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
  page: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  query: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetChargesSearchOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripecharge),
    has_more: Schema.Boolean,
    next_page: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("search_result").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    total_count: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The total number of objects that match the query, only accurate up to 10,000.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    url: Schema.String.check(
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
).annotate({ title: "SearchResult", description: "" });
export const GetChargesSearchError = Stripeerror;
export const GetChargesChargeInput = Schema.Struct({
  charge: Schema.String.check(
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
export const GetChargesChargeOutput = Stripecharge;
export const GetChargesChargeError = Stripeerror;
export const PostChargesChargeInput = Schema.Struct({
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of an existing customer that will be associated with this request. This field may only be updated if there is no existing associated customer with this charge.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing.",
    }).check(
      Schema.isMaxCodePoints(40000).annotate({
        expected: "a string with at most 40000 code points",
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
  fraud_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        user_report: Schema.Literals(["", "fraudulent", "safe"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "fraud_details",
      description:
        "A set of key-value pairs you can attach to a charge giving information about its riskiness. If you believe a charge is fraudulent, include a `user_report` key with a value of `fraudulent`. If you believe a charge is safe, include a `user_report` key with a value of `safe`. Stripe will use the information you send to improve our fraud detection algorithms.",
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
  receipt_email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "This is the email address that the receipt for this charge will be sent to. If this field is updated, then a new email receipt will be sent to the updated address.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  shipping: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.StructWithRest(
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
        ).annotate({ title: "optional_fields_address" }),
        carrier: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        name: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        phone: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        tracking_number: Schema.optionalKey(
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
      title: "optional_fields_shipping",
      description:
        "Shipping information for the charge. Helps prevent fraud on charges for physical goods.",
    }),
  ),
  transfer_group: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A string that identifies this transaction as part of a group. `transfer_group` may only be provided if it has not been set. See the [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options) for details.",
    }),
  ),
  charge: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostChargesChargeOutput = Stripecharge;
export const PostChargesChargeError = Stripeerror;
export const PostChargesChargeCaptureInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The amount to capture, which must be less than or equal to the original amount.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  application_fee: Schema.optionalKey(
    Schema.Number.annotate({
      description: "An application fee to add on to this charge.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  application_fee_amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "An application fee amount to add on to this charge, which must be less than or equal to the original amount.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
  receipt_email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The email address to send this charge's receipt to. This will override the previously-specified email address for this charge, if one was set. Receipts are only sent for payments in live mode.",
    }).check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For a non-card charge, text that appears on the customer's statement as the statement descriptor. This value overrides the account's default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors).\n\nFor a card charge, this value is ignored unless you don't specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.",
    }).check(
      Schema.isMaxCodePoints(22).annotate({
        expected: "a string with at most 22 code points",
      }),
    ),
  ),
  statement_descriptor_suffix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Provides information about a card charge. Concatenated to the account's [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer's statement. If the account has no prefix value, the suffix is concatenated to the account's statement descriptor.",
    }).check(
      Schema.isMaxCodePoints(22).annotate({
        expected: "a string with at most 22 code points",
      }),
    ),
  ),
  transfer_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({ amount: Schema.optionalKey(Schema.Int) }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "transfer_data_specs",
      description:
        "An optional dictionary including the account to automatically transfer to as part of a destination charge. [See the Connect documentation](https://docs.stripe.com/connect/destination-charges) for details.",
    }),
  ),
  transfer_group: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A string that identifies this transaction as part of a group. `transfer_group` may only be provided if it has not been set. See the [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options) for details.",
    }),
  ),
  charge: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostChargesChargeCaptureOutput = Stripecharge;
export const PostChargesChargeCaptureError = Stripeerror;
export const GetChargesChargeDisputeInput = Schema.Struct({
  charge: Schema.String.check(
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
export const GetChargesChargeDisputeOutput = Stripedispute;
export const GetChargesChargeDisputeError = Stripeerror;
export const PostChargesChargeDisputeInput = Schema.Struct({
  evidence: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        access_activity_log: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
            }),
          ),
        ),
        appeal: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                card: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        reason_for_filing: Schema.optionalKey(
                          Schema.Union([
                            Schema.String.check(
                              Schema.isMaxCodePoints(20000).annotate({
                                expected:
                                  "a string with at most 20000 code points",
                              }),
                            ),
                            Schema.Literal(""),
                          ]),
                        ),
                        supporting_files: Schema.optionalKey(
                          Schema.Union([
                            Schema.Array(Schema.String),
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
                    ).annotate({ title: "appeal_evidence_card_params" }),
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
            ).annotate({ title: "appeal_evidence_params" }),
            Schema.Literal(""),
          ]),
        ),
        billing_address: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        cancellation_policy: Schema.optionalKey(Schema.String),
        cancellation_policy_disclosure: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
            }),
          ),
        ),
        cancellation_rebuttal: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
            }),
          ),
        ),
        customer_communication: Schema.optionalKey(Schema.String),
        customer_email_address: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        customer_name: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        customer_purchase_ip: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        customer_signature: Schema.optionalKey(Schema.String),
        duplicate_charge_documentation: Schema.optionalKey(Schema.String),
        duplicate_charge_explanation: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
            }),
          ),
        ),
        duplicate_charge_id: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        enhanced_evidence: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                mastercard_compliance: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      fee_acknowledged: Schema.optionalKey(Schema.Boolean),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "mastercard_compliance" }),
                ),
                visa_compelling_evidence_3: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      disputed_transaction: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            customer_account_id: Schema.optionalKey(
                              Schema.Union([
                                Schema.String.check(
                                  Schema.isMaxCodePoints(5000).annotate({
                                    expected:
                                      "a string with at most 5000 code points",
                                  }),
                                ),
                                Schema.Literal(""),
                              ]),
                            ),
                            customer_device_fingerprint: Schema.optionalKey(
                              Schema.Union([
                                Schema.String.check(
                                  Schema.isMaxCodePoints(5000).annotate({
                                    expected:
                                      "a string with at most 5000 code points",
                                  }),
                                ),
                                Schema.Literal(""),
                              ]),
                            ),
                            customer_device_id: Schema.optionalKey(
                              Schema.Union([
                                Schema.String.check(
                                  Schema.isMaxCodePoints(5000).annotate({
                                    expected:
                                      "a string with at most 5000 code points",
                                  }),
                                ),
                                Schema.Literal(""),
                              ]),
                            ),
                            customer_email_address: Schema.optionalKey(
                              Schema.Union([
                                Schema.String.check(
                                  Schema.isMaxCodePoints(5000).annotate({
                                    expected:
                                      "a string with at most 5000 code points",
                                  }),
                                ),
                                Schema.Literal(""),
                              ]),
                            ),
                            customer_purchase_ip: Schema.optionalKey(
                              Schema.Union([
                                Schema.String.check(
                                  Schema.isMaxCodePoints(5000).annotate({
                                    expected:
                                      "a string with at most 5000 code points",
                                  }),
                                ),
                                Schema.Literal(""),
                              ]),
                            ),
                            merchandise_or_services: Schema.optionalKey(
                              Schema.Literals(["merchandise", "services"]),
                            ),
                            product_description: Schema.optionalKey(
                              Schema.Union([
                                Schema.String.check(
                                  Schema.isMaxCodePoints(5000).annotate({
                                    expected:
                                      "a string with at most 5000 code points",
                                  }),
                                ),
                                Schema.Literal(""),
                              ]),
                            ),
                            shipping_address: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  city: Schema.optionalKey(
                                    Schema.Union([
                                      Schema.String.check(
                                        Schema.isMaxCodePoints(5000).annotate({
                                          expected:
                                            "a string with at most 5000 code points",
                                        }),
                                      ),
                                      Schema.Literal(""),
                                    ]),
                                  ),
                                  country: Schema.optionalKey(
                                    Schema.Union([
                                      Schema.String.check(
                                        Schema.isMaxCodePoints(5000).annotate({
                                          expected:
                                            "a string with at most 5000 code points",
                                        }),
                                      ),
                                      Schema.Literal(""),
                                    ]),
                                  ),
                                  line1: Schema.optionalKey(
                                    Schema.Union([
                                      Schema.String.check(
                                        Schema.isMaxCodePoints(5000).annotate({
                                          expected:
                                            "a string with at most 5000 code points",
                                        }),
                                      ),
                                      Schema.Literal(""),
                                    ]),
                                  ),
                                  line2: Schema.optionalKey(
                                    Schema.Union([
                                      Schema.String.check(
                                        Schema.isMaxCodePoints(5000).annotate({
                                          expected:
                                            "a string with at most 5000 code points",
                                        }),
                                      ),
                                      Schema.Literal(""),
                                    ]),
                                  ),
                                  postal_code: Schema.optionalKey(
                                    Schema.Union([
                                      Schema.String.check(
                                        Schema.isMaxCodePoints(5000).annotate({
                                          expected:
                                            "a string with at most 5000 code points",
                                        }),
                                      ),
                                      Schema.Literal(""),
                                    ]),
                                  ),
                                  state: Schema.optionalKey(
                                    Schema.Union([
                                      Schema.String.check(
                                        Schema.isMaxCodePoints(5000).annotate({
                                          expected:
                                            "a string with at most 5000 code points",
                                        }),
                                      ),
                                      Schema.Literal(""),
                                    ]),
                                  ),
                                }),
                                [
                                  Schema.Record(
                                    Schema.String,
                                    Schema.Json.annotate({
                                      expected: "JSON value",
                                    }),
                                  ),
                                ],
                              ).annotate({ title: "shipping_address" }),
                            ),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({
                          title:
                            "visa_compelling_evidence3_disputed_transaction",
                        }),
                      ),
                      prior_undisputed_transactions: Schema.optionalKey(
                        Schema.Array(
                          Schema.StructWithRest(
                            Schema.Struct({
                              charge: Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                              customer_account_id: Schema.optionalKey(
                                Schema.Union([
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                  Schema.Literal(""),
                                ]),
                              ),
                              customer_device_fingerprint: Schema.optionalKey(
                                Schema.Union([
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                  Schema.Literal(""),
                                ]),
                              ),
                              customer_device_id: Schema.optionalKey(
                                Schema.Union([
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                  Schema.Literal(""),
                                ]),
                              ),
                              customer_email_address: Schema.optionalKey(
                                Schema.Union([
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                  Schema.Literal(""),
                                ]),
                              ),
                              customer_purchase_ip: Schema.optionalKey(
                                Schema.Union([
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                  Schema.Literal(""),
                                ]),
                              ),
                              product_description: Schema.optionalKey(
                                Schema.Union([
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                  Schema.Literal(""),
                                ]),
                              ),
                              shipping_address: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    city: Schema.optionalKey(
                                      Schema.Union([
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                        Schema.Literal(""),
                                      ]),
                                    ),
                                    country: Schema.optionalKey(
                                      Schema.Union([
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                        Schema.Literal(""),
                                      ]),
                                    ),
                                    line1: Schema.optionalKey(
                                      Schema.Union([
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                        Schema.Literal(""),
                                      ]),
                                    ),
                                    line2: Schema.optionalKey(
                                      Schema.Union([
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                        Schema.Literal(""),
                                      ]),
                                    ),
                                    postal_code: Schema.optionalKey(
                                      Schema.Union([
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                        Schema.Literal(""),
                                      ]),
                                    ),
                                    state: Schema.optionalKey(
                                      Schema.Union([
                                        Schema.String.check(
                                          Schema.isMaxCodePoints(5000).annotate(
                                            {
                                              expected:
                                                "a string with at most 5000 code points",
                                            },
                                          ),
                                        ),
                                        Schema.Literal(""),
                                      ]),
                                    ),
                                  }),
                                  [
                                    Schema.Record(
                                      Schema.String,
                                      Schema.Json.annotate({
                                        expected: "JSON value",
                                      }),
                                    ),
                                  ],
                                ).annotate({ title: "shipping_address" }),
                              ),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({
                            title:
                              "visa_compelling_evidence3_prior_undisputed_transaction",
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
                  ).annotate({ title: "visa_compelling_evidence3" }),
                ),
                visa_compliance: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      fee_acknowledged: Schema.optionalKey(Schema.Boolean),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "visa_compliance" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "enhanced_evidence" }),
            Schema.Literal(""),
          ]),
        ),
        product_description: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
            }),
          ),
        ),
        receipt: Schema.optionalKey(Schema.String),
        refund_policy: Schema.optionalKey(Schema.String),
        refund_policy_disclosure: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
            }),
          ),
        ),
        refund_refusal_explanation: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
            }),
          ),
        ),
        service_date: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        service_documentation: Schema.optionalKey(Schema.String),
        shipping_address: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        shipping_carrier: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        shipping_date: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        shipping_documentation: Schema.optionalKey(Schema.String),
        shipping_tracking_number: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        uncategorized_file: Schema.optionalKey(Schema.String),
        uncategorized_text: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(20000).annotate({
              expected: "a string with at most 20000 code points",
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
      title: "dispute_evidence_params",
      description:
        "Evidence to upload, to respond to a dispute. Updating any field in the hash will submit all fields in the hash for review. The combined character count of all fields is limited to 150,000.",
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
  intended_submission_method: Schema.optionalKey(
    Schema.Literals([
      "manual",
      "prefer_manual",
      "prefer_smart_disputes",
      "smart_disputes",
    ]).annotate({ description: "Intended submission method for the dispute." }),
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
  submit: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether to immediately submit evidence to the bank. If `false`, evidence is staged on the dispute. Staged evidence is visible in the API and Dashboard, and can be submitted to the bank by making another request with this attribute set to `true` (the default).",
    }),
  ),
  charge: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostChargesChargeDisputeOutput = Stripedispute;
export const PostChargesChargeDisputeError = Stripeerror;
export const PostChargesChargeDisputeCloseInput = Schema.Struct({
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
  charge: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostChargesChargeDisputeCloseOutput = Stripedispute;
export const PostChargesChargeDisputeCloseError = Stripeerror;
export const PostChargesChargeRefundInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal) representing how much of this charge to refund. Can refund only up to the remaining, unrefunded amount of the charge.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
  instructions_email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For payment methods without native refund support (e.g., Konbini, PromptPay), use this email from the customer to receive refund instructions.",
    }).check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
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
  payment_intent: Schema.optionalKey(
    Schema.String.annotate({
      description: "The identifier of the PaymentIntent to refund.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  reason: Schema.optionalKey(
    Schema.Literals([
      "duplicate",
      "fraudulent",
      "requested_by_customer",
    ]).annotate({
      description:
        "String indicating the reason for the refund. If set, possible values are `duplicate`, `fraudulent`, and `requested_by_customer`. If you believe the charge to be fraudulent, specifying `fraudulent` as the reason will add the associated card and email to your [block lists](https://docs.stripe.com/radar/lists), and will also help us improve our fraud detection algorithms.",
    }),
  ),
  refund_application_fee: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the application fee should be refunded when refunding this charge. If a full charge refund is given, the full application fee will be refunded. Otherwise, the application fee will be refunded in an amount proportional to the amount of the charge refunded. An application fee can be refunded only by the application that created the charge.",
    }),
  ),
  reverse_transfer: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the transfer should be reversed when refunding this charge. The transfer will be reversed proportionally to the amount being refunded (either the entire or partial amount).<br><br>A transfer can be reversed only by the application that created the charge.",
    }),
  ),
  charge: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostChargesChargeRefundOutput = Stripecharge;
export const PostChargesChargeRefundError = Stripeerror;
export const GetChargesChargeRefundsInput = Schema.Struct({
  charge: Schema.String,
  ending_before: Schema.optionalKey(Schema.String),
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
  starting_after: Schema.optionalKey(Schema.String),
});
export const GetChargesChargeRefundsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Striperefund).annotate({
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
).annotate({ title: "RefundList", description: "" });
export const GetChargesChargeRefundsError = Stripeerror;
export const PostChargesChargeRefundsInput = Schema.Struct({
  amount: Schema.optionalKey(Schema.Int),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description: "Customer whose customer balance to refund from.",
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
  instructions_email: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For payment methods without native refund support (e.g., Konbini, PromptPay), use this email from the customer to receive refund instructions.",
    }).check(
      Schema.isMaxCodePoints(800).annotate({
        expected: "a string with at most 800 code points",
      }),
    ),
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
  origin: Schema.optionalKey(
    Schema.Literal("customer_balance").annotate({
      description: "Origin of the refund",
    }),
  ),
  payment_intent: Schema.optionalKey(
    Schema.String.annotate({
      description: "The identifier of the PaymentIntent to refund.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  reason: Schema.optionalKey(
    Schema.Literals([
      "duplicate",
      "fraudulent",
      "requested_by_customer",
    ]).annotate({
      description:
        "String indicating the reason for the refund. If set, possible values are `duplicate`, `fraudulent`, and `requested_by_customer`. If you believe the charge to be fraudulent, specifying `fraudulent` as the reason will add the associated card and email to your [block lists](https://docs.stripe.com/radar/lists), and will also help us improve our fraud detection algorithms.",
    }),
  ),
  refund_application_fee: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the application fee should be refunded when refunding this charge. If a full charge refund is given, the full application fee will be refunded. Otherwise, the application fee will be refunded in an amount proportional to the amount of the charge refunded. An application fee can be refunded only by the application that created the charge.",
    }),
  ),
  reverse_transfer: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the transfer should be reversed when refunding this charge. The transfer will be reversed proportionally to the amount being refunded (either the entire or partial amount).<br><br>A transfer can be reversed only by the application that created the charge.",
    }),
  ),
  charge: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostChargesChargeRefundsOutput = Striperefund;
export const PostChargesChargeRefundsError = Stripeerror;
export const GetChargesChargeRefundsRefundInput = Schema.Struct({
  charge: Schema.String,
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  refund: Schema.String,
});
export const GetChargesChargeRefundsRefundOutput = Striperefund;
export const GetChargesChargeRefundsRefundError = Stripeerror;
export const PostChargesChargeRefundsRefundInput = Schema.Struct({
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
    ]),
  ),
  charge: Schema.String,
  refund: Schema.String,
});
export const PostChargesChargeRefundsRefundOutput = Striperefund;
export const PostChargesChargeRefundsRefundError = Stripeerror;
/**
 * The GetChargesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetChargesOperation: StripeOperation & {
  readonly input: typeof GetChargesInput;
  readonly output: typeof GetChargesOutput;
  readonly error: typeof GetChargesError;
} = {
  name: "GetCharges",
  method: "GET",
  path: "/v1/charges",
  pathParameters: [],
  queryParameters: [
    "created",
    "customer",
    "ending_before",
    "expand",
    "limit",
    "payment_intent",
    "starting_after",
    "transfer_group",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetChargesInput,
  output: GetChargesOutput,
  error: GetChargesError,
};
/**
 * The PostChargesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesOperation: StripeOperation & {
  readonly input: typeof PostChargesInput;
  readonly output: typeof PostChargesOutput;
  readonly error: typeof PostChargesError;
} = {
  name: "PostCharges",
  method: "POST",
  path: "/v1/charges",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesInput,
  output: PostChargesOutput,
  error: PostChargesError,
};
/**
 * The GetChargesSearchOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetChargesSearchOperation: StripeOperation & {
  readonly input: typeof GetChargesSearchInput;
  readonly output: typeof GetChargesSearchOutput;
  readonly error: typeof GetChargesSearchError;
} = {
  name: "GetChargesSearch",
  method: "GET",
  path: "/v1/charges/search",
  pathParameters: [],
  queryParameters: ["expand", "limit", "page", "query"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetChargesSearchInput,
  output: GetChargesSearchOutput,
  error: GetChargesSearchError,
};
/**
 * The GetChargesChargeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetChargesChargeOperation: StripeOperation & {
  readonly input: typeof GetChargesChargeInput;
  readonly output: typeof GetChargesChargeOutput;
  readonly error: typeof GetChargesChargeError;
} = {
  name: "GetChargesCharge",
  method: "GET",
  path: "/v1/charges/{charge}",
  pathParameters: ["charge"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetChargesChargeInput,
  output: GetChargesChargeOutput,
  error: GetChargesChargeError,
};
/**
 * The PostChargesChargeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesChargeOperation: StripeOperation & {
  readonly input: typeof PostChargesChargeInput;
  readonly output: typeof PostChargesChargeOutput;
  readonly error: typeof PostChargesChargeError;
} = {
  name: "PostChargesCharge",
  method: "POST",
  path: "/v1/charges/{charge}",
  pathParameters: ["charge"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesChargeInput,
  output: PostChargesChargeOutput,
  error: PostChargesChargeError,
};
/**
 * The PostChargesChargeCaptureOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesChargeCaptureOperation: StripeOperation & {
  readonly input: typeof PostChargesChargeCaptureInput;
  readonly output: typeof PostChargesChargeCaptureOutput;
  readonly error: typeof PostChargesChargeCaptureError;
} = {
  name: "PostChargesChargeCapture",
  method: "POST",
  path: "/v1/charges/{charge}/capture",
  pathParameters: ["charge"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesChargeCaptureInput,
  output: PostChargesChargeCaptureOutput,
  error: PostChargesChargeCaptureError,
};
/**
 * The GetChargesChargeDisputeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetChargesChargeDisputeOperation: StripeOperation & {
  readonly input: typeof GetChargesChargeDisputeInput;
  readonly output: typeof GetChargesChargeDisputeOutput;
  readonly error: typeof GetChargesChargeDisputeError;
} = {
  name: "GetChargesChargeDispute",
  method: "GET",
  path: "/v1/charges/{charge}/dispute",
  pathParameters: ["charge"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetChargesChargeDisputeInput,
  output: GetChargesChargeDisputeOutput,
  error: GetChargesChargeDisputeError,
};
/**
 * The PostChargesChargeDisputeOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesChargeDisputeOperation: StripeOperation & {
  readonly input: typeof PostChargesChargeDisputeInput;
  readonly output: typeof PostChargesChargeDisputeOutput;
  readonly error: typeof PostChargesChargeDisputeError;
} = {
  name: "PostChargesChargeDispute",
  method: "POST",
  path: "/v1/charges/{charge}/dispute",
  pathParameters: ["charge"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesChargeDisputeInput,
  output: PostChargesChargeDisputeOutput,
  error: PostChargesChargeDisputeError,
};
/**
 * The PostChargesChargeDisputeCloseOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesChargeDisputeCloseOperation: StripeOperation & {
  readonly input: typeof PostChargesChargeDisputeCloseInput;
  readonly output: typeof PostChargesChargeDisputeCloseOutput;
  readonly error: typeof PostChargesChargeDisputeCloseError;
} = {
  name: "PostChargesChargeDisputeClose",
  method: "POST",
  path: "/v1/charges/{charge}/dispute/close",
  pathParameters: ["charge"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesChargeDisputeCloseInput,
  output: PostChargesChargeDisputeCloseOutput,
  error: PostChargesChargeDisputeCloseError,
};
/**
 * The PostChargesChargeRefundOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesChargeRefundOperation: StripeOperation & {
  readonly input: typeof PostChargesChargeRefundInput;
  readonly output: typeof PostChargesChargeRefundOutput;
  readonly error: typeof PostChargesChargeRefundError;
} = {
  name: "PostChargesChargeRefund",
  method: "POST",
  path: "/v1/charges/{charge}/refund",
  pathParameters: ["charge"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesChargeRefundInput,
  output: PostChargesChargeRefundOutput,
  error: PostChargesChargeRefundError,
};
/**
 * The GetChargesChargeRefundsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetChargesChargeRefundsOperation: StripeOperation & {
  readonly input: typeof GetChargesChargeRefundsInput;
  readonly output: typeof GetChargesChargeRefundsOutput;
  readonly error: typeof GetChargesChargeRefundsError;
} = {
  name: "GetChargesChargeRefunds",
  method: "GET",
  path: "/v1/charges/{charge}/refunds",
  pathParameters: ["charge"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetChargesChargeRefundsInput,
  output: GetChargesChargeRefundsOutput,
  error: GetChargesChargeRefundsError,
};
/**
 * The PostChargesChargeRefundsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesChargeRefundsOperation: StripeOperation & {
  readonly input: typeof PostChargesChargeRefundsInput;
  readonly output: typeof PostChargesChargeRefundsOutput;
  readonly error: typeof PostChargesChargeRefundsError;
} = {
  name: "PostChargesChargeRefunds",
  method: "POST",
  path: "/v1/charges/{charge}/refunds",
  pathParameters: ["charge"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesChargeRefundsInput,
  output: PostChargesChargeRefundsOutput,
  error: PostChargesChargeRefundsError,
};
/**
 * The GetChargesChargeRefundsRefundOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetChargesChargeRefundsRefundOperation: StripeOperation & {
  readonly input: typeof GetChargesChargeRefundsRefundInput;
  readonly output: typeof GetChargesChargeRefundsRefundOutput;
  readonly error: typeof GetChargesChargeRefundsRefundError;
} = {
  name: "GetChargesChargeRefundsRefund",
  method: "GET",
  path: "/v1/charges/{charge}/refunds/{refund}",
  pathParameters: ["charge", "refund"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetChargesChargeRefundsRefundInput,
  output: GetChargesChargeRefundsRefundOutput,
  error: GetChargesChargeRefundsRefundError,
};
/**
 * The PostChargesChargeRefundsRefundOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostChargesChargeRefundsRefundOperation: StripeOperation & {
  readonly input: typeof PostChargesChargeRefundsRefundInput;
  readonly output: typeof PostChargesChargeRefundsRefundOutput;
  readonly error: typeof PostChargesChargeRefundsRefundError;
} = {
  name: "PostChargesChargeRefundsRefund",
  method: "POST",
  path: "/v1/charges/{charge}/refunds/{refund}",
  pathParameters: ["charge", "refund"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostChargesChargeRefundsRefundInput,
  output: PostChargesChargeRefundsRefundOutput,
  error: PostChargesChargeRefundsRefundError,
};
/**
 * The makeChargesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeChargesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetCharges function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetCharges = Effect.fn("charges.GetCharges")(function* (
    input: GetChargesInput,
  ) {
    const response: GetChargesOutput = yield* client.invoke(
      GetChargesOperation,
      input,
    );
    return response;
  });
  /**
   * The PostCharges function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostCharges = Effect.fn("charges.PostCharges")(function* (
    input: PostChargesInput,
  ) {
    const response: PostChargesOutput = yield* client.invoke(
      PostChargesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetChargesSearch function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetChargesSearch = Effect.fn("charges.GetChargesSearch")(function* (
    input: GetChargesSearchInput,
  ) {
    const response: GetChargesSearchOutput = yield* client.invoke(
      GetChargesSearchOperation,
      input,
    );
    return response;
  });
  /**
   * The GetChargesCharge function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetChargesCharge = Effect.fn("charges.GetChargesCharge")(function* (
    input: GetChargesChargeInput,
  ) {
    const response: GetChargesChargeOutput = yield* client.invoke(
      GetChargesChargeOperation,
      input,
    );
    return response;
  });
  /**
   * The PostChargesCharge function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostChargesCharge = Effect.fn("charges.PostChargesCharge")(function* (
    input: PostChargesChargeInput,
  ) {
    const response: PostChargesChargeOutput = yield* client.invoke(
      PostChargesChargeOperation,
      input,
    );
    return response;
  });
  /**
   * The PostChargesChargeCapture function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostChargesChargeCapture = Effect.fn(
    "charges.PostChargesChargeCapture",
  )(function* (input: PostChargesChargeCaptureInput) {
    const response: PostChargesChargeCaptureOutput = yield* client.invoke(
      PostChargesChargeCaptureOperation,
      input,
    );
    return response;
  });
  /**
   * The GetChargesChargeDispute function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetChargesChargeDispute = Effect.fn("charges.GetChargesChargeDispute")(
    function* (input: GetChargesChargeDisputeInput) {
      const response: GetChargesChargeDisputeOutput = yield* client.invoke(
        GetChargesChargeDisputeOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostChargesChargeDispute function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostChargesChargeDispute = Effect.fn(
    "charges.PostChargesChargeDispute",
  )(function* (input: PostChargesChargeDisputeInput) {
    const response: PostChargesChargeDisputeOutput = yield* client.invoke(
      PostChargesChargeDisputeOperation,
      input,
    );
    return response;
  });
  /**
   * The PostChargesChargeDisputeClose function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostChargesChargeDisputeClose = Effect.fn(
    "charges.PostChargesChargeDisputeClose",
  )(function* (input: PostChargesChargeDisputeCloseInput) {
    const response: PostChargesChargeDisputeCloseOutput = yield* client.invoke(
      PostChargesChargeDisputeCloseOperation,
      input,
    );
    return response;
  });
  /**
   * The PostChargesChargeRefund function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostChargesChargeRefund = Effect.fn("charges.PostChargesChargeRefund")(
    function* (input: PostChargesChargeRefundInput) {
      const response: PostChargesChargeRefundOutput = yield* client.invoke(
        PostChargesChargeRefundOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetChargesChargeRefunds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetChargesChargeRefunds = Effect.fn("charges.GetChargesChargeRefunds")(
    function* (input: GetChargesChargeRefundsInput) {
      const response: GetChargesChargeRefundsOutput = yield* client.invoke(
        GetChargesChargeRefundsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostChargesChargeRefunds function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostChargesChargeRefunds = Effect.fn(
    "charges.PostChargesChargeRefunds",
  )(function* (input: PostChargesChargeRefundsInput) {
    const response: PostChargesChargeRefundsOutput = yield* client.invoke(
      PostChargesChargeRefundsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetChargesChargeRefundsRefund function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetChargesChargeRefundsRefund = Effect.fn(
    "charges.GetChargesChargeRefundsRefund",
  )(function* (input: GetChargesChargeRefundsRefundInput) {
    const response: GetChargesChargeRefundsRefundOutput = yield* client.invoke(
      GetChargesChargeRefundsRefundOperation,
      input,
    );
    return response;
  });
  /**
   * The PostChargesChargeRefundsRefund function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostChargesChargeRefundsRefund = Effect.fn(
    "charges.PostChargesChargeRefundsRefund",
  )(function* (input: PostChargesChargeRefundsRefundInput) {
    const response: PostChargesChargeRefundsRefundOutput = yield* client.invoke(
      PostChargesChargeRefundsRefundOperation,
      input,
    );
    return response;
  });
  return {
    GetCharges,
    PostCharges,
    GetChargesSearch,
    GetChargesCharge,
    PostChargesCharge,
    PostChargesChargeCapture,
    GetChargesChargeDispute,
    PostChargesChargeDispute,
    PostChargesChargeDisputeClose,
    PostChargesChargeRefund,
    GetChargesChargeRefunds,
    PostChargesChargeRefunds,
    GetChargesChargeRefundsRefund,
    PostChargesChargeRefundsRefund,
  };
});
